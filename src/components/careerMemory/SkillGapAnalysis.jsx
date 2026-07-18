import React, { useMemo, useState } from 'react'
import { ArrowRight, Briefcase, Building2, ChevronDown } from 'lucide-react'

// ─── Demo data ────────────────────────────────────────────────────────
// One row per tracked skill against the target role. Wire this to real
// data (Career Memory signals × target-role requirements) later.
const DEFAULT_SKILL_GAPS = [
  {
    id: 'system-design',
    name: 'System design',
    description: 'Architecture, scalability',
    yourLevel: 22,
    requiredLevel: 80,
    nextStep: 'Start course',
  },
  {
    id: 'data-sql',
    name: 'Data / SQL',
    description: 'Queries, schema design',
    yourLevel: 30,
    requiredLevel: 65,
    nextStep: 'Start course',
  },
  {
    id: 'backend-apis',
    name: 'Backend APIs',
    description: 'REST, auth, deployment',
    yourLevel: 45,
    requiredLevel: 75,
    nextStep: 'Build project',
  },
  {
    id: 'react-frontend',
    name: 'React / Frontend',
    description: 'Components, state, hooks',
    yourLevel: 70,
    requiredLevel: 70,
    nextStep: 'Maintain',
  },
  {
    id: 'leadership',
    name: 'Leadership',
    description: 'Team, cross-functional',
    yourLevel: 88,
    requiredLevel: 60,
    nextStep: 'Strength',
  },
]

const INDUSTRY_OPTIONS = [
  { id: 'any', label: 'Any industry' },
  { id: 'tech', label: 'Tech / Software' },
  { id: 'fintech', label: 'Fintech / Banking' },
  { id: 'healthcare', label: 'Healthcare' },
  { id: 'consulting', label: 'Consulting' },
  { id: 'ecommerce', label: 'E-commerce / Retail' },
  { id: 'edtech', label: 'EdTech' },
  { id: 'gaming', label: 'Gaming / Media' },
  { id: 'ai', label: 'AI / ML' },
]

// ─── Severity mapping ────────────────────────────────────────────────
function severityFor(gap) {
  if (gap >= 0) return gap === 0 ? 'met' : 'strength'
  if (gap <= -50) return 'critical'
  if (gap <= -25) return 'high'
  return 'moderate'
}

const DOT_TONES = {
  critical: 'bg-rose-500',
  high: 'bg-amber-500',
  moderate: 'bg-amber-400',
  met: 'bg-emerald-500',
  strength: 'bg-emerald-500',
}

const BAR_TONES = {
  critical: 'bg-indigo-500',
  high: 'bg-indigo-500',
  moderate: 'bg-indigo-500',
  met: 'bg-emerald-500',
  strength: 'bg-emerald-500',
}

const MARKER_TONES = {
  critical: 'bg-rose-500',
  high: 'bg-amber-500',
  moderate: 'bg-amber-400',
  met: 'bg-emerald-500',
  strength: 'bg-emerald-500',
}

const GAP_PILL_TONES = {
  critical: 'bg-rose-50 text-rose-700 border-rose-100',
  high: 'bg-amber-50 text-amber-700 border-amber-100',
  moderate: 'bg-amber-50 text-amber-700 border-amber-100',
  met: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  strength: 'bg-emerald-50 text-emerald-700 border-emerald-100',
}

const NEXT_STEP_TONES = {
  actionable: 'text-blue-600 hover:text-blue-800',
  passive: 'text-[#7382a1]',
}

// ─── Stat card ───────────────────────────────────────────────────────
function StatCard({ value, valueTone, label, sublabel }) {
  const VALUE_TONES = {
    rose: 'text-rose-600',
    amber: 'text-amber-600',
    emerald: 'text-emerald-600',
  }
  return (
    <div className="rounded-2xl border border-white/70 bg-white/85 p-4 shadow-[0_10px_24px_rgba(37,99,235,0.06),inset_0_1px_0_rgba(255,255,255,0.85)]">
      <p className={`text-2xl font-black tracking-tight ${VALUE_TONES[valueTone] ?? 'text-[#11194a]'}`}>
        {value}
      </p>
      <p className="mt-1 text-sm font-bold text-[#11194a]">{label}</p>
      <p className="mt-0.5 text-xs font-medium text-[#7382a1]">{sublabel}</p>
    </div>
  )
}

// ─── Main component ──────────────────────────────────────────────────
export default function SkillGapAnalysis({ skills = DEFAULT_SKILL_GAPS }) {
  const [targetRole, setTargetRole] = useState('Full-Stack Engineer')
  const [industryId, setIndustryId] = useState('any')

  // Derived stats
  const summary = useMemo(() => {
    const enriched = skills.map((skill) => {
      const gap = skill.yourLevel - skill.requiredLevel
      return { ...skill, gap, severity: severityFor(gap) }
    })
    const gapsOnly = enriched.filter((s) => s.gap < 0)
    const biggest = gapsOnly.reduce(
      (worst, s) => (s.gap < worst.gap ? s : worst),
      { gap: 0, name: '—' },
    )
    // Readiness gain = average shortfall across skills, expressed as %.
    const totalShortfall = gapsOnly.reduce((sum, s) => sum + Math.abs(s.gap), 0)
    const readinessGain = skills.length > 0 ? Math.round(totalShortfall / skills.length) : 0
    return {
      enriched,
      skillsBelowThreshold: gapsOnly.length,
      biggestGap: biggest.gap,
      biggestGapName: biggest.name,
      readinessGain,
    }
  }, [skills])

  const headline = summary.skillsBelowThreshold > 0
    ? `${summary.skillsBelowThreshold} gap${summary.skillsBelowThreshold === 1 ? '' : 's'} standing between you and your target role`
    : "You're on track for your target role"
  const subheadline = summary.skillsBelowThreshold > 0
    ? `Fix ${summary.biggestGapName.toLowerCase()} first — it's your biggest gap and highest-leverage move.`
    : 'Keep maintaining these skills and build up any strengths further.'

  return (
    <section className="rounded-[28px] border border-white/70 bg-[linear-gradient(135deg,rgba(239,242,255,0.85),rgba(239,246,255,0.6))] p-5 shadow-[0_18px_45px_rgba(37,99,235,0.06),inset_0_1px_0_rgba(255,255,255,0.85)] ring-1 ring-blue-100/40 backdrop-blur">
      {/* ── Header row ─────────────────────────────────────────── */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-violet-600">
            Skill Gap Analysis
          </p>
          <h2 className="mt-1 text-lg font-black leading-tight text-[#11194a] sm:text-xl">
            {headline}
          </h2>
          <p className="mt-1 text-sm font-medium text-[#637094]">{subheadline}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Editable target-role pill */}
          <label className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/95 px-3 py-2 shadow-[0_4px_10px_rgba(37,99,235,0.06)] transition focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-100">
            <Briefcase size={14} className="text-blue-600" strokeWidth={2.2} />
            <span className="text-xs font-bold text-[#637094]">Target:</span>
            <input
              value={targetRole}
              onChange={(event) => setTargetRole(event.target.value)}
              placeholder="Data Analyst"
              aria-label="Target role"
              className="w-40 bg-transparent text-xs font-black text-blue-700 placeholder:text-[#9aa6c3] focus:outline-none"
            />
          </label>

          {/* Optional industry filter */}
          <div className="relative inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/95 px-3 py-2 shadow-[0_4px_10px_rgba(37,99,235,0.06)] transition focus-within:border-violet-300 focus-within:ring-2 focus-within:ring-violet-100">
            <Building2 size={14} className="text-violet-600" strokeWidth={2.2} />
            <span className="text-xs font-bold text-[#637094]">Industry:</span>
            <select
              value={industryId}
              onChange={(event) => setIndustryId(event.target.value)}
              aria-label="Industry (optional)"
              className="appearance-none bg-transparent pr-4 text-xs font-black text-violet-700 focus:outline-none"
            >
              {INDUSTRY_OPTIONS.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown size={12} className="pointer-events-none absolute right-2.5 text-violet-500" />
          </div>
        </div>
      </div>

      {/* ── Stat cards ─────────────────────────────────────────── */}
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <StatCard
          value={summary.skillsBelowThreshold}
          valueTone="rose"
          label="Skills below threshold"
          sublabel="Blocking senior roles"
        />
        <StatCard
          value={summary.biggestGap === 0 ? '0 pts' : `${summary.biggestGap} pts`}
          valueTone="amber"
          label="Biggest single gap"
          sublabel={summary.biggestGapName}
        />
        <StatCard
          value={`+${summary.readinessGain}%`}
          valueTone="emerald"
          label="Readiness gain possible"
          sublabel="If all gaps are closed"
        />
      </div>

      {/* ── Skill table ────────────────────────────────────────── */}
      <div className="mt-4 overflow-hidden rounded-2xl border border-white/70 bg-white/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]">
        {/* Column headers */}
        <div className="grid grid-cols-[minmax(150px,1.4fr)_minmax(160px,2.6fr)_70px_100px] items-center gap-3 border-b border-blue-50 px-4 py-2.5 text-[10px] font-black uppercase tracking-[0.14em] text-[#9aa6c3]">
          <span>Skill</span>
          <span>Your level vs. required</span>
          <span className="text-center">Gap</span>
          <span className="text-right">Next step</span>
        </div>

        <ul className="divide-y divide-blue-50">
          {summary.enriched.map((skill) => {
            const barWidth = Math.max(0, Math.min(100, skill.yourLevel))
            const markerLeft = Math.max(0, Math.min(100, skill.requiredLevel))
            const gapLabel = skill.gap > 0
              ? `+${skill.gap}`
              : skill.gap === 0
                ? 'Met'
                : `${skill.gap}`
            const isActionable = skill.nextStep === 'Start course' || skill.nextStep === 'Build project'
            const nextStepTone = isActionable ? NEXT_STEP_TONES.actionable : NEXT_STEP_TONES.passive
            return (
              <li
                key={skill.id}
                className="grid grid-cols-[minmax(150px,1.4fr)_minmax(160px,2.6fr)_70px_100px] items-center gap-3 px-4 py-3.5"
              >
                {/* Skill */}
                <div className="flex items-start gap-2">
                  <span
                    className={`mt-1.5 h-2 w-2 flex-shrink-0 rounded-full ${DOT_TONES[skill.severity]}`}
                    aria-hidden="true"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-black text-[#11194a]">{skill.name}</p>
                    <p className="text-[11px] font-medium text-[#7382a1]">{skill.description}</p>
                  </div>
                </div>

                {/* Bar + numbers */}
                <div>
                  <div className="relative h-2 rounded-full bg-blue-50">
                    <div
                      className={`absolute inset-y-0 left-0 rounded-full ${BAR_TONES[skill.severity]}`}
                      style={{ width: `${barWidth}%` }}
                    />
                    <span
                      className={`absolute top-1/2 h-3.5 w-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full ${MARKER_TONES[skill.severity]}`}
                      style={{ left: `${markerLeft}%` }}
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-1.5 flex justify-between text-[11px] font-bold">
                    <span className="text-blue-700">You: {skill.yourLevel}%</span>
                    <span className="text-[#7382a1]">Need: {skill.requiredLevel}%</span>
                  </div>
                </div>

                {/* Gap pill */}
                <div className="flex justify-center">
                  <span
                    className={`inline-flex min-w-[3.25rem] justify-center rounded-full border px-2.5 py-1 text-xs font-black ${GAP_PILL_TONES[skill.severity]}`}
                  >
                    {gapLabel}
                  </span>
                </div>

                {/* Next step */}
                <div className="text-right">
                  {isActionable ? (
                    <button
                      type="button"
                      className={`inline-flex items-center gap-1 text-xs font-black transition ${nextStepTone}`}
                    >
                      {skill.nextStep}
                      <ArrowRight size={12} strokeWidth={2.6} />
                    </button>
                  ) : (
                    <span className={`text-xs font-bold ${nextStepTone}`}>{skill.nextStep}</span>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
