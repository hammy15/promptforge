// Healthcare & Hospice Eligibility Templates
// Clinically accurate templates based on Medicare LCD guidelines and established assessment tools

import { PromptTemplate } from '../../components/PromptTemplates';

export const HEALTHCARE_TEMPLATES: PromptTemplate[] = [
  // ============================================
  // HOSPICE ELIGIBILITY ASSESSMENTS
  // ============================================
  {
    id: 'hospice-eligibility-general',
    name: 'Hospice Eligibility Assessment',
    description: 'Comprehensive evaluation of patient eligibility for hospice care based on Medicare guidelines',
    category: 'Healthcare',
    categorySlug: 'healthcare',
    icon: '🏥',
    prompt: `## Hospice Eligibility Assessment

**Patient Information:**
- Name: {{patient_name}}
- Age: {{patient_age}} years
- Primary Terminal Diagnosis: {{primary_diagnosis}}
- Secondary Diagnoses: {{secondary_diagnoses}}

**Functional Status Assessment:**
- Palliative Performance Scale (PPS): {{pps_score}}%
- Karnofsky Performance Status: {{kps_score}}%
- ADL Dependencies (bathing, dressing, toileting, transferring, continence, feeding): {{adl_dependencies}} of 6

**Clinical Indicators:**
- Weight Change: {{weight_change}} in past {{weight_timeframe}}
- Nutritional Status: {{nutritional_status}}
- Recent Hospitalizations (past 6 months): {{hospitalizations}}
- Recurrent Infections: {{infections}}

**Current Treatment Status:**
- Curative Treatment: {{curative_treatment}}
- Patient/Family Goals: {{care_goals}}

---

**Please provide a comprehensive hospice eligibility determination including:**

1. **Medicare Eligibility Analysis**
   - Does the patient meet the 6-month prognosis criterion?
   - Has the patient/surrogate elected comfort-focused care?
   - What documentation supports the terminal prognosis?

2. **Functional Decline Documentation**
   - PPS/KPS interpretation and trajectory
   - ADL dependency analysis
   - Evidence of progressive decline

3. **Disease-Specific Criteria Assessment**
   - LCD guideline criteria for {{primary_diagnosis}}
   - Supporting clinical indicators
   - Comorbidity impact on prognosis

4. **Recommendation**
   - [ ] Patient IS eligible for hospice
   - [ ] Patient is NOT yet eligible - recommend palliative care
   - [ ] Additional documentation needed

5. **Certification Statement**
   Draft physician certification statement for the medical record.

6. **Care Planning Recommendations**
   - Level of care recommendation (routine, continuous, respite, inpatient)
   - Key symptom management priorities
   - Family/caregiver support needs

Format output as a clinical assessment suitable for medical records.`,
    variables: [
      { name: 'patient_name', default: '', description: 'Patient full name', type: 'text' },
      { name: 'patient_age', default: '', description: 'Patient age in years', type: 'number' },
      { name: 'primary_diagnosis', default: '', description: 'Primary terminal diagnosis', type: 'select', options: ['Cancer/Malignancy', 'Heart Failure', 'COPD/Pulmonary Disease', 'Dementia/Alzheimers', 'Stroke/CVA', 'Liver Disease', 'End-Stage Renal Disease', 'ALS/Neurological', 'HIV/AIDS', 'Other Terminal Illness'] },
      { name: 'secondary_diagnoses', default: '', description: 'Relevant comorbidities', type: 'textarea' },
      { name: 'pps_score', default: '50', description: 'Palliative Performance Scale (0-100%)', type: 'number' },
      { name: 'kps_score', default: '50', description: 'Karnofsky Performance Status (0-100)', type: 'number' },
      { name: 'adl_dependencies', default: '3', description: 'Number of ADL dependencies (0-6)', type: 'number' },
      { name: 'weight_change', default: '', description: 'Weight change amount and direction', type: 'text' },
      { name: 'weight_timeframe', default: '6 months', description: 'Timeframe for weight change', type: 'select', options: ['3 months', '6 months', '12 months'] },
      { name: 'nutritional_status', default: '', description: 'Current nutritional intake status', type: 'select', options: ['Normal oral intake', 'Reduced intake', 'Minimal intake', 'NPO/Tube feeding', 'Declining despite intervention'] },
      { name: 'hospitalizations', default: '0', description: 'Number of hospitalizations', type: 'number' },
      { name: 'infections', default: 'None', description: 'Recurrent infections if any', type: 'text' },
      { name: 'curative_treatment', default: '', description: 'Current curative treatment status', type: 'select', options: ['Continuing curative treatment', 'Declined further curative treatment', 'No curative options available', 'Treatment stopped due to toxicity'] },
      { name: 'care_goals', default: '', description: 'Patient/family stated goals of care', type: 'textarea' },
    ],
    tags: ['hospice', 'eligibility', 'medicare', 'end-of-life', 'palliative'],
    difficulty: 'advanced',
    estimatedTime: '15 min',
    outputFormats: ['memo', 'pdf'],
    useCases: ['Hospital discharge planning', 'Hospice referral', 'Medicare certification', 'Care transition'],
    requiredInputs: ['patient_name', 'primary_diagnosis', 'pps_score'],
  },

  {
    id: 'hospice-cancer-eligibility',
    name: 'Hospice Eligibility - Oncology',
    description: 'Cancer-specific hospice eligibility assessment per LCD guidelines',
    category: 'Healthcare',
    categorySlug: 'healthcare',
    icon: '🎗️',
    prompt: `## Oncology Hospice Eligibility Assessment

**Patient Information:**
- Name: {{patient_name}}
- Age: {{patient_age}}
- Cancer Type: {{cancer_type}}
- Stage: {{cancer_stage}}
- Histology: {{histology}}

**Disease Status:**
- Metastatic Sites: {{metastatic_sites}}
- Time Since Diagnosis: {{diagnosis_duration}}
- Prior Treatments: {{prior_treatments}}
- Response to Treatment: {{treatment_response}}

**Functional Assessment:**
- ECOG Performance Status: {{ecog_score}}
- Palliative Performance Scale: {{pps_score}}%
- Weight Loss: {{weight_loss}}% in {{weight_timeframe}}

**Laboratory Values (if available):**
- Albumin: {{albumin}} g/dL
- Calcium: {{calcium}} mg/dL
- Hemoglobin: {{hemoglobin}} g/dL

**Clinical Complications:**
{{complications}}

---

**Please provide an oncology-specific hospice eligibility determination:**

1. **LCD Cancer Criteria Assessment**

   **Primary Criteria (required):**
   - [ ] Metastatic or locally advanced disease
   - [ ] PPS <70%
   - [ ] Disease progression despite treatment OR declined treatment

   **Supporting Factors:**
   - [ ] Hypercalcemia (>12 mg/dL)
   - [ ] Cachexia/weight loss >5% in 3 months
   - [ ] Serum albumin <2.5 g/dL
   - [ ] Malignant ascites or pleural effusion
   - [ ] CNS metastases
   - [ ] ECOG ≥3

2. **Inherently Poor Prognosis Assessment**
   Does the cancer type have inherently poor prognosis (may qualify without other criteria)?
   - Small cell lung cancer
   - Pancreatic cancer
   - Primary CNS malignancy (GBM)
   - Stage IV melanoma with CNS involvement
   - Cholangiocarcinoma
   - Mesothelioma

3. **Prognosis Estimation**
   Based on diagnosis, stage, functional status, and disease trajectory, estimate survival:
   - Median expected survival
   - Confidence in 6-month prognosis

4. **Eligibility Determination**
   - [ ] ELIGIBLE: Meets LCD criteria for hospice
   - [ ] NOT ELIGIBLE: Consider palliative care consultation
   - [ ] BORDERLINE: Additional documentation needed

5. **Physician Certification Statement**
   Draft certification language for the terminal prognosis.

6. **Symptom Management Priorities**
   Based on cancer type and current status, identify top symptom priorities.

Format as clinical documentation for hospice referral.`,
    variables: [
      { name: 'patient_name', default: '', description: 'Patient name', type: 'text' },
      { name: 'patient_age', default: '', description: 'Patient age', type: 'number' },
      { name: 'cancer_type', default: '', description: 'Primary cancer type', type: 'select', options: ['Lung (NSCLC)', 'Lung (Small Cell)', 'Breast', 'Colon/Colorectal', 'Pancreatic', 'Liver/HCC', 'Ovarian', 'Prostate', 'Brain (GBM)', 'Melanoma', 'Esophageal', 'Gastric', 'Kidney/Renal', 'Bladder', 'Head and Neck', 'Leukemia', 'Lymphoma', 'Multiple Myeloma', 'Other'] },
      { name: 'cancer_stage', default: 'IV', description: 'Cancer stage', type: 'select', options: ['Stage I', 'Stage II', 'Stage III', 'Stage IV', 'Recurrent', 'Unknown'] },
      { name: 'histology', default: '', description: 'Histology/grade if known', type: 'text' },
      { name: 'metastatic_sites', default: '', description: 'Sites of metastasis', type: 'textarea' },
      { name: 'diagnosis_duration', default: '', description: 'Time since initial diagnosis', type: 'text' },
      { name: 'prior_treatments', default: '', description: 'Prior treatments received', type: 'textarea' },
      { name: 'treatment_response', default: '', description: 'Response to most recent treatment', type: 'select', options: ['Complete response', 'Partial response', 'Stable disease', 'Progressive disease', 'Treatment naive', 'Declined treatment'] },
      { name: 'ecog_score', default: '3', description: 'ECOG Performance Status (0-4)', type: 'select', options: ['0 - Fully active', '1 - Restricted activity', '2 - Ambulatory, up >50%', '3 - Limited self-care, bed/chair >50%', '4 - Completely disabled'] },
      { name: 'pps_score', default: '50', description: 'Palliative Performance Scale %', type: 'number' },
      { name: 'weight_loss', default: '', description: 'Percentage weight loss', type: 'percentage' },
      { name: 'weight_timeframe', default: '3 months', description: 'Timeframe for weight loss', type: 'select', options: ['1 month', '3 months', '6 months'] },
      { name: 'albumin', default: '', description: 'Serum albumin (g/dL)', type: 'number' },
      { name: 'calcium', default: '', description: 'Serum calcium (mg/dL)', type: 'number' },
      { name: 'hemoglobin', default: '', description: 'Hemoglobin (g/dL)', type: 'number' },
      { name: 'complications', default: '', description: 'Current complications (ascites, effusion, obstruction, etc.)', type: 'textarea' },
    ],
    tags: ['hospice', 'oncology', 'cancer', 'eligibility', 'lcd'],
    difficulty: 'advanced',
    estimatedTime: '15 min',
    outputFormats: ['memo', 'pdf'],
    useCases: ['Oncology hospice referral', 'Tumor board discussion', 'Goals of care conversation'],
    requiredInputs: ['patient_name', 'cancer_type', 'cancer_stage'],
  },

  {
    id: 'hospice-heart-failure',
    name: 'Hospice Eligibility - Heart Failure',
    description: 'CHF-specific hospice eligibility assessment using NYHA criteria',
    category: 'Healthcare',
    categorySlug: 'healthcare',
    icon: '❤️',
    prompt: `## Heart Failure Hospice Eligibility Assessment

**Patient Information:**
- Name: {{patient_name}}
- Age: {{patient_age}}
- HF Etiology: {{hf_etiology}}
- Duration of Heart Failure: {{hf_duration}}

**Cardiac Function:**
- Ejection Fraction: {{ejection_fraction}}%
- NYHA Functional Class: {{nyha_class}}
- BNP/NT-proBNP: {{bnp_level}}

**Current Symptoms:**
- Dyspnea at Rest: {{dyspnea_rest}}
- Orthopnea: {{orthopnea}}
- Lower Extremity Edema: {{edema}}
- Fatigue Level: {{fatigue}}

**Medical Management:**
- Current Medications: {{current_meds}}
- Optimal Medical Therapy: {{optimal_therapy}}
- ICD/Pacemaker: {{device_status}}
- Candidate for Advanced Therapies: {{advanced_therapies}}

**Recent Clinical Course:**
- Hospitalizations (past 6 months): {{hospitalizations}}
- ER Visits: {{er_visits}}
- Diuretic Requirements: {{diuretic_needs}}

**Functional Status:**
- PPS: {{pps_score}}%
- ADL Dependencies: {{adl_count}}/6

---

**Please provide heart failure hospice eligibility determination:**

1. **LCD Heart Failure Criteria Assessment**

   **Primary Criteria (Class IV Required):**
   - [ ] NYHA Class IV: Symptoms at rest, unable to carry on any physical activity
   - [ ] Already on optimal medical therapy (ACE-I/ARB/ARNI, beta-blocker, diuretics, MRA)
   - [ ] NOT a candidate for surgical intervention OR has declined

   **Supporting Criteria:**
   - [ ] Ejection fraction ≤20%
   - [ ] History of cardiac arrest or resuscitation
   - [ ] History of syncope
   - [ ] Cardiogenic brain embolism
   - [ ] Concomitant HIV disease
   - [ ] Refractory angina

2. **NYHA Classification Verification**
   - Class I: No limitation of physical activity
   - Class II: Slight limitation, comfortable at rest
   - Class III: Marked limitation, comfortable only at rest
   - Class IV: Unable to carry on any physical activity, symptoms at rest

   Current classification rationale:

3. **Optimal Medical Therapy Review**
   - ACE-I/ARB/ARNI: {{ace_status}}
   - Beta-blocker: {{bb_status}}
   - Diuretics: {{diuretic_status}}
   - MRA: {{mra_status}}
   - Are there contraindications or intolerances documented?

4. **Advanced Therapy Candidacy**
   - LVAD candidacy:
   - Heart transplant candidacy:
   - Reason if not candidate:

5. **Prognosis Assessment**
   - Seattle Heart Failure Model estimated survival
   - Clinical trajectory over past 3-6 months
   - Confidence in 6-month prognosis

6. **Eligibility Determination**
   - [ ] ELIGIBLE: NYHA IV, optimal therapy, not surgical candidate
   - [ ] NOT ELIGIBLE: Does not meet NYHA IV criteria
   - [ ] CONSIDER: Palliative care bridge

7. **ICD Deactivation Discussion**
   If ICD present, document discussion regarding deactivation preferences.

Format as clinical heart failure hospice assessment.`,
    variables: [
      { name: 'patient_name', default: '', description: 'Patient name', type: 'text' },
      { name: 'patient_age', default: '', description: 'Patient age', type: 'number' },
      { name: 'hf_etiology', default: '', description: 'Heart failure etiology', type: 'select', options: ['Ischemic cardiomyopathy', 'Non-ischemic dilated cardiomyopathy', 'Hypertensive heart disease', 'Valvular heart disease', 'Alcoholic cardiomyopathy', 'Viral/inflammatory', 'Unknown'] },
      { name: 'hf_duration', default: '', description: 'Duration of heart failure diagnosis', type: 'text' },
      { name: 'ejection_fraction', default: '', description: 'Most recent ejection fraction %', type: 'number' },
      { name: 'nyha_class', default: 'IV', description: 'NYHA Functional Class', type: 'select', options: ['Class I', 'Class II', 'Class III', 'Class IV'] },
      { name: 'bnp_level', default: '', description: 'BNP or NT-proBNP level', type: 'text' },
      { name: 'dyspnea_rest', default: 'Yes', description: 'Dyspnea at rest', type: 'select', options: ['Yes', 'No'] },
      { name: 'orthopnea', default: '', description: 'Number of pillows/degree of orthopnea', type: 'text' },
      { name: 'edema', default: '', description: 'Lower extremity edema status', type: 'select', options: ['None', 'Trace', 'Mild', 'Moderate', 'Severe', 'Anasarca'] },
      { name: 'fatigue', default: '', description: 'Fatigue severity', type: 'select', options: ['Minimal', 'Mild', 'Moderate', 'Severe', 'Extreme'] },
      { name: 'current_meds', default: '', description: 'Current cardiac medications', type: 'textarea' },
      { name: 'optimal_therapy', default: '', description: 'Is patient on optimal medical therapy?', type: 'select', options: ['Yes - on all tolerated agents', 'No - has not trialed all agents', 'Limited by hypotension', 'Limited by renal function', 'Limited by other contraindications'] },
      { name: 'device_status', default: '', description: 'ICD/Pacemaker/CRT status', type: 'select', options: ['None', 'Pacemaker only', 'ICD', 'CRT-P', 'CRT-D'] },
      { name: 'advanced_therapies', default: '', description: 'Candidacy for LVAD/transplant', type: 'select', options: ['Candidate - declined', 'Not a candidate - age', 'Not a candidate - comorbidities', 'Not a candidate - psychosocial', 'Under evaluation', 'N/A'] },
      { name: 'hospitalizations', default: '', description: 'HF hospitalizations past 6 months', type: 'number' },
      { name: 'er_visits', default: '', description: 'ER visits for HF past 6 months', type: 'number' },
      { name: 'diuretic_needs', default: '', description: 'Diuretic requirements', type: 'select', options: ['Stable oral dose', 'Escalating oral dose', 'Intermittent IV needed', 'Continuous IV infusion', 'Refractory to diuretics'] },
      { name: 'pps_score', default: '50', description: 'Palliative Performance Scale %', type: 'number' },
      { name: 'adl_count', default: '3', description: 'ADL dependencies', type: 'number' },
      { name: 'ace_status', default: '', description: 'ACE-I/ARB/ARNI status', type: 'text' },
      { name: 'bb_status', default: '', description: 'Beta-blocker status', type: 'text' },
      { name: 'diuretic_status', default: '', description: 'Diuretic regimen', type: 'text' },
      { name: 'mra_status', default: '', description: 'MRA (spironolactone) status', type: 'text' },
    ],
    tags: ['hospice', 'heart-failure', 'cardiology', 'chf', 'nyha'],
    difficulty: 'advanced',
    estimatedTime: '15 min',
    outputFormats: ['memo', 'pdf'],
    useCases: ['Cardiology hospice referral', 'Heart failure clinic', 'Advanced HF consultation'],
    requiredInputs: ['patient_name', 'nyha_class', 'ejection_fraction'],
  },

  {
    id: 'hospice-copd',
    name: 'Hospice Eligibility - COPD/Pulmonary',
    description: 'Pulmonary disease hospice eligibility with spirometry and blood gas criteria',
    category: 'Healthcare',
    categorySlug: 'healthcare',
    icon: '🫁',
    prompt: `## COPD/Pulmonary Disease Hospice Eligibility Assessment

**Patient Information:**
- Name: {{patient_name}}
- Age: {{patient_age}}
- Primary Pulmonary Diagnosis: {{pulmonary_diagnosis}}
- Duration of Disease: {{disease_duration}}
- Smoking History: {{smoking_history}}

**Pulmonary Function:**
- FEV1 (post-bronchodilator): {{fev1}}% predicted
- FEV1/FVC Ratio: {{fev1_fvc}}%
- GOLD Stage: {{gold_stage}}

**Oxygenation Status:**
- Room Air SpO2: {{spo2}}%
- PaO2 (if available): {{pao2}} mmHg
- PaCO2 (if available): {{paco2}} mmHg
- Supplemental O2 Requirement: {{o2_requirement}}

**Clinical Status:**
- Dyspnea at Rest: {{dyspnea_rest}}
- mMRC Dyspnea Scale: {{mmrc_score}}
- Cor Pulmonale/RV Failure: {{cor_pulmonale}}
- Resting Tachycardia: {{tachycardia}}

**Recent History:**
- Hospitalizations (past 12 months): {{hospitalizations}}
- COPD Exacerbations (past year): {{exacerbations}}
- Recurrent Respiratory Infections: {{infections}}
- ICU Admissions/Intubations: {{icu_history}}

**Functional Status:**
- PPS: {{pps_score}}%
- ADL Dependencies: {{adl_count}}/6
- Weight Change: {{weight_change}}

---

**Please provide COPD/Pulmonary hospice eligibility determination:**

1. **LCD Pulmonary Disease Criteria Assessment**

   **Primary Criteria (requires multiple):**
   - [ ] Disabling dyspnea at rest, poorly responsive to bronchodilators
   - [ ] FEV1 <30% predicted (after bronchodilator)
   - [ ] Progressive disease with increasing ER/hospital visits
   - [ ] Hypoxemia at rest (pO2 ≤55 mmHg or SpO2 ≤88%) on room air
   - [ ] Hypercapnia (pCO2 ≥50 mmHg)
   - [ ] Cor pulmonale/right heart failure secondary to pulmonary disease
   - [ ] Resting tachycardia >100/min

   **Supporting Documentation:**
   - [ ] Unintentional weight loss >10% over 6 months
   - [ ] Recurrent pulmonary infections (pneumonia, bronchitis)
   - [ ] Declining functional status despite optimal therapy

2. **GOLD Classification**
   - GOLD 1 (Mild): FEV1 ≥80%
   - GOLD 2 (Moderate): 50% ≤ FEV1 < 80%
   - GOLD 3 (Severe): 30% ≤ FEV1 < 50%
   - GOLD 4 (Very Severe): FEV1 < 30%

   Current stage and trajectory:

3. **Optimal Therapy Assessment**
   - Long-acting bronchodilators (LAMA/LABA): {{bronchodilator_status}}
   - Inhaled corticosteroids: {{ics_status}}
   - Pulmonary rehabilitation completed: {{pulm_rehab}}
   - Chronic oxygen therapy: {{o2_therapy}}
   - Non-invasive ventilation: {{niv_status}}

4. **mMRC Dyspnea Assessment**
   - Grade 0: Breathless with strenuous exercise only
   - Grade 1: Short of breath hurrying or walking up slight hill
   - Grade 2: Walks slower than peers or stops for breath
   - Grade 3: Stops for breath after 100 yards
   - Grade 4: Too breathless to leave house or breathless dressing

5. **Prognosis Estimation**
   - BODE Index calculation (if data available)
   - Clinical trajectory assessment
   - 6-month survival confidence

6. **Eligibility Determination**
   - [ ] ELIGIBLE: Meets LCD criteria for end-stage pulmonary disease
   - [ ] NOT ELIGIBLE: Disease not yet end-stage
   - [ ] CONSIDER: Palliative care for symptom management

7. **End-of-Life Preferences**
   - Intubation/mechanical ventilation preferences
   - CPR preferences
   - BiPAP continuation preferences

Format as pulmonary hospice eligibility assessment.`,
    variables: [
      { name: 'patient_name', default: '', description: 'Patient name', type: 'text' },
      { name: 'patient_age', default: '', description: 'Patient age', type: 'number' },
      { name: 'pulmonary_diagnosis', default: 'COPD', description: 'Primary pulmonary diagnosis', type: 'select', options: ['COPD', 'Emphysema', 'Chronic Bronchitis', 'Pulmonary Fibrosis/ILD', 'Bronchiectasis', 'Pulmonary Hypertension', 'Combined'] },
      { name: 'disease_duration', default: '', description: 'Duration of pulmonary disease', type: 'text' },
      { name: 'smoking_history', default: '', description: 'Smoking history (pack-years)', type: 'text' },
      { name: 'fev1', default: '', description: 'FEV1 % predicted (post-bronchodilator)', type: 'number' },
      { name: 'fev1_fvc', default: '', description: 'FEV1/FVC ratio %', type: 'number' },
      { name: 'gold_stage', default: '', description: 'GOLD Stage', type: 'select', options: ['GOLD 1 (Mild)', 'GOLD 2 (Moderate)', 'GOLD 3 (Severe)', 'GOLD 4 (Very Severe)'] },
      { name: 'spo2', default: '', description: 'Room air SpO2 %', type: 'number' },
      { name: 'pao2', default: '', description: 'PaO2 mmHg (if available)', type: 'number' },
      { name: 'paco2', default: '', description: 'PaCO2 mmHg (if available)', type: 'number' },
      { name: 'o2_requirement', default: '', description: 'Supplemental O2 requirement', type: 'select', options: ['None', '1-2 L/min', '3-4 L/min', '5-6 L/min', 'High-flow/Non-rebreather', 'Continuous BiPAP'] },
      { name: 'dyspnea_rest', default: 'Yes', description: 'Dyspnea at rest', type: 'select', options: ['Yes', 'No'] },
      { name: 'mmrc_score', default: '4', description: 'mMRC Dyspnea Scale (0-4)', type: 'select', options: ['0 - Strenuous exercise only', '1 - Hurrying or walking up hill', '2 - Walks slower than peers', '3 - Stops after 100 yards', '4 - Too breathless to leave house'] },
      { name: 'cor_pulmonale', default: '', description: 'Cor pulmonale present', type: 'select', options: ['Yes', 'No', 'Suspected'] },
      { name: 'tachycardia', default: '', description: 'Resting tachycardia >100', type: 'select', options: ['Yes', 'No'] },
      { name: 'hospitalizations', default: '', description: 'Hospitalizations past 12 months', type: 'number' },
      { name: 'exacerbations', default: '', description: 'COPD exacerbations past year', type: 'number' },
      { name: 'infections', default: '', description: 'Recurrent respiratory infections', type: 'text' },
      { name: 'icu_history', default: '', description: 'ICU admissions/intubations', type: 'text' },
      { name: 'pps_score', default: '50', description: 'Palliative Performance Scale %', type: 'number' },
      { name: 'adl_count', default: '3', description: 'ADL dependencies', type: 'number' },
      { name: 'weight_change', default: '', description: 'Weight change', type: 'text' },
      { name: 'bronchodilator_status', default: '', description: 'Bronchodilator therapy', type: 'text' },
      { name: 'ics_status', default: '', description: 'Inhaled corticosteroid status', type: 'text' },
      { name: 'pulm_rehab', default: '', description: 'Pulmonary rehab status', type: 'select', options: ['Completed', 'Ongoing', 'Not candidate', 'Declined', 'Not offered'] },
      { name: 'o2_therapy', default: '', description: 'Chronic O2 therapy', type: 'text' },
      { name: 'niv_status', default: '', description: 'Non-invasive ventilation', type: 'select', options: ['None', 'Nocturnal BiPAP', 'Continuous BiPAP', 'Declined'] },
    ],
    tags: ['hospice', 'copd', 'pulmonary', 'respiratory', 'gold'],
    difficulty: 'advanced',
    estimatedTime: '15 min',
    outputFormats: ['memo', 'pdf'],
    useCases: ['Pulmonology hospice referral', 'COPD clinic', 'Respiratory failure management'],
    requiredInputs: ['patient_name', 'pulmonary_diagnosis', 'fev1'],
  },

  {
    id: 'hospice-dementia',
    name: 'Hospice Eligibility - Dementia',
    description: 'Dementia hospice eligibility using FAST scale and functional criteria',
    category: 'Healthcare',
    categorySlug: 'healthcare',
    icon: '🧠',
    prompt: `## Dementia Hospice Eligibility Assessment

**Patient Information:**
- Name: {{patient_name}}
- Age: {{patient_age}}
- Dementia Type: {{dementia_type}}
- Duration Since Diagnosis: {{diagnosis_duration}}

**FAST Scale Assessment:**
- Current FAST Stage: {{fast_stage}}
- FAST Sub-stage (if Stage 7): {{fast_substage}}

**Functional Status:**
- Speech/Communication: {{speech_status}}
- Ambulation: {{ambulation_status}}
- Ability to Sit Independently: {{sitting_ability}}
- Ability to Smile: {{smile_ability}}
- Ability to Hold Head Up: {{head_control}}

**ADL Assessment:**
- Bathing: {{bathing}}
- Dressing: {{dressing}}
- Toileting: {{toileting}}
- Transferring: {{transferring}}
- Continence: {{continence}}
- Feeding: {{feeding}}

**Nutritional Status:**
- Current Oral Intake: {{oral_intake}}
- Weight: {{current_weight}} lbs
- Weight Change: {{weight_change}} over {{weight_timeframe}}
- Swallowing Difficulties: {{dysphagia}}
- Aspiration Risk: {{aspiration_risk}}

**Medical Complications (past 12 months):**
- Aspiration Pneumonia: {{aspiration_pneumonia}}
- Urinary Tract Infections: {{uti_count}}
- Sepsis: {{sepsis}}
- Pressure Ulcers: {{pressure_ulcers}}
- Recurrent Fevers: {{fevers}}

**Current Care Setting:**
{{care_setting}}

---

**Please provide dementia hospice eligibility determination:**

1. **FAST Scale Criteria Assessment**

   **Medicare Requirement: FAST Stage 7A or greater**

   FAST Stage 7 Sub-stages:
   - 7A: Speech limited to ~6 intelligible words/day
   - 7B: Intelligible vocabulary limited to single word
   - 7C: Ambulatory ability lost (cannot walk without assistance)
   - 7D: Ability to sit up independently lost
   - 7E: Ability to smile lost
   - 7F: Ability to hold head up lost

   **Current Stage Verification:**
   Does patient demonstrate features of Stage 6 (all required)?
   - [ ] Requires assistance with dressing
   - [ ] Requires assistance with bathing
   - [ ] Requires assistance with toileting
   - [ ] Urinary incontinence
   - [ ] Fecal incontinence

2. **Important FAST Scale Limitations**

   Note: FAST scale is validated for Alzheimer's disease only. For other dementia types (Lewy Body, Vascular, Frontotemporal), functional decline may not follow FAST progression.

   For non-Alzheimer's dementia, document:
   - Equivalent functional impairment
   - Disease-specific decline markers
   - Overall 6-month prognosis rationale

3. **Supporting Criteria for Eligibility**

   In addition to FAST 7A, at least ONE in past 12 months:
   - [ ] Aspiration pneumonia
   - [ ] Pyelonephritis/upper UTI
   - [ ] Sepsis
   - [ ] Multiple Stage 3-4 pressure ulcers
   - [ ] Recurrent fever after antibiotics
   - [ ] Eating problems - insufficient intake with 10% weight loss over 6 months OR albumin <2.5

4. **Nutritional Assessment**
   - Current caloric/fluid intake adequacy
   - Weight trajectory
   - Aspiration risk level
   - Tube feeding status/discussion

5. **Eligibility Determination**
   - [ ] ELIGIBLE: FAST 7A+ with supporting complication criteria
   - [ ] ELIGIBLE: FAST 7C+ (ambulation lost) - commonly accepted threshold
   - [ ] NOT ELIGIBLE: Has not reached FAST 7A
   - [ ] CONSIDER: Palliative care for symptom management

6. **Goals of Care Documentation**
   - Feeding tube preferences
   - Hospitalization preferences
   - CPR/intubation preferences
   - Comfort-focused care plan

7. **Family/Caregiver Assessment**
   - Caregiver understanding of prognosis
   - Caregiver burden assessment
   - Support needs

Format as dementia hospice eligibility assessment for medical records.`,
    variables: [
      { name: 'patient_name', default: '', description: 'Patient name', type: 'text' },
      { name: 'patient_age', default: '', description: 'Patient age', type: 'number' },
      { name: 'dementia_type', default: 'Alzheimers', description: 'Type of dementia', type: 'select', options: ['Alzheimers Disease', 'Vascular Dementia', 'Lewy Body Dementia', 'Frontotemporal Dementia', 'Mixed Dementia', 'Parkinsons Disease Dementia', 'Unknown/Unspecified'] },
      { name: 'diagnosis_duration', default: '', description: 'Time since dementia diagnosis', type: 'text' },
      { name: 'fast_stage', default: '7', description: 'FAST Stage (1-7)', type: 'select', options: ['Stage 1 - No impairment', 'Stage 2 - Very mild', 'Stage 3 - Mild', 'Stage 4 - Moderate', 'Stage 5 - Moderately severe', 'Stage 6 - Severe', 'Stage 7 - Very severe'] },
      { name: 'fast_substage', default: '7C', description: 'FAST 7 Sub-stage', type: 'select', options: ['7A - 6 words/day', '7B - Single word', '7C - Cannot walk', '7D - Cannot sit', '7E - Cannot smile', '7F - Cannot hold head'] },
      { name: 'speech_status', default: '', description: 'Speech/communication ability', type: 'select', options: ['Normal conversation', 'Limited vocabulary', 'Single words only', 'Non-verbal/sounds only', 'No vocalizations'] },
      { name: 'ambulation_status', default: '', description: 'Ambulation status', type: 'select', options: ['Independent', 'Needs assistance', 'Wheelchair bound', 'Bed bound'] },
      { name: 'sitting_ability', default: '', description: 'Can sit independently', type: 'select', options: ['Yes', 'With support only', 'No'] },
      { name: 'smile_ability', default: '', description: 'Can smile', type: 'select', options: ['Yes', 'Rarely', 'No'] },
      { name: 'head_control', default: '', description: 'Can hold head up', type: 'select', options: ['Yes', 'Limited', 'No'] },
      { name: 'bathing', default: 'Dependent', description: 'Bathing ability', type: 'select', options: ['Independent', 'Needs assistance', 'Dependent'] },
      { name: 'dressing', default: 'Dependent', description: 'Dressing ability', type: 'select', options: ['Independent', 'Needs assistance', 'Dependent'] },
      { name: 'toileting', default: 'Dependent', description: 'Toileting ability', type: 'select', options: ['Independent', 'Needs assistance', 'Dependent'] },
      { name: 'transferring', default: 'Dependent', description: 'Transfer ability', type: 'select', options: ['Independent', 'Needs assistance', 'Dependent'] },
      { name: 'continence', default: '', description: 'Continence status', type: 'select', options: ['Continent', 'Occasional incontinence', 'Urinary incontinent', 'Bowel incontinent', 'Double incontinent'] },
      { name: 'feeding', default: '', description: 'Feeding ability', type: 'select', options: ['Independent', 'Needs setup/cueing', 'Needs assistance', 'Fully dependent', 'Tube fed'] },
      { name: 'oral_intake', default: '', description: 'Current oral intake', type: 'select', options: ['Normal', 'Reduced but adequate', 'Minimal', 'Refusing', 'NPO'] },
      { name: 'current_weight', default: '', description: 'Current weight (lbs)', type: 'number' },
      { name: 'weight_change', default: '', description: 'Weight change amount', type: 'text' },
      { name: 'weight_timeframe', default: '6 months', description: 'Weight change timeframe', type: 'select', options: ['3 months', '6 months', '12 months'] },
      { name: 'dysphagia', default: '', description: 'Swallowing difficulties', type: 'select', options: ['None', 'Mild - modified diet', 'Moderate - pureed only', 'Severe - thickened liquids', 'Aspiration with all textures'] },
      { name: 'aspiration_risk', default: '', description: 'Aspiration risk level', type: 'select', options: ['Low', 'Moderate', 'High'] },
      { name: 'aspiration_pneumonia', default: '', description: 'Aspiration pneumonia in past 12 months', type: 'select', options: ['None', 'One episode', 'Multiple episodes'] },
      { name: 'uti_count', default: '', description: 'UTIs in past 12 months', type: 'number' },
      { name: 'sepsis', default: '', description: 'Sepsis episodes', type: 'select', options: ['None', 'One episode', 'Multiple episodes'] },
      { name: 'pressure_ulcers', default: '', description: 'Pressure ulcers', type: 'select', options: ['None', 'Stage 1-2', 'Stage 3-4', 'Multiple Stage 3-4'] },
      { name: 'fevers', default: '', description: 'Recurrent fevers', type: 'select', options: ['None', 'Occasional', 'Frequent despite treatment'] },
      { name: 'care_setting', default: '', description: 'Current care setting', type: 'select', options: ['Home with family', 'Home with paid caregiver', 'Assisted living', 'Memory care unit', 'Skilled nursing facility', 'Hospital'] },
    ],
    tags: ['hospice', 'dementia', 'alzheimers', 'fast-scale', 'cognitive'],
    difficulty: 'advanced',
    estimatedTime: '15 min',
    outputFormats: ['memo', 'pdf'],
    useCases: ['Dementia hospice referral', 'Memory care consultation', 'Goals of care discussion'],
    requiredInputs: ['patient_name', 'dementia_type', 'fast_stage'],
  },

  {
    id: 'palliative-vs-hospice',
    name: 'Palliative Care vs Hospice Determination',
    description: 'Guide decision between palliative care and hospice based on patient status',
    category: 'Healthcare',
    categorySlug: 'healthcare',
    icon: '⚕️',
    prompt: `## Palliative Care vs. Hospice Care Determination

**Patient Information:**
- Name: {{patient_name}}
- Age: {{patient_age}}
- Primary Diagnosis: {{primary_diagnosis}}
- Prognosis Estimate: {{prognosis_estimate}}

**Current Treatment Status:**
- Receiving Disease-Modifying Treatment: {{active_treatment}}
- Treatment Intent: {{treatment_intent}}
- Treatment Response: {{treatment_response}}
- Willing to Continue Treatment: {{continue_treatment}}

**Symptom Burden:**
- Pain Level (0-10): {{pain_level}}
- Other Symptoms: {{other_symptoms}}
- Quality of Life Impact: {{qol_impact}}

**Functional Status:**
- PPS Score: {{pps_score}}%
- ECOG/KPS: {{performance_status}}
- Trajectory: {{functional_trajectory}}

**Goals of Care:**
- Patient's Stated Goals: {{patient_goals}}
- Family Understanding: {{family_understanding}}
- Code Status: {{code_status}}

---

**Please provide a comprehensive palliative vs. hospice determination:**

1. **Key Distinction Summary**

   | Aspect | Palliative Care | Hospice Care |
   |--------|-----------------|--------------|
   | Timing | Any stage of serious illness | 6-month prognosis |
   | Curative Tx | Can continue alongside | Generally stopped |
   | Goal | Comfort + treatment | Comfort only |
   | Duration | Months to years | Weeks to months |

2. **Prognosis Assessment**

   Based on the clinical information:
   - Is the prognosis ≤6 months if disease runs its normal course?
   - What is the confidence level in this estimate?
   - What clinical indicators support the prognosis?

3. **Treatment Intent Analysis**

   Current treatment is:
   - [ ] Curative intent - seeking remission/cure
   - [ ] Disease-modifying - slowing progression
   - [ ] Palliative - comfort only, no disease modification
   - [ ] No current treatment

4. **Patient Goals Alignment**

   The patient's goals are most aligned with:
   - [ ] Aggressive treatment to maximize life extension
   - [ ] Balanced approach: treatment with comfort focus
   - [ ] Comfort-focused: quality over quantity
   - [ ] Uncertain/undecided

5. **Recommendation**

   Based on the assessment:

   **PALLIATIVE CARE is appropriate if:**
   - Prognosis > 6 months or uncertain
   - Patient wants to continue disease-modifying treatment
   - Goals include both life prolongation and comfort
   - Disease stage allows for meaningful treatment benefit

   **HOSPICE CARE is appropriate if:**
   - Prognosis ≤ 6 months with reasonable confidence
   - Patient has elected comfort-focused care
   - Curative/disease-modifying treatments stopped or futile
   - Focus is entirely on quality of life

   **CURRENT RECOMMENDATION:**
   - [ ] PALLIATIVE CARE consultation
   - [ ] HOSPICE referral
   - [ ] Bridge: Palliative care now, reassess for hospice in {{reassess_timeframe}}
   - [ ] Goals of care conversation needed first

6. **Transition Planning**

   If recommending palliative care with future hospice transition:
   - Triggers for hospice reconsideration
   - Anticipated timeline
   - Follow-up plan

7. **Insurance/Coverage Considerations**
   - Palliative care: Covered under standard medical benefits
   - Hospice: Medicare Hospice Benefit (separate from Part A/B)
   - Concurrent care programs if available

8. **Communication Recommendations**
   Suggested talking points for patient/family discussion.

Format as clinical decision support documentation.`,
    variables: [
      { name: 'patient_name', default: '', description: 'Patient name', type: 'text' },
      { name: 'patient_age', default: '', description: 'Patient age', type: 'number' },
      { name: 'primary_diagnosis', default: '', description: 'Primary diagnosis', type: 'text' },
      { name: 'prognosis_estimate', default: '', description: 'Current prognosis estimate', type: 'select', options: ['Years', '12+ months', '6-12 months', '3-6 months', '<3 months', 'Uncertain'] },
      { name: 'active_treatment', default: '', description: 'Currently on disease-modifying treatment', type: 'select', options: ['Yes - responding well', 'Yes - stable', 'Yes - declining', 'No - completed', 'No - declined', 'No - not candidate'] },
      { name: 'treatment_intent', default: '', description: 'Intent of current/recent treatment', type: 'select', options: ['Curative', 'Disease-modifying', 'Palliative/symptom control', 'None'] },
      { name: 'treatment_response', default: '', description: 'Response to treatment', type: 'select', options: ['Complete response', 'Partial response', 'Stable', 'Progressive', 'N/A'] },
      { name: 'continue_treatment', default: '', description: 'Patient willing to continue treatment', type: 'select', options: ['Yes - wants all options', 'Yes - with limits', 'Uncertain', 'No - wants comfort focus'] },
      { name: 'pain_level', default: '', description: 'Current pain level (0-10)', type: 'number' },
      { name: 'other_symptoms', default: '', description: 'Other symptom burden', type: 'textarea' },
      { name: 'qol_impact', default: '', description: 'Quality of life impact', type: 'select', options: ['Minimal impact', 'Moderate impact', 'Significant impact', 'Severe impact'] },
      { name: 'pps_score', default: '', description: 'Palliative Performance Scale %', type: 'number' },
      { name: 'performance_status', default: '', description: 'ECOG or KPS score', type: 'text' },
      { name: 'functional_trajectory', default: '', description: 'Functional status trajectory', type: 'select', options: ['Stable', 'Slow decline', 'Moderate decline', 'Rapid decline'] },
      { name: 'patient_goals', default: '', description: 'Patient stated goals', type: 'textarea' },
      { name: 'family_understanding', default: '', description: 'Family understanding of prognosis', type: 'select', options: ['Full understanding', 'Partial understanding', 'Limited understanding', 'Denial/unrealistic expectations'] },
      { name: 'code_status', default: '', description: 'Current code status', type: 'select', options: ['Full code', 'DNR only', 'DNR/DNI', 'Comfort measures only', 'Not discussed'] },
      { name: 'reassess_timeframe', default: '4-6 weeks', description: 'Reassessment timeframe', type: 'text' },
    ],
    tags: ['palliative', 'hospice', 'decision-support', 'goals-of-care', 'prognosis'],
    difficulty: 'intermediate',
    estimatedTime: '10 min',
    outputFormats: ['memo', 'pdf'],
    useCases: ['Care planning', 'Consultation request', 'Goals of care meeting', 'Discharge planning'],
    requiredInputs: ['patient_name', 'primary_diagnosis', 'prognosis_estimate'],
  },

  {
    id: 'hospital-to-hospice-discharge',
    name: 'Hospital to Hospice Discharge Planning',
    description: 'Comprehensive discharge planning checklist for hospice transition',
    category: 'Healthcare',
    categorySlug: 'healthcare',
    icon: '🏠',
    prompt: `## Hospital to Hospice Discharge Planning

**Patient Information:**
- Name: {{patient_name}}
- Age: {{patient_age}}
- MRN: {{mrn}}
- Primary Diagnosis: {{primary_diagnosis}}
- Admitting Diagnosis: {{admitting_diagnosis}}

**Discharge Destination:**
- Discharge To: {{discharge_destination}}
- Address: {{discharge_address}}
- Primary Caregiver: {{primary_caregiver}}
- Caregiver Phone: {{caregiver_phone}}

**Hospice Provider:**
- Hospice Agency: {{hospice_agency}}
- Contact Phone: {{hospice_phone}}
- Initial Visit Scheduled: {{initial_visit}}

**Clinical Status at Discharge:**
- Terminal Diagnosis: {{terminal_diagnosis}}
- Current PPS: {{pps_score}}%
- Pain Level (0-10): {{pain_level}}
- Other Symptoms: {{symptoms}}
- Level of Care Needed: {{level_of_care}}

---

**Please generate a comprehensive hospice discharge plan:**

1. **Pre-Discharge Checklist**

   **Hospice Coordination:**
   - [ ] Hospice agency selected and contacted
   - [ ] Face-to-face visit completed (if required)
   - [ ] Initial hospice assessment scheduled
   - [ ] Insurance/Medicare hospice benefit verified
   - [ ] Hospice consent forms signed

   **Medical Documentation:**
   - [ ] Physician certification of terminal illness completed
   - [ ] Discharge summary with hospice diagnosis
   - [ ] Medication reconciliation completed
   - [ ] DNR/POLST forms completed per patient wishes
   - [ ] Relevant medical records sent to hospice

   **Equipment & Supplies:**
   - [ ] DME ordered (hospital bed, wheelchair, commode, etc.)
   - [ ] Oxygen arranged if needed
   - [ ] Medical supplies ordered
   - [ ] Delivery confirmed for discharge day

   **Medications:**
   - [ ] Comfort medication kit (CMK) ordered
   - [ ] Prescriptions for hospice formulary medications
   - [ ] Non-formulary medications addressed
   - [ ] Controlled substance prescriptions arranged

2. **Medication Reconciliation for Hospice**

   **Continue (Comfort-Related):**
   {{continue_medications}}

   **Discontinue (Non-Essential/Disease-Modifying):**
   {{discontinue_medications}}

   **Hospice Comfort Kit Contents:**
   - Morphine/oxycodone for pain/dyspnea
   - Lorazepam for anxiety/agitation
   - Prochlorperazine/ondansetron for nausea
   - Hyoscine/atropine for secretions
   - Acetaminophen suppositories
   - Haloperidol for agitation/delirium

3. **DME Requirements**

   Based on current functional status (PPS {{pps_score}}%):
   - [ ] Hospital bed - {{bed_type}}
   - [ ] Mattress type - {{mattress_type}}
   - [ ] Wheelchair/transport chair
   - [ ] Bedside commode
   - [ ] Walker/rollator
   - [ ] Oxygen concentrator - {{o2_needs}}
   - [ ] Suction machine
   - [ ] Other: {{other_dme}}

4. **Level of Care Determination**

   - [ ] Routine Home Care (most common)
   - [ ] Continuous Home Care (crisis management)
   - [ ] General Inpatient Care (symptom management in facility)
   - [ ] Respite Care (caregiver relief, max 5 days)

5. **Caregiver Education Checklist**

   - [ ] Understanding of hospice philosophy and services
   - [ ] Medication administration training
   - [ ] When to call hospice vs. 911
   - [ ] What to expect as disease progresses
   - [ ] Signs of imminent death
   - [ ] After-death procedures
   - [ ] Bereavement support information

6. **Discharge Day Coordination**

   - Discharge time: {{discharge_time}}
   - Transportation: {{transportation}}
   - DME delivery confirmed: {{dme_delivery_time}}
   - Hospice initial visit: {{initial_visit}}
   - 24-hour hospice phone: {{hospice_phone}}

7. **Emergency/After-Hours Instructions**

   For the patient and family:
   - Call hospice FIRST: {{hospice_phone}}
   - Do NOT call 911 unless directed by hospice
   - Comfort kit location and usage instructions
   - Expected vs. unexpected symptoms

8. **Follow-Up Plan**

   - Hospice RN visit within 24-48 hours
   - Hospice physician/NP visit within first week
   - Social worker assessment
   - Chaplain visit if desired
   - Volunteer services

Format as comprehensive discharge planning documentation.`,
    variables: [
      { name: 'patient_name', default: '', description: 'Patient name', type: 'text' },
      { name: 'patient_age', default: '', description: 'Patient age', type: 'number' },
      { name: 'mrn', default: '', description: 'Medical record number', type: 'text' },
      { name: 'primary_diagnosis', default: '', description: 'Primary terminal diagnosis', type: 'text' },
      { name: 'admitting_diagnosis', default: '', description: 'Hospital admitting diagnosis', type: 'text' },
      { name: 'discharge_destination', default: '', description: 'Discharge destination', type: 'select', options: ['Home', 'Family member home', 'Assisted living', 'Skilled nursing facility', 'Hospice inpatient unit', 'Hospice house'] },
      { name: 'discharge_address', default: '', description: 'Discharge address', type: 'textarea' },
      { name: 'primary_caregiver', default: '', description: 'Primary caregiver name/relationship', type: 'text' },
      { name: 'caregiver_phone', default: '', description: 'Caregiver phone number', type: 'text' },
      { name: 'hospice_agency', default: '', description: 'Selected hospice agency', type: 'text' },
      { name: 'hospice_phone', default: '', description: 'Hospice 24-hour phone', type: 'text' },
      { name: 'initial_visit', default: '', description: 'Initial hospice visit date/time', type: 'text' },
      { name: 'terminal_diagnosis', default: '', description: 'Terminal diagnosis for certification', type: 'text' },
      { name: 'pps_score', default: '50', description: 'Current PPS score %', type: 'number' },
      { name: 'pain_level', default: '', description: 'Current pain level (0-10)', type: 'number' },
      { name: 'symptoms', default: '', description: 'Current symptoms requiring management', type: 'textarea' },
      { name: 'level_of_care', default: 'Routine Home Care', description: 'Hospice level of care', type: 'select', options: ['Routine Home Care', 'Continuous Home Care', 'General Inpatient', 'Respite Care'] },
      { name: 'continue_medications', default: '', description: 'Medications to continue', type: 'textarea' },
      { name: 'discontinue_medications', default: '', description: 'Medications to discontinue', type: 'textarea' },
      { name: 'bed_type', default: '', description: 'Hospital bed type needed', type: 'select', options: ['Full electric', 'Semi-electric', 'Not needed'] },
      { name: 'mattress_type', default: '', description: 'Mattress type', type: 'select', options: ['Standard', 'Pressure-reducing', 'Low air loss', 'Alternating pressure'] },
      { name: 'o2_needs', default: '', description: 'Oxygen requirements', type: 'select', options: ['None', 'PRN', 'Continuous - concentrator', 'Continuous - portable', 'High-flow'] },
      { name: 'other_dme', default: '', description: 'Other DME needed', type: 'text' },
      { name: 'discharge_time', default: '', description: 'Planned discharge time', type: 'text' },
      { name: 'transportation', default: '', description: 'Transportation arrangement', type: 'select', options: ['Family vehicle', 'Wheelchair van', 'Stretcher transport', 'Ambulance'] },
      { name: 'dme_delivery_time', default: '', description: 'DME delivery time', type: 'text' },
    ],
    tags: ['hospice', 'discharge', 'hospital', 'transition', 'care-coordination'],
    difficulty: 'intermediate',
    estimatedTime: '20 min',
    outputFormats: ['memo', 'pdf'],
    useCases: ['Hospital discharge planning', 'Care transitions', 'Hospice admission coordination'],
    requiredInputs: ['patient_name', 'primary_diagnosis', 'hospice_agency'],
  },

  {
    id: 'hospice-certification-statement',
    name: 'Medicare Hospice Certification Statement',
    description: 'Generate physician certification statement for Medicare hospice benefit',
    category: 'Healthcare',
    categorySlug: 'healthcare',
    icon: '📋',
    prompt: `## Medicare Hospice Physician Certification Statement

**Patient Information:**
- Name: {{patient_name}}
- Date of Birth: {{dob}}
- Medicare ID: {{medicare_id}}

**Certifying Physician:**
- Name: {{physician_name}}
- NPI: {{physician_npi}}
- Specialty: {{physician_specialty}}

**Certification Details:**
- Certification Type: {{certification_type}}
- Benefit Period: {{benefit_period}}
- Certification Date: {{certification_date}}

**Terminal Diagnosis:**
- Primary: {{primary_diagnosis}}
- ICD-10 Code: {{icd10_code}}
- Related Conditions: {{related_conditions}}

**Clinical Basis for Prognosis:**
- PPS Score: {{pps_score}}%
- Recent Decline: {{decline_description}}
- Supporting Factors: {{supporting_factors}}

---

**Generate a Medicare-compliant hospice certification statement:**

1. **Certification Statement**

   I, {{physician_name}}, MD/DO, hereby certify that:

   **Patient:** {{patient_name}}
   **DOB:** {{dob}}
   **Medicare ID:** {{medicare_id}}

   Based on my clinical judgment regarding the normal course of the patient's illness, the patient's prognosis is for a life expectancy of **six (6) months or less** if the terminal illness runs its normal course.

   **Terminal Diagnosis:** {{primary_diagnosis}} ({{icd10_code}})

2. **Clinical Basis for Certification**

   This certification is based on the following clinical findings:

   **Disease-Specific Criteria:**
   [Document specific LCD criteria met]

   **Functional Status:**
   - Palliative Performance Scale: {{pps_score}}%
   - Recent functional decline: {{decline_description}}
   - ADL dependencies: {{adl_status}}

   **Supporting Clinical Indicators:**
   {{supporting_factors}}

   **Trajectory:**
   The patient has demonstrated progressive decline over the past _________ as evidenced by:
   - [Specific decline markers]

3. **Face-to-Face Encounter Documentation**
   (Required for recertification at 3rd benefit period and beyond)

   {{#if face_to_face_required}}
   Face-to-face encounter performed on: {{f2f_date}}
   Encounter performed by: {{f2f_provider}}

   Findings confirm continued decline and terminal prognosis:
   [Document specific findings from encounter]
   {{/if}}

4. **Attestation**

   I attest that this certification is based on my personal knowledge of the patient's condition and medical history. I have personally examined the patient (or reviewed the clinical documentation and discussed with the hospice team) and determined that the patient meets Medicare hospice eligibility criteria.

   I understand that a certification of terminal illness is a clinical judgment and that the hospice patient may live longer than 6 months. Continued eligibility will be reassessed at required intervals.

   This certification is made in compliance with 42 CFR 418.22.

   **Physician Signature:** ___________________________
   **Date:** {{certification_date}}
   **NPI:** {{physician_npi}}

5. **Recertification Schedule**
   - Initial certification: Day 1
   - 2nd certification: Day 90
   - 3rd certification: Day 180 (F2F required)
   - Subsequent: Every 60 days (F2F required)

Format as Medicare certification documentation for medical records.`,
    variables: [
      { name: 'patient_name', default: '', description: 'Patient full name', type: 'text' },
      { name: 'dob', default: '', description: 'Date of birth', type: 'date' },
      { name: 'medicare_id', default: '', description: 'Medicare ID number', type: 'text' },
      { name: 'physician_name', default: '', description: 'Certifying physician name', type: 'text' },
      { name: 'physician_npi', default: '', description: 'Physician NPI number', type: 'text' },
      { name: 'physician_specialty', default: '', description: 'Physician specialty', type: 'text' },
      { name: 'certification_type', default: 'Initial', description: 'Type of certification', type: 'select', options: ['Initial', 'Recertification - 2nd period', 'Recertification - 3rd+ period'] },
      { name: 'benefit_period', default: '1st 90-day', description: 'Benefit period', type: 'select', options: ['1st 90-day', '2nd 90-day', '1st 60-day', 'Subsequent 60-day'] },
      { name: 'certification_date', default: '', description: 'Date of certification', type: 'date' },
      { name: 'primary_diagnosis', default: '', description: 'Primary terminal diagnosis', type: 'text' },
      { name: 'icd10_code', default: '', description: 'ICD-10 code', type: 'text' },
      { name: 'related_conditions', default: '', description: 'Related/contributing conditions', type: 'textarea' },
      { name: 'pps_score', default: '', description: 'Current PPS score %', type: 'number' },
      { name: 'decline_description', default: '', description: 'Description of recent decline', type: 'textarea' },
      { name: 'supporting_factors', default: '', description: 'Supporting clinical factors', type: 'textarea' },
      { name: 'adl_status', default: '', description: 'ADL dependency status', type: 'text' },
      { name: 'face_to_face_required', default: 'No', description: 'F2F encounter required', type: 'select', options: ['No', 'Yes'] },
      { name: 'f2f_date', default: '', description: 'F2F encounter date', type: 'date' },
      { name: 'f2f_provider', default: '', description: 'F2F encounter provider', type: 'text' },
    ],
    tags: ['hospice', 'medicare', 'certification', 'physician', 'documentation'],
    difficulty: 'advanced',
    estimatedTime: '10 min',
    outputFormats: ['memo', 'pdf'],
    useCases: ['Hospice admission', 'Medicare certification', 'Recertification', 'Compliance'],
    requiredInputs: ['patient_name', 'primary_diagnosis', 'physician_name'],
  },

  {
    id: 'pps-assessment-tool',
    name: 'Palliative Performance Scale (PPS) Calculator',
    description: 'Calculate and document PPS score with clinical interpretation',
    category: 'Healthcare',
    categorySlug: 'healthcare',
    icon: '📊',
    prompt: `## Palliative Performance Scale (PPS) Assessment

**Patient Information:**
- Name: {{patient_name}}
- Assessment Date: {{assessment_date}}
- Assessor: {{assessor_name}}

**PPS Domains Assessment:**

**1. Ambulation:**
{{ambulation}}

**2. Activity & Evidence of Disease:**
{{activity_level}}

**3. Self-Care:**
{{self_care}}

**4. Intake:**
{{intake}}

**5. Conscious Level:**
{{conscious_level}}

---

**Please calculate and interpret the PPS score:**

1. **PPS Scoring Matrix**

   | PPS% | Ambulation | Activity/Disease | Self-Care | Intake | Conscious |
   |------|------------|------------------|-----------|--------|-----------|
   | 100% | Full | Normal, no disease | Full | Normal | Full |
   | 90% | Full | Normal, some disease | Full | Normal | Full |
   | 80% | Full | Normal with effort | Full | Normal or reduced | Full |
   | 70% | Reduced | Unable normal job | Full | Normal or reduced | Full |
   | 60% | Reduced | Unable hobby/housework | Occasional assist | Normal or reduced | Full or confusion |
   | 50% | Mainly sit/lie | Unable any work | Considerable assist | Normal or reduced | Full or confusion |
   | 40% | Mainly in bed | Unable most activity | Mainly assist | Normal or reduced | Full/drowsy/confusion |
   | 30% | Totally bed bound | Unable any activity | Total care | Reduced | Full/drowsy/confusion |
   | 20% | Totally bed bound | Unable any activity | Total care | Minimal sips | Full/drowsy/confusion |
   | 10% | Totally bed bound | Unable any activity | Total care | Mouth care only | Drowsy or coma |
   | 0% | Death | - | - | - | - |

2. **Domain Assessments**

   **Ambulation Assessment:**
   - Current status: {{ambulation}}
   - Score component: ___

   **Activity/Evidence of Disease:**
   - Current status: {{activity_level}}
   - Score component: ___

   **Self-Care:**
   - Current status: {{self_care}}
   - Score component: ___

   **Intake:**
   - Current status: {{intake}}
   - Score component: ___

   **Conscious Level:**
   - Current status: {{conscious_level}}
   - Score component: ___

3. **Calculated PPS Score: ____%**

4. **Clinical Interpretation**

   **Hospice Eligibility:**
   - PPS ≤70%: Generally meets non-disease-specific criteria
   - PPS ≤50%: Strong indicator of limited prognosis
   - PPS ≤30%: Typically indicates days to weeks prognosis

   **Median Survival Estimates (based on research):**
   - PPS 70%: ~45 days
   - PPS 60%: ~29 days
   - PPS 50%: ~15 days
   - PPS 40%: ~10 days
   - PPS 30%: ~6 days
   - PPS 20%: ~3 days
   - PPS 10%: ~2 days

   Note: These are median values; individual patients may vary significantly.

5. **Trajectory Assessment**

   Previous PPS (if available): {{previous_pps}}%
   Date of previous assessment: {{previous_date}}

   Trajectory analysis:
   - Rate of decline: ___ points over ___ days/weeks
   - Pattern: [Stable / Gradual decline / Rapid decline]

6. **Care Implications**

   Based on PPS of ____%, consider:
   - Level of care needs
   - Prognosis communication
   - Care planning adjustments
   - Caregiver support needs

7. **Documentation Summary**

   "Patient assessed using the Palliative Performance Scale (PPS v2). Current PPS score is ____%, indicating [interpretation]. This represents [no change / decline of ___ points] from previous assessment on [date]. Current score is [consistent with / supportive of] hospice eligibility criteria."

Format as clinical assessment documentation.`,
    variables: [
      { name: 'patient_name', default: '', description: 'Patient name', type: 'text' },
      { name: 'assessment_date', default: '', description: 'Date of assessment', type: 'date' },
      { name: 'assessor_name', default: '', description: 'Name of assessor', type: 'text' },
      { name: 'ambulation', default: '', description: 'Ambulation status', type: 'select', options: ['Full - normal ambulation', 'Full - with effort', 'Reduced - cannot walk far', 'Mainly sit/lie - minimal walking', 'Mainly in bed - can sit in chair', 'Totally bed bound'] },
      { name: 'activity_level', default: '', description: 'Activity and evidence of disease', type: 'select', options: ['Normal activity, no disease evidence', 'Normal activity, some disease evidence', 'Normal activity with effort, significant disease', 'Unable to do normal job/work', 'Unable to do hobby/housework', 'Unable to do any work, extensive disease', 'Unable to do most activities', 'Unable to do any activity'] },
      { name: 'self_care', default: '', description: 'Self-care ability', type: 'select', options: ['Full self-care', 'Occasional assistance needed', 'Considerable assistance required', 'Mainly assistance required', 'Total care required'] },
      { name: 'intake', default: '', description: 'Oral intake', type: 'select', options: ['Normal intake', 'Normal or reduced intake', 'Reduced intake', 'Minimal to sips only', 'Mouth care only'] },
      { name: 'conscious_level', default: '', description: 'Level of consciousness', type: 'select', options: ['Full consciousness', 'Full or confusion', 'Full or drowsy +/- confusion', 'Drowsy or coma +/- confusion'] },
      { name: 'previous_pps', default: '', description: 'Previous PPS score if available', type: 'number' },
      { name: 'previous_date', default: '', description: 'Date of previous assessment', type: 'date' },
    ],
    tags: ['pps', 'assessment', 'prognosis', 'hospice', 'functional-status'],
    difficulty: 'beginner',
    estimatedTime: '5 min',
    outputFormats: ['memo', 'pdf'],
    useCases: ['Hospice assessment', 'Prognosis documentation', 'Care planning', 'Recertification'],
    requiredInputs: ['patient_name', 'ambulation', 'self_care'],
  },

  {
    id: 'goals-of-care-conversation',
    name: 'Goals of Care Conversation Guide',
    description: 'Structured guide for conducting goals of care discussions',
    category: 'Healthcare',
    categorySlug: 'healthcare',
    icon: '💬',
    prompt: `## Goals of Care Conversation Guide

**Patient/Family Information:**
- Patient Name: {{patient_name}}
- Decision Maker: {{decision_maker}}
- Relationship to Patient: {{relationship}}
- Meeting Participants: {{participants}}
- Meeting Date: {{meeting_date}}

**Clinical Context:**
- Primary Diagnosis: {{primary_diagnosis}}
- Current Prognosis: {{prognosis}}
- Current Functional Status: {{functional_status}}
- Current Treatment: {{current_treatment}}

**Patient's Current Understanding:**
{{current_understanding}}

**Cultural/Religious Considerations:**
{{cultural_considerations}}

---

**Generate a structured goals of care conversation guide:**

1. **Preparation Checklist**
   - [ ] Review medical records and prognosis
   - [ ] Identify decision-maker and key family members
   - [ ] Arrange private, comfortable space
   - [ ] Allow adequate time (30-60 minutes)
   - [ ] Have tissues available
   - [ ] Silence phones/pagers if possible

2. **Opening the Conversation**

   **Assess Understanding (ASK before TELL):**
   - "What have the doctors told you about [patient's] condition?"
   - "What is your understanding of where things are with [patient's] illness?"
   - "What are you hoping for?"

   **Align Understanding:**
   Based on response, clarify or confirm understanding before proceeding.

3. **Sharing Prognosis Information**

   **Ask Permission:**
   - "Would it be helpful if I shared what the medical team is seeing?"
   - "Is now a good time to discuss what we can expect going forward?"

   **Deliver Information:**
   - Use clear, simple language
   - Avoid medical jargon
   - Use "I wish..." statements: "I wish I had better news to share..."
   - Be honest but compassionate about prognosis: {{prognosis}}

   **Warning Shot:**
   - "I'm worried that..."
   - "I'm concerned because..."

4. **Explore Values and Goals**

   **Key Questions:**
   - "What matters most to you/[patient] right now?"
   - "What does a good day look like?"
   - "What are you hoping we can help with?"
   - "Are there things you're worried about or afraid of?"
   - "What gives [patient] strength?"
   - "If time is limited, what would be most important?"

5. **Discuss Treatment Options**

   **Frame the Options:**

   **Option 1: Continue Current Approach**
   - What this means: {{option1_description}}
   - Potential benefits:
   - Potential burdens:
   - Likelihood of benefit:

   **Option 2: Focus on Comfort**
   - What this means: Shift focus to quality of life and symptom management
   - Potential benefits: Less medical intervention, more time at home, focus on comfort
   - What we would still do: Treat pain, manage symptoms, provide support
   - What we would not do: {{not_do}}

   **Option 3: Middle Ground (if applicable)**
   - What this means: {{option3_description}}

6. **Make a Recommendation (when appropriate)**

   - "Based on what you've shared about [patient's] values..."
   - "Given where things are with the illness..."
   - "I would recommend..."
   - "This recommendation is based on..."

7. **Address Specific Decisions**

   **CPR/Resuscitation:**
   - Explain what CPR involves
   - Discuss likelihood of success given diagnosis
   - Frame in context of goals

   **Intubation/Mechanical Ventilation:**
   - Explain what this involves
   - Discuss temporary vs. long-term scenarios
   - Align with stated goals

   **Hospitalization:**
   - Discuss when hospitalization would/wouldn't help
   - Hospice can provide many treatments at home

   **Artificial Nutrition:**
   - Discuss feeding tube options
   - Explain that not eating is often natural at end of life
   - Address family concerns about "starving"

8. **Respond to Emotion**

   **NURSE Protocol:**
   - **N**ame the emotion: "It sounds like you're feeling..."
   - **U**nderstand: "I can understand why you'd feel that way"
   - **R**espect: "You're asking really important questions"
   - **S**upport: "We're going to support you through this"
   - **E**xplore: "Tell me more about..."

   **Allow Silence**
   Give time to process. Silence is okay.

9. **Summarize and Document**

   **Verbal Summary:**
   "Let me make sure I understand what we've discussed..."

   **Written Documentation:**

   Goals of Care Discussion Summary:
   - Meeting date: {{meeting_date}}
   - Participants: {{participants}}
   - Patient's understanding of illness: [documented]
   - Values identified: [documented]
   - Goals of care: [documented]
   - Specific decisions: [documented]
   - Plan: [documented]
   - Follow-up: [documented]

10. **Next Steps**

    - [ ] Document conversation in medical record
    - [ ] Update code status/POLST if indicated
    - [ ] Place appropriate orders
    - [ ] Arrange follow-up meeting if needed
    - [ ] Referrals: [Palliative care / Hospice / Social work / Chaplain]
    - [ ] Provide written materials if helpful

Format as clinical conversation guide with documentation template.`,
    variables: [
      { name: 'patient_name', default: '', description: 'Patient name', type: 'text' },
      { name: 'decision_maker', default: '', description: 'Healthcare decision maker name', type: 'text' },
      { name: 'relationship', default: '', description: 'Relationship to patient', type: 'select', options: ['Self (patient)', 'Spouse/Partner', 'Adult Child', 'Parent', 'Sibling', 'Other Family', 'Healthcare Proxy', 'Court-appointed Guardian'] },
      { name: 'participants', default: '', description: 'Meeting participants', type: 'textarea' },
      { name: 'meeting_date', default: '', description: 'Date of meeting', type: 'date' },
      { name: 'primary_diagnosis', default: '', description: 'Primary diagnosis', type: 'text' },
      { name: 'prognosis', default: '', description: 'Current prognosis estimate', type: 'select', options: ['Years', 'Months to a year', 'Weeks to months', 'Days to weeks', 'Hours to days'] },
      { name: 'functional_status', default: '', description: 'Current functional status', type: 'text' },
      { name: 'current_treatment', default: '', description: 'Current treatment approach', type: 'text' },
      { name: 'current_understanding', default: '', description: 'Patient/family current understanding', type: 'textarea' },
      { name: 'cultural_considerations', default: '', description: 'Cultural or religious considerations', type: 'textarea' },
      { name: 'option1_description', default: 'Continue disease-directed treatment', description: 'Description of option 1', type: 'text' },
      { name: 'option3_description', default: '', description: 'Description of middle ground option', type: 'text' },
      { name: 'not_do', default: 'CPR, intubation, ICU care', description: 'What would not be done with comfort focus', type: 'text' },
    ],
    tags: ['goals-of-care', 'communication', 'palliative', 'family-meeting', 'advance-care-planning'],
    difficulty: 'intermediate',
    estimatedTime: '10 min prep',
    outputFormats: ['memo', 'pdf'],
    useCases: ['Family meetings', 'Advance care planning', 'Hospice discussions', 'Code status conversations'],
    requiredInputs: ['patient_name', 'primary_diagnosis'],
  },

  {
    id: 'hospice-symptom-management',
    name: 'Hospice Symptom Management Protocol',
    description: 'Evidence-based symptom management protocols for common hospice symptoms',
    category: 'Healthcare',
    categorySlug: 'healthcare',
    icon: '💊',
    prompt: `## Hospice Symptom Management Protocol

**Patient Information:**
- Name: {{patient_name}}
- Primary Diagnosis: {{primary_diagnosis}}
- Current PPS: {{pps_score}}%
- Allergies: {{allergies}}
- Renal Function: {{renal_function}}
- Current Medications: {{current_medications}}

**Primary Symptom(s) to Address:**
{{primary_symptoms}}

**Symptom Assessment:**
- Severity (0-10): {{symptom_severity}}
- Duration: {{symptom_duration}}
- Aggravating Factors: {{aggravating_factors}}
- Relieving Factors: {{relieving_factors}}
- Impact on Function/QOL: {{qol_impact}}

---

**Generate evidence-based symptom management protocols:**

1. **Pain Management Protocol**

   **Pain Assessment:**
   - Current pain level: {{pain_level}}/10
   - Pain type: {{pain_type}}
   - Location: {{pain_location}}
   - Current analgesics: {{current_pain_meds}}

   **WHO Analgesic Ladder Approach:**

   **Mild Pain (1-3):**
   - Acetaminophen 650-1000mg q6h (max 3g/day if liver disease)
   - NSAIDs if not contraindicated

   **Moderate Pain (4-6):**
   - Add short-acting opioid:
     - Opioid-naive: Morphine 5-10mg PO q4h PRN OR
     - Oxycodone 5mg PO q4h PRN OR
     - Hydromorphone 2mg PO q4h PRN

   **Severe Pain (7-10):**
   - Increase opioid dose by 25-50%
   - Consider long-acting formulation
   - Ensure adequate breakthrough dosing (10-15% of 24hr total)

   **Neuropathic Pain Adjuvants:**
   - Gabapentin: Start 100-300mg TID, titrate to effect
   - Pregabalin: Start 25-75mg BID
   - Duloxetine: 30mg daily, increase to 60mg
   - Dexamethasone for nerve compression

2. **Dyspnea Management Protocol**

   **Non-Pharmacologic:**
   - Fan directed at face
   - Cool room temperature
   - Positioning (upright, leaning forward)
   - Pursed-lip breathing
   - Relaxation techniques
   - Reduce activity

   **Pharmacologic:**
   - **Opioids (first-line):**
     - Opioid-naive: Morphine 2.5-5mg PO/SL q4h PRN
     - Opioid-tolerant: Increase current dose by 25%
   - **Supplemental oxygen:** If hypoxic and provides comfort
   - **Anxiolytics:** Lorazepam 0.5-1mg SL q4-6h PRN
   - **Bronchodilators:** If bronchospasm component
   - **Corticosteroids:** If airway obstruction/lymphangitic spread

3. **Nausea/Vomiting Protocol**

   **Identify Cause and Treat Accordingly:**

   | Cause | First-Line | Alternative |
   |-------|------------|-------------|
   | Gastroparesis | Metoclopramide 10mg QID | Erythromycin 250mg TID |
   | Chemoreceptor trigger zone | Haloperidol 0.5-1mg BID | Ondansetron 4-8mg TID |
   | Vestibular | Meclizine 25mg TID | Scopolamine patch |
   | Bowel obstruction | Octreotide + dexamethasone | Hyoscine butylbromide |
   | Opioid-induced | Rotate opioid, add antiemetic | Methylnaltrexone if constipation |
   | Increased ICP | Dexamethasone 4-8mg daily | |

4. **Anxiety/Agitation Protocol**

   **Non-Pharmacologic:**
   - Calm environment
   - Familiar faces
   - Music therapy
   - Aromatherapy
   - Spiritual support

   **Pharmacologic:**
   - **Mild anxiety:** Lorazepam 0.5mg PO/SL TID PRN
   - **Moderate anxiety:** Lorazepam 1mg PO/SL TID PRN
   - **Agitation/Delirium:**
     - Haloperidol 0.5-2mg PO/SC q4-6h
     - Risperidone 0.25-0.5mg BID
     - Quetiapine 12.5-25mg BID
   - **Severe/Terminal agitation:**
     - Midazolam 2-5mg SC q1h PRN or continuous infusion
     - Consider palliative sedation protocol

5. **Secretion Management ("Death Rattle")**

   **Education:** Explain to family that secretions are not causing distress to patient

   **Pharmacologic:**
   - Glycopyrrolate 0.2mg SC q4h PRN or 1mg PO TID
   - Hyoscine hydrobromide (scopolamine) 0.4mg SC q4h PRN
   - Atropine 1% ophthalmic drops 2 drops SL q4h PRN

   **Non-Pharmacologic:**
   - Positioning (side-lying, head elevated)
   - Gentle suctioning only if shallow and distressing
   - Reduce IV fluids if receiving

6. **Constipation Protocol**

   **Prevention (all patients on opioids):**
   - Senna 2 tabs BID + docusate 100mg BID
   - Adequate fluid intake if appropriate

   **Treatment:**
   - **Mild:** Increase senna to 4 tabs BID
   - **Moderate:** Add polyethylene glycol 17g daily
   - **Severe:** Bisacodyl suppository, then enema
   - **Opioid-induced refractory:** Methylnaltrexone 8-12mg SC

7. **Comfort Kit Contents**

   Standard hospice comfort kit should include:
   - Morphine concentrate 20mg/mL - 30mL
   - Lorazepam 2mg/mL - 30mL OR tablets 0.5mg
   - Prochlorperazine 25mg suppositories
   - Acetaminophen 650mg suppositories
   - Haloperidol 5mg/mL - 15mL
   - Atropine 1% ophthalmic solution
   - Glycopyrrolate 0.2mg/mL (optional)

8. **Documentation Template**

   Symptom: {{primary_symptoms}}
   Severity: {{symptom_severity}}/10
   Assessment: [findings]
   Plan:
   - Non-pharmacologic: [interventions]
   - Pharmacologic: [medications with doses]
   - Follow-up: [timing]
   - Goals: [symptom target]

Format as clinical symptom management protocol.`,
    variables: [
      { name: 'patient_name', default: '', description: 'Patient name', type: 'text' },
      { name: 'primary_diagnosis', default: '', description: 'Primary diagnosis', type: 'text' },
      { name: 'pps_score', default: '50', description: 'Current PPS score', type: 'number' },
      { name: 'allergies', default: 'NKDA', description: 'Medication allergies', type: 'text' },
      { name: 'renal_function', default: 'Normal', description: 'Renal function status', type: 'select', options: ['Normal', 'Mild impairment', 'Moderate impairment', 'Severe impairment/ESRD'] },
      { name: 'current_medications', default: '', description: 'Current medication list', type: 'textarea' },
      { name: 'primary_symptoms', default: '', description: 'Primary symptoms to address', type: 'select', options: ['Pain', 'Dyspnea', 'Nausea/Vomiting', 'Anxiety', 'Agitation/Delirium', 'Secretions', 'Constipation', 'Multiple symptoms'] },
      { name: 'symptom_severity', default: '', description: 'Symptom severity (0-10)', type: 'number' },
      { name: 'symptom_duration', default: '', description: 'Duration of symptoms', type: 'text' },
      { name: 'aggravating_factors', default: '', description: 'What makes it worse', type: 'text' },
      { name: 'relieving_factors', default: '', description: 'What makes it better', type: 'text' },
      { name: 'qol_impact', default: '', description: 'Impact on quality of life', type: 'select', options: ['Minimal', 'Moderate', 'Significant', 'Severe'] },
      { name: 'pain_level', default: '', description: 'Pain level (0-10)', type: 'number' },
      { name: 'pain_type', default: '', description: 'Type of pain', type: 'select', options: ['Nociceptive/somatic', 'Visceral', 'Neuropathic', 'Mixed', 'Total pain'] },
      { name: 'pain_location', default: '', description: 'Pain location', type: 'text' },
      { name: 'current_pain_meds', default: '', description: 'Current pain medications', type: 'textarea' },
    ],
    tags: ['symptoms', 'pain', 'hospice', 'palliative', 'medications'],
    difficulty: 'advanced',
    estimatedTime: '10 min',
    outputFormats: ['memo', 'pdf'],
    useCases: ['Symptom management', 'Medication adjustment', 'Comfort kit orders', 'Crisis management'],
    requiredInputs: ['patient_name', 'primary_symptoms'],
  },
];

export default HEALTHCARE_TEMPLATES;
