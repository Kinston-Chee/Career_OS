import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, MoreHorizontal, User } from 'lucide-react'
import { topCandidates } from '../../data/employerMockData'

const MATCH_TONES = {
  green: 'bg-green-50/90 text-green-700 ring-green-100',
  blue: 'bg-blue-50/90 text-[#185FA5] ring-blue-100',
}

function CandidateAvatar({ name }) {
  const initials = name.split(' ').map((p) => p[0]).join('')
  return (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-slate-500 to-blue-500 text-sm font-semibold text-white shadow-sm shadow-blue-200/60">
      {initials}
    </span>
  )
}

function CandidateRow({ candidate, onSelect }) {
  return (
    <div
      onClick={() => onSelect(candidate)}
      className="cursor-pointer rounded-xl border border-transparent px-2 py-3.5 transition hover:border-blue-100/80 hover:bg-white/50"
    >
      <div className="flex items-start gap-3">
        <CandidateAvatar name={candidate.name} />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-950">{candidate.name}</p>
              <p className="truncate text-xs text-slate-500">{candidate.university}</p>
              <p className="truncate text-xs text-slate-400">{candidate.role}</p>
            </div>
            <div className="shrink-0 text-right">
              <p className={`text-lg font-bold ${candidate.matchTone === 'green' ? 'text-green-600' : 'text-[#185FA5]'}`}>{candidate.match}%</p>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ring-1 ${MATCH_TONES[candidate.matchTone]}`}>{candidate.matchLabel}</span>
            </div>
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {candidate.tags.map((tag) => (
              <span key={tag} className="rounded bg-blue-50/80 px-1.5 py-0.5 text-[11px] font-medium text-[#185FA5] ring-1 ring-blue-100/60">{tag}</span>
            ))}
          </div>
          <div className="mt-2 space-y-1 text-[11px] text-slate-500">
            <p className="flex items-center gap-1.5">
              <span className="font-medium text-slate-600">Risk:</span>
              <span className={`h-1.5 w-1.5 rounded-full ${candidate.risk.level === 'high' ? 'bg-red-500' : 'bg-orange-400'}`} />
              {candidate.risk.text}
            </p>
            <p>
              <span className="font-medium text-slate-600">Validated next:</span> {candidate.validatedNext}
            </p>
          </div>
        </div>
        <button type="button" className="shrink-0 text-slate-300 hover:text-slate-500">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

export default function TopCandidatesCard() {
  const navigate = useNavigate()
  const openCandidate = (candidate) => navigate(`/employer/candidates?candidateId=${candidate.id}&from=${encodeURIComponent('Home')}`)

  return (
    <section className="employer-glass-card p-5">
      <div className="flex items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-[#185FA5]" />
            <h2 className="text-sm font-semibold text-slate-950">Top Candidates</h2>
          </div>
          <p className="mt-0.5 text-xs text-slate-500">Evidence-based matches for your open roles — click to view</p>
        </div>
        <button
          type="button"
          onClick={() => navigate('/employer/candidates')}
          className="shrink-0 whitespace-nowrap text-xs font-semibold text-[#185FA5] hover:text-[#134c87]"
        >
          View all candidates →
        </button>
      </div>

      <div className="mt-2">
        {topCandidates.map((candidate) => (
          <CandidateRow key={candidate.id} candidate={candidate} onSelect={openCandidate} />
        ))}
      </div>

      <button
        type="button"
        onClick={() => navigate('/employer/candidates')}
        className="mt-3 flex items-center gap-1 text-xs font-semibold text-[#185FA5] hover:text-[#134c87]"
      >
        View all top candidates
        <ArrowRight className="h-3 w-3" />
      </button>
    </section>
  )
}
