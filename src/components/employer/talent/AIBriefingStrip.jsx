import React from 'react'

export default function AIBriefingStrip({ posting, hasFullData, onContactTop3, onSeeAllShortlisted }) {
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
          <button
            type="button"
            onClick={onContactTop3}
            className="employer-primary-button px-5 py-2 text-sm"
          >
            Contact top 3 now
          </button>
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
