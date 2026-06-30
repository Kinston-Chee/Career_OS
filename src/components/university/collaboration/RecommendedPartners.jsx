import React from 'react'
import { CheckCircle2, Loader2, Sparkles } from 'lucide-react'
import { recommendedPartners } from '../../../data/collaborationData'

const FIT_TONES = { green: 'bg-green-50 text-green-700', blue: 'bg-blue-50 text-[#185FA5]' }

function RecommendationCard({ partner, status, onStartOutreach }) {
  const isLoading = status === 'loading'
  const isSent = status === 'sent'

  return (
    <div className="rounded-xl border border-gray-100 p-3.5">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${partner.tone}`}>
            {partner.initial}
          </span>
          <p className="text-sm font-bold text-gray-900">{partner.name}</p>
        </div>
        <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold ${FIT_TONES[partner.fitTone]}`}>{partner.fitPct}% fit</span>
      </div>
      <p className="mt-2 text-xs leading-5 text-gray-500">{partner.description}</p>
      <button
        type="button"
        disabled={isLoading || isSent}
        onClick={() => onStartOutreach(partner)}
        className={`mt-3 flex w-full items-center justify-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold transition-colors ${
          isSent ? 'bg-green-50 text-green-700' : 'bg-[#185FA5] text-white hover:bg-[#134c87]'
        } ${isLoading ? 'opacity-80' : ''}`}
      >
        {isLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
        {isSent ? <CheckCircle2 className="h-3.5 w-3.5" /> : null}
        {isLoading ? 'Sending…' : isSent ? '✓ Outreach sent' : 'Start outreach →'}
      </button>
    </div>
  )
}

export default function RecommendedPartners({ outreachStatus, onStartOutreach }) {
  return (
    <section className="rounded-2xl border-l-[3px] border-l-[#185FA5] bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-[#185FA5]" />
        <h2 className="text-sm font-bold text-gray-900">Recommended New Partners</h2>
      </div>
      <p className="text-xs text-gray-400">To reduce concentration risk</p>

      <div className="mt-3 space-y-3">
        {recommendedPartners.map((partner) => (
          <RecommendationCard
            key={partner.id}
            partner={partner}
            status={outreachStatus[partner.id] || 'idle'}
            onStartOutreach={onStartOutreach}
          />
        ))}
      </div>
    </section>
  )
}
