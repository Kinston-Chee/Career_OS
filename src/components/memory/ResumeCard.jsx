import React, { useState } from 'react'
import { Check, Download, FileText, Sparkles } from 'lucide-react'

export default function ResumeCard() {
  const [state, setState] = useState('idle')

  function handleGenerate() {
    setState('generating')
    window.setTimeout(() => setState('done'), 1800)
  }

  function handleDownload() {
    window.alert('Resume PDF download will be available once backend is connected.')
  }

  return (
    <section className="group rounded-3xl border border-violet-100/80 bg-white/92 p-5 shadow-[0_18px_44px_rgba(88,63,188,0.08)] transition-all duration-300 hover:shadow-[0_22px_54px_rgba(88,63,188,0.14)]">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-violet-100 bg-violet-50 text-violet-600 shadow-sm transition-transform duration-300 group-hover:scale-105">
          <FileText size={20} strokeWidth={2} />
        </div>
        <div>
          <h3 className="text-base font-semibold text-[#11104a]">Summarise into Resume</h3>
          <p className="text-xs font-medium text-slate-500">AI-powered resume generation</p>
        </div>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-600">
        Transform your career memories, skills, and achievements into a professional resume ready
        for applications.
      </p>

      {state === 'idle' && (
        <div className="mt-5 space-y-3">
          <button
            type="button"
            onClick={handleGenerate}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-200 transition-all duration-200 hover:from-violet-700 hover:to-indigo-700 hover:shadow-violet-300"
          >
            <Sparkles size={17} strokeWidth={2} />
            Generate Resume
          </button>
          <button
            type="button"
            onClick={handleDownload}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-violet-200 bg-white px-5 py-3 text-sm font-bold text-violet-700 shadow-sm transition-all duration-200 hover:bg-violet-50"
          >
            <Download size={16} strokeWidth={2} />
            Download PDF
          </button>
        </div>
      )}

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

      {state === 'done' && (
        <div className="mt-5 space-y-3">
          <div className="flex items-center gap-2 rounded-2xl bg-emerald-50 p-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <Check size={16} strokeWidth={2} />
            </span>
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
            <Download size={16} strokeWidth={2} />
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
