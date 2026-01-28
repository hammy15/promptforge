'use client';

import { useState, useEffect } from 'react';
import { Icons } from './Icons';
import {
  PromptVersion,
  getPromptHistory,
  deletePromptVersion,
  comparePromptVersions,
} from '@/features/case-management';

interface PromptHistoryProps {
  onSelectVersion: (version: PromptVersion) => void;
  onClose: () => void;
  currentPrompt?: string;
}

export function PromptHistory({ onSelectVersion, onClose, currentPrompt }: PromptHistoryProps) {
  const [history, setHistory] = useState<PromptVersion[]>([]);
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);
  const [comparison, setComparison] = useState<ReturnType<typeof comparePromptVersions> | null>(null);
  const [view, setView] = useState<'list' | 'compare'>('list');

  useEffect(() => {
    setHistory(getPromptHistory());
  }, []);

  const handleDelete = (id: string) => {
    if (confirm('Delete this version?')) {
      deletePromptVersion(id);
      setHistory(getPromptHistory());
    }
  };

  const toggleCompareSelect = (id: string) => {
    if (selectedForCompare.includes(id)) {
      setSelectedForCompare(selectedForCompare.filter(i => i !== id));
    } else if (selectedForCompare.length < 2) {
      setSelectedForCompare([...selectedForCompare, id]);
    } else {
      setSelectedForCompare([selectedForCompare[1], id]);
    }
  };

  const handleCompare = () => {
    if (selectedForCompare.length === 2) {
      const result = comparePromptVersions(selectedForCompare[0], selectedForCompare[1]);
      setComparison(result);
      setView('compare');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const truncatePrompt = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[var(--card)] rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[var(--border-color)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4ECDC4] to-[#3EB489] flex items-center justify-center">
              <Icons.history className="w-5 h-5 text-[#0a1929]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[var(--foreground)]">Prompt History</h2>
              <p className="text-xs text-[var(--text-muted)]">
                {history.length} versions saved
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {view === 'compare' && (
              <button
                onClick={() => setView('list')}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-[var(--muted)] text-[var(--text-secondary)] hover:bg-[var(--card)]"
              >
                <Icons.arrowLeft className="w-3 h-3" />
                Back
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 hover:bg-[var(--muted)] rounded-lg transition-colors"
            >
              <Icons.x className="w-5 h-5 text-[var(--text-secondary)]" />
            </button>
          </div>
        </div>

        {/* Compare Button */}
        {view === 'list' && selectedForCompare.length === 2 && (
          <div className="px-4 py-2 bg-[rgba(78,205,196,0.1)] border-b border-[var(--border-color)]">
            <button
              onClick={handleCompare}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#4ECDC4] text-[#0a1929] text-sm font-medium hover:bg-[#3EB489] transition-colors"
            >
              <Icons.compare className="w-4 h-4" />
              Compare Selected Versions
            </button>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {view === 'list' ? (
            <>
              {history.length === 0 ? (
                <div className="text-center py-12">
                  <Icons.history className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-3 opacity-50" />
                  <p className="text-[var(--text-secondary)]">No history yet</p>
                  <p className="text-xs text-[var(--text-muted)] mt-1">
                    Generated prompts will appear here
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {history.map((version, index) => (
                    <div
                      key={version.id}
                      className={`group p-4 rounded-xl border transition-all ${
                        selectedForCompare.includes(version.id)
                          ? 'border-[#4ECDC4] bg-[rgba(78,205,196,0.1)]'
                          : 'border-[var(--border-color)] hover:border-[#4ECDC4] bg-[var(--muted)]'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {/* Compare Checkbox */}
                        <div
                          onClick={() => toggleCompareSelect(version.id)}
                          className={`w-5 h-5 rounded cursor-pointer flex items-center justify-center shrink-0 ${
                            selectedForCompare.includes(version.id)
                              ? 'bg-[#4ECDC4] text-[#0a1929]'
                              : 'bg-[var(--card)] border border-[var(--border-color)] hover:border-[#4ECDC4]'
                          }`}
                        >
                          {selectedForCompare.includes(version.id) && (
                            <span className="text-xs font-bold">
                              {selectedForCompare.indexOf(version.id) + 1}
                            </span>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-medium text-[var(--text-muted)]">
                              {formatDate(version.timestamp)}
                            </span>
                            {version.templateName && (
                              <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-[var(--card)] text-[var(--text-secondary)]">
                                {version.templateName}
                              </span>
                            )}
                            {version.score && (
                              <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                                version.score >= 80 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                version.score >= 60 ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                                'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                              }`}>
                                Score: {version.score}
                              </span>
                            )}
                            {index === 0 && (
                              <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#4ECDC4] text-[#0a1929]">
                                Latest
                              </span>
                            )}
                          </div>

                          <p className="text-sm text-[var(--foreground)] font-mono leading-relaxed">
                            {truncatePrompt(version.prompt)}
                          </p>

                          {version.tags && version.tags.length > 0 && (
                            <div className="flex gap-1 mt-2">
                              {version.tags.map(tag => (
                                <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] bg-[var(--card)] text-[var(--text-muted)]">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => onSelectVersion(version)}
                            className="p-2 hover:bg-[var(--card)] rounded-lg transition-colors"
                            title="Restore"
                          >
                            <Icons.refresh className="w-4 h-4 text-[#4ECDC4]" />
                          </button>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(version.prompt);
                            }}
                            className="p-2 hover:bg-[var(--card)] rounded-lg transition-colors"
                            title="Copy"
                          >
                            <Icons.copy className="w-4 h-4 text-[var(--text-muted)]" />
                          </button>
                          <button
                            onClick={() => handleDelete(version.id)}
                            className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Icons.trash className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            /* Compare View */
            comparison && (
              <div className="space-y-4">
                <div className="text-sm text-[var(--text-muted)] mb-4">
                  Comparing versions from {formatDate(history.find(h => h.id === selectedForCompare[0])?.timestamp || '')} and {formatDate(history.find(h => h.id === selectedForCompare[1])?.timestamp || '')}
                </div>

                {comparison.changed.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-[var(--foreground)] mb-2 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      Changed
                    </h3>
                    <div className="space-y-2">
                      {comparison.changed.map((change, i) => (
                        <div key={i} className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                          <div className="text-xs font-medium text-amber-700 dark:text-amber-400 mb-2">
                            {change.field}
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <div className="text-[10px] text-[var(--text-muted)] mb-1">Before</div>
                              <div className="text-xs text-[var(--text-secondary)] bg-red-100 dark:bg-red-900/30 p-2 rounded font-mono">
                                {truncatePrompt(change.old, 200)}
                              </div>
                            </div>
                            <div>
                              <div className="text-[10px] text-[var(--text-muted)] mb-1">After</div>
                              <div className="text-xs text-[var(--text-secondary)] bg-green-100 dark:bg-green-900/30 p-2 rounded font-mono">
                                {truncatePrompt(change.new, 200)}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {comparison.added.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-[var(--foreground)] mb-2 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500" />
                      Added Variables
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {comparison.added.map(v => (
                        <span key={v} className="px-2 py-1 rounded text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                          + {v}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {comparison.removed.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-[var(--foreground)] mb-2 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500" />
                      Removed Variables
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {comparison.removed.map(v => (
                        <span key={v} className="px-2 py-1 rounded text-xs bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                          - {v}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {comparison.changed.length === 0 && comparison.added.length === 0 && comparison.removed.length === 0 && (
                  <div className="text-center py-8">
                    <Icons.check className="w-12 h-12 text-green-500 mx-auto mb-3" />
                    <p className="text-[var(--text-secondary)]">These versions are identical</p>
                  </div>
                )}
              </div>
            )
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[var(--border-color)] text-xs text-[var(--text-muted)] text-center">
          {view === 'list' ? (
            <>Select two versions to compare changes • Click restore to use a previous version</>
          ) : (
            <>Showing differences between selected versions</>
          )}
        </div>
      </div>
    </div>
  );
}

export default PromptHistory;
