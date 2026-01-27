'use client';

import { useState } from 'react';
import { LLM_TARGETS, TargetLLM, LLMTarget } from '../data/llm-targets';
import { Icons } from './Icons';

interface LLMTargetSelectorProps {
  selected: TargetLLM;
  onSelect: (target: TargetLLM) => void;
  showDetails?: boolean;
  compact?: boolean;
}

export default function LLMTargetSelector({
  selected,
  onSelect,
  showDetails = true,
  compact = false,
}: LLMTargetSelectorProps) {
  const [hoveredTarget, setHoveredTarget] = useState<TargetLLM | null>(null);
  const selectedTarget = LLM_TARGETS.find(t => t.id === selected);
  const displayTarget = hoveredTarget
    ? LLM_TARGETS.find(t => t.id === hoveredTarget)
    : selectedTarget;

  if (compact) {
    return (
      <div className="flex flex-wrap gap-2">
        {LLM_TARGETS.map((target) => (
          <button
            key={target.id}
            onClick={() => onSelect(target.id)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              selected === target.id
                ? 'bg-[rgba(212,168,83,0.15)] text-[#d4a853] border border-[rgba(212,168,83,0.3)]'
                : 'bg-[#0f2137] border border-[#1e3a5f] text-[#94a3b8] hover:border-[#2d4a6f] hover:text-white'
            }`}
          >
            <span>{target.logo}</span>
            <span>{target.name}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Target Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {LLM_TARGETS.map((target) => (
          <button
            key={target.id}
            onClick={() => onSelect(target.id)}
            onMouseEnter={() => setHoveredTarget(target.id)}
            onMouseLeave={() => setHoveredTarget(null)}
            className={`relative p-4 rounded-xl border transition-all group ${
              selected === target.id
                ? 'bg-[rgba(212,168,83,0.1)] border-[#d4a853]'
                : 'bg-[#0f2137] border-[#1e3a5f] hover:border-[#2d4a6f]'
            }`}
          >
            {/* Selected indicator */}
            {selected === target.id && (
              <div className="absolute top-2 right-2">
                <div className="w-5 h-5 rounded-full bg-[#d4a853] flex items-center justify-center">
                  <Icons.check className="w-3 h-3 text-[#0a1929]" />
                </div>
              </div>
            )}

            <div className="text-center">
              <div
                className="text-3xl mb-2 transition-transform group-hover:scale-110"
              >
                {target.logo}
              </div>
              <div className={`font-semibold mb-1 ${
                selected === target.id ? 'text-[#d4a853]' : 'text-white'
              }`}>
                {target.name}
              </div>
              <div className="text-xs text-[#64748b]">
                {target.provider}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Details Panel */}
      {showDetails && displayTarget && (
        <div className="p-5 rounded-xl bg-[#0f2137] border border-[#1e3a5f]">
          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
              style={{ background: `${displayTarget.color}20` }}
            >
              {displayTarget.logo}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-semibold text-white">{displayTarget.name}</h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#1e3a5f] text-[#94a3b8]">
                  {displayTarget.provider}
                </span>
              </div>

              {/* Characteristics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3 mb-4">
                <div className="text-center p-2 rounded-lg bg-[#0a1929]">
                  <div className="text-xs text-[#64748b]">Context</div>
                  <div className="text-sm font-medium text-white">{displayTarget.characteristics.maxContextWindow}</div>
                </div>
                <div className="text-center p-2 rounded-lg bg-[#0a1929]">
                  <div className="text-xs text-[#64748b]">Format</div>
                  <div className="text-sm font-medium text-white capitalize">{displayTarget.characteristics.preferredFormat}</div>
                </div>
                <div className="text-center p-2 rounded-lg bg-[#0a1929]">
                  <div className="text-xs text-[#64748b]">Images</div>
                  <div className="text-sm font-medium text-white">
                    {displayTarget.characteristics.supportsImages ? '✓ Yes' : '✗ No'}
                  </div>
                </div>
                <div className="text-center p-2 rounded-lg bg-[#0a1929]">
                  <div className="text-xs text-[#64748b]">Tools</div>
                  <div className="text-sm font-medium text-white">
                    {displayTarget.characteristics.supportsTools ? '✓ Yes' : '✗ No'}
                  </div>
                </div>
              </div>

              {/* Best For */}
              <div className="mb-3">
                <div className="text-xs text-[#64748b] mb-1">Best for:</div>
                <div className="flex flex-wrap gap-1">
                  {displayTarget.bestFor.map((use) => (
                    <span
                      key={use}
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{ background: `${displayTarget.color}20`, color: displayTarget.color }}
                    >
                      {use}
                    </span>
                  ))}
                </div>
              </div>

              {/* Optimization Tips */}
              <div>
                <div className="text-xs text-[#64748b] mb-2">Optimization tips:</div>
                <ul className="space-y-1">
                  {displayTarget.optimizationTips.slice(0, 3).map((tip, i) => (
                    <li key={i} className="text-sm text-[#94a3b8] flex items-start gap-2">
                      <span className="text-[#d4a853] mt-0.5">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
