import Link from 'next/link';

const features = [
  { name: 'Variable System', desc: '{{variable}} syntax with types & defaults', icon: '🔤' },
  { name: 'Prompt Chains', desc: 'Workflow orchestration', icon: '🔗' },
  { name: 'Smart Compression', desc: 'Token optimization', icon: '📦' },
  { name: 'Response Validators', desc: 'Output validation', icon: '✅' },
  { name: 'Model Recommendation', desc: 'Smart model selection', icon: '🎯' },
  { name: 'Cost Calculator', desc: 'Multi-model pricing', icon: '💰' },
  { name: 'PII Detection', desc: 'Privacy protection', icon: '🔒' },
  { name: 'Injection Protection', desc: 'Security scanning', icon: '🛡️' },
  { name: 'SDK Export', desc: 'TS, Python, JS, cURL', icon: '📤' },
  { name: 'Webhooks', desc: 'Event notifications', icon: '🪝' },
  { name: 'Analytics', desc: 'Usage & regression tracking', icon: '📊' },
  { name: 'Marketplace', desc: 'Prompt sharing', icon: '🏪' },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="px-6 py-24 text-center bg-gradient-to-b from-gray-900 to-gray-950">
        <h1 className="text-5xl font-bold mb-4">
          <span className="text-teal-400">Prompt</span>Forge
        </h1>
        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
          Build, test, and optimize AI prompts with 24 powerful features.
          Variables, chains, compression, security, analytics, and more.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/playground"
            className="px-6 py-3 bg-teal-500 hover:bg-teal-400 text-gray-900 font-semibold rounded-lg transition"
          >
            Try Playground
          </Link>
          <a
            href="https://github.com/hammy15/promptforge"
            className="px-6 py-3 border border-gray-700 hover:border-gray-500 rounded-lg transition"
          >
            View on GitHub
          </a>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.name}
              className="p-6 bg-gray-900 rounded-xl border border-gray-800 hover:border-teal-500/50 transition"
            >
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="text-lg font-semibold mb-1">{f.name}</h3>
              <p className="text-gray-400 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-gray-500 mt-8">+ 12 more features</p>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-gray-800 text-center text-gray-500">
        <p>Built with Next.js • Hammy Design System</p>
      </footer>
    </main>
  );
}
