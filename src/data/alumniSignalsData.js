// Mock data for the University Alumni Signal Intelligence page
// (src/pages/university/AlumniSignalIntelligence.jsx). No backend — static demo content.

export const summaryBanner = {
  text:
    'The 2023 curriculum update adding cloud fundamentals correlates with a 14% faster time-to-first-role for that cohort. GenAI is now the #1 skill gap in Q2 2026 alumni feedback — 74% flagged it. A co-designed module (CS5001) with TalentBank is now in development.',
}

export const kpis = [
  { id: 'avg-salary', icon: 'dollar', tone: 'green', label: 'Avg starting salary', value: 'RM 5,100', note: '▲ 8% vs 2021 cohort', noteTone: 'green' },
  { id: 'time-to-role', icon: 'clock', tone: 'blue', label: 'Time to first role', value: '2.3 months', note: '▼ 14% vs pre-2023 cohorts', noteTone: 'green' },
  { id: 'employer-satisfaction', icon: 'star', tone: 'purple', label: 'Employer satisfaction', value: '4.2/5', note: 'Based on 6-month reviews', noteTone: 'muted' },
  { id: 'tracked-alumni', icon: 'people', tone: 'blue', label: 'Tracked alumni', value: '412', note: '78% response rate', noteTone: 'muted' },
]

export const timeRangeOptions = ['Last Year', 'Last 3 Years', 'Last 5 Years']

// Time-range-specific KPI + salary trend datasets, so the dropdown actually
// changes displayed numbers instead of just being a label.
export const kpisByRange = {
  'Last Year': [
    { id: 'avg-salary', icon: 'dollar', tone: 'green', label: 'Avg starting salary', value: 'RM 5,100', note: '▲ 4% vs prior year', noteTone: 'green' },
    { id: 'time-to-role', icon: 'clock', tone: 'blue', label: 'Time to first role', value: '2.1 months', note: '▼ 5% vs prior year', noteTone: 'green' },
    { id: 'employer-satisfaction', icon: 'star', tone: 'purple', label: 'Employer satisfaction', value: '4.3/5', note: 'Based on 6-month reviews', noteTone: 'muted' },
    { id: 'tracked-alumni', icon: 'people', tone: 'blue', label: 'Tracked alumni', value: '96', note: '82% response rate', noteTone: 'muted' },
  ],
  'Last 3 Years': kpis,
  'Last 5 Years': [
    { id: 'avg-salary', icon: 'dollar', tone: 'green', label: 'Avg starting salary', value: 'RM 5,100', note: '▲ 21% vs 2019 cohort', noteTone: 'green' },
    { id: 'time-to-role', icon: 'clock', tone: 'blue', label: 'Time to first role', value: '2.5 months', note: '▼ 9% vs 2019 cohorts', noteTone: 'green' },
    { id: 'employer-satisfaction', icon: 'star', tone: 'purple', label: 'Employer satisfaction', value: '4.0/5', note: 'Based on 6-month reviews', noteTone: 'muted' },
    { id: 'tracked-alumni', icon: 'people', tone: 'blue', label: 'Tracked alumni', value: '680', note: '74% response rate', noteTone: 'muted' },
  ],
}

export const salaryTrend = {
  cohort: 'BSc Data Science',
  years: ['2021', '2022', '2023', '2024', '2025'],
  values: [4200, 4450, 4700, 4900, 5100],
  axisMin: 3500,
  axisMax: 6000,
  axisStep: 500,
  annotations: [
    {
      year: '2023',
      label: 'Cloud fundamentals added to curriculum',
      detail: 'CS301 added a 2-week AWS fundamentals module in Fall 2023. Graduates from this cohort onward show a 14% faster time-to-first-role than pre-2023 cohorts.',
      impact: 'Measured impact: +RM 250 avg starting salary, -0.3 months time-to-role',
    },
    {
      year: '2024',
      label: 'AI/ML elective expanded',
      detail: 'CS410 (AI/ML elective) expanded from 1 to 2 semesters and added a capstone project requirement in early 2024.',
      impact: 'Measured impact: +RM 200 avg starting salary for AI/ML track graduates',
    },
  ],
  footnote: 'Curriculum changes are annotated on the timeline — showing correlation between updates and salary growth.',
}

export const salaryTrendByRange = {
  'Last Year': {
    ...salaryTrend,
    years: ['2025'],
    values: [5100],
    axisMin: 4500,
    axisMax: 5500,
    axisStep: 250,
    annotations: [],
  },
  'Last 3 Years': salaryTrend,
  'Last 5 Years': {
    ...salaryTrend,
    years: ['2019', '2020', '2021', '2022', '2023', '2024', '2025'],
    values: [3600, 3750, 4200, 4450, 4700, 4900, 5100],
    axisMin: 3200,
    axisMax: 6000,
    axisStep: 500,
    annotations: [
      { year: '2023', label: 'Cloud fundamentals added to curriculum', detail: salaryTrend.annotations[0].detail, impact: salaryTrend.annotations[0].impact },
      { year: '2024', label: 'AI/ML elective expanded', detail: salaryTrend.annotations[1].detail, impact: salaryTrend.annotations[1].impact },
    ],
  },
}

export const rolePathway = {
  subtitle: 'How specializations lead to roles',
  tracks: [
    { id: 'data-science', label: 'Data Science Track', pct: 45, tone: '#185FA5' },
    { id: 'software-eng', label: 'Software Eng Track', pct: 35, tone: '#7c3aed' },
    { id: 'ai-ml', label: 'AI/ML Track', pct: 20, tone: '#0d9488' },
  ],
  roles: [
    { id: 'data-analyst', label: 'Data Analyst', pct: 30 },
    { id: 'software-engineer', label: 'Software Engineer', pct: 28 },
    { id: 'ml-engineer', label: 'ML Engineer', pct: 18 },
    { id: 'data-scientist', label: 'Data Scientist', pct: 15 },
    { id: 'other', label: 'Other', pct: 9 },
  ],
  // [trackIndex, roleIndex, weight 0-1]
  flows: [
    [0, 0, 0.42], [0, 3, 0.3], [0, 1, 0.14], [0, 4, 0.14],
    [1, 1, 0.55], [1, 2, 0.2], [1, 0, 0.15], [1, 4, 0.1],
    [2, 2, 0.55], [2, 3, 0.2], [2, 1, 0.15], [2, 4, 0.1],
  ],
  footnote: 'Most Data Science Track graduates (62%) land Data Analyst or Data Scientist roles within 6 months.',
}

export const employerConcentration = {
  subtitle: 'Risk & partnership signal',
  rows: [
    { id: 'grab', label: 'Grab', pct: 24 },
    { id: 'shopee', label: 'Shopee', pct: 18 },
    { id: 'deloitte', label: 'Deloitte', pct: 12 },
    { id: 'maybank', label: 'Maybank', pct: 10 },
    { id: 'axiata', label: 'Axiata', pct: 8 },
    { id: 'others', label: 'Others (32 companies)', pct: 28 },
  ],
  warning: {
    text: '42% of graduates concentrate in just 4 employers. Consider diversifying partnerships to reduce market exposure risk.',
    linkLabel: 'View partnership opportunities',
  },
}

export const feedbackLoop = {
  rows: [
    { id: 'genai', icon: 'brain', stat: '74% flagged GenAI / LLM integration as their single biggest skill gap in Q2 2026 survey', linkedTo: 'Generative AI / LLMs gap', gapId: 'genai-llms' },
    { id: 'cloud', icon: 'cloud', stat: '68% wish they had more Cloud Deployment exposure', linkedTo: 'Cloud Computing gap', gapId: 'cloud-computing' },
    { id: 'powerbi', icon: 'chart', stat: '54% cite Power BI as a skill gap discovered on the job', linkedTo: 'Data Visualization gap', gapId: 'data-viz' },
    { id: 'mlops', icon: 'brain', stat: '41% report steep MLOps learning curve in first role', linkedTo: 'MLOps gap', gapId: 'mlops' },
  ],
  footnote: 'This page directly feeds the Curriculum-Market Alignment evidence chain — alumni feedback is one of 4 evidence sources for every gap.',
}
