import React from 'react'
import { ArrowRight, CheckCircle2, Clock, DollarSign, ShieldCheck, Users } from 'lucide-react'
import { quarterSummary } from '../../../data/analyticsData'

const ICONS = { people: Users, clock: Clock, shield: ShieldCheck, check: CheckCircle2, dollar: DollarSign }
const ICON_TONES = ['bg-blue-50 text-[#185FA5]', 'bg-blue-50 text-[#185FA5]', 'bg-purple-50 text-purple-600', 'bg-green-50 text-green-600', 'bg-amber-50 text-amber-600']
const NOTE_TONES = { green: 'text-green-600', muted: 'text-gray-400' }

export default function QuarterSummary({ onExport }) {
  return (
    <section className="employer-glass-card p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-baseline gap-2">
          <h2 className="text-sm font-bold text-gray-900">Quarter Summary</h2>
          <span className="text-xs text-gray-400">{quarterSummary.period}</span>
        </div>
        <button type="button" onClick={onExport} className="flex items-center gap-1 text-xs font-semibold text-[#185FA5] hover:text-[#134c87]">
          Export for leadership
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {quarterSummary.metrics.map((metric, index) => {
          const Icon = ICONS[metric.icon] || Users
          return (
            <div key={metric.id} className="flex items-start gap-2.5">
              <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${ICON_TONES[index % ICON_TONES.length]}`}>
                <Icon className="h-4.5 w-4.5" />
              </span>
              <div>
                <p className="text-xs text-gray-500">{metric.label}</p>
                <p className="mt-0.5 text-xl font-bold text-gray-900">{metric.value}</p>
                <p className={`mt-0.5 text-xs font-medium ${NOTE_TONES[metric.noteTone]}`}>{metric.note}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
