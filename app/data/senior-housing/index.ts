// Senior Housing Pro Forma Module
// Comprehensive tools for SNF, ALF, ILF, and CCRC financial analysis

export * from './templates';
export * from './variables';
export * from './glossary';

// Re-export main items for convenience
export { SENIOR_HOUSING_TEMPLATES, SENIOR_HOUSING_CATEGORY } from './templates';
export { FACILITY_TYPES, PAYOR_SOURCES, EXPENSE_CATEGORIES, KPIs, VALUATION_METRICS, COMMON_VARIABLES } from './variables';
export { GLOSSARY, GLOSSARY_CATEGORIES, getGlossaryByCategory, getGlossaryByFacilityType, searchGlossary } from './glossary';

// Module metadata
export const SENIOR_HOUSING_MODULE = {
  name: 'Senior Housing Pro Forma',
  version: '1.0.0',
  description: 'Comprehensive financial analysis templates for Skilled Nursing (SNF), Assisted Living (ALF), Independent Living (ILF), and Continuing Care Retirement Communities (CCRC)',
  author: 'PromptForge',
  features: [
    'Revenue Projection Builder',
    'Operating Expense Analyzer',
    'Census & Occupancy Modeler',
    'Valuation Calculator',
    'NOI & EBITDAR Analyzer',
    'Debt Service Coverage Analyzer',
    'Capital Expenditure Planner',
    'Financial Statement Data Extractor',
    'Sensitivity Analysis Builder',
    'Payor Mix Optimizer',
    'Data Correlation Analyzer',
    'Complete Pro Forma Generator',
  ],
  facilityTypes: ['SNF', 'ALF', 'ILF', 'CCRC'],
  outputFormats: ['Excel', 'PowerPoint', 'PDF', 'Memo'],
};
