import React, { useEffect, useRef, useState } from 'react'
import { ArrowRight, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import HomeTopNav from '../components/home/HomeTopNav'
import HeroCard from '../components/home/HeroCard'
import CareerAnimalHomeCard from '../components/home/CareerAnimalHomeCard'
import { SelfDiscoveryFlow } from '../components/profile/SelfDiscoveryCard'
import OpportunityCards from '../components/home/OpportunityCards'
import QuickActions from '../components/home/QuickActions'
import RecentActivity from '../components/home/RecentActivity'
import RightSidebar from '../components/home/RightSidebar'
import { candidateHome, candidateOverview, mockUser } from '../data/mockData'
import mentorshipWidgetBg from '../assets/Mentorship Widget bg.png'

const OPPORTUNITY_DETAILS = {
  'home-opp-1': {
    title: 'ByteDance SWE Intern',
    company: 'ByteDance',
    match: '91% match',
    why: 'Matches Chris because of Python, frontend basics, and software engineering signals.',
    skills: ['Python', 'Frontend basics', 'Software engineering'],
    action: 'Apply',
  },
  'home-opp-2': {
    title: 'Grab Data Analyst',
    company: 'Grab',
    match: '79% match',
    why: 'Matches Chris through Python, SQL, dashboards, and prior data pipeline work.',
    skills: ['Python', 'SQL', 'Dashboards'],
    action: 'Apply',
  },
  'home-opp-3': {
    title: 'TalentBank AI Challenge',
    company: 'TalentBank',
    match: '92% match',
    why: 'Strong fit because it rewards NLP, ML fundamentals, and project evidence.',
    skills: ['NLP', 'ML', 'Project evidence'],
    action: 'Start challenge',
  },
  'home-opp-4': {
    title: 'Shopee Product Intern',
    company: 'Shopee',
    match: '86% match',
    why: 'Matches Chris through analytics, communication, and product thinking.',
    skills: ['Analytics', 'Communication', 'Product thinking'],
    action: 'Apply',
  },
}

function DemoToast({ message }) {
  if (!message) return null
  return (
    <div className="fixed bottom-24 right-5 z-50 rounded-2xl border border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.9),rgba(239,246,255,0.7))] px-4 py-3 text-sm font-bold text-[#185FA5] shadow-[0_18px_44px_rgba(37,99,235,0.14),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-xl ring-1 ring-blue-100/50">
      {message}
    </div>
  )
}

function DemoModal({ modal, onClose }) {
  if (!modal) return null
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/10 px-4 py-6 backdrop-blur-sm">
      <section role="dialog" aria-modal="true" className="w-full max-w-lg rounded-[28px] border border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.86),rgba(239,246,255,0.64))] p-6 shadow-[0_24px_80px_rgba(15,23,42,0.14),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-2xl ring-1 ring-blue-100/50">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-lg font-bold text-[#11194a]">{modal.title}</h2>
          <button type="button" onClick={onClose} className="rounded-full p-1 text-[#7382a1] transition hover:bg-blue-50 hover:text-blue-700"><X size={18} /></button>
        </div>
        {modal.body && <p className="mt-3 text-sm leading-6 text-[#3a4669]">{modal.body}</p>}
        {modal.rows && (
          <div className="mt-4 space-y-2.5">
            {modal.rows.map((row) => (
              <p key={row} className="rounded-2xl border border-white/70 bg-white/55 px-4 py-3 text-sm font-semibold leading-6 text-[#3a4669] shadow-[inset_0_1px_0_rgba(255,255,255,0.75),0_8px_24px_rgba(37,99,235,0.06)]">{row}</p>
            ))}
          </div>
        )}
        {modal.sections && (
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {modal.sections.map((section) => (
              <div key={section.title} className="rounded-2xl border border-white/70 bg-white/55 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.75),0_8px_24px_rgba(37,99,235,0.06)]">
                <p className="text-xs font-bold uppercase tracking-wide text-blue-600">{section.title}</p>
                <p className="mt-2 text-sm font-semibold leading-5 text-[#3a4669]">{section.text}</p>
              </div>
            ))}
          </div>
        )}
        <div className="mt-5 flex flex-wrap justify-end gap-2">
          {(modal.actions ?? [{ label: 'Close', onClick: onClose, secondary: true }]).map((action) => (
            <button
              key={action.label}
              type="button"
              onClick={action.onClick}
              className={`rounded-full px-4 py-2 text-sm font-bold transition-all ${action.secondary ? 'border border-blue-100 bg-white/70 text-blue-700 hover:bg-blue-50' : 'bg-blue-600 text-white shadow-[0_12px_30px_rgba(37,99,235,0.25)] hover:bg-blue-700'}`}
            >
              {action.label}
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}

function DemoDrawer({ drawer, onClose }) {
  if (!drawer) return null
  return (
    <div className="fixed inset-0 z-40 bg-slate-900/10 backdrop-blur-sm">
      <aside className="ml-auto flex h-full w-full max-w-md flex-col border-l border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.88),rgba(239,246,255,0.68))] p-6 shadow-[-24px_0_70px_rgba(15,23,42,0.12),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-2xl ring-1 ring-blue-100/50">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-lg font-bold text-[#11194a]">{drawer.title}</h2>
          <button type="button" onClick={onClose} className="rounded-full p-1 text-[#7382a1] transition hover:bg-blue-50 hover:text-blue-700"><X size={18} /></button>
        </div>
        <div className="mt-5 space-y-3">
          {drawer.rows.map((row) => (
            <div key={row.title} className="rounded-2xl border border-white/70 bg-white/55 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.75),0_8px_24px_rgba(37,99,235,0.06)]">
              <p className="text-sm font-bold text-[#11194a]">{row.title}</p>
              <p className="mt-1 text-sm font-medium text-[#637094]">{row.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-auto flex justify-end gap-2 pt-5">
          {drawer.actions.map((action) => (
            <button key={action.label} type="button" onClick={action.onClick} className={`rounded-full px-4 py-2 text-sm font-bold transition-all ${action.secondary ? 'border border-blue-100 bg-white/70 text-blue-700 hover:bg-blue-50' : 'bg-blue-600 text-white shadow-[0_12px_30px_rgba(37,99,235,0.25)] hover:bg-blue-700'}`}>
              {action.label}
            </button>
          ))}
        </div>
      </aside>
    </div>
  )
}

export default function CandidateHomePage() {
  const readiness = candidateOverview.careerSnapshot.readiness
  const navigate = useNavigate()
  const [modal, setModal] = useState(null)
  const [drawer, setDrawer] = useState(null)
  const [toast, setToast] = useState('')
  const [showAssessment, setShowAssessment] = useState(false)
  const toastRef = useRef(null)

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 })
    return () => window.clearTimeout(toastRef.current)
  }, [])

  const showToast = (message) => {
    window.clearTimeout(toastRef.current)
    setToast(message)
    toastRef.current = window.setTimeout(() => setToast(''), 1800)
  }

  const startTalentBank = () => {
    setModal(null)
    showToast('TalentBank application started')
    navigate('/student/applications')
  }

  const openTalentBankConfirm = () => {
    setModal({
      title: 'Start TalentBank application?',
      body: "We'll use your Career Memory, profile narrative, and skills evidence to pre-fill your application.",
      actions: [
        { label: 'Cancel', secondary: true, onClick: () => setModal(null) },
        { label: 'Start application', onClick: startTalentBank },
      ],
    })
  }

  const handleCoachSubmit = (prompt) => {
    navigate('/student/ai-companion', { state: { initialPrompt: prompt } })
  }

  const openCompanion = () => navigate('/student/ai-companion')

  const handlePickUp = (item) => {
    if (item.title === 'TalentBank application') navigate('/student/applications')
    else if (item.title === 'NLP Project in Career Memory') navigate('/student/profile')
    else if (item.title === 'System Design Basics') navigate('/student/learning')
    else setModal({
      title: 'Google ML Intern',
      rows: ['Role: Google ML Intern', 'Status: New role posted', 'Match reason: Matches your NLP and Python profile'],
      actions: [
        { label: 'Save opportunity', secondary: true, onClick: () => showToast('Saved to your opportunities') },
        { label: 'View details', onClick: () => navigate('/student/opportunities') },
      ],
    })
  }

  const handleOpportunity = (opp) => {
    const detail = OPPORTUNITY_DETAILS[opp.id]
    setModal({
      title: detail.title,
      rows: [
        `Company: ${detail.company}`,
        `Match: ${detail.match}`,
        `Why it matched Chris: ${detail.why}`,
        `Skills involved: ${detail.skills.join(', ')}`,
        `Suggested next action: ${detail.action}`,
      ],
      actions: [
        { label: 'Save', secondary: true, onClick: () => showToast('Saved to your opportunities') },
        { label: 'View details', secondary: true, onClick: () => navigate('/student/opportunities') },
        { label: detail.action, onClick: () => showToast('Application flow started') },
      ],
    })
  }

  const handleQuickAction = (action) => {
    if (action.title === 'Apply to top match') {
      navigate('/student/opportunities', {
        state: { highlightOpportunityId: 'talentbank-ai-challenge' },
      })
    }
    else if (action.title === 'Log an experience') navigate('/student/profile')
    else if (action.title === 'Practice interview') setModal({
      title: 'AI Mock Interview',
      rows: ['Role: Software Engineer Intern', 'Duration: 10 min', 'Focus: NLP project, problem solving, communication'],
      actions: [{ label: 'Start practice', onClick: () => showToast('Mock interview started') }],
    })
    else if (action.title === 'Check skill gaps') navigate('/student/intelligence')
    else if (action.title === 'Find campus events') navigate('/student/opportunities')
  }

  const openRecentActivity = () => setModal({
    title: 'Recent activity',
    rows: [
      ...candidateHome.recentActivity.map((item) => `${item.text} - ${item.time}`),
      'TalentBank AI Challenge match refreshed - Today 08:40',
      'Lenovo viewed your profile - Today 08:12',
    ],
  })

  const openMentorshipModal = () => setModal({
    title: 'Grow with the right mentor',
    body: 'Meet experienced professionals who can guide your next career step with practical advice, honest feedback, and real-world perspective.',
    sections: [
      { title: 'Personalised matches', text: 'CareerOS recommends mentors based on your goals, skills, and current gaps.' },
      { title: 'Human guidance', text: 'Get support from people who have already navigated the path ahead of you.' },
    ],
    actions: [
      { label: 'Maybe later', secondary: true, onClick: () => setModal(null) },
      { label: 'Explore Mentorships', onClick: () => navigate('/student/mentorships') },
    ],
  })

  return (
    <div className="min-h-screen bg-[#f6f9ff] text-[#121a3a]">
      <HomeTopNav user={mockUser} readiness={readiness} />

      <div className="mx-auto max-w-[1480px] px-4 py-5 sm:px-6 lg:px-8">
        <header className="mb-4">
          <h1 className="text-2xl font-bold tracking-[-0.01em] text-[#11194a] sm:text-3xl">
            Good morning, {mockUser.name.split(' ')[0]} <span aria-hidden="true">&#128075;</span>
          </h1>
          <p className="mt-1 text-sm font-medium text-[#637094]">You have 3 career actions to complete today.</p>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="min-w-0 space-y-4">
            <HeroCard
              briefing={candidateHome.robotBriefing}
              onSubmit={handleCoachSubmit}
              onOpenCompanion={openCompanion}
            />
            <CareerAnimalHomeCard onRetake={() => setShowAssessment(true)} />
            <OpportunityCards opportunities={candidateHome.exploreOpportunities} onSelect={handleOpportunity} />
            <QuickActions actions={candidateHome.quickActions} onAction={handleQuickAction} />
            <RecentActivity items={candidateHome.recentActivity} onSelect={(item) => showToast(item.text)} onViewAll={openRecentActivity} />
          </div>

          <div className="min-w-0">
            <RightSidebar
              pickingUpWhereLeftOff={candidateHome.pickingUpWhereLeftOff}
              whileYouWereAway={candidateHome.whileYouWereAway}
              skillSignal={candidateHome.skillSignal}
              onPickUp={handlePickUp}
              onMenuAction={(_, action) => showToast(action === 'Mark as done' ? 'Marked as done' : action)}
              onSkillSignal={() => setModal({
                title: 'NLP skill trend',
                rows: [
                  'Demand is up +34% this week',
                  'Chris is ahead of 76% of candidates in this field',
                  'Suggested action: attach NLP project proof and apply to AI-related roles',
                ],
              })}
            />
          </div>
        </div>
      </div>

      <DemoModal modal={modal} onClose={() => setModal(null)} />
      <DemoDrawer drawer={drawer} onClose={() => setDrawer(null)} />
      {showAssessment && <SelfDiscoveryFlow onClose={() => setShowAssessment(false)} />}
      <button
        type="button"
        onClick={openMentorshipModal}
        aria-label="Open Mentorships"
        className="group fixed bottom-4 right-4 z-30 flex min-h-[184px] w-[196px] flex-col overflow-hidden rounded-xl border border-blue-200/80 bg-white/95 p-4 pt-5 text-left shadow-[0_16px_38px_rgba(37,99,235,0.16)] backdrop-blur-xl transition duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-[0_20px_44px_rgba(37,99,235,0.22)] focus:outline-none focus:ring-4 focus:ring-blue-200 sm:w-[218px]"
      >
        <span className="absolute inset-x-0 top-0 h-1 bg-blue-600" aria-hidden="true" />
        <img src={mentorshipWidgetBg} alt="" aria-hidden="true" className="pointer-events-none absolute -right-2 bottom-8 h-[138px] w-[116px] object-contain object-bottom opacity-[0.16]" />
        <span className="relative z-10 block text-[10px] font-bold uppercase tracking-wide text-blue-600">CareerOS Mentorship</span>
        <span className="relative z-10 mt-1.5 block text-base font-bold leading-5 text-[#11194a]">Find your mentor</span>
        <span className="relative z-10 mt-2 block text-xs font-medium leading-[18px] text-[#637094]">
          Get practical guidance from experienced people matched to your career goals.
        </span>
        <span className="relative z-10 mt-auto flex w-full items-center justify-between rounded-lg bg-blue-600 px-3 py-2 text-xs font-bold text-white shadow-[0_8px_18px_rgba(37,99,235,0.20)] transition group-hover:bg-blue-700">
          Explore mentorships <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
        </span>
      </button>
      <DemoToast message={toast} />
    </div>
  )
}
