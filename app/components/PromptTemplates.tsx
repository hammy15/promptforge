'use client';

// Pre-built prompt templates for common use cases

export interface PromptTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  prompt: string;
  variables: { name: string; default: string; description: string }[];
  tags: string[];
}

export const PROMPT_TEMPLATES: PromptTemplate[] = [
  {
    id: 'summarize',
    name: 'Text Summarizer',
    description: 'Summarize long content into key points',
    category: 'Writing',
    icon: '📝',
    prompt: `Summarize the following {{content_type:article}} in {{length:3-5}} bullet points.

Focus on:
- Key insights and main arguments
- Important facts and figures
- Actionable takeaways

Content to summarize:
{{content}}`,
    variables: [
      { name: 'content_type', default: 'article', description: 'Type of content (article, report, email, etc.)' },
      { name: 'length', default: '3-5', description: 'Number of bullet points' },
      { name: 'content', default: '', description: 'The text to summarize' },
    ],
    tags: ['writing', 'summary', 'productivity'],
  },
  {
    id: 'code-review',
    name: 'Code Reviewer',
    description: 'Get detailed code review feedback',
    category: 'Development',
    icon: '🔍',
    prompt: `Review the following {{language:JavaScript}} code for:

1. **Bugs & Issues**: Identify potential bugs or logic errors
2. **Performance**: Suggest optimizations
3. **Best Practices**: Check adherence to {{language}} conventions
4. **Security**: Flag any security concerns
5. **Readability**: Suggest improvements for clarity

Code to review:
\`\`\`{{language}}
{{code}}
\`\`\`

Provide specific line-by-line feedback where applicable.`,
    variables: [
      { name: 'language', default: 'JavaScript', description: 'Programming language' },
      { name: 'code', default: '', description: 'Code to review' },
    ],
    tags: ['code', 'review', 'development'],
  },
  {
    id: 'email-writer',
    name: 'Professional Email',
    description: 'Write polished professional emails',
    category: 'Communication',
    icon: '✉️',
    prompt: `Write a {{tone:professional}} email for the following purpose:

**Purpose**: {{purpose}}
**Recipient**: {{recipient:colleague}}
**Key Points to Include**:
{{key_points}}

Requirements:
- Keep it concise (under 200 words)
- Use appropriate greeting and sign-off
- Maintain a {{tone}} tone throughout
- Include a clear call-to-action`,
    variables: [
      { name: 'tone', default: 'professional', description: 'Tone (professional, friendly, formal, casual)' },
      { name: 'purpose', default: '', description: 'What is the email about?' },
      { name: 'recipient', default: 'colleague', description: 'Who is receiving this email?' },
      { name: 'key_points', default: '', description: 'Main points to cover' },
    ],
    tags: ['email', 'communication', 'business'],
  },
  {
    id: 'explain-concept',
    name: 'Concept Explainer',
    description: 'Explain complex topics simply',
    category: 'Education',
    icon: '🎓',
    prompt: `Explain {{concept}} to someone with {{expertise_level:beginner}} knowledge.

Use:
- Simple analogies and real-world examples
- Step-by-step breakdown if applicable
- Visual descriptions where helpful
- No jargon (or explain technical terms)

Target audience: {{audience:general public}}
Desired length: {{length:2-3 paragraphs}}`,
    variables: [
      { name: 'concept', default: '', description: 'The concept to explain' },
      { name: 'expertise_level', default: 'beginner', description: 'Audience expertise (beginner, intermediate, expert)' },
      { name: 'audience', default: 'general public', description: 'Who is the explanation for?' },
      { name: 'length', default: '2-3 paragraphs', description: 'Desired response length' },
    ],
    tags: ['education', 'explanation', 'learning'],
  },
  {
    id: 'api-docs',
    name: 'API Documentation',
    description: 'Generate API endpoint documentation',
    category: 'Development',
    icon: '📚',
    prompt: `Generate comprehensive API documentation for the following endpoint:

**Endpoint**: {{method:GET}} {{path}}
**Description**: {{description}}

Include:
1. **Overview**: What this endpoint does
2. **Request**:
   - Headers (including authentication)
   - Query parameters
   - Request body (if applicable)
3. **Response**:
   - Success response with example
   - Error responses
4. **Code Examples**: Show usage in {{language:JavaScript}}
5. **Notes**: Any important caveats or rate limits`,
    variables: [
      { name: 'method', default: 'GET', description: 'HTTP method' },
      { name: 'path', default: '/api/resource', description: 'Endpoint path' },
      { name: 'description', default: '', description: 'What does this endpoint do?' },
      { name: 'language', default: 'JavaScript', description: 'Language for code examples' },
    ],
    tags: ['api', 'documentation', 'development'],
  },
  {
    id: 'brainstorm',
    name: 'Idea Generator',
    description: 'Brainstorm creative ideas and solutions',
    category: 'Creativity',
    icon: '💡',
    prompt: `Generate {{count:10}} creative ideas for: {{topic}}

Context: {{context}}

For each idea, provide:
1. **Idea Name**: A catchy title
2. **Description**: 2-3 sentences explaining the concept
3. **Why It Works**: Key benefit or unique angle
4. **First Step**: How to get started

Prioritize ideas that are:
- {{priority:innovative and unique}}
- Feasible to implement
- Aligned with the context provided`,
    variables: [
      { name: 'count', default: '10', description: 'Number of ideas to generate' },
      { name: 'topic', default: '', description: 'What to brainstorm about' },
      { name: 'context', default: '', description: 'Additional context or constraints' },
      { name: 'priority', default: 'innovative and unique', description: 'What to prioritize' },
    ],
    tags: ['brainstorm', 'creativity', 'ideas'],
  },
  {
    id: 'debug-helper',
    name: 'Debug Assistant',
    description: 'Help diagnose and fix code issues',
    category: 'Development',
    icon: '🐛',
    prompt: `Help me debug this {{language:JavaScript}} issue.

**Error Message**:
\`\`\`
{{error}}
\`\`\`

**Relevant Code**:
\`\`\`{{language}}
{{code}}
\`\`\`

**What I Expected**: {{expected}}
**What Actually Happened**: {{actual}}
**What I've Tried**: {{attempts:Nothing yet}}

Please:
1. Identify the likely cause of the error
2. Explain why this is happening
3. Provide a corrected version of the code
4. Suggest how to prevent this in the future`,
    variables: [
      { name: 'language', default: 'JavaScript', description: 'Programming language' },
      { name: 'error', default: '', description: 'Error message or behavior' },
      { name: 'code', default: '', description: 'The problematic code' },
      { name: 'expected', default: '', description: 'Expected behavior' },
      { name: 'actual', default: '', description: 'Actual behavior' },
      { name: 'attempts', default: 'Nothing yet', description: 'What you have tried' },
    ],
    tags: ['debug', 'code', 'development'],
  },
  {
    id: 'meeting-notes',
    name: 'Meeting Notes',
    description: 'Structure meeting notes and action items',
    category: 'Productivity',
    icon: '📋',
    prompt: `Convert these raw meeting notes into a structured format:

**Meeting**: {{meeting_title}}
**Date**: {{date}}
**Attendees**: {{attendees}}

Raw Notes:
{{raw_notes}}

Create:
1. **Executive Summary** (2-3 sentences)
2. **Key Discussion Points** (bullet list)
3. **Decisions Made** (what was agreed)
4. **Action Items** (who, what, by when)
5. **Follow-up Topics** (for next meeting)`,
    variables: [
      { name: 'meeting_title', default: '', description: 'Name of the meeting' },
      { name: 'date', default: '', description: 'Meeting date' },
      { name: 'attendees', default: '', description: 'Who attended' },
      { name: 'raw_notes', default: '', description: 'Your rough notes' },
    ],
    tags: ['meeting', 'productivity', 'notes'],
  },
];

export const TEMPLATE_CATEGORIES = [
  { id: 'all', name: 'All Templates', icon: '✨' },
  { id: 'Writing', name: 'Writing', icon: '📝' },
  { id: 'Development', name: 'Development', icon: '💻' },
  { id: 'Communication', name: 'Communication', icon: '💬' },
  { id: 'Education', name: 'Education', icon: '🎓' },
  { id: 'Creativity', name: 'Creativity', icon: '💡' },
  { id: 'Productivity', name: 'Productivity', icon: '⚡' },
];
