// model-recommendation.ts - Smart model recommendation based on prompt characteristics
// Analyzes prompts and suggests the best model for the task

import { MODEL_PRICING, type ModelPricing } from './cost-calculator';

// ============================================
// Types
// ============================================

export interface PromptCharacteristics {
  tokenCount: number;
  complexity: 'simple' | 'moderate' | 'complex';
  taskType: TaskType;
  requiresReasoning: boolean;
  requiresCreativity: boolean;
  requiresFactualAccuracy: boolean;
  requiresCodeGeneration: boolean;
  requiresLongContext: boolean;
  latencySensitive: boolean;
  budgetConstraint?: number; // Max cost per request
}

export type TaskType =
  | 'classification'
  | 'extraction'
  | 'summarization'
  | 'generation'
  | 'translation'
  | 'code'
  | 'reasoning'
  | 'conversation'
  | 'analysis'
  | 'creative';

export interface ModelRecommendation {
  model: ModelPricing;
  score: number; // 0-100
  reasons: string[];
  warnings: string[];
  estimatedCost: number;
  estimatedLatency: 'fast' | 'medium' | 'slow';
}

export interface ModelCapabilities {
  modelId: string;
  reasoning: number; // 0-10
  creativity: number;
  factualAccuracy: number;
  codeGeneration: number;
  speed: number;
  costEfficiency: number;
  contextHandling: number;
  instructionFollowing: number;
}

// ============================================
// Model Capabilities Database
// ============================================

const MODEL_CAPABILITIES: ModelCapabilities[] = [
  {
    modelId: 'claude-opus-4-5-20250514',
    reasoning: 10,
    creativity: 9,
    factualAccuracy: 9,
    codeGeneration: 10,
    speed: 5,
    costEfficiency: 3,
    contextHandling: 9,
    instructionFollowing: 10,
  },
  {
    modelId: 'claude-sonnet-4-20250514',
    reasoning: 9,
    creativity: 8,
    factualAccuracy: 8,
    codeGeneration: 9,
    speed: 7,
    costEfficiency: 7,
    contextHandling: 9,
    instructionFollowing: 9,
  },
  {
    modelId: 'claude-3-5-haiku-20241022',
    reasoning: 7,
    creativity: 7,
    factualAccuracy: 7,
    codeGeneration: 7,
    speed: 10,
    costEfficiency: 10,
    contextHandling: 8,
    instructionFollowing: 8,
  },
  {
    modelId: 'gpt-4o',
    reasoning: 9,
    creativity: 8,
    factualAccuracy: 8,
    codeGeneration: 9,
    speed: 7,
    costEfficiency: 6,
    contextHandling: 8,
    instructionFollowing: 9,
  },
  {
    modelId: 'gpt-4-turbo',
    reasoning: 9,
    creativity: 8,
    factualAccuracy: 8,
    codeGeneration: 8,
    speed: 6,
    costEfficiency: 4,
    contextHandling: 8,
    instructionFollowing: 8,
  },
  {
    modelId: 'gpt-3.5-turbo',
    reasoning: 6,
    creativity: 6,
    factualAccuracy: 6,
    codeGeneration: 6,
    speed: 9,
    costEfficiency: 9,
    contextHandling: 5,
    instructionFollowing: 7,
  },
  {
    modelId: 'gemini-1.5-pro',
    reasoning: 8,
    creativity: 7,
    factualAccuracy: 8,
    codeGeneration: 8,
    speed: 7,
    costEfficiency: 7,
    contextHandling: 10,
    instructionFollowing: 8,
  },
  {
    modelId: 'gemini-1.5-flash',
    reasoning: 6,
    creativity: 6,
    factualAccuracy: 7,
    codeGeneration: 6,
    speed: 10,
    costEfficiency: 10,
    contextHandling: 10,
    instructionFollowing: 7,
  },
];

// ============================================
// Prompt Analysis
// ============================================

/**
 * Analyze a prompt to determine its characteristics
 */
export function analyzePromptCharacteristics(
  prompt: string,
  systemPrompt?: string
): PromptCharacteristics {
  const fullText = `${systemPrompt || ''} ${prompt}`.toLowerCase();
  const wordCount = fullText.split(/\s+/).length;
  const tokenCount = Math.ceil(wordCount * 1.3);

  // Determine complexity
  let complexity: PromptCharacteristics['complexity'] = 'simple';
  if (wordCount > 500 || fullText.includes('step by step') || fullText.includes('analyze')) {
    complexity = 'complex';
  } else if (wordCount > 100) {
    complexity = 'moderate';
  }

  // Detect task type
  const taskType = detectTaskType(fullText);

  // Detect requirements
  const requiresReasoning = detectReasoningRequirement(fullText);
  const requiresCreativity = detectCreativityRequirement(fullText);
  const requiresFactualAccuracy = detectFactualRequirement(fullText);
  const requiresCodeGeneration = detectCodeRequirement(fullText);
  const requiresLongContext = tokenCount > 4000;
  const latencySensitive = fullText.includes('quick') || fullText.includes('fast') || fullText.includes('immediately');

  return {
    tokenCount,
    complexity,
    taskType,
    requiresReasoning,
    requiresCreativity,
    requiresFactualAccuracy,
    requiresCodeGeneration,
    requiresLongContext,
    latencySensitive,
  };
}

function detectTaskType(text: string): TaskType {
  const patterns: { type: TaskType; keywords: string[] }[] = [
    { type: 'classification', keywords: ['classify', 'categorize', 'label', 'identify type', 'is this'] },
    { type: 'extraction', keywords: ['extract', 'find all', 'list all', 'pull out', 'identify'] },
    { type: 'summarization', keywords: ['summarize', 'summary', 'brief', 'tldr', 'key points'] },
    { type: 'generation', keywords: ['write', 'create', 'generate', 'compose', 'draft'] },
    { type: 'translation', keywords: ['translate', 'convert to', 'in spanish', 'in french'] },
    { type: 'code', keywords: ['code', 'function', 'implement', 'program', 'script', 'debug'] },
    { type: 'reasoning', keywords: ['why', 'explain', 'analyze', 'reason', 'think through'] },
    { type: 'conversation', keywords: ['chat', 'talk', 'discuss', 'conversation'] },
    { type: 'analysis', keywords: ['analyze', 'evaluate', 'assess', 'review', 'compare'] },
    { type: 'creative', keywords: ['story', 'poem', 'creative', 'imagine', 'fiction'] },
  ];

  for (const { type, keywords } of patterns) {
    if (keywords.some((kw) => text.includes(kw))) {
      return type;
    }
  }

  return 'generation'; // Default
}

function detectReasoningRequirement(text: string): boolean {
  const reasoningKeywords = [
    'why', 'explain', 'analyze', 'reason', 'think through', 'step by step',
    'consider', 'evaluate', 'compare', 'contrast', 'deduce', 'infer',
  ];
  return reasoningKeywords.some((kw) => text.includes(kw));
}

function detectCreativityRequirement(text: string): boolean {
  const creativityKeywords = [
    'creative', 'original', 'unique', 'innovative', 'imaginative',
    'story', 'poem', 'fiction', 'brainstorm', 'ideas',
  ];
  return creativityKeywords.some((kw) => text.includes(kw));
}

function detectFactualRequirement(text: string): boolean {
  const factualKeywords = [
    'accurate', 'factual', 'correct', 'precise', 'exact',
    'citation', 'source', 'reference', 'verify', 'fact',
  ];
  return factualKeywords.some((kw) => text.includes(kw));
}

function detectCodeRequirement(text: string): boolean {
  const codeKeywords = [
    'code', 'function', 'class', 'implement', 'program',
    'javascript', 'python', 'typescript', 'react', 'api',
    'debug', 'fix', 'refactor', 'test',
  ];
  return codeKeywords.some((kw) => text.includes(kw));
}

// ============================================
// Recommendation Engine
// ============================================

/**
 * Get model recommendations based on prompt characteristics
 */
export function getModelRecommendations(
  characteristics: PromptCharacteristics
): ModelRecommendation[] {
  const recommendations: ModelRecommendation[] = [];

  for (const pricing of MODEL_PRICING) {
    const capabilities = MODEL_CAPABILITIES.find((c) => c.modelId === pricing.id);
    if (!capabilities) continue;

    // Check context window
    if (characteristics.tokenCount > pricing.contextWindow) {
      continue;
    }

    const { score, reasons, warnings } = calculateModelScore(characteristics, capabilities, pricing);

    // Estimate cost
    const avgOutputTokens = getExpectedOutputTokens(characteristics);
    const inputCost = (characteristics.tokenCount * pricing.inputPricePerMillion) / 1_000_000;
    const outputCost = (avgOutputTokens * pricing.outputPricePerMillion) / 1_000_000;
    const estimatedCost = inputCost + outputCost;

    // Check budget constraint
    if (characteristics.budgetConstraint && estimatedCost > characteristics.budgetConstraint) {
      warnings.push(`Exceeds budget constraint ($${characteristics.budgetConstraint})`);
    }

    // Estimate latency
    let estimatedLatency: ModelRecommendation['estimatedLatency'] = 'medium';
    if (capabilities.speed >= 9) estimatedLatency = 'fast';
    else if (capabilities.speed <= 5) estimatedLatency = 'slow';

    recommendations.push({
      model: pricing,
      score,
      reasons,
      warnings,
      estimatedCost,
      estimatedLatency,
    });
  }

  // Sort by score descending
  recommendations.sort((a, b) => b.score - a.score);

  return recommendations;
}

function calculateModelScore(
  characteristics: PromptCharacteristics,
  capabilities: ModelCapabilities,
  pricing: ModelPricing
): { score: number; reasons: string[]; warnings: string[] } {
  let score = 50; // Base score
  const reasons: string[] = [];
  const warnings: string[] = [];

  // Task-specific scoring
  switch (characteristics.taskType) {
    case 'code':
      score += capabilities.codeGeneration * 3;
      if (capabilities.codeGeneration >= 9) {
        reasons.push('Excellent code generation capabilities');
      }
      break;
    case 'reasoning':
    case 'analysis':
      score += capabilities.reasoning * 3;
      if (capabilities.reasoning >= 9) {
        reasons.push('Strong reasoning and analysis capabilities');
      }
      break;
    case 'creative':
      score += capabilities.creativity * 3;
      if (capabilities.creativity >= 8) {
        reasons.push('Good creative writing abilities');
      }
      break;
    case 'classification':
    case 'extraction':
      score += capabilities.instructionFollowing * 2;
      score += capabilities.costEfficiency * 2;
      reasons.push('Efficient for structured tasks');
      break;
  }

  // Requirement-based scoring
  if (characteristics.requiresReasoning) {
    score += capabilities.reasoning * 2;
  }

  if (characteristics.requiresCreativity) {
    score += capabilities.creativity * 2;
  }

  if (characteristics.requiresFactualAccuracy) {
    score += capabilities.factualAccuracy * 2;
    if (capabilities.factualAccuracy < 7) {
      warnings.push('May have lower factual accuracy');
    }
  }

  if (characteristics.requiresCodeGeneration) {
    score += capabilities.codeGeneration * 2;
  }

  if (characteristics.requiresLongContext) {
    score += capabilities.contextHandling * 2;
    if (pricing.contextWindow >= 200000) {
      reasons.push('Large context window for long documents');
    }
  }

  if (characteristics.latencySensitive) {
    score += capabilities.speed * 3;
    if (capabilities.speed >= 9) {
      reasons.push('Fast response times');
    } else if (capabilities.speed <= 5) {
      warnings.push('May have slower response times');
    }
  }

  // Complexity adjustments
  if (characteristics.complexity === 'complex') {
    score += capabilities.reasoning * 1.5;
    score += capabilities.instructionFollowing * 1.5;
  } else if (characteristics.complexity === 'simple') {
    score += capabilities.costEfficiency * 2;
    reasons.push('Cost-effective for simple tasks');
  }

  // Cost efficiency bonus for moderate complexity
  if (characteristics.complexity === 'moderate') {
    score += capabilities.costEfficiency * 1.5;
  }

  // Normalize score to 0-100
  score = Math.min(100, Math.max(0, score));

  return { score: Math.round(score), reasons, warnings };
}

function getExpectedOutputTokens(characteristics: PromptCharacteristics): number {
  const baseOutput: Record<TaskType, number> = {
    classification: 50,
    extraction: 200,
    summarization: 300,
    generation: 500,
    translation: 400,
    code: 600,
    reasoning: 800,
    conversation: 200,
    analysis: 600,
    creative: 800,
  };

  let tokens = baseOutput[characteristics.taskType] || 300;

  // Adjust based on complexity
  if (characteristics.complexity === 'complex') {
    tokens *= 2;
  } else if (characteristics.complexity === 'simple') {
    tokens *= 0.5;
  }

  return Math.round(tokens);
}

// ============================================
// Quick Recommendation
// ============================================

/**
 * Get the best model for a given prompt (simplified API)
 */
export function recommendModel(
  prompt: string,
  options: {
    systemPrompt?: string;
    budgetConstraint?: number;
    preferSpeed?: boolean;
    preferQuality?: boolean;
  } = {}
): ModelRecommendation | null {
  const characteristics = analyzePromptCharacteristics(prompt, options.systemPrompt);

  if (options.budgetConstraint) {
    characteristics.budgetConstraint = options.budgetConstraint;
  }

  if (options.preferSpeed) {
    characteristics.latencySensitive = true;
  }

  const recommendations = getModelRecommendations(characteristics);

  if (recommendations.length === 0) return null;

  // If preferQuality, filter for high-score models
  if (options.preferQuality) {
    const qualityModels = recommendations.filter((r) => r.score >= 70);
    return qualityModels[0] || recommendations[0];
  }

  return recommendations[0];
}

// ============================================
// Model Comparison
// ============================================

export interface ModelComparisonResult {
  models: {
    model: ModelPricing;
    capabilities: ModelCapabilities;
    suitabilityScore: number;
  }[];
  bestFor: {
    quality: string;
    speed: string;
    cost: string;
    balanced: string;
  };
}

/**
 * Compare all models for a specific use case
 */
export function compareModelsForUseCase(
  characteristics: PromptCharacteristics
): ModelComparisonResult {
  const recommendations = getModelRecommendations(characteristics);

  const models = recommendations.map((r) => ({
    model: r.model,
    capabilities: MODEL_CAPABILITIES.find((c) => c.modelId === r.model.id)!,
    suitabilityScore: r.score,
  }));

  // Find best for each category
  const sortedByQuality = [...recommendations].sort(
    (a, b) => {
      const capA = MODEL_CAPABILITIES.find((c) => c.modelId === a.model.id)!;
      const capB = MODEL_CAPABILITIES.find((c) => c.modelId === b.model.id)!;
      return (capB.reasoning + capB.factualAccuracy) - (capA.reasoning + capA.factualAccuracy);
    }
  );

  const sortedBySpeed = [...recommendations].sort(
    (a, b) => {
      const capA = MODEL_CAPABILITIES.find((c) => c.modelId === a.model.id)!;
      const capB = MODEL_CAPABILITIES.find((c) => c.modelId === b.model.id)!;
      return capB.speed - capA.speed;
    }
  );

  const sortedByCost = [...recommendations].sort(
    (a, b) => a.estimatedCost - b.estimatedCost
  );

  return {
    models,
    bestFor: {
      quality: sortedByQuality[0]?.model.name || 'N/A',
      speed: sortedBySpeed[0]?.model.name || 'N/A',
      cost: sortedByCost[0]?.model.name || 'N/A',
      balanced: recommendations[0]?.model.name || 'N/A',
    },
  };
}
