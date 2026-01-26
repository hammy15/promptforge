// security.ts - PII detection, prompt injection protection, and audit logging

// ============================================
// PII Detection
// ============================================

export interface PIIMatch {
  type: PIIType;
  value: string;
  redactedValue: string;
  startIndex: number;
  endIndex: number;
  confidence: 'high' | 'medium' | 'low';
}

export type PIIType =
  | 'email'
  | 'phone'
  | 'ssn'
  | 'credit_card'
  | 'ip_address'
  | 'date_of_birth'
  | 'address'
  | 'name'
  | 'passport'
  | 'driver_license'
  | 'bank_account'
  | 'api_key'
  | 'password';

export interface PIIPattern {
  type: PIIType;
  pattern: RegExp;
  confidence: PIIMatch['confidence'];
  description: string;
}

const PII_PATTERNS: PIIPattern[] = [
  // Email
  {
    type: 'email',
    pattern: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
    confidence: 'high',
    description: 'Email address',
  },
  // Phone numbers (various formats)
  {
    type: 'phone',
    pattern: /(?:\+?1[-.\s]?)?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}/g,
    confidence: 'high',
    description: 'Phone number',
  },
  // SSN
  {
    type: 'ssn',
    pattern: /\b\d{3}[-\s]?\d{2}[-\s]?\d{4}\b/g,
    confidence: 'high',
    description: 'Social Security Number',
  },
  // Credit card numbers
  {
    type: 'credit_card',
    pattern: /\b(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12}|3(?:0[0-5]|[68][0-9])[0-9]{11})\b/g,
    confidence: 'high',
    description: 'Credit card number',
  },
  // IP addresses
  {
    type: 'ip_address',
    pattern: /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/g,
    confidence: 'high',
    description: 'IP address',
  },
  // Date of birth patterns
  {
    type: 'date_of_birth',
    pattern: /\b(?:DOB|Date of Birth|Born|Birthday)[:\s]*(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})\b/gi,
    confidence: 'medium',
    description: 'Date of birth',
  },
  // API keys (common patterns)
  {
    type: 'api_key',
    pattern: /\b(?:sk-[a-zA-Z0-9]{20,}|api[_-]?key[:\s=]+['"]?[a-zA-Z0-9_-]{20,}['"]?)\b/gi,
    confidence: 'high',
    description: 'API key',
  },
  // AWS access keys
  {
    type: 'api_key',
    pattern: /\bAKIA[0-9A-Z]{16}\b/g,
    confidence: 'high',
    description: 'AWS Access Key',
  },
  // Passwords in common formats
  {
    type: 'password',
    pattern: /(?:password|passwd|pwd)[:\s=]+['"]?[^\s'"]{8,}['"]?/gi,
    confidence: 'medium',
    description: 'Password',
  },
  // Bank account numbers (basic)
  {
    type: 'bank_account',
    pattern: /\b(?:account|acct)[:\s#]*\d{8,17}\b/gi,
    confidence: 'medium',
    description: 'Bank account number',
  },
  // Passport numbers
  {
    type: 'passport',
    pattern: /\b(?:passport)[:\s#]*[A-Z0-9]{6,9}\b/gi,
    confidence: 'medium',
    description: 'Passport number',
  },
];

/**
 * Detect PII in text
 */
export function detectPII(text: string): PIIMatch[] {
  const matches: PIIMatch[] = [];

  for (const pattern of PII_PATTERNS) {
    let match;
    const regex = new RegExp(pattern.pattern.source, pattern.pattern.flags);

    while ((match = regex.exec(text)) !== null) {
      const value = match[0];
      matches.push({
        type: pattern.type,
        value,
        redactedValue: redactValue(value, pattern.type),
        startIndex: match.index,
        endIndex: match.index + value.length,
        confidence: pattern.confidence,
      });
    }
  }

  // Sort by position
  matches.sort((a, b) => a.startIndex - b.startIndex);

  // Remove overlapping matches (keep higher confidence)
  const filtered: PIIMatch[] = [];
  for (const match of matches) {
    const overlapping = filtered.find(
      (m) => match.startIndex < m.endIndex && match.endIndex > m.startIndex
    );
    if (!overlapping) {
      filtered.push(match);
    } else if (
      match.confidence === 'high' &&
      overlapping.confidence !== 'high'
    ) {
      const idx = filtered.indexOf(overlapping);
      filtered[idx] = match;
    }
  }

  return filtered;
}

/**
 * Redact a value based on type
 */
function redactValue(value: string, type: PIIType): string {
  switch (type) {
    case 'email':
      const [user, domain] = value.split('@');
      return `${user[0]}***@${domain}`;
    case 'phone':
      return value.replace(/\d(?=\d{4})/g, '*');
    case 'ssn':
      return '***-**-' + value.slice(-4);
    case 'credit_card':
      return '**** **** **** ' + value.slice(-4);
    case 'api_key':
      return value.slice(0, 4) + '****' + value.slice(-4);
    default:
      if (value.length <= 4) return '****';
      return value.slice(0, 2) + '*'.repeat(value.length - 4) + value.slice(-2);
  }
}

/**
 * Redact all PII in text
 */
export function redactPII(text: string): { redacted: string; matches: PIIMatch[] } {
  const matches = detectPII(text);
  let redacted = text;

  // Replace from end to preserve indices
  for (let i = matches.length - 1; i >= 0; i--) {
    const match = matches[i];
    redacted =
      redacted.slice(0, match.startIndex) +
      match.redactedValue +
      redacted.slice(match.endIndex);
  }

  return { redacted, matches };
}

/**
 * Check if text contains high-risk PII
 */
export function hasHighRiskPII(text: string): boolean {
  const highRiskTypes: PIIType[] = ['ssn', 'credit_card', 'api_key', 'password', 'bank_account'];
  const matches = detectPII(text);
  return matches.some((m) => highRiskTypes.includes(m.type) && m.confidence === 'high');
}

// ============================================
// Prompt Injection Detection
// ============================================

export interface InjectionRisk {
  type: InjectionType;
  severity: 'high' | 'medium' | 'low';
  pattern: string;
  description: string;
  position: { start: number; end: number };
}

export type InjectionType =
  | 'instruction_override'
  | 'role_hijack'
  | 'delimiter_attack'
  | 'encoding_attack'
  | 'recursive_injection'
  | 'context_manipulation';

interface InjectionPattern {
  type: InjectionType;
  patterns: RegExp[];
  severity: InjectionRisk['severity'];
  description: string;
}

const INJECTION_PATTERNS: InjectionPattern[] = [
  {
    type: 'instruction_override',
    patterns: [
      /ignore\s+(all\s+)?(previous|above|prior)\s+(instructions?|text|context)/gi,
      /disregard\s+(all\s+)?(previous|above|prior)/gi,
      /forget\s+(everything|all|what)/gi,
      /new\s+instructions?:/gi,
      /override\s+(system|instructions?)/gi,
    ],
    severity: 'high',
    description: 'Attempts to override previous instructions',
  },
  {
    type: 'role_hijack',
    patterns: [
      /you\s+are\s+(now|actually|really)/gi,
      /pretend\s+(to\s+be|you('re)?)/gi,
      /act\s+as\s+(if|though)/gi,
      /roleplay\s+as/gi,
      /assume\s+the\s+(role|identity)/gi,
    ],
    severity: 'high',
    description: 'Attempts to change the AI role or persona',
  },
  {
    type: 'delimiter_attack',
    patterns: [
      /```\s*(system|admin|developer)/gi,
      /\[SYSTEM\]/gi,
      /<\/?system>/gi,
      /###\s*(SYSTEM|ADMIN)/gi,
      /---\s*END\s*(PROMPT|SYSTEM)/gi,
    ],
    severity: 'medium',
    description: 'Uses delimiters to inject system-level content',
  },
  {
    type: 'encoding_attack',
    patterns: [
      /base64[:\s]/gi,
      /\\x[0-9a-f]{2}/gi,
      /\\u[0-9a-f]{4}/gi,
      /&#x?[0-9a-f]+;/gi,
    ],
    severity: 'medium',
    description: 'Uses encoding to hide malicious content',
  },
  {
    type: 'recursive_injection',
    patterns: [
      /repeat\s+(this|the\s+following)\s+(forever|indefinitely)/gi,
      /infinite\s+loop/gi,
      /call\s+yourself/gi,
    ],
    severity: 'low',
    description: 'Attempts to create recursive behavior',
  },
  {
    type: 'context_manipulation',
    patterns: [
      /the\s+user\s+(actually\s+)?wants/gi,
      /what\s+they\s+really\s+mean/gi,
      /the\s+real\s+question/gi,
      /between\s+the\s+lines/gi,
    ],
    severity: 'low',
    description: 'Attempts to manipulate context interpretation',
  },
];

/**
 * Detect potential prompt injection attempts
 */
export function detectInjection(text: string): InjectionRisk[] {
  const risks: InjectionRisk[] = [];

  for (const pattern of INJECTION_PATTERNS) {
    for (const regex of pattern.patterns) {
      let match;
      const r = new RegExp(regex.source, regex.flags);

      while ((match = r.exec(text)) !== null) {
        risks.push({
          type: pattern.type,
          severity: pattern.severity,
          pattern: match[0],
          description: pattern.description,
          position: {
            start: match.index,
            end: match.index + match[0].length,
          },
        });
      }
    }
  }

  // Sort by severity
  const severityOrder = { high: 0, medium: 1, low: 2 };
  risks.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);

  return risks;
}

/**
 * Get overall injection risk level
 */
export function getInjectionRiskLevel(
  text: string
): 'none' | 'low' | 'medium' | 'high' {
  const risks = detectInjection(text);

  if (risks.length === 0) return 'none';
  if (risks.some((r) => r.severity === 'high')) return 'high';
  if (risks.some((r) => r.severity === 'medium')) return 'medium';
  return 'low';
}

/**
 * Sanitize input to reduce injection risk
 */
export function sanitizeInput(text: string): string {
  let sanitized = text;

  // Remove common delimiter attacks
  sanitized = sanitized.replace(/```\s*(system|admin)/gi, '```');
  sanitized = sanitized.replace(/\[SYSTEM\]/gi, '[USER]');
  sanitized = sanitized.replace(/<\/?system>/gi, '');

  // Escape potential code injection
  sanitized = sanitized.replace(/\\/g, '\\\\');

  return sanitized;
}

// ============================================
// Audit Logging
// ============================================

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  userId: string;
  workspaceId: string;
  action: AuditAction;
  resourceType: ResourceType;
  resourceId: string;
  resourceName?: string;
  details: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  success: boolean;
  errorMessage?: string;
}

export type AuditAction =
  | 'create'
  | 'read'
  | 'update'
  | 'delete'
  | 'execute'
  | 'export'
  | 'import'
  | 'share'
  | 'fork'
  | 'login'
  | 'logout'
  | 'api_key_create'
  | 'api_key_revoke'
  | 'settings_change';

export type ResourceType =
  | 'prompt'
  | 'template'
  | 'experiment'
  | 'workspace'
  | 'user'
  | 'api_key'
  | 'execution';

/**
 * Create an audit log entry
 */
export function createAuditLog(
  params: Omit<AuditLogEntry, 'id' | 'timestamp'>
): AuditLogEntry {
  return {
    id: `audit_${Date.now()}_${Math.random().toString(36).slice(2)}`,
    timestamp: new Date().toISOString(),
    ...params,
  };
}

/**
 * Format audit log for display
 */
export function formatAuditLog(entry: AuditLogEntry): string {
  const actionVerbs: Record<AuditAction, string> = {
    create: 'created',
    read: 'viewed',
    update: 'updated',
    delete: 'deleted',
    execute: 'executed',
    export: 'exported',
    import: 'imported',
    share: 'shared',
    fork: 'forked',
    login: 'logged in',
    logout: 'logged out',
    api_key_create: 'created API key',
    api_key_revoke: 'revoked API key',
    settings_change: 'changed settings',
  };

  const verb = actionVerbs[entry.action] || entry.action;
  const resource = entry.resourceName || entry.resourceId;

  return `${verb} ${entry.resourceType} "${resource}"`;
}

// ============================================
// Compliance Helpers
// ============================================

export interface ComplianceConfig {
  piiDetection: boolean;
  piiAutoRedact: boolean;
  injectionDetection: boolean;
  auditLogging: boolean;
  dataRetentionDays: number;
  allowedRegions: string[];
}

export const COMPLIANCE_PRESETS: Record<string, ComplianceConfig> = {
  standard: {
    piiDetection: true,
    piiAutoRedact: false,
    injectionDetection: true,
    auditLogging: true,
    dataRetentionDays: 90,
    allowedRegions: ['us', 'eu'],
  },
  hipaa: {
    piiDetection: true,
    piiAutoRedact: true,
    injectionDetection: true,
    auditLogging: true,
    dataRetentionDays: 2555, // 7 years
    allowedRegions: ['us'],
  },
  gdpr: {
    piiDetection: true,
    piiAutoRedact: true,
    injectionDetection: true,
    auditLogging: true,
    dataRetentionDays: 30, // Minimal retention
    allowedRegions: ['eu'],
  },
  soc2: {
    piiDetection: true,
    piiAutoRedact: false,
    injectionDetection: true,
    auditLogging: true,
    dataRetentionDays: 365,
    allowedRegions: ['us', 'eu', 'apac'],
  },
};

/**
 * Check if content complies with configuration
 */
export function checkCompliance(
  text: string,
  config: ComplianceConfig
): {
  compliant: boolean;
  issues: string[];
  warnings: string[];
} {
  const issues: string[] = [];
  const warnings: string[] = [];

  // PII checks
  if (config.piiDetection) {
    const piiMatches = detectPII(text);
    if (piiMatches.length > 0) {
      if (config.piiAutoRedact) {
        warnings.push(`Found ${piiMatches.length} PII item(s) - will be auto-redacted`);
      } else {
        issues.push(`Contains ${piiMatches.length} PII item(s): ${piiMatches.map(m => m.type).join(', ')}`);
      }
    }
  }

  // Injection checks
  if (config.injectionDetection) {
    const injectionRisks = detectInjection(text);
    const highRisks = injectionRisks.filter(r => r.severity === 'high');
    if (highRisks.length > 0) {
      issues.push(`High-risk injection patterns detected: ${highRisks.map(r => r.type).join(', ')}`);
    }
  }

  return {
    compliant: issues.length === 0,
    issues,
    warnings,
  };
}
