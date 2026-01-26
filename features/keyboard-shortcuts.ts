// keyboard-shortcuts.ts - Global keyboard shortcuts and command palette
// Cmd+K command palette, Vim mode support

import { useEffect, useCallback, useState, useMemo } from 'react';

// ============================================
// Types
// ============================================

export interface KeyboardShortcut {
  id: string;
  keys: string[]; // ['meta', 'k'] for Cmd+K
  description: string;
  category: ShortcutCategory;
  action: () => void;
  when?: () => boolean; // Condition to enable shortcut
}

export type ShortcutCategory =
  | 'navigation'
  | 'editing'
  | 'execution'
  | 'file'
  | 'view'
  | 'help';

export interface CommandPaletteItem {
  id: string;
  title: string;
  description?: string;
  category: string;
  shortcut?: string;
  icon?: string;
  action: () => void;
  keywords?: string[]; // For search matching
}

// ============================================
// Default Shortcuts
// ============================================

export const DEFAULT_SHORTCUTS: Omit<KeyboardShortcut, 'action'>[] = [
  // Navigation
  { id: 'open-command-palette', keys: ['meta', 'k'], description: 'Open command palette', category: 'navigation' },
  { id: 'go-to-prompts', keys: ['meta', '1'], description: 'Go to Prompts', category: 'navigation' },
  { id: 'go-to-templates', keys: ['meta', '2'], description: 'Go to Templates', category: 'navigation' },
  { id: 'go-to-experiments', keys: ['meta', '3'], description: 'Go to Experiments', category: 'navigation' },
  { id: 'go-to-analytics', keys: ['meta', '4'], description: 'Go to Analytics', category: 'navigation' },
  { id: 'search', keys: ['meta', 'shift', 'f'], description: 'Search everything', category: 'navigation' },

  // Editing
  { id: 'save', keys: ['meta', 's'], description: 'Save prompt', category: 'editing' },
  { id: 'save-as', keys: ['meta', 'shift', 's'], description: 'Save as new prompt', category: 'editing' },
  { id: 'undo', keys: ['meta', 'z'], description: 'Undo', category: 'editing' },
  { id: 'redo', keys: ['meta', 'shift', 'z'], description: 'Redo', category: 'editing' },
  { id: 'duplicate', keys: ['meta', 'd'], description: 'Duplicate prompt', category: 'editing' },
  { id: 'delete', keys: ['meta', 'backspace'], description: 'Delete prompt', category: 'editing' },

  // Execution
  { id: 'run-test', keys: ['meta', 'enter'], description: 'Run test', category: 'execution' },
  { id: 'stop-test', keys: ['meta', '.'], description: 'Stop running test', category: 'execution' },
  { id: 'run-batch', keys: ['meta', 'shift', 'enter'], description: 'Run batch test', category: 'execution' },

  // View
  { id: 'toggle-sidebar', keys: ['meta', 'b'], description: 'Toggle sidebar', category: 'view' },
  { id: 'toggle-preview', keys: ['meta', 'p'], description: 'Toggle preview panel', category: 'view' },
  { id: 'toggle-fullscreen', keys: ['meta', 'shift', 'f'], description: 'Toggle fullscreen', category: 'view' },
  { id: 'zoom-in', keys: ['meta', '='], description: 'Zoom in', category: 'view' },
  { id: 'zoom-out', keys: ['meta', '-'], description: 'Zoom out', category: 'view' },

  // File
  { id: 'new-prompt', keys: ['meta', 'n'], description: 'New prompt', category: 'file' },
  { id: 'open-prompt', keys: ['meta', 'o'], description: 'Open prompt', category: 'file' },
  { id: 'export', keys: ['meta', 'e'], description: 'Export prompt', category: 'file' },
  { id: 'import', keys: ['meta', 'i'], description: 'Import prompt', category: 'file' },

  // Help
  { id: 'show-shortcuts', keys: ['meta', '/'], description: 'Show keyboard shortcuts', category: 'help' },
  { id: 'show-help', keys: ['f1'], description: 'Show help', category: 'help' },
];

// ============================================
// Shortcut Hook
// ============================================

export function useKeyboardShortcuts(
  shortcuts: KeyboardShortcut[],
  options: {
    enabled?: boolean;
    preventDefault?: boolean;
  } = {}
) {
  const { enabled = true, preventDefault = true } = options;

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't trigger in inputs/textareas unless explicitly allowed
      const target = event.target as HTMLElement;
      const isInput = ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName);
      const isContentEditable = target.isContentEditable;

      for (const shortcut of shortcuts) {
        // Check condition
        if (shortcut.when && !shortcut.when()) continue;

        // Check key match
        if (matchesShortcut(event, shortcut.keys)) {
          // Skip if in input, unless it's a global shortcut (meta/ctrl key involved)
          const hasModifier = shortcut.keys.some(k => ['meta', 'ctrl', 'alt'].includes(k));
          if ((isInput || isContentEditable) && !hasModifier) continue;

          if (preventDefault) {
            event.preventDefault();
          }
          shortcut.action();
          return;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts, enabled, preventDefault]);
}

/**
 * Check if keyboard event matches shortcut keys
 */
function matchesShortcut(event: KeyboardEvent, keys: string[]): boolean {
  const modifiers = {
    meta: event.metaKey,
    ctrl: event.ctrlKey,
    alt: event.altKey,
    shift: event.shiftKey,
  };

  const keyPart = keys.filter(k => !['meta', 'ctrl', 'alt', 'shift'].includes(k))[0];
  const requiredModifiers = keys.filter(k => ['meta', 'ctrl', 'alt', 'shift'].includes(k));

  // Check key
  const keyMatches = event.key.toLowerCase() === keyPart?.toLowerCase() ||
    event.code.toLowerCase() === `key${keyPart?.toLowerCase()}`;

  // Check modifiers
  const modifiersMatch =
    requiredModifiers.every(m => modifiers[m as keyof typeof modifiers]) &&
    Object.entries(modifiers).every(
      ([m, pressed]) => requiredModifiers.includes(m) === pressed
    );

  return keyMatches && modifiersMatch;
}

/**
 * Format shortcut keys for display
 */
export function formatShortcut(keys: string[]): string {
  const isMac = typeof navigator !== 'undefined' && navigator.platform.includes('Mac');

  const keySymbols: Record<string, string> = {
    meta: isMac ? '⌘' : 'Ctrl',
    ctrl: isMac ? '⌃' : 'Ctrl',
    alt: isMac ? '⌥' : 'Alt',
    shift: '⇧',
    enter: '↵',
    backspace: '⌫',
    delete: '⌦',
    escape: 'Esc',
    tab: '⇥',
    up: '↑',
    down: '↓',
    left: '←',
    right: '→',
  };

  return keys
    .map(k => keySymbols[k] || k.toUpperCase())
    .join(isMac ? '' : '+');
}

// ============================================
// Command Palette Hook
// ============================================

export interface UseCommandPaletteOptions {
  commands: CommandPaletteItem[];
  onSelect?: (command: CommandPaletteItem) => void;
  maxResults?: number;
}

export function useCommandPalette(options: UseCommandPaletteOptions) {
  const { commands, onSelect, maxResults = 10 } = options;
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Filter commands based on search
  const filteredCommands = useMemo(() => {
    if (!search) return commands.slice(0, maxResults);

    const query = search.toLowerCase();
    return commands
      .filter(cmd => {
        const searchableText = [
          cmd.title,
          cmd.description,
          cmd.category,
          ...(cmd.keywords || []),
        ].join(' ').toLowerCase();
        return searchableText.includes(query);
      })
      .slice(0, maxResults);
  }, [commands, search, maxResults]);

  // Reset selection when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredCommands.length]);

  const open = useCallback(() => {
    setIsOpen(true);
    setSearch('');
    setSelectedIndex(0);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setSearch('');
  }, []);

  const selectCommand = useCallback((command: CommandPaletteItem) => {
    command.action();
    onSelect?.(command);
    close();
  }, [close, onSelect]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setSelectedIndex(i => Math.min(i + 1, filteredCommands.length - 1));
        break;
      case 'ArrowUp':
        event.preventDefault();
        setSelectedIndex(i => Math.max(i - 1, 0));
        break;
      case 'Enter':
        event.preventDefault();
        if (filteredCommands[selectedIndex]) {
          selectCommand(filteredCommands[selectedIndex]);
        }
        break;
      case 'Escape':
        event.preventDefault();
        close();
        break;
    }
  }, [filteredCommands, selectedIndex, selectCommand, close]);

  // Global shortcut to open
  useKeyboardShortcuts([
    {
      id: 'open-command-palette',
      keys: ['meta', 'k'],
      description: 'Open command palette',
      category: 'navigation',
      action: open,
    },
  ]);

  return {
    isOpen,
    open,
    close,
    search,
    setSearch,
    selectedIndex,
    setSelectedIndex,
    filteredCommands,
    selectCommand,
    handleKeyDown,
  };
}

// ============================================
// Vim Mode
// ============================================

export type VimMode = 'normal' | 'insert' | 'visual' | 'command';

export interface VimState {
  mode: VimMode;
  command: string;
  register: string;
  count: number;
}

export function useVimMode(options: {
  enabled?: boolean;
  onModeChange?: (mode: VimMode) => void;
  onCommand?: (command: string) => void;
} = {}) {
  const { enabled = false, onModeChange, onCommand } = options;
  const [state, setState] = useState<VimState>({
    mode: 'normal',
    command: '',
    register: '',
    count: 0,
  });

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      const isInput = ['INPUT', 'TEXTAREA'].includes(target.tagName);

      // Handle mode switching
      if (event.key === 'Escape') {
        setState(s => {
          if (s.mode !== 'normal') {
            onModeChange?.('normal');
            return { ...s, mode: 'normal', command: '' };
          }
          return s;
        });
        return;
      }

      if (state.mode === 'normal') {
        // Normal mode commands
        switch (event.key) {
          case 'i':
            event.preventDefault();
            setState(s => ({ ...s, mode: 'insert' }));
            onModeChange?.('insert');
            break;
          case 'v':
            event.preventDefault();
            setState(s => ({ ...s, mode: 'visual' }));
            onModeChange?.('visual');
            break;
          case ':':
            event.preventDefault();
            setState(s => ({ ...s, mode: 'command', command: '' }));
            onModeChange?.('command');
            break;
          // Navigation
          case 'j':
            onCommand?.('move-down');
            break;
          case 'k':
            onCommand?.('move-up');
            break;
          case 'h':
            onCommand?.('move-left');
            break;
          case 'l':
            onCommand?.('move-right');
            break;
          case 'g':
            if (state.command === 'g') {
              onCommand?.('go-to-start');
              setState(s => ({ ...s, command: '' }));
            } else {
              setState(s => ({ ...s, command: 'g' }));
            }
            break;
          case 'G':
            onCommand?.('go-to-end');
            break;
          // Actions
          case 'd':
            if (state.command === 'd') {
              onCommand?.('delete-line');
              setState(s => ({ ...s, command: '' }));
            } else {
              setState(s => ({ ...s, command: 'd' }));
            }
            break;
          case 'y':
            if (state.command === 'y') {
              onCommand?.('yank-line');
              setState(s => ({ ...s, command: '' }));
            } else {
              setState(s => ({ ...s, command: 'y' }));
            }
            break;
          case 'p':
            onCommand?.('paste');
            break;
          case 'u':
            onCommand?.('undo');
            break;
          case 'r':
            if (event.ctrlKey) {
              onCommand?.('redo');
            }
            break;
        }
      } else if (state.mode === 'command') {
        if (event.key === 'Enter') {
          event.preventDefault();
          onCommand?.(`:${state.command}`);
          setState(s => ({ ...s, mode: 'normal', command: '' }));
          onModeChange?.('normal');
        } else if (event.key === 'Backspace') {
          setState(s => ({ ...s, command: s.command.slice(0, -1) }));
        } else if (event.key.length === 1) {
          setState(s => ({ ...s, command: s.command + event.key }));
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enabled, state.mode, state.command, onModeChange, onCommand]);

  return {
    ...state,
    setMode: (mode: VimMode) => {
      setState(s => ({ ...s, mode }));
      onModeChange?.(mode);
    },
  };
}

// ============================================
// Shortcuts Reference Component Data
// ============================================

export function getShortcutsReference(): Record<ShortcutCategory, Array<{ keys: string; description: string }>> {
  return {
    navigation: [
      { keys: '⌘K', description: 'Open command palette' },
      { keys: '⌘1-4', description: 'Navigate to section' },
      { keys: '⌘⇧F', description: 'Global search' },
    ],
    editing: [
      { keys: '⌘S', description: 'Save' },
      { keys: '⌘Z', description: 'Undo' },
      { keys: '⌘⇧Z', description: 'Redo' },
      { keys: '⌘D', description: 'Duplicate' },
    ],
    execution: [
      { keys: '⌘↵', description: 'Run test' },
      { keys: '⌘.', description: 'Stop test' },
      { keys: '⌘⇧↵', description: 'Run batch' },
    ],
    view: [
      { keys: '⌘B', description: 'Toggle sidebar' },
      { keys: '⌘P', description: 'Toggle preview' },
      { keys: '⌘+/-', description: 'Zoom in/out' },
    ],
    file: [
      { keys: '⌘N', description: 'New prompt' },
      { keys: '⌘O', description: 'Open prompt' },
      { keys: '⌘E', description: 'Export' },
    ],
    help: [
      { keys: '⌘/', description: 'Show shortcuts' },
      { keys: 'F1', description: 'Help' },
    ],
  };
}
