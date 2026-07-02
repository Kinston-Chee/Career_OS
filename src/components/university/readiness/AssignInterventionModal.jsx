import React, { useState } from 'react'
import { ClipboardPlus } from 'lucide-react'
import EmployerModal from '../../employer/EmployerModal'

const RISK_TYPES = ['Employability risk', 'Academic risk', 'Attendance risk']
const OWNERS = ['Career Services Team', 'Dr. Evelyn Chen', 'Dr. Tan Wei Ming', 'Faculty Admin']

function defaultDeadline() {
  const d = new Date()
  d.setDate(d.getDate() + 21)
  return d.toISOString().slice(0, 10)
}

export default function AssignInterventionModal({ onClose, onSave }) {
  const [studentCohort, setStudentCohort] = useState('')
  const [riskType, setRiskType] = useState(RISK_TYPES[0])
  const [recommendation, setRecommendation] = useState('')
  const [owner, setOwner] = useState(OWNERS[0])
  const [deadline, setDeadline] = useState(defaultDeadline())

  const canSave = studentCohort.trim() && recommendation.trim()

  const handleSave = () => {
    if (!canSave) return
    onSave({ studentCohort, riskType, recommendation, owner, deadline })
  }

  return (
    <EmployerModal
      title="Assign new intervention"
      icon={<ClipboardPlus className="h-4 w-4" />}
      onClose={onClose}
      maxWidth="max-w-[480px]"
      footer={
        <button
          type="button"
          onClick={handleSave}
          disabled={!canSave}
          className="employer-primary-button w-full px-5 py-2.5 text-sm disabled:opacity-50"
        >
          Save intervention
        </button>
      }
    >
      <div className="space-y-3">
        <div>
          <label className="text-xs font-semibold text-gray-600">Student / Cohort</label>
          <input
            type="text"
            value={studentCohort}
            onChange={(e) => setStudentCohort(e.target.value)}
            placeholder="e.g. Student E · Y3 Data Science"
            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 outline-none focus:border-[#185FA5]"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-600">Risk type</label>
          <select
            value={riskType}
            onChange={(e) => setRiskType(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 outline-none focus:border-[#185FA5]"
          >
            {RISK_TYPES.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-600">Recommended action</label>
          <textarea
            value={recommendation}
            onChange={(e) => setRecommendation(e.target.value)}
            rows={3}
            placeholder="e.g. 1:1 career coaching session + Career Memory setup"
            className="mt-1 w-full resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 outline-none focus:border-[#185FA5]"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-600">Owner</label>
          <select
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 outline-none focus:border-[#185FA5]"
          >
            {OWNERS.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-600">Deadline</label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 outline-none focus:border-[#185FA5]"
          />
        </div>
      </div>
    </EmployerModal>
  )
}
