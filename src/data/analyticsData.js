// Mock data for the Employer Analytics page (src/pages/employer/Analytics.jsx).
// No backend — every value here is static demo content.

export const quarterSummary = {
  period: 'Q2 2025 · Apr–Jun',
  metrics: [
    { id: 'total-hires', icon: 'people', label: 'Total hires', value: '6', note: 'From 342 pipeline candidates', noteTone: 'muted' },
    { id: 'time-to-fill', icon: 'clock', label: 'Time to fill (avg)', value: '28 days', note: '▼ 12% vs last quarter', noteTone: 'green' },
    { id: 'quality-of-hire', icon: 'shield', label: 'Quality of hire (90-day)', value: '87%', note: '▲ 5%', noteTone: 'green' },
    { id: 'offer-acceptance', icon: 'check', label: 'Offer acceptance', value: '92%', note: '▲ 6%', noteTone: 'green' },
    { id: 'cost-per-hire', icon: 'dollar', label: 'Cost per hire', value: 'RM 3,200', note: '▼ 18%', noteTone: 'green' },
  ],
}

export const whatsWorking = {
  body:
    "Your AI & Data Challenge produced candidates with 34% higher 90-day retention than standard job postings. Taylor's University continues to be your strongest source — not just in volume, but in quality-of-hire. Candidates who completed Self-Discovery show 23% better team-fit ratings in manager feedback.",
  highlights: [
    {
      id: 'best-channel',
      icon: 'trophy',
      tone: 'green',
      label: 'Best performing channel',
      title: 'AI & Data Challenge',
      detail: '34% higher 90-day retention vs job postings',
    },
    {
      id: 'best-university',
      icon: 'graduation',
      tone: 'blue',
      label: 'Best performing university',
      title: "Taylor's University",
      detail: '22% conversion to hire — highest of all sources',
    },
    {
      id: 'best-signal',
      icon: 'compass',
      tone: 'purple',
      label: 'Best predictive signal',
      title: 'Self-Discovery completion',
      detail: '+23% team-fit rating from hiring managers',
    },
  ],
}

export const sourceROI = [
  { id: 'ai-challenge', label: 'AI & Data Challenge', cost: 'RM 180/qualified', retention: '34% retention', widthPct: 25, retentionTone: 'green', qualifiedCount: 23, totalSpend: 'RM 4,140' },
  { id: 'backend-workshop', label: 'Backend Workshop', cost: 'RM 240/qualified', retention: '28% retention', widthPct: 40, retentionTone: 'gray', qualifiedCount: 12, totalSpend: 'RM 2,880' },
  { id: 'job-posting', label: 'Job Posting (standard)', cost: 'RM 410/qualified', retention: '19% retention', widthPct: 75, retentionTone: 'gray', qualifiedCount: 31, totalSpend: 'RM 12,710' },
  { id: 'career-fair', label: 'Career Fair', cost: 'RM 520/qualified', retention: '15% retention', widthPct: 90, retentionTone: 'gray', qualifiedCount: 8, totalSpend: 'RM 4,160' },
  { id: 'referral', label: 'Referral Program', cost: 'RM 95/qualified', retention: '41% retention', widthPct: 15, retentionTone: 'green', qualifiedCount: 6, totalSpend: 'RM 570' },
]

// Second dataset so the "This Quarter" / "Last Quarter" dropdown actually
// changes displayed numbers — makes the AI briefing feel live, per research.
export const lastQuarterSummary = {
  period: 'Q1 2025 · Jan–Mar',
  metrics: [
    { id: 'total-hires', icon: 'people', label: 'Total hires', value: '4', note: 'From 298 pipeline candidates', noteTone: 'muted' },
    { id: 'time-to-fill', icon: 'clock', label: 'Time to fill (avg)', value: '32 days', note: '▲ 4% vs prior quarter', noteTone: 'muted' },
    { id: 'quality-of-hire', icon: 'shield', label: 'Quality of hire (90-day)', value: '82%', note: '▲ 2%', noteTone: 'green' },
    { id: 'offer-acceptance', icon: 'check', label: 'Offer acceptance', value: '86%', note: '▼ 3%', noteTone: 'muted' },
    { id: 'cost-per-hire', icon: 'dollar', label: 'Cost per hire', value: 'RM 3,900', note: '▲ 6%', noteTone: 'muted' },
  ],
}

export const lastQuarterSourceROI = [
  { id: 'ai-challenge', label: 'AI & Data Challenge', cost: 'RM 210/qualified', retention: '31% retention', widthPct: 32, retentionTone: 'green', qualifiedCount: 17, totalSpend: 'RM 3,570' },
  { id: 'backend-workshop', label: 'Backend Workshop', cost: 'RM 265/qualified', retention: '25% retention', widthPct: 45, retentionTone: 'gray', qualifiedCount: 9, totalSpend: 'RM 2,385' },
  { id: 'job-posting', label: 'Job Posting (standard)', cost: 'RM 395/qualified', retention: '20% retention', widthPct: 72, retentionTone: 'gray', qualifiedCount: 27, totalSpend: 'RM 10,665' },
  { id: 'career-fair', label: 'Career Fair', cost: 'RM 540/qualified', retention: '14% retention', widthPct: 93, retentionTone: 'gray', qualifiedCount: 6, totalSpend: 'RM 3,240' },
  { id: 'referral', label: 'Referral Program', cost: 'RM 110/qualified', retention: '38% retention', widthPct: 18, retentionTone: 'green', qualifiedCount: 4, totalSpend: 'RM 440' },
]

export const signalCorrelation = [
  { id: 'self-discovery', label: 'Self-Discovery completed', value: '+23% team-fit', widthPct: 90, tone: 'green' },
  { id: 'challenge', label: 'Challenge participation', value: '+19% ramp speed', widthPct: 85, tone: 'green' },
  { id: 'leadership', label: 'Leadership signal in Career Memory', value: '+14% retention', widthPct: 55, tone: 'blue' },
  { id: 'gpa', label: 'University GPA', value: '+3% (low correlation)', widthPct: 15, tone: 'gray' },
  { id: 'interview', label: 'Interview performance alone', value: '+5% (low correlation)', widthPct: 20, tone: 'gray' },
]

export const retentionRiskForecast = [
  {
    id: 'ivan-lim',
    name: 'Ivan Lim',
    initials: 'IL',
    roleFit: '96% role fit',
    risk: 'LOW',
    riskTone: 'green',
    conditions: 'Conditions to retain: clear growth path, autonomy in projects',
  },
  {
    id: 'nur-alya',
    name: 'Nur Alya Binti',
    initials: 'NA',
    roleFit: '92% role fit',
    risk: 'MEDIUM',
    riskTone: 'orange',
    conditions: 'Conditions to retain: flexible work arrangement, mentorship',
  },
  {
    id: 'marcus-tan',
    name: 'Marcus Tan',
    initials: 'MT',
    roleFit: '89% role fit',
    risk: 'LOW',
    riskTone: 'green',
    conditions: 'Conditions to retain: structured onboarding, defined responsibilities',
  },
]

export const quarterOptions = ['This Quarter', 'Last Quarter', 'This Year']
