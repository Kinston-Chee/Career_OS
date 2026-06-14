import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import compassIcon from '../assets/icon-compass.svg'
import { useCareerStore } from '../store/useCareerStore'

// Reveal: fades + lifts the wrapped node when it scrolls into view. Once the
// element has been seen, the observer stops watching so animations only play
// once. `delay` accepts 1–4 to pick a `rdN` stagger class from styles.css.
function Reveal({ as: Tag = 'div', delay, className = '', children, ...rest }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (shown) return undefined
    const node = ref.current
    if (!node) return undefined
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [shown])

  const delayClass = delay ? `rd${Math.min(Math.max(delay, 1), 4)}` : ''
  const classes = ['landing-reveal', delayClass, shown ? 'is-in' : '', className]
    .filter(Boolean)
    .join(' ')

  return (
    <Tag ref={ref} className={classes} {...rest}>
      {children}
    </Tag>
  )
}

// Each workspace card maps to one of the protected routes in App.jsx. The
// landing page selects the role in the store before navigating so the route
// guard lets the user through.
const WORKSPACES = [
  {
    id: 'student',
    role: 'student',
    icon: 'C',
    title: 'Candidate',
    description:
      'Build a living career record that proves your skills with evidence — not just claims on a résumé.',
    bullets: [
      'AI-extracted skill profile from your real experiences',
      'Personalised career path mapped to O*NET data',
      'Skill gap analysis against your target roles',
      'Verified evidence portfolio employers can trust',
    ],
    cta: 'Enter Candidate Workspace',
    path: '/student/overview',
    iconClass: 'bg-gradient-to-br from-indigo-500 to-indigo-400',
    accentClass: 'bg-gradient-to-r from-indigo-500 to-indigo-300',
    bulletClass: 'bg-indigo-500',
    hoverButton: 'group-hover:bg-indigo-600',
  },
  {
    id: 'employer',
    role: 'employer',
    icon: 'E',
    title: 'Employer',
    description:
      'Discover talent before your competitors do — filtered by verified skills, not keyword-stuffed resumes.',
    bullets: [
      'Search by real competencies, not job titles',
      'Candidate readiness scores aligned to your JDs',
      'Early-stage pipeline from university talent pools',
      'Engagement tools to build your employer brand',
    ],
    cta: 'Enter Employer Workspace',
    path: '/employer',
    iconClass: 'bg-gradient-to-br from-purple-600 to-purple-400',
    accentClass: 'bg-gradient-to-r from-purple-600 to-purple-300',
    bulletClass: 'bg-purple-600',
    hoverButton: 'group-hover:bg-purple-600',
  },
  {
    id: 'university',
    role: 'university',
    icon: 'U',
    title: 'University',
    description:
      'Close the gap between what you teach and what the market demands — with live data, not annual surveys.',
    bullets: [
      'Real-time curriculum vs. market skill gap reports',
      'Student cohort readiness tracking',
      'Direct industry collaboration channels',
      'Graduate outcome analytics dashboard',
    ],
    cta: 'Enter University Workspace',
    path: '/university',
    iconClass: 'bg-gradient-to-br from-sky-600 to-cyan-400',
    accentClass: 'bg-gradient-to-r from-sky-600 to-cyan-400',
    bulletClass: 'bg-sky-600',
    hoverButton: 'group-hover:bg-sky-700',
  },
]

const PROBLEM_CARDS = [
  {
    iconBg: 'bg-indigo-50 text-indigo-600',
    statColor: 'text-indigo-600',
    icon: '🔍',
    stat: '85%',
    title: 'Students navigate blind',
    body: "Most graduates don't know which of their experiences are valued by employers — or what skills they're actually missing to land their target role.",
    source: 'Source: McKinsey Global Institute, 2024',
  },
  {
    iconBg: 'bg-purple-50 text-purple-600',
    statColor: 'text-purple-600',
    icon: '💼',
    stat: '72%',
    title: 'Employers screen, not discover',
    body: 'Hiring teams rely on keyword-matched resumes instead of verified skill signals — missing qualified candidates and wasting months in screening cycles.',
    source: 'Source: LinkedIn Workforce Report, 2025',
  },
  {
    iconBg: 'bg-cyan-50 text-cyan-700',
    statColor: 'text-cyan-700',
    icon: '🎓',
    stat: '3 yr',
    title: 'Universities lag the market',
    body: 'Curriculum updates take 2–3 years on average, by which time the skills graduates learn are already misaligned with what the industry actually needs.',
    source: 'Source: World Economic Forum, Future of Jobs 2025',
  },
]

const STEPS = [
  {
    num: 'Step 01',
    icon: '🪪',
    title: 'Profile ingestion',
    body: 'Candidates log experiences, projects, certifications, and activities — structured or unstructured.',
  },
  {
    num: 'Step 02',
    icon: '🤖',
    title: 'AI skill extraction',
    body: 'Multi-agent system maps inputs to O*NET occupational taxonomy and Lightcast live market demand data.',
  },
  {
    num: 'Step 03',
    icon: '🕸',
    title: 'Signal graph build',
    body: 'Skills, roles, and institutions are connected in a dynamic knowledge graph — surfacing hidden talent and gaps.',
  },
  {
    num: 'Step 04',
    icon: '💡',
    title: 'Intelligence delivery',
    body: 'Personalised insights flow to each stakeholder — career paths, candidate matches, and curriculum gaps.',
  },
]

const INTEL_CARDS = [
  {
    iconBg: 'bg-indigo-50 text-indigo-600',
    tagBg: 'bg-indigo-50 text-indigo-700',
    icon: '🗂',
    title: 'Evidence Memory Engine',
    body: 'Each experience entry is parsed by AI agents into structured skill dimensions with confidence scores — building a living, shareable, and verifiable career record.',
    tag: 'Google ADK · Multi-agent',
  },
  {
    iconBg: 'bg-purple-50 text-purple-600',
    tagBg: 'bg-purple-50 text-purple-700',
    icon: '🕸',
    title: 'Talent Signal Graph',
    body: 'A dynamic knowledge graph connecting candidates, skills, and roles using hundreds of verified skill dimensions — enabling employer discovery that goes far beyond keyword matching.',
    tag: 'Knowledge graph · O*NET',
  },
  {
    iconBg: 'bg-cyan-50 text-cyan-700',
    tagBg: 'bg-cyan-50 text-cyan-700',
    icon: '🏫',
    title: 'University–Market Alignment',
    body: "Live gap analysis compares what a university's student cohort actually knows against what employers in their target sector are actively hiring for.",
    tag: 'Lightcast API · Real-time',
  },
  {
    iconBg: 'bg-orange-50 text-orange-700',
    tagBg: 'bg-orange-50 text-orange-700',
    icon: '🧭',
    title: 'Personalised Career Path Engine',
    body: 'For each candidate, the system generates a prioritised skill roadmap — the shortest path from their current profile to their target role, with concrete next steps.',
    tag: 'FastAPI · PostgreSQL · GCP',
  },
]

const ROADMAP_PHASES = [
  {
    pill: 'Live now',
    pillBg: 'bg-emerald-50 text-emerald-700',
    dot: 'bg-emerald-500',
    title: 'Phase 1 — Core prototype',
    items: [
      'Multi-agent backend with Google ADK',
      'FastAPI + PostgreSQL on GCP Cloud Run',
      'O*NET skill taxonomy integration',
      'Candidate, Employer & University workspaces',
      'AI skill extraction from profile entries',
    ],
    check: 'text-emerald-600',
  },
  {
    pill: 'Next 60 days',
    pillBg: 'bg-indigo-50 text-indigo-700',
    dot: 'bg-indigo-500',
    title: 'Phase 2 — Market data',
    items: [
      'Lightcast live API integration',
      'Talent signal knowledge graph',
      'Employer search & filtering engine',
      'University curriculum gap dashboard',
      'Resume radar chart visualisation',
    ],
    check: 'text-indigo-600',
  },
  {
    pill: 'Future vision',
    pillBg: 'bg-purple-50 text-purple-700',
    dot: 'bg-purple-500',
    title: 'Phase 3 — Scale',
    items: [
      'University & employer onboarding',
      'Verified credential integration',
      'API for third-party career tools',
      'Southeast Asia market expansion',
      'B2B SaaS revenue model',
    ],
    check: 'text-purple-600',
  },
]

const PROBLEM_STATS = [
  { value: '85%', label: 'of graduates feel underprepared', color: 'text-indigo-600' },
  { value: '$2.4T', label: 'global skills mismatch cost', color: 'text-purple-600' },
  { value: '6 mo', label: 'average graduate job search', color: 'text-cyan-700' },
  { value: '72%', label: 'of employers cite skill gaps', color: 'text-indigo-600' },
]

const NAV_LINKS = [
  { href: '#workspaces', label: 'Workspaces' },
  { href: '#how', label: 'How it works' },
  { href: '#vision', label: 'Intelligence' },
  { href: '#roadmap', label: 'Roadmap' },
]

const FOOTER_LINKS = [
  { href: '#', label: 'GitHub' },
  { href: '#', label: 'Pitch Deck' },
  { href: '#', label: 'Team' },
  { href: '#', label: 'Contact' },
]

export default function LandingPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const selectRole = useCareerStore((state) => state.selectRole)
  const signedOut = location.state?.signedOut

  // Selecting a role in the store is what lets the user past the ProtectedRoute
  // guard for that workspace. All "enter workspace" / "see the prototype" CTAs
  // route through this so the navigation works consistently.
  const enterWorkspace = (workspace) => {
    selectRole(workspace.role)
    navigate(workspace.path, { replace: true })
  }

  const enterStudentPrototype = () => {
    const student = WORKSPACES.find((w) => w.id === 'student')
    if (student) enterWorkspace(student)
  }

  // Smooth-scroll for in-page anchors. We can't rely on CSS scroll-behavior
  // alone because the sticky nav would otherwise cover the section heading —
  // we measure the nav and offset the target position manually.
  const handleAnchorClick = (event, href) => {
    if (!href || !href.startsWith('#') || href === '#') return
    const id = href.slice(1)
    const target = document.getElementById(id)
    if (!target) return

    event.preventDefault()
    const navEl = document.querySelector('nav')
    const navHeight = navEl ? navEl.getBoundingClientRect().height : 0
    const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight - 12

    window.scrollTo({ top: Math.max(targetTop, 0), behavior: 'smooth' })
    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, '', href)
    }
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-50 font-sans text-slate-900">
      {/* ─── NAV ─────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-indigo-100/60 bg-white/85 px-6 backdrop-blur-xl sm:px-12">
        <a href="#top" onClick={(event) => handleAnchorClick(event, '#top')} className="flex items-center gap-2.5">
          <img src={compassIcon} alt="CareerOS compass logo" className="h-9 w-9 rounded-xl" />
          <span className="text-lg font-extrabold tracking-tight text-slate-900">CareerOS</span>
        </a>

        <div className="hidden gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(event) => handleAnchorClick(event, link.href)}
              className="rounded-md px-3 py-1.5 text-sm font-medium text-slate-500 transition hover:bg-indigo-50 hover:text-indigo-600"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/auth"
            className="rounded-md border border-slate-200 bg-transparent px-4 py-1.5 text-sm font-medium text-slate-700 transition hover:border-indigo-500 hover:text-indigo-600"
          >
            Sign in
          </Link>
          <Link
            to="/auth?mode=signup"
            className="rounded-md bg-slate-900 px-4 py-1.5 text-sm font-semibold text-white transition hover:-translate-y-px hover:bg-indigo-600"
          >
            Request early access
          </Link>
        </div>
      </nav>

      {/* ─── HERO ────────────────────────────────────────────────── */}
      <section
        id="top"
        className="relative overflow-hidden px-6 pb-20 pt-24 text-center sm:px-12"
        style={{
          background:
            'linear-gradient(145deg, #EAF0FF 0%, #F5F3FF 35%, #EBF5FF 70%, #F0F9FF 100%)',
        }}
      >
        <div className="pointer-events-none absolute -left-20 -top-20 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(91,108,249,0.08),transparent_70%)]" />
        <div className="pointer-events-none absolute -bottom-16 -right-16 h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(41,182,246,0.08),transparent_70%)]" />

        <div className="relative mx-auto max-w-4xl">
          <div className="landing-fade-in mb-7 inline-flex items-center gap-2 rounded-full border border-indigo-200/60 bg-white px-5 py-1.5 text-xs font-semibold uppercase tracking-wide text-indigo-600 shadow-[0_2px_12px_rgba(91,108,249,0.10)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500" />
            </span>
            Now in prototype — Hackathon 2026
          </div>

          <h1 className="landing-fade-in d1 text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-[58px]">
            The career intelligence layer
            <br />
            the world has been{' '}
            <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
              missing
            </span>
          </h1>

          <p className="landing-fade-in d2 mx-auto mt-5 max-w-xl text-base leading-7 text-slate-500 sm:text-lg">
            CareerOS connects students, employers, and universities in one AI-powered ecosystem —
            turning raw experience into verified talent evidence and bridging the gap between
            education and industry.
          </p>

          <div className="landing-fade-in d3 mt-10 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={enterStudentPrototype}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_4px_18px_rgba(17,24,39,0.18)] transition hover:-translate-y-0.5 hover:bg-indigo-600 hover:shadow-[0_8px_28px_rgba(91,108,249,0.30)]"
            >
              <span aria-hidden>🚀</span> See the prototype
            </button>
            <a
              href="#vision"
              onClick={(event) => handleAnchorClick(event, '#vision')}
              className="inline-flex items-center gap-2 rounded-xl border border-indigo-200/60 bg-white/90 px-6 py-3.5 text-sm font-medium text-slate-700 transition hover:-translate-y-0.5 hover:border-indigo-500 hover:text-indigo-600"
            >
              <span aria-hidden>📊</span> View our pitch deck
            </a>
          </div>

          <div className="landing-fade-in d4 mx-auto mt-14 inline-flex overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_6px_28px_rgba(17,24,39,0.07)]">
            {PROBLEM_STATS.map((stat, i) => (
              <div
                key={stat.label}
                className={`px-7 py-5 text-center sm:px-10 ${i < PROBLEM_STATS.length - 1 ? 'border-r border-slate-200' : ''}`}
              >
                <div className={`text-2xl font-extrabold tracking-tight sm:text-3xl ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="mt-1 text-[11px] font-medium uppercase tracking-wider text-slate-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {signedOut && (
        <div className="mx-auto -mt-2 mb-4 w-fit rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
          Signed out successfully.
        </div>
      )}

      {/* ─── PROBLEM ─────────────────────────────────────────────── */}
      <section
        id="problem"
        className="border-y border-slate-200 bg-white px-6 py-20 sm:px-12"
      >
        <div className="mx-auto max-w-6xl">
          <Reveal className="max-w-2xl">
            <Eyebrow>The Problem</Eyebrow>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
              Three broken relationships.
              <br />
              One system to fix them.
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-500">
              The talent ecosystem operates in silos. Students guess at career relevance. Employers
              screen resumes, not skills. Universities design curricula without market feedback.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {PROBLEM_CARDS.map((card, i) => (
              <Reveal
                key={card.title}
                delay={i + 1}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(17,24,39,0.08)]"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-lg text-xl ${card.iconBg}`}>
                    <span aria-hidden>{card.icon}</span>
                  </div>
                  <div className={`text-3xl font-extrabold leading-none tracking-tight ${card.statColor}`}>
                    {card.stat}
                  </div>
                </div>
                <h3 className="text-base font-bold text-slate-900">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{card.body}</p>
                <p className="mt-3 text-[11px] italic text-slate-400">{card.source}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WORKSPACES ──────────────────────────────────────────── */}
      <section id="workspaces" className="bg-slate-50 px-6 py-20 sm:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-12 text-center">
            <Eyebrow centered>The Solution</Eyebrow>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              One platform, three perspectives
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base text-slate-500">
              Purpose-built workspaces for every stakeholder — each designed around their specific
              goals and challenges.
            </p>
          </Reveal>

          <div className="grid gap-5 lg:grid-cols-3">
            {WORKSPACES.map((ws, i) => (
              <Reveal
                key={ws.id}
                delay={i + 1}
                as="button"
                type="button"
                onClick={() => enterWorkspace(ws)}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 text-left transition hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(17,24,39,0.10)]"
              >
                <span
                  className={`absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${ws.accentClass}`}
                />
                <div
                  className={`mb-5 flex h-13 w-13 items-center justify-center rounded-xl text-lg font-extrabold text-white ${ws.iconClass}`}
                  style={{ width: 52, height: 52 }}
                >
                  {ws.icon}
                </div>
                <h3 className="text-xl font-extrabold tracking-tight text-slate-900">{ws.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{ws.description}</p>
                <ul className="mt-5 flex flex-1 flex-col gap-2.5">
                  {ws.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm leading-snug text-slate-700">
                      <span className={`mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full ${ws.bulletClass}`} />
                      {b}
                    </li>
                  ))}
                </ul>
                <span
                  className={`mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white transition group-hover:-translate-y-0.5 ${ws.hoverButton}`}
                >
                  {ws.cta} <span aria-hidden>→</span>
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ────────────────────────────────────────── */}
      <section
        id="how"
        className="relative overflow-hidden px-6 py-20 sm:px-12"
        style={{ background: 'linear-gradient(160deg, #111827 0%, #1e2563 100%)' }}
      >
        <div className="pointer-events-none absolute -right-24 -top-24 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(91,108,249,0.15),transparent_70%)]" />
        <div className="pointer-events-none absolute -bottom-20 left-[20%] h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,rgba(123,79,214,0.12),transparent_70%)]" />

        <div className="relative mx-auto max-w-6xl">
          <Reveal>
            <Eyebrow tone="dark">How It Works</Eyebrow>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              From raw experience
              <br />
              to market signal
            </h2>
            <p className="mt-3 max-w-md text-base leading-7 text-white/55">
              A four-step pipeline that transforms unstructured career data into actionable
              intelligence for every stakeholder.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-white/5 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <Reveal
                key={step.num}
                delay={Math.min(i + 1, 4)}
                className="bg-white/[0.03] p-7 transition hover:bg-white/[0.07]"
              >
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-indigo-300">
                  {step.num}
                </p>
                <div className="mt-4 flex h-11 w-11 items-center justify-center rounded-lg border border-indigo-400/25 bg-indigo-500/10 text-xl text-indigo-200">
                  <span aria-hidden>{step.icon}</span>
                </div>
                <h3 className="mt-4 text-base font-bold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/45">{step.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── INTELLIGENCE ────────────────────────────────────────── */}
      <section id="vision" className="bg-white px-6 py-20 sm:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <Eyebrow>Intelligence Layer</Eyebrow>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Powered by real labour
              <br />
              market data
            </h2>
            <p className="mt-3 max-w-lg text-base leading-7 text-slate-500">
              Every recommendation is grounded in O*NET occupational taxonomies and Lightcast's live
              job posting database — not generic AI guesses.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {INTEL_CARDS.map((card, i) => (
              <Reveal
                key={card.title}
                delay={Math.min(i + 1, 4)}
                className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-7 transition hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-white hover:shadow-[0_10px_30px_rgba(17,24,39,0.07)]"
              >
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-xl ${card.iconBg}`}>
                  <span aria-hidden>{card.icon}</span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{card.body}</p>
                  <span className={`mt-3 inline-block rounded-full px-3 py-0.5 text-[11px] font-semibold ${card.tagBg}`}>
                    {card.tag}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ROADMAP ─────────────────────────────────────────────── */}
      <section
        id="roadmap"
        className="border-t border-indigo-100/60 px-6 py-20 sm:px-12"
        style={{
          background:
            'linear-gradient(145deg, #EAF0FF 0%, #F5F3FF 35%, #EBF5FF 70%, #F0F9FF 100%)',
        }}
      >
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-12 text-center">
            <Eyebrow centered>Build Roadmap</Eyebrow>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              What we've built. What's next.
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-base text-slate-500">
              We're at prototype stage — here's our honest progress and where we're taking this
              after the hackathon.
            </p>
          </Reveal>

          <div className="grid gap-5 lg:grid-cols-3">
            {ROADMAP_PHASES.map((phase, i) => (
              <Reveal
                key={phase.title}
                delay={i + 1}
                className="rounded-2xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(17,24,39,0.08)]"
              >
                <span
                  className={`mb-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${phase.pillBg}`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${phase.dot}`} /> {phase.pill}
                </span>
                <h3 className="text-base font-extrabold tracking-tight text-slate-900">{phase.title}</h3>
                <ul className="mt-3 flex flex-col gap-2.5">
                  {phase.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm leading-snug text-slate-700">
                      <span aria-hidden className={`mt-0.5 shrink-0 ${phase.check}`}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ──────────────────────────────────────────── */}
      <div className="px-6 pb-20 pt-2 sm:px-12">
        <Reveal
          className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl px-8 py-16 text-center sm:px-16"
          style={{
            background:
              'linear-gradient(135deg, #111827 0%, #1e2563 50%, #111827 100%)',
          }}
        >
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(91,108,249,0.20),transparent_70%)]" />
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(41,182,246,0.10),transparent_70%)]" />

          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-400/25 bg-indigo-400/15 px-4 py-1 text-xs font-semibold text-indigo-200">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-300 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-300" />
              </span>
              Prototype ready for demo
            </span>
            <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
              We're building the infrastructure
              <br />
              talent has never had.
            </h2>
            <p className="mt-3 text-base text-white/55">
              Try the live prototype, explore the codebase, or connect with us for feedback and
              partnerships.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={enterStudentPrototype}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-slate-900 transition hover:-translate-y-0.5 hover:bg-indigo-600 hover:text-white hover:shadow-[0_8px_24px_rgba(91,108,249,0.40)]"
              >
                <span aria-hidden>🧭</span> Explore the prototype
              </button>
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-transparent px-7 py-3.5 text-sm font-medium text-white/75 transition hover:border-white/55 hover:text-white"
              >
                <span aria-hidden>✉️</span> Get in touch
              </a>
            </div>
          </div>
        </Reveal>
      </div>

      {/* ─── FOOTER ──────────────────────────────────────────────── */}
      <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 px-6 py-6 sm:px-12">
        <span className="text-sm font-extrabold tracking-tight text-slate-400">CareerOS</span>
        <div className="flex gap-6">
          {FOOTER_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs text-slate-400 transition hover:text-indigo-600"
            >
              {link.label}
            </a>
          ))}
        </div>
      </footer>
    </main>
  )
}

// Small reusable eyebrow ("THE PROBLEM", "HOW IT WORKS", ...) used across sections.
function Eyebrow({ children, centered = false, tone = 'light' }) {
  const isDark = tone === 'dark'
  const lineColor = isDark ? 'bg-white/30' : 'bg-indigo-500'
  const textColor = isDark ? 'text-white/55' : 'text-indigo-600'
  return (
    <div
      className={`inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] ${textColor} ${centered ? 'justify-center' : ''}`}
    >
      <span className={`h-0.5 w-6 rounded-full ${lineColor}`} />
      {children}
      {centered && <span className={`h-0.5 w-6 rounded-full ${lineColor}`} />}
    </div>
  )
}
