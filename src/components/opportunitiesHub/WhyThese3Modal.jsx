import React from 'react'
import { X } from 'lucide-react'

const BORDER_TONES = {
  emerald: 'border-emerald-500',
  blue: 'border-blue-500',
  orange: 'border-orange-500',
}

export default function WhyThese3Modal({ sections, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 transition-opacity duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[480px] rounded-2xl bg-white p-6 shadow-lg transition-all duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1.5 text-[#9aa6c3] transition hover:bg-gray-100 hover:text-[#11194a]"
        >
          <X size={16} />
        </button>

        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-violet-100">
            <span className="text-[10px] font-bold tracking-widest text-violet-600">n_n</span>
          </span>
          <h2 className="text-base font-bold text-[#11194a]">Why I picked these for you</h2>
        </div>

        <div className="mt-5 space-y-4">
          {sections.map((section) => (
            <div key={section.id} className={`border-l-4 ${BORDER_TONES[section.tone] ?? BORDER_TONES.blue} pl-3.5`}>
              <p className="text-sm font-bold text-[#11194a]">{section.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-[#4d5c7d]">{section.reason}</p>
            </div>
          ))}
        </div>

        <p className="mt-5 text-center text-xs font-medium text-[#9aa6c3]">Based on your Career Memory · Updated 2h ago</p>

        <button
          type="button"
          onClick={onClose}
          className="mt-4 w-full rounded-lg bg-blue-600 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700"
        >
          Got it
        </button>
      </div>
    </div>
  )
}
