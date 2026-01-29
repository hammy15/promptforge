'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Icons } from './Icons';
import {
  SERVICE_TYPES,
  BUSINESS_CATEGORIES,
  matchQueryToCategories,
  ServiceType,
  BusinessCategory,
} from '@/app/data/healthcare/service-types';
import { HEALTHCARE_TEMPLATES } from '@/app/data/healthcare/templates';
import { PromptTemplate } from './PromptTemplates';

interface SmartSearchProps {
  onSelectTemplate: (template: PromptTemplate) => void;
  onCustomPrompt: (query: string) => void;
}

interface SearchResult {
  template: PromptTemplate;
  score: number;
  matchedKeywords: string[];
}

export function SmartSearch({ onSelectTemplate, onCustomPrompt }: SmartSearchProps) {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [matchedServices, setMatchedServices] = useState<ServiceType[]>([]);
  const [matchedCategories, setMatchedCategories] = useState<BusinessCategory[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setMatchedServices([]);
      setMatchedCategories([]);
      setShowResults(false);
      return;
    }

    const timer = setTimeout(() => {
      performSearch(query);
    }, 150);

    return () => clearTimeout(timer);
  }, [query]);

  const performSearch = useCallback((searchQuery: string) => {
    setIsSearching(true);

    // Get matched service types and categories
    const { serviceTypes, businessCategories, confidence } = matchQueryToCategories(searchQuery);
    setMatchedServices(serviceTypes);
    setMatchedCategories(businessCategories);

    // Score templates based on query match
    const scoredResults: SearchResult[] = [];
    const queryWords = searchQuery.toLowerCase().split(/\s+/);

    for (const template of HEALTHCARE_TEMPLATES) {
      let score = 0;
      const matchedKeywords: string[] = [];

      // Check name match
      for (const word of queryWords) {
        if (template.name.toLowerCase().includes(word)) {
          score += 30;
          matchedKeywords.push(word);
        }
      }

      // Check description match
      for (const word of queryWords) {
        if (template.description.toLowerCase().includes(word)) {
          score += 15;
          if (!matchedKeywords.includes(word)) matchedKeywords.push(word);
        }
      }

      // Check tags match
      for (const tag of template.tags || []) {
        for (const word of queryWords) {
          if (tag.toLowerCase().includes(word)) {
            score += 20;
            if (!matchedKeywords.includes(word)) matchedKeywords.push(word);
          }
        }
      }

      // Check use cases match
      for (const useCase of template.useCases || []) {
        for (const word of queryWords) {
          if (useCase.toLowerCase().includes(word)) {
            score += 10;
            if (!matchedKeywords.includes(word)) matchedKeywords.push(word);
          }
        }
      }

      // Boost score based on matched service types/categories
      if (serviceTypes.length > 0 || businessCategories.length > 0) {
        score += confidence * 25;
      }

      if (score > 0) {
        scoredResults.push({ template, score, matchedKeywords });
      }
    }

    // Sort by score descending
    scoredResults.sort((a, b) => b.score - a.score);

    // Take top 5 results
    setResults(scoredResults.slice(0, 5));
    setShowResults(true);
    setSelectedIndex(0);
    setIsSearching(false);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showResults) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, results.length));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex < results.length) {
          onSelectTemplate(results[selectedIndex].template);
          setShowResults(false);
          setQuery('');
        } else if (query.trim()) {
          onCustomPrompt(query);
          setShowResults(false);
          setQuery('');
        }
        break;
      case 'Escape':
        setShowResults(false);
        break;
    }
  };

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (
      resultsRef.current &&
      !resultsRef.current.contains(e.target as Node) &&
      inputRef.current &&
      !inputRef.current.contains(e.target as Node)
    ) {
      setShowResults(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  const getServiceTypeColor = (id: ServiceType) => {
    return SERVICE_TYPES.find(s => s.id === id)?.color || '#64748b';
  };

  const getCategoryColor = (id: BusinessCategory) => {
    return BUSINESS_CATEGORIES.find(c => c.id === id)?.color || '#64748b';
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          {isSearching ? (
            <div className="w-5 h-5 border-2 border-[#4ECDC4] border-t-transparent rounded-full animate-spin" />
          ) : (
            <Icons.smartSearch className="w-5 h-5 text-[var(--text-muted)]" />
          )}
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.trim() && setShowResults(true)}
          placeholder="Describe what you need... (e.g., 'hospice eligibility for dementia patient' or 'SNF financial analysis')"
          className="w-full pl-12 pr-4 py-4 rounded-2xl bg-[var(--muted)] border-2 border-[var(--border-color)] focus:border-[#4ECDC4] focus:outline-none text-base text-[var(--foreground)] placeholder:text-[var(--text-muted)] transition-all shadow-lg"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setShowResults(false);
              inputRef.current?.focus();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-[var(--card)] rounded-full transition-colors"
          >
            <Icons.x className="w-4 h-4 text-[var(--text-muted)]" />
          </button>
        )}
      </div>

      {/* Results Dropdown */}
      {showResults && (
        <div
          ref={resultsRef}
          className="absolute top-full left-0 right-0 mt-2 bg-[var(--card)] rounded-2xl border border-[var(--border-color)] shadow-2xl overflow-hidden z-50"
        >
          {/* Matched Categories Badge Row */}
          {(matchedServices.length > 0 || matchedCategories.length > 0) && (
            <div className="px-4 py-3 border-b border-[var(--border-color)] flex flex-wrap gap-2">
              {matchedServices.map(st => {
                const service = SERVICE_TYPES.find(s => s.id === st);
                return (
                  <span
                    key={st}
                    className="px-2 py-1 rounded-full text-xs font-medium text-white"
                    style={{ backgroundColor: service?.color }}
                  >
                    {service?.shortName}
                  </span>
                );
              })}
              {matchedCategories.map(bc => {
                const category = BUSINESS_CATEGORIES.find(c => c.id === bc);
                return (
                  <span
                    key={bc}
                    className="px-2 py-1 rounded-full text-xs font-medium text-white"
                    style={{ backgroundColor: category?.color }}
                  >
                    {category?.name}
                  </span>
                );
              })}
            </div>
          )}

          {/* Results List */}
          <div className="max-h-[400px] overflow-y-auto">
            {results.length > 0 ? (
              <>
                {results.map((result, index) => (
                  <button
                    key={result.template.id}
                    onClick={() => {
                      onSelectTemplate(result.template);
                      setShowResults(false);
                      setQuery('');
                    }}
                    className={`w-full px-4 py-3 flex items-start gap-3 text-left transition-colors ${
                      selectedIndex === index
                        ? 'bg-[rgba(78,205,196,0.15)]'
                        : 'hover:bg-[var(--muted)]'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4ECDC4] to-[#3EB489] flex items-center justify-center shrink-0">
                      <span className="text-lg">{result.template.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-[var(--foreground)]">
                          {result.template.name}
                        </span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-[rgba(78,205,196,0.2)] text-[#4ECDC4]">
                          {Math.round((result.score / 100) * 100)}% match
                        </span>
                      </div>
                      <p className="text-sm text-[var(--text-muted)] truncate">
                        {result.template.description}
                      </p>
                      {result.matchedKeywords.length > 0 && (
                        <div className="flex gap-1 mt-1">
                          {result.matchedKeywords.slice(0, 3).map(kw => (
                            <span
                              key={kw}
                              className="px-1.5 py-0.5 rounded text-[10px] bg-[var(--muted)] text-[var(--text-muted)]"
                            >
                              {kw}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <Icons.chevronRight className="w-5 h-5 text-[var(--text-muted)] shrink-0" />
                  </button>
                ))}

                {/* Custom Prompt Option */}
                <button
                  onClick={() => {
                    onCustomPrompt(query);
                    setShowResults(false);
                    setQuery('');
                  }}
                  className={`w-full px-4 py-3 flex items-center gap-3 text-left border-t border-[var(--border-color)] transition-colors ${
                    selectedIndex === results.length
                      ? 'bg-[rgba(78,205,196,0.15)]'
                      : 'hover:bg-[var(--muted)]'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shrink-0">
                    <Icons.customPrompt className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <span className="font-medium text-[var(--foreground)]">
                      Create Custom Prompt
                    </span>
                    <p className="text-sm text-[var(--text-muted)]">
                      Build a custom prompt for: "{query}"
                    </p>
                  </div>
                  <Icons.arrowRight className="w-5 h-5 text-[var(--text-muted)]" />
                </button>
              </>
            ) : (
              <>
                {/* No Results - Show Custom Prompt Option */}
                <div className="px-4 py-6 text-center">
                  <Icons.search className="w-8 h-8 text-[var(--text-muted)] mx-auto mb-2 opacity-50" />
                  <p className="text-sm text-[var(--text-secondary)]">
                    No matching templates found
                  </p>
                  <p className="text-xs text-[var(--text-muted)] mt-1">
                    Create a custom prompt instead
                  </p>
                </div>
                <button
                  onClick={() => {
                    onCustomPrompt(query);
                    setShowResults(false);
                    setQuery('');
                  }}
                  className="w-full px-4 py-3 flex items-center gap-3 text-left border-t border-[var(--border-color)] hover:bg-[var(--muted)] transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shrink-0">
                    <Icons.customPrompt className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <span className="font-medium text-[var(--foreground)]">
                      Create Custom Prompt
                    </span>
                    <p className="text-sm text-[var(--text-muted)]">
                      Build a personalized prompt for your specific needs
                    </p>
                  </div>
                  <Icons.arrowRight className="w-5 h-5 text-[var(--text-muted)]" />
                </button>
              </>
            )}
          </div>

          {/* Keyboard Hints */}
          <div className="px-4 py-2 border-t border-[var(--border-color)] bg-[var(--muted)] flex items-center justify-between text-xs text-[var(--text-muted)]">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-[var(--card)] border border-[var(--border-color)]">
                  <Icons.chevronDown className="w-3 h-3 inline" />
                </kbd>
                <kbd className="px-1.5 py-0.5 rounded bg-[var(--card)] border border-[var(--border-color)]">
                  <Icons.chevronRight className="w-3 h-3 inline rotate-[-90deg]" />
                </kbd>
                to navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-[var(--card)] border border-[var(--border-color)]">
                  Enter
                </kbd>
                to select
              </span>
            </div>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-[var(--card)] border border-[var(--border-color)]">
                Esc
              </kbd>
              to close
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default SmartSearch;
