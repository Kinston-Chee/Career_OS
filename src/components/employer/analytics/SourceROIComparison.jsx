import React from 'react'
import { Info } from 'lucide-react'
import { sourceROI } from '../../../data/analyticsData'

const PILL_TONES = { green: 'bg-green-50 text-green-700', gray: 'bg-gray-100 text-gray-500' }

export default function SourceROIComparison() {
  return (
    <section className="employer-glass-card p-5">
      <h2 className="text-sm font-bold text-gray-900">Source ROI comparison</h2>
      <p className="text-xs text-gray-400">Cost per qualified candidate</p>

      <div className="mt-4 space-y-3">
        {sourceROI.map((row) => (
          <div key={row.id} className="grid grid-cols-[120px_minmax(0,1fr)_auto_auto] items-center gap-3 transition-all duration-200 hover:scale-[1.01]">
            <span className="truncate text-xs font-medium text-gray-600">{row.label}</span>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-green-500 to-[#185FA5]"
                style={{ width: `${row.widthPct}%` }}
              />
            </div>
            <span className="shrink-0 text-xs font-semibold text-gray-700">{row.cost}</span>
            <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium ${PILL_TONES[row.retentionTone]}`}>{row.retention}</span>
          </div>
        ))}
      </div>

      <p className="mt-4 flex items-center gap-1.5 text-xs italic text-gray-400">
        <Info className="h-3.5 w-3.5 shrink-0" />
        Lower cost per qualified candidate is better.
      </p>
    </section>
  )
}
