import React from 'react'
import { ChevronDown } from 'lucide-react'
import { partnerships, totalPartnershipsCount } from '../../../data/collaborationData'

const HEALTH_TONES = {
  green: 'bg-green-50 text-green-700',
  blue: 'bg-blue-50 text-[#185FA5]',
  purple: 'bg-purple-50 text-purple-700',
}

function MetricColumn({ label, value, pct }) {
  return (
    <div className="min-w-0">
      <p className="text-[11px] text-gray-400">{label}</p>
      <p className="text-sm font-bold text-gray-900">{value}</p>
      <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
        <div className="h-full rounded-full bg-[#185FA5]" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

function PartnerCard({ partner, onViewPartnership }) {
  return (
    <div className="border-b border-gray-50 py-4 last:border-b-0">
      <div className="flex items-start gap-4">
        <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-base font-bold text-white ${partner.tone}`}>
          {partner.initial}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-[15px] font-bold text-gray-900">{partner.name}</p>
              <p className="text-xs text-gray-400">Partner since {partner.since}</p>
            </div>
            <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${HEALTH_TONES[partner.healthTone]}`}>
              {partner.healthLabel}
            </span>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <MetricColumn label="Internship conversion" value={`${partner.internshipConversion}%`} pct={partner.internshipConversion} />
            <MetricColumn label="Hiring rate" value={`${partner.hiringRate}%`} pct={partner.hiringRate} />
            <MetricColumn label="Event ROI" value={partner.eventRoi} pct={Math.min(100, parseFloat(partner.eventRoi) * 16)} />
            <MetricColumn label="Relationship health" value={`${partner.relationshipHealth}%`} pct={partner.relationshipHealth} />
          </div>

          <div className="mt-2.5 flex items-center justify-between">
            <p className="text-xs text-gray-400">{partner.events} events · {partner.hires} hires this year</p>
            <button type="button" onClick={() => onViewPartnership(partner)} className="text-xs font-semibold text-[#185FA5] hover:underline">
              View partnership →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PartnershipPortfolio({ onViewPartnership, onViewAll }) {
  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm font-bold text-gray-900">Partnership Portfolio</h2>
        <button type="button" className="flex items-center gap-1 text-xs text-gray-400">
          Sorted by overall value
          <ChevronDown className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="mt-2">
        {partnerships.map((partner) => (
          <PartnerCard key={partner.id} partner={partner} onViewPartnership={onViewPartnership} />
        ))}
      </div>

      <button type="button" onClick={onViewAll} className="mt-3 w-full text-center text-xs font-semibold text-[#185FA5] hover:underline">
        View all {totalPartnershipsCount} partnerships →
      </button>
    </section>
  )
}
