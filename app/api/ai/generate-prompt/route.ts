import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { description, targetLLM, styles = [] } = body;

    if (!description) {
      return NextResponse.json(
        { error: 'Description is required' },
        { status: 400 }
      );
    }

    // Build the system prompt for prompt generation
    const systemPrompt = `You are an expert prompt engineer with deep knowledge of all major LLMs. Your task is to create highly effective prompts optimized for ${targetLLM || 'any LLM'}.

When creating prompts, follow these principles:
1. Be clear and specific about the task
2. Provide relevant context
3. Define the expected output format
4. Include constraints when necessary
5. Use the appropriate tone and style

${targetLLM === 'claude' ? 'For Claude: Use XML tags for structure (<context>, <instructions>, <output>). Leverage chain-of-thought reasoning.' : ''}
${targetLLM === 'gpt-4' ? 'For GPT-4: Use markdown formatting. Be explicit about output format. Use function calling when structured output is needed.' : ''}
${targetLLM === 'gemini' ? 'For Gemini: Take advantage of the large context window. Use clear step-by-step instructions.' : ''}

${styles.length > 0 ? `Apply these styles to the prompt:\n${styles.join('\n')}` : ''}

Generate a comprehensive, well-structured prompt based on the user's description.`;

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: `Create an optimized prompt for the following task:\n\n${description}\n\nProvide the prompt in a clear, structured format that can be directly used.`,
        },
      ],
    });

    // Extract text from the response
    const generatedPrompt = message.content
      .filter((block): block is Anthropic.TextBlock => block.type === 'text')
      .map(block => block.text)
      .join('\n');

    return NextResponse.json({
      generatedPrompt,
      model: message.model,
      usage: message.usage,
    });
  } catch (error) {
    console.error('Error generating prompt:', error);
    return NextResponse.json(
      { error: 'Failed to generate prompt' },
      { status: 500 }
    );
  }
}
