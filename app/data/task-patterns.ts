export type TargetLLM = 'claude-code' | 'chatgpt' | 'gemini' | 'grok';

export interface TaskPattern {
  id: string;
  name: string;
  keywords: string[];
  recommendedLLM: TargetLLM;
  defaultOptions: {
    detail: 'brief' | 'detailed' | 'comprehensive';
    tone: 'casual' | 'professional' | 'technical';
    includeSteps: boolean;
    includeErrors: boolean;
  };
}

export const TASK_PATTERNS: TaskPattern[] = [
  {
    id: 'code_generation',
    name: 'Code Generation',
    keywords: ['write', 'create', 'build', 'code', 'script', 'function', 'program', 'app', 'application', 'implement'],
    recommendedLLM: 'claude-code',
    defaultOptions: {
      detail: 'detailed',
      tone: 'technical',
      includeSteps: true,
      includeErrors: true,
    },
  },
  {
    id: 'code_review',
    name: 'Code Review',
    keywords: ['review', 'check', 'debug', 'fix', 'improve', 'optimize', 'refactor', 'bug'],
    recommendedLLM: 'claude-code',
    defaultOptions: {
      detail: 'comprehensive',
      tone: 'technical',
      includeSteps: true,
      includeErrors: true,
    },
  },
  {
    id: 'content_creation',
    name: 'Content Creation',
    keywords: ['blog', 'article', 'post', 'story', 'copy', 'email', 'message', 'letter'],
    recommendedLLM: 'chatgpt',
    defaultOptions: {
      detail: 'detailed',
      tone: 'professional',
      includeSteps: false,
      includeErrors: false,
    },
  },
  {
    id: 'creative_writing',
    name: 'Creative Writing',
    keywords: ['story', 'poem', 'creative', 'fiction', 'narrative', 'dialogue'],
    recommendedLLM: 'chatgpt',
    defaultOptions: {
      detail: 'detailed',
      tone: 'casual',
      includeSteps: false,
      includeErrors: false,
    },
  },
  {
    id: 'research',
    name: 'Research & Analysis',
    keywords: ['research', 'find', 'search', 'compare', 'analyze', 'study', 'investigate', 'explore'],
    recommendedLLM: 'gemini',
    defaultOptions: {
      detail: 'comprehensive',
      tone: 'professional',
      includeSteps: true,
      includeErrors: false,
    },
  },
  {
    id: 'document_analysis',
    name: 'Document Analysis',
    keywords: ['document', 'pdf', 'report', 'summarize', 'extract', 'read'],
    recommendedLLM: 'gemini',
    defaultOptions: {
      detail: 'comprehensive',
      tone: 'professional',
      includeSteps: false,
      includeErrors: false,
    },
  },
  {
    id: 'realtime_info',
    name: 'Real-time Information',
    keywords: ['latest', 'news', 'trending', 'current', 'today', 'recent', 'twitter', 'x'],
    recommendedLLM: 'grok',
    defaultOptions: {
      detail: 'brief',
      tone: 'casual',
      includeSteps: false,
      includeErrors: false,
    },
  },
  {
    id: 'explanation',
    name: 'Explanation',
    keywords: ['explain', 'teach', 'how does', 'what is', 'why', 'understand', 'learn'],
    recommendedLLM: 'chatgpt',
    defaultOptions: {
      detail: 'detailed',
      tone: 'casual',
      includeSteps: true,
      includeErrors: false,
    },
  },
  {
    id: 'data_analysis',
    name: 'Data Analysis',
    keywords: ['data', 'csv', 'excel', 'spreadsheet', 'numbers', 'statistics', 'chart', 'graph'],
    recommendedLLM: 'gemini',
    defaultOptions: {
      detail: 'comprehensive',
      tone: 'technical',
      includeSteps: true,
      includeErrors: false,
    },
  },
  {
    id: 'automation',
    name: 'Automation',
    keywords: ['automate', 'script', 'batch', 'workflow', 'task', 'schedule', 'cli', 'command'],
    recommendedLLM: 'claude-code',
    defaultOptions: {
      detail: 'detailed',
      tone: 'technical',
      includeSteps: true,
      includeErrors: true,
    },
  },
];

export function detectTask(input: string): TaskPattern | null {
  const lowerInput = input.toLowerCase();

  let bestMatch: TaskPattern | null = null;
  let highestScore = 0;

  for (const pattern of TASK_PATTERNS) {
    let score = 0;
    for (const keyword of pattern.keywords) {
      if (lowerInput.includes(keyword)) {
        score += 1;
      }
    }
    if (score > highestScore) {
      highestScore = score;
      bestMatch = pattern;
    }
  }

  return highestScore > 0 ? bestMatch : null;
}

export const LLM_INFO: Record<TargetLLM, {
  name: string;
  tagline: string;
  icon: string;
  color: string;
  strengths: string[];
  bestFor: string;
}> = {
  'claude-code': {
    name: 'Claude Code',
    tagline: 'Expert coding assistant',
    icon: 'terminal',
    color: '#4ECDC4',
    strengths: ['Code generation', 'File operations', 'CLI automation', 'Debugging'],
    bestFor: 'Developers building software',
  },
  'chatgpt': {
    name: 'ChatGPT',
    tagline: 'Versatile conversation partner',
    icon: 'chat',
    color: '#10a37f',
    strengths: ['Creative writing', 'General knowledge', 'Explanations', 'Brainstorming'],
    bestFor: 'General tasks and conversation',
  },
  'gemini': {
    name: 'Gemini',
    tagline: 'Research powerhouse',
    icon: 'search',
    color: '#4285f4',
    strengths: ['Long documents', 'Research', 'Multimodal', 'Data analysis'],
    bestFor: 'Researchers and analysts',
  },
  'grok': {
    name: 'Grok',
    tagline: 'Real-time and witty',
    icon: 'bolt',
    color: '#000000',
    strengths: ['Current events', 'Twitter/X context', 'Casual tone', 'Quick responses'],
    bestFor: 'Real-time information seekers',
  },
};

export const QUICK_STARTS = [
  { label: 'Write code', icon: 'code', task: 'Write a Python script that' },
  { label: 'Analyze data', icon: 'chart', task: 'Analyze this data and' },
  { label: 'Create content', icon: 'edit', task: 'Write a blog post about' },
  { label: 'Research topic', icon: 'search', task: 'Research and summarize' },
  { label: 'Explain concept', icon: 'lightbulb', task: 'Explain how' },
  { label: 'Debug issue', icon: 'bug', task: 'Help me debug this' },
  { label: 'Automate task', icon: 'bolt', task: 'Create an automation script that' },
  { label: 'Summarize', icon: 'document', task: 'Summarize this document' },
];
