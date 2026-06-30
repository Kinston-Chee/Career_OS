import React from 'react'
import { ShieldCheck } from 'lucide-react'
import { retentionRiskForecast } from '../../../data/analyticsData'

const RISK_TONES = { green: 'bg-green-50 text-green-700', orange: 'bg-orange-50 text-orange-700' }
const DOT_TONES = { green: 'bg-green-500', orange: 'bg-orange-500' }

export default function RetentionRiskForecast() {
  return (
    <section className="employer-glass-card p-5">
      <div className="flex items-center gap-2">
        <ShieldCheck className="h-4 w-4 text-[#185FA5]" />
        <h2 className="text-sm font-bold text-gray-900">Retention Risk Forecast</h2>
      </div>
      <p className="text-xs text-gray-400">Current pipeline candidates at risk of early departure if hired</p>

      <div className="mt-3">
        {retentionRiskForecast.map((candidate) => (
          <div key={candidate.id} className="flex flex-wrap items-center gap-4 rounded-xl border border-transparent px-2 py-3 hover:border-blue-100/80 hover:bg-white/50">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-slate-500 to-blue-500 text-xs font-semibold text-white">
              {candidate.initials}
            </span>
            <p className="w-36 shrink-0 text-sm font-bold text-gray-900">{candidate.name}</p>
            <p className="w-24 shrink-0 text-xs text-gray-500">{candidate.roleFit}</p>
            <span className={`flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${RISK_TONES[candidate.riskTone]}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${DOT_TONES[candidate.riskTone]}`} />
              {candidate.risk} risk
            </span>
            <p className="min-w-0 flex-1 text-xs italic text-gray-500">{candidate.conditions}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
