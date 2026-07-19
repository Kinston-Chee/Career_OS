import React from 'react'
import { X } from 'lucide-react'

// Shared modal shell for the Employer Workspace demo (manager brief, schedule
// interview, compose message, export summary). Mirrors the glassmorphism
// system used across the workspace. Mock only — no backend calls.
export default function EmployerModal({ title, subtitle, icon, onClose, children, maxWidth = 'max-w-[560px]', footer }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/25 p-4 backdrop-blur-sm transition-opacity duration-200"
      onClick={onClose}
    >
      <div
        className={`employer-glass-card relative flex max-h-[86vh] w-full ${maxWidth} flex-col overflow-hidden !bg-white/95 p-0 shadow-2xl`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 border-b border-blue-100/70 px-6 py-4">
          <div className="flex items-center gap-2.5">
            {icon ? (
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#185FA5]">
                {icon}
              </span>
            ) : null}
            <div>
              <h2 className="text-base font-bold text-gray-900">{title}</h2>
              {subtitle ? <p className="mt-0.5 text-xs font-medium text-slate-500">{subtitle}</p> : null}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>

        {footer ? <div className="border-t border-blue-100/70 px-6 py-4">{footer}</div> : null}
      </div>
    </div>
  )
}
