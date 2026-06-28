import React from 'react'
import { ArrowRight, Settings2 } from 'lucide-react'

const LOGO_TONES = {
  indigo: 'bg-indigo-600 text-white',
  emerald: 'bg-emerald-600 text-white',
  rose: 'bg-rose-600 text-white',
  'white-google': 'bg-white text-[#4285F4] border border-[#e2eaf8]',
}

const STATUS_TONES = {
  emerald: 'bg-emerald-50 text-emerald-700',
  blue: 'bg-blue-50 text-blue-700',
  orange: 'bg-orange-50 text-orange-700',
  violet: 'bg-violet-50 text-violet-700',
}

export default function ApplicationTrackerPanel({ applications }) {
  return (
    <section className="rounded-xl border border-[#e2eaf8] bg-white p-5 shadow-[0_8px_22px_rgba(44,76,142,0.07)]">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-semibold text-[#11194a]">Application Tracker</h2>
        <button type="button" className="rounded-lg p-1.5 text-[#9aa6c3] hover:bg-blue-50 hover:text-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-100">
          <Settings2 size={15} />
        </button>
      </div>

      <div className="space-y-3 rounded-xl border border-[#edf3fd] bg-[#fbfdff] p-3">
        {applications.map((app) => (
          <div key={app.id} className="flex items-start gap-3 rounded-lg bg-white p-2.5 shadow-sm">
            <span className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold ${LOGO_TONES[app.logoTone] ?? LOGO_TONES.indigo}`}>
              {app.logo}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-[#11194a]">{app.company}</p>
              <p className="truncate text-xs font-medium text-[#7382a1]">{app.role}</p>
              <p className="mt-0.5 text-[11px] font-medium text-[#9aa6c3]">{app.dateLabel}</p>
            </div>
            <span className={`flex-shrink-0 rounded-md px-2 py-0.5 text-[11px] font-semibold ${STATUS_TONES[app.statusTone] ?? STATUS_TONES.blue}`}>
              {app.status}
            </span>
          </div>
        ))}
      </div>

      <button type="button" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700">
        View all applications <ArrowRight size={14} />
      </button>
    </section>
  )
}
