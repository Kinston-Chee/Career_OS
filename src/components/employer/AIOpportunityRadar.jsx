import React from 'react'
import { Building2, Radar, Sparkles, TrendingUp, Users } from 'lucide-react'
import { opportunityRadar } from '../../data/employerMockData'

const ICONS = { forecast: TrendingUp, building: Building2, people: Users, sparkle: Sparkles }

function RadarRow({ row }) {
  const Icon = ICONS[row.icon] || Sparkles
  return (
    <div className="flex items-start gap-2.5">
      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-50/90 text-[#185FA5] ring-1 ring-blue-100">
        <Icon className="h-3.5 w-3.5" />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-medium text-slate-500">{row.label}</p>
        <p className="text-[13px] leading-5 text-slate-800">{row.value}</p>
      </div>
    </div>
  )
}

export default function AIOpportunityRadar() {
  return (
    <section className="employer-glass-card flex h-full flex-col p-5">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <Radar className="h-4 w-4 text-[#185FA5]" />
          <h2 className="text-sm font-semibold text-slate-950">AI Opportunity Radar</h2>
        </div>
        <span className="shrink-0 rounded-full bg-blue-50/90 px-2.5 py-0.5 text-[11px] font-medium text-[#185FA5] ring-1 ring-blue-100">{opportunityRadar.badge}</span>
      </div>
      <p className="mt-1.5 text-xs leading-5 text-slate-500">{opportunityRadar.subtitle}</p>

      <p className="mt-3 text-[13px] leading-6 text-slate-600">{opportunityRadar.body}</p>

      <div className="mt-4 space-y-3">
        {opportunityRadar.rows.map((row) => (
          <RadarRow key={row.label} row={row} />
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <button type="button" className="rounded-xl bg-[#185FA5] px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-200/70 transition hover:bg-[#134c87]">
          Create engagement plan
        </button>
        <button type="button" className="rounded-xl bg-white/70 px-4 py-2.5 text-sm font-semibold text-slate-700 ring-1 ring-slate-200/80 transition hover:bg-white">
          View talent pool
        </button>
      </div>
    </section>
  )
}
