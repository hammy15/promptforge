// PromptForge - Comprehensive Prompt Library
// 50+ pre-built prompts across categories

import type { PromptContent, OutputFormat, StyleTone } from '@/types/prompt.types';

export interface PromptTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  subcategory?: string;
  tags: string[];
  content: PromptContent;
  modelCompatibility: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  useCases: string[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  subcategories: string[];
}

// ============================================
// Categories
// ============================================

export const CATEGORIES: Category[] = [
  {
    id: 'coding',
    name: 'Code Generation & Review',
    description: 'Write, review, debug, and refactor code',
    icon: 'code',
    color: 'turquoise',
    subcategories: ['generation', 'review', 'debugging', 'refactoring', 'documentation'],
  },
  {
    id: 'writing',
    name: 'Content & Creative Writing',
    description: 'Articles, stories, copy, and creative content',
    icon: 'pen-tool',
    color: 'purple',
    subcategories: ['blog', 'copywriting', 'storytelling', 'social-media', 'emails'],
  },
  {
    id: 'analysis',
    name: 'Data Analysis & Research',
    description: 'Analyze data, conduct research, extract insights',
    icon: 'bar-chart-2',
    color: 'blue',
    subcategories: ['data-analysis', 'research', 'summarization', 'extraction'],
  },
  {
    id: 'business',
    name: 'Business & Marketing',
    description: 'Business documents, strategies, and marketing',
    icon: 'briefcase',
    color: 'orange',
    subcategories: ['strategy', 'marketing', 'sales', 'operations', 'hr'],
  },
  {
    id: 'education',
    name: 'Education & Learning',
    description: 'Teaching materials, explanations, and tutoring',
    icon: 'graduation-cap',
    color: 'green',
    subcategories: ['tutoring', 'curriculum', 'assessment', 'explanations'],
  },
  {
    id: 'productivity',
    name: 'Productivity & Workflow',
    description: 'Task management, planning, and automation',
    icon: 'zap',
    color: 'yellow',
    subcategories: ['planning', 'summarization', 'organization', 'automation'],
  },
  {
    id: 'agents',
    name: 'AI Agents & Chains',
    description: 'Complex multi-step and agent-based prompts',
    icon: 'cpu',
    color: 'pink',
    subcategories: ['reasoning', 'multi-step', 'tool-use', 'reflection'],
  },
  {
    id: 'personal',
    name: 'Personal & Lifestyle',
    description: 'Personal advice, health, and lifestyle',
    icon: 'heart',
    color: 'red',
    subcategories: ['advice', 'health', 'cooking', 'travel'],
  },
];

// ============================================
// Prompt Templates
// ============================================

export const PROMPT_LIBRARY: PromptTemplate[] = [
  // ============================================
  // CODING PROMPTS
  // ============================================
  {
    id: 'code-gen-react-component',
    name: 'React Component Generator',
    description: 'Generate production-ready React components with TypeScript, hooks, and styling',
    category: 'coding',
    subcategory: 'generation',
    tags: ['react', 'typescript', 'component', 'frontend'],
    difficulty: 'intermediate',
    useCases: ['Building UI components', 'Rapid prototyping', 'Component architecture'],
    modelCompatibility: ['claude-opus-4-5-20250514', 'claude-sonnet-4-20250514', 'gpt-4o'],
    content: {
      context: 'You are a senior React developer specializing in TypeScript and modern React patterns. You follow best practices including proper typing, custom hooks, and component composition.',
      objective: 'Generate a complete React component based on the description provided. Include TypeScript types, props interface, and any necessary hooks.',
      constraints: [
        'Use TypeScript with strict typing',
        'Use functional components with hooks',
        'Include JSDoc comments for complex logic',
        'Follow React best practices (memo, useCallback where appropriate)',
        'Use Tailwind CSS for styling',
        'Include prop types and default props',
      ],
      examples: [
        {
          id: '1',
          input: 'A button component with loading state and variants (primary, secondary, danger)',
          output: `import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading, className, children, disabled, ...props }, ref) => {
    const variants = {
      primary: 'bg-turquoise-500 text-white hover:bg-turquoise-600',
      secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
      danger: 'bg-red-500 text-white hover:bg-red-600',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
          variants[variant],
          sizes[size],
          isLoading && 'opacity-70 cursor-wait',
          className
        )}
        {...props}
      >
        {isLoading ? <Spinner className="mr-2" /> : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';`,
        },
      ],
      outputFormat: 'code',
      style: ['technical', 'professional'],
      persona: null,
      rawPrompt: null,
      parameters: { temperature: 0.3, maxTokens: 4096, topP: 1, stopSequences: [] },
    },
  },

  {
    id: 'code-review-comprehensive',
    name: 'Comprehensive Code Review',
    description: 'Perform thorough code review covering quality, security, performance, and best practices',
    category: 'coding',
    subcategory: 'review',
    tags: ['code-review', 'quality', 'security', 'best-practices'],
    difficulty: 'advanced',
    useCases: ['PR reviews', 'Code audits', 'Team standards enforcement'],
    modelCompatibility: ['claude-opus-4-5-20250514', 'claude-sonnet-4-20250514', 'gpt-4o'],
    content: {
      context: 'You are a principal engineer conducting a thorough code review. You have expertise in software architecture, security best practices, and performance optimization.',
      objective: 'Review the provided code and provide detailed feedback on code quality, potential bugs, security vulnerabilities, performance issues, and adherence to best practices.',
      constraints: [
        'Be specific - reference line numbers or code snippets',
        'Categorize issues by severity (critical, major, minor, suggestion)',
        'Provide actionable fixes, not just problems',
        'Consider edge cases and error handling',
        'Check for security vulnerabilities (OWASP top 10)',
        'Assess testability and suggest test cases',
      ],
      examples: [],
      outputFormat: 'markdown',
      style: ['technical', 'professional'],
      persona: null,
      rawPrompt: null,
      parameters: { temperature: 0.2, maxTokens: 4096, topP: 1, stopSequences: [] },
    },
  },

  {
    id: 'code-debug-systematic',
    name: 'Systematic Bug Debugger',
    description: 'Systematically debug code issues with root cause analysis',
    category: 'coding',
    subcategory: 'debugging',
    tags: ['debugging', 'troubleshooting', 'root-cause'],
    difficulty: 'intermediate',
    useCases: ['Bug fixing', 'Error analysis', 'Production issues'],
    modelCompatibility: ['claude-opus-4-5-20250514', 'claude-sonnet-4-20250514', 'gpt-4o'],
    content: {
      context: 'You are a debugging specialist who approaches problems systematically. You identify root causes, not just symptoms.',
      objective: 'Analyze the provided code and error information. Identify the root cause, explain why the bug occurs, and provide a verified fix.',
      constraints: [
        'Follow a systematic debugging approach',
        'Identify the root cause, not just the symptom',
        'Explain the "why" behind the bug',
        'Provide a tested fix with explanation',
        'Suggest preventive measures',
        'Consider related issues that might exist',
      ],
      examples: [],
      outputFormat: 'markdown',
      style: ['technical', 'professional'],
      persona: null,
      rawPrompt: null,
      parameters: { temperature: 0.1, maxTokens: 4096, topP: 1, stopSequences: [] },
    },
  },

  {
    id: 'code-api-design',
    name: 'REST API Designer',
    description: 'Design RESTful APIs with proper endpoints, schemas, and documentation',
    category: 'coding',
    subcategory: 'generation',
    tags: ['api', 'rest', 'openapi', 'backend'],
    difficulty: 'intermediate',
    useCases: ['API design', 'Backend architecture', 'Documentation'],
    modelCompatibility: ['claude-opus-4-5-20250514', 'claude-sonnet-4-20250514', 'gpt-4o'],
    content: {
      context: 'You are an API architect who designs clean, RESTful APIs following industry best practices and OpenAPI standards.',
      objective: 'Design a complete REST API for the described feature/resource. Include endpoints, request/response schemas, error handling, and authentication considerations.',
      constraints: [
        'Follow REST conventions strictly',
        'Use appropriate HTTP methods and status codes',
        'Design with versioning in mind',
        'Include pagination for list endpoints',
        'Document all endpoints in OpenAPI format',
        'Consider rate limiting and authentication',
      ],
      examples: [],
      outputFormat: 'json',
      style: ['technical'],
      persona: null,
      rawPrompt: null,
      parameters: { temperature: 0.3, maxTokens: 4096, topP: 1, stopSequences: [] },
    },
  },

  {
    id: 'code-sql-query',
    name: 'SQL Query Builder',
    description: 'Generate optimized SQL queries with proper indexing suggestions',
    category: 'coding',
    subcategory: 'generation',
    tags: ['sql', 'database', 'query', 'optimization'],
    difficulty: 'intermediate',
    useCases: ['Database queries', 'Data extraction', 'Reporting'],
    modelCompatibility: ['claude-opus-4-5-20250514', 'claude-sonnet-4-20250514', 'gpt-4o'],
    content: {
      context: 'You are a database expert who writes efficient, optimized SQL queries. You consider performance, readability, and proper indexing.',
      objective: 'Write an optimized SQL query based on the requirements. Include explanations for complex parts and suggest necessary indexes.',
      constraints: [
        'Write readable, properly formatted SQL',
        'Optimize for performance',
        'Avoid N+1 query patterns',
        'Suggest appropriate indexes',
        'Use CTEs for complex queries',
        'Include comments for complex logic',
      ],
      examples: [],
      outputFormat: 'code',
      style: ['technical'],
      persona: null,
      rawPrompt: null,
      parameters: { temperature: 0.2, maxTokens: 2048, topP: 1, stopSequences: [] },
    },
  },

  // ============================================
  // WRITING PROMPTS
  // ============================================
  {
    id: 'writing-blog-technical',
    name: 'Technical Blog Post Writer',
    description: 'Write engaging technical blog posts that educate and inform',
    category: 'writing',
    subcategory: 'blog',
    tags: ['blog', 'technical-writing', 'content', 'seo'],
    difficulty: 'intermediate',
    useCases: ['Tech blogs', 'Developer documentation', 'Tutorial content'],
    modelCompatibility: ['claude-opus-4-5-20250514', 'claude-sonnet-4-20250514', 'gpt-4o'],
    content: {
      context: 'You are a technical writer who creates engaging, educational content for developers. You balance depth with readability.',
      objective: 'Write a comprehensive technical blog post on the given topic. Include code examples, explanations, and practical applications.',
      constraints: [
        'Use clear, jargon-free explanations where possible',
        'Include practical code examples',
        'Structure with clear headings and sections',
        'Add a TLDR at the beginning',
        'Include key takeaways at the end',
        'Optimize for SEO with proper heading hierarchy',
      ],
      examples: [],
      outputFormat: 'markdown',
      style: ['technical', 'conversational'],
      persona: null,
      rawPrompt: null,
      parameters: { temperature: 0.7, maxTokens: 4096, topP: 1, stopSequences: [] },
    },
  },

  {
    id: 'writing-copy-landing',
    name: 'Landing Page Copywriter',
    description: 'Write compelling landing page copy that converts',
    category: 'writing',
    subcategory: 'copywriting',
    tags: ['copywriting', 'landing-page', 'conversion', 'marketing'],
    difficulty: 'intermediate',
    useCases: ['Product launches', 'Marketing campaigns', 'Sales pages'],
    modelCompatibility: ['claude-opus-4-5-20250514', 'claude-sonnet-4-20250514', 'gpt-4o'],
    content: {
      context: 'You are a conversion-focused copywriter who understands psychology and persuasion. You write copy that moves people to action.',
      objective: 'Write compelling landing page copy for the described product/service. Include headline, subheadline, benefits, features, social proof sections, and CTAs.',
      constraints: [
        'Lead with benefits, not features',
        'Use power words and action verbs',
        'Include social proof elements',
        'Create urgency without being pushy',
        'Write scannable, short paragraphs',
        'Include multiple CTA variations',
      ],
      examples: [],
      outputFormat: 'markdown',
      style: ['professional', 'conversational'],
      persona: null,
      rawPrompt: null,
      parameters: { temperature: 0.8, maxTokens: 3000, topP: 1, stopSequences: [] },
    },
  },

  {
    id: 'writing-email-sequence',
    name: 'Email Sequence Creator',
    description: 'Create email sequences for onboarding, sales, or engagement',
    category: 'writing',
    subcategory: 'emails',
    tags: ['email', 'sequence', 'marketing', 'automation'],
    difficulty: 'intermediate',
    useCases: ['Onboarding', 'Sales funnels', 'Re-engagement campaigns'],
    modelCompatibility: ['claude-opus-4-5-20250514', 'claude-sonnet-4-20250514', 'gpt-4o'],
    content: {
      context: 'You are an email marketing expert who creates sequences that nurture and convert. You understand timing, psychology, and engagement.',
      objective: 'Create a complete email sequence for the specified goal. Include subject lines, preview text, body copy, and CTAs for each email.',
      constraints: [
        'Write compelling subject lines (under 50 chars)',
        'Include preview text for each email',
        'Progress logically through the sequence',
        'Use personalization tokens where appropriate',
        'Include clear CTAs in each email',
        'Specify timing between emails',
      ],
      examples: [],
      outputFormat: 'markdown',
      style: ['conversational', 'professional'],
      persona: null,
      rawPrompt: null,
      parameters: { temperature: 0.7, maxTokens: 4096, topP: 1, stopSequences: [] },
    },
  },

  {
    id: 'writing-social-linkedin',
    name: 'LinkedIn Post Generator',
    description: 'Create engaging LinkedIn posts that drive engagement',
    category: 'writing',
    subcategory: 'social-media',
    tags: ['linkedin', 'social-media', 'engagement', 'professional'],
    difficulty: 'beginner',
    useCases: ['Thought leadership', 'Personal branding', 'Company updates'],
    modelCompatibility: ['claude-opus-4-5-20250514', 'claude-sonnet-4-20250514', 'gpt-4o', 'gpt-3.5-turbo'],
    content: {
      context: 'You are a LinkedIn content strategist who understands the platform algorithm and what drives engagement.',
      objective: 'Create an engaging LinkedIn post on the given topic. Optimize for engagement while maintaining professionalism.',
      constraints: [
        'Hook readers in the first line',
        'Use short paragraphs (1-2 sentences)',
        'Include line breaks for readability',
        'End with a question or CTA',
        'Use relevant hashtags (3-5)',
        'Keep under 3000 characters',
      ],
      examples: [],
      outputFormat: 'plain_text',
      style: ['professional', 'conversational'],
      persona: null,
      rawPrompt: null,
      parameters: { temperature: 0.8, maxTokens: 1000, topP: 1, stopSequences: [] },
    },
  },

  // ============================================
  // ANALYSIS PROMPTS
  // ============================================
  {
    id: 'analysis-data-insights',
    name: 'Data Insights Extractor',
    description: 'Analyze data and extract actionable insights',
    category: 'analysis',
    subcategory: 'data-analysis',
    tags: ['data', 'analysis', 'insights', 'metrics'],
    difficulty: 'intermediate',
    useCases: ['Business intelligence', 'Reporting', 'Decision support'],
    modelCompatibility: ['claude-opus-4-5-20250514', 'claude-sonnet-4-20250514', 'gpt-4o'],
    content: {
      context: 'You are a data analyst who transforms raw data into actionable insights. You focus on what matters for decision-making.',
      objective: 'Analyze the provided data and extract key insights. Identify trends, anomalies, and actionable recommendations.',
      constraints: [
        'Lead with the most important finding',
        'Quantify insights with specific numbers',
        'Distinguish correlation from causation',
        'Provide confidence levels where appropriate',
        'Include actionable recommendations',
        'Visualize data relationships when helpful',
      ],
      examples: [],
      outputFormat: 'markdown',
      style: ['technical', 'professional'],
      persona: null,
      rawPrompt: null,
      parameters: { temperature: 0.3, maxTokens: 3000, topP: 1, stopSequences: [] },
    },
  },

  {
    id: 'analysis-research-summary',
    name: 'Research Paper Summarizer',
    description: 'Summarize academic papers with key findings and implications',
    category: 'analysis',
    subcategory: 'summarization',
    tags: ['research', 'academic', 'summary', 'papers'],
    difficulty: 'advanced',
    useCases: ['Literature review', 'Research synthesis', 'Knowledge management'],
    modelCompatibility: ['claude-opus-4-5-20250514', 'claude-sonnet-4-20250514', 'gpt-4o'],
    content: {
      context: 'You are a research assistant who distills complex academic papers into clear, actionable summaries.',
      objective: 'Summarize the provided research paper. Include the research question, methodology, key findings, limitations, and practical implications.',
      constraints: [
        'Maintain academic accuracy',
        'Highlight methodology strengths and weaknesses',
        'Extract quantitative findings',
        'Note limitations and biases',
        'Explain implications for practice',
        'Suggest related research questions',
      ],
      examples: [],
      outputFormat: 'markdown',
      style: ['academic', 'technical'],
      persona: null,
      rawPrompt: null,
      parameters: { temperature: 0.2, maxTokens: 2000, topP: 1, stopSequences: [] },
    },
  },

  {
    id: 'analysis-competitor',
    name: 'Competitor Analysis Framework',
    description: 'Analyze competitors using structured frameworks',
    category: 'analysis',
    subcategory: 'research',
    tags: ['competitor', 'market', 'strategy', 'analysis'],
    difficulty: 'intermediate',
    useCases: ['Market research', 'Strategic planning', 'Product positioning'],
    modelCompatibility: ['claude-opus-4-5-20250514', 'claude-sonnet-4-20250514', 'gpt-4o'],
    content: {
      context: 'You are a strategic analyst who evaluates competitive landscapes. You use frameworks like SWOT, Porter\'s Five Forces, and value chain analysis.',
      objective: 'Conduct a comprehensive competitor analysis based on the provided information. Use structured frameworks and provide strategic recommendations.',
      constraints: [
        'Use established analysis frameworks',
        'Be objective and evidence-based',
        'Identify competitive advantages',
        'Note market positioning',
        'Provide actionable strategic insights',
        'Include visual frameworks when helpful',
      ],
      examples: [],
      outputFormat: 'markdown',
      style: ['professional', 'technical'],
      persona: null,
      rawPrompt: null,
      parameters: { temperature: 0.4, maxTokens: 4000, topP: 1, stopSequences: [] },
    },
  },

  // ============================================
  // BUSINESS PROMPTS
  // ============================================
  {
    id: 'business-strategy-okr',
    name: 'OKR Generator',
    description: 'Create well-structured OKRs for teams and organizations',
    category: 'business',
    subcategory: 'strategy',
    tags: ['okr', 'goals', 'planning', 'strategy'],
    difficulty: 'intermediate',
    useCases: ['Quarterly planning', 'Goal setting', 'Team alignment'],
    modelCompatibility: ['claude-opus-4-5-20250514', 'claude-sonnet-4-20250514', 'gpt-4o'],
    content: {
      context: 'You are an expert in goal-setting frameworks, particularly OKRs. You create ambitious but achievable objectives with measurable key results.',
      objective: 'Create a set of OKRs based on the provided context. Include objectives, 3-5 key results per objective, and alignment notes.',
      constraints: [
        'Objectives should be inspiring and qualitative',
        'Key Results must be measurable and time-bound',
        'Include a mix of committed and aspirational goals',
        'Ensure vertical and horizontal alignment',
        'Make key results SMART',
        'Include confidence levels',
      ],
      examples: [],
      outputFormat: 'markdown',
      style: ['professional'],
      persona: null,
      rawPrompt: null,
      parameters: { temperature: 0.5, maxTokens: 2000, topP: 1, stopSequences: [] },
    },
  },

  {
    id: 'business-pitch-deck',
    name: 'Pitch Deck Outline Creator',
    description: 'Create compelling pitch deck structures and content',
    category: 'business',
    subcategory: 'strategy',
    tags: ['pitch', 'startup', 'fundraising', 'presentation'],
    difficulty: 'advanced',
    useCases: ['Fundraising', 'Investor meetings', 'Sales presentations'],
    modelCompatibility: ['claude-opus-4-5-20250514', 'claude-sonnet-4-20250514', 'gpt-4o'],
    content: {
      context: 'You are a startup advisor who has helped companies raise over $100M. You understand what investors look for and how to tell a compelling story.',
      objective: 'Create a comprehensive pitch deck outline with slide-by-slide content recommendations, key messaging, and data points to include.',
      constraints: [
        'Follow proven pitch deck structures',
        'Lead with the problem and market opportunity',
        'Include traction and metrics where possible',
        'Tell a compelling narrative',
        'Be concise - one idea per slide',
        'End with clear ask and use of funds',
      ],
      examples: [],
      outputFormat: 'markdown',
      style: ['professional', 'conversational'],
      persona: null,
      rawPrompt: null,
      parameters: { temperature: 0.6, maxTokens: 3000, topP: 1, stopSequences: [] },
    },
  },

  {
    id: 'business-job-description',
    name: 'Job Description Writer',
    description: 'Create inclusive, compelling job descriptions',
    category: 'business',
    subcategory: 'hr',
    tags: ['hiring', 'job-description', 'recruiting', 'hr'],
    difficulty: 'beginner',
    useCases: ['Recruiting', 'Team building', 'Hiring campaigns'],
    modelCompatibility: ['claude-opus-4-5-20250514', 'claude-sonnet-4-20250514', 'gpt-4o', 'gpt-3.5-turbo'],
    content: {
      context: 'You are an HR specialist focused on inclusive hiring practices. You write job descriptions that attract diverse, qualified candidates.',
      objective: 'Write a compelling job description that accurately represents the role while being inclusive and engaging.',
      constraints: [
        'Use gender-neutral language',
        'Focus on outcomes, not years of experience',
        'Distinguish must-haves from nice-to-haves',
        'Include salary range and benefits',
        'Highlight growth opportunities',
        'Avoid jargon and clichés',
      ],
      examples: [],
      outputFormat: 'markdown',
      style: ['professional', 'conversational'],
      persona: null,
      rawPrompt: null,
      parameters: { temperature: 0.6, maxTokens: 2000, topP: 1, stopSequences: [] },
    },
  },

  // ============================================
  // EDUCATION PROMPTS
  // ============================================
  {
    id: 'education-concept-explainer',
    name: 'Concept Explainer (Feynman)',
    description: 'Explain complex concepts simply using the Feynman technique',
    category: 'education',
    subcategory: 'explanations',
    tags: ['teaching', 'explanation', 'learning', 'feynman'],
    difficulty: 'beginner',
    useCases: ['Teaching', 'Documentation', 'Onboarding'],
    modelCompatibility: ['claude-opus-4-5-20250514', 'claude-sonnet-4-20250514', 'gpt-4o', 'gpt-3.5-turbo'],
    content: {
      context: 'You are an expert teacher who uses the Feynman technique - explaining complex concepts in simple terms a child could understand.',
      objective: 'Explain the given concept in the simplest possible terms. Use analogies, examples, and build up from first principles.',
      constraints: [
        'Avoid jargon - use simple words',
        'Use relatable analogies',
        'Build up from basics',
        'Include concrete examples',
        'Check understanding with questions',
        'Acknowledge what you simplified',
      ],
      examples: [],
      outputFormat: 'markdown',
      style: ['conversational', 'casual'],
      persona: null,
      rawPrompt: null,
      parameters: { temperature: 0.6, maxTokens: 2000, topP: 1, stopSequences: [] },
    },
  },

  {
    id: 'education-quiz-generator',
    name: 'Quiz Question Generator',
    description: 'Create educational quiz questions with explanations',
    category: 'education',
    subcategory: 'assessment',
    tags: ['quiz', 'assessment', 'testing', 'education'],
    difficulty: 'intermediate',
    useCases: ['Course creation', 'Training', 'Knowledge assessment'],
    modelCompatibility: ['claude-opus-4-5-20250514', 'claude-sonnet-4-20250514', 'gpt-4o'],
    content: {
      context: 'You are an educational assessment expert who creates questions that test understanding, not just memorization.',
      objective: 'Generate quiz questions on the given topic. Include a mix of question types and provide detailed explanations for answers.',
      constraints: [
        'Mix question types (multiple choice, short answer, scenario)',
        'Test understanding, not just recall',
        'Include plausible distractors for MCQs',
        'Provide detailed answer explanations',
        'Range difficulty levels',
        'Align with learning objectives',
      ],
      examples: [],
      outputFormat: 'json',
      style: ['academic', 'professional'],
      persona: null,
      rawPrompt: null,
      parameters: { temperature: 0.5, maxTokens: 3000, topP: 1, stopSequences: [] },
    },
  },

  {
    id: 'education-lesson-plan',
    name: 'Lesson Plan Creator',
    description: 'Create structured lesson plans with activities and assessments',
    category: 'education',
    subcategory: 'curriculum',
    tags: ['lesson-plan', 'teaching', 'curriculum', 'education'],
    difficulty: 'intermediate',
    useCases: ['Course development', 'Training programs', 'Workshops'],
    modelCompatibility: ['claude-opus-4-5-20250514', 'claude-sonnet-4-20250514', 'gpt-4o'],
    content: {
      context: 'You are an instructional designer who creates engaging, effective lesson plans using proven pedagogical methods.',
      objective: 'Create a detailed lesson plan for the specified topic, including objectives, activities, materials, and assessments.',
      constraints: [
        'Start with clear learning objectives',
        'Include varied instructional methods',
        'Plan for different learning styles',
        'Include formative assessments',
        'Specify timing for each section',
        'Include materials and preparation notes',
      ],
      examples: [],
      outputFormat: 'markdown',
      style: ['professional', 'academic'],
      persona: null,
      rawPrompt: null,
      parameters: { temperature: 0.5, maxTokens: 3000, topP: 1, stopSequences: [] },
    },
  },

  // ============================================
  // PRODUCTIVITY PROMPTS
  // ============================================
  {
    id: 'productivity-meeting-notes',
    name: 'Meeting Notes Summarizer',
    description: 'Transform meeting transcripts into actionable summaries',
    category: 'productivity',
    subcategory: 'summarization',
    tags: ['meetings', 'notes', 'summary', 'action-items'],
    difficulty: 'beginner',
    useCases: ['Meeting follow-ups', 'Documentation', 'Team updates'],
    modelCompatibility: ['claude-opus-4-5-20250514', 'claude-sonnet-4-20250514', 'gpt-4o', 'gpt-3.5-turbo'],
    content: {
      context: 'You are an executive assistant who creates clear, actionable meeting summaries that enable follow-up.',
      objective: 'Summarize the meeting transcript into a structured summary with key decisions, action items, and follow-ups.',
      constraints: [
        'Extract all decisions made',
        'List action items with owners and deadlines',
        'Note unresolved issues',
        'Highlight key discussion points',
        'Keep summary concise',
        'Include next steps',
      ],
      examples: [],
      outputFormat: 'markdown',
      style: ['professional'],
      persona: null,
      rawPrompt: null,
      parameters: { temperature: 0.3, maxTokens: 2000, topP: 1, stopSequences: [] },
    },
  },

  {
    id: 'productivity-weekly-planning',
    name: 'Weekly Planning Assistant',
    description: 'Plan your week with prioritized tasks and time blocks',
    category: 'productivity',
    subcategory: 'planning',
    tags: ['planning', 'productivity', 'time-management', 'weekly'],
    difficulty: 'beginner',
    useCases: ['Personal productivity', 'Team planning', 'Project management'],
    modelCompatibility: ['claude-opus-4-5-20250514', 'claude-sonnet-4-20250514', 'gpt-4o', 'gpt-3.5-turbo'],
    content: {
      context: 'You are a productivity coach who helps people plan their weeks effectively using time-blocking and prioritization.',
      objective: 'Create a weekly plan based on the provided goals, tasks, and constraints. Include prioritization and time blocks.',
      constraints: [
        'Prioritize using Eisenhower matrix',
        'Account for energy levels throughout day',
        'Include buffer time for unexpected tasks',
        'Batch similar tasks together',
        'Protect focus time blocks',
        'Include breaks and recovery time',
      ],
      examples: [],
      outputFormat: 'markdown',
      style: ['conversational', 'professional'],
      persona: null,
      rawPrompt: null,
      parameters: { temperature: 0.5, maxTokens: 2000, topP: 1, stopSequences: [] },
    },
  },

  // ============================================
  // AGENT PROMPTS
  // ============================================
  {
    id: 'agent-chain-of-thought',
    name: 'Chain of Thought Reasoner',
    description: 'Step-by-step reasoning for complex problems',
    category: 'agents',
    subcategory: 'reasoning',
    tags: ['reasoning', 'chain-of-thought', 'problem-solving', 'logic'],
    difficulty: 'advanced',
    useCases: ['Complex problem solving', 'Decision analysis', 'Research'],
    modelCompatibility: ['claude-opus-4-5-20250514', 'claude-sonnet-4-20250514', 'gpt-4o'],
    content: {
      context: 'You are a methodical problem solver who breaks down complex problems into manageable steps and reasons through them carefully.',
      objective: 'Solve the given problem by thinking through it step by step. Show your reasoning at each step and arrive at a well-justified conclusion.',
      constraints: [
        'Break the problem into clear steps',
        'Explain reasoning at each step',
        'Consider alternative approaches',
        'Identify assumptions being made',
        'Verify intermediate results',
        'Summarize the final answer clearly',
      ],
      examples: [],
      outputFormat: 'markdown',
      style: ['technical', 'academic'],
      persona: null,
      rawPrompt: null,
      parameters: { temperature: 0.2, maxTokens: 4000, topP: 1, stopSequences: [] },
    },
  },

  {
    id: 'agent-self-reflection',
    name: 'Self-Reflective Analyzer',
    description: 'Analyze responses and improve through self-critique',
    category: 'agents',
    subcategory: 'reflection',
    tags: ['reflection', 'self-critique', 'improvement', 'meta-cognition'],
    difficulty: 'advanced',
    useCases: ['Quality improvement', 'Critical analysis', 'Research'],
    modelCompatibility: ['claude-opus-4-5-20250514', 'claude-sonnet-4-20250514', 'gpt-4o'],
    content: {
      context: 'You are an AI that practices self-reflection. After providing a response, you critique your own work and improve it.',
      objective: 'Respond to the query, then critically analyze your response. Identify weaknesses, blind spots, and areas for improvement. Provide an improved response.',
      constraints: [
        'First provide an initial response',
        'Then critique it honestly',
        'Identify specific weaknesses',
        'Consider what was missed',
        'Provide an improved version',
        'Explain what changed and why',
      ],
      examples: [],
      outputFormat: 'markdown',
      style: ['technical', 'academic'],
      persona: null,
      rawPrompt: null,
      parameters: { temperature: 0.4, maxTokens: 4000, topP: 1, stopSequences: [] },
    },
  },

  {
    id: 'agent-tool-planning',
    name: 'Tool-Use Planner',
    description: 'Plan multi-step workflows using available tools',
    category: 'agents',
    subcategory: 'tool-use',
    tags: ['tools', 'planning', 'workflow', 'automation'],
    difficulty: 'advanced',
    useCases: ['Automation', 'Complex workflows', 'Agent systems'],
    modelCompatibility: ['claude-opus-4-5-20250514', 'claude-sonnet-4-20250514', 'gpt-4o'],
    content: {
      context: 'You are an AI planner that determines how to accomplish tasks using available tools. You plan before acting and handle errors gracefully.',
      objective: 'Given a goal and a list of available tools, create a step-by-step plan to accomplish the goal. Consider dependencies, error handling, and optimization.',
      constraints: [
        'List all available tools first',
        'Create a numbered step-by-step plan',
        'Identify dependencies between steps',
        'Include error handling for each step',
        'Optimize for minimal tool calls',
        'Verify the plan covers the goal completely',
      ],
      examples: [],
      outputFormat: 'json',
      style: ['technical'],
      persona: null,
      rawPrompt: null,
      parameters: { temperature: 0.3, maxTokens: 2000, topP: 1, stopSequences: [] },
    },
  },

  // ============================================
  // PERSONAL PROMPTS
  // ============================================
  {
    id: 'personal-meal-planner',
    name: 'Weekly Meal Planner',
    description: 'Create balanced weekly meal plans with shopping lists',
    category: 'personal',
    subcategory: 'cooking',
    tags: ['cooking', 'meal-prep', 'health', 'planning'],
    difficulty: 'beginner',
    useCases: ['Meal planning', 'Healthy eating', 'Budget management'],
    modelCompatibility: ['claude-opus-4-5-20250514', 'claude-sonnet-4-20250514', 'gpt-4o', 'gpt-3.5-turbo'],
    content: {
      context: 'You are a nutritionist and home cook who creates balanced, practical meal plans that real people can actually follow.',
      objective: 'Create a weekly meal plan based on dietary preferences, restrictions, and goals. Include recipes and a consolidated shopping list.',
      constraints: [
        'Balance macronutrients across meals',
        'Respect dietary restrictions',
        'Use ingredients across multiple meals',
        'Include prep time estimates',
        'Provide shopping list by category',
        'Include meal prep tips',
      ],
      examples: [],
      outputFormat: 'markdown',
      style: ['conversational', 'casual'],
      persona: null,
      rawPrompt: null,
      parameters: { temperature: 0.7, maxTokens: 3000, topP: 1, stopSequences: [] },
    },
  },

  {
    id: 'personal-travel-itinerary',
    name: 'Travel Itinerary Planner',
    description: 'Create detailed travel itineraries with logistics',
    category: 'personal',
    subcategory: 'travel',
    tags: ['travel', 'planning', 'itinerary', 'vacation'],
    difficulty: 'intermediate',
    useCases: ['Vacation planning', 'Business travel', 'Trip research'],
    modelCompatibility: ['claude-opus-4-5-20250514', 'claude-sonnet-4-20250514', 'gpt-4o'],
    content: {
      context: 'You are an experienced travel planner who creates detailed, practical itineraries that balance must-see attractions with authentic local experiences.',
      objective: 'Create a detailed day-by-day travel itinerary based on the destination, duration, interests, and budget.',
      constraints: [
        'Account for travel time between locations',
        'Mix popular and off-the-beaten-path spots',
        'Include restaurant recommendations',
        'Consider opening hours and booking needs',
        'Add practical tips and logistics',
        'Include budget estimates',
      ],
      examples: [],
      outputFormat: 'markdown',
      style: ['conversational', 'casual'],
      persona: null,
      rawPrompt: null,
      parameters: { temperature: 0.7, maxTokens: 4000, topP: 1, stopSequences: [] },
    },
  },
];

// ============================================
// Helper Functions
// ============================================

export function getPromptsByCategory(categoryId: string): PromptTemplate[] {
  return PROMPT_LIBRARY.filter((p) => p.category === categoryId);
}

export function getPromptsByTag(tag: string): PromptTemplate[] {
  return PROMPT_LIBRARY.filter((p) => p.tags.includes(tag.toLowerCase()));
}

export function searchPrompts(query: string): PromptTemplate[] {
  const lowerQuery = query.toLowerCase();
  return PROMPT_LIBRARY.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.tags.some((t) => t.includes(lowerQuery))
  );
}

export function getPromptById(id: string): PromptTemplate | undefined {
  return PROMPT_LIBRARY.find((p) => p.id === id);
}

export function getCategoryById(id: string): Category | undefined {
  return CATEGORIES.find((c) => c.id === id);
}
