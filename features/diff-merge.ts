// diff-merge.ts - Visual diff and merge tools for prompt versioning
// Compare versions, track changes, merge branches

// ============================================
// Types
// ============================================

export interface DiffResult {
  hunks: DiffHunk[];
  stats: DiffStats;
  similarity: number; // 0-100
}

export interface DiffHunk {
  oldStart: number;
  oldLines: number;
  newStart: number;
  newLines: number;
  changes: DiffChange[];
}

export interface DiffChange {
  type: 'add' | 'remove' | 'unchanged';
  content: string;
  oldLineNumber?: number;
  newLineNumber?: number;
}

export interface DiffStats {
  additions: number;
  deletions: number;
  unchanged: number;
  totalOld: number;
  totalNew: number;
}

export interface MergeResult {
  success: boolean;
  merged: string;
  conflicts: MergeConflict[];
  resolvedAutomatically: number;
}

export interface MergeConflict {
  id: string;
  position: { start: number; end: number };
  base: string;
  ours: string;
  theirs: string;
  resolved?: string;
  resolvedBy?: 'ours' | 'theirs' | 'manual' | 'both';
}

export interface PromptVersion {
  id: string;
  version: string;
  content: string;
  systemPrompt: string;
  timestamp: string;
  author: string;
  message: string;
  parentId?: string;
}

// ============================================
// Diff Algorithm (Myers)
// ============================================

/**
 * Compute diff between two texts
 */
export function computeDiff(oldText: string, newText: string): DiffResult {
  const oldLines = oldText.split('\n');
  const newLines = newText.split('\n');

  const lcs = longestCommonSubsequence(oldLines, newLines);
  const changes = buildChanges(oldLines, newLines, lcs);
  const hunks = buildHunks(changes, 3); // 3 lines of context

  const stats: DiffStats = {
    additions: changes.filter((c) => c.type === 'add').length,
    deletions: changes.filter((c) => c.type === 'remove').length,
    unchanged: changes.filter((c) => c.type === 'unchanged').length,
    totalOld: oldLines.length,
    totalNew: newLines.length,
  };

  // Calculate similarity using Jaccard index
  const similarity = calculateSimilarity(oldLines, newLines);

  return { hunks, stats, similarity };
}

function longestCommonSubsequence(a: string[], b: string[]): number[][] {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp;
}

function buildChanges(
  oldLines: string[],
  newLines: string[],
  lcs: number[][]
): DiffChange[] {
  const changes: DiffChange[] = [];
  let i = oldLines.length;
  let j = newLines.length;

  const result: DiffChange[] = [];

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && oldLines[i - 1] === newLines[j - 1]) {
      result.unshift({
        type: 'unchanged',
        content: oldLines[i - 1],
        oldLineNumber: i,
        newLineNumber: j,
      });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || lcs[i][j - 1] >= lcs[i - 1][j])) {
      result.unshift({
        type: 'add',
        content: newLines[j - 1],
        newLineNumber: j,
      });
      j--;
    } else if (i > 0) {
      result.unshift({
        type: 'remove',
        content: oldLines[i - 1],
        oldLineNumber: i,
      });
      i--;
    }
  }

  return result;
}

function buildHunks(changes: DiffChange[], contextLines: number): DiffHunk[] {
  const hunks: DiffHunk[] = [];
  let currentHunk: DiffHunk | null = null;
  let unchangedBuffer: DiffChange[] = [];

  for (let i = 0; i < changes.length; i++) {
    const change = changes[i];

    if (change.type === 'unchanged') {
      unchangedBuffer.push(change);

      // If we have too many unchanged lines, close current hunk
      if (unchangedBuffer.length > contextLines * 2 && currentHunk) {
        // Add trailing context
        currentHunk.changes.push(...unchangedBuffer.slice(0, contextLines));
        hunks.push(currentHunk);
        currentHunk = null;
        unchangedBuffer = unchangedBuffer.slice(contextLines);
      }
    } else {
      // Start new hunk if needed
      if (!currentHunk) {
        currentHunk = {
          oldStart: change.oldLineNumber || 1,
          oldLines: 0,
          newStart: change.newLineNumber || 1,
          newLines: 0,
          changes: [],
        };

        // Add leading context
        const context = unchangedBuffer.slice(-contextLines);
        currentHunk.changes.push(...context);
        if (context.length > 0) {
          currentHunk.oldStart = context[0].oldLineNumber || currentHunk.oldStart;
          currentHunk.newStart = context[0].newLineNumber || currentHunk.newStart;
        }
      } else {
        // Add buffered unchanged lines
        currentHunk.changes.push(...unchangedBuffer);
      }

      unchangedBuffer = [];
      currentHunk.changes.push(change);
    }
  }

  // Close final hunk
  if (currentHunk) {
    currentHunk.changes.push(...unchangedBuffer.slice(0, contextLines));
    hunks.push(currentHunk);
  }

  // Calculate line counts for each hunk
  for (const hunk of hunks) {
    hunk.oldLines = hunk.changes.filter((c) => c.type !== 'add').length;
    hunk.newLines = hunk.changes.filter((c) => c.type !== 'remove').length;
  }

  return hunks;
}

function calculateSimilarity(a: string[], b: string[]): number {
  const setA = new Set(a);
  const setB = new Set(b);

  const intersection = [...setA].filter((x) => setB.has(x)).length;
  const union = new Set([...setA, ...setB]).size;

  if (union === 0) return 100;
  return Math.round((intersection / union) * 100);
}

// ============================================
// Word-Level Diff
// ============================================

export interface WordDiff {
  type: 'add' | 'remove' | 'unchanged';
  text: string;
}

/**
 * Compute word-level diff for more granular changes
 */
export function computeWordDiff(oldText: string, newText: string): WordDiff[] {
  const oldWords = tokenize(oldText);
  const newWords = tokenize(newText);

  const lcs = longestCommonSubsequence(oldWords, newWords);
  const changes = buildChanges(oldWords, newWords, lcs);

  return changes.map((c) => ({
    type: c.type,
    text: c.content,
  }));
}

function tokenize(text: string): string[] {
  // Split on word boundaries while preserving whitespace
  return text.match(/\S+|\s+/g) || [];
}

// ============================================
// Three-Way Merge
// ============================================

/**
 * Perform three-way merge
 */
export function threeWayMerge(
  base: string,
  ours: string,
  theirs: string
): MergeResult {
  const baseLines = base.split('\n');
  const ourLines = ours.split('\n');
  const theirLines = theirs.split('\n');

  const conflicts: MergeConflict[] = [];
  const mergedLines: string[] = [];
  let resolvedAutomatically = 0;

  // Compute diffs
  const ourDiff = computeDiff(base, ours);
  const theirDiff = computeDiff(base, theirs);

  // Track which lines were changed
  const ourChanges = new Map<number, string>();
  const theirChanges = new Map<number, string>();

  for (const hunk of ourDiff.hunks) {
    for (const change of hunk.changes) {
      if (change.type === 'add' && change.newLineNumber) {
        ourChanges.set(change.newLineNumber, change.content);
      }
    }
  }

  for (const hunk of theirDiff.hunks) {
    for (const change of hunk.changes) {
      if (change.type === 'add' && change.newLineNumber) {
        theirChanges.set(change.newLineNumber, change.content);
      }
    }
  }

  // Simple merge strategy: line by line
  const maxLines = Math.max(baseLines.length, ourLines.length, theirLines.length);

  for (let i = 0; i < maxLines; i++) {
    const baseLine = baseLines[i] ?? '';
    const ourLine = ourLines[i] ?? '';
    const theirLine = theirLines[i] ?? '';

    if (ourLine === theirLine) {
      // Both agree
      mergedLines.push(ourLine);
      if (ourLine !== baseLine) {
        resolvedAutomatically++;
      }
    } else if (ourLine === baseLine) {
      // Only theirs changed
      mergedLines.push(theirLine);
      resolvedAutomatically++;
    } else if (theirLine === baseLine) {
      // Only ours changed
      mergedLines.push(ourLine);
      resolvedAutomatically++;
    } else {
      // Conflict - both changed differently
      conflicts.push({
        id: `conflict_${i}`,
        position: { start: i, end: i },
        base: baseLine,
        ours: ourLine,
        theirs: theirLine,
      });
      // Add conflict marker
      mergedLines.push(`<<<<<<< OURS`);
      mergedLines.push(ourLine);
      mergedLines.push(`=======`);
      mergedLines.push(theirLine);
      mergedLines.push(`>>>>>>> THEIRS`);
    }
  }

  return {
    success: conflicts.length === 0,
    merged: mergedLines.join('\n'),
    conflicts,
    resolvedAutomatically,
  };
}

/**
 * Resolve a merge conflict
 */
export function resolveConflict(
  mergeResult: MergeResult,
  conflictId: string,
  resolution: 'ours' | 'theirs' | 'both' | string
): MergeResult {
  const conflict = mergeResult.conflicts.find((c) => c.id === conflictId);
  if (!conflict) return mergeResult;

  let resolvedText: string;
  let resolvedBy: MergeConflict['resolvedBy'];

  switch (resolution) {
    case 'ours':
      resolvedText = conflict.ours;
      resolvedBy = 'ours';
      break;
    case 'theirs':
      resolvedText = conflict.theirs;
      resolvedBy = 'theirs';
      break;
    case 'both':
      resolvedText = `${conflict.ours}\n${conflict.theirs}`;
      resolvedBy = 'both';
      break;
    default:
      resolvedText = resolution;
      resolvedBy = 'manual';
  }

  conflict.resolved = resolvedText;
  conflict.resolvedBy = resolvedBy;

  // Rebuild merged content
  const lines = mergeResult.merged.split('\n');
  const newLines: string[] = [];
  let inConflict = false;
  let currentConflictId = '';

  for (let i = 0; i < lines.length; i++) {
    if (lines[i] === '<<<<<<< OURS') {
      inConflict = true;
      currentConflictId = `conflict_${i}`;
      continue;
    }

    if (lines[i] === '>>>>>>> THEIRS') {
      inConflict = false;
      const conf = mergeResult.conflicts.find((c) => c.id === currentConflictId);
      if (conf?.resolved) {
        newLines.push(conf.resolved);
      }
      continue;
    }

    if (lines[i] === '=======' && inConflict) {
      continue;
    }

    if (!inConflict) {
      newLines.push(lines[i]);
    }
  }

  return {
    ...mergeResult,
    merged: newLines.join('\n'),
    success: mergeResult.conflicts.every((c) => c.resolved !== undefined),
  };
}

// ============================================
// Version History Helpers
// ============================================

/**
 * Compare two versions and generate a summary
 */
export function compareVersions(
  oldVersion: PromptVersion,
  newVersion: PromptVersion
): {
  diff: DiffResult;
  systemDiff: DiffResult;
  summary: string;
} {
  const diff = computeDiff(oldVersion.content, newVersion.content);
  const systemDiff = computeDiff(oldVersion.systemPrompt, newVersion.systemPrompt);

  const parts: string[] = [];

  if (diff.stats.additions > 0 || diff.stats.deletions > 0) {
    parts.push(
      `User prompt: +${diff.stats.additions} -${diff.stats.deletions} lines`
    );
  }

  if (systemDiff.stats.additions > 0 || systemDiff.stats.deletions > 0) {
    parts.push(
      `System prompt: +${systemDiff.stats.additions} -${systemDiff.stats.deletions} lines`
    );
  }

  if (parts.length === 0) {
    parts.push('No changes detected');
  }

  return {
    diff,
    systemDiff,
    summary: parts.join('; '),
  };
}

/**
 * Format diff for display
 */
export function formatDiff(diff: DiffResult): string {
  const lines: string[] = [];

  for (const hunk of diff.hunks) {
    lines.push(`@@ -${hunk.oldStart},${hunk.oldLines} +${hunk.newStart},${hunk.newLines} @@`);

    for (const change of hunk.changes) {
      const prefix = change.type === 'add' ? '+' : change.type === 'remove' ? '-' : ' ';
      lines.push(`${prefix}${change.content}`);
    }
  }

  return lines.join('\n');
}

/**
 * Apply a diff to create the new version
 */
export function applyDiff(original: string, diff: DiffResult): string {
  const originalLines = original.split('\n');
  const newLines: string[] = [];
  let originalIndex = 0;

  for (const hunk of diff.hunks) {
    // Copy unchanged lines before this hunk
    while (originalIndex < hunk.oldStart - 1) {
      newLines.push(originalLines[originalIndex]);
      originalIndex++;
    }

    // Apply changes
    for (const change of hunk.changes) {
      if (change.type === 'unchanged') {
        newLines.push(change.content);
        originalIndex++;
      } else if (change.type === 'add') {
        newLines.push(change.content);
      } else if (change.type === 'remove') {
        originalIndex++;
      }
    }
  }

  // Copy remaining unchanged lines
  while (originalIndex < originalLines.length) {
    newLines.push(originalLines[originalIndex]);
    originalIndex++;
  }

  return newLines.join('\n');
}

// ============================================
// Interactive Diff Helpers
// ============================================

export interface InlineDiff {
  segments: Array<{
    type: 'unchanged' | 'added' | 'removed';
    text: string;
  }>;
}

/**
 * Generate inline diff for single-line comparison
 */
export function inlineDiff(oldLine: string, newLine: string): InlineDiff {
  const wordDiff = computeWordDiff(oldLine, newLine);

  return {
    segments: wordDiff.map((w) => ({
      type: w.type === 'add' ? 'added' : w.type === 'remove' ? 'removed' : 'unchanged',
      text: w.text,
    })),
  };
}

/**
 * Get change statistics summary
 */
export function getDiffSummary(diff: DiffResult): string {
  const { additions, deletions, similarity } = { ...diff.stats, similarity: diff.similarity };

  if (additions === 0 && deletions === 0) {
    return 'No changes';
  }

  const parts: string[] = [];
  if (additions > 0) parts.push(`+${additions}`);
  if (deletions > 0) parts.push(`-${deletions}`);

  return `${parts.join(' ')} (${similarity}% similar)`;
}
