import React from 'react'

export default function CareerReadinessCard({ data }) {
  const { readiness, keyStrengths, skillsInDemand } = data.careerSnapshot
  const { careerFocus, targetRole } = data.profile

  // SVG ring calculation
  const radius = 42
  const circumference = 2 * Math.PI * radius
  const progress = (readiness / 100) * circumference
  const dashOffset = circumference - progress

  return (
    <section className="rounded-3xl border border-violet-100/80 bg-white/90 p-6 shadow-[0_18px_44px_rgba(88,63,188,0.08)]">
      {/* Header row: career focus + target role */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-[#11104a]">Career Readiness</h2>
          <p className="mt-1 text-xs font-medium text-slate-500">
            Tailored to your career focus and target role
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-xl bg-violet-50 px-3 py-1.5 text-xs font-bold text-violet-700">{careerFocus}</span>
          <span className="rounded-xl bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-700">{targetRole}</span>
        </div>
      </div>

      {/* Main content: gauge + strengths + in-demand */}
      <div className="mt-6 grid gap-6 sm:grid-cols-[auto_1fr_1fr]">
        {/* Readiness Gauge */}
        <div className="flex flex-col items-center justify-center">
          <div className="relative h-28 w-28">
            <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
              <circle
                cx="50" cy="50" r={radius}
                fill="none"
                stroke="#f0ecff"
                strokeWidth="8"
              />
              <circle
                cx="50" cy="50" r={radius}
                fill="none"
                stroke="url(#readinessGradient)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                className="transition-all duration-1000 ease-out"
              />
              <defs>
                <linearGradient id="readinessGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-[#11104a]">{readiness}%</span>
              <span className="text-[10px] font-semibold text-slate-400">Readiness</span>
            </div>
          </div>
          <p className="mt-2 text-xs font-semibold text-violet-700">
            {readiness >= 80 ? 'Strong' : readiness >= 60 ? 'Good progress' : 'Building up'}
          </p>
        </div>

        {/* Key Strengths */}
        <div className="rounded-2xl border border-emerald-100/60 bg-emerald-50/30 p-4">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-xs">💪</span>
            <h3 className="text-xs font-bold uppercase tracking-wide text-emerald-700">Key Strengths</h3>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {keyStrengths.map((skill) => (
              <span
                key={skill}
                className="rounded-lg bg-emerald-50 px-2.5 py-1.5 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Skills in Demand */}
        <div className="rounded-2xl border border-blue-100/60 bg-blue-50/30 p-4">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100 text-xs">📈</span>
            <h3 className="text-xs font-bold uppercase tracking-wide text-blue-700">In Demand</h3>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {skillsInDemand.map((skill) => (
              <span
                key={skill}
                className="rounded-lg bg-blue-50 px-2.5 py-1.5 text-xs font-semibold text-blue-700 ring-1 ring-blue-100"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
