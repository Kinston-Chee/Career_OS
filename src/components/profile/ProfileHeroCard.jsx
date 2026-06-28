import React, { useState } from 'react'
import { Pencil } from 'lucide-react'
import { getRandomMountainBg } from './mountainBackgrounds'

const NOTE_TONES = {
  muted: 'text-[#9aa6c3]',
  emerald: 'text-emerald-600',
}

export default function ProfileHeroCard({ headline, stats, initials, onEditProfile }) {
  const [bg] = useState(getRandomMountainBg)

  return (
    <section className="relative overflow-hidden rounded-2xl border border-[#dfe8fb] bg-white p-6 shadow-[0_10px_28px_rgba(38,72,140,0.08)]">
      <img src={bg} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-white/96 via-white/94 to-white/88" />

      <div className="relative flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-[#185FA5] text-2xl font-bold text-white shadow-sm">
            {initials}
          </span>
          <div>
            <h1 className="text-2xl font-bold tracking-[-0.01em] text-[#11194a]">{headline.name}</h1>
            <p className="mt-1 text-sm font-medium text-[#637094]">{headline.school}</p>
            <p className="mt-0.5 text-xs font-medium text-[#9aa6c3]">{headline.tagline}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={onEditProfile}
          className="flex flex-shrink-0 items-center gap-1.5 rounded-full border border-[#dfe8f7] bg-white px-4 py-2 text-sm font-bold text-[#35507d] shadow-sm transition hover:border-blue-300 hover:bg-blue-50"
        >
          <Pencil size={14} strokeWidth={2.2} /> Edit Profile
        </button>
      </div>

      <div className="relative mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="rounded-[22px] p-4 ring-1 ring-blue-100/40 transition-all duration-300 hover:border-blue-200/70 hover:bg-white/80"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.74), rgba(239,246,255,0.42))',
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)',
              border: '1px solid rgba(255, 255, 255, 0.72)',
              boxShadow: '0 18px 45px rgba(37, 99, 235, 0.08), inset 0 1px 0 rgba(255,255,255,0.85), inset 0 -18px 34px rgba(219,234,254,0.18)',
            }}
          >
            <p className="text-xs font-semibold text-[#7382a1]">{stat.label}</p>
            <p className="mt-1 text-xl font-bold text-[#11194a]">{stat.value}</p>
            <p className={`mt-1 text-xs font-semibold ${NOTE_TONES[stat.noteTone] ?? NOTE_TONES.muted}`}>{stat.note}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
