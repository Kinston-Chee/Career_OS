import React, { useState } from 'react'
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Edit3,
  FileText,
  RotateCcw,
  Send,
} from 'lucide-react'

const ACTION_META = {
  approve: { label: 'Approve & send', icon: Send, color: 'bg-[#155EE8] hover:bg-[#134dc9]', secondaryLabel: 'Regenerate', doneLabel: 'Approved' },
  edit: { label: 'Save & send', icon: Edit3, color: 'bg-emerald-600 hover:bg-emerald-700', secondaryLabel: 'Discard', doneLabel: 'Sent' },
  review: { label: 'Confirm', icon: CheckCircle2, color: 'bg-[#155EE8] hover:bg-[#134dc9]', secondaryLabel: 'Reject', doneLabel: 'Confirmed' },
}

const DEADLINE_TONES = {
  red: 'bg-red-50 text-red-600',
  orange: 'bg-orange-50 text-orange-600',
  blue: 'bg-blue-50 text-blue-600',
}

const ICON_BG_TONES = {
  red: 'bg-red-50 text-red-600',
  orange: 'bg-orange-50 text-orange-600',
  blue: 'bg-blue-50 text-blue-600',
}

const PENDING_ACTIONS = [
  {
    id: 'offer-ivan',
    agent: 'Offer Drafting Agent',
    from: 'Candidate Ops',
    title: 'Offer letter — Ivan Lim (Software Engineering Intern)',
    agentNote: 'AI drafted the offer package based on your standard intern band and Ivan\'s validated skills. Awaiting your approval before sending.',
    deadline: 'Today, 5pm',
    deadlineTone: 'red',
    actionType: 'approve',
    document: `Dear Ivan,\n\nWe are delighted to extend an offer for the Software Engineering Intern role at Acme Corporation.\n\nStart date: 1 July 2025\nDuration: 12 weeks\nCompensation: MYR 2,800 / month\nManager: Priya Nair, Engineering Lead\n\nPlease sign and return by 22 May 2025.\n\nWarm regards,\nEdwin Khoo\nHR Manager, Acme Corporation`,
  },
  {
    id: 'brief-challenge',
    agent: 'Engagement Agent',
    from: 'Engagement Studio',
    title: 'Revised brief — AI & Data Challenge 2025',
    agentNote: 'Sign-ups are high but qualified conversion is 11%. AI rewrote the brief to filter for evidence-based skills without shrinking the top of funnel.',
    deadline: 'Tomorrow',
    deadlineTone: 'orange',
    actionType: 'edit',
    document: `AI & Data Challenge 2025 — Revised Brief\n\nWho should apply:\n- Undergraduates comfortable with Python and SQL\n- Prior hands-on project with real data (school, hackathon, or internship)\n\nWhat you'll build:\n- End-to-end pipeline: ingest → clean → visualise\n- Ship a 2-page insight memo backed by evidence\n\nEvaluation weights:\n- Data reasoning (40%)\n- Code quality (30%)\n- Communication (30%)`,
  },
  {
    id: 'campus-partnership',
    agent: 'Partnership Agent',
    from: 'Campus Pipeline',
    title: 'New campus partnership — Sunway University',
    agentNote: 'Sunway has requested a formal partnership after 3 successful engagements. AI prepared the MOU using your Taylor\'s template — please review.',
    deadline: 'This week',
    deadlineTone: 'blue',
    actionType: 'review',
    document: `Memorandum of Understanding — Acme × Sunway University\n\nScope:\n- 2 sponsored challenges per academic year\n- Priority access to Sunway CS/Data cohorts for internship intake\n- Joint industry-guest lecture series (4 sessions / year)\n\nCommitment: 12 months, auto-renewable\nExit clause: 60 days written notice\n\nPrimary contacts:\n- Acme: Edwin Khoo, HR Manager\n- Sunway: TBD (Career Services Office)`,
  },
]

export default function EmployerPendingActions() {
  const [expanded, setExpanded] = useState(null)
  const [done, setDone] = useState({})
  const [editVals, setEditVals] = useState(
    Object.fromEntries(PENDING_ACTIONS.map((a) => [a.id, a.document])),
  )

  const pending = PENDING_ACTIONS.filter((a) => !done[a.id])
  const completed = PENDING_ACTIONS.filter((a) => done[a.id])

  const handlePrimary = (item) => {
    setDone((prev) => ({ ...prev, [item.id]: ACTION_META[item.actionType].doneLabel }))
    setExpanded(null)
  }
  const handleSecondary = () => setExpanded(null)

  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-md">
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-blue-600" />
          <h2 className="text-sm font-bold text-gray-900">Pending Your Action</h2>
          <span className="text-xs text-gray-400">Prepared by AI agents</span>
        </div>
        {pending.length > 0 ? (
          <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-medium text-blue-700">
            {pending.length} awaiting review
          </span>
        ) : null}
      </div>

      {pending.length === 0 && completed.length === 0 ? (
        <p className="py-4 text-center text-sm text-gray-400">All caught up — no pending actions.</p>
      ) : null}

      <div className="space-y-2">
        {pending.map((item) => {
          const meta = ACTION_META[item.actionType]
          const isOpen = expanded === item.id
          const isEdit = item.actionType === 'edit'

          return (
            <div
              key={item.id}
              className={`rounded-xl border transition-all ${isOpen ? 'border-blue-200 bg-blue-50/40' : 'border-gray-100 bg-gray-50/50 hover:border-gray-200'}`}
            >
              <button
                type="button"
                onClick={() => setExpanded(isOpen ? null : item.id)}
                className="flex w-full items-start gap-3 px-4 py-3.5 text-left"
              >
                <span className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${ICON_BG_TONES[item.deadlineTone]}`}>
                  <FileText className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-semibold text-[#8A96B3]">
                    {item.agent} · {item.from}
                  </p>
                  <p className="mt-0.5 text-sm font-semibold text-gray-900">{item.title}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-gray-500">{item.agentNote}</p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1.5">
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${DEADLINE_TONES[item.deadlineTone]}`}>
                    {item.deadline}
                  </span>
                  <span className="rounded-full border border-gray-200 bg-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gray-500">
                    {item.actionType}
                  </span>
                </div>
                {isOpen ? (
                  <ChevronUp className="mt-1 h-4 w-4 shrink-0 text-gray-400" />
                ) : (
                  <ChevronDown className="mt-1 h-4 w-4 shrink-0 text-gray-400" />
                )}
              </button>

              {isOpen ? (
                <div className="border-t border-blue-100 px-4 pb-4 pt-3">
                  {isEdit ? (
                    <textarea
                      className="w-full rounded-lg border border-blue-200 bg-white p-3 font-mono text-xs leading-relaxed text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      rows={12}
                      value={editVals[item.id]}
                      onChange={(e) => setEditVals((prev) => ({ ...prev, [item.id]: e.target.value }))}
                    />
                  ) : (
                    <pre className="whitespace-pre-wrap rounded-lg border border-blue-100 bg-white p-3 font-mono text-xs leading-relaxed text-gray-700">
                      {item.document}
                    </pre>
                  )}
                  <div className="mt-3 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handlePrimary(item)}
                      className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-bold text-white shadow-sm transition ${meta.color}`}
                    >
                      <meta.icon className="h-3.5 w-3.5" />
                      {meta.label}
                    </button>
                    <button
                      type="button"
                      onClick={handleSecondary}
                      className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-600 transition hover:bg-gray-50"
                    >
                      <RotateCcw className="h-3 w-3" />
                      {meta.secondaryLabel}
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          )
        })}
      </div>

      {completed.length > 0 ? (
        <div className="mt-4 border-t border-gray-100 pt-4">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">Completed</p>
          <div className="space-y-1.5">
            {completed.map((item) => (
              <div key={item.id} className="flex items-center gap-2.5 rounded-lg bg-gray-50 px-3 py-2.5">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                <p className="flex-1 text-xs font-medium text-gray-500 line-through">{item.title}</p>
                <span className="text-[10px] font-semibold text-emerald-600">{done[item.id]}</span>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  )
}
