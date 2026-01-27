'use client';

import { useState } from 'react';
import { Icons } from './Icons';

interface LLMRecommendation {
  model: string;
  score: number;
  reasons: string[];
  modelInfo?: {
    name: string;
    context: string;
    strengths: string[];
    cost: string;
  };
}

interface SuggestionResult {
  taskAnalysis: {
    detectedTaskType: string;
    complexity: 'simple' | 'moderate' | 'complex';
    requirements: string[];
  };
  llmRecommendations: LLMRecommendation[];
  suggestedTemplates: string[];
  promptTips: string[];
}

interface SmartSuggestionsProps {
  onSelectModel?: (model: string) => void;
  onSelectTemplate?: (template: string) => void;
}

export default function SmartSuggestions({
  onSelectModel,
  onSelectTemplate,
}: SmartSuggestionsProps) {
  const [userIntent, setUserIntent] = useState('');
  const [suggestions, setSuggestions] = useState<SuggestionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!userIntent.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/ai/suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userIntent }),
      });

      if (!response.ok) {
        throw new Error('Failed to get suggestions');
      }

      const data = await response.json();
      setSuggestions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const complexityColors = {
    simple: '#14b8a6',
    moderate: '#4ECDC4',
    complex: '#f97316',
  };

  return (
    <div className="space-y-4">
      {/* Input */}
      <div>
        <label className="block text-sm font-medium text-[#94a3b8] mb-2">
          What do you want to accomplish?
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={userIntent}
            onChange={(e) => setUserIntent(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
            placeholder="e.g., Analyze financial reports and extract key metrics"
            className="flex-1 px-4 py-2.5 bg-[#0a1929] border border-[#1e3a5f] rounded-lg text-white placeholder-[#64748b] focus:border-[#4ECDC4] focus:outline-none"
          />
          <button
            onClick={handleAnalyze}
            disabled={isLoading || !userIntent.trim()}
            className={`px-4 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-colors ${
              isLoading || !userIntent.trim()
                ? 'bg-[#1e3a5f] text-[#64748b] cursor-not-allowed'
                : 'bg-[#4ECDC4] text-[#0a1929] hover:bg-[#c49843]'
            }`}
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-[#0a1929] border-t-transparent rounded-full animate-spin" />
            ) : (
              <Icons.bolt className="w-4 h-4" />
            )}
            Analyze
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Results */}
      {suggestions && (
        <div className="space-y-4">
          {/* Task Analysis */}
          <div className="p-4 rounded-xl bg-[#0f2137] border border-[#1e3a5f]">
            <h4 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
              <Icons.target className="w-4 h-4 text-[#4ECDC4]" />
              Task Analysis
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-[#64748b]">Task Type</div>
                <div className="text-sm text-white capitalize">
                  {suggestions.taskAnalysis.detectedTaskType.replace('_', ' ')}
                </div>
              </div>
              <div>
                <div className="text-xs text-[#64748b]">Complexity</div>
                <div
                  className="text-sm font-medium capitalize"
                  style={{ color: complexityColors[suggestions.taskAnalysis.complexity] }}
                >
                  {suggestions.taskAnalysis.complexity}
                </div>
              </div>
            </div>
            {suggestions.taskAnalysis.requirements.length > 0 && (
              <div className="mt-3">
                <div className="text-xs text-[#64748b] mb-1">Requirements:</div>
                <div className="flex flex-wrap gap-1">
                  {suggestions.taskAnalysis.requirements.map((req, i) => (
                    <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-[#1e3a5f] text-[#94a3b8]">
                      {req}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* LLM Recommendations */}
          {suggestions.llmRecommendations.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
                <Icons.chart className="w-4 h-4 text-[#14b8a6]" />
                Recommended Models
              </h4>
              <div className="space-y-2">
                {suggestions.llmRecommendations.slice(0, 3).map((rec, i) => (
                  <button
                    key={i}
                    onClick={() => onSelectModel?.(rec.model)}
                    className="w-full p-4 rounded-xl bg-[#0f2137] border border-[#1e3a5f] hover:border-[#4ECDC4] transition-all text-left group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white group-hover:text-[#4ECDC4]">
                          {rec.modelInfo?.name || rec.model}
                        </span>
                        {rec.modelInfo?.cost && (
                          <span className="text-xs px-1.5 py-0.5 rounded bg-[#1e3a5f] text-[#64748b]">
                            {rec.modelInfo.cost}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <div
                          className="w-8 h-2 rounded-full bg-[#1e3a5f] overflow-hidden"
                        >
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-[#14b8a6] to-[#4ECDC4]"
                            style={{ width: `${rec.score}%` }}
                          />
                        </div>
                        <span className="text-xs text-[#64748b]">{rec.score}%</span>
                      </div>
                    </div>
                    {rec.reasons.length > 0 && (
                      <ul className="text-xs text-[#94a3b8] space-y-1">
                        {rec.reasons.slice(0, 2).map((reason, j) => (
                          <li key={j} className="flex items-start gap-1">
                            <span className="text-[#4ECDC4]">•</span>
                            {reason}
                          </li>
                        ))}
                      </ul>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Prompt Tips */}
          {suggestions.promptTips && suggestions.promptTips.length > 0 && (
            <div className="p-4 rounded-xl bg-[#0f2137] border border-[#1e3a5f]">
              <h4 className="text-sm font-medium text-white mb-2 flex items-center gap-2">
                <Icons.lightbulb className="w-4 h-4 text-[#4ECDC4]" />
                Prompt Tips
              </h4>
              <ul className="space-y-1">
                {suggestions.promptTips.map((tip, i) => (
                  <li key={i} className="text-sm text-[#94a3b8] flex items-start gap-2">
                    <span className="text-[#4ECDC4]">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Suggested Templates */}
          {suggestions.suggestedTemplates && suggestions.suggestedTemplates.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-white mb-2">Suggested Templates</h4>
              <div className="flex flex-wrap gap-2">
                {suggestions.suggestedTemplates.map((template, i) => (
                  <button
                    key={i}
                    onClick={() => onSelectTemplate?.(template)}
                    className="px-3 py-1.5 rounded-lg text-sm bg-[#1e3a5f] text-[#94a3b8] hover:text-white hover:bg-[#2d4a6f] transition-colors"
                  >
                    {template}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {!suggestions && !isLoading && (
        <div className="text-center py-6 text-[#64748b]">
          <Icons.bolt className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">Describe your task and we'll recommend the best LLM and approach</p>
        </div>
      )}
    </div>
  );
}
