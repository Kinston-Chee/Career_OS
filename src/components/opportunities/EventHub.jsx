import React, { useEffect, useMemo, useRef, useState } from 'react'
import { eventHub } from '../../data/mockData'
import EventDetail from './EventDetail'

// All data lives in mockData.js → eventHub. Swap that object with the AI
// backend response when ready; the components below read whatever shape arrives.

const TYPE_BADGE_COLOR = {
  violet: 'bg-violet-100 text-violet-700',
  blue: 'bg-blue-100 text-blue-700',
  rose: 'bg-rose-100 text-rose-700',
  teal: 'bg-teal-100 text-teal-700',
  pink: 'bg-pink-100 text-pink-700',
  amber: 'bg-amber-100 text-amber-700',
  emerald: 'bg-emerald-100 text-emerald-700',
}

const DATE_CHIP_TONE = {
  violet: 'bg-violet-100 text-violet-700',
  rose: 'bg-rose-100 text-rose-700',
  teal: 'bg-teal-100 text-teal-700',
  amber: 'bg-amber-100 text-amber-700',
  emerald: 'bg-emerald-100 text-emerald-700',
}

const STATUS_PILL_TONE = {
  violet: 'bg-violet-100 text-violet-700',
  rose: 'bg-rose-100 text-rose-700',
  slate: 'bg-slate-100 text-slate-600',
}

// ─── search bar + sector dropdown ───────────────────────────────────────
function SearchAndSectorBar({ search, onSearch, sectorId, onSectorChange, sectors }) {
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef(null)
  const activeSector = sectors.find((s) => s.id === sectorId) ?? sectors[0]
  const isFiltered = sectorId !== 'all'

  // Close dropdown when clicking outside.
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
        <span aria-hidden className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          🔍
        </span>
        <input
          type="search"
          value={search}
          onChange={(event) => onSearch(event.target.value)}
          placeholder="Search events, topics, skills..."
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
          aria-haspopup="listbox"
          aria-expanded={open}
          className={`inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition ${
            open || isFiltered
              ? 'border-violet-500 bg-violet-50 text-violet-700'
              : 'border-violet-300 bg-white text-violet-600 hover:border-violet-400'
          }`}
        >
          <span aria-hidden>🏢</span>
          <span>{isFiltered ? activeSector.label : 'Sector'}</span>
          <span aria-hidden className={`text-[10px] transition-transform ${open ? 'rotate-180' : ''}`}>▼</span>
        </button>
        {open && (
          <div
            role="listbox"
            className="absolute right-0 z-30 mt-2 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white py-1 shadow-[0_12px_30px_rgba(15,23,42,0.12)]"
          >
            {sectors.map((sector) => {
              const selected = sector.id === sectorId
              return (
                <button
                  key={sector.id}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => {
                    onSectorChange(sector.id)
                    setOpen(false)
                  }}
                  className={`flex w-full items-center justify-between px-4 py-2 text-left text-sm transition ${
                    selected ? 'bg-violet-50 font-semibold text-violet-700' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{sector.label}</span>
                  {selected && <span aria-hidden>✓</span>}
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── small section header ───────────────────────────────────────────────
function SectionHeader({ icon, title, count, link, onLinkClick }) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <h3 className="flex items-center gap-2 text-base font-bold text-slate-900">
        {icon && <span className="text-lg">{icon}</span>}
        {title}
      </h3>
      {count && (
        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-500">{count}</span>
      )}
      {link && (
        <button
          type="button"
          onClick={onLinkClick}
          className="ml-auto flex items-center gap-1 text-xs font-semibold text-violet-600 transition hover:text-violet-700 hover:underline"
        >
          {link} <span aria-hidden>→</span>
        </button>
      )}
    </div>
  )
}

// ─── hero banner ────────────────────────────────────────────────────────
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
            {hero.title.split('\n').map((line, idx) => (
              <React.Fragment key={idx}>
                {line}
                {idx < hero.title.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
          </h2>
          <p className="mt-2 text-sm text-white/80">{hero.subtitle}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {hero.skillTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/25 bg-white/15 px-3 py-1 text-xs font-medium"
              >
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
              <strong className="text-white">{hero.socialProof.split(' ')[0]}</strong>{' '}
              {hero.socialProof.split(' ').slice(1).join(' ')}
            </span>
          </div>
        </div>
        <div className="hidden h-36 w-48 shrink-0 items-center justify-center rounded-2xl border border-white/25 bg-white/10 sm:flex">
          <svg viewBox="0 0 180 140" width="180" height="140" fill="none" aria-hidden="true">
            <rect x="20" y="20" width="140" height="100" rx="12" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.25)" />
            <rect x="30" y="30" width="60" height="40" rx="8" fill="rgba(255,255,255,0.15)" />
            <circle cx="50" cy="50" r="12" fill="rgba(255,255,255,0.25)" />
            <rect x="68" y="40" width="14" height="3" rx="2" fill="rgba(255,255,255,0.5)" />
            <rect x="68" y="47" width="10" height="3" rx="2" fill="rgba(255,255,255,0.3)" />
            <rect x="68" y="54" width="12" height="3" rx="2" fill="rgba(255,255,255,0.3)" />
            <rect x="100" y="30" width="50" height="40" rx="8" fill="rgba(255,255,255,0.1)" />
            <rect x="108" y="38" width="34" height="4" rx="2" fill="rgba(255,255,255,0.4)" />
            <rect x="108" y="46" width="28" height="4" rx="2" fill="rgba(255,255,255,0.25)" />
            <rect x="30" y="78" width="140" height="32" rx="8" fill="rgba(255,255,255,0.08)" />
            <circle cx="48" cy="94" r="8" fill="rgba(236,72,153,0.7)" />
            <rect x="62" y="88" width="40" height="4" rx="2" fill="rgba(255,255,255,0.4)" />
            <rect x="62" y="96" width="28" height="4" rx="2" fill="rgba(255,255,255,0.25)" />
            <circle cx="152" cy="94" r="8" fill="rgba(108,99,255,0.7)" />
            <path d="M149 94 L152 97 L156 91" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  )
}

// ─── deadline alert ─────────────────────────────────────────────────────
function DeadlineAlert({ alert }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
        <span aria-hidden>⏰</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="truncate text-sm font-semibold text-amber-900">{alert.title}</p>
        <p className="truncate text-xs text-amber-700">{alert.subtitle}</p>
      </div>
      <button
        type="button"
        className="shrink-0 rounded-full bg-amber-500 px-4 py-1.5 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-600"
      >
        {alert.ctaLabel}
      </button>
    </div>
  )
}

// ─── filter pills ───────────────────────────────────────────────────────
function FilterPills({ pills }) {
  const [active, setActive] = useState(pills[0]?.id)
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {pills.map((pill) => (
        <button
          key={pill.id}
          type="button"
          onClick={() => setActive(pill.id)}
          className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium transition ${
            active === pill.id
              ? 'border-violet-600 bg-violet-600 text-white'
              : 'border-violet-100 bg-white text-slate-600 hover:border-violet-300 hover:text-violet-600'
          }`}
        >
          <span aria-hidden>{pill.emoji}</span>
          {pill.label}
        </button>
      ))}
    </div>
  )
}

// ─── event card (used for trending grid) ────────────────────────────────
function EventCard({ event, onSelect }) {
  const [saved, setSaved] = useState(event.isSaved ?? false)
  return (
    <div
      onClick={() => onSelect?.(event)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect?.(event)
        }
      }}
      className="flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white transition hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(108,99,255,0.15)] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
    >
      <div className={`relative flex h-28 items-end bg-gradient-to-br ${event.thumbGradient} p-3`}>
        <span
          className={`absolute left-2.5 top-2.5 inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${TYPE_BADGE_COLOR[event.typeColor] ?? 'bg-slate-100 text-slate-700'}`}
        >
          {event.type}
        </span>
        {event.isHot ? (
          <span className="absolute right-2.5 top-2.5 rounded-full bg-rose-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
            🔥 Hot
          </span>
        ) : (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setSaved((v) => !v)
            }}
            aria-label={saved ? 'Unsave event' : 'Save event'}
            className={`absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-sm transition hover:bg-white ${
              saved ? 'text-violet-600' : 'text-slate-400'
            }`}
          >
            {saved ? '🔖' : '🏷'}
          </button>
        )}
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${event.iconBg}`}>
          <span aria-hidden>{event.emoji}</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-3.5">
        <p className="flex items-center gap-1 text-[11px] font-medium text-slate-400">
          <span aria-hidden>🏢</span> {event.org}
        </p>
        <h4 className="mt-1 text-sm font-bold leading-tight text-slate-900">{event.title}</h4>
        <div className="mt-2 space-y-0.5 text-xs text-slate-600">
          <p className="flex items-center gap-1.5">
            <span aria-hidden className="text-slate-400">📅</span> {event.date}
          </p>
          <p className="flex items-center gap-1.5">
            <span aria-hidden className="text-slate-400">{event.location === 'Online' ? '🌐' : '📍'}</span> {event.location}
          </p>
        </div>
        <div className="mt-auto flex items-center gap-2 border-t border-slate-100 pt-2.5">
          <span className="flex items-center gap-1 text-xs text-slate-600">
            <span aria-hidden>👥</span> {event.goingCount} {event.goingLabel}
          </span>
          {event.matchPercent != null && (
            <span className="ml-auto rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-600">
              {event.matchPercent}% Match
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── featured (large) recommended card ──────────────────────────────────
function FeaturedCard({ event, onSelect }) {
  return (
    <div
      onClick={() => onSelect?.(event)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect?.(event)
        }
      }}
      className="flex min-h-[260px] cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white transition hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(108,99,255,0.15)] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
    >
      <div className={`relative min-h-[160px] flex-1 bg-gradient-to-br ${event.thumbGradient} p-4`}>
        <div className="absolute inset-0 rounded-t-2xl bg-gradient-to-b from-transparent to-black/65" />
        {event.matchPercent != null && (
          <span className="absolute right-3 top-3 rounded-full bg-emerald-400/90 px-2.5 py-0.5 text-[11px] font-bold text-white shadow-sm">
            {event.matchPercent}% Match
          </span>
        )}
        <div className="relative flex h-full flex-col justify-end">
          <span className={`mb-2 inline-flex w-fit items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${TYPE_BADGE_COLOR[event.typeColor]}`}>
            {event.type}
          </span>
          <h4 className="text-lg font-extrabold leading-snug text-white">{event.title}</h4>
          <p className="text-xs text-white/75">{event.org}</p>
          <div className="mt-2 flex gap-1.5">
            {event.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-white/30 bg-white/20 px-2.5 py-0.5 text-[11px] text-white">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 p-4">
        <div className="flex-1 space-y-0.5 text-xs text-slate-600">
          <p className="flex items-center gap-1.5">
            <span aria-hidden className="text-slate-400">📅</span> {event.date}
          </p>
          <p className="flex items-center gap-1.5">
            <span aria-hidden className="text-slate-400">🌐</span> {event.location}
          </p>
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onSelect?.(event)
          }}
          className="flex shrink-0 items-center gap-1.5 rounded-full bg-violet-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-violet-700"
        >
          <span aria-hidden>→</span> {event.ctaLabel}
        </button>
      </div>
    </div>
  )
}

// ─── small recommended card (horizontal layout) ─────────────────────────
function MiniRecommendedCard({ event, onSelect }) {
  return (
    <div
      onClick={() => onSelect?.(event)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect?.(event)
        }
      }}
      className="flex cursor-pointer items-center overflow-hidden rounded-xl border border-slate-100 bg-white transition hover:-translate-y-0.5 hover:shadow-[0_8px_22px_rgba(108,99,255,0.12)] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
    >
      <div className={`flex h-20 w-20 shrink-0 items-center justify-center bg-gradient-to-br ${event.thumbGradient}`}>
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg text-xl ${event.iconBg}`}>
          <span aria-hidden>{event.emoji}</span>
        </div>
      </div>
      <div className="flex-1 px-3 py-3">
        <p className="flex items-center gap-1 text-[11px] font-medium text-slate-400">
          <span aria-hidden>{event.orgEmoji}</span> {event.org}
        </p>
        <h4 className="text-sm font-bold leading-tight text-slate-900">{event.title}</h4>
        <div className="mt-1.5 flex items-center gap-2 text-[11px] text-slate-500">
          <span className="flex items-center gap-1">
            <span aria-hidden>📅</span> {event.date}
          </span>
          {event.matchPercent != null && (
            <span className="ml-auto rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-600">
              {event.matchPercent}%
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── upcoming events ────────────────────────────────────────────────────
function UpcomingItem({ item, onSelect }) {
  return (
    <div
      onClick={() => onSelect?.(item)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect?.(item)
        }
      }}
      className="flex cursor-pointer items-center gap-4 rounded-xl border border-slate-100 bg-white p-3.5 transition hover:border-violet-200 hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
    >
      <div className={`flex h-13 w-12 flex-col items-center justify-center rounded-lg px-2 py-1.5 ${DATE_CHIP_TONE[item.tone] ?? 'bg-slate-100 text-slate-700'}`}>
        <span className="text-[10px] font-semibold uppercase tracking-wide">{item.month}</span>
        <span className="text-xl font-bold leading-none">{item.day}</span>
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-slate-900">{item.title}</p>
        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-slate-500">
          {item.meta.map((m, i) => (
            <span key={i} className="flex items-center gap-1">
              <span aria-hidden>{m.icon}</span> {m.text}
            </span>
          ))}
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        {item.matchPercent != null && (
          <span className="hidden rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-600 sm:inline-flex">
            {item.matchPercent}% Match
          </span>
        )}
        <span className="hidden whitespace-nowrap text-[11px] text-slate-400 sm:inline-flex sm:items-center sm:gap-1">
          <span aria-hidden>⏰</span> {item.countdown}
        </span>
        <span className={`rounded-full px-3 py-1 text-xs font-medium ${STATUS_PILL_TONE[item.statusTone] ?? STATUS_PILL_TONE.slate}`}>
          {item.status}
        </span>
      </div>
    </div>
  )
}

// ─── profile card (right column) ────────────────────────────────────────
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
          <span key={tag} className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-600">
            {tag}
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

// ─── popular this week panel ───────────────────────────────────────────
function PopularPanel({ items }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4">
      <h4 className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-900">
        <span aria-hidden className="text-violet-600">📈</span> Popular this week
      </h4>
      <div className="divide-y divide-slate-100">
        {items.map((item) => (
          <div key={item.id} className="flex cursor-pointer items-start gap-3 py-2.5 first:pt-0 last:pb-0">
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-xl ${item.bg}`}>
              <span aria-hidden>{item.emoji}</span>
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-900">{item.title}</p>
              <p className="text-[11px] text-slate-400">
                <span aria-hidden>👥 </span>
                {item.meta}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── skills strip ──────────────────────────────────────────────────────
function SkillsStrip({ areas }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {areas.map((area) => (
        <div
          key={area.id}
          className="cursor-pointer rounded-xl border border-slate-100 bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-[0_8px_22px_rgba(108,99,255,0.12)]"
        >
          <div className={`mb-2.5 flex h-10 w-10 items-center justify-center rounded-lg text-xl ${area.bg}`}>
            <span aria-hidden>{area.emoji}</span>
          </div>
          <p className="text-sm font-semibold text-slate-900">{area.name}</p>
          <p className="text-xs text-slate-400">{area.count}</p>
          <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-slate-100">
            <div className={`h-full rounded-full ${area.barColor}`} style={{ width: `${area.percent}%` }} />
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── categories ────────────────────────────────────────────────────────
function CategoriesRow({ categories }) {
  return (
    <div className="flex gap-2.5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {categories.map((cat) => (
        <div
          key={cat.id}
          className="flex shrink-0 cursor-pointer items-center gap-2.5 rounded-xl border border-slate-100 bg-white px-4 py-3 transition hover:border-violet-300"
        >
          <div className={`flex h-9 w-9 items-center justify-center rounded-lg text-lg ${cat.bg}`}>
            <span aria-hidden>{cat.emoji}</span>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-900">{cat.name}</p>
            <p className="text-[10px] text-slate-400">{cat.count}</p>
          </div>
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
          className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-violet-600 transition hover:bg-slate-50"
        >
          {cta.primaryCta}
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

// ─── empty-state hint shown when filters yield no results ───────────────
function EmptyHint({ children }) {
  return (
    <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/60 p-6 text-center text-sm text-slate-500">
      {children}
    </div>
  )
}

// Returns true when the event matches the search query. Searches title, org,
// type, location, and tags so the user can hit on a broad set of keywords.
function matchesQuery(event, query) {
  if (!query) return true
  const needle = query.toLowerCase()
  const haystack = [
    event.title,
    event.org,
    event.type,
    event.location,
    ...(event.tags ?? []),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
  return haystack.includes(needle)
}

function matchesSector(event, sectorId) {
  if (sectorId === 'all') return true
  return event.sector === sectorId
}

const CATEGORY_FILTERS = [
  { id: 'all', label: 'All Events' },
  { id: 'hackathons', label: 'Hackathons' },
  { id: 'case-competitions', label: 'Case Competitions' },
  { id: 'workshops', label: 'Workshops' },
  { id: 'talks', label: 'Talks' },
  { id: 'webinars', label: 'Webinars' },
  { id: 'networking', label: 'Networking' },
]

const FORMAT_OPTIONS = ['All', 'Online', 'Physical', 'Hybrid']
const INDUSTRY_OPTIONS = ['All', 'Technology', 'Finance', 'Consulting', 'Design', 'Marketing', 'Healthcare']
const MATCH_OPTIONS = ['All', '60%+', '70%+', '80%+', '90%+']
const DATE_OPTIONS = ['All', 'This Week', 'This Month', 'Upcoming']
const SORT_OPTIONS = ['Most Relevant', 'Most Popular', 'Highest Match', 'Newest', 'Ending Soon']

/**
 * @typedef {Object} TrendingEvent
 * @property {string} id
 * @property {string} type
 * @property {string} org
 * @property {string} title
 * @property {string} date
 * @property {string} location
 * @property {number} goingCount
 * @property {number} matchPercent
 * @property {string[]} tags
 * @property {string} category
 * @property {'Online' | 'Physical' | 'Hybrid'} format
 * @property {string} industry
 * @property {number} daysLeft
 * @property {string} ctaLabel
 */

const EXTRA_TRENDING_EVENTS = [
  {
    id: 'evt-trend-5',
    type: 'Webinar',
    typeColor: 'teal',
    thumbGradient: 'from-cyan-100 to-teal-200',
    iconBg: 'bg-cyan-500/20',
    emoji: '🎥',
    org: 'Harvard Business Review',
    title: 'Future of Work: Skills That Matter',
    date: '22 May 2025',
    location: 'Online',
    goingCount: 256,
    goingLabel: 'going',
    matchPercent: 74,
    sector: 'business',
    tags: ['Leadership', 'Future Work', 'Communication'],
    category: 'webinars',
    format: 'Online',
    industry: 'Consulting',
    daysLeft: 4,
    createdOrder: 8,
    ctaLabel: 'Join Waitlist',
  },
  {
    id: 'evt-trend-6',
    type: 'Talk',
    typeColor: 'violet',
    thumbGradient: 'from-violet-100 to-indigo-200',
    iconBg: 'bg-violet-500/20',
    emoji: '💬',
    org: 'Dr. Sarah Chen (AI Researcher)',
    title: 'The Ethics of AI in the Real World',
    date: '23 May 2025',
    location: 'Online',
    goingCount: 189,
    goingLabel: 'going',
    matchPercent: 81,
    sector: 'data',
    tags: ['AI Ethics', 'Research', 'Policy'],
    category: 'talks',
    format: 'Online',
    industry: 'Technology',
    daysLeft: 5,
    createdOrder: 7,
    ctaLabel: 'Join Waitlist',
  },
  {
    id: 'evt-trend-7',
    type: 'Workshop',
    typeColor: 'amber',
    thumbGradient: 'from-amber-100 to-yellow-200',
    iconBg: 'bg-amber-500/20',
    emoji: '🚀',
    org: 'Figma',
    title: 'UI/UX Design Sprint with Figma',
    date: '24 May 2025',
    location: 'Kuala Lumpur',
    goingCount: 178,
    goingLabel: 'going',
    matchPercent: 86,
    sector: 'design',
    tags: ['UX', 'Figma', 'Design Sprint'],
    category: 'workshops',
    format: 'Physical',
    industry: 'Design',
    daysLeft: 6,
    createdOrder: 6,
    ctaLabel: 'Register',
  },
  {
    id: 'evt-trend-8',
    type: 'Hackathon',
    typeColor: 'blue',
    thumbGradient: 'from-sky-100 to-blue-200',
    iconBg: 'bg-blue-500/20',
    emoji: '</>',
    org: 'MLH (Major League Hacking)',
    title: 'Build for Impact Hackathon',
    date: '24-25 May 2025',
    location: 'Online',
    goingCount: 205,
    goingLabel: 'joined',
    matchPercent: 91,
    sector: 'computer-science',
    tags: ['Code', 'Social Impact', 'Cloud'],
    category: 'hackathons',
    format: 'Online',
    industry: 'Technology',
    daysLeft: 6,
    createdOrder: 5,
    ctaLabel: 'Register',
    isNew: true,
  },
  {
    id: 'evt-trend-9',
    type: 'Case Comp',
    typeColor: 'rose',
    thumbGradient: 'from-rose-100 to-pink-200',
    iconBg: 'bg-rose-500/15',
    emoji: '📊',
    org: 'BCG (Boston Consulting Group)',
    title: 'BCG Strategy Case Challenge',
    date: '25 May 2025',
    location: 'Online',
    goingCount: 156,
    goingLabel: 'going',
    matchPercent: 93,
    sector: 'business',
    tags: ['Strategy', 'Consulting', 'Cases'],
    category: 'case-competitions',
    format: 'Online',
    industry: 'Consulting',
    daysLeft: 7,
    createdOrder: 4,
    ctaLabel: 'Register',
  },
  {
    id: 'evt-trend-10',
    type: 'Networking',
    typeColor: 'emerald',
    thumbGradient: 'from-emerald-100 to-green-200',
    iconBg: 'bg-emerald-500/20',
    emoji: '🤝',
    org: 'Women in Tech Malaysia',
    title: 'Tech Careers Networking Night',
    date: '26 May 2025',
    location: 'Kuala Lumpur',
    goingCount: 224,
    goingLabel: 'going',
    matchPercent: 78,
    sector: 'computer-science',
    tags: ['Mentorship', 'Community', 'Careers'],
    category: 'networking',
    format: 'Physical',
    industry: 'Technology',
    daysLeft: 8,
    createdOrder: 3,
    ctaLabel: 'Register',
  },
  {
    id: 'evt-trend-11',
    type: 'Webinar',
    typeColor: 'teal',
    thumbGradient: 'from-teal-100 to-emerald-200',
    iconBg: 'bg-teal-500/20',
    emoji: '🌐',
    org: 'LinkedIn Learning',
    title: 'Breaking into Product Management',
    date: '26 May 2025',
    location: 'Online',
    goingCount: 312,
    goingLabel: 'going',
    matchPercent: 69,
    sector: 'business',
    tags: ['Product', 'Career', 'Roadmaps'],
    category: 'webinars',
    format: 'Online',
    industry: 'Marketing',
    daysLeft: 8,
    createdOrder: 2,
    ctaLabel: 'Join Waitlist',
  },
  {
    id: 'evt-trend-12',
    type: 'Workshop',
    typeColor: 'amber',
    thumbGradient: 'from-orange-100 to-amber-200',
    iconBg: 'bg-orange-500/20',
    emoji: '🔒',
    org: 'Google Cloud',
    title: 'Intro to Cloud Security Workshop',
    date: '28 May 2025',
    location: 'Online',
    goingCount: 133,
    goingLabel: 'going',
    matchPercent: 84,
    sector: 'computer-science',
    tags: ['Cloud', 'Security', 'GCP'],
    category: 'workshops',
    format: 'Online',
    industry: 'Technology',
    daysLeft: 10,
    createdOrder: 1,
    ctaLabel: 'Join Waitlist',
  },
]

function categoryForType(type) {
  const normalized = type?.toLowerCase()
  if (normalized?.includes('hack')) return 'hackathons'
  if (normalized?.includes('case')) return 'case-competitions'
  if (normalized?.includes('workshop')) return 'workshops'
  if (normalized?.includes('talk')) return 'talks'
  if (normalized?.includes('webinar')) return 'webinars'
  if (normalized?.includes('network')) return 'networking'
  return 'all'
}

function formatForLocation(location) {
  if (location === 'Online') return 'Online'
  if (location?.toLowerCase().includes('hybrid')) return 'Hybrid'
  return 'Physical'
}

function industryForSector(sector, type) {
  if (type === 'Case Comp') return 'Consulting'
  if (sector === 'design') return 'Design'
  if (sector === 'finance') return 'Finance'
  if (sector === 'marketing') return 'Marketing'
  if (sector === 'business') return 'Consulting'
  return 'Technology'
}

function enrichTrendingEvent(event, index) {
  return {
    ...event,
    category: event.category ?? categoryForType(event.type),
    format: event.format ?? formatForLocation(event.location),
    industry: event.industry ?? industryForSector(event.sector, event.type),
    daysLeft: event.daysLeft ?? index + 2,
    createdOrder: event.createdOrder ?? 20 - index,
    ctaLabel: event.ctaLabel ?? (event.matchPercent >= 90 ? 'Register' : 'Join Waitlist'),
  }
}

function FilterChip({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`shrink-0 rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-200 ${
        active
          ? 'border-violet-600 bg-violet-600 text-white shadow-[0_10px_22px_rgba(124,58,237,0.25)]'
          : 'border-slate-200 bg-white text-slate-600 hover:border-violet-300 hover:text-violet-700'
      }`}
    >
      {label}
    </button>
  )
}

function FilterSelect({ label, value, options, onChange }) {
  return (
    <label className="min-w-0 flex-1 text-xs font-semibold text-slate-500">
      <span>{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1 h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-50"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  )
}

function ModalShell({ titleId, isOpen, onClose, children }) {
  const modalRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return undefined
    const previousOverflow = document.body.style.overflow
    const previousActive = document.activeElement
    document.body.style.overflow = 'hidden'

    window.requestAnimationFrame(() => {
      const firstFocusable = modalRef.current?.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )
      firstFocusable?.focus()
    })

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab' || !modalRef.current) return
      const focusable = Array.from(
        modalRef.current.querySelectorAll(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      )
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
      previousActive?.focus?.()
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 px-3 py-4 backdrop-blur-[2px] event-modal-backdrop sm:px-6"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="event-modal-panel flex max-h-[92vh] w-full max-w-7xl flex-col overflow-hidden rounded-2xl border border-white/70 bg-white shadow-[0_30px_90px_rgba(15,23,42,0.35)]"
      >
        {children}
      </section>
    </div>
  )
}

function TrendingModalCard({ event, index, onSelect }) {
  return (
    <article
      className="event-card-stagger flex min-h-[230px] flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:border-violet-200 hover:shadow-[0_18px_38px_rgba(15,23,42,0.12)]"
      style={{ animationDelay: `${Math.min(index, 12) * 35}ms` }}
    >
      <div className={`relative flex h-28 items-end bg-gradient-to-br ${event.thumbGradient} p-3`}>
        <span
          className={`absolute left-3 top-3 inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold ${TYPE_BADGE_COLOR[event.typeColor] ?? 'bg-white/80 text-slate-700'}`}
        >
          {event.type}
        </span>
        {(event.isHot || event.isNew) && (
          <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-violet-700">
            {event.isHot ? 'Hot' : 'New'}
          </span>
        )}
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl ${event.iconBg}`}>
          <span aria-hidden>{event.emoji}</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="truncate text-[11px] font-semibold text-slate-400">{event.org}</p>
        <h4 className="mt-1 line-clamp-2 min-h-[40px] text-sm font-bold leading-tight text-slate-950">{event.title}</h4>
        <div className="mt-3 space-y-1 text-xs text-slate-600">
          <p className="flex items-center gap-1.5">
            <span aria-hidden className="text-blue-500">▣</span>
            {event.date}
          </p>
          <p className="flex items-center gap-1.5">
            <span aria-hidden className="text-blue-500">⌖</span>
            {event.location}
          </p>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {(event.tags ?? []).slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-center gap-2 border-t border-slate-100 pt-3">
          <span className="text-xs font-medium text-slate-600">{event.goingCount} {event.goingLabel}</span>
          <span className="ml-auto rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600">
            {event.matchPercent}% Match
          </span>
        </div>
        <button
          type="button"
          onClick={() => onSelect?.(event)}
          className="mt-3 h-9 rounded-xl bg-violet-600 px-3 text-sm font-bold text-white shadow-sm transition hover:bg-violet-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
        >
          {event.ctaLabel}
        </button>
      </div>
    </article>
  )
}

function AllTrendingEventsModal({ isOpen, onClose, events, onSelect }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [format, setFormat] = useState('All')
  const [industry, setIndustry] = useState('All')
  const [matchScore, setMatchScore] = useState('All')
  const [date, setDate] = useState('All')
  const [sort, setSort] = useState('Most Relevant')

  const resetFilters = () => {
    setQuery('')
    setCategory('all')
    setFormat('All')
    setIndustry('All')
    setMatchScore('All')
    setDate('All')
    setSort('Most Relevant')
  }

  const filteredEvents = useMemo(() => {
    const minMatch = matchScore === 'All' ? 0 : Number.parseInt(matchScore, 10)
    const needle = query.trim().toLowerCase()

    const filtered = events.filter((event) => {
      const searchable = [event.title, event.org, event.type, event.category, event.industry, ...(event.tags ?? [])]
        .join(' ')
        .toLowerCase()

      if (needle && !searchable.includes(needle)) return false
      if (category !== 'all' && event.category !== category) return false
      if (format !== 'All' && event.format !== format) return false
      if (industry !== 'All' && event.industry !== industry) return false
      if ((event.matchPercent ?? 0) < minMatch) return false
      if (date === 'This Week' && event.daysLeft > 7) return false
      if (date === 'This Month' && event.daysLeft > 30) return false
      if (date === 'Upcoming' && event.daysLeft < 0) return false
      return true
    })

    return [...filtered].sort((a, b) => {
      if (sort === 'Most Popular') return b.goingCount - a.goingCount
      if (sort === 'Highest Match') return b.matchPercent - a.matchPercent
      if (sort === 'Newest') return b.createdOrder - a.createdOrder
      if (sort === 'Ending Soon') return a.daysLeft - b.daysLeft
      return (b.matchPercent * 2 + b.goingCount / 20) - (a.matchPercent * 2 + a.goingCount / 20)
    })
  }, [category, date, events, format, industry, matchScore, query, sort])

  return (
    <ModalShell isOpen={isOpen} onClose={onClose} titleId="all-trending-events-title">
      <div className="shrink-0 border-b border-slate-100 bg-white px-5 py-5 sm:px-7">
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <h2 id="all-trending-events-title" className="flex items-center gap-2 text-xl font-extrabold text-slate-950 sm:text-2xl">
              <span aria-hidden>🔥</span>
              All Trending Events
            </h2>
            <p className="mt-2 text-sm text-slate-500">Explore what's trending in your community and beyond.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close all trending events"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-xl leading-none text-slate-500 transition hover:border-slate-300 hover:text-slate-900"
          >
            ×
          </button>
        </div>

        <div className="mt-5 grid gap-3 lg:grid-cols-[minmax(0,1fr)_240px]">
          <label className="relative">
            <span className="sr-only">Search trending events</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search events, organizers, categories, skills..."
              className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-4 pr-10 text-sm outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-50"
            />
            <span aria-hidden className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">⌕</span>
          </label>
          <FilterSelect label="Sort by" value={sort} options={SORT_OPTIONS} onChange={setSort} />
        </div>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" aria-label="Event categories">
          {CATEGORY_FILTERS.map((item) => (
            <FilterChip
              key={item.id}
              label={item.label}
              active={category === item.id}
              onClick={() => setCategory(item.id)}
            />
          ))}
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <FilterSelect label="Event Format" value={format} options={FORMAT_OPTIONS} onChange={setFormat} />
          <FilterSelect label="Industry" value={industry} options={INDUSTRY_OPTIONS} onChange={setIndustry} />
          <FilterSelect label="Match Score" value={matchScore} options={MATCH_OPTIONS} onChange={setMatchScore} />
          <FilterSelect label="Date" value={date} options={DATE_OPTIONS} onChange={setDate} />
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto scroll-smooth bg-slate-50/60 px-5 py-5 sm:px-7">
        {filteredEvents.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {filteredEvents.map((event, index) => (
              <TrendingModalCard key={event.id} event={event} index={index} onSelect={onSelect} />
            ))}
          </div>
        ) : (
          <div className="flex min-h-[260px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center">
            <p className="text-base font-bold text-slate-900">No events match your current filters.</p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-4 rounded-xl bg-violet-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-violet-700"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </ModalShell>
  )
}

// Normalizes an "upcoming" item (date chip shape) into the event shape the
// detail page expects, so a click on any list works the same way.
function normalizeUpcomingForDetail(item) {
  if (!item) return item
  if (item.title && item.date) return item // already event-shaped
  const monthMap = { JAN: 'Jan', FEB: 'Feb', MAR: 'Mar', APR: 'Apr', MAY: 'May', JUN: 'Jun', JUL: 'Jul', AUG: 'Aug', SEP: 'Sep', OCT: 'Oct', NOV: 'Nov', DEC: 'Dec' }
  const dateString = `${item.day} ${monthMap[item.month] ?? item.month} 2025`
  const location = item.meta?.find((m) => m.text)?.text
  const time = item.meta?.find((m) => /AM|PM/i.test(m.text))?.text
  return {
    ...item,
    title: item.title,
    date: dateString,
    time,
    location,
  }
}

// ─── main composition ─────────────────────────────────────────────────
export default function EventHub() {
  // Search + sector filter live here so every downstream list reacts.
  const [search, setSearch] = useState('')
  const [sectorId, setSectorId] = useState('all')

  // When set, render the EventDetail view instead of the hub.
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [isTrendsModalOpen, setIsTrendsModalOpen] = useState(false)

  const matches = (event) => matchesQuery(event, search) && matchesSector(event, sectorId)

  const trending = useMemo(() => eventHub.trending.filter(matches), [search, sectorId])
  const allTrendingEvents = useMemo(
    () => [...eventHub.trending, ...EXTRA_TRENDING_EVENTS].map(enrichTrendingEvent),
    [],
  )
  const recommendedSmall = useMemo(() => eventHub.recommendedSmall.filter(matches), [search, sectorId])
  const upcoming = useMemo(() => eventHub.upcoming.filter(matches), [search, sectorId])
  const featuredMatches = matches(eventHub.recommendedFeatured)

  const isFiltered = Boolean(search) || sectorId !== 'all'

  const openDetail = (event) => {
    setIsTrendsModalOpen(false)
    setSelectedEvent(normalizeUpcomingForDetail(event))
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const closeDetail = () => setSelectedEvent(null)

  // If an event is selected, render the detail page in place of the hub.
  if (selectedEvent) {
    return <EventDetail event={selectedEvent} onBack={closeDetail} />
  }

  return (
    <div className="space-y-7">
      <SearchAndSectorBar
        search={search}
        onSearch={setSearch}
        sectorId={sectorId}
        onSectorChange={setSectorId}
        sectors={eventHub.sectors}
      />

      <FilterPills pills={eventHub.filterPills} />

      <HeroBanner hero={eventHub.hero} />

      <DeadlineAlert alert={eventHub.deadlineAlert} />

      <section>
        <SectionHeader
          icon="🔥"
          title="Trending Now"
          count={`${trending.length} ${trending.length === 1 ? 'event' : 'events'}`}
          link="View all trends"
          onLinkClick={() => setIsTrendsModalOpen(true)}
        />
        {trending.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {trending.map((event) => (
              <EventCard key={event.id} event={event} onSelect={openDetail} />
            ))}
          </div>
        ) : (
          <EmptyHint>No trending events match the current filters.</EmptyHint>
        )}
      </section>

      <section>
        <SectionHeader icon="✨" title="Recommended for You" link="See all" />
        {featuredMatches || recommendedSmall.length > 0 ? (
          <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr_1fr]">
            {featuredMatches ? (
              <FeaturedCard event={eventHub.recommendedFeatured} onSelect={openDetail} />
            ) : (
              <EmptyHint>No featured pick matches the filter.</EmptyHint>
            )}
            <div className="flex flex-col gap-4">
              {recommendedSmall.slice(0, 2).map((event) => (
                <MiniRecommendedCard key={event.id} event={event} onSelect={openDetail} />
              ))}
            </div>
            <div className="flex flex-col gap-4">
              {recommendedSmall.slice(2, 4).map((event) => (
                <MiniRecommendedCard key={event.id} event={event} onSelect={openDetail} />
              ))}
            </div>
          </div>
        ) : (
          <EmptyHint>No recommendations match the current filters.</EmptyHint>
        )}
      </section>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <section>
          <SectionHeader icon="🗓" title="Your Upcoming Events" link="Full calendar" />
          <div className="space-y-3">
            {upcoming.length > 0 ? (
              upcoming.map((item) => <UpcomingItem key={item.id} item={item} onSelect={openDetail} />)
            ) : (
              <EmptyHint>
                {isFiltered ? 'No upcoming events match the current filters.' : 'Nothing on your calendar yet.'}
              </EmptyHint>
            )}
          </div>
        </section>
        <aside className="space-y-5">
          <ProfileCard profile={eventHub.profile} />
          <PopularPanel items={eventHub.popularThisWeek} />
        </aside>
      </div>

      <section>
        <SectionHeader icon="🧠" title="Browse by Skill Area" />
        <SkillsStrip areas={eventHub.skillAreas} />
      </section>

      <section>
        <SectionHeader icon="🗂" title="Explore Categories" />
        <CategoriesRow categories={eventHub.categories} />
      </section>

      <BottomCTA cta={eventHub.bottomCta} />

      <AllTrendingEventsModal
        isOpen={isTrendsModalOpen}
        onClose={() => setIsTrendsModalOpen(false)}
        events={allTrendingEvents}
        onSelect={openDetail}
      />
    </div>
  )
}
