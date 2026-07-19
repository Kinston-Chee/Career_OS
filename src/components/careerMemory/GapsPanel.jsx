import React from 'react'
import { AlertTriangle } from 'lucide-react'

export default function GapsPanel({ gaps }) {
  return (
    <section className="rounded-xl border border-[#e2eaf8] bg-white px-5 py-6 shadow-[0_8px_22px_rgba(44,76,142,0.07)]">
      <h2 className="mb-5 text-base font-bold text-[#11194a]">Gaps in your story</h2>

      <div className="space-y-5">
        {gaps.map((gap) => (
          <div key={gap.id} className="flex items-start gap-2.5 py-1">
            <AlertTriangle size={16} className="mt-0.5 flex-shrink-0 text-orange-500" strokeWidth={2.2} />
            <p className="flex-1 text-sm font-medium leading-relaxed text-[#4d5c7d]">{gap.text}</p>
            <button type="button" className="flex-shrink-0 text-sm font-bold text-blue-600 hover:text-blue-700">
              Fix →
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}
