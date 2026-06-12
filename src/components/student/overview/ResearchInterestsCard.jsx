import React from 'react'
import { Plus, Search } from 'lucide-react'

export default function ResearchInterestsCard({ interests }) {
  return (
    <section className="rounded-3xl border border-violet-100/80 bg-white/90 p-5 shadow-[0_18px_44px_rgba(88,63,188,0.08)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-100 bg-violet-50 text-violet-600 shadow-sm">
            <Search size={17} strokeWidth={2} />
          </div>
          <h2 className="text-base font-bold text-[#11104a]">Research Interests</h2>
        </div>
        <button type="button" className="rounded-lg border border-violet-100 px-2.5 py-1 text-xs font-bold text-violet-700 transition-all hover:bg-violet-50">
          Edit
        </button>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {interests.map((interest) => (
          <span
            key={interest}
            className="rounded-xl bg-violet-50 px-3 py-2 text-xs font-semibold text-violet-700 ring-1 ring-violet-100 transition-all duration-200 hover:bg-violet-100 hover:shadow-sm"
          >
            {interest}
          </span>
        ))}
      </div>
      <button type="button" className="mt-4 flex h-10 w-full items-center justify-center gap-1.5 rounded-xl border border-violet-100 bg-white text-sm font-bold text-[#11104a] transition-all hover:bg-violet-50 hover:shadow-sm">
        <Plus size={15} strokeWidth={2} />
        Add Interest
      </button>
    </section>
  )
}
