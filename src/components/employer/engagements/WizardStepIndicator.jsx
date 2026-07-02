import React from 'react'
import { Check } from 'lucide-react'

const STEPS = ['Your Goal', 'AI Recommendation', 'Event Details', 'Review & Publish']

export default function WizardStepIndicator({ currentStep }) {
  return (
    <div className="flex items-center justify-center gap-2">
      {STEPS.map((label, index) => {
        const stepNumber = index + 1
        const isDone = stepNumber < currentStep
        const isCurrent = stepNumber === currentStep

        return (
          <React.Fragment key={label}>
            <div className="flex flex-col items-center gap-1.5">
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold transition-all duration-200 ${
                  isDone
                    ? 'bg-green-500 text-white'
                    : isCurrent
                    ? 'bg-[#185FA5] text-white'
                    : 'border-2 border-gray-300 text-gray-400'
                }`}
              >
                {isDone ? <Check className="h-3.5 w-3.5" /> : stepNumber}
              </span>
              <span className={`text-xs ${isCurrent ? 'font-bold text-[#185FA5]' : isDone ? 'text-green-600' : 'text-gray-400'}`}>{label}</span>
            </div>
            {stepNumber < STEPS.length ? (
              <div className={`mb-5 h-0.5 w-12 ${isDone ? 'bg-[#185FA5]' : 'border-t-2 border-dashed border-gray-300'}`} />
            ) : null}
          </React.Fragment>
        )
      })}
    </div>
  )
}
