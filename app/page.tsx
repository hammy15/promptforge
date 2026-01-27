'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import SplashScreen from './components/SplashScreen';
import Onboarding from './components/Onboarding';

const features = [
  { name: 'Variables', desc: '{{var}} syntax with types & defaults', icon: '{ }', color: 'from-teal-500 to-cyan-500' },
  { name: 'Chains', desc: 'Multi-step workflow orchestration', icon: '⛓️', color: 'from-violet-500 to-purple-500' },
  { name: 'Compression', desc: 'Smart token optimization', icon: '📦', color: 'from-orange-500 to-amber-500' },
  { name: 'Validators', desc: 'JSON, regex, format checks', icon: '✓', color: 'from-green-500 to-emerald-500' },
  { name: 'AI Recommend', desc: 'Smart model selection', icon: '🎯', color: 'from-pink-500 to-rose-500' },
  { name: 'Cost Calc', desc: 'Multi-provider pricing', icon: '💰', color: 'from-yellow-500 to-orange-500' },
  { name: 'PII Detect', desc: 'Privacy protection', icon: '🔒', color: 'from-red-500 to-pink-500' },
  { name: 'Injection Guard', desc: 'Security scanning', icon: '🛡️', color: 'from-blue-500 to-indigo-500' },
  { name: 'SDK Export', desc: 'TS, Python, cURL', icon: '📤', color: 'from-indigo-500 to-violet-500' },
  { name: 'Webhooks', desc: 'Event notifications', icon: '🪝', color: 'from-cyan-500 to-teal-500' },
  { name: 'Analytics', desc: 'Usage & regression tracking', icon: '📊', color: 'from-emerald-500 to-green-500' },
  { name: 'Marketplace', desc: 'Share & discover prompts', icon: '🏪', color: 'from-amber-500 to-yellow-500' },
];

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if user has seen onboarding
    const hasOnboarded = localStorage.getItem('promptforge-onboarded');
    if (!hasOnboarded) {
      setShowOnboarding(true);
    }
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    setIsLoaded(true);
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
  };

  const handleShowHelp = () => {
    setShowOnboarding(true);
  };

  return (
    <>
      {/* Splash Screen */}
      {showSplash && <SplashScreen onComplete={handleSplashComplete} duration={3000} />}

      {/* Onboarding Modal */}
      {!showSplash && showOnboarding && <Onboarding onComplete={handleOnboardingComplete} />}

      {/* Main Content */}
      <main className={`min-h-screen transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {/* Background */}
        <div className="fixed inset-0 bg-gradient-mesh pointer-events-none" />

        {/* Navigation */}
        <nav className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-gray-800/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
            </div>
            <span className="text-xl font-bold">
              <span className="text-teal-400">Prompt</span>Forge
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleShowHelp}
              className="p-2 text-gray-500 hover:text-teal-400 transition-colors"
              title="Show help"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
              </svg>
            </button>
            <a
              href="https://github.com/hammy15/promptforge"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-500 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </nav>

        {/* Hero */}
        <section className="relative z-10 px-6 py-24 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500/10 border border-teal-500/20 rounded-full text-teal-400 text-sm mb-8 animate-slide-up">
              <span className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
              24 Powerful Features
            </div>

            <h1 className="text-6xl md:text-7xl font-bold mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Craft Perfect
              <br />
              <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                AI Prompts
              </span>
            </h1>

            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
              Build, test, and optimize prompts with variables, chains, compression,
              security scanning, analytics, and more.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <Link href="/playground" className="btn-primary text-lg px-8 py-4">
                Open Playground
                <svg className="inline-block w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <a
                href="https://github.com/hammy15/promptforge"
                className="btn-secondary text-lg px-8 py-4"
              >
                View Source
              </a>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="relative z-10 px-6 py-16 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Everything You Need</h2>
          <p className="text-gray-500 text-center mb-12 max-w-xl mx-auto">
            A complete toolkit for prompt engineering, from variables to security.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {features.map((f, i) => (
              <div
                key={f.name}
                className="group card p-5 hover:border-teal-500/50 transition-all duration-300 cursor-pointer animate-slide-up"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center text-white text-lg mb-3 group-hover:scale-110 transition-transform`}>
                  {f.icon}
                </div>
                <h3 className="font-semibold mb-1 group-hover:text-teal-400 transition-colors">{f.name}</h3>
                <p className="text-gray-500 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-600 mt-8">
            + Diff/Merge, Snippets, Tutorials, Keyboard Shortcuts, and more
          </p>
        </section>

        {/* CTA */}
        <section className="relative z-10 px-6 py-24">
          <div className="max-w-3xl mx-auto text-center">
            <div className="card neu-shadow p-12 bg-gradient-to-br from-[#12121a] to-[#0d0d12]">
              <h2 className="text-3xl font-bold mb-4">Ready to Build?</h2>
              <p className="text-gray-400 mb-8">
                Start crafting better prompts in the interactive playground.
              </p>
              <Link href="/playground" className="btn-primary text-lg px-10 py-4 inline-block">
                Launch Playground
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative z-10 px-6 py-8 border-t border-gray-800/50">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-gray-500">
              <span className="text-teal-400 font-semibold">PromptForge</span>
              <span>•</span>
              <span>Hammy Design System</span>
            </div>
            <div className="text-gray-600 text-sm">
              Built with Next.js & TypeScript
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
