import React from 'react'
import { Plus } from 'lucide-react'
import TimelineCard from './TimelineCard'
import DraftTimelineCard from './DraftTimelineCard'

export default function MemoryTimeline({ timeline, draftEntry, draftPhase, onSignalBoost }) {
  return (
    <div>
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-[-0.01em] text-[#11194a] sm:text-3xl">Career Memory</h1>
          <p className="mt-1 text-sm font-medium text-[#637094]">Your career story, built over time.</p>
        </div>
        <button
          type="button"
          className="flex flex-shrink-0 items-center gap-1.5 rounded-full bg-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700"
        >
          <Plus size={16} strokeWidth={2.4} /> Add Experience
        </button>
      </div>

      <div className="relative">
        <span className="absolute bottom-3 left-[3px] top-3 w-px bg-[#dde6f7]" />

        {draftPhase && draftPhase !== 'hidden' && (
          <DraftTimelineCard entry={draftEntry} phase={draftPhase} onSignalBoost={onSignalBoost} />
        )}
        {timeline.map((entry) => (
          <TimelineCard key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  )
}
