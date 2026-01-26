// SuggestionPanel.tsx - AI-powered prompt improvement suggestions
// Best practice assistant with real-time feedback

'use client';

import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lightbulb, AlertTriangle, AlertCircle, CheckCircle2,
  Sparkles, Wand2, ChevronRight, Shield, Zap, Target
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

import type {
  PromptAnalysis,
  PromptSuggestion,
  SuggestionCategory,
  SuggestionSeverity,
} from '@/types/prompt.types';

interface SuggestionPanelProps {
  analysis: PromptAnalysis | null;
  isAnalyzing: boolean;
  onApplySuggestion: (suggestion: PromptSuggestion) => void;
}

const SEVERITY_CONFIG: Record<SuggestionSeverity, { icon: typeof AlertCircle; color: string; label: string }> = {
  error: { icon: AlertCircle, color: 'text-red-400 bg-red-500/10', label: 'Issue' },
  warning: { icon: AlertTriangle, color: 'text-yellow-400 bg-yellow-500/10', label: 'Warning' },
  info: { icon: Lightbulb, color: 'text-turquoise-400 bg-turquoise-500/10', label: 'Tip' },
};

const CATEGORY_CONFIG: Record<SuggestionCategory, { icon: typeof Target; label: string }> = {
  clarity: { icon: Target, label: 'Clarity' },
  structure: { icon: Zap, label: 'Structure' },
  safety: { icon: Shield, label: 'Safety' },
  performance: { icon: Sparkles, label: 'Performance' },
  best_practice: { icon: CheckCircle2, label: 'Best Practice' },
};

export function SuggestionPanel({ analysis, isAnalyzing, onApplySuggestion }: SuggestionPanelProps) {
  // Group suggestions by category
  const groupedSuggestions = useMemo(() => {
    if (!analysis?.suggestions) return new Map<SuggestionCategory, PromptSuggestion[]>();

    const grouped = new Map<SuggestionCategory, PromptSuggestion[]>();
    for (const suggestion of analysis.suggestions) {
      const existing = grouped.get(suggestion.category) || [];
      grouped.set(suggestion.category, [...existing, suggestion]);
    }
    return grouped;
  }, [analysis]);

  // Calculate score color
  const scoreColor = useMemo(() => {
    if (!analysis) return 'text-gray-500';
    if (analysis.score >= 80) return 'text-green-400';
    if (analysis.score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  }, [analysis]);

  // Count issues by severity
  const issueCounts = useMemo(() => {
    if (!analysis?.suggestions) return { error: 0, warning: 0, info: 0 };
    return analysis.suggestions.reduce(
      (acc, s) => ({ ...acc, [s.severity]: acc[s.severity] + 1 }),
      { error: 0, warning: 0, info: 0 }
    );
  }, [analysis]);

  return (
    <div className="h-full flex flex-col">
      {/* Header with Score */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">Prompt Analysis</h3>

        {isAnalyzing ? (
          <div className="neu-card p-4 animate-pulse">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-surface-sunken" />
              <div className="flex-1">
                <div className="h-4 bg-surface-sunken rounded w-24 mb-2" />
                <div className="h-3 bg-surface-sunken rounded w-32" />
              </div>
            </div>
          </div>
        ) : analysis ? (
          <div className="neu-card p-4">
            <div className="flex items-center gap-4">
              {/* Score Circle */}
              <div className="relative w-16 h-16">
                <svg className="w-full h-full -rotate-90">
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    className="text-surface-sunken"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeDasharray={`${(analysis.score / 100) * 176} 176`}
                    strokeLinecap="round"
                    className={scoreColor}
                  />
                </svg>
                <span className={cn('absolute inset-0 flex items-center justify-center text-xl font-bold', scoreColor)}>
                  {analysis.score}
                </span>
              </div>

              {/* Issue Summary */}
              <div className="flex-1">
                <p className="text-sm text-gray-400 mb-2">Prompt Quality Score</p>
                <div className="flex items-center gap-3">
                  {issueCounts.error > 0 && (
                    <Badge className="bg-red-500/20 text-red-400 border-none">
                      {issueCounts.error} issues
                    </Badge>
                  )}
                  {issueCounts.warning > 0 && (
                    <Badge className="bg-yellow-500/20 text-yellow-400 border-none">
                      {issueCounts.warning} warnings
                    </Badge>
                  )}
                  {issueCounts.info > 0 && (
                    <Badge className="bg-turquoise-500/20 text-turquoise-400 border-none">
                      {issueCounts.info} tips
                    </Badge>
                  )}
                  {analysis.suggestions.length === 0 && (
                    <span className="text-sm text-green-400 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      Looking good!
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Token Estimate */}
            <div className="mt-4 pt-4 border-t border-white/5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Estimated tokens</span>
                <span className="text-white font-mono">{analysis.estimatedTokens.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="neu-card p-4 text-center text-gray-500">
            <Sparkles className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Start writing to see suggestions</p>
          </div>
        )}
      </div>

      {/* Strengths */}
      {analysis?.strengths && analysis.strengths.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-400 mb-3">Strengths</h4>
          <div className="space-y-2">
            {analysis.strengths.map((strength, i) => (
              <div key={i} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <span className="text-gray-300">{strength}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Suggestions by Category */}
      <div className="flex-1 overflow-y-auto space-y-4">
        <AnimatePresence>
          {Array.from(groupedSuggestions.entries()).map(([category, suggestions]) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <SuggestionCategory
                category={category}
                suggestions={suggestions}
                onApply={onApplySuggestion}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Quick Actions */}
      {analysis?.suggestions && analysis.suggestions.some((s) => s.autoFixAvailable) && (
        <div className="mt-4 pt-4 border-t border-white/5">
          <Button
            onClick={() => {
              analysis.suggestions
                .filter((s) => s.autoFixAvailable)
                .forEach(onApplySuggestion);
            }}
            className="w-full bg-gradient-turquoise text-white"
          >
            <Wand2 className="w-4 h-4 mr-2" />
            Apply All Auto-fixes ({analysis.suggestions.filter((s) => s.autoFixAvailable).length})
          </Button>
        </div>
      )}
    </div>
  );
}

// ============================================
// Suggestion Category Component
// ============================================

interface SuggestionCategoryProps {
  category: SuggestionCategory;
  suggestions: PromptSuggestion[];
  onApply: (suggestion: PromptSuggestion) => void;
}

function SuggestionCategory({ category, suggestions, onApply }: SuggestionCategoryProps) {
  const config = CATEGORY_CONFIG[category];
  const Icon = config.icon;

  // Sort by severity (errors first)
  const sortedSuggestions = [...suggestions].sort((a, b) => {
    const order = { error: 0, warning: 1, info: 2 };
    return order[a.severity] - order[b.severity];
  });

  return (
    <Collapsible defaultOpen className="neu-card">
      <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors rounded-t-neu">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-turquoise-500/10 text-turquoise-400">
            <Icon className="w-4 h-4" />
          </div>
          <span className="font-medium text-white">{config.label}</span>
          <Badge variant="secondary" className="bg-white/5 text-gray-400 border-none">
            {suggestions.length}
          </Badge>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-500 transition-transform [&[data-state=open]]:rotate-90" />
      </CollapsibleTrigger>

      <CollapsibleContent className="p-4 pt-0 space-y-3">
        {sortedSuggestions.map((suggestion) => (
          <SuggestionItem
            key={suggestion.id}
            suggestion={suggestion}
            onApply={() => onApply(suggestion)}
          />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}

// ============================================
// Individual Suggestion Item
// ============================================

interface SuggestionItemProps {
  suggestion: PromptSuggestion;
  onApply: () => void;
}

function SuggestionItem({ suggestion, onApply }: SuggestionItemProps) {
  const severityConfig = SEVERITY_CONFIG[suggestion.severity];
  const SeverityIcon = severityConfig.icon;

  return (
    <div className="p-3 rounded-lg bg-surface-sunken/50">
      <div className="flex items-start gap-3">
        <div className={cn('p-1.5 rounded', severityConfig.color)}>
          <SeverityIcon className="w-4 h-4" />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm text-white mb-1">{suggestion.message}</p>
          <p className="text-xs text-gray-500 mb-2">{suggestion.suggestion}</p>

          {suggestion.field !== 'general' && (
            <Badge variant="outline" className="text-xs border-white/10 text-gray-400">
              {suggestion.field}
            </Badge>
          )}
        </div>

        {suggestion.autoFixAvailable && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant="ghost"
                onClick={onApply}
                className="shrink-0 text-turquoise-400 hover:text-turquoise-300 hover:bg-turquoise-500/10"
              >
                <Wand2 className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Apply fix</TooltipContent>
          </Tooltip>
        )}
      </div>
    </div>
  );
}

// ============================================
// usePromptAnalysis Hook
// ============================================

export function usePromptAnalysis(content: any): {
  analysis: PromptAnalysis | null;
  isAnalyzing: boolean;
} {
  // In production, this would call an analysis endpoint
  // Here's a mock implementation with common rules

  const analysis = useMemo((): PromptAnalysis | null => {
    if (!content?.objective) return null;

    const suggestions: PromptSuggestion[] = [];
    const strengths: string[] = [];
    let score = 100;

    // Check objective length
    if (content.objective.length < 50) {
      suggestions.push({
        id: '1',
        category: 'clarity',
        severity: 'warning',
        field: 'objective',
        message: 'Objective is quite short',
        suggestion: 'Consider adding more detail about the expected output and success criteria.',
        autoFixAvailable: false,
      });
      score -= 10;
    } else {
      strengths.push('Clear and detailed objective');
    }

    // Check for vague terms
    const vagueTerms = ['good', 'nice', 'better', 'some', 'many', 'few'];
    const hasVagueTerms = vagueTerms.some(
      (term) =>
        content.objective?.toLowerCase().includes(term) ||
        content.context?.toLowerCase().includes(term)
    );

    if (hasVagueTerms) {
      suggestions.push({
        id: '2',
        category: 'clarity',
        severity: 'info',
        field: 'general',
        message: 'Contains vague terms',
        suggestion: 'Replace vague words like "good", "some", "many" with specific quantities or criteria.',
        autoFixAvailable: false,
      });
      score -= 5;
    }

    // Check for examples
    if (content.examples && content.examples.length > 0) {
      strengths.push(`Includes ${content.examples.length} examples for few-shot learning`);
      score += 5;
    } else {
      suggestions.push({
        id: '3',
        category: 'best_practice',
        severity: 'info',
        field: 'examples',
        message: 'No examples provided',
        suggestion: 'Adding 1-3 examples can significantly improve output quality through few-shot learning.',
        autoFixAvailable: false,
      });
    }

    // Check for constraints
    if (content.constraints && content.constraints.length > 0) {
      strengths.push('Includes explicit constraints');
    } else {
      suggestions.push({
        id: '4',
        category: 'structure',
        severity: 'info',
        field: 'constraints',
        message: 'No constraints specified',
        suggestion: 'Add constraints to guide the model (e.g., length limits, required elements, things to avoid).',
        autoFixAvailable: false,
      });
      score -= 5;
    }

    // Check for persona
    if (content.persona) {
      strengths.push('Defined AI persona for consistent responses');
    }

    // Check output format
    if (content.outputFormat && content.outputFormat !== 'plain_text') {
      strengths.push(`Structured output format: ${content.outputFormat}`);
    }

    // Prompt injection check
    const injectionPatterns = ['ignore previous', 'disregard', 'forget everything', 'new instructions'];
    const hasInjectionRisk = injectionPatterns.some(
      (pattern) =>
        content.objective?.toLowerCase().includes(pattern) ||
        content.context?.toLowerCase().includes(pattern)
    );

    if (hasInjectionRisk) {
      suggestions.push({
        id: '5',
        category: 'safety',
        severity: 'error',
        field: 'general',
        message: 'Potential prompt injection vulnerability',
        suggestion: 'Review the prompt for patterns that could be exploited to override instructions.',
        autoFixAvailable: false,
      });
      score -= 20;
    }

    // Clamp score
    score = Math.max(0, Math.min(100, score));

    // Estimate tokens (rough calculation)
    const textLength =
      (content.context?.length || 0) +
      (content.objective?.length || 0) +
      (content.persona?.length || 0) +
      content.constraints.join(' ').length +
      content.examples.map((e: any) => e.input.length + e.output.length).reduce((a: number, b: number) => a + b, 0);

    const estimatedTokens = Math.ceil(textLength / 4);

    return {
      score,
      suggestions,
      strengths,
      framework: content.framework || null,
      estimatedTokens,
    };
  }, [content]);

  return {
    analysis,
    isAnalyzing: false,
  };
}
