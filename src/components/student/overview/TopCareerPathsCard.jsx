import React from 'react'

export default function TopCareerPathsCard({ paths }) {
  return (
    <section className="rounded-3xl border border-violet-100/80 bg-white/90 p-5 shadow-[0_18px_44px_rgba(88,63,188,0.08)]">
      <h2 className="text-base font-bold text-[#11104a]">Top Career Paths</h2>
      <p className="mt-1 text-xs font-medium text-slate-500">Based on your skills & interests</p>
      <div className="mt-4 space-y-3">
        {paths.map((path) => (
          <div key={path.title} className="flex items-center justify-between rounded-2xl bg-violet-50/60 px-4 py-3 text-sm">
            <span className="font-semibold text-[#11104a]">{path.title}</span>
            <span className="text-xs font-bold text-[#11104a]">{path.match}% match</span>
          </div>
        ))}
      </div>
      <button type="button" className="mt-4 text-sm font-semibold text-violet-700">
        Explore more career paths -&gt;
      </button>
    </section>
  )
}

