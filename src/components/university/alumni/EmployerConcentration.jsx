import React from 'react'
import { AlertTriangle, Users } from 'lucide-react'
import { employerConcentration } from '../../../data/alumniSignalsData'

export default function EmployerConcentration({ onViewPartnerships }) {
  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2">
        <AlertTriangle className="h-4 w-4 text-orange-500" />
        <h2 className="text-sm font-bold text-gray-900">Employer Concentration</h2>
      </div>
      <p className="text-xs text-gray-400">{employerConcentration.subtitle}</p>

      <div className="mt-4 grid grid-cols-1 gap-5 lg:grid-cols-[1.3fr_1fr]">
        <div className="space-y-2.5">
          {employerConcentration.rows.map((row) => (
            <div key={row.id} className="flex items-center gap-3">
              <span className="w-32 shrink-0 truncate text-xs font-medium text-gray-600">{row.label}</span>
              <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-gray-100">
                <div className="h-full rounded-full bg-[#185FA5]" style={{ width: `${row.pct}%` }} />
              </div>
              <span className="w-9 shrink-0 text-right text-xs font-bold text-gray-700">{row.pct}%</span>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-orange-100 bg-orange-50/70 p-4">
          <Users className="h-5 w-5 text-orange-600" />
          <p className="mt-2 text-sm leading-5 text-gray-700">{employerConcentration.warning.text}</p>
          <button type="button" onClick={onViewPartnerships} className="mt-3 text-sm font-semibold text-[#185FA5] hover:underline">
            {employerConcentration.warning.linkLabel} →
          </button>
        </div>
      </div>
    </section>
  )
}
