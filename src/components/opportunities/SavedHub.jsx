import React from 'react'
import { Bookmark, Briefcase, CalendarDays, Heart } from 'lucide-react'
import { useCareerStore } from '../../store/useCareerStore'

export default function SavedHub() {
  const savedJobs = useCareerStore((state) => state.savedJobs)
  const savedEvents = useCareerStore((state) => state.savedEvents)
  const toggleSaveJob = useCareerStore((state) => state.toggleSaveJob)
  const toggleSaveEvent = useCareerStore((state) => state.toggleSaveEvent)

  const hasItems = savedJobs.length > 0 || savedEvents.length > 0

  if (!hasItems) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 py-16 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-100 bg-violet-50 text-violet-600">
          <Bookmark size={26} strokeWidth={2} />
        </div>
        <h3 className="mt-4 text-lg font-semibold text-slate-900">No saved items yet</h3>
        <p className="mt-1 text-sm text-slate-500">Bookmark jobs and events to find them here</p>
        <div className="mt-5 flex gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-violet-50 px-3 py-2 text-xs font-semibold text-violet-700">
            <Briefcase size={14} strokeWidth={2} />
            Browse Jobs
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-violet-50 px-3 py-2 text-xs font-semibold text-violet-700">
            <CalendarDays size={14} strokeWidth={2} />
            Browse Events
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {savedJobs.length > 0 && (
        <section>
          <h3 className="flex items-center gap-2 text-base font-semibold text-slate-950">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-blue-100 bg-blue-50 text-blue-600">
              <Briefcase size={15} strokeWidth={2} />
            </span>
            Saved Jobs
            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-700">{savedJobs.length}</span>
          </h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {savedJobs.map((job) => (
              <div key={job.id} className="group rounded-xl border border-slate-200/80 bg-white p-4 transition hover:border-violet-200 hover:shadow-md">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-900">{job.title || job.jobTitle}</p>
                    <p className="mt-0.5 text-xs text-slate-500">{job.company}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleSaveJob(job)}
                    className="shrink-0 rounded-full p-1 text-rose-500 transition hover:bg-rose-50"
                    title="Unsave"
                  >
                    <Heart className="h-4 w-4" fill="currentColor" strokeWidth={2} />
                  </button>
                </div>
                {job.matchPercent && (
                  <div className="mt-2 flex items-center gap-2">
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">{job.matchPercent}% match</span>
                    {job.location && <span className="text-[10px] text-slate-400">{job.location}</span>}
                  </div>
                )}
                {job.savedAt && (
                  <p className="mt-2 text-[10px] text-slate-400">Saved {new Date(job.savedAt).toLocaleDateString()}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {savedEvents.length > 0 && (
        <section>
          <h3 className="flex items-center gap-2 text-base font-semibold text-slate-950">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-amber-100 bg-amber-50 text-amber-600">
              <CalendarDays size={15} strokeWidth={2} />
            </span>
            Saved Events
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700">{savedEvents.length}</span>
          </h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {savedEvents.map((event) => (
              <div key={event.id} className="group rounded-xl border border-slate-200/80 bg-white p-4 transition hover:border-violet-200 hover:shadow-md">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-900">{event.title}</p>
                    <p className="mt-0.5 text-xs text-slate-500">{event.org}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleSaveEvent(event)}
                    className="shrink-0 rounded-full p-1 text-rose-500 transition hover:bg-rose-50"
                    title="Unsave"
                  >
                    <Heart className="h-4 w-4" fill="currentColor" strokeWidth={2} />
                  </button>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  {event.matchPercent && (
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">{event.matchPercent}% match</span>
                  )}
                  {event.date && <span className="text-[10px] text-slate-400">{event.date}</span>}
                </div>
                {event.savedAt && (
                  <p className="mt-2 text-[10px] text-slate-400">Saved {new Date(event.savedAt).toLocaleDateString()}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
