import React, { useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import {
  Award,
  Banknote,
  Bell,
  Bookmark,
  BookmarkCheck,
  Briefcase,
  Building2,
  Calendar,
  CalendarClock,
  Check,
  ChevronRight,
  Clock,
  Code,
  LayoutGrid,
  List,
  MapPin,
  RefreshCw,
  Send,
  Sparkles,
  Star,
  Trophy,
  Users,
  Wifi,
} from 'lucide-react'
import HomeTopNav from '../components/home/HomeTopNav'
import { candidateOverview, mockUser, opportunitiesHub, opportunityDetails } from '../data/mockData'
import bgIntern from '../assets/Opportunity Intern bg.png'
import bgCompetition from '../assets/Opportunity Competition bg.png'
import bgJob from '../assets/Opportunity Job bg.png'
import bgEvent from '../assets/Opportunity Event bg.png'
import bgTalk from '../assets/Opportunity Talk bg.png'

const BG_ART = { intern: bgIntern, competition: bgCompetition, job: bgJob, event: bgEvent, talk: bgTalk }

// URL param -> internal type
const SLUG_TO_TYPE = { internships: 'internship', challenges: 'challenge', jobs: 'job', events: 'event' }

const CAT_INFO = {
  internship: {
    slug: 'internships',
    label: 'Internships',
    Icon: Briefcase,
    description: 'Paid and unpaid short-term roles matched to your skills and career goals.',
    color: '#185FA5',
    bg: '#E6F1FB',
    border: '#85B7EB',
    mid: '#C2D9F5',
  },
  challenge: {
    slug: 'challenges',
    label: 'Challenges',
    Icon: Trophy,
    description: 'Case competitions, hackathons, and skills challenges to build a track record.',
    color: '#854F0B',
    bg: '#FAEEDA',
    border: '#EF9F27',
    mid: '#F0D7B1',
  },
  job: {
    slug: 'jobs',
    label: 'Jobs',
    Icon: Building2,
    description: 'Full-time roles and long-term positions that match your career pathway.',
    color: '#0F6E56',
    bg: '#E1F5EE',
    border: '#5DCAA5',
    mid: '#C6E4D8',
  },
  event: {
    slug: 'events',
    label: 'Events',
    Icon: Calendar,
    description: 'Talks, workshops, and networking events tailored to your growth.',
    color: '#993556',
    bg: '#FBEAF0',
    border: '#ED93B1',
    mid: '#EACFDA',
  },
}

const TONE_BG = [
  'linear-gradient(110deg, #FFFFFF 0%, #FBFCFF 52%, #EAF2FF 100%)', // blue
  'linear-gradient(110deg, #FFFFFF 0%, #FAFEFC 52%, #DFF4EA 100%)', // green
  'linear-gradient(110deg, #FFFFFF 0%, #FFFBFC 52%, #FBEAF0 100%)', // rose
  'linear-gradient(110deg, #FFFFFF 0%, #FDFCFB 52%, #EEECE7 100%)', // stone
  'linear-gradient(110deg, #FFFFFF 0%, #FCFBFF 52%, #F0ECFF 100%)', // indigo
]
const TONE_BORDER = ['#C9DDF8', '#BFE1D3', '#EBCDD8', '#DDD9D1', '#D9D5F5']

const FILTER_CHIPS = [
  { id: 'location', label: 'Location', Icon: MapPin },
  { id: 'paid', label: 'Paid only', Icon: Banknote },
  { id: 'remote', label: 'Remote', Icon: Wifi },
  { id: 'duration', label: 'Duration', Icon: Calendar },
  { id: 'sdg', label: 'SDG', Icon: Award },
  { id: 'skills', label: 'Skills', Icon: Code },
]

const LIST_TABS = ['All', 'Saved', 'Applied', 'High match']

// Extra per-card metadata (fields not stored in the base mock).
const CARD_EXTRAS = {
  'opp-1': {
    tone: 0,
    duration: '3 months',
    stipend: 'RM 2,500 / month',
    team: 'Infrastructure & Platform',
    description: [
      "Build and scale backend systems that serve millions of users across Southeast Asia. You'll work alongside senior engineers on distributed services, API performance, and system reliability.",
      'This role is ideal for candidates with strong Python fundamentals and an interest in large-scale infrastructure.',
    ],
    skillAlignment: [
      { label: 'Python', pct: 95 },
      { label: 'Backend', pct: 88 },
      { label: 'System Design', pct: 72 },
      { label: 'Docker', pct: 30 },
    ],
    requiredSkills: ['Python', 'Backend', 'System Design', 'Docker', 'Linux', 'REST APIs'],
    reasons: ['Strong Python projects', 'Backend experience', 'Career goal alignment'],
    connections: [
      { id: 'AL', bg: '#E8EBFE', color: '#5B6CF9' },
      { id: 'NS', bg: '#E1F5EE', color: '#0F6E56' },
      { id: 'JW', bg: '#FAEEDA', color: '#854F0B' },
    ],
    connectionsText: 'Alex L., Nina S., and 1 other have applied',
  },
  'opp-2': {
    tone: 1,
    duration: '6 months',
    stipend: 'RM 4,000 / month',
    team: 'AI/ML Research',
    description: [
      "Join Google's AI/ML team to work on cutting-edge machine learning infrastructure. You will contribute to internal tooling, model training pipelines, and performance optimisations.",
      'Strong Python and a foundation in ML frameworks like TensorFlow or PyTorch are expected.',
    ],
    skillAlignment: [
      { label: 'Python', pct: 95 },
      { label: 'ML Frameworks', pct: 70 },
      { label: 'Math/Stats', pct: 65 },
      { label: 'TensorFlow', pct: 45 },
    ],
    requiredSkills: ['Machine Learning', 'Python', 'TensorFlow', 'Statistics', 'Data Pipelines'],
    reasons: ['ML project evidence', 'Strong Python skills', 'AI pathway alignment'],
    connections: [
      { id: 'DT', bg: '#E8EBFE', color: '#5B6CF9' },
      { id: 'AH', bg: '#FAECE7', color: '#993C1D' },
    ],
    connectionsText: 'David T. and Asha H. have applied',
  },
  'opp-3': {
    tone: 1,
    duration: '3 months',
    stipend: 'RM 2,400 / month',
    team: 'Analytics · Consumer',
    description: [
      "Work on Grab's analytics stack to unlock insight across ride-hailing and delivery. You'll build dashboards, write SQL, and ship one measurable insight during the internship.",
    ],
    skillAlignment: [
      { label: 'SQL', pct: 85 },
      { label: 'Excel', pct: 78 },
      { label: 'Python', pct: 65 },
      { label: 'Storytelling', pct: 55 },
    ],
    requiredSkills: ['SQL', 'Data Analysis', 'Excel', 'Python', 'Communication'],
    reasons: ['SQL fundamentals', 'Dashboard-shipping experience', 'Analytics interest'],
    connections: [
      { id: 'FN', bg: '#E8EBFE', color: '#5B6CF9' },
      { id: 'JL', bg: '#E1F5EE', color: '#0F6E56' },
    ],
    connectionsText: '2 connections have applied',
  },
}

function getCardExtras(id, index) {
  const base = CARD_EXTRAS[id]
  const fallback = {
    tone: index % TONE_BG.length,
    duration: '3 months',
    stipend: '—',
    team: 'To be confirmed',
    description: ['A structured opportunity matched to your CareerOS profile. Open the full listing to read the brief and prepare your application.'],
    skillAlignment: [
      { label: 'Core skill', pct: 70 },
      { label: 'Supporting', pct: 55 },
      { label: 'Stretch', pct: 30 },
    ],
    requiredSkills: [],
    reasons: ['Matched to your profile'],
    connections: [],
    connectionsText: 'No connections yet in this role',
  }
  return { ...fallback, ...(base || {}) }
}

function deadlineDays(text) {
  const m = String(text || '').match(/(\d+)/)
  return m ? parseInt(m[1], 10) : 99
}
function deadlineTone(days) {
  if (days <= 5) return { bg: '#FAECE7', color: '#993C1D' }
  if (days <= 12) return { bg: '#FAEEDA', color: '#854F0B' }
  return { bg: '#F5F6FA', color: '#6B6F8A' }
}
function ringColorFor(pct) {
  if (pct >= 85) return '#0F6E56'
  if (pct >= 70) return '#5B6CF9'
  return '#9EA3BC'
}
function sdgTone(number) {
  if ([8, 9].includes(number)) return { bg: '#E1F5EE', color: '#0F6E56' }
  if ([4].includes(number)) return { bg: '#E6F1FB', color: '#185FA5' }
  return { bg: '#FAEEDA', color: '#854F0B' }
}

function MatchRing({ pct, size = 62 }) {
  const color = ringColorFor(pct)
  return (
    <div
      className="relative isolate flex items-center justify-center rounded-full text-[14px] font-bold"
      style={{
        width: size, height: size,
        background: `conic-gradient(${color} ${pct}%, #DCE6F4 0)`,
        color: '#1A1C2E',
        paddingBottom: 8,
      }}
    >
      <span className="absolute inset-[4px] -z-10 rounded-full bg-white" />
      <span style={{ color }}>{pct}%</span>
      <span className="absolute bottom-[11px] left-0 w-full text-center text-[7px] font-medium text-[#9EA3BC]">AI match</span>
    </div>
  )
}

function ListRow({ card, extras, cat, selected, saved, applied, onSelect, onSave }) {
  const days = deadlineDays(card.deadline)
  const dtone = deadlineTone(days)
  const match = card.matchPercent ?? 0
  const art = BG_ART[card.bgImageKey]

  return (
    <div
      onClick={onSelect}
      className={`relative grid min-h-[176px] cursor-pointer grid-cols-[minmax(0,1fr)_148px_82px] gap-[14px] overflow-hidden rounded-2xl border p-4 pl-6 transition ${
        selected ? 'shadow-[0_0_0_2px_var(--sel)]' : 'hover:shadow-[0_2px_12px_rgba(0,0,0,.07)]'
      }`}
      style={{
        background: TONE_BG[extras.tone],
        borderColor: selected ? cat.color : TONE_BORDER[extras.tone],
        // custom prop consumed by tailwind arbitrary shadow ring above
        ['--sel']: cat.bg,
      }}
    >
      <span className="absolute inset-y-[14px] left-0 w-1 rounded-r" style={{ background: cat.border }} />

      <div className="flex min-w-0 flex-col gap-2.5">
        <div className="flex items-center gap-2.5">
          <span className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[10px] text-[11px] font-semibold" style={{ background: cat.bg, color: cat.color }}>
            {card.logo}
          </span>
          <div>
            <p className="text-[14px] font-semibold leading-tight text-[#1A1C2E]">{card.title}</p>
            <p className="mt-0.5 text-[12px] text-[#6B6F8A]">{card.org}{card.location ? ` · ${card.location}` : ''}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {card.sdgs?.map((s) => {
            const t = sdgTone(s.number)
            return (
              <span key={s.number} className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-medium" style={{ background: t.bg, color: t.color }}>
                <Star className="h-2.5 w-2.5" />
                SDG {s.number}
              </span>
            )
          })}
          {card.tags?.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded border border-[#E8E9EF] bg-[#F5F6FA] px-2 py-0.5 text-[11px] text-[#6B6F8A]">{tag}</span>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3.5 text-[12px] text-[#6B6F8A]">
          <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" /> {card.location || '—'}</span>
          <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" /> {extras.duration}</span>
          {extras.connections.length ? (
            <span className="inline-flex items-center gap-1.5 text-[11px] text-[#9EA3BC]">
              <span className="flex">
                {extras.connections.slice(0, 3).map((c) => (
                  <span key={c.id} className="-mr-1.5 flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 border-white text-[7px] font-semibold" style={{ background: c.bg, color: c.color }}>{c.id}</span>
                ))}
              </span>
              <span className="ml-1.5">{extras.connections.length} connections applied</span>
            </span>
          ) : null}
        </div>

        {extras.reasons.length ? (
          <div className="mt-auto flex flex-wrap gap-x-3 gap-y-1.5 border-t border-[#E8E9EF] pt-2 text-[10px] text-[#6B6F8A]">
            {extras.reasons.map((r) => (
              <span key={r} className="inline-flex items-center gap-1">
                <Check className="h-3 w-3 text-[#0F6E56]" />
                {r}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      <div className="relative h-[126px] w-[148px] self-center overflow-hidden rounded-xl">
        {art ? (
          <img src={art} alt="" className="absolute -bottom-2 -right-3 h-[142px] w-[168px] object-contain object-right-bottom opacity-85 transition-transform duration-200 group-hover:-translate-y-0.5" style={{ filter: 'drop-shadow(0 7px 10px rgba(20,29,78,.08))' }} />
        ) : null}
      </div>

      <div className="flex flex-col items-center gap-2 pt-0.5">
        <MatchRing pct={match} />
        <span className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-medium" style={{ background: dtone.bg, color: dtone.color }}>
          <Clock className="h-3 w-3" /> {days} days
        </span>
        {extras.stipend && extras.stipend !== '—' ? (
          <span className="text-center text-[9px] font-semibold leading-tight text-[#5B6CF9]">{extras.stipend.replace(' / ', '\n')}</span>
        ) : null}
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onSave() }}
          className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-md border border-[#D0D2DC] bg-white text-[#6B6F8A] transition hover:bg-[#F5F6FA]"
          aria-label={saved ? 'Unsave' : 'Save'}
        >
          {saved ? <BookmarkCheck className="h-3.5 w-3.5 text-[#5B6CF9]" /> : <Bookmark className="h-3.5 w-3.5" />}
        </button>
        {applied ? <span className="rounded bg-[#E1F5EE] px-1.5 py-0.5 text-[9px] font-semibold text-[#0F6E56]">Applied</span> : null}
      </div>
    </div>
  )
}

function DetailPanel({ card, extras, cat, onSave, saved, onApply }) {
  if (!card) return null
  const match = card.matchPercent ?? 0
  const days = deadlineDays(card.deadline)
  const dtone = deadlineTone(days)

  return (
    <aside className="sticky top-[72px] overflow-hidden rounded-2xl border border-[#E8E9EF] bg-white">
      {/* Hero */}
      <div className="border-b p-5" style={{ background: cat.bg, borderColor: cat.mid }}>
        <div className="mb-3 flex items-start gap-3">
          <span className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-xl border bg-white text-[13px] font-bold" style={{ borderColor: cat.border, color: cat.color }}>
            {card.logo}
          </span>
          <div>
            <p className="text-[15px] font-semibold leading-tight text-[#1A1C2E]">{card.title}</p>
            <p className="mt-0.5 text-[12px] text-[#6B6F8A]">{card.org}{card.location ? ` · ${card.location}` : ''}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-baseline gap-0.5 text-[22px] font-bold" style={{ color: ringColorFor(match) }}>
            {match}<span className="text-[13px] font-normal text-[#6B6F8A]">% match</span>
          </div>
          <div className="flex-1">
            <div className="h-1.5 overflow-hidden rounded-full bg-white/60">
              <div className="h-full rounded-full" style={{ width: `${match}%`, background: ringColorFor(match) }} />
            </div>
          </div>
          <span className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[12px] font-medium" style={{ background: dtone.bg, color: dtone.color }}>
            <Clock className="h-3 w-3" />
            {days} days left
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-4 p-5">
        <DPSection title="Role details">
          <div className="flex flex-col gap-2 text-[13px]">
            <KV Icon={MapPin} label="Location">{card.location || '—'}</KV>
            <KV Icon={Calendar} label="Duration">{extras.duration}</KV>
            <KV Icon={Banknote} label="Stipend">{extras.stipend}</KV>
            <KV Icon={Users} label="Team">{extras.team}</KV>
          </div>
        </DPSection>

        <DPSection title="About the role">
          <div className="space-y-1.5 text-[13px] leading-6 text-[#6B6F8A]">
            {extras.description.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </DPSection>

        <DPSection title="Skill alignment">
          <div className="flex flex-col gap-2">
            {extras.skillAlignment.map((s) => {
              const color = s.pct >= 80 ? '#0F6E56' : s.pct >= 60 ? '#854F0B' : '#E24B4A'
              return (
                <div key={s.label} className="flex items-center gap-2">
                  <span className="w-20 shrink-0 text-[12px] text-[#6B6F8A]">{s.label}</span>
                  <div className="h-[5px] flex-1 overflow-hidden rounded-[3px] bg-[#E8E9EF]">
                    <div className="h-full rounded-[3px]" style={{ width: `${s.pct}%`, background: color }} />
                  </div>
                  <span className="w-8 text-right text-[11px] font-semibold" style={{ color }}>{s.pct}%</span>
                </div>
              )
            })}
          </div>
        </DPSection>

        {extras.requiredSkills.length ? (
          <DPSection title="Required skills">
            <div className="flex flex-wrap gap-1.5">
              {extras.requiredSkills.map((t) => {
                const hi = card.tags?.includes(t)
                return (
                  <span
                    key={t}
                    className="rounded-md border px-2.5 py-1 text-[12px]"
                    style={hi ? { background: cat.bg, borderColor: cat.border, color: cat.color, fontWeight: 500 } : { background: '#F5F6FA', borderColor: '#E8E9EF', color: '#6B6F8A' }}
                  >
                    {t}
                  </span>
                )
              })}
            </div>
          </DPSection>
        ) : null}

        {card.sdgs?.length ? (
          <DPSection title="SDG alignment">
            <div className="flex flex-wrap gap-1.5">
              {card.sdgs.map((s) => {
                const t = sdgTone(s.number)
                return (
                  <span key={s.number} className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium" style={{ background: t.bg, color: t.color }}>
                    <Award className="h-3 w-3" /> SDG {s.number} · {s.title}
                  </span>
                )
              })}
            </div>
          </DPSection>
        ) : null}

        <DPSection title="Your network">
          <div className="flex items-center gap-2">
            {extras.connections.length ? (
              <div className="flex">
                {extras.connections.map((c) => (
                  <span key={c.id} className="-mr-2 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white text-[10px] font-semibold" style={{ background: c.bg, color: c.color }}>{c.id}</span>
                ))}
              </div>
            ) : null}
            <span className="ml-2 text-[12px] text-[#6B6F8A]">{extras.connectionsText}</span>
          </div>
        </DPSection>
      </div>

      {/* Actions */}
      <div className="flex gap-2 border-t border-[#E8E9EF] p-4">
        <button
          type="button"
          onClick={onSave}
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-[#D0D2DC] bg-white px-3 py-2 text-[13px] font-medium text-[#1A1C2E] transition hover:bg-[#F5F6FA]"
        >
          {saved ? <BookmarkCheck className="h-3.5 w-3.5 text-[#5B6CF9]" /> : <Bookmark className="h-3.5 w-3.5" />}
          {saved ? 'Saved' : 'Save'}
        </button>
        <button
          type="button"
          onClick={onApply}
          className="inline-flex flex-[2] items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-[13px] font-medium text-white transition hover:opacity-90"
          style={{ background: cat.color }}
        >
          <Send className="h-3.5 w-3.5" /> Apply now
        </button>
      </div>
    </aside>
  )
}

function DPSection({ title, children }) {
  return (
    <div>
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[.06em] text-[#9EA3BC]">{title}</p>
      {children}
    </div>
  )
}

function KV({ Icon, label, children }) {
  return (
    <div className="flex items-start gap-2.5">
      <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#9EA3BC]" />
      <span className="w-[70px] shrink-0 text-[#6B6F8A]">{label}</span>
      <span className="font-medium text-[#1A1C2E]">{children}</span>
    </div>
  )
}

export default function OpportunityCategoryPage() {
  const { categoryId } = useParams()
  const navigate = useNavigate()
  const readiness = candidateOverview.careerSnapshot.readiness

  const type = SLUG_TO_TYPE[categoryId]
  const cat = type ? CAT_INFO[type] : null

  const [listTab, setListTab] = useState('All')
  const [activeChips, setActiveChips] = useState(new Set())
  const [sortBy, setSortBy] = useState('match')
  const [view, setView] = useState('list')
  const [savedIds, setSavedIds] = useState([])
  const [appliedIds, setAppliedIds] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const [toast, setToast] = useState('')

  const categoryCards = useMemo(
    () => (type ? opportunitiesHub.cards.filter((c) => c.type === type) : []),
    [type],
  )

  const filteredCards = useMemo(() => {
    let list = categoryCards.slice()
    if (listTab === 'Saved') list = list.filter((c) => savedIds.includes(c.id))
    else if (listTab === 'Applied') list = list.filter((c) => appliedIds.includes(c.id))
    else if (listTab === 'High match') list = list.filter((c) => (c.matchPercent ?? 0) >= 80)

    if (activeChips.has('remote')) list = list.filter((c) => /remote|online|hybrid/i.test(c.location || ''))
    if (activeChips.has('paid')) list = list // demo — treat all as paid

    if (sortBy === 'match') list.sort((a, b) => (b.matchPercent ?? 0) - (a.matchPercent ?? 0))
    else if (sortBy === 'deadline') list.sort((a, b) => deadlineDays(a.deadline) - deadlineDays(b.deadline))

    return list
  }, [categoryCards, listTab, savedIds, appliedIds, activeChips, sortBy])

  const activeCard = useMemo(() => {
    if (!filteredCards.length) return null
    return filteredCards.find((c) => c.id === selectedId) || filteredCards[0]
  }, [filteredCards, selectedId])
  const activeIndex = filteredCards.findIndex((c) => c === activeCard)
  const activeExtras = activeCard ? getCardExtras(activeCard.id, Math.max(0, activeIndex)) : null

  const stats = useMemo(() => {
    const total = categoryCards.length
    const highMatch = categoryCards.filter((c) => (c.matchPercent ?? 0) >= 80).length
    const closingWeek = categoryCards.filter((c) => deadlineDays(c.deadline) <= 7).length
    return {
      total,
      highMatch,
      closingWeek,
      newSince: Math.min(12, total),
      saved: savedIds.length,
    }
  }, [categoryCards, savedIds])

  const toggleChip = (id) => {
    setActiveChips((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }
  const toggleSave = (id) => {
    setSavedIds((prev) => {
      const has = prev.includes(id)
      showToast(has ? 'Removed from saved' : 'Saved to your opportunities')
      return has ? prev.filter((x) => x !== id) : [...prev, id]
    })
  }
  const showToast = (msg) => { setToast(msg); window.clearTimeout(showToast._t); showToast._t = window.setTimeout(() => setToast(''), 2000) }

  if (!type || !cat) return <Navigate to="/student/opportunities" replace />

  return (
    <div className="min-h-screen bg-[#F5F6FA] text-[#1A1C2E]" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <HomeTopNav user={mockUser} readiness={readiness} />

      {/* Breadcrumb */}
      <div className="mx-auto max-w-[1280px] px-8 pt-4">
        <div className="flex items-center gap-1.5 text-[13px] text-[#9EA3BC]">
          <button type="button" onClick={() => navigate('/student/opportunities')} className="inline-flex items-center gap-1 text-[#6B6F8A] hover:text-[#1A1C2E]">
            <LayoutGrid className="h-3.5 w-3.5" /> Opportunities
          </button>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-medium" style={{ color: cat.color }}>{cat.label}</span>
        </div>
      </div>

      {/* Hero */}
      <div className="mt-4 border-b border-[#E8E9EF] bg-white px-8 pt-6">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="flex h-[52px] w-[52px] items-center justify-center rounded-2xl border" style={{ background: cat.bg, borderColor: cat.border }}>
                <cat.Icon className="h-6 w-6" style={{ color: cat.color }} />
              </div>
              <div>
                <h1 className="text-[22px] font-semibold text-[#1A1C2E]">{cat.label}</h1>
                <p className="mt-0.5 text-[13px] text-[#6B6F8A]">{cat.description}</p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button type="button" onClick={() => showToast(`Alert set for new ${cat.label.toLowerCase()}`)} className="inline-flex items-center gap-1.5 rounded-lg border border-[#D0D2DC] bg-white px-3 py-1.5 text-[13px] text-[#1A1C2E] hover:bg-[#F5F6FA]">
                <Bell className="h-3.5 w-3.5" /> Set alert
              </button>
              <button type="button" onClick={() => setSortBy('match')} className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[13px] font-medium text-white" style={{ background: cat.color }}>
                <Sparkles className="h-3.5 w-3.5" /> Find best matches
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-8 border-t border-[#E8E9EF] py-4">
            <Stat value={stats.total} label="Total listings" color={cat.color} />
            <Stat value={stats.highMatch} label="High match (80%+)" color="#0F6E56" />
            <Stat value={stats.closingWeek} label="Closing this week" color="#993C1D" />
            <Stat value={stats.newSince} label="New since last visit" />
            <Stat value={stats.saved} label="Saved" />
          </div>
        </div>
      </div>

      {/* Filter row */}
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center gap-2.5 px-8 py-5">
        <div className="inline-flex gap-[3px] rounded-[9px] bg-[#EBEBF0] p-[3px]">
          {LIST_TABS.map((t) => {
            const active = listTab === t
            return (
              <button key={t} type="button" onClick={() => setListTab(t)} className={`rounded-md px-3.5 py-1 text-[13px] font-medium transition ${active ? 'bg-white text-[#1A1C2E] shadow-[0_1px_3px_rgba(0,0,0,.08)]' : 'text-[#6B6F8A] hover:text-[#1A1C2E]'}`}>{t}</button>
            )
          })}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {FILTER_CHIPS.map((chip) => {
            const active = activeChips.has(chip.id)
            return (
              <button
                key={chip.id}
                type="button"
                onClick={() => toggleChip(chip.id)}
                className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[12px] transition ${
                  active ? 'font-medium' : 'text-[#6B6F8A]'
                }`}
                style={active ? { background: cat.bg, borderColor: cat.border, color: cat.color } : { background: 'white', borderColor: '#D0D2DC' }}
              >
                <chip.Icon className="h-3 w-3" />
                {chip.label}
              </button>
            )
          })}
        </div>

        <div className="ml-auto flex items-center gap-2">
          <span className="whitespace-nowrap text-[13px] text-[#9EA3BC]">{filteredCards.length} results</span>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="cursor-pointer rounded-md border border-[#D0D2DC] bg-white px-2.5 py-1.5 text-[13px] text-[#6B6F8A] outline-none">
            <option value="match">Sort: AI match</option>
            <option value="deadline">Sort: Deadline</option>
            <option value="posted">Sort: Date posted</option>
          </select>
          <div className="flex gap-0.5 rounded-md bg-[#EBEBF0] p-[3px]">
            <button type="button" onClick={() => setView('list')} className={`flex h-7 w-7 items-center justify-center rounded ${view === 'list' ? 'bg-white text-[#1A1C2E] shadow-[0_1px_3px_rgba(0,0,0,.08)]' : 'text-[#6B6F8A]'}`}><List className="h-4 w-4" /></button>
            <button type="button" onClick={() => setView('grid')} className={`flex h-7 w-7 items-center justify-center rounded ${view === 'grid' ? 'bg-white text-[#1A1C2E] shadow-[0_1px_3px_rgba(0,0,0,.08)]' : 'text-[#6B6F8A]'}`}><LayoutGrid className="h-4 w-4" /></button>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-start gap-6 px-8 pb-16 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div>
          {/* AI insight */}
          <div className="mb-2.5 flex items-start gap-2.5 rounded-xl border border-[#C7CDFC] bg-[#F0F2FF] p-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#5B6CF9]">
              <Sparkles className="h-4 w-4 text-white" />
            </span>
            <div>
              <p className="text-[13px] font-semibold text-[#1A1C2E]">Your top matches lean on your Python and backend evidence</p>
              <p className="text-[12px] text-[#6B6F8A]">Adding Docker to your skill profile could unlock 4 more high-match {cat.label.toLowerCase()}.</p>
            </div>
          </div>

          {filteredCards.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[#D0D2DC] bg-white p-12 text-center">
              <p className="text-[15px] font-semibold text-[#1A1C2E]">No {cat.label.toLowerCase()} match your filters</p>
              <p className="mt-1 text-[13px] text-[#6B6F8A]">Try clearing a chip or switching tab.</p>
            </div>
          ) : (
            <div className={view === 'grid' ? 'grid grid-cols-1 gap-2.5 sm:grid-cols-2' : 'flex flex-col gap-2.5'}>
              {filteredCards.map((card, i) => {
                const extras = getCardExtras(card.id, i)
                return (
                  <ListRow
                    key={card.id}
                    card={card}
                    extras={extras}
                    cat={cat}
                    selected={activeCard?.id === card.id}
                    saved={savedIds.includes(card.id)}
                    applied={appliedIds.includes(card.id)}
                    onSelect={() => setSelectedId(card.id)}
                    onSave={() => toggleSave(card.id)}
                  />
                )
              })}
            </div>
          )}

          <div className="pt-6 text-center">
            <button type="button" className="inline-flex items-center gap-1.5 rounded-lg border border-[#D0D2DC] bg-white px-6 py-2 text-[13px] text-[#6B6F8A] hover:bg-[#F5F6FA]">
              <RefreshCw className="h-3.5 w-3.5" /> Load more
            </button>
          </div>
        </div>

        <div className="hidden lg:block">
          <DetailPanel
            card={activeCard}
            extras={activeExtras}
            cat={cat}
            saved={activeCard ? savedIds.includes(activeCard.id) : false}
            onSave={() => activeCard && toggleSave(activeCard.id)}
            onApply={() => {
              if (!activeCard) return
              setAppliedIds((prev) => (prev.includes(activeCard.id) ? prev : [...prev, activeCard.id]))
              showToast(`Applied to ${activeCard.title}`)
            }}
          />
        </div>
      </div>

      {toast ? (
        <div className="fixed bottom-5 right-5 z-50 rounded-xl border border-[#E8E9EF] bg-white px-4 py-2.5 text-sm font-medium text-[#1A1C2E] shadow-[0_10px_30px_rgba(15,17,32,.08)]">
          {toast}
        </div>
      ) : null}
    </div>
  )
}

function Stat({ value, label, color }) {
  return (
    <div className="flex flex-col">
      <strong className="text-[18px] font-semibold" style={color ? { color } : undefined}>{value}</strong>
      <span className="mt-0.5 text-[12px] text-[#6B6F8A]">{label}</span>
    </div>
  )
}
