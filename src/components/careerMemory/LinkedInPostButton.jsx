import React, { useEffect, useRef, useState } from 'react'

// Inline LinkedIn "in" glyph — used instead of lucide-react's icon because the
// pinned lucide-react version does not export `Linkedin`.
function LinkedInGlyph({ size = 14 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.024-3.037-1.852-3.037-1.853 0-2.136 1.446-2.136 2.94v5.666H9.351V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.114 20.452H3.558V9h3.556v11.452zM22.225 0H1.771C.792 0 0 .775 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .775 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

// Button that shows a "Post on LinkedIn" tooltip on hover and, on click,
// pops a small demo confirmation card near the cursor. No real posting.
export default function LinkedInPostButton({ entry }) {
  const [confirm, setConfirm] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => () => window.clearTimeout(timerRef.current), [])

  const handleClick = (event) => {
    event.stopPropagation()
    setConfirm(true)
    window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => setConfirm(false), 3200)
  }

  const handleKeyDown = (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    handleClick(event)
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

      {confirm ? (
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
            <p className="text-sm font-bold text-[#11194a]">Draft opened on LinkedIn</p>
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
        </div>
      ) : null}
    </>
  )
}
