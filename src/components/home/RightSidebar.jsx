import React, { useLayoutEffect, useRef, useState } from 'react'
import { ArrowRight, BookOpen, Briefcase, Eye, MoreHorizontal, PlayCircle, TrendingUp } from 'lucide-react'
import homeMountainCard from '../../assets/Home_mountain card.png'

const PICKUP_ICONS = { Briefcase, BookOpen, Eye, PlayCircle }

const TAG_TONES = {
  orange: 'bg-orange-50 text-orange-600',
  red: 'bg-rose-50 text-rose-600',
  blue: 'bg-blue-50 text-blue-600',
  slate: 'bg-slate-100 text-slate-600',
}

const DOT_TONES = {
  violet: 'bg-violet-500',
  orange: 'bg-orange-500',
  blue: 'bg-blue-500',
  emerald: 'bg-emerald-500',
}

const RECOMMENDATIONS = [
  { tone: 'bg-blue-500', title: 'Apply to TalentBank AI Challenge', body: '92% match, deadline in 2 days.' },
  { tone: 'bg-violet-500', title: 'Add evidence to NLP Project', body: 'Employers are responding to your NLP signal.' },
  { tone: 'bg-emerald-500', title: 'Practise Grab interview', body: 'Interview stage needs preparation.' },
]

export default function RightSidebar({ pickingUpWhereLeftOff, whileYouWereAway, skillSignal, onPickUp, onMenuAction, onSkillSignal }) {
  const [openMenuId, setOpenMenuId] = useState(null)
  const [showRecommendations, setShowRecommendations] = useState(false)
  const frontRef = useRef(null)
  const backRef = useRef(null)
  const [flipHeight, setFlipHeight] = useState(null)

  useLayoutEffect(() => {
    const measure = () => {
      const activeFace = showRecommendations ? backRef.current : frontRef.current
      if (activeFace) setFlipHeight(activeFace.scrollHeight)
    }

    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [showRecommendations, whileYouWereAway])

  return (
    <aside className="flex flex-col gap-4">
      <section className="rounded-xl border border-[#e2eaf8] bg-white p-5 shadow-[0_8px_22px_rgba(44,76,142,0.07)]">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-bold leading-tight text-[#11194a]">Picking up where you left off</h2>
          <button type="button" className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700">
            View all <ArrowRight size={12} />
          </button>
        </div>
        <div className="space-y-3">
          {pickingUpWhereLeftOff.map((item) => {
            const Icon = PICKUP_ICONS[item.icon] ?? Briefcase
            return (
              <div key={item.id} className="relative flex items-center gap-3">
                <button type="button" onClick={() => onPickUp?.(item)} className="flex min-w-0 flex-1 items-center gap-3 rounded-lg text-left hover:bg-blue-50/35">
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg border border-[#dfe8f7] bg-[#f8fbff] text-[#10194a]">
                    <Icon size={20} strokeWidth={2} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-[#19234d]">{item.title}</p>
                    <span className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium ${TAG_TONES[item.tone] ?? TAG_TONES.slate}`}>
                      {item.tag}
                    </span>
                  </span>
                </button>
                <button type="button" onClick={() => setOpenMenuId((current) => (current === item.id ? null : item.id))} className="rounded-full p-1 text-[#24386e] hover:bg-blue-50">
                  <MoreHorizontal size={16} />
                </button>
                {openMenuId === item.id && (
                  <div className="absolute right-0 top-9 z-20 w-36 overflow-hidden rounded-xl border border-[#e2eaf8] bg-white p-1 shadow-[0_14px_34px_rgba(44,76,142,0.14)]">
                    {['View details', 'Snooze', 'Mark as done'].map((action) => (
                      <button
                        key={action}
                        type="button"
                        onClick={() => {
                          setOpenMenuId(null)
                          onMenuAction?.(item, action)
                        }}
                        className="block w-full rounded-lg px-3 py-2 text-left text-xs font-semibold text-[#3a4669] hover:bg-blue-50"
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      <section className="home-away-flip-card" style={flipHeight ? { height: flipHeight } : undefined}>
        <div className={`home-away-flip-inner ${showRecommendations ? 'is-flipped' : ''}`}>
          <div className="home-away-flip-face rounded-xl border border-[#e2eaf8] bg-white shadow-[0_8px_22px_rgba(44,76,142,0.07)]">
            <div ref={frontRef} className="p-5">
              <h2 className="mb-4 text-base font-bold leading-tight text-[#11194a]">What happened while you were away</h2>
              <div className="space-y-4">
                {whileYouWereAway.map((item) => (
                  <div key={item.id} className="flex items-start gap-2.5">
                    <span className={`mt-1.5 h-3 w-3 flex-shrink-0 rounded-full ${DOT_TONES[item.tone] ?? DOT_TONES.blue}`} />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium leading-snug text-[#4d5c7d]">{item.text}</p>
                    </div>
                    <span className="whitespace-nowrap text-xs font-medium text-[#7382a1]">{item.time}</span>
                  </div>
                ))}
              </div>
              <button type="button" onClick={() => setShowRecommendations(true)} className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-700">
                See what I recommend instead <ArrowRight size={12} />
              </button>
            </div>
          </div>

          <div className="home-away-flip-face home-away-flip-back rounded-xl border border-[#e2eaf8] bg-white shadow-[0_8px_22px_rgba(44,76,142,0.07)]">
            <div ref={backRef} className="p-5">
              <h2 className="mb-4 text-base font-bold leading-tight text-[#11194a]">Recommended next actions</h2>
              <div className="space-y-3">
                {RECOMMENDATIONS.map((item) => (
                  <div key={item.title} className="flex gap-3 rounded-2xl border border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.78),rgba(239,246,255,0.48))] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_8px_22px_rgba(37,99,235,0.06)]">
                    <span className={`mt-1 h-2.5 w-2.5 flex-shrink-0 rounded-full ${item.tone}`} />
                    <span>
                      <p className="text-sm font-bold text-[#11194a]">{item.title}</p>
                      <p className="mt-1 text-xs font-semibold leading-5 text-[#637094]">{item.body}</p>
                    </span>
                  </div>
                ))}
              </div>
              <button type="button" onClick={() => setShowRecommendations(false)} className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-700">
                Back to updates <ArrowRight size={12} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <button type="button" onClick={onSkillSignal} className="relative overflow-hidden rounded-xl border border-[#e2eaf8] text-left shadow-[0_8px_22px_rgba(44,76,142,0.07)] transition hover:-translate-y-0.5">
        <img src={homeMountainCard} alt="" className="absolute inset-0 h-full w-full object-cover" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/92 via-white/80 to-white/55" />

        <div className="relative p-5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
            <TrendingUp size={16} strokeWidth={2.2} />
          </span>
          <h2 className="mt-3 text-base font-bold text-[#11194a]">{skillSignal.title}</h2>
          <p className="mt-2 text-sm font-medium leading-relaxed text-[#4d5c7d]">{skillSignal.body}</p>
          <p className="mt-5 text-xs font-medium text-[#7382a1]">{skillSignal.attribution}</p>
        </div>
      </button>
    </aside>
  )
}
