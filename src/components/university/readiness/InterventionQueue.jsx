import React, { useEffect, useRef, useState } from 'react'
import { ChevronDown, Plus } from 'lucide-react'

const RISK_TONES = { red: 'bg-red-50 text-red-700', orange: 'bg-orange-50 text-orange-700' }
const STATUS_OPTIONS = ['Not started', 'In progress', 'Scheduled', 'Completed', 'Overdue']
const STATUS_TONE_BY_LABEL = {
  'Not started': 'gray',
  'In progress': 'blue',
  Scheduled: 'purple',
  Completed: 'green',
  Overdue: 'red',
}
const STATUS_TONES = {
  blue: 'bg-blue-50 text-[#185FA5]',
  gray: 'bg-gray-100 text-gray-600',
  purple: 'bg-purple-50 text-purple-700',
  red: 'bg-red-50 text-red-700',
  green: 'bg-green-50 text-green-700',
}

function StatusDropdown({ row, onChangeStatus }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={ref} className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className={`flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-medium transition ${STATUS_TONES[STATUS_TONE_BY_LABEL[row.status]]}`}
      >
        {row.status}
        <ChevronDown className="h-3 w-3" />
      </button>
      {open ? (
        <div className="absolute left-0 z-20 mt-1 w-36 overflow-hidden rounded-lg border border-gray-100 bg-white py-1 shadow-lg">
          {STATUS_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                onChangeStatus(row.id, option)
                setOpen(false)
              }}
              className={`flex w-full items-center px-3 py-1.5 text-left text-xs ${option === row.status ? 'font-semibold text-[#185FA5]' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              {option}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default function InterventionQueue({ rows, activeCount, pendingCount, onAssign, onChangeStatus }) {
  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-baseline gap-2">
          <h2 className="text-sm font-bold text-gray-900">Intervention Queue</h2>
          <span className="text-xs text-gray-400">{activeCount} active · {pendingCount} pending assignment</span>
        </div>
        <button type="button" onClick={onAssign} className="flex items-center gap-1.5 rounded-full bg-[#185FA5] px-4 py-2 text-sm font-semibold text-white hover:bg-[#134c87]">
          <Plus className="h-3.5 w-3.5" />
          Assign new intervention
        </button>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[800px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-left text-xs text-gray-400">
              <th className="pb-2 font-medium">Student / Cohort</th>
              <th className="pb-2 font-medium">Risk Type</th>
              <th className="pb-2 font-medium">Recommended Intervention</th>
              <th className="pb-2 font-medium">Owner</th>
              <th className="pb-2 font-medium">Deadline</th>
              <th className="pb-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const initials = row.owner.split(' ').map((p) => p[0]).slice(0, 2).join('')
              return (
                <tr key={row.id} className="border-b border-gray-50 last:border-b-0">
                  <td className="py-3 pr-3 text-sm font-medium text-gray-800">{row.student}</td>
                  <td className="py-3 pr-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${RISK_TONES[row.riskTone]}`}>{row.riskType}</span>
                  </td>
                  <td className="py-3 pr-3 text-xs text-gray-600">{row.recommendation}</td>
                  <td className="py-3 pr-3">
                    <span className="flex items-center gap-1.5 text-xs text-gray-600">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-[10px] font-semibold text-[#185FA5]">
                        {initials}
                      </span>
                      {row.owner}
                    </span>
                  </td>
                  <td className="py-3 pr-3 text-xs text-gray-500">{row.deadline}</td>
                  <td className="py-3">
                    <StatusDropdown row={row} onChangeStatus={onChangeStatus} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}
