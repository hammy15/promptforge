import { WalkthroughStep } from '../components/ui/Walkthrough';

export const BUILDER_WALKTHROUGH: WalkthroughStep[] = [
  {
    title: 'Welcome to Prompt Builder!',
    content: 'This tool helps you create powerful prompts for AI assistants like Claude, ChatGPT, Gemini, and Grok - no experience needed. Let me show you how it works.',
    position: 'center',
  },
  {
    target: '[data-tour="intent-input"]',
    title: 'Describe Your Task',
    content: 'Start by typing what you want the AI to help you with. Be specific! For example: "Write a Python script that organizes my photos by date" or "Help me write a professional email".',
    position: 'bottom',
  },
  {
    target: '[data-tour="quick-starts"]',
    title: 'Quick Start Options',
    content: 'Not sure what to type? Click any of these buttons to get started with common tasks. They\'ll fill in a starting point for you.',
    position: 'top',
  },
  {
    target: '[data-tour="task-detection"]',
    title: 'Smart Detection',
    content: 'As you type, we automatically detect what kind of task you\'re working on and suggest the best AI for the job. You can always change this in the next step.',
    position: 'bottom',
  },
  {
    title: 'That\'s the Basics!',
    content: 'After you describe your task, you\'ll pick your AI, customize some options, and get a ready-to-use prompt. It only takes about 60 seconds! Click "Get Started" to try it yourself.',
    position: 'center',
  },
];

export const PLAYGROUND_WALKTHROUGH: WalkthroughStep[] = [
  {
    title: 'Welcome to the Playground!',
    content: 'This is where you can test and refine your prompts. You can write prompts, run them against AI models, and see the results instantly.',
    position: 'center',
  },
  {
    target: '[data-tour="prompt-editor"]',
    title: 'Prompt Editor',
    content: 'Write or paste your prompt here. This is what you\'ll send to the AI. The editor shows character count and estimates token usage.',
    position: 'right',
  },
  {
    target: '[data-tour="model-selector"]',
    title: 'Choose Your Model',
    content: 'Select which AI model to use. Different models have different strengths - some are faster, some are better at coding, some are better at creative writing.',
    position: 'bottom',
  },
  {
    target: '[data-tour="variables-panel"]',
    title: 'Variables',
    content: 'Add variables to make your prompts reusable. Use {{variable_name}} in your prompt, and fill in different values each time you run it.',
    position: 'left',
  },
  {
    target: '[data-tour="run-button"]',
    title: 'Run Your Prompt',
    content: 'Click this button to send your prompt to the AI. The response will appear in the output panel. You can also use Cmd/Ctrl + Enter.',
    position: 'bottom',
  },
  {
    target: '[data-tour="output-panel"]',
    title: 'AI Response',
    content: 'See the AI\'s response here. You can copy it, regenerate with different settings, or tweak your prompt and try again.',
    position: 'left',
  },
  {
    title: 'You\'re Ready!',
    content: 'That\'s everything you need to know. Start experimenting with different prompts and models. The more you practice, the better your prompts will become!',
    position: 'center',
  },
];

export const DASHBOARD_WALKTHROUGH: WalkthroughStep[] = [
  {
    title: 'Welcome to PromptForge!',
    content: 'This is your command center for creating AI prompts. Let me give you a quick tour of what you can do here.',
    position: 'center',
  },
  {
    target: '[data-tour="nav-builder"]',
    title: 'Prompt Builder',
    content: 'Click here to create new prompts with our guided wizard. It walks you through each step and helps you build powerful prompts without any prior experience.',
    position: 'bottom',
  },
  {
    target: '[data-tour="nav-prompts"]',
    title: 'My Prompts',
    content: 'Browse your saved prompts and templates created by experts. You can use these as starting points for your own work.',
    position: 'bottom',
  },
  {
    target: '[data-tour="nav-playground"]',
    title: 'Playground',
    content: 'Test your prompts in real-time. Write, run, and iterate on prompts with instant feedback from AI models.',
    position: 'bottom',
  },
  {
    target: '[data-tour="quick-stats"]',
    title: 'Quick Stats',
    content: 'Track your usage at a glance - how many prompts you\'ve run, costs, and available templates.',
    position: 'right',
  },
  {
    target: '[data-tour="quick-start"]',
    title: 'Quick Start',
    content: 'Jump straight into common workflows. Click any category to start working with pre-configured templates.',
    position: 'left',
  },
  {
    target: '[data-tour="templates"]',
    title: 'Template Library',
    content: 'Browse our collection of expert-crafted prompt templates. Each one is optimized for specific tasks and ready to use.',
    position: 'top',
  },
  {
    title: 'Ready to Build!',
    content: 'That\'s the tour! Start with the Prompt Builder if you\'re new, or jump straight into the Playground if you know what you want. Click the help button anytime to see this tour again.',
    position: 'center',
  },
];

// Tooltips content for various UI elements
export const TOOLTIPS = {
  // Builder page
  intentInput: 'Describe what you want the AI to help you with. Be specific about your goal.',
  quickStarts: 'Click to quickly start with a common task type.',
  llmCards: 'Choose which AI assistant will run your prompt. Each has different strengths.',
  detailBrief: 'Short, to-the-point answers. Best for simple questions.',
  detailDetailed: 'Thorough answers with explanations. Good balance of depth and length.',
  detailComprehensive: 'Exhaustive coverage including edge cases. Uses more tokens.',
  toneCasual: 'Friendly, conversational style. Good for learning.',
  toneProfessional: 'Business-appropriate language. Great for work.',
  toneTechnical: 'Precise terminology. Best for developers and experts.',
  includeSteps: 'Break responses into numbered steps. Makes complex tasks easier to follow.',
  includeErrors: 'Consider what could go wrong. Essential for production code.',
  livePreview: 'See your prompt being built in real-time as you make choices.',
  copyButton: 'Copy the generated prompt to your clipboard.',
  testPlayground: 'Open this prompt in the Playground to test it with real AI.',

  // Playground page
  promptEditor: 'Write your prompt here. Use {{variable}} syntax for reusable parts.',
  modelSelector: 'Different models have different capabilities and costs.',
  runButton: 'Send your prompt to the AI and see the response.',
  variablesPanel: 'Define values that get inserted into your prompt.',
  outputPanel: 'The AI\'s response appears here after you run your prompt.',
  tokenCount: 'Tokens are the units AI models use. More tokens = higher cost.',
  temperature: 'Higher = more creative. Lower = more focused and deterministic.',

  // Dashboard page
  recentWork: 'Your most recent prompt activity.',
  quickStart: 'Pre-configured workflows for common tasks.',
  templateCard: 'Click to use this template in the Playground.',
  categoryFilter: 'Filter templates by category.',
};
