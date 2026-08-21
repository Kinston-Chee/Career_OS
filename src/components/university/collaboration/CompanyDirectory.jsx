import React, { useEffect, useMemo, useState } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight, Search, Star } from 'lucide-react'
import { COMPANIES, GAP_MAP, SKILL_GAPS } from '../../../data/companyDirectory'

const PAGE_SIZE = 6

const SORTS = [
  { id: 'fit', label: 'Best fit' },
  { id: 'name', label: 'A–Z' },
  { id: 'partner', label: 'Partners first' },
]

function fitTone(pct) {
  if (pct >= 85) return 'border-emerald-200 bg-emerald-50 text-emerald-700'
  if (pct >= 70) return 'border-amber-200 bg-amber-50 text-amber-700'
  return 'border-slate-200 bg-slate-50 text-slate-500'
}

function CompanyCard({ company, onOpen }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(company)}
      aria-label={`Open the profile for ${company.name}`}
      className="group flex flex-col rounded-2xl border border-gray-100 bg-white p-4 text-left transition hover:-translate-y-0.5 hover:border-[#5B6CF9]/50 hover:shadow-[0_8px_24px_rgba(91,108,249,0.12)]"
    >
      <div className="flex items-start gap-3">
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white"
          style={{ background: company.color }}
        >
          {company.initial}
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-1.5">
            <span className="truncate text-sm font-bold text-gray-900 group-hover:text-[#5B6CF9]">{company.name}</span>
            {company.recommended ? <Star className="h-3 w-3 shrink-0 fill-amber-400 text-amber-400" /> : null}
          </span>
          <span className="mt-0.5 block truncate text-[11.5px] text-gray-500">{company.sub}</span>
        </span>
        <span className={`shrink-0 rounded-md border px-2 py-0.5 font-mono text-[11px] font-semibold ${fitTone(company.fitPct)}`}>
          {company.fitPct}% fit
        </span>
      </div>

      <div className="mt-2.5 flex flex-wrap gap-1">
        {company.gapTags.map((tag, index) => {
          const gap = GAP_MAP[company.gaps[index]] ?? GAP_MAP.cloud
          return (
            <span
              key={tag}
              className="rounded-full px-2 py-0.5 text-[10.5px] font-medium"
              style={{ background: gap.bg, color: gap.fg }}
            >
              {tag}
            </span>
          )
        })}
      </div>

      <div className="mt-3 grid grid-cols-3 divide-x divide-gray-100 border-t border-gray-100 pt-2.5">
        <span className="text-center">
          <span className="block font-mono text-[13px] font-semibold text-gray-900">{company.contacts.length}</span>
          <span className="block text-[10px] text-gray-400">contacts</span>
        </span>
        <span className="text-center">
          <span className="block font-mono text-[13px] font-semibold text-gray-900">{company.collabTypes.length}</span>
          <span className="block text-[10px] text-gray-400">event types</span>
        </span>
        <span className="text-center">
          <span className="block font-mono text-[13px] font-semibold text-gray-900">
            {company.partnerSince ? `Since '${String(company.partnerSince).slice(2)}` : 'No'}
          </span>
          <span className="block text-[10px] text-gray-400">partnership</span>
        </span>
      </div>
    </button>
  )
}

/**
 * CompanyDirectory
 *
 * Browsable, filterable, paginated list of every company in the marketplace.
 * Each card opens that company's profile page.
 */
export default function CompanyDirectory({ onOpenCompany }) {
  const [query, setQuery] = useState('')
  const [gaps, setGaps] = useState([])
  const [sort, setSort] = useState('fit')
  const [page, setPage] = useState(1)

  const toggleGap = (id) => {
    setGaps((prev) => (prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]))
  }

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase()
    let list = COMPANIES.filter((company) => {
      if (gaps.length && !gaps.some((gap) => company.gaps.includes(gap))) return false
      if (!term) return true
      const haystack = `${company.name} ${company.industry} ${company.location} ${company.gapTags.join(' ')}`.toLowerCase()
      return haystack.includes(term)
    })

    if (sort === 'name') list = [...list].sort((a, b) => a.name.localeCompare(b.name))
    else if (sort === 'partner') list = [...list].sort((a, b) => (b.partnerSince ? 1 : 0) - (a.partnerSince ? 1 : 0) || b.fitPct - a.fitPct)
    else list = [...list].sort((a, b) => b.fitPct - a.fitPct)

    return list
  }, [query, gaps, sort])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))

  // Filtering can shrink the list under the current page — snap back in range.
  useEffect(() => { setPage(1) }, [query, gaps, sort])
  const safePage = Math.min(page, totalPages)
  const pageItems = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  return (
    <section className="employer-glass-card p-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-gray-900">Company directory</h2>
          <p className="mt-0.5 text-xs text-gray-500">Browse every company in the marketplace and open a profile to plan outreach.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5">
            <Search className="h-3.5 w-3.5 text-gray-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search companies, industries, locations…"
              aria-label="Search the company directory"
              className="w-56 bg-transparent text-[12.5px] text-gray-800 outline-none placeholder:text-gray-400"
            />
          </span>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            aria-label="Sort companies"
            className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-[12.5px] font-medium text-gray-600 outline-none"
          >
            {SORTS.map((option) => <option key={option.id} value={option.id}>Sort: {option.label}</option>)}
          </select>
        </div>
      </div>

      {/* Skill-gap filter pills */}
      <div className="mt-3.5">
        <p className="text-[10.5px] font-semibold uppercase tracking-wide text-gray-400">Filter by skill gap</p>
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {SKILL_GAPS.map((gap) => {
            const active = gaps.includes(gap.id)
            return (
              <button
                key={gap.id}
                type="button"
                onClick={() => toggleGap(gap.id)}
                aria-pressed={active}
                className={`rounded-full border px-3 py-1 text-[11.5px] font-medium transition ${gap.chip} ${
                  active ? 'ring-2 ring-offset-1 ring-current' : 'opacity-80 hover:opacity-100'
                }`}
              >
                {gap.label}
              </button>
            )
          })}
          {gaps.length ? (
            <button
              type="button"
              onClick={() => setGaps([])}
              className="rounded-full border border-gray-200 bg-white px-3 py-1 text-[11.5px] font-medium text-gray-500 hover:text-gray-800"
            >
              Clear
            </button>
          ) : null}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-[11.5px] text-gray-400">
        <span>{filtered.length} compan{filtered.length === 1 ? 'y' : 'ies'}</span>
        <span>Page {safePage} of {totalPages}</span>
      </div>

      {/* Cards */}
      <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {pageItems.map((company) => (
          <CompanyCard key={company.id} company={company} onOpen={onOpenCompany} />
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-xl border border-dashed border-gray-200 bg-white/70 px-4 py-10 text-center text-sm font-medium text-gray-400">
          No companies match these filters.
        </p>
      ) : null}

      {/* Pagination */}
      {totalPages > 1 ? (
        <div className="mt-4 flex items-center justify-center gap-1.5">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={safePage === 1}
            aria-label="Previous page"
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
                aria-label={`Page ${pageNumber}`}
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
            aria-label="Next page"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition hover:border-[#5B6CF9] hover:text-[#5B6CF9] disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:text-gray-500"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      ) : null}
    </section>
  )
}
