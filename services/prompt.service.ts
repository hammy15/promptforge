// prompt.service.ts - Core prompt management service
// Handles CRUD operations for prompts with versioning

import { eq, and, desc, sql, ilike, arrayContains } from 'drizzle-orm';
import { db } from '@/infrastructure/database';
import { prompts, promptVersions, promptExecutions } from '@/infrastructure/database/schema';
import { generateId } from '@/lib/utils';
import type {
  Prompt,
  PromptContent,
  PromptVersion,
  CreatePromptInput,
  UpdatePromptInput,
  PaginatedResponse,
  PerformanceMetrics,
} from '@/types/prompt.types';

export class PromptService {
  /**
   * Create a new prompt
   */
  async create(input: CreatePromptInput, authorId: string): Promise<Prompt> {
    const id = generateId();
    const now = new Date().toISOString();

    // Insert prompt
    const [prompt] = await db
      .insert(prompts)
      .values({
        id,
        workspaceId: input.workspaceId,
        name: input.name,
        description: input.description || null,
        content: input.content,
        framework: input.framework || null,
        tags: input.tags || [],
        isTemplate: input.isTemplate || false,
        isPublic: input.isPublic || false,
        currentVersion: 1,
        authorId,
        createdAt: now,
        updatedAt: now,
      })
      .returning();

    // Create initial version
    await db.insert(promptVersions).values({
      id: generateId(),
      promptId: id,
      versionNumber: 1,
      content: input.content,
      changeSummary: 'Initial version',
      authorId,
      createdAt: now,
    });

    return this.mapToPrompt(prompt);
  }

  /**
   * Get prompt by ID with optional version
   */
  async getById(id: string, version?: number): Promise<Prompt | null> {
    const [prompt] = await db
      .select()
      .from(prompts)
      .where(eq(prompts.id, id))
      .limit(1);

    if (!prompt) return null;

    // If specific version requested, get that version's content
    if (version && version !== prompt.currentVersion) {
      const [promptVersion] = await db
        .select()
        .from(promptVersions)
        .where(
          and(
            eq(promptVersions.promptId, id),
            eq(promptVersions.versionNumber, version)
          )
        )
        .limit(1);

      if (promptVersion) {
        return this.mapToPrompt({ ...prompt, content: promptVersion.content });
      }
    }

    return this.mapToPrompt(prompt);
  }

  /**
   * List prompts with filtering and pagination
   */
  async list(options: {
    workspaceId?: string;
    authorId?: string;
    isTemplate?: boolean;
    isPublic?: boolean;
    category?: string;
    tags?: string[];
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<Prompt>> {
    const {
      workspaceId,
      authorId,
      isTemplate,
      isPublic,
      tags,
      search,
      page = 1,
      limit = 20,
    } = options;

    const offset = (page - 1) * limit;
    const conditions = [];

    if (workspaceId) {
      conditions.push(eq(prompts.workspaceId, workspaceId));
    }
    if (authorId) {
      conditions.push(eq(prompts.authorId, authorId));
    }
    if (isTemplate !== undefined) {
      conditions.push(eq(prompts.isTemplate, isTemplate));
    }
    if (isPublic !== undefined) {
      conditions.push(eq(prompts.isPublic, isPublic));
    }
    if (tags && tags.length > 0) {
      conditions.push(arrayContains(prompts.tags, tags));
    }
    if (search) {
      conditions.push(
        sql`to_tsvector('english', ${prompts.name} || ' ' || COALESCE(${prompts.description}, ''))
            @@ plainto_tsquery('english', ${search})`
      );
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    // Get total count
    const [{ count }] = await db
      .select({ count: sql<number>`count(*)` })
      .from(prompts)
      .where(whereClause);

    // Get paginated results
    const results = await db
      .select()
      .from(prompts)
      .where(whereClause)
      .orderBy(desc(prompts.updatedAt))
      .limit(limit)
      .offset(offset);

    const total = Number(count);
    const totalPages = Math.ceil(total / limit);

    return {
      data: results.map(this.mapToPrompt),
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasMore: page < totalPages,
      },
    };
  }

  /**
   * Update a prompt (creates new version)
   */
  async update(
    id: string,
    input: UpdatePromptInput,
    authorId: string,
    changeSummary?: string
  ): Promise<Prompt> {
    const existing = await this.getById(id);
    if (!existing) {
      throw new Error(`Prompt not found: ${id}`);
    }

    const now = new Date().toISOString();
    const newVersion = existing.currentVersion + 1;

    // Merge content if provided
    const newContent = input.content
      ? { ...existing.content, ...input.content }
      : existing.content;

    // Update prompt
    const [updated] = await db
      .update(prompts)
      .set({
        name: input.name ?? existing.name,
        description: input.description ?? existing.description,
        content: newContent,
        tags: input.tags ?? existing.tags,
        isPublic: input.isPublic ?? existing.isPublic,
        currentVersion: newVersion,
        updatedAt: now,
      })
      .where(eq(prompts.id, id))
      .returning();

    // Create new version
    await db.insert(promptVersions).values({
      id: generateId(),
      promptId: id,
      versionNumber: newVersion,
      content: newContent,
      changeSummary: changeSummary || 'Updated prompt',
      authorId,
      createdAt: now,
    });

    return this.mapToPrompt(updated);
  }

  /**
   * Delete a prompt
   */
  async delete(id: string): Promise<void> {
    await db.delete(prompts).where(eq(prompts.id, id));
  }

  /**
   * Get all versions of a prompt
   */
  async getVersions(promptId: string): Promise<PromptVersion[]> {
    const versions = await db
      .select()
      .from(promptVersions)
      .where(eq(promptVersions.promptId, promptId))
      .orderBy(desc(promptVersions.versionNumber));

    return versions.map((v) => ({
      id: v.id,
      promptId: v.promptId,
      versionNumber: v.versionNumber,
      content: v.content as PromptContent,
      changeSummary: v.changeSummary,
      authorId: v.authorId,
      performanceSnapshot: v.performanceSnapshot as PerformanceMetrics | null,
      createdAt: v.createdAt,
    }));
  }

  /**
   * Restore a specific version
   */
  async restoreVersion(
    promptId: string,
    versionNumber: number,
    authorId: string
  ): Promise<Prompt> {
    const [version] = await db
      .select()
      .from(promptVersions)
      .where(
        and(
          eq(promptVersions.promptId, promptId),
          eq(promptVersions.versionNumber, versionNumber)
        )
      )
      .limit(1);

    if (!version) {
      throw new Error(`Version ${versionNumber} not found for prompt ${promptId}`);
    }

    return this.update(
      promptId,
      { content: version.content as PromptContent },
      authorId,
      `Restored to version ${versionNumber}`
    );
  }

  /**
   * Fork a prompt/template
   */
  async fork(
    sourceId: string,
    workspaceId: string,
    authorId: string,
    newName?: string
  ): Promise<Prompt> {
    const source = await this.getById(sourceId);
    if (!source) {
      throw new Error(`Source prompt not found: ${sourceId}`);
    }

    return this.create(
      {
        workspaceId,
        name: newName || `${source.name} (Fork)`,
        description: source.description,
        content: source.content,
        framework: source.framework,
        tags: source.tags,
        isTemplate: false,
        isPublic: false,
      },
      authorId
    );
  }

  /**
   * Get prompt performance metrics
   */
  async getMetrics(promptId: string): Promise<PerformanceMetrics> {
    const [metrics] = await db
      .select({
        totalExecutions: sql<number>`count(*)`,
        avgLatencyMs: sql<number>`avg(${promptExecutions.latencyMs})`,
        avgRating: sql<number>`avg(${promptExecutions.rating})`,
        totalTokens: sql<number>`sum(${promptExecutions.inputTokens} + ${promptExecutions.outputTokens})`,
        totalCostUsd: sql<number>`sum(${promptExecutions.costUsd})`,
        successRate: sql<number>`avg(case when ${promptExecutions.output} is not null then 1 else 0 end)`,
      })
      .from(promptExecutions)
      .where(eq(promptExecutions.promptId, promptId));

    return {
      totalExecutions: Number(metrics.totalExecutions) || 0,
      avgLatencyMs: Math.round(Number(metrics.avgLatencyMs) || 0),
      avgRating: Number(metrics.avgRating) || null,
      totalTokens: Number(metrics.totalTokens) || 0,
      totalCostUsd: Number(metrics.totalCostUsd) || 0,
      successRate: Number(metrics.successRate) || 0,
    };
  }

  /**
   * Increment usage count
   */
  async incrementUsage(promptId: string): Promise<void> {
    await db
      .update(prompts)
      .set({
        usageCount: sql`${prompts.usageCount} + 1`,
      })
      .where(eq(prompts.id, promptId));
  }

  /**
   * Map database row to Prompt type
   */
  private mapToPrompt(row: any): Prompt {
    return {
      id: row.id,
      workspaceId: row.workspaceId,
      name: row.name,
      description: row.description,
      content: row.content as PromptContent,
      framework: row.framework,
      tags: row.tags || [],
      isTemplate: row.isTemplate,
      isPublic: row.isPublic,
      parentTemplateId: row.parentTemplateId,
      currentVersion: row.currentVersion,
      performanceScore: row.performanceScore ? Number(row.performanceScore) : null,
      usageCount: row.usageCount,
      authorId: row.authorId,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    };
  }
}

export const promptService = new PromptService();
