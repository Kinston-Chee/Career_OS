import React from 'react'

const badgeStyles = {
  purple: 'bg-violet-50 text-violet-700',
  blue: 'bg-blue-50 text-blue-700',
  indigo: 'bg-indigo-50 text-indigo-700',
  rose: 'bg-rose-50 text-rose-600',
  green: 'bg-emerald-50 text-emerald-700',
}

export default function CareerActionList({ actions }) {
  return (
    <section className="rounded-3xl border border-violet-100/80 bg-white/90 p-5 shadow-[0_18px_44px_rgba(88,63,188,0.08)]">
      <h2 className="text-base font-bold text-[#11104a]">Monthly Career Actions</h2>
      <div className="mt-4 divide-y divide-violet-50 border-t border-violet-100">
        {actions.map((action) => (
          <label key={action.title} className="flex items-center gap-4 py-4 text-sm text-[#11104a]">
            <input type="checkbox" className="h-4 w-4 rounded border-violet-200 text-violet-600 focus:ring-violet-300" />
            <span className="flex-1 font-medium">{action.title}</span>
            <span className={`rounded-xl px-3 py-1.5 text-xs font-bold ${badgeStyles[action.tone] ?? badgeStyles.purple}`}>
              {action.badge}
            </span>
          </label>
        ))}
      </div>
      <button type="button" className="mt-2 text-sm font-semibold text-violet-700">
        + Add your own action
      </button>
    </section>
  )
}

