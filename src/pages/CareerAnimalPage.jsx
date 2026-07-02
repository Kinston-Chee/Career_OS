import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  Bot,
  Check,
  ChevronRight,
  Compass,
  Lightbulb,
  RefreshCw,
  Rocket,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react'
import HomeTopNav from '../components/home/HomeTopNav'
import CareerPathCompanionPanel from '../components/careerPath/CareerPathCompanionPanel'
import { candidateOverview, mockUser } from '../data/mockData'
import { ANIMAL_CATEGORIES } from '../data/selfDiscoveryEngine'
import { useSelfDiscoveryStore } from '../store/useSelfDiscoveryStore'

const makeId = () => `animal-${Date.now()}-${Math.random().toString(16).slice(2)}`

const categoryColors = {
  leadership: 'bg-amber-50 text-amber-700 border-amber-100',
  relational: 'bg-blue-50 text-blue-700 border-blue-100',
  execution: 'bg-emerald-50 text-emerald-700 border-emerald-100',
}

function SignalCard({ icon: Icon, label, value, note }) {
  return (
    <div className="rounded-xl border border-[#e2eaf8] bg-white p-4 shadow-[0_8px_22px_rgba(44,76,142,0.05)]">
      <div className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600">
          <Icon size={16} />
        </span>
        <span className="text-xs font-bold uppercase tracking-wide text-[#7382a1]">{label}</span>
      </div>
      <p className="mt-3 text-lg font-semibold text-[#11194a]">{value}</p>
      {note ? <p className="mt-1 text-xs font-medium leading-5 text-[#637094]">{note}</p> : null}
    </div>
  )
}

function DetailButton({ active, icon: Icon, title, subtitle, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex w-full items-center gap-3 rounded-xl border p-3 text-left transition ${
        active
          ? 'border-blue-200 bg-blue-50/80 shadow-[0_8px_20px_rgba(37,99,235,0.08)]'
          : 'border-[#e2eaf8] bg-white hover:border-blue-200 hover:bg-blue-50/45'
      }`}
    >
      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${active ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600'}`}>
        <Icon size={17} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-[#11194a]">{title}</span>
        <span className="mt-0.5 block truncate text-xs font-medium text-[#7382a1]">{subtitle}</span>
      </span>
      <ChevronRight size={15} className={active ? 'text-blue-600' : 'text-[#9aa6c3] group-hover:text-blue-600'} />
    </button>
  )
}

function DetailPanel({ activePanel, primary, emerging, paragraphs, strengthReasons, confidenceMessage }) {
  if (activePanel === 'strengths') {
    return (
      <section className="rounded-xl border border-[#e2eaf8] bg-white p-5 shadow-[0_8px_22px_rgba(44,76,142,0.07)]">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-600">Natural strengths</p>
        <h2 className="mt-2 text-xl font-semibold text-[#11194a]">Where your work style already shows up</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {primary.strengths.map((strength, index) => (
            <div key={strength} className="rounded-xl border border-blue-100 bg-blue-50/45 p-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-blue-600 shadow-sm">
                {[Star, Zap, Target][index % 3] && React.createElement([Star, Zap, Target][index % 3], { size: 16 })}
              </span>
              <p className="mt-3 text-sm font-semibold leading-5 text-[#2c3656]">{strength}</p>
            </div>
          ))}
        </div>
      </section>
    )
  }

  if (activePanel === 'growth') {
    return (
      <section className="rounded-xl border border-[#e2eaf8] bg-white p-5 shadow-[0_8px_22px_rgba(44,76,142,0.07)]">
        <p className="text-xs font-bold uppercase tracking-wide text-violet-600">Growth edges</p>
        <h2 className="mt-2 text-xl font-semibold text-[#11194a]">Small adjustments that would make you stronger</h2>
        <div className="mt-5 space-y-3">
          {primary.growthAreas.map((area) => (
            <div key={area} className="flex items-start gap-3 rounded-xl border border-violet-100 bg-violet-50/35 p-4">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-violet-600 shadow-sm">
                <TrendingUp size={15} />
              </span>
              <p className="text-sm font-medium leading-6 text-[#3a4669]">{area}</p>
            </div>
          ))}
        </div>
      </section>
    )
  }

  if (activePanel === 'environment') {
    return (
      <section className="rounded-xl border border-[#e2eaf8] bg-white p-5 shadow-[0_8px_22px_rgba(44,76,142,0.07)]">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-600">Best-fit environment</p>
        <h2 className="mt-2 text-xl font-semibold text-[#11194a]">Where you are likely to feel useful</h2>
        <p className="mt-4 text-sm font-medium leading-7 text-[#3a4669]">{primary.preferredEnvironment}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {primary.suggestedRoles.map((role) => (
            <span key={role} className="rounded-full border border-blue-100 bg-blue-50/70 px-3 py-1.5 text-xs font-bold text-blue-700">
              {role}
            </span>
          ))}
        </div>
      </section>
    )
  }

  if (activePanel === 'evolution') {
    return (
      <section className="rounded-xl border border-[#e2eaf8] bg-white p-5 shadow-[0_8px_22px_rgba(44,76,142,0.07)]">
        <p className="text-xs font-bold uppercase tracking-wide text-indigo-600">Profile evolution</p>
        <h2 className="mt-2 text-xl font-semibold text-[#11194a]">This is a starting point, not a fixed label</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 text-center">
            <span className="text-5xl">{primary.emoji}</span>
            <p className="mt-3 text-sm font-semibold text-[#11194a]">Primary: {primary.name}</p>
            <p className="mt-1 text-xs font-medium leading-5 text-[#637094]">Your strongest current work-style signal.</p>
          </div>
          <div className="rounded-xl border border-indigo-100 bg-indigo-50/55 p-4 text-center">
            <span className="text-5xl">{emerging?.emoji ?? '?'}</span>
            <p className="mt-3 text-sm font-semibold text-indigo-950">Emerging: {emerging?.name ?? 'Still learning'}</p>
            <p className="mt-1 text-xs font-medium leading-5 text-indigo-700">
              {emerging ? `I am starting to notice ${emerging.name} tendencies as a secondary pattern.` : 'Add Career Memory entries to help me detect secondary patterns.'}
            </p>
          </div>
        </div>
        <p className="mt-4 rounded-xl border border-blue-100 bg-blue-50/45 p-4 text-sm font-medium leading-6 text-[#3a4669]">{confidenceMessage}</p>
      </section>
    )
  }

  return (
    <section className="rounded-xl border border-[#e2eaf8] bg-white p-5 shadow-[0_8px_22px_rgba(44,76,142,0.07)]">
      <p className="text-xs font-bold uppercase tracking-wide text-blue-600">Companion read</p>
      <h2 className="mt-2 text-xl font-semibold text-[#11194a]">How your Career Companion currently understands you</h2>
      <div className="mt-4 space-y-3 text-sm font-medium leading-7 text-[#3a4669]">
        {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
      {strengthReasons.length > 0 ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {strengthReasons.map((reason) => (
            <span key={reason} className="inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50/80 px-3 py-1.5 text-xs font-bold text-emerald-700">
              <Check size={12} /> {reason}
            </span>
          ))}
        </div>
      ) : null}
    </section>
  )
}

export default function CareerAnimalPage() {
  const navigate = useNavigate()
  const store = useSelfDiscoveryStore()
  const readiness = candidateOverview.careerSnapshot.readiness
  const isCompleted = store.hasCompleted()

  if (!isCompleted) {
    return (
      <div className="min-h-screen bg-[#f6f9ff] text-[#121a3a]">
        <HomeTopNav user={mockUser} readiness={readiness} />
        <div className="mx-auto max-w-[860px] px-4 py-16 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-violet-100 text-violet-600 shadow-[0_8px_24px_rgba(124,58,237,0.15)]">
            <Bot size={40} />
          </div>
          <h1 className="text-3xl font-semibold text-[#11194a]">Your Career Animal Profile</h1>
          <p className="mx-auto mt-4 max-w-lg text-sm font-medium leading-7 text-[#637094]">
            Complete the self-discovery onboarding so your Career Companion can build an initial read of how you naturally work.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <button type="button" onClick={() => navigate('/student/account')} className="rounded-full bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-[0_14px_34px_rgba(37,99,235,0.26)] transition hover:bg-blue-700">
              Take the Assessment <ArrowRight className="ml-1 inline" size={16} />
            </button>
            <button type="button" onClick={() => navigate('/student/home')} className="rounded-full border border-blue-100 bg-white/75 px-6 py-3 text-sm font-bold text-blue-700 hover:bg-blue-50">
              Back to Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  return <CareerAnimalProfile store={store} readiness={readiness} />
}

function CareerAnimalProfile({ store, readiness }) {
  const navigate = useNavigate()
  const primary = store.primaryAnimal
  const emerging = store.emergingAnimal
  const paragraphs = store.narrative || []
  const confidence = store.confidence || 30
  const strengthReasons = store.strengthReasons || []
  const categoryLabel = ANIMAL_CATEGORIES[primary.category]?.label || 'Leadership'
  const [activePanel, setActivePanel] = useState('overview')
  const [messages, setMessages] = useState([
    {
      id: 'intro',
      role: 'robot',
      text: `I have an initial read on your work style: ${primary.name}, ${primary.archetype}. I will show the headline first. Ask me what you want to unpack next.`,
    },
  ])
  const [chips, setChips] = useState(['Why this animal?', 'Show strengths', 'Show growth areas', 'Best environments', 'How it evolves'])
  const [isTyping, setIsTyping] = useState(false)

  const panelReplies = {
    'Why this animal?': {
      panel: 'overview',
      text: `I matched you with ${primary.name} because your answers point toward ${strengthReasons.slice(0, 2).join(' and ').toLowerCase() || 'a clear work-style pattern'}. This is an initial estimate, not a permanent label.`,
    },
    'Show strengths': {
      panel: 'strengths',
      text: `Your strongest ${primary.name} signals are ${primary.strengths.slice(0, 2).join(' and ').toLowerCase()}. I have opened the strengths view so it does not crowd the whole page at once.`,
    },
    'Show growth areas': {
      panel: 'growth',
      text: `The useful growth edge is not to become a different person. It is to balance your natural style when the situation calls for it.`,
    },
    'Best environments': {
      panel: 'environment',
      text: `You will probably feel most useful in environments that reward your ${primary.name} pattern. I opened the work setting and role suggestions.`,
    },
    'How it evolves': {
      panel: 'evolution',
      text: `This profile updates as Career Memory collects more evidence. Projects, internships, reflections, and feedback can all shift the confidence and emerging animal over time.`,
    },
  }

  const handleChipClick = (chip) => {
    const reply = panelReplies[chip] || panelReplies['Why this animal?']
    setMessages((current) => [...current, { id: makeId(), role: 'user', text: chip }])
    setChips([])
    setIsTyping(true)
    window.setTimeout(() => {
      setActivePanel(reply.panel)
      setMessages((current) => [...current, { id: makeId(), role: 'robot', text: reply.text }])
      setChips(['Why this animal?', 'Show strengths', 'Show growth areas', 'Best environments', 'How it evolves'])
      setIsTyping(false)
    }, 850)
  }

  return (
    <div className="min-h-screen bg-[#f6f9ff] text-[#121a3a]">
      <HomeTopNav user={mockUser} readiness={readiness} />

      <div className="mx-auto max-w-[1480px] px-4 py-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[300px_minmax(0,1fr)_320px]">
          <div className="min-w-0 lg:h-[calc(100vh-7rem)]">
            <CareerPathCompanionPanel messages={messages} chips={chips} isTyping={isTyping} onChipClick={handleChipClick} />
          </div>

          <main className="min-w-0 space-y-5">
            <button type="button" onClick={() => navigate('/student/account')} className="flex items-center gap-1 text-xs font-bold text-[#637094] transition hover:text-blue-600">
              <Compass size={14} /> Back to Profile Account
            </button>

            <section className="overflow-hidden rounded-xl border border-[#e2eaf8] bg-white shadow-[0_8px_22px_rgba(44,76,142,0.07)]">
              <div className="grid gap-0 md:grid-cols-[220px_minmax(0,1fr)]">
                <div className="flex flex-col items-center justify-center bg-[linear-gradient(135deg,rgba(239,246,255,0.9),rgba(250,248,255,0.9))] p-6 text-center">
                  <span className="text-7xl drop-shadow-sm">{primary.emoji}</span>
                  <span className={`mt-4 rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wide ${categoryColors[primary.category]}`}>
                    {categoryLabel}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700">
                        <Sparkles size={12} /> Career Animal Profile
                      </p>
                      <h1 className="mt-3 text-3xl font-semibold tracking-[-0.01em] text-[#11194a]">{primary.name}</h1>
                      <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-[#7382a1]">{primary.archetype}</p>
                    </div>
                    <button type="button" onClick={() => navigate('/student/account', { state: { openAssessment: true } })} className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-xs font-bold text-blue-700 shadow-sm hover:bg-blue-50">
                      <RefreshCw size={14} /> Retake
                    </button>
                  </div>
                  <p className="mt-5 max-w-2xl text-sm font-medium leading-7 text-[#3a4669]">{primary.shortSummary}</p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    <SignalCard icon={ShieldCheck} label="Confidence" value={`${confidence}%`} note="Initial estimate" />
                    <SignalCard icon={Sparkles} label="Emerging" value={emerging?.name || 'Learning'} note={emerging?.archetype || 'Add more evidence'} />
                    <SignalCard icon={Rocket} label="Next step" value="Add evidence" note="Career Memory sharpens this profile" />
                  </div>
                </div>
              </div>
            </section>

            <DetailPanel
              activePanel={activePanel}
              primary={primary}
              emerging={emerging}
              paragraphs={paragraphs}
              strengthReasons={strengthReasons}
              confidenceMessage={store.confidenceMessage}
            />
          </main>

          <aside className="min-w-0 space-y-4">
            <section className="rounded-xl border border-[#e2eaf8] bg-white p-4 shadow-[0_8px_22px_rgba(44,76,142,0.07)]">
              <h2 className="text-sm font-semibold text-[#11194a]">Explore profile</h2>
              <p className="mt-1 text-xs font-medium leading-5 text-[#7382a1]">Open one layer at a time to keep the profile readable.</p>
              <div className="mt-4 space-y-2">
                <DetailButton active={activePanel === 'overview'} icon={Bot} title="Companion read" subtitle="Headline interpretation" onClick={() => setActivePanel('overview')} />
                <DetailButton active={activePanel === 'strengths'} icon={Star} title="Strengths" subtitle="Natural advantages" onClick={() => setActivePanel('strengths')} />
                <DetailButton active={activePanel === 'growth'} icon={TrendingUp} title="Growth" subtitle="Useful adjustments" onClick={() => setActivePanel('growth')} />
                <DetailButton active={activePanel === 'environment'} icon={Compass} title="Environments" subtitle="Roles and settings" onClick={() => setActivePanel('environment')} />
                <DetailButton active={activePanel === 'evolution'} icon={Zap} title="Evolution" subtitle="How this changes" onClick={() => setActivePanel('evolution')} />
              </div>
            </section>

            <section className="rounded-xl border border-[#e2eaf8] bg-white p-4 shadow-[0_8px_22px_rgba(44,76,142,0.07)]">
              <div className="flex items-center justify-between text-xs font-bold text-[#637094]">
                <span>Profile confidence</span>
                <span className="text-blue-600">{confidence}%</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-blue-600 transition-all duration-1000" style={{ width: `${confidence}%` }} />
              </div>
              <p className="mt-3 text-xs font-medium leading-5 text-[#637094]">{store.confidenceMessage}</p>
            </section>

            <section className="rounded-xl border border-[#e2eaf8] bg-white p-4 shadow-[0_8px_22px_rgba(44,76,142,0.07)]">
              <h2 className="text-sm font-semibold text-[#11194a]">Recommended actions</h2>
              <div className="mt-3 space-y-2">
                {['Add one project to Career Memory', 'Attach evidence to a recent experience', 'Ask the companion for matching opportunities'].map((action) => (
                  <button key={action} type="button" className="flex w-full items-center justify-between rounded-xl border border-[#e2eaf8] bg-slate-50/70 px-3 py-2.5 text-left text-xs font-semibold text-[#3a4669] transition hover:border-blue-200 hover:bg-blue-50">
                    {action}
                    <ArrowRight size={13} className="text-blue-600" />
                  </button>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  )
}
