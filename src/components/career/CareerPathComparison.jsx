import React from 'react'

export default function CareerPathComparison({ paths, selectedPathId, onSelectPath }) {
  const topPaths = paths.slice(0, 4)

  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
      <h3 className="text-base font-semibold text-slate-950">Career Path Comparison</h3>
      <p className="mt-1 text-xs text-slate-500">Compare suitability, salary, and demand across your top paths</p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {topPaths.map((path) => {
          const isSelected = path.id === selectedPathId
          return (
            <button
              key={path.id}
              type="button"
              onClick={() => onSelectPath(path.id)}
              className={`group rounded-2xl border p-4 text-left transition-all duration-200 ${
                isSelected
                  ? 'border-violet-300 bg-violet-50/60 ring-2 ring-violet-200 shadow-lg'
                  : 'border-slate-200/80 bg-white hover:border-violet-200 hover:shadow-md'
              }`}
            >
              {/* Suitability */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-900">{path.roleName}</span>
                <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                  path.matchScore >= 85 ? 'bg-emerald-100 text-emerald-700'
                  : path.matchScore >= 70 ? 'bg-blue-100 text-blue-700'
                  : 'bg-amber-100 text-amber-700'
                }`}>
                  {path.matchScore}%
                </span>
              </div>

              {/* Readiness gauge */}
              <div className="mt-3">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">Readiness</span>
                  <span className="font-bold text-slate-700">{path.readinessScore}%</span>
                </div>
                <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      path.readinessScore >= 60 ? 'bg-emerald-500' : path.readinessScore >= 40 ? 'bg-amber-500' : 'bg-rose-500'
                    }`}
                    style={{ width: `${path.readinessScore}%` }}
                  />
                </div>
              </div>

              {/* Salary & Demand */}
              <div className="mt-3 space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Salary Range</span>
                  <span className="font-semibold text-slate-700">{path.salaryRange}</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Market Demand</span>
                  <span className={`font-semibold ${
                    path.demandLevel === 'High Demand' ? 'text-emerald-600' : 'text-amber-600'
                  }`}>
                    {path.demandLevel}
                  </span>
                </div>
              </div>

              {/* Skills summary */}
              <div className="mt-3 flex items-center gap-2 border-t border-slate-100 pt-3">
                <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700">
                  {path.matchingSkills.length} strong
                </span>
                <span className="rounded bg-amber-50 px-1.5 py-0.5 text-[10px] font-semibold text-amber-700">
                  {path.missingSkills.length} to build
                </span>
              </div>

              <div className={`mt-3 rounded-lg py-1.5 text-center text-xs font-bold transition ${
                isSelected
                  ? 'bg-violet-600 text-white'
                  : 'bg-slate-50 text-slate-500 group-hover:bg-violet-50 group-hover:text-violet-700'
              }`}>
                {isSelected ? '✓ Selected' : 'Explore Path'}
              </div>
            </button>
          )
        })}
      </div>
    </section>
  )
}
