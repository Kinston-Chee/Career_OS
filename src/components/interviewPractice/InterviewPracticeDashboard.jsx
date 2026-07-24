import React, { useMemo, useState } from 'react'
import {
  AlertCircle,
  BarChart3,
  Briefcase,
  Check,
  ChevronUp,
  Clock,
  Cpu,
  FileText,
  History,
  Loader2,
  MessageSquare,
  Play,
  RefreshCw,
  Rocket,
  Settings,
  SlidersHorizontal,
} from 'lucide-react'
import { startInterviewSession } from '../../services/interviewPracticeApi'

// ── Config option lists ──────────────────────────────────────────────────────
const DIFFICULTY = ['Beginner', 'Intermediate', 'Advanced', 'Expert']
const LANGUAGES = ['English', 'Mandarin', 'Malay', 'Japanese', 'Korean']
const TONES = ['Easy','Normal','Moderate','Hard','Challenging']
const PERSONAS = ['Friendly', 'Formal', 'Strict', 
    'Collaborative', 'Technical', 'Conversational', 'Socratic', 'Direct']
const GENDERS = ['Male', 'Female', 'Neutral']

const ACTIVE_TONE = {
  blue: 'bg-[#EEF0FF] border-[#D0D5FE] text-[#5B6CF9]',
  amber: 'bg-[#FEF3C7] border-[#FDE68A] text-[#92400E]',
  purple: 'bg-[#F3E8FF] border-[#DDD6FE] text-[#6B21A8]',
  green: 'bg-[#ECFDF5] border-[#A7F3D0] text-[#065F46]',
}

const IDLE_CHIP =
  'bg-[#F8F9FF] border-[#C9CEDF] text-[#6B7280] hover:border-[#5B6CF9] hover:text-[#5B6CF9]'

// ── Mock session history ─────────────────────────────────────────────────────
const SESSIONS = [
  {
    id: 1,
    role: 'Software Engineer',
    company: 'Google',
    date: '18 Jul 2026',
    score: 91,
    pass: true,
    duration: '12 min',
    tone: 'Formal',
    persona: 'Tech Lead',
    lang: 'English',
    diff: 'Advanced',
    Icon: Briefcase,
    iconBg: 'rgba(91,108,249,.2)',
    iconColor: '#818CF8',
    stripe: '#5B6CF9',
    skills: { confidence: 88, intro: 84, vocab: 76, story: 72 },
    feedback: {
      strengths:
        'Clear problem decomposition and confident delivery on system design questions. Strong technical vocabulary throughout the session.',
      improvements:
        'Struggled when requirements were ambiguous. Practice narrowing scope and confirming assumptions before diving into solutions.',
      grammar:
        'Strong throughout. Minor tense inconsistency when describing past projects — watch for mixing past and present tense in the same answer.',
    },
  },
  {
    id: 2,
    role: 'ML Engineer',
    company: 'ByteDance',
    date: '15 Jul 2026',
    score: 74,
    pass: true,
    duration: '9 min',
    tone: 'Stress test',
    persona: 'Hiring Manager',
    lang: 'English',
    diff: 'Intermediate',
    Icon: Cpu,
    iconBg: 'rgba(168,85,247,.2)',
    iconColor: '#C084FC',
    stripe: '#A855F7',
    skills: { confidence: 70, intro: 65, vocab: 80, story: 55 },
    feedback: {
      strengths:
        'Good technical vocabulary and stayed calm under pressure. Showed self-awareness when acknowledging knowledge gaps.',
      improvements:
        'Answers were too long. Aim for the STAR format to keep responses under 2 minutes. Practice trimming filler before the key point.',
      grammar:
        "A few filler words ('um', 'like'). Overall fluent and coherent — the structure breaks down slightly under time pressure.",
    },
  },
  {
    id: 3,
    role: 'Data Analyst',
    company: 'Grab',
    date: '10 Jul 2026',
    score: 58,
    pass: false,
    duration: '8 min',
    tone: 'Challenging',
    persona: 'C-suite exec',
    lang: 'English',
    diff: 'Advanced',
    Icon: BarChart3,
    iconBg: 'rgba(245,158,11,.2)',
    iconColor: '#FCD34D',
    stripe: '#F59E0B',
    skills: { confidence: 52, intro: 60, vocab: 48, story: 38 },
    feedback: {
      strengths:
        'Honest about knowledge gaps — a positive professional trait. Willing to admit uncertainty rather than bluff through an answer.',
      improvements:
        "Needed far more specific examples. Quantify your impact: 'reduced churn by 12%' lands better than 'helped with retention'.",
      grammar:
        "Sentence structure breaks down under pressure. Slow down, finish your thoughts, and avoid starting sentences without knowing how they'll end.",
    },
  },
]

// ── Helpers ──────────────────────────────────────────────────────────────────
function fmtSeconds(s) {
  if (s % 60 === 0) return `${s / 60} min`
  return `${Math.floor(s / 60)}m ${s % 60}s`
}

function scoreColor(score, pass) {
  if (pass && score >= 85) return '#34D399'
  if (pass) return '#60A5FA'
  return '#FCA5A5'
}

function badgeClass(score, pass) {
  if (pass) return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
  if (score >= 60) return 'bg-amber-500/15 text-amber-300 border-amber-500/30'
  return 'bg-red-500/15 text-red-300 border-red-500/30'
}

function badgeLabel(score, pass) {
  if (pass) return 'Pass'
  if (score >= 60) return 'Average'
  return 'Retry'
}

// ── Chip group ───────────────────────────────────────────────────────────────
function ChipGroup({ label, options, value, onChange, activeTone }) {
  return (
    <div className="mb-5">
      <span className="mb-2 block text-xs font-medium text-[#6B7280]">{label}</span>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = value === opt
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              className={`select-none rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition ${
                active ? ACTIVE_TONE[activeTone] : IDLE_CHIP
              }`}
            >
              {opt}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ── Setup view ───────────────────────────────────────────────────────────────
function SetupView({ state, set, onLaunch, onGoHistory, submitting }) {
  const previewTitle = `${state.diff} · ${state.tone} · ${state.persona}`
  const previewSub = `${state.lang} · ${state.gender} · ${fmtSeconds(state.sessionLen)} · ${state.gap}s gap · ${
    state.jobRole.trim() || 'No role specified'
  }`

  const gapPct = ((state.gap - 3) / (30 - 3)) * 100
  const gapBg = `linear-gradient(to right, #FDE68A 0%, #FDE68A ${gapPct}%, #E4E7F0 ${gapPct}%)`

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
      {/* Left: config form */}
      <div className="rounded-xl border border-[#E4E7F0] bg-white p-6">
        <p className="mb-5 text-[11px] font-semibold uppercase tracking-[.07em] text-[#9CA3AF]">
          Configure your session
        </p>

        <div className="mb-5 flex items-center gap-2.5 rounded-[10px] border border-[#D0D5FE] bg-[#EEF0FF] px-4 py-3">
          <SlidersHorizontal className="h-[18px] w-[18px] text-[#5B6CF9]" />
          <div>
            <div className="text-xs font-semibold text-[#5B6CF9]">{previewTitle}</div>
            <div className="mt-0.5 text-[11px] text-[#7C8FE8]">{previewSub}</div>
          </div>
        </div>

        <ChipGroup label="Difficulty"          options={DIFFICULTY} value={state.diff}    onChange={(v) => set({ diff: v })}    activeTone="blue" />
        <ChipGroup label="Interview language"  options={LANGUAGES}  value={state.lang}    onChange={(v) => set({ lang: v })}    activeTone="blue" />
        <ChipGroup label="Interviewer tone"    options={TONES}      value={state.tone}    onChange={(v) => set({ tone: v })}    activeTone="amber" />
        <ChipGroup label="Interviewer persona" options={PERSONAS}   value={state.persona} onChange={(v) => set({ persona: v })} activeTone="purple" />
        <ChipGroup label="Interviewer gender"  options={GENDERS}    value={state.gender}  onChange={(v) => set({ gender: v })}  activeTone="green" />

        {/* Dual sliders */}
        <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <div className="mb-2.5 flex items-center justify-between">
              <label className="text-xs font-medium text-[#6B7280]" htmlFor="timerSlider">Session length</label>
              <span className="rounded-full bg-[#EEF0FF] px-2.5 py-[3px] text-[13px] font-semibold text-[#5B6CF9]">{fmtSeconds(state.sessionLen)}</span>
            </div>
            <input
              id="timerSlider"
              type="range"
              min={60}
              max={7200}
              step={60}
              value={state.sessionLen}
              onChange={(e) => set({ sessionLen: parseInt(e.target.value, 10) })}
              className="ip-range h-1 w-full cursor-pointer appearance-none rounded-[2px] bg-[#E4E7F0] outline-none"
            />
          </div>
          <div>
            <div className="mb-2.5 flex items-center justify-between">
              <label className="text-xs font-medium text-[#6B7280]" htmlFor="gapSlider">Conversation gap</label>
              <span className="rounded-full bg-[#FEF3C7] px-2.5 py-[3px] text-[13px] font-semibold text-[#92400E]">{state.gap}s</span>
            </div>
            <input
              id="gapSlider"
              type="range"
              min={3}
              max={300}
              step={1}
              value={state.gap}
              onChange={(e) => set({ gap: parseInt(e.target.value, 10) })}
              className="ip-range ip-range-amber h-1 w-full cursor-pointer appearance-none rounded-[2px] outline-none"
              style={{ background: gapBg }}
            />
            <p className="mt-1.5 text-[11px] text-[#9CA3AF]">Max pause before AI moves on</p>
          </div>
        </div>

        <div className="my-5 h-px bg-[#E4E7F0]" />

        <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor="jobRole" className="mb-1.5 block text-xs font-medium text-[#6B7280]">Target job role</label>
            <input
              id="jobRole"
              value={state.jobRole}
              onChange={(e) => set({ jobRole: e.target.value })}
              placeholder="e.g. Software Engineer"
              className="h-[38px] w-full rounded-lg border border-[#C9CEDF] bg-[#F8F9FF] px-3 text-[13px] text-[#1A1D2E] outline-none transition focus:border-[#5B6CF9] focus:ring-4 focus:ring-[#5B6CF9]/10"
            />
          </div>
          <div>
            <label htmlFor="jobIndustry" className="mb-1.5 block text-xs font-medium text-[#6B7280]">
              Target industry <span className="ml-0.5 text-[11px] text-[#9CA3AF]">optional</span>
            </label>
            <input
              id="jobIndustry"
              value={state.jobIndustry}
              onChange={(e) => set({ jobIndustry: e.target.value })}
              placeholder="e.g. Fintech"
              className="h-[38px] w-full rounded-lg border border-[#C9CEDF] bg-[#F8F9FF] px-3 text-[13px] text-[#1A1D2E] outline-none transition focus:border-[#5B6CF9] focus:ring-4 focus:ring-[#5B6CF9]/10"
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="jobUrl" className="mb-1.5 block text-xs font-medium text-[#6B7280]">
            Job posting URL <span className="ml-0.5 text-[11px] text-[#9CA3AF]">optional — tailors questions to the role</span>
          </label>
          <input
            id="jobUrl"
            value={state.jobUrl}
            onChange={(e) => set({ jobUrl: e.target.value })}
            placeholder="https://careers.company.com/job/..."
            className="h-[38px] w-full rounded-lg border border-[#C9CEDF] bg-[#F8F9FF] px-3 text-[13px] text-[#1A1D2E] outline-none transition focus:border-[#5B6CF9] focus:ring-4 focus:ring-[#5B6CF9]/10"
          />
        </div>

        <button
          type="button"
          onClick={onLaunch}
          disabled={submitting}
          className="flex h-[46px] w-full items-center justify-center gap-2 rounded-[10px] bg-[#5B6CF9] text-sm font-medium text-white transition hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
          {submitting ? 'Preparing your interviewer…' : 'Start interview session'}
        </button>
      </div>

      {/* Right: performance overview */}
      <div className="rounded-xl border border-[#E4E7F0] bg-white p-6">
        <p className="mb-5 text-[11px] font-semibold uppercase tracking-[.07em] text-[#9CA3AF]">Performance overview</p>

        <div className="relative mb-5 flex items-center justify-center">
          <svg width="120" height="120" viewBox="0 0 120 120" aria-label="Average score 75 out of 100">
            <circle cx="60" cy="60" r="50" fill="none" stroke="#EEF0FF" strokeWidth="11" />
            <circle cx="60" cy="60" r="50" fill="none" stroke="#5B6CF9" strokeWidth="11" strokeDasharray="314" strokeDashoffset="79" strokeLinecap="round" transform="rotate(-90 60 60)" />
            <circle cx="60" cy="60" r="50" fill="none" stroke="#10B981" strokeWidth="11" strokeDasharray="314" strokeDashoffset="251" strokeLinecap="round" transform="rotate(-90 60 60)" opacity="0.3" />
          </svg>
          <div className="absolute text-center">
            <div className="text-[28px] font-bold leading-none text-[#1A1D2E]">75</div>
            <div className="mt-1 text-[11px] text-[#9CA3AF]">avg score</div>
          </div>
        </div>

        <div className="mb-5 grid grid-cols-2 gap-2.5">
          {[
            { label: 'Sessions done', val: '12', sub: '+3 this week' },
            { label: 'Best score', val: '91', sub: 'Mock Interview' },
            { label: 'Total practice', val: '4.2h', sub: 'last 30 days' },
            { label: 'Current streak', val: '5 🔥', sub: 'days in a row' },
          ].map((m) => (
            <div key={m.label} className="rounded-[10px] border border-[#E4E7F0] bg-[#F8F9FF] px-3.5 py-3">
              <div className="mb-1 text-[11px] text-[#9CA3AF]">{m.label}</div>
              <div className="text-[22px] font-semibold leading-none text-[#1A1D2E]">{m.val}</div>
              <div className="mt-1 text-[11px] text-[#9CA3AF]">{m.sub}</div>
            </div>
          ))}
        </div>

        <div className="my-4 h-px bg-[#E4E7F0]" />
        <p className="mb-3.5 text-[11px] font-semibold uppercase tracking-[.07em] text-[#9CA3AF]">Skills breakdown</p>
        {[
          { name: 'Response confidence', pct: 81, color: '#10B981' },
          { name: 'Self-introduction',   pct: 72, color: '#5B6CF9' },
          { name: 'Vocabulary range',    pct: 58, color: '#A855F7' },
          { name: 'Story structure',     pct: 45, color: '#F59E0B' },
        ].map((s) => (
          <div key={s.name} className="mb-3">
            <div className="mb-1.5 flex justify-between text-xs">
              <span className="text-[#6B7280]">{s.name}</span>
              <span className="font-medium text-[#1A1D2E]">{s.pct}%</span>
            </div>
            <div className="h-[5px] overflow-hidden rounded-[3px] bg-[#E4E7F0]">
              <div className="h-full rounded-[3px]" style={{ width: `${s.pct}%`, background: s.color }} />
            </div>
          </div>
        ))}

        <div className="my-4 h-px bg-[#E4E7F0]" />
        <button
          type="button"
          onClick={onGoHistory}
          className="flex h-[38px] w-full items-center justify-center gap-2 rounded-[10px] border border-[#C9CEDF] bg-transparent text-[13px] font-medium text-[#6B7280] transition hover:border-[#5B6CF9] hover:text-[#5B6CF9]"
        >
          <History className="h-4 w-4" />
          View session history
        </button>
      </div>
    </div>
  )
}

// ── Session card (dark) ──────────────────────────────────────────────────────
function SessionCard({ s, isOpen, onToggle, onRestart, onReport }) {
  const r = 28
  const circ = 2 * Math.PI * r
  const offset = circ - (s.score / 100) * circ
  const { Icon } = s

  return (
    <div
      className={`flex flex-col overflow-hidden rounded-[14px] border bg-[#232740] transition ${
        isOpen ? 'border-[#5B6CF9]' : 'border-[#2E3252] hover:-translate-y-0.5 hover:border-[#5B6CF9]'
      }`}
    >
      <div className="h-1 rounded-t-[14px]" style={{ background: s.stripe }} />
      <div className="flex-1 px-[18px] pb-3.5 pt-[18px]">
        <div className="mb-3.5 flex items-start gap-3">
          <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[10px]" style={{ background: s.iconBg }}>
            <Icon className="h-[19px] w-[19px]" style={{ color: s.iconColor }} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-semibold text-[#EAECF5]">{s.role}</div>
            <div className="mt-0.5 text-xs text-[#8B91AE]">{s.company} · {s.date}</div>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1">
            <div className="text-[22px] font-bold leading-none" style={{ color: scoreColor(s.score, s.pass) }}>{s.score}</div>
            <div className="text-[10px] text-[#8B91AE]">/100</div>
          </div>
        </div>

        <div className="relative mb-3.5 flex justify-center">
          <svg width="72" height="72" viewBox="0 0 72 72" aria-hidden="true">
            <circle cx="36" cy="36" r={r} fill="none" stroke="#2E3252" strokeWidth="7" />
            <circle cx="36" cy="36" r={r} fill="none" stroke={s.stripe} strokeWidth="7" strokeDasharray={circ.toFixed(1)} strokeDashoffset={offset.toFixed(1)} strokeLinecap="round" transform="rotate(-90 36 36)" opacity="0.9" />
          </svg>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="text-[15px] font-bold leading-none text-[#EAECF5]">{s.score}%</div>
            <div className="text-[9px] text-[#8B91AE]">overall</div>
          </div>
        </div>

        <div className="mb-3.5 flex flex-wrap gap-1.5">
          <span className="flex items-center gap-1 rounded-full border border-[#2E3252] bg-[#1A1D2E] px-2.5 py-[3px] text-[11px] font-medium text-[#8B91AE]">
            <Clock className="h-[10px] w-[10px]" /> {s.duration}
          </span>
          {[s.diff, s.tone, s.persona].map((t) => (
            <span key={t} className="rounded-full border border-[#2E3252] bg-[#1A1D2E] px-2.5 py-[3px] text-[11px] font-medium text-[#8B91AE]">{t}</span>
          ))}
          <span className={`rounded-full border px-2 py-[2px] text-[10px] font-medium ${badgeClass(s.score, s.pass)}`}>{badgeLabel(s.score, s.pass)}</span>
        </div>

        <div className="mb-1">
          {[
            { label: 'Confidence',    pct: s.skills.confidence, color: '#10B981' },
            { label: 'Introduction',  pct: s.skills.intro,      color: '#5B6CF9' },
            { label: 'Vocabulary',    pct: s.skills.vocab,      color: '#A855F7' },
            { label: 'Story structure', pct: s.skills.story,    color: '#F59E0B' },
          ].map((b) => (
            <div key={b.label} className="mb-1.5 flex items-center gap-2">
              <span className="w-[90px] shrink-0 text-[10px] text-[#8B91AE]">{b.label}</span>
              <div className="h-[3px] flex-1 rounded-[2px] bg-[#2E3252]">
                <div className="h-full rounded-[2px]" style={{ width: `${b.pct}%`, background: b.color }} />
              </div>
              <span className="w-7 shrink-0 text-right text-[10px] text-[#8B91AE]">{b.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      {isOpen ? (
        <div className="border-t border-[#2E3252] bg-[#1A1D2E] px-[18px] py-4">
          <div className="mb-3">
            <div className="mb-1 text-[10px] font-semibold uppercase tracking-[.07em] text-[#8B91AE]">💪 Strengths</div>
            <div className="text-xs leading-relaxed text-[#A0A8C8]">{s.feedback.strengths}</div>
          </div>
          <div className="my-2.5 h-px bg-[#2E3252]" />
          <div className="mb-3">
            <div className="mb-1 text-[10px] font-semibold uppercase tracking-[.07em] text-[#8B91AE]">🎯 Areas to improve</div>
            <div className="text-xs leading-relaxed text-[#A0A8C8]">{s.feedback.improvements}</div>
          </div>
          <div className="my-2.5 h-px bg-[#2E3252]" />
          <div>
            <div className="mb-1 text-[10px] font-semibold uppercase tracking-[.07em] text-[#8B91AE]">🗣 Language & grammar</div>
            <div className="text-xs leading-relaxed text-[#A0A8C8]">{s.feedback.grammar}</div>
          </div>
        </div>
      ) : null}

      <div className="flex border-t border-[#2E3252]">
        <button type="button" onClick={() => onRestart(s)} className="flex h-10 flex-1 items-center justify-center gap-1.5 text-xs font-medium text-[#8B91AE] transition hover:bg-[#2E3252] hover:text-[#5B6CF9]">
          <RefreshCw className="h-3.5 w-3.5" /> Restart
        </button>
        <div className="w-px shrink-0 bg-[#2E3252]" />
        <button type="button" onClick={() => onToggle(s.id)} className="flex h-10 flex-1 items-center justify-center gap-1.5 text-xs font-medium text-[#8B91AE] transition hover:bg-[#2E3252] hover:text-[#EAECF5]">
          {isOpen ? <ChevronUp className="h-3.5 w-3.5" /> : <MessageSquare className="h-3.5 w-3.5" />}
          {isOpen ? 'Hide feedback' : 'View feedback'}
        </button>
        <div className="w-px shrink-0 bg-[#2E3252]" />
        <button type="button" onClick={() => onReport(s)} className="flex h-10 flex-1 items-center justify-center gap-1.5 text-xs font-medium text-[#8B91AE] transition hover:bg-[#2E3252] hover:text-emerald-400">
          <FileText className="h-3.5 w-3.5" /> Full report
        </button>
      </div>
    </div>
  )
}

// ── History view (dark) ──────────────────────────────────────────────────────
function HistoryView({ filter, setFilter, expanded, setExpanded, onRestart, onReport }) {
  const filtered = useMemo(() => {
    if (filter === 'pass') return SESSIONS.filter((s) => s.pass)
    if (filter === 'fail') return SESSIONS.filter((s) => !s.pass)
    return SESSIONS
  }, [filter])

  const total = SESSIONS.length
  const passed = SESSIONS.filter((s) => s.pass).length
  const failed = SESSIONS.length - passed

  return (
    <div className="rounded-xl bg-[#1A1D2E] p-8">
      <div className="mb-7 flex items-end justify-between gap-4">
        <div>
          <div className="text-[22px] font-bold text-white">Session history</div>
          <div className="mt-1 text-[13px] text-[#8B91AE]">Click a card to expand feedback · Restart pre-fills the setup form</div>
        </div>
        <div className="flex gap-6">
          <div className="text-right">
            <div className="text-xl font-bold leading-none text-white">{total}</div>
            <div className="mt-1 text-[11px] text-[#8B91AE]">Total</div>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold leading-none text-emerald-300">{passed}</div>
            <div className="mt-1 text-[11px] text-[#8B91AE]">Passed</div>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold leading-none text-red-300">{failed}</div>
            <div className="mt-1 text-[11px] text-[#8B91AE]">Need retry</div>
          </div>
        </div>
      </div>

      <div className="mb-6 flex gap-2">
        {[
          { id: 'all',  label: 'All sessions' },
          { id: 'pass', label: 'Passed' },
          { id: 'fail', label: 'Need retry' },
        ].map((t) => {
          const active = filter === t.id
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setFilter(t.id)}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition ${
                active
                  ? 'border-[#5B6CF9] bg-[#5B6CF9] text-white'
                  : 'border-[#2E3252] bg-transparent text-[#8B91AE] hover:border-[#5B6CF9] hover:text-[#a0aaff]'
              }`}
            >
              {t.label}
            </button>
          )
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="py-10 text-center text-sm text-[#8B91AE]">No sessions match this filter.</div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((s) => (
            <SessionCard
              key={s.id}
              s={s}
              isOpen={!!expanded[s.id]}
              onToggle={(id) => setExpanded((prev) => ({ ...prev, [id]: !prev[id] }))}
              onRestart={onRestart}
              onReport={onReport}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// ── Toast ────────────────────────────────────────────────────────────────────
function Toast({ toast }) {
  if (!toast) return null
  const Icon = toast.Icon
  return (
    <div className="pointer-events-none fixed bottom-6 left-1/2 z-[999] flex -translate-x-1/2 items-center gap-2 rounded-[10px] border border-[#2E3252] bg-[#1A1D2E] px-5 py-2.5 text-[13px] font-medium text-white shadow-[0_8px_24px_rgba(0,0,0,.2)]">
      <Icon className="h-4 w-4" />
      <span>{toast.msg}</span>
    </div>
  )
}

// ── Main ─────────────────────────────────────────────────────────────────────
export default function InterviewPracticeDashboard({ onStartMode, onStartRole }) {
  const [view, setView] = useState('setup')
  const [expanded, setExpanded] = useState({})
  const [filter, setFilter] = useState('all')
  const [toast, setToast] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const [state, setState] = useState({
    diff: 'Beginner',
    lang: 'English',
    tone: 'Friendly',
    persona: 'HR Generalist',
    gender: 'Male',
    sessionLen: 600,
    gap: 10,
    jobRole: '',
    jobIndustry: '',
    jobUrl: '',
  })
  const set = (patch) => setState((prev) => ({ ...prev, ...patch }))

  const showToast = (msg, Icon = AlertCircle) => {
    setToast({ msg, Icon })
    window.clearTimeout(showToast._t)
    showToast._t = window.setTimeout(() => setToast(null), 3000)
  }

  const handleLaunch = async () => {
    const role = state.jobRole.trim()
    if (!role) {
      showToast('Enter a target job role to continue', AlertCircle)
      return
    }
    if (submitting) return

    setSubmitting(true)
    showToast(`Sending your setup to the interviewer…`, Rocket)

    try {
      const result = await startInterviewSession(state)

      // Backend rejected the request or the network dropped — keep the
      // user on the setup form so they can tweak inputs and retry.
      if (result.source === 'error') {
        showToast(result.error || 'Could not start the interview. Please try again.', AlertCircle)
        return
      }

      const sourceLabel = result.source === 'api'
        ? `Starting: ${state.diff} ${role} · ${state.persona}`
        : `Starting offline demo: ${state.diff} ${role} · ${state.persona}`
      showToast(sourceLabel, Rocket)

      // Pass everything the parent (AICompanionPage) needs to render the
      // live session — role, company (if any), and the backend bootstrap
      // payload — so the LLM opener can be rendered directly.
      if (typeof onStartRole === 'function') {
        onStartRole(role, {
          setup: result.payload,
          session: {
            id: result.session_id,
            greeting: result.greeting,
            firstQuestion: result.first_question,
            source: result.source,
          },
        })
      } else if (typeof onStartMode === 'function') {
        onStartMode({
          id: 'mock-interview',
          name: 'Mock Interview',
          emoji: '🎯',
          role,
          setup: result.payload,
          session: {
            id: result.session_id,
            greeting: result.greeting,
            firstQuestion: result.first_question,
            source: result.source,
          },
        })
      }
    } catch (error) {
      // Unexpected throw from the API helper itself (shouldn't happen —
      // it normally returns a { source: 'error' } object). Treat the
      // same way: stay on the setup form.
      // eslint-disable-next-line no-console
      console.error('[InterviewPracticeDashboard] launch failed:', error)
      showToast('Could not reach the interviewer service — please try again.', AlertCircle)
    } finally {
      setSubmitting(false)
    }
  }

  const handleRestart = (s) => {
    set({
      jobRole: s.role,
      tone: s.tone,
      persona: s.persona,
      lang: s.lang,
      diff: s.diff,
    })
    setView('setup')
    showToast(`Form pre-filled — ${s.role} at ${s.company}`, Check)
  }

  const handleReport = (s) => {
    showToast(`Opening full report: ${s.role} (${s.date})`, FileText)
  }

  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: `
        .ip-range::-webkit-slider-thumb { -webkit-appearance: none; width: 18px; height: 18px; background: #5B6CF9; border-radius: 50%; border: 2px solid #fff; box-shadow: 0 1px 4px rgba(91,108,249,.4); cursor: pointer; }
        .ip-range::-moz-range-thumb { width: 18px; height: 18px; background: #5B6CF9; border-radius: 50%; border: 2px solid #fff; cursor: pointer; }
        .ip-range-amber::-webkit-slider-thumb { background: #F59E0B; box-shadow: 0 1px 4px rgba(245,158,11,.4); }
        .ip-range-amber::-moz-range-thumb { background: #F59E0B; }
      `}} />

      {/* View switcher */}
      <div className="mb-5 flex justify-end">
        <div className="inline-flex items-center gap-0.5 rounded-full border border-[#E4E7F0] bg-[#F0F2FF] p-[3px]">
          <button
            type="button"
            onClick={() => setView('setup')}
            className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[13px] font-medium transition ${
              view === 'setup' ? 'bg-white text-[#5B6CF9] shadow-[0_1px_4px_rgba(91,108,249,.15)]' : 'text-[#6B7280] hover:text-[#1A1D2E]'
            }`}
          >
            <Settings className="h-[15px] w-[15px]" />
            Set up session
          </button>
          <button
            type="button"
            onClick={() => setView('history')}
            className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[13px] font-medium transition ${
              view === 'history' ? 'bg-white text-[#5B6CF9] shadow-[0_1px_4px_rgba(91,108,249,.15)]' : 'text-[#6B7280] hover:text-[#1A1D2E]'
            }`}
          >
            <History className="h-[15px] w-[15px]" />
            Session history
            <span className={`inline-flex h-[18px] w-[18px] items-center justify-center rounded-full text-[10px] font-semibold ${view === 'history' ? 'bg-[#5B6CF9] text-white' : 'bg-[#C9CEDF] text-[#6B7280]'}`}>
              {SESSIONS.length}
            </span>
          </button>
        </div>
      </div>

      {view === 'setup' ? (
        <SetupView state={state} set={set} onLaunch={handleLaunch} onGoHistory={() => setView('history')} submitting={submitting} />
      ) : (
        <HistoryView
          filter={filter}
          setFilter={setFilter}
          expanded={expanded}
          setExpanded={setExpanded}
          onRestart={handleRestart}
          onReport={handleReport}
        />
      )}

      <Toast toast={toast} />
    </div>
  )
}
