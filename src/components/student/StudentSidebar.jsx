import React from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import SignOutButton from '../session/SignOutButton'
import { candidateOverview } from '../../data/mockData'
import AICompanionCard from './AICompanionCard'

const navItems = [
  { label: 'Overview', path: '/student/overview', aliases: ['/student'] },
  { label: 'Career Memory', path: '/student/profile', aliases: ['/student/memory-profile'] },
  { label: 'Career Intelligence', path: '/student/intelligence', aliases: ['/student/career-intelligence'] },
  { label: 'Opportunities', path: '/student/opportunities', aliases: [] },
  { label: 'Applications', path: '/student/applications', aliases: [] },
  { label: 'Network & Mentors', path: '/student/network', aliases: [] },
  { label: 'Learning & Skills', path: '/student/learning', aliases: [] },
  { label: 'AI Assistant', path: '/student/ai-assistant', aliases: [] },
  { label: 'Settings', path: '/student/settings', aliases: [] },
]

export default function StudentSidebar() {
  const location = useLocation()
  const profile = candidateOverview.profile

  return (
    <aside className="hidden h-screen w-72 shrink-0 bg-gradient-to-b from-violet-50 via-white to-violet-50 p-2.5 lg:block xl:w-80 xl:p-3">
      <div className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-violet-100/80 bg-white/78 shadow-[0_24px_70px_rgba(88,63,188,0.14)] backdrop-blur-xl">
        <div className="min-h-0 flex-1 overflow-y-auto px-3 py-4 xl:px-4 xl:py-5">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-500 text-lg font-bold text-white shadow-lg shadow-violet-200">
              C
            </Link>
            <div>
              <Link to="/student/overview" className="text-lg font-bold text-[#11104a]">
                CareerOS
              </Link>
              <p className="text-xs font-medium text-[#3f3d78]">Your Career OS</p>
            </div>
          </div>

          <section className="relative mt-5 overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-white via-violet-50 to-white px-4 py-4 text-center xl:mt-7 xl:py-5">
            <div className="pointer-events-none absolute -left-8 top-12 h-28 w-28 rounded-full border border-violet-100" />
            <div className="pointer-events-none absolute -right-8 bottom-6 h-24 w-24 rounded-full border border-violet-100" />
            <div className="pointer-events-none absolute left-3 top-16 h-16 w-10 rounded-full border-l-2 border-violet-200 opacity-70" />
            <div className="pointer-events-none absolute right-5 top-16 h-20 w-12 rounded-full border-r-2 border-violet-200 opacity-70" />
            <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-violet-200 via-white to-indigo-100 p-1 shadow-[0_18px_36px_rgba(88,63,188,0.18)] xl:h-28 xl:w-28">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 text-3xl font-bold text-white">
                CL
              </div>
            </div>
            <h2 className="relative mt-4 text-lg font-bold text-[#11104a]">{profile.name}</h2>
            <p className="relative mt-2 text-xs leading-5 text-[#3f3d78]">
              {profile.identity}
              <br />
              {profile.university}
            </p>
          </section>

          <section className="mt-4 rounded-2xl border border-violet-100 bg-white/80 p-4 text-sm">
            <div className="flex items-center justify-between gap-3">
              <span className="font-semibold text-[#3f3d78]">Career Focus</span>
              <span className="rounded-xl bg-violet-100 px-3 py-1 text-xs font-bold text-violet-700">{profile.careerFocus}</span>
            </div>
            <div className="mt-4 flex items-center justify-between gap-3">
              <span className="font-semibold text-[#3f3d78]">Target Role</span>
              <span className="font-bold text-[#11104a]">{profile.targetRole}</span>
            </div>
          </section>

          <nav className="mt-4 space-y-1 xl:mt-5 xl:space-y-1.5">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center rounded-2xl px-3 py-2.5 text-sm font-semibold transition-all duration-200 xl:px-4 xl:py-3 ${
                    isActive || item.aliases.includes(location.pathname)
                      ? 'bg-violet-100 text-violet-700 shadow-sm'
                      : 'text-[#3f3d78] hover:bg-violet-50 hover:text-violet-700'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <AICompanionCard />
        </div>

        <div className="border-t border-violet-100 px-4 py-4">
          <SignOutButton tone="blue" />
        </div>
      </div>
    </aside>
  )
}
