import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function MarketPositionDashboard({ score, country, strongAreas, improvementAreas }) {
  const navigate = useNavigate()
  const pct = score || 72

  // Animated ring
  const circumference = 2 * Math.PI * 54
  const offset = circumference - (pct / 100) * circumference

  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        {/* Score ring */}
        <div className="flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-violet-50 via-white to-indigo-50 p-6">
          <div className="relative">
            <svg className="h-36 w-36 -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="54" fill="none" stroke="#e2e8f0" strokeWidth="8" />
              <circle
                cx="60" cy="60" r="54" fill="none"
                stroke="url(#scoreGradient)" strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                className="transition-all duration-1000"
              />
              <defs>
                <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-[#11104a]">{pct}</span>
              <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">out of 100</span>
            </div>
          </div>
          <h3 className="mt-4 text-sm font-bold text-[#11104a]">Market Position Score</h3>
          <p className="mt-1 text-center text-[11px] text-slate-500">
            Top <span className="font-bold text-violet-600">{Math.max(5, 100 - pct)}%</span> of candidates for Data Analyst in {country}
          </p>
        </div>

        {/* Breakdown */}
        <div className="space-y-5">
          {/* Strength Areas */}
          <div>
            <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-950">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-100 text-xs">✓</span>
              Skills Boosting Your Score
            </h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {(strongAreas || []).map((skill) => (
                <span key={skill} className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Missing Areas */}
          <div>
            <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-950">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-rose-100 text-xs">!</span>
              Skills Reducing Your Score
            </h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {(improvementAreas || []).map((skill) => (
                <span key={skill} className="rounded-lg bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 ring-1 ring-rose-100">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Industry Expectations */}
          <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
            <h4 className="text-xs font-bold uppercase tracking-wide text-slate-400">What peers have that you lack</h4>
            <div className="mt-2 grid gap-2 sm:grid-cols-3">
              {['Advanced SQL (Joins, CTEs)', 'Data Visualization (Tableau)', 'A/B Testing Experience'].map((item) => (
                <div key={item} className="flex items-center gap-1.5 text-xs text-slate-600">
                  <span className="h-1 w-1 rounded-full bg-amber-400" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <button
            type="button"
            onClick={() => navigate('/student/intelligence')}
            className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-violet-200 transition hover:bg-violet-700"
          >
            View Missing Skills →
          </button>
        </div>
      </div>
    </section>
  )
}
