// sdk.ts - SDK generation and API client
// Export prompts to usable code, generate API clients

// ============================================
// Types
// ============================================

export interface SDKConfig {
  apiKey: string;
  baseUrl?: string;
  timeout?: number;
  retries?: number;
}

export interface ExecuteOptions {
  variables?: Record<string, string>;
  model?: string;
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
}

export interface ExecuteResult {
  id: string;
  response: string;
  usage: {
    inputTokens: number;
    outputTokens: number;
    totalTokens: number;
  };
  cost: number;
  latencyMs: number;
  model: string;
}

export interface StreamChunk {
  type: 'content' | 'done' | 'error';
  content?: string;
  usage?: ExecuteResult['usage'];
  error?: string;
}

// ============================================
// TypeScript SDK
// ============================================

export const TYPESCRIPT_SDK = `
// PromptForge TypeScript SDK
// npm install @promptforge/sdk

import type { ExecuteOptions, ExecuteResult, StreamChunk } from '@promptforge/sdk';

export class PromptForge {
  private apiKey: string;
  private baseUrl: string;
  private timeout: number;

  constructor(config: {
    apiKey: string;
    baseUrl?: string;
    timeout?: number;
  }) {
    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl || 'https://api.promptforge.dev';
    this.timeout = config.timeout || 30000;
  }

  /**
   * Execute a prompt by ID
   */
  async execute(
    promptId: string,
    options: ExecuteOptions = {}
  ): Promise<ExecuteResult> {
    const response = await this.request('/v1/prompts/execute', {
      method: 'POST',
      body: JSON.stringify({
        promptId,
        ...options,
      }),
    });

    return response.json();
  }

  /**
   * Execute a prompt with streaming
   */
  async *stream(
    promptId: string,
    options: ExecuteOptions = {}
  ): AsyncGenerator<StreamChunk> {
    const response = await this.request('/v1/prompts/stream', {
      method: 'POST',
      body: JSON.stringify({
        promptId,
        ...options,
      }),
    });

    const reader = response.body?.getReader();
    if (!reader) throw new Error('Streaming not supported');

    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const text = decoder.decode(value);
      const lines = text.split('\\n').filter(Boolean);

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = JSON.parse(line.slice(6));
          yield data as StreamChunk;
        }
      }
    }
  }

  /**
   * Get prompt details
   */
  async getPrompt(promptId: string): Promise<{
    id: string;
    name: string;
    description: string;
    variables: string[];
    version: string;
  }> {
    const response = await this.request(\`/v1/prompts/\${promptId}\`);
    return response.json();
  }

  /**
   * List available prompts
   */
  async listPrompts(options?: {
    category?: string;
    limit?: number;
    offset?: number;
  }): Promise<{
    prompts: Array<{
      id: string;
      name: string;
      description: string;
      category: string;
    }>;
    total: number;
  }> {
    const params = new URLSearchParams();
    if (options?.category) params.set('category', options.category);
    if (options?.limit) params.set('limit', String(options.limit));
    if (options?.offset) params.set('offset', String(options.offset));

    const response = await this.request(\`/v1/prompts?\${params}\`);
    return response.json();
  }

  /**
   * Create a new prompt execution batch
   */
  async batch(
    promptId: string,
    inputs: Array<Record<string, string>>,
    options?: Omit<ExecuteOptions, 'variables'>
  ): Promise<{
    batchId: string;
    status: 'pending' | 'processing' | 'completed';
    totalItems: number;
  }> {
    const response = await this.request('/v1/batches', {
      method: 'POST',
      body: JSON.stringify({
        promptId,
        inputs,
        ...options,
      }),
    });

    return response.json();
  }

  /**
   * Get batch status and results
   */
  async getBatch(batchId: string): Promise<{
    id: string;
    status: 'pending' | 'processing' | 'completed' | 'failed';
    results?: ExecuteResult[];
    error?: string;
  }> {
    const response = await this.request(\`/v1/batches/\${batchId}\`);
    return response.json();
  }

  private async request(path: string, options: RequestInit = {}): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(\`\${this.baseUrl}\${path}\`, {
        ...options,
        headers: {
          'Authorization': \`Bearer \${this.apiKey}\`,
          'Content-Type': 'application/json',
          ...options.headers,
        },
        signal: controller.signal,
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Unknown error' }));
        throw new Error(error.message || \`HTTP \${response.status}\`);
      }

      return response;
    } finally {
      clearTimeout(timeoutId);
    }
  }
}

// Usage example:
// const pf = new PromptForge({ apiKey: 'your-api-key' });
// const result = await pf.execute('prompt_123', { variables: { name: 'World' } });
`;

// ============================================
// Python SDK
// ============================================

export const PYTHON_SDK = `
# PromptForge Python SDK
# pip install promptforge

from typing import Optional, Dict, List, Iterator, Any
import httpx
from dataclasses import dataclass
from enum import Enum


@dataclass
class ExecuteResult:
    id: str
    response: str
    input_tokens: int
    output_tokens: int
    total_tokens: int
    cost: float
    latency_ms: int
    model: str


@dataclass
class StreamChunk:
    type: str  # 'content' | 'done' | 'error'
    content: Optional[str] = None
    error: Optional[str] = None


class PromptForge:
    def __init__(
        self,
        api_key: str,
        base_url: str = "https://api.promptforge.dev",
        timeout: int = 30,
    ):
        self.api_key = api_key
        self.base_url = base_url
        self.timeout = timeout
        self._client = httpx.Client(
            base_url=base_url,
            timeout=timeout,
            headers={"Authorization": f"Bearer {api_key}"},
        )

    def execute(
        self,
        prompt_id: str,
        variables: Optional[Dict[str, str]] = None,
        model: Optional[str] = None,
        temperature: Optional[float] = None,
        max_tokens: Optional[int] = None,
    ) -> ExecuteResult:
        """Execute a prompt by ID."""
        payload = {"promptId": prompt_id}
        if variables:
            payload["variables"] = variables
        if model:
            payload["model"] = model
        if temperature is not None:
            payload["temperature"] = temperature
        if max_tokens:
            payload["maxTokens"] = max_tokens

        response = self._client.post("/v1/prompts/execute", json=payload)
        response.raise_for_status()
        data = response.json()

        return ExecuteResult(
            id=data["id"],
            response=data["response"],
            input_tokens=data["usage"]["inputTokens"],
            output_tokens=data["usage"]["outputTokens"],
            total_tokens=data["usage"]["totalTokens"],
            cost=data["cost"],
            latency_ms=data["latencyMs"],
            model=data["model"],
        )

    def stream(
        self,
        prompt_id: str,
        variables: Optional[Dict[str, str]] = None,
        **kwargs,
    ) -> Iterator[StreamChunk]:
        """Execute a prompt with streaming."""
        payload = {"promptId": prompt_id, **kwargs}
        if variables:
            payload["variables"] = variables

        with self._client.stream("POST", "/v1/prompts/stream", json=payload) as response:
            response.raise_for_status()
            for line in response.iter_lines():
                if line.startswith("data: "):
                    import json
                    data = json.loads(line[6:])
                    yield StreamChunk(
                        type=data.get("type", "content"),
                        content=data.get("content"),
                        error=data.get("error"),
                    )

    def get_prompt(self, prompt_id: str) -> Dict[str, Any]:
        """Get prompt details."""
        response = self._client.get(f"/v1/prompts/{prompt_id}")
        response.raise_for_status()
        return response.json()

    def list_prompts(
        self,
        category: Optional[str] = None,
        limit: int = 20,
        offset: int = 0,
    ) -> Dict[str, Any]:
        """List available prompts."""
        params = {"limit": limit, "offset": offset}
        if category:
            params["category"] = category

        response = self._client.get("/v1/prompts", params=params)
        response.raise_for_status()
        return response.json()

    def batch(
        self,
        prompt_id: str,
        inputs: List[Dict[str, str]],
        **kwargs,
    ) -> Dict[str, Any]:
        """Create a batch execution."""
        payload = {"promptId": prompt_id, "inputs": inputs, **kwargs}
        response = self._client.post("/v1/batches", json=payload)
        response.raise_for_status()
        return response.json()

    def get_batch(self, batch_id: str) -> Dict[str, Any]:
        """Get batch status and results."""
        response = self._client.get(f"/v1/batches/{batch_id}")
        response.raise_for_status()
        return response.json()

    def close(self):
        """Close the HTTP client."""
        self._client.close()

    def __enter__(self):
        return self

    def __exit__(self, *args):
        self.close()


# Usage example:
# pf = PromptForge(api_key="your-api-key")
# result = pf.execute("prompt_123", variables={"name": "World"})
# print(result.response)
`;

// ============================================
// Code Export
// ============================================

export interface ExportOptions {
  language: 'typescript' | 'python' | 'javascript' | 'curl';
  includeTypes?: boolean;
  inline?: boolean;
}

export interface PromptForExport {
  id: string;
  name: string;
  systemPrompt: string;
  userPrompt: string;
  variables: string[];
  model: string;
  temperature?: number;
  maxTokens?: number;
}

/**
 * Export prompt to executable code
 */
export function exportPrompt(prompt: PromptForExport, options: ExportOptions): string {
  switch (options.language) {
    case 'typescript':
      return exportTypeScript(prompt, options);
    case 'python':
      return exportPython(prompt, options);
    case 'javascript':
      return exportJavaScript(prompt, options);
    case 'curl':
      return exportCurl(prompt);
    default:
      throw new Error(`Unsupported language: ${options.language}`);
  }
}

function exportTypeScript(prompt: PromptForExport, options: ExportOptions): string {
  const varTypes = prompt.variables.map((v) => `${v}: string`).join('; ');
  const varParams = prompt.variables.length > 0 ? `variables: { ${varTypes} }` : '';

  if (options.inline) {
    return `
// ${prompt.name}
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

${options.includeTypes ? `interface Variables {\n${prompt.variables.map((v) => `  ${v}: string;`).join('\n')}\n}\n` : ''}
async function ${toCamelCase(prompt.name)}(${varParams}) {
  const systemPrompt = \`${escapeTemplate(prompt.systemPrompt)}\`;
  const userPrompt = \`${escapeTemplate(prompt.userPrompt)}\`;

  const response = await client.messages.create({
    model: '${prompt.model}',
    max_tokens: ${prompt.maxTokens || 4096},
    ${prompt.temperature ? `temperature: ${prompt.temperature},` : ''}
    system: systemPrompt,
    messages: [{ role: 'user', content: userPrompt }],
  });

  return response.content[0].type === 'text' ? response.content[0].text : '';
}

// Usage:
// const result = await ${toCamelCase(prompt.name)}(${prompt.variables.length > 0 ? '{ ' + prompt.variables.map((v) => `${v}: 'value'`).join(', ') + ' }' : ''});
`;
  }

  return `
// ${prompt.name}
import { PromptForge } from '@promptforge/sdk';

const pf = new PromptForge({ apiKey: process.env.PROMPTFORGE_API_KEY! });

async function ${toCamelCase(prompt.name)}(${varParams}) {
  const result = await pf.execute('${prompt.id}', {
    ${prompt.variables.length > 0 ? 'variables,' : ''}
    ${prompt.model ? `model: '${prompt.model}',` : ''}
    ${prompt.temperature ? `temperature: ${prompt.temperature},` : ''}
    ${prompt.maxTokens ? `maxTokens: ${prompt.maxTokens},` : ''}
  });

  return result.response;
}
`;
}

function exportPython(prompt: PromptForExport, options: ExportOptions): string {
  const varParams = prompt.variables.map((v) => `${v}: str`).join(', ');

  if (options.inline) {
    return `
# ${prompt.name}
import anthropic

client = anthropic.Anthropic()

def ${toSnakeCase(prompt.name)}(${varParams}):
    system_prompt = f"""${prompt.systemPrompt}"""
    user_prompt = f"""${prompt.userPrompt}"""

    response = client.messages.create(
        model="${prompt.model}",
        max_tokens=${prompt.maxTokens || 4096},
        ${prompt.temperature ? `temperature=${prompt.temperature},` : ''}
        system=system_prompt,
        messages=[{"role": "user", "content": user_prompt}],
    )

    return response.content[0].text if response.content else ""


# Usage:
# result = ${toSnakeCase(prompt.name)}(${prompt.variables.map((v) => `${v}="value"`).join(', ')})
`;
  }

  return `
# ${prompt.name}
from promptforge import PromptForge
import os

pf = PromptForge(api_key=os.environ["PROMPTFORGE_API_KEY"])

def ${toSnakeCase(prompt.name)}(${varParams}):
    result = pf.execute(
        "${prompt.id}",
        ${prompt.variables.length > 0 ? `variables={${prompt.variables.map((v) => `"${v}": ${v}`).join(', ')}},` : ''}
    )
    return result.response


# Usage:
# result = ${toSnakeCase(prompt.name)}(${prompt.variables.map((v) => `${v}="value"`).join(', ')})
`;
}

function exportJavaScript(prompt: PromptForExport, options: ExportOptions): string {
  const ts = exportTypeScript(prompt, options);
  // Remove TypeScript-specific syntax
  return ts
    .replace(/: string/g, '')
    .replace(/: \{[^}]+\}/g, '')
    .replace(/interface [^}]+\}/g, '')
    .replace(/!$/gm, '');
}

function exportCurl(prompt: PromptForExport): string {
  const varsJson = prompt.variables.length > 0
    ? `"variables": {${prompt.variables.map((v) => `"${v}": "YOUR_VALUE"`).join(', ')}},`
    : '';

  return `
# ${prompt.name}
curl -X POST https://api.promptforge.dev/v1/prompts/execute \\
  -H "Authorization: Bearer $PROMPTFORGE_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "promptId": "${prompt.id}",
    ${varsJson}
    "model": "${prompt.model}"
  }'
`;
}

// ============================================
// Helpers
// ============================================

function toCamelCase(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
    .replace(/^./, (chr) => chr.toLowerCase());
}

function toSnakeCase(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_|_$/g, '');
}

function escapeTemplate(str: string): string {
  return str.replace(/`/g, '\\`').replace(/\$/g, '\\$');
}

// ============================================
// API Client Generation
// ============================================

export interface APIEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  description: string;
  parameters?: {
    name: string;
    type: string;
    required: boolean;
    description: string;
    location: 'path' | 'query' | 'body';
  }[];
  response?: {
    type: string;
    description: string;
  };
}

export const API_ENDPOINTS: APIEndpoint[] = [
  {
    method: 'POST',
    path: '/v1/prompts/execute',
    description: 'Execute a prompt',
    parameters: [
      { name: 'promptId', type: 'string', required: true, description: 'Prompt ID', location: 'body' },
      { name: 'variables', type: 'object', required: false, description: 'Variable values', location: 'body' },
      { name: 'model', type: 'string', required: false, description: 'Model override', location: 'body' },
      { name: 'temperature', type: 'number', required: false, description: 'Temperature', location: 'body' },
      { name: 'maxTokens', type: 'number', required: false, description: 'Max tokens', location: 'body' },
    ],
    response: { type: 'ExecuteResult', description: 'Execution result with response and usage' },
  },
  {
    method: 'POST',
    path: '/v1/prompts/stream',
    description: 'Execute a prompt with streaming',
    parameters: [
      { name: 'promptId', type: 'string', required: true, description: 'Prompt ID', location: 'body' },
      { name: 'variables', type: 'object', required: false, description: 'Variable values', location: 'body' },
    ],
    response: { type: 'SSE Stream', description: 'Server-sent events stream' },
  },
  {
    method: 'GET',
    path: '/v1/prompts/:id',
    description: 'Get prompt details',
    parameters: [
      { name: 'id', type: 'string', required: true, description: 'Prompt ID', location: 'path' },
    ],
    response: { type: 'Prompt', description: 'Prompt details' },
  },
  {
    method: 'GET',
    path: '/v1/prompts',
    description: 'List prompts',
    parameters: [
      { name: 'category', type: 'string', required: false, description: 'Filter by category', location: 'query' },
      { name: 'limit', type: 'number', required: false, description: 'Results per page', location: 'query' },
      { name: 'offset', type: 'number', required: false, description: 'Pagination offset', location: 'query' },
    ],
    response: { type: 'PromptList', description: 'List of prompts with pagination' },
  },
  {
    method: 'POST',
    path: '/v1/batches',
    description: 'Create batch execution',
    parameters: [
      { name: 'promptId', type: 'string', required: true, description: 'Prompt ID', location: 'body' },
      { name: 'inputs', type: 'array', required: true, description: 'Array of variable objects', location: 'body' },
    ],
    response: { type: 'Batch', description: 'Batch details with ID' },
  },
  {
    method: 'GET',
    path: '/v1/batches/:id',
    description: 'Get batch status and results',
    parameters: [
      { name: 'id', type: 'string', required: true, description: 'Batch ID', location: 'path' },
    ],
    response: { type: 'BatchResult', description: 'Batch status and results' },
  },
];

/**
 * Generate OpenAPI spec from endpoints
 */
export function generateOpenAPISpec(): Record<string, unknown> {
  const paths: Record<string, unknown> = {};

  for (const endpoint of API_ENDPOINTS) {
    const path = endpoint.path.replace(/:(\w+)/g, '{$1}');

    if (!paths[path]) {
      paths[path] = {};
    }

    const pathParams = endpoint.parameters?.filter((p) => p.location === 'path') || [];
    const queryParams = endpoint.parameters?.filter((p) => p.location === 'query') || [];
    const bodyParams = endpoint.parameters?.filter((p) => p.location === 'body') || [];

    (paths[path] as Record<string, unknown>)[endpoint.method.toLowerCase()] = {
      summary: endpoint.description,
      parameters: [
        ...pathParams.map((p) => ({
          name: p.name,
          in: 'path',
          required: p.required,
          schema: { type: p.type },
          description: p.description,
        })),
        ...queryParams.map((p) => ({
          name: p.name,
          in: 'query',
          required: p.required,
          schema: { type: p.type },
          description: p.description,
        })),
      ],
      requestBody: bodyParams.length > 0 ? {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: Object.fromEntries(
                bodyParams.map((p) => [p.name, { type: p.type, description: p.description }])
              ),
              required: bodyParams.filter((p) => p.required).map((p) => p.name),
            },
          },
        },
      } : undefined,
      responses: {
        '200': {
          description: endpoint.response?.description || 'Success',
        },
      },
    };
  }

  return {
    openapi: '3.0.0',
    info: {
      title: 'PromptForge API',
      version: '1.0.0',
      description: 'API for executing and managing AI prompts',
    },
    servers: [{ url: 'https://api.promptforge.dev' }],
    paths,
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  };
}
