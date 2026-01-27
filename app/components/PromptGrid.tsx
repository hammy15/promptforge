'use client';

import { useState, useMemo } from 'react';
import PromptCard, { PromptCardData } from './PromptCard';
import { Icons } from './Icons';
import { PROMPT_TEMPLATES, TEMPLATE_CATEGORIES } from './PromptTemplates';

interface PromptGridProps {
  prompts?: PromptCardData[];
  showCategories?: boolean;
  showSearch?: boolean;
  onSelectPrompt?: (prompt: PromptCardData) => void;
  linkPrefix?: string;
}

export default function PromptGrid({
  prompts,
  showCategories = true,
  showSearch = true,
  onSelectPrompt,
  linkPrefix = '/playground?template=',
}: PromptGridProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Convert templates to PromptCardData if no prompts provided
  const allPrompts: PromptCardData[] = useMemo(() => {
    if (prompts) return prompts;
    return PROMPT_TEMPLATES.map(t => ({
      id: t.id,
      name: t.name,
      description: t.description,
      category: t.categorySlug,
      icon: t.icon,
      difficulty: t.difficulty,
      estimatedTime: t.estimatedTime,
      outputFormats: t.outputFormats,
      isCustom: false,
    }));
  }, [prompts]);

  // Filter prompts
  const filteredPrompts = useMemo(() => {
    return allPrompts.filter(p => {
      const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
      const matchesSearch = searchQuery === '' ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [allPrompts, activeCategory, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Header with search and view toggle */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {showSearch && (
          <div className="relative flex-1 max-w-md">
            <Icons.search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b]" />
            <input
              type="text"
              placeholder="Search prompts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#0a1929] border border-[#1e3a5f] rounded-lg text-sm text-white placeholder-[#64748b] focus:border-[#d4a853] focus:outline-none"
            />
          </div>
        )}

        <div className="flex items-center gap-2">
          <span className="text-sm text-[#64748b]">{filteredPrompts.length} prompts</span>
          <div className="flex rounded-lg border border-[#1e3a5f] overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-[#1e3a5f] text-white' : 'text-[#64748b] hover:text-white'}`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-[#1e3a5f] text-white' : 'text-[#64748b] hover:text-white'}`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      {showCategories && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all ${
              activeCategory === 'all'
                ? 'bg-[rgba(212,168,83,0.15)] text-[#d4a853] border border-[rgba(212,168,83,0.3)]'
                : 'text-[#94a3b8] hover:text-white hover:bg-[#162a45]'
            }`}
          >
            All Prompts
          </button>
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
      )}

      {/* Prompts Grid/List */}
      {filteredPrompts.length > 0 ? (
        <div className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
            : 'space-y-3'
        }>
          {filteredPrompts.map((prompt) => (
            <PromptCard
              key={prompt.id}
              prompt={prompt}
              href={onSelectPrompt ? undefined : `${linkPrefix}${prompt.id}`}
              onClick={onSelectPrompt ? () => onSelectPrompt(prompt) : undefined}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-[#1e3a5f] flex items-center justify-center mx-auto mb-4">
            <Icons.search className="w-8 h-8 text-[#64748b]" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">No prompts found</h3>
          <p className="text-[#64748b]">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}
