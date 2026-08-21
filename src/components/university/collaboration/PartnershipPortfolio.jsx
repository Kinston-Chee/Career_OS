import React, { useState } from 'react'
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { partnerships } from '../../../data/collaborationData'

const PAGE_SIZE = 4

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

function PartnerCard({ partner, onViewPartnership, onOpenCompany }) {
  return (
    <div className="border-b border-gray-50 py-4 last:border-b-0">
      <div className="flex items-start gap-4">
        <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-base font-bold text-white ${partner.tone}`}>
          {partner.initial}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              {/* The company name opens that company's full profile page. */}
              <button
                type="button"
                onClick={() => onOpenCompany?.(partner)}
                aria-label={`Open the profile for ${partner.name}`}
                className="group flex items-center gap-1.5 text-[15px] font-bold text-gray-900 transition hover:text-[#5B6CF9]"
              >
                {partner.name}
                <ArrowRight className="h-3 w-3 text-gray-300 transition-transform group-hover:translate-x-0.5 group-hover:text-[#5B6CF9]" />
              </button>
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
              View partnership details →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PartnershipPortfolio({ onViewPartnership, onOpenCompany }) {
  const [page, setPage] = useState(1)
  const totalPages = Math.max(1, Math.ceil(partnerships.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const pageItems = partnerships.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm font-bold text-gray-900">Partnership Portfolio</h2>
        <button type="button" className="flex items-center gap-1 text-xs text-gray-400">
          Sorted by overall value
          <ChevronDown className="h-3.5 w-3.5" />
        </button>
      </div>

      <p className="mt-1 text-[11.5px] text-gray-400">
        {partnerships.length} active partnerships · page {safePage} of {totalPages}
      </p>

      <div className="mt-2">
        {pageItems.map((partner) => (
          <PartnerCard
            key={partner.id}
            partner={partner}
            onViewPartnership={onViewPartnership}
            onOpenCompany={onOpenCompany}
          />
        ))}
      </div>

      {/* Pagination replaces the old "View all" link */}
      <div className="mt-4 flex items-center justify-center gap-1.5">
        <button
          type="button"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={safePage === 1}
          aria-label="Previous partnerships page"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition hover:border-[#5B6CF9] hover:text-[#5B6CF9] disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:text-gray-500"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        {Array.from({ length: totalPages }).map((_, index) => {
          const pageNumber = index + 1
          const active = pageNumber === safePage
          return (
            <button
              key={pageNumber}
              type="button"
              onClick={() => setPage(pageNumber)}
              aria-label={`Partnerships page ${pageNumber}`}
              aria-current={active ? 'page' : undefined}
              className={`h-8 min-w-[32px] rounded-lg border px-2 text-[12.5px] font-semibold transition ${
                active
                  ? 'border-[#5B6CF9] bg-[#5B6CF9] text-white'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-[#5B6CF9] hover:text-[#5B6CF9]'
              }`}
            >
              {pageNumber}
            </button>
          )
        })}
        <button
          type="button"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={safePage === totalPages}
          aria-label="Next partnerships page"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition hover:border-[#5B6CF9] hover:text-[#5B6CF9] disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:text-gray-500"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  )
}
