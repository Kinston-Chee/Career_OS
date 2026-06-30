import React from 'react'
import { AlertTriangle, ArrowRight, CheckCircle2, Handshake, TrendingUp } from 'lucide-react'

const icons = {
  trend: TrendingUp,
  handshake: Handshake,
  warning: AlertTriangle,
  check: CheckCircle2,
}

const statusTone = {
  ready: {
    chip: 'bg-blue-50 text-[#155EE8]',
    icon: 'bg-blue-50 text-[#155EE8]',
    update: 'text-emerald-600',
  },
  missing: {
    chip: 'bg-orange-50 text-orange-600',
    icon: 'bg-orange-50 text-orange-500',
    update: 'text-red-500',
  },
}

function fallbackEvidence(requirement) {
  return {
    status: 'ready',
    requiredBy: 'QS World Rankings, MQA Self-Review',
    completeness: 100,
    readySources: 3,
    totalSources: 3,
    sources: [
      {
        id: `${requirement.id}-primary`,
        label: 'From: Alumni Signal Intelligence',
        title: `${requirement.name} source data verified and mapped to accreditation evidence`,
        updated: 'Last updated: 2 days ago',
        status: 'ready',
        action: 'View source',
        icon: 'check',
      },
      {
        id: `${requirement.id}-market`,
        label: 'From: Curriculum-Market Alignment',
        title: 'Supporting program and market validation evidence is complete',
        updated: 'Last updated: 4 days ago',
        status: 'ready',
        action: 'View source',
        icon: 'trend',
      },
      {
        id: `${requirement.id}-partner`,
        label: 'From: Collaboration Marketplace',
        title: 'Employer and partner evidence has been checked for submission use',
        updated: 'Last updated: 5 days ago',
        status: 'ready',
        action: 'View source',
        icon: 'handshake',
      },
    ],
  }
}

function StatusPill({ status }) {
  const label = status === 'missing' ? 'Missing' : status === 'ready' ? 'Ready' : 'In progress'
  const classes =
    status === 'ready'
      ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
      : status === 'missing'
        ? 'border-red-200 bg-red-50 text-red-600'
        : 'border-orange-200 bg-orange-50 text-orange-600'

  return <span className={`rounded-lg border px-4 py-1 text-xs font-semibold ${classes}`}>{label}</span>
}

export default function EvidenceBuilder({ requirement, evidence, onSourceAction, onOverride }) {
  const activeEvidence = evidence || fallbackEvidence(requirement)

  return (
    <section className="rounded-2xl border border-[#B9CDF7] bg-white/85 p-6 shadow-[0_18px_60px_rgba(21,94,232,0.13)] backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-[#111B3F]">Evidence: {requirement.name}</h2>
          <p className="mt-2 text-sm font-medium text-[#64708F]">Required by: {activeEvidence.requiredBy}</p>
        </div>
        <StatusPill status={activeEvidence.status} />
      </div>

      <div className="mt-3 space-y-2">
        {activeEvidence.sources.map((source) => {
          const tone = statusTone[source.status] || statusTone.ready
          const Icon = icons[source.icon] || CheckCircle2
          const isRequest = source.action === 'Request data'

          return (
            <article key={source.id} className="flex items-center gap-4 rounded-xl border border-[#DCE5F4] bg-white/72 p-4 shadow-sm">
              <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${tone.icon}`}>
                <Icon className="h-7 w-7" />
              </span>
              <div className="min-w-0 flex-1">
                <span className={`inline-flex rounded-md px-2 py-1 text-xs font-bold ${tone.chip}`}>{source.label}</span>
                <p className="mt-2 text-sm font-semibold text-[#1B2545]">{source.title}</p>
                <p className={`mt-1 text-sm font-semibold ${tone.update}`}>{source.updated}</p>
              </div>
              <button
                type="button"
                onClick={() => onSourceAction(isRequest ? 'Request data' : 'Opening source data...')}
                className={`flex shrink-0 items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition ${
                  isRequest ? 'border border-orange-200 bg-orange-50 text-orange-600 hover:bg-orange-100' : 'text-[#155EE8] hover:bg-blue-50'
                }`}
              >
                {source.action}
                <ArrowRight className="h-4 w-4" />
              </button>
            </article>
          )
        })}
      </div>

      <div className="mt-3 flex items-center justify-between gap-4 border-t border-[#E4EAF5] px-2 pt-3">
        <p className="text-sm font-semibold text-[#283657]">
          Completeness: {activeEvidence.completeness}% <span className="px-1 text-[#73809E]">-</span> {activeEvidence.readySources} of {activeEvidence.totalSources} sources ready
          {activeEvidence.completeness === 100 ? <span className="ml-3 text-emerald-600">All evidence verified</span> : null}
        </p>
        <button
          type="button"
          onClick={onOverride}
          className="flex items-center gap-2 rounded-lg border border-[#CBD7EA] bg-white/80 px-5 py-2 text-sm font-bold text-[#26304D] shadow-sm hover:bg-blue-50"
        >
          Mark as ready (override)
          <AlertTriangle className="h-4 w-4 text-[#53617F]" />
        </button>
      </div>
    </section>
  )
}
