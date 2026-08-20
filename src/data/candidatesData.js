// Shared mock candidate directory for the Employer Workspace.
// Used by the Candidates master list/detail view, and linked into from
// Talent Discovery, Campus Pipeline, and Engagements "View profile" actions.
// No backend — every value here is static demo content.

import { postings } from './talentDiscoveryData'

export const PIPELINE_STAGES = ['Aware', 'Engaged', 'Shortlisted', 'In Process', 'Hired']

export const candidates = [
  {
    id: 'ivan-lim',
    name: 'Ivan Lim',
    initials: 'IL',
    university: "Taylor's University",
    course: 'Software Engineering',
    year: 'Y3',
    targetRole: 'Software Engineering Intern',
    matchScore: 96,
    matchLabel: 'High match',
    evidenceChips: ['Full-stack project verified', 'Attended your AI workshop', 'Leadership signal · 4 entries', 'Available June 2025'],
    skills: ['React', 'Node.js', 'System Design'],
    risk: 'Considering other offers — act fast',
    validateNext: 'Strong design problem-solving ability',
    appliedDate: 'Applied May 12, 2025',
    pipelineStage: 'Shortlisted',
  },
  {
    id: 'nur-alya',
    name: 'Nur Alya Binti',
    initials: 'NA',
    university: 'APU',
    course: 'Data Science',
    year: 'Y3',
    targetRole: 'Data Analyst Intern',
    matchScore: 92,
    matchLabel: 'High match',
    evidenceChips: ['SQL & Python verified', 'Data storytelling project', 'Analytics competition finalist'],
    skills: ['SQL', 'Python', 'Power BI'],
    risk: 'Low commitment signal — multiple applications active',
    validateNext: 'Advanced SQL + dashboard skills',
    appliedDate: 'Applied May 10, 2025',
    pipelineStage: 'Engaged',
  },
  {
    id: 'marcus-tan',
    name: 'Marcus Tan',
    initials: 'MT',
    university: 'Sunway University',
    course: 'Computer Science',
    year: 'Y3',
    targetRole: 'Software Engineering Intern',
    matchScore: 89,
    matchLabel: 'Strong match',
    evidenceChips: ['Open source contributor', 'API design project', 'Backend hackathon entry'],
    skills: ['Backend', 'API Design', 'Open Source'],
    risk: 'Graded school applications — may prefer larger companies',
    validateNext: 'Technical deep dive interview',
    appliedDate: 'Applied May 8, 2025',
    pipelineStage: 'In Process',
  },
  {
    id: 'aisha-rahman',
    name: 'Aisha Rahman',
    initials: 'AR',
    university: 'MMU',
    course: 'Computer Science',
    year: 'Y2',
    targetRole: 'Software Engineering Intern',
    matchScore: 84,
    matchLabel: 'Strong match',
    evidenceChips: ['Frontend portfolio verified', 'UI/UX case study'],
    skills: ['Frontend', 'UI/UX'],
    risk: 'Limited backend evidence yet',
    validateNext: 'Backend fundamentals check',
    appliedDate: 'Applied May 9, 2025',
    pipelineStage: 'Aware',
  },
  {
    id: 'kevin-goh',
    name: 'Kevin Goh',
    initials: 'KG',
    university: 'UTM',
    course: 'Software Engineering',
    year: 'Y3',
    targetRole: 'Software Engineering Intern',
    matchScore: 81,
    matchLabel: 'Strong match',
    evidenceChips: ['Mobile app shipped', 'Hackathon finalist'],
    skills: ['Mobile', 'Flutter'],
    risk: 'Notice period may be longer than expected',
    validateNext: 'Availability confirmation',
    appliedDate: 'Applied May 7, 2025',
    pipelineStage: 'Engaged',
  },
  {
    id: 'chloe-tan',
    name: 'Chloe Tan',
    initials: 'CT',
    university: 'Monash Malaysia',
    course: 'Information Systems',
    year: 'Y2',
    targetRole: 'Data Analyst Intern',
    matchScore: 78,
    matchLabel: 'Good match',
    evidenceChips: ['Database design project'],
    skills: ['SQL', 'Database Design'],
    risk: 'Early-stage project evidence only',
    validateNext: 'Project walkthrough',
    appliedDate: 'Applied May 11, 2025',
    pipelineStage: 'Aware',
  },
  {
    id: 'daniel-lee',
    name: 'Daniel Lee',
    initials: 'DL',
    university: 'INTI',
    course: 'Computer Science',
    year: 'Y3',
    targetRole: 'Software Engineering Intern',
    matchScore: 74,
    matchLabel: 'Good match',
    evidenceChips: ['Coursework projects only'],
    skills: ['Java', 'Coursework'],
    risk: 'Skill gap in role-critical stack',
    validateNext: 'Technical screening',
    appliedDate: 'Applied May 6, 2025',
    pipelineStage: 'Aware',
  },
  {
    id: 'siti-aisyah',
    name: 'Siti Aisyah',
    initials: 'SA',
    university: 'UPM',
    course: 'Data Analytics',
    year: 'Y2',
    targetRole: 'Data Analyst Intern',
    matchScore: 72,
    matchLabel: 'Good match',
    evidenceChips: ['Excel & Power BI dashboard'],
    skills: ['Excel', 'Power BI'],
    risk: 'Limited programming evidence',
    validateNext: 'Python fundamentals check',
    appliedDate: 'Applied May 5, 2025',
    pipelineStage: 'Aware',
  },
  {
    id: 'jason-lee',
    name: 'Jason Lee',
    initials: 'JL',
    university: "Taylor's University",
    course: 'Computer Science',
    year: 'Y2',
    targetRole: 'Software Engineering Intern',
    matchScore: 70,
    matchLabel: 'Good match',
    evidenceChips: ['Profile viewed', 'No contact yet'],
    skills: ['Java', 'Data Structures'],
    risk: 'No engagement yet — early funnel',
    validateNext: 'Initial outreach call',
    appliedDate: 'Identified May 14, 2025',
    pipelineStage: 'Aware',
  },
  {
    id: 'hiro-ping',
    name: 'Hiro Ping',
    initials: 'HP',
    university: 'APU',
    course: 'Data Analytics',
    year: 'Y3',
    targetRole: 'Data Analyst Intern',
    matchScore: 80,
    matchLabel: 'Strong match',
    evidenceChips: ['Attended campus event', 'Engaged with booth'],
    skills: ['SQL', 'Analytics'],
    risk: 'Hasn’t completed an assessment yet',
    validateNext: 'Send technical assessment',
    appliedDate: 'Engaged since May 9, 2025',
    pipelineStage: 'Engaged',
  },
  {
    id: 'yew-chen',
    name: 'Yew Chen',
    initials: 'YC',
    university: "Taylor's University",
    course: 'Computer Science',
    year: 'Y2',
    targetRole: 'Software Engineering Intern',
    matchScore: 77,
    matchLabel: 'Good match',
    evidenceChips: ['Graduating Dec 2025', 'Strong project evidence'],
    skills: ['React', 'Node.js'],
    risk: 'Not yet available for current intake',
    validateNext: 'Confirm future availability',
    appliedDate: 'Future intake · Dec 2025',
    pipelineStage: 'Aware',
  },
  {
    id: 'siti-maisarah',
    name: 'Siti Maisarah',
    initials: 'SM',
    university: 'APU',
    course: 'Data Science',
    year: 'Y2',
    targetRole: 'Data Analyst Intern',
    matchScore: 75,
    matchLabel: 'Good match',
    evidenceChips: ['Available Jul 2025', 'Python verified'],
    skills: ['Python', 'SQL'],
    risk: 'Availability starts after current intake closes',
    validateNext: 'Confirm Jul 2025 start date',
    appliedDate: 'Future intake · Jul 2025',
    pipelineStage: 'Aware',
  },
]

export const candidateDetails = {
  'ivan-lim': {
    narrative:
      'Ivan is a Y3 Software Engineering student with demonstrated leadership in hackathon teams and growing technical depth in full-stack development. His strongest market signal is initiative — shown across 4 separate Career Memory entries. He is actively building toward a Software Engineering role at a top tech company.',
    selfDiscovery: [
      { icon: 'zap', tone: 'blue', title: 'Initiative-driven', detail: 'Moves fast and brings others along' },
      { icon: 'shuffle', tone: 'purple', title: 'Ambiguity-tolerant', detail: "Thrives when direction isn't set yet" },
      { icon: 'target', tone: 'green', title: 'Impact over stability', detail: 'Chooses ownership over structure' },
    ],
    selfDiscoverySummary:
      'Ivan will likely thrive with autonomy and clear ownership of features, rather than heavy supervision. He may get restless in highly structured, process-heavy environments.',
    careerMemory: [
      { title: 'Hackathon Top 3 Finalist', date: 'Oct 2023', verified: true, tags: ['Problem Solving'], signal: 4 },
      { title: 'Full-Stack Project — Personal', date: '2024', verified: true, tags: ['React', 'Node.js'], signal: 5 },
      { title: 'AI Workshop — Acme Corporation', date: 'Apr 2025', verified: true, tags: ['Attended your event'], signal: 4 },
    ],
    whatToValidate: [
      'Strong design problem-solving ability',
      'Confirm June 2025 availability',
      'Discuss long-term interest vs competing offers',
    ],
    retentionConditions: 'Clear growth path, autonomy in projects, minimal process overhead',
    retentionRisk: 'LOW',
  },
  'nur-alya': {
    narrative:
      'Nur Alya is a Y3 Data Science student whose strongest signal is turning raw data into decision-ready insight. Her Career Memory shows consistent investment in analytics tooling and a finalist placement in a competitive analytics challenge.',
    selfDiscovery: [
      { icon: 'zap', tone: 'blue', title: 'Detail-oriented', detail: 'Double-checks before shipping' },
      { icon: 'shuffle', tone: 'purple', title: 'Structure-seeking', detail: 'Performs best with clear scope' },
      { icon: 'target', tone: 'green', title: 'Insight-driven', detail: 'Motivated by "why", not just "what"' },
    ],
    selfDiscoverySummary:
      'Nur Alya will likely perform best with well-scoped analytics problems and regular check-ins, rather than open-ended ambiguity.',
    careerMemory: [
      { title: 'Analytics Competition Finalist', date: 'Jan 2025', verified: true, tags: ['Data Storytelling'], signal: 4 },
      { title: 'Data Storytelling Project', date: '2024', verified: true, tags: ['SQL', 'Python'], signal: 4 },
      { title: 'Dashboard Build — Class Project', date: 'Mar 2025', verified: true, tags: ['Power BI'], signal: 3 },
    ],
    whatToValidate: ['Advanced SQL + dashboard skills', 'Commitment vs other active applications', 'Communication of analytical findings'],
    retentionConditions: 'Flexible work arrangement, mentorship',
    retentionRisk: 'MEDIUM',
  },
  'marcus-tan': {
    narrative:
      'Marcus is a Y3 Computer Science student with a strong open-source track record and a focus on backend systems. His Career Memory shows consistent contribution patterns and a hackathon entry centered on API design.',
    selfDiscovery: [
      { icon: 'zap', tone: 'blue', title: 'Systems thinker', detail: 'Maps the whole before the parts' },
      { icon: 'shuffle', tone: 'purple', title: 'Independent worker', detail: 'Comfortable owning a module solo' },
      { icon: 'target', tone: 'green', title: 'Quality-focused', detail: 'Prioritizes maintainability' },
    ],
    selfDiscoverySummary:
      'Marcus will likely thrive with well-defined backend ownership and structured onboarding, rather than loosely scoped generalist work.',
    careerMemory: [
      { title: 'Backend Hackathon Entry', date: 'Feb 2025', verified: true, tags: ['API Design'], signal: 4 },
      { title: 'Open Source Contributions', date: '2023–2025', verified: true, tags: ['Open Source'], signal: 5 },
      { title: 'API Design Project', date: '2024', verified: true, tags: ['REST', 'System Design'], signal: 4 },
    ],
    whatToValidate: ['Technical deep dive interview', 'Interest level vs larger companies', 'Team collaboration style'],
    retentionConditions: 'Structured onboarding, defined responsibilities',
    retentionRisk: 'LOW',
  },
}

// ─── Application status helper ────────────────────────────────────────────
// A candidate is considered to have applied to one of the company's postings
// when they are in the Shortlisted, In Process, or Hired stages. Everyone in
// Aware or Engaged is a passive prospect the HR user should try to warm up.
export const APPLIED_STAGES = new Set(['Shortlisted', 'In Process', 'Hired'])
export function hasApplied(candidate) {
  return APPLIED_STAGES.has(candidate?.pipelineStage)
}

// ─── Engagement data (non-applied candidates) ─────────────────────────────
// Bespoke touchpoints/outreach ideas for a few named candidates; a generic
// fallback keeps every non-applied candidate usable in the demo.
const engagementOverrides = {
  'aisha-rahman': {
    touchpoints: [
      { channel: 'event', label: 'Attended AI & Data Challenge briefing', date: 'Apr 24, 2025', note: 'Viewed booth for 12 min · asked about frontend track' },
      { channel: 'view', label: 'Viewed Software Engineering Intern posting', date: 'May 3, 2025', note: 'Session · 6 min, revisited twice' },
    ],
    outreach: [
      { channel: 'email', title: 'Invite to Frontend Portfolio Review', preview: "Hi Aisha, your Frontend portfolio caught our eye — want a 20-min portfolio review with our design lead?", cta: 'Send email' },
      { channel: 'event', title: 'Nudge for Backend Fundamentals Workshop', preview: 'Round out your Backend evidence — reserve a spot in our June workshop.', cta: 'Send invite' },
    ],
    campaigns: [
      { name: 'Frontend cohort · June intake', status: 'Recommended', tone: 'green' },
      { name: 'Portfolio review pilot', status: 'Match', tone: 'blue' },
    ],
    bestChannel: 'Email · weekday mornings',
    aiSummary: 'Warm prospect — engaged with a live event and revisited the posting. Send a low-friction portfolio review invite to convert to Applied.',
  },
  'hiro-ping': {
    touchpoints: [
      { channel: 'event', title: 'Booth conversation — Careers Day', label: 'Booth conversation — Careers Day', date: 'May 9, 2025', note: 'Asked about analyst assessment format' },
    ],
    outreach: [
      { channel: 'assessment', title: 'Send technical assessment', preview: 'A 45-minute SQL + insight exercise — auto-graded, no interviewer needed.', cta: 'Send assessment' },
      { channel: 'email', title: 'Personal check-in', preview: "Hi Hiro, thanks for stopping by at Careers Day — ready to move to the next step?", cta: 'Send email' },
    ],
    campaigns: [
      { name: 'Data Analyst assessment cohort', status: 'Best fit', tone: 'green' },
    ],
    bestChannel: 'Email · afternoons',
    aiSummary: 'Engaged in person but not yet assessed. Sending the SQL assessment now is the highest-leverage move.',
  },
  'jason-lee': {
    touchpoints: [
      { channel: 'view', label: 'Identified via campus pipeline', date: 'May 14, 2025', note: 'Sourced from Career Memory — no outreach yet' },
    ],
    outreach: [
      { channel: 'email', title: 'First-touch introduction', preview: "Hi Jason, we noticed your Data Structures work — quick chat about our engineering intern track?", cta: 'Send email' },
      { channel: 'linkedin', title: 'Connect on LinkedIn', preview: 'Warm the relationship before pitching the internship.', cta: 'Open LinkedIn' },
    ],
    campaigns: [
      { name: 'Cold-source SE Intern nurture', status: 'New', tone: 'gray' },
    ],
    bestChannel: 'LinkedIn first, then email',
    aiSummary: 'Cold prospect. Start with a lightweight LinkedIn connect + note, then follow up with an email invite in a week.',
  },
}

export function getCandidateEngagement(candidate) {
  const override = engagementOverrides[candidate.id]
  if (override) return override
  // Generic fallback keeps every non-applied candidate demo-ready.
  const primarySkill = candidate.skills?.[0] || candidate.course
  return {
    touchpoints: [
      { channel: 'view', label: `Identified in ${candidate.university} sourcing`, date: candidate.appliedDate, note: candidate.evidenceChips?.[0] || 'No engagement yet' },
    ],
    outreach: [
      { channel: 'email', title: `Introduce ${candidate.targetRole} track`, preview: `Hi ${candidate.name.split(' ')[0]}, your ${primarySkill} evidence looks promising — a quick 15-min chat to explore fit?`, cta: 'Send email' },
      { channel: 'assessment', title: 'Send skill checkpoint', preview: `A short ${primarySkill} exercise to validate the signal before scheduling a call.`, cta: 'Send assessment' },
      { channel: 'event', title: 'Invite to upcoming employer event', preview: 'Warm the relationship in a group setting before a 1:1 outreach.', cta: 'Send invite' },
    ],
    campaigns: [
      { name: `${candidate.targetRole} nurture · this quarter`, status: 'Suggested', tone: 'blue' },
    ],
    bestChannel: 'Email · weekday mornings',
    aiSummary: `Passive prospect at the ${candidate.pipelineStage} stage. One warm outreach now can move ${candidate.name.split(' ')[0]} into the Applied pool.`,
  }
}

// ─── Interview progress (applied candidates) ──────────────────────────────
// Round.status: passed | in-progress | scheduled | pending | failed
const interviewOverrides = {
  'ivan-lim': {
    overallScore: 92,
    currentRound: 'Technical deep dive',
    nextStep: { title: 'Technical deep dive with Priya Nair', date: 'May 22, 2025 · 2:00 PM', channel: 'Video call' },
    rounds: [
      {
        id: 'screening',
        name: 'Application screening',
        status: 'passed',
        date: 'May 12, 2025',
        interviewer: 'AI Screening',
        duration: '15 min',
        score: 96,
        summary: 'Evidence pack fully verified — full-stack project, workshop attendance, 4 leadership entries.',
        scores: [
          { label: 'Skill signal', pct: 96 },
          { label: 'Career intent', pct: 92 },
          { label: 'Availability match', pct: 100 },
        ],
        strengths: ['Verified React + Node.js project', 'Attended AI workshop — brand familiarity'],
        concerns: ['Competing offer flagged — respond fast'],
      },
      {
        id: 'first-round',
        name: '1st round · Recruiter chat',
        status: 'passed',
        date: 'May 16, 2025',
        interviewer: 'Sarah Wong · Talent Partner',
        duration: '30 min',
        score: 89,
        summary: 'Strong culture fit and clear motivation. Communicates trade-offs well.',
        scores: [
          { label: 'Communication', pct: 92 },
          { label: 'Motivation', pct: 88 },
          { label: 'Values fit', pct: 87 },
        ],
        strengths: ['Clear articulation of past projects', 'Excited about Acme mission'],
        concerns: ['Wants to understand mentorship structure before committing'],
      },
      {
        id: 'technical',
        name: '2nd round · Technical deep dive',
        status: 'scheduled',
        date: 'May 22, 2025 · 2:00 PM',
        interviewer: 'Priya Nair · Engineering Lead',
        duration: '60 min',
        score: null,
        summary: 'Pair-programming and system design walkthrough on a React + Node scenario.',
        scores: [],
        strengths: [],
        concerns: [],
      },
      { id: 'culture', name: '3rd round · Culture fit panel', status: 'pending', date: '—', interviewer: 'Panel · 3 people', duration: '45 min', score: null, summary: '', scores: [], strengths: [], concerns: [] },
      { id: 'offer', name: 'Offer', status: 'pending', date: '—', interviewer: 'HR + Hiring Manager', duration: '', score: null, summary: '', scores: [], strengths: [], concerns: [] },
    ],
  },
  'marcus-tan': {
    overallScore: 87,
    currentRound: 'Culture fit panel',
    nextStep: { title: 'Culture fit panel', date: 'May 20, 2025 · 4:30 PM', channel: 'On-site · KL office' },
    rounds: [
      {
        id: 'screening',
        name: 'Application screening',
        status: 'passed',
        date: 'May 8, 2025',
        interviewer: 'AI Screening',
        duration: '15 min',
        score: 89,
        summary: 'Strong open-source signal + API design project verified.',
        scores: [{ label: 'Skill signal', pct: 90 }, { label: 'Career intent', pct: 78 }, { label: 'Availability match', pct: 95 }],
        strengths: ['2+ years of OSS contributions', 'Dedicated API design project'],
        concerns: ['Preference for larger-brand employers'],
      },
      {
        id: 'first-round',
        name: '1st round · Recruiter chat',
        status: 'passed',
        date: 'May 13, 2025',
        interviewer: 'Sarah Wong · Talent Partner',
        duration: '30 min',
        score: 84,
        summary: 'Understands Acme scale + mission. Slightly reserved but clear thinker.',
        scores: [{ label: 'Communication', pct: 82 }, { label: 'Motivation', pct: 80 }, { label: 'Values fit', pct: 88 }],
        strengths: ['Structured answers', 'Comfortable owning a module solo'],
        concerns: ['Needs more push on why Acme over larger competitors'],
      },
      {
        id: 'technical',
        name: '2nd round · Technical deep dive',
        status: 'passed',
        date: 'May 17, 2025',
        interviewer: 'Priya Nair · Engineering Lead',
        duration: '60 min',
        score: 88,
        summary: 'Clean API design and thoughtful trade-off discussion. A bit slow under time pressure.',
        scores: [{ label: 'System design', pct: 90 }, { label: 'Code quality', pct: 92 }, { label: 'Debugging', pct: 78 }],
        strengths: ['Excellent OSS-quality code style', 'Explains trade-offs clearly'],
        concerns: ['Debugging under time pressure needs practice'],
      },
      {
        id: 'culture',
        name: '3rd round · Culture fit panel',
        status: 'in-progress',
        date: 'May 20, 2025 · 4:30 PM',
        interviewer: 'Panel · 3 people',
        duration: '45 min',
        score: null,
        summary: 'Meet-the-team round with two engineers + one product partner.',
        scores: [],
        strengths: [],
        concerns: [],
      },
      { id: 'offer', name: 'Offer', status: 'pending', date: '—', interviewer: 'HR + Hiring Manager', duration: '', score: null, summary: '', scores: [], strengths: [], concerns: [] },
    ],
  },
}

export function getCandidateInterviewProgress(candidate) {
  const override = interviewOverrides[candidate.id]
  if (override) return override
  // Fallback: derive a plausible progression from pipelineStage so every
  // applied candidate has a usable interview timeline in the demo.
  const stage = candidate.pipelineStage
  const base = [
    { id: 'screening',   name: 'Application screening',       date: candidate.appliedDate,       interviewer: 'AI Screening',                 duration: '15 min' },
    { id: 'first-round', name: '1st round · Recruiter chat',  date: '—',                          interviewer: 'Sarah Wong · Talent Partner',  duration: '30 min' },
    { id: 'technical',   name: '2nd round · Technical deep dive', date: '—',                     interviewer: 'Priya Nair · Engineering Lead', duration: '60 min' },
    { id: 'culture',     name: '3rd round · Culture fit panel', date: '—',                        interviewer: 'Panel · 3 people',             duration: '45 min' },
    { id: 'offer',       name: 'Offer',                        date: '—',                          interviewer: 'HR + Hiring Manager',          duration: '' },
  ]
  const orderByStage = { Shortlisted: 1, 'In Process': 3, Hired: 5 }
  const doneCount = orderByStage[stage] ?? 1
  const rounds = base.map((r, i) => {
    if (i < doneCount) {
      return { ...r, status: 'passed', score: Math.max(70, candidate.matchScore - i * 3), summary: 'Solid performance — passed to the next round.', scores: [], strengths: [], concerns: [] }
    }
    if (i === doneCount) return { ...r, status: doneCount === 5 ? 'passed' : 'in-progress', score: null, summary: 'Currently at this stage.', scores: [], strengths: [], concerns: [] }
    return { ...r, status: 'pending', score: null, summary: '', scores: [], strengths: [], concerns: [] }
  })
  const scored = rounds.filter((r) => typeof r.score === 'number')
  const overallScore = scored.length ? Math.round(scored.reduce((a, r) => a + r.score, 0) / scored.length) : candidate.matchScore
  const current = rounds.find((r) => r.status === 'in-progress') || rounds[rounds.length - 1]
  return {
    overallScore,
    currentRound: current?.name || 'Screening',
    nextStep: { title: current?.name, date: current?.date, channel: 'Video call' },
    rounds,
  }
}

// Generates a reasonable detail record for candidates without bespoke copy above,
// so every candidate in the directory has a working detail view.
export function getCandidateDetail(candidate) {
  if (candidateDetails[candidate.id]) return candidateDetails[candidate.id]

  return {
    narrative: `${candidate.name} is a ${candidate.year} ${candidate.course} student at ${candidate.university}, currently tracked for the ${candidate.targetRole}. Career Memory evidence shows ${candidate.evidenceChips[0]?.toLowerCase() || 'early but promising signals'} relevant to this role.`,
    selfDiscovery: [
      { icon: 'zap', tone: 'blue', title: 'Profile in progress', detail: 'Self-Discovery assessment not yet completed' },
    ],
    selfDiscoverySummary: 'Encourage this candidate to complete their Self-Discovery assessment for deeper work-style signals.',
    careerMemory: candidate.evidenceChips.slice(0, 3).map((chip, i) => ({
      title: chip,
      date: '2024–2025',
      verified: !chip.toLowerCase().includes('no contact') && !chip.toLowerCase().includes('not yet'),
      tags: [candidate.skills[i % candidate.skills.length] || candidate.course],
      signal: 3,
    })),
    whatToValidate: [candidate.validateNext, 'Confirm availability and timeline', 'Assess team fit in interview'],
    retentionConditions: 'Not yet assessed — gather more signal before making an offer',
    retentionRisk: candidate.matchScore >= 85 ? 'LOW' : 'MEDIUM',
  }
}

// ─── Job openings a candidate suits ───────────────────────────────────────
// Openings come from the Talent Discovery postings board. The role a candidate
// is tracked for is always the primary fit; other openings are suggested when
// their skills overlap the opening's focus areas.
const OPENING_FOCUS = {
  'swe-intern': ['react', 'node', 'backend', 'frontend', 'api', 'system design', 'javascript', 'open source', 'ui/ux', 'software'],
  'data-analyst-intern': ['sql', 'python', 'power bi', 'excel', 'tableau', 'data', 'analytics', 'dashboard'],
  'ai-data-challenge': ['python', 'machine learning', 'ml', 'nlp', 'ai', 'data', 'model'],
  'backend-workshop': ['communication', 'marketing', 'sales', 'stakeholder', 'presentation', 'business'],
}

export function getMatchingOpenings(candidate) {
  if (!candidate) return []
  const skills = (candidate.skills || []).map((skill) => skill.toLowerCase())
  const course = (candidate.course || '').toLowerCase()

  return postings
    .map((posting) => {
      const primary = posting.title === candidate.targetRole
      const focus = OPENING_FOCUS[posting.id] || []
      const overlap = focus.filter((term) => skills.some((skill) => skill.includes(term) || term.includes(skill)) || course.includes(term))
      if (!primary && overlap.length === 0) return null

      // Primary opening keeps the candidate's headline score; secondary
      // openings are discounted by how little of the focus they cover.
      const fit = primary
        ? candidate.matchScore
        : Math.max(52, Math.round(candidate.matchScore - 14 + Math.min(overlap.length, 3) * 3))

      return {
        id: posting.id,
        title: posting.title,
        company: posting.company,
        location: posting.location,
        badge: posting.badge,
        deadline: posting.deadlineLabel?.replace('Deadline: ', '') || '',
        primary,
        fit,
        overlap: overlap.slice(0, 3),
      }
    })
    .filter(Boolean)
    .sort((a, b) => (b.primary ? 1 : 0) - (a.primary ? 1 : 0) || b.fit - a.fit)
}

// ─── Why this candidate is recommended ────────────────────────────────────
// Plain-language reasons an HR user can act on, assembled from the same
// signals the match score is built from.
export function getRecommendationReasons(candidate, detail) {
  if (!candidate) return []
  const first = candidate.name.split(' ')[0]
  const openings = getMatchingOpenings(candidate)
  const primaryOpening = openings.find((o) => o.primary) || openings[0]
  const verified = (detail?.careerMemory || []).filter((entry) => entry.verified).length
  const reasons = []

  reasons.push({
    id: 'match',
    tone: 'blue',
    title: `${candidate.matchScore}% match for ${primaryOpening ? primaryOpening.title : candidate.targetRole}`,
    detail: `${candidate.matchLabel} against the role requirements — scored on skills evidence, availability, and career intent rather than CV keywords.`,
  })

  if (candidate.evidenceChips?.length) {
    reasons.push({
      id: 'evidence',
      tone: 'green',
      title: 'Claims are backed by verified evidence',
      detail: `${candidate.evidenceChips.slice(0, 3).join(' · ')}${verified ? ` — ${verified} Career Memory entries verified by CareerOS.` : '.'}`,
    })
  }

  if (candidate.skills?.length) {
    reasons.push({
      id: 'skills',
      tone: 'purple',
      title: `Core skills line up: ${candidate.skills.slice(0, 3).join(', ')}`,
      detail: `${first} is a ${candidate.year} ${candidate.course} student at ${candidate.university}, so these skills are current rather than historical.`,
    })
  }

  if (openings.length > 1) {
    reasons.push({
      id: 'coverage',
      tone: 'blue',
      title: `Suits ${openings.length} of your open roles`,
      detail: `Beyond ${primaryOpening.title}, ${first} also fits ${openings.filter((o) => !o.primary).map((o) => o.title).join(' and ')} — useful if the primary req closes.`,
    })
  }

  if (candidate.validateNext) {
    reasons.push({
      id: 'validate',
      tone: 'amber',
      title: `Worth checking: ${candidate.validateNext}`,
      detail: `Risk noted by CareerOS: ${candidate.risk || 'none flagged'}. Validate this in the next conversation before committing.`,
    })
  }

  return reasons
}
