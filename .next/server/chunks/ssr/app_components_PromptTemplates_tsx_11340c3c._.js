module.exports=[51677,a=>{"use strict";let b=[{id:"hospice-eligibility-general",name:"Hospice Eligibility Assessment",description:"Comprehensive evaluation of patient eligibility for hospice care based on Medicare guidelines",category:"Healthcare",categorySlug:"healthcare",icon:"🏥",prompt:`## Hospice Eligibility Assessment

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

Format output as a clinical assessment suitable for medical records.`,variables:[{name:"patient_name",default:"",description:"Patient full name",type:"text"},{name:"patient_age",default:"",description:"Patient age in years",type:"number"},{name:"primary_diagnosis",default:"",description:"Primary terminal diagnosis",type:"select",options:["Cancer/Malignancy","Heart Failure","COPD/Pulmonary Disease","Dementia/Alzheimers","Stroke/CVA","Liver Disease","End-Stage Renal Disease","ALS/Neurological","HIV/AIDS","Other Terminal Illness"]},{name:"secondary_diagnoses",default:"",description:"Relevant comorbidities",type:"textarea"},{name:"pps_score",default:"50",description:"Palliative Performance Scale (0-100%)",type:"number"},{name:"kps_score",default:"50",description:"Karnofsky Performance Status (0-100)",type:"number"},{name:"adl_dependencies",default:"3",description:"Number of ADL dependencies (0-6)",type:"number"},{name:"weight_change",default:"",description:"Weight change amount and direction",type:"text"},{name:"weight_timeframe",default:"6 months",description:"Timeframe for weight change",type:"select",options:["3 months","6 months","12 months"]},{name:"nutritional_status",default:"",description:"Current nutritional intake status",type:"select",options:["Normal oral intake","Reduced intake","Minimal intake","NPO/Tube feeding","Declining despite intervention"]},{name:"hospitalizations",default:"0",description:"Number of hospitalizations",type:"number"},{name:"infections",default:"None",description:"Recurrent infections if any",type:"text"},{name:"curative_treatment",default:"",description:"Current curative treatment status",type:"select",options:["Continuing curative treatment","Declined further curative treatment","No curative options available","Treatment stopped due to toxicity"]},{name:"care_goals",default:"",description:"Patient/family stated goals of care",type:"textarea"}],tags:["hospice","eligibility","medicare","end-of-life","palliative"],difficulty:"advanced",estimatedTime:"15 min",outputFormats:["memo","pdf"],useCases:["Hospital discharge planning","Hospice referral","Medicare certification","Care transition"],requiredInputs:["patient_name","primary_diagnosis","pps_score"]},{id:"hospice-cancer-eligibility",name:"Hospice Eligibility - Oncology",description:"Cancer-specific hospice eligibility assessment per LCD guidelines",category:"Healthcare",categorySlug:"healthcare",icon:"🎗️",prompt:`## Oncology Hospice Eligibility Assessment

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

Format as clinical documentation for hospice referral.`,variables:[{name:"patient_name",default:"",description:"Patient name",type:"text"},{name:"patient_age",default:"",description:"Patient age",type:"number"},{name:"cancer_type",default:"",description:"Primary cancer type",type:"select",options:["Lung (NSCLC)","Lung (Small Cell)","Breast","Colon/Colorectal","Pancreatic","Liver/HCC","Ovarian","Prostate","Brain (GBM)","Melanoma","Esophageal","Gastric","Kidney/Renal","Bladder","Head and Neck","Leukemia","Lymphoma","Multiple Myeloma","Other"]},{name:"cancer_stage",default:"IV",description:"Cancer stage",type:"select",options:["Stage I","Stage II","Stage III","Stage IV","Recurrent","Unknown"]},{name:"histology",default:"",description:"Histology/grade if known",type:"text"},{name:"metastatic_sites",default:"",description:"Sites of metastasis",type:"textarea"},{name:"diagnosis_duration",default:"",description:"Time since initial diagnosis",type:"text"},{name:"prior_treatments",default:"",description:"Prior treatments received",type:"textarea"},{name:"treatment_response",default:"",description:"Response to most recent treatment",type:"select",options:["Complete response","Partial response","Stable disease","Progressive disease","Treatment naive","Declined treatment"]},{name:"ecog_score",default:"3",description:"ECOG Performance Status (0-4)",type:"select",options:["0 - Fully active","1 - Restricted activity","2 - Ambulatory, up >50%","3 - Limited self-care, bed/chair >50%","4 - Completely disabled"]},{name:"pps_score",default:"50",description:"Palliative Performance Scale %",type:"number"},{name:"weight_loss",default:"",description:"Percentage weight loss",type:"percentage"},{name:"weight_timeframe",default:"3 months",description:"Timeframe for weight loss",type:"select",options:["1 month","3 months","6 months"]},{name:"albumin",default:"",description:"Serum albumin (g/dL)",type:"number"},{name:"calcium",default:"",description:"Serum calcium (mg/dL)",type:"number"},{name:"hemoglobin",default:"",description:"Hemoglobin (g/dL)",type:"number"},{name:"complications",default:"",description:"Current complications (ascites, effusion, obstruction, etc.)",type:"textarea"}],tags:["hospice","oncology","cancer","eligibility","lcd"],difficulty:"advanced",estimatedTime:"15 min",outputFormats:["memo","pdf"],useCases:["Oncology hospice referral","Tumor board discussion","Goals of care conversation"],requiredInputs:["patient_name","cancer_type","cancer_stage"]},{id:"hospice-heart-failure",name:"Hospice Eligibility - Heart Failure",description:"CHF-specific hospice eligibility assessment using NYHA criteria",category:"Healthcare",categorySlug:"healthcare",icon:"❤️",prompt:`## Heart Failure Hospice Eligibility Assessment

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

Format as clinical heart failure hospice assessment.`,variables:[{name:"patient_name",default:"",description:"Patient name",type:"text"},{name:"patient_age",default:"",description:"Patient age",type:"number"},{name:"hf_etiology",default:"",description:"Heart failure etiology",type:"select",options:["Ischemic cardiomyopathy","Non-ischemic dilated cardiomyopathy","Hypertensive heart disease","Valvular heart disease","Alcoholic cardiomyopathy","Viral/inflammatory","Unknown"]},{name:"hf_duration",default:"",description:"Duration of heart failure diagnosis",type:"text"},{name:"ejection_fraction",default:"",description:"Most recent ejection fraction %",type:"number"},{name:"nyha_class",default:"IV",description:"NYHA Functional Class",type:"select",options:["Class I","Class II","Class III","Class IV"]},{name:"bnp_level",default:"",description:"BNP or NT-proBNP level",type:"text"},{name:"dyspnea_rest",default:"Yes",description:"Dyspnea at rest",type:"select",options:["Yes","No"]},{name:"orthopnea",default:"",description:"Number of pillows/degree of orthopnea",type:"text"},{name:"edema",default:"",description:"Lower extremity edema status",type:"select",options:["None","Trace","Mild","Moderate","Severe","Anasarca"]},{name:"fatigue",default:"",description:"Fatigue severity",type:"select",options:["Minimal","Mild","Moderate","Severe","Extreme"]},{name:"current_meds",default:"",description:"Current cardiac medications",type:"textarea"},{name:"optimal_therapy",default:"",description:"Is patient on optimal medical therapy?",type:"select",options:["Yes - on all tolerated agents","No - has not trialed all agents","Limited by hypotension","Limited by renal function","Limited by other contraindications"]},{name:"device_status",default:"",description:"ICD/Pacemaker/CRT status",type:"select",options:["None","Pacemaker only","ICD","CRT-P","CRT-D"]},{name:"advanced_therapies",default:"",description:"Candidacy for LVAD/transplant",type:"select",options:["Candidate - declined","Not a candidate - age","Not a candidate - comorbidities","Not a candidate - psychosocial","Under evaluation","N/A"]},{name:"hospitalizations",default:"",description:"HF hospitalizations past 6 months",type:"number"},{name:"er_visits",default:"",description:"ER visits for HF past 6 months",type:"number"},{name:"diuretic_needs",default:"",description:"Diuretic requirements",type:"select",options:["Stable oral dose","Escalating oral dose","Intermittent IV needed","Continuous IV infusion","Refractory to diuretics"]},{name:"pps_score",default:"50",description:"Palliative Performance Scale %",type:"number"},{name:"adl_count",default:"3",description:"ADL dependencies",type:"number"},{name:"ace_status",default:"",description:"ACE-I/ARB/ARNI status",type:"text"},{name:"bb_status",default:"",description:"Beta-blocker status",type:"text"},{name:"diuretic_status",default:"",description:"Diuretic regimen",type:"text"},{name:"mra_status",default:"",description:"MRA (spironolactone) status",type:"text"}],tags:["hospice","heart-failure","cardiology","chf","nyha"],difficulty:"advanced",estimatedTime:"15 min",outputFormats:["memo","pdf"],useCases:["Cardiology hospice referral","Heart failure clinic","Advanced HF consultation"],requiredInputs:["patient_name","nyha_class","ejection_fraction"]},{id:"hospice-copd",name:"Hospice Eligibility - COPD/Pulmonary",description:"Pulmonary disease hospice eligibility with spirometry and blood gas criteria",category:"Healthcare",categorySlug:"healthcare",icon:"🫁",prompt:`## COPD/Pulmonary Disease Hospice Eligibility Assessment

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

Format as pulmonary hospice eligibility assessment.`,variables:[{name:"patient_name",default:"",description:"Patient name",type:"text"},{name:"patient_age",default:"",description:"Patient age",type:"number"},{name:"pulmonary_diagnosis",default:"COPD",description:"Primary pulmonary diagnosis",type:"select",options:["COPD","Emphysema","Chronic Bronchitis","Pulmonary Fibrosis/ILD","Bronchiectasis","Pulmonary Hypertension","Combined"]},{name:"disease_duration",default:"",description:"Duration of pulmonary disease",type:"text"},{name:"smoking_history",default:"",description:"Smoking history (pack-years)",type:"text"},{name:"fev1",default:"",description:"FEV1 % predicted (post-bronchodilator)",type:"number"},{name:"fev1_fvc",default:"",description:"FEV1/FVC ratio %",type:"number"},{name:"gold_stage",default:"",description:"GOLD Stage",type:"select",options:["GOLD 1 (Mild)","GOLD 2 (Moderate)","GOLD 3 (Severe)","GOLD 4 (Very Severe)"]},{name:"spo2",default:"",description:"Room air SpO2 %",type:"number"},{name:"pao2",default:"",description:"PaO2 mmHg (if available)",type:"number"},{name:"paco2",default:"",description:"PaCO2 mmHg (if available)",type:"number"},{name:"o2_requirement",default:"",description:"Supplemental O2 requirement",type:"select",options:["None","1-2 L/min","3-4 L/min","5-6 L/min","High-flow/Non-rebreather","Continuous BiPAP"]},{name:"dyspnea_rest",default:"Yes",description:"Dyspnea at rest",type:"select",options:["Yes","No"]},{name:"mmrc_score",default:"4",description:"mMRC Dyspnea Scale (0-4)",type:"select",options:["0 - Strenuous exercise only","1 - Hurrying or walking up hill","2 - Walks slower than peers","3 - Stops after 100 yards","4 - Too breathless to leave house"]},{name:"cor_pulmonale",default:"",description:"Cor pulmonale present",type:"select",options:["Yes","No","Suspected"]},{name:"tachycardia",default:"",description:"Resting tachycardia >100",type:"select",options:["Yes","No"]},{name:"hospitalizations",default:"",description:"Hospitalizations past 12 months",type:"number"},{name:"exacerbations",default:"",description:"COPD exacerbations past year",type:"number"},{name:"infections",default:"",description:"Recurrent respiratory infections",type:"text"},{name:"icu_history",default:"",description:"ICU admissions/intubations",type:"text"},{name:"pps_score",default:"50",description:"Palliative Performance Scale %",type:"number"},{name:"adl_count",default:"3",description:"ADL dependencies",type:"number"},{name:"weight_change",default:"",description:"Weight change",type:"text"},{name:"bronchodilator_status",default:"",description:"Bronchodilator therapy",type:"text"},{name:"ics_status",default:"",description:"Inhaled corticosteroid status",type:"text"},{name:"pulm_rehab",default:"",description:"Pulmonary rehab status",type:"select",options:["Completed","Ongoing","Not candidate","Declined","Not offered"]},{name:"o2_therapy",default:"",description:"Chronic O2 therapy",type:"text"},{name:"niv_status",default:"",description:"Non-invasive ventilation",type:"select",options:["None","Nocturnal BiPAP","Continuous BiPAP","Declined"]}],tags:["hospice","copd","pulmonary","respiratory","gold"],difficulty:"advanced",estimatedTime:"15 min",outputFormats:["memo","pdf"],useCases:["Pulmonology hospice referral","COPD clinic","Respiratory failure management"],requiredInputs:["patient_name","pulmonary_diagnosis","fev1"]},{id:"hospice-dementia",name:"Hospice Eligibility - Dementia",description:"Dementia hospice eligibility using FAST scale and functional criteria",category:"Healthcare",categorySlug:"healthcare",icon:"🧠",prompt:`## Dementia Hospice Eligibility Assessment

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

Format as dementia hospice eligibility assessment for medical records.`,variables:[{name:"patient_name",default:"",description:"Patient name",type:"text"},{name:"patient_age",default:"",description:"Patient age",type:"number"},{name:"dementia_type",default:"Alzheimers",description:"Type of dementia",type:"select",options:["Alzheimers Disease","Vascular Dementia","Lewy Body Dementia","Frontotemporal Dementia","Mixed Dementia","Parkinsons Disease Dementia","Unknown/Unspecified"]},{name:"diagnosis_duration",default:"",description:"Time since dementia diagnosis",type:"text"},{name:"fast_stage",default:"7",description:"FAST Stage (1-7)",type:"select",options:["Stage 1 - No impairment","Stage 2 - Very mild","Stage 3 - Mild","Stage 4 - Moderate","Stage 5 - Moderately severe","Stage 6 - Severe","Stage 7 - Very severe"]},{name:"fast_substage",default:"7C",description:"FAST 7 Sub-stage",type:"select",options:["7A - 6 words/day","7B - Single word","7C - Cannot walk","7D - Cannot sit","7E - Cannot smile","7F - Cannot hold head"]},{name:"speech_status",default:"",description:"Speech/communication ability",type:"select",options:["Normal conversation","Limited vocabulary","Single words only","Non-verbal/sounds only","No vocalizations"]},{name:"ambulation_status",default:"",description:"Ambulation status",type:"select",options:["Independent","Needs assistance","Wheelchair bound","Bed bound"]},{name:"sitting_ability",default:"",description:"Can sit independently",type:"select",options:["Yes","With support only","No"]},{name:"smile_ability",default:"",description:"Can smile",type:"select",options:["Yes","Rarely","No"]},{name:"head_control",default:"",description:"Can hold head up",type:"select",options:["Yes","Limited","No"]},{name:"bathing",default:"Dependent",description:"Bathing ability",type:"select",options:["Independent","Needs assistance","Dependent"]},{name:"dressing",default:"Dependent",description:"Dressing ability",type:"select",options:["Independent","Needs assistance","Dependent"]},{name:"toileting",default:"Dependent",description:"Toileting ability",type:"select",options:["Independent","Needs assistance","Dependent"]},{name:"transferring",default:"Dependent",description:"Transfer ability",type:"select",options:["Independent","Needs assistance","Dependent"]},{name:"continence",default:"",description:"Continence status",type:"select",options:["Continent","Occasional incontinence","Urinary incontinent","Bowel incontinent","Double incontinent"]},{name:"feeding",default:"",description:"Feeding ability",type:"select",options:["Independent","Needs setup/cueing","Needs assistance","Fully dependent","Tube fed"]},{name:"oral_intake",default:"",description:"Current oral intake",type:"select",options:["Normal","Reduced but adequate","Minimal","Refusing","NPO"]},{name:"current_weight",default:"",description:"Current weight (lbs)",type:"number"},{name:"weight_change",default:"",description:"Weight change amount",type:"text"},{name:"weight_timeframe",default:"6 months",description:"Weight change timeframe",type:"select",options:["3 months","6 months","12 months"]},{name:"dysphagia",default:"",description:"Swallowing difficulties",type:"select",options:["None","Mild - modified diet","Moderate - pureed only","Severe - thickened liquids","Aspiration with all textures"]},{name:"aspiration_risk",default:"",description:"Aspiration risk level",type:"select",options:["Low","Moderate","High"]},{name:"aspiration_pneumonia",default:"",description:"Aspiration pneumonia in past 12 months",type:"select",options:["None","One episode","Multiple episodes"]},{name:"uti_count",default:"",description:"UTIs in past 12 months",type:"number"},{name:"sepsis",default:"",description:"Sepsis episodes",type:"select",options:["None","One episode","Multiple episodes"]},{name:"pressure_ulcers",default:"",description:"Pressure ulcers",type:"select",options:["None","Stage 1-2","Stage 3-4","Multiple Stage 3-4"]},{name:"fevers",default:"",description:"Recurrent fevers",type:"select",options:["None","Occasional","Frequent despite treatment"]},{name:"care_setting",default:"",description:"Current care setting",type:"select",options:["Home with family","Home with paid caregiver","Assisted living","Memory care unit","Skilled nursing facility","Hospital"]}],tags:["hospice","dementia","alzheimers","fast-scale","cognitive"],difficulty:"advanced",estimatedTime:"15 min",outputFormats:["memo","pdf"],useCases:["Dementia hospice referral","Memory care consultation","Goals of care discussion"],requiredInputs:["patient_name","dementia_type","fast_stage"]},{id:"palliative-vs-hospice",name:"Palliative Care vs Hospice Determination",description:"Guide decision between palliative care and hospice based on patient status",category:"Healthcare",categorySlug:"healthcare",icon:"⚕️",prompt:`## Palliative Care vs. Hospice Care Determination

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

Format as clinical decision support documentation.`,variables:[{name:"patient_name",default:"",description:"Patient name",type:"text"},{name:"patient_age",default:"",description:"Patient age",type:"number"},{name:"primary_diagnosis",default:"",description:"Primary diagnosis",type:"text"},{name:"prognosis_estimate",default:"",description:"Current prognosis estimate",type:"select",options:["Years","12+ months","6-12 months","3-6 months","<3 months","Uncertain"]},{name:"active_treatment",default:"",description:"Currently on disease-modifying treatment",type:"select",options:["Yes - responding well","Yes - stable","Yes - declining","No - completed","No - declined","No - not candidate"]},{name:"treatment_intent",default:"",description:"Intent of current/recent treatment",type:"select",options:["Curative","Disease-modifying","Palliative/symptom control","None"]},{name:"treatment_response",default:"",description:"Response to treatment",type:"select",options:["Complete response","Partial response","Stable","Progressive","N/A"]},{name:"continue_treatment",default:"",description:"Patient willing to continue treatment",type:"select",options:["Yes - wants all options","Yes - with limits","Uncertain","No - wants comfort focus"]},{name:"pain_level",default:"",description:"Current pain level (0-10)",type:"number"},{name:"other_symptoms",default:"",description:"Other symptom burden",type:"textarea"},{name:"qol_impact",default:"",description:"Quality of life impact",type:"select",options:["Minimal impact","Moderate impact","Significant impact","Severe impact"]},{name:"pps_score",default:"",description:"Palliative Performance Scale %",type:"number"},{name:"performance_status",default:"",description:"ECOG or KPS score",type:"text"},{name:"functional_trajectory",default:"",description:"Functional status trajectory",type:"select",options:["Stable","Slow decline","Moderate decline","Rapid decline"]},{name:"patient_goals",default:"",description:"Patient stated goals",type:"textarea"},{name:"family_understanding",default:"",description:"Family understanding of prognosis",type:"select",options:["Full understanding","Partial understanding","Limited understanding","Denial/unrealistic expectations"]},{name:"code_status",default:"",description:"Current code status",type:"select",options:["Full code","DNR only","DNR/DNI","Comfort measures only","Not discussed"]},{name:"reassess_timeframe",default:"4-6 weeks",description:"Reassessment timeframe",type:"text"}],tags:["palliative","hospice","decision-support","goals-of-care","prognosis"],difficulty:"intermediate",estimatedTime:"10 min",outputFormats:["memo","pdf"],useCases:["Care planning","Consultation request","Goals of care meeting","Discharge planning"],requiredInputs:["patient_name","primary_diagnosis","prognosis_estimate"]},{id:"hospital-to-hospice-discharge",name:"Hospital to Hospice Discharge Planning",description:"Comprehensive discharge planning checklist for hospice transition",category:"Healthcare",categorySlug:"healthcare",icon:"🏠",prompt:`## Hospital to Hospice Discharge Planning

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

Format as comprehensive discharge planning documentation.`,variables:[{name:"patient_name",default:"",description:"Patient name",type:"text"},{name:"patient_age",default:"",description:"Patient age",type:"number"},{name:"mrn",default:"",description:"Medical record number",type:"text"},{name:"primary_diagnosis",default:"",description:"Primary terminal diagnosis",type:"text"},{name:"admitting_diagnosis",default:"",description:"Hospital admitting diagnosis",type:"text"},{name:"discharge_destination",default:"",description:"Discharge destination",type:"select",options:["Home","Family member home","Assisted living","Skilled nursing facility","Hospice inpatient unit","Hospice house"]},{name:"discharge_address",default:"",description:"Discharge address",type:"textarea"},{name:"primary_caregiver",default:"",description:"Primary caregiver name/relationship",type:"text"},{name:"caregiver_phone",default:"",description:"Caregiver phone number",type:"text"},{name:"hospice_agency",default:"",description:"Selected hospice agency",type:"text"},{name:"hospice_phone",default:"",description:"Hospice 24-hour phone",type:"text"},{name:"initial_visit",default:"",description:"Initial hospice visit date/time",type:"text"},{name:"terminal_diagnosis",default:"",description:"Terminal diagnosis for certification",type:"text"},{name:"pps_score",default:"50",description:"Current PPS score %",type:"number"},{name:"pain_level",default:"",description:"Current pain level (0-10)",type:"number"},{name:"symptoms",default:"",description:"Current symptoms requiring management",type:"textarea"},{name:"level_of_care",default:"Routine Home Care",description:"Hospice level of care",type:"select",options:["Routine Home Care","Continuous Home Care","General Inpatient","Respite Care"]},{name:"continue_medications",default:"",description:"Medications to continue",type:"textarea"},{name:"discontinue_medications",default:"",description:"Medications to discontinue",type:"textarea"},{name:"bed_type",default:"",description:"Hospital bed type needed",type:"select",options:["Full electric","Semi-electric","Not needed"]},{name:"mattress_type",default:"",description:"Mattress type",type:"select",options:["Standard","Pressure-reducing","Low air loss","Alternating pressure"]},{name:"o2_needs",default:"",description:"Oxygen requirements",type:"select",options:["None","PRN","Continuous - concentrator","Continuous - portable","High-flow"]},{name:"other_dme",default:"",description:"Other DME needed",type:"text"},{name:"discharge_time",default:"",description:"Planned discharge time",type:"text"},{name:"transportation",default:"",description:"Transportation arrangement",type:"select",options:["Family vehicle","Wheelchair van","Stretcher transport","Ambulance"]},{name:"dme_delivery_time",default:"",description:"DME delivery time",type:"text"}],tags:["hospice","discharge","hospital","transition","care-coordination"],difficulty:"intermediate",estimatedTime:"20 min",outputFormats:["memo","pdf"],useCases:["Hospital discharge planning","Care transitions","Hospice admission coordination"],requiredInputs:["patient_name","primary_diagnosis","hospice_agency"]},{id:"hospice-certification-statement",name:"Medicare Hospice Certification Statement",description:"Generate physician certification statement for Medicare hospice benefit",category:"Healthcare",categorySlug:"healthcare",icon:"📋",prompt:`## Medicare Hospice Physician Certification Statement

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

Format as Medicare certification documentation for medical records.`,variables:[{name:"patient_name",default:"",description:"Patient full name",type:"text"},{name:"dob",default:"",description:"Date of birth",type:"date"},{name:"medicare_id",default:"",description:"Medicare ID number",type:"text"},{name:"physician_name",default:"",description:"Certifying physician name",type:"text"},{name:"physician_npi",default:"",description:"Physician NPI number",type:"text"},{name:"physician_specialty",default:"",description:"Physician specialty",type:"text"},{name:"certification_type",default:"Initial",description:"Type of certification",type:"select",options:["Initial","Recertification - 2nd period","Recertification - 3rd+ period"]},{name:"benefit_period",default:"1st 90-day",description:"Benefit period",type:"select",options:["1st 90-day","2nd 90-day","1st 60-day","Subsequent 60-day"]},{name:"certification_date",default:"",description:"Date of certification",type:"date"},{name:"primary_diagnosis",default:"",description:"Primary terminal diagnosis",type:"text"},{name:"icd10_code",default:"",description:"ICD-10 code",type:"text"},{name:"related_conditions",default:"",description:"Related/contributing conditions",type:"textarea"},{name:"pps_score",default:"",description:"Current PPS score %",type:"number"},{name:"decline_description",default:"",description:"Description of recent decline",type:"textarea"},{name:"supporting_factors",default:"",description:"Supporting clinical factors",type:"textarea"},{name:"adl_status",default:"",description:"ADL dependency status",type:"text"},{name:"face_to_face_required",default:"No",description:"F2F encounter required",type:"select",options:["No","Yes"]},{name:"f2f_date",default:"",description:"F2F encounter date",type:"date"},{name:"f2f_provider",default:"",description:"F2F encounter provider",type:"text"}],tags:["hospice","medicare","certification","physician","documentation"],difficulty:"advanced",estimatedTime:"10 min",outputFormats:["memo","pdf"],useCases:["Hospice admission","Medicare certification","Recertification","Compliance"],requiredInputs:["patient_name","primary_diagnosis","physician_name"]},{id:"pps-assessment-tool",name:"Palliative Performance Scale (PPS) Calculator",description:"Calculate and document PPS score with clinical interpretation",category:"Healthcare",categorySlug:"healthcare",icon:"📊",prompt:`## Palliative Performance Scale (PPS) Assessment

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

Format as clinical assessment documentation.`,variables:[{name:"patient_name",default:"",description:"Patient name",type:"text"},{name:"assessment_date",default:"",description:"Date of assessment",type:"date"},{name:"assessor_name",default:"",description:"Name of assessor",type:"text"},{name:"ambulation",default:"",description:"Ambulation status",type:"select",options:["Full - normal ambulation","Full - with effort","Reduced - cannot walk far","Mainly sit/lie - minimal walking","Mainly in bed - can sit in chair","Totally bed bound"]},{name:"activity_level",default:"",description:"Activity and evidence of disease",type:"select",options:["Normal activity, no disease evidence","Normal activity, some disease evidence","Normal activity with effort, significant disease","Unable to do normal job/work","Unable to do hobby/housework","Unable to do any work, extensive disease","Unable to do most activities","Unable to do any activity"]},{name:"self_care",default:"",description:"Self-care ability",type:"select",options:["Full self-care","Occasional assistance needed","Considerable assistance required","Mainly assistance required","Total care required"]},{name:"intake",default:"",description:"Oral intake",type:"select",options:["Normal intake","Normal or reduced intake","Reduced intake","Minimal to sips only","Mouth care only"]},{name:"conscious_level",default:"",description:"Level of consciousness",type:"select",options:["Full consciousness","Full or confusion","Full or drowsy +/- confusion","Drowsy or coma +/- confusion"]},{name:"previous_pps",default:"",description:"Previous PPS score if available",type:"number"},{name:"previous_date",default:"",description:"Date of previous assessment",type:"date"}],tags:["pps","assessment","prognosis","hospice","functional-status"],difficulty:"beginner",estimatedTime:"5 min",outputFormats:["memo","pdf"],useCases:["Hospice assessment","Prognosis documentation","Care planning","Recertification"],requiredInputs:["patient_name","ambulation","self_care"]},{id:"goals-of-care-conversation",name:"Goals of Care Conversation Guide",description:"Structured guide for conducting goals of care discussions",category:"Healthcare",categorySlug:"healthcare",icon:"💬",prompt:`## Goals of Care Conversation Guide

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

Format as clinical conversation guide with documentation template.`,variables:[{name:"patient_name",default:"",description:"Patient name",type:"text"},{name:"decision_maker",default:"",description:"Healthcare decision maker name",type:"text"},{name:"relationship",default:"",description:"Relationship to patient",type:"select",options:["Self (patient)","Spouse/Partner","Adult Child","Parent","Sibling","Other Family","Healthcare Proxy","Court-appointed Guardian"]},{name:"participants",default:"",description:"Meeting participants",type:"textarea"},{name:"meeting_date",default:"",description:"Date of meeting",type:"date"},{name:"primary_diagnosis",default:"",description:"Primary diagnosis",type:"text"},{name:"prognosis",default:"",description:"Current prognosis estimate",type:"select",options:["Years","Months to a year","Weeks to months","Days to weeks","Hours to days"]},{name:"functional_status",default:"",description:"Current functional status",type:"text"},{name:"current_treatment",default:"",description:"Current treatment approach",type:"text"},{name:"current_understanding",default:"",description:"Patient/family current understanding",type:"textarea"},{name:"cultural_considerations",default:"",description:"Cultural or religious considerations",type:"textarea"},{name:"option1_description",default:"Continue disease-directed treatment",description:"Description of option 1",type:"text"},{name:"option3_description",default:"",description:"Description of middle ground option",type:"text"},{name:"not_do",default:"CPR, intubation, ICU care",description:"What would not be done with comfort focus",type:"text"}],tags:["goals-of-care","communication","palliative","family-meeting","advance-care-planning"],difficulty:"intermediate",estimatedTime:"10 min prep",outputFormats:["memo","pdf"],useCases:["Family meetings","Advance care planning","Hospice discussions","Code status conversations"],requiredInputs:["patient_name","primary_diagnosis"]},{id:"hospice-symptom-management",name:"Hospice Symptom Management Protocol",description:"Evidence-based symptom management protocols for common hospice symptoms",category:"Healthcare",categorySlug:"healthcare",icon:"💊",prompt:`## Hospice Symptom Management Protocol

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

Format as clinical symptom management protocol.`,variables:[{name:"patient_name",default:"",description:"Patient name",type:"text"},{name:"primary_diagnosis",default:"",description:"Primary diagnosis",type:"text"},{name:"pps_score",default:"50",description:"Current PPS score",type:"number"},{name:"allergies",default:"NKDA",description:"Medication allergies",type:"text"},{name:"renal_function",default:"Normal",description:"Renal function status",type:"select",options:["Normal","Mild impairment","Moderate impairment","Severe impairment/ESRD"]},{name:"current_medications",default:"",description:"Current medication list",type:"textarea"},{name:"primary_symptoms",default:"",description:"Primary symptoms to address",type:"select",options:["Pain","Dyspnea","Nausea/Vomiting","Anxiety","Agitation/Delirium","Secretions","Constipation","Multiple symptoms"]},{name:"symptom_severity",default:"",description:"Symptom severity (0-10)",type:"number"},{name:"symptom_duration",default:"",description:"Duration of symptoms",type:"text"},{name:"aggravating_factors",default:"",description:"What makes it worse",type:"text"},{name:"relieving_factors",default:"",description:"What makes it better",type:"text"},{name:"qol_impact",default:"",description:"Impact on quality of life",type:"select",options:["Minimal","Moderate","Significant","Severe"]},{name:"pain_level",default:"",description:"Pain level (0-10)",type:"number"},{name:"pain_type",default:"",description:"Type of pain",type:"select",options:["Nociceptive/somatic","Visceral","Neuropathic","Mixed","Total pain"]},{name:"pain_location",default:"",description:"Pain location",type:"text"},{name:"current_pain_meds",default:"",description:"Current pain medications",type:"textarea"}],tags:["symptoms","pain","hospice","palliative","medications"],difficulty:"advanced",estimatedTime:"10 min",outputFormats:["memo","pdf"],useCases:["Symptom management","Medication adjustment","Comfort kit orders","Crisis management"],requiredInputs:["patient_name","primary_symptoms"]},{id:"dcf-valuation",name:"DCF Valuation Model",description:"Build a discounted cash flow analysis with key assumptions and sensitivity",category:"Financial Analysis",categorySlug:"financial-analysis",icon:"📊",prompt:`Create a comprehensive DCF (Discounted Cash Flow) valuation analysis for {{company_name}}.

**Company Overview:**
- Industry: {{industry}}
- Current Revenue: \${{current_revenue}}M
- Current EBITDA Margin: {{ebitda_margin}}%
- Historical Growth Rate: {{historical_growth}}%

**Key Assumptions:**
- Projection Period: {{projection_years}} years
- Terminal Growth Rate: {{terminal_growth}}%
- WACC Range: {{wacc_low}}% - {{wacc_high}}%
- Tax Rate: {{tax_rate}}%

**Please provide:**
1. **Revenue Projections** - Year-by-year forecast with growth assumptions
2. **EBITDA Bridge** - From current to projected with margin improvement thesis
3. **Free Cash Flow Build** - CapEx, working capital, and D&A assumptions
4. **Terminal Value Calculation** - Using both perpetuity growth and exit multiple methods
5. **Enterprise Value Range** - Based on WACC sensitivity
6. **Equity Value Bridge** - Net debt adjustments
7. **Implied Multiples** - EV/Revenue, EV/EBITDA at various price points
8. **Key Sensitivities** - WACC vs. terminal growth matrix

Format the output as Excel-ready tables where applicable.`,variables:[{name:"company_name",default:"",description:"Target company name",type:"text"},{name:"industry",default:"Technology",description:"Industry sector",type:"select",options:["Technology","Healthcare","Financial Services","Consumer","Industrial","Energy","Real Estate","Telecom"]},{name:"current_revenue",default:"100",description:"Current annual revenue in millions",type:"currency"},{name:"ebitda_margin",default:"20",description:"Current EBITDA margin",type:"percentage"},{name:"historical_growth",default:"15",description:"Historical revenue growth rate",type:"percentage"},{name:"projection_years",default:"5",description:"Number of projection years",type:"number"},{name:"terminal_growth",default:"2.5",description:"Terminal/perpetuity growth rate",type:"percentage"},{name:"wacc_low",default:"8",description:"Low end of WACC range",type:"percentage"},{name:"wacc_high",default:"12",description:"High end of WACC range",type:"percentage"},{name:"tax_rate",default:"25",description:"Effective tax rate",type:"percentage"}],tags:["valuation","dcf","modeling","investment-banking"],difficulty:"advanced",estimatedTime:"30 min",outputFormats:["excel","memo"],useCases:["M&A due diligence","Investment committee memo","Fairness opinion support"],requiredInputs:["company_name","current_revenue"]},{id:"comparable-companies",name:"Comparable Companies Analysis",description:"Trading comps analysis with peer selection and multiple calculations",category:"Financial Analysis",categorySlug:"financial-analysis",icon:"📈",prompt:`Develop a comprehensive comparable companies analysis for {{company_name}} in the {{industry}} sector.

**Target Company Metrics:**
- LTM Revenue: \${{ltm_revenue}}M
- LTM EBITDA: \${{ltm_ebitda}}M
- Revenue Growth (YoY): {{revenue_growth}}%
- EBITDA Margin: {{ebitda_margin}}%

**Analysis Requirements:**

1. **Peer Universe Selection**
   - Identify 8-12 comparable public companies
   - Selection criteria: business model, size, geography, growth profile
   - Justify inclusions and notable exclusions

2. **Trading Multiples Calculation**
   - EV/Revenue (LTM and NTM)
   - EV/EBITDA (LTM and NTM)
   - P/E ratio (if profitable)
   - EV/EBIT for margin-adjusted comparison

3. **Statistical Analysis**
   - Mean, median, 25th/75th percentile for each multiple
   - High/low outlier identification
   - Size and growth-adjusted ranges

4. **Valuation Output**
   - Implied equity value range using selected multiples
   - Football field visualization data
   - Recommended valuation range with justification

5. **Key Observations**
   - Premium/discount drivers vs. peers
   - Market sentiment and recent trading dynamics
   - Relative valuation positioning

Format all data as sortable tables ready for Excel export.`,variables:[{name:"company_name",default:"",description:"Target company name",type:"text"},{name:"industry",default:"Software",description:"Industry for peer selection",type:"select",options:["Software","Internet","Fintech","Healthcare IT","E-commerce","Cybersecurity","Cloud Infrastructure","Enterprise Software"]},{name:"ltm_revenue",default:"50",description:"Last twelve months revenue ($M)",type:"currency"},{name:"ltm_ebitda",default:"10",description:"Last twelve months EBITDA ($M)",type:"currency"},{name:"revenue_growth",default:"25",description:"Year-over-year revenue growth",type:"percentage"},{name:"ebitda_margin",default:"20",description:"EBITDA margin",type:"percentage"}],tags:["comps","valuation","trading-multiples","equity-research"],difficulty:"intermediate",estimatedTime:"20 min",outputFormats:["excel","powerpoint"],useCases:["Equity research","Valuation benchmarking","IPO pricing"]},{id:"earnings-analysis",name:"Quarterly Earnings Analysis",description:"Deep dive on earnings results with beat/miss analysis and guidance review",category:"Financial Analysis",categorySlug:"financial-analysis",icon:"💹",prompt:`Analyze the quarterly earnings results for {{company_name}} ({{ticker}}) for {{quarter}}.

**Reported Results:**
- Revenue: \${{reported_revenue}}M (Consensus: \${{consensus_revenue}}M)
- EPS: \${{reported_eps}} (Consensus: \${{consensus_eps}})
- Gross Margin: {{gross_margin}}%
- Operating Margin: {{operating_margin}}%

**Provide comprehensive analysis:**

1. **Beat/Miss Summary**
   - Revenue surprise (% and $)
   - EPS surprise (% and $)
   - Quality of beat (one-time items, accounting changes)

2. **Segment Performance**
   - Revenue by business segment
   - Geographic breakdown
   - Key product/service line trends

3. **Margin Analysis**
   - Gross margin trend vs. prior quarter and YoY
   - Operating leverage analysis
   - Cost structure changes (COGS, SG&A, R&D)

4. **Guidance Assessment**
   - Full-year guidance changes
   - Implied Q+1 expectations
   - Management credibility on prior guidance

5. **Management Commentary Highlights**
   - Key themes from earnings call
   - Forward outlook and tone
   - Risk factors mentioned

6. **Investment Implications**
   - Near-term trading thesis
   - Impact on full-year estimates
   - Key metrics to monitor

Format key metrics as bullet points suitable for client communication.`,variables:[{name:"company_name",default:"",description:"Company name",type:"text"},{name:"ticker",default:"",description:"Stock ticker symbol",type:"text"},{name:"quarter",default:"Q4 2024",description:"Fiscal quarter",type:"text"},{name:"reported_revenue",default:"",description:"Reported revenue ($M)",type:"currency"},{name:"consensus_revenue",default:"",description:"Consensus revenue estimate ($M)",type:"currency"},{name:"reported_eps",default:"",description:"Reported earnings per share",type:"number"},{name:"consensus_eps",default:"",description:"Consensus EPS estimate",type:"number"},{name:"gross_margin",default:"",description:"Gross margin %",type:"percentage"},{name:"operating_margin",default:"",description:"Operating margin %",type:"percentage"}],tags:["earnings","equity-research","trading","analysis"],difficulty:"intermediate",estimatedTime:"15 min",outputFormats:["memo","pdf"],useCases:["Morning note","Client alert","Portfolio review"]},{id:"sensitivity-analysis",name:"Sensitivity Analysis Builder",description:"Create multi-variable sensitivity tables for financial models",category:"Financial Analysis",categorySlug:"financial-analysis",icon:"🎯",prompt:`Build a comprehensive sensitivity analysis for {{analysis_type}} valuation of {{company_name}}.

**Base Case Assumptions:**
- Base Value: \${{base_value}}M
- Primary Variable: {{primary_variable}} (Base: {{primary_base}}%)
- Secondary Variable: {{secondary_variable}} (Base: {{secondary_base}}%)

**Create the following sensitivity outputs:**

1. **Two-Variable Sensitivity Matrix**
   - {{primary_variable}} range: {{primary_low}}% to {{primary_high}}% ({{primary_steps}} steps)
   - {{secondary_variable}} range: {{secondary_low}}% to {{secondary_high}}% ({{secondary_steps}} steps)
   - Show implied value at each intersection

2. **One-Variable Sensitivity Tables**
   - Individual impact of each variable
   - Breakeven analysis points
   - Value creation/destruction ranges

3. **Scenario Analysis**
   - Bull case: Optimistic assumptions
   - Base case: Current assumptions
   - Bear case: Pessimistic assumptions
   - Include probability-weighted expected value

4. **Key Insights**
   - Most sensitive assumptions
   - Value inflection points
   - Risk-adjusted recommendations

5. **Visual Data for Charts**
   - Tornado chart data (sensitivity ranking)
   - Spider/radar chart inputs
   - Waterfall bridge data

Format all tables for direct Excel paste with conditional formatting guidance.`,variables:[{name:"company_name",default:"",description:"Company or project name",type:"text"},{name:"analysis_type",default:"DCF",description:"Type of valuation",type:"select",options:["DCF","LBO","Comps","Sum-of-Parts","Real Option"]},{name:"base_value",default:"500",description:"Base case value ($M)",type:"currency"},{name:"primary_variable",default:"WACC",description:"Primary sensitivity variable",type:"text"},{name:"primary_base",default:"10",description:"Primary variable base case",type:"percentage"},{name:"primary_low",default:"8",description:"Primary variable low",type:"percentage"},{name:"primary_high",default:"12",description:"Primary variable high",type:"percentage"},{name:"primary_steps",default:"5",description:"Number of steps",type:"number"},{name:"secondary_variable",default:"Terminal Growth",description:"Secondary sensitivity variable",type:"text"},{name:"secondary_base",default:"2.5",description:"Secondary variable base case",type:"percentage"},{name:"secondary_low",default:"1.5",description:"Secondary variable low",type:"percentage"},{name:"secondary_high",default:"3.5",description:"Secondary variable high",type:"percentage"},{name:"secondary_steps",default:"5",description:"Number of steps",type:"number"}],tags:["sensitivity","modeling","scenario-analysis","risk"],difficulty:"intermediate",estimatedTime:"15 min",outputFormats:["excel","powerpoint"],useCases:["Board presentation","Investment committee","Risk assessment"]},{id:"due-diligence",name:"Due Diligence Framework",description:"Comprehensive DD checklist and analysis framework for M&A or investments",category:"Investment Research",categorySlug:"investment-research",icon:"🔍",prompt:`Create a comprehensive due diligence framework for {{company_name}} in the context of a {{transaction_type}}.

**Deal Context:**
- Transaction Type: {{transaction_type}}
- Target Sector: {{sector}}
- Deal Size: \${{deal_size}}M
- Investment Thesis: {{investment_thesis}}

**Develop DD framework covering:**

1. **Business Due Diligence**
   - Market position and competitive dynamics
   - Customer concentration and churn analysis
   - Revenue quality (recurring vs. one-time)
   - Go-to-market efficiency
   - Technology/IP assessment
   - Management team evaluation

2. **Financial Due Diligence**
   - Quality of earnings analysis
   - Working capital normalization
   - CapEx requirements (maintenance vs. growth)
   - Off-balance sheet items
   - Tax structure review
   - Accounting policy assessment

3. **Commercial Due Diligence**
   - Market size validation (TAM/SAM/SOM)
   - Competitive positioning
   - Customer reference calls framework
   - Pricing power analysis
   - Channel assessment

4. **Operational Due Diligence**
   - Operational efficiency metrics
   - Scalability assessment
   - Integration complexity
   - Synergy identification
   - Key person dependencies

5. **Legal & Compliance**
   - Material contracts review
   - Litigation and contingencies
   - Regulatory compliance
   - IP ownership verification
   - ESG considerations

6. **Red Flags Checklist**
   - Common deal-breakers by category
   - Risk mitigation strategies

Provide prioritized action items with responsible parties and timelines.`,variables:[{name:"company_name",default:"",description:"Target company name",type:"text"},{name:"transaction_type",default:"Acquisition",description:"Type of transaction",type:"select",options:["Acquisition","Minority Investment","Growth Equity","LBO","Merger","Carve-out"]},{name:"sector",default:"Technology",description:"Target sector",type:"text"},{name:"deal_size",default:"100",description:"Transaction size ($M)",type:"currency"},{name:"investment_thesis",default:"",description:"Brief investment thesis",type:"textarea"}],tags:["due-diligence","m&a","investment","private-equity"],difficulty:"advanced",estimatedTime:"30 min",outputFormats:["memo","excel"],useCases:["M&A process","PE investment","Strategic acquisition"]},{id:"tam-sam-som",name:"TAM/SAM/SOM Analysis",description:"Market sizing framework with top-down and bottom-up approaches",category:"Investment Research",categorySlug:"investment-research",icon:"🌍",prompt:`Develop a comprehensive market sizing analysis for {{company_name}} operating in the {{market_segment}} market.

**Company Context:**
- Current Revenue: \${{current_revenue}}M
- Primary Geography: {{geography}}
- Business Model: {{business_model}}
- Key Products/Services: {{products}}

**Provide market sizing using both methodologies:**

1. **Top-Down Analysis**
   - **TAM (Total Addressable Market)**
     - Global market definition
     - Industry research sources and data
     - Growth drivers and trends
     - 5-year CAGR projection

   - **SAM (Serviceable Addressable Market)**
     - Geographic filtering
     - Segment-specific sizing
     - Channel accessibility

   - **SOM (Serviceable Obtainable Market)**
     - Realistic market share targets
     - Competitive intensity factor
     - Go-to-market capacity constraints

2. **Bottom-Up Analysis**
   - Customer universe quantification
   - Average contract value assumptions
   - Penetration rate modeling
   - Customer acquisition capacity

3. **Market Dynamics**
   - Key growth drivers
   - Market headwinds
   - Regulatory impacts
   - Technology disruption factors

4. **Competitive Landscape**
   - Major players and market share
   - Emerging competitors
   - Substitution threats

5. **Opportunity Assessment**
   - Revenue potential by segment
   - Prioritized market opportunities
   - Entry barriers and moats

Include data tables with sources and assumptions clearly documented.`,variables:[{name:"company_name",default:"",description:"Company name",type:"text"},{name:"market_segment",default:"",description:"Primary market segment",type:"text"},{name:"current_revenue",default:"10",description:"Current annual revenue ($M)",type:"currency"},{name:"geography",default:"North America",description:"Primary geography",type:"select",options:["North America","Europe","APAC","Global","Latin America","Middle East"]},{name:"business_model",default:"SaaS",description:"Business model type",type:"select",options:["SaaS","Marketplace","E-commerce","Hardware","Services","Hybrid"]},{name:"products",default:"",description:"Key products or services",type:"textarea"}],tags:["market-sizing","tam","research","strategy"],difficulty:"intermediate",estimatedTime:"20 min",outputFormats:["powerpoint","memo"],useCases:["Investor pitch","Strategic planning","New market entry"]},{id:"competitive-intelligence",name:"Competitive Intelligence Report",description:"Deep competitive analysis with positioning and strategic implications",category:"Investment Research",categorySlug:"investment-research",icon:"🎭",prompt:`Create a comprehensive competitive intelligence report for {{company_name}} in the {{industry}} space.

**Analysis Scope:**
- Primary Competitors: {{competitors}}
- Geographic Focus: {{geography}}
- Time Horizon: {{time_horizon}}

**Competitive Analysis Framework:**

1. **Competitor Profiles** (for each major competitor)
   - Company overview and strategy
   - Product/service portfolio
   - Pricing and positioning
   - Recent strategic moves
   - Strengths and weaknesses
   - Estimated financials (revenue, growth, margins)

2. **Comparative Analysis**
   - Feature/capability matrix
   - Pricing comparison table
   - Market share estimates
   - Customer segment overlap
   - Geographic presence

3. **Strategic Positioning Map**
   - 2x2 positioning framework
   - Differentiation factors
   - White space opportunities

4. **Competitive Dynamics**
   - Recent M&A activity
   - Partnership ecosystems
   - Technology investments
   - Talent movements
   - Funding and financial position

5. **Threat Assessment**
   - Direct competitive threats
   - Emerging/disruptive threats
   - Substitution risks
   - New entrant barriers

6. **Strategic Implications**
   - Competitive response recommendations
   - Differentiation opportunities
   - Defensive positioning needs
   - Monitoring triggers and KPIs

Format as executive summary with detailed appendix data.`,variables:[{name:"company_name",default:"",description:"Your company name",type:"text"},{name:"industry",default:"",description:"Industry or market",type:"text"},{name:"competitors",default:"",description:"Key competitors (comma-separated)",type:"textarea"},{name:"geography",default:"Global",description:"Geographic scope",type:"text"},{name:"time_horizon",default:"3 years",description:"Analysis time horizon",type:"select",options:["1 year","3 years","5 years"]}],tags:["competitive-analysis","strategy","market-research","intelligence"],difficulty:"intermediate",estimatedTime:"25 min",outputFormats:["powerpoint","memo"],useCases:["Strategic planning","Board presentation","Investment thesis"]},{id:"sector-deep-dive",name:"Sector Deep-Dive",description:"Comprehensive industry analysis with trends, drivers, and outlook",category:"Investment Research",categorySlug:"investment-research",icon:"🏭",prompt:`Develop a comprehensive sector deep-dive analysis for the {{sector}} industry.

**Analysis Parameters:**
- Sector: {{sector}}
- Sub-segment Focus: {{subsegment}}
- Geographic Scope: {{geography}}
- Investment Horizon: {{investment_horizon}}

**Sector Analysis Framework:**

1. **Industry Overview**
   - Market size and growth trajectory
   - Industry structure and value chain
   - Key players and market shares
   - Business model evolution

2. **Growth Drivers**
   - Macro tailwinds
   - Technology enablers
   - Regulatory catalysts
   - Consumer/enterprise demand shifts

3. **Industry Challenges**
   - Structural headwinds
   - Margin pressure sources
   - Regulatory risks
   - Disruption threats

4. **Competitive Landscape**
   - Industry concentration trends
   - Consolidation activity
   - New entrant dynamics
   - International competition

5. **Investment Themes**
   - High-conviction themes
   - Emerging opportunities
   - Risk factors to monitor
   - Catalyst timeline

6. **Valuation Context**
   - Historical trading ranges
   - Current sector multiples
   - Relative value assessment
   - M&A activity and premiums

7. **Top Picks Framework**
   - Selection criteria
   - Sector positioning considerations
   - Risk/reward profiles

Provide specific data points and sources where possible.`,variables:[{name:"sector",default:"",description:"Industry sector",type:"select",options:["Software","Fintech","Healthcare","Consumer","Industrials","Energy","Real Estate","Financial Services","Media & Entertainment","Telecommunications"]},{name:"subsegment",default:"",description:"Specific sub-segment focus",type:"text"},{name:"geography",default:"Global",description:"Geographic focus",type:"text"},{name:"investment_horizon",default:"12-24 months",description:"Investment time horizon",type:"select",options:["6 months","12-24 months","3-5 years","10+ years"]}],tags:["sector-analysis","industry-research","thematic","investing"],difficulty:"advanced",estimatedTime:"30 min",outputFormats:["powerpoint","pdf","memo"],useCases:["Sector initiation","Thematic research","Portfolio allocation"]},{id:"swot-analysis",name:"SWOT Analysis",description:"Strategic SWOT framework with actionable insights",category:"Strategy & Planning",categorySlug:"strategy-planning",icon:"⚡",prompt:`Create a comprehensive SWOT analysis for {{company_name}} to inform {{strategic_context}}.

**Company Context:**
- Industry: {{industry}}
- Company Stage: {{company_stage}}
- Current Strategy: {{current_strategy}}

**SWOT Analysis:**

1. **Strengths** (Internal Positive)
   - Core competencies
   - Competitive advantages
   - Resource strengths
   - Brand/reputation assets
   - Financial position
   - Talent/team capabilities

   *For each: Rate importance (High/Medium/Low) and sustainability*

2. **Weaknesses** (Internal Negative)
   - Capability gaps
   - Resource constraints
   - Operational inefficiencies
   - Competitive disadvantages
   - Financial limitations

   *For each: Rate severity and addressability*

3. **Opportunities** (External Positive)
   - Market trends
   - Technology enablers
   - Regulatory tailwinds
   - Competitive openings
   - Partnership potential
   - M&A opportunities

   *For each: Rate attractiveness and fit*

4. **Threats** (External Negative)
   - Competitive threats
   - Market shifts
   - Technology disruption
   - Regulatory risks
   - Economic factors
   - Talent competition

   *For each: Rate probability and impact*

5. **Strategic Implications Matrix**
   - SO Strategies (Strengths + Opportunities)
   - WO Strategies (Weaknesses + Opportunities)
   - ST Strategies (Strengths + Threats)
   - WT Strategies (Weaknesses + Threats)

6. **Priority Actions**
   - Immediate priorities (0-6 months)
   - Medium-term initiatives (6-18 months)
   - Long-term strategic moves (18+ months)

Format for board/leadership presentation with executive summary.`,variables:[{name:"company_name",default:"",description:"Company name",type:"text"},{name:"industry",default:"",description:"Industry/sector",type:"text"},{name:"company_stage",default:"Growth",description:"Company stage",type:"select",options:["Startup","Growth","Mature","Turnaround"]},{name:"strategic_context",default:"annual strategic planning",description:"Purpose of analysis",type:"text"},{name:"current_strategy",default:"",description:"Brief current strategy description",type:"textarea"}],tags:["swot","strategy","planning","analysis"],difficulty:"beginner",estimatedTime:"15 min",outputFormats:["powerpoint","memo"],useCases:["Strategic planning","Board presentation","Investor materials"]},{id:"business-plan",name:"Business Plan Builder",description:"Structured business plan with financials and go-to-market strategy",category:"Strategy & Planning",categorySlug:"strategy-planning",icon:"📋",prompt:`Create a comprehensive business plan outline for {{company_name}} focused on {{business_focus}}.

**Business Overview:**
- Company Name: {{company_name}}
- Business Focus: {{business_focus}}
- Target Market: {{target_market}}
- Business Model: {{business_model}}
- Funding Goal: \${{funding_goal}}M

**Business Plan Structure:**

1. **Executive Summary**
   - Mission and vision statement
   - Value proposition
   - Key differentiators
   - Funding ask and use of proceeds
   - Key metrics/traction

2. **Problem & Solution**
   - Market problem definition
   - Current alternatives
   - Our solution
   - Why now?

3. **Market Opportunity**
   - TAM/SAM/SOM analysis
   - Target customer profile
   - Market trends and tailwinds

4. **Product/Service**
   - Product description
   - Key features and benefits
   - Technology/IP
   - Product roadmap

5. **Business Model**
   - Revenue model
   - Pricing strategy
   - Unit economics
   - Customer lifetime value

6. **Go-to-Market Strategy**
   - Sales strategy
   - Marketing channels
   - Partnerships
   - Customer acquisition cost targets

7. **Competitive Landscape**
   - Direct competitors
   - Indirect competitors
   - Competitive advantages
   - Barriers to entry

8. **Team**
   - Founders and leadership
   - Key hires needed
   - Advisory board
   - Organizational structure

9. **Financial Projections**
   - 3-5 year revenue forecast
   - Key assumptions
   - Path to profitability
   - Key metrics dashboard

10. **Funding & Milestones**
    - Current raise details
    - Use of proceeds
    - Key milestones
    - Future funding needs

Provide as structured outline with bullet points and placeholder data formats.`,variables:[{name:"company_name",default:"",description:"Company name",type:"text"},{name:"business_focus",default:"",description:"Primary business focus",type:"text"},{name:"target_market",default:"",description:"Target market/customer",type:"text"},{name:"business_model",default:"SaaS",description:"Business model",type:"select",options:["SaaS","Marketplace","E-commerce","Hardware","Services","Freemium","Enterprise"]},{name:"funding_goal",default:"5",description:"Funding target ($M)",type:"currency"}],tags:["business-plan","strategy","fundraising","startup"],difficulty:"intermediate",estimatedTime:"30 min",outputFormats:["memo","powerpoint","pdf"],useCases:["Fundraising","Board planning","Strategic alignment"]},{id:"okr-framework",name:"OKR Framework",description:"Objectives and Key Results planning with cascading goals",category:"Strategy & Planning",categorySlug:"strategy-planning",icon:"🎯",prompt:`Develop a comprehensive OKR framework for {{company_name}} for {{time_period}}.

**Company Context:**
- Company/Team: {{company_name}}
- Time Period: {{time_period}}
- Primary Focus Area: {{focus_area}}
- Top Priority: {{top_priority}}

**OKR Framework:**

1. **Company-Level OKRs** (3-5 Objectives)
   For each objective:
   - Objective statement (qualitative, inspiring)
   - 3-5 Key Results (quantitative, measurable)
   - Owner
   - Confidence level (0-10)

2. **Department/Team OKRs**
   Cascaded from company objectives:
   - **Sales/Revenue**
   - **Product/Engineering**
   - **Marketing**
   - **Operations**
   - **Finance**
   - **People/HR**

3. **Key Results Best Practices**
   - Specific metrics with targets
   - Baseline and target values
   - Measurement methodology
   - Stretch vs. committed designation

4. **OKR Scoring Rubric**
   - 0.0-0.3: We failed to make real progress
   - 0.4-0.6: We made progress but fell short
   - 0.7-0.9: We delivered (target zone)
   - 1.0: We hit every target perfectly

5. **Alignment Matrix**
   - How team OKRs ladder to company OKRs
   - Cross-functional dependencies
   - Potential conflicts to resolve

6. **Cadence & Review**
   - Weekly check-in format
   - Monthly review process
   - Quarterly grading approach
   - Annual planning integration

7. **Success Metrics Dashboard**
   - Real-time tracking indicators
   - Leading vs. lagging metrics
   - Alert thresholds

Provide in a format ready for OKR tracking tools or spreadsheets.`,variables:[{name:"company_name",default:"",description:"Company or team name",type:"text"},{name:"time_period",default:"Q1 2025",description:"Planning period",type:"text"},{name:"focus_area",default:"Growth",description:"Primary focus area",type:"select",options:["Growth","Profitability","Product","Market Expansion","Operational Excellence","Customer Success"]},{name:"top_priority",default:"",description:"Single most important priority",type:"text"}],tags:["okr","planning","goals","strategy"],difficulty:"beginner",estimatedTime:"20 min",outputFormats:["excel","memo"],useCases:["Quarterly planning","Annual planning","Team alignment"]},{id:"scenario-planning",name:"Scenario Planning",description:"Strategic scenario analysis with contingency planning",category:"Strategy & Planning",categorySlug:"strategy-planning",icon:"🔮",prompt:`Develop a comprehensive scenario planning framework for {{company_name}} addressing {{key_uncertainty}}.

**Planning Context:**
- Company: {{company_name}}
- Key Uncertainty: {{key_uncertainty}}
- Planning Horizon: {{planning_horizon}}
- Current Strategy: {{current_strategy}}

**Scenario Planning Framework:**

1. **Key Drivers Identification**
   - Critical uncertainties (high impact, high uncertainty)
   - Important trends (high impact, more predictable)
   - Driving forces analysis

2. **Scenario Matrix Development**
   - Driver 1: {{driver_1}} (Axis A)
   - Driver 2: {{driver_2}} (Axis B)

   **Four Scenarios:**
   - Scenario A: [High Driver 1 + High Driver 2]
   - Scenario B: [High Driver 1 + Low Driver 2]
   - Scenario C: [Low Driver 1 + High Driver 2]
   - Scenario D: [Low Driver 1 + Low Driver 2]

3. **Scenario Narratives**
   For each scenario:
   - Descriptive name/title
   - Narrative description (2-3 paragraphs)
   - Key characteristics
   - Market implications
   - Competitive dynamics
   - Financial impact range
   - Probability assessment

4. **Strategic Implications**
   For each scenario:
   - Required capabilities
   - Investment priorities
   - Risk mitigation needs
   - Opportunity capture strategies

5. **Robust Strategies**
   - Strategies that work across all scenarios
   - Scenario-specific options
   - Trigger points for strategy shifts

6. **Early Warning Indicators**
   - Leading indicators for each scenario
   - Monitoring framework
   - Decision trigger points

7. **Action Plan**
   - No-regret moves
   - Options to preserve
   - Big bets with timing

Present as strategic workshop output with visual framework.`,variables:[{name:"company_name",default:"",description:"Company name",type:"text"},{name:"key_uncertainty",default:"",description:"Primary uncertainty to address",type:"text"},{name:"planning_horizon",default:"5 years",description:"Planning time horizon",type:"select",options:["2 years","5 years","10 years"]},{name:"current_strategy",default:"",description:"Brief current strategy",type:"textarea"},{name:"driver_1",default:"Market Growth",description:"First key driver/uncertainty",type:"text"},{name:"driver_2",default:"Technology Disruption",description:"Second key driver/uncertainty",type:"text"}],tags:["scenario-planning","strategy","risk","planning"],difficulty:"advanced",estimatedTime:"30 min",outputFormats:["powerpoint","memo"],useCases:["Strategic planning","Board workshop","Risk management"]},{id:"investment-memo",name:"Investment Memo",description:"Comprehensive IC memo with deal rationale and risk assessment",category:"M&A & Deal Work",categorySlug:"ma-deal-work",icon:"📝",prompt:`Create a comprehensive investment memo for {{company_name}} for Investment Committee review.

**Deal Overview:**
- Target: {{company_name}}
- Transaction Type: {{transaction_type}}
- Enterprise Value: \${{enterprise_value}}M
- Equity Investment: \${{equity_investment}}M
- Ownership: {{ownership}}%

**Investment Memo Structure:**

1. **Executive Summary**
   - Deal recommendation
   - Key investment highlights (3-5 bullets)
   - Critical risks (2-3 bullets)
   - Key terms overview
   - Return expectations

2. **Company Overview**
   - Business description
   - Products/services
   - Customer base
   - Geographic presence
   - Historical financials summary

3. **Investment Thesis**
   - Why this company?
   - Why now?
   - Why us?
   - Value creation levers
   - Strategic fit

4. **Market Opportunity**
   - Industry overview
   - Market size and growth
   - Competitive landscape
   - Target's market position

5. **Financial Analysis**
   - Historical performance
   - Projection summary
   - Key assumptions
   - Valuation analysis
   - Returns analysis (IRR/MOIC)

6. **Value Creation Plan**
   - Revenue growth initiatives
   - Margin improvement opportunities
   - Operational enhancements
   - Potential add-on acquisitions
   - Exit considerations

7. **Risk Assessment**
   - Key risks and mitigants
   - Downside scenarios
   - Deal-specific concerns
   - Due diligence findings

8. **Transaction Terms**
   - Valuation and structure
   - Key deal terms
   - Governance rights
   - Management arrangements

9. **Recommendation**
   - Clear recommendation
   - Key conditions
   - Next steps

Format as formal IC memo with appendix for detailed analysis.`,variables:[{name:"company_name",default:"",description:"Target company name",type:"text"},{name:"transaction_type",default:"Buyout",description:"Transaction type",type:"select",options:["Buyout","Growth Equity","Minority Investment","Add-on Acquisition","Recapitalization"]},{name:"enterprise_value",default:"",description:"Enterprise value ($M)",type:"currency"},{name:"equity_investment",default:"",description:"Equity check size ($M)",type:"currency"},{name:"ownership",default:"",description:"Target ownership percentage",type:"percentage"}],tags:["investment-memo","private-equity","m&a","ic-memo"],difficulty:"advanced",estimatedTime:"30 min",outputFormats:["memo","pdf"],useCases:["IC presentation","Deal approval","Partner review"]},{id:"term-sheet",name:"Term Sheet Builder",description:"Key deal terms framework for M&A or investment transactions",category:"M&A & Deal Work",categorySlug:"ma-deal-work",icon:"📄",prompt:`Create a comprehensive term sheet framework for {{transaction_type}} involving {{company_name}}.

**Transaction Overview:**
- Target Company: {{company_name}}
- Transaction Type: {{transaction_type}}
- Deal Size: \${{deal_size}}M
- Investor/Acquirer: {{investor}}

**Term Sheet Framework:**

1. **Transaction Structure**
   - Form of consideration (cash, stock, mixed)
   - Valuation basis (pre/post-money, enterprise value)
   - Payment structure (upfront, earnout, rollover)
   - Escrow/holdback provisions

2. **Economics**
   - Purchase price / investment amount
   - Valuation multiples implied
   - Cap table impact (if equity)
   - Debt assumptions / financing structure

3. **Governance & Control**
   - Board composition
   - Voting rights
   - Protective provisions
   - Information rights
   - Consent rights for major decisions

4. **Management & Employees**
   - Management rollover expectations
   - Employment agreements
   - Option pool / equity incentives
   - Non-compete/non-solicit terms
   - Retention arrangements

5. **Conditions & Process**
   - Due diligence period and scope
   - Exclusivity provisions
   - Regulatory approvals required
   - Third-party consents needed
   - Key conditions to closing

6. **Representations & Warranties**
   - Standard reps scope
   - Fundamental reps
   - Knowledge qualifiers
   - Sandbagging provisions

7. **Indemnification**
   - Survival periods
   - Cap and basket thresholds
   - Escrow/R&W insurance
   - Special indemnities

8. **Other Terms**
   - Confidentiality
   - Expense allocation
   - Governing law
   - Break-up fees (if applicable)

9. **Indicative Timeline**
   - Key milestones and dates
   - Expected closing date

Present as bullet points suitable for term sheet document draft.`,variables:[{name:"company_name",default:"",description:"Target company name",type:"text"},{name:"transaction_type",default:"Acquisition",description:"Type of transaction",type:"select",options:["Acquisition","Merger","Series A/B/C Investment","Growth Equity","Buyout","Recapitalization"]},{name:"deal_size",default:"",description:"Transaction size ($M)",type:"currency"},{name:"investor",default:"",description:"Investor/Acquirer name",type:"text"}],tags:["term-sheet","m&a","venture-capital","deal-terms"],difficulty:"advanced",estimatedTime:"20 min",outputFormats:["memo","pdf"],useCases:["Deal negotiation","LOI preparation","Term sheet drafting"]},{id:"pitch-deck",name:"Pitch Deck Outline",description:"Investor-ready pitch deck structure with slide-by-slide guidance",category:"M&A & Deal Work",categorySlug:"ma-deal-work",icon:"🎬",prompt:`Create a comprehensive pitch deck outline for {{company_name}} for {{pitch_context}}.

**Company Overview:**
- Company: {{company_name}}
- Stage: {{company_stage}}
- Pitch Context: {{pitch_context}}
- Raise Amount: \${{raise_amount}}M
- Use of Funds: {{use_of_funds}}

**Pitch Deck Structure (15-20 slides):**

**Opening (Slides 1-3)**
1. **Title Slide**
   - Company name and logo
   - Tagline/one-liner
   - Presenter name and date

2. **The Hook**
   - Compelling statistic or insight
   - Why this matters now
   - Attention-grabbing visual

3. **Problem Statement**
   - Clear problem definition
   - Who experiences this problem
   - Current solutions and gaps
   - Cost of the problem

**Solution (Slides 4-7)**
4. **Solution Overview**
   - What we do (simple explanation)
   - How it works
   - Key differentiators
   - Demo screenshot/visual

5. **Product Deep-Dive**
   - Key features
   - Technology/IP
   - Product roadmap
   - Screenshots or demo flow

6. **Business Model**
   - How we make money
   - Pricing structure
   - Unit economics
   - Revenue model clarity

7. **Traction**
   - Key metrics and growth
   - Customer logos/testimonials
   - Revenue/usage charts
   - Milestone achievements

**Market (Slides 8-10)**
8. **Market Opportunity**
   - TAM/SAM/SOM
   - Market growth trends
   - Why now? (timing thesis)

9. **Competitive Landscape**
   - Competitive positioning
   - Key differentiators
   - Sustainable advantages
   - 2x2 positioning matrix

10. **Go-to-Market**
    - Customer acquisition strategy
    - Sales motion
    - Channel strategy
    - Partnership opportunities

**Team & Financials (Slides 11-14)**
11. **Team**
    - Founders and key hires
    - Relevant experience
    - Advisors (if notable)
    - Org growth plan

12. **Financials**
    - Historical performance
    - Projections (3-5 years)
    - Key assumptions
    - Path to profitability

13. **The Ask**
    - Raise amount
    - Use of proceeds
    - Key milestones this round will achieve
    - Expected runway

14. **Why Now / Why Us**
    - Investment thesis summary
    - Why this is the right time
    - Why this team will win

**Closing (Slide 15)**
15. **Contact & Appendix**
    - Contact information
    - Appendix reference (detailed financials, customer case studies, etc.)

Provide bullet point content suggestions and design notes for each slide.`,variables:[{name:"company_name",default:"",description:"Company name",type:"text"},{name:"company_stage",default:"Series A",description:"Company stage",type:"select",options:["Pre-seed","Seed","Series A","Series B","Series C+","Growth","Pre-IPO"]},{name:"pitch_context",default:"Series A fundraise",description:"Purpose of pitch",type:"text"},{name:"raise_amount",default:"10",description:"Target raise amount ($M)",type:"currency"},{name:"use_of_funds",default:"",description:"Primary use of funds",type:"textarea"}],tags:["pitch-deck","fundraising","investor","presentation"],difficulty:"intermediate",estimatedTime:"25 min",outputFormats:["powerpoint","pdf"],useCases:["VC fundraising","LP meetings","Strategic investor pitch"]},{id:"investor-update",name:"Investor Update",description:"Monthly/quarterly investor update with KPIs and narrative",category:"Professional Reporting",categorySlug:"professional-reporting",icon:"📨",prompt:`Create a comprehensive investor update for {{company_name}} for {{period}}.

**Reporting Period:**
- Company: {{company_name}}
- Period: {{period}}
- Update Frequency: {{frequency}}

**Investor Update Structure:**

1. **TL;DR Summary**
   - 3-5 bullet point highlights
   - Overall sentiment (green/yellow/red)
   - Key ask (if any)

2. **Key Metrics Dashboard**
   - **Revenue**: \${{revenue}}K ({{revenue_growth}}% MoM/QoQ)
   - **MRR/ARR**: \${{mrr}}K
   - **Cash Position**: \${{cash}}K
   - **Runway**: {{runway}} months
   - **Customers**: {{customers}} ({{customer_growth}}% growth)
   - **NRR**: {{nrr}}%

3. **What Went Well**
   - Major wins
   - Key milestones achieved
   - Team highlights
   - Customer/product wins

4. **Challenges & Learnings**
   - What didn't go as planned
   - Key learnings
   - How we're addressing challenges

5. **Product Update**
   - Key releases
   - Roadmap progress
   - Customer feedback themes

6. **Go-to-Market Update**
   - Pipeline status
   - Sales highlights
   - Marketing performance
   - Partnership updates

7. **Team Update**
   - Key hires
   - Org changes
   - Hiring priorities

8. **Financial Summary**
   - P&L snapshot
   - Burn rate
   - Variance to plan
   - Fundraising status (if applicable)

9. **Asks for Investors**
   - Specific help needed
   - Introductions requested
   - Expertise needed

10. **Looking Ahead**
    - Next period priorities
    - Key milestones to hit
    - Risks to monitor

Format as email-friendly update with clear sections and bullet points.`,variables:[{name:"company_name",default:"",description:"Company name",type:"text"},{name:"period",default:"January 2025",description:"Reporting period",type:"text"},{name:"frequency",default:"Monthly",description:"Update frequency",type:"select",options:["Monthly","Quarterly"]},{name:"revenue",default:"",description:"Period revenue ($K)",type:"currency"},{name:"revenue_growth",default:"",description:"Revenue growth %",type:"percentage"},{name:"mrr",default:"",description:"Monthly recurring revenue ($K)",type:"currency"},{name:"cash",default:"",description:"Cash position ($K)",type:"currency"},{name:"runway",default:"",description:"Runway in months",type:"number"},{name:"customers",default:"",description:"Total customers",type:"number"},{name:"customer_growth",default:"",description:"Customer growth %",type:"percentage"},{name:"nrr",default:"",description:"Net revenue retention %",type:"percentage"}],tags:["investor-update","reporting","communication","kpis"],difficulty:"beginner",estimatedTime:"15 min",outputFormats:["memo","pdf"],useCases:["Investor communication","Board prep","Stakeholder updates"]},{id:"board-deck",name:"Board Deck",description:"Quarterly board presentation with strategic updates and financials",category:"Professional Reporting",categorySlug:"professional-reporting",icon:"👔",prompt:`Create a comprehensive board deck outline for {{company_name}} for {{quarter}} {{year}}.

**Board Meeting Context:**
- Company: {{company_name}}
- Period: {{quarter}} {{year}}
- Meeting Duration: {{meeting_duration}}
- Key Topic Focus: {{key_topic}}

**Board Deck Structure:**

**Pre-Read Section (Distribute in Advance)**
1. **Executive Summary (1 slide)**
   - Period performance summary
   - Key achievements
   - Critical decisions needed
   - Outlook summary

2. **Scorecard Dashboard (1-2 slides)**
   - KPI performance vs. targets
   - Traffic light status indicators
   - Trend arrows
   - YoY/QoQ comparisons

3. **Financial Performance (3-4 slides)**
   - P&L summary vs. budget and prior year
   - Revenue breakdown by segment/product
   - Expense analysis
   - Cash flow and runway
   - Balance sheet highlights

**Discussion Section**
4. **Strategic Update (2-3 slides)**
   - Progress on strategic priorities
   - OKR status
   - Key initiatives update
   - Competitive developments

5. **Product & Technology (2 slides)**
   - Product roadmap progress
   - Key releases and impact
   - Technology investments
   - Technical debt/security

6. **Go-to-Market (2 slides)**
   - Sales performance and pipeline
   - Marketing effectiveness
   - Customer success metrics
   - Partnership update

7. **People & Organization (1-2 slides)**
   - Headcount and hiring
   - Org changes
   - Culture/engagement metrics
   - Key talent updates

8. **Risk Management (1 slide)**
   - Top risks and mitigations
   - Risk heat map
   - New/emerging risks

**Decision Section**
9. **Decisions Required (1 slide)**
   - Specific approvals needed
   - Strategic decisions
   - Budget requests

10. **Deep Dive Topic: {{key_topic}} (3-5 slides)**
    - Context and background
    - Analysis and options
    - Recommendation
    - Discussion questions

**Appendix**
- Detailed financials
- Customer data
- Competitive analysis
- Supporting materials

Provide slide titles, key talking points, and suggested visualizations.`,variables:[{name:"company_name",default:"",description:"Company name",type:"text"},{name:"quarter",default:"Q4",description:"Quarter",type:"select",options:["Q1","Q2","Q3","Q4"]},{name:"year",default:"2024",description:"Year",type:"text"},{name:"meeting_duration",default:"2 hours",description:"Meeting length",type:"select",options:["1 hour","2 hours","3 hours","Half day"]},{name:"key_topic",default:"",description:"Key deep-dive topic for this meeting",type:"text"}],tags:["board-deck","governance","presentation","reporting"],difficulty:"intermediate",estimatedTime:"30 min",outputFormats:["powerpoint","pdf"],useCases:["Board meeting","Investor update","Annual review"]},{id:"executive-summary",name:"Executive Summary",description:"Concise executive summary for reports, proposals, or analyses",category:"Professional Reporting",categorySlug:"professional-reporting",icon:"📑",prompt:`Create a compelling executive summary for {{document_type}} regarding {{subject}}.

**Document Context:**
- Document Type: {{document_type}}
- Subject: {{subject}}
- Audience: {{audience}}
- Primary Objective: {{objective}}
- Key Recommendation: {{recommendation}}

**Executive Summary Structure:**

1. **Opening Statement** (1-2 sentences)
   - Context and purpose
   - Why this matters now

2. **Situation Overview** (3-4 sentences)
   - Current state
   - Key background
   - Triggering event or catalyst

3. **Key Findings** (4-5 bullet points)
   - Most important insights
   - Critical data points
   - Supporting evidence
   - Prioritized by importance

4. **Implications** (2-3 bullet points)
   - What this means for the organization
   - Risks of inaction
   - Opportunity cost considerations

5. **Recommendation** (Clear statement)
   - Specific recommendation
   - Key rationale
   - Expected outcome

6. **Next Steps** (3-4 action items)
   - Immediate actions
   - Decision points needed
   - Timeline and owners

7. **Key Metrics/Data** (If applicable)
   - Supporting quantitative highlights
   - Comparison points
   - Target metrics

**Formatting Guidelines:**
- Total length: {{length}}
- Tone: {{tone}}
- Use bullet points for clarity
- Bold key figures and recommendations
- Include single supporting visual if helpful

Write in active voice with clear, concise language appropriate for {{audience}}.`,variables:[{name:"document_type",default:"Strategic Analysis",description:"Type of document",type:"select",options:["Strategic Analysis","Investment Recommendation","Market Research","Business Case","Project Proposal","Risk Assessment","Due Diligence Report"]},{name:"subject",default:"",description:"Subject matter",type:"text"},{name:"audience",default:"Executive Leadership",description:"Target audience",type:"select",options:["Executive Leadership","Board of Directors","Investment Committee","External Stakeholders","Cross-functional Team"]},{name:"objective",default:"",description:"Primary objective",type:"text"},{name:"recommendation",default:"",description:"Key recommendation (brief)",type:"text"},{name:"length",default:"1 page",description:"Target length",type:"select",options:["Half page","1 page","2 pages"]},{name:"tone",default:"Professional",description:"Writing tone",type:"select",options:["Professional","Formal","Persuasive","Neutral/Analytical"]}],tags:["executive-summary","communication","writing","professional"],difficulty:"beginner",estimatedTime:"10 min",outputFormats:["memo","pdf"],useCases:["Report writing","Proposal submission","Decision support"]},...[{id:"sh-revenue-projection",name:"Revenue Projection Builder",description:"Build comprehensive revenue projections with payor mix analysis, rate escalations, and census scenarios for SNF/ALF/ILF facilities",category:"Senior Housing - Revenue",categorySlug:"senior-housing",facilityTypes:["snf","alf","ilf","ccrc"],icon:"dollar",prompt:`You are a senior housing financial analyst specializing in {{facilityType}} revenue modeling.

## FACILITY PROFILE
- Facility Type: {{facilityType}}
- Licensed Beds/Units: {{totalBeds}}
- Current Census: {{currentCensus}}
- Target Occupancy: {{targetOccupancy}}%
- Location: {{location}}

## PAYOR MIX ANALYSIS
{{#if isSNF}}
### Skilled Nursing Payor Sources
- Medicare Part A: {{medicarePercent}}% of census @ \${{medicarePPD}}/day
- Medicare Advantage: {{maPercent}}% @ \${{maPPD}}/day
- Medicaid: {{medicaidPercent}}% @ \${{medicaidPPD}}/day
- Private Pay/Insurance: {{privatePercent}}% @ \${{privatePPD}}/day
- VA/Other Government: {{vaPercent}}% @ \${{vaPPD}}/day
{{/if}}

{{#if isALF}}
### Assisted Living Revenue Sources
- Base Monthly Rate: \${{baseMonthlyRate}}
- Level of Care Tiers:
  - Level 1 (Minimal): {{level1Percent}}% @ +\${{level1Premium}}/month
  - Level 2 (Moderate): {{level2Percent}}% @ +\${{level2Premium}}/month
  - Level 3 (Extensive): {{level3Percent}}% @ +\${{level3Premium}}/month
- Community Fee: \${{communityFee}}
- Second Person Fee: \${{secondPersonFee}}/month
{{/if}}

{{#if isILF}}
### Independent Living Revenue
- Base Monthly Rent: \${{baseRent}}
- Unit Type Mix:
  - Studio: {{studioPercent}}% @ \${{studioRent}}/month
  - 1BR: {{oneBRPercent}}% @ \${{oneBRRent}}/month
  - 2BR: {{twoBRPercent}}% @ \${{twoBRRent}}/month
- Meal Plan: \${{mealPlanFee}}/month ({{mealPlanParticipation}}% participation)
- Community Fee: \${{communityFee}}
{{/if}}

## PROJECTION PARAMETERS
- Projection Period: {{projectionYears}} years
- Annual Rate Increase: {{rateEscalation}}%
- Census Growth Rate: {{censusGrowthRate}}%/year to stabilization
- Stabilization Period: {{stabilizationMonths}} months

## ANALYSIS REQUIREMENTS

1. **Monthly Revenue Schedule**
   - Calculate monthly revenue by payor source
   - Apply census ramp-up assumptions
   - Include rate escalation timing

2. **Annual Revenue Summary**
   - Gross potential revenue
   - Vacancy/collection loss
   - Net revenue by category

3. **Per-Unit/Per-Bed Economics**
   - Revenue per occupied bed/unit (RevPOB)
   - Average daily rate (ADR)
   - Revenue per available bed (RevPAB)

4. **Sensitivity Analysis**
   - Best case (+{{sensitivityRange}}% occupancy)
   - Base case
   - Worst case (-{{sensitivityRange}}% occupancy)

5. **Payor Mix Optimization**
   - Current vs optimal payor mix
   - Revenue impact of mix shifts
   - Recommendations for payor improvement

## OUTPUT FORMAT
{{outputFormat}}

## ADDITIONAL CONTEXT
{{additionalContext}}`,variables:[{name:"facilityType",default:"Skilled Nursing Facility (SNF)",description:"Type of senior housing facility",type:"select",options:["Skilled Nursing Facility (SNF)","Assisted Living Facility (ALF)","Independent Living Facility (ILF)","Continuing Care Retirement Community (CCRC)"]},{name:"totalBeds",default:"120",description:"Total licensed beds or units",type:"number"},{name:"currentCensus",default:"102",description:"Current occupied beds/units",type:"number"},{name:"targetOccupancy",default:"92",description:"Target occupancy percentage",type:"percentage"},{name:"location",default:"Dallas, TX",description:"Facility location for market context"},{name:"medicarePercent",default:"15",description:"Medicare Part A census percentage",type:"percentage"},{name:"medicarePPD",default:"650",description:"Medicare per patient day rate",type:"currency"},{name:"maPercent",default:"10",description:"Medicare Advantage census percentage",type:"percentage"},{name:"maPPD",default:"425",description:"Medicare Advantage per patient day rate",type:"currency"},{name:"medicaidPercent",default:"55",description:"Medicaid census percentage",type:"percentage"},{name:"medicaidPPD",default:"225",description:"Medicaid per patient day rate",type:"currency"},{name:"privatePercent",default:"18",description:"Private pay census percentage",type:"percentage"},{name:"privatePPD",default:"350",description:"Private pay per patient day rate",type:"currency"},{name:"vaPercent",default:"2",description:"VA/other government census percentage",type:"percentage"},{name:"vaPPD",default:"400",description:"VA per patient day rate",type:"currency"},{name:"projectionYears",default:"5",description:"Number of years to project",type:"number"},{name:"rateEscalation",default:"3",description:"Annual rate increase percentage",type:"percentage"},{name:"censusGrowthRate",default:"2",description:"Monthly census growth to stabilization",type:"percentage"},{name:"stabilizationMonths",default:"18",description:"Months to reach stabilized occupancy",type:"number"},{name:"sensitivityRange",default:"5",description:"Sensitivity analysis range (+/-)",type:"percentage"},{name:"outputFormat",default:"Excel model with monthly detail, summary dashboard, and sensitivity tables",description:"Desired output format",type:"select",options:["Excel model with monthly detail, summary dashboard, and sensitivity tables","PowerPoint presentation with key metrics","PDF memo with supporting schedules","All formats"]},{name:"additionalContext",default:"",description:"Any additional context or requirements",type:"textarea"}],tags:["revenue","projection","payor-mix","snf","alf","ilf","census","pro-forma"],difficulty:"intermediate",estimatedTime:"15-20 min",outputFormats:["excel","powerpoint","pdf"],useCases:["Acquisition underwriting","Annual budgeting","Lender presentations","Board reporting"]},{id:"sh-expense-analyzer",name:"Operating Expense Analyzer",description:"Deep dive analysis of operating expenses with benchmarking, cost per patient day calculations, and efficiency recommendations",category:"Senior Housing - Expenses",categorySlug:"senior-housing",facilityTypes:["snf","alf","ilf","ccrc"],icon:"calculator",prompt:`You are a senior housing operations analyst specializing in expense optimization for {{facilityType}} facilities.

## FACILITY OVERVIEW
- Facility Type: {{facilityType}}
- Beds/Units: {{totalBeds}}
- Average Daily Census: {{adc}}
- FTEs: {{totalFTEs}}
- Annual Revenue: \${{annualRevenue}}

## EXPENSE CATEGORIES TO ANALYZE

### 1. LABOR COSTS (typically 55-65% of revenue)
**Nursing Department**
- RN: {{rnFTEs}} FTEs @ \${{rnHourlyRate}}/hr
- LPN/LVN: {{lpnFTEs}} FTEs @ \${{lpnHourlyRate}}/hr
- CNA/GNA: {{cnaFTEs}} FTEs @ \${{cnaHourlyRate}}/hr
- Agency/Contract: \${{agencyCost}}/month

**Other Departments**
- Dietary: {{dietaryFTEs}} FTEs @ \${{dietaryHourlyRate}}/hr
- Housekeeping: {{housekeepingFTEs}} FTEs @ \${{housekeepingHourlyRate}}/hr
- Maintenance: {{maintenanceFTEs}} FTEs @ \${{maintenanceHourlyRate}}/hr
- Activities: {{activitiesFTEs}} FTEs @ \${{activitiesHourlyRate}}/hr
- Administration: {{adminFTEs}} FTEs @ \${{adminSalary}}/year

**Benefits & Payroll Taxes**
- Benefits Rate: {{benefitsRate}}% of wages
- Payroll Taxes: {{payrollTaxRate}}%

### 2. NON-LABOR OPERATING COSTS
- Raw Food: \${{rawFoodCost}}/patient day
- Medical Supplies: \${{medSuppliesCost}}/patient day
- Utilities: \${{utilitiesCost}}/month
- Insurance (Property/Liability): \${{insuranceCost}}/year
- Professional Services: \${{professionalServicesCost}}/month
- Marketing: \${{marketingCost}}/month

### 3. FACILITY COSTS
- Rent/Lease: \${{rentCost}}/month (if applicable)
- Property Taxes: \${{propertyTaxes}}/year
- Capital Lease Payments: \${{capitalLeases}}/month

### 4. MANAGEMENT & OVERHEAD
- Management Fee: {{managementFeePercent}}% of revenue
- Corporate Allocation: \${{corporateAllocation}}/month

## BENCHMARKING PARAMETERS
- Market: {{marketArea}}
- Comparable Set: {{compSetDescription}}
- Industry Benchmarks Source: {{benchmarkSource}}

## ANALYSIS REQUIREMENTS

1. **Cost Per Patient Day (CPPD) Analysis**
   - Calculate CPPD by expense category
   - Compare to industry benchmarks
   - Identify variances from market norms

2. **Nursing Hours Per Patient Day (HPPD)**
   - Current HPPD by staff type
   - State minimum requirements
   - Quality correlation analysis

3. **Department-Level Analysis**
   - Each department as % of revenue
   - FTE ratios (beds per FTE)
   - Efficiency metrics

4. **Expense Trending**
   - Year-over-year growth rates
   - Seasonal patterns
   - Inflation-adjusted analysis

5. **Optimization Opportunities**
   - Identify top 5 savings opportunities
   - Quantify potential impact
   - Implementation recommendations

6. **Staffing Optimization Model**
   - Optimal staffing grid by census
   - Agency reduction strategies
   - Overtime analysis

## OUTPUT FORMAT
{{outputFormat}}

## ADDITIONAL CONTEXT
{{additionalContext}}`,variables:[{name:"facilityType",default:"Skilled Nursing Facility (SNF)",description:"Facility type",type:"select",options:["Skilled Nursing Facility (SNF)","Assisted Living Facility (ALF)","Independent Living Facility (ILF)","CCRC"]},{name:"totalBeds",default:"120",description:"Total beds/units",type:"number"},{name:"adc",default:"108",description:"Average daily census",type:"number"},{name:"totalFTEs",default:"145",description:"Total full-time equivalents",type:"number"},{name:"annualRevenue",default:"12000000",description:"Annual gross revenue",type:"currency"},{name:"rnFTEs",default:"12",description:"RN FTEs",type:"number"},{name:"rnHourlyRate",default:"38",description:"RN hourly rate",type:"currency"},{name:"lpnFTEs",default:"18",description:"LPN/LVN FTEs",type:"number"},{name:"lpnHourlyRate",default:"26",description:"LPN hourly rate",type:"currency"},{name:"cnaFTEs",default:"55",description:"CNA/GNA FTEs",type:"number"},{name:"cnaHourlyRate",default:"16",description:"CNA hourly rate",type:"currency"},{name:"agencyCost",default:"25000",description:"Monthly agency/contract nursing cost",type:"currency"},{name:"dietaryFTEs",default:"12",description:"Dietary FTEs",type:"number"},{name:"dietaryHourlyRate",default:"14",description:"Dietary hourly rate",type:"currency"},{name:"housekeepingFTEs",default:"8",description:"Housekeeping FTEs",type:"number"},{name:"housekeepingHourlyRate",default:"13",description:"Housekeeping hourly rate",type:"currency"},{name:"maintenanceFTEs",default:"3",description:"Maintenance FTEs",type:"number"},{name:"maintenanceHourlyRate",default:"18",description:"Maintenance hourly rate",type:"currency"},{name:"activitiesFTEs",default:"4",description:"Activities FTEs",type:"number"},{name:"activitiesHourlyRate",default:"16",description:"Activities hourly rate",type:"currency"},{name:"adminFTEs",default:"6",description:"Administration FTEs",type:"number"},{name:"adminSalary",default:"55000",description:"Average admin salary",type:"currency"},{name:"benefitsRate",default:"28",description:"Benefits as % of wages",type:"percentage"},{name:"payrollTaxRate",default:"8",description:"Payroll tax rate",type:"percentage"},{name:"rawFoodCost",default:"8.50",description:"Raw food cost per patient day",type:"currency"},{name:"medSuppliesCost",default:"12",description:"Medical supplies per patient day",type:"currency"},{name:"utilitiesCost",default:"18000",description:"Monthly utilities",type:"currency"},{name:"insuranceCost",default:"180000",description:"Annual insurance",type:"currency"},{name:"professionalServicesCost",default:"8000",description:"Monthly professional services",type:"currency"},{name:"marketingCost",default:"5000",description:"Monthly marketing",type:"currency"},{name:"rentCost",default:"0",description:"Monthly rent if applicable",type:"currency"},{name:"propertyTaxes",default:"95000",description:"Annual property taxes",type:"currency"},{name:"capitalLeases",default:"0",description:"Monthly capital lease payments",type:"currency"},{name:"managementFeePercent",default:"5",description:"Management fee as % of revenue",type:"percentage"},{name:"corporateAllocation",default:"12000",description:"Monthly corporate allocation",type:"currency"},{name:"marketArea",default:"Dallas-Fort Worth MSA",description:"Geographic market for benchmarking"},{name:"compSetDescription",default:"Similar-sized SNFs within 15-mile radius",description:"Comparable facility description"},{name:"benchmarkSource",default:"NIC MAP, CMS Cost Reports, State Medicaid data",description:"Benchmark data sources"},{name:"outputFormat",default:"Excel workbook with department tabs and dashboard",description:"Output format",type:"select",options:["Excel workbook with department tabs and dashboard","PowerPoint executive summary","PDF detailed report","All formats"]},{name:"additionalContext",default:"",description:"Additional context",type:"textarea"}],tags:["expenses","operating-costs","benchmarking","labor","cppd","efficiency"],difficulty:"advanced",estimatedTime:"20-30 min",outputFormats:["excel","powerpoint","pdf"],useCases:["Operational due diligence","Budget planning","Performance improvement","M&A analysis"]},{id:"sh-census-modeler",name:"Census & Occupancy Modeler",description:"Build detailed census projections with admission sources, length of stay analysis, and seasonal adjustments",category:"Senior Housing - Census",categorySlug:"senior-housing",facilityTypes:["snf","alf","ilf","ccrc"],icon:"users",prompt:`You are a senior housing census analyst specializing in occupancy modeling for {{facilityType}} facilities.

## FACILITY PROFILE
- Facility Type: {{facilityType}}
- Licensed Capacity: {{licensedBeds}} beds/units
- Current Census: {{currentCensus}}
- Current Occupancy: {{currentOccupancy}}%

## ADMISSION SOURCES ANALYSIS
{{#if isSNF}}
### SNF Admission Sources
- Hospital Discharges: {{hospitalPercent}}% (avg LOS: {{hospitalLOS}} days)
- Other SNFs: {{transferPercent}}%
- Community Admissions: {{communityPercent}}%
- Readmissions: {{readmitPercent}}%

### Referral Relationships
- Primary Hospital Partners: {{primaryHospitals}}
- Average Monthly Referrals: {{monthlyReferrals}}
- Conversion Rate: {{conversionRate}}%
{{/if}}

{{#if isALF}}
### ALF Move-In Sources
- Independent Living: {{fromILPercent}}%
- Home/Community: {{fromHomePercent}}%
- Rehab/SNF Step-down: {{fromSNFPercent}}%
- Other ALF: {{fromOtherALFPercent}}%

### Move-Out Destinations
- Higher Acuity (SNF/Memory Care): {{toHigherCare}}%
- Hospital: {{toHospital}}%
- Passed Away: {{passedAway}}%
- Family/Home: {{toHome}}%
{{/if}}

## LENGTH OF STAY PARAMETERS
- Average LOS: {{avgLOS}} {{losUnit}}
- Median LOS: {{medianLOS}} {{losUnit}}
- LOS Distribution:
  - Short-term ({{shortTermDef}}): {{shortTermPercent}}%
  - Medium-term ({{medTermDef}}): {{medTermPercent}}%
  - Long-term ({{longTermDef}}): {{longTermPercent}}%

## SEASONAL PATTERNS
- Q1 Adjustment: {{q1Adjustment}}%
- Q2 Adjustment: {{q2Adjustment}}%
- Q3 Adjustment: {{q3Adjustment}}%
- Q4 Adjustment: {{q4Adjustment}}%
- Monthly Discharge Peaks: {{dischargePeaks}}

## MARKET FACTORS
- Market Occupancy Rate: {{marketOccupancy}}%
- New Supply Coming: {{newSupply}} beds in next {{supplyTimeframe}}
- Competitive Facilities: {{competitorCount}}
- Market Growth Rate: {{marketGrowthRate}}%

## PROJECTION REQUIREMENTS

1. **Monthly Census Forecast**
   - 24-month rolling projection
   - Admission/discharge flow model
   - Census by payor source

2. **Occupancy Scenarios**
   - Optimistic: +{{optimisticAdjust}}% above baseline
   - Base case: Current trajectory
   - Conservative: -{{conservativeAdjust}}% below baseline

3. **Admission Funnel Analysis**
   - Inquiries → Tours → Move-ins
   - Conversion metrics by source
   - Lead time analysis

4. **Discharge/Turnover Analysis**
   - Predictive discharge modeling
   - Turnover rate by unit type
   - Vacancy days analysis

5. **Stabilization Modeling**
   - Time to stabilized occupancy
   - Required admission velocity
   - Marketing investment needed

## OUTPUT FORMAT
{{outputFormat}}

## ADDITIONAL CONTEXT
{{additionalContext}}`,variables:[{name:"facilityType",default:"Skilled Nursing Facility (SNF)",description:"Facility type",type:"select",options:["Skilled Nursing Facility (SNF)","Assisted Living Facility (ALF)","Independent Living Facility (ILF)","CCRC"]},{name:"licensedBeds",default:"120",description:"Licensed bed/unit capacity",type:"number"},{name:"currentCensus",default:"102",description:"Current census",type:"number"},{name:"currentOccupancy",default:"85",description:"Current occupancy rate",type:"percentage"},{name:"hospitalPercent",default:"65",description:"Admissions from hospitals",type:"percentage"},{name:"hospitalLOS",default:"22",description:"Average LOS for hospital transfers",type:"number"},{name:"transferPercent",default:"10",description:"Transfers from other SNFs",type:"percentage"},{name:"communityPercent",default:"20",description:"Community admissions",type:"percentage"},{name:"readmitPercent",default:"5",description:"Readmission rate",type:"percentage"},{name:"primaryHospitals",default:"Medical City Dallas, Baylor Scott & White",description:"Primary referral hospitals"},{name:"monthlyReferrals",default:"45",description:"Average monthly referrals",type:"number"},{name:"conversionRate",default:"35",description:"Referral to admission rate",type:"percentage"},{name:"avgLOS",default:"28",description:"Average length of stay",type:"number"},{name:"medianLOS",default:"21",description:"Median length of stay",type:"number"},{name:"losUnit",default:"days",description:"LOS unit",type:"select",options:["days","months","years"]},{name:"shortTermDef",default:"<20 days",description:"Short-term LOS definition"},{name:"shortTermPercent",default:"40",description:"Short-term percentage",type:"percentage"},{name:"medTermDef",default:"20-90 days",description:"Medium-term LOS definition"},{name:"medTermPercent",default:"35",description:"Medium-term percentage",type:"percentage"},{name:"longTermDef",default:">90 days",description:"Long-term LOS definition"},{name:"longTermPercent",default:"25",description:"Long-term percentage",type:"percentage"},{name:"q1Adjustment",default:"+3",description:"Q1 seasonal adjustment",type:"text"},{name:"q2Adjustment",default:"-2",description:"Q2 seasonal adjustment",type:"text"},{name:"q3Adjustment",default:"-5",description:"Q3 seasonal adjustment",type:"text"},{name:"q4Adjustment",default:"+4",description:"Q4 seasonal adjustment",type:"text"},{name:"dischargePeaks",default:"End of month, Fridays",description:"Peak discharge periods"},{name:"marketOccupancy",default:"82",description:"Market average occupancy",type:"percentage"},{name:"newSupply",default:"180",description:"New beds coming to market",type:"number"},{name:"supplyTimeframe",default:"24 months",description:"Timeframe for new supply"},{name:"competitorCount",default:"8",description:"Number of competing facilities",type:"number"},{name:"marketGrowthRate",default:"2.5",description:"Annual market demand growth",type:"percentage"},{name:"optimisticAdjust",default:"5",description:"Optimistic scenario adjustment",type:"percentage"},{name:"conservativeAdjust",default:"10",description:"Conservative scenario adjustment",type:"percentage"},{name:"outputFormat",default:"Excel model with monthly projections and charts",description:"Output format",type:"select",options:["Excel model with monthly projections and charts","PowerPoint with visual scenarios","PDF census report","All formats"]},{name:"additionalContext",default:"",description:"Additional context",type:"textarea"}],tags:["census","occupancy","admissions","length-of-stay","forecasting","seasonality"],difficulty:"intermediate",estimatedTime:"15-20 min",outputFormats:["excel","powerpoint","pdf"],useCases:["Operational planning","Marketing strategy","Staffing projections","Investment underwriting"]},{id:"sh-valuation",name:"Senior Housing Valuation Calculator",description:"Comprehensive valuation analysis using income approach, sales comparables, and replacement cost methods",category:"Senior Housing - Valuation",categorySlug:"senior-housing",facilityTypes:["snf","alf","ilf","ccrc"],icon:"trending-up",prompt:`You are a senior housing valuation expert specializing in {{facilityType}} asset valuation.

## SUBJECT PROPERTY
- Facility Type: {{facilityType}}
- Address: {{address}}
- Year Built/Renovated: {{yearBuilt}} / {{yearRenovated}}
- Total Beds/Units: {{totalUnits}}
- Building SF: {{buildingSF}} SF
- Land Acres: {{landAcres}}
- Licensure Status: {{licensureStatus}}

## OPERATING PERFORMANCE
- Trailing 12-Month Revenue: \${{t12Revenue}}
- T12 Operating Expenses: \${{t12Expenses}}
- T12 NOI: \${{t12NOI}}
- T12 EBITDAR: \${{t12EBITDAR}}
- Current Occupancy: {{currentOccupancy}}%
- Stabilized Occupancy: {{stabilizedOccupancy}}%

## VALUATION APPROACH #1: INCOME CAPITALIZATION

### NOI Analysis
- In-Place NOI: \${{inPlaceNOI}}
- Stabilized NOI: \${{stabilizedNOI}}
- NOI Margin: {{noiMargin}}%

### Cap Rate Analysis
- Comparable Cap Rates: {{compCapRates}}
- Risk Adjustments:
  - Location: {{locationAdjust}}
  - Age/Condition: {{ageAdjust}}
  - Operator Quality: {{operatorAdjust}}
  - Census Stability: {{censusAdjust}}
- Selected Cap Rate: {{selectedCapRate}}%

### EBITDAR Analysis
- T12 EBITDAR: \${{t12EBITDAR}}
- EBITDAR Margin: {{ebitdarMargin}}%
- EBITDAR Multiple Range: {{ebitdarMultipleRange}}x

## VALUATION APPROACH #2: SALES COMPARABLES

### Comparable Sales
{{compSalesData}}

### Pricing Metrics
- Price Per Bed/Unit: \${{pricePerBed}}
- Price Per SF: \${{pricePerSF}}
- Cap Rate at Sale: {{saleCapRate}}%

## VALUATION APPROACH #3: REPLACEMENT COST

### Land Value
- Land Size: {{landAcres}} acres
- Land Value/Acre: \${{landValuePerAcre}}
- Total Land Value: \${{totalLandValue}}

### Improvement Costs
- Building SF: {{buildingSF}}
- Cost Per SF: \${{costPerSF}}
- FF&E Allowance: \${{ffeAllowance}}
- Soft Costs: {{softCostPercent}}%
- Developer Profit: {{devProfitPercent}}%

### Depreciation
- Effective Age: {{effectiveAge}} years
- Economic Life: {{economicLife}} years
- Depreciation Rate: {{depreciationRate}}%

## ANALYSIS REQUIREMENTS

1. **Income Approach Valuation**
   - Direct capitalization (in-place NOI)
   - Stabilized value analysis
   - Sensitivity to cap rate changes

2. **Sales Comparison Approach**
   - Adjust comparables for differences
   - Per-bed/unit value indication
   - Market trend analysis

3. **Cost Approach**
   - Land + Depreciated Improvements
   - Entrepreneurial incentive
   - Economic obsolescence

4. **Reconciliation**
   - Weight approaches by reliability
   - Final value conclusion
   - Value per bed/unit summary

5. **Sensitivity Analysis**
   - Cap rate: {{capRateRange}}
   - Occupancy: {{occupancyRange}}
   - NOI margin: {{noiRange}}

## OUTPUT FORMAT
{{outputFormat}}

## ADDITIONAL CONTEXT
{{additionalContext}}`,variables:[{name:"facilityType",default:"Skilled Nursing Facility (SNF)",description:"Facility type",type:"select",options:["Skilled Nursing Facility (SNF)","Assisted Living Facility (ALF)","Independent Living Facility (ILF)","CCRC"]},{name:"address",default:"1234 Healthcare Blvd, Dallas, TX 75201",description:"Property address"},{name:"yearBuilt",default:"1998",description:"Year built"},{name:"yearRenovated",default:"2019",description:"Year renovated"},{name:"totalUnits",default:"120",description:"Total beds/units",type:"number"},{name:"buildingSF",default:"65000",description:"Building square footage",type:"number"},{name:"landAcres",default:"4.5",description:"Land acres",type:"number"},{name:"licensureStatus",default:"Active, no deficiencies",description:"Licensure status"},{name:"t12Revenue",default:"12500000",description:"Trailing 12-month revenue",type:"currency"},{name:"t12Expenses",default:"10200000",description:"T12 operating expenses",type:"currency"},{name:"t12NOI",default:"2300000",description:"T12 Net Operating Income",type:"currency"},{name:"t12EBITDAR",default:"2800000",description:"T12 EBITDAR",type:"currency"},{name:"currentOccupancy",default:"88",description:"Current occupancy",type:"percentage"},{name:"stabilizedOccupancy",default:"93",description:"Stabilized occupancy",type:"percentage"},{name:"inPlaceNOI",default:"2300000",description:"In-place NOI",type:"currency"},{name:"stabilizedNOI",default:"2650000",description:"Stabilized NOI",type:"currency"},{name:"noiMargin",default:"18.4",description:"NOI margin percentage",type:"percentage"},{name:"compCapRates",default:"9.5%-11.5% for similar SNFs in market",description:"Comparable cap rate range"},{name:"locationAdjust",default:"+25 bps (suburban)",description:"Location cap rate adjustment"},{name:"ageAdjust",default:"-25 bps (recently renovated)",description:"Age/condition adjustment"},{name:"operatorAdjust",default:"0 bps (regional operator)",description:"Operator quality adjustment"},{name:"censusAdjust",default:"+15 bps (below stabilized)",description:"Census stability adjustment"},{name:"selectedCapRate",default:"10.5",description:"Selected cap rate",type:"percentage"},{name:"ebitdarMargin",default:"22.4",description:"EBITDAR margin",type:"percentage"},{name:"ebitdarMultipleRange",default:"6.5-8.5",description:"EBITDAR multiple range"},{name:"compSalesData",default:"Sale 1: 100-bed SNF, Dallas, $18M (Dec 2024), 10.2% cap\\nSale 2: 140-bed SNF, Fort Worth, $28M (Oct 2024), 9.8% cap\\nSale 3: 90-bed SNF, Plano, $14.5M (Aug 2024), 11.1% cap",description:"Comparable sales data",type:"textarea"},{name:"pricePerBed",default:"175000",description:"Market price per bed",type:"currency"},{name:"pricePerSF",default:"280",description:"Market price per SF",type:"currency"},{name:"saleCapRate",default:"10.2",description:"Average sale cap rate",type:"percentage"},{name:"landValuePerAcre",default:"450000",description:"Land value per acre",type:"currency"},{name:"totalLandValue",default:"2025000",description:"Total land value",type:"currency"},{name:"costPerSF",default:"325",description:"Replacement cost per SF",type:"currency"},{name:"ffeAllowance",default:"1500000",description:"FF&E allowance",type:"currency"},{name:"softCostPercent",default:"15",description:"Soft costs percentage",type:"percentage"},{name:"devProfitPercent",default:"10",description:"Developer profit percentage",type:"percentage"},{name:"effectiveAge",default:"10",description:"Effective age in years",type:"number"},{name:"economicLife",default:"40",description:"Economic life in years",type:"number"},{name:"depreciationRate",default:"25",description:"Physical depreciation rate",type:"percentage"},{name:"capRateRange",default:"9.5%-11.5%",description:"Cap rate sensitivity range"},{name:"occupancyRange",default:"85%-95%",description:"Occupancy sensitivity range"},{name:"noiRange",default:"16%-22%",description:"NOI margin sensitivity range"},{name:"outputFormat",default:"Excel valuation model with all three approaches",description:"Output format",type:"select",options:["Excel valuation model with all three approaches","PowerPoint investment summary","PDF appraisal-style memo","All formats"]},{name:"additionalContext",default:"",description:"Additional context",type:"textarea"}],tags:["valuation","cap-rate","noi","ebitdar","appraisal","acquisition","investment"],difficulty:"advanced",estimatedTime:"25-35 min",outputFormats:["excel","powerpoint","pdf","memo"],useCases:["Acquisition analysis","Portfolio valuation","Refinancing","Asset disposition"]},{id:"sh-noi-ebitdar",name:"NOI & EBITDAR Analyzer",description:"Calculate and analyze Net Operating Income and EBITDAR with margin analysis, trends, and benchmarking",category:"Senior Housing - Performance",categorySlug:"senior-housing",facilityTypes:["snf","alf","ilf","ccrc"],icon:"bar-chart",prompt:`You are a senior housing financial performance analyst specializing in NOI and EBITDAR analysis for {{facilityType}} facilities.

## FACILITY OVERVIEW
- Facility Type: {{facilityType}}
- Name: {{facilityName}}
- Location: {{location}}
- Beds/Units: {{totalBeds}}
- Current Occupancy: {{currentOccupancy}}%

## REVENUE DATA
### Gross Revenue
- Resident Services Revenue: \${{residentRevenue}}
- Ancillary Revenue: \${{ancillaryRevenue}}
- Other Operating Revenue: \${{otherRevenue}}
- **Total Gross Revenue: \${{grossRevenue}}**

### Revenue Deductions
- Contractual Adjustments: \${{contractualAdjustments}}
- Bad Debt: \${{badDebt}}
- Charity Care: \${{charityCare}}
- **Net Revenue: \${{netRevenue}}**

## EXPENSE DATA
### Operating Expenses (Above the Line)
- Labor & Benefits: \${{laborCosts}}
- Contract Services: \${{contractServices}}
- Raw Food/Dietary: \${{foodCosts}}
- Medical Supplies: \${{medSupplies}}
- Utilities: \${{utilities}}
- Repairs & Maintenance: \${{repairs}}
- Insurance: \${{insurance}}
- Marketing: \${{marketing}}
- General & Administrative: \${{gAndA}}
- Professional Fees: \${{professionalFees}}
- Other Operating: \${{otherOperating}}
- **Total Operating Expenses: \${{totalOpex}}**

### Below-the-Line Items
- Management Fee: \${{managementFee}}
- Property Taxes: \${{propertyTaxes}}
- Capital Reserves: \${{capitalReserves}}
- Ground Lease (if any): \${{groundLease}}

### Non-Cash / Financing Items
- Depreciation: \${{depreciation}}
- Amortization: \${{amortization}}
- Interest Expense: \${{interestExpense}}
- Rent Expense (OpCo): \${{rentExpense}}

## HISTORICAL DATA
- Year 1 ({{year1}}): Revenue \${{y1Revenue}}, NOI \${{y1NOI}}, EBITDAR \${{y1EBITDAR}}
- Year 2 ({{year2}}): Revenue \${{y2Revenue}}, NOI \${{y2NOI}}, EBITDAR \${{y2EBITDAR}}
- Year 3 ({{year3}}): Revenue \${{y3Revenue}}, NOI \${{y3NOI}}, EBITDAR \${{y3EBITDAR}}

## ANALYSIS REQUIREMENTS

1. **NOI Calculation & Analysis**
   - Calculate NOI multiple ways:
     - Operating NOI (before mgmt fee)
     - Net NOI (after mgmt fee)
     - Adjusted NOI (normalized)
   - NOI per bed/unit
   - NOI margin analysis

2. **EBITDAR Calculation & Analysis**
   - EBITDAR calculation
   - EBITDAR margin
   - EBITDAR per bed/unit
   - Coverage ratios

3. **Margin Analysis**
   - Gross margin
   - Operating margin
   - NOI margin
   - EBITDAR margin
   - Trends over {{trendPeriod}}

4. **Benchmarking**
   - Compare to industry averages
   - Peer group comparison
   - Regional benchmarks
   - Identify variances

5. **Normalization Adjustments**
   - One-time expenses
   - Related party transactions
   - Above/below market items
   - Owner-specific costs

6. **Quality of Earnings Issues**
   - Revenue recognition timing
   - Accrual analysis
   - Working capital adjustments
   - Sustainability of margins

## OUTPUT FORMAT
{{outputFormat}}

## ADDITIONAL CONTEXT
{{additionalContext}}`,variables:[{name:"facilityType",default:"Skilled Nursing Facility (SNF)",description:"Facility type",type:"select",options:["Skilled Nursing Facility (SNF)","Assisted Living Facility (ALF)","Independent Living Facility (ILF)","CCRC"]},{name:"facilityName",default:"Heritage Care Center",description:"Facility name"},{name:"location",default:"Dallas, TX",description:"Location"},{name:"totalBeds",default:"120",description:"Total beds/units",type:"number"},{name:"currentOccupancy",default:"89",description:"Current occupancy",type:"percentage"},{name:"residentRevenue",default:"11800000",description:"Resident services revenue",type:"currency"},{name:"ancillaryRevenue",default:"450000",description:"Ancillary revenue",type:"currency"},{name:"otherRevenue",default:"250000",description:"Other operating revenue",type:"currency"},{name:"grossRevenue",default:"12500000",description:"Total gross revenue",type:"currency"},{name:"contractualAdjustments",default:"850000",description:"Contractual adjustments",type:"currency"},{name:"badDebt",default:"125000",description:"Bad debt expense",type:"currency"},{name:"charityCare",default:"25000",description:"Charity care",type:"currency"},{name:"netRevenue",default:"11500000",description:"Net revenue",type:"currency"},{name:"laborCosts",default:"6500000",description:"Labor and benefits",type:"currency"},{name:"contractServices",default:"350000",description:"Contract services",type:"currency"},{name:"foodCosts",default:"380000",description:"Dietary/food costs",type:"currency"},{name:"medSupplies",default:"420000",description:"Medical supplies",type:"currency"},{name:"utilities",default:"195000",description:"Utilities",type:"currency"},{name:"repairs",default:"165000",description:"Repairs and maintenance",type:"currency"},{name:"insurance",default:"185000",description:"Insurance",type:"currency"},{name:"marketing",default:"65000",description:"Marketing",type:"currency"},{name:"gAndA",default:"280000",description:"General and administrative",type:"currency"},{name:"professionalFees",default:"95000",description:"Professional fees",type:"currency"},{name:"otherOperating",default:"165000",description:"Other operating expenses",type:"currency"},{name:"totalOpex",default:"8800000",description:"Total operating expenses",type:"currency"},{name:"managementFee",default:"575000",description:"Management fee",type:"currency"},{name:"propertyTaxes",default:"95000",description:"Property taxes",type:"currency"},{name:"capitalReserves",default:"150000",description:"Capital reserves",type:"currency"},{name:"groundLease",default:"0",description:"Ground lease payment",type:"currency"},{name:"depreciation",default:"680000",description:"Depreciation",type:"currency"},{name:"amortization",default:"45000",description:"Amortization",type:"currency"},{name:"interestExpense",default:"890000",description:"Interest expense",type:"currency"},{name:"rentExpense",default:"0",description:"Rent expense (if OpCo)",type:"currency"},{name:"year1",default:"2022",description:"Historical year 1"},{name:"y1Revenue",default:"10800000",description:"Year 1 revenue",type:"currency"},{name:"y1NOI",default:"1850000",description:"Year 1 NOI",type:"currency"},{name:"y1EBITDAR",default:"2380000",description:"Year 1 EBITDAR",type:"currency"},{name:"year2",default:"2023",description:"Historical year 2"},{name:"y2Revenue",default:"11400000",description:"Year 2 revenue",type:"currency"},{name:"y2NOI",default:"2050000",description:"Year 2 NOI",type:"currency"},{name:"y2EBITDAR",default:"2580000",description:"Year 2 EBITDAR",type:"currency"},{name:"year3",default:"2024",description:"Historical year 3"},{name:"y3Revenue",default:"11500000",description:"Year 3 revenue",type:"currency"},{name:"y3NOI",default:"2125000",description:"Year 3 NOI",type:"currency"},{name:"y3EBITDAR",default:"2700000",description:"Year 3 EBITDAR",type:"currency"},{name:"trendPeriod",default:"3 years",description:"Trend analysis period"},{name:"outputFormat",default:"Excel model with calculations and trend charts",description:"Output format",type:"select",options:["Excel model with calculations and trend charts","PowerPoint summary","PDF memo","All formats"]},{name:"additionalContext",default:"",description:"Additional context",type:"textarea"}],tags:["noi","ebitdar","margins","performance","benchmarking","quality-of-earnings"],difficulty:"advanced",estimatedTime:"20-25 min",outputFormats:["excel","powerpoint","pdf","memo"],useCases:["Performance analysis","Due diligence","Lender reporting","Valuation support"]},{id:"sh-dscr-analysis",name:"Debt Service Coverage Analyzer",description:"Analyze debt service coverage ratios, loan covenant compliance, and financing scenarios",category:"Senior Housing - Financing",categorySlug:"senior-housing",facilityTypes:["snf","alf","ilf","ccrc"],icon:"shield",prompt:`You are a senior housing finance analyst specializing in debt analysis for {{facilityType}} facilities.

## PROPERTY OVERVIEW
- Facility Type: {{facilityType}}
- Property Name: {{propertyName}}
- Location: {{location}}
- Beds/Units: {{totalBeds}}
- Appraised Value: \${{appraisedValue}}

## CURRENT DEBT STRUCTURE
### First Mortgage/Senior Debt
- Lender: {{seniorLender}}
- Original Principal: \${{originalPrincipal}}
- Current Balance: \${{currentBalance}}
- Interest Rate: {{interestRate}}%
- Rate Type: {{rateType}}
- Amortization: {{amortizationYears}} years
- Maturity Date: {{maturityDate}}
- Monthly P&I: \${{monthlyPI}}
- Annual Debt Service: \${{annualDebtService}}

### Subordinate Debt (if applicable)
- Mezzanine/Sub Debt: \${{subDebtBalance}}
- Interest Rate: {{subDebtRate}}%
- Annual Payment: \${{subDebtPayment}}

## OPERATING PERFORMANCE
- Net Operating Income (NOI): \${{noi}}
- EBITDAR: \${{ebitdar}}
- Capital Expenditures: \${{capex}}
- Management Fee: \${{managementFee}}

## LOAN COVENANTS
- Minimum DSCR Requirement: {{minDSCR}}x
- Maximum LTV: {{maxLTV}}%
- Other Covenants: {{otherCovenants}}

## ANALYSIS REQUIREMENTS

1. **DSCR Calculations**
   - NOI DSCR = NOI / Total Debt Service
   - EBITDAR DSCR = EBITDAR / (Debt Service + Rent)
   - Fixed Charge Coverage Ratio
   - Interest Coverage Ratio

2. **Covenant Compliance**
   - Current DSCR vs. Required
   - Cushion/headroom analysis
   - Breach scenario modeling
   - Cure requirements

3. **Cash Flow Waterfall**
   - Revenue
   - Operating Expenses
   - NOI
   - Debt Service
   - Capital Reserves
   - Distributions

4. **Sensitivity Analysis**
   - DSCR at various occupancy levels
   - DSCR at various rate scenarios
   - Break-even occupancy for covenant
   - Break-even NOI margin

5. **Refinancing Analysis**
   - Current market rates: {{currentMarketRate}}%
   - Refinance sizing
   - Cash-out potential
   - Rate buydown economics

6. **Debt Capacity Analysis**
   - Maximum supportable debt
   - Optimal capital structure
   - Additional borrowing capacity

## OUTPUT FORMAT
{{outputFormat}}

## ADDITIONAL CONTEXT
{{additionalContext}}`,variables:[{name:"facilityType",default:"Skilled Nursing Facility (SNF)",description:"Facility type",type:"select",options:["Skilled Nursing Facility (SNF)","Assisted Living Facility (ALF)","Independent Living Facility (ILF)","CCRC"]},{name:"propertyName",default:"Heritage Care Center",description:"Property name"},{name:"location",default:"Dallas, TX",description:"Location"},{name:"totalBeds",default:"120",description:"Total beds/units",type:"number"},{name:"appraisedValue",default:"22000000",description:"Appraised value",type:"currency"},{name:"seniorLender",default:"HUD/FHA",description:"Senior lender name"},{name:"originalPrincipal",default:"15000000",description:"Original loan amount",type:"currency"},{name:"currentBalance",default:"14200000",description:"Current loan balance",type:"currency"},{name:"interestRate",default:"5.25",description:"Interest rate",type:"percentage"},{name:"rateType",default:"Fixed",description:"Rate type",type:"select",options:["Fixed","Variable","Hybrid"]},{name:"amortizationYears",default:"35",description:"Amortization period",type:"number"},{name:"maturityDate",default:"2058-06-01",description:"Loan maturity date",type:"date"},{name:"monthlyPI",default:"78500",description:"Monthly principal and interest",type:"currency"},{name:"annualDebtService",default:"942000",description:"Annual debt service",type:"currency"},{name:"subDebtBalance",default:"0",description:"Subordinate debt balance",type:"currency"},{name:"subDebtRate",default:"0",description:"Subordinate debt rate",type:"percentage"},{name:"subDebtPayment",default:"0",description:"Annual subordinate debt payment",type:"currency"},{name:"noi",default:"2300000",description:"Net Operating Income",type:"currency"},{name:"ebitdar",default:"2800000",description:"EBITDAR",type:"currency"},{name:"capex",default:"150000",description:"Annual capital expenditures",type:"currency"},{name:"managementFee",default:"575000",description:"Management fee",type:"currency"},{name:"minDSCR",default:"1.45",description:"Minimum required DSCR",type:"number"},{name:"maxLTV",default:"75",description:"Maximum LTV covenant",type:"percentage"},{name:"otherCovenants",default:"Minimum occupancy 80%, No additional debt without consent",description:"Other loan covenants"},{name:"currentMarketRate",default:"6.5",description:"Current market interest rate",type:"percentage"},{name:"outputFormat",default:"Excel model with debt schedule and DSCR projections",description:"Output format",type:"select",options:["Excel model with debt schedule and DSCR projections","PowerPoint lender presentation","PDF covenant compliance memo","All formats"]},{name:"additionalContext",default:"",description:"Additional context",type:"textarea"}],tags:["dscr","debt-service","financing","covenants","refinancing","loan-analysis"],difficulty:"advanced",estimatedTime:"20-25 min",outputFormats:["excel","powerpoint","pdf","memo"],useCases:["Loan compliance","Refinancing analysis","Lender reporting","Investment decisions"]},{id:"sh-capex-planner",name:"Capital Expenditure Planner",description:"Plan and budget capital improvements with lifecycle analysis, prioritization, and funding strategies",category:"Senior Housing - Capital",categorySlug:"senior-housing",facilityTypes:["snf","alf","ilf","ccrc"],icon:"wrench",prompt:`You are a senior housing capital planning specialist for {{facilityType}} facilities.

## PROPERTY INFORMATION
- Facility Type: {{facilityType}}
- Property Name: {{propertyName}}
- Year Built: {{yearBuilt}}
- Last Major Renovation: {{lastRenovation}}
- Total SF: {{totalSF}} SF
- Beds/Units: {{totalBeds}}
- Current Appraised Value: \${{appraisedValue}}

## BUILDING SYSTEMS ASSESSMENT
### Roof
- Type: {{roofType}}
- Age: {{roofAge}} years
- Condition: {{roofCondition}}
- Remaining Life: {{roofLife}} years
- Replacement Cost: \${{roofCost}}

### HVAC
- System Type: {{hvacType}}
- Age: {{hvacAge}} years
- Condition: {{hvacCondition}}
- Remaining Life: {{hvacLife}} years
- Replacement Cost: \${{hvacCost}}

### Plumbing
- Condition: {{plumbingCondition}}
- Major Issues: {{plumbingIssues}}
- Estimated Repairs: \${{plumbingCost}}

### Electrical
- Service Capacity: {{electricalCapacity}}
- Condition: {{electricalCondition}}
- Upgrade Needs: {{electricalNeeds}}
- Estimated Cost: \${{electricalCost}}

### Life Safety
- Fire Suppression: {{fireSuppression}}
- Emergency Systems: {{emergencySystems}}
- Compliance Status: {{lifeSafetyCompliance}}
- Required Upgrades: \${{lifeSafetyCost}}

### Interior Finishes
- Common Areas Condition: {{commonAreasCondition}}
- Resident Rooms Condition: {{roomsCondition}}
- Refresh Cycle: {{refreshCycle}} years
- Annual Budget: \${{interiorBudget}}

## CURRENT CAPITAL RESERVES
- Reserve Balance: \${{reserveBalance}}
- Annual Contribution: \${{annualContribution}}
- Lender Required Minimum: \${{lenderMinimum}}

## PLANNED PROJECTS
{{plannedProjects}}

## ANALYSIS REQUIREMENTS

1. **Building Condition Assessment**
   - System-by-system analysis
   - Deferred maintenance quantification
   - Code compliance gaps
   - Accessibility requirements

2. **Capital Needs Prioritization**
   - Critical/immediate needs
   - Short-term (1-2 years)
   - Medium-term (3-5 years)
   - Long-term (5+ years)

3. **Cost Estimation**
   - Project cost estimates
   - Contingency factors
   - Inflation adjustments
   - Regional cost factors

4. **Funding Strategy**
   - Reserve funding adequacy
   - Operating cash flow contribution
   - Financing options
   - Tax credit opportunities

5. **ROI Analysis**
   - Revenue enhancement projects
   - Cost reduction projects
   - Valuation impact
   - Payback analysis

6. **10-Year Capital Plan**
   - Annual capital budget
   - Project phasing
   - Cash flow impact
   - Reserve balance projection

## OUTPUT FORMAT
{{outputFormat}}

## ADDITIONAL CONTEXT
{{additionalContext}}`,variables:[{name:"facilityType",default:"Skilled Nursing Facility (SNF)",description:"Facility type",type:"select",options:["Skilled Nursing Facility (SNF)","Assisted Living Facility (ALF)","Independent Living Facility (ILF)","CCRC"]},{name:"propertyName",default:"Heritage Care Center",description:"Property name"},{name:"yearBuilt",default:"1998",description:"Year built"},{name:"lastRenovation",default:"2015",description:"Last major renovation year"},{name:"totalSF",default:"65000",description:"Total square footage",type:"number"},{name:"totalBeds",default:"120",description:"Total beds/units",type:"number"},{name:"appraisedValue",default:"22000000",description:"Current appraised value",type:"currency"},{name:"roofType",default:"TPO Membrane",description:"Roof type"},{name:"roofAge",default:"12",description:"Roof age in years",type:"number"},{name:"roofCondition",default:"Fair",description:"Roof condition",type:"select",options:["Excellent","Good","Fair","Poor","Critical"]},{name:"roofLife",default:"8",description:"Remaining roof life",type:"number"},{name:"roofCost",default:"450000",description:"Roof replacement cost",type:"currency"},{name:"hvacType",default:"Packaged Rooftop Units",description:"HVAC system type"},{name:"hvacAge",default:"15",description:"HVAC age in years",type:"number"},{name:"hvacCondition",default:"Fair",description:"HVAC condition",type:"select",options:["Excellent","Good","Fair","Poor","Critical"]},{name:"hvacLife",default:"5",description:"Remaining HVAC life",type:"number"},{name:"hvacCost",default:"680000",description:"HVAC replacement cost",type:"currency"},{name:"plumbingCondition",default:"Good",description:"Plumbing condition",type:"select",options:["Excellent","Good","Fair","Poor","Critical"]},{name:"plumbingIssues",default:"Minor fixture updates needed",description:"Plumbing issues"},{name:"plumbingCost",default:"85000",description:"Plumbing repair estimate",type:"currency"},{name:"electricalCapacity",default:"800 amp",description:"Electrical service capacity"},{name:"electricalCondition",default:"Good",description:"Electrical condition",type:"select",options:["Excellent","Good","Fair","Poor","Critical"]},{name:"electricalNeeds",default:"Panel upgrades in 2 wings",description:"Electrical upgrade needs"},{name:"electricalCost",default:"125000",description:"Electrical upgrade cost",type:"currency"},{name:"fireSuppression",default:"Full sprinkler coverage",description:"Fire suppression status"},{name:"emergencySystems",default:"Generator, emergency lighting",description:"Emergency systems"},{name:"lifeSafetyCompliance",default:"Compliant",description:"Life safety compliance status"},{name:"lifeSafetyCost",default:"45000",description:"Life safety upgrade cost",type:"currency"},{name:"commonAreasCondition",default:"Fair",description:"Common areas condition",type:"select",options:["Excellent","Good","Fair","Poor"]},{name:"roomsCondition",default:"Fair",description:"Resident rooms condition",type:"select",options:["Excellent","Good","Fair","Poor"]},{name:"refreshCycle",default:"7",description:"Interior refresh cycle years",type:"number"},{name:"interiorBudget",default:"180000",description:"Annual interior budget",type:"currency"},{name:"reserveBalance",default:"850000",description:"Current reserve balance",type:"currency"},{name:"annualContribution",default:"150000",description:"Annual reserve contribution",type:"currency"},{name:"lenderMinimum",default:"500000",description:"Lender minimum reserve",type:"currency"},{name:"plannedProjects",default:"Year 1: Lobby renovation ($180K)\\nYear 2: HVAC Phase 1 ($340K)\\nYear 3: HVAC Phase 2 ($340K)\\nYear 4: Room refresh Wing A ($120K)",description:"Planned capital projects",type:"textarea"},{name:"outputFormat",default:"Excel 10-year capital plan with reserve analysis",description:"Output format",type:"select",options:["Excel 10-year capital plan with reserve analysis","PowerPoint capital summary","PDF capital needs assessment","All formats"]},{name:"additionalContext",default:"",description:"Additional context",type:"textarea"}],tags:["capex","capital-planning","reserves","building-systems","lifecycle","maintenance"],difficulty:"intermediate",estimatedTime:"20-25 min",outputFormats:["excel","powerpoint","pdf"],useCases:["Asset management","Due diligence","Lender reporting","Budget planning"]},{id:"sh-data-extractor",name:"Financial Statement Data Extractor",description:"Extract and structure financial data from facility financial statements, Medicare cost reports, and operating reports",category:"Senior Housing - Data",categorySlug:"senior-housing",facilityTypes:["snf","alf","ilf","ccrc"],icon:"file-text",prompt:`You are a senior housing financial data extraction specialist for {{facilityType}} facilities.

## DATA EXTRACTION REQUEST
- Facility Type: {{facilityType}}
- Source Document Type: {{documentType}}
- Time Period: {{timePeriod}}
- Number of Facilities: {{facilityCount}}

## SOURCE DOCUMENT DETAILS
{{sourceDocumentDescription}}

## DATA FIELDS TO EXTRACT

### Revenue Data
- [ ] Gross Patient Revenue by Payor
- [ ] Contractual Adjustments
- [ ] Net Patient Revenue
- [ ] Other Operating Revenue
- [ ] Non-Operating Revenue

### Census & Occupancy
- [ ] Licensed Beds
- [ ] Available Beds
- [ ] Patient Days by Payor
- [ ] Average Daily Census
- [ ] Occupancy Rate

### Expense Data
- [ ] Salaries & Wages by Department
- [ ] Employee Benefits
- [ ] Contract Labor
- [ ] Raw Food Costs
- [ ] Medical Supplies
- [ ] Utilities
- [ ] Insurance
- [ ] Professional Fees
- [ ] Management Fees
- [ ] All Other Expenses

### Staffing Data
- [ ] FTEs by Department
- [ ] Nursing Hours (RN, LPN, CNA)
- [ ] Nursing HPPD
- [ ] Agency Hours

### Balance Sheet Items
- [ ] Cash & Equivalents
- [ ] Accounts Receivable (by Payor Aging)
- [ ] Property & Equipment
- [ ] Current Liabilities
- [ ] Long-term Debt
- [ ] Net Assets/Equity

### Calculated Metrics
- [ ] Per Patient Day Statistics
- [ ] Department Cost Ratios
- [ ] Margin Calculations
- [ ] Working Capital Metrics

## EXTRACTION REQUIREMENTS

1. **Data Validation**
   - Cross-check totals
   - Identify inconsistencies
   - Flag missing data
   - Note data quality issues

2. **Normalization**
   - Standardize account names
   - Convert to common periods (monthly/annual)
   - Adjust for non-recurring items
   - Normalize for facility size

3. **Structured Output**
   - Organize by category
   - Include source references
   - Note any assumptions
   - Provide data dictionary

4. **Multi-Facility Consolidation**
   {{#if isMultiFacility}}
   - Facility-level detail
   - Consolidated totals
   - Comparative analysis
   - Identify outliers
   {{/if}}

5. **Medicare Cost Report Specifics**
   {{#if isCostReport}}
   - Worksheet S-3 (Statistical Data)
   - Worksheet A (Cost Centers)
   - Worksheet B (Cost Allocation)
   - Worksheet G (Apportionment)
   - Provider reimbursement analysis
   {{/if}}

## OUTPUT FORMAT
{{outputFormat}}

## SPECIAL INSTRUCTIONS
{{specialInstructions}}`,variables:[{name:"facilityType",default:"Skilled Nursing Facility (SNF)",description:"Facility type",type:"select",options:["Skilled Nursing Facility (SNF)","Assisted Living Facility (ALF)","Independent Living Facility (ILF)","CCRC"]},{name:"documentType",default:"Medicare Cost Report",description:"Source document type",type:"select",options:["Medicare Cost Report","Monthly Operating Statement","Annual Audited Financials","Quarterly Flash Report","Trial Balance","Budget vs Actual Report","Multiple Document Types"]},{name:"timePeriod",default:"Fiscal Year 2024",description:"Time period covered"},{name:"facilityCount",default:"1",description:"Number of facilities",type:"number"},{name:"sourceDocumentDescription",default:"Medicare Cost Report Form CMS-2540-10 for 12/31/2024 fiscal year end. Document includes Worksheets S, A, B, and G series.",description:"Description of source documents",type:"textarea"},{name:"isMultiFacility",default:"false",description:"Multi-facility extraction",type:"select",options:["true","false"]},{name:"isCostReport",default:"true",description:"Medicare cost report",type:"select",options:["true","false"]},{name:"outputFormat",default:"Excel template with structured data tabs",description:"Output format",type:"select",options:["Excel template with structured data tabs","CSV files by category","JSON structured data","Database-ready format","All formats"]},{name:"specialInstructions",default:"Flag any unusual items or significant changes from prior period. Highlight data quality issues.",description:"Special extraction instructions",type:"textarea"}],tags:["data-extraction","cost-reports","financial-statements","data-processing","analysis"],difficulty:"intermediate",estimatedTime:"15-25 min",outputFormats:["excel","pdf"],useCases:["Due diligence","Financial analysis","Portfolio reporting","Benchmarking"]},{id:"sh-sensitivity",name:"Sensitivity Analysis Builder",description:"Build comprehensive sensitivity analyses for key value drivers including occupancy, rates, expenses, and cap rates",category:"Senior Housing - Analysis",categorySlug:"senior-housing",facilityTypes:["snf","alf","ilf","ccrc"],icon:"sliders",prompt:`You are a senior housing financial modeling expert specializing in sensitivity analysis for {{facilityType}} facilities.

## BASE CASE ASSUMPTIONS
- Facility Type: {{facilityType}}
- Purchase Price: \${{purchasePrice}}
- Total Beds/Units: {{totalBeds}}
- Base Occupancy: {{baseOccupancy}}%
- Base Revenue per Occupied Unit: \${{baseRevPOU}}
- Base Operating Expense Ratio: {{baseExpenseRatio}}%
- Base NOI: \${{baseNOI}}
- Base NOI Margin: {{baseNOIMargin}}%
- Cap Rate (Entry): {{entryCap}}%
- Cap Rate (Exit): {{exitCap}}%
- Hold Period: {{holdPeriod}} years

## SENSITIVITY VARIABLES

### Occupancy Sensitivity
- Range: {{occupancyLow}}% to {{occupancyHigh}}%
- Increment: {{occupancyIncrement}}%
- Stabilization timeline impact

### Revenue Sensitivity
- Rate Growth: {{rateLow}}% to {{rateHigh}}% annually
- Payor Mix Shifts: {{payorMixRange}}
- Ancillary Revenue: +/- {{ancillaryRange}}%

### Expense Sensitivity
- Labor Cost Growth: {{laborLow}}% to {{laborHigh}}%
- Benefits Inflation: {{benefitsRange}}%
- Operating Expense Ratio: {{expenseRatioLow}}% to {{expenseRatioHigh}}%

### Capital Markets Sensitivity
- Entry Cap Rate: {{entryCapLow}}% to {{entryCapHigh}}%
- Exit Cap Rate: {{exitCapLow}}% to {{exitCapHigh}}%
- Interest Rate: {{interestLow}}% to {{interestHigh}}%

## ANALYSIS REQUIREMENTS

1. **Single Variable Sensitivity**
   - One variable at a time analysis
   - Impact on NOI, Value, IRR
   - Tornado chart ranking
   - Break-even calculations

2. **Two-Variable Sensitivity (Data Tables)**
   - Occupancy vs Rate Growth
   - Entry Cap vs Exit Cap
   - Occupancy vs Expense Ratio
   - NOI Margin vs Cap Rate

3. **Scenario Analysis**
   - Downside Case: {{downsideDescription}}
   - Base Case: Current projections
   - Upside Case: {{upsideDescription}}
   - Probability-weighted returns

4. **Monte Carlo Simulation**
   - Define distributions for key variables
   - Run {{simulationRuns}} simulations
   - Calculate probability of outcomes
   - Value at Risk analysis

5. **Investment Return Sensitivity**
   - IRR sensitivity to each variable
   - Equity Multiple sensitivity
   - Cash-on-Cash return range
   - Payback period range

6. **Risk Metrics**
   - Break-even occupancy
   - Break-even NOI margin
   - Maximum adverse change before loss
   - Probability of achieving targets

## OUTPUT FORMAT
{{outputFormat}}

## ADDITIONAL CONTEXT
{{additionalContext}}`,variables:[{name:"facilityType",default:"Skilled Nursing Facility (SNF)",description:"Facility type",type:"select",options:["Skilled Nursing Facility (SNF)","Assisted Living Facility (ALF)","Independent Living Facility (ILF)","CCRC"]},{name:"purchasePrice",default:"22000000",description:"Purchase price",type:"currency"},{name:"totalBeds",default:"120",description:"Total beds/units",type:"number"},{name:"baseOccupancy",default:"88",description:"Base case occupancy",type:"percentage"},{name:"baseRevPOU",default:"285",description:"Base revenue per occupied unit/day",type:"currency"},{name:"baseExpenseRatio",default:"82",description:"Base operating expense ratio",type:"percentage"},{name:"baseNOI",default:"2300000",description:"Base case NOI",type:"currency"},{name:"baseNOIMargin",default:"18",description:"Base NOI margin",type:"percentage"},{name:"entryCap",default:"10.5",description:"Entry cap rate",type:"percentage"},{name:"exitCap",default:"10.5",description:"Exit cap rate",type:"percentage"},{name:"holdPeriod",default:"5",description:"Investment hold period",type:"number"},{name:"occupancyLow",default:"80",description:"Occupancy low range",type:"percentage"},{name:"occupancyHigh",default:"95",description:"Occupancy high range",type:"percentage"},{name:"occupancyIncrement",default:"2.5",description:"Occupancy increment",type:"percentage"},{name:"rateLow",default:"1",description:"Rate growth low",type:"percentage"},{name:"rateHigh",default:"4",description:"Rate growth high",type:"percentage"},{name:"payorMixRange",default:"+/- 5% Medicare mix",description:"Payor mix sensitivity range"},{name:"ancillaryRange",default:"20",description:"Ancillary revenue range",type:"percentage"},{name:"laborLow",default:"2",description:"Labor cost growth low",type:"percentage"},{name:"laborHigh",default:"6",description:"Labor cost growth high",type:"percentage"},{name:"benefitsRange",default:"5-10",description:"Benefits inflation range"},{name:"expenseRatioLow",default:"78",description:"Expense ratio low",type:"percentage"},{name:"expenseRatioHigh",default:"86",description:"Expense ratio high",type:"percentage"},{name:"entryCapLow",default:"9.5",description:"Entry cap low",type:"percentage"},{name:"entryCapHigh",default:"11.5",description:"Entry cap high",type:"percentage"},{name:"exitCapLow",default:"9.5",description:"Exit cap low",type:"percentage"},{name:"exitCapHigh",default:"11.5",description:"Exit cap high",type:"percentage"},{name:"interestLow",default:"5.5",description:"Interest rate low",type:"percentage"},{name:"interestHigh",default:"7.5",description:"Interest rate high",type:"percentage"},{name:"downsideDescription",default:"85% occupancy, 2% rate growth, 85% expense ratio, 11% exit cap",description:"Downside scenario description"},{name:"upsideDescription",default:"93% occupancy, 4% rate growth, 80% expense ratio, 10% exit cap",description:"Upside scenario description"},{name:"simulationRuns",default:"1000",description:"Monte Carlo simulation runs",type:"number"},{name:"outputFormat",default:"Excel model with data tables, tornado charts, and scenario tabs",description:"Output format",type:"select",options:["Excel model with data tables, tornado charts, and scenario tabs","PowerPoint risk analysis presentation","PDF investment memo with sensitivities","All formats"]},{name:"additionalContext",default:"",description:"Additional context",type:"textarea"}],tags:["sensitivity","scenarios","monte-carlo","risk-analysis","data-tables","investment"],difficulty:"advanced",estimatedTime:"25-35 min",outputFormats:["excel","powerpoint","pdf"],useCases:["Investment analysis","Risk assessment","Board presentations","Lender discussions"]},{id:"sh-payor-optimizer",name:"Payor Mix Optimizer",description:"Analyze and optimize payor mix for maximum revenue with reimbursement analysis and strategic recommendations",category:"Senior Housing - Strategy",categorySlug:"senior-housing",facilityTypes:["snf","alf","ilf","ccrc"],icon:"pie-chart",prompt:`You are a senior housing revenue optimization specialist focusing on payor mix strategy for {{facilityType}} facilities.

## FACILITY PROFILE
- Facility Type: {{facilityType}}
- Name: {{facilityName}}
- Location: {{location}}
- Licensed Beds: {{licensedBeds}}
- Average Daily Census: {{adc}}

## CURRENT PAYOR MIX
{{#if isSNF}}
### Skilled Nursing Payor Distribution
| Payor | Census % | ADC | PPD Rate | Monthly Rev |
|-------|----------|-----|----------|-------------|
| Medicare Part A | {{medicarePercent}}% | {{medicareADC}} | \${{medicarePPD}} | \${{medicareRev}} |
| Medicare Advantage | {{maPercent}}% | {{maADC}} | \${{maPPD}} | \${{maRev}} |
| Medicaid | {{medicaidPercent}}% | {{medicaidADC}} | \${{medicaidPPD}} | \${{medicaidRev}} |
| Private Pay | {{privatePercent}}% | {{privateADC}} | \${{privatePPD}} | \${{privateRev}} |
| VA/Tricare | {{vaPercent}}% | {{vaADC}} | \${{vaPPD}} | \${{vaRev}} |
| Managed Medicaid | {{managedMedicaidPercent}}% | {{managedMedicaidADC}} | \${{managedMedicaidPPD}} | \${{managedMedicaidRev}} |
{{/if}}

## REIMBURSEMENT DETAILS
### Medicare Part A
- RUG-IV/PDPM Category Mix: {{rugMix}}
- Average Case Mix Index: {{cmi}}
- Average Length of Stay: {{medicareLOS}} days
- Therapy Minutes/Day: {{therapyMinutes}}

### Medicare Advantage Contracts
{{maContracts}}

### Medicaid
- State: {{state}}
- Base Rate: \${{medicaidBase}}
- Quality Add-on: \${{qualityAddon}}
- Pending Rate Changes: {{pendingRateChanges}}

## MARKET ANALYSIS
- Market Medicaid Rate: \${{marketMedicaidRate}}
- Market Medicare ADC%: {{marketMedicarePercent}}%
- Competitor Payor Mix: {{competitorMix}}
- Hospital Discharge Patterns: {{dischargPatterns}}

## ANALYSIS REQUIREMENTS

1. **Payor Profitability Analysis**
   - Revenue per payor
   - Cost per payor (acuity adjusted)
   - Margin by payor source
   - Contribution analysis

2. **Payor Mix Optimization**
   - Current vs optimal mix
   - Revenue impact of shifts
   - Realistic achievable targets
   - Timeline to target mix

3. **Medicare Optimization**
   - PDPM component analysis
   - Case mix improvement opportunities
   - Therapy utilization review
   - Length of stay optimization

4. **Managed Care Strategy**
   - Contract rate analysis
   - Rate improvement opportunities
   - Network positioning
   - Volume commitments

5. **Medicaid Strategy**
   - Rate advocacy opportunities
   - Quality program participation
   - Census management
   - Alternative payment models

6. **Implementation Roadmap**
   - Quick wins (90 days)
   - Medium-term (6-12 months)
   - Long-term (12+ months)
   - Resource requirements

## TARGET PAYOR MIX
- Target Medicare: {{targetMedicare}}%
- Target Medicare Advantage: {{targetMA}}%
- Target Medicaid: {{targetMedicaid}}%
- Target Private: {{targetPrivate}}%

## OUTPUT FORMAT
{{outputFormat}}

## ADDITIONAL CONTEXT
{{additionalContext}}`,variables:[{name:"facilityType",default:"Skilled Nursing Facility (SNF)",description:"Facility type",type:"select",options:["Skilled Nursing Facility (SNF)","Assisted Living Facility (ALF)","Independent Living Facility (ILF)","CCRC"]},{name:"facilityName",default:"Heritage Care Center",description:"Facility name"},{name:"location",default:"Dallas, TX",description:"Location"},{name:"licensedBeds",default:"120",description:"Licensed beds",type:"number"},{name:"adc",default:"108",description:"Average daily census",type:"number"},{name:"medicarePercent",default:"15",description:"Medicare Part A %",type:"percentage"},{name:"medicareADC",default:"16",description:"Medicare ADC",type:"number"},{name:"medicarePPD",default:"625",description:"Medicare PPD rate",type:"currency"},{name:"medicareRev",default:"304000",description:"Monthly Medicare revenue",type:"currency"},{name:"maPercent",default:"10",description:"Medicare Advantage %",type:"percentage"},{name:"maADC",default:"11",description:"MA ADC",type:"number"},{name:"maPPD",default:"425",description:"MA PPD rate",type:"currency"},{name:"maRev",default:"140250",description:"Monthly MA revenue",type:"currency"},{name:"medicaidPercent",default:"55",description:"Medicaid %",type:"percentage"},{name:"medicaidADC",default:"59",description:"Medicaid ADC",type:"number"},{name:"medicaidPPD",default:"225",description:"Medicaid PPD rate",type:"currency"},{name:"medicaidRev",default:"398250",description:"Monthly Medicaid revenue",type:"currency"},{name:"privatePercent",default:"15",description:"Private Pay %",type:"percentage"},{name:"privateADC",default:"16",description:"Private ADC",type:"number"},{name:"privatePPD",default:"350",description:"Private PPD rate",type:"currency"},{name:"privateRev",default:"168000",description:"Monthly private revenue",type:"currency"},{name:"vaPercent",default:"3",description:"VA %",type:"percentage"},{name:"vaADC",default:"3",description:"VA ADC",type:"number"},{name:"vaPPD",default:"400",description:"VA PPD rate",type:"currency"},{name:"vaRev",default:"36000",description:"Monthly VA revenue",type:"currency"},{name:"managedMedicaidPercent",default:"2",description:"Managed Medicaid %",type:"percentage"},{name:"managedMedicaidADC",default:"2",description:"Managed Medicaid ADC",type:"number"},{name:"managedMedicaidPPD",default:"235",description:"Managed Medicaid PPD",type:"currency"},{name:"managedMedicaidRev",default:"14100",description:"Monthly managed Medicaid revenue",type:"currency"},{name:"rugMix",default:"RVB: 25%, RVC: 35%, RHC: 20%, RMC: 15%, RLB: 5%",description:"RUG/PDPM category mix"},{name:"cmi",default:"1.12",description:"Case Mix Index",type:"number"},{name:"medicareLOS",default:"22",description:"Medicare average LOS",type:"number"},{name:"therapyMinutes",default:"65",description:"Average therapy minutes/day",type:"number"},{name:"maContracts",default:"UHC: $420/day, Humana: $435/day, Aetna: $410/day",description:"MA contract details"},{name:"state",default:"Texas",description:"State for Medicaid"},{name:"medicaidBase",default:"205",description:"Medicaid base rate",type:"currency"},{name:"qualityAddon",default:"20",description:"Quality add-on amount",type:"currency"},{name:"pendingRateChanges",default:"3% increase effective 9/1/2025",description:"Pending rate changes"},{name:"marketMedicaidRate",default:"218",description:"Market average Medicaid rate",type:"currency"},{name:"marketMedicarePercent",default:"18",description:"Market Medicare %",type:"percentage"},{name:"competitorMix",default:"Competitor A: 20% Medicare, Competitor B: 12% Medicare",description:"Competitor payor mix"},{name:"dischargPatterns",default:"Medical City: 45 referrals/month, Baylor: 30 referrals/month",description:"Hospital discharge patterns"},{name:"targetMedicare",default:"20",description:"Target Medicare %",type:"percentage"},{name:"targetMA",default:"12",description:"Target MA %",type:"percentage"},{name:"targetMedicaid",default:"50",description:"Target Medicaid %",type:"percentage"},{name:"targetPrivate",default:"15",description:"Target Private %",type:"percentage"},{name:"outputFormat",default:"Excel model with payor analysis and optimization scenarios",description:"Output format",type:"select",options:["Excel model with payor analysis and optimization scenarios","PowerPoint strategy presentation","PDF strategic memo","All formats"]},{name:"additionalContext",default:"",description:"Additional context",type:"textarea"}],tags:["payor-mix","revenue-optimization","medicare","medicaid","reimbursement","strategy"],difficulty:"advanced",estimatedTime:"25-30 min",outputFormats:["excel","powerpoint","pdf","memo"],useCases:["Revenue optimization","Strategic planning","Contract negotiations","Performance improvement"]},{id:"sh-correlation",name:"Data Correlation Analyzer",description:"Identify correlations between operational metrics and financial performance to drive data-driven decisions",category:"Senior Housing - Analytics",categorySlug:"senior-housing",facilityTypes:["snf","alf","ilf","ccrc"],icon:"activity",prompt:`You are a senior housing data analytics expert specializing in correlation analysis for {{facilityType}} facilities.

## ANALYSIS SCOPE
- Facility Type: {{facilityType}}
- Portfolio Size: {{portfolioSize}} facilities
- Analysis Period: {{analysisPeriod}}
- Data Granularity: {{dataGranularity}}

## DATA SETS FOR CORRELATION

### Operational Metrics
- Occupancy Rate (monthly)
- Length of Stay
- Admissions Volume
- Discharge Rate
- Readmission Rate
- Nursing Hours Per Patient Day
- Staff Turnover Rate
- Agency Utilization Rate
- Survey Deficiencies
- Star Ratings (CMS)

### Quality Metrics
- Falls Rate
- Pressure Ulcer Rate
- UTI Rate
- Hospitalization Rate
- Pain Management Scores
- Family Satisfaction
- Resident Satisfaction

### Financial Metrics
- Revenue Per Patient Day
- Operating Expense Ratio
- Labor Cost Per Patient Day
- NOI Margin
- EBITDAR
- Collection Rate
- Days in AR

### Market Metrics
- Market Occupancy
- Competitor Census
- Market Rate Trends
- New Supply
- Demand Drivers

## CORRELATION ANALYSIS REQUIREMENTS

1. **Correlation Matrix**
   - Calculate correlation coefficients for all metric pairs
   - Identify statistically significant correlations (p < {{significanceLevel}})
   - Highlight strongest positive and negative correlations
   - Create visual correlation heatmap

2. **Operational → Financial Correlations**
   - Occupancy impact on NOI margin
   - HPPD correlation with quality scores
   - Staff turnover impact on agency costs
   - Admission source correlation with LOS
   - Star rating correlation with occupancy

3. **Quality → Financial Correlations**
   - Quality scores impact on Medicare census
   - Hospitalization rate vs readmission revenue
   - Satisfaction scores vs referral volume
   - Deficiency-free surveys vs rate negotiation

4. **Predictive Relationships**
   - Leading indicators for occupancy
   - Leading indicators for financial performance
   - Early warning signals
   - Seasonal pattern analysis

5. **Portfolio Segmentation**
   - Cluster facilities by performance patterns
   - Identify common characteristics
   - Benchmark high vs low performers
   - Transferable best practices

6. **Regression Analysis**
   - Key drivers of NOI margin
   - Occupancy prediction model
   - Revenue optimization factors
   - Expense driver analysis

## SPECIFIC HYPOTHESES TO TEST
{{hypothesesToTest}}

## OUTPUT REQUIREMENTS
- Correlation coefficient matrix
- Statistical significance testing
- Scatter plots for key relationships
- Trend analysis charts
- Executive summary of findings
- Actionable recommendations

## OUTPUT FORMAT
{{outputFormat}}

## ADDITIONAL CONTEXT
{{additionalContext}}`,variables:[{name:"facilityType",default:"Skilled Nursing Facility (SNF)",description:"Facility type",type:"select",options:["Skilled Nursing Facility (SNF)","Assisted Living Facility (ALF)","Independent Living Facility (ILF)","CCRC","Mixed Portfolio"]},{name:"portfolioSize",default:"15",description:"Number of facilities",type:"number"},{name:"analysisPeriod",default:"24 months (Jan 2023 - Dec 2024)",description:"Analysis time period"},{name:"dataGranularity",default:"Monthly",description:"Data granularity",type:"select",options:["Daily","Weekly","Monthly","Quarterly","Annual"]},{name:"significanceLevel",default:"0.05",description:"Statistical significance level",type:"number"},{name:"hypothesesToTest",default:"H1: Higher HPPD correlates with better Star ratings\\nH2: Lower turnover correlates with higher occupancy\\nH3: Five-star facilities command rate premium\\nH4: Agency utilization negatively correlates with NOI",description:"Specific hypotheses to test",type:"textarea"},{name:"outputFormat",default:"Excel workbook with correlation matrix, charts, and statistical output",description:"Output format",type:"select",options:["Excel workbook with correlation matrix, charts, and statistical output","PowerPoint analytics presentation","PDF research report","All formats"]},{name:"additionalContext",default:"",description:"Additional context",type:"textarea"}],tags:["correlation","analytics","data-science","benchmarking","performance-drivers","statistics"],difficulty:"advanced",estimatedTime:"30-40 min",outputFormats:["excel","powerpoint","pdf"],useCases:["Performance optimization","Strategic planning","Investment decisions","Operational improvement"]},{id:"sh-full-proforma",name:"Complete Pro Forma Generator",description:"Generate a comprehensive multi-year pro forma with all financial statements, valuation, and returns analysis",category:"Senior Housing - Pro Forma",categorySlug:"senior-housing",facilityTypes:["snf","alf","ilf","ccrc"],icon:"file-spreadsheet",prompt:`You are a senior housing investment analyst creating a comprehensive pro forma for a {{facilityType}} acquisition/development.

## PROPERTY INFORMATION
- Facility Type: {{facilityType}}
- Property Name: {{propertyName}}
- Address: {{address}}
- Year Built: {{yearBuilt}}
- Total Beds/Units: {{totalUnits}}
- Building SF: {{buildingSF}}
- Land Acres: {{landAcres}}

## TRANSACTION OVERVIEW
- Transaction Type: {{transactionType}}
- Purchase Price: \${{purchasePrice}}
- Price Per Bed/Unit: \${{pricePerUnit}}
- Closing Date: {{closingDate}}
- Hold Period: {{holdPeriod}} years

## FINANCING STRUCTURE
### Senior Debt
- Loan Amount: \${{loanAmount}}
- LTV: {{ltv}}%
- Interest Rate: {{interestRate}}%
- Amortization: {{amortization}} years
- Term: {{loanTerm}} years
- Debt Service: \${{debtService}}/year

### Mezzanine/Preferred (if applicable)
- Amount: \${{mezzAmount}}
- Rate: {{mezzRate}}%
- Payment: \${{mezzPayment}}/year

### Equity
- Total Equity: \${{totalEquity}}
- Sponsor Equity: \${{sponsorEquity}} ({{sponsorPercent}}%)
- LP Equity: \${{lpEquity}} ({{lpPercent}}%)

## YEAR 1 OPERATING ASSUMPTIONS

### Revenue
- Occupancy: {{year1Occupancy}}%
- Average Revenue/Occupied Unit: \${{avgRevenue}}/{{revenueUnit}}
- Other Income: \${{otherIncome}}/month
- Annual Revenue Growth: {{revenueGrowth}}%

### Operating Expenses
- Total Operating Expenses: \${{totalOpex}}
- Expense Ratio: {{expenseRatio}}%
- Annual Expense Growth: {{expenseGrowth}}%
- Management Fee: {{mgmtFeePercent}}% of revenue

### Below the Line
- Property Taxes: \${{propertyTaxes}}
- Insurance: \${{insurance}}
- Capital Reserves: \${{capReserves}}/unit/year

## STABILIZATION ASSUMPTIONS
- Stabilized Occupancy: {{stabilizedOccupancy}}%
- Months to Stabilization: {{monthsToStab}}
- Stabilized NOI Margin: {{stabilizedMargin}}%

## EXIT ASSUMPTIONS
- Exit Cap Rate: {{exitCap}}%
- Sales Costs: {{salesCosts}}%

## PRO FORMA REQUIREMENTS

### 1. REVENUE PROJECTIONS ({{projectionYears}} Years)
- Monthly detail Year 1
- Annual detail Years 2-{{projectionYears}}
- By revenue category
- Occupancy ramp-up schedule
- Rate escalation schedule

### 2. OPERATING EXPENSE PROJECTIONS
- Detailed expense categories
- Inflation assumptions by category
- Variable vs fixed analysis
- Department-level detail

### 3. NET OPERATING INCOME
- NOI by year
- NOI margin trending
- NOI per unit
- Stabilized vs in-place NOI

### 4. CASH FLOW WATERFALL
- Gross Revenue
- Less: Vacancy & Collection Loss
- Effective Gross Income
- Less: Operating Expenses
- NOI
- Less: Debt Service
- Less: Capital Reserves
- Cash Flow Before Taxes
- Cash Flow to Equity

### 5. DEBT ANALYSIS
- Amortization schedule
- Annual debt service
- DSCR by year
- Loan balance at exit
- Interest expense

### 6. RETURNS ANALYSIS
- Unlevered IRR
- Levered IRR
- Equity Multiple
- Cash-on-Cash by year
- Payback period
- NPV at {{discountRate}}% discount rate

### 7. VALUATION ANALYSIS
- Stabilized value (cap rate)
- Exit value projections
- Value per unit trending

### 8. SENSITIVITY ANALYSIS
- IRR sensitivity to key variables
- Exit cap rate sensitivity
- Occupancy sensitivity
- NOI margin sensitivity

### 9. FINANCIAL STATEMENTS
- Pro forma Income Statement
- Balance Sheet (Year 1)
- Sources & Uses

### 10. INVESTMENT SUMMARY
- Key metrics summary
- Risk factors
- Investment thesis

## OUTPUT FORMAT
{{outputFormat}}

## ADDITIONAL CONTEXT
{{additionalContext}}`,variables:[{name:"facilityType",default:"Skilled Nursing Facility (SNF)",description:"Facility type",type:"select",options:["Skilled Nursing Facility (SNF)","Assisted Living Facility (ALF)","Independent Living Facility (ILF)","CCRC"]},{name:"propertyName",default:"Heritage Care Center",description:"Property name"},{name:"address",default:"1234 Healthcare Blvd, Dallas, TX 75201",description:"Property address"},{name:"yearBuilt",default:"1998",description:"Year built"},{name:"totalUnits",default:"120",description:"Total beds/units",type:"number"},{name:"buildingSF",default:"65000",description:"Building SF",type:"number"},{name:"landAcres",default:"4.5",description:"Land acres",type:"number"},{name:"transactionType",default:"Acquisition",description:"Transaction type",type:"select",options:["Acquisition","Development","Repositioning","Refinance"]},{name:"purchasePrice",default:"22000000",description:"Purchase price",type:"currency"},{name:"pricePerUnit",default:"183333",description:"Price per bed/unit",type:"currency"},{name:"closingDate",default:"2025-04-01",description:"Closing date",type:"date"},{name:"holdPeriod",default:"5",description:"Hold period years",type:"number"},{name:"loanAmount",default:"15400000",description:"Senior loan amount",type:"currency"},{name:"ltv",default:"70",description:"Loan to value",type:"percentage"},{name:"interestRate",default:"6.25",description:"Interest rate",type:"percentage"},{name:"amortization",default:"30",description:"Amortization years",type:"number"},{name:"loanTerm",default:"10",description:"Loan term years",type:"number"},{name:"debtService",default:"1138000",description:"Annual debt service",type:"currency"},{name:"mezzAmount",default:"0",description:"Mezzanine amount",type:"currency"},{name:"mezzRate",default:"0",description:"Mezzanine rate",type:"percentage"},{name:"mezzPayment",default:"0",description:"Mezzanine payment",type:"currency"},{name:"totalEquity",default:"6600000",description:"Total equity",type:"currency"},{name:"sponsorEquity",default:"660000",description:"Sponsor equity",type:"currency"},{name:"sponsorPercent",default:"10",description:"Sponsor %",type:"percentage"},{name:"lpEquity",default:"5940000",description:"LP equity",type:"currency"},{name:"lpPercent",default:"90",description:"LP %",type:"percentage"},{name:"year1Occupancy",default:"88",description:"Year 1 occupancy",type:"percentage"},{name:"avgRevenue",default:"285",description:"Average revenue per unit",type:"currency"},{name:"revenueUnit",default:"patient day",description:"Revenue unit",type:"select",options:["patient day","month","year"]},{name:"otherIncome",default:"12000",description:"Monthly other income",type:"currency"},{name:"revenueGrowth",default:"3",description:"Annual revenue growth",type:"percentage"},{name:"totalOpex",default:"9800000",description:"Year 1 operating expenses",type:"currency"},{name:"expenseRatio",default:"82",description:"Expense ratio",type:"percentage"},{name:"expenseGrowth",default:"2.5",description:"Annual expense growth",type:"percentage"},{name:"mgmtFeePercent",default:"5",description:"Management fee %",type:"percentage"},{name:"propertyTaxes",default:"95000",description:"Annual property taxes",type:"currency"},{name:"insurance",default:"185000",description:"Annual insurance",type:"currency"},{name:"capReserves",default:"350",description:"Capital reserves per unit",type:"currency"},{name:"stabilizedOccupancy",default:"93",description:"Stabilized occupancy",type:"percentage"},{name:"monthsToStab",default:"18",description:"Months to stabilization",type:"number"},{name:"stabilizedMargin",default:"20",description:"Stabilized NOI margin",type:"percentage"},{name:"exitCap",default:"10.5",description:"Exit cap rate",type:"percentage"},{name:"salesCosts",default:"2",description:"Sales costs %",type:"percentage"},{name:"projectionYears",default:"10",description:"Projection years",type:"number"},{name:"discountRate",default:"12",description:"Discount rate for NPV",type:"percentage"},{name:"outputFormat",default:"Full Excel model with all schedules and dashboards",description:"Output format",type:"select",options:["Full Excel model with all schedules and dashboards","PowerPoint investment deck","PDF offering memorandum","All formats"]},{name:"additionalContext",default:"",description:"Additional context",type:"textarea"}],tags:["pro-forma","acquisition","investment","returns","complete-model","underwriting"],difficulty:"advanced",estimatedTime:"45-60 min",outputFormats:["excel","powerpoint","pdf","memo"],useCases:["Acquisition underwriting","Investment committee","LP fundraising","Lender presentations"]}].map(a=>({...a,requiredInputs:a.variables.filter(a=>!a.default).map(a=>a.name)}))];a.s(["ALL_TEMPLATES",0,b,"TEMPLATE_CATEGORIES",0,[{id:"all",name:"All Templates",icon:"✨",slug:"all",color:"#4ECDC4"},{id:"Healthcare",name:"Healthcare & Hospice",icon:"🏥",slug:"healthcare",color:"#dc2626"},{id:"Financial Analysis",name:"Financial Analysis",icon:"📊",slug:"financial-analysis",color:"#4ECDC4"},{id:"Investment Research",name:"Investment Research",icon:"🔍",slug:"investment-research",color:"#14b8a6"},{id:"Strategy & Planning",name:"Strategy & Planning",icon:"⚡",slug:"strategy-planning",color:"#8b5cf6"},{id:"M&A & Deal Work",name:"M&A & Deal Work",icon:"🤝",slug:"ma-deal-work",color:"#f97316"},{id:"Professional Reporting",name:"Professional Reporting",icon:"📑",slug:"professional-reporting",color:"#627d98"},{id:"Senior Housing",name:"Senior Housing",icon:"🏠",slug:"senior-housing",color:"#10b981"}]],51677)}];

//# sourceMappingURL=app_components_PromptTemplates_tsx_11340c3c._.js.map