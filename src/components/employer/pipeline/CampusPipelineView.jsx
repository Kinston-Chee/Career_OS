import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  AlertCircle,
  ArrowRight,
  Bell,
  Bot,
  Building2,
  ChevronRight,
  Download,
  ExternalLink,
  Filter,
  Flame,
  GitBranch,
  Kanban,
  Lightbulb,
  Mail,
  Plus,
  School,
  Search,
  Send,
  Sparkles,
  Target,
  TrendingDown,
  TrendingUp,
  User,
  Users,
  X,
} from 'lucide-react'
import { candidates as CANDIDATE_DIRECTORY } from '../../../data/candidatesData'

const CANDIDATE_MAP = Object.fromEntries(CANDIDATE_DIRECTORY.map((c) => [c.id, c]))

// ── Mock data ───────────────────────────────────────────────────────────────
const METRICS = [
  { key: 'total', label: 'Total in pipeline', value: 342, tone: 'blue', delta: '+28 this quarter', deltaTone: 'up', Icon: Users },
  { key: 'conv', label: 'Conversion rate', value: '18%', tone: 'green', delta: '+3% vs last quarter', deltaTone: 'up', Icon: TrendingUp },
  { key: 'risk', label: 'At risk of going cold', value: 27, tone: 'amber', delta: 'No engagement in 60+ days', deltaTone: 'neutral', Icon: Flame },
  { key: 'time', label: 'Avg. time to offer', value: '34d', tone: 'purple', delta: '4d slower vs Q1', deltaTone: 'down', Icon: Bot },
]

const TONE_STRIPE = { blue: '#5B6CF9', green: '#10B981', amber: '#F59E0B', red: '#EF4444', purple: '#8B5CF6' }
const TONE_VAL = { blue: 'text-[#5B6CF9]', green: 'text-[#10B981]', amber: 'text-[#F59E0B]', purple: 'text-[#8B5CF6]', red: 'text-[#EF4444]' }
const DELTA_COLOR = { up: 'text-[#10B981]', down: 'text-[#EF4444]', neutral: 'text-[#94A3B8]' }

const FUNNEL_STAGES = [
  { key: 's1', count: 122, name: 'AWARE', flex: 1.22, bg: '#6E7FFA' },
  { key: 's2', count: 109, name: 'ENGAGED', flex: 1.09, bg: '#8B5CF6' },
  { key: 's3', count: 43, name: 'IN PROCESS', flex: 0.6, bg: '#10B981' },
  { key: 's4', count: 68, name: 'FUTURE POOL', flex: 0.75, bg: '#F59E0B' },
  { key: 's5', count: 16, name: 'HIRED', flex: 0.35, bg: '#4455E8' },
]

const FUNNEL_LABELS = [
  { pct: '—', tone: 'default', label: 'Awareness start' },
  { pct: '89%', tone: 'good', label: 'Aware → Engaged' },
  { pct: '39%', tone: 'warn', label: 'Engaged → In Process' },
  { pct: 'n/a', tone: 'good', label: 'Future Pool' },
  { pct: '37%', tone: 'good', label: 'In Process → Hire' },
]

const SUGGESTIONS = [
  {
    id: 'sug-1',
    Icon: School,
    tone: 'blue',
    text: '3 Backend Workshop graduates from last year are due to finish in June — ideal timing for your open Software Engineer role.',
    impact: 'High fit',
    primary: 'Send invite',
    secondary: 'View 3 candidates',
  },
  {
    id: 'sug-2',
    Icon: Target,
    tone: 'green',
    text: '5 Future-Pool candidates match your upcoming Data Analyst opening based on their skill signals and activity.',
    impact: 'Skill match',
    primary: 'Move to Warm',
    secondary: 'View 5 candidates',
  },
  {
    id: 'sug-3',
    Icon: AlertCircle,
    tone: 'amber',
    text: "12 candidates haven't been engaged in 60+ days and are at risk of going cold. A quick check-in could save them.",
    impact: 'Urgent',
    primary: 'Send check-in',
    secondary: 'View 12 candidates',
  },
]

// Which directory candidates each AI suggestion refers to, so "View N
// candidates" and the email draft address real people.
const SUGGESTION_CANDIDATES = {
  'sug-1': ['ivan-lim', 'jason-lee', 'yew-chen'],
  'sug-2': ['hiro-ping', 'nur-alya', 'siti-maisarah', 'siti-aisyah', 'kevin-goh'],
  'sug-3': [
    'jason-lee', 'aisha-rahman', 'daniel-lee', 'chloe-tan', 'siti-aisyah', 'siti-maisarah',
    'yew-chen', 'kevin-goh', 'nur-alya', 'hiro-ping', 'marcus-tan', 'ivan-lim',
  ],
}

const EMAIL_TEMPLATES = {
  'sug-1': {
    subject: 'Software Engineer opening at Acme — a note for our Backend Workshop alumni',
    body: `Hi there,

You joined our Backend Workshop last year, and with your graduation coming up in June the timing lines up well: we have a Software Engineer role opening on the platform team.

Given what you built during the workshop, I think you would be a strong fit. The role covers API design, service reliability, and the same stack we used in the sessions.

Would you be open to a short call in the next two weeks to talk it through?

Best,
Edwin Khoo
Campus Talent, Acme Corporation`,
  },
  'sug-2': {
    subject: 'Data Analyst opening at Acme — matched to your skill profile',
    body: `Hi there,

We are opening a Data Analyst position, and your skill signals — SQL, Python, and the analytics work already on your CareerOS profile — line up closely with what the team needs.

You are currently in our future-talent pool, so this is an early heads-up before the role goes public.

If the timing works for you, reply here and I will share the full brief.

Best,
Edwin Khoo
Campus Talent, Acme Corporation`,
  },
  'sug-3': {
    subject: 'Checking in from Acme — still exploring opportunities?',
    body: `Hi there,

It has been a couple of months since we last spoke, and I wanted to check in rather than let the conversation go quiet.

If you are still exploring graduate and internship opportunities, I would be glad to update you on what is opening this quarter. If your plans have changed, just let me know and I will keep your profile on file without further emails.

Either way, it would be good to hear from you.

Best,
Edwin Khoo
Campus Talent, Acme Corporation`,
  },
  default: {
    subject: 'A note from Acme Corporation',
    body: `Hi there,

We would like to reconnect about opportunities at Acme.

Best,
Edwin Khoo
Campus Talent, Acme Corporation`,
  },
}

const SUG_ICON_BG = {
  blue: 'bg-[#EEF0FF] text-[#5B6CF9]',
  green: 'bg-[#ECFDF5] text-[#10B981]',
  amber: 'bg-[#FFFBEB] text-[#F59E0B]',
  red: 'bg-[#FEF2F2] text-[#EF4444]',
}

const UNIVERSITIES = [
  { name: "Taylor's University", count: 141, conv: '22%', color: '#5B6CF9', width: 100, tone: 'high' },
  { name: 'APU',                 count: 98,  conv: '19%', color: '#8B5CF6', width: 69,  tone: 'high' },
  { name: 'Sunway University',   count: 61,  conv: '14%', color: '#10B981', width: 43,  tone: 'mid' },
  { name: 'MMU',                 count: 42,  conv: '9%',  color: '#F59E0B', width: 30,  tone: 'low' },
]

const KANBAN = [
  {
    key: 'aware', name: 'Aware', count: 122, dot: '#94A3B8', badgeBg: '#F1F5F9', badgeColor: '#475569',
    statusStyle: 'bg-[#F1F5F9] text-[#64748B]',
    items: [
      { id: 'jason-lee', color: '#475569', status: 'Identified' },
      { id: 'aisha-rahman', color: '#64748B', status: 'Outreach sent' },
      { id: 'daniel-lee', color: '#334155', status: 'Contacted' },
    ],
    more: 119,
  },
  {
    key: 'engaged', name: 'Engaged', count: 109, dot: '#8B5CF6', badgeBg: '#F5F3FF', badgeColor: '#8B5CF6',
    statusStyle: 'bg-[#F5F3FF] text-[#8B5CF6]',
    items: [
      { id: 'hiro-ping', color: '#8B5CF6', status: 'Event attended' },
      { id: 'nur-alya', color: '#7C3AED', status: 'Challenge joined' },
      { id: 'kevin-goh', color: '#6D28D9', status: 'Workshop attended' },
    ],
    more: 106,
  },
  {
    key: 'process', name: 'In Process', count: 43, dot: '#10B981', badgeBg: '#ECFDF5', badgeColor: '#10B981',
    statusStyle: 'bg-[#ECFDF5] text-[#10B981]',
    items: [
      { id: 'ivan-lim', color: '#10B981', status: 'Shortlisted' },
      { id: 'marcus-tan', color: '#059669', status: 'Interview-ready' },
      { id: 'chloe-tan', color: '#047857', status: 'Interview-ready' },
    ],
    more: 40,
  },
  {
    key: 'future', name: 'Future Pool', count: 68, dot: '#F59E0B', badgeBg: '#FFFBEB', badgeColor: '#F59E0B',
    statusStyle: 'bg-[#FFF7ED] text-[#C2410C]',
    items: [
      { id: 'yew-chen', color: '#F59E0B', status: 'Future intake' },
      { id: 'siti-maisarah', color: '#D97706', status: 'Available Jul 2025' },
      { id: 'siti-aisyah', color: '#B45309', status: 'Referred by alumni' },
    ],
    more: 65,
  },
]

const PERIODS = ['Q1', 'Q2', 'Q3', 'YTD']
const UNI_FILTERS = ['All', "Taylor's", 'APU', 'Sunway']

// ── Candidate list modal ────────────────────────────────────────────────────
// Opened by "View N candidates" on a suggestion. Rows open the full profile.
function CandidateListModal({ suggestion, onClose, onOpenProfile, onInvite }) {
  const people = (SUGGESTION_CANDIDATES[suggestion.id] || [])
    .map((id) => CANDIDATE_MAP[id])
    .filter(Boolean)

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/40 px-4 py-6" onClick={onClose}>
      <section
        role="dialog"
        aria-modal="true"
        aria-label={suggestion.secondary}
        onClick={(event) => event.stopPropagation()}
        className="flex max-h-full w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-[0_28px_80px_rgba(15,23,42,0.22)]"
      >
        <header className="flex items-start justify-between gap-4 border-b border-[#E2E8F0] px-6 py-4">
          <div className="flex items-start gap-3">
            <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${SUG_ICON_BG[suggestion.tone]}`}>
              <suggestion.Icon className="h-4 w-4" />
            </span>
            <div>
              <h2 className="text-[15px] font-bold text-[#0F172A]">{suggestion.secondary}</h2>
              <p className="mt-0.5 max-w-[440px] text-[12px] leading-5 text-[#64748B]">{suggestion.text}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-1.5 text-[#94A3B8] transition hover:bg-[#F1F5F9] hover:text-[#334155]"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-3">
          {people.map((person) => (
            <button
              key={person.id}
              type="button"
              onClick={() => onOpenProfile(person.id)}
              aria-label={`Open the profile for ${person.name}`}
              className="group mb-1.5 flex w-full items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 text-left transition hover:border-[#E2E8F0] hover:bg-[#F8FAFC]"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EEF0FF] text-[11.5px] font-bold text-[#5B6CF9]">
                {person.initials}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13px] font-semibold text-[#0F172A] group-hover:text-[#5B6CF9]">{person.name}</span>
                <span className="block truncate text-[11.5px] text-[#64748B]">
                  {person.university} · {person.course} · {person.year}
                </span>
              </span>
              <span className="shrink-0 text-right">
                <span className="block font-mono text-[13px] font-bold text-[#10B981]">{person.matchScore}%</span>
                <span className="block text-[10px] font-semibold uppercase tracking-wide text-[#94A3B8]">{person.pipelineStage}</span>
              </span>
              <ChevronRight className="h-4 w-4 shrink-0 text-[#CBD5E1] transition-transform group-hover:translate-x-0.5 group-hover:text-[#5B6CF9]" />
            </button>
          ))}

          {people.length === 0 ? (
            <p className="px-3 py-8 text-center text-[13px] text-[#94A3B8]">No candidates in this group yet.</p>
          ) : null}
        </div>

        <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-[#E2E8F0] bg-[#F8FAFC] px-6 py-3.5">
          <span className="text-[11.5px] text-[#64748B]">
            {people.length} candidate{people.length === 1 ? '' : 's'} · click any row to open the full profile
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-[#E2E8F0] bg-white px-3.5 py-2 text-[12.5px] font-semibold text-[#64748B] transition hover:bg-[#F1F5F9]"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => onInvite(suggestion)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#5B6CF9] px-3.5 py-2 text-[12.5px] font-semibold text-white transition hover:bg-[#4455E8]"
            >
              <Mail className="h-3.5 w-3.5" /> Draft email to all
            </button>
          </div>
        </footer>
      </section>
    </div>
  )
}

// ── Email draft modal ───────────────────────────────────────────────────────
// Opened by "Send invite" / "Send check-in". Editable before sending.
function EmailDraftModal({ suggestion, onClose, onSend }) {
  const people = (SUGGESTION_CANDIDATES[suggestion.id] || [])
    .map((id) => CANDIDATE_MAP[id])
    .filter(Boolean)
  const template = EMAIL_TEMPLATES[suggestion.id] || EMAIL_TEMPLATES.default

  const [subject, setSubject] = useState(template.subject)
  const [body, setBody] = useState(template.body)

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/40 px-4 py-6" onClick={onClose}>
      <section
        role="dialog"
        aria-modal="true"
        aria-label="Email draft"
        onClick={(event) => event.stopPropagation()}
        className="flex max-h-full w-full max-w-xl flex-col overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-[0_28px_80px_rgba(15,23,42,0.22)]"
      >
        <header className="flex items-start justify-between gap-4 border-b border-[#E2E8F0] px-6 py-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EEF0FF] text-[#5B6CF9]">
              <Mail className="h-4 w-4" />
            </span>
            <div>
              <h2 className="text-[15px] font-bold text-[#0F172A]">{suggestion.primary}</h2>
              <p className="mt-0.5 flex items-center gap-1.5 text-[11.5px] text-[#64748B]">
                <Sparkles className="h-3 w-3 text-[#5B6CF9]" />
                AI-drafted — edit before sending
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-1.5 text-[#94A3B8] transition hover:bg-[#F1F5F9] hover:text-[#334155]"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-6 py-4">
          <div>
            <p className="text-[10.5px] font-bold uppercase tracking-wide text-[#94A3B8]">To</p>
            <div className="mt-1.5 flex flex-wrap gap-1.5 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2">
              {people.map((person) => (
                <span key={person.id} className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[11.5px] font-medium text-[#334155] ring-1 ring-[#E2E8F0]">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#EEF0FF] text-[8px] font-bold text-[#5B6CF9]">
                    {person.initials}
                  </span>
                  {person.name}
                </span>
              ))}
              {people.length === 0 ? <span className="text-[11.5px] text-[#94A3B8]">No recipients</span> : null}
            </div>
          </div>

          <label className="block">
            <span className="text-[10.5px] font-bold uppercase tracking-wide text-[#94A3B8]">Subject</span>
            <input
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              aria-label="Email subject"
              className="mt-1.5 w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-[13px] font-medium text-[#0F172A] outline-none focus:border-[#5B6CF9]"
            />
          </label>

          <label className="block">
            <span className="text-[10.5px] font-bold uppercase tracking-wide text-[#94A3B8]">Message</span>
            <textarea
              value={body}
              onChange={(event) => setBody(event.target.value)}
              rows={10}
              aria-label="Email body"
              className="mt-1.5 w-full resize-y rounded-lg border border-[#E2E8F0] px-3 py-2.5 text-[13px] leading-6 text-[#334155] outline-none focus:border-[#5B6CF9]"
            />
          </label>

          <p className="text-[11px] text-[#94A3B8]">
            Sends from campus@acme.com · each candidate receives an individual copy, not a group thread.
          </p>
        </div>

        <footer className="flex justify-end gap-2 border-t border-[#E2E8F0] bg-[#F8FAFC] px-6 py-3.5">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-[#E2E8F0] bg-white px-3.5 py-2 text-[12.5px] font-semibold text-[#64748B] transition hover:bg-[#F1F5F9]"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!subject.trim() || !body.trim() || people.length === 0}
            onClick={() => onSend(people.length)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#5B6CF9] px-4 py-2 text-[12.5px] font-semibold text-white transition hover:bg-[#4455E8] disabled:opacity-50"
          >
            <Send className="h-3.5 w-3.5" /> Send to {people.length}
          </button>
        </footer>
      </section>
    </div>
  )
}

// ── Sub-components ──────────────────────────────────────────────────────────
function MetricCard({ metric }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white px-5 py-4">
      <span className="absolute inset-x-0 top-0 h-[3px] rounded-t-2xl" style={{ background: TONE_STRIPE[metric.tone] }} />
      <div className="flex items-center gap-1.5 text-[11.5px] font-medium text-[#64748B]">
        <metric.Icon className="h-3.5 w-3.5" style={{ color: TONE_STRIPE[metric.tone] }} />
        {metric.label}
      </div>
      <p className={`mt-1.5 text-[32px] font-bold leading-none tracking-tight tabular-nums ${TONE_VAL[metric.tone]}`}>{metric.value}</p>
      <p className={`mt-1 flex items-center gap-1 text-[12px] font-medium ${DELTA_COLOR[metric.deltaTone]}`}>
        {metric.deltaTone === 'up' ? <TrendingUp className="h-3.5 w-3.5" /> : metric.deltaTone === 'down' ? <TrendingDown className="h-3.5 w-3.5" /> : null}
        {metric.delta}
      </p>
    </div>
  )
}

function FunnelBar() {
  const arrowShape = 'polygon(0 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 0 100%, 12px 50%)'
  const firstShape = 'polygon(0 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 0 100%)'
  const lastShape  = 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 12px 50%)'
  return (
    <div className="rounded-2xl border border-[#E2E8F0] bg-white px-6 py-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-[14px] font-semibold text-[#0F172A]">
            <GitBranch className="h-4 w-4 text-[#5B6CF9]" />
            Conversion funnel
          </div>
          <p className="mt-0.5 text-[12px] text-[#64748B]">Candidate drop-off across pipeline stages · hover to inspect</p>
        </div>
        <button type="button" className="inline-flex items-center gap-1 rounded-lg border border-[#E2E8F0] px-2.5 py-1 text-[12px] font-medium text-[#64748B] transition hover:bg-[#F1F5F9]">
          <ExternalLink className="h-3.5 w-3.5" /> Full report
        </button>
      </div>
      <div className="flex h-14 items-stretch overflow-hidden rounded-[10px]">
        {FUNNEL_STAGES.map((s, i) => (
          <div
            key={s.key}
            title={`${s.count} candidates — ${s.name}`}
            className="flex flex-col items-center justify-center text-white transition-opacity"
            style={{
              flex: s.flex,
              background: s.bg,
              padding: i === 0 ? '0 22px 0 16px' : i === FUNNEL_STAGES.length - 1 ? '0 22px' : '0 22px',
              clipPath: i === 0 ? firstShape : i === FUNNEL_STAGES.length - 1 ? lastShape : arrowShape,
            }}
          >
            <span className="text-[17px] font-bold leading-none tabular-nums">{s.count}</span>
            <span className="mt-0.5 text-[10px] font-medium tracking-wide opacity-90">{s.name}</span>
          </div>
        ))}
      </div>
      <div className="mt-2 flex flex-wrap justify-between gap-1.5 pt-2">
        {FUNNEL_LABELS.map((l) => (
          <span key={l.label} className="inline-flex items-center gap-1 text-[11px] text-[#64748B]">
            <span
              className={`rounded px-1.5 py-0.5 font-mono text-[10.5px] font-semibold ${
                l.tone === 'good' ? 'bg-[#ECFDF5] text-[#10B981]' : l.tone === 'warn' ? 'bg-[#FFFBEB] text-[#B45309]' : 'bg-[#F1F5F9] text-[#475569]'
              }`}
            >
              {l.pct}
            </span>
            {l.label}
          </span>
        ))}
      </div>
    </div>
  )
}

function SuggestionsPanel({ onViewCandidates, onPrimaryAction }) {
  return (
    <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5">
      <div className="mb-4 flex items-center gap-2.5 border-b border-[#F1F5F9] pb-3.5">
        <span className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[10px] text-white" style={{ background: 'linear-gradient(135deg, #5B6CF9, #8B5CF6)' }}>
          <Sparkles className="h-4 w-4" />
        </span>
        <div>
          <p className="text-[14px] font-semibold text-[#0F172A]">AI Re-warming Suggestions</p>
          <p className="text-[11.5px] text-[#64748B]">Smart actions based on pipeline signals</p>
        </div>
        <span className="ml-auto rounded-full bg-[#EEF0FF] px-2 py-0.5 text-[11px] font-semibold text-[#5B6CF9]">3 opportunities</span>
      </div>
      <div className="flex flex-col gap-2.5">
        {SUGGESTIONS.map((s) => (
          <div key={s.id} className="rounded-xl border border-[#E2E8F0] p-4 transition hover:border-[#5B6CF9] hover:ring-4 hover:ring-[#EEF0FF]">
            <div className="mb-2.5 flex items-start gap-2.5">
              <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${SUG_ICON_BG[s.tone]}`}>
                <s.Icon className="h-3.5 w-3.5" />
              </span>
              <p className="flex-1 text-[12.5px] leading-relaxed text-[#334155]">{s.text}</p>
              <span className="shrink-0 rounded bg-[#ECFDF5] px-1.5 py-0.5 text-[10.5px] font-semibold text-[#10B981]">{s.impact}</span>
            </div>
            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={() => onPrimaryAction(s)}
                className="flex-1 rounded-md bg-[#5B6CF9] px-2.5 py-1.5 text-[12px] font-medium text-white transition hover:bg-[#4455E8]"
              >
                {s.primary}
              </button>
              <button
                type="button"
                onClick={() => onViewCandidates(s)}
                className="flex-1 rounded-md border border-[#E2E8F0] px-2.5 py-1.5 text-[12px] font-medium text-[#64748B] transition hover:bg-[#F8FAFC]"
              >
                {s.secondary}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function UniversitiesPanel() {
  return (
    <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5">
      <div className="mb-2.5">
        <p className="flex items-center gap-2 text-[14px] font-semibold text-[#0F172A]">
          <Building2 className="h-4 w-4 text-[#5B6CF9]" />
          By university
        </p>
        <p className="mt-0.5 text-[12px] text-[#64748B]">Candidates and conversion rate</p>
      </div>
      <div className="flex gap-2 pb-2 text-[10.5px] font-semibold uppercase tracking-wider text-[#94A3B8]">
        <span className="flex-1">University</span>
        <span className="w-7 text-right">#</span>
        <span className="w-24 text-center">Volume</span>
        <span className="w-9 text-right">Conv.</span>
      </div>
      {UNIVERSITIES.map((u) => (
        <div key={u.name} className="flex items-center gap-3 border-b border-[#F1F5F9] py-2.5 last:border-b-0">
          <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: u.color }} />
          <span className="flex-1 text-[13px] font-medium text-[#1E293B]">{u.name}</span>
          <span className="w-7 text-right font-mono text-[12px] text-[#64748B]">{u.count}</span>
          <div className="w-[90px]">
            <div className="h-[5px] rounded-full bg-[#F1F5F9]">
              <div className="h-[5px] rounded-full" style={{ width: `${u.width}%`, background: u.color }} />
            </div>
          </div>
          <span className={`w-9 text-right font-mono text-[11.5px] font-semibold ${
            u.tone === 'high' ? 'text-[#10B981]' : u.tone === 'mid' ? 'text-[#F59E0B]' : 'text-[#EF4444]'
          }`}>{u.conv}</span>
        </div>
      ))}
      <div className="mt-4 border-t border-[#F1F5F9] pt-3">
        <p className="mb-2.5 text-[11.5px] font-semibold text-[#334155]">Insight</p>
        <div className="flex items-start gap-2 rounded-[10px] bg-[#FFFBEB] px-3 py-2.5 text-[12px] leading-relaxed text-[#92400E]">
          <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#F59E0B]" />
          MMU has low conversion (9%) despite reasonable volume. Consider increasing touchpoints or targeting different programs there.
        </div>
      </div>
    </div>
  )
}

function KanbanBoard({ filter, onFilter, onOpenProfile }) {
  return (
    <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="flex items-center gap-2 text-[14px] font-semibold text-[#0F172A]">
            <Kanban className="h-4 w-4 text-[#5B6CF9]" />
            Pipeline stages
          </p>
          <p className="mt-0.5 text-[12px] text-[#64748B]">Drag candidates between stages</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            {UNI_FILTERS.map((u) => {
              const active = filter === u
              return (
                <button
                  key={u}
                  type="button"
                  onClick={() => onFilter(u)}
                  className={`rounded-full border px-3 py-1 text-[12px] font-medium transition ${
                    active ? 'border-[#0F172A] bg-[#0F172A] text-white' : 'border-[#E2E8F0] text-[#64748B] hover:border-[#CBD5E1]'
                  }`}
                >
                  {u}
                </button>
              )
            })}
          </div>
          <button type="button" className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#E2E8F0] text-[#64748B] transition hover:bg-[#F1F5F9]">
            <Search className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2 xl:grid-cols-4">
        {KANBAN.map((col) => (
          <div key={col.key} className="min-h-[200px]">
            <div className="mb-2.5 flex items-center gap-2">
              <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: col.dot }} />
              <span className="text-[13px] font-semibold text-[#334155]">{col.name}</span>
              <span className="ml-auto rounded-full px-2 py-0.5 font-mono text-[11.5px] font-semibold" style={{ background: col.badgeBg, color: col.badgeColor }}>{col.count}</span>
            </div>
            {col.items.map((item) => {
              const person = CANDIDATE_MAP[item.id]
              if (!person) return null
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onOpenProfile(item.id)}
                  aria-label={`Open the profile for ${person.name}`}
                  className="mb-2 block w-full rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] p-3 text-left transition hover:-translate-y-0.5 hover:border-[#CBD5E1] hover:bg-white hover:shadow-[0_2px_8px_rgba(0,0,0,.07)] focus:outline-none focus:ring-2 focus:ring-[#5B6CF9]"
                >
                  <span className="mb-1.5 flex items-center gap-2">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-white" style={{ background: item.color }}>
                      {person.initials}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-[12.5px] font-semibold text-[#0F172A]">{person.name}</span>
                      <span className="block truncate text-[11px] text-[#64748B]">{person.university}</span>
                    </span>
                    <ChevronRight className="ml-auto h-3.5 w-3.5 shrink-0 text-[#CBD5E1]" />
                  </span>
                  <span className={`inline-block rounded px-1.5 py-0.5 text-[10.5px] font-semibold ${col.statusStyle}`}>{item.status}</span>
                </button>
              )
            })}
            <div className="cursor-pointer py-2 text-center text-[11.5px] text-[#94A3B8] hover:text-[#5B6CF9]">+{col.more} more ↓</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Main export ─────────────────────────────────────────────────────────────
export default function CampusPipelineView() {
  const navigate = useNavigate()
  const [period, setPeriod] = useState('Q2')
  const [uniFilter, setUniFilter] = useState('All')
  const [listSuggestion, setListSuggestion] = useState(null)   // "View N candidates"
  const [emailSuggestion, setEmailSuggestion] = useState(null) // "Send invite"
  const [toast, setToast] = useState('')
  const toastRef = useRef(null)

  const showToast = (message) => {
    window.clearTimeout(toastRef.current)
    setToast(message)
    toastRef.current = window.setTimeout(() => setToast(''), 2600)
  }

  // Candidate cards and modal rows both open the full profile page.
  const openProfile = (id) => {
    navigate(`/employer/candidates?candidateId=${id}&from=Campus Pipeline`)
  }

  // Outreach actions open an editable email draft; "Move to Warm" is a
  // pipeline move, not a message, so it just confirms.
  const handlePrimaryAction = (suggestion) => {
    if (/invite|check-in/i.test(suggestion.primary)) {
      setEmailSuggestion(suggestion)
      return
    }
    const count = (SUGGESTION_CANDIDATES[suggestion.id] || []).length
    showToast(`${count} candidates moved to Warm`)
  }

  return (
    <div className="space-y-5">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#E2E8F0] bg-white px-5 py-3">
        <div>
          <p className="text-[13px] font-medium text-[#0F172A]">Full talent relationship — from first discovery to hire</p>
          <p className="text-[12px] text-[#64748B]">Campus-driven pipeline · {period} 2025</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5 rounded-lg bg-[#F1F5F9] p-1">
            {PERIODS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPeriod(p)}
                className={`rounded-md px-3 py-1 text-[12px] font-medium transition ${
                  period === p ? 'bg-white text-[#0F172A] shadow-[0_1px_3px_rgba(0,0,0,.08)]' : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          <button type="button" className="inline-flex items-center gap-1 rounded-lg border border-[#E2E8F0] bg-white px-3 py-1.5 text-[13px] font-medium text-[#64748B] transition hover:bg-[#F8FAFC]">
            <Download className="h-3.5 w-3.5" /> Export
          </button>
          <button type="button" className="inline-flex items-center gap-1 rounded-lg border border-[#E2E8F0] bg-white px-3 py-1.5 text-[13px] font-medium text-[#64748B] transition hover:bg-[#F8FAFC]">
            <Filter className="h-3.5 w-3.5" /> Filter
          </button>
          <button type="button" className="inline-flex items-center gap-1 rounded-lg bg-[#5B6CF9] px-3 py-1.5 text-[13px] font-medium text-white transition hover:bg-[#4455E8]">
            <Plus className="h-3.5 w-3.5" /> Add candidate
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2 xl:grid-cols-4">
        {METRICS.map((m) => <MetricCard key={m.key} metric={m} />)}
      </div>

      {/* Funnel */}
      <FunnelBar />

      {/* Two-col */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_380px]">
        <SuggestionsPanel onViewCandidates={setListSuggestion} onPrimaryAction={handlePrimaryAction} />
        <UniversitiesPanel />
      </div>

      {/* Kanban */}
      <KanbanBoard filter={uniFilter} onFilter={setUniFilter} onOpenProfile={openProfile} />

      {listSuggestion ? (
        <CandidateListModal
          suggestion={listSuggestion}
          onClose={() => setListSuggestion(null)}
          onOpenProfile={openProfile}
          onInvite={(suggestion) => {
            setListSuggestion(null)
            setEmailSuggestion(suggestion)
          }}
        />
      ) : null}

      {emailSuggestion ? (
        <EmailDraftModal
          suggestion={emailSuggestion}
          onClose={() => setEmailSuggestion(null)}
          onSend={(count) => {
            setEmailSuggestion(null)
            showToast(`Email sent to ${count} candidate${count === 1 ? '' : 's'}`)
          }}
        />
      ) : null}

      {toast ? (
        <div className="fixed bottom-5 right-5 z-[80] rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-[13px] font-semibold text-[#0F172A] shadow-[0_10px_30px_rgba(15,23,42,0.12)]">
          {toast}
        </div>
      ) : null}
    </div>
  )
}
