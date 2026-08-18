import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Award, Briefcase, Building2, ChevronDown, ChevronRight, Code2, Users } from 'lucide-react'
import { SKILLS } from '../../data/skillDevelopmentData'

// ─── Categories ───────────────────────────────────────────────────────
// Ids match the Skill Development page's sidebar so a click can land the
// user on exactly the right section there.
const CATEGORIES = [
  { id: 'technical', label: 'Technical', icon: Code2, chip: 'bg-[#e0e3ff] text-[#5B6CF9]' },
  { id: 'soft', label: 'Soft skills', icon: Users, chip: 'bg-[#e1f5ee] text-[#0F6E56]' },
  { id: 'domain', label: 'Domain knowledge', icon: Building2, chip: 'bg-[#fef9c3] text-[#854F0B]' },
  { id: 'cert', label: 'Certifications', icon: Award, chip: 'bg-[#ede9fe] text-[#534AB7]' },
]

// Career Memory tracks the same skills the Skill Development page does, so the
// gap table is derived from that single source instead of a second copy.
const DEFAULT_SKILL_GAPS = SKILLS.map((skill) => ({
  id: skill.id,
  name: skill.name,
  description: skill.sub,
  category: skill.cat,
  yourLevel: skill.pct,
  requiredLevel: skill.required,
  nextStep: skill.status === 'gap'
    ? 'Start course'
    : skill.status === 'progress'
      ? 'Continue path'
      : skill.yourLevel > skill.requiredLevel ? 'Strength' : 'Maintain',
}))

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

const ROW_GRID = 'grid grid-cols-[minmax(150px,1.4fr)_minmax(160px,2.6fr)_70px_110px] items-center gap-3'

// ─── Stat card ───────────────────────────────────────────────────────
function StatCard({ value, valueTone, label, sublabel }) {
  const VALUE_TONES = {
    rose: 'text-rose-600',
    amber: 'text-amber-600',
    emerald: 'text-emerald-600',
  }
  return (
    <div className="rounded-2xl border border-white/70 bg-white/85 p-4 shadow-[0_10px_24px_rgba(37,99,235,0.06),inset_0_1px_0_rgba(255,255,255,0.85)]">
      <p className={`text-2xl font-bold tracking-tight ${VALUE_TONES[valueTone] ?? 'text-[#11194a]'}`}>
        {value}
      </p>
      <p className="mt-1 text-sm font-semibold text-[#11194a]">{label}</p>
      <p className="mt-0.5 text-xs font-medium text-[#7382a1]">{sublabel}</p>
    </div>
  )
}

// ─── Skill row ───────────────────────────────────────────────────────
// Each row is a button: it opens the matching skill on the Skill Development
// page, pre-filtered to the skill's own category.
function SkillRow({ skill, onOpenSkill }) {
  const barWidth = Math.max(0, Math.min(100, skill.yourLevel))
  const markerLeft = Math.max(0, Math.min(100, skill.requiredLevel))
  const gapLabel = skill.gap > 0 ? `+${skill.gap}` : skill.gap === 0 ? 'Met' : `${skill.gap}`

  return (
    <li>
      <button
        type="button"
        onClick={() => onOpenSkill(skill)}
        aria-label={`Open ${skill.name} in Skill Development`}
        className={`${ROW_GRID} group w-full px-4 py-3.5 text-left transition hover:bg-blue-50/60 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-200`}
      >
        {/* Skill */}
        <div className="flex items-start gap-2">
          <span
            className={`mt-1.5 h-2 w-2 flex-shrink-0 rounded-full ${DOT_TONES[skill.severity]}`}
            aria-hidden="true"
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-[#11194a] group-hover:text-blue-700">{skill.name}</p>
            <p className="truncate text-[11px] font-medium text-[#7382a1]">{skill.description}</p>
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
          <div className="mt-1.5 flex justify-between text-[11px] font-semibold">
            <span className="text-blue-700">You: {skill.yourLevel}%</span>
            <span className="text-[#7382a1]">Need: {skill.requiredLevel}%</span>
          </div>
        </div>

        {/* Gap pill */}
        <div className="flex justify-center">
          <span
            className={`inline-flex min-w-[3.25rem] justify-center rounded-full border px-2.5 py-1 text-xs font-bold ${GAP_PILL_TONES[skill.severity]}`}
          >
            {gapLabel}
          </span>
        </div>

        {/* Next step */}
        <div className="flex items-center justify-end gap-1 text-xs font-bold text-blue-600 transition group-hover:text-blue-800">
          {skill.nextStep}
          <ArrowRight size={12} strokeWidth={2.6} className="transition-transform group-hover:translate-x-0.5" />
        </div>
      </button>
    </li>
  )
}

// ─── Main component ──────────────────────────────────────────────────
export default function SkillGapAnalysis({ skills = DEFAULT_SKILL_GAPS }) {
  const navigate = useNavigate()
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

  // Categories are dynamic: one is only suggested while it still has skills
  // below their required level. Categories already covered move to the
  // "on track" strip instead of taking up a whole block.
  const { needsWork, onTrack } = useMemo(() => {
    const buckets = CATEGORIES.map((category) => {
      const rows = summary.enriched.filter((skill) => skill.category === category.id)
      const gaps = rows.filter((skill) => skill.gap < 0)
      const avgReadiness = rows.length
        ? Math.round(rows.reduce((sum, s) => sum + Math.min(100, (s.yourLevel / s.requiredLevel) * 100), 0) / rows.length)
        : 0
      return { ...category, rows, gaps, avgReadiness }
    }).filter((bucket) => bucket.rows.length > 0)

    return {
      needsWork: buckets.filter((bucket) => bucket.gaps.length > 0),
      onTrack: buckets.filter((bucket) => bucket.gaps.length === 0),
    }
  }, [summary])

  const openCategory = (categoryId) => {
    navigate('/student/skill-development', { state: { category: categoryId } })
  }

  const openSkill = (skill) => {
    navigate('/student/skill-development', { state: { category: skill.category, skillId: skill.id } })
  }

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
          <p className="text-[11px] font-semibold uppercase tracking-wide text-violet-600">
            Skill Gap Analysis
          </p>
          <h2 className="mt-1 text-lg font-bold leading-tight text-[#11194a] sm:text-xl">
            {headline}
          </h2>
          <p className="mt-1 text-sm font-medium text-[#637094]">{subheadline}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Editable target-role pill */}
          <label className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/95 px-3 py-2 shadow-[0_4px_10px_rgba(37,99,235,0.06)] transition focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-100">
            <Briefcase size={14} className="text-blue-600" strokeWidth={2.2} />
            <span className="text-xs font-semibold text-[#637094]">Target:</span>
            <input
              value={targetRole}
              onChange={(event) => setTargetRole(event.target.value)}
              placeholder="Data Analyst"
              aria-label="Target role"
              className="w-40 bg-transparent text-xs font-semibold text-blue-700 placeholder:text-[#8a96af] focus:outline-none"
            />
          </label>

          {/* Optional industry filter */}
          <div className="relative inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/95 px-3 py-2 shadow-[0_4px_10px_rgba(37,99,235,0.06)] transition focus-within:border-violet-300 focus-within:ring-2 focus-within:ring-violet-100">
            <Building2 size={14} className="text-violet-600" strokeWidth={2.2} />
            <span className="text-xs font-semibold text-[#637094]">Industry:</span>
            <select
              value={industryId}
              onChange={(event) => setIndustryId(event.target.value)}
              aria-label="Industry (optional)"
              className="appearance-none bg-transparent pr-4 text-xs font-semibold text-violet-700 focus:outline-none"
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

      {/* ── Categories that still need work ────────────────────── */}
      <div className="mt-4 space-y-3">
        {needsWork.map((category) => {
          const Icon = category.icon
          return (
            <div
              key={category.id}
              className="overflow-hidden rounded-2xl border border-white/70 bg-white/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]"
            >
              {/* Category header — opens this section on Skill Development */}
              <button
                type="button"
                onClick={() => openCategory(category.id)}
                className="group flex w-full items-center gap-3 border-b border-blue-50 px-4 py-3 text-left transition hover:bg-blue-50/50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-200"
              >
                <span className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg ${category.chip}`}>
                  <Icon size={16} strokeWidth={2.1} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold text-[#11194a] group-hover:text-blue-700">{category.label}</span>
                  <span className="block text-[11px] font-medium text-[#7382a1]">
                    {category.gaps.length} gap{category.gaps.length === 1 ? '' : 's'} · {category.rows.length} skill
                    {category.rows.length === 1 ? '' : 's'} tracked · {category.avgReadiness}% ready
                  </span>
                </span>
                <span className="flex flex-shrink-0 items-center gap-1 text-xs font-bold text-blue-600 group-hover:text-blue-800">
                  View section
                  <ChevronRight size={14} strokeWidth={2.6} className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </button>

              {/* Column headers */}
              <div className={`${ROW_GRID} border-b border-blue-50 px-4 py-2 text-[10px] font-semibold uppercase tracking-wide text-[#7382a1]`}>
                <span>Skill</span>
                <span>Your level vs. required</span>
                <span className="text-center">Gap</span>
                <span className="text-right">Next step</span>
              </div>

              <ul className="divide-y divide-blue-50">
                {category.gaps.map((skill) => (
                  <SkillRow key={skill.id} skill={skill} onOpenSkill={openSkill} />
                ))}
              </ul>
            </div>
          )
        })}
      </div>

      {/* ── Categories already covered ─────────────────────────── */}
      {onTrack.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-2 rounded-2xl border border-emerald-100 bg-emerald-50/60 px-4 py-3">
          <span className="text-xs font-bold uppercase tracking-wide text-emerald-700">On track</span>
          <span className="text-xs font-medium text-emerald-800">
            No suggestions needed here — you already meet every requirement.
          </span>
          <span className="ml-auto flex flex-wrap gap-2">
            {onTrack.map((category) => {
              const Icon = category.icon
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => openCategory(category.id)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-white/85 px-3 py-1 text-xs font-bold text-emerald-800 transition hover:bg-white"
                >
                  <Icon size={12} strokeWidth={2.2} />
                  {category.label}
                  <ChevronRight size={12} strokeWidth={2.6} />
                </button>
              )
            })}
          </span>
        </div>
      )}

      {needsWork.length === 0 && (
        <p className="mt-3 rounded-2xl border border-dashed border-emerald-200 bg-white/70 p-6 text-center text-sm font-semibold text-emerald-700">
          Every tracked category meets its requirement for {targetRole || 'your target role'}. Nothing to close right now.
        </p>
      )}
    </section>
  )
}
