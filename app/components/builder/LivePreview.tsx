'use client';

import { Icons } from '../Icons';
import { TargetLLM, LLM_INFO } from '../../data/task-patterns';

interface LivePreviewProps {
  prompt: string;
  targetLLM: TargetLLM;
  sections?: {
    role: string;
    task: string;
    requirements: string;
    format: string;
  };
  isVisible: boolean;
  onToggle: () => void;
}

export default function LivePreview({
  prompt,
  targetLLM,
  sections,
  isVisible,
  onToggle,
}: LivePreviewProps) {
  const llmInfo = LLM_INFO[targetLLM];

  // Estimate tokens (rough approximation: ~4 chars per token)
  const estimatedTokens = Math.ceil(prompt.length / 4);

  if (!isVisible) {
    return (
      <button
        onClick={onToggle}
        className="fixed right-4 bottom-4 md:right-8 md:bottom-8 p-4 rounded-xl bg-[#4ECDC4] text-[#0a1929] shadow-lg hover:bg-[#c49843] transition-colors z-40"
      >
        <Icons.eye className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed right-0 top-0 h-full w-full md:w-[400px] bg-[#0a1929] border-l border-[#1e3a5f] shadow-2xl z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-[#1e3a5f]">
        <div className="flex items-center gap-2">
          <Icons.eye className="w-5 h-5 text-[#4ECDC4]" />
          <span className="font-semibold text-white">Live Preview</span>
        </div>
        <button
          onClick={onToggle}
          className="p-2 text-[#64748b] hover:text-white transition-colors"
        >
          <Icons.close className="w-5 h-5" />
        </button>
      </div>

      {/* LLM Badge */}
      <div className="px-4 py-3 border-b border-[#1e3a5f]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${llmInfo.color}20`, color: llmInfo.color }}
            >
              <Icons.target className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-medium text-white">{llmInfo.name}</div>
              <div className="text-xs text-[#64748b]">Target LLM</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-white">~{estimatedTokens}</div>
            <div className="text-xs text-[#64748b]">tokens</div>
          </div>
        </div>
      </div>

      {/* Prompt Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {prompt ? (
          <div className="space-y-4">
            {/* Color-coded sections if available */}
            {sections ? (
              <>
                {sections.role && (
                  <div className="space-y-1">
                    <div className="text-xs font-medium text-[#14b8a6]">ROLE</div>
                    <div className="p-3 rounded-lg bg-[#14b8a6]/10 text-sm text-[#94a3b8] whitespace-pre-wrap">
                      {sections.role}
                    </div>
                  </div>
                )}
                {sections.task && (
                  <div className="space-y-1">
                    <div className="text-xs font-medium text-[#4ECDC4]">TASK</div>
                    <div className="p-3 rounded-lg bg-[#4ECDC4]/10 text-sm text-[#94a3b8] whitespace-pre-wrap">
                      {sections.task}
                    </div>
                  </div>
                )}
                {sections.requirements && (
                  <div className="space-y-1">
                    <div className="text-xs font-medium text-[#8b5cf6]">REQUIREMENTS</div>
                    <div className="p-3 rounded-lg bg-[#8b5cf6]/10 text-sm text-[#94a3b8] whitespace-pre-wrap">
                      {sections.requirements}
                    </div>
                  </div>
                )}
                {sections.format && (
                  <div className="space-y-1">
                    <div className="text-xs font-medium text-[#f97316]">FORMAT</div>
                    <div className="p-3 rounded-lg bg-[#f97316]/10 text-sm text-[#94a3b8] whitespace-pre-wrap">
                      {sections.format}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="p-4 rounded-lg bg-[#0f2137] text-sm text-[#94a3b8] whitespace-pre-wrap font-mono">
                {prompt}
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center text-[#64748b]">
            <Icons.document className="w-12 h-12 mb-3 opacity-50" />
            <p className="text-sm">Your prompt will appear here as you build it</p>
          </div>
        )}
      </div>

      {/* Footer Stats */}
      {prompt && (
        <div className="p-4 border-t border-[#1e3a5f]">
          <div className="flex items-center justify-between text-xs text-[#64748b]">
            <span>{prompt.length} characters</span>
            <span>~{estimatedTokens} tokens</span>
            <span
              className="px-2 py-0.5 rounded-full"
              style={{ backgroundColor: `${llmInfo.color}20`, color: llmInfo.color }}
            >
              {llmInfo.name}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
