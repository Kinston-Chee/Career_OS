import React, { useMemo, useState } from 'react'
import {
  ArrowDown,
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  ChevronDown,
  Clock3,
  Filter,
  GraduationCap,
  HeartHandshake,
  MessageCircle,
  Search,
  Sparkles,
  Star,
  Users,
  Video,
  X,
} from 'lucide-react'
import HomeTopNav from '../components/home/HomeTopNav'
import TypewriterText from '../components/ui/TypewriterText'
import robotImage from '../assets/career-os-robot.png'
import { candidateOverview, mockUser } from '../data/mockData'

const recommendedMentorships = [
  {
    id: 'rec-1',
    match: 98,
    title: 'Data Analytics Career Kickstart',
    company: 'Marsh McLennan',
    type: '1:1 Mentorship',
    duration: '4 Weeks',
  },
  {
    id: 'rec-2',
    match: 95,
    title: 'Breaking Into Data: Student to Analyst',
    company: 'Deloitte Malaysia',
    type: 'Group Mentorship',
    duration: '3 Weeks',
  },
  {
    id: 'rec-3',
    match: 93,
    title: 'Portfolio Building for Beginners',
    company: 'Shopee',
    type: '1:1 Mentorship',
    duration: '4 Weeks',
  },
  {
    id: 'rec-4',
    match: 91,
    title: 'Resume & Interview Mastery',
    company: 'AIA Malaysia',
    type: 'Career Coaching',
    duration: '2 Weeks',
  },
]

const categories = [
  { id: 'career', label: 'Career Guidance', note: 'Recommended', icon: HeartHandshake, tone: 'blue' },
  { id: 'resume', label: 'Resume & Interview', note: 'Fix application gaps', icon: BriefcaseBusiness, tone: 'blue' },
  { id: 'industry', label: 'Industry Insights', note: 'Explore real roles', icon: Search, tone: 'emerald' },
  { id: 'skill', label: 'Skill Development', note: 'Grow with expert advice', icon: GraduationCap, tone: 'amber' },
  { id: 'entrepreneurship', label: 'Entrepreneurship', note: 'Start and build ideas', icon: Sparkles, tone: 'rose' },
  { id: 'leadership', label: 'Leadership', note: 'Lead teams confidently', icon: Users, tone: 'indigo' },
  { id: 'switching', label: 'Career Switching', note: 'Plan a clean pivot', icon: ArrowRight, tone: 'blue' },
  { id: 'internship', label: 'First Internship', note: 'Land the first role', icon: BriefcaseBusiness, tone: 'blue' },
  { id: 'graduate', label: 'Graduate Jobs', note: 'Prepare for full-time', icon: GraduationCap, tone: 'emerald' },
  { id: 'networking', label: 'Networking', note: 'Build real connections', icon: MessageCircle, tone: 'amber' },
]

const mentorshipPrograms = [
  {
    id: 'mentor-1',
    match: 98,
    title: 'Data Analytics Career Kickstart',
    mentor: 'Sarah Tan',
    role: 'Lead Data Analyst',
    company: 'Marsh McLennan',
    logo: 'MM',
    avatar: 'ST',
    description: 'Helping students move from coursework to real analytics work through portfolio reviews, SQL practice and career planning.',
    tags: ['Data Analytics', 'Portfolio', 'SQL'],
    duration: '4 Weeks',
    format: '1:1',
    seats: '3 seats left',
    rating: '4.9',
    mentees: 128,
    accent: 'blue',
    industry: 'Consulting',
    categoryIds: ['career', 'skill', 'internship'],
  },
  {
    id: 'mentor-2',
    match: 95,
    title: 'Breaking Into Data: Student to Analyst',
    mentor: 'Amirul Hafiz',
    role: 'Senior Consultant, Analytics',
    company: 'Deloitte Malaysia',
    logo: 'D',
    avatar: 'AH',
    description: 'A practical group mentorship for students preparing for analyst roles, case interviews and client-facing data work.',
    tags: ['Data Analysis', 'Consulting', 'Interview Prep'],
    duration: '3 Weeks',
    format: 'Group',
    seats: '8 seats left',
    rating: '4.8',
    mentees: 96,
    accent: 'emerald',
    industry: 'Consulting',
    categoryIds: ['career', 'industry', 'internship', 'graduate'],
  },
  {
    id: 'mentor-3',
    match: 93,
    title: 'Portfolio Building for Beginners',
    mentor: 'Melissa Wong',
    role: 'Product Analytics Manager',
    company: 'Shopee',
    logo: 'S',
    avatar: 'MW',
    description: 'Build a portfolio that shows business thinking, clean dashboards and measurable outcomes for data internships.',
    tags: ['Portfolio', 'Data Viz', 'Business Insight'],
    duration: '4 Weeks',
    format: '1:1',
    seats: '2 seats left',
    rating: '4.9',
    mentees: 74,
    accent: 'orange',
    industry: 'Technology',
    categoryIds: ['skill', 'internship', 'networking'],
  },
  {
    id: 'mentor-4',
    match: 91,
    title: 'Resume & Interview Mastery',
    mentor: 'Nadia Rahman',
    role: 'Talent Acquisition Partner',
    company: 'AIA Malaysia',
    logo: 'AIA',
    avatar: 'NR',
    description: 'Get direct recruiter feedback on your resume, internship stories and interview answers for analytics and business roles.',
    tags: ['Resume', 'Interview Prep', 'Recruiter Advice'],
    duration: '2 Weeks',
    format: 'Group',
    seats: '12 seats left',
    rating: '4.7',
    mentees: 141,
    accent: 'rose',
    industry: 'Financial Services',
    categoryIds: ['resume', 'internship', 'graduate'],
  },
  {
    id: 'mentor-5',
    match: 89,
    title: 'Python Projects for Data Roles',
    mentor: 'Jason Lim',
    role: 'Data Scientist',
    company: 'Grab',
    logo: 'GR',
    avatar: 'JL',
    description: 'Turn Python, pandas and machine learning practice into a project story employers can understand quickly.',
    tags: ['Python', 'Machine Learning', 'Career Memory'],
    duration: '5 Weeks',
    format: '1:1',
    seats: '4 seats left',
    rating: '4.8',
    mentees: 113,
    accent: 'emerald',
    industry: 'Technology',
    categoryIds: ['skill', 'industry', 'switching'],
  },
  {
    id: 'mentor-6',
    match: 87,
    title: 'Analytics in Banking & Fintech',
    mentor: 'Farah Zain',
    role: 'Business Intelligence Lead',
    company: 'Maybank',
    logo: 'MY',
    avatar: 'FZ',
    description: 'Understand how analytics teams work in financial services, from stakeholder questions to dashboard decisions.',
    tags: ['BI', 'Fintech', 'Stakeholder Communication'],
    duration: '3 Weeks',
    format: 'Group',
    seats: '10 seats left',
    rating: '4.8',
    mentees: 88,
    accent: 'amber',
    industry: 'Financial Services',
    categoryIds: ['industry', 'career', 'networking'],
  },
]

const groupSessions = [
  { id: 'session-1', title: 'Breaking Into Tech', date: '24 May 2026', time: '7:00 PM', mode: 'Online', attending: 32 },
  { id: 'session-2', title: 'Resume Review Clinic', date: '26 May 2026', time: '8:00 PM', mode: 'Online', attending: 18 },
  { id: 'session-3', title: 'Coffee Chat with Google Engineers', date: '28 May 2026', time: '6:30 PM', mode: 'Hybrid KL', attending: 45 },
  { id: 'session-4', title: 'Ask Me Anything: First Internship', date: '30 May 2026', time: '5:30 PM', mode: 'Online', attending: 54 },
]

const toneClasses = {
  blue: 'bg-blue-50 text-blue-700 border-blue-100',
  emerald: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  amber: 'bg-amber-50 text-amber-700 border-amber-100',
  rose: 'bg-rose-50 text-rose-700 border-rose-100',
  indigo: 'bg-indigo-50 text-indigo-700 border-indigo-100',
  orange: 'bg-orange-50 text-orange-700 border-orange-100',
}

function ModalShell({ title, description, onClose, children, size = 'max-w-xl' }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/20 px-4 py-6 backdrop-blur-sm" onMouseDown={onClose}>
      <section
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onMouseDown={(event) => event.stopPropagation()}
        className={`max-h-[88vh] w-full ${size} overflow-y-auto rounded-2xl border border-white/80 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.18)]`}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#11194a]">{title}</h2>
            {description && <p className="mt-1 text-sm font-medium leading-6 text-[#637094]">{description}</p>}
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="rounded-full p-2 text-[#7382a1] transition hover:bg-blue-50 hover:text-blue-700">
            <X size={18} />
          </button>
        </div>
        <div className="mt-5">{children}</div>
      </section>
    </div>
  )
}

function Toast({ message }) {
  if (!message) return null
  return (
    <div className="fixed bottom-5 right-5 z-[60] max-w-sm rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm font-semibold text-[#26365c] shadow-[0_18px_44px_rgba(37,99,235,0.16)]">
      {message}
    </div>
  )
}

function SelectPill({ label, value, options, onChange }) {
  return (
    <label className="relative block">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full appearance-none rounded-xl border border-[#dfe8f7] bg-white px-4 pr-10 text-sm font-semibold text-[#52627f] shadow-sm outline-none transition hover:border-blue-200 focus:border-blue-300 focus:ring-4 focus:ring-blue-50"
      >
        <option value="">{label}</option>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
      <ChevronDown size={16} className="pointer-events-none absolute right-3 top-4 text-[#8a96af]" />
    </label>
  )
}

function RecommendedCard({ item, onViewDetails }) {
  return (
    <article className="min-w-[250px] rounded-2xl border border-white/70 bg-white/72 p-4 shadow-[0_14px_34px_rgba(37,99,235,0.11)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white">
      <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">{item.match}% Match</span>
      <h3 className="mt-3 min-h-[44px] text-base font-semibold leading-snug text-[#11194a]">{item.title}</h3>
      <p className="mt-1 text-sm font-medium text-[#637094]">{item.company}</p>
      <div className="mt-3 space-y-1 text-xs font-semibold text-[#667596]">
        <p>- {item.type}</p>
        <p>- {item.duration}</p>
      </div>
      <button type="button" onClick={() => onViewDetails(item)} className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-blue-700">
        View Details <ArrowRight size={13} />
      </button>
    </article>
  )
}

function CategoryCard({ category, active, onClick }) {
  const Icon = category.icon
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-w-[210px] items-center gap-3 rounded-2xl border p-3.5 text-left shadow-sm transition hover:-translate-y-0.5 ${
        active ? 'border-blue-200 bg-blue-50/80' : 'border-[#e2eaf8] bg-white hover:border-blue-100'
      }`}
    >
      <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border ${toneClasses[category.tone]}`}>
        <Icon size={18} />
      </span>
      <span>
        <span className="block text-sm font-semibold text-[#11194a]">{category.label}</span>
        <span className="mt-0.5 block text-xs font-medium text-[#7382a1]">{category.note}</span>
      </span>
    </button>
  )
}

function MentorshipProgramCard({ program, onApply, onViewDetails }) {
  return (
    <article className="rounded-2xl border border-[#e2eaf8] bg-white p-5 shadow-[0_8px_22px_rgba(44,76,142,0.07)] transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[0_14px_32px_rgba(37,99,235,0.10)]">
      <div className="grid gap-5 md:grid-cols-[88px_minmax(0,1fr)_180px]">
        <div className="flex flex-row items-center gap-3 md:flex-col md:items-start">
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-white to-blue-50 text-base font-bold text-[#11194a] shadow-inner ring-1 ring-[#e2eaf8]">
            {program.avatar}
          </span>
          <span className="inline-flex min-w-14 justify-center rounded-xl border border-[#e2eaf8] bg-white px-2.5 py-1 text-xs font-bold text-[#4d5c7d] shadow-sm">
            {program.logo}
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-600">
            <Star size={13} fill="currentColor" /> {program.rating} ({program.mentees})
          </span>
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">{program.match}% Match</span>
            <span className={`rounded-full border px-2.5 py-1 text-xs font-bold ${toneClasses[program.accent] ?? toneClasses.blue}`}>{program.format} Mentorship</span>
          </div>
          <button type="button" onClick={() => onViewDetails(program)} className="mt-3 text-left text-lg font-semibold text-[#11194a] transition hover:text-blue-700">{program.title}</button>
          <p className="mt-1 text-sm font-semibold text-[#3a4669]">
            {program.mentor}
            <span className="font-medium text-[#7382a1]"> - {program.role} at {program.company}</span>
          </p>
          <p className="mt-3 max-w-2xl text-sm font-medium leading-6 text-[#52627f]">{program.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {program.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-[#f3f5fb] px-3 py-1 text-xs font-semibold text-[#52627f]">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-between gap-4 rounded-2xl border border-blue-100 bg-blue-50/30 p-4">
          <div className="space-y-2 text-sm font-semibold text-[#3a4669]">
            <p className="flex items-center gap-2"><Clock3 size={15} className="text-blue-600" /> {program.duration}</p>
            <p className="flex items-center gap-2"><Users size={15} className="text-blue-600" /> {program.format}</p>
            <p className="flex items-center gap-2"><GraduationCap size={15} className="text-blue-600" /> {program.seats}</p>
          </div>
          <button type="button" onClick={() => onApply(program)} className="h-11 rounded-xl bg-blue-600 px-4 text-sm font-bold text-white shadow-[0_12px_28px_rgba(37,99,235,0.22)] transition hover:bg-blue-700">
            Apply Now
          </button>
        </div>
      </div>
    </article>
  )
}

function HowItWorks() {
  const steps = [
    ['Browse Mentorships', 'Find programs aligned to your goal.'],
    ['Apply', 'Share your interest and questions.'],
    ['Get Matched', 'CareerOS connects you to the right mentor.'],
    ['Meet Your Mentor', 'Have sessions, ask questions and take action.'],
  ]

  return (
    <section className="rounded-2xl border border-[#e2eaf8] bg-white p-5 shadow-[0_8px_22px_rgba(44,76,142,0.07)]">
      <h2 className="text-base font-semibold text-[#11194a]">How It Works</h2>
      <div className="mt-5 space-y-1">
        {steps.map(([title, body], index) => (
          <div key={title}>
            <div className="flex gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-sm font-bold text-blue-700 ring-1 ring-blue-100">
                {index + 1}
              </span>
              <div>
                <p className="text-sm font-semibold text-[#11194a]">{title}</p>
                <p className="mt-0.5 text-xs font-medium leading-5 text-[#7382a1]">{body}</p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className="ml-5 flex h-7 items-center text-blue-300">
                <ArrowDown size={16} />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

function SessionsPanel({ onViewAll, onRequest }) {
  return (
    <section className="rounded-2xl border border-[#e2eaf8] bg-white p-5 shadow-[0_8px_22px_rgba(44,76,142,0.07)]">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-[#11194a]">Upcoming Group Sessions</h2>
        <button type="button" onClick={onViewAll} className="text-xs font-bold text-blue-700">View all</button>
      </div>
      <div className="mt-4 space-y-3">
        {groupSessions.map((session) => (
          <article key={session.id} className="rounded-2xl border border-[#edf1fb] bg-[#fbfcff] p-3.5">
            <p className="text-sm font-semibold text-[#11194a]">{session.title}</p>
            <div className="mt-2 space-y-1 text-xs font-medium text-[#7382a1]">
              <p className="flex items-center gap-1.5"><CalendarDays size={13} /> {session.date}, {session.time}</p>
              <p className="flex items-center gap-1.5"><Video size={13} /> {session.mode}</p>
              <p className="flex items-center gap-1.5"><Users size={13} /> {session.attending} attending</p>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50/50 p-4">
        <p className="text-xs font-semibold leading-5 text-[#52627f]">Can&apos;t find what you need? Request a mentor topic and we&apos;ll notify you when it is available.</p>
        <button type="button" onClick={onRequest} className="mt-3 h-10 w-full rounded-xl border border-blue-200 bg-white text-xs font-bold text-blue-700 hover:bg-blue-50">
          Request a Mentorship
        </button>
      </div>
    </section>
  )
}

function PersonalisationPanel() {
  const signals = ['Goal: Data Analytics internship', 'Career Memory: SQL + Python evidence', 'Gaps: Tableau storytelling', 'Saved jobs: Data Analyst Intern']

  return (
    <section className="rounded-2xl border border-blue-100 bg-[linear-gradient(135deg,rgba(255,255,255,0.95),rgba(239,246,255,0.76))] p-5 shadow-[0_8px_22px_rgba(44,76,142,0.07)]">
      <p className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-xs font-bold text-blue-700 shadow-sm">
        <Sparkles size={13} /> AI Personalisation
      </p>
      <h2 className="mt-3 text-base font-semibold text-[#11194a]">Why these mentors?</h2>
      <p className="mt-2 text-xs font-medium leading-5 text-[#637094]">
        CareerOS is prioritising data, portfolio and interview mentorships because they directly support your next milestone.
      </p>
      <div className="mt-4 space-y-2">
        {signals.map((signal) => (
          <p key={signal} className="rounded-xl border border-white/80 bg-white/75 px-3 py-2 text-xs font-semibold text-[#52627f]">
            {signal}
          </p>
        ))}
      </div>
    </section>
  )
}

export default function MentorshipsPage() {
  const readiness = candidateOverview.careerSnapshot.readiness
  const [activeCategory, setActiveCategory] = useState('')
  const [showRecommendations, setShowRecommendations] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [industryFilter, setIndustryFilter] = useState('')
  const [durationFilter, setDurationFilter] = useState('')
  const [minMatch, setMinMatch] = useState(0)
  const [minRating, setMinRating] = useState(0)
  const [sortBy, setSortBy] = useState('Recommended')
  const [visibleProgramCount, setVisibleProgramCount] = useState(4)
  const [activeModal, setActiveModal] = useState(null)
  const [selectedProgram, setSelectedProgram] = useState(null)
  const [toast, setToast] = useState('')
  const [requestTopic, setRequestTopic] = useState('')
  const [requestFormat, setRequestFormat] = useState('1:1 Mentorship')
  const activeLabel = categories.find((category) => category.id === activeCategory)?.label ?? 'your profile'
  const companionMessage = `Based on your current goal, I found ${recommendedMentorships.length} mentorships most likely to help you reach your next milestone.`

  const filteredPrograms = useMemo(() => {
    const query = searchQuery.toLowerCase()
    const results = mentorshipPrograms.filter((program) => {
      const searchable = [program.title, program.mentor, program.role, program.company, program.industry, ...program.tags].join(' ').toLowerCase()
      return (!query || searchable.includes(query))
        && (!typeFilter || program.format === typeFilter)
        && (!industryFilter || program.industry === industryFilter)
        && (!durationFilter || program.duration === durationFilter)
        && (!activeCategory || program.categoryIds.includes(activeCategory))
        && program.match >= minMatch
        && Number(program.rating) >= minRating
    })

    return [...results].sort((a, b) => {
      if (sortBy === 'Highest Rated') return Number(b.rating) - Number(a.rating)
      if (sortBy === 'Shortest Duration') return Number(a.duration.split(' ')[0]) - Number(b.duration.split(' ')[0])
      return b.match - a.match
    })
  }, [activeCategory, durationFilter, industryFilter, minMatch, minRating, searchQuery, sortBy, typeFilter])

  const displayedPrograms = filteredPrograms.slice(0, visibleProgramCount)

  const showToast = (message) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 2800)
  }

  const selectCategory = (categoryId) => {
    setActiveCategory(categoryId)
    setVisibleProgramCount(4)
    setActiveModal(null)
  }

  const openProgram = (programOrRecommendation) => {
    const program = mentorshipPrograms.find((item) => item.title === programOrRecommendation.title) ?? mentorshipPrograms[0]
    setSelectedProgram(program)
    setActiveModal('details')
  }

  const openApplication = (program) => {
    setSelectedProgram(program)
    setActiveModal('apply')
  }

  return (
    <div className="min-h-screen bg-[#f6f9ff] text-[#121a3a]">
      <HomeTopNav user={mockUser} readiness={readiness} />

      <main className="mx-auto max-w-[1480px] px-4 py-5 sm:px-6 lg:px-8">
        <div className="space-y-5">
          <header>
            <h1 className="text-2xl font-bold tracking-[-0.01em] text-[#11194a] sm:text-3xl">Mentorship</h1>
            <p className="mt-1 max-w-3xl text-sm font-medium text-[#637094]">
              Connect with experienced professionals who can guide your career, answer your questions and help you grow with real-world advice.
            </p>
          </header>

          <section className="relative overflow-hidden rounded-2xl border border-[#dfe8fb] bg-white shadow-[0_10px_28px_rgba(38,72,140,0.08)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_20%,rgba(96,165,250,0.22),transparent_30%),linear-gradient(135deg,rgba(255,255,255,0.96),rgba(239,246,255,0.84))]" />
            <div className="relative grid grid-cols-1 gap-5 px-5 py-6 sm:px-8 lg:grid-cols-[minmax(330px,0.9fr)_minmax(0,1.55fr)]">
              <div className="flex items-center gap-5">
                <img
                  src={robotImage}
                  alt="CareerOS companion robot"
                  className="h-28 w-28 flex-shrink-0 object-contain drop-shadow-[0_18px_24px_rgba(37,99,235,0.22)] sm:h-36 sm:w-36 lg:h-40 lg:w-40"
                />
                <p className="text-xl font-semibold leading-tight text-[#11194a] sm:text-2xl">
                  <TypewriterText text={companionMessage} speed={20} onComplete={() => setShowRecommendations(true)} />
                </p>
              </div>

              <div className="min-w-0">
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {showRecommendations && recommendedMentorships.map((item, index) => (
                    <div key={item.id} style={{ animation: 'chatFadeIn 200ms ease both', animationDelay: `${index * 70}ms` }}>
                      <RecommendedCard item={item} onViewDetails={openProgram} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-[#e2eaf8] bg-white/88 p-4 shadow-[0_8px_22px_rgba(44,76,142,0.07)] backdrop-blur-xl">
            <div className="grid gap-3 lg:grid-cols-[minmax(260px,1fr)_180px_160px_160px_auto_auto]">
              <div className="flex h-12 items-center gap-3 rounded-xl border border-[#dfe8f7] bg-white px-4 shadow-sm">
                <Search size={18} className="text-[#8a96af]" />
                <input
                  value={searchInput}
                  onChange={(event) => setSearchInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      setSearchQuery(searchInput.trim())
                      setVisibleProgramCount(4)
                    }
                  }}
                  className="min-w-0 flex-1 bg-transparent text-sm font-medium text-[#2c3656] placeholder:text-[#9aa6c3] focus:outline-none"
                  placeholder="Search by role, industry, company or skill..."
                />
              </div>
              <SelectPill label="Mentorship Type" value={typeFilter} options={['1:1', 'Group']} onChange={(value) => { setTypeFilter(value); setVisibleProgramCount(4) }} />
              <SelectPill label="Industry" value={industryFilter} options={['Consulting', 'Technology', 'Financial Services']} onChange={(value) => { setIndustryFilter(value); setVisibleProgramCount(4) }} />
              <SelectPill label="Duration" value={durationFilter} options={['2 Weeks', '3 Weeks', '4 Weeks', '5 Weeks']} onChange={(value) => { setDurationFilter(value); setVisibleProgramCount(4) }} />
              <button type="button" onClick={() => setActiveModal('filters')} className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-[#dfe8f7] bg-white px-4 text-sm font-semibold text-[#52627f] shadow-sm hover:bg-blue-50/40">
                <Filter size={16} /> More Filters
              </button>
              <button type="button" onClick={() => { setSearchQuery(searchInput.trim()); setVisibleProgramCount(4); showToast('Mentorship results updated.') }} className="h-12 rounded-xl bg-blue-600 px-6 text-sm font-bold text-white shadow-[0_14px_30px_rgba(37,99,235,0.22)] transition hover:bg-blue-700">
                Find a Mentor
              </button>
            </div>
          </section>

          <section className="rounded-2xl border border-[#e2eaf8] bg-white p-5 shadow-[0_8px_22px_rgba(44,76,142,0.07)]">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-[#11194a]">What kind of mentorship do you need?</h2>
                <p className="mt-1 text-xs font-medium text-[#7382a1]">AI recommends categories based on your goal, Career Memory and skill gaps.</p>
              </div>
              <button type="button" onClick={() => setActiveModal('categories')} className="inline-flex items-center gap-1 text-xs font-bold text-blue-700">
                View all categories <ChevronDown size={14} />
              </button>
            </div>
            <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
              {categories.slice(0, 6).map((category) => (
                <CategoryCard key={category.id} category={category} active={activeCategory === category.id} onClick={() => selectCategory(category.id)} />
              ))}
            </div>
          </section>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
            <div className="min-w-0">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold text-[#11194a]">Mentorship Programs</h2>
                  <p className="mt-1 text-sm font-medium text-[#637094]">Showing personalised programs for {activeLabel}.</p>
                </div>
                <label className="relative">
                  <span className="sr-only">Sort mentorship programs</span>
                  <select value={sortBy} onChange={(event) => setSortBy(event.target.value)} className="appearance-none rounded-full border border-[#dfe8f7] bg-white py-2 pl-3.5 pr-9 text-xs font-bold text-[#52627f] shadow-sm outline-none hover:bg-blue-50">
                    <option>Recommended</option>
                    <option>Highest Rated</option>
                    <option>Shortest Duration</option>
                  </select>
                  <ChevronDown size={14} className="pointer-events-none absolute right-3 top-2.5 text-[#7382a1]" />
                </label>
              </div>

              <div className="mt-4 space-y-4">
                {displayedPrograms.map((program) => <MentorshipProgramCard key={program.id} program={program} onApply={openApplication} onViewDetails={openProgram} />)}
                {displayedPrograms.length === 0 && (
                  <div className="rounded-2xl border border-dashed border-blue-200 bg-white p-8 text-center">
                    <p className="font-semibold text-[#11194a]">No mentorships match these filters yet.</p>
                    <button type="button" onClick={() => { setSearchInput(''); setSearchQuery(''); setTypeFilter(''); setIndustryFilter(''); setDurationFilter(''); setActiveCategory(''); setMinMatch(0); setMinRating(0) }} className="mt-3 text-sm font-bold text-blue-700">Clear all filters</button>
                  </div>
                )}
              </div>

              {visibleProgramCount < filteredPrograms.length && (
                <button type="button" onClick={() => setVisibleProgramCount((count) => count + 2)} className="mt-5 flex h-14 w-full items-center justify-center gap-2 rounded-2xl border border-[#e2eaf8] bg-white text-sm font-bold text-blue-700 shadow-sm transition hover:bg-blue-50">
                  Load More Programs <ArrowDown size={16} />
                </button>
              )}
            </div>

            <aside className="space-y-4">
              <HowItWorks />
              <SessionsPanel onViewAll={() => setActiveModal('sessions')} onRequest={() => setActiveModal('request')} />
              <PersonalisationPanel />
            </aside>
          </div>
        </div>
      </main>

      {activeModal === 'categories' && (
        <ModalShell title="All mentorship categories" description="Choose the kind of support that would help you most right now." onClose={() => setActiveModal(null)} size="max-w-3xl">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} active={activeCategory === category.id} onClick={() => selectCategory(category.id)} />
            ))}
          </div>
        </ModalShell>
      )}

      {activeModal === 'filters' && (
        <ModalShell title="More filters" description="Narrow the list by recommendation strength and mentor rating." onClose={() => setActiveModal(null)}>
          <div className="space-y-5">
            <label className="block">
              <span className="text-sm font-semibold text-[#26365c]">Minimum match</span>
              <select value={minMatch} onChange={(event) => setMinMatch(Number(event.target.value))} className="mt-2 h-11 w-full rounded-xl border border-[#dfe8f7] bg-white px-3 text-sm font-semibold text-[#52627f] outline-none focus:border-blue-300">
                <option value={0}>Any match</option>
                <option value={85}>85% and above</option>
                <option value={90}>90% and above</option>
                <option value={95}>95% and above</option>
              </select>
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-[#26365c]">Minimum rating</span>
              <select value={minRating} onChange={(event) => setMinRating(Number(event.target.value))} className="mt-2 h-11 w-full rounded-xl border border-[#dfe8f7] bg-white px-3 text-sm font-semibold text-[#52627f] outline-none focus:border-blue-300">
                <option value={0}>Any rating</option>
                <option value={4.7}>4.7 and above</option>
                <option value={4.8}>4.8 and above</option>
                <option value={4.9}>4.9 only</option>
              </select>
            </label>
            <div className="flex justify-end gap-3">
              <button type="button" onClick={() => { setMinMatch(0); setMinRating(0) }} className="h-11 rounded-xl border border-[#dfe8f7] px-4 text-sm font-bold text-[#52627f]">Reset</button>
              <button type="button" onClick={() => { setVisibleProgramCount(4); setActiveModal(null); showToast('Advanced filters applied.') }} className="h-11 rounded-xl bg-blue-600 px-5 text-sm font-bold text-white hover:bg-blue-700">Apply Filters</button>
            </div>
          </div>
        </ModalShell>
      )}

      {activeModal === 'details' && selectedProgram && (
        <ModalShell title={selectedProgram.title} description={`${selectedProgram.mentor}, ${selectedProgram.role} at ${selectedProgram.company}`} onClose={() => setActiveModal(null)}>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">{selectedProgram.match}% Match</span>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">{selectedProgram.format} Mentorship</span>
            <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700"><Star size={12} className="mr-1 inline" fill="currentColor" />{selectedProgram.rating}</span>
          </div>
          <p className="mt-4 text-sm font-medium leading-6 text-[#52627f]">{selectedProgram.description}</p>
          <div className="mt-5 grid grid-cols-2 gap-3 rounded-2xl bg-blue-50/60 p-4 text-sm font-semibold text-[#3a4669]">
            <p>Duration: {selectedProgram.duration}</p>
            <p>Format: {selectedProgram.format}</p>
            <p>Industry: {selectedProgram.industry}</p>
            <p>Availability: {selectedProgram.seats}</p>
          </div>
          <button type="button" onClick={() => openApplication(selectedProgram)} className="mt-5 h-11 w-full rounded-xl bg-blue-600 text-sm font-bold text-white hover:bg-blue-700">Apply for this Mentorship</button>
        </ModalShell>
      )}

      {activeModal === 'apply' && selectedProgram && (
        <ModalShell title="Apply for mentorship" description={`${selectedProgram.title} with ${selectedProgram.mentor}`} onClose={() => setActiveModal(null)}>
          <form onSubmit={(event) => { event.preventDefault(); setActiveModal(null); showToast(`Application sent to ${selectedProgram.mentor}.`) }}>
            <label className="block text-sm font-semibold text-[#26365c]">
              What would you like help with?
              <textarea required rows={4} placeholder="Share one goal or question for your mentor..." className="mt-2 w-full resize-none rounded-xl border border-[#dfe8f7] p-3 text-sm font-medium outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-50" />
            </label>
            <button type="submit" className="mt-4 h-11 w-full rounded-xl bg-blue-600 text-sm font-bold text-white hover:bg-blue-700">Submit Application</button>
          </form>
        </ModalShell>
      )}

      {activeModal === 'sessions' && (
        <ModalShell title="Upcoming group sessions" description="Join live conversations with mentors and other candidates." onClose={() => setActiveModal(null)} size="max-w-2xl">
          <div className="space-y-3">
            {groupSessions.map((session) => (
              <article key={session.id} className="flex flex-col gap-3 rounded-2xl border border-[#e2eaf8] bg-[#fbfcff] p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold text-[#11194a]">{session.title}</p>
                  <p className="mt-1 text-xs font-medium text-[#7382a1]">{session.date}, {session.time} · {session.mode} · {session.attending} attending</p>
                </div>
                <button type="button" onClick={() => showToast(`You joined ${session.title}.`)} className="h-9 rounded-xl border border-blue-200 bg-white px-4 text-xs font-bold text-blue-700 hover:bg-blue-50">Join Session</button>
              </article>
            ))}
          </div>
        </ModalShell>
      )}

      {activeModal === 'request' && (
        <ModalShell title="Request a mentorship" description="Tell CareerOS what guidance you need. We’ll look for a suitable mentor or program." onClose={() => setActiveModal(null)}>
          <form onSubmit={(event) => { event.preventDefault(); setActiveModal(null); showToast('Your mentorship request has been submitted.'); setRequestTopic('') }} className="space-y-4">
            <label className="block text-sm font-semibold text-[#26365c]">
              Mentorship topic
              <input required value={requestTopic} onChange={(event) => setRequestTopic(event.target.value)} placeholder="e.g. Building my first data portfolio" className="mt-2 h-11 w-full rounded-xl border border-[#dfe8f7] px-3 text-sm font-medium outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-50" />
            </label>
            <label className="block text-sm font-semibold text-[#26365c]">
              Preferred format
              <select value={requestFormat} onChange={(event) => setRequestFormat(event.target.value)} className="mt-2 h-11 w-full rounded-xl border border-[#dfe8f7] bg-white px-3 text-sm font-medium outline-none focus:border-blue-300">
                <option>1:1 Mentorship</option>
                <option>Group Mentorship</option>
                <option>Either format</option>
              </select>
            </label>
            <button type="submit" className="h-11 w-full rounded-xl bg-blue-600 text-sm font-bold text-white hover:bg-blue-700">Submit Request</button>
          </form>
        </ModalShell>
      )}

      <Toast message={toast} />
    </div>
  )
}
