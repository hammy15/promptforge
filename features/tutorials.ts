// tutorials.ts - Interactive tutorials and onboarding guides
// Step-by-step learning, tooltips, achievements

// ============================================
// Types
// ============================================

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  category: TutorialCategory;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedMinutes: number;
  steps: TutorialStep[];
  prerequisites?: string[];
  tags: string[];
  completionReward?: Achievement;
}

export interface TutorialStep {
  id: string;
  title: string;
  content: string;
  type: StepType;
  target?: string; // CSS selector for highlighting
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center';
  action?: StepAction;
  validation?: StepValidation;
  hint?: string;
  codeExample?: string;
  media?: { type: 'image' | 'video'; url: string };
}

export type TutorialCategory =
  | 'getting-started'
  | 'prompt-engineering'
  | 'templates'
  | 'experiments'
  | 'analytics'
  | 'collaboration'
  | 'advanced';

export type StepType =
  | 'info'
  | 'action'
  | 'input'
  | 'quiz'
  | 'code'
  | 'checkpoint';

export interface StepAction {
  type: 'click' | 'input' | 'select' | 'navigate' | 'execute';
  target?: string;
  value?: string;
  url?: string;
}

export interface StepValidation {
  type: 'element_exists' | 'input_value' | 'quiz_answer' | 'execution_success';
  target?: string;
  expectedValue?: string | string[];
  errorMessage?: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  points: number;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
}

export interface UserProgress {
  tutorialId: string;
  userId: string;
  currentStepIndex: number;
  completedSteps: string[];
  startedAt: string;
  completedAt?: string;
  timeSpentMs: number;
}

// ============================================
// Tutorial Library
// ============================================

export const TUTORIALS: Tutorial[] = [
  // Getting Started
  {
    id: 'getting-started-basics',
    title: 'Welcome to PromptForge',
    description: 'Learn the basics of the prompt editor and create your first prompt.',
    category: 'getting-started',
    difficulty: 'beginner',
    estimatedMinutes: 5,
    tags: ['basics', 'editor', 'first-prompt'],
    steps: [
      {
        id: 'welcome',
        title: 'Welcome!',
        content: 'Welcome to PromptForge! This tutorial will guide you through creating your first AI prompt. Let\'s get started!',
        type: 'info',
        position: 'center',
      },
      {
        id: 'editor-overview',
        title: 'The Prompt Editor',
        content: 'This is the prompt editor where you\'ll write and test your prompts. It has two main sections: the system prompt and the user prompt.',
        type: 'info',
        target: '.prompt-editor',
        position: 'right',
      },
      {
        id: 'system-prompt',
        title: 'System Prompt',
        content: 'The system prompt sets the AI\'s behavior and role. Try typing: "You are a helpful assistant."',
        type: 'input',
        target: '.system-prompt-input',
        position: 'right',
        action: { type: 'input', target: '.system-prompt-input' },
        validation: {
          type: 'input_value',
          target: '.system-prompt-input',
          errorMessage: 'Please enter a system prompt',
        },
        hint: 'The system prompt is hidden from users but guides the AI\'s responses.',
      },
      {
        id: 'user-prompt',
        title: 'User Prompt',
        content: 'The user prompt is the actual question or task. Type: "Hello, how can you help me today?"',
        type: 'input',
        target: '.user-prompt-input',
        position: 'right',
        action: { type: 'input', target: '.user-prompt-input' },
        hint: 'This is what your users will see and interact with.',
      },
      {
        id: 'run-test',
        title: 'Test Your Prompt',
        content: 'Click the "Run Test" button to see how the AI responds to your prompt.',
        type: 'action',
        target: '.run-test-button',
        position: 'left',
        action: { type: 'click', target: '.run-test-button' },
        validation: {
          type: 'execution_success',
          errorMessage: 'Click the Run Test button to continue',
        },
      },
      {
        id: 'complete',
        title: 'Congratulations!',
        content: 'You\'ve created and tested your first prompt! You can now explore templates, add variables, and run experiments.',
        type: 'checkpoint',
        position: 'center',
      },
    ],
    completionReward: {
      id: 'first-prompt',
      name: 'First Prompt',
      description: 'Created your first prompt',
      icon: 'star',
      points: 10,
      rarity: 'common',
    },
  },

  // Prompt Engineering
  {
    id: 'prompt-engineering-variables',
    title: 'Using Variables',
    description: 'Learn how to create dynamic prompts with variables.',
    category: 'prompt-engineering',
    difficulty: 'beginner',
    estimatedMinutes: 7,
    tags: ['variables', 'templates', 'dynamic'],
    prerequisites: ['getting-started-basics'],
    steps: [
      {
        id: 'intro',
        title: 'Variables Make Prompts Reusable',
        content: 'Variables let you create template prompts that can be customized for different inputs. They use the syntax {{variableName}}.',
        type: 'info',
        position: 'center',
        codeExample: 'Translate the following {{language}}:\n\n{{text}}',
      },
      {
        id: 'add-variable',
        title: 'Adding a Variable',
        content: 'Type a prompt with a variable. For example: "Summarize this article: {{article}}"',
        type: 'input',
        target: '.user-prompt-input',
        position: 'right',
        hint: 'Variables are automatically detected and will appear in the variables panel.',
      },
      {
        id: 'variables-panel',
        title: 'Variables Panel',
        content: 'Notice how the variable appeared in the panel on the right. You can fill in values here.',
        type: 'info',
        target: '.variables-panel',
        position: 'left',
      },
      {
        id: 'fill-variable',
        title: 'Fill in the Variable',
        content: 'Enter a value for your variable to test the prompt.',
        type: 'input',
        target: '.variable-input',
        action: { type: 'input', target: '.variable-input' },
      },
      {
        id: 'test-with-variable',
        title: 'Test with Variable',
        content: 'Run the test to see how the prompt works with your variable value.',
        type: 'action',
        target: '.run-test-button',
        action: { type: 'click', target: '.run-test-button' },
      },
      {
        id: 'complete',
        title: 'Variables Mastered!',
        content: 'You now know how to use variables. Try adding multiple variables or using default values with {{variable:default}}.',
        type: 'checkpoint',
        position: 'center',
      },
    ],
    completionReward: {
      id: 'variable-master',
      name: 'Variable Master',
      description: 'Learned to use variables',
      icon: 'variable',
      points: 20,
      rarity: 'common',
    },
  },

  // Templates
  {
    id: 'templates-using',
    title: 'Using Templates',
    description: 'Discover pre-built templates and customize them for your needs.',
    category: 'templates',
    difficulty: 'beginner',
    estimatedMinutes: 5,
    tags: ['templates', 'library', 'quick-start'],
    steps: [
      {
        id: 'intro',
        title: 'Template Library',
        content: 'PromptForge includes 50+ pre-built templates for common tasks. Let\'s explore them!',
        type: 'info',
        position: 'center',
      },
      {
        id: 'open-templates',
        title: 'Open Templates',
        content: 'Click on "Templates" in the sidebar to view the library.',
        type: 'action',
        target: '.nav-templates',
        action: { type: 'click', target: '.nav-templates' },
      },
      {
        id: 'browse-categories',
        title: 'Browse Categories',
        content: 'Templates are organized by category. Click on a category to filter.',
        type: 'info',
        target: '.category-filter',
        position: 'bottom',
      },
      {
        id: 'preview-template',
        title: 'Preview a Template',
        content: 'Click on any template card to see a preview of the prompt.',
        type: 'action',
        target: '.template-card',
        action: { type: 'click', target: '.template-card' },
      },
      {
        id: 'use-template',
        title: 'Use This Template',
        content: 'Click "Use Template" to copy it to your editor where you can customize it.',
        type: 'action',
        target: '.use-template-button',
        action: { type: 'click', target: '.use-template-button' },
      },
      {
        id: 'complete',
        title: 'Templates Ready!',
        content: 'Great! You can now use any template as a starting point. Customize it to fit your specific needs.',
        type: 'checkpoint',
        position: 'center',
      },
    ],
    completionReward: {
      id: 'template-explorer',
      name: 'Template Explorer',
      description: 'Used your first template',
      icon: 'layout',
      points: 15,
      rarity: 'common',
    },
  },

  // Experiments
  {
    id: 'experiments-ab-testing',
    title: 'A/B Testing Prompts',
    description: 'Learn how to compare prompt variations and find the best performer.',
    category: 'experiments',
    difficulty: 'intermediate',
    estimatedMinutes: 10,
    tags: ['experiments', 'ab-testing', 'optimization'],
    prerequisites: ['getting-started-basics'],
    steps: [
      {
        id: 'intro',
        title: 'Why A/B Test Prompts?',
        content: 'Different phrasings can produce dramatically different results. A/B testing helps you find the optimal prompt.',
        type: 'info',
        position: 'center',
      },
      {
        id: 'create-experiment',
        title: 'Create an Experiment',
        content: 'Click "New Experiment" to start comparing prompts.',
        type: 'action',
        target: '.new-experiment-button',
        action: { type: 'click', target: '.new-experiment-button' },
      },
      {
        id: 'add-variants',
        title: 'Add Variants',
        content: 'Add 2-3 prompt variations you want to test. These will be run with the same inputs.',
        type: 'info',
        target: '.variant-editor',
        position: 'right',
        hint: 'Try varying the tone, structure, or level of detail in each variant.',
      },
      {
        id: 'define-metrics',
        title: 'Define Success Metrics',
        content: 'Choose how to measure success: response quality, speed, cost, or custom criteria.',
        type: 'info',
        target: '.metrics-selector',
        position: 'bottom',
      },
      {
        id: 'run-experiment',
        title: 'Run the Experiment',
        content: 'Click "Start Experiment" to begin testing your variants.',
        type: 'action',
        target: '.start-experiment-button',
        action: { type: 'click', target: '.start-experiment-button' },
      },
      {
        id: 'view-results',
        title: 'Analyze Results',
        content: 'View the results to see which variant performed best across your metrics.',
        type: 'info',
        target: '.experiment-results',
        position: 'top',
      },
      {
        id: 'complete',
        title: 'Experiment Complete!',
        content: 'You\'ve learned A/B testing! Use experiments regularly to continuously improve your prompts.',
        type: 'checkpoint',
        position: 'center',
      },
    ],
    completionReward: {
      id: 'scientist',
      name: 'Prompt Scientist',
      description: 'Completed your first experiment',
      icon: 'flask',
      points: 30,
      rarity: 'uncommon',
    },
  },

  // Advanced
  {
    id: 'advanced-chains',
    title: 'Prompt Chains',
    description: 'Build complex workflows by chaining multiple prompts together.',
    category: 'advanced',
    difficulty: 'advanced',
    estimatedMinutes: 15,
    tags: ['chains', 'workflows', 'advanced'],
    prerequisites: ['prompt-engineering-variables'],
    steps: [
      {
        id: 'intro',
        title: 'What are Prompt Chains?',
        content: 'Prompt chains let you connect multiple prompts where the output of one becomes the input for the next.',
        type: 'info',
        position: 'center',
        media: { type: 'image', url: '/tutorials/chain-diagram.png' },
      },
      {
        id: 'open-chains',
        title: 'Open Chain Editor',
        content: 'Navigate to the Chains section to create a new workflow.',
        type: 'action',
        target: '.nav-chains',
        action: { type: 'click', target: '.nav-chains' },
      },
      {
        id: 'add-first-node',
        title: 'Add First Node',
        content: 'Drag a prompt node onto the canvas. This will be the first step in your chain.',
        type: 'info',
        target: '.chain-canvas',
        position: 'center',
      },
      {
        id: 'configure-node',
        title: 'Configure the Node',
        content: 'Select a prompt and configure its variables. The output will be available to downstream nodes.',
        type: 'info',
        target: '.node-config',
        position: 'right',
      },
      {
        id: 'add-second-node',
        title: 'Add Processing Node',
        content: 'Add another node and connect it to the first. Use {{previousOutput}} to reference the result.',
        type: 'info',
        target: '.chain-canvas',
        position: 'center',
        codeExample: 'Based on this analysis:\n{{previousOutput}}\n\nGenerate recommendations:',
      },
      {
        id: 'add-condition',
        title: 'Add Conditional Logic',
        content: 'You can add condition nodes to branch your workflow based on outputs.',
        type: 'info',
        target: '.condition-node',
        position: 'left',
      },
      {
        id: 'test-chain',
        title: 'Test the Chain',
        content: 'Run the entire chain to see how data flows through each step.',
        type: 'action',
        target: '.run-chain-button',
        action: { type: 'click', target: '.run-chain-button' },
      },
      {
        id: 'complete',
        title: 'Chain Master!',
        content: 'You\'ve learned prompt chains! Build complex AI workflows by combining multiple prompts.',
        type: 'checkpoint',
        position: 'center',
      },
    ],
    completionReward: {
      id: 'chain-master',
      name: 'Chain Master',
      description: 'Built your first prompt chain',
      icon: 'link',
      points: 50,
      rarity: 'rare',
    },
  },
];

// ============================================
// Progress Management
// ============================================

/**
 * Start a tutorial for a user
 */
export function startTutorial(tutorialId: string, userId: string): UserProgress {
  return {
    tutorialId,
    userId,
    currentStepIndex: 0,
    completedSteps: [],
    startedAt: new Date().toISOString(),
    timeSpentMs: 0,
  };
}

/**
 * Advance to the next step
 */
export function advanceStep(
  progress: UserProgress,
  tutorial: Tutorial
): UserProgress {
  const currentStep = tutorial.steps[progress.currentStepIndex];

  if (!progress.completedSteps.includes(currentStep.id)) {
    progress.completedSteps.push(currentStep.id);
  }

  if (progress.currentStepIndex < tutorial.steps.length - 1) {
    progress.currentStepIndex++;
  } else {
    progress.completedAt = new Date().toISOString();
  }

  return { ...progress };
}

/**
 * Go back to previous step
 */
export function previousStep(progress: UserProgress): UserProgress {
  if (progress.currentStepIndex > 0) {
    progress.currentStepIndex--;
  }
  return { ...progress };
}

/**
 * Check if tutorial is completed
 */
export function isTutorialCompleted(progress: UserProgress): boolean {
  return progress.completedAt !== undefined;
}

/**
 * Get completion percentage
 */
export function getCompletionPercentage(
  progress: UserProgress,
  tutorial: Tutorial
): number {
  return Math.round((progress.completedSteps.length / tutorial.steps.length) * 100);
}

// ============================================
// Achievements
// ============================================

export const ACHIEVEMENTS: Achievement[] = [
  // Tutorial Completions
  { id: 'first-prompt', name: 'First Prompt', description: 'Created your first prompt', icon: 'star', points: 10, rarity: 'common' },
  { id: 'variable-master', name: 'Variable Master', description: 'Learned to use variables', icon: 'variable', points: 20, rarity: 'common' },
  { id: 'template-explorer', name: 'Template Explorer', description: 'Used your first template', icon: 'layout', points: 15, rarity: 'common' },
  { id: 'scientist', name: 'Prompt Scientist', description: 'Completed your first experiment', icon: 'flask', points: 30, rarity: 'uncommon' },
  { id: 'chain-master', name: 'Chain Master', description: 'Built your first prompt chain', icon: 'link', points: 50, rarity: 'rare' },

  // Usage Milestones
  { id: 'executor-10', name: 'Prompt Runner', description: 'Executed 10 prompts', icon: 'play', points: 10, rarity: 'common' },
  { id: 'executor-100', name: 'Power User', description: 'Executed 100 prompts', icon: 'zap', points: 50, rarity: 'uncommon' },
  { id: 'executor-1000', name: 'Prompt Master', description: 'Executed 1000 prompts', icon: 'crown', points: 100, rarity: 'rare' },

  // Creation
  { id: 'creator-5', name: 'Creator', description: 'Created 5 prompts', icon: 'edit', points: 20, rarity: 'common' },
  { id: 'creator-25', name: 'Prolific Creator', description: 'Created 25 prompts', icon: 'edit-2', points: 50, rarity: 'uncommon' },

  // Experiments
  { id: 'experimenter-5', name: 'Experimenter', description: 'Ran 5 experiments', icon: 'activity', points: 30, rarity: 'uncommon' },
  { id: 'optimizer', name: 'Optimizer', description: 'Found a winning variant with >20% improvement', icon: 'trending-up', points: 75, rarity: 'rare' },

  // Special
  { id: 'early-adopter', name: 'Early Adopter', description: 'Joined during beta', icon: 'flag', points: 100, rarity: 'epic' },
  { id: 'all-tutorials', name: 'Graduate', description: 'Completed all tutorials', icon: 'award', points: 200, rarity: 'legendary' },
];

/**
 * Check if user has earned an achievement
 */
export function checkAchievement(
  achievementId: string,
  userStats: {
    executionCount: number;
    promptCount: number;
    experimentCount: number;
    completedTutorials: string[];
    joinDate: string;
  }
): boolean {
  switch (achievementId) {
    case 'executor-10':
      return userStats.executionCount >= 10;
    case 'executor-100':
      return userStats.executionCount >= 100;
    case 'executor-1000':
      return userStats.executionCount >= 1000;
    case 'creator-5':
      return userStats.promptCount >= 5;
    case 'creator-25':
      return userStats.promptCount >= 25;
    case 'experimenter-5':
      return userStats.experimentCount >= 5;
    case 'early-adopter':
      return new Date(userStats.joinDate) < new Date('2025-06-01');
    case 'all-tutorials':
      return userStats.completedTutorials.length >= TUTORIALS.length;
    default:
      return false;
  }
}

/**
 * Get user's total points
 */
export function calculateTotalPoints(earnedAchievementIds: string[]): number {
  return earnedAchievementIds.reduce((total, id) => {
    const achievement = ACHIEVEMENTS.find((a) => a.id === id);
    return total + (achievement?.points || 0);
  }, 0);
}

// ============================================
// Tooltip System
// ============================================

export interface Tooltip {
  id: string;
  target: string;
  content: string;
  trigger: 'hover' | 'click' | 'focus';
  position: 'top' | 'bottom' | 'left' | 'right';
  showOnce?: boolean;
}

export const CONTEXTUAL_TOOLTIPS: Tooltip[] = [
  {
    id: 'model-selector',
    target: '.model-selector',
    content: 'Choose an AI model. Claude Haiku is fastest, Opus is most capable.',
    trigger: 'hover',
    position: 'bottom',
  },
  {
    id: 'temperature',
    target: '.temperature-slider',
    content: 'Higher temperature = more creative responses. Lower = more consistent.',
    trigger: 'hover',
    position: 'right',
  },
  {
    id: 'variable-syntax',
    target: '.variable-badge',
    content: 'Variables use {{name}} syntax. Add defaults with {{name:default}}.',
    trigger: 'click',
    position: 'top',
  },
  {
    id: 'cost-estimate',
    target: '.cost-badge',
    content: 'Estimated cost based on token count. Actual cost may vary slightly.',
    trigger: 'hover',
    position: 'left',
    showOnce: true,
  },
];
