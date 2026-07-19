import React from 'react'
import { Bot, ClipboardList, LayoutDashboard } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const OPTIONS = [
  { id: 'briefing', label: 'Briefing', path: '/university/overview', icon: ClipboardList },
  { id: 'office', label: 'AI Office', path: '/university/ai-office', icon: Bot },
  { id: 'combined', label: 'AI Home', path: '/university/ai-office-home', icon: LayoutDashboard },
]

export default function UniversityHomeSwitcher({ current }) {
  const navigate = useNavigate()

  return (
    <div className="flex overflow-hidden rounded-lg border border-[#D8E0F0] bg-white/80 p-0.5 shadow-sm">
      {OPTIONS.map((option) => {
        const Icon = option.icon
        const active = current === option.id
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => {
              if (!active) navigate(option.path)
            }}
            className={`flex items-center gap-1.5 rounded-md px-4 py-1.5 text-xs transition ${
              active
                ? 'bg-[#155EE8] font-bold text-white shadow-sm'
                : 'font-semibold text-[#415174] hover:bg-blue-50 hover:text-[#155EE8]'
            }`}
          >
            <Icon className="h-3.5 w-3.5" />
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
