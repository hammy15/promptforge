import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages, currentPrompt, targetLLM } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    // Build context-aware system prompt
    const systemPrompt = `You are PromptForge Assistant, an AI helper embedded in a prompt engineering platform for finance professionals.

Your capabilities:
1. Explain prompt engineering concepts and best practices
2. Help users improve their prompts
3. Suggest appropriate models for different tasks
4. Answer questions about the PromptForge platform
5. Provide examples and templates for financial analysis

${currentPrompt ? `
Current prompt context:
- The user is working on a prompt
- Current content preview: "${currentPrompt.substring(0, 500)}${currentPrompt.length > 500 ? '...' : ''}"
` : ''}

${targetLLM ? `Target LLM: ${targetLLM}` : ''}

Guidelines:
- Be helpful, concise, and proactive
- If you see issues with the current prompt, mention them
- Suggest improvements based on best practices
- Use markdown formatting for clarity
- When suggesting code or prompt text, use code blocks
- Keep responses focused and actionable`;

    // Convert messages to Anthropic format
    const formattedMessages = messages.map((msg: { role: string; content: string }) => ({
      role: msg.role as 'user' | 'assistant',
      content: msg.content,
    }));

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1500,
      system: systemPrompt,
      messages: formattedMessages,
    });

    // Extract response
    const responseText = message.content
      .filter((block): block is Anthropic.TextBlock => block.type === 'text')
      .map(block => block.text)
      .join('\n');

    return NextResponse.json({
      response: responseText,
      model: message.model,
      usage: message.usage,
    });
  } catch (error) {
    console.error('Error in agent chat:', error);
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
}
