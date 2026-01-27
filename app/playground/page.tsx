'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Icon } from '../components/Icons';
import { Tooltip, HelpTooltip } from '../components/Tooltip';
import { PROMPT_TEMPLATES, TEMPLATE_CATEGORIES, PromptTemplate } from '../components/PromptTemplates';
import { compressPrompt } from '@/features/smart-compression';
import { detectPII, redactPII, detectInjection, getInjectionRiskLevel } from '@/features/security';
import { extractVariables, substituteVariables } from '@/features/variable-system';
import { calculateCost, MODEL_PRICING } from '@/features/cost-calculator';

type Mode = 'simple' | 'expert';
type Step = 'template' | 'customize' | 'optimize' | 'export';

export default function Playground() {
  // Core state
  const [mode, setMode] = useState<Mode>('simple');
  const [currentStep, setCurrentStep] = useState<Step>('template');
  const [prompt, setPrompt] = useState('');
  const [originalPrompt, setOriginalPrompt] = useState('');

  // Template state
  const [selectedTemplate, setSelectedTemplate] = useState<PromptTemplate | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [variableValues, setVariableValues] = useState<Record<string, string>>({});

  // Analysis state
  const [analysisResults, setAnalysisResults] = useState<{
    tokens: number;
    cost: number;
    piiCount: number;
    injectionRisk: string;
    compressionSavings: number;
  } | null>(null);

  // UI state
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState('claude-sonnet-4-20250514');

  // Load history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('promptforge-history');
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  // Analyze prompt whenever it changes
  useEffect(() => {
    if (prompt.length > 10) {
      const cost = calculateCost(prompt, 500, selectedModel);
      const pii = detectPII(prompt);
      const compression = compressPrompt(prompt);
      const riskLevel = getInjectionRiskLevel(prompt);

      setAnalysisResults({
        tokens: cost.inputTokens,
        cost: cost.totalCost,
        piiCount: pii.length,
        injectionRisk: riskLevel,
        compressionSavings: compression.savings,
      });
    } else {
      setAnalysisResults(null);
    }
  }, [prompt, selectedModel]);

  // Handle template selection
  const handleSelectTemplate = (template: PromptTemplate) => {
    setSelectedTemplate(template);
    setPrompt(template.prompt);
    setOriginalPrompt(template.prompt);

    // Initialize variable values with defaults
    const defaults: Record<string, string> = {};
    template.variables.forEach(v => {
      defaults[v.name] = v.default;
    });
    setVariableValues(defaults);

    setCurrentStep('customize');
  };

  // Handle variable change
  const handleVariableChange = (name: string, value: string) => {
    setVariableValues(prev => ({ ...prev, [name]: value }));
  };

  // Generate final prompt
  const generatePrompt = useCallback(() => {
    if (!selectedTemplate) return prompt;
    return substituteVariables(selectedTemplate.prompt, variableValues);
  }, [selectedTemplate, variableValues, prompt]);

  // Copy to clipboard
  const handleCopy = async () => {
    const finalPrompt = mode === 'simple' ? generatePrompt() : prompt;
    await navigator.clipboard.writeText(finalPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);

    // Save to history
    const newHistory = [finalPrompt, ...history.slice(0, 9)];
    setHistory(newHistory);
    localStorage.setItem('promptforge-history', JSON.stringify(newHistory));
  };

  // Optimize prompt
  const handleOptimize = () => {
    const currentPrompt = mode === 'simple' ? generatePrompt() : prompt;
    const result = compressPrompt(currentPrompt, { aggressiveness: 'medium' });
    setPrompt(result.compressed);
    setCurrentStep('export');
  };

  // Security scan
  const handleSecurityScan = () => {
    const currentPrompt = mode === 'simple' ? generatePrompt() : prompt;
    const { redacted } = redactPII(currentPrompt);
    setPrompt(redacted);
  };

  // Get templates for current category
  const filteredTemplates = selectedCategory === 'all'
    ? PROMPT_TEMPLATES
    : PROMPT_TEMPLATES.filter(t => t.category === selectedCategory);

  // Steps for simple mode
  const steps: { id: Step; name: string; icon: keyof typeof Icon }[] = [
    { id: 'template', name: 'Choose Template', icon: 'template' },
    { id: 'customize', name: 'Customize', icon: 'wand' },
    { id: 'optimize', name: 'Optimize', icon: 'bolt' },
    { id: 'export', name: 'Export', icon: 'download' },
  ];

  const currentStepIndex = steps.findIndex(s => s.id === currentStep);

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-mesh pointer-events-none opacity-30" />

      {/* Header */}
      <header className="relative z-10 border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                <Icon name="sparkles" className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold">
                  <span className="text-teal-400">Prompt</span>Forge
                </span>
                <span className="ml-2 text-xs px-2 py-0.5 bg-teal-500/20 text-teal-400 rounded-full">
                  {mode === 'simple' ? 'Simple' : 'Expert'}
                </span>
              </div>
            </Link>

            {/* Mode Toggle */}
            <div className="flex items-center gap-4">
              <div className="flex bg-gray-800/50 rounded-xl p-1">
                <button
                  onClick={() => setMode('simple')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    mode === 'simple'
                      ? 'bg-teal-500 text-gray-900'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Icon name="wand" className="w-4 h-4 inline mr-2" />
                  Simple
                </button>
                <button
                  onClick={() => setMode('expert')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    mode === 'expert'
                      ? 'bg-teal-500 text-gray-900'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Icon name="beaker" className="w-4 h-4 inline mr-2" />
                  Expert
                </button>
              </div>

              <button
                onClick={() => setShowHistory(!showHistory)}
                className="p-2 text-gray-500 hover:text-teal-400 transition-colors"
              >
                <Icon name="history" className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Simple Mode */}
        {mode === 'simple' && (
          <div className="space-y-8">
            {/* Progress Steps */}
            <div className="flex items-center justify-center gap-2">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <button
                    onClick={() => index <= currentStepIndex && setCurrentStep(step.id)}
                    disabled={index > currentStepIndex}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                      step.id === currentStep
                        ? 'bg-teal-500 text-gray-900'
                        : index < currentStepIndex
                        ? 'bg-teal-500/20 text-teal-400 hover:bg-teal-500/30'
                        : 'bg-gray-800/50 text-gray-500'
                    }`}
                  >
                    <span className="w-6 h-6 rounded-full bg-current/20 flex items-center justify-center text-sm">
                      {index + 1}
                    </span>
                    <span className="hidden sm:inline">{step.name}</span>
                  </button>
                  {index < steps.length - 1 && (
                    <Icon name="chevronRight" className="w-4 h-4 text-gray-600 mx-2" />
                  )}
                </div>
              ))}
            </div>

            {/* Step Content */}
            <div className="animate-fade-in">
              {/* Step 1: Template Selection */}
              {currentStep === 'template' && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">Choose a Template</h2>
                    <p className="text-gray-500">Start with a pre-built prompt or create from scratch</p>
                  </div>

                  {/* Categories */}
                  <div className="flex flex-wrap justify-center gap-2">
                    {TEMPLATE_CATEGORIES.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`px-4 py-2 rounded-xl text-sm transition-all ${
                          selectedCategory === cat.id
                            ? 'bg-teal-500 text-gray-900'
                            : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800'
                        }`}
                      >
                        <span className="mr-2">{cat.icon}</span>
                        {cat.name}
                      </button>
                    ))}
                  </div>

                  {/* Template Grid */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredTemplates.map(template => (
                      <button
                        key={template.id}
                        onClick={() => handleSelectTemplate(template)}
                        className="card p-5 text-left hover:border-teal-500/50 transition-all group"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500/20 to-cyan-500/20 flex items-center justify-center text-2xl">
                            {template.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold group-hover:text-teal-400 transition-colors">
                              {template.name}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">{template.description}</p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {template.tags.slice(0, 2).map(tag => (
                                <span key={tag} className="text-xs px-2 py-0.5 bg-gray-800 text-gray-400 rounded">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}

                    {/* Blank template option */}
                    <button
                      onClick={() => {
                        setSelectedTemplate(null);
                        setPrompt('');
                        setCurrentStep('customize');
                      }}
                      className="card p-5 text-left hover:border-teal-500/50 transition-all group border-dashed"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl border-2 border-dashed border-gray-700 flex items-center justify-center">
                          <Icon name="plus" className="w-6 h-6 text-gray-500" />
                        </div>
                        <div>
                          <h3 className="font-semibold group-hover:text-teal-400 transition-colors">
                            Start from Scratch
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">Write your own prompt</p>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Customize */}
              {currentStep === 'customize' && (
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Left: Variables or Editor */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold">
                        {selectedTemplate ? 'Fill in the Details' : 'Write Your Prompt'}
                      </h2>
                      <HelpTooltip content="Fill in each field to customize your prompt. Use descriptive values for best results." />
                    </div>

                    {selectedTemplate ? (
                      <div className="space-y-4">
                        {selectedTemplate.variables.map(variable => (
                          <div key={variable.name} className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                              <span className="text-teal-400">{`{{${variable.name}}}`}</span>
                              <HelpTooltip content={variable.description} />
                            </label>
                            {variable.name === 'content' || variable.name === 'code' || variable.name === 'raw_notes' ? (
                              <textarea
                                value={variableValues[variable.name] || ''}
                                onChange={(e) => handleVariableChange(variable.name, e.target.value)}
                                className="input h-32 resize-none font-mono text-sm"
                                placeholder={variable.description}
                              />
                            ) : (
                              <input
                                type="text"
                                value={variableValues[variable.name] || ''}
                                onChange={(e) => handleVariableChange(variable.name, e.target.value)}
                                className="input"
                                placeholder={variable.default || variable.description}
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="input h-64 resize-none font-mono text-sm"
                        placeholder="Write your prompt here...

Tips:
• Be specific about what you want
• Include context and constraints
• Use {{variables}} for dynamic content
• Add examples if helpful"
                      />
                    )}

                    <button
                      onClick={() => setCurrentStep('optimize')}
                      disabled={selectedTemplate ? Object.values(variableValues).some(v => !v) : !prompt}
                      className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Continue to Optimize
                      <Icon name="arrowRight" className="w-4 h-4 inline ml-2" />
                    </button>
                  </div>

                  {/* Right: Preview */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold">Live Preview</h2>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Icon name="eye" className="w-4 h-4" />
                        Updates as you type
                      </div>
                    </div>

                    <div className="card p-6 min-h-[300px]">
                      <pre className="whitespace-pre-wrap text-sm text-gray-300 font-mono">
                        {selectedTemplate ? generatePrompt() : prompt || 'Your prompt will appear here...'}
                      </pre>
                    </div>

                    {/* Quick Stats */}
                    {analysisResults && (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="card p-4 text-center">
                          <div className="text-2xl font-bold text-teal-400">{analysisResults.tokens}</div>
                          <div className="text-xs text-gray-500">Tokens</div>
                        </div>
                        <div className="card p-4 text-center">
                          <div className="text-2xl font-bold text-white">${analysisResults.cost.toFixed(4)}</div>
                          <div className="text-xs text-gray-500">Est. Cost</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 3: Optimize */}
              {currentStep === 'optimize' && (
                <div className="max-w-3xl mx-auto space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">Optimize Your Prompt</h2>
                    <p className="text-gray-500">Review and enhance before using</p>
                  </div>

                  {/* Analysis Cards */}
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="card p-4 text-center">
                      <div className="text-3xl font-bold text-teal-400">{analysisResults?.tokens || 0}</div>
                      <div className="text-sm text-gray-500">Tokens</div>
                    </div>
                    <div className="card p-4 text-center">
                      <div className="text-3xl font-bold text-green-400">{analysisResults?.compressionSavings || 0}%</div>
                      <div className="text-sm text-gray-500">Can Save</div>
                    </div>
                    <div className="card p-4 text-center">
                      <div className={`text-3xl font-bold ${analysisResults?.piiCount ? 'text-red-400' : 'text-green-400'}`}>
                        {analysisResults?.piiCount || 0}
                      </div>
                      <div className="text-sm text-gray-500">PII Found</div>
                    </div>
                    <div className="card p-4 text-center">
                      <div className={`text-3xl font-bold capitalize ${
                        analysisResults?.injectionRisk === 'none' ? 'text-green-400' :
                        analysisResults?.injectionRisk === 'low' ? 'text-yellow-400' :
                        'text-red-400'
                      }`}>
                        {analysisResults?.injectionRisk || 'None'}
                      </div>
                      <div className="text-sm text-gray-500">Risk Level</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <button
                      onClick={handleOptimize}
                      className="card p-5 text-left hover:border-teal-500/50 transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-teal-500/20 flex items-center justify-center text-teal-400">
                          <Icon name="compress" className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold group-hover:text-teal-400">Compress Prompt</h3>
                          <p className="text-sm text-gray-500">Remove filler words, save ~{analysisResults?.compressionSavings || 0}% tokens</p>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={handleSecurityScan}
                      className="card p-5 text-left hover:border-teal-500/50 transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center text-red-400">
                          <Icon name="shield" className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold group-hover:text-teal-400">Redact PII</h3>
                          <p className="text-sm text-gray-500">Remove {analysisResults?.piiCount || 0} sensitive items found</p>
                        </div>
                      </div>
                    </button>
                  </div>

                  {/* Preview */}
                  <div className="card p-6">
                    <pre className="whitespace-pre-wrap text-sm text-gray-300 font-mono">
                      {selectedTemplate ? generatePrompt() : prompt}
                    </pre>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => setCurrentStep('customize')}
                      className="btn-secondary flex-1"
                    >
                      <Icon name="arrowLeft" className="w-4 h-4 inline mr-2" />
                      Back
                    </button>
                    <button
                      onClick={() => setCurrentStep('export')}
                      className="btn-primary flex-1"
                    >
                      Continue to Export
                      <Icon name="arrowRight" className="w-4 h-4 inline ml-2" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Export */}
              {currentStep === 'export' && (
                <div className="max-w-3xl mx-auto space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">Your Prompt is Ready!</h2>
                    <p className="text-gray-500">Copy it or export in your preferred format</p>
                  </div>

                  {/* Final Prompt */}
                  <div className="card p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-500">Final Prompt</span>
                      <button
                        onClick={handleCopy}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                          copied ? 'bg-green-500 text-white' : 'bg-teal-500/20 text-teal-400 hover:bg-teal-500/30'
                        }`}
                      >
                        <Icon name={copied ? 'check' : 'copy'} className="w-4 h-4" />
                        {copied ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <pre className="whitespace-pre-wrap text-sm text-gray-300 font-mono max-h-64 overflow-auto">
                      {selectedTemplate ? generatePrompt() : prompt}
                    </pre>
                  </div>

                  {/* Stats Summary */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="card p-4 text-center">
                      <div className="text-2xl font-bold text-teal-400">{analysisResults?.tokens || 0}</div>
                      <div className="text-xs text-gray-500">Total Tokens</div>
                    </div>
                    <div className="card p-4 text-center">
                      <div className="text-2xl font-bold text-white">${analysisResults?.cost.toFixed(4) || '0.0000'}</div>
                      <div className="text-xs text-gray-500">Estimated Cost</div>
                    </div>
                    <div className="card p-4 text-center">
                      <div className="text-2xl font-bold text-green-400">✓</div>
                      <div className="text-xs text-gray-500">Security Checked</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-4">
                    <button
                      onClick={() => {
                        setCurrentStep('template');
                        setSelectedTemplate(null);
                        setPrompt('');
                      }}
                      className="btn-secondary flex-1"
                    >
                      <Icon name="plus" className="w-4 h-4 inline mr-2" />
                      Create Another
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Expert Mode */}
        {mode === 'expert' && (
          <ExpertMode
            prompt={prompt}
            setPrompt={setPrompt}
            selectedModel={selectedModel}
            setSelectedModel={setSelectedModel}
            analysisResults={analysisResults}
            onCopy={handleCopy}
            copied={copied}
          />
        )}
      </main>

      {/* History Panel */}
      {showHistory && (
        <div className="fixed inset-y-0 right-0 w-80 bg-[#12121a] border-l border-gray-800 z-50 animate-slide-in">
          <div className="p-4 border-b border-gray-800 flex items-center justify-between">
            <h3 className="font-semibold">Recent Prompts</h3>
            <button onClick={() => setShowHistory(false)} className="p-1 hover:text-teal-400">
              <Icon name="x" className="w-5 h-5" />
            </button>
          </div>
          <div className="p-4 space-y-3 overflow-auto max-h-[calc(100vh-64px)]">
            {history.length === 0 ? (
              <p className="text-gray-500 text-sm">No prompts yet. Create one to get started!</p>
            ) : (
              history.map((item, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setPrompt(item);
                    setShowHistory(false);
                    setMode('expert');
                  }}
                  className="w-full p-3 card text-left hover:border-teal-500/50 transition-all"
                >
                  <p className="text-sm text-gray-300 line-clamp-3">{item}</p>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Expert Mode Component
function ExpertMode({
  prompt,
  setPrompt,
  selectedModel,
  setSelectedModel,
  analysisResults,
  onCopy,
  copied,
}: {
  prompt: string;
  setPrompt: (p: string) => void;
  selectedModel: string;
  setSelectedModel: (m: string) => void;
  analysisResults: any;
  onCopy: () => void;
  copied: boolean;
}) {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [compressionLevel, setCompressionLevel] = useState<'low' | 'medium' | 'high'>('medium');
  const [result, setResult] = useState<React.ReactNode>(null);

  const features = [
    { id: 'variables', name: 'Variables', icon: 'variable' as const, desc: 'Extract & substitute' },
    { id: 'compress', name: 'Compress', icon: 'compress' as const, desc: 'Reduce tokens' },
    { id: 'security', name: 'Security', icon: 'shield' as const, desc: 'PII & injection' },
    { id: 'cost', name: 'Cost', icon: 'calculator' as const, desc: 'Token pricing' },
  ];

  const handleFeatureAction = (featureId: string) => {
    switch (featureId) {
      case 'variables': {
        const vars = extractVariables(prompt);
        setResult(
          <div className="space-y-3">
            <p className="text-sm text-gray-400">Found {vars.length} variables:</p>
            {vars.map(v => (
              <div key={v.name} className="flex items-center gap-2 text-sm">
                <code className="px-2 py-1 bg-teal-500/20 text-teal-300 rounded">{`{{${v.name}}}`}</code>
                {v.defaultValue && <span className="text-gray-500">default: {v.defaultValue}</span>}
                {v.type && <span className="text-gray-500">type: {v.type}</span>}
              </div>
            ))}
          </div>
        );
        break;
      }
      case 'compress': {
        const compressed = compressPrompt(prompt, { aggressiveness: compressionLevel });
        setPrompt(compressed.compressed);
        setResult(
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center">
                <div className="text-xl font-bold text-white">{compressed.originalTokens}</div>
                <div className="text-xs text-gray-500">Original</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-teal-400">{compressed.compressedTokens}</div>
                <div className="text-xs text-gray-500">Compressed</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-green-400">{compressed.savings}%</div>
                <div className="text-xs text-gray-500">Saved</div>
              </div>
            </div>
          </div>
        );
        break;
      }
      case 'security': {
        const pii = detectPII(prompt);
        const { redacted } = redactPII(prompt);
        const riskLevel = getInjectionRiskLevel(prompt);
        setPrompt(redacted);
        setResult(
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <div>
                <span className="text-sm text-gray-400">PII: </span>
                <span className={`font-bold ${pii.length ? 'text-red-400' : 'text-green-400'}`}>
                  {pii.length} found
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-400">Risk: </span>
                <span className={`font-bold capitalize ${
                  riskLevel === 'none' ? 'text-green-400' :
                  riskLevel === 'low' ? 'text-yellow-400' : 'text-red-400'
                }`}>
                  {riskLevel}
                </span>
              </div>
            </div>
            <p className="text-sm text-green-400">Prompt has been redacted.</p>
          </div>
        );
        break;
      }
      case 'cost': {
        const cost = calculateCost(prompt, 500, selectedModel);
        setResult(
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center">
                <div className="text-xl font-bold text-teal-400">{cost.inputTokens}</div>
                <div className="text-xs text-gray-500">Input Tokens</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-white">${cost.totalCost.toFixed(4)}</div>
                <div className="text-xs text-gray-500">Per Request</div>
              </div>
            </div>
          </div>
        );
        break;
      }
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Editor */}
      <div className="lg:col-span-2 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Prompt Editor</h2>
          <div className="flex items-center gap-2">
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm"
            >
              {MODEL_PRICING.map((m) => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>
            <button
              onClick={onCopy}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                copied ? 'bg-green-500 text-white' : 'bg-teal-500/20 text-teal-400 hover:bg-teal-500/30'
              }`}
            >
              <Icon name={copied ? 'check' : 'copy'} className="w-4 h-4" />
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="input h-96 resize-none font-mono text-sm"
          placeholder="Enter your prompt here...

Expert tips:
• Use {{variable:default|type}} for typed variables
• Chain prompts with conditional logic
• Test with different models for cost optimization
• Enable compression for production use"
        />

        {/* Quick Stats Bar */}
        {analysisResults && (
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Tokens:</span>
              <span className="text-teal-400 font-medium">{analysisResults.tokens}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Cost:</span>
              <span className="text-white font-medium">${analysisResults.cost.toFixed(4)}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">PII:</span>
              <span className={`font-medium ${analysisResults.piiCount ? 'text-red-400' : 'text-green-400'}`}>
                {analysisResults.piiCount}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Risk:</span>
              <span className={`font-medium capitalize ${
                analysisResults.injectionRisk === 'none' ? 'text-green-400' :
                analysisResults.injectionRisk === 'low' ? 'text-yellow-400' : 'text-red-400'
              }`}>
                {analysisResults.injectionRisk}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Features Panel */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Tools</h2>

        <div className="space-y-3">
          {features.map((f) => (
            <div key={f.id} className="card overflow-hidden">
              <button
                onClick={() => setActiveFeature(activeFeature === f.id ? null : f.id)}
                className="w-full p-4 flex items-center justify-between hover:bg-gray-800/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-teal-500/20 flex items-center justify-center text-teal-400">
                    <Icon name={f.icon} className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">{f.name}</div>
                    <div className="text-xs text-gray-500">{f.desc}</div>
                  </div>
                </div>
                <Icon
                  name="chevronDown"
                  className={`w-5 h-5 text-gray-500 transition-transform ${activeFeature === f.id ? 'rotate-180' : ''}`}
                />
              </button>

              {activeFeature === f.id && (
                <div className="p-4 border-t border-gray-800 bg-gray-900/50 animate-fade-in">
                  {f.id === 'compress' && (
                    <div className="mb-4">
                      <label className="text-xs text-gray-500 mb-2 block">Aggressiveness</label>
                      <div className="flex gap-2">
                        {(['low', 'medium', 'high'] as const).map((level) => (
                          <button
                            key={level}
                            onClick={() => setCompressionLevel(level)}
                            className={`flex-1 py-2 rounded-lg text-sm capitalize ${
                              compressionLevel === level
                                ? 'bg-teal-500 text-gray-900'
                                : 'bg-gray-800 text-gray-400'
                            }`}
                          >
                            {level}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {f.id === 'cost' && (
                    <div className="mb-4">
                      <label className="text-xs text-gray-500 mb-2 block">Model</label>
                      <select
                        value={selectedModel}
                        onChange={(e) => setSelectedModel(e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm"
                      >
                        {MODEL_PRICING.map((m) => (
                          <option key={m.id} value={m.id}>{m.name} - ${m.inputPricePerMillion}/1M</option>
                        ))}
                      </select>
                    </div>
                  )}

                  <button
                    onClick={() => handleFeatureAction(f.id)}
                    className="btn-primary w-full py-2 text-sm"
                    disabled={!prompt}
                  >
                    Run {f.name}
                  </button>

                  {result && activeFeature === f.id && (
                    <div className="mt-4 p-3 bg-gray-800/50 rounded-lg">
                      {result}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Tips */}
        <div className="card p-4">
          <div className="flex items-center gap-2 text-teal-400 mb-2">
            <Icon name="lightbulb" className="w-4 h-4" />
            <span className="text-sm font-medium">Pro Tip</span>
          </div>
          <p className="text-xs text-gray-400">
            Use compression on long prompts to save up to 30% on token costs.
            Always run security scan before using prompts with user-provided data.
          </p>
        </div>
      </div>
    </div>
  );
}
