import React from 'react'
import { CloudCog, Code2, Mic2, Plus, Trophy } from 'lucide-react'
import { eventFilterTabs, events } from '../../../data/collaborationData'

const ICONS = { trophy: Trophy, code: Code2, cloud: CloudCog, mic: Mic2 }

const ICON_TONES = {
  orange: 'bg-orange-50 text-orange-600',
  teal: 'bg-teal-50 text-teal-700',
  purple: 'bg-purple-50 text-purple-600',
}

const BADGE_TONES = {
  orange: 'bg-orange-50 text-orange-700',
  teal: 'bg-teal-50 text-teal-700',
  purple: 'bg-purple-50 text-purple-700',
}

const STATUS_DOT = { green: 'bg-green-500', gray: 'bg-gray-400' }

function EventCard({ event }) {
  const Icon = ICONS[event.icon] || Trophy
  return (
    <div className="rounded-xl border border-gray-100 p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${ICON_TONES[event.iconTone]}`}>
          <Icon className="h-4.5 w-4.5" />
        </span>
        <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${BADGE_TONES[event.badgeTone]}`}>{event.badge}</span>
      </div>
      <p className="mt-2.5 text-sm font-bold text-gray-900">{event.title}</p>
      <p className="text-xs text-gray-400">With: {event.with}</p>
      <p className="mt-2 text-xs text-gray-600">{event.stat}</p>
      <div className="mt-2 flex items-center gap-1.5 text-xs">
        <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[event.statusDot]}`} />
        <span className="text-gray-500">{event.statusText}</span>
      </div>
    </div>
  )
}

export default function ActiveEvents({ activeTab, onTabChange, onCreate }) {
  const filtered = activeTab === 'All' ? events : events.filter((e) => e.filterGroup === activeTab)

  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-sm font-bold text-gray-900">Active Events &amp; Collaborations</h2>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1 rounded-full border border-gray-200 p-1">
            {eventFilterTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => onTabChange(tab)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                  activeTab === tab ? 'bg-blue-600 text-white' : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <button type="button" onClick={onCreate} className="flex items-center gap-1.5 rounded-full bg-[#185FA5] px-4 py-2 text-sm font-semibold text-white hover:bg-[#134c87]">
            <Plus className="h-3.5 w-3.5" />
            Create New Collaboration
          </button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  )
}
