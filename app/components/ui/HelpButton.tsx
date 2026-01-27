'use client';

import { Icons } from '../Icons';
import Tooltip from './Tooltip';

interface HelpButtonProps {
  onClick: () => void;
  label?: string;
}

export default function HelpButton({ onClick, label = 'Start tour' }: HelpButtonProps) {
  return (
    <Tooltip content="Get a guided tour of this page" position="left">
      <button
        onClick={onClick}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-[#d4a853] to-[#b8953f] text-[#0a1929] rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all font-medium"
      >
        <Icons.help className="w-5 h-5" />
        <span className="hidden sm:inline">{label}</span>
      </button>
    </Tooltip>
  );
}
