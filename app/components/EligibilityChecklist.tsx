'use client';

import { useState, useEffect } from 'react';
import { Icons } from './Icons';

// Medicare LCD Hospice Eligibility Criteria
export interface EligibilityCriteria {
  id: string;
  category: string;
  criterion: string;
  description: string;
  required: boolean;
  met: boolean | null;
  notes?: string;
}

export interface EligibilityAssessment {
  patientName: string;
  diagnosis: string;
  assessmentDate: string;
  criteria: EligibilityCriteria[];
  overallEligible: boolean;
  confidence: 'high' | 'medium' | 'low';
  recommendations: string[];
}

// General hospice eligibility criteria based on Medicare LCD
const GENERAL_CRITERIA: Omit<EligibilityCriteria, 'met' | 'notes'>[] = [
  {
    id: 'terminal-prognosis',
    category: 'Prognosis',
    criterion: 'Terminal prognosis of 6 months or less',
    description: 'Physician certifies life expectancy of 6 months or less if disease runs its normal course',
    required: true,
  },
  {
    id: 'physician-certification',
    category: 'Certification',
    criterion: 'Physician certification obtained',
    description: 'Attending physician and hospice medical director have certified terminal illness',
    required: true,
  },
  {
    id: 'palliative-focus',
    category: 'Goals of Care',
    criterion: 'Patient elects palliative care',
    description: 'Patient/family chooses comfort-focused care over curative treatment',
    required: true,
  },
  {
    id: 'functional-decline',
    category: 'Functional Status',
    criterion: 'Progressive functional decline',
    description: 'PPS ≤ 70% or KPS ≤ 70% with documented decline',
    required: true,
  },
  {
    id: 'nutritional-decline',
    category: 'Nutritional Status',
    criterion: 'Nutritional impairment',
    description: 'Unintentional weight loss >10% over 6 months or BMI <22',
    required: false,
  },
  {
    id: 'recurrent-infections',
    category: 'Clinical Indicators',
    criterion: 'Recurrent infections',
    description: 'Multiple infections requiring antibiotics in past 6 months',
    required: false,
  },
  {
    id: 'hospitalizations',
    category: 'Clinical Indicators',
    criterion: 'Frequent hospitalizations',
    description: '≥2 hospitalizations or ED visits in past 6 months',
    required: false,
  },
  {
    id: 'symptom-burden',
    category: 'Symptom Management',
    criterion: 'Significant symptom burden',
    description: 'Uncontrolled pain, dyspnea, nausea, or other distressing symptoms',
    required: false,
  },
];

// Disease-specific criteria
const DISEASE_CRITERIA: Record<string, Omit<EligibilityCriteria, 'met' | 'notes'>[]> = {
  'heart-failure': [
    {
      id: 'nyha-class',
      category: 'Disease Severity',
      criterion: 'NYHA Class III or IV',
      description: 'Symptoms at rest or with minimal activity despite optimal treatment',
      required: true,
    },
    {
      id: 'ef-documented',
      category: 'Cardiac Function',
      criterion: 'EF ≤ 20% (if measured)',
      description: 'Severely reduced ejection fraction on recent echocardiogram',
      required: false,
    },
    {
      id: 'optimal-treatment',
      category: 'Treatment Status',
      criterion: 'Optimal medical therapy',
      description: 'Patient already on maximum tolerated cardiac medications',
      required: true,
    },
  ],
  'cancer': [
    {
      id: 'metastatic',
      category: 'Disease Stage',
      criterion: 'Metastatic or locally advanced disease',
      description: 'Cancer has spread or is not amenable to curative treatment',
      required: true,
    },
    {
      id: 'declined-treatment',
      category: 'Treatment Status',
      criterion: 'Declined or completed treatment',
      description: 'Patient has declined further treatment or completed all reasonable options',
      required: true,
    },
    {
      id: 'ecog-status',
      category: 'Performance Status',
      criterion: 'ECOG ≥ 3',
      description: 'Capable of only limited self-care, confined to bed/chair >50% of waking hours',
      required: false,
    },
  ],
  'dementia': [
    {
      id: 'fast-stage',
      category: 'Disease Severity',
      criterion: 'FAST Stage 7A or beyond',
      description: 'Unable to ambulate, dress, bathe without assistance; limited speech',
      required: true,
    },
    {
      id: 'comorbidity',
      category: 'Complications',
      criterion: 'Comorbid condition in past 12 months',
      description: 'Aspiration pneumonia, pyelonephritis, septicemia, pressure ulcers, or recurrent fever',
      required: true,
    },
    {
      id: 'nutritional-dementia',
      category: 'Nutritional Status',
      criterion: 'Nutritional impairment',
      description: 'Weight loss, dehydration, or serum albumin <2.5',
      required: false,
    },
  ],
  'copd': [
    {
      id: 'oxygen-dependent',
      category: 'Respiratory Status',
      criterion: 'Oxygen dependent at rest',
      description: 'Requires continuous supplemental oxygen',
      required: true,
    },
    {
      id: 'fev1',
      category: 'Pulmonary Function',
      criterion: 'FEV1 < 30% predicted',
      description: 'Severely reduced lung function on spirometry',
      required: false,
    },
    {
      id: 'cor-pulmonale',
      category: 'Complications',
      criterion: 'Cor pulmonale or right heart failure',
      description: 'Evidence of right-sided heart failure from lung disease',
      required: false,
    },
  ],
};

interface EligibilityChecklistProps {
  patientData?: {
    name?: string;
    diagnosis?: string;
    ppsScore?: number;
    kpsScore?: number;
    weightLoss?: string;
    hospitalizations?: number;
    functionalStatus?: string;
  };
  onAssessmentChange?: (assessment: EligibilityAssessment) => void;
  compact?: boolean;
}

export function EligibilityChecklist({
  patientData,
  onAssessmentChange,
  compact = false
}: EligibilityChecklistProps) {
  const [criteria, setCriteria] = useState<EligibilityCriteria[]>([]);
  const [selectedDisease, setSelectedDisease] = useState<string>('general');
  const [showDetails, setShowDetails] = useState(!compact);

  // Initialize criteria based on patient data
  useEffect(() => {
    const diagnosis = patientData?.diagnosis?.toLowerCase() || '';

    // Determine disease type
    let diseaseType = 'general';
    if (diagnosis.includes('heart') || diagnosis.includes('cardiac') || diagnosis.includes('chf')) {
      diseaseType = 'heart-failure';
    } else if (diagnosis.includes('cancer') || diagnosis.includes('carcinoma') || diagnosis.includes('tumor')) {
      diseaseType = 'cancer';
    } else if (diagnosis.includes('dementia') || diagnosis.includes('alzheimer')) {
      diseaseType = 'dementia';
    } else if (diagnosis.includes('copd') || diagnosis.includes('pulmonary') || diagnosis.includes('lung')) {
      diseaseType = 'copd';
    }

    setSelectedDisease(diseaseType);

    // Combine general and disease-specific criteria
    const allCriteria = [
      ...GENERAL_CRITERIA,
      ...(DISEASE_CRITERIA[diseaseType] || []),
    ].map(c => ({
      ...c,
      met: autoAssessCriterion(c.id, patientData),
      notes: '',
    }));

    setCriteria(allCriteria);
  }, [patientData]);

  // Auto-assess criteria based on patient data
  function autoAssessCriterion(criterionId: string, data?: typeof patientData): boolean | null {
    if (!data) return null;

    switch (criterionId) {
      case 'functional-decline':
        if (data.ppsScore && data.ppsScore <= 70) return true;
        if (data.kpsScore && data.kpsScore <= 70) return true;
        return null;
      case 'nutritional-decline':
        if (data.weightLoss && data.weightLoss.includes('%')) {
          const pct = parseFloat(data.weightLoss);
          if (pct >= 10) return true;
        }
        return null;
      case 'hospitalizations':
        if (data.hospitalizations && data.hospitalizations >= 2) return true;
        return null;
      default:
        return null;
    }
  }

  // Toggle criterion status
  const toggleCriterion = (id: string) => {
    setCriteria(prev => prev.map(c => {
      if (c.id === id) {
        const newMet = c.met === null ? true : c.met === true ? false : null;
        return { ...c, met: newMet };
      }
      return c;
    }));
  };

  // Calculate overall eligibility
  const calculateEligibility = () => {
    const requiredCriteria = criteria.filter(c => c.required);
    const requiredMet = requiredCriteria.filter(c => c.met === true);
    const optionalMet = criteria.filter(c => !c.required && c.met === true);

    const allRequiredMet = requiredMet.length === requiredCriteria.length;
    const hasEnoughSupporting = optionalMet.length >= 2;

    return {
      eligible: allRequiredMet,
      confidence: allRequiredMet && hasEnoughSupporting ? 'high' :
                  allRequiredMet ? 'medium' : 'low',
      requiredMet: requiredMet.length,
      requiredTotal: requiredCriteria.length,
      supportingMet: optionalMet.length,
    };
  };

  const eligibility = calculateEligibility();

  // Notify parent of changes
  useEffect(() => {
    if (onAssessmentChange) {
      onAssessmentChange({
        patientName: patientData?.name || 'Unknown',
        diagnosis: patientData?.diagnosis || 'Unknown',
        assessmentDate: new Date().toISOString(),
        criteria,
        overallEligible: eligibility.eligible,
        confidence: eligibility.confidence as 'high' | 'medium' | 'low',
        recommendations: generateRecommendations(),
      });
    }
  }, [criteria]);

  // Generate recommendations
  const generateRecommendations = (): string[] => {
    const recs: string[] = [];
    const unmetRequired = criteria.filter(c => c.required && c.met !== true);

    if (unmetRequired.length > 0) {
      recs.push(`Document the following required criteria: ${unmetRequired.map(c => c.criterion).join(', ')}`);
    }

    if (eligibility.supportingMet < 2) {
      recs.push('Gather additional supporting documentation (2+ supporting criteria recommended)');
    }

    if (eligibility.confidence === 'low') {
      recs.push('Consider palliative care consult before hospice referral');
    }

    return recs;
  };

  if (compact) {
    return (
      <div className="flex items-center gap-4 p-3 rounded-lg bg-[var(--muted)] border border-[var(--border-color)]">
        <div className={`w-3 h-3 rounded-full ${
          eligibility.eligible ? 'bg-green-500' : 'bg-amber-500'
        }`} />
        <div className="flex-1">
          <span className="text-sm font-medium text-[var(--foreground)]">
            {eligibility.eligible ? 'Likely Eligible' : 'Needs Review'}
          </span>
          <span className="text-xs text-[var(--text-muted)] ml-2">
            {eligibility.requiredMet}/{eligibility.requiredTotal} required criteria
          </span>
        </div>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-xs text-[#4ECDC4] hover:underline"
        >
          {showDetails ? 'Hide' : 'Details'}
        </button>
      </div>
    );
  }

  return (
    <div className="card p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
            eligibility.eligible
              ? 'bg-green-100 dark:bg-green-900/30'
              : 'bg-amber-100 dark:bg-amber-900/30'
          }`}>
            {eligibility.eligible ? (
              <Icons.check className="w-6 h-6 text-green-600 dark:text-green-400" />
            ) : (
              <Icons.info className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            )}
          </div>
          <div>
            <div className={`font-semibold ${
              eligibility.eligible
                ? 'text-green-600 dark:text-green-400'
                : 'text-amber-600 dark:text-amber-400'
            }`}>
              {eligibility.eligible ? 'Likely Hospice Eligible' : 'Additional Documentation Needed'}
            </div>
            <div className="text-xs text-[var(--text-muted)]">
              {eligibility.requiredMet}/{eligibility.requiredTotal} required • {eligibility.supportingMet} supporting
            </div>
          </div>
        </div>

        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          eligibility.confidence === 'high' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
          eligibility.confidence === 'medium' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
          'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
        }`}>
          {eligibility.confidence.charAt(0).toUpperCase() + eligibility.confidence.slice(1)} Confidence
        </div>
      </div>

      {/* Disease Selector */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {['general', 'heart-failure', 'cancer', 'dementia', 'copd'].map(disease => (
          <button
            key={disease}
            onClick={() => setSelectedDisease(disease)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              selectedDisease === disease
                ? 'bg-[#4ECDC4] text-[#0a1929]'
                : 'bg-[var(--muted)] text-[var(--text-secondary)] hover:bg-[var(--card)]'
            }`}
          >
            {disease === 'general' ? 'General' :
             disease === 'heart-failure' ? 'Heart Failure' :
             disease === 'cancer' ? 'Cancer' :
             disease === 'dementia' ? 'Dementia' : 'COPD'}
          </button>
        ))}
      </div>

      {/* Criteria Checklist */}
      <div className="space-y-2">
        <div className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2">
          LCD Criteria Checklist
        </div>

        {criteria.map(criterion => (
          <div
            key={criterion.id}
            onClick={() => toggleCriterion(criterion.id)}
            className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all ${
              criterion.met === true
                ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                : criterion.met === false
                ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                : 'bg-[var(--muted)] border border-[var(--border-color)] hover:border-[#4ECDC4]'
            }`}
          >
            <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 ${
              criterion.met === true
                ? 'bg-green-500 text-white'
                : criterion.met === false
                ? 'bg-red-500 text-white'
                : 'bg-[var(--card)] border border-[var(--border-color)]'
            }`}>
              {criterion.met === true && <Icons.check className="w-3 h-3" />}
              {criterion.met === false && <Icons.x className="w-3 h-3" />}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-[var(--foreground)]">
                  {criterion.criterion}
                </span>
                {criterion.required && (
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                    Required
                  </span>
                )}
              </div>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                {criterion.description}
              </p>
              <span className="text-[10px] text-[var(--text-muted)] opacity-60">
                {criterion.category}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Recommendations */}
      {generateRecommendations().length > 0 && (
        <div className="pt-3 border-t border-[var(--border-color)]">
          <div className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2">
            Recommendations
          </div>
          <ul className="space-y-1">
            {generateRecommendations().map((rec, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                <Icons.lightbulb className="w-3 h-3 text-amber-500 mt-0.5 shrink-0" />
                {rec}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Legend */}
      <div className="flex items-center gap-4 pt-2 text-[10px] text-[var(--text-muted)]">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-green-500" />
          <span>Met</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-red-500" />
          <span>Not Met</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-[var(--card)] border border-[var(--border-color)]" />
          <span>Undetermined</span>
        </div>
        <span className="ml-auto">Click to toggle</span>
      </div>
    </div>
  );
}

export default EligibilityChecklist;
