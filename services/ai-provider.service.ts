// ai-provider.service.ts - Unified AI provider abstraction
// Supports Anthropic Claude, OpenAI GPT, Google Gemini

import Anthropic from '@anthropic-ai/sdk';
import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { EventEmitter } from 'events';

import type {
  PromptContent,
  ExecutionResult,
  TokenUsage,
  AIProvider,
  AIModel,
} from '@/types/prompt.types';

// ============================================
// Types
// ============================================

export interface CompletionRequest {
  model: string;
  messages: Message[];
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  stopSequences?: string[];
  stream?: boolean;
}

export interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface StreamCallbacks {
  onToken?: (token: string) => void;
  onComplete?: (result: ExecutionResult) => void;
  onError?: (error: Error) => void;
}

// ============================================
// Provider Interface
// ============================================

interface AIProviderClient {
  complete(request: CompletionRequest): Promise<ExecutionResult>;
  completeStream(
    request: CompletionRequest,
    callbacks: StreamCallbacks
  ): Promise<void>;
}

// ============================================
// Anthropic Claude Provider
// ============================================

class AnthropicProvider implements AIProviderClient {
  private client: Anthropic;

  constructor(apiKey: string) {
    this.client = new Anthropic({ apiKey });
  }

  async complete(request: CompletionRequest): Promise<ExecutionResult> {
    const startTime = Date.now();

    const systemMessage = request.messages.find((m) => m.role === 'system');
    const otherMessages = request.messages.filter((m) => m.role !== 'system');

    const response = await this.client.messages.create({
      model: request.model,
      max_tokens: request.maxTokens || 4096,
      temperature: request.temperature,
      top_p: request.topP,
      stop_sequences: request.stopSequences,
      system: systemMessage?.content,
      messages: otherMessages.map((m) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
    });

    const latencyMs = Date.now() - startTime;
    const output =
      response.content[0].type === 'text' ? response.content[0].text : '';

    const tokenUsage: TokenUsage = {
      input: response.usage.input_tokens,
      output: response.usage.output_tokens,
      total: response.usage.input_tokens + response.usage.output_tokens,
    };

    const costUsd = this.calculateCost(request.model, tokenUsage);

    return {
      id: response.id,
      output,
      model: request.model,
      latencyMs,
      tokenUsage,
      costUsd,
      finishReason: this.mapStopReason(response.stop_reason),
    };
  }

  async completeStream(
    request: CompletionRequest,
    callbacks: StreamCallbacks
  ): Promise<void> {
    const startTime = Date.now();

    const systemMessage = request.messages.find((m) => m.role === 'system');
    const otherMessages = request.messages.filter((m) => m.role !== 'system');

    let fullOutput = '';
    let inputTokens = 0;
    let outputTokens = 0;
    let messageId = '';
    let stopReason: Anthropic.Messages.MessageStreamEvent['type'] | null = null;

    try {
      const stream = await this.client.messages.stream({
        model: request.model,
        max_tokens: request.maxTokens || 4096,
        temperature: request.temperature,
        top_p: request.topP,
        stop_sequences: request.stopSequences,
        system: systemMessage?.content,
        messages: otherMessages.map((m) => ({
          role: m.role as 'user' | 'assistant',
          content: m.content,
        })),
      });

      for await (const event of stream) {
        if (event.type === 'message_start') {
          messageId = event.message.id;
          inputTokens = event.message.usage.input_tokens;
        } else if (event.type === 'content_block_delta') {
          if (event.delta.type === 'text_delta') {
            fullOutput += event.delta.text;
            callbacks.onToken?.(event.delta.text);
          }
        } else if (event.type === 'message_delta') {
          outputTokens = event.usage.output_tokens;
          stopReason = event.type;
        }
      }

      const latencyMs = Date.now() - startTime;
      const tokenUsage: TokenUsage = {
        input: inputTokens,
        output: outputTokens,
        total: inputTokens + outputTokens,
      };

      callbacks.onComplete?.({
        id: messageId,
        output: fullOutput,
        model: request.model,
        latencyMs,
        tokenUsage,
        costUsd: this.calculateCost(request.model, tokenUsage),
        finishReason: 'stop',
      });
    } catch (error) {
      callbacks.onError?.(error as Error);
    }
  }

  private mapStopReason(
    reason: string | null
  ): ExecutionResult['finishReason'] {
    switch (reason) {
      case 'end_turn':
        return 'stop';
      case 'max_tokens':
        return 'length';
      case 'tool_use':
        return 'tool_use';
      default:
        return 'stop';
    }
  }

  private calculateCost(model: string, usage: TokenUsage): number {
    // Pricing per million tokens (as of 2025)
    const pricing: Record<string, { input: number; output: number }> = {
      'claude-opus-4-5-20250514': { input: 15, output: 75 },
      'claude-sonnet-4-20250514': { input: 3, output: 15 },
      'claude-3-5-haiku-20241022': { input: 0.25, output: 1.25 },
    };

    const modelPricing = pricing[model] || { input: 3, output: 15 };
    return (
      (usage.input * modelPricing.input) / 1_000_000 +
      (usage.output * modelPricing.output) / 1_000_000
    );
  }
}

// ============================================
// OpenAI GPT Provider
// ============================================

class OpenAIProvider implements AIProviderClient {
  private client: OpenAI;

  constructor(apiKey: string) {
    this.client = new OpenAI({ apiKey });
  }

  async complete(request: CompletionRequest): Promise<ExecutionResult> {
    const startTime = Date.now();

    const response = await this.client.chat.completions.create({
      model: request.model,
      messages: request.messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
      max_tokens: request.maxTokens,
      temperature: request.temperature,
      top_p: request.topP,
      stop: request.stopSequences,
    });

    const latencyMs = Date.now() - startTime;
    const choice = response.choices[0];
    const output = choice.message.content || '';

    const tokenUsage: TokenUsage = {
      input: response.usage?.prompt_tokens || 0,
      output: response.usage?.completion_tokens || 0,
      total: response.usage?.total_tokens || 0,
    };

    return {
      id: response.id,
      output,
      model: request.model,
      latencyMs,
      tokenUsage,
      costUsd: this.calculateCost(request.model, tokenUsage),
      finishReason: this.mapFinishReason(choice.finish_reason),
    };
  }

  async completeStream(
    request: CompletionRequest,
    callbacks: StreamCallbacks
  ): Promise<void> {
    const startTime = Date.now();
    let fullOutput = '';

    try {
      const stream = await this.client.chat.completions.create({
        model: request.model,
        messages: request.messages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
        max_tokens: request.maxTokens,
        temperature: request.temperature,
        top_p: request.topP,
        stop: request.stopSequences,
        stream: true,
      });

      let responseId = '';
      for await (const chunk of stream) {
        responseId = chunk.id;
        const delta = chunk.choices[0]?.delta?.content || '';
        if (delta) {
          fullOutput += delta;
          callbacks.onToken?.(delta);
        }
      }

      const latencyMs = Date.now() - startTime;

      // Estimate tokens for streaming (actual count not available)
      const estimatedTokens = Math.ceil(fullOutput.length / 4);
      const tokenUsage: TokenUsage = {
        input: 0, // Not available in stream
        output: estimatedTokens,
        total: estimatedTokens,
      };

      callbacks.onComplete?.({
        id: responseId,
        output: fullOutput,
        model: request.model,
        latencyMs,
        tokenUsage,
        costUsd: this.calculateCost(request.model, tokenUsage),
        finishReason: 'stop',
      });
    } catch (error) {
      callbacks.onError?.(error as Error);
    }
  }

  private mapFinishReason(
    reason: string | null
  ): ExecutionResult['finishReason'] {
    switch (reason) {
      case 'stop':
        return 'stop';
      case 'length':
        return 'length';
      case 'tool_calls':
      case 'function_call':
        return 'tool_use';
      default:
        return 'stop';
    }
  }

  private calculateCost(model: string, usage: TokenUsage): number {
    const pricing: Record<string, { input: number; output: number }> = {
      'gpt-4o': { input: 5, output: 15 },
      'gpt-4-turbo': { input: 10, output: 30 },
      'gpt-3.5-turbo': { input: 0.5, output: 1.5 },
    };

    const modelPricing = pricing[model] || { input: 5, output: 15 };
    return (
      (usage.input * modelPricing.input) / 1_000_000 +
      (usage.output * modelPricing.output) / 1_000_000
    );
  }
}

// ============================================
// Google Gemini Provider
// ============================================

class GoogleProvider implements AIProviderClient {
  private client: GoogleGenerativeAI;

  constructor(apiKey: string) {
    this.client = new GoogleGenerativeAI(apiKey);
  }

  async complete(request: CompletionRequest): Promise<ExecutionResult> {
    const startTime = Date.now();

    const model = this.client.getGenerativeModel({
      model: request.model,
      generationConfig: {
        maxOutputTokens: request.maxTokens,
        temperature: request.temperature,
        topP: request.topP,
        stopSequences: request.stopSequences,
      },
    });

    const systemMessage = request.messages.find((m) => m.role === 'system');
    const userMessage = request.messages.find((m) => m.role === 'user');

    const prompt = systemMessage
      ? `${systemMessage.content}\n\n${userMessage?.content || ''}`
      : userMessage?.content || '';

    const result = await model.generateContent(prompt);
    const response = result.response;
    const output = response.text();

    const latencyMs = Date.now() - startTime;

    // Gemini provides token counts in usage metadata
    const tokenUsage: TokenUsage = {
      input: response.usageMetadata?.promptTokenCount || 0,
      output: response.usageMetadata?.candidatesTokenCount || 0,
      total: response.usageMetadata?.totalTokenCount || 0,
    };

    return {
      id: `gemini-${Date.now()}`,
      output,
      model: request.model,
      latencyMs,
      tokenUsage,
      costUsd: this.calculateCost(request.model, tokenUsage),
      finishReason: 'stop',
    };
  }

  async completeStream(
    request: CompletionRequest,
    callbacks: StreamCallbacks
  ): Promise<void> {
    const startTime = Date.now();
    let fullOutput = '';

    try {
      const model = this.client.getGenerativeModel({
        model: request.model,
        generationConfig: {
          maxOutputTokens: request.maxTokens,
          temperature: request.temperature,
          topP: request.topP,
          stopSequences: request.stopSequences,
        },
      });

      const systemMessage = request.messages.find((m) => m.role === 'system');
      const userMessage = request.messages.find((m) => m.role === 'user');

      const prompt = systemMessage
        ? `${systemMessage.content}\n\n${userMessage?.content || ''}`
        : userMessage?.content || '';

      const result = await model.generateContentStream(prompt);

      for await (const chunk of result.stream) {
        const text = chunk.text();
        fullOutput += text;
        callbacks.onToken?.(text);
      }

      const latencyMs = Date.now() - startTime;
      const estimatedTokens = Math.ceil(fullOutput.length / 4);

      callbacks.onComplete?.({
        id: `gemini-${Date.now()}`,
        output: fullOutput,
        model: request.model,
        latencyMs,
        tokenUsage: {
          input: 0,
          output: estimatedTokens,
          total: estimatedTokens,
        },
        costUsd: 0,
        finishReason: 'stop',
      });
    } catch (error) {
      callbacks.onError?.(error as Error);
    }
  }

  private calculateCost(model: string, usage: TokenUsage): number {
    // Gemini pricing
    const pricing: Record<string, { input: number; output: number }> = {
      'gemini-1.5-pro': { input: 3.5, output: 10.5 },
      'gemini-1.5-flash': { input: 0.075, output: 0.3 },
    };

    const modelPricing = pricing[model] || { input: 3.5, output: 10.5 };
    return (
      (usage.input * modelPricing.input) / 1_000_000 +
      (usage.output * modelPricing.output) / 1_000_000
    );
  }
}

// ============================================
// Unified AI Service
// ============================================

export class AIService {
  private providers: Map<AIProvider, AIProviderClient> = new Map();

  constructor(config: {
    anthropicApiKey?: string;
    openaiApiKey?: string;
    googleApiKey?: string;
  }) {
    if (config.anthropicApiKey) {
      this.providers.set('anthropic', new AnthropicProvider(config.anthropicApiKey));
    }
    if (config.openaiApiKey) {
      this.providers.set('openai', new OpenAIProvider(config.openaiApiKey));
    }
    if (config.googleApiKey) {
      this.providers.set('google', new GoogleProvider(config.googleApiKey));
    }
  }

  /**
   * Get provider for a specific model
   */
  private getProvider(model: string): AIProviderClient {
    let provider: AIProvider;

    if (model.startsWith('claude')) {
      provider = 'anthropic';
    } else if (model.startsWith('gpt')) {
      provider = 'openai';
    } else if (model.startsWith('gemini')) {
      provider = 'google';
    } else {
      throw new Error(`Unknown model: ${model}`);
    }

    const client = this.providers.get(provider);
    if (!client) {
      throw new Error(`Provider ${provider} not configured`);
    }

    return client;
  }

  /**
   * Build messages from prompt content
   */
  buildMessages(content: PromptContent, input: Record<string, unknown>): Message[] {
    const messages: Message[] = [];

    // Build system message
    let systemContent = '';

    if (content.persona) {
      systemContent += `# Role\n${content.persona}\n\n`;
    }
    if (content.context) {
      systemContent += `# Context\n${content.context}\n\n`;
    }
    if (content.constraints.length > 0) {
      systemContent += `# Constraints\n${content.constraints.map((c) => `- ${c}`).join('\n')}\n\n`;
    }
    if (content.style.length > 0) {
      systemContent += `# Style\nRespond in a ${content.style.join(', ')} tone.\n\n`;
    }

    const formatDescriptions: Record<string, string> = {
      plain_text: 'plain text',
      markdown: 'markdown format',
      json: 'valid JSON',
      xml: 'XML format',
      code: 'code blocks with language tags',
      structured_list: 'a structured bulleted list',
      custom: content.customFormatSchema || 'the specified format',
    };

    systemContent += `# Output Format\nProvide your response in ${formatDescriptions[content.outputFormat]}.`;

    if (systemContent) {
      messages.push({ role: 'system', content: systemContent.trim() });
    }

    // Add examples as few-shot
    for (const example of content.examples) {
      messages.push({ role: 'user', content: example.input });
      messages.push({ role: 'assistant', content: example.output });
    }

    // Add user input
    const userContent = content.objective +
      (Object.keys(input).length > 0
        ? `\n\nInput:\n${JSON.stringify(input, null, 2)}`
        : '');
    messages.push({ role: 'user', content: userContent });

    return messages;
  }

  /**
   * Execute a prompt
   */
  async execute(
    content: PromptContent,
    input: Record<string, unknown>,
    model: string,
    stream?: false
  ): Promise<ExecutionResult>;
  async execute(
    content: PromptContent,
    input: Record<string, unknown>,
    model: string,
    stream: true,
    callbacks: StreamCallbacks
  ): Promise<void>;
  async execute(
    content: PromptContent,
    input: Record<string, unknown>,
    model: string,
    stream?: boolean,
    callbacks?: StreamCallbacks
  ): Promise<ExecutionResult | void> {
    const provider = this.getProvider(model);
    const messages = this.buildMessages(content, input);

    const request: CompletionRequest = {
      model,
      messages,
      temperature: content.parameters.temperature,
      maxTokens: content.parameters.maxTokens,
      topP: content.parameters.topP,
      stopSequences: content.parameters.stopSequences,
      stream,
    };

    if (stream && callbacks) {
      return provider.completeStream(request, callbacks);
    }

    return provider.complete(request);
  }

  /**
   * Get available models
   */
  getAvailableModels(): AIModel[] {
    const models: AIModel[] = [];

    if (this.providers.has('anthropic')) {
      models.push(
        {
          id: 'claude-opus-4-5-20250514',
          provider: 'anthropic',
          name: 'claude-opus-4-5-20250514',
          displayName: 'Claude Opus 4.5',
          contextWindow: 200000,
          maxOutputTokens: 32000,
          inputPricePerMillion: 15,
          outputPricePerMillion: 75,
          supportsStreaming: true,
          supportsTools: true,
        },
        {
          id: 'claude-sonnet-4-20250514',
          provider: 'anthropic',
          name: 'claude-sonnet-4-20250514',
          displayName: 'Claude Sonnet 4',
          contextWindow: 200000,
          maxOutputTokens: 64000,
          inputPricePerMillion: 3,
          outputPricePerMillion: 15,
          supportsStreaming: true,
          supportsTools: true,
        },
        {
          id: 'claude-3-5-haiku-20241022',
          provider: 'anthropic',
          name: 'claude-3-5-haiku-20241022',
          displayName: 'Claude 3.5 Haiku',
          contextWindow: 200000,
          maxOutputTokens: 8192,
          inputPricePerMillion: 0.25,
          outputPricePerMillion: 1.25,
          supportsStreaming: true,
          supportsTools: true,
        }
      );
    }

    if (this.providers.has('openai')) {
      models.push(
        {
          id: 'gpt-4o',
          provider: 'openai',
          name: 'gpt-4o',
          displayName: 'GPT-4o',
          contextWindow: 128000,
          maxOutputTokens: 16384,
          inputPricePerMillion: 5,
          outputPricePerMillion: 15,
          supportsStreaming: true,
          supportsTools: true,
        },
        {
          id: 'gpt-4-turbo',
          provider: 'openai',
          name: 'gpt-4-turbo',
          displayName: 'GPT-4 Turbo',
          contextWindow: 128000,
          maxOutputTokens: 4096,
          inputPricePerMillion: 10,
          outputPricePerMillion: 30,
          supportsStreaming: true,
          supportsTools: true,
        }
      );
    }

    if (this.providers.has('google')) {
      models.push(
        {
          id: 'gemini-1.5-pro',
          provider: 'google',
          name: 'gemini-1.5-pro',
          displayName: 'Gemini 1.5 Pro',
          contextWindow: 1000000,
          maxOutputTokens: 8192,
          inputPricePerMillion: 3.5,
          outputPricePerMillion: 10.5,
          supportsStreaming: true,
          supportsTools: true,
        },
        {
          id: 'gemini-1.5-flash',
          provider: 'google',
          name: 'gemini-1.5-flash',
          displayName: 'Gemini 1.5 Flash',
          contextWindow: 1000000,
          maxOutputTokens: 8192,
          inputPricePerMillion: 0.075,
          outputPricePerMillion: 0.3,
          supportsStreaming: true,
          supportsTools: true,
        }
      );
    }

    return models;
  }
}

// Singleton instance
let aiService: AIService | null = null;

export function getAIService(): AIService {
  if (!aiService) {
    aiService = new AIService({
      anthropicApiKey: process.env.ANTHROPIC_API_KEY,
      openaiApiKey: process.env.OPENAI_API_KEY,
      googleApiKey: process.env.GOOGLE_API_KEY,
    });
  }
  return aiService;
}
