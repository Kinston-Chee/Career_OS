import React from 'react'
import { ArrowRight } from 'lucide-react'

const LOGO_TONES = {
  rose: 'bg-rose-600 text-white',
}

const STATUS_TONES = {
  orange: 'bg-orange-50 text-orange-700',
  slate: 'bg-slate-100 text-slate-600',
}

export default function EmployersWatchingPanel({ employers }) {
  return (
    <section className="rounded-xl border border-[#e2eaf8] bg-white p-5 shadow-[0_8px_22px_rgba(44,76,142,0.07)]">
      <h2 className="mb-4 text-base font-bold text-[#11194a]">Employers Watching You</h2>

      <div className="space-y-4">
        {employers.map((emp) => (
          <div key={emp.id} className="flex items-center gap-3">
            <span className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold ${LOGO_TONES[emp.logoTone] ?? LOGO_TONES.rose}`}>
              {emp.logo}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-[#11194a]">{emp.name}</p>
              <p className="truncate text-xs font-medium text-[#7382a1]">{emp.focus}</p>
            </div>
            <span className={`flex-shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold ${STATUS_TONES[emp.statusTone] ?? STATUS_TONES.slate}`}>
              {emp.status}
            </span>
          </div>
        ))}
      </div>

      <button type="button" className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-700">
        View all employer activity <ArrowRight size={14} />
      </button>
    </section>
  )
}
