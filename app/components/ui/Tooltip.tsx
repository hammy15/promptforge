'use client';

import { useState, useRef, useEffect, ReactNode } from 'react';

interface TooltipProps {
  content: string;
  children: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}

export default function Tooltip({
  content,
  children,
  position = 'top',
  delay = 300,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const showTooltip = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  useEffect(() => {
    if (isVisible && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;

      let x = rect.left + scrollX + rect.width / 2;
      let y = rect.top + scrollY;

      switch (position) {
        case 'bottom':
          y = rect.bottom + scrollY + 8;
          break;
        case 'left':
          x = rect.left + scrollX - 8;
          y = rect.top + scrollY + rect.height / 2;
          break;
        case 'right':
          x = rect.right + scrollX + 8;
          y = rect.top + scrollY + rect.height / 2;
          break;
        default: // top
          y = rect.top + scrollY - 8;
      }

      setCoords({ x, y });
    }
  }, [isVisible, position]);

  const positionStyles: Record<string, string> = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  const arrowStyles: Record<string, string> = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-[#1e3a5f] border-x-transparent border-b-transparent',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-[#1e3a5f] border-x-transparent border-t-transparent',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-[#1e3a5f] border-y-transparent border-r-transparent',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-[#1e3a5f] border-y-transparent border-l-transparent',
  };

  return (
    <div
      ref={triggerRef}
      className="relative inline-flex"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}
      {isVisible && (
        <div
          className={`absolute z-50 ${positionStyles[position]} pointer-events-none`}
          role="tooltip"
        >
          <div className="px-3 py-2 text-xs text-white bg-[#1e3a5f] rounded-lg shadow-lg max-w-xs whitespace-normal border border-[#2d4a6f]">
            {content}
            <div
              className={`absolute w-0 h-0 border-4 ${arrowStyles[position]}`}
            />
          </div>
        </div>
      )}
    </div>
  );
}
