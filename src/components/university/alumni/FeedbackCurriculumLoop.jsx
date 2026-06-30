import React from 'react'
import { ArrowRight, BarChart3, Brain, CloudCog, RefreshCcw } from 'lucide-react'
import { feedbackLoop } from '../../../data/alumniSignalsData'

const ICONS = { cloud: CloudCog, chart: BarChart3, brain: Brain }

export default function FeedbackCurriculumLoop({ onViewGap }) {
  return (
    <section
      className="rounded-2xl p-5"
      style={{ backgroundColor: 'rgba(240,238,255,0.5)', border: '1px solid rgba(200,190,255,0.4)' }}
    >
      <div className="flex items-center gap-2">
        <RefreshCcw className="h-4 w-4 text-purple-600" />
        <h2 className="text-sm font-bold text-purple-700">Feedback → Curriculum Loop</h2>
      </div>

      <div className="mt-4 space-y-3">
        {feedbackLoop.rows.map((row) => {
          const Icon = ICONS[row.icon] || CloudCog
          return (
            <div key={row.id} className="flex flex-col items-stretch gap-2 lg:flex-row lg:items-center">
              <div className="flex flex-1 items-center gap-2.5 rounded-xl bg-white p-3 shadow-sm">
                <Icon className="h-4 w-4 shrink-0 text-purple-600" />
                <p className="text-sm text-gray-700">{row.stat}</p>
              </div>
              <ArrowRight className="hidden h-4 w-4 shrink-0 text-purple-300 lg:block" />
              <div className="rounded-xl bg-white px-3 py-3 text-sm font-bold text-[#185FA5] shadow-sm lg:w-56">
                Linked to: {row.linkedTo}
              </div>
              <ArrowRight className="hidden h-4 w-4 shrink-0 text-purple-300 lg:block" />
              <button
                type="button"
                onClick={() => onViewGap(row.gapId)}
                className="rounded-xl bg-white px-3 py-3 text-left text-sm font-semibold text-[#185FA5] shadow-sm hover:bg-blue-50 lg:w-64"
              >
                View in Curriculum-Market Alignment →
              </button>
            </div>
          )
        })}
      </div>

      <p className="mt-4 text-xs italic text-gray-500">{feedbackLoop.footnote}</p>
    </section>
  )
}
