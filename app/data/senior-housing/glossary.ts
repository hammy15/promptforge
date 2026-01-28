// Senior Housing Industry Glossary
// Comprehensive definitions of terms used in SNF/ALF/ILF financial analysis

export interface GlossaryTerm {
  term: string;
  abbreviation?: string;
  definition: string;
  category: string;
  facilityTypes: ('snf' | 'alf' | 'ilf' | 'ccrc' | 'all')[];
  relatedTerms?: string[];
  formula?: string;
  example?: string;
}

export const GLOSSARY: GlossaryTerm[] = [
  // Census & Occupancy Terms
  {
    term: 'Average Daily Census',
    abbreviation: 'ADC',
    definition: 'The average number of residents in a facility on any given day during a specified period. Calculated by dividing total patient days by the number of days in the period.',
    category: 'Census',
    facilityTypes: ['all'],
    formula: 'ADC = Total Patient Days / Days in Period',
    example: 'A facility with 3,000 patient days in a 30-day month has an ADC of 100.',
  },
  {
    term: 'Occupancy Rate',
    definition: 'The percentage of available beds or units that are occupied by residents. A key performance indicator for senior housing facilities.',
    category: 'Census',
    facilityTypes: ['all'],
    formula: 'Occupancy Rate = (Census / Licensed Beds) × 100',
    example: '102 residents in a 120-bed facility = 85% occupancy',
  },
  {
    term: 'Patient Days',
    definition: 'The total number of days of care provided. Each day a resident stays in the facility counts as one patient day.',
    category: 'Census',
    facilityTypes: ['snf'],
    formula: 'Patient Days = Census × Days in Period',
    relatedTerms: ['Resident Days', 'ADC'],
  },
  {
    term: 'Length of Stay',
    abbreviation: 'LOS',
    definition: 'The duration a resident stays at a facility, measured from admission to discharge. Can be measured in days, months, or years depending on facility type.',
    category: 'Census',
    facilityTypes: ['all'],
    formula: 'Average LOS = Total Days / Number of Discharges',
  },
  {
    term: 'Census Mix',
    definition: 'The distribution of residents by payor source, acuity level, or other classification. Important for revenue and staffing planning.',
    category: 'Census',
    facilityTypes: ['all'],
    example: 'Medicare 15%, Medicaid 55%, Private Pay 30%',
  },

  // Revenue Terms
  {
    term: 'Per Patient Day',
    abbreviation: 'PPD',
    definition: 'A measurement unit expressing revenue or cost on a per-resident-per-day basis. Standard metric for SNF financial analysis.',
    category: 'Revenue',
    facilityTypes: ['snf'],
    formula: 'Revenue PPD = Total Revenue / Patient Days',
    example: '$12M revenue / 40,000 patient days = $300 PPD',
  },
  {
    term: 'Revenue Per Occupied Unit',
    abbreviation: 'RevPOU',
    definition: 'Average revenue generated per occupied bed or unit. Key metric for comparing performance across facilities.',
    category: 'Revenue',
    facilityTypes: ['all'],
    formula: 'RevPOU = Net Revenue / Occupied Days or Months',
  },
  {
    term: 'Revenue Per Available Bed',
    abbreviation: 'RevPAB',
    definition: 'Average revenue generated per licensed bed, regardless of occupancy. Combines occupancy and rate performance.',
    category: 'Revenue',
    facilityTypes: ['all'],
    formula: 'RevPAB = Net Revenue / (Licensed Beds × Days)',
  },
  {
    term: 'Ancillary Revenue',
    definition: 'Revenue from services beyond basic room and board, such as therapy, pharmacy, beauty salon, or guest meals.',
    category: 'Revenue',
    facilityTypes: ['all'],
    relatedTerms: ['Core Revenue', 'Other Operating Revenue'],
  },
  {
    term: 'Community Fee',
    definition: 'One-time fee charged to new residents upon move-in, common in ALF and ILF. May be partially or fully refundable.',
    category: 'Revenue',
    facilityTypes: ['alf', 'ilf', 'ccrc'],
    example: 'Typically ranges from $1,000 to $5,000 in ALF settings',
  },
  {
    term: 'Entrance Fee',
    definition: 'Large upfront payment required by CCRCs, typically ranging from $100,000 to $1,000,000+. May be fully, partially, or non-refundable.',
    category: 'Revenue',
    facilityTypes: ['ccrc'],
    relatedTerms: ['Life Care Contract', 'Refundable Entrance Fee'],
  },
  {
    term: 'Level of Care Fee',
    abbreviation: 'LOC',
    definition: 'Additional monthly charge based on the amount of care and assistance a resident requires. Tiered based on acuity assessment.',
    category: 'Revenue',
    facilityTypes: ['alf'],
    example: 'Level 1: +$500/mo, Level 2: +$1,000/mo, Level 3: +$1,800/mo',
  },

  // Payor Terms
  {
    term: 'Medicare Part A',
    definition: 'Federal health insurance for skilled nursing care following a qualifying hospital stay. Covers up to 100 days per benefit period with co-pays after day 20.',
    category: 'Payor',
    facilityTypes: ['snf'],
    relatedTerms: ['PDPM', 'RUG-IV', 'Skilled Nursing Benefit'],
  },
  {
    term: 'Medicare Advantage',
    abbreviation: 'MA',
    definition: 'Private insurance plans that contract with Medicare to provide Part A and B benefits. Rates negotiated with each plan, typically lower than traditional Medicare.',
    category: 'Payor',
    facilityTypes: ['snf'],
    relatedTerms: ['Managed Care', 'Medicare Part C'],
  },
  {
    term: 'Medicaid',
    definition: 'Joint federal-state program providing healthcare coverage for low-income individuals. Primary payor for long-term nursing home care. Rates set by each state.',
    category: 'Payor',
    facilityTypes: ['snf', 'alf'],
    relatedTerms: ['State Plan', 'Medicaid Waiver', 'PACE'],
  },
  {
    term: 'Private Pay',
    definition: 'Residents paying for their care out-of-pocket or through private insurance, rather than through government programs.',
    category: 'Payor',
    facilityTypes: ['all'],
    relatedTerms: ['Self-Pay', 'Out-of-Pocket'],
  },
  {
    term: 'Payor Mix',
    definition: 'The distribution of residents by payment source, typically expressed as percentages of census or revenue.',
    category: 'Payor',
    facilityTypes: ['all'],
    example: 'Medicare 18%, MA 10%, Medicaid 52%, Private 20%',
  },
  {
    term: 'PDPM',
    abbreviation: 'PDPM',
    definition: 'Patient-Driven Payment Model - CMS reimbursement system for SNFs effective October 2019. Classifies patients into payment groups based on clinical characteristics rather than therapy minutes.',
    category: 'Payor',
    facilityTypes: ['snf'],
    relatedTerms: ['Case Mix', 'RUG-IV', 'CMI'],
  },
  {
    term: 'Case Mix Index',
    abbreviation: 'CMI',
    definition: 'A measure of the average acuity of patients, affecting Medicare reimbursement. Higher CMI indicates more complex patients and higher reimbursement.',
    category: 'Payor',
    facilityTypes: ['snf'],
    formula: 'CMI = Sum of Case Mix Weights / Patient Days',
  },

  // Expense Terms
  {
    term: 'Cost Per Patient Day',
    abbreviation: 'CPPD',
    definition: 'Total operating costs divided by patient days. Key benchmark for expense management.',
    category: 'Expenses',
    facilityTypes: ['snf'],
    formula: 'CPPD = Total Operating Expenses / Patient Days',
  },
  {
    term: 'Nursing Hours Per Patient Day',
    abbreviation: 'HPPD or NHPPD',
    definition: 'Total nursing hours (RN, LPN, CNA) divided by patient days. Key quality and staffing metric with state minimum requirements.',
    category: 'Expenses',
    facilityTypes: ['snf'],
    formula: 'HPPD = (RN Hours + LPN Hours + CNA Hours) / Census',
    example: '4.0 HPPD means 4 hours of nursing care per resident per day',
  },
  {
    term: 'Agency Utilization',
    definition: 'Use of temporary/contract staffing agencies to fill nursing and other positions. Typically more expensive than permanent staff.',
    category: 'Expenses',
    facilityTypes: ['snf', 'alf'],
    relatedTerms: ['Contract Labor', 'Travel Nurses'],
  },
  {
    term: 'Raw Food Cost',
    definition: 'Cost of food ingredients before labor and other dietary department expenses. Typically $6-10 PPD in SNFs.',
    category: 'Expenses',
    facilityTypes: ['all'],
    example: 'Raw food $8.50 PPD, dietary labor $6 PPD, total dietary $14.50 PPD',
  },
  {
    term: 'Operating Expense Ratio',
    definition: 'Operating expenses as a percentage of revenue. Lower ratio indicates better operational efficiency.',
    category: 'Expenses',
    facilityTypes: ['all'],
    formula: 'OpEx Ratio = Operating Expenses / Net Revenue',
    example: '82% expense ratio means $0.82 of every revenue dollar goes to expenses',
  },

  // Profitability Terms
  {
    term: 'Net Operating Income',
    abbreviation: 'NOI',
    definition: 'Revenue minus operating expenses, before debt service, capital expenditures, and income taxes. Primary measure of property-level profitability.',
    category: 'Profitability',
    facilityTypes: ['all'],
    formula: 'NOI = Net Revenue - Operating Expenses',
    relatedTerms: ['EBITDA', 'EBITDAR', 'Cash Flow'],
  },
  {
    term: 'EBITDA',
    abbreviation: 'EBITDA',
    definition: 'Earnings Before Interest, Taxes, Depreciation, and Amortization. Measure of operating performance before capital structure effects.',
    category: 'Profitability',
    facilityTypes: ['all'],
    formula: 'EBITDA = Net Income + Interest + Taxes + Depreciation + Amortization',
  },
  {
    term: 'EBITDAR',
    abbreviation: 'EBITDAR',
    definition: 'EBITDA plus Rent expense. Used when comparing owned vs. leased facilities or for operators without real estate ownership.',
    category: 'Profitability',
    facilityTypes: ['all'],
    formula: 'EBITDAR = EBITDA + Rent Expense',
    relatedTerms: ['Facility EBITDA', 'OpCo EBITDA'],
  },
  {
    term: 'EBITDARM',
    abbreviation: 'EBITDARM',
    definition: 'EBITDAR plus Management fees. Adds back management fees for comparison across different management structures.',
    category: 'Profitability',
    facilityTypes: ['all'],
    formula: 'EBITDARM = EBITDAR + Management Fee',
  },
  {
    term: 'NOI Margin',
    definition: 'NOI as a percentage of revenue. Indicates how much of each revenue dollar converts to NOI.',
    category: 'Profitability',
    facilityTypes: ['all'],
    formula: 'NOI Margin = NOI / Net Revenue × 100',
    example: '18% NOI margin means $0.18 NOI per $1.00 of revenue',
  },

  // Valuation Terms
  {
    term: 'Capitalization Rate',
    abbreviation: 'Cap Rate',
    definition: 'The ratio of NOI to property value, used to estimate value from income. Lower cap rates indicate higher values.',
    category: 'Valuation',
    facilityTypes: ['all'],
    formula: 'Cap Rate = NOI / Value; or Value = NOI / Cap Rate',
    example: '$2M NOI at 10% cap = $20M value',
  },
  {
    term: 'Price Per Bed',
    abbreviation: 'PPB',
    definition: 'Transaction price divided by number of beds/units. Common metric for comparing deals.',
    category: 'Valuation',
    facilityTypes: ['all'],
    formula: 'PPB = Purchase Price / Licensed Beds',
    example: '$20M for 120 beds = $167K per bed',
  },
  {
    term: 'EBITDAR Multiple',
    definition: 'Purchase price divided by EBITDAR. Alternative valuation metric to cap rate.',
    category: 'Valuation',
    facilityTypes: ['all'],
    formula: 'Multiple = Price / EBITDAR',
    example: '$20M / $2.5M EBITDAR = 8.0x multiple',
  },
  {
    term: 'Replacement Cost',
    definition: 'The estimated cost to build an equivalent new facility. Used as a value ceiling and for development feasibility.',
    category: 'Valuation',
    facilityTypes: ['all'],
    relatedTerms: ['Cost Approach', 'Depreciation'],
  },

  // Financing Terms
  {
    term: 'Debt Service Coverage Ratio',
    abbreviation: 'DSCR',
    definition: 'NOI divided by annual debt service. Measures ability to pay debt obligations. Lenders typically require 1.25x-1.50x minimum.',
    category: 'Financing',
    facilityTypes: ['all'],
    formula: 'DSCR = NOI / Annual Debt Service',
    example: '$2M NOI / $1.3M debt service = 1.54x DSCR',
  },
  {
    term: 'Loan-to-Value Ratio',
    abbreviation: 'LTV',
    definition: 'Loan amount divided by property value. Measures leverage. Senior housing typically finances at 65-80% LTV.',
    category: 'Financing',
    facilityTypes: ['all'],
    formula: 'LTV = Loan Amount / Appraised Value',
    example: '$15M loan on $20M property = 75% LTV',
  },
  {
    term: 'HUD 232',
    definition: 'FHA-insured mortgage program for nursing homes and assisted living. Offers long terms (35 years), low rates, and high leverage.',
    category: 'Financing',
    facilityTypes: ['snf', 'alf'],
    relatedTerms: ['FHA Insurance', 'HUD 232/223(f)', 'HUD 232/241'],
  },
  {
    term: 'CMBS',
    definition: 'Commercial Mortgage-Backed Securities. Loans pooled and sold to investors. Common financing source for senior housing.',
    category: 'Financing',
    facilityTypes: ['all'],
    relatedTerms: ['Securitization', 'Special Servicer'],
  },

  // Quality & Regulatory Terms
  {
    term: 'Five-Star Rating',
    definition: 'CMS quality rating system for nursing homes, combining health inspections, staffing, and quality measures. 1 star = much below average, 5 stars = much above average.',
    category: 'Quality',
    facilityTypes: ['snf'],
    relatedTerms: ['CMS Compare', 'Nursing Home Compare'],
  },
  {
    term: 'Survey',
    definition: 'State or federal inspection of facility compliance with regulations. Deficiencies can result in fines, bans on admissions, or decertification.',
    category: 'Quality',
    facilityTypes: ['snf', 'alf'],
    relatedTerms: ['Deficiency', 'Plan of Correction', 'IJ (Immediate Jeopardy)'],
  },
  {
    term: 'Certificate of Need',
    abbreviation: 'CON',
    definition: 'State regulatory approval required before building new beds or making major capital investments in some states. Creates supply barriers.',
    category: 'Quality',
    facilityTypes: ['snf', 'alf'],
    example: 'Texas does not have CON; New York has strict CON requirements',
  },

  // Investment Terms
  {
    term: 'Internal Rate of Return',
    abbreviation: 'IRR',
    definition: 'The discount rate that makes NPV of all cash flows equal to zero. Annualized return accounting for timing of cash flows.',
    category: 'Investment',
    facilityTypes: ['all'],
    relatedTerms: ['NPV', 'Equity Multiple', 'Cash-on-Cash'],
  },
  {
    term: 'Equity Multiple',
    definition: 'Total distributions divided by equity invested. Simple measure of total return without considering timing.',
    category: 'Investment',
    facilityTypes: ['all'],
    formula: 'Equity Multiple = Total Distributions / Total Equity Invested',
    example: '$12M distributions on $6M equity = 2.0x multiple',
  },
  {
    term: 'Cash-on-Cash Return',
    abbreviation: 'CoC',
    definition: 'Annual cash flow divided by equity invested. Measures current yield on equity.',
    category: 'Investment',
    facilityTypes: ['all'],
    formula: 'CoC = Annual Cash Flow / Equity Invested',
    example: '$600K cash flow on $6M equity = 10% cash-on-cash',
  },
  {
    term: 'Waterfall',
    definition: 'The distribution hierarchy defining how cash flows are split between investors. Typically includes preferred returns and promote tiers.',
    category: 'Investment',
    facilityTypes: ['all'],
    relatedTerms: ['Preferred Return', 'Promote', 'GP/LP Split'],
  },
];

// Get glossary by category
export function getGlossaryByCategory(category: string): GlossaryTerm[] {
  return GLOSSARY.filter(term => term.category === category);
}

// Get glossary by facility type
export function getGlossaryByFacilityType(facilityType: 'snf' | 'alf' | 'ilf' | 'ccrc'): GlossaryTerm[] {
  return GLOSSARY.filter(term =>
    term.facilityTypes.includes(facilityType) || term.facilityTypes.includes('all')
  );
}

// Search glossary
export function searchGlossary(query: string): GlossaryTerm[] {
  const lowerQuery = query.toLowerCase();
  return GLOSSARY.filter(term =>
    term.term.toLowerCase().includes(lowerQuery) ||
    term.abbreviation?.toLowerCase().includes(lowerQuery) ||
    term.definition.toLowerCase().includes(lowerQuery)
  );
}

// Get categories list
export const GLOSSARY_CATEGORIES = [
  'Census',
  'Revenue',
  'Payor',
  'Expenses',
  'Profitability',
  'Valuation',
  'Financing',
  'Quality',
  'Investment',
];

export default GLOSSARY;
