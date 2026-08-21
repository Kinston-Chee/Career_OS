import React from 'react'
import { ArrowRight, CheckCircle2, Loader2, Sparkles } from 'lucide-react'
import { recommendedPartners } from '../../../data/collaborationData'

const FIT_TONES = { green: 'bg-green-50 text-green-700', blue: 'bg-blue-50 text-[#185FA5]' }

function RecommendationCard({ partner, status, onStartOutreach, onOpenCompany }) {
  const isLoading = status === 'loading'
  const isSent = status === 'sent'

  return (
    <div className="rounded-xl border border-gray-100 p-3.5">
      <div className="flex items-start justify-between gap-2">
        <div
          role="button"
          tabIndex={0}
          onClick={() => onOpenCompany?.(partner)}
          onKeyDown={(event) => {
            if (event.key !== 'Enter' && event.key !== ' ') return
            event.preventDefault()
            onOpenCompany?.(partner)
          }}
          aria-label={`Open the profile for ${partner.name}`}
          className="group flex cursor-pointer items-center gap-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5B6CF9]/40">
          <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${partner.tone}`}>
            {partner.initial}
          </span>
          <p className="text-sm font-bold text-gray-900 group-hover:text-[#5B6CF9]">{partner.name}</p>
          <ArrowRight className="h-3 w-3 text-gray-300 transition-transform group-hover:translate-x-0.5 group-hover:text-[#5B6CF9]" />
        </div>
        <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold ${FIT_TONES[partner.fitTone]}`}>{partner.fitPct}% fit</span>
      </div>
      <p className="mt-2 text-xs leading-5 text-gray-500">{partner.description}</p>
      <button
        type="button"
        onClick={() => onOpenCompany?.(partner)}
        className="mt-2 text-[11.5px] font-semibold text-[#5B6CF9] hover:underline"
      >
        View company profile →
      </button>
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
        {isLoading ? 'Drafting outreach…' : isSent ? '✓ Outreach sent' : 'Start outreach →'}
      </button>
    </div>
  )
}

export default function RecommendedPartners({ outreachStatus, onStartOutreach, onOpenCompany }) {
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
            onOpenCompany={onOpenCompany}
          />
        ))}
      </div>
    </section>
  )
}
