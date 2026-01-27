'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { Icons } from '../../components/Icons';
import LLMTargetSelector from '../../components/LLMTargetSelector';
import StyleGallery from '../../components/StyleGallery';
import { TargetLLM, getLLMTarget } from '../../data/llm-targets';
import { STYLE_EXAMPLES, StyleExample } from '../../data/style-examples';

type Step = 'intent' | 'target' | 'style' | 'generate' | 'review';

export default function CreatePromptPage() {
  const [currentStep, setCurrentStep] = useState<Step>('intent');
  const [userIntent, setUserIntent] = useState('');
  const [targetLLM, setTargetLLM] = useState<TargetLLM>('claude');
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [promptName, setPromptName] = useState('');

  const steps: { id: Step; name: string; icon: string }[] = [
    { id: 'intent', name: 'Describe', icon: '1' },
    { id: 'target', name: 'Target LLM', icon: '2' },
    { id: 'style', name: 'Style', icon: '3' },
    { id: 'generate', name: 'Generate', icon: '4' },
    { id: 'review', name: 'Review', icon: '5' },
  ];

  const currentStepIndex = steps.findIndex(s => s.id === currentStep);

  const handleToggleStyle = useCallback((styleId: string) => {
    setSelectedStyles(prev =>
      prev.includes(styleId)
        ? prev.filter(id => id !== styleId)
        : [...prev, styleId]
    );
  }, []);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setCurrentStep('generate');

    // Build the prompt based on selections
    const target = getLLMTarget(targetLLM);
    const styles = selectedStyles.map(id => STYLE_EXAMPLES.find(s => s.id === id)).filter(Boolean) as StyleExample[];

    // Simulate AI generation (in real implementation, this would call the API)
    await new Promise(resolve => setTimeout(resolve, 2000));

    let prompt = `# ${promptName || 'Custom Prompt'}\n\n`;
    prompt += `## Objective\n${userIntent}\n\n`;

    if (target) {
      prompt += `## Optimized for ${target.name}\n`;
      prompt += `Context window: ${target.characteristics.maxContextWindow}\n`;
      prompt += `Preferred format: ${target.characteristics.preferredFormat}\n\n`;
    }

    if (styles.length > 0) {
      prompt += `## Style Guidelines\n`;
      styles.forEach(style => {
        prompt += `\n### ${style.name}\n${style.promptAdditions}\n`;
      });
    }

    prompt += `\n## Instructions\n`;
    prompt += `Based on the above context and style guidelines, please help with: ${userIntent}\n`;

    setGeneratedPrompt(prompt);
    setIsGenerating(false);
    setCurrentStep('review');
  };

  const canProceed = () => {
    switch (currentStep) {
      case 'intent': return userIntent.trim().length > 10;
      case 'target': return true;
      case 'style': return true;
      case 'generate': return !isGenerating;
      case 'review': return generatedPrompt.length > 0;
      default: return false;
    }
  };

  const handleNext = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      if (currentStep === 'style') {
        handleGenerate();
      } else {
        setCurrentStep(steps[nextIndex].id);
      }
    }
  };

  const handleBack = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex].id);
    }
  };

  return (
    <main className="min-h-screen">
      <div className="fixed inset-0 bg-gradient-mesh pointer-events-none" />

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-[#1e3a5f]">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4ECDC4] to-[#3EB489] flex items-center justify-center">
              <Icons.chart className="w-6 h-6 text-[#0a1929]" />
            </div>
            <span className="text-xl font-bold">
              <span className="text-[#4ECDC4]">Prompt</span>
              <span className="text-white">Forge</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <Link href="/" className="px-4 py-2 text-[#94a3b8] hover:text-white transition-colors rounded-lg hover:bg-[#162a45]">
              Dashboard
            </Link>
            <Link href="/prompts" className="px-4 py-2 text-[#94a3b8] hover:text-white transition-colors rounded-lg hover:bg-[#162a45]">
              Prompts
            </Link>
            <Link href="/prompts/create" className="px-4 py-2 text-white font-medium rounded-lg bg-[rgba(78,205,196,0.1)]">
              Create
            </Link>
            <Link href="/playground" className="px-4 py-2 text-[#94a3b8] hover:text-white transition-colors rounded-lg hover:bg-[#162a45]">
              Builder
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="p-2 text-[#64748b] hover:text-white transition-colors">
            <Icons.settings className="w-5 h-5" />
          </button>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4ECDC4] to-[#3EB489] flex items-center justify-center text-[#0a1929] text-sm font-semibold">
            H
          </div>
        </div>
      </nav>

      <div className="relative z-10 px-6 py-8 max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Create Custom Prompt</h1>
          <p className="text-[#94a3b8]">Build a powerful prompt with AI assistance</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <button
                onClick={() => index <= currentStepIndex && setCurrentStep(step.id)}
                disabled={index > currentStepIndex}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  step.id === currentStep
                    ? 'bg-[#4ECDC4] text-[#0a1929]'
                    : index < currentStepIndex
                    ? 'bg-[#1e3a5f] text-white cursor-pointer'
                    : 'bg-[#0f2137] text-[#64748b] cursor-not-allowed'
                }`}
              >
                <span className="w-6 h-6 rounded-full bg-current/20 flex items-center justify-center text-sm font-bold">
                  {index < currentStepIndex ? '✓' : step.icon}
                </span>
                <span className="hidden md:inline text-sm font-medium">{step.name}</span>
              </button>
              {index < steps.length - 1 && (
                <div className={`w-8 md:w-16 h-0.5 mx-2 ${
                  index < currentStepIndex ? 'bg-[#4ECDC4]' : 'bg-[#1e3a5f]'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="card p-6 mb-6">
          {/* Step 1: Describe Intent */}
          {currentStep === 'intent' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white mb-2">What do you want to create?</h2>
                <p className="text-[#94a3b8]">Describe what you need in natural language. Be as specific as possible.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#94a3b8] mb-2">Prompt Name (optional)</label>
                <input
                  type="text"
                  value={promptName}
                  onChange={(e) => setPromptName(e.target.value)}
                  placeholder="e.g., Code Review Assistant"
                  className="w-full px-4 py-3 bg-[#0a1929] border border-[#1e3a5f] rounded-lg text-white placeholder-[#64748b] focus:border-[#4ECDC4] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#94a3b8] mb-2">Describe your prompt</label>
                <textarea
                  value={userIntent}
                  onChange={(e) => setUserIntent(e.target.value)}
                  placeholder="e.g., I want a prompt that helps me review code for security vulnerabilities, best practices, and performance issues. It should provide actionable suggestions with examples..."
                  rows={6}
                  className="w-full px-4 py-3 bg-[#0a1929] border border-[#1e3a5f] rounded-lg text-white placeholder-[#64748b] focus:border-[#4ECDC4] focus:outline-none resize-none"
                />
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-[#64748b]">Be specific about the task, context, and desired output</span>
                  <span className={`text-xs ${userIntent.length > 10 ? 'text-[#14b8a6]' : 'text-[#64748b]'}`}>
                    {userIntent.length} characters
                  </span>
                </div>
              </div>

              {/* Quick Suggestions */}
              <div>
                <label className="block text-sm font-medium text-[#94a3b8] mb-2">Quick suggestions:</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Create a code review assistant',
                    'Build a financial analysis prompt',
                    'Design a creative writing helper',
                    'Make a data analysis assistant',
                  ].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setUserIntent(suggestion)}
                      className="px-3 py-1.5 rounded-lg text-sm bg-[#1e3a5f] text-[#94a3b8] hover:text-white hover:bg-[#2d4a6f] transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Select Target LLM */}
          {currentStep === 'target' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white mb-2">Which LLM is this prompt for?</h2>
                <p className="text-[#94a3b8]">We'll optimize your prompt for the selected model's strengths.</p>
              </div>

              <LLMTargetSelector
                selected={targetLLM}
                onSelect={setTargetLLM}
                showDetails={true}
              />
            </div>
          )}

          {/* Step 3: Select Styles */}
          {currentStep === 'style' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white mb-2">Choose prompt styles</h2>
                <p className="text-[#94a3b8]">Select styles to shape your prompt's tone, format, and structure.</p>
              </div>

              <StyleGallery
                selectedStyles={selectedStyles}
                onToggleStyle={handleToggleStyle}
                maxSelections={5}
              />
            </div>
          )}

          {/* Step 4: Generating */}
          {currentStep === 'generate' && (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#4ECDC4] to-[#3EB489] flex items-center justify-center mx-auto mb-4 animate-pulse">
                <Icons.bolt className="w-8 h-8 text-[#0a1929]" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">Generating your prompt...</h2>
              <p className="text-[#94a3b8]">AI is crafting an optimized prompt based on your selections</p>
              <div className="flex justify-center gap-1 mt-4">
                <div className="w-2 h-2 rounded-full bg-[#4ECDC4] animate-bounce" style={{ animationDelay: '0s' }} />
                <div className="w-2 h-2 rounded-full bg-[#4ECDC4] animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 rounded-full bg-[#4ECDC4] animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          )}

          {/* Step 5: Review */}
          {currentStep === 'review' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white mb-2">Review Your Prompt</h2>
                <p className="text-[#94a3b8]">Edit and refine your generated prompt before saving.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Prompt Editor */}
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-[#94a3b8] mb-2">Generated Prompt</label>
                  <textarea
                    value={generatedPrompt}
                    onChange={(e) => setGeneratedPrompt(e.target.value)}
                    rows={20}
                    className="w-full px-4 py-3 bg-[#0a1929] border border-[#1e3a5f] rounded-lg text-white font-mono text-sm focus:border-[#4ECDC4] focus:outline-none resize-none"
                  />
                </div>

                {/* Summary Panel */}
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-[#0a1929] border border-[#1e3a5f]">
                    <h4 className="text-sm font-medium text-white mb-3">Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-[#64748b]">Target LLM:</span>
                        <span className="text-white">{getLLMTarget(targetLLM)?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#64748b]">Styles Applied:</span>
                        <span className="text-white">{selectedStyles.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#64748b]">Characters:</span>
                        <span className="text-white">{generatedPrompt.length}</span>
                      </div>
                    </div>
                  </div>

                  {selectedStyles.length > 0 && (
                    <div className="p-4 rounded-lg bg-[#0a1929] border border-[#1e3a5f]">
                      <h4 className="text-sm font-medium text-white mb-3">Applied Styles</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedStyles.map(id => {
                          const style = STYLE_EXAMPLES.find(s => s.id === id);
                          if (!style) return null;
                          return (
                            <span
                              key={id}
                              className="text-xs px-2 py-1 rounded-full"
                              style={{ background: `${style.color}20`, color: style.color }}
                            >
                              {style.icon} {style.name}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => navigator.clipboard.writeText(generatedPrompt)}
                    className="w-full btn-secondary flex items-center justify-center gap-2"
                  >
                    <Icons.copy className="w-4 h-4" />
                    Copy to Clipboard
                  </button>

                  <Link
                    href={`/playground?custom=true`}
                    className="w-full btn-primary flex items-center justify-center gap-2"
                  >
                    Open in Builder
                    <Icons.arrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={currentStepIndex === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              currentStepIndex === 0
                ? 'text-[#64748b] cursor-not-allowed'
                : 'text-[#94a3b8] hover:text-white'
            }`}
          >
            <Icons.arrowLeft className="w-4 h-4" />
            Back
          </button>

          {currentStep !== 'review' && currentStep !== 'generate' && (
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-colors ${
                canProceed()
                  ? 'bg-[#4ECDC4] text-[#0a1929] hover:bg-[#c49843]'
                  : 'bg-[#1e3a5f] text-[#64748b] cursor-not-allowed'
              }`}
            >
              {currentStep === 'style' ? 'Generate Prompt' : 'Continue'}
              <Icons.arrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
