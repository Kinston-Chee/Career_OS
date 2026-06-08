import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

// ─── Program Data ─────────────────────────────────────────────────────────────

const programData = {
  'BSc Computer Science': {
    skillAlignment: [
      { skill: 'Python',            demand: 'High',   coverage: 92, gap: null  },
      { skill: 'SQL',               demand: 'High',   coverage: 88, gap: null  },
      { skill: 'Data Analysis',     demand: 'High',   coverage: 85, gap: null  },
      { skill: 'AI / ML Basics',    demand: 'High',   coverage: 70, gap: null  },
      { skill: 'Cloud Deployment',  demand: 'High',   coverage: 38, gap: -62   },
      { skill: 'MLOps',             demand: 'High',   coverage: 26, gap: -74   },
      { skill: 'Product Analytics', demand: 'Medium', coverage: 30, gap: -70   },
      { skill: 'Power BI',          demand: 'High',   coverage: 42, gap: -58   },
    ],
    keyInsights: [
      ['Strong foundation in core technical skills.', 'Python, SQL, and Data Analysis are well covered.', 'emerald'],
      ['High demand gap in Cloud & MLOps.', 'These skills are in 70%+ of job postings.', 'amber'],
      ['Emerging need for Product Analytics.', 'Growing trend in data-driven product roles.', 'violet'],
    ],
    marketTrend: [
      { label: 'Cloud Deployment', value: '76%', color: 'bg-blue-500',    stroke: '#4f6bff', points: [44, 52, 58, 64, 68, 76] },
      { label: 'MLOps',            value: '74%', color: 'bg-violet-500',  stroke: '#9b6bff', points: [38, 44, 52, 58, 65, 74] },
      { label: 'Product Analytics',value: '58%', color: 'bg-emerald-500', stroke: '#34c985', points: [28, 33, 38, 44, 50, 58] },
    ],
    emergingGaps: [
      { rank: 1, skill: 'Cloud Deployment',   why: 'Critical for 78% of modern tech roles',       demand: 76, coverage: 38, gap: -38, impact: 'High',   trend: [32, 38, 44, 52, 64, 76] },
      { rank: 2, skill: 'MLOps',              why: 'Essential for AI/ML production systems',       demand: 74, coverage: 26, gap: -48, impact: 'High',   trend: [20, 28, 36, 48, 60, 74] },
      { rank: 3, skill: 'Product Analytics',  why: 'High growth in product-driven companies',      demand: 58, coverage: 30, gap: -28, impact: 'Medium', trend: [25, 32, 38, 44, 50, 58] },
      { rank: 4, skill: 'Cybersecurity Basics', why: 'Growing concern across all industries',      demand: 45, coverage: 28, gap: -17, impact: 'Medium', trend: [24, 28, 32, 36, 40, 45] },
      { rank: 5, skill: 'Generative AI',      why: 'New capability driving software innovation',   demand: 40, coverage: 20, gap: -20, impact: 'Medium', trend: [10, 16, 22, 28, 34, 40] },
    ],
    skillsOnRise: [
      ['MLOps',             '+120%'],
      ['Cloud Deployment',  '+95%'],
      ['Generative AI',     '+89%'],
      ['Prompt Engineering','+85%'],
      ['Data Engineering',  '+72%'],
    ],
    gapOverview: { high: 8, medium: 11, low: 5, total: 24 },
    gapSpotlight: {
      initial: 'C',
      name: 'Cloud Deployment',
      impact: 'High Impact',
      impactTone: 'rose',
      desc: 'Largest gap and highest market demand in your program.',
      stats: [
        ['Market Demand',    '76%', 'text-blue-700'],
        ['Program Coverage', '38%', 'text-emerald-600'],
        ['Gap',              '-38%','text-rose-600'],
        ['Students Affected','62',  'text-violet-700'],
      ],
      roles: ['Cloud Engineer', 'DevOps Engineer', 'Solutions Architect'],
      topics: ['AWS / Azure / GCP', 'Docker & Kubernetes', 'Serverless Architecture', 'Cloud Security'],
    },
    actions: [
      { action: 'Cloud Fundamentals & Deployment Workshop', detail: 'Hands-on, 8-12 weeks',      gap: 'Cloud Deployment -38%',    impact: 'High 8.7/10',   impactScore: 87, effort: 'Medium', students: '62 students',  priority: 'High'   },
      { action: 'MLOps Fundamentals Short Course',          detail: '4 weeks, project-based',    gap: 'MLOps -48%',               impact: 'High 8.3/10',   impactScore: 83, effort: 'Medium', students: '48 students',  priority: 'High'   },
      { action: 'Product Thinking & Analytics Bootcamp',    detail: '2-3 weeks, case-based',     gap: 'Product Analytics -28%',   impact: 'Medium 6.9/10', impactScore: 69, effort: 'Low',    students: '40 students',  priority: 'Medium' },
      { action: 'AI Society Hackathon',                     detail: '1-2 weeks, experiential',   gap: 'AI/ML Basics -17%',        impact: 'Medium 6.2/10', impactScore: 62, effort: 'Low',    students: '80+ students', priority: 'Medium' },
      { action: 'Industry Mentor Sessions',                 detail: 'Ongoing, monthly',          gap: 'Multiple Skills',          impact: 'Medium 5.8/10', impactScore: 58, effort: 'Low',    students: 'All Cohort',   priority: 'Medium' },
    ],
    impactSummary: { readiness: '+14%', studentsImpacted: '230+', timeToImpact: '3-6 months' },
    actionResources: [
      ['Industry Partners Available', '12'],
      ['Campus Resources', '8'],
      ['Budget Estimate', 'Medium'],
      ['Existing Courses to Leverage', '5'],
    ],
    roadmap: [
      { title: 'Quick Wins',        time: '0-1 month',  items: ['AI Society Hackathon', 'Industry Mentor Sessions'],             tone: 'emerald' },
      { title: 'Foundation Build',  time: '1-3 months', items: ['Cloud Fundamentals Workshop', 'MLOps Short Course'],            tone: 'blue'    },
      { title: 'Capability Deepen', time: '3-6 months', items: ['Product Thinking Bootcamp', 'Advanced Projects'],              tone: 'amber'   },
      { title: 'Sustain & Scale',   time: '6+ months',  items: ['Certification Pathways', 'Industry Collaboration'],            tone: 'violet'  },
    ],
  },

  'BSc Data Science': {
    skillAlignment: [
      { skill: 'Statistics',        demand: 'High',   coverage: 94, gap: null  },
      { skill: 'Python',            demand: 'High',   coverage: 90, gap: null  },
      { skill: 'R Programming',     demand: 'High',   coverage: 82, gap: null  },
      { skill: 'Machine Learning',  demand: 'High',   coverage: 80, gap: null  },
      { skill: 'SQL',               demand: 'High',   coverage: 86, gap: null  },
      { skill: 'Data Visualization',demand: 'High',   coverage: 78, gap: null  },
      { skill: 'MLOps',             demand: 'High',   coverage: 36, gap: -64   },
      { skill: 'Data Engineering',  demand: 'High',   coverage: 38, gap: -62   },
    ],
    keyInsights: [
      ['Excellent core analytical foundation.',      'Statistics, Python, R, and ML are all well covered.',           'emerald'],
      ['Critical gap in production ML deployment.',  'MLOps is in 74%+ of Data Science job postings.',               'amber'],
      ['Data Engineering pipelines underserved.',    'ETL and pipeline skills needed by data-driven employers.',      'violet'],
    ],
    marketTrend: [
      { label: 'MLOps',            value: '74%', color: 'bg-violet-500',  stroke: '#9b6bff', points: [30, 38, 46, 55, 64, 74] },
      { label: 'Data Engineering', value: '72%', color: 'bg-blue-500',    stroke: '#4f6bff', points: [28, 36, 44, 52, 62, 72] },
      { label: 'Generative AI',    value: '55%', color: 'bg-emerald-500', stroke: '#34c985', points: [12, 20, 30, 38, 46, 55] },
    ],
    emergingGaps: [
      { rank: 1, skill: 'MLOps',             why: 'Deploying models to production is now a core DS skill',      demand: 74, coverage: 36, gap: -38, impact: 'High',   trend: [28, 36, 46, 55, 64, 74] },
      { rank: 2, skill: 'Data Engineering',  why: 'ETL pipelines underpin every real-world DS project',         demand: 72, coverage: 38, gap: -34, impact: 'High',   trend: [26, 34, 42, 52, 62, 72] },
      { rank: 3, skill: 'Cloud ML Platforms',why: 'AWS SageMaker, GCP Vertex AI in 60%+ DS job posts',          demand: 65, coverage: 28, gap: -37, impact: 'High',   trend: [22, 30, 40, 48, 56, 65] },
      { rank: 4, skill: 'Generative AI',     why: 'LLM fine-tuning & prompt engineering rapidly growing',       demand: 55, coverage: 20, gap: -35, impact: 'Medium', trend: [10, 18, 28, 36, 46, 55] },
      { rank: 5, skill: 'Business Acumen',   why: 'Analysts need to frame insights as business decisions',       demand: 48, coverage: 34, gap: -14, impact: 'Medium', trend: [22, 28, 34, 38, 44, 48] },
    ],
    skillsOnRise: [
      ['MLOps',              '+130%'],
      ['LLM Fine-tuning',    '+110%'],
      ['Data Engineering',   '+98%'],
      ['Cloud ML Platforms', '+92%'],
      ['Feature Engineering','+74%'],
    ],
    gapOverview: { high: 6, medium: 9, low: 4, total: 19 },
    gapSpotlight: {
      initial: 'M',
      name: 'MLOps',
      impact: 'High Impact',
      impactTone: 'rose',
      desc: 'The most critical gap — model deployment is now expected at every DS role level.',
      stats: [
        ['Market Demand',    '74%', 'text-blue-700'],
        ['Program Coverage', '36%', 'text-emerald-600'],
        ['Gap',              '-38%','text-rose-600'],
        ['Students Affected','54',  'text-violet-700'],
      ],
      roles: ['ML Engineer', 'Data Scientist', 'AI Engineer'],
      topics: ['Model Serving & APIs', 'Docker / Kubernetes', 'CI/CD for ML', 'Model Monitoring'],
    },
    actions: [
      { action: 'MLOps Bootcamp',                     detail: '6-8 weeks, hands-on',          gap: 'MLOps -38%',              impact: 'High 9.1/10',   impactScore: 91, effort: 'Medium', students: '54 students',  priority: 'High'   },
      { action: 'Data Engineering Pipeline Lab',       detail: '4 weeks, project-based',       gap: 'Data Engineering -34%',   impact: 'High 8.6/10',   impactScore: 86, effort: 'Medium', students: '46 students',  priority: 'High'   },
      { action: 'Cloud ML Platform Workshop',          detail: '3 weeks, AWS SageMaker focus', gap: 'Cloud ML Platforms -37%', impact: 'High 8.2/10',   impactScore: 82, effort: 'Medium', students: '50 students',  priority: 'High'   },
      { action: 'Kaggle Competition Programme',        detail: 'Ongoing, team-based',          gap: 'Multiple ML Skills',      impact: 'Medium 7.0/10', impactScore: 70, effort: 'Low',    students: '80+ students', priority: 'Medium' },
      { action: 'DS Industry Mentorship Programme',    detail: 'Semester-long, 1-on-1',        gap: 'Business Acumen -14%',    impact: 'Medium 6.5/10', impactScore: 65, effort: 'Low',    students: 'All Cohort',   priority: 'Medium' },
    ],
    impactSummary: { readiness: '+18%', studentsImpacted: '200+', timeToImpact: '3-5 months' },
    actionResources: [
      ['Industry Partners Available', '15'],
      ['Campus Resources', '6'],
      ['Budget Estimate', 'Medium-High'],
      ['Existing Courses to Leverage', '4'],
    ],
    roadmap: [
      { title: 'Quick Wins',        time: '0-1 month',  items: ['Kaggle Competition Programme', 'DS Mentorship Programme'],    tone: 'emerald' },
      { title: 'Foundation Build',  time: '1-3 months', items: ['Data Engineering Pipeline Lab', 'Cloud ML Platform Workshop'],tone: 'blue'    },
      { title: 'Capability Deepen', time: '3-6 months', items: ['MLOps Bootcamp', 'Model Deployment Projects'],               tone: 'amber'   },
      { title: 'Sustain & Scale',   time: '6+ months',  items: ['Industry DS Partnerships', 'Certification Pathways'],        tone: 'violet'  },
    ],
  },

  'BSc Data Analytics': {
    skillAlignment: [
      { skill: 'SQL',                  demand: 'High',   coverage: 90, gap: null  },
      { skill: 'Excel / Sheets',       demand: 'High',   coverage: 92, gap: null  },
      { skill: 'Data Reporting',       demand: 'High',   coverage: 86, gap: null  },
      { skill: 'Statistics',           demand: 'High',   coverage: 78, gap: null  },
      { skill: 'Power BI',             demand: 'High',   coverage: 58, gap: -42   },
      { skill: 'Tableau',              demand: 'High',   coverage: 55, gap: -45   },
      { skill: 'Python Analytics',     demand: 'High',   coverage: 52, gap: -48   },
      { skill: 'Predictive Modelling', demand: 'Medium', coverage: 38, gap: -62   },
    ],
    keyInsights: [
      ['Excellent foundation in SQL and reporting.',    'Excel, SQL, and Data Reporting are above industry expectations.',    'emerald'],
      ['Critical gap in BI tools.',                    'Power BI and Tableau appear in 80%+ of analyst job postings.',      'amber'],
      ['Python analytics becoming a baseline skill.',  'Even junior analyst roles increasingly expect Python proficiency.', 'violet'],
    ],
    marketTrend: [
      { label: 'Power BI',            value: '85%', color: 'bg-blue-500',    stroke: '#4f6bff', points: [52, 60, 68, 74, 80, 85] },
      { label: 'Python Analytics',    value: '78%', color: 'bg-violet-500',  stroke: '#9b6bff', points: [42, 50, 58, 65, 72, 78] },
      { label: 'Predictive Modelling',value: '70%', color: 'bg-emerald-500', stroke: '#34c985', points: [32, 40, 48, 55, 62, 70] },
    ],
    emergingGaps: [
      { rank: 1, skill: 'Power BI',             why: 'Standard BI tool in 85% of analyst job descriptions',       demand: 85, coverage: 58, gap: -27, impact: 'High',   trend: [50, 58, 66, 72, 78, 85] },
      { rank: 2, skill: 'Tableau',              why: 'Widely used for executive dashboards and reporting',         demand: 80, coverage: 55, gap: -25, impact: 'High',   trend: [44, 52, 60, 66, 73, 80] },
      { rank: 3, skill: 'Python Analytics',     why: 'Automating reports and data pipelines with pandas/NumPy',    demand: 78, coverage: 52, gap: -26, impact: 'High',   trend: [40, 48, 55, 62, 70, 78] },
      { rank: 4, skill: 'Predictive Modelling', why: 'Regression and forecasting expected at mid-senior levels',   demand: 70, coverage: 38, gap: -32, impact: 'Medium', trend: [30, 38, 46, 54, 62, 70] },
      { rank: 5, skill: 'Cloud BI (Looker)',    why: 'Cloud-based BI tools growing rapidly in tech companies',     demand: 52, coverage: 18, gap: -34, impact: 'Medium', trend: [14, 22, 30, 38, 46, 52] },
    ],
    skillsOnRise: [
      ['Power BI',          '+88%'],
      ['Python Analytics',  '+82%'],
      ['Tableau',           '+76%'],
      ['Predictive Models', '+70%'],
      ['Cloud BI (Looker)', '+65%'],
    ],
    gapOverview: { high: 5, medium: 12, low: 7, total: 24 },
    gapSpotlight: {
      initial: 'P',
      name: 'Power BI',
      impact: 'High Impact',
      impactTone: 'rose',
      desc: 'The most in-demand BI tool — present in 85% of analyst job postings yet coverage is only 58%.',
      stats: [
        ['Market Demand',    '85%', 'text-blue-700'],
        ['Program Coverage', '58%', 'text-emerald-600'],
        ['Gap',              '-27%','text-rose-600'],
        ['Students Affected','70',  'text-violet-700'],
      ],
      roles: ['Business Analyst', 'Data Analyst', 'Reporting Analyst'],
      topics: ['Dashboard Design', 'DAX Formulas', 'Power Query / ETL', 'Report Sharing & Governance'],
    },
    actions: [
      { action: 'Power BI & Tableau Intensive',          detail: '4-6 weeks, project dashboards',   gap: 'Power BI -27%, Tableau -25%',  impact: 'High 9.0/10',   impactScore: 90, effort: 'Medium', students: '70 students',  priority: 'High'   },
      { action: 'Python for Analytics Course',            detail: '6 weeks, pandas & NumPy focus',   gap: 'Python Analytics -26%',         impact: 'High 8.5/10',   impactScore: 85, effort: 'Medium', students: '58 students',  priority: 'High'   },
      { action: 'Predictive Modelling Elective',          detail: '4 weeks, regression & forecast',  gap: 'Predictive Modelling -32%',     impact: 'Medium 7.4/10', impactScore: 74, effort: 'Medium', students: '44 students',  priority: 'Medium' },
      { action: 'Business Analytics Case Study Series',   detail: 'Ongoing, weekly sessions',        gap: 'Multiple Analytical Skills',    impact: 'Medium 6.8/10', impactScore: 68, effort: 'Low',    students: 'All Cohort',   priority: 'Medium' },
      { action: 'Industry Analytics Mentorship',          detail: '1 semester, industry analysts',   gap: 'Business Acumen & Tools',       impact: 'Medium 6.3/10', impactScore: 63, effort: 'Low',    students: '60+ students', priority: 'Medium' },
    ],
    impactSummary: { readiness: '+16%', studentsImpacted: '250+', timeToImpact: '2-4 months' },
    actionResources: [
      ['Industry Partners Available', '10'],
      ['Campus Resources', '7'],
      ['Budget Estimate', 'Low-Medium'],
      ['Existing Courses to Leverage', '6'],
    ],
    roadmap: [
      { title: 'Quick Wins',        time: '0-1 month',  items: ['Case Study Series', 'Industry Mentorship'],                        tone: 'emerald' },
      { title: 'Foundation Build',  time: '1-3 months', items: ['Python for Analytics Course', 'Power BI & Tableau Intensive'],      tone: 'blue'    },
      { title: 'Capability Deepen', time: '3-6 months', items: ['Predictive Modelling Elective', 'Capstone Analytics Project'],      tone: 'amber'   },
      { title: 'Sustain & Scale',   time: '6+ months',  items: ['Cloud BI Certification', 'Employer Partnership Dashboards'],       tone: 'violet'  },
    ],
  },
}

const tabs = [
  { id: 'skills',  label: 'Skills Alignment'      },
  { id: 'gaps',    label: 'Emerging Gaps'          },
  { id: 'actions', label: 'Recommended Actions'    },
]

const toneClasses = {
  blue:    'bg-blue-50 text-blue-700 ring-blue-100',
  violet:  'bg-violet-50 text-violet-700 ring-violet-100',
  emerald: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
  amber:   'bg-amber-50 text-amber-700 ring-amber-100',
  rose:    'bg-rose-50 text-rose-700 ring-rose-100',
}

const priorityClasses = {
  High:   'bg-rose-50 text-rose-700 ring-rose-100',
  Medium: 'bg-amber-50 text-amber-700 ring-amber-100',
  Low:    'bg-emerald-50 text-emerald-700 ring-emerald-100',
}

// ─── Reusable Components ──────────────────────────────────────────────────────

function ProgramDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const options = Object.keys(programData)

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`mt-2 flex h-11 min-w-[260px] items-center justify-between gap-3 rounded-[8px] border px-4 text-sm font-medium shadow-sm transition ${
          open
            ? 'border-blue-300 bg-blue-50 text-blue-700'
            : 'border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:text-blue-700'
        }`}
      >
        <span className="truncate">{value}</span>
        <svg
          className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 top-full z-30 mt-1.5 min-w-[260px] overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-[0_12px_32px_rgba(15,23,42,0.12)]">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => { onChange(option); setOpen(false) }}
              className={`flex w-full items-center gap-2.5 px-4 py-3 text-left text-sm font-medium transition hover:bg-blue-50 hover:text-blue-700 ${
                option === value ? 'bg-blue-50 text-blue-700' : 'text-slate-700'
              }`}
            >
              {option === value && (
                <svg className="h-3.5 w-3.5 shrink-0 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                </svg>
              )}
              {option !== value && <span className="h-3.5 w-3.5 shrink-0" />}
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function CoverageBar({ value, tone = 'blue' }) {
  const color =
    tone === 'green'  ? 'bg-emerald-500' :
    tone === 'orange' ? 'bg-orange-400'  :
    tone === 'red'    ? 'bg-rose-500'    : 'bg-blue-500'
  return (
    <div className="w-full min-w-[86px] max-w-[150px]">
      <div className="h-2.5 overflow-hidden rounded-full bg-slate-100 shadow-inner">
        <div
          className={`h-full rounded-full ${color} shadow-[0_0_0_1px_rgba(255,255,255,0.28)_inset]`}
          style={{ width: `${Math.max(value, 7)}%` }}
        />
      </div>
    </div>
  )
}

function GapText({ gap }) {
  if (gap === null || gap === undefined) return <span className="text-sm font-medium text-emerald-600">—</span>
  const severe = Math.abs(gap) >= 40
  return <span className={`text-sm font-semibold ${severe ? 'text-rose-600' : 'text-orange-500'}`}>{gap}%</span>
}

function MiniTrend({ points }) {
  const max = Math.max(...points)
  const min = Math.min(...points)
  return (
    <div className="flex h-10 w-24 items-end gap-1">
      {points.map((point, index) => {
        const height = 20 + ((point - min) / Math.max(max - min, 1)) * 20
        return (
          <span
            key={`${point}-${index}`}
            className="w-2 rounded-full bg-gradient-to-t from-violet-500 to-blue-400"
            style={{ height }}
          />
        )
      })}
    </div>
  )
}

function MarketTrendLineChart({ series }) {
  const months = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']
  const toPoints = (points) =>
    points.map((point, index) => {
      const x = 22 + index * 42
      const y = 118 - point * 1.18
      return `${x},${y}`
    }).join(' ')

  return (
    <div className="mt-5 rounded-[8px] border border-slate-100 bg-slate-50/70 p-3">
      <svg viewBox="0 0 238 140" className="h-40 w-full" role="img" aria-label="Market trend line chart">
        {[28, 56, 84, 112].map((y) => (
          <line key={y} x1="18" x2="228" y1={y} y2={y} stroke="#e9eef7" strokeWidth="1" />
        ))}
        {[22, 64, 106, 148, 190, 232].map((x) => (
          <line key={x} x1={x} x2={x} y1="18" y2="118" stroke="#eef2f7" strokeWidth="1" />
        ))}
        {series.map((item) => (
          <g key={item.label}>
            <polyline
              points={toPoints(item.points)}
              fill="none"
              stroke={item.stroke}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {item.points.map((point, index) => (
              <circle
                key={`${item.label}-${point}-${index}`}
                cx={22 + index * 42}
                cy={118 - point * 1.18}
                r="2.4"
                fill="white"
                stroke={item.stroke}
                strokeWidth="1.8"
              />
            ))}
          </g>
        ))}
        {months.map((month, index) => (
          <text
            key={month}
            x={22 + index * 42}
            y="134"
            textAnchor="middle"
            className="fill-slate-400 text-[9px] font-medium"
          >
            {month}
          </text>
        ))}
      </svg>
    </div>
  )
}

function SectionCard({ title, subtitle, children, action }) {
  return (
    <section className="rounded-[8px] border border-slate-200/80 bg-white p-5 shadow-[0_16px_42px_rgba(15,23,42,0.05)]">
      <div className="flex flex-col gap-3 border-b border-slate-100 pb-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 className="text-lg font-medium text-slate-950">{title}</h2>
          {subtitle ? <p className="mt-1 text-sm leading-6 text-slate-500">{subtitle}</p> : null}
        </div>
        {action}
      </div>
      {children}
    </section>
  )
}

function ProgramSkillsModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/30 px-4 backdrop-blur-sm">
      <section className="w-full max-w-xl rounded-[8px] border border-slate-200 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.18)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase text-blue-600">Program Skills Setup</p>
            <h2 className="mt-2 text-xl font-medium text-slate-950">Manage Program Skills</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              A lightweight placeholder flow for defining program skill coverage.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-[8px] border border-slate-200 text-sm font-medium text-slate-500 hover:bg-slate-50"
            aria-label="Close program skills setup"
          >
            ✕
          </button>
        </div>
        <div className="mt-6 space-y-3">
          {['Select program template', 'Upload course outline', 'Review AI-extracted skills', 'Manually adjust skill coverage'].map((item, index) => (
            <div key={item} className="flex items-center gap-4 rounded-[8px] border border-slate-200 bg-slate-50/70 p-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-medium text-blue-700 ring-1 ring-blue-100">
                {index + 1}
              </span>
              <p className="text-sm font-medium text-slate-950">{item}</p>
            </div>
          ))}
        </div>
        <button type="button" onClick={onClose} className="mt-6 w-full rounded-[8px] bg-blue-600 px-4 py-3 text-sm font-medium text-white">
          Save setup draft
        </button>
      </section>
    </div>
  )
}

function ShareToast({ message }) {
  if (!message) return null
  return (
    <div className="fixed bottom-6 right-6 z-50 rounded-[8px] border border-blue-100 bg-white px-4 py-3 text-sm font-medium text-blue-700 shadow-[0_18px_46px_rgba(37,99,235,0.18)]">
      {message}
    </div>
  )
}

// ─── Tab Components ───────────────────────────────────────────────────────────

function SkillsAlignmentTab({ data }) {
  const { skillAlignment, keyInsights, marketTrend } = data
  return (
    <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px] 2xl:grid-cols-[minmax(0,1fr)_400px]">
      <SectionCard
        title="Market Demand vs Program Coverage"
        subtitle="Comparison of in-demand skills and your program's coverage."
      >
        <div className="mt-4 overflow-hidden rounded-[8px] border border-slate-100">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs font-medium uppercase text-slate-400">
                <th className="bg-slate-50 px-4 py-3">Skill</th>
                <th className="bg-slate-50 px-4 py-3">Market Demand</th>
                <th className="bg-slate-50 px-4 py-3">Program Coverage</th>
                <th className="bg-slate-50 px-4 py-3">Gap</th>
              </tr>
            </thead>
            <tbody>
              {skillAlignment.map((row) => (
                <tr key={row.skill} className="transition hover:bg-slate-50/60">
                  <td className="border-b border-slate-100 px-4 py-4 text-sm font-medium text-slate-950">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-blue-50 text-xs font-semibold text-blue-700 ring-1 ring-blue-100">
                        {row.skill.slice(0, 1)}
                      </span>
                      <span>{row.skill}</span>
                    </div>
                  </td>
                  <td className="border-b border-slate-100 px-4 py-4">
                    <span className={`text-sm font-medium ${row.demand === 'High' ? 'text-emerald-700' : 'text-amber-600'}`}>
                      {row.demand}
                    </span>
                  </td>
                  <td className="border-b border-slate-100 px-4 py-4">
                    <div className="flex min-w-[220px] items-center gap-4">
                      <CoverageBar
                        value={row.coverage}
                        tone={
                          row.gap && Math.abs(row.gap) > 55 ? 'red' :
                          row.gap && Math.abs(row.gap) > 35 ? 'orange' : 'blue'
                        }
                      />
                      <span className="w-10 text-right text-sm font-semibold text-blue-700">{row.coverage}%</span>
                    </div>
                  </td>
                  <td className="border-b border-slate-100 px-4 py-4">
                    <GapText gap={row.gap} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <div className="space-y-5">
        <section className="rounded-[8px] border border-slate-200/80 bg-white p-5 shadow-[0_16px_42px_rgba(15,23,42,0.05)]">
          <h2 className="text-lg font-medium text-slate-950">Key Insights</h2>
          <div className="mt-4 divide-y divide-slate-100">
            {keyInsights.map(([title, detail, tone]) => (
              <div key={title} className="flex gap-3 py-4 first:pt-0 last:pb-0">
                <span className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] text-xs font-semibold ring-1 ${toneClasses[tone]}`}>
                  {title.slice(0, 1)}
                </span>
                <div>
                  <p className="text-sm font-medium text-slate-950">{title}</p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[8px] border border-slate-200/80 bg-white p-5 shadow-[0_16px_42px_rgba(15,23,42,0.05)]">
          <h2 className="text-lg font-medium text-slate-950">Market Trend</h2>
          <p className="mt-1 text-sm text-slate-500">% of job postings requiring this skill (last 6 months)</p>
          <MarketTrendLineChart series={marketTrend} />
          <div className="mt-4 space-y-3">
            {marketTrend.map((item) => (
              <div key={item.label} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 font-semibold text-slate-600">
                  <span className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
                  {item.label}
                </span>
                <span className="font-semibold text-slate-950">{item.value}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  )
}

function EmergingGapsTab({ data }) {
  const { emergingGaps, skillsOnRise, gapOverview, gapSpotlight } = data
  return (
    <div className="space-y-5">
      <section className="grid items-start gap-5 md:grid-cols-12">
        <div className="min-w-0 space-y-5 md:col-span-8 2xl:col-span-9">
          <SectionCard
            title="Emerging Skills Gaps"
            subtitle="Skills with growing market demand but insufficient program coverage."
            action={
              <button type="button" className="rounded-[8px] border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600">
                How Gaps are Calculated
              </button>
            }
          >
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-xs font-medium uppercase text-slate-400">
                    <th className="rounded-l-[8px] bg-slate-50 px-2 py-3">Rank</th>
                    <th className="bg-slate-50 px-2 py-3">Skill</th>
                    <th className="bg-slate-50 px-2 py-3">Why it matters</th>
                    <th className="bg-slate-50 px-2 py-3">Market demand</th>
                    <th className="bg-slate-50 px-2 py-3">Program coverage</th>
                    <th className="bg-slate-50 px-2 py-3">Gap</th>
                    <th className="bg-slate-50 px-2 py-3">Trend</th>
                    <th className="rounded-r-[8px] bg-slate-50 px-2 py-3">Impact</th>
                  </tr>
                </thead>
                <tbody>
                  {emergingGaps.map((row) => (
                    <tr key={row.skill} className="transition hover:bg-slate-50/60">
                      <td className="border-b border-slate-100 px-2 py-4 text-sm font-medium text-slate-500">{row.rank}</td>
                      <td className="border-b border-slate-100 px-2 py-4">
                        <div className="flex items-center gap-2.5">
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] bg-violet-50 text-xs font-semibold text-violet-700 ring-1 ring-violet-100">
                            {row.skill.slice(0, 1)}
                          </span>
                          <p className="text-sm font-medium text-slate-950">{row.skill}</p>
                        </div>
                      </td>
                      <td className="max-w-[140px] border-b border-slate-100 px-2 py-4 text-xs leading-5 text-slate-500">{row.why}</td>
                      <td className="border-b border-slate-100 px-2 py-4">
                        <div className="flex items-center gap-2">
                          <CoverageBar value={row.demand} />
                          <span className="w-8 text-right text-sm font-medium">{row.demand}%</span>
                        </div>
                      </td>
                      <td className="border-b border-slate-100 px-2 py-4">
                        <div className="flex items-center gap-2">
                          <CoverageBar value={row.coverage} tone="green" />
                          <span className="w-8 text-right text-sm font-medium">{row.coverage}%</span>
                        </div>
                      </td>
                      <td className="border-b border-slate-100 px-2 py-4">
                        <GapText gap={row.gap} />
                      </td>
                      <td className="border-b border-slate-100 px-2 py-4">
                        <MiniTrend points={row.trend} />
                      </td>
                      <td className="border-b border-slate-100 px-2 py-4">
                        <span className={`rounded-full px-2.5 py-1.5 text-xs font-medium ring-1 ${priorityClasses[row.impact]}`}>
                          {row.impact}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>

          <section className="grid gap-5 md:grid-cols-[0.95fr_1fr]">
            <section className="rounded-[8px] border border-slate-200/80 bg-white p-5 shadow-[0_16px_42px_rgba(15,23,42,0.05)]">
              <h2 className="text-lg font-medium text-slate-950">Gap Overview</h2>
              <p className="mt-1 text-sm text-slate-500">Breakdown of skill gaps by impact level.</p>
              <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="grid h-32 w-32 shrink-0 place-items-center rounded-full bg-[conic-gradient(#f43f5e_0_33%,#f59e0b_33%_79%,#10b981_79%_100%)]">
                  <div className="grid h-20 w-20 place-items-center rounded-full bg-white text-center">
                    <span className="text-2xl font-semibold text-slate-950">{gapOverview.total}</span>
                    <span className="-mt-3 text-[10px] font-medium text-slate-400">Total gaps</span>
                  </div>
                </div>
                <div className="flex-1 space-y-3">
                  {[
                    [`High Impact`,   `${gapOverview.high} (${Math.round(gapOverview.high / gapOverview.total * 100)}%)`, 'bg-rose-500'],
                    [`Medium Impact`, `${gapOverview.medium} (${Math.round(gapOverview.medium / gapOverview.total * 100)}%)`, 'bg-amber-500'],
                    [`Low Impact`,    `${gapOverview.low} (${Math.round(gapOverview.low / gapOverview.total * 100)}%)`, 'bg-emerald-500'],
                  ].map(([label, value, color]) => (
                    <div key={label} className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 font-medium text-slate-600">
                        <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
                        {label}
                      </span>
                      <span className="font-semibold text-slate-950">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="rounded-[8px] border border-violet-100 bg-gradient-to-br from-white via-violet-50/70 to-blue-50 p-5 shadow-[0_16px_42px_rgba(79,70,229,0.08)]">
              <p className="text-xs font-medium uppercase text-violet-600">What this means</p>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Your program is aligned in foundational skills but needs strategic focus on high-demand emerging capability areas.
                Addressing the top {gapOverview.high} high-impact gaps could improve graduate readiness by up to{' '}
                <span className="font-semibold text-blue-700">14–18%</span>.
              </p>
            </section>
          </section>
        </div>

        {/* Gap Spotlight */}
        <aside className="rounded-[8px] border border-violet-100 bg-white p-5 shadow-[0_16px_42px_rgba(79,70,229,0.08)] md:sticky md:top-6 md:col-span-4 2xl:col-span-3">
          <h2 className="text-lg font-medium text-slate-950">Gap Spotlight</h2>
          <div className="mt-5 flex items-start gap-4">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[8px] bg-violet-50 text-lg font-semibold text-violet-700 ring-1 ring-violet-100">
              {gapSpotlight.initial}
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base font-semibold text-slate-950">{gapSpotlight.name}</h3>
                <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ${toneClasses[gapSpotlight.impactTone]}`}>
                  {gapSpotlight.impact}
                </span>
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-500">{gapSpotlight.desc}</p>
            </div>
          </div>
          <div className="mt-6 space-y-4 border-t border-slate-100 pt-5">
            {gapSpotlight.stats.map(([label, value, color]) => (
              <div key={label} className="flex items-center justify-between text-sm">
                <span className="font-medium text-slate-600">{label}</span>
                <span className={`text-xl font-semibold ${color}`}>{value}</span>
              </div>
            ))}
          </div>
          <div className="mt-5">
            <p className="text-sm font-medium text-slate-950">Top Related Roles</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {gapSpotlight.roles.map((role) => (
                <span key={role} className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700">{role}</span>
              ))}
            </div>
          </div>
          <div className="mt-5">
            <p className="text-sm font-medium text-slate-950">Example Topics</p>
            <ul className="mt-2 space-y-2 text-sm leading-6 text-slate-600">
              {gapSpotlight.topics.map((topic) => <li key={topic}>– {topic}</li>)}
            </ul>
          </div>
          <button type="button" className="mt-7 w-full rounded-[8px] border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-700 shadow-sm">
            Explore Interventions →
          </button>
        </aside>
      </section>

      {/* Skills on the Rise */}
      <section className="rounded-[8px] border border-slate-200/80 bg-white p-5 shadow-[0_16px_42px_rgba(15,23,42,0.05)]">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-medium text-slate-950">Skills on the Rise</h2>
            <p className="mt-1 text-sm text-slate-500">Fastest growing skills in the market over the last 12 months.</p>
          </div>
          <button type="button" className="hidden text-sm font-medium text-blue-700 sm:block">
            View all rising skills →
          </button>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-3 xl:grid-cols-5">
          {skillsOnRise.map(([skill, lift]) => (
            <div key={skill} className="rounded-[8px] border border-blue-100 bg-blue-50/40 px-4 py-3">
              <p className="text-sm font-medium text-slate-950">{skill}</p>
              <p className="mt-1 text-sm font-semibold text-emerald-600">{lift}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

function RecommendedActionsTab({ data }) {
  const { actions, impactSummary, actionResources, roadmap } = data
  return (
    <div className="space-y-5">
      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_340px] 2xl:grid-cols-[minmax(0,1fr)_380px]">
        <SectionCard
          title="Recommended Actions"
          subtitle="AI-curated actions to close skill gaps and improve graduate readiness."
          action={
            <div className="flex flex-wrap gap-2">
              <button type="button" className="rounded-[8px] border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600">
                All Priorities
              </button>
              <button type="button" className="rounded-[8px] border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-medium text-blue-700">
                Customize Actions
              </button>
            </div>
          }
        >
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[880px] text-left">
              <thead>
                <tr className="text-xs font-medium uppercase text-slate-400">
                  <th className="rounded-l-[8px] bg-slate-50 px-3 py-3">Action</th>
                  <th className="bg-slate-50 px-3 py-3">Addresses gap</th>
                  <th className="bg-slate-50 px-3 py-3">Impact</th>
                  <th className="bg-slate-50 px-3 py-3">Effort</th>
                  <th className="bg-slate-50 px-3 py-3">Target students</th>
                  <th className="rounded-r-[8px] bg-slate-50 px-3 py-3">Priority</th>
                </tr>
              </thead>
              <tbody>
                {actions.map((row) => (
                  <tr key={row.action}>
                    <td className="border-b border-slate-100 px-3 py-4">
                      <p className="text-sm font-medium text-slate-950">{row.action}</p>
                      <p className="mt-1 text-xs font-semibold text-slate-400">{row.detail}</p>
                    </td>
                    <td className="border-b border-slate-100 px-3 py-4 text-sm font-medium text-blue-700">{row.gap}</td>
                    <td className="border-b border-slate-100 px-3 py-4">
                      <p className="text-sm font-medium text-slate-700">{row.impact}</p>
                      <div className="mt-2">
                        <CoverageBar value={row.impactScore} tone={row.priority === 'High' ? 'green' : 'orange'} />
                      </div>
                    </td>
                    <td className="border-b border-slate-100 px-3 py-4 text-sm font-medium text-slate-600">{row.effort}</td>
                    <td className="border-b border-slate-100 px-3 py-4 text-sm font-medium text-slate-950">{row.students}</td>
                    <td className="border-b border-slate-100 px-3 py-4">
                      <span className={`rounded-full px-3 py-1.5 text-xs font-medium ring-1 ${priorityClasses[row.priority]}`}>
                        {row.priority}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            type="button"
            className="mt-4 w-full rounded-[8px] border border-dashed border-blue-200 py-3 text-sm font-medium text-blue-700 hover:bg-blue-50"
          >
            + Add Custom Action
          </button>
        </SectionCard>

        <aside className="space-y-5">
          <section className="rounded-[8px] border border-violet-100 bg-gradient-to-br from-white via-violet-50/60 to-blue-50 p-5 shadow-[0_16px_42px_rgba(79,70,229,0.08)]">
            <h2 className="text-lg font-medium text-slate-950">Expected Impact Summary</h2>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-[8px] bg-white/85 p-4 ring-1 ring-blue-100">
                <p className="text-xs font-medium text-slate-400">Readiness Improvement</p>
                <p className="mt-2 text-3xl font-semibold text-emerald-600">{impactSummary.readiness}</p>
              </div>
              <div className="rounded-[8px] bg-white/85 p-4 ring-1 ring-violet-100">
                <p className="text-xs font-medium text-slate-400">Students Impacted</p>
                <p className="mt-2 text-3xl font-semibold text-blue-700">{impactSummary.studentsImpacted}</p>
              </div>
            </div>
            <div className="mt-3 rounded-[8px] bg-white/85 p-4 ring-1 ring-slate-100">
              <p className="text-xs font-medium text-slate-400">Estimated Time to Impact</p>
              <p className="mt-1 text-xl font-semibold text-slate-950">{impactSummary.timeToImpact}</p>
            </div>
          </section>

          <section className="rounded-[8px] border border-slate-200/80 bg-white p-5 shadow-[0_16px_42px_rgba(15,23,42,0.05)]">
            <h2 className="text-lg font-medium text-slate-950">Action Resources</h2>
            <div className="mt-4 space-y-3">
              {actionResources.map(([label, value]) => (
                <div key={label} className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-slate-500">{label}</span>
                  <span className="font-semibold text-blue-700">{value}</span>
                </div>
              ))}
            </div>
            <Link
              to="/university/collaboration"
              className="mt-5 block rounded-[8px] bg-blue-600 px-4 py-3 text-center text-sm font-medium text-white shadow-lg shadow-blue-100"
            >
              View in Collaboration Marketplace
            </Link>
          </section>
        </aside>
      </section>

      {/* Implementation Roadmap */}
      <section className="rounded-[8px] border border-slate-200/80 bg-white p-5 shadow-[0_16px_42px_rgba(15,23,42,0.05)]">
        <h2 className="text-lg font-medium text-slate-950">Implementation Roadmap</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {roadmap.map((stage, index) => (
            <article key={stage.title} className="rounded-[8px] border border-slate-200 bg-slate-50/60 p-4">
              <span className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ring-1 ${toneClasses[stage.tone]}`}>
                {index + 1}
              </span>
              <h3 className="mt-3 text-sm font-semibold text-slate-950">{stage.title}</h3>
              <p className="mt-1 text-xs font-medium text-slate-400">{stage.time}</p>
              <ul className="mt-4 space-y-2 text-xs leading-5 text-slate-600">
                {stage.items.map((item) => <li key={item}>– {item}</li>)}
              </ul>
            </article>
          ))}
        </div>
        <div className="mt-5 rounded-[8px] bg-violet-50/70 p-4 ring-1 ring-violet-100">
          <p className="text-sm font-semibold text-slate-950">Success Metrics to Track</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
            {['Graduate Readiness Score', 'Industry Skill Coverage', 'Student Certifications', 'Job Placement Rate'].map((metric) => (
              <span key={metric} className="rounded-full bg-white px-3 py-2 text-xs font-medium text-violet-700 ring-1 ring-violet-100">
                {metric}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function CurriculumMarketAlignmentPage() {
  const [activeTab, setActiveTab] = useState('skills')
  const [showSkillsModal, setShowSkillsModal] = useState(false)
  const [toast, setToast] = useState('')
  const [selectedProgram, setSelectedProgram] = useState('BSc Computer Science')

  const data = programData[selectedProgram]

  function handleProgramChange(program) {
    setSelectedProgram(program)
    setActiveTab('skills')
  }

  function showToast(message) {
    setToast(message)
    window.setTimeout(() => setToast(''), 1800)
  }

  return (
    <div className="mx-auto max-w-[1560px] space-y-6">
      <header className="flex flex-col gap-5 border-b border-slate-200 pb-5 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <p className="text-xs font-medium uppercase text-blue-600">University Intelligence</p>
          <h1 className="mt-2 text-3xl font-medium text-slate-950">Program-Market Alignment</h1>
          <label className="mt-4 block w-fit">
            <span className="text-xs font-medium text-slate-500">Program</span>
            <ProgramDropdown value={selectedProgram} onChange={handleProgramChange} />
          </label>
        </div>
        <div className="flex flex-wrap gap-3 xl:justify-end xl:pt-10">
          <button
            type="button"
            onClick={() => setShowSkillsModal(true)}
            className="h-11 rounded-[8px] border border-blue-200 bg-white px-4 text-sm font-medium text-blue-700 shadow-sm transition hover:border-blue-300 hover:bg-blue-50"
          >
            Manage Program Skills
          </button>
          <button
            type="button"
            onClick={() => showToast('Report sharing link copied.')}
            className="h-11 rounded-[8px] border border-blue-200 bg-white px-4 text-sm font-medium text-blue-700 shadow-sm transition hover:border-blue-300 hover:bg-blue-50"
          >
            Share Report
          </button>
        </div>
      </header>

      <nav className="flex gap-2 overflow-x-auto border-b border-slate-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`relative whitespace-nowrap px-5 py-3 text-sm font-medium transition ${
              activeTab === tab.id ? 'text-blue-700' : 'text-slate-500 hover:text-slate-950'
            }`}
          >
            {tab.label}
            {activeTab === tab.id ? (
              <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-blue-600" />
            ) : null}
          </button>
        ))}
      </nav>

      {activeTab === 'skills'  ? <SkillsAlignmentTab   data={data} /> : null}
      {activeTab === 'gaps'    ? <EmergingGapsTab       data={data} /> : null}
      {activeTab === 'actions' ? <RecommendedActionsTab data={data} /> : null}

      {showSkillsModal ? <ProgramSkillsModal onClose={() => setShowSkillsModal(false)} /> : null}
      <ShareToast message={toast} />
    </div>
  )
}
