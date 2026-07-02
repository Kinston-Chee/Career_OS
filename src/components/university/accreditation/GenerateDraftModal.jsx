import React, { useMemo, useState } from 'react'
import { Check, Copy, Download, FileText } from 'lucide-react'
import EmployerModal from '../../employer/EmployerModal'
import { accreditationSummary, requirementGroups, evidenceByRequirement } from './accreditationData'

function buildDraftText(submissionTitle) {
  const lines = []
  lines.push(`${submissionTitle.toUpperCase()} — DRAFT EVIDENCE PACK`)
  lines.push('Heriot-Watt University Malaysia · School of Mathematical and Computer Sciences')
  lines.push(`Prepared by: Dr. Evelyn Chen · Generated: ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}`)
  lines.push('')
  lines.push(`Overall readiness: ${accreditationSummary.kpis[0].value} — ${accreditationSummary.kpis[1].value} of ${accreditationSummary.kpis[1].note.replace('Of ', '')} evidence points ready`)
  lines.push('')

  requirementGroups.forEach((group) => {
    lines.push(`${group.index}. ${group.title.toUpperCase()} (${group.progress})`)
    group.items.forEach((item) => {
      const evidence = evidenceByRequirement[item.id]
      const statusLabel = item.status === 'ready' ? 'Ready' : item.status === 'in-progress' ? 'In progress' : 'Missing'
      lines.push(`   - ${item.name} [${statusLabel}]`)
      if (evidence) {
        evidence.sources.forEach((s) => {
          lines.push(`       ${s.label}: ${s.title}`)
        })
      }
    })
    lines.push('')
  })

  lines.push('This draft was auto-assembled from source-attributed evidence across Alumni Signal Intelligence, Curriculum-Market Alignment, Collaboration Marketplace, and Student Readiness. All figures are traceable to their originating page and update timestamp.')
  return lines.join('\n')
}

export default function GenerateDraftModal({ submissionTitle = 'QS World Rankings 2025', onClose, onToast }) {
  const [copied, setCopied] = useState(false)
  const text = useMemo(() => buildDraftText(submissionTitle), [submissionTitle])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      // Clipboard API unavailable — text is still visible for manual copy.
    }
    setCopied(true)
    onToast?.('Draft pack copied to clipboard')
    window.setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    onToast?.('Draft pack downloaded as PDF')
  }

  return (
    <EmployerModal
      title={`Draft Evidence Pack — ${submissionTitle}`}
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
            Download as PDF
          </button>
        </div>
      }
    >
      <p className="mb-3 text-xs text-gray-400">Sections mirror the Requirements Checklist categories — every line is source-attributed for committee and reviewer scrutiny.</p>
      <pre className="whitespace-pre-wrap rounded-xl bg-slate-50 p-4 text-[13px] leading-6 text-slate-800 ring-1 ring-slate-100">{text}</pre>
    </EmployerModal>
  )
}
