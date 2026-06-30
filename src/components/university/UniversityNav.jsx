import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Bell,
  ChevronDown,
  GraduationCap,
  Handshake,
  HelpCircle,
  Home,
  ShieldCheck,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react'
import { universityNavTabs, universityUser } from '../../data/universityMockData'

const ICONS = {
  home: Home,
  people: Users,
  target: Target,
  trend: TrendingUp,
  handshake: Handshake,
  shield: ShieldCheck,
}

export default function UniversityNav() {
  const location = useLocation()

  return (
    <header className="flex h-16 w-full shrink-0 items-center justify-between border-b border-blue-100/70 bg-white/86 px-6 shadow-[0_10px_30px_rgba(24,95,165,0.06)] backdrop-blur-xl">
      <div className="flex items-center gap-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#185FA5] text-sm font-bold text-white shadow-[0_10px_22px_rgba(24,95,165,0.22)]">
            <GraduationCap className="h-4.5 w-4.5" />
          </span>
          <div className="leading-tight">
            <p className="text-base font-bold text-gray-900">CareerOS</p>
            <p className="text-[11px] text-gray-500">University Workspace</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-5 text-sm font-medium text-[#52607D] xl:flex">
          {universityNavTabs.map((tab) => {
            const Icon = ICONS[tab.icon] || Home
            const isActive = location.pathname === tab.to
            return (
              <Link
                key={tab.label}
                to={tab.to}
                className={`flex items-center gap-1.5 border-b-2 pb-1.5 transition ${
                  isActive ? 'border-[#185FA5] text-[#185FA5]' : 'border-transparent hover:text-gray-900'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {tab.label}
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <button type="button" className="relative text-[#687492] hover:text-[#185FA5]">
          <Bell className="h-5 w-5" />
          <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white">4</span>
        </button>
        <button type="button" className="text-[#687492] hover:text-[#185FA5]">
          <HelpCircle className="h-5 w-5" />
        </button>
        <button type="button" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700 ring-2 ring-white">
            {universityUser.initials}
          </span>
          <div className="hidden text-left leading-tight sm:block">
            <p className="text-sm font-semibold text-gray-800">{universityUser.name}</p>
            <p className="text-[11px] text-gray-500">
              {universityUser.title} &middot; {universityUser.institution}
            </p>
          </div>
          <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
        </button>
      </div>
    </header>
  )
}
