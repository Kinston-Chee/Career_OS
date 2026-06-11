import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../ui/Card'
import { careerIntelligence, initialExperiences } from '../../data/mockData'

// ─── Skill Evidence Modal ───────────────────────────────────────────────
function SkillEvidenceModal({ skill, experiences, onClose }) {
  const relatedExps = experiences.filter((exp) =>
    (exp.extractedSkills || []).some((s) => s.name.toLowerCase() === skill.toLowerCase())
  )

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div
        className="mx-4 max-h-[80vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-violet-100 bg-white p-6 shadow-[0_24px_60px_rgba(88,63,188,0.2)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-[#11104a]">{skill}</h3>
            <p className="mt-1 text-xs text-slate-500">Evidence from your career memory</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition hover:bg-slate-50 hover:text-slate-700"
          >
            ✕
          </button>
        </div>

        <div className="mt-5 space-y-3">
          {relatedExps.length > 0 ? (
            relatedExps.map((exp) => {
              const skillEntry = exp.extractedSkills?.find((s) => s.name.toLowerCase() === skill.toLowerCase())
              return (
                <div key={exp.id} className="rounded-xl border border-slate-100 bg-slate-50/60 p-3.5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{exp.title}</p>
                      <p className="mt-0.5 text-xs text-slate-500">{exp.type} · {exp.date}</p>
                    </div>
                    {skillEntry && (
                      <span className="shrink-0 rounded-lg bg-violet-100 px-2 py-0.5 text-[10px] font-bold text-violet-700">
                        {skillEntry.level}
                      </span>
                    )}
                  </div>
                  {exp.achievement && (
                    <p className="mt-2 text-xs text-slate-600">🏆 {exp.achievement}</p>
                  )}
                  {exp.organization && (
                    <p className="mt-1 text-[11px] text-slate-400">🏢 {exp.organization}</p>
                  )}
                </div>
              )
            })
          ) : (
            <p className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4 text-center text-sm text-slate-400">
              No direct evidence found for this skill yet.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Cluster definitions ────────────────────────────────────────────────
const SKILL_CLUSTERS = [
  {
    id: 'technical',
    label: 'Technical',
    icon: '💻',
    color: 'violet',
    bgClass: 'bg-violet-50',
    borderClass: 'border-violet-100',
    badgeClass: 'bg-violet-100 text-violet-700',
    keywords: ['python', 'sql', 'react', 'power bi', 'tableau', 'excel', 'docker', 'aws', 'cloud', 'git', 'streamlit', 'data pipeline', 'data visualization', 'data cleaning', 'data analysis', 'r programming', 'websockets', 'd3.js', 'langchain', 'pandas', 'mlops', 'ci/cd', 'deep learning', 'machine learning', 'nlp', 'prompt engineering'],
  },
  {
    id: 'business',
    label: 'Business',
    icon: '📊',
    color: 'blue',
    bgClass: 'bg-blue-50',
    borderClass: 'border-blue-100',
    badgeClass: 'bg-blue-100 text-blue-700',
    keywords: ['business communication', 'stakeholder management', 'problem solving', 'analytical thinking', 'research methodology', 'statistical analysis', 'academic writing', 'technical writing', 'curriculum design'],
  },
  {
    id: 'leadership',
    label: 'Leadership',
    icon: '👑',
    color: 'amber',
    bgClass: 'bg-amber-50',
    borderClass: 'border-amber-100',
    badgeClass: 'bg-amber-100 text-amber-700',
    keywords: ['leadership', 'event management', 'teamwork', 'teaching'],
  },
  {
    id: 'communication',
    label: 'Communication',
    icon: '💬',
    color: 'emerald',
    bgClass: 'bg-emerald-50',
    borderClass: 'border-emerald-100',
    badgeClass: 'bg-emerald-100 text-emerald-700',
    keywords: ['communication', 'public speaking', 'presentation skills'],
  },
]

function classifySkill(skillName) {
  const lower = skillName.toLowerCase()
  for (const cluster of SKILL_CLUSTERS) {
    if (cluster.keywords.some((kw) => lower.includes(kw) || kw.includes(lower))) {
      return cluster.id
    }
  }
  return 'technical'
}

// ─── Main Component ─────────────────────────────────────────────────────
export default function SkillSummaryTab() {
  const navigate = useNavigate()
  const [expandedCluster, setExpandedCluster] = useState(null)
  const [evidenceSkill, setEvidenceSkill] = useState(null)
  const experiences = initialExperiences

  // Build skills from experiences
  const allSkills = useMemo(() => {
    const freq = {}
    const levelMap = {}
    experiences.forEach((exp) => {
      (exp.extractedSkills || []).forEach((s) => {
        freq[s.name] = (freq[s.name] || 0) + 1
        if (!levelMap[s.name] || s.credibility > (levelMap[s.name].credibility || 0)) {
          levelMap[s.name] = s
        }
      })
    })
    return Object.entries(freq).map(([name, count]) => ({
      name,
      count,
      level: levelMap[name]?.level || 'Emerging',
      credibility: levelMap[name]?.credibility || 70,
      cluster: classifySkill(name),
      demand: careerIntelligence.missingSkills.some((ms) => ms.label.toLowerCase().includes(name.toLowerCase()))
        ? 'Gap'
        : count >= 3 ? 'High' : count >= 2 ? 'Medium' : 'Emerging',
    }))
  }, [experiences])

  const clusteredSkills = useMemo(() => {
    const result = {}
    SKILL_CLUSTERS.forEach((c) => { result[c.id] = [] })
    allSkills.forEach((s) => {
      if (result[s.cluster]) result[s.cluster].push(s)
      else result.technical.push(s)
    })
    // Sort by credibility descending within each cluster
    Object.values(result).forEach((arr) => arr.sort((a, b) => b.credibility - a.credibility))
    return result
  }, [allSkills])

  // Level 1 — Overview stats
  const totalSkills = allSkills.length
  const highDemandCount = allSkills.filter((s) => s.demand === 'High').length
  const marketRelevance = totalSkills > 0 ? Math.round((highDemandCount / totalSkills) * 100) : 0
  const avgStrength = totalSkills > 0 ? Math.round(allSkills.reduce((sum, s) => sum + s.credibility, 0) / totalSkills) : 0

  // Level 4 — Improvement suggestions
  const improvementSuggestions = [
    { type: 'Workshop', title: 'Power BI Dashboard Workshop', skill: 'Power BI', icon: '🏫', cta: 'View in Events' },
    { type: 'Certification', title: 'Google Data Analytics Certificate', skill: 'Data Analysis', icon: '🎓', cta: 'Learn More' },
    { type: 'Project', title: 'Build an end-to-end ML pipeline', skill: 'Machine Learning', icon: '🚀', cta: 'Get Started' },
    { type: 'Certification', title: 'AWS Cloud Practitioner', skill: 'Cloud Computing', icon: '☁️', cta: 'Learn More' },
  ]

  return (
    <div className="space-y-6">
      {/* Level 1 — Skills Overview */}
      <section className="grid gap-4 sm:grid-cols-3">
        {[
          { label: 'Total Skills', value: totalSkills, sub: 'Across all experiences', icon: '🎯', color: 'violet' },
          { label: 'Market Relevance', value: `${marketRelevance}%`, sub: 'Skills in high demand', icon: '📈', color: 'emerald' },
          { label: 'Strength Score', value: `${avgStrength}%`, sub: 'Average proficiency', icon: '💪', color: 'blue' },
        ].map((stat) => (
          <Card key={stat.label} className="rounded-2xl border-slate-200/80 bg-white/95 p-5 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{stat.label}</p>
                <p className="mt-1 text-3xl font-bold text-[#11104a]">{stat.value}</p>
                <p className="mt-1 text-[11px] text-slate-500">{stat.sub}</p>
              </div>
              <span className="text-2xl">{stat.icon}</span>
            </div>
          </Card>
        ))}
      </section>

      {/* Level 2 — Skill Clusters */}
      <section>
        <h3 className="mb-4 text-base font-semibold text-slate-950">Skill Clusters</h3>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {SKILL_CLUSTERS.map((cluster) => {
            const skills = clusteredSkills[cluster.id] || []
            const isExpanded = expandedCluster === cluster.id
            const avgCred = skills.length > 0 ? Math.round(skills.reduce((s, sk) => s + sk.credibility, 0) / skills.length) : 0
            return (
              <button
                key={cluster.id}
                type="button"
                onClick={() => setExpandedCluster(isExpanded ? null : cluster.id)}
                className={`rounded-2xl border p-4 text-left transition-all duration-200 ${
                  isExpanded
                    ? `${cluster.borderClass} ${cluster.bgClass} ring-2 ring-${cluster.color}-200 shadow-lg`
                    : `border-slate-200/80 bg-white hover:border-${cluster.color}-200 hover:shadow-md`
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{cluster.icon}</span>
                  <span className="text-sm font-bold text-slate-900">{cluster.label}</span>
                  <span className={`ml-auto rounded-full px-2 py-0.5 text-[10px] font-bold ${cluster.badgeClass}`}>
                    {skills.length}
                  </span>
                </div>
                <div className="mt-3">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">Avg. Proficiency</span>
                    <span className="font-bold text-slate-700">{avgCred}%</span>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-100">
                    <div className={`h-full rounded-full bg-${cluster.color}-500 transition-all duration-500`} style={{ width: `${avgCred}%` }} />
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-1">
                  {skills.slice(0, 3).map((s) => (
                    <span key={s.name} className="rounded-md bg-white/80 px-1.5 py-0.5 text-[10px] font-medium text-slate-600 ring-1 ring-slate-100">
                      {s.name}
                    </span>
                  ))}
                  {skills.length > 3 && (
                    <span className="text-[10px] font-medium text-slate-400">+{skills.length - 3}</span>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </section>

      {/* Level 3 — Expanded Cluster Detail */}
      {expandedCluster && (
        <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-slate-950">
              {SKILL_CLUSTERS.find((c) => c.id === expandedCluster)?.icon}{' '}
              {SKILL_CLUSTERS.find((c) => c.id === expandedCluster)?.label} Skills — Detailed Analysis
            </h3>
            <button
              type="button"
              onClick={() => setExpandedCluster(null)}
              className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-900"
            >
              Close
            </button>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {(clusteredSkills[expandedCluster] || []).map((skill) => (
              <div key={skill.name} className="rounded-xl border border-slate-100 bg-slate-50/40 p-3.5">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold text-slate-900">{skill.name}</p>
                  <span className={`shrink-0 rounded-md px-2 py-0.5 text-[10px] font-bold ${
                    skill.demand === 'High' ? 'bg-emerald-100 text-emerald-700'
                    : skill.demand === 'Gap' ? 'bg-rose-100 text-rose-700'
                    : 'bg-slate-100 text-slate-600'
                  }`}>
                    {skill.demand === 'Gap' ? '⚠ Gap' : skill.demand}
                  </span>
                </div>
                <div className="mt-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">Proficiency</span>
                    <span className="font-bold text-slate-700">{skill.credibility}%</span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-slate-200">
                    <div className="h-full rounded-full bg-violet-500" style={{ width: `${skill.credibility}%` }} />
                  </div>
                </div>
                <div className="mt-2.5 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Level: {skill.level}</span>
                  <span className="text-slate-400">{skill.count} exp{skill.count !== 1 ? 's' : ''}</span>
                </div>
                <div className="mt-2.5 flex gap-1.5">
                  <button
                    type="button"
                    onClick={() => setEvidenceSkill(skill.name)}
                    className="flex-1 rounded-lg bg-violet-50 px-2 py-1.5 text-[10px] font-semibold text-violet-700 transition hover:bg-violet-100"
                  >
                    View Evidence
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/student/profile')}
                    className="flex-1 rounded-lg bg-slate-50 px-2 py-1.5 text-[10px] font-semibold text-slate-600 transition hover:bg-slate-100"
                  >
                    Experiences
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Level 4 — Improvement Opportunities */}
      <section>
        <h3 className="mb-4 text-base font-semibold text-slate-950">Improvement Opportunities</h3>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {improvementSuggestions.map((item) => (
            <div key={item.title} className="rounded-2xl border border-slate-200/80 bg-white p-4 transition hover:border-violet-200 hover:shadow-md">
              <div className="flex items-center gap-2">
                <span className="text-lg">{item.icon}</span>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500">{item.type}</span>
              </div>
              <p className="mt-2 text-sm font-semibold text-slate-900">{item.title}</p>
              <p className="mt-1 text-[11px] text-slate-500">Strengthens: {item.skill}</p>
              <button
                type="button"
                onClick={() => navigate('/student/opportunities')}
                className="mt-3 w-full rounded-lg bg-violet-50 py-2 text-xs font-bold text-violet-700 transition hover:bg-violet-100"
              >
                {item.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Evidence Modal */}
      {evidenceSkill && (
        <SkillEvidenceModal
          skill={evidenceSkill}
          experiences={experiences}
          onClose={() => setEvidenceSkill(null)}
        />
      )}
    </div>
  )
}
