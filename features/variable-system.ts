// variable-system.ts - Template variable detection and management
// Supports {{variable}}, {{variable:default}}, and {{variable|type}}

export interface TemplateVariable {
  name: string;
  defaultValue?: string;
  type?: 'string' | 'number' | 'boolean' | 'array' | 'json';
  description?: string;
  required: boolean;
  position: { start: number; end: number };
}

export interface VariableValues {
  [key: string]: string | number | boolean | unknown[];
}

// ============================================
// Variable Detection
// ============================================

const VARIABLE_REGEX = /\{\{([^}]+)\}\}/g;
const VARIABLE_PARTS_REGEX = /^([a-zA-Z_][a-zA-Z0-9_]*)(?::([^|]*))?(?:\|(\w+))?$/;

/**
 * Extract all variables from a template string
 */
export function extractVariables(template: string): TemplateVariable[] {
  const variables: TemplateVariable[] = [];
  const seen = new Set<string>();
  let match;

  while ((match = VARIABLE_REGEX.exec(template)) !== null) {
    const fullMatch = match[0];
    const inner = match[1].trim();
    const partsMatch = inner.match(VARIABLE_PARTS_REGEX);

    if (partsMatch) {
      const name = partsMatch[1];
      const defaultValue = partsMatch[2];
      const type = partsMatch[3] as TemplateVariable['type'];

      if (!seen.has(name)) {
        seen.add(name);
        variables.push({
          name,
          defaultValue,
          type: type || 'string',
          required: defaultValue === undefined,
          position: {
            start: match.index,
            end: match.index + fullMatch.length,
          },
        });
      }
    }
  }

  return variables;
}

/**
 * Check if a string contains template variables
 */
export function hasVariables(template: string): boolean {
  return VARIABLE_REGEX.test(template);
}

/**
 * Count variables in a template
 */
export function countVariables(template: string): number {
  const matches = template.match(VARIABLE_REGEX);
  return matches ? new Set(matches.map(m => m.slice(2, -2).split(':')[0].split('|')[0].trim())).size : 0;
}

// ============================================
// Variable Substitution
// ============================================

/**
 * Replace variables in template with provided values
 */
export function substituteVariables(
  template: string,
  values: VariableValues,
  options: {
    strict?: boolean; // Throw on missing required variables
    preserveUnknown?: boolean; // Keep {{var}} if not in values
  } = {}
): string {
  const { strict = false, preserveUnknown = false } = options;
  const variables = extractVariables(template);
  const missingRequired: string[] = [];

  let result = template;

  // Sort by position descending to avoid offset issues
  const sortedVars = [...variables].sort((a, b) => b.position.start - a.position.start);

  for (const variable of sortedVars) {
    const { name, defaultValue, type, required } = variable;
    let value = values[name];

    // Use default if no value provided
    if (value === undefined) {
      if (defaultValue !== undefined) {
        value = defaultValue;
      } else if (required) {
        missingRequired.push(name);
        if (!preserveUnknown) continue;
      } else if (preserveUnknown) {
        continue;
      }
    }

    // Type coercion
    const stringValue = coerceToString(value, type);

    // Replace all occurrences of this variable
    const pattern = new RegExp(`\\{\\{${name}(?::[^|]*)?(?:\\|\\w+)?\\}\\}`, 'g');
    result = result.replace(pattern, stringValue);
  }

  if (strict && missingRequired.length > 0) {
    throw new Error(`Missing required variables: ${missingRequired.join(', ')}`);
  }

  return result;
}

/**
 * Coerce value to string based on type hint
 */
function coerceToString(value: unknown, type?: string): string {
  if (value === undefined || value === null) return '';

  switch (type) {
    case 'json':
      return typeof value === 'string' ? value : JSON.stringify(value, null, 2);
    case 'array':
      return Array.isArray(value) ? value.join(', ') : String(value);
    case 'number':
      return String(Number(value));
    case 'boolean':
      return value ? 'true' : 'false';
    default:
      return String(value);
  }
}

// ============================================
// Batch Processing
// ============================================

export interface BatchInput {
  id: string;
  values: VariableValues;
}

export interface BatchResult {
  id: string;
  input: VariableValues;
  renderedPrompt: string;
  success: boolean;
  error?: string;
}

/**
 * Process template with multiple input sets
 */
export function batchSubstitute(
  template: string,
  inputs: BatchInput[]
): BatchResult[] {
  return inputs.map((input) => {
    try {
      const renderedPrompt = substituteVariables(template, input.values, { strict: true });
      return {
        id: input.id,
        input: input.values,
        renderedPrompt,
        success: true,
      };
    } catch (error) {
      return {
        id: input.id,
        input: input.values,
        renderedPrompt: '',
        success: false,
        error: (error as Error).message,
      };
    }
  });
}

/**
 * Parse CSV data into batch inputs
 */
export function parseCsvToBatchInputs(
  csvContent: string,
  delimiter: string = ','
): BatchInput[] {
  const lines = csvContent.trim().split('\n');
  if (lines.length < 2) return [];

  const headers = lines[0].split(delimiter).map((h) => h.trim());
  const inputs: BatchInput[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(delimiter);
    const input: VariableValues = {};

    headers.forEach((header, index) => {
      input[header] = values[index]?.trim() || '';
    });

    inputs.push({
      id: `row-${i}`,
      values: input,
    });
  }

  return inputs;
}

// ============================================
// Variable Form Generation
// ============================================

export interface VariableFormField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'checkbox' | 'textarea' | 'select';
  placeholder?: string;
  defaultValue?: string;
  required: boolean;
  options?: string[]; // For select type
}

/**
 * Generate form fields from extracted variables
 */
export function generateFormFields(variables: TemplateVariable[]): VariableFormField[] {
  return variables.map((v) => {
    const label = v.name
      .replace(/_/g, ' ')
      .replace(/([A-Z])/g, ' $1')
      .trim()
      .split(' ')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(' ');

    let fieldType: VariableFormField['type'] = 'text';
    if (v.type === 'number') fieldType = 'number';
    if (v.type === 'boolean') fieldType = 'checkbox';
    if (v.type === 'json' || v.type === 'array') fieldType = 'textarea';

    return {
      name: v.name,
      label,
      type: fieldType,
      placeholder: v.description || `Enter ${label.toLowerCase()}`,
      defaultValue: v.defaultValue,
      required: v.required,
    };
  });
}

// ============================================
// Template Validation
// ============================================

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Validate template syntax
 */
export function validateTemplate(template: string): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check for unbalanced braces
  const openCount = (template.match(/\{\{/g) || []).length;
  const closeCount = (template.match(/\}\}/g) || []).length;

  if (openCount !== closeCount) {
    errors.push(`Unbalanced braces: ${openCount} opening, ${closeCount} closing`);
  }

  // Check for invalid variable names
  const variables = extractVariables(template);
  for (const v of variables) {
    if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(v.name)) {
      errors.push(`Invalid variable name: "${v.name}"`);
    }
    if (v.type && !['string', 'number', 'boolean', 'array', 'json'].includes(v.type)) {
      errors.push(`Invalid type "${v.type}" for variable "${v.name}"`);
    }
  }

  // Check for duplicate variables with different defaults
  const varDefaults = new Map<string, string>();
  for (const v of variables) {
    if (varDefaults.has(v.name) && varDefaults.get(v.name) !== v.defaultValue) {
      warnings.push(`Variable "${v.name}" has inconsistent default values`);
    }
    varDefaults.set(v.name, v.defaultValue || '');
  }

  // Check for empty variable names
  if (template.includes('{{}}')) {
    errors.push('Empty variable name found: {{}}');
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

// ============================================
// Export Functions
// ============================================

export function exportToPython(template: string, variables: TemplateVariable[]): string {
  const varList = variables.map((v) => v.name).join(', ');
  const escaped = template.replace(/"/g, '\\"').replace(/\n/g, '\\n');

  return `# Generated by PromptForge
from string import Template
import re

def render_prompt(${varList}):
    template = "${escaped}"

    # Replace variables
    ${variables.map((v) => `template = template.replace("{{${v.name}}}", str(${v.name}))`).join('\n    ')}

    return template

# Example usage:
# result = render_prompt(${variables.map((v) => `${v.name}="${v.defaultValue || 'value'}"`).join(', ')})
`;
}

export function exportToJavaScript(template: string, variables: TemplateVariable[]): string {
  const varList = variables.map((v) => v.name).join(', ');
  const escaped = template.replace(/`/g, '\\`').replace(/\$/g, '\\$');

  return `// Generated by PromptForge

function renderPrompt({ ${varList} }) {
  let template = \`${escaped}\`;

  ${variables.map((v) => `template = template.replace(/\\{\\{${v.name}(?::[^|]*)?(?:\\|\\w+)?\\}\\}/g, String(${v.name}));`).join('\n  ')}

  return template;
}

// Example usage:
// const result = renderPrompt({ ${variables.map((v) => `${v.name}: "${v.defaultValue || 'value'}"`).join(', ')} });

export { renderPrompt };
`;
}

export function exportToTypeScript(template: string, variables: TemplateVariable[]): string {
  const interfaceFields = variables
    .map((v) => {
      const tsType = v.type === 'number' ? 'number' : v.type === 'boolean' ? 'boolean' : 'string';
      return `  ${v.name}${v.required ? '' : '?'}: ${tsType};`;
    })
    .join('\n');

  const escaped = template.replace(/`/g, '\\`').replace(/\$/g, '\\$');

  return `// Generated by PromptForge

interface PromptVariables {
${interfaceFields}
}

function renderPrompt(variables: PromptVariables): string {
  let template = \`${escaped}\`;

  ${variables.map((v) => `template = template.replace(/\\{\\{${v.name}(?::[^|]*)?(?:\\|\\w+)?\\}\\}/g, String(variables.${v.name}${v.required ? '' : ` ?? "${v.defaultValue || ''}"`}));`).join('\n  ')}

  return template;
}

export { renderPrompt, type PromptVariables };
`;
}
