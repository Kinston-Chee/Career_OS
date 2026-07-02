import React from 'react'
import { CalendarDays } from 'lucide-react'
import EmployerModal from '../../employer/EmployerModal'

export default function EventDetailModal({ event, onClose }) {
  const { detail } = event

  return (
    <EmployerModal title={event.title} icon={<CalendarDays className="h-4 w-4" />} onClose={onClose} maxWidth="max-w-[480px]">
      <p className="text-xs text-gray-400">With: {event.with} · {event.badge}</p>

      <div className="mt-4 space-y-3">
        <div className="rounded-xl border border-gray-100 bg-slate-50 p-3">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">Participation</p>
          <p className="mt-1 text-sm text-gray-800">{detail?.participants || 'No participation data yet'}</p>
        </div>
        <div className="rounded-xl border border-blue-100 bg-blue-50/70 p-3">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-[#185FA5]">Partner feedback</p>
          <p className="mt-1 text-sm italic text-gray-700">{detail?.partnerFeedback || 'No feedback recorded yet'}</p>
        </div>
        <div className="rounded-xl border border-green-100 bg-green-50/70 p-3">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-green-700">Skill uplift</p>
          <p className="mt-1 text-sm text-gray-800">{detail?.skillUplift || 'Not yet measurable'}</p>
        </div>
      </div>
    </EmployerModal>
  )
}
