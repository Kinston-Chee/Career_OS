import React, { useState } from 'react'
import EventHub from '../components/opportunities/EventHub'
import JobMarket from '../components/opportunities/JobMarket'

const SECTIONS = [
  { id: 'event-hub', label: 'Event Hub', icon: '🎟' },
  { id: 'job-market', label: 'Job Market', icon: '💼' },
]

export default function OpportunitiesPage() {
  // Top-level switch between the two halves of the Opportunities page.
  // Default to Event Hub since that's the new surface being highlighted.
  const [activeSection, setActiveSection] = useState('event-hub')

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-950">Opportunities</h1>
        <p className="mt-1 text-sm text-slate-500">
          Find events, competitions, and jobs that match your goals.
        </p>
      </header>

      {/* Section switcher — Event Hub vs Job Market */}
      <div className="overflow-x-auto border-b border-slate-200">
        <div className="flex min-w-max gap-8">
          {SECTIONS.map((section) => {
            const isActive = activeSection === section.id
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => setActiveSection(section.id)}
                className={`relative flex items-center gap-2 px-1 pb-3 text-sm font-semibold transition-all duration-200 ${
                  isActive ? 'text-violet-700' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <span aria-hidden>{section.icon}</span>
                <span>{section.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-violet-600 shadow-[0_0_12px_rgba(124,58,237,0.45)]" />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Active section content */}
      {activeSection === 'event-hub' && <EventHub />}
      {activeSection === 'job-market' && <JobMarket />}
    </div>
  )
}
