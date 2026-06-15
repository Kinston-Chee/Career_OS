import React, { useState } from 'react'
import { Bookmark, Briefcase, CalendarDays } from 'lucide-react'
import EventHub from '../components/opportunities/EventHub'
import JobMarket from '../components/opportunities/JobMarket'
import SavedHub from '../components/opportunities/SavedHub'

const SECTIONS = [
  { id: 'event-hub', label: 'Event Hub', icon: CalendarDays },
  { id: 'job-market', label: 'Job Market', icon: Briefcase },
  { id: 'saved', label: 'Saved', icon: Bookmark },
]

export default function OpportunitiesPage() {
  const [activeSection, setActiveSection] = useState('event-hub')

  return (
    <div className="min-h-full pb-2 text-[#11104a]">
      <div className="space-y-6">
        <header>
          <p className="text-xs font-semibold uppercase tracking-wide text-violet-700">Candidate Workspace</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight">Opportunities</h1>
          <p className="mt-2 text-sm font-medium text-slate-500">
            Find events, competitions, and jobs that match your goals.
          </p>
        </header>

        <div className="overflow-x-auto border-b border-slate-200">
          <div className="flex min-w-max gap-8">
            {SECTIONS.map((section) => {
              const isActive = activeSection === section.id
              const Icon = section.icon
              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => setActiveSection(section.id)}
                  className={`relative flex items-center gap-2 px-1 pb-3 text-sm font-semibold transition-all duration-200 ${
                    isActive ? 'text-violet-700' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <span className={`flex h-7 w-7 items-center justify-center rounded-lg border ${
                    isActive ? 'border-violet-100 bg-violet-50 text-violet-600' : 'border-slate-100 bg-white text-slate-400'
                  }`}>
                    <Icon size={15} strokeWidth={2} />
                  </span>
                  <span>{section.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-violet-600 shadow-[0_0_12px_rgba(124,58,237,0.45)]" />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {activeSection === 'event-hub' && <EventHub />}
        {activeSection === 'job-market' && <JobMarket />}
        {activeSection === 'saved' && <SavedHub />}
      </div>
    </div>
  )
}
