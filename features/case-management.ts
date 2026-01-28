// Patient Case Management System
// Save, load, and manage hospice eligibility assessments

export interface PatientCase {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: 'draft' | 'complete' | 'archived';

  // Patient Info
  patientName: string;
  patientDOB?: string;
  patientMRN?: string;

  // Clinical Data
  primaryDiagnosis: string;
  secondaryDiagnoses?: string;
  ppsScore?: number;
  kpsScore?: number;
  fastScore?: string;
  ecogScore?: number;
  adlDependencies?: number;
  weightChange?: string;
  nutritionalStatus?: string;
  hospitalizations?: string;
  infections?: string;
  careGoals?: string;

  // Assessment
  templateId: string;
  variableValues: Record<string, string>;
  generatedPrompt?: string;
  eligibilityResult?: {
    eligible: boolean;
    confidence: 'high' | 'medium' | 'low';
    criteria: { criterion: string; met: boolean; notes?: string }[];
  };

  // Metadata
  tags?: string[];
  notes?: string;
  assignedTo?: string;
}

const STORAGE_KEY = 'promptforge-patient-cases';
const HISTORY_KEY = 'promptforge-prompt-history';

// Generate unique ID
function generateId(): string {
  return `case-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Get all cases from localStorage
export function getAllCases(): PatientCase[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

// Get a single case by ID
export function getCase(id: string): PatientCase | null {
  const cases = getAllCases();
  return cases.find(c => c.id === id) || null;
}

// Save a new case
export function saveCase(caseData: Omit<PatientCase, 'id' | 'createdAt' | 'updatedAt'>): PatientCase {
  const cases = getAllCases();
  const now = new Date().toISOString();

  const newCase: PatientCase = {
    ...caseData,
    id: generateId(),
    createdAt: now,
    updatedAt: now,
  };

  cases.unshift(newCase); // Add to beginning
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cases));

  return newCase;
}

// Update an existing case
export function updateCase(id: string, updates: Partial<PatientCase>): PatientCase | null {
  const cases = getAllCases();
  const index = cases.findIndex(c => c.id === id);

  if (index === -1) return null;

  cases[index] = {
    ...cases[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(cases));
  return cases[index];
}

// Delete a case
export function deleteCase(id: string): boolean {
  const cases = getAllCases();
  const filtered = cases.filter(c => c.id !== id);

  if (filtered.length === cases.length) return false;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return true;
}

// Archive a case
export function archiveCase(id: string): PatientCase | null {
  return updateCase(id, { status: 'archived' });
}

// Search cases
export function searchCases(query: string): PatientCase[] {
  const cases = getAllCases();
  const lowerQuery = query.toLowerCase();

  return cases.filter(c =>
    c.patientName.toLowerCase().includes(lowerQuery) ||
    c.primaryDiagnosis.toLowerCase().includes(lowerQuery) ||
    c.patientMRN?.toLowerCase().includes(lowerQuery) ||
    c.tags?.some(t => t.toLowerCase().includes(lowerQuery))
  );
}

// Filter cases by status
export function getCasesByStatus(status: PatientCase['status']): PatientCase[] {
  return getAllCases().filter(c => c.status === status);
}

// Get recent cases
export function getRecentCases(limit: number = 10): PatientCase[] {
  return getAllCases()
    .filter(c => c.status !== 'archived')
    .slice(0, limit);
}

// Export cases to JSON file
export function exportCases(caseIds?: string[]): void {
  const cases = caseIds
    ? getAllCases().filter(c => caseIds.includes(c.id))
    : getAllCases();

  const blob = new Blob([JSON.stringify(cases, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `hospice-cases-export-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Import cases from JSON file
export function importCases(jsonString: string): { imported: number; errors: string[] } {
  const errors: string[] = [];
  let imported = 0;

  try {
    const importedCases = JSON.parse(jsonString);

    if (!Array.isArray(importedCases)) {
      return { imported: 0, errors: ['Invalid format: expected array of cases'] };
    }

    const existingCases = getAllCases();
    const existingIds = new Set(existingCases.map(c => c.id));

    importedCases.forEach((c: PatientCase, index: number) => {
      if (!c.patientName || !c.primaryDiagnosis) {
        errors.push(`Case ${index + 1}: Missing required fields`);
        return;
      }

      // Generate new ID if it already exists
      if (existingIds.has(c.id)) {
        c.id = generateId();
      }

      existingCases.push(c);
      imported++;
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(existingCases));
  } catch (e) {
    errors.push('Failed to parse JSON file');
  }

  return { imported, errors };
}

// === PROMPT VERSION HISTORY ===

export interface PromptVersion {
  id: string;
  timestamp: string;
  prompt: string;
  templateId?: string;
  templateName?: string;
  variableValues?: Record<string, string>;
  score?: number;
  tags?: string[];
}

// Get prompt history
export function getPromptHistory(): PromptVersion[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(HISTORY_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

// Save prompt to history
export function savePromptToHistory(data: Omit<PromptVersion, 'id' | 'timestamp'>): PromptVersion {
  const history = getPromptHistory();

  const newVersion: PromptVersion = {
    ...data,
    id: `prompt-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date().toISOString(),
  };

  // Keep only last 100 versions
  history.unshift(newVersion);
  const trimmed = history.slice(0, 100);

  localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));
  return newVersion;
}

// Get prompt by ID
export function getPromptVersion(id: string): PromptVersion | null {
  const history = getPromptHistory();
  return history.find(v => v.id === id) || null;
}

// Delete prompt from history
export function deletePromptVersion(id: string): boolean {
  const history = getPromptHistory();
  const filtered = history.filter(v => v.id !== id);

  if (filtered.length === history.length) return false;

  localStorage.setItem(HISTORY_KEY, JSON.stringify(filtered));
  return true;
}

// Clear all history
export function clearPromptHistory(): void {
  localStorage.removeItem(HISTORY_KEY);
}

// Compare two prompt versions
export function comparePromptVersions(id1: string, id2: string): {
  added: string[];
  removed: string[];
  changed: { field: string; old: string; new: string }[];
} | null {
  const v1 = getPromptVersion(id1);
  const v2 = getPromptVersion(id2);

  if (!v1 || !v2) return null;

  const added: string[] = [];
  const removed: string[] = [];
  const changed: { field: string; old: string; new: string }[] = [];

  // Compare prompts
  if (v1.prompt !== v2.prompt) {
    changed.push({ field: 'prompt', old: v1.prompt, new: v2.prompt });
  }

  // Compare variables
  const allVars = new Set([
    ...Object.keys(v1.variableValues || {}),
    ...Object.keys(v2.variableValues || {}),
  ]);

  allVars.forEach(varName => {
    const val1 = v1.variableValues?.[varName];
    const val2 = v2.variableValues?.[varName];

    if (val1 && !val2) {
      removed.push(varName);
    } else if (!val1 && val2) {
      added.push(varName);
    } else if (val1 !== val2) {
      changed.push({ field: varName, old: val1 || '', new: val2 || '' });
    }
  });

  return { added, removed, changed };
}

// Statistics
export function getCaseStatistics(): {
  total: number;
  byStatus: Record<string, number>;
  byDiagnosis: Record<string, number>;
  eligibleCount: number;
  avgConfidence: string;
} {
  const cases = getAllCases();

  const byStatus: Record<string, number> = {};
  const byDiagnosis: Record<string, number> = {};
  let eligibleCount = 0;
  let confidenceSum = 0;
  let confidenceCount = 0;

  cases.forEach(c => {
    // By status
    byStatus[c.status] = (byStatus[c.status] || 0) + 1;

    // By diagnosis (simplified)
    const diagCategory = c.primaryDiagnosis.split(' ')[0];
    byDiagnosis[diagCategory] = (byDiagnosis[diagCategory] || 0) + 1;

    // Eligibility
    if (c.eligibilityResult?.eligible) eligibleCount++;

    // Confidence
    if (c.eligibilityResult?.confidence) {
      const confMap = { high: 3, medium: 2, low: 1 };
      confidenceSum += confMap[c.eligibilityResult.confidence];
      confidenceCount++;
    }
  });

  const avgConfNum = confidenceCount > 0 ? confidenceSum / confidenceCount : 0;
  const avgConfidence = avgConfNum >= 2.5 ? 'high' : avgConfNum >= 1.5 ? 'medium' : 'low';

  return {
    total: cases.length,
    byStatus,
    byDiagnosis,
    eligibleCount,
    avgConfidence,
  };
}
