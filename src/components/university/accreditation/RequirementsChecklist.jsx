import React, { useEffect, useRef, useState } from 'react'
import { AlertTriangle, CheckCircle2, ChevronDown, ChevronRight, Clock3, Upload, X } from 'lucide-react'
import { getDisplayStatus, getGroupStats, STATUS_LABELS } from './accreditationData'

const statusStyles = {
  ready: {
    icon: CheckCircle2,
    iconClass: 'text-emerald-600',
    pillClass: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  },
  'in-progress': {
    icon: Clock3,
    iconClass: 'text-orange-500',
    pillClass: 'border-orange-200 bg-orange-50 text-orange-600',
  },
  requested: {
    icon: Clock3,
    iconClass: 'text-amber-600',
    pillClass: 'border-[#e6b86a] bg-[#FAEEDA] text-[#854F0B]',
  },
  missing: {
    icon: X,
    iconClass: 'text-red-500',
    pillClass: 'border-red-200 bg-red-50 text-red-600',
  },
  override: {
    icon: CheckCircle2,
    iconClass: 'text-orange-600',
    pillClass: 'border-orange-300 bg-orange-100 text-orange-700',
  },
}

function frameworkTag(profile) {
  if (profile.id.startsWith('mqa')) return 'MQA'
  if (profile.id === 'setara') return 'SETARA'
  return 'QS'
}

function FrameworkDropdown({ selected, frameworks, frameworkStats, onSelect }) {
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
        className="flex min-w-[260px] items-center justify-between rounded-lg border border-[#D8E0F0] bg-white/80 px-4 py-2 text-sm font-medium text-[#415174] shadow-sm"
      >
        <span className="min-w-0 truncate">{selected}</span>
        <ChevronDown className="ml-2 h-4 w-4 shrink-0" />
      </button>
      {open ? (
        <div className="absolute right-0 z-20 mt-1.5 w-80 overflow-hidden rounded-xl border border-gray-100 bg-white py-1 shadow-lg">
          {frameworks.map((profile) => {
            const stats = frameworkStats[profile.label]
            return (
              <button
                key={profile.label}
                type="button"
                onClick={() => {
                  onSelect(profile.label)
                  setOpen(false)
                }}
                className={`flex w-full flex-col items-start px-3.5 py-2.5 text-left transition hover:bg-gray-50 ${
                  profile.label === selected ? 'bg-blue-50/60' : ''
                }`}
              >
                <span className={`text-xs font-semibold ${profile.label === selected ? 'text-[#185FA5]' : 'text-gray-700'}`}>
                  {profile.label}
                </span>
                <span className="mt-0.5 text-[10px] text-gray-400">
                  {profile.category} - {stats.ready}/{stats.total} ready ({stats.readiness}%)
                </span>
              </button>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}

function MissingResolutionPanel({ item, context, onRequestFromPanel, onUpload, onMarkNA }) {
  return (
    <div className="border-t border-[#E8EEF8] bg-[#FAFBFF] px-6 py-4">
      <div className="grid grid-cols-3 gap-4 text-xs">
        <div>
          <p className="font-bold uppercase tracking-wide text-[#8A96B3]">Last known record</p>
          <p className="mt-1 font-semibold text-[#26304D]">{context?.lastRecord ?? 'Not on record'}</p>
        </div>
        <div>
          <p className="font-bold uppercase tracking-wide text-[#8A96B3]">Responsible person</p>
          <p className="mt-1 font-semibold text-[#26304D]">{context?.responsibleShort ?? context?.responsible ?? 'Not assigned'}</p>
        </div>
        <div>
          <p className="font-bold uppercase tracking-wide text-[#8A96B3]">Why this is needed</p>
          <p className="mt-1 font-semibold leading-5 text-[#26304D]">{context?.whyNeeded ?? 'Required for this evidence pack.'}</p>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <button
          type="button"
          onClick={() => onRequestFromPanel(item)}
          className="flex items-center gap-1.5 rounded-lg bg-[#155EE8] px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#124FC4]"
        >
          Request from {context?.responsibleShort ?? 'responsible person'}
        </button>
        <button
          type="button"
          onClick={() => onUpload(item)}
          className="flex items-center gap-1.5 rounded-lg border border-[#CBD7EA] bg-white px-4 py-2 text-xs font-semibold text-[#415174] hover:bg-blue-50"
        >
          <Upload className="h-3.5 w-3.5" />
          Upload document
        </button>
        <button
          type="button"
          onClick={() => onMarkNA(item)}
          className="flex items-center gap-1.5 rounded-lg border border-transparent px-4 py-2 text-xs font-semibold text-[#8A96B3] hover:bg-gray-50"
        >
          <AlertTriangle className="h-3.5 w-3.5" />
          Mark as not applicable
        </button>
      </div>
    </div>
  )
}

export default function RequirementsChecklist({
  groups,
  expandedGroup,
  selectedRequirement,
  selectedFramework,
  overrides,
  requestedItems,
  expandedMissingId,
  pendingRequests,
  missingItemContext,
  frameworkProfile,
  frameworks,
  frameworkStats,
  onToggleGroup,
  onSelectRequirement,
  onSelectFramework,
  onRequestItem,
  onExpandMissing,
  onUploadItem,
  onMarkNAItem,
}) {
  const tag = frameworkTag(frameworkProfile)

  return (
    <section className="rounded-2xl border border-white/75 bg-white/80 p-5 shadow-[0_18px_55px_rgba(24,95,165,0.09)] backdrop-blur-xl">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-[#111B3F]">Requirements Checklist</h2>
          <p className="mt-0.5 text-xs font-semibold text-[#73809E]">
            {frameworkProfile.checklistLabel} - {frameworkProfile.category}, {frameworkProfile.scope}
          </p>
        </div>
        <FrameworkDropdown selected={selectedFramework} frameworks={frameworks} frameworkStats={frameworkStats} onSelect={onSelectFramework} />
      </div>

      <div className="overflow-hidden rounded-xl border border-[#DCE5F4] bg-white/55">
        {groups.map((group) => {
          const isExpanded = expandedGroup === group.id
          const groupStats = getGroupStats(group, requestedItems, overrides)
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
                <span className="text-sm font-semibold text-emerald-600">{groupStats.ready}/{groupStats.total} ready</span>
                {isExpanded ? <ChevronDown className="h-4 w-4 text-[#31405F]" /> : <ChevronRight className="h-4 w-4 text-[#31405F]" />}
              </button>

              {isExpanded && (
                <div className="border-t border-[#E8EEF8] bg-white/50">
                  {group.items.map((item) => {
                    const resolvedStatusKey = getDisplayStatus(item, requestedItems, overrides)
                    const isRequested = resolvedStatusKey === 'requested'
                    const isMissing = resolvedStatusKey === 'missing'
                    const status = statusStyles[resolvedStatusKey] ?? statusStyles.missing
                    const StatusIcon = status.icon
                    const isSelected = selectedRequirement === item.id
                    const isExpanded = expandedMissingId === item.id
                    const ctx = missingItemContext?.[item.id]

                    return (
                      <div key={item.id} className="border-b border-[#EDF2F9] last:border-b-0">
                        <div
                          className={`flex w-full items-center gap-4 px-6 py-3 transition ${
                            isSelected ? 'border-l-4 border-l-[#155EE8] bg-blue-50/80 shadow-[inset_0_0_0_1px_rgba(21,94,232,0.16)]' : 'hover:bg-blue-50/35'
                          }`}
                        >
                          <button
                            type="button"
                            className="flex min-w-0 flex-1 items-center gap-4 text-left"
                            onClick={() => {
                              onSelectRequirement(item.id)
                              if (isMissing || isRequested || isExpanded) onExpandMissing?.(item.id)
                            }}
                          >
                            <StatusIcon className={`h-5 w-5 shrink-0 ${status.iconClass}`} />
                            <span className="min-w-0 flex-1 text-sm font-semibold text-[#26304D]">{item.name}</span>
                          </button>

                          <span className="rounded-md bg-purple-50 px-2 py-0.5 text-[10px] font-bold text-purple-600">{tag}</span>

                          <span className={`min-w-[110px] rounded-lg border px-3 py-1 text-center text-xs font-semibold ${status.pillClass}`}>
                            {STATUS_LABELS[resolvedStatusKey] ?? resolvedStatusKey}
                          </span>

                          {isMissing && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation()
                                onRequestItem?.(item, ctx)
                              }}
                              className="flex shrink-0 items-center gap-1 rounded-lg border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold text-[#155EE8] transition hover:bg-blue-100"
                            >
                              Request
                            </button>
                          )}
                        </div>

                        {isExpanded && (isMissing || isRequested) && ctx && (
                          <MissingResolutionPanel
                            item={item}
                            context={ctx}
                            onRequestFromPanel={(it) => onRequestItem?.(it, ctx)}
                            onUpload={(it) => onUploadItem?.(it)}
                            onMarkNA={(it) => onMarkNAItem?.(it)}
                          />
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {pendingRequests?.length > 0 && (
        <div className="mt-4 rounded-xl border border-amber-100 bg-amber-50/50 p-4">
          <p className="mb-3 text-xs font-bold uppercase tracking-wide text-[#854F0B]">Pending requests ({pendingRequests.length})</p>
          <div className="space-y-2">
            {pendingRequests.map((req) => (
              <div key={req.itemId} className="flex items-center gap-4 rounded-lg border border-amber-100 bg-white/80 px-4 py-2.5">
                <Clock3 className="h-4 w-4 shrink-0 text-amber-600" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-[#26304D]">{req.itemName}</p>
                  <p className="mt-0.5 text-[11px] font-medium text-[#8A96B3]">Sent to: {req.responsible}</p>
                </div>
                <div className="text-right">
                  <p className="text-[11px] font-semibold text-[#50607E]">Sent {req.sentAt}</p>
                  <p className="text-[11px] font-medium text-amber-700">Due {req.dueDate}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
