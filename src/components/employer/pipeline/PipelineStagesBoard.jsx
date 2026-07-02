import React from 'react'
import { Star } from 'lucide-react'
import CandidateQuickPreview from './CandidateQuickPreview'
import { useEmployerWorkspaceStore } from '../../../store/useEmployerWorkspaceStore'

const TONE = {
  slate: {
    dot: 'bg-slate-500',
    columnBg: 'bg-slate-500/5',
    countPill: 'text-slate-600',
    avatar: 'bg-slate-500',
    tag: 'bg-slate-100 text-slate-600',
  },
  purple: {
    dot: 'bg-purple-600',
    columnBg: 'bg-purple-600/5',
    countPill: 'text-purple-700',
    avatar: 'bg-purple-600',
    tag: 'bg-purple-50 text-purple-700',
  },
  green: {
    dot: 'bg-green-700',
    columnBg: 'bg-green-700/5',
    countPill: 'text-green-700',
    avatar: 'bg-green-700',
    tag: 'bg-green-50 text-green-700',
  },
  orange: {
    dot: 'bg-orange-600',
    columnBg: 'bg-orange-600/5',
    countPill: 'text-orange-700',
    avatar: 'bg-orange-600',
    tag: 'bg-orange-50 text-orange-700',
  },
}

function MiniCandidateCard({ candidate, tone, isOpen, onToggle }) {
  const initials = candidate.name.split(' ').map((p) => p[0]).join('')
  const shortlisted = useEmployerWorkspaceStore((s) => s.shortlistedIds.has(candidate.id))
  return (
    <button
      type="button"
      onClick={() => onToggle(candidate.id)}
      className={`flex w-full items-center gap-2.5 rounded-xl bg-white/70 p-2.5 text-left ring-1 ring-blue-100/50 transition hover:bg-white ${isOpen ? 'ring-2 ring-blue-200' : ''}`}
    >
      <span className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white ${tone.avatar}`}>
        {initials}
        {shortlisted ? (
          <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-green-600 ring-2 ring-white">
            <Star className="h-2 w-2 fill-white text-white" />
          </span>
        ) : null}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-gray-900">{candidate.name}</p>
        <p className="truncate text-xs text-gray-400">{candidate.university}</p>
      </div>
      <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium ${tone.tag}`}>{candidate.tag}</span>
    </button>
  )
}

function StageColumn({ stage, isLastStage, openPreviewId, onTogglePreview, onMoveNext, onViewProfile }) {
  const tone = TONE[stage.tone] || TONE.slate

  return (
    <div className={`rounded-2xl border border-blue-100/60 bg-white/38 p-3.5 backdrop-blur-md ${tone.columnBg}`}>
      <div className="flex items-center gap-2 px-1">
        <span className={`h-2.5 w-2.5 rounded-full ${tone.dot}`} />
        <p className="text-sm font-bold text-gray-900">{stage.name}</p>
        <span
          key={stage.count}
          className={`ml-auto rounded-full bg-white px-2 py-0.5 text-xs font-semibold ${tone.countPill} stage-count-pulse`}
        >
          {stage.count}
        </span>
      </div>
      <div className="mt-3 space-y-2.5">
        {stage.candidates.map((candidate) => (
          <div key={candidate.id} className="relative">
            <MiniCandidateCard
              candidate={candidate}
              tone={tone}
              isOpen={openPreviewId === candidate.id}
              onToggle={onTogglePreview}
            />
            {openPreviewId === candidate.id ? (
              <CandidateQuickPreview
                candidate={candidate}
                stageName={stage.name}
                isLastStage={isLastStage}
                onMoveNext={() => onMoveNext(stage.id, candidate)}
                onClose={() => onTogglePreview(null)}
                onViewProfile={onViewProfile}
              />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function PipelineStagesBoard({ stages, openPreviewId, onTogglePreview, onMoveNext, onViewProfile }) {
  return (
    <section>
      <div className="mb-3 flex items-baseline gap-2">
        <h2 className="text-sm font-bold text-gray-900">Pipeline stages</h2>
        <p className="text-xs text-gray-400">Drag candidates between stages</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stages.map((stage, index) => (
          <StageColumn
            key={stage.id}
            stage={stage}
            isLastStage={index === stages.length - 1}
            openPreviewId={openPreviewId}
            onTogglePreview={onTogglePreview}
            onMoveNext={onMoveNext}
            onViewProfile={onViewProfile}
          />
        ))}
      </div>
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes stageCountPulse {
          0% { box-shadow: 0 0 0 3px rgba(24,95,165,0.25); }
          100% { box-shadow: 0 0 0 3px rgba(24,95,165,0); }
        }
        .stage-count-pulse { animation: stageCountPulse 900ms ease; }
      `}} />
    </section>
  )
}
