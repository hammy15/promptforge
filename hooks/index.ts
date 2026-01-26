// hooks/index.ts - Custom React hooks for PromptForge

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type {
  PromptContent,
  PromptAnalysis,
  ExecutionResult,
  Prompt,
  PromptTemplate,
  Category,
} from '@/types/prompt.types';

// ============================================
// useDebounce - Debounce any value
// ============================================

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// ============================================
// usePromptAnalysis - Analyze prompt quality
// ============================================

export function usePromptAnalysis(content: Partial<PromptContent> | null): {
  analysis: PromptAnalysis | null;
  isAnalyzing: boolean;
} {
  const [analysis, setAnalysis] = useState<PromptAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    if (!content?.objective) {
      setAnalysis(null);
      return;
    }

    setIsAnalyzing(true);

    // Simulate analysis (in production, call API)
    const timer = setTimeout(() => {
      const suggestions = [];
      const strengths = [];
      let score = 100;

      // Check objective length
      if (content.objective && content.objective.length < 50) {
        suggestions.push({
          id: '1',
          category: 'clarity' as const,
          severity: 'warning' as const,
          field: 'objective' as const,
          message: 'Objective is quite short',
          suggestion: 'Consider adding more detail about the expected output.',
          autoFixAvailable: false,
        });
        score -= 10;
      } else if (content.objective) {
        strengths.push('Clear and detailed objective');
      }

      // Check for examples
      if (content.examples && content.examples.length > 0) {
        strengths.push(`Includes ${content.examples.length} example(s) for few-shot learning`);
        score += 5;
      } else {
        suggestions.push({
          id: '2',
          category: 'best_practice' as const,
          severity: 'info' as const,
          field: 'examples' as const,
          message: 'No examples provided',
          suggestion: 'Adding 1-3 examples can significantly improve output quality.',
          autoFixAvailable: false,
        });
      }

      // Check constraints
      if (content.constraints && content.constraints.length > 0) {
        strengths.push('Includes explicit constraints');
      }

      // Check persona
      if (content.persona) {
        strengths.push('Defined AI persona');
      }

      // Estimate tokens
      const textLength =
        (content.context?.length || 0) +
        (content.objective?.length || 0) +
        (content.persona?.length || 0) +
        (content.constraints?.join(' ').length || 0);
      const estimatedTokens = Math.ceil(textLength / 4);

      setAnalysis({
        score: Math.max(0, Math.min(100, score)),
        suggestions,
        strengths,
        framework: null,
        estimatedTokens,
      });
      setIsAnalyzing(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [content]);

  return { analysis, isAnalyzing };
}

// ============================================
// useExecutePrompt - Execute prompts via API
// ============================================

interface ExecutePromptParams {
  promptId?: string;
  promptContent?: PromptContent;
  input: Record<string, unknown>;
  model: string;
  stream?: boolean;
}

export function useExecutePrompt() {
  const [result, setResult] = useState<ExecutionResult | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const execute = useCallback(async (params: ExecutePromptParams) => {
    setIsExecuting(true);
    setError(null);
    setResult(null);

    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch('/api/v1/ai/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      if (params.stream && response.body) {
        // Handle SSE streaming
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let fullOutput = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n').filter((line) => line.startsWith('data: '));

          for (const line of lines) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.type === 'token') {
                fullOutput += data.content;
              } else if (data.type === 'complete') {
                setResult(data.result);
              }
            } catch {
              // Skip invalid JSON
            }
          }
        }
      } else {
        const data = await response.json();
        setResult(data.data);
      }
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        setError(err as Error);
      }
    } finally {
      setIsExecuting(false);
    }
  }, []);

  const cancel = useCallback(() => {
    abortControllerRef.current?.abort();
    setIsExecuting(false);
  }, []);

  return { execute, cancel, result, isExecuting, error };
}

// ============================================
// usePromptLibrary - Manage custom templates
// ============================================

export function usePromptLibrary(workspaceId: string) {
  const queryClient = useQueryClient();

  // Fetch custom templates
  const {
    data: templates = [],
    isLoading: isLoadingTemplates,
  } = useQuery({
    queryKey: ['templates', workspaceId],
    queryFn: async () => {
      const res = await fetch(`/api/v1/prompts?workspaceId=${workspaceId}&isTemplate=true`);
      const data = await res.json();
      return data.data || [];
    },
  });

  // Fetch custom categories
  const {
    data: customCategories = [],
    isLoading: isLoadingCategories,
  } = useQuery({
    queryKey: ['categories', workspaceId],
    queryFn: async () => {
      const res = await fetch(`/api/v1/workspaces/${workspaceId}/categories`);
      const data = await res.json();
      return data.data || [];
    },
  });

  // Add template mutation
  const addTemplateMutation = useMutation({
    mutationFn: async (template: Omit<PromptTemplate, 'id'>) => {
      const res = await fetch('/api/v1/prompts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...template, workspaceId, isTemplate: true }),
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['templates', workspaceId] });
    },
  });

  // Delete template mutation
  const deleteTemplateMutation = useMutation({
    mutationFn: async (templateId: string) => {
      await fetch(`/api/v1/prompts/${templateId}`, { method: 'DELETE' });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['templates', workspaceId] });
    },
  });

  // Add category mutation
  const addCategoryMutation = useMutation({
    mutationFn: async (category: Omit<Category, 'subcategories'>) => {
      const res = await fetch(`/api/v1/workspaces/${workspaceId}/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(category),
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories', workspaceId] });
    },
  });

  // Delete category mutation
  const deleteCategoryMutation = useMutation({
    mutationFn: async (categoryId: string) => {
      await fetch(`/api/v1/workspaces/${workspaceId}/categories/${categoryId}`, {
        method: 'DELETE',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories', workspaceId] });
    },
  });

  return {
    templates,
    customCategories,
    isLoading: isLoadingTemplates || isLoadingCategories,
    addTemplate: addTemplateMutation.mutateAsync,
    deleteTemplate: deleteTemplateMutation.mutateAsync,
    addCategory: addCategoryMutation.mutateAsync,
    deleteCategory: deleteCategoryMutation.mutateAsync,
  };
}

// ============================================
// useToast - Toast notifications
// ============================================

interface Toast {
  id: string;
  title: string;
  description?: string;
  variant?: 'default' | 'success' | 'error' | 'warning';
  duration?: number;
}

const toastListeners = new Set<(toast: Toast) => void>();
let toastIdCounter = 0;

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const listener = (toast: Toast) => {
      setToasts((prev) => [...prev, toast]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toast.id));
      }, toast.duration || 5000);
    };

    toastListeners.add(listener);
    return () => {
      toastListeners.delete(listener);
    };
  }, []);

  const toast = useCallback((options: Omit<Toast, 'id'>) => {
    const newToast: Toast = {
      ...options,
      id: `toast-${++toastIdCounter}`,
    };
    toastListeners.forEach((listener) => listener(newToast));
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toast, toasts, dismiss };
}

// ============================================
// useLocalStorage - Persist state to localStorage
// ============================================

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T) => {
      setStoredValue(value);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    },
    [key]
  );

  return [storedValue, setValue];
}

// ============================================
// useKeyboardShortcut - Register keyboard shortcuts
// ============================================

export function useKeyboardShortcut(
  keys: string[],
  callback: (event: KeyboardEvent) => void,
  options: { enabled?: boolean; preventDefault?: boolean } = {}
) {
  const { enabled = true, preventDefault = true } = options;

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const key = keys[keys.length - 1].toLowerCase();
      const modifiers = keys.slice(0, -1).map((k) => k.toLowerCase());

      const modifiersMatch =
        (!modifiers.includes('ctrl') || event.ctrlKey) &&
        (!modifiers.includes('meta') || event.metaKey) &&
        (!modifiers.includes('alt') || event.altKey) &&
        (!modifiers.includes('shift') || event.shiftKey);

      if (modifiersMatch && event.key.toLowerCase() === key) {
        if (preventDefault) {
          event.preventDefault();
        }
        callback(event);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [keys, callback, enabled, preventDefault]);
}

// ============================================
// useClickOutside - Detect clicks outside element
// ============================================

export function useClickOutside<T extends HTMLElement>(
  callback: () => void
): React.RefObject<T> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [callback]);

  return ref;
}
