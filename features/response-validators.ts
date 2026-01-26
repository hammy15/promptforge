// response-validators.ts - Validate AI responses against expected formats
// JSON schema validation, regex patterns, custom validators

// ============================================
// Types
// ============================================

export interface ValidationRule {
  id: string;
  name: string;
  type: ValidatorType;
  config: ValidatorConfig;
  errorMessage: string;
  severity: 'error' | 'warning' | 'info';
}

export type ValidatorType =
  | 'json_schema'
  | 'regex'
  | 'length'
  | 'contains'
  | 'not_contains'
  | 'starts_with'
  | 'ends_with'
  | 'custom'
  | 'sentiment'
  | 'language'
  | 'format';

export type ValidatorConfig =
  | JsonSchemaConfig
  | RegexConfig
  | LengthConfig
  | ContainsConfig
  | StartsWithConfig
  | CustomConfig
  | SentimentConfig
  | LanguageConfig
  | FormatConfig;

export interface JsonSchemaConfig {
  schema: Record<string, unknown>;
  strict?: boolean;
}

export interface RegexConfig {
  pattern: string;
  flags?: string;
  matchAll?: boolean;
}

export interface LengthConfig {
  min?: number;
  max?: number;
  unit: 'characters' | 'words' | 'lines' | 'tokens';
}

export interface ContainsConfig {
  values: string[];
  mode: 'all' | 'any' | 'none';
  caseSensitive?: boolean;
}

export interface StartsWithConfig {
  value: string;
  caseSensitive?: boolean;
}

export interface CustomConfig {
  function: string; // Serialized function or function name
  params?: Record<string, unknown>;
}

export interface SentimentConfig {
  expected: 'positive' | 'negative' | 'neutral';
  threshold?: number;
}

export interface LanguageConfig {
  expected: string[]; // ISO language codes
}

export interface FormatConfig {
  format: 'json' | 'markdown' | 'html' | 'xml' | 'yaml' | 'csv';
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationError[];
  info: ValidationError[];
  score: number; // 0-100
}

export interface ValidationError {
  ruleId: string;
  ruleName: string;
  message: string;
  details?: string;
  position?: { start: number; end: number };
}

// ============================================
// Built-in Validators
// ============================================

const validators: Record<ValidatorType, (response: string, config: ValidatorConfig) => { passed: boolean; details?: string }> = {
  json_schema: validateJsonSchema,
  regex: validateRegex,
  length: validateLength,
  contains: validateContains,
  not_contains: validateNotContains,
  starts_with: validateStartsWith,
  ends_with: validateEndsWith,
  custom: validateCustom,
  sentiment: validateSentiment,
  language: validateLanguage,
  format: validateFormat,
};

function validateJsonSchema(
  response: string,
  config: ValidatorConfig
): { passed: boolean; details?: string } {
  const { schema, strict } = config as JsonSchemaConfig;

  try {
    const parsed = JSON.parse(response);
    const errors = validateObjectAgainstSchema(parsed, schema, '', strict);

    if (errors.length > 0) {
      return { passed: false, details: errors.join('; ') };
    }
    return { passed: true };
  } catch (e) {
    return { passed: false, details: `Invalid JSON: ${(e as Error).message}` };
  }
}

function validateObjectAgainstSchema(
  obj: unknown,
  schema: Record<string, unknown>,
  path: string,
  strict?: boolean
): string[] {
  const errors: string[] = [];

  if (schema.type) {
    const expectedType = schema.type as string;
    const actualType = Array.isArray(obj) ? 'array' : typeof obj;

    if (expectedType !== actualType) {
      errors.push(`${path || 'root'}: expected ${expectedType}, got ${actualType}`);
      return errors;
    }
  }

  if (schema.properties && typeof obj === 'object' && obj !== null) {
    const props = schema.properties as Record<string, Record<string, unknown>>;
    const required = (schema.required as string[]) || [];

    // Check required properties
    for (const prop of required) {
      if (!(prop in obj)) {
        errors.push(`${path ? path + '.' : ''}${prop}: required property missing`);
      }
    }

    // Validate each property
    for (const [key, propSchema] of Object.entries(props)) {
      if (key in obj) {
        const propPath = path ? `${path}.${key}` : key;
        errors.push(...validateObjectAgainstSchema((obj as Record<string, unknown>)[key], propSchema, propPath, strict));
      }
    }

    // Check for extra properties in strict mode
    if (strict) {
      for (const key of Object.keys(obj)) {
        if (!(key in props)) {
          errors.push(`${path ? path + '.' : ''}${key}: unexpected property`);
        }
      }
    }
  }

  if (schema.items && Array.isArray(obj)) {
    const itemSchema = schema.items as Record<string, unknown>;
    obj.forEach((item, index) => {
      errors.push(...validateObjectAgainstSchema(item, itemSchema, `${path}[${index}]`, strict));
    });
  }

  if (schema.enum && !((schema.enum as unknown[]).includes(obj))) {
    errors.push(`${path || 'root'}: value must be one of ${(schema.enum as unknown[]).join(', ')}`);
  }

  if (schema.minLength && typeof obj === 'string' && obj.length < (schema.minLength as number)) {
    errors.push(`${path || 'root'}: string too short (min ${schema.minLength})`);
  }

  if (schema.maxLength && typeof obj === 'string' && obj.length > (schema.maxLength as number)) {
    errors.push(`${path || 'root'}: string too long (max ${schema.maxLength})`);
  }

  return errors;
}

function validateRegex(
  response: string,
  config: ValidatorConfig
): { passed: boolean; details?: string } {
  const { pattern, flags = '', matchAll } = config as RegexConfig;

  try {
    const regex = new RegExp(pattern, flags);
    const matches = matchAll ? [...response.matchAll(new RegExp(pattern, flags + 'g'))] : regex.test(response);

    if (matchAll) {
      return {
        passed: (matches as RegExpMatchArray[]).length > 0,
        details: `Found ${(matches as RegExpMatchArray[]).length} matches`,
      };
    }

    return { passed: matches as boolean };
  } catch (e) {
    return { passed: false, details: `Invalid regex: ${(e as Error).message}` };
  }
}

function validateLength(
  response: string,
  config: ValidatorConfig
): { passed: boolean; details?: string } {
  const { min, max, unit } = config as LengthConfig;

  let count: number;
  switch (unit) {
    case 'characters':
      count = response.length;
      break;
    case 'words':
      count = response.split(/\s+/).filter(Boolean).length;
      break;
    case 'lines':
      count = response.split('\n').length;
      break;
    case 'tokens':
      count = Math.ceil(response.split(/\s+/).length * 1.3);
      break;
  }

  const details = `${count} ${unit}`;

  if (min !== undefined && count < min) {
    return { passed: false, details: `${details} (min: ${min})` };
  }

  if (max !== undefined && count > max) {
    return { passed: false, details: `${details} (max: ${max})` };
  }

  return { passed: true, details };
}

function validateContains(
  response: string,
  config: ValidatorConfig
): { passed: boolean; details?: string } {
  const { values, mode, caseSensitive } = config as ContainsConfig;
  const text = caseSensitive ? response : response.toLowerCase();
  const searchValues = caseSensitive ? values : values.map((v) => v.toLowerCase());

  const found = searchValues.filter((v) => text.includes(v));
  const missing = searchValues.filter((v) => !text.includes(v));

  switch (mode) {
    case 'all':
      return {
        passed: missing.length === 0,
        details: missing.length > 0 ? `Missing: ${missing.join(', ')}` : undefined,
      };
    case 'any':
      return {
        passed: found.length > 0,
        details: found.length === 0 ? 'None of the values found' : `Found: ${found.join(', ')}`,
      };
    case 'none':
      return {
        passed: found.length === 0,
        details: found.length > 0 ? `Found unwanted: ${found.join(', ')}` : undefined,
      };
  }
}

function validateNotContains(
  response: string,
  config: ValidatorConfig
): { passed: boolean; details?: string } {
  return validateContains(response, { ...config, mode: 'none' } as ContainsConfig);
}

function validateStartsWith(
  response: string,
  config: ValidatorConfig
): { passed: boolean; details?: string } {
  const { value, caseSensitive } = config as StartsWithConfig;
  const text = caseSensitive ? response : response.toLowerCase();
  const search = caseSensitive ? value : value.toLowerCase();

  return {
    passed: text.trimStart().startsWith(search),
    details: !text.trimStart().startsWith(search) ? `Does not start with "${value}"` : undefined,
  };
}

function validateEndsWith(
  response: string,
  config: ValidatorConfig
): { passed: boolean; details?: string } {
  const { value, caseSensitive } = config as StartsWithConfig;
  const text = caseSensitive ? response : response.toLowerCase();
  const search = caseSensitive ? value : value.toLowerCase();

  return {
    passed: text.trimEnd().endsWith(search),
    details: !text.trimEnd().endsWith(search) ? `Does not end with "${value}"` : undefined,
  };
}

function validateCustom(
  response: string,
  config: ValidatorConfig
): { passed: boolean; details?: string } {
  const { function: funcName, params } = config as CustomConfig;

  // Look up registered custom validators
  const validator = customValidators.get(funcName);
  if (!validator) {
    return { passed: false, details: `Unknown custom validator: ${funcName}` };
  }

  try {
    return validator(response, params || {});
  } catch (e) {
    return { passed: false, details: `Validator error: ${(e as Error).message}` };
  }
}

function validateSentiment(
  response: string,
  config: ValidatorConfig
): { passed: boolean; details?: string } {
  const { expected } = config as SentimentConfig;

  // Simple keyword-based sentiment analysis
  const positiveWords = ['good', 'great', 'excellent', 'happy', 'positive', 'wonderful', 'amazing'];
  const negativeWords = ['bad', 'terrible', 'awful', 'sad', 'negative', 'horrible', 'poor'];

  const text = response.toLowerCase();
  const positiveCount = positiveWords.filter((w) => text.includes(w)).length;
  const negativeCount = negativeWords.filter((w) => text.includes(w)).length;

  let detected: 'positive' | 'negative' | 'neutral' = 'neutral';
  if (positiveCount > negativeCount + 1) detected = 'positive';
  else if (negativeCount > positiveCount + 1) detected = 'negative';

  return {
    passed: detected === expected,
    details: `Detected: ${detected}, Expected: ${expected}`,
  };
}

function validateLanguage(
  response: string,
  config: ValidatorConfig
): { passed: boolean; details?: string } {
  const { expected } = config as LanguageConfig;

  // Simple language detection based on character patterns
  const detected = detectLanguage(response);

  return {
    passed: expected.includes(detected),
    details: `Detected: ${detected}`,
  };
}

function detectLanguage(text: string): string {
  // Very basic language detection
  if (/[\u4e00-\u9fff]/.test(text)) return 'zh';
  if (/[\u3040-\u309f\u30a0-\u30ff]/.test(text)) return 'ja';
  if (/[\uac00-\ud7af]/.test(text)) return 'ko';
  if (/[\u0600-\u06ff]/.test(text)) return 'ar';
  if (/[\u0400-\u04ff]/.test(text)) return 'ru';
  return 'en'; // Default to English
}

function validateFormat(
  response: string,
  config: ValidatorConfig
): { passed: boolean; details?: string } {
  const { format } = config as FormatConfig;

  switch (format) {
    case 'json':
      try {
        JSON.parse(response);
        return { passed: true };
      } catch {
        return { passed: false, details: 'Invalid JSON format' };
      }
    case 'markdown':
      // Check for markdown elements
      const hasMarkdown = /^#+\s|^\*\s|^\d+\.\s|```|\*\*|__/.test(response);
      return { passed: hasMarkdown, details: hasMarkdown ? undefined : 'No markdown elements detected' };
    case 'html':
      const hasHtml = /<[a-z]+[^>]*>/i.test(response);
      return { passed: hasHtml, details: hasHtml ? undefined : 'No HTML elements detected' };
    case 'xml':
      const hasXml = /<\?xml|<[a-z]+[^>]*>/i.test(response);
      return { passed: hasXml, details: hasXml ? undefined : 'No XML elements detected' };
    case 'yaml':
      const hasYaml = /^[\w-]+:\s/m.test(response);
      return { passed: hasYaml, details: hasYaml ? undefined : 'No YAML structure detected' };
    case 'csv':
      const hasCsv = response.split('\n').every((line) => line.includes(',') || line.trim() === '');
      return { passed: hasCsv, details: hasCsv ? undefined : 'Invalid CSV format' };
    default:
      return { passed: false, details: `Unknown format: ${format}` };
  }
}

// ============================================
// Custom Validator Registry
// ============================================

type CustomValidatorFn = (response: string, params: Record<string, unknown>) => { passed: boolean; details?: string };

const customValidators = new Map<string, CustomValidatorFn>();

/**
 * Register a custom validator function
 */
export function registerCustomValidator(name: string, fn: CustomValidatorFn): void {
  customValidators.set(name, fn);
}

/**
 * Unregister a custom validator
 */
export function unregisterCustomValidator(name: string): void {
  customValidators.delete(name);
}

// Register built-in custom validators
registerCustomValidator('is_code', (response, params) => {
  const language = params.language as string | undefined;
  const codePatterns: Record<string, RegExp> = {
    javascript: /function\s+\w+|const\s+\w+|let\s+\w+|=>/,
    python: /def\s+\w+|import\s+\w+|class\s+\w+/,
    typescript: /interface\s+\w+|type\s+\w+|:\s+\w+/,
    sql: /SELECT|INSERT|UPDATE|DELETE|CREATE|FROM/i,
  };

  if (language && codePatterns[language]) {
    return {
      passed: codePatterns[language].test(response),
      details: `Checking for ${language} code patterns`,
    };
  }

  // Check for any code-like patterns
  const isCode = Object.values(codePatterns).some((p) => p.test(response));
  return { passed: isCode, details: isCode ? 'Code detected' : 'No code patterns found' };
});

registerCustomValidator('word_count_range', (response, params) => {
  const min = params.min as number | undefined;
  const max = params.max as number | undefined;
  const count = response.split(/\s+/).filter(Boolean).length;

  if (min !== undefined && count < min) {
    return { passed: false, details: `Word count ${count} below minimum ${min}` };
  }
  if (max !== undefined && count > max) {
    return { passed: false, details: `Word count ${count} above maximum ${max}` };
  }
  return { passed: true, details: `Word count: ${count}` };
});

// ============================================
// Main Validation Function
// ============================================

/**
 * Validate a response against a set of rules
 */
export function validateResponse(response: string, rules: ValidationRule[]): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];
  const info: ValidationError[] = [];

  let passedCount = 0;

  for (const rule of rules) {
    const validator = validators[rule.type];
    if (!validator) {
      warnings.push({
        ruleId: rule.id,
        ruleName: rule.name,
        message: `Unknown validator type: ${rule.type}`,
      });
      continue;
    }

    const result = validator(response, rule.config);

    if (result.passed) {
      passedCount++;
    } else {
      const error: ValidationError = {
        ruleId: rule.id,
        ruleName: rule.name,
        message: rule.errorMessage,
        details: result.details,
      };

      switch (rule.severity) {
        case 'error':
          errors.push(error);
          break;
        case 'warning':
          warnings.push(error);
          break;
        case 'info':
          info.push(error);
          break;
      }
    }
  }

  const score = rules.length > 0 ? Math.round((passedCount / rules.length) * 100) : 100;

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    info,
    score,
  };
}

// ============================================
// Pre-built Validation Rule Sets
// ============================================

export const VALIDATION_PRESETS: Record<string, ValidationRule[]> = {
  json: [
    {
      id: 'json-valid',
      name: 'Valid JSON',
      type: 'format',
      config: { format: 'json' },
      errorMessage: 'Response is not valid JSON',
      severity: 'error',
    },
  ],

  markdown: [
    {
      id: 'md-format',
      name: 'Markdown Format',
      type: 'format',
      config: { format: 'markdown' },
      errorMessage: 'Response should be formatted as markdown',
      severity: 'warning',
    },
  ],

  concise: [
    {
      id: 'word-limit',
      name: 'Word Limit',
      type: 'length',
      config: { max: 500, unit: 'words' },
      errorMessage: 'Response exceeds 500 words',
      severity: 'warning',
    },
  ],

  detailed: [
    {
      id: 'min-words',
      name: 'Minimum Words',
      type: 'length',
      config: { min: 200, unit: 'words' },
      errorMessage: 'Response should be at least 200 words',
      severity: 'warning',
    },
  ],

  professional: [
    {
      id: 'no-casual',
      name: 'No Casual Language',
      type: 'not_contains',
      config: { values: ['lol', 'omg', 'btw', 'gonna', 'wanna'], mode: 'none', caseSensitive: false },
      errorMessage: 'Response contains casual language',
      severity: 'warning',
    },
    {
      id: 'positive-sentiment',
      name: 'Professional Tone',
      type: 'not_contains',
      config: { values: ['hate', 'stupid', 'dumb', 'idiot'], mode: 'none', caseSensitive: false },
      errorMessage: 'Response contains unprofessional language',
      severity: 'error',
    },
  ],
};

/**
 * Create a custom validation rule
 */
export function createRule(
  name: string,
  type: ValidatorType,
  config: ValidatorConfig,
  options: {
    errorMessage?: string;
    severity?: 'error' | 'warning' | 'info';
  } = {}
): ValidationRule {
  return {
    id: `rule_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    name,
    type,
    config,
    errorMessage: options.errorMessage || `Validation failed: ${name}`,
    severity: options.severity || 'error',
  };
}
