import React from 'react'
import { Info } from 'lucide-react'
import { signalCorrelation } from '../../../data/analyticsData'

const BAR_TONES = { green: 'bg-green-500', blue: 'bg-[#185FA5]', gray: 'bg-gray-300' }
const TEXT_TONES = { green: 'text-green-600', blue: 'text-[#185FA5]', gray: 'text-gray-400' }

export default function SignalCorrelation() {
  return (
    <section className="employer-glass-card p-5">
      <h2 className="text-sm font-bold text-gray-900">Signals that predict success</h2>
      <p className="text-xs text-gray-400">Based on 90-day performance data</p>

      <div className="mt-4 space-y-3">
        {signalCorrelation.map((row) => (
          <div key={row.id} className="transition-all duration-200 hover:scale-[1.01]">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-medium text-gray-600">{row.label}</span>
              <span className={`shrink-0 text-xs font-semibold ${TEXT_TONES[row.tone]}`}>{row.value}</span>
            </div>
            <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-gray-100">
              <div className={`h-full rounded-full ${BAR_TONES[row.tone]}`} style={{ width: `${row.widthPct}%` }} />
            </div>
          </div>
        ))}
      </div>

      <p className="mt-4 flex items-start gap-1.5 text-xs italic leading-5 text-gray-400">
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        GPA and interview scores alone are weak predictors — platform signals and challenge evidence are 4x more predictive of 90-day success.
      </p>
    </section>
  )
}
