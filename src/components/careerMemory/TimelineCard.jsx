import React from 'react'
import { CheckCircle2, GraduationCap, Pencil, Trophy } from 'lucide-react'

const LOGO_TONES = {
  emerald: 'bg-emerald-50 text-emerald-700',
  rose: 'bg-rose-50 text-rose-700',
  amber: 'bg-amber-50 text-amber-600',
  blue: 'bg-blue-50 text-blue-600',
}

const TAG_TONES = {
  default: 'bg-blue-50 text-blue-700',
  orange: 'bg-orange-50 text-orange-600',
}

const ICONS = { Trophy, GraduationCap }

export default function TimelineCard({ entry }) {
  const Icon = entry.icon ? ICONS[entry.icon] : null

  return (
    <div className="relative flex gap-4 pb-7">
      <span className="relative z-10 mt-3 h-2 w-2 flex-shrink-0 rounded-full bg-blue-600" />

      <span className="w-16 flex-shrink-0 whitespace-pre-line pt-1.5 text-xs font-bold text-blue-700">
        {entry.year}
      </span>

      <div className="flex flex-1 items-center gap-4 rounded-2xl bg-white p-4 shadow-sm">
        <span className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold ${LOGO_TONES[entry.logoTone] ?? LOGO_TONES.blue}`}>
          {Icon ? <Icon size={20} strokeWidth={2} /> : entry.logo}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="truncate text-sm font-bold text-[#11194a]">{entry.title}</p>
            {entry.verified && (
              <span className="inline-flex flex-shrink-0 items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                <CheckCircle2 size={11} strokeWidth={2.4} /> Verified
              </span>
            )}
          </div>
          <p className="mt-0.5 text-xs font-medium text-[#7382a1]">{entry.period}</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {entry.tags.map((tag) => (
              <span
                key={tag}
                className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${TAG_TONES[entry.tagTone] ?? TAG_TONES.default}`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-shrink-0 flex-col items-end gap-2">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className={`h-2.5 w-2.5 rounded-sm ${i <= entry.signalStrength ? 'bg-blue-600' : 'bg-slate-200'}`}
              />
            ))}
          </div>
          <button type="button" className="text-[#9aa6c3] hover:text-blue-600">
            <Pencil size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}
