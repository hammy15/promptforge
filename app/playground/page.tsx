'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Icons, Icon } from '../components/Icons';
import { Tooltip, HelpTooltip } from '../components/Tooltip';
import { ALL_TEMPLATES, TEMPLATE_CATEGORIES, PromptTemplate, getTemplatesByCategory } from '../components/PromptTemplates';
import { compressPrompt } from '@/features/smart-compression';
import { detectPII, redactPII, detectInjection, getInjectionRiskLevel } from '@/features/security';
import { extractVariables, substituteVariables } from '@/features/variable-system';
import { calculateCost, MODEL_PRICING } from '@/features/cost-calculator';
import AIAgentHelper from '../components/AIAgentHelper';
import Walkthrough from '../components/ui/Walkthrough';
import HelpButton from '../components/ui/HelpButton';
import { PLAYGROUND_WALKTHROUGH } from '../data/walkthrough-steps';

// Loading fallback component
function PlaygroundLoading() {
  return (
    <div className="min-h-screen bg-[#0a1929] flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4ECDC4] to-[#3EB489] flex items-center justify-center mx-auto mb-4 animate-pulse">
          <Icons.chart className="w-7 h-7 text-[#0a1929]" />
        </div>
        <p className="text-[#94a3b8]">Loading builder...</p>
      </div>
    </div>
  );
}

// Main export wrapped in Suspense
export default function PlaygroundPage() {
  return (
    <Suspense fallback={<PlaygroundLoading />}>
      <Playground />
    </Suspense>
  );
}

type Mode = 'simple' | 'expert';
type Step = 'industry' | 'template' | 'customize' | 'review' | 'export';

// Industry/use-case options for finance professionals
const INDUSTRY_OPTIONS = [
  {
    id: 'ma',
    name: 'M&A & Deal Work',
    description: 'Investment memos, term sheets, due diligence',
    icon: 'handshake',
    color: '#4ECDC4',
    categories: ['ma'],
  },
  {
    id: 'research',
    name: 'Investment Research',
    description: 'Due diligence, competitive intel, sector analysis',
    icon: 'search',
    color: '#14b8a6',
    categories: ['research'],
  },
  {
    id: 'strategy',
    name: 'Strategy & Planning',
    description: 'SWOT analysis, business plans, OKRs',
    icon: 'target',
    color: '#8b5cf6',
    categories: ['strategy'],
  },
  {
    id: 'reporting',
    name: 'Professional Reporting',
    description: 'Board decks, investor updates, executive summaries',
    icon: 'presentation',
    color: '#f97316',
    categories: ['reporting'],
  },
  {
    id: 'analysis',
    name: 'Financial Analysis',
    description: 'DCF, comps, earnings analysis, sensitivity',
    icon: 'chart',
    color: '#059669',
    categories: ['analysis'],
  },
];

// Export format options
const EXPORT_FORMATS = [
  { id: 'copy', name: 'Copy to Clipboard', icon: 'copy', description: 'Copy prompt text' },
  { id: 'excel', name: 'Excel-Ready', icon: 'spreadsheet', description: 'Formatted for spreadsheets' },
  { id: 'powerpoint', name: 'PowerPoint-Ready', icon: 'presentation', description: 'Slide-friendly format' },
  { id: 'memo', name: 'Memo Format', icon: 'document', description: 'Professional document' },
  { id: 'pdf', name: 'PDF Export', icon: 'documentChart', description: 'Download as PDF' },
];

// Model recommendations based on complexity
const MODEL_RECOMMENDATIONS = {
  beginner: { model: 'claude-3-5-haiku-20241022', reason: 'Fast and cost-effective for simple tasks' },
  intermediate: { model: 'claude-sonnet-4-20250514', reason: 'Balanced performance for standard analysis' },
  advanced: { model: 'claude-opus-4-5-20250514', reason: 'Maximum capability for complex financial modeling' },
};

function Playground() {
  const searchParams = useSearchParams();

  // Core state
  const [mode, setMode] = useState<Mode>('simple');
  const [currentStep, setCurrentStep] = useState<Step>('industry');
  const [prompt, setPrompt] = useState('');
  const [originalPrompt, setOriginalPrompt] = useState('');

  // Industry & Template state
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<PromptTemplate | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [variableValues, setVariableValues] = useState<Record<string, string>>({});
  const [searchQuery, setSearchQuery] = useState('');

  // Export state
  const [selectedExportFormat, setSelectedExportFormat] = useState('copy');
  const [auditMode, setAuditMode] = useState(false);

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
  const [showAgentHelper, setShowAgentHelper] = useState(false);
  const [showWalkthrough, setShowWalkthrough] = useState(false);

  // Handle URL parameters for direct template access
  useEffect(() => {
    const templateId = searchParams.get('template');
    const modeParam = searchParams.get('mode');

    if (modeParam === 'expert') {
      setMode('expert');
    }

    if (templateId) {
      const template = ALL_TEMPLATES.find(t => t.id === templateId);
      if (template) {
        handleSelectTemplate(template);
      }
    }
  }, [searchParams]);

  // Load history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('promptforge-history');
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  // Check if user has seen walkthrough
  useEffect(() => {
    const hasSeenTour = localStorage.getItem('promptforge-playground-tour');
    if (!hasSeenTour) {
      const timer = setTimeout(() => setShowWalkthrough(true), 500);
      return () => clearTimeout(timer);
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

  // Update model recommendation based on template difficulty
  useEffect(() => {
    if (selectedTemplate) {
      const recommendation = MODEL_RECOMMENDATIONS[selectedTemplate.difficulty];
      if (recommendation) {
        setSelectedModel(recommendation.model);
      }
    }
  }, [selectedTemplate]);

  // Handle industry selection
  const handleSelectIndustry = (industryId: string) => {
    setSelectedIndustry(industryId);
    const industry = INDUSTRY_OPTIONS.find(i => i.id === industryId);
    if (industry && industry.categories.length > 0) {
      setSelectedCategory(industry.categories[0]);
    }
    setCurrentStep('template');
  };

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

  // Format prompt for export
  const formatPromptForExport = (format: string) => {
    const finalPrompt = mode === 'simple' ? generatePrompt() : prompt;

    switch (format) {
      case 'excel':
        // Add markdown table formatting hints
        return `=== EXCEL-READY FORMAT ===\n\n${finalPrompt}\n\n=== OUTPUT INSTRUCTIONS ===\nPlease format all numerical data in tables with:\n- Column headers in Row 1\n- Currency values with $ symbol and 2 decimal places\n- Percentages with % symbol and 1 decimal place\n- Dates in YYYY-MM-DD format`;

      case 'powerpoint':
        // Add slide-friendly formatting
        return `=== PRESENTATION FORMAT ===\n\n${finalPrompt}\n\n=== OUTPUT INSTRUCTIONS ===\nPlease format output as:\n- Bullet points (max 5-7 per section)\n- Clear section headers\n- Key metrics highlighted\n- Executive summary at the top`;

      case 'memo':
        // Professional memo format
        const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        return `=== MEMO FORMAT ===\nDate: ${today}\nRe: ${selectedTemplate?.name || 'Analysis'}\n\n${finalPrompt}\n\n=== OUTPUT INSTRUCTIONS ===\nPlease structure the response as a professional memo with:\n- Executive Summary\n- Key Findings\n- Detailed Analysis\n- Recommendations\n- Appendix (if applicable)`;

      case 'pdf':
      case 'copy':
      default:
        return finalPrompt;
    }
  };

  // Copy to clipboard
  const handleCopy = async () => {
    const finalPrompt = formatPromptForExport(selectedExportFormat);
    await navigator.clipboard.writeText(finalPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);

    // Save to history
    const newHistory = [finalPrompt, ...history.slice(0, 9)];
    setHistory(newHistory);
    localStorage.setItem('promptforge-history', JSON.stringify(newHistory));

    // Log audit trail if enabled
    if (auditMode) {
      const auditEntry = {
        timestamp: new Date().toISOString(),
        template: selectedTemplate?.name || 'Custom',
        format: selectedExportFormat,
        tokens: analysisResults?.tokens || 0,
        cost: analysisResults?.cost || 0,
      };
      console.log('Audit Log:', auditEntry);
    }
  };

  // Optimize prompt
  const handleOptimize = () => {
    const currentPrompt = mode === 'simple' ? generatePrompt() : prompt;
    const result = compressPrompt(currentPrompt, { aggressiveness: 'medium' });
    setPrompt(result.compressed);
  };

  // Security scan
  const handleSecurityScan = () => {
    const currentPrompt = mode === 'simple' ? generatePrompt() : prompt;
    const { redacted } = redactPII(currentPrompt);
    setPrompt(redacted);
  };

  // Get templates for current category/industry
  const filteredTemplates = ALL_TEMPLATES.filter(t => {
    const matchesCategory = selectedCategory === 'all' || t.category === selectedCategory || t.categorySlug === selectedCategory;
    const matchesSearch = searchQuery === '' ||
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Steps for simple mode
  const steps: { id: Step; name: string; icon: keyof typeof Icons }[] = [
    { id: 'industry', name: 'Industry', icon: 'building' },
    { id: 'template', name: 'Template', icon: 'documentChart' },
    { id: 'customize', name: 'Details', icon: 'wand' },
    { id: 'review', name: 'Review', icon: 'eye' },
    { id: 'export', name: 'Export', icon: 'download' },
  ];

  const currentStepIndex = steps.findIndex(s => s.id === currentStep);

  // Render variable input based on type
  const renderVariableInput = (variable: { name: string; description: string; default: string; type?: string }) => {
    const type = variable.type || 'text';
    const commonClasses = "input";

    switch (type) {
      case 'currency':
        return (
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748b]">$</span>
            <input
              type="text"
              value={variableValues[variable.name] || ''}
              onChange={(e) => handleVariableChange(variable.name, e.target.value)}
              className={`${commonClasses} pl-8 tabular-nums`}
              placeholder={variable.default || '0.00'}
            />
          </div>
        );

      case 'percentage':
        return (
          <div className="relative">
            <input
              type="text"
              value={variableValues[variable.name] || ''}
              onChange={(e) => handleVariableChange(variable.name, e.target.value)}
              className={`${commonClasses} pr-8 tabular-nums`}
              placeholder={variable.default || '0'}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748b]">%</span>
          </div>
        );

      case 'number':
        return (
          <input
            type="number"
            value={variableValues[variable.name] || ''}
            onChange={(e) => handleVariableChange(variable.name, e.target.value)}
            className={`${commonClasses} tabular-nums`}
            placeholder={variable.default || '0'}
          />
        );

      case 'date':
        return (
          <input
            type="date"
            value={variableValues[variable.name] || ''}
            onChange={(e) => handleVariableChange(variable.name, e.target.value)}
            className={commonClasses}
          />
        );

      case 'select':
        const options = variable.default.split(',').map(o => o.trim());
        return (
          <select
            value={variableValues[variable.name] || options[0]}
            onChange={(e) => handleVariableChange(variable.name, e.target.value)}
            className={commonClasses}
          >
            {options.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        );

      case 'textarea':
        return (
          <textarea
            value={variableValues[variable.name] || ''}
            onChange={(e) => handleVariableChange(variable.name, e.target.value)}
            className={`${commonClasses} h-32 resize-none font-mono text-sm`}
            placeholder={variable.description}
          />
        );

      default:
        return (
          <input
            type="text"
            value={variableValues[variable.name] || ''}
            onChange={(e) => handleVariableChange(variable.name, e.target.value)}
            className={commonClasses}
            placeholder={variable.default || variable.description}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#0a1929]">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-mesh pointer-events-none opacity-30" />

      {/* Header */}
      <header className="relative z-10 border-b border-[#1e3a5f]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4ECDC4] to-[#3EB489] flex items-center justify-center">
                <Icons.chart className="w-6 h-6 text-[#0a1929]" />
              </div>
              <div>
                <span className="text-xl font-bold">
                  <span className="text-[#4ECDC4]">Prompt</span>
                  <span className="text-white">Forge</span>
                </span>
                <span className="ml-2 text-xs px-2 py-0.5 bg-[rgba(78,205,196,0.2)] text-[#4ECDC4] rounded-full">
                  {mode === 'simple' ? 'Simple' : 'Expert'}
                </span>
              </div>
            </Link>

            {/* Mode Toggle */}
            <div className="flex items-center gap-4">
              <div className="flex bg-[#0f2137] rounded-xl p-1 border border-[#1e3a5f]" data-tour="mode-toggle">
                <button
                  onClick={() => setMode('simple')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    mode === 'simple'
                      ? 'bg-[#4ECDC4] text-[#0a1929]'
                      : 'text-[#94a3b8] hover:text-white'
                  }`}
                >
                  <Icons.wand className="w-4 h-4 inline mr-2" />
                  Simple
                </button>
                <button
                  onClick={() => setMode('expert')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    mode === 'expert'
                      ? 'bg-[#4ECDC4] text-[#0a1929]'
                      : 'text-[#94a3b8] hover:text-white'
                  }`}
                >
                  <Icons.beaker className="w-4 h-4 inline mr-2" />
                  Expert
                </button>
              </div>

              <button
                onClick={() => setShowAgentHelper(!showAgentHelper)}
                className={`p-2 transition-colors ${showAgentHelper ? 'text-[#4ECDC4]' : 'text-[#64748b] hover:text-[#4ECDC4]'}`}
                title="AI Assistant"
              >
                <Icons.bot className="w-5 h-5" />
              </button>
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="p-2 text-[#64748b] hover:text-[#4ECDC4] transition-colors"
              >
                <Icons.history className="w-5 h-5" />
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
            <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
              {steps.map((step, index) => {
                const StepIcon = Icons[step.icon];
                return (
                  <div key={step.id} className="flex items-center">
                    <button
                      onClick={() => index <= currentStepIndex && setCurrentStep(step.id)}
                      disabled={index > currentStepIndex}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                        step.id === currentStep
                          ? 'bg-[#4ECDC4] text-[#0a1929]'
                          : index < currentStepIndex
                          ? 'bg-[rgba(78,205,196,0.2)] text-[#4ECDC4] hover:bg-[rgba(78,205,196,0.3)]'
                          : 'bg-[#0f2137] text-[#64748b] border border-[#1e3a5f]'
                      }`}
                    >
                      <span className="w-6 h-6 rounded-full bg-current/20 flex items-center justify-center text-sm">
                        {index + 1}
                      </span>
                      <span className="hidden sm:inline">{step.name}</span>
                    </button>
                    {index < steps.length - 1 && (
                      <Icons.chevronRight className="w-4 h-4 text-[#334155] mx-2" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Step Content */}
            <div className="animate-fade-in">
              {/* Step 1: Industry Selection */}
              {currentStep === 'industry' && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-white mb-2">Select Your Domain</h2>
                    <p className="text-[#94a3b8]">Choose your primary use case to see relevant templates</p>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                    {INDUSTRY_OPTIONS.map((industry) => {
                      const IndustryIcon = Icons[industry.icon as keyof typeof Icons];
                      return (
                        <button
                          key={industry.id}
                          onClick={() => handleSelectIndustry(industry.id)}
                          className="card p-6 text-left hover:border-[#4ECDC4] transition-all group"
                        >
                          <div className="flex items-start gap-4">
                            <div
                              className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                              style={{ background: `${industry.color}20` }}
                            >
                              {IndustryIcon && <IndustryIcon className="w-7 h-7" style={{ color: industry.color }} />}
                            </div>
                            <div>
                              <h3 className="font-semibold text-white group-hover:text-[#4ECDC4] transition-colors">
                                {industry.name}
                              </h3>
                              <p className="text-sm text-[#64748b] mt-1">{industry.description}</p>
                            </div>
                          </div>
                        </button>
                      );
                    })}

                    {/* Browse All */}
                    <button
                      onClick={() => {
                        setSelectedIndustry(null);
                        setSelectedCategory('all');
                        setCurrentStep('template');
                      }}
                      className="card p-6 text-left hover:border-[#4ECDC4] transition-all group border-dashed"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl border-2 border-dashed border-[#334155] flex items-center justify-center">
                          <Icons.search className="w-7 h-7 text-[#64748b]" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white group-hover:text-[#4ECDC4] transition-colors">
                            Browse All Templates
                          </h3>
                          <p className="text-sm text-[#64748b] mt-1">View all 18 finance templates</p>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Template Selection */}
              {currentStep === 'template' && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-white mb-2">Choose a Template</h2>
                    <p className="text-[#94a3b8]">Select a financial analysis template or start from scratch</p>
                  </div>

                  {/* Search & Categories */}
                  <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    {/* Categories */}
                    <div className="flex flex-wrap justify-center gap-2">
                      {TEMPLATE_CATEGORIES.map(cat => (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedCategory(cat.id)}
                          className={`px-4 py-2 rounded-xl text-sm transition-all ${
                            selectedCategory === cat.id
                              ? 'bg-[rgba(78,205,196,0.15)] text-[#4ECDC4] border border-[rgba(78,205,196,0.3)]'
                              : 'bg-[#0f2137] text-[#94a3b8] hover:text-white border border-[#1e3a5f]'
                          }`}
                        >
                          <span className="mr-2">{cat.icon}</span>
                          {cat.name}
                        </button>
                      ))}
                    </div>

                    {/* Search */}
                    <div className="relative">
                      <Icons.search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b]" />
                      <input
                        type="text"
                        placeholder="Search templates..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 pr-4 py-2 bg-[#0f2137] border border-[#1e3a5f] rounded-lg text-sm text-white placeholder-[#64748b] focus:border-[#4ECDC4] focus:outline-none w-64"
                      />
                    </div>
                  </div>

                  {/* Template Grid */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredTemplates.map(template => (
                      <button
                        key={template.id}
                        onClick={() => handleSelectTemplate(template)}
                        className="card p-5 text-left hover:border-[#4ECDC4] transition-all group"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4ECDC4] to-[#3EB489] flex items-center justify-center text-2xl shrink-0">
                            {template.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-white group-hover:text-[#4ECDC4] transition-colors truncate">
                              {template.name}
                            </h3>
                            <p className="text-sm text-[#64748b] mt-1 line-clamp-2">{template.description}</p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              <span className={`badge badge-${template.difficulty}`}>
                                {template.difficulty}
                              </span>
                              <span className="text-xs text-[#64748b]">{template.estimatedTime}</span>
                              {template.outputFormats.includes('excel') && (
                                <span className="badge badge-excel text-xs">Excel</span>
                              )}
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
                      className="card p-5 text-left hover:border-[#4ECDC4] transition-all group border-dashed"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl border-2 border-dashed border-[#334155] flex items-center justify-center">
                          <Icons.plus className="w-6 h-6 text-[#64748b]" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white group-hover:text-[#4ECDC4] transition-colors">
                            Start from Scratch
                          </h3>
                          <p className="text-sm text-[#64748b] mt-1">Write your own prompt</p>
                        </div>
                      </div>
                    </button>
                  </div>

                  {/* Back button */}
                  <div className="flex justify-center">
                    <button
                      onClick={() => setCurrentStep('industry')}
                      className="btn-secondary"
                    >
                      <Icons.arrowLeft className="w-4 h-4 inline mr-2" />
                      Back to Industry Selection
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Customize */}
              {currentStep === 'customize' && (
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Left: Variables or Editor */}
                  <div className="space-y-4" data-tour="variables-panel">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold text-white">
                        {selectedTemplate ? 'Financial Details' : 'Write Your Prompt'}
                      </h2>
                      <HelpTooltip content="Fill in each field to customize your financial analysis prompt." />
                    </div>

                    {selectedTemplate ? (
                      <div className="space-y-4">
                        {/* Template info card */}
                        <div className="card p-4 bg-[rgba(78,205,196,0.1)] border-[rgba(78,205,196,0.2)]">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{selectedTemplate.icon}</span>
                            <div>
                              <h3 className="font-semibold text-white">{selectedTemplate.name}</h3>
                              <div className="flex gap-2 mt-1">
                                <span className={`badge badge-${selectedTemplate.difficulty}`}>
                                  {selectedTemplate.difficulty}
                                </span>
                                <span className="text-xs text-[#94a3b8]">{selectedTemplate.estimatedTime}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Variable inputs */}
                        {selectedTemplate.variables.map(variable => (
                          <div key={variable.name} className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-medium text-[#94a3b8]">
                              <span className="text-[#4ECDC4]">{`{{${variable.name}}}`}</span>
                              {variable.type && (
                                <span className="text-xs px-1.5 py-0.5 bg-[#1e3a5f] rounded text-[#64748b]">
                                  {variable.type}
                                </span>
                              )}
                              <HelpTooltip content={variable.description} />
                            </label>
                            {renderVariableInput(variable)}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="input h-64 resize-none font-mono text-sm"
                        data-tour="prompt-editor"
                        placeholder="Write your financial analysis prompt here...

Tips for finance prompts:
• Specify the company/asset being analyzed
• Include relevant financial metrics
• Define the analysis timeframe
• Use {{variables}} for dynamic content
• Request specific output formats (tables, charts)"
                      />
                    )}

                    <div className="flex gap-3">
                      <button
                        onClick={() => setCurrentStep('template')}
                        className="btn-secondary flex-1"
                      >
                        <Icons.arrowLeft className="w-4 h-4 inline mr-2" />
                        Back
                      </button>
                      <button
                        onClick={() => setCurrentStep('review')}
                        disabled={selectedTemplate ? Object.values(variableValues).some(v => !v) : !prompt}
                        className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Continue to Review
                        <Icons.arrowRight className="w-4 h-4 inline ml-2" />
                      </button>
                    </div>
                  </div>

                  {/* Right: Preview */}
                  <div className="space-y-4" data-tour="output-panel">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold text-white">Live Preview</h2>
                      <div className="flex items-center gap-2 text-sm text-[#64748b]">
                        <Icons.eye className="w-4 h-4" />
                        Updates as you type
                      </div>
                    </div>

                    <div className="card p-6 min-h-[300px]">
                      <pre className="whitespace-pre-wrap text-sm text-[#94a3b8] font-mono">
                        {selectedTemplate ? generatePrompt() : prompt || 'Your prompt will appear here...'}
                      </pre>
                    </div>

                    {/* Quick Stats */}
                    {analysisResults && (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="card p-4 text-center">
                          <div className="text-2xl font-bold text-[#4ECDC4] tabular-nums">{analysisResults.tokens}</div>
                          <div className="text-xs text-[#64748b]">Tokens</div>
                        </div>
                        <div className="card p-4 text-center">
                          <div className="text-2xl font-bold text-white tabular-nums">${analysisResults.cost.toFixed(4)}</div>
                          <div className="text-xs text-[#64748b]">Est. Cost</div>
                        </div>
                      </div>
                    )}

                    {/* Model recommendation */}
                    {selectedTemplate && (
                      <div className="card p-4 bg-[rgba(20,184,166,0.1)] border-[rgba(20,184,166,0.2)]">
                        <div className="flex items-center gap-2 text-[#14b8a6] mb-2">
                          <Icons.lightbulb className="w-4 h-4" />
                          <span className="text-sm font-medium">Recommended Model</span>
                        </div>
                        <p className="text-xs text-[#94a3b8]">
                          {MODEL_RECOMMENDATIONS[selectedTemplate.difficulty].reason}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 4: Review */}
              {currentStep === 'review' && (
                <div className="max-w-4xl mx-auto space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-white mb-2">Review & Optimize</h2>
                    <p className="text-[#94a3b8]">Review your prompt and apply optimizations</p>
                  </div>

                  {/* Analysis Cards */}
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="card p-4 text-center">
                      <div className="text-3xl font-bold text-[#4ECDC4] tabular-nums">{analysisResults?.tokens || 0}</div>
                      <div className="text-sm text-[#64748b]">Tokens</div>
                    </div>
                    <div className="card p-4 text-center">
                      <div className="text-3xl font-bold text-[#14b8a6] tabular-nums">{analysisResults?.compressionSavings || 0}%</div>
                      <div className="text-sm text-[#64748b]">Can Save</div>
                    </div>
                    <div className="card p-4 text-center">
                      <div className={`text-3xl font-bold tabular-nums ${analysisResults?.piiCount ? 'text-[#dc2626]' : 'text-[#059669]'}`}>
                        {analysisResults?.piiCount || 0}
                      </div>
                      <div className="text-sm text-[#64748b]">PII Found</div>
                    </div>
                    <div className="card p-4 text-center">
                      <div className={`text-3xl font-bold capitalize ${
                        analysisResults?.injectionRisk === 'none' ? 'text-[#059669]' :
                        analysisResults?.injectionRisk === 'low' ? 'text-[#4ECDC4]' :
                        'text-[#dc2626]'
                      }`}>
                        {analysisResults?.injectionRisk || 'None'}
                      </div>
                      <div className="text-sm text-[#64748b]">Risk Level</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <button
                      onClick={handleOptimize}
                      className="card p-5 text-left hover:border-[#4ECDC4] transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[rgba(78,205,196,0.2)] flex items-center justify-center text-[#4ECDC4]">
                          <Icons.compress className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white group-hover:text-[#4ECDC4]">Compress Prompt</h3>
                          <p className="text-sm text-[#64748b]">Remove filler words, save ~{analysisResults?.compressionSavings || 0}% tokens</p>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={handleSecurityScan}
                      className="card p-5 text-left hover:border-[#4ECDC4] transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[rgba(220,38,38,0.2)] flex items-center justify-center text-[#dc2626]">
                          <Icons.shield className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white group-hover:text-[#4ECDC4]">Redact PII</h3>
                          <p className="text-sm text-[#64748b]">Remove {analysisResults?.piiCount || 0} sensitive items found</p>
                        </div>
                      </div>
                    </button>
                  </div>

                  {/* Preview */}
                  <div className="card p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-[#64748b]">Prompt Preview</span>
                      {selectedTemplate && (
                        <div className="flex gap-2">
                          {selectedTemplate.outputFormats.map(format => (
                            <span key={format} className={`badge badge-${format} text-xs`}>
                              {format.toUpperCase()}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <pre className="whitespace-pre-wrap text-sm text-[#94a3b8] font-mono max-h-64 overflow-auto">
                      {selectedTemplate ? generatePrompt() : prompt}
                    </pre>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => setCurrentStep('customize')}
                      className="btn-secondary flex-1"
                    >
                      <Icons.arrowLeft className="w-4 h-4 inline mr-2" />
                      Back
                    </button>
                    <button
                      onClick={() => setCurrentStep('export')}
                      className="btn-primary flex-1"
                    >
                      Continue to Export
                      <Icons.arrowRight className="w-4 h-4 inline ml-2" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 5: Export */}
              {currentStep === 'export' && (
                <div className="max-w-4xl mx-auto space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-white mb-2">Your Prompt is Ready!</h2>
                    <p className="text-[#94a3b8]">Choose your export format and copy</p>
                  </div>

                  {/* Export Format Selection */}
                  <div className="grid md:grid-cols-5 gap-3">
                    {EXPORT_FORMATS.map(format => {
                      const FormatIcon = Icons[format.icon as keyof typeof Icons];
                      return (
                        <button
                          key={format.id}
                          onClick={() => setSelectedExportFormat(format.id)}
                          className={`card p-4 text-center transition-all ${
                            selectedExportFormat === format.id
                              ? 'border-[#4ECDC4] bg-[rgba(78,205,196,0.1)]'
                              : 'hover:border-[#2d4a6f]'
                          }`}
                        >
                          {FormatIcon && <FormatIcon className={`w-6 h-6 mx-auto mb-2 ${selectedExportFormat === format.id ? 'text-[#4ECDC4]' : 'text-[#64748b]'}`} />}
                          <div className={`text-sm font-medium ${selectedExportFormat === format.id ? 'text-[#4ECDC4]' : 'text-white'}`}>
                            {format.name}
                          </div>
                          <div className="text-xs text-[#64748b] mt-1">{format.description}</div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Audit Mode Toggle */}
                  <div className="card p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Icons.documentChart className="w-5 h-5 text-[#64748b]" />
                        <div>
                          <div className="text-sm font-medium text-white">Audit Mode</div>
                          <div className="text-xs text-[#64748b]">Log exports for compliance tracking</div>
                        </div>
                      </div>
                      <button
                        onClick={() => setAuditMode(!auditMode)}
                        className={`w-12 h-6 rounded-full transition-colors ${auditMode ? 'bg-[#4ECDC4]' : 'bg-[#334155]'}`}
                      >
                        <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${auditMode ? 'translate-x-6' : 'translate-x-0.5'}`} />
                      </button>
                    </div>
                  </div>

                  {/* Final Prompt */}
                  <div className="card p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-[#64748b]">
                        {selectedExportFormat === 'copy' ? 'Final Prompt' : `${EXPORT_FORMATS.find(f => f.id === selectedExportFormat)?.name} Format`}
                      </span>
                      <button
                        onClick={handleCopy}
                        data-tour="run-button"
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                          copied ? 'bg-[#059669] text-white' : 'bg-[rgba(78,205,196,0.2)] text-[#4ECDC4] hover:bg-[rgba(78,205,196,0.3)]'
                        }`}
                      >
                        <Icons.copy className="w-4 h-4" />
                        {copied ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <pre className="whitespace-pre-wrap text-sm text-[#94a3b8] font-mono max-h-64 overflow-auto">
                      {formatPromptForExport(selectedExportFormat)}
                    </pre>
                  </div>

                  {/* Stats Summary */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="card p-4 text-center">
                      <div className="text-2xl font-bold text-[#4ECDC4] tabular-nums">{analysisResults?.tokens || 0}</div>
                      <div className="text-xs text-[#64748b]">Total Tokens</div>
                    </div>
                    <div className="card p-4 text-center">
                      <div className="text-2xl font-bold text-white tabular-nums">${analysisResults?.cost.toFixed(4) || '0.0000'}</div>
                      <div className="text-xs text-[#64748b]">Estimated Cost</div>
                    </div>
                    <div className="card p-4 text-center">
                      <div className="text-2xl font-bold text-[#059669]">✓</div>
                      <div className="text-xs text-[#64748b]">Security Checked</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-4">
                    <button
                      onClick={() => setCurrentStep('review')}
                      className="btn-secondary flex-1"
                    >
                      <Icons.arrowLeft className="w-4 h-4 inline mr-2" />
                      Back
                    </button>
                    <button
                      onClick={() => {
                        setCurrentStep('industry');
                        setSelectedIndustry(null);
                        setSelectedTemplate(null);
                        setPrompt('');
                        setVariableValues({});
                      }}
                      className="btn-primary flex-1"
                    >
                      <Icons.plus className="w-4 h-4 inline mr-2" />
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
            auditMode={auditMode}
            setAuditMode={setAuditMode}
          />
        )}
      </main>

      {/* History Panel */}
      {showHistory && (
        <div className="fixed inset-y-0 right-0 w-80 bg-[#0f2137] border-l border-[#1e3a5f] z-50 animate-slide-in">
          <div className="p-4 border-b border-[#1e3a5f] flex items-center justify-between">
            <h3 className="font-semibold text-white">Recent Prompts</h3>
            <button onClick={() => setShowHistory(false)} className="p-1 hover:text-[#4ECDC4]">
              <Icons.x className="w-5 h-5" />
            </button>
          </div>
          <div className="p-4 space-y-3 overflow-auto max-h-[calc(100vh-64px)]">
            {history.length === 0 ? (
              <p className="text-[#64748b] text-sm">No prompts yet. Create one to get started!</p>
            ) : (
              history.map((item, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setPrompt(item);
                    setShowHistory(false);
                    setMode('expert');
                  }}
                  className="w-full p-3 card text-left hover:border-[#4ECDC4] transition-all"
                >
                  <p className="text-sm text-[#94a3b8] line-clamp-3">{item}</p>
                </button>
              ))
            )}
          </div>
        </div>
      )}

      {/* Walkthrough */}
      <Walkthrough
        steps={PLAYGROUND_WALKTHROUGH}
        isOpen={showWalkthrough}
        onClose={() => setShowWalkthrough(false)}
        onComplete={() => setShowWalkthrough(false)}
        storageKey="promptforge-playground-tour"
      />

      {/* Help Button */}
      {!showWalkthrough && (
        <HelpButton onClick={() => setShowWalkthrough(true)} label="Help" />
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
  auditMode,
  setAuditMode,
}: {
  prompt: string;
  setPrompt: (p: string) => void;
  selectedModel: string;
  setSelectedModel: (m: string) => void;
  analysisResults: any;
  onCopy: () => void;
  copied: boolean;
  auditMode: boolean;
  setAuditMode: (v: boolean) => void;
}) {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [compressionLevel, setCompressionLevel] = useState<'low' | 'medium' | 'high'>('medium');
  const [outputFormat, setOutputFormat] = useState<'standard' | 'excel' | 'slides' | 'memo'>('standard');
  const [result, setResult] = useState<React.ReactNode>(null);

  const features = [
    { id: 'variables', name: 'Variables', icon: 'variable' as const, desc: 'Extract & substitute' },
    { id: 'compress', name: 'Compress', icon: 'compress' as const, desc: 'Reduce tokens' },
    { id: 'security', name: 'Security', icon: 'shield' as const, desc: 'PII & injection' },
    { id: 'cost', name: 'Cost', icon: 'calculator' as const, desc: 'Token pricing' },
    { id: 'format', name: 'Format', icon: 'spreadsheet' as const, desc: 'Output presets' },
  ];

  const handleFeatureAction = (featureId: string) => {
    switch (featureId) {
      case 'variables': {
        const vars = extractVariables(prompt);
        setResult(
          <div className="space-y-3">
            <p className="text-sm text-[#94a3b8]">Found {vars.length} variables:</p>
            {vars.map(v => (
              <div key={v.name} className="flex items-center gap-2 text-sm">
                <code className="px-2 py-1 bg-[rgba(78,205,196,0.2)] text-[#4ECDC4] rounded">{`{{${v.name}}}`}</code>
                {v.defaultValue && <span className="text-[#64748b]">default: {v.defaultValue}</span>}
                {v.type && <span className="text-[#64748b]">type: {v.type}</span>}
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
                <div className="text-xl font-bold text-white tabular-nums">{compressed.originalTokens}</div>
                <div className="text-xs text-[#64748b]">Original</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-[#4ECDC4] tabular-nums">{compressed.compressedTokens}</div>
                <div className="text-xs text-[#64748b]">Compressed</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-[#059669] tabular-nums">{compressed.savings}%</div>
                <div className="text-xs text-[#64748b]">Saved</div>
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
                <span className="text-sm text-[#94a3b8]">PII: </span>
                <span className={`font-bold ${pii.length ? 'text-[#dc2626]' : 'text-[#059669]'}`}>
                  {pii.length} found
                </span>
              </div>
              <div>
                <span className="text-sm text-[#94a3b8]">Risk: </span>
                <span className={`font-bold capitalize ${
                  riskLevel === 'none' ? 'text-[#059669]' :
                  riskLevel === 'low' ? 'text-[#4ECDC4]' : 'text-[#dc2626]'
                }`}>
                  {riskLevel}
                </span>
              </div>
            </div>
            <p className="text-sm text-[#059669]">Prompt has been redacted.</p>
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
                <div className="text-xl font-bold text-[#4ECDC4] tabular-nums">{cost.inputTokens}</div>
                <div className="text-xs text-[#64748b]">Input Tokens</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-white tabular-nums">${cost.totalCost.toFixed(4)}</div>
                <div className="text-xs text-[#64748b]">Per Request</div>
              </div>
            </div>
          </div>
        );
        break;
      }
      case 'format': {
        let formatInstructions = '';
        switch (outputFormat) {
          case 'excel':
            formatInstructions = '\n\n=== OUTPUT FORMAT: EXCEL ===\nPlease format all output as:\n- Tabular data with clear headers\n- Currency values: $X,XXX.XX\n- Percentages: X.X%\n- Dates: YYYY-MM-DD';
            break;
          case 'slides':
            formatInstructions = '\n\n=== OUTPUT FORMAT: SLIDES ===\nPlease format all output as:\n- Bullet points (max 5 per section)\n- Clear section headers\n- Key metrics highlighted\n- Executive summary first';
            break;
          case 'memo':
            formatInstructions = '\n\n=== OUTPUT FORMAT: MEMO ===\nPlease structure as:\n- Executive Summary\n- Key Findings\n- Detailed Analysis\n- Recommendations\n- Appendix';
            break;
        }
        if (formatInstructions && !prompt.includes('OUTPUT FORMAT')) {
          setPrompt(prompt + formatInstructions);
        }
        setResult(
          <div className="text-sm text-[#059669]">
            Output format instructions added to prompt.
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
          <h2 className="text-xl font-bold text-white">Prompt Editor</h2>
          <div className="flex items-center gap-2">
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="bg-[#0f2137] border border-[#1e3a5f] rounded-lg px-3 py-2 text-sm text-white"
              data-tour="model-selector"
            >
              {MODEL_PRICING.map((m) => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>
            <button
              onClick={onCopy}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                copied ? 'bg-[#059669] text-white' : 'bg-[rgba(78,205,196,0.2)] text-[#4ECDC4] hover:bg-[rgba(78,205,196,0.3)]'
              }`}
            >
              <Icons.copy className="w-4 h-4" />
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="input h-96 resize-none font-mono text-sm"
          data-tour="prompt-editor"
          placeholder="Enter your financial analysis prompt here...

Expert tips:
• Use {{variable:default|type}} for typed variables
• Supported types: text, currency, percentage, number, date, select
• Add output format instructions for Excel/slides/memo
• Enable audit mode for compliance tracking"
        />

        {/* Quick Stats Bar */}
        {analysisResults && (
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-[#64748b]">Tokens:</span>
              <span className="text-[#4ECDC4] font-medium tabular-nums">{analysisResults.tokens}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#64748b]">Cost:</span>
              <span className="text-white font-medium tabular-nums">${analysisResults.cost.toFixed(4)}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#64748b]">PII:</span>
              <span className={`font-medium tabular-nums ${analysisResults.piiCount ? 'text-[#dc2626]' : 'text-[#059669]'}`}>
                {analysisResults.piiCount}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#64748b]">Risk:</span>
              <span className={`font-medium capitalize ${
                analysisResults.injectionRisk === 'none' ? 'text-[#059669]' :
                analysisResults.injectionRisk === 'low' ? 'text-[#4ECDC4]' : 'text-[#dc2626]'
              }`}>
                {analysisResults.injectionRisk}
              </span>
            </div>
          </div>
        )}

        {/* Audit Mode Toggle */}
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icons.documentChart className="w-5 h-5 text-[#64748b]" />
              <div>
                <div className="text-sm font-medium text-white">Audit Mode</div>
                <div className="text-xs text-[#64748b]">Log exports for compliance tracking</div>
              </div>
            </div>
            <button
              onClick={() => setAuditMode(!auditMode)}
              className={`w-12 h-6 rounded-full transition-colors ${auditMode ? 'bg-[#4ECDC4]' : 'bg-[#334155]'}`}
            >
              <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${auditMode ? 'translate-x-6' : 'translate-x-0.5'}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Features Panel */}
      <div className="space-y-4" data-tour="variables-panel">
        <h2 className="text-xl font-bold text-white">Tools</h2>

        <div className="space-y-3">
          {features.map((f) => {
            const FeatureIcon = Icons[f.icon as keyof typeof Icons];
            return (
              <div key={f.id} className="card overflow-hidden">
                <button
                  onClick={() => setActiveFeature(activeFeature === f.id ? null : f.id)}
                  className="w-full p-4 flex items-center justify-between hover:bg-[#162a45] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[rgba(78,205,196,0.2)] flex items-center justify-center text-[#4ECDC4]">
                      {FeatureIcon && <FeatureIcon className="w-5 h-5" />}
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-white">{f.name}</div>
                      <div className="text-xs text-[#64748b]">{f.desc}</div>
                    </div>
                  </div>
                  <Icons.chevronDown
                    className={`w-5 h-5 text-[#64748b] transition-transform ${activeFeature === f.id ? 'rotate-180' : ''}`}
                  />
                </button>

                {activeFeature === f.id && (
                  <div className="p-4 border-t border-[#1e3a5f] bg-[#0a1929] animate-fade-in">
                    {f.id === 'compress' && (
                      <div className="mb-4">
                        <label className="text-xs text-[#64748b] mb-2 block">Aggressiveness</label>
                        <div className="flex gap-2">
                          {(['low', 'medium', 'high'] as const).map((level) => (
                            <button
                              key={level}
                              onClick={() => setCompressionLevel(level)}
                              className={`flex-1 py-2 rounded-lg text-sm capitalize ${
                                compressionLevel === level
                                  ? 'bg-[#4ECDC4] text-[#0a1929]'
                                  : 'bg-[#0f2137] text-[#94a3b8] border border-[#1e3a5f]'
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
                        <label className="text-xs text-[#64748b] mb-2 block">Model</label>
                        <select
                          value={selectedModel}
                          onChange={(e) => setSelectedModel(e.target.value)}
                          className="w-full bg-[#0f2137] border border-[#1e3a5f] rounded-lg px-3 py-2 text-sm text-white"
                        >
                          {MODEL_PRICING.map((m) => (
                            <option key={m.id} value={m.id}>{m.name} - ${m.inputPricePerMillion}/1M</option>
                          ))}
                        </select>
                      </div>
                    )}

                    {f.id === 'format' && (
                      <div className="mb-4">
                        <label className="text-xs text-[#64748b] mb-2 block">Output Format</label>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { id: 'standard', label: 'Standard' },
                            { id: 'excel', label: 'Excel Table' },
                            { id: 'slides', label: 'Slide Bullets' },
                            { id: 'memo', label: 'Memo Format' },
                          ].map((fmt) => (
                            <button
                              key={fmt.id}
                              onClick={() => setOutputFormat(fmt.id as any)}
                              className={`py-2 rounded-lg text-sm ${
                                outputFormat === fmt.id
                                  ? 'bg-[#4ECDC4] text-[#0a1929]'
                                  : 'bg-[#0f2137] text-[#94a3b8] border border-[#1e3a5f]'
                              }`}
                            >
                              {fmt.label}
                            </button>
                          ))}
                        </div>
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
                      <div className="mt-4 p-3 bg-[#0f2137] rounded-lg border border-[#1e3a5f]">
                        {result}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Finance Pro Tips */}
        <div className="card p-4 bg-[rgba(78,205,196,0.1)] border-[rgba(78,205,196,0.2)]">
          <div className="flex items-center gap-2 text-[#4ECDC4] mb-2">
            <Icons.lightbulb className="w-4 h-4" />
            <span className="text-sm font-medium">Finance Pro Tip</span>
          </div>
          <p className="text-xs text-[#94a3b8]">
            Use the Format tool to add Excel-ready or slide-friendly output instructions.
            Enable Audit Mode for compliance tracking in regulated environments.
          </p>
        </div>
      </div>

      {/* AI Agent Helper */}
      <AIAgentHelper
        isOpen={showAgentHelper}
        onClose={() => setShowAgentHelper(false)}
        currentPrompt={prompt}
      />
    </div>
  );
}
