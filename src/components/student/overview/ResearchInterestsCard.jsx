import React from 'react'

export default function ResearchInterestsCard({ interests }) {
  return (
    <section className="rounded-3xl border border-violet-100/80 bg-white/90 p-5 shadow-[0_18px_44px_rgba(88,63,188,0.08)]">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-[#11104a]">Research Interests</h2>
        <button type="button" className="text-xs font-bold text-violet-700">Edit</button>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {interests.map((interest) => (
          <span key={interest} className="rounded-xl bg-violet-50 px-3 py-2 text-xs font-semibold text-violet-700">
            {interest}
          </span>
        ))}
      </div>
      <button type="button" className="mt-4 h-10 w-full rounded-xl border border-violet-100 bg-white text-sm font-bold text-[#11104a]">
        + Add Interest
      </button>
    </section>
  )
}

