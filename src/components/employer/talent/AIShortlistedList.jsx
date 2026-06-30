import React from 'react'
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react'

const TIER_BORDER = {
  green: 'border-l-green-600',
  blue: 'border-l-blue-600',
}

const TIER_TEXT = {
  green: 'text-[#3B6D11]',
  blue: 'text-[#185FA5]',
}

const TIER_PILL = {
  green: 'bg-[#EAF3DE] text-[#3B6D11]',
  blue: 'bg-[#E6F1FB] text-[#185FA5]',
}

const AVATAR_BG = {
  green: 'bg-green-600',
  blue: 'bg-[#185FA5]',
  indigo: 'bg-indigo-600',
}

function CandidateCard({ candidate, avatarTone, status, onShortlist, onPass }) {
  const isPassed = status === 'Passed'
  const isShortlisted = status === 'Shortlisted'

  return (
    <article
      className={`employer-glass-card border-l-[3px] p-5 transition-opacity duration-200 ${TIER_BORDER[candidate.matchTier]} ${
        isPassed ? 'opacity-50' : 'opacity-100'
      }`}
    >
      <div className="flex items-start gap-3">
        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white ${AVATAR_BG[avatarTone]}`}>
          {candidate.initials}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-bold text-gray-900">{candidate.name}</p>
          <p className="text-xs text-gray-500">{candidate.university} · {candidate.year} · {candidate.course}</p>
        </div>
        <div className="shrink-0 text-right">
          <p className={`text-2xl font-bold ${TIER_TEXT[candidate.matchTier]}`}>{candidate.matchScore}%</p>
          <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${TIER_PILL[candidate.matchTier]}`}>{candidate.matchLabel}</span>
        </div>
      </div>

      <div className="mt-2.5 flex flex-wrap gap-1.5">
        {candidate.evidenceChips.map((chip) => (
          <span key={chip} className="rounded-full bg-blue-50 px-3 py-1 text-xs text-[#185FA5]">
            ✓ {chip}
          </span>
        ))}
      </div>

      <div className="mt-2 space-y-1 text-sm">
        <p className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
          <span className="text-gray-500">Risk:</span>
          <span className="text-orange-600">{candidate.risk}</span>
        </p>
        <p className="flex items-center gap-1.5">
          <ArrowRight className="h-3.5 w-3.5 shrink-0 text-[#185FA5]" />
          <span className="text-gray-500">Validate next:</span>
          <span className="text-[#185FA5]">{candidate.validateNext}</span>
        </p>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <p className="text-xs text-gray-400">{candidate.appliedDate}</p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onShortlist(candidate)}
            disabled={isShortlisted}
            className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold transition-all duration-200 ${
              isShortlisted ? 'bg-green-600 text-white' : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            {isShortlisted ? <CheckCircle2 className="h-3.5 w-3.5" /> : null}
            {isShortlisted ? 'Shortlisted' : 'Shortlist'}
          </button>
          <button
            type="button"
            onClick={() => onPass(candidate)}
            className="employer-secondary-button px-4 py-1.5 text-sm"
          >
            Pass
          </button>
        </div>
      </div>
    </article>
  )
}

export default function AIShortlistedList({ candidates, statuses, onShortlist, onPass, onViewAll }) {
  const avatarTones = ['green', 'blue', 'indigo']

  return (
    <section>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-[#185FA5]" />
          <h2 className="text-sm font-bold text-gray-900">AI Shortlisted</h2>
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-[#185FA5]">{candidates.length} candidates</span>
        </div>
        <p className="text-xs text-gray-400">Ranked by evidence strength, not just match score</p>
      </div>

      <div className="space-y-3">
        {candidates.map((candidate, index) => (
          <CandidateCard
            key={candidate.id}
            candidate={candidate}
            avatarTone={avatarTones[index] || 'blue'}
            status={statuses[candidate.id] || candidate.status}
            onShortlist={onShortlist}
            onPass={onPass}
          />
        ))}
      </div>

      <button type="button" onClick={onViewAll} className="mt-3 w-full text-center text-sm font-semibold text-[#185FA5] hover:text-[#134c87]">
        View all 8 shortlisted candidates →
      </button>
    </section>
  )
}
