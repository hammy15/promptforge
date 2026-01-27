// Style Examples for the Style Gallery
// Visual clickable examples that users can add to their prompts

export type StyleCategory = 'tone' | 'format' | 'structure' | 'persona' | 'technique';

export interface StyleExample {
  id: string;
  name: string;
  category: StyleCategory;
  icon: string;
  color: string;
  description: string;
  previewBefore: string;
  previewAfter: string;
  promptAdditions: string;
  tags: string[];
}

export const STYLE_CATEGORIES: { id: StyleCategory; name: string; icon: string }[] = [
  { id: 'tone', name: 'Tone', icon: '🎭' },
  { id: 'format', name: 'Format', icon: '📋' },
  { id: 'structure', name: 'Structure', icon: '🏗️' },
  { id: 'persona', name: 'Persona', icon: '👤' },
  { id: 'technique', name: 'Technique', icon: '⚡' },
];

export const STYLE_EXAMPLES: StyleExample[] = [
  // TONE
  {
    id: 'professional',
    name: 'Professional',
    category: 'tone',
    icon: '💼',
    color: '#3b82f6',
    description: 'Formal, business-appropriate language',
    previewBefore: 'Tell me about stocks',
    previewAfter: 'Provide a comprehensive analysis of equity market dynamics, including key performance indicators and risk metrics.',
    promptAdditions: 'Use formal, professional language appropriate for business communications. Avoid colloquialisms and maintain an authoritative tone.',
    tags: ['formal', 'business', 'corporate'],
  },
  {
    id: 'casual',
    name: 'Casual & Friendly',
    category: 'tone',
    icon: '😊',
    color: '#10b981',
    description: 'Approachable, conversational style',
    previewBefore: 'Explain machine learning',
    previewAfter: 'Hey! Let me break down machine learning in a way that actually makes sense...',
    promptAdditions: 'Use a friendly, conversational tone. Feel free to use casual language and relatable examples. Make the content approachable and engaging.',
    tags: ['friendly', 'conversational', 'approachable'],
  },
  {
    id: 'technical',
    name: 'Technical',
    category: 'tone',
    icon: '🔧',
    color: '#8b5cf6',
    description: 'Precise, technical terminology',
    previewBefore: 'How does a database work?',
    previewAfter: 'Database systems implement ACID properties through transaction management, utilizing B-tree indexes for O(log n) query complexity...',
    promptAdditions: 'Use precise technical terminology. Assume the reader has domain expertise. Include specific metrics, algorithms, and implementation details.',
    tags: ['technical', 'precise', 'expert'],
  },
  {
    id: 'empathetic',
    name: 'Empathetic',
    category: 'tone',
    icon: '💚',
    color: '#14b8a6',
    description: 'Understanding, supportive communication',
    previewBefore: 'I made a mistake at work',
    previewAfter: 'I understand that can be really stressful. Mistakes happen to everyone, and what matters most is how we learn from them...',
    promptAdditions: 'Respond with empathy and understanding. Acknowledge emotions and provide supportive guidance. Be encouraging without dismissing concerns.',
    tags: ['supportive', 'understanding', 'kind'],
  },

  // FORMAT
  {
    id: 'step-by-step',
    name: 'Step-by-Step',
    category: 'format',
    icon: '📝',
    color: '#f97316',
    description: 'Clear numbered instructions',
    previewBefore: 'How to deploy an app',
    previewAfter: '1. Prepare your code\n2. Configure environment\n3. Set up CI/CD\n4. Deploy to staging\n5. Run tests\n6. Deploy to production',
    promptAdditions: 'Format your response as numbered steps. Each step should be clear and actionable. Include any prerequisites at the beginning.',
    tags: ['instructions', 'numbered', 'guide'],
  },
  {
    id: 'comparison-table',
    name: 'Comparison Table',
    category: 'format',
    icon: '📊',
    color: '#3b82f6',
    description: 'Side-by-side feature comparison',
    previewBefore: 'React vs Vue',
    previewAfter: '| Feature | React | Vue |\n|---------|-------|-----|\n| Learning Curve | Moderate | Easy |\n| Performance | High | High |',
    promptAdditions: 'Present information in a comparison table format with clear columns and rows. Include relevant criteria for comparison.',
    tags: ['table', 'comparison', 'features'],
  },
  {
    id: 'pros-cons',
    name: 'Pros & Cons',
    category: 'format',
    icon: '⚖️',
    color: '#10b981',
    description: 'Balanced advantages and disadvantages',
    previewBefore: 'Should I use microservices?',
    previewAfter: '**Pros:**\n✅ Scalability\n✅ Team autonomy\n\n**Cons:**\n❌ Complexity\n❌ Network overhead',
    promptAdditions: 'Structure your response with clear Pros and Cons sections. Use checkmarks (✅) for pros and X marks (❌) for cons. Be balanced and objective.',
    tags: ['balanced', 'analysis', 'decision'],
  },
  {
    id: 'bullet-points',
    name: 'Bullet Points',
    category: 'format',
    icon: '•',
    color: '#64748b',
    description: 'Concise, scannable bullet list',
    previewBefore: 'Key features of TypeScript',
    previewAfter: '• Static type checking\n• Enhanced IDE support\n• Interfaces and generics\n• Better code organization',
    promptAdditions: 'Format your response as concise bullet points. Each point should be brief and focused on a single idea.',
    tags: ['concise', 'list', 'scannable'],
  },

  // STRUCTURE
  {
    id: 'costar',
    name: 'COSTAR Framework',
    category: 'structure',
    icon: '⭐',
    color: '#4ECDC4',
    description: 'Context, Objective, Style, Tone, Audience, Response',
    previewBefore: 'Write a product description',
    previewAfter: '**Context:** [Background]\n**Objective:** [Goal]\n**Style:** [Approach]\n**Tone:** [Voice]\n**Audience:** [Target]\n**Response:** [Format]',
    promptAdditions: 'Follow the COSTAR framework:\n- Context: Provide background information\n- Objective: State the clear goal\n- Style: Define the approach\n- Tone: Specify the voice\n- Audience: Identify the target reader\n- Response: Define expected output format',
    tags: ['framework', 'structured', 'comprehensive'],
  },
  {
    id: 'chain-of-thought',
    name: 'Chain of Thought',
    category: 'structure',
    icon: '🔗',
    color: '#8b5cf6',
    description: 'Step-by-step reasoning process',
    previewBefore: 'Solve this math problem',
    previewAfter: 'Let me work through this step by step:\n1. First, I identify...\n2. Then, I calculate...\n3. This means...\n4. Therefore, the answer is...',
    promptAdditions: 'Think through this step by step. Show your reasoning process explicitly. Before giving a final answer, work through the logic.',
    tags: ['reasoning', 'logical', 'transparent'],
  },
  {
    id: 'few-shot',
    name: 'Few-Shot Examples',
    category: 'structure',
    icon: '📚',
    color: '#f97316',
    description: 'Learn from provided examples',
    previewBefore: 'Classify this text',
    previewAfter: 'Example 1: "Great product!" → Positive\nExample 2: "Terrible service" → Negative\nNow classify: "Amazing experience" → Positive',
    promptAdditions: 'Here are some examples of the expected input/output format:\n\nExample 1:\nInput: [example]\nOutput: [example]\n\nExample 2:\nInput: [example]\nOutput: [example]\n\nNow apply this pattern to the following:',
    tags: ['examples', 'learning', 'pattern'],
  },
  {
    id: 'tldr-detailed',
    name: 'TL;DR + Details',
    category: 'structure',
    icon: '📄',
    color: '#3b82f6',
    description: 'Summary first, then full explanation',
    previewBefore: 'Explain cloud computing',
    previewAfter: '**TL;DR:** Cloud computing delivers computing services over the internet.\n\n**Details:**\nCloud computing encompasses...',
    promptAdditions: 'Start with a brief TL;DR summary (1-2 sentences), then provide detailed explanation. This helps readers quickly grasp the key point before diving deeper.',
    tags: ['summary', 'detailed', 'layered'],
  },

  // PERSONA
  {
    id: 'expert-advisor',
    name: 'Expert Advisor',
    category: 'persona',
    icon: '🎓',
    color: '#8b5cf6',
    description: 'Deep domain expertise',
    previewBefore: 'Review my investment strategy',
    previewAfter: 'As a senior investment strategist with 20+ years of experience, I see several opportunities to optimize your portfolio...',
    promptAdditions: 'You are a senior expert with 20+ years of experience in this field. Provide advice based on deep domain knowledge, industry best practices, and practical experience. Reference relevant frameworks and methodologies.',
    tags: ['expert', 'professional', 'authoritative'],
  },
  {
    id: 'teacher',
    name: 'Patient Teacher',
    category: 'persona',
    icon: '👨‍🏫',
    color: '#10b981',
    description: 'Educational, builds understanding',
    previewBefore: 'Explain neural networks',
    previewAfter: "Let's start with the basics. Imagine your brain has billions of tiny workers called neurons. A neural network works similarly...",
    promptAdditions: 'You are a patient teacher explaining concepts to a student. Start from fundamentals, use analogies, check understanding, and build up to complex ideas gradually. Encourage questions.',
    tags: ['educational', 'patient', 'clear'],
  },
  {
    id: 'devils-advocate',
    name: "Devil's Advocate",
    category: 'persona',
    icon: '😈',
    color: '#ef4444',
    description: 'Challenges assumptions',
    previewBefore: 'This is a great business idea',
    previewAfter: 'While I see the potential, let me challenge some assumptions: What if the market size is overestimated? Have you considered...',
    promptAdditions: "Act as a devil's advocate. Challenge assumptions, identify potential weaknesses, and ask tough questions. Be constructively critical while remaining respectful.",
    tags: ['critical', 'challenging', 'thorough'],
  },
  {
    id: 'creative-partner',
    name: 'Creative Partner',
    category: 'persona',
    icon: '🎨',
    color: '#ec4899',
    description: 'Imaginative brainstorming',
    previewBefore: 'I need marketing ideas',
    previewAfter: "Ooh, what if we created an interactive experience where customers... Or we could flip the script entirely and...",
    promptAdditions: 'You are a creative brainstorming partner. Think outside the box, suggest unconventional ideas, build on concepts, and encourage exploration. No idea is too wild at this stage.',
    tags: ['creative', 'brainstorming', 'innovative'],
  },

  // TECHNIQUE
  {
    id: 'socratic',
    name: 'Socratic Method',
    category: 'technique',
    icon: '❓',
    color: '#f97316',
    description: 'Guide through questions',
    previewBefore: 'What should I do?',
    previewAfter: "That's an interesting situation. What do you think would happen if you tried approach A? And what concerns do you have about approach B?",
    promptAdditions: 'Use the Socratic method. Instead of giving direct answers, guide the user to discover insights through thoughtful questions. Help them think through the problem.',
    tags: ['questions', 'discovery', 'guided'],
  },
  {
    id: 'first-principles',
    name: 'First Principles',
    category: 'technique',
    icon: '🔬',
    color: '#3b82f6',
    description: 'Break down to fundamentals',
    previewBefore: 'How can I reduce costs?',
    previewAfter: "Let's break this down to first principles. What are you actually trying to achieve? What are the fundamental components of your cost structure?",
    promptAdditions: 'Apply first principles thinking. Break down the problem into its most fundamental components. Question assumptions and rebuild understanding from the ground up.',
    tags: ['fundamental', 'analytical', 'deep'],
  },
  {
    id: 'swot-analysis',
    name: 'SWOT Analysis',
    category: 'technique',
    icon: '📈',
    color: '#10b981',
    description: 'Strengths, Weaknesses, Opportunities, Threats',
    previewBefore: 'Evaluate this strategy',
    previewAfter: '**Strengths:** [internal positives]\n**Weaknesses:** [internal negatives]\n**Opportunities:** [external positives]\n**Threats:** [external risks]',
    promptAdditions: 'Analyze using the SWOT framework:\n- Strengths: Internal advantages\n- Weaknesses: Internal limitations\n- Opportunities: External factors to leverage\n- Threats: External risks to mitigate',
    tags: ['strategic', 'analysis', 'business'],
  },
  {
    id: 'role-play',
    name: 'Role Play Scenario',
    category: 'technique',
    icon: '🎭',
    color: '#8b5cf6',
    description: 'Interactive scenario practice',
    previewBefore: 'Help me practice negotiations',
    previewAfter: "*As the vendor* I appreciate your interest. Our standard price is $50,000, but I'd like to understand your needs better. What's driving this purchase?",
    promptAdditions: 'Engage in role play. Take on the specified role and respond as that character would. Stay in character and make the scenario realistic and educational.',
    tags: ['interactive', 'practice', 'simulation'],
  },
];

export function getStylesByCategory(category: StyleCategory): StyleExample[] {
  return STYLE_EXAMPLES.filter(s => s.category === category);
}

export function getStyleById(id: string): StyleExample | undefined {
  return STYLE_EXAMPLES.find(s => s.id === id);
}

export function searchStyles(query: string): StyleExample[] {
  const lower = query.toLowerCase();
  return STYLE_EXAMPLES.filter(s =>
    s.name.toLowerCase().includes(lower) ||
    s.description.toLowerCase().includes(lower) ||
    s.tags.some(t => t.toLowerCase().includes(lower))
  );
}
