'use client';

import { useState } from 'react';
import { Icons } from '../Icons';

interface TeachingTipProps {
  title: string;
  content: string;
  defaultOpen?: boolean;
}

export default function TeachingTip({ title, content, defaultOpen = false }: TeachingTipProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="mt-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 text-xs text-[#64748b] hover:text-[#d4a853] transition-colors"
      >
        <Icons.lightbulb className="w-3.5 h-3.5" />
        <span>{isOpen ? 'Hide tip' : 'Why this matters'}</span>
        <svg
          className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="mt-2 p-3 rounded-lg bg-[#0a1929] border border-[#1e3a5f]">
          <div className="text-sm font-medium text-[#d4a853] mb-1">{title}</div>
          <div className="text-xs text-[#94a3b8] leading-relaxed">{content}</div>
        </div>
      )}
    </div>
  );
}
