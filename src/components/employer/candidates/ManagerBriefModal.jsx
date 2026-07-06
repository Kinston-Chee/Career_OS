import React, { useMemo, useState } from 'react'
import { Check, Copy, FileText } from 'lucide-react'
import EmployerModal from '../EmployerModal'

// "Manager Convince Mode" — the single highest-value feature from research:
// a one-paragraph, evidence-backed brief Edwin can paste into Slack/email to
// win hiring-manager buy-in without forwarding a raw CV. Fully mock/local —
// assembled from data already on the candidate detail page, no API call.
function buildBriefText(candidate, detail) {
  const lines = []
  lines.push(`MANAGER BRIEF — ${candidate.name}`)
  lines.push(`${candidate.targetRole} · ${candidate.university} · ${candidate.course}, ${candidate.year}`)
  lines.push('')
  lines.push(`MATCH: ${candidate.matchScore}% (${candidate.matchLabel})`)
  lines.push('')
  lines.push('WHY THIS CANDIDATE:')
  candidate.evidenceChips.forEach((chip) => lines.push(`- ${chip}`))
  lines.push('')
  lines.push('SUMMARY:')
  lines.push(detail.narrative)
  lines.push('')
  lines.push(`RISK TO WATCH: ${candidate.risk}`)
  lines.push('')
  lines.push('WHAT TO VALIDATE IN INTERVIEW:')
  detail.whatToValidate.forEach((item) => lines.push(`- ${item}`))
  lines.push('')
  lines.push(`RETENTION (${detail.retentionRisk} risk): ${detail.retentionConditions}`)
  lines.push('')
  lines.push(`Applied ${candidate.appliedDate}. Full profile in CareerOS: /employer/candidates?candidateId=${candidate.id}`)
  return lines.join('\n')
}

export default function ManagerBriefModal({ candidate, detail, onClose, onToast }) {
  const [copied, setCopied] = useState(false)
  const briefText = useMemo(() => buildBriefText(candidate, detail), [candidate, detail])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(briefText)
    } catch {
      // Clipboard API unavailable — the text is still visible for manual copy.
    }
    setCopied(true)
    onToast?.('Manager brief copied to clipboard')
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <EmployerModal
      title="Manager Brief"
      icon={<FileText className="h-4 w-4" />}
      onClose={onClose}
      maxWidth="max-w-[600px]"
      footer={
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs text-gray-400">Paste this straight into Slack or email — no formatting needed.</p>
          <button
            type="button"
            onClick={handleCopy}
            className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-white transition-colors ${
              copied ? 'bg-green-600' : 'bg-[#185FA5] hover:bg-[#134c87]'
            }`}
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? 'Copied' : 'Copy to clipboard'}
          </button>
        </div>
      }
    >
      <p className="mb-3 text-xs text-gray-400">
        Auto-generated from verified evidence on {candidate.name}&rsquo;s profile — every claim below is traceable to a signal on the candidate detail page.
      </p>
      <pre className="whitespace-pre-wrap rounded-xl bg-slate-50 p-4 text-[13px] leading-6 text-slate-800 ring-1 ring-slate-100">
        {briefText}
      </pre>
    </EmployerModal>
  )
}
