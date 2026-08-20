import React, { useEffect, useState } from 'react'
import {
  Award,
  Calendar,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  CircleDashed,
  Clock,
  Loader2,
  ThumbsDown,
  ThumbsUp,
  Users,
  Video,
  X,
} from 'lucide-react'

const STATUS_META = {
  passed:        { Icon: CheckCircle2, label: 'Passed',        pill: 'bg-emerald-50 text-emerald-700 border-emerald-100', dot: 'bg-emerald-500' },
  'in-progress': { Icon: Loader2,      label: 'In progress',   pill: 'bg-blue-50 text-[#185FA5] border-blue-100',        dot: 'bg-[#185FA5]' },
  scheduled:    { Icon: Calendar,      label: 'Scheduled',     pill: 'bg-purple-50 text-purple-700 border-purple-100',    dot: 'bg-purple-500' },
  pending:      { Icon: CircleDashed,  label: 'Pending',       pill: 'bg-gray-100 text-gray-500 border-gray-200',         dot: 'bg-gray-300' },
  failed:       { Icon: X,             label: 'Did not pass',  pill: 'bg-red-50 text-red-700 border-red-100',              dot: 'bg-red-500' },
}

function scoreColor(pct) {
  if (pct >= 85) return { bar: '#10B981', text: 'text-emerald-600' }
  if (pct >= 70) return { bar: '#185FA5', text: 'text-[#185FA5]' }
  return { bar: '#F59E0B', text: 'text-amber-600' }
}

function RoundRow({ round, index, total, expanded, onToggle }) {
  const meta = STATUS_META[round.status] || STATUS_META.pending
  const StatusIcon = meta.Icon
  const canExpand = round.status !== 'pending'

  return (
    <div className="relative flex gap-4">
      {/* Timeline rail */}
      <div className="flex flex-col items-center">
        <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white ${meta.dot}`}>
          {round.status === 'in-progress' ? (
            <StatusIcon className="h-4 w-4 animate-spin" />
          ) : (
            <StatusIcon className="h-4 w-4" />
          )}
        </span>
        {index < total - 1 ? (
          <span className={`mt-1 w-px flex-1 ${round.status === 'passed' ? 'bg-emerald-200' : 'bg-gray-200'}`} />
        ) : null}
      </div>

      {/* Card */}
      <div className={`mb-3 flex-1 rounded-xl border bg-white/85 p-4 ${expanded ? 'border-[#185FA5] shadow-[0_4px_16px_rgba(24,95,165,.10)]' : 'border-blue-100/70'}`}>
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <p className="text-[14px] font-bold text-gray-900">{round.name}</p>
              <span className={`rounded-full border px-2 py-0.5 text-[10.5px] font-semibold ${meta.pill}`}>{meta.label}</span>
            </div>
            <p className="mt-0.5 text-[12px] text-gray-500">
              <span className="inline-flex items-center gap-1">
                <Users className="h-3 w-3" /> {round.interviewer}
              </span>
              <span className="mx-1.5 text-gray-300">·</span>
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-3 w-3" /> {round.date}
              </span>
              {round.duration ? (
                <>
                  <span className="mx-1.5 text-gray-300">·</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {round.duration}
                  </span>
                </>
              ) : null}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {typeof round.score === 'number' ? (
              <span className={`text-[18px] font-extrabold leading-none ${scoreColor(round.score).text}`}>{round.score}</span>
            ) : null}
            {canExpand ? (
              <button
                type="button"
                onClick={onToggle}
                aria-label={expanded ? 'Collapse round' : 'Expand round'}
                className="rounded-full p-1 text-gray-400 transition hover:bg-blue-50 hover:text-[#185FA5]"
              >
                {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
            ) : null}
          </div>
        </div>

        {round.summary ? <p className="mt-2 text-[12.5px] leading-5 text-gray-700">{round.summary}</p> : null}

        {expanded && canExpand ? (
          <div className="mt-3 border-t border-blue-100/60 pt-3">
            {round.scores?.length ? (
              <div className="mb-3 space-y-2">
                {round.scores.map((s) => {
                  const c = scoreColor(s.pct)
                  return (
                    <div key={s.label} className="flex items-center gap-2 text-[12px]">
                      <span className="w-32 shrink-0 text-gray-500">{s.label}</span>
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-100">
                        <div className="h-full rounded-full" style={{ width: `${s.pct}%`, background: c.bar }} />
                      </div>
                      <span className={`w-9 shrink-0 text-right text-[11.5px] font-semibold ${c.text}`}>{s.pct}%</span>
                    </div>
                  )
                })}
              </div>
            ) : null}

            {(round.strengths?.length || round.concerns?.length) ? (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {round.strengths?.length ? (
                  <div>
                    <p className="mb-1.5 flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide text-emerald-700">
                      <ThumbsUp className="h-3 w-3" /> Strengths
                    </p>
                    <ul className="space-y-1 text-[12px] text-gray-700">
                      {round.strengths.map((s, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <Check className="mt-0.5 h-3 w-3 shrink-0 text-emerald-500" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {round.concerns?.length ? (
                  <div>
                    <p className="mb-1.5 flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide text-amber-700">
                      <ThumbsDown className="h-3 w-3" /> Concerns
                    </p>
                    <ul className="space-y-1 text-[12px] text-gray-700">
                      {round.concerns.map((c, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  )
}

const ACTIVE_STATUSES = new Set(['in-progress', 'scheduled'])

export default function InterviewProgressSection({ candidate, progress, onAdvance, onScheduleNext }) {
  // Rounds live in local state so "Mark round done" advances the timeline by
  // exactly one round. Previously the timeline was derived from the pipeline
  // stage, which skipped two rounds per click.
  const [rounds, setRounds] = useState(progress.rounds)

  useEffect(() => { setRounds(progress.rounds) }, [progress.rounds])

  // Auto-expand the current (in-progress / scheduled) round on first render.
  const initialOpen = progress.rounds.find((r) => ACTIVE_STATUSES.has(r.status))?.id
  const [expanded, setExpanded] = useState(initialOpen ? { [initialOpen]: true } : {})
  const toggle = (id) => setExpanded((prev) => ({ ...prev, [id]: !prev[id] }))

  const totalRounds = rounds.length
  const passedCount = rounds.filter((r) => r.status === 'passed').length
  const progressPct = Math.round((passedCount / Math.max(1, totalRounds)) * 100)
  const overallColor = scoreColor(progress.overallScore || 0)

  const currentIndex = rounds.findIndex((r) => ACTIVE_STATUSES.has(r.status))
  const currentRound = currentIndex >= 0 ? rounds[currentIndex] : null
  const allDone = currentIndex === -1

  // One click = one round: the current round passes and the round straight
  // after it becomes the new current round.
  const markRoundDone = () => {
    if (!currentRound) return
    setRounds((prev) => prev.map((round, index) => {
      if (index === currentIndex) {
        return { ...round, status: 'passed', summary: round.summary || 'Marked done by the hiring team.' }
      }
      if (index === currentIndex + 1 && round.status === 'pending') {
        return { ...round, status: 'in-progress', summary: round.summary || 'Currently at this stage.' }
      }
      return round
    }))
    const next = rounds[currentIndex + 1]
    setExpanded((prev) => (next ? { ...prev, [next.id]: true } : prev))
    onAdvance?.(currentRound, next || null)
  }

  return (
    <section className="employer-glass-card p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-2">
          <Award className="mt-0.5 h-4 w-4 text-[#185FA5]" />
          <div>
            <h2 className="text-sm font-bold text-gray-900">Interview Progress</h2>
            <p className="mt-0.5 text-xs text-gray-500">
              {candidate.name.split(' ')[0]} applied for {candidate.targetRole} · currently at <span className="font-semibold text-[#185FA5]">{currentRound ? currentRound.name : 'all rounds complete'}</span>
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">Overall performance</p>
          <p className={`text-3xl font-extrabold leading-none ${overallColor.text}`}>{progress.overallScore}<span className="text-lg text-gray-400">/100</span></p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-[11px] text-gray-500">
          <span>{passedCount} of {totalRounds} rounds passed</span>
          <span className="font-semibold">{progressPct}%</span>
        </div>
        <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-blue-100/70">
          <div className="h-full rounded-full bg-gradient-to-r from-[#185FA5] to-emerald-500" style={{ width: `${progressPct}%` }} />
        </div>
      </div>

      {/* Current round callout - driven by local round state */}
      {allDone ? (
        <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-emerald-100 bg-emerald-50/60 px-4 py-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-emerald-600 ring-1 ring-emerald-100">
            <CheckCircle2 className="h-4 w-4" />
          </span>
          <div>
            <p className="text-[13px] font-semibold text-gray-900">All interview rounds complete</p>
            <p className="text-[11.5px] text-gray-500">Nothing left to mark done - move the pipeline stage when you are ready.</p>
          </div>
        </div>
      ) : (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-blue-100 bg-blue-50/60 px-4 py-3">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#185FA5] ring-1 ring-blue-100">
              <Video className="h-4 w-4" />
            </span>
            <div>
              <p className="text-[13px] font-semibold text-gray-900">Current: {currentRound.name}</p>
              <p className="text-[11.5px] text-gray-500">
                {currentRound.date}
                {currentRound.interviewer ? ` · ${currentRound.interviewer}` : ''}
                {rounds[currentIndex + 1] ? ` · next up: ${rounds[currentIndex + 1].name}` : ' · final round'}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            {onScheduleNext ? (
              <button
                type="button"
                onClick={() => onScheduleNext(currentRound)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-blue-100 bg-white px-3 py-1.5 text-[12.5px] font-semibold text-[#185FA5] transition hover:bg-blue-50"
              >
                <Calendar className="h-3.5 w-3.5" /> Reschedule
              </button>
            ) : null}
            <button
              type="button"
              onClick={markRoundDone}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#185FA5] px-3 py-1.5 text-[12.5px] font-semibold text-white transition hover:bg-[#134c87]"
            >
              <Check className="h-3.5 w-3.5" /> Mark round done
            </button>
          </div>
        </div>
      )}

      {/* Timeline */}
      <div className="mt-5">
        {rounds.map((round, i) => (
          <RoundRow
            key={round.id}
            round={round}
            index={i}
            total={rounds.length}
            expanded={!!expanded[round.id]}
            onToggle={() => toggle(round.id)}
          />
        ))}
      </div>
    </section>
  )
}
