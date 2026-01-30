'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Icons } from '../components/Icons';
import { ThemeToggle } from '../components/ThemeToggle';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface SavedPrompt {
  id: string;
  name: string;
  prompt: string;
  taskType: string;
  createdAt: string;
  isFavorite: boolean;
}

interface CodeFile {
  id: string;
  name: string;
  content: string;
  language: string;
}

interface PromptChainStep {
  id: string;
  name: string;
  prompt: string;
  order: number;
}

interface PromptScore {
  overall: number;
  specificity: number;
  clarity: number;
  completeness: number;
  structure: number;
  suggestions: string[];
}

// Question-based template types
interface TemplateQuestion {
  id: string;
  question: string;
  placeholder: string;
  type: 'text' | 'textarea' | 'select' | 'multiselect';
  options?: string[];
  helpText?: string;
}

interface NarrativeTemplate {
  id: string;
  name: string;
  icon: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
  questions: TemplateQuestion[];
  generatePrompt: (answers: Record<string, string>) => string;
}

// ============================================================================
// NARRATIVE-DRIVEN TEMPLATES - Simple Questions → Powerful Prompts
// ============================================================================

const NARRATIVE_TEMPLATES: NarrativeTemplate[] = [
  {
    id: 'web-app',
    name: 'Build a Web App',
    icon: '🌐',
    description: 'Create any web application from scratch',
    category: 'Build',
    difficulty: 'Beginner',
    estimatedTime: '2-3 min',
    questions: [
      {
        id: 'appName',
        question: 'What do you want to call your app?',
        placeholder: 'e.g., TaskMaster, RecipeHub, BudgetBuddy',
        type: 'text',
        helpText: 'Pick a fun name! This helps Claude understand the vibe.'
      },
      {
        id: 'purpose',
        question: 'In one sentence, what will this app do?',
        placeholder: 'e.g., Help people track their daily habits',
        type: 'text',
        helpText: 'Keep it simple - just the main purpose.'
      },
      {
        id: 'users',
        question: 'Who will use this app?',
        placeholder: 'e.g., Students, small business owners, fitness enthusiasts',
        type: 'text',
        helpText: 'Knowing your users helps Claude make better design choices.'
      },
      {
        id: 'features',
        question: 'List 3-5 main features you want:',
        placeholder: 'e.g., User login, Dashboard, Add/edit items, Search, Export data',
        type: 'textarea',
        helpText: 'Just list them - Claude will figure out the details!'
      },
      {
        id: 'style',
        question: 'What style/vibe do you want?',
        placeholder: 'e.g., Modern and minimal, Colorful and fun, Professional and clean',
        type: 'text',
        helpText: 'Describe the look and feel you\'re going for.'
      },
      {
        id: 'framework',
        question: 'Any tech preference?',
        placeholder: '',
        type: 'select',
        options: ['Let Claude decide', 'React', 'Next.js', 'Vue', 'Svelte', 'Plain HTML/CSS/JS'],
        helpText: 'Not sure? Let Claude pick the best option!'
      },
    ],
    generatePrompt: (answers) => `<task>
Build a web application called "${answers.appName || 'My App'}"

Purpose: ${answers.purpose || 'A useful web application'}

Target Users: ${answers.users || 'General users'}
</task>

<context>
I'm building this app ${answers.framework === 'Let Claude decide' ? 'and I\'d like you to recommend the best tech stack for this use case' : `using ${answers.framework}`}. I want it to feel ${answers.style || 'modern and clean'}.

Please treat me as someone who wants to understand the code - include helpful comments and explain your decisions.
</context>

<features>
The app needs these core features:
${answers.features ? answers.features.split('\n').map(f => f.trim()).filter(f => f).map(f => `- ${f}`).join('\n') : '- Basic CRUD functionality\n- User-friendly interface\n- Data persistence'}
</features>

<requirements>
Technical Requirements:
- Clean, well-organized code structure
- Responsive design (works on mobile and desktop)
- Proper error handling with user-friendly messages
- Loading states for async operations
- Form validation where needed
- Accessible (keyboard navigation, screen reader friendly)

Code Quality:
- Use modern best practices
- Add helpful comments explaining key logic
- Keep components/functions small and focused
- Use meaningful variable and function names
</requirements>

<output-instructions>
Please provide:

1. **Project Overview** - Brief explanation of the architecture and why you chose it

2. **Project Structure** - Show me the folder/file structure first

3. **Complete Code** - All files with:
   - Inline comments explaining important parts
   - Clear section headers
   - Any configuration files needed

4. **Setup Instructions** - Step-by-step how to run it locally

5. **What's Next** - Suggestions for features I could add later

Format the code in proper code blocks with syntax highlighting. Make sure everything is complete and runnable - no placeholders or "add your code here" sections.
</output-instructions>`
  },
  {
    id: 'landing-page',
    name: 'Landing Page',
    icon: '🚀',
    description: 'Beautiful marketing or product landing page',
    category: 'Build',
    difficulty: 'Beginner',
    estimatedTime: '2 min',
    questions: [
      {
        id: 'product',
        question: 'What are you promoting?',
        placeholder: 'e.g., A productivity app, Online course, SaaS product, Personal portfolio',
        type: 'text',
      },
      {
        id: 'headline',
        question: 'What\'s your main headline/message?',
        placeholder: 'e.g., "Get more done in less time" or "Learn to code in 30 days"',
        type: 'text',
        helpText: 'The big text visitors see first'
      },
      {
        id: 'sections',
        question: 'What sections do you need?',
        placeholder: '',
        type: 'multiselect',
        options: ['Hero with CTA', 'Features grid', 'Testimonials', 'Pricing table', 'FAQ', 'Contact form', 'Newsletter signup', 'Footer'],
      },
      {
        id: 'colors',
        question: 'What colors represent your brand?',
        placeholder: 'e.g., Blue and white, Dark with orange accents, Soft pastels',
        type: 'text',
      },
      {
        id: 'cta',
        question: 'What should the main button say?',
        placeholder: 'e.g., Get Started Free, Sign Up Now, Download App, Book a Demo',
        type: 'text',
      },
    ],
    generatePrompt: (answers) => `<task>
Create a stunning, conversion-optimized landing page for: ${answers.product || 'a product/service'}

Main Headline: "${answers.headline || 'Transform the way you work'}"
Primary CTA: "${answers.cta || 'Get Started'}"
</task>

<design-requirements>
Visual Style:
- Color scheme: ${answers.colors || 'Modern, professional colors'}
- Clean, modern aesthetic with plenty of whitespace
- Smooth scroll animations and micro-interactions
- Mobile-first responsive design
- High-contrast text for readability

Sections to include:
${answers.sections ? answers.sections.split(',').map(s => `- ${s.trim()}`).join('\n') : `- Hero section with headline and CTA
- Features/benefits grid
- Social proof/testimonials
- Call to action
- Footer`}
</design-requirements>

<technical-requirements>
- Use HTML, CSS (Tailwind preferred), and vanilla JavaScript
- Semantic HTML for SEO
- Fast loading (optimize for performance)
- Accessible (WCAG 2.1 AA)
- Smooth animations using CSS transitions
- Working contact/signup form (frontend validation)
</technical-requirements>

<output-instructions>
Create a complete, production-ready landing page:

1. **Single HTML file** with embedded styles (or separate CSS file)
2. Include placeholder images using Unsplash or placeholder services
3. Add realistic copy/content (not lorem ipsum)
4. Include hover states, transitions, and micro-animations
5. Make the CTA buttons prominent and clickable-looking
6. Add a subtle gradient or background pattern
7. Include responsive breakpoints for tablet and mobile

The page should look like it was designed by a professional - not a generic template. Make it memorable!
</output-instructions>`
  },
  {
    id: 'api-backend',
    name: 'REST API / Backend',
    icon: '🔌',
    description: 'Build a production-ready API',
    category: 'Build',
    difficulty: 'Intermediate',
    estimatedTime: '3 min',
    questions: [
      {
        id: 'purpose',
        question: 'What does this API do?',
        placeholder: 'e.g., Manages user accounts and orders for an e-commerce site',
        type: 'text',
      },
      {
        id: 'resources',
        question: 'What data/resources will it manage?',
        placeholder: 'e.g., Users, Products, Orders, Reviews',
        type: 'textarea',
        helpText: 'List the main things your API will handle'
      },
      {
        id: 'auth',
        question: 'What authentication do you need?',
        placeholder: '',
        type: 'select',
        options: ['None (public API)', 'API Key', 'JWT tokens', 'OAuth 2.0', 'Session-based'],
      },
      {
        id: 'database',
        question: 'What database?',
        placeholder: '',
        type: 'select',
        options: ['PostgreSQL', 'MongoDB', 'MySQL', 'SQLite', 'Let Claude decide'],
      },
      {
        id: 'features',
        question: 'Any special features needed?',
        placeholder: '',
        type: 'multiselect',
        options: ['Rate limiting', 'Caching', 'File uploads', 'Webhooks', 'Real-time (WebSockets)', 'Search/filtering', 'Pagination'],
      },
    ],
    generatePrompt: (answers) => `<task>
Build a production-ready REST API

Purpose: ${answers.purpose || 'A backend API service'}

Resources/Entities:
${answers.resources ? answers.resources.split('\n').map(r => `- ${r.trim()}`).filter(r => r !== '-').join('\n') : '- Users\n- Items'}
</task>

<technical-stack>
- Runtime: Node.js with Express (or recommend better if appropriate)
- Database: ${answers.database === 'Let Claude decide' ? 'Recommend the best option for this use case' : answers.database}
- Authentication: ${answers.auth || 'JWT tokens'}
- Validation: Zod or Joi
- ORM: Prisma (for SQL) or Mongoose (for MongoDB)
</technical-stack>

<api-requirements>
Core Features:
- Full CRUD operations for each resource
- Proper HTTP status codes
- Consistent JSON response format
- Input validation on all endpoints
- Error handling middleware
${answers.features ? `\nAdditional Features:\n${answers.features.split(',').map(f => `- ${f.trim()}`).join('\n')}` : ''}

Security:
- Helmet.js for security headers
- CORS configuration
- Input sanitization
- SQL injection prevention
- Rate limiting on sensitive endpoints

Code Quality:
- Clean folder structure (routes, controllers, services, models)
- Environment variables for configuration
- Comprehensive error messages (dev) vs generic (prod)
- Request logging
</api-requirements>

<output-instructions>
Provide a complete, working API:

1. **Project Structure** - Show folder layout first

2. **All Source Files** including:
   - Entry point (app.js/index.js)
   - Route definitions
   - Controllers
   - Models/schemas
   - Middleware
   - Utility functions
   - Configuration files

3. **Database Setup**
   - Schema/migration files
   - Seed data script

4. **Configuration Files**
   - package.json with all dependencies
   - .env.example
   - Docker compose (optional but nice)

5. **API Documentation**
   - List all endpoints with methods, params, and example responses
   - Or generate OpenAPI/Swagger spec

6. **README** with:
   - Setup instructions
   - Environment variables needed
   - How to run locally
   - How to test the endpoints

Make it production-ready - something I could deploy today!
</output-instructions>`
  },
  {
    id: 'fix-my-bug',
    name: 'Fix My Bug',
    icon: '🐛',
    description: 'Debug and fix issues in your code',
    category: 'Fix',
    difficulty: 'Beginner',
    estimatedTime: '1 min',
    questions: [
      {
        id: 'expected',
        question: 'What should happen?',
        placeholder: 'e.g., When I click the button, it should save the data and show a success message',
        type: 'textarea',
        helpText: 'Describe what you expected to happen'
      },
      {
        id: 'actual',
        question: 'What actually happens?',
        placeholder: 'e.g., Nothing happens when I click, or I get an error message',
        type: 'textarea',
        helpText: 'Describe what\'s going wrong'
      },
      {
        id: 'error',
        question: 'Any error messages? (paste them here)',
        placeholder: 'e.g., TypeError: Cannot read property \'map\' of undefined',
        type: 'textarea',
        helpText: 'Check the browser console or terminal'
      },
      {
        id: 'code',
        question: 'Paste the relevant code:',
        placeholder: 'Paste the code that\'s not working...',
        type: 'textarea',
      },
      {
        id: 'tried',
        question: 'What have you already tried?',
        placeholder: 'e.g., I tried adding console.log, checked if the variable exists',
        type: 'textarea',
        helpText: 'This helps avoid suggesting things you\'ve already done'
      },
    ],
    generatePrompt: (answers) => `<task>
Help me debug and fix this issue in my code.
</task>

<problem-description>
**Expected Behavior:**
${answers.expected || 'Not specified'}

**Actual Behavior:**
${answers.actual || 'Not specified'}

**Error Messages:**
\`\`\`
${answers.error || 'No error messages provided'}
\`\`\`
</problem-description>

<code>
\`\`\`
${answers.code || '// No code provided'}
\`\`\`
</code>

<context>
What I've already tried:
${answers.tried || 'Nothing specific yet'}
</context>

<what-i-need>
Please help me by:

1. **Identifying the Bug** - Explain what's causing the issue in simple terms

2. **The Fix** - Show me the corrected code with the fix clearly highlighted

3. **Why It Works** - Explain why this fix solves the problem

4. **Prevention Tips** - How can I avoid similar bugs in the future?

Please be specific and show the exact changes needed. Use comments in the code to highlight what you changed and why.
</what-i-need>`
  },
  {
    id: 'add-feature',
    name: 'Add a Feature',
    icon: '✨',
    description: 'Add new functionality to existing code',
    category: 'Enhance',
    difficulty: 'Intermediate',
    estimatedTime: '2 min',
    questions: [
      {
        id: 'feature',
        question: 'What feature do you want to add?',
        placeholder: 'e.g., Dark mode toggle, Search functionality, User authentication',
        type: 'text',
      },
      {
        id: 'context',
        question: 'Briefly describe your current app/code:',
        placeholder: 'e.g., A React todo app with add/delete functionality',
        type: 'textarea',
        helpText: 'What does your app currently do?'
      },
      {
        id: 'code',
        question: 'Paste relevant existing code:',
        placeholder: 'Paste the code where the feature should be added...',
        type: 'textarea',
        helpText: 'Include the files/components that will need changes'
      },
      {
        id: 'behavior',
        question: 'How should the feature work?',
        placeholder: 'e.g., User clicks button → modal opens → fills form → saves to database → shows success',
        type: 'textarea',
        helpText: 'Describe the user flow step by step'
      },
      {
        id: 'constraints',
        question: 'Any constraints or requirements?',
        placeholder: 'e.g., Must work with existing auth, No new dependencies, Keep it simple',
        type: 'textarea',
      },
    ],
    generatePrompt: (answers) => `<task>
Add a new feature to my existing application: ${answers.feature || 'New feature'}
</task>

<current-app>
${answers.context || 'An existing application'}
</current-app>

<existing-code>
\`\`\`
${answers.code || '// Existing code not provided'}
\`\`\`
</existing-code>

<feature-requirements>
**Feature:** ${answers.feature || 'New feature'}

**How it should work:**
${answers.behavior || 'User interacts with the feature and it works correctly'}

**Constraints:**
${answers.constraints || 'Keep changes minimal and maintain existing functionality'}
</feature-requirements>

<instructions>
Please add this feature while:

1. **Preserving existing functionality** - Don't break what already works!

2. **Matching the code style** - Keep it consistent with my existing code

3. **Being minimal** - Only change what's necessary

4. **Explaining changes** - Comment what you added and why

Provide:
- The complete modified files (not just snippets)
- Clear markers showing what's new vs existing
- Any new files that need to be created
- Brief explanation of the changes made

Show me exactly what to change - I should be able to copy-paste and have it work!
</instructions>`
  },
  {
    id: 'explain-code',
    name: 'Explain This Code',
    icon: '📖',
    description: 'Understand how code works',
    category: 'Learn',
    difficulty: 'Beginner',
    estimatedTime: '1 min',
    questions: [
      {
        id: 'code',
        question: 'Paste the code you want explained:',
        placeholder: 'Paste the code here...',
        type: 'textarea',
      },
      {
        id: 'specific',
        question: 'Anything specific you\'re confused about?',
        placeholder: 'e.g., What does the reduce function do? Why is there a ? after the variable?',
        type: 'textarea',
        helpText: 'Leave blank for a general explanation'
      },
      {
        id: 'level',
        question: 'How technical should the explanation be?',
        placeholder: '',
        type: 'select',
        options: ['Explain like I\'m 5', 'Beginner (new to coding)', 'Intermediate (know basics)', 'Advanced (just want the key points)'],
      },
    ],
    generatePrompt: (answers) => `<task>
Explain this code to me at a ${answers.level || 'Beginner'} level.
</task>

<code>
\`\`\`
${answers.code || '// No code provided'}
\`\`\`
</code>

${answers.specific ? `<specific-questions>
I'm particularly confused about:
${answers.specific}
</specific-questions>` : ''}

<explanation-format>
Please explain this code by:

1. **The Big Picture** - What does this code do overall? (1-2 sentences)

2. **Step-by-Step Breakdown** - Go through the code line by line (or section by section):
   - What each part does
   - Why it's written that way
   - Any "tricks" or patterns being used

3. **Key Concepts** - Explain any programming concepts I need to understand:
   - What they are
   - Why they're useful
   - Real-world analogies if helpful

4. **Common Gotchas** - Anything tricky or easy to misunderstand?

${answers.level === 'Explain like I\'m 5' ? '5. **Simple Analogy** - Explain the whole thing using a real-world comparison' : ''}

Use simple language and avoid jargon. If you must use technical terms, explain them!
</explanation-format>`
  },
  {
    id: 'write-tests',
    name: 'Write Tests',
    icon: '🧪',
    description: 'Generate comprehensive tests for your code',
    category: 'Quality',
    difficulty: 'Intermediate',
    estimatedTime: '2 min',
    questions: [
      {
        id: 'code',
        question: 'Paste the code you want to test:',
        placeholder: 'Paste your function, component, or module...',
        type: 'textarea',
      },
      {
        id: 'description',
        question: 'What does this code do?',
        placeholder: 'e.g., Validates email addresses, Calculates shopping cart total, Handles user login',
        type: 'text',
        helpText: 'Brief description helps write better tests'
      },
      {
        id: 'framework',
        question: 'Testing framework preference?',
        placeholder: '',
        type: 'select',
        options: ['Jest', 'Vitest', 'Mocha/Chai', 'React Testing Library', 'Playwright/Cypress', 'Let Claude decide'],
      },
      {
        id: 'focus',
        question: 'What should tests focus on?',
        placeholder: '',
        type: 'multiselect',
        options: ['Happy path (normal usage)', 'Edge cases', 'Error handling', 'Input validation', 'Integration', 'Performance'],
      },
    ],
    generatePrompt: (answers) => `<task>
Write comprehensive tests for this code.
</task>

<code-to-test>
**Description:** ${answers.description || 'Code functionality'}

\`\`\`
${answers.code || '// No code provided'}
\`\`\`
</code-to-test>

<test-requirements>
**Framework:** ${answers.framework === 'Let Claude decide' ? 'Recommend the best option' : answers.framework}

**Test Coverage Focus:**
${answers.focus ? answers.focus.split(',').map(f => `- ${f.trim()}`).join('\n') : `- Happy path scenarios
- Edge cases
- Error handling`}
</test-requirements>

<output-format>
Please provide:

1. **Test File Setup** - Imports, mocks, and test configuration

2. **Test Cases** organized by category:
   - Describe what each test verifies
   - Use clear, readable test names (describe what it does, not how)
   - Include comments explaining why each test matters

3. **Test Data** - Any fixtures or mock data needed

4. **Coverage Summary** - What scenarios are covered

For each test, follow this pattern:
- **Arrange** - Set up test data
- **Act** - Call the function/trigger the action
- **Assert** - Verify the expected outcome

Make tests that actually catch bugs - not just tests that pass!
</output-format>`
  },
  {
    id: 'refactor-code',
    name: 'Refactor & Improve',
    icon: '♻️',
    description: 'Make your code cleaner and better',
    category: 'Enhance',
    difficulty: 'Intermediate',
    estimatedTime: '2 min',
    questions: [
      {
        id: 'code',
        question: 'Paste the code you want to improve:',
        placeholder: 'Paste messy, slow, or hard-to-read code here...',
        type: 'textarea',
      },
      {
        id: 'issues',
        question: 'What bothers you about this code?',
        placeholder: 'e.g., It\'s hard to read, Too slow, Too long, Duplicated code, Not type-safe',
        type: 'textarea',
        helpText: 'What problems do you want to fix?'
      },
      {
        id: 'goals',
        question: 'What improvements do you want?',
        placeholder: '',
        type: 'multiselect',
        options: ['Better readability', 'Better performance', 'Add TypeScript types', 'Smaller functions', 'Remove duplication', 'Better error handling', 'Modern patterns'],
      },
      {
        id: 'constraints',
        question: 'Any constraints?',
        placeholder: 'e.g., Must maintain the same API, Can\'t add new dependencies',
        type: 'textarea',
      },
    ],
    generatePrompt: (answers) => `<task>
Refactor and improve this code while maintaining the exact same functionality.
</task>

<original-code>
\`\`\`
${answers.code || '// No code provided'}
\`\`\`
</original-code>

<current-issues>
${answers.issues || 'General code quality improvement needed'}
</current-issues>

<improvement-goals>
${answers.goals ? answers.goals.split(',').map(g => `- ${g.trim()}`).join('\n') : `- Better readability
- Cleaner structure
- Modern best practices`}
</improvement-goals>

<constraints>
${answers.constraints || 'Maintain the same functionality and API'}
</constraints>

<refactoring-instructions>
Please provide:

1. **Refactored Code** - The improved version with:
   - Clear before/after comparison mindset
   - Comments highlighting major changes
   - Consistent formatting

2. **What Changed** - Summary of improvements made:
   - Why each change improves the code
   - Any trade-offs to be aware of

3. **Side-by-Side Comparison** - For complex changes, show old vs new

Critical: The refactored code must do EXACTLY the same thing as the original. Don't add features or change behavior - just make it cleaner!
</refactoring-instructions>`
  },
  {
    id: 'database-schema',
    name: 'Design Database Schema',
    icon: '🗄️',
    description: 'Create an optimized database design',
    category: 'Build',
    difficulty: 'Intermediate',
    estimatedTime: '2 min',
    questions: [
      {
        id: 'project',
        question: 'What is this database for?',
        placeholder: 'e.g., E-commerce store, Social media app, Project management tool',
        type: 'text',
      },
      {
        id: 'entities',
        question: 'What things do you need to store?',
        placeholder: 'e.g., Users, Products, Orders, Reviews, Categories',
        type: 'textarea',
        helpText: 'List the main "things" your app deals with'
      },
      {
        id: 'relationships',
        question: 'How are they related?',
        placeholder: 'e.g., Users have many Orders, Products belong to Categories, Orders contain Products',
        type: 'textarea',
        helpText: 'Describe connections between things'
      },
      {
        id: 'database',
        question: 'Which database?',
        placeholder: '',
        type: 'select',
        options: ['PostgreSQL', 'MySQL', 'MongoDB', 'SQLite', 'Let Claude recommend'],
      },
      {
        id: 'features',
        question: 'Any special requirements?',
        placeholder: '',
        type: 'multiselect',
        options: ['Full-text search', 'Soft deletes', 'Audit trails', 'Multi-tenancy', 'Versioning', 'Geolocation'],
      },
    ],
    generatePrompt: (answers) => `<task>
Design a database schema for: ${answers.project || 'a new application'}
</task>

<requirements>
**Entities to store:**
${answers.entities ? answers.entities.split('\n').map(e => `- ${e.trim()}`).filter(e => e !== '-').join('\n') : '- Users\n- Items'}

**Relationships:**
${answers.relationships || 'Standard relationships between entities'}

**Database:** ${answers.database === 'Let Claude recommend' ? 'Recommend the best option and explain why' : answers.database}

${answers.features ? `**Special Features:**\n${answers.features.split(',').map(f => `- ${f.trim()}`).join('\n')}` : ''}
</requirements>

<output-format>
Please provide:

1. **Entity Relationship Diagram** - ASCII or text description of the schema

2. **Table Definitions** with:
   - All columns with appropriate data types
   - Primary keys
   - Foreign keys with proper relationships
   - Indexes for performance
   - Constraints (unique, not null, etc.)

3. **SQL Migration** - Complete CREATE TABLE statements

4. **Sample Data** - INSERT statements with realistic test data

5. **Common Queries** - Example queries for typical operations

6. **Performance Tips** - Indexes to add, query optimization advice

Design for scale and real-world use - not just a basic tutorial schema!
</output-format>`
  },
  {
    id: 'cli-tool',
    name: 'Build a CLI Tool',
    icon: '💻',
    description: 'Create a command-line application',
    category: 'Build',
    difficulty: 'Intermediate',
    estimatedTime: '2 min',
    questions: [
      {
        id: 'name',
        question: 'What should your CLI be called?',
        placeholder: 'e.g., myapp, file-organizer, deploy-tool',
        type: 'text',
      },
      {
        id: 'purpose',
        question: 'What will it do?',
        placeholder: 'e.g., Organize files by type, Generate project boilerplate, Automate deployments',
        type: 'text',
      },
      {
        id: 'commands',
        question: 'What commands should it have?',
        placeholder: 'e.g., init, build, deploy, clean, status',
        type: 'textarea',
        helpText: 'List the main commands users can run'
      },
      {
        id: 'language',
        question: 'What language?',
        placeholder: '',
        type: 'select',
        options: ['Node.js/TypeScript', 'Python', 'Go', 'Rust', 'Bash'],
      },
      {
        id: 'features',
        question: 'Extra features?',
        placeholder: '',
        type: 'multiselect',
        options: ['Interactive prompts', 'Colored output', 'Progress bars', 'Config file support', 'Auto-update', 'Shell completions'],
      },
    ],
    generatePrompt: (answers) => `<task>
Build a CLI tool called "${answers.name || 'mycli'}"

Purpose: ${answers.purpose || 'A useful command-line tool'}
</task>

<commands>
${answers.commands ? answers.commands.split('\n').map(c => `- ${c.trim()}`).filter(c => c !== '-').join('\n') : '- help\n- version'}
</commands>

<technical-requirements>
**Language:** ${answers.language || 'Node.js/TypeScript'}

**Features:**
${answers.features ? answers.features.split(',').map(f => `- ${f.trim()}`).join('\n') : `- Clear help messages
- Colored output
- Error handling`}
</technical-requirements>

<output-format>
Please create:

1. **Complete Source Code** - All files needed to run the CLI

2. **Package Configuration** - package.json, Cargo.toml, etc.

3. **README** with:
   - Installation instructions
   - Usage examples for each command
   - Configuration options

4. **Example Usage** - Show how each command works

Make it feel professional - good error messages, helpful output, and intuitive commands!
</output-format>`
  },
];

// ============================================================================
// OTHER CONSTANTS
// ============================================================================

const TECH_STACKS = [
  { id: 'react', label: 'React', icon: '⚛️', desc: 'Most popular for web apps' },
  { id: 'nextjs', label: 'Next.js', icon: '▲', desc: 'React + server features' },
  { id: 'vue', label: 'Vue', icon: '💚', desc: 'Beginner-friendly framework' },
  { id: 'svelte', label: 'Svelte', icon: '🔥', desc: 'Fast & simple' },
  { id: 'python', label: 'Python', icon: '🐍', desc: 'Great for beginners' },
  { id: 'node', label: 'Node.js', icon: '💚', desc: 'JavaScript backend' },
  { id: 'typescript', label: 'TypeScript', icon: '📘', desc: 'JavaScript with types' },
  { id: 'rust', label: 'Rust', icon: '🦀', desc: 'High performance' },
  { id: 'go', label: 'Go', icon: '🔵', desc: 'Simple & fast' },
];

const BEST_PRACTICES = [
  { title: 'Be Specific', tip: 'Instead of "make a website", say "create a Next.js 14 app with Tailwind CSS"', icon: '🎯' },
  { title: 'Provide Context', tip: 'Share your tech stack and project structure upfront', icon: '📋' },
  { title: 'Use XML Tags', tip: 'Claude responds well to structured prompts with XML sections', icon: '🏷️' },
  { title: 'Include Examples', tip: 'Show examples of the output format you want', icon: '💡' },
  { title: 'Set Constraints', tip: 'Specify what NOT to do: "No external dependencies"', icon: '🚫' },
  { title: 'Iterate', tip: 'Start simple, then refine. Claude maintains context', icon: '🔄' },
];

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

function calculatePromptScore(prompt: string): PromptScore {
  const suggestions: string[] = [];
  let specificity = 0, clarity = 0, completeness = 0, structure = 0;

  const xmlTags = ['<task>', '<context>', '<requirements>', '<output'];
  const foundTags = xmlTags.filter(tag => prompt.includes(tag));
  structure = Math.min(100, (foundTags.length / xmlTags.length) * 100 + 20);

  const specificIndicators = ['specifically', 'exactly', 'must', 'should', 'required', 'include'];
  const foundSpecific = specificIndicators.filter(ind => prompt.toLowerCase().includes(ind));
  specificity = Math.min(100, (foundSpecific.length / specificIndicators.length) * 100 + 30);

  const hasTask = prompt.includes('<task>');
  const hasOutput = prompt.toLowerCase().includes('output');
  clarity = (hasTask ? 50 : 0) + (hasOutput ? 50 : 0);

  completeness = Math.min(100, (prompt.length > 500 ? 50 : 25) + (foundTags.length * 15));

  const overall = Math.round((specificity + clarity + completeness + structure) / 4);
  return { overall, specificity: Math.round(specificity), clarity: Math.round(clarity),
           completeness: Math.round(completeness), structure: Math.round(structure), suggestions };
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function ClaudeCodePage() {
  // Core state
  const [activeTab, setActiveTab] = useState<'templates' | 'builder' | 'history' | 'tips'>('templates');
  const [selectedTemplate, setSelectedTemplate] = useState<NarrativeTemplate | null>(null);
  const [templateAnswers, setTemplateAnswers] = useState<Record<string, string>>({});
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [copied, setCopied] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [savedPrompts, setSavedPrompts] = useState<SavedPrompt[]>([]);
  const [promptName, setPromptName] = useState('');
  const [promptScore, setPromptScore] = useState<PromptScore | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('All');

  // Load saved prompts
  useEffect(() => {
    const saved = localStorage.getItem('claude-code-saved-prompts');
    if (saved) setSavedPrompts(JSON.parse(saved));
  }, []);

  // Calculate score when prompt changes
  useEffect(() => {
    if (generatedPrompt) {
      setPromptScore(calculatePromptScore(generatedPrompt));
    }
  }, [generatedPrompt]);

  // Generate prompt from template answers
  const handleGeneratePrompt = useCallback(() => {
    if (selectedTemplate) {
      const prompt = selectedTemplate.generatePrompt(templateAnswers);
      setGeneratedPrompt(prompt);
    }
  }, [selectedTemplate, templateAnswers]);

  // Handlers
  const handleSelectTemplate = (template: NarrativeTemplate) => {
    setSelectedTemplate(template);
    setTemplateAnswers({});
    setCurrentStep(0);
    setGeneratedPrompt('');
  };

  const handleAnswerChange = (questionId: string, value: string) => {
    setTemplateAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNextStep = () => {
    if (selectedTemplate && currentStep < selectedTemplate.questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleGeneratePrompt();
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSavePrompt = () => {
    if (!generatedPrompt || !promptName) return;
    const newPrompt: SavedPrompt = {
      id: generateId(),
      name: promptName,
      prompt: generatedPrompt,
      taskType: selectedTemplate?.name || 'Custom',
      createdAt: new Date().toISOString(),
      isFavorite: false,
    };
    const updated = [newPrompt, ...savedPrompts];
    setSavedPrompts(updated);
    localStorage.setItem('claude-code-saved-prompts', JSON.stringify(updated));
    setPromptName('');
  };

  const handleToggleFavorite = (id: string) => {
    const updated = savedPrompts.map(p => p.id === id ? { ...p, isFavorite: !p.isFavorite } : p);
    setSavedPrompts(updated);
    localStorage.setItem('claude-code-saved-prompts', JSON.stringify(updated));
  };

  const handleDeletePrompt = (id: string) => {
    const updated = savedPrompts.filter(p => p.id !== id);
    setSavedPrompts(updated);
    localStorage.setItem('claude-code-saved-prompts', JSON.stringify(updated));
  };

  const handleOpenInClaude = () => {
    const encoded = encodeURIComponent(generatedPrompt);
    window.open(`https://claude.ai/new?q=${encoded}`, '_blank');
  };

  const handleStartOver = () => {
    setSelectedTemplate(null);
    setTemplateAnswers({});
    setCurrentStep(0);
    setGeneratedPrompt('');
  };

  // Get unique categories
  const categories = ['All', ...new Set(NARRATIVE_TEMPLATES.map(t => t.category))];
  const filteredTemplates = filterCategory === 'All'
    ? NARRATIVE_TEMPLATES
    : NARRATIVE_TEMPLATES.filter(t => t.category === filterCategory);

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-lg bg-[var(--background)]/80 border-b border-[var(--border-color)]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4ECDC4] to-[#3EB489] flex items-center justify-center">
                <Icons.chart className="w-6 h-6 text-[#0a1929]" />
              </div>
              <span className="text-xl font-bold">
                <span className="text-[#4ECDC4]">Prompt</span>
                <span className="text-[var(--foreground)]">Forge</span>
              </span>
            </Link>
            <div className="hidden md:flex items-center gap-1">
              <Link href="/" className="px-4 py-2 text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors rounded-lg hover:bg-[var(--muted)]">Home</Link>
              <Link href="/claude-code" className="px-4 py-2 text-[#4ECDC4] font-medium rounded-lg bg-[rgba(78,205,196,0.1)] flex items-center gap-1">
                <span>⚡</span> Claude Code
              </Link>
              <Link href="/prompts-101" className="px-4 py-2 text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors rounded-lg hover:bg-[var(--muted)]">Prompts 101</Link>
              <Link href="/playground" className="px-4 py-2 text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors rounded-lg hover:bg-[var(--muted)]">Playground</Link>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[var(--border-color)]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#4ECDC4]/10 via-transparent to-[#3EB489]/10" />
        <div className="max-w-7xl mx-auto px-6 py-10 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(78,205,196,0.15)] border border-[rgba(78,205,196,0.3)] text-[#4ECDC4] text-sm font-medium mb-4">
              <span className="text-lg">⚡</span>
              Answer Simple Questions → Get Powerful Prompts
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--foreground)] mb-4">
              Just Answer a Few Questions,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4ECDC4] to-[#3EB489]">
                We Do the Rest
              </span>
            </h1>
            <p className="text-lg text-[var(--text-secondary)]">
              No prompt engineering needed. Pick a template, answer the questions, and get a professional prompt that gets results.
            </p>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-6 pt-6">
        <div className="flex gap-2 border-b border-[var(--border-color)] pb-4">
          {[
            { id: 'templates', label: 'Templates', icon: '📝' },
            { id: 'history', label: 'Saved', icon: '📚', badge: savedPrompts.length || undefined },
            { id: 'tips', label: 'Tips', icon: '💡' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-[#4ECDC4] to-[#3EB489] text-[#0a1929] shadow-lg'
                  : 'bg-[var(--muted)] text-[var(--text-secondary)] hover:bg-[var(--card)]'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
              {tab.badge && <span className="px-1.5 py-0.5 rounded-full text-xs bg-[#4ECDC4]/20 text-[#4ECDC4]">{tab.badge}</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* ================================================================ */}
        {/* TEMPLATES TAB */}
        {/* ================================================================ */}
        {activeTab === 'templates' && !selectedTemplate && (
          <div className="space-y-6">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    filterCategory === cat
                      ? 'bg-[#4ECDC4] text-[#0a1929]'
                      : 'bg-[var(--muted)] text-[var(--text-secondary)] hover:bg-[var(--card)]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Template Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTemplates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => handleSelectTemplate(template)}
                  className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border-color)] hover:border-[#4ECDC4] transition-all text-left group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-3xl">{template.icon}</div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      template.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-500' :
                      template.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-500' :
                      'bg-red-500/20 text-red-500'
                    }`}>
                      {template.difficulty}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--foreground)] mb-1 group-hover:text-[#4ECDC4] transition-colors">
                    {template.name}
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] mb-3">{template.description}</p>
                  <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
                    <span>{template.questions.length} questions</span>
                    <span>~{template.estimatedTime}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* TEMPLATE WIZARD */}
        {/* ================================================================ */}
        {activeTab === 'templates' && selectedTemplate && !generatedPrompt && (
          <div className="max-w-2xl mx-auto">
            {/* Progress */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <button onClick={handleStartOver} className="text-sm text-[var(--text-muted)] hover:text-[#4ECDC4]">
                  ← Back to templates
                </button>
                <span className="text-sm text-[var(--text-muted)]">
                  Question {currentStep + 1} of {selectedTemplate.questions.length}
                </span>
              </div>
              <div className="h-2 bg-[var(--muted)] rounded-full">
                <div
                  className="h-full bg-gradient-to-r from-[#4ECDC4] to-[#3EB489] rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / selectedTemplate.questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Template Header */}
            <div className="text-center mb-8">
              <div className="text-4xl mb-2">{selectedTemplate.icon}</div>
              <h2 className="text-2xl font-bold text-[var(--foreground)]">{selectedTemplate.name}</h2>
            </div>

            {/* Current Question */}
            {selectedTemplate.questions[currentStep] && (
              <div className="p-8 rounded-2xl bg-[var(--card)] border border-[var(--border-color)]">
                <label className="block text-xl font-semibold text-[var(--foreground)] mb-2">
                  {selectedTemplate.questions[currentStep].question}
                </label>
                {selectedTemplate.questions[currentStep].helpText && (
                  <p className="text-sm text-[var(--text-muted)] mb-4">
                    💡 {selectedTemplate.questions[currentStep].helpText}
                  </p>
                )}

                {selectedTemplate.questions[currentStep].type === 'text' && (
                  <input
                    type="text"
                    value={templateAnswers[selectedTemplate.questions[currentStep].id] || ''}
                    onChange={(e) => handleAnswerChange(selectedTemplate.questions[currentStep].id, e.target.value)}
                    placeholder={selectedTemplate.questions[currentStep].placeholder}
                    className="w-full p-4 rounded-xl bg-[var(--muted)] border border-[var(--border-color)] text-[var(--foreground)] placeholder:text-[var(--text-muted)] focus:border-[#4ECDC4] focus:outline-none text-lg"
                    autoFocus
                  />
                )}

                {selectedTemplate.questions[currentStep].type === 'textarea' && (
                  <textarea
                    value={templateAnswers[selectedTemplate.questions[currentStep].id] || ''}
                    onChange={(e) => handleAnswerChange(selectedTemplate.questions[currentStep].id, e.target.value)}
                    placeholder={selectedTemplate.questions[currentStep].placeholder}
                    className="w-full p-4 rounded-xl bg-[var(--muted)] border border-[var(--border-color)] text-[var(--foreground)] placeholder:text-[var(--text-muted)] focus:border-[#4ECDC4] focus:outline-none resize-none"
                    rows={5}
                    autoFocus
                  />
                )}

                {selectedTemplate.questions[currentStep].type === 'select' && (
                  <div className="grid grid-cols-2 gap-3">
                    {selectedTemplate.questions[currentStep].options?.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleAnswerChange(selectedTemplate.questions[currentStep].id, option)}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${
                          templateAnswers[selectedTemplate.questions[currentStep].id] === option
                            ? 'border-[#4ECDC4] bg-[rgba(78,205,196,0.1)]'
                            : 'border-[var(--border-color)] hover:border-[#4ECDC4]/50'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}

                {selectedTemplate.questions[currentStep].type === 'multiselect' && (
                  <div className="grid grid-cols-2 gap-3">
                    {selectedTemplate.questions[currentStep].options?.map((option) => {
                      const currentValues = (templateAnswers[selectedTemplate.questions[currentStep].id] || '').split(',').filter(Boolean);
                      const isSelected = currentValues.includes(option);
                      return (
                        <button
                          key={option}
                          onClick={() => {
                            const newValues = isSelected
                              ? currentValues.filter(v => v !== option)
                              : [...currentValues, option];
                            handleAnswerChange(selectedTemplate.questions[currentStep].id, newValues.join(','));
                          }}
                          className={`p-4 rounded-xl border-2 text-left transition-all ${
                            isSelected
                              ? 'border-[#4ECDC4] bg-[rgba(78,205,196,0.1)]'
                              : 'border-[var(--border-color)] hover:border-[#4ECDC4]/50'
                          }`}
                        >
                          <span className="mr-2">{isSelected ? '✓' : '○'}</span>
                          {option}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Navigation */}
                <div className="flex justify-between mt-8">
                  <button
                    onClick={handlePrevStep}
                    disabled={currentStep === 0}
                    className="px-6 py-3 rounded-xl text-[var(--text-secondary)] hover:text-[var(--foreground)] disabled:opacity-50 transition-colors"
                  >
                    ← Previous
                  </button>
                  <button
                    onClick={handleNextStep}
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#4ECDC4] to-[#3EB489] text-[#0a1929] font-semibold hover:shadow-lg transition-all"
                  >
                    {currentStep === selectedTemplate.questions.length - 1 ? '✨ Generate Prompt' : 'Next →'}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================================================================ */}
        {/* GENERATED PROMPT */}
        {/* ================================================================ */}
        {activeTab === 'templates' && selectedTemplate && generatedPrompt && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left: Prompt Preview */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-[var(--foreground)]">Your Prompt</h2>
                <button onClick={handleStartOver} className="text-sm text-[var(--text-muted)] hover:text-[#4ECDC4]">
                  Start Over
                </button>
              </div>

              <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border-color)] max-h-[600px] overflow-auto">
                <pre className="whitespace-pre-wrap text-sm text-[var(--foreground)] font-mono leading-relaxed">
                  {generatedPrompt}
                </pre>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <div className="flex gap-3">
                  <button
                    onClick={handleCopy}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#4ECDC4] to-[#3EB489] text-[#0a1929] font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    {copied ? <><Icons.check className="w-5 h-5" /> Copied!</> : <><Icons.copy className="w-5 h-5" /> Copy Prompt</>}
                  </button>
                  <button
                    onClick={handleOpenInClaude}
                    className="flex-1 py-3 rounded-xl border border-[#4ECDC4] text-[#4ECDC4] font-semibold hover:bg-[rgba(78,205,196,0.1)] transition-all"
                  >
                    🟣 Open in Claude
                  </button>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promptName}
                    onChange={(e) => setPromptName(e.target.value)}
                    placeholder="Name this prompt to save..."
                    className="flex-1 px-3 py-2 rounded-xl bg-[var(--muted)] border border-[var(--border-color)] text-[var(--foreground)] placeholder:text-[var(--text-muted)] focus:border-[#4ECDC4] focus:outline-none text-sm"
                  />
                  <button
                    onClick={handleSavePrompt}
                    disabled={!promptName}
                    className="px-4 py-2 rounded-xl bg-[var(--muted)] text-[var(--text-secondary)] hover:text-[#4ECDC4] disabled:opacity-50"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Quality Score & Answers */}
            <div className="space-y-6">
              {promptScore && (
                <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border-color)]">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-[var(--foreground)]">Prompt Quality</h3>
                    <div className={`text-3xl font-bold ${
                      promptScore.overall >= 80 ? 'text-green-500' :
                      promptScore.overall >= 60 ? 'text-yellow-500' : 'text-red-500'
                    }`}>
                      {promptScore.overall}/100
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-3">
                    {[
                      { label: 'Specific', value: promptScore.specificity },
                      { label: 'Clear', value: promptScore.clarity },
                      { label: 'Complete', value: promptScore.completeness },
                      { label: 'Structured', value: promptScore.structure },
                    ].map((item) => (
                      <div key={item.label} className="text-center">
                        <div className="text-xs text-[var(--text-muted)] mb-1">{item.label}</div>
                        <div className="h-2 bg-[var(--muted)] rounded-full">
                          <div
                            className={`h-full rounded-full ${
                              item.value >= 70 ? 'bg-green-500' : item.value >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${item.value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Your Answers */}
              <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border-color)]">
                <h3 className="font-semibold text-[var(--foreground)] mb-4">Your Answers</h3>
                <div className="space-y-3">
                  {selectedTemplate.questions.map((q) => (
                    <div key={q.id} className="p-3 rounded-lg bg-[var(--muted)]">
                      <div className="text-xs text-[var(--text-muted)] mb-1">{q.question}</div>
                      <div className="text-sm text-[var(--foreground)]">
                        {templateAnswers[q.id] || <span className="text-[var(--text-muted)] italic">Not answered</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* HISTORY TAB */}
        {/* ================================================================ */}
        {activeTab === 'history' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[var(--foreground)]">Saved Prompts</h2>

            {savedPrompts.length === 0 ? (
              <div className="p-12 rounded-2xl border-2 border-dashed border-[var(--border-color)] text-center">
                <div className="text-4xl mb-4">📚</div>
                <p className="text-[var(--foreground)] font-medium mb-2">No saved prompts yet</p>
                <p className="text-[var(--text-muted)]">Generate a prompt and save it to see it here</p>
              </div>
            ) : (
              <div className="space-y-4">
                {savedPrompts.map((prompt) => (
                  <div key={prompt.id} className="p-4 rounded-xl bg-[var(--card)] border border-[var(--border-color)]">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-[var(--foreground)] flex items-center gap-2">
                          {prompt.name}
                          {prompt.isFavorite && <span className="text-yellow-500">⭐</span>}
                        </h4>
                        <p className="text-xs text-[var(--text-muted)]">
                          {prompt.taskType} · {new Date(prompt.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleFavorite(prompt.id)}
                          className={`p-2 rounded-lg ${prompt.isFavorite ? 'text-yellow-500' : 'text-[var(--text-muted)] hover:text-yellow-500'}`}
                        >
                          {prompt.isFavorite ? '⭐' : '☆'}
                        </button>
                        <button
                          onClick={async () => {
                            await navigator.clipboard.writeText(prompt.prompt);
                            setCopied(true);
                            setTimeout(() => setCopied(false), 2000);
                          }}
                          className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[#4ECDC4]"
                        >
                          <Icons.copy className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeletePrompt(prompt.id)}
                          className="p-2 rounded-lg text-[var(--text-muted)] hover:text-red-500"
                        >
                          <Icons.x className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <pre className="text-sm text-[var(--text-secondary)] line-clamp-3 font-mono bg-[var(--muted)] p-3 rounded-lg">
                      {prompt.prompt.substring(0, 200)}...
                    </pre>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================================================================ */}
        {/* TIPS TAB */}
        {/* ================================================================ */}
        {activeTab === 'tips' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-[var(--foreground)]">Pro Tips for Better Prompts</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {BEST_PRACTICES.map((practice, i) => (
                <div key={i} className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border-color)]">
                  <div className="text-3xl mb-3">{practice.icon}</div>
                  <h3 className="font-semibold text-[var(--foreground)] mb-2">{practice.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)]">{practice.tip}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-[var(--border-color)] py-8 mt-12">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <span className="text-[var(--text-muted)]">
            <span className="text-[#4ECDC4] font-semibold">PromptForge</span> • Answer questions, get powerful prompts
          </span>
          <div className="flex gap-4 text-sm text-[var(--text-muted)]">
            <Link href="/" className="hover:text-[var(--foreground)]">Home</Link>
            <Link href="/prompts-101" className="hover:text-[var(--foreground)]">Prompts 101</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
