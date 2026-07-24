import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BarChart3, ChevronRight, Clock, Flag, Sparkles, Users, Zap } from 'lucide-react'
import { actionQueue } from '../../data/employerMockData'

const ICONS = { clock: Clock, zap: Zap, flag: Flag, chart: BarChart3, people: Users }

const ICON_TONES = {
  orange: 'bg-orange-50 text-orange-600',
  yellow: 'bg-yellow-50 text-yellow-600',
  red: 'bg-red-50 text-red-600',
  blue: 'bg-blue-50 text-[#185FA5]',
  green: 'bg-green-50 text-green-600',
}

const PILL_TONES = {
  green: 'bg-green-50 text-green-700',
  orange: 'bg-orange-50 text-orange-700',
  red: 'bg-red-50 text-red-700',
  blue: 'bg-blue-50 text-blue-700',
}

const SOURCE_COPY = {
  'action-1': 'Source: Candidates - shortlist activity + response cadence',
  'action-2': 'Source: Talent Discovery - candidate availability windows',
  'action-3': 'Source: Candidates - hiring-manager feedback SLA tracker',
  'action-4': 'Source: Engagement - AI & Data Challenge 2025 funnel',
  'action-5': 'Source: Campus Pipeline - past event attendee scores',
}

const LINK_COPY = {
  'action-1': 'Review shortlisted',
  'action-2': 'Open talent discovery',
  'action-3': 'View in-process',
  'action-4': 'Open engagement',
  'action-5': 'View campus pipeline',
}

export default function EmployerAIInbox() {
  const navigate = useNavigate()

  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-[#185FA5]" />
          <h2 className="text-sm font-bold text-gray-900">AI Action Inbox</h2>
          <span className="text-xs text-gray-400">Updated 8:30 AM</span>
        </div>
        <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-medium text-[#185FA5]">5 priorities this week</span>
      </div>

      <div className="mt-3 divide-y divide-gray-50">
        {actionQueue.map((item) => {
          const Icon = ICONS[item.icon] || Clock
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => navigate(item.to || '/employer/candidates')}
              className="flex w-full items-start gap-3 py-3.5 text-left transition hover:bg-gray-50/70"
            >
              <span className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${ICON_TONES[item.tone]}`}>
                <Icon className="h-4.5 w-4.5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm leading-5 text-gray-800">{item.text}</p>
                <span className="mt-1 inline-block text-xs font-semibold text-[#185FA5] hover:underline">{LINK_COPY[item.id] || 'Review'} →</span>
                <p className="mt-0.5 text-[11px] italic text-gray-400">{SOURCE_COPY[item.id]}</p>
              </div>
              <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-medium ${PILL_TONES[item.pillTone]}`}>{item.pill}</span>
              <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-gray-300" />
            </button>
          )
        })}
      </div>
    </section>
  )
}
