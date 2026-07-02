import React from 'react'
import { goalOptions } from '../../../data/engagementsData'

export default function WizardStep1Goal({ selectedGoal, onSelectGoal }) {
  return (
    <div className="mx-auto max-w-[800px] text-center">
      <h2 className="text-2xl font-bold text-gray-900">What do you want to achieve?</h2>
      <p className="mt-2 text-sm text-gray-500">I&rsquo;ll recommend the right engagement type based on your goal</p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {goalOptions.map((goal) => {
          const isSelected = selectedGoal === goal.title
          return (
            <button
              key={goal.id}
              type="button"
              onClick={() => onSelectGoal(goal.title)}
              className={`rounded-2xl border bg-white p-6 text-left transition-all duration-200 ${
                isSelected ? 'scale-[1.02] border-[#185FA5] bg-blue-50/30' : 'border-[#E2E8F0] hover:border-blue-300 hover:bg-blue-50/30'
              }`}
            >
              <span className="text-2xl">{goal.emoji}</span>
              <p className="mt-3 text-[15px] font-bold text-gray-900">{goal.title}</p>
              <p className="mt-1 text-sm text-gray-500">{goal.description}</p>
            </button>
          )
        })}
      </div>
    </div>
  )
}
