import React from 'react'
import { CheckCircle2, ChevronDown, ChevronRight, Clock3, X } from 'lucide-react'

const statusStyles = {
  ready: {
    label: 'Ready',
    icon: CheckCircle2,
    iconClass: 'text-emerald-600',
    pillClass: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  },
  'in-progress': {
    label: 'In progress',
    icon: Clock3,
    iconClass: 'text-orange-500',
    pillClass: 'border-orange-200 bg-orange-50 text-orange-600',
  },
  missing: {
    label: 'Missing',
    icon: X,
    iconClass: 'text-red-500',
    pillClass: 'border-red-200 bg-red-50 text-red-600',
  },
}

export default function RequirementsChecklist({
  groups,
  expandedGroup,
  selectedRequirement,
  onToggleGroup,
  onSelectRequirement,
}) {
  return (
    <section className="rounded-2xl border border-white/75 bg-white/80 p-5 shadow-[0_18px_55px_rgba(24,95,165,0.09)] backdrop-blur-xl">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-lg font-bold text-[#111B3F]">Requirements Checklist</h2>
        <button
          type="button"
          className="flex min-w-[200px] items-center justify-between rounded-lg border border-[#D8E0F0] bg-white/80 px-4 py-2 text-sm font-medium text-[#415174] shadow-sm"
        >
          QS World Rankings 2025
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-[#DCE5F4] bg-white/55">
        {groups.map((group) => {
          const isExpanded = expandedGroup === group.id
          return (
            <div key={group.id} className="border-b border-[#E4EAF5] last:border-b-0">
              <button
                type="button"
                onClick={() => onToggleGroup(group.id)}
                className="flex w-full items-center gap-3 px-5 py-3 text-left transition hover:bg-blue-50/40"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#155EE8] text-xs font-bold text-white shadow-sm">
                  {group.index}
                </span>
                <span className="min-w-0 flex-1 text-sm font-bold text-[#182243]">{group.title}</span>
                <span className="text-sm font-semibold text-emerald-600">{group.progress}</span>
                {isExpanded ? <ChevronDown className="h-4 w-4 text-[#31405F]" /> : <ChevronRight className="h-4 w-4 text-[#31405F]" />}
              </button>

              {isExpanded && (
                <div className="border-t border-[#E8EEF8] bg-white/50">
                  {group.items.map((item) => {
                    const status = statusStyles[item.status]
                    const StatusIcon = status.icon
                    const isSelected = selectedRequirement === item.id

                    return (
                      <button
                        type="button"
                        key={item.id}
                        onClick={() => onSelectRequirement(item.id)}
                        className={`flex w-full items-center gap-4 border-b border-[#EDF2F9] px-6 py-3 text-left last:border-b-0 transition ${
                          isSelected ? 'border-l-4 border-l-[#155EE8] bg-blue-50/80 shadow-[inset_0_0_0_1px_rgba(21,94,232,0.16)]' : 'hover:bg-blue-50/35'
                        }`}
                      >
                        <StatusIcon className={`h-5 w-5 shrink-0 ${status.iconClass}`} />
                        <span className="min-w-0 flex-1 text-sm font-semibold text-[#26304D]">{item.name}</span>
                        <span className={`min-w-[88px] rounded-lg border px-3 py-1 text-center text-xs font-semibold ${status.pillClass}`}>
                          {status.label}
                        </span>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
