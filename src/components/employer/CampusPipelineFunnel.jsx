import React from 'react'
import { CalendarDays, ChevronDown, TrendingUp } from 'lucide-react'
import { campusFunnel, campusFunnelSummary } from '../../data/employerMockData'

export default function CampusPipelineFunnel() {
  const maxValue = campusFunnel[0].value

  return (
    <section className="employer-glass-card p-5">
      <div className="flex items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-[#185FA5]" />
            <h2 className="text-sm font-semibold text-slate-950">Campus Pipeline / Event ROI</h2>
          </div>
          <p className="mt-0.5 text-xs text-slate-500">Funnel across all campus events</p>
        </div>
        <button type="button" className="flex shrink-0 items-center gap-1 rounded-full bg-white/60 px-2.5 py-1 text-xs font-medium text-slate-500 ring-1 ring-slate-200/70">
          This month
          <ChevronDown className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="mt-4 flex flex-col items-center">
        {campusFunnel.map((stage, index) => {
          const widthPct = 32 + (stage.value / maxValue) * 68
          const shade = 700 - index * 60
          return (
            <div key={stage.label} className="w-full border-b border-white/60 py-2 last:border-b-0">
              <div
                className="mx-auto flex items-center justify-between rounded-lg px-3 py-2 text-white shadow-sm shadow-blue-200/60"
                style={{ width: `${widthPct}%`, backgroundColor: `rgba(24, 95, 165, ${1 - index * 0.1})` }}
              >
                <span className="text-xs font-medium">{stage.label}</span>
                <span className="flex items-center gap-2 text-xs font-semibold">
                  {stage.value.toLocaleString()}
                  {stage.conversion ? <span className="text-[10px] font-normal text-white/80">{stage.conversion}</span> : null}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="employer-glass-subcard flex items-center gap-2 px-4 py-3">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-600">
            <TrendingUp className="h-3.5 w-3.5" />
          </span>
          <div>
            <p className="text-[11px] text-slate-500">Overall conversion rate</p>
            <p className="text-sm font-semibold text-slate-950">{campusFunnelSummary.conversionRate}</p>
          </div>
        </div>
        <div className="employer-glass-subcard flex items-center gap-2 px-4 py-3">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#185FA5]">
            <TrendingUp className="h-3.5 w-3.5" />
          </span>
          <div>
            <p className="text-[11px] text-slate-500">Events ROI (this month)</p>
            <p className="text-sm font-semibold text-slate-950">{campusFunnelSummary.eventsRoi}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
