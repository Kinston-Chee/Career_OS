import React, { useState } from 'react'
import { CheckCircle2, Clock, Info, Star, Users, BarChart3 } from 'lucide-react'
import { metricsPills } from '../../data/employerMockData'

const ICONS = { clock: Clock, star: Star, check: CheckCircle2, people: Users, chart: BarChart3 }

export default function MetricsPillRow() {
  const [openId, setOpenId] = useState(null)

  return (
    <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {metricsPills.map((pill) => {
        const Icon = ICONS[pill.icon] || Clock
        const isOpen = openId === pill.id
        return (
          <div
            key={pill.id}
            className="employer-glass-metric relative p-4"
            onMouseEnter={() => pill.calc && setOpenId(pill.id)}
            onMouseLeave={() => setOpenId((prev) => (prev === pill.id ? null : prev))}
          >
            <div className="flex items-center justify-between">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50/90 text-[#185FA5] ring-1 ring-blue-100">
                <Icon className="h-4 w-4" />
              </span>
              {pill.calc ? <Info className="h-3 w-3 text-slate-300" /> : null}
            </div>
            <p className="mt-2 text-xs text-slate-500">{pill.label}</p>
            <p className="mt-0.5 text-xl font-semibold text-slate-950">{pill.value}</p>
            <p className={`mt-1 text-[11px] font-medium ${pill.deltaTone === 'green' ? 'text-green-600' : 'text-red-500'}`}>{pill.delta}</p>

            {isOpen && pill.calc ? (
              <div className="absolute left-1/2 top-full z-20 mt-2 w-56 -translate-x-1/2 rounded-xl border border-blue-100 bg-white p-3 text-[11px] leading-5 text-gray-600 shadow-lg transition-opacity duration-200">
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-[#185FA5]">How this is calculated</p>
                {pill.calc}
              </div>
            ) : null}
          </div>
        )
      })}
    </section>
  )
}
