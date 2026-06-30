import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EmployerNav from '../../components/employer/EmployerNav'
import PipelineMetrics from '../../components/employer/pipeline/PipelineMetrics'
import AIRewarmingSuggestions from '../../components/employer/pipeline/AIRewarmingSuggestions'
import PipelineStagesBoard from '../../components/employer/pipeline/PipelineStagesBoard'
import CandidatesDrawer from '../../components/employer/pipeline/CandidatesDrawer'
import NLPSearchBar from '../../components/employer/pipeline/NLPSearchBar'
import { pipelineStages, rewarmingSuggestions, STAGE_ORDER } from '../../data/campusPipelineData'

function PageHeader() {
  return (
    <div className="employer-page-header flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="employer-page-title">Campus Pipeline</h1>
        <p className="employer-page-subtitle">Your full talent relationship — from first discovery to hire</p>
      </div>
      <NLPSearchBar />
    </div>
  )
}

function DemoToast({ message }) {
  if (!message) return null
  return (
    <div className="employer-glass-card fixed bottom-5 right-5 z-50 px-4 py-3 text-sm font-semibold text-slate-800">
      {message}
    </div>
  )
}

export default function CampusPipeline() {
  const navigate = useNavigate()
  const [stages, setStages] = useState(pipelineStages)
  const [suggestions, setSuggestions] = useState(() => rewarmingSuggestions.map((s) => ({ ...s, status: 'idle', whyOpen: false })))
  const [drawerSuggestion, setDrawerSuggestion] = useState(null)
  const [openPreviewId, setOpenPreviewId] = useState(null)
  const [toast, setToast] = useState('')
  const toastRef = useRef(null)

  const activeCount = suggestions.filter((s) => s.status !== 'fading').length

  const showToast = (message) => {
    window.clearTimeout(toastRef.current)
    setToast(message)
    toastRef.current = window.setTimeout(() => setToast(''), 2800)
  }

  const applyStageMove = ({ from, to, count }) => {
    setStages((prev) =>
      prev.map((s) => {
        if (s.id === from) return { ...s, count: Math.max(0, s.count - count) }
        if (s.id === to) return { ...s, count: s.count + count }
        return s
      })
    )
  }

  const handlePrimaryAction = (item) => {
    if (item.status !== 'idle') return

    setSuggestions((prev) => prev.map((s) => (s.id === item.id ? { ...s, status: 'loading' } : s)))

    window.setTimeout(() => {
      setSuggestions((prev) => prev.map((s) => (s.id === item.id ? { ...s, status: 'confirmed' } : s)))
      showToast(item.successMessage)
      if (item.moveTo) applyStageMove(item.moveTo)
    }, 600)

    window.setTimeout(() => {
      setSuggestions((prev) => prev.map((s) => (s.id === item.id ? { ...s, status: 'fading' } : s)))
    }, 600 + 2000)

    window.setTimeout(() => {
      setSuggestions((prev) => prev.filter((s) => s.id !== item.id))
    }, 600 + 2000 + 700)
  }

  const handleToggleWhy = (id) => {
    setSuggestions((prev) => prev.map((s) => (s.id === id ? { ...s, whyOpen: !s.whyOpen } : s)))
  }

  const handleViewCandidates = (item) => {
    setDrawerSuggestion(item)
  }

  const handleDrawerRowAction = (candidate) => {
    showToast(`Action recorded for ${candidate.name}`)
  }

  const handleTogglePreview = (candidateId) => {
    setOpenPreviewId((prev) => (prev === candidateId ? null : candidateId))
  }

  const handleViewProfile = (candidate) => {
    navigate(`/employer/candidates?candidateId=${candidate.id}&from=${encodeURIComponent('Campus Pipeline')}`)
  }

  const handleMoveNext = (stageId, candidate) => {
    const currentIndex = STAGE_ORDER.indexOf(stageId)
    const nextStageId = STAGE_ORDER[currentIndex + 1]
    if (!nextStageId) return

    setStages((prev) =>
      prev.map((s) => {
        if (s.id === stageId) {
          return { ...s, count: Math.max(0, s.count - 1), candidates: s.candidates.filter((c) => c.id !== candidate.id) }
        }
        if (s.id === nextStageId) {
          return { ...s, count: s.count + 1, candidates: [...s.candidates, { ...candidate, daysInStage: 0 }] }
        }
        return s
      })
    )
    setOpenPreviewId(null)
    showToast(`${candidate.name} moved to ${stages.find((s) => s.id === nextStageId)?.name}`)
  }

  return (
    <div className="employer-workspace-page flex h-screen w-screen flex-col overflow-hidden">
      <EmployerNav variant="glass" />
      <main className="min-w-0 flex-1 overflow-y-auto">
        <div className="relative z-10 mx-auto max-w-[1480px] space-y-5 px-6 py-6">
          <PageHeader />
          <PipelineMetrics />
          <AIRewarmingSuggestions
            suggestions={suggestions}
            activeCount={activeCount}
            onPrimaryAction={handlePrimaryAction}
            onViewCandidates={handleViewCandidates}
            onToggleWhy={handleToggleWhy}
          />
          <PipelineStagesBoard
            stages={stages}
            openPreviewId={openPreviewId}
            onTogglePreview={handleTogglePreview}
            onMoveNext={handleMoveNext}
            onViewProfile={handleViewProfile}
          />
        </div>
      </main>

      <CandidatesDrawer suggestion={drawerSuggestion} onClose={() => setDrawerSuggestion(null)} onRowAction={handleDrawerRowAction} />
      <DemoToast message={toast} />
    </div>
  )
}
