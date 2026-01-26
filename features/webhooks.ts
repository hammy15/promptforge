// webhooks.ts - Webhook integrations and event notifications
// Send events to external services, integrate with CI/CD

// ============================================
// Types
// ============================================

export interface Webhook {
  id: string;
  name: string;
  url: string;
  secret: string;
  events: WebhookEvent[];
  enabled: boolean;
  workspaceId: string;
  createdAt: string;
  updatedAt: string;
  lastTriggeredAt?: string;
  failureCount: number;
  headers?: Record<string, string>;
  retryPolicy: RetryPolicy;
}

export type WebhookEvent =
  | 'prompt.created'
  | 'prompt.updated'
  | 'prompt.deleted'
  | 'prompt.executed'
  | 'experiment.created'
  | 'experiment.completed'
  | 'experiment.winner_selected'
  | 'template.created'
  | 'template.updated'
  | 'version.created'
  | 'user.invited'
  | 'budget.warning'
  | 'budget.exceeded'
  | 'validation.failed'
  | 'error.occurred';

export interface WebhookPayload {
  id: string;
  event: WebhookEvent;
  timestamp: string;
  webhookId: string;
  workspaceId: string;
  data: Record<string, unknown>;
}

export interface WebhookDelivery {
  id: string;
  webhookId: string;
  payload: WebhookPayload;
  status: 'pending' | 'success' | 'failed';
  statusCode?: number;
  responseBody?: string;
  error?: string;
  attempts: number;
  createdAt: string;
  completedAt?: string;
  nextRetryAt?: string;
}

export interface RetryPolicy {
  maxAttempts: number;
  initialDelayMs: number;
  maxDelayMs: number;
  backoffMultiplier: number;
}

// ============================================
// Default Retry Policy
// ============================================

export const DEFAULT_RETRY_POLICY: RetryPolicy = {
  maxAttempts: 5,
  initialDelayMs: 1000,
  maxDelayMs: 300000, // 5 minutes
  backoffMultiplier: 2,
};

// ============================================
// Webhook Management
// ============================================

/**
 * Create a new webhook
 */
export function createWebhook(
  params: Omit<Webhook, 'id' | 'secret' | 'createdAt' | 'updatedAt' | 'failureCount' | 'retryPolicy'> & {
    retryPolicy?: Partial<RetryPolicy>;
  }
): Webhook {
  return {
    id: `wh_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    secret: generateWebhookSecret(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    failureCount: 0,
    retryPolicy: { ...DEFAULT_RETRY_POLICY, ...params.retryPolicy },
    ...params,
  };
}

function generateWebhookSecret(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = 'whsec_';
  for (let i = 0; i < 32; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Validate webhook URL
 */
export function validateWebhookUrl(url: string): { valid: boolean; error?: string } {
  try {
    const parsed = new URL(url);

    // Must be HTTPS in production
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
      return { valid: false, error: 'URL must use HTTPS protocol' };
    }

    // Block localhost and internal IPs in production
    const blockedHosts = ['localhost', '127.0.0.1', '0.0.0.0', '::1'];
    if (blockedHosts.includes(parsed.hostname)) {
      return { valid: false, error: 'Cannot use localhost or internal addresses' };
    }

    // Block internal IP ranges
    if (isInternalIP(parsed.hostname)) {
      return { valid: false, error: 'Cannot use internal IP addresses' };
    }

    return { valid: true };
  } catch {
    return { valid: false, error: 'Invalid URL format' };
  }
}

function isInternalIP(hostname: string): boolean {
  const parts = hostname.split('.').map(Number);

  if (parts.length !== 4 || parts.some(isNaN)) return false;

  // 10.0.0.0/8
  if (parts[0] === 10) return true;

  // 172.16.0.0/12
  if (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) return true;

  // 192.168.0.0/16
  if (parts[0] === 192 && parts[1] === 168) return true;

  return false;
}

// ============================================
// Payload Building
// ============================================

/**
 * Build webhook payload for an event
 */
export function buildPayload(
  event: WebhookEvent,
  webhookId: string,
  workspaceId: string,
  data: Record<string, unknown>
): WebhookPayload {
  return {
    id: `evt_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    event,
    timestamp: new Date().toISOString(),
    webhookId,
    workspaceId,
    data,
  };
}

/**
 * Build event-specific payload data
 */
export const payloadBuilders: Record<WebhookEvent, (data: Record<string, unknown>) => Record<string, unknown>> = {
  'prompt.created': (data) => ({
    prompt: {
      id: data.promptId,
      name: data.name,
      description: data.description,
      createdBy: data.createdBy,
    },
  }),

  'prompt.updated': (data) => ({
    prompt: {
      id: data.promptId,
      name: data.name,
      version: data.version,
      changes: data.changes,
      updatedBy: data.updatedBy,
    },
  }),

  'prompt.deleted': (data) => ({
    prompt: {
      id: data.promptId,
      name: data.name,
      deletedBy: data.deletedBy,
    },
  }),

  'prompt.executed': (data) => ({
    execution: {
      id: data.executionId,
      promptId: data.promptId,
      model: data.model,
      inputTokens: data.inputTokens,
      outputTokens: data.outputTokens,
      cost: data.cost,
      latencyMs: data.latencyMs,
      success: data.success,
    },
  }),

  'experiment.created': (data) => ({
    experiment: {
      id: data.experimentId,
      name: data.name,
      variants: data.variants,
      createdBy: data.createdBy,
    },
  }),

  'experiment.completed': (data) => ({
    experiment: {
      id: data.experimentId,
      name: data.name,
      totalExecutions: data.totalExecutions,
      results: data.results,
    },
  }),

  'experiment.winner_selected': (data) => ({
    experiment: {
      id: data.experimentId,
      name: data.name,
      winnerId: data.winnerId,
      winnerName: data.winnerName,
      metrics: data.metrics,
    },
  }),

  'template.created': (data) => ({
    template: {
      id: data.templateId,
      name: data.name,
      category: data.category,
      createdBy: data.createdBy,
    },
  }),

  'template.updated': (data) => ({
    template: {
      id: data.templateId,
      name: data.name,
      changes: data.changes,
      updatedBy: data.updatedBy,
    },
  }),

  'version.created': (data) => ({
    version: {
      id: data.versionId,
      promptId: data.promptId,
      version: data.version,
      message: data.message,
      createdBy: data.createdBy,
    },
  }),

  'user.invited': (data) => ({
    invitation: {
      email: data.email,
      role: data.role,
      invitedBy: data.invitedBy,
    },
  }),

  'budget.warning': (data) => ({
    budget: {
      currentSpend: data.currentSpend,
      limit: data.limit,
      percentUsed: data.percentUsed,
      projectedOverage: data.projectedOverage,
    },
  }),

  'budget.exceeded': (data) => ({
    budget: {
      currentSpend: data.currentSpend,
      limit: data.limit,
      overage: data.overage,
    },
  }),

  'validation.failed': (data) => ({
    validation: {
      executionId: data.executionId,
      promptId: data.promptId,
      errors: data.errors,
      response: data.response,
    },
  }),

  'error.occurred': (data) => ({
    error: {
      type: data.type,
      message: data.message,
      context: data.context,
    },
  }),
};

// ============================================
// Signature Verification
// ============================================

/**
 * Generate webhook signature
 */
export async function generateSignature(payload: string, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(payload));
  const hashArray = Array.from(new Uint8Array(signature));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');

  return `sha256=${hashHex}`;
}

/**
 * Verify webhook signature
 */
export async function verifySignature(
  payload: string,
  signature: string,
  secret: string
): Promise<boolean> {
  const expected = await generateSignature(payload, secret);
  return timingSafeEqual(signature, expected);
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;

  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

// ============================================
// Webhook Delivery
// ============================================

/**
 * Create a webhook delivery record
 */
export function createDelivery(webhookId: string, payload: WebhookPayload): WebhookDelivery {
  return {
    id: `del_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    webhookId,
    payload,
    status: 'pending',
    attempts: 0,
    createdAt: new Date().toISOString(),
  };
}

/**
 * Calculate next retry time based on policy
 */
export function calculateNextRetry(
  delivery: WebhookDelivery,
  policy: RetryPolicy
): Date | null {
  if (delivery.attempts >= policy.maxAttempts) {
    return null;
  }

  const delay = Math.min(
    policy.initialDelayMs * Math.pow(policy.backoffMultiplier, delivery.attempts),
    policy.maxDelayMs
  );

  return new Date(Date.now() + delay);
}

/**
 * Deliver webhook (mock implementation)
 */
export async function deliverWebhook(
  webhook: Webhook,
  delivery: WebhookDelivery
): Promise<WebhookDelivery> {
  const payloadJson = JSON.stringify(delivery.payload);
  const signature = await generateSignature(payloadJson, webhook.secret);

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-Webhook-Signature': signature,
    'X-Webhook-Id': webhook.id,
    'X-Delivery-Id': delivery.id,
    ...webhook.headers,
  };

  try {
    const response = await fetch(webhook.url, {
      method: 'POST',
      headers,
      body: payloadJson,
    });

    delivery.attempts++;
    delivery.statusCode = response.status;

    if (response.ok) {
      delivery.status = 'success';
      delivery.completedAt = new Date().toISOString();
      try {
        delivery.responseBody = await response.text();
      } catch {
        // Ignore response body errors
      }
    } else {
      delivery.status = 'failed';
      delivery.error = `HTTP ${response.status}`;
      const nextRetry = calculateNextRetry(delivery, webhook.retryPolicy);
      if (nextRetry) {
        delivery.nextRetryAt = nextRetry.toISOString();
      }
    }
  } catch (error) {
    delivery.attempts++;
    delivery.status = 'failed';
    delivery.error = (error as Error).message;

    const nextRetry = calculateNextRetry(delivery, webhook.retryPolicy);
    if (nextRetry) {
      delivery.nextRetryAt = nextRetry.toISOString();
    }
  }

  return delivery;
}

// ============================================
// Event Filtering
// ============================================

/**
 * Check if webhook should receive an event
 */
export function shouldTriggerWebhook(webhook: Webhook, event: WebhookEvent): boolean {
  if (!webhook.enabled) return false;
  return webhook.events.includes(event);
}

/**
 * Get all webhooks that should receive an event
 */
export function getWebhooksForEvent(
  webhooks: Webhook[],
  event: WebhookEvent,
  workspaceId: string
): Webhook[] {
  return webhooks.filter(
    (w) => w.workspaceId === workspaceId && shouldTriggerWebhook(w, event)
  );
}

// ============================================
// Webhook Testing
// ============================================

/**
 * Send a test webhook delivery
 */
export async function sendTestWebhook(
  webhook: Webhook
): Promise<{ success: boolean; statusCode?: number; error?: string }> {
  const testPayload = buildPayload(
    'prompt.executed',
    webhook.id,
    webhook.workspaceId,
    {
      executionId: 'test_123',
      promptId: 'test_prompt',
      model: 'claude-sonnet-4-20250514',
      inputTokens: 100,
      outputTokens: 200,
      cost: 0.001,
      latencyMs: 500,
      success: true,
    }
  );

  const delivery = createDelivery(webhook.id, testPayload);
  const result = await deliverWebhook(webhook, delivery);

  return {
    success: result.status === 'success',
    statusCode: result.statusCode,
    error: result.error,
  };
}

// ============================================
// Integration Templates
// ============================================

export interface IntegrationTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
  events: WebhookEvent[];
  urlPattern?: string;
  headers?: Record<string, string>;
  documentation?: string;
}

export const INTEGRATION_TEMPLATES: IntegrationTemplate[] = [
  {
    id: 'slack',
    name: 'Slack',
    description: 'Send notifications to a Slack channel',
    icon: 'slack',
    events: ['prompt.executed', 'experiment.completed', 'budget.warning', 'error.occurred'],
    urlPattern: 'https://hooks.slack.com/services/...',
    documentation: 'https://api.slack.com/messaging/webhooks',
  },
  {
    id: 'discord',
    name: 'Discord',
    description: 'Send notifications to a Discord channel',
    icon: 'discord',
    events: ['prompt.executed', 'experiment.completed', 'budget.warning'],
    urlPattern: 'https://discord.com/api/webhooks/...',
    documentation: 'https://discord.com/developers/docs/resources/webhook',
  },
  {
    id: 'zapier',
    name: 'Zapier',
    description: 'Connect to 5000+ apps via Zapier',
    icon: 'zap',
    events: ['prompt.created', 'prompt.executed', 'experiment.completed'],
    urlPattern: 'https://hooks.zapier.com/hooks/catch/...',
    documentation: 'https://zapier.com/apps/webhooks',
  },
  {
    id: 'github',
    name: 'GitHub Actions',
    description: 'Trigger GitHub Actions workflows',
    icon: 'github',
    events: ['prompt.updated', 'version.created'],
    urlPattern: 'https://api.github.com/repos/{owner}/{repo}/dispatches',
    headers: {
      Authorization: 'token {GITHUB_TOKEN}',
      Accept: 'application/vnd.github.v3+json',
    },
    documentation: 'https://docs.github.com/en/actions/reference/events-that-trigger-workflows#repository_dispatch',
  },
  {
    id: 'datadog',
    name: 'Datadog',
    description: 'Send metrics and events to Datadog',
    icon: 'bar-chart',
    events: ['prompt.executed', 'error.occurred', 'budget.warning'],
    documentation: 'https://docs.datadoghq.com/api/latest/events/',
  },
  {
    id: 'pagerduty',
    name: 'PagerDuty',
    description: 'Trigger incidents in PagerDuty',
    icon: 'alert-triangle',
    events: ['error.occurred', 'budget.exceeded'],
    documentation: 'https://developer.pagerduty.com/docs/events-api-v2/trigger-events/',
  },
];

/**
 * Create webhook from integration template
 */
export function createFromTemplate(
  template: IntegrationTemplate,
  url: string,
  workspaceId: string,
  name?: string
): Webhook {
  return createWebhook({
    name: name || `${template.name} Integration`,
    url,
    events: template.events,
    enabled: true,
    workspaceId,
    headers: template.headers,
  });
}
