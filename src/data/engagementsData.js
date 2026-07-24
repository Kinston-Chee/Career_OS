// Mock data for the Employer Engagements page (src/pages/employer/Engagements.jsx).
// No backend — every value here is static demo content.

export const engagementMetrics = [
  { id: 'active', icon: 'calendar', label: 'Active engagements', value: '3', note: '1 closing soon', noteTone: 'orange' },
  { id: 'registrants', icon: 'people', label: 'Total registrants', value: '381', note: '↑ 24% this quarter', noteTone: 'green' },
  { id: 'qualified', icon: 'target', label: 'Qualified candidates', value: '76', note: 'Across all engagements', noteTone: 'muted' },
  { id: 'hired', icon: 'trophy', label: 'Hired from engagements', value: '6', note: 'This year', noteTone: 'muted' },
]

export const engagementFilterTabs = ['All', 'Active', 'Closing Soon', 'Completed', 'Draft']

export const engagements = [
  {
    id: 'swe-intern',
    icon: 'code',
    iconTone: 'blue',
    badge: 'Internship',
    badgeTone: 'blue',
    title: 'Software Engineering Intern',
    company: 'Acme Corporation',
    location: 'KL',
    posted: 'May 1',
    deadlineLabel: 'Deadline: May 31',
    stat1Label: 'applicants',
    stat1Value: 47,
    stat2Label: 'AI shortlisted',
    stat2Value: 8,
    stat2Icon: 'star',
    stat3Label: 'Avg match',
    stat3Value: '84%',
    stat4Label: 'Top candidate',
    stat4Value: 'Ivan Lim  96%',
    statusDot: 'green',
    statusText: 'Active · Closes in 10 days',
    filterStatus: 'Active',
    actionLabel: 'View applicants',
  },
  {
    id: 'data-analyst-intern',
    icon: 'chart',
    iconTone: 'purple',
    badge: 'Internship',
    badgeTone: 'purple',
    title: 'Data Analyst Intern',
    company: 'Acme Corporation',
    location: 'Remote',
    posted: 'May 3',
    deadlineLabel: 'Deadline: Jun 15',
    stat1Label: 'applicants',
    stat1Value: 31,
    stat2Label: 'AI shortlisted',
    stat2Value: 5,
    stat2Icon: 'star',
    stat3Label: 'Avg match',
    stat3Value: '79%',
    statusDot: 'green',
    statusText: 'Active · Closes in 25 days',
    filterStatus: 'Active',
    actionLabel: 'View applicants',
  },
  {
    id: 'ai-data-challenge',
    icon: 'trophy',
    iconTone: 'orange',
    badge: 'Challenge',
    badgeTone: 'orange',
    title: 'AI & Data Challenge 2025',
    company: 'Acme Corporation',
    location: 'Online',
    posted: 'Apr 20',
    deadlineLabel: 'Deadline: May 25',
    stat1Label: 'registrants',
    stat1Value: 214,
    stat2Label: 'qualified',
    stat2Value: 23,
    stat2Icon: 'award',
    stat3Label: 'Completion rate',
    stat3Value: '61%',
    statusDot: 'orange',
    statusText: 'Closing in 5 days',
    filterStatus: 'Closing Soon',
    actionLabel: 'View applicants',
  },
  {
    id: 'backend-workshop',
    icon: 'laptop',
    iconTone: 'teal',
    badge: 'Workshop',
    badgeTone: 'teal',
    title: 'Backend Engineering Workshop',
    company: 'Acme Corporation',
    location: "Taylor's University",
    posted: 'Apr 15',
    deadlineLabel: 'Completed: May 10',
    stat1Label: 'attended',
    stat1Value: 89,
    stat2Label: 'shortlisted',
    stat2Value: 12,
    stat2Icon: 'star',
    statusDot: 'gray',
    statusText: 'Completed',
    filterStatus: 'Completed',
    actionLabel: 'View results',
  },
]

export const goalOptions = [
  {
    id: 'pipeline',
    emoji: '🎯',
    title: 'Build a talent pipeline',
    description: 'Find students I want to hire in 6–12 months',
  },
  {
    id: 'validate-skills',
    emoji: '🔍',
    title: 'Validate specific skills',
    description: 'Test if candidates can actually do the work',
  },
  {
    id: 'employer-brand',
    emoji: '📣',
    title: 'Strengthen employer brand',
    description: 'Make top students aware of your company',
  },
  {
    id: 'hire-fast',
    emoji: '⚡',
    title: 'Hire fast',
    description: 'I need someone in 30–60 days',
  },
]

export const aiRecommendation = {
  badge: 'Challenge',
  title: 'AI & Backend Engineering Challenge 2025',
  meta: 'Acme Corporation · Online · 3 days',
  reasons: [
    { icon: 'people', text: "42 high-fit candidates at Taylor's and APU available June–August" },
    { icon: 'trend', text: 'Challenge participants convert to interns at 3.2x rate of regular applicants' },
    { icon: 'sparkle', text: 'Directly validates your top skill gap: System Design and Backend Architecture' },
    { icon: 'target', text: 'Estimated pipeline: 200 registrants · 40 qualified · 8–12 hirable' },
  ],
  metrics: [
    { label: 'Expected registrants', value: '200+' },
    { label: 'Qualified candidates', value: '40' },
    { label: 'Est. hirable', value: '8–12' },
  ],
  sdgGoals: [
    { number: 4, title: 'Quality Education', color: '#C5192D', short: 'SDG 4' },
    { number: 8, title: 'Decent Work & Growth', color: '#A21942', short: 'SDG 8' },
    { number: 9, title: 'Industry & Innovation', color: '#FD6925', short: 'SDG 9' },
  ],
}

// Full SDG palette (UN official colors) — used for the SDG selector on Step 3.
export const SDG_CATALOG = [
  { number: 1, title: 'No Poverty', color: '#E5243B' },
  { number: 2, title: 'Zero Hunger', color: '#DDA63A' },
  { number: 3, title: 'Good Health & Well-being', color: '#4C9F38' },
  { number: 4, title: 'Quality Education', color: '#C5192D' },
  { number: 5, title: 'Gender Equality', color: '#FF3A21' },
  { number: 6, title: 'Clean Water & Sanitation', color: '#26BDE2' },
  { number: 7, title: 'Affordable & Clean Energy', color: '#FCC30B' },
  { number: 8, title: 'Decent Work & Growth', color: '#A21942' },
  { number: 9, title: 'Industry & Innovation', color: '#FD6925' },
  { number: 10, title: 'Reduced Inequalities', color: '#DD1367' },
  { number: 11, title: 'Sustainable Cities', color: '#FD9D24' },
  { number: 12, title: 'Responsible Consumption', color: '#BF8B2E' },
  { number: 13, title: 'Climate Action', color: '#3F7E44' },
  { number: 14, title: 'Life Below Water', color: '#0A97D9' },
  { number: 15, title: 'Life on Land', color: '#56C02B' },
  { number: 16, title: 'Peace & Justice', color: '#00689D' },
  { number: 17, title: 'Partnerships for Goals', color: '#19486A' },
]

export const alternativeEngagementTypes = [
  { id: 'technical-assessment', icon: 'search', title: 'Technical Assessment', subtitle: 'Validate Skills', description: 'Test real abilities before interview' },
  { id: 'campus-workshop', icon: 'megaphone', title: 'Campus Workshop', subtitle: 'Build Brand', description: 'Awareness among top students' },
  { id: 'accelerated-program', icon: 'zap', title: 'Accelerated Program', subtitle: 'Hire Fast', description: 'Shortlist ready in 30 days' },
]

export const campusIntelligence = {
  universities: [
    { id: 'taylors', initial: 'T', tone: 'red', name: "Taylor's University", candidates: 18, bars: 4 },
    { id: 'apu', initial: 'A', tone: 'green', name: 'APU', candidates: 14, bars: 3 },
    { id: 'sunway', initial: 'S', tone: 'blue', name: 'Sunway University', candidates: 10, bars: 2 },
  ],
  availabilityMonths: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
  peakMonths: ['Jun', 'Jul', 'Aug'],
  peakLabel: 'Peak availability: June–August 2025',
  peakDetail: '42 candidates graduating for internship',
  skillGaps: [
    { label: 'System Design', value: 80, tone: 'red', detail: 'Critical gap · 0 verified candidates' },
    { label: 'Backend Architecture', value: 60, tone: 'orange', detail: 'High gap · 3 partially verified' },
    { label: 'Python/ML', value: 30, tone: 'amber', detail: 'Moderate gap · 12 candidates verified' },
  ],
  similarCompanies: [
    { id: 'company-a', name: 'Company A', detail: 'AI Challenge · March 2025', result: 'Hired 6 from 180 registrants' },
    { id: 'company-b', name: 'Company B', detail: 'Backend Workshop · Jan 2025', result: 'Pipeline of 23 qualified candidates' },
  ],
  benchmark: 'Industry benchmark: Challenges yield 3.2x better hire quality vs job postings',
}

export const eventDetailsDefault = {
  eventName: 'Acme AI & Backend Engineering Challenge 2025',
  eventType: 'Technical Challenge',
  duration: '3 days',
  format: 'Online',
  targetUniversities: ["Taylor's University", 'APU', 'Sunway University'],
  targetYear: 'Y2 – Y3',
  skillsTested: ['System Design', 'Python', 'Backend Architecture'],
  maxParticipants: '500',
  registrationDeadline: '',
  challengeBrief:
    'Build a scalable backend system that solves a real-world problem. Teams of 1-3 will have 3 days to design, build, and present a working prototype. Top performers get fast-tracked to our internship interview process.',
  prizes: 'Internship fast-track + RM500 voucher for top 3 teams',
  sdgGoals: [4, 8, 9],
}

export const ALL_UNIVERSITIES = ["Taylor's University", 'APU', 'Sunway University', 'Monash Malaysia', 'University of Malaya']
export const ALL_SKILLS = ['System Design', 'Python', 'Backend Architecture', 'SQL', 'React', 'Data Structures']
