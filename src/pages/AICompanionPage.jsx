import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ArrowRight, CheckCircle2, MessageCircle, MessageSquarePlus, PanelRightClose, PanelRightOpen, Search, Send, Sparkles, Target } from 'lucide-react'
import HomeTopNav from '../components/home/HomeTopNav'
import TypewriterText from '../components/ui/TypewriterText'
import InterviewPracticeDashboard from '../components/interviewPractice/InterviewPracticeDashboard'
import VoiceInterviewSession from '../components/interviewPractice/VoiceInterviewSession'
import { candidateOverview, mockUser } from '../data/mockData'

const STARTER_MESSAGE =
  "Hi Chris - I'm your CareerOS companion. I can help you decide what to do next, improve your profile, prepare for interviews, and find better opportunities."

const NEW_CHAT_ID = 'new-chat'

// Mock past conversations for the history rail. Each stores a snapshot of the
// messages it should reload when clicked. Wired to local state — no backend.
const INITIAL_CHAT_HISTORY = [
  {
    id: 'hist-1',
    title: 'TalentBank AI Challenge fit',
    preview: 'Why is TalentBank AI Challenge a good match for me?',
    updatedLabel: 'Yesterday',
    messages: [
      { id: 'h1-1', role: 'robot', type: 'text', text: STARTER_MESSAGE },
      { id: 'h1-2', role: 'user', type: 'text', text: 'Why is TalentBank AI Challenge a good match for me?' },
      { id: 'h1-3', role: 'robot', type: 'text', text: 'TalentBank AI Challenge matches you because it connects directly to your strongest current signals: NLP, Python, problem-solving, and initiative.\n\nYour Career Memory shows technical depth from your NLP work and execution speed from your hackathon experience. The main gap is evidence — add a GitHub link and short summary before applying.' },
    ],
  },
  {
    id: 'hist-2',
    title: 'Weekly opportunities scan',
    preview: 'Find me the best opportunities this week.',
    updatedLabel: '2 days ago',
    messages: [
      { id: 'h2-1', role: 'robot', type: 'text', text: STARTER_MESSAGE },
      { id: 'h2-2', role: 'user', type: 'text', text: 'Find me the best opportunities this week.' },
      { id: 'h2-3', role: 'robot', type: 'text', text: 'I found 3 opportunities worth your attention this week — ranked by match, urgency, and career-signal lift.' },
    ],
  },
  {
    id: 'hist-3',
    title: 'AI intern roadmap',
    preview: 'Help me build a plan to become a stronger AI intern candidate.',
    updatedLabel: 'Last week',
    messages: [
      { id: 'h3-1', role: 'robot', type: 'text', text: STARTER_MESSAGE },
      { id: 'h3-2', role: 'user', type: 'text', text: 'Help me build a plan to become a stronger AI intern candidate.' },
      { id: 'h3-3', role: 'robot', type: 'text', text: "Here's a 6-week plan built around your NLP strength, hackathon proof, and current evidence gap. Start with evidence, then applications, then interview prep." },
    ],
  },
  {
    id: 'hist-4',
    title: 'Which experiences carry me?',
    preview: 'Which of my experiences are helping my profile the most?',
    updatedLabel: 'Last week',
    messages: [
      { id: 'h4-1', role: 'robot', type: 'text', text: STARTER_MESSAGE },
      { id: 'h4-2', role: 'user', type: 'text', text: 'Which of my experiences are helping my profile the most?' },
      { id: 'h4-3', role: 'robot', type: 'text', text: 'Your strongest signal comes from three experiences: your Grab internship, your Top-3 hackathon finish, and your VP role at Taylor Computing Society. Together they show initiative + technical depth.' },
    ],
  },
]

const PROMPTS = [
  'What should I focus on today?',
  'Why is TalentBank AI Challenge a good match for me?',
  'Find me the best opportunities this week.',
  'Which of my experiences are helping my profile the most?',
  'Help me build a plan to become a stronger AI intern candidate.',
]

const RESPONSE_LIBRARY = {
  focus: {
    type: 'text',
    text: 'Today, I would focus on three things:\n\n1. Apply to the TalentBank AI Challenge first. It has a 92% match and the deadline is in 2 days.\n2. Add evidence to your NLP project in Career Memory, because employers are already responding to your NLP signal.\n3. Spend 10 minutes practising interview answers for your Grab Data Analyst interview.\n\nIf you only do one thing, start with TalentBank.',
  },
  talentbank: {
    type: 'text',
    text: 'TalentBank AI Challenge matches you because it connects directly to your strongest current signals: NLP, Python, problem-solving, and initiative.\n\nYour Career Memory shows that you have technical depth from your NLP work and execution speed from your hackathon experience. That makes this challenge a strong chance to turn your profile into visible proof.\n\nThe main gap is evidence. Before applying, I recommend adding a GitHub link, short project summary, or screenshot to your NLP project.',
  },
  opportunities: {
    type: 'opportunity_recommendations',
    text: 'I found 3 opportunities that are worth your attention this week. I ranked them based on match score, urgency, and how much they strengthen your career signal.',
    data: [
      ['TalentBank AI Challenge', 'TalentBank', '92%', '2 days', 'Strengthens your NLP + AI project signal.', 'Apply today after adding project evidence.', 'Apply now'],
      ['ByteDance SWE Intern', 'ByteDance', '91%', '3 days', 'Good fit for software engineering direction.', 'Prepare one React/project story.', 'View details'],
      ['Shopee Product Intern', 'Shopee', '86%', '5 days', 'Good bridge between analytics and product thinking.', 'Use your hackathon finalist story.', 'Save opportunity'],
    ],
  },
  signals: {
    type: 'career_signal_map',
    text: 'Your strongest profile signal currently comes from three experiences. They work together to position you as an initiative-driven candidate with growing technical depth.',
    data: [
      {
        title: 'Software Engineering Intern - Grab',
        strength: 88,
        signals: ['Real workplace exposure', 'React experience', 'Agile collaboration', 'Software engineering direction'],
        insight: 'This is your strongest credibility proof for software engineering roles.',
        bars: [['Technical Depth', 90], ['Leadership', 65], ['Problem Solving', 78], ['Employer Relevance', 92]],
      },
      {
        title: 'Hackathon - Top 3 Finalist',
        strength: 82,
        signals: ['Problem solving', 'Fast execution', 'Presentation', 'Product thinking'],
        insight: 'This supports startup-style roles, AI challenges, and product-oriented internships.',
        bars: [['Technical Depth', 72], ['Leadership', 70], ['Problem Solving', 94], ['Employer Relevance', 80]],
      },
      {
        title: "Vice President - Taylor's Computing Society",
        strength: 76,
        signals: ['Leadership', 'Initiative', 'Event coordination', 'Community building'],
        insight: 'This explains your initiative-driven self-discovery profile.',
        bars: [['Technical Depth', 45], ['Leadership', 95], ['Problem Solving', 70], ['Employer Relevance', 74]],
      },
    ],
  },
  roadmap: {
    type: 'ai_intern_roadmap',
    text: 'Here is a 6-week plan to strengthen your AI internship profile. I designed it around your current profile: NLP is already strong, but you need stronger evidence, interview readiness, and application momentum.',
    data: [
      ['Week 1', 'Strengthen evidence', 'Add GitHub link, screenshots, and project summary to your NLP project.', 'Your Career Memory becomes more credible to employers.'],
      ['Week 2', 'Apply to high-match opportunities', 'Apply to TalentBank AI Challenge and ByteDance SWE Intern.', 'Turn profile signals into real applications.'],
      ['Week 3', 'Interview foundation', 'Practise Python, ML basics, and project explanation.', 'Become ready for AI/software intern screening.'],
      ['Week 4', 'Build one mini AI proof', 'Create a small NLP demo or chatbot classifier.', 'Add a second AI project signal.'],
      ['Week 5', 'Employer narrative', 'Refine your Career Narrative and connect leadership + technical proof.', 'Employers understand your direction faster.'],
      ['Week 6', 'Review and repeat', 'Check application tracker, improve weak points, and apply to 3 more roles.', 'Better conversion from viewed profile to interview.'],
    ],
  },
  default: {
    type: 'text',
    text: 'I can help with opportunities, applications, Career Memory, interview preparation, and profile improvement. Try asking me to find opportunities, review your experiences, or build a plan.',
  },
}

const THINKING_STEPS = {
  opportunity_recommendations: [
    'Checking your Career Memory signals...',
    'Comparing opportunities against your NLP, Python, and software signals...',
    'Sorting by match score, urgency, and deadline...',
    'Building your top opportunity shortlist...',
  ],
  career_signal_map: [
    'Reading your Career Memory timeline...',
    'Extracting skills, evidence, and employer relevance from each experience...',
    'Scoring technical depth, leadership, problem solving, and employer relevance...',
    'Creating your Career Signal Map...',
  ],
  ai_intern_roadmap: [
    'Reviewing your current strengths and gaps...',
    'Checking your strongest signals: NLP, Python, leadership, and hackathon experience...',
    'Mapping actions across evidence, applications, interviews, and portfolio building...',
    'Generating a 6-week AI internship readiness roadmap...',
  ],
}

function withConfig(response) {
  const isVisual = response.type !== 'text'
  return {
    responseType: response.type,
    text: response.text,
    data: response.data,
    isVisual,
    thinkingSteps: isVisual ? THINKING_STEPS[response.type] : ['Sure - let me think through the best next step for you...'],
  }
}

// ─── FastAPI backend integration ─────────────────────────────────────
//
// ┌───────────────────────────────────────────────────────────────────┐
// │ WHERE TO PUT THINGS                                               │
// ├───────────────────────────────────────────────────────────────────┤
// │ 1. Base URL of your FastAPI server:                               │
// │      Create a `.env` file at the project root with               │
// │        VITE_COMPANION_API_BASE_URL=http://localhost:8000         │
// │      (any value you set here overrides the fallback below)      │
// │                                                                   │
// │ 2. Route path on your FastAPI server:                             │
// │      Change `COMPANION_CHAT_PATH` below if your route differs.   │
// │                                                                   │
// │ 3. What your FastAPI must accept + return:                        │
// │      See REQUEST_SCHEMA and RESPONSE_SCHEMA constants below.     │
// │                                                                   │
// │ 4. When VITE_COMPANION_API_BASE_URL is NOT set, the page falls   │
// │    back to the local mock library so the demo still works.       │
// └───────────────────────────────────────────────────────────────────┘
//
// ─── FastAPI route example (Python) ──────────────────────────────────
// @app.post("/api/companion/chat")
// async def chat(payload: ChatRequest) -> ChatResponse:
//     # payload.prompt  -> str, latest user message
//     # payload.history -> list[{"role": "user"|"assistant", "content": str}]
//     # Call your LLM here and return one of the four `type` shapes.
//     return {"type": "text", "text": "..."}

// const COMPANION_API_BASE_URL = import.meta.env.VITE_COMPANION_API_BASE_URL ?? ''
const COMPANION_API_BASE_URL = 'http://127.0.0.1:8001/'
const COMPANION_CHAT_PATH = 'api/candidates/chat'
const COMPANION_TIMEOUT_MS = 20000

// ─── Contract with your FastAPI (documented in code so it's obvious) ─
//
// REQUEST — what the frontend POSTs:
//   {
//     "prompt":  "What should I focus on today?",
//     "history": [
//       { "role": "user",      "content": "..." },
//       { "role": "assistant", "content": "..." }
//     ]
//   }
//
// RESPONSE — return ONE of these four shapes (JSON, HTTP 200):
//
//   1) Plain text bubble (renders as a normal chat message):
//      { "type": "text", "text": "<answer>" }
//
//   2) Opportunity recommendations (renders as 3-card grid):
//      { "type": "opportunity_recommendations",
//        "text": "<one-line summary>",
//        "data": [
//          ["<title>", "<company>", "<match%>",
//           "<deadline>", "<why it fits>", "<what to prepare>", "<CTA label>"]
//        ] }
//
//   3) Career signal map (renders as evidence cards with bars):
//      { "type": "career_signal_map",
//        "text": "<summary>",
//        "data": [
//          { "title": "<experience>", "strength": 0-100,
//            "signals": ["..."], "insight": "<one line>",
//            "bars": [
//              ["Technical Depth",     0-100],
//              ["Leadership",          0-100],
//              ["Problem Solving",     0-100],
//              ["Employer Relevance",  0-100]
//            ] }
//        ] }
//
//   4) Multi-week roadmap (renders as timeline steps):
//      { "type": "ai_intern_roadmap",
//        "text": "<intro>",
//        "data": [ ["<Week X>", "<title>", "<action>", "<outcome>"] ] }
//
// Anything else that comes back is coerced into a plain text bubble.

function isBackendConfigured() {
  return Boolean(COMPANION_API_BASE_URL)
}

// Coerces the FastAPI response payload into the shape the chat UI renders.
// If the response is malformed or a field is missing, falls back to a
// plain text bubble so we never crash the UI on a bad payload.
function normaliseCompanionResponse(raw) {
  if (!raw || typeof raw !== 'object') {
    return withConfig({ type: 'text', text: typeof raw === 'string' ? raw : RESPONSE_LIBRARY.default.text })
  }
  const type = raw.type
  const text = typeof raw.text === 'string' ? raw.text : ''
  if (type === 'text' && text) return withConfig({ type: 'text', text })
  if (type === 'opportunity_recommendations' && Array.isArray(raw.data)) {
    return withConfig({ type: 'opportunity_recommendations', text: text || 'Here are some opportunities to consider.', data: raw.data })
  }
  if (type === 'career_signal_map' && Array.isArray(raw.data)) {
    return withConfig({ type: 'career_signal_map', text: text || 'Here is your current career signal map.', data: raw.data })
  }
  if (type === 'ai_intern_roadmap' && Array.isArray(raw.data)) {
    return withConfig({ type: 'ai_intern_roadmap', text: text || 'Here is a plan for the weeks ahead.', data: raw.data })
  }
  return withConfig({ type: 'text', text: text || RESPONSE_LIBRARY.default.text })
}

// Calls your FastAPI and returns the same `{ responseType, text, data, isVisual,
// thinkingSteps }` shape sendMessage already consumes. On any failure
// (missing base URL, network error, malformed response, or non-2xx), it
// silently falls back to the local mock library so the chat keeps working.
async function fetchCompanionResponse(prompt, history = []) {
  if (!isBackendConfigured()) {
    return getResponseForPrompt(prompt)
  }

  const controller = new AbortController()
  const timeoutId = window.setTimeout(() => controller.abort(), COMPANION_TIMEOUT_MS)

  try {
    // Only send real text turns; drop thinking bubbles and visual payloads.
    const conversationHistory = history
      .filter((msg) => msg.type === 'text' && typeof msg.text === 'string')
      .slice(-8) // stay under context limits
      .map((msg) => ({
        role: msg.role === 'robot' ? 'assistant' : 'user',
        content: msg.text,
      }))

    const response = await fetch(`${COMPANION_API_BASE_URL}${COMPANION_CHAT_PATH}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt
      }),
      signal: controller.signal,
    })

    if (!response.ok) throw new Error(`Companion API failed: ${response.status}`)

    // FastAPI returns the response object directly (not wrapped in
    // OpenAI-style `choices[]`). Normalise it into a UI-safe shape.
    const payload = await response.json()
    // const [text, data] = payload
    return normaliseCompanionResponse(payload.reply)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn('[AICompanionPage] Companion API call failed, falling back to mock:', error)
    return getResponseForPrompt(prompt)
  } finally {
    window.clearTimeout(timeoutId)
  }
}

function getResponseForPrompt(text) {
  const q = text.toLowerCase().trim()
  if (
    q.includes('focus on today') ||
    q.includes('focus today') ||
    q.includes('what should i focus') ||
    q.includes('what should i do today') ||
    q.includes('what should i do first') ||
    q.includes('next step') ||
    q === 'today'
  ) return withConfig(RESPONSE_LIBRARY.focus)
  if (q.includes('talentbank') && (q.includes('match') || q.includes('good') || q.includes('why'))) return withConfig(RESPONSE_LIBRARY.talentbank)
  if (
    q.includes('best opportunities') ||
    q.includes('find me the best opportunities') ||
    q.includes('find matching opportunities') ||
    q.includes('opportunities this week')
  ) return withConfig(RESPONSE_LIBRARY.opportunities)
  if (q.includes('experiences') && (q.includes('helping') || q.includes('profile') || q.includes('strongest'))) return withConfig(RESPONSE_LIBRARY.signals)
  if (
    q.includes('ai intern') ||
    q.includes('stronger ai') ||
    q.includes('build a plan') ||
    q.includes('roadmap') ||
    q.includes('6-week')
  ) return withConfig(RESPONSE_LIBRARY.roadmap)
  return withConfig(RESPONSE_LIBRARY.default)
}

function ThinkingBubble({ text }) {
  return (
    <div className="message-enter flex justify-start">
      <div className="max-w-[78%] rounded-2xl border border-white/70 bg-white/72 px-4 py-3 text-sm font-semibold leading-6 text-[#637094] shadow-sm backdrop-blur-xl">
        <span>{text}</span>
        <span className="ml-2 inline-flex translate-y-0.5 gap-1">
          <span className="typing-dot" />
          <span className="typing-dot" style={{ animationDelay: '160ms' }} />
          <span className="typing-dot" style={{ animationDelay: '320ms' }} />
        </span>
      </div>
    </div>
  )
}

function MessageBubble({ message, isLatestRobot, onToast }) {
  if (message.type === 'thinking') return <ThinkingBubble text={message.text} />
  const isUser = message.role === 'user'
  const isVisualOnly = message.visualOnly
  return (
    <div className={`message-enter flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[86%] rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm ${
        isUser
          ? 'bg-blue-600 text-white'
          : 'border border-white/70 bg-white/72 text-[#2c3656] backdrop-blur-xl'
      }`}>
        {!isVisualOnly && (
          <div className="whitespace-pre-line">
            {isLatestRobot ? <TypewriterText text={message.text} speed={18} /> : message.text}
          </div>
        )}
        {!isUser && <VisualReply message={message} onToast={onToast} />}
      </div>
    </div>
  )
}

function VisualReply({ message, onToast }) {
  if (message.type === 'opportunity_recommendations') return <OpportunityRecommendationReply items={message.data} onToast={onToast} />
  if (message.type === 'career_signal_map') return <CareerSignalMapReply items={message.data} />
  if (message.type === 'ai_intern_roadmap') return <AIInternRoadmapReply steps={message.data} onToast={onToast} />
  return null
}

function OpportunityRecommendationReply({ items, onToast }) {
  return (
    <div className="mt-4 grid gap-3 md:grid-cols-3">
      {items.map(([title, company, match, deadline, why, action, cta]) => (
        <article key={title} className="rounded-2xl border border-white/70 bg-white/58 p-3 shadow-[0_12px_28px_rgba(37,99,235,0.08),inset_0_1px_0_rgba(255,255,255,0.85)]">
          <div className="flex items-center justify-between gap-2">
            <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-bold text-blue-700">{match}</span>
            <span className="rounded-full bg-orange-50 px-2 py-0.5 text-[11px] font-bold text-orange-700">{deadline}</span>
          </div>
          <h3 className="mt-3 text-sm font-black text-[#11194a]">{title}</h3>
          <p className="text-xs font-semibold text-[#7382a1]">{company}</p>
          <p className="mt-3 text-xs font-semibold leading-5 text-[#3a4669]">{why}</p>
          <p className="mt-2 text-xs font-medium leading-5 text-[#637094]">{action}</p>
          <button type="button" onClick={() => onToast(`${cta} opened`)} className="mt-3 inline-flex items-center gap-1 rounded-full border border-blue-100 bg-white/75 px-3 py-1.5 text-xs font-bold text-blue-700 transition hover:bg-blue-50">
            {cta} <ArrowRight size={12} />
          </button>
        </article>
      ))}
    </div>
  )
}

function CareerSignalMapReply({ items }) {
  return (
    <div className="mt-4 space-y-3">
      {items.map((item) => (
        <article key={item.title} className="rounded-2xl border border-white/70 bg-white/58 p-4 shadow-[0_12px_28px_rgba(37,99,235,0.08),inset_0_1px_0_rgba(255,255,255,0.85)]">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="text-sm font-black text-[#11194a]">{item.title}</h3>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {item.signals.map((signal) => <span key={signal} className="rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-bold text-blue-700">{signal}</span>)}
              </div>
            </div>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">{item.strength}</span>
          </div>
          <p className="mt-3 text-xs font-semibold leading-5 text-[#3a4669]">{item.insight}</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {item.bars.map(([label, value]) => (
              <div key={label}>
                <div className="flex justify-between text-[11px] font-bold text-[#637094]"><span>{label}</span><span>{value}</span></div>
                <div className="mt-1 h-2 rounded-full bg-blue-50"><div className="h-full rounded-full bg-blue-600" style={{ width: `${value}%` }} /></div>
              </div>
            ))}
          </div>
        </article>
      ))}
    </div>
  )
}

function AIInternRoadmapReply({ steps, onToast }) {
  return (
    <div className="mt-4 rounded-2xl border border-white/70 bg-white/58 p-4 shadow-[0_12px_28px_rgba(37,99,235,0.08),inset_0_1px_0_rgba(255,255,255,0.85)]">
      <div className="grid grid-cols-3 gap-2 md:grid-cols-6">
        {steps.map((step, index) => (
          <div key={step[0]} className="text-center">
            <span className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-black text-white">{index + 1}</span>
            <p className="mt-2 text-[11px] font-bold text-[#11194a]">{step[0]}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {steps.map(([week, title, action, outcome]) => (
          <article key={week} className="rounded-xl border border-white/70 bg-white/70 p-3">
            <p className="text-[11px] font-bold text-blue-600">{week}</p>
            <h3 className="mt-1 text-sm font-black text-[#11194a]">{title}</h3>
            <p className="mt-2 text-xs font-semibold leading-5 text-[#3a4669]">{action}</p>
            <p className="mt-2 text-xs font-medium leading-5 text-[#637094]">{outcome}</p>
          </article>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" onClick={() => onToast('Plan saved')} className="rounded-full bg-blue-600 px-3 py-1.5 text-xs font-bold text-white">Save as plan</button>
        <button type="button" onClick={() => onToast('Milestones added to calendar')} className="rounded-full border border-blue-100 bg-white/75 px-3 py-1.5 text-xs font-bold text-blue-700">Add milestones to calendar</button>
        <button type="button" onClick={() => onToast('Week 1 started')} className="rounded-full border border-blue-100 bg-white/75 px-3 py-1.5 text-xs font-bold text-blue-700">Start Week 1</button>
      </div>
    </div>
  )
}

function InsightCard({ title, body, onClick }) {
  return (
    <button type="button" onClick={onClick} className="w-full rounded-2xl border border-white/70 bg-white/62 p-4 text-left shadow-[0_14px_36px_rgba(37,99,235,0.08)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-white/80">
      <p className="text-xs font-bold uppercase tracking-wide text-blue-600">{title}</p>
      <p className="mt-2 text-sm font-semibold leading-5 text-[#2f3b61]">{body}</p>
    </button>
  )
}

function DemoToast({ message }) {
  if (!message) return null
  return (
    <div className="fixed bottom-5 right-5 z-50 rounded-2xl border border-white/70 bg-white/85 px-4 py-3 text-sm font-bold text-blue-700 shadow-[0_18px_44px_rgba(37,99,235,0.14)] backdrop-blur-xl">
      {message}
    </div>
  )
}

export default function AICompanionPage() {
  const readiness = candidateOverview.careerSnapshot.readiness
  const location = useLocation()
  const [initialPrompt] = useState(() => location.state?.initialPrompt ?? null)
  const [messages, setMessages] = useState([{ id: 'start', role: 'robot', type: 'text', text: STARTER_MESSAGE }])
  const [draft, setDraft] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [toast, setToast] = useState('')
  const [chatHistory, setChatHistory] = useState(INITIAL_CHAT_HISTORY)
  const [activeChatId, setActiveChatId] = useState(NEW_CHAT_ID)
  const [historyQuery, setHistoryQuery] = useState('')
  const [isQuickActionsOpen, setIsQuickActionsOpen] = useState(true)

  // ── Interview Practice mode ─────────────────────────────────────────
  const [activeMode, setActiveMode] = useState('chat') // 'chat' | 'practice'
  const [sessionConfig, setSessionConfig] = useState(null) // { mode, role, company }

  const scrollRef = useRef(null)
  const timersRef = useRef([])
  const toastRef = useRef(null)
  const initialPromptHandledRef = useRef(false)

  useEffect(() => {
    if (!scrollRef.current) return
    scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, isGenerating])

  useEffect(() => () => {
    timersRef.current.forEach(window.clearTimeout)
    window.clearTimeout(toastRef.current)
  }, [])

  const schedule = (fn, delay) => {
    const id = window.setTimeout(fn, delay)
    timersRef.current.push(id)
    return id
  }

  const showToast = (message) => {
    window.clearTimeout(toastRef.current)
    setToast(message)
    toastRef.current = window.setTimeout(() => setToast(''), 1800)
  }

  const sendMessage = async (text) => {
    const clean = text.trim()
    if (!clean || isGenerating) return

    // Snapshot conversation BEFORE mutating so the LLM sees only real turns.
    const conversationSnapshot = messages
    const thinkingId = `thinking-${Date.now()}`
    setDraft('')
    setIsGenerating(true)
    setMessages((prev) => [
      ...prev,
      { id: `user-${Date.now()}`, role: 'user', type: 'text', text: clean },
      { id: thinkingId, role: 'robot', type: 'thinking', text: 'Thinking through your question...' },
    ])

    // ── BACKEND CALL POINT ────────────────────────────────────────
    // fetchCompanionResponse hits your FastAPI at
    //   `${VITE_COMPANION_API_BASE_URL}${COMPANION_CHAT_PATH}`
    // and returns the normalised response shape. If the env var is
    // unset (dev mode) or the request fails, it silently falls back
    // to the local mock library so the demo still works.
    let response
    try {
      response = await fetchCompanionResponse(clean, conversationSnapshot)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('[AICompanionPage] unexpected sendMessage error:', error)
      response = withConfig(RESPONSE_LIBRARY.default)
    }

    // Optional: cycle through the response's thinking steps for a bit of
    // theatre before revealing the reply. Mock responses ship with
    // domain-specific steps; live LLM replies get one generic step.
    const steps = response.thinkingSteps ?? ['Composing a reply...']
    if (steps.length > 1) {
      steps.slice(1).forEach((step, index) => {
        schedule(() => {
          setMessages((prev) => prev.map((message) => (
            message.id === thinkingId ? { ...message, text: step } : message
          )))
        }, (index + 1) * 500)
      })
    }

    const revealDelay = Math.min(steps.length * 500, 1500)

    schedule(() => {
      setMessages((prev) => [
        ...prev.filter((message) => message.id !== thinkingId),
        { id: `robot-text-${Date.now()}`, role: 'robot', type: 'text', text: response.text },
      ])
      if (!response.isVisual) {
        setIsGenerating(false)
        return
      }
      schedule(() => {
        setMessages((prev) => [
          ...prev,
          { id: `robot-visual-${Date.now()}`, role: 'robot', type: response.responseType, text: '', data: response.data, visualOnly: true },
        ])
        setIsGenerating(false)
      }, 400)
    }, revealDelay)
  }

  // Continue a prompt handed off from another page (e.g. the Home page's
  // Career Coach card). Fires once — the ref guards against StrictMode's
  // double-invoke, and browser-history replace prevents a refresh from
  // replaying the prompt. The pending timer is intentionally NOT tracked in
  // timersRef because the sibling mount-cleanup effect would clear it during
  // StrictMode's simulated unmount before it can fire.
  useEffect(() => {
    if (initialPromptHandledRef.current || !initialPrompt) return
    initialPromptHandledRef.current = true
    window.history.replaceState({}, '', location.pathname)
    window.setTimeout(() => sendMessage(initialPrompt), 250)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPrompt])

  const insights = useMemo(() => [
    ['Today\'s focus', 'TalentBank AI Challenge deadline in 2 days', 'Why is TalentBank AI Challenge a good match for me?'],
    ['Profile signal', 'NLP is your strongest skill this week', 'Which of my experiences are helping my profile the most?'],
    ['Recommended action', 'Add evidence to your NLP project before applying', 'What should I focus on today?'],
  ], [])

  const filteredHistory = useMemo(() => {
    const q = historyQuery.trim().toLowerCase()
    if (!q) return chatHistory
    return chatHistory.filter((chat) => (
      chat.title.toLowerCase().includes(q) || chat.preview.toLowerCase().includes(q)
    ))
  }, [chatHistory, historyQuery])

  const handleNewChat = () => {
    // Snapshot the current live conversation into history when it has any
    // real turns, then reset the chat area for a fresh conversation.
    if (activeChatId === NEW_CHAT_ID) {
      const userTurns = messages.filter((m) => m.role === 'user' && m.type === 'text')
      if (userTurns.length > 0) {
        const firstUserText = userTurns[0].text
        const snapshot = {
          id: `hist-${Date.now()}`,
          title: firstUserText.length > 44 ? `${firstUserText.slice(0, 44)}…` : firstUserText,
          preview: firstUserText,
          updatedLabel: 'Just now',
          messages,
        }
        setChatHistory((prev) => [snapshot, ...prev])
      }
    }
    setActiveChatId(NEW_CHAT_ID)
    setMessages([{ id: `start-${Date.now()}`, role: 'robot', type: 'text', text: STARTER_MESSAGE }])
    setDraft('')
  }

  const handleSelectChat = (chatId) => {
    const chat = chatHistory.find((c) => c.id === chatId)
    if (!chat) return
    setActiveChatId(chatId)
    setMessages(chat.messages)
    setDraft('')
  }

  const handleStartMode = (mode) => {
    setSessionConfig({ mode, role: null, company: null })
  }

  const handleStartRole = (roleName) => {
    const mockInterviewMode = { id: 'mock-interview', name: 'Mock Interview', emoji: '🎯', bgColor: 'bg-orange-100', description: '', tagLabel: 'Level 4', tagTone: '', progress: '', progressTone: '' }
    setSessionConfig({ mode: mockInterviewMode, role: roleName, company: null })
  }

  const handleExitSession = () => setSessionConfig(null)

  return (
    <div className="min-h-screen bg-[#f6f9ff] text-[#121a3a]">
      {/* Voice session overlay — sits above everything */}
      {sessionConfig && (
        <VoiceInterviewSession
          mode={sessionConfig.mode}
          role={sessionConfig.role}
          company={sessionConfig.company}
          onExit={handleExitSession}
        />
      )}

      <HomeTopNav user={mockUser} readiness={readiness} />

      <main className="mx-auto max-w-[1480px] px-4 py-5 sm:px-6 lg:px-8">
        <header className="mb-4">
          <h1 className="text-2xl font-bold tracking-[-0.01em] text-[#11194a] sm:text-3xl">AI Companion</h1>
          <p className="mt-1 text-sm font-medium text-[#637094]">
            Ask CareerOS anything about your profile, applications, skills, or opportunities.
          </p>
        </header>

        {/* ── Mode toggle ─────────────────────────────────────────── */}
        <div className="mb-5 flex gap-2">
          <button
            type="button"
            onClick={() => setActiveMode('chat')}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
              activeMode === 'chat'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'border border-gray-200 bg-white text-gray-500 hover:border-blue-200 hover:text-blue-600'
            }`}
          >
            <MessageCircle size={15} strokeWidth={2.3} />
            Chat
          </button>
          <button
            type="button"
            onClick={() => setActiveMode('practice')}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
              activeMode === 'practice'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'border border-gray-200 bg-white text-gray-500 hover:border-blue-200 hover:text-blue-600'
            }`}
          >
            <Target size={15} strokeWidth={2.3} />
            Interview Practice
          </button>
        </div>

        {/* ── Interview Practice dashboard ─────────────────────────── */}
        {activeMode === 'practice' && (
          <InterviewPracticeDashboard
            onStartMode={handleStartMode}
            onStartRole={handleStartRole}
          />
        )}

        {/* ── Chat mode (unchanged) ─────────────────────────────── */}
        {activeMode === 'chat' && (

        <div
          className={`grid grid-cols-1 gap-6 ${
            isQuickActionsOpen
              ? 'lg:grid-cols-[260px_minmax(0,1fr)_300px]'
              : 'lg:grid-cols-[260px_minmax(0,1fr)]'
          }`}
        >
          {/* ── Chat history rail ───────────────────────────────── */}
          <aside className="flex flex-col overflow-hidden rounded-2xl border border-white/70 bg-white/62 shadow-[0_14px_38px_rgba(37,99,235,0.08)] backdrop-blur-2xl lg:sticky lg:top-4 lg:self-start lg:h-[calc(100vh-2rem)]">
            <div className="border-b border-white/70 p-4">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-black text-[#11194a]">History</h2>
                <button
                  type="button"
                  onClick={handleNewChat}
                  className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-3 py-1.5 text-xs font-bold text-white shadow-[0_6px_16px_rgba(37,99,235,0.28)] transition hover:bg-blue-700"
                >
                  <MessageSquarePlus size={13} strokeWidth={2.4} />
                  New chat
                </button>
              </div>
              <label className="flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-3 py-1.5 text-xs font-semibold text-[#637094]">
                <Search size={13} className="text-[#7382a1]" strokeWidth={2.2} />
                <input
                  value={historyQuery}
                  onChange={(event) => setHistoryQuery(event.target.value)}
                  placeholder="Search chats"
                  className="flex-1 bg-transparent placeholder:text-[#9aa6c3] focus:outline-none"
                />
              </label>
            </div>

            <div className="flex-1 space-y-1 overflow-y-auto p-2">
              <button
                type="button"
                onClick={handleNewChat}
                className={`flex w-full items-start gap-2 rounded-xl px-3 py-2.5 text-left transition ${
                  activeChatId === NEW_CHAT_ID
                    ? 'bg-blue-50 ring-1 ring-blue-100'
                    : 'hover:bg-white/70'
                }`}
              >
                <Sparkles size={14} className="mt-0.5 flex-shrink-0 text-blue-600" strokeWidth={2.2} />
                <div className="min-w-0">
                  <p className="truncate text-xs font-black text-[#11194a]">Current conversation</p>
                  <p className="mt-0.5 truncate text-[11px] font-semibold text-[#7382a1]">Live now</p>
                </div>
              </button>

              {filteredHistory.length === 0 && (
                <p className="px-3 py-6 text-center text-xs font-semibold text-[#9aa6c3]">
                  {historyQuery ? 'No chats match your search.' : 'No past chats yet.'}
                </p>
              )}

              {filteredHistory.map((chat) => {
                const isActive = chat.id === activeChatId
                return (
                  <button
                    key={chat.id}
                    type="button"
                    onClick={() => handleSelectChat(chat.id)}
                    className={`flex w-full flex-col items-start rounded-xl px-3 py-2.5 text-left transition ${
                      isActive
                        ? 'bg-blue-50 ring-1 ring-blue-100'
                        : 'hover:bg-white/70'
                    }`}
                  >
                    <p className="w-full truncate text-xs font-black text-[#11194a]">{chat.title}</p>
                    <p className="mt-0.5 w-full truncate text-[11px] font-semibold text-[#637094]">
                      {chat.preview}
                    </p>
                    <p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-[#9aa6c3]">
                      {chat.updatedLabel}
                    </p>
                  </button>
                )
              })}
            </div>
          </aside>

          {/* ── Main chat surface ────────────────────────────────── */}
          <section className="flex h-[calc(100vh-180px)] min-h-[620px] max-h-[720px] flex-col overflow-hidden rounded-2xl border border-white/70 bg-white/58 shadow-[0_20px_60px_rgba(37,99,235,0.10)] backdrop-blur-2xl">
            {/* Chat-surface header — shows the current chat title and, when the
                quick-actions panel is hidden, a toggle to bring it back. */}
            <div className="flex items-center justify-between border-b border-white/70 bg-white/45 px-5 py-3">
              <div className="min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-wide text-blue-600">
                  {activeChatId === NEW_CHAT_ID ? 'Current chat' : 'Reviewing'}
                </p>
                <p className="truncate text-sm font-black text-[#11194a]">
                  {activeChatId === NEW_CHAT_ID
                    ? 'New conversation'
                    : chatHistory.find((c) => c.id === activeChatId)?.title ?? 'New conversation'}
                </p>
              </div>
              {!isQuickActionsOpen && (
                <button
                  type="button"
                  onClick={() => setIsQuickActionsOpen(true)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-white/80 px-3 py-1.5 text-xs font-bold text-blue-700 shadow-sm transition hover:border-blue-300 hover:bg-blue-50"
                  aria-label="Show quick actions"
                >
                  <PanelRightOpen size={13} strokeWidth={2.4} />
                  Quick actions
                </button>
              )}
            </div>

            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-5">
              {messages.map((message, index) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  isLatestRobot={message.role === 'robot' && message.type === 'text' && index === messages.length - 1}
                  onToast={showToast}
                />
              ))}

            </div>

            <div className="border-t border-white/70 bg-white/42 p-4">
              <div className="mb-3 flex flex-wrap gap-2">
                {PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    disabled={isGenerating}
                    onClick={() => sendMessage(prompt)}
                    className="rounded-full border border-blue-100 bg-white/70 px-3.5 py-2 text-xs font-bold text-[#35507d] transition hover:border-blue-300 hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              <form
                onSubmit={(event) => {
                  event.preventDefault()
                  sendMessage(draft)
                }}
                className="flex items-center gap-2 rounded-full border border-white/70 bg-white/76 px-4 py-2 shadow-[0_14px_34px_rgba(37,99,235,0.10)] backdrop-blur-xl"
              >
                <Sparkles size={16} className="text-blue-600" />
                <input
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  placeholder="Ask your CareerOS companion..."
                  className="flex-1 bg-transparent text-sm font-medium text-[#2c3656] placeholder:text-[#9aa6c3] focus:outline-none"
                />
                <button type="submit" disabled={isGenerating} className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50">
                  <Send size={15} strokeWidth={2.4} />
                </button>
              </form>
            </div>
          </section>

          {/* ── Quick actions rail (collapsible) ─────────────────── */}
          {isQuickActionsOpen && (
            <aside className="flex flex-col gap-4 lg:sticky lg:top-4 lg:self-start lg:max-h-[calc(100vh-2rem)] lg:overflow-y-auto">
              <div className="flex items-center justify-between rounded-2xl border border-white/70 bg-white/62 px-4 py-3 shadow-[0_10px_28px_rgba(37,99,235,0.08)] backdrop-blur-2xl">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wide text-blue-600">Suggested by AI</p>
                  <p className="text-sm font-black text-[#11194a]">Quick actions</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsQuickActionsOpen(false)}
                  className="rounded-full p-1.5 text-[#7382a1] transition hover:bg-blue-50 hover:text-blue-700"
                  aria-label="Hide quick actions"
                >
                  <PanelRightClose size={16} strokeWidth={2.2} />
                </button>
              </div>

              {insights.map(([title, body, prompt]) => (
                <InsightCard key={title} title={title} body={body} onClick={() => sendMessage(prompt)} />
              ))}
              <article className="rounded-2xl border border-blue-100 bg-blue-50/70 p-4 text-sm font-semibold leading-6 text-blue-800">
                <CheckCircle2 className="mb-2" size={18} />
                Visual replies now turn Career Memory, opportunities, and plans into mini dashboards inside chat.
              </article>
            </aside>
          )}
        </div>
        )}
      </main>
      <DemoToast message={toast} />
    </div>
  )
}
