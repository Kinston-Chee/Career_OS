import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Send, Sparkles, X } from 'lucide-react'

// ─── Per-room officer + response library ─────────────────────────────────────
// Keyed by the room id used in EmployerOperatingRooms.jsx.
export const ROOM_CHAT_META = {
  'talent-discovery': {
    officer: 'Talent Discovery Officer',
    greeting:
      "Hi Edwin — 42 high-fit candidates surfaced today across 3 active postings. 2 candidates have availability windows closing in the next 2 weeks. What would you like to look at first?",
    prompts: [
      'Who is at risk of dropping off?',
      'Show me top 5 matches this week',
      'What roles are running slow?',
    ],
    responses: {
      'who is at risk of dropping off': [
        'Two candidates are flagged this week:',
        '• Ivan Lim (96% match, SWE Intern) — competing offer detected · reach out today.',
        '• Nur Alya Binti (92% match, Data Analyst) — 5 concurrent applications on CareerGraph · low commitment signal.',
      ].join('\n'),
      'show me top 5 matches this week': [
        'Top 5 matches this week, ranked by evidence strength:',
        '1. Ivan Lim — 96% · SE Intern · Available Jun 1',
        '2. Nur Alya Binti — 92% · Data Analyst Intern · Available now',
        '3. Marcus Tan — 89% · SE Intern · Backend focus',
        '4. Aisha Rahman — 84% · SE Intern · Y2, June intake',
        '5. Kevin Goh — 81% · SE Intern · Availability TBC',
      ].join('\n'),
      'what roles are running slow': [
        'Two postings are stalling:',
        '• Software Engineering Intern — pipeline drop-off 30%+ week-over-week.',
        '• Data Analyst Intern — no shortlist responses in 5+ days.',
        'Consider re-engaging the top 3 candidates on each posting.',
      ].join('\n'),
    },
    dashboardRoute: '/employer/talent-discovery',
    dashboardLabel: 'Open Talent Discovery',
    accent: '#5B6CF9',
  },
  engagement: {
    officer: 'Engagement Studio Officer',
    greeting:
      "Hey Edwin — 4 events completed this month, up 18% vs last. The AI & Data Challenge is drawing sign-ups but qualified conversion is trending low. Want me to dig in?",
    prompts: [
      'Why is conversion low on the AI Challenge?',
      'Which event ROI is strongest?',
      'What should I run next quarter?',
    ],
    responses: {
      'why is conversion low on the ai challenge': [
        '214 registrants → only 23 qualified (11%). Two likely drivers:',
        '• The brief filters for evidence heavily and rejects strong candidates missing one skill tag.',
        '• Time zone: 62% of drop-off happens at the Day 2 live judging (9pm MYT).',
        'Recommend: reword requirements to focus on demonstrable skills, and move judging to a friendlier slot.',
      ].join('\n'),
      'which event roi is strongest': [
        'Top 3 ROI events (hires / dollars spent):',
        '1. Backend Engineering Workshop @ Taylor\'s — 12 shortlisted from 89 attendees.',
        '2. AI & Data Challenge 2024 — 6 hires from 180 registrants.',
        '3. Sunway Careers Fair booth — 3 pipeline hires within 30 days.',
      ].join('\n'),
      'what should i run next quarter': [
        'Given your talent gap in System Design and Backend, I\'d propose:',
        '• 2-day Systems Design bootcamp @ APU (July).',
        '• Backend hackathon co-branded with TalentBank (August).',
        '• Alumni panel + hiring mixer @ Taylor\'s (September).',
      ].join('\n'),
    },
    dashboardRoute: '/employer/posting',
    dashboardLabel: 'Open Engagement Studio',
    accent: '#F59E0B',
  },
  campus: {
    officer: 'Campus Pipeline Officer',
    greeting:
      "Hi Edwin — 12.8k invited into our campus funnel, 26 hires so far this cycle. 12 strong candidates are ripe for re-engagement. Want the shortlist?",
    prompts: [
      'Show me the re-engagement shortlist',
      'Which campus is converting best?',
      'Where are we losing candidates?',
    ],
    responses: {
      'show me the re-engagement shortlist': [
        '12 strong candidates in the "not-yet-applied" pool that fit an active posting:',
        '• Taylor\'s: 5 (2 SWE, 2 Data, 1 Product)',
        '• APU: 4 (Data-heavy cohort)',
        '• Sunway: 3 (Backend focus)',
        'Open Campus Pipeline to send a batch re-engagement message.',
      ].join('\n'),
      'which campus is converting best': [
        'Conversion rate (invited → hired) this cycle:',
        '• Taylor\'s University — 3.1% (best)',
        '• APU — 2.4%',
        '• Sunway — 1.9%',
        'Consider doubling engagement spend at Taylor\'s next quarter.',
      ].join('\n'),
      'where are we losing candidates': [
        'Biggest drop-offs in the funnel:',
        '1. Invited → Applied (only 8% convert) — CTA copy needs testing.',
        '2. Applied → Shortlisted (34% convert) — screening step is manual, add AI shortlist.',
        '3. Shortlisted → Interview (72% convert) — healthy.',
      ].join('\n'),
    },
    dashboardRoute: '/employer/campus-pipeline',
    dashboardLabel: 'Open Campus Pipeline',
    accent: '#10B981',
  },
  analytics: {
    officer: 'Hiring Analytics Officer',
    greeting:
      "Hey Edwin — time-to-fill is down 12% to 28 days, quality of hire predicted at 87%. Everything is trending green. Want to see the underlying breakdown?",
    prompts: [
      'Break down time-to-fill by role',
      'How is offer acceptance trending?',
      'Where are we still slow?',
    ],
    responses: {
      'break down time-to-fill by role': [
        'Time-to-fill breakdown (days, avg):',
        '• Software Engineering Intern — 24d',
        '• Data Analyst Intern — 29d',
        '• Product Manager Intern — 32d',
        'PM roles are the outlier — first-round scheduling is the bottleneck.',
      ].join('\n'),
      'how is offer acceptance trending': [
        'Offer acceptance rate over the last 3 quarters:',
        '• Q4 2024 — 78%',
        '• Q1 2025 — 82%',
        '• Q2 2025 — 92% (current)',
        'The tighter alignment on stipend + start-date flexibility is showing up.',
      ].join('\n'),
      'where are we still slow': [
        'Two slow stages:',
        '• Hiring manager feedback SLA — 2 candidates waiting 4+ days.',
        '• Assessment turnaround — average 6 days, benchmark is 3.',
      ].join('\n'),
    },
    dashboardRoute: '/employer/analytics',
    dashboardLabel: 'Open Hiring Analytics',
    accent: '#2563EB',
  },
  candidates: {
    officer: 'Candidate Ops Officer',
    greeting:
      "Hi Edwin — 5 top matches are waiting for a next step, and 3 shortlists are likely to accept if you contact them today. Where do you want to start?",
    prompts: [
      'Who should I contact today?',
      'What actions are overdue?',
      'Draft a shortlist follow-up',
    ],
    responses: {
      'who should i contact today': [
        'Top 3 to contact today:',
        '• Ivan Lim — 96% match, competing offer, respond within 24h.',
        '• Nur Alya Binti — 92% match, low commitment risk, warm follow-up.',
        '• Marcus Tan — 89% match, backend focus, invite to Priya\'s deep-dive.',
      ].join('\n'),
      'what actions are overdue': [
        '3 items overdue:',
        '• Hiring manager feedback for 2 candidates (4+ days).',
        '• 1 interview reschedule request unresolved.',
        '• 1 offer letter drafted 3 days ago, still awaiting your review.',
      ].join('\n'),
      'draft a shortlist follow-up': [
        'Draft (personalise before sending):',
        '"Hi [First name], following up on your SE Intern application — we\'d love to move you to the next round this week. Are Tuesday or Thursday afternoon workable for a 45-min technical chat?"',
      ].join('\n'),
    },
    dashboardRoute: '/employer/candidates',
    dashboardLabel: 'Open Candidate Ops',
    accent: '#7C3AED',
  },
  'command-center': {
    officer: 'Command Center',
    greeting:
      "Good morning, Edwin. 2 roles are at risk and 2 hiring decisions are waiting on your approval. Let me know what you want to tackle first.",
    prompts: [
      'What decisions need my approval?',
      'What roles are at risk?',
      'Summarise the week for me',
    ],
    responses: {
      'what decisions need my approval': [
        'Two approvals waiting:',
        '• Signed offer letter — Ivan Lim (SE Intern, RM 2,500).',
        '• Extend deadline for Data Analyst Intern posting by 7 days.',
        'Open the Command Center inbox to act.',
      ].join('\n'),
      'what roles are at risk': [
        'Two roles are flagged this week:',
        '• Software Engineering Intern — pipeline drop-off 30%+.',
        '• Data Analyst Intern — no shortlist responses in 5+ days.',
      ].join('\n'),
      'summarise the week for me': [
        'This week at a glance:',
        '• 5 top candidates need action, 3 likely to accept if contacted today.',
        '• 4 events completed (+18% MoM), AI Challenge conversion lagging.',
        '• 26 hires from campus pipeline this cycle, best week of the quarter.',
        '• 2 approvals overdue on your desk.',
      ].join('\n'),
    },
    dashboardRoute: '/employer/home',
    dashboardLabel: 'Return to Home',
    accent: '#155EE8',
  },
}

function normaliseKey(text) {
  return text.trim().toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ')
}

export function getResponseFor(roomId, text) {
  const meta = ROOM_CHAT_META[roomId]
  if (!meta) return null
  const key = normaliseKey(text)
  return meta.responses[key] ?? null
}

// ─── Shared chat message list ────────────────────────────────────────────────
export function ChatMessages({ meta, messages, loading, Icon }) {
  const bottomRef = useRef(null)
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, loading])
  const accent = meta.accent

  return (
    <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
      {messages.map((msg, i) => (
        <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
          {msg.role === 'assistant' ? (
            <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#E0E8F5] bg-white" style={{ color: accent }}>
              {Icon ? <Icon className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
            </div>
          ) : null}
          <div
            className={`max-w-[88%] whitespace-pre-line rounded-2xl px-4 py-2.5 text-sm font-medium leading-relaxed ${
              msg.role === 'user'
                ? 'rounded-tr-sm text-white'
                : 'rounded-tl-sm bg-[#F4F7FD] text-[#1B2545]'
            }`}
            style={msg.role === 'user' ? { background: accent } : undefined}
          >
            {msg.content}
          </div>
        </div>
      ))}
      {loading ? (
        <div className="flex gap-2">
          <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#E0E8F5] bg-white" style={{ color: accent }}>
            {Icon ? <Icon className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
          </div>
          <div className="rounded-2xl rounded-tl-sm bg-[#F4F7FD] px-4 py-3">
            <div className="flex gap-1">
              {[0, 150, 300].map((delay) => (
                <span key={delay} className="h-2 w-2 animate-bounce rounded-full bg-[#8A96B3]" style={{ animationDelay: `${delay}ms` }} />
              ))}
            </div>
          </div>
        </div>
      ) : null}
      <div ref={bottomRef} />
    </div>
  )
}

// ─── Shared chat input row ───────────────────────────────────────────────────
export function ChatInput({ meta, value, onChange, onSend, loading, autoFocus }) {
  const ref = useRef(null)
  useEffect(() => { if (autoFocus) ref.current?.focus() }, [autoFocus])
  const disabled = loading || !value.trim()
  return (
    <div className="border-t border-[#E8EEF8] px-4 py-3">
      <div className="flex items-center gap-2 rounded-xl border border-[#D8E0F0] bg-[#F8FAFD] px-4 py-2.5">
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') onSend() }}
          placeholder={`Ask the ${meta.officer.replace(' Officer', '')}…`}
          className="min-w-0 flex-1 bg-transparent text-sm text-[#1B2545] outline-none placeholder:text-[#B0BADA]"
        />
        <button
          type="button"
          onClick={onSend}
          disabled={disabled}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white shadow-sm transition disabled:opacity-40"
          style={{ background: meta.accent }}
        >
          <Send className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}

// ─── Shared prompt-chip strip ────────────────────────────────────────────────
export function PromptChips({ meta, prompts, onPick, loading }) {
  if (!prompts?.length) return null
  return (
    <div className="border-t border-[#E8EEF8] px-4 pt-3 pb-1">
      <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[#B0BADA]">Try asking</p>
      <div className="flex flex-wrap gap-1.5">
        {prompts.map((p) => (
          <button
            key={p}
            type="button"
            disabled={loading}
            onClick={() => onPick(p)}
            className="rounded-full border border-[#D8E0F0] bg-white px-3 py-1.5 text-[11px] font-semibold text-[#415174] transition hover:bg-[#F4F7FD] disabled:opacity-40"
            style={{ ['--room-accent']: meta.accent }}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Hook that manages message + typing state for a room ────────────────────
export function useRoomChat(roomId) {
  const meta = ROOM_CHAT_META[roomId]
  const [messages, setMessages] = useState(() => (
    meta ? [{ role: 'assistant', content: meta.greeting }] : []
  ))
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const send = (text) => {
    const clean = (typeof text === 'string' ? text : input).trim()
    if (!clean || loading || !meta) return
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', content: clean }])
    setLoading(true)
    window.setTimeout(() => {
      const fixed = getResponseFor(roomId, clean)
      const fallback =
        `I'm looking into "${clean}" now — the ${meta.officer.replace(' Officer', '')} usually surfaces this once I pull the latest signals. Try one of the shortcut prompts below, or open the full dashboard for a live view.`
      setMessages((prev) => [...prev, { role: 'assistant', content: fixed || fallback }])
      setLoading(false)
    }, 550)
  }

  return { meta, messages, input, setInput, loading, send }
}

// ─── Drawer (side-panel chat, used by the non-Command-Center rooms) ──────────
export default function EmployerOfficerChatDrawer({ room, onClose }) {
  const navigate = useNavigate()
  const { meta, messages, input, setInput, loading, send } = useRoomChat(room.id)

  if (!meta) return null
  const Icon = room.icon

  return (
    <div className="fixed inset-0 z-40 flex" onClick={onClose}>
      <div className="flex-1 bg-slate-900/25 backdrop-blur-[2px]" />
      <div
        className="flex w-[440px] shrink-0 flex-col bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'slideInRight 0.22s cubic-bezier(0.22,1,0.36,1)' }}
      >
        <div className="flex items-center gap-3 border-b border-[#E8EEF8] bg-[#F4F7FD] px-5 py-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white" style={{ background: meta.accent }}>
            <Icon className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-[#1B2545]">{meta.officer}</p>
            <p className="text-xs font-medium text-[#8A96B3]">{room.name}</p>
            <span className="mt-0.5 inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Online
            </span>
          </div>
          <button type="button" onClick={onClose} className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700">
            <X className="h-4 w-4" />
          </button>
        </div>

        <ChatMessages meta={meta} messages={messages} loading={loading} Icon={Icon} />

        <div className="border-t border-[#E8EEF8] px-5 py-2.5">
          <button
            type="button"
            onClick={() => { onClose(); navigate(meta.dashboardRoute) }}
            className="flex items-center gap-1.5 text-xs font-semibold hover:underline"
            style={{ color: meta.accent }}
          >
            {meta.dashboardLabel}
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>

        <PromptChips meta={meta} prompts={meta.prompts} onPick={send} loading={loading} />
        <ChatInput meta={meta} value={input} onChange={setInput} onSend={() => send()} loading={loading} autoFocus />
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
