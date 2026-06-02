import React from 'react'

const matchItems = [
  ['bg-violet-600', 'High Match (80%+)'],
  ['bg-blue-500', 'Good Match (60-79%)'],
  ['bg-teal-400', 'Exploring (40-59%)'],
  ['bg-slate-300', 'Emerging Path (20-39%)'],
]

const connectionItems = [
  ['border-violet-500', 'Strong Match Path', ''],
  ['border-blue-300', 'Skill Gap Path', 'border-dashed'],
  ['border-teal-300', 'Future Unlock Path', 'border-dotted'],
]

export default function CareerGraphLegend() {
  return (
    <section className="absolute left-5 top-28 z-20 hidden w-48 rounded-2xl border border-violet-100 bg-white/90 p-4 text-xs shadow-[0_14px_34px_rgba(88,63,188,0.12)] backdrop-blur-xl md:block">
      <div className="space-y-3">
        {matchItems.map(([color, label]) => (
          <div key={label} className="flex items-center gap-3 font-semibold text-[#17124d]">
            <span className={`h-3 w-3 rounded-full ${color}`} />
            <span>{label}</span>
          </div>
        ))}
      </div>
      <div className="my-4 h-px bg-violet-100" />
      <div className="space-y-3">
        {connectionItems.map(([color, label, style]) => (
          <div key={label} className="flex items-center gap-3 font-semibold text-[#17124d]">
            <span className={`w-8 border-t-2 ${color} ${style}`} />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
