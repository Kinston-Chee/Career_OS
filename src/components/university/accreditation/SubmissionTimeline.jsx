import React from 'react'
import { ArrowRight, CalendarDays } from 'lucide-react'

const toneStyles = {
  urgent: {
    border: 'border-red-200',
    icon: 'bg-red-50 text-red-500',
    due: 'text-red-500',
    bar: 'bg-red-500',
    button: 'bg-[#155EE8] text-white hover:bg-[#124FC4]',
  },
  orange: {
    border: 'border-orange-200',
    icon: 'bg-orange-50 text-orange-500',
    due: 'text-orange-500',
    bar: 'bg-orange-400',
    button: 'bg-[#155EE8] text-white hover:bg-[#124FC4]',
  },
  blue: {
    border: 'border-blue-200',
    icon: 'bg-blue-50 text-[#155EE8]',
    due: 'text-[#155EE8]',
    bar: 'bg-[#155EE8]',
    button: 'bg-[#155EE8] text-white hover:bg-[#124FC4]',
  },
  gray: {
    border: 'border-[#DCE5F4]',
    icon: 'bg-slate-100 text-slate-500',
    due: 'text-[#50607E]',
    bar: 'bg-[#50607E]',
    button: 'border border-[#CBD7EA] bg-white/70 text-[#26304D] hover:bg-blue-50',
  },
}

const readinessToneClass = {
  orange: 'text-orange-600',
  green: 'text-emerald-600',
  red: 'text-red-600',
}

export default function SubmissionTimeline({ submissions, onAction }) {
  // onAction receives the submission id so the page can route QS/MQA/AACSB differently.
  return (
    <section className="rounded-2xl border border-white/75 bg-white/80 p-5 shadow-[0_18px_55px_rgba(24,95,165,0.09)] backdrop-blur-xl">
      <h2 className="text-lg font-bold text-[#111B3F]">Submission Timeline</h2>
      <div className="mt-3 grid grid-cols-2 gap-5 xl:grid-cols-4">
        {submissions.map((submission) => {
          const tone = toneStyles[submission.tone] || toneStyles.blue
          return (
            <article key={submission.id} className={`rounded-xl border ${tone.border} bg-white/66 p-6 shadow-sm`}>
              <div className="flex items-start gap-5">
                <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${tone.icon}`}>
                  <CalendarDays className="h-7 w-7" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-[#31405F]">{submission.title}</p>
                  <p className={`mt-3 text-2xl font-bold ${tone.due}`}>{submission.due}</p>
                  {submission.readinessStatus ? (
                    <p className={`mt-1 text-xs font-semibold ${readinessToneClass[submission.readinessTone] || 'text-gray-500'}`}>
                      {submission.readinessStatus}
                    </p>
                  ) : null}
                  <div className="mt-3 flex items-center gap-3">
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#E6EBF3]">
                      <div className={`h-full rounded-full ${tone.bar}`} style={{ width: `${submission.progress}%` }} />
                    </div>
                    <span className="text-xs font-bold text-[#4A5877]">{submission.progress}%</span>
                  </div>
                  <div className="mt-2 flex items-end justify-between gap-4">
                    <p className="text-xs font-medium text-[#667394]">{submission.ready}</p>
                    <button
                      type="button"
                      onClick={() => onAction(submission.id)}
                      className={`flex min-w-[154px] items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold shadow-sm transition ${tone.button}`}
                    >
                      {submission.action}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
