// Prompt Quality Scoring System
// Analyzes prompts and provides actionable improvement suggestions

export interface PromptScore {
  overall: number; // 0-100
  categories: {
    clarity: number;
    specificity: number;
    structure: number;
    completeness: number;
    actionability: number;
  };
  suggestions: string[];
  strengths: string[];
}

// Scoring weights
const WEIGHTS = {
  clarity: 0.25,
  specificity: 0.25,
  structure: 0.20,
  completeness: 0.15,
  actionability: 0.15,
};

// Analyze prompt clarity
function scoreClarityRaw(prompt: string): { score: number; suggestions: string[]; strengths: string[] } {
  let score = 100;
  const suggestions: string[] = [];
  const strengths: string[] = [];

  // Check for clear language
  const vagueWords = ['maybe', 'possibly', 'perhaps', 'might', 'could be', 'sort of', 'kind of', 'stuff', 'things'];
  const vagueCount = vagueWords.filter(w => prompt.toLowerCase().includes(w)).length;
  if (vagueCount > 0) {
    score -= vagueCount * 5;
    suggestions.push(`Remove vague words like "${vagueWords.filter(w => prompt.toLowerCase().includes(w)).join('", "')}" for clearer instructions`);
  } else {
    strengths.push('Uses clear, direct language');
  }

  // Check sentence length (very long sentences reduce clarity)
  const sentences = prompt.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const longSentences = sentences.filter(s => s.split(' ').length > 40);
  if (longSentences.length > 2) {
    score -= 10;
    suggestions.push('Break up long sentences for better readability');
  }

  // Check for double negatives
  if (prompt.match(/not\s+\w+\s+not|don't\s+\w+\s+not|never\s+\w+\s+not/i)) {
    score -= 10;
    suggestions.push('Avoid double negatives for clearer meaning');
  }

  return { score: Math.max(0, score), suggestions, strengths };
}

// Analyze prompt specificity
function scoreSpecificityRaw(prompt: string): { score: number; suggestions: string[]; strengths: string[] } {
  let score = 100;
  const suggestions: string[] = [];
  const strengths: string[] = [];

  // Check for specific numbers/metrics
  const hasNumbers = /\d+/.test(prompt);
  const hasPercentages = /%|\bpercent\b/i.test(prompt);
  const hasCurrency = /\$|\€|\£|\bcost\b|\bprice\b|\bvalue\b/i.test(prompt);

  if (hasNumbers) {
    strengths.push('Includes specific numbers and quantities');
  } else {
    score -= 15;
    suggestions.push('Add specific numbers, quantities, or ranges where applicable');
  }

  // Check for named entities
  const hasNames = /[A-Z][a-z]+\s+[A-Z][a-z]+|\b[A-Z]{2,}\b/.test(prompt);
  if (hasNames) {
    strengths.push('References specific entities or terms');
  }

  // Check for time constraints
  const hasTimeframe = /\d+\s*(day|week|month|year|hour|minute)|deadline|by\s+\w+\s+\d+|within|before|after/i.test(prompt);
  if (hasTimeframe) {
    strengths.push('Includes specific timeframes');
  } else if (prompt.length > 200) {
    score -= 10;
    suggestions.push('Consider adding timeframes or deadlines for context');
  }

  // Check for format specifications
  const hasFormat = /table|list|bullet|markdown|json|csv|format|structure|section|heading/i.test(prompt);
  if (hasFormat) {
    strengths.push('Specifies desired output format');
  } else {
    score -= 10;
    suggestions.push('Specify the desired output format (table, list, sections, etc.)');
  }

  return { score: Math.max(0, score), suggestions, strengths };
}

// Analyze prompt structure
function scoreStructureRaw(prompt: string): { score: number; suggestions: string[]; strengths: string[] } {
  let score = 100;
  const suggestions: string[] = [];
  const strengths: string[] = [];

  // Check for sections/headers
  const hasHeaders = /^#+\s+|\*\*[^*]+\*\*:|\n[A-Z][^:]+:/m.test(prompt);
  const hasBullets = /^[\-\*]\s+|\n[\-\*]\s+|\d+\.\s+/m.test(prompt);
  const hasNumberedList = /\d+\.\s+[A-Za-z]/m.test(prompt);

  if (hasHeaders) {
    score += 5;
    strengths.push('Well-organized with clear sections');
  } else if (prompt.length > 300) {
    score -= 15;
    suggestions.push('Add section headers or bold labels to organize longer prompts');
  }

  if (hasBullets || hasNumberedList) {
    strengths.push('Uses lists for organized information');
  } else if (prompt.length > 200) {
    score -= 10;
    suggestions.push('Use bullet points or numbered lists for multiple items');
  }

  // Check for logical flow markers
  const hasFlowMarkers = /first|then|next|finally|step\s*\d|phase/i.test(prompt);
  if (hasFlowMarkers) {
    strengths.push('Clear logical flow with sequence markers');
  }

  // Check for context/background
  const hasContext = /context|background|overview|given|assuming|scenario/i.test(prompt);
  if (hasContext) {
    strengths.push('Provides context and background');
  }

  return { score: Math.max(0, Math.min(100, score)), suggestions, strengths };
}

// Analyze prompt completeness
function scoreCompletenessRaw(prompt: string): { score: number; suggestions: string[]; strengths: string[] } {
  let score = 100;
  const suggestions: string[] = [];
  const strengths: string[] = [];

  const wordCount = prompt.split(/\s+/).length;

  // Check minimum length
  if (wordCount < 20) {
    score -= 30;
    suggestions.push('Add more detail - prompts under 20 words often lack necessary context');
  } else if (wordCount >= 50) {
    strengths.push('Comprehensive prompt with adequate detail');
  }

  // Check for role/persona
  const hasRole = /you are|act as|as a|your role|imagine you|pretend|persona/i.test(prompt);
  if (hasRole) {
    strengths.push('Defines a clear role or persona');
  } else if (wordCount > 100) {
    score -= 5;
    suggestions.push('Consider defining a role (e.g., "Act as an expert...")');
  }

  // Check for expected output description
  const hasOutputDesc = /provide|generate|create|write|analyze|output|respond with|return|give me/i.test(prompt);
  if (hasOutputDesc) {
    strengths.push('Clearly describes expected output');
  } else {
    score -= 10;
    suggestions.push('Explicitly state what output you want (e.g., "Provide a detailed analysis...")');
  }

  // Check for examples
  const hasExamples = /example|for instance|such as|e\.g\.|like this|sample/i.test(prompt);
  if (hasExamples) {
    strengths.push('Includes examples for clarity');
  }

  // Check for constraints
  const hasConstraints = /must|should|avoid|don't|do not|limit|maximum|minimum|at least|no more than/i.test(prompt);
  if (hasConstraints) {
    strengths.push('Includes clear constraints and requirements');
  }

  return { score: Math.max(0, score), suggestions, strengths };
}

// Analyze prompt actionability
function scoreActionabilityRaw(prompt: string): { score: number; suggestions: string[]; strengths: string[] } {
  let score = 100;
  const suggestions: string[] = [];
  const strengths: string[] = [];

  // Check for action verbs
  const actionVerbs = ['analyze', 'create', 'generate', 'write', 'explain', 'compare', 'evaluate', 'summarize', 'list', 'describe', 'calculate', 'assess', 'identify', 'recommend', 'develop', 'design', 'review'];
  const hasActionVerbs = actionVerbs.some(v => prompt.toLowerCase().includes(v));

  if (hasActionVerbs) {
    strengths.push('Uses clear action verbs');
  } else {
    score -= 15;
    suggestions.push('Start with action verbs (analyze, create, evaluate, etc.)');
  }

  // Check for clear deliverable
  const hasDeliverable = /report|memo|summary|analysis|list|table|recommendation|plan|assessment|evaluation/i.test(prompt);
  if (hasDeliverable) {
    strengths.push('Specifies a clear deliverable');
  } else {
    score -= 10;
    suggestions.push('Specify the type of deliverable you need');
  }

  // Check for success criteria
  const hasSuccessCriteria = /should include|must contain|ensure|make sure|requirements|criteria/i.test(prompt);
  if (hasSuccessCriteria) {
    strengths.push('Defines success criteria');
  }

  return { score: Math.max(0, score), suggestions, strengths };
}

// Main scoring function
export function scorePrompt(prompt: string): PromptScore {
  if (!prompt || prompt.trim().length === 0) {
    return {
      overall: 0,
      categories: {
        clarity: 0,
        specificity: 0,
        structure: 0,
        completeness: 0,
        actionability: 0,
      },
      suggestions: ['Enter a prompt to get a quality score'],
      strengths: [],
    };
  }

  const clarityResult = scoreClarityRaw(prompt);
  const specificityResult = scoreSpecificityRaw(prompt);
  const structureResult = scoreStructureRaw(prompt);
  const completenessResult = scoreCompletenessRaw(prompt);
  const actionabilityResult = scoreActionabilityRaw(prompt);

  const categories = {
    clarity: clarityResult.score,
    specificity: specificityResult.score,
    structure: structureResult.score,
    completeness: completenessResult.score,
    actionability: actionabilityResult.score,
  };

  const overall = Math.round(
    categories.clarity * WEIGHTS.clarity +
    categories.specificity * WEIGHTS.specificity +
    categories.structure * WEIGHTS.structure +
    categories.completeness * WEIGHTS.completeness +
    categories.actionability * WEIGHTS.actionability
  );

  // Combine and deduplicate suggestions/strengths
  const allSuggestions = [
    ...clarityResult.suggestions,
    ...specificityResult.suggestions,
    ...structureResult.suggestions,
    ...completenessResult.suggestions,
    ...actionabilityResult.suggestions,
  ];

  const allStrengths = [
    ...clarityResult.strengths,
    ...specificityResult.strengths,
    ...structureResult.strengths,
    ...completenessResult.strengths,
    ...actionabilityResult.strengths,
  ];

  // Take top suggestions (prioritize lowest category scores)
  const sortedCategories = Object.entries(categories).sort((a, b) => a[1] - b[1]);
  const prioritizedSuggestions = allSuggestions.slice(0, 3);

  return {
    overall,
    categories,
    suggestions: prioritizedSuggestions,
    strengths: allStrengths.slice(0, 4),
  };
}

// Get score label and color
export function getScoreLabel(score: number): { label: string; color: string } {
  if (score >= 90) return { label: 'Excellent', color: '#059669' };
  if (score >= 75) return { label: 'Good', color: '#4ECDC4' };
  if (score >= 60) return { label: 'Fair', color: '#f59e0b' };
  if (score >= 40) return { label: 'Needs Work', color: '#f97316' };
  return { label: 'Poor', color: '#dc2626' };
}

// Generate improved prompt based on suggestions
export function improvePrompt(prompt: string): string {
  if (!prompt || prompt.trim().length === 0) return prompt;

  let improved = prompt;

  // Add structure if missing headers and prompt is long
  if (prompt.length > 300 && !/^#+\s+|\*\*[^*]+\*\*:/m.test(prompt)) {
    // Try to identify sections and add headers
    const sections = prompt.split(/\n\n+/);
    if (sections.length > 1) {
      improved = sections.map((section, i) => {
        if (i === 0) return `**Context:**\n${section}`;
        if (section.toLowerCase().includes('please') || section.toLowerCase().includes('provide')) {
          return `**Requirements:**\n${section}`;
        }
        return section;
      }).join('\n\n');
    }
  }

  // Remove vague words
  const vagueReplacements: Record<string, string> = {
    'sort of': '',
    'kind of': '',
    'maybe': 'consider',
    'stuff': 'items',
    'things': 'elements',
  };

  Object.entries(vagueReplacements).forEach(([vague, replacement]) => {
    const regex = new RegExp(`\\b${vague}\\b`, 'gi');
    improved = improved.replace(regex, replacement);
  });

  // Add format instruction if missing
  if (!/format|table|list|structure/i.test(improved) && improved.length > 100) {
    improved += '\n\n**Output Format:** Please structure your response with clear sections and bullet points where appropriate.';
  }

  return improved.trim();
}
