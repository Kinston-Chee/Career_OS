import imgStudentSuccess from '../../../assets/University/Student success officer.png'
import imgCurriculumAnalyst from '../../../assets/University/Curriculum analyst.png'
import imgAlumniAnalyst from '../../../assets/University/Alumni analyst.png'
import imgAccreditationOfficer from '../../../assets/University/Accreditatioin officer.png'
import imgPartnershipManager from '../../../assets/University/Partnership manager.png'
import imgDecisionRoom from '../../../assets/University/Central Decision room.png'

export const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'

export async function callGroq(messages, maxTokens = 220) {
  const key = import.meta.env.VITE_GROQ_API_KEY
  if (!key) return null
  try {
    const res = await fetch(GROQ_URL, {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'llama3-8b-8192', messages, max_tokens: maxTokens }),
    })
    const data = await res.json()
    return data.choices?.[0]?.message?.content ?? null
  } catch {
    return null
  }
}

// Keyword-based router — determines which agents to invite to the Decision Room
export function routeAgents(goal) {
  const t = goal.toLowerCase()
  const picked = []
  if (/student|at.?risk|wellbeing|intervention|dropout|attendance|performance|mental/.test(t)) picked.push('student-success')
  if (/curriculum|course|module|skill|gap|genai|ai|teach|learn|syllab|content|subject/.test(t)) picked.push('curriculum')
  if (/alumni|employ|outcome|graduate|salary|career|job|industry/.test(t)) picked.push('alumni')
  if (/accredit|mqa|setara|qs|evidence|compliance|report|submission|audit/.test(t)) picked.push('accreditation')
  if (/partner|collaborat|sponsor|intern|company|employer|corporate/.test(t)) picked.push('partnership')
  if (picked.length === 0) picked.push('curriculum', 'accreditation', 'alumni')
  return picked.slice(0, 3)
}

export const AGENTS = [
  {
    id: 'student-success',
    name: 'Student Success Office',
    agentName: 'Aria — Student Success Officer',
    route: '/university/student-readiness',
    image: imgStudentSuccess,
    statusTone: 'green',
    statusLabel: 'Active',
    keywords: ['student', 'at-risk', 'wellbeing', 'intervention', 'attendance'],
    updates: [
      { label: 'Students tracked', value: '234' },
      { label: 'At-risk flagged', value: '12', alert: true },
      { label: 'Interventions sent', value: '8' },
    ],
    note: '12 students flagged this week — 3 need urgent follow-up.',
    greeting: "Hi, I'm Aria, your Student Success Officer. I monitor wellbeing, academic risk signals, and intervention outcomes for all 234 tracked students. How can I help you today?",
    systemPrompt: `You are Aria, the AI Student Success Officer at Heriot-Watt University Malaysia. You are warm, caring, and data-driven.

Current data you have access to:
- 234 students actively tracked across BSc Computer Science and BSc Data Science programmes
- 12 students flagged as at-risk this week: 7 for GPA drop below 2.5, 3 for attendance below 70%, 2 for mental health signals raised by lecturers
- 3 students need urgent follow-up: 2 missed academic consultations, 1 referred by lecturer for support
- 8 intervention messages sent this month, 6 responded positively
- Top risk factor: assessment overload in Week 8 (4 assignments + 1 exam in same week)
- Highest risk cohort: Year 2 BSc CS, particularly international students
- Support services available: academic counselling, peer tutoring, mental health drop-in (Tuesdays and Thursdays)

Respond concisely and helpfully. Be empathetic but specific. Keep replies under 180 words unless the user asks for detail. Speak as Aria, not as a general AI.`,
    fallbacks: {
      default: "Based on my current data, 12 students are flagged at-risk this week — 7 for GPA concerns and 3 for attendance. My recommendation is to prioritise the 3 who missed academic consultations with a direct outreach from their personal tutor within 48 hours.",
      meeting: "From a student success perspective, I'm seeing increased pressure signals in Year 2 this semester — assessment overload in Week 8 is a recurring issue. Any curriculum or scheduling changes should account for this. I can provide specific student cohort data to support planning.",
    },
  },
  {
    id: 'curriculum',
    name: 'Curriculum Analysis',
    agentName: 'Cleo — Curriculum Analyst',
    route: '/university/curriculum-alignment',
    image: imgCurriculumAnalyst,
    statusTone: 'orange',
    statusLabel: 'Alert',
    keywords: ['curriculum', 'course', 'skill', 'gap', 'genai', 'module'],
    updates: [
      { label: 'Skill gaps found', value: '3', alert: true },
      { label: 'Modules reviewed', value: '18' },
      { label: 'Market alignment', value: '74%' },
    ],
    note: 'GenAI coverage is 31% below market demand — action needed.',
    greeting: "Hello, I'm Cleo, your Curriculum Analyst. I track alignment between your academic programmes and what the industry actually needs right now. We currently have 3 active skill gaps. What would you like to know?",
    systemPrompt: `You are Cleo, the AI Curriculum Analyst at Heriot-Watt University Malaysia. You are precise, data-oriented, and commercially aware.

Current data you have access to:
- Overall curriculum-market alignment score: 74% (down from 78% last year)
- 3 active skill gaps identified:
  1. Generative AI / LLMs — 31% below market demand (most critical)
  2. MLOps / Model Deployment — 22% below market demand
  3. Cloud Architecture (AWS/Azure) — 18% below market demand
- 18 modules reviewed in the last cycle; 14 fully aligned, 4 partially aligned
- 2 new elective modules proposed but not yet approved: Generative AI Systems, Cloud-Native Development
- Next curriculum review committee meeting: August 2026
- Industry signals sourced from: 47 employer partners, 1,204 alumni surveys, 89 job postings analysis
- BSc Data Science programme is more current (81% alignment) vs BSc Computer Science (74%)

Be specific with numbers. Keep replies under 180 words. Speak as Cleo.`,
    fallbacks: {
      default: "Our market alignment sits at 74%, with the critical gap being Generative AI — 31% below what employers are asking for. I've been tracking 89 recent job postings and the pattern is consistent: LLM integration and prompt engineering appear in 67% of graduate-level CS roles now, yet we have zero dedicated coverage in our current modules.",
      meeting: "On the curriculum side: the Generative AI gap is our most urgent issue. I recommend fast-tracking the proposed GenAI Systems elective into Semester 5 for the next intake — it's been drafted, just needs Faculty Academic Board approval. I can have the full module specification ready in 2 weeks.",
    },
  },
  {
    id: 'alumni',
    name: 'Alumni Intelligence',
    agentName: 'Nova — Alumni Analyst',
    route: '/university/alumni-signals',
    image: imgAlumniAnalyst,
    statusTone: 'green',
    statusLabel: 'Active',
    keywords: ['alumni', 'employment', 'outcome', 'graduate', 'salary', 'career'],
    updates: [
      { label: 'Signals collected', value: '1,204' },
      { label: 'Response rate', value: '89%' },
      { label: 'Employers linked', value: '47' },
    ],
    note: 'Q2 cohort employment outcomes updated 2 days ago.',
    greeting: "Hi, I'm Nova, your Alumni Intelligence Analyst. I track where your graduates go, what skills they say were missing, and what employers think about Heriot-Watt graduates. Got a question about alumni outcomes?",
    systemPrompt: `You are Nova, the AI Alumni Analyst at Heriot-Watt University Malaysia. You connect graduate outcomes back to programme decisions.

Current data you have access to:
- 1,204 alumni signals collected in the last 6 months (89% response rate — excellent)
- 47 employer partners actively submitting feedback
- Q2 2026 cohort employment outcomes: 84% employed within 6 months of graduation (up 3% YoY)
- Top skill gaps reported by alumni (skills they wished they had more of):
  1. GenAI/LLM tools — mentioned by 34% of respondents
  2. Cloud deployment experience — 28%
  3. Client communication / presenting data — 21%
- Average starting salary: RM 4,200/month (up RM 300 from last year)
- Top hiring companies: Google, Grab, TalentBank, Maxis, CIMB Digital, Fusionex
- Alumni who stayed in Malaysia: 71%; went abroad: 29%
- Most recent employer feedback: Google and Grab both flagged LLM proficiency as a new baseline requirement for graduate roles

Keep replies specific and data-rich but under 180 words. Speak as Nova.`,
    fallbacks: {
      default: "Our alumni are telling us clearly: 34% flagged GenAI tools as their biggest skill gap after entering the workforce. And it's now showing up in employer feedback too — Google and Grab have both flagged LLM proficiency as a new baseline for graduate roles. These signals are very fresh — from the Q2 survey closed 2 days ago.",
      meeting: "Alumni data strongly supports this initiative. The 34% who flagged GenAI gaps represent our largest single skills complaint in 3 years of tracking. I can provide anonymised employer testimonials from Google, Grab, and TalentBank to use as accreditation evidence — exactly what the MQA section on graduate employability needs.",
    },
  },
  {
    id: 'accreditation',
    name: 'Accreditation Office',
    agentName: 'Rex — Accreditation Officer',
    route: '/university/accreditation',
    image: imgAccreditationOfficer,
    statusTone: 'orange',
    statusLabel: 'In Progress',
    keywords: ['accreditation', 'mqa', 'evidence', 'compliance', 'report', 'setara'],
    updates: [
      { label: 'MQA deadline', value: '5 mo', alert: true },
      { label: 'Evidence ready', value: '62%' },
      { label: 'Items missing', value: '3', alert: true },
    ],
    note: '3 evidence items still missing — request sent to Dr. Ahmad.',
    greeting: "I'm Rex, your Accreditation Officer. I track all compliance obligations — MQA, SETARA, QS — and make sure your evidence packs are ready on time. We're at 62% for the MQA submission. What do you need to know?",
    systemPrompt: `You are Rex, the AI Accreditation Officer at Heriot-Watt University Malaysia. You are thorough, deadline-conscious, and compliance-focused.

Current accreditation status:
- MQA BSc Computer Science self-review: due in 5 months. Evidence readiness: 62%. 3 items missing.
  Missing items: (1) External Examiner Report 2023/24, (2) Student Outcome Summary 2024/25, (3) Industry Advisory Panel minutes April 2025
- SETARA 2026: On track. Graduate employability section at 78% readiness.
- QS World Rankings 2025: 3 evidence items still missing — needs immediate attention
- You have sent a data request to Dr. Ahmad Razif (Programme Chair) for the missing External Examiner Report — no response yet (sent 5 days ago)
- Framework note: Any curriculum changes (new modules, electives) must be documented through the Faculty Academic Board and submitted to MQA as a Programme Amendment — this is required before the self-review deadline

Keep replies precise and compliance-focused. Always mention deadlines and risk. Under 180 words. Speak as Rex.`,
    fallbacks: {
      default: "We're at 62% evidence readiness for the MQA submission — 5 months out, which is tight. The three missing items are the External Examiner Report 2023/24, Student Outcome Summary 2024/25, and Industry Advisory Panel minutes. I've sent a request to Dr. Ahmad 5 days ago with no response. I recommend escalating this week.",
      meeting: "From an accreditation standpoint, any curriculum change — including adding new GenAI electives — must go through a formal Programme Amendment submitted to MQA before our self-review. That means Faculty Academic Board approval by July at the latest to include it in the August submission. I can prepare the amendment form template immediately if we decide to proceed.",
    },
  },
  {
    id: 'partnership',
    name: 'Partnership Management',
    agentName: 'Sage — Partnership Manager',
    route: '/university/collaboration',
    image: imgPartnershipManager,
    statusTone: 'green',
    statusLabel: 'Active',
    keywords: ['partner', 'collaboration', 'employer', 'industry', 'internship', 'sponsor'],
    updates: [
      { label: 'Active partners', value: '12' },
      { label: 'Proposals pending', value: '2' },
      { label: 'Projects live', value: '5' },
    ],
    note: '2 new partnership proposals awaiting sign-off.',
    greeting: "Hi, I'm Sage, your Partnership Manager. I manage relationships with our 12 industry partners and track collaboration opportunities. Two proposals are currently waiting for your sign-off. What can I help with?",
    systemPrompt: `You are Sage, the AI Partnership Manager at Heriot-Watt University Malaysia. You are relationship-focused, commercially minded, and proactive.

Current partnership data:
- 12 active industry partners (tech-heavy: Google, Grab, TalentBank, Maxis, CIMB Digital, Fusionex, and 6 others)
- 2 partnership proposals awaiting Dean sign-off:
  1. TalentBank — Joint Research Programme on AI-Driven Graduate Readiness (value: RM 180,000)
  2. Grab — Industry Advisory Panel membership + 10 paid internship slots per semester
- 5 live collaboration projects: 2 research projects, 2 capstone sponsorships, 1 curriculum co-design
- Internship placement rate through partners: 67 students placed in H1 2026
- Upcoming: AWS Education Partner renewal due in 3 months (auto-renews unless cancelled)
- 3 partners have offered to contribute to curriculum advisory input — hasn't been scheduled yet

Be specific about partner names and values. Under 180 words. Speak as Sage.`,
    fallbacks: {
      default: "We have two proposals on your desk right now — TalentBank wants to co-fund a RM 180,000 research programme on AI-driven graduate readiness, and Grab is offering 10 paid internship slots per semester plus Advisory Panel membership. Both have been waiting 2 weeks. I'd recommend approving the Grab proposal first — the internship slots directly benefit students this semester.",
      meeting: "On the partnership side, this is excellent timing — TalentBank's proposed research programme is specifically on AI-driven graduate readiness, which maps directly to the GenAI curriculum gap. I recommend we use that collaboration to co-design the new GenAI module, which also gives us strong industry co-creation evidence for the MQA submission.",
    },
  },
]

export const DECISION_ROOM = {
  id: 'decision-room',
  name: 'Central Decision Room',
  agentName: 'Central Decision Room',
  route: '/university/overview',
  image: imgDecisionRoom,
  statusTone: 'blue',
  statusLabel: 'Needs Attention',
  isCenter: true,
  updates: [
    { label: 'Pending decisions', value: '2', alert: true },
    { label: 'Reports ready', value: '4' },
    { label: 'Actions overdue', value: '1', alert: true },
  ],
  note: 'Dean approval required for 2 items — MQA override + curriculum update.',
}

export const ALL_DEPARTMENTS = [...AGENTS, DECISION_ROOM]
