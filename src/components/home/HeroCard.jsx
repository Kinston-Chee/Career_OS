import React, { useState } from 'react'
import { Eye, Sparkles, Zap } from 'lucide-react'
import homeHeroBg from '../../assets/Home page bg 1.png'
import robotImage from '../../assets/career-os-robot.png'
import TypewriterText from '../ui/TypewriterText'

const CHIP_ICONS = [Sparkles, Eye, Zap]

export default function HeroCard({ briefing, onChipClick }) {
  const [showChips, setShowChips] = useState(false)

  return (
    <section className="relative overflow-hidden rounded-2xl border border-[#dfe8fb] bg-white shadow-[0_10px_28px_rgba(38,72,140,0.08)]">
      <img
        src={homeHeroBg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white/45 via-white/18 to-white/0" />

      <div className="relative grid min-h-[226px] grid-cols-1 items-center gap-4 px-4 py-5 sm:px-8 lg:grid-cols-[170px_minmax(0,1fr)]">
        <div className="flex justify-center lg:justify-start">
          <img
            src={robotImage}
            alt="CareerOS companion robot"
            className="h-32 w-32 object-contain drop-shadow-[0_18px_26px_rgba(79,70,229,0.22)] sm:h-44 sm:w-44"
          />
        </div>

        <div className="min-w-0">
          <div className="relative max-w-[520px] rounded-2xl border border-[#dce6f8] bg-white px-6 py-5 shadow-[0_10px_24px_rgba(45,78,145,0.12)]">
            <span className="absolute -left-4 top-1/2 hidden h-8 w-8 -translate-y-1/2 rotate-45 border-b border-l border-[#dce6f8] bg-white sm:block" />
            <p className="relative text-base font-semibold leading-relaxed text-[#10183f] sm:text-lg">
              <TypewriterText text={briefing.message} speed={18} onComplete={() => setShowChips(true)} />
            </p>
          </div>

          {showChips && (
          <div className="chat-fade-in mt-4 flex max-w-[640px] flex-wrap gap-3">
            {briefing.chips.map((chip, index) => {
              const Icon = CHIP_ICONS[index] ?? Sparkles
              return (
              <button
                key={chip}
                type="button"
                onClick={() => onChipClick?.(chip)}
                className="inline-flex items-center gap-2 rounded-full border border-[#d9e5f8] bg-white/92 px-3.5 py-2 text-xs font-semibold text-[#35507d] shadow-[0_4px_10px_rgba(46,82,154,0.08)] transition hover:-translate-y-0.5 hover:border-blue-300 hover:text-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
              >
                <Icon size={14} className="text-blue-600" strokeWidth={2.3} />
                {chip}
              </button>
              )
            })}
          </div>
          )}
        </div>
      </div>
    </section>
  )
}
