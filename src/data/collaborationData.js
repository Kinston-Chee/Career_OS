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
  },
  {
    id: 'petronas-digital',
    name: 'Petronas Digital',
    initial: 'P',
    tone: 'bg-purple-600',
    fitPct: 88,
    fitTone: 'green',
    description: 'High demand for Data Analytics graduates. Active hiring in your target region.',
  },
  {
    id: 'cimb',
    name: 'CIMB',
    initial: 'C',
    tone: 'bg-red-500',
    fitPct: 81,
    fitTone: 'blue',
    description: 'Growing fintech division, strong match with AI/ML track graduates.',
  },
]

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
  },
]
