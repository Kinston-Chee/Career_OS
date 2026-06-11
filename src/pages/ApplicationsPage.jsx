import React, { useMemo, useState } from 'react'
import { useCareerStore } from '../store/useCareerStore'

const STAGES = ['Applied', 'Under Review', 'Interview', 'Assessment', 'Offer']
const STAGE_COLORS = {
  'Applied': { bg: 'bg-slate-50', border: 'border-slate-200', dot: 'bg-slate-400', header: 'bg-slate-100 text-slate-700' },
  'Under Review': { bg: 'bg-blue-50', border: 'border-blue-200', dot: 'bg-blue-500', header: 'bg-blue-100 text-blue-700' },
  'Interview': { bg: 'bg-violet-50', border: 'border-violet-200', dot: 'bg-violet-500', header: 'bg-violet-100 text-violet-700' },
  'Assessment': { bg: 'bg-amber-50', border: 'border-amber-200', dot: 'bg-amber-500', header: 'bg-amber-100 text-amber-700' },
  'Offer': { bg: 'bg-emerald-50', border: 'border-emerald-200', dot: 'bg-emerald-500', header: 'bg-emerald-100 text-emerald-700' },
}

function StageDropdown({ currentStage, onMove }) {
  const [open, setOpen] = useState(false)
  const otherStages = STAGES.filter((s) => s !== currentStage)

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-violet-300 hover:text-violet-700"
      >
        Move →
      </button>
      {open && (
        <div className="absolute right-0 z-10 mt-1 w-36 rounded-xl border border-slate-100 bg-white py-1 shadow-lg">
          {otherStages.map((stage) => (
            <button
              key={stage}
              type="button"
              onClick={() => { onMove(stage); setOpen(false) }}
              className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs text-slate-700 transition hover:bg-violet-50"
            >
              <span className={`h-1.5 w-1.5 rounded-full ${STAGE_COLORS[stage].dot}`} />
              {stage}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function ApplicationCard({ app, onMoveStage }) {
  const daysInStage = useMemo(() => {
    const last = app.statusHistory[app.statusHistory.length - 1]
    if (!last) return 0
    const diff = Date.now() - new Date(last.date).getTime()
    return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)))
  }, [app])

  return (
    <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 shadow-[0_4px_12px_rgba(0,0,0,0.04)] transition hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm ${app.logoBg}`}>
            {app.logoEmoji}
          </span>
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-slate-900">{app.jobTitle}</p>
            <p className="truncate text-[10px] text-slate-500">{app.company}</p>
          </div>
        </div>
        <StageDropdown currentStage={app.stage} onMove={(s) => onMoveStage(app.id, s)} />
      </div>
      <div className="mt-2.5 flex items-center gap-2">
        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">{app.matchPercent}%</span>
        <span className="text-[10px] text-slate-400">{daysInStage}d in stage</span>
        <span className="ml-auto text-[10px] text-slate-400">{app.dateApplied}</span>
      </div>
    </div>
  )
}

function ApplicationTimeline({ applications }) {
  const allEvents = useMemo(() => {
    const events = []
    applications.forEach((app) => {
      app.statusHistory.forEach((entry) => {
        events.push({
          date: entry.date,
          stage: entry.stage,
          jobTitle: app.jobTitle,
          company: app.company,
          logoEmoji: app.logoEmoji,
        })
      })
    })
    return events.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10)
  }, [applications])

  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-5">
      <h3 className="text-base font-semibold text-slate-950">Activity Timeline</h3>
      <div className="mt-4 space-y-3">
        {allEvents.map((event, i) => (
          <div key={`${event.date}-${event.jobTitle}-${event.stage}-${i}`} className="flex items-start gap-3">
            <div className="relative mt-1">
              <span className={`block h-2.5 w-2.5 rounded-full ${STAGE_COLORS[event.stage]?.dot || 'bg-slate-300'}`} />
              {i < allEvents.length - 1 && <span className="absolute left-1 top-3 h-8 w-px bg-slate-200" />}
            </div>
            <div>
              <p className="text-xs font-medium text-slate-700">
                <span className="font-semibold">{event.stage}</span> — {event.jobTitle} at {event.company}
              </p>
              <p className="text-[10px] text-slate-400">{event.date}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function ApplicationInsights({ applications }) {
  const totalApps = applications.length
  const stageCount = (stage) => applications.filter((a) => a.stage === stage).length
  const interviewRate = totalApps > 0 ? Math.round((stageCount('Interview') / totalApps) * 100) : 0
  const responseRate = totalApps > 0 ? Math.round(((totalApps - stageCount('Applied')) / totalApps) * 100) : 0
  const avgMatch = totalApps > 0 ? Math.round(applications.reduce((s, a) => s + a.matchPercent, 0) / totalApps) : 0

  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-5">
      <h3 className="text-base font-semibold text-slate-950">Application Insights</h3>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Total Applications', value: totalApps, icon: '📋', color: 'violet' },
          { label: 'Interview Rate', value: `${interviewRate}%`, icon: '🎤', color: 'blue' },
          { label: 'Response Rate', value: `${responseRate}%`, icon: '📬', color: 'emerald' },
          { label: 'Avg. Match', value: `${avgMatch}%`, icon: '🎯', color: 'amber' },
        ].map((stat) => (
          <div key={stat.label} className={`rounded-xl border border-${stat.color}-100 bg-${stat.color}-50/30 p-3.5`}>
            <div className="flex items-center gap-2">
              <span className="text-lg">{stat.icon}</span>
              <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">{stat.label}</span>
            </div>
            <p className="mt-1 text-2xl font-bold text-[#11104a]">{stat.value}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default function ApplicationsPage() {
  const applications = useCareerStore((state) => state.applications)
  const moveApplicationStage = useCareerStore((state) => state.moveApplicationStage)

  const grouped = useMemo(() => {
    const result = {}
    STAGES.forEach((s) => { result[s] = [] })
    applications.forEach((app) => {
      if (result[app.stage]) result[app.stage].push(app)
      else result.Applied.push(app)
    })
    return result
  }, [applications])

  return (
    <div className="min-h-full bg-[radial-gradient(circle_at_top_right,#f2ecff,transparent_26%),linear-gradient(135deg,#ffffff_0%,#fbfaff_46%,#f7f4ff_100%)] pb-2 text-[#11104a]">
      <div className="space-y-6">
        <header>
          <p className="text-xs font-semibold uppercase tracking-wide text-violet-700">Student Workspace</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight">Applications</h1>
          <p className="mt-2 text-sm font-medium text-slate-500">
            Track and manage your job applications across every stage.
          </p>
        </header>

        {/* Insights */}
        <ApplicationInsights applications={applications} />

        {/* Kanban Pipeline */}
        <section>
          <h3 className="mb-4 text-base font-semibold text-slate-950">Application Pipeline</h3>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {STAGES.map((stage) => {
              const colors = STAGE_COLORS[stage]
              const apps = grouped[stage] || []
              return (
                <div key={stage} className="w-64 shrink-0 rounded-2xl border border-slate-200/80 bg-slate-50/40">
                  <div className={`flex items-center justify-between rounded-t-2xl px-4 py-3 ${colors.header}`}>
                    <div className="flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${colors.dot}`} />
                      <span className="text-xs font-bold">{stage}</span>
                    </div>
                    <span className="rounded-full bg-white/60 px-2 py-0.5 text-[10px] font-bold">{apps.length}</span>
                  </div>
                  <div className="space-y-2.5 p-3">
                    {apps.length > 0 ? (
                      apps.map((app) => (
                        <ApplicationCard
                          key={app.id}
                          app={app}
                          onMoveStage={moveApplicationStage}
                        />
                      ))
                    ) : (
                      <div className="rounded-xl border border-dashed border-slate-200 bg-white/60 p-4 text-center text-[11px] text-slate-400">
                        No applications
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Timeline */}
        <ApplicationTimeline applications={applications} />
      </div>
    </div>
  )
}
