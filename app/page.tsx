'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import SplashScreen from './components/SplashScreen';
import Onboarding from './components/Onboarding';
import Walkthrough from './components/ui/Walkthrough';
import Tooltip from './components/ui/Tooltip';
import HelpButton from './components/ui/HelpButton';
import { Icons } from './components/Icons';
import { ALL_TEMPLATES, TEMPLATE_CATEGORIES } from './components/PromptTemplates';
import { DASHBOARD_WALKTHROUGH } from './data/walkthrough-steps';
import { ThemeToggle } from './components/ThemeToggle';

// Featured templates for demo
const FEATURED_TEMPLATES = [
  { id: 'dcf-valuation', name: 'DCF Valuation', icon: '📊', category: 'Financial Analysis' },
  { id: 'investment-memo', name: 'Investment Memo', icon: '📝', category: 'M&A & Deal Work' },
  { id: 'competitive-intelligence', name: 'Competitive Intel', icon: '🔍', category: 'Research' },
];

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showWalkthrough, setShowWalkthrough] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewTemplate, setPreviewTemplate] = useState<string | null>(null);

  useEffect(() => {
    const hasOnboarded = localStorage.getItem('promptforge-onboarded');
    if (!hasOnboarded) {
      setShowOnboarding(true);
    }
  }, []);

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

  const filteredTemplates = ALL_TEMPLATES.filter(t => {
    const matchesCategory = activeCategory === 'all' || t.category === activeCategory || t.categorySlug === activeCategory;
    const matchesSearch = searchQuery === '' ||
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} duration={2000} />}
      {!showSplash && showOnboarding && <Onboarding onComplete={handleOnboardingComplete} />}

      <main className={`min-h-screen bg-[var(--background)] transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
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
                <Link href="/" className="px-4 py-2 text-[#4ECDC4] font-medium rounded-lg bg-[rgba(78,205,196,0.1)]">
                  Home
                </Link>
                <Link href="/playground" className="px-4 py-2 text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors rounded-lg hover:bg-[var(--muted)]">
                  Playground
                </Link>
                <Link href="/builder" className="px-4 py-2 text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors rounded-lg hover:bg-[var(--muted)]">
                  Builder
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <ThemeToggle />
              <button
                onClick={handleShowHelp}
                className="p-2 text-[var(--text-muted)] hover:text-[#4ECDC4] transition-colors rounded-lg hover:bg-[var(--muted)]"
                title="Help"
              >
                <Icons.help className="w-5 h-5" />
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#4ECDC4]/5 via-transparent to-[#3EB489]/5" />
          <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(78,205,196,0.1)] border border-[rgba(78,205,196,0.2)] text-[#4ECDC4] text-sm font-medium mb-6">
                <Icons.bolt className="w-4 h-4" />
                {ALL_TEMPLATES.length}+ Professional Templates
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--foreground)] mb-6 leading-tight">
                Build AI Prompts for{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4ECDC4] to-[#3EB489]">
                  Healthcare & Finance
                </span>
              </h1>

              <p className="text-lg md:text-xl text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
                Create powerful, professional prompts in seconds. No prompt engineering experience needed.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <Link
                  href="/playground"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#4ECDC4] to-[#3EB489] text-[#0a1929] font-semibold rounded-xl hover:shadow-lg hover:shadow-[#4ECDC4]/25 transition-all"
                >
                  Start Building
                  <Icons.arrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/playground?template=hospice-eligibility-general&demo=true"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 border border-[var(--border-color)] text-[var(--foreground)] font-semibold rounded-xl hover:border-[#4ECDC4] hover:bg-[var(--muted)] transition-all"
                >
                  <Icons.eye className="w-5 h-5" />
                  See Demo
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="flex items-center justify-center gap-8 text-center">
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-[#4ECDC4]">{ALL_TEMPLATES.length}</div>
                  <div className="text-sm text-[var(--text-muted)]">Templates</div>
                </div>
                <div className="w-px h-10 bg-[var(--border-color)]" />
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-[var(--foreground)]">{TEMPLATE_CATEGORIES.length - 1}</div>
                  <div className="text-sm text-[var(--text-muted)]">Categories</div>
                </div>
                <div className="w-px h-10 bg-[var(--border-color)]" />
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-[#3EB489]">60s</div>
                  <div className="text-sm text-[var(--text-muted)]">Avg. Build Time</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 border-t border-[var(--border-color)]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] mb-4">
                Three Simple Steps
              </h2>
              <p className="text-[var(--text-secondary)]">From idea to professional prompt in under a minute</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: '1', title: 'Pick a Template', desc: 'Choose from 30+ professional templates for finance, research, and analysis', icon: 'search' },
                { step: '2', title: 'Customize', desc: 'Fill in your specific details - company names, figures, requirements', icon: 'edit' },
                { step: '3', title: 'Copy & Use', desc: 'Get your optimized prompt ready for Claude, ChatGPT, or any AI', icon: 'copy' },
              ].map((item) => {
                const StepIcon = Icons[item.icon as keyof typeof Icons];
                return (
                  <div key={item.step} className="relative p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--card)] hover:border-[#4ECDC4] transition-all group">
                    <div className="absolute -top-4 left-6 w-8 h-8 rounded-full bg-gradient-to-br from-[#4ECDC4] to-[#3EB489] flex items-center justify-center text-[#0a1929] font-bold text-sm">
                      {item.step}
                    </div>
                    <div className="pt-4">
                      <div className="w-12 h-12 rounded-xl bg-[rgba(78,205,196,0.1)] flex items-center justify-center text-[#4ECDC4] mb-4 group-hover:scale-110 transition-transform">
                        {StepIcon && <StepIcon className="w-6 h-6" />}
                      </div>
                      <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">{item.title}</h3>
                      <p className="text-[var(--text-muted)] text-sm">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Template Categories */}
        <section className="py-16 bg-[var(--muted)]/30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] mb-2">
                  Browse Templates
                </h2>
                <p className="text-[var(--text-secondary)]">Professional prompts for every use case</p>
              </div>

              <div className="relative">
                <Icons.search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-[var(--card)] border border-[var(--border-color)] rounded-lg text-sm text-[var(--foreground)] placeholder-[var(--text-muted)] focus:border-[#4ECDC4] focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]/20 w-64"
                />
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
              {TEMPLATE_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    activeCategory === cat.id
                      ? 'bg-[#4ECDC4] text-[#0a1929]'
                      : 'bg-[var(--card)] text-[var(--text-secondary)] hover:text-[var(--foreground)] border border-[var(--border-color)] hover:border-[#4ECDC4]'
                  }`}
                >
                  <span className="mr-2">{cat.icon}</span>
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Templates Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTemplates.slice(0, 9).map((template) => (
                <Link
                  key={template.id}
                  href={`/playground?template=${template.id}`}
                  className="group p-5 rounded-xl border border-[var(--border-color)] bg-[var(--card)] hover:border-[#4ECDC4] hover:shadow-lg hover:shadow-[#4ECDC4]/5 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4ECDC4] to-[#3EB489] flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform">
                      {template.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-[var(--foreground)] group-hover:text-[#4ECDC4] transition-colors">
                        {template.name}
                      </h3>
                      <p className="text-sm text-[var(--text-muted)] line-clamp-2 mt-1">
                        {template.description}
                      </p>
                      <div className="flex items-center gap-2 mt-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          template.difficulty === 'beginner' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                          template.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                          'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                        }`}>
                          {template.difficulty}
                        </span>
                        <span className="text-xs text-[var(--text-muted)]">{template.estimatedTime}</span>
                      </div>
                    </div>
                    <Icons.arrowRight className="w-5 h-5 text-[var(--text-muted)] group-hover:text-[#4ECDC4] group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              ))}
            </div>

            {filteredTemplates.length > 9 && (
              <div className="text-center mt-8">
                <Link
                  href="/playground"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--border-color)] text-[var(--foreground)] font-medium rounded-xl hover:border-[#4ECDC4] hover:bg-[var(--card)] transition-all"
                >
                  View all {filteredTemplates.length} templates
                  <Icons.arrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-6">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#4ECDC4] to-[#3EB489] p-8 md:p-12">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aDR2MmgtNHpNMjAgMzRoNHYyaC00ek0zNiAxOGg0djJoLTR6TTIwIDE4aDR2MmgtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
              <div className="relative text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-[#0a1929] mb-4">
                  Ready to Build Better Prompts?
                </h2>
                <p className="text-[#0a1929]/70 mb-8 max-w-xl mx-auto">
                  Join thousands of healthcare and finance professionals creating powerful AI prompts with PromptForge.
                </p>
                <Link
                  href="/playground"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#0a1929] text-white font-semibold rounded-xl hover:bg-[#0a1929]/90 transition-all"
                >
                  Get Started Free
                  <Icons.arrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-[var(--border-color)] py-8">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-[var(--text-muted)]">
              <span className="text-[#4ECDC4] font-semibold">PromptForge</span>
              <span>•</span>
              <span>AI-Powered Financial Analysis</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-[var(--text-muted)]">
              <span>v2.0.0</span>
              <a href="#" className="hover:text-[var(--foreground)] transition-colors">Privacy</a>
              <a href="#" className="hover:text-[var(--foreground)] transition-colors">Terms</a>
            </div>
          </div>
        </footer>

        {/* Walkthrough */}
        <Walkthrough
          steps={DASHBOARD_WALKTHROUGH}
          isOpen={showWalkthrough}
          onClose={() => setShowWalkthrough(false)}
          onComplete={() => setShowWalkthrough(false)}
          storageKey="promptforge-dashboard-tour"
        />

        {!showWalkthrough && !showOnboarding && (
          <HelpButton onClick={handleShowHelp} label="Help" />
        )}
      </main>
    </>
  );
}
