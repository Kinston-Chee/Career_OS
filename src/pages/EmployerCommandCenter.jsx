import React, { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  AlertCircle,
  ArrowLeft,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronRight,
  FileText,
  Flag,
  Sparkles,
} from 'lucide-react'
import EmployerNav from '../components/employer/EmployerNav'
import EmployerOfficerChatDrawer, {
  ChatInput,
  ChatMessages,
  PromptChips,
  ROOM_CHAT_META,
  useRoomChat,
} from '../components/employer/EmployerOfficerChatDrawer'

// Suppress the unused-import warning while keeping the drawer available for
// side surfaces that may embed the Command Center chat in future.
void EmployerOfficerChatDrawer

// ─── Right-rail data ─────────────────────────────────────────────────────────
const APPROVALS = [
  {
    id: 'offer-ivan',
    icon: FileText,
    tone: 'blue',
    title: 'Approve offer letter — Ivan Lim',
    detail: 'SE Intern · RM 2,500 · June intake',
    due: 'Today · 5pm',
  },
  {
    id: 'extend-data',
    icon: Calendar,
    tone: 'amber',
    title: 'Extend Data Analyst posting deadline',
    detail: '7 more days to hit qualified target',
    due: 'This week',
  },
]

const ROLES_AT_RISK = [
  {
    id: 'swe',
    title: 'Software Engineering Intern',
    reason: 'Pipeline drop-off 30%+ week-over-week',
    tone: 'red',
  },
  {
    id: 'data',
    title: 'Data Analyst Intern',
    reason: 'No shortlist responses in 5+ days',
    tone: 'amber',
  },
]

const OPERATING_STATS = [
  { label: 'Open roles', value: '8', tone: 'blue' },
  { label: 'In pipeline', value: '214', tone: 'blue' },
  { label: 'Awaiting you', value: '3', tone: 'amber' },
  { label: 'Hires this quarter', value: '12', tone: 'green' },
]

const QUICK_JUMPS = [
  { label: 'Talent Discovery', to: '/employer/talent-discovery' },
  { label: 'Engagement Studio', to: '/employer/posting' },
  { label: 'Campus Pipeline', to: '/employer/campus-pipeline' },
  { label: 'Hiring Analytics', to: '/employer/analytics' },
  { label: 'Candidate Ops', to: '/employer/candidates' },
]

const TONE = {
  red: 'bg-red-50 text-red-600 border-red-100',
  amber: 'bg-amber-50 text-amber-600 border-amber-100',
  blue: 'bg-blue-50 text-blue-600 border-blue-100',
  green: 'bg-emerald-50 text-emerald-600 border-emerald-100',
}

const STAT_TONE = {
  blue: 'text-[#155EE8]',
  amber: 'text-[#B45309]',
  green: 'text-emerald-600',
}

export default function EmployerCommandCenter() {
  const navigate = useNavigate()
  const location = useLocation()
  const roomId = 'command-center'
  const { meta, messages, input, setInput, loading, send } = useRoomChat(roomId)

  // A message typed into the Employer Home chatbox arrives as router state.
  // Send it once, then clear the state so a refresh does not repeat it.
  const forwardedRef = useRef(false)
  useEffect(() => {
    const forwarded = location.state?.initialMessage
    if (!forwarded || forwardedRef.current) return
    forwardedRef.current = true
    send(forwarded)
    navigate(location.pathname, { replace: true, state: null })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state?.initialMessage])

  return (
    <div className="employer-workspace-page flex h-screen w-screen flex-col overflow-hidden">
      <EmployerNav variant="glass" />

      <main className="min-w-0 flex-1 overflow-y-auto">
        <div className="relative z-10 mx-auto max-w-[1400px] space-y-4 px-6 py-5">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => navigate('/employer/home')}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#D8E0F0] bg-white px-2.5 py-1 text-[12.5px] font-medium text-[#415174] transition hover:bg-[#F4F7FD]"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Home
              </button>
              <div>
                <h1 className="flex items-center gap-2 text-2xl font-semibold text-slate-950">
                  <span className="employer-home-header-icon" aria-hidden="true">
                    <Building2 className="h-4 w-4" />
                  </span>
                  {meta.officer}
                </h1>
                <p className="mt-0.5 text-sm font-medium text-slate-500">
                  Your central AI officer for morning briefings, approvals, and cross-room decisions.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {OPERATING_STATS.map((s) => (
                <div key={s.label} className="rounded-xl border border-white/70 bg-white/80 px-3.5 py-2 text-center shadow-[0_6px_18px_rgba(24,95,165,0.06)]">
                  <p className={`text-lg font-bold leading-none ${STAT_TONE[s.tone]}`}>{s.value}</p>
                  <p className="mt-1 text-[10.5px] font-semibold uppercase tracking-wide text-[#8A96B3]">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Body */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_340px]">
            {/* Chat panel */}
            <section className="flex min-h-[calc(100vh-13rem)] flex-col overflow-hidden rounded-2xl border border-white/70 bg-white shadow-[0_10px_30px_rgba(24,95,165,0.08)]">
              <div className="flex items-center gap-3 border-b border-[#E8EEF8] bg-[#F4F7FD] px-5 py-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white" style={{ background: meta.accent }}>
                  <Sparkles className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-[#1B2545]">{meta.officer}</p>
                  <p className="text-xs font-medium text-[#8A96B3]">Live · reads across every operating room</p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Online
                </span>
              </div>

              <ChatMessages meta={meta} messages={messages} loading={loading} Icon={Sparkles} />
              <PromptChips meta={meta} prompts={meta.prompts} onPick={send} loading={loading} />
              <ChatInput meta={meta} value={input} onChange={setInput} onSend={() => send()} loading={loading} autoFocus />
            </section>

            {/* Right rail */}
            <aside className="space-y-3">
              {/* Approvals */}
              <div className="rounded-2xl border border-white/70 bg-white/85 p-4 shadow-[0_8px_24px_rgba(24,95,165,0.06)]">
                <div className="mb-2.5 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#155EE8]" />
                  <h2 className="text-sm font-bold text-[#1B2545]">Awaiting your approval</h2>
                  <span className="ml-auto rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-[#155EE8]">
                    {APPROVALS.length}
                  </span>
                </div>
                <div className="space-y-2">
                  {APPROVALS.map((a) => (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => send(a.title)}
                      className="flex w-full items-start gap-2.5 rounded-xl border border-[#EEF2FB] bg-white p-3 text-left transition hover:border-[#155EE8]/50 hover:bg-[#F4F7FD]"
                    >
                      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${TONE[a.tone]}`}>
                        <a.icon className="h-4 w-4" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-[12.5px] font-semibold text-[#1B2545]">{a.title}</p>
                        <p className="mt-0.5 text-[11px] text-[#8A96B3]">{a.detail}</p>
                        <p className="mt-1 text-[10.5px] font-semibold text-[#B45309]">Due {a.due}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Roles at risk */}
              <div className="rounded-2xl border border-white/70 bg-white/85 p-4 shadow-[0_8px_24px_rgba(24,95,165,0.06)]">
                <div className="mb-2.5 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <h2 className="text-sm font-bold text-[#1B2545]">Roles at risk</h2>
                </div>
                <div className="space-y-2">
                  {ROLES_AT_RISK.map((r) => (
                    <div key={r.id} className={`rounded-xl border p-3 ${TONE[r.tone]}`}>
                      <div className="flex items-center gap-1.5">
                        <Flag className="h-3.5 w-3.5" />
                        <p className="text-[12.5px] font-semibold text-[#1B2545]">{r.title}</p>
                      </div>
                      <p className="mt-1 text-[11px] text-[#50607E]">{r.reason}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick jumps */}
              <div className="rounded-2xl border border-white/70 bg-white/85 p-4 shadow-[0_8px_24px_rgba(24,95,165,0.06)]">
                <h2 className="mb-2.5 text-sm font-bold text-[#1B2545]">Jump to operating room</h2>
                <div className="space-y-1">
                  {QUICK_JUMPS.map((q) => (
                    <button
                      key={q.to}
                      type="button"
                      onClick={() => navigate(q.to)}
                      className="flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-[12.5px] font-medium text-[#415174] transition hover:bg-[#F4F7FD] hover:text-[#155EE8]"
                    >
                      {q.label}
                      <ChevronRight className="h-3.5 w-3.5 text-[#B0BADA]" />
                    </button>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  )
}
