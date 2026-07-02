import React, { useMemo, useState } from 'react'
import { Check, Copy, Download, Map } from 'lucide-react'
import EmployerModal from '../../employer/EmployerModal'

function buildRoadmapText(gapName, roadmap) {
  const lines = []
  lines.push(`CURRICULUM ROADMAP — ${gapName.toUpperCase()}`)
  lines.push('Heriot-Watt University Malaysia · School of Mathematical and Computer Sciences')
  lines.push('')
  roadmap.stages.forEach((stage) => {
    lines.push(`Stage ${stage.id}: ${stage.title} (${stage.timeframe})`)
    lines.push(`  Action: ${stage.action}`)
    lines.push(`  Estimated coverage lift: ${stage.lift}`)
    lines.push('')
  })
  lines.push(roadmap.closingStatement)
  return lines.join('\n')
}

export default function RoadmapExportModal({ gapName, roadmap, onClose, onToast }) {
  const [copied, setCopied] = useState(false)
  const text = useMemo(() => buildRoadmapText(gapName, roadmap), [gapName, roadmap])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      // Clipboard API unavailable — text is still visible for manual copy.
    }
    setCopied(true)
    onToast?.('Roadmap copied to clipboard')
    window.setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${gapName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-roadmap.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    onToast?.('Roadmap downloaded')
  }

  return (
    <EmployerModal
      title={`Roadmap — ${gapName}`}
      icon={<Map className="h-4 w-4" />}
      onClose={onClose}
      maxWidth="max-w-[560px]"
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
      <pre className="whitespace-pre-wrap rounded-xl bg-slate-50 p-4 text-[13px] leading-6 text-slate-800 ring-1 ring-slate-100">{text}</pre>
    </EmployerModal>
  )
}
