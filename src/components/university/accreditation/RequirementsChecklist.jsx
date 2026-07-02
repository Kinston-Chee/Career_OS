import React, { useEffect, useRef, useState } from 'react'
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
  override: {
    label: 'Ready (override)',
    icon: CheckCircle2,
    iconClass: 'text-orange-600',
    pillClass: 'border-orange-300 bg-orange-100 text-orange-700',
  },
}

const FRAMEWORK_OPTIONS = ['QS World Rankings 2025', 'MQA Self-Review 2025', 'AACSB Accreditation Cycle 2026']
const FRAMEWORK_TAG = { 'QS World Rankings 2025': 'QS', 'MQA Self-Review 2025': 'MQA', 'AACSB Accreditation Cycle 2026': 'AACSB' }

function FrameworkDropdown({ selected, onSelect }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="flex min-w-[200px] items-center justify-between rounded-lg border border-[#D8E0F0] bg-white/80 px-4 py-2 text-sm font-medium text-[#415174] shadow-sm"
      >
        {selected}
        <ChevronDown className="h-4 w-4" />
      </button>
      {open ? (
        <div className="absolute right-0 z-20 mt-1.5 w-56 overflow-hidden rounded-xl border border-gray-100 bg-white py-1 shadow-lg">
          {FRAMEWORK_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                onSelect(option)
                setOpen(false)
              }}
              className={`flex w-full items-center px-3.5 py-2 text-left text-xs ${option === selected ? 'font-semibold text-[#185FA5]' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              {option}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default function RequirementsChecklist({
  groups,
  expandedGroup,
  selectedRequirement,
  selectedFramework,
  overrides,
  onToggleGroup,
  onSelectRequirement,
  onSelectFramework,
}) {
  const frameworkTag = FRAMEWORK_TAG[selectedFramework]

  return (
    <section className="rounded-2xl border border-white/75 bg-white/80 p-5 shadow-[0_18px_55px_rgba(24,95,165,0.09)] backdrop-blur-xl">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-lg font-bold text-[#111B3F]">Requirements Checklist</h2>
        <FrameworkDropdown selected={selectedFramework} onSelect={onSelectFramework} />
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
                    const isOverridden = !!overrides[item.id]
                    const status = statusStyles[isOverridden ? 'override' : item.status]
                    const StatusIcon = status.icon
                    const isSelected = selectedRequirement === item.id
                    const isRelevantToFramework = frameworkTag ? item.frameworks?.includes(frameworkTag) : true

                    return (
                      <button
                        type="button"
                        key={item.id}
                        onClick={() => onSelectRequirement(item.id)}
                        className={`flex w-full items-center gap-4 border-b border-[#EDF2F9] px-6 py-3 text-left last:border-b-0 transition ${
                          isSelected ? 'border-l-4 border-l-[#155EE8] bg-blue-50/80 shadow-[inset_0_0_0_1px_rgba(21,94,232,0.16)]' : 'hover:bg-blue-50/35'
                        } ${!isRelevantToFramework ? 'opacity-40' : ''}`}
                      >
                        <StatusIcon className={`h-5 w-5 shrink-0 ${status.iconClass}`} />
                        <span className="min-w-0 flex-1 text-sm font-semibold text-[#26304D]">{item.name}</span>
                        {isRelevantToFramework && frameworkTag ? (
                          <span className="rounded-md bg-purple-50 px-2 py-0.5 text-[10px] font-bold text-purple-600">{frameworkTag}</span>
                        ) : null}
                        <span className={`min-w-[110px] rounded-lg border px-3 py-1 text-center text-xs font-semibold ${status.pillClass}`}>
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
