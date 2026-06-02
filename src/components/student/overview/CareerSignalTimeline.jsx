import React from 'react'

export default function CareerSignalTimeline({ signals }) {
  return (
    <section className="rounded-3xl border border-violet-100/80 bg-white/90 p-5 shadow-[0_18px_44px_rgba(88,63,188,0.08)]">
      <h2 className="text-base font-bold text-[#11104a]">Career Signal Timeline (Today)</h2>
      <div className="mt-5 space-y-5 border-t border-violet-100 pt-4">
        {signals.map((signal) => (
          <div key={`${signal.time}-${signal.title}`} className="relative grid grid-cols-[52px_1fr] gap-4">
            <div className="relative text-xs font-bold text-[#11104a]">
              <span className="absolute right-[-15px] top-1.5 h-3 w-3 rounded-full border-2 border-violet-500 bg-white" />
              {signal.time}
            </div>
            <div className="border-l border-violet-200 pl-5">
              <p className="text-sm font-semibold text-[#11104a]">{signal.title}</p>
              <p className="mt-1 text-xs font-medium text-slate-500">{signal.detail}</p>
            </div>
          </div>
        ))}
      </div>
      <button type="button" className="mt-5 text-sm font-semibold text-violet-700">
        View all career signals -&gt;
      </button>
    </section>
  )
}

