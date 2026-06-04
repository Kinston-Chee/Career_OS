import React, { useEffect } from 'react'

// Each resource section's heading, color, and inline SVG icon. Adding a new
// resource type later is just an extra entry below + an extra field on the
// resources object the AI returns.
const RESOURCE_SECTIONS = [
  {
    key: 'books',
    label: 'Books',
    accent: 'text-indigo-600 bg-indigo-50',
    icon: (
      <path
        d="M4 5.5A2.5 2.5 0 0 1 6.5 3H19v15H6.5a2.5 2.5 0 0 0 0 5H19v-3M4 5.5V21M4 5.5c0 1.38 1.12 2.5 2.5 2.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    key: 'courses',
    label: 'Courses',
    accent: 'text-blue-600 bg-blue-50',
    icon: (
      <>
        <path d="M2 8.5 12 4l10 4.5L12 13Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M6 10.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M22 8.5V14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </>
    ),
  },
  {
    key: 'certifications',
    label: 'Certifications',
    accent: 'text-amber-600 bg-amber-50',
    icon: (
      <>
        <circle cx="12" cy="9" r="5" stroke="currentColor" strokeWidth="1.6" />
        <path d="m8.5 13-1.5 7 5-2.5 5 2.5-1.5-7" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </>
    ),
  },
  {
    key: 'videos',
    label: 'Videos',
    accent: 'text-rose-600 bg-rose-50',
    icon: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="3" stroke="currentColor" strokeWidth="1.6" />
        <path d="m10 9 5 3-5 3Z" fill="currentColor" />
      </>
    ),
  },
  {
    key: 'articles',
    label: 'Articles',
    accent: 'text-emerald-600 bg-emerald-50',
    icon: (
      <>
        <path d="M6 3h9l4 4v14H6z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M14 3v5h5M9 13h7M9 17h7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </>
    ),
  },
]

function ResourceLink({ item }) {
  return (
    <a
      href={item.url || '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start justify-between gap-3 rounded-lg border border-transparent px-3 py-2 transition hover:border-slate-200 hover:bg-slate-50"
    >
      <div className="min-w-0">
        <div className="truncate text-sm font-medium text-slate-900 group-hover:text-blue-700">
          {item.title}
        </div>
        {item.meta && <div className="mt-0.5 truncate text-xs text-slate-500">{item.meta}</div>}
      </div>
      <svg
        className="mt-1 h-3.5 w-3.5 shrink-0 text-slate-400 group-hover:text-blue-600"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M7 17 17 7M9 7h8v8"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  )
}

function ResourceSection({ section, items }) {
  if (!items || items.length === 0) return null
  return (
    <section>
      <div className="mb-1.5 flex items-center gap-2">
        <span className={`inline-flex h-6 w-6 items-center justify-center rounded-md ${section.accent}`}>
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
            {section.icon}
          </svg>
        </span>
        <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500">{section.label}</h4>
        <span className="text-[11px] font-medium text-slate-400">({items.length})</span>
      </div>
      <div className="space-y-0.5">
        {items.map((item) => (
          <ResourceLink key={item.title} item={item} />
        ))}
      </div>
    </section>
  )
}

/**
 * RoadmapStepResourcesModal
 *
 * Small centered popup that lists curated resources for a single roadmap step.
 * The component stays on the current page (it's a modal overlay, not a route).
 *
 * Props:
 * - step: { title, action?, resources?: { books, courses, certifications, videos, articles } }
 * - isOpen: boolean
 * - onClose: () => void
 *
 * Each resource entry is { title, meta?, url }. Replace the hardcoded values in
 * mockData.js → STEP_RESOURCES with AI-generated content from the backend.
 */
export default function RoadmapStepResourcesModal({ step, isOpen, onClose }) {
  // Close on Escape so the popup feels native and doesn't trap focus.
  useEffect(() => {
    if (!isOpen) return undefined
    const handler = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  if (!isOpen || !step) return null

  const resources = step.resources ?? {}
  const totalCount = RESOURCE_SECTIONS.reduce(
    (sum, section) => sum + (resources[section.key]?.length ?? 0),
    0,
  )

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`Resources for ${step.title}`}
      onClick={onClose}
    >
      <div
        className="flex max-h-[80vh] w-full max-w-md flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="flex items-start justify-between gap-3 border-b border-slate-100 px-5 py-4">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-blue-600">Step Resources</p>
            <h3 className="mt-0.5 truncate text-base font-semibold text-slate-950">{step.title}</h3>
            {step.action && <p className="mt-0.5 truncate text-xs text-slate-500">{step.action}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close resources"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
              <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </header>

        <div className="flex-1 space-y-5 overflow-y-auto px-5 py-4">
          {totalCount === 0 ? (
            <p className="rounded-xl border border-dashed border-slate-200 bg-slate-50/60 p-6 text-center text-sm text-slate-500">
              No resources have been curated for this step yet. The AI coach will
              populate this section based on your target role.
            </p>
          ) : (
            RESOURCE_SECTIONS.map((section) => (
              <ResourceSection key={section.key} section={section} items={resources[section.key]} />
            ))
          )}
        </div>
      </div>
    </div>
  )
}
