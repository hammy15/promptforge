// PDF Export Feature for Medicare Hospice Documentation
// Generates professional clinical documentation

import { jsPDF } from 'jspdf';

export interface HospiceDocumentData {
  // Patient Information
  patientName: string;
  patientDOB?: string;
  patientMRN?: string;
  primaryDiagnosis: string;
  secondaryDiagnoses?: string;

  // Assessment Data
  assessmentDate: string;
  assessorName?: string;
  assessorCredentials?: string;

  // Functional Status
  ppsScore?: number;
  kpsScore?: number;
  fastScore?: string;
  ecogScore?: number;
  adlDependencies?: number;

  // Clinical Indicators
  weightChange?: string;
  nutritionalStatus?: string;
  hospitalizations?: string;
  infections?: string;

  // Eligibility
  eligibilityCriteria: {
    criterion: string;
    met: boolean;
    notes?: string;
  }[];
  overallEligible: boolean;
  confidence: 'high' | 'medium' | 'low';

  // Care Goals
  careGoals?: string;
  recommendations?: string[];

  // Generated Prompt/Assessment
  generatedAssessment?: string;
}

export function generateHospicePDF(data: HospiceDocumentData): void {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);
  let yPos = 20;

  // Helper function to add text with word wrap
  const addText = (text: string, fontSize: number = 10, isBold: boolean = false) => {
    doc.setFontSize(fontSize);
    doc.setFont('helvetica', isBold ? 'bold' : 'normal');
    const lines = doc.splitTextToSize(text, contentWidth);

    // Check if we need a new page
    if (yPos + (lines.length * fontSize * 0.4) > doc.internal.pageSize.getHeight() - 20) {
      doc.addPage();
      yPos = 20;
    }

    doc.text(lines, margin, yPos);
    yPos += lines.length * fontSize * 0.4 + 2;
  };

  const addSectionHeader = (title: string) => {
    yPos += 5;
    doc.setFillColor(78, 205, 196); // Turquoise
    doc.rect(margin, yPos - 4, contentWidth, 8, 'F');
    doc.setTextColor(10, 25, 41); // Dark
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(title.toUpperCase(), margin + 2, yPos + 2);
    doc.setTextColor(0, 0, 0);
    yPos += 10;
  };

  const addField = (label: string, value: string | undefined, inline: boolean = false) => {
    if (!value) return;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text(`${label}:`, margin, yPos);
    doc.setFont('helvetica', 'normal');
    const labelWidth = doc.getTextWidth(`${label}: `);

    if (inline) {
      doc.text(value, margin + labelWidth, yPos);
      yPos += 5;
    } else {
      yPos += 4;
      const lines = doc.splitTextToSize(value, contentWidth - 5);
      doc.text(lines, margin + 5, yPos);
      yPos += lines.length * 4 + 2;
    }
  };

  // === DOCUMENT HEADER ===
  doc.setFillColor(10, 25, 41);
  doc.rect(0, 0, pageWidth, 35, 'F');

  doc.setTextColor(78, 205, 196);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('HOSPICE ELIGIBILITY ASSESSMENT', margin, 15);

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Medicare LCD Compliant Documentation', margin, 23);
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, margin, 30);

  doc.setTextColor(0, 0, 0);
  yPos = 45;

  // === ELIGIBILITY STATUS BANNER ===
  const statusColor = data.overallEligible ? [5, 150, 105] : [245, 158, 11]; // Green or Amber
  doc.setFillColor(statusColor[0], statusColor[1], statusColor[2]);
  doc.rect(margin, yPos, contentWidth, 12, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  const statusText = data.overallEligible
    ? `HOSPICE ELIGIBLE - ${data.confidence.toUpperCase()} CONFIDENCE`
    : `ADDITIONAL DOCUMENTATION NEEDED - ${data.confidence.toUpperCase()} CONFIDENCE`;
  doc.text(statusText, pageWidth / 2, yPos + 8, { align: 'center' });
  doc.setTextColor(0, 0, 0);
  yPos += 20;

  // === PATIENT INFORMATION ===
  addSectionHeader('Patient Information');
  addField('Patient Name', data.patientName, true);
  addField('Date of Birth', data.patientDOB, true);
  addField('MRN', data.patientMRN, true);
  addField('Primary Diagnosis', data.primaryDiagnosis, true);
  addField('Secondary Diagnoses', data.secondaryDiagnoses);

  // === ASSESSMENT INFORMATION ===
  addSectionHeader('Assessment Information');
  addField('Assessment Date', data.assessmentDate, true);
  addField('Assessor', data.assessorName, true);
  addField('Credentials', data.assessorCredentials, true);

  // === FUNCTIONAL STATUS ===
  addSectionHeader('Functional Status');

  // Create a table-like display for scores
  const scores = [
    { label: 'PPS Score', value: data.ppsScore?.toString(), range: '0-100%' },
    { label: 'KPS Score', value: data.kpsScore?.toString(), range: '0-100' },
    { label: 'FAST Stage', value: data.fastScore, range: '1-7' },
    { label: 'ECOG', value: data.ecogScore?.toString(), range: '0-5' },
    { label: 'ADL Dependencies', value: data.adlDependencies?.toString(), range: '0-6' },
  ].filter(s => s.value);

  if (scores.length > 0) {
    doc.setFontSize(9);
    let xPos = margin;
    scores.forEach((score, i) => {
      doc.setFont('helvetica', 'bold');
      doc.text(`${score.label}:`, xPos, yPos);
      doc.setFont('helvetica', 'normal');
      doc.text(score.value!, xPos + doc.getTextWidth(`${score.label}: `), yPos);
      xPos += 35;
      if ((i + 1) % 4 === 0) {
        yPos += 5;
        xPos = margin;
      }
    });
    yPos += 8;
  }

  // === CLINICAL INDICATORS ===
  addSectionHeader('Clinical Indicators');
  addField('Weight Change', data.weightChange);
  addField('Nutritional Status', data.nutritionalStatus);
  addField('Recent Hospitalizations', data.hospitalizations);
  addField('Infections', data.infections);

  // === ELIGIBILITY CRITERIA ===
  addSectionHeader('LCD Eligibility Criteria');

  data.eligibilityCriteria.forEach(criterion => {
    const checkmark = criterion.met ? '[X]' : '[ ]';
    const color = criterion.met ? [5, 150, 105] : [220, 38, 38];
    doc.setTextColor(color[0], color[1], color[2]);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text(checkmark, margin, yPos);
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');
    doc.text(criterion.criterion, margin + 10, yPos);
    yPos += 5;

    if (criterion.notes) {
      doc.setFontSize(8);
      doc.setTextColor(100, 100, 100);
      doc.text(`   Notes: ${criterion.notes}`, margin + 10, yPos);
      doc.setTextColor(0, 0, 0);
      yPos += 4;
    }
  });

  // === CARE GOALS ===
  if (data.careGoals) {
    addSectionHeader('Goals of Care');
    addText(data.careGoals);
  }

  // === RECOMMENDATIONS ===
  if (data.recommendations && data.recommendations.length > 0) {
    addSectionHeader('Recommendations');
    data.recommendations.forEach((rec, i) => {
      addText(`${i + 1}. ${rec}`);
    });
  }

  // === GENERATED ASSESSMENT ===
  if (data.generatedAssessment) {
    doc.addPage();
    yPos = 20;
    addSectionHeader('AI-Generated Clinical Assessment');
    doc.setFontSize(9);
    const assessmentLines = doc.splitTextToSize(data.generatedAssessment, contentWidth);

    assessmentLines.forEach((line: string) => {
      if (yPos > doc.internal.pageSize.getHeight() - 20) {
        doc.addPage();
        yPos = 20;
      }
      doc.text(line, margin, yPos);
      yPos += 4;
    });
  }

  // === FOOTER ON ALL PAGES ===
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(
      `Page ${i} of ${totalPages} | Generated by PromptForge | For clinical use only`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    );
  }

  // Save the PDF
  const fileName = `hospice-assessment-${data.patientName.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
}

// Generate print-friendly HTML for browser printing
export function generatePrintHTML(data: HospiceDocumentData): string {
  const metCriteria = data.eligibilityCriteria.filter(c => c.met);
  const unmetCriteria = data.eligibilityCriteria.filter(c => !c.met);

  return `
<!DOCTYPE html>
<html>
<head>
  <title>Hospice Eligibility Assessment - ${data.patientName}</title>
  <style>
    @media print {
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      color: #1a1a1a;
      line-height: 1.5;
    }
    .header {
      background: linear-gradient(135deg, #0a1929, #1a365d);
      color: white;
      padding: 20px;
      margin: -20px -20px 20px -20px;
    }
    .header h1 {
      color: #4ECDC4;
      margin: 0 0 5px 0;
      font-size: 24px;
    }
    .header p {
      margin: 0;
      opacity: 0.8;
      font-size: 14px;
    }
    .status-banner {
      padding: 12px 20px;
      border-radius: 8px;
      text-align: center;
      font-weight: bold;
      font-size: 16px;
      margin-bottom: 20px;
    }
    .status-eligible {
      background: #059669;
      color: white;
    }
    .status-review {
      background: #f59e0b;
      color: white;
    }
    .section {
      margin-bottom: 20px;
      page-break-inside: avoid;
    }
    .section-header {
      background: #4ECDC4;
      color: #0a1929;
      padding: 8px 12px;
      font-weight: bold;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 10px;
    }
    .field {
      display: flex;
      margin-bottom: 8px;
      font-size: 14px;
    }
    .field-label {
      font-weight: 600;
      min-width: 150px;
      color: #4a5568;
    }
    .field-value {
      flex: 1;
    }
    .criteria-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .criteria-item {
      display: flex;
      align-items: flex-start;
      padding: 8px;
      border-radius: 4px;
      margin-bottom: 4px;
    }
    .criteria-met {
      background: #d1fae5;
    }
    .criteria-unmet {
      background: #fee2e2;
    }
    .criteria-check {
      width: 20px;
      height: 20px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 10px;
      font-weight: bold;
      font-size: 12px;
    }
    .check-met {
      background: #059669;
      color: white;
    }
    .check-unmet {
      background: #dc2626;
      color: white;
    }
    .scores-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
    }
    .score-box {
      background: #f7fafc;
      padding: 10px;
      border-radius: 4px;
      text-align: center;
    }
    .score-value {
      font-size: 24px;
      font-weight: bold;
      color: #4ECDC4;
    }
    .score-label {
      font-size: 11px;
      color: #718096;
      text-transform: uppercase;
    }
    .footer {
      margin-top: 30px;
      padding-top: 10px;
      border-top: 1px solid #e2e8f0;
      font-size: 11px;
      color: #a0aec0;
      text-align: center;
    }
    .assessment-text {
      background: #f7fafc;
      padding: 15px;
      border-radius: 8px;
      font-size: 13px;
      white-space: pre-wrap;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>HOSPICE ELIGIBILITY ASSESSMENT</h1>
    <p>Medicare LCD Compliant Documentation | Generated: ${new Date().toLocaleDateString()}</p>
  </div>

  <div class="status-banner ${data.overallEligible ? 'status-eligible' : 'status-review'}">
    ${data.overallEligible
      ? `HOSPICE ELIGIBLE - ${data.confidence.toUpperCase()} CONFIDENCE`
      : `ADDITIONAL DOCUMENTATION NEEDED - ${data.confidence.toUpperCase()} CONFIDENCE`}
  </div>

  <div class="section">
    <div class="section-header">Patient Information</div>
    <div class="field"><span class="field-label">Patient Name:</span><span class="field-value">${data.patientName}</span></div>
    ${data.patientDOB ? `<div class="field"><span class="field-label">Date of Birth:</span><span class="field-value">${data.patientDOB}</span></div>` : ''}
    ${data.patientMRN ? `<div class="field"><span class="field-label">MRN:</span><span class="field-value">${data.patientMRN}</span></div>` : ''}
    <div class="field"><span class="field-label">Primary Diagnosis:</span><span class="field-value">${data.primaryDiagnosis}</span></div>
    ${data.secondaryDiagnoses ? `<div class="field"><span class="field-label">Secondary Diagnoses:</span><span class="field-value">${data.secondaryDiagnoses}</span></div>` : ''}
  </div>

  <div class="section">
    <div class="section-header">Functional Status</div>
    <div class="scores-grid">
      ${data.ppsScore ? `<div class="score-box"><div class="score-value">${data.ppsScore}%</div><div class="score-label">PPS Score</div></div>` : ''}
      ${data.kpsScore ? `<div class="score-box"><div class="score-value">${data.kpsScore}</div><div class="score-label">KPS Score</div></div>` : ''}
      ${data.fastScore ? `<div class="score-box"><div class="score-value">${data.fastScore}</div><div class="score-label">FAST Stage</div></div>` : ''}
      ${data.ecogScore !== undefined ? `<div class="score-box"><div class="score-value">${data.ecogScore}</div><div class="score-label">ECOG</div></div>` : ''}
      ${data.adlDependencies !== undefined ? `<div class="score-box"><div class="score-value">${data.adlDependencies}/6</div><div class="score-label">ADL Dependencies</div></div>` : ''}
    </div>
  </div>

  <div class="section">
    <div class="section-header">Clinical Indicators</div>
    ${data.weightChange ? `<div class="field"><span class="field-label">Weight Change:</span><span class="field-value">${data.weightChange}</span></div>` : ''}
    ${data.nutritionalStatus ? `<div class="field"><span class="field-label">Nutritional Status:</span><span class="field-value">${data.nutritionalStatus}</span></div>` : ''}
    ${data.hospitalizations ? `<div class="field"><span class="field-label">Hospitalizations:</span><span class="field-value">${data.hospitalizations}</span></div>` : ''}
    ${data.infections ? `<div class="field"><span class="field-label">Infections:</span><span class="field-value">${data.infections}</span></div>` : ''}
  </div>

  <div class="section">
    <div class="section-header">LCD Eligibility Criteria</div>
    <ul class="criteria-list">
      ${data.eligibilityCriteria.map(c => `
        <li class="criteria-item ${c.met ? 'criteria-met' : 'criteria-unmet'}">
          <span class="criteria-check ${c.met ? 'check-met' : 'check-unmet'}">${c.met ? '✓' : '✗'}</span>
          <span>${c.criterion}${c.notes ? ` - ${c.notes}` : ''}</span>
        </li>
      `).join('')}
    </ul>
  </div>

  ${data.careGoals ? `
  <div class="section">
    <div class="section-header">Goals of Care</div>
    <p>${data.careGoals}</p>
  </div>
  ` : ''}

  ${data.recommendations && data.recommendations.length > 0 ? `
  <div class="section">
    <div class="section-header">Recommendations</div>
    <ol>
      ${data.recommendations.map(r => `<li>${r}</li>`).join('')}
    </ol>
  </div>
  ` : ''}

  ${data.generatedAssessment ? `
  <div class="section">
    <div class="section-header">AI-Generated Clinical Assessment</div>
    <div class="assessment-text">${data.generatedAssessment}</div>
  </div>
  ` : ''}

  <div class="footer">
    Generated by PromptForge | For clinical use only | ${new Date().toLocaleString()}
  </div>
</body>
</html>
  `;
}

// Open print dialog with formatted HTML
export function printHospiceDocument(data: HospiceDocumentData): void {
  const html = generatePrintHTML(data);
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => printWindow.print(), 250);
  }
}
