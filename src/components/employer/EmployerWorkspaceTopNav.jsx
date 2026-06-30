import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Bell, ChevronDown, Search } from 'lucide-react'

const NAV_ITEMS = [
  { label: 'Home', path: '/employer/home' },
  { label: 'Jobs', path: '/employer/marketplace' },
  { label: 'Candidates', path: '/employer/talent' },
  { label: 'Events', path: null },
  { label: 'Analytics', path: null },
  { label: 'Engage', path: '/employer/posting' },
  { label: 'Talent Pools', path: null },
]

export default function EmployerWorkspaceTopNav({ active = 'Home' }) {
  const navigate = useNavigate()

  return (
    <header className="employer-glass-nav flex h-16 w-full shrink-0 items-center justify-between px-6">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">C</span>
          <span className="text-base font-semibold text-gray-900">CareerOS</span>
        </div>
        <button type="button" className="flex items-center gap-1 rounded-full bg-white/70 px-3 py-1.5 text-xs font-semibold text-blue-700 ring-1 ring-blue-100/80">
          Employer Workspace
          <ChevronDown className="h-3.5 w-3.5" />
        </button>
        <nav className="hidden items-center gap-6 text-sm font-medium text-gray-500 lg:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = item.label === active
            return (
              <button
                key={item.label}
                type="button"
                disabled={!item.path}
                onClick={() => item.path && navigate(item.path)}
                className={`border-b-2 pb-1 transition ${
                  isActive
                    ? 'border-blue-600 text-slate-950'
                    : `border-transparent ${item.path ? 'hover:text-slate-900' : 'cursor-default'}`
                }`}
              >
                {item.label}
              </button>
            )
          })}
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <button type="button" className="text-gray-400 hover:text-gray-600">
          <Search className="h-5 w-5" />
        </button>
        <button type="button" className="relative text-gray-400 hover:text-gray-600">
          <Bell className="h-5 w-5" />
          <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-semibold text-white">12</span>
        </button>
        <div className="flex items-center gap-2 rounded-full bg-white/60 px-2 py-1 ring-1 ring-blue-100/70">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">G</span>
          <div className="leading-tight">
            <p className="text-xs font-semibold text-gray-800">Google</p>
            <p className="text-[10px] text-gray-400">Malaysia</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700">EK</span>
          <div className="leading-tight">
            <p className="text-xs font-semibold text-gray-800">Edwin Khoo</p>
            <p className="text-[10px] text-gray-400">HR Manager</p>
          </div>
        </div>
      </div>
    </header>
  )
}
