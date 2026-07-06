import React, { useState } from 'react'
import { Calendar } from 'lucide-react'
import EmployerModal from '../EmployerModal'

function defaultDate() {
  const d = new Date()
  d.setDate(d.getDate() + 3)
  return d.toISOString().slice(0, 10)
}

const DURATIONS = ['30 minutes', '45 minutes', '60 minutes']
const FORMATS = ['Video call', 'Phone call', 'On-site']

export default function ScheduleInterviewModal({ candidate, onClose, onConfirm }) {
  const [date, setDate] = useState(defaultDate())
  const [time, setTime] = useState('14:00')
  const [duration, setDuration] = useState(DURATIONS[0])
  const [format, setFormat] = useState(FORMATS[0])
  const [confirmed, setConfirmed] = useState(false)

  const handleConfirm = () => {
    setConfirmed(true)
    window.setTimeout(() => {
      onConfirm({ date, time, duration, format })
    }, 600)
  }

  return (
    <EmployerModal
      title={`Schedule interview — ${candidate.name}`}
      icon={<Calendar className="h-4 w-4" />}
      onClose={onClose}
      maxWidth="max-w-[440px]"
      footer={
        <button
          type="button"
          onClick={handleConfirm}
          disabled={confirmed}
          className={`w-full rounded-full py-2.5 text-sm font-semibold text-white transition-colors ${
            confirmed ? 'bg-green-600' : 'bg-[#185FA5] hover:bg-[#134c87]'
          }`}
        >
          {confirmed ? '✓ Interview scheduled' : 'Confirm interview'}
        </button>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="text-xs font-semibold text-gray-600">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 outline-none focus:border-[#185FA5]"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-600">Time</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 outline-none focus:border-[#185FA5]"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-600">Duration</label>
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 outline-none focus:border-[#185FA5]"
          >
            {DURATIONS.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-600">Format</label>
          <div className="mt-1.5 flex gap-2">
            {FORMATS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFormat(f)}
                className={`flex-1 rounded-lg px-2 py-2 text-xs font-medium transition-colors ${
                  format === f ? 'employer-filter-chip-active' : 'employer-filter-chip'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>
    </EmployerModal>
  )
}
