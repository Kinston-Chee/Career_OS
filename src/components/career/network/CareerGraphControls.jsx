import React from 'react'

export default function CareerGraphControls() {
  return (
    <>
      <div className="absolute right-5 top-5 z-20 flex items-center gap-3">
        <button type="button" className="rounded-2xl border border-violet-100 bg-white/90 px-4 py-3 text-xs font-bold text-violet-700 shadow-sm">
          View as List
        </button>
        <button type="button" className="flex h-11 w-11 items-center justify-center rounded-2xl border border-violet-100 bg-white/90 text-sm font-bold text-violet-700 shadow-sm">
          ↗
        </button>
      </div>
      <div className="absolute bottom-8 right-5 z-20 flex items-center gap-3">
        <div className="flex h-11 items-center overflow-hidden rounded-2xl border border-violet-100 bg-white/90 text-xs font-bold text-slate-500 shadow-sm">
          <button type="button" className="h-full px-4">-</button>
          <span className="border-x border-violet-100 px-4">100%</span>
          <button type="button" className="h-full px-4">+</button>
        </div>
        <button type="button" className="flex h-11 w-11 items-center justify-center rounded-2xl border border-violet-100 bg-white/90 text-sm font-bold text-violet-700 shadow-sm">
          ↻
        </button>
      </div>
    </>
  )
}

