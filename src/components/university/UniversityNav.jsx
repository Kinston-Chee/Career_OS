import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Bell,
  ChevronDown,
  HelpCircle,
} from 'lucide-react'
import { universityNavTabs, universityUser } from '../../data/universityMockData'

export default function UniversityNav() {
  const location = useLocation()

  return (
    <header className="employer-glass-nav flex h-16 w-full shrink-0 items-center justify-between gap-4 px-6">
      <div className="flex min-w-0 flex-1 items-center gap-5">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#185FA5] to-[#4d9fff] text-sm font-bold text-white shadow-sm shadow-blue-300/40">
            C
          </span>
          <div className="leading-tight">
            <p className="text-base font-bold text-slate-950">CareerOS</p>
            <p className="text-[11px] text-slate-500">University Workspace</p>
          </div>
        </Link>

        <nav className="hidden min-w-0 max-w-[calc(100vw-430px)] items-center gap-1.5 overflow-x-auto pr-2 text-[13px] font-medium text-slate-500 [scrollbar-width:none] xl:flex">
          {universityNavTabs.map((tab) => {
            const isActive = location.pathname === tab.to
            return (
              <Link
                key={tab.label}
                to={tab.to}
                className={`flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-2 transition ${
                  isActive ? 'bg-white/75 text-[#185FA5] ring-1 ring-blue-100/80' : 'hover:bg-white/45 hover:text-slate-800'
                }`}
              >
                {tab.label}
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <button type="button" className="relative text-slate-400 transition hover:text-slate-600">
          <Bell className="h-5 w-5" />
          <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white">4</span>
        </button>
        <button type="button" className="text-slate-400 transition hover:text-slate-600">
          <HelpCircle className="h-5 w-5" />
        </button>
        <button type="button" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/75 text-xs font-semibold text-blue-700 ring-1 ring-blue-100">
            {universityUser.initials}
          </span>
          <div className="hidden max-w-[220px] text-left leading-tight sm:block">
            <p className="truncate text-sm font-semibold text-slate-800">{universityUser.name}</p>
            <p className="truncate text-[11px] text-slate-500" title={`${universityUser.title} · ${universityUser.institution}`}>
              {universityUser.title} &middot; {universityUser.institution}
            </p>
          </div>
          <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
        </button>
      </div>
    </header>
  )
}
