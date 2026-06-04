import React, { useEffect, useMemo, useRef, useState } from 'react'
import { jobMarket } from '../../data/mockData'

// All sections read from `jobMarket` in mockData.js. Swap that object with
// the AI backend response when ready — the components below stay the same.

const TAG_TONE = {
  violet: 'bg-violet-50 text-violet-600',
  teal: 'bg-teal-50 text-teal-600',
}

// ─── section header ────────────────────────────────────────────────────
function SectionHeader({ icon, title, count, link, accent = 'text-violet-600' }) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <h3 className="flex items-center gap-2 text-base font-bold text-slate-900">
        {icon && <span className={`text-lg ${accent}`}>{icon}</span>}
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
  // pending state lives in the modal — Apply commits it, Cancel discards.
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
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xl ${sector.iconBg}`}>
                  <span aria-hidden>{sector.emoji}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-900">{sector.name}</p>
                  <p className="text-xs text-slate-500">{sector.count} events</p>
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
        <span aria-hidden className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
        <input
          type="search"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search jobs, companies, skills..."
          className="h-10 w-full rounded-full border border-violet-100 bg-violet-50/40 pl-11 pr-10 text-sm outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white"
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
          className={`inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition ${
            open || committed.size > 0
              ? 'border-violet-500 bg-violet-50 text-violet-700'
              : 'border-violet-300 bg-white text-violet-600 hover:border-violet-400'
          }`}
        >
          <span aria-hidden>🏢</span>
          <span>Sectors</span>
          {committed.size > 0 && (
            <span className="inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-violet-600 px-1.5 text-[11px] font-bold text-white">
              {committed.size}
            </span>
          )}
          <span aria-hidden className={`text-[10px] transition-transform ${open ? 'rotate-180' : ''}`}>▼</span>
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

// ─── hero banner ───────────────────────────────────────────────────────
function HeroBanner({ hero }) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-violet-500 to-pink-500 p-8 text-white shadow-[0_18px_50px_rgba(108,99,255,0.25)]">
      <div className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-white/10" />
      <div className="absolute bottom-[-80px] right-20 h-52 w-52 rounded-full bg-white/5" />
      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
        <div className="flex-1">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/20 px-3 py-1 text-xs font-medium">
            <span aria-hidden>✨</span> {hero.eyebrow}
          </span>
          <h2 className="mt-3 text-2xl font-extrabold leading-tight sm:text-3xl">
            {hero.title.split('\n').map((line, i, arr) => (
              <React.Fragment key={i}>
                {line}
                {i < arr.length - 1 && <br />}
              </React.Fragment>
            ))}
          </h2>
          <p className="mt-2 text-sm text-white/80">{hero.subtitle}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {hero.skillTags.map((tag) => (
              <span key={tag} className="rounded-full border border-white/25 bg-white/15 px-3 py-1 text-xs font-medium">
                {tag}
              </span>
            ))}
          </div>
          <button
            type="button"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-violet-600 shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <span aria-hidden>🧭</span> {hero.ctaLabel}
          </button>
          <div className="mt-4 flex items-center gap-3">
            <div className="flex">
              {hero.avatars.map((av, i) => (
                <div
                  key={av.initials}
                  className={`flex h-7 w-7 items-center justify-center rounded-full border-2 border-white/60 text-[10px] font-semibold text-white ${av.color} ${i > 0 ? '-ml-2' : ''}`}
                >
                  {av.initials}
                </div>
              ))}
            </div>
            <span className="text-xs text-white/85">
              <strong className="text-white">{hero.socialProof.split(' ').slice(0, 2).join(' ')}</strong>{' '}
              {hero.socialProof.split(' ').slice(2).join(' ')}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── large split-layout job card (Most Relevant) ───────────────────────
function JobCardLarge({ job }) {
  const [saved, setSaved] = useState(job.isSaved ?? false)
  const [applied, setApplied] = useState(false)
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(108,99,255,0.12)]">
      <div className={`h-1 w-full bg-gradient-to-r ${job.accentGradient}`} />
      <div className="grid gap-0 sm:grid-cols-[minmax(0,1fr)_220px]">
        <div className="space-y-3 p-5">
          <div className="flex items-start gap-3">
            <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl ${job.logoBg}`}>
              <span aria-hidden>{job.logoEmoji}</span>
            </div>
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
              {saved ? '🔖' : '🏷'}
            </button>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {[
              { icon: '🏷', text: job.type },
              { icon: job.workMode === 'Remote' ? '🌐' : '📍', text: job.workMode },
              { icon: '📍', text: job.location },
              job.duration && { icon: '📅', text: job.duration },
            ]
              .filter(Boolean)
              .map((chip, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2.5 py-0.5 text-[11px] font-medium text-slate-600"
                >
                  <span aria-hidden>{chip.icon}</span> {chip.text}
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

          <p className="text-sm leading-relaxed text-slate-600">{job.summary}</p>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            {job.isNew && (
              <span className="inline-flex items-center gap-1 rounded-full bg-violet-100 px-2 py-0.5 text-[11px] font-semibold text-violet-700">
                <span aria-hidden>✨</span> Just posted
              </span>
            )}
            {job.expiringNote && (
              <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-2 py-0.5 text-[11px] font-semibold text-rose-700">
                <span aria-hidden>⏰</span> {job.expiringNote}
              </span>
            )}
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <span aria-hidden>🕘</span> {job.timeAgo}
            </span>
            <span className="ml-auto rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-600">
              {job.matchPercent}% Match
            </span>
          </div>
        </div>

        <div className="flex flex-col items-stretch gap-3 border-t border-slate-100 bg-slate-50 p-4 sm:border-l sm:border-t-0">
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
              {job.daysLeft <= 3 && '⚠ '}
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
            <span aria-hidden>{applied ? '✓' : '🚀'}</span>
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
    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white transition hover:-translate-y-0.5 hover:shadow-[0_8px_22px_rgba(108,99,255,0.10)]">
      <div className={`h-1 w-full bg-gradient-to-r ${job.accentGradient}`} />
      <div className="space-y-2 p-4">
        <div className="flex items-start gap-2.5">
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg ${job.logoBg}`}>
            <span aria-hidden>{job.logoEmoji}</span>
          </div>
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
            {saved ? '🔖' : '🏷'}
          </button>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[10px] font-medium text-slate-600">
            <span aria-hidden>🏷</span> {job.type}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[10px] font-medium text-slate-600">
            <span aria-hidden>{job.workMode === 'Remote' ? '🌐' : '📍'}</span> {job.workMode}
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
              <span aria-hidden>✨</span> New
            </span>
          )}
          <span className="flex items-center gap-1 text-[11px] text-slate-400">
            <span aria-hidden>🕘</span> {job.timeAgo}
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

// ─── expiring soon item ────────────────────────────────────────────────
function ExpiringItem({ item }) {
  const toneClasses = {
    urgent: 'text-rose-500',
    soon: 'text-amber-500',
    normal: 'text-slate-500',
  }
  const ctaClasses = {
    urgent: 'bg-rose-50 text-rose-600',
    soon: 'bg-amber-50 text-amber-700',
    normal: 'bg-slate-100 text-slate-500',
  }
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-3 transition hover:border-violet-200">
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-lg ${item.bg}`}>
        <span aria-hidden>{item.emoji}</span>
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-slate-900">{item.title}</p>
        <p className="truncate text-[11px] text-slate-500">{item.sub}</p>
      </div>
      <div className="flex flex-col items-end gap-0.5 text-right">
        <p className={`text-sm font-bold ${toneClasses[item.tone] ?? toneClasses.normal}`}>{item.daysLeft} day{item.daysLeft !== 1 ? 's' : ''}</p>
        <p className="text-[10px] text-slate-400">remaining</p>
        <span className={`mt-0.5 rounded-full px-2 py-0.5 text-[10px] font-semibold ${ctaClasses[item.tone] ?? ctaClasses.normal}`}>
          {item.cta}
        </span>
      </div>
    </div>
  )
}

// ─── right panel widgets ───────────────────────────────────────────────
function ProfileCard({ profile }) {
  const circumference = 2 * Math.PI * 34
  const offset = circumference * (1 - profile.completionPercent / 100)
  return (
    <div className="rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50 to-white p-5 text-center">
      <div className="relative mx-auto mb-3 h-20 w-20">
        <svg width="80" height="80" viewBox="0 0 80 80" className="-rotate-90">
          <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(108,99,255,0.15)" strokeWidth="8" />
          <circle
            cx="40"
            cy="40"
            r="34"
            fill="none"
            stroke="#6C63FF"
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-extrabold text-violet-600">{profile.completionPercent}%</span>
          <span className="text-[9px] text-slate-400">Profile</span>
        </div>
      </div>
      <p className="text-base font-bold text-slate-900">{profile.name}</p>
      <p className="text-xs text-slate-500">{profile.sub}</p>
      <div className="mt-3 flex flex-wrap justify-center gap-1.5">
        {profile.tags.map((tag) => (
          <span key={tag.label} className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${TAG_TONE[tag.tone] ?? 'bg-slate-100 text-slate-600'}`}>
            {tag.label}
          </span>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {profile.stats.map((stat) => (
          <div key={stat.label} className="rounded-lg border border-slate-100 bg-white p-2.5">
            <div className="text-lg font-bold text-slate-900">{stat.value}</div>
            <div className="text-[10px] text-slate-400">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SkillsInDemandPanel({ skills }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4">
      <h4 className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-900">
        <span aria-hidden className="text-violet-600">📊</span> Skills in Demand
      </h4>
      <div className="space-y-2.5">
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
  )
}

function TrendingRolesPanel({ items }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4">
      <h4 className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-900">
        <span aria-hidden className="text-violet-600">📈</span> Trending Roles
      </h4>
      <div className="divide-y divide-slate-100">
        {items.map((item) => (
          <div key={item.id} className="flex cursor-pointer items-center gap-3 py-2.5 first:pt-0 last:pb-0">
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-lg ${item.bg}`}>
              <span aria-hidden>{item.emoji}</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-900">{item.title}</p>
              <p className="text-[11px] text-slate-400">{item.meta}</p>
            </div>
            <span className="text-sm">{item.badge}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── categories + companies ────────────────────────────────────────────
function CategoriesRow({ categories }) {
  return (
    <div className="flex gap-2.5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {categories.map((cat) => (
        <div
          key={cat.id}
          className="flex shrink-0 cursor-pointer items-center gap-2.5 rounded-xl border border-slate-100 bg-white px-4 py-3 transition hover:border-violet-300"
        >
          <div className={`flex h-9 w-9 items-center justify-center rounded-lg text-lg ${cat.iconBg}`}>
            <span aria-hidden>{cat.emoji}</span>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-900">{cat.name}</p>
            <p className="text-[10px] text-slate-400">{cat.count} roles</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function CompaniesGrid({ companies }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {companies.map((co) => (
        <div
          key={co.id}
          className="cursor-pointer rounded-2xl border border-slate-100 bg-white p-4 text-center transition hover:-translate-y-0.5 hover:shadow-[0_8px_22px_rgba(108,99,255,0.10)]"
        >
          <div className={`mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${co.bg}`}>
            <span aria-hidden>{co.emoji}</span>
          </div>
          <p className="text-sm font-bold text-slate-900">{co.name}</p>
          <p className="text-[11px] text-slate-500">{co.industry}</p>
          <p className="mt-1 text-[11px] font-semibold text-violet-600">{co.openings} openings</p>
        </div>
      ))}
    </div>
  )
}

// ─── bottom cta ────────────────────────────────────────────────────────
function BottomCTA({ cta }) {
  return (
    <div className="flex flex-col items-start gap-4 rounded-3xl bg-gradient-to-r from-violet-600 to-pink-500 p-7 text-white sm:flex-row sm:items-center">
      <div className="flex-1">
        <h3 className="text-lg font-extrabold">{cta.title}</h3>
        <p className="mt-1 text-sm text-white/80">{cta.subtitle}</p>
      </div>
      <div className="flex shrink-0 gap-2">
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2 text-sm font-semibold text-violet-600 transition hover:bg-slate-50"
        >
          <span aria-hidden>🔔</span> {cta.primaryCta}
        </button>
        <button
          type="button"
          className="rounded-full border border-white/50 bg-transparent px-5 py-2 text-sm font-medium text-white transition hover:bg-white/10"
        >
          {cta.secondaryCta}
        </button>
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
    <div className="space-y-7">
      <SearchAndSectorBar
        search={search}
        onSearch={setSearch}
        committed={committedSectors}
        onApplyCommitted={setCommittedSectors}
        sectors={jobMarket.sectors}
      />

      <HeroBanner hero={jobMarket.hero} />

      <section>
        <SectionHeader
          icon="🎯"
          title="Most Relevant for You"
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

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <section>
          <SectionHeader icon="✨" title="Latest Postings" count="+340 this week" link="View all" />
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
                  <span aria-hidden>🔄</span> Show more listings
                </button>
              </div>
            </>
          ) : (
            <EmptyHint>No postings match your current filters.</EmptyHint>
          )}
        </section>
        <aside className="space-y-4">
          <ProfileCard profile={jobMarket.profile} />
          <SkillsInDemandPanel skills={jobMarket.skillsInDemand} />
          <TrendingRolesPanel items={jobMarket.trendingRoles} />
        </aside>
      </div>

      <section>
        <SectionHeader icon="⏰" title="Closing Soon" count={`${jobMarket.expiring.length} expiring`} link="View all" accent="text-rose-500" />
        <div className="grid gap-3 lg:grid-cols-2">
          {jobMarket.expiring.map((item) => (
            <ExpiringItem key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section>
        <SectionHeader icon="🗂" title="Browse by Category" />
        <CategoriesRow categories={jobMarket.categories} />
      </section>

      <section>
        <SectionHeader icon="🏢" title="Top Hiring Companies" link="All companies" />
        <CompaniesGrid companies={jobMarket.companies} />
      </section>

      <BottomCTA cta={jobMarket.bottomCta} />
    </div>
  )
}
