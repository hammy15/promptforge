// Senior Housing Industry Variables
// Common variable definitions for SNF/ALF/ILF pro forma analysis

export interface VariableDefinition {
  name: string;
  label: string;
  description: string;
  type: 'text' | 'number' | 'currency' | 'percentage' | 'date' | 'select';
  category: string;
  defaultValue: string | number;
  options?: string[];
  min?: number;
  max?: number;
  facilityTypes: ('snf' | 'alf' | 'ilf' | 'ccrc')[];
}

// Facility Type Definitions
export const FACILITY_TYPES = {
  snf: {
    name: 'Skilled Nursing Facility (SNF)',
    abbreviation: 'SNF',
    description: 'Licensed healthcare facility providing 24/7 skilled nursing care, rehabilitation, and medical services',
    typicalBeds: { min: 60, max: 200, average: 120 },
    typicalOccupancy: { min: 75, max: 95, average: 85 },
    revenueUnit: 'per patient day (PPD)',
    regulatoryBody: 'CMS, State Health Department',
  },
  alf: {
    name: 'Assisted Living Facility (ALF)',
    abbreviation: 'ALF',
    description: 'Residential facility providing personal care, assistance with daily activities, and some health services',
    typicalBeds: { min: 40, max: 150, average: 80 },
    typicalOccupancy: { min: 80, max: 95, average: 88 },
    revenueUnit: 'per unit per month',
    regulatoryBody: 'State licensing agency',
  },
  ilf: {
    name: 'Independent Living Facility (ILF)',
    abbreviation: 'ILF',
    description: 'Age-restricted housing with optional services and amenities for active seniors',
    typicalBeds: { min: 80, max: 300, average: 150 },
    typicalOccupancy: { min: 85, max: 98, average: 92 },
    revenueUnit: 'per unit per month',
    regulatoryBody: 'Local housing authority, minimal healthcare regulation',
  },
  ccrc: {
    name: 'Continuing Care Retirement Community (CCRC)',
    abbreviation: 'CCRC',
    description: 'Campus offering full continuum of care from independent living through skilled nursing',
    typicalBeds: { min: 150, max: 500, average: 300 },
    typicalOccupancy: { min: 85, max: 95, average: 90 },
    revenueUnit: 'mixed (entrance fees + monthly)',
    regulatoryBody: 'State insurance/CCRC regulatory agency',
  },
};

// Payor Sources by Facility Type
export const PAYOR_SOURCES = {
  snf: [
    { code: 'medicare_a', name: 'Medicare Part A', description: 'Traditional Medicare skilled nursing benefit', typicalPercent: 15, typicalPPD: 650 },
    { code: 'medicare_advantage', name: 'Medicare Advantage', description: 'Medicare managed care plans', typicalPercent: 10, typicalPPD: 425 },
    { code: 'medicaid', name: 'Medicaid', description: 'State Medicaid program', typicalPercent: 55, typicalPPD: 225 },
    { code: 'private_pay', name: 'Private Pay', description: 'Self-pay and private insurance', typicalPercent: 15, typicalPPD: 350 },
    { code: 'va', name: 'VA/Tricare', description: 'Veterans and military benefits', typicalPercent: 3, typicalPPD: 400 },
    { code: 'managed_medicaid', name: 'Managed Medicaid', description: 'Medicaid managed care plans', typicalPercent: 2, typicalPPD: 235 },
  ],
  alf: [
    { code: 'private_pay', name: 'Private Pay', description: 'Self-pay residents', typicalPercent: 85, typicalMonthly: 5500 },
    { code: 'ltc_insurance', name: 'LTC Insurance', description: 'Long-term care insurance', typicalPercent: 10, typicalMonthly: 5200 },
    { code: 'medicaid_waiver', name: 'Medicaid Waiver', description: 'State Medicaid waiver program', typicalPercent: 5, typicalMonthly: 3800 },
  ],
  ilf: [
    { code: 'private_pay', name: 'Private Pay', description: 'Self-pay residents', typicalPercent: 98, typicalMonthly: 3500 },
    { code: 'hud_section8', name: 'HUD/Section 8', description: 'Subsidized housing (affordable only)', typicalPercent: 2, typicalMonthly: 1800 },
  ],
};

// Common Operating Expense Categories
export const EXPENSE_CATEGORIES = {
  labor: {
    name: 'Labor & Benefits',
    subcategories: [
      { name: 'Nursing', departments: ['RN', 'LPN', 'CNA'], typicalPercent: 35 },
      { name: 'Dietary', departments: ['Cooks', 'Dietary Aides'], typicalPercent: 6 },
      { name: 'Housekeeping', departments: ['Housekeepers', 'Laundry'], typicalPercent: 4 },
      { name: 'Maintenance', departments: ['Maintenance Techs'], typicalPercent: 3 },
      { name: 'Activities', departments: ['Activity Directors', 'Aides'], typicalPercent: 2 },
      { name: 'Administration', departments: ['Administrator', 'Office Staff'], typicalPercent: 5 },
      { name: 'Social Services', departments: ['Social Workers'], typicalPercent: 1 },
    ],
    typicalPercentOfRevenue: { snf: 55, alf: 45, ilf: 35 },
  },
  supplies: {
    name: 'Supplies & Materials',
    subcategories: [
      { name: 'Medical Supplies', typicalPPD: { snf: 12, alf: 3, ilf: 0 } },
      { name: 'Raw Food', typicalPPD: { snf: 8.5, alf: 7, ilf: 5 } },
      { name: 'Housekeeping Supplies', typicalPPD: { snf: 1.5, alf: 1.2, ilf: 1 } },
      { name: 'Office Supplies', typicalPPD: { snf: 0.75, alf: 0.5, ilf: 0.3 } },
    ],
  },
  services: {
    name: 'Purchased Services',
    subcategories: [
      { name: 'Contract Therapy', description: 'PT, OT, Speech therapy' },
      { name: 'Contract Nursing', description: 'Agency/travel nurses' },
      { name: 'Medical Director', description: 'Physician services' },
      { name: 'Professional Services', description: 'Legal, accounting, consulting' },
      { name: 'IT Services', description: 'Technology support' },
    ],
  },
  facility: {
    name: 'Facility Costs',
    subcategories: [
      { name: 'Utilities', components: ['Electric', 'Gas', 'Water', 'Sewer', 'Trash'] },
      { name: 'Property Insurance', description: 'Property and casualty' },
      { name: 'Liability Insurance', description: 'Professional and general liability' },
      { name: 'Property Taxes', description: 'Real estate taxes' },
      { name: 'Repairs & Maintenance', description: 'Building and equipment' },
    ],
  },
  administrative: {
    name: 'Administrative',
    subcategories: [
      { name: 'Management Fee', typicalPercent: { snf: 5, alf: 5, ilf: 4 } },
      { name: 'Marketing', description: 'Advertising and sales' },
      { name: 'Travel & Entertainment', description: 'Business travel' },
      { name: 'Licenses & Permits', description: 'Regulatory fees' },
      { name: 'Bad Debt', typicalPercent: { snf: 1.5, alf: 0.5, ilf: 0.3 } },
    ],
  },
};

// Key Performance Indicators
export const KPIs = {
  occupancy: {
    snf: [
      { name: 'Occupancy Rate', formula: 'Census / Licensed Beds', benchmark: { low: 80, avg: 88, high: 95 } },
      { name: 'Medicare Days Mix', formula: 'Medicare Days / Total Days', benchmark: { low: 10, avg: 18, high: 25 } },
      { name: 'Average Length of Stay', formula: 'Total Days / Discharges', unit: 'days', benchmark: { low: 20, avg: 35, high: 60 } },
    ],
    alf: [
      { name: 'Occupancy Rate', formula: 'Units Occupied / Total Units', benchmark: { low: 82, avg: 89, high: 95 } },
      { name: 'Average Length of Stay', formula: 'Total Days / Move-outs', unit: 'months', benchmark: { low: 18, avg: 30, high: 48 } },
      { name: 'Level of Care Mix', formula: 'LOC Revenue / Base Revenue', benchmark: { low: 15, avg: 25, high: 40 } },
    ],
    ilf: [
      { name: 'Occupancy Rate', formula: 'Units Occupied / Total Units', benchmark: { low: 88, avg: 93, high: 98 } },
      { name: 'Average Length of Stay', formula: 'Total Days / Move-outs', unit: 'years', benchmark: { low: 4, avg: 7, high: 12 } },
      { name: 'Service Attachment Rate', formula: 'Service Users / Total Residents', benchmark: { low: 30, avg: 50, high: 70 } },
    ],
  },
  financial: {
    all: [
      { name: 'Revenue Per Occupied Unit', formula: 'Net Revenue / Occupied Days', unit: 'currency' },
      { name: 'Operating Expense Ratio', formula: 'Operating Expenses / Revenue', unit: 'percent', benchmark: { low: 75, avg: 82, high: 88 } },
      { name: 'NOI Margin', formula: 'NOI / Revenue', unit: 'percent', benchmark: { low: 12, avg: 18, high: 25 } },
      { name: 'EBITDAR Margin', formula: 'EBITDAR / Revenue', unit: 'percent', benchmark: { low: 18, avg: 24, high: 32 } },
      { name: 'Labor Cost Ratio', formula: 'Labor Cost / Revenue', unit: 'percent', benchmark: { snf: 55, alf: 45, ilf: 35 } },
    ],
  },
  quality: {
    snf: [
      { name: 'CMS Star Rating', scale: '1-5', benchmark: { low: 2, avg: 3, high: 5 } },
      { name: 'Nursing Hours PPD', formula: 'Total Nursing Hours / Census', benchmark: { low: 3.5, avg: 4.2, high: 5.0 } },
      { name: 'RN Hours PPD', formula: 'RN Hours / Census', benchmark: { low: 0.5, avg: 0.75, high: 1.2 } },
      { name: 'Hospital Readmission Rate', unit: 'percent', benchmark: { low: 15, avg: 22, high: 30 } },
    ],
  },
};

// Valuation Metrics
export const VALUATION_METRICS = {
  capRates: {
    snf: { low: 9.0, avg: 10.5, high: 12.5 },
    alf: { low: 6.0, avg: 7.5, high: 9.5 },
    ilf: { low: 5.5, avg: 6.5, high: 8.0 },
    ccrc: { low: 6.5, avg: 8.0, high: 10.0 },
  },
  pricePerBed: {
    snf: { low: 50000, avg: 100000, high: 200000 },
    alf: { low: 100000, avg: 175000, high: 300000 },
    ilf: { low: 150000, avg: 250000, high: 400000 },
    ccrc: { low: 200000, avg: 350000, high: 600000 },
  },
  ebitdarMultiples: {
    snf: { low: 5.5, avg: 7.0, high: 9.0 },
    alf: { low: 8.0, avg: 10.5, high: 14.0 },
    ilf: { low: 10.0, avg: 13.0, high: 17.0 },
    ccrc: { low: 7.5, avg: 10.0, high: 13.0 },
  },
};

// Common Variables List
export const COMMON_VARIABLES: VariableDefinition[] = [
  // Facility Information
  { name: 'facilityName', label: 'Facility Name', description: 'Name of the facility', type: 'text', category: 'facility', defaultValue: '', facilityTypes: ['snf', 'alf', 'ilf', 'ccrc'] },
  { name: 'facilityType', label: 'Facility Type', description: 'Type of senior housing facility', type: 'select', category: 'facility', defaultValue: 'snf', options: ['snf', 'alf', 'ilf', 'ccrc'], facilityTypes: ['snf', 'alf', 'ilf', 'ccrc'] },
  { name: 'licensedBeds', label: 'Licensed Beds/Units', description: 'Total licensed capacity', type: 'number', category: 'facility', defaultValue: 120, min: 1, max: 1000, facilityTypes: ['snf', 'alf', 'ilf', 'ccrc'] },
  { name: 'yearBuilt', label: 'Year Built', description: 'Year facility was constructed', type: 'number', category: 'facility', defaultValue: 2000, min: 1950, max: 2030, facilityTypes: ['snf', 'alf', 'ilf', 'ccrc'] },

  // Census & Occupancy
  { name: 'currentCensus', label: 'Current Census', description: 'Current number of residents', type: 'number', category: 'census', defaultValue: 100, min: 0, facilityTypes: ['snf', 'alf', 'ilf', 'ccrc'] },
  { name: 'occupancyRate', label: 'Occupancy Rate', description: 'Current occupancy percentage', type: 'percentage', category: 'census', defaultValue: 85, min: 0, max: 100, facilityTypes: ['snf', 'alf', 'ilf', 'ccrc'] },
  { name: 'stabilizedOccupancy', label: 'Stabilized Occupancy', description: 'Target stabilized occupancy', type: 'percentage', category: 'census', defaultValue: 92, min: 0, max: 100, facilityTypes: ['snf', 'alf', 'ilf', 'ccrc'] },

  // Financial
  { name: 'grossRevenue', label: 'Gross Revenue', description: 'Annual gross revenue', type: 'currency', category: 'financial', defaultValue: 12000000, facilityTypes: ['snf', 'alf', 'ilf', 'ccrc'] },
  { name: 'netRevenue', label: 'Net Revenue', description: 'Net revenue after deductions', type: 'currency', category: 'financial', defaultValue: 11000000, facilityTypes: ['snf', 'alf', 'ilf', 'ccrc'] },
  { name: 'operatingExpenses', label: 'Operating Expenses', description: 'Total operating expenses', type: 'currency', category: 'financial', defaultValue: 9000000, facilityTypes: ['snf', 'alf', 'ilf', 'ccrc'] },
  { name: 'noi', label: 'Net Operating Income', description: 'NOI = Net Revenue - Operating Expenses', type: 'currency', category: 'financial', defaultValue: 2000000, facilityTypes: ['snf', 'alf', 'ilf', 'ccrc'] },
  { name: 'ebitdar', label: 'EBITDAR', description: 'Earnings before interest, taxes, depreciation, amortization, and rent', type: 'currency', category: 'financial', defaultValue: 2500000, facilityTypes: ['snf', 'alf', 'ilf', 'ccrc'] },

  // Valuation
  { name: 'capRate', label: 'Cap Rate', description: 'Capitalization rate for valuation', type: 'percentage', category: 'valuation', defaultValue: 10, min: 4, max: 15, facilityTypes: ['snf', 'alf', 'ilf', 'ccrc'] },
  { name: 'purchasePrice', label: 'Purchase Price', description: 'Acquisition price', type: 'currency', category: 'valuation', defaultValue: 20000000, facilityTypes: ['snf', 'alf', 'ilf', 'ccrc'] },
  { name: 'pricePerBed', label: 'Price Per Bed/Unit', description: 'Purchase price per bed or unit', type: 'currency', category: 'valuation', defaultValue: 166667, facilityTypes: ['snf', 'alf', 'ilf', 'ccrc'] },
];

export default COMMON_VARIABLES;
