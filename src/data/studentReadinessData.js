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
  { id: 'interventions', icon: 'people', tone: 'blue', label: 'Interventions in progress', value: '15', note: '+3 urgent cases added 19 Jul', valueTone: 'blue' },
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
    'SQL-Year 3': 'SQL · Year 3: 89% meet program target — strengthened by the Year 2 SQL bootcamp intervention. Related to: Data Analyst, Data Engineer roles.',
    'Statistics-Year 1': 'Statistics · Year 1: 93% meet program target — no intervention needed. Related to: Data Scientist, Data Analyst roles.',
  },
  defaultDetail: "DSA · Year 2: 67% of students below program target. Related to: Backend Engineer, Data Engineer roles.",
}

export const hiddenRisk = {
  count: 34,
  subtitle: 'Students with strong academic scores but weak career-readiness signals',
  signals: [
    {
      id: 1,
      label: 'Career Memory completeness',
      pct: 38,
      tone: 'orange',
      note: 'Avg across at-risk group',
      calc: 'Share of Career Memory profile fields completed (projects, experiences, reflections) — measured as filled entries ÷ total recommended entries per student, averaged across the at-risk cohort.',
    },
    {
      id: 2,
      label: 'Self-Discovery completed',
      pct: 22,
      tone: 'red',
      note: "Most haven't started",
      calc: 'Share of at-risk students who have completed the Self-Discovery assessment in full. Partial completions are not counted.',
    },
    {
      id: 3,
      label: 'Internship/project experience logged',
      pct: 41,
      tone: 'orange',
      note: null,
      calc: 'Share of at-risk students with at least one verified internship or substantive project logged in Career Memory, weighted by recency.',
    },
    {
      id: 4,
      label: 'Opportunities engagement',
      pct: 19,
      tone: 'red',
      note: 'Rarely browsing or applying',
      calc: 'Platform engagement score based on opportunity views, saves, and applications over the last 90 days, normalized against cohort median engagement.',
    },
  ],
  students: [
    { id: 'student-a', label: 'Student A · Y3 · GPA 3.7', academic: 92, employability: 34 },
    { id: 'student-b', label: 'Student B · Y3 · GPA 3.5', academic: 88, employability: 29 },
    { id: 'student-c', label: 'Student C · Y2 · GPA 3.8', academic: 95, employability: 41 },
    { id: 'student-d', label: 'Student D · Y3 · GPA 3.6', academic: 90, employability: 22 },
    { id: 'student-e', label: 'Student E · Y2 · GPA 3.9', academic: 97, employability: 37 },
    { id: 'student-f', label: 'Student F · Y3 · GPA 3.4', academic: 85, employability: 18 },
    { id: 'student-g', label: 'Student G · Y2 · GPA 3.7', academic: 91, employability: 44 },
    { id: 'student-h', label: 'Student H · Y3 · GPA 3.8', academic: 94, employability: 31 },
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
      deadline: 'Jul 25',
      status: 'Overdue',
      statusTone: 'red',
    },
    {
      id: 'row-6',
      student: 'Chris Lee · Y2 BSc CS (ID: 2024-0341)',
      riskType: 'Academic risk (GPA drop 3.2 → 2.6)',
      riskTone: 'red',
      recommendation: 'Urgent 1-on-1 with academic advisor + weekly tutor check-in',
      owner: 'Dr. Evelyn Chen',
      deadline: 'Jul 23',
      status: 'Scheduled',
      statusTone: 'purple',
    },
    {
      id: 'row-7',
      student: 'Priya Nair · Y2 BSc CS (ID: 2024-0289)',
      riskType: 'Attendance (68%) + mental health referral',
      riskTone: 'red',
      recommendation: 'Counselling referral (priority) + flexible assessment extension',
      owner: 'Student Welfare Office',
      deadline: 'Jul 21',
      status: 'In progress',
      statusTone: 'blue',
    },
    {
      id: 'row-8',
      student: 'Ahmed Al-Rashid · Y2 BSc CS (ID: 2024-0412)',
      riskType: 'Financial stress (international student)',
      riskTone: 'orange',
      recommendation: 'Finance office referral + peer buddy assignment',
      owner: 'International Student Support',
      deadline: 'Jul 24',
      status: 'Not started',
      statusTone: 'gray',
    },
  ],
}
