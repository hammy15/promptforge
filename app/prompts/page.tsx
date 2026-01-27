'use client';

import Link from 'next/link';
import { Icons } from '../components/Icons';
import PromptGrid from '../components/PromptGrid';

export default function PromptsPage() {
  return (
    <main className="min-h-screen">
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
            <Link href="/" className="px-4 py-2 text-[#94a3b8] hover:text-white transition-colors rounded-lg hover:bg-[#162a45]">
              Dashboard
            </Link>
            <Link href="/prompts" className="px-4 py-2 text-white font-medium rounded-lg bg-[rgba(212,168,83,0.1)]">
              Prompts
            </Link>
            <Link href="/prompts/create" className="px-4 py-2 text-[#94a3b8] hover:text-white transition-colors rounded-lg hover:bg-[#162a45]">
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
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#d4a853] to-[#b8953f] flex items-center justify-center text-[#0a1929] text-sm font-semibold">
            H
          </div>
        </div>
      </nav>

      <div className="relative z-10 px-6 py-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Available Prompts</h1>
            <p className="text-[#94a3b8]">Browse our library of expert-crafted prompts or your custom creations.</p>
          </div>
          <Link
            href="/prompts/create"
            className="btn-primary inline-flex items-center gap-2"
          >
            <Icons.plus className="w-5 h-5" />
            Create Custom Prompt
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="card p-4">
            <div className="text-2xl font-bold text-[#d4a853] tabular-nums">18</div>
            <div className="text-sm text-[#64748b]">Finance Templates</div>
          </div>
          <div className="card p-4">
            <div className="text-2xl font-bold text-[#14b8a6] tabular-nums">0</div>
            <div className="text-sm text-[#64748b]">Custom Prompts</div>
          </div>
          <div className="card p-4">
            <div className="text-2xl font-bold text-[#8b5cf6] tabular-nums">5</div>
            <div className="text-sm text-[#64748b]">Categories</div>
          </div>
          <div className="card p-4">
            <div className="text-2xl font-bold text-[#f97316] tabular-nums">6</div>
            <div className="text-sm text-[#64748b]">Target LLMs</div>
          </div>
        </div>

        {/* Prompt Library */}
        <div className="card p-6">
          <PromptGrid
            showCategories={true}
            showSearch={true}
          />
        </div>
      </div>
    </main>
  );
}
