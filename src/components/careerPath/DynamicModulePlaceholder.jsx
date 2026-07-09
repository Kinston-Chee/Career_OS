import React from 'react'
import { 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ListTodo, 
  ListChecks, 
  Check, 
  X, 
  Zap, 
  TrendingUp, 
  Activity,
  BookOpen,
  Code2,
  Award,
  ChevronDown,
  ChevronRight,
  Milestone,
  Bookmark,
  Sparkles,
  Folder,
  Briefcase,
  Users,
  Play,
  BarChart3
} from 'lucide-react'
import { careerPathNetwork } from '../../data/mockData'

// ---------------------------------------------------------------------------
// Realistic Predictive Roadmap Data for all roles in the graph
// ---------------------------------------------------------------------------

const ROADMAP_DATA = {
  'data-scientist': {
    timeline: '12-18 months',
    steps: ['Current: Graduating', '6mo: Jr. Role', '12mo: Mid-level', '18mo: Goal'],
    currentIndex: 2, // 12mo: Mid-level
    existingGaps: ['SQL', 'Statistics'],
    missingGaps: ['Advanced Python for Data Science', 'Hadoop/Spark, or a relevant project', 'Or a relevant project experience'],
    actions: [
      'Action 1: Acquire Python for Data Science certification (e.g., from Coursera/Udemy).',
      'Action 2: Complete a portfolio project on Machine Learning model deployment.',
      'Action 3: Secure a Junior Data Analyst role to build initial experience.'
    ],
    skills: [
      { label: 'Python', value: 60, color: 'bg-emerald-500' },
      { label: 'Data Wrangling', value: 40, color: 'bg-blue-500' },
      { label: 'AI/ML', value: 20, color: 'bg-rose-500' },
      { label: 'Communication', value: 85, color: 'bg-indigo-500' }
    ]
  },
  'software-engineer': {
    timeline: '6-12 months',
    steps: ['Current: Intern', '3mo: Assoc. Dev', '6mo: Mid Developer', '12mo: Goal'],
    currentIndex: 1, // 3mo: Assoc. Dev
    existingGaps: ['Python', 'React', 'Git'],
    missingGaps: ['System Design Foundations', 'Data Structures & Algorithms', 'Cloud Infrastructure (AWS/GCP)'],
    actions: [
      'Action 1: Complete a specialized System Design prep course.',
      'Action 2: Practice 50+ medium LeetCode questions focusing on arrays and trees.',
      'Action 3: Deploy a full-stack React project on AWS or Vercel.'
    ],
    skills: [
      { label: 'System Design', value: 30, color: 'bg-rose-500' },
      { label: 'Data Structures', value: 50, color: 'bg-blue-500' },
      { label: 'Cloud Hosting', value: 25, color: 'bg-amber-500' },
      { label: 'Git / Collaboration', value: 90, color: 'bg-emerald-500' }
    ]
  },
  'data-analyst': {
    timeline: '3-6 months',
    steps: ['Current: Student', '2mo: Excel Spec', '4mo: Data Intern', '6mo: Goal'],
    currentIndex: 2, // 4mo: Data Intern
    existingGaps: ['Excel', 'SQL', 'NLP'],
    missingGaps: ['Tableau or Power BI dashboarding', 'A/B Testing basics', 'Advanced SQL joins & indexing'],
    actions: [
      'Action 1: Build 3 interactive dashboards using Power BI or Tableau.',
      'Action 2: Learn SQL query optimization and window functions.',
      'Action 3: Learn basic A/B testing principles for product analytics.'
    ],
    skills: [
      { label: 'Excel & Sheets', value: 85, color: 'bg-emerald-500' },
      { label: 'Dashboarding', value: 45, color: 'bg-blue-500' },
      { label: 'Advanced SQL', value: 55, color: 'bg-indigo-500' },
      { label: 'Data Wrangling', value: 70, color: 'bg-purple-500' }
    ]
  },
  'product-manager': {
    timeline: '18-24 months',
    steps: ['Current: SWE Intern', '6mo: APM', '12mo: Product Owner', '24mo: Goal'],
    currentIndex: 1, // 6mo: APM
    existingGaps: ['Leadership', 'Communication', 'NLP'],
    missingGaps: ['Business Strategy & Finance', 'Product Lifecycle Management', 'Agile Product Owner certification'],
    actions: [
      'Action 1: Shadow senior PMs at Grab and lead feature definition.',
      'Action 2: Earn a Scrum Product Owner (CSPO) certification.',
      'Action 3: Study 5 case analyses of tech startup business models.'
    ],
    skills: [
      { label: 'Product Lifecycle', value: 40, color: 'bg-amber-500' },
      { label: 'Agile & Scrum', value: 65, color: 'bg-blue-500' },
      { label: 'Business Strategy', value: 30, color: 'bg-rose-500' },
      { label: 'Stakeholder Comms', value: 85, color: 'bg-emerald-500' }
    ]
  },
  'data-engineer': {
    timeline: '12-18 months',
    steps: ['Current: Intern', '6mo: Data Analyst', '12mo: Pipeline Dev', '18mo: Goal'],
    currentIndex: 1, // 6mo: Data Analyst
    existingGaps: ['SQL', 'Python'],
    missingGaps: ['ETL pipeline tools (Airflow)', 'Data warehousing (BigQuery/Snowflake)', 'Scala / Java basics'],
    actions: [
      'Action 1: Build an ETL pipeline using Apache Airflow and Postgres.',
      'Action 2: Gain certification in AWS Big Data or Google Cloud Data Engineer.',
      'Action 3: Build a project demonstrating distributed storage with Spark.'
    ],
    skills: [
      { label: 'ETL Pipelines', value: 45, color: 'bg-blue-500' },
      { label: 'Data Warehousing', value: 30, color: 'bg-rose-500' },
      { label: 'Cloud Infrastructure', value: 40, color: 'bg-indigo-500' },
      { label: 'Spark & Hadoop', value: 20, color: 'bg-amber-500' }
    ]
  },
  'bi-analyst': {
    timeline: '6-12 months',
    steps: ['Current: Graduating', '3mo: SQL Intern', '6mo: Jr Analyst', '12mo: Goal'],
    currentIndex: 2, // 6mo: Jr Analyst
    existingGaps: ['SQL', 'Power BI'],
    missingGaps: ['Data warehousing concepts', 'Advanced DAX & expressions', 'Executive communication'],
    actions: [
      'Action 1: Build a complex sales pipeline dashboard using advanced DAX.',
      'Action 2: Take a course on data modeling and dimensional design.',
      'Action 3: Present dashboard findings to simulated executive teams.'
    ],
    skills: [
      { label: 'Power BI', value: 80, color: 'bg-emerald-500' },
      { label: 'SQL queries', value: 70, color: 'bg-blue-500' },
      { label: 'Data Modeling', value: 40, color: 'bg-rose-500' },
      { label: 'Reporting', value: 75, color: 'bg-indigo-500' }
    ]
  },
  'ml-engineer': {
    timeline: '18-24 months',
    steps: ['Current: Student', '6mo: SWE Intern', '12mo: Data Scientist', '24mo: Goal'],
    currentIndex: 1, // 6mo: SWE Intern
    existingGaps: ['Python', 'NLP'],
    missingGaps: ['TensorFlow/PyTorch frameworks', 'MLOps & model deployment', 'GPU scaling & optimisation'],
    actions: [
      'Action 1: Train and deploy a model using PyTorch and FastAPI.',
      'Action 2: Implement a full MLOps pipeline using MLflow.',
      'Action 3: Participate in a Kaggle contest to tune deep learning models.'
    ],
    skills: [
      { label: 'PyTorch/TensorFlow', value: 35, color: 'bg-rose-500' },
      { label: 'MLOps', value: 15, color: 'bg-amber-500' },
      { label: 'Python & Algorithms', value: 75, color: 'bg-blue-500' },
      { label: 'Deep Learning', value: 30, color: 'bg-indigo-500' }
    ]
  },
  'business-analyst': {
    timeline: '6-12 months',
    steps: ['Current: Graduating', '3mo: PM Intern', '6mo: Jr BA', '12mo: Goal'],
    currentIndex: 2, // 6mo: Jr BA
    existingGaps: ['Communication', 'Excel'],
    missingGaps: ['Requirement gathering methodologies', 'Process mapping (BPMN)', 'SQL database queries'],
    actions: [
      'Action 1: Map 3 business processes using BPMN standard software.',
      'Action 2: Earn a Scrum Product Owner or PMI-PBA certification.',
      'Action 3: Learn basic SQL query structures for custom reporting.'
    ],
    skills: [
      { label: 'Process Mapping', value: 50, color: 'bg-blue-500' },
      { label: 'SQL basics', value: 30, color: 'bg-rose-500' },
      { label: 'Requirements', value: 65, color: 'bg-emerald-500' },
      { label: 'Stakeholder Comms', value: 80, color: 'bg-indigo-500' }
    ]
  },
  'financial-analyst': {
    timeline: '12-18 months',
    steps: ['Current: Student', '6mo: Tax Intern', '12mo: Jr Analyst', '18mo: Goal'],
    currentIndex: 1, // 6mo: Tax Intern
    existingGaps: ['Excel', 'Statistics'],
    missingGaps: ['Financial modeling & valuation', 'Corporate finance theories', 'CFA Level 1 preparation'],
    actions: [
      'Action 1: Complete a financial valuation model for a tech startup.',
      'Action 2: Start study and prep for CFA Level 1 exam.',
      'Action 3: Prepare mock quarterly financial reports for a selected brand.'
    ],
    skills: [
      { label: 'Excel Modeling', value: 60, color: 'bg-blue-500' },
      { label: 'Valuation Techniques', value: 25, color: 'bg-rose-500' },
      { label: 'Accounting principles', value: 50, color: 'bg-amber-500' },
      { label: 'Market research', value: 70, color: 'bg-emerald-500' }
    ]
  }
}

// Fallback Default Data
const DEFAULT_ROADMAP = {
  timeline: '12-18 months',
  steps: ['Current: Student', '6mo: Junior Role', '12mo: Mid Level', '18mo: Goal'],
  currentIndex: 1,
  existingGaps: ['Communication', 'Agile Principles'],
  missingGaps: ['Core technical certifications', 'Practical project leadership', 'Advanced tooling knowledge'],
  actions: [
    'Action 1: Enroll in a foundational course for this role.',
    'Action 2: Take on a group project or case challenge.',
    'Action 3: Build a portfolio demonstrating domain competence.'
  ],
  skills: [
    { label: 'Core Technical Skills', value: 40, color: 'bg-blue-500' },
    { label: 'Domain Knowledge', value: 30, color: 'bg-rose-500' },
    { label: 'Methodology & Process', value: 50, color: 'bg-amber-500' },
    { label: 'Soft Skills', value: 75, color: 'bg-emerald-500' }
  ]
}

// ---------------------------------------------------------------------------
// Sub-Modules
// ---------------------------------------------------------------------------

function EmptyState() {
  return (
    <div className="flex min-h-[140px] items-center justify-center rounded-xl border border-dashed border-slate-300 bg-gray-50/60 p-8 text-center animate-[fadeInScale_200ms_ease-out]">
      <p className="text-sm font-semibold italic text-[#9aa6c3]">
        Select a career role node above to project your prediction timeline & gap analysis
      </p>
    </div>
  )
}

function FitModule({ roleId, roleName }) {
  const data = ROADMAP_DATA[roleId] || DEFAULT_ROADMAP
  const matchPercentage = roleId === 'data-analyst' ? 84 : roleId === 'software-engineer' ? 78 : roleId === 'product-manager' ? 61 : 70
  
  return (
    <article className="animate-[slideUp_300ms_ease-out_both] rounded-2xl border border-[#e2eaf8] border-l-[3px] border-l-[#185FA5] bg-white p-6 shadow-[0_8px_22px_rgba(44,76,142,0.07)]">
      <h3 className="text-base font-bold text-[#11194a]">Fit Score · {roleName}</h3>
      <div className="mt-5 grid gap-6 md:grid-cols-[0.8fr_1.25fr_0.95fr]">
        <div>
          <p className="text-5xl font-bold text-[#185FA5]">{matchPercentage}%</p>
          <p className="mt-1 text-sm font-semibold text-[#7382a1]">match score</p>
        </div>
        <div className="space-y-4 border-y border-[#e2eaf8] py-4 md:border-x md:border-y-0 md:px-6 md:py-0">
          <div>
            <p className="text-sm font-bold text-[#11194a]">Strong signals</p>
            <p className="mt-2 text-sm font-semibold text-[#3a4669]">
              <span className="text-emerald-500">●</span> {data.existingGaps.join(' · ')}
            </p>
          </div>
          <div>
            <p className="text-sm font-bold text-[#11194a]">Gaps detected</p>
            <p className="mt-2 text-sm font-semibold text-[#3a4669]">
              <span className="text-orange-500">●</span> {data.missingGaps.map(g => g.split(',')[0]).join(' · ')}
            </p>
          </div>
        </div>
        <div>
          <div className="flex h-28 items-end justify-center gap-8">
            <div className="text-center">
              <p className="mb-2 text-sm font-bold text-[#11194a]">{matchPercentage}%</p>
              <div className="h-20 w-14 rounded-t-md bg-blue-600" />
              <p className="mt-2 text-xs font-semibold text-[#7382a1]">Chris</p>
            </div>
            <div className="text-center">
              <p className="mb-2 text-sm font-bold text-[#11194a]">65%</p>
              <div className="h-16 w-14 rounded-t-md bg-slate-200" />
              <p className="mt-2 text-xs font-semibold text-[#7382a1]">Avg. {roleName}</p>
            </div>
          </div>
          <p className="mt-3 text-center text-xs font-semibold text-[#7382a1]">You vs. average candidate</p>
        </div>
      </div>
    </article>
  )
}

function Bar({ value, tone = 'emerald' }) {
  return (
    <div className="mt-2 h-2 rounded-full bg-slate-100">
      <div className={`h-full rounded-full ${tone === 'orange' ? 'bg-orange-400' : 'bg-emerald-500'}`} style={{ width: `${value}%` }} />
    </div>
  )
}

function SkillsModule({ roleId, roleName }) {
  const data = ROADMAP_DATA[roleId] || DEFAULT_ROADMAP
  return (
    <article className="animate-[slideUp_300ms_ease-out_both] rounded-2xl border border-[#e2eaf8] bg-white p-6 shadow-[0_8px_22px_rgba(44,76,142,0.07)]">
      <h3 className="text-base font-bold text-[#11194a]">Skills Required · {roleName}</h3>
      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <div>
          <p className="mb-3 text-sm font-bold text-emerald-600">You have these ✓</p>
          {data.existingGaps.map((skill) => (
            <div key={skill} className="mb-4">
              <p className="text-sm font-semibold text-[#3a4669]">✓ {skill} · Advanced</p>
              <Bar value={80} />
            </div>
          ))}
        </div>
        <div>
          <p className="mb-3 text-sm font-bold text-orange-600">Build these next</p>
          {data.missingGaps.map((skill) => (
            <div key={skill} className="mb-4">
              <p className="text-sm font-semibold text-[#3a4669]">● {skill}</p>
              <Bar value={25} tone="orange" />
            </div>
          ))}
        </div>
      </div>
    </article>
  )
}

function DemandModule({ roleName }) {
  const companies = [['Grab', 85], ['Shopee', 72], ['TalentBank', 68], ['CIMB', 55], ['Axiata', 48]]
  return (
    <article className="animate-[slideUp_300ms_ease-out_both] rounded-2xl border border-[#e2eaf8] bg-white p-6 shadow-[0_8px_22px_rgba(44,76,142,0.07)]">
      <h3 className="text-base font-bold text-[#11194a]">Market Demand · {roleName}</h3>
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {[
          ['Open roles in Malaysia', '1,452', '↑ 14% this year'],
          ['Avg. starting salary', 'RM 4,500/mo', 'Entry level'],
          ['Your edge', 'NLP & AI skills', '↑ +34% demand'],
        ].map(([label, value, note]) => (
          <div key={label} className="rounded-xl border border-[#e2eaf8] bg-[#f8fbff] p-4">
            <p className="text-xs font-semibold text-[#7382a1]">{label}</p>
            <p className="mt-1 text-xl font-bold text-[#11194a]">{value}</p>
            <p className={`mt-1 text-xs font-bold ${note.includes('Entry') ? 'text-blue-600' : 'text-emerald-600'}`}>{note}</p>
          </div>
        ))}
      </div>
      <div className="mt-5">
        <p className="mb-3 text-sm font-bold text-[#11194a]">Top hiring companies in Malaysia</p>
        {companies.map(([name, value]) => (
          <div key={name} className="mb-3 grid grid-cols-[90px_minmax(0,1fr)] items-center gap-3">
            <p className="text-sm font-semibold text-[#3a4669]">{name}</p>
            <Bar value={value} />
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs font-semibold text-[#9aa6c3]">Based on LinkedIn + JobStreet data · Updated this week</p>
    </article>
  )
}

// ---------------------------------------------------------------------------
// Main Roadmap & Prediction Timeline Dashboard Card
// ---------------------------------------------------------------------------

function PredictiveRoadmapDashboard({ roleId, roleName }) {
  const data = ROADMAP_DATA[roleId] || DEFAULT_ROADMAP
  const steps = data.steps
  const currentIndex = data.currentIndex

  return (
    <article className="animate-[slideUp_300ms_ease-out_both] rounded-[24px] border border-[#e2eaf8] bg-white p-6 shadow-[0_8px_30px_rgba(100,130,200,0.06)] space-y-6">
      
      {/* Dashboard Title */}
      <h3 className="text-lg font-bold text-[#11194a]">
        Roadmap and Timeline to {roleName}
      </h3>

      {/* 3-Column Core Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        
        {/* Column 1: Prediction Timeline */}
        <div className="rounded-2xl border border-slate-100 bg-[#f8fbff]/60 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-50 text-purple-600 border border-purple-100">
              <Clock size={16} />
            </span>
            <span className="text-xs font-bold text-[#596987] uppercase tracking-wide">Prediction Timeline</span>
          </div>

          <div className="mt-4">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Projected Timeline</p>
            <p className="text-3xl font-black text-[#11194a] tracking-tight">{data.timeline}</p>
            <p className="mt-1 text-[11px] font-semibold text-[#637094]">Based on current skills and progress.</p>
          </div>

          {/* Horizontal Steps Timeline */}
          <div className="relative mt-8 mb-4 px-2">
            <div className="absolute left-0 right-0 top-3 h-1 -translate-y-1/2 bg-slate-200 rounded-full" />
            <div 
              className="absolute left-0 top-3 h-1 -translate-y-1/2 bg-emerald-500 rounded-full transition-all duration-700" 
              style={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
            />

            <div className="relative flex justify-between">
              {steps.map((step, index) => {
                const isActive = index === currentIndex
                const isPast = index < currentIndex
                return (
                  <div key={step} className="flex flex-col items-center">
                    <div 
                      className={`relative z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all ${
                        isActive 
                          ? 'border-blue-600 bg-white ring-4 ring-blue-100 scale-105' 
                          : isPast 
                            ? 'border-emerald-500 bg-emerald-500 text-white' 
                            : 'border-slate-300 bg-white text-slate-400'
                      }`}
                    >
                      {isPast ? (
                        <span className="text-[10px] font-bold">✓</span>
                      ) : (
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      )}
                    </div>
                    
                    {/* Step label */}
                    <span className="absolute top-7 text-[8.5px] font-extrabold text-[#3a4669] whitespace-nowrap bg-white/90 border border-slate-100 px-1.5 py-0.5 rounded shadow-sm">
                      {step.split(': ')[1] || step}
                    </span>

                    {/* Floating runner above current active step */}
                    {isActive && (
                      <div className="absolute -top-9 flex flex-col items-center">
                        <div className="flex h-6.5 w-6.5 items-center justify-center rounded-full bg-blue-600 text-white shadow shadow-blue-300 animate-bounce p-1 text-[11px]">
                          🏃
                        </div>
                        <div className="h-1.5 w-1.5 rotate-45 bg-blue-600 -mt-1.5" />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Column 2: Gap Analysis */}
        <div className="rounded-2xl border border-slate-100 bg-[#f8fbff]/60 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600 border border-blue-100">
                <ListTodo size={16} />
              </span>
              <span className="text-xs font-bold text-[#596987] uppercase tracking-wide">Gap Analysis</span>
            </div>
            
            <p className="mt-4 text-xs font-bold text-[#11194a]">Skill & Experience Gaps</p>
            
            {/* Existing Skills */}
            <div className="mt-3 space-y-1.5">
              <p className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-600">Existing</p>
              {data.existingGaps.map(skill => (
                <div key={skill} className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                  <Check size={13} className="text-emerald-500 stroke-[3]" /> {skill}
                </div>
              ))}
            </div>

            {/* Missing Skills */}
            <div className="mt-4 space-y-1.5">
              <p className="text-[10px] font-extrabold uppercase tracking-widest text-rose-500">Missing</p>
              {data.missingGaps.map(skill => (
                <div key={skill} className="flex items-start gap-1.5 text-xs font-bold text-slate-700 leading-normal">
                  <X size={13} className="text-rose-500 stroke-[3] mt-0.5 shrink-0" /> {skill}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Column 3: Required Actions */}
        <div className="rounded-2xl border border-slate-100 bg-[#f8fbff]/60 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100">
              <ListChecks size={16} />
            </span>
            <span className="text-xs font-bold text-[#596987] uppercase tracking-wide">Required Actions</span>
          </div>

          <p className="mt-4 text-xs font-bold text-[#11194a]">Personalized Action Plan</p>
          <div className="mt-3 space-y-3">
            {data.actions.map((action, index) => (
              <div key={index} className="flex items-start gap-2 text-xs font-bold leading-relaxed text-[#3a4669]">
                <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 text-[10px] font-black border border-blue-100 mt-0.5">
                  {index + 1}
                </span>
                <span>{action.replace(/Action \d: /, '')}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom Section: Critical Skills Progress */}
      <div className="pt-4 border-t border-slate-100">
        <h4 className="text-xs font-bold text-[#11194a] uppercase tracking-wider mb-4">
          Critical Skills Progress
        </h4>
        <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
          {data.skills.map((skill) => (
            <div key={skill.label} className="grid grid-cols-[110px_1fr_40px] items-center gap-3">
              <span 
                className="text-xs font-bold text-[#3a4669] truncate"
                title={skill.label}
              >
                {skill.label}
              </span>
              <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                <div className={`h-full rounded-full ${skill.color}`} style={{ width: `${skill.value}%` }} />
              </div>
              <span className="text-xs font-bold text-right text-[#596987]">{skill.value}%</span>
            </div>
          ))}
        </div>
      </div>

    </article>
  )
}

// ---------------------------------------------------------------------------
// Detailed Learning Roadmap & Resources Dataset
// ---------------------------------------------------------------------------

const ROADMAP_DETAIL_DATA = {
  'data-scientist': {
    steps: [
      { 
        title: 'Strengthen SQL (Advanced joins, window functions)', 
        description: 'Understand advanced database queries, subqueries, and window functions for analytics.',
        duration: '2-3 weeks', 
        icon: BookOpen, 
        iconColor: 'bg-violet-50 text-violet-600 border-violet-100',
        tags: ['SQL', 'Database Queries', 'Window Functions'],
        recommendation: 'Recommended first'
      },
      { 
        title: 'Build 2 end-to-end data projects', 
        description: 'Build portfolio projects showcasing ETL pipelines, data analysis, and report generation.',
        duration: '6-8 weeks', 
        icon: Code2, 
        iconColor: 'bg-blue-50 text-blue-600 border-blue-100',
        tags: ['Python', 'ETL', 'Data Analysis']
      },
      { 
        title: 'Learn Machine Learning fundamentals', 
        description: 'Understand classification, regression, and validation strategies with scikit-learn.',
        duration: '8-10 weeks', 
        icon: Folder, 
        iconColor: 'bg-blue-50 text-blue-600 border-blue-100',
        tags: ['Machine Learning', 'scikit-learn', 'Algorithms']
      },
      { 
        title: 'Practice data storytelling & visualization', 
        description: 'Create interactive dashboards and slide decks to communicate insights to executives.',
        duration: '3-4 weeks', 
        icon: Briefcase, 
        iconColor: 'bg-emerald-50 text-emerald-600 border-emerald-100',
        tags: ['Dashboarding', 'Power BI', 'Storytelling']
      },
      { 
        title: 'Apply to internships & build your portfolio', 
        description: 'Network with professionals, optimize your profiles, and apply to data opportunities.',
        duration: 'Ongoing', 
        icon: Users, 
        iconColor: 'bg-orange-50 text-orange-600 border-orange-100',
        tags: ['Resume', 'Internship', 'Networking']
      }
    ],
    resources: [
      { title: 'SQL for Data Scientists', subtitle: 'Coursera • 4.8 ★', type: 'Course', icon: BookOpen, iconColor: 'bg-pink-50 text-pink-600 border-pink-100' },
      { title: 'Hands-on Machine Learning', subtitle: 'Kaggle • 4.9 ★', type: 'Practice', icon: Code2, iconColor: 'bg-violet-50 text-violet-600 border-violet-100' },
      { title: 'Data Science Portfolio Guide', subtitle: 'CareerOS Resource', type: 'Guide', icon: Award, iconColor: 'bg-blue-50 text-blue-600 border-blue-100' }
    ]
  },
  'data-analyst': {
    steps: [
      { 
        title: 'Strengthen SQL (Advanced joins, window functions)', 
        description: 'Understand advanced database queries, subqueries, and window functions for analytics.',
        duration: '2-3 weeks', 
        icon: BookOpen, 
        iconColor: 'bg-violet-50 text-violet-600 border-violet-100',
        tags: ['SQL', 'Database Queries', 'Window Functions'],
        recommendation: 'Recommended first'
      },
      { 
        title: 'Build 2 end-to-end data projects', 
        description: 'Build portfolio projects showcasing ETL pipelines, data analysis, and report generation.',
        duration: '6-8 weeks', 
        icon: Code2, 
        iconColor: 'bg-blue-50 text-blue-600 border-blue-100',
        tags: ['Python', 'ETL', 'Data Analysis']
      },
      { 
        title: 'Learn Machine Learning fundamentals', 
        description: 'Understand classification, regression, and validation strategies with scikit-learn.',
        duration: '8-10 weeks', 
        icon: Folder, 
        iconColor: 'bg-blue-50 text-blue-600 border-blue-100',
        tags: ['Machine Learning', 'scikit-learn', 'Algorithms']
      },
      { 
        title: 'Practice data storytelling & visualization', 
        description: 'Create interactive dashboards and slide decks to communicate insights to executives.',
        duration: '3-4 weeks', 
        icon: Briefcase, 
        iconColor: 'bg-emerald-50 text-emerald-600 border-emerald-100',
        tags: ['Dashboarding', 'Power BI', 'Storytelling']
      },
      { 
        title: 'Apply to internships & build your portfolio', 
        description: 'Network with professionals, optimize your profiles, and apply to data opportunities.',
        duration: 'Ongoing', 
        icon: Users, 
        iconColor: 'bg-orange-50 text-orange-600 border-orange-100',
        tags: ['Resume', 'Internship', 'Networking']
      }
    ],
    resources: [
      { title: 'SQL for Data Scientists', subtitle: 'Coursera • 4.8 ★', type: 'Course', icon: BookOpen, iconColor: 'bg-pink-50 text-pink-600 border-pink-100' },
      { title: 'Hands-on Machine Learning', subtitle: 'Kaggle • 4.9 ★', type: 'Practice', icon: Code2, iconColor: 'bg-violet-50 text-violet-600 border-violet-100' },
      { title: 'Data Science Portfolio Guide', subtitle: 'CareerOS Resource', type: 'Guide', icon: Award, iconColor: 'bg-blue-50 text-blue-600 border-blue-100' }
    ]
  },
  'software-engineer': {
    steps: [
      { 
        title: 'Master Data Structures & Algorithms (LeetCode 75)', 
        description: 'Get comfortable with trees, graphs, dynamic programming, and binary search.',
        duration: '4-6 weeks', 
        icon: BookOpen, 
        iconColor: 'bg-violet-50 text-violet-600 border-violet-100',
        tags: ['DSA', 'LeetCode', 'Algorithms'],
        recommendation: 'Recommended first'
      },
      { 
        title: 'Learn System Design Fundamentals', 
        description: 'Understand vertical/horizontal scaling, caching, CDNs, load balancing, and SQL vs NoSQL.',
        duration: '3-4 weeks', 
        icon: Code2, 
        iconColor: 'bg-blue-50 text-blue-600 border-blue-100',
        tags: ['System Design', 'Scaling', 'CDNs']
      },
      { 
        title: 'Build a high-performance Backend / API service', 
        description: 'Design robust server applications using Node.js or Python, with proper database indexing.',
        duration: '4-5 weeks', 
        icon: Folder, 
        iconColor: 'bg-blue-50 text-blue-600 border-blue-100',
        tags: ['Backend', 'APIs', 'Node/Python']
      },
      { 
        title: 'Gain familiarity with AWS & Docker containerization', 
        description: 'Learn how to deploy your services, manage microservices, and configure build pipelines.',
        duration: '2-3 weeks', 
        icon: Briefcase, 
        iconColor: 'bg-emerald-50 text-emerald-600 border-emerald-100',
        tags: ['AWS', 'Docker', 'CI/CD']
      },
      { 
        title: 'Prepare for tech coding & behavioral interviews', 
        description: 'Practice mock technical interviews and optimize your resume profile.',
        duration: 'Ongoing', 
        icon: Users, 
        iconColor: 'bg-orange-50 text-orange-600 border-orange-100',
        tags: ['Mock Interviews', 'Behavioral Prep', 'Resume']
      }
    ],
    resources: [
      { title: 'LeetCode Interview Prep Course', subtitle: 'LeetCode • 4.8 ★', type: 'Course', icon: Code2, iconColor: 'bg-pink-50 text-pink-600 border-pink-100' },
      { title: 'Grokking the System Design Interview', subtitle: 'Educative • 4.9 ★', type: 'Course', icon: BookOpen, iconColor: 'bg-violet-50 text-violet-600 border-violet-100' },
      { title: 'Full-Stack Deployment Guide', subtitle: 'CareerOS Resource', type: 'Guide', icon: Award, iconColor: 'bg-blue-50 text-blue-600 border-blue-100' }
    ]
  },
  'product-manager': {
    steps: [
      { 
        title: 'Learn Product Strategy & Market Research basics', 
        description: 'Understand customer personas, competitive analyses, and target market validation.',
        duration: '3-4 weeks', 
        icon: BookOpen, 
        iconColor: 'bg-violet-50 text-violet-600 border-violet-100',
        tags: ['Strategy', 'Persona Design', 'Market Analysis'],
        recommendation: 'Recommended first'
      },
      { 
        title: 'Master Product Metrics & Analytics frameworks', 
        description: 'Learn AARRR funnel metrics, retention calculations, and product logging setups.',
        duration: '2-3 weeks', 
        icon: Code2, 
        iconColor: 'bg-blue-50 text-blue-600 border-blue-100',
        tags: ['Metrics', 'Funnel', 'A/B Testing']
      },
      { 
        title: 'Lead a hackathon project or student PM challenge', 
        description: 'Build leadership credentials by leading feature design and cross-functional teams.',
        duration: '4-6 weeks', 
        icon: Folder, 
        iconColor: 'bg-blue-50 text-blue-600 border-blue-100',
        tags: ['Hackathon', 'Leadership', 'Wireframes']
      },
      { 
        title: 'Get certified in Agile Product Management (CSPO)', 
        description: 'Master backlog grooming, user story sizing, and Scrum methodologies.',
        duration: '2-3 weeks', 
        icon: Briefcase, 
        iconColor: 'bg-emerald-50 text-emerald-600 border-emerald-100',
        tags: ['Agile', 'CSPO', 'Scrum']
      },
      { 
        title: 'Apply to Associate PM (APM) cohorts & build case deck', 
        description: 'Build case analysis decks and apply to early-stage APM programmes.',
        duration: 'Ongoing', 
        icon: Users, 
        iconColor: 'bg-orange-50 text-orange-600 border-orange-100',
        tags: ['APM Application', 'Case Deck', 'Resume']
      }
    ],
    resources: [
      { title: 'Product Management Masterclass', subtitle: 'Udemy • 4.7 ★', type: 'Course', icon: BookOpen, iconColor: 'bg-pink-50 text-pink-600 border-pink-100' },
      { title: 'Product Analytics with Amplitude', subtitle: 'Amplitude • 4.8 ★', type: 'Course', icon: Code2, iconColor: 'bg-violet-50 text-violet-600 border-violet-100' },
      { title: 'APM Cohort Recruitment Guide', subtitle: 'CareerOS Resource', type: 'Guide', icon: Award, iconColor: 'bg-blue-50 text-blue-600 border-blue-100' }
    ]
  }
}

// Fallback / Default Detailed Roadmap (Matches Marketing Analyst theme from the reference image)
const DEFAULT_DETAILED_ROADMAP = {
  steps: [
    { 
      title: 'Learn foundational domain theories and concepts', 
      description: 'Understand marketing fundamentals, consumer behavior, market research and analytics concepts.',
      duration: '2-3 weeks', 
      icon: BookOpen, 
      iconColor: 'bg-violet-50 text-violet-600 border-violet-100',
      tags: ['Marketing Basics', 'Consumer Behavior', 'Market Research'],
      recommendation: 'Recommended first'
    },
    { 
      title: 'Practice core tooling and specialized frameworks', 
      description: 'Get hands-on with Excel, SQL, Google Analytics, and visualization tools like Power BI or Tableau.',
      duration: '4-6 weeks', 
      icon: Code2, 
      iconColor: 'bg-blue-50 text-blue-600 border-blue-100',
      tags: ['Excel', 'SQL', 'Google Analytics', 'Power BI / Tableau']
    },
    { 
      title: 'Build 2 portfolio-grade projects showing competencies', 
      description: 'Apply your skills to real-world datasets and build case studies that showcase your impact.',
      duration: '6-8 weeks', 
      icon: Folder, 
      iconColor: 'bg-blue-50 text-blue-600 border-blue-100',
      tags: ['Data Analysis', 'Dashboards', 'Insights & Reporting', 'Case Studies']
    },
    { 
      title: 'Secure a junior or internship placement to build resume', 
      description: 'Gain practical experience, learn from mentors and strengthen your credibility.',
      duration: '3-4 weeks', 
      icon: Briefcase, 
      iconColor: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      tags: ['Resume', 'Internship', 'Real-world Experience']
    },
    { 
      title: 'Refine professional network and apply to target roles', 
      description: 'Optimize your LinkedIn, connect with professionals and apply strategically to relevant opportunities.',
      duration: 'Ongoing', 
      icon: Users, 
      iconColor: 'bg-orange-50 text-orange-600 border-orange-100',
      tags: ['Networking', 'LinkedIn', 'Job Applications']
    }
  ],
  resources: [
    { title: 'Foundation Syllabus Course', subtitle: 'Coursera • 4.7 ★', type: 'Course', icon: BookOpen, iconColor: 'bg-pink-50 text-pink-600 border-pink-100 animate-[fadeInScale_0.25s_ease-out_both]' },
    { title: 'Practical Hands-on Exercises', subtitle: 'Kaggle • 4.8 ★', type: 'Practice', icon: Code2, iconColor: 'bg-violet-50 text-violet-600 border-violet-100 animate-[fadeInScale_0.25s_ease-out_both]' },
    { title: 'Marketing Analyst Roadmap', subtitle: 'Roadmap.sh • 4.6 ★', type: 'Guide', icon: BarChart3, iconColor: 'bg-blue-50 text-blue-600 border-blue-100 animate-[fadeInScale_0.25s_ease-out_both]' },
    { title: 'SQL for Analysts', subtitle: 'DataLemur • 4.8 ★', type: 'Course', icon: Play, iconColor: 'bg-emerald-50 text-emerald-600 border-emerald-100 animate-[fadeInScale_0.25s_ease-out_both]' },
    { title: 'Power BI Essential Training', subtitle: 'LinkedIn Learning • 4.7 ★', type: 'Course', icon: BarChart3, iconColor: 'bg-amber-50 text-amber-600 border-amber-100 animate-[fadeInScale_0.25s_ease-out_both]' },
    { title: 'Role Resource Guidebook', subtitle: 'CareerOS Resource', type: 'Guide', icon: Award, iconColor: 'bg-purple-50 text-purple-600 border-purple-100 animate-[fadeInScale_0.25s_ease-out_both]' }
  ]
}

function DetailedRoadmapModule({ roleId, roleName }) {
  const data = ROADMAP_DETAIL_DATA[roleId] || DEFAULT_DETAILED_ROADMAP
  const steps = data.steps
  const resources = data.resources

  // State to manage expanded step cards
  const [expandedSteps, setExpandedSteps] = React.useState({})

  const toggleStep = (index) => {
    setExpandedSteps((prev) => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  // Step Badge Color Theme Mapping
  const stepColors = [
    'bg-violet-600',
    'bg-indigo-600',
    'bg-blue-600',
    'bg-emerald-600',
    'bg-orange-600',
  ]

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr] animate-[slideUp_300ms_ease-out_both]">
      
      {/* LEFT PANEL: Learning Roadmap Steps Card */}
      <div className="rounded-[28px] border border-[#e2eaf8] bg-white p-6 shadow-[0_8px_30px_rgba(100,130,200,0.04)] flex flex-col justify-between">
        <div>
          
          {/* Header */}
          <header className="flex items-center gap-3.5 mb-6">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600">
              <Milestone size={24} className="stroke-[2]" />
            </span>
            <div>
              <h3 className="text-xl font-bold text-[#11194a] tracking-tight">
                Learning Roadmap to {roleName}
              </h3>
              <p className="text-xs font-semibold text-[#637094] mt-0.5 leading-normal">
                A personalized step-by-step plan to build the skills, experience and confidence to reach your goal.
              </p>
            </div>
          </header>

          {/* Dotted Connection Line and Steps */}
          <div className="relative pl-9 space-y-5">
            <div className="absolute left-[13px] top-4 bottom-4 w-[2px] border-l-2 border-dashed border-slate-200" />

            {steps.map((step, index) => {
              const StepIcon = step.icon
              const stepBadgeColor = stepColors[index % stepColors.length]
              const isExpanded = !!expandedSteps[index]
              
              return (
                <div key={index} className="relative flex items-start gap-4 animate-[slideUp_0.3s_ease-out_both]" style={{ animationDelay: `${index * 60}ms` }}>
                  
                  {/* Circle Step Number Badge */}
                  <div className={`absolute -left-[36px] top-3.5 flex h-6 w-6 items-center justify-center rounded-full ${stepBadgeColor} text-[10px] font-black text-white ring-4 ring-white shadow-sm z-10`}>
                    {index + 1}
                  </div>

                  {/* Step Card Content (Clicking toggles collapse/expand) */}
                  <div 
                    onClick={() => toggleStep(index)}
                    className="flex-1 flex flex-col p-4 rounded-2xl border border-slate-100 bg-[#f8fbff]/30 hover:border-blue-200 hover:bg-[#f8fbff]/60 transition duration-200 cursor-pointer"
                  >
                    {/* Header Row (Always Visible) */}
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3.5">
                        {/* Icon inside badge */}
                        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${step.iconColor || 'bg-violet-50 text-violet-600 border-violet-100'}`}>
                          <StepIcon size={18} className="stroke-[2.2]" />
                        </span>
                        <p className="text-sm font-bold text-[#11194a] tracking-tight">{step.title}</p>
                      </div>

                      {/* Right side: Duration & Recommendation tag + Chevron indicator */}
                      <div className="flex items-center gap-3.5 shrink-0">
                        <div className="flex flex-col items-end">
                          <span className="rounded-full bg-violet-50/80 border border-violet-100/60 px-3 py-1 text-[10px] font-extrabold text-violet-700 whitespace-nowrap shadow-sm flex items-center gap-1">
                            <Clock size={11} className="stroke-[2.5]" /> {step.duration}
                          </span>
                          {step.recommendation && (
                            <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 rounded px-2 py-0.5 text-[9px] font-extrabold mt-1.5 tracking-wide uppercase whitespace-nowrap">
                              {step.recommendation}
                            </span>
                          )}
                        </div>
                        <ChevronDown 
                          size={14} 
                          className={`text-slate-400 transition-transform duration-200 ${isExpanded ? 'rotate-180 text-slate-700' : ''}`} 
                        />
                      </div>
                    </div>

                    {/* Smooth Collapsible Details Area */}
                    <div 
                      className={`grid transition-all duration-300 ease-in-out ${
                        isExpanded ? 'grid-rows-[1fr] opacity-100 mt-3 pt-3 border-t border-slate-100/60' : 'grid-rows-[0fr] opacity-0 overflow-hidden'
                      }`}
                    >
                      <div className="overflow-hidden space-y-3">
                        <p className="text-xs font-semibold text-[#637094] leading-relaxed max-w-lg">
                          {step.description}
                        </p>
                        
                        {/* Skills/Tags only */}
                        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                          {step.tags && step.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                              {step.tags.map((tag) => (
                                <span 
                                  key={tag} 
                                  className="bg-slate-50 text-[#52627f] border border-slate-100 text-[10px] font-bold px-2 py-0.5 rounded shadow-sm"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                  </div>

                </div>
              )
            })}
          </div>

        </div>

        {/* Footer Sparkles Banner */}
        <div className="mt-8 flex items-center gap-2.5 rounded-2xl bg-violet-50/40 border border-violet-100/50 p-4.5 text-xs font-bold text-violet-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
          <Sparkles size={14} className="text-indigo-500 shrink-0" />
          <span>Keep learning and tracking your progress. Small steps today lead to big opportunities tomorrow! 💪</span>
        </div>
      </div>

      {/* RIGHT PANEL: Helpful Resources Card */}
      <div className="rounded-[28px] border border-[#e2eaf8] bg-white p-6 shadow-[0_8px_30px_rgba(100,130,200,0.04)] flex flex-col justify-between">
        <div className="space-y-5">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h4 className="text-xs font-bold text-[#11194a] uppercase tracking-wider">
              Helpful resources for you
            </h4>
            <span className="text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer hover:underline">
              View all
            </span>
          </div>

          {/* Resources card items list */}
          <div className="space-y-3">
            {resources.map((res, index) => {
              const ResourceIcon = res.icon
              return (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-3 rounded-2xl border border-slate-100 bg-[#f8fbff]/20 hover:border-blue-200 hover:bg-[#f8fbff]/50 transition duration-200 cursor-pointer group"
                >
                  <div className="flex items-start gap-3">
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-sm border ${res.iconColor}`}>
                      <ResourceIcon size={16} className="stroke-[2.2]" />
                    </span>
                    <div>
                      <p className="text-xs font-bold text-[#3a4669] leading-tight group-hover:text-blue-600 transition">
                        {res.title}
                      </p>
                      <p className="text-[10px] font-semibold text-[#7382a1] mt-1.5 flex items-center gap-1">
                        {res.subtitle}
                      </p>
                      <span className="bg-slate-50 text-slate-500 border border-slate-100 text-[8.5px] font-bold px-1.5 py-0.5 rounded mt-2 inline-block shadow-sm">
                        {res.type}
                      </span>
                    </div>
                  </div>
                  <ChevronRight size={14} className="text-slate-400 group-hover:text-blue-600 transition" />
                </div>
              )
            })}
          </div>

        </div>

        {/* Footer save resources card */}
        <div className="mt-6 flex items-center justify-between p-4 rounded-2xl bg-violet-50/50 border border-violet-100/50 hover:border-violet-200 transition duration-200 cursor-pointer group">
          <div className="flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700 border border-violet-200">
              <Bookmark size={15} className="stroke-[2.5]" />
            </span>
            <div>
              <p className="text-xs font-bold text-violet-950">Save resources for later</p>
              <p className="text-[10px] font-semibold text-violet-600 mt-0.5 leading-normal">
                Access your saved list anytime in Career Memory.
              </p>
            </div>
          </div>
          <ChevronRight size={14} className="text-violet-500 group-hover:translate-x-0.5 transition" />
        </div>

      </div>

    </div>
  )
}

export default function DynamicModulePlaceholder({ activeModule, selectedRoleId }) {
  if (!selectedRoleId) return <EmptyState />

  const role = careerPathNetwork.roles.find((r) => r.id === selectedRoleId)
  const roleName = role ? role.label : selectedRoleId

  // If specific modules are toggled via companion panel, show them
  if (activeModule === 'fit') return <FitModule roleId={selectedRoleId} roleName={roleName} />
  if (activeModule === 'skills') return <SkillsModule roleId={selectedRoleId} roleName={roleName} />
  if (activeModule === 'demand') return <DemandModule roleName={roleName} />
  if (activeModule === 'roadmap') return <DetailedRoadmapModule roleId={selectedRoleId} roleName={roleName} />
  
  // Default to showing the predictive roadmap dashboard
  return <PredictiveRoadmapDashboard roleId={selectedRoleId} roleName={roleName} />
}
