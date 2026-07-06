import React from 'react'
import { Handshake } from 'lucide-react'
import EmployerModal from '../../employer/EmployerModal'
import { partnershipHistory } from '../../../data/collaborationData'

export default function PartnerDetailModal({ partner, onClose }) {
  const history = partnershipHistory[partner.id]

  return (
    <EmployerModal title={`${partner.name} Partnership`} icon={<Handshake className="h-4 w-4" />} onClose={onClose} maxWidth="max-w-[520px]">
      <div className="flex items-center gap-3">
        <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-base font-bold text-white ${partner.tone}`}>
          {partner.initial}
        </span>
        <div>
          <p className="text-sm font-bold text-gray-900">{partner.name}</p>
          <p className="text-xs text-gray-400">Partner since {partner.since} · {partner.events} events · {partner.hires} hires this year</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl bg-slate-50 p-3 sm:grid-cols-4">
        <div>
          <p className="text-[11px] text-gray-400">Internship conversion</p>
          <p className="text-sm font-bold text-gray-900">{partner.internshipConversion}%</p>
        </div>
        <div>
          <p className="text-[11px] text-gray-400">Hiring rate</p>
          <p className="text-sm font-bold text-gray-900">{partner.hiringRate}%</p>
        </div>
        <div>
          <p className="text-[11px] text-gray-400">Event ROI</p>
          <p className="text-sm font-bold text-gray-900">{partner.eventRoi}</p>
        </div>
        <div>
          <p className="text-[11px] text-gray-400">Relationship health</p>
          <p className="text-sm font-bold text-gray-900">{partner.relationshipHealth}%</p>
        </div>
      </div>

      {history ? (
        <>
          <h3 className="mt-5 text-xs font-bold uppercase tracking-wide text-gray-500">Relationship timeline</h3>
          <div className="relative mt-2 space-y-3">
            <div className="absolute bottom-1 left-[7px] top-1 w-px bg-blue-100" />
            {history.timeline.map((item) => (
              <div key={item.date} className="relative flex items-start gap-3 pl-6">
                <span className="absolute left-0 top-1 h-3.5 w-3.5 rounded-full border-2 border-[#185FA5] bg-white" />
                <span className="w-20 shrink-0 text-xs text-gray-400">{item.date}</span>
                <p className="text-sm text-gray-700">{item.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-xl bg-blue-50/70 p-3">
            <p className="text-sm italic leading-5 text-gray-700">{history.feedback}</p>
          </div>
        </>
      ) : null}
    </EmployerModal>
  )
}
