import React from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const navItems = [
  { label: 'Overview', path: '/university/overview', aliases: ['/university'] },
  { label: 'Program-Market Alignment', path: '/university/curriculum', aliases: ['/university/curriculum-market-alignment'] },
  { label: 'Alumni Signals', path: '/university/signals', aliases: [] },
  { label: 'Student Readiness', path: '/university/readiness', aliases: [] },
  { label: 'Collaboration Marketplace', path: '/university/collaboration', aliases: ['/university/society-corporate-marketplace'] },
  { label: 'Reports', path: '/university/reports', aliases: [] },
]

export default function UniversitySidebar() {
  const location = useLocation()

  return (
    <aside className="hidden h-screen w-72 shrink-0 border-r border-white/70 bg-white/85 px-5 py-6 shadow-[8px_0_30px_rgba(15,23,42,0.03)] backdrop-blur-xl lg:flex lg:flex-col">
      <div className="mb-9 flex items-center gap-3">
        <Link to="/" className="flex h-11 w-11 items-center justify-center rounded-[8px] bg-gradient-to-br from-blue-500 to-violet-500 text-xl font-semibold text-white shadow-lg shadow-blue-100">
          C
        </Link>
        <div>
          <Link to="/" className="text-xl font-semibold text-slate-950">CareerOS</Link>
          <p className="mt-1 text-sm text-blue-600">University Workspace</p>
        </div>
      </div>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `block rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                isActive || item.aliases.includes(location.pathname)
                  ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-100'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
