// snippets.ts - Reusable prompt fragments and templates
// Insert with {{snippet:name}} syntax

// ============================================
// Types
// ============================================

export interface PromptSnippet {
  id: string;
  name: string;
  slug: string; // Used in {{snippet:slug}}
  description: string;
  content: string;
  category: SnippetCategory;
  tags: string[];
  variables?: string[]; // Variables this snippet uses
  isPublic: boolean;
  authorId: string;
  workspaceId: string;
  usageCount: number;
  createdAt: string;
  updatedAt: string;
}

export type SnippetCategory =
  | 'safety'
  | 'formatting'
  | 'persona'
  | 'instructions'
  | 'examples'
  | 'constraints'
  | 'output'
  | 'custom';

// ============================================
// Default Snippets Library
// ============================================

export const DEFAULT_SNIPPETS: Omit<PromptSnippet, 'id' | 'authorId' | 'workspaceId' | 'createdAt' | 'updatedAt'>[] = [
  // Safety Guidelines
  {
    name: 'Safety Guidelines',
    slug: 'safety-guidelines',
    description: 'Standard safety and ethical guidelines',
    content: `## Safety Guidelines
- Do not provide harmful, illegal, or unethical information
- Refuse requests that could cause harm to individuals or groups
- Do not generate content that promotes violence, discrimination, or illegal activities
- Protect user privacy and do not ask for or store personal information
- If unsure about the appropriateness of a response, err on the side of caution`,
    category: 'safety',
    tags: ['safety', 'ethics', 'guidelines'],
    isPublic: true,
    usageCount: 0,
  },
  {
    name: 'Content Moderation',
    slug: 'content-moderation',
    description: 'Guidelines for content moderation tasks',
    content: `## Content Moderation Guidelines
- Flag content that contains hate speech, harassment, or threats
- Identify and mark explicit or adult content
- Detect spam, scams, or misleading information
- Preserve context when evaluating borderline content
- Provide confidence scores for each classification
- When uncertain, escalate for human review`,
    category: 'safety',
    tags: ['moderation', 'safety', 'classification'],
    isPublic: true,
    usageCount: 0,
  },

  // Formatting
  {
    name: 'Markdown Output',
    slug: 'markdown-output',
    description: 'Instructions for markdown formatted output',
    content: `## Output Format
Format your response using markdown:
- Use headers (## and ###) to organize sections
- Use bullet points for lists
- Use **bold** for emphasis on key terms
- Use \`code\` for technical terms or commands
- Use code blocks with language tags for code
- Use > blockquotes for important notes
- Keep paragraphs concise (2-3 sentences)`,
    category: 'formatting',
    tags: ['markdown', 'formatting', 'output'],
    isPublic: true,
    usageCount: 0,
  },
  {
    name: 'JSON Output',
    slug: 'json-output',
    description: 'Instructions for JSON formatted output',
    content: `## Output Format
Return your response as valid JSON with the following requirements:
- Use double quotes for strings
- Do not include comments
- Ensure proper escaping of special characters
- Do not include trailing commas
- The response should be parseable by JSON.parse()
- Do not wrap the JSON in markdown code blocks`,
    category: 'formatting',
    tags: ['json', 'formatting', 'output'],
    isPublic: true,
    usageCount: 0,
  },
  {
    name: 'Structured List',
    slug: 'structured-list',
    description: 'Template for structured list output',
    content: `## Output Structure
Provide your response as a structured list:
1. **[Topic/Title]**: Brief description
   - Sub-point A
   - Sub-point B
2. **[Topic/Title]**: Brief description
   - Sub-point A
   - Sub-point B
Continue this pattern for all items.`,
    category: 'formatting',
    tags: ['list', 'structure', 'formatting'],
    isPublic: true,
    usageCount: 0,
  },

  // Personas
  {
    name: 'Expert Analyst',
    slug: 'expert-analyst',
    description: 'Analytical expert persona',
    content: `You are an expert analyst with deep knowledge in your field. You:
- Analyze information critically and objectively
- Support conclusions with evidence and data
- Consider multiple perspectives before forming opinions
- Acknowledge limitations and uncertainties in your analysis
- Use precise, technical language appropriate to the domain
- Avoid speculation without clear disclaimers`,
    category: 'persona',
    tags: ['persona', 'analyst', 'expert'],
    isPublic: true,
    usageCount: 0,
  },
  {
    name: 'Helpful Teacher',
    slug: 'helpful-teacher',
    description: 'Patient educator persona',
    content: `You are a patient and supportive teacher. You:
- Explain concepts clearly, starting from fundamentals
- Use analogies and examples to illustrate abstract ideas
- Check for understanding before moving to advanced topics
- Encourage questions and provide positive reinforcement
- Adapt your explanations to the learner's level
- Break complex topics into manageable chunks`,
    category: 'persona',
    tags: ['persona', 'teacher', 'education'],
    isPublic: true,
    usageCount: 0,
  },
  {
    name: 'Code Reviewer',
    slug: 'code-reviewer',
    description: 'Technical code reviewer persona',
    content: `You are a senior software engineer conducting code review. You:
- Focus on code quality, maintainability, and best practices
- Identify potential bugs, security issues, and performance problems
- Suggest specific improvements with code examples
- Explain the reasoning behind your suggestions
- Balance criticism with recognition of good patterns
- Consider the broader architecture and design implications`,
    category: 'persona',
    tags: ['persona', 'developer', 'code-review'],
    isPublic: true,
    usageCount: 0,
  },

  // Instructions
  {
    name: 'Step by Step',
    slug: 'step-by-step',
    description: 'Think step by step instruction',
    content: `Think through this step by step:
1. First, understand what is being asked
2. Break down the problem into components
3. Address each component systematically
4. Verify your reasoning at each step
5. Synthesize your findings into a final answer
Show your work at each step.`,
    category: 'instructions',
    tags: ['reasoning', 'step-by-step', 'methodology'],
    isPublic: true,
    usageCount: 0,
  },
  {
    name: 'Pros and Cons',
    slug: 'pros-cons',
    description: 'Template for balanced analysis',
    content: `Analyze this by considering:

**Pros:**
- List advantages and benefits
- Consider short-term and long-term positives
- Note any unique strengths

**Cons:**
- List disadvantages and drawbacks
- Consider potential risks and downsides
- Note any significant limitations

**Recommendation:**
Based on this analysis, provide a balanced recommendation.`,
    category: 'instructions',
    tags: ['analysis', 'decision-making', 'comparison'],
    isPublic: true,
    usageCount: 0,
  },

  // Constraints
  {
    name: 'Brevity Constraint',
    slug: 'brevity',
    description: 'Keep responses concise',
    content: `Constraints:
- Keep your response concise and to the point
- Aim for clarity over comprehensiveness
- Eliminate redundant words and phrases
- Use bullet points instead of long paragraphs
- Maximum 3-4 sentences per point`,
    category: 'constraints',
    tags: ['brevity', 'concise', 'constraint'],
    isPublic: true,
    usageCount: 0,
  },
  {
    name: 'No Assumptions',
    slug: 'no-assumptions',
    description: 'Avoid making assumptions',
    content: `Important constraints:
- Do not make assumptions about information not provided
- If information is missing, ask for clarification
- Clearly state when you are uncertain
- Distinguish between facts and inferences
- Do not fill in gaps with speculation`,
    category: 'constraints',
    tags: ['accuracy', 'assumptions', 'constraint'],
    isPublic: true,
    usageCount: 0,
  },
  {
    name: 'Technical Accuracy',
    slug: 'technical-accuracy',
    description: 'Ensure technical accuracy',
    content: `Technical requirements:
- Ensure all technical information is accurate and up-to-date
- Use proper technical terminology
- Include version numbers when relevant
- Cite documentation or specifications when possible
- Test code examples before including them
- Note any deprecations or known issues`,
    category: 'constraints',
    tags: ['technical', 'accuracy', 'constraint'],
    isPublic: true,
    usageCount: 0,
  },
];

// ============================================
// Snippet Processing
// ============================================

const SNIPPET_REGEX = /\{\{snippet:([a-zA-Z0-9_-]+)\}\}/g;

/**
 * Detect snippet references in text
 */
export function detectSnippets(text: string): string[] {
  const matches = text.match(SNIPPET_REGEX);
  if (!matches) return [];

  return [...new Set(matches.map((m) => m.slice(10, -2)))]; // Extract slug
}

/**
 * Expand snippets in text
 */
export function expandSnippets(
  text: string,
  snippets: PromptSnippet[],
  options: {
    recursive?: boolean; // Expand snippets within snippets
    maxDepth?: number;
    missingBehavior?: 'keep' | 'remove' | 'error';
  } = {}
): { expanded: string; usedSnippets: string[]; errors: string[] } {
  const { recursive = true, maxDepth = 3, missingBehavior = 'keep' } = options;
  const usedSnippets: string[] = [];
  const errors: string[] = [];

  function expand(content: string, depth: number): string {
    if (depth > maxDepth) {
      errors.push(`Maximum snippet depth (${maxDepth}) exceeded`);
      return content;
    }

    return content.replace(SNIPPET_REGEX, (match, slug) => {
      const snippet = snippets.find((s) => s.slug === slug);

      if (!snippet) {
        switch (missingBehavior) {
          case 'error':
            errors.push(`Snippet not found: ${slug}`);
            return match;
          case 'remove':
            return '';
          default:
            return match;
        }
      }

      usedSnippets.push(slug);

      let expanded = snippet.content;
      if (recursive && SNIPPET_REGEX.test(expanded)) {
        expanded = expand(expanded, depth + 1);
      }

      return expanded;
    });
  }

  const expanded = expand(text, 0);

  return {
    expanded,
    usedSnippets: [...new Set(usedSnippets)],
    errors,
  };
}

/**
 * Validate snippet references
 */
export function validateSnippetReferences(
  text: string,
  availableSnippets: PromptSnippet[]
): { valid: boolean; missing: string[] } {
  const referenced = detectSnippets(text);
  const availableSlugs = new Set(availableSnippets.map((s) => s.slug));
  const missing = referenced.filter((slug) => !availableSlugs.has(slug));

  return {
    valid: missing.length === 0,
    missing,
  };
}

// ============================================
// Snippet Management
// ============================================

/**
 * Create a new snippet
 */
export function createSnippet(
  params: Omit<PromptSnippet, 'id' | 'slug' | 'usageCount' | 'createdAt' | 'updatedAt'>
): Omit<PromptSnippet, 'id'> {
  const slug = params.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  return {
    ...params,
    slug,
    usageCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Search snippets
 */
export function searchSnippets(
  snippets: PromptSnippet[],
  query: string,
  filters?: {
    category?: SnippetCategory;
    tags?: string[];
    authorId?: string;
  }
): PromptSnippet[] {
  const lowerQuery = query.toLowerCase();

  return snippets.filter((snippet) => {
    // Apply text search
    const matchesQuery =
      !query ||
      snippet.name.toLowerCase().includes(lowerQuery) ||
      snippet.description.toLowerCase().includes(lowerQuery) ||
      snippet.slug.includes(lowerQuery) ||
      snippet.tags.some((t) => t.includes(lowerQuery));

    // Apply filters
    const matchesCategory = !filters?.category || snippet.category === filters.category;
    const matchesTags =
      !filters?.tags?.length || filters.tags.some((t) => snippet.tags.includes(t));
    const matchesAuthor = !filters?.authorId || snippet.authorId === filters.authorId;

    return matchesQuery && matchesCategory && matchesTags && matchesAuthor;
  });
}

/**
 * Get snippet usage analytics
 */
export function getSnippetAnalytics(snippets: PromptSnippet[]): {
  totalSnippets: number;
  byCategory: Record<SnippetCategory, number>;
  mostUsed: PromptSnippet[];
  leastUsed: PromptSnippet[];
} {
  const byCategory = {} as Record<SnippetCategory, number>;

  for (const snippet of snippets) {
    byCategory[snippet.category] = (byCategory[snippet.category] || 0) + 1;
  }

  const sorted = [...snippets].sort((a, b) => b.usageCount - a.usageCount);

  return {
    totalSnippets: snippets.length,
    byCategory,
    mostUsed: sorted.slice(0, 5),
    leastUsed: sorted.slice(-5).reverse(),
  };
}

// ============================================
// Snippet Categories
// ============================================

export const SNIPPET_CATEGORIES: {
  id: SnippetCategory;
  name: string;
  description: string;
  icon: string;
}[] = [
  { id: 'safety', name: 'Safety', description: 'Safety guidelines and content moderation', icon: 'shield' },
  { id: 'formatting', name: 'Formatting', description: 'Output format instructions', icon: 'layout' },
  { id: 'persona', name: 'Persona', description: 'AI role and personality definitions', icon: 'user' },
  { id: 'instructions', name: 'Instructions', description: 'Methodology and process guides', icon: 'list' },
  { id: 'examples', name: 'Examples', description: 'Example templates and patterns', icon: 'file-text' },
  { id: 'constraints', name: 'Constraints', description: 'Rules and limitations', icon: 'lock' },
  { id: 'output', name: 'Output', description: 'Output specifications', icon: 'terminal' },
  { id: 'custom', name: 'Custom', description: 'Custom snippets', icon: 'star' },
];
