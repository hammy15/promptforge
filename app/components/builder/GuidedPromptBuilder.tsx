'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import IntentInput from './IntentInput';
import LLMPicker from './LLMPicker';
import PromptOptions from './PromptOptions';
import PromptOutput from './PromptOutput';
import LivePreview from './LivePreview';
import Walkthrough from '../ui/Walkthrough';
import HelpButton from '../ui/HelpButton';
import { detectTask, TargetLLM, TaskPattern } from '../../data/task-patterns';
import { generatePrompt, PromptOptions as Options, GeneratedPrompt } from '../../data/prompt-templates';
import { BUILDER_WALKTHROUGH } from '../../data/walkthrough-steps';

interface BuilderState {
  step: 1 | 2 | 3 | 4;
  intent: string;
  detectedTask: TaskPattern | null;
  targetLLM: TargetLLM;
  options: Options;
  generatedPrompt: GeneratedPrompt | null;
}

const DEFAULT_OPTIONS: Options = {
  detail: 'detailed',
  tone: 'professional',
  includeSteps: true,
  includeErrors: false,
};

export default function GuidedPromptBuilder() {
  const router = useRouter();
  const [showPreview, setShowPreview] = useState(false);
  const [showWalkthrough, setShowWalkthrough] = useState(false);

  // Check if user has seen walkthrough
  useEffect(() => {
    const hasSeenTour = localStorage.getItem('promptforge-builder-tour');
    if (!hasSeenTour) {
      // Small delay to let the page render first
      const timer = setTimeout(() => setShowWalkthrough(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const [state, setState] = useState<BuilderState>({
    step: 1,
    intent: '',
    detectedTask: null,
    targetLLM: 'claude-code',
    options: DEFAULT_OPTIONS,
    generatedPrompt: null,
  });

  // Detect task when intent changes
  useEffect(() => {
    if (state.intent.length > 10) {
      const detected = detectTask(state.intent);
      if (detected) {
        setState(prev => ({
          ...prev,
          detectedTask: detected,
          targetLLM: detected.recommendedLLM,
          options: detected.defaultOptions,
        }));
      }
    }
  }, [state.intent]);

  // Generate prompt preview when options change (after step 2)
  useEffect(() => {
    if (state.step >= 3 && state.intent) {
      const generated = generatePrompt(state.intent, state.targetLLM, state.options);
      setState(prev => ({ ...prev, generatedPrompt: generated }));
    }
  }, [state.step, state.intent, state.targetLLM, state.options]);

  const updateIntent = (intent: string) => {
    setState(prev => ({ ...prev, intent }));
  };

  const updateLLM = (targetLLM: TargetLLM) => {
    setState(prev => ({ ...prev, targetLLM }));
  };

  const updateOptions = (options: Options) => {
    setState(prev => ({ ...prev, options }));
  };

  const nextStep = () => {
    setState(prev => ({
      ...prev,
      step: Math.min(prev.step + 1, 4) as 1 | 2 | 3 | 4,
    }));
  };

  const prevStep = () => {
    setState(prev => ({
      ...prev,
      step: Math.max(prev.step - 1, 1) as 1 | 2 | 3 | 4,
    }));
  };

  const startOver = () => {
    setState({
      step: 1,
      intent: '',
      detectedTask: null,
      targetLLM: 'claude-code',
      options: DEFAULT_OPTIONS,
      generatedPrompt: null,
    });
  };

  const testInPlayground = () => {
    if (state.generatedPrompt) {
      // Navigate to playground with prompt
      router.push(`/playground?prompt=${encodeURIComponent(state.generatedPrompt.prompt)}`);
    }
  };

  // Calculate current preview prompt
  const previewPrompt = state.generatedPrompt?.prompt ||
    (state.intent ? generatePrompt(state.intent, state.targetLLM, state.options).prompt : '');

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1929] to-[#0f2137]">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-[#1e3a5f] z-50">
        <div
          className="h-full bg-gradient-to-r from-[#d4a853] to-[#b8953f] transition-all duration-500"
          style={{ width: `${(state.step / 4) * 100}%` }}
        />
      </div>

      {/* Step Indicators */}
      <div className="pt-8 pb-4 px-4">
        <div className="max-w-xl mx-auto flex items-center justify-center gap-2">
          {[1, 2, 3, 4].map((num) => (
            <div key={num} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                  num < state.step
                    ? 'bg-[#d4a853] text-[#0a1929]'
                    : num === state.step
                    ? 'bg-[#d4a853] text-[#0a1929] ring-4 ring-[#d4a853]/30'
                    : 'bg-[#1e3a5f] text-[#64748b]'
                }`}
              >
                {num < state.step ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  num
                )}
              </div>
              {num < 4 && (
                <div
                  className={`w-12 h-0.5 mx-1 transition-colors ${
                    num < state.step ? 'bg-[#d4a853]' : 'bg-[#1e3a5f]'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="max-w-xl mx-auto flex items-center justify-between mt-2 px-2">
          <span className={`text-xs ${state.step >= 1 ? 'text-[#d4a853]' : 'text-[#64748b]'}`}>Intent</span>
          <span className={`text-xs ${state.step >= 2 ? 'text-[#d4a853]' : 'text-[#64748b]'}`}>AI</span>
          <span className={`text-xs ${state.step >= 3 ? 'text-[#d4a853]' : 'text-[#64748b]'}`}>Options</span>
          <span className={`text-xs ${state.step >= 4 ? 'text-[#d4a853]' : 'text-[#64748b]'}`}>Done</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-xl mx-auto px-4 pb-24">
        {state.step === 1 && (
          <IntentInput
            value={state.intent}
            onChange={updateIntent}
            onNext={nextStep}
            detectedTask={state.detectedTask}
            recommendedLLM={state.detectedTask?.recommendedLLM || null}
          />
        )}

        {state.step === 2 && (
          <LLMPicker
            selected={state.targetLLM}
            recommended={state.detectedTask?.recommendedLLM || null}
            onChange={updateLLM}
            onNext={nextStep}
            onBack={prevStep}
          />
        )}

        {state.step === 3 && (
          <PromptOptions
            options={state.options}
            onChange={updateOptions}
            onNext={nextStep}
            onBack={prevStep}
          />
        )}

        {state.step === 4 && state.generatedPrompt && (
          <PromptOutput
            prompt={state.generatedPrompt.prompt}
            targetLLM={state.targetLLM}
            onBack={prevStep}
            onStartOver={startOver}
            onTestInPlayground={testInPlayground}
          />
        )}
      </div>

      {/* Live Preview (visible on step 3+) */}
      {state.step >= 3 && (
        <LivePreview
          prompt={previewPrompt}
          targetLLM={state.targetLLM}
          sections={state.generatedPrompt?.sections}
          isVisible={showPreview}
          onToggle={() => setShowPreview(!showPreview)}
        />
      )}

      {/* Preview Toggle Button (visible on desktop, step 3+) */}
      {state.step >= 3 && !showPreview && (
        <button
          onClick={() => setShowPreview(true)}
          className="hidden md:flex fixed right-6 bottom-20 items-center gap-2 px-4 py-3 rounded-xl bg-[#1e3a5f] text-white hover:bg-[#2d4a6f] transition-colors shadow-lg"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          Preview
        </button>
      )}

      {/* Walkthrough */}
      <Walkthrough
        steps={BUILDER_WALKTHROUGH}
        isOpen={showWalkthrough}
        onClose={() => setShowWalkthrough(false)}
        onComplete={() => setShowWalkthrough(false)}
        storageKey="promptforge-builder-tour"
      />

      {/* Help Button */}
      {!showWalkthrough && (
        <HelpButton onClick={() => setShowWalkthrough(true)} label="Help" />
      )}
    </div>
  );
}
