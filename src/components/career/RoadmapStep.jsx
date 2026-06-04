import React, { useState } from 'react'
import RoadmapStepResourcesModal from './RoadmapStepResourcesModal'

const statusStyles = {
  Completed: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
  'In Progress': 'bg-blue-50 text-blue-700 ring-blue-100',
  'Current Step': 'bg-indigo-50 text-indigo-700 ring-indigo-100',
  Upcoming: 'bg-slate-50 text-slate-500 ring-slate-200',
}

export default function RoadmapStep({ step, index }) {
  // Each step owns its own modal state so the click-to-open behavior works the
  // same wherever RoadmapStep is rendered (Skill Summary tab and Career Path
  // tab), without changing either parent.
  const [isResourcesOpen, setIsResourcesOpen] = useState(false)

  return (
    <div className="grid grid-cols-[42px_minmax(0,1fr)] gap-4">
      <div className="relative flex justify-center">
        <div className="absolute bottom-0 top-10 w-px bg-blue-100" />
        <div className={`relative flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold ring-1 ${statusStyles[step.status]}`}>
          {index + 1}
        </div>
      </div>
      <button
        type="button"
        onClick={() => setIsResourcesOpen(true)}
        className="group block w-full rounded-2xl border border-slate-200/80 bg-white p-4 text-left shadow-[0_8px_22px_rgba(15,23,42,0.03)] transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-[0_12px_32px_rgba(15,23,42,0.08)] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h4 className="text-sm font-semibold text-slate-950 group-hover:text-blue-700">{step.title}</h4>
            <p className="mt-1 text-xs text-slate-500">{step.action}</p>
          </div>
          <span className={`rounded-lg px-3 py-1 text-xs font-semibold ring-1 ${statusStyles[step.status]}`}>{step.status}</span>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {step.tags.map((tag) => (
            <span key={tag} className="rounded-lg bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
              {tag}
            </span>
          ))}
          <span className="ml-auto inline-flex items-center gap-1 text-xs font-medium text-slate-500">
            Est. {step.time}
            <span className="ml-2 hidden text-[11px] font-semibold text-blue-600 group-hover:inline">View resources →</span>
          </span>
        </div>
      </button>

      <RoadmapStepResourcesModal
        step={step}
        isOpen={isResourcesOpen}
        onClose={() => setIsResourcesOpen(false)}
      />
    </div>
  )
}
