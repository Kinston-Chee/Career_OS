import React, { useEffect, useRef } from 'react'

export default function CandidateQuickPreview({ candidate, stageName, isLastStage, onMoveNext, onClose, onViewProfile }) {
  const ref = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) onClose()
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])

  const initials = candidate.name.split(' ').map((p) => p[0]).join('')

  return (
    <div
      ref={ref}
      className="absolute left-0 right-0 top-full z-30 mt-2 rounded-2xl border border-white/70 bg-white p-4 shadow-[0_18px_44px_rgba(15,23,42,0.16)]"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-slate-500 to-blue-500 text-sm font-semibold text-white">
          {initials}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-gray-900">{candidate.name}</p>
          <p className="truncate text-xs text-gray-500">{candidate.university} · {candidate.course} · {candidate.year}</p>
        </div>
      </div>

      <p className="mt-2.5 text-xs text-gray-500">
        Currently in <span className="font-semibold text-gray-700">{stageName}</span> · {candidate.daysInStage} days in this stage
      </p>

      <div className="mt-2 flex flex-wrap gap-1.5">
        {candidate.evidence.map((item) => (
          <span key={item} className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] text-[#185FA5]">{item}</span>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between gap-2">
        {!isLastStage ? (
          <button
            type="button"
            onClick={() => onMoveNext(candidate)}
            className="rounded-full bg-[#185FA5] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#134c87]"
          >
            Move to next stage →
          </button>
        ) : (
          <span className="text-xs text-gray-400">Final stage</span>
        )}
        <button type="button" onClick={() => onViewProfile(candidate)} className="text-xs font-semibold text-[#185FA5] hover:underline">View full profile →</button>
      </div>
    </div>
  )
}
