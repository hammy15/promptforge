'use client';

import Link from 'next/link';
import GuidedPromptBuilder from '../components/builder/GuidedPromptBuilder';
import { Icons } from '../components/Icons';

export default function BuilderPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1929] to-[#0f2137]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-[#0a1929]/90 backdrop-blur-sm border-b border-[#1e3a5f]">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#d4a853] to-[#b8953f] flex items-center justify-center">
              <Icons.bolt className="w-6 h-6 text-[#0a1929]" />
            </div>
            <span className="text-xl font-bold text-white">PromptForge</span>
          </Link>

          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-[#94a3b8] hover:text-white transition-colors text-sm"
            >
              Dashboard
            </Link>
            <Link
              href="/builder"
              className="text-[#d4a853] font-medium text-sm"
            >
              Prompt Builder
            </Link>
            <Link
              href="/prompts"
              className="text-[#94a3b8] hover:text-white transition-colors text-sm"
            >
              My Prompts
            </Link>
            <Link
              href="/playground"
              className="text-[#94a3b8] hover:text-white transition-colors text-sm"
            >
              Playground
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content - offset for fixed nav */}
      <div className="pt-16">
        <GuidedPromptBuilder />
      </div>
    </div>
  );
}
