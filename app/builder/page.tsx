'use client';

import Link from 'next/link';
import GuidedPromptBuilder from '../components/builder/GuidedPromptBuilder';
import { Icons } from '../components/Icons';
import { ThemeToggle } from '../components/ThemeToggle';

export default function BuilderPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Navigation - Consistent with all pages */}
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
              <Link href="/claude-code" className="px-4 py-2 text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors rounded-lg hover:bg-[var(--muted)] flex items-center gap-1">
                <span>⚡</span> Claude Code
              </Link>
              <Link href="/prompts-101" className="px-4 py-2 text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors rounded-lg hover:bg-[var(--muted)]">
                Prompts 101
              </Link>
              <Link href="/playground" className="px-4 py-2 text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors rounded-lg hover:bg-[var(--muted)]">
                Playground
              </Link>
              <Link href="/builder" className="px-4 py-2 text-[#4ECDC4] font-medium rounded-lg bg-[rgba(78,205,196,0.1)]">
                Builder
              </Link>
            </div>
          </div>

          <ThemeToggle />
        </div>
      </nav>

      {/* Main Content */}
      <GuidedPromptBuilder />
    </div>
  );
}
