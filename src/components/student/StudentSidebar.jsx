import React from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { candidateOverview } from '../../data/mockData'
import { useCareerStore } from '../../store/useCareerStore'
import AICompanionCard from './AICompanionCard'

const navItems = [
  { label: 'Overview', path: '/student/overview', aliases: ['/student'], icon: 'H' },
  { label: 'Career Memory', path: '/student/profile', aliases: ['/student/memory-profile'], icon: 'M' },
  { label: 'Career Intelligence', path: '/student/intelligence', aliases: ['/student/career-intelligence'], icon: 'CI' },
  { label: 'Opportunities', path: '/student/opportunities', aliases: [], icon: 'O' },
  { label: 'Applications', path: '/student/applications', aliases: [], icon: 'A' },
  { label: 'Network & Mentors', path: '/student/network', aliases: [], icon: 'N' },
  { label: 'Learning & Skills', path: '/student/learning', aliases: [], icon: 'L' },
]

export default function StudentSidebar() {
  const location = useLocation()
  const profile = candidateOverview.profile
  const careerFocus = useCareerStore((state) => state.careerFocus)
  const targetRole = useCareerStore((state) => state.targetRole)

  return (
    <aside className="hidden h-screen w-72 shrink-0 border-r border-white/70 bg-white/90 px-5 py-5 shadow-[8px_0_30px_rgba(15,23,42,0.03)] backdrop-blur-xl lg:flex lg:flex-col">
      <div className="flex items-center gap-3">
        <Link to="/" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 text-lg font-bold text-white shadow-lg shadow-violet-200">
          C
        </Link>
        <div className="min-w-0">
          <Link to="/student/overview" className="block truncate text-lg font-bold text-slate-950">
            CareerOS
          </Link>
          <p className="text-xs font-semibold text-violet-600">Your Career OS</p>
        </div>
      </div>

      <Link
        to="/student/profile"
        className="mt-5 flex min-h-[76px] items-center gap-3 rounded-xl border border-violet-100 bg-white px-3 py-3 text-left shadow-[0_12px_30px_rgba(88,63,188,0.08)] transition hover:border-violet-200 hover:shadow-[0_16px_36px_rgba(88,63,188,0.12)]"
      >
        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 text-sm font-bold text-white shadow-md shadow-violet-200">
          CL
          <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-400" />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-sm font-bold text-slate-950">{profile.name}</h2>
          <p className="mt-0.5 truncate text-xs font-medium text-slate-500">{profile.identity}</p>
          <p className="truncate text-xs font-medium text-violet-600">{profile.university}</p>
        </div>
        <span className="text-sm font-bold text-slate-400" aria-hidden="true">
          &gt;
        </span>
      </Link>

      <section className="mt-3 rounded-xl border border-violet-100 bg-violet-50/60 p-3 shadow-[0_10px_26px_rgba(88,63,188,0.06)]">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-xs font-bold text-violet-600 shadow-sm">
            IF
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Industry Focus</p>
            <p className={`truncate text-xs font-bold ${careerFocus ? 'text-violet-700' : 'text-slate-400'}`}>{careerFocus || 'Not set yet'}</p>
          </div>
        </div>
        <div className="my-2 h-px bg-violet-100" />
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-xs font-bold text-violet-600 shadow-sm">
            TR
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Target Role</p>
            <p className={`truncate text-xs font-bold ${targetRole ? 'text-slate-900' : 'text-slate-400'}`}>{targetRole || 'Not set yet'}</p>
          </div>
        </div>
      </section>

      <nav className="mt-3 min-h-0 flex-1 space-y-1 overflow-y-auto pr-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-semibold transition-all duration-200 ${
                isActive || item.aliases.includes(location.pathname)
                  ? 'bg-violet-50 text-violet-700 ring-1 ring-violet-100'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
              }`
            }
          >
            {({ isActive }) => {
              const active = isActive || item.aliases.includes(location.pathname)
              return (
                <>
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold ${
                      active ? 'bg-white text-violet-600 shadow-sm' : 'bg-transparent text-slate-400'
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className="truncate">{item.label}</span>
                </>
              )
            }}
          </NavLink>
        ))}
      </nav>

      <AICompanionCard />
    </aside>
  )
}
