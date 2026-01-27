(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,33525,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"warnOnce",{enumerable:!0,get:function(){return i}});let i=e=>{}},11793,e=>{"use strict";var t=e.i(43476),a=e.i(71645),i=e.i(1196);function s({steps:e,isOpen:s,onClose:n,onComplete:r,storageKey:o}){let[l,c]=(0,a.useState)(0),[d,m]=(0,a.useState)(null),p=e[l],u=l===e.length-1;(0,a.useEffect)(()=>{if(!s||!p?.target)return void m(null);let e=document.querySelector(p.target);e?(m(e.getBoundingClientRect()),e.scrollIntoView({behavior:"smooth",block:"center"})):m(null)},[s,p,l]);let g=(0,a.useCallback)(()=>{u?(localStorage.setItem(o,"completed"),r()):c(e=>e+1)},[u,r,o]),h=()=>{c(e=>Math.max(0,e-1))},y=()=>{localStorage.setItem(o,"skipped"),n()};return((0,a.useEffect)(()=>{let e=e=>{s&&("Escape"===e.key?y():"ArrowRight"===e.key||"Enter"===e.key?g():"ArrowLeft"===e.key&&h())};return window.addEventListener("keydown",e),()=>window.removeEventListener("keydown",e)},[s,g]),s)?(0,t.jsxs)("div",{className:"fixed inset-0 z-[100]",children:[(0,t.jsx)("div",{className:"absolute inset-0 bg-black/70",onClick:y}),d&&(0,t.jsx)("div",{className:"absolute border-2 border-[#d4a853] rounded-lg shadow-[0_0_0_9999px_rgba(0,0,0,0.7)] transition-all duration-300",style:{top:d.top-4,left:d.left-4,width:d.width+8,height:d.height+8}}),(0,t.jsxs)("div",{className:"absolute w-[360px] bg-[#0f2137] border border-[#1e3a5f] rounded-xl shadow-2xl overflow-hidden",style:(()=>{if(!d||p?.position==="center")return{top:"50%",left:"50%",transform:"translate(-50%, -50%)"};let e=0,t=0;switch(p?.position||"bottom"){case"top":e=d.top-200-16,t=d.left+d.width/2-180;break;case"bottom":e=d.bottom+16,t=d.left+d.width/2-180;break;case"left":e=d.top+d.height/2-100,t=d.left-360-16;break;case"right":e=d.top+d.height/2-100,t=d.right+16}return t=Math.max(16,Math.min(t,window.innerWidth-360-16)),e=Math.max(16,Math.min(e,window.innerHeight-200-16)),{top:`${e}px`,left:`${t}px`}})(),children:[(0,t.jsxs)("div",{className:"flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#d4a853] to-[#b8953f]",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)(i.Icons.lightbulb,{className:"w-5 h-5 text-[#0a1929]"}),(0,t.jsxs)("span",{className:"font-semibold text-[#0a1929]",children:["Step ",l+1," of ",e.length]})]}),(0,t.jsx)("button",{onClick:y,className:"p-1 text-[#0a1929]/70 hover:text-[#0a1929] transition-colors",children:(0,t.jsx)(i.Icons.close,{className:"w-4 h-4"})})]}),(0,t.jsxs)("div",{className:"p-4",children:[(0,t.jsx)("h3",{className:"text-lg font-semibold text-white mb-2",children:p.title}),(0,t.jsx)("p",{className:"text-sm text-[#94a3b8] leading-relaxed",children:p.content})]}),(0,t.jsx)("div",{className:"px-4 pb-2",children:(0,t.jsx)("div",{className:"flex gap-1",children:e.map((e,a)=>(0,t.jsx)("div",{className:`flex-1 h-1 rounded-full transition-colors ${a<=l?"bg-[#d4a853]":"bg-[#1e3a5f]"}`},a))})}),(0,t.jsxs)("div",{className:"flex items-center justify-between p-4 border-t border-[#1e3a5f]",children:[(0,t.jsx)("button",{onClick:y,className:"text-sm text-[#64748b] hover:text-white transition-colors",children:"Skip tour"}),(0,t.jsxs)("div",{className:"flex gap-2",children:[l>0&&(0,t.jsx)("button",{onClick:h,className:"px-4 py-2 text-sm font-medium text-white bg-[#1e3a5f] hover:bg-[#2d4a6f] rounded-lg transition-colors",children:"Back"}),(0,t.jsx)("button",{onClick:g,className:"px-4 py-2 text-sm font-medium text-[#0a1929] bg-[#d4a853] hover:bg-[#c49843] rounded-lg transition-colors",children:u?"Get Started":"Next"})]})]})]})]}):null}e.s(["default",()=>s])},16589,1472,e=>{"use strict";var t=e.i(43476),a=e.i(71645);function i({content:e,children:i,position:s="top",delay:n=300}){let[r,o]=(0,a.useState)(!1),[l,c]=(0,a.useState)({x:0,y:0}),d=(0,a.useRef)(null),m=(0,a.useRef)(),p=()=>{m.current=setTimeout(()=>{o(!0)},n)},u=()=>{m.current&&clearTimeout(m.current),o(!1)};return(0,a.useEffect)(()=>{if(r&&d.current){let e=d.current.getBoundingClientRect(),t=window.scrollX,a=window.scrollY,i=e.left+t+e.width/2,n=e.top+a;switch(s){case"bottom":n=e.bottom+a+8;break;case"left":i=e.left+t-8,n=e.top+a+e.height/2;break;case"right":i=e.right+t+8,n=e.top+a+e.height/2;break;default:n=e.top+a-8}c({x:i,y:n})}},[r,s]),(0,t.jsxs)("div",{ref:d,className:"relative inline-flex",onMouseEnter:p,onMouseLeave:u,onFocus:p,onBlur:u,children:[i,r&&(0,t.jsx)("div",{className:`absolute z-50 ${{top:"bottom-full left-1/2 -translate-x-1/2 mb-2",bottom:"top-full left-1/2 -translate-x-1/2 mt-2",left:"right-full top-1/2 -translate-y-1/2 mr-2",right:"left-full top-1/2 -translate-y-1/2 ml-2"}[s]} pointer-events-none`,role:"tooltip",children:(0,t.jsxs)("div",{className:"px-3 py-2 text-xs text-white bg-[#1e3a5f] rounded-lg shadow-lg max-w-xs whitespace-normal border border-[#2d4a6f]",children:[e,(0,t.jsx)("div",{className:`absolute w-0 h-0 border-4 ${{top:"top-full left-1/2 -translate-x-1/2 border-t-[#1e3a5f] border-x-transparent border-b-transparent",bottom:"bottom-full left-1/2 -translate-x-1/2 border-b-[#1e3a5f] border-x-transparent border-t-transparent",left:"left-full top-1/2 -translate-y-1/2 border-l-[#1e3a5f] border-y-transparent border-r-transparent",right:"right-full top-1/2 -translate-y-1/2 border-r-[#1e3a5f] border-y-transparent border-l-transparent"}[s]}`})]})})]})}e.s(["default",()=>i],16589),e.s(["BUILDER_WALKTHROUGH",0,[{title:"Welcome to Prompt Builder!",content:"This tool helps you create powerful prompts for AI assistants like Claude, ChatGPT, Gemini, and Grok - no experience needed. Let me show you how it works.",position:"center"},{target:'[data-tour="intent-input"]',title:"Describe Your Task",content:'Start by typing what you want the AI to help you with. Be specific! For example: "Write a Python script that organizes my photos by date" or "Help me write a professional email".',position:"bottom"},{target:'[data-tour="quick-starts"]',title:"Quick Start Options",content:"Not sure what to type? Click any of these buttons to get started with common tasks. They'll fill in a starting point for you.",position:"top"},{target:'[data-tour="task-detection"]',title:"Smart Detection",content:"As you type, we automatically detect what kind of task you're working on and suggest the best AI for the job. You can always change this in the next step.",position:"bottom"},{title:"That's the Basics!",content:'After you describe your task, you\'ll pick your AI, customize some options, and get a ready-to-use prompt. It only takes about 60 seconds! Click "Get Started" to try it yourself.',position:"center"}],"DASHBOARD_WALKTHROUGH",0,[{title:"Welcome to PromptForge!",content:"This is your command center for creating AI prompts. Let me give you a quick tour of what you can do here.",position:"center"},{target:'[data-tour="nav-builder"]',title:"Prompt Builder",content:"Click here to create new prompts with our guided wizard. It walks you through each step and helps you build powerful prompts without any prior experience.",position:"bottom"},{target:'[data-tour="nav-prompts"]',title:"My Prompts",content:"Browse your saved prompts and templates created by experts. You can use these as starting points for your own work.",position:"bottom"},{target:'[data-tour="nav-playground"]',title:"Playground",content:"Test your prompts in real-time. Write, run, and iterate on prompts with instant feedback from AI models.",position:"bottom"},{target:'[data-tour="quick-stats"]',title:"Quick Stats",content:"Track your usage at a glance - how many prompts you've run, costs, and available templates.",position:"right"},{target:'[data-tour="quick-start"]',title:"Quick Start",content:"Jump straight into common workflows. Click any category to start working with pre-configured templates.",position:"left"},{target:'[data-tour="templates"]',title:"Template Library",content:"Browse our collection of expert-crafted prompt templates. Each one is optimized for specific tasks and ready to use.",position:"top"},{title:"Ready to Build!",content:"That's the tour! Start with the Prompt Builder if you're new, or jump straight into the Playground if you know what you want. Click the help button anytime to see this tour again.",position:"center"}],"PLAYGROUND_WALKTHROUGH",0,[{title:"Welcome to the Playground!",content:"This is where you can build and customize financial analysis prompts. Choose from templates or write your own, then copy them for use with any AI assistant.",position:"center"},{target:'[data-tour="mode-toggle"]',title:"Simple vs Expert Mode",content:"Simple mode guides you through templates step-by-step. Expert mode gives you full control with advanced tools for compression, security scanning, and more.",position:"bottom"},{target:'[data-tour="variables-panel"]',title:"Fill in the Details",content:"Customize your prompt by filling in variables like company names, dates, and financial metrics. Use {{variable}} syntax to create reusable templates.",position:"left"},{target:'[data-tour="output-panel"]',title:"Live Preview",content:"See your prompt update in real-time as you make changes. The preview shows exactly what you'll copy to use with your AI assistant.",position:"left"},{target:'[data-tour="run-button"]',title:"Copy Your Prompt",content:"When you're happy with your prompt, click Copy to save it to your clipboard. Then paste it into Claude, ChatGPT, or any other AI assistant.",position:"bottom"},{title:"You're Ready!",content:"Start by selecting an industry and template in Simple mode, or switch to Expert mode to write prompts from scratch. Click the help button anytime to see this tour again.",position:"center"}],"TOOLTIPS",0,{intentInput:"Describe what you want the AI to help you with. Be specific about your goal.",quickStarts:"Click to quickly start with a common task type.",llmCards:"Choose which AI assistant will run your prompt. Each has different strengths.",detailBrief:"Short, to-the-point answers. Best for simple questions.",detailDetailed:"Thorough answers with explanations. Good balance of depth and length.",detailComprehensive:"Exhaustive coverage including edge cases. Uses more tokens.",toneCasual:"Friendly, conversational style. Good for learning.",toneProfessional:"Business-appropriate language. Great for work.",toneTechnical:"Precise terminology. Best for developers and experts.",includeSteps:"Break responses into numbered steps. Makes complex tasks easier to follow.",includeErrors:"Consider what could go wrong. Essential for production code.",livePreview:"See your prompt being built in real-time as you make choices.",copyButton:"Copy the generated prompt to your clipboard.",testPlayground:"Open this prompt in the Playground to test it with real AI.",promptEditor:"Write your prompt here. Use {{variable}} syntax for reusable parts.",modelSelector:"Different models have different capabilities and costs.",runButton:"Send your prompt to the AI and see the response.",variablesPanel:"Define values that get inserted into your prompt.",outputPanel:"The AI's response appears here after you run your prompt.",tokenCount:"Tokens are the units AI models use. More tokens = higher cost.",temperature:"Higher = more creative. Lower = more focused and deterministic.",recentWork:"Your most recent prompt activity.",quickStart:"Pre-configured workflows for common tasks.",templateCard:"Click to use this template in the Playground.",categoryFilter:"Filter templates by category."}],1472)},52393,e=>{"use strict";let t=[{id:"dcf-valuation",name:"DCF Valuation Model",description:"Build a discounted cash flow analysis with key assumptions and sensitivity",category:"Financial Analysis",categorySlug:"financial-analysis",icon:"📊",prompt:`Create a comprehensive DCF (Discounted Cash Flow) valuation analysis for {{company_name}}.

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

Write in active voice with clear, concise language appropriate for {{audience}}.`,variables:[{name:"document_type",default:"Strategic Analysis",description:"Type of document",type:"select",options:["Strategic Analysis","Investment Recommendation","Market Research","Business Case","Project Proposal","Risk Assessment","Due Diligence Report"]},{name:"subject",default:"",description:"Subject matter",type:"text"},{name:"audience",default:"Executive Leadership",description:"Target audience",type:"select",options:["Executive Leadership","Board of Directors","Investment Committee","External Stakeholders","Cross-functional Team"]},{name:"objective",default:"",description:"Primary objective",type:"text"},{name:"recommendation",default:"",description:"Key recommendation (brief)",type:"text"},{name:"length",default:"1 page",description:"Target length",type:"select",options:["Half page","1 page","2 pages"]},{name:"tone",default:"Professional",description:"Writing tone",type:"select",options:["Professional","Formal","Persuasive","Neutral/Analytical"]}],tags:["executive-summary","communication","writing","professional"],difficulty:"beginner",estimatedTime:"10 min",outputFormats:["memo","pdf"],useCases:["Report writing","Proposal submission","Decision support"]}];e.s(["PROMPT_TEMPLATES",0,t,"TEMPLATE_CATEGORIES",0,[{id:"all",name:"All Templates",icon:"✨",slug:"all",color:"#d4a853"},{id:"Financial Analysis",name:"Financial Analysis",icon:"📊",slug:"financial-analysis",color:"#d4a853"},{id:"Investment Research",name:"Investment Research",icon:"🔍",slug:"investment-research",color:"#14b8a6"},{id:"Strategy & Planning",name:"Strategy & Planning",icon:"⚡",slug:"strategy-planning",color:"#8b5cf6"},{id:"M&A & Deal Work",name:"M&A & Deal Work",icon:"🤝",slug:"ma-deal-work",color:"#f97316"},{id:"Professional Reporting",name:"Professional Reporting",icon:"📑",slug:"professional-reporting",color:"#627d98"}]])},31713,e=>{"use strict";var t=e.i(43476),a=e.i(71645),i=e.i(22016);function s({onComplete:e,duration:i=3e3}){let[s,n]=(0,a.useState)(!1);return(0,a.useEffect)(()=>{let t=setTimeout(()=>{n(!0)},i-500),a=setTimeout(()=>{e()},i);return()=>{clearTimeout(t),clearTimeout(a)}},[i,e]),(0,t.jsxs)("div",{className:`fixed inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-500 ${s?"opacity-0":"opacity-100"}`,style:{background:"linear-gradient(135deg, #0a1929 0%, #102a43 50%, #1a3352 100%)"},children:[(0,t.jsx)("div",{className:"absolute inset-0 bg-gradient-mesh opacity-30"}),(0,t.jsx)("div",{className:"absolute inset-0 bg-gradient-radial"}),(0,t.jsx)("div",{className:"absolute inset-0 overflow-hidden opacity-10",children:(0,t.jsxs)("svg",{className:"absolute bottom-0 left-0 w-full h-48",viewBox:"0 0 400 100",preserveAspectRatio:"none",children:[(0,t.jsx)("path",{d:"M0,80 Q50,70 100,60 T200,50 T300,40 T400,30",fill:"none",stroke:"#d4a853",strokeWidth:"1",className:"animate-chart-draw",style:{strokeDasharray:"100",animationDelay:"0.5s"}}),(0,t.jsx)("path",{d:"M0,90 Q80,80 150,75 T280,60 T400,45",fill:"none",stroke:"#14b8a6",strokeWidth:"1",className:"animate-chart-draw",style:{strokeDasharray:"100",animationDelay:"0.8s"}})]})}),(0,t.jsxs)("div",{className:"relative z-10 flex flex-col items-center",children:[(0,t.jsxs)("div",{className:"relative mb-8",children:[(0,t.jsx)("div",{className:"w-24 h-24 rounded-2xl bg-gradient-to-br from-[#d4a853] to-[#b8953f] flex items-center justify-center neu-shadow animate-float",children:(0,t.jsx)("svg",{className:"w-14 h-14 text-[#0a1929]",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:1.5,children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"})})}),(0,t.jsx)("div",{className:"absolute inset-0 w-24 h-24 rounded-2xl animate-ping",style:{background:"rgba(212, 168, 83, 0.2)",animationDuration:"2s"}})]}),(0,t.jsxs)("h1",{className:"text-5xl font-bold mb-3 animate-slide-up",children:[(0,t.jsx)("span",{style:{color:"#d4a853"},children:"Prompt"}),(0,t.jsx)("span",{className:"text-white",children:"Forge"})]}),(0,t.jsx)("p",{className:"text-[#94a3b8] text-lg animate-slide-up",style:{animationDelay:"0.1s"},children:"AI-Powered Financial Analysis"}),(0,t.jsx)("div",{className:"mt-4 px-4 py-1.5 rounded-full border animate-slide-up",style:{borderColor:"rgba(212, 168, 83, 0.3)",background:"rgba(212, 168, 83, 0.1)",animationDelay:"0.2s"},children:(0,t.jsx)("span",{className:"text-sm",style:{color:"#d4a853"},children:"For Finance Professionals"})}),(0,t.jsxs)("div",{className:"mt-12 flex items-center gap-2",children:[(0,t.jsx)("div",{className:"w-2 h-2 rounded-full animate-pulse",style:{background:"#d4a853",animationDelay:"0s"}}),(0,t.jsx)("div",{className:"w-2 h-2 rounded-full animate-pulse",style:{background:"#d4a853",animationDelay:"0.2s"}}),(0,t.jsx)("div",{className:"w-2 h-2 rounded-full animate-pulse",style:{background:"#d4a853",animationDelay:"0.4s"}})]})]}),(0,t.jsx)("div",{className:"absolute bottom-8 text-[#64748b] text-sm",children:"v2.0.0 • 18 Finance Templates"})]})}var n=e.i(1196);let r=[{id:"analyst",title:"Analyst",description:"Building models, research, and analysis",icon:"calculator"},{id:"associate",title:"Associate",description:"Deal execution and client management",icon:"briefcase"},{id:"vp",title:"VP / Director",description:"Team leadership and deal origination",icon:"users"},{id:"csuite",title:"C-Suite / Partner",description:"Strategic decisions and oversight",icon:"building"}],o=[{id:"valuation",title:"Valuation & Modeling",description:"DCF, Comps, LBO, and financial models",icon:"chart",templates:["DCF Valuation","Comps Analysis","Sensitivity Analysis"]},{id:"research",title:"Investment Research",description:"Due diligence, market sizing, competitive intel",icon:"search",templates:["Due Diligence","TAM/SAM/SOM","Competitive Intel"]},{id:"reporting",title:"Reporting & Communication",description:"Investor updates, board decks, executive summaries",icon:"presentation",templates:["Board Deck","Investor Update","Executive Summary"]},{id:"strategy",title:"Strategy & Planning",description:"SWOT, OKRs, scenario planning, business plans",icon:"target",templates:["SWOT Analysis","OKR Framework","Scenario Planning"]}];function l({onComplete:e}){let[i,s]=(0,a.useState)(1),[l,c]=(0,a.useState)(null),[d,m]=(0,a.useState)(null),p=()=>2===i?null!==l:3!==i||null!==d;return(0,t.jsxs)("div",{className:"fixed inset-0 z-50 flex flex-col items-center justify-center p-6",style:{background:"linear-gradient(135deg, #0a1929 0%, #102a43 50%, #1a3352 100%)"},children:[(0,t.jsx)("div",{className:"absolute inset-0 bg-gradient-mesh opacity-20"}),i<5&&(0,t.jsx)("button",{onClick:()=>{localStorage.setItem("promptforge-onboarded","true"),e()},className:"absolute top-6 right-6 text-sm text-[#64748b] hover:text-[#94a3b8] transition-colors",children:"Skip"}),(0,t.jsx)("div",{className:"absolute top-6 left-1/2 -translate-x-1/2 flex gap-2",children:Array.from({length:5},(e,a)=>(0,t.jsx)("div",{className:`h-1.5 rounded-full transition-all ${a+1<=i?"w-8 bg-[#d4a853]":"w-4 bg-[#1e3a5f]"}`},a))}),(0,t.jsx)("div",{className:"relative z-10 flex flex-col items-center justify-center flex-1 w-full",children:(()=>{switch(i){case 1:return(0,t.jsxs)("div",{className:"text-center max-w-lg animate-fade-in",children:[(0,t.jsx)("div",{className:"w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#d4a853] to-[#b8953f] flex items-center justify-center",children:(0,t.jsx)(n.Icons.sparkles,{className:"w-10 h-10 text-[#0a1929]"})}),(0,t.jsx)("h2",{className:"text-3xl font-bold text-white mb-4",children:"Welcome to PromptForge"}),(0,t.jsx)("p",{className:"text-[#94a3b8] text-lg mb-2",children:"AI-Powered Financial Analysis"}),(0,t.jsx)("p",{className:"text-[#64748b] mb-8",children:"Create professional-grade financial analysis prompts in minutes. Built for investment banking, private equity, and corporate finance professionals."}),(0,t.jsxs)("div",{className:"flex flex-wrap justify-center gap-3",children:[(0,t.jsx)("span",{className:"badge badge-gold",children:"18 Finance Templates"}),(0,t.jsx)("span",{className:"badge badge-teal",children:"Excel-Ready Output"}),(0,t.jsx)("span",{className:"badge badge-navy",children:"Enterprise Grade"})]})]});case 2:return(0,t.jsxs)("div",{className:"w-full max-w-2xl animate-fade-in",children:[(0,t.jsx)("h2",{className:"text-2xl font-bold text-white text-center mb-2",children:"What's your role?"}),(0,t.jsx)("p",{className:"text-[#94a3b8] text-center mb-8",children:"We'll customize your experience based on your level"}),(0,t.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:r.map(e=>{let a=n.Icons[e.icon];return(0,t.jsx)("button",{onClick:()=>c(e.id),className:`p-5 rounded-xl border text-left transition-all ${l===e.id?"border-[#d4a853] bg-[rgba(212,168,83,0.1)]":"border-[#1e3a5f] bg-[#0f2137] hover:border-[#2d4a6f]"}`,children:(0,t.jsxs)("div",{className:"flex items-start gap-4",children:[(0,t.jsx)("div",{className:`p-2 rounded-lg ${l===e.id?"bg-[rgba(212,168,83,0.2)]":"bg-[#162a45]"}`,children:a&&(0,t.jsx)(a,{className:`w-6 h-6 ${l===e.id?"text-[#d4a853]":"text-[#627d98]"}`})}),(0,t.jsxs)("div",{children:[(0,t.jsx)("h3",{className:`font-semibold ${l===e.id?"text-white":"text-[#94a3b8]"}`,children:e.title}),(0,t.jsx)("p",{className:"text-sm text-[#64748b] mt-1",children:e.description})]}),l===e.id&&(0,t.jsx)("div",{className:"ml-auto",children:(0,t.jsx)(n.Icons.check,{className:"w-5 h-5 text-[#d4a853]"})})]})},e.id)})})]});case 3:return(0,t.jsxs)("div",{className:"w-full max-w-2xl animate-fade-in",children:[(0,t.jsx)("h2",{className:"text-2xl font-bold text-white text-center mb-2",children:"Primary use case?"}),(0,t.jsx)("p",{className:"text-[#94a3b8] text-center mb-8",children:"We'll recommend the best templates for your workflow"}),(0,t.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:o.map(e=>{let a=n.Icons[e.icon];return(0,t.jsx)("button",{onClick:()=>m(e.id),className:`p-5 rounded-xl border text-left transition-all ${d===e.id?"border-[#d4a853] bg-[rgba(212,168,83,0.1)]":"border-[#1e3a5f] bg-[#0f2137] hover:border-[#2d4a6f]"}`,children:(0,t.jsxs)("div",{className:"flex items-start gap-4",children:[(0,t.jsx)("div",{className:`p-2 rounded-lg ${d===e.id?"bg-[rgba(212,168,83,0.2)]":"bg-[#162a45]"}`,children:a&&(0,t.jsx)(a,{className:`w-6 h-6 ${d===e.id?"text-[#d4a853]":"text-[#627d98]"}`})}),(0,t.jsxs)("div",{className:"flex-1",children:[(0,t.jsx)("h3",{className:`font-semibold ${d===e.id?"text-white":"text-[#94a3b8]"}`,children:e.title}),(0,t.jsx)("p",{className:"text-sm text-[#64748b] mt-1",children:e.description}),d===e.id&&(0,t.jsx)("div",{className:"flex flex-wrap gap-1 mt-2",children:e.templates.map(e=>(0,t.jsx)("span",{className:"text-xs px-2 py-0.5 rounded bg-[rgba(212,168,83,0.15)] text-[#d4a853]",children:e},e))})]}),d===e.id&&(0,t.jsx)(n.Icons.check,{className:"w-5 h-5 text-[#d4a853] shrink-0"})]})},e.id)})})]});case 4:return(0,t.jsxs)("div",{className:"w-full max-w-3xl animate-fade-in",children:[(0,t.jsx)("h2",{className:"text-2xl font-bold text-white text-center mb-2",children:"See it in action"}),(0,t.jsx)("p",{className:"text-[#94a3b8] text-center mb-8",children:"Here's how PromptForge helps you create professional financial analysis"}),(0,t.jsxs)("div",{className:"bg-[#0f2137] rounded-2xl border border-[#1e3a5f] p-6 mb-6",children:[(0,t.jsxs)("div",{className:"flex items-center gap-3 mb-4 pb-4 border-b border-[#1e3a5f]",children:[(0,t.jsx)("div",{className:"w-10 h-10 rounded-lg bg-gradient-to-br from-[#d4a853] to-[#b8953f] flex items-center justify-center text-xl",children:"📊"}),(0,t.jsxs)("div",{children:[(0,t.jsx)("h4",{className:"font-semibold text-white",children:"DCF Valuation Model"}),(0,t.jsx)("p",{className:"text-sm text-[#64748b]",children:"Financial Analysis • Advanced • 30 min"})]}),(0,t.jsxs)("div",{className:"ml-auto flex gap-2",children:[(0,t.jsx)("span",{className:"badge badge-excel text-xs",children:"Excel"}),(0,t.jsx)("span",{className:"badge badge-memo text-xs",children:"Memo"})]})]}),(0,t.jsxs)("div",{className:"grid grid-cols-2 gap-4 mb-4",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-sm text-[#94a3b8] mb-1",children:"Company Name"}),(0,t.jsx)("div",{className:"px-3 py-2 rounded-lg bg-[#0a1929] border border-[#1e3a5f] text-white text-sm",children:"Acme Corporation"})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-sm text-[#94a3b8] mb-1",children:"Industry"}),(0,t.jsx)("div",{className:"px-3 py-2 rounded-lg bg-[#0a1929] border border-[#1e3a5f] text-white text-sm",children:"Technology"})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-sm text-[#94a3b8] mb-1",children:"Revenue ($M)"}),(0,t.jsx)("div",{className:"px-3 py-2 rounded-lg bg-[#0a1929] border border-[#1e3a5f] text-white text-sm tabular-nums",children:"$250.0M"})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-sm text-[#94a3b8] mb-1",children:"WACC Range"}),(0,t.jsx)("div",{className:"px-3 py-2 rounded-lg bg-[#0a1929] border border-[#1e3a5f] text-white text-sm tabular-nums",children:"8% - 12%"})]})]}),(0,t.jsxs)("div",{className:"p-3 rounded-lg bg-[#0a1929] border border-[#1e3a5f]",children:[(0,t.jsx)("p",{className:"text-xs text-[#64748b] mb-2",children:"Generated Prompt Preview:"}),(0,t.jsx)("p",{className:"text-sm text-[#94a3b8] line-clamp-2",children:"Create a comprehensive DCF (Discounted Cash Flow) valuation analysis for Acme Corporation in the Technology sector..."})]})]}),(0,t.jsxs)("div",{className:"grid grid-cols-3 gap-4",children:[(0,t.jsxs)("div",{className:"text-center p-4 rounded-xl bg-[#0f2137] border border-[#1e3a5f]",children:[(0,t.jsx)("div",{className:"text-2xl font-bold text-[#d4a853] tabular-nums",children:"18"}),(0,t.jsx)("div",{className:"text-sm text-[#64748b]",children:"Finance Templates"})]}),(0,t.jsxs)("div",{className:"text-center p-4 rounded-xl bg-[#0f2137] border border-[#1e3a5f]",children:[(0,t.jsx)("div",{className:"text-2xl font-bold text-[#14b8a6] tabular-nums",children:"5"}),(0,t.jsx)("div",{className:"text-sm text-[#64748b]",children:"Categories"})]}),(0,t.jsxs)("div",{className:"text-center p-4 rounded-xl bg-[#0f2137] border border-[#1e3a5f]",children:[(0,t.jsx)("div",{className:"text-2xl font-bold text-[#627d98]",children:"4"}),(0,t.jsx)("div",{className:"text-sm text-[#64748b]",children:"Export Formats"})]})]})]});case 5:return(0,t.jsxs)("div",{className:"text-center max-w-lg animate-fade-in",children:[(0,t.jsx)("div",{className:"w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#059669] to-[#10b981] flex items-center justify-center",children:(0,t.jsx)(n.Icons.check,{className:"w-10 h-10 text-white"})}),(0,t.jsx)("h2",{className:"text-3xl font-bold text-white mb-4",children:"You're all set!"}),(0,t.jsx)("p",{className:"text-[#94a3b8] text-lg mb-8",children:"Start creating professional financial analysis prompts with PromptForge."}),(0,t.jsxs)("div",{className:"text-left bg-[#0f2137] rounded-xl border border-[#1e3a5f] p-4 mb-6",children:[(0,t.jsx)("h4",{className:"text-sm font-medium text-[#94a3b8] mb-3",children:"Recommended for you:"}),(0,t.jsx)("div",{className:"space-y-2",children:d&&o.find(e=>e.id===d)?.templates.map(e=>(0,t.jsxs)("div",{className:"flex items-center gap-3 p-2 rounded-lg hover:bg-[#162a45] transition-colors cursor-pointer",children:[(0,t.jsx)("div",{className:"w-8 h-8 rounded-lg bg-[rgba(212,168,83,0.15)] flex items-center justify-center",children:(0,t.jsx)(n.Icons.template,{className:"w-4 h-4 text-[#d4a853]"})}),(0,t.jsx)("span",{className:"text-sm text-white",children:e}),(0,t.jsx)(n.Icons.arrowRight,{className:"w-4 h-4 text-[#64748b] ml-auto"})]},e))})]})]})}})()}),(0,t.jsxs)("div",{className:"relative z-10 w-full max-w-2xl flex justify-between items-center pt-6",children:[i>1?(0,t.jsxs)("button",{onClick:()=>s(i-1),className:"flex items-center gap-2 text-[#94a3b8] hover:text-white transition-colors",children:[(0,t.jsx)(n.Icons.arrowLeft,{className:"w-4 h-4"}),"Back"]}):(0,t.jsx)("div",{}),(0,t.jsxs)("button",{onClick:()=>{i<5?s(i+1):(l&&localStorage.setItem("userRole",l),d&&localStorage.setItem("userUseCase",d),localStorage.setItem("promptforge-onboarded","true"),e())},disabled:!p(),className:`btn-primary flex items-center gap-2 ${!p()?"opacity-50 cursor-not-allowed":""}`,children:[5===i?"Get Started":"Continue",(0,t.jsx)(n.Icons.arrowRight,{className:"w-4 h-4"})]})]})]})}var c=e.i(11793),d=e.i(16589),m=e.i(52393),p=e.i(1472);let u=[{id:"ib",name:"Investment Banking",icon:"building",templates:["dcf-valuation","comparable-companies","pitch-deck"],color:"#d4a853"},{id:"pe",name:"Private Equity",icon:"briefcase",templates:["investment-memo","due-diligence","term-sheet"],color:"#14b8a6"},{id:"corp",name:"Corporate Finance",icon:"chart",templates:["business-plan","board-deck","investor-update"],color:"#8b5cf6"},{id:"strategy",name:"Strategy Consulting",icon:"target",templates:["swot-analysis","competitive-intelligence","tam-sam-som"],color:"#f97316"}],g=[{name:"DCF - Acme Corp",template:"DCF Valuation",time:"2 hours ago",status:"completed"},{name:"DD Framework - TechCo",template:"Due Diligence",time:"5 hours ago",status:"in-progress"},{name:"Q4 Board Deck",template:"Board Deck",time:"1 day ago",status:"completed"}];function h(){let[e,r]=(0,a.useState)(!0),[o,h]=(0,a.useState)(!1),[y,f]=(0,a.useState)(!1),[x,v]=(0,a.useState)(!1),[b,w]=(0,a.useState)("all"),[k,j]=(0,a.useState)("");(0,a.useEffect)(()=>{localStorage.getItem("promptforge-onboarded")||h(!0)},[]),(0,a.useEffect)(()=>{if(x&&!o&&!localStorage.getItem("promptforge-dashboard-tour")){let e=setTimeout(()=>f(!0),1e3);return()=>clearTimeout(e)}},[x,o]);let C=m.PROMPT_TEMPLATES.filter(e=>{let t="all"===b||e.category===b,a=""===k||e.name.toLowerCase().includes(k.toLowerCase())||e.description.toLowerCase().includes(k.toLowerCase());return t&&a});return(0,t.jsxs)(t.Fragment,{children:[e&&(0,t.jsx)(s,{onComplete:()=>{r(!1),v(!0)},duration:3e3}),!e&&o&&(0,t.jsx)(l,{onComplete:()=>{h(!1)}}),(0,t.jsxs)("main",{className:`min-h-screen transition-opacity duration-500 ${x?"opacity-100":"opacity-0"}`,children:[(0,t.jsx)("div",{className:"fixed inset-0 bg-gradient-mesh pointer-events-none"}),(0,t.jsxs)("nav",{className:"relative z-10 flex items-center justify-between px-6 py-4 border-b border-[#1e3a5f]",children:[(0,t.jsxs)("div",{className:"flex items-center gap-8",children:[(0,t.jsxs)(i.default,{href:"/",className:"flex items-center gap-3",children:[(0,t.jsx)("div",{className:"w-10 h-10 rounded-xl bg-gradient-to-br from-[#d4a853] to-[#b8953f] flex items-center justify-center",children:(0,t.jsx)(n.Icons.chart,{className:"w-6 h-6 text-[#0a1929]"})}),(0,t.jsxs)("span",{className:"text-xl font-bold",children:[(0,t.jsx)("span",{className:"text-[#d4a853]",children:"Prompt"}),(0,t.jsx)("span",{className:"text-white",children:"Forge"})]})]}),(0,t.jsxs)("div",{className:"hidden md:flex items-center gap-1",children:[(0,t.jsx)(i.default,{href:"/",className:"px-4 py-2 text-white font-medium rounded-lg bg-[rgba(212,168,83,0.1)]",children:"Dashboard"}),(0,t.jsx)(d.default,{content:"Create prompts with our guided wizard",position:"bottom",children:(0,t.jsx)(i.default,{href:"/builder","data-tour":"nav-builder",className:"px-4 py-2 text-[#94a3b8] hover:text-white transition-colors rounded-lg hover:bg-[#162a45]",children:"Prompt Builder"})}),(0,t.jsx)(d.default,{content:"Browse your saved prompts and templates",position:"bottom",children:(0,t.jsx)(i.default,{href:"/prompts","data-tour":"nav-prompts",className:"px-4 py-2 text-[#94a3b8] hover:text-white transition-colors rounded-lg hover:bg-[#162a45]",children:"My Prompts"})}),(0,t.jsx)(d.default,{content:"Test prompts with AI models",position:"bottom",children:(0,t.jsx)(i.default,{href:"/playground","data-tour":"nav-playground",className:"px-4 py-2 text-[#94a3b8] hover:text-white transition-colors rounded-lg hover:bg-[#162a45]",children:"Playground"})})]})]}),(0,t.jsxs)("div",{className:"flex items-center gap-3",children:[(0,t.jsx)("button",{onClick:()=>{localStorage.removeItem("promptforge-dashboard-tour"),f(!0)},className:"p-2 text-[#64748b] hover:text-[#d4a853] transition-colors",title:"Show onboarding",children:(0,t.jsx)(n.Icons.help,{className:"w-5 h-5"})}),(0,t.jsx)("button",{className:"p-2 text-[#64748b] hover:text-white transition-colors",children:(0,t.jsx)(n.Icons.settings,{className:"w-5 h-5"})}),(0,t.jsx)("div",{className:"w-8 h-8 rounded-full bg-gradient-to-br from-[#d4a853] to-[#b8953f] flex items-center justify-center text-[#0a1929] text-sm font-semibold",children:"H"})]})]}),(0,t.jsxs)("div",{className:"relative z-10 px-6 py-8 max-w-7xl mx-auto",children:[(0,t.jsxs)("div",{className:"mb-8",children:[(0,t.jsx)("h1",{className:"text-3xl font-bold text-white mb-2",children:"Welcome back"}),(0,t.jsx)("p",{className:"text-[#94a3b8]",children:"Select a template or start from scratch to create your financial analysis prompt."})]}),(0,t.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8",children:[(0,t.jsxs)("div",{className:"card p-6","data-tour":"quick-stats",children:[(0,t.jsxs)("h3",{className:"text-sm font-medium text-[#94a3b8] mb-4 flex items-center gap-2",children:[(0,t.jsx)(n.Icons.chartLine,{className:"w-4 h-4"}),"Quick Stats"]}),(0,t.jsxs)("div",{className:"grid grid-cols-2 gap-4",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{className:"text-2xl font-bold text-[#d4a853] tabular-nums",children:"$0.00"}),(0,t.jsx)("div",{className:"text-xs text-[#64748b]",children:"Cost MTD"})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{className:"text-2xl font-bold text-white tabular-nums",children:"0"}),(0,t.jsx)("div",{className:"text-xs text-[#64748b]",children:"Executions"})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{className:"text-2xl font-bold text-[#14b8a6] tabular-nums",children:"18"}),(0,t.jsx)("div",{className:"text-xs text-[#64748b]",children:"Templates"})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{className:"text-2xl font-bold text-[#627d98] tabular-nums",children:"5"}),(0,t.jsx)("div",{className:"text-xs text-[#64748b]",children:"Categories"})]})]})]}),(0,t.jsxs)("div",{className:"card p-6",children:[(0,t.jsxs)("h3",{className:"text-sm font-medium text-[#94a3b8] mb-4 flex items-center gap-2",children:[(0,t.jsx)(n.Icons.history,{className:"w-4 h-4"}),"Recent Work"]}),(0,t.jsx)("div",{className:"space-y-3",children:g.map((e,a)=>(0,t.jsxs)("div",{className:"flex items-center gap-3 text-sm",children:[(0,t.jsx)("div",{className:`w-2 h-2 rounded-full ${"completed"===e.status?"bg-[#059669]":"bg-[#d4a853]"}`}),(0,t.jsx)("div",{className:"flex-1 truncate",children:(0,t.jsx)("span",{className:"text-white",children:e.name})}),(0,t.jsx)("span",{className:"text-[#64748b] text-xs",children:e.time})]},a))}),0===g.length&&(0,t.jsx)("p",{className:"text-[#64748b] text-sm",children:"No recent work yet"})]}),(0,t.jsxs)("div",{className:"card p-6","data-tour":"quick-start",children:[(0,t.jsxs)("h3",{className:"text-sm font-medium text-[#94a3b8] mb-4 flex items-center gap-2",children:[(0,t.jsx)(n.Icons.bolt,{className:"w-4 h-4"}),"Quick Start"]}),(0,t.jsx)("div",{className:"grid grid-cols-2 gap-2",children:u.map(e=>{let a=n.Icons[e.icon];return(0,t.jsx)(i.default,{href:`/playground?template=${e.templates[0]}`,className:"p-3 rounded-lg border border-[#1e3a5f] hover:border-[#2d4a6f] bg-[#0f2137] hover:bg-[#162a45] transition-all group",children:(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)("div",{className:"w-8 h-8 rounded-lg flex items-center justify-center",style:{background:`${e.color}20`},children:a&&(0,t.jsx)(a,{className:"w-4 h-4",style:{color:e.color}})}),(0,t.jsx)("span",{className:"text-xs text-[#94a3b8] group-hover:text-white transition-colors",children:e.name})]})},e.id)})})]})]}),(0,t.jsxs)("div",{className:"card p-6","data-tour":"templates",children:[(0,t.jsxs)("div",{className:"flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6",children:[(0,t.jsx)("h2",{className:"text-xl font-bold text-white",children:"Financial Templates"}),(0,t.jsxs)("div",{className:"relative",children:[(0,t.jsx)(n.Icons.search,{className:"absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b]"}),(0,t.jsx)("input",{type:"text",placeholder:"Search templates...",value:k,onChange:e=>j(e.target.value),className:"pl-10 pr-4 py-2 bg-[#0a1929] border border-[#1e3a5f] rounded-lg text-sm text-white placeholder-[#64748b] focus:border-[#d4a853] focus:outline-none w-64"})]})]}),(0,t.jsx)("div",{className:"flex gap-2 mb-6 overflow-x-auto pb-2",children:m.TEMPLATE_CATEGORIES.map(e=>(0,t.jsxs)("button",{onClick:()=>w(e.id),className:`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all ${b===e.id?"bg-[rgba(212,168,83,0.15)] text-[#d4a853] border border-[rgba(212,168,83,0.3)]":"text-[#94a3b8] hover:text-white hover:bg-[#162a45]"}`,children:[(0,t.jsx)("span",{className:"mr-2",children:e.icon}),e.name]},e.id))}),(0,t.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",children:C.slice(0,9).map(e=>(0,t.jsx)(i.default,{href:`/playground?template=${e.id}`,className:"group p-5 rounded-xl border border-[#1e3a5f] bg-[#0f2137] hover:border-[#d4a853] hover:bg-[#162a45] transition-all",children:(0,t.jsxs)("div",{className:"flex items-start gap-4",children:[(0,t.jsx)("div",{className:"w-12 h-12 rounded-xl bg-gradient-to-br from-[#d4a853] to-[#b8953f] flex items-center justify-center text-2xl shrink-0",children:e.icon}),(0,t.jsxs)("div",{className:"flex-1 min-w-0",children:[(0,t.jsx)("h3",{className:"font-semibold text-white group-hover:text-[#d4a853] transition-colors truncate",children:e.name}),(0,t.jsx)("p",{className:"text-sm text-[#64748b] line-clamp-2 mt-1",children:e.description}),(0,t.jsxs)("div",{className:"flex items-center gap-2 mt-3",children:[(0,t.jsx)("span",{className:`badge badge-${e.difficulty}`,children:e.difficulty}),(0,t.jsx)("span",{className:"text-xs text-[#64748b]",children:e.estimatedTime}),e.outputFormats.includes("excel")&&(0,t.jsx)("span",{className:"badge badge-excel text-xs",children:"Excel"}),e.outputFormats.includes("powerpoint")&&(0,t.jsx)("span",{className:"badge badge-powerpoint text-xs",children:"PPT"})]})]})]})},e.id))}),C.length>9&&(0,t.jsx)("div",{className:"text-center mt-6",children:(0,t.jsxs)(i.default,{href:"/playground",className:"btn-secondary inline-flex items-center gap-2",children:["View all ",C.length," templates",(0,t.jsx)(n.Icons.arrowRight,{className:"w-4 h-4"})]})})]}),(0,t.jsx)("div",{className:"mt-8 card card-gold p-8 bg-gradient-navy-gold",children:(0,t.jsxs)("div",{className:"flex flex-col md:flex-row items-center justify-between gap-6",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("h2",{className:"text-2xl font-bold text-white mb-2",children:"Build powerful prompts in 4 simple steps"}),(0,t.jsx)("p",{className:"text-[#94a3b8]",children:"Create prompts for Claude Code, ChatGPT, Gemini, or Grok - no prompt engineering experience needed."})]}),(0,t.jsxs)("div",{className:"flex gap-4",children:[(0,t.jsxs)(i.default,{href:"/builder",className:"btn-primary",children:["Start Building",(0,t.jsx)(n.Icons.arrowRight,{className:"w-4 h-4 ml-2"})]}),(0,t.jsx)(i.default,{href:"/playground",className:"btn-secondary",children:"Playground"})]})]})})]}),(0,t.jsx)("footer",{className:"relative z-10 px-6 py-8 border-t border-[#1e3a5f] mt-12",children:(0,t.jsxs)("div",{className:"max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2 text-[#64748b]",children:[(0,t.jsx)("span",{className:"text-[#d4a853] font-semibold",children:"PromptForge"}),(0,t.jsx)("span",{children:"•"}),(0,t.jsx)("span",{children:"AI-Powered Financial Analysis"})]}),(0,t.jsxs)("div",{className:"flex items-center gap-4",children:[(0,t.jsx)("span",{className:"text-[#64748b] text-sm",children:"v2.0.0"}),(0,t.jsx)("a",{href:"https://github.com",target:"_blank",rel:"noopener noreferrer",className:"text-[#64748b] hover:text-white transition-colors",children:(0,t.jsx)(n.Icons.github,{className:"w-5 h-5"})})]})]})}),(0,t.jsx)(c.default,{steps:p.DASHBOARD_WALKTHROUGH,isOpen:y,onClose:()=>f(!1),onComplete:()=>f(!1),storageKey:"promptforge-dashboard-tour"})]})]})}e.s(["default",()=>h],31713)}]);