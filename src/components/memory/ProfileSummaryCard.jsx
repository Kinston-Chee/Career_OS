import React, { useMemo, useState } from 'react'
import { Download, FileText, Sparkles } from 'lucide-react'

const INITIAL_SKILL_COUNT = 5

export default function ProfileSummaryCard({ experiences = [] }) {
  const [showAllSkills, setShowAllSkills] = useState(false)
  const [resumeState, setResumeState] = useState('idle') // idle | generating | done

  // Compute skill frequency from all experiences
  const skillFrequencies = useMemo(() => {
    const freq = {}
    experiences.forEach((exp) => {
      if (exp.extractedSkills) {
        exp.extractedSkills.forEach((skill) => {
          const name = skill.name
          freq[name] = (freq[name] || 0) + 1
        })
      }
    })
    // Sort by frequency descending
    return Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count }))
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
    <section className="rounded-3xl border border-violet-100/80 bg-white/92 p-5 shadow-[0_18px_44px_rgba(88,63,188,0.08)]">
      {/* Profile Header */}
      <div className="text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 text-2xl font-bold text-white shadow-lg shadow-violet-100 ring-8 ring-violet-50">
          CL
        </div>
        <h4 className="mt-4 text-sm font-semibold text-[#11104a]">Chris Lee</h4>
        <p className="mt-1 text-xs font-medium text-slate-500">Year 3 · Bachelor of Data Science</p>
        <p className="text-xs text-slate-400">Taylor's University</p>
      </div>

      {/* Career Direction */}
      <div className="mt-5 rounded-2xl border border-violet-50 bg-violet-50/30 p-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-[#3f3d78]">Career Focus</span>
          <span className="rounded-xl bg-violet-100 px-2.5 py-1 font-bold text-violet-700">Data Scientist</span>
        </div>
        <div className="mt-2 flex items-center justify-between text-xs">
          <span className="font-semibold text-[#3f3d78]">Target Role</span>
          <span className="font-semibold text-[#11104a]">Data Analyst / Data Scientist</span>
        </div>
      </div>

      {/* Key Stats — only Total Experiences */}
      <div className="mt-5">
        <div className="flex items-center justify-between py-2.5 text-sm">
          <span className="font-medium text-slate-500">Total Experiences</span>
          <span className="font-bold text-[#11104a]">{experiences.length}</span>
        </div>
      </div>

      {/* Skills — pill/tag style with frequency counts */}
      <div className="mt-4 border-t border-violet-50 pt-5">
        <h5 className="text-xs font-semibold uppercase tracking-wide text-[#3f3d78]">Top Skills</h5>
        <div className="mt-3 flex flex-wrap gap-2">
          {visibleSkills.map(({ name, count }) => (
            <span
              key={name}
              className="inline-flex items-center gap-1 rounded-lg bg-violet-50 px-2.5 py-1.5 text-xs font-semibold text-violet-700 ring-1 ring-violet-100 transition-all duration-200 hover:bg-violet-100"
            >
              {name}
              <span className="rounded-md bg-violet-200/60 px-1.5 py-0.5 text-[10px] font-bold text-violet-800">
                {count}
              </span>
            </span>
          ))}
          {skillFrequencies.length === 0 && (
            <p className="text-xs text-slate-400">No skills recorded yet.</p>
          )}
        </div>
        {hasMoreSkills && (
          <button
            type="button"
            onClick={() => setShowAllSkills(!showAllSkills)}
            className="mt-3 text-xs font-semibold text-violet-700 transition-colors hover:text-violet-900"
          >
            {showAllSkills ? 'Show Less' : `Show More (${skillFrequencies.length - INITIAL_SKILL_COUNT} more)`}
          </button>
        )}
      </div>

      {/* ─── Summarise into Resume ─── */}
      <div className="mt-5 border-t border-violet-50 pt-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-100 bg-violet-50 text-violet-600 shadow-sm">
            <FileText size={17} strokeWidth={2.2} />
          </div>
          <div>
            <h5 className="text-xs font-semibold text-[#11104a]">Summarise into Resume</h5>
            <p className="text-[11px] font-medium text-slate-400">AI-powered resume generation</p>
          </div>
        </div>

        {/* State: Idle */}
        {resumeState === 'idle' && (
          <div className="mt-3 space-y-2">
            <button
              type="button"
              onClick={handleGenerate}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-violet-200 transition-all duration-200 hover:from-violet-700 hover:to-indigo-700"
            >
              <Sparkles size={14} strokeWidth={2.2} className="animate-pulse" />
              Generate Resume
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-violet-200 bg-white px-4 py-2 text-xs font-bold text-violet-700 transition-all duration-200 hover:bg-violet-50"
            >
              <Download size={14} strokeWidth={2.2} />
              Download PDF
            </button>
          </div>
        )}

        {/* State: Generating */}
        {resumeState === 'generating' && (
          <div className="mt-3 flex flex-col items-center py-3">
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-violet-500" style={{ animationDelay: '0ms' }} />
              <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-violet-400" style={{ animationDelay: '150ms' }} />
              <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-violet-300" style={{ animationDelay: '300ms' }} />
            </div>
            <p className="mt-2 text-[11px] font-semibold text-violet-700">Generating your resume...</p>
            <p className="mt-0.5 text-[10px] text-slate-400">Analysing {experiences.length} career memories</p>
          </div>
        )}

        {/* State: Done */}
        {resumeState === 'done' && (
          <div className="mt-3 space-y-2">
            <div className="flex items-center gap-2 rounded-xl bg-emerald-50 p-2.5">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-xs">✓</span>
              <div>
                <p className="text-[11px] font-bold text-emerald-700">Resume ready!</p>
                <p className="text-[10px] text-emerald-600">Based on your latest career memories</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleDownload}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-violet-200 transition-all duration-200 hover:from-violet-700 hover:to-indigo-700"
            >
              <Download size={14} strokeWidth={2.2} />
              Download PDF
            </button>
            <button
              type="button"
              onClick={() => setResumeState('idle')}
              className="w-full rounded-xl border border-violet-200 bg-white px-4 py-2 text-xs font-bold text-violet-700 transition-all duration-200 hover:bg-violet-50"
            >
              Regenerate
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
