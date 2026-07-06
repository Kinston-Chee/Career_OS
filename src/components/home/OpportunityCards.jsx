import React from 'react'
import homeOpportunity1 from '../../assets/Home_eo_1.png'
import homeOpportunity2 from '../../assets/Home_eo_2.png'
import homeOpportunity3 from '../../assets/Home_eo_3.png'
import homeOpportunity4 from '../../assets/Home_eo_4.png'

const OPPORTUNITY_IMAGES = {
  'home-1': homeOpportunity1,
  'home-2': homeOpportunity2,
  'home-3': homeOpportunity3,
  'home-4': homeOpportunity4,
}

export default function OpportunityCards({ opportunities, onSelect }) {
  return (
    <section>
      <h2 className="mb-3 text-base font-bold text-[#11194a]">Explore opportunities</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {opportunities.map((opp) => (
          <button
            key={opp.id}
            type="button"
            onClick={() => onSelect?.(opp)}
            className="group relative aspect-[16/10] overflow-hidden rounded-xl bg-slate-900 p-4 text-left text-white shadow-[0_8px_20px_rgba(35,63,124,0.12)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(35,63,124,0.16)] focus:outline-none focus:ring-4 focus:ring-blue-100"
          >
            <img
              src={OPPORTUNITY_IMAGES[opp.image]}
              alt=""
              className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-105"
              aria-hidden="true"
            />
            <div className={`absolute inset-0 bg-gradient-to-br ${opp.overlay}`} />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/48 to-transparent" />
            <div className="relative flex h-full flex-col justify-between">
              <div className="mt-auto">
                <p className="text-base font-bold leading-tight drop-shadow-sm">{opp.company} {opp.role}</p>
                <p className="mt-1 text-xs font-medium text-white/85">{opp.company}</p>
              </div>
              <span className="mt-3 inline-flex w-fit items-center rounded-full bg-blue-600 px-2.5 py-1 text-xs font-bold text-white shadow-[0_4px_10px_rgba(37,99,235,0.25)]">
                {opp.matchPercent}% match
              </span>
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}
