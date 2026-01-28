'use client';

import { useState, useEffect } from 'react';
import { scorePrompt, getScoreLabel, improvePrompt, PromptScore } from '@/features/prompt-scoring';
import { Icons } from './Icons';

interface PromptScoreCardProps {
  prompt: string;
  onImprove?: (improvedPrompt: string) => void;
  compact?: boolean;
}

export function PromptScoreCard({ prompt, onImprove, compact = false }: PromptScoreCardProps) {
  const [score, setScore] = useState<PromptScore | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [isImproving, setIsImproving] = useState(false);

  useEffect(() => {
    if (prompt && prompt.length > 10) {
      const newScore = scorePrompt(prompt);
      setScore(newScore);
    } else {
      setScore(null);
    }
  }, [prompt]);

  if (!score) {
    return null;
  }

  const { label, color } = getScoreLabel(score.overall);

  const handleImprove = () => {
    if (!onImprove) return;
    setIsImproving(true);
    const improved = improvePrompt(prompt);
    setTimeout(() => {
      onImprove(improved);
      setIsImproving(false);
    }, 500);
  };

  if (compact) {
    return (
      <div className="flex items-center gap-3">
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
          style={{ backgroundColor: `${color}20` }}
        >
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: color }}
          />
          <span className="text-sm font-medium" style={{ color }}>
            {score.overall}
          </span>
          <span className="text-xs text-[var(--text-muted)]">/ 100</span>
        </div>
        <span className="text-xs" style={{ color }}>{label}</span>
      </div>
    );
  }

  return (
    <div className="card p-4 space-y-4">
      {/* Score Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${color}20` }}
          >
            <span className="text-2xl font-bold" style={{ color }}>
              {score.overall}
            </span>
          </div>
          <div>
            <div className="font-semibold text-[var(--foreground)]" style={{ color }}>
              {label}
            </div>
            <div className="text-xs text-[var(--text-muted)]">Prompt Quality Score</div>
          </div>
        </div>

        {onImprove && (
          <button
            onClick={handleImprove}
            disabled={isImproving || score.overall >= 90}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[rgba(78,205,196,0.2)] text-[#4ECDC4] hover:bg-[rgba(78,205,196,0.3)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isImproving ? (
              <>
                <div className="w-4 h-4 border-2 border-[#4ECDC4] border-t-transparent rounded-full animate-spin" />
                Improving...
              </>
            ) : (
              <>
                <Icons.wand className="w-4 h-4" />
                Improve
              </>
            )}
          </button>
        )}
      </div>

      {/* Category Scores */}
      <div className="grid grid-cols-5 gap-2">
        {Object.entries(score.categories).map(([category, value]) => (
          <div key={category} className="text-center">
            <div
              className="h-1.5 rounded-full bg-[var(--muted)] mb-1"
            >
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${value}%`,
                  backgroundColor: getScoreLabel(value).color
                }}
              />
            </div>
            <div className="text-xs text-[var(--text-muted)] capitalize">{category}</div>
          </div>
        ))}
      </div>

      {/* Toggle Details */}
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="w-full flex items-center justify-between text-sm text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors"
      >
        <span>{showDetails ? 'Hide details' : 'Show details'}</span>
        <Icons.chevronDown className={`w-4 h-4 transition-transform ${showDetails ? 'rotate-180' : ''}`} />
      </button>

      {/* Detailed Feedback */}
      {showDetails && (
        <div className="space-y-4 pt-2 border-t border-[var(--border-color)]">
          {/* Suggestions */}
          {score.suggestions.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-[#f59e0b] mb-2">
                <Icons.lightbulb className="w-4 h-4" />
                Suggestions
              </div>
              <ul className="space-y-1">
                {score.suggestions.map((suggestion, i) => (
                  <li key={i} className="text-xs text-[var(--text-secondary)] flex items-start gap-2">
                    <span className="text-[#f59e0b]">•</span>
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Strengths */}
          {score.strengths.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-[#059669] mb-2">
                <Icons.check className="w-4 h-4" />
                Strengths
              </div>
              <ul className="space-y-1">
                {score.strengths.map((strength, i) => (
                  <li key={i} className="text-xs text-[var(--text-secondary)] flex items-start gap-2">
                    <span className="text-[#059669]">•</span>
                    {strength}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PromptScoreCard;
