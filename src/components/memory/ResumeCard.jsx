import React, { useState } from 'react'

export default function ResumeCard() {
  const [state, setState] = useState('idle') // idle | generating | done

  function handleGenerate() {
    setState('generating')
    // Simulated generation delay — placeholder, no backend
    window.setTimeout(() => setState('done'), 1800)
  }

  function handleDownload() {
    // Placeholder — no actual PDF generation
    window.alert('Resume PDF download will be available once backend is connected.')
  }

  return (
    <section className="group rounded-3xl border border-violet-100/80 bg-white/92 p-5 shadow-[0_18px_44px_rgba(88,63,188,0.08)] transition-all duration-300 hover:shadow-[0_22px_54px_rgba(88,63,188,0.14)]">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-500 text-lg shadow-lg shadow-violet-200 transition-transform duration-300 group-hover:scale-105">
          📄
        </div>
        <div>
          <h3 className="text-base font-semibold text-[#11104a]">Summarise into Resume</h3>
          <p className="text-xs font-medium text-slate-500">AI-powered resume generation</p>
        </div>
      </div>

      {/* Description */}
      <p className="mt-4 text-sm leading-6 text-slate-600">
        Transform your career memories, skills, and achievements into a professional resume ready
        for applications.
      </p>

      {/* State: Idle */}
      {state === 'idle' && (
        <div className="mt-5 space-y-3">
          <button
            type="button"
            onClick={handleGenerate}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-200 transition-all duration-200 hover:from-violet-700 hover:to-indigo-700 hover:shadow-violet-300"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="animate-pulse">
              <path d="M9 1l1.76 5.24L16 8l-5.24 1.76L9 15l-1.76-5.24L2 8l5.24-1.76L9 1z" fill="currentColor" fillOpacity="0.9" />
            </svg>
            Generate Resume
          </button>
          <button
            type="button"
            onClick={handleDownload}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-violet-200 bg-white px-5 py-3 text-sm font-bold text-violet-700 shadow-sm transition-all duration-200 hover:bg-violet-50"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2v8m0 0l-3-3m3 3l3-3M3 12h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Download PDF
          </button>
        </div>
      )}

      {/* State: Generating */}
      {state === 'generating' && (
        <div className="mt-5 flex flex-col items-center py-4">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 animate-bounce rounded-full bg-violet-500" style={{ animationDelay: '0ms' }} />
            <div className="h-2 w-2 animate-bounce rounded-full bg-violet-400" style={{ animationDelay: '150ms' }} />
            <div className="h-2 w-2 animate-bounce rounded-full bg-violet-300" style={{ animationDelay: '300ms' }} />
          </div>
          <p className="mt-3 text-xs font-semibold text-violet-700">Generating your resume...</p>
          <p className="mt-1 text-[11px] text-slate-400">Analysing 14 career memories</p>
        </div>
      )}

      {/* State: Done */}
      {state === 'done' && (
        <div className="mt-5 space-y-3">
          <div className="flex items-center gap-2 rounded-2xl bg-emerald-50 p-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-sm">✓</span>
            <div>
              <p className="text-xs font-bold text-emerald-700">Resume ready!</p>
              <p className="text-[11px] text-emerald-600">Based on your latest career memories</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleDownload}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-200 transition-all duration-200 hover:from-violet-700 hover:to-indigo-700"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2v8m0 0l-3-3m3 3l3-3M3 12h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Download PDF
          </button>
          <button
            type="button"
            onClick={() => setState('idle')}
            className="w-full rounded-2xl border border-violet-200 bg-white px-5 py-3 text-sm font-bold text-violet-700 shadow-sm transition-all duration-200 hover:bg-violet-50"
          >
            Regenerate
          </button>
        </div>
      )}
    </section>
  )
}
