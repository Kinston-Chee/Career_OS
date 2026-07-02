import React from 'react'
import { Check, Loader2 } from 'lucide-react'

export default function AIBriefingStrip({ posting, hasFullData, contactStatus, onContactTop3, onConfirmContact, onCancelContact, onSeeAllShortlisted }) {
  const text = hasFullData
    ? "8 of 47 applicants meet your hiring criteria for Software Engineering Intern. Top pick is Ivan Lim — 96% match with verified project evidence and available June. 2 candidates have expiring availability windows — act today."
    : `Loading applicants for ${posting.title}…`

  return (
    <section
      className="employer-glass-card flex flex-wrap items-center gap-4 p-4"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#534AB7] text-sm font-semibold text-white">
        n_n
      </span>
      <p className="min-w-0 flex-1 text-sm text-gray-800">{text}</p>
      {hasFullData ? (
        <div className="flex shrink-0 items-center gap-2">
          {contactStatus === 'confirm' ? (
            <div className="flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 ring-1 ring-amber-200">
              <span className="text-xs font-medium text-amber-700">Message Ivan, Nur Alya &amp; Marcus?</span>
              <button type="button" onClick={onConfirmContact} className="rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white hover:bg-green-700">
                Confirm
              </button>
              <button type="button" onClick={onCancelContact} className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-500 ring-1 ring-gray-200 hover:bg-gray-50">
                Cancel
              </button>
            </div>
          ) : contactStatus === 'sending' ? (
            <span className="employer-primary-button flex items-center gap-1.5 px-5 py-2 text-sm opacity-80">
              <Loader2 className="h-3.5 w-3.5 animate-spin" /> Contacting…
            </span>
          ) : contactStatus === 'done' ? (
            <span className="flex items-center gap-1.5 rounded-full bg-green-600 px-5 py-2 text-sm font-semibold text-white">
              <Check className="h-3.5 w-3.5" /> Contacted top 3
            </span>
          ) : (
            <button
              type="button"
              onClick={onContactTop3}
              className="employer-primary-button px-5 py-2 text-sm"
            >
              Contact top 3 now
            </button>
          )}
          <button
            type="button"
            onClick={onSeeAllShortlisted}
            className="employer-secondary-button px-5 py-2 text-sm"
          >
            See all 8 shortlisted
          </button>
        </div>
      ) : null}
    </section>
  )
}
