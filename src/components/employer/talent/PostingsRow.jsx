import React from 'react'
import { ArrowRight } from 'lucide-react'
import { postings } from '../../../data/talentDiscoveryData'

const BADGE_TONES = {
  blue: 'bg-blue-50 text-[#185FA5]',
  purple: 'bg-purple-50 text-purple-700',
  orange: 'bg-orange-50 text-orange-700',
  teal: 'bg-teal-50 text-teal-700',
}

const STAT_TONES = {
  blue: 'text-[#185FA5]',
  green: 'text-[#3B6D11]',
  orange: 'text-orange-700',
  gray: 'text-gray-500',
}

const STATUS_TONES = {
  green: { dot: 'bg-green-500', pill: 'bg-[#EAF3DE] text-[#3B6D11]' },
  orange: { dot: 'bg-orange-500', pill: 'bg-[#FAEEDA] text-[#854F0B]' },
  gray: { dot: 'bg-gray-400', pill: 'bg-gray-100 text-gray-500' },
}

function PostingCard({ posting, isSelected, onSelect }) {
  const statusTone = STATUS_TONES[posting.statusDot] || STATUS_TONES.gray

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-[280px] shrink-0 rounded-2xl p-4 text-left shadow-sm transition-all duration-200 ${
        isSelected ? 'border-2 border-[#185FA5] bg-white/82 shadow-sm shadow-blue-200/60' : 'border border-blue-100/70 bg-white/68 hover:border-blue-200 hover:bg-white/82'
      }`}
    >
      <div className="flex justify-end">
        <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${BADGE_TONES[posting.badgeTone]}`}>{posting.badge}</span>
      </div>
      <p className="mt-1 text-[15px] font-bold leading-5 text-gray-900">{posting.title}</p>
      <p className="mt-1 text-xs text-gray-500">{posting.company} · {posting.location}</p>
      <p className="text-xs text-gray-400">Posted: {posting.posted} · {posting.deadlineLabel}</p>

      <div className="my-3 border-t border-gray-100" />

      <div className="space-y-1.5 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-gray-500">{posting.stat1Value} {posting.stat1Label}</span>
          {posting.stat2Value !== undefined ? (
            <span className={`font-semibold ${STAT_TONES[posting.stat2Tone]}`}>{posting.stat2Value} {posting.stat2Label}</span>
          ) : null}
        </div>
        {posting.stat3Value ? (
          <div className="flex items-center justify-between">
            <span className="text-gray-500">{posting.stat3Label}</span>
            <span className={`font-semibold ${STAT_TONES[posting.stat3Tone]}`}>{posting.stat3Value}</span>
          </div>
        ) : null}
        {posting.stat4Value ? (
          <div className="flex items-center justify-between">
            <span className="text-gray-500">{posting.stat4Label}</span>
            <span className={`font-semibold ${STAT_TONES[posting.stat4Tone]}`}>{posting.stat4Value}</span>
          </div>
        ) : null}
      </div>

      <div className={`mt-3 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${statusTone.pill}`}>
        <span className={`h-1.5 w-1.5 rounded-full ${statusTone.dot}`} />
        {posting.statusText}
      </div>
    </button>
  )
}

export default function PostingsRow({ selectedPostingId, onSelectPosting }) {
  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-bold text-gray-900">Your active postings</h2>
        <button type="button" className="flex items-center gap-1 text-xs font-semibold text-[#185FA5] hover:text-[#134c87]">
          Manage postings
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden">
        {postings.map((posting) => (
          <PostingCard
            key={posting.id}
            posting={posting}
            isSelected={posting.id === selectedPostingId}
            onSelect={() => onSelectPosting(posting.id)}
          />
        ))}
      </div>
    </section>
  )
}
