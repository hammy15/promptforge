'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Icons } from '../components/Icons';
import { ThemeToggle } from '../components/ThemeToggle';

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
  { id: 'python', label: 'Python', icon: '🐍' },
  { id: 'node', label: 'Node.js', icon: '💚' },
  { id: 'typescript', label: 'TypeScript', icon: '📘' },
  { id: 'rust', label: 'Rust', icon: '🦀' },
  { id: 'go', label: 'Go', icon: '🔵' },
  { id: 'other', label: 'Other', icon: '📦' },
];

// Output preferences
const OUTPUT_PREFS = [
  { id: 'code-only', label: 'Code Only', desc: 'Just the code, minimal commentary' },
  { id: 'explained', label: 'Explained', desc: 'Code with inline comments and explanations' },
  { id: 'step-by-step', label: 'Step-by-Step', desc: 'Break down into sequential steps' },
  { id: 'diff', label: 'Diff Format', desc: 'Show changes in diff format' },
];

// Context templates for different scenarios
const CONTEXT_TEMPLATES = {
  'build-app': `## Project Overview
I want to build {{app_name}}.

## Requirements
{{requirements}}

## Tech Stack
{{tech_stack}}

## Key Features
{{features}}`,
  'add-feature': `## Existing Codebase
{{codebase_description}}

## New Feature
{{feature_description}}

## Requirements
{{requirements}}

## Constraints
{{constraints}}`,
  'fix-bug': `## Bug Description
{{bug_description}}

## Expected Behavior
{{expected_behavior}}

## Actual Behavior
{{actual_behavior}}

## Steps to Reproduce
{{steps}}

## Relevant Code
{{code_context}}`,
  'refactor': `## Current Code
{{current_code}}

## Issues
{{issues}}

## Goals
{{goals}}

## Constraints
{{constraints}}`,
  'explain': `## Code to Explain
{{code}}

## Questions
{{questions}}

## My Understanding So Far
{{current_understanding}}`,
  'write-tests': `## Code to Test
{{code}}

## Test Requirements
{{requirements}}

## Edge Cases to Consider
{{edge_cases}}`,
};

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

export default function ClaudeCodePage() {
  // State
  const [taskType, setTaskType] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [techStack, setTechStack] = useState<string[]>([]);
  const [outputPref, setOutputPref] = useState('explained');
  const [projectContext, setProjectContext] = useState('');
  const [constraints, setConstraints] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'builder' | 'templates' | 'tips'>('builder');

  // Generate prompt whenever inputs change
  useEffect(() => {
    if (taskType && taskDescription) {
      generatePrompt();
    } else {
      setGeneratedPrompt('');
    }
  }, [taskType, taskDescription, techStack, outputPref, projectContext, constraints]);

  const generatePrompt = () => {
    const task = CLAUDE_CODE_TASKS.find(t => t.id === taskType);
    if (!task) return;

    const techStackStr = techStack.length > 0
      ? `Tech Stack: ${techStack.map(t => TECH_STACKS.find(ts => ts.id === t)?.label).join(', ')}`
      : '';

    const outputPrefStr = OUTPUT_PREFS.find(o => o.id === outputPref)?.label || '';

    let prompt = `<task>
${task.label}: ${taskDescription}
</task>

`;

    if (projectContext) {
      prompt += `<context>
${projectContext}
</context>

`;
    }

    if (techStackStr) {
      prompt += `<tech-stack>
${techStackStr}
</tech-stack>

`;
    }

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
  };

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
  };

  const toggleTechStack = (id: string) => {
    setTechStack(prev =>
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  // Pre-built templates for common Claude Code tasks
  const templates = [
    {
      name: 'Full-Stack App Starter',
      desc: 'Create a complete full-stack application',
      prompt: `<task>
Build a full-stack web application
</task>

<requirements>
- Framework: Next.js 14 with App Router
- Styling: Tailwind CSS
- Database: Supabase (Postgres)
- Auth: Supabase Auth
- TypeScript throughout
- Mobile-responsive design
</requirements>

<features>
{{DESCRIBE YOUR APP FEATURES HERE}}
</features>

<output-instructions>
1. Start with the project structure
2. Create each file with complete, working code
3. Include setup instructions
4. Add comments for complex logic
</output-instructions>`,
    },
    {
      name: 'API Endpoint Builder',
      desc: 'Create REST API endpoints',
      prompt: `<task>
Create REST API endpoints
</task>

<context>
{{DESCRIBE YOUR API REQUIREMENTS}}
</context>

<requirements>
- RESTful design
- Input validation
- Error handling
- TypeScript types
- Unit tests
</requirements>

<endpoints>
{{LIST YOUR ENDPOINTS}}
- GET /api/items - List all items
- POST /api/items - Create new item
- GET /api/items/:id - Get single item
- PUT /api/items/:id - Update item
- DELETE /api/items/:id - Delete item
</endpoints>`,
    },
    {
      name: 'Bug Fix Template',
      desc: 'Structured approach to fixing bugs',
      prompt: `<task>
Fix Bug
</task>

<bug-description>
{{DESCRIBE THE BUG}}
</bug-description>

<expected-behavior>
{{WHAT SHOULD HAPPEN}}
</expected-behavior>

<actual-behavior>
{{WHAT ACTUALLY HAPPENS}}
</actual-behavior>

<steps-to-reproduce>
{{HOW TO TRIGGER THE BUG}}
</steps-to-reproduce>

<relevant-code>
{{PASTE THE RELEVANT CODE HERE}}
</relevant-code>

<output-instructions>
1. Identify the root cause
2. Explain why the bug occurs
3. Show the fix with diff format
4. Add tests to prevent regression
</output-instructions>`,
    },
    {
      name: 'Code Review Request',
      desc: 'Get your code reviewed and improved',
      prompt: `<task>
Review and improve this code
</task>

<code>
{{PASTE YOUR CODE HERE}}
</code>

<review-criteria>
- Code quality and readability
- Performance optimizations
- Security vulnerabilities
- Best practices adherence
- Error handling
- Type safety
</review-criteria>

<output-instructions>
1. List issues found (prioritized)
2. Show improved version of the code
3. Explain each change
4. Suggest additional improvements
</output-instructions>`,
    },
  ];

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
              <Link href="/claude-code" className="px-4 py-2 text-[#4ECDC4] font-medium rounded-lg bg-[rgba(78,205,196,0.1)]">
                🚀 Claude Code
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
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(78,205,196,0.15)] border border-[rgba(78,205,196,0.3)] text-[#4ECDC4] text-sm font-medium mb-4">
              <span className="text-lg">⚡</span>
              Built for Claude Code Power Users
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--foreground)] mb-4 leading-tight">
              Claude Code{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4ECDC4] to-[#3EB489]">
                Prompt Builder
              </span>
            </h1>

            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              Build optimized prompts for Claude Code that get you from idea to working code faster than any other tool.
            </p>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <div className="flex gap-2 border-b border-[var(--border-color)] pb-4">
          {[
            { id: 'builder', label: 'Prompt Builder', icon: '🔨' },
            { id: 'templates', label: 'Ready-to-Use Templates', icon: '📋' },
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
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* BUILDER TAB */}
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
                    Reset
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
                      Describe what you want to {CLAUDE_CODE_TASKS.find(t => t.id === taskType)?.label.toLowerCase()}:
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
                  Tech Stack (optional)
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
                  Output Preference
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

              {/* Project Context */}
              <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border-color)]">
                <h3 className="font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#3AA89F] text-[#0a1929] flex items-center justify-center text-xs font-bold">4</span>
                  Project Context (optional)
                </h3>
                <textarea
                  value={projectContext}
                  onChange={(e) => setProjectContext(e.target.value)}
                  placeholder="Describe your project: tech stack, conventions, existing code structure..."
                  className="w-full p-3 rounded-xl bg-[var(--muted)] border border-[var(--border-color)] text-[var(--foreground)] placeholder:text-[var(--text-muted)] focus:border-[#4ECDC4] focus:outline-none resize-none"
                  rows={3}
                />
              </div>

              {/* Constraints */}
              <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border-color)]">
                <h3 className="font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[var(--text-muted)] text-[var(--background)] flex items-center justify-center text-xs font-bold">5</span>
                  Constraints (optional)
                </h3>
                <input
                  type="text"
                  value={constraints}
                  onChange={(e) => setConstraints(e.target.value)}
                  placeholder="e.g., No external dependencies, Must be TypeScript, Follow Airbnb style guide"
                  className="w-full p-3 rounded-xl bg-[var(--muted)] border border-[var(--border-color)] text-[var(--foreground)] placeholder:text-[var(--text-muted)] focus:border-[#4ECDC4] focus:outline-none"
                />
              </div>
            </div>

            {/* Right: Live Preview */}
            <div className="lg:sticky lg:top-24 lg:self-start space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-[var(--foreground)]">Generated Prompt</h2>
                <span className="text-xs text-[var(--text-muted)] px-2 py-1 rounded-lg bg-[var(--muted)]">
                  Optimized for Claude Code
                </span>
              </div>

              <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border-color)] min-h-[400px]">
                {generatedPrompt ? (
                  <pre className="whitespace-pre-wrap text-sm text-[var(--foreground)] font-mono leading-relaxed">
                    {generatedPrompt}
                  </pre>
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 text-center">
                    <div className="text-4xl mb-4">⚡</div>
                    <p className="text-[var(--text-muted)]">
                      Select a task type and describe what you want to build
                    </p>
                  </div>
                )}
              </div>

              {generatedPrompt && (
                <div className="flex gap-3">
                  <button
                    onClick={handleCopy}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#4ECDC4] to-[#3EB489] text-[#0a1929] font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    {copied ? (
                      <>
                        <Icons.check className="w-5 h-5" />
                        Copied to Clipboard!
                      </>
                    ) : (
                      <>
                        <Icons.copy className="w-5 h-5" />
                        Copy Prompt
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Quick Stats */}
              {generatedPrompt && (
                <div className="p-4 rounded-xl bg-[var(--muted)] border border-[var(--border-color)]">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[var(--text-muted)]">Characters</span>
                    <span className="font-mono text-[var(--foreground)]">{generatedPrompt.length}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-2">
                    <span className="text-[var(--text-muted)]">Est. Tokens</span>
                    <span className="font-mono text-[#4ECDC4]">~{Math.ceil(generatedPrompt.length / 4)}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TEMPLATES TAB */}
        {activeTab === 'templates' && (
          <div className="space-y-6">
            <p className="text-[var(--text-secondary)]">
              Copy these battle-tested templates and customize the placeholder values.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {templates.map((template, i) => (
                <div key={i} className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border-color)]">
                  <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">{template.name}</h3>
                  <p className="text-sm text-[var(--text-muted)] mb-4">{template.desc}</p>
                  <pre className="p-4 rounded-xl bg-[var(--muted)] text-xs text-[var(--foreground)] whitespace-pre-wrap font-mono max-h-48 overflow-auto mb-4">
                    {template.prompt}
                  </pre>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(template.prompt);
                    }}
                    className="w-full py-2 rounded-lg bg-[#4ECDC4] text-[#0a1929] text-sm font-medium hover:bg-[#3dbdb5] transition-colors"
                  >
                    Copy Template
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TIPS TAB */}
        {activeTab === 'tips' && (
          <div className="space-y-8">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">
                Pro Tips for Claude Code
              </h2>
              <p className="text-[var(--text-secondary)]">
                Master these techniques to get better results from Claude Code every time.
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
                <span>🏷️</span>
                XML Tags Reference
              </h3>
              <p className="text-sm text-[var(--text-secondary)] mb-4">
                Claude Code responds particularly well to these XML-style tags:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { tag: '<task>', desc: 'Main task or objective' },
                  { tag: '<context>', desc: 'Background information' },
                  { tag: '<requirements>', desc: 'What must be included' },
                  { tag: '<constraints>', desc: 'What to avoid or limit' },
                  { tag: '<output-instructions>', desc: 'How to format the response' },
                  { tag: '<examples>', desc: 'Show desired output format' },
                  { tag: '<code>', desc: 'Code to reference or modify' },
                  { tag: '<tech-stack>', desc: 'Technologies to use' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-[var(--background)]">
                    <code className="px-2 py-1 rounded bg-[#4ECDC4]/20 text-[#4ECDC4] text-sm font-mono">
                      {item.tag}
                    </code>
                    <span className="text-sm text-[var(--text-muted)]">{item.desc}</span>
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
