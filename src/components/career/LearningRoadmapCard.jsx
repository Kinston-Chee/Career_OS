import React, { useState } from 'react'
import Card from '../ui/Card'
import RoadmapStep from './RoadmapStep'

// Visual styles for the status badge. Extend as new statuses are added.
const STATUS_STYLES = {
  current: {
    label: 'Up to date',
    classes: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
    dot: 'bg-emerald-500',
  },
  expired: {
    label: 'Outdated',
    classes: 'bg-amber-50 text-amber-700 ring-amber-200',
    dot: 'bg-amber-500',
  },
}

/**
 * LearningRoadmapCard
 *
 * Renders the "Your Learning Roadmap" section on the Skill Summary tab.
 *
 * Props:
 * - roadmap: {
 *     status: 'current' | 'expired',
 *     lastUpdatedAt?: string,
 *     marketRefreshedAt?: string,
 *     targetRole?: string,
 *     summary?: string,
 *     steps: Array<{ title, status, tags, action, time }>,
 *   }
 * - onRegenerate?: () => Promise<void> | void — when provided, the parent owns
 *   the regenerate action (e.g. call the AI backend). If omitted, the component
 *   simulates a short async refresh locally for demo purposes.
 */
export default function LearningRoadmapCard({ roadmap, onRegenerate }) {
  const [isRegenerating, setIsRegenerating] = useState(false)
  const statusKey = roadmap?.status === 'current' ? 'current' : 'expired'
  const statusStyle = STATUS_STYLES[statusKey]
  const steps = roadmap?.steps ?? []

  const handleRegenerate = async () => {
    if (isRegenerating) return
    setIsRegenerating(true)
    try {
      if (onRegenerate) {
        await onRegenerate()
      } else {
        // Demo fallback so the button feels responsive even without a backend
        // wired up. Replace this with a real call when onRegenerate is supplied.
        await new Promise((resolve) => setTimeout(resolve, 900))
      }
    } finally {
      setIsRegenerating(false)
    }
  }

  return (
    <Card className="rounded-2xl border-slate-200/80 bg-white/95 p-5 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
      <header className="flex flex-col gap-3 border-b border-slate-100 pb-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-semibold text-slate-950">Your Learning Roadmap</h3>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ring-1 ${statusStyle.classes}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${statusStyle.dot}`} />
              {statusStyle.label}
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            {roadmap?.summary ?? 'Step-by-step plan to become job-ready.'}
          </p>
          <p className="mt-1 text-xs text-slate-400">
            {statusKey === 'expired' ? (
              <>
                Last updated {roadmap?.lastUpdatedAt ?? '—'}. Market data refreshed{' '}
                {roadmap?.marketRefreshedAt ?? '—'} — regenerate to realign.
              </>
            ) : (
              <>Synced with the latest market signals on {roadmap?.lastUpdatedAt ?? '—'}.</>
            )}
          </p>
        </div>
        <button
          type="button"
          onClick={handleRegenerate}
          disabled={isRegenerating}
          className="inline-flex shrink-0 items-center gap-2 self-start rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:from-indigo-700 hover:to-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isRegenerating ? (
            <>
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity="0.25" />
                <path d="M21 12a9 9 0 0 1-9 9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
              Regenerating…
            </>
          ) : (
            <>
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M4 12a8 8 0 0 1 14-5.3L20 9M20 4v5h-5M20 12a8 8 0 0 1-14 5.3L4 15M4 20v-5h5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Regenerate for {roadmap?.targetRole ?? 'current market'}
            </>
          )}
        </button>
      </header>

      <div className="mt-5 space-y-4">
        {steps.length > 0 ? (
          steps.map((step, index) => <RoadmapStep key={step.title} step={step} index={index} />)
        ) : (
          <p className="rounded-xl border border-dashed border-slate-200 bg-slate-50/60 p-6 text-center text-sm text-slate-500">
            No roadmap steps yet. Hit Regenerate to build one tailored to {roadmap?.targetRole ?? 'your target role'}.
          </p>
        )}
      </div>
    </Card>
  )
}
