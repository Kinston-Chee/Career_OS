import React, { useMemo, useState } from 'react'
import { Check, Copy, Download, FileText } from 'lucide-react'
import EmployerModal from '../../employer/EmployerModal'
import { getDisplayStatus, getGroupStats, STATUS_LABELS } from './accreditationData'

function buildDraftText({ frameworkProfile, groups, stats, requestedItems, overrides, evidenceByRequirement }) {
  const lines = []
  lines.push(`${frameworkProfile.shortLabel.toUpperCase()} - EVIDENCE SUMMARY`)
  lines.push(`${frameworkProfile.category} - ${frameworkProfile.scope}`)
  lines.push(`Generated: ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}`)
  lines.push('')
  lines.push(`Readiness: ${stats.readiness}% (${stats.ready} of ${stats.total} priority requirements ready)`)
  lines.push(`In progress: ${stats.inProgress}; Missing: ${stats.missing}; Requested: ${stats.requested}`)
  lines.push('')

  groups.forEach((group) => {
    const groupStats = getGroupStats(group, requestedItems, overrides)
    lines.push(`${group.index}. ${group.title.toUpperCase()} (${groupStats.ready}/${groupStats.total} ready)`)
    group.items.forEach((item) => {
      const status = getDisplayStatus(item, requestedItems, overrides)
      const evidence = evidenceByRequirement[item.id]
      lines.push(`   - ${item.name} [${STATUS_LABELS[status] ?? status}]`)
      if (evidence) {
        evidence.sources.forEach((source) => {
          lines.push(`       ${source.label}: ${source.title}`)
        })
      } else {
        lines.push('       Evidence not mapped yet.')
      }
    })
    lines.push('')
  })

  lines.push('This draft is illustrative for the hackathon prototype. Official submissions still require staff review and framework-specific validation.')
  return lines.join('\n')
}

export default function GenerateDraftModal({
  frameworkProfile,
  groups,
  stats,
  requestedItems,
  overrides,
  evidenceByRequirement,
  onClose,
  onToast,
}) {
  const [copied, setCopied] = useState(false)
  const text = useMemo(
    () => buildDraftText({ frameworkProfile, groups, stats, requestedItems, overrides, evidenceByRequirement }),
    [frameworkProfile, groups, stats, requestedItems, overrides, evidenceByRequirement],
  )

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      // Clipboard API unavailable; visible text remains copyable.
    }
    setCopied(true)
    onToast?.('Evidence summary copied to clipboard')
    window.setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    onToast?.('Evidence summary download prepared (mock)')
  }

  return (
    <EmployerModal
      title={`Evidence Summary - ${frameworkProfile.shortLabel}`}
      subtitle={`${frameworkProfile.category} - ${frameworkProfile.scope}`}
      icon={<FileText className="h-4 w-4" />}
      onClose={onClose}
      maxWidth="max-w-[640px]"
      footer={
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              copied ? 'bg-green-600 text-white' : 'employer-secondary-button'
            }`}
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? 'Copied' : 'Copy text'}
          </button>
          <button
            type="button"
            onClick={handleDownload}
            className="flex items-center gap-1.5 rounded-full bg-[#185FA5] px-4 py-2 text-sm font-semibold text-white hover:bg-[#134c87]"
          >
            <Download className="h-3.5 w-3.5" />
            Download summary
          </button>
        </div>
      }
    >
      <p className="mb-3 text-xs text-gray-400">
        This draft uses the currently selected framework and priority requirements only.
      </p>
      <pre className="whitespace-pre-wrap rounded-xl bg-slate-50 p-4 text-[13px] leading-6 text-slate-800 ring-1 ring-slate-100">{text}</pre>
    </EmployerModal>
  )
}
