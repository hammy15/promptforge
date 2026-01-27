'use client';

import TeachingTip from './TeachingTip';
import Tooltip from '../ui/Tooltip';
import { TEACHING_TIPS, PromptOptions as Options } from '../../data/prompt-templates';
import { TOOLTIPS } from '../../data/walkthrough-steps';

interface PromptOptionsProps {
  options: Options;
  onChange: (options: Options) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function PromptOptions({
  options,
  onChange,
  onNext,
  onBack,
}: PromptOptionsProps) {
  const updateOption = <K extends keyof Options>(key: K, value: Options[K]) => {
    onChange({ ...options, [key]: value });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#8b5cf6] to-[#7c3aed] mb-4">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Make it yours</h2>
        <p className="text-[#94a3b8]">Customize how the AI responds to you.</p>
      </div>

      {/* Options */}
      <div className="space-y-6">
        {/* Detail Level */}
        <div className="p-4 rounded-xl bg-[#0f2137] border border-[#1e3a5f]">
          <label className="block text-sm font-medium text-white mb-3">
            How detailed should responses be?
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['brief', 'detailed', 'comprehensive'] as const).map((level) => (
              <Tooltip
                key={level}
                content={TOOLTIPS[`detail${level.charAt(0).toUpperCase() + level.slice(1)}` as keyof typeof TOOLTIPS] || ''}
                position="bottom"
              >
                <button
                  onClick={() => updateOption('detail', level)}
                  className={`w-full py-3 px-4 rounded-lg text-sm font-medium capitalize transition-all ${
                    options.detail === level
                      ? 'bg-[#d4a853] text-[#0a1929]'
                      : 'bg-[#1e3a5f] text-[#94a3b8] hover:text-white'
                  }`}
                >
                  {level}
                </button>
              </Tooltip>
            ))}
          </div>
          <TeachingTip
            title={TEACHING_TIPS[`detail_${options.detail}`]?.title || ''}
            content={TEACHING_TIPS[`detail_${options.detail}`]?.content || ''}
          />
        </div>

        {/* Tone */}
        <div className="p-4 rounded-xl bg-[#0f2137] border border-[#1e3a5f]">
          <label className="block text-sm font-medium text-white mb-3">
            What tone should it use?
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['casual', 'professional', 'technical'] as const).map((tone) => (
              <Tooltip
                key={tone}
                content={TOOLTIPS[`tone${tone.charAt(0).toUpperCase() + tone.slice(1)}` as keyof typeof TOOLTIPS] || ''}
                position="bottom"
              >
                <button
                  onClick={() => updateOption('tone', tone)}
                  className={`w-full py-3 px-4 rounded-lg text-sm font-medium capitalize transition-all ${
                    options.tone === tone
                      ? 'bg-[#d4a853] text-[#0a1929]'
                      : 'bg-[#1e3a5f] text-[#94a3b8] hover:text-white'
                  }`}
                >
                  {tone}
                </button>
              </Tooltip>
            ))}
          </div>
          <TeachingTip
            title={TEACHING_TIPS[`tone_${options.tone}`]?.title || ''}
            content={TEACHING_TIPS[`tone_${options.tone}`]?.content || ''}
          />
        </div>

        {/* Toggle Options */}
        <div className="space-y-3">
          {/* Include Steps */}
          <label className="flex items-center justify-between p-4 rounded-xl bg-[#0f2137] border border-[#1e3a5f] cursor-pointer hover:border-[#2d4a6f] transition-colors">
            <div className="flex-1">
              <div className="text-sm font-medium text-white">Include step-by-step breakdown</div>
              <div className="text-xs text-[#64748b] mt-0.5">Break tasks into numbered steps</div>
            </div>
            <div className="relative">
              <input
                type="checkbox"
                checked={options.includeSteps}
                onChange={(e) => updateOption('includeSteps', e.target.checked)}
                className="sr-only"
              />
              <div
                className={`w-12 h-7 rounded-full transition-colors ${
                  options.includeSteps ? 'bg-[#d4a853]' : 'bg-[#1e3a5f]'
                }`}
              >
                <div
                  className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow transition-transform ${
                    options.includeSteps ? 'translate-x-5' : 'translate-x-0.5'
                  }`}
                />
              </div>
            </div>
          </label>

          {/* Include Errors */}
          <label className="flex items-center justify-between p-4 rounded-xl bg-[#0f2137] border border-[#1e3a5f] cursor-pointer hover:border-[#2d4a6f] transition-colors">
            <div className="flex-1">
              <div className="text-sm font-medium text-white">Include error handling</div>
              <div className="text-xs text-[#64748b] mt-0.5">Handle edge cases and potential issues</div>
            </div>
            <div className="relative">
              <input
                type="checkbox"
                checked={options.includeErrors}
                onChange={(e) => updateOption('includeErrors', e.target.checked)}
                className="sr-only"
              />
              <div
                className={`w-12 h-7 rounded-full transition-colors ${
                  options.includeErrors ? 'bg-[#d4a853]' : 'bg-[#1e3a5f]'
                }`}
              >
                <div
                  className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow transition-transform ${
                    options.includeErrors ? 'translate-x-5' : 'translate-x-0.5'
                  }`}
                />
              </div>
            </div>
          </label>
        </div>
      </div>

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
          Generate Prompt
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
