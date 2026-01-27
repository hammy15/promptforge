'use client';

import { useState } from 'react';
import { Icons } from '../Icons';
import Tooltip from '../ui/Tooltip';
import { QUICK_STARTS, LLM_INFO, TaskPattern, TargetLLM } from '../../data/task-patterns';
import { TOOLTIPS } from '../../data/walkthrough-steps';

interface IntentInputProps {
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
  detectedTask: TaskPattern | null;
  recommendedLLM: TargetLLM | null;
}

export default function IntentInput({
  value,
  onChange,
  onNext,
  detectedTask,
  recommendedLLM,
}: IntentInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleQuickStart = (task: string) => {
    onChange(task);
  };

  const canProceed = value.trim().length > 10;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#d4a853] to-[#b8953f] mb-4">
          <Icons.edit className="w-8 h-8 text-[#0a1929]" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">What do you want to do?</h2>
        <p className="text-[#94a3b8]">Describe your task in plain language. We'll help you build the perfect prompt.</p>
      </div>

      {/* Main Input */}
      <div className="relative" data-tour="intent-input">
        <Tooltip content={TOOLTIPS.intentInput} position="top">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="e.g., Write a Python script that organizes my photos by date and removes duplicates..."
            rows={4}
            className={`w-full px-5 py-4 bg-[#0a1929] border-2 rounded-xl text-white text-lg placeholder-[#64748b] focus:outline-none resize-none transition-colors ${
              isFocused ? 'border-[#d4a853]' : 'border-[#1e3a5f]'
            }`}
          />
        </Tooltip>
        <div className="absolute bottom-3 right-3 text-xs text-[#64748b]">
          {value.length} characters
        </div>
      </div>

      {/* Detection Feedback */}
      {value.length > 10 && detectedTask && recommendedLLM && (
        <div className="p-4 rounded-xl bg-[#0f2137] border border-[#1e3a5f] animate-fadeIn" data-tour="task-detection">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-[#d4a853]/20">
              <Icons.bolt className="w-5 h-5 text-[#d4a853]" />
            </div>
            <div className="flex-1">
              <div className="text-sm text-[#64748b] mb-1">Detected task type</div>
              <div className="text-white font-medium mb-2">{detectedTask.name}</div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#64748b]">Recommended AI:</span>
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{ backgroundColor: `${LLM_INFO[recommendedLLM].color}20`, color: LLM_INFO[recommendedLLM].color }}
                >
                  {LLM_INFO[recommendedLLM].name}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Starts */}
      {value.length === 0 && (
        <div data-tour="quick-starts">
          <div className="text-sm text-[#64748b] mb-3">Quick starts:</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {QUICK_STARTS.map((quick, i) => (
              <Tooltip key={i} content={TOOLTIPS.quickStarts} position="bottom">
                <button
                  onClick={() => handleQuickStart(quick.task)}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-[#1e3a5f] text-[#94a3b8] hover:text-white hover:bg-[#2d4a6f] transition-all text-sm"
                >
                  <Icons.code className="w-4 h-4" />
                  {quick.label}
                </button>
              </Tooltip>
            ))}
          </div>
        </div>
      )}

      {/* Continue Button */}
      <button
        onClick={onNext}
        disabled={!canProceed}
        className={`w-full py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-all ${
          canProceed
            ? 'bg-gradient-to-r from-[#d4a853] to-[#b8953f] text-[#0a1929] hover:opacity-90'
            : 'bg-[#1e3a5f] text-[#64748b] cursor-not-allowed'
        }`}
      >
        Continue
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </button>
    </div>
  );
}
