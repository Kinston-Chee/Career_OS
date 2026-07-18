import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { X } from 'lucide-react'
import HomeTopNav from '../components/home/HomeTopNav'
import OpportunitiesHeader from '../components/opportunitiesHub/OpportunitiesHeader'
import OpportunitiesHeroCard from '../components/opportunitiesHub/OpportunitiesHeroCard'
import OpportunityGridCard from '../components/opportunitiesHub/OpportunityGridCard'
import ApplicationTrackerPanel from '../components/opportunitiesHub/ApplicationTrackerPanel'
import WhyThese3Modal from '../components/opportunitiesHub/WhyThese3Modal'
import OpportunityDetailsPanel from '../components/opportunitiesHub/OpportunityDetailsPanel'
import { candidateOverview, mockUser, opportunitiesHub, opportunityDetails } from '../data/mockData'
import { useCareerStore } from '../store/useCareerStore'

const TAB_TYPE_MAP = {
  All: null,
  Internships: 'internship',
  Challenges: 'challenge',
  Jobs: 'job',
  Events: 'event',
}

const LIST_FILTERS = ['All', 'Saved', 'Applied', 'High match']
const TRACKER_FILTERS = ['All', 'Applied', 'In Review', 'Interview', 'Offer']
const STAGES = ['Applied', 'In Review', 'Interview', 'Offer']

const APPLICATION_DETAILS = {
  ByteDance: {
    match: '91%',
    stage: 'Application submitted',
    nextStep: 'Waiting for recruiter review',
    currentState: 'Your application has been submitted. The company has not responded yet.',
    actions: ['Add stronger software engineering proof to Career Memory', 'Prepare a short project explanation', 'Keep applying to similar roles'],
    suggestion: 'Since this role is software engineering focused, add one React or system design project evidence to strengthen your profile while waiting.',
  },
  'Google APAC': {
    match: '87%',
    stage: 'Screening review',
    nextStep: 'Challenge screening',
    currentState: 'Your submission is currently under review. This stage usually checks problem-solving fit and challenge readiness.',
    actions: ['Practise algorithms and data structures', 'Review problem-solving examples', 'Prepare a short explanation of your project approach'],
    suggestion: 'This is a challenge-style opportunity, so focus on explaining your thinking process clearly, not just the final answer.',
  },
  Grab: {
    match: '79%',
    stage: 'Interview scheduled',
    nextStep: 'Prepare interview answers',
    currentState: 'You have an interview coming up. This is the most urgent application in your tracker.',
    actions: ['Practise SQL questions', 'Prepare dashboard storytelling examples', 'Review your AIA / MetLife reporting experience', 'Prepare one strong analytics project story'],
    suggestion: 'Start with a 10-minute mock interview focused on SQL, business insight, and explaining dashboard impact.',
  },
  Shopee: {
    match: '86%',
    stage: 'Offer received',
    nextStep: 'Review offer details',
    currentState: 'You received an offer. Now you should evaluate whether the role matches your career direction and learning goals.',
    actions: ['Compare offer with target role preferences', 'Review salary, learning opportunity, and team fit', 'Prepare questions before accepting'],
    suggestion: 'Compare this offer against your target path: software engineering, AI/data, or product analytics. The best offer is not only the fastest one, but the one that compounds your long-term signal.',
  },
}

const STATUS_CLASSES = {
  Applied: 'border-emerald-100 bg-emerald-50/80 text-emerald-700',
  'In Review': 'border-blue-100 bg-blue-50/80 text-blue-700',
  Interview: 'border-orange-100 bg-orange-50/80 text-orange-700',
  Offer: 'border-violet-100 bg-violet-50/80 text-violet-700',
}

function DemoToast({ message }) {
  if (!message) return null
  return (
    <div className="fixed bottom-5 right-5 z-50 rounded-2xl border border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.9),rgba(239,246,255,0.7))] px-4 py-3 text-sm font-bold text-[#185FA5] shadow-[0_18px_44px_rgba(37,99,235,0.14),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-xl ring-1 ring-blue-100/50">
      {message}
    </div>
  )
}

function ApplicationTrackerModal({ applications, initialApplication, onClose }) {
  const [statusFilter, setStatusFilter] = useState('All')
  const [selectedId, setSelectedId] = useState(initialApplication?.id ?? applications[0]?.id)
  const filteredApplications = useMemo(() => (
    statusFilter === 'All' ? applications : applications.filter((app) => app.status === statusFilter)
  ), [applications, statusFilter])
  const selected = filteredApplications.find((app) => app.id === selectedId) ?? filteredApplications[0]
  const details = selected ? APPLICATION_DETAILS[selected.company] ?? {
    match: '82%',
    stage: selected.status,
    nextStep: 'Check application status',
    currentState: 'This application is being tracked in your CareerOS workspace.',
    actions: ['Review your Career Memory evidence', 'Prepare one relevant story'],
    suggestion: 'Open the related opportunity and strengthen the evidence behind this application.',
  } : null

  useEffect(() => {
    if (filteredApplications.length === 0) {
      setSelectedId(null)
      return
    }
    if (!filteredApplications.some((app) => app.id === selectedId)) setSelectedId(filteredApplications[0].id)
  }, [filteredApplications, selectedId])

  if (!selected || !details) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/10 px-4 py-6 backdrop-blur-sm">
      <section role="dialog" aria-modal="true" className="flex max-h-[82vh] w-full max-w-5xl flex-col rounded-[28px] border border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.9),rgba(239,246,255,0.7))] p-6 shadow-[0_24px_80px_rgba(15,23,42,0.14),inset_0_1px_0_rgba(255,255,255,0.9)] ring-1 ring-blue-100/50 backdrop-blur-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-black text-[#11194a]">All applications</h2>
            <p className="mt-1 text-sm font-semibold text-[#637094]">Track where each opportunity stands and what to do next.</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-full p-1.5 text-[#7382a1] transition hover:bg-blue-50 hover:text-blue-700">
            <X size={18} />
          </button>
        </div>

        <div className="mt-5 grid min-h-0 flex-1 gap-4 overflow-hidden lg:grid-cols-[38%_1fr]">
          <div className="min-h-0 overflow-y-auto rounded-3xl border border-white/70 bg-white/45 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
            <div className="mb-3 flex flex-wrap gap-2">
              {TRACKER_FILTERS.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setStatusFilter(filter)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-bold transition ${statusFilter === filter ? 'border-blue-600 bg-blue-600 text-white' : 'border-white/70 bg-white/70 text-[#637094] hover:border-blue-200 hover:text-blue-700'}`}
                >
                  {filter}
                </button>
              ))}
            </div>
            <div className="space-y-2.5">
              {filteredApplications.map((app) => {
                const appDetails = APPLICATION_DETAILS[app.company]
                const active = selected.id === app.id
                return (
                  <button
                    key={app.id}
                    type="button"
                    onClick={() => setSelectedId(app.id)}
                    className={`w-full rounded-2xl border p-3 text-left transition ${active ? 'border-blue-200 bg-blue-50/80 shadow-[0_12px_28px_rgba(37,99,235,0.12)]' : 'border-white/70 bg-white/60 hover:border-blue-100 hover:bg-white/85'}`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">{app.logo}</span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="truncate text-sm font-bold text-[#11194a]">{app.company}</p>
                          <span className={`rounded-full border px-2 py-0.5 text-[11px] font-bold ${STATUS_CLASSES[app.status] ?? STATUS_CLASSES.Applied}`}>{app.status}</span>
                        </div>
                        <p className="mt-0.5 truncate text-xs font-semibold text-[#637094]">{app.role}</p>
                        <p className="mt-1 text-[11px] font-medium text-[#8a96af]">{app.dateLabel}</p>
                        <p className="mt-2 text-xs font-semibold text-blue-700">{appDetails?.nextStep ?? 'Check next step'}</p>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="min-h-0 overflow-y-auto rounded-3xl border border-white/70 bg-white/55 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.78),0_12px_34px_rgba(37,99,235,0.08)]">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">{selected.logo}</span>
                <div>
                  <h3 className="text-lg font-black text-[#11194a]">{selected.company}</h3>
                  <p className="text-sm font-semibold text-[#637094]">{selected.role}</p>
                  <p className="mt-1 text-xs font-medium text-[#8a96af]">{selected.dateLabel}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`rounded-full border px-3 py-1 text-xs font-bold ${STATUS_CLASSES[selected.status] ?? STATUS_CLASSES.Applied}`}>{selected.status}</span>
                <span className="rounded-full border border-blue-100 bg-blue-50/80 px-3 py-1 text-xs font-bold text-blue-700">{details.match}</span>
              </div>
            </div>

            <InfoCard title="Current state">{details.currentState}</InfoCard>

            <div className="mt-4 rounded-2xl border border-white/70 bg-white/55 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.75),0_8px_24px_rgba(37,99,235,0.06)]">
              <p className="text-xs font-bold uppercase tracking-wide text-blue-600">{details.stage}</p>
              <div className="mt-3 grid grid-cols-4 gap-2">
                {STAGES.map((stage) => {
                  const active = STAGES.indexOf(stage) <= STAGES.indexOf(selected.status)
                  return (
                    <div key={stage} className={`rounded-xl px-2 py-2 text-center text-[11px] font-bold ${active ? 'bg-blue-600 text-white' : 'bg-blue-50 text-[#7a87a2]'}`}>
                      {stage}
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-white/70 bg-white/55 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.75),0_8px_24px_rgba(37,99,235,0.06)]">
              <p className="text-xs font-bold uppercase tracking-wide text-blue-600">What to do now</p>
              <ul className="mt-3 space-y-2 text-sm font-semibold text-[#3a4669]">
                {details.actions.map((action) => <li key={action}>- {action}</li>)}
              </ul>
            </div>

            <InfoCard title="CareerOS recommendation">{details.suggestion}</InfoCard>

          </div>
        </div>
      </section>
    </div>
  )
}

function InfoCard({ title, children }) {
  return (
    <div className="mt-4 rounded-2xl border border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.68),rgba(239,246,255,0.52))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.75),0_8px_24px_rgba(37,99,235,0.06)]">
      <p className="text-xs font-bold uppercase tracking-wide text-blue-600">{title}</p>
      <p className="mt-2 text-sm font-semibold leading-6 text-[#3a4669]">{children}</p>
    </div>
  )
}

export default function OpportunitiesPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const readiness = candidateOverview.careerSnapshot.readiness
  const [activeTab, setActiveTab] = useState('All')
  const [listFilter, setListFilter] = useState('All')
  const [savedIds, setSavedIds] = useState([])
  const [showWhyModal, setShowWhyModal] = useState(false)
  const [activeOpportunity, setActiveOpportunity] = useState(null)
  const [trackerInitialApplication, setTrackerInitialApplication] = useState(null)
  const [appliedIds, setAppliedIds] = useState([])
  const [toast, setToast] = useState('')
  const toastRef = useRef(null)
  const [highlightOpportunityId, setHighlightOpportunityId] = useState(location.state?.highlightOpportunityId ?? null)

  const opportunityTracker = useCareerStore((state) => state.opportunityTracker)
  const addOpportunityTrackerEntry = useCareerStore((state) => state.addOpportunityTrackerEntry)

  useEffect(() => () => window.clearTimeout(toastRef.current), [])

  useEffect(() => {
    const id = location.state?.highlightOpportunityId
    if (!id) return undefined

    setHighlightOpportunityId(id)
    const clearHighlight = window.setTimeout(() => setHighlightOpportunityId(null), 3800)
    return () => window.clearTimeout(clearHighlight)
  }, [location.state])

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

  const filteredCards = useMemo(() => {
    const type = TAB_TYPE_MAP[activeTab]
    const tabCards = type ? opportunitiesHub.cards.filter((card) => card.type === type) : opportunitiesHub.cards
    if (listFilter === 'Saved') return tabCards.filter((card) => savedIds.includes(card.id))
    if (listFilter === 'Applied') return tabCards.filter((card) => appliedIds.includes(card.id) || appliedOpportunityIds.includes(card.id))
    if (listFilter === 'High match') return tabCards.filter((card) => (card.matchPercent ?? 0) >= 85)
    return tabCards
  }, [activeTab, appliedIds, appliedOpportunityIds, listFilter, savedIds])

  const toggleSave = (id) => {
    setSavedIds((current) => {
      const saved = current.includes(id)
      showToast(saved ? 'Removed from saved opportunities' : 'Saved to your opportunities')
      return saved ? current.filter((savedId) => savedId !== id) : [...current, id]
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
    if (detail) setActiveOpportunity(detail)
  }

  return (
    <div className="min-h-screen bg-[#f6f9ff] text-[#121a3a]">
      <HomeTopNav user={mockUser} readiness={readiness} />

      <div className="mx-auto max-w-[1480px] px-4 py-5 sm:px-6 lg:px-8">
        <div className="space-y-5">
          <OpportunitiesHeader tabs={opportunitiesHub.filterTabs} activeTab={activeTab} onTabChange={setActiveTab} />

          <OpportunitiesHeroCard
            headline={opportunitiesHub.heroHeadline}
            picks={opportunitiesHub.heroPicks}
            highlightOpportunityId={highlightOpportunityId}
            onWhyClick={() => setShowWhyModal(true)}
            onViewDetails={handleViewDetails}
          />

          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <span className="text-xl font-semibold text-[#11194a]">All opportunities</span>
              <div className="mt-3 flex flex-wrap gap-2">
                {LIST_FILTERS.map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setListFilter(filter)}
                    className={`rounded-full border px-3.5 py-1.5 text-xs font-bold transition ${
                      listFilter === filter
                        ? 'border-blue-600 bg-blue-600 text-white shadow-[0_10px_24px_rgba(37,99,235,0.18)]'
                        : 'border-white/70 bg-white/70 text-[#637094] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-xl hover:border-blue-200 hover:text-blue-700'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
            <span className="text-xs font-medium text-[#7382a1]">{opportunitiesHub.resultsSummary}</span>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {filteredCards.length === 0 ? (
                <div className="col-span-full flex min-h-[180px] flex-col items-center justify-center rounded-2xl border border-white/70 bg-white/65 p-8 text-center shadow-[0_18px_45px_rgba(37,99,235,0.08),inset_0_1px_0_rgba(255,255,255,0.85)] backdrop-blur-xl">
                  <p className="text-base font-bold text-[#11194a]">{listFilter === 'Saved' ? 'No saved opportunities yet' : 'No opportunities found yet'}</p>
                  <p className="mt-1 text-sm font-medium text-[#7382a1]">{listFilter === 'Saved' ? 'Save roles, challenges, or events to review them later.' : 'Try a different filter.'}</p>
                  {listFilter === 'Saved' && (
                    <button type="button" onClick={() => setListFilter('All')} className="mt-4 rounded-full bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-[0_12px_30px_rgba(37,99,235,0.22)] transition hover:bg-blue-700">
                      Explore all opportunities
                    </button>
                  )}
                </div>
              ) : (
                filteredCards.map((card) => (
                  <div key={card.id} className="opacity-100 scale-100 transition-all duration-200">
                    <OpportunityGridCard
                      opportunity={card}
                      applied={appliedIds.includes(card.id)}
                      saved={savedIds.includes(card.id)}
                      onViewDetails={() => handleViewDetails(card.id)}
                      onToggleSave={() => toggleSave(card.id)}
                    />
                  </div>
                ))
              )}
            </div>

            <div className="min-w-0">
              <ApplicationTrackerPanel
                applications={opportunityTracker}
                onViewAll={() => setTrackerInitialApplication(opportunityTracker[0])}
                onSelectApplication={setTrackerInitialApplication}
              />
            </div>
          </div>
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
