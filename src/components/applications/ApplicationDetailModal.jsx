import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import {
  ArrowRight,
  Banknote,
  Briefcase,
  CalendarClock,
  CheckCircle2,
  ExternalLink,
  MapPin,
  Sparkles,
  Target,
  X,
} from 'lucide-react'
import { STAGE_GUIDANCE, formatDeadline, resolveStageTask } from '../../data/applicationStageGuidance'

const STAGE_BADGE = {
  'Applied': 'border-slate-200 bg-slate-100 text-slate-700',
  'Under Review': 'border-blue-200 bg-blue-100 text-blue-700',
  'Interview': 'border-violet-200 bg-violet-100 text-violet-700',
  'Assessment': 'border-amber-200 bg-amber-100 text-amber-700',
  'Offer': 'border-emerald-200 bg-emerald-100 text-emerald-700',
}

function Fact({ icon: Icon, label, value }) {
  if (!value) return null
  return (
    <div className="flex items-start gap-2 rounded-xl border border-slate-200/80 bg-white px-3 py-2.5">
      <Icon size={14} className="mt-0.5 flex-shrink-0 text-slate-400" strokeWidth={2.2} />
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">{label}</p>
        <p className="text-xs font-semibold text-slate-800">{value}</p>
      </div>
    </div>
  )
}

export default function ApplicationDetailModal({ app, onClose, onAction }) {
  useEffect(() => {
    const onKey = (event) => { if (event.key === 'Escape') onClose?.() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!app) return null

  const guidance = STAGE_GUIDANCE[app.stage] ?? STAGE_GUIDANCE.Applied
  const task = resolveStageTask(app, app.stage)
  const deadline = task ? formatDeadline(task.deadline) : null

  return createPortal(
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/25 px-4 py-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-label={`${app.jobTitle} at ${app.company}`}
        onClick={(event) => event.stopPropagation()}
        className="flex max-h-full w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_28px_80px_rgba(15,23,42,0.22)]"
      >
        {/* ── Header ─────────────────────────────────────────────── */}
        <header className="flex items-start justify-between gap-4 border-b border-slate-100 px-6 py-5">
          <div className="flex min-w-0 items-start gap-3">
            <span className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl text-lg ${app.logoBg ?? 'bg-slate-100'}`}>
              {app.logoEmoji ?? <Briefcase size={18} />}
            </span>
            <div className="min-w-0">
              <h2 className="truncate text-lg font-bold text-slate-950">{app.jobTitle}</h2>
              <p className="truncate text-sm font-medium text-slate-500">{app.company}</p>
              <div className="mt-2 flex flex-wrap items-center gap-1.5">
                <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${STAGE_BADGE[app.stage] ?? STAGE_BADGE.Applied}`}>
                  {app.stage}
                </span>
                <span className="rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700">
                  {app.matchPercent}% match
                </span>
                <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-[11px] font-bold text-slate-600">
                  Applied {app.dateApplied}
                </span>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={18} />
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
          {/* ── Job details ──────────────────────────────────────── */}
          <h3 className="text-xs font-bold uppercase tracking-wide text-slate-400">Job details</h3>
          {app.description ? (
            <p className="mt-2 text-sm leading-6 text-slate-600">{app.description}</p>
          ) : null}
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            <Fact icon={MapPin} label="Location" value={app.location} />
            <Fact icon={Briefcase} label="Type" value={app.workType} />
            <Fact icon={Banknote} label="Compensation" value={app.salary} />
          </div>
          {app.skills?.length ? (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {app.skills.map((skill) => (
                <span key={skill} className="rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-700">
                  {skill}
                </span>
              ))}
            </div>
          ) : null}

          {/* ── Stage task: link + deadline ──────────────────────── */}
          {task ? (
            <div className={`mt-5 rounded-2xl border p-4 ${deadline.overdue ? 'border-rose-200 bg-rose-50/70' : deadline.urgent ? 'border-amber-200 bg-amber-50/70' : 'border-violet-200 bg-violet-50/60'}`}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{task.kind} to complete</p>
                  <p className="mt-1 text-sm font-bold text-slate-900">{task.label}</p>
                  {task.meta ? <p className="mt-0.5 text-xs font-medium text-slate-600">{task.meta}</p> : null}
                </div>
                <a
                  href={task.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-full bg-slate-900 px-4 py-2 text-xs font-bold text-white transition hover:bg-slate-700"
                >
                  Open {task.kind.toLowerCase()} link
                  <ExternalLink size={13} strokeWidth={2.4} />
                </a>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-white/70 pt-3">
                <CalendarClock size={14} className={deadline.overdue ? 'text-rose-600' : 'text-slate-500'} strokeWidth={2.3} />
                <span className="text-xs font-semibold text-slate-700">Deadline: {deadline.label}</span>
                <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                  deadline.overdue
                    ? 'bg-rose-100 text-rose-700'
                    : deadline.urgent ? 'bg-amber-100 text-amber-800' : 'bg-white text-slate-600'
                }`}>
                  {deadline.relative}
                </span>
                <span className="ml-auto truncate text-[11px] font-medium text-slate-500">{task.url}</span>
              </div>
            </div>
          ) : null}

          {/* ── AI suggested action ──────────────────────────────── */}
          <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50/50 p-4">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white">
                <Sparkles size={14} strokeWidth={2.3} />
              </span>
              <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
                AI suggested action · {app.stage}
              </p>
            </div>
            <p className="mt-2.5 text-sm font-medium leading-6 text-slate-700">{guidance.read}</p>
            <ul className="mt-3 space-y-2">
              {guidance.actions.map((action) => (
                <li key={action} className="flex items-start gap-2 rounded-xl border border-white bg-white px-3 py-2.5">
                  <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0 text-blue-600" strokeWidth={2.3} />
                  <span className="text-xs font-semibold leading-5 text-slate-700">{action}</span>
                </li>
              ))}
            </ul>
            {guidance.cta ? (
              <button
                type="button"
                onClick={() => onAction?.(guidance.cta)}
                className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-blue-700"
              >
                {guidance.cta.label}
                <ArrowRight size={13} strokeWidth={2.5} />
              </button>
            ) : null}
          </div>

          {/* ── Stage history ────────────────────────────────────── */}
          <h3 className="mt-5 text-xs font-bold uppercase tracking-wide text-slate-400">Progress</h3>
          <ol className="mt-2 space-y-2">
            {app.statusHistory?.map((entry, index) => (
              <li key={`${entry.stage}-${entry.date}-${index}`} className="flex items-center gap-2.5 rounded-xl border border-slate-200/80 bg-white px-3 py-2">
                <Target size={13} className="flex-shrink-0 text-slate-400" strokeWidth={2.3} />
                <span className="text-xs font-semibold text-slate-800">{entry.stage}</span>
                <span className="ml-auto text-[11px] font-medium text-slate-400">{entry.date}</span>
              </li>
            ))}
          </ol>
        </div>

        <footer className="flex justify-end border-t border-slate-100 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
          >
            Close
          </button>
        </footer>
      </section>
    </div>,
    document.body,
  )
}
