import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

// ─── Mock Data per Program × Year Range ───────────────────────────────────────

const programData = {
  'BSc Computer Science': {
    description: 'Strong technical graduate pipeline with role-specific capability gaps in cloud and deployment.',
    yearRanges: ['Last 3 Years', 'Last 5 Years', 'Last Year'],
    data: {
      'Last 3 Years': {
        metrics: [
          { label: 'Employment Rate',       value: '93%',      change: '+3%',       helper: 'vs previous 3 years', tone: 'emerald' },
          { label: 'Avg. Starting Salary',  value: 'RM 3,960', change: '+8%',       helper: 'vs previous 3 years', tone: 'blue'    },
          { label: 'Avg. Time to First Job',value: '2.1 mo',   change: '-0.4 mo',   helper: 'faster placement',    tone: 'violet'  },
          { label: 'Further Studies',       value: '22%',      change: '+2%',       helper: 'vs previous 3 years', tone: 'emerald' },
        ],
        destinations: [
          ['Software Engineer', 36],
          ['Data Analyst',      24],
          ['Product Analyst',   16],
          ['QA Engineer',       10],
          ['Others',            14],
        ],
        companies: [
          ['Shopee',    18, 'S'],
          ['Deloitte',  12, 'D'],
          ['AirAsia',   10, 'A'],
          ['Grab',       8, 'G'],
          ['Petronas',   6, 'P'],
          ['Others',    46, 'O'],
        ],
        feedback: [
          ['Power BI',         34],
          ['Cloud Deployment', 28],
          ['Advanced SQL',     22],
          ['Communication',    18],
          ['MLOps',            16],
        ],
        salaryTrend: [
          { year: '2021', value: 3400 },
          { year: '2022', value: 3620 },
          { year: '2023', value: 3780 },
          { year: '2024', value: 3960 },
        ],
        pathways: [
          { role: 'Software Engineer', share: '36%', missing: ['Cloud', 'Testing', 'DevOps'] },
          { role: 'Data Analyst',      share: '24%', missing: ['Power BI', 'Advanced SQL'] },
          { role: 'Product Analyst',   share: '16%', missing: ['Communication', 'Product Analytics'] },
        ],
        insight: 'Alumni outcomes are strong, but feedback shows graduates need more practical cloud deployment and BI tooling exposure. MLOps is a fast-rising gap not yet covered in the curriculum.',
        focus: ['Cloud deployment pathway', 'Power BI & Tableau module', 'MLOps short course'],
        careerProgression: [
          { role: 'Junior Dev → Senior Dev',          timespan: '2-3 yrs', pct: 44 },
          { role: 'Data Analyst → Senior Analyst',    timespan: '2-4 yrs', pct: 28 },
          { role: 'Engineer → Tech Lead',             timespan: '4-6 yrs', pct: 16 },
          { role: 'Developer → Product Manager',      timespan: '3-5 yrs', pct: 12 },
        ],
      },
      'Last 5 Years': {
        metrics: [
          { label: 'Employment Rate',       value: '90%',      change: '+5%',       helper: 'vs 5 years prior',    tone: 'emerald' },
          { label: 'Avg. Starting Salary',  value: 'RM 3,680', change: '+12%',      helper: 'vs 5 years prior',    tone: 'blue'    },
          { label: 'Avg. Time to First Job',value: '2.4 mo',   change: '-0.7 mo',   helper: 'faster placement',    tone: 'violet'  },
          { label: 'Further Studies',       value: '20%',      change: '+4%',       helper: 'vs 5 years prior',    tone: 'emerald' },
        ],
        destinations: [
          ['Software Engineer', 38],
          ['Data Analyst',      20],
          ['Systems Analyst',   18],
          ['QA Engineer',       12],
          ['Others',            12],
        ],
        companies: [
          ['Grab',       20, 'G'],
          ['Shopee',     16, 'S'],
          ['Deloitte',   10, 'D'],
          ['Maxis',       8, 'M'],
          ['IBM',         6, 'I'],
          ['Others',     40, 'O'],
        ],
        feedback: [
          ['Cloud & DevOps',   38],
          ['Machine Learning', 30],
          ['Power BI',         24],
          ['System Design',    20],
          ['Communication',    16],
        ],
        salaryTrend: [
          { year: '2019', value: 3100 },
          { year: '2020', value: 3240 },
          { year: '2021', value: 3400 },
          { year: '2022', value: 3620 },
          { year: '2023', value: 3780 },
        ],
        pathways: [
          { role: 'Software Engineer',  share: '38%', missing: ['Cloud', 'DevOps', 'Microservices'] },
          { role: 'Systems Analyst',    share: '18%', missing: ['Business Analysis', 'ERP'] },
          { role: 'Data Analyst',       share: '20%', missing: ['ML Basics', 'Power BI'] },
        ],
        insight: 'Over 5 years, CS graduates have consistently trended into engineering roles, with cloud and DevOps skills identified as the most critical persistent gap across all graduating cohorts.',
        focus: ['Cloud & DevOps curriculum module', 'System design practice', 'ML fundamentals elective'],
        careerProgression: [
          { role: 'Junior Dev → Senior Dev',       timespan: '2-3 yrs', pct: 48 },
          { role: 'Analyst → Senior Analyst',      timespan: '2-4 yrs', pct: 24 },
          { role: 'Engineer → Tech Lead',          timespan: '4-6 yrs', pct: 18 },
          { role: 'Developer → Entrepreneur',      timespan: '5+ yrs',  pct: 10 },
        ],
      },
      'Last Year': {
        metrics: [
          { label: 'Employment Rate',       value: '95%',      change: '+5%',       helper: 'vs previous year',    tone: 'emerald' },
          { label: 'Avg. Starting Salary',  value: 'RM 4,100', change: '+4%',       helper: 'vs previous year',    tone: 'blue'    },
          { label: 'Avg. Time to First Job',value: '1.8 mo',   change: '-0.3 mo',   helper: 'faster placement',    tone: 'violet'  },
          { label: 'Further Studies',       value: '24%',      change: '+2%',       helper: 'vs previous year',    tone: 'emerald' },
        ],
        destinations: [
          ['Software Engineer', 40],
          ['Data Analyst',      22],
          ['Product Analyst',   16],
          ['DevOps Engineer',    8],
          ['Others',            14],
        ],
        companies: [
          ['Shopee',    20, 'S'],
          ['Grab',      14, 'G'],
          ['Deloitte',  10, 'D'],
          ['TikTok',     8, 'T'],
          ['Axiata',     6, 'A'],
          ['Others',    42, 'O'],
        ],
        feedback: [
          ['MLOps',            36],
          ['Cloud Deployment', 30],
          ['System Design',    24],
          ['Power BI',         18],
          ['Communication',    14],
        ],
        salaryTrend: [
          { year: 'Q1', value: 3900 },
          { year: 'Q2', value: 3980 },
          { year: 'Q3', value: 4060 },
          { year: 'Q4', value: 4100 },
        ],
        pathways: [
          { role: 'Software Engineer', share: '40%', missing: ['MLOps', 'Cloud', 'System Design'] },
          { role: 'Data Analyst',      share: '22%', missing: ['Power BI', 'ML Basics'] },
          { role: 'DevOps Engineer',   share: '8%',  missing: ['K8s/Docker', 'CI/CD'] },
        ],
        insight: 'This year\'s cohort showed the highest employment rate on record. MLOps emerged as the most-cited gap, reflecting the market shift toward AI-deployed products. Cloud skills remain a persistent concern.',
        focus: ['MLOps bootcamp (urgent)', 'Cloud certification pathway', 'System design sprint'],
        careerProgression: [
          { role: 'Graduate → Software Engineer',  timespan: '0-6 mo',  pct: 60 },
          { role: 'Analyst → Data Scientist',      timespan: '1-2 yrs', pct: 20 },
          { role: 'Engineer → Tech Lead (fast)',    timespan: '2-3 yrs', pct: 12 },
          { role: 'Developer → Product Manager',   timespan: '2-4 yrs', pct: 8 },
        ],
      },
    },
  },

  'BSc Data Science': {
    description: 'Analytical powerhouse pipeline. Graduates highly sought by data-driven companies for ML and analytics roles.',
    yearRanges: ['Last 3 Years', 'Last 5 Years', 'Last Year'],
    data: {
      'Last 3 Years': {
        metrics: [
          { label: 'Employment Rate',       value: '96%',      change: '+5%',       helper: 'vs previous 3 years', tone: 'emerald' },
          { label: 'Avg. Starting Salary',  value: 'RM 4,800', change: '+14%',      helper: 'vs previous 3 years', tone: 'blue'    },
          { label: 'Avg. Time to First Job',value: '1.6 mo',   change: '-0.6 mo',   helper: 'faster placement',    tone: 'violet'  },
          { label: 'Further Studies',       value: '28%',      change: '+4%',       helper: 'vs previous 3 years', tone: 'emerald' },
        ],
        destinations: [
          ['Data Scientist',    38],
          ['ML Engineer',       24],
          ['Data Analyst',      18],
          ['Research Analyst',  10],
          ['Others',            10],
        ],
        companies: [
          ['Grab',         22, 'G'],
          ['TikTok',       16, 'T'],
          ['Shopee',       12, 'S'],
          ['Bank Negara',   8, 'B'],
          ['McKinsey',      6, 'M'],
          ['Others',       36, 'O'],
        ],
        feedback: [
          ['MLOps & Deployment', 42],
          ['Data Engineering',   34],
          ['Cloud ML Platforms', 28],
          ['Business Acumen',    22],
          ['Communication',      18],
        ],
        salaryTrend: [
          { year: '2021', value: 4100 },
          { year: '2022', value: 4380 },
          { year: '2023', value: 4620 },
          { year: '2024', value: 4800 },
        ],
        pathways: [
          { role: 'Data Scientist',  share: '38%', missing: ['MLOps', 'Production ML', 'Stakeholder Mgmt'] },
          { role: 'ML Engineer',     share: '24%', missing: ['DevOps', 'Cloud Platforms', 'CI/CD for ML'] },
          { role: 'Data Analyst',    share: '18%', missing: ['Power BI', 'Business Storytelling'] },
        ],
        insight: 'DS graduates command the highest starting salaries across all programs. However, alumni consistently report that MLOps and production deployment were the biggest blind spots in their education — skills now required even at junior DS roles.',
        focus: ['MLOps & model deployment bootcamp', 'Data Engineering pipeline lab', 'Cloud ML platform certification'],
        careerProgression: [
          { role: 'Junior DS → Senior Data Scientist', timespan: '2-3 yrs', pct: 46 },
          { role: 'DS → ML Engineer',                  timespan: '1-2 yrs', pct: 28 },
          { role: 'Analyst → Lead Analyst',            timespan: '2-4 yrs', pct: 16 },
          { role: 'DS → Data Science Manager',         timespan: '4-6 yrs', pct: 10 },
        ],
      },
      'Last 5 Years': {
        metrics: [
          { label: 'Employment Rate',       value: '92%',      change: '+8%',       helper: 'vs 5 years prior',    tone: 'emerald' },
          { label: 'Avg. Starting Salary',  value: 'RM 4,320', change: '+20%',      helper: 'vs 5 years prior',    tone: 'blue'    },
          { label: 'Avg. Time to First Job',value: '2.0 mo',   change: '-0.8 mo',   helper: 'faster placement',    tone: 'violet'  },
          { label: 'Further Studies',       value: '32%',      change: '+6%',       helper: 'vs 5 years prior',    tone: 'emerald' },
        ],
        destinations: [
          ['Data Scientist',    32],
          ['Data Analyst',      28],
          ['ML Researcher',     18],
          ['Statistician',      12],
          ['Others',            10],
        ],
        companies: [
          ['Grab',        18, 'G'],
          ['Shopee',      14, 'S'],
          ['Axiata',      10, 'A'],
          ['EY',           8, 'E'],
          ['Intel',        6, 'I'],
          ['Others',      44, 'O'],
        ],
        feedback: [
          ['Production ML',     44],
          ['Data Pipelines',    36],
          ['Communication',     26],
          ['Business Acumen',   22],
          ['Cloud Platforms',   18],
        ],
        salaryTrend: [
          { year: '2019', value: 3600 },
          { year: '2020', value: 3820 },
          { year: '2021', value: 4100 },
          { year: '2022', value: 4380 },
          { year: '2023', value: 4620 },
        ],
        pathways: [
          { role: 'Data Scientist',  share: '32%', missing: ['Production ML', 'MLOps', 'Communication'] },
          { role: 'Data Analyst',    share: '28%', missing: ['BI Tools', 'Storytelling', 'Excel'] },
          { role: 'ML Researcher',   share: '18%', missing: ['Research Writing', 'Cloud Compute'] },
        ],
        insight: 'Over 5 years, DS graduates have seen the steepest salary growth curve of any program. The consistent pattern: employers praise analytical foundations but flag the inability to deploy models to production as a key hiring barrier.',
        focus: ['Production ML deployment module', 'Communication & stakeholder skills', 'BI tools elective'],
        careerProgression: [
          { role: 'Graduate → Data Scientist',      timespan: '0-6 mo',  pct: 52 },
          { role: 'Analyst → Senior DS',            timespan: '2-3 yrs', pct: 26 },
          { role: 'DS → Research Scientist',        timespan: '3-5 yrs', pct: 14 },
          { role: 'DS → Data Science Director',     timespan: '5+ yrs',  pct: 8 },
        ],
      },
      'Last Year': {
        metrics: [
          { label: 'Employment Rate',       value: '98%',      change: '+2%',       helper: 'vs previous year',    tone: 'emerald' },
          { label: 'Avg. Starting Salary',  value: 'RM 5,100', change: '+6%',       helper: 'vs previous year',    tone: 'blue'    },
          { label: 'Avg. Time to First Job',value: '1.2 mo',   change: '-0.4 mo',   helper: 'faster placement',    tone: 'violet'  },
          { label: 'Further Studies',       value: '30%',      change: '+2%',       helper: 'vs previous year',    tone: 'emerald' },
        ],
        destinations: [
          ['Data Scientist',    42],
          ['ML Engineer',       26],
          ['Research Analyst',  16],
          ['AI Engineer',       10],
          ['Others',             6],
        ],
        companies: [
          ['TikTok',       24, 'T'],
          ['Grab',         18, 'G'],
          ['Google MY',    12, 'G'],
          ['Shopee',        8, 'S'],
          ['CIMB Bank',     6, 'C'],
          ['Others',       32, 'O'],
        ],
        feedback: [
          ['MLOps & Serving',    44],
          ['GenAI Fine-tuning',  36],
          ['Cloud ML Platforms', 28],
          ['Data Engineering',   22],
          ['Business Acumen',    16],
        ],
        salaryTrend: [
          { year: 'Q1', value: 4900 },
          { year: 'Q2', value: 5000 },
          { year: 'Q3', value: 5060 },
          { year: 'Q4', value: 5100 },
        ],
        pathways: [
          { role: 'Data Scientist',  share: '42%', missing: ['MLOps', 'GenAI Fine-tuning', 'API Design'] },
          { role: 'ML Engineer',     share: '26%', missing: ['Cloud Infra', 'Model Monitoring', 'DevOps'] },
          { role: 'AI Engineer',     share: '10%', missing: ['LLM Fundamentals', 'RAG Pipelines'] },
        ],
        insight: 'This year\'s DS cohort achieved near-perfect employment and the highest average salary across all programs. GenAI skills have emerged as a new critical gap — graduates entering AI roles report a steep learning curve in LLM deployment that the curriculum does not yet address.',
        focus: ['GenAI & LLM deployment module (urgent)', 'MLOps production pipeline', 'Cloud ML platform certification'],
        careerProgression: [
          { role: 'Graduate → Data Scientist',     timespan: '0-3 mo',  pct: 62 },
          { role: 'DS → ML/AI Engineer',           timespan: '1-2 yrs', pct: 22 },
          { role: 'DS → Senior Scientist',         timespan: '2-3 yrs', pct: 10 },
          { role: 'DS → Head of Data',             timespan: '4+ yrs',  pct: 6  },
        ],
      },
    },
  },

  'BSc Data Analytics': {
    description: 'Business-ready analysts with strong SQL and reporting foundations, heading into BI and operations roles.',
    yearRanges: ['Last 3 Years', 'Last 5 Years', 'Last Year'],
    data: {
      'Last 3 Years': {
        metrics: [
          { label: 'Employment Rate',       value: '91%',      change: '+4%',       helper: 'vs previous 3 years', tone: 'emerald' },
          { label: 'Avg. Starting Salary',  value: 'RM 3,400', change: '+6%',       helper: 'vs previous 3 years', tone: 'blue'    },
          { label: 'Avg. Time to First Job',value: '2.3 mo',   change: '-0.3 mo',   helper: 'faster placement',    tone: 'violet'  },
          { label: 'Further Studies',       value: '16%',      change: '+1%',       helper: 'vs previous 3 years', tone: 'emerald' },
        ],
        destinations: [
          ['Business Analyst',     34],
          ['Data Analyst',         28],
          ['Reporting Analyst',    18],
          ['Operations Analyst',   12],
          ['Others',                8],
        ],
        companies: [
          ['CIMB Bank',    16, 'C'],
          ['Maybank',      14, 'M'],
          ['EY',           12, 'E'],
          ['Telekom MY',    8, 'T'],
          ['Shell',         6, 'S'],
          ['Others',       44, 'O'],
        ],
        feedback: [
          ['Power BI',            40],
          ['Python Analytics',    32],
          ['Tableau',             26],
          ['Predictive Modelling',20],
          ['Communication',       16],
        ],
        salaryTrend: [
          { year: '2021', value: 3000 },
          { year: '2022', value: 3160 },
          { year: '2023', value: 3280 },
          { year: '2024', value: 3400 },
        ],
        pathways: [
          { role: 'Business Analyst',  share: '34%', missing: ['Power BI', 'Stakeholder Mgmt', 'Process Mapping'] },
          { role: 'Data Analyst',      share: '28%', missing: ['Python Analytics', 'Tableau', 'Advanced SQL'] },
          { role: 'Reporting Analyst', share: '18%', missing: ['Power BI Automation', 'Dashboard Design'] },
        ],
        insight: 'DA graduates are valued for their strong analytical foundations and SQL expertise. However, Power BI is cited by 40% of alumni as the most critical missing tool — it is the industry standard for business reporting yet only partially covered in the curriculum.',
        focus: ['Power BI & Tableau intensive', 'Python analytics scripting module', 'Predictive modelling elective'],
        careerProgression: [
          { role: 'Graduate → Business Analyst',   timespan: '0-6 mo',  pct: 50 },
          { role: 'Analyst → Senior Analyst',      timespan: '2-4 yrs', pct: 30 },
          { role: 'Analyst → Data Scientist',      timespan: '3-5 yrs', pct: 12 },
          { role: 'Senior Analyst → Manager',      timespan: '4-6 yrs', pct: 8  },
        ],
      },
      'Last 5 Years': {
        metrics: [
          { label: 'Employment Rate',       value: '88%',      change: '+6%',       helper: 'vs 5 years prior',    tone: 'emerald' },
          { label: 'Avg. Starting Salary',  value: 'RM 3,150', change: '+10%',      helper: 'vs 5 years prior',    tone: 'blue'    },
          { label: 'Avg. Time to First Job',value: '2.7 mo',   change: '-0.5 mo',   helper: 'faster placement',    tone: 'violet'  },
          { label: 'Further Studies',       value: '14%',      change: '+2%',       helper: 'vs 5 years prior',    tone: 'emerald' },
        ],
        destinations: [
          ['Business Analyst',     30],
          ['Data Analyst',         26],
          ['Reporting Analyst',    20],
          ['Finance Analyst',      14],
          ['Others',               10],
        ],
        companies: [
          ['Maybank',      18, 'M'],
          ['CIMB Bank',    14, 'C'],
          ['EY',           10, 'E'],
          ['KPMG',          8, 'K'],
          ['Petronas',      6, 'P'],
          ['Others',       44, 'O'],
        ],
        feedback: [
          ['Power BI',          42],
          ['Advanced SQL',      30],
          ['Python for Data',   26],
          ['Financial Modelling',18],
          ['Stakeholder Skills', 14],
        ],
        salaryTrend: [
          { year: '2019', value: 2860 },
          { year: '2020', value: 2920 },
          { year: '2021', value: 3000 },
          { year: '2022', value: 3160 },
          { year: '2023', value: 3280 },
        ],
        pathways: [
          { role: 'Business Analyst',  share: '30%', missing: ['Power BI', 'Process Docs', 'Stakeholder Mgmt'] },
          { role: 'Finance Analyst',   share: '14%', missing: ['Financial Modelling', 'Excel Advanced'] },
          { role: 'Data Analyst',      share: '26%', missing: ['Python', 'Advanced SQL', 'Tableau'] },
        ],
        insight: 'Over 5 years, DA graduates have maintained strong placement in banking and consulting. Power BI has consistently been the #1 feedback skill — this gap has persisted for 5 years and now requires a structured curriculum response.',
        focus: ['Power BI as core curriculum (not elective)', 'Advanced SQL & Python module', 'Financial modelling workshop'],
        careerProgression: [
          { role: 'Graduate → Business Analyst',  timespan: '0-6 mo',  pct: 46 },
          { role: 'Analyst → Senior Analyst',     timespan: '2-4 yrs', pct: 32 },
          { role: 'Analyst → Finance Manager',    timespan: '4-6 yrs', pct: 14 },
          { role: 'Analyst → Data Scientist',     timespan: '4-6 yrs', pct: 8  },
        ],
      },
      'Last Year': {
        metrics: [
          { label: 'Employment Rate',       value: '94%',      change: '+3%',       helper: 'vs previous year',    tone: 'emerald' },
          { label: 'Avg. Starting Salary',  value: 'RM 3,600', change: '+6%',       helper: 'vs previous year',    tone: 'blue'    },
          { label: 'Avg. Time to First Job',value: '2.0 mo',   change: '-0.3 mo',   helper: 'faster placement',    tone: 'violet'  },
          { label: 'Further Studies',       value: '18%',      change: '+2%',       helper: 'vs previous year',    tone: 'emerald' },
        ],
        destinations: [
          ['Business Analyst',     36],
          ['Data Analyst',         30],
          ['Operations Analyst',   16],
          ['Reporting Analyst',    10],
          ['Others',                8],
        ],
        companies: [
          ['Maybank',      20, 'M'],
          ['CIMB Bank',    16, 'C'],
          ['Deloitte',     10, 'D'],
          ['Shell',         8, 'S'],
          ['Celcom',        6, 'C'],
          ['Others',       40, 'O'],
        ],
        feedback: [
          ['Power BI',            42],
          ['Python Analytics',    34],
          ['Tableau',             26],
          ['Cloud BI (Looker)',   18],
          ['Predictive Modelling',16],
        ],
        salaryTrend: [
          { year: 'Q1', value: 3440 },
          { year: 'Q2', value: 3520 },
          { year: 'Q3', value: 3570 },
          { year: 'Q4', value: 3600 },
        ],
        pathways: [
          { role: 'Business Analyst',  share: '36%', missing: ['Power BI', 'Automation', 'Stakeholder Mgmt'] },
          { role: 'Data Analyst',      share: '30%', missing: ['Python', 'Tableau', 'Predictive Modelling'] },
          { role: 'Operations Analyst',share: '16%', missing: ['Process Mining', 'Workflow Automation'] },
        ],
        insight: 'This year\'s DA cohort saw a jump in starting salaries and faster placement. Cloud BI tools like Looker have emerged as a new gap — as more companies migrate to cloud-based analytics, graduates without exposure are disadvantaged at interview.',
        focus: ['Power BI core module (immediate)', 'Python for analytics scripting', 'Cloud BI & Looker introduction'],
        careerProgression: [
          { role: 'Graduate → Business Analyst',  timespan: '0-3 mo',  pct: 58 },
          { role: 'Analyst → Senior Analyst',     timespan: '2-3 yrs', pct: 26 },
          { role: 'Analyst → Operations Lead',    timespan: '3-5 yrs', pct: 10 },
          { role: 'Analyst → Data Scientist',     timespan: '3-5 yrs', pct: 6  },
        ],
      },
    },
  },
}

// ─── Constants ────────────────────────────────────────────────────────────────

const toneClasses = {
  blue:    'bg-blue-50 text-blue-700 ring-blue-100',
  violet:  'bg-violet-50 text-violet-700 ring-violet-100',
  emerald: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
  amber:   'bg-amber-50 text-amber-700 ring-amber-100',
  rose:    'bg-rose-50 text-rose-700 ring-rose-100',
}

// ─── Reusable Components ──────────────────────────────────────────────────────

function FilterDropdown({ label, value, options, onChange }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function outside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', outside)
    return () => document.removeEventListener('mousedown', outside)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`flex h-11 min-w-[160px] items-center justify-between gap-3 rounded-[8px] border px-3 text-sm font-semibold shadow-sm transition ${
          open ? 'border-blue-300 bg-blue-50 text-blue-700' : 'border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:text-blue-700'
        }`}
      >
        <span className="flex flex-col items-start leading-none">
          <span className="text-[10px] font-medium text-slate-400">{label}</span>
          <span className="mt-0.5 whitespace-nowrap">{value}</span>
        </span>
        <svg
          className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 20 20" fill="currentColor"
        >
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
      </button>
      {open && (
        <div className="absolute left-0 top-full z-30 mt-1.5 min-w-[200px] overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-[0_12px_32px_rgba(15,23,42,0.12)]">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => { onChange(option); setOpen(false) }}
              className={`flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left text-sm font-medium transition hover:bg-blue-50 hover:text-blue-700 ${option === value ? 'bg-blue-50 text-blue-700' : 'text-slate-700'}`}
            >
              {option === value
                ? <svg className="h-3.5 w-3.5 shrink-0 text-blue-600" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" /></svg>
                : <span className="h-3.5 w-3.5 shrink-0" />}
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function MetricCard({ metric }) {
  return (
    <article className="rounded-[8px] border border-slate-200/80 bg-white p-5 shadow-[0_14px_34px_rgba(15,23,42,0.04)]">
      <p className="text-xs font-medium uppercase text-slate-400">{metric.label}</p>
      <p className="mt-3 text-3xl font-semibold text-slate-950">{metric.value}</p>
      <div className="mt-4 flex items-center gap-2">
        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${toneClasses[metric.tone]}`}>
          {metric.change}
        </span>
        <span className="text-xs font-semibold text-slate-500">{metric.helper}</span>
      </div>
    </article>
  )
}

function ProgressRow({ label, value, tone = 'blue' }) {
  const color = tone === 'rose'
    ? 'bg-gradient-to-r from-orange-400 to-rose-500'
    : 'bg-gradient-to-r from-blue-500 to-violet-500'
  return (
    <div>
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="font-medium text-slate-700">{label}</span>
        <span className={`font-semibold ${tone === 'rose' ? 'text-rose-600' : 'text-slate-700'}`}>{value}%</span>
      </div>
      <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-100">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}

function CompanyRow({ company }) {
  const [name, value, initial] = company
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] bg-blue-50 text-xs font-semibold text-blue-700 ring-1 ring-blue-100">
        {initial}
      </span>
      <span className="min-w-0 flex-1 text-sm font-medium text-slate-700">{name}</span>
      <span className="text-sm font-semibold text-slate-700">{value}%</span>
    </div>
  )
}

function SalaryTrendChart({ trend }) {
  const max = Math.max(...trend.map((d) => d.value))
  const min = Math.min(...trend.map((d) => d.value))
  const range = max - min || 1
  const w = 220
  const h = 80
  const padX = 10
  const padY = 10

  const points = trend.map((d, i) => {
    const x = padX + (i / (trend.length - 1)) * (w - padX * 2)
    const y = h - padY - ((d.value - min) / range) * (h - padY * 2)
    return { x, y, ...d }
  })

  const polyline = points.map((p) => `${p.x},${p.y}`).join(' ')

  return (
    <div className="mt-4 rounded-[8px] border border-slate-100 bg-slate-50/60 p-3">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height: 90 }}>
        {/* Grid lines */}
        {[0.25, 0.5, 0.75, 1].map((t) => {
          const y = padY + (1 - t) * (h - padY * 2)
          const val = Math.round(min + t * range)
          return (
            <g key={t}>
              <line x1={padX} x2={w - padX} y1={y} y2={y} stroke="#e2e8f0" strokeWidth="1" />
              <text x={padX} y={y - 2} fontSize="6" fill="#94a3b8">{`RM ${val.toLocaleString()}`}</text>
            </g>
          )
        })}
        {/* Area fill */}
        <defs>
          <linearGradient id="salaryGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon
          points={`${points[0].x},${h - padY} ${polyline} ${points[points.length - 1].x},${h - padY}`}
          fill="url(#salaryGrad)"
        />
        {/* Line */}
        <polyline points={polyline} fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {/* Dots + labels */}
        {points.map((p) => (
          <g key={p.year}>
            <circle cx={p.x} cy={p.y} r="3" fill="white" stroke="#3b82f6" strokeWidth="1.8" />
            <text x={p.x} y={h - 2} textAnchor="middle" fontSize="7" fill="#94a3b8">{p.year}</text>
          </g>
        ))}
      </svg>
    </div>
  )
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function AlumniSignalIntelligencePage() {
  const programOptions = Object.keys(programData)
  const [selectedProgram, setSelectedProgram] = useState('BSc Computer Science')

  const currentProgram = programData[selectedProgram]
  const [selectedRange, setSelectedRange] = useState(currentProgram.yearRanges[0])

  function handleProgramChange(p) {
    setSelectedProgram(p)
    setSelectedRange(programData[p].yearRanges[0])
  }

  const d = currentProgram.data[selectedRange]

  return (
    <div className="mx-auto max-w-[1560px] space-y-6">

      {/* Header */}
      <header className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase text-blue-600">University Intelligence</p>
          <h1 className="mt-2 text-3xl font-medium text-slate-950">Alumni Signal Intelligence</h1>
          <p className="mt-2 text-base leading-7 text-slate-500">
            Insights from graduate outcomes, hiring patterns, and alumni feedback.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 xl:justify-end">
          <FilterDropdown
            label="Program"
            value={selectedProgram}
            options={programOptions}
            onChange={handleProgramChange}
          />
          <FilterDropdown
            label="Year Range"
            value={selectedRange}
            options={currentProgram.yearRanges}
            onChange={setSelectedRange}
          />
          <button
            type="button"
            className="h-11 rounded-[8px] bg-blue-600 px-4 text-sm font-medium text-white shadow-lg shadow-blue-100 transition hover:bg-blue-700"
          >
            Export Report
          </button>
        </div>
      </header>

      {/* KPI Metrics */}
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {d.metrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </section>

      {/* Main 3-col grid */}
      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px] 2xl:grid-cols-[minmax(0,1fr)_400px]">
        <div className="min-w-0 space-y-5">

          {/* Graduate Destinations + Hiring Companies + Alumni Feedback */}
          <section className="grid gap-5 lg:grid-cols-3">
            <article className="rounded-[8px] border border-slate-200/80 bg-white p-5 shadow-[0_16px_42px_rgba(15,23,42,0.05)]">
              <h2 className="text-lg font-medium text-slate-950">Graduate Destinations</h2>
              <p className="mt-1 text-sm text-slate-500">Top roles our graduates are in</p>
              <div className="mt-5 space-y-4">
                {d.destinations.map(([label, value]) => (
                  <ProgressRow key={label} label={label} value={value} />
                ))}
              </div>
            </article>

            <article className="rounded-[8px] border border-slate-200/80 bg-white p-5 shadow-[0_16px_42px_rgba(15,23,42,0.05)]">
              <h2 className="text-lg font-medium text-slate-950">Top Hiring Companies</h2>
              <p className="mt-1 text-sm text-slate-500">Companies that hire our graduates</p>
              <div className="mt-5 space-y-4">
                {d.companies.map((company) => (
                  <CompanyRow key={company[0]} company={company} />
                ))}
              </div>
            </article>

            <article className="rounded-[8px] border border-slate-200/80 bg-white p-5 shadow-[0_16px_42px_rgba(15,23,42,0.05)]">
              <h2 className="text-lg font-medium text-slate-950">Alumni Feedback</h2>
              <p className="mt-1 text-sm text-slate-500">Skills alumni wish they had learned more</p>
              <div className="mt-5 space-y-4">
                {d.feedback.map(([label, value]) => (
                  <ProgressRow key={label} label={label} value={value} tone="rose" />
                ))}
              </div>
            </article>
          </section>

          {/* Salary Trend + Career Progression */}
          <section className="grid gap-5 md:grid-cols-2">
            <section className="rounded-[8px] border border-slate-200/80 bg-white p-5 shadow-[0_16px_42px_rgba(15,23,42,0.05)]">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-medium text-slate-950">Avg. Starting Salary Trend</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    {selectedProgram} · {selectedRange}
                  </p>
                </div>
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
                  {d.metrics[1].change}
                </span>
              </div>
              <SalaryTrendChart trend={d.salaryTrend} />
              <p className="mt-3 text-2xl font-semibold text-blue-700">{d.metrics[1].value}</p>
              <p className="text-xs text-slate-500">Latest average starting salary</p>
            </section>

            <section className="rounded-[8px] border border-slate-200/80 bg-white p-5 shadow-[0_16px_42px_rgba(15,23,42,0.05)]">
              <h2 className="text-lg font-medium text-slate-950">Career Progression Pathways</h2>
              <p className="mt-1 text-sm text-slate-500">Common career trajectories of our alumni</p>
              <div className="mt-5 space-y-4">
                {d.careerProgression.map((item) => (
                  <div key={item.role}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-slate-700">{item.role}</span>
                      <span className="shrink-0 rounded-full bg-slate-50 px-2 py-0.5 text-xs font-semibold text-slate-500 ring-1 ring-slate-100">
                        {item.timespan}
                      </span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-violet-500 to-blue-500"
                        style={{ width: `${item.pct}%` }}
                      />
                    </div>
                    <p className="mt-1 text-right text-xs text-slate-400">{item.pct}% of alumni</p>
                  </div>
                ))}
              </div>
            </section>
          </section>

          {/* Graduate Role Pathway Map */}
          <section className="rounded-[8px] border border-slate-200/80 bg-white p-5 shadow-[0_16px_42px_rgba(15,23,42,0.05)]">
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <h2 className="text-lg font-medium text-slate-950">Graduate Role Pathway Map</h2>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Program outcomes connected to common roles and skill gaps reported by alumni.
                </p>
              </div>
              <span className="w-fit rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 ring-1 ring-blue-100">
                {selectedProgram}
              </span>
            </div>
            <div className="mt-5 grid gap-4 lg:grid-cols-[240px_minmax(0,1fr)]">
              <div className="rounded-[8px] border border-blue-100 bg-blue-50/60 p-4">
                <p className="text-xs font-medium uppercase text-blue-600">Program</p>
                <h3 className="mt-2 text-lg font-semibold text-slate-950">{selectedProgram}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">{currentProgram.description}</p>
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                {d.pathways.map((pathway) => (
                  <article key={pathway.role} className="rounded-[8px] border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-950">{pathway.role}</p>
                        <p className="mt-1 text-xs font-medium text-blue-700">{pathway.share} of graduates</p>
                      </div>
                      <span className="text-slate-300">→</span>
                    </div>
                    <p className="mt-4 text-xs font-medium uppercase text-slate-400">Missing skills</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {pathway.missing.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full bg-rose-50 px-3 py-1.5 text-xs font-medium text-rose-700 ring-1 ring-rose-100"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* AI Insight Sidebar */}
        <aside className="rounded-[8px] border border-violet-100 bg-gradient-to-br from-white via-violet-50/70 to-blue-50 p-5 shadow-[0_18px_48px_rgba(79,70,229,0.1)]">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-[8px] bg-white text-sm font-semibold text-violet-700 shadow-sm ring-1 ring-violet-100">
              AI
            </span>
            <div>
              <p className="text-xs font-medium uppercase text-violet-600">Alumni-to-Market Insight</p>
              <h2 className="text-lg font-medium text-slate-950">Key insight</h2>
            </div>
          </div>
          <p className="mt-5 text-sm leading-7 text-slate-600">{d.insight}</p>
          <div className="mt-6">
            <p className="text-sm font-semibold text-slate-950">Recommended focus</p>
            <div className="mt-3 space-y-3">
              {d.focus.map((item, index) => (
                <div key={item} className="flex items-center gap-3 rounded-[8px] border border-white bg-white/80 p-3 shadow-sm">
                  <span className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ring-1 ${index === 0 ? toneClasses.rose : index === 1 ? toneClasses.blue : toneClasses.violet}`}>
                    {index + 1}
                  </span>
                  <span className="text-sm font-medium text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-6 space-y-3 border-t border-slate-100 pt-5">
            <p className="text-sm font-semibold text-slate-950">Cohort at a glance</p>
            {[
              ['Employment Rate',   d.metrics[0].value, 'text-emerald-700'],
              ['Avg. Salary',       d.metrics[1].value, 'text-blue-700'],
              ['Time to First Job', d.metrics[2].value, 'text-violet-700'],
              ['Further Studies',   d.metrics[3].value, 'text-amber-700'],
            ].map(([label, value, color]) => (
              <div key={label} className="flex items-center justify-between rounded-[8px] bg-white/80 px-3 py-2.5 ring-1 ring-slate-100">
                <span className="text-xs font-medium text-slate-500">{label}</span>
                <span className={`text-sm font-bold ${color}`}>{value}</span>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="mt-6 w-full rounded-[8px] bg-violet-600 px-4 py-3 text-sm font-medium text-white shadow-lg shadow-violet-100 transition hover:bg-violet-700"
          >
            View full alumni report
          </button>
        </aside>
      </section>

      {/* CTA Banner */}
      <section className="rounded-[8px] border border-blue-100 bg-gradient-to-r from-blue-50 via-white to-violet-50 p-5 shadow-[0_16px_42px_rgba(37,99,235,0.08)]">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-950">
              Use these alumni signals to update Program-Market Alignment recommendations.
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-500">
              Convert graduate feedback and hiring outcomes into curriculum improvement actions for{' '}
              <span className="font-medium text-blue-700">{selectedProgram}</span>.
            </p>
          </div>
          <Link
            to="/university/curriculum"
            className="inline-flex h-11 shrink-0 items-center justify-center rounded-[8px] bg-blue-600 px-4 text-sm font-medium text-white shadow-lg shadow-blue-100 transition hover:bg-blue-700"
          >
            Apply alumni insights to recommendations
          </Link>
        </div>
      </section>
    </div>
  )
}
