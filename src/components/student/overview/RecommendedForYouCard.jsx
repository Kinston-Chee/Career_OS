import React from 'react'
import { BookOpen, Briefcase, CalendarCheck, FileText, GraduationCap, Sparkles, Target } from 'lucide-react'

const typeIconConfig = {
  Paper: { icon: FileText, tone: 'border-blue-100 bg-blue-50 text-blue-600' },
  Course: { icon: BookOpen, tone: 'border-emerald-100 bg-emerald-50 text-emerald-600' },
  Event: { icon: CalendarCheck, tone: 'border-amber-100 bg-amber-50 text-amber-600' },
  Workshop: { icon: Target, tone: 'border-teal-100 bg-teal-50 text-teal-600' },
  Certification: { icon: GraduationCap, tone: 'border-sky-100 bg-sky-50 text-sky-600' },
  Internship: { icon: Briefcase, tone: 'border-violet-100 bg-violet-50 text-violet-600' },
}

const typeBadgeColors = {
  Paper: 'bg-blue-50 text-blue-700 ring-blue-100',
  Course: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
  Event: 'bg-amber-50 text-amber-700 ring-amber-100',
  Workshop: 'bg-teal-50 text-teal-700 ring-teal-100',
  Certification: 'bg-sky-50 text-sky-700 ring-sky-100',
  Internship: 'bg-violet-50 text-violet-700 ring-violet-100',
}

export default function RecommendedForYouCard({ recommendations }) {
  return (
    <section className="rounded-3xl border border-violet-100/80 bg-white/90 p-5 shadow-[0_18px_44px_rgba(88,63,188,0.08)]">
      <div className="flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-100 bg-violet-50 text-violet-600 shadow-sm">
          <Sparkles size={17} strokeWidth={2} />
        </div>
        <h2 className="text-base font-bold text-[#11104a]">Recommended for You</h2>
      </div>
      <div className="mt-4 space-y-3">
        {recommendations.map((item) => {
          const iconConfig = typeIconConfig[item.type] ?? typeIconConfig.Event
          const Icon = iconConfig.icon
          const badgeColor = typeBadgeColors[item.type] ?? 'bg-violet-50 text-violet-700 ring-violet-100'

          return (
            <article
              key={item.title}
              className="group rounded-2xl border border-violet-50 bg-white p-3.5 transition-all duration-200 hover:border-violet-100 hover:shadow-md hover:shadow-violet-50"
            >
              <div className="flex gap-3">
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-transform duration-200 group-hover:scale-105 ${iconConfig.tone}`}>
                  <Icon size={18} strokeWidth={2} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`rounded-lg px-2 py-1 text-[11px] font-bold ring-1 ${badgeColor}`}>
                      {item.type}
                    </span>
                    <span className="text-[11px] font-medium text-slate-400">{item.time}</span>
                  </div>
                  <h3 className="mt-1.5 text-xs font-bold leading-5 text-[#11104a]">{item.title}</h3>
                  <p className="mt-1 text-xs leading-5 text-slate-500">{item.description}</p>
                  <button
                    type="button"
                    className="mt-2 rounded-lg border border-violet-100 px-2.5 py-1 text-[11px] font-bold text-violet-700 transition-all hover:bg-violet-50"
                  >
                    Save
                  </button>
                </div>
              </div>
            </article>
          )
        })}
      </div>
      <button type="button" className="mt-4 text-sm font-semibold text-violet-700 transition-colors hover:text-violet-900">
        View all recommendations
      </button>
    </section>
  )
}
