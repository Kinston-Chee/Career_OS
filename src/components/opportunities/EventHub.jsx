import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
  Bookmark,
  Briefcase,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Code2,
  Coffee,
  FileText,
  Filter,
  Flame,
  Globe2,
  Handshake,
  HeartPulse,
  Lightbulb,
  MapPin,
  Megaphone,
  MessageCircle,
  Mic,
  MonitorPlay,
  Puzzle,
  RefreshCw,
  Search,
  Shield,
  Sparkles,
  Target,
  Trophy,
  Users,
} from 'lucide-react'
import { eventHub } from '../../data/mockData'
import EventDetail from './EventDetail'
import { useCareerStore } from '../../store/useCareerStore'
import MyCareerCalendarModal from '../calendar/MyCareerCalendarModal'

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

const categoryIconMap = {
  all: FileText,
  hackathons: Code2,
  'case-competitions': Trophy,
  workshops: Building2,
  talks: Mic,
  webinars: Globe2,
  networking: Handshake,
}

const eventIconMap = {
  hackathons: Code2,
  'case-competitions': Trophy,
  workshops: Building2,
  talks: Mic,
  webinars: Globe2,
  networking: Handshake,
}

const topicIconMap = {
  video: MonitorPlay,
  chat: MessageCircle,
  launch: Sparkles,
  code: Code2,
  data: Target,
  partner: Handshake,
  global: Globe2,
  security: Shield,
  puzzle: Puzzle,
  growth: Target,
  mic: Mic,
  coffee: Coffee,
  health: HeartPulse,
  laptop: Code2,
}

function IconTile({ icon: Icon = Sparkles, className = 'h-9 w-9 border-violet-100 bg-violet-50 text-violet-600', size = 18 }) {
  return (
    <span className={`inline-flex shrink-0 items-center justify-center rounded-xl border ${className}`}>
      <Icon size={size} strokeWidth={2.2} />
    </span>
  )
}

function categoryIconFor(category) {
  return categoryIconMap[category.id] ?? categoryIconMap[category.category] ?? Sparkles
}

function eventIconFor(event) {
  return eventIconMap[event.category] ?? topicIconMap[event.iconKey] ?? Sparkles
}

// ─── unified search + filter bar ────────────────────────────────────────
function SearchFilterBar({ search, onSearch, sectorId, onSectorChange, sectors, activeCategory, onCategoryChange, categories }) {
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef(null)
  const activeSector = sectors.find((s) => s.id === sectorId) ?? sectors[0]
  const isFiltered = sectorId !== 'all'

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
    <div className="space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search size={16} strokeWidth={2.2} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={search}
            onChange={(event) => onSearch(event.target.value)}
            placeholder="Search events, topics, skills..."
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
            aria-haspopup="listbox"
            aria-expanded={open}
            className={`inline-flex h-10 items-center gap-2 rounded-xl border px-4 text-sm font-semibold transition ${
              open || isFiltered
                ? 'border-violet-500 bg-violet-50 text-violet-700'
                : 'border-slate-200 bg-white text-slate-600 hover:border-violet-300'
            }`}
          >
            <Filter size={16} strokeWidth={2.2} />
            <span>{isFiltered ? activeSector.label : 'Sector'}</span>
            <ChevronDown size={14} strokeWidth={2.2} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
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
                    {selected && <Check size={14} strokeWidth={2.2} />}
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </div>
      {/* Inline filter chips */}
      <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => onCategoryChange(cat.id)}
            className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium transition ${
              activeCategory === cat.id
                ? 'border-violet-600 bg-violet-600 text-white shadow-[0_4px_12px_rgba(124,58,237,0.25)]'
                : 'border-slate-200 bg-white text-slate-600 hover:border-violet-300 hover:text-violet-600'
            }`}
          >
            {React.createElement(categoryIconFor(cat), { size: 13, strokeWidth: 2.2 })}
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── section header ─────────────────────────────────────────────────────
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

// ─── deadline alert ─────────────────────────────────────────────────────
function DeadlineAlert({ alert }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-amber-200/80 bg-gradient-to-r from-amber-50/80 to-orange-50/60 p-3.5">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
        <Clock3 size={15} strokeWidth={2.2} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="truncate text-sm font-semibold text-amber-900">{alert.title}</p>
        <p className="truncate text-xs text-amber-700/80">{alert.subtitle}</p>
      </div>
      <button
        type="button"
        className="shrink-0 rounded-lg bg-amber-500 px-4 py-1.5 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-600"
      >
        {alert.ctaLabel}
      </button>
    </div>
  )
}

// ─── event card (unified feed) ──────────────────────────────────────────
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
      className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition-all duration-200 hover:-translate-y-1 hover:border-violet-200 hover:shadow-[0_16px_40px_rgba(108,99,255,0.12)] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
    >
      <div className={`relative flex h-28 items-end bg-gradient-to-br ${event.thumbGradient} p-3`}>
        <span
          className={`absolute left-2.5 top-2.5 inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${TYPE_BADGE_COLOR[event.typeColor] ?? 'bg-slate-100 text-slate-700'}`}
        >
          {event.type}
        </span>
        {event.matchPercent != null && (
          <span className="absolute right-2.5 top-2.5 rounded-full bg-emerald-500/90 px-2 py-0.5 text-[10px] font-bold text-white shadow-sm">
            {event.matchPercent}%
          </span>
        )}
        {event.isHot && (
          <span className="absolute right-2.5 bottom-2.5 rounded-full bg-rose-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
            <Flame size={10} fill="currentColor" strokeWidth={2.2} /> Hot
          </span>
        )}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            setSaved((v) => !v)
          }}
          aria-label={saved ? 'Unsave event' : 'Save event'}
          className={`absolute right-2.5 ${event.isHot ? 'bottom-8' : event.matchPercent != null ? 'top-8' : 'top-2.5'} flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-sm opacity-0 transition-opacity group-hover:opacity-100 hover:bg-white ${
            saved ? 'text-violet-600 !opacity-100' : 'text-slate-400'
          }`}
        >
          {saved ? <Bookmark size={14} fill="currentColor" strokeWidth={2.2} /> : <Bookmark size={14} strokeWidth={2.2} />}
        </button>
        <IconTile icon={eventIconFor(event)} className={`h-11 w-11 ${event.iconBg} border-slate-100`} size={20} />
      </div>
      <div className="flex flex-1 flex-col p-3.5">
        <p className="flex items-center gap-1 text-[11px] font-medium text-slate-400">
          <Building2 size={12} strokeWidth={2.2} /> {event.org}
        </p>
        <h4 className="mt-1 line-clamp-2 min-h-[36px] text-sm font-bold leading-tight text-slate-900">{event.title}</h4>
        <div className="mt-2 flex items-center gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <CalendarDays size={12} strokeWidth={2.2} className="text-slate-400" /> {event.date}
          </span>
          <span className="flex items-center gap-1">
            {event.location === 'Online' ? <Globe2 size={12} strokeWidth={2.2} className="text-slate-400" /> : <MapPin size={12} strokeWidth={2.2} className="text-slate-400" />} {event.location}
          </span>
        </div>
        <div className="mt-2.5 flex flex-wrap gap-1">
          {(event.tags ?? []).slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-center gap-2 border-t border-slate-100 pt-2.5">
          <span className="flex items-center gap-1 text-xs text-slate-500">
            <Users size={12} strokeWidth={2.2} /> {event.goingCount} {event.goingLabel}
          </span>
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
      className="flex cursor-pointer items-center gap-4 rounded-xl border border-slate-200/80 bg-white p-3.5 transition hover:border-violet-200 hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
    >
      <div className={`flex h-12 w-11 flex-col items-center justify-center rounded-lg px-2 py-1.5 ${DATE_CHIP_TONE[item.tone] ?? 'bg-slate-100 text-slate-700'}`}>
        <span className="text-[10px] font-semibold uppercase tracking-wide">{item.month}</span>
        <span className="text-lg font-bold leading-none">{item.day}</span>
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-slate-900">{item.title}</p>
        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-slate-500">
          {item.meta.map((m, i) => (
            <span key={i} className="flex items-center gap-1">
              {typeof m.icon === 'function'
                ? React.createElement(m.icon, { size: 12, strokeWidth: 2.2 })
                : m.icon === 'location-online'
                  ? <Globe2 size={12} strokeWidth={2.2} />
                  : m.icon === 'location'
                    ? <MapPin size={12} strokeWidth={2.2} />
                    : m.icon === 'time'
                      ? <Clock3 size={12} strokeWidth={2.2} />
                      : m.icon === 'people'
                        ? <Users size={12} strokeWidth={2.2} />
                        : <CalendarDays size={12} strokeWidth={2.2} />} {m.text}
            </span>
          ))}
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        {item.matchPercent != null && (
          <span className="hidden rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-600 sm:inline-flex">
            {item.matchPercent}%
          </span>
        )}
        <span className="hidden whitespace-nowrap text-[11px] text-slate-400 sm:inline-flex sm:items-center sm:gap-1">
          <Clock3 size={12} strokeWidth={2.2} /> {item.countdown}
        </span>
        <span className={`rounded-full px-3 py-1 text-xs font-medium ${STATUS_PILL_TONE[item.statusTone] ?? STATUS_PILL_TONE.slate}`}>
          {item.status}
        </span>
      </div>
    </div>
  )
}

// ─── event categories sidebar ───────────────────────────────────────────
function EventCategoriesSidebar({ categories }) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5">
      <h4 className="mb-4 flex items-center gap-2 text-sm font-bold text-slate-900">
        <FileText size={16} strokeWidth={2.2} className="text-violet-600" /> Event Categories
      </h4>
      <div className="space-y-2">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition hover:bg-slate-50"
          >
            <IconTile icon={categoryIconFor(cat)} className={`h-8 w-8 ${cat.bg} border-slate-100`} size={15} />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-700">{cat.name}</p>
            </div>
            <span className="text-[11px] font-medium text-slate-400">{cat.count}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── empty hint ─────────────────────────────────────────────────────────
function EmptyHint({ children }) {
  return (
    <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/60 p-6 text-center text-sm text-slate-500">
      {children}
    </div>
  )
}

// Returns true when the event matches the search query.
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

const EXTRA_TRENDING_EVENTS = [
  {
    id: 'evt-trend-5',
    type: 'Webinar',
    typeColor: 'teal',
    thumbGradient: 'from-cyan-100 to-teal-200',
    iconBg: 'bg-cyan-500/20',
    iconKey: 'video',
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
    iconKey: 'chat',
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
    iconKey: 'launch',
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
    iconKey: 'code',
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
    iconKey: 'data',
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
    iconKey: 'partner',
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
    iconKey: 'global',
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
    iconKey: 'security',
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

const EXTRA_RECOMMENDED_EVENTS = [
  {
    id: 'evt-rec-modal-5',
    type: 'Workshop',
    typeColor: 'teal',
    thumbGradient: 'from-teal-100 to-emerald-200',
    iconBg: 'bg-teal-500/20',
    iconKey: 'puzzle',
    org: 'Product School',
    title: 'Product Analytics Bootcamp',
    date: '25 May 2025',
    location: 'Online',
    goingCount: 286,
    goingLabel: 'going',
    matchPercent: 89,
    sector: 'business',
    tags: ['Product', 'Analytics', 'Metrics'],
    category: 'workshops',
    format: 'Online',
    industry: 'Technology',
    daysLeft: 7,
    createdOrder: 9,
    ctaLabel: 'Register',
  },
  {
    id: 'evt-rec-modal-6',
    type: 'Case Comp',
    typeColor: 'rose',
    thumbGradient: 'from-rose-100 to-orange-200',
    iconBg: 'bg-rose-500/15',
    iconKey: 'growth',
    org: 'CIMB Future Leaders',
    title: 'Fintech Strategy Case Challenge',
    date: '27 May 2025',
    location: 'Hybrid',
    goingCount: 198,
    goingLabel: 'joined',
    matchPercent: 83,
    sector: 'finance',
    tags: ['Finance', 'Strategy', 'Pitching'],
    category: 'case-competitions',
    format: 'Hybrid',
    industry: 'Finance',
    daysLeft: 9,
    createdOrder: 8,
    ctaLabel: 'Register',
  },
  {
    id: 'evt-rec-modal-7',
    type: 'Talk',
    typeColor: 'blue',
    thumbGradient: 'from-blue-100 to-indigo-200',
    iconBg: 'bg-blue-500/20',
    iconKey: 'mic',
    org: 'Grab Data Guild',
    title: 'From SQL to Business Impact',
    date: '29 May 2025',
    location: 'Online',
    goingCount: 341,
    goingLabel: 'going',
    matchPercent: 92,
    sector: 'data',
    tags: ['SQL', 'Data Storytelling', 'Analytics'],
    category: 'talks',
    format: 'Online',
    industry: 'Technology',
    daysLeft: 11,
    createdOrder: 7,
    ctaLabel: 'Register',
  },
  {
    id: 'evt-rec-modal-8',
    type: 'Networking',
    typeColor: 'emerald',
    thumbGradient: 'from-emerald-100 to-teal-200',
    iconBg: 'bg-emerald-500/20',
    iconKey: 'coffee',
    org: 'Taylor Alumni Network',
    title: 'Analytics Alumni Coffee Chats',
    date: '30 May 2025',
    location: 'Kuala Lumpur',
    goingCount: 96,
    goingLabel: 'going',
    matchPercent: 77,
    sector: 'data',
    tags: ['Mentorship', 'Analytics', 'Networking'],
    category: 'networking',
    format: 'Physical',
    industry: 'Technology',
    daysLeft: 12,
    createdOrder: 6,
    ctaLabel: 'Join Waitlist',
  },
  {
    id: 'evt-rec-modal-9',
    type: 'Webinar',
    typeColor: 'teal',
    thumbGradient: 'from-cyan-100 to-blue-200',
    iconBg: 'bg-cyan-500/20',
    iconKey: 'health',
    org: 'HealthTech Malaysia',
    title: 'Data Careers in Digital Healthcare',
    date: '1 Jun 2025',
    location: 'Online',
    goingCount: 164,
    goingLabel: 'going',
    matchPercent: 72,
    sector: 'data',
    tags: ['Healthcare', 'Data', 'Career'],
    category: 'webinars',
    format: 'Online',
    industry: 'Healthcare',
    daysLeft: 14,
    createdOrder: 5,
    ctaLabel: 'Join Waitlist',
  },
  {
    id: 'evt-rec-modal-10',
    type: 'Hackathon',
    typeColor: 'violet',
    thumbGradient: 'from-violet-100 to-fuchsia-200',
    iconBg: 'bg-violet-500/20',
    iconKey: 'laptop',
    org: 'AWS Cloud Club',
    title: 'Serverless Student Build Day',
    date: '3 Jun 2025',
    location: 'Online',
    goingCount: 275,
    goingLabel: 'joined',
    matchPercent: 85,
    sector: 'computer-science',
    tags: ['AWS', 'Serverless', 'Cloud'],
    category: 'hackathons',
    format: 'Online',
    industry: 'Technology',
    daysLeft: 16,
    createdOrder: 4,
    ctaLabel: 'Register',
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

function normalizeRecommendedEvent(event, index) {
  const isFeatured = Boolean(event.ctaLabel)
  const normalizedType = event.type ?? (event.title?.toLowerCase().includes('hackathon') ? 'Hackathon' : 'Workshop')
  const locationText = event.location ?? event.date?.split('·')[1]?.trim() ?? 'Online'
  return enrichTrendingEvent(
    {
      ...event,
      type: normalizedType,
      typeColor: event.typeColor ?? (normalizedType === 'Hackathon' ? 'violet' : 'teal'),
      thumbGradient: event.thumbGradient ?? 'from-violet-100 to-indigo-200',
      iconBg: event.iconBg ?? 'bg-violet-500/20',
      iconKey: event.iconKey,
      date: event.date?.replace('· Offline', '2025').replace('· Online', '2025') ?? 'Upcoming',
      location: locationText === 'Offline' ? 'Kuala Lumpur' : locationText,
      goingCount: event.goingCount ?? (isFeatured ? 1250 : 180 + index * 37),
      goingLabel: event.goingLabel ?? 'going',
      tags: event.tags ?? [event.sector ?? 'Career', 'Recommended'],
      ctaLabel: event.ctaLabel ?? ((event.matchPercent ?? 0) >= 85 ? 'Register' : 'Join Waitlist'),
      daysLeft: event.daysLeft ?? index + 3,
      createdOrder: event.createdOrder ?? 16 - index,
    },
    index,
  )
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
        <IconTile icon={eventIconFor(event)} className={`h-12 w-12 ${event.iconBg} border-slate-100`} size={21} />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="truncate text-[11px] font-semibold text-slate-400">{event.org}</p>
        <h4 className="mt-1 line-clamp-2 min-h-[40px] text-sm font-bold leading-tight text-slate-950">{event.title}</h4>
        <div className="mt-3 space-y-1 text-xs text-slate-600">
          <p className="flex items-center gap-1.5">
            <CalendarDays size={12} strokeWidth={2.2} className="text-blue-500" />
            {event.date}
          </p>
          <p className="flex items-center gap-1.5">
            {event.location?.toLowerCase().includes('online') ? <Globe2 size={12} strokeWidth={2.2} className="text-blue-500" /> : <MapPin size={12} strokeWidth={2.2} className="text-blue-500" />}
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

function AllTrendingEventsModal({
  isOpen,
  onClose,
  events,
  onSelect,
  title = 'All Trending Events',
  icon = '🔥',
  subtitle = "Explore what's trending in your community and beyond.",
}) {
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
    <ModalShell isOpen={isOpen} onClose={onClose} titleId="event-discovery-modal-title">
      <div className="shrink-0 border-b border-slate-100 bg-white px-5 py-5 sm:px-7">
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <h2 id="event-discovery-modal-title" className="flex items-center gap-2 text-xl font-extrabold text-slate-950 sm:text-2xl">
              {typeof icon === 'string' ? <Sparkles size={21} strokeWidth={2.2} className="text-violet-600" /> : icon}
              {title}
            </h2>
            <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={`Close ${title}`}
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
            <Search size={16} strokeWidth={2.2} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
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

// Normalizes an "upcoming" item into the event shape the detail page expects.
function normalizeUpcomingForDetail(item) {
  if (!item) return item
  if (item.title && item.date) return item
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
  const { myEvents } = useCareerStore()
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false)

  const [search, setSearch] = useState('')
  const [sectorId, setSectorId] = useState('all')
  const [activeCategory, setActiveCategory] = useState('all')

  const [selectedEvent, setSelectedEvent] = useState(null)
  const [isAllEventsModalOpen, setIsAllEventsModalOpen] = useState(false)

  const matches = (event) => matchesQuery(event, search) && matchesSector(event, sectorId)

  // Build the unified event feed by merging trending + recommended
  const unifiedFeed = useMemo(() => {
    const recommended = [
      eventHub.recommendedFeatured,
      ...eventHub.recommendedSmall,
    ].map(normalizeRecommendedEvent)

    const all = [...eventHub.trending.map(enrichTrendingEvent), ...recommended]
    // Deduplicate by id
    const seen = new Set()
    const deduped = all.filter((e) => {
      if (seen.has(e.id)) return false
      seen.add(e.id)
      return true
    })

    return deduped
      .filter(matches)
      .filter((e) => {
        if (activeCategory === 'all') return true
        return (e.category ?? categoryForType(e.type)) === activeCategory
      })
      .sort((a, b) => (b.matchPercent ?? 0) - (a.matchPercent ?? 0))
  }, [search, sectorId, activeCategory])

  // All events for the modal (includes extras)
  const allEventsForModal = useMemo(
    () => [
      ...eventHub.trending,
      ...EXTRA_TRENDING_EVENTS,
      ...[eventHub.recommendedFeatured, ...eventHub.recommendedSmall].map(normalizeRecommendedEvent),
      ...EXTRA_RECOMMENDED_EVENTS,
    ].map(enrichTrendingEvent),
    [],
  )

  const upcoming = useMemo(() => {
    return myEvents
      .filter((event) => {
        const match = matchesQuery(event, search) && matchesSector(event, sectorId);
        return match && event.status !== 'Completed';
      })
      .map((event) => {
        const parts = event.date.split('-');
        const day = parts[2];
        const monthIndex = parseInt(parts[1], 10) - 1;
        const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        const month = months[monthIndex] || 'MAY';
        
        const toneMap = { Registered: 'violet', Saved: 'teal', Waitlisted: 'amber', Completed: 'emerald' };
        const statusToneMap = { Registered: 'violet', Saved: 'slate', Waitlisted: 'rose', Completed: 'emerald' };

        const diffTime = new Date(event.date).getTime() - new Date(2025, 4, 14).getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const countdown = diffDays === 0 ? 'Today' : diffDays > 0 ? `In ${diffDays} days` : `${Math.abs(diffDays)} days ago`;

        return {
          ...event,
          day,
          month,
          tone: toneMap[event.status] || 'violet',
          statusTone: statusToneMap[event.status] || 'slate',
          countdown,
          meta: [
            { icon: event.location.toLowerCase().includes('online') ? 'location-online' : 'location', text: event.location },
            { icon: 'time', text: event.time },
            { icon: 'people', text: event.status === 'Registered' ? '1,250 going' : '842 going' }
          ]
        };
      });
  }, [myEvents, search, sectorId]);

  const isFiltered = Boolean(search) || sectorId !== 'all'

  const openDetail = (event) => {
    setIsAllEventsModalOpen(false)
    setSelectedEvent(normalizeUpcomingForDetail(event))
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const closeDetail = () => setSelectedEvent(null)

  if (selectedEvent) {
    return <EventDetail event={selectedEvent} onBack={closeDetail} />
  }

  return (
    <div className="space-y-6">
      <SearchFilterBar
        search={search}
        onSearch={setSearch}
        sectorId={sectorId}
        onSectorChange={setSectorId}
        sectors={eventHub.sectors}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        categories={CATEGORY_FILTERS}
      />

      <DeadlineAlert alert={eventHub.deadlineAlert} />

      <section>
        <SectionHeader
          icon={<Sparkles size={21} strokeWidth={2.2} className="text-violet-600" />}
          title="Discover Events"
          count={`${unifiedFeed.length} ${unifiedFeed.length === 1 ? 'event' : 'events'}`}
          link="View all events"
          onLinkClick={() => setIsAllEventsModalOpen(true)}
        />
        {unifiedFeed.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {unifiedFeed.slice(0, 8).map((event) => (
              <EventCard key={event.id} event={event} onSelect={openDetail} />
            ))}
          </div>
        ) : (
          <EmptyHint>No events match the current filters.</EmptyHint>
        )}
      </section>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
        <section>
          <SectionHeader
            icon="🗓"
            title="Your Upcoming Events"
            link="Full calendar"
            onLinkClick={() => setIsCalendarModalOpen(true)}
          />
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
        <aside>
          <EventCategoriesSidebar categories={eventHub.categories} />
        </aside>
      </div>

      <AllTrendingEventsModal
        isOpen={isAllEventsModalOpen}
        onClose={() => setIsAllEventsModalOpen(false)}
        events={allEventsForModal}
        onSelect={openDetail}
        title="All Events"
        icon={<Sparkles size={21} strokeWidth={2.2} className="text-violet-600" />}
        subtitle="Browse all events matched to your skills, goals, and career direction."
      />

      <MyCareerCalendarModal
        isOpen={isCalendarModalOpen}
        onClose={() => setIsCalendarModalOpen(false)}
        onOpenEventDetail={openDetail}
      />
    </div>
  )
}
