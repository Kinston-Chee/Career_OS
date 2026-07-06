import React, { useState } from 'react'
import { Info } from 'lucide-react'
import { sourceROI as defaultSourceROI } from '../../../data/analyticsData'

const PILL_TONES = { green: 'bg-green-50 text-green-700', gray: 'bg-gray-100 text-gray-500' }

export default function SourceROIComparison({ data = defaultSourceROI }) {
  const [hoveredId, setHoveredId] = useState(null)

  return (
    <section className="employer-glass-card p-5">
      <h2 className="text-sm font-bold text-gray-900">Source ROI comparison</h2>
      <p className="text-xs text-gray-400">Cost per qualified candidate — hover a row for details</p>

      <div className="mt-4 space-y-3">
        {data.map((row) => (
          <div
            key={row.id}
            className="relative grid grid-cols-[120px_minmax(0,1fr)_auto_auto] items-center gap-3 rounded-lg transition-all duration-200 hover:scale-[1.01] hover:bg-blue-50/40"
            onMouseEnter={() => setHoveredId(row.id)}
            onMouseLeave={() => setHoveredId((prev) => (prev === row.id ? null : prev))}
          >
            <span className="truncate text-xs font-medium text-gray-600">{row.label}</span>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-green-500 to-[#185FA5]"
                style={{ width: `${row.widthPct}%` }}
              />
            </div>
            <span className="shrink-0 text-xs font-semibold text-gray-700">{row.cost}</span>
            <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium ${PILL_TONES[row.retentionTone]}`}>{row.retention}</span>

            {hoveredId === row.id ? (
              <div className="absolute left-0 top-full z-20 mt-1 w-64 rounded-xl border border-blue-100 bg-white p-3 text-[11px] leading-5 text-gray-600 shadow-lg">
                <p className="font-semibold text-gray-800">{row.label}</p>
                <p>{row.qualifiedCount} qualified candidates sourced</p>
                <p>{row.totalSpend} total spend this quarter</p>
                <p>{row.cost} · {row.retention}</p>
              </div>
            ) : null}
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
