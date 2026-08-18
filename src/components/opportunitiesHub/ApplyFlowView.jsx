import React, { useEffect, useMemo, useState } from 'react'
import { Check } from 'lucide-react'
import { buildApplyBlueprint } from '../../data/applyFormBlueprints'

function StepDots({ applyStep }) {
  const steps = [
    { n: 1, label: 'Info' },
    { n: 2, label: 'Review' },
    { n: 3, label: 'Confirm' },
  ]
  return (
    <div className="flex items-center justify-center gap-3 border-b border-[#e2eaf8]/70 px-5 py-4">
      {steps.map((step, index) => (
        <React.Fragment key={step.n}>
          <div className="flex items-center gap-1.5">
            <span
              className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold transition-colors duration-150 ${
                applyStep === step.n
                  ? 'bg-blue-600 text-white'
                  : applyStep > step.n
                    ? 'bg-blue-100 text-blue-600'
                    : 'border border-[#cbd5e1] text-[#9aa6c3]'
              }`}
            >
              {step.n}
            </span>
            <span className={`text-xs font-semibold ${applyStep === step.n ? 'text-blue-700' : 'text-[#9aa6c3]'}`}>{step.label}</span>
          </div>
          {index < steps.length - 1 && <span className="h-px w-4 bg-[#dfe8f7]" />}
        </React.Fragment>
      ))}
    </div>
  )
}

function RobotBubble({ children, delay = 0 }) {
  const [shown, setShown] = useState(delay === 0)
  useEffect(() => {
    if (delay === 0) return undefined
    const timer = setTimeout(() => setShown(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div className={`flex items-start gap-2.5 transition-opacity duration-150 ${shown ? 'opacity-100' : 'opacity-0'}`}>
      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-violet-100">
        <span className="text-[9px] font-bold tracking-widest text-violet-600">n_n</span>
      </span>
      <div className="max-w-[88%] whitespace-pre-line rounded-2xl bg-white p-3.5 text-sm leading-relaxed text-[#2c3656] shadow-sm">
        {children}
      </div>
    </div>
  )
}

function FormField({ label, defaultValue }) {
  return (
    <div className="mb-2.5 last:mb-0">
      <label className="text-[11px] font-bold uppercase tracking-wide text-[#9aa6c3]">{label}</label>
      <input
        type="text"
        defaultValue={defaultValue}
        className="mt-1 w-full rounded-lg border border-[#e2eaf8] bg-[#fbfdff] px-3 py-2 text-sm font-medium text-[#2c3656] focus:outline-none focus:ring-2 focus:ring-blue-100"
      />
    </div>
  )
}

export default function ApplyFlowView({ opportunity, applyStep, setApplyStep, onClose, onSubmitted, onViewApplications }) {
  // What we ask for depends on the opportunity's category and title — a job
  // posting collects personal details, a challenge collects team details, an
  // event collects attendance details.
  const blueprint = useMemo(() => buildApplyBlueprint(opportunity), [opportunity])

  const [choice, setChoice] = useState(null)
  const [followUpInput, setFollowUpInput] = useState('')
  const [followUpValue, setFollowUpValue] = useState('')

  // Reset whenever the panel switches to a different opportunity.
  useEffect(() => {
    setChoice(null)
    setFollowUpInput('')
    setFollowUpValue('')
  }, [opportunity?.id])

  const handleFollowUpSubmit = () => {
    if (!followUpInput.trim()) return
    setFollowUpValue(followUpInput.trim())
    setTimeout(() => setApplyStep(2), 800)
  }

  // Fields carry `valueFrom` when their value comes from the conversation
  // rather than the blueprint default.
  const resolveValue = (field) => {
    if (field.valueFrom === 'choice') return choice?.label ?? field.value
    if (field.valueFrom === blueprint.followUp?.key) return followUpValue || field.value
    return field.value
  }

  const extraFields = choice ? blueprint.choiceExtras?.[choice.id] ?? [] : []

  if (applyStep === 4) {
    return (
      <div className="flex h-full flex-col items-center px-6 pt-[60px] text-center transition-opacity duration-150">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
          <Check size={24} strokeWidth={2.6} />
        </span>
        <p className="mt-4 text-base font-bold text-green-700">{blueprint.successTitle}</p>
        <p className="mt-1 text-sm font-medium text-[#7382a1]">{opportunity.title}</p>
        <p className="mt-3 text-xs font-medium text-[#9aa6c3]">{blueprint.successNote}</p>

        <div className="mt-8 w-full space-y-2">
          <button
            type="button"
            onClick={onViewApplications}
            className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700"
          >
            View in Applications
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-lg border border-[#dfe8f7] py-2.5 text-sm font-bold text-[#35507d] transition hover:bg-blue-50"
          >
            Close
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col">
      <StepDots applyStep={applyStep} />

      <div className="flex-1 space-y-4 overflow-y-auto p-5 transition-opacity duration-150">
        {applyStep === 1 && (
          <>
            <RobotBubble>
              {`${blueprint.intro}\n${blueprint.choice.prompt}`}
            </RobotBubble>

            {!choice && (
              <div className="flex flex-wrap gap-2 pl-[42px]">
                {blueprint.choice.options.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setChoice(option)}
                    className="rounded-full border border-[#dfe8f7] bg-white px-3.5 py-1.5 text-xs font-bold text-[#35507d] transition hover:border-blue-300 hover:bg-blue-50"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}

            {choice && !followUpValue && blueprint.followUp && (
              <RobotBubble delay={100}>
                {blueprint.followUp.prompt}
                <div className="mt-3 flex items-center gap-2">
                  <input
                    type="text"
                    value={followUpInput}
                    onChange={(event) => setFollowUpInput(event.target.value)}
                    placeholder={blueprint.followUp.placeholder}
                    className="flex-1 rounded-lg border border-[#dfe8f7] bg-gray-50 px-3 py-2 text-sm text-[#2c3656] focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                  <button
                    type="button"
                    onClick={handleFollowUpSubmit}
                    className="flex-shrink-0 rounded-lg bg-blue-600 px-3 py-2 text-xs font-bold text-white transition hover:bg-blue-700"
                  >
                    Continue →
                  </button>
                </div>
              </RobotBubble>
            )}

            {followUpValue && (
              <RobotBubble delay={100}>
                {`Perfect, I have everything I need.\nLet me fill in your ${blueprint.kindLabel.toLowerCase()}.`}
              </RobotBubble>
            )}
          </>
        )}

        {applyStep === 2 && (
          <>
            <RobotBubble>
              {`Here's your ${blueprint.kindLabel.toLowerCase()} for ${opportunity.title}.\nEdit anything or ask me to change something.`}
            </RobotBubble>

            {blueprint.sections.map((section, index) => (
              <div key={section.title} className="rounded-xl border border-[#e2eaf8] bg-white p-4">
                <p className="mb-2.5 text-[11px] font-bold uppercase tracking-wide text-blue-600">{section.title}</p>
                {section.fields.map((field) => (
                  <FormField key={field.label} label={field.label} defaultValue={resolveValue(field)} />
                ))}
                {/* Conditional fields (team roster, group size…) join the last section. */}
                {index === blueprint.sections.length - 1 &&
                  extraFields.map((field) => (
                    <FormField key={field.label} label={field.label} defaultValue={field.value} />
                  ))}
              </div>
            ))}

            <input
              type="text"
              disabled
              placeholder="Ask me to change something..."
              className="w-full rounded-full border border-[#dfe8f7] bg-gray-50 px-4 py-2 text-sm text-[#9aa6c3] placeholder:text-[#9aa6c3]"
            />
          </>
        )}

        {applyStep === 3 && (
          <>
            <RobotBubble>{blueprint.confirmPrompt}</RobotBubble>
            <div className="flex gap-2 pl-[42px]">
              <button
                type="button"
                onClick={() => {
                  onSubmitted()
                  setApplyStep(4)
                }}
                className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-blue-700"
              >
                {blueprint.submitLabel}
              </button>
              <button
                type="button"
                onClick={() => setApplyStep(2)}
                className="rounded-lg border border-[#dfe8f7] bg-white px-4 py-2 text-xs font-bold text-[#35507d] transition hover:bg-blue-50"
              >
                Edit something
              </button>
            </div>
          </>
        )}
      </div>

      {applyStep === 2 && (
        <div className="border-t border-[#e2eaf8]/70 p-5">
          <button
            type="button"
            onClick={() => setApplyStep(3)}
            className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700"
          >
            Looks good →
          </button>
        </div>
      )}
    </div>
  )
}
