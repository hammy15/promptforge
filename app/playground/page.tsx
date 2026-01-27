'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { compressPrompt } from '@/features/smart-compression';
import { detectPII, redactPII, detectInjection, getInjectionRiskLevel } from '@/features/security';
import { extractVariables, substituteVariables } from '@/features/variable-system';
import { calculateCost, MODEL_PRICING } from '@/features/cost-calculator';

type Tab = 'variables' | 'compress' | 'security' | 'cost';

interface TabInfo {
  id: Tab;
  name: string;
  icon: React.ReactNode;
  description: string;
}

const tabs: TabInfo[] = [
  {
    id: 'variables',
    name: 'Variables',
    icon: <span className="text-lg">{'{ }'}</span>,
    description: 'Extract and substitute template variables',
  },
  {
    id: 'compress',
    name: 'Compress',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
      </svg>
    ),
    description: 'Reduce tokens while preserving meaning',
  },
  {
    id: 'security',
    name: 'Security',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    description: 'Detect PII and injection attacks',
  },
  {
    id: 'cost',
    name: 'Cost',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    description: 'Estimate tokens and costs',
  },
];

const examplePrompts: Record<Tab, string> = {
  variables: 'Hello {{name:Friend}}! Welcome to {{city|string}}.\n\nYour order #{{orderId|number}} is ready.',
  compress: 'I would basically like you to please make sure to write a really good and comprehensive response. In order to do this effectively, you should essentially focus on the most important and relevant points. Due to the fact that this is very important, it is absolutely essential that you do a thorough job.',
  security: 'Please help me with my account. My email is john.doe@example.com and my phone is 555-123-4567. My SSN is 123-45-6789.',
  cost: 'You are an expert software engineer. Help me build a REST API with Node.js and Express that handles user authentication using JWT tokens. Include proper error handling and validation.',
};

export default function Playground() {
  const [prompt, setPrompt] = useState(examplePrompts.variables);
  const [variables, setVariables] = useState<Record<string, string>>({ name: 'World', city: 'San Francisco', orderId: '12345' });
  const [result, setResult] = useState<React.ReactNode>(null);
  const [activeTab, setActiveTab] = useState<Tab>('variables');
  const [showTip, setShowTip] = useState(true);
  const [selectedModel, setSelectedModel] = useState('claude-sonnet-4-20250514');

  useEffect(() => {
    // Load example for current tab
    setPrompt(examplePrompts[activeTab]);
    setResult(null);
  }, [activeTab]);

  const handleProcess = () => {
    switch (activeTab) {
      case 'variables':
        handleVariables();
        break;
      case 'compress':
        handleCompress();
        break;
      case 'security':
        handleSecurity();
        break;
      case 'cost':
        handleCost();
        break;
    }
    setShowTip(false);
  };

  const handleVariables = () => {
    const vars = extractVariables(prompt);
    const output = substituteVariables(prompt, variables);

    setResult(
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-gray-400 mb-2">Variables Found ({vars.length})</h4>
          <div className="flex flex-wrap gap-2">
            {vars.map((v) => (
              <span
                key={v.name}
                className="px-3 py-1 bg-teal-500/10 border border-teal-500/30 rounded-lg text-teal-300 text-sm"
              >
                {v.name}
                {v.defaultValue && <span className="text-gray-500">:{v.defaultValue}</span>}
                {v.type && v.type !== 'string' && <span className="text-gray-500">|{v.type}</span>}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-400 mb-2">Result</h4>
          <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-800 whitespace-pre-wrap">
            {output}
          </div>
        </div>
      </div>
    );
  };

  const handleCompress = () => {
    const compressed = compressPrompt(prompt, { aggressiveness: 'medium' });

    setResult(
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-white">{compressed.originalTokens}</div>
            <div className="text-sm text-gray-500">Original Tokens</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-teal-400">{compressed.compressedTokens}</div>
            <div className="text-sm text-gray-500">Compressed</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-green-400">{compressed.savings}%</div>
            <div className="text-sm text-gray-500">Saved</div>
          </div>
        </div>
        {compressed.changes.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-400 mb-2">Changes Made ({compressed.changes.length})</h4>
            <div className="space-y-2 max-h-32 overflow-auto">
              {compressed.changes.slice(0, 5).map((c, i) => (
                <div key={i} className="text-sm flex items-center gap-2">
                  <span className="text-red-400 line-through">{c.original || '(removed)'}</span>
                  <span className="text-gray-500">→</span>
                  <span className="text-green-400">{c.compressed || '(empty)'}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        <div>
          <h4 className="text-sm font-medium text-gray-400 mb-2">Compressed Result</h4>
          <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-800 whitespace-pre-wrap">
            {compressed.compressed}
          </div>
        </div>
      </div>
    );
  };

  const handleSecurity = () => {
    const pii = detectPII(prompt);
    const { redacted } = redactPII(prompt);
    const injections = detectInjection(prompt);
    const riskLevel = getInjectionRiskLevel(prompt);

    const riskColors = {
      none: 'text-green-400',
      low: 'text-yellow-400',
      medium: 'text-orange-400',
      high: 'text-red-400',
    };

    setResult(
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="card p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🔒</span>
              <span className="font-medium">PII Detected</span>
            </div>
            {pii.length > 0 ? (
              <div className="space-y-1">
                {pii.map((p, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <span className="text-red-400 capitalize">{p.type}</span>
                    <span className="text-gray-500">{p.match}</span>
                  </div>
                ))}
              </div>
            ) : (
              <span className="text-green-400 text-sm">No PII found</span>
            )}
          </div>
          <div className="card p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🛡️</span>
              <span className="font-medium">Injection Risk</span>
            </div>
            <div className={`text-lg font-bold capitalize ${riskColors[riskLevel]}`}>
              {riskLevel}
            </div>
            {injections.length > 0 && (
              <div className="text-sm text-gray-500 mt-1">
                {injections.map((i) => i.type).join(', ')}
              </div>
            )}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-400 mb-2">Redacted Output</h4>
          <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-800 whitespace-pre-wrap">
            {redacted}
          </div>
        </div>
      </div>
    );
  };

  const handleCost = () => {
    const cost = calculateCost(prompt, 500, selectedModel);
    const model = MODEL_PRICING.find((m) => m.id === selectedModel);

    setResult(
      <div className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-white">{cost.inputTokens}</div>
            <div className="text-sm text-gray-500">Input Tokens</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-white">500</div>
            <div className="text-sm text-gray-500">Output Tokens (est.)</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-teal-400">${cost.totalCost.toFixed(4)}</div>
            <div className="text-sm text-gray-500">Per Request</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-white">${(cost.totalCost * 1000).toFixed(2)}</div>
            <div className="text-sm text-gray-500">Per 1K Requests</div>
          </div>
        </div>
        <div className="card p-4">
          <h4 className="font-medium mb-2">{model?.name || selectedModel}</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Input:</span>{' '}
              <span className="text-white">${model?.inputPricePerMillion}/1M tokens</span>
            </div>
            <div>
              <span className="text-gray-500">Output:</span>{' '}
              <span className="text-white">${model?.outputPricePerMillion}/1M tokens</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const currentTab = tabs.find((t) => t.id === activeTab)!;

  return (
    <main className="min-h-screen">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-mesh pointer-events-none opacity-50" />

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-gray-800/50">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
          </div>
          <span className="text-xl font-bold">
            <span className="text-teal-400">Prompt</span>Forge
          </span>
        </Link>
        <span className="text-sm text-gray-500">Playground</span>
      </nav>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-8">
        {/* Tab Bar */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-teal-500 text-gray-900'
                  : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              {tab.icon}
              {tab.name}
            </button>
          ))}
        </div>

        {/* Tab Description */}
        <div className="mb-6 flex items-center gap-3">
          <div className="w-1 h-8 bg-teal-500 rounded-full" />
          <div>
            <h2 className="text-xl font-semibold">{currentTab.name}</h2>
            <p className="text-gray-500 text-sm">{currentTab.description}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Prompt
                {showTip && activeTab === 'variables' && (
                  <span className="ml-2 text-teal-400 text-xs animate-pulse">
                    ← Try the example or write your own!
                  </span>
                )}
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="input h-48 resize-none font-mono text-sm"
                placeholder="Enter your prompt..."
              />
            </div>

            {/* Variables Input */}
            {activeTab === 'variables' && (
              <div className="card p-4">
                <label className="block text-sm font-medium text-gray-400 mb-3">
                  Variable Values
                </label>
                <div className="space-y-2">
                  {Object.entries(variables).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-2">
                      <span className="text-teal-400 font-mono text-sm w-24">{key}</span>
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => setVariables({ ...variables, [key]: e.target.value })}
                        className="input py-2 text-sm"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Model Selector */}
            {activeTab === 'cost' && (
              <div className="card p-4">
                <label className="block text-sm font-medium text-gray-400 mb-3">
                  Select Model
                </label>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="input py-2"
                >
                  {MODEL_PRICING.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.provider})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Process Button */}
            <button onClick={handleProcess} className="btn-primary w-full py-4 text-lg">
              {activeTab === 'variables' && 'Substitute Variables'}
              {activeTab === 'compress' && 'Compress Prompt'}
              {activeTab === 'security' && 'Scan for Issues'}
              {activeTab === 'cost' && 'Calculate Cost'}
            </button>
          </div>

          {/* Result Section */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Result</label>
            <div className="card p-6 min-h-[300px]">
              {result ? (
                <div className="animate-fade-in">{result}</div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-600">
                  <svg className="w-12 h-12 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                  <p className="text-center">
                    Click the button to process
                    <br />
                    <span className="text-sm">Results will appear here</span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="mt-8 card p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
            </svg>
            Quick Tips
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-3">
              <span className="text-teal-400">•</span>
              <div>
                <span className="text-white">Variables:</span>
                <span className="text-gray-400"> Use </span>
                <code className="text-teal-300 bg-teal-500/10 px-1 rounded">{'{{name}}'}</code>
                <span className="text-gray-400"> for dynamic content</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-teal-400">•</span>
              <div>
                <span className="text-white">Defaults:</span>
                <span className="text-gray-400"> Add </span>
                <code className="text-teal-300 bg-teal-500/10 px-1 rounded">{'{{name:World}}'}</code>
                <span className="text-gray-400"> for fallback values</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-teal-400">•</span>
              <div>
                <span className="text-white">Types:</span>
                <span className="text-gray-400"> Use </span>
                <code className="text-teal-300 bg-teal-500/10 px-1 rounded">{'{{count|number}}'}</code>
                <span className="text-gray-400"> for type hints</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-teal-400">•</span>
              <div>
                <span className="text-white">Security:</span>
                <span className="text-gray-400"> Always scan user input for PII and injection attacks</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
