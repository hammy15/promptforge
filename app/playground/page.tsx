'use client';

import { useState } from 'react';
import { compressPrompt } from '@/features/smart-compression';
import { detectPII, redactPII } from '@/features/security';
import { extractVariables, substituteVariables } from '@/features/variable-system';

export default function Playground() {
  const [prompt, setPrompt] = useState('Hello {{name}}, welcome to PromptForge!');
  const [variables, setVariables] = useState<Record<string, string>>({ name: 'World' });
  const [result, setResult] = useState('');
  const [activeTab, setActiveTab] = useState<'variables' | 'compress' | 'security'>('variables');

  const handleVariables = () => {
    const vars = extractVariables(prompt);
    const output = substituteVariables(prompt, variables);
    setResult(`Variables found: ${vars.map(v => v.name).join(', ')}\n\nResult: ${output}`);
  };

  const handleCompress = () => {
    const compressed = compressPrompt(prompt);
    setResult(`Original: ${compressed.originalTokens} tokens\nCompressed: ${compressed.compressedTokens} tokens\nSaved: ${compressed.savings}%\n\n${compressed.compressed}`);
  };

  const handleSecurity = () => {
    const pii = detectPII(prompt);
    const { redacted } = redactPII(prompt);
    setResult(`PII Found: ${pii.length > 0 ? pii.map(p => p.type).join(', ') : 'None'}\n\nRedacted: ${redacted}`);
  };

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">
        <span className="text-teal-400">Prompt</span>Forge Playground
      </h1>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {(['variables', 'compress', 'security'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg capitalize ${
              activeTab === tab
                ? 'bg-teal-500 text-gray-900'
                : 'bg-gray-800 hover:bg-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="mb-6">
        <label className="block text-sm text-gray-400 mb-2">Prompt</label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full h-32 p-4 bg-gray-900 border border-gray-700 rounded-lg focus:border-teal-500 focus:outline-none"
          placeholder="Enter your prompt..."
        />
      </div>

      {/* Variables input */}
      {activeTab === 'variables' && (
        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-2">Variables (JSON)</label>
          <input
            value={JSON.stringify(variables)}
            onChange={(e) => {
              try {
                setVariables(JSON.parse(e.target.value));
              } catch {}
            }}
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-teal-500 focus:outline-none"
          />
        </div>
      )}

      {/* Action button */}
      <button
        onClick={
          activeTab === 'variables'
            ? handleVariables
            : activeTab === 'compress'
            ? handleCompress
            : handleSecurity
        }
        className="px-6 py-3 bg-teal-500 hover:bg-teal-400 text-gray-900 font-semibold rounded-lg mb-6"
      >
        {activeTab === 'variables' && 'Substitute Variables'}
        {activeTab === 'compress' && 'Compress Prompt'}
        {activeTab === 'security' && 'Scan for PII'}
      </button>

      {/* Result */}
      {result && (
        <div className="p-4 bg-gray-900 border border-gray-700 rounded-lg">
          <label className="block text-sm text-gray-400 mb-2">Result</label>
          <pre className="whitespace-pre-wrap text-sm">{result}</pre>
        </div>
      )}
    </main>
  );
}
