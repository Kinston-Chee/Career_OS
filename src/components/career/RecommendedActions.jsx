import React from 'react'
import { useNavigate } from 'react-router-dom'

const ACTIONS = [
  {
    icon: '🏫',
    title: 'Attend Power BI Workshop',
    description: 'Closest skill gap to close. A dashboard project will make you 15% more competitive.',
    cta: 'Browse Events',
    link: '/student/opportunities',
    urgency: 'high',
  },
  {
    icon: '🎓',
    title: 'Earn SQL Certification',
    description: 'Top employers in Malaysia require SQL proficiency. Certification strengthens credibility.',
    cta: 'View Certifications',
    link: '/student/opportunities',
    urgency: 'high',
  },
  {
    icon: '🚀',
    title: 'Build Portfolio Project',
    description: 'Create an end-to-end data pipeline project. Real-world evidence beats theoretical knowledge.',
    cta: 'Project Ideas',
    link: '/student/profile',
    urgency: 'medium',
  },
  {
    icon: '💼',
    title: 'Apply for Data Analyst Roles',
    description: 'You match 92% of requirements for Data Analyst positions. Start applying now.',
    cta: 'View Jobs',
    link: '/student/opportunities',
    urgency: 'medium',
  },
  {
    icon: '🤝',
    title: 'Attend Networking Event',
    description: 'Connect with Data Analysts who made the transition. Alumni insights accelerate growth.',
    cta: 'Find Events',
    link: '/student/opportunities',
    urgency: 'low',
  },
  {
    icon: '📝',
    title: 'Practice Interview Skills',
    description: 'SQL case studies and data storytelling are the top interview topics for analyst roles.',
    cta: 'Start Prep',
    link: '/student/learning',
    urgency: 'low',
  },
]

export default function RecommendedActions() {
  const navigate = useNavigate()

  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
      <h3 className="text-base font-semibold text-slate-950">Recommended Actions</h3>
      <p className="mt-1 text-xs text-slate-500">Concrete next steps based on your career goals and skill gaps</p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {ACTIONS.map((action) => (
          <div
            key={action.title}
            className="group flex flex-col rounded-xl border border-slate-100 bg-slate-50/40 p-4 transition hover:border-violet-200 hover:bg-white hover:shadow-md"
          >
            <div className="flex items-start gap-3">
              <span className="mt-0.5 text-xl">{action.icon}</span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-slate-900">{action.title}</p>
                  {action.urgency === 'high' && (
                    <span className="shrink-0 rounded bg-rose-100 px-1.5 py-0.5 text-[9px] font-bold uppercase text-rose-700">Priority</span>
                  )}
                </div>
                <p className="mt-1 text-[11px] leading-4 text-slate-500">{action.description}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => navigate(action.link)}
              className="mt-3 w-full rounded-lg bg-violet-50 py-2 text-xs font-bold text-violet-700 transition group-hover:bg-violet-100"
            >
              {action.cta} →
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}
