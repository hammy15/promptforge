'use client';

import Link from 'next/link';
import { Icons } from './Icons';

export interface PromptCardData {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime?: string;
  outputFormats?: string[];
  targetLLM?: string;
  isCustom?: boolean;
  author?: string;
  updatedAt?: string;
}

interface PromptCardProps {
  prompt: PromptCardData;
  onClick?: () => void;
  href?: string;
}

export default function PromptCard({ prompt, onClick, href }: PromptCardProps) {
  const content = (
    <div className="group p-5 rounded-xl border border-[#1e3a5f] bg-[#0f2137] hover:border-[#d4a853] hover:bg-[#162a45] transition-all cursor-pointer">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#d4a853] to-[#b8953f] flex items-center justify-center text-2xl shrink-0">
          {prompt.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-white group-hover:text-[#d4a853] transition-colors truncate">
              {prompt.name}
            </h3>
            {prompt.isCustom && (
              <span className="text-xs px-1.5 py-0.5 rounded bg-[#14b8a6]/20 text-[#14b8a6]">
                Custom
              </span>
            )}
          </div>
          <p className="text-sm text-[#64748b] line-clamp-2 mt-1">
            {prompt.description}
          </p>
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            {prompt.difficulty && (
              <span className={`badge badge-${prompt.difficulty}`}>
                {prompt.difficulty}
              </span>
            )}
            {prompt.estimatedTime && (
              <span className="text-xs text-[#64748b]">{prompt.estimatedTime}</span>
            )}
            {prompt.targetLLM && (
              <span className="text-xs px-1.5 py-0.5 rounded bg-[#8b5cf6]/20 text-[#8b5cf6]">
                {prompt.targetLLM}
              </span>
            )}
            {prompt.outputFormats?.includes('excel') && (
              <span className="badge badge-excel text-xs">Excel</span>
            )}
            {prompt.outputFormats?.includes('powerpoint') && (
              <span className="badge badge-powerpoint text-xs">PPT</span>
            )}
          </div>
          {prompt.author && (
            <div className="flex items-center gap-2 mt-2 text-xs text-[#64748b]">
              <span>by {prompt.author}</span>
              {prompt.updatedAt && (
                <>
                  <span>•</span>
                  <span>{prompt.updatedAt}</span>
                </>
              )}
            </div>
          )}
        </div>
        <Icons.arrowRight className="w-5 h-5 text-[#64748b] group-hover:text-[#d4a853] transition-colors shrink-0" />
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return <div onClick={onClick}>{content}</div>;
}
