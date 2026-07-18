export const DEFAULT_FRAMEWORK = 'MQA - BSc Computer Science'

export const STATUS_LABELS = {
  ready: 'Ready',
  'in-progress': 'In progress',
  missing: 'Missing',
  requested: 'Requested',
  override: 'Ready (override)',
}

export const missingItemContext = {
  'advisory-panel': {
    responsible: 'Dr. Ahmad Razif - Programme Chair',
    responsibleShort: 'Dr. Ahmad',
    lastRecord: 'March 2024 (18 months ago)',
    whyNeeded: 'MQA programme accreditation needs current advisory-panel evidence to show continuing industry relevance.',
    emailGreeting: 'Dr. Ahmad',
    emailBody: 'I am preparing the MQA Full Programme Accreditation documentation for BSc Computer Science. I require the Industry Advisory Panel meeting minutes from the past 2 academic sessions (2023/24 and 2024/25) to complete the programme design evidence set.',
  },
  'learning-outcomes': {
    responsible: 'Assoc. Prof. Dr. Lim Wei Keat - Curriculum Coordinator',
    responsibleShort: 'Assoc. Prof. Lim',
    lastRecord: 'June 2023 (2 years ago)',
    whyNeeded: 'The programme learning outcomes map must be current for this review cycle before the report section can be treated as verified.',
    emailGreeting: 'Assoc. Prof. Dr. Lim',
    emailBody: 'I am preparing the MQA accreditation documentation for BSc Computer Science and require the completed Learning Outcomes Mapping matrix covering all courses for the 2024/25 academic year.',
  },
  'external-examiner': {
    responsible: 'Ms. Kavitha Subramaniam - Faculty Quality Manager',
    responsibleShort: 'Ms. Kavitha',
    lastRecord: 'September 2023 (21 months ago)',
    whyNeeded: 'External examiner reports support independent quality assurance for assessment standards.',
    emailGreeting: 'Ms. Kavitha',
    emailBody: 'I am compiling the MQA accreditation evidence for BSc Computer Science and require the latest external examiner reports and programme response documentation.',
  },
  'mqa-mentorship': {
    responsible: 'Dr. Nurul Ain Binti Hassan - Student Affairs Coordinator',
    responsibleShort: 'Dr. Nurul Ain',
    lastRecord: 'Not on record',
    whyNeeded: 'Academic mentorship evidence supports the student support and experience section.',
    emailGreeting: 'Dr. Nurul Ain',
    emailBody: 'I am preparing the Student Support & Experience section of the MQA accreditation submission and require documentation of the academic mentorship programme, including participant numbers, session records, and outcome summaries.',
  },
  'student-ratio': {
    responsible: 'Mr. Faizal Azhari - HR & Academic Affairs',
    responsibleShort: 'Mr. Faizal',
    lastRecord: 'Annual HR report 2022/23',
    whyNeeded: 'Current student-to-staff ratio evidence must be confirmed before inclusion in the programme review pack.',
    emailGreeting: 'Mr. Faizal',
    emailBody: 'I require the current student-to-staff ratio figures for the Computing & AI faculty, broken down by programme and level of study, for inclusion in the MQA accreditation submission.',
  },
  'ds-outcomes': {
    responsible: 'Dr. Priya Chandrasekaran - BSc Data Science Coordinator',
    responsibleShort: 'Dr. Priya',
    lastRecord: 'Not on record',
    whyNeeded: 'The Data Science programme review needs a current learning outcomes map.',
    emailGreeting: 'Dr. Priya',
    emailBody: 'I am preparing the MQA Programme Monitoring documentation for BSc Data Science and require the completed Learning Outcomes Mapping document for all courses in the current curriculum.',
  },
  'ds-advisory': {
    responsible: 'Dr. Ahmad Razif - Programme Chair',
    responsibleShort: 'Dr. Ahmad',
    lastRecord: 'April 2024 (15 months ago)',
    whyNeeded: 'Advisory-panel evidence supports market-aligned curriculum oversight.',
    emailGreeting: 'Dr. Ahmad',
    emailBody: 'I am compiling the MQA Programme Monitoring evidence for BSc Data Science and require the Industry Advisory Panel meeting minutes for the latest academic sessions.',
  },
  'ds-examiner': {
    responsible: 'Ms. Kavitha Subramaniam - Faculty Quality Manager',
    responsibleShort: 'Ms. Kavitha',
    lastRecord: 'Not on record',
    whyNeeded: 'External examiner evidence is needed before the assessment-quality section can be marked ready.',
    emailGreeting: 'Ms. Kavitha',
    emailBody: 'I am preparing the MQA Programme Monitoring submission for BSc Data Science and require the latest external examiner reports and programme response documentation.',
  },
  'ds-employability': {
    responsible: 'Ms. Tan Siew Lin - Graduate Outcomes Office',
    responsibleShort: 'Ms. Tan',
    lastRecord: 'Partial - 2023 cohort only',
    whyNeeded: 'Graduate employability outcomes must cover the reporting period before this item can be verified.',
    emailGreeting: 'Ms. Tan',
    emailBody: 'I require the complete graduate employability outcomes data for all BSc Data Science cohorts from 2022 to 2025, including employment rate within 6 months, sector breakdown, and employer satisfaction survey results.',
  },
  'career-progression': {
    responsible: 'Ms. Tan Siew Lin - Graduate Outcomes Office',
    responsibleShort: 'Ms. Tan',
    lastRecord: 'Not collected (< 5 years since first cohort)',
    whyNeeded: 'Longitudinal career progression can only be reused where the framework accepts the available reporting period.',
    emailGreeting: 'Ms. Tan',
    emailBody: 'I am reviewing the evidence requirements and need to understand what alumni longitudinal progression data is available for the earliest Computing cohorts.',
  },
  'curriculum-evidence-packs': {
    responsible: 'Curriculum-Market Alignment module',
    responsibleShort: 'Curriculum module',
    lastRecord: 'No evidence packs added yet',
    whyNeeded: 'Curriculum-market gap evidence must be assembled from the Curriculum-Market Alignment module before this requirement can be reviewed.',
    emailGreeting: null,
    emailBody: null,
  },
  'international-placement': {
    responsible: 'International Office',
    responsibleShort: 'International Office',
    lastRecord: 'Partial - 3 of 5 years collected',
    whyNeeded: 'International destination coverage is needed before the graduate destination evidence can be treated as complete.',
    emailGreeting: 'International Office team',
    emailBody: 'I am preparing the graduate destination evidence summary and require the missing international placement data for the outstanding reporting years.',
  },
}

const qsGroups = [
  {
    id: 'graduate-employability',
    index: 1,
    title: 'Graduate Employability',
    items: [
      { id: 'employment-rate', name: 'Employment rate within 6 months', status: 'ready', frameworks: ['QS'] },
      { id: 'starting-salary', name: 'Average starting salary by program', status: 'ready', frameworks: ['QS'] },
      { id: 'employer-satisfaction', name: 'Employer satisfaction scores', status: 'ready', frameworks: ['QS'] },
      { id: 'graduate-destination', name: 'Graduate destination breakdown', status: 'in-progress', frameworks: ['QS'] },
      { id: 'career-progression', name: 'Alumni 5-year career progression', status: 'missing', frameworks: ['QS'] },
    ],
  },
  {
    id: 'industry-alignment',
    index: 2,
    title: 'Industry Alignment',
    items: [
      { id: 'partner-coverage', name: 'Industry partner coverage', status: 'ready', frameworks: ['QS'] },
      { id: 'market-demand', name: 'Market demand evidence', status: 'ready', frameworks: ['QS'] },
      { id: 'advisory-feedback', name: 'Advisory board feedback loop', status: 'in-progress', frameworks: ['QS'] },
      { id: 'curriculum-evidence-packs', name: 'Curriculum-market gap evidence packs', status: 'missing', frameworks: ['QS'] },
    ],
  },
  {
    id: 'student-support',
    index: 3,
    title: 'Student Support Services',
    items: [
      { id: 'intervention-records', name: 'Intervention records and outcomes', status: 'ready', frameworks: ['QS'] },
      { id: 'career-service-usage', name: 'Career service usage trends', status: 'ready', frameworks: ['QS'] },
      { id: 'support-feedback', name: 'Student support satisfaction', status: 'in-progress', frameworks: ['QS'] },
    ],
  },
]

export const frameworkProfiles = {
  'MQA - BSc Computer Science': {
    id: 'mqa-cs',
    label: 'MQA - BSc Computer Science',
    shortLabel: 'MQA BSc Computer Science',
    category: 'MQA programme accreditation',
    scope: 'Programme-level review',
    checklistLabel: 'Priority requirements shown',
    due: 'Due: 5 months',
    preparationStatus: 'Recommended start: 2 weeks ago - you are behind schedule',
    readinessTone: 'orange',
    tone: 'orange',
    action: 'Continue preparing',
    draftAction: 'Generate evidence summary',
    supportsReportSectionDraft: true,
    reportSectionGroupIds: ['programme-design'],
    groups: [
      {
        id: 'programme-design',
        index: 1,
        title: 'Programme Design & Delivery',
        items: [
          { id: 'prog-objectives', name: 'Programme objectives', status: 'ready', frameworks: ['MQA'] },
          { id: 'curriculum-structure', name: 'Curriculum structure', status: 'ready', frameworks: ['MQA'] },
          { id: 'course-files', name: 'Course files', status: 'ready', frameworks: ['MQA'] },
          { id: 'assessment-samples', name: 'Assessment samples', status: 'ready', frameworks: ['MQA'] },
          { id: 'learning-outcomes', name: 'Learning outcomes mapping', status: 'in-progress', frameworks: ['MQA'] },
          { id: 'advisory-panel', name: 'Industry advisory panel minutes', status: 'missing', frameworks: ['MQA'] },
          { id: 'external-examiner', name: 'External examiner reports', status: 'in-progress', frameworks: ['MQA'] },
          { id: 'grad-attainment', name: 'Graduate attainment data', status: 'ready', frameworks: ['MQA'] },
        ],
      },
      {
        id: 'student-support-mqa',
        index: 2,
        title: 'Student Support & Experience',
        items: [
          { id: 'mqa-intervention', name: 'Intervention records and outcomes', status: 'ready', frameworks: ['MQA'] },
          { id: 'mqa-career-services', name: 'Career service usage trends', status: 'ready', frameworks: ['MQA'] },
          { id: 'mqa-counselling', name: 'Counselling and wellbeing referrals', status: 'ready', frameworks: ['MQA'] },
          { id: 'mqa-feedback', name: 'Student satisfaction feedback', status: 'in-progress', frameworks: ['MQA'] },
          { id: 'mqa-activities', name: 'Co-curricular activity records', status: 'ready', frameworks: ['MQA'] },
          { id: 'mqa-disability', name: 'Special needs accommodation records', status: 'ready', frameworks: ['MQA'] },
          { id: 'mqa-grievance', name: 'Grievance and appeal records', status: 'ready', frameworks: ['MQA'] },
          { id: 'mqa-mentorship', name: 'Academic mentorship programme evidence', status: 'missing', frameworks: ['MQA'] },
        ],
      },
      {
        id: 'staff-resources',
        index: 3,
        title: 'Staff & Resources',
        items: [
          { id: 'staff-qual', name: 'Staff qualifications register', status: 'ready', frameworks: ['MQA'] },
          { id: 'staff-pd', name: 'Professional development records', status: 'ready', frameworks: ['MQA'] },
          { id: 'staff-workload', name: 'Staff workload allocation', status: 'ready', frameworks: ['MQA'] },
          { id: 'lab-facilities', name: 'Lab and facilities audit', status: 'in-progress', frameworks: ['MQA'] },
          { id: 'library-resources', name: 'Library and digital resource access', status: 'ready', frameworks: ['MQA'] },
          { id: 'industry-supervision', name: 'Industry-qualified supervisors', status: 'ready', frameworks: ['MQA'] },
          { id: 'visiting-lecturers', name: 'Visiting lecturer / practitioner log', status: 'ready', frameworks: ['MQA'] },
          { id: 'research-output', name: 'Staff research output (last 3 years)', status: 'ready', frameworks: ['MQA'] },
          { id: 'student-ratio', name: 'Student-to-staff ratio compliance', status: 'missing', frameworks: ['MQA'] },
        ],
      },
    ],
  },
  'MQA - BSc Data Science': {
    id: 'mqa-ds',
    label: 'MQA - BSc Data Science',
    shortLabel: 'MQA BSc Data Science',
    category: 'MQA programme review',
    scope: 'Programme-level monitoring',
    checklistLabel: 'Priority requirements shown',
    due: 'Due: 14 months',
    preparationStatus: 'On track - preparation begins in 2 months',
    readinessTone: 'green',
    tone: 'gray',
    action: 'Start early',
    draftAction: 'Generate evidence summary',
    supportsReportSectionDraft: false,
    groups: [
      {
        id: 'programme-quality',
        index: 1,
        title: 'Programme Quality Evidence',
        items: [
          { id: 'ds-objectives', name: 'Programme objectives', status: 'ready', frameworks: ['MQA'] },
          { id: 'ds-curriculum', name: 'Curriculum structure', status: 'ready', frameworks: ['MQA'] },
          { id: 'ds-course-files', name: 'Course files (updated for 2025)', status: 'in-progress', frameworks: ['MQA'] },
          { id: 'ds-outcomes', name: 'Learning outcomes mapping', status: 'missing', frameworks: ['MQA'] },
          { id: 'ds-advisory', name: 'Industry advisory panel minutes', status: 'missing', frameworks: ['MQA'] },
          { id: 'ds-assessment', name: 'Assessment samples (all 8 courses)', status: 'in-progress', frameworks: ['MQA'] },
          { id: 'ds-examiner', name: 'External examiner reports', status: 'missing', frameworks: ['MQA'] },
          { id: 'ds-attainment', name: 'Graduate attainment data', status: 'ready', frameworks: ['MQA'] },
          { id: 'ds-market', name: 'Market demand evidence', status: 'ready', frameworks: ['MQA'] },
          { id: 'ds-employability', name: 'Graduate employability outcomes', status: 'missing', frameworks: ['MQA'] },
        ],
      },
    ],
  },
  'SETARA 2026': {
    id: 'setara',
    label: 'SETARA 2026',
    shortLabel: 'SETARA 2026',
    category: 'SETARA institutional assessment',
    scope: 'Institution-wide assessment, faculty evidence contribution',
    checklistLabel: 'Priority requirements shown',
    due: 'Due: 8 months',
    preparationStatus: 'On track - faculty contribution started on schedule',
    readinessTone: 'green',
    tone: 'blue',
    action: 'Continue preparing',
    draftAction: 'Generate evidence summary',
    supportsReportSectionDraft: false,
    groups: [
      {
        id: 'institutional-graduate-outcomes',
        index: 1,
        title: 'Faculty Evidence Contribution',
        items: [
          { id: 'setara-employment-rate', name: 'Graduate employment contribution', status: 'ready', frameworks: ['SETARA'] },
          { id: 'setara-student-support', name: 'Student support evidence summary', status: 'ready', frameworks: ['SETARA'] },
          { id: 'setara-employer-feedback', name: 'Employer feedback contribution', status: 'ready', frameworks: ['SETARA'] },
          { id: 'setara-destination', name: 'Graduate destination evidence contribution', status: 'in-progress', frameworks: ['SETARA'] },
          { id: 'setara-quality-note', name: 'Institutional quality narrative input', status: 'missing', frameworks: ['SETARA'] },
        ],
      },
    ],
  },
  'QS World Rankings 2025': {
    id: 'qs',
    label: 'QS World Rankings 2025',
    shortLabel: 'QS World Rankings 2025',
    category: 'QS ranking submission',
    scope: 'Institution-level ranking evidence',
    checklistLabel: 'Priority requirements shown',
    due: 'Due: 6 weeks',
    preparationStatus: '3 priority requirements still need attention',
    readinessTone: 'red',
    tone: 'urgent',
    action: 'Generate draft',
    draftAction: 'Generate evidence summary',
    supportsReportSectionDraft: false,
    groups: qsGroups,
  },
}

export const frameworkGroups = Object.fromEntries(
  Object.entries(frameworkProfiles).map(([key, profile]) => [key, profile.groups]),
)

export const requirementGroups = frameworkProfiles['QS World Rankings 2025'].groups

export const evidenceByRequirement = {
  'graduate-destination': {
    completeness: 67,
    readySources: 2,
    totalSources: 3,
    sources: [
      {
        id: 'alumni-pathway',
        label: 'From: Alumni Signal Intelligence',
        sourcePage: '/university/alumni-signals',
        title: 'Graduate Role Pathway data - 412 tracked alumni, 78% response rate',
        updated: 'Last updated: 2 days ago',
        status: 'ready',
        action: 'View source',
        icon: 'trend',
      },
      {
        id: 'partnerships',
        label: 'From: Collaboration Marketplace',
        sourcePage: '/university/collaboration',
        title: 'Partnership hiring conversion data - 12 active partnerships',
        updated: 'Last updated: 5 days ago',
        status: 'ready',
        action: 'View source',
        icon: 'handshake',
      },
      {
        id: 'international-placement',
        label: 'Missing: International placement data',
        sourcePage: null,
        title: '3 of 5 years of international destination data not yet collected',
        updated: 'Last updated: N/A',
        status: 'missing',
        action: 'Request data',
        icon: 'warning',
      },
    ],
  },
  'employment-rate': {
    completeness: 100,
    readySources: 2,
    totalSources: 2,
    sources: [
      {
        id: 'alumni-employment',
        label: 'From: Alumni Signal Intelligence',
        sourcePage: '/university/alumni-signals',
        title: 'Time-to-first-role tracking - 2.3 months average, 412 tracked alumni',
        updated: 'Last updated: 2 days ago',
        status: 'ready',
        action: 'View source',
        icon: 'trend',
      },
      {
        id: 'tracer-study',
        label: 'From: Internal Graduate Tracer Study',
        sourcePage: null,
        title: 'Annual employment status survey, 6-month post-graduation checkpoint',
        updated: 'Last updated: 1 week ago',
        status: 'ready',
        action: 'View source',
        icon: 'check',
      },
    ],
  },
  'career-progression': {
    completeness: 20,
    readySources: 0,
    totalSources: 2,
    sources: [
      {
        id: 'longitudinal-tracking',
        label: 'Missing: 5-year longitudinal alumni tracking',
        sourcePage: null,
        title: 'Alumni Signal Intelligence currently tracks 2-3 year outcomes only; 5-year data not yet collected',
        updated: 'Last updated: N/A',
        status: 'missing',
        action: 'Request data',
        icon: 'warning',
      },
      {
        id: 'promotion-records',
        label: 'Missing: Employer-reported promotion records',
        sourcePage: null,
        title: 'No structured mechanism currently exists to capture alumni promotions post-hire',
        updated: 'Last updated: N/A',
        status: 'missing',
        action: 'Request data',
        icon: 'warning',
      },
    ],
  },
  'market-demand': {
    completeness: 100,
    readySources: 2,
    totalSources: 2,
    sources: [
      {
        id: 'curriculum-gap-quadrant',
        label: 'From: Curriculum-Market Alignment',
        sourcePage: '/university/curriculum-alignment',
        title: 'Gap Overview quadrant - 7 skill nodes mapped against 90-day job posting demand',
        updated: 'Last updated: 3 days ago',
        status: 'ready',
        action: 'View source',
        icon: 'trend',
      },
      {
        id: 'employer-language',
        label: 'From: Curriculum-Market Alignment',
        sourcePage: '/university/curriculum-alignment',
        title: 'Employer job-posting language analysis - 127 postings analyzed, last 90 days',
        updated: 'Last updated: 3 days ago',
        status: 'ready',
        action: 'View source',
        icon: 'trend',
      },
    ],
  },
  'intervention-records': {
    completeness: 100,
    readySources: 2,
    totalSources: 2,
    sources: [
      {
        id: 'intervention-queue',
        label: 'From: Student Readiness',
        sourcePage: '/university/student-readiness',
        title: 'Intervention Queue records - 12 active, 8 pending assignment, owner-tracked',
        updated: 'Last updated: today',
        status: 'ready',
        action: 'View source',
        icon: 'check',
      },
      {
        id: 'outcome-tracking',
        label: 'From: Student Readiness',
        sourcePage: '/university/student-readiness',
        title: 'Hidden Employability Risk cohort - outcome tracking for 34 flagged students',
        updated: 'Last updated: today',
        status: 'ready',
        action: 'View source',
        icon: 'check',
      },
    ],
  },
}

export function getFrameworkProfile(framework) {
  return frameworkProfiles[framework] ?? frameworkProfiles[DEFAULT_FRAMEWORK]
}

export function flattenGroups(groups) {
  return groups.flatMap((group) => group.items.map((item) => ({ ...item, groupId: group.id })))
}

export function findRequirement(id, groups) {
  return flattenGroups(groups).find((item) => item.id === id) ?? flattenGroups(groups)[0]
}

export function getDisplayStatus(item, requestedItems = {}, overrides = {}) {
  if (overrides[item.id]) return 'override'
  if (requestedItems[item.id]) return 'requested'
  return item.status
}

export function getPreferredRequirement(groups, requestedItems = {}, overrides = {}) {
  const items = flattenGroups(groups)
  return (
    items.find((item) => ['in-progress', 'missing', 'requested'].includes(getDisplayStatus(item, requestedItems, overrides))) ??
    items[0]
  )
}

export function getGroupStats(group, requestedItems = {}, overrides = {}) {
  const stats = group.items.reduce(
    (acc, item) => {
      const status = getDisplayStatus(item, requestedItems, overrides)
      acc.total += 1
      if (status === 'ready' || status === 'override') acc.ready += 1
      if (status === 'in-progress') acc.inProgress += 1
      if (status === 'missing') acc.missing += 1
      if (status === 'requested') acc.requested += 1
      return acc
    },
    { total: 0, ready: 0, inProgress: 0, missing: 0, requested: 0 },
  )
  stats.readiness = stats.total ? Math.round((stats.ready / stats.total) * 100) : 0
  return stats
}

export function getFrameworkStats(profile, requestedItems = {}, overrides = {}) {
  const stats = profile.groups.reduce(
    (acc, group) => {
      const groupStats = getGroupStats(group, requestedItems, overrides)
      acc.total += groupStats.total
      acc.ready += groupStats.ready
      acc.inProgress += groupStats.inProgress
      acc.missing += groupStats.missing
      acc.requested += groupStats.requested
      return acc
    },
    { total: 0, ready: 0, inProgress: 0, missing: 0, requested: 0 },
  )
  stats.readiness = stats.total ? Math.round((stats.ready / stats.total) * 100) : 0
  return stats
}

export function getFrameworkKpis(profile, stats) {
  return [
    { id: 'readiness', label: 'Readiness', value: `${stats.readiness}%`, note: profile.checklistLabel, tone: 'green' },
    { id: 'ready', label: 'Ready', value: String(stats.ready), note: `Of ${stats.total} requirements`, tone: 'green' },
    { id: 'progress', label: 'In progress', value: String(stats.inProgress), note: 'Needs updating', tone: 'orange' },
    { id: 'missing', label: 'Missing', value: String(stats.missing), note: 'Action needed', tone: 'red' },
    { id: 'requested', label: 'Requested', value: String(stats.requested), note: 'Waiting on owner', tone: 'amber' },
  ]
}

export function getFrameworkBanner(profile, stats) {
  const attention = stats.missing + stats.inProgress + stats.requested
  return `You have ${Object.keys(frameworkProfiles).length} active reporting obligations. ${profile.shortLabel} is ${profile.due.toLowerCase()} with ${stats.ready} of ${stats.total} priority requirements ready. ${attention} item${attention === 1 ? '' : 's'} need attention now.`
}

export function getTimelineSubmissions(requestedItems = {}, overrides = {}) {
  return Object.values(frameworkProfiles).map((profile) => {
    const stats = getFrameworkStats(profile, requestedItems, overrides)
    return {
      id: profile.id,
      framework: profile.label,
      title: profile.shortLabel,
      due: profile.due,
      ready: `${stats.ready}/${stats.total} priority requirements ready`,
      progress: stats.readiness,
      action: profile.action,
      tone: profile.tone,
      readinessStatus: profile.preparationStatus,
      readinessTone: profile.readinessTone,
    }
  })
}

export const timelineSubmissions = getTimelineSubmissions()

export const accreditationSummary = {
  banner: getFrameworkBanner(frameworkProfiles[DEFAULT_FRAMEWORK], getFrameworkStats(frameworkProfiles[DEFAULT_FRAMEWORK])),
  kpis: getFrameworkKpis(frameworkProfiles[DEFAULT_FRAMEWORK], getFrameworkStats(frameworkProfiles[DEFAULT_FRAMEWORK])),
}
