'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Icons } from '../components/Icons';
import { ThemeToggle } from '../components/ThemeToggle';

// Ocean blue color palette (Hammy Design)
const oceanColors = {
  primary: '#0EA5E9',
  secondary: '#06B6D4',
  accent: '#38BDF8',
  deep: '#0284C7',
  light: '#E0F2FE',
  dark: '#0C4A6E',
};

// Task types for prompt building
const TASK_TYPES = [
  { id: 'analyze', label: 'Analyze', icon: '🔍', desc: 'Examine data, documents, or situations' },
  { id: 'create', label: 'Create', icon: '✨', desc: 'Generate new content, code, or ideas' },
  { id: 'explain', label: 'Explain', icon: '📖', desc: 'Break down complex topics simply' },
  { id: 'summarize', label: 'Summarize', icon: '📝', desc: 'Condense information into key points' },
  { id: 'compare', label: 'Compare', icon: '⚖️', desc: 'Evaluate differences and similarities' },
  { id: 'solve', label: 'Solve', icon: '🧩', desc: 'Work through problems step-by-step' },
];

// Tone options
const TONE_OPTIONS = [
  { id: 'professional', label: 'Professional', desc: 'Formal, business-appropriate' },
  { id: 'casual', label: 'Casual', desc: 'Friendly, conversational' },
  { id: 'technical', label: 'Technical', desc: 'Detailed, expert-level' },
  { id: 'simple', label: 'Simple', desc: 'Easy to understand, no jargon' },
];

// Output format options
const OUTPUT_OPTIONS = [
  { id: 'paragraphs', label: 'Paragraphs', desc: 'Flowing text' },
  { id: 'bullets', label: 'Bullet Points', desc: 'Easy to scan' },
  { id: 'numbered', label: 'Numbered List', desc: 'Sequential steps' },
  { id: 'table', label: 'Table', desc: 'Organized data' },
  { id: 'code', label: 'Code', desc: 'Programming output' },
];

// LLM platforms
const LLM_PLATFORMS = [
  { id: 'claude', name: 'Claude', icon: '🟣', color: '#8B5CF6', url: 'https://claude.ai' },
  { id: 'chatgpt', name: 'ChatGPT', icon: '🟢', color: '#10B981', url: 'https://chat.openai.com' },
  { id: 'gemini', name: 'Gemini', icon: '🔵', color: '#3B82F6', url: 'https://gemini.google.com' },
  { id: 'grok', name: 'Grok', icon: '⚫', color: '#6B7280', url: 'https://grok.x.ai' },
];

export default function Prompts101() {
  // Builder state
  const [currentStep, setCurrentStep] = useState(1);
  const [taskType, setTaskType] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [context, setContext] = useState('');
  const [tone, setTone] = useState('professional');
  const [outputFormat, setOutputFormat] = useState('bullets');
  const [constraints, setConstraints] = useState('');
  const [examples, setExamples] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [copied, setCopied] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState('claude');

  // Section navigation
  const [activeSection, setActiveSection] = useState('builder');

  // Generate prompt whenever inputs change
  useEffect(() => {
    generatePrompt();
  }, [taskType, taskDescription, context, tone, outputFormat, constraints, examples]);

  const generatePrompt = () => {
    if (!taskType || !taskDescription) {
      setGeneratedPrompt('');
      return;
    }

    const taskLabel = TASK_TYPES.find(t => t.id === taskType)?.label || taskType;
    const toneLabel = TONE_OPTIONS.find(t => t.id === tone)?.label || tone;
    const formatLabel = OUTPUT_OPTIONS.find(o => o.id === outputFormat)?.label || outputFormat;

    let prompt = '';

    // Context section
    if (context) {
      prompt += `## Context\n${context}\n\n`;
    }

    // Main task
    prompt += `## Task\n${taskLabel}: ${taskDescription}\n\n`;

    // Requirements
    prompt += `## Requirements\n`;
    prompt += `- Tone: ${toneLabel}\n`;
    prompt += `- Format: ${formatLabel}\n`;

    if (constraints) {
      prompt += `- Constraints: ${constraints}\n`;
    }

    // Examples if provided
    if (examples) {
      prompt += `\n## Examples\n${examples}\n`;
    }

    // Output instruction
    prompt += `\n## Output\nProvide your response following the requirements above.`;

    setGeneratedPrompt(prompt);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setCurrentStep(1);
    setTaskType('');
    setTaskDescription('');
    setContext('');
    setTone('professional');
    setOutputFormat('bullets');
    setConstraints('');
    setExamples('');
    setGeneratedPrompt('');
  };

  const sections = [
    { id: 'builder', label: 'Prompt Builder', icon: '🔨' },
    { id: 'learn', label: 'Learn Prompting', icon: '📚' },
    { id: 'examples', label: 'Example Prompts', icon: '💡' },
    { id: 'platforms', label: 'Where to Use', icon: '🚀' },
  ];

  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-lg bg-[var(--background)]/80 border-b border-[var(--border-color)]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0EA5E9] to-[#06B6D4] flex items-center justify-center">
                <Icons.chart className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">
                <span className="text-[#0EA5E9]">Prompt</span>
                <span className="text-[var(--foreground)]">Forge</span>
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              <Link href="/" className="px-4 py-2 text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors rounded-lg hover:bg-[var(--muted)]">
                Home
              </Link>
              <Link href="/prompts-101" className="px-4 py-2 text-[#0EA5E9] font-medium rounded-lg bg-[rgba(14,165,233,0.1)]">
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
        <div className="absolute inset-0 bg-gradient-to-br from-[#0EA5E9]/10 via-transparent to-[#06B6D4]/10" />
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(14,165,233,0.1)] border border-[rgba(14,165,233,0.3)] text-[#0EA5E9] text-sm font-medium mb-4">
              <span className="text-lg">🎓</span>
              Learn to Build Effective AI Prompts
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--foreground)] mb-4 leading-tight">
              Prompts{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0EA5E9] to-[#06B6D4]">
                101
              </span>
            </h1>

            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              Build prompts that get results. Answer a few questions and watch your prompt come together.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Section Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 pb-4 border-b border-[var(--border-color)]">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeSection === section.id
                  ? 'bg-gradient-to-r from-[#0EA5E9] to-[#06B6D4] text-white shadow-lg'
                  : 'bg-[var(--muted)] text-[var(--text-secondary)] hover:bg-[var(--card)]'
              }`}
            >
              <span>{section.icon}</span>
              {section.label}
            </button>
          ))}
        </div>

        {/* BUILDER SECTION */}
        {activeSection === 'builder' && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left: Question Flow */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-[var(--foreground)]">Build Your Prompt</h2>
                <button
                  onClick={handleReset}
                  className="text-sm text-[var(--text-muted)] hover:text-[#0EA5E9] transition-colors"
                >
                  Reset
                </button>
              </div>

              {/* Step 1: What do you want to do? */}
              <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border-color)]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#0EA5E9] text-white flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <h3 className="font-semibold text-[var(--foreground)]">What do you want the AI to do?</h3>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
                  {TASK_TYPES.map((task) => (
                    <button
                      key={task.id}
                      onClick={() => setTaskType(task.id)}
                      className={`p-3 rounded-xl border-2 text-left transition-all ${
                        taskType === task.id
                          ? 'border-[#0EA5E9] bg-[rgba(14,165,233,0.1)]'
                          : 'border-[var(--border-color)] hover:border-[#0EA5E9]/50'
                      }`}
                    >
                      <div className="text-2xl mb-1">{task.icon}</div>
                      <div className="font-medium text-sm text-[var(--foreground)]">{task.label}</div>
                      <div className="text-xs text-[var(--text-muted)]">{task.desc}</div>
                    </button>
                  ))}
                </div>

                <textarea
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                  placeholder="Describe specifically what you want... (e.g., 'a financial report for Q3 earnings' or 'a Python script to scrape websites')"
                  className="w-full p-3 rounded-xl bg-[var(--muted)] border border-[var(--border-color)] text-[var(--foreground)] placeholder:text-[var(--text-muted)] focus:border-[#0EA5E9] focus:outline-none resize-none"
                  rows={3}
                />
              </div>

              {/* Step 2: Context */}
              <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border-color)]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#06B6D4] text-white flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <h3 className="font-semibold text-[var(--foreground)]">Any background the AI should know?</h3>
                  <span className="text-xs text-[var(--text-muted)]">(optional)</span>
                </div>

                <textarea
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  placeholder="Add context like: who you are, what the situation is, relevant background info..."
                  className="w-full p-3 rounded-xl bg-[var(--muted)] border border-[var(--border-color)] text-[var(--foreground)] placeholder:text-[var(--text-muted)] focus:border-[#0EA5E9] focus:outline-none resize-none"
                  rows={3}
                />
              </div>

              {/* Step 3: Tone & Format */}
              <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border-color)]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#38BDF8] text-white flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <h3 className="font-semibold text-[var(--foreground)]">How should the response be?</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Tone</label>
                    <div className="flex flex-wrap gap-2">
                      {TONE_OPTIONS.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => setTone(t.id)}
                          className={`px-3 py-2 rounded-lg text-sm transition-all ${
                            tone === t.id
                              ? 'bg-[#0EA5E9] text-white'
                              : 'bg-[var(--muted)] text-[var(--text-secondary)] hover:bg-[var(--card)]'
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Format</label>
                    <div className="flex flex-wrap gap-2">
                      {OUTPUT_OPTIONS.map((o) => (
                        <button
                          key={o.id}
                          onClick={() => setOutputFormat(o.id)}
                          className={`px-3 py-2 rounded-lg text-sm transition-all ${
                            outputFormat === o.id
                              ? 'bg-[#0EA5E9] text-white'
                              : 'bg-[var(--muted)] text-[var(--text-secondary)] hover:bg-[var(--card)]'
                          }`}
                        >
                          {o.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 4: Constraints & Examples */}
              <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border-color)]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#0284C7] text-white flex items-center justify-center font-bold text-sm">
                    4
                  </div>
                  <h3 className="font-semibold text-[var(--foreground)]">Any rules or examples?</h3>
                  <span className="text-xs text-[var(--text-muted)]">(optional)</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                      Constraints (things to include or avoid)
                    </label>
                    <input
                      type="text"
                      value={constraints}
                      onChange={(e) => setConstraints(e.target.value)}
                      placeholder="e.g., 'Keep under 500 words' or 'Don't use technical jargon'"
                      className="w-full p-3 rounded-xl bg-[var(--muted)] border border-[var(--border-color)] text-[var(--foreground)] placeholder:text-[var(--text-muted)] focus:border-[#0EA5E9] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                      Example of what you want (helps AI understand)
                    </label>
                    <textarea
                      value={examples}
                      onChange={(e) => setExamples(e.target.value)}
                      placeholder="Paste an example of the output style you want..."
                      className="w-full p-3 rounded-xl bg-[var(--muted)] border border-[var(--border-color)] text-[var(--foreground)] placeholder:text-[var(--text-muted)] focus:border-[#0EA5E9] focus:outline-none resize-none"
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Live Preview */}
            <div className="lg:sticky lg:top-24 lg:self-start space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-[var(--foreground)]">Your Prompt</h2>
                <div className="flex items-center gap-2">
                  {LLM_PLATFORMS.map((platform) => (
                    <button
                      key={platform.id}
                      onClick={() => setSelectedPlatform(platform.id)}
                      className={`p-2 rounded-lg transition-all ${
                        selectedPlatform === platform.id
                          ? 'bg-[var(--muted)] ring-2 ring-[#0EA5E9]'
                          : 'hover:bg-[var(--muted)]'
                      }`}
                      title={`Use with ${platform.name}`}
                    >
                      <span className="text-xl">{platform.icon}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border-color)] min-h-[400px]">
                {generatedPrompt ? (
                  <pre className="whitespace-pre-wrap text-sm text-[var(--foreground)] font-mono leading-relaxed">
                    {generatedPrompt}
                  </pre>
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 text-center">
                    <div className="text-4xl mb-4">✨</div>
                    <p className="text-[var(--text-muted)]">
                      Answer the questions on the left to build your prompt
                    </p>
                  </div>
                )}
              </div>

              {generatedPrompt && (
                <div className="flex gap-3">
                  <button
                    onClick={handleCopy}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#0EA5E9] to-[#06B6D4] text-white font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
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
                  <a
                    href={LLM_PLATFORMS.find(p => p.id === selectedPlatform)?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-xl border border-[var(--border-color)] text-[var(--foreground)] font-medium hover:border-[#0EA5E9] transition-all flex items-center gap-2"
                  >
                    Open {LLM_PLATFORMS.find(p => p.id === selectedPlatform)?.name}
                    <Icons.arrowRight className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>
          </div>
        )}

        {/* LEARN SECTION */}
        {activeSection === 'learn' && (
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-2xl font-bold text-[var(--foreground)]">How to Write Better Prompts</h2>

            <div className="space-y-6">
              {[
                {
                  title: '1. Be Specific',
                  bad: 'Write something about marketing.',
                  good: 'Write 5 email subject lines for a summer sale campaign targeting young professionals.',
                  tip: 'The more specific you are, the better the output.',
                },
                {
                  title: '2. Provide Context',
                  bad: 'Analyze this data.',
                  good: 'I\'m a marketing manager. Analyze this customer survey data to identify the top 3 pain points for our product improvement team.',
                  tip: 'Context helps the AI understand your situation and needs.',
                },
                {
                  title: '3. Define the Output',
                  bad: 'Help me with my presentation.',
                  good: 'Create a 5-slide outline for a presentation about Q3 sales results. Include: title slide, key metrics, challenges, successes, and next steps.',
                  tip: 'Tell the AI exactly what format and structure you want.',
                },
                {
                  title: '4. Set Constraints',
                  bad: 'Write about AI.',
                  good: 'Write a 300-word blog intro about AI in healthcare. Avoid technical jargon. Target audience: hospital administrators.',
                  tip: 'Constraints prevent unwanted content and keep responses focused.',
                },
                {
                  title: '5. Give Examples',
                  bad: 'Write in my style.',
                  good: 'Write in this style: "Our team crushed it this quarter! Here\'s the scoop on how we..." — casual, upbeat, uses metaphors.',
                  tip: 'Examples show the AI exactly what you want.',
                },
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border-color)]">
                  <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">{item.title}</h3>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-red-500">❌</span>
                        <span className="text-sm font-medium text-red-500">Weak Prompt</span>
                      </div>
                      <code className="text-sm text-[var(--foreground)]">{item.bad}</code>
                    </div>

                    <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-green-500">✓</span>
                        <span className="text-sm font-medium text-green-500">Strong Prompt</span>
                      </div>
                      <code className="text-sm text-[var(--foreground)]">{item.good}</code>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#0EA5E9]/5 border border-[#0EA5E9]/20">
                    <div className="flex items-center gap-2 text-[#0EA5E9] text-sm">
                      <span>💡</span>
                      <span>{item.tip}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EXAMPLES SECTION */}
        {activeSection === 'examples' && (
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-2xl font-bold text-[var(--foreground)]">Example Prompts You Can Use</h2>

            <div className="grid gap-6">
              {[
                {
                  title: '📊 Data Analysis',
                  prompt: `## Context
I have sales data from Q1-Q3 2024 for our SaaS product.

## Task
Analyze: Identify trends, anomalies, and opportunities in the data.

## Requirements
- Tone: Professional
- Format: Numbered list with bullet points for details
- Focus on: Revenue trends, customer acquisition cost, churn patterns

## Output
Provide 5-7 key insights with actionable recommendations.`,
                },
                {
                  title: '✍️ Content Creation',
                  prompt: `## Context
I run a fitness app for busy professionals aged 25-40.

## Task
Create: 5 Instagram post captions promoting our new 15-minute workout feature.

## Requirements
- Tone: Casual, motivational
- Format: Each caption under 150 characters
- Include: Call-to-action and relevant hashtags
- Avoid: Clichés like "no excuses"

## Output
5 unique captions ready to post.`,
                },
                {
                  title: '💻 Code Generation',
                  prompt: `## Context
I'm building a React dashboard and need a reusable component.

## Task
Create: A React component for a KPI card that shows a metric, trend arrow, and percentage change.

## Requirements
- Tone: Technical
- Format: Code with comments
- Use: TypeScript, Tailwind CSS
- Include: Props interface, responsive design

## Output
Complete component code I can copy-paste.`,
                },
                {
                  title: '📝 Document Summary',
                  prompt: `## Context
I need to brief my team on a 50-page industry report.

## Task
Summarize: Extract the key findings and implications for our business.

## Requirements
- Tone: Professional
- Format: Bullet points grouped by theme
- Length: 1 page maximum
- Focus: Actionable insights, not general observations

## Output
Executive summary with clear takeaways.`,
                },
              ].map((example, i) => (
                <div key={i} className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border-color)]">
                  <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">{example.title}</h3>
                  <pre className="p-4 rounded-xl bg-[var(--muted)] text-sm text-[var(--foreground)] whitespace-pre-wrap font-mono overflow-x-auto">
                    {example.prompt}
                  </pre>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(example.prompt);
                    }}
                    className="mt-4 px-4 py-2 rounded-lg bg-[#0EA5E9] text-white text-sm font-medium hover:bg-[#0284C7] transition-colors"
                  >
                    Copy This Prompt
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PLATFORMS SECTION */}
        {activeSection === 'platforms' && (
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-2xl font-bold text-[var(--foreground)]">Where to Use Your Prompts</h2>
            <p className="text-[var(--text-secondary)]">
              Your prompts work with all major AI platforms. Here's how to use each one.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  name: 'Claude',
                  icon: '🟣',
                  color: '#8B5CF6',
                  url: 'https://claude.ai',
                  desc: 'Best for complex analysis, writing, and nuanced tasks. Great at following detailed instructions.',
                  tips: ['Handles long documents well', 'Excellent at reasoning through problems', 'Good with technical and creative tasks'],
                },
                {
                  name: 'ChatGPT',
                  icon: '🟢',
                  color: '#10B981',
                  url: 'https://chat.openai.com',
                  desc: 'Versatile all-rounder. Good for general tasks, coding, and creative work.',
                  tips: ['Wide range of capabilities', 'Good with code generation', 'Supports plugins and tools'],
                },
                {
                  name: 'Gemini',
                  icon: '🔵',
                  color: '#3B82F6',
                  url: 'https://gemini.google.com',
                  desc: 'Strong at research and analysis. Integrates with Google services.',
                  tips: ['Can search the web for current info', 'Good with Google Workspace', 'Handles images and PDFs'],
                },
                {
                  name: 'Grok',
                  icon: '⚫',
                  color: '#6B7280',
                  url: 'https://grok.x.ai',
                  desc: 'Real-time information access. More casual, direct communication style.',
                  tips: ['Access to current events via X', 'More relaxed tone', 'Good for trending topics'],
                },
              ].map((platform) => (
                <div
                  key={platform.name}
                  className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border-color)] hover:shadow-lg transition-all"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl"
                      style={{ backgroundColor: `${platform.color}15` }}
                    >
                      {platform.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[var(--foreground)]">{platform.name}</h3>
                      <a
                        href={platform.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[#0EA5E9] hover:underline"
                      >
                        {platform.url.replace('https://', '')} →
                      </a>
                    </div>
                  </div>

                  <p className="text-[var(--text-secondary)] text-sm mb-4">{platform.desc}</p>

                  <ul className="space-y-2">
                    {platform.tips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                        <span className="text-[#0EA5E9]">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* How to use */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0EA5E9]/5 to-[#06B6D4]/5 border border-[#0EA5E9]/20">
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">How to Use Your Prompt</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { step: '1', title: 'Build', desc: 'Use the Prompt Builder to create your prompt', icon: '🔨' },
                  { step: '2', title: 'Copy', desc: 'Click the copy button to copy your prompt', icon: '📋' },
                  { step: '3', title: 'Paste', desc: 'Paste into your preferred AI and hit enter', icon: '🚀' },
                ].map((item) => (
                  <div key={item.step} className="text-center">
                    <div className="text-3xl mb-2">{item.icon}</div>
                    <div className="w-8 h-8 rounded-full bg-[#0EA5E9] text-white font-bold text-sm flex items-center justify-center mx-auto mb-2">
                      {item.step}
                    </div>
                    <h4 className="font-semibold text-[var(--foreground)]">{item.title}</h4>
                    <p className="text-sm text-[var(--text-muted)]">{item.desc}</p>
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
            <span className="text-[#0EA5E9] font-semibold">PromptForge</span>
            <span>•</span>
            <span>Prompts 101 - Build Better AI Prompts</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-[var(--text-muted)]">
            <Link href="/" className="hover:text-[var(--foreground)] transition-colors">Home</Link>
            <Link href="/playground" className="hover:text-[var(--foreground)] transition-colors">Playground</Link>
            <Link href="/builder" className="hover:text-[var(--foreground)] transition-colors">Builder</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
