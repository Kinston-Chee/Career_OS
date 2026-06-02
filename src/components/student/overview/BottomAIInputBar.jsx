import React from 'react'

export default function BottomAIInputBar() {
  return (
    <div className="sticky bottom-4 z-20 mx-auto mt-6 max-w-3xl rounded-3xl border border-violet-100 bg-white/95 p-2 shadow-[0_18px_50px_rgba(88,63,188,0.16)] backdrop-blur-xl">
      <label className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-600 text-sm font-bold text-white">AI</span>
        <input
          className="h-11 min-w-0 flex-1 bg-transparent text-sm text-[#11104a] outline-none placeholder:text-slate-400"
          placeholder="Tell me what you did today, or ask anything about your career..."
        />
        <button type="button" className="h-11 rounded-2xl bg-violet-600 px-5 text-sm font-bold text-white shadow-lg shadow-violet-200">
          Send
        </button>
      </label>
    </div>
  )
}

