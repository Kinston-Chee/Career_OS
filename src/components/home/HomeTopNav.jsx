import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Bell } from 'lucide-react'

const TABS = [
  { label: 'Home', to: '/student/home' },
  { label: 'Career Memory', to: '/student/profile' },
  { label: 'Career Intelligence', to: '/student/intelligence' },
  { label: 'Skill Development', to: '/student/skill-development' },
  { label: 'Opportunities', to: '/student/opportunities' },
  { label: 'Communities', to: '/student/communities' },
  { label: 'AI Companion', to: '/student/ai-companion' },
]

export default function HomeTopNav({ user, readiness }) {
  const location = useLocation()

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-[#e2eaf8] bg-white/95 px-4 py-3 backdrop-blur sm:px-6 lg:px-8">
      <Link to="/" className="flex items-center gap-2 text-base font-bold text-[#11194a]">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1f65d8] text-sm font-bold text-white shadow-[0_8px_16px_rgba(31,101,216,0.18)]">C</span>
        CareerOS
      </Link>

      <nav className="hidden items-center gap-6 md:flex">
        {TABS.map((tab) => {
          const isActive = location.pathname === tab.to
          return (
            <Link
              key={tab.label}
              to={tab.to}
              className={`relative py-1 text-sm font-medium transition-colors ${
                isActive ? 'text-[#1f65d8]' : 'text-[#667394] hover:text-[#11194a]'
              }`}
            >
              {tab.label}
              {isActive && <span className="absolute -bottom-[13px] left-0 right-0 h-0.5 rounded-full bg-[#1f65d8]" />}
            </Link>
          )
        })}
      </nav>

      <div className="flex items-center gap-4">
        <Link to="/employer/home" className="hidden text-xs font-medium text-[#667394] hover:text-blue-700 sm:inline">
          Switch to Employer View
        </Link>
        <button type="button" className="relative rounded-full p-2 text-[#667394] hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100">
          <Bell size={18} />
          <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-rose-500" />
        </button>
        <Link to="/student/account" className="flex items-center gap-2 rounded-lg transition hover:bg-blue-50/60">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e7eefb] text-xs font-bold text-[#37517f]">
            {user.avatarInitials}
          </span>
          <div className="hidden text-left sm:block">
            <p className="text-sm font-bold leading-tight text-[#11194a]">{user.name}</p>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> {readiness}% Ready
            </span>
          </div>
        </Link>
      </div>
    </header>
  )
}
