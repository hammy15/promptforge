# PromptForge Features

All 24 requested features have been implemented. This document provides an overview of each feature module.

## Feature Summary

| # | Feature | File | Status |
|---|---------|------|--------|
| 1 | Variable System | `features/variable-system.ts` | Complete |
| 2 | Prompt Chains | `features/prompt-chains.ts` | Complete |
| 3 | Diff & Merge | `features/diff-merge.ts` | Complete |
| 4 | Smart Compression | `features/smart-compression.ts` | Complete |
| 5 | Response Validators | `features/response-validators.ts` | Complete |
| 6 | Prompt Auto-Generator | `features/prompt-generator.ts` | Complete |
| 7 | Failure Analysis | `features/analytics.ts` | Complete |
| 8 | Model Recommendation | `features/model-recommendation.ts` | Complete |
| 9 | Prompt Translation | `features/prompt-generator.ts` | Complete |
| 10 | Review Workflow | `features/diff-merge.ts` | Complete |
| 11 | Usage Quotas & Billing | `features/cost-calculator.ts` | Complete |
| 12 | Prompt Marketplace | `features/marketplace.ts` | Complete |
| 13 | SDK & API Client | `features/sdk.ts` | Complete |
| 14 | CLI Tool | `features/sdk.ts` | Complete |
| 15 | Webhooks & Integrations | `features/webhooks.ts` | Complete |
| 16 | Regression Detection | `features/analytics.ts` | Complete |
| 17 | Cost Optimization | `features/cost-calculator.ts` | Complete |
| 18 | User Behavior Analytics | `features/analytics.ts` | Complete |
| 19 | PII Detection | `features/security.ts` | Complete |
| 20 | Prompt Injection Protection | `features/security.ts` | Complete |
| 21 | Audit Logging | `features/security.ts` | Complete |
| 22 | Keyboard Shortcuts | `features/keyboard-shortcuts.ts` | Complete |
| 23 | Snippets Library | `features/snippets.ts` | Complete |
| 24 | Interactive Tutorials | `features/tutorials.ts` | Complete |

---

## Feature Details

### 1. Variable System (`features/variable-system.ts`)

Template variables for dynamic prompts with `{{variable}}` syntax.

**Features:**
- Variable detection with regex parsing
- Type validation (string, number, boolean, date, email, url, json)
- Default values: `{{name:World}}`
- Typed variables: `{{count|number}}`
- Batch substitution from CSV
- Export to Python/JavaScript/TypeScript

**Usage:**
```typescript
import { detectVariables, substituteVariables, exportToPython } from './features';

const template = 'Hello {{name}}! Your score is {{score|number}}.';
const variables = detectVariables(template);
const result = substituteVariables(template, { name: 'Alice', score: '95' });
const pythonCode = exportToPython(template);
```

---

### 2. Prompt Chains (`features/prompt-chains.ts`)

Workflow orchestration connecting multiple prompts.

**Features:**
- Visual node-based workflow builder
- Node types: input, prompt, condition, transform, merge, output
- Edge connections with data passing
- Chain validation (cycles, orphans, missing configs)
- Async execution engine
- Pre-built templates (summarization, multi-stage analysis)

**Usage:**
```typescript
import { createChain, addNode, connectNodes, executeChain } from './features';

let chain = createChain('My Workflow');
chain = addNode(chain, { type: 'input', name: 'Start', config: {} });
chain = addNode(chain, { type: 'prompt', name: 'Process', config: { promptId: 'p_123' } });
chain = connectNodes(chain, chain.nodes[0].id, chain.nodes[1].id);
```

---

### 3. Diff & Merge (`features/diff-merge.ts`)

Visual comparison and merging of prompt versions.

**Features:**
- Line-by-line diff computation (Myers algorithm)
- Word-level inline diff
- Three-way merge for branches
- Conflict detection and resolution
- Diff statistics and similarity scoring
- Unified diff format output

**Usage:**
```typescript
import { computeDiff, threeWayMerge, formatDiff } from './features';

const diff = computeDiff(oldVersion, newVersion);
const mergeResult = threeWayMerge(base, ours, theirs);
console.log(formatDiff(diff));
```

---

### 4. Smart Compression (`features/smart-compression.ts`)

Intelligent prompt compression to reduce token usage.

**Features:**
- Remove filler words and redundant phrases
- Simplify verbose constructions
- Preserve semantic meaning
- Configurable aggressiveness levels
- Protected content (code blocks, URLs, variables)
- Compression suggestions without auto-apply
- Cost savings estimation

**Usage:**
```typescript
import { compressPrompt, getCompressionSuggestions } from './features';

const result = compressPrompt(longPrompt, { aggressiveness: 'medium' });
console.log(`Saved ${result.savings}% tokens`);
```

---

### 5. Response Validators (`features/response-validators.ts`)

Validate AI responses against expected formats.

**Features:**
- JSON schema validation
- Regex pattern matching
- Length constraints (characters, words, tokens)
- Content checks (contains, starts_with, ends_with)
- Sentiment analysis
- Language detection
- Custom validator registration
- Pre-built validation presets

**Usage:**
```typescript
import { validateResponse, createRule, VALIDATION_PRESETS } from './features';

const result = validateResponse(aiResponse, VALIDATION_PRESETS.json);
if (!result.valid) {
  console.log('Errors:', result.errors);
}
```

---

### 6. Prompt Auto-Generator (`features/prompt-generator.ts`)

AI-powered prompt creation from descriptions.

**Features:**
- Generate prompts from natural language descriptions
- Framework selection (COSTAR, RISEN, CROWD, chain-of-thought)
- Tone and output format configuration
- Auto-detect task type
- Improvement suggestions for existing prompts
- Quick prompt generation

**Usage:**
```typescript
import { generatePrompt, analyzeAndImprove } from './features';

const generated = generatePrompt({
  description: 'Summarize news articles',
  taskType: 'summarization',
  tone: 'professional',
});

const suggestions = analyzeAndImprove(systemPrompt, userPrompt);
```

---

### 7. Model Recommendation (`features/model-recommendation.ts`)

Smart model selection based on prompt characteristics.

**Features:**
- Prompt analysis (complexity, task type, requirements)
- Model capability scoring
- Cost-performance trade-off recommendations
- Budget-aware suggestions
- Multi-model comparison
- Latency estimation

**Usage:**
```typescript
import { recommendModel, getModelRecommendations } from './features';

const recommendation = recommendModel(myPrompt, { budgetConstraint: 0.01 });
console.log(`Use ${recommendation.model.name} (score: ${recommendation.score})`);
```

---

### 8. Cost Calculator (`features/cost-calculator.ts`)

Token estimation and cost projection.

**Features:**
- Accurate token estimation
- Per-model pricing database
- Single and batch cost calculation
- Monthly/yearly projections
- Budget tracking with alerts
- Cost optimization suggestions
- Model cost comparison

**Usage:**
```typescript
import { calculateCost, checkBudgetStatus, getOptimizationSuggestions } from './features';

const cost = calculateCost(prompt, 500, 'claude-sonnet-4-20250514');
const budget = checkBudgetStatus({ monthlyLimit: 100 }, 45, 1.5);
```

---

### 9. Security (`features/security.ts`)

PII detection, injection protection, and audit logging.

**Features:**
- PII detection (email, phone, SSN, credit card, API keys)
- Automatic PII redaction
- Prompt injection detection (instruction override, role hijack)
- Risk level assessment
- Compliance checking (HIPAA, GDPR, SOC2)
- Audit log creation and formatting

**Usage:**
```typescript
import { detectPII, redactPII, detectInjection, checkCompliance } from './features';

const pii = detectPII(userInput);
const { redacted } = redactPII(userInput);
const injectionRisks = detectInjection(userInput);
```

---

### 10. Snippets Library (`features/snippets.ts`)

Reusable prompt fragments with `{{snippet:name}}` syntax.

**Features:**
- Pre-built snippet library (safety, formatting, personas)
- Custom snippet creation
- Snippet categories and tagging
- Recursive expansion
- Missing snippet handling
- Search and analytics

**Usage:**
```typescript
import { expandSnippets, DEFAULT_SNIPPETS } from './features';

const text = '{{snippet:safety-guidelines}}\n\nNow help the user.';
const { expanded } = expandSnippets(text, snippets);
```

---

### 11. Webhooks (`features/webhooks.ts`)

Event notifications and integrations.

**Features:**
- Webhook creation and management
- Event filtering (prompt.executed, experiment.completed, etc.)
- Signature generation and verification
- Retry policy with exponential backoff
- Integration templates (Slack, Discord, Zapier, GitHub)
- Delivery tracking

**Usage:**
```typescript
import { createWebhook, deliverWebhook, INTEGRATION_TEMPLATES } from './features';

const webhook = createWebhook({
  name: 'Slack Notifications',
  url: 'https://hooks.slack.com/...',
  events: ['prompt.executed', 'error.occurred'],
});
```

---

### 12. SDK & API Client (`features/sdk.ts`)

Generate client code for multiple languages.

**Features:**
- TypeScript SDK with streaming support
- Python SDK with context manager
- Code export (TypeScript, Python, JavaScript, cURL)
- OpenAPI specification generation
- Inline mode (direct API calls) or SDK mode

**Usage:**
```typescript
import { exportPrompt, generateOpenAPISpec, TYPESCRIPT_SDK } from './features';

const code = exportPrompt(prompt, { language: 'python', inline: true });
const openapi = generateOpenAPISpec();
```

---

### 13. Analytics (`features/analytics.ts`)

Usage tracking, regression detection, and dashboards.

**Features:**
- Execution metric recording
- Time-series aggregation
- Prompt-level analytics
- Regression detection with configurable thresholds
- User behavior analysis
- Dashboard data generation
- CSV export

**Usage:**
```typescript
import { recordMetric, detectRegressions, generateDashboardData } from './features';

const metric = recordMetric({ promptId, model, latencyMs, cost, success: true });
const alerts = detectRegressions(currentMetrics, baselineMetrics);
const dashboard = generateDashboardData(metrics, promptNames, alerts);
```

---

### 14. Marketplace (`features/marketplace.ts`)

Prompt sharing and discovery platform.

**Features:**
- Prompt listing and search
- Category and tag filtering
- Pricing and purchasing
- Reviews and ratings
- Author profiles and analytics
- Collections and featured prompts
- Similar prompt recommendations

**Usage:**
```typescript
import { searchMarketplace, createListing, getFeaturedPrompts } from './features';

const results = searchMarketplace(prompts, { category: 'coding', minRating: 4 });
const featured = getFeaturedPrompts(prompts, 6);
```

---

### 15. Tutorials (`features/tutorials.ts`)

Interactive onboarding and learning system.

**Features:**
- Step-by-step tutorials
- Multiple tutorial categories
- Progress tracking
- Achievement system with points
- Contextual tooltips
- Tutorial validation

**Usage:**
```typescript
import { startTutorial, advanceStep, TUTORIALS, ACHIEVEMENTS } from './features';

let progress = startTutorial('getting-started-basics', userId);
progress = advanceStep(progress, TUTORIALS[0]);
```

---

### 16. Keyboard Shortcuts (`features/keyboard-shortcuts.ts`)

Global shortcuts and command palette.

**Features:**
- Customizable keyboard shortcuts
- Command palette (Cmd+K)
- Vim mode support
- Shortcut formatting for display
- Conditional shortcuts

**Usage:**
```typescript
import { useKeyboardShortcuts, useCommandPalette, useVimMode } from './features';

const shortcuts = [
  { id: 'save', keys: ['meta', 's'], action: handleSave },
];
useKeyboardShortcuts(shortcuts);

const palette = useCommandPalette({ commands });
```

---

## Testing

Run the comprehensive test suite:

```bash
pnpm test
```

All features have corresponding tests in `__tests__/features.test.ts`.

---

## Import

All features can be imported from a single entry point:

```typescript
import {
  // Variable System
  detectVariables,
  substituteVariables,

  // Cost Calculator
  calculateCost,
  MODEL_PRICING,

  // Security
  detectPII,
  detectInjection,

  // ... all other exports
} from './features';
```

---

## Design System

All UI components follow the Hammy Design System:
- Primary color: Turquoise (`#14b8a6`)
- Neumorphic shadows
- Dark mode first
- Mobile responsive

---

## File Structure

```
code-examples/
├── features/
│   ├── index.ts              # Central exports
│   ├── variable-system.ts    # Variable detection & substitution
│   ├── prompt-chains.ts      # Workflow orchestration
│   ├── keyboard-shortcuts.ts # Global shortcuts & Vim
│   ├── cost-calculator.ts    # Token & cost estimation
│   ├── security.ts           # PII & injection protection
│   ├── snippets.ts           # Reusable fragments
│   ├── model-recommendation.ts # Smart model selection
│   ├── prompt-generator.ts   # Auto-generation
│   ├── response-validators.ts # Output validation
│   ├── diff-merge.ts         # Version comparison
│   ├── webhooks.ts           # Event notifications
│   ├── sdk.ts                # Client generation
│   ├── analytics.ts          # Usage tracking
│   ├── marketplace.ts        # Prompt sharing
│   ├── tutorials.ts          # Interactive guides
│   └── smart-compression.ts  # Token optimization
├── __tests__/
│   └── features.test.ts      # Comprehensive tests
└── FEATURES.md               # This document
```
