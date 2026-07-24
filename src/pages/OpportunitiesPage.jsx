import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  Bookmark,
  BookmarkCheck,
  Bot,
  Briefcase,
  Building2,
  Calendar,
  CalendarClock,
  Check,
  ChevronRight,
  Globe,
  LayoutGrid,
  MapPin,
  MoreHorizontal,
  Route,
  Settings,
  Sparkles,
  Star,
  TrendingUp,
  Trophy,
  Wifi,
  X,
} from 'lucide-react'
import HomeTopNav from '../components/home/HomeTopNav'
import WhyThese3Modal from '../components/opportunitiesHub/WhyThese3Modal'
import OpportunityDetailsPanel from '../components/opportunitiesHub/OpportunityDetailsPanel'
import { candidateOverview, mockUser, opportunitiesHub, opportunityDetails } from '../data/mockData'
import { useCareerStore } from '../store/useCareerStore'

// Card background art (loaded via Vite so the paths survive builds)
import bgIntern from '../assets/Opportunity Intern bg.png'
import bgCompetition from '../assets/Opportunity Competition bg.png'
import bgJob from '../assets/Opportunity Job bg.png'
import bgEvent from '../assets/Opportunity Event bg.png'
import bgTalk from '../assets/Opportunity Talk bg.png'

// ── Design tokens ──────────────────────────────────────────────────────────
const BG_ART = {
  intern: bgIntern,
  competition: bgCompetition,
  job: bgJob,
  event: bgEvent,
  talk: bgTalk,
}

const CAT_META = {
  internship: {
    label: 'Internships',
    Icon: Briefcase,
    color: '#185FA5',
    bgSoft: '#E6F1FB',
    border: '#85B7EB',
    cardBg: 'linear-gradient(118deg, #FFFFFF 0%, #FBFAFF 46%, #EEEAFE 100%)',
    cardBorder: '#D9D5F5',
  },
  challenge: {
    label: 'Challenges',
    Icon: Trophy,
    color: '#854F0B',
    bgSoft: '#FAEEDA',
    border: '#EF9F27',
    cardBg: 'linear-gradient(118deg, #FFFFFF 0%, #FFFDF8 46%, #FFF0D8 100%)',
    cardBorder: '#F0D7B1',
  },
  job: {
    label: 'Jobs',
    Icon: Building2,
    color: '#0F6E56',
    bgSoft: '#E1F5EE',
    border: '#5DCAA5',
    cardBg: 'linear-gradient(118deg, #FFFFFF 0%, #FAFEFC 46%, #E1F5EC 100%)',
    cardBorder: '#C6E4D8',
  },
  event: {
    label: 'Events',
    Icon: Calendar,
    color: '#993556',
    bgSoft: '#FBEAF0',
    border: '#ED93B1',
    cardBg: 'linear-gradient(118deg, #FFFFFF 0%, #FFFBFD 46%, #F8E8F0 100%)',
    cardBorder: '#EACFDA',
  },
}

const TAB_FILTERS = [
  { id: 'All', label: 'All', Icon: LayoutGrid, type: null },
  { id: 'Internships', label: 'Internships', Icon: Briefcase, type: 'internship' },
  { id: 'Challenges', label: 'Challenges', Icon: Trophy, type: 'challenge' },
  { id: 'Jobs', label: 'Jobs', Icon: Building2, type: 'job' },
  { id: 'Events', label: 'Events', Icon: Calendar, type: 'event' },
]

const LIST_FILTERS = ['All', 'Saved', 'Applied', 'High match']
const TRACKER_FILTERS = ['All', 'Applied', 'In Review', 'Interview', 'Offer']
const STAGES = ['Applied', 'In Review', 'Interview', 'Offer']

const SORT_OPTIONS = [
  { id: 'match', label: 'Sort: AI match' },
  { id: 'deadline', label: 'Sort: Deadline' },
  { id: 'posted', label: 'Sort: Date posted' },
]

const LOCATION_OPTIONS = ['Any', 'Remote', 'Hybrid', 'On-site']
const DEADLINE_OPTIONS = [
  { id: 'any', label: 'Any' },
  { id: 'week', label: 'This week' },
  { id: 'month', label: 'This month' },
]
const MATCH_OPTIONS = [
  { id: 0, label: 'Any' },
  { id: 80, label: '80%+' },
  { id: 90, label: '90%+' },
]

const APPLICATION_DETAILS = {
  ByteDance: {
    match: '91%', stage: 'Application submitted', nextStep: 'Waiting for recruiter review',
    currentState: 'Your application has been submitted. The company has not responded yet.',
    actions: ['Add stronger software engineering proof to Career Memory', 'Prepare a short project explanation', 'Keep applying to similar roles'],
    suggestion: 'Since this role is software engineering focused, add one React or system design project evidence to strengthen your profile while waiting.',
  },
  'Google APAC': {
    match: '87%', stage: 'Screening review', nextStep: 'Challenge screening',
    currentState: 'Your submission is currently under review. This stage usually checks problem-solving fit and challenge readiness.',
    actions: ['Practise algorithms and data structures', 'Review problem-solving examples', 'Prepare a short explanation of your project approach'],
    suggestion: 'This is a challenge-style opportunity, so focus on explaining your thinking process clearly, not just the final answer.',
  },
  Grab: {
    match: '79%', stage: 'Interview scheduled', nextStep: 'Prepare interview answers',
    currentState: 'You have an interview coming up. This is the most urgent application in your tracker.',
    actions: ['Practise SQL questions', 'Prepare dashboard storytelling examples', 'Review your AIA / MetLife reporting experience', 'Prepare one strong analytics project story'],
    suggestion: 'Start with a 10-minute mock interview focused on SQL, business insight, and explaining dashboard impact.',
  },
  Shopee: {
    match: '86%', stage: 'Offer received', nextStep: 'Review offer details',
    currentState: 'You received an offer. Now you should evaluate whether the role matches your career direction and learning goals.',
    actions: ['Compare offer with target role preferences', 'Review salary, learning opportunity, and team fit', 'Prepare questions before accepting'],
    suggestion: 'Compare this offer against your target path: software engineering, AI/data, or product analytics. The best offer is not only the fastest one, but the one that compounds your long-term signal.',
  },
}

const STATUS_CLASSES = {
  Applied: 'bg-[#E6F1FB] text-[#185FA5]',
  'In Review': 'bg-[#FAEEDA] text-[#854F0B]',
  Interview: 'bg-[#E1F5EE] text-[#0F6E56]',
  Offer: 'bg-[#F0F2FF] text-[#5B6CF9]',
}

// Small demo connections so each card gets a couple of avatars.
const CARD_CONNECTIONS = {
  'opp-1': [{ id: 'AL', tone: 'indigo' }, { id: 'NS', tone: 'job' }, { id: 'JW', tone: 'challenge' }],
  'opp-2': [{ id: 'DT', tone: 'indigo' }, { id: 'AH', tone: 'urgent' }],
  'opp-3': [{ id: 'FN', tone: 'indigo' }, { id: 'JL', tone: 'job' }, { id: 'AK', tone: 'challenge' }],
  'opp-4': [{ id: 'CT', tone: 'indigo' }, { id: 'IR', tone: 'job' }, { id: 'SM', tone: 'challenge' }],
}
const CONN_TONE = {
  indigo: { bg: '#E8EBFE', color: '#5B6CF9' },
  job: { bg: '#E1F5EE', color: '#0F6E56' },
  challenge: { bg: '#FAEEDA', color: '#854F0B' },
  urgent: { bg: '#FAECE7', color: '#993C1D' },
}

// Helpers
function deadlineDays(deadlineText) {
  const m = String(deadlineText || '').match(/(\d+)/)
  return m ? parseInt(m[1], 10) : 99
}
function deadlineTone(days) {
  if (days <= 5) return { bg: '#FAECE7', color: '#993C1D', label: `${days} days left` }
  if (days <= 12) return { bg: '#FAEEDA', color: '#854F0B', label: `${days} days left` }
  return { bg: '#F5F6FA', color: '#6B6F8A', label: `${days} days left` }
}
function matchTone(pct) {
  if (pct >= 90) return { bg: '#E1F5EE', color: '#0F6E56' }
  if (pct >= 80) return { bg: '#E6F1FB', color: '#185FA5' }
  return { bg: '#F5F6FA', color: '#6B6F8A' }
}
function categoryTone(card) {
  const t = card.type === 'internship' ? { bg: '#E6F1FB', color: '#185FA5' }
    : card.type === 'challenge' ? { bg: '#FAEEDA', color: '#854F0B' }
    : card.type === 'job' ? { bg: '#E1F5EE', color: '#0F6E56' }
    : { bg: '#FBEAF0', color: '#993556' }
  return t
}
function sdgTone(number) {
  if ([8, 9].includes(number)) return { bg: '#E1F5EE', color: '#0F6E56' }
  if ([4].includes(number)) return { bg: '#E6F1FB', color: '#185FA5' }
  return { bg: '#FAEEDA', color: '#854F0B' }
}

// ── Toast ──────────────────────────────────────────────────────────────────
function DemoToast({ message }) {
  if (!message) return null
  return (
    <div className="fixed bottom-5 right-5 z-50 rounded-xl border border-[#E8E9EF] bg-white px-4 py-2.5 text-sm font-medium text-[#1A1C2E] shadow-[0_10px_30px_rgba(15,17,32,.08)]">
      {message}
    </div>
  )
}

// ── AI Banner ──────────────────────────────────────────────────────────────
function AIBanner({ onWhyClick, onChipClick }) {
  return (
    <div className="mb-6 flex items-start gap-4 rounded-2xl border border-[#C7CDFC] bg-[#F0F2FF] px-6 py-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#5B6CF9]">
        <Bot className="h-[22px] w-[22px] text-white" />
      </div>
      <div className="flex-1">
        <p className="text-[15px] font-semibold text-[#1A1C2E]">12 new opportunities found — 3 need your attention today</p>
        <p className="mt-0.5 text-[13px] text-[#6B6F8A]">Matched to your Python, backend, and system design skills. Two deadlines fall within the next 3 days.</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <AIChip Icon={Sparkles} onClick={onWhyClick}>Why these 3?</AIChip>
          <AIChip Icon={Globe} onClick={() => onChipClick('remote')}>Remote only</AIChip>
          <AIChip Icon={TrendingUp} onClick={() => onChipClick('skillgaps')}>My skill gaps</AIChip>
          <AIChip Icon={CalendarClock} onClick={() => onChipClick('deadline')}>Deadline this week</AIChip>
        </div>
      </div>
    </div>
  )
}

function AIChip({ Icon, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1.5 rounded-full border border-[#C7CDFC] bg-white px-3 py-1 text-[12px] font-medium text-[#5B6CF9] transition hover:bg-[#E8EBFE]"
    >
      <Icon className="h-3.5 w-3.5" />
      {children}
    </button>
  )
}

// ── Filter bar ─────────────────────────────────────────────────────────────
function TabGroup({ options, value, onChange, renderIcon }) {
  return (
    <div className="inline-flex gap-[3px] rounded-[9px] bg-[#EBEBF0] p-[3px]">
      {options.map((opt) => {
        const active = value === opt.id
        const Icon = renderIcon ? opt.Icon : null
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            className={`inline-flex items-center gap-1.5 rounded-md px-3.5 py-1.5 text-[13px] font-medium transition ${
              active ? 'bg-white text-[#1A1C2E] shadow-[0_1px_3px_rgba(0,0,0,.08)]' : 'text-[#6B6F8A] hover:text-[#1A1C2E]'
            }`}
          >
            {Icon ? <Icon className="h-3.5 w-3.5" /> : null}
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}

// ── Filter drawer (functional) ─────────────────────────────────────────────
function FilterPanel({ filters, onChange, onReset }) {
  const patch = (p) => onChange({ ...filters, ...p })
  return (
    <div className="mb-6 rounded-2xl border border-[#E8E9EF] bg-white p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <p className="text-[13px] font-semibold text-[#1A1C2E]">Refine your opportunities</p>
        <button type="button" onClick={onReset} className="text-[12px] font-medium text-[#5B6CF9] hover:underline">
          Reset filters
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[.07em] text-[#6B6F8A]">Location</p>
          <div className="flex flex-wrap gap-2">
            {LOCATION_OPTIONS.map((loc) => {
              const active = filters.location === loc
              return (
                <button
                  key={loc}
                  type="button"
                  onClick={() => patch({ location: loc })}
                  className={`rounded-full border px-3 py-1 text-[12px] font-medium transition ${
                    active ? 'border-[#5B6CF9] bg-[#5B6CF9] text-white' : 'border-[#E8E9EF] bg-white text-[#6B6F8A] hover:border-[#D0D2DC]'
                  }`}
                >
                  {loc}
                </button>
              )
            })}
          </div>
        </div>

        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[.07em] text-[#6B6F8A]">Deadline</p>
          <div className="flex flex-wrap gap-2">
            {DEADLINE_OPTIONS.map((d) => {
              const active = filters.deadline === d.id
              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => patch({ deadline: d.id })}
                  className={`rounded-full border px-3 py-1 text-[12px] font-medium transition ${
                    active ? 'border-[#5B6CF9] bg-[#5B6CF9] text-white' : 'border-[#E8E9EF] bg-white text-[#6B6F8A] hover:border-[#D0D2DC]'
                  }`}
                >
                  {d.label}
                </button>
              )
            })}
          </div>
        </div>

        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[.07em] text-[#6B6F8A]">Minimum match</p>
          <div className="flex flex-wrap gap-2">
            {MATCH_OPTIONS.map((m) => {
              const active = filters.minMatch === m.id
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => patch({ minMatch: m.id })}
                  className={`rounded-full border px-3 py-1 text-[12px] font-medium transition ${
                    active ? 'border-[#5B6CF9] bg-[#5B6CF9] text-white' : 'border-[#E8E9EF] bg-white text-[#6B6F8A] hover:border-[#D0D2DC]'
                  }`}
                >
                  {m.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="mt-4 border-t border-[#E8E9EF] pt-4">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[.07em] text-[#6B6F8A]">SDG focus</p>
        <div className="flex flex-wrap gap-1.5">
          {[4, 7, 8, 9, 13, 17].map((n) => {
            const active = filters.sdgs.includes(n)
            const t = sdgTone(n)
            return (
              <button
                key={n}
                type="button"
                onClick={() => {
                  const next = active ? filters.sdgs.filter((x) => x !== n) : [...filters.sdgs, n]
                  patch({ sdgs: next })
                }}
                className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-[12px] font-medium transition ${
                  active ? 'border border-transparent text-white' : 'border border-[#E8E9EF] bg-white text-[#6B6F8A]'
                }`}
                style={active ? { background: t.color } : undefined}
              >
                <span className="inline-flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold" style={active ? { background: 'rgba(255,255,255,.22)' } : { background: t.color, color: '#fff' }}>{n}</span>
                SDG {n}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ── Opportunity card ───────────────────────────────────────────────────────
function OppCard({ card, saved, applied, onToggleSave, onView }) {
  const meta = CAT_META[card.type] || CAT_META.internship
  const cat = categoryTone(card)
  const mt = card.matchPercent ? matchTone(card.matchPercent) : null
  const days = deadlineDays(card.deadline)
  const dt = deadlineTone(days)
  const art = BG_ART[card.bgImageKey]
  const connections = CARD_CONNECTIONS[card.id]

  return (
    <div
      className="group relative flex min-h-[308px] cursor-pointer flex-col gap-3 overflow-hidden rounded-2xl border p-5 transition hover:shadow-[0_4px_18px_rgba(15,17,32,.09)]"
      style={{ background: meta.cardBg, borderColor: meta.cardBorder }}
      onClick={onView}
    >
      <span className="absolute inset-y-3 left-0 w-1 rounded-r" style={{ background: meta.border }} />

      {art ? (
        <div className="pointer-events-none absolute bottom-12 right-[-20px] z-[1] h-[178px] w-[58%]">
          <img
            src={art}
            alt=""
            className="h-full w-full object-contain object-right-bottom opacity-80 transition-transform duration-200 group-hover:-translate-y-[3px] group-hover:scale-[1.03]"
            style={card.type === 'challenge' ? { filter: 'hue-rotate(170deg) saturate(.82) drop-shadow(0 12px 16px rgba(133,79,11,.09))' } : { filter: 'drop-shadow(0 12px 16px rgba(20,29,78,.08))' }}
          />
        </div>
      ) : null}

      <div className="relative z-[2] flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[9px] text-[11px] font-semibold" style={{ background: cat.bg, color: cat.color }}>
            {card.logo}
          </div>
          <div>
            <p className="text-[14px] font-semibold leading-tight text-[#1A1C2E]">{card.title}</p>
            <p className="mt-0.5 text-[12px] text-[#6B6F8A]">{card.org}{card.location ? ` · ${card.location}` : ''}</p>
          </div>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1.5">
          {mt ? (
            <span className="rounded-md px-2 py-0.5 text-[12px] font-semibold" style={{ background: mt.bg, color: mt.color }}>{card.matchPercent}% match</span>
          ) : null}
          <span className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-medium" style={{ background: dt.bg, color: dt.color }}>
            <CalendarClock className="h-3 w-3" />
            {dt.label}
          </span>
        </div>
      </div>

      {card.sdgs?.length ? (
        <div className="relative z-[2] flex max-w-[62%] flex-wrap gap-1">
          {card.sdgs.map((s) => {
            const t = sdgTone(s.number)
            return (
              <span key={s.number} className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-medium" style={{ background: t.bg, color: t.color }}>
                <Star className="h-2.5 w-2.5" />
                SDG {s.number} {s.title}
              </span>
            )
          })}
        </div>
      ) : null}

      {card.tags?.length ? (
        <div className="relative z-[2] flex max-w-[62%] flex-wrap gap-1">
          {card.tags.map((tag) => (
            <span key={tag} className="rounded border border-[#E8E9EF] bg-[#F5F6FA] px-2 py-0.5 text-[11px] text-[#6B6F8A]">{tag}</span>
          ))}
        </div>
      ) : null}

      {connections ? (
        <div className="relative z-[2] flex max-w-[62%] items-center gap-1.5 text-[11px] text-[#9EA3BC]">
          <div className="flex">
            {connections.map((c) => {
              const t = CONN_TONE[c.tone] || CONN_TONE.indigo
              return (
                <span key={c.id} className="-mr-1.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white text-[8px] font-semibold" style={{ background: t.bg, color: t.color }}>{c.id}</span>
              )
            })}
          </div>
          <span className="ml-1.5">{connections.length} connections applied</span>
        </div>
      ) : null}

      <div className="relative z-[2] mt-auto flex items-center justify-between border-t border-[#E8E9EF] pt-2.5" style={{ background: 'rgba(255,255,255,.68)', backdropFilter: 'blur(5px)' }}>
        <span className="inline-flex items-center gap-1 text-[12px] text-[#6B6F8A]">
          {card.type === 'event' && /online/i.test(card.location || '') ? <Wifi className="h-3.5 w-3.5" /> : <MapPin className="h-3.5 w-3.5" />}
          {card.location || '—'}
        </span>
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onToggleSave() }}
            className="inline-flex items-center gap-1 rounded-md border border-[#D0D2DC] bg-white px-2.5 py-1 text-[12px] font-medium text-[#1A1C2E] transition hover:bg-[#F5F6FA]"
          >
            {saved ? <BookmarkCheck className="h-3.5 w-3.5 text-[#5B6CF9]" /> : <Bookmark className="h-3.5 w-3.5" />}
            {saved ? 'Saved' : 'Save'}
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onView() }}
            className="inline-flex items-center gap-1 rounded-md border border-[#5B6CF9] bg-[#5B6CF9] px-2.5 py-1 text-[12px] font-medium text-white transition hover:bg-[#4a5ce8]"
          >
            {applied ? 'Applied ✓' : 'View details'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Category section ───────────────────────────────────────────────────────
const TYPE_TO_SLUG = { internship: 'internships', challenge: 'challenges', job: 'jobs', event: 'events' }

function CategorySection({ type, cards, cardHandlers, onSeeAll }) {
  if (!cards.length) return null
  const meta = CAT_META[type]
  const Icon = meta.Icon
  return (
    <section className="mb-8">
      <div className="mb-3.5 flex items-center gap-2.5 border-b border-[#E8E9EF] pb-2.5">
        <span className="h-[22px] w-1 shrink-0 rounded" style={{ background: meta.border }} />
        <Icon className="h-4 w-4" style={{ color: meta.color }} />
        <span className="text-[12px] font-semibold uppercase tracking-[.06em]" style={{ color: meta.color }}>{meta.label}</span>
        <span className="rounded-full px-2 py-0.5 text-[11px] font-medium" style={{ background: meta.bgSoft, color: meta.color }}>
          {cards.length} opportunit{cards.length === 1 ? 'y' : 'ies'}
        </span>
        <button type="button" onClick={() => onSeeAll?.(type)} className="ml-auto inline-flex items-center gap-1 text-[13px] text-[#5B6CF9] opacity-80 hover:opacity-100">
          See all <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <OppCard key={card.id} card={card} {...cardHandlers(card)} />
        ))}
      </div>
    </section>
  )
}

// ── Sidebar ────────────────────────────────────────────────────────────────
function Sidebar({ counts, tracker, onViewAll, onSelectApplication, onBuildRoadmap }) {
  return (
    <aside className="flex flex-col gap-3.5">
      {/* Overview */}
      <div className="rounded-xl border border-[#E8E9EF] bg-white p-5">
        <div className="mb-3.5 flex items-center justify-between text-[13px] font-semibold text-[#1A1C2E]">
          Overview
          <MoreHorizontal className="h-4 w-4 text-[#9EA3BC]" />
        </div>
        <div className="mb-3.5 grid grid-cols-2 gap-2">
          <StatCell value={counts.new} label="New today" color="#5B6CF9" />
          <StatCell value={counts.urgent} label="Urgent" color="#993C1D" />
          <StatCell value={counts.saved} label="Saved" />
          <StatCell value={counts.applied} label="Applied" />
        </div>
        <div className="flex flex-col gap-1.5">
          {Object.entries(CAT_META).map(([type, meta]) => (
            <div key={type} className="flex items-center justify-between text-[12px]">
              <span className="flex items-center gap-1.5 font-medium" style={{ color: meta.color }}>
                <meta.Icon className="h-3.5 w-3.5" /> {meta.label}
              </span>
              <span className="text-[#6B6F8A]">{counts.byType[type] || 0}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tracker */}
      <div className="rounded-xl border border-[#E8E9EF] bg-white p-5">
        <div className="mb-3.5 flex items-center justify-between text-[13px] font-semibold text-[#1A1C2E]">
          Application tracker
          <Settings className="h-4 w-4 text-[#9EA3BC]" />
        </div>
        <div className="flex flex-col">
          {(tracker.length ? tracker : []).slice(0, 4).map((app) => (
            <button
              key={app.id}
              type="button"
              onClick={() => onSelectApplication(app)}
              className="flex items-center gap-2.5 border-b border-[#E8E9EF] py-2.5 last:border-b-0 text-left transition hover:bg-[#F5F6FA]"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[10px] font-semibold" style={{ background: '#E6F1FB', color: '#185FA5' }}>{app.logo}</span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[12px] font-medium text-[#1A1C2E]">{app.company}</p>
                <p className="truncate text-[11px] text-[#6B6F8A]">{app.role} · {app.dateLabel}</p>
              </div>
              <span className={`shrink-0 rounded-md px-2 py-0.5 text-[11px] font-medium ${STATUS_CLASSES[app.status] || STATUS_CLASSES.Applied}`}>{app.status}</span>
            </button>
          ))}
          {!tracker.length ? (
            <p className="py-3 text-center text-[12px] text-[#9EA3BC]">No applications yet</p>
          ) : null}
        </div>
        <button type="button" onClick={onViewAll} className="mt-3 flex w-full items-center justify-center gap-1 text-[13px] font-medium text-[#5B6CF9]">
          View all applications <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Skill gaps */}
      <div className="rounded-xl border border-[#E8E9EF] bg-white p-5">
        <div className="mb-2.5 text-[13px] font-semibold text-[#1A1C2E]">Skill match gaps</div>
        <p className="mb-2.5 text-[12px] text-[#6B6F8A]">Add these to unlock more high-match roles in your saved searches.</p>
        <div className="mb-3 flex flex-wrap gap-1.5">
          {[
            { label: 'React', tone: 'challenge' },
            { label: 'Docker', tone: 'challenge' },
            { label: 'Cloud (AWS)', tone: 'intern' },
            { label: 'Kubernetes', tone: 'intern' },
          ].map((g) => {
            const c = g.tone === 'challenge' ? { bg: '#FAEEDA', color: '#854F0B' } : { bg: '#E6F1FB', color: '#185FA5' }
            return <span key={g.label} className="rounded-md px-2.5 py-1 text-[12px] font-medium" style={{ background: c.bg, color: c.color }}>{g.label}</span>
          })}
        </div>
        <button
          type="button"
          onClick={onBuildRoadmap}
          className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-[#D0D2DC] bg-white px-3 py-2 text-[13px] font-medium text-[#1A1C2E] transition hover:bg-[#F5F6FA]"
        >
          <Route className="h-3.5 w-3.5" />
          Build learning roadmap
        </button>
      </div>
    </aside>
  )
}

function StatCell({ value, label, color }) {
  return (
    <div className="rounded-lg bg-[#F5F6FA] p-2.5 text-center">
      <p className="text-[20px] font-semibold" style={color ? { color } : undefined}>{value}</p>
      <p className="text-[11px] text-[#9EA3BC]">{label}</p>
    </div>
  )
}

// ── Application tracker modal (kept from previous version) ─────────────────
function ApplicationTrackerModal({ applications, initialApplication, onClose }) {
  const [statusFilter, setStatusFilter] = useState('All')
  const [selectedId, setSelectedId] = useState(initialApplication?.id ?? applications[0]?.id)
  const filteredApplications = useMemo(() => (
    statusFilter === 'All' ? applications : applications.filter((app) => app.status === statusFilter)
  ), [applications, statusFilter])
  const selected = filteredApplications.find((app) => app.id === selectedId) ?? filteredApplications[0]
  const details = selected ? APPLICATION_DETAILS[selected.company] ?? {
    match: '82%', stage: selected.status, nextStep: 'Check application status',
    currentState: 'This application is being tracked in your CareerOS workspace.',
    actions: ['Review your Career Memory evidence', 'Prepare one relevant story'],
    suggestion: 'Open the related opportunity and strengthen the evidence behind this application.',
  } : null

  useEffect(() => {
    if (filteredApplications.length === 0) return setSelectedId(null)
    if (!filteredApplications.some((app) => app.id === selectedId)) setSelectedId(filteredApplications[0].id)
  }, [filteredApplications, selectedId])

  if (!selected || !details) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6" onClick={onClose}>
      <section role="dialog" aria-modal="true" className="flex max-h-[82vh] w-full max-w-5xl flex-col rounded-2xl border border-[#E8E9EF] bg-white p-6 shadow-[0_24px_80px_rgba(15,17,32,.24)]" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-[#1A1C2E]">All applications</h2>
            <p className="mt-1 text-sm text-[#6B6F8A]">Track where each opportunity stands and what to do next.</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-md p-1.5 text-[#6B6F8A] transition hover:bg-[#F5F6FA]">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-5 grid min-h-0 flex-1 gap-4 overflow-hidden lg:grid-cols-[38%_1fr]">
          <div className="min-h-0 overflow-y-auto rounded-xl border border-[#E8E9EF] bg-[#F5F6FA] p-3">
            <div className="mb-3 flex flex-wrap gap-2">
              {TRACKER_FILTERS.map((filter) => (
                <button key={filter} type="button" onClick={() => setStatusFilter(filter)} className={`rounded-full border px-3 py-1 text-[12px] font-medium transition ${statusFilter === filter ? 'border-[#5B6CF9] bg-[#5B6CF9] text-white' : 'border-[#E8E9EF] bg-white text-[#6B6F8A] hover:border-[#D0D2DC]'}`}>{filter}</button>
              ))}
            </div>
            <div className="space-y-2">
              {filteredApplications.map((app) => {
                const active = selected.id === app.id
                return (
                  <button key={app.id} type="button" onClick={() => setSelectedId(app.id)} className={`w-full rounded-xl border p-3 text-left transition ${active ? 'border-[#5B6CF9] bg-white shadow-[0_6px_20px_rgba(91,108,249,.14)]' : 'border-transparent bg-white hover:border-[#E8E9EF]'}`}>
                    <div className="flex items-start gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-[11px] font-semibold" style={{ background: '#E6F1FB', color: '#185FA5' }}>{app.logo}</span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="truncate text-[13px] font-semibold text-[#1A1C2E]">{app.company}</p>
                          <span className={`rounded-md px-2 py-0.5 text-[11px] font-medium ${STATUS_CLASSES[app.status] || STATUS_CLASSES.Applied}`}>{app.status}</span>
                        </div>
                        <p className="mt-0.5 truncate text-[12px] text-[#6B6F8A]">{app.role}</p>
                        <p className="mt-1 text-[11px] text-[#9EA3BC]">{app.dateLabel}</p>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="min-h-0 overflow-y-auto rounded-xl border border-[#E8E9EF] bg-white p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-[13px] font-semibold" style={{ background: '#E6F1FB', color: '#185FA5' }}>{selected.logo}</span>
                <div>
                  <h3 className="text-lg font-semibold text-[#1A1C2E]">{selected.company}</h3>
                  <p className="text-sm text-[#6B6F8A]">{selected.role}</p>
                  <p className="mt-1 text-[11px] text-[#9EA3BC]">{selected.dateLabel}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`rounded-md px-2.5 py-1 text-[11px] font-semibold ${STATUS_CLASSES[selected.status] || STATUS_CLASSES.Applied}`}>{selected.status}</span>
                <span className="rounded-md px-2.5 py-1 text-[11px] font-semibold" style={{ background: '#E6F1FB', color: '#185FA5' }}>{details.match}</span>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-[#E8E9EF] bg-[#F5F6FA] p-4 text-sm text-[#6B6F8A]">{details.currentState}</div>

            <div className="mt-4 rounded-xl border border-[#E8E9EF] p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[.07em] text-[#5B6CF9]">{details.stage}</p>
              <div className="mt-3 grid grid-cols-4 gap-2">
                {STAGES.map((stage) => {
                  const active = STAGES.indexOf(stage) <= STAGES.indexOf(selected.status)
                  return (
                    <div key={stage} className={`rounded-md px-2 py-1.5 text-center text-[11px] font-semibold ${active ? 'bg-[#5B6CF9] text-white' : 'bg-[#F5F6FA] text-[#9EA3BC]'}`}>{stage}</div>
                  )
                })}
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-[#E8E9EF] p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[.07em] text-[#5B6CF9]">What to do now</p>
              <ul className="mt-2 space-y-1.5 text-sm text-[#1A1C2E]">
                {details.actions.map((action) => (
                  <li key={action} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0F6E56]" />
                    {action}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 rounded-xl border border-[#C7CDFC] bg-[#F0F2FF] p-4 text-sm text-[#5B6CF9]">
              <p className="text-[11px] font-semibold uppercase tracking-[.07em]">CareerOS recommendation</p>
              <p className="mt-1 text-[13px] leading-6">{details.suggestion}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function OpportunitiesPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const readiness = candidateOverview.careerSnapshot.readiness

  const [activeTab, setActiveTab] = useState('All')
  const [listFilter, setListFilter] = useState('All')
  const [sortBy, setSortBy] = useState('match')
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({ location: 'Any', deadline: 'any', minMatch: 0, sdgs: [] })
  const resetFilters = () => setFilters({ location: 'Any', deadline: 'any', minMatch: 0, sdgs: [] })
  const activeFilterCount =
    (filters.location !== 'Any' ? 1 : 0) +
    (filters.deadline !== 'any' ? 1 : 0) +
    (filters.minMatch !== 0 ? 1 : 0) +
    filters.sdgs.length

  const [savedIds, setSavedIds] = useState([])
  const [appliedIds, setAppliedIds] = useState([])
  const [showWhyModal, setShowWhyModal] = useState(false)
  const [activeOpportunity, setActiveOpportunity] = useState(null)
  const [trackerInitialApplication, setTrackerInitialApplication] = useState(null)
  const [toast, setToast] = useState('')
  const toastRef = useRef(null)

  const opportunityTracker = useCareerStore((s) => s.opportunityTracker)
  const addOpportunityTrackerEntry = useCareerStore((s) => s.addOpportunityTrackerEntry)

  useEffect(() => () => window.clearTimeout(toastRef.current), [])

  const showToast = (message) => {
    window.clearTimeout(toastRef.current)
    setToast(message)
    toastRef.current = window.setTimeout(() => setToast(''), 2000)
  }

  const appliedOpportunityIds = useMemo(() => (
    opportunitiesHub.cards
      .filter((card) => opportunityTracker.some((app) => app.company === card.org || app.role === card.title))
      .map((card) => card.id)
  ), [opportunityTracker])

  const allCards = opportunitiesHub.cards

  // Apply tab + list + filter panel filters, then sort.
  const filteredCards = useMemo(() => {
    const catType = TAB_FILTERS.find((t) => t.id === activeTab)?.type
    let list = catType ? allCards.filter((c) => c.type === catType) : allCards.slice()

    if (listFilter === 'Saved') list = list.filter((c) => savedIds.includes(c.id))
    else if (listFilter === 'Applied') list = list.filter((c) => appliedIds.includes(c.id) || appliedOpportunityIds.includes(c.id))
    else if (listFilter === 'High match') list = list.filter((c) => (c.matchPercent ?? 0) >= 85)

    if (filters.location !== 'Any') {
      list = list.filter((c) => {
        const loc = (c.location || '').toLowerCase()
        if (filters.location === 'Remote') return /online|remote/.test(loc)
        if (filters.location === 'Hybrid') return /hybrid/.test(loc)
        if (filters.location === 'On-site') return !/online|remote|hybrid/.test(loc)
        return true
      })
    }

    if (filters.deadline !== 'any') {
      list = list.filter((c) => {
        const d = deadlineDays(c.deadline)
        if (filters.deadline === 'week') return d <= 7
        if (filters.deadline === 'month') return d <= 30
        return true
      })
    }

    if (filters.minMatch > 0) {
      list = list.filter((c) => (c.matchPercent ?? 0) >= filters.minMatch)
    }

    if (filters.sdgs.length) {
      list = list.filter((c) => c.sdgs?.some((s) => filters.sdgs.includes(s.number)))
    }

    if (sortBy === 'match') list.sort((a, b) => (b.matchPercent ?? 0) - (a.matchPercent ?? 0))
    else if (sortBy === 'deadline') list.sort((a, b) => deadlineDays(a.deadline) - deadlineDays(b.deadline))
    // posted: keep original order

    return list
  }, [allCards, activeTab, listFilter, savedIds, appliedIds, appliedOpportunityIds, filters, sortBy])

  const groupedByType = useMemo(() => {
    const buckets = { internship: [], challenge: [], job: [], event: [] }
    filteredCards.forEach((c) => {
      if (buckets[c.type]) buckets[c.type].push(c)
    })
    return buckets
  }, [filteredCards])

  const overviewCounts = useMemo(() => {
    const byType = { internship: 0, challenge: 0, job: 0, event: 0 }
    allCards.forEach((c) => {
      if (byType[c.type] != null) byType[c.type] += 1
    })
    return {
      new: opportunitiesHub.heroHeadline?.count ?? allCards.length,
      urgent: allCards.filter((c) => deadlineDays(c.deadline) <= 5).length,
      saved: savedIds.length,
      applied: new Set([...appliedIds, ...appliedOpportunityIds]).size,
      byType,
    }
  }, [allCards, savedIds, appliedIds, appliedOpportunityIds])

  const toggleSave = (id) => {
    setSavedIds((current) => {
      const saved = current.includes(id)
      showToast(saved ? 'Removed from saved opportunities' : 'Saved to your opportunities')
      return saved ? current.filter((s) => s !== id) : [...current, id]
    })
  }

  const handleApplied = (opportunity) => {
    setAppliedIds((prev) => (prev.includes(opportunity.id) ? prev : [...prev, opportunity.id]))
    addOpportunityTrackerEntry({
      logo: opportunity.logo,
      logoTone: opportunity.logoTone,
      company: opportunity.org,
      role: opportunity.title,
      dateLabel: 'Applied just now',
      status: 'Applied',
      statusTone: 'emerald',
    })
  }

  const handleViewDetails = (id) => {
    const detail = opportunityDetails[id]
    const summary = [...opportunitiesHub.cards, ...opportunitiesHub.heroPicks].find((item) => item.id === id)
    if (detail) setActiveOpportunity({ ...detail, sdgs: summary?.sdgs ?? detail.sdgs ?? [] })
  }

  const cardHandlers = (card) => ({
    saved: savedIds.includes(card.id),
    applied: appliedIds.includes(card.id) || appliedOpportunityIds.includes(card.id),
    onToggleSave: () => toggleSave(card.id),
    onView: () => handleViewDetails(card.id),
  })

  const handleAIChip = (kind) => {
    setShowFilters(true)
    if (kind === 'remote') setFilters((f) => ({ ...f, location: 'Remote' }))
    if (kind === 'deadline') setFilters((f) => ({ ...f, deadline: 'week' }))
    if (kind === 'skillgaps') showToast('Skill gaps highlighted in the sidebar')
  }

  return (
    <div className="min-h-screen bg-[#F5F6FA] text-[#1A1C2E]" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <HomeTopNav user={mockUser} readiness={readiness} />

      <div className="mx-auto max-w-[1280px] px-8 pb-16 pt-8">
        {/* Topbar */}
        <div className="mb-6 flex items-start justify-between gap-3">
          <div>
            <h1 className="text-[24px] font-semibold text-[#1A1C2E]">Opportunities</h1>
            <p className="mt-1 text-[13px] text-[#6B6F8A]">Your AI companion reviews new postings daily and surfaces what matters to you.</p>
          </div>
          <button
            type="button"
            onClick={() => setShowFilters((v) => !v)}
            className={`inline-flex items-center gap-1.5 rounded-lg border border-[#D0D2DC] px-3.5 py-1.5 text-[13px] transition ${
              showFilters ? 'bg-[#5B6CF9] text-white border-[#5B6CF9]' : 'bg-white text-[#1A1C2E] hover:bg-[#F5F6FA]'
            }`}
          >
            <Settings className="h-3.5 w-3.5" />
            Filters
            {activeFilterCount ? (
              <span className={`ml-1 rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${showFilters ? 'bg-white/25 text-white' : 'bg-[#5B6CF9] text-white'}`}>
                {activeFilterCount}
              </span>
            ) : null}
          </button>
        </div>

        {/* Optional filter panel */}
        {showFilters ? <FilterPanel filters={filters} onChange={setFilters} onReset={resetFilters} /> : null}

        {/* AI banner */}
        <AIBanner onWhyClick={() => setShowWhyModal(true)} onChipClick={handleAIChip} />

        {/* Filter bar */}
        <div className="mb-7 flex flex-wrap items-center gap-2.5">
          <TabGroup
            options={TAB_FILTERS}
            value={activeTab}
            onChange={setActiveTab}
            renderIcon
          />
          <TabGroup
            options={LIST_FILTERS.map((f) => ({ id: f, label: f }))}
            value={listFilter}
            onChange={setListFilter}
          />
          <div className="ml-auto flex items-center gap-2.5">
            <span className="text-[13px] text-[#9EA3BC]">{filteredCards.length} results</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="cursor-pointer rounded-md border border-[#D0D2DC] bg-white px-2.5 py-1.5 text-[13px] text-[#6B6F8A] outline-none"
            >
              {SORT_OPTIONS.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
            </select>
          </div>
        </div>

        {/* 2-col layout */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_290px]">
          <div>
            {filteredCards.length === 0 ? (
              <div className="rounded-xl border border-dashed border-[#D0D2DC] bg-white p-12 text-center">
                <p className="text-[15px] font-semibold text-[#1A1C2E]">No opportunities match your filters</p>
                <p className="mt-1 text-[13px] text-[#6B6F8A]">Try clearing a filter or picking a different category.</p>
                <button type="button" onClick={resetFilters} className="mt-4 rounded-lg bg-[#5B6CF9] px-4 py-2 text-[13px] font-medium text-white hover:bg-[#4a5ce8]">
                  Reset filters
                </button>
              </div>
            ) : (
              <>
                <CategorySection type="internship" cards={groupedByType.internship} cardHandlers={cardHandlers} onSeeAll={(t) => navigate(`/student/opportunities/${TYPE_TO_SLUG[t]}`)} />
                <CategorySection type="challenge" cards={groupedByType.challenge} cardHandlers={cardHandlers} onSeeAll={(t) => navigate(`/student/opportunities/${TYPE_TO_SLUG[t]}`)} />
                <CategorySection type="job" cards={groupedByType.job} cardHandlers={cardHandlers} onSeeAll={(t) => navigate(`/student/opportunities/${TYPE_TO_SLUG[t]}`)} />
                <CategorySection type="event" cards={groupedByType.event} cardHandlers={cardHandlers} onSeeAll={(t) => navigate(`/student/opportunities/${TYPE_TO_SLUG[t]}`)} />
              </>
            )}
          </div>

          <Sidebar
            counts={overviewCounts}
            tracker={opportunityTracker}
            onViewAll={() => setTrackerInitialApplication(opportunityTracker[0])}
            onSelectApplication={setTrackerInitialApplication}
            onBuildRoadmap={() => navigate('/student/skill-development')}
          />
        </div>
      </div>

      {showWhyModal && <WhyThese3Modal sections={opportunitiesHub.whyThese3} onClose={() => setShowWhyModal(false)} />}
      <OpportunityDetailsPanel
        opportunity={activeOpportunity}
        onClose={() => setActiveOpportunity(null)}
        onApplied={handleApplied}
        onApplyNow={(opportunity) => navigate('/student/intelligence', { state: { applyOpportunity: opportunity } })}
      />
      {trackerInitialApplication && (
        <ApplicationTrackerModal
          applications={opportunityTracker}
          initialApplication={trackerInitialApplication}
          onClose={() => setTrackerInitialApplication(null)}
        />
      )}
      <DemoToast message={toast} />
    </div>
  )
}
