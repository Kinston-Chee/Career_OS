import React, { useEffect, useRef, useState } from 'react'
import { ArrowRight, Send, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { callGroq } from './agentConfig'

// ─── Per-agent fixed prompt chips ────────────────────────────────────────────
const AGENT_PROMPTS = {
  'student-success': [
    'Who needs urgent follow-up?',
    'What is the main risk pattern?',
    'What support is available?',
  ],
  curriculum: [
    'What are our skill gaps?',
    'Show me alignment score',
    'Which modules need work?',
  ],
  alumni: [
    'What is our employment rate?',
    'What skills do alumni miss?',
    'Which companies hire us most?',
  ],
  accreditation: [
    'What is missing for MQA?',
    'What is our readiness score?',
    'When is the deadline?',
  ],
  partnership: [
    'What proposals need sign-off?',
    'Who is our best partner?',
    'How many interns placed?',
  ],
}

// ─── Fixed response library ───────────────────────────────────────────────────
const FIXED_RESPONSES = {
  'student-success': {
    'who needs urgent follow-up': {
      text: 'Three students need urgent attention right now.',
      visual: 'student_urgent',
      data: [
        { name: 'Nur Aisyah B.', year: 'Y2 CS', risk: 'GPA dropped to 2.1 — missed 2 consultations', tone: 'red' },
        { name: 'Marcus Lim', year: 'Y2 DS', risk: 'Attendance 58% — lecturer referred for support', tone: 'red' },
        { name: 'Priya Ramasamy', year: 'Y3 CS', risk: 'Mental health signal flagged by tutor', tone: 'orange' },
      ],
    },
    'what is the main risk pattern': {
      text: 'Assessment overload in Week 8 is the biggest driver — 4 assignments and 1 exam collide.',
      visual: 'bar_list',
      data: [
        ['Assessment overload', 42],
        ['Attendance drop', 28],
        ['GPA below 2.5', 22],
        ['Mental health signals', 8],
      ],
    },
    'what support is available': {
      text: 'Three support services are active on campus this week.',
      visual: 'service_cards',
      data: [
        { title: 'Academic Counselling', detail: 'Book via student portal', days: 'Mon–Fri' },
        { title: 'Peer Tutoring', detail: 'Maths, CS, Data Science', days: 'Daily 2–5 PM' },
        { title: 'Mental Health Drop-in', detail: 'Level 3 Student Hub', days: 'Tue & Thu' },
      ],
    },
  },
  curriculum: {
    'what are our skill gaps': {
      text: 'Three active skill gaps identified — GenAI is the most critical.',
      visual: 'bar_list',
      data: [
        ['GenAI / LLMs (gap)', 31],
        ['MLOps / Deployment (gap)', 22],
        ['Cloud Architecture (gap)', 18],
      ],
    },
    'show me alignment score': {
      text: 'Overall curriculum-market alignment is 74% — down from 78% last year.',
      visual: 'stat_row',
      data: [
        { label: 'Market alignment', value: '74%', tone: 'orange' },
        { label: 'Modules reviewed', value: '18', tone: 'blue' },
        { label: 'Fully aligned', value: '14', tone: 'green' },
      ],
    },
    'which modules need work': {
      text: '4 modules are partially aligned and need updating before the next review.',
      visual: 'checklist',
      data: [
        { label: 'CS401 — Machine Learning', status: 'warn', note: 'Missing LLM section' },
        { label: 'CS302 — Cloud Systems', status: 'warn', note: 'No AWS/Azure labs' },
        { label: 'DS201 — Data Engineering', status: 'warn', note: 'MLOps pipeline outdated' },
        { label: 'CS105 — Intro Programming', status: 'warn', note: 'GenAI tools not covered' },
      ],
    },
  },
  alumni: {
    'what is our employment rate': {
      text: 'Q2 2026 cohort: 84% employed within 6 months — up 3% year on year.',
      visual: 'stat_row',
      data: [
        { label: 'Employed (6mo)', value: '84%', tone: 'green' },
        { label: 'Avg salary', value: 'RM 4,200', tone: 'blue' },
        { label: 'Employers linked', value: '47', tone: 'blue' },
      ],
    },
    'what skills do alumni miss': {
      text: 'GenAI tools top the list — 34% of alumni flagged this as their biggest gap after graduation.',
      visual: 'bar_list',
      data: [
        ['GenAI / LLM tools', 34],
        ['Cloud deployment', 28],
        ['Client communication', 21],
      ],
    },
    'which companies hire us most': {
      text: 'Google, Grab, and TalentBank are our top three hiring partners this year.',
      visual: 'employer_tags',
      data: ['Google', 'Grab', 'TalentBank', 'Maxis', 'CIMB Digital', 'Fusionex'],
    },
  },
  accreditation: {
    'what is missing for mqa': {
      text: '3 items are still missing — one request to Dr. Ahmad has been unanswered for 5 days.',
      visual: 'checklist',
      data: [
        { label: 'External Examiner Report 2023/24', status: 'missing', note: 'Request sent to Dr. Ahmad' },
        { label: 'Student Outcome Summary 2024/25', status: 'missing', note: 'Awaiting programme chair' },
        { label: 'Industry Advisory Panel minutes Apr 2025', status: 'missing', note: 'Not yet collected' },
        { label: 'Graduate Employment Data (MQA 3.1)', status: 'ready', note: 'Uploaded last week' },
        { label: 'Course Learning Outcome Map', status: 'ready', note: 'Verified by Rex' },
      ],
    },
    'what is our readiness score': {
      text: 'MQA self-review readiness is at 62% — 5 months to submission.',
      visual: 'stat_row',
      data: [
        { label: 'MQA readiness', value: '62%', tone: 'orange' },
        { label: 'SETARA readiness', value: '78%', tone: 'green' },
        { label: 'Months left', value: '5 mo', tone: 'red' },
      ],
    },
    'when is the deadline': {
      text: 'MQA BSc CS self-review is due in 5 months. Curriculum changes must be submitted as a Programme Amendment before that.',
      visual: 'timeline',
      data: [
        { label: 'Faculty Board approval', date: 'Jul 2026', done: false },
        { label: 'Programme Amendment to MQA', date: 'Aug 2026', done: false },
        { label: 'MQA self-review due', date: 'Dec 2026', done: false },
      ],
    },
  },
  partnership: {
    'what proposals need sign-off': {
      text: '2 proposals are waiting on your desk — both pending for 2 weeks.',
      visual: 'proposal_cards',
      data: [
        { org: 'TalentBank', title: 'Joint Research Programme — AI-Driven Graduate Readiness', value: 'RM 180,000', type: 'Research' },
        { org: 'Grab', title: 'Industry Advisory Panel + 10 paid internship slots/semester', value: '10 slots', type: 'Internship' },
      ],
    },
    'who is our best partner': {
      text: 'Grab generated the highest ROI last quarter — 8 placements and 2 full-time hires.',
      visual: 'stat_row',
      data: [
        { label: 'Placements (Grab)', value: '8', tone: 'green' },
        { label: 'Full-time hires', value: '2', tone: 'green' },
        { label: 'Active partners', value: '12', tone: 'blue' },
      ],
    },
    'how many interns placed': {
      text: '67 students placed through industry partners in H1 2026.',
      visual: 'stat_row',
      data: [
        { label: 'Placements H1 2026', value: '67', tone: 'green' },
        { label: 'Live projects', value: '5', tone: 'blue' },
        { label: 'Proposals pending', value: '2', tone: 'orange' },
      ],
    },
  },
}

function getFixedResponse(agentId, text) {
  const lib = FIXED_RESPONSES[agentId]
  if (!lib) return null
  const q = text.toLowerCase().trim()
  for (const [key, response] of Object.entries(lib)) {
    if (q.includes(key)) return response
  }
  return null
}

// ─── Visual components (compact, 400px-safe) ──────────────────────────────────
const TONE = {
  red:    { bg: 'bg-red-50',     text: 'text-red-700' },
  orange: { bg: 'bg-orange-50',  text: 'text-orange-700' },
  green:  { bg: 'bg-emerald-50', text: 'text-emerald-700' },
  blue:   { bg: 'bg-blue-50',    text: 'text-blue-700' },
}
const CHECK_STATUS = {
  warn:    { icon: '⚠', color: 'text-orange-500' },
  missing: { icon: '✕', color: 'text-red-500' },
  ready:   { icon: '✓', color: 'text-emerald-500' },
}

function StatRow({ data }) {
  return (
    <div className="mt-3 grid grid-cols-3 gap-2">
      {data.map((s) => (
        <div key={s.label} className={`rounded-xl ${TONE[s.tone]?.bg ?? 'bg-slate-50'} p-2.5 text-center`}>
          <p className={`text-base font-black ${TONE[s.tone]?.text ?? 'text-slate-700'}`}>{s.value}</p>
          <p className="mt-0.5 text-[10px] font-semibold text-slate-500 leading-tight">{s.label}</p>
        </div>
      ))}
    </div>
  )
}

function BarList({ data }) {
  const max = Math.max(...data.map(([, v]) => v))
  return (
    <div className="mt-3 space-y-2.5">
      {data.map(([label, value]) => (
        <div key={label}>
          <div className="flex justify-between text-[11px] font-semibold text-slate-600 mb-1">
            <span>{label}</span><span className="text-[#155EE8]">{value}%</span>
          </div>
          <div className="h-2 rounded-full bg-slate-100">
            <div className="h-full rounded-full bg-[#155EE8]" style={{ width: `${(value / max) * 100}%` }} />
          </div>
        </div>
      ))}
    </div>
  )
}

function Checklist({ data }) {
  return (
    <div className="mt-3 space-y-1.5">
      {data.map((item) => {
        const t = CHECK_STATUS[item.status] ?? CHECK_STATUS.warn
        return (
          <div key={item.label} className="flex items-start gap-2 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2">
            <span className={`mt-0.5 shrink-0 text-sm font-bold ${t.color}`}>{t.icon}</span>
            <div>
              <p className="text-[11px] font-semibold text-slate-700 leading-snug">{item.label}</p>
              {item.note && <p className="text-[10px] font-medium text-slate-400 mt-0.5">{item.note}</p>}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function StudentUrgentList({ data }) {
  const bgTone = { red: 'border-red-200 bg-red-50', orange: 'border-orange-200 bg-orange-50' }
  const txtTone = { red: 'text-red-700', orange: 'text-orange-700' }
  return (
    <div className="mt-3 space-y-2">
      {data.map((s) => (
        <div key={s.name} className={`rounded-xl border px-3 py-2.5 ${bgTone[s.tone]}`}>
          <div className="flex items-center justify-between">
            <p className={`text-[12px] font-bold ${txtTone[s.tone]}`}>{s.name}</p>
            <span className="text-[10px] font-semibold text-slate-400">{s.year}</span>
          </div>
          <p className="mt-0.5 text-[11px] font-medium text-slate-600">{s.risk}</p>
        </div>
      ))}
    </div>
  )
}

function ServiceCards({ data }) {
  return (
    <div className="mt-3 space-y-2">
      {data.map((s) => (
        <div key={s.title} className="rounded-xl border border-blue-100 bg-blue-50/60 px-3 py-2.5">
          <p className="text-[12px] font-bold text-[#155EE8]">{s.title}</p>
          <p className="text-[11px] font-medium text-slate-600">{s.detail}</p>
          <p className="text-[10px] font-semibold text-slate-400 mt-0.5">{s.days}</p>
        </div>
      ))}
    </div>
  )
}

function EmployerTags({ data }) {
  return (
    <div className="mt-3 flex flex-wrap gap-1.5">
      {data.map((name) => (
        <span key={name} className="rounded-full border border-[#D8E0F0] bg-white px-3 py-1 text-[11px] font-semibold text-[#26304D]">
          {name}
        </span>
      ))}
    </div>
  )
}

function ProposalCards({ data }) {
  return (
    <div className="mt-3 space-y-2">
      {data.map((p) => (
        <div key={p.org} className="rounded-xl border border-[#D8E0F0] bg-white px-4 py-3 shadow-sm">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[11px] font-bold text-[#155EE8]">{p.org}</p>
            <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700">{p.type}</span>
          </div>
          <p className="mt-1 text-[11px] font-semibold text-slate-700 leading-snug">{p.title}</p>
          <p className="mt-1 text-[11px] font-medium text-emerald-600">{p.value}</p>
        </div>
      ))}
    </div>
  )
}

function Timeline({ data }) {
  return (
    <div className="mt-3 space-y-2">
      {data.map((t, i) => (
        <div key={t.label} className="flex items-start gap-3">
          <div className="flex flex-col items-center">
            <div className={`h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white ${t.done ? 'bg-emerald-500' : 'bg-[#155EE8]'}`}>{i + 1}</div>
            {i < data.length - 1 && <div className="mt-1 h-4 w-px bg-slate-200" />}
          </div>
          <div className="pb-1">
            <p className="text-[12px] font-semibold text-slate-700">{t.label}</p>
            <p className="text-[10px] font-bold text-orange-600 mt-0.5">{t.date}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function VisualBlock({ response }) {
  if (!response?.visual) return null
  switch (response.visual) {
    case 'stat_row':       return <StatRow data={response.data} />
    case 'bar_list':       return <BarList data={response.data} />
    case 'checklist':      return <Checklist data={response.data} />
    case 'student_urgent': return <StudentUrgentList data={response.data} />
    case 'service_cards':  return <ServiceCards data={response.data} />
    case 'employer_tags':  return <EmployerTags data={response.data} />
    case 'proposal_cards': return <ProposalCards data={response.data} />
    case 'timeline':       return <Timeline data={response.data} />
    default:               return null
  }
}

// ─── Drawer ───────────────────────────────────────────────────────────────────
export default function AgentChatDrawer({ agent, onClose }) {
  const navigate = useNavigate()
  const [messages, setMessages] = useState([{ role: 'assistant', content: agent.greeting, visual: null }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  const prompts = AGENT_PROMPTS[agent.id] ?? []

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const send = async (text) => {
    const clean = (typeof text === 'string' ? text : input).trim()
    if (!clean || loading) return
    setInput('')

    const userMsg = { role: 'user', content: clean, visual: null }
    setMessages((prev) => [...prev, userMsg])
    setLoading(true)

    const fixed = getFixedResponse(agent.id, clean)
    if (fixed) {
      setTimeout(() => {
        setMessages((prev) => [...prev, { role: 'assistant', content: fixed.text, visual: fixed }])
        setLoading(false)
      }, 600)
      return
    }

    const next = [...messages, userMsg]
    const history = [{ role: 'system', content: agent.systemPrompt }, ...next.map((m) => ({ role: m.role, content: m.content }))]
    const reply = await callGroq(history, 220)
    const content = reply ?? agent.fallbacks.default
    setMessages((prev) => [...prev, { role: 'assistant', content, visual: null }])
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 z-40 flex" onClick={onClose}>
      <div className="flex-1 bg-slate-900/25 backdrop-blur-[2px]" />

      <div
        className="flex w-[440px] shrink-0 flex-col bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'slideInRight 0.22s cubic-bezier(0.22,1,0.36,1)' }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-[#E8EEF8] bg-[#F4F7FD] px-5 py-4">
          <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-[#E0E8F5] bg-white p-0.5">
            <img src={agent.image} alt={agent.agentName} className="h-full w-full object-contain" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-[#1B2545]">{agent.agentName}</p>
            <p className="text-xs font-medium text-[#8A96B3]">{agent.name}</p>
            <span className="mt-0.5 inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Online
            </span>
          </div>
          <button type="button" onClick={onClose} className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'assistant' && (
                <div className="mt-0.5 h-7 w-7 shrink-0 overflow-hidden rounded-full border border-[#E0E8F5] bg-white">
                  <img src={agent.image} alt="" className="h-full w-full object-contain" />
                </div>
              )}
              <div className={`max-w-[88%] rounded-2xl px-4 py-2.5 text-sm font-medium leading-relaxed ${
                msg.role === 'user'
                  ? 'rounded-tr-sm bg-[#155EE8] text-white'
                  : 'rounded-tl-sm bg-[#F4F7FD] text-[#1B2545]'
              }`}>
                {msg.content}
                {msg.visual && <VisualBlock response={msg.visual} />}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-2">
              <div className="mt-0.5 h-7 w-7 shrink-0 overflow-hidden rounded-full border border-[#E0E8F5] bg-white">
                <img src={agent.image} alt="" className="h-full w-full object-contain" />
              </div>
              <div className="rounded-2xl rounded-tl-sm bg-[#F4F7FD] px-4 py-3">
                <div className="flex gap-1">
                  {[0, 150, 300].map((delay) => (
                    <span key={delay} className="h-2 w-2 animate-bounce rounded-full bg-[#8A96B3]" style={{ animationDelay: `${delay}ms` }} />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Dashboard link */}
        <div className="border-t border-[#E8EEF8] px-5 py-2.5">
          <button type="button" onClick={() => { onClose(); navigate(agent.route) }}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#155EE8] hover:underline">
            Open full {agent.name} dashboard
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>

        {/* Fixed prompt chips */}
        {prompts.length > 0 && (
          <div className="border-t border-[#E8EEF8] px-4 pt-3 pb-1">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[#B0BADA]">Try asking</p>
            <div className="flex flex-wrap gap-1.5">
              {prompts.map((p) => (
                <button key={p} type="button" disabled={loading} onClick={() => send(p)}
                  className="rounded-full border border-[#D8E0F0] bg-white px-3 py-1.5 text-[11px] font-semibold text-[#415174] transition hover:border-blue-300 hover:bg-blue-50 hover:text-[#155EE8] disabled:opacity-40">
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="border-t border-[#E8EEF8] px-4 py-3">
          <div className="flex items-center gap-2 rounded-xl border border-[#D8E0F0] bg-[#F8FAFD] px-4 py-2.5">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder={`Ask ${agent.agentName.split('—')[0].trim()}…`}
              className="min-w-0 flex-1 bg-transparent text-sm text-[#1B2545] outline-none placeholder:text-[#B0BADA]"
            />
            <button type="button" onClick={() => send()} disabled={!input.trim() || loading}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#155EE8] text-white shadow-sm transition hover:bg-[#124FC4] disabled:opacity-40">
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
      `}</style>
    </div>
  )
}
