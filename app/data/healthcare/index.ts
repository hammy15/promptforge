// Healthcare Templates Index
// Organizes all templates by service type and business category

import { PromptTemplate } from '../../components/PromptTemplates';
import { HEALTHCARE_TEMPLATES } from './templates';
import { BUSINESS_TEMPLATES } from './business-templates';
import {
  SERVICE_TYPES,
  BUSINESS_CATEGORIES,
  ServiceType,
  BusinessCategory,
  matchQueryToCategories,
  getServiceType,
  getBusinessCategory,
} from './service-types';

// Combine all healthcare templates
export const ALL_HEALTHCARE_TEMPLATES: PromptTemplate[] = [
  ...HEALTHCARE_TEMPLATES,
  ...BUSINESS_TEMPLATES,
];

// Template service type mapping
const TEMPLATE_SERVICE_MAP: Record<string, ServiceType[]> = {
  // Hospice templates
  'hospice-eligibility-general': ['hospice'],
  'hospice-cancer-eligibility': ['hospice'],
  'hospice-heart-failure': ['hospice'],
  'hospice-copd': ['hospice'],
  'hospice-dementia': ['hospice', 'memory-care'],
  'palliative-vs-hospice': ['hospice'],
  'hospital-to-hospice-discharge': ['hospice'],
  'hospice-certification-statement': ['hospice'],
  'pps-assessment-tool': ['hospice', 'snf'],
  'goals-of-care-conversation': ['hospice', 'snf', 'alf'],
  'hospice-symptom-management': ['hospice'],

  // SNF templates
  'snf-pl-analysis': ['snf'],

  // Multi-facility templates
  'healthcare-balance-sheet': ['snf', 'alf', 'il', 'ccrc', 'home-health', 'hospice'],
  'census-analysis': ['snf', 'alf', 'memory-care', 'ccrc'],
  'staffing-analysis': ['snf', 'alf', 'memory-care', 'home-health', 'hospice'],
  'incentive-compensation': ['snf', 'alf', 'il', 'ccrc', 'home-health', 'hospice'],
  'referral-development': ['snf', 'alf', 'memory-care', 'rehab', 'home-health', 'hospice'],

  // M&A templates
  'ma-due-diligence': ['snf', 'alf', 'il', 'ccrc', 'memory-care', 'home-health', 'hospice'],
  'facility-valuation': ['snf', 'alf', 'il', 'ccrc', 'memory-care', 'home-health', 'hospice'],
};

// Template business category mapping
const TEMPLATE_CATEGORY_MAP: Record<string, BusinessCategory[]> = {
  // Clinical templates
  'hospice-eligibility-general': ['clinical'],
  'hospice-cancer-eligibility': ['clinical'],
  'hospice-heart-failure': ['clinical'],
  'hospice-copd': ['clinical'],
  'hospice-dementia': ['clinical'],
  'palliative-vs-hospice': ['clinical'],
  'hospital-to-hospice-discharge': ['clinical', 'operations'],
  'hospice-certification-statement': ['clinical', 'compliance'],
  'pps-assessment-tool': ['clinical'],
  'goals-of-care-conversation': ['clinical'],
  'hospice-symptom-management': ['clinical'],

  // Financial templates
  'snf-pl-analysis': ['finance'],
  'healthcare-balance-sheet': ['finance'],
  'facility-valuation': ['finance', 'ma'],

  // Census/Marketing templates
  'census-analysis': ['census'],
  'referral-development': ['sales', 'census'],

  // M&A templates
  'ma-due-diligence': ['ma'],
  'facility-valuation': ['ma', 'finance'],

  // Staffing templates
  'staffing-analysis': ['staffing'],
  'incentive-compensation': ['staffing', 'finance'],
};

// Get templates by service type
export function getTemplatesByServiceType(serviceType: ServiceType): PromptTemplate[] {
  return ALL_HEALTHCARE_TEMPLATES.filter(template => {
    const serviceTypes = TEMPLATE_SERVICE_MAP[template.id] || [];
    return serviceTypes.includes(serviceType);
  });
}

// Get templates by business category
export function getTemplatesByCategory(category: BusinessCategory): PromptTemplate[] {
  return ALL_HEALTHCARE_TEMPLATES.filter(template => {
    const categories = TEMPLATE_CATEGORY_MAP[template.id] || [];
    return categories.includes(category);
  });
}

// Get templates by both service type and category
export function getFilteredTemplates(
  serviceType: ServiceType | null,
  category: BusinessCategory | null
): PromptTemplate[] {
  if (!serviceType && !category) {
    return ALL_HEALTHCARE_TEMPLATES;
  }

  return ALL_HEALTHCARE_TEMPLATES.filter(template => {
    const serviceTypes = TEMPLATE_SERVICE_MAP[template.id] || [];
    const categories = TEMPLATE_CATEGORY_MAP[template.id] || [];

    const matchesService = !serviceType || serviceTypes.includes(serviceType);
    const matchesCategory = !category || categories.includes(category);

    return matchesService && matchesCategory;
  });
}

// Search templates by query
export function searchTemplates(query: string): PromptTemplate[] {
  if (!query.trim()) {
    return ALL_HEALTHCARE_TEMPLATES;
  }

  const { serviceTypes, businessCategories } = matchQueryToCategories(query);
  const queryLower = query.toLowerCase();

  // Score and rank templates
  const scoredTemplates = ALL_HEALTHCARE_TEMPLATES.map(template => {
    let score = 0;

    // Name match (highest weight)
    if (template.name.toLowerCase().includes(queryLower)) {
      score += 50;
    }

    // Description match
    if (template.description.toLowerCase().includes(queryLower)) {
      score += 25;
    }

    // Tags match
    for (const tag of template.tags || []) {
      if (tag.toLowerCase().includes(queryLower)) {
        score += 15;
      }
    }

    // Service type match
    const templateServiceTypes = TEMPLATE_SERVICE_MAP[template.id] || [];
    for (const st of serviceTypes) {
      if (templateServiceTypes.includes(st)) {
        score += 30;
      }
    }

    // Category match
    const templateCategories = TEMPLATE_CATEGORY_MAP[template.id] || [];
    for (const cat of businessCategories) {
      if (templateCategories.includes(cat)) {
        score += 25;
      }
    }

    return { template, score };
  });

  // Sort by score and return top matches
  return scoredTemplates
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ template }) => template);
}

// Get template by ID
export function getTemplateById(id: string): PromptTemplate | undefined {
  return ALL_HEALTHCARE_TEMPLATES.find(t => t.id === id);
}

// Get service types for a template
export function getTemplateServiceTypes(templateId: string): ServiceType[] {
  return TEMPLATE_SERVICE_MAP[templateId] || [];
}

// Get categories for a template
export function getTemplateCategories(templateId: string): BusinessCategory[] {
  return TEMPLATE_CATEGORY_MAP[templateId] || [];
}

// Export everything
export {
  HEALTHCARE_TEMPLATES,
  BUSINESS_TEMPLATES,
  SERVICE_TYPES,
  BUSINESS_CATEGORIES,
  matchQueryToCategories,
  getServiceType,
  getBusinessCategory,
};

export type { ServiceType, BusinessCategory };

export default {
  ALL_HEALTHCARE_TEMPLATES,
  getTemplatesByServiceType,
  getTemplatesByCategory,
  getFilteredTemplates,
  searchTemplates,
  getTemplateById,
  getTemplateServiceTypes,
  getTemplateCategories,
};
