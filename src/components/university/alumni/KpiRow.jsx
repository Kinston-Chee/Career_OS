import React from 'react'
import { Clock, DollarSign, Star, Users } from 'lucide-react'
import { kpis } from '../../../data/alumniSignalsData'

const ICONS = { dollar: DollarSign, clock: Clock, star: Star, people: Users }

const ICON_TONES = {
  green: 'bg-green-50 text-green-600',
  blue: 'bg-blue-50 text-[#185FA5]',
  purple: 'bg-purple-50 text-purple-600',
}

const NOTE_TONES = { green: 'text-green-600', muted: 'text-gray-400' }

export default function KpiRow() {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {kpis.map((kpi) => {
        const Icon = ICONS[kpi.icon] || Users
        return (
          <div key={kpi.id} className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
            <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${ICON_TONES[kpi.tone]}`}>
              <Icon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm text-gray-500">{kpi.label}</p>
              <p className="mt-0.5 text-2xl font-bold text-gray-900">{kpi.value}</p>
              <p className={`mt-0.5 text-xs font-medium ${NOTE_TONES[kpi.noteTone]}`}>{kpi.note}</p>
            </div>
          </div>
        )
      })}
    </section>
  )
}
