import React from 'react'
import { ArrowRight, Bookmark, Check, MapPin } from 'lucide-react'
import internBg from '../../assets/Opportunity Intern bg.png'
import competitionBg from '../../assets/Opportunity Competition bg.png'
import jobBg from '../../assets/Opportunity Job bg.png'
import eventBg from '../../assets/Opportunity Event bg.png'

const LOGO_TONES = {
  indigo: 'bg-indigo-600 text-white',
  emerald: 'bg-emerald-600 text-white',
  rose: 'bg-rose-600 text-white',
  'white-google': 'bg-white text-[#4285F4] border border-[#e2eaf8]',
}

const CARD_TONES = {
  indigo: {
    wash: 'from-[#fbfaff] via-[#f3efff] to-[#e9e2ff]',
    chip: 'bg-indigo-50 text-indigo-700',
    match: 'bg-emerald-50 text-emerald-700',
    image: 'right-3 h-[140px] w-[200px]',
  },
  blue: {
    wash: 'from-[#fbfdff] via-[#eef6ff] to-[#ddecff]',
    chip: 'bg-blue-50 text-blue-700',
    match: 'bg-emerald-50 text-emerald-700',
    image: 'right-10 h-[140px] w-[110px]',
  },
  emerald: {
    wash: 'from-[#fbfffd] via-[#eaf9f1] to-[#d4f2e2]',
    chip: 'bg-emerald-50 text-emerald-700',
    match: 'bg-emerald-50 text-emerald-700',
    image: 'right-3 h-[140px] w-[210px]',
  },
  violet: {
    wash: 'from-[#fffbff] via-[#f9edff] to-[#efdbff]',
    chip: 'bg-violet-50 text-violet-700',
    match: 'bg-violet-50 text-violet-700',
    image: 'right-0 h-[148px] w-[210px]',
  },
}

const BG_IMAGES = {
  intern: internBg,
  competition: competitionBg,
  job: jobBg,
  event: eventBg,
}

export default function OpportunityGridCard({ opportunity, applied, saved, onViewDetails, onToggleSave }) {
  const bgImage = BG_IMAGES[opportunity.bgImageKey]
  const tone = CARD_TONES[opportunity.accentTone] ?? CARD_TONES.indigo

  return (
    <article
      className={`relative flex h-[272px] flex-col overflow-hidden rounded-2xl border border-[#dfe8f7] bg-white/95 p-7 transition duration-200 ${
        applied
          ? 'ring-2 ring-emerald-200'
          : 'hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[0_8px_14px_rgba(44,76,142,0.08)]'
      }`}
    >
      {bgImage && (
        <>
          <div className={`pointer-events-none absolute inset-0 hidden bg-gradient-to-br ${tone.wash} sm:block`} />
          <div className="pointer-events-none absolute inset-0 hidden bg-[radial-gradient(circle_at_72%_52%,rgba(255,255,255,0.78),rgba(255,255,255,0)_42%)] sm:block" />
          <img
            src={bgImage}
            alt=""
            aria-hidden="true"
            className={`pointer-events-none absolute bottom-0 hidden object-contain object-bottom opacity-95 sm:block ${tone.image}`}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/90 via-white/55 to-white/0" />
        </>
      )}

      {!applied && (
        <span className="absolute right-6 top-6 z-20 hidden rounded-lg bg-orange-50 px-3 py-2 text-right text-xs font-semibold leading-tight text-orange-600 sm:block">
          Deadline
          <br />
          {opportunity.deadline}
        </span>
      )}
      {!applied && !opportunity.eventTag && (
        <span className={`absolute right-6 top-[86px] z-20 hidden rounded-md px-3 py-1.5 text-xs font-semibold sm:block ${tone.match}`}>
          {opportunity.matchPercent}% match
        </span>
      )}

      {applied && (
        <span className="absolute right-6 top-6 z-20 rounded-full bg-emerald-600 px-2.5 py-0.5 text-[11px] font-bold text-white">
          Applied
        </span>
      )}

      <div className="relative z-10 flex h-full max-w-full flex-col sm:max-w-[58%]">
        <div className="flex items-start justify-between gap-4 sm:block">
          <div className="flex items-center gap-4">
            <span className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full text-base font-semibold ${LOGO_TONES[opportunity.logoTone] ?? LOGO_TONES.indigo}`}>
              {opportunity.logo}
            </span>
            <div>
              <p className="text-base font-semibold leading-snug text-[#11194a]">{opportunity.title}</p>
              <p className="mt-1 text-sm font-medium text-[#647598]">{opportunity.org}</p>
            </div>
          </div>

          <span className="flex-shrink-0 rounded-lg bg-orange-50 px-3 py-2 text-right text-xs font-semibold leading-tight text-orange-600 sm:hidden">
            Deadline
            <br />
            {opportunity.deadline}
          </span>
        </div>

        <div className="mt-7">
          <span className="flex items-center gap-1.5 text-sm font-medium text-[#647598]">
            <MapPin size={15} /> {opportunity.location}
          </span>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {opportunity.metaPill && (
            <span className={`rounded-md px-2.5 py-1 text-xs font-semibold ${tone.chip}`}>{opportunity.metaPill}</span>
          )}
          {opportunity.eventTag && (
            <span className="rounded-md bg-violet-50 px-2.5 py-1 text-xs font-semibold text-violet-700">{opportunity.eventTag}</span>
          )}
          {opportunity.tags.map((tag) => (
            <span key={tag} className={`rounded-md px-2.5 py-1 text-xs font-medium ${tone.chip}`}>
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex gap-3 pt-6">
          {applied ? (
            <button
              type="button"
              disabled
              className="flex h-10 w-[134px] items-center justify-center gap-1.5 rounded-lg bg-emerald-600 text-sm font-semibold text-white"
            >
              <Check size={15} strokeWidth={2.4} /> Applied
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={onViewDetails}
                className="flex h-10 w-[132px] items-center justify-center gap-2 rounded-xl border border-white/75 bg-white/62 text-sm font-bold text-blue-700 shadow-[0_10px_24px_rgba(37,99,235,0.10),inset_0_1px_0_rgba(255,255,255,0.86)] backdrop-blur-xl transition duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-white/82 hover:text-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-100"
              >
                View details <ArrowRight size={15} />
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation()
                  onToggleSave?.()
                }}
                className={`flex h-10 w-[92px] items-center justify-center gap-1.5 rounded-lg border text-sm font-semibold transition duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100 ${
                  saved
                    ? 'border-blue-200 bg-blue-50/80 text-blue-700 shadow-sm'
                    : 'border-[#dfe8f7] bg-white/80 text-[#35507d] hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                <Bookmark size={15} fill={saved ? 'currentColor' : 'none'} /> {saved ? 'Saved' : 'Save'}
              </button>
            </>
          )}
        </div>
      </div>
    </article>
  )
}
