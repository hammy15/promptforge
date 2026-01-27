// LLM Target Selector Data
// Defines which LLM the prompt is being written FOR (not execution model)

export type TargetLLM = 'claude' | 'gpt-4' | 'gemini' | 'llama' | 'mistral' | 'universal';

export interface LLMTarget {
  id: TargetLLM;
  name: string;
  provider: string;
  logo: string;
  color: string;
  characteristics: {
    maxContextWindow: string;
    supportsSystemPrompt: boolean;
    supportsImages: boolean;
    supportsTools: boolean;
    preferredFormat: 'xml' | 'markdown' | 'plain';
  };
  optimizationTips: string[];
  bestFor: string[];
}

export const LLM_TARGETS: LLMTarget[] = [
  {
    id: 'claude',
    name: 'Claude',
    provider: 'Anthropic',
    logo: '🟣',
    color: '#8b5cf6',
    characteristics: {
      maxContextWindow: '200K tokens',
      supportsSystemPrompt: true,
      supportsImages: true,
      supportsTools: true,
      preferredFormat: 'xml',
    },
    optimizationTips: [
      'Use XML tags for structure (<context>, <instructions>, <output>)',
      'Leverage system prompts for persona and rules',
      'Claude excels at following complex, multi-step instructions',
      'Use chain-of-thought prompting for reasoning tasks',
    ],
    bestFor: ['Complex analysis', 'Long documents', 'Code review', 'Research', 'Writing'],
  },
  {
    id: 'gpt-4',
    name: 'GPT-4',
    provider: 'OpenAI',
    logo: '🟢',
    color: '#10b981',
    characteristics: {
      maxContextWindow: '128K tokens',
      supportsSystemPrompt: true,
      supportsImages: true,
      supportsTools: true,
      preferredFormat: 'markdown',
    },
    optimizationTips: [
      'Use markdown formatting for structure',
      'Leverage function calling for structured outputs',
      'Be explicit about desired output format',
      'Use few-shot examples for consistent formatting',
    ],
    bestFor: ['Creative writing', 'Code generation', 'Structured outputs', 'Chat applications'],
  },
  {
    id: 'gemini',
    name: 'Gemini',
    provider: 'Google',
    logo: '🔵',
    color: '#3b82f6',
    characteristics: {
      maxContextWindow: '1M tokens',
      supportsSystemPrompt: true,
      supportsImages: true,
      supportsTools: true,
      preferredFormat: 'markdown',
    },
    optimizationTips: [
      'Take advantage of the massive context window',
      'Excellent for processing entire codebases or books',
      'Use for multimodal tasks with images and text',
      'Good at following step-by-step instructions',
    ],
    bestFor: ['Large documents', 'Multimodal tasks', 'Codebase analysis', 'Research synthesis'],
  },
  {
    id: 'llama',
    name: 'Llama',
    provider: 'Meta',
    logo: '🦙',
    color: '#f97316',
    characteristics: {
      maxContextWindow: '128K tokens',
      supportsSystemPrompt: true,
      supportsImages: false,
      supportsTools: true,
      preferredFormat: 'plain',
    },
    optimizationTips: [
      'Keep prompts concise and direct',
      'Use clear delimiters between sections',
      'Provide explicit examples for desired output',
      'Works well with instruction-following format',
    ],
    bestFor: ['General tasks', 'Self-hosted deployments', 'Cost-effective inference', 'Privacy-sensitive'],
  },
  {
    id: 'mistral',
    name: 'Mistral',
    provider: 'Mistral AI',
    logo: '🌀',
    color: '#ec4899',
    characteristics: {
      maxContextWindow: '32K tokens',
      supportsSystemPrompt: true,
      supportsImages: false,
      supportsTools: true,
      preferredFormat: 'markdown',
    },
    optimizationTips: [
      'Efficient with shorter, focused prompts',
      'Good balance of speed and quality',
      'Use markdown for structure',
      'Excellent for code-related tasks',
    ],
    bestFor: ['Code generation', 'Quick responses', 'European compliance', 'Cost-effective'],
  },
  {
    id: 'universal',
    name: 'Universal',
    provider: 'Any LLM',
    logo: '🌐',
    color: '#64748b',
    characteristics: {
      maxContextWindow: 'Varies',
      supportsSystemPrompt: true,
      supportsImages: false,
      supportsTools: false,
      preferredFormat: 'plain',
    },
    optimizationTips: [
      'Use clear, simple language',
      'Avoid model-specific features',
      'Include all context in the prompt',
      'Be explicit about output format',
    ],
    bestFor: ['Portable prompts', 'Testing across models', 'Simple tasks', 'Compatibility'],
  },
];

export function getLLMTarget(id: TargetLLM): LLMTarget | undefined {
  return LLM_TARGETS.find(t => t.id === id);
}

export function getOptimizationTips(id: TargetLLM): string[] {
  const target = getLLMTarget(id);
  return target?.optimizationTips || [];
}
