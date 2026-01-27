'use client';

import { useState } from 'react';
import { Icons } from '../Icons';
import { TargetLLM, LLM_INFO } from '../../data/task-patterns';

interface PromptOutputProps {
  prompt: string;
  targetLLM: TargetLLM;
  onBack: () => void;
  onStartOver: () => void;
  onTestInPlayground: () => void;
}

export default function PromptOutput({
  prompt,
  targetLLM,
  onBack,
  onStartOver,
  onTestInPlayground,
}: PromptOutputProps) {
  const [copied, setCopied] = useState(false);
  const llmInfo = LLM_INFO[targetLLM];

  const estimatedTokens = Math.ceil(prompt.length / 4);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Quality score based on prompt characteristics
  const getQualityScore = () => {
    let score = 0;
    if (prompt.includes('##') || prompt.includes('**')) score += 20; // Structure
    if (prompt.length > 100) score += 20; // Sufficient detail
    if (prompt.includes('step') || prompt.includes('Steps')) score += 15; // Steps
    if (prompt.includes('error') || prompt.includes('edge')) score += 15; // Error handling
    if (prompt.includes('format') || prompt.includes('Format')) score += 15; // Output format
    if (prompt.includes('role') || prompt.includes('expert') || prompt.includes('You are')) score += 15; // Role
    return Math.min(score, 100);
  };

  const qualityScore = getQualityScore();
  const qualityGrade = qualityScore >= 85 ? 'A+' : qualityScore >= 70 ? 'A' : qualityScore >= 55 ? 'B' : 'C';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#22c55e] to-[#16a34a] mb-4">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Your prompt is ready!</h2>
        <p className="text-[#94a3b8]">Copy it or test it in the playground.</p>
      </div>

      {/* Stats Bar */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-[#0f2137] border border-[#1e3a5f]">
        <div className="flex items-center gap-4">
          <div>
            <div className="text-xs text-[#64748b]">Tokens</div>
            <div className="text-lg font-semibold text-white">~{estimatedTokens}</div>
          </div>
          <div className="w-px h-8 bg-[#1e3a5f]" />
          <div>
            <div className="text-xs text-[#64748b]">Target</div>
            <div
              className="text-lg font-semibold"
              style={{ color: llmInfo.color }}
            >
              {llmInfo.name}
            </div>
          </div>
          <div className="w-px h-8 bg-[#1e3a5f]" />
          <div>
            <div className="text-xs text-[#64748b]">Quality</div>
            <div className="text-lg font-semibold text-[#22c55e]">{qualityGrade}</div>
          </div>
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-all ${
            copied
              ? 'bg-[#22c55e] text-white'
              : 'bg-[#4ECDC4] text-[#0a1929] hover:bg-[#c49843]'
          }`}
        >
          {copied ? (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <Icons.copy className="w-4 h-4" />
              Copy
            </>
          )}
        </button>
      </div>

      {/* Prompt Display */}
      <div className="rounded-xl bg-[#0a1929] border border-[#1e3a5f] overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#1e3a5f]">
          <span className="text-sm font-medium text-[#94a3b8]">Generated Prompt</span>
          <span className="text-xs text-[#64748b]">{prompt.length} characters</span>
        </div>
        <div className="p-4 max-h-80 overflow-y-auto">
          <pre className="text-sm text-white whitespace-pre-wrap font-mono leading-relaxed">
            {prompt}
          </pre>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={onTestInPlayground}
          className="py-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-[#4ECDC4] to-[#3EB489] text-[#0a1929] hover:opacity-90 transition-all flex items-center justify-center gap-2"
        >
          <Icons.play className="w-5 h-5" />
          Test in Playground
        </button>
        <button
          onClick={onStartOver}
          className="py-4 rounded-xl font-semibold text-white bg-[#1e3a5f] hover:bg-[#2d4a6f] transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Start Over
        </button>
      </div>

      {/* Back Link */}
      <button
        onClick={onBack}
        className="w-full py-3 text-[#64748b] hover:text-white transition-colors flex items-center justify-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
        </svg>
        Edit options
      </button>

      {/* Tips */}
      <div className="p-4 rounded-xl bg-[#0f2137] border border-[#1e3a5f]">
        <div className="flex items-start gap-3">
          <Icons.lightbulb className="w-5 h-5 text-[#4ECDC4] flex-shrink-0 mt-0.5" />
          <div className="text-sm text-[#94a3b8]">
            <span className="font-medium text-white">Pro tip:</span> You can paste this prompt directly into {llmInfo.name}.
            For best results, include any relevant context or files when you start the conversation.
          </div>
        </div>
      </div>
    </div>
  );
}
