'use client';

import { useState } from 'react';
import { Icons } from './Icons';
import { TargetLLM } from '../data/llm-targets';

interface AIPromptGeneratorProps {
  targetLLM?: TargetLLM;
  styles?: string[];
  onPromptGenerated?: (prompt: string) => void;
}

export default function AIPromptGenerator({
  targetLLM = 'claude',
  styles = [],
  onPromptGenerated,
}: AIPromptGeneratorProps) {
  const [description, setDescription] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!description.trim()) return;

    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch('/api/ai/generate-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description,
          targetLLM,
          styles,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate prompt');
      }

      const data = await response.json();
      setGeneratedPrompt(data.generatedPrompt);
      onPromptGenerated?.(data.generatedPrompt);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Input Section */}
      <div>
        <label className="block text-sm font-medium text-[#94a3b8] mb-2">
          Describe what you need
        </label>
        <div className="relative">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g., I need a prompt that helps analyze quarterly earnings reports and identify key trends, risks, and opportunities..."
            rows={4}
            className="w-full px-4 py-3 bg-[#0a1929] border border-[#1e3a5f] rounded-lg text-white placeholder-[#64748b] focus:border-[#4ECDC4] focus:outline-none resize-none"
          />
          <div className="absolute bottom-3 right-3 flex items-center gap-2">
            <span className="text-xs text-[#64748b]">{description.length} chars</span>
          </div>
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={isGenerating || !description.trim()}
        className={`w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors ${
          isGenerating || !description.trim()
            ? 'bg-[#1e3a5f] text-[#64748b] cursor-not-allowed'
            : 'bg-gradient-to-r from-[#4ECDC4] to-[#3EB489] text-[#0a1929] hover:opacity-90'
        }`}
      >
        {isGenerating ? (
          <>
            <div className="w-5 h-5 border-2 border-[#0a1929] border-t-transparent rounded-full animate-spin" />
            Generating with AI...
          </>
        ) : (
          <>
            <Icons.bolt className="w-5 h-5" />
            Generate Prompt with AI
          </>
        )}
      </button>

      {/* Error Display */}
      {error && (
        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Generated Prompt Display */}
      {generatedPrompt && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-[#94a3b8]">Generated Prompt</label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigator.clipboard.writeText(generatedPrompt)}
                className="text-xs px-2 py-1 rounded bg-[#1e3a5f] text-[#94a3b8] hover:text-white transition-colors flex items-center gap-1"
              >
                <Icons.copy className="w-3 h-3" />
                Copy
              </button>
              <button
                onClick={() => {
                  setGeneratedPrompt('');
                  setDescription('');
                }}
                className="text-xs px-2 py-1 rounded bg-[#1e3a5f] text-[#94a3b8] hover:text-white transition-colors"
              >
                Clear
              </button>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-[#0a1929] border border-[#1e3a5f] max-h-96 overflow-y-auto">
            <pre className="text-sm text-white whitespace-pre-wrap font-mono">
              {generatedPrompt}
            </pre>
          </div>
        </div>
      )}

      {/* Quick Suggestions */}
      {!generatedPrompt && (
        <div className="pt-2">
          <div className="text-xs text-[#64748b] mb-2">Quick ideas:</div>
          <div className="flex flex-wrap gap-2">
            {[
              'Financial analysis assistant',
              'Code review helper',
              'Research summarizer',
              'Meeting notes generator',
            ].map((idea) => (
              <button
                key={idea}
                onClick={() => setDescription(idea)}
                className="text-xs px-2 py-1 rounded-full bg-[#1e3a5f] text-[#94a3b8] hover:text-white hover:bg-[#2d4a6f] transition-colors"
              >
                {idea}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
