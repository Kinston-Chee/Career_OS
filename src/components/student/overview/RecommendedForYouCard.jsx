import React from 'react'

export default function RecommendedForYouCard({ recommendations }) {
  return (
    <section className="rounded-3xl border border-violet-100/80 bg-white/90 p-5 shadow-[0_18px_44px_rgba(88,63,188,0.08)]">
      <h2 className="text-base font-bold text-[#11104a]">Recommended for You</h2>
      <div className="mt-4 space-y-4">
        {recommendations.map((item) => (
          <article key={item.title} className="flex gap-3">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-100 to-indigo-50 text-sm font-bold text-violet-700">
              {item.type.slice(0, 1)}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-lg bg-emerald-50 px-2 py-1 text-[11px] font-bold text-emerald-700">{item.type}</span>
                <span className="text-[11px] font-medium text-slate-400">{item.time}</span>
              </div>
              <h3 className="mt-2 text-xs font-bold leading-5 text-[#11104a]">{item.title}</h3>
              <p className="mt-1 text-xs leading-5 text-slate-500">{item.description}</p>
              <button type="button" className="mt-2 rounded-lg border border-violet-100 px-2 py-1 text-[11px] font-bold text-violet-700">
                Save
              </button>
            </div>
          </article>
        ))}
      </div>
      <button type="button" className="mt-5 text-sm font-semibold text-violet-700">
        View all recommendations -&gt;
      </button>
    </section>
  )
}

