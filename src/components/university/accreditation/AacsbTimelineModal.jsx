import React, { useState } from 'react'
import { CalendarClock, CheckCircle2 } from 'lucide-react'
import EmployerModal from '../../employer/EmployerModal'

const TIMELINE = [
  { month: 'Month 1–2', task: 'Establish AACSB steering committee and assign evidence owners per standard' },
  { month: 'Month 3–4', task: 'Audit existing learner-success and continuous-improvement documentation against AACSB standards' },
  { month: 'Month 5–6', task: 'Close identified evidence gaps — begin structured data collection for missing metrics' },
  { month: 'Month 7–8', task: 'Draft standard-by-standard narrative sections using assembled evidence' },
  { month: 'Month 9', task: 'Internal mock review with faculty committee' },
  { month: 'Month 10', task: 'Revise narrative based on mock review feedback' },
  { month: 'Month 11', task: 'Final assembly, sign-off, and submission preparation' },
]

export default function AacsbTimelineModal({ onClose, onToast }) {
  const [step, setStep] = useState(1)

  return (
    <EmployerModal
      title="AACSB Accreditation Cycle 2026"
      icon={<CalendarClock className="h-4 w-4" />}
      onClose={onClose}
      maxWidth="max-w-[520px]"
    >
      {step === 1 ? (
        <div className="space-y-4">
          <p className="text-sm leading-6 text-gray-700">
            Starting your AACSB preparation early gives you 11 months to build evidence. Want me to create a preparation timeline?
          </p>
          <button
            type="button"
            onClick={() => {
              setStep(2)
              onToast?.('Preparation timeline created')
            }}
            className="employer-primary-button w-full px-5 py-2.5 text-sm"
          >
            Yes, create timeline
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {TIMELINE.map((row) => (
            <div key={row.month} className="flex items-start gap-3 rounded-xl border border-gray-100 bg-slate-50 p-3">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gray-300" />
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-wide text-[#185FA5]">{row.month}</p>
                <p className="mt-0.5 text-sm text-gray-700">{row.task}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </EmployerModal>
  )
}
