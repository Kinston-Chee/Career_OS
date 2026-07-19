import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BookOpen, Building2, ChevronRight, GraduationCap, Users,
  Shield, Handshake, UserCheck, Sparkles,
  CheckCircle2, Edit3, Send, RotateCcw, ChevronDown, ChevronUp, Clock, FileText,
} from 'lucide-react'
import UniversityNav from '../../components/university/UniversityNav'
import AgentChatDrawer from '../../components/university/aiOffice/AgentChatDrawer'
import DecisionRoomModal from '../../components/university/aiOffice/DecisionRoomModal'
import { AGENTS, DECISION_ROOM } from '../../components/university/aiOffice/agentConfig'
import robotImg from '../../assets/career-os-robot.png'

// ─── Display metadata for each room ──────────────────────────────────────────
const ROOM_META = {
  'student-success': {
    number: 1, icon: UserCheck, color: '#155EE8', time: '8:30 AM',
    bullets: [
      { text: '12 students flagged this week.', alert: false },
      { text: '3 need urgent follow-up.', alert: true },
    ],
  },
  'decision-room': {
    number: 2, icon: Building2, color: '#155EE8', time: '8:28 AM',
    bullets: [
      { text: '2 approvals needed from Dean.', alert: true },
      { text: '1 curriculum action overdue.', alert: true },
    ],
  },
  'curriculum': {
    number: 3, icon: GraduationCap, color: '#155EE8', time: '8:26 AM',
    bullets: [
      { text: 'GenAI coverage is 31% below market demand.', alert: true },
      { text: '18 modules reviewed this cycle.', alert: false },
    ],
  },
  'alumni': {
    number: 4, icon: Users, color: '#155EE8', time: '8:22 AM',
    bullets: [
      { text: 'Q2 cohort outcomes refreshed.', alert: false },
      { text: '47 employers linked.', alert: false },
    ],
  },
  'partnership': {
    number: 5, icon: Handshake, color: '#155EE8', time: '8:20 AM',
    bullets: [
      { text: '2 proposals awaiting sign-off.', alert: true },
      { text: '5 live projects this quarter.', alert: false },
    ],
  },
  'accreditation': {
    number: 6, icon: Shield, color: '#155EE8', time: '8:18 AM',
    bullets: [
      { text: '3 evidence items are still missing.', alert: true },
      { text: 'Request sent to Dr. Ahmad.', alert: false },
    ],
  },
}

const QUICK_ACTIONS = [
  { label: 'Review Accreditation', icon: BookOpen,       route: '/university/accreditation' },
  { label: 'Open Decision Room',   icon: Building2,      action: 'decision-room' },
  { label: 'Curriculum Gaps',      icon: GraduationCap,  route: '/university/curriculum-alignment' },
  { label: 'Alumni Signals',       icon: Users,          route: '/university/alumni-signals' },
]

// ─── Room card — chat bubble floating above open office image ─────────────────
function RoomCard({ dept, onChat, onDecisionRoom }) {
  const meta  = ROOM_META[dept.id]
  const Icon  = meta.icon
  const isCenter = dept.isCenter
  const handleClick = () => (isCenter ? onDecisionRoom() : onChat(dept))

  return (
    <div
      onClick={handleClick}
      className="group flex cursor-pointer flex-col items-center gap-0 transition-transform duration-200 hover:-translate-y-1"
    >
      {/* ── Speech bubble ── */}
      <div className={`relative w-full rounded-2xl border bg-white px-4 py-3 shadow-[0_4px_18px_rgba(21,94,232,0.10)] transition-shadow duration-200 group-hover:shadow-[0_8px_28px_rgba(21,94,232,0.18)]
        ${isCenter ? 'border-[#155EE8]/40 ring-2 ring-[#155EE8]/20' : 'border-[#E8EEF8]'}`}
      >
        {/* Header row */}
        <div className="mb-2 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <Icon className="h-3.5 w-3.5 shrink-0 text-[#155EE8]" />
            <p className="text-[12px] font-bold text-[#1B2545]">{dept.name}</p>
          </div>
          <span className="shrink-0 text-[10px] font-medium text-[#B0BADA]">{meta.time}</span>
        </div>

        {/* Bullet updates */}
        <div className="space-y-1">
          {meta.bullets.map((b, i) => (
            <div key={i} className="flex items-start gap-1.5">
              <span className={`mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full ${b.alert ? 'bg-orange-400' : 'bg-emerald-400'}`} />
              <p className="text-[11px] font-medium leading-[1.4] text-[#50607E]">{b.text}</p>
            </div>
          ))}
        </div>

        {/* Arrow pointing down toward office image */}
        <div className="absolute -bottom-[9px] left-1/2 -translate-x-1/2">
          <div className="relative h-0 w-0 border-l-[9px] border-r-[9px] border-t-[9px] border-l-transparent border-r-transparent border-t-[#E8EEF8]" />
          <div className="absolute -top-[10px] left-1/2 h-0 w-0 -translate-x-1/2 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-white" />
        </div>
      </div>

      {/* ── Office image — open, no card wrapper ── */}
      <div className="flex flex-1 items-center justify-center pt-3">
        <img
          src={dept.image}
          alt={dept.name}
          className="max-h-[260px] w-full object-contain drop-shadow-xl transition-transform duration-300 group-hover:scale-[1.05]"
        />
      </div>
    </div>
  )
}

// ─── Department inbox items ───────────────────────────────────────────────────
const DEPT_INBOX = [
  {
    deptId: 'curriculum',
    time: '8:26 AM',
    text: 'GenAI skill gap widened — syllabus coverage is 13% vs market demand of 44%. 340 students affected.',
    link: 'View curriculum gaps',
    to: '/university/curriculum-alignment',
    source: 'Curriculum Analysis · syllabus mapping + 47 job postings, last 90 days',
    pill: 'Critical',
    pillTone: 'red',
  },
  {
    deptId: 'student-success',
    time: '8:30 AM',
    text: '34 Year 2 Data Science students show declining DSA readiness — early intervention window closing.',
    link: 'View at-risk cohort',
    to: '/university/student-readiness',
    source: 'Student Success Office · academic scores + Career Memory completeness, updated today',
    pill: 'Time sensitive',
    pillTone: 'orange',
  },
  {
    deptId: 'partnership',
    time: '8:20 AM',
    text: 'Your Grab partnership generated 8 internship placements and 2 hires last quarter — highest ROI partner.',
    link: 'Review partnership',
    to: '/university/collaboration',
    source: 'Partnership Management · partnership hiring conversion records',
    pill: 'Opportunity',
    pillTone: 'green',
  },
  {
    deptId: 'accreditation',
    time: '8:18 AM',
    text: 'MQA submission in 5 months — 3 of 5 evidence items still missing. Dr. Ahmad has not responded.',
    link: 'Go to Accreditation Hub',
    to: '/university/accreditation',
    source: 'Accreditation Office · evidence pack completeness tracker',
    pill: 'Deadline',
    pillTone: 'purple',
  },
]

const PILL_TONES = {
  red:    'bg-red-50 text-red-700',
  orange: 'bg-orange-50 text-orange-700',
  green:  'bg-green-50 text-green-700',
  purple: 'bg-purple-50 text-purple-700',
}

const ICON_BG_TONES = {
  red:    'bg-red-50 text-red-600',
  orange: 'bg-orange-50 text-orange-600',
  green:  'bg-green-50 text-green-700',
  purple: 'bg-purple-50 text-purple-700',
}

// ─── Dept Attention Inbox ─────────────────────────────────────────────────────
function DeptInbox({ onNavigate }) {
  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-md">
      <div className="mb-1 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-purple-600" />
          <h2 className="text-sm font-bold text-gray-900">AI Department Updates</h2>
          <span className="text-xs text-gray-400">Updated 8:30 AM</span>
        </div>
        <span className="rounded-full bg-purple-50 px-2.5 py-0.5 text-[11px] font-medium text-purple-700">
          {DEPT_INBOX.length} items need attention
        </span>
      </div>

      <div className="divide-y divide-gray-50">
        {DEPT_INBOX.map((item, i) => {
          const meta = ROOM_META[item.deptId]
          const DeptIcon = meta.icon
          const deptName = AGENTS.find(a => a.id === item.deptId)?.name ?? 'Department'
          return (
            <button
              key={i}
              type="button"
              onClick={() => onNavigate(item.to)}
              className="flex w-full items-start gap-3 py-3.5 text-left transition hover:bg-gray-50/60"
            >
              {/* Dept icon in severity-toned circle */}
              <span className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${ICON_BG_TONES[item.pillTone]}`}>
                <DeptIcon className="h-4 w-4" />
              </span>

              <div className="min-w-0 flex-1">
                {/* Attribution line */}
                <p className="mb-0.5 text-[11px] font-semibold text-[#8A96B3]">
                  {deptName} · {item.time}
                </p>
                {/* Message */}
                <p className="text-sm leading-5 text-gray-800">{item.text}</p>
                {/* Link */}
                <span className="mt-1 inline-block text-xs font-semibold text-[#185FA5]">
                  {item.link} →
                </span>
                {/* Source */}
                {item.source && (
                  <p className="mt-0.5 text-[11px] italic text-gray-400">{item.source}</p>
                )}
              </div>

              <span className={`mt-0.5 shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-medium ${PILL_TONES[item.pillTone]}`}>
                {item.pill}
              </span>
              <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-gray-300" />
            </button>
          )
        })}
      </div>
    </section>
  )
}

// ─── Pending actions data ─────────────────────────────────────────────────────
const PENDING_ACTIONS = [
  {
    id: 'pa-1',
    agentId: 'partnership',
    actionType: 'approve',
    title: 'TalentBank Joint Research Proposal',
    agentNote: 'Sage has reviewed the terms and prepared the internal budget breakdown. Ready for Dean signature.',
    deadline: 'Today',
    deadlineTone: 'red',
    from: 'GenAI Curriculum Meeting',
    document: `JOINT RESEARCH AGREEMENT — DRAFT\n\nParties: Heriot-Watt University Malaysia & TalentBank Sdn Bhd\nValue: RM 180,000 | Duration: 24 months\n\nScope:\n• Co-design of GenAI Systems elective module (CS5001)\n• Industry practicum — 10 Semester 6 students per intake\n• Quarterly industry advisory sessions\n\nObligation:\n• University: provide faculty co-lead, submit MQA amendment by Aug 2026\n• TalentBank: assign 2 industry mentors, co-fund module materials\n\nStatus: Awaiting Dean's digital signature.`,
  },
  {
    id: 'pa-2',
    agentId: 'curriculum',
    actionType: 'edit',
    title: 'GenAI Systems Module Spec — CS5001',
    agentNote: 'Cleo drafted the 12-week outline and learning outcomes. Please review and adjust before Faculty Academic Board submission.',
    deadline: 'By Friday',
    deadlineTone: 'orange',
    from: 'GenAI Curriculum Meeting',
    document: `MODULE SPECIFICATION DRAFT\nCS5001 — GenAI Systems (Elective, Semester 5)\n\nWeek 1–2: Foundations of Large Language Models\nWeek 3–4: Prompt Engineering & RAG Pipelines\nWeek 5–6: Agentic Workflows & Tool Use\nWeek 7–8: Ethics, Bias & Responsible AI\nWeek 9–10: Industry Project (TalentBank co-facilitated)\nWeek 11–12: Presentations & Assessment\n\nLearning Outcomes:\n1. Design and evaluate LLM-powered applications\n2. Apply responsible AI principles in professional contexts\n3. Collaborate with industry on a live AI deployment\n\nAssessment: 40% coursework, 60% project`,
  },
  {
    id: 'pa-3',
    agentId: 'student-success',
    actionType: 'approve',
    title: 'Student Intervention Plan — 3 Urgent Cases',
    agentNote: 'Aria drafted personalised plans for Chris Lee, Priya Nair, and Ahmed Al-Rashid. Your endorsement activates counselling credit allocation immediately.',
    deadline: 'By Wednesday',
    deadlineTone: 'orange',
    from: 'Student Risk Meeting',
    document: `INTERVENTION PLAN — CONFIDENTIAL\n\nChris Lee (Y2 BSc CS · ID: 2024-0341)\nRisk: GPA dropped 3.2 → 2.6, missed 2 consultations\nPlan: Urgent 1-on-1 with academic advisor + weekly tutor check-in\n\nPriya Nair (Y2 BSc CS · ID: 2024-0289)\nRisk: Attendance 68%, mental health referral received\nPlan: Counselling referral (priority), flexible assessment extension\n\nAhmed Al-Rashid (Y2 BSc CS · ID: 2024-0412)\nRisk: International student, financial stress flagged by welfare form\nPlan: Finance office referral + peer buddy assignment`,
  },
  {
    id: 'pa-4',
    agentId: 'accreditation',
    actionType: 'submit',
    title: 'MQA Programme Amendment Filing — CS5001',
    agentNote: 'Rex completed the MQA form. All internal signatures collected. Ready to submit to the MQA online portal.',
    deadline: 'Aug 2026',
    deadlineTone: 'purple',
    from: 'GenAI Curriculum Meeting',
    document: `MQA PROGRAMME AMENDMENT\nRef: HWU-MY/PA/2026/004\n\nProgramme: BSc Computer Science (MQF Level 6)\nAmendment: New Elective Module — CS5001 GenAI Systems\n\nDocumentation attached:\n✓ Module specification (CS5001)\n✓ Faculty Academic Board minutes (July 2026)\n✓ Industry advisory letter (TalentBank + Grab)\n✓ Internal budget approval\n\nPortal: MQA Online System\nTarget deadline: Before December self-review`,
  },
]

const ACTION_META = {
  approve: { label: 'Approve & Sign', icon: CheckCircle2, color: 'bg-emerald-600 hover:bg-emerald-700', secondaryLabel: 'Send Back', doneLabel: 'Approved' },
  edit:    { label: 'Save & Submit', icon: Send,          color: 'bg-[#155EE8] hover:bg-blue-700',       secondaryLabel: 'Discard',   doneLabel: 'Submitted to FAB' },
  submit:  { label: 'Confirm Submit', icon: Send,         color: 'bg-purple-600 hover:bg-purple-700',    secondaryLabel: 'Not yet',   doneLabel: 'Submitted to MQA' },
}

const DEADLINE_TONES = {
  red:    'bg-red-50 text-red-700',
  orange: 'bg-orange-50 text-orange-700',
  green:  'bg-green-50 text-green-700',
  purple: 'bg-purple-50 text-purple-700',
}

// ─── Pending Actions Panel ────────────────────────────────────────────────────
function PendingActionsPanel() {
  const [expanded, setExpanded] = useState(null)
  const [done, setDone]         = useState({})      // id → doneLabel
  const [editVals, setEditVals] = useState(
    Object.fromEntries(PENDING_ACTIONS.map(a => [a.id, a.document]))
  )

  const pending = PENDING_ACTIONS.filter(a => !done[a.id])
  const completed = PENDING_ACTIONS.filter(a => done[a.id])

  const handlePrimary = (item) => {
    setDone(prev => ({ ...prev, [item.id]: ACTION_META[item.actionType].doneLabel }))
    setExpanded(null)
  }
  const handleSecondary = (item) => {
    setExpanded(null)
  }

  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-md">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-blue-600" />
          <h2 className="text-sm font-bold text-gray-900">Pending Your Action</h2>
          <span className="text-xs text-gray-400">Prepared by AI agents</span>
        </div>
        {pending.length > 0 && (
          <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-medium text-blue-700">
            {pending.length} awaiting review
          </span>
        )}
      </div>

      {/* Pending items */}
      {pending.length === 0 && completed.length === 0 && (
        <p className="py-4 text-center text-sm text-gray-400">All caught up — no pending actions.</p>
      )}

      <div className="space-y-2">
        {pending.map((item) => {
          const meta    = ACTION_META[item.actionType]
          const deptMeta = ROOM_META[item.agentId]
          const DeptIcon = deptMeta?.icon ?? FileText
          const agent   = AGENTS.find(a => a.id === item.agentId)
          const isOpen  = expanded === item.id
          const isEdit  = item.actionType === 'edit'

          return (
            <div key={item.id} className={`rounded-xl border transition-all ${isOpen ? 'border-blue-200 bg-blue-50/40' : 'border-gray-100 bg-gray-50/50 hover:border-gray-200'}`}>
              {/* Row header — always visible */}
              <button
                type="button"
                onClick={() => setExpanded(isOpen ? null : item.id)}
                className="flex w-full items-start gap-3 px-4 py-3.5 text-left"
              >
                <span className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${ICON_BG_TONES[item.deadlineTone] ?? 'bg-blue-50 text-blue-600'}`}>
                  <DeptIcon className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-semibold text-[#8A96B3]">
                    {agent?.name ?? 'AI Agent'} · {item.from}
                  </p>
                  <p className="mt-0.5 text-sm font-semibold text-gray-900">{item.title}</p>
                  <p className="mt-0.5 text-xs text-gray-500 leading-relaxed">{item.agentNote}</p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1.5">
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${DEADLINE_TONES[item.deadlineTone]}`}>
                    {item.deadline}
                  </span>
                  <span className="rounded-full border border-gray-200 bg-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gray-500">
                    {item.actionType}
                  </span>
                </div>
                {isOpen
                  ? <ChevronUp className="mt-1 h-4 w-4 shrink-0 text-gray-400" />
                  : <ChevronDown className="mt-1 h-4 w-4 shrink-0 text-gray-400" />
                }
              </button>

              {/* Expanded area */}
              {isOpen && (
                <div className="border-t border-blue-100 px-4 pb-4 pt-3">
                  {isEdit ? (
                    <textarea
                      className="w-full rounded-lg border border-blue-200 bg-white p-3 font-mono text-xs leading-relaxed text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      rows={14}
                      value={editVals[item.id]}
                      onChange={e => setEditVals(prev => ({ ...prev, [item.id]: e.target.value }))}
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
                      onClick={() => handleSecondary(item)}
                      className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-600 transition hover:bg-gray-50"
                    >
                      <RotateCcw className="h-3 w-3" />
                      {meta.secondaryLabel}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Completed items */}
      {completed.length > 0 && (
        <div className="mt-4 border-t border-gray-100 pt-4">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">Completed</p>
          <div className="space-y-1.5">
            {completed.map(item => (
              <div key={item.id} className="flex items-center gap-2.5 rounded-lg bg-gray-50 px-3 py-2.5">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                <p className="flex-1 text-xs font-medium text-gray-500 line-through">{item.title}</p>
                <span className="text-[10px] font-semibold text-emerald-600">{done[item.id]}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
const ALL_ROOMS = [
  AGENTS[0],    // Student Success
  DECISION_ROOM,
  AGENTS[1],    // Curriculum
  AGENTS[2],    // Alumni
  AGENTS[4],    // Partnership
  AGENTS[3],    // Accreditation
]

export default function UniversityAIOffice() {
  const navigate = useNavigate()
  const [activeAgent,      setActiveAgent]      = useState(null)
  const [decisionRoomOpen, setDecisionRoomOpen] = useState(false)

  const handleQuickAction = (a) => {
    if (a.action === 'decision-room') { setDecisionRoomOpen(true); return }
    if (a.route) navigate(a.route)
  }

  return (
    <div
      className="university-workspace-page flex h-screen w-screen flex-col overflow-hidden text-[#111B3F]"
      style={{ background: 'linear-gradient(160deg, #F5F8FF 0%, #EBF0FA 60%, #F0F4FF 100%)' }}
    >
      <UniversityNav />

      <main className="min-w-0 flex-1 overflow-y-auto">
        <div className="mx-auto max-w-[1440px] space-y-4 px-6 py-4">

          {/* Title + tab toggle */}
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-semibold text-slate-900">University AI Office</h1>
              <p className="mt-0.5 text-xs font-medium text-slate-400">
                Click any room to chat · Click Central Decision Room to open a multi-agent meeting
              </p>
            </div>
            <div className="flex overflow-hidden rounded-lg border border-[#D8E0F0] bg-white/80 p-0.5 shadow-sm">
              <button type="button" onClick={() => navigate('/university/overview')}
                className="rounded-md px-4 py-1.5 text-xs font-semibold text-[#415174] hover:bg-blue-50">
                📋 Briefing
              </button>
              <button type="button"
                className="rounded-md bg-[#155EE8] px-4 py-1.5 text-xs font-bold text-white shadow-sm">
                🏢 AI Office
              </button>
            </div>
          </div>

          {/* Robot briefing strip */}
          <div className="flex items-center gap-4 rounded-2xl border border-white/70 bg-white/80 px-5 py-3.5 shadow-[0_4px_20px_rgba(24,95,165,0.08)] backdrop-blur-sm">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EEF2FB]">
              <img src={robotImg} alt="" className="h-10 w-10 object-contain" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-[#1B2545]">Good morning, Dr. Evelyn Chen.</p>
              <p className="text-xs font-medium text-[#50607E]">
                3 MQA evidence items outstanding · GenAI demand up 12% · 2 decisions awaiting your approval
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap items-center gap-2">
              {QUICK_ACTIONS.map((a) => {
                const Icon = a.icon
                return (
                  <button key={a.label} type="button" onClick={() => handleQuickAction(a)}
                    className="flex items-center gap-1.5 rounded-xl border border-[#D8E0F0] bg-white/80 px-3.5 py-2 text-xs font-bold text-[#26304D] shadow-sm transition hover:border-blue-300 hover:bg-blue-50 hover:text-[#155EE8]">
                    <Icon className="h-3.5 w-3.5" />{a.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* 3 × 2 room grid */}
          <div className="grid grid-cols-3 gap-4" style={{ gridAutoRows: '380px' }}>
            {ALL_ROOMS.map((dept) => (
              <RoomCard
                key={dept.id}
                dept={dept}
                onChat={setActiveAgent}
                onDecisionRoom={() => setDecisionRoomOpen(true)}
              />
            ))}
          </div>

          {/* Department attention inbox */}
          <DeptInbox onNavigate={(to) => navigate(to)} />

          {/* Pending actions from AI agents */}
          <PendingActionsPanel />

          {/* Bottom info strip */}
          <div className="flex items-center justify-between gap-4 pb-2">
            <div className="flex items-center gap-6">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#8A96B3]">Information Flow</p>
              {[
                { color: '#155EE8', label: 'Data & Insights' },
                { color: '#F59E0B', label: 'Evidence Collection' },
                { color: '#8B5CF6', label: 'Decision & Approval' },
              ].map((l) => (
                <div key={l.label} className="flex items-center gap-2">
                  <div className="h-px w-8" style={{
                    background: `repeating-linear-gradient(90deg,${l.color} 0,${l.color} 4px,transparent 4px,transparent 8px)`
                  }} />
                  <span className="text-[10px] font-medium text-[#50607E]">{l.label}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-[#155EE8]/20 bg-white/60 px-4 py-2">
              <img src={robotImg} alt="" className="h-8 w-8 object-contain" />
              <div>
                <p className="text-[11px] font-bold text-[#155EE8]">AI Office</p>
                <p className="text-[10px] font-medium text-[#415174]">is working for you 24/7</p>
              </div>
            </div>
          </div>

        </div>
      </main>

      {activeAgent && <AgentChatDrawer agent={activeAgent} onClose={() => setActiveAgent(null)} />}
      {decisionRoomOpen && <DecisionRoomModal onClose={() => setDecisionRoomOpen(false)} />}
    </div>
  )
}
