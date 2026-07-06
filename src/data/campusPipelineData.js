// Mock data for the Employer Campus Pipeline page (src/pages/employer/CampusPipeline.jsx).
// No backend — every value here is static demo content.

export const pipelineMetrics = [
  { id: 'total', icon: 'people', label: 'Total in pipeline', value: '342', note: 'Across all stages', noteTone: 'muted' },
  { id: 'conversion', icon: 'trend', label: 'Stage conversion rate', value: '18%', note: '▲ 3% vs last quarter', noteTone: 'green' },
  { id: 'at-risk', icon: 'warning', label: 'At risk of going cold', value: '27', note: 'No engagement 60+ days', noteTone: 'orange', valueTone: 'orange' },
]

export const rewarmingSuggestions = [
  {
    id: 'backend-workshop-grads',
    icon: 'graduation',
    tone: 'blue',
    text: "3 candidates from last year's Backend Workshop graduate in June — perfect timing for your new Software Engineer opening.",
    primaryAction: 'Send invite',
    confirmedLabel: 'Invited',
    secondaryAction: 'View candidates',
    successMessage: 'Invites sent to 3 candidates from Backend Workshop',
    why: "These 3 candidates attended your Backend Engineering Workshop in April 2025, scored in the top 20% of the technical assessment, and their CareerOS profiles show graduation dates in June 2025 — matching your new Software Engineer opening's start date.",
    candidateIds: ['wk-1', 'wk-2', 'wk-3'],
    drawerType: 'workshop',
    moveTo: null,
  },
  {
    id: 'future-intake-match',
    icon: 'target',
    tone: 'purple',
    text: '5 candidates in Future-Intake match your upcoming Data Analyst role based on skill signals.',
    primaryAction: 'Move to Warm',
    confirmedLabel: 'Moved',
    secondaryAction: 'View candidates',
    successMessage: '5 candidates moved to Warm stage',
    why: 'These candidates have skill signals (System Design, Python, Backend) that match your Data Analyst role’s requirements at 75%+ confidence, based on their Career Memory and challenge performance.',
    candidateIds: ['fi-1', 'fi-2', 'fi-3', 'fi-4', 'fi-5'],
    drawerType: 'future-intake',
    moveTo: { from: 'future-pool', to: 'engaged', count: 5 },
  },
  {
    id: 'going-cold',
    icon: 'clock',
    tone: 'orange',
    text: "12 candidates haven't been engaged in 60+ days — they're at risk of going cold. Consider a quick check-in.",
    primaryAction: 'Send check-in',
    confirmedLabel: 'Sent',
    secondaryAction: 'View candidates',
    successMessage: 'Check-in messages sent to 12 candidates',
    why: 'These 12 candidates haven’t received any communication, event invite, or profile view from Acme Corporation in 60+ days. Engagement research shows candidates without contact in 60+ days have a 40% lower response rate when re-engaged later.',
    candidateIds: Array.from({ length: 12 }, (_, i) => `cold-${i + 1}`),
    drawerType: 'at-risk',
    moveTo: null,
  },
]

// Candidate detail lookups shown in the "View candidates" drawer, keyed by id.
export const suggestionCandidates = {
  'wk-1': { id: 'wk-1', name: 'Wei Ming Lee', university: "Taylor's University", graduates: 'June 2025', attended: 'Backend Workshop, Apr 2025' },
  'wk-2': { id: 'wk-2', name: 'Nadia Iskandar', university: 'APU', graduates: 'June 2025', attended: 'Backend Workshop, Apr 2025' },
  'wk-3': { id: 'wk-3', name: 'Calvin Ooi', university: "Taylor's University", graduates: 'June 2025', attended: 'Backend Workshop, Apr 2025' },
  'fi-1': { id: 'fi-1', name: 'Priya Sundar', university: 'APU', match: 88, skills: ['System Design', 'Python'] },
  'fi-2': { id: 'fi-2', name: 'Tan Wei Jie', university: "Taylor's University", match: 84, skills: ['Backend', 'SQL'] },
  'fi-3': { id: 'fi-3', name: 'Farah Husna', university: 'Sunway University', match: 81, skills: ['Python', 'Data Structures'] },
  'fi-4': { id: 'fi-4', name: 'Ryan Goh', university: 'APU', match: 79, skills: ['System Design', 'Backend'] },
  'fi-5': { id: 'fi-5', name: 'Aina Zulkifli', university: "Taylor's University", match: 76, skills: ['Python', 'SQL'] },
  'cold-1': { id: 'cold-1', name: 'Joel Tan', university: 'Monash Malaysia', lastContactDays: 64 },
  'cold-2': { id: 'cold-2', name: 'Mei Xin Chong', university: 'UM', lastContactDays: 67 },
  'cold-3': { id: 'cold-3', name: 'Haziq Rahman', university: 'APU', lastContactDays: 70 },
  'cold-4': { id: 'cold-4', name: 'Lim Jia Hui', university: "Taylor's University", lastContactDays: 61 },
  'cold-5': { id: 'cold-5', name: 'Syafiq Anuar', university: 'Sunway University', lastContactDays: 75 },
  'cold-6': { id: 'cold-6', name: 'Karen Wong', university: 'UTM', lastContactDays: 66 },
  'cold-7': { id: 'cold-7', name: 'Faiz Hakimi', university: 'APU', lastContactDays: 72 },
  'cold-8': { id: 'cold-8', name: 'Bella Sim', university: 'Monash Malaysia', lastContactDays: 63 },
  'cold-9': { id: 'cold-9', name: 'Danish Iqbal', university: "Taylor's University", lastContactDays: 80 },
  'cold-10': { id: 'cold-10', name: 'Cheryl Yap', university: 'UM', lastContactDays: 69 },
  'cold-11': { id: 'cold-11', name: 'Arif Hidayat', university: 'Sunway University', lastContactDays: 62 },
  'cold-12': { id: 'cold-12', name: 'Natasha Lee', university: 'APU', lastContactDays: 77 },
}

export const pipelineStages = [
  {
    id: 'aware',
    name: 'Aware',
    tone: 'slate',
    count: 122,
    candidates: [
      { id: 'jason-lee', name: 'Jason Lee', university: "Taylor's University", course: 'Computer Science', year: 'Y2', tag: 'Identified', daysInStage: 4, evidence: ['Profile viewed', 'No contact yet'] },
      { id: 'aisyah-farah', name: 'Aisyah Farah', university: 'APU', course: 'Data Science', year: 'Y3', tag: 'Outreach sent', daysInStage: 9, evidence: ['Outreach email sent', 'Awaiting reply'] },
      { id: 'muhammad-khairi', name: 'Muhammad Khairi', university: 'Sunway University', course: 'Software Engineering', year: 'Y2', tag: 'Contacted', daysInStage: 12, evidence: ['Replied to outreach', 'Interested in internship'] },
    ],
  },
  {
    id: 'engaged',
    name: 'Engaged',
    tone: 'purple',
    count: 109,
    candidates: [
      { id: 'hiro-ping', name: 'Hiro Ping', university: 'APU', course: 'Data Analytics', year: 'Y3', tag: 'Event attended', daysInStage: 6, evidence: ['✓ Attended campus event', 'Engaged with booth'] },
      { id: 'zara-shafinaz', name: 'Zara Shafinaz', university: "Taylor's University", course: 'Software Engineering', year: 'Y3', tag: 'Challenge joined', daysInStage: 11, evidence: ['✓ Joined AI Challenge', '✓ Submitted entry'] },
      { id: 'amir-rahman', name: 'Amir Rahman', university: 'MMU', course: 'Computer Science', year: 'Y2', tag: 'Workshop attended', daysInStage: 15, evidence: ['✓ Workshop attended', '✓ Python verified'] },
    ],
  },
  {
    id: 'in-process',
    name: 'In Process',
    tone: 'green',
    count: 43,
    candidates: [
      { id: 'ivan-lim', name: 'Ivan Lim', university: "Taylor's University", course: 'Software Engineering', year: 'Y3', tag: 'Shortlisted', daysInStage: 2, evidence: ['✓ 96% match', '✓ Full-stack project verified'] },
      { id: 'hafiz-azman', name: 'Hafiz Azman', university: 'APU', course: 'Data Science', year: 'Y3', tag: 'Interview-ready', daysInStage: 5, evidence: ['✓ Technical screen passed', '✓ SQL verified'] },
      { id: 'fiona-lee', name: 'Fiona Lee', university: 'Sunway University', course: 'Computer Science', year: 'Y3', tag: 'Interview-ready', daysInStage: 3, evidence: ['✓ Coding test passed', '✓ Portfolio reviewed'] },
    ],
  },
  {
    id: 'future-pool',
    name: 'Future Pool',
    tone: 'orange',
    count: 68,
    candidates: [
      { id: 'yew-chen', name: 'Yew Chen', university: "Taylor's University", course: 'Computer Science', year: 'Y2', tag: 'Future intake', daysInStage: 20, evidence: ['Graduating Dec 2025', 'Strong project evidence'] },
      { id: 'siti-maisarah', name: 'Siti Maisarah', university: 'APU', course: 'Data Science', year: 'Y2', tag: 'Available Jul 2025', daysInStage: 18, evidence: ['Available from Jul 2025', '✓ Python verified'] },
      { id: 'brandon-lim', name: 'Brandon Lim', university: "Taylor's University", course: 'Software Engineering', year: 'Y2', tag: 'Referred by alumni', daysInStage: 7, evidence: ['Referred by alumni', 'Profile not yet reviewed'] },
    ],
  },
]

export const STAGE_ORDER = ['aware', 'engaged', 'in-process', 'future-pool']

export const searchSuggestionResults = {
  summary: 'Found 5 candidates ready for your next intake — all in Future-Intake or Warm stage, available from June 2025, with strong evidence in your target skills.',
  candidates: [
    { id: 'fi-1', name: 'Priya Sundar', university: 'APU', tag: '88% match' },
    { id: 'fi-2', name: 'Tan Wei Jie', university: "Taylor's University", tag: '84% match' },
    { id: 'fi-3', name: 'Farah Husna', university: 'Sunway University', tag: '81% match' },
    { id: 'siti-maisarah', name: 'Siti Maisarah', university: 'APU', tag: 'Available Jul 2025' },
    { id: 'yew-chen', name: 'Yew Chen', university: "Taylor's University", tag: 'Future intake' },
  ],
}
