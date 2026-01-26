// prompt-generator.ts - AI-powered prompt auto-generation
// Generate prompts from descriptions, improve existing prompts

// ============================================
// Types
// ============================================

export interface GenerationRequest {
  description: string;
  taskType?: TaskType;
  framework?: PromptFramework;
  tone?: ToneStyle;
  outputFormat?: OutputFormat;
  constraints?: string[];
  examples?: { input: string; output: string }[];
  targetModel?: string;
}

export interface GeneratedPrompt {
  systemPrompt: string;
  userPromptTemplate: string;
  variables: string[];
  suggestedExamples: { input: string; output: string }[];
  explanation: string;
  frameworkUsed: PromptFramework;
  estimatedTokens: number;
}

export interface ImprovementSuggestion {
  type: ImprovementType;
  original: string;
  improved: string;
  explanation: string;
  impact: 'high' | 'medium' | 'low';
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

export type PromptFramework =
  | 'COSTAR'
  | 'RISEN'
  | 'CROWD'
  | 'chain-of-thought'
  | 'few-shot'
  | 'zero-shot'
  | 'custom';

export type ToneStyle =
  | 'professional'
  | 'casual'
  | 'academic'
  | 'creative'
  | 'technical'
  | 'friendly';

export type OutputFormat =
  | 'text'
  | 'json'
  | 'markdown'
  | 'code'
  | 'list'
  | 'table';

export type ImprovementType =
  | 'clarity'
  | 'specificity'
  | 'structure'
  | 'examples'
  | 'constraints'
  | 'output_format'
  | 'tone';

// ============================================
// Framework Templates
// ============================================

const FRAMEWORK_TEMPLATES: Record<PromptFramework, string> = {
  COSTAR: `## Context
{{context}}

## Objective
{{objective}}

## Style
{{style}}

## Tone
{{tone}}

## Audience
{{audience}}

## Response Format
{{responseFormat}}`,

  RISEN: `## Role
{{role}}

## Instructions
{{instructions}}

## Steps
{{steps}}

## End Goal
{{endGoal}}

## Narrowing (Constraints)
{{constraints}}`,

  CROWD: `## Character
{{character}}

## Request
{{request}}

## Objective
{{objective}}

## World-Building (Context)
{{context}}

## Dialogue (Tone)
{{tone}}`,

  'chain-of-thought': `{{context}}

Think through this step by step:
1. First, understand what is being asked
2. Break down the problem into components
3. Address each component systematically
4. Verify your reasoning at each step
5. Synthesize your findings into a final answer

{{task}}

Let's work through this step by step.`,

  'few-shot': `{{context}}

Here are some examples:

{{examples}}

Now, following the same pattern:
{{task}}`,

  'zero-shot': `{{context}}

{{task}}

{{constraints}}`,

  custom: `{{content}}`,
};

// ============================================
// Prompt Generation
// ============================================

/**
 * Generate a prompt from a description
 */
export function generatePrompt(request: GenerationRequest): GeneratedPrompt {
  const framework = request.framework || selectFramework(request);
  const variables: string[] = [];

  // Build system prompt based on framework
  let systemPrompt = buildSystemPrompt(request, framework);
  let userPromptTemplate = buildUserPromptTemplate(request, framework);

  // Extract variables from templates
  const variablePattern = /\{\{(\w+)\}\}/g;
  let match;

  while ((match = variablePattern.exec(systemPrompt)) !== null) {
    if (!variables.includes(match[1])) {
      variables.push(match[1]);
    }
  }

  while ((match = variablePattern.exec(userPromptTemplate)) !== null) {
    if (!variables.includes(match[1])) {
      variables.push(match[1]);
    }
  }

  // Generate example suggestions
  const suggestedExamples = generateExampleSuggestions(request);

  // Estimate tokens
  const estimatedTokens = estimateTokenCount(systemPrompt + userPromptTemplate);

  return {
    systemPrompt,
    userPromptTemplate,
    variables,
    suggestedExamples,
    explanation: generateExplanation(framework, request),
    frameworkUsed: framework,
    estimatedTokens,
  };
}

function selectFramework(request: GenerationRequest): PromptFramework {
  // Select framework based on task type
  switch (request.taskType) {
    case 'reasoning':
    case 'analysis':
      return 'chain-of-thought';
    case 'classification':
    case 'extraction':
      return request.examples?.length ? 'few-shot' : 'zero-shot';
    case 'creative':
      return 'CROWD';
    case 'code':
      return 'RISEN';
    default:
      return 'COSTAR';
  }
}

function buildSystemPrompt(
  request: GenerationRequest,
  framework: PromptFramework
): string {
  const parts: string[] = [];

  // Add role definition
  const role = getRoleForTaskType(request.taskType);
  parts.push(`You are ${role}.`);

  // Add tone
  if (request.tone) {
    parts.push(`\nCommunicate in a ${request.tone} tone.`);
  }

  // Add constraints
  if (request.constraints?.length) {
    parts.push('\n## Constraints');
    request.constraints.forEach((c) => parts.push(`- ${c}`));
  }

  // Add output format instructions
  if (request.outputFormat) {
    parts.push(`\n## Output Format`);
    parts.push(getOutputFormatInstructions(request.outputFormat));
  }

  return parts.join('\n');
}

function buildUserPromptTemplate(
  request: GenerationRequest,
  framework: PromptFramework
): string {
  const parts: string[] = [];

  // Add context placeholder
  parts.push('{{context}}');

  // Add task description
  parts.push(`\n## Task\n${request.description}`);

  // Add input placeholder
  parts.push('\n## Input\n{{input}}');

  // Add examples if using few-shot
  if (framework === 'few-shot' && request.examples?.length) {
    parts.push('\n## Examples');
    request.examples.forEach((ex, i) => {
      parts.push(`\nExample ${i + 1}:`);
      parts.push(`Input: ${ex.input}`);
      parts.push(`Output: ${ex.output}`);
    });
  }

  return parts.join('\n');
}

function getRoleForTaskType(taskType?: TaskType): string {
  const roles: Record<TaskType, string> = {
    classification: 'an expert classifier that accurately categorizes content',
    extraction: 'a precise information extractor that identifies and extracts relevant data',
    summarization: 'a skilled summarizer that distills complex content into clear, concise summaries',
    generation: 'a creative content generator that produces high-quality, relevant content',
    translation: 'a professional translator with expertise in multiple languages',
    code: 'an expert software engineer with deep knowledge of programming best practices',
    reasoning: 'a logical analyst skilled at breaking down complex problems',
    conversation: 'a helpful assistant engaged in meaningful dialogue',
    analysis: 'a thorough analyst that examines content from multiple perspectives',
    creative: 'a creative writer with a vivid imagination and strong storytelling abilities',
  };

  return roles[taskType || 'generation'];
}

function getOutputFormatInstructions(format: OutputFormat): string {
  const instructions: Record<OutputFormat, string> = {
    text: 'Provide your response as plain text with clear paragraphs.',
    json: `Return your response as valid JSON. Do not include markdown code blocks.
Ensure proper formatting with correct quotes and no trailing commas.`,
    markdown: `Format your response using markdown:
- Use headers (##, ###) for sections
- Use bullet points for lists
- Use **bold** for emphasis
- Use \`code\` for technical terms`,
    code: `Provide your response as code with appropriate syntax highlighting.
Include comments explaining key parts.
Follow best practices for the language.`,
    list: `Provide your response as a numbered or bulleted list.
Each item should be concise and actionable.`,
    table: `Format your response as a table using markdown table syntax:
| Column 1 | Column 2 |
|----------|----------|
| Data     | Data     |`,
  };

  return instructions[format];
}

function generateExampleSuggestions(
  request: GenerationRequest
): { input: string; output: string }[] {
  // Generate placeholder examples based on task type
  const examples: { input: string; output: string }[] = [];

  switch (request.taskType) {
    case 'classification':
      examples.push({
        input: 'Sample text to classify',
        output: 'Category: [Relevant Category]\nConfidence: [High/Medium/Low]',
      });
      break;
    case 'extraction':
      examples.push({
        input: 'Text containing information to extract',
        output: 'Extracted data:\n- Field 1: Value\n- Field 2: Value',
      });
      break;
    case 'summarization':
      examples.push({
        input: 'Long text to summarize...',
        output: 'Summary: A concise summary capturing the main points.',
      });
      break;
    default:
      examples.push({
        input: 'Example input relevant to your task',
        output: 'Example output showing expected format and quality',
      });
  }

  return examples;
}

function generateExplanation(
  framework: PromptFramework,
  request: GenerationRequest
): string {
  const explanations: Record<PromptFramework, string> = {
    COSTAR: 'Using COSTAR framework for structured, comprehensive prompts with clear context, objectives, and formatting.',
    RISEN: 'Using RISEN framework to define role, provide clear instructions, and set specific constraints.',
    CROWD: 'Using CROWD framework for creative tasks with character development and world-building context.',
    'chain-of-thought': 'Using chain-of-thought prompting to encourage step-by-step reasoning for complex analysis.',
    'few-shot': 'Using few-shot learning with examples to guide the model toward the desired output format.',
    'zero-shot': 'Using zero-shot prompting for straightforward tasks that benefit from direct instructions.',
    custom: 'Using custom template for specialized requirements.',
  };

  return explanations[framework];
}

function estimateTokenCount(text: string): number {
  return Math.ceil(text.split(/\s+/).length * 1.3);
}

// ============================================
// Prompt Improvement
// ============================================

/**
 * Analyze a prompt and suggest improvements
 */
export function analyzeAndImprove(
  systemPrompt: string,
  userPrompt: string
): ImprovementSuggestion[] {
  const suggestions: ImprovementSuggestion[] = [];
  const fullPrompt = `${systemPrompt}\n\n${userPrompt}`;

  // Check clarity
  if (hasVagueLanguage(fullPrompt)) {
    suggestions.push({
      type: 'clarity',
      original: extractVagueSection(fullPrompt),
      improved: improveClarity(extractVagueSection(fullPrompt)),
      explanation: 'Replace vague language with specific instructions',
      impact: 'high',
    });
  }

  // Check for missing output format
  if (!hasOutputFormat(fullPrompt)) {
    suggestions.push({
      type: 'output_format',
      original: '',
      improved: '## Output Format\nProvide your response in the following format:\n[Specify structure]',
      explanation: 'Adding explicit output format instructions helps ensure consistent responses',
      impact: 'high',
    });
  }

  // Check for missing examples
  if (!hasExamples(fullPrompt) && shouldHaveExamples(fullPrompt)) {
    suggestions.push({
      type: 'examples',
      original: '',
      improved: '## Examples\nInput: [example input]\nOutput: [example output]',
      explanation: 'Adding examples can significantly improve output quality for complex tasks',
      impact: 'medium',
    });
  }

  // Check for missing constraints
  if (!hasConstraints(fullPrompt)) {
    suggestions.push({
      type: 'constraints',
      original: '',
      improved: '## Constraints\n- Keep response under [X] words\n- Focus on [specific aspects]\n- Avoid [things to avoid]',
      explanation: 'Adding constraints helps prevent off-topic or overly verbose responses',
      impact: 'medium',
    });
  }

  // Check structure
  if (!hasStructure(fullPrompt)) {
    suggestions.push({
      type: 'structure',
      original: fullPrompt.slice(0, 100),
      improved: formatWithStructure(fullPrompt.slice(0, 100)),
      explanation: 'Using headers and sections improves prompt clarity and model comprehension',
      impact: 'medium',
    });
  }

  return suggestions;
}

function hasVagueLanguage(text: string): boolean {
  const vagueTerms = ['good', 'nice', 'proper', 'appropriate', 'relevant', 'etc', 'things'];
  return vagueTerms.some((term) => text.toLowerCase().includes(term));
}

function extractVagueSection(text: string): string {
  const vagueTerms = ['good', 'nice', 'proper', 'appropriate', 'relevant'];
  for (const term of vagueTerms) {
    const index = text.toLowerCase().indexOf(term);
    if (index !== -1) {
      const start = Math.max(0, index - 20);
      const end = Math.min(text.length, index + 30);
      return text.slice(start, end);
    }
  }
  return '';
}

function improveClarity(vague: string): string {
  return vague
    .replace(/good/gi, 'high-quality, well-structured')
    .replace(/nice/gi, 'clear, readable')
    .replace(/proper/gi, 'correctly formatted')
    .replace(/appropriate/gi, 'task-specific')
    .replace(/relevant/gi, 'directly related to the topic');
}

function hasOutputFormat(text: string): boolean {
  const formatKeywords = ['output format', 'response format', 'return as', 'format your'];
  return formatKeywords.some((kw) => text.toLowerCase().includes(kw));
}

function hasExamples(text: string): boolean {
  const exampleKeywords = ['example', 'for instance', 'such as', 'input:', 'output:'];
  return exampleKeywords.some((kw) => text.toLowerCase().includes(kw));
}

function shouldHaveExamples(text: string): boolean {
  const complexKeywords = ['classify', 'extract', 'transform', 'convert', 'format'];
  return complexKeywords.some((kw) => text.toLowerCase().includes(kw));
}

function hasConstraints(text: string): boolean {
  const constraintKeywords = ['constraint', 'limit', 'must not', 'should not', 'avoid', 'maximum'];
  return constraintKeywords.some((kw) => text.toLowerCase().includes(kw));
}

function hasStructure(text: string): boolean {
  return text.includes('##') || text.includes('**') || text.includes('1.');
}

function formatWithStructure(text: string): string {
  return `## Context
${text}

## Task
[Describe the specific task]

## Requirements
- [Requirement 1]
- [Requirement 2]`;
}

// ============================================
// Prompt Templates from Description
// ============================================

export interface QuickPromptParams {
  task: string;
  context?: string;
  outputType?: 'text' | 'json' | 'list' | 'code';
  length?: 'brief' | 'detailed' | 'comprehensive';
}

/**
 * Generate a quick prompt from minimal parameters
 */
export function quickPrompt(params: QuickPromptParams): string {
  const parts: string[] = [];

  // Add context if provided
  if (params.context) {
    parts.push(`Context: ${params.context}\n`);
  }

  // Add task
  parts.push(`Task: ${params.task}`);

  // Add length guidance
  const lengthGuide: Record<string, string> = {
    brief: 'Keep your response concise, focusing on key points only.',
    detailed: 'Provide a thorough response with explanations.',
    comprehensive: 'Give an exhaustive response covering all aspects.',
  };

  if (params.length) {
    parts.push(`\n${lengthGuide[params.length]}`);
  }

  // Add output format
  const outputGuide: Record<string, string> = {
    text: 'Provide your response as clear, well-structured text.',
    json: 'Return your response as valid JSON.',
    list: 'Format your response as a bulleted list.',
    code: 'Provide your response as code with comments.',
  };

  if (params.outputType) {
    parts.push(`\n${outputGuide[params.outputType]}`);
  }

  return parts.join('\n');
}
