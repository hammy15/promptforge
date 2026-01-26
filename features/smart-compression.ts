// smart-compression.ts - Intelligent prompt compression to reduce token usage
// Maintains semantic meaning while reducing costs

// ============================================
// Types
// ============================================

export interface CompressionResult {
  original: string;
  compressed: string;
  originalTokens: number;
  compressedTokens: number;
  savings: number; // Percentage
  changes: CompressionChange[];
}

export interface CompressionChange {
  type: CompressionType;
  original: string;
  compressed: string;
  tokensSaved: number;
}

export type CompressionType =
  | 'remove_redundancy'
  | 'simplify_phrase'
  | 'remove_filler'
  | 'abbreviate'
  | 'restructure'
  | 'combine_sentences'
  | 'remove_examples';

export interface CompressionOptions {
  targetReduction?: number; // Target percentage reduction (0-1)
  preserveExamples?: boolean;
  preserveFormatting?: boolean;
  aggressiveness?: 'low' | 'medium' | 'high';
  customPatterns?: { pattern: RegExp; replacement: string }[];
}

// ============================================
// Compression Patterns
// ============================================

interface CompressionPattern {
  type: CompressionType;
  pattern: RegExp;
  replacement: string | ((match: string, ...groups: string[]) => string);
  description: string;
  aggressiveness: 'low' | 'medium' | 'high';
}

const COMPRESSION_PATTERNS: CompressionPattern[] = [
  // Remove filler words
  {
    type: 'remove_filler',
    pattern: /\b(basically|essentially|actually|really|very|quite|somewhat|rather)\b/gi,
    replacement: '',
    description: 'Remove filler words',
    aggressiveness: 'low',
  },
  {
    type: 'remove_filler',
    pattern: /\b(in order to)\b/gi,
    replacement: 'to',
    description: 'Simplify "in order to"',
    aggressiveness: 'low',
  },
  {
    type: 'remove_filler',
    pattern: /\b(at this point in time)\b/gi,
    replacement: 'now',
    description: 'Simplify "at this point in time"',
    aggressiveness: 'low',
  },
  {
    type: 'remove_filler',
    pattern: /\b(due to the fact that)\b/gi,
    replacement: 'because',
    description: 'Simplify "due to the fact that"',
    aggressiveness: 'low',
  },
  {
    type: 'remove_filler',
    pattern: /\b(in the event that)\b/gi,
    replacement: 'if',
    description: 'Simplify "in the event that"',
    aggressiveness: 'low',
  },

  // Simplify phrases
  {
    type: 'simplify_phrase',
    pattern: /\b(it is important to note that)\b/gi,
    replacement: 'Note:',
    description: 'Simplify importance markers',
    aggressiveness: 'low',
  },
  {
    type: 'simplify_phrase',
    pattern: /\b(please make sure to|please ensure that|make sure to|ensure that)\b/gi,
    replacement: '',
    description: 'Remove unnecessary politeness',
    aggressiveness: 'medium',
  },
  {
    type: 'simplify_phrase',
    pattern: /\b(I would like you to|I want you to)\b/gi,
    replacement: '',
    description: 'Remove request preamble',
    aggressiveness: 'medium',
  },
  {
    type: 'simplify_phrase',
    pattern: /\b(as mentioned (above|earlier|previously|before))\b/gi,
    replacement: '',
    description: 'Remove reference to earlier content',
    aggressiveness: 'medium',
  },

  // Remove redundancy
  {
    type: 'remove_redundancy',
    pattern: /\b(absolutely essential|completely unique|very unique|totally unique)\b/gi,
    replacement: (_match: string, ...groups: string[]) => groups[0]?.split(' ').pop() || 'essential',
    description: 'Remove redundant modifiers',
    aggressiveness: 'low',
  },
  {
    type: 'remove_redundancy',
    pattern: /\b(free gift|advance planning|past history|future plans)\b/gi,
    replacement: (_match: string, ...groups: string[]) => groups[0]?.split(' ').pop() || '',
    description: 'Remove redundant word pairs',
    aggressiveness: 'low',
  },
  {
    type: 'remove_redundancy',
    pattern: /(\.\s*){2,}/g,
    replacement: '. ',
    description: 'Remove multiple periods',
    aggressiveness: 'low',
  },

  // Abbreviate common phrases
  {
    type: 'abbreviate',
    pattern: /\b(for example)\b/gi,
    replacement: 'e.g.',
    description: 'Abbreviate "for example"',
    aggressiveness: 'medium',
  },
  {
    type: 'abbreviate',
    pattern: /\b(that is to say)\b/gi,
    replacement: 'i.e.',
    description: 'Abbreviate "that is to say"',
    aggressiveness: 'medium',
  },
  {
    type: 'abbreviate',
    pattern: /\b(and so on|et cetera)\b/gi,
    replacement: 'etc.',
    description: 'Abbreviate "and so on"',
    aggressiveness: 'medium',
  },

  // Restructure verbose constructions
  {
    type: 'restructure',
    pattern: /\b(the reason (why|that) is (because)?)\b/gi,
    replacement: 'because',
    description: 'Simplify reason constructions',
    aggressiveness: 'low',
  },
  {
    type: 'restructure',
    pattern: /\b(there (is|are) [^.]*? that)\b/gi,
    replacement: '',
    description: 'Remove "there is/are" constructions',
    aggressiveness: 'high',
  },
  {
    type: 'restructure',
    pattern: /\b(it is (clear|obvious|evident) that)\b/gi,
    replacement: '',
    description: 'Remove obvious markers',
    aggressiveness: 'medium',
  },

  // Remove excessive formatting
  {
    type: 'remove_redundancy',
    pattern: /\n{3,}/g,
    replacement: '\n\n',
    description: 'Reduce excessive line breaks',
    aggressiveness: 'low',
  },
  {
    type: 'remove_redundancy',
    pattern: /\s{2,}/g,
    replacement: ' ',
    description: 'Reduce excessive spaces',
    aggressiveness: 'low',
  },
];

// ============================================
// Main Compression Function
// ============================================

/**
 * Compress a prompt while preserving meaning
 */
export function compressPrompt(
  text: string,
  options: CompressionOptions = {}
): CompressionResult {
  const {
    targetReduction = 0.3,
    preserveExamples = true,
    preserveFormatting = true,
    aggressiveness = 'medium',
    customPatterns = [],
  } = options;

  const originalTokens = estimateTokens(text);
  const changes: CompressionChange[] = [];
  let compressed = text;

  // Get applicable patterns based on aggressiveness
  const aggressivenessLevel = { low: 1, medium: 2, high: 3 };
  const applicablePatterns = COMPRESSION_PATTERNS.filter(
    (p) => aggressivenessLevel[p.aggressiveness] <= aggressivenessLevel[aggressiveness]
  );

  // Apply custom patterns first
  for (const { pattern, replacement } of customPatterns) {
    const before = compressed;
    compressed = compressed.replace(pattern, replacement);
    if (before !== compressed) {
      changes.push({
        type: 'restructure',
        original: before.match(pattern)?.[0] || '',
        compressed: replacement,
        tokensSaved: estimateTokens(before) - estimateTokens(compressed),
      });
    }
  }

  // Apply standard patterns
  for (const pattern of applicablePatterns) {
    const before = compressed;
    compressed = compressed.replace(
      pattern.pattern,
      pattern.replacement as string
    );

    if (before !== compressed) {
      const match = before.match(pattern.pattern);
      changes.push({
        type: pattern.type,
        original: match?.[0] || '',
        compressed: typeof pattern.replacement === 'string' ? pattern.replacement : '',
        tokensSaved: estimateTokens(before) - estimateTokens(compressed),
      });
    }
  }

  // Preserve examples if requested
  if (!preserveExamples) {
    const examplePatterns = [
      /## Examples?\n[\s\S]*?(?=##|$)/gi,
      /\bExample:[\s\S]*?(?=\n\n|$)/gi,
      /\bFor instance:[\s\S]*?(?=\n\n|$)/gi,
    ];

    for (const pattern of examplePatterns) {
      const before = compressed;
      compressed = compressed.replace(pattern, '');
      if (before !== compressed) {
        changes.push({
          type: 'remove_examples',
          original: before.match(pattern)?.[0] || '',
          compressed: '',
          tokensSaved: estimateTokens(before) - estimateTokens(compressed),
        });
      }
    }
  }

  // Preserve formatting if requested
  if (!preserveFormatting) {
    // Remove markdown formatting
    compressed = compressed
      .replace(/\*\*([^*]+)\*\*/g, '$1') // Bold
      .replace(/__([^_]+)__/g, '$1') // Bold alt
      .replace(/\*([^*]+)\*/g, '$1') // Italic
      .replace(/_([^_]+)_/g, '$1') // Italic alt
      .replace(/`([^`]+)`/g, '$1') // Code
      .replace(/^#+\s*/gm, ''); // Headers
  }

  // Clean up
  compressed = compressed
    .replace(/\s+/g, ' ')
    .replace(/\n\s*\n/g, '\n\n')
    .trim();

  const compressedTokens = estimateTokens(compressed);
  const savings = ((originalTokens - compressedTokens) / originalTokens) * 100;

  return {
    original: text,
    compressed,
    originalTokens,
    compressedTokens,
    savings: Math.round(savings * 10) / 10,
    changes,
  };
}

/**
 * Estimate token count (simplified)
 */
function estimateTokens(text: string): number {
  return Math.ceil(text.split(/\s+/).length * 1.3);
}

// ============================================
// Semantic-Aware Compression
// ============================================

/**
 * Compress while preserving semantic structure
 */
export function semanticCompress(
  systemPrompt: string,
  userPrompt: string,
  options: CompressionOptions = {}
): {
  systemPrompt: CompressionResult;
  userPrompt: CompressionResult;
  totalSavings: number;
} {
  // Preserve critical parts of system prompt
  const systemProtectedParts = extractProtectedParts(systemPrompt);
  let compressibleSystem = systemPrompt;

  for (const part of systemProtectedParts) {
    compressibleSystem = compressibleSystem.replace(part, `__PROTECTED_${systemProtectedParts.indexOf(part)}__`);
  }

  const compressedSystem = compressPrompt(compressibleSystem, options);

  // Restore protected parts
  let finalSystem = compressedSystem.compressed;
  for (let i = 0; i < systemProtectedParts.length; i++) {
    finalSystem = finalSystem.replace(`__PROTECTED_${i}__`, systemProtectedParts[i]);
  }

  compressedSystem.compressed = finalSystem;

  // Compress user prompt
  const compressedUser = compressPrompt(userPrompt, options);

  const originalTotal = compressedSystem.originalTokens + compressedUser.originalTokens;
  const compressedTotal = compressedSystem.compressedTokens + compressedUser.compressedTokens;
  const totalSavings = ((originalTotal - compressedTotal) / originalTotal) * 100;

  return {
    systemPrompt: compressedSystem,
    userPrompt: compressedUser,
    totalSavings: Math.round(totalSavings * 10) / 10,
  };
}

/**
 * Extract parts that should not be compressed
 */
function extractProtectedParts(text: string): string[] {
  const protectedParts: string[] = [];

  // Protect code blocks
  const codeBlocks = text.match(/```[\s\S]*?```/g) || [];
  protectedParts.push(...codeBlocks);

  // Protect JSON examples
  const jsonBlocks = text.match(/\{[\s\S]*?\}/g) || [];
  protectedParts.push(...jsonBlocks.filter((b) => {
    try {
      JSON.parse(b);
      return true;
    } catch {
      return false;
    }
  }));

  // Protect variable syntax
  const variables = text.match(/\{\{[^}]+\}\}/g) || [];
  protectedParts.push(...variables);

  // Protect URLs
  const urls = text.match(/https?:\/\/[^\s]+/g) || [];
  protectedParts.push(...urls);

  return protectedParts;
}

// ============================================
// Compression Suggestions
// ============================================

export interface CompressionSuggestion {
  type: CompressionType;
  original: string;
  suggested: string;
  potentialSavings: number;
  explanation: string;
  apply: () => string;
}

/**
 * Get compression suggestions without applying them
 */
export function getCompressionSuggestions(text: string): CompressionSuggestion[] {
  const suggestions: CompressionSuggestion[] = [];

  for (const pattern of COMPRESSION_PATTERNS) {
    const matches = text.matchAll(new RegExp(pattern.pattern.source, 'gi'));

    for (const match of matches) {
      const original = match[0];
      const suggested = typeof pattern.replacement === 'function'
        ? pattern.replacement(original, ...match.slice(1))
        : original.replace(pattern.pattern, pattern.replacement);

      if (original !== suggested) {
        suggestions.push({
          type: pattern.type,
          original,
          suggested,
          potentialSavings: estimateTokens(original) - estimateTokens(suggested),
          explanation: pattern.description,
          apply: () => text.replace(original, suggested),
        });
      }
    }
  }

  // Sort by potential savings
  suggestions.sort((a, b) => b.potentialSavings - a.potentialSavings);

  return suggestions;
}

// ============================================
// Batch Compression
// ============================================

export interface BatchCompressionResult {
  results: CompressionResult[];
  totalOriginalTokens: number;
  totalCompressedTokens: number;
  overallSavings: number;
  avgSavingsPerPrompt: number;
}

/**
 * Compress multiple prompts
 */
export function batchCompress(
  prompts: string[],
  options: CompressionOptions = {}
): BatchCompressionResult {
  const results = prompts.map((p) => compressPrompt(p, options));

  const totalOriginalTokens = results.reduce((sum, r) => sum + r.originalTokens, 0);
  const totalCompressedTokens = results.reduce((sum, r) => sum + r.compressedTokens, 0);
  const overallSavings = ((totalOriginalTokens - totalCompressedTokens) / totalOriginalTokens) * 100;

  return {
    results,
    totalOriginalTokens,
    totalCompressedTokens,
    overallSavings: Math.round(overallSavings * 10) / 10,
    avgSavingsPerPrompt: Math.round((results.reduce((sum, r) => sum + r.savings, 0) / results.length) * 10) / 10,
  };
}

// ============================================
// Cost Savings Calculator
// ============================================

export interface CostSavingsEstimate {
  originalCost: number;
  compressedCost: number;
  savingsPerExecution: number;
  monthlySavings: number;
  yearlySavings: number;
}

/**
 * Estimate cost savings from compression
 */
export function estimateCostSavings(
  compressionResult: CompressionResult,
  modelPricePerMillionTokens: number,
  monthlyExecutions: number
): CostSavingsEstimate {
  const originalCost = (compressionResult.originalTokens * modelPricePerMillionTokens) / 1_000_000;
  const compressedCost = (compressionResult.compressedTokens * modelPricePerMillionTokens) / 1_000_000;
  const savingsPerExecution = originalCost - compressedCost;

  return {
    originalCost,
    compressedCost,
    savingsPerExecution,
    monthlySavings: savingsPerExecution * monthlyExecutions,
    yearlySavings: savingsPerExecution * monthlyExecutions * 12,
  };
}

// ============================================
// Compression Quality Check
// ============================================

/**
 * Check if compression preserves key information
 */
export function validateCompression(
  original: string,
  compressed: string
): { valid: boolean; warnings: string[] } {
  const warnings: string[] = [];

  // Check if variables are preserved
  const originalVars = original.match(/\{\{[^}]+\}\}/g) || [];
  const compressedVars = compressed.match(/\{\{[^}]+\}\}/g) || [];

  if (originalVars.length !== compressedVars.length) {
    warnings.push('Some variables may have been removed');
  }

  // Check if URLs are preserved
  const originalUrls = original.match(/https?:\/\/[^\s]+/g) || [];
  const compressedUrls = compressed.match(/https?:\/\/[^\s]+/g) || [];

  if (originalUrls.length !== compressedUrls.length) {
    warnings.push('Some URLs may have been removed');
  }

  // Check for excessive compression
  const compressionRatio = compressed.length / original.length;
  if (compressionRatio < 0.3) {
    warnings.push('Compression may be too aggressive - verify meaning is preserved');
  }

  return {
    valid: warnings.length === 0,
    warnings,
  };
}
