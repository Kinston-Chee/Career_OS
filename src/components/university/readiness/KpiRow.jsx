import React from 'react'
import { AlertTriangle, GraduationCap, TrendingUp, Users } from 'lucide-react'
import { kpis } from '../../../data/studentReadinessData'

const ICONS = { trend: TrendingUp, graduation: GraduationCap, warning: AlertTriangle, people: Users }

const ICON_TONES = {
  blue: 'bg-blue-50 text-[#185FA5]',
  orange: 'bg-orange-50 text-orange-600',
  red: 'bg-red-50 text-red-600',
}

const VALUE_TONES = { blue: 'text-[#185FA5]', orange: 'text-orange-600', red: 'text-red-600' }

export default function KpiRow() {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {kpis.map((kpi) => {
        const Icon = ICONS[kpi.icon] || Users
        return (
          <div
            key={kpi.id}
            className={`rounded-2xl p-4 shadow-sm ${
              kpi.highlight ? 'border-2 border-red-400 bg-red-50/60' : 'border border-gray-100 bg-white'
            }`}
          >
            <span className={`flex h-10 w-10 items-center justify-center rounded-full ${ICON_TONES[kpi.tone]}`}>
              <Icon className="h-4.5 w-4.5" />
            </span>
            <p className="mt-2.5 text-xs text-gray-500">{kpi.label}</p>
            <p className={`mt-0.5 text-2xl font-bold ${VALUE_TONES[kpi.valueTone] || 'text-gray-900'}`}>{kpi.value}</p>
            <p className="mt-0.5 text-xs text-gray-400">{kpi.note}</p>
          </div>
        )
      })}
    </section>
  )
}
