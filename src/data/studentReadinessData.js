// Mock data for the University Student Readiness page
// (src/pages/university/StudentReadiness.jsx). No backend — static demo content.

export const summaryBanner = {
  text:
    '34 students show strong academic performance but weak employability signals — incomplete Career Memory, no internship experience, and low platform engagement. These students are often missed by traditional academic risk tracking.',
}

export const kpis = [
  { id: 'avg-readiness', icon: 'trend', tone: 'blue', label: 'Average readiness score', value: '71%', note: 'Combined academic + employability', valueTone: 'blue' },
  { id: 'academic-risk', icon: 'graduation', tone: 'orange', label: 'Academic risk only', value: '18', note: 'Traditional GPA-based flag', valueTone: 'orange' },
  { id: 'hidden-risk', icon: 'warning', tone: 'red', label: 'Hidden employability risk', value: '34', note: 'Good grades, weak career signals', valueTone: 'red', highlight: true },
  { id: 'interventions', icon: 'people', tone: 'blue', label: 'Interventions in progress', value: '12', note: 'Active this semester', valueTone: 'blue' },
]

export const heatmap = {
  cohort: 'BSc Data Science',
  rows: ['Python', 'DSA', 'SQL', 'Cloud Platforms', 'Statistics'],
  columns: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Overall'],
  // levels: 1 = strong(green) 2 = moderate(yellow) 3 = weak(orange) 4 = critical(red)
  levels: {
    Python: [1, 1, 1, 1, 1],
    DSA: [2, 4, 2, 2, 3],
    SQL: [2, 2, 1, 1, 1],
    'Cloud Platforms': [2, 4, 2, 1, 2],
    Statistics: [1, 1, 1, 1, 1],
  },
  defaultColumn: 'Year 2',
  cellDetails: {
    'Python-Year 2': 'Python · Year 2: Strong across cohort — 91% meet program target. Related to: Software Engineer, Data Analyst roles.',
    'DSA-Year 2': "DSA · Year 2: 67% of students below program target. Related to: Backend Engineer, Data Engineer roles.",
    'Cloud Platforms-Year 3': 'Cloud Platforms · Year 3: 54% of students below program target. Related to: Cloud Engineer, DevOps roles.',
  },
  defaultDetail: "DSA · Year 2: 67% of students below program target. Related to: Backend Engineer, Data Engineer roles.",
}

export const hiddenRisk = {
  count: 34,
  subtitle: 'Students with strong academic scores but weak career-readiness signals',
  signals: [
    { id: 1, label: 'Career Memory completeness', pct: 38, tone: 'orange', note: 'Avg across at-risk group' },
    { id: 2, label: 'Self-Discovery completed', pct: 22, tone: 'red', note: "Most haven't started" },
    { id: 3, label: 'Internship/project experience logged', pct: 41, tone: 'orange', note: null },
    { id: 4, label: 'Opportunities engagement', pct: 19, tone: 'red', note: 'Rarely browsing or applying' },
  ],
  students: [
    { id: 'student-a', label: 'Student A · Y3 · GPA 3.7' },
    { id: 'student-b', label: 'Student B · Y3 · GPA 3.5' },
    { id: 'student-c', label: 'Student C · Y2 · GPA 3.8' },
  ],
}

export const interventionQueue = {
  activeCount: 12,
  pendingCount: 8,
  rows: [
    {
      id: 'row-1',
      student: 'Student A · Y3 Data Science',
      riskType: 'Employability risk',
      riskTone: 'red',
      recommendation: '1:1 career coaching session + Career Memory setup',
      owner: 'Career Services Team',
      deadline: 'May 28',
      status: 'In progress',
      statusTone: 'blue',
    },
    {
      id: 'row-2',
      student: 'Student B · Y2 Data Science',
      riskType: 'Academic risk (DSA)',
      riskTone: 'orange',
      recommendation: 'DSA bootcamp enrollment',
      owner: 'Dr. Tan Wei Ming',
      deadline: 'Jun 5',
      status: 'Not started',
      statusTone: 'gray',
    },
    {
      id: 'row-3',
      student: 'Student C · Y3 Data Science',
      riskType: 'Employability risk',
      riskTone: 'red',
      recommendation: 'Self-Discovery assessment + internship referral',
      owner: 'Career Services Team',
      deadline: 'May 30',
      status: 'In progress',
      statusTone: 'blue',
    },
    {
      id: 'row-4',
      student: 'Cohort: 12 students · Y2',
      riskType: 'Academic risk (Cloud)',
      riskTone: 'orange',
      recommendation: 'Cloud fundamentals workshop (cohort-wide)',
      owner: 'Dr. Evelyn Chen',
      deadline: 'Jun 15',
      status: 'Scheduled',
      statusTone: 'purple',
    },
    {
      id: 'row-5',
      student: 'Student D · Y4 Data Science',
      riskType: 'Employability risk',
      riskTone: 'red',
      recommendation: 'Resume + portfolio review',
      owner: 'Career Services Team',
      deadline: 'May 25',
      status: 'Overdue',
      statusTone: 'red',
    },
  ],
}
