import React, { useState } from 'react'
import { Mail, Send } from 'lucide-react'
import EmployerModal from '../EmployerModal'

function defaultMessage(candidate) {
  return `Hi ${candidate.name.split(' ')[0]},\n\nThanks for applying to the ${candidate.targetRole} role at Acme Corporation — your profile stood out, especially ${candidate.evidenceChips[0]?.toLowerCase() || 'your project work'}. I'd love to set up a quick chat about next steps.\n\nAre you free this week?\n\nBest,\nEdwin`
}

export default function MessageComposeModal({ candidate, onClose, onSend }) {
  const [subject, setSubject] = useState(`Next steps — ${candidate.targetRole} at Acme Corporation`)
  const [message, setMessage] = useState(() => defaultMessage(candidate))
  const [sent, setSent] = useState(false)

  const handleSend = () => {
    setSent(true)
    window.setTimeout(() => onSend(), 500)
  }

  return (
    <EmployerModal
      title="Send message"
      icon={<Mail className="h-4 w-4" />}
      onClose={onClose}
      maxWidth="max-w-[520px]"
      footer={
        <button
          type="button"
          onClick={handleSend}
          disabled={sent}
          className={`flex w-full items-center justify-center gap-1.5 rounded-full py-2.5 text-sm font-semibold text-white transition-colors ${
            sent ? 'bg-green-600' : 'bg-[#185FA5] hover:bg-[#134c87]'
          }`}
        >
          {sent ? '✓ Sent' : <><Send className="h-3.5 w-3.5" /> Send message</>}
        </button>
      }
    >
      <div className="space-y-3">
        <div>
          <label className="text-xs font-semibold text-gray-600">To</label>
          <p className="mt-1 rounded-lg bg-slate-50 px-3 py-2 text-sm text-gray-700 ring-1 ring-slate-100">{candidate.name}</p>
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-600">Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 outline-none focus:border-[#185FA5]"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-600">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={7}
            className="mt-1 w-full resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 outline-none focus:border-[#185FA5]"
          />
        </div>
        <p className="text-[11px] text-gray-400">Demo only — this message is not actually sent.</p>
      </div>
    </EmployerModal>
  )
}
