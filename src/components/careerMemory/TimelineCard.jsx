import React from 'react'
import { CheckCircle2, GraduationCap, Pencil, Trophy } from 'lucide-react'

const LOGO_TONES = {
  emerald: 'border-emerald-100 bg-emerald-100/55 text-emerald-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_10px_24px_rgba(16,185,129,0.10)]',
  rose: 'border-rose-100 bg-rose-100/55 text-rose-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_10px_24px_rgba(225,29,72,0.10)]',
  amber: 'border-amber-100 bg-amber-100/55 text-amber-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_10px_24px_rgba(217,119,6,0.10)]',
  blue: 'border-blue-100 bg-blue-100/55 text-blue-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_10px_24px_rgba(37,99,235,0.10)]',
}

const TAG_TONES = {
  default: 'border border-blue-100 bg-blue-50/75 text-blue-700',
  orange: 'border border-orange-100 bg-orange-50/75 text-orange-700',
}

const ICONS = { Trophy, GraduationCap }

export default function TimelineCard({ entry, onOpen, onEdit }) {
  const Icon = entry.icon ? ICONS[entry.icon] : null

  return (
    <div className="relative flex gap-4 pb-7">
      <span className="relative z-10 mt-3 h-2 w-2 flex-shrink-0 rounded-full bg-blue-600" />

      <span className="w-16 flex-shrink-0 whitespace-pre-line pt-1.5 text-xs font-bold text-blue-700">
        {entry.year}
      </span>

      <div
        role="button"
        tabIndex={0}
        onClick={() => onOpen?.(entry)}
        onKeyDown={(event) => {
          if (event.key !== 'Enter' && event.key !== ' ') return
          event.preventDefault()
          onOpen?.(entry)
        }}
        className="flex flex-1 items-center gap-4 rounded-[24px] border border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.78),rgba(239,246,255,0.46))] p-4 text-left shadow-[0_18px_45px_rgba(37,99,235,0.08),inset_0_1px_0_rgba(255,255,255,0.85)] ring-1 ring-blue-100/40 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200/70 hover:bg-white/85 hover:shadow-[0_24px_60px_rgba(37,99,235,0.12),inset_0_1px_0_rgba(255,255,255,0.9)] focus:outline-none focus:ring-2 focus:ring-blue-200"
      >
        <span className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border text-sm font-bold ${LOGO_TONES[entry.logoTone] ?? LOGO_TONES.blue}`}>
          {Icon ? <Icon size={20} strokeWidth={2} /> : entry.logo}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="truncate text-sm font-bold text-[#11194a]">{entry.title}</p>
            {entry.verified && (
              <span className="inline-flex flex-shrink-0 items-center gap-1 rounded-full border border-emerald-100 bg-emerald-50/80 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
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
                className={`h-2.5 w-2.5 rounded-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] ${i <= entry.signalStrength ? 'bg-blue-600' : 'bg-blue-100'}`}
              />
            ))}
          </div>
          <span
            role="button"
            tabIndex={0}
            onClick={(event) => {
              event.stopPropagation()
              onEdit?.(entry)
            }}
            onKeyDown={(event) => {
              if (event.key !== 'Enter' && event.key !== ' ') return
              event.preventDefault()
              event.stopPropagation()
              onEdit?.(entry)
            }}
            className="rounded-full p-1.5 text-[#9aa6c3] transition hover:bg-blue-50 hover:text-blue-600"
          >
            <Pencil size={14} />
          </span>
        </div>
      </div>
    </div>
  )
}
