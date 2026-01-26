// prompts.route.ts - API routes for prompt management
// Hono-based API with validation and auth

import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { HTTPException } from 'hono/http-exception';
import { streamSSE } from 'hono/streaming';

import { promptService } from '@/services/prompt.service';
import { getAIService } from '@/services/ai-provider.service';
import { authMiddleware } from '@/api/middleware/auth';
import { rateLimitMiddleware } from '@/api/middleware/rate-limit';
import { logExecution } from '@/services/analytics.service';

// ============================================
// Validation Schemas
// ============================================

const promptContentSchema = z.object({
  context: z.string().max(5000).nullable(),
  objective: z.string().min(1).max(2000),
  constraints: z.array(z.string()),
  examples: z.array(z.object({
    id: z.string(),
    input: z.string(),
    output: z.string(),
  })),
  outputFormat: z.enum(['plain_text', 'markdown', 'json', 'xml', 'code', 'structured_list', 'custom']),
  customFormatSchema: z.string().optional(),
  style: z.array(z.enum(['professional', 'casual', 'technical', 'creative', 'academic', 'conversational', 'formal'])),
  persona: z.string().max(1000).nullable(),
  rawPrompt: z.string().nullable(),
  parameters: z.object({
    temperature: z.number().min(0).max(2),
    maxTokens: z.number().min(1).max(128000),
    topP: z.number().min(0).max(1),
    stopSequences: z.array(z.string()),
  }),
});

const createPromptSchema = z.object({
  workspaceId: z.string().uuid(),
  name: z.string().min(1).max(255),
  description: z.string().max(5000).optional(),
  content: promptContentSchema,
  framework: z.enum(['COSTAR', 'CROWD', 'RISEN', 'custom']).optional(),
  tags: z.array(z.string()).optional(),
  isTemplate: z.boolean().optional(),
  isPublic: z.boolean().optional(),
});

const updatePromptSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  description: z.string().max(5000).optional(),
  content: promptContentSchema.partial().optional(),
  tags: z.array(z.string()).optional(),
  isPublic: z.boolean().optional(),
  changeSummary: z.string().max(500).optional(),
});

const executePromptSchema = z.object({
  input: z.record(z.unknown()).default({}),
  model: z.string(),
  stream: z.boolean().default(false),
});

const listQuerySchema = z.object({
  workspaceId: z.string().uuid().optional(),
  isTemplate: z.coerce.boolean().optional(),
  isPublic: z.coerce.boolean().optional(),
  tags: z.string().transform((s) => s.split(',')).optional(),
  search: z.string().optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(20),
});

// ============================================
// Router
// ============================================

const prompts = new Hono();

// Apply middleware
prompts.use('*', authMiddleware);
prompts.use('*', rateLimitMiddleware);

// ============================================
// List Prompts
// ============================================
prompts.get(
  '/',
  zValidator('query', listQuerySchema),
  async (c) => {
    const query = c.req.valid('query');
    const user = c.get('user');

    // If not specifying workspace, default to user's workspaces
    const result = await promptService.list({
      workspaceId: query.workspaceId,
      isTemplate: query.isTemplate,
      isPublic: query.isPublic,
      tags: query.tags,
      search: query.search,
      page: query.page,
      limit: query.limit,
    });

    return c.json(result);
  }
);

// ============================================
// Create Prompt
// ============================================
prompts.post(
  '/',
  zValidator('json', createPromptSchema),
  async (c) => {
    const input = c.req.valid('json');
    const user = c.get('user');

    // Verify workspace access
    const hasAccess = await verifyWorkspaceAccess(user.id, input.workspaceId, 'editor');
    if (!hasAccess) {
      throw new HTTPException(403, { message: 'No access to workspace' });
    }

    const prompt = await promptService.create(input, user.id);

    return c.json({ data: prompt }, 201);
  }
);

// ============================================
// Get Prompt
// ============================================
prompts.get('/:id', async (c) => {
  const id = c.req.param('id');
  const version = c.req.query('version');
  const user = c.get('user');

  const prompt = await promptService.getById(
    id,
    version ? parseInt(version) : undefined
  );

  if (!prompt) {
    throw new HTTPException(404, { message: 'Prompt not found' });
  }

  // Check access
  if (!prompt.isPublic) {
    const hasAccess = await verifyWorkspaceAccess(user.id, prompt.workspaceId, 'viewer');
    if (!hasAccess) {
      throw new HTTPException(403, { message: 'No access to prompt' });
    }
  }

  return c.json({ data: prompt });
});

// ============================================
// Update Prompt
// ============================================
prompts.patch(
  '/:id',
  zValidator('json', updatePromptSchema),
  async (c) => {
    const id = c.req.param('id');
    const input = c.req.valid('json');
    const user = c.get('user');

    const existing = await promptService.getById(id);
    if (!existing) {
      throw new HTTPException(404, { message: 'Prompt not found' });
    }

    const hasAccess = await verifyWorkspaceAccess(user.id, existing.workspaceId, 'editor');
    if (!hasAccess) {
      throw new HTTPException(403, { message: 'No edit access to prompt' });
    }

    const { changeSummary, ...updateData } = input;
    const updated = await promptService.update(id, updateData, user.id, changeSummary);

    return c.json({ data: updated });
  }
);

// ============================================
// Delete Prompt
// ============================================
prompts.delete('/:id', async (c) => {
  const id = c.req.param('id');
  const user = c.get('user');

  const existing = await promptService.getById(id);
  if (!existing) {
    throw new HTTPException(404, { message: 'Prompt not found' });
  }

  const hasAccess = await verifyWorkspaceAccess(user.id, existing.workspaceId, 'editor');
  if (!hasAccess) {
    throw new HTTPException(403, { message: 'No delete access to prompt' });
  }

  await promptService.delete(id);

  return c.json({ success: true });
});

// ============================================
// Execute Prompt
// ============================================
prompts.post(
  '/:id/execute',
  zValidator('json', executePromptSchema),
  async (c) => {
    const id = c.req.param('id');
    const input = c.req.valid('json');
    const user = c.get('user');

    const prompt = await promptService.getById(id);
    if (!prompt) {
      throw new HTTPException(404, { message: 'Prompt not found' });
    }

    // Check access
    if (!prompt.isPublic) {
      const hasAccess = await verifyWorkspaceAccess(user.id, prompt.workspaceId, 'tester');
      if (!hasAccess) {
        throw new HTTPException(403, { message: 'No execute access to prompt' });
      }
    }

    const aiService = getAIService();

    // Increment usage
    await promptService.incrementUsage(id);

    // Streaming response
    if (input.stream) {
      return streamSSE(c, async (stream) => {
        let result: any = null;

        await aiService.execute(
          prompt.content,
          input.input,
          input.model,
          true,
          {
            onToken: async (token) => {
              await stream.writeSSE({
                data: JSON.stringify({ type: 'token', content: token }),
              });
            },
            onComplete: async (executionResult) => {
              result = executionResult;
              await stream.writeSSE({
                data: JSON.stringify({ type: 'complete', result: executionResult }),
              });

              // Log execution
              await logExecution({
                promptId: id,
                promptVersion: prompt.currentVersion,
                workspaceId: prompt.workspaceId,
                userId: user.id,
                model: input.model,
                input: input.input,
                output: executionResult.output,
                latencyMs: executionResult.latencyMs,
                inputTokens: executionResult.tokenUsage.input,
                outputTokens: executionResult.tokenUsage.output,
                costUsd: executionResult.costUsd,
              });
            },
            onError: async (error) => {
              await stream.writeSSE({
                data: JSON.stringify({ type: 'error', message: error.message }),
              });
            },
          }
        );
      });
    }

    // Non-streaming response
    const result = await aiService.execute(
      prompt.content,
      input.input,
      input.model,
      false
    );

    // Log execution
    await logExecution({
      promptId: id,
      promptVersion: prompt.currentVersion,
      workspaceId: prompt.workspaceId,
      userId: user.id,
      model: input.model,
      input: input.input,
      output: result.output,
      latencyMs: result.latencyMs,
      inputTokens: result.tokenUsage.input,
      outputTokens: result.tokenUsage.output,
      costUsd: result.costUsd,
    });

    return c.json({ data: result });
  }
);

// ============================================
// Get Prompt Versions
// ============================================
prompts.get('/:id/versions', async (c) => {
  const id = c.req.param('id');
  const user = c.get('user');

  const prompt = await promptService.getById(id);
  if (!prompt) {
    throw new HTTPException(404, { message: 'Prompt not found' });
  }

  const hasAccess = await verifyWorkspaceAccess(user.id, prompt.workspaceId, 'viewer');
  if (!hasAccess) {
    throw new HTTPException(403, { message: 'No access to prompt' });
  }

  const versions = await promptService.getVersions(id);

  return c.json({ data: versions });
});

// ============================================
// Restore Prompt Version
// ============================================
prompts.post('/:id/versions/:version/restore', async (c) => {
  const id = c.req.param('id');
  const version = parseInt(c.req.param('version'));
  const user = c.get('user');

  const prompt = await promptService.getById(id);
  if (!prompt) {
    throw new HTTPException(404, { message: 'Prompt not found' });
  }

  const hasAccess = await verifyWorkspaceAccess(user.id, prompt.workspaceId, 'editor');
  if (!hasAccess) {
    throw new HTTPException(403, { message: 'No edit access to prompt' });
  }

  const restored = await promptService.restoreVersion(id, version, user.id);

  return c.json({ data: restored });
});

// ============================================
// Fork Prompt
// ============================================
prompts.post(
  '/:id/fork',
  zValidator('json', z.object({
    workspaceId: z.string().uuid(),
    name: z.string().min(1).max(255).optional(),
  })),
  async (c) => {
    const id = c.req.param('id');
    const input = c.req.valid('json');
    const user = c.get('user');

    const source = await promptService.getById(id);
    if (!source) {
      throw new HTTPException(404, { message: 'Prompt not found' });
    }

    // Check source access (must be public or have access)
    if (!source.isPublic) {
      const hasSourceAccess = await verifyWorkspaceAccess(user.id, source.workspaceId, 'viewer');
      if (!hasSourceAccess) {
        throw new HTTPException(403, { message: 'No access to source prompt' });
      }
    }

    // Check target workspace access
    const hasTargetAccess = await verifyWorkspaceAccess(user.id, input.workspaceId, 'editor');
    if (!hasTargetAccess) {
      throw new HTTPException(403, { message: 'No access to target workspace' });
    }

    const forked = await promptService.fork(id, input.workspaceId, user.id, input.name);

    return c.json({ data: forked }, 201);
  }
);

// ============================================
// Get Prompt Metrics
// ============================================
prompts.get('/:id/metrics', async (c) => {
  const id = c.req.param('id');
  const user = c.get('user');

  const prompt = await promptService.getById(id);
  if (!prompt) {
    throw new HTTPException(404, { message: 'Prompt not found' });
  }

  const hasAccess = await verifyWorkspaceAccess(user.id, prompt.workspaceId, 'viewer');
  if (!hasAccess) {
    throw new HTTPException(403, { message: 'No access to prompt' });
  }

  const metrics = await promptService.getMetrics(id);

  return c.json({ data: metrics });
});

// ============================================
// Helper Functions
// ============================================

async function verifyWorkspaceAccess(
  userId: string,
  workspaceId: string,
  requiredRole: 'viewer' | 'tester' | 'editor' | 'owner'
): Promise<boolean> {
  // In real implementation, check workspace_members table
  // This is a placeholder
  return true;
}

export { prompts };
