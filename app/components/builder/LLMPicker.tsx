'use client';

import { Icons } from '../Icons';
import { TargetLLM, LLM_INFO } from '../../data/task-patterns';
import TeachingTip from './TeachingTip';
import { TEACHING_TIPS } from '../../data/prompt-templates';

interface LLMPickerProps {
  selected: TargetLLM;
  recommended: TargetLLM | null;
  onChange: (llm: TargetLLM) => void;
  onNext: () => void;
  onBack: () => void;
}

const LLM_ICONS: Record<TargetLLM, React.ReactNode> = {
  'claude-code': (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  'chatgpt': (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  'gemini': (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  'grok': (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

export default function LLMPicker({
  selected,
  recommended,
  onChange,
  onNext,
  onBack,
}: LLMPickerProps) {
  const llms: TargetLLM[] = ['claude-code', 'chatgpt', 'gemini', 'grok'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#14b8a6] to-[#0d9488] mb-4">
          <Icons.target className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Pick your AI</h2>
        <p className="text-[#94a3b8]">Which AI will you use this prompt with?</p>
      </div>

      {/* LLM Cards */}
      <div className="grid grid-cols-2 gap-4">
        {llms.map((llm) => {
          const info = LLM_INFO[llm];
          const isSelected = selected === llm;
          const isRecommended = recommended === llm;

          return (
            <button
              key={llm}
              onClick={() => onChange(llm)}
              className={`relative p-5 rounded-xl border-2 transition-all text-left ${
                isSelected
                  ? 'border-[#d4a853] bg-[#d4a853]/10'
                  : 'border-[#1e3a5f] bg-[#0f2137] hover:border-[#2d4a6f]'
              }`}
            >
              {/* Recommended Badge */}
              {isRecommended && (
                <div className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-[#d4a853] text-[#0a1929] text-xs font-semibold">
                  Best match
                </div>
              )}

              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                style={{ backgroundColor: `${info.color}20`, color: info.color }}
              >
                {LLM_ICONS[llm]}
              </div>

              {/* Name & Tagline */}
              <div className="font-semibold text-white mb-1">{info.name}</div>
              <div className="text-xs text-[#64748b] mb-3">{info.tagline}</div>

              {/* Best For */}
              <div className="text-xs text-[#94a3b8]">{info.bestFor}</div>

              {/* Selected Check */}
              {isSelected && (
                <div className="absolute bottom-3 right-3">
                  <div className="w-6 h-6 rounded-full bg-[#d4a853] flex items-center justify-center">
                    <svg className="w-4 h-4 text-[#0a1929]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Teaching Tip */}
      {selected && (
        <TeachingTip
          title={TEACHING_TIPS[`llm_${selected.replace('-', '_')}`]?.title || ''}
          content={TEACHING_TIPS[`llm_${selected.replace('-', '_')}`]?.content || ''}
        />
      )}

      {/* Navigation */}
      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 py-4 rounded-xl font-semibold text-white bg-[#1e3a5f] hover:bg-[#2d4a6f] transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
          </svg>
          Back
        </button>
        <button
          onClick={onNext}
          className="flex-1 py-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-[#d4a853] to-[#b8953f] text-[#0a1929] hover:opacity-90 transition-all flex items-center justify-center gap-2"
        >
          Continue
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
