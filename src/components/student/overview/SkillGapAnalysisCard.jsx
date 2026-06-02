import React from 'react'

export default function SkillGapAnalysisCard({ gaps }) {
  return (
    <section className="rounded-3xl border border-violet-100/80 bg-white/90 p-5 shadow-[0_18px_44px_rgba(88,63,188,0.08)]">
      <h2 className="text-base font-bold text-[#11104a]">Skill Gap Analysis</h2>
      <p className="mt-1 text-xs font-medium text-slate-500">For Data Analyst</p>
      <div className="mt-4 divide-y divide-violet-50">
        {gaps.map((gap) => (
          <div key={gap.skill} className="grid grid-cols-[1fr_auto_auto] items-center gap-3 py-3 text-sm">
            <span className="font-semibold text-[#11104a]">{gap.skill}</span>
            <span className="rounded-xl bg-rose-50 px-3 py-1 text-xs font-bold text-rose-600">{gap.status}</span>
            <span className="text-xs font-medium text-slate-500">{gap.impact}</span>
          </div>
        ))}
      </div>
      <button type="button" className="mt-4 text-sm font-semibold text-violet-700">
        View skill roadmap -&gt;
      </button>
    </section>
  )
}

