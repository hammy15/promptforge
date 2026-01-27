'use client';

import { useState } from 'react';
import { Icons } from './Icons';

interface OnboardingProps {
  onComplete: () => void;
}

type Role = 'analyst' | 'associate' | 'vp' | 'csuite';
type UseCase = 'valuation' | 'research' | 'reporting' | 'strategy';

const roles: { id: Role; title: string; description: string; icon: string }[] = [
  { id: 'analyst', title: 'Analyst', description: 'Building models, research, and analysis', icon: 'calculator' },
  { id: 'associate', title: 'Associate', description: 'Deal execution and client management', icon: 'briefcase' },
  { id: 'vp', title: 'VP / Director', description: 'Team leadership and deal origination', icon: 'users' },
  { id: 'csuite', title: 'C-Suite / Partner', description: 'Strategic decisions and oversight', icon: 'building' },
];

const useCases: { id: UseCase; title: string; description: string; icon: string; templates: string[] }[] = [
  { id: 'valuation', title: 'Valuation & Modeling', description: 'DCF, Comps, LBO, and financial models', icon: 'chart', templates: ['DCF Valuation', 'Comps Analysis', 'Sensitivity Analysis'] },
  { id: 'research', title: 'Investment Research', description: 'Due diligence, market sizing, competitive intel', icon: 'search', templates: ['Due Diligence', 'TAM/SAM/SOM', 'Competitive Intel'] },
  { id: 'reporting', title: 'Reporting & Communication', description: 'Investor updates, board decks, executive summaries', icon: 'presentation', templates: ['Board Deck', 'Investor Update', 'Executive Summary'] },
  { id: 'strategy', title: 'Strategy & Planning', description: 'SWOT, OKRs, scenario planning, business plans', icon: 'target', templates: ['SWOT Analysis', 'OKR Framework', 'Scenario Planning'] },
];

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [selectedUseCase, setSelectedUseCase] = useState<UseCase | null>(null);

  const totalSteps = 5;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Save preferences
      if (selectedRole) localStorage.setItem('userRole', selectedRole);
      if (selectedUseCase) localStorage.setItem('userUseCase', selectedUseCase);
      localStorage.setItem('promptforge-onboarded', 'true');
      onComplete();
    }
  };

  const handleSkip = () => {
    localStorage.setItem('promptforge-onboarded', 'true');
    onComplete();
  };

  const canProceed = () => {
    if (step === 2) return selectedRole !== null;
    if (step === 3) return selectedUseCase !== null;
    return true;
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="text-center max-w-lg animate-fade-in">
            {/* Welcome icon */}
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#d4a853] to-[#b8953f] flex items-center justify-center">
              <Icons.sparkles className="w-10 h-10 text-[#0a1929]" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Welcome to PromptForge
            </h2>
            <p className="text-[#94a3b8] text-lg mb-2">
              AI-Powered Financial Analysis
            </p>
            <p className="text-[#64748b] mb-8">
              Create professional-grade financial analysis prompts in minutes.
              Built for investment banking, private equity, and corporate finance professionals.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <span className="badge badge-gold">18 Finance Templates</span>
              <span className="badge badge-teal">Excel-Ready Output</span>
              <span className="badge badge-navy">Enterprise Grade</span>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="w-full max-w-2xl animate-fade-in">
            <h2 className="text-2xl font-bold text-white text-center mb-2">
              What&apos;s your role?
            </h2>
            <p className="text-[#94a3b8] text-center mb-8">
              We&apos;ll customize your experience based on your level
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {roles.map((role) => {
                const IconComponent = Icons[role.icon as keyof typeof Icons];
                return (
                  <button
                    key={role.id}
                    onClick={() => setSelectedRole(role.id)}
                    className={`p-5 rounded-xl border text-left transition-all ${
                      selectedRole === role.id
                        ? 'border-[#d4a853] bg-[rgba(212,168,83,0.1)]'
                        : 'border-[#1e3a5f] bg-[#0f2137] hover:border-[#2d4a6f]'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-lg ${
                        selectedRole === role.id
                          ? 'bg-[rgba(212,168,83,0.2)]'
                          : 'bg-[#162a45]'
                      }`}>
                        {IconComponent && <IconComponent className={`w-6 h-6 ${
                          selectedRole === role.id ? 'text-[#d4a853]' : 'text-[#627d98]'
                        }`} />}
                      </div>
                      <div>
                        <h3 className={`font-semibold ${
                          selectedRole === role.id ? 'text-white' : 'text-[#94a3b8]'
                        }`}>
                          {role.title}
                        </h3>
                        <p className="text-sm text-[#64748b] mt-1">
                          {role.description}
                        </p>
                      </div>
                      {selectedRole === role.id && (
                        <div className="ml-auto">
                          <Icons.check className="w-5 h-5 text-[#d4a853]" />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="w-full max-w-2xl animate-fade-in">
            <h2 className="text-2xl font-bold text-white text-center mb-2">
              Primary use case?
            </h2>
            <p className="text-[#94a3b8] text-center mb-8">
              We&apos;ll recommend the best templates for your workflow
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {useCases.map((useCase) => {
                const IconComponent = Icons[useCase.icon as keyof typeof Icons];
                return (
                  <button
                    key={useCase.id}
                    onClick={() => setSelectedUseCase(useCase.id)}
                    className={`p-5 rounded-xl border text-left transition-all ${
                      selectedUseCase === useCase.id
                        ? 'border-[#d4a853] bg-[rgba(212,168,83,0.1)]'
                        : 'border-[#1e3a5f] bg-[#0f2137] hover:border-[#2d4a6f]'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-lg ${
                        selectedUseCase === useCase.id
                          ? 'bg-[rgba(212,168,83,0.2)]'
                          : 'bg-[#162a45]'
                      }`}>
                        {IconComponent && <IconComponent className={`w-6 h-6 ${
                          selectedUseCase === useCase.id ? 'text-[#d4a853]' : 'text-[#627d98]'
                        }`} />}
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-semibold ${
                          selectedUseCase === useCase.id ? 'text-white' : 'text-[#94a3b8]'
                        }`}>
                          {useCase.title}
                        </h3>
                        <p className="text-sm text-[#64748b] mt-1">
                          {useCase.description}
                        </p>
                        {selectedUseCase === useCase.id && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {useCase.templates.map((t) => (
                              <span key={t} className="text-xs px-2 py-0.5 rounded bg-[rgba(212,168,83,0.15)] text-[#d4a853]">
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      {selectedUseCase === useCase.id && (
                        <Icons.check className="w-5 h-5 text-[#d4a853] shrink-0" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="w-full max-w-3xl animate-fade-in">
            <h2 className="text-2xl font-bold text-white text-center mb-2">
              See it in action
            </h2>
            <p className="text-[#94a3b8] text-center mb-8">
              Here&apos;s how PromptForge helps you create professional financial analysis
            </p>

            {/* Demo visualization */}
            <div className="bg-[#0f2137] rounded-2xl border border-[#1e3a5f] p-6 mb-6">
              {/* Simulated template selection */}
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[#1e3a5f]">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#d4a853] to-[#b8953f] flex items-center justify-center text-xl">
                  📊
                </div>
                <div>
                  <h4 className="font-semibold text-white">DCF Valuation Model</h4>
                  <p className="text-sm text-[#64748b]">Financial Analysis • Advanced • 30 min</p>
                </div>
                <div className="ml-auto flex gap-2">
                  <span className="badge badge-excel text-xs">Excel</span>
                  <span className="badge badge-memo text-xs">Memo</span>
                </div>
              </div>

              {/* Simulated variables */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm text-[#94a3b8] mb-1">Company Name</label>
                  <div className="px-3 py-2 rounded-lg bg-[#0a1929] border border-[#1e3a5f] text-white text-sm">
                    Acme Corporation
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-[#94a3b8] mb-1">Industry</label>
                  <div className="px-3 py-2 rounded-lg bg-[#0a1929] border border-[#1e3a5f] text-white text-sm">
                    Technology
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-[#94a3b8] mb-1">Revenue ($M)</label>
                  <div className="px-3 py-2 rounded-lg bg-[#0a1929] border border-[#1e3a5f] text-white text-sm tabular-nums">
                    $250.0M
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-[#94a3b8] mb-1">WACC Range</label>
                  <div className="px-3 py-2 rounded-lg bg-[#0a1929] border border-[#1e3a5f] text-white text-sm tabular-nums">
                    8% - 12%
                  </div>
                </div>
              </div>

              {/* Generated prompt preview */}
              <div className="p-3 rounded-lg bg-[#0a1929] border border-[#1e3a5f]">
                <p className="text-xs text-[#64748b] mb-2">Generated Prompt Preview:</p>
                <p className="text-sm text-[#94a3b8] line-clamp-2">
                  Create a comprehensive DCF (Discounted Cash Flow) valuation analysis for Acme Corporation in the Technology sector...
                </p>
              </div>
            </div>

            {/* Feature highlights */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-xl bg-[#0f2137] border border-[#1e3a5f]">
                <div className="text-2xl font-bold text-[#d4a853] tabular-nums">18</div>
                <div className="text-sm text-[#64748b]">Finance Templates</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-[#0f2137] border border-[#1e3a5f]">
                <div className="text-2xl font-bold text-[#14b8a6] tabular-nums">5</div>
                <div className="text-sm text-[#64748b]">Categories</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-[#0f2137] border border-[#1e3a5f]">
                <div className="text-2xl font-bold text-[#627d98]">4</div>
                <div className="text-sm text-[#64748b]">Export Formats</div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="text-center max-w-lg animate-fade-in">
            {/* Success icon */}
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#059669] to-[#10b981] flex items-center justify-center">
              <Icons.check className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              You&apos;re all set!
            </h2>
            <p className="text-[#94a3b8] text-lg mb-8">
              Start creating professional financial analysis prompts with PromptForge.
            </p>

            {/* Quick start suggestions */}
            <div className="text-left bg-[#0f2137] rounded-xl border border-[#1e3a5f] p-4 mb-6">
              <h4 className="text-sm font-medium text-[#94a3b8] mb-3">Recommended for you:</h4>
              <div className="space-y-2">
                {selectedUseCase && useCases.find(u => u.id === selectedUseCase)?.templates.map((t) => (
                  <div key={t} className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#162a45] transition-colors cursor-pointer">
                    <div className="w-8 h-8 rounded-lg bg-[rgba(212,168,83,0.15)] flex items-center justify-center">
                      <Icons.template className="w-4 h-4 text-[#d4a853]" />
                    </div>
                    <span className="text-sm text-white">{t}</span>
                    <Icons.arrowRight className="w-4 h-4 text-[#64748b] ml-auto" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6"
      style={{ background: 'linear-gradient(135deg, #0a1929 0%, #102a43 50%, #1a3352 100%)' }}
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-20" />

      {/* Skip button */}
      {step < totalSteps && (
        <button
          onClick={handleSkip}
          className="absolute top-6 right-6 text-sm text-[#64748b] hover:text-[#94a3b8] transition-colors"
        >
          Skip
        </button>
      )}

      {/* Progress indicator */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 flex gap-2">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all ${
              i + 1 <= step
                ? 'w-8 bg-[#d4a853]'
                : 'w-4 bg-[#1e3a5f]'
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 w-full">
        {renderStep()}
      </div>

      {/* Navigation */}
      <div className="relative z-10 w-full max-w-2xl flex justify-between items-center pt-6">
        {step > 1 ? (
          <button
            onClick={() => setStep(step - 1)}
            className="flex items-center gap-2 text-[#94a3b8] hover:text-white transition-colors"
          >
            <Icons.arrowLeft className="w-4 h-4" />
            Back
          </button>
        ) : (
          <div />
        )}

        <button
          onClick={handleNext}
          disabled={!canProceed()}
          className={`btn-primary flex items-center gap-2 ${
            !canProceed() ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {step === totalSteps ? 'Get Started' : 'Continue'}
          <Icons.arrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
