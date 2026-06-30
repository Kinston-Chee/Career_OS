export const accreditationSummary = {
  banner:
    'QS World Rankings submission is due in 6 weeks. 41 of 50 required evidence points are ready, 7 are in progress, and 2 are missing data. I can generate a draft submission pack now.',
  kpis: [
    { id: 'readiness', label: 'Overall readiness', value: '82%', note: 'Across all active submissions', tone: 'green' },
    { id: 'ready', label: 'Evidence ready', value: '41', note: 'Of 50 required', tone: 'green' },
    { id: 'progress', label: 'In progress', value: '7', note: 'Need updating', tone: 'orange' },
    { id: 'missing', label: 'Missing data', value: '2', note: 'Action needed', tone: 'red' },
  ],
}

export const requirementGroups = [
  {
    id: 'graduate-employability',
    index: 1,
    title: 'Graduate Employability',
    progress: '12/15 ready',
    items: [
      { id: 'employment-rate', name: 'Employment rate within 6 months', status: 'ready' },
      { id: 'starting-salary', name: 'Average starting salary by program', status: 'ready' },
      { id: 'employer-satisfaction', name: 'Employer satisfaction scores', status: 'ready' },
      { id: 'graduate-destination', name: 'Graduate destination breakdown', status: 'in-progress' },
      { id: 'career-progression', name: 'Alumni 5-year career progression', status: 'missing' },
    ],
  },
  {
    id: 'industry-alignment',
    index: 2,
    title: 'Industry Alignment',
    progress: '14/18 ready',
    items: [
      { id: 'partner-coverage', name: 'Industry partner coverage', status: 'ready' },
      { id: 'market-demand', name: 'Market demand evidence', status: 'ready' },
      { id: 'advisory-feedback', name: 'Advisory board feedback loop', status: 'in-progress' },
    ],
  },
  {
    id: 'student-support',
    index: 3,
    title: 'Student Support Services',
    progress: '15/17 ready',
    items: [
      { id: 'intervention-records', name: 'Intervention records and outcomes', status: 'ready' },
      { id: 'career-service-usage', name: 'Career service usage trends', status: 'ready' },
      { id: 'support-feedback', name: 'Student support satisfaction', status: 'in-progress' },
    ],
  },
]

export const evidenceByRequirement = {
  'graduate-destination': {
    status: 'in-progress',
    requiredBy: 'QS World Rankings, MQA Self-Review',
    completeness: 67,
    readySources: 2,
    totalSources: 3,
    sources: [
      {
        id: 'alumni-pathway',
        label: 'From: Alumni Signal Intelligence',
        title: 'Graduate Role Pathway data - 412 tracked alumni, 78% response rate',
        updated: 'Last updated: 2 days ago',
        status: 'ready',
        action: 'View source',
        icon: 'trend',
      },
      {
        id: 'partnerships',
        label: 'From: Collaboration Marketplace',
        title: 'Partnership hiring conversion data - 12 active partnerships',
        updated: 'Last updated: 5 days ago',
        status: 'ready',
        action: 'View source',
        icon: 'handshake',
      },
      {
        id: 'international-placement',
        label: 'Missing: International placement data',
        title: '3 of 5 years of international destination data not yet collected',
        updated: 'Last updated: N/A',
        status: 'missing',
        action: 'Request data',
        icon: 'warning',
      },
    ],
  },
}

export const timelineSubmissions = [
  {
    id: 'qs',
    title: 'QS World Rankings 2025',
    due: 'Due: 6 weeks',
    ready: '41/50 evidence points ready',
    progress: 82,
    action: 'Generate draft',
    tone: 'urgent',
  },
  {
    id: 'mqa',
    title: 'MQA Self-Review 2025',
    due: 'Due: 14 weeks',
    ready: '33/50 evidence points ready',
    progress: 65,
    action: 'Continue preparing',
    tone: 'blue',
  },
  {
    id: 'aacsb',
    title: 'AACSB Accreditation Cycle 2026',
    due: 'Due: 11 months',
    ready: '14/50 evidence points ready',
    progress: 28,
    action: 'Start early',
    tone: 'gray',
  },
]
