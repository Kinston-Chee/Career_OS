import React from 'react'
import { BarChart3, Bot, Briefcase, CalendarDays, ChevronRight, FileText, Mic } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const ICONS = {
  Briefcase,
  FileText,
  Mic,
  BarChart3,
  CalendarDays,
  Bot,
}

export default function QuickActions({ actions, onAction }) {
  const navigate = useNavigate()

  return (
    <section>
      <h2 className="mb-3 text-base font-bold text-[#11194a]">Quick actions</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {actions.map((action) => {
          const Icon = ICONS[action.icon] ?? Briefcase
          return (
            <button
              key={action.id}
              type="button"
              onClick={() => {
                if (action.title === 'Ask my companion') navigate('/student/ai-companion')
                else onAction?.(action)
              }}
              className="flex min-h-[72px] items-center gap-3 rounded-xl border border-[#e2eaf8] bg-white px-4 py-3 text-left shadow-[0_7px_18px_rgba(44,76,142,0.06)] transition duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[0_12px_24px_rgba(44,76,142,0.10)] focus:outline-none focus:ring-4 focus:ring-blue-100"
            >
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-blue-100 bg-blue-50 text-blue-600">
                <Icon size={20} strokeWidth={2.2} />
              </span>
              <span className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-[#11194a]">{action.title}</p>
                <p className="mt-0.5 truncate text-xs font-medium text-[#6a7899]">{action.subtitle}</p>
              </span>
              <ChevronRight size={16} className="text-[#49618f]" />
            </button>
          )
        })}
      </div>
    </section>
  )
}
