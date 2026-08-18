import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import LinkedInPostDraft, { LinkedInGlyph } from './LinkedInPostDraft'

// Button that shows a "Post on LinkedIn" tooltip on hover and, on click, opens a
// draft panel for the user to review, edit, and approve. No real posting.
export default function LinkedInPostButton({ entry }) {
  const [draftOpen, setDraftOpen] = useState(false)
  const [confirm, setConfirm] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => () => window.clearTimeout(timerRef.current), [])

  const handleClick = (event) => {
    event.stopPropagation()
    setDraftOpen(true)
  }

  const handleKeyDown = (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    handleClick(event)
  }

  const handleApprove = () => {
    setDraftOpen(false)
    setConfirm(true)
    window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => setConfirm(false), 3200)
  }

  const title = entry?.title || 'this experience'

  return (
    <>
      <span
        role="button"
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-label="Post on LinkedIn"
        // Native tooltip so the hover hint works even on touch devices.
        title="Post on LinkedIn"
        className="group/li relative inline-flex items-center justify-center rounded-full p-1.5 text-[#0A66C2] transition hover:bg-[#0A66C2]/10"
      >
        <LinkedInGlyph size={14} />
        {/* Custom hover pill — appears above the icon */}
        <span className="pointer-events-none absolute bottom-full left-1/2 mb-1 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#11194a] px-2 py-0.5 text-[10px] font-semibold text-white opacity-0 shadow-md transition-opacity duration-150 group-hover/li:opacity-100">
          Post on LinkedIn
        </span>
      </span>

      {draftOpen ? (
        <LinkedInPostDraft
          entry={entry}
          onApprove={handleApprove}
          onClose={() => setDraftOpen(false)}
        />
      ) : null}

      {/* Portalled for the same reason as the draft: the card's backdrop-blur
          would pin this fixed toast to the card instead of the viewport. */}
      {confirm ? createPortal(
        <div
          role="status"
          aria-live="polite"
          onClick={(e) => e.stopPropagation()}
          className="fixed bottom-5 right-5 z-[60] flex max-w-[320px] items-start gap-3 rounded-2xl border border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.95),rgba(239,246,255,0.85))] px-4 py-3 shadow-[0_18px_44px_rgba(10,102,194,0.18),inset_0_1px_0_rgba(255,255,255,0.9)] ring-1 ring-[#0A66C2]/20 backdrop-blur-xl"
        >
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0A66C2]/10 text-[#0A66C2]">
            <LinkedInGlyph size={16} />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-bold text-[#11194a]">Post approved</p>
            <p className="mt-0.5 text-xs font-medium leading-5 text-[#637094]">
              &ldquo;{title}&rdquo; Post successfully created. You can view it on LinkedIn now.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setConfirm(false)}
            className="shrink-0 rounded-full p-1 text-[#9aa6c3] transition hover:bg-blue-50 hover:text-blue-700"
            aria-label="Dismiss"
          >
            ✕
          </button>
        </div>,
        document.body,
      ) : null}
    </>
  )
}
