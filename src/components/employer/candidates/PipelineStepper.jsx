import React from 'react'
import { Check } from 'lucide-react'
import { PIPELINE_STAGES } from '../../../data/candidatesData'

export default function PipelineStepper({ currentStage }) {
  const currentIndex = PIPELINE_STAGES.indexOf(currentStage)

  return (
    <div className="flex items-center justify-between">
      {PIPELINE_STAGES.map((stage, index) => {
        const isDone = index < currentIndex
        const isCurrent = index === currentIndex

        return (
          <React.Fragment key={stage}>
            <div className="flex flex-col items-center gap-1.5">
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full border-2 text-xs font-semibold transition-all duration-200 ${
                  isDone
                    ? 'border-green-500 bg-green-500 text-white'
                    : isCurrent
                    ? 'border-[#185FA5] bg-white text-[#185FA5] ring-4 ring-blue-100'
                    : 'border-gray-300 bg-white text-gray-300'
                }`}
              >
                {isDone ? <Check className="h-3.5 w-3.5" /> : isCurrent ? <span className="h-2 w-2 rounded-full bg-[#185FA5]" /> : null}
              </span>
              <span className={`text-[11px] ${isCurrent ? 'font-semibold text-[#185FA5]' : isDone ? 'text-green-600' : 'text-gray-400'}`}>
                {stage}
              </span>
            </div>
            {index < PIPELINE_STAGES.length - 1 ? (
              <div className={`mb-5 h-0.5 flex-1 ${index < currentIndex ? 'bg-green-500' : 'bg-gray-200'}`} />
            ) : null}
          </React.Fragment>
        )
      })}
    </div>
  )
}
