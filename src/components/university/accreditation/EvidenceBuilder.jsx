import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AlertTriangle, ArrowRight, CheckCircle2, Clock3, Handshake, TrendingUp } from 'lucide-react'
import { STATUS_LABELS } from './accreditationData'

const EMPLOYMENT_REQUIREMENT_IDS = new Set([
  'graduate-destination',
  'employment-rate',
  'career-progression',
  'employer-satisfaction',
  'starting-salary',
  'setara-employment-rate',
  'setara-destination',
])

const EVIDENCE_REUSE_ENTRIES = [
  { label: 'SETARA evidence contribution' },
  { label: 'QS graduate outcomes evidence' },
  { label: 'MQA programme outcomes evidence' },
]

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
  requested: {
    chip: 'bg-amber-50 text-amber-700',
    icon: 'bg-amber-50 text-amber-600',
    update: 'text-amber-700',
  },
}

function StatusPill({ status, overridden }) {
  const actualStatus = overridden ? 'override' : status
  const classes =
    actualStatus === 'ready'
      ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
      : actualStatus === 'override'
        ? 'border-orange-300 bg-orange-100 text-orange-700'
        : actualStatus === 'requested'
          ? 'border-amber-200 bg-amber-50 text-amber-700'
          : actualStatus === 'missing'
            ? 'border-red-200 bg-red-50 text-red-600'
            : 'border-orange-200 bg-orange-50 text-orange-600'

  return <span className={`rounded-lg border px-4 py-1 text-xs font-semibold ${classes}`}>{STATUS_LABELS[actualStatus]}</span>
}

function UnmappedEvidence({ context, displayStatus, requestInfo, onRequestData }) {
  const statusText = STATUS_LABELS[displayStatus] ?? displayStatus
  return (
    <div className="mt-3 rounded-xl border border-[#DCE5F4] bg-white/72 p-5 shadow-sm">
      <div className="flex items-start gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-600">
          {displayStatus === 'requested' ? <Clock3 className="h-6 w-6" /> : <AlertTriangle className="h-6 w-6" />}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-[#1B2545]">Evidence not mapped yet</p>
          <p className="mt-1 text-sm font-medium text-[#64708F]">
            Current requirement status: <span className="font-bold text-[#26304D]">{statusText}</span>
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
            <div>
              <p className="font-bold uppercase tracking-wide text-[#8A96B3]">Responsible owner</p>
              <p className="mt-1 font-semibold text-[#26304D]">{requestInfo?.responsible ?? context?.responsible ?? 'Not assigned'}</p>
            </div>
            <div>
              <p className="font-bold uppercase tracking-wide text-[#8A96B3]">Due date</p>
              <p className="mt-1 font-semibold text-[#26304D]">{requestInfo?.dueDate ?? 'Not assigned'}</p>
            </div>
            <div>
              <p className="font-bold uppercase tracking-wide text-[#8A96B3]">Last available record</p>
              <p className="mt-1 font-semibold text-[#26304D]">{context?.lastRecord ?? 'Not on record'}</p>
            </div>
            <div>
              <p className="font-bold uppercase tracking-wide text-[#8A96B3]">Request status</p>
              <p className="mt-1 font-semibold text-[#26304D]">{displayStatus === 'requested' ? `Sent ${requestInfo?.sentAt ?? ''}` : 'Not requested'}</p>
            </div>
          </div>
          <p className="mt-4 text-sm font-medium leading-6 text-[#50607E]">
            {context?.whyNeeded ?? 'Map source documents or assign an owner before this evidence can be used in a draft.'}
          </p>
          {displayStatus === 'missing' ? (
            <button
              type="button"
              onClick={() => onRequestData({ label: context?.responsible ?? 'Responsible owner' })}
              className="mt-4 rounded-lg bg-[#155EE8] px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#124FC4]"
            >
              Request or assign owner
            </button>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default function EvidenceBuilder({
  requirement,
  evidence,
  frameworkProfile,
  displayStatus,
  requestInfo,
  context,
  overridden,
  canGenerateReportSection,
  reportSectionReason,
  onRequestData,
  onOverride,
  onGenerateDraft,
}) {
  const navigate = useNavigate()
  const activeStatus = overridden ? 'override' : displayStatus
  const hasMappedEvidence = !!evidence

  const handleSourceAction = (source) => {
    if (source.action === 'Request data') {
      onRequestData(source)
    } else if (source.sourcePage) {
      navigate(source.sourcePage)
    }
  }

  return (
    <section className="rounded-2xl border border-[#B9CDF7] bg-white/85 p-6 shadow-[0_18px_60px_rgba(21,94,232,0.13)] backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-[#111B3F]">Evidence: {requirement.name}</h2>
          <p className="mt-2 text-sm font-medium text-[#64708F]">
            {frameworkProfile.label} - {frameworkProfile.category} - {frameworkProfile.scope}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          {canGenerateReportSection ? (
            <button
              type="button"
              onClick={onGenerateDraft}
              className="flex items-center gap-2 rounded-lg bg-[#155EE8] px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#124FC4]"
            >
              Generate report section draft
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          ) : (
            <button
              type="button"
              disabled
              title={reportSectionReason}
              className="flex items-center gap-2 rounded-lg border border-[#CBD7EA] bg-white/80 px-4 py-2 text-xs font-bold text-[#73809E]"
            >
              Section draft unavailable
            </button>
          )}
          <StatusPill status={displayStatus} overridden={overridden} />
        </div>
      </div>

      {hasMappedEvidence ? (
        <div className="mt-3 space-y-2">
          {evidence.sources.map((source) => {
            const sourceStatus = source.status === 'missing' && activeStatus === 'requested' ? 'requested' : source.status
            const tone = statusTone[sourceStatus] || statusTone.ready
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
                  onClick={() => handleSourceAction(source)}
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
      ) : (
        <UnmappedEvidence context={context} displayStatus={displayStatus} requestInfo={requestInfo} onRequestData={onRequestData} />
      )}

      {EMPLOYMENT_REQUIREMENT_IDS.has(requirement.id) && (
        <div className="mt-3 rounded-xl border border-blue-100 bg-blue-50/60 p-3">
          <p className="text-xs font-bold text-[#415174]">Reuse verified evidence across frameworks.</p>
          <ul className="mt-2 space-y-1.5">
            {EVIDENCE_REUSE_ENTRIES.map((entry) => (
              <li key={entry.label} className="flex items-center gap-2 text-xs font-medium text-[#50607E]">
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                {entry.label}
              </li>
            ))}
          </ul>
          <p className="mt-2.5 text-[11px] font-medium text-[#8A96B3]">
            CareerOS checks the reporting period, definition and evidence coverage before reuse.
          </p>
        </div>
      )}

      <div className="mt-3 flex items-center justify-between gap-4 border-t border-[#E4EAF5] px-2 pt-3">
        {hasMappedEvidence ? (
          <p className="text-sm font-semibold text-[#283657]">
            Completeness: {evidence.completeness}% <span className="px-1 text-[#73809E]">-</span> {evidence.readySources} of {evidence.totalSources} sources ready
            {evidence.completeness === 100 && displayStatus === 'ready' ? <span className="ml-3 text-emerald-600">All evidence verified</span> : null}
          </p>
        ) : (
          <p className="text-sm font-semibold text-[#283657]">Completeness: not mapped yet</p>
        )}
        <button
          type="button"
          onClick={onOverride}
          disabled={overridden || displayStatus === 'ready'}
          className="flex items-center gap-2 rounded-lg border border-[#CBD7EA] bg-white/80 px-5 py-2 text-sm font-bold text-[#26304D] shadow-sm hover:bg-blue-50 disabled:opacity-50"
        >
          {overridden ? 'Marked ready (override)' : 'Mark as ready (override)'}
          <AlertTriangle className="h-4 w-4 text-[#53617F]" />
        </button>
      </div>
    </section>
  )
}
