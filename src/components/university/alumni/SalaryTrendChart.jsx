import React, { useState } from 'react'
import { Flag } from 'lucide-react'
import { salaryTrend as defaultSalaryTrend } from '../../../data/alumniSignalsData'

const W = 600
const H = 220
const PAD_L = 56
const PAD_R = 16
const PAD_T = 50
const PAD_B = 28

export default function SalaryTrendChart({ salaryTrend = defaultSalaryTrend }) {
  const [openAnnotation, setOpenAnnotation] = useState(null)

  const valueToY = (value) => {
    const ratio = (value - salaryTrend.axisMin) / (salaryTrend.axisMax - salaryTrend.axisMin)
    return PAD_T + (1 - ratio) * (H - PAD_T - PAD_B)
  }

  const indexToX = (i) => {
    const plotW = W - PAD_L - PAD_R
    const denom = Math.max(1, salaryTrend.years.length - 1)
    return PAD_L + (i / denom) * plotW
  }

  const points = salaryTrend.values.map((v, i) => [indexToX(i), valueToY(v)])
  const linePath = points.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x},${y}`).join(' ')
  const areaPath = points.length > 1 ? `${linePath} L${points[points.length - 1][0]},${H - PAD_B} L${points[0][0]},${H - PAD_B} Z` : ''

  const axisValues = []
  for (let v = salaryTrend.axisMax; v >= salaryTrend.axisMin; v -= salaryTrend.axisStep) axisValues.push(v)

  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm font-bold text-gray-900">Starting Salary Trend</h2>
        <span className="text-xs text-gray-400">{salaryTrend.cohort}</span>
      </div>

      <div className="relative mt-2">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
          {axisValues.map((v) => (
            <g key={v}>
              <line x1={PAD_L} x2={W - PAD_R} y1={valueToY(v)} y2={valueToY(v)} stroke="#f1f5f9" strokeWidth="1" />
              <text x={PAD_L - 8} y={valueToY(v) + 3} textAnchor="end" className="fill-gray-300" fontSize="9">
                RM {v.toLocaleString()}
              </text>
            </g>
          ))}

          {areaPath ? <path d={areaPath} fill="#185FA5" fillOpacity="0.12" /> : null}
          <path d={linePath} fill="none" stroke="#185FA5" strokeWidth="2.5" />

          {points.map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="4" fill="#185FA5" />
              <text x={x} y={y - 10} textAnchor="middle" className="fill-gray-600" fontSize="10" fontWeight="600">
                RM {salaryTrend.values[i].toLocaleString()}
              </text>
              <text x={x} y={H - PAD_B + 14} textAnchor="middle" className="fill-gray-400" fontSize="10">
                {salaryTrend.years[i]}
              </text>
            </g>
          ))}

          {salaryTrend.annotations.map((ann) => {
            const i = salaryTrend.years.indexOf(ann.year)
            if (i === -1) return null
            const x = indexToX(i)
            const y = valueToY(salaryTrend.values[i])
            return (
              <g key={ann.year}>
                <line x1={x} x2={x} y1={PAD_T - 8} y2={y} stroke="#9333ea" strokeWidth="1" strokeDasharray="3,3" />
              </g>
            )
          })}
        </svg>

        <div className="absolute inset-0">
          {salaryTrend.annotations.map((ann, idx) => {
            const i = salaryTrend.years.indexOf(ann.year)
            if (i === -1) return null
            const leftPct = (indexToX(i) / W) * 100
            const isOpen = openAnnotation === ann.year
            return (
              <div key={ann.year} className="absolute -translate-x-1/2" style={{ left: `${leftPct}%`, top: idx % 2 === 0 ? '4%' : '14%', width: 130 }}>
                <button
                  type="button"
                  onClick={() => setOpenAnnotation((prev) => (prev === ann.year ? null : ann.year))}
                  className={`w-full rounded-lg border px-2 py-1 text-center shadow-sm transition-colors ${
                    isOpen ? 'border-purple-400 bg-purple-100' : 'border-purple-200 bg-purple-50 hover:bg-purple-100'
                  }`}
                >
                  <Flag className="mx-auto h-3 w-3 text-purple-600" />
                  <p className="mt-0.5 text-[10px] font-medium leading-3 text-purple-800">{ann.label}</p>
                </button>
                {isOpen ? (
                  <div className="mt-1.5 w-56 rounded-xl border border-purple-200 bg-white p-3 text-left shadow-lg">
                    <p className="text-xs leading-5 text-gray-700">{ann.detail}</p>
                    <p className="mt-1.5 text-[11px] font-semibold text-purple-700">{ann.impact}</p>
                  </div>
                ) : null}
              </div>
            )
          })}
        </div>
      </div>

      <p className="mt-2 text-xs italic text-gray-400">{salaryTrend.footnote}</p>
    </section>
  )
}
