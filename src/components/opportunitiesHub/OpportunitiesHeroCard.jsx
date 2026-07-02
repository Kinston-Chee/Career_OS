import React, { useEffect, useRef, useState } from 'react'
import { ArrowRight, Calendar, MapPin, Sparkles } from 'lucide-react'
import opportunityHeroBg from '../../assets/Opportunity head bg.png'
import robotImage from '../../assets/career-os-robot.png'
import TypewriterText from '../ui/TypewriterText'

const BADGE_TONES = {
  emerald: 'bg-emerald-100/85 text-emerald-700 ring-1 ring-emerald-200/70',
  blue: 'bg-blue-100/85 text-blue-700 ring-1 ring-blue-200/70',
}

export default function OpportunitiesHeroCard({ headline, picks, highlightOpportunityId, onWhyClick, onViewDetails }) {
  const [showRecommendations, setShowRecommendations] = useState(false)
  const highlightRef = useRef(null)
  const message = `I found ${headline.count} new opportunities.\n${headline.urgentCount} need your attention today.`

  useEffect(() => {
    if (!highlightOpportunityId) return undefined
    setShowRecommendations(true)
    const scrollTimer = window.setTimeout(() => {
      highlightRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' })
    }, 80)
    return () => window.clearTimeout(scrollTimer)
  }, [highlightOpportunityId])

  return (
    <section className="relative overflow-hidden rounded-2xl border border-[#dfe8fb] bg-white shadow-[0_10px_28px_rgba(38,72,140,0.08)]">
      <img src={opportunityHeroBg} alt="" className="absolute inset-0 h-full w-full object-cover" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-r from-white/62 via-white/22 to-white/0" />

      <div className="relative grid grid-cols-1 gap-5 px-5 py-6 sm:px-8 lg:grid-cols-[minmax(330px,0.9fr)_minmax(0,1.55fr)]">
        <div className="flex items-center gap-5">
          <img
            src={robotImage}
            alt="CareerOS companion robot"
            className="h-28 w-28 flex-shrink-0 object-contain drop-shadow-[0_18px_24px_rgba(79,70,229,0.22)] sm:h-36 sm:w-36 lg:h-40 lg:w-40"
          />
          <div>
            <p className="whitespace-pre-line text-xl font-semibold leading-tight text-[#11194a] sm:text-2xl">
              <TypewriterText text={message} speed={20} onComplete={() => setShowRecommendations(true)} />
            </p>
            {showRecommendations && (
            <button
              type="button"
              onClick={onWhyClick}
              className="chat-fade-in mt-4 inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-white/70 px-4 py-2 text-xs font-semibold text-blue-700 shadow-sm backdrop-blur-md transition hover:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100"
            >
              <Sparkles size={13} className="text-blue-600" strokeWidth={2.3} /> Why these {headline.urgentCount}?
            </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {showRecommendations && picks.map((pick, index) => {
            const isHighlighted = highlightOpportunityId === 'talentbank-ai-challenge' && pick.id === 'pick-3'
            return (
            <article
              key={pick.id}
              ref={isHighlighted ? highlightRef : null}
              className={`relative flex min-h-[172px] flex-col rounded-xl border border-white/70 bg-white/62 p-4 shadow-[0_12px_30px_rgba(39,75,143,0.12)] backdrop-blur-xl transition duration-200 hover:-translate-y-0.5 hover:bg-white/78 ${isHighlighted ? 'highlight-opportunity' : ''}`}
              style={{ animation: 'chatFadeIn 200ms ease both', animationDelay: `${index * 70}ms` }}
            >
              {isHighlighted && (
                <span className="absolute right-3 top-3 rounded-full border border-blue-200/80 bg-white/82 px-2.5 py-1 text-[11px] font-bold text-blue-700 shadow-[0_8px_20px_rgba(37,99,235,0.12)] backdrop-blur-xl">
                  Recommended from Home
                </span>
              )}
              <span className={`mb-2 w-fit rounded-full px-2.5 py-0.5 text-xs font-semibold ${BADGE_TONES[pick.matchTone] ?? BADGE_TONES.blue}`}>
                {pick.matchPercent}%
              </span>
              <p className="text-sm font-semibold leading-snug text-[#11194a]">{pick.title}</p>
              <p className="mt-0.5 text-xs font-medium text-[#7382a1]">{pick.org}</p>
              <div className="mt-2 space-y-1 text-xs font-medium text-[#667596]">
                <p className="flex items-center gap-1.5">
                  <MapPin size={11} /> {pick.location}
                </p>
                <p className="flex items-center gap-1.5">
                  <Calendar size={11} /> {pick.date}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onViewDetails?.(pick.id)}
                className="mt-auto inline-flex w-fit items-center gap-1.5 rounded-full border border-white/70 bg-white/58 px-3 py-1.5 text-xs font-bold text-blue-700 shadow-[0_8px_20px_rgba(37,99,235,0.08),inset_0_1px_0_rgba(255,255,255,0.85)] backdrop-blur-xl transition hover:border-blue-200 hover:bg-white/78 hover:text-blue-800"
              >
                View details <ArrowRight size={12} />
              </button>
            </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
