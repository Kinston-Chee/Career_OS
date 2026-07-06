import React from 'react'
import { AlertTriangle, Check, Clock3, ShieldCheck } from 'lucide-react'

const TONES = {
  green: {
    Icon: ShieldCheck,
    iconClass: 'bg-emerald-50 text-emerald-600 ring-emerald-100',
    valueClass: 'text-emerald-600',
  },
  orange: {
    Icon: Clock3,
    iconClass: 'bg-orange-50 text-orange-500 ring-orange-100',
    valueClass: 'text-orange-500',
  },
  red: {
    Icon: AlertTriangle,
    iconClass: 'bg-red-50 text-red-500 ring-red-100',
    valueClass: 'text-red-500',
  },
}

export default function AccreditationKpis({ kpis }) {
  return (
    <section className="grid grid-cols-4 gap-3">
      {kpis.map((kpi) => {
        const tone = TONES[kpi.tone] || TONES.green
        const Icon = kpi.id === 'ready' ? Check : tone.Icon

        return (
          <article
            key={kpi.id}
            className="rounded-2xl border border-white/75 bg-white/80 p-5 shadow-[0_14px_40px_rgba(24,95,165,0.08)] backdrop-blur-xl"
          >
            <div className="flex items-center gap-5">
              <span className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full ring-1 ${tone.iconClass}`}>
                <Icon className="h-8 w-8" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#43537A]">{kpi.label}</p>
                <p className={`mt-1 text-3xl font-bold leading-none ${tone.valueClass}`}>{kpi.value}</p>
                <p className="mt-2 text-sm text-[#667394]">{kpi.note}</p>
              </div>
            </div>
          </article>
        )
      })}
    </section>
  )
}
