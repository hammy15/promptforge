'use client';

import { useState } from 'react';
import { STYLE_EXAMPLES, STYLE_CATEGORIES, StyleCategory, StyleExample } from '../data/style-examples';
import { Icons } from './Icons';

interface StyleGalleryProps {
  selectedStyles: string[];
  onToggleStyle: (styleId: string) => void;
  onApplyStyle?: (style: StyleExample) => void;
  maxSelections?: number;
}

export default function StyleGallery({
  selectedStyles,
  onToggleStyle,
  onApplyStyle,
  maxSelections = 5,
}: StyleGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<StyleCategory | 'all'>('all');
  const [previewStyle, setPreviewStyle] = useState<StyleExample | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStyles = STYLE_EXAMPLES.filter(style => {
    const matchesCategory = activeCategory === 'all' || style.category === activeCategory;
    const matchesSearch = searchQuery === '' ||
      style.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      style.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleToggle = (style: StyleExample) => {
    if (selectedStyles.includes(style.id)) {
      onToggleStyle(style.id);
    } else if (selectedStyles.length < maxSelections) {
      onToggleStyle(style.id);
      onApplyStyle?.(style);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header with search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white">Style Gallery</h3>
          <p className="text-sm text-[#64748b]">
            Select up to {maxSelections} styles to apply to your prompt
          </p>
        </div>
        <div className="relative">
          <Icons.search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b]" />
          <input
            type="text"
            placeholder="Search styles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 bg-[#0a1929] border border-[#1e3a5f] rounded-lg text-sm text-white placeholder-[#64748b] focus:border-[#4ECDC4] focus:outline-none w-64"
          />
        </div>
      </div>

      {/* Selected Styles */}
      {selectedStyles.length > 0 && (
        <div className="flex flex-wrap gap-2 p-3 rounded-lg bg-[#0a1929] border border-[#1e3a5f]">
          <span className="text-xs text-[#64748b]">Selected:</span>
          {selectedStyles.map(id => {
            const style = STYLE_EXAMPLES.find(s => s.id === id);
            if (!style) return null;
            return (
              <span
                key={id}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium"
                style={{ background: `${style.color}20`, color: style.color }}
              >
                {style.icon} {style.name}
                <button
                  onClick={() => onToggleStyle(id)}
                  className="ml-1 hover:opacity-70"
                >
                  <Icons.close className="w-3 h-3" />
                </button>
              </span>
            );
          })}
        </div>
      )}

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all ${
            activeCategory === 'all'
              ? 'bg-[rgba(78,205,196,0.15)] text-[#4ECDC4] border border-[rgba(78,205,196,0.3)]'
              : 'text-[#94a3b8] hover:text-white hover:bg-[#162a45]'
          }`}
        >
          All Styles
        </button>
        {STYLE_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all ${
              activeCategory === cat.id
                ? 'bg-[rgba(78,205,196,0.15)] text-[#4ECDC4] border border-[rgba(78,205,196,0.3)]'
                : 'text-[#94a3b8] hover:text-white hover:bg-[#162a45]'
            }`}
          >
            <span className="mr-1">{cat.icon}</span>
            {cat.name}
          </button>
        ))}
      </div>

      {/* Style Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredStyles.map((style) => {
          const isSelected = selectedStyles.includes(style.id);
          const isDisabled = !isSelected && selectedStyles.length >= maxSelections;

          return (
            <div
              key={style.id}
              className={`relative p-4 rounded-xl border transition-all ${
                isSelected
                  ? 'bg-[rgba(78,205,196,0.1)] border-[#4ECDC4]'
                  : isDisabled
                  ? 'bg-[#0f2137] border-[#1e3a5f] opacity-50 cursor-not-allowed'
                  : 'bg-[#0f2137] border-[#1e3a5f] hover:border-[#2d4a6f] cursor-pointer'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-xl shrink-0"
                  style={{ background: `${style.color}20` }}
                >
                  {style.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className={`font-semibold ${isSelected ? 'text-[#4ECDC4]' : 'text-white'}`}>
                      {style.name}
                    </h4>
                    <span
                      className="text-xs px-1.5 py-0.5 rounded capitalize"
                      style={{ background: `${style.color}15`, color: style.color }}
                    >
                      {style.category}
                    </span>
                  </div>
                  <p className="text-sm text-[#64748b] mt-1 line-clamp-2">
                    {style.description}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 mt-3">
                <button
                  onClick={() => setPreviewStyle(style)}
                  className="flex-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#0a1929] text-[#94a3b8] hover:text-white transition-colors"
                >
                  Preview
                </button>
                <button
                  onClick={() => !isDisabled && handleToggle(style)}
                  disabled={isDisabled}
                  className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    isSelected
                      ? 'bg-[#4ECDC4] text-[#0a1929]'
                      : isDisabled
                      ? 'bg-[#1e3a5f] text-[#64748b] cursor-not-allowed'
                      : 'bg-[#1e3a5f] text-white hover:bg-[#2d4a6f]'
                  }`}
                >
                  {isSelected ? '✓ Added' : 'Add'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Preview Modal */}
      {previewStyle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="w-full max-w-2xl bg-[#0f2137] border border-[#1e3a5f] rounded-2xl shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#1e3a5f]">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
                  style={{ background: `${previewStyle.color}20` }}
                >
                  {previewStyle.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-white">{previewStyle.name}</h3>
                  <p className="text-sm text-[#64748b]">{previewStyle.description}</p>
                </div>
              </div>
              <button
                onClick={() => setPreviewStyle(null)}
                className="p-2 text-[#64748b] hover:text-white transition-colors"
              >
                <Icons.close className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
              {/* Before/After Preview */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-[#64748b] mb-2">Before:</div>
                  <div className="p-3 rounded-lg bg-[#0a1929] text-sm text-[#94a3b8] italic">
                    "{previewStyle.previewBefore}"
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[#4ECDC4] mb-2">After:</div>
                  <div className="p-3 rounded-lg bg-[#0a1929] text-sm text-white">
                    "{previewStyle.previewAfter}"
                  </div>
                </div>
              </div>

              {/* Prompt Additions */}
              <div>
                <div className="text-xs text-[#64748b] mb-2">This style adds to your prompt:</div>
                <div className="p-3 rounded-lg bg-[#0a1929] text-sm text-[#94a3b8] whitespace-pre-wrap">
                  {previewStyle.promptAdditions}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {previewStyle.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 rounded-full bg-[#1e3a5f] text-[#94a3b8]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-4 border-t border-[#1e3a5f]">
              <button
                onClick={() => setPreviewStyle(null)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-[#94a3b8] hover:text-white transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleToggle(previewStyle);
                  setPreviewStyle(null);
                }}
                disabled={!selectedStyles.includes(previewStyle.id) && selectedStyles.length >= maxSelections}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedStyles.includes(previewStyle.id)
                    ? 'bg-[#4ECDC4] text-[#0a1929]'
                    : 'bg-[#1e3a5f] text-white hover:bg-[#2d4a6f]'
                }`}
              >
                {selectedStyles.includes(previewStyle.id) ? '✓ Added' : 'Add to Prompt'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
