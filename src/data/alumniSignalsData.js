// Mock data for the University Alumni Signal Intelligence page
// (src/pages/university/AlumniSignalIntelligence.jsx). No backend — static demo content.

export const summaryBanner = {
  text:
    'The 2023 curriculum update adding cloud fundamentals correlates with a 14% faster time-to-first-role for that cohort. GenAI skills have emerged as a new critical gap — recent graduates report a steep learning curve in LLM deployment.',
}

export const kpis = [
  { id: 'avg-salary', icon: 'dollar', tone: 'green', label: 'Avg starting salary', value: 'RM 5,100', note: '▲ 8% vs 2021 cohort', noteTone: 'green' },
  { id: 'time-to-role', icon: 'clock', tone: 'blue', label: 'Time to first role', value: '2.3 months', note: '▼ 14% vs pre-2023 cohorts', noteTone: 'green' },
  { id: 'employer-satisfaction', icon: 'star', tone: 'purple', label: 'Employer satisfaction', value: '4.2/5', note: 'Based on 6-month reviews', noteTone: 'muted' },
  { id: 'tracked-alumni', icon: 'people', tone: 'blue', label: 'Tracked alumni', value: '412', note: '78% response rate', noteTone: 'muted' },
]

export const salaryTrend = {
  cohort: 'BSc Data Science',
  years: ['2021', '2022', '2023', '2024', '2025'],
  values: [4200, 4450, 4700, 4900, 5100],
  axisMin: 3500,
  axisMax: 6000,
  axisStep: 500,
  annotations: [
    { year: '2023', label: 'Cloud fundamentals added to curriculum' },
    { year: '2024', label: 'AI/ML elective expanded' },
  ],
  footnote: 'Curriculum changes are annotated on the timeline — showing correlation between updates and salary growth.',
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
    { id: 'cloud', icon: 'cloud', stat: '68% wish they had more Cloud Deployment exposure', linkedTo: 'Cloud Computing gap', gapId: 'cloud-computing' },
    { id: 'powerbi', icon: 'chart', stat: '54% cite Power BI as a skill gap discovered on the job', linkedTo: 'Data Visualization gap', gapId: 'data-viz' },
    { id: 'mlops', icon: 'brain', stat: '41% report steep MLOps learning curve in first role', linkedTo: 'MLOps gap', gapId: 'mlops' },
  ],
  footnote: 'This page directly feeds the Curriculum-Market Alignment evidence chain — alumni feedback is one of 4 evidence sources for every gap.',
}
