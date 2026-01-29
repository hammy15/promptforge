'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import SplashScreen from './components/SplashScreen';
import Onboarding from './components/Onboarding';
import Walkthrough from './components/ui/Walkthrough';
import HelpButton from './components/ui/HelpButton';
import { Icons } from './components/Icons';
import { SmartSearch } from './components/SmartSearch';
import { ServiceCategoryNav, QuickAccessCards } from './components/ServiceCategoryNav';
import {
  ALL_HEALTHCARE_TEMPLATES,
  getFilteredTemplates,
  SERVICE_TYPES,
  BUSINESS_CATEGORIES,
} from './data/healthcare';
import { ServiceType, BusinessCategory } from './data/healthcare/service-types';
import { DASHBOARD_WALKTHROUGH } from './data/walkthrough-steps';
import { ThemeToggle } from './components/ThemeToggle';
import { PromptTemplate } from './components/PromptTemplates';

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showWalkthrough, setShowWalkthrough] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // New state for service/category filtering
  const [selectedServiceType, setSelectedServiceType] = useState<ServiceType | null>(null);
  const [selectedBusinessCategory, setSelectedBusinessCategory] = useState<BusinessCategory | null>(null);

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

  // Handle template selection from SmartSearch
  const handleSelectTemplate = (template: PromptTemplate) => {
    window.location.href = `/playground?template=${template.id}`;
  };

  // Handle custom prompt from SmartSearch
  const handleCustomPrompt = (query: string) => {
    window.location.href = `/builder?query=${encodeURIComponent(query)}`;
  };

  // Get filtered templates based on selections
  const filteredTemplates = getFilteredTemplates(selectedServiceType, selectedBusinessCategory);

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

        {/* Hero Section with Smart Search */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#4ECDC4]/5 via-transparent to-[#3EB489]/5" />
          <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(78,205,196,0.1)] border border-[rgba(78,205,196,0.2)] text-[#4ECDC4] text-sm font-medium mb-6">
                <Icons.clinicalHeart className="w-4 h-4" />
                Healthcare & Senior Living AI Prompts
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--foreground)] mb-6 leading-tight">
                What do you need{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4ECDC4] to-[#3EB489]">
                  help with?
                </span>
              </h1>

              <p className="text-lg md:text-xl text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
                Describe your task and we'll suggest the perfect prompt. Or browse by facility type or business function.
              </p>

              {/* Smart Search */}
              <div className="mb-12">
                <SmartSearch
                  onSelectTemplate={handleSelectTemplate}
                  onCustomPrompt={handleCustomPrompt}
                />
              </div>

              {/* Quick Stats */}
              <div className="flex items-center justify-center gap-6 md:gap-10 text-center">
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-[#4ECDC4]">{ALL_HEALTHCARE_TEMPLATES.length}+</div>
                  <div className="text-sm text-[var(--text-muted)]">Templates</div>
                </div>
                <div className="w-px h-10 bg-[var(--border-color)]" />
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-[var(--foreground)]">{SERVICE_TYPES.length}</div>
                  <div className="text-sm text-[var(--text-muted)]">Facility Types</div>
                </div>
                <div className="w-px h-10 bg-[var(--border-color)]" />
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-[#3EB489]">{BUSINESS_CATEGORIES.length}</div>
                  <div className="text-sm text-[var(--text-muted)]">Business Functions</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Access Cards */}
        <section className="py-12 border-t border-[var(--border-color)]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-3 mb-6">
              <Icons.quickAction className="w-5 h-5 text-[#4ECDC4]" />
              <h2 className="text-lg font-semibold text-[var(--foreground)]">Quick Access</h2>
            </div>
            <QuickAccessCards />
          </div>
        </section>

        {/* Browse by Category Section */}
        <section className="py-12 bg-[var(--muted)]/30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] mb-2">
                Browse Prompts
              </h2>
              <p className="text-[var(--text-secondary)]">
                Filter by facility type or business function to find the perfect prompt
              </p>
            </div>

            {/* Service Category Navigation */}
            <ServiceCategoryNav
              selectedServiceType={selectedServiceType}
              selectedBusinessCategory={selectedBusinessCategory}
              onSelectServiceType={setSelectedServiceType}
              onSelectBusinessCategory={setSelectedBusinessCategory}
            />

            {/* Filtered Templates Grid */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-[var(--text-muted)]">
                  Showing {filteredTemplates.length} templates
                </span>
                {(selectedServiceType || selectedBusinessCategory) && (
                  <button
                    onClick={() => {
                      setSelectedServiceType(null);
                      setSelectedBusinessCategory(null);
                    }}
                    className="text-sm text-[#4ECDC4] hover:underline"
                  >
                    Show all templates
                  </button>
                )}
              </div>

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
                        <div className="flex items-center gap-2 mt-3 flex-wrap">
                          {template.tags?.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded-full text-xs font-medium bg-[var(--muted)] text-[var(--text-muted)]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <Icons.arrowRight className="w-5 h-5 text-[var(--text-muted)] group-hover:text-[#4ECDC4] group-hover:translate-x-1 transition-all shrink-0" />
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
          </div>
        </section>

        {/* Service Types Overview */}
        <section className="py-16 border-t border-[var(--border-color)]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] mb-4">
                Prompts for Every Healthcare Setting
              </h2>
              <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
                Specialized templates for skilled nursing, assisted living, hospice, home health, and more
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {SERVICE_TYPES.map((service) => {
                const IconComponent = Icons[service.icon as keyof typeof Icons] || Icons.building;
                return (
                  <button
                    key={service.id}
                    onClick={() => {
                      setSelectedServiceType(service.id);
                      setSelectedBusinessCategory(null);
                      // Scroll to browse section
                      document.querySelector('.bg-\\[var\\(--muted\\)\\]\\/30')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="group p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--card)] hover:border-[rgba(78,205,196,0.5)] transition-all text-left"
                  >
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                      style={{ backgroundColor: `${service.color}20` }}
                    >
                      <IconComponent className="w-7 h-7" style={{ color: service.color }} />
                    </div>
                    <h3 className="font-semibold text-[var(--foreground)] mb-1">{service.shortName}</h3>
                    <p className="text-sm text-[var(--text-muted)]">{service.name}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-6">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#4ECDC4] to-[#3EB489] p-8 md:p-12">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aDR2MmgtNHpNMjAgMzRoNHYyaC00ek0zNiAxOGg0djJoLTR6TTIwIDE4aDR2MmgtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
              <div className="relative text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-[#0a1929] mb-4">
                  Can't Find What You Need?
                </h2>
                <p className="text-[#0a1929]/70 mb-8 max-w-xl mx-auto">
                  Build a custom prompt tailored to your specific needs with our guided builder.
                </p>
                <Link
                  href="/builder"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#0a1929] text-white font-semibold rounded-xl hover:bg-[#0a1929]/90 transition-all"
                >
                  <Icons.customPrompt className="w-5 h-5" />
                  Create Custom Prompt
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
              <span>Healthcare & Senior Living AI Prompts</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-[var(--text-muted)]">
              <span>v3.0.0</span>
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
