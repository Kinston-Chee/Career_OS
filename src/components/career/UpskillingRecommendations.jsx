import React from 'react'
import { Building2, CalendarCheck, GraduationCap, Sigma } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const RECOMMENDATIONS = [
  { type: 'Workshop', title: 'Power BI Dashboard Masterclass', provider: 'Microsoft Learn', skill: 'Power BI', icon: Building2, tone: 'border-blue-100 bg-blue-50 text-blue-600', match: 94 },
  { type: 'Certification', title: 'Google Data Analytics Certificate', provider: 'Coursera', skill: 'Data Analysis', icon: GraduationCap, tone: 'border-emerald-100 bg-emerald-50 text-emerald-600', match: 91 },
  { type: 'Workshop', title: 'Advanced SQL for Analytics', provider: 'DataCamp', skill: 'SQL', icon: Building2, tone: 'border-blue-100 bg-blue-50 text-blue-600', match: 89 },
  { type: 'Certification', title: 'Tableau Desktop Specialist', provider: 'Salesforce', skill: 'Tableau', icon: GraduationCap, tone: 'border-emerald-100 bg-emerald-50 text-emerald-600', match: 85 },
  { type: 'Event', title: 'Data Science Meetup KL', provider: 'Community', skill: 'Networking', icon: CalendarCheck, tone: 'border-violet-100 bg-violet-50 text-violet-600', match: 78 },
  { type: 'Workshop', title: 'Statistics for Data Science', provider: 'Khan Academy', skill: 'Statistics', icon: Sigma, tone: 'border-orange-100 bg-orange-50 text-orange-600', match: 82 },
]

export default function UpskillingRecommendations() {
  const navigate = useNavigate()

  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
      <h3 className="text-base font-semibold text-slate-950">Upskilling Recommendations</h3>
      <p className="mt-1 text-xs text-slate-500">Workshops, certifications, and events to close your skill gaps</p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {RECOMMENDATIONS.map((rec) => {
          const Icon = rec.icon

          return (
            <div key={rec.title} className="group rounded-xl border border-slate-100 bg-slate-50/40 p-4 transition hover:border-violet-200 hover:bg-white hover:shadow-md">
              <div className="flex items-center gap-2">
                <span className={`flex h-9 w-9 items-center justify-center rounded-xl border ${rec.tone}`}>
                  <Icon size={17} strokeWidth={2} />
                </span>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500">{rec.type}</span>
                <span className="ml-auto rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600">{rec.match}% match</span>
              </div>
              <p className="mt-2.5 text-sm font-semibold text-slate-900">{rec.title}</p>
              <p className="mt-1 text-[11px] text-slate-500">{rec.provider} - Strengthens {rec.skill}</p>
              <button
                type="button"
                onClick={() => navigate('/student/opportunities')}
                className="mt-3 w-full rounded-lg bg-violet-50 py-2 text-xs font-bold text-violet-700 transition group-hover:bg-violet-100"
              >
                View in Opportunities
              </button>
            </div>
          )
        })}
      </div>
    </section>
  )
}
