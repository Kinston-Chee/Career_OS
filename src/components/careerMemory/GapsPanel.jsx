import React from 'react'
import { AlertTriangle, ArrowRight } from 'lucide-react'

// Every row is a button: it opens the fix for that gap — the edit form of the
// entry it refers to, or a prefilled Add Experience form when the experience
// isn't logged yet.
export default function GapsPanel({ gaps, onFix }) {
  return (
    <section className="rounded-xl border border-[#e2eaf8] bg-white px-5 py-6 shadow-[0_8px_22px_rgba(44,76,142,0.07)]">
      <h2 className="mb-4 text-base font-bold text-[#11194a]">Gaps in your story</h2>

      <div className="space-y-1">
        {gaps.map((gap) => (
          <button
            key={gap.id}
            type="button"
            onClick={() => onFix?.(gap)}
            aria-label={`Fix gap: ${gap.text}`}
            className="group flex w-full items-start gap-2.5 rounded-lg px-2 py-2.5 text-left transition hover:bg-blue-50/60 focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            <AlertTriangle size={16} className="mt-0.5 flex-shrink-0 text-orange-500" strokeWidth={2.2} />
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-medium leading-relaxed text-[#4d5c7d] group-hover:text-[#11194a]">
                {gap.text}
              </span>
              {gap.action ? (
                <span className="mt-0.5 block text-[11px] font-semibold uppercase tracking-wide text-[#9aa6c3]">
                  {gap.action}
                </span>
              ) : null}
            </span>
            <span className="mt-0.5 flex flex-shrink-0 items-center gap-1 text-sm font-bold text-blue-600 group-hover:text-blue-700">
              Fix
              <ArrowRight size={14} strokeWidth={2.6} className="transition-transform group-hover:translate-x-0.5" />
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}
