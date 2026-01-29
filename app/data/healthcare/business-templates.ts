// Healthcare Business & Finance Templates
// M&A, Sales, Marketing, Census, P&L, Balance Sheet, Staffing, Operations

import { PromptTemplate } from '../../components/PromptTemplates';

export const BUSINESS_TEMPLATES: PromptTemplate[] = [
  // ============================================
  // FINANCIAL ANALYSIS
  // ============================================
  {
    id: 'snf-pl-analysis',
    name: 'SNF P&L Analysis',
    description: 'Comprehensive profit & loss analysis for skilled nursing facilities with Medicare/Medicaid mix',
    category: 'Healthcare',
    categorySlug: 'healthcare',
    icon: '📊',
    prompt: `## Skilled Nursing Facility P&L Analysis

**Facility Information:**
- Facility Name: {{facility_name}}
- Licensed Beds: {{licensed_beds}}
- Certified Beds (Medicare/Medicaid): {{certified_beds}}
- Analysis Period: {{analysis_period}}
- State: {{state}}

**Census Data:**
- Average Daily Census: {{adc}}
- Occupancy Rate: {{occupancy_rate}}%
- Medicare Days: {{medicare_days}} ({{medicare_pct}}%)
- Medicaid Days: {{medicaid_days}} ({{medicaid_pct}}%)
- Private Pay Days: {{private_days}} ({{private_pct}}%)
- Other Payer Days: {{other_days}} ({{other_pct}}%)

**Revenue:**
- Total Revenue: \${{total_revenue}}
- Medicare Revenue: \${{medicare_revenue}}
- Medicaid Revenue: \${{medicaid_revenue}}
- Private Pay Revenue: \${{private_revenue}}
- Other Revenue: \${{other_revenue}}

**Expenses:**
- Total Labor: \${{total_labor}} ({{labor_pct}}% of revenue)
- Nursing Wages: \${{nursing_wages}}
- Other Wages: \${{other_wages}}
- Benefits: \${{benefits}}
- Contract Labor: \${{contract_labor}}
- Total Non-Labor: \${{total_non_labor}}
- Food/Dietary: \${{food_expense}}
- Supplies: \${{supplies}}
- Utilities: \${{utilities}}
- Insurance: \${{insurance}}
- Property/Lease: \${{property}}
- Management Fee: \${{management_fee}}
- Other Operating: \${{other_operating}}

**Key Metrics:**
- EBITDA: \${{ebitda}}
- EBITDA Margin: {{ebitda_margin}}%
- Revenue Per Patient Day: \${{rppd}}
- Cost Per Patient Day: \${{cppd}}
- Nursing HPPD: {{nursing_hppd}}

---

**Please provide a comprehensive P&L analysis including:**

1. **Revenue Analysis**
   - Revenue per patient day by payer class
   - Comparison to regional benchmarks
   - Payer mix optimization opportunities
   - PDPM case-mix analysis (if applicable)

2. **Expense Analysis**
   - Labor cost per patient day vs. benchmarks
   - Staffing efficiency (HPPD analysis)
   - Non-labor expense trends
   - Contract labor utilization
   - Expense per patient day breakdown

3. **Profitability Metrics**
   - EBITDA analysis and margin
   - Operating margin trends
   - Contribution margin by payer
   - Fixed vs. variable cost structure

4. **Benchmark Comparison**
   - Compare to state/regional averages
   - Identify variance from benchmarks
   - Performance quintile ranking

5. **Actionable Recommendations**
   - Revenue enhancement opportunities
   - Cost reduction strategies
   - Staffing optimization
   - Payer mix improvement
   - Operational efficiency gains

6. **Financial Projections**
   - Projected impact of recommendations
   - Break-even analysis
   - Sensitivity analysis

Format as executive financial summary suitable for board presentation.`,
    variables: [
      { name: 'facility_name', default: '', description: 'Facility name', type: 'text' },
      { name: 'licensed_beds', default: '', description: 'Licensed beds', type: 'number' },
      { name: 'certified_beds', default: '', description: 'Medicare/Medicaid certified beds', type: 'number' },
      { name: 'analysis_period', default: '', description: 'Analysis period (e.g., Q1 2024)', type: 'text' },
      { name: 'state', default: '', description: 'State', type: 'text' },
      { name: 'adc', default: '', description: 'Average daily census', type: 'number' },
      { name: 'occupancy_rate', default: '', description: 'Occupancy rate %', type: 'percentage' },
      { name: 'medicare_days', default: '', description: 'Medicare patient days', type: 'number' },
      { name: 'medicare_pct', default: '', description: 'Medicare % of census', type: 'percentage' },
      { name: 'medicaid_days', default: '', description: 'Medicaid patient days', type: 'number' },
      { name: 'medicaid_pct', default: '', description: 'Medicaid % of census', type: 'percentage' },
      { name: 'private_days', default: '', description: 'Private pay days', type: 'number' },
      { name: 'private_pct', default: '', description: 'Private pay %', type: 'percentage' },
      { name: 'other_days', default: '', description: 'Other payer days', type: 'number' },
      { name: 'other_pct', default: '', description: 'Other payer %', type: 'percentage' },
      { name: 'total_revenue', default: '', description: 'Total revenue', type: 'number' },
      { name: 'medicare_revenue', default: '', description: 'Medicare revenue', type: 'number' },
      { name: 'medicaid_revenue', default: '', description: 'Medicaid revenue', type: 'number' },
      { name: 'private_revenue', default: '', description: 'Private pay revenue', type: 'number' },
      { name: 'other_revenue', default: '', description: 'Other revenue', type: 'number' },
      { name: 'total_labor', default: '', description: 'Total labor expense', type: 'number' },
      { name: 'labor_pct', default: '', description: 'Labor % of revenue', type: 'percentage' },
      { name: 'nursing_wages', default: '', description: 'Nursing wages', type: 'number' },
      { name: 'other_wages', default: '', description: 'Other wages', type: 'number' },
      { name: 'benefits', default: '', description: 'Benefits expense', type: 'number' },
      { name: 'contract_labor', default: '', description: 'Contract/agency labor', type: 'number' },
      { name: 'total_non_labor', default: '', description: 'Total non-labor expense', type: 'number' },
      { name: 'food_expense', default: '', description: 'Food/dietary expense', type: 'number' },
      { name: 'supplies', default: '', description: 'Supplies expense', type: 'number' },
      { name: 'utilities', default: '', description: 'Utilities expense', type: 'number' },
      { name: 'insurance', default: '', description: 'Insurance expense', type: 'number' },
      { name: 'property', default: '', description: 'Property/lease expense', type: 'number' },
      { name: 'management_fee', default: '', description: 'Management fee', type: 'number' },
      { name: 'other_operating', default: '', description: 'Other operating expense', type: 'number' },
      { name: 'ebitda', default: '', description: 'EBITDA', type: 'number' },
      { name: 'ebitda_margin', default: '', description: 'EBITDA margin %', type: 'percentage' },
      { name: 'rppd', default: '', description: 'Revenue per patient day', type: 'number' },
      { name: 'cppd', default: '', description: 'Cost per patient day', type: 'number' },
      { name: 'nursing_hppd', default: '', description: 'Nursing HPPD', type: 'number' },
    ],
    tags: ['snf', 'financial', 'p&l', 'profit-loss', 'analysis'],
    difficulty: 'advanced',
    estimatedTime: '20 min',
    outputFormats: ['memo', 'pdf'],
    useCases: ['Monthly financial review', 'Board presentation', 'Investor reporting', 'Operational improvement'],
    requiredInputs: ['facility_name', 'licensed_beds', 'total_revenue', 'ebitda'],
  },

  {
    id: 'healthcare-balance-sheet',
    name: 'Healthcare Balance Sheet Analysis',
    description: 'Balance sheet analysis for healthcare organizations with liquidity and leverage metrics',
    category: 'Healthcare',
    categorySlug: 'healthcare',
    icon: '📋',
    prompt: `## Healthcare Balance Sheet Analysis

**Organization Information:**
- Organization Name: {{org_name}}
- Entity Type: {{entity_type}}
- Fiscal Year End: {{fiscal_year_end}}
- Analysis Date: {{analysis_date}}

**Assets:**
*Current Assets:*
- Cash & Equivalents: \${{cash}}
- Accounts Receivable (Gross): \${{ar_gross}}
- Less: Allowance for Doubtful Accounts: \${{allowance}}
- Net A/R: \${{ar_net}}
- Days in A/R: {{days_ar}}
- Inventory: \${{inventory}}
- Prepaid Expenses: \${{prepaid}}
- Other Current Assets: \${{other_current}}
- **Total Current Assets: \${{total_current_assets}}**

*Non-Current Assets:*
- Property, Plant & Equipment (Gross): \${{ppe_gross}}
- Less: Accumulated Depreciation: \${{accum_depr}}
- Net PP&E: \${{ppe_net}}
- Average Age of Plant: {{plant_age}} years
- Goodwill: \${{goodwill}}
- Intangibles (net): \${{intangibles}}
- Investments: \${{investments}}
- Other Long-Term: \${{other_lt_assets}}
- **Total Non-Current Assets: \${{total_noncurrent_assets}}**

**Total Assets: \${{total_assets}}**

**Liabilities:**
*Current Liabilities:*
- Accounts Payable: \${{ap}}
- Accrued Salaries/Wages: \${{accrued_wages}}
- Current Portion Long-Term Debt: \${{current_ltd}}
- Other Current Liabilities: \${{other_current_liab}}
- **Total Current Liabilities: \${{total_current_liab}}**

*Long-Term Liabilities:*
- Long-Term Debt: \${{ltd}}
- Deferred Revenue: \${{deferred_rev}}
- Other Long-Term: \${{other_lt_liab}}
- **Total Long-Term Liabilities: \${{total_lt_liab}}**

**Total Liabilities: \${{total_liabilities}}**

**Equity/Net Assets:**
- Retained Earnings/Net Assets: \${{retained_earnings}}
- Additional Paid-In Capital: \${{apic}}
- **Total Equity: \${{total_equity}}**

---

**Please provide comprehensive balance sheet analysis:**

1. **Liquidity Analysis**
   - Current Ratio: {{current_ratio}}
   - Quick Ratio calculation
   - Cash on hand (days)
   - Working capital adequacy
   - Liquidity trends

2. **Leverage & Debt Analysis**
   - Debt-to-Equity Ratio
   - Debt-to-Total Assets
   - Debt Service Coverage Ratio
   - Capitalization analysis
   - Debt maturity schedule assessment

3. **Asset Quality**
   - Days in A/R vs. industry benchmark
   - A/R aging analysis recommendations
   - Average age of plant assessment
   - Asset turnover efficiency
   - Goodwill/intangibles as % of assets

4. **Capital Structure**
   - Optimal capital structure analysis
   - Equity adequacy assessment
   - Comparison to peer institutions

5. **Healthcare-Specific Metrics**
   - Net Patient A/R per adjusted discharge
   - Cushion ratio
   - Cash-to-debt ratio
   - Days cash on hand

6. **Risk Assessment**
   - Liquidity risk factors
   - Leverage risk factors
   - Going concern indicators

7. **Recommendations**
   - Working capital management
   - Debt restructuring opportunities
   - Asset optimization strategies

Format as financial analysis report with ratio summary table.`,
    variables: [
      { name: 'org_name', default: '', description: 'Organization name', type: 'text' },
      { name: 'entity_type', default: '', description: 'Entity type', type: 'select', options: ['Skilled Nursing Facility', 'Assisted Living', 'Hospital', 'Home Health', 'Hospice', 'CCRC', 'Multi-site Operator'] },
      { name: 'fiscal_year_end', default: '', description: 'Fiscal year end', type: 'text' },
      { name: 'analysis_date', default: '', description: 'Analysis date', type: 'date' },
      { name: 'cash', default: '', description: 'Cash & equivalents', type: 'number' },
      { name: 'ar_gross', default: '', description: 'Gross A/R', type: 'number' },
      { name: 'allowance', default: '', description: 'Allowance for doubtful accounts', type: 'number' },
      { name: 'ar_net', default: '', description: 'Net A/R', type: 'number' },
      { name: 'days_ar', default: '', description: 'Days in A/R', type: 'number' },
      { name: 'inventory', default: '', description: 'Inventory', type: 'number' },
      { name: 'prepaid', default: '', description: 'Prepaid expenses', type: 'number' },
      { name: 'other_current', default: '', description: 'Other current assets', type: 'number' },
      { name: 'total_current_assets', default: '', description: 'Total current assets', type: 'number' },
      { name: 'ppe_gross', default: '', description: 'Gross PP&E', type: 'number' },
      { name: 'accum_depr', default: '', description: 'Accumulated depreciation', type: 'number' },
      { name: 'ppe_net', default: '', description: 'Net PP&E', type: 'number' },
      { name: 'plant_age', default: '', description: 'Average age of plant (years)', type: 'number' },
      { name: 'goodwill', default: '', description: 'Goodwill', type: 'number' },
      { name: 'intangibles', default: '', description: 'Intangibles (net)', type: 'number' },
      { name: 'investments', default: '', description: 'Investments', type: 'number' },
      { name: 'other_lt_assets', default: '', description: 'Other long-term assets', type: 'number' },
      { name: 'total_noncurrent_assets', default: '', description: 'Total non-current assets', type: 'number' },
      { name: 'total_assets', default: '', description: 'Total assets', type: 'number' },
      { name: 'ap', default: '', description: 'Accounts payable', type: 'number' },
      { name: 'accrued_wages', default: '', description: 'Accrued wages', type: 'number' },
      { name: 'current_ltd', default: '', description: 'Current portion LTD', type: 'number' },
      { name: 'other_current_liab', default: '', description: 'Other current liabilities', type: 'number' },
      { name: 'total_current_liab', default: '', description: 'Total current liabilities', type: 'number' },
      { name: 'ltd', default: '', description: 'Long-term debt', type: 'number' },
      { name: 'deferred_rev', default: '', description: 'Deferred revenue', type: 'number' },
      { name: 'other_lt_liab', default: '', description: 'Other long-term liabilities', type: 'number' },
      { name: 'total_lt_liab', default: '', description: 'Total long-term liabilities', type: 'number' },
      { name: 'total_liabilities', default: '', description: 'Total liabilities', type: 'number' },
      { name: 'retained_earnings', default: '', description: 'Retained earnings', type: 'number' },
      { name: 'apic', default: '', description: 'Additional paid-in capital', type: 'number' },
      { name: 'total_equity', default: '', description: 'Total equity', type: 'number' },
      { name: 'current_ratio', default: '', description: 'Current ratio', type: 'number' },
    ],
    tags: ['balance-sheet', 'financial', 'analysis', 'healthcare'],
    difficulty: 'advanced',
    estimatedTime: '20 min',
    outputFormats: ['memo', 'pdf'],
    useCases: ['Financial review', 'Lending analysis', 'M&A due diligence', 'Board reporting'],
    requiredInputs: ['org_name', 'total_assets', 'total_liabilities'],
  },

  // ============================================
  // CENSUS & MARKETING
  // ============================================
  {
    id: 'census-analysis',
    name: 'Census & Occupancy Analysis',
    description: 'Comprehensive census analysis with trends, projections, and action plans',
    category: 'Healthcare',
    categorySlug: 'healthcare',
    icon: '📈',
    prompt: `## Census & Occupancy Analysis

**Facility Information:**
- Facility Name: {{facility_name}}
- Licensed Beds: {{licensed_beds}}
- Operational Beds: {{operational_beds}}
- Analysis Period: {{analysis_period}}

**Current Census:**
- Today's Census: {{current_census}}
- Current Occupancy: {{current_occupancy}}%
- MTD Average Census: {{mtd_adc}}
- YTD Average Census: {{ytd_adc}}

**Census by Service Line:**
- Medicare A (Short Stay Rehab): {{medicare_a_census}}
- Medicare A (Skilled): {{medicare_skilled}}
- Managed Care: {{managed_care_census}}
- Medicaid: {{medicaid_census}}
- Private Pay: {{private_pay_census}}
- Hospice (GIP/Respite): {{hospice_census}}

**Move-In/Move-Out Activity:**
- Admissions MTD: {{admissions_mtd}}
- Discharges MTD: {{discharges_mtd}}
- Deaths MTD: {{deaths_mtd}}
- Readmissions (30-day): {{readmissions}}
- Average Length of Stay: {{alos}} days

**Referral Sources:**
- Hospital Referrals: {{hospital_referrals}}
- Physician Referrals: {{physician_referrals}}
- Community/Walk-in: {{community_referrals}}
- Transfer from ALF/IL: {{internal_transfers}}

**Pipeline:**
- Current Pending Admissions: {{pending_admits}}
- Pending Medicare A: {{pending_medicare}}
- Tours Scheduled: {{tours_scheduled}}
- Hot Leads (likely to admit): {{hot_leads}}

---

**Please provide comprehensive census analysis:**

1. **Occupancy Trend Analysis**
   - Current vs. target occupancy
   - 30/60/90 day trends
   - Seasonal patterns
   - Day-of-week patterns
   - Comparison to prior year

2. **Payer Mix Analysis**
   - Current payer mix vs. target
   - Revenue impact of payer mix
   - Medicare days vs. budget
   - Managed care performance
   - Opportunities to improve mix

3. **Referral Analysis**
   - Top referral sources (ranked)
   - Conversion rates by source
   - Hospital relationship assessment
   - Referral growth/decline trends
   - Competitive win/loss analysis

4. **Length of Stay Analysis**
   - ALOS by payer type
   - Comparison to benchmarks
   - Outlier identification
   - Discharge planning effectiveness

5. **Readmission Analysis**
   - 30-day readmission rate
   - Root cause analysis
   - Hospital penalty risk
   - Prevention strategies

6. **Census Projections**
   - 30-day census forecast
   - Seasonal adjustments
   - Known admissions/discharges
   - Confidence intervals

7. **Action Plan**
   - Immediate actions (next 7 days)
   - Short-term strategies (30 days)
   - Long-term initiatives
   - Resource requirements
   - KPIs and targets

8. **Marketing Recommendations**
   - Referral source development
   - Community outreach
   - Digital marketing suggestions
   - Competitive positioning

Format as executive census report with action items.`,
    variables: [
      { name: 'facility_name', default: '', description: 'Facility name', type: 'text' },
      { name: 'licensed_beds', default: '', description: 'Licensed beds', type: 'number' },
      { name: 'operational_beds', default: '', description: 'Operational beds', type: 'number' },
      { name: 'analysis_period', default: '', description: 'Analysis period', type: 'text' },
      { name: 'current_census', default: '', description: 'Current census', type: 'number' },
      { name: 'current_occupancy', default: '', description: 'Current occupancy %', type: 'percentage' },
      { name: 'mtd_adc', default: '', description: 'MTD average daily census', type: 'number' },
      { name: 'ytd_adc', default: '', description: 'YTD average daily census', type: 'number' },
      { name: 'medicare_a_census', default: '', description: 'Medicare A rehab census', type: 'number' },
      { name: 'medicare_skilled', default: '', description: 'Medicare skilled census', type: 'number' },
      { name: 'managed_care_census', default: '', description: 'Managed care census', type: 'number' },
      { name: 'medicaid_census', default: '', description: 'Medicaid census', type: 'number' },
      { name: 'private_pay_census', default: '', description: 'Private pay census', type: 'number' },
      { name: 'hospice_census', default: '', description: 'Hospice census', type: 'number' },
      { name: 'admissions_mtd', default: '', description: 'Admissions MTD', type: 'number' },
      { name: 'discharges_mtd', default: '', description: 'Discharges MTD', type: 'number' },
      { name: 'deaths_mtd', default: '', description: 'Deaths MTD', type: 'number' },
      { name: 'readmissions', default: '', description: '30-day readmissions', type: 'number' },
      { name: 'alos', default: '', description: 'Average length of stay', type: 'number' },
      { name: 'hospital_referrals', default: '', description: 'Hospital referrals', type: 'number' },
      { name: 'physician_referrals', default: '', description: 'Physician referrals', type: 'number' },
      { name: 'community_referrals', default: '', description: 'Community referrals', type: 'number' },
      { name: 'internal_transfers', default: '', description: 'Internal transfers', type: 'number' },
      { name: 'pending_admits', default: '', description: 'Pending admissions', type: 'number' },
      { name: 'pending_medicare', default: '', description: 'Pending Medicare A', type: 'number' },
      { name: 'tours_scheduled', default: '', description: 'Tours scheduled', type: 'number' },
      { name: 'hot_leads', default: '', description: 'Hot leads', type: 'number' },
    ],
    tags: ['census', 'occupancy', 'marketing', 'admissions', 'referrals'],
    difficulty: 'intermediate',
    estimatedTime: '15 min',
    outputFormats: ['memo', 'pdf'],
    useCases: ['Weekly census meeting', 'Marketing planning', 'Operational review', 'Budget planning'],
    requiredInputs: ['facility_name', 'licensed_beds', 'current_census'],
  },

  // ============================================
  // MERGERS & ACQUISITIONS
  // ============================================
  {
    id: 'ma-due-diligence',
    name: 'Healthcare M&A Due Diligence',
    description: 'Comprehensive due diligence framework for healthcare facility acquisitions',
    category: 'Healthcare',
    categorySlug: 'healthcare',
    icon: '🤝',
    prompt: `## Healthcare M&A Due Diligence Analysis

**Transaction Overview:**
- Target Name: {{target_name}}
- Target Type: {{target_type}}
- Transaction Type: {{transaction_type}}
- Proposed Price: \${{proposed_price}}
- Expected Close: {{expected_close}}

**Target Profile:**
- Location(s): {{locations}}
- Licensed Beds/Units: {{beds}}
- Current Occupancy: {{occupancy}}%
- Revenue (LTM): \${{ltm_revenue}}
- EBITDA (LTM): \${{ltm_ebitda}}
- EBITDA Margin: {{ebitda_margin}}%

**Seller Information:**
- Seller Name: {{seller_name}}
- Reason for Sale: {{sale_reason}}
- Seller Cooperation Level: {{cooperation}}

**Key Concerns:**
{{key_concerns}}

---

**Please provide a comprehensive due diligence framework:**

1. **Financial Due Diligence**

   **Quality of Earnings Analysis:**
   - EBITDA normalization adjustments
   - One-time vs. recurring items
   - Revenue recognition review
   - Expense verification
   - Working capital analysis
   - Pro forma adjustments

   **Historical Financial Review:**
   - 3-year trend analysis
   - Revenue by payer source
   - Expense trends and drivers
   - Margin analysis
   - Cash flow analysis

   **Projections Assessment:**
   - Management projection review
   - Key assumptions validation
   - Sensitivity analysis
   - Synergy identification

2. **Operational Due Diligence**

   **Clinical Operations:**
   - Quality scores and trends
   - Survey history (3 years)
   - Deficiency patterns
   - Clinical leadership assessment
   - Staff competency

   **Census & Marketing:**
   - Historical occupancy trends
   - Referral source analysis
   - Market share assessment
   - Competitive landscape
   - Growth opportunities

   **Staffing:**
   - Current staffing levels
   - Turnover rates
   - Key person risk
   - Union status
   - Wage competitiveness

3. **Regulatory & Compliance**

   **Licensure & Certification:**
   - License status and conditions
   - Medicare/Medicaid certification
   - Survey history and patterns
   - Pending actions or sanctions
   - Star ratings (if SNF)

   **Legal Review:**
   - Pending litigation
   - Historical claims
   - Compliance violations
   - Government investigations
   - Corporate integrity agreements

4. **Real Estate Assessment**

   - Owned vs. leased
   - Lease terms and escalations
   - Property condition
   - Deferred maintenance
   - Capital requirements
   - Zoning/use restrictions

5. **Market Analysis**

   - Demographics and population trends
   - Competitor analysis
   - Managed care landscape
   - Reimbursement environment
   - Certificate of Need requirements
   - Growth potential

6. **Valuation Analysis**

   - Transaction multiples
   - Comparable transactions
   - DCF analysis
   - Asset-based valuation
   - Premium/discount factors

7. **Integration Planning**

   - Day 1 requirements
   - 30/60/90 day plan
   - Systems integration
   - Branding/naming
   - Staff retention
   - Synergy capture timeline

8. **Risk Assessment Matrix**

   | Risk Category | Rating | Mitigation Strategy |
   |---------------|--------|---------------------|
   | Financial | | |
   | Regulatory | | |
   | Operational | | |
   | Market | | |
   | Integration | | |

9. **Deal Structure Recommendations**

   - Purchase price allocation
   - Escrow/holdback recommendations
   - Reps & warranties
   - Indemnification provisions
   - Closing conditions

10. **Go/No-Go Recommendation**

    - Key findings summary
    - Deal breakers identified
    - Valuation conclusion
    - Final recommendation

Format as M&A due diligence report for investment committee.`,
    variables: [
      { name: 'target_name', default: '', description: 'Target company name', type: 'text' },
      { name: 'target_type', default: '', description: 'Target type', type: 'select', options: ['Skilled Nursing Facility', 'Assisted Living', 'Independent Living', 'CCRC', 'Memory Care', 'Home Health', 'Hospice', 'Portfolio/Multi-site'] },
      { name: 'transaction_type', default: '', description: 'Transaction type', type: 'select', options: ['Asset Purchase', 'Stock Purchase', 'Merger', 'Joint Venture', 'Management Agreement'] },
      { name: 'proposed_price', default: '', description: 'Proposed purchase price', type: 'number' },
      { name: 'expected_close', default: '', description: 'Expected closing date', type: 'text' },
      { name: 'locations', default: '', description: 'Location(s)', type: 'text' },
      { name: 'beds', default: '', description: 'Licensed beds/units', type: 'number' },
      { name: 'occupancy', default: '', description: 'Current occupancy %', type: 'percentage' },
      { name: 'ltm_revenue', default: '', description: 'LTM revenue', type: 'number' },
      { name: 'ltm_ebitda', default: '', description: 'LTM EBITDA', type: 'number' },
      { name: 'ebitda_margin', default: '', description: 'EBITDA margin %', type: 'percentage' },
      { name: 'seller_name', default: '', description: 'Seller name', type: 'text' },
      { name: 'sale_reason', default: '', description: 'Reason for sale', type: 'select', options: ['Strategic exit', 'Retirement', 'Financial distress', 'Portfolio optimization', 'Estate planning', 'Unknown'] },
      { name: 'cooperation', default: '', description: 'Seller cooperation level', type: 'select', options: ['Highly cooperative', 'Cooperative', 'Neutral', 'Limited', 'Resistant'] },
      { name: 'key_concerns', default: '', description: 'Key concerns identified', type: 'textarea' },
    ],
    tags: ['m&a', 'due-diligence', 'acquisition', 'healthcare', 'valuation'],
    difficulty: 'advanced',
    estimatedTime: '30 min',
    outputFormats: ['memo', 'pdf'],
    useCases: ['Acquisition analysis', 'Investment committee', 'Deal evaluation', 'Post-LOI diligence'],
    requiredInputs: ['target_name', 'target_type', 'proposed_price'],
  },

  {
    id: 'facility-valuation',
    name: 'Healthcare Facility Valuation',
    description: 'Multi-method valuation analysis for healthcare facility transaction',
    category: 'Healthcare',
    categorySlug: 'healthcare',
    icon: '💰',
    prompt: `## Healthcare Facility Valuation Analysis

**Facility Information:**
- Facility Name: {{facility_name}}
- Facility Type: {{facility_type}}
- Location: {{location}}
- Licensed Beds/Units: {{beds}}
- Valuation Date: {{valuation_date}}

**Financial Data:**
- Revenue (LTM): \${{revenue}}
- EBITDA (LTM): \${{ebitda}}
- EBITDAR (LTM): \${{ebitdar}}
- Net Operating Income: \${{noi}}
- Normalized EBITDA: \${{norm_ebitda}}

**Operational Metrics:**
- Occupancy: {{occupancy}}%
- Payer Mix: Medicare {{medicare_pct}}%, Medicaid {{medicaid_pct}}%, Private {{private_pct}}%
- Quality Rating: {{quality_rating}}
- Survey History: {{survey_history}}

**Real Estate:**
- Owned/Leased: {{ownership}}
- Square Footage: {{sqft}} SF
- Acres: {{acres}}
- Annual Rent (if leased): \${{annual_rent}}
- Property Value Estimate: \${{property_value}}

---

**Please provide comprehensive valuation analysis:**

1. **Income Approach - EBITDA Multiple**

   **Step 1: EBITDA Normalization**
   | Adjustment | Amount | Description |
   |------------|--------|-------------|
   | Reported EBITDA | \${{ebitda}} | |
   | Management fee adjustment | | |
   | Owner compensation | | |
   | One-time items | | |
   | Non-recurring expenses | | |
   | **Normalized EBITDA** | | |

   **Step 2: Multiple Selection**
   - Market transaction multiples (recent comps)
   - Quality adjustments
   - Size adjustments
   - Geographic adjustments
   - Selected multiple range: ___x to ___x

   **Step 3: Value Calculation**
   - Low: $____
   - Mid: $____
   - High: $____

2. **Income Approach - Discounted Cash Flow**

   **Projection Period:** 5 years

   | Year | Revenue | EBITDA | FCF |
   |------|---------|--------|-----|
   | 1 | | | |
   | 2 | | | |
   | 3 | | | |
   | 4 | | | |
   | 5 | | | |

   **Terminal Value:**
   - Exit multiple: ___x
   - Or perpetuity growth: ___%
   - Terminal value: $____

   **Discount Rate:**
   - Risk-free rate: ___%
   - Market premium: ___%
   - Size premium: ___%
   - Specific risk: ___%
   - **WACC: ___%**

   **DCF Value:** $____

3. **Market Approach - Comparable Transactions**

   | Transaction | Date | Price/Bed | EBITDA Multiple |
   |-------------|------|-----------|-----------------|
   | | | | |
   | | | | |
   | | | | |
   | Median | | | |

   **Comparable Transaction Value:** $____

4. **Asset Approach**

   | Asset | Value |
   |-------|-------|
   | Real Estate | \${{property_value}} |
   | FF&E | $____ |
   | Working Capital | $____ |
   | Intangibles/Goodwill | $____ |
   | **Total** | $____ |

5. **Per-Bed/Unit Analysis**

   - Price per bed: $____ (target: $____ market average)
   - Revenue per bed: $____
   - EBITDA per bed: $____

6. **Valuation Summary**

   | Method | Low | Mid | High | Weight |
   |--------|-----|-----|------|--------|
   | EBITDA Multiple | | | | % |
   | DCF | | | | % |
   | Comparable Trans. | | | | % |
   | Asset Approach | | | | % |
   | **Weighted Average** | | | | 100% |

7. **Sensitivity Analysis**

   | EBITDA / Multiple | 6.0x | 7.0x | 8.0x | 9.0x |
   |-------------------|------|------|------|------|
   | -10% | | | | |
   | Base | | | | |
   | +10% | | | | |

8. **Value Conclusion**

   **Indicated Value Range:** $____ to $____

   **Point Estimate:** $____

   **Key Value Drivers:**
   -
   -
   -

   **Key Risks to Value:**
   -
   -
   -

Format as formal valuation memorandum.`,
    variables: [
      { name: 'facility_name', default: '', description: 'Facility name', type: 'text' },
      { name: 'facility_type', default: '', description: 'Facility type', type: 'select', options: ['Skilled Nursing Facility', 'Assisted Living', 'Independent Living', 'CCRC', 'Memory Care', 'Home Health', 'Hospice'] },
      { name: 'location', default: '', description: 'Location (City, State)', type: 'text' },
      { name: 'beds', default: '', description: 'Licensed beds/units', type: 'number' },
      { name: 'valuation_date', default: '', description: 'Valuation date', type: 'date' },
      { name: 'revenue', default: '', description: 'LTM Revenue', type: 'number' },
      { name: 'ebitda', default: '', description: 'LTM EBITDA', type: 'number' },
      { name: 'ebitdar', default: '', description: 'LTM EBITDAR', type: 'number' },
      { name: 'noi', default: '', description: 'Net Operating Income', type: 'number' },
      { name: 'norm_ebitda', default: '', description: 'Normalized EBITDA', type: 'number' },
      { name: 'occupancy', default: '', description: 'Occupancy %', type: 'percentage' },
      { name: 'medicare_pct', default: '', description: 'Medicare %', type: 'percentage' },
      { name: 'medicaid_pct', default: '', description: 'Medicaid %', type: 'percentage' },
      { name: 'private_pct', default: '', description: 'Private pay %', type: 'percentage' },
      { name: 'quality_rating', default: '', description: 'Quality rating (if SNF)', type: 'select', options: ['5-Star', '4-Star', '3-Star', '2-Star', '1-Star', 'N/A'] },
      { name: 'survey_history', default: '', description: 'Recent survey history', type: 'textarea' },
      { name: 'ownership', default: '', description: 'Owned or leased', type: 'select', options: ['Owned', 'Leased', 'Mixed'] },
      { name: 'sqft', default: '', description: 'Square footage', type: 'number' },
      { name: 'acres', default: '', description: 'Acres', type: 'number' },
      { name: 'annual_rent', default: '', description: 'Annual rent (if leased)', type: 'number' },
      { name: 'property_value', default: '', description: 'Estimated property value', type: 'number' },
    ],
    tags: ['valuation', 'm&a', 'healthcare', 'investment', 'dcf'],
    difficulty: 'advanced',
    estimatedTime: '25 min',
    outputFormats: ['memo', 'pdf'],
    useCases: ['Acquisition pricing', 'Sale preparation', 'Financing', 'Estate planning'],
    requiredInputs: ['facility_name', 'facility_type', 'revenue', 'ebitda'],
  },

  // ============================================
  // STAFFING & HR
  // ============================================
  {
    id: 'staffing-analysis',
    name: 'Healthcare Staffing Analysis',
    description: 'Comprehensive staffing analysis with HPPD, turnover, and cost optimization',
    category: 'Healthcare',
    categorySlug: 'healthcare',
    icon: '👥',
    prompt: `## Healthcare Staffing Analysis

**Facility Information:**
- Facility Name: {{facility_name}}
- Facility Type: {{facility_type}}
- Licensed Beds: {{beds}}
- Current Census: {{census}}
- Analysis Period: {{period}}

**Current Staffing:**
*Nursing:*
- RN FTEs: {{rn_ftes}}
- LPN/LVN FTEs: {{lpn_ftes}}
- CNA FTEs: {{cna_ftes}}
- Total Nursing FTEs: {{total_nursing_ftes}}

*Other Departments:*
- Therapy FTEs: {{therapy_ftes}}
- Dietary FTEs: {{dietary_ftes}}
- Housekeeping FTEs: {{housekeeping_ftes}}
- Maintenance FTEs: {{maintenance_ftes}}
- Activities FTEs: {{activities_ftes}}
- Social Services FTEs: {{social_services_ftes}}
- Administration FTEs: {{admin_ftes}}
- **Total FTEs: {{total_ftes}}**

**Hours Per Patient Day (HPPD):**
- RN HPPD: {{rn_hppd}}
- LPN HPPD: {{lpn_hppd}}
- CNA HPPD: {{cna_hppd}}
- Total Nursing HPPD: {{total_nursing_hppd}}
- State Minimum: {{state_minimum_hppd}}

**Agency/Contract Labor:**
- Agency Hours (% of total): {{agency_pct}}%
- Agency Cost: \${{agency_cost}}
- Agency by Department: {{agency_breakdown}}

**Turnover & Vacancy:**
- RN Turnover (annual): {{rn_turnover}}%
- CNA Turnover (annual): {{cna_turnover}}%
- Overall Turnover: {{overall_turnover}}%
- Current Vacancies: {{vacancies}}
- Time to Fill (avg): {{time_to_fill}} days

**Labor Costs:**
- Total Labor Cost: \${{total_labor_cost}}
- Labor % of Revenue: {{labor_pct}}%
- Average RN Wage: \${{avg_rn_wage}}/hr
- Average CNA Wage: \${{avg_cna_wage}}/hr
- Overtime Cost: \${{overtime_cost}}
- Benefits Cost: \${{benefits_cost}}

---

**Please provide comprehensive staffing analysis:**

1. **HPPD Analysis**
   - Current vs. CMS minimum requirements
   - Current vs. state requirements
   - Current vs. best practice benchmarks
   - HPPD by shift (day/evening/night)
   - Weekend vs. weekday staffing
   - Impact on quality scores

2. **Skill Mix Analysis**
   - Current RN/LPN/CNA ratio
   - Optimal skill mix for acuity
   - RN supervision adequacy
   - Licensed vs. unlicensed hours

3. **Turnover Analysis**
   - Turnover by position
   - Turnover by tenure (<90 days, 90-180 days, 180-365 days, >365 days)
   - Cost of turnover calculation
   - Exit interview themes
   - Retention risk assessment

4. **Agency Utilization**
   - Agency use by department
   - Agency use by shift
   - Cost comparison (agency vs. employed)
   - Agency reduction strategy
   - Break-even analysis for hiring

5. **Wage & Compensation Analysis**
   - Market wage comparison
   - Internal equity review
   - Compression issues
   - Benefit competitiveness
   - Total compensation analysis

6. **Productivity Metrics**
   - FTEs per occupied bed
   - Labor cost per patient day
   - Revenue per FTE
   - Non-productive time analysis
   - Overtime analysis

7. **Scheduling Optimization**
   - Current scheduling patterns
   - Open shift analysis
   - Call-off/absence patterns
   - Self-scheduling opportunities
   - Float pool utilization

8. **Cost Reduction Opportunities**
   | Opportunity | Annual Savings | Implementation |
   |-------------|----------------|----------------|
   | | | |
   | | | |

9. **Recruitment Strategy**
   - Pipeline development
   - Employer branding
   - Referral program
   - Education partnerships
   - Sign-on bonus ROI

10. **Recommendations**
    - Immediate actions
    - 30-day priorities
    - 90-day initiatives
    - Long-term strategies

Format as staffing analysis report for HR/operations.`,
    variables: [
      { name: 'facility_name', default: '', description: 'Facility name', type: 'text' },
      { name: 'facility_type', default: '', description: 'Facility type', type: 'select', options: ['Skilled Nursing Facility', 'Assisted Living', 'Memory Care', 'CCRC', 'Home Health', 'Hospice'] },
      { name: 'beds', default: '', description: 'Licensed beds', type: 'number' },
      { name: 'census', default: '', description: 'Current census', type: 'number' },
      { name: 'period', default: '', description: 'Analysis period', type: 'text' },
      { name: 'rn_ftes', default: '', description: 'RN FTEs', type: 'number' },
      { name: 'lpn_ftes', default: '', description: 'LPN FTEs', type: 'number' },
      { name: 'cna_ftes', default: '', description: 'CNA FTEs', type: 'number' },
      { name: 'total_nursing_ftes', default: '', description: 'Total nursing FTEs', type: 'number' },
      { name: 'therapy_ftes', default: '', description: 'Therapy FTEs', type: 'number' },
      { name: 'dietary_ftes', default: '', description: 'Dietary FTEs', type: 'number' },
      { name: 'housekeeping_ftes', default: '', description: 'Housekeeping FTEs', type: 'number' },
      { name: 'maintenance_ftes', default: '', description: 'Maintenance FTEs', type: 'number' },
      { name: 'activities_ftes', default: '', description: 'Activities FTEs', type: 'number' },
      { name: 'social_services_ftes', default: '', description: 'Social services FTEs', type: 'number' },
      { name: 'admin_ftes', default: '', description: 'Admin FTEs', type: 'number' },
      { name: 'total_ftes', default: '', description: 'Total FTEs', type: 'number' },
      { name: 'rn_hppd', default: '', description: 'RN HPPD', type: 'number' },
      { name: 'lpn_hppd', default: '', description: 'LPN HPPD', type: 'number' },
      { name: 'cna_hppd', default: '', description: 'CNA HPPD', type: 'number' },
      { name: 'total_nursing_hppd', default: '', description: 'Total nursing HPPD', type: 'number' },
      { name: 'state_minimum_hppd', default: '', description: 'State minimum HPPD', type: 'number' },
      { name: 'agency_pct', default: '', description: 'Agency % of hours', type: 'percentage' },
      { name: 'agency_cost', default: '', description: 'Agency cost', type: 'number' },
      { name: 'agency_breakdown', default: '', description: 'Agency by department', type: 'textarea' },
      { name: 'rn_turnover', default: '', description: 'RN annual turnover %', type: 'percentage' },
      { name: 'cna_turnover', default: '', description: 'CNA annual turnover %', type: 'percentage' },
      { name: 'overall_turnover', default: '', description: 'Overall turnover %', type: 'percentage' },
      { name: 'vacancies', default: '', description: 'Current vacancies', type: 'number' },
      { name: 'time_to_fill', default: '', description: 'Time to fill (days)', type: 'number' },
      { name: 'total_labor_cost', default: '', description: 'Total labor cost', type: 'number' },
      { name: 'labor_pct', default: '', description: 'Labor % of revenue', type: 'percentage' },
      { name: 'avg_rn_wage', default: '', description: 'Average RN wage/hr', type: 'number' },
      { name: 'avg_cna_wage', default: '', description: 'Average CNA wage/hr', type: 'number' },
      { name: 'overtime_cost', default: '', description: 'Overtime cost', type: 'number' },
      { name: 'benefits_cost', default: '', description: 'Benefits cost', type: 'number' },
    ],
    tags: ['staffing', 'hppd', 'turnover', 'labor', 'hr'],
    difficulty: 'intermediate',
    estimatedTime: '20 min',
    outputFormats: ['memo', 'pdf'],
    useCases: ['Staffing optimization', 'Budget planning', 'Agency reduction', 'Retention planning'],
    requiredInputs: ['facility_name', 'beds', 'census', 'total_nursing_hppd'],
  },

  {
    id: 'incentive-compensation',
    name: 'Healthcare Incentive Compensation Plan',
    description: 'Design incentive compensation plans for healthcare executives and staff',
    category: 'Healthcare',
    categorySlug: 'healthcare',
    icon: '🎯',
    prompt: `## Healthcare Incentive Compensation Plan Design

**Organization Information:**
- Organization Name: {{org_name}}
- Organization Type: {{org_type}}
- Number of Facilities: {{num_facilities}}
- Total Revenue: \${{total_revenue}}

**Position Details:**
- Position: {{position}}
- Base Salary: \${{base_salary}}
- Target Bonus: {{target_bonus_pct}}% of base (\${{target_bonus_amt}})
- Maximum Bonus: {{max_bonus_pct}}% of base (\${{max_bonus_amt}})

**Current Performance:**
- Occupancy: {{current_occupancy}}%
- Quality Rating: {{quality_rating}}
- EBITDA Margin: {{ebitda_margin}}%
- Employee Turnover: {{turnover}}%
- Patient Satisfaction: {{patient_satisfaction}}%

**Strategic Priorities:**
{{strategic_priorities}}

---

**Please design a comprehensive incentive compensation plan:**

1. **Plan Philosophy & Objectives**
   - Alignment with organizational strategy
   - Pay-for-performance principles
   - Short-term vs. long-term balance
   - Individual vs. team incentives

2. **Performance Metrics (Recommend Weighting)**

   **Financial Metrics (typically 40-50%):**
   | Metric | Weight | Threshold | Target | Maximum |
   |--------|--------|-----------|--------|---------|
   | EBITDA | % | | | |
   | Revenue Growth | % | | | |
   | Operating Margin | % | | | |
   | Budget Variance | % | | | |

   **Quality Metrics (typically 25-35%):**
   | Metric | Weight | Threshold | Target | Maximum |
   |--------|--------|-----------|--------|---------|
   | Star Rating | % | | | |
   | Survey Results | % | | | |
   | Infection Rate | % | | | |
   | Rehospitalization | % | | | |

   **Operational Metrics (typically 15-25%):**
   | Metric | Weight | Threshold | Target | Maximum |
   |--------|--------|-----------|--------|---------|
   | Occupancy | % | | | |
   | Census Growth | % | | | |
   | Employee Turnover | % | | | |
   | Patient Satisfaction | % | | | |

   **Strategic/Individual (typically 10-20%):**
   | Metric | Weight | Description |
   |--------|--------|-------------|
   | Project completion | % | |
   | Leadership goals | % | |

3. **Payout Structure**

   **Performance Levels:**
   - Below Threshold: 0% payout
   - Threshold (80% of target): {{threshold_payout}}% payout
   - Target (100%): {{target_payout}}% payout
   - Maximum (120% of target): {{max_payout}}% payout

   **Interpolation:** Linear between levels

   **Modifiers:**
   - Quality gate (must achieve minimum quality to receive any bonus)
   - Compliance gate (no regulatory issues)
   - Safety gate (no sentinel events)

4. **Sample Payout Scenarios**

   | Scenario | Financial | Quality | Operational | Total Payout |
   |----------|-----------|---------|-------------|--------------|
   | Below Target | | | | |
   | At Target | | | | |
   | Above Target | | | | |
   | Maximum | | | | |

5. **Long-Term Incentives (if applicable)**
   - Retention bonus structure
   - Equity/phantom equity
   - Deferred compensation
   - Multi-year performance periods

6. **Administration**
   - Performance period: {{performance_period}}
   - Measurement timing
   - Approval process
   - Payout timing
   - Clawback provisions
   - Change in control provisions

7. **Communication Plan**
   - Plan document summary
   - Goal-setting process
   - Progress reporting frequency
   - Year-end review process

8. **Budget Impact**
   - Target bonus pool: $____
   - Maximum bonus pool: $____
   - Accrual methodology
   - Forecast assumptions

9. **Compliance Considerations**
   - Stark Law implications
   - Anti-kickback considerations
   - 409A compliance
   - Reasonableness standards

10. **Benchmarking**
    - Market data comparison
    - Competitiveness assessment
    - Recommendations

Format as incentive compensation plan design document.`,
    variables: [
      { name: 'org_name', default: '', description: 'Organization name', type: 'text' },
      { name: 'org_type', default: '', description: 'Organization type', type: 'select', options: ['Single Facility', 'Regional Operator', 'National Operator', 'REIT', 'Non-profit'] },
      { name: 'num_facilities', default: '', description: 'Number of facilities', type: 'number' },
      { name: 'total_revenue', default: '', description: 'Total revenue', type: 'number' },
      { name: 'position', default: '', description: 'Position title', type: 'select', options: ['CEO/President', 'COO', 'CFO', 'Regional VP', 'Administrator/ED', 'DON/CNO', 'Director of Sales', 'Department Manager'] },
      { name: 'base_salary', default: '', description: 'Base salary', type: 'number' },
      { name: 'target_bonus_pct', default: '20', description: 'Target bonus % of base', type: 'percentage' },
      { name: 'target_bonus_amt', default: '', description: 'Target bonus amount', type: 'number' },
      { name: 'max_bonus_pct', default: '40', description: 'Maximum bonus % of base', type: 'percentage' },
      { name: 'max_bonus_amt', default: '', description: 'Maximum bonus amount', type: 'number' },
      { name: 'current_occupancy', default: '', description: 'Current occupancy %', type: 'percentage' },
      { name: 'quality_rating', default: '', description: 'Current quality rating', type: 'text' },
      { name: 'ebitda_margin', default: '', description: 'Current EBITDA margin %', type: 'percentage' },
      { name: 'turnover', default: '', description: 'Current turnover %', type: 'percentage' },
      { name: 'patient_satisfaction', default: '', description: 'Patient satisfaction %', type: 'percentage' },
      { name: 'strategic_priorities', default: '', description: 'Strategic priorities', type: 'textarea' },
      { name: 'threshold_payout', default: '50', description: 'Threshold payout %', type: 'percentage' },
      { name: 'target_payout', default: '100', description: 'Target payout %', type: 'percentage' },
      { name: 'max_payout', default: '150', description: 'Maximum payout %', type: 'percentage' },
      { name: 'performance_period', default: 'Calendar Year', description: 'Performance period', type: 'select', options: ['Calendar Year', 'Fiscal Year', 'Rolling 12-Month', 'Quarterly'] },
    ],
    tags: ['incentive', 'compensation', 'bonus', 'hr', 'leadership'],
    difficulty: 'advanced',
    estimatedTime: '20 min',
    outputFormats: ['memo', 'pdf'],
    useCases: ['Compensation planning', 'Executive recruitment', 'Retention strategy', 'Board approval'],
    requiredInputs: ['org_name', 'position', 'base_salary'],
  },

  // ============================================
  // SALES & BUSINESS DEVELOPMENT
  // ============================================
  {
    id: 'referral-development',
    name: 'Healthcare Referral Development Plan',
    description: 'Strategic referral source development plan for healthcare facilities',
    category: 'Healthcare',
    categorySlug: 'healthcare',
    icon: '🔗',
    prompt: `## Healthcare Referral Development Plan

**Facility Information:**
- Facility Name: {{facility_name}}
- Facility Type: {{facility_type}}
- Beds/Capacity: {{beds}}
- Current Occupancy: {{occupancy}}%
- Target Occupancy: {{target_occupancy}}%

**Current Referral Sources:**
{{current_sources}}

**Top 5 Referral Sources (Last 12 Months):**
1. {{source_1}} - {{source_1_referrals}} referrals
2. {{source_2}} - {{source_2_referrals}} referrals
3. {{source_3}} - {{source_3_referrals}} referrals
4. {{source_4}} - {{source_4_referrals}} referrals
5. {{source_5}} - {{source_5_referrals}} referrals

**Competitive Analysis:**
- Primary Competitors: {{competitors}}
- Market Share Estimate: {{market_share}}%
- Competitive Advantages: {{advantages}}
- Competitive Weaknesses: {{weaknesses}}

**Current Sales Team:**
- Sales FTEs: {{sales_ftes}}
- Sales Budget: \${{sales_budget}}

---

**Please create a comprehensive referral development plan:**

1. **Market Analysis**
   - Service area demographics
   - Discharge potential by hospital
   - Physician referral opportunities
   - Home health/hospice partnerships
   - Managed care relationships

2. **Referral Source Segmentation**

   **A-Level Sources (High Volume/High Potential):**
   | Source | Current | Potential | Strategy |
   |--------|---------|-----------|----------|
   | | | | |

   **B-Level Sources (Moderate Volume/Potential):**
   | Source | Current | Potential | Strategy |
   |--------|---------|-----------|----------|
   | | | | |

   **C-Level Sources (Emerging/Development):**
   | Source | Current | Potential | Strategy |
   |--------|---------|-----------|----------|
   | | | | |

3. **Hospital Strategy**
   - Key hospital targets
   - Discharge planner relationships
   - Case manager engagement
   - Hospitalist partnerships
   - Preferred provider opportunities
   - ED-to-SNF programs

4. **Physician Strategy**
   - Target physician specialties
   - Practice outreach plan
   - Medical director relationships
   - In-service opportunities
   - Physician liaison activities

5. **Managed Care Strategy**
   - Current contracts
   - Contract development targets
   - Value-based arrangements
   - Network adequacy positioning

6. **Community Outreach**
   - Senior centers
   - Religious organizations
   - Support groups
   - Community events
   - Educational seminars

7. **Digital Marketing**
   - Website optimization
   - Google My Business
   - Social media presence
   - Online reviews management
   - Paid advertising

8. **Activity Metrics & KPIs**

   | Metric | Weekly Target | Monthly Target |
   |--------|---------------|----------------|
   | Hospital visits | | |
   | Physician visits | | |
   | New contacts | | |
   | Tours given | | |
   | Referrals received | | |
   | Conversion rate | | |

9. **90-Day Action Plan**

   **Days 1-30:**
   -
   -
   -

   **Days 31-60:**
   -
   -
   -

   **Days 61-90:**
   -
   -
   -

10. **Budget & Resources**
    - Marketing materials
    - Events budget
    - Travel/entertainment
    - Digital marketing
    - CRM/technology
    - Total investment: $____
    - Expected ROI: ____

11. **Tracking & Reporting**
    - Weekly activity reports
    - Monthly performance reviews
    - Quarterly strategy reviews
    - Annual planning cycle

Format as strategic referral development plan.`,
    variables: [
      { name: 'facility_name', default: '', description: 'Facility name', type: 'text' },
      { name: 'facility_type', default: '', description: 'Facility type', type: 'select', options: ['Skilled Nursing Facility', 'Assisted Living', 'Memory Care', 'CCRC', 'Home Health', 'Hospice', 'Rehab'] },
      { name: 'beds', default: '', description: 'Beds/capacity', type: 'number' },
      { name: 'occupancy', default: '', description: 'Current occupancy %', type: 'percentage' },
      { name: 'target_occupancy', default: '95', description: 'Target occupancy %', type: 'percentage' },
      { name: 'current_sources', default: '', description: 'Current referral source mix', type: 'textarea' },
      { name: 'source_1', default: '', description: 'Top source #1', type: 'text' },
      { name: 'source_1_referrals', default: '', description: 'Source #1 referrals', type: 'number' },
      { name: 'source_2', default: '', description: 'Top source #2', type: 'text' },
      { name: 'source_2_referrals', default: '', description: 'Source #2 referrals', type: 'number' },
      { name: 'source_3', default: '', description: 'Top source #3', type: 'text' },
      { name: 'source_3_referrals', default: '', description: 'Source #3 referrals', type: 'number' },
      { name: 'source_4', default: '', description: 'Top source #4', type: 'text' },
      { name: 'source_4_referrals', default: '', description: 'Source #4 referrals', type: 'number' },
      { name: 'source_5', default: '', description: 'Top source #5', type: 'text' },
      { name: 'source_5_referrals', default: '', description: 'Source #5 referrals', type: 'number' },
      { name: 'competitors', default: '', description: 'Primary competitors', type: 'textarea' },
      { name: 'market_share', default: '', description: 'Estimated market share %', type: 'percentage' },
      { name: 'advantages', default: '', description: 'Competitive advantages', type: 'textarea' },
      { name: 'weaknesses', default: '', description: 'Competitive weaknesses', type: 'textarea' },
      { name: 'sales_ftes', default: '', description: 'Sales team FTEs', type: 'number' },
      { name: 'sales_budget', default: '', description: 'Annual sales/marketing budget', type: 'number' },
    ],
    tags: ['sales', 'referrals', 'marketing', 'business-development', 'census'],
    difficulty: 'intermediate',
    estimatedTime: '20 min',
    outputFormats: ['memo', 'pdf'],
    useCases: ['Census development', 'Sales planning', 'Market expansion', 'Competitive positioning'],
    requiredInputs: ['facility_name', 'facility_type', 'beds', 'occupancy'],
  },
];

export default BUSINESS_TEMPLATES;
