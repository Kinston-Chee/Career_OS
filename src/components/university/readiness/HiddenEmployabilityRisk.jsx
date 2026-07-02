import React, { useState } from 'react'
import { AlertTriangle, Info } from 'lucide-react'
import { hiddenRisk } from '../../../data/studentReadinessData'

const BAR_TONES = { orange: 'bg-orange-400', red: 'bg-red-500' }

export default function HiddenEmployabilityRisk({ onViewProfile, onViewAll, expanded }) {
  const [hoveredSignal, setHoveredSignal] = useState(null)
  const visibleStudents = expanded ? hiddenRisk.students : hiddenRisk.students.slice(0, 3)

  return (
    <section className="rounded-2xl border-2 border-red-300 bg-red-50/40 p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
          <div>
            <h2 className="text-sm font-bold text-gray-900">Hidden Employability Risk</h2>
            <p className="text-xs text-gray-500">{hiddenRisk.subtitle}</p>
          </div>
        </div>
        <span className="shrink-0 rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white">{hiddenRisk.count} students</span>
      </div>

      <div className="mt-4 space-y-3">
        {hiddenRisk.signals.map((signal) => (
          <div
            key={signal.id}
            className="relative flex items-center gap-3"
            onMouseEnter={() => setHoveredSignal(signal.id)}
            onMouseLeave={() => setHoveredSignal((prev) => (prev === signal.id ? null : prev))}
          >
            <span className="w-4 shrink-0 text-xs font-semibold text-gray-400">{signal.id}.</span>
            <span className="flex w-44 shrink-0 items-center gap-1 text-xs font-medium text-gray-700">
              {signal.label}
              <Info className="h-3 w-3 shrink-0 text-gray-300" />
            </span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-white">
              <div className={`h-full rounded-full ${BAR_TONES[signal.tone]}`} style={{ width: `${signal.pct}%` }} />
            </div>
            <span className="w-10 shrink-0 text-right text-xs font-bold text-gray-700">{signal.pct}%</span>
            {signal.note ? <span className="hidden w-36 shrink-0 text-[11px] text-gray-400 lg:block">{signal.note}</span> : null}

            {hoveredSignal === signal.id ? (
              <div className="absolute left-4 top-full z-20 mt-1 w-72 rounded-xl border border-gray-200 bg-white p-3 text-[11px] leading-5 text-gray-600 shadow-lg">
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-red-600">How this is calculated</p>
                {signal.calc}
              </div>
            ) : null}
          </div>
        ))}
      </div>

      <div className="mt-4 space-y-1 border-t border-red-100 pt-3">
        {visibleStudents.map((student) => (
          <div key={student.id} className="flex flex-wrap items-center gap-2 rounded-lg px-1 py-1.5 text-xs hover:bg-white/60">
            <span className="font-medium text-gray-700">{student.label}</span>
            <span className="rounded-full bg-green-50 px-2 py-0.5 text-[11px] font-medium text-green-700">Academic: Strong</span>
            <span className="rounded-full bg-red-50 px-2 py-0.5 text-[11px] font-medium text-red-700">Employability: At Risk</span>
            <button type="button" onClick={() => onViewProfile(student)} className="ml-auto shrink-0 text-xs font-semibold text-[#185FA5] hover:underline">
              View profile →
            </button>
          </div>
        ))}
      </div>

      <button type="button" onClick={onViewAll} className="mt-3 w-full text-center text-xs font-semibold text-[#185FA5] hover:underline">
        {expanded ? 'Show fewer students ↑' : `View all ${hiddenRisk.count} students →`}
      </button>
    </section>
  )
}
