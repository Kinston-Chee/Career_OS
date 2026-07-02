import React, { useState } from 'react'
import { CalendarPlus } from 'lucide-react'
import EmployerModal from '../../employer/EmployerModal'

const TYPES = ['Challenge', 'Workshop', 'Talk']
const PARTNERS = ['Grab', 'Shopee', 'Deloitte', 'Maybank', 'Axiata', 'Petronas Digital', 'CIMB', 'Other']

function defaultDate() {
  const d = new Date()
  d.setDate(d.getDate() + 30)
  return d.toISOString().slice(0, 10)
}

export default function CreateCollaborationModal({ onClose, onSave }) {
  const [eventName, setEventName] = useState('')
  const [partner, setPartner] = useState(PARTNERS[0])
  const [type, setType] = useState(TYPES[0])
  const [date, setDate] = useState(defaultDate())
  const [targetSkills, setTargetSkills] = useState('')

  const canSave = eventName.trim()

  const handleSave = () => {
    if (!canSave) return
    onSave({ eventName, partner, type, date, targetSkills })
  }

  return (
    <EmployerModal
      title="Create New Collaboration"
      icon={<CalendarPlus className="h-4 w-4" />}
      onClose={onClose}
      maxWidth="max-w-[480px]"
      footer={
        <button
          type="button"
          onClick={handleSave}
          disabled={!canSave}
          className="employer-primary-button w-full px-5 py-2.5 text-sm disabled:opacity-50"
        >
          Save as draft
        </button>
      }
    >
      <div className="space-y-3">
        <div>
          <label className="text-xs font-semibold text-gray-600">Event name</label>
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            placeholder="e.g. Data Analytics Bootcamp"
            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 outline-none focus:border-[#185FA5]"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-600">Partner</label>
          <select
            value={partner}
            onChange={(e) => setPartner(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 outline-none focus:border-[#185FA5]"
          >
            {PARTNERS.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-600">Type</label>
          <div className="mt-1.5 flex gap-2">
            {TYPES.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                className={`flex-1 rounded-lg px-2 py-2 text-xs font-medium transition-colors ${
                  type === t ? 'employer-filter-chip-active' : 'employer-filter-chip'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-600">Target date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 outline-none focus:border-[#185FA5]"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-600">Target skills</label>
          <input
            type="text"
            value={targetSkills}
            onChange={(e) => setTargetSkills(e.target.value)}
            placeholder="e.g. Cloud Computing, Data Visualization"
            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 outline-none focus:border-[#185FA5]"
          />
        </div>
      </div>
    </EmployerModal>
  )
}
