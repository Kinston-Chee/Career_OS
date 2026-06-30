import React from 'react'
import { ChevronDown } from 'lucide-react'
import { quadrantNodes } from '../../../data/curriculumAlignmentData'

const SIZE_PX = { lg: 26, md: 19, sm: 13 }

const TONE_DOT = {
  red: '#ef4444',
  orange: '#f97316',
  green: '#22c55e',
  blue: '#185FA5',
  gray: '#9ca3af',
}

const LEGEND_SWATCHES = [
  { tone: 'red', label: 'Priority Focus' },
  { tone: 'green', label: 'Leverage Strengths' },
  { tone: 'gray', label: 'Monitor & Improve' },
  { tone: 'blue', label: 'Maintain Momentum' },
]

export default function GapQuadrant({ selectedGapId, onSelectGap }) {
  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm font-bold text-gray-900">Gap Overview</h2>
        <button type="button" className="flex items-center gap-1 text-xs text-gray-400">
          BSc Data Science · All cohorts
          <ChevronDown className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="relative mt-4 ml-8 h-[380px]">
        <span className="absolute -left-7 top-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap text-[11px] text-gray-400">Market Demand</span>

        <div className="relative h-full w-full overflow-hidden rounded-xl border border-gray-100">
          <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
            <div className="relative border-b border-r border-gray-100 bg-red-50/60">
              <span className="absolute left-2 top-2 text-[10px] font-medium text-red-500">Priority Focus</span>
            </div>
            <div className="relative border-b border-gray-100 bg-green-50/60">
              <span className="absolute right-2 top-2 text-[10px] font-medium text-green-600">Leverage Strengths</span>
            </div>
            <div className="relative border-r border-gray-100 bg-gray-50">
              <span className="absolute bottom-2 left-2 text-[10px] font-medium text-gray-400">Monitor &amp; Improve</span>
            </div>
            <div className="relative bg-blue-50/60">
              <span className="absolute bottom-2 right-2 text-[10px] font-medium text-[#185FA5]">Maintain Momentum</span>
            </div>
          </div>

          {quadrantNodes.map((node) => {
            const isSelected = node.id === selectedGapId
            const px = SIZE_PX[node.size]
            return (
              <button
                key={node.id}
                type="button"
                onClick={() => onSelectGap(node.id)}
                className="group absolute -translate-x-1/2 translate-y-1/2 cursor-pointer"
                style={{ left: `${node.x}%`, bottom: `${node.y}%` }}
              >
                <span
                  className={`block rounded-full transition-all ${isSelected ? 'ring-4 ring-[#185FA5]/40' : ''}`}
                  style={{ width: px, height: px, backgroundColor: TONE_DOT[node.tone] }}
                />
                <span className="pointer-events-none absolute left-1/2 top-full mt-1 w-max -translate-x-1/2 text-center">
                  <span className="block text-[11px] font-semibold text-gray-800">{node.label}</span>
                  <span className="block text-[10px] text-gray-400">{node.sublabel}</span>
                </span>
              </button>
            )
          })}
        </div>

        <div className="mt-2 flex justify-between text-[10px] text-gray-300">
          <span>Low</span>
          <span className="text-[11px] text-gray-400">Curriculum Coverage</span>
          <span>High</span>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-gray-50 pt-3 text-[11px] text-gray-400">
        <span>Dot size = Students affected</span>
        <span>|</span>
        <span className="flex items-center gap-2">
          Color = Quadrant zone
          {LEGEND_SWATCHES.map((s) => (
            <span key={s.tone} className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: TONE_DOT[s.tone] === '#9ca3af' ? '#e5e7eb' : `${TONE_DOT[s.tone]}33` }} />
          ))}
        </span>
      </div>
    </section>
  )
}
