'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Icons } from '../components/Icons';
import { ThemeToggle } from '../components/ThemeToggle';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface SavedPrompt {
  id: string;
  name: string;
  prompt: string;
  taskType: string;
  createdAt: string;
  isFavorite: boolean;
}

interface CodeFile {
  id: string;
  name: string;
  content: string;
  language: string;
}

interface PromptChainStep {
  id: string;
  name: string;
  prompt: string;
  order: number;
}

interface PromptScore {
  overall: number;
  specificity: number;
  clarity: number;
  completeness: number;
  structure: number;
  suggestions: string[];
}

// ============================================================================
// BEGINNER-FRIENDLY CONSTANTS & DATA
// ============================================================================

// Claude Code specific task types - with extensive help for beginners
const CLAUDE_CODE_TASKS = [
  {
    id: 'build-app',
    label: 'Build an App',
    icon: '🚀',
    description: 'Create something new from scratch',
    helpText: 'Perfect for starting a new project. Just describe what you want to build!',
    examples: ['A simple to-do list app', 'A weather dashboard', 'A recipe organizer'],
    defaultDescription: 'I want to build a simple web application',
    smartDefaults: {
      includeAuth: false,
      includeDatabase: true,
      includeTests: true,
      includeDeployment: true,
    },
  },
  {
    id: 'add-feature',
    label: 'Add Feature',
    icon: '✨',
    description: 'Add something new to existing code',
    helpText: 'Have existing code? Describe what new functionality you want to add.',
    examples: ['Add a search bar', 'Add user login', 'Add dark mode toggle'],
    defaultDescription: 'I want to add a new feature to my existing project',
    smartDefaults: {
      preserveExisting: true,
      backwards_compatible: true,
    },
  },
  {
    id: 'fix-bug',
    label: 'Fix Bug',
    icon: '🐛',
    description: 'Something broken? Get it fixed!',
    helpText: 'Paste your code and describe what\'s going wrong. Claude will help debug it.',
    examples: ['Button not working', 'Data not saving', 'Page not loading'],
    defaultDescription: 'I have a bug in my code that I need help fixing',
    smartDefaults: {
      needsErrorMessage: true,
      needsExpectedBehavior: true,
    },
  },
  {
    id: 'refactor',
    label: 'Refactor',
    icon: '♻️',
    description: 'Make your code better & cleaner',
    helpText: 'Already working code but want it cleaner or faster? This is for you.',
    examples: ['Clean up messy function', 'Improve performance', 'Add TypeScript types'],
    defaultDescription: 'I want to improve and clean up my existing code',
    smartDefaults: {
      maintainFunctionality: true,
      improveReadability: true,
    },
  },
  {
    id: 'explain',
    label: 'Explain Code',
    icon: '📖',
    description: 'Understand how code works',
    helpText: 'Confused by some code? Paste it and get a clear, simple explanation.',
    examples: ['What does this function do?', 'How does this algorithm work?', 'Explain this regex'],
    defaultDescription: 'I want to understand how this code works',
    smartDefaults: {
      includeVisualExplanation: true,
      stepByStep: true,
    },
  },
  {
    id: 'write-tests',
    label: 'Write Tests',
    icon: '🧪',
    description: 'Create tests for your code',
    helpText: 'Tests help ensure your code works correctly. Paste your code to generate tests.',
    examples: ['Test my login function', 'Add unit tests', 'Test error handling'],
    defaultDescription: 'I want to write tests for my code',
    smartDefaults: {
      includeEdgeCases: true,
      includeErrorCases: true,
    },
  },
];

// Tech stack options with beginner-friendly descriptions
const TECH_STACKS = [
  { id: 'react', label: 'React', icon: '⚛️', desc: 'Most popular for web apps' },
  { id: 'nextjs', label: 'Next.js', icon: '▲', desc: 'React + server features' },
  { id: 'vue', label: 'Vue', icon: '💚', desc: 'Beginner-friendly framework' },
  { id: 'svelte', label: 'Svelte', icon: '🔥', desc: 'Fast & simple' },
  { id: 'python', label: 'Python', icon: '🐍', desc: 'Great for beginners' },
  { id: 'node', label: 'Node.js', icon: '💚', desc: 'JavaScript backend' },
  { id: 'typescript', label: 'TypeScript', icon: '📘', desc: 'JavaScript with types' },
  { id: 'rust', label: 'Rust', icon: '🦀', desc: 'High performance' },
  { id: 'go', label: 'Go', icon: '🔵', desc: 'Simple & fast' },
  { id: 'java', label: 'Java', icon: '☕', desc: 'Enterprise standard' },
  { id: 'csharp', label: 'C#', icon: '💜', desc: '.NET framework' },
  { id: 'other', label: 'Other', icon: '📦', desc: 'Something else' },
];

// Output preferences with helpful explanations
const OUTPUT_PREFS = [
  { id: 'explained', label: '✨ Explained (Recommended)', desc: 'Code with helpful comments - perfect for learning!', recommended: true },
  { id: 'step-by-step', label: '📋 Step-by-Step', desc: 'Detailed walkthrough - great if you\'re new to this' },
  { id: 'code-only', label: '💻 Code Only', desc: 'Just the code, no extra commentary - for experienced devs' },
  { id: 'diff', label: '📝 Diff Format', desc: 'Shows what changed - good for reviewing edits' },
];

// Smart auto-fill suggestions based on task type
const SMART_SUGGESTIONS: Record<string, string[]> = {
  'build-app': [
    'Include a clean, modern UI design',
    'Add proper error handling for all user inputs',
    'Make it responsive (works on mobile and desktop)',
    'Include loading states for better user experience',
    'Add helpful comments explaining key parts',
  ],
  'add-feature': [
    'Keep existing functionality working',
    'Match the current code style',
    'Add comments explaining the new code',
    'Handle edge cases gracefully',
    'Update any related documentation',
  ],
  'fix-bug': [
    'Explain what was causing the bug',
    'Show the fix clearly',
    'Add validation to prevent similar bugs',
    'Include a test to verify the fix',
    'Keep the solution simple and clear',
  ],
  'refactor': [
    'Keep the same functionality',
    'Improve code readability',
    'Add clear variable names',
    'Break large functions into smaller ones',
    'Add TypeScript types if applicable',
  ],
  'explain': [
    'Use simple, everyday language',
    'Explain like I\'m a beginner',
    'Include a visual diagram if helpful',
    'Break down complex parts step by step',
    'Give real-world analogies',
  ],
  'write-tests': [
    'Cover the main success case',
    'Test edge cases (empty input, etc.)',
    'Test error handling',
    'Use descriptive test names',
    'Keep tests simple and focused',
  ],
};

// Common project types for smart defaults
const PROJECT_TYPES = [
  { id: 'web', label: '🌐 Web App', stacks: ['react', 'nextjs', 'vue', 'svelte'] },
  { id: 'api', label: '🔌 API/Backend', stacks: ['node', 'python', 'go', 'java'] },
  { id: 'mobile', label: '📱 Mobile App', stacks: ['react', 'typescript'] },
  { id: 'cli', label: '💻 Command Line Tool', stacks: ['node', 'python', 'rust', 'go'] },
  { id: 'script', label: '📜 Script/Automation', stacks: ['python', 'node'] },
];

// Community templates
const COMMUNITY_TEMPLATES = [
  {
    id: 'fullstack-saas',
    name: 'Full-Stack SaaS Starter',
    author: 'DevCommunity',
    rating: 4.9,
    uses: 2847,
    tags: ['Next.js', 'Supabase', 'Stripe'],
    difficulty: 'Intermediate',
    prompt: `<task>
Build a complete SaaS application with the following features
</task>

<tech-stack>
- Next.js 14 with App Router
- Supabase for auth and database
- Stripe for payments
- Tailwind CSS for styling
- TypeScript throughout
</tech-stack>

<features>
{{DESCRIBE YOUR SAAS FEATURES}}
</features>

<requirements>
- User authentication (email/password + OAuth)
- Subscription billing with Stripe
- User dashboard
- Admin panel
- API rate limiting
- Responsive design
</requirements>

<output-instructions>
1. Start with project structure
2. Create each file with complete code
3. Include environment variable setup
4. Add deployment instructions for Vercel
</output-instructions>`,
  },
  {
    id: 'beginner-todo',
    name: 'Beginner-Friendly Todo App',
    author: 'LearnToCode',
    rating: 5.0,
    uses: 5621,
    tags: ['React', 'Beginner', 'Tutorial'],
    difficulty: 'Beginner',
    prompt: `<task>
Build a simple, beginner-friendly todo list application.
I'm new to coding, so please explain everything clearly.
</task>

<context>
I'm learning to code and want to understand every part of this application.
Please use simple, clear code with lots of helpful comments.
</context>

<tech-stack>
- React (using create-react-app or Vite)
- Plain CSS (no complex libraries)
- Local storage to save todos
</tech-stack>

<features>
- Add new todos
- Mark todos as complete
- Delete todos
- Filter by all/active/completed
- Data persists when page refreshes
</features>

<requirements>
- Use simple, readable code
- Add comments explaining what each part does
- No complex patterns - keep it beginner-friendly
- Include step-by-step instructions to run the app
</requirements>

<output-instructions>
Please provide:
1. Explanation of what we're building
2. Step-by-step setup instructions
3. Each file with detailed comments
4. Explanation of how the pieces work together
5. Suggestions for next steps to learn more
</output-instructions>`,
  },
  {
    id: 'api-microservice',
    name: 'REST API Microservice',
    author: 'BackendPro',
    rating: 4.8,
    uses: 1923,
    tags: ['Node.js', 'Express', 'PostgreSQL'],
    difficulty: 'Intermediate',
    prompt: `<task>
Create a production-ready REST API microservice
</task>

<tech-stack>
- Node.js with Express
- PostgreSQL with Prisma ORM
- JWT authentication
- Docker containerization
- OpenAPI/Swagger docs
</tech-stack>

<endpoints>
{{LIST YOUR API ENDPOINTS}}
</endpoints>

<requirements>
- Input validation with Zod
- Error handling middleware
- Request logging
- Rate limiting
- Health checks
- Unit tests with Jest
</requirements>

<output-instructions>
- Complete, working code
- Docker compose file
- README with setup instructions
- Postman collection export
</output-instructions>`,
  },
  {
    id: 'cli-tool',
    name: 'CLI Tool Builder',
    author: 'TerminalWizard',
    rating: 4.7,
    uses: 1456,
    tags: ['Node.js', 'Commander', 'Chalk'],
    difficulty: 'Intermediate',
    prompt: `<task>
Build a command-line tool with the following functionality
</task>

<description>
{{DESCRIBE YOUR CLI TOOL}}
</description>

<tech-stack>
- Node.js
- Commander.js for CLI parsing
- Chalk for colored output
- Ora for spinners
- Inquirer for prompts
</tech-stack>

<commands>
{{LIST YOUR COMMANDS}}
</commands>

<requirements>
- Clear help messages
- Error handling
- Config file support
- Progress indicators
- Colorful output
</requirements>`,
  },
  {
    id: 'react-component-lib',
    name: 'React Component Library',
    author: 'UIBuilder',
    rating: 4.6,
    uses: 1234,
    tags: ['React', 'TypeScript', 'Storybook'],
    difficulty: 'Advanced',
    prompt: `<task>
Create a reusable React component library
</task>

<components>
{{LIST YOUR COMPONENTS}}
</components>

<tech-stack>
- React 18
- TypeScript
- Tailwind CSS
- Storybook for docs
- Vitest for testing
</tech-stack>

<requirements>
- Fully typed props
- Accessible (WCAG 2.1)
- Dark mode support
- Customizable via props
- Tree-shakeable
- SSR compatible
</requirements>`,
  },
  {
    id: 'mobile-app',
    name: 'React Native App',
    author: 'MobileDev',
    rating: 4.8,
    uses: 1567,
    tags: ['React Native', 'Expo', 'TypeScript'],
    difficulty: 'Intermediate',
    prompt: `<task>
Build a cross-platform mobile app
</task>

<description>
{{DESCRIBE YOUR APP}}
</description>

<tech-stack>
- React Native with Expo
- TypeScript
- React Navigation
- Zustand for state
- React Query for data fetching
</tech-stack>

<screens>
{{LIST YOUR SCREENS}}
</screens>

<requirements>
- iOS and Android support
- Offline functionality
- Push notifications
- Deep linking
- App store ready
</requirements>`,
  },
];

// Best practices tips for Claude Code
const BEST_PRACTICES = [
  {
    title: 'Be Specific',
    tip: 'Instead of "make a website", say "create a Next.js 14 app with App Router, Tailwind CSS, and Supabase auth"',
    icon: '🎯',
  },
  {
    title: 'Provide Context',
    tip: 'Share your tech stack, coding conventions, and project structure upfront',
    icon: '📋',
  },
  {
    title: 'Use XML Tags',
    tip: 'Claude Code responds well to structured prompts using XML-style sections',
    icon: '🏷️',
  },
  {
    title: 'Include Examples',
    tip: 'Show examples of the output format or coding style you want',
    icon: '💡',
  },
  {
    title: 'Set Constraints',
    tip: 'Specify what NOT to do: "Don\'t use class components" or "No external dependencies"',
    icon: '🚫',
  },
  {
    title: 'Iterate',
    tip: 'Start simple, then refine. Claude Code maintains context across the conversation',
    icon: '🔄',
  },
];

// XML tags for reference
const XML_TAGS = [
  { id: 'task', label: 'Task', desc: 'What you want to build', color: '#4ECDC4' },
  { id: 'context', label: 'Context', desc: 'Background info', color: '#3EB489' },
  { id: 'requirements', label: 'Requirements', desc: 'Must-haves', color: '#F59E0B' },
  { id: 'constraints', label: 'Constraints', desc: 'Limitations', color: '#EF4444' },
  { id: 'code', label: 'Code', desc: 'Your code', color: '#8B5CF6' },
  { id: 'examples', label: 'Examples', desc: 'Sample output', color: '#EC4899' },
  { id: 'tech-stack', label: 'Tech Stack', desc: 'Technologies', color: '#06B6D4' },
  { id: 'output-instructions', label: 'Output', desc: 'How to respond', color: '#10B981' },
];

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

function detectLanguage(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase() || '';
  const langMap: Record<string, string> = {
    js: 'javascript', jsx: 'javascript', ts: 'typescript', tsx: 'typescript',
    py: 'python', rb: 'ruby', go: 'go', rs: 'rust', java: 'java', cs: 'csharp',
    css: 'css', html: 'html', json: 'json', md: 'markdown', yaml: 'yaml',
    yml: 'yaml', sql: 'sql', sh: 'bash', bash: 'bash',
  };
  return langMap[ext] || 'text';
}

function calculatePromptScore(prompt: string): PromptScore {
  const suggestions: string[] = [];
  let specificity = 0, clarity = 0, completeness = 0, structure = 0;

  // Check for XML tags (structure)
  const xmlTags = ['<task>', '<context>', '<requirements>', '<output-instructions>'];
  const foundTags = xmlTags.filter(tag => prompt.includes(tag));
  structure = Math.min(100, (foundTags.length / xmlTags.length) * 100 + (prompt.includes('</') ? 20 : 0));
  if (foundTags.length < 2) suggestions.push('Add more XML structure tags like <task>, <context>, <requirements>');

  // Check for specificity
  const specificIndicators = ['specifically', 'exactly', 'must', 'should', 'required', 'include', 'exclude', 'format'];
  const foundSpecific = specificIndicators.filter(ind => prompt.toLowerCase().includes(ind));
  specificity = Math.min(100, (foundSpecific.length / specificIndicators.length) * 100 + (prompt.length > 200 ? 30 : 0));
  if (specificity < 50) suggestions.push('Be more specific - use words like "must", "should", "exactly"');

  // Check for clarity
  const hasTask = prompt.toLowerCase().includes('task') || prompt.includes('<task>');
  const hasOutput = prompt.toLowerCase().includes('output') || prompt.toLowerCase().includes('format');
  const hasContext = prompt.toLowerCase().includes('context') || prompt.includes('<context>');
  clarity = (hasTask ? 35 : 0) + (hasOutput ? 35 : 0) + (hasContext ? 30 : 0);
  if (!hasOutput) suggestions.push('Specify the desired output format');

  // Check for completeness
  const hasCodeBlock = prompt.includes('```') || prompt.includes('<code>');
  const hasTechStack = prompt.toLowerCase().includes('tech') || prompt.toLowerCase().includes('stack') ||
                       TECH_STACKS.some(t => prompt.toLowerCase().includes(t.label.toLowerCase()));
  const hasRequirements = prompt.includes('<requirements>') || prompt.toLowerCase().includes('requirements');
  completeness = (hasCodeBlock ? 25 : 0) + (hasTechStack ? 25 : 0) + (hasRequirements ? 25 : 0) +
                 (prompt.length > 300 ? 25 : prompt.length > 150 ? 15 : 5);
  if (!hasTechStack) suggestions.push('Mention your tech stack or preferred technologies');

  const overall = Math.round((specificity + clarity + completeness + structure) / 4);
  return { overall, specificity: Math.round(specificity), clarity: Math.round(clarity),
           completeness: Math.round(completeness), structure: Math.round(structure), suggestions: suggestions.slice(0, 3) };
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function ClaudeCodePage() {
  // ============================================================================
  // STATE
  // ============================================================================

  // Core builder state
  const [taskType, setTaskType] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [techStack, setTechStack] = useState<string[]>([]);
  const [outputPref, setOutputPref] = useState('explained');
  const [projectContext, setProjectContext] = useState('');
  const [constraints, setConstraints] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [copied, setCopied] = useState(false);

  // Beginner mode state
  const [showHelp, setShowHelp] = useState(true);
  const [experienceLevel, setExperienceLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [selectedSuggestions, setSelectedSuggestions] = useState<string[]>([]);

  // Tab navigation
  const [activeTab, setActiveTab] = useState<'builder' | 'files' | 'chain' | 'templates' | 'history' | 'tips'>('builder');

  // Codebase upload state
  const [codeFiles, setCodeFiles] = useState<CodeFile[]>([]);
  const [packageJson, setPackageJson] = useState('');
  const [fileTree, setFileTree] = useState('');

  // Prompt history & favorites
  const [savedPrompts, setSavedPrompts] = useState<SavedPrompt[]>([]);
  const [promptName, setPromptName] = useState('');

  // Prompt chain state
  const [promptChain, setPromptChain] = useState<PromptChainStep[]>([]);
  const [activeChainStep, setActiveChainStep] = useState<string | null>(null);

  // Prompt score
  const [promptScore, setPromptScore] = useState<PromptScore | null>(null);

  // ============================================================================
  // EFFECTS
  // ============================================================================

  // Load saved prompts from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('claude-code-saved-prompts');
    if (saved) setSavedPrompts(JSON.parse(saved));
  }, []);

  // Generate prompt whenever inputs change
  useEffect(() => {
    if (taskType && taskDescription) {
      generatePromptFromInputs();
    } else {
      setGeneratedPrompt('');
      setPromptScore(null);
    }
  }, [taskType, taskDescription, techStack, outputPref, projectContext, constraints, codeFiles, packageJson, fileTree, selectedSuggestions, experienceLevel]);

  // Calculate score when prompt changes
  useEffect(() => {
    if (generatedPrompt) {
      const score = calculatePromptScore(generatedPrompt);
      setPromptScore(score);
    }
  }, [generatedPrompt]);

  // Auto-select suggestions when task type changes
  useEffect(() => {
    if (taskType) {
      const defaultSuggestions = SMART_SUGGESTIONS[taskType]?.slice(0, 3) || [];
      setSelectedSuggestions(defaultSuggestions);
    }
  }, [taskType]);

  // ============================================================================
  // PROMPT GENERATION - BEGINNER FRIENDLY & COMPREHENSIVE
  // ============================================================================

  const generatePromptFromInputs = useCallback(() => {
    const task = CLAUDE_CODE_TASKS.find(t => t.id === taskType);
    if (!task) return;

    const techStackStr = techStack.length > 0
      ? techStack.map(t => TECH_STACKS.find(ts => ts.id === t)?.label).filter(Boolean).join(', ')
      : '';

    const outputPrefInfo = OUTPUT_PREFS.find(o => o.id === outputPref);

    // Build a comprehensive, detailed prompt
    let prompt = `<task>\n`;
    prompt += `${task.label}: ${taskDescription}\n`;
    prompt += `</task>\n\n`;

    // Add experience level context - helps Claude adjust complexity
    prompt += `<context>\n`;
    prompt += `Experience Level: ${experienceLevel === 'beginner' ? 'I\'m a beginner, please explain things clearly and simply' :
               experienceLevel === 'intermediate' ? 'I have some coding experience' :
               'I\'m an experienced developer, be concise'}\n`;
    if (projectContext) {
      prompt += `\nProject Background:\n${projectContext}\n`;
    }
    prompt += `</context>\n\n`;

    // Add package.json info if provided
    if (packageJson) {
      prompt += `<project-config>\n`;
      prompt += `\`\`\`json\n${packageJson}\n\`\`\`\n`;
      prompt += `</project-config>\n\n`;
    }

    // Add file tree if provided
    if (fileTree) {
      prompt += `<file-structure>\n${fileTree}\n</file-structure>\n\n`;
    }

    // Add code files if provided
    if (codeFiles.length > 0) {
      prompt += `<files>\n`;
      codeFiles.forEach(file => {
        prompt += `<file name="${file.name}" language="${file.language}">\n`;
        prompt += `\`\`\`${file.language}\n${file.content}\n\`\`\`\n`;
        prompt += `</file>\n\n`;
      });
      prompt += `</files>\n\n`;
    }

    // Add tech stack with context
    if (techStackStr) {
      prompt += `<tech-stack>\n`;
      prompt += `Technologies to use: ${techStackStr}\n`;
      if (experienceLevel === 'beginner') {
        prompt += `Please use the simplest patterns for these technologies.\n`;
      }
      prompt += `</tech-stack>\n\n`;
    }

    // Build comprehensive requirements based on task type
    prompt += `<requirements>\n`;

    // Add selected suggestions
    if (selectedSuggestions.length > 0) {
      selectedSuggestions.forEach(suggestion => {
        prompt += `- ${suggestion}\n`;
      });
    }

    // Add task-specific requirements
    switch (taskType) {
      case 'build-app':
        prompt += `- Create a complete, working application\n`;
        prompt += `- Include all necessary files and configurations\n`;
        prompt += `- Add proper error handling\n`;
        prompt += `- Make the UI clean and user-friendly\n`;
        if (experienceLevel === 'beginner') {
          prompt += `- Keep the code simple and well-organized\n`;
          prompt += `- Add helpful comments explaining key parts\n`;
        }
        break;
      case 'add-feature':
        prompt += `- Keep existing functionality working\n`;
        prompt += `- Match the current code style and patterns\n`;
        prompt += `- Handle edge cases gracefully\n`;
        break;
      case 'fix-bug':
        prompt += `- Identify the root cause of the issue\n`;
        prompt += `- Provide a clear fix with explanation\n`;
        prompt += `- Add validation to prevent similar issues\n`;
        prompt += `- Explain why this fix works\n`;
        break;
      case 'refactor':
        prompt += `- Maintain the exact same functionality\n`;
        prompt += `- Improve code readability and organization\n`;
        prompt += `- Use clear, descriptive names\n`;
        prompt += `- Follow best practices for the language/framework\n`;
        break;
      case 'explain':
        prompt += `- Use simple, everyday language\n`;
        prompt += `- Break down complex parts step by step\n`;
        prompt += `- Give real-world analogies when helpful\n`;
        prompt += `- Explain WHY things work, not just what they do\n`;
        break;
      case 'write-tests':
        prompt += `- Cover the main success scenarios\n`;
        prompt += `- Test edge cases (empty input, null values, etc.)\n`;
        prompt += `- Test error handling\n`;
        prompt += `- Use descriptive test names that explain what's being tested\n`;
        break;
    }

    // Add constraints if provided
    if (constraints) {
      prompt += `\nConstraints:\n- ${constraints}\n`;
    }

    prompt += `</requirements>\n\n`;

    // Add comprehensive output instructions based on preference and experience
    prompt += `<output-instructions>\n`;

    switch (outputPref) {
      case 'code-only':
        prompt += `Provide clean, working code with minimal commentary.\n`;
        prompt += `Focus on complete, runnable code.\n`;
        break;
      case 'explained':
        prompt += `Please provide:\n`;
        prompt += `1. A brief overview of the approach\n`;
        prompt += `2. Complete code with inline comments explaining key decisions\n`;
        prompt += `3. A summary of what the code does\n`;
        if (experienceLevel === 'beginner') {
          prompt += `4. Any gotchas or common mistakes to avoid\n`;
          prompt += `5. Suggested next steps for learning more\n`;
        }
        break;
      case 'step-by-step':
        prompt += `Please break this down into clear, numbered steps:\n`;
        prompt += `1. Start with an overview of what we'll build\n`;
        prompt += `2. For each step, explain WHAT we're doing and WHY\n`;
        prompt += `3. Show the code for that step\n`;
        prompt += `4. Explain how it connects to previous steps\n`;
        prompt += `5. End with a summary and how to run/test the result\n`;
        break;
      case 'diff':
        prompt += `Show changes in diff format:\n`;
        prompt += `- Use +/- to show added/removed lines\n`;
        prompt += `- Highlight what was modified and why\n`;
        prompt += `- Provide context around the changes\n`;
        break;
    }

    // Add experience-level specific instructions
    if (experienceLevel === 'beginner') {
      prompt += `\nSince I'm a beginner:\n`;
      prompt += `- Please explain any technical terms you use\n`;
      prompt += `- Point out common mistakes I should avoid\n`;
      prompt += `- Suggest resources if I want to learn more\n`;
    }

    prompt += `</output-instructions>`;

    setGeneratedPrompt(prompt);
  }, [taskType, taskDescription, techStack, outputPref, projectContext, constraints, codeFiles, packageJson, fileTree, selectedSuggestions, experienceLevel]);

  // ============================================================================
  // HANDLERS
  // ============================================================================

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setTaskType('');
    setTaskDescription('');
    setTechStack([]);
    setOutputPref('explained');
    setProjectContext('');
    setConstraints('');
    setGeneratedPrompt('');
    setCodeFiles([]);
    setPackageJson('');
    setFileTree('');
    setSelectedSuggestions([]);
    setPromptScore(null);
  };

  const toggleTechStack = (id: string) => {
    setTechStack(prev => prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]);
  };

  const toggleSuggestion = (suggestion: string) => {
    setSelectedSuggestions(prev =>
      prev.includes(suggestion) ? prev.filter(s => s !== suggestion) : [...prev, suggestion]
    );
  };

  const handleSavePrompt = () => {
    if (!generatedPrompt || !promptName) return;
    const newPrompt: SavedPrompt = {
      id: generateId(), name: promptName, prompt: generatedPrompt,
      taskType, createdAt: new Date().toISOString(), isFavorite: false,
    };
    const updated = [newPrompt, ...savedPrompts];
    setSavedPrompts(updated);
    localStorage.setItem('claude-code-saved-prompts', JSON.stringify(updated));
    setPromptName('');
  };

  const handleToggleFavorite = (id: string) => {
    const updated = savedPrompts.map(p => p.id === id ? { ...p, isFavorite: !p.isFavorite } : p);
    setSavedPrompts(updated);
    localStorage.setItem('claude-code-saved-prompts', JSON.stringify(updated));
  };

  const handleDeletePrompt = (id: string) => {
    const updated = savedPrompts.filter(p => p.id !== id);
    setSavedPrompts(updated);
    localStorage.setItem('claude-code-saved-prompts', JSON.stringify(updated));
  };

  const handleLoadPrompt = (prompt: SavedPrompt) => {
    setGeneratedPrompt(prompt.prompt);
    setActiveTab('builder');
  };

  const handleAddCodeFile = () => {
    setCodeFiles(prev => [...prev, { id: generateId(), name: 'untitled.ts', content: '', language: 'typescript' }]);
  };

  const handleUpdateCodeFile = (id: string, updates: Partial<CodeFile>) => {
    setCodeFiles(prev => prev.map(f => {
      if (f.id === id) {
        const updated = { ...f, ...updates };
        if (updates.name) updated.language = detectLanguage(updates.name);
        return updated;
      }
      return f;
    }));
  };

  const handleRemoveCodeFile = (id: string) => {
    setCodeFiles(prev => prev.filter(f => f.id !== id));
  };

  const handleAddChainStep = () => {
    const newStep: PromptChainStep = { id: generateId(), name: `Step ${promptChain.length + 1}`, prompt: '', order: promptChain.length };
    setPromptChain(prev => [...prev, newStep]);
    setActiveChainStep(newStep.id);
  };

  const handleUpdateChainStep = (id: string, updates: Partial<PromptChainStep>) => {
    setPromptChain(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const handleRemoveChainStep = (id: string) => {
    setPromptChain(prev => prev.filter(s => s.id !== id));
    if (activeChainStep === id) setActiveChainStep(null);
  };

  const handleCopyChain = async () => {
    const fullChain = promptChain
      .sort((a, b) => a.order - b.order)
      .map((step, i) => `## Step ${i + 1}: ${step.name}\n\n${step.prompt}`)
      .join('\n\n---\n\n');
    await navigator.clipboard.writeText(fullChain);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenInClaude = () => {
    const encodedPrompt = encodeURIComponent(generatedPrompt);
    window.open(`https://claude.ai/new?q=${encodedPrompt}`, '_blank');
  };

  const handleUseTemplate = (templatePrompt: string) => {
    setGeneratedPrompt(templatePrompt);
    setActiveTab('builder');
  };

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-lg bg-[var(--background)]/80 border-b border-[var(--border-color)]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4ECDC4] to-[#3EB489] flex items-center justify-center">
                <Icons.chart className="w-6 h-6 text-[#0a1929]" />
              </div>
              <span className="text-xl font-bold">
                <span className="text-[#4ECDC4]">Prompt</span>
                <span className="text-[var(--foreground)]">Forge</span>
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              <Link href="/" className="px-4 py-2 text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors rounded-lg hover:bg-[var(--muted)]">
                Home
              </Link>
              <Link href="/claude-code" className="px-4 py-2 text-[#4ECDC4] font-medium rounded-lg bg-[rgba(78,205,196,0.1)] flex items-center gap-1">
                <span>⚡</span> Claude Code
              </Link>
              <Link href="/prompts-101" className="px-4 py-2 text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors rounded-lg hover:bg-[var(--muted)]">
                Prompts 101
              </Link>
              <Link href="/playground" className="px-4 py-2 text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors rounded-lg hover:bg-[var(--muted)]">
                Playground
              </Link>
              <Link href="/builder" className="px-4 py-2 text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors rounded-lg hover:bg-[var(--muted)]">
                Builder
              </Link>
            </div>
          </div>

          <ThemeToggle />
        </div>
      </nav>

      {/* Hero - Beginner Friendly Introduction */}
      <section className="relative overflow-hidden border-b border-[var(--border-color)]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#4ECDC4]/10 via-transparent to-[#3EB489]/10" />
        <div className="max-w-7xl mx-auto px-6 py-10 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(78,205,196,0.15)] border border-[rgba(78,205,196,0.3)] text-[#4ECDC4] text-sm font-medium mb-4">
              <span className="text-lg">⚡</span>
              No Prompt Engineering Experience Needed
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--foreground)] mb-4 leading-tight">
              Tell Claude What You Need,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4ECDC4] to-[#3EB489]">
                We'll Write the Prompt
              </span>
            </h1>

            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto mb-6">
              Just answer a few simple questions about what you want to build.
              We'll create a detailed, professional prompt that gets you better results.
            </p>

            {/* Experience Level Selector */}
            <div className="inline-flex items-center gap-2 p-1 rounded-xl bg-[var(--muted)] border border-[var(--border-color)]">
              <span className="text-sm text-[var(--text-muted)] px-2">I am a:</span>
              {[
                { id: 'beginner', label: '🌱 Beginner' },
                { id: 'intermediate', label: '🌿 Intermediate' },
                { id: 'advanced', label: '🌳 Advanced' },
              ].map((level) => (
                <button
                  key={level.id}
                  onClick={() => setExperienceLevel(level.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    experienceLevel === level.id
                      ? 'bg-[#4ECDC4] text-[#0a1929]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--foreground)]'
                  }`}
                >
                  {level.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-6 pt-6">
        <div className="flex flex-wrap gap-2 border-b border-[var(--border-color)] pb-4">
          {[
            { id: 'builder', label: 'Prompt Builder', icon: '🔨' },
            { id: 'files', label: 'Code Files', icon: '📁', badge: codeFiles.length || undefined },
            { id: 'chain', label: 'Prompt Chain', icon: '🔗', badge: promptChain.length || undefined },
            { id: 'templates', label: 'Community', icon: '🌐' },
            { id: 'history', label: 'History', icon: '📚', badge: savedPrompts.filter(p => p.isFavorite).length || undefined },
            { id: 'tips', label: 'Pro Tips', icon: '💡' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-[#4ECDC4] to-[#3EB489] text-[#0a1929] shadow-lg'
                  : 'bg-[var(--muted)] text-[var(--text-secondary)] hover:bg-[var(--card)]'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
              {tab.badge && (
                <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                  activeTab === tab.id ? 'bg-[#0a1929]/20' : 'bg-[#4ECDC4]/20 text-[#4ECDC4]'
                }`}>
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* ================================================================== */}
        {/* BUILDER TAB - BEGINNER FRIENDLY */}
        {/* ================================================================== */}
        {activeTab === 'builder' && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left: Builder Form */}
            <div className="space-y-6">
              {/* Step 1: Task Type Selection */}
              <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border-color)]">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-[var(--foreground)] flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-[#4ECDC4] text-[#0a1929] flex items-center justify-center text-sm font-bold">1</span>
                    What do you want to do?
                  </h3>
                  <button onClick={handleReset} className="text-sm text-[var(--text-muted)] hover:text-[#4ECDC4]">
                    Start Over
                  </button>
                </div>

                {showHelp && (
                  <p className="text-sm text-[var(--text-muted)] mb-4 ml-10">
                    Pick the option that best describes your goal. Don't worry, you can always change it!
                  </p>
                )}

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {CLAUDE_CODE_TASKS.map((task) => (
                    <button
                      key={task.id}
                      onClick={() => {
                        setTaskType(task.id);
                        setTaskDescription(task.defaultDescription);
                      }}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        taskType === task.id
                          ? 'border-[#4ECDC4] bg-[rgba(78,205,196,0.1)]'
                          : 'border-[var(--border-color)] hover:border-[#4ECDC4]/50'
                      }`}
                    >
                      <div className="text-2xl mb-2">{task.icon}</div>
                      <div className="font-medium text-sm text-[var(--foreground)]">{task.label}</div>
                      <div className="text-xs text-[var(--text-muted)] mt-1">{task.description}</div>
                    </button>
                  ))}
                </div>

                {/* Task Description */}
                {taskType && (
                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-[var(--foreground)]">
                        Describe what you want (be specific!)
                      </label>
                      <button
                        onClick={() => setShowHelp(!showHelp)}
                        className="text-xs text-[#4ECDC4] hover:underline"
                      >
                        {showHelp ? 'Hide Tips' : 'Show Tips'}
                      </button>
                    </div>

                    {showHelp && (
                      <div className="mb-3 p-3 rounded-lg bg-[rgba(78,205,196,0.1)] border border-[rgba(78,205,196,0.2)]">
                        <p className="text-xs text-[#4ECDC4] mb-2">💡 Good examples:</p>
                        <ul className="text-xs text-[var(--text-muted)] space-y-1">
                          {CLAUDE_CODE_TASKS.find(t => t.id === taskType)?.examples.map((ex, i) => (
                            <li key={i} className="cursor-pointer hover:text-[var(--foreground)]" onClick={() => setTaskDescription(ex)}>
                              • {ex}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <textarea
                      value={taskDescription}
                      onChange={(e) => setTaskDescription(e.target.value)}
                      placeholder="Describe in detail what you want to accomplish..."
                      className="w-full p-4 rounded-xl bg-[var(--muted)] border border-[var(--border-color)] text-[var(--foreground)] placeholder:text-[var(--text-muted)] focus:border-[#4ECDC4] focus:outline-none resize-none"
                      rows={4}
                    />
                    <p className="text-xs text-[var(--text-muted)] mt-2">
                      💡 Tip: The more details you provide, the better the results will be!
                    </p>
                  </div>
                )}
              </div>

              {/* Step 2: Tech Stack */}
              <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border-color)]">
                <h3 className="font-semibold text-[var(--foreground)] mb-2 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-[#3EB489] text-[#0a1929] flex items-center justify-center text-sm font-bold">2</span>
                  What technologies do you want to use?
                </h3>

                {showHelp && (
                  <p className="text-sm text-[var(--text-muted)] mb-4 ml-10">
                    Select the technologies you want Claude to use. Not sure? Leave blank and Claude will choose for you.
                  </p>
                )}

                <div className="flex flex-wrap gap-2">
                  {TECH_STACKS.map((tech) => (
                    <button
                      key={tech.id}
                      onClick={() => toggleTechStack(tech.id)}
                      title={tech.desc}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-all ${
                        techStack.includes(tech.id)
                          ? 'bg-[#4ECDC4] text-[#0a1929]'
                          : 'bg-[var(--muted)] text-[var(--text-secondary)] hover:bg-[var(--card)]'
                      }`}
                    >
                      <span>{tech.icon}</span>
                      {tech.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Output Preference */}
              <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border-color)]">
                <h3 className="font-semibold text-[var(--foreground)] mb-2 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-[#5ED4CB] text-[#0a1929] flex items-center justify-center text-sm font-bold">3</span>
                  How should Claude explain the code?
                </h3>

                {showHelp && (
                  <p className="text-sm text-[var(--text-muted)] mb-4 ml-10">
                    Choose how detailed you want the explanation to be.
                  </p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {OUTPUT_PREFS.map((pref) => (
                    <button
                      key={pref.id}
                      onClick={() => setOutputPref(pref.id)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        outputPref === pref.id
                          ? 'border-[#4ECDC4] bg-[rgba(78,205,196,0.1)]'
                          : 'border-[var(--border-color)] hover:border-[#4ECDC4]/50'
                      }`}
                    >
                      <div className="font-medium text-sm text-[var(--foreground)]">{pref.label}</div>
                      <div className="text-xs text-[var(--text-muted)] mt-1">{pref.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 4: Smart Suggestions */}
              {taskType && SMART_SUGGESTIONS[taskType] && (
                <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border-color)]">
                  <h3 className="font-semibold text-[var(--foreground)] mb-2 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-[#F59E0B] text-[#0a1929] flex items-center justify-center text-sm font-bold">4</span>
                    What else should Claude know?
                  </h3>

                  {showHelp && (
                    <p className="text-sm text-[var(--text-muted)] mb-4 ml-10">
                      Toggle on any of these to include them in your prompt. These are best practices for your task.
                    </p>
                  )}

                  <div className="space-y-2">
                    {SMART_SUGGESTIONS[taskType].map((suggestion, i) => (
                      <label
                        key={i}
                        className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                          selectedSuggestions.includes(suggestion)
                            ? 'bg-[rgba(78,205,196,0.1)] border border-[#4ECDC4]'
                            : 'bg-[var(--muted)] border border-transparent hover:bg-[var(--card)]'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedSuggestions.includes(suggestion)}
                          onChange={() => toggleSuggestion(suggestion)}
                          className="w-4 h-4 rounded text-[#4ECDC4] focus:ring-[#4ECDC4]"
                        />
                        <span className={`text-sm ${
                          selectedSuggestions.includes(suggestion)
                            ? 'text-[var(--foreground)]'
                            : 'text-[var(--text-secondary)]'
                        }`}>
                          {suggestion}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Optional: Additional Context */}
              <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border-color)]">
                <h3 className="font-semibold text-[var(--foreground)] mb-2 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-[#6366F1] text-white flex items-center justify-center text-sm font-bold">5</span>
                  Any additional details? (Optional)
                </h3>

                {showHelp && (
                  <p className="text-sm text-[var(--text-muted)] mb-4 ml-10">
                    Add any extra context about your project or specific requirements.
                  </p>
                )}

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-[var(--text-secondary)] mb-2">
                      Project Context
                    </label>
                    <textarea
                      value={projectContext}
                      onChange={(e) => setProjectContext(e.target.value)}
                      placeholder="Tell Claude about your project, what you've already built, your coding style preferences..."
                      className="w-full p-3 rounded-xl bg-[var(--muted)] border border-[var(--border-color)] text-[var(--foreground)] placeholder:text-[var(--text-muted)] focus:border-[#4ECDC4] focus:outline-none resize-none"
                      rows={2}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[var(--text-secondary)] mb-2">
                      Any Restrictions?
                    </label>
                    <input
                      type="text"
                      value={constraints}
                      onChange={(e) => setConstraints(e.target.value)}
                      placeholder="e.g., No external libraries, Must work offline, Keep it simple..."
                      className="w-full p-3 rounded-xl bg-[var(--muted)] border border-[var(--border-color)] text-[var(--foreground)] placeholder:text-[var(--text-muted)] focus:border-[#4ECDC4] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Live Preview */}
            <div className="lg:sticky lg:top-24 lg:self-start space-y-4">
              {/* Prompt Score Card */}
              {promptScore && (
                <div className="p-4 rounded-2xl bg-[var(--card)] border border-[var(--border-color)]">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-[var(--foreground)]">Prompt Quality Score</h3>
                    <div className={`text-2xl font-bold ${
                      promptScore.overall >= 80 ? 'text-green-500' :
                      promptScore.overall >= 60 ? 'text-yellow-500' : 'text-red-500'
                    }`}>
                      {promptScore.overall}/100
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-2 mb-3">
                    {[
                      { label: 'Specific', value: promptScore.specificity },
                      { label: 'Clear', value: promptScore.clarity },
                      { label: 'Complete', value: promptScore.completeness },
                      { label: 'Structured', value: promptScore.structure },
                    ].map((item) => (
                      <div key={item.label} className="text-center">
                        <div className="text-xs text-[var(--text-muted)]">{item.label}</div>
                        <div className="h-2 bg-[var(--muted)] rounded-full mt-1">
                          <div
                            className={`h-full rounded-full ${
                              item.value >= 70 ? 'bg-green-500' :
                              item.value >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${item.value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  {promptScore.suggestions.length > 0 && (
                    <div className="space-y-1 pt-2 border-t border-[var(--border-color)]">
                      <p className="text-xs font-medium text-[var(--text-secondary)]">💡 Tips to improve:</p>
                      {promptScore.suggestions.map((suggestion, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-[var(--text-muted)]">
                          <span>•</span>
                          {suggestion}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Preview Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-[var(--foreground)]">Your Prompt</h2>
                <span className="text-xs text-[var(--text-muted)] px-2 py-1 rounded-lg bg-[var(--muted)]">
                  {generatedPrompt.length} chars · ~{Math.ceil(generatedPrompt.length / 4)} tokens
                </span>
              </div>

              {/* What is a prompt - for beginners */}
              {showHelp && !generatedPrompt && (
                <div className="p-4 rounded-xl bg-gradient-to-br from-[#4ECDC4]/10 to-[#3EB489]/10 border border-[#4ECDC4]/30">
                  <h4 className="font-medium text-[var(--foreground)] mb-2">🤔 What's a prompt?</h4>
                  <p className="text-sm text-[var(--text-secondary)]">
                    A prompt is the instructions you give to Claude. The better your prompt,
                    the better Claude understands what you want. We're building one for you!
                  </p>
                </div>
              )}

              {/* Preview Content */}
              <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border-color)] max-h-[500px] overflow-auto">
                {generatedPrompt ? (
                  <pre className="whitespace-pre-wrap text-sm text-[var(--foreground)] font-mono leading-relaxed">
                    {generatedPrompt}
                  </pre>
                ) : (
                  <div className="flex flex-col items-center justify-center h-48 text-center">
                    <div className="text-4xl mb-4">⚡</div>
                    <p className="text-[var(--foreground)] font-medium mb-2">
                      Select a task to get started
                    </p>
                    <p className="text-sm text-[var(--text-muted)]">
                      Your professional prompt will appear here as you fill in the form
                    </p>
                  </div>
                )}
              </div>

              {/* Actions */}
              {generatedPrompt && (
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <button
                      onClick={handleCopy}
                      className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#4ECDC4] to-[#3EB489] text-[#0a1929] font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      {copied ? (
                        <>
                          <Icons.check className="w-5 h-5" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Icons.copy className="w-5 h-5" />
                          Copy Prompt
                        </>
                      )}
                    </button>
                    <button
                      onClick={handleOpenInClaude}
                      className="flex-1 py-3 rounded-xl border border-[#4ECDC4] text-[#4ECDC4] font-semibold hover:bg-[rgba(78,205,196,0.1)] transition-all flex items-center justify-center gap-2"
                    >
                      🟣 Open in Claude
                    </button>
                  </div>

                  {/* Save Prompt */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promptName}
                      onChange={(e) => setPromptName(e.target.value)}
                      placeholder="Name this prompt to save it..."
                      className="flex-1 px-3 py-2 rounded-xl bg-[var(--muted)] border border-[var(--border-color)] text-[var(--foreground)] placeholder:text-[var(--text-muted)] focus:border-[#4ECDC4] focus:outline-none text-sm"
                    />
                    <button
                      onClick={handleSavePrompt}
                      disabled={!promptName}
                      className="px-4 py-2 rounded-xl bg-[var(--muted)] text-[var(--text-secondary)] hover:text-[#4ECDC4] transition-all disabled:opacity-50"
                    >
                      Save
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* FILES TAB */}
        {/* ================================================================== */}
        {activeTab === 'files' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[var(--foreground)]">Add Your Code Files</h2>
                <p className="text-[var(--text-secondary)]">
                  {showHelp ? 'Paste code files here so Claude understands your project better' : 'Upload codebase context'}
                </p>
              </div>
              <button
                onClick={handleAddCodeFile}
                className="px-4 py-2 rounded-xl bg-[#4ECDC4] text-[#0a1929] font-medium hover:bg-[#3dbdb5] transition-colors flex items-center gap-2"
              >
                <Icons.plus className="w-4 h-4" />
                Add File
              </button>
            </div>

            {showHelp && (
              <div className="p-4 rounded-xl bg-gradient-to-br from-[#4ECDC4]/10 to-[#3EB489]/10 border border-[#4ECDC4]/30">
                <h4 className="font-medium text-[var(--foreground)] mb-2">💡 When should I add code files?</h4>
                <ul className="text-sm text-[var(--text-secondary)] space-y-1">
                  <li>• <strong>Adding a feature</strong>: Add the files you want to modify</li>
                  <li>• <strong>Fixing a bug</strong>: Add the files where the bug occurs</li>
                  <li>• <strong>Explaining code</strong>: Add the code you want explained</li>
                </ul>
              </div>
            )}

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Package.json */}
              <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border-color)]">
                <h3 className="font-semibold text-[var(--foreground)] mb-2 flex items-center gap-2">
                  📦 package.json
                </h3>
                <p className="text-sm text-[var(--text-muted)] mb-4">
                  Paste your package.json so Claude knows your dependencies
                </p>
                <textarea
                  value={packageJson}
                  onChange={(e) => setPackageJson(e.target.value)}
                  placeholder='Paste your package.json contents here...'
                  className="w-full p-3 rounded-xl bg-[var(--muted)] border border-[var(--border-color)] text-[var(--foreground)] placeholder:text-[var(--text-muted)] focus:border-[#4ECDC4] focus:outline-none resize-none font-mono text-sm"
                  rows={8}
                />
              </div>

              {/* File Tree */}
              <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border-color)]">
                <h3 className="font-semibold text-[var(--foreground)] mb-2 flex items-center gap-2">
                  🌳 Project Structure
                </h3>
                <p className="text-sm text-[var(--text-muted)] mb-4">
                  Paste your folder structure so Claude understands your project layout
                </p>
                <textarea
                  value={fileTree}
                  onChange={(e) => setFileTree(e.target.value)}
                  placeholder={`Paste your file tree here:
src/
├── components/
│   ├── Button.tsx
│   └── Card.tsx
├── pages/
│   └── index.tsx
└── styles/
    └── globals.css`}
                  className="w-full p-3 rounded-xl bg-[var(--muted)] border border-[var(--border-color)] text-[var(--foreground)] placeholder:text-[var(--text-muted)] focus:border-[#4ECDC4] focus:outline-none resize-none font-mono text-sm"
                  rows={8}
                />
              </div>
            </div>

            {/* Code Files */}
            <div className="space-y-4">
              <h3 className="font-semibold text-[var(--foreground)]">Code Files ({codeFiles.length})</h3>

              {codeFiles.length === 0 ? (
                <div className="p-8 rounded-2xl border-2 border-dashed border-[var(--border-color)] text-center">
                  <div className="text-4xl mb-4">📄</div>
                  <p className="text-[var(--foreground)] font-medium mb-2">No code files added yet</p>
                  <p className="text-[var(--text-muted)] mb-4">
                    Add files to give Claude context about your existing code
                  </p>
                  <button
                    onClick={handleAddCodeFile}
                    className="px-4 py-2 rounded-xl bg-[var(--muted)] text-[var(--text-secondary)] hover:text-[#4ECDC4] transition-colors"
                  >
                    Add Your First File
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {codeFiles.map((file) => (
                    <div key={file.id} className="p-4 rounded-2xl bg-[var(--card)] border border-[var(--border-color)]">
                      <div className="flex items-center gap-3 mb-3">
                        <input
                          type="text"
                          value={file.name}
                          onChange={(e) => handleUpdateCodeFile(file.id, { name: e.target.value })}
                          placeholder="filename.ts"
                          className="flex-1 px-3 py-2 rounded-lg bg-[var(--muted)] border border-[var(--border-color)] text-[var(--foreground)] placeholder:text-[var(--text-muted)] focus:border-[#4ECDC4] focus:outline-none text-sm font-mono"
                        />
                        <span className="text-xs text-[var(--text-muted)] px-2 py-1 rounded bg-[var(--muted)]">
                          {file.language}
                        </span>
                        <button
                          onClick={() => handleRemoveCodeFile(file.id)}
                          className="p-2 rounded-lg text-[var(--text-muted)] hover:text-red-500 hover:bg-[var(--muted)] transition-colors"
                        >
                          <Icons.x className="w-4 h-4" />
                        </button>
                      </div>
                      <textarea
                        value={file.content}
                        onChange={(e) => handleUpdateCodeFile(file.id, { content: e.target.value })}
                        placeholder="Paste your code here..."
                        className="w-full p-3 rounded-xl bg-[var(--muted)] border border-[var(--border-color)] text-[var(--foreground)] placeholder:text-[var(--text-muted)] focus:border-[#4ECDC4] focus:outline-none resize-none font-mono text-sm"
                        rows={10}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* CHAIN TAB */}
        {/* ================================================================== */}
        {activeTab === 'chain' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[var(--foreground)]">Prompt Chain</h2>
                <p className="text-[var(--text-secondary)]">
                  {showHelp ? 'Break big tasks into smaller steps for better results' : 'Build multi-step workflows'}
                </p>
              </div>
              <div className="flex gap-3">
                {promptChain.length > 0 && (
                  <button
                    onClick={handleCopyChain}
                    className="px-4 py-2 rounded-xl border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[#4ECDC4] hover:border-[#4ECDC4] transition-colors flex items-center gap-2"
                  >
                    <Icons.copy className="w-4 h-4" />
                    Copy All
                  </button>
                )}
                <button
                  onClick={handleAddChainStep}
                  className="px-4 py-2 rounded-xl bg-[#4ECDC4] text-[#0a1929] font-medium hover:bg-[#3dbdb5] transition-colors flex items-center gap-2"
                >
                  <Icons.plus className="w-4 h-4" />
                  Add Step
                </button>
              </div>
            </div>

            {showHelp && (
              <div className="p-4 rounded-xl bg-gradient-to-br from-[#4ECDC4]/10 to-[#3EB489]/10 border border-[#4ECDC4]/30">
                <h4 className="font-medium text-[var(--foreground)] mb-2">💡 What's a prompt chain?</h4>
                <p className="text-sm text-[var(--text-secondary)] mb-2">
                  Instead of asking Claude to do everything at once, break it into steps:
                </p>
                <ol className="text-sm text-[var(--text-secondary)] space-y-1 list-decimal list-inside">
                  <li>Step 1: "Design the database schema"</li>
                  <li>Step 2: "Create the API endpoints"</li>
                  <li>Step 3: "Build the frontend"</li>
                  <li>Step 4: "Add tests"</li>
                </ol>
              </div>
            )}

            {promptChain.length === 0 ? (
              <div className="p-8 rounded-2xl border-2 border-dashed border-[var(--border-color)] text-center">
                <div className="text-4xl mb-4">🔗</div>
                <p className="text-[var(--foreground)] font-medium mb-2">No steps yet</p>
                <p className="text-[var(--text-muted)] mb-4">
                  Create a chain of prompts for complex, multi-step tasks
                </p>
                <button
                  onClick={handleAddChainStep}
                  className="px-4 py-2 rounded-xl bg-[var(--muted)] text-[var(--text-secondary)] hover:text-[#4ECDC4] transition-colors"
                >
                  Create First Step
                </button>
              </div>
            ) : (
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Steps List */}
                <div className="space-y-3">
                  {promptChain.sort((a, b) => a.order - b.order).map((step, i) => (
                    <button
                      key={step.id}
                      onClick={() => setActiveChainStep(step.id)}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                        activeChainStep === step.id
                          ? 'border-[#4ECDC4] bg-[rgba(78,205,196,0.1)]'
                          : 'border-[var(--border-color)] hover:border-[#4ECDC4]/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-[#4ECDC4] text-[#0a1929] flex items-center justify-center font-bold text-sm">
                          {i + 1}
                        </span>
                        <span className="font-medium text-[var(--foreground)]">{step.name}</span>
                      </div>
                      {step.prompt && (
                        <p className="text-xs text-[var(--text-muted)] mt-2 line-clamp-2 ml-11">
                          {step.prompt.substring(0, 100)}...
                        </p>
                      )}
                    </button>
                  ))}
                </div>

                {/* Active Step Editor */}
                <div className="lg:col-span-2">
                  {activeChainStep ? (
                    <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border-color)]">
                      {(() => {
                        const step = promptChain.find(s => s.id === activeChainStep);
                        if (!step) return null;
                        return (
                          <>
                            <div className="flex items-center justify-between mb-4">
                              <input
                                type="text"
                                value={step.name}
                                onChange={(e) => handleUpdateChainStep(step.id, { name: e.target.value })}
                                className="text-lg font-semibold bg-transparent text-[var(--foreground)] border-none focus:outline-none"
                                placeholder="Step name..."
                              />
                              <button
                                onClick={() => handleRemoveChainStep(step.id)}
                                className="p-2 rounded-lg text-[var(--text-muted)] hover:text-red-500 hover:bg-[var(--muted)] transition-colors"
                              >
                                <Icons.x className="w-4 h-4" />
                              </button>
                            </div>
                            <textarea
                              value={step.prompt}
                              onChange={(e) => handleUpdateChainStep(step.id, { prompt: e.target.value })}
                              placeholder="Write the prompt for this step..."
                              className="w-full p-4 rounded-xl bg-[var(--muted)] border border-[var(--border-color)] text-[var(--foreground)] placeholder:text-[var(--text-muted)] focus:border-[#4ECDC4] focus:outline-none resize-none font-mono text-sm"
                              rows={15}
                            />
                          </>
                        );
                      })()}
                    </div>
                  ) : (
                    <div className="p-8 rounded-2xl bg-[var(--card)] border border-[var(--border-color)] text-center">
                      <p className="text-[var(--text-muted)]">
                        Select a step to edit
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================================================================== */}
        {/* TEMPLATES TAB */}
        {/* ================================================================== */}
        {activeTab === 'templates' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-[var(--foreground)]">Community Templates</h2>
              <p className="text-[var(--text-secondary)]">
                {showHelp ? 'Pre-made prompts that work great - just fill in the blanks!' : 'Battle-tested prompts from the community'}
              </p>
            </div>

            {showHelp && (
              <div className="p-4 rounded-xl bg-gradient-to-br from-[#4ECDC4]/10 to-[#3EB489]/10 border border-[#4ECDC4]/30">
                <h4 className="font-medium text-[var(--foreground)] mb-2">💡 How to use templates</h4>
                <ol className="text-sm text-[var(--text-secondary)] space-y-1 list-decimal list-inside">
                  <li>Pick a template that matches what you want to build</li>
                  <li>Click "Use Template" to load it</li>
                  <li>Replace the {'{{PLACEHOLDERS}}'} with your specific details</li>
                  <li>Copy and paste into Claude!</li>
                </ol>
              </div>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {COMMUNITY_TEMPLATES.map((template) => (
                <div
                  key={template.id}
                  className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border-color)] hover:border-[#4ECDC4]/50 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-[var(--foreground)]">{template.name}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        template.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-500' :
                        template.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-500' :
                        'bg-red-500/20 text-red-500'
                      }`}>
                        {template.difficulty}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-500 text-sm">
                      ⭐ {template.rating}
                    </div>
                  </div>

                  <p className="text-sm text-[var(--text-muted)] mb-3">
                    by {template.author} · {template.uses.toLocaleString()} uses
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {template.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-xs bg-[var(--muted)] text-[var(--text-secondary)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <pre className="p-3 rounded-lg bg-[var(--muted)] text-xs text-[var(--foreground)] whitespace-pre-wrap font-mono max-h-32 overflow-auto mb-4">
                    {template.prompt.substring(0, 300)}...
                  </pre>

                  <button
                    onClick={() => handleUseTemplate(template.prompt)}
                    className="w-full py-2 rounded-lg bg-[#4ECDC4] text-[#0a1929] text-sm font-medium hover:bg-[#3dbdb5] transition-colors"
                  >
                    Use Template
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* HISTORY TAB */}
        {/* ================================================================== */}
        {activeTab === 'history' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-[var(--foreground)]">Your Saved Prompts</h2>
              <p className="text-[var(--text-secondary)]">
                {showHelp ? 'Prompts you\'ve saved for later use' : 'Your prompt library'}
              </p>
            </div>

            {savedPrompts.length === 0 ? (
              <div className="p-8 rounded-2xl border-2 border-dashed border-[var(--border-color)] text-center">
                <div className="text-4xl mb-4">📚</div>
                <p className="text-[var(--foreground)] font-medium mb-2">No saved prompts yet</p>
                <p className="text-[var(--text-muted)]">
                  Build a prompt and click "Save" to add it here
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Favorites */}
                {savedPrompts.filter(p => p.isFavorite).length > 0 && (
                  <div>
                    <h3 className="font-semibold text-[var(--foreground)] mb-3 flex items-center gap-2">
                      ⭐ Favorites
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {savedPrompts.filter(p => p.isFavorite).map((prompt) => (
                        <div key={prompt.id} className="p-4 rounded-xl bg-[var(--card)] border border-[#4ECDC4]/30">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium text-[var(--foreground)]">{prompt.name}</h4>
                            <div className="flex items-center gap-1">
                              <button onClick={() => handleToggleFavorite(prompt.id)} className="p-1 text-yellow-500">⭐</button>
                              <button onClick={() => handleDeletePrompt(prompt.id)} className="p-1 text-[var(--text-muted)] hover:text-red-500">
                                <Icons.x className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          <p className="text-xs text-[var(--text-muted)] mb-2">{new Date(prompt.createdAt).toLocaleDateString()}</p>
                          <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-3">{prompt.prompt.substring(0, 150)}...</p>
                          <button onClick={() => handleLoadPrompt(prompt)} className="text-sm text-[#4ECDC4] hover:underline">Load Prompt →</button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* All Prompts */}
                <div>
                  <h3 className="font-semibold text-[var(--foreground)] mb-3">All Saved ({savedPrompts.length})</h3>
                  <div className="space-y-2">
                    {savedPrompts.map((prompt) => (
                      <div key={prompt.id} className="p-4 rounded-xl bg-[var(--card)] border border-[var(--border-color)] flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-[var(--foreground)]">{prompt.name}</h4>
                            {prompt.isFavorite && <span className="text-yellow-500">⭐</span>}
                          </div>
                          <p className="text-xs text-[var(--text-muted)]">{new Date(prompt.createdAt).toLocaleDateString()} · {prompt.taskType}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleToggleFavorite(prompt.id)}
                            className={`p-2 rounded-lg transition-colors ${prompt.isFavorite ? 'text-yellow-500' : 'text-[var(--text-muted)] hover:text-yellow-500'}`}
                          >
                            {prompt.isFavorite ? '⭐' : '☆'}
                          </button>
                          <button onClick={() => handleLoadPrompt(prompt)} className="px-3 py-1 rounded-lg bg-[var(--muted)] text-[var(--text-secondary)] hover:text-[#4ECDC4] text-sm">Load</button>
                          <button onClick={() => handleDeletePrompt(prompt.id)} className="p-2 rounded-lg text-[var(--text-muted)] hover:text-red-500 hover:bg-[var(--muted)]">
                            <Icons.x className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================================================================== */}
        {/* TIPS TAB */}
        {/* ================================================================== */}
        {activeTab === 'tips' && (
          <div className="space-y-8">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">Pro Tips for Better Prompts</h2>
              <p className="text-[var(--text-secondary)]">
                {showHelp ? 'Learn these tips to get amazing results from Claude every time!' : 'Master these techniques for better results.'}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {BEST_PRACTICES.map((practice, i) => (
                <div key={i} className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border-color)] hover:border-[#4ECDC4]/50 transition-colors">
                  <div className="text-3xl mb-3">{practice.icon}</div>
                  <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">{practice.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)]">{practice.tip}</p>
                </div>
              ))}
            </div>

            {/* XML Tags Reference */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#4ECDC4]/10 to-[#3EB489]/10 border border-[#4ECDC4]/30">
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">🏷️ XML Tags Cheat Sheet</h3>
              <p className="text-sm text-[var(--text-secondary)] mb-4">
                Claude works best when you organize your prompts with these tags:
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                {XML_TAGS.map((tag) => (
                  <div key={tag.id} className="flex items-center gap-3 p-3 rounded-lg bg-[var(--background)]" style={{ borderLeft: `3px solid ${tag.color}` }}>
                    <div>
                      <code className="text-sm font-mono" style={{ color: tag.color }}>&lt;{tag.id}&gt;</code>
                      <p className="text-xs text-[var(--text-muted)]">{tag.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Common Mistakes for Beginners */}
            {showHelp && (
              <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border-color)]">
                <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">❌ Common Mistakes to Avoid</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { bad: '"Make me a website"', good: '"Create a React landing page with a hero section, features grid, and contact form using Tailwind CSS"', reason: 'Too vague' },
                    { bad: '"Fix my code"', good: '"Fix this function - it should return the sum but returns undefined. Here\'s the code: [code]"', reason: 'No context' },
                    { bad: '"Make it better"', good: '"Refactor this function to use async/await instead of callbacks, and add error handling"', reason: 'Not specific' },
                    { bad: '"Help"', good: '"I\'m getting a TypeError when calling this function. Here\'s the error and my code: [details]"', reason: 'Need details' },
                  ].map((example, i) => (
                    <div key={i} className="p-4 rounded-xl bg-[var(--muted)]">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-red-500">❌</span>
                        <span className="text-sm text-[var(--text-muted)]">{example.reason}</span>
                      </div>
                      <p className="text-sm text-red-400 font-mono mb-2">{example.bad}</p>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-green-500">✓</span>
                        <span className="text-sm text-[var(--text-muted)]">Better</span>
                      </div>
                      <p className="text-sm text-green-400 font-mono">{example.good}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-[var(--border-color)] py-8 mt-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-[var(--text-muted)]">
            <span className="text-[#4ECDC4] font-semibold">PromptForge</span>
            <span>•</span>
            <span>Making prompt engineering easy for everyone</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-[var(--text-muted)]">
            <Link href="/" className="hover:text-[var(--foreground)] transition-colors">Home</Link>
            <Link href="/prompts-101" className="hover:text-[var(--foreground)] transition-colors">Prompts 101</Link>
            <Link href="/playground" className="hover:text-[var(--foreground)] transition-colors">Playground</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
