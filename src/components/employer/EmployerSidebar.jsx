import React from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import SignOutButton from '../session/SignOutButton'

const navItems = [
  { label: 'Talent Discovery', path: '/employer/talent', aliases: ['/employer'], icon: 'search' },
  { label: 'Candidate Insights', path: '/employer/insights', aliases: [], icon: 'users' },
  { label: 'Create Engagement', path: '/employer/posting', aliases: [], icon: 'spark' },
]

const supportItems = [
  { label: 'Settings', path: '/employer/settings', aliases: [], icon: 'settings' },
  { label: 'Help', path: '/employer/help', aliases: [], icon: 'help' },
]

function SidebarIcon({ name }) {
  const paths = {
    search: <><circle cx="11" cy="11" r="5" /><path d="m15 15 4 4" /></>,
    users: <><path d="M8 18a4 4 0 0 1 8 0" /><circle cx="12" cy="9" r="3" /><path d="M4 18a3 3 0 0 1 4-3" /><path d="M16 15a3 3 0 0 1 4 3" /></>,
    spark: <><path d="M12 3v4" /><path d="M12 17v4" /><path d="M3 12h4" /><path d="M17 12h4" /><path d="m6 6 3 3" /><path d="m15 15 3 3" /><path d="m18 6-3 3" /><path d="m9 15-3 3" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M12 3v3" /><path d="M12 18v3" /><path d="m4.5 7.5 2.1 2.1" /><path d="m17.4 17.4 2.1 2.1" /><path d="M3 12h3" /><path d="M18 12h3" /><path d="m4.5 16.5 2.1-2.1" /><path d="m17.4 6.6 2.1-2.1" /></>,
    help: <><circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.6 2.6 0 0 1 5 1c0 2-2.5 2.1-2.5 4" /><path d="M12 17h.01" /></>,
    bookmark: <path d="M7 4h10v16l-5-3-5 3z" />,
    building: <><path d="M4 20h16" /><path d="M6 20V5h8v15" /><path d="M14 9h4v11" /><path d="M9 9h2" /><path d="M9 13h2" /></>,
  }

  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  )
}

export default function EmployerSidebar() {
  const location = useLocation()

  return (
    <aside className="hidden h-screen w-72 shrink-0 border-r border-slate-200/80 bg-white px-4 py-5 shadow-[8px_0_30px_rgba(15,23,42,0.03)] lg:flex lg:flex-col">
      <div className="mb-9 flex items-center gap-3 px-1">
        <Link to="/" className="flex h-11 w-11 items-center justify-center rounded-[8px] bg-gradient-to-br from-sky-400 to-blue-600 text-xl font-semibold text-white shadow-lg shadow-blue-100">
          C
        </Link>
        <div>
          <Link to="/" className="text-lg font-semibold leading-6 text-slate-950">CareerOS</Link>
          <p className="mt-0.5 text-sm font-normal text-slate-500">For Employers</p>
        </div>
      </div>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-[8px] px-4 py-3 text-sm font-medium leading-5 transition-all duration-200 ${
                isActive || item.aliases.includes(location.pathname)
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
              }`
            }
          >
            <span className="flex h-6 w-6 items-center justify-center"><SidebarIcon name={item.icon} /></span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="mt-10 space-y-2 border-t border-slate-100 pt-5">
        <NavLink
          to="/employer/talent"
          className="flex items-center justify-between rounded-[8px] px-4 py-3 text-sm font-normal leading-5 text-slate-600 hover:bg-slate-50"
        >
          <span className="flex items-center gap-3"><span className="flex h-6 w-6 items-center justify-center"><SidebarIcon name="bookmark" /></span> Saved Searches</span>
        </NavLink>
        <NavLink
          to="/employer/talent"
          className="flex items-center justify-between rounded-[8px] px-4 py-3 text-sm font-normal leading-5 text-slate-600 hover:bg-slate-50"
        >
          <span className="flex items-center gap-3"><span className="flex h-6 w-6 items-center justify-center"><SidebarIcon name="users" /></span> Shortlists</span>
          <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">8</span>
        </NavLink>
      </div>
      <nav className="mt-auto space-y-2 border-t border-slate-100 pt-5">
        {supportItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-[8px] px-4 py-3 text-sm font-normal leading-5 transition-all duration-200 ${
                isActive ? 'bg-blue-50 text-blue-700' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-950'
              }`
            }
          >
            <span className="flex h-6 w-6 items-center justify-center"><SidebarIcon name={item.icon} /></span>
            <span>{item.label}</span>
          </NavLink>
        ))}
        <div className="flex items-center justify-between rounded-[8px] px-4 py-3 text-sm font-normal leading-5 text-slate-600">
          <span className="flex items-center gap-3"><span className="flex h-6 w-6 items-center justify-center"><SidebarIcon name="building" /></span> Acme Corp</span>
          <span className="text-slate-400">v</span>
        </div>
        <SignOutButton tone="indigo" />
      </nav>
    </aside>
  )
}
