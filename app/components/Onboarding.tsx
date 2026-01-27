'use client';

import { useState, useEffect } from 'react';

interface OnboardingStep {
  title: string;
  description: string;
  icon: React.ReactNode;
  tip?: string;
}

const steps: OnboardingStep[] = [
  {
    title: 'Welcome to PromptForge!',
    description: 'Your all-in-one toolkit for crafting, testing, and optimizing AI prompts. Let us show you around.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
  },
  {
    title: 'Variables Made Easy',
    description: 'Use {{variable}} syntax to create dynamic prompts. Add defaults with {{name:World}} or types with {{count|number}}.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
    tip: 'Try: Hello {{name:Friend}}!',
  },
  {
    title: 'Smart Compression',
    description: 'Reduce token usage automatically. Our AI removes filler words and redundant phrases while preserving meaning.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
      </svg>
    ),
    tip: 'Save up to 30% on tokens!',
  },
  {
    title: 'Security First',
    description: 'Automatically detect and redact PII (emails, phones, SSNs). Scan for prompt injection attacks before they happen.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    tip: 'HIPAA, GDPR, SOC2 ready',
  },
  {
    title: 'You\'re Ready!',
    description: 'Explore the playground to test all 24 features. Click the help icon anytime to see this guide again.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
      </svg>
    ),
  },
];

interface OnboardingProps {
  onComplete: () => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = () => {
    setIsVisible(false);
    setTimeout(() => {
      localStorage.setItem('promptforge-onboarded', 'true');
      onComplete();
    }, 300);
  };

  const step = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div
      className={`fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="relative w-full max-w-md mx-4 animate-scale-in">
        {/* Card */}
        <div className="card neu-shadow p-8">
          {/* Progress bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gray-800 rounded-t-2xl overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-teal-500 to-teal-400 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Step indicator */}
          <div className="flex justify-center mb-6 mt-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full mx-1 transition-all duration-300 ${
                  index === currentStep
                    ? 'bg-teal-400 w-6'
                    : index < currentStep
                    ? 'bg-teal-600'
                    : 'bg-gray-700'
                }`}
              />
            ))}
          </div>

          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500/20 to-teal-600/20 border border-teal-500/30 flex items-center justify-center text-teal-400">
              {step.icon}
            </div>
          </div>

          {/* Content */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-3 text-white">{step.title}</h2>
            <p className="text-gray-400 leading-relaxed">{step.description}</p>

            {step.tip && (
              <div className="mt-4 px-4 py-2 bg-teal-500/10 border border-teal-500/20 rounded-lg inline-block">
                <code className="text-teal-300 text-sm">{step.tip}</code>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            {currentStep < steps.length - 1 && (
              <button
                onClick={handleSkip}
                className="flex-1 py-3 text-gray-500 hover:text-gray-300 transition-colors"
              >
                Skip tour
              </button>
            )}
            <button
              onClick={handleNext}
              className="flex-1 btn-primary"
            >
              {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
            </button>
          </div>
        </div>

        {/* Keyboard hint */}
        <p className="text-center text-gray-600 text-sm mt-4">
          Press <kbd className="px-2 py-1 bg-gray-800 rounded text-gray-400">Enter</kbd> to continue
        </p>
      </div>
    </div>
  );
}
