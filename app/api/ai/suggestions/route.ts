import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic();

// Model capabilities and pricing for recommendations
const MODEL_INFO = {
  'claude-opus-4-5': {
    name: 'Claude Opus 4.5',
    context: '200K',
    strengths: ['Complex reasoning', 'Long documents', 'Code analysis', 'Research'],
    cost: 'Premium',
  },
  'claude-sonnet-4': {
    name: 'Claude Sonnet 4',
    context: '200K',
    strengths: ['Balanced performance', 'General tasks', 'Writing', 'Analysis'],
    cost: 'Standard',
  },
  'claude-haiku': {
    name: 'Claude Haiku',
    context: '200K',
    strengths: ['Fast responses', 'Simple tasks', 'High volume', 'Cost-effective'],
    cost: 'Economy',
  },
  'gpt-4o': {
    name: 'GPT-4o',
    context: '128K',
    strengths: ['Multimodal', 'Creative writing', 'Function calling', 'Real-time'],
    cost: 'Premium',
  },
  'gemini-pro': {
    name: 'Gemini 1.5 Pro',
    context: '1M',
    strengths: ['Massive context', 'Document analysis', 'Multimodal', 'Research'],
    cost: 'Standard',
  },
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userIntent } = body;

    if (!userIntent) {
      return NextResponse.json(
        { error: 'User intent is required' },
        { status: 400 }
      );
    }

    // Use Claude to analyze the intent and make recommendations
    const systemPrompt = `You are an AI assistant that helps users choose the right LLM and prompt strategy for their tasks.

Analyze the user's intent and provide:
1. Task type classification
2. Complexity assessment
3. LLM recommendations with reasoning
4. Suggested templates if applicable

Respond in JSON format with this structure:
{
  "taskAnalysis": {
    "detectedTaskType": "string (e.g., 'code_review', 'writing', 'analysis', 'data_processing')",
    "complexity": "simple" | "moderate" | "complex",
    "requirements": ["list of key requirements"]
  },
  "llmRecommendations": [
    {
      "model": "model_id",
      "score": 1-100,
      "reasons": ["why this model is good for this task"]
    }
  ],
  "suggestedTemplates": ["template names that might help"],
  "promptTips": ["tips for creating an effective prompt for this task"]
}`;

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1500,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: `Analyze this user intent and provide recommendations:\n\n"${userIntent}"`,
        },
      ],
    });

    // Extract and parse the response
    const responseText = message.content
      .filter((block): block is Anthropic.TextBlock => block.type === 'text')
      .map(block => block.text)
      .join('');

    // Try to parse JSON from the response
    let suggestions;
    try {
      // Extract JSON from the response (it might be wrapped in markdown code blocks)
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        suggestions = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch {
      // If parsing fails, return a structured default response
      suggestions = {
        taskAnalysis: {
          detectedTaskType: 'general',
          complexity: 'moderate',
          requirements: ['Clear instructions', 'Specific output format'],
        },
        llmRecommendations: [
          {
            model: 'claude-sonnet-4',
            score: 85,
            reasons: ['Good balance of capability and cost', 'Versatile for most tasks'],
          },
        ],
        suggestedTemplates: [],
        promptTips: ['Be specific about your requirements', 'Include examples if possible'],
        rawAnalysis: responseText,
      };
    }

    // Enrich recommendations with model info
    if (suggestions.llmRecommendations) {
      suggestions.llmRecommendations = suggestions.llmRecommendations.map((rec: { model: string; score: number; reasons: string[] }) => ({
        ...rec,
        modelInfo: MODEL_INFO[rec.model as keyof typeof MODEL_INFO] || null,
      }));
    }

    return NextResponse.json(suggestions);
  } catch (error) {
    console.error('Error generating suggestions:', error);
    return NextResponse.json(
      { error: 'Failed to generate suggestions' },
      { status: 500 }
    );
  }
}
