'use client';

import { useState, useEffect } from 'react';
import { Icons } from './Icons';
import {
  PatientCase,
  getAllCases,
  deleteCase,
  archiveCase,
  searchCases,
  getRecentCases,
  exportCases,
  getCaseStatistics,
} from '@/features/case-management';

interface CaseManagerProps {
  onSelectCase: (caseData: PatientCase) => void;
  onClose: () => void;
}

export function CaseManager({ onSelectCase, onClose }: CaseManagerProps) {
  const [cases, setCases] = useState<PatientCase[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'draft' | 'complete' | 'archived'>('all');
  const [stats, setStats] = useState<ReturnType<typeof getCaseStatistics> | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadCases();
  }, [searchQuery, filter]);

  const loadCases = () => {
    let result: PatientCase[];

    if (searchQuery) {
      result = searchCases(searchQuery);
    } else {
      result = getAllCases();
    }

    if (filter !== 'all') {
      result = result.filter(c => c.status === filter);
    }

    setCases(result);
    setStats(getCaseStatistics());
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this case?')) {
      deleteCase(id);
      loadCases();
    }
  };

  const handleArchive = (id: string) => {
    archiveCase(id);
    loadCases();
  };

  const handleExport = () => {
    const ids = selectedIds.size > 0 ? Array.from(selectedIds) : undefined;
    exportCases(ids);
  };

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[var(--card)] rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[var(--border-color)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4ECDC4] to-[#3EB489] flex items-center justify-center">
              <Icons.folder className="w-5 h-5 text-[#0a1929]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[var(--foreground)]">Case Manager</h2>
              <p className="text-xs text-[var(--text-muted)]">
                {stats?.total || 0} cases • {stats?.eligibleCount || 0} eligible
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[var(--muted)] rounded-lg transition-colors"
          >
            <Icons.x className="w-5 h-5 text-[var(--text-secondary)]" />
          </button>
        </div>

        {/* Search & Filters */}
        <div className="p-4 border-b border-[var(--border-color)] flex flex-wrap gap-3">
          <div className="flex-1 min-w-[200px] relative">
            <Icons.search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, diagnosis, or MRN..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-[var(--muted)] border border-[var(--border-color)] focus:border-[#4ECDC4] focus:outline-none text-sm"
            />
          </div>

          <div className="flex gap-1">
            {(['all', 'draft', 'complete', 'archived'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  filter === f
                    ? 'bg-[#4ECDC4] text-[#0a1929]'
                    : 'bg-[var(--muted)] text-[var(--text-secondary)] hover:bg-[var(--card)]'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--muted)] text-[var(--text-secondary)] hover:bg-[var(--card)] text-xs font-medium transition-all"
          >
            <Icons.download className="w-4 h-4" />
            Export {selectedIds.size > 0 ? `(${selectedIds.size})` : 'All'}
          </button>
        </div>

        {/* Case List */}
        <div className="flex-1 overflow-y-auto p-4">
          {cases.length === 0 ? (
            <div className="text-center py-12">
              <Icons.folder className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-3 opacity-50" />
              <p className="text-[var(--text-secondary)]">No cases found</p>
              <p className="text-xs text-[var(--text-muted)] mt-1">
                Save an assessment to see it here
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {cases.map(c => (
                <div
                  key={c.id}
                  className={`group flex items-start gap-3 p-4 rounded-xl border transition-all cursor-pointer ${
                    selectedIds.has(c.id)
                      ? 'border-[#4ECDC4] bg-[rgba(78,205,196,0.1)]'
                      : 'border-[var(--border-color)] hover:border-[#4ECDC4] bg-[var(--muted)]'
                  }`}
                  onClick={() => onSelectCase(c)}
                >
                  {/* Checkbox */}
                  <div
                    onClick={(e) => { e.stopPropagation(); toggleSelect(c.id); }}
                    className={`w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 ${
                      selectedIds.has(c.id)
                        ? 'bg-[#4ECDC4] text-[#0a1929]'
                        : 'bg-[var(--card)] border border-[var(--border-color)]'
                    }`}
                  >
                    {selectedIds.has(c.id) && <Icons.check className="w-3 h-3" />}
                  </div>

                  {/* Status Indicator */}
                  <div className={`w-2 h-2 rounded-full shrink-0 mt-2 ${
                    c.eligibilityResult?.eligible ? 'bg-green-500' :
                    c.status === 'complete' ? 'bg-amber-500' :
                    c.status === 'archived' ? 'bg-gray-400' : 'bg-blue-500'
                  }`} />

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-[var(--foreground)]">
                        {c.patientName}
                      </span>
                      {c.patientMRN && (
                        <span className="text-xs text-[var(--text-muted)]">
                          MRN: {c.patientMRN}
                        </span>
                      )}
                      <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                        c.status === 'complete' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                        c.status === 'archived' ? 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400' :
                        'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                      }`}>
                        {c.status}
                      </span>
                    </div>

                    <p className="text-sm text-[var(--text-secondary)] truncate">
                      {c.primaryDiagnosis}
                      {c.secondaryDiagnoses && ` • ${c.secondaryDiagnoses}`}
                    </p>

                    <div className="flex items-center gap-4 mt-2 text-xs text-[var(--text-muted)]">
                      <span>Created: {formatDate(c.createdAt)}</span>
                      {c.ppsScore && <span>PPS: {c.ppsScore}%</span>}
                      {c.eligibilityResult && (
                        <span className={c.eligibilityResult.eligible ? 'text-green-600' : 'text-amber-600'}>
                          {c.eligibilityResult.eligible ? 'Eligible' : 'Needs Review'}
                        </span>
                      )}
                    </div>

                    {c.tags && c.tags.length > 0 && (
                      <div className="flex gap-1 mt-2">
                        {c.tags.map(tag => (
                          <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] bg-[var(--card)] text-[var(--text-muted)]">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {c.status !== 'archived' && (
                      <button
                        onClick={(e) => { e.stopPropagation(); handleArchive(c.id); }}
                        className="p-2 hover:bg-[var(--card)] rounded-lg transition-colors"
                        title="Archive"
                      >
                        <Icons.archive className="w-4 h-4 text-[var(--text-muted)]" />
                      </button>
                    )}
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDelete(c.id); }}
                      className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Icons.trash className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Stats */}
        {stats && (
          <div className="p-4 border-t border-[var(--border-color)] flex items-center justify-between text-xs text-[var(--text-muted)]">
            <div className="flex items-center gap-4">
              <span>Draft: {stats.byStatus.draft || 0}</span>
              <span>Complete: {stats.byStatus.complete || 0}</span>
              <span>Archived: {stats.byStatus.archived || 0}</span>
            </div>
            <span>
              Avg. Confidence: <span className={
                stats.avgConfidence === 'high' ? 'text-green-500' :
                stats.avgConfidence === 'medium' ? 'text-amber-500' : 'text-red-500'
              }>{stats.avgConfidence}</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default CaseManager;
