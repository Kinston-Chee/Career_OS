import React, { useState } from 'react'
import { Send } from 'lucide-react'
import EmployerModal from '../../employer/EmployerModal'

const RECIPIENTS = ['International Office', 'Career Services', 'Faculty Admin']

export default function RequestDataModal({ requirementName, sourceLabel, onClose, onSend }) {
  const [recipient, setRecipient] = useState(RECIPIENTS[0])
  const [message, setMessage] = useState(
    `Requesting updated data for "${sourceLabel}" to complete accreditation evidence for "${requirementName}". Please provide the latest available figures at your earliest convenience.`
  )
  const [sent, setSent] = useState(false)

  const handleSend = () => {
    setSent(true)
    window.setTimeout(() => onSend(recipient), 500)
  }

  return (
    <EmployerModal
      title="Send data request to:"
      icon={<Send className="h-4 w-4" />}
      onClose={onClose}
      maxWidth="max-w-[480px]"
      footer={
        <button
          type="button"
          onClick={handleSend}
          disabled={sent}
          className={`flex w-full items-center justify-center gap-1.5 rounded-full py-2.5 text-sm font-semibold text-white transition-colors ${
            sent ? 'bg-green-600' : 'bg-[#185FA5] hover:bg-[#134c87]'
          }`}
        >
          {sent ? '✓ Request sent' : <><Send className="h-3.5 w-3.5" /> Send request</>}
        </button>
      }
    >
      <div className="space-y-3">
        <div>
          <label className="text-xs font-semibold text-gray-600">Recipient</label>
          <select
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 outline-none focus:border-[#185FA5]"
          >
            {RECIPIENTS.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-600">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            className="mt-1 w-full resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 outline-none focus:border-[#185FA5]"
          />
        </div>
      </div>
    </EmployerModal>
  )
}
