import React, { useMemo, useRef, useState } from 'react'
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BadgeDollarSign,
  Bot,
  CalendarClock,
  Check,
  ChevronDown,
  ChevronUp,
  ClipboardList,
  Database,
  Loader2,
  Plug,
  Plus,
  Search,
  Send,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Trash2,
  Users,
  X,
} from 'lucide-react'
import EmployerNav from '../../components/employer/EmployerNav'
import {
  ARCHITECTURES,
  LIFECYCLE_STAGES,
  QUESTION_TYPES,
  RETENTION_KPIS,
  RETENTION_SIGNALS,
  RETENTION_WATCHLIST,
  RISK_BANDS,
  SIGNAL_CATEGORIES,
  SURVEY_HISTORY,
  SURVEY_TEMPLATES,
} from '../../data/retentionSignalsData'
import {
  OVERALL_RETENTION,
  RETENTION_DEPARTMENTS,
  RISK_BADGE,
  RISK_COLOR,
  TOTAL_HEADCOUNT,
} from '../../data/retentionData'
import { ACTION_TONES, getDepartmentBreakdown } from '../../data/departmentSignalBreakdown'
import { generateSurveyQuestions } from '../../services/retentionSurveyApi'

const CATEGORY_MAP = Object.fromEntries(SIGNAL_CATEGORIES.map((c) => [c.id, c]))
const ARCH_MAP = Object.fromEntries(ARCHITECTURES.map((a) => [a.id, a]))
const STAGE_MAP = Object.fromEntries(LIFECYCLE_STAGES.map((s) => [s.id, s]))
const SIGNAL_MAP = Object.fromEntries(RETENTION_SIGNALS.map((s) => [s.id, s]))

const STATUS_META = {
  live: { label: 'Live', tone: 'border-emerald-200 bg-emerald-50 text-emerald-600', dot: 'bg-emerald-500' },
  partial: { label: 'Partial coverage', tone: 'border-amber-200 bg-amber-50 text-amber-700', dot: 'bg-amber-500' },
  'needs-connection': { label: 'Needs connection', tone: 'border-red-200 bg-red-50 text-red-600', dot: 'bg-red-500' },
}

function DemoToast({ message }) {
  if (!message) return null
  return (
    <div className="employer-glass-card fixed bottom-5 right-5 z-50 px-4 py-3 text-sm font-semibold text-slate-800">
      {message}
    </div>
  )
}

function TrendPill({ trend }) {
  const up = trend >= 0
  const Icon = up ? TrendingUp : TrendingDown
  return (
    <span className={`inline-flex items-center gap-0.5 text-[10.5px] font-semibold ${up ? 'text-emerald-600' : 'text-red-500'}`}>
      <Icon className="h-3 w-3" />
      {up ? '+' : ''}{trend.toFixed(1)}%
    </span>
  )
}

function Kpi({ icon: Icon, label, value, sub, tone = 'text-[#155EE8]' }) {
  return (
    <div className="rounded-2xl border border-white/70 bg-white/85 px-4 py-3 shadow-[0_6px_18px_rgba(24,95,165,0.06)]">
      <p className="flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-wide text-[#8A96B3]">
        <Icon className="h-3.5 w-3.5" /> {label}
      </p>
      <p className={`mt-1 font-mono text-[22px] font-bold leading-none ${tone}`}>{value}</p>
      <p className="mt-1 text-[11px] font-medium text-[#8A96B3]">{sub}</p>
    </div>
  )
}

// ── Tab 1: department retention → signal breakdown ──────────────────────────
function DepartmentOverview({ onSelect }) {
  const sorted = useMemo(
    () => [...RETENTION_DEPARTMENTS].sort((a, b) => a.retention - b.retention),
    [],
  )

  return (
    <div className="space-y-4">
      {/* Retention by department — sorted worst first, company average marked */}
      <section className="rounded-2xl border border-white/70 bg-white/85 p-5 shadow-[0_10px_30px_rgba(24,95,165,0.08)]">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-[#1B2545]">Retention rate by department</h3>
            <p className="mt-0.5 text-[11.5px] font-medium text-[#8A96B3]">
              Select a department to see only the signals firing inside it, and what to do about them.
            </p>
          </div>
          <span className="flex items-center gap-1.5 text-[11px] font-semibold text-[#155EE8]">
            <span className="h-3 w-0.5 bg-[#155EE8]" />
            Company average {OVERALL_RETENTION.toFixed(1)}%
          </span>
        </div>

        <div className="mt-4 space-y-2">
          {sorted.map((dept) => {
            const col = RISK_COLOR[dept.riskLevel]
            const breakdown = getDepartmentBreakdown(dept.id)
            const signalCount = breakdown.signals.length
            // Bars are scaled from 70% so the differences between departments
            // stay visible instead of all sitting near the right edge.
            const width = Math.max(4, ((dept.retention - 70) / 30) * 100)
            const avgLeft = ((OVERALL_RETENTION - 70) / 30) * 100
            return (
              <button
                key={dept.id}
                type="button"
                onClick={() => onSelect(dept.id)}
                aria-label={`Open the signal breakdown for ${dept.name}`}
                className="group grid w-full grid-cols-[128px_minmax(0,1fr)_120px_150px] items-center gap-3 rounded-xl border border-transparent px-2 py-2 text-left transition hover:border-[#E8EEF8] hover:bg-[#F7F8FF]"
              >
                <span className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: col.fill }} />
                  <span className="truncate text-[12.5px] font-semibold text-[#1B2545] group-hover:text-[#155EE8]">{dept.name}</span>
                </span>

                <span className="relative block h-6 rounded-lg bg-[#F1F3FB]">
                  <span
                    className="absolute inset-y-0 left-0 rounded-lg transition-[width] duration-500"
                    style={{ width: `${width}%`, background: `linear-gradient(90deg, ${col.light}, ${col.fill})` }}
                  />
                  <span className="absolute inset-y-[-3px] w-0.5 bg-[#155EE8]" style={{ left: `${avgLeft}%` }} />
                  <span className="absolute inset-y-0 left-2 flex items-center font-mono text-[11px] font-bold text-white">
                    {dept.retention.toFixed(1)}%
                  </span>
                </span>

                <span className="flex items-center gap-2 text-[11px] font-medium text-[#8A96B3]">
                  {dept.headcount} staff
                  <TrendPill trend={dept.trend} />
                </span>

                <span className="flex items-center justify-end gap-2">
                  <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${RISK_BADGE[dept.riskLevel]}`}>
                    {dept.atRisk} at risk
                  </span>
                  <span className="text-[10.5px] font-semibold text-[#50607E]">{signalCount} signals</span>
                  <ArrowRight className="h-3.5 w-3.5 text-[#B0BADA] transition-transform group-hover:translate-x-0.5 group-hover:text-[#155EE8]" />
                </span>
              </button>
            )
          })}
        </div>
      </section>

      {/* Architecture summary — where the signals come from */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {ARCHITECTURES.map((arch) => {
          const count = RETENTION_SIGNALS.filter((s) => s.architecture === arch.id).length
          return (
            <div key={arch.id} className="rounded-2xl border border-white/70 bg-white/85 p-4 shadow-[0_6px_18px_rgba(24,95,165,0.06)]">
              <div className="flex items-start justify-between gap-2">
                <p className="text-[12.5px] font-bold text-[#1B2545]">{arch.label}</p>
                <span className="shrink-0 rounded-full bg-[#EEF0FF] px-2 py-0.5 text-[10.5px] font-bold text-[#155EE8]">
                  {count} signal{count === 1 ? '' : 's'}
                </span>
              </div>
              <p className="mt-1.5 flex items-start gap-1.5 text-[11px] font-medium text-[#50607E]">
                <Database className="mt-0.5 h-3 w-3 shrink-0 text-[#8A96B3]" />
                {arch.source}
              </p>
              <p className="mt-1 text-[10.5px] leading-4 text-[#8A96B3]">{arch.benefit}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function DepartmentDetail({ deptId, onBack, onToast, onSurveyFromAction }) {
  const dept = RETENTION_DEPARTMENTS.find((d) => d.id === deptId)
  const breakdown = getDepartmentBreakdown(deptId)
  const [openSignal, setOpenSignal] = useState(null)
  const [doneActions, setDoneActions] = useState(() => new Set())

  if (!dept) return null
  const col = RISK_COLOR[dept.riskLevel]
  const maxFlagged = Math.max(...breakdown.signals.map((s) => s.flagged), 1)

  const markDone = (action) => {
    setDoneActions((prev) => new Set(prev).add(action.id))
    onToast(`Assigned: ${action.title}`)
  }

  return (
    <div className="space-y-4">
      {/* Department header */}
      <section className="rounded-2xl border border-white/70 bg-white/85 p-5 shadow-[0_10px_30px_rgba(24,95,165,0.08)]">
        <button
          type="button"
          onClick={onBack}
          className="mb-3 inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#155EE8] hover:underline"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> All departments
        </button>

        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 h-10 w-1.5 rounded-full" style={{ background: col.fill }} />
            <div>
              <h3 className="text-lg font-bold text-[#1B2545]">{dept.name}</h3>
              <p className="mt-0.5 text-[12px] font-medium text-[#8A96B3]">
                {dept.headcount} employees · {dept.atRisk} at risk · {breakdown.signals.length} signals firing
              </p>
              <p className="mt-2 max-w-[560px] text-[12.5px] leading-5 text-[#50607E]">{breakdown.headline}</p>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="text-right">
              <p className="font-mono text-[26px] font-bold leading-none" style={{ color: col.fill }}>
                {dept.retention.toFixed(1)}%
              </p>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-[#8A96B3]">retention</p>
            </div>
            <div className="text-right">
              <p className="flex items-center justify-end font-mono text-[18px] font-bold leading-none">
                <TrendPill trend={dept.trend} />
              </p>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-[#8A96B3]">30-day trend</p>
            </div>
            <span className={`rounded-full border px-2.5 py-1 text-[10.5px] font-bold ${RISK_BADGE[dept.riskLevel]}`}>
              {col.label}
            </span>
          </div>
        </div>
      </section>

      {/* AI suggested actions */}
      <section className="rounded-2xl border border-[#155EE8]/25 bg-[#EEF0FF]/60 p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wide text-[#155EE8]">
            <Bot className="h-4 w-4" /> AI suggested actions for {dept.name}
          </p>
          <span className="text-[10.5px] font-medium text-[#50607E]">
            Ranked by expected retention impact against the signals below
          </span>
        </div>

        <div className="mt-3 space-y-2.5">
          {breakdown.actions.map((action) => {
            const tone = ACTION_TONES[action.tone] ?? ACTION_TONES.medium
            const done = doneActions.has(action.id)
            return (
              <div key={action.id} className={`flex items-start gap-3 rounded-xl border bg-white p-3.5 ${done ? 'border-emerald-200' : 'border-[#E8EEF8]'}`}>
                <span className={`mt-1 h-full min-h-[38px] w-1 shrink-0 rounded-full ${tone.bar}`} />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase ${tone.pill}`}>
                      {action.priority}
                    </span>
                    <p className="text-[13px] font-bold text-[#1B2545]">{action.title}</p>
                  </div>
                  <p className="mt-1.5 text-[12px] leading-5 text-[#50607E]">{action.why}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[10.5px] font-medium text-[#8A96B3]">
                    <span className="flex items-center gap-1"><Users className="h-3 w-3" /> Owner: {action.owner}</span>
                    <span className="flex items-center gap-1 text-emerald-600"><TrendingUp className="h-3 w-3" /> {action.impact}</span>
                  </div>
                </div>
                <div className="flex shrink-0 flex-col gap-1.5">
                  <button
                    type="button"
                    onClick={() => markDone(action)}
                    disabled={done}
                    className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11.5px] font-bold transition ${
                      done ? 'bg-emerald-50 text-emerald-600' : 'bg-[#155EE8] text-white hover:bg-[#124FC4]'
                    }`}
                  >
                    <Check className="h-3.5 w-3.5" /> {done ? 'Assigned' : 'Assign'}
                  </button>
                  {action.survey ? (
                    <button
                      type="button"
                      onClick={() => onSurveyFromAction(action, dept)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[#D8E0F0] bg-white px-3 py-1.5 text-[11.5px] font-bold text-[#50607E] transition hover:bg-[#F7F8FF]"
                    >
                      <Sparkles className="h-3.5 w-3.5" /> Survey
                    </button>
                  ) : null}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Signal breakdown for this department only */}
      <section className="overflow-hidden rounded-2xl border border-white/70 bg-white/85 shadow-[0_10px_30px_rgba(24,95,165,0.08)]">
        <div className="flex items-center justify-between border-b border-[#E8EEF8] px-5 py-3">
          <h3 className="text-sm font-bold text-[#1B2545]">Signal breakdown · {dept.name}</h3>
          <span className="text-[10.5px] font-medium text-[#8A96B3]">
            {breakdown.signals.length} of {RETENTION_SIGNALS.length} monitored signals firing here
          </span>
        </div>

        {breakdown.signals.map((entry) => {
          const signal = SIGNAL_MAP[entry.id]
          if (!signal) return null
          const cat = CATEGORY_MAP[signal.category]
          const stage = STAGE_MAP[signal.stage]
          const status = STATUS_META[signal.status]
          const open = openSignal === entry.id
          const share = Math.round((entry.flagged / dept.headcount) * 100)
          return (
            <div key={entry.id} className="border-b border-[#E8EEF8] last:border-b-0">
              <button
                type="button"
                onClick={() => setOpenSignal(open ? null : entry.id)}
                className="grid w-full grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)_130px_96px_28px] items-center gap-3 px-5 py-3 text-left transition hover:bg-[#F7F8FF]"
              >
                <span className="flex min-w-0 items-start gap-2.5">
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: cat.color }} />
                  <span className="min-w-0">
                    <span className="block truncate text-[13px] font-semibold text-[#1B2545]">{signal.name}</span>
                    <span className="block truncate text-[10.5px] font-medium text-[#8A96B3]">{entry.note}</span>
                  </span>
                </span>

                <span className="flex items-center gap-2">
                  <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#F1F3FB]">
                    <span
                      className="block h-full rounded-full"
                      style={{ width: `${(entry.flagged / maxFlagged) * 100}%`, background: cat.color }}
                    />
                  </span>
                  <span className="w-9 shrink-0 text-right font-mono text-[10.5px] font-semibold text-[#8A96B3]">{share}%</span>
                </span>

                <span className={`inline-flex w-fit rounded-full border px-2 py-0.5 text-[10px] font-bold ${stage.tone}`}>
                  {stage.label}
                </span>

                <span className="flex items-center justify-center gap-1.5">
                  <span className="font-mono text-[13px] font-bold text-[#1B2545]">{entry.flagged}</span>
                  <span className={`flex items-center text-[10px] font-semibold ${entry.delta > 0 ? 'text-red-500' : 'text-emerald-600'}`}>
                    {entry.delta > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {Math.abs(entry.delta)}
                  </span>
                </span>

                {open ? <ChevronUp className="h-3.5 w-3.5 text-[#8A96B3]" /> : <ChevronDown className="h-3.5 w-3.5 text-[#8A96B3]" />}
              </button>

              {open ? (
                <div className="grid grid-cols-1 gap-4 border-t border-[#E8EEF8] bg-[#FBFCFF] px-5 py-4 md:grid-cols-2">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wide text-[#8A96B3]">Why we capture it</p>
                    <p className="mt-1.5 text-[12px] leading-5 text-[#50607E]">{signal.reason}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wide text-[#8A96B3]">How it is captured</p>
                    <p className="mt-1.5 text-[12px] leading-5 text-[#50607E]">{signal.method}</p>
                    <div className="mt-2.5 flex flex-wrap items-center gap-2">
                      <span className="rounded-full border border-[#D8E0F0] bg-white px-2 py-0.5 text-[10px] font-bold text-[#50607E]">
                        {ARCH_MAP[signal.architecture].label}
                      </span>
                      <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${status.tone}`}>{status.label}</span>
                      <span className="text-[10.5px] font-medium text-[#8A96B3]">Last sync: {signal.lastSync}</span>
                      {signal.status !== 'live' ? (
                        <button
                          type="button"
                          onClick={() => onToast(`Connection wizard opened for ${signal.name}`)}
                          className="inline-flex items-center gap-1 rounded-full border border-[#D8E0F0] bg-white px-2.5 py-0.5 text-[10.5px] font-bold text-[#155EE8] hover:bg-blue-50"
                        >
                          <Plug className="h-3 w-3" /> Connect source
                        </button>
                      ) : null}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          )
        })}

        {breakdown.signals.length === 0 ? (
          <p className="px-5 py-8 text-center text-sm font-medium text-[#8A96B3]">No signals are firing in this department.</p>
        ) : null}
      </section>
    </div>
  )
}

function SignalMatrix({ selectedDept, onSelectDept, onToast, onSurveyFromAction }) {
  if (selectedDept) {
    return (
      <DepartmentDetail
        deptId={selectedDept}
        onBack={() => onSelectDept(null)}
        onToast={onToast}
        onSurveyFromAction={onSurveyFromAction}
      />
    )
  }
  return <DepartmentOverview onSelect={onSelectDept} />
}


// ── Tab 2: people watchlist ─────────────────────────────────────────────────
function SignalChip({ id }) {
  const signal = SIGNAL_MAP[id]
  if (!signal) return null
  const cat = CATEGORY_MAP[signal.category]
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-[#E8EEF8] bg-white px-2 py-0.5 text-[10px] font-semibold text-[#50607E]">
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: cat.color }} />
      {signal.name.split('(')[0].trim()}
    </span>
  )
}

function Fact({ label, value, tone = 'text-[#1B2545]', warn = false }) {
  return (
    <div className={`rounded-xl border px-3 py-2 ${warn ? 'border-red-100 bg-red-50/60' : 'border-[#E8EEF8] bg-white'}`}>
      <p className="text-[9.5px] font-bold uppercase tracking-wide text-[#8A96B3]">{label}</p>
      <p className={`mt-0.5 font-mono text-[13px] font-bold ${tone}`}>{value}</p>
    </div>
  )
}

function Watchlist({ onToast, onSurveyFromEmployee }) {
  const [query, setQuery] = useState('')
  const [band, setBand] = useState('all')
  const [openId, setOpenId] = useState(RETENTION_WATCHLIST[0]?.id ?? null)

  const rows = useMemo(() => RETENTION_WATCHLIST.filter((emp) => {
    if (band !== 'all' && emp.riskBand !== band) return false
    if (!query.trim()) return true
    const haystack = `${emp.name} ${emp.role} ${emp.department} ${emp.manager}`.toLowerCase()
    return haystack.includes(query.trim().toLowerCase())
  }).sort((a, b) => b.riskScore - a.riskScore), [query, band])

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-2 rounded-full border border-[#D8E0F0] bg-white px-3 py-1.5">
          <Search className="h-3.5 w-3.5 text-[#8A96B3]" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search name, role, department, manager…"
            aria-label="Search the retention watchlist"
            className="w-56 bg-transparent text-[12px] font-medium text-[#1B2545] outline-none placeholder:text-[#8A96B3]"
          />
        </span>
        {[{ id: 'all', label: 'All risk levels' }, { id: 'critical', label: 'Critical' }, { id: 'high', label: 'High' }, { id: 'moderate', label: 'Moderate' }].map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => setBand(option.id)}
            className={`rounded-full border px-3 py-1 text-[11.5px] font-semibold transition ${
              band === option.id ? 'border-[#155EE8] bg-[#155EE8] text-white' : 'border-[#D8E0F0] bg-white text-[#50607E] hover:border-[#155EE8]/50'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {rows.map((emp) => {
        const band = RISK_BANDS[emp.riskBand]
        const open = openId === emp.id
        return (
          <section key={emp.id} className="overflow-hidden rounded-2xl border border-white/70 bg-white/85 shadow-[0_8px_24px_rgba(24,95,165,0.06)]">
            <button
              type="button"
              onClick={() => setOpenId(open ? null : emp.id)}
              className="flex w-full flex-wrap items-center gap-3 px-4 py-3 text-left transition hover:bg-[#F7F8FF]"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EEF0FF] text-[12px] font-bold text-[#155EE8]">
                {emp.initials}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13.5px] font-bold text-[#1B2545]">{emp.name}</span>
                <span className="block truncate text-[11px] font-medium text-[#8A96B3]">
                  {emp.role} · {emp.department} · reports to {emp.manager} · {emp.tenureMonths} months tenure
                </span>
              </span>
              <span className="hidden max-w-[320px] flex-wrap gap-1.5 lg:flex">
                {emp.topSignals.slice(0, 3).map((id) => <SignalChip key={id} id={id} />)}
              </span>
              <span className="flex shrink-0 items-center gap-3">
                <span className="text-right">
                  <span className="block font-mono text-[18px] font-bold leading-none" style={{ color: band.bar }}>{emp.riskScore}</span>
                  <span className="block text-[9.5px] font-semibold uppercase tracking-wide text-[#8A96B3]">risk score</span>
                </span>
                <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase ${band.pill}`}>{band.label}</span>
                {open ? <ChevronUp className="h-4 w-4 text-[#8A96B3]" /> : <ChevronDown className="h-4 w-4 text-[#8A96B3]" />}
              </span>
            </button>

            {open ? (
              <div className="space-y-3 border-t border-[#E8EEF8] bg-[#FBFCFF] px-4 py-4">
                {/* Structural facts — the predictive backbone */}
                <div>
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wide text-[#8A96B3]">Structural &amp; financial position</p>
                  <div className="grid grid-cols-2 gap-2 md:grid-cols-4 xl:grid-cols-6">
                    <Fact label="Compa-ratio" value={emp.compaRatio.toFixed(2)} warn={emp.compaRatio < 0.9} tone={emp.compaRatio < 0.9 ? 'text-red-600' : 'text-[#1B2545]'} />
                    <Fact label="Last promotion" value={emp.lastPromotionDate} warn={emp.monthsSincePromotion >= 24} />
                    <Fact label="Months in role" value={`${emp.monthsSincePromotion} mo`} warn={emp.monthsSincePromotion >= 24} />
                    <Fact label="Last salary raise" value={emp.lastRaiseDate} warn={emp.monthsSinceRaise >= 18} />
                    <Fact label="Overtime / week" value={`${emp.overtimeHrs} h`} warn={emp.overtimeHrs >= 12} />
                    <Fact label="1-on-1 completion" value={`${emp.oneOnOneCompletion}%`} warn={emp.oneOnOneCompletion < 60} />
                  </div>
                </div>

                {/* Behavioural signals */}
                <div>
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wide text-[#8A96B3]">Behavioural signals (rolling 60 days)</p>
                  <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                    <Fact label="Sentiment score" value={`${emp.sentimentScore} (${emp.sentimentDelta > 0 ? '+' : ''}${emp.sentimentDelta})`} warn={emp.sentimentDelta <= -10} />
                    <Fact label="Single-day PTO spikes" value={emp.ptoSpikes} warn={emp.ptoSpikes >= 3} />
                    <Fact label="Recognition received" value={emp.recognition60d} warn={emp.recognition60d <= 2} />
                    <Fact label="Output velocity" value={`${emp.outputDelta > 0 ? '+' : ''}${emp.outputDelta}%`} warn={emp.outputDelta <= -20} />
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {emp.topSignals.map((id) => <SignalChip key={id} id={id} />)}
                </div>

                {/* Prediction + action */}
                <div className="rounded-xl border border-[#155EE8]/25 bg-[#EEF0FF]/70 p-3.5">
                  <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-[#155EE8]">
                    <Bot className="h-3.5 w-3.5" /> Predicted flight window: {emp.flightWindow}
                  </p>
                  <p className="mt-1.5 text-[12.5px] leading-5 text-[#50607E]">{emp.recommendation}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => onToast(`Retention plan drafted for ${emp.name}`)}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-[#155EE8] px-3 py-1.5 text-[12px] font-bold text-white transition hover:bg-[#124FC4]"
                    >
                      <ClipboardList className="h-3.5 w-3.5" /> Draft retention plan
                    </button>
                    <button
                      type="button"
                      onClick={() => onToast(`Stay-interview request sent to ${emp.manager}`)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[#D8E0F0] bg-white px-3 py-1.5 text-[12px] font-bold text-[#50607E] transition hover:bg-[#F7F8FF]"
                    >
                      <CalendarClock className="h-3.5 w-3.5" /> Request stay interview
                    </button>
                    <button
                      type="button"
                      onClick={() => onSurveyFromEmployee(emp)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[#D8E0F0] bg-white px-3 py-1.5 text-[12px] font-bold text-[#50607E] transition hover:bg-[#F7F8FF]"
                    >
                      <Sparkles className="h-3.5 w-3.5" /> Survey this concern
                    </button>
                    {emp.compaRatio < 0.9 ? (
                      <button
                        type="button"
                        onClick={() => onToast(`Off-cycle pay review opened for ${emp.name}`)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-[#D8E0F0] bg-white px-3 py-1.5 text-[12px] font-bold text-[#50607E] transition hover:bg-[#F7F8FF]"
                      >
                        <BadgeDollarSign className="h-3.5 w-3.5" /> Open pay review
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
            ) : null}
          </section>
        )
      })}

      {rows.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-[#D8E0F0] bg-white/70 px-4 py-10 text-center text-sm font-medium text-[#8A96B3]">
          No employees match these filters.
        </p>
      ) : null}
    </div>
  )
}

// ── Tab 3: surveys ──────────────────────────────────────────────────────────
function SurveyBuilder({ draft, setDraft, onToast }) {
  const [brief, setBrief] = useState({ topic: '', audience: 'All employees', count: 5, tone: 'Direct and neutral' })
  const [generating, setGenerating] = useState(false)
  const [source, setSource] = useState(null)

  const patch = (next) => setDraft((prev) => ({ ...prev, ...next }))

  const generate = async () => {
    if (generating) return
    setGenerating(true)
    setSource(null)
    try {
      const result = await generateSurveyQuestions({
        topic: brief.topic || draft.name || 'general retention risk',
        audience: brief.audience,
        count: Number(brief.count) || 5,
        tone: brief.tone,
      })
      patch({ questions: result.questions })
      setSource(result.source)
      onToast(result.source === 'groq' ? 'Questions generated by AI' : 'AI offline — generated from the built-in question bank')
    } finally {
      setGenerating(false)
    }
  }

  const updateQuestion = (index, value) => {
    patch({ questions: draft.questions.map((q, i) => (i === index ? { ...q, text: value } : q)) })
  }
  const cycleType = (index) => {
    const order = ['scale', 'open', 'choice']
    patch({
      questions: draft.questions.map((q, i) => (
        i === index ? { ...q, type: order[(order.indexOf(q.type) + 1) % order.length] } : q
      )),
    })
  }
  const removeQuestion = (index) => patch({ questions: draft.questions.filter((_, i) => i !== index) })
  const addQuestion = () => patch({ questions: [...draft.questions, { text: '', type: 'scale' }] })

  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
      {/* Builder */}
      <section className="rounded-2xl border border-white/70 bg-white/85 p-5 shadow-[0_10px_30px_rgba(24,95,165,0.08)]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-[#1B2545]">Survey builder</h3>
            <p className="mt-0.5 text-[11.5px] font-medium text-[#8A96B3]">
              Start from a template, or describe the concern and let AI draft the questions.
            </p>
          </div>
          <span className="rounded-full border border-[#D8E0F0] bg-[#F7F8FF] px-2.5 py-1 text-[10.5px] font-bold text-[#50607E]">
            {draft.questions.length} question{draft.questions.length === 1 ? '' : 's'}
          </span>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="text-[10px] font-bold uppercase tracking-wide text-[#8A96B3]">Survey name</span>
            <input
              value={draft.name}
              onChange={(event) => patch({ name: event.target.value })}
              placeholder="e.g. Engineering pay fairness check"
              className="mt-1 w-full rounded-lg border border-[#D8E0F0] bg-white px-3 py-2 text-[12.5px] font-medium text-[#1B2545] outline-none focus:border-[#155EE8]"
            />
          </label>
          <label className="block">
            <span className="text-[10px] font-bold uppercase tracking-wide text-[#8A96B3]">Audience</span>
            <input
              value={draft.audience}
              onChange={(event) => patch({ audience: event.target.value })}
              placeholder="e.g. Engineering · flagged on compa-ratio"
              className="mt-1 w-full rounded-lg border border-[#D8E0F0] bg-white px-3 py-2 text-[12.5px] font-medium text-[#1B2545] outline-none focus:border-[#155EE8]"
            />
          </label>
        </div>

        {/* AI generation */}
        <div className="mt-4 rounded-xl border border-[#155EE8]/25 bg-[#EEF0FF]/60 p-3.5">
          <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-[#155EE8]">
            <Sparkles className="h-3.5 w-3.5" /> Generate with AI
          </p>
          <div className="mt-2.5 grid grid-cols-1 gap-2 sm:grid-cols-[minmax(0,1fr)_120px_150px]">
            <input
              value={brief.topic}
              onChange={(event) => setBrief((prev) => ({ ...prev, topic: event.target.value }))}
              onKeyDown={(event) => { if (event.key === 'Enter') generate() }}
              placeholder="What retention concern should this survey probe? e.g. promotion staleness in Product"
              aria-label="Survey topic for AI generation"
              className="rounded-lg border border-[#D8E0F0] bg-white px-3 py-2 text-[12.5px] font-medium text-[#1B2545] outline-none focus:border-[#155EE8]"
            />
            <select
              value={brief.count}
              onChange={(event) => setBrief((prev) => ({ ...prev, count: event.target.value }))}
              className="rounded-lg border border-[#D8E0F0] bg-white px-3 py-2 text-[12.5px] font-medium text-[#50607E] outline-none"
            >
              {[3, 4, 5, 6, 8].map((n) => <option key={n} value={n}>{n} questions</option>)}
            </select>
            <select
              value={brief.tone}
              onChange={(event) => setBrief((prev) => ({ ...prev, tone: event.target.value }))}
              className="rounded-lg border border-[#D8E0F0] bg-white px-3 py-2 text-[12.5px] font-medium text-[#50607E] outline-none"
            >
              {['Direct and neutral', 'Warm and supportive', 'Short and anonymous'].map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div className="mt-2.5 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={generate}
              disabled={generating}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#155EE8] px-3.5 py-2 text-[12px] font-bold text-white transition hover:bg-[#124FC4] disabled:opacity-60"
            >
              {generating ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Bot className="h-3.5 w-3.5" />}
              {generating ? 'Generating…' : 'Generate questions'}
            </button>
            {source ? (
              <span className={`rounded-full border px-2 py-0.5 text-[10.5px] font-bold ${
                source === 'groq' ? 'border-emerald-200 bg-emerald-50 text-emerald-600' : 'border-amber-200 bg-amber-50 text-amber-700'
              }`}>
                {source === 'groq' ? 'Drafted by Groq (llama3)' : 'Offline draft — no API key set'}
              </span>
            ) : null}
            <span className="text-[10.5px] font-medium text-[#8A96B3]">Questions stay editable after generation.</span>
          </div>
        </div>

        {/* Questions */}
        <div className="mt-4 space-y-2">
          {draft.questions.map((question, index) => (
            <div key={index} className="flex items-start gap-2 rounded-xl border border-[#E8EEF8] bg-white p-2.5">
              <span className="mt-2 w-5 shrink-0 text-center font-mono text-[11px] font-bold text-[#8A96B3]">{index + 1}</span>
              <textarea
                value={question.text}
                onChange={(event) => updateQuestion(index, event.target.value)}
                rows={2}
                placeholder="Write a question…"
                className="min-w-0 flex-1 resize-none rounded-lg border border-transparent bg-transparent px-2 py-1.5 text-[12.5px] leading-5 text-[#1B2545] outline-none focus:border-[#D8E0F0] focus:bg-[#FBFCFF]"
              />
              <button
                type="button"
                onClick={() => cycleType(index)}
                title="Change answer type"
                className={`mt-1 shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-bold ${QUESTION_TYPES[question.type].tone}`}
              >
                {QUESTION_TYPES[question.type].label}
              </button>
              <button
                type="button"
                onClick={() => removeQuestion(index)}
                aria-label={`Remove question ${index + 1}`}
                className="mt-1 shrink-0 rounded-full p-1.5 text-[#8A96B3] transition hover:bg-red-50 hover:text-red-500"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}

          {draft.questions.length === 0 ? (
            <p className="rounded-xl border border-dashed border-[#D8E0F0] bg-[#FBFCFF] px-4 py-6 text-center text-[12px] font-medium text-[#8A96B3]">
              No questions yet — pick a template on the right, or generate a set with AI.
            </p>
          ) : null}

          <button
            type="button"
            onClick={addQuestion}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#D8E0F0] bg-white px-3 py-1.5 text-[12px] font-bold text-[#50607E] transition hover:bg-[#F7F8FF]"
          >
            <Plus className="h-3.5 w-3.5" /> Add question
          </button>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#E8EEF8] pt-3.5">
          <p className="text-[11px] font-medium text-[#8A96B3]">
            Responses are aggregated; individual answers stay anonymous below 5 respondents.
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => onToast(`"${draft.name || 'Untitled survey'}" saved as draft`)}
              className="rounded-lg border border-[#D8E0F0] bg-white px-3.5 py-2 text-[12px] font-bold text-[#50607E] transition hover:bg-[#F7F8FF]"
            >
              Save draft
            </button>
            <button
              type="button"
              disabled={!draft.questions.length}
              onClick={() => onToast(`"${draft.name || 'Untitled survey'}" sent to ${draft.audience}`)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#155EE8] px-3.5 py-2 text-[12px] font-bold text-white transition hover:bg-[#124FC4] disabled:opacity-50"
            >
              <Send className="h-3.5 w-3.5" /> Send survey
            </button>
          </div>
        </div>
      </section>

      {/* Templates + history */}
      <div className="space-y-4">
        <section className="rounded-2xl border border-white/70 bg-white/85 p-4 shadow-[0_8px_24px_rgba(24,95,165,0.06)]">
          <h3 className="text-sm font-bold text-[#1B2545]">Templates</h3>
          <div className="mt-2.5 space-y-2">
            {SURVEY_TEMPLATES.map((template) => (
              <button
                key={template.id}
                type="button"
                onClick={() => {
                  setDraft({ name: template.name, audience: template.audience, questions: template.questions.map((q) => ({ ...q })) })
                  onToast(`Loaded template: ${template.name}`)
                }}
                className="w-full rounded-xl border border-[#E8EEF8] bg-white p-3 text-left transition hover:border-[#155EE8]/50 hover:bg-[#F7F8FF]"
              >
                <p className="text-[12.5px] font-bold text-[#1B2545]">{template.name}</p>
                <p className="mt-0.5 text-[10.5px] font-medium text-[#8A96B3]">{template.audience} · {template.cadence}</p>
                <p className="mt-1 text-[10.5px] text-[#50607E]">{template.focus}</p>
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-white/70 bg-white/85 p-4 shadow-[0_8px_24px_rgba(24,95,165,0.06)]">
          <h3 className="text-sm font-bold text-[#1B2545]">Recent surveys</h3>
          <div className="mt-2.5 space-y-2">
            {SURVEY_HISTORY.map((survey) => (
              <div key={survey.id} className="rounded-xl border border-[#E8EEF8] bg-white p-3">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-[12px] font-bold text-[#1B2545]">{survey.name}</p>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-[9.5px] font-bold uppercase ${
                    survey.status === 'Open' ? 'bg-blue-50 text-[#155EE8]' : 'bg-slate-100 text-slate-500'
                  }`}>{survey.status}</span>
                </div>
                <p className="mt-1 text-[10.5px] font-medium text-[#8A96B3]">
                  {survey.responded}/{survey.sent} responded · score {survey.score}/10 · {survey.closedOn}
                </p>
                <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-[#E4E7FF]">
                  <div className="h-full rounded-full bg-[#155EE8]" style={{ width: `${(survey.responded / survey.sent) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

// ── Page ────────────────────────────────────────────────────────────────────
const TABS = [
  { id: 'signals', label: 'Signal matrix', icon: Activity },
  { id: 'people', label: 'People at risk', icon: Users },
  { id: 'surveys', label: 'Surveys', icon: ClipboardList },
]

export default function EmployeeRetention() {
  const [tab, setTab] = useState('signals')
  const [toast, setToast] = useState('')
  const toastRef = useRef(null)
  const [draft, setDraft] = useState({ name: '', audience: 'All employees', questions: [] })
  // Which department the Signal matrix is drilled into (null = overview).
  const [selectedDept, setSelectedDept] = useState(null)

  const kpis = RETENTION_KPIS()

  const showToast = (message) => {
    window.clearTimeout(toastRef.current)
    setToast(message)
    toastRef.current = window.setTimeout(() => setToast(''), 2600)
  }

  // "Survey this concern" on a watchlist row seeds the builder with that
  // employee's cohort and top signal, then jumps to the Surveys tab.
  const surveyFromEmployee = (employee) => {
    const topSignal = SIGNAL_MAP[employee.topSignals[0]]
    setDraft({
      name: `${employee.department} · ${topSignal ? topSignal.name.split('(')[0].trim() : 'retention'} check`,
      audience: `${employee.department} team (${employee.manager}'s reports)`,
      questions: [],
    })
    setTab('surveys')
    showToast(`Survey draft started for ${employee.department}`)
  }

  // An AI action that recommends asking the team seeds the survey builder.
  const surveyFromAction = (action, dept) => {
    setDraft({ name: action.title, audience: action.survey?.audience || `${dept.name} team`, questions: [] })
    setTab('surveys')
    showToast(`Survey draft started for ${dept.name}`)
  }

  return (
    <div className="employer-workspace-page flex h-screen w-screen flex-col overflow-hidden text-[#111B3F]">
      <EmployerNav variant="glass" />

      <main className="min-w-0 flex-1 overflow-y-auto">
        <div className="relative z-10 mx-auto max-w-[1480px] space-y-4 px-6 py-5">
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="flex items-center gap-2 text-2xl font-semibold text-slate-950">
                <span className="employer-home-header-icon" aria-hidden="true">
                  <Activity className="h-4 w-4" />
                </span>
                Employee Retention
              </h1>
              <p className="mt-1 text-sm font-medium text-slate-500">
                Monitor the signals that precede resignation, act on the people they point to, and ask the workforce directly.
              </p>
            </div>
            <button
              type="button"
              onClick={() => showToast('Retention briefing exported to PDF')}
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#D8E0F0] bg-white px-4 py-2.5 text-sm font-bold text-[#26304D] transition hover:border-blue-300 hover:bg-blue-50"
            >
              Export briefing <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* KPI strip */}
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
            <Kpi icon={Users} label="Company retention" value={`${OVERALL_RETENTION.toFixed(1)}%`} sub={`${TOTAL_HEADCOUNT} employees tracked`} tone="text-emerald-600" />
            <Kpi icon={AlertTriangle} label="At-risk employees" value={kpis.atRisk} sub={`${kpis.critical} critical`} tone="text-red-500" />
            <Kpi icon={Activity} label="Signals firing" value={kpis.signalsFiring} sub={`${RETENTION_SIGNALS.length} signals monitored`} tone="text-orange-500" />
            <Kpi icon={Database} label="Signal coverage" value={`${kpis.avgCoverage}%`} sub="Workforce instrumented" />
            <Kpi icon={CalendarClock} label="Avg time-to-risk" value="18d" sub="Signal fires → resignation" tone="text-purple-600" />
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap items-center gap-1 rounded-xl border border-[#D8E0F0] bg-[#F4F7FD] p-1">
            {TABS.map((item) => {
              const Icon = item.icon
              const active = tab === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTab(item.id)}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-[12.5px] font-semibold transition ${
                    active ? 'bg-white text-[#1B2545] shadow-sm' : 'text-[#8A96B3] hover:text-[#415174]'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" /> {item.label}
                </button>
              )
            })}
          </div>

          {tab === 'signals' ? (
            <SignalMatrix
              selectedDept={selectedDept}
              onSelectDept={setSelectedDept}
              onToast={showToast}
              onSurveyFromAction={surveyFromAction}
            />
          ) : null}
          {tab === 'people' ? <Watchlist onToast={showToast} onSurveyFromEmployee={surveyFromEmployee} /> : null}
          {tab === 'surveys' ? <SurveyBuilder draft={draft} setDraft={setDraft} onToast={showToast} /> : null}
        </div>
      </main>

      <DemoToast message={toast} />
    </div>
  )
}
