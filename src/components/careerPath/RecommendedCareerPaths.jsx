import React, { useMemo } from 'react'
import { ArrowRight, Sparkles, TrendingUp } from 'lucide-react'
import { careerPathNetwork } from '../../data/mockData'

// Why CareerOS surfaces each path. Falls back to a generic line so new roles in
// the network still render something sensible.
const WHY_MATCHED = {
  'data-analyst': 'Your SQL, dashboards, and Grab pipeline work map almost one-to-one onto this role.',
  'business-analyst': 'Strong leadership and stakeholder signals from your VP role transfer directly here.',
  'product-analyst': 'Analytics plus your product thinking from the hackathon make this a natural step.',
  'data-scientist': 'Python and statistics are in place; the gap is advanced ML and deployment.',
  'bi-analyst': 'Power BI and reporting evidence already sit in your Career Memory.',
  'marketing-analyst': 'Your data cleaning and segmentation work covers most of what this role screens for.',
  'data-engineer': 'Your ETL and pipeline experience is the core of this role — cloud is the gap.',
  'growth-analyst': 'Experimentation and analytics overlap well with your project evidence.',
  'operations-analyst': 'Process and reporting skills carry over; domain exposure is what is missing.',
  'financial-analyst': 'Quantitative strengths transfer, though finance fundamentals need building.',
  'product-manager': 'Leadership signals are strong; business strategy experience is the gap.',
  'ml-engineer': 'NLP interest fits, but this path needs deeper ML engineering depth.',
  'software-engineer': 'Your full-stack projects count, though system design remains the blocker.',
  accountant: 'Adjacent to your quantitative profile, but it needs formal accounting grounding.',
}

function scoreTone(score) {
  if (score >= 85) return { text: 'text-emerald-600', bar: '#10b981', chip: 'bg-emerald-50 text-emerald-700 border-emerald-100', label: 'Strong match' }
  if (score >= 70) return { text: 'text-blue-600', bar: '#6366f1', chip: 'bg-blue-50 text-blue-700 border-blue-100', label: 'Good match' }
  return { text: 'text-amber-600', bar: '#f59e0b', chip: 'bg-amber-50 text-amber-700 border-amber-100', label: 'Stretch path' }
}

/**
 * RecommendedCareerPaths
 *
 * Shown below the network graph while no role is selected. Each card selects
 * and focuses its node on the graph, which in turn opens the AI Career
 * Advisor Report for that role.
 */
export default function RecommendedCareerPaths({ limit = 6, onSelect }) {
  const industryById = useMemo(() => {
    const map = {}
    careerPathNetwork.industries.forEach((industry) => { map[industry.id] = industry })
    return map
  }, [])

  const skillsByRole = useMemo(() => {
    const labels = {}
    careerPathNetwork.skills.forEach((skill) => { labels[skill.id] = skill.label })
    const map = {}
    careerPathNetwork.roleSkillEdges.forEach((edge) => {
      if (!map[edge.role]) map[edge.role] = []
      if (labels[edge.skill]) map[edge.role].push(labels[edge.skill])
    })
    return map
  }, [])

  const recommended = useMemo(
    () => [...careerPathNetwork.roles].sort((a, b) => b.matchScore - a.matchScore).slice(0, limit),
    [limit],
  )

  const topScore = recommended[0]?.matchScore ?? 0

  return (
    <section className="rounded-[24px] border border-white/70 bg-white/80 p-5 shadow-[0_10px_30px_rgba(100,130,200,0.08)] backdrop-blur">
      <header className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div className="min-w-0">
          <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-violet-600">
            <Sparkles size={12} strokeWidth={2.4} />
            Recommended for you
          </p>
          <h3 className="mt-1 text-lg font-bold text-[#17124d]">Career paths ranked by your match</h3>
          <p className="mt-1 text-sm font-medium text-slate-500">
            Scored against your Career Memory. Pick one to open its AI Career Advisor Report.
          </p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
          <TrendingUp size={12} strokeWidth={2.4} />
          Top match {topScore}%
        </span>
      </header>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {recommended.map((role) => {
          const industry = industryById[role.industry]
          const tone = scoreTone(role.matchScore)
          const skills = (skillsByRole[role.id] ?? []).slice(0, 3)
          return (
            <button
              key={role.id}
              type="button"
              onClick={() => onSelect?.(role.id)}
              aria-label={`Open the AI Career Advisor Report for ${role.label}`}
              className="group flex flex-col rounded-2xl border border-slate-200/80 bg-white p-4 text-left shadow-[0_4px_14px_rgba(100,130,200,0.06)] transition hover:-translate-y-0.5 hover:border-violet-300 hover:shadow-[0_12px_28px_rgba(139,92,246,0.14)] focus:outline-none focus:ring-2 focus:ring-violet-300"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-[#11194a] group-hover:text-violet-700">{role.label}</p>
                  {industry ? (
                    <span className="mt-1 inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
                      <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: industry.color }} />
                      {industry.label}
                    </span>
                  ) : null}
                </div>
                <div className="flex flex-col items-end">
                  <span className={`text-xl font-bold leading-none ${tone.text}`}>{role.matchScore}%</span>
                  <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-400">match</span>
                </div>
              </div>

              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full" style={{ width: `${role.matchScore}%`, background: tone.bar }} />
              </div>

              <p className="mt-2.5 text-[12px] font-medium leading-5 text-slate-500">
                {WHY_MATCHED[role.id] ?? 'Adjacent to your current profile based on the skills you have logged.'}
              </p>

              {skills.length ? (
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {skills.map((skill) => (
                    <span key={skill} className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10.5px] font-semibold text-slate-600">
                      {skill}
                    </span>
                  ))}
                </div>
              ) : null}

              <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2.5">
                <span className={`rounded-full border px-2 py-0.5 text-[10.5px] font-bold ${tone.chip}`}>{tone.label}</span>
                <span className="flex items-center gap-1 text-[11.5px] font-bold text-violet-600">
                  View AI report
                  <ArrowRight size={12} strokeWidth={2.6} className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </button>
          )
        })}
      </div>
    </section>
  )
}
