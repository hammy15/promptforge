'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import SplashScreen from './components/SplashScreen';
import Onboarding from './components/Onboarding';
import Walkthrough from './components/ui/Walkthrough';
import Tooltip from './components/ui/Tooltip';
import HelpButton from './components/ui/HelpButton';
import { Icons } from './components/Icons';
import { PROMPT_TEMPLATES, TEMPLATE_CATEGORIES } from './components/PromptTemplates';
import { DASHBOARD_WALKTHROUGH, TOOLTIPS } from './data/walkthrough-steps';

// Quick start workflows for different roles
const quickStartWorkflows = [
  { id: 'ib', name: 'Investment Banking', icon: 'building', templates: ['dcf-valuation', 'comparable-companies', 'pitch-deck'], color: '#d4a853' },
  { id: 'pe', name: 'Private Equity', icon: 'briefcase', templates: ['investment-memo', 'due-diligence', 'term-sheet'], color: '#14b8a6' },
  { id: 'corp', name: 'Corporate Finance', icon: 'chart', templates: ['business-plan', 'board-deck', 'investor-update'], color: '#8b5cf6' },
  { id: 'strategy', name: 'Strategy Consulting', icon: 'target', templates: ['swot-analysis', 'competitive-intelligence', 'tam-sam-som'], color: '#f97316' },
];

// Mock recent work for demonstration
const recentWork = [
  { name: 'DCF - Acme Corp', template: 'DCF Valuation', time: '2 hours ago', status: 'completed' },
  { name: 'DD Framework - TechCo', template: 'Due Diligence', time: '5 hours ago', status: 'in-progress' },
  { name: 'Q4 Board Deck', template: 'Board Deck', time: '1 day ago', status: 'completed' },
];

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showWalkthrough, setShowWalkthrough] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const hasOnboarded = localStorage.getItem('promptforge-onboarded');
    if (!hasOnboarded) {
      setShowOnboarding(true);
    }
  }, []);

  // Check for dashboard tour after onboarding
  useEffect(() => {
    if (isLoaded && !showOnboarding) {
      const hasSeenTour = localStorage.getItem('promptforge-dashboard-tour');
      if (!hasSeenTour) {
        const timer = setTimeout(() => setShowWalkthrough(true), 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [isLoaded, showOnboarding]);

  const handleSplashComplete = () => {
    setShowSplash(false);
    setIsLoaded(true);
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
  };

  const handleShowHelp = () => {
    localStorage.removeItem('promptforge-dashboard-tour');
    setShowWalkthrough(true);
  };

  const filteredTemplates = PROMPT_TEMPLATES.filter(t => {
    const matchesCategory = activeCategory === 'all' || t.category === activeCategory;
    const matchesSearch = searchQuery === '' ||
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} duration={3000} />}
      {!showSplash && showOnboarding && <Onboarding onComplete={handleOnboardingComplete} />}

      <main className={`min-h-screen transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="fixed inset-0 bg-gradient-mesh pointer-events-none" />

        {/* Navigation */}
        <nav className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-[#1e3a5f]">
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#d4a853] to-[#b8953f] flex items-center justify-center">
                <Icons.chart className="w-6 h-6 text-[#0a1929]" />
              </div>
              <span className="text-xl font-bold">
                <span className="text-[#d4a853]">Prompt</span>
                <span className="text-white">Forge</span>
              </span>
            </Link>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-1">
              <Link href="/" className="px-4 py-2 text-white font-medium rounded-lg bg-[rgba(212,168,83,0.1)]">
                Dashboard
              </Link>
              <Tooltip content="Create prompts with our guided wizard" position="bottom">
                <Link href="/builder" data-tour="nav-builder" className="px-4 py-2 text-[#94a3b8] hover:text-white transition-colors rounded-lg hover:bg-[#162a45]">
                  Prompt Builder
                </Link>
              </Tooltip>
              <Tooltip content="Browse your saved prompts and templates" position="bottom">
                <Link href="/prompts" data-tour="nav-prompts" className="px-4 py-2 text-[#94a3b8] hover:text-white transition-colors rounded-lg hover:bg-[#162a45]">
                  My Prompts
                </Link>
              </Tooltip>
              <Tooltip content="Test prompts with AI models" position="bottom">
                <Link href="/playground" data-tour="nav-playground" className="px-4 py-2 text-[#94a3b8] hover:text-white transition-colors rounded-lg hover:bg-[#162a45]">
                  Playground
                </Link>
              </Tooltip>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShowHelp}
              className="p-2 text-[#64748b] hover:text-[#d4a853] transition-colors"
              title="Show onboarding"
            >
              <Icons.help className="w-5 h-5" />
            </button>
            <button className="p-2 text-[#64748b] hover:text-white transition-colors">
              <Icons.settings className="w-5 h-5" />
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#d4a853] to-[#b8953f] flex items-center justify-center text-[#0a1929] text-sm font-semibold">
              H
            </div>
          </div>
        </nav>

        <div className="relative z-10 px-6 py-8 max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome back</h1>
            <p className="text-[#94a3b8]">Select a template or start from scratch to create your financial analysis prompt.</p>
          </div>

          {/* Stats & Quick Start Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Quick Stats */}
            <div className="card p-6" data-tour="quick-stats">
              <h3 className="text-sm font-medium text-[#94a3b8] mb-4 flex items-center gap-2">
                <Icons.chartLine className="w-4 h-4" />
                Quick Stats
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-2xl font-bold text-[#d4a853] tabular-nums">$0.00</div>
                  <div className="text-xs text-[#64748b]">Cost MTD</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white tabular-nums">0</div>
                  <div className="text-xs text-[#64748b]">Executions</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#14b8a6] tabular-nums">18</div>
                  <div className="text-xs text-[#64748b]">Templates</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#627d98] tabular-nums">5</div>
                  <div className="text-xs text-[#64748b]">Categories</div>
                </div>
              </div>
            </div>

            {/* Recent Work */}
            <div className="card p-6">
              <h3 className="text-sm font-medium text-[#94a3b8] mb-4 flex items-center gap-2">
                <Icons.history className="w-4 h-4" />
                Recent Work
              </h3>
              <div className="space-y-3">
                {recentWork.map((work, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <div className={`w-2 h-2 rounded-full ${work.status === 'completed' ? 'bg-[#059669]' : 'bg-[#d4a853]'}`} />
                    <div className="flex-1 truncate">
                      <span className="text-white">{work.name}</span>
                    </div>
                    <span className="text-[#64748b] text-xs">{work.time}</span>
                  </div>
                ))}
              </div>
              {recentWork.length === 0 && (
                <p className="text-[#64748b] text-sm">No recent work yet</p>
              )}
            </div>

            {/* Industry Quick Start */}
            <div className="card p-6" data-tour="quick-start">
              <h3 className="text-sm font-medium text-[#94a3b8] mb-4 flex items-center gap-2">
                <Icons.bolt className="w-4 h-4" />
                Quick Start
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {quickStartWorkflows.map((workflow) => {
                  const IconComponent = Icons[workflow.icon as keyof typeof Icons];
                  return (
                    <Link
                      key={workflow.id}
                      href={`/playground?template=${workflow.templates[0]}`}
                      className="p-3 rounded-lg border border-[#1e3a5f] hover:border-[#2d4a6f] bg-[#0f2137] hover:bg-[#162a45] transition-all group"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ background: `${workflow.color}20` }}
                        >
                          {IconComponent && <IconComponent className="w-4 h-4" style={{ color: workflow.color }} />}
                        </div>
                        <span className="text-xs text-[#94a3b8] group-hover:text-white transition-colors">
                          {workflow.name}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Template Library */}
          <div className="card p-6" data-tour="templates">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <h2 className="text-xl font-bold text-white">Financial Templates</h2>

              {/* Search */}
              <div className="relative">
                <Icons.search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b]" />
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-[#0a1929] border border-[#1e3a5f] rounded-lg text-sm text-white placeholder-[#64748b] focus:border-[#d4a853] focus:outline-none w-64"
                />
              </div>
            </div>

            {/* Category Tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {TEMPLATE_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all ${
                    activeCategory === cat.id
                      ? 'bg-[rgba(212,168,83,0.15)] text-[#d4a853] border border-[rgba(212,168,83,0.3)]'
                      : 'text-[#94a3b8] hover:text-white hover:bg-[#162a45]'
                  }`}
                >
                  <span className="mr-2">{cat.icon}</span>
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Templates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTemplates.slice(0, 9).map((template) => (
                <Link
                  key={template.id}
                  href={`/playground?template=${template.id}`}
                  className="group p-5 rounded-xl border border-[#1e3a5f] bg-[#0f2137] hover:border-[#d4a853] hover:bg-[#162a45] transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#d4a853] to-[#b8953f] flex items-center justify-center text-2xl shrink-0">
                      {template.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white group-hover:text-[#d4a853] transition-colors truncate">
                        {template.name}
                      </h3>
                      <p className="text-sm text-[#64748b] line-clamp-2 mt-1">
                        {template.description}
                      </p>
                      <div className="flex items-center gap-2 mt-3">
                        <span className={`badge badge-${template.difficulty}`}>
                          {template.difficulty}
                        </span>
                        <span className="text-xs text-[#64748b]">{template.estimatedTime}</span>
                        {template.outputFormats.includes('excel') && (
                          <span className="badge badge-excel text-xs">Excel</span>
                        )}
                        {template.outputFormats.includes('powerpoint') && (
                          <span className="badge badge-powerpoint text-xs">PPT</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* View All */}
            {filteredTemplates.length > 9 && (
              <div className="text-center mt-6">
                <Link
                  href="/playground"
                  className="btn-secondary inline-flex items-center gap-2"
                >
                  View all {filteredTemplates.length} templates
                  <Icons.arrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>

          {/* CTA Section */}
          <div className="mt-8 card card-gold p-8 bg-gradient-navy-gold">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Build powerful prompts in 4 simple steps</h2>
                <p className="text-[#94a3b8]">
                  Create prompts for Claude Code, ChatGPT, Gemini, or Grok - no prompt engineering experience needed.
                </p>
              </div>
              <div className="flex gap-4">
                <Link href="/builder" className="btn-primary">
                  Start Building
                  <Icons.arrowRight className="w-4 h-4 ml-2" />
                </Link>
                <Link href="/playground" className="btn-secondary">
                  Playground
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="relative z-10 px-6 py-8 border-t border-[#1e3a5f] mt-12">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-[#64748b]">
              <span className="text-[#d4a853] font-semibold">PromptForge</span>
              <span>•</span>
              <span>AI-Powered Financial Analysis</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[#64748b] text-sm">v2.0.0</span>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#64748b] hover:text-white transition-colors"
              >
                <Icons.github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </footer>

        {/* Dashboard Walkthrough */}
        <Walkthrough
          steps={DASHBOARD_WALKTHROUGH}
          isOpen={showWalkthrough}
          onClose={() => setShowWalkthrough(false)}
          onComplete={() => setShowWalkthrough(false)}
          storageKey="promptforge-dashboard-tour"
        />

        {/* Help Button */}
        {!showWalkthrough && !showOnboarding && (
          <HelpButton onClick={handleShowHelp} label="Help" />
        )}
      </main>
    </>
  );
}
