import React from 'react'

export default function AICompanionCard() {
  return (
    <section className="mt-5 overflow-hidden rounded-3xl border border-violet-100 bg-white/75 p-4 shadow-[0_18px_44px_rgba(88,63,188,0.12)]">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-[#11104a]">AI Career Companion</h2>
          <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-emerald-600">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Online
          </p>
        </div>
      </div>
      <div className="mt-4 flex items-end gap-3">
        <div className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-[2rem] bg-gradient-to-br from-violet-100 via-white to-indigo-100 shadow-inner">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#11104a] text-lg font-bold text-cyan-300">AI</div>
          <span className="absolute bottom-3 left-3 h-5 w-5 rounded-full bg-violet-300" />
          <span className="absolute bottom-3 right-3 h-5 w-5 rounded-full bg-violet-300" />
        </div>
        <p className="rounded-2xl border border-violet-100 bg-white px-3 py-3 text-xs leading-5 text-[#11104a]">
          Hi Shirley! &#128075; How can I help with your career today?
        </p>
      </div>
      <button type="button" className="mt-4 h-12 w-full rounded-2xl bg-violet-600 text-sm font-bold text-white shadow-lg shadow-violet-200">
        Chat with AI
      </button>
    </section>
  )
}

