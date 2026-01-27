'use client';

import { useState, useEffect, useCallback } from 'react';
import { Icons } from '../Icons';

export interface WalkthroughStep {
  target?: string; // CSS selector for element to highlight
  title: string;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center';
}

interface WalkthroughProps {
  steps: WalkthroughStep[];
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  storageKey: string; // For remembering completion
}

export default function Walkthrough({
  steps,
  isOpen,
  onClose,
  onComplete,
  storageKey,
}: WalkthroughProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  const step = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;

  // Find and highlight target element
  useEffect(() => {
    if (!isOpen || !step?.target) {
      setTargetRect(null);
      return;
    }

    const target = document.querySelector(step.target);
    if (target) {
      const rect = target.getBoundingClientRect();
      setTargetRect(rect);

      // Scroll element into view if needed
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      setTargetRect(null);
    }
  }, [isOpen, step, currentStep]);

  const handleNext = useCallback(() => {
    if (isLastStep) {
      localStorage.setItem(storageKey, 'completed');
      onComplete();
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  }, [isLastStep, onComplete, storageKey]);

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  const handleSkip = () => {
    localStorage.setItem(storageKey, 'skipped');
    onClose();
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        handleSkip();
      } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleNext]);

  if (!isOpen) return null;

  // Calculate tooltip position
  const getTooltipPosition = () => {
    if (!targetRect || step?.position === 'center') {
      return {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      };
    }

    const padding = 16;
    const tooltipWidth = 360;
    const tooltipHeight = 200;

    let top = 0;
    let left = 0;

    switch (step?.position || 'bottom') {
      case 'top':
        top = targetRect.top - tooltipHeight - padding;
        left = targetRect.left + targetRect.width / 2 - tooltipWidth / 2;
        break;
      case 'bottom':
        top = targetRect.bottom + padding;
        left = targetRect.left + targetRect.width / 2 - tooltipWidth / 2;
        break;
      case 'left':
        top = targetRect.top + targetRect.height / 2 - tooltipHeight / 2;
        left = targetRect.left - tooltipWidth - padding;
        break;
      case 'right':
        top = targetRect.top + targetRect.height / 2 - tooltipHeight / 2;
        left = targetRect.right + padding;
        break;
    }

    // Keep within viewport
    left = Math.max(padding, Math.min(left, window.innerWidth - tooltipWidth - padding));
    top = Math.max(padding, Math.min(top, window.innerHeight - tooltipHeight - padding));

    return { top: `${top}px`, left: `${left}px` };
  };

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" onClick={handleSkip} />

      {/* Spotlight on target element */}
      {targetRect && (
        <div
          className="absolute border-2 border-[#d4a853] rounded-lg shadow-[0_0_0_9999px_rgba(0,0,0,0.7)] transition-all duration-300"
          style={{
            top: targetRect.top - 4,
            left: targetRect.left - 4,
            width: targetRect.width + 8,
            height: targetRect.height + 8,
          }}
        />
      )}

      {/* Tooltip */}
      <div
        className="absolute w-[360px] bg-[#0f2137] border border-[#1e3a5f] rounded-xl shadow-2xl overflow-hidden"
        style={getTooltipPosition()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#d4a853] to-[#b8953f]">
          <div className="flex items-center gap-2">
            <Icons.lightbulb className="w-5 h-5 text-[#0a1929]" />
            <span className="font-semibold text-[#0a1929]">
              Step {currentStep + 1} of {steps.length}
            </span>
          </div>
          <button
            onClick={handleSkip}
            className="p-1 text-[#0a1929]/70 hover:text-[#0a1929] transition-colors"
          >
            <Icons.close className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
          <p className="text-sm text-[#94a3b8] leading-relaxed">{step.content}</p>
        </div>

        {/* Progress */}
        <div className="px-4 pb-2">
          <div className="flex gap-1">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-1 rounded-full transition-colors ${
                  i <= currentStep ? 'bg-[#d4a853]' : 'bg-[#1e3a5f]'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between p-4 border-t border-[#1e3a5f]">
          <button
            onClick={handleSkip}
            className="text-sm text-[#64748b] hover:text-white transition-colors"
          >
            Skip tour
          </button>
          <div className="flex gap-2">
            {currentStep > 0 && (
              <button
                onClick={handlePrev}
                className="px-4 py-2 text-sm font-medium text-white bg-[#1e3a5f] hover:bg-[#2d4a6f] rounded-lg transition-colors"
              >
                Back
              </button>
            )}
            <button
              onClick={handleNext}
              className="px-4 py-2 text-sm font-medium text-[#0a1929] bg-[#d4a853] hover:bg-[#c49843] rounded-lg transition-colors"
            >
              {isLastStep ? 'Get Started' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
