import React, { useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Bookmark,
  Calendar,
  CheckCircle2,
  FileText,
  Mail,
  ShieldAlert,
  Shuffle,
  Star,
  Target,
  User,
  Zap,
} from 'lucide-react'
import PipelineStepper from './PipelineStepper'
import ManagerBriefModal from './ManagerBriefModal'
import ScheduleInterviewModal from './ScheduleInterviewModal'
import MessageComposeModal from './MessageComposeModal'
import { getCandidateDetail } from '../../../data/candidatesData'
import { useEmployerWorkspaceStore } from '../../../store/useEmployerWorkspaceStore'

const TRAIT_ICONS = { zap: Zap, shuffle: Shuffle, target: Target }
const TRAIT_TONES = {
  blue: 'border-blue-100 bg-blue-50/60 text-[#185FA5]',
  purple: 'border-purple-100 bg-purple-50/60 text-purple-600',
  green: 'border-green-100 bg-green-50/60 text-green-600',
}

const MATCH_TONE = (score) => (score >= 90 ? 'text-green-600' : score >= 75 ? 'text-[#185FA5]' : 'text-gray-500')
const MATCH_PILL = (score) => (score >= 90 ? 'bg-green-50 text-green-700' : score >= 75 ? 'bg-blue-50 text-[#185FA5]' : 'bg-gray-100 text-gray-600')

const RISK_TONE = { LOW: 'bg-green-50 text-green-700', MEDIUM: 'bg-orange-50 text-orange-700', HIGH: 'bg-red-50 text-red-700' }
const RISK_BORDER = { LOW: 'border-l-green-500', MEDIUM: 'border-l-orange-500', HIGH: 'border-l-red-500' }

function CandidateAvatar({ initials, size = 'lg' }) {
  const sizeClass = size === 'lg' ? 'h-16 w-16 text-xl' : 'h-9 w-9 text-xs'
  return (
    <span className={`flex shrink-0 items-center justify-center rounded-full bg-blue-50 font-bold text-[#185FA5] ${sizeClass}`}>
      {initials}
    </span>
  )
}

function MatchHeader({ candidate, onShortlist, onScheduleInterview, onPass, shortlisted, passed }) {
  return (
    <section className={`employer-glass-card border-l-4 p-5 ${RISK_BORDER[candidate.matchScore >= 90 ? 'LOW' : 'MEDIUM']}`}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <CandidateAvatar initials={candidate.initials} />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{candidate.name}</h1>
            <p className="mt-1 text-sm text-gray-500">{candidate.university} · {candidate.year} · {candidate.course}</p>
            <p className="mt-0.5 text-sm font-medium text-[#185FA5]">Applied for: {candidate.targetRole}</p>
          </div>
        </div>
        <div className="text-right">
          <p className={`text-4xl font-extrabold leading-none ${MATCH_TONE(candidate.matchScore)}`}>{candidate.matchScore}%</p>
          <span className={`mt-1.5 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${MATCH_PILL(candidate.matchScore)}`}>
            {candidate.matchLabel}
          </span>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {candidate.evidenceChips.map((chip) => (
          <span key={chip} className="flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
            <CheckCircle2 className="h-3 w-3" />
            {chip}
          </span>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-1 text-sm">
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
          <span className="font-semibold text-gray-700">Risk:</span>
          <span className="text-orange-600">{candidate.risk}</span>
        </span>
        <span className="flex items-center gap-1.5">
          <ArrowRight className="h-3.5 w-3.5 text-[#185FA5]" />
          <span className="font-semibold text-gray-700">Validate next:</span>
          <span className="text-[#185FA5]">{candidate.validateNext}</span>
        </span>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-gray-50 pt-3">
        <p className="text-xs text-gray-400">{candidate.appliedDate}</p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onShortlist}
            disabled={shortlisted}
            className={`rounded-full px-4 py-2 text-sm font-semibold text-white transition-colors ${shortlisted ? 'bg-green-600' : 'bg-green-600 hover:bg-green-700'}`}
          >
            {shortlisted ? '✓ Shortlisted' : 'Shortlist'}
          </button>
          <button type="button" onClick={onScheduleInterview} className="rounded-full bg-[#185FA5] px-4 py-2 text-sm font-semibold text-white hover:bg-[#134c87]">
            Schedule interview
          </button>
          <button
            type="button"
            onClick={onPass}
            disabled={passed}
            className="employer-secondary-button px-4 py-2 text-sm"
          >
            {passed ? 'Passed' : 'Pass'}
          </button>
        </div>
      </div>
    </section>
  )
}

function CareerNarrative({ narrative }) {
  return (
    <section className="employer-glass-card border-l-4 border-l-purple-500 p-5">
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-50 text-purple-600">
          <Bot className="h-4 w-4" />
        </span>
        <h2 className="text-sm font-bold text-gray-900">Career Narrative</h2>
        <span className="text-xs text-gray-400">As told by {narrative.firstName}'s Career Companion</span>
      </div>
      <p className="mt-3 text-sm leading-6 text-gray-700">{narrative.text}</p>
      <p className="mt-2 text-xs italic text-gray-400">
        ⓘ This is the same narrative shown to {narrative.firstName} on their own CareerOS profile — full transparency, no separate employer-only scoring.
      </p>
    </section>
  )
}

function SelfDiscoveryCard({ name, traits, summary }) {
  return (
    <section className="employer-glass-card p-5">
      <div className="flex items-baseline gap-2">
        <User className="h-4 w-4 text-[#185FA5]" />
        <h2 className="text-sm font-bold text-gray-900">How {name.split(' ')[0]} Works</h2>
        <span className="text-xs text-gray-400">From Self-Discovery assessment</span>
      </div>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {traits.map((trait) => {
          const Icon = TRAIT_ICONS[trait.icon] || Zap
          return (
            <div key={trait.title} className={`rounded-xl border p-3 ${TRAIT_TONES[trait.tone]}`}>
              <Icon className="h-4 w-4" />
              <p className="mt-1.5 text-sm font-semibold">{trait.title}</p>
              <p className="mt-0.5 text-xs opacity-80">{trait.detail}</p>
            </div>
          )
        })}
      </div>
      <div className="mt-3 rounded-xl bg-gray-50 p-3 text-xs leading-5 text-gray-600">
        <span className="font-semibold text-gray-700">What this means for your team: </span>
        {summary}
      </div>
    </section>
  )
}

function CareerMemoryTimeline({ entries }) {
  return (
    <section className="employer-glass-card p-5">
      <div className="flex items-baseline gap-2">
        <Bookmark className="h-4 w-4 text-[#185FA5]" />
        <h2 className="text-sm font-bold text-gray-900">Career Memory</h2>
        <span className="text-xs text-gray-400">{entries.length} verified experiences</span>
      </div>
      <div className="relative mt-3 space-y-4">
        <div className="absolute bottom-2 left-[7px] top-2 w-px bg-blue-100" />
        {entries.map((entry) => (
          <div key={entry.title} className="relative flex flex-wrap items-center gap-3 pl-6">
            <span className="absolute left-0 top-1 h-3.5 w-3.5 rounded-full border-2 border-[#185FA5] bg-white" />
            <p className="w-full text-sm font-semibold text-gray-900 sm:w-auto sm:flex-1">{entry.title}</p>
            <span className="text-xs text-gray-400">{entry.date}</span>
            {entry.verified ? (
              <span className="flex items-center gap-1 text-xs font-medium text-green-600">
                <CheckCircle2 className="h-3 w-3" /> Verified
              </span>
            ) : null}
            {entry.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-blue-50 px-2 py-0.5 text-[11px] text-[#185FA5]">{tag}</span>
            ))}
            <span className="ml-auto flex items-center gap-1 text-[11px] text-gray-400">
              AI Signal
              <span className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={`h-3 w-1 rounded-sm ${i < entry.signal ? 'bg-[#185FA5]' : 'bg-gray-200'}`} />
                ))}
              </span>
            </span>
          </div>
        ))}
      </div>
      <button type="button" className="mt-3 flex items-center gap-1 text-xs font-semibold text-[#185FA5] hover:underline">
        View full Career Memory
        <ArrowRight className="h-3 w-3" />
      </button>
    </section>
  )
}

function PipelineStatusCard({ candidate, onMoveNext }) {
  return (
    <section className="employer-glass-card p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-gray-900">Pipeline Status</h2>
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
        <span>Pipeline stage</span>
        <span className="rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-semibold text-green-700">{candidate.pipelineStage}</span>
      </div>
      <div className="mt-4">
        <PipelineStepper currentStage={candidate.pipelineStage} />
      </div>
      <button type="button" onClick={onMoveNext} className="employer-primary-button mt-4 flex w-full items-center justify-center gap-1.5 px-4 py-2.5 text-sm">
        Move to next stage
        <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </section>
  )
}

function WhatToValidateCard({ items, onAddToInterview }) {
  const [checked, setChecked] = useState(() => new Set())
  const [added, setAdded] = useState(() => new Set())

  const toggle = (item) => {
    setChecked((prev) => {
      const next = new Set(prev)
      if (next.has(item)) next.delete(item)
      else next.add(item)
      return next
    })
  }

  const handleAdd = (item) => {
    if (added.has(item)) return
    setAdded((prev) => new Set(prev).add(item))
    onAddToInterview(item)
  }

  return (
    <section className="employer-glass-card p-5">
      <h2 className="text-sm font-bold text-gray-900">What to validate</h2>
      <div className="mt-3 space-y-3">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-2.5">
            <button
              type="button"
              onClick={() => toggle(item)}
              className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
                checked.has(item) ? 'border-[#185FA5] bg-[#185FA5] text-white' : 'border-gray-300'
              }`}
            >
              {checked.has(item) ? <CheckCircle2 className="h-3 w-3" /> : null}
            </button>
            <div className="min-w-0">
              <p className={`text-sm ${checked.has(item) ? 'text-gray-400 line-through' : 'text-gray-700'}`}>{item}</p>
              <button
                type="button"
                onClick={() => handleAdd(item)}
                disabled={added.has(item)}
                className={`flex items-center gap-1 text-xs font-medium ${added.has(item) ? 'text-green-600' : 'text-[#185FA5] hover:underline'}`}
              >
                {added.has(item) ? <><CheckCircle2 className="h-3 w-3" /> Added to interview questions</> : 'Add to interview questions'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function RetentionConditionsCard({ conditions, risk }) {
  return (
    <section className={`employer-glass-card border-l-4 p-5 ${RISK_BORDER[risk] || RISK_BORDER.MEDIUM}`}>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <ShieldAlert className="h-4 w-4 text-orange-500" />
          <h2 className="text-sm font-bold text-gray-900">Retention Conditions</h2>
        </div>
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${RISK_TONE[risk] || RISK_TONE.MEDIUM}`}>{risk} risk</span>
      </div>
      <p className="mt-2 text-sm leading-5 text-gray-600">Conditions to retain: {conditions}</p>
    </section>
  )
}

const QUICK_ACTIONS = [
  { id: 'message', icon: Mail, label: 'Send message' },
  { id: 'interview', icon: Calendar, label: 'Schedule interview' },
  { id: 'brief', icon: FileText, label: 'Generate manager brief' },
  { id: 'favorite', icon: Star, label: 'Add to favorites' },
]

function QuickActionsCard({ onAction, favorited }) {
  return (
    <section className="employer-glass-card p-5">
      <h2 className="text-sm font-bold text-gray-900">Quick Actions</h2>
      <div className="mt-3 space-y-2">
        {QUICK_ACTIONS.map((action) => {
          const isFavorite = action.id === 'favorite'
          return (
            <button
              key={action.id}
              type="button"
              onClick={() => onAction(action.id)}
              className="flex w-full items-center justify-between rounded-xl bg-white/60 px-3.5 py-2.5 text-left text-sm font-medium text-slate-700 ring-1 ring-blue-100/60 hover:bg-white"
            >
              <span className="flex items-center gap-2">
                <action.icon className={`h-4 w-4 ${isFavorite && favorited ? 'fill-amber-400 text-amber-400' : 'text-[#185FA5]'}`} />
                {isFavorite && favorited ? 'Added to favorites' : action.label}
              </span>
              <ArrowRight className="h-3.5 w-3.5 text-gray-300" />
            </button>
          )
        })}
      </div>
    </section>
  )
}

export default function CandidateDetailView({ candidate, backLabel, onBack, onToast, onMoveStage }) {
  const shortlistCandidate = useEmployerWorkspaceStore((s) => s.shortlistCandidate)
  const passCandidate = useEmployerWorkspaceStore((s) => s.passCandidate)
  const addInterviewPrepQuestion = useEmployerWorkspaceStore((s) => s.addInterviewPrepQuestion)
  const shortlistedIds = useEmployerWorkspaceStore((s) => s.shortlistedIds)
  const passedIds = useEmployerWorkspaceStore((s) => s.passedIds)

  const [favorited, setFavorited] = useState(false)
  const [activeModal, setActiveModal] = useState(null) // null | 'message' | 'interview' | 'brief'

  const shortlisted = shortlistedIds.has(candidate.id)
  const passed = passedIds.has(candidate.id)
  const detail = getCandidateDetail(candidate)
  const narrative = { firstName: candidate.name.split(' ')[0], text: detail.narrative }

  const handleQuickAction = (actionId) => {
    if (actionId === 'favorite') {
      setFavorited((prev) => {
        const next = !prev
        onToast(next ? `${candidate.name} added to favorites` : `${candidate.name} removed from favorites`)
        return next
      })
      return
    }
    setActiveModal(actionId)
  }

  return (
    <div className="relative z-10 mx-auto max-w-[1480px] space-y-4 px-6 py-6">
      <button type="button" onClick={onBack} className="flex items-center gap-1.5 text-sm font-medium text-[#185FA5] hover:text-[#134c87]">
        <ArrowLeft className="h-4 w-4" />
        Back to {backLabel}
      </button>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          <MatchHeader
            candidate={candidate}
            shortlisted={shortlisted}
            passed={passed}
            onShortlist={() => {
              shortlistCandidate(candidate.id)
              onToast(`${candidate.name} added to shortlist`)
            }}
            onScheduleInterview={() => setActiveModal('interview')}
            onPass={() => {
              passCandidate(candidate.id)
              onToast(`${candidate.name} marked as passed`)
            }}
          />
          <CareerNarrative narrative={narrative} />
          <SelfDiscoveryCard name={candidate.name} traits={detail.selfDiscovery} summary={detail.selfDiscoverySummary} />
          <CareerMemoryTimeline entries={detail.careerMemory} />
        </div>

        <div className="space-y-4">
          <PipelineStatusCard candidate={candidate} onMoveNext={() => onMoveStage(candidate)} />
          <WhatToValidateCard
            items={detail.whatToValidate}
            onAddToInterview={(item) => {
              addInterviewPrepQuestion({ text: item, candidateId: candidate.id, candidateName: candidate.name })
              onToast(`Added "${item}" to interview prep list`)
            }}
          />
          <RetentionConditionsCard conditions={detail.retentionConditions} risk={detail.retentionRisk} />
          <QuickActionsCard onAction={handleQuickAction} favorited={favorited} />
        </div>
      </div>

      {activeModal === 'message' ? (
        <MessageComposeModal
          candidate={candidate}
          onClose={() => setActiveModal(null)}
          onSend={() => {
            setActiveModal(null)
            onToast(`Message sent to ${candidate.name}`)
          }}
        />
      ) : null}

      {activeModal === 'interview' ? (
        <ScheduleInterviewModal
          candidate={candidate}
          onClose={() => setActiveModal(null)}
          onConfirm={({ date, time }) => {
            setActiveModal(null)
            onToast(`Interview scheduled with ${candidate.name} — ${date} at ${time}`)
          }}
        />
      ) : null}

      {activeModal === 'brief' ? (
        <ManagerBriefModal
          candidate={candidate}
          detail={detail}
          onClose={() => setActiveModal(null)}
          onToast={onToast}
        />
      ) : null}
    </div>
  )
}
