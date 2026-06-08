import React from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import EmployerSidebar from '../employer/EmployerSidebar'
import EmployerTopBar from '../employer/EmployerTopBar'
import SignOutButton from '../session/SignOutButton'
import StudentSidebar from '../student/StudentSidebar'
import UniversitySidebar from '../university/UniversitySidebar'
import UniversityTopBar from '../university/UniversityTopBar'
import { useCareerStore } from '../../store/useCareerStore'

const workspaceConfigs = {
  // Shared nav config drives mobile nav, page titles, and active route aliases.
  student: {
    eyebrow: 'Student Workspace',
    subtitle: 'Your AI career memory',
    navItems: [
      { label: 'Overview', path: '/student/overview', aliases: ['/student'] },
      { label: 'Career Memory', path: '/student/profile', aliases: ['/student/memory-profile'] },
      { label: 'Career Intelligence', path: '/student/intelligence', aliases: ['/student/career-intelligence'] },
      { label: 'Opportunities', path: '/student/opportunities', aliases: [] },
      { label: 'Applications', path: '/student/applications', aliases: [] },
      { label: 'Network & Mentors', path: '/student/network', aliases: [] },
      { label: 'Learning & Skills', path: '/student/learning', aliases: [] },
      { label: 'AI Assistant', path: '/student/ai-assistant', aliases: [] },
    ],
    supportItems: [
      { label: 'Settings', path: '/student/settings', aliases: [] },
      { label: 'Help', path: '/student/help', aliases: [] },
    ],
  },
  employer: {
    eyebrow: 'Employer Workspace',
    subtitle: 'Evidence-based talent discovery',
    navItems: [
      { label: 'Talent Discovery', path: '/employer/talent', aliases: ['/employer'] },
      { label: 'Candidate Insights', path: '/employer/insights', aliases: [] },
      { label: 'Create Engagement', path: '/employer/posting', aliases: [] },
      { label: 'Job Marketplace', path: '/employer/marketplace', aliases: [] },
    ],
    supportItems: [
      { label: 'Settings', path: '/employer/settings', aliases: [] },
      { label: 'Help', path: '/employer/help', aliases: [] },
    ],
  },
  university: {
    eyebrow: 'University Workspace',
    subtitle: 'Readiness and market alignment',
    navItems: [
      { label: 'Curriculum-Market Alignment', path: '/university/curriculum', aliases: ['/university'] },
      { label: 'Student Readiness', path: '/university/readiness', aliases: [] },
      { label: 'Society-Corporate Marketplace', path: '/university/collaboration', aliases: [] },
    ],
    supportItems: [
      { label: 'Settings', path: '/university/settings', aliases: [] },
      { label: 'Help', path: '/university/help', aliases: [] },
    ],
  },
}

function itemMatchesPath(item, pathname) {
  if (item.path === pathname || item.aliases.includes(pathname)) return true
  if (pathname.startsWith(item.path + '/')) return true
  return false
}

export default function AppLayout({ workspace = 'student' }) {
  const user = useCareerStore((state) => state.currentUser)
  const location = useLocation()
  const config = workspaceConfigs[workspace] ?? workspaceConfigs.student
  const allItems = [...config.navItems, ...config.supportItems]
  const activeItem = allItems.find((item) => itemMatchesPath(item, location.pathname)) ?? config.navItems[0]

  return (
    <div className="h-screen w-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,#eef6ff,transparent_34%),linear-gradient(135deg,#ffffff_0%,#f8fafc_45%,#eef4ff_100%)]">
      <div className="flex h-screen w-full overflow-hidden">
        {/* Desktop sidebars stay fixed on the left while routed content scrolls. */}
        {workspace === 'student' ? (
          <StudentSidebar />
        ) : workspace === 'employer' ? (
          <EmployerSidebar />
        ) : workspace === 'university' ? (
          <UniversitySidebar />
        ) : (
          <aside className="hidden h-screen w-72 shrink-0 border-r border-white/70 bg-white/70 px-5 py-6 shadow-[8px_0_30px_rgba(15,23,42,0.03)] backdrop-blur-xl lg:flex lg:flex-col">
            <div className="mb-8">
              <Link to="/" className="text-xl font-semibold text-slate-950">
                CareerGraph
              </Link>
              <p className="mt-1 text-sm text-slate-500">{config.subtitle}</p>
            </div>
            <nav className="space-y-2">
              {config.navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `block rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                      isActive || item.aliases.includes(location.pathname)
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <nav className="mt-auto space-y-2 border-t border-slate-100 pt-5">
              {config.supportItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `block rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                      isActive ? 'bg-white text-blue-700 shadow-sm ring-1 ring-blue-100' : 'text-slate-500 hover:bg-white/80 hover:text-slate-950'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </aside>
        )}

        <div className="flex h-screen min-w-0 w-full flex-1 flex-col overflow-hidden">
          {workspace === 'employer' ? <EmployerTopBar /> : workspace === 'university' ? <UniversityTopBar /> : <header className="shrink-0 border-b border-white/70 bg-white/75 backdrop-blur-xl">
            <div className="flex w-full items-center justify-between px-4 py-4 sm:px-6 lg:px-6 xl:px-8">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-blue-600">{config.eyebrow}</p>
                <h1 className="text-lg font-semibold text-slate-950">{activeItem?.label}</h1>
              </div>
              <div className="flex items-center gap-3">
                <div className="hidden text-right sm:block">
                  <div className="text-sm font-medium text-slate-900">{user.name}</div>
                  <div className="text-xs text-slate-500">{user.university}</div>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-500 text-sm font-semibold text-white">
                  {user.avatarInitials}
                </div>
              </div>
            </div>
            <nav className="flex gap-2 overflow-x-auto px-4 pb-3 lg:hidden">
              {allItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `whitespace-nowrap rounded-full px-3 py-2 text-xs font-medium ${
                      isActive || item.aliases.includes(location.pathname) ? 'bg-blue-600 text-white' : 'bg-white text-slate-600'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <SignOutButton tone="blue" compact />
            </nav>
          </header>}
          <main className="min-w-0 flex-1 overflow-y-auto">
            {/* Routed workspace pages render here through React Router's Outlet. */}
            <div className="w-full px-4 py-5 sm:px-6 lg:px-6 xl:px-8">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
