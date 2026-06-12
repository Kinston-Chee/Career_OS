import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
  AlertTriangle,
  BarChart3,
  Bookmark,
  Briefcase,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Code2,
  Database,
  Filter,
  Globe2,
  GraduationCap,
  LineChart,
  MapPin,
  RefreshCw,
  Rocket,
  Search,
  Sparkles,
  Tag,
  Target,
  TrendingUp,
} from 'lucide-react'
import { jobMarket } from '../../data/mockData'

const sectorIconMap = {
  technology: Code2,
  analytics: BarChart3,
  finance: LineChart,
  consulting: Briefcase,
  healthcare: GraduationCap,
  education: GraduationCap,
  engineering: Building2,
}

const roleIconMap = {
  data: BarChart3,
  software: Code2,
  analyst: LineChart,
  engineer: Database,
  product: Target,
  consultant: Briefcase,
}

function IconTile({ icon: Icon = Briefcase, className = 'h-9 w-9 bg-violet-50 text-violet-600 border-violet-100', size = 18 }) {
  return (
    <span className={`inline-flex shrink-0 items-center justify-center rounded-xl border ${className}`}>
      <Icon size={size} strokeWidth={2.2} />
    </span>
  )
}

function sectorIconFor(sector) {
  return sectorIconMap[sector.id] ?? sectorIconMap[sector.slug] ?? Building2
}

function roleIconFor(item) {
  const text = `${item.title ?? ''} ${item.meta ?? ''}`.toLowerCase()
  const key = Object.keys(roleIconMap).find((candidate) => text.includes(candidate))
  return key ? roleIconMap[key] : TrendingUp
}

// All sections read from `jobMarket` in mockData.js. Swap that object with
// the AI backend response when ready — the components below stay the same.

// ─── section header ────────────────────────────────────────────────────
function SectionHeader({ icon, title, count, link, accent = 'text-violet-600' }) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <h3 className="flex items-center gap-2 text-base font-bold text-slate-900">
        {icon && <span className={`inline-flex items-center ${accent}`}>{icon}</span>}
        {title}
      </h3>
      {count && (
        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-500">{count}</span>
      )}
      {link && (
        <a href="#" className="ml-auto flex items-center gap-1 text-xs font-semibold text-violet-600 hover:underline">
          {link} <span aria-hidden>→</span>
        </a>
      )}
    </div>
  )
}

// ─── search + sector filter (modal popup) ──────────────────────────────
function SectorFilterModal({ sectors, committed, onApply, onClose }) {
  const [pending, setPending] = useState(() => new Set(committed))

  const toggle = (id) =>
    setPending((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  return (
    <div className="absolute right-0 top-full z-40 mt-2 w-[420px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_50px_rgba(108,99,255,0.18)]">
      <header className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
        <h4 className="text-sm font-bold text-slate-900">Filter by Sector</h4>
        <button
          type="button"
          onClick={() => setPending(new Set())}
          className="text-xs font-semibold text-violet-600 hover:underline"
        >
          Clear all
        </button>
      </header>

      <div className="max-h-[60vh] overflow-y-auto px-4 py-4">
        <div className="grid grid-cols-2 gap-2">
          {sectors.map((sector) => {
            const selected = pending.has(sector.id)
            return (
              <button
                key={sector.id}
                type="button"
                onClick={() => toggle(sector.id)}
                className={`flex items-center gap-3 rounded-xl border p-3 text-left transition ${
                  selected
                    ? 'border-violet-500 bg-violet-50'
                    : 'border-slate-200 bg-white hover:border-violet-200 hover:bg-slate-50'
                }`}
              >
                <IconTile icon={sectorIconFor(sector)} className={`h-9 w-9 ${sector.iconBg} border-slate-100`} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-900">{sector.name}</p>
                  <p className="text-xs text-slate-500">{sector.count} roles</p>
                </div>
                <span
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border text-[10px] font-bold transition ${
                    selected ? 'border-violet-600 bg-violet-600 text-white' : 'border-slate-300 text-transparent'
                  }`}
                >
                  ✓
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <footer className="flex items-center gap-2 border-t border-slate-100 bg-slate-50 px-4 py-3">
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => onApply(pending)}
          className="flex-1 rounded-lg bg-violet-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-violet-700"
        >
          Apply Filter
        </button>
      </footer>
    </div>
  )
}

function SearchAndSectorBar({ search, onSearch, committed, onApplyCommitted, sectors }) {
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    const handler = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search size={16} strokeWidth={2.2} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search jobs, companies, skills..."
          className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-10 text-sm outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-50"
        />
        {search && (
          <button
            type="button"
            onClick={() => onSearch('')}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700"
          >
            ✕
          </button>
        )}
      </div>
      <div ref={wrapperRef} className="relative shrink-0">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-haspopup="dialog"
          aria-expanded={open}
          className={`inline-flex h-10 items-center gap-2 rounded-xl border px-4 text-sm font-semibold transition ${
            open || committed.size > 0
              ? 'border-violet-500 bg-violet-50 text-violet-700'
              : 'border-slate-200 bg-white text-slate-600 hover:border-violet-300'
          }`}
        >
          <Filter size={16} strokeWidth={2.2} />
          <span>Sectors</span>
          {committed.size > 0 && (
            <span className="inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-violet-600 px-1.5 text-[11px] font-bold text-white">
              {committed.size}
            </span>
          )}
          <ChevronDown size={14} strokeWidth={2.2} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
        {open && (
          <SectorFilterModal
            sectors={sectors}
            committed={committed}
            onApply={(next) => {
              onApplyCommitted(next)
              setOpen(false)
            }}
            onClose={() => setOpen(false)}
          />
        )}
      </div>
    </div>
  )
}

// ─── closing soon urgency strip ────────────────────────────────────────
function ClosingSoonStrip({ items }) {
  const urgentItems = items.filter((i) => i.daysLeft <= 3)
  if (urgentItems.length === 0) return null

  return (
    <div className="flex items-center gap-3 rounded-xl border border-rose-200/80 bg-gradient-to-r from-rose-50/80 to-amber-50/60 p-3.5">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-rose-100 text-rose-600">
        <Clock3 size={15} strokeWidth={2.2} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-rose-900">
          {urgentItems.length} {urgentItems.length === 1 ? 'role is' : 'roles are'} closing soon
        </p>
        <p className="truncate text-xs text-rose-700/80">
          {urgentItems.map((i) => `${i.title} (${i.daysLeft}d)`).join(' · ')}
        </p>
      </div>
      <div className="flex shrink-0 gap-2">
        {urgentItems.slice(0, 2).map((item) => (
          <span
            key={item.id}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${
              item.daysLeft <= 1
                ? 'bg-rose-500 text-white'
                : 'bg-amber-100 text-amber-800'
            }`}
          >
            {item.daysLeft <= 1 ? 'Apply Now' : `${item.daysLeft} days left`}
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── large split-layout job card (Best Matches) ────────────────────────
function JobCardLarge({ job }) {
  const [saved, setSaved] = useState(job.isSaved ?? false)
  const [applied, setApplied] = useState(false)
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-[0_12px_28px_rgba(108,99,255,0.12)]">
      <div className={`h-1 w-full bg-gradient-to-r ${job.accentGradient}`} />
      <div className="grid gap-0 sm:grid-cols-[minmax(0,1fr)_200px]">
        <div className="space-y-3 p-5">
          <div className="flex items-start gap-3">
            <IconTile icon={Building2} className={`h-11 w-11 ${job.logoBg} border-slate-100`} size={20} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium text-slate-500">
                {job.company} · {job.location}
              </p>
              <p className="text-base font-bold leading-tight text-slate-900">{job.title}</p>
            </div>
            <button
              type="button"
              onClick={() => setSaved((v) => !v)}
              aria-label={saved ? 'Unsave job' : 'Save job'}
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition ${
                saved ? 'bg-violet-100 text-violet-600' : 'text-slate-400 hover:bg-slate-50 hover:text-violet-600'
              }`}
            >
              {saved ? <Bookmark size={16} fill="currentColor" strokeWidth={2.2} /> : <Bookmark size={16} strokeWidth={2.2} />}
            </button>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {[
              { icon: Tag, text: job.type },
              { icon: job.workMode === 'Remote' ? Globe2 : MapPin, text: job.workMode },
              job.duration && { icon: CalendarDays, text: job.duration },
            ]
              .filter(Boolean)
              .map((chip, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2.5 py-0.5 text-[11px] font-medium text-slate-600"
                >
                  <chip.icon size={12} strokeWidth={2.2} /> {chip.text}
                </span>
              ))}
          </div>

          <div className="flex flex-wrap gap-1.5">
            {job.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-violet-50 px-2.5 py-0.5 text-[11px] font-semibold text-violet-600">
                {tag}
              </span>
            ))}
          </div>

          <p className="text-sm leading-relaxed text-slate-600 line-clamp-2">{job.summary}</p>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            {job.isNew && (
              <span className="inline-flex items-center gap-1 rounded-full bg-violet-100 px-2 py-0.5 text-[11px] font-semibold text-violet-700">
                <Sparkles size={12} strokeWidth={2.2} /> Just posted
              </span>
            )}
            {job.expiringNote && (
              <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-2 py-0.5 text-[11px] font-semibold text-rose-700">
                <Clock3 size={12} strokeWidth={2.2} /> {job.expiringNote}
              </span>
            )}
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <Clock3 size={12} strokeWidth={2.2} /> {job.timeAgo}
            </span>
            <span className="ml-auto rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-600">
              {job.matchPercent}% Match
            </span>
          </div>
        </div>

        <div className="flex flex-col items-stretch gap-3 border-t border-slate-100 bg-slate-50/80 p-4 sm:border-l sm:border-t-0">
          <div>
            <p className="text-[11px] text-slate-400">{job.salaryLabel}</p>
            <p className="font-bold leading-none">
              <span className="text-xs text-slate-500">{job.salaryCurrency} </span>
              <span className="text-2xl text-slate-900">{job.salaryAmount}</span>
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-3">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Deadline</p>
            <p className="text-sm font-semibold text-slate-900">{job.deadline}</p>
            <p
              className={`text-xs font-semibold ${
                job.daysLeft <= 3 ? 'text-rose-500' : 'text-slate-500'
              }`}
            >
              {job.daysLeft <= 3 && <AlertTriangle size={12} strokeWidth={2.2} className="mr-1 inline" />}
              {job.daysLeft} days left
            </p>
          </div>
          <button
            type="button"
            onClick={() => setApplied((v) => !v)}
            className={`flex w-full items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-sm font-bold transition ${
              applied
                ? 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200'
                : 'bg-gradient-to-r from-violet-600 to-pink-500 text-white shadow-sm hover:shadow-md'
            }`}
          >
            {applied ? <Check size={15} strokeWidth={2.2} /> : <Rocket size={15} strokeWidth={2.2} />}
            {applied ? 'Applied' : 'Apply Now'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── small job card (Latest Postings) ──────────────────────────────────
function JobCardSmall({ job }) {
  const [saved, setSaved] = useState(false)
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-[0_8px_22px_rgba(108,99,255,0.10)]">
      <div className={`h-1 w-full bg-gradient-to-r ${job.accentGradient}`} />
      <div className="space-y-2 p-4">
        <div className="flex items-start gap-2.5">
          <IconTile icon={Building2} className={`h-10 w-10 ${job.logoBg} border-slate-100`} size={18} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[11px] font-medium text-slate-500">
              {job.company} · {job.location}
            </p>
            <p className="text-sm font-bold leading-tight text-slate-900">{job.title}</p>
          </div>
          <button
            type="button"
            onClick={() => setSaved((v) => !v)}
            aria-label={saved ? 'Unsave job' : 'Save job'}
            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition ${
              saved ? 'bg-violet-100 text-violet-600' : 'text-slate-400 hover:bg-slate-50 hover:text-violet-600'
            }`}
          >
            {saved ? <Bookmark size={15} fill="currentColor" strokeWidth={2.2} /> : <Bookmark size={15} strokeWidth={2.2} />}
          </button>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[10px] font-medium text-slate-600">
            <Tag size={11} strokeWidth={2.2} /> {job.type}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[10px] font-medium text-slate-600">
            {job.workMode === 'Remote' ? <Globe2 size={11} strokeWidth={2.2} /> : <MapPin size={11} strokeWidth={2.2} />} {job.workMode}
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {job.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-full bg-violet-50 px-2 py-0.5 text-[10px] font-semibold text-violet-600">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2 border-t border-slate-100 pt-2">
          {job.isNew && (
            <span className="inline-flex items-center gap-1 rounded-full bg-violet-100 px-1.5 py-0.5 text-[10px] font-semibold text-violet-700">
              <Sparkles size={11} strokeWidth={2.2} /> New
            </span>
          )}
          <span className="flex items-center gap-1 text-[11px] text-slate-400">
            <Clock3 size={11} strokeWidth={2.2} /> {job.timeAgo}
          </span>
          {job.matchPercent != null && (
            <span className="ml-auto rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-600">
              {job.matchPercent}%
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── market pulse sidebar ──────────────────────────────────────────────
function MarketPulseSidebar({ skills, trendingRoles }) {
  return (
    <div className="space-y-4">
      {/* Skills in Demand */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-5">
        <h4 className="mb-4 flex items-center gap-2 text-sm font-bold text-slate-900">
          <BarChart3 size={16} strokeWidth={2.2} className="text-violet-600" /> Skills in Demand
        </h4>
        <div className="space-y-3">
          {skills.map((skill) => (
            <div key={skill.name}>
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700">{skill.name}</span>
                <span className="text-slate-400">{skill.sub}</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                <div className={`h-full rounded-full ${skill.barColor}`} style={{ width: `${skill.percent}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Roles */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-5">
        <h4 className="mb-4 flex items-center gap-2 text-sm font-bold text-slate-900">
          <TrendingUp size={16} strokeWidth={2.2} className="text-violet-600" /> Trending Roles
        </h4>
        <div className="divide-y divide-slate-100">
          {trendingRoles.map((item) => (
            <div key={item.id} className="flex cursor-pointer items-center gap-3 py-2.5 first:pt-0 last:pb-0">
              <IconTile icon={roleIconFor(item)} className={`h-9 w-9 ${item.bg} border-slate-100`} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-900">{item.title}</p>
                <p className="text-[11px] text-slate-400">{item.meta}</p>
              </div>
              <span className="text-sm">{item.badge}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── empty hint ────────────────────────────────────────────────────────
function EmptyHint({ children }) {
  return (
    <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/60 p-6 text-center text-sm text-slate-500">
      {children}
    </div>
  )
}

function jobMatchesQuery(job, query) {
  if (!query) return true
  const needle = query.toLowerCase()
  const haystack = [job.title, job.company, job.location, ...(job.tags ?? [])]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
  return haystack.includes(needle)
}

function jobMatchesSectors(job, committed) {
  if (committed.size === 0) return true
  return committed.has(job.sector)
}

// ─── main composition ─────────────────────────────────────────────────
export default function JobMarket() {
  const [search, setSearch] = useState('')
  const [committedSectors, setCommittedSectors] = useState(() => new Set())

  const matches = (job) => jobMatchesQuery(job, search) && jobMatchesSectors(job, committedSectors)

  const mostRelevant = useMemo(() => jobMarket.mostRelevant.filter(matches), [search, committedSectors])
  const latest = useMemo(() => jobMarket.latest.filter(matches), [search, committedSectors])

  return (
    <div className="space-y-6">
      <SearchAndSectorBar
        search={search}
        onSearch={setSearch}
        committed={committedSectors}
        onApplyCommitted={setCommittedSectors}
        sectors={jobMarket.sectors}
      />

      <ClosingSoonStrip items={jobMarket.expiring} />

      <section>
        <SectionHeader
          icon={<Target size={17} strokeWidth={2.2} />}
          title="Best Matches"
          count={`${mostRelevant.length} matches`}
          link="See all"
        />
        {mostRelevant.length > 0 ? (
          <div className="space-y-4">
            {mostRelevant.map((job) => (
              <JobCardLarge key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <EmptyHint>No jobs match your current filters.</EmptyHint>
        )}
      </section>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
        <section>
          <SectionHeader icon={<Sparkles size={17} strokeWidth={2.2} />} title="Latest Postings" count="+340 this week" link="View all" />
          {latest.length > 0 ? (
            <>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {latest.map((job) => (
                  <JobCardSmall key={job.id} job={job} />
                ))}
              </div>
              <div className="mt-5 flex justify-center">
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-full border border-violet-200 bg-white px-6 py-2 text-sm font-semibold text-violet-600 transition hover:border-violet-400 hover:bg-violet-50"
                >
                  <RefreshCw size={14} strokeWidth={2.2} /> Show more listings
                </button>
              </div>
            </>
          ) : (
            <EmptyHint>No postings match your current filters.</EmptyHint>
          )}
        </section>
        <aside>
          <MarketPulseSidebar
            skills={jobMarket.skillsInDemand}
            trendingRoles={jobMarket.trendingRoles}
          />
        </aside>
      </div>
    </div>
  )
}
