import { TargetLLM } from './task-patterns';

export interface PromptOptions {
  detail: 'brief' | 'detailed' | 'comprehensive';
  tone: 'casual' | 'professional' | 'technical';
  includeSteps: boolean;
  includeErrors: boolean;
}

export interface GeneratedPrompt {
  prompt: string;
  sections: {
    role: string;
    task: string;
    requirements: string;
    format: string;
  };
}

const DETAIL_INSTRUCTIONS = {
  brief: 'Keep your response concise and to the point.',
  detailed: 'Provide a thorough response with explanations.',
  comprehensive: 'Give an exhaustive response covering all aspects, edge cases, and alternatives.',
};

const TONE_INSTRUCTIONS = {
  casual: 'Use a friendly, conversational tone.',
  professional: 'Use a professional, business-appropriate tone.',
  technical: 'Use precise technical terminology and be specific.',
};

export function generatePrompt(
  intent: string,
  targetLLM: TargetLLM,
  options: PromptOptions
): GeneratedPrompt {
  const { detail, tone, includeSteps, includeErrors } = options;

  // Generate role based on intent and LLM
  const role = generateRole(intent, targetLLM);
  const task = generateTask(intent);
  const requirements = generateRequirements(options);
  const format = generateFormat(options, targetLLM);

  // Combine into full prompt based on LLM style
  const prompt = formatForLLM(targetLLM, { role, task, requirements, format });

  return {
    prompt,
    sections: { role, task, requirements, format },
  };
}

function generateRole(intent: string, targetLLM: TargetLLM): string {
  const intentLower = intent.toLowerCase();

  // Detect specialty from intent
  let specialty = 'assistant';
  if (intentLower.includes('python')) specialty = 'Python developer';
  else if (intentLower.includes('javascript') || intentLower.includes('typescript')) specialty = 'JavaScript/TypeScript developer';
  else if (intentLower.includes('code') || intentLower.includes('script')) specialty = 'software developer';
  else if (intentLower.includes('data') || intentLower.includes('analysis')) specialty = 'data analyst';
  else if (intentLower.includes('write') || intentLower.includes('content')) specialty = 'content writer';
  else if (intentLower.includes('research')) specialty = 'research analyst';

  switch (targetLLM) {
    case 'claude-code':
      return `You are an expert ${specialty} working in Claude Code. You have access to read and write files, execute commands, and help with development tasks.`;
    case 'chatgpt':
      return `You are a knowledgeable ${specialty} ready to help with any task.`;
    case 'gemini':
      return `You are an expert ${specialty} with deep analytical capabilities and access to extensive knowledge.`;
    case 'grok':
      return `You're a helpful ${specialty} with a knack for getting things done quickly.`;
    default:
      return `You are a helpful ${specialty}.`;
  }
}

function generateTask(intent: string): string {
  // Clean up the intent to make it a proper task description
  let task = intent.trim();

  // Ensure it doesn't start with lowercase
  if (task[0]) {
    task = task[0].toUpperCase() + task.slice(1);
  }

  // Add period if missing
  if (!task.endsWith('.') && !task.endsWith('?') && !task.endsWith('!')) {
    task += '.';
  }

  return task;
}

function generateRequirements(options: PromptOptions): string {
  const requirements: string[] = [];

  // Detail level
  requirements.push(DETAIL_INSTRUCTIONS[options.detail]);

  // Tone
  requirements.push(TONE_INSTRUCTIONS[options.tone]);

  // Steps
  if (options.includeSteps) {
    requirements.push('Break down your response into clear, numbered steps.');
  }

  // Error handling
  if (options.includeErrors) {
    requirements.push('Include error handling and address potential edge cases.');
  }

  return requirements.join('\n');
}

function generateFormat(options: PromptOptions, targetLLM: TargetLLM): string {
  const formats: string[] = [];

  if (options.detail === 'brief') {
    formats.push('Keep your response under 200 words when possible.');
  } else if (options.detail === 'comprehensive') {
    formats.push('Provide detailed explanations and examples.');
  }

  if (options.includeSteps) {
    formats.push('Use numbered steps for any processes or instructions.');
  }

  // LLM-specific formatting
  switch (targetLLM) {
    case 'claude-code':
      formats.push('Use code blocks with syntax highlighting.');
      formats.push('Provide complete, runnable code when applicable.');
      break;
    case 'chatgpt':
      formats.push('Use markdown formatting for clarity.');
      break;
    case 'gemini':
      formats.push('Structure your response with clear headings.');
      break;
    case 'grok':
      formats.push('Keep it straightforward and actionable.');
      break;
  }

  return formats.join('\n');
}

function formatForLLM(
  targetLLM: TargetLLM,
  sections: { role: string; task: string; requirements: string; format: string }
): string {
  const { role, task, requirements, format } = sections;

  switch (targetLLM) {
    case 'claude-code':
      return `${role}

## Task
${task}

## Requirements
${requirements}

## Output Format
${format}`;

    case 'chatgpt':
      return `${role}

**Your task:** ${task}

**Guidelines:**
${requirements}

**Format your response as follows:**
${format}`;

    case 'gemini':
      return `# Role
${role}

# Objective
${task}

# Instructions
${requirements}

# Output Requirements
${format}`;

    case 'grok':
      return `${role}

Here's what I need: ${task}

Keep in mind:
${requirements}

${format}`;

    default:
      return `${role}\n\n${task}\n\n${requirements}\n\n${format}`;
  }
}

export const TEACHING_TIPS: Record<string, { title: string; content: string }> = {
  detail_brief: {
    title: 'Brief responses',
    content: 'Best for quick answers, simple questions, or when you want just the essentials without extra explanation.',
  },
  detail_detailed: {
    title: 'Detailed responses',
    content: 'Includes explanations and context. Good balance between thoroughness and readability.',
  },
  detail_comprehensive: {
    title: 'Comprehensive responses',
    content: 'Covers everything including edge cases, alternatives, and deep explanations. Uses more tokens but leaves nothing out.',
  },
  tone_casual: {
    title: 'Casual tone',
    content: 'Friendly and conversational. Great for learning, brainstorming, or when formality isn\'t needed.',
  },
  tone_professional: {
    title: 'Professional tone',
    content: 'Business-appropriate language. Good for work emails, reports, and client-facing content.',
  },
  tone_technical: {
    title: 'Technical tone',
    content: 'Uses precise terminology. Best for developers, technical documentation, and expert audiences.',
  },
  includeSteps: {
    title: 'Step-by-step breakdown',
    content: 'Asks the AI to show its reasoning in numbered steps. Makes complex tasks easier to follow and verify.',
  },
  includeErrors: {
    title: 'Error handling',
    content: 'Tells the AI to consider what could go wrong and handle edge cases. Essential for production code.',
  },
  llm_claude_code: {
    title: 'Why Claude Code?',
    content: 'Claude Code excels at coding tasks because it can read/write files, execute commands, and understand your entire project context.',
  },
  llm_chatgpt: {
    title: 'Why ChatGPT?',
    content: 'ChatGPT is great for general conversation, creative writing, and tasks that need a versatile, helpful assistant.',
  },
  llm_gemini: {
    title: 'Why Gemini?',
    content: 'Gemini handles massive documents (up to 1M tokens), multimodal inputs, and deep research tasks exceptionally well.',
  },
  llm_grok: {
    title: 'Why Grok?',
    content: 'Grok has real-time access to X/Twitter data and current events. Great for timely information and a witty tone.',
  },
};
