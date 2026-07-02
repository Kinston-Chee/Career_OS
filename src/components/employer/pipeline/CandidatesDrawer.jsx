import React from 'react'
import { X } from 'lucide-react'
import { suggestionCandidates } from '../../../data/campusPipelineData'

function WorkshopRow({ candidate, onAction }) {
  return (
    <div className="rounded-xl border border-white/70 bg-white/60 p-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]">
      <p className="text-sm font-bold text-[#11194a]">{candidate.name}</p>
      <p className="text-xs text-[#637094]">{candidate.university}</p>
      <p className="mt-1.5 text-xs text-[#3a4669]">Graduates: {candidate.graduates}</p>
      <p className="text-xs text-[#3a4669]">Attended: {candidate.attended}</p>
      <div className="mt-2 flex items-center justify-between">
        <button type="button" onClick={() => onAction(candidate)} className="rounded-full bg-[#185FA5] px-3 py-1 text-xs font-semibold text-white hover:bg-[#134c87]">
          Add to shortlist
        </button>
        <button type="button" className="text-xs font-semibold text-[#185FA5] hover:underline">View profile →</button>
      </div>
    </div>
  )
}

function FutureIntakeRow({ candidate, onAction }) {
  return (
    <div className="rounded-xl border border-white/70 bg-white/60 p-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-bold text-[#11194a]">{candidate.name}</p>
          <p className="text-xs text-[#637094]">{candidate.university}</p>
        </div>
        <span className="shrink-0 rounded-full bg-purple-50 px-2 py-0.5 text-xs font-semibold text-purple-700">{candidate.match}% match</span>
      </div>
      <div className="mt-1.5 flex flex-wrap gap-1.5">
        {candidate.skills.map((skill) => (
          <span key={skill} className="rounded-full bg-blue-50 px-2 py-0.5 text-[11px] text-[#185FA5]">{skill}</span>
        ))}
      </div>
      <div className="mt-2 flex items-center justify-between">
        <button type="button" onClick={() => onAction(candidate)} className="rounded-full bg-[#185FA5] px-3 py-1 text-xs font-semibold text-white hover:bg-[#134c87]">
          Move to Warm
        </button>
        <button type="button" className="text-xs font-semibold text-[#185FA5] hover:underline">View profile →</button>
      </div>
    </div>
  )
}

function AtRiskRow({ candidate, onAction }) {
  return (
    <div className="rounded-xl border border-white/70 bg-white/60 p-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-bold text-[#11194a]">{candidate.name}</p>
          <p className="text-xs text-[#637094]">{candidate.university}</p>
        </div>
        <span className="shrink-0 rounded-full bg-orange-50 px-2 py-0.5 text-xs font-semibold text-orange-700">
          Last contact: {candidate.lastContactDays}d ago
        </span>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <button type="button" onClick={() => onAction(candidate)} className="rounded-full bg-[#185FA5] px-3 py-1 text-xs font-semibold text-white hover:bg-[#134c87]">
          Send check-in
        </button>
        <button type="button" className="text-xs font-semibold text-[#185FA5] hover:underline">View profile →</button>
      </div>
    </div>
  )
}

const ROW_COMPONENTS = { workshop: WorkshopRow, 'future-intake': FutureIntakeRow, 'at-risk': AtRiskRow }

export default function CandidatesDrawer({ suggestion, onClose, onRowAction }) {
  if (!suggestion) return null

  const RowComponent = ROW_COMPONENTS[suggestion.drawerType] || WorkshopRow
  const candidates = suggestion.candidateIds.map((id) => suggestionCandidates[id]).filter(Boolean)

  return (
    <div className="fixed inset-0 z-40 bg-slate-900/10 backdrop-blur-sm" onClick={onClose}>
      <aside
        className="ml-auto flex h-full w-full max-w-md flex-col border-l border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.88),rgba(239,246,255,0.68))] p-6 shadow-[-24px_0_70px_rgba(15,23,42,0.12),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-2xl ring-1 ring-blue-100/50"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-lg font-bold text-[#11194a]">Candidates from this suggestion</h2>
          <button type="button" onClick={onClose} className="rounded-full p-1 text-[#7382a1] transition hover:bg-blue-50 hover:text-blue-700">
            <X size={18} />
          </button>
        </div>

        <div className="mt-5 flex-1 space-y-3 overflow-y-auto">
          {candidates.map((candidate) => (
            <RowComponent key={candidate.id} candidate={candidate} onAction={onRowAction} />
          ))}
        </div>
      </aside>
    </div>
  )
}
