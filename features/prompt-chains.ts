// prompt-chains.ts - Prompt workflow chains and orchestration
// Chain multiple prompts together with conditional logic

import { substituteVariables, type VariableValues } from './variable-system';
import type { PromptContent, ExecutionResult } from '@/types/prompt.types';

// ============================================
// Types
// ============================================

export type NodeType = 'prompt' | 'condition' | 'transform' | 'output' | 'input' | 'merge';

export interface ChainNode {
  id: string;
  type: NodeType;
  name: string;
  config: PromptNodeConfig | ConditionNodeConfig | TransformNodeConfig | OutputNodeConfig | InputNodeConfig | MergeNodeConfig;
  position: { x: number; y: number };
}

export interface ChainEdge {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string; // For condition nodes: 'true' | 'false'
  label?: string;
}

export interface PromptChain {
  id: string;
  name: string;
  description: string;
  nodes: ChainNode[];
  edges: ChainEdge[];
  variables: ChainVariable[];
  createdAt: string;
  updatedAt: string;
}

export interface ChainVariable {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'json';
  defaultValue?: string;
  description?: string;
}

// ============================================
// Node Configurations
// ============================================

export interface PromptNodeConfig {
  promptId?: string; // Reference to saved prompt
  promptContent?: PromptContent; // Or inline prompt
  model: string;
  inputMapping: Record<string, string>; // Map chain variables to prompt inputs
  outputVariable: string; // Store result in this variable
}

export interface ConditionNodeConfig {
  expression: string; // JavaScript expression, e.g., "output.includes('error')"
  trueLabel?: string;
  falseLabel?: string;
}

export interface TransformNodeConfig {
  transformType: 'extract_json' | 'regex' | 'split' | 'join' | 'custom';
  inputVariable: string;
  outputVariable: string;
  config: {
    pattern?: string; // For regex
    delimiter?: string; // For split/join
    jsonPath?: string; // For extract_json
    customCode?: string; // For custom
  };
}

export interface OutputNodeConfig {
  outputVariable: string;
  format: 'raw' | 'json' | 'markdown';
}

export interface InputNodeConfig {
  variables: string[]; // Variables this node provides
}

export interface MergeNodeConfig {
  inputVariables: string[];
  outputVariable: string;
  mergeStrategy: 'concat' | 'array' | 'object';
  separator?: string;
}

// ============================================
// Chain Execution
// ============================================

export interface ChainExecutionContext {
  variables: VariableValues;
  results: Map<string, ExecutionResult>;
  logs: ChainLog[];
  startTime: number;
}

export interface ChainLog {
  timestamp: number;
  nodeId: string;
  nodeName: string;
  type: 'start' | 'complete' | 'error' | 'skip';
  message: string;
  data?: unknown;
}

export interface ChainExecutionResult {
  success: boolean;
  output: unknown;
  variables: VariableValues;
  logs: ChainLog[];
  totalDuration: number;
  nodeResults: Map<string, NodeExecutionResult>;
  error?: string;
}

export interface NodeExecutionResult {
  nodeId: string;
  success: boolean;
  output?: unknown;
  duration: number;
  error?: string;
}

export type ExecutePromptFn = (
  content: PromptContent,
  input: VariableValues,
  model: string
) => Promise<ExecutionResult>;

/**
 * Execute a prompt chain
 */
export async function executeChain(
  chain: PromptChain,
  initialVariables: VariableValues,
  executePrompt: ExecutePromptFn,
  options: {
    onNodeStart?: (nodeId: string) => void;
    onNodeComplete?: (nodeId: string, result: NodeExecutionResult) => void;
    onLog?: (log: ChainLog) => void;
    maxIterations?: number;
  } = {}
): Promise<ChainExecutionResult> {
  const { onNodeStart, onNodeComplete, onLog, maxIterations = 100 } = options;

  const context: ChainExecutionContext = {
    variables: { ...initialVariables },
    results: new Map(),
    logs: [],
    startTime: Date.now(),
  };

  const nodeResults = new Map<string, NodeExecutionResult>();

  const log = (nodeId: string, nodeName: string, type: ChainLog['type'], message: string, data?: unknown) => {
    const entry: ChainLog = {
      timestamp: Date.now(),
      nodeId,
      nodeName,
      type,
      message,
      data,
    };
    context.logs.push(entry);
    onLog?.(entry);
  };

  try {
    // Find entry point (input node or nodes with no incoming edges)
    const incomingEdges = new Map<string, string[]>();
    for (const edge of chain.edges) {
      const existing = incomingEdges.get(edge.target) || [];
      existing.push(edge.source);
      incomingEdges.set(edge.target, existing);
    }

    const startNodes = chain.nodes.filter(
      (n) => n.type === 'input' || !incomingEdges.has(n.id)
    );

    if (startNodes.length === 0) {
      throw new Error('No entry point found in chain');
    }

    // Execute nodes in topological order
    const executed = new Set<string>();
    const queue = [...startNodes];
    let iterations = 0;

    while (queue.length > 0 && iterations < maxIterations) {
      iterations++;
      const node = queue.shift()!;

      // Skip if already executed
      if (executed.has(node.id)) continue;

      // Check if all dependencies are satisfied
      const deps = incomingEdges.get(node.id) || [];
      const allDepsExecuted = deps.every((d) => executed.has(d));

      if (!allDepsExecuted) {
        queue.push(node); // Re-queue
        continue;
      }

      // Execute node
      onNodeStart?.(node.id);
      log(node.id, node.name, 'start', `Executing ${node.type} node`);

      const startTime = Date.now();
      let nodeResult: NodeExecutionResult;

      try {
        const output = await executeNode(node, context, executePrompt);
        nodeResult = {
          nodeId: node.id,
          success: true,
          output,
          duration: Date.now() - startTime,
        };
        log(node.id, node.name, 'complete', `Completed in ${nodeResult.duration}ms`, output);
      } catch (error) {
        nodeResult = {
          nodeId: node.id,
          success: false,
          duration: Date.now() - startTime,
          error: (error as Error).message,
        };
        log(node.id, node.name, 'error', (error as Error).message);

        // For non-condition nodes, fail the chain
        if (node.type !== 'condition') {
          throw error;
        }
      }

      nodeResults.set(node.id, nodeResult);
      onNodeComplete?.(node.id, nodeResult);
      executed.add(node.id);

      // Find next nodes
      const outgoingEdges = chain.edges.filter((e) => e.source === node.id);

      // Handle condition node branching
      if (node.type === 'condition') {
        const conditionResult = nodeResult.output as boolean;
        const nextEdge = outgoingEdges.find(
          (e) => e.sourceHandle === (conditionResult ? 'true' : 'false')
        );
        if (nextEdge) {
          const nextNode = chain.nodes.find((n) => n.id === nextEdge.target);
          if (nextNode) queue.push(nextNode);
        }
      } else {
        // Add all connected nodes to queue
        for (const edge of outgoingEdges) {
          const nextNode = chain.nodes.find((n) => n.id === edge.target);
          if (nextNode && !executed.has(nextNode.id)) {
            queue.push(nextNode);
          }
        }
      }
    }

    if (iterations >= maxIterations) {
      throw new Error('Chain execution exceeded maximum iterations (possible cycle)');
    }

    // Find output node result
    const outputNode = chain.nodes.find((n) => n.type === 'output');
    const output = outputNode
      ? context.variables[(outputNode.config as OutputNodeConfig).outputVariable]
      : context.variables;

    return {
      success: true,
      output,
      variables: context.variables,
      logs: context.logs,
      totalDuration: Date.now() - context.startTime,
      nodeResults,
    };
  } catch (error) {
    return {
      success: false,
      output: null,
      variables: context.variables,
      logs: context.logs,
      totalDuration: Date.now() - context.startTime,
      nodeResults,
      error: (error as Error).message,
    };
  }
}

/**
 * Execute a single node
 */
async function executeNode(
  node: ChainNode,
  context: ChainExecutionContext,
  executePrompt: ExecutePromptFn
): Promise<unknown> {
  switch (node.type) {
    case 'input':
      return executeInputNode(node, context);
    case 'prompt':
      return executePromptNode(node, context, executePrompt);
    case 'condition':
      return executeConditionNode(node, context);
    case 'transform':
      return executeTransformNode(node, context);
    case 'merge':
      return executeMergeNode(node, context);
    case 'output':
      return executeOutputNode(node, context);
    default:
      throw new Error(`Unknown node type: ${node.type}`);
  }
}

function executeInputNode(node: ChainNode, context: ChainExecutionContext): unknown {
  const config = node.config as InputNodeConfig;
  // Input node just validates that required variables exist
  for (const varName of config.variables) {
    if (context.variables[varName] === undefined) {
      throw new Error(`Missing required input variable: ${varName}`);
    }
  }
  return context.variables;
}

async function executePromptNode(
  node: ChainNode,
  context: ChainExecutionContext,
  executePrompt: ExecutePromptFn
): Promise<string> {
  const config = node.config as PromptNodeConfig;

  if (!config.promptContent) {
    throw new Error('Prompt node requires promptContent');
  }

  // Map chain variables to prompt inputs
  const promptInput: VariableValues = {};
  for (const [promptVar, chainVar] of Object.entries(config.inputMapping)) {
    promptInput[promptVar] = context.variables[chainVar];
  }

  // Execute prompt
  const result = await executePrompt(config.promptContent, promptInput, config.model);

  // Store result in context
  context.variables[config.outputVariable] = result.output;
  context.results.set(node.id, result);

  return result.output;
}

function executeConditionNode(node: ChainNode, context: ChainExecutionContext): boolean {
  const config = node.config as ConditionNodeConfig;

  // Create safe evaluation context
  const evalContext = { ...context.variables };

  try {
    // Simple expression evaluation (in production, use a safe evaluator)
    const fn = new Function(...Object.keys(evalContext), `return ${config.expression}`);
    return Boolean(fn(...Object.values(evalContext)));
  } catch (error) {
    throw new Error(`Condition evaluation failed: ${(error as Error).message}`);
  }
}

function executeTransformNode(node: ChainNode, context: ChainExecutionContext): unknown {
  const config = node.config as TransformNodeConfig;
  const input = context.variables[config.inputVariable];

  if (input === undefined) {
    throw new Error(`Transform input variable not found: ${config.inputVariable}`);
  }

  let result: unknown;

  switch (config.transformType) {
    case 'extract_json':
      result = extractJson(String(input), config.config.jsonPath);
      break;
    case 'regex':
      result = applyRegex(String(input), config.config.pattern!);
      break;
    case 'split':
      result = String(input).split(config.config.delimiter || '\n');
      break;
    case 'join':
      result = Array.isArray(input) ? input.join(config.config.delimiter || ', ') : input;
      break;
    case 'custom':
      result = executeCustomTransform(input, config.config.customCode!);
      break;
    default:
      throw new Error(`Unknown transform type: ${config.transformType}`);
  }

  context.variables[config.outputVariable] = result;
  return result;
}

function executeMergeNode(node: ChainNode, context: ChainExecutionContext): unknown {
  const config = node.config as MergeNodeConfig;

  const values = config.inputVariables.map((v) => context.variables[v]);

  let result: unknown;

  switch (config.mergeStrategy) {
    case 'concat':
      result = values.map(String).join(config.separator || '\n');
      break;
    case 'array':
      result = values;
      break;
    case 'object':
      result = Object.fromEntries(
        config.inputVariables.map((v, i) => [v, values[i]])
      );
      break;
    default:
      throw new Error(`Unknown merge strategy: ${config.mergeStrategy}`);
  }

  context.variables[config.outputVariable] = result;
  return result;
}

function executeOutputNode(node: ChainNode, context: ChainExecutionContext): unknown {
  const config = node.config as OutputNodeConfig;
  const output = context.variables[config.outputVariable];

  switch (config.format) {
    case 'json':
      return typeof output === 'string' ? JSON.parse(output) : output;
    case 'markdown':
      return String(output);
    default:
      return output;
  }
}

// ============================================
// Helper Functions
// ============================================

function extractJson(input: string, jsonPath?: string): unknown {
  // Find JSON in string
  const jsonMatch = input.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
  if (!jsonMatch) {
    throw new Error('No JSON found in input');
  }

  const parsed = JSON.parse(jsonMatch[0]);

  if (jsonPath) {
    // Simple JSONPath implementation
    const parts = jsonPath.split('.').filter(Boolean);
    let result = parsed;
    for (const part of parts) {
      if (result === undefined) break;
      result = result[part];
    }
    return result;
  }

  return parsed;
}

function applyRegex(input: string, pattern: string): string | string[] {
  const regex = new RegExp(pattern, 'g');
  const matches = input.match(regex);
  return matches || [];
}

function executeCustomTransform(input: unknown, code: string): unknown {
  try {
    const fn = new Function('input', code);
    return fn(input);
  } catch (error) {
    throw new Error(`Custom transform failed: ${(error as Error).message}`);
  }
}

// ============================================
// Chain Validation
// ============================================

export interface ChainValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateChain(chain: PromptChain): ChainValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check for empty chain
  if (chain.nodes.length === 0) {
    errors.push('Chain has no nodes');
    return { valid: false, errors, warnings };
  }

  // Check for cycles (simple DFS)
  const visited = new Set<string>();
  const stack = new Set<string>();

  function hasCycle(nodeId: string): boolean {
    if (stack.has(nodeId)) return true;
    if (visited.has(nodeId)) return false;

    visited.add(nodeId);
    stack.add(nodeId);

    const outgoing = chain.edges.filter((e) => e.source === nodeId);
    for (const edge of outgoing) {
      if (hasCycle(edge.target)) return true;
    }

    stack.delete(nodeId);
    return false;
  }

  for (const node of chain.nodes) {
    if (hasCycle(node.id)) {
      errors.push(`Cycle detected involving node: ${node.name}`);
      break;
    }
    visited.clear();
    stack.clear();
  }

  // Check for disconnected nodes
  const connectedNodes = new Set<string>();
  for (const edge of chain.edges) {
    connectedNodes.add(edge.source);
    connectedNodes.add(edge.target);
  }

  for (const node of chain.nodes) {
    if (!connectedNodes.has(node.id) && chain.nodes.length > 1) {
      warnings.push(`Node "${node.name}" is disconnected`);
    }
  }

  // Check for missing output node
  const hasOutput = chain.nodes.some((n) => n.type === 'output');
  if (!hasOutput) {
    warnings.push('Chain has no output node');
  }

  // Check prompt nodes have content
  for (const node of chain.nodes) {
    if (node.type === 'prompt') {
      const config = node.config as PromptNodeConfig;
      if (!config.promptId && !config.promptContent) {
        errors.push(`Prompt node "${node.name}" has no prompt content`);
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

// ============================================
// Chain Templates
// ============================================

export const CHAIN_TEMPLATES: Partial<PromptChain>[] = [
  {
    name: 'Simple Q&A with Validation',
    description: 'Ask a question, validate the answer, retry if needed',
    nodes: [
      { id: '1', type: 'input', name: 'Input', config: { variables: ['question'] }, position: { x: 0, y: 0 } },
      { id: '2', type: 'prompt', name: 'Answer', config: { outputVariable: 'answer', model: 'claude-sonnet-4-20250514', inputMapping: { question: 'question' } }, position: { x: 200, y: 0 } },
      { id: '3', type: 'condition', name: 'Is Valid?', config: { expression: 'answer.length > 50' }, position: { x: 400, y: 0 } },
      { id: '4', type: 'output', name: 'Output', config: { outputVariable: 'answer', format: 'raw' }, position: { x: 600, y: 0 } },
    ],
    edges: [
      { id: 'e1', source: '1', target: '2' },
      { id: 'e2', source: '2', target: '3' },
      { id: 'e3', source: '3', target: '4', sourceHandle: 'true' },
      { id: 'e4', source: '3', target: '2', sourceHandle: 'false' },
    ],
  },
  {
    name: 'Research and Summarize',
    description: 'Generate research, then summarize findings',
    nodes: [
      { id: '1', type: 'input', name: 'Topic Input', config: { variables: ['topic'] }, position: { x: 0, y: 0 } },
      { id: '2', type: 'prompt', name: 'Research', config: { outputVariable: 'research', model: 'claude-sonnet-4-20250514', inputMapping: { topic: 'topic' } }, position: { x: 200, y: 0 } },
      { id: '3', type: 'prompt', name: 'Summarize', config: { outputVariable: 'summary', model: 'claude-3-5-haiku-20241022', inputMapping: { content: 'research' } }, position: { x: 400, y: 0 } },
      { id: '4', type: 'output', name: 'Summary Output', config: { outputVariable: 'summary', format: 'markdown' }, position: { x: 600, y: 0 } },
    ],
    edges: [
      { id: 'e1', source: '1', target: '2' },
      { id: 'e2', source: '2', target: '3' },
      { id: 'e3', source: '3', target: '4' },
    ],
  },
];
