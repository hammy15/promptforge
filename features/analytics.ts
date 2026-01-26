// analytics.ts - Usage analytics, regression detection, and behavior tracking
// Performance monitoring, cost analysis, user behavior insights

// ============================================
// Types
// ============================================

export interface ExecutionMetric {
  id: string;
  promptId: string;
  promptVersion: string;
  timestamp: string;
  model: string;
  inputTokens: number;
  outputTokens: number;
  latencyMs: number;
  cost: number;
  success: boolean;
  errorType?: string;
  userId?: string;
  metadata?: Record<string, unknown>;
}

export interface AggregatedMetrics {
  period: 'hour' | 'day' | 'week' | 'month';
  startTime: string;
  endTime: string;
  totalExecutions: number;
  successRate: number;
  avgLatencyMs: number;
  p50LatencyMs: number;
  p95LatencyMs: number;
  p99LatencyMs: number;
  totalInputTokens: number;
  totalOutputTokens: number;
  totalCost: number;
  uniqueUsers: number;
  errorBreakdown: Record<string, number>;
  modelBreakdown: Record<string, number>;
}

export interface PromptAnalytics {
  promptId: string;
  totalExecutions: number;
  last24Hours: number;
  last7Days: number;
  last30Days: number;
  avgCostPerExecution: number;
  avgLatencyMs: number;
  successRate: number;
  topUsers: { userId: string; executions: number }[];
  versionPerformance: {
    version: string;
    executions: number;
    successRate: number;
    avgLatencyMs: number;
  }[];
  dailyTrend: { date: string; executions: number; cost: number }[];
}

export interface RegressionAlert {
  id: string;
  promptId: string;
  type: RegressionType;
  severity: 'high' | 'medium' | 'low';
  metric: string;
  baseline: number;
  current: number;
  changePercent: number;
  detectedAt: string;
  acknowledged: boolean;
  details: string;
}

export type RegressionType =
  | 'latency_increase'
  | 'error_rate_increase'
  | 'cost_increase'
  | 'token_usage_spike'
  | 'success_rate_drop';

// ============================================
// Metric Collection
// ============================================

/**
 * Record an execution metric
 */
export function recordMetric(
  params: Omit<ExecutionMetric, 'id' | 'timestamp'>
): ExecutionMetric {
  return {
    id: `metric_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    timestamp: new Date().toISOString(),
    ...params,
  };
}

/**
 * Aggregate metrics for a time period
 */
export function aggregateMetrics(
  metrics: ExecutionMetric[],
  period: AggregatedMetrics['period']
): AggregatedMetrics {
  if (metrics.length === 0) {
    return createEmptyAggregation(period);
  }

  const sorted = [...metrics].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  const latencies = sorted.map((m) => m.latencyMs).sort((a, b) => a - b);
  const successCount = sorted.filter((m) => m.success).length;
  const uniqueUsers = new Set(sorted.filter((m) => m.userId).map((m) => m.userId));

  // Error breakdown
  const errorBreakdown: Record<string, number> = {};
  for (const metric of sorted) {
    if (!metric.success && metric.errorType) {
      errorBreakdown[metric.errorType] = (errorBreakdown[metric.errorType] || 0) + 1;
    }
  }

  // Model breakdown
  const modelBreakdown: Record<string, number> = {};
  for (const metric of sorted) {
    modelBreakdown[metric.model] = (modelBreakdown[metric.model] || 0) + 1;
  }

  return {
    period,
    startTime: sorted[0].timestamp,
    endTime: sorted[sorted.length - 1].timestamp,
    totalExecutions: sorted.length,
    successRate: successCount / sorted.length,
    avgLatencyMs: latencies.reduce((a, b) => a + b, 0) / latencies.length,
    p50LatencyMs: percentile(latencies, 50),
    p95LatencyMs: percentile(latencies, 95),
    p99LatencyMs: percentile(latencies, 99),
    totalInputTokens: sorted.reduce((sum, m) => sum + m.inputTokens, 0),
    totalOutputTokens: sorted.reduce((sum, m) => sum + m.outputTokens, 0),
    totalCost: sorted.reduce((sum, m) => sum + m.cost, 0),
    uniqueUsers: uniqueUsers.size,
    errorBreakdown,
    modelBreakdown,
  };
}

function createEmptyAggregation(period: AggregatedMetrics['period']): AggregatedMetrics {
  const now = new Date().toISOString();
  return {
    period,
    startTime: now,
    endTime: now,
    totalExecutions: 0,
    successRate: 1,
    avgLatencyMs: 0,
    p50LatencyMs: 0,
    p95LatencyMs: 0,
    p99LatencyMs: 0,
    totalInputTokens: 0,
    totalOutputTokens: 0,
    totalCost: 0,
    uniqueUsers: 0,
    errorBreakdown: {},
    modelBreakdown: {},
  };
}

function percentile(sorted: number[], p: number): number {
  if (sorted.length === 0) return 0;
  const index = Math.ceil((p / 100) * sorted.length) - 1;
  return sorted[Math.max(0, index)];
}

// ============================================
// Prompt Analytics
// ============================================

/**
 * Calculate analytics for a specific prompt
 */
export function calculatePromptAnalytics(
  promptId: string,
  metrics: ExecutionMetric[]
): PromptAnalytics {
  const promptMetrics = metrics.filter((m) => m.promptId === promptId);
  const now = Date.now();
  const day = 24 * 60 * 60 * 1000;

  const last24Hours = promptMetrics.filter(
    (m) => now - new Date(m.timestamp).getTime() < day
  ).length;

  const last7Days = promptMetrics.filter(
    (m) => now - new Date(m.timestamp).getTime() < 7 * day
  ).length;

  const last30Days = promptMetrics.filter(
    (m) => now - new Date(m.timestamp).getTime() < 30 * day
  ).length;

  // Calculate by version
  const versionMap = new Map<string, ExecutionMetric[]>();
  for (const metric of promptMetrics) {
    const existing = versionMap.get(metric.promptVersion) || [];
    existing.push(metric);
    versionMap.set(metric.promptVersion, existing);
  }

  const versionPerformance = Array.from(versionMap.entries()).map(([version, vMetrics]) => ({
    version,
    executions: vMetrics.length,
    successRate: vMetrics.filter((m) => m.success).length / vMetrics.length,
    avgLatencyMs: vMetrics.reduce((sum, m) => sum + m.latencyMs, 0) / vMetrics.length,
  }));

  // Calculate by user
  const userMap = new Map<string, number>();
  for (const metric of promptMetrics) {
    if (metric.userId) {
      userMap.set(metric.userId, (userMap.get(metric.userId) || 0) + 1);
    }
  }

  const topUsers = Array.from(userMap.entries())
    .map(([userId, executions]) => ({ userId, executions }))
    .sort((a, b) => b.executions - a.executions)
    .slice(0, 10);

  // Daily trend
  const dailyMap = new Map<string, { executions: number; cost: number }>();
  for (const metric of promptMetrics) {
    const date = metric.timestamp.split('T')[0];
    const existing = dailyMap.get(date) || { executions: 0, cost: 0 };
    existing.executions++;
    existing.cost += metric.cost;
    dailyMap.set(date, existing);
  }

  const dailyTrend = Array.from(dailyMap.entries())
    .map(([date, data]) => ({ date, ...data }))
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-30);

  const successCount = promptMetrics.filter((m) => m.success).length;
  const totalCost = promptMetrics.reduce((sum, m) => sum + m.cost, 0);
  const totalLatency = promptMetrics.reduce((sum, m) => sum + m.latencyMs, 0);

  return {
    promptId,
    totalExecutions: promptMetrics.length,
    last24Hours,
    last7Days,
    last30Days,
    avgCostPerExecution: promptMetrics.length > 0 ? totalCost / promptMetrics.length : 0,
    avgLatencyMs: promptMetrics.length > 0 ? totalLatency / promptMetrics.length : 0,
    successRate: promptMetrics.length > 0 ? successCount / promptMetrics.length : 1,
    topUsers,
    versionPerformance,
    dailyTrend,
  };
}

// ============================================
// Regression Detection
// ============================================

export interface RegressionConfig {
  latencyThreshold: number; // Percentage increase to trigger alert
  errorRateThreshold: number;
  costThreshold: number;
  minSampleSize: number;
  lookbackPeriod: number; // Hours
}

export const DEFAULT_REGRESSION_CONFIG: RegressionConfig = {
  latencyThreshold: 50, // 50% increase
  errorRateThreshold: 20, // 20% increase
  costThreshold: 30, // 30% increase
  minSampleSize: 10,
  lookbackPeriod: 24,
};

/**
 * Detect performance regressions
 */
export function detectRegressions(
  currentMetrics: ExecutionMetric[],
  baselineMetrics: ExecutionMetric[],
  config: RegressionConfig = DEFAULT_REGRESSION_CONFIG
): RegressionAlert[] {
  const alerts: RegressionAlert[] = [];

  if (currentMetrics.length < config.minSampleSize || baselineMetrics.length < config.minSampleSize) {
    return alerts;
  }

  const current = aggregateMetrics(currentMetrics, 'day');
  const baseline = aggregateMetrics(baselineMetrics, 'day');

  // Check latency regression
  const latencyChange = ((current.avgLatencyMs - baseline.avgLatencyMs) / baseline.avgLatencyMs) * 100;
  if (latencyChange > config.latencyThreshold) {
    alerts.push(createAlert(
      'latency_increase',
      latencyChange > 100 ? 'high' : latencyChange > 50 ? 'medium' : 'low',
      'avgLatencyMs',
      baseline.avgLatencyMs,
      current.avgLatencyMs,
      latencyChange,
      `Average latency increased from ${baseline.avgLatencyMs.toFixed(0)}ms to ${current.avgLatencyMs.toFixed(0)}ms`
    ));
  }

  // Check error rate regression
  const errorRateChange = (current.successRate - baseline.successRate) * 100;
  if (errorRateChange < -config.errorRateThreshold) {
    alerts.push(createAlert(
      'success_rate_drop',
      errorRateChange < -30 ? 'high' : errorRateChange < -20 ? 'medium' : 'low',
      'successRate',
      baseline.successRate,
      current.successRate,
      errorRateChange,
      `Success rate dropped from ${(baseline.successRate * 100).toFixed(1)}% to ${(current.successRate * 100).toFixed(1)}%`
    ));
  }

  // Check cost regression
  const avgCostCurrent = current.totalCost / current.totalExecutions;
  const avgCostBaseline = baseline.totalCost / baseline.totalExecutions;
  const costChange = ((avgCostCurrent - avgCostBaseline) / avgCostBaseline) * 100;

  if (costChange > config.costThreshold) {
    alerts.push(createAlert(
      'cost_increase',
      costChange > 100 ? 'high' : costChange > 50 ? 'medium' : 'low',
      'avgCost',
      avgCostBaseline,
      avgCostCurrent,
      costChange,
      `Average cost per execution increased from $${avgCostBaseline.toFixed(4)} to $${avgCostCurrent.toFixed(4)}`
    ));
  }

  return alerts;
}

function createAlert(
  type: RegressionType,
  severity: RegressionAlert['severity'],
  metric: string,
  baseline: number,
  current: number,
  changePercent: number,
  details: string
): RegressionAlert {
  return {
    id: `alert_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    promptId: '', // To be filled by caller
    type,
    severity,
    metric,
    baseline,
    current,
    changePercent,
    detectedAt: new Date().toISOString(),
    acknowledged: false,
    details,
  };
}

// ============================================
// User Behavior Analytics
// ============================================

export interface UserBehavior {
  userId: string;
  totalExecutions: number;
  uniquePrompts: number;
  totalCost: number;
  avgSessionDuration: number;
  mostUsedPrompts: { promptId: string; count: number }[];
  preferredModels: { model: string; count: number }[];
  activityHeatmap: Record<string, number>; // Hour of day -> count
  retentionDays: number;
  lastActiveAt: string;
}

/**
 * Analyze user behavior patterns
 */
export function analyzeUserBehavior(
  userId: string,
  metrics: ExecutionMetric[]
): UserBehavior {
  const userMetrics = metrics.filter((m) => m.userId === userId);

  if (userMetrics.length === 0) {
    return {
      userId,
      totalExecutions: 0,
      uniquePrompts: 0,
      totalCost: 0,
      avgSessionDuration: 0,
      mostUsedPrompts: [],
      preferredModels: [],
      activityHeatmap: {},
      retentionDays: 0,
      lastActiveAt: '',
    };
  }

  // Count by prompt
  const promptCounts = new Map<string, number>();
  for (const metric of userMetrics) {
    promptCounts.set(metric.promptId, (promptCounts.get(metric.promptId) || 0) + 1);
  }

  const mostUsedPrompts = Array.from(promptCounts.entries())
    .map(([promptId, count]) => ({ promptId, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Count by model
  const modelCounts = new Map<string, number>();
  for (const metric of userMetrics) {
    modelCounts.set(metric.model, (modelCounts.get(metric.model) || 0) + 1);
  }

  const preferredModels = Array.from(modelCounts.entries())
    .map(([model, count]) => ({ model, count }))
    .sort((a, b) => b.count - a.count);

  // Activity heatmap by hour
  const activityHeatmap: Record<string, number> = {};
  for (const metric of userMetrics) {
    const hour = new Date(metric.timestamp).getHours().toString().padStart(2, '0');
    activityHeatmap[hour] = (activityHeatmap[hour] || 0) + 1;
  }

  // Calculate retention (days with activity)
  const activeDays = new Set(userMetrics.map((m) => m.timestamp.split('T')[0]));
  const retentionDays = activeDays.size;

  // Last activity
  const sorted = userMetrics.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
  const lastActiveAt = sorted[0].timestamp;

  return {
    userId,
    totalExecutions: userMetrics.length,
    uniquePrompts: promptCounts.size,
    totalCost: userMetrics.reduce((sum, m) => sum + m.cost, 0),
    avgSessionDuration: 0, // Would need session data to calculate
    mostUsedPrompts,
    preferredModels,
    activityHeatmap,
    retentionDays,
    lastActiveAt,
  };
}

// ============================================
// Dashboard Data
// ============================================

export interface DashboardData {
  overview: {
    totalExecutions: number;
    totalCost: number;
    avgLatency: number;
    successRate: number;
    activeUsers: number;
    activePrompts: number;
  };
  trends: {
    executions: { date: string; value: number }[];
    cost: { date: string; value: number }[];
    latency: { date: string; value: number }[];
  };
  topPrompts: { id: string; name: string; executions: number; cost: number }[];
  recentAlerts: RegressionAlert[];
  modelUsage: { model: string; executions: number; cost: number }[];
}

/**
 * Generate dashboard data from metrics
 */
export function generateDashboardData(
  metrics: ExecutionMetric[],
  promptNames: Record<string, string>,
  alerts: RegressionAlert[]
): DashboardData {
  const aggregated = aggregateMetrics(metrics, 'day');

  // Calculate daily trends
  const dailyMap = new Map<string, { executions: number; cost: number; latency: number; count: number }>();
  for (const metric of metrics) {
    const date = metric.timestamp.split('T')[0];
    const existing = dailyMap.get(date) || { executions: 0, cost: 0, latency: 0, count: 0 };
    existing.executions++;
    existing.cost += metric.cost;
    existing.latency += metric.latencyMs;
    existing.count++;
    dailyMap.set(date, existing);
  }

  const dates = Array.from(dailyMap.keys()).sort();
  const trends = {
    executions: dates.map((date) => ({ date, value: dailyMap.get(date)!.executions })),
    cost: dates.map((date) => ({ date, value: dailyMap.get(date)!.cost })),
    latency: dates.map((date) => ({
      date,
      value: dailyMap.get(date)!.latency / dailyMap.get(date)!.count,
    })),
  };

  // Top prompts
  const promptMap = new Map<string, { executions: number; cost: number }>();
  for (const metric of metrics) {
    const existing = promptMap.get(metric.promptId) || { executions: 0, cost: 0 };
    existing.executions++;
    existing.cost += metric.cost;
    promptMap.set(metric.promptId, existing);
  }

  const topPrompts = Array.from(promptMap.entries())
    .map(([id, data]) => ({
      id,
      name: promptNames[id] || id,
      ...data,
    }))
    .sort((a, b) => b.executions - a.executions)
    .slice(0, 10);

  // Model usage
  const modelMap = new Map<string, { executions: number; cost: number }>();
  for (const metric of metrics) {
    const existing = modelMap.get(metric.model) || { executions: 0, cost: 0 };
    existing.executions++;
    existing.cost += metric.cost;
    modelMap.set(metric.model, existing);
  }

  const modelUsage = Array.from(modelMap.entries())
    .map(([model, data]) => ({ model, ...data }))
    .sort((a, b) => b.executions - a.executions);

  return {
    overview: {
      totalExecutions: aggregated.totalExecutions,
      totalCost: aggregated.totalCost,
      avgLatency: aggregated.avgLatencyMs,
      successRate: aggregated.successRate,
      activeUsers: aggregated.uniqueUsers,
      activePrompts: promptMap.size,
    },
    trends,
    topPrompts,
    recentAlerts: alerts.filter((a) => !a.acknowledged).slice(0, 5),
    modelUsage,
  };
}

// ============================================
// Export Helpers
// ============================================

export function exportMetricsCSV(metrics: ExecutionMetric[]): string {
  const headers = [
    'id',
    'promptId',
    'promptVersion',
    'timestamp',
    'model',
    'inputTokens',
    'outputTokens',
    'latencyMs',
    'cost',
    'success',
    'errorType',
    'userId',
  ];

  const rows = metrics.map((m) => [
    m.id,
    m.promptId,
    m.promptVersion,
    m.timestamp,
    m.model,
    m.inputTokens,
    m.outputTokens,
    m.latencyMs,
    m.cost,
    m.success,
    m.errorType || '',
    m.userId || '',
  ]);

  return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
}
