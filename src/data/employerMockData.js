// Mock data for the redesigned Employer Workspace Home page (src/pages/EmployerHome.jsx).
// No backend — every value here is static demo content.

export const employerUser = {
  name: 'Edwin Khoo',
  company: 'Acme Corporation',
  initials: 'EK',
  greeting: 'Good morning, Edwin',
  briefingDate: 'Thursday, 15 May 2025',
}

export const briefingBoxes = [
  {
    id: 'roles-at-risk',
    icon: 'shield',
    tone: 'red',
    label: 'Roles at risk',
    value: '2',
    detail: 'Software Engineering Intern, Data Analyst Intern',
    footer: 'At risk due to pipeline drop-off',
    why: 'Both roles have seen applicant volume drop 30%+ week-over-week and no shortlisted candidate has responded to outreach in 5+ days — CareerOS flags this as a stalling pipeline before the deadline passes.',
    to: '/employer/talent-discovery',
  },
  {
    id: 'candidates-needing-action',
    icon: 'user',
    tone: 'orange',
    label: 'Top candidates needing action',
    value: '5',
    detail: 'Highly-fit candidates are waiting for your next step',
    link: 'Review candidates',
    why: '5 candidates are scoring 85%+ match with verified evidence but have been sitting in "New" or "Reviewed" status for 3+ days — the longer they wait, the more likely they accept a competing offer.',
    to: '/employer/candidates?stage=Engaged',
  },
  {
    id: 'event-performance',
    icon: 'calendar',
    tone: 'blue',
    label: 'Event performance',
    value: '4',
    detail: 'Events completed this month',
    footer: '▲ 18% vs last month',
    footerTone: 'green',
    why: 'Based on registrant-to-qualified conversion across your last 4 engagements, compared against the same window last month.',
    to: '/employer/posting',
  },
  {
    id: 'bottlenecks',
    icon: 'hourglass',
    tone: 'purple',
    label: 'Bottlenecks',
    value: '2',
    detail: 'Feedback pending, interviews awaiting scheduling',
    link: 'View bottlenecks',
    why: '2 candidates completed technical screening 4+ days ago with no hiring-manager feedback logged, and 1 interview request has not been scheduled — both slow down time-to-hire.',
    to: '/employer/candidates?stage=In%20Process',
  },
]

export const leadershipSnapshot = {
  label: 'Leadership snapshot',
  rows: [
    { label: 'Time to fill (avg)', value: '28 days', delta: '▼ 12%', deltaTone: 'green' },
    { label: 'Quality of hire (pred.)', value: '87%', delta: '▲ 5%', deltaTone: 'green' },
    { label: 'Offer acceptance', value: '92%', delta: '▲ 6%', deltaTone: 'green' },
  ],
  progressLabel: 'Hiring progress',
  progress: 70,
  link: 'See full analytics',
}

export const metricsPills = [
  {
    id: 'time-to-fill',
    icon: 'clock',
    label: 'Time to fill (avg)',
    value: '28 days',
    delta: '▼ 12% vs last 30 days',
    deltaTone: 'red',
    calc: 'Average calendar days from job posting live to offer accepted, across all roles closed in the last 30 days.',
  },
  {
    id: 'quality-of-hire',
    icon: 'star',
    label: 'Quality of hire (pred.)',
    value: '87%',
    delta: '▲ 5% vs last 30 days',
    deltaTone: 'green',
    info: true,
    calc: 'Predicted from evidence strength at hire time (verified skills, career memory signal, self-discovery completion) — validated against 90-day manager satisfaction ratings from prior hires.',
  },
  {
    id: 'offer-acceptance',
    icon: 'check',
    label: 'Offer acceptance',
    value: '92%',
    delta: '▲ 6% vs last 30 days',
    deltaTone: 'green',
    info: true,
    calc: 'Offers accepted ÷ offers extended, trailing 30 days.',
  },
  {
    id: 'shortlisted',
    icon: 'people',
    label: 'Shortlisted this week',
    value: '34',
    delta: '▲ 21% vs last week',
    deltaTone: 'green',
    info: true,
    calc: 'Candidates moved to "Shortlisted" status across all open postings, Mon–Sun this week.',
  },
  {
    id: 'event-roi',
    icon: 'chart',
    label: 'Event ROI (this month)',
    value: '4.6x',
    delta: '▲ 0.9x vs last month',
    deltaTone: 'green',
    info: true,
    calc: 'Estimated hire value generated ÷ cost per engagement (venue, staff time, incentives), based on 90-day retention of engagement-sourced hires vs standard job-posting hires.',
  },
]

export const topCandidates = [
  {
    id: 'ivan-lim',
    name: 'Ivan Lim',
    university: "Taylor's University",
    role: 'Software Engineering Intern',
    match: 96,
    matchLabel: 'High match',
    matchTone: 'green',
    tags: ['Full-stack dev', 'Hackathon winner', 'Fast learner'],
    risk: { level: 'medium', text: 'Considering other offers' },
    validatedNext: 'Strong design problem solving',
  },
  {
    id: 'nur-alya',
    name: 'Nur Alya Binti',
    university: 'APU',
    role: 'Data Analyst Intern',
    match: 92,
    matchLabel: 'High match',
    matchTone: 'green',
    tags: ['SQL & Python', 'Data storytelling', 'Analytics projects'],
    risk: { level: 'low', text: 'Low in keeping commitment' },
    validatedNext: 'Advanced SQL, dashboard',
  },
  {
    id: 'marcus-tan',
    name: 'Marcus Tan',
    university: 'Sunway University',
    role: 'Software Engineering Intern',
    match: 89,
    matchLabel: 'Strong match',
    matchTone: 'blue',
    tags: ['Backend dev', 'API design', 'Open source'],
    risk: { level: 'medium', text: 'Graded school applications' },
    validatedNext: 'Technical deep dive interview',
  },
]

export const campusFunnel = [
  { label: 'Invited', value: 12842 },
  { label: 'Viewed', value: 6314, conversion: '49.2%' },
  { label: 'Registered', value: 3812, conversion: '60.4%' },
  { label: 'Attended', value: 1942, conversion: '51.0%' },
  { label: 'Applied', value: 683, conversion: '35.2%' },
  { label: 'Shortlisted', value: 214, conversion: '31.3%' },
  { label: 'Interviewed', value: 98, conversion: '45.5%' },
  { label: 'Hired', value: 26, conversion: '26.5%' },
]

export const campusFunnelSummary = {
  conversionRate: '0.20%',
  eventsRoi: '4.6x',
}

export const opportunityRadar = {
  badge: 'AI recommendation',
  subtitle: 'Proactive engagement recommendations based on hiring demand and campus talent availability',
  body:
    "CareerOS detected a likely IT talent need in the next 3 months. Based on your hiring pattern and campus talent availability, Taylor's, APU, and Sunway are strong engagement opportunities. A strong pool of high-fit candidates is becoming available between June and August, especially in backend engineering, data, and analytics. Recommended next move: launch a targeted campus engagement now to warm candidates before the hiring cycle begins.",
  rows: [
    { icon: 'forecast', label: 'Demand forecast', value: 'IT hiring likely to rise in ~3 months' },
    { icon: 'building', label: 'Campus availability', value: "Taylor's, APU, Sunway · June–August" },
    { icon: 'people', label: 'Talent quality', value: '42 high-fit candidates with strong project evidence' },
    { icon: 'sparkle', label: 'Recommended engagement', value: 'Backend workshop or AI/Data challenge' },
  ],
}

export const actionQueue = [
  {
    id: 'action-1',
    icon: 'clock',
    tone: 'orange',
    text: '3 shortlisted interns likely to accept if contacted today',
    pill: 'High impact',
    pillTone: 'green',
    why: 'These 3 candidates were shortlisted 2+ days ago, have no competing offers on record, and respond to messages within a day on average — acting today maximizes accept probability.',
    to: '/employer/candidates?stage=Shortlisted',
  },
  {
    id: 'action-2',
    icon: 'zap',
    tone: 'yellow',
    text: '2 high-fit candidates with expiring availability windows',
    pill: 'Time sensitive',
    pillTone: 'orange',
    why: 'These candidates listed availability start dates that expire within 2 weeks — after that, their profile availability window closes for this intake.',
    to: '/employer/talent-discovery',
  },
  {
    id: 'action-3',
    icon: 'flag',
    tone: 'red',
    text: '1 requisition at risk because feedback is late',
    pill: 'At risk',
    pillTone: 'red',
    why: 'A candidate completed a technical screen 4 days ago with no hiring-manager feedback logged — SLA for feedback is 3 days.',
    to: '/employer/candidates?stage=In%20Process',
  },
  {
    id: 'action-4',
    icon: 'chart',
    tone: 'blue',
    text: 'Challenge sign-ups high but qualified conversion low',
    pill: 'Needs attention',
    pillTone: 'blue',
    why: 'AI & Data Challenge 2025 has 214 registrants but only 23 qualified (11%) — well below your 20% benchmark from past challenges, suggesting the brief may be filtering out otherwise-strong candidates.',
    to: '/employer/posting',
  },
  {
    id: 'action-5',
    icon: 'people',
    tone: 'green',
    text: '12 strong candidates rediscovered from previous events',
    pill: 'Easy win',
    pillTone: 'green',
    why: 'These candidates attended past workshops or challenges, scored well, but were never followed up with — they already know your brand, making re-engagement cheaper than new sourcing.',
    to: '/employer/campus-pipeline',
  },
]

export const employerNavTabs = [
  { label: 'Home', to: '/employer/home', icon: 'home' },
  { label: 'Talent Discovery', to: '/employer/talent-discovery', icon: 'pipeline' },
  { label: 'Candidates', to: '/employer/candidates', icon: 'people' },
  { label: 'Engagement', to: '/employer/posting', icon: 'campaign' },
  { label: 'Campus Pipeline', to: '/employer/campus-pipeline', icon: 'school' },
  { label: 'Analytics', to: '/employer/analytics', icon: 'analytics' },
]
