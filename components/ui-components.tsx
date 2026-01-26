// ui-components.tsx - Essential UI components for PromptForge
// Hammy Design System: Turquoise, Neumorphism, Dark Mode

'use client';

import { useState, useCallback, useRef, useEffect, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Trash2, GripVertical, Check, ChevronDown, Loader2 } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import type { PromptExample, PromptFramework, PromptContent, ExecutionResult, AIModel } from '@/types/prompt.types';

// ============================================
// TagInput - Add/remove tags with suggestions
// ============================================

interface TagInputProps {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  suggestions?: string[];
  maxTags?: number;
  className?: string;
}

export function TagInput({
  value,
  onChange,
  placeholder = 'Add tag...',
  suggestions = [],
  maxTags = 20,
  className,
}: TagInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredSuggestions = suggestions.filter(
    (s) =>
      s.toLowerCase().includes(inputValue.toLowerCase()) &&
      !value.includes(s)
  );

  const addTag = useCallback(
    (tag: string) => {
      const trimmed = tag.trim();
      if (trimmed && !value.includes(trimmed) && value.length < maxTags) {
        onChange([...value, trimmed]);
      }
      setInputValue('');
      setShowSuggestions(false);
    },
    [value, onChange, maxTags]
  );

  const removeTag = useCallback(
    (tag: string) => {
      onChange(value.filter((t) => t !== tag));
    },
    [value, onChange]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue) {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
      removeTag(value[value.length - 1]);
    }
  };

  return (
    <div className={cn('relative', className)}>
      <div className="flex flex-wrap gap-2 p-3 neu-input bg-surface-sunken rounded-neu-sm min-h-[48px]">
        {value.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="bg-turquoise-500/20 text-turquoise-400 border-none gap-1 pr-1"
          >
            {tag}
            <button
              onClick={() => removeTag(tag)}
              className="ml-1 p-0.5 rounded hover:bg-turquoise-500/30"
            >
              <X className="w-3 h-3" />
            </button>
          </Badge>
        ))}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          onKeyDown={handleKeyDown}
          placeholder={value.length === 0 ? placeholder : ''}
          className="flex-1 min-w-[120px] bg-transparent border-none outline-none text-white placeholder:text-gray-500"
        />
      </div>

      {/* Suggestions Dropdown */}
      <AnimatePresence>
        {showSuggestions && filteredSuggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-10 w-full mt-1 py-1 rounded-lg bg-surface-elevated border border-white/10 shadow-lg"
          >
            {filteredSuggestions.slice(0, 5).map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => addTag(suggestion)}
                className="w-full px-3 py-2 text-left text-sm text-gray-300 hover:bg-turquoise-500/10 hover:text-turquoise-400"
              >
                {suggestion}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================
// ExamplePairsEditor - Manage few-shot examples
// ============================================

interface ExamplePairsEditorProps {
  examples: PromptExample[];
  onChange: (examples: PromptExample[]) => void;
  maxExamples?: number;
}

export function ExamplePairsEditor({
  examples,
  onChange,
  maxExamples = 10,
}: ExamplePairsEditorProps) {
  const addExample = useCallback(() => {
    if (examples.length < maxExamples) {
      onChange([
        ...examples,
        {
          id: `example-${Date.now()}`,
          input: '',
          output: '',
        },
      ]);
    }
  }, [examples, onChange, maxExamples]);

  const updateExample = useCallback(
    (id: string, field: 'input' | 'output', value: string) => {
      onChange(
        examples.map((ex) =>
          ex.id === id ? { ...ex, [field]: value } : ex
        )
      );
    },
    [examples, onChange]
  );

  const removeExample = useCallback(
    (id: string) => {
      onChange(examples.filter((ex) => ex.id !== id));
    },
    [examples, onChange]
  );

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {examples.map((example, index) => (
          <motion.div
            key={example.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="group"
          >
            <Card className="neu-card bg-surface-elevated/50">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="flex items-center gap-2 pt-2 text-gray-500">
                    <GripVertical className="w-4 h-4 cursor-grab" />
                    <span className="text-sm font-medium">#{index + 1}</span>
                  </div>

                  <div className="flex-1 space-y-3">
                    <div>
                      <label className="text-xs font-medium text-gray-400 mb-1 block">
                        Input
                      </label>
                      <Textarea
                        value={example.input}
                        onChange={(e) => updateExample(example.id, 'input', e.target.value)}
                        placeholder="Example user input..."
                        className="neu-input bg-surface-sunken border-none min-h-[60px]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-400 mb-1 block">
                        Expected Output
                      </label>
                      <Textarea
                        value={example.output}
                        onChange={(e) => updateExample(example.id, 'output', e.target.value)}
                        placeholder="Expected AI response..."
                        className="neu-input bg-surface-sunken border-none min-h-[60px]"
                      />
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeExample(example.id)}
                    className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>

      {examples.length < maxExamples && (
        <Button
          variant="outline"
          onClick={addExample}
          className="w-full border-dashed border-white/20 text-gray-400 hover:text-turquoise-400 hover:border-turquoise-500/50"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Example ({examples.length}/{maxExamples})
        </Button>
      )}
    </div>
  );
}

// ============================================
// ModelSelector - Select AI model
// ============================================

const AVAILABLE_MODELS: AIModel[] = [
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
  },
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
];

interface ModelSelectorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function ModelSelector({ value, onChange, className }: ModelSelectorProps) {
  const selectedModel = AVAILABLE_MODELS.find((m) => m.name === value);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'neu-button bg-surface-elevated border-none text-gray-300 min-w-[180px] justify-between',
            className
          )}
        >
          <span className="truncate">{selectedModel?.displayName || 'Select model'}</span>
          <ChevronDown className="w-4 h-4 ml-2 shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-surface-elevated border-white/10 w-[280px]">
        {AVAILABLE_MODELS.map((model) => (
          <DropdownMenuItem
            key={model.id}
            onClick={() => onChange(model.name)}
            className={cn(
              'flex flex-col items-start py-3 cursor-pointer',
              value === model.name && 'bg-turquoise-500/10'
            )}
          >
            <div className="flex items-center justify-between w-full">
              <span className="font-medium text-white">{model.displayName}</span>
              {value === model.name && <Check className="w-4 h-4 text-turquoise-400" />}
            </div>
            <span className="text-xs text-gray-500 mt-0.5">
              ${model.inputPricePerMillion}/$1M in · ${model.outputPricePerMillion}/$1M out
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// ============================================
// FrameworkSelector - Select prompt framework
// ============================================

const FRAMEWORKS: { id: PromptFramework; name: string; description: string }[] = [
  {
    id: 'COSTAR',
    name: 'COSTAR',
    description: 'Context, Objective, Style, Tone, Audience, Response',
  },
  {
    id: 'CROWD',
    name: 'CROWD',
    description: 'Context, Role, Objective, Workflow, Deliverable',
  },
  {
    id: 'RISEN',
    name: 'RISEN',
    description: 'Role, Instructions, Steps, End goal, Narrowing',
  },
  {
    id: 'custom',
    name: 'Custom',
    description: 'Build your own prompt structure',
  },
];

interface FrameworkSelectorProps {
  selected: PromptFramework | null;
  onSelect: (framework: PromptFramework) => void;
}

export function FrameworkSelector({ selected, onSelect }: FrameworkSelectorProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      {FRAMEWORKS.map((fw) => (
        <button
          key={fw.id}
          onClick={() => onSelect(fw.id)}
          className={cn(
            'px-4 py-2 rounded-lg text-sm font-medium transition-all',
            selected === fw.id
              ? 'bg-turquoise-500/20 text-turquoise-400 ring-1 ring-turquoise-500/50'
              : 'bg-surface-elevated text-gray-400 hover:text-white hover:bg-white/5'
          )}
        >
          {fw.name}
        </button>
      ))}
    </div>
  );
}

// ============================================
// LivePreview - Real-time prompt testing
// ============================================

interface LivePreviewProps {
  promptContent: PromptContent;
  model: string;
  result: ExecutionResult | null;
  isExecuting: boolean;
}

export function LivePreview({
  promptContent,
  model,
  result,
  isExecuting,
}: LivePreviewProps) {
  return (
    <div className="space-y-4">
      {/* Compiled Prompt Preview */}
      <Card className="neu-card">
        <CardContent className="p-4">
          <h3 className="text-sm font-medium text-gray-400 mb-3">Compiled Prompt</h3>
          <pre className="p-4 rounded-lg bg-surface-sunken text-sm text-gray-300 whitespace-pre-wrap overflow-auto max-h-[300px] font-mono">
            {compileToRawPrompt(promptContent)}
          </pre>
        </CardContent>
      </Card>

      {/* Response Preview */}
      <Card className="neu-card">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-400">Response</h3>
            {result && (
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>{result.latencyMs}ms</span>
                <span>{result.tokenUsage.total} tokens</span>
                <span>${result.costUsd.toFixed(4)}</span>
              </div>
            )}
          </div>

          <div className="p-4 rounded-lg bg-surface-sunken min-h-[200px]">
            {isExecuting ? (
              <div className="flex items-center gap-3 text-turquoise-400">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Generating response...</span>
              </div>
            ) : result ? (
              <div className="prose prose-invert prose-sm max-w-none">
                <pre className="whitespace-pre-wrap text-gray-300">{result.output}</pre>
              </div>
            ) : (
              <p className="text-gray-500">
                Click "Test" to see the AI response.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Helper to compile PromptContent to raw text
function compileToRawPrompt(content: PromptContent): string {
  const parts: string[] = [];

  if (content.persona) {
    parts.push(`# Role\n${content.persona}`);
  }
  if (content.context) {
    parts.push(`# Context\n${content.context}`);
  }
  parts.push(`# Task\n${content.objective}`);
  if (content.constraints.length > 0) {
    parts.push(`# Constraints\n${content.constraints.map((c) => `- ${c}`).join('\n')}`);
  }
  if (content.examples.length > 0) {
    const exText = content.examples
      .map((ex, i) => `Example ${i + 1}:\nInput: ${ex.input}\nOutput: ${ex.output}`)
      .join('\n\n');
    parts.push(`# Examples\n${exText}`);
  }
  if (content.style.length > 0) {
    parts.push(`# Style\nRespond in a ${content.style.join(', ')} tone.`);
  }

  return parts.join('\n\n');
}

// ============================================
// ConfirmDialog - Confirmation modal
// ============================================

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'destructive';
  onConfirm: () => void;
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'default',
  onConfirm,
}: ConfirmDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60"
        onClick={() => onOpenChange(false)}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative bg-surface-elevated rounded-neu p-6 max-w-md w-full mx-4 shadow-xl"
      >
        <h2 className="text-lg font-semibold text-white mb-2">{title}</h2>
        <p className="text-gray-400 mb-6">{description}</p>

        <div className="flex justify-end gap-3">
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="text-gray-400"
          >
            {cancelText}
          </Button>
          <Button
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
            className={cn(
              variant === 'destructive'
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-gradient-turquoise'
            )}
          >
            {confirmText}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

// ============================================
// EmptyState - Empty state placeholder
// ============================================

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-16 h-16 rounded-full bg-surface-sunken flex items-center justify-center mb-4 text-gray-500">
        {icon}
      </div>
      <h3 className="text-lg font-medium text-white mb-2">{title}</h3>
      <p className="text-gray-500 max-w-sm mb-6">{description}</p>
      {action && (
        <Button onClick={action.onClick} className="bg-gradient-turquoise text-white">
          {action.label}
        </Button>
      )}
    </div>
  );
}

// ============================================
// LoadingSpinner - Loading indicator
// ============================================

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LoadingSpinner({ size = 'md', className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-10 h-10',
  };

  return (
    <Loader2
      className={cn(
        'animate-spin text-turquoise-500',
        sizeClasses[size],
        className
      )}
    />
  );
}
