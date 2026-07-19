// Mock data for the University Workspace Overview page (src/pages/university/Overview.jsx).
// No backend — every value here is static demo content.

export const universityUser = {
  name: 'Dr. Evelyn Chen',
  title: 'Dean, Computing & AI',
  institution: 'Heriot-Watt University Malaysia',
  initials: 'EC',
  greeting: 'Good morning, Dr. Chen',
  briefingDate: 'Saturday, 19 July 2026',
}

export const universityNavTabs = [
  { label: 'Overview', to: '/university/overview', icon: 'home' },
  { label: 'Student Readiness', to: '/university/student-readiness', icon: 'people' },
  { label: 'Curriculum-Market Alignment', to: '/university/curriculum-alignment', icon: 'target' },
  { label: 'Alumni Signal Intelligence', to: '/university/alumni-signals', icon: 'trend' },
  { label: 'Collaboration Marketplace', to: '/university/collaboration', icon: 'handshake' },
  { label: 'Accreditation Hub', to: '/university/accreditation', icon: 'shield' },
]

export const kpis = [
  { id: 'programs-at-risk', icon: 'warning', tone: 'red', label: 'Programs at risk', value: '2', note: 'Losing market relevance', noteTone: 'muted' },
  { id: 'students-at-risk', icon: 'people', tone: 'orange', label: 'Students at employability risk', value: '34', note: 'Need intervention', noteTone: 'muted' },
  { id: 'partnerships', icon: 'handshake', tone: 'blue', label: 'Active partnerships', value: '13', note: '4 high-value, TalentBank onboarded', noteTone: 'muted' },
  { id: 'employability', icon: 'graduation', tone: 'green', label: 'Graduate employability rate', value: '78%', note: '▲ 5% vs last year', noteTone: 'green' },
  { id: 'accreditation', icon: 'shield', tone: 'purple', label: 'Accreditation readiness', value: '82%', note: 'Evidence packs ready', noteTone: 'muted' },
]

export const leadershipInbox = [
  {
    id: 'cloud-gap',
    icon: 'warning',
    tone: 'red',
    text: 'Cloud Computing skill gap widened 12% this quarter — 340 students affected, syllabus coverage is 23% vs market demand of 68%',
    link: 'View evidence',
    pill: 'Critical',
    pillTone: 'red',
    to: '/university/curriculum-alignment?gap=cloud-computing',
    source: 'Source: Curriculum-Market Alignment · syllabus mapping + 47 job postings, last 90 days',
  },
  {
    id: 'dsa-readiness',
    icon: 'people',
    tone: 'orange',
    text: '34 Year 2 Data Science students show declining DSA readiness — early intervention window closing',
    link: 'View at-risk cohort',
    pill: 'Time sensitive',
    pillTone: 'orange',
    to: '/university/student-readiness',
    source: 'Source: Student Readiness · academic scores + Career Memory completeness, updated today',
  },
  {
    id: 'grab-partnership',
    icon: 'handshake',
    tone: 'green',
    text: 'Your Grab partnership generated 8 internship placements and 2 hires last quarter — highest ROI partner',
    link: 'Review partnership',
    pill: 'Opportunity',
    pillTone: 'green',
    to: '/university/collaboration',
    source: 'Source: Collaboration Marketplace · partnership hiring conversion records',
  },
  {
    id: 'mqa-deadline',
    icon: 'shield',
    tone: 'purple',
    text: 'MQA self-review in 5 months — CS5001 GenAI module amendment ready to file after Dean approval',
    link: 'Go to Accreditation Hub',
    pill: 'Deadline',
    pillTone: 'purple',
    to: '/university/accreditation',
    source: 'Source: Accreditation Hub · MQA evidence pack + programme amendment tracker',
  },
]

export const readinessHeatmap = {
  rows: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Overall'],
  columns: ['Low', 'Moderate', 'High', 'Severe'],
  // 1 = green (low risk) .. 4 = red (severe risk); each row highlights which risk band it falls in.
  values: [2, 3, 3, 2, 3],
}

export const curriculumQuadrant = {
  axisY: 'Market Demand',
  axisX: 'Curriculum Coverage',
  points: [
    { x: 18, y: 82, zone: 'red' },
    { x: 28, y: 70, zone: 'red' },
    { x: 78, y: 85, zone: 'green' },
    { x: 85, y: 75, zone: 'green' },
    { x: 20, y: 22, zone: 'gray' },
    { x: 30, y: 15, zone: 'gray' },
    { x: 75, y: 20, zone: 'blue' },
    { x: 82, y: 30, zone: 'blue' },
  ],
}

export const alumniSalaryTrend = {
  value: 'RM 5,100',
  label: 'avg starting salary',
  points: [3400, 3900, 4300, 4700, 5100],
  years: ['2021', '2022', '2023', '2024', '2025'],
}

export const partnerships = {
  value: '12',
  label: 'active partnerships',
  logos: [
    { id: 'grab', label: 'Grab', tone: 'bg-green-600' },
    { id: 'microsoft', label: 'MS', tone: 'bg-blue-600' },
    { id: 'aws', label: 'AWS', tone: 'bg-orange-500' },
    { id: 'ericsson', label: 'ER', tone: 'bg-indigo-600' },
  ],
  moreCount: 7,
}

export const accreditationProgress = {
  value: 82,
  label: 'evidence ready',
  legend: [
    { id: 'ready', label: 'Ready', value: 41, tone: 'bg-purple-600' },
    { id: 'in-progress', label: 'In progress', value: 7, tone: 'bg-purple-300' },
    { id: 'not-started', label: 'Not started', value: 2, tone: 'bg-gray-300' },
  ],
}
