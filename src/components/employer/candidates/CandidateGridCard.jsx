import React from 'react'
import { Star } from 'lucide-react'
import { useEmployerWorkspaceStore } from '../../../store/useEmployerWorkspaceStore'

const MATCH_TONE = (score) => (score >= 90 ? 'text-green-600' : score >= 75 ? 'text-[#185FA5]' : 'text-gray-500')
const STAGE_TONE = {
  Aware: 'bg-slate-100 text-slate-600',
  Engaged: 'bg-purple-50 text-purple-700',
  Shortlisted: 'bg-green-50 text-green-700',
  'In Process': 'bg-blue-50 text-[#185FA5]',
  Hired: 'bg-amber-50 text-amber-700',
}

export default function CandidateGridCard({ candidate, onSelect }) {
  const shortlisted = useEmployerWorkspaceStore((s) => s.shortlistedIds.has(candidate.id))

  return (
    <button
      type="button"
      onClick={() => onSelect(candidate)}
      className="employer-glass-card flex flex-col p-4 text-left transition-all duration-200 hover:-translate-y-0.5"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-[#185FA5]">
            {candidate.initials}
            {shortlisted ? (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-green-600 ring-2 ring-white">
                <Star className="h-2.5 w-2.5 fill-white text-white" />
              </span>
            ) : null}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-gray-900">{candidate.name}</p>
            <p className="truncate text-xs text-gray-500">{candidate.university}</p>
          </div>
        </div>
        <span className={`text-lg font-bold ${MATCH_TONE(candidate.matchScore)}`}>{candidate.matchScore}%</span>
      </div>

      <p className="mt-2 truncate text-xs text-gray-400">{candidate.course} · {candidate.year}</p>
      <p className="mt-1 truncate text-xs font-medium text-[#185FA5]">{candidate.targetRole}</p>

      <div className="mt-2 flex flex-wrap gap-1">
        {candidate.evidenceChips.slice(0, 2).map((chip) => (
          <span key={chip} className="rounded bg-blue-50/70 px-1.5 py-0.5 text-[11px] text-[#185FA5] ring-1 ring-blue-100/60">{chip}</span>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-white/70 pt-2.5">
        <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${STAGE_TONE[candidate.pipelineStage] || STAGE_TONE.Aware}`}>
          {candidate.pipelineStage}
        </span>
        <span className="text-xs font-semibold text-[#185FA5]">View →</span>
      </div>
    </button>
  )
}
