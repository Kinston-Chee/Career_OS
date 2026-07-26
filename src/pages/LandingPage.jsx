/**
 * LandingPage â€" CareerOS
 * Design system: Cinema Dark + Aurora UI (ui-ux-pro-max skill)
 * Accent: #5E6AD2  |  Base: #020203â†'#050506â†'#0a0a0c
 * Easing: cubic-bezier(0.16,1,0.3,1) expo-out
 * Font: DM Sans (Google Fonts)
 */
import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  Bot,
  BriefcaseBusiness,
  ChartNoAxesColumnIncreasing,
  Check,
  Compass as CompassLucide,
  FolderKanban,
  GraduationCap,
  Lightbulb,
  Mail,
  Network,
  Rocket,
  Route,
  Search,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react'
import compassIcon from '../assets/icon-compass.svg'
import robotImg from '../assets/career-os-robot.png'
import { useCareerStore } from '../store/useCareerStore'

/* â"€â"€ Scroll-reveal â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€ */
function Reveal({ as: Tag = 'div', delay, variant = 'up', className = '', children, ...rest }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => setShown(e.isIntersecting)),
      { threshold: 0.09, rootMargin: '0px 0px -24px 0px' },
    )
    io.observe(node)
    return () => io.disconnect()
  }, [])
  const vc = variant === 'left' ? 'from-left' : variant === 'right' ? 'from-right' : variant === 'scale' ? 'scale-up' : ''
  const dc = delay ? `rd${Math.min(Math.max(delay, 1), 4)}` : ''
  return (
    <Tag ref={ref} className={['landing-reveal', vc, dc, shown ? 'is-in' : '', className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </Tag>
  )
}

/* â"€â"€ Parallax orb â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€ */
function Orb({ className, style, speed = 0.10, orbClass = 'l-orb-a' }) {
  const ref = useRef(null)
  useEffect(() => {
    const h = () => { if (ref.current) ref.current.style.transform = `translateY(${window.scrollY * speed}px)` }
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [speed])
  return <div ref={ref} className={`${orbClass} pointer-events-none absolute rounded-full ${className}`} style={style} />
}

/* â"€â"€ Headline with word-by-word stagger â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€ */
function StaggerHeadline({ children, className = '' }) {
  const words = String(children).split(' ')
  return (
    <span className={`inline ${className}`} aria-label={children}>
      {words.map((w, i) => (
        <span
          key={i}
          className="hero-word"
          style={{ animationDelay: `${80 + i * 70}ms` }}
          aria-hidden="true"
        >
          {i < words.length - 1 ? w + ' ' : w}
        </span>
      ))}
    </span>
  )
}

/* â"€â"€ Eyebrow label â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€ */
function Label({ children, centered }) {
  return (
    <div className={`inline-flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#5E6AD2] ${centered ? 'justify-center' : ''}`}>
      <span className="h-px w-5 rounded-full bg-[#5E6AD2]/50" />
      {children}
      {centered && <span className="h-px w-5 rounded-full bg-[#5E6AD2]/50" />}
    </div>
  )
}

/* â"€â"€ Data â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€ */
const WORKSPACES = [
  {
    id: 'student', role: 'student', letter: 'C', title: 'Candidate',
    sub: 'For students & job seekers',
    desc: 'Keep a living memory of experiences, proof, skills, and progress so your next career move starts from evidence, not guesswork.',
    bullets: [
      'Capture internships, projects, leadership, and proof',
      'Turn experience into skills, gaps, and next actions',
      'Practise interviews against active goals',
      'Carry evidence into opportunities and employer profiles',
    ],
    cta: 'Enter Candidate Workspace',
    path: '/student/home',
    accent: '#6366f1', glow: 'rgba(99,102,241,0.22)',
    border: 'rgba(99,102,241,0.22)',
    grad: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    dot: 'bg-indigo-400', btn: 'bg-indigo-500 hover:bg-indigo-400',
    size: 'lg',
  },
  {
    id: 'employer', role: 'employer', letter: 'E', title: 'Employer',
    sub: 'For HR & talent teams',
    desc: 'Stop recruiting from zero by keeping warm talent history, evidence, and reactivation actions in one operating workspace.',
    bullets: [
      'Inspect evidence-rich candidate profiles',
      'Recover prior finalists and challenge participants',
      'Create engagements that produce observable signals',
      'Draft outreach and validation steps with AI support',
    ],
    cta: 'Enter Employer Workspace',
    path: '/employer/home',
    accent: '#8b5cf6', glow: 'rgba(139,92,246,0.22)',
    border: 'rgba(139,92,246,0.22)',
    grad: 'linear-gradient(135deg, #8b5cf6, #d946ef)',
    dot: 'bg-violet-400', btn: 'bg-violet-500 hover:bg-violet-400',
    size: 'sm',
  },
  {
    id: 'university', role: 'university', letter: 'U', title: 'University',
    sub: 'For deans & programme directors',
    desc: 'Act on readiness and market gaps while the current cohort can still benefit, then reuse the evidence for review and accreditation.',
    bullets: [
      'Track cohort readiness and at-risk signals',
      'Route skill gaps into current-cohort interventions',
      'Connect employer, alumni, and curriculum evidence',
      'Prepare accreditation evidence with source and owner context',
    ],
    cta: 'Enter University Workspace',
    path: '/university/overview',
    accent: '#0ea5e9', glow: 'rgba(14,165,233,0.22)',
    border: 'rgba(14,165,233,0.22)',
    grad: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
    dot: 'bg-sky-400', btn: 'bg-sky-500 hover:bg-sky-400',
    size: 'sm',
  },
]

const PROBLEM_CARDS = [
  { stat: 'Evidence', color: '#818cf8', Icon: Search, title: 'Students lose proof between moments', body: 'Projects, internships, leadership, and feedback sit across CVs, chats, folders, and memory. When an opportunity appears, the student has to rebuild the story from scratch.', src: 'Memory decay' },
  { stat: 'History', color: '#a78bfa', Icon: BriefcaseBusiness, title: 'Employers restart every search cold', body: 'A strong student met at a workshop, challenge, or previous hiring round disappears into old spreadsheets. When a role becomes urgent, recruiting starts over.', src: 'Relationship decay' },
  { stat: 'Action', color: '#38bdf8', Icon: GraduationCap, title: 'Universities see gaps too late', body: 'Graduate readiness, curriculum relevance, employer feedback, and accreditation evidence are managed in separate cycles, so insight often arrives after the cohort needed help.', src: 'Action decay' },
]

const STEPS = [
  { n: '01', Icon: FolderKanban, color: '#818cf8', title: 'Remember the signal', body: 'Career Memory captures experiences, proof, skills, gaps, relationships, and institutional records before they decay.' },
  { n: '02', Icon: Bot, color: '#a78bfa', title: 'Explain what it means', body: 'AI-assisted workflows translate raw activity into career evidence, validation prompts, candidate context, and operational summaries.' },
  { n: '03', Icon: Network, color: '#38bdf8', title: 'Route it to action', body: 'The same evidence can trigger a student next step, employer validation, intervention owner, or accreditation request.' },
  { n: '04', Icon: Lightbulb, color: '#34d399', title: 'Learn from the outcome', body: 'Over time, evidence, relationships, interventions, and alumni outcomes can compound into a stronger talent operating layer.' },
]

const INTEL_CARDS = [
  { Icon: FolderKanban, color: '#818cf8', title: 'Career Memory', tag: 'Demonstrated prototype workflow', body: 'A student-owned record of experiences, evidence, skills, and improvement prompts that can support applications, interviews, and employer discovery.' },
  { Icon: Network, color: '#a78bfa', title: 'Cross-stakeholder evidence reuse', tag: 'Product thesis', body: 'One signal can inform student guidance, candidate validation, employer reactivation, university intervention, and accreditation preparation.' },
  { Icon: GraduationCap, color: '#38bdf8', title: 'Gap-to-intervention loop', tag: 'Faculty pilot wedge', body: 'A programme team can identify a priority gap, assign an owner, run a current-cohort workshop or challenge, and keep the evidence for reporting.' },
  { Icon: Route, color: '#34d399', title: 'Human-governed AI office', tag: 'Prototype plus roadmap', body: 'Specialised assistants prepare context and recommended actions while important decisions remain labelled, reviewable, and human-approved.' },
]

const ROADMAP = [
  {
    pill: 'Built for demo', pillColor: '#34d399', dot: 'bg-emerald-400',
    title: 'Phase 1 - Interaction model',
    items: ['Candidate, Employer, and University workspaces', 'Career Memory and evidence-oriented flows', 'Career path, opportunity, and interview practice surfaces', 'Employer discovery, engagement, and warm pipeline workflows', 'University readiness, curriculum, AI Office, and accreditation demos'],
    check: '#34d399',
  },
  {
    pill: 'Pilot wedge', pillColor: '#818cf8', dot: 'bg-indigo-400',
    title: 'Phase 2 - Faculty intervention pilot',
    items: ['One faculty, one cohort, two priority skill gaps', 'Consented Career Memory activation for participating students', 'One employer-backed workshop or challenge', 'Evidence completion, intervention uptake, and staff-time metrics', 'Manual verification before deeper integrations'],
    check: '#818cf8',
  },
  {
    pill: 'Future capability', pillColor: '#a78bfa', dot: 'bg-violet-400',
    title: 'Phase 3 - Compounding network',
    items: ['Production provenance, permissions, and verification', 'Live SIS, LMS, ATS, HRIS, and labour-market integrations', 'Outcome learning across cohorts, events, and hiring cycles', 'Reusable accreditation and institutional evidence history', 'Talentbank ecosystem expansion across students, employers, and universities'],
    check: '#a78bfa',
  },
]

const STATS = [
  { v: '3', l: 'connected workspaces', c: '#818cf8' },
  { v: '1', l: 'evidence memory layer', c: '#a78bfa' },
  { v: '8+', l: 'demo workflows', c: '#38bdf8' },
  { v: 'Pilot', l: 'faculty-ready wedge', c: '#5E6AD2' },
]
const NAV = [
  { href: '#workspaces', label: 'Workspaces' },
  { href: '#how', label: 'How it works' },
  { href: '#vision', label: 'Intelligence' },
  { href: '#roadmap', label: 'Roadmap' },
]

/* shared section bg shades */
const S1 = '#020203'   // hero
const S2 = '#050506'   // problem
const S3 = '#07070a'   // workspaces
const S4 = '#050506'   // how-it-works
const S5 = '#07070a'   // intelligence
const S6 = '#050506'   // roadmap

export default function LandingPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const selectRole = useCareerStore((s) => s.selectRole)
  const signedOut = location.state?.signedOut

  const enter = (ws) => { selectRole(ws.role); navigate(ws.path, { replace: true }) }

  const smooth = (e, href) => {
    if (!href?.startsWith('#') || href === '#') return
    const el = document.getElementById(href.slice(1))
    if (!el) return
    e.preventDefault()
    const nav = document.querySelector('nav')
    const off = nav ? nav.getBoundingClientRect().height : 0
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - off - 12, behavior: 'smooth' })
    window.history?.replaceState(null, '', href)
  }

  return (
    <>
      {/* DM Sans â€" premium typography from skill recommendation */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap" rel="stylesheet" />

      <main style={{ background: S1, fontFamily: "'DM Sans', sans-serif", color: '#EDEDEF' }} className="min-h-screen overflow-x-hidden">

        {/* â"€â"€ NAV â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€ */}
        <nav
          className="sticky top-0 z-40 flex h-16 items-center justify-between px-6 sm:px-12"
          style={{ background: 'rgba(2,2,3,0.80)', backdropFilter: 'blur(24px) saturate(1.4)', WebkitBackdropFilter: 'blur(24px) saturate(1.4)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          <a href="#top" onClick={(e) => smooth(e, '#top')} className="flex items-center gap-2.5">
            <img src={compassIcon} alt="CareerOS" className="h-9 w-9 rounded-xl" />
            <span style={{ fontWeight: 700, letterSpacing: '-0.02em', color: '#EDEDEF' }}>CareerOS</span>
          </a>
          <div className="hidden gap-0.5 md:flex">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} onClick={(e) => smooth(e, n.href)}
                className="rounded-lg px-3.5 py-1.5 text-sm transition-colors"
                style={{ color: '#8A8F98', fontWeight: 500 }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#EDEDEF'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#8A8F98'; e.currentTarget.style.background = 'transparent' }}
              >{n.label}</a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Link to="/auth" className="rounded-lg px-4 py-1.5 text-sm font-medium transition-colors"
              style={{ color: '#8A8F98', border: '1px solid rgba(255,255,255,0.08)' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#EDEDEF' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#8A8F98' }}
            >Sign in</Link>
            <Link to="/auth?mode=signup" className="btn-accent rounded-lg px-4 py-1.5 text-sm font-semibold text-white">
              Request access
            </Link>
          </div>
        </nav>

        {/* HERO */}
        <section id="top" className="relative overflow-hidden"
          style={{ background: 'linear-gradient(160deg, #0e0b2e 0%, #080618 40%, #020203 75%)', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
        >
          {/* Aurora mesh */}
          <div className="aurora-bg pointer-events-none absolute inset-0 opacity-35" />

          {/* Dot grid */}
          <div className="pointer-events-none absolute inset-0"
            style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: '28px 28px' }}
          />

          {/* Diagonal editorial lines */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: 'repeating-linear-gradient(125deg, rgba(255,255,255,1) 0px, rgba(255,255,255,1) 1px, transparent 1px, transparent 64px)' }}
          />

          {/* Background orbs */}
          <Orb orbClass="l-orb-a" speed={0.06} className="h-[700px] w-[700px] -left-48 -top-48"
            style={{ background: 'radial-gradient(circle, rgba(94,106,210,0.22) 0%, transparent 58%)', mixBlendMode: 'screen' }} />
          <Orb orbClass="l-orb-b" speed={0.04} className="h-[600px] w-[600px] -right-24 -top-24"
            style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.20) 0%, transparent 58%)', mixBlendMode: 'screen' }} />
          <Orb orbClass="l-orb-c" speed={0.09} className="h-[500px] w-[500px] left-1/2 bottom-0"
            style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.12) 0%, transparent 60%)', mixBlendMode: 'screen' }} />

          {/* ── Split layout ─────────────────────────────────────────────── */}
          <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center gap-8 px-6 py-24 sm:px-12 lg:flex-row lg:items-center lg:gap-0 lg:py-0"
            style={{ minHeight: '100vh' }}
          >
            {/* LEFT — headline + CTAs */}
            <div className="flex-1 lg:pr-8">

              {/* Eyebrow */}
              <div className="landing-fade-in mb-8 inline-flex items-center gap-2.5 rounded-full px-5 py-2 text-[11px] font-bold uppercase tracking-[0.2em]"
                style={{ background: 'rgba(94,106,210,0.12)', border: '1px solid rgba(94,106,210,0.30)', color: '#a5b4fc', backdropFilter: 'blur(12px)' }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#5E6AD2]" />
                </span>
                AI-Powered Career OS · Prototype 2026
              </div>

              {/* BOMBASTIC HEADLINE */}
              <h1 className="mb-6" style={{ lineHeight: 1.00, letterSpacing: '-0.03em', perspective: '900px' }}>
                <span className="block text-[clamp(2rem,5vw,4rem)] font-light italic" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  Your career story,
                </span>
                <span className="block text-[clamp(3rem,8.5vw,7rem)] font-black uppercase text-white" style={{ letterSpacing: '-0.04em' }}>
                  <span className="hero-word" style={{ animationDelay: '100ms' }}>finally </span>
                  <span className="hero-word gradient-shimmer" style={{ animationDelay: '200ms' }}>remembered.</span>
                </span>
                <span className="mt-1 block text-[clamp(1rem,2.5vw,1.75rem)] font-semibold" style={{ color: '#8A8F98', letterSpacing: '-0.01em' }}>
                  <span className="hero-word" style={{ animationDelay: '340ms' }}>For </span>
                  <span className="hero-word" style={{ animationDelay: '400ms', color: '#818cf8' }}>students,</span>
                  <span className="hero-word" style={{ animationDelay: '460ms' }}> employers</span>
                  <span className="hero-word" style={{ animationDelay: '510ms' }}> &amp;</span>
                  <span className="hero-word" style={{ animationDelay: '560ms', color: '#38bdf8' }}> universities.</span>
                </span>
              </h1>

              {/* Sub-copy */}
              <p className="landing-fade-in mb-10 max-w-lg text-base leading-relaxed sm:text-lg"
                style={{ color: '#8A8F98', animationDelay: '620ms' }}
              >
                CareerOS preserves what students can do, helps employers recover warm talent,
                and lets universities act on readiness gaps before they become graduate outcomes.
              </p>

              {/* CTAs */}
              <div className="landing-fade-in flex flex-wrap gap-3" style={{ animationDelay: '720ms' }}>
                <button type="button" onClick={(e) => smooth(e, '#workspaces')}
                  className="btn-accent inline-flex items-center gap-2.5 rounded-xl px-8 py-4 text-base font-bold text-white"
                >
                  <Rocket className="h-5 w-5" /> Explore the prototype
                </button>
                <a href="#vision" onClick={(e) => smooth(e, '#vision')}
                  className="glass inline-flex items-center gap-2.5 rounded-xl px-7 py-4 text-base font-medium transition-colors"
                  style={{ color: '#8A8F98' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#EDEDEF'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#8A8F98'}
                >
                  <ChartNoAxesColumnIncreasing className="h-5 w-5" /> How it works
                </a>
              </div>

              {/* Stat strip */}
              <div className="landing-fade-in mt-12 flex flex-wrap gap-x-8 gap-y-4" style={{ animationDelay: '840ms' }}>
                {STATS.map((s) => (
                  <div key={s.l}>
                    <div className="text-xl font-bold sm:text-2xl" style={{ color: s.c }}>{s.v}</div>
                    <div className="text-[11px] font-medium uppercase tracking-wider" style={{ color: '#8A8F98' }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — robot mascot */}
            <div className="relative flex flex-shrink-0 items-center justify-center lg:w-[46%]">
              {/* Ground glow */}
              <div className="pointer-events-none absolute bottom-[8%] left-1/2 h-20 w-80 -translate-x-1/2 rounded-full"
                style={{ background: 'radial-gradient(ellipse, rgba(94,106,210,0.45) 0%, transparent 70%)', filter: 'blur(20px)' }}
              />
              {/* Soft halo ring */}
              <div className="l-orb-b pointer-events-none absolute inset-[10%] rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 65%)', border: '1px solid rgba(139,92,246,0.09)' }}
              />

              <div className="landing-fade-in scale relative z-10" style={{ animationDelay: '380ms' }}>
                {/* Floating robot */}
                <div style={{ animation: 'robot-float 4s ease-in-out infinite' }}>
                  <img
                    src={robotImg}
                    alt="CareerOS AI companion"
                    style={{
                      width: '100%',
                      maxWidth: 'clamp(260px, 40vw, 520px)',
                      filter: 'drop-shadow(0 0 48px rgba(94,106,210,0.50)) drop-shadow(0 0 20px rgba(139,92,246,0.35))',
                      userSelect: 'none',
                      pointerEvents: 'none',
                      display: 'block',
                    }}
                    draggable={false}
                  />
                </div>

                {/* Speech bubble */}
                <div className="absolute -top-2 right-0 sm:-top-6"
                  style={{
                    background: 'rgba(8,8,20,0.92)',
                    border: '1px solid rgba(94,106,210,0.38)',
                    borderRadius: '14px',
                    backdropFilter: 'blur(20px)',
                    padding: '10px 16px',
                    boxShadow: '0 4px 24px rgba(94,106,210,0.22)',
                    animation: 'robot-float 4s ease-in-out infinite 0.7s',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <p className="text-xs font-semibold" style={{ color: '#a5b4fc' }}>
                    Hi! I&apos;m your career AI companion.
                  </p>
                  <div style={{
                    position: 'absolute', bottom: -7, left: 20,
                    width: 13, height: 7,
                    background: 'rgba(8,8,20,0.92)',
                    clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                  }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {signedOut && (
          <div className="mx-auto -mt-2 mb-4 w-fit rounded-full px-4 py-2 text-sm font-semibold"
            style={{ background: 'rgba(52,211,153,0.10)', border: '1px solid rgba(52,211,153,0.20)', color: '#34d399' }}
          >Signed out successfully.</div>
        )}

        {/* â"€â"€ PROBLEM â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€ */}
        <section id="problem" className="relative overflow-hidden px-6 py-24 sm:px-12"
          style={{ background: S2, borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <Orb orbClass="l-orb-b" speed={0.06} className="h-[500px] w-[500px] -right-20 -top-20"
            style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 60%)', mixBlendMode: 'screen' }} />

          <div className="relative mx-auto max-w-6xl">
            <Reveal variant="left" className="mb-14 max-w-2xl">
              <Label>The Problem</Label>
              <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
                Career potential is lost<br />when evidence arrives too late.
              </h2>
              <p className="mt-4 text-base leading-relaxed" style={{ color: '#8A8F98' }}>
                Students lose proof, employers lose warm relationships, and universities lose time.
                CareerOS keeps those signals alive long enough for someone to act.
              </p>
            </Reveal>

            <div className="grid gap-4 lg:grid-cols-3">
              {PROBLEM_CARDS.map((c, i) => (
                <Reveal key={c.title} delay={i + 1} variant="scale" className="h-full">
                  <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl p-7 transition-transform duration-300 hover:-translate-y-1.5"
                    style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid rgba(255,255,255,0.08)`, backdropFilter: 'blur(20px)', boxShadow: '0 4px 24px rgba(0,0,0,0.24)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${c.color}40` }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }}
                  >
                    {/* corner glow */}
                    <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                      style={{ background: `radial-gradient(circle, ${c.color}20 0%, transparent 70%)` }} />
                    <div className="flex items-start justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: `${c.color}18`, color: c.color }}>
                        <c.Icon className="h-5 w-5" />
                      </div>
                      <span className="text-3xl font-bold tracking-tight" style={{ color: c.color }}>{c.stat}</span>
                    </div>
                    <h3 className="mt-5 text-base font-semibold text-white">{c.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed" style={{ color: '#8A8F98' }}>{c.body}</p>
                    <p className="mt-4 text-[11px]" style={{ color: '#8A8F98', opacity: 0.6 }}>Focus: {c.src}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* â"€â"€ WORKSPACES â€" Bento grid (variance 8/10) â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€ */}
        <section id="workspaces" className="relative overflow-hidden px-6 pb-24 pt-10 sm:px-12"
          style={{ background: S3, borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <Orb orbClass="l-orb-a" speed={0.07} className="h-[600px] w-[600px] -left-40 top-0"
            style={{ background: 'radial-gradient(circle, rgba(94,106,210,0.09) 0%, transparent 60%)', mixBlendMode: 'screen' }} />

          <div className="relative mx-auto max-w-6xl">
            <Reveal variant="scale" className="mb-14 text-center">
              <Label centered>The Solution</Label>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">One memory layer, three workspaces</h2>
              <p className="mx-auto mt-4 max-w-xl text-base" style={{ color: '#8A8F98' }}>
                Each workspace keeps its own job to be done, but shares the same operating principle:
                remember the signal, prove it, act earlier.
              </p>
            </Reveal>

            {/* Bento: 1 large left + 2 stacked right */}
            <div className="grid gap-4 overflow-hidden lg:grid-cols-5">
              {/* Large card — Candidate */}
              {(() => {
                const ws = WORKSPACES[0]
                return (
                  <Reveal className="h-full lg:col-span-3" variant="up">
                    <button type="button" onClick={() => enter(ws)}
                      className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl p-10 text-left transition-transform duration-300 hover:-translate-y-1"
                      style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${ws.border}`, backdropFilter: 'blur(24px)', boxShadow: '0 4px 32px rgba(0,0,0,0.28)' }}
                      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 0 50px ${ws.glow}` }}
                      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 4px 32px rgba(0,0,0,0.28)' }}
                    >
                      {/* animated top bar */}
                      <span className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 rounded-t-2xl transition-transform duration-500 group-hover:scale-x-100"
                        style={{ background: ws.grad }} />
                      {/* bg glow */}
                      <div className="pointer-events-none absolute right-6 top-6 h-52 w-52 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        style={{ background: `radial-gradient(circle, ${ws.glow} 0%, transparent 65%)` }} />

                      <div className="relative">
                        <div className="mb-2 text-[11px] font-semibold uppercase tracking-widest" style={{ color: ws.accent }}>{ws.sub}</div>
                        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl text-xl font-bold text-white"
                          style={{ background: ws.grad, boxShadow: `0 4px 20px ${ws.glow}` }}>{ws.letter}</div>
                        <h3 className="text-2xl font-bold tracking-tight text-white">{ws.title}</h3>
                        <p className="mt-3 max-w-sm text-base leading-relaxed" style={{ color: '#8A8F98' }}>{ws.desc}</p>
                        <ul className="mt-6 flex flex-col gap-3">
                          {ws.bullets.map((b) => (
                            <li key={b} className="flex items-start gap-2.5 text-sm leading-snug" style={{ color: '#8A8F98' }}>
                              <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: ws.accent }} /> {b}
                            </li>
                          ))}
                        </ul>
                        <span className="mt-8 inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-transform duration-200 group-hover:-translate-y-0.5"
                          style={{ background: ws.grad, boxShadow: `0 4px 16px ${ws.glow}` }}
                        >{ws.cta} <ArrowRight className="h-4 w-4" /></span>
                      </div>
                    </button>
                  </Reveal>
                )
              })()}

              {/* 2 stacked small cards */}
              <div className="flex flex-col gap-4 lg:col-span-2">
                {WORKSPACES.slice(1).map((ws, i) => (
                  <Reveal key={ws.id} delay={i + 1} variant="up" className="flex-1">
                    <button type="button" onClick={() => enter(ws)}
                      className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl p-7 text-left transition-transform duration-300 hover:-translate-y-1"
                      style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${ws.border}`, backdropFilter: 'blur(24px)', boxShadow: '0 4px 24px rgba(0,0,0,0.24)' }}
                      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 0 40px ${ws.glow}` }}
                      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.24)' }}
                    >
                      <span className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 rounded-t-2xl transition-transform duration-500 group-hover:scale-x-100"
                        style={{ background: ws.grad }} />
                      <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        style={{ background: `radial-gradient(circle, ${ws.glow} 0%, transparent 70%)` }} />

                      <div className="relative">
                        <div className="mb-1 text-[10px] font-semibold uppercase tracking-widest" style={{ color: ws.accent }}>{ws.sub}</div>
                        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl text-base font-bold text-white"
                          style={{ background: ws.grad, boxShadow: `0 4px 14px ${ws.glow}` }}>{ws.letter}</div>
                        <h3 className="text-lg font-bold tracking-tight text-white">{ws.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed" style={{ color: '#8A8F98' }}>{ws.desc}</p>
                        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold transition-opacity duration-200 group-hover:opacity-90"
                          style={{ color: ws.accent }}
                        >{ws.cta} <ArrowRight className="h-3.5 w-3.5" /></span>
                      </div>
                    </button>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* â"€â"€ HOW IT WORKS â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€ */}
        <section id="how" className="relative overflow-hidden px-6 py-24 sm:px-12"
          style={{ background: S4, borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <div className="pointer-events-none absolute inset-0"
            style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
          <Orb orbClass="l-orb-c" speed={0.09} className="h-[500px] w-[500px] -right-16 top-0"
            style={{ background: 'radial-gradient(circle, rgba(94,106,210,0.10) 0%, transparent 60%)', mixBlendMode: 'screen' }} />

          <div className="relative mx-auto max-w-6xl">
            <Reveal variant="left" className="mb-14">
              <Label>How It Works</Label>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                From isolated moments<br />to earlier action
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed" style={{ color: '#8A8F98' }}>
                CareerOS is not just dashboards. It is a loop that preserves evidence,
                explains what matters, and routes the next accountable action.
              </p>
            </Reveal>

            <div className="grid gap-4 lg:grid-cols-4">
              {STEPS.map((s, i) => (
                <Reveal key={s.n} delay={Math.min(i + 1, 4)} variant="up" className="h-full">
                  <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl p-7 transition-transform duration-300 hover:-translate-y-1.5"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${s.color}40` }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }}
                  >
                    <p className="text-[11px] font-bold uppercase tracking-[0.22em]" style={{ color: s.color }}>Step {s.n}</p>
                    <div className="mt-4 flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: `${s.color}16`, border: `1px solid ${s.color}28` }}>
                      <s.Icon className="h-5 w-5" style={{ color: s.color }} />
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-white">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed" style={{ color: '#8A8F98' }}>{s.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* â"€â"€ INTELLIGENCE â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€ */}
        <section id="vision" className="relative overflow-hidden px-6 py-24 sm:px-12"
          style={{ background: S5, borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <Orb orbClass="l-orb-a" speed={0.06} className="h-[500px] w-[500px] -left-20 bottom-0"
            style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.09) 0%, transparent 60%)', mixBlendMode: 'screen' }} />

          <div className="relative mx-auto max-w-6xl">
            <Reveal variant="right" className="mb-14">
              <Label>Intelligence Layer</Label>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Why this can become<br />more than a feature
              </h2>
              <p className="mt-4 max-w-lg text-base leading-relaxed" style={{ color: '#8A8F98' }}>
                The defensible value is not generic AI. It is permissioned longitudinal context,
                relationship history, and operational evidence that can compound over time.
              </p>
            </Reveal>

            <div className="grid gap-4 md:grid-cols-2">
              {INTEL_CARDS.map((c, i) => (
                <Reveal key={c.title} delay={Math.min(i + 1, 4)} variant={i % 2 === 0 ? 'left' : 'right'} className="h-full">
                  <div className="group flex h-full items-start gap-5 rounded-2xl p-7 transition-transform duration-300 hover:-translate-y-1"
                    style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid rgba(255,255,255,0.08)`, backdropFilter: 'blur(20px)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${c.color}38` }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }}
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl" style={{ background: `${c.color}16` }}>
                      <c.Icon className="h-5 w-5" style={{ color: c.color }} />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white">{c.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed" style={{ color: '#8A8F98' }}>{c.body}</p>
                      <span className="mt-3 inline-block rounded-full px-3 py-0.5 text-[11px] font-semibold"
                        style={{ background: `${c.color}14`, color: c.color }}>{c.tag}</span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* â"€â"€ ROADMAP â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€ */}
        <section id="roadmap" className="relative overflow-hidden px-6 py-24 sm:px-12"
          style={{ background: S6, borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <Orb orbClass="l-orb-b" speed={0.04} className="h-[400px] w-[700px] left-1/2 top-0 -translate-x-1/2"
            style={{ background: 'radial-gradient(ellipse, rgba(94,106,210,0.08) 0%, transparent 65%)', mixBlendMode: 'screen' }} />

          <div className="relative mx-auto max-w-6xl">
            <Reveal variant="scale" className="mb-14 text-center">
              <Label centered>Build Roadmap</Label>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">What we can show. What must be proven.</h2>
              <p className="mx-auto mt-4 max-w-lg text-base" style={{ color: '#8A8F98' }}>
                The prototype demonstrates the interaction model. The pilot proves whether evidence,
                intervention, and relationship history produce operational value.
              </p>
            </Reveal>

            <div className="grid gap-4 lg:grid-cols-3">
              {ROADMAP.map((p, i) => (
                <Reveal key={p.title} delay={i + 1} variant="up" className="h-full">
                  <div className="relative flex h-full flex-col overflow-hidden rounded-2xl p-7 transition-transform duration-300 hover:-translate-y-1.5"
                    style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid rgba(255,255,255,0.08)`, backdropFilter: 'blur(20px)', boxShadow: '0 4px 24px rgba(0,0,0,0.24)' }}
                  >
                    <span className="mb-5 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide"
                      style={{ background: `${p.pillColor}14`, border: `1px solid ${p.pillColor}28`, color: p.pillColor }}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${p.dot}`} /> {p.pill}
                    </span>
                    <h3 className="text-base font-semibold text-white">{p.title}</h3>
                    <ul className="mt-4 flex flex-col gap-2.5">
                      {p.items.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm leading-snug" style={{ color: '#8A8F98' }}>
                          <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: p.check }} /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* â"€â"€ CTA BANNER â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€ */}
        <section className="px-6 pb-20 pt-6 sm:px-12" style={{ background: '#07070a', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <Reveal variant="scale">
            <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl px-10 py-24 text-center sm:px-20"
              style={{
                background: 'linear-gradient(135deg, rgba(94,106,210,0.16) 0%, rgba(139,92,246,0.12) 50%, rgba(14,165,233,0.10) 100%)',
                border: '1px solid rgba(94,106,210,0.20)',
                backdropFilter: 'blur(32px)',
                boxShadow: '0 0 80px rgba(94,106,210,0.10), inset 0 1px 0 rgba(255,255,255,0.07)',
              }}
            >
              {/* inner aurora */}
              <div className="aurora-bg pointer-events-none absolute inset-6 rounded-[1.25rem] opacity-20" />
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{ background: 'radial-gradient(ellipse, rgba(94,106,210,0.14) 0%, transparent 70%)' }} />

              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full px-4 py-1 text-xs font-semibold"
                  style={{ background: 'rgba(94,106,210,0.15)', border: '1px solid rgba(94,106,210,0.28)', color: '#a5b4fc' }}
                >
                  <Sparkles className="h-3 w-3" /> Prototype ready for demo
                </span>
                <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
                  A career operating system<br />that remembers before it recommends.
                </h2>
                <p className="mt-4 text-base" style={{ color: '#8A8F98' }}>
                  Explore the working prototype across student, employer, and university workflows.
                  Outcomes, integrations, and predictive accuracy belong in the pilot, not in the claim.
                </p>
                <div className="mt-10 flex flex-wrap justify-center gap-3">
                  <button type="button" onClick={(e) => smooth(e, '#workspaces')}
                    className="btn-accent inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-white"
                  >
                    <CompassLucide className="h-4 w-4" /> Explore the prototype
                  </button>
                  <a href="#" className="glass inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-medium transition-colors"
                    style={{ color: '#8A8F98' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#EDEDEF'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#8A8F98'}
                  >
                    <Mail className="h-4 w-4" /> Get in touch
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* â"€â"€ FOOTER â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€ */}
        <footer className="flex flex-wrap items-center justify-between gap-4 px-6 py-6 sm:px-12"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <span className="text-sm font-bold tracking-tight" style={{ color: '#8A8F98', opacity: 0.5 }}>CareerOS</span>
          <div className="flex gap-6">
            {['GitHub', 'Pitch Deck', 'Team', 'Contact'].map((l) => (
              <a key={l} href="#" className="text-xs transition-colors"
                style={{ color: '#8A8F98', opacity: 0.5 }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.color = '#EDEDEF' }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.5'; e.currentTarget.style.color = '#8A8F98' }}
              >{l}</a>
            ))}
          </div>
        </footer>

      </main>
    </>
  )
}
