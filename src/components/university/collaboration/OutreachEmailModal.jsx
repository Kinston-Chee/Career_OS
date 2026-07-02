import React, { useState } from 'react'
import { Mail, Send } from 'lucide-react'
import EmployerModal from '../../employer/EmployerModal'

function buildEmailBody(partner) {
  return `Dear ${partner.name} University Relations team,

I hope this message finds you well. I am writing from the School of Mathematical and Computer Sciences at Heriot-Watt University Malaysia to explore a potential partnership.

We believe ${partner.alignmentReason}. Our graduate cohort has shown strong applied performance in this area, and we would welcome the opportunity to discuss internship placements, a co-designed workshop or challenge, and potential guest teaching engagement.

Would you be open to a short call in the coming weeks to explore this further?

Best regards,
Dr. Evelyn Chen
Dean, School of Mathematical and Computer Sciences
Heriot-Watt University Malaysia`
}

export default function OutreachEmailModal({ partner, onClose, onSend }) {
  const [body, setBody] = useState(() => buildEmailBody(partner))
  const [sent, setSent] = useState(false)

  const handleSend = () => {
    setSent(true)
    window.setTimeout(() => onSend(), 500)
  }

  return (
    <EmployerModal
      title={`Outreach — ${partner.name}`}
      icon={<Mail className="h-4 w-4" />}
      onClose={onClose}
      maxWidth="max-w-[560px]"
      footer={
        <button
          type="button"
          onClick={handleSend}
          disabled={sent}
          className={`flex w-full items-center justify-center gap-1.5 rounded-full py-2.5 text-sm font-semibold text-white transition-colors ${
            sent ? 'bg-green-600' : 'bg-[#185FA5] hover:bg-[#134c87]'
          }`}
        >
          {sent ? '✓ Outreach sent' : <><Send className="h-3.5 w-3.5" /> Send</>}
        </button>
      }
    >
      <div className="space-y-3">
        <div>
          <label className="text-xs font-semibold text-gray-600">To</label>
          <p className="mt-1 rounded-lg bg-slate-50 px-3 py-2 text-sm text-gray-700 ring-1 ring-slate-100">{partner.contact}</p>
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-600">Message</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={12}
            className="mt-1 w-full resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm leading-6 text-gray-700 outline-none focus:border-[#185FA5]"
          />
        </div>
        <p className="text-[11px] text-gray-400">Demo only — this message is not actually sent.</p>
      </div>
    </EmployerModal>
  )
}
