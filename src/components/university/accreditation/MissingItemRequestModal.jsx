import React, { useState } from 'react'
import { Mail, ChevronDown } from 'lucide-react'
import EmployerModal from '../../employer/EmployerModal'

const RECIPIENTS = [
  'Dr. Ahmad Razif — Programme Chair',
  'Assoc. Prof. Dr. Lim Wei Keat — Curriculum Coordinator',
  'Ms. Kavitha Subramaniam — Faculty Quality Manager',
  'Dr. Nurul Ain Binti Hassan — Student Affairs Coordinator',
  'Mr. Faizal Azhari — HR & Academic Affairs',
  'Ms. Tan Siew Lin — Graduate Outcomes Office',
  'Dr. Priya Chandrasekaran — BSc Data Science Coordinator',
]

function buildEmail(itemName, recipient, greeting, intro, dueDate) {
  const recipientName = greeting ?? (recipient.split('—')[0].trim())
  const body = intro ?? `I am preparing accreditation documentation and require evidence for: ${itemName}.`
  return `Dear ${recipientName},

${body}

Could you please provide the required documentation by ${dueDate}? This is needed to complete the accreditation submission on time.

If you have any questions or need further context, please do not hesitate to reach out.

Thank you for your support.

Best regards,
Dr. Evelyn Chen
Dean of Computing & AI, Heriot-Watt University Malaysia`
}

export default function MissingItemRequestModal({ itemId, itemName, context, onClose, onSend }) {
  const dueDate = 'Friday, 1 August 2026'
  const defaultRecipient = context?.responsible ?? RECIPIENTS[0]
  const [recipient, setRecipient] = useState(defaultRecipient)
  const [recipientOpen, setRecipientOpen] = useState(false)
  const [emailText, setEmailText] = useState(
    () => buildEmail(itemName, defaultRecipient, context?.emailGreeting, context?.emailBody, dueDate)
  )
  const [sent, setSent] = useState(false)

  const handleRecipientChange = (r) => {
    setRecipient(r)
    setRecipientOpen(false)
    setEmailText(buildEmail(itemName, r, context?.emailGreeting, context?.emailBody, dueDate))
  }

  const handleSend = () => {
    setSent(true)
    setTimeout(() => {
      onSend(recipient, itemId)
    }, 900)
  }

  return (
    <EmployerModal
      title="Request missing data"
      subtitle={`Item: ${itemName}`}
      onClose={onClose}
      footer={
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-[#CBD7EA] bg-white px-5 py-2 text-sm font-semibold text-[#415174] hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSend}
            disabled={sent}
            className="flex items-center gap-2 rounded-lg bg-[#155EE8] px-6 py-2 text-sm font-bold text-white shadow-sm hover:bg-[#124FC4] disabled:opacity-60"
          >
            <Mail className="h-4 w-4" />
            {sent ? 'Sending…' : 'Send Request'}
          </button>
        </div>
      }
    >
      <div className="space-y-5 p-6">
        {/* Recipient row */}
        <div>
          <label className="mb-1.5 block text-xs font-bold text-[#415174]">Send to</label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setRecipientOpen((p) => !p)}
              className="flex w-full items-center justify-between rounded-lg border border-[#D8E0F0] bg-white px-4 py-2.5 text-sm font-medium text-[#26304D] shadow-sm"
            >
              <span className="truncate">{recipient}</span>
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 text-[#73809E]" />
            </button>
            {recipientOpen && (
              <div className="absolute left-0 right-0 z-20 mt-1 overflow-hidden rounded-xl border border-gray-100 bg-white py-1 shadow-lg">
                {RECIPIENTS.map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => handleRecipientChange(r)}
                    className={`flex w-full items-start px-4 py-2.5 text-left text-sm font-medium transition hover:bg-blue-50 ${r === recipient ? 'bg-blue-50/60 text-[#155EE8]' : 'text-[#26304D]'}`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Due date notice */}
        <div className="rounded-xl border border-amber-100 bg-amber-50/70 px-4 py-3">
          <p className="text-xs font-semibold text-amber-800">
            Response needed by: <span className="font-bold">{dueDate}</span>
            <span className="ml-2 text-amber-600">(2 weeks from today — required for MQA submission schedule)</span>
          </p>
        </div>

        {/* Email body */}
        <div>
          <label className="mb-1.5 block text-xs font-bold text-[#415174]">Email message</label>
          <textarea
            className="h-52 w-full resize-none rounded-xl border border-[#D8E0F0] bg-white/80 px-4 py-3 text-sm font-medium leading-6 text-[#1B2545] shadow-inner focus:outline-none focus:ring-2 focus:ring-[#155EE8]/30"
            value={emailText}
            onChange={(e) => setEmailText(e.target.value)}
          />
          <p className="mt-1.5 text-[11px] font-medium text-[#8A96B3]">You can edit the message before sending. A copy will be saved to your request log.</p>
        </div>
      </div>
    </EmployerModal>
  )
}
