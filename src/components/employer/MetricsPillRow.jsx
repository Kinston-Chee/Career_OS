import React from 'react'
import { CheckCircle2, Clock, Info, Star, Users, BarChart3 } from 'lucide-react'
import { metricsPills } from '../../data/employerMockData'

const ICONS = { clock: Clock, star: Star, check: CheckCircle2, people: Users, chart: BarChart3 }

export default function MetricsPillRow() {
  return (
    <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {metricsPills.map((pill) => {
        const Icon = ICONS[pill.icon] || Clock
        return (
          <div key={pill.id} className="employer-glass-metric p-4">
            <div className="flex items-center justify-between">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50/90 text-[#185FA5] ring-1 ring-blue-100">
                <Icon className="h-4 w-4" />
              </span>
              {pill.info ? <Info className="h-3 w-3 text-slate-300" /> : null}
            </div>
            <p className="mt-2 text-xs text-slate-500">{pill.label}</p>
            <p className="mt-0.5 text-xl font-semibold text-slate-950">{pill.value}</p>
            <p className={`mt-1 text-[11px] font-medium ${pill.deltaTone === 'green' ? 'text-green-600' : 'text-red-500'}`}>{pill.delta}</p>
          </div>
        )
      })}
    </section>
  )
}
