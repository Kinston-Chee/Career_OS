import React, { useMemo, useState } from 'react'
import { BarChart3, Check, Download, FileText, GraduationCap, Rocket, Search, Sparkles, Target, TrendingUp, Zap } from 'lucide-react'

const INITIAL_SKILL_COUNT = 8

function SmallIcon({ icon: Icon }) {
  return (
    <span className="flex h-5 w-5 items-center justify-center rounded-md border border-violet-100 bg-violet-50 text-violet-600">
      <Icon size={12} strokeWidth={2} />
    </span>
  )
}

export default function CareerProfileBar({ experiences = [] }) {
  const [showAllSkills, setShowAllSkills] = useState(false)
  const [resumeState, setResumeState] = useState('idle')

  const skillFrequencies = useMemo(() => {
    const freq = {}
    experiences.forEach((exp) => {
      if (exp.extractedSkills) {
        exp.extractedSkills.forEach((skill) => {
          freq[skill.name] = (freq[skill.name] || 0) + 1
        })
      }
    })
    return Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count }))
  }, [experiences])

  const careerSnapshot = useMemo(() => {
    if (experiences.length === 0) return null

    const dates = experiences.map((e) => {
      const parts = e.date?.split(' ') ?? []
      const months = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 }
      const month = months[parts[0]] ?? 0
      const day = parseInt(parts[1], 10) || 1
      const year = parseInt(parts[2], 10) || 2025
      return new Date(year, month, day)
    }).filter((d) => !isNaN(d.getTime()))
    const earliest = dates.length ? Math.min(...dates) : Date.now()
    const latest = dates.length ? Math.max(...dates) : Date.now()
    const yearsOfExp = Math.max(1, Math.round((latest - earliest) / (365.25 * 24 * 60 * 60 * 1000) * 10) / 10)

    const orgSet = new Set(experiences.map((e) => e.organization).filter(Boolean))
    const typeCounts = {}
    experiences.forEach((e) => { typeCounts[e.type] = (typeCounts[e.type] || 0) + 1 })
    const mostCommon = Object.entries(typeCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'Project'

    const hasInternship = experiences.some((e) => e.type === 'Internship')
    const hasLeadership = experiences.some((e) => e.type === 'Leadership')
    let stage = 'Early Career'
    if (hasInternship && hasLeadership) stage = 'Building Momentum'
    if (experiences.length >= 10) stage = 'Strong Foundation'

    return {
      yearsOfExp: yearsOfExp >= 1 ? `${Math.floor(yearsOfExp)}+ years` : '< 1 year',
      organizations: orgSet.size,
      mostCommonType: mostCommon,
      stage,
    }
  }, [experiences])

  const momentum = useMemo(() => {
    const items = []
    const types = experiences.map((e) => e.type)
    const hasLeadership = types.includes('Leadership')
    const hasMultipleProjects = types.filter((t) => t === 'Project').length >= 3
    const hasCerts = types.filter((t) => t === 'Certification').length >= 2
    const hasResearch = types.includes('Research')
    const hasHackathon = types.filter((t) => t === 'Hackathon').length >= 2

    if (hasLeadership) items.push({ icon: TrendingUp, text: 'Leadership exposure increasing' })
    if (hasMultipleProjects) items.push({ icon: Rocket, text: 'Strong project-building momentum' })
    if (hasCerts) items.push({ icon: GraduationCap, text: 'Active certification pursuer' })
    if (hasResearch) items.push({ icon: Search, text: 'Research experience gained' })
    if (hasHackathon) items.push({ icon: Zap, text: 'Competition-tested problem solver' })

    return items.slice(0, 3)
  }, [experiences])

  const themes = useMemo(() => {
    const allSkills = experiences.flatMap((e) => (e.extractedSkills || []).map((s) => s.name.toLowerCase()))
    const items = []
    if (allSkills.some((s) => s.includes('data') || s.includes('analysis') || s.includes('sql'))) items.push('Data-driven decision making')
    if (allSkills.some((s) => s.includes('communication') || s.includes('stakeholder') || s.includes('teamwork'))) items.push('Cross-functional collaboration')
    if (allSkills.some((s) => s.includes('python') || s.includes('machine learning') || s.includes('nlp'))) items.push('Applied AI & ML exploration')
    if (allSkills.some((s) => s.includes('leadership') || s.includes('management'))) items.push('Emerging leadership')
    if (allSkills.some((s) => s.includes('cloud') || s.includes('aws') || s.includes('docker'))) items.push('Cloud & DevOps awareness')
    return items.slice(0, 4)
  }, [experiences])

  const visibleSkills = showAllSkills ? skillFrequencies : skillFrequencies.slice(0, INITIAL_SKILL_COUNT)
  const hasMoreSkills = skillFrequencies.length > INITIAL_SKILL_COUNT

  function handleGenerate() {
    setResumeState('generating')
    window.setTimeout(() => setResumeState('done'), 1800)
  }

  function handleDownload() {
    window.alert('Resume PDF download will be available once backend is connected.')
  }

  return (
    <section className="rounded-3xl border border-violet-100/80 bg-white/95 p-5 shadow-[0_18px_44px_rgba(88,63,188,0.06)]">
      <div className="grid gap-5 lg:grid-cols-[1fr_auto]">
        <div className="min-w-0 space-y-4">
          {careerSnapshot && (
            <div>
              <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-violet-600">
                <SmallIcon icon={BarChart3} />
                Career Snapshot
              </h3>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {[
                  { label: 'Experience', value: careerSnapshot.yearsOfExp },
                  { label: 'Organizations', value: careerSnapshot.organizations },
                  { label: 'Most Common', value: careerSnapshot.mostCommonType },
                  { label: 'Stage', value: careerSnapshot.stage },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2 rounded-xl border border-violet-50 bg-violet-50/40 px-3 py-2">
                    <span className="text-[10px] font-semibold text-[#3f3d78]">{item.label}</span>
                    <span className="text-xs font-bold text-[#11104a]">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-violet-600">
              <SmallIcon icon={Target} />
              Top Skills
            </h3>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {visibleSkills.map(({ name, count }) => (
                <span key={name} className="inline-flex items-center gap-1 rounded-lg bg-violet-50 px-2.5 py-1.5 text-xs font-semibold text-violet-700 ring-1 ring-violet-100 transition-all duration-200 hover:bg-violet-100">
                  {name}
                  <span className="rounded-md bg-violet-200/60 px-1.5 py-0.5 text-[10px] font-bold text-violet-800">{count}</span>
                </span>
              ))}
              {skillFrequencies.length === 0 && <p className="text-xs text-slate-400">No skills recorded yet.</p>}
            </div>
            {hasMoreSkills && (
              <button type="button" onClick={() => setShowAllSkills(!showAllSkills)} className="mt-2 text-xs font-semibold text-violet-700 transition-colors hover:text-violet-900">
                {showAllSkills ? 'Show Less' : `+${skillFrequencies.length - INITIAL_SKILL_COUNT} more skills`}
              </button>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {momentum.length > 0 && (
              <div>
                <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-violet-600">
                  <SmallIcon icon={Rocket} />
                  Career Momentum
                </h3>
                <div className="mt-2 space-y-1.5">
                  {momentum.map((item) => {
                    const Icon = item.icon
                    return (
                      <div key={item.text} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                        <span className="flex h-5 w-5 items-center justify-center rounded-md bg-violet-50 text-violet-600">
                          <Icon size={12} strokeWidth={2} />
                        </span>
                        <span>{item.text}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {themes.length > 0 && (
              <div>
                <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-violet-600">
                  <SmallIcon icon={Target} />
                  Career Themes
                </h3>
                <div className="mt-2 space-y-1.5">
                  {themes.map((theme) => (
                    <div key={theme} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                      <span>{theme}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-row items-start gap-3 border-t border-violet-50 pt-4 lg:flex-col lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-100 bg-violet-50 text-violet-600 shadow-sm">
              <FileText size={17} strokeWidth={2} />
            </div>
            <div>
              <h5 className="text-xs font-semibold text-[#11104a]">Resume</h5>
              <p className="text-[11px] font-medium text-slate-400">AI-powered</p>
            </div>
          </div>

          {resumeState === 'idle' && (
            <div className="flex gap-2 lg:flex-col lg:gap-2">
              <button type="button" onClick={handleGenerate} className="flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-violet-200 transition-all duration-200 hover:from-violet-700 hover:to-indigo-700">
                <Sparkles size={14} strokeWidth={2} />
                Summarise
              </button>
              <button type="button" onClick={handleDownload} className="flex items-center justify-center gap-1.5 rounded-xl border border-violet-200 bg-white px-4 py-2 text-xs font-bold text-violet-700 transition-all duration-200 hover:bg-violet-50">
                <Download size={14} strokeWidth={2} />
                PDF
              </button>
            </div>
          )}

          {resumeState === 'generating' && (
            <div className="flex items-center gap-2 py-2">
              <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-violet-500" style={{ animationDelay: '0ms' }} />
              <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-violet-400" style={{ animationDelay: '150ms' }} />
              <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-violet-300" style={{ animationDelay: '300ms' }} />
              <p className="text-[11px] font-semibold text-violet-700">Generating...</p>
            </div>
          )}

          {resumeState === 'done' && (
            <div className="flex gap-2 lg:flex-col lg:gap-2">
              <div className="flex items-center gap-1.5 rounded-lg bg-emerald-50 px-2.5 py-1.5">
                <Check size={13} strokeWidth={2} className="text-emerald-700" />
                <span className="text-[11px] font-bold text-emerald-700">Ready!</span>
              </div>
              <button type="button" onClick={handleDownload} className="flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-violet-200 transition-all duration-200 hover:from-violet-700 hover:to-indigo-700">
                <Download size={14} strokeWidth={2} />
                Download
              </button>
              <button type="button" onClick={() => setResumeState('idle')} className="rounded-xl border border-violet-200 bg-white px-3 py-2 text-xs font-bold text-violet-700 transition-all duration-200 hover:bg-violet-50">
                Redo
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
