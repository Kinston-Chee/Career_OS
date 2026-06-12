import React, { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import ExperienceCard from './ExperienceCard'

const EVENT_TYPES = [
  'All Types',
  'Hackathon',
  'Workshop',
  'Competition',
  'Project',
  'Internship',
  'Leadership',
  'Volunteering',
  'Certification',
  'Research',
  'Networking Event',
  'Other',
]

const COLLAPSED_COUNT = 3

function parseExperienceDate(dateStr) {
  if (!dateStr) return new Date(0)
  // Format: "Jan 15 2026" or "2026-01"
  const d = new Date(dateStr)
  return isNaN(d.getTime()) ? new Date(0) : d
}

export default function ExperienceTimeline({ experiences }) {
  const [typeFilter, setTypeFilter] = useState('All Types')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [showFilters, setShowFilters] = useState(true)
  const [isExpanded, setIsExpanded] = useState(false)

  const filtered = useMemo(() => {
    let result = [...experiences]

    // Sort newest first
    result.sort((a, b) => parseExperienceDate(b.date) - parseExperienceDate(a.date))

    // Filter by event type
    if (typeFilter !== 'All Types') {
      result = result.filter((exp) => exp.type === typeFilter)
    }

    // Filter by date range (full date)
    if (startDate) {
      const start = new Date(startDate)
      result = result.filter((exp) => parseExperienceDate(exp.date) >= start)
    }
    if (endDate) {
      const end = new Date(endDate)
      end.setHours(23, 59, 59, 999)
      result = result.filter((exp) => parseExperienceDate(exp.date) <= end)
    }

    return result
  }, [experiences, typeFilter, startDate, endDate])

  const hasActiveFilters = typeFilter !== 'All Types' || startDate || endDate
  const canExpand = filtered.length > COLLAPSED_COUNT
  const visibleItems = isExpanded ? filtered : filtered.slice(0, COLLAPSED_COUNT)

  function clearFilters() {
    setTypeFilter('All Types')
    setStartDate('')
    setEndDate('')
  }

  const selectBase =
    'rounded-xl border border-violet-100 bg-white/90 px-3 py-2.5 text-xs font-semibold text-[#11104a] outline-none transition-all duration-200 focus:border-violet-300 focus:ring-4 focus:ring-violet-100/70'

  return (
    <section className="rounded-3xl border border-violet-100/80 bg-white/92 p-5 shadow-[0_18px_44px_rgba(88,63,188,0.08)]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-[#11104a]">Experience Timeline</h3>
          <p className="mt-1 text-xs font-medium text-slate-500">
            Memories that shape your career profile.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <span className="rounded-full bg-violet-100 px-2.5 py-1 text-[11px] font-bold text-violet-700">
              {filtered.length} result{filtered.length !== 1 ? 's' : ''}
            </span>
          )}
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={`rounded-2xl border px-4 py-2.5 text-xs font-bold shadow-sm transition-all ${showFilters
                ? 'border-violet-200 bg-violet-50 text-violet-700'
                : 'border-violet-100 bg-white text-violet-700 hover:bg-violet-50'
              }`}
          >
            {showFilters ? 'Hide Filters' : 'Filters'}
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      {showFilters && (
        <div className="mt-4 flex flex-wrap items-end gap-3 rounded-2xl border border-violet-50 bg-violet-50/30 p-4">
          <div className="min-w-0 flex-1">
            <label htmlFor="filter-type" className="mb-1.5 block text-[11px] font-semibold text-[#3f3d78]">
              Event Type
            </label>
            <select
              id="filter-type"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className={`${selectBase} w-full appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%236b7280%22%20d%3D%22M2%204l4%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px] bg-[right_12px_center] bg-no-repeat pr-9`}
            >
              {EVENT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className="min-w-0">
            <label htmlFor="filter-start" className="mb-1.5 block text-[11px] font-semibold text-[#3f3d78]">
              From Date
            </label>
            <input
              id="filter-start"
              type="date"
              value={startDate}
              max={endDate || undefined}
              onChange={(e) => setStartDate(e.target.value)}
              className={`${selectBase} w-44`}
            />
          </div>
          <div className="min-w-0">
            <label htmlFor="filter-end" className="mb-1.5 block text-[11px] font-semibold text-[#3f3d78]">
              To Date
            </label>
            <input
              id="filter-end"
              type="date"
              value={endDate}
              min={startDate || undefined}
              onChange={(e) => setEndDate(e.target.value)}
              className={`${selectBase} w-44`}
            />
          </div>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="rounded-xl px-3 py-2.5 text-xs font-bold text-violet-700 transition-colors hover:bg-violet-100"
            >
              Clear
            </button>
          )}
        </div>
      )}

      {/* Timeline entries */}
      <div className="mt-6 space-y-5">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-violet-100 bg-violet-50 text-violet-600">
              <Search size={24} strokeWidth={2.2} />
            </div>
            <p className="mt-4 text-sm font-semibold text-slate-500">No experiences match your filters.</p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-2 text-xs font-bold text-violet-700 hover:text-violet-900"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          visibleItems.map((experience, idx) => (
            <div
              key={experience.id}
              className="grid grid-cols-[54px_22px_minmax(0,1fr)] gap-3 sm:grid-cols-[68px_26px_minmax(0,1fr)] animate-[fadeSlideIn_0.35s_ease_both]"
              style={{ animationDelay: `${idx * 60}ms` }}
            >
              <div className="pt-2 text-right">
                <p className="text-[10px] font-bold uppercase leading-4 text-violet-700">{experience.date.split(' ')[0]}</p>
                <p className="text-sm font-bold leading-4 text-[#11104a]">{experience.date.split(' ')[1]}</p>
                <p className="text-[10px] font-medium leading-4 text-slate-400">{experience.date.split(' ')[2]}</p>
              </div>
              <div className="relative flex justify-center">
                <div className="absolute bottom-[-1.25rem] top-8 w-px bg-gradient-to-b from-violet-200 via-violet-100 to-transparent" />
                <div className="relative mt-3 flex h-6 w-6 items-center justify-center rounded-full bg-white ring-4 ring-violet-50">
                  <div className="h-2.5 w-2.5 rounded-full bg-violet-600 shadow-[0_0_16px_rgba(124,58,237,0.5)]" />
                </div>
              </div>
              <ExperienceCard experience={experience} />
            </div>
          ))
        )}
      </div>

      {/* Continue / Show Less */}
      {canExpand && (
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="group flex items-center gap-2 rounded-2xl border border-violet-200 bg-white px-6 py-3 text-sm font-bold text-violet-700 shadow-sm transition-all duration-200 hover:bg-violet-50 hover:shadow-md"
          >
            {isExpanded ? (
              <>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-200 group-hover:-translate-y-0.5">
                  <path d="M12 10L8 6L4 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Show Less
              </>
            ) : (
              <>
                Continue
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-200 group-hover:translate-y-0.5">
                  <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </>
            )}
          </button>
        </div>
      )}

      {filtered.length > 0 && (
        <div className="mt-4 flex justify-center">
          <p className="text-xs font-medium text-slate-400">
            Showing {visibleItems.length} of {filtered.length} experience{filtered.length !== 1 ? 's' : ''}
            {filtered.length !== experiences.length ? ` (${experiences.length} total)` : ''}
          </p>
        </div>
      )}
    </section>
  )
}
