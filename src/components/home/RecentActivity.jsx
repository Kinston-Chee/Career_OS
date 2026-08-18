import React from 'react'
import { ArrowRight, ChevronRight } from 'lucide-react'
import { getActivityIcon, getActivityTone } from './activityMeta'

export default function RecentActivity({ items, onSelect, onViewAll }) {
  return (
    <section className="rounded-xl border border-[#e2eaf8] bg-white p-5 shadow-[0_8px_22px_rgba(44,76,142,0.07)]">
      <h2 className="mb-2 text-base font-bold text-[#11194a]">Recent activity</h2>
      <div className="divide-y divide-[#e7eef9]">
        {items.map((item) => {
          const Icon = getActivityIcon(item.icon)
          return (
            <button key={item.id} type="button" onClick={() => onSelect?.(item)} className="group flex w-full items-center gap-3 rounded-lg py-3 text-left transition first:pt-1 hover:bg-blue-50/50 focus:outline-none focus:ring-4 focus:ring-blue-100">
              <span className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full ${getActivityTone(item.tone)}`}>
                <Icon size={14} strokeWidth={2.2} />
              </span>
              <p className="min-w-0 flex-1 truncate text-sm font-medium text-[#455371] group-hover:text-[#11194a]">{item.text}</p>
              <span className="flex-shrink-0 text-xs font-medium text-[#7382a1]">{item.time}</span>
              <ChevronRight size={15} className="flex-shrink-0 text-[#a6b2cc] transition-transform group-hover:translate-x-0.5 group-hover:text-blue-600" />
            </button>
          )
        })}
      </div>
      <button type="button" onClick={onViewAll} className="ml-auto mt-3 flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100">
        View all activity <ArrowRight size={15} />
      </button>
    </section>
  )
}
