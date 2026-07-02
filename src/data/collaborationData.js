// Mock data for the University Collaboration Marketplace page
// (src/pages/university/CollaborationMarketplace.jsx). No backend — static demo content.

export const summaryBanner = {
  text:
    "Your top 3 partners (Grab, Shopee, Deloitte) account for 54% of hiring conversions but also 42% of graduate concentration risk. I've identified 3 high-potential new partners to diversify your portfolio.",
}

export const kpis = [
  { id: 'active-partnerships', icon: 'handshake', tone: 'blue', label: 'Active partnerships', value: '12', note: '3 high-value', noteTone: 'muted' },
  { id: 'avg-conversion', icon: 'trend', tone: 'green', label: 'Avg hiring conversion', value: '18%', note: '▲ 4% vs last year', noteTone: 'green' },
  { id: 'events', icon: 'calendar', tone: 'blue', label: 'Events this semester', value: '8', note: '4.6x avg ROI', noteTone: 'muted' },
  { id: 'concentration', icon: 'warning', tone: 'orange', label: 'Concentration risk', value: '42%', note: 'In top 4 employers', noteTone: 'muted', valueTone: 'orange' },
]

export const partnerships = [
  {
    id: 'grab',
    name: 'Grab',
    initial: 'G',
    tone: 'bg-green-600',
    since: '2022',
    internshipConversion: 32,
    hiringRate: 24,
    eventRoi: '5.2x',
    relationshipHealth: 90,
    healthLabel: 'Strong',
    healthTone: 'green',
    events: 8,
    hires: 12,
  },
  {
    id: 'shopee',
    name: 'Shopee',
    initial: 'S',
    tone: 'bg-orange-500',
    since: '2021',
    internshipConversion: 28,
    hiringRate: 19,
    eventRoi: '4.1x',
    relationshipHealth: 85,
    healthLabel: 'Strong',
    healthTone: 'green',
    events: 6,
    hires: 9,
  },
  {
    id: 'deloitte',
    name: 'Deloitte',
    initial: 'D',
    tone: 'bg-blue-600',
    since: '2023',
    internshipConversion: 15,
    hiringRate: 11,
    eventRoi: '2.8x',
    relationshipHealth: 70,
    healthLabel: 'Moderate',
    healthTone: 'blue',
    events: 3,
    hires: 4,
  },
  {
    id: 'maybank',
    name: 'Maybank',
    initial: 'M',
    tone: 'bg-amber-500',
    since: '2024',
    internshipConversion: 8,
    hiringRate: 6,
    eventRoi: '3.4x',
    relationshipHealth: 60,
    healthLabel: 'Growing',
    healthTone: 'purple',
    events: 2,
    hires: 2,
  },
]

export const totalPartnershipsCount = 12

export const recommendedPartners = [
  {
    id: 'axiata',
    name: 'Axiata',
    initial: 'A',
    tone: 'bg-teal-600',
    fitPct: 94,
    fitTone: 'green',
    description: 'Strong alignment with Cloud & Data skills focus. No current partnership.',
    alignmentReason: "Axiata's cloud infrastructure expertise aligns strongly with our students' growing competency in cloud deployment",
    contact: 'partnerships@axiata.com',
  },
  {
    id: 'petronas-digital',
    name: 'Petronas Digital',
    initial: 'P',
    tone: 'bg-purple-600',
    fitPct: 88,
    fitTone: 'green',
    description: 'High demand for Data Analytics graduates. Active hiring in your target region.',
    alignmentReason: "Petronas Digital's active hiring pipeline for Data Analytics roles closely matches our BSc Data Analytics graduate output",
    contact: 'campus.recruit@petronas.com',
  },
  {
    id: 'cimb',
    name: 'CIMB',
    initial: 'C',
    tone: 'bg-red-500',
    fitPct: 81,
    fitTone: 'blue',
    description: 'Growing fintech division, strong match with AI/ML track graduates.',
    alignmentReason: "CIMB's expanding fintech division and AI/ML track graduates' demonstrated project depth make this a strong applied-learning fit",
    contact: 'university.relations@cimb.com',
  },
]

// Partnership history detail for the "View partnership" expand — timeline events per existing partner.
export const partnershipHistory = {
  grab: {
    timeline: [
      { date: 'Jan 2022', label: 'Partnership established — MOU signed' },
      { date: 'Aug 2022', label: 'First AI/Data Hackathon co-hosted — 180 registrants' },
      { date: 'Mar 2023', label: '5 students placed in summer internship cohort' },
      { date: 'Oct 2023', label: 'Guest lecture series launched (2 sessions/semester)' },
      { date: 'May 2025', label: 'Latest hiring cycle — 3 offers extended, 3 accepted' },
    ],
    feedback: '"Heriot-Watt graduates consistently show strong problem-solving fundamentals — the hackathon format lets us assess this better than a resume ever could." — Grab, Talent Acquisition Lead',
  },
  shopee: {
    timeline: [
      { date: 'Mar 2021', label: 'Partnership established — MOU signed' },
      { date: 'Nov 2021', label: 'First guest lecture series launched' },
      { date: 'Jun 2023', label: 'Cloud Fundamentals Workshop co-designed' },
      { date: 'May 2025', label: 'Latest hiring cycle — 2 offers extended, 2 accepted' },
    ],
    feedback: '"The workshop format has become one of our most reliable early-talent sourcing channels in the region." — Shopee, University Relations',
  },
  deloitte: {
    timeline: [
      { date: 'Feb 2023', label: 'Partnership established — MOU signed' },
      { date: 'Sep 2023', label: 'FinTech Case Competition launched' },
      { date: 'May 2025', label: 'Latest hiring cycle — 1 offer extended, 1 accepted' },
    ],
    feedback: '"Case competition finalists have gone straight into our analyst program with minimal ramp-up time." — Deloitte, Campus Recruiting',
  },
  maybank: {
    timeline: [
      { date: 'Jan 2024', label: 'Partnership established — MOU signed' },
      { date: 'Jun 2024', label: 'First internship cohort placed (2 students)' },
      { date: 'May 2025', label: 'Relationship under review — growing but early-stage' },
    ],
    feedback: '"Still early days, but the students we\'ve hosted have been well-prepared." — Maybank, Graduate Programs',
  },
}

export const eventFilterTabs = ['All', 'Pre-Event', 'Post-Event', 'Draft']

export const events = [
  {
    id: 'fintech-case',
    icon: 'trophy',
    iconTone: 'orange',
    title: 'FinTech Case Competition',
    with: 'Deloitte',
    badge: 'Challenge',
    badgeTone: 'orange',
    stat: '142 registered · 89% completion',
    statusDot: 'green',
    statusText: 'Closing in 5 days',
    filterGroup: 'Pre-Event',
    detail: {
      participants: '142 registered · 126 completed (89%)',
      partnerFeedback: '"Strong analytical rigor across finalist teams — several are already on our interview shortlist." — Deloitte',
      skillUplift: '+22% self-reported confidence in financial data modeling, pre/post survey',
    },
  },
  {
    id: 'ai-hackathon',
    icon: 'code',
    iconTone: 'orange',
    title: 'AI/Data Hackathon',
    with: 'Grab',
    badge: 'Challenge',
    badgeTone: 'orange',
    stat: '214 registered · 61% completion',
    statusDot: 'green',
    statusText: 'Active',
    filterGroup: 'Pre-Event',
    detail: {
      participants: '214 registered · 131 completed so far (61%)',
      partnerFeedback: '"Registration volume is ahead of last year — quality of early submissions looks strong." — Grab',
      skillUplift: 'In progress — final uplift survey issued at event close',
    },
  },
  {
    id: 'cloud-workshop',
    icon: 'cloud',
    iconTone: 'teal',
    title: 'Cloud Fundamentals Workshop',
    with: 'AWS Academy',
    badge: 'Workshop',
    badgeTone: 'teal',
    stat: '89 attended · 12 certified',
    statusDot: 'gray',
    statusText: 'Completed',
    filterGroup: 'Post-Event',
    detail: {
      participants: '89 attended · 12 completed AWS Cloud Practitioner certification',
      partnerFeedback: '"Attendance and completion rates were above our regional benchmark for university workshops." — AWS Academy',
      skillUplift: '+31% self-reported confidence in cloud deployment concepts, pre/post survey',
    },
  },
  {
    id: 'guest-lecture',
    icon: 'mic',
    iconTone: 'purple',
    title: 'Guest Lecture Series',
    with: 'Shopee',
    badge: 'Talk',
    badgeTone: 'purple',
    stat: 'Seeking corporate speaker',
    statusDot: 'gray',
    statusText: 'Draft',
    filterGroup: 'Draft',
    detail: {
      participants: 'Not yet scheduled',
      partnerFeedback: 'Awaiting speaker confirmation from Shopee University Relations',
      skillUplift: 'Not yet measurable',
    },
  },
]
