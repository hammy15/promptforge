// Healthcare Service Type Definitions and Templates
// Organized by facility type: SNF, ALF, IL, Hospice, Home Health, CCRC, Memory Care, Rehab

export type ServiceType =
  | 'snf'      // Skilled Nursing Facility
  | 'alf'      // Assisted Living Facility
  | 'il'       // Independent Living
  | 'hospice'  // Hospice Care
  | 'home-health' // Home Health
  | 'ccrc'     // Continuing Care Retirement Community
  | 'memory-care' // Memory Care
  | 'rehab';   // Rehabilitation

export type BusinessCategory =
  | 'clinical'    // Clinical operations
  | 'finance'     // P&L, Balance Sheet, Cash Flow
  | 'census'      // Census & Marketing
  | 'ma'          // Mergers & Acquisitions
  | 'sales'       // Sales & Business Development
  | 'compliance'  // Regulatory Compliance
  | 'staffing'    // HR & Staffing
  | 'operations'; // General Operations

export interface ServiceTypeInfo {
  id: ServiceType;
  name: string;
  shortName: string;
  description: string;
  color: string;
  gradient: string;
  icon: string; // Icon key from Icons
  keywords: string[];
}

export interface BusinessCategoryInfo {
  id: BusinessCategory;
  name: string;
  description: string;
  color: string;
  icon: string;
  keywords: string[];
}

export const SERVICE_TYPES: ServiceTypeInfo[] = [
  {
    id: 'snf',
    name: 'Skilled Nursing Facility',
    shortName: 'SNF',
    description: 'Medicare/Medicaid certified facilities providing 24-hour skilled nursing care',
    color: '#2563eb',
    gradient: 'from-blue-600 to-blue-800',
    icon: 'snfBuilding',
    keywords: ['skilled nursing', 'snf', 'nursing home', 'medicare', 'medicaid', 'cms', 'mds', 'pdpm', 'rehab', '5-star'],
  },
  {
    id: 'alf',
    name: 'Assisted Living Facility',
    shortName: 'ALF',
    description: 'Residential care with assistance in daily activities and supervision',
    color: '#7c3aed',
    gradient: 'from-violet-600 to-purple-800',
    icon: 'alfHeart',
    keywords: ['assisted living', 'alf', 'slf', 'personal care', 'residential care', 'level of care'],
  },
  {
    id: 'il',
    name: 'Independent Living',
    shortName: 'IL',
    description: 'Age-restricted communities for active seniors with amenities and services',
    color: '#059669',
    gradient: 'from-emerald-600 to-green-800',
    icon: 'ilHome',
    keywords: ['independent living', 'il', 'senior living', 'active adult', '55+', 'retirement community'],
  },
  {
    id: 'hospice',
    name: 'Hospice Care',
    shortName: 'Hospice',
    description: 'End-of-life care focused on comfort and quality of life',
    color: '#dc2626',
    gradient: 'from-red-600 to-rose-800',
    icon: 'hospiceDove',
    keywords: ['hospice', 'palliative', 'end of life', 'terminal', 'comfort care', 'medicare hospice benefit'],
  },
  {
    id: 'home-health',
    name: 'Home Health Care',
    shortName: 'Home Health',
    description: 'Skilled medical care provided in the patient\'s home',
    color: '#0891b2',
    gradient: 'from-cyan-600 to-teal-800',
    icon: 'homeHealth',
    keywords: ['home health', 'home care', 'pdgm', 'oasis', 'visiting nurse', 'therapy at home'],
  },
  {
    id: 'ccrc',
    name: 'Continuing Care Retirement Community',
    shortName: 'CCRC',
    description: 'Full continuum of care from independent living through skilled nursing',
    color: '#ca8a04',
    gradient: 'from-yellow-600 to-amber-700',
    icon: 'ccrcCampus',
    keywords: ['ccrc', 'life plan community', 'continuing care', 'entrance fee', 'continuum'],
  },
  {
    id: 'memory-care',
    name: 'Memory Care',
    shortName: 'Memory Care',
    description: 'Specialized care for dementia and Alzheimer\'s patients',
    color: '#9333ea',
    gradient: 'from-purple-600 to-fuchsia-800',
    icon: 'memoryBrain',
    keywords: ['memory care', 'dementia', 'alzheimers', 'cognitive', 'secured unit'],
  },
  {
    id: 'rehab',
    name: 'Rehabilitation',
    shortName: 'Rehab',
    description: 'Physical, occupational, and speech therapy services',
    color: '#ea580c',
    gradient: 'from-orange-600 to-red-700',
    icon: 'rehabTherapy',
    keywords: ['rehabilitation', 'rehab', 'pt', 'ot', 'st', 'therapy', 'post-acute', 'recovery'],
  },
];

export const BUSINESS_CATEGORIES: BusinessCategoryInfo[] = [
  {
    id: 'clinical',
    name: 'Clinical Operations',
    description: 'Patient care, assessments, eligibility, and clinical documentation',
    color: '#dc2626',
    icon: 'clinicalHeart',
    keywords: ['clinical', 'patient', 'care', 'assessment', 'eligibility', 'diagnosis', 'treatment'],
  },
  {
    id: 'finance',
    name: 'Finance & Accounting',
    description: 'P&L, balance sheets, cash flow, budgeting, and financial analysis',
    color: '#059669',
    icon: 'financeChart',
    keywords: ['finance', 'financial', 'p&l', 'profit', 'loss', 'budget', 'revenue', 'expenses', 'cash flow', 'balance sheet'],
  },
  {
    id: 'census',
    name: 'Census & Marketing',
    description: 'Occupancy management, lead generation, and marketing strategies',
    color: '#7c3aed',
    icon: 'censusUsers',
    keywords: ['census', 'occupancy', 'marketing', 'leads', 'referrals', 'move-in', 'move-out', 'tours'],
  },
  {
    id: 'ma',
    name: 'Mergers & Acquisitions',
    description: 'Due diligence, valuations, and deal structuring for healthcare M&A',
    color: '#2563eb',
    icon: 'maDeal',
    keywords: ['m&a', 'merger', 'acquisition', 'due diligence', 'valuation', 'deal', 'transaction', 'sale'],
  },
  {
    id: 'sales',
    name: 'Sales & Business Development',
    description: 'Referral development, hospital relations, and business growth',
    color: '#ca8a04',
    icon: 'salesGrowth',
    keywords: ['sales', 'business development', 'referrals', 'hospital', 'physician', 'growth', 'pipeline'],
  },
  {
    id: 'compliance',
    name: 'Regulatory Compliance',
    description: 'CMS regulations, surveys, HIPAA, and quality assurance',
    color: '#0891b2',
    icon: 'complianceShield',
    keywords: ['compliance', 'regulatory', 'cms', 'survey', 'hipaa', 'quality', 'deficiency', 'star rating'],
  },
  {
    id: 'staffing',
    name: 'Staffing & HR',
    description: 'Workforce management, recruitment, retention, and incentives',
    color: '#ea580c',
    icon: 'staffingPeople',
    keywords: ['staffing', 'hr', 'recruitment', 'retention', 'incentive', 'turnover', 'scheduling', 'workforce'],
  },
  {
    id: 'operations',
    name: 'Operations',
    description: 'Day-to-day facility operations, vendor management, and efficiency',
    color: '#64748b',
    icon: 'operationsGear',
    keywords: ['operations', 'operational', 'efficiency', 'vendor', 'supply', 'maintenance', 'process'],
  },
];

// Smart search patterns for matching user intent
export interface SearchPattern {
  pattern: RegExp;
  serviceTypes?: ServiceType[];
  businessCategories?: BusinessCategory[];
  templateIds?: string[];
  score: number; // Higher = better match
}

export const SEARCH_PATTERNS: SearchPattern[] = [
  // Hospice eligibility patterns
  { pattern: /hospice.*(eligib|refer|assess|certif)/i, serviceTypes: ['hospice'], businessCategories: ['clinical'], score: 100 },
  { pattern: /(terminal|end.of.life|palliative|comfort)/i, serviceTypes: ['hospice'], businessCategories: ['clinical'], score: 90 },
  { pattern: /(pps|kps|fast.scale|nyha)/i, serviceTypes: ['hospice'], businessCategories: ['clinical'], score: 85 },
  { pattern: /(cancer|dementia|heart.failure|copd).*(hospice|eligib)/i, serviceTypes: ['hospice'], businessCategories: ['clinical'], score: 95 },

  // SNF patterns
  { pattern: /(snf|skilled.nursing|nursing.home)/i, serviceTypes: ['snf'], score: 90 },
  { pattern: /(mds|pdpm|rug|case.mix)/i, serviceTypes: ['snf'], businessCategories: ['clinical', 'finance'], score: 85 },
  { pattern: /(medicare|medicaid).*(rehab|therapy)/i, serviceTypes: ['snf'], score: 80 },
  { pattern: /(5.star|cms.rating|quality.measure)/i, serviceTypes: ['snf'], businessCategories: ['compliance'], score: 85 },

  // ALF patterns
  { pattern: /(alf|assisted.living|personal.care)/i, serviceTypes: ['alf'], score: 90 },
  { pattern: /(level.of.care|loc|acuity)/i, serviceTypes: ['alf'], businessCategories: ['clinical'], score: 80 },
  { pattern: /(private.pay|resident.assessment)/i, serviceTypes: ['alf'], score: 75 },

  // IL patterns
  { pattern: /(il|independent.living|active.adult|55\+)/i, serviceTypes: ['il'], score: 90 },
  { pattern: /(amenities|lifestyle|social)/i, serviceTypes: ['il'], score: 70 },

  // Home Health patterns
  { pattern: /(home.health|home.care|visiting)/i, serviceTypes: ['home-health'], score: 90 },
  { pattern: /(oasis|pdgm|lupa)/i, serviceTypes: ['home-health'], businessCategories: ['clinical', 'finance'], score: 85 },

  // CCRC patterns
  { pattern: /(ccrc|life.plan|continuing.care|entrance.fee)/i, serviceTypes: ['ccrc'], score: 90 },
  { pattern: /(continuum|lifecycle)/i, serviceTypes: ['ccrc'], score: 75 },

  // Memory Care patterns
  { pattern: /(memory.care|dementia|alzheimer|cognitive)/i, serviceTypes: ['memory-care'], score: 90 },
  { pattern: /(wander|secured|behavior)/i, serviceTypes: ['memory-care'], businessCategories: ['clinical'], score: 80 },

  // Rehab patterns
  { pattern: /(rehab|therapy|pt|ot|st|physical.therapy)/i, serviceTypes: ['rehab'], score: 85 },
  { pattern: /(post.acute|recovery|functional)/i, serviceTypes: ['rehab'], score: 75 },

  // Finance patterns
  { pattern: /(p&l|profit.loss|income.statement)/i, businessCategories: ['finance'], score: 90 },
  { pattern: /(balance.sheet|assets|liabilities)/i, businessCategories: ['finance'], score: 90 },
  { pattern: /(cash.flow|liquidity|working.capital)/i, businessCategories: ['finance'], score: 85 },
  { pattern: /(budget|forecast|projection)/i, businessCategories: ['finance'], score: 80 },
  { pattern: /(revenue|expense|margin|ebitda)/i, businessCategories: ['finance'], score: 80 },

  // Census/Marketing patterns
  { pattern: /(census|occupancy|bed.days)/i, businessCategories: ['census'], score: 90 },
  { pattern: /(marketing|lead|tour|inquiry)/i, businessCategories: ['census'], score: 85 },
  { pattern: /(move.in|move.out|admission)/i, businessCategories: ['census'], score: 80 },
  { pattern: /(referral.source|hospital.liaison)/i, businessCategories: ['census', 'sales'], score: 85 },

  // M&A patterns
  { pattern: /(m&a|merger|acquisition|buyout)/i, businessCategories: ['ma'], score: 95 },
  { pattern: /(due.diligence|dd|valuation)/i, businessCategories: ['ma'], score: 90 },
  { pattern: /(deal|transaction|purchase|sale)/i, businessCategories: ['ma'], score: 80 },
  { pattern: /(loi|letter.of.intent|term.sheet)/i, businessCategories: ['ma'], score: 85 },

  // Sales patterns
  { pattern: /(sales|business.development)/i, businessCategories: ['sales'], score: 85 },
  { pattern: /(referral|relationship|outreach)/i, businessCategories: ['sales'], score: 75 },
  { pattern: /(pipeline|conversion|close.rate)/i, businessCategories: ['sales'], score: 80 },

  // Compliance patterns
  { pattern: /(compliance|regulatory|survey)/i, businessCategories: ['compliance'], score: 90 },
  { pattern: /(deficiency|citation|cms|state)/i, businessCategories: ['compliance'], score: 85 },
  { pattern: /(hipaa|privacy|security)/i, businessCategories: ['compliance'], score: 80 },
  { pattern: /(quality|qi|qapi)/i, businessCategories: ['compliance'], score: 75 },

  // Staffing patterns
  { pattern: /(staff|hiring|recruit|retention)/i, businessCategories: ['staffing'], score: 85 },
  { pattern: /(turnover|vacancy|ppl)/i, businessCategories: ['staffing'], score: 80 },
  { pattern: /(incentive|bonus|compensation)/i, businessCategories: ['staffing'], score: 75 },
  { pattern: /(schedule|shift|overtime)/i, businessCategories: ['staffing'], score: 70 },

  // Operations patterns
  { pattern: /(operations|operational|efficiency)/i, businessCategories: ['operations'], score: 80 },
  { pattern: /(vendor|supply|procurement)/i, businessCategories: ['operations'], score: 75 },
  { pattern: /(maintenance|facility|building)/i, businessCategories: ['operations'], score: 70 },
];

// Helper function to match user query to service types and categories
export function matchQueryToCategories(query: string): {
  serviceTypes: ServiceType[];
  businessCategories: BusinessCategory[];
  confidence: number;
} {
  const results: { serviceTypes: Set<ServiceType>; businessCategories: Set<BusinessCategory>; totalScore: number } = {
    serviceTypes: new Set(),
    businessCategories: new Set(),
    totalScore: 0,
  };

  let matchCount = 0;

  for (const pattern of SEARCH_PATTERNS) {
    if (pattern.pattern.test(query)) {
      matchCount++;
      results.totalScore += pattern.score;

      if (pattern.serviceTypes) {
        pattern.serviceTypes.forEach(st => results.serviceTypes.add(st));
      }
      if (pattern.businessCategories) {
        pattern.businessCategories.forEach(bc => results.businessCategories.add(bc));
      }
    }
  }

  // Also check against service type keywords
  for (const st of SERVICE_TYPES) {
    for (const keyword of st.keywords) {
      if (query.toLowerCase().includes(keyword.toLowerCase())) {
        results.serviceTypes.add(st.id);
        results.totalScore += 50;
        matchCount++;
      }
    }
  }

  // Check against business category keywords
  for (const bc of BUSINESS_CATEGORIES) {
    for (const keyword of bc.keywords) {
      if (query.toLowerCase().includes(keyword.toLowerCase())) {
        results.businessCategories.add(bc.id);
        results.totalScore += 40;
        matchCount++;
      }
    }
  }

  const confidence = matchCount > 0 ? Math.min(results.totalScore / (matchCount * 50), 1) : 0;

  return {
    serviceTypes: Array.from(results.serviceTypes),
    businessCategories: Array.from(results.businessCategories),
    confidence,
  };
}

// Get service type by ID
export function getServiceType(id: ServiceType): ServiceTypeInfo | undefined {
  return SERVICE_TYPES.find(st => st.id === id);
}

// Get business category by ID
export function getBusinessCategory(id: BusinessCategory): BusinessCategoryInfo | undefined {
  return BUSINESS_CATEGORIES.find(bc => bc.id === id);
}

export default {
  SERVICE_TYPES,
  BUSINESS_CATEGORIES,
  SEARCH_PATTERNS,
  matchQueryToCategories,
  getServiceType,
  getBusinessCategory,
};
