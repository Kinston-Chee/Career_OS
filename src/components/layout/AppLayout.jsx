import React from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import EmployerSidebar from '../employer/EmployerSidebar'
import EmployerTopBar from '../employer/EmployerTopBar'
import SignOutButton from '../session/SignOutButton'
import StudentSidebar from '../student/StudentSidebar'
import StudentTopBar from '../student/StudentTopBar'
import UniversityCompanionBot from '../university/UniversityCompanionBot'
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
      { label: 'Create Engagement', path: '/employer/posting', aliases: [] },
      { label: 'Job Marketplace', path: '/employer/marketplace', aliases: [] },
    ],
    supportItems: [],
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
  const shellBackground =
    workspace === 'student'
      ? 'bg-[radial-gradient(circle_at_top_right,#f2ecff,transparent_28%),linear-gradient(135deg,#ffffff_0%,#fbfaff_46%,#f7f4ff_100%)]'
      : 'bg-[radial-gradient(circle_at_top_left,#eef6ff,transparent_34%),linear-gradient(135deg,#ffffff_0%,#f8fafc_45%,#eef4ff_100%)]'

  return (
    <div className={`h-screen w-screen overflow-hidden ${shellBackground}`}>
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
          {workspace === 'employer' ? <EmployerTopBar /> : workspace === 'university' ? <UniversityTopBar /> : <StudentTopBar />}
          <main className="min-w-0 flex-1 overflow-y-auto">
            {/* Routed workspace pages render here through React Router's Outlet. */}
            <div className="w-full px-4 py-5 sm:px-6 lg:px-6 xl:px-8">
              <Outlet />
            </div>
          </main>
        </div>
        {workspace === 'university' || workspace === 'employer' ? <UniversityCompanionBot /> : null}
      </div>
    </div>
  )
}
