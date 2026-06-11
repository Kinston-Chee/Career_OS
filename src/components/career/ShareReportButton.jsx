import React, { useState } from 'react'

export default function ShareReportButton() {
  const [copied, setCopied] = useState(false)

  function handleShare() {
    const url = window.location.href
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true)
        window.setTimeout(() => setCopied(false), 2000)
      })
    } else {
      // Fallback
      window.prompt('Copy this link:', url)
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-blue-100 bg-white px-4 text-sm font-semibold text-blue-700 shadow-sm transition-all duration-200 hover:bg-blue-50 sm:w-auto"
    >
      {copied ? (
        <>
          <svg className="h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Copied!
        </>
      ) : (
        <>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
          </svg>
          Share Report
        </>
      )}
    </button>
  )
}
