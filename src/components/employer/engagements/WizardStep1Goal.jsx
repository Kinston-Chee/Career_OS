import React, { useState } from 'react'
import { ArrowRight, Sparkles } from 'lucide-react'
import { goalOptions } from '../../../data/engagementsData'

export default function WizardStep1Goal({ selectedGoal, onSelectGoal }) {
  const isPresetSelected = goalOptions.some((goal) => goal.title === selectedGoal)
  const [customGoal, setCustomGoal] = useState(isPresetSelected ? '' : selectedGoal || '')
  const isCustomActive = customGoal.trim().length > 0

  const submitCustomGoal = () => {
    const trimmed = customGoal.trim()
    if (!trimmed) return
    onSelectGoal(trimmed)
  }

  return (
    <div className="mx-auto max-w-[860px] text-center">
      <h2 className="text-2xl font-bold text-gray-900">What do you want to achieve?</h2>
      <p className="mt-2 text-sm text-gray-500">I&rsquo;ll recommend the right engagement type based on your goal</p>

      {/* Preset goals — compact row of 4 so the custom box gets its own space below */}
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {goalOptions.map((goal) => {
          const isSelected = selectedGoal === goal.title
          return (
            <button
              key={goal.id}
              type="button"
              onClick={() => {
                setCustomGoal('')
                onSelectGoal(goal.title)
              }}
              className={`flex flex-col items-center rounded-2xl border bg-white p-4 text-center transition-all duration-200 ${
                isSelected ? 'scale-[1.02] border-[#185FA5] bg-blue-50/30 shadow-sm' : 'border-[#E2E8F0] hover:border-blue-300 hover:bg-blue-50/30'
              }`}
            >
              <span className="text-2xl">{goal.emoji}</span>
              <p className="mt-2.5 text-sm font-bold text-gray-900">{goal.title}</p>
              <p className="mt-1 text-xs leading-snug text-gray-500">{goal.description}</p>
            </button>
          )
        })}
      </div>

      <div className="mt-5 flex items-center gap-3">
        <span className="h-px flex-1 bg-gray-200" />
        <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">or describe your own goal</span>
        <span className="h-px flex-1 bg-gray-200" />
      </div>

      {/* Custom purpose card */}
      <div
        className={`mt-5 rounded-2xl border bg-white p-5 text-left transition-all duration-200 ${
          isCustomActive ? 'border-[#185FA5] bg-blue-50/30 shadow-sm' : 'border-[#E2E8F0]'
        }`}
      >
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-[#185FA5]" />
          <p className="text-sm font-bold text-gray-900">Custom purpose</p>
        </div>
        <p className="mt-1 text-xs text-gray-500">Tell us what you&rsquo;re trying to achieve and we&rsquo;ll tailor a recommendation for it.</p>
        <textarea
          value={customGoal}
          onChange={(event) => setCustomGoal(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault()
              submitCustomGoal()
            }
          }}
          rows={3}
          placeholder="e.g. Rebuild our relationship with a specific university after last year's low turnout…"
          className="mt-3 w-full resize-none rounded-xl border border-[#E2E8F0] bg-white p-3 text-sm text-gray-800 outline-none transition focus:border-[#185FA5] focus:ring-2 focus:ring-blue-100"
        />
        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="text-xs text-gray-400">Press Enter to continue, or Shift+Enter for a new line</p>
          <button
            type="button"
            onClick={submitCustomGoal}
            disabled={!isCustomActive}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#185FA5] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#134c87] disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            Continue with this goal
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}
