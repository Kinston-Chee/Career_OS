import React from 'react'
import { Sparkles } from 'lucide-react'
import { ALL_SKILLS, ALL_UNIVERSITIES } from '../../../data/engagementsData'

function Field({ label, children }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-gray-600">{label}</label>
      {children}
    </div>
  )
}

const inputClass = 'h-10 w-full rounded-lg border border-gray-200 px-3 text-sm text-gray-800 outline-none focus:border-blue-300'

function PillToggle({ options, selected, onToggle }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const isSelected = selected.includes(option)
        return (
          <button
            key={option}
            type="button"
            onClick={() => onToggle(option)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
              isSelected ? 'bg-[#185FA5] text-white' : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            {option}
          </button>
        )
      })}
    </div>
  )
}

export default function WizardStep3Details({ formData, onChange, onContinue }) {
  const setField = (field) => (e) => onChange({ ...formData, [field]: e.target.value })

  const toggleListField = (field) => (value) => {
    const current = formData[field]
    const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value]
    onChange({ ...formData, [field]: next })
  }

  return (
    <div className="mx-auto max-w-[700px]">
      <h2 className="text-2xl font-bold text-gray-900">Review and customize your event</h2>
      <p className="mt-1 text-sm text-gray-500">I&rsquo;ve pre-filled this based on your goals — edit anything you&rsquo;d like</p>

      <div className="employer-glass-card mt-6 p-7">
        <p className="mb-5 flex items-center gap-1.5 text-xs font-medium text-[#185FA5]">
          <Sparkles className="h-3.5 w-3.5" />
          AI pre-filled based on your hiring goals — review and edit as needed
        </p>

        <div className="space-y-4">
          <Field label="Event name">
            <input type="text" value={formData.eventName} onChange={setField('eventName')} className={inputClass} />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Event type">
              <select value={formData.eventType} onChange={setField('eventType')} className={inputClass}>
                <option>Technical Challenge</option>
                <option>Workshop</option>
                <option>Hackathon</option>
                <option>Info Session</option>
              </select>
            </Field>
            <Field label="Duration">
              <input type="text" value={formData.duration} onChange={setField('duration')} className={inputClass} />
            </Field>
          </div>

          <Field label="Format">
            <select value={formData.format} onChange={setField('format')} className={inputClass}>
              <option>Online</option>
              <option>In-person</option>
              <option>Hybrid</option>
            </select>
          </Field>

          <Field label="Target universities">
            <PillToggle options={ALL_UNIVERSITIES} selected={formData.targetUniversities} onToggle={toggleListField('targetUniversities')} />
          </Field>

          <Field label="Target year">
            <input type="text" value={formData.targetYear} onChange={setField('targetYear')} className={inputClass} />
          </Field>

          <Field label="Skills tested">
            <PillToggle options={ALL_SKILLS} selected={formData.skillsTested} onToggle={toggleListField('skillsTested')} />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Max participants">
              <input type="number" value={formData.maxParticipants} onChange={setField('maxParticipants')} className={inputClass} />
            </Field>
            <Field label="Registration deadline">
              <input type="date" value={formData.registrationDeadline} onChange={setField('registrationDeadline')} className={inputClass} />
            </Field>
          </div>

          <Field label="Challenge brief">
            <textarea
              value={formData.challengeBrief}
              onChange={setField('challengeBrief')}
              rows={4}
              className="w-full resize-none rounded-lg border border-gray-200 p-3 text-sm text-gray-800 outline-none focus:border-blue-300"
            />
          </Field>

          <Field label="Prizes / incentives">
            <input type="text" value={formData.prizes} onChange={setField('prizes')} className={inputClass} />
          </Field>
        </div>

        <button
          type="button"
          onClick={onContinue}
          className="mt-6 w-full rounded-full bg-[#185FA5] px-5 py-3 text-sm font-semibold text-white hover:bg-[#134c87]"
        >
          Looks good →
        </button>
      </div>
    </div>
  )
}
