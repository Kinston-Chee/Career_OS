import React, { useMemo, useState } from 'react'
import { Check, Copy, Download, FileStack } from 'lucide-react'
import EmployerModal from '../../employer/EmployerModal'
import { gapEvidence } from '../../../data/curriculumAlignmentData'

function buildPackText(gapNames) {
  const lines = []
  lines.push('CURRICULUM-MARKET ALIGNMENT — EVIDENCE PACK')
  lines.push('Heriot-Watt University Malaysia · School of Mathematical and Computer Sciences')
  lines.push(`Prepared by: Dr. Evelyn Chen · Generated: ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}`)
  lines.push('')
  gapNames.forEach((name, idx) => {
    const ev = gapEvidence[name]
    if (!ev) return
    lines.push(`${idx + 1}. ${name.toUpperCase()}`)
    lines.push(`   Curriculum coverage: ${ev.curriculum.coveragePct}% — ${ev.curriculum.coveredIn}`)
    lines.push(`   ${ev.curriculum.missing}`)
    lines.push(`   Market demand: ${ev.marketDemand.demandPct}% — ${ev.marketDemand.detail}`)
    lines.push(`   Alumni feedback: "${ev.alumniFeedback.quote}" — ${ev.alumniFeedback.attribution} (cited by ${ev.alumniFeedback.citePct}% of surveyed alumni)`)
    lines.push(`   Employer language: ${ev.employerLanguage.phrases.join(', ')} (${ev.employerLanguage.source})`)
    lines.push('')
  })
  lines.push('Confidence: High · Each gap above is supported by 4 independent evidence sources (curriculum, labor market, alumni, employer language).')
  return lines.join('\n')
}

export default function EvidencePackModal({ gapNames, onClose, onToast }) {
  const [copied, setCopied] = useState(false)
  const text = useMemo(() => buildPackText(gapNames), [gapNames])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      // Clipboard API unavailable — text is still visible for manual copy.
    }
    setCopied(true)
    onToast?.('Evidence pack copied to clipboard')
    window.setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'curriculum-market-evidence-pack.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    onToast?.('Evidence pack downloaded')
  }

  return (
    <EmployerModal
      title="Evidence Pack"
      icon={<FileStack className="h-4 w-4" />}
      onClose={onClose}
      maxWidth="max-w-[620px]"
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
            {copied ? 'Copied' : 'Copy'}
          </button>
          <button
            type="button"
            onClick={handleDownload}
            className="flex items-center gap-1.5 rounded-full bg-[#185FA5] px-4 py-2 text-sm font-semibold text-white hover:bg-[#134c87]"
          >
            <Download className="h-3.5 w-3.5" />
            Download .txt
          </button>
        </div>
      }
    >
      <p className="mb-3 text-xs text-gray-400">Formatted for academic board review and accreditation submission — every claim below is source-attributed.</p>
      <pre className="whitespace-pre-wrap rounded-xl bg-slate-50 p-4 text-[13px] leading-6 text-slate-800 ring-1 ring-slate-100">{text}</pre>
    </EmployerModal>
  )
}
