// PromptForge Type Definitions

// ============================================
// Core Prompt Types
// ============================================

export type PromptFramework = 'COSTAR' | 'CROWD' | 'RISEN' | 'custom';
export type OutputFormat = 'plain_text' | 'markdown' | 'json' | 'xml' | 'code' | 'structured_list' | 'custom';
export type StyleTone = 'professional' | 'casual' | 'technical' | 'creative' | 'academic' | 'conversational' | 'formal';

export interface PromptExample {
  id: string;
  input: string;
  output: string;
}

export interface PromptParameters {
  temperature: number;
  maxTokens: number;
  topP: number;
  stopSequences: string[];
}

export interface PromptContent {
  context: string | null;
  objective: string;
  constraints: string[];
  examples: PromptExample[];
  outputFormat: OutputFormat;
  customFormatSchema?: string;
  style: StyleTone[];
  persona: string | null;
  rawPrompt: string | null; // For advanced users who want raw prompt text
  parameters: PromptParameters;
}

export interface Prompt {
  id: string;
  workspaceId: string;
  name: string;
  description: string | null;
  content: PromptContent;
  framework: PromptFramework | null;
  tags: string[];
  isTemplate: boolean;
  isPublic: boolean;
  parentTemplateId: string | null;
  currentVersion: number;
  performanceScore: number | null;
  usageCount: number;
  authorId: string;
  createdAt: string;
  updatedAt: string;
}

export interface PromptVersion {
  id: string;
  promptId: string;
  versionNumber: number;
  content: PromptContent;
  changeSummary: string | null;
  authorId: string;
  performanceSnapshot: PerformanceMetrics | null;
  createdAt: string;
}

// ============================================
// Execution Types
// ============================================

export type AIProvider = 'anthropic' | 'openai' | 'google' | 'custom';

export interface AIModel {
  id: string;
  provider: AIProvider;
  name: string;
  displayName: string;
  contextWindow: number;
  maxOutputTokens: number;
  inputPricePerMillion: number;
  outputPricePerMillion: number;
  supportsStreaming: boolean;
  supportsTools: boolean;
}

export interface TokenUsage {
  input: number;
  output: number;
  total: number;
}

export interface ExecutionResult {
  id: string;
  output: string;
  model: string;
  latencyMs: number;
  tokenUsage: TokenUsage;
  costUsd: number;
  finishReason: 'stop' | 'length' | 'tool_use' | 'error';
  error?: string;
}

export interface ExecutePromptInput {
  promptId?: string;
  promptContent?: PromptContent;
  input: Record<string, unknown>;
  model: string;
  stream?: boolean;
}

// ============================================
// Template Types
// ============================================

export interface TemplateCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  sortOrder: number;
}

export interface Template extends Prompt {
  isTemplate: true;
  category: string;
  modelCompatibility: string[];
  forkCount: number;
  averageRating: number;
  ratingCount: number;
}

// ============================================
// Experiment / A/B Testing Types
// ============================================

export type ExperimentStatus = 'draft' | 'running' | 'completed' | 'archived';

export interface ExperimentVariant {
  id: string;
  name: string;
  promptContent: PromptContent;
  weight: number; // 0-1, sum of all variants should equal 1
}

export interface EvaluationCriterion {
  id: string;
  name: string;
  type: 'manual' | 'automated' | 'llm_judge';
  weight: number;
  config: ManualCriterion | AutomatedCriterion | LLMJudgeCriterion;
}

export interface ManualCriterion {
  type: 'rating';
  scale: { min: number; max: number };
  labels?: Record<number, string>;
}

export interface AutomatedCriterion {
  type: 'response_length' | 'latency' | 'token_count' | 'format_compliance' | 'keyword_presence';
  config: Record<string, unknown>;
}

export interface LLMJudgeCriterion {
  type: 'llm_judge';
  judgeModel: string;
  rubric: string;
  outputFormat: 'score' | 'comparison' | 'detailed';
}

export interface TestInput {
  id: string;
  name: string;
  input: Record<string, unknown>;
  expectedOutput?: string;
}

export interface ExperimentRun {
  id: string;
  experimentId: string;
  variantId: string;
  input: Record<string, unknown>;
  output: string | null;
  model: string;
  latencyMs: number | null;
  tokenUsage: TokenUsage | null;
  manualRating: Record<string, number> | null;
  automatedScores: Record<string, number> | null;
  createdAt: string;
}

export interface VariantResults {
  variantId: string;
  variantName: string;
  runCount: number;
  metrics: {
    avgLatencyMs: number;
    avgTokens: number;
    avgManualScore: number | null;
    avgAutomatedScore: number | null;
    compositeScore: number;
  };
  confidenceInterval: { lower: number; upper: number };
  isWinner: boolean;
}

export interface ExperimentResults {
  totalRuns: number;
  variantResults: VariantResults[];
  statisticalSignificance: boolean;
  confidenceLevel: number;
  recommendedVariant: string | null;
}

export interface Experiment {
  id: string;
  workspaceId: string;
  name: string;
  description: string | null;
  status: ExperimentStatus;
  variants: ExperimentVariant[];
  testInputs: TestInput[];
  evaluationCriteria: EvaluationCriterion[];
  results: ExperimentResults | null;
  authorId: string;
  startedAt: string | null;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

// ============================================
// Analytics Types
// ============================================

export interface PerformanceMetrics {
  totalExecutions: number;
  avgLatencyMs: number;
  avgRating: number | null;
  totalTokens: number;
  totalCostUsd: number;
  successRate: number;
}

export interface TimeSeriesDataPoint {
  timestamp: string;
  value: number;
}

export interface PromptAnalytics {
  promptId: string;
  period: { start: string; end: string };
  metrics: PerformanceMetrics;
  timeSeries: {
    executions: TimeSeriesDataPoint[];
    latency: TimeSeriesDataPoint[];
    rating: TimeSeriesDataPoint[];
    cost: TimeSeriesDataPoint[];
  };
  modelBreakdown: Array<{
    model: string;
    executions: number;
    avgLatency: number;
    avgRating: number | null;
  }>;
}

export interface WorkspaceAnalytics {
  workspaceId: string;
  period: { start: string; end: string };
  overview: {
    totalPrompts: number;
    totalExecutions: number;
    totalCostUsd: number;
    activeUsers: number;
  };
  topPrompts: Array<{
    promptId: string;
    promptName: string;
    executions: number;
    avgRating: number | null;
  }>;
  costByModel: Array<{
    model: string;
    cost: number;
    percentage: number;
  }>;
}

// ============================================
// User & Workspace Types
// ============================================

export type UserTier = 'free' | 'pro' | 'team' | 'enterprise';
export type WorkspaceRole = 'owner' | 'editor' | 'tester' | 'viewer';

export interface User {
  id: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
  tier: UserTier;
  preferences: UserPreferences;
  createdAt: string;
}

export interface UserPreferences {
  defaultModel: string;
  theme: 'light' | 'dark' | 'system';
  editorFontSize: number;
  showSuggestions: boolean;
}

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  ownerId: string;
  settings: WorkspaceSettings;
  createdAt: string;
}

export interface WorkspaceSettings {
  defaultModel: string;
  allowedModels: string[];
  defaultStylePresetId: string | null;
  requireApprovalForPublish: boolean;
}

export interface WorkspaceMember {
  workspaceId: string;
  userId: string;
  role: WorkspaceRole;
  user: Pick<User, 'id' | 'email' | 'name' | 'avatarUrl'>;
  joinedAt: string;
}

// ============================================
// Style Preset Types
// ============================================

export interface StylePreset {
  id: string;
  workspaceId: string;
  name: string;
  config: StylePresetConfig;
  isDefault: boolean;
  authorId: string;
  createdAt: string;
}

export interface StylePresetConfig {
  tone: StyleTone[];
  formattingRules: string[];
  personaTemplate: string | null;
  constraints: string[];
  exampleOutputs: string[];
}

// ============================================
// API Request/Response Types
// ============================================

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
}

export interface ApiResponse<T> {
  data: T;
  error?: never;
}

export interface ApiError {
  data?: never;
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
}

export type ApiResult<T> = ApiResponse<T> | ApiError;

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationMeta;
}

// ============================================
// Form Input Types (for API requests)
// ============================================

export interface CreatePromptInput {
  workspaceId: string;
  name: string;
  description?: string;
  content: PromptContent;
  framework?: PromptFramework;
  tags?: string[];
  isTemplate?: boolean;
  isPublic?: boolean;
}

export interface UpdatePromptInput {
  name?: string;
  description?: string;
  content?: Partial<PromptContent>;
  tags?: string[];
  isPublic?: boolean;
}

export interface CreateExperimentInput {
  workspaceId: string;
  name: string;
  description?: string;
  variants: Omit<ExperimentVariant, 'id'>[];
  testInputs?: Omit<TestInput, 'id'>[];
  evaluationCriteria?: Omit<EvaluationCriterion, 'id'>[];
}

// ============================================
// Best Practice Assistant Types
// ============================================

export type SuggestionSeverity = 'info' | 'warning' | 'error';
export type SuggestionCategory = 'clarity' | 'structure' | 'safety' | 'performance' | 'best_practice';

export interface PromptSuggestion {
  id: string;
  category: SuggestionCategory;
  severity: SuggestionSeverity;
  field: keyof PromptContent | 'general';
  message: string;
  suggestion: string;
  autoFixAvailable: boolean;
  autoFix?: Partial<PromptContent>;
}

export interface PromptAnalysis {
  score: number; // 0-100
  suggestions: PromptSuggestion[];
  strengths: string[];
  framework: PromptFramework | null;
  estimatedTokens: number;
}
