import React from 'react'

export default function ApplicationTrackerCard({ tracker }) {
  return (
    <section className="rounded-3xl border border-violet-100/80 bg-white/90 p-5 shadow-[0_18px_44px_rgba(88,63,188,0.08)]">
      <h2 className="text-base font-bold text-[#11104a]">Application Tracker</h2>
      <div className="mt-4 divide-y divide-violet-50">
        {Object.entries(tracker).map(([label, value]) => (
          <div key={label} className="flex items-center justify-between py-3 text-sm">
            <span className="font-semibold text-[#11104a]">{label}</span>
            <span className="font-bold text-[#11104a]">{value}</span>
          </div>
        ))}
      </div>
      <button type="button" className="mt-4 text-sm font-semibold text-violet-700">
        View all applications -&gt;
      </button>
    </section>
  )
}

