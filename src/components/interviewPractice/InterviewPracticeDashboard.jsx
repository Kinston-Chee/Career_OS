import React from 'react'
import { BookOpenText, Building2, Lightbulb, MessageCircle, Sparkles, Target } from 'lucide-react'

// ── Mock confidence statistics (hardcoded for demo) ──────────────────────────
const COMM_STATS = [
  { label: 'Self-introduction', pct: 72, tone: 'blue', action: '↗ Practice Ice Breaker', mode: 'Ice Breaker' },
  { label: 'Vocabulary range', pct: 58, tone: 'purple', action: '↗ Practice Daily English', mode: 'Daily English' },
  { label: 'Story structure', pct: 45, tone: 'orange', action: '↗ Practice Story Builder', mode: 'Story Builder' },
  { label: 'Response confidence', pct: 81, tone: 'green', action: '↗ Keep going!', mode: null },
]

const ROLE_STATS = [
  { label: 'Software Engineer', pct: 68, tone: 'blue', pill: 'Building', pillTone: 'blue' },
  { label: 'ML Engineer', pct: 65, tone: 'blue', pill: 'Building', pillTone: 'blue' },
  { label: 'Data Analyst', pct: 52, tone: 'orange', pill: 'Early', pillTone: 'orange' },
  { label: 'Product Manager', pct: 31, tone: 'orange', pill: 'Early', pillTone: 'orange' },
  { label: 'DevOps Engineer', pct: 18, tone: 'gray', pill: 'Just started', pillTone: 'gray' },
  { label: 'UX Designer', pct: 0, tone: 'gray', pill: 'Not started', pillTone: 'gray' },
]

const BAR_COLOR = {
  blue: 'bg-blue-500',
  purple: 'bg-purple-500',
  orange: 'bg-orange-400',
  green: 'bg-green-500',
  gray: 'bg-gray-300',
}

const PILL_TONE = {
  blue: 'bg-blue-50 text-blue-700',
  orange: 'bg-orange-50 text-orange-700',
  gray: 'bg-gray-100 text-gray-500',
}

const ACTION_TONE = {
  blue: 'text-blue-600',
  purple: 'text-purple-600',
  orange: 'text-orange-600',
  green: 'text-green-600',
}

const MODE_ICON = {
  'ice-breaker': { Icon: Lightbulb, tone: 'bg-sky-50 text-sky-600' },
  'daily-english': { Icon: MessageCircle, tone: 'bg-blue-50 text-blue-600' },
  'story-builder': { Icon: BookOpenText, tone: 'bg-purple-50 text-purple-600' },
  'mock-interview': { Icon: Target, tone: 'bg-orange-50 text-orange-600' },
  'company-specific': { Icon: Building2, tone: 'bg-red-50 text-red-600' },
}

// ── Practice mode cards ───────────────────────────────────────────────────────
const PRACTICE_MODES = [
  {
    id: 'ice-breaker',
    emoji: '🧊',
    bgColor: 'bg-sky-100',
    name: 'Ice Breaker',
    description: 'Just talk. No wrong answers. Build comfort speaking English.',
    tagLabel: 'Beginner friendly',
    tagTone: 'bg-green-50 text-green-700',
    progress: 'Completed 3 times',
    progressTone: 'text-green-600',
  },
  {
    id: 'daily-english',
    emoji: '💬',
    bgColor: 'bg-blue-100',
    name: 'Daily English',
    description: 'Describe your day or week. Robot upgrades your vocabulary naturally.',
    tagLabel: 'Level 2',
    tagTone: 'bg-blue-50 text-blue-700',
    progress: '5 day streak 🔥',
    progressTone: 'text-blue-600',
  },
  {
    id: 'story-builder',
    emoji: '📖',
    bgColor: 'bg-purple-100',
    name: 'Story Builder',
    description: 'Share an experience. Robot helps you structure it interview-ready.',
    tagLabel: 'Level 3',
    tagTone: 'bg-purple-50 text-purple-700',
    progress: '3 of 5 stories done',
    progressTone: 'text-purple-600',
  },
  {
    id: 'mock-interview',
    emoji: '🎯',
    bgColor: 'bg-orange-100',
    name: 'Mock Interview',
    description: 'Real interview questions for your target role. Structured feedback.',
    tagLabel: 'Level 4',
    tagTone: 'bg-orange-50 text-orange-700',
    progress: 'Last score: 78/100',
    progressTone: 'text-orange-600',
  },
  {
    id: 'company-specific',
    emoji: '🏢',
    bgColor: 'bg-red-100',
    name: 'Company Specific',
    description: 'Role-play with robot as interviewer for your target company.',
    tagLabel: 'Level 5 · Advanced',
    tagTone: 'bg-red-50 text-red-700',
    progress: 'ByteDance · Google · Grab available',
    progressTone: 'text-red-600',
  },
]

function PracticeModeCard({ mode, onStart }) {
  const { Icon, tone } = MODE_ICON[mode.id] ?? MODE_ICON['daily-english']

  return (
    <button
      type="button"
      onClick={() => onStart(mode)}
      className="flex w-full items-center gap-4 rounded-2xl border border-white/70 bg-white/70 p-4 text-left shadow-[0_12px_30px_rgba(37,99,235,0.08)] backdrop-blur-xl transition hover:border-blue-200 hover:bg-white hover:shadow-[0_16px_38px_rgba(37,99,235,0.12)] focus:outline-none focus:ring-2 focus:ring-blue-200"
    >
      <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${tone}`}>
        <Icon size={22} strokeWidth={2.3} />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-sm font-black text-[#11194a]">{mode.name}</p>
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${mode.tagTone}`}>{mode.tagLabel}</span>
        </div>
        <p className="mt-0.5 text-xs font-medium leading-4 text-[#637094]">{mode.description}</p>
        <p className={`mt-1 text-xs font-semibold ${mode.progressTone}`}>{mode.progress}</p>
      </div>
      <span className="shrink-0 text-sm font-semibold text-blue-600">Start →</span>
    </button>
  )
}

function StatBar({ pct, tone }) {
  return (
    <div className="mt-1 h-2 w-full rounded-full bg-gray-100">
      <div
        className={`h-full rounded-full transition-all duration-700 ${BAR_COLOR[tone]}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}

export default function InterviewPracticeDashboard({ onStartMode, onStartRole }) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.85fr_1fr]">
      {/* ── Left: 5 practice mode cards ───────────────────────────── */}
      <div>
        <div className="mb-4">
          <p className="text-sm font-black text-[#11194a]">Choose your practice mode</p>
          <p className="text-xs text-gray-400 mt-0.5">Each session is 5–10 minutes</p>
        </div>
        <div className="space-y-3">
          {PRACTICE_MODES.map((mode) => (
            <PracticeModeCard key={mode.id} mode={mode} onStart={onStartMode} />
          ))}
        </div>
      </div>

      {/* ── Right: confidence statistics ──────────────────────────── */}
      <div className="flex flex-col gap-5">
        {/* General communication */}
        <div className="rounded-2xl border border-white/70 bg-white/62 p-5 shadow-[0_14px_38px_rgba(37,99,235,0.08)] backdrop-blur-2xl">
          <p className="text-sm font-black text-[#11194a]">Your confidence</p>
          <p className="mt-3 text-xs font-bold uppercase tracking-wide text-[#9aa6c3]">Communication skills</p>

          <div className="mt-3 space-y-4">
            {COMM_STATS.map((stat) => (
              <div key={stat.label}>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#35507d]">{stat.label}</span>
                  <span className="font-black text-[#11194a]">{stat.pct}%</span>
                </div>
                <StatBar pct={stat.pct} tone={stat.tone} />
                <button
                  type="button"
                  onClick={() => stat.mode && onStartMode(PRACTICE_MODES.find((m) => m.name === stat.mode))}
                  className={`mt-0.5 text-[11px] font-semibold ${ACTION_TONE[stat.tone]} ${stat.mode ? 'hover:underline cursor-pointer' : 'cursor-default'}`}
                >
                  {stat.action}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Role confidence */}
        <div className="rounded-2xl border border-white/70 bg-white/62 p-5 shadow-[0_14px_38px_rgba(37,99,235,0.08)] backdrop-blur-2xl">
          <div className="flex items-baseline justify-between gap-2">
            <p className="text-xs font-bold uppercase tracking-wide text-[#9aa6c3]">Role confidence</p>
            <p className="text-[10px] font-semibold text-[#9aa6c3]">Based on your CS track</p>
          </div>

          <div className="mt-3 space-y-3">
            {ROLE_STATS.map((role) => (
              <button
                key={role.label}
                type="button"
                onClick={() => onStartRole(role.label)}
                className="flex w-full items-center gap-3 rounded-xl px-2 py-1.5 transition hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                <span className="w-28 shrink-0 text-left text-xs font-semibold text-[#35507d]">{role.label}</span>
                <div className="flex-1">
                  <div className="h-1.5 w-full rounded-full bg-gray-100">
                    {role.pct > 0 && (
                      <div className={`h-full rounded-full ${BAR_COLOR[role.tone]}`} style={{ width: `${role.pct}%` }} />
                    )}
                  </div>
                </div>
                <span className="w-8 shrink-0 text-right text-xs font-black text-[#637094]">
                  {role.pct > 0 ? `${role.pct}%` : '—'}
                </span>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${PILL_TONE[role.pillTone]}`}>
                  {role.pill}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* AI next action */}
        <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
          <div className="flex items-start gap-2">
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
            <p className="text-xs font-semibold leading-5 text-blue-800">
              Your <strong>Story structure</strong> is lowest — do a Story Builder session about your data project to improve it.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
