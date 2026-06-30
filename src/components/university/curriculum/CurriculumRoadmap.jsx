import React from 'react'
import { ArrowRight, CalendarDays, RefreshCcw, Star, Trophy, Layers } from 'lucide-react'
import { roadmaps } from '../../../data/curriculumAlignmentData'

const STAGE_ICONS = { 1: Star, 2: Layers, 3: Trophy, 4: RefreshCcw }

const STAGE_TONES = {
  green: { bg: 'bg-green-50', iconBg: 'bg-green-100 text-green-600', text: 'text-green-700', border: 'border-green-100' },
  blue: { bg: 'bg-blue-50', iconBg: 'bg-blue-100 text-[#185FA5]', text: 'text-[#185FA5]', border: 'border-blue-100' },
  purple: { bg: 'bg-purple-50', iconBg: 'bg-purple-100 text-purple-600', text: 'text-purple-700', border: 'border-purple-100' },
  teal: { bg: 'bg-teal-50', iconBg: 'bg-teal-100 text-teal-700', text: 'text-teal-700', border: 'border-teal-100' },
}

export default function CurriculumRoadmap({ selectedGapName, onExport }) {
  const roadmap = roadmaps[selectedGapName] || roadmaps['Cloud Computing']

  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-sm font-bold text-gray-900">Recommended Curriculum Roadmap</h2>
          <p className="text-xs text-gray-400">For: {selectedGapName} gap</p>
        </div>
      </div>

      <div className="mt-4 flex flex-col items-stretch gap-3 lg:flex-row lg:items-center">
        {roadmap.stages.map((stage, index) => {
          const Icon = STAGE_ICONS[stage.id] || Star
          const tone = STAGE_TONES[stage.tone]
          return (
            <React.Fragment key={stage.id}>
              <div className={`flex-1 rounded-xl border ${tone.border} ${tone.bg} p-4`}>
                <div className="flex items-center gap-2">
                  <span className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${tone.iconBg}`}>{stage.id}</span>
                  <Icon className={`h-4 w-4 ${tone.text}`} />
                  <p className="text-sm font-bold text-gray-900">{stage.title}</p>
                </div>
                <p className="mt-1.5 flex items-center gap-1 text-xs text-gray-400">
                  <CalendarDays className="h-3 w-3" />
                  {stage.timeframe}
                </p>
                <p className="mt-2 text-sm text-gray-700">{stage.action}</p>
                <p className={`mt-2 text-xs font-bold ${tone.text}`}>Est. coverage lift: {stage.lift}</p>
              </div>
              {index < roadmap.stages.length - 1 ? (
                <ArrowRight className="hidden h-4 w-4 shrink-0 text-gray-300 lg:block" />
              ) : null}
            </React.Fragment>
          )
        })}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-gray-50 pt-3">
        <p className="text-xs italic text-gray-500">{roadmap.closingStatement}</p>
        <button type="button" onClick={onExport} className="flex items-center gap-1.5 rounded-full bg-[#185FA5] px-5 py-2 text-sm font-semibold text-white hover:bg-[#134c87]">
          Export full roadmap
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </section>
  )
}
