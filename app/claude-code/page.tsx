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
// CONSTANTS & DATA
// ============================================================================

// Claude Code specific task types
const CLAUDE_CODE_TASKS = [
  {
    id: 'build-app',
    label: 'Build an App',
    icon: '🚀',
    description: 'Create a full application from scratch',
    examples: ['Build a todo app with React', 'Create a CLI tool in Python', 'Build a REST API with Node.js'],
  },
  {
    id: 'add-feature',
    label: 'Add Feature',
    icon: '✨',
    description: 'Add new functionality to existing code',
    examples: ['Add authentication', 'Add dark mode', 'Add search functionality'],
  },
  {
    id: 'fix-bug',
    label: 'Fix Bug',
    icon: '🐛',
    description: 'Debug and fix issues in code',
    examples: ['Fix failing tests', 'Fix performance issue', 'Fix type errors'],
  },
  {
    id: 'refactor',
    label: 'Refactor',
    icon: '♻️',
    description: 'Improve code structure and quality',
    examples: ['Split into smaller functions', 'Add TypeScript types', 'Improve performance'],
  },
  {
    id: 'explain',
    label: 'Explain Code',
    icon: '📖',
    description: 'Understand how code works',
    examples: ['Explain this function', 'What does this regex do', 'How does this algorithm work'],
  },
  {
    id: 'write-tests',
    label: 'Write Tests',
    icon: '🧪',
    description: 'Create tests for your code',
    examples: ['Write unit tests', 'Add integration tests', 'Test edge cases'],
  },
];

// Tech stack options
const TECH_STACKS = [
  { id: 'react', label: 'React', icon: '⚛️' },
  { id: 'nextjs', label: 'Next.js', icon: '▲' },
  { id: 'vue', label: 'Vue', icon: '💚' },
  { id: 'svelte', label: 'Svelte', icon: '🔥' },
  { id: 'python', label: 'Python', icon: '🐍' },
  { id: 'node', label: 'Node.js', icon: '💚' },
  { id: 'typescript', label: 'TypeScript', icon: '📘' },
  { id: 'rust', label: 'Rust', icon: '🦀' },
  { id: 'go', label: 'Go', icon: '🔵' },
  { id: 'java', label: 'Java', icon: '☕' },
  { id: 'csharp', label: 'C#', icon: '💜' },
  { id: 'other', label: 'Other', icon: '📦' },
];

// Output preferences
const OUTPUT_PREFS = [
  { id: 'code-only', label: 'Code Only', desc: 'Just the code, minimal commentary' },
  { id: 'explained', label: 'Explained', desc: 'Code with inline comments and explanations' },
  { id: 'step-by-step', label: 'Step-by-Step', desc: 'Break down into sequential steps' },
  { id: 'diff', label: 'Diff Format', desc: 'Show changes in diff format' },
];

// Available XML tags for custom builder
const XML_TAGS = [
  { id: 'task', label: 'Task', desc: 'Main objective', color: '#4ECDC4' },
  { id: 'context', label: 'Context', desc: 'Background info', color: '#3EB489' },
  { id: 'requirements', label: 'Requirements', desc: 'Must-have criteria', color: '#F59E0B' },
  { id: 'constraints', label: 'Constraints', desc: 'Limitations', color: '#EF4444' },
  { id: 'code', label: 'Code', desc: 'Code snippets', color: '#8B5CF6' },
  { id: 'examples', label: 'Examples', desc: 'Sample output', color: '#EC4899' },
  { id: 'tech-stack', label: 'Tech Stack', desc: 'Technologies', color: '#06B6D4' },
  { id: 'output-instructions', label: 'Output', desc: 'Format instructions', color: '#10B981' },
  { id: 'files', label: 'Files', desc: 'File references', color: '#6366F1' },
  { id: 'step', label: 'Step', desc: 'Workflow step', color: '#F97316' },
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
    id: 'api-microservice',
    name: 'REST API Microservice',
    author: 'BackendPro',
    rating: 4.8,
    uses: 1923,
    tags: ['Node.js', 'Express', 'PostgreSQL'],
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
    id: 'data-pipeline',
    name: 'Data Pipeline',
    author: 'DataEngineer',
    rating: 4.5,
    uses: 987,
    tags: ['Python', 'Pandas', 'Airflow'],
    prompt: `<task>
Build a data processing pipeline
</task>

<data-sources>
{{DESCRIBE YOUR DATA SOURCES}}
</data-sources>

<tech-stack>
- Python 3.11
- Pandas for data manipulation
- SQLAlchemy for database
- Apache Airflow for orchestration
</tech-stack>

<transformations>
{{DESCRIBE DATA TRANSFORMATIONS}}
</transformations>

<requirements>
- Error handling and retries
- Logging and monitoring
- Incremental processing
- Data validation
- Unit tests
</requirements>`,
  },
  {
    id: 'mobile-app',
    name: 'React Native App',
    author: 'MobileDev',
    rating: 4.8,
    uses: 1567,
    tags: ['React Native', 'Expo', 'TypeScript'],
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

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

// Calculate prompt quality score
function calculatePromptScore(prompt: string): PromptScore {
  const suggestions: string[] = [];
  let specificity = 0;
  let clarity = 0;
  let completeness = 0;
  let structure = 0;

  // Check for XML tags (structure)
  const xmlTags = ['<task>', '<context>', '<requirements>', '<output-instructions>'];
  const foundTags = xmlTags.filter(tag => prompt.includes(tag));
  structure = Math.min(100, (foundTags.length / xmlTags.length) * 100 + (prompt.includes('</') ? 20 : 0));
  if (foundTags.length < 2) {
    suggestions.push('Add more XML structure tags like <task>, <context>, <requirements>');
  }

  // Check for specificity
  const specificIndicators = ['specifically', 'exactly', 'must', 'should', 'required', 'include', 'exclude', 'format'];
  const foundSpecific = specificIndicators.filter(ind => prompt.toLowerCase().includes(ind));
  specificity = Math.min(100, (foundSpecific.length / specificIndicators.length) * 100 + (prompt.length > 200 ? 30 : 0));
  if (specificity < 50) {
    suggestions.push('Be more specific about what you want - use words like "must", "should", "exactly"');
  }

  // Check for clarity
  const hasTask = prompt.toLowerCase().includes('task') || prompt.includes('<task>');
  const hasOutput = prompt.toLowerCase().includes('output') || prompt.toLowerCase().includes('format');
  const hasContext = prompt.toLowerCase().includes('context') || prompt.includes('<context>');
  clarity = (hasTask ? 35 : 0) + (hasOutput ? 35 : 0) + (hasContext ? 30 : 0);
  if (!hasOutput) {
    suggestions.push('Specify the desired output format');
  }

  // Check for completeness
  const hasCodeBlock = prompt.includes('```') || prompt.includes('<code>');
  const hasTechStack = prompt.toLowerCase().includes('tech') || prompt.toLowerCase().includes('stack') ||
                       TECH_STACKS.some(t => prompt.toLowerCase().includes(t.label.toLowerCase()));
  const hasRequirements = prompt.includes('<requirements>') || prompt.toLowerCase().includes('requirements');
  completeness = (hasCodeBlock ? 25 : 0) + (hasTechStack ? 25 : 0) + (hasRequirements ? 25 : 0) +
                 (prompt.length > 300 ? 25 : prompt.length > 150 ? 15 : 5);
  if (!hasTechStack) {
    suggestions.push('Mention your tech stack or preferred technologies');
  }

  const overall = Math.round((specificity + clarity + completeness + structure) / 4);

  return {
    overall,
    specificity: Math.round(specificity),
    clarity: Math.round(clarity),
    completeness: Math.round(completeness),
    structure: Math.round(structure),
    suggestions: suggestions.slice(0, 3),
  };
}

// Generate unique ID
function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

// Detect language from file extension
function detectLanguage(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase() || '';
  const langMap: Record<string, string> = {
    js: 'javascript',
    jsx: 'javascript',
    ts: 'typescript',
    tsx: 'typescript',
    py: 'python',
    rb: 'ruby',
    go: 'go',
    rs: 'rust',
    java: 'java',
    cs: 'csharp',
    css: 'css',
    html: 'html',
    json: 'json',
    md: 'markdown',
    yaml: 'yaml',
    yml: 'yaml',
    sql: 'sql',
    sh: 'bash',
    bash: 'bash',
  };
  return langMap[ext] || 'text';
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

  // XML tag builder state
  const [customTags, setCustomTags] = useState<{id: string, content: string}[]>([]);
  const [showTagBuilder, setShowTagBuilder] = useState(false);

  // Prompt score
  const [promptScore, setPromptScore] = useState<PromptScore | null>(null);

  // ============================================================================
  // EFFECTS
  // ============================================================================

  // Load saved prompts from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('claude-code-saved-prompts');
    if (saved) {
      setSavedPrompts(JSON.parse(saved));
    }
  }, []);

  // Generate prompt whenever inputs change
  useEffect(() => {
    if (taskType && taskDescription) {
      generatePrompt();
    } else {
      setGeneratedPrompt('');
      setPromptScore(null);
    }
  }, [taskType, taskDescription, techStack, outputPref, projectContext, constraints, codeFiles, packageJson, fileTree, customTags]);

  // Calculate score when prompt changes
  useEffect(() => {
    if (generatedPrompt) {
      const score = calculatePromptScore(generatedPrompt);
      setPromptScore(score);
    }
  }, [generatedPrompt]);

  // ============================================================================
  // PROMPT GENERATION
  // ============================================================================

  const generatePrompt = useCallback(() => {
    const task = CLAUDE_CODE_TASKS.find(t => t.id === taskType);
    if (!task) return;

    const techStackStr = techStack.length > 0
      ? techStack.map(t => TECH_STACKS.find(ts => ts.id === t)?.label).join(', ')
      : '';

    const outputPrefStr = OUTPUT_PREFS.find(o => o.id === outputPref)?.label || '';

    let prompt = `<task>
${task.label}: ${taskDescription}
</task>

`;

    // Add project context
    if (projectContext) {
      prompt += `<context>
${projectContext}
</context>

`;
    }

    // Add package.json info
    if (packageJson) {
      prompt += `<project-config>
\`\`\`json
${packageJson}
\`\`\`
</project-config>

`;
    }

    // Add file tree
    if (fileTree) {
      prompt += `<file-structure>
${fileTree}
</file-structure>

`;
    }

    // Add code files
    if (codeFiles.length > 0) {
      prompt += `<files>
`;
      codeFiles.forEach(file => {
        prompt += `<file name="${file.name}" language="${file.language}">
\`\`\`${file.language}
${file.content}
\`\`\`
</file>

`;
      });
      prompt += `</files>

`;
    }

    // Add tech stack
    if (techStackStr) {
      prompt += `<tech-stack>
${techStackStr}
</tech-stack>

`;
    }

    // Add custom tags
    customTags.forEach(tag => {
      if (tag.content) {
        prompt += `<${tag.id}>
${tag.content}
</${tag.id}>

`;
      }
    });

    // Add requirements
    prompt += `<requirements>
- Output Format: ${outputPrefStr}
${constraints ? `- Constraints: ${constraints}` : ''}
- Follow best practices and modern patterns
- Include error handling where appropriate
- Write clean, maintainable code
</requirements>

<output-instructions>
${outputPref === 'code-only' ? 'Provide only the code with minimal comments. Focus on working, complete code.' :
  outputPref === 'explained' ? 'Include inline comments explaining key decisions. Add a brief summary at the end.' :
  outputPref === 'step-by-step' ? 'Break this down into numbered steps. Explain each step before showing the code.' :
  'Show changes in diff format (+/- lines). Highlight what was added/modified.'}
</output-instructions>`;

    setGeneratedPrompt(prompt);
  }, [taskType, taskDescription, techStack, outputPref, projectContext, constraints, codeFiles, packageJson, fileTree, customTags]);

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
    setCustomTags([]);
    setPromptScore(null);
  };

  const toggleTechStack = (id: string) => {
    setTechStack(prev =>
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const handleSavePrompt = () => {
    if (!generatedPrompt || !promptName) return;

    const newPrompt: SavedPrompt = {
      id: generateId(),
      name: promptName,
      prompt: generatedPrompt,
      taskType,
      createdAt: new Date().toISOString(),
      isFavorite: false,
    };

    const updated = [newPrompt, ...savedPrompts];
    setSavedPrompts(updated);
    localStorage.setItem('claude-code-saved-prompts', JSON.stringify(updated));
    setPromptName('');
  };

  const handleToggleFavorite = (id: string) => {
    const updated = savedPrompts.map(p =>
      p.id === id ? { ...p, isFavorite: !p.isFavorite } : p
    );
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
    setCodeFiles(prev => [...prev, {
      id: generateId(),
      name: 'untitled.ts',
      content: '',
      language: 'typescript',
    }]);
  };

  const handleUpdateCodeFile = (id: string, updates: Partial<CodeFile>) => {
    setCodeFiles(prev => prev.map(f => {
      if (f.id === id) {
        const updated = { ...f, ...updates };
        if (updates.name) {
          updated.language = detectLanguage(updates.name);
        }
        return updated;
      }
      return f;
    }));
  };

  const handleRemoveCodeFile = (id: string) => {
    setCodeFiles(prev => prev.filter(f => f.id !== id));
  };

  const handleAddChainStep = () => {
    const newStep: PromptChainStep = {
      id: generateId(),
      name: `Step ${promptChain.length + 1}`,
      prompt: '',
      order: promptChain.length,
    };
    setPromptChain(prev => [...prev, newStep]);
    setActiveChainStep(newStep.id);
  };

  const handleUpdateChainStep = (id: string, updates: Partial<PromptChainStep>) => {
    setPromptChain(prev => prev.map(s =>
      s.id === id ? { ...s, ...updates } : s
    ));
  };

  const handleRemoveChainStep = (id: string) => {
    setPromptChain(prev => prev.filter(s => s.id !== id));
    if (activeChainStep === id) {
      setActiveChainStep(null);
    }
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

  const handleAddCustomTag = (tagId: string) => {
    if (!customTags.find(t => t.id === tagId)) {
      setCustomTags(prev => [...prev, { id: tagId, content: '' }]);
    }
  };

  const handleUpdateCustomTag = (tagId: string, content: string) => {
    setCustomTags(prev => prev.map(t =>
      t.id === tagId ? { ...t, content } : t
    ));
  };

  const handleRemoveCustomTag = (tagId: string) => {
    setCustomTags(prev => prev.filter(t => t.id !== tagId));
  };

  const handleOpenInClaude = () => {
    // Encode prompt for URL and open claude.ai
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

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[var(--border-color)]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#4ECDC4]/10 via-transparent to-[#3EB489]/10" />
        <div className="max-w-7xl mx-auto px-6 py-10 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(78,205,196,0.15)] border border-[rgba(78,205,196,0.3)] text-[#4ECDC4] text-sm font-medium mb-4">
              <span className="text-lg">⚡</span>
              The Ultimate Claude Code Prompt Builder
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--foreground)] mb-4 leading-tight">
              Build{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4ECDC4] to-[#3EB489]">
                Perfect Prompts
              </span>
              {' '}for Claude Code
            </h1>

            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              Upload your codebase, build prompt chains, use community templates, and get AI-powered scoring.
            </p>
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
        {/* BUILDER TAB */}
        {/* ================================================================== */}
        {activeTab === 'builder' && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left: Builder Form */}
            <div className="space-y-6">
              {/* Task Type Selection */}
              <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border-color)]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-[var(--foreground)] flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#4ECDC4] text-[#0a1929] flex items-center justify-center text-xs font-bold">1</span>
                    What do you want to do?
                  </h3>
                  <button onClick={handleReset} className="text-sm text-[var(--text-muted)] hover:text-[#4ECDC4]">
                    Reset All
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {CLAUDE_CODE_TASKS.map((task) => (
                    <button
                      key={task.id}
                      onClick={() => setTaskType(task.id)}
                      className={`p-3 rounded-xl border-2 text-left transition-all ${
                        taskType === task.id
                          ? 'border-[#4ECDC4] bg-[rgba(78,205,196,0.1)]'
                          : 'border-[var(--border-color)] hover:border-[#4ECDC4]/50'
                      }`}
                    >
                      <div className="text-2xl mb-1">{task.icon}</div>
                      <div className="font-medium text-sm text-[var(--foreground)]">{task.label}</div>
                    </button>
                  ))}
                </div>

                {taskType && (
                  <div className="mt-4">
                    <label className="block text-sm text-[var(--text-secondary)] mb-2">
                      Describe what you want:
                    </label>
                    <textarea
                      value={taskDescription}
                      onChange={(e) => setTaskDescription(e.target.value)}
                      placeholder={CLAUDE_CODE_TASKS.find(t => t.id === taskType)?.examples[0] || 'Describe your task...'}
                      className="w-full p-3 rounded-xl bg-[var(--muted)] border border-[var(--border-color)] text-[var(--foreground)] placeholder:text-[var(--text-muted)] focus:border-[#4ECDC4] focus:outline-none resize-none"
                      rows={3}
                    />
                  </div>
                )}
              </div>

              {/* Tech Stack */}
              <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border-color)]">
                <h3 className="font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#3EB489] text-[#0a1929] flex items-center justify-center text-xs font-bold">2</span>
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {TECH_STACKS.map((tech) => (
                    <button
                      key={tech.id}
                      onClick={() => toggleTechStack(tech.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all ${
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

              {/* Output Preference */}
              <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border-color)]">
                <h3 className="font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#5ED4CB] text-[#0a1929] flex items-center justify-center text-xs font-bold">3</span>
                  Output Format
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {OUTPUT_PREFS.map((pref) => (
                    <button
                      key={pref.id}
                      onClick={() => setOutputPref(pref.id)}
                      className={`p-3 rounded-xl border-2 text-left transition-all ${
                        outputPref === pref.id
                          ? 'border-[#4ECDC4] bg-[rgba(78,205,196,0.1)]'
                          : 'border-[var(--border-color)] hover:border-[#4ECDC4]/50'
                      }`}
                    >
                      <div className="font-medium text-sm text-[var(--foreground)]">{pref.label}</div>
                      <div className="text-xs text-[var(--text-muted)]">{pref.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* XML Tag Builder */}
              <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border-color)]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-[var(--foreground)] flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#F59E0B] text-[#0a1929] flex items-center justify-center text-xs font-bold">4</span>
                    Custom Sections
                  </h3>
                  <button
                    onClick={() => setShowTagBuilder(!showTagBuilder)}
                    className="text-sm text-[#4ECDC4] hover:underline"
                  >
                    {showTagBuilder ? 'Hide Tags' : 'Add Tags'}
                  </button>
                </div>

                {showTagBuilder && (
                  <div className="mb-4 flex flex-wrap gap-2">
                    {XML_TAGS.filter(t => !customTags.find(ct => ct.id === t.id)).map((tag) => (
                      <button
                        key={tag.id}
                        onClick={() => handleAddCustomTag(tag.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all bg-[var(--muted)] text-[var(--text-secondary)] hover:bg-[var(--card)]"
                        style={{ borderLeft: `3px solid ${tag.color}` }}
                      >
                        <span>{tag.label}</span>
                        <span className="text-[var(--text-muted)]">+</span>
                      </button>
                    ))}
                  </div>
                )}

                {customTags.length > 0 && (
                  <div className="space-y-3">
                    {customTags.map((tag) => {
                      const tagInfo = XML_TAGS.find(t => t.id === tag.id);
                      return (
                        <div key={tag.id} className="relative">
                          <div className="flex items-center justify-between mb-1">
                            <label className="text-sm font-medium text-[var(--text-secondary)]" style={{ color: tagInfo?.color }}>
                              &lt;{tag.id}&gt;
                            </label>
                            <button
                              onClick={() => handleRemoveCustomTag(tag.id)}
                              className="text-xs text-[var(--text-muted)] hover:text-red-500"
                            >
                              Remove
                            </button>
                          </div>
                          <textarea
                            value={tag.content}
                            onChange={(e) => handleUpdateCustomTag(tag.id, e.target.value)}
                            placeholder={tagInfo?.desc || `Content for ${tag.id}...`}
                            className="w-full p-3 rounded-xl bg-[var(--muted)] border border-[var(--border-color)] text-[var(--foreground)] placeholder:text-[var(--text-muted)] focus:border-[#4ECDC4] focus:outline-none resize-none text-sm"
                            rows={2}
                          />
                        </div>
                      );
                    })}
                  </div>
                )}

                {customTags.length === 0 && !showTagBuilder && (
                  <p className="text-sm text-[var(--text-muted)]">
                    Add custom XML sections to structure your prompt
                  </p>
                )}
              </div>

              {/* Project Context */}
              <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border-color)]">
                <h3 className="font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#6366F1] text-white flex items-center justify-center text-xs font-bold">5</span>
                  Context & Constraints
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-[var(--text-secondary)] mb-2">
                      Project Context
                    </label>
                    <textarea
                      value={projectContext}
                      onChange={(e) => setProjectContext(e.target.value)}
                      placeholder="Describe your project, codebase structure, conventions..."
                      className="w-full p-3 rounded-xl bg-[var(--muted)] border border-[var(--border-color)] text-[var(--foreground)] placeholder:text-[var(--text-muted)] focus:border-[#4ECDC4] focus:outline-none resize-none"
                      rows={2}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[var(--text-secondary)] mb-2">
                      Constraints
                    </label>
                    <input
                      type="text"
                      value={constraints}
                      onChange={(e) => setConstraints(e.target.value)}
                      placeholder="e.g., No external dependencies, Must use TypeScript..."
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
                    <h3 className="font-semibold text-[var(--foreground)]">Prompt Score</h3>
                    <div className={`text-2xl font-bold ${
                      promptScore.overall >= 80 ? 'text-green-500' :
                      promptScore.overall >= 60 ? 'text-yellow-500' :
                      'text-red-500'
                    }`}>
                      {promptScore.overall}/100
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-2 mb-3">
                    {[
                      { label: 'Specific', value: promptScore.specificity },
                      { label: 'Clear', value: promptScore.clarity },
                      { label: 'Complete', value: promptScore.completeness },
                      { label: 'Structure', value: promptScore.structure },
                    ].map((item) => (
                      <div key={item.label} className="text-center">
                        <div className="text-xs text-[var(--text-muted)]">{item.label}</div>
                        <div className="h-2 bg-[var(--muted)] rounded-full mt-1">
                          <div
                            className={`h-full rounded-full ${
                              item.value >= 70 ? 'bg-green-500' :
                              item.value >= 40 ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`}
                            style={{ width: `${item.value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  {promptScore.suggestions.length > 0 && (
                    <div className="space-y-1">
                      {promptScore.suggestions.map((suggestion, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-[var(--text-muted)]">
                          <span className="text-yellow-500">💡</span>
                          {suggestion}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Preview Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-[var(--foreground)]">Generated Prompt</h2>
                <span className="text-xs text-[var(--text-muted)] px-2 py-1 rounded-lg bg-[var(--muted)]">
                  {generatedPrompt.length} chars · ~{Math.ceil(generatedPrompt.length / 4)} tokens
                </span>
              </div>

              {/* Preview Content */}
              <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border-color)] max-h-[500px] overflow-auto">
                {generatedPrompt ? (
                  <pre className="whitespace-pre-wrap text-sm text-[var(--foreground)] font-mono leading-relaxed">
                    {generatedPrompt}
                  </pre>
                ) : (
                  <div className="flex flex-col items-center justify-center h-48 text-center">
                    <div className="text-4xl mb-4">⚡</div>
                    <p className="text-[var(--text-muted)]">
                      Select a task type and describe what you want
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
                          Copy
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
                      placeholder="Name this prompt..."
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
                <h2 className="text-2xl font-bold text-[var(--foreground)]">Code Files & Context</h2>
                <p className="text-[var(--text-secondary)]">
                  Upload your codebase files to include them in your prompt
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

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Package.json */}
              <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border-color)]">
                <h3 className="font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
                  📦 package.json
                </h3>
                <textarea
                  value={packageJson}
                  onChange={(e) => setPackageJson(e.target.value)}
                  placeholder='Paste your package.json here to include project dependencies...'
                  className="w-full p-3 rounded-xl bg-[var(--muted)] border border-[var(--border-color)] text-[var(--foreground)] placeholder:text-[var(--text-muted)] focus:border-[#4ECDC4] focus:outline-none resize-none font-mono text-sm"
                  rows={8}
                />
              </div>

              {/* File Tree */}
              <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border-color)]">
                <h3 className="font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
                  🌳 File Structure
                </h3>
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
                  <p className="text-[var(--text-muted)] mb-4">
                    No files added yet. Add files to include them in your prompt context.
                  </p>
                  <button
                    onClick={handleAddCodeFile}
                    className="px-4 py-2 rounded-xl bg-[var(--muted)] text-[var(--text-secondary)] hover:text-[#4ECDC4] transition-colors"
                  >
                    Add First File
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
                  Build multi-step workflows for complex tasks
                </p>
              </div>
              <div className="flex gap-3">
                {promptChain.length > 0 && (
                  <button
                    onClick={handleCopyChain}
                    className="px-4 py-2 rounded-xl border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[#4ECDC4] hover:border-[#4ECDC4] transition-colors flex items-center gap-2"
                  >
                    <Icons.copy className="w-4 h-4" />
                    Copy Chain
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

            {promptChain.length === 0 ? (
              <div className="p-8 rounded-2xl border-2 border-dashed border-[var(--border-color)] text-center">
                <div className="text-4xl mb-4">🔗</div>
                <p className="text-[var(--text-muted)] mb-4">
                  Create a prompt chain for multi-step workflows like: Design → Build → Test → Deploy
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
                Battle-tested prompts from the community
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {COMMUNITY_TEMPLATES.map((template) => (
                <div
                  key={template.id}
                  className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border-color)] hover:border-[#4ECDC4]/50 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-[var(--foreground)]">{template.name}</h3>
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
              <h2 className="text-2xl font-bold text-[var(--foreground)]">Saved Prompts</h2>
              <p className="text-[var(--text-secondary)]">
                Your saved and favorite prompts
              </p>
            </div>

            {savedPrompts.length === 0 ? (
              <div className="p-8 rounded-2xl border-2 border-dashed border-[var(--border-color)] text-center">
                <div className="text-4xl mb-4">📚</div>
                <p className="text-[var(--text-muted)]">
                  No saved prompts yet. Build a prompt and save it to see it here.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Favorites Section */}
                {savedPrompts.filter(p => p.isFavorite).length > 0 && (
                  <div>
                    <h3 className="font-semibold text-[var(--foreground)] mb-3 flex items-center gap-2">
                      ⭐ Favorites
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {savedPrompts.filter(p => p.isFavorite).map((prompt) => (
                        <div
                          key={prompt.id}
                          className="p-4 rounded-xl bg-[var(--card)] border border-[#4ECDC4]/30"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium text-[var(--foreground)]">{prompt.name}</h4>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleToggleFavorite(prompt.id)}
                                className="p-1 text-yellow-500"
                              >
                                ⭐
                              </button>
                              <button
                                onClick={() => handleDeletePrompt(prompt.id)}
                                className="p-1 text-[var(--text-muted)] hover:text-red-500"
                              >
                                <Icons.x className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          <p className="text-xs text-[var(--text-muted)] mb-2">
                            {new Date(prompt.createdAt).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-3">
                            {prompt.prompt.substring(0, 150)}...
                          </p>
                          <button
                            onClick={() => handleLoadPrompt(prompt)}
                            className="text-sm text-[#4ECDC4] hover:underline"
                          >
                            Load Prompt →
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* All Prompts */}
                <div>
                  <h3 className="font-semibold text-[var(--foreground)] mb-3">
                    All Saved ({savedPrompts.length})
                  </h3>
                  <div className="space-y-2">
                    {savedPrompts.map((prompt) => (
                      <div
                        key={prompt.id}
                        className="p-4 rounded-xl bg-[var(--card)] border border-[var(--border-color)] flex items-center justify-between"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-[var(--foreground)]">{prompt.name}</h4>
                            {prompt.isFavorite && <span className="text-yellow-500">⭐</span>}
                          </div>
                          <p className="text-xs text-[var(--text-muted)]">
                            {new Date(prompt.createdAt).toLocaleDateString()} · {prompt.taskType}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleToggleFavorite(prompt.id)}
                            className={`p-2 rounded-lg transition-colors ${
                              prompt.isFavorite
                                ? 'text-yellow-500'
                                : 'text-[var(--text-muted)] hover:text-yellow-500'
                            }`}
                          >
                            {prompt.isFavorite ? '⭐' : '☆'}
                          </button>
                          <button
                            onClick={() => handleLoadPrompt(prompt)}
                            className="px-3 py-1 rounded-lg bg-[var(--muted)] text-[var(--text-secondary)] hover:text-[#4ECDC4] text-sm"
                          >
                            Load
                          </button>
                          <button
                            onClick={() => handleDeletePrompt(prompt.id)}
                            className="p-2 rounded-lg text-[var(--text-muted)] hover:text-red-500 hover:bg-[var(--muted)]"
                          >
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
              <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">
                Pro Tips for Claude Code
              </h2>
              <p className="text-[var(--text-secondary)]">
                Master these techniques to get better results every time.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {BEST_PRACTICES.map((practice, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border-color)] hover:border-[#4ECDC4]/50 transition-colors"
                >
                  <div className="text-3xl mb-3">{practice.icon}</div>
                  <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">
                    {practice.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)]">{practice.tip}</p>
                </div>
              ))}
            </div>

            {/* XML Tags Reference */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#4ECDC4]/10 to-[#3EB489]/10 border border-[#4ECDC4]/30">
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
                🏷️ XML Tags Reference
              </h3>
              <p className="text-sm text-[var(--text-secondary)] mb-4">
                Claude Code responds particularly well to these XML-style tags:
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                {XML_TAGS.map((tag) => (
                  <div
                    key={tag.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-[var(--background)]"
                    style={{ borderLeft: `3px solid ${tag.color}` }}
                  >
                    <div>
                      <code className="text-sm font-mono" style={{ color: tag.color }}>
                        &lt;{tag.id}&gt;
                      </code>
                      <p className="text-xs text-[var(--text-muted)]">{tag.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-[var(--border-color)] py-8 mt-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-[var(--text-muted)]">
            <span className="text-[#4ECDC4] font-semibold">PromptForge</span>
            <span>•</span>
            <span>Claude Code Prompt Builder</span>
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
