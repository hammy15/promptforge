// cost-calculator.ts - Token estimation and cost calculation
// Real-time cost preview and optimization suggestions

import type { AIModel } from '@/types/prompt.types';

// ============================================
// Model Pricing (per million tokens)
// ============================================

export interface ModelPricing {
  id: string;
  name: string;
  provider: string;
  inputPricePerMillion: number;
  outputPricePerMillion: number;
  contextWindow: number;
  maxOutput: number;
}

export const MODEL_PRICING: ModelPricing[] = [
  // Anthropic
  {
    id: 'claude-opus-4-5-20250514',
    name: 'Claude Opus 4.5',
    provider: 'anthropic',
    inputPricePerMillion: 15,
    outputPricePerMillion: 75,
    contextWindow: 200000,
    maxOutput: 32000,
  },
  {
    id: 'claude-sonnet-4-20250514',
    name: 'Claude Sonnet 4',
    provider: 'anthropic',
    inputPricePerMillion: 3,
    outputPricePerMillion: 15,
    contextWindow: 200000,
    maxOutput: 64000,
  },
  {
    id: 'claude-3-5-haiku-20241022',
    name: 'Claude 3.5 Haiku',
    provider: 'anthropic',
    inputPricePerMillion: 0.25,
    outputPricePerMillion: 1.25,
    contextWindow: 200000,
    maxOutput: 8192,
  },
  // OpenAI
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    provider: 'openai',
    inputPricePerMillion: 5,
    outputPricePerMillion: 15,
    contextWindow: 128000,
    maxOutput: 16384,
  },
  {
    id: 'gpt-4-turbo',
    name: 'GPT-4 Turbo',
    provider: 'openai',
    inputPricePerMillion: 10,
    outputPricePerMillion: 30,
    contextWindow: 128000,
    maxOutput: 4096,
  },
  {
    id: 'gpt-3.5-turbo',
    name: 'GPT-3.5 Turbo',
    provider: 'openai',
    inputPricePerMillion: 0.5,
    outputPricePerMillion: 1.5,
    contextWindow: 16385,
    maxOutput: 4096,
  },
  // Google
  {
    id: 'gemini-1.5-pro',
    name: 'Gemini 1.5 Pro',
    provider: 'google',
    inputPricePerMillion: 3.5,
    outputPricePerMillion: 10.5,
    contextWindow: 1000000,
    maxOutput: 8192,
  },
  {
    id: 'gemini-1.5-flash',
    name: 'Gemini 1.5 Flash',
    provider: 'google',
    inputPricePerMillion: 0.075,
    outputPricePerMillion: 0.3,
    contextWindow: 1000000,
    maxOutput: 8192,
  },
];

// ============================================
// Token Estimation
// ============================================

/**
 * Estimate token count for text
 * Uses ~4 characters per token for English (approximation)
 * More accurate estimation would use a proper tokenizer
 */
export function estimateTokens(text: string): number {
  if (!text) return 0;

  // Count words, punctuation, and whitespace separately
  const words = text.split(/\s+/).filter(Boolean).length;
  const punctuation = (text.match(/[.,!?;:'"()\[\]{}]/g) || []).length;
  const numbers = (text.match(/\d+/g) || []).length;

  // Rough estimation: ~1.3 tokens per word on average
  // Punctuation is usually 1 token each
  // Numbers can vary
  return Math.ceil(words * 1.3 + punctuation + numbers * 0.5);
}

/**
 * More accurate token estimation using byte-pair encoding approximation
 */
export function estimateTokensAccurate(text: string): number {
  if (!text) return 0;

  // Split into "token-like" units
  const tokenPattern = /[\w]+|[^\w\s]|\s+/g;
  const matches = text.match(tokenPattern) || [];

  let tokens = 0;
  for (const match of matches) {
    if (/^\s+$/.test(match)) {
      // Whitespace
      tokens += Math.ceil(match.length / 4);
    } else if (/^[\w]+$/.test(match)) {
      // Words - estimate based on length
      if (match.length <= 4) {
        tokens += 1;
      } else if (match.length <= 8) {
        tokens += 2;
      } else {
        tokens += Math.ceil(match.length / 4);
      }
    } else {
      // Punctuation/special chars
      tokens += 1;
    }
  }

  return tokens;
}

// ============================================
// Cost Calculation
// ============================================

export interface CostEstimate {
  inputTokens: number;
  outputTokens: number;
  inputCost: number;
  outputCost: number;
  totalCost: number;
  model: ModelPricing;
}

/**
 * Calculate cost for a single execution
 */
export function calculateCost(
  inputText: string,
  estimatedOutputTokens: number,
  modelId: string
): CostEstimate {
  const model = MODEL_PRICING.find((m) => m.id === modelId);
  if (!model) {
    throw new Error(`Unknown model: ${modelId}`);
  }

  const inputTokens = estimateTokensAccurate(inputText);
  const outputTokens = Math.min(estimatedOutputTokens, model.maxOutput);

  const inputCost = (inputTokens * model.inputPricePerMillion) / 1_000_000;
  const outputCost = (outputTokens * model.outputPricePerMillion) / 1_000_000;

  return {
    inputTokens,
    outputTokens,
    inputCost,
    outputCost,
    totalCost: inputCost + outputCost,
    model,
  };
}

/**
 * Calculate batch cost
 */
export function calculateBatchCost(
  prompts: string[],
  avgOutputTokens: number,
  modelId: string
): {
  estimates: CostEstimate[];
  totalCost: number;
  avgCostPerPrompt: number;
} {
  const estimates = prompts.map((p) =>
    calculateCost(p, avgOutputTokens, modelId)
  );

  const totalCost = estimates.reduce((sum, e) => sum + e.totalCost, 0);

  return {
    estimates,
    totalCost,
    avgCostPerPrompt: totalCost / prompts.length,
  };
}

/**
 * Project monthly cost based on usage
 */
export function projectMonthlyCost(
  dailyExecutions: number,
  avgInputTokens: number,
  avgOutputTokens: number,
  modelId: string
): {
  daily: number;
  weekly: number;
  monthly: number;
  yearly: number;
} {
  const model = MODEL_PRICING.find((m) => m.id === modelId);
  if (!model) {
    throw new Error(`Unknown model: ${modelId}`);
  }

  const costPerExecution =
    (avgInputTokens * model.inputPricePerMillion) / 1_000_000 +
    (avgOutputTokens * model.outputPricePerMillion) / 1_000_000;

  const daily = dailyExecutions * costPerExecution;

  return {
    daily,
    weekly: daily * 7,
    monthly: daily * 30,
    yearly: daily * 365,
  };
}

// ============================================
// Cost Optimization
// ============================================

export interface OptimizationSuggestion {
  type: 'model_switch' | 'prompt_compression' | 'caching' | 'batching';
  description: string;
  currentCost: number;
  projectedCost: number;
  savings: number;
  savingsPercent: number;
  recommendation: string;
}

/**
 * Get cost optimization suggestions
 */
export function getOptimizationSuggestions(
  inputText: string,
  outputTokens: number,
  currentModelId: string,
  monthlyExecutions: number
): OptimizationSuggestion[] {
  const suggestions: OptimizationSuggestion[] = [];
  const currentEstimate = calculateCost(inputText, outputTokens, currentModelId);
  const monthlyCurrentCost = currentEstimate.totalCost * monthlyExecutions;

  // Check for cheaper model alternatives
  const currentModel = MODEL_PRICING.find((m) => m.id === currentModelId)!;

  for (const altModel of MODEL_PRICING) {
    if (altModel.id === currentModelId) continue;
    if (altModel.contextWindow < currentEstimate.inputTokens) continue;

    const altEstimate = calculateCost(inputText, outputTokens, altModel.id);
    const monthlyAltCost = altEstimate.totalCost * monthlyExecutions;
    const savings = monthlyCurrentCost - monthlyAltCost;

    if (savings > 0) {
      suggestions.push({
        type: 'model_switch',
        description: `Switch from ${currentModel.name} to ${altModel.name}`,
        currentCost: monthlyCurrentCost,
        projectedCost: monthlyAltCost,
        savings,
        savingsPercent: (savings / monthlyCurrentCost) * 100,
        recommendation: `Consider using ${altModel.name} for simpler tasks to save $${savings.toFixed(2)}/month`,
      });
    }
  }

  // Prompt compression suggestion if prompt is long
  if (currentEstimate.inputTokens > 1000) {
    const compressionSavings = monthlyCurrentCost * 0.2; // Assume 20% reduction
    suggestions.push({
      type: 'prompt_compression',
      description: 'Optimize prompt to reduce token usage',
      currentCost: monthlyCurrentCost,
      projectedCost: monthlyCurrentCost * 0.8,
      savings: compressionSavings,
      savingsPercent: 20,
      recommendation: 'Your prompt is lengthy. Consider removing redundant instructions or using prompt compression.',
    });
  }

  // Caching suggestion for repetitive prompts
  if (monthlyExecutions > 100) {
    const cacheSavings = monthlyCurrentCost * 0.3; // Assume 30% cache hit rate
    suggestions.push({
      type: 'caching',
      description: 'Enable response caching for repeated queries',
      currentCost: monthlyCurrentCost,
      projectedCost: monthlyCurrentCost * 0.7,
      savings: cacheSavings,
      savingsPercent: 30,
      recommendation: 'With high volume, caching similar queries could reduce costs significantly.',
    });
  }

  // Sort by savings
  suggestions.sort((a, b) => b.savings - a.savings);

  return suggestions;
}

// ============================================
// Budget Tracking
// ============================================

export interface BudgetConfig {
  monthlyLimit: number;
  warningThreshold: number; // Percentage (0-1)
  alertThreshold: number;
}

export interface BudgetStatus {
  spent: number;
  remaining: number;
  percentUsed: number;
  status: 'ok' | 'warning' | 'alert' | 'exceeded';
  projectedEndOfMonth: number;
  daysRemaining: number;
}

/**
 * Check budget status
 */
export function checkBudgetStatus(
  config: BudgetConfig,
  currentSpend: number,
  dailyAvgSpend: number
): BudgetStatus {
  const today = new Date();
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const daysRemaining = Math.ceil(
    (endOfMonth.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  const projectedEndOfMonth = currentSpend + dailyAvgSpend * daysRemaining;
  const percentUsed = currentSpend / config.monthlyLimit;

  let status: BudgetStatus['status'] = 'ok';
  if (currentSpend >= config.monthlyLimit) {
    status = 'exceeded';
  } else if (percentUsed >= config.alertThreshold) {
    status = 'alert';
  } else if (percentUsed >= config.warningThreshold) {
    status = 'warning';
  }

  return {
    spent: currentSpend,
    remaining: Math.max(0, config.monthlyLimit - currentSpend),
    percentUsed: percentUsed * 100,
    status,
    projectedEndOfMonth,
    daysRemaining,
  };
}

// ============================================
// Format Helpers
// ============================================

export function formatCost(amount: number): string {
  if (amount < 0.01) {
    return `$${(amount * 100).toFixed(3)}¢`;
  }
  return `$${amount.toFixed(4)}`;
}

export function formatTokens(count: number): string {
  if (count >= 1_000_000) {
    return `${(count / 1_000_000).toFixed(1)}M`;
  }
  if (count >= 1_000) {
    return `${(count / 1_000).toFixed(1)}K`;
  }
  return count.toString();
}

// ============================================
// Cost Comparison
// ============================================

export interface ModelComparison {
  model: ModelPricing;
  inputCost: number;
  outputCost: number;
  totalCost: number;
  relativeCost: number; // 1.0 = cheapest
}

/**
 * Compare costs across all models
 */
export function compareModels(
  inputTokens: number,
  outputTokens: number
): ModelComparison[] {
  const comparisons: ModelComparison[] = MODEL_PRICING.map((model) => {
    const inputCost = (inputTokens * model.inputPricePerMillion) / 1_000_000;
    const outputCost = (outputTokens * model.outputPricePerMillion) / 1_000_000;

    return {
      model,
      inputCost,
      outputCost,
      totalCost: inputCost + outputCost,
      relativeCost: 0, // Will calculate below
    };
  });

  // Calculate relative cost
  const minCost = Math.min(...comparisons.map((c) => c.totalCost));
  for (const comparison of comparisons) {
    comparison.relativeCost = comparison.totalCost / minCost;
  }

  // Sort by total cost
  comparisons.sort((a, b) => a.totalCost - b.totalCost);

  return comparisons;
}
