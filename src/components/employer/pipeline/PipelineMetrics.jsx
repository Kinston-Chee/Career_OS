import React from 'react'
import { AlertTriangle, TrendingUp, Users } from 'lucide-react'
import { pipelineMetrics } from '../../../data/campusPipelineData'

const ICONS = { people: Users, trend: TrendingUp, warning: AlertTriangle }

const ICON_TONES = {
  muted: 'bg-blue-50 text-[#185FA5]',
  green: 'bg-purple-50 text-purple-600',
  orange: 'bg-orange-50 text-orange-600',
}

const NOTE_TONES = { muted: 'text-gray-400', green: 'text-green-600', orange: 'text-gray-400' }
const VALUE_TONES = { orange: 'text-orange-600' }

export default function PipelineMetrics() {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {pipelineMetrics.map((metric) => {
        const Icon = ICONS[metric.icon] || Users
        return (
          <div key={metric.id} className="employer-glass-metric flex items-start gap-3 p-5">
            <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${ICON_TONES[metric.noteTone]}`}>
              <Icon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm text-gray-500">{metric.label}</p>
              <p className={`mt-0.5 text-2xl font-bold ${VALUE_TONES[metric.valueTone] || 'text-gray-900'}`}>{metric.value}</p>
              <p className={`mt-0.5 text-xs font-medium ${NOTE_TONES[metric.noteTone]}`}>{metric.note}</p>
            </div>
          </div>
        )
      })}
    </section>
  )
}
