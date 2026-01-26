// features/index.ts - Export all features for easy importing
// PromptForge Feature Module

// ============================================
// Variable System
// ============================================
export {
  type Variable,
  type VariableType,
  type VariableValidation,
  type VariableMetadata,
  type VariableSubstitutionResult,
  type BatchSubstitutionResult,
  detectVariables,
  substituteVariables,
  validateVariable,
  batchSubstitute,
  parseCSVInputs,
  extractVariableMetadata,
  exportToPython,
  exportToJavaScript,
  exportToTypeScript,
} from './variable-system';

// ============================================
// Prompt Chains
// ============================================
export {
  type PromptChain,
  type ChainNode,
  type ChainEdge,
  type ChainExecutionResult,
  type NodeExecutionResult,
  type ChainValidationError,
  createChain,
  addNode,
  connectNodes,
  validateChain,
  executeChain,
  getNodeDependencies,
  getExecutionOrder,
  CHAIN_TEMPLATES,
} from './prompt-chains';

// ============================================
// Keyboard Shortcuts
// ============================================
export {
  type KeyboardShortcut,
  type ShortcutCategory,
  type CommandPaletteItem,
  type VimMode,
  type VimState,
  DEFAULT_SHORTCUTS,
  useKeyboardShortcuts,
  useCommandPalette,
  useVimMode,
  formatShortcut,
  getShortcutsReference,
} from './keyboard-shortcuts';

// ============================================
// Cost Calculator
// ============================================
export {
  type ModelPricing,
  type CostEstimate,
  type OptimizationSuggestion,
  type BudgetConfig,
  type BudgetStatus,
  type ModelComparison,
  MODEL_PRICING,
  estimateTokens,
  estimateTokensAccurate,
  calculateCost,
  calculateBatchCost,
  projectMonthlyCost,
  getOptimizationSuggestions,
  checkBudgetStatus,
  formatCost,
  formatTokens,
  compareModels,
} from './cost-calculator';

// ============================================
// Security
// ============================================
export {
  type PIIMatch,
  type PIIType,
  type PIIPattern,
  type InjectionRisk,
  type InjectionType,
  type AuditLogEntry,
  type AuditAction,
  type ResourceType,
  type ComplianceConfig,
  detectPII,
  redactPII,
  hasHighRiskPII,
  detectInjection,
  getInjectionRiskLevel,
  sanitizeInput,
  createAuditLog,
  formatAuditLog,
  checkCompliance,
  COMPLIANCE_PRESETS,
} from './security';

// ============================================
// Snippets
// ============================================
export {
  type PromptSnippet,
  type SnippetCategory,
  DEFAULT_SNIPPETS,
  SNIPPET_CATEGORIES,
  detectSnippets,
  expandSnippets,
  validateSnippetReferences,
  createSnippet,
  searchSnippets,
  getSnippetAnalytics,
} from './snippets';

// ============================================
// Model Recommendation
// ============================================
export {
  type PromptCharacteristics,
  type TaskType,
  type ModelRecommendation,
  type ModelCapabilities,
  type ModelComparisonResult,
  analyzePromptCharacteristics,
  getModelRecommendations,
  recommendModel,
  compareModelsForUseCase,
} from './model-recommendation';

// ============================================
// Prompt Generator
// ============================================
export {
  type GenerationRequest,
  type GeneratedPrompt,
  type ImprovementSuggestion,
  type PromptFramework,
  type ToneStyle,
  type OutputFormat,
  type ImprovementType,
  type QuickPromptParams,
  generatePrompt,
  analyzeAndImprove,
  quickPrompt,
} from './prompt-generator';

// ============================================
// Response Validators
// ============================================
export {
  type ValidationRule,
  type ValidatorType,
  type ValidatorConfig,
  type ValidationResult,
  type ValidationError,
  validateResponse,
  registerCustomValidator,
  unregisterCustomValidator,
  createRule,
  VALIDATION_PRESETS,
} from './response-validators';

// ============================================
// Diff & Merge
// ============================================
export {
  type DiffResult,
  type DiffHunk,
  type DiffChange,
  type DiffStats,
  type MergeResult,
  type MergeConflict,
  type PromptVersion,
  type WordDiff,
  type InlineDiff,
  computeDiff,
  computeWordDiff,
  threeWayMerge,
  resolveConflict,
  compareVersions,
  formatDiff,
  applyDiff,
  inlineDiff,
  getDiffSummary,
} from './diff-merge';

// ============================================
// Webhooks
// ============================================
export {
  type Webhook,
  type WebhookEvent,
  type WebhookPayload,
  type WebhookDelivery,
  type RetryPolicy,
  type IntegrationTemplate,
  DEFAULT_RETRY_POLICY,
  createWebhook,
  validateWebhookUrl,
  buildPayload,
  payloadBuilders,
  generateSignature,
  verifySignature,
  createDelivery,
  calculateNextRetry,
  deliverWebhook,
  shouldTriggerWebhook,
  getWebhooksForEvent,
  sendTestWebhook,
  createFromTemplate,
  INTEGRATION_TEMPLATES,
} from './webhooks';

// ============================================
// SDK & API Client
// ============================================
export {
  type SDKConfig,
  type ExecuteOptions,
  type ExecuteResult,
  type StreamChunk,
  type ExportOptions,
  type PromptForExport,
  type APIEndpoint,
  TYPESCRIPT_SDK,
  PYTHON_SDK,
  exportPrompt,
  generateOpenAPISpec,
  API_ENDPOINTS,
} from './sdk';

// ============================================
// Analytics
// ============================================
export {
  type ExecutionMetric,
  type AggregatedMetrics,
  type PromptAnalytics,
  type RegressionAlert,
  type RegressionType,
  type RegressionConfig,
  type UserBehavior,
  type DashboardData,
  DEFAULT_REGRESSION_CONFIG,
  recordMetric,
  aggregateMetrics,
  calculatePromptAnalytics,
  detectRegressions,
  analyzeUserBehavior,
  generateDashboardData,
  exportMetricsCSV,
} from './analytics';

// ============================================
// Marketplace
// ============================================
export {
  type MarketplacePrompt,
  type MarketplaceCategory,
  type Review,
  type Purchase,
  type Author,
  type SearchFilters,
  type SearchResult,
  type PublishRequest,
  type Collection,
  type AuthorAnalytics,
  MARKETPLACE_CATEGORIES,
  searchMarketplace,
  createListing,
  validateListing,
  createReview,
  calculateRating,
  getRatingDistribution,
  createPurchase,
  hasPurchased,
  getUserPurchases,
  calculateAuthorAnalytics,
  getFeaturedPrompts,
  getTrendingPrompts,
  getSimilarPrompts,
} from './marketplace';

// ============================================
// Tutorials
// ============================================
export {
  type Tutorial,
  type TutorialStep,
  type TutorialCategory,
  type StepType,
  type StepAction,
  type StepValidation,
  type Achievement,
  type UserProgress,
  type Tooltip,
  TUTORIALS,
  ACHIEVEMENTS,
  CONTEXTUAL_TOOLTIPS,
  startTutorial,
  advanceStep,
  previousStep,
  isTutorialCompleted,
  getCompletionPercentage,
  checkAchievement,
  calculateTotalPoints,
} from './tutorials';

// ============================================
// Smart Compression
// ============================================
export {
  type CompressionResult,
  type CompressionChange,
  type CompressionType,
  type CompressionOptions,
  type CompressionSuggestion,
  type BatchCompressionResult,
  type CostSavingsEstimate,
  compressPrompt,
  semanticCompress,
  getCompressionSuggestions,
  batchCompress,
  estimateCostSavings,
  validateCompression,
} from './smart-compression';
