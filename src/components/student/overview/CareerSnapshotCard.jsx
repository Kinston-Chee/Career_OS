import React from 'react'

const chipClass = 'rounded-full bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-700'

export default function CareerSnapshotCard({ title, children, footer, accent = 'violet' }) {
  const accentClasses = {
    violet: 'from-violet-500 to-indigo-500 text-violet-700 bg-violet-50',
    emerald: 'from-emerald-400 to-teal-400 text-emerald-700 bg-emerald-50',
    blue: 'from-blue-500 to-indigo-500 text-blue-700 bg-blue-50',
    purple: 'from-purple-500 to-violet-500 text-purple-700 bg-purple-50',
  }
  const current = accentClasses[accent] ?? accentClasses.violet

  return (
    <section className="rounded-3xl border border-violet-100/80 bg-white/90 p-5 shadow-[0_18px_44px_rgba(88,63,188,0.08)]">
      <div className="flex items-start gap-4">
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${current.split(' ').slice(0, 2).join(' ')} text-sm font-bold text-white shadow-lg`}>
          C
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-bold text-[#11104a]">{title}</h3>
          <div className="mt-4">{children}</div>
        </div>
      </div>
      {footer ? <div className="mt-5 text-sm font-semibold text-violet-700">{footer}</div> : null}
    </section>
  )
}

export function SnapshotChip({ children }) {
  return <span className={chipClass}>{children}</span>
}

