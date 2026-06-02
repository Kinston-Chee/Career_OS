import React from 'react'

export default function AICareerInsightCard({ insight }) {
  return (
    <section className="rounded-3xl border border-violet-100/80 bg-white/90 p-5 shadow-[0_18px_44px_rgba(88,63,188,0.08)]">
      <h2 className="text-base font-bold text-[#11104a]">AI Career Insight</h2>
      <p className="mt-5 rounded-2xl bg-violet-50/70 p-4 text-sm leading-6 text-[#11104a]">{insight}</p>
      <button type="button" className="mt-5 text-sm font-semibold text-violet-700">
        View full analysis -&gt;
      </button>
    </section>
  )
}

