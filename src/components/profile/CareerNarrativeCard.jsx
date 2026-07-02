import React, { useState } from 'react'
import { ArrowRight, Bot } from 'lucide-react'
import { getRandomMountainBg } from './mountainBackgrounds'

export default function CareerNarrativeCard({ narrative, onEditNarrative }) {
  const [bg] = useState(getRandomMountainBg)

  return (
    <section className="relative overflow-hidden rounded-xl bg-white p-5 shadow-[0_8px_22px_rgba(44,76,142,0.07)]">
      <img src={bg} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/92 to-white/85" />

      <div className="relative flex items-center gap-2.5">
        <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-600">
          <Bot size={15} strokeWidth={2.2} />
        </span>
        <h2 className="text-base font-bold text-[#11194a]">Career Narrative</h2>
      </div>

      <p className="relative mt-3 text-sm leading-relaxed text-[#3a4669]">{narrative.body}</p>

      <button type="button" onClick={onEditNarrative} className="relative mt-3 inline-flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-700">
        Edit narrative <ArrowRight size={14} />
      </button>

      <p className="relative mt-3 text-xs font-medium text-[#9aa6c3]">{narrative.caption}</p>
    </section>
  )
}
