import React from 'react'
import { CalendarDays, Target, Trophy, Users } from 'lucide-react'
import { engagementMetrics } from '../../../data/engagementsData'

const ICONS = { calendar: CalendarDays, people: Users, target: Target, trophy: Trophy }

const ICON_TONES = ['bg-blue-50 text-[#185FA5]', 'bg-green-50 text-green-600', 'bg-purple-50 text-purple-600', 'bg-orange-50 text-orange-600']

const NOTE_TONES = { orange: 'text-orange-600', green: 'text-green-600', muted: 'text-gray-400' }

export default function EngagementMetrics() {
  return (
    <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {engagementMetrics.map((metric, index) => {
        const Icon = ICONS[metric.icon] || CalendarDays
        return (
          <div key={metric.id} className="employer-glass-metric p-4">
            <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${ICON_TONES[index % ICON_TONES.length]}`}>
              <Icon className="h-4.5 w-4.5" />
            </span>
            <p className="mt-2.5 text-xs text-gray-500">{metric.label}</p>
            <p className="mt-0.5 text-2xl font-bold text-gray-900">{metric.value}</p>
            <p className={`mt-1 text-xs font-medium ${NOTE_TONES[metric.noteTone]}`}>{metric.note}</p>
          </div>
        )
      })}
    </section>
  )
}
