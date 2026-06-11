import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useCareerStore } from '../../store/useCareerStore'
import { candidateOverview } from '../../data/mockData'

function TopBarIconButton({ label, children, onClick, active = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition hover:bg-violet-50 hover:text-violet-700 focus:outline-none focus:ring-4 focus:ring-violet-50 ${active ? 'bg-violet-50 text-violet-700' : ''}`}
      aria-label={label}
      title={label}
      aria-pressed={active}
    >
      {children}
    </button>
  )
}

function SettingsIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.05.05a2 2 0 1 1-2.83 2.83l-.05-.05a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.55V21a2 2 0 1 1-4 0v-.08a1.7 1.7 0 0 0-1-1.55 1.7 1.7 0 0 0-1.87.34l-.05.05a2 2 0 1 1-2.83-2.83l.05-.05A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.55-1H3a2 2 0 1 1 0-4h.08a1.7 1.7 0 0 0 1.55-1 1.7 1.7 0 0 0-.34-1.87l-.05-.05a2 2 0 1 1 2.83-2.83l.05.05A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.55V3a2 2 0 1 1 4 0v.08a1.7 1.7 0 0 0 1 1.55 1.7 1.7 0 0 0 1.87-.34l.05-.05a2 2 0 1 1 2.83 2.83l-.05.05A1.7 1.7 0 0 0 19.4 9c.2.62.78 1 1.55 1H21a2 2 0 1 1 0 4h-.08a1.7 1.7 0 0 0-1.52 1Z" />
    </svg>
  )
}

function LogOutIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="m16 17 5-5-5-5" />
      <path d="M21 12H9" />
    </svg>
  )
}

export default function StudentTopBar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const signOut = useCareerStore((state) => state.signOut)
  const user = useCareerStore((state) => state.currentUser)
  const navigate = useNavigate()
  const location = useLocation()
  const profile = candidateOverview.profile

  const isSettingsPage = location.pathname === '/student/settings'

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function handleSignOut() {
    signOut()
    navigate('/', { replace: true, state: { signedOut: true } })
  }

  function handleSettingsClick() {
    if (isSettingsPage) {
      const fallbackPath = window.sessionStorage.getItem('studentSettingsReturnTo') || '/student/overview'
      navigate(location.state?.from || fallbackPath)
      return
    }

    const currentPath = `${location.pathname}${location.search}${location.hash}`
    window.sessionStorage.setItem('studentSettingsReturnTo', currentPath)
    navigate('/student/settings', { state: { from: currentPath } })
  }

  return (
    <header className="sticky top-0 z-40 border-b border-violet-100/70 bg-white/95 backdrop-blur-md">
      <div className="flex w-full items-center justify-between gap-5 px-4 py-3 sm:px-6 lg:px-8">
        {/* Page context */}
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-wider text-violet-500">Student Workspace</p>
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
          <TopBarIconButton
            label={isSettingsPage ? 'Return to previous page' : 'Settings'}
            onClick={handleSettingsClick}
            active={isSettingsPage}
          >
            <SettingsIcon />
          </TopBarIconButton>

          <TopBarIconButton label="Sign out" onClick={handleSignOut}>
            <LogOutIcon />
          </TopBarIconButton>

          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="ml-1 flex items-center gap-3 rounded-xl px-2 py-1.5 text-left transition hover:bg-violet-50/60 focus:outline-none focus:ring-4 focus:ring-violet-50"
            >
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 text-sm font-bold text-white ring-2 ring-violet-200 shadow-md shadow-violet-100">
                {user.avatarInitials}
              </div>
              <div className="hidden min-w-[120px] sm:block">
                <p className="text-sm font-bold leading-5 text-slate-950">{user.name}</p>
                <p className="text-xs font-medium leading-4 text-slate-500">{user.university}</p>
              </div>
              <svg className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.4} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 z-20 mt-2.5 w-80 overflow-hidden rounded-2xl border border-violet-100 bg-white p-4 shadow-[0_18px_50px_rgba(88,63,188,0.16)] ring-1 ring-black/5">
                <div className="flex items-center gap-3 border-b border-violet-50 pb-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 text-base font-bold text-white shadow-md shadow-violet-100">
                    {user.avatarInitials}
                  </div>
                  <div className="min-w-0">
                    <h4 className="truncate text-sm font-bold text-slate-900">{user.name}</h4>
                    <p className="truncate text-xs font-medium text-slate-400">{user.email}</p>
                  </div>
                </div>

                <div className="space-y-1 border-b border-violet-50 py-3">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Affiliation</span>
                  <p className="text-xs font-semibold text-slate-800">{user.university}</p>
                  <p className="text-xs font-medium text-slate-500">{user.year} · {user.programme}</p>
                </div>

                <div className="space-y-2 border-b border-violet-50 py-3">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Career Focus</span>
                  <div className="flex items-center justify-between rounded-xl bg-violet-50 p-2 text-xs font-medium text-slate-700">
                    <span>Career Focus</span>
                    <span className="rounded-lg bg-violet-200/60 px-2 py-0.5 text-[10px] font-bold text-violet-800">{profile.careerFocus}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-violet-50 p-2 text-xs font-medium text-slate-700">
                    <span>Target Role</span>
                    <span className="font-bold text-[#11104a]">{profile.targetRole}</span>
                  </div>
                </div>

                <div className="space-y-2 pt-3">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Quick Stats</span>
                  {[
                    ['Career Readiness', '68%', 'bg-violet-100 text-violet-700'],
                    ['Total Experiences', '14', 'bg-emerald-100 text-emerald-700'],
                    ['Applications', '7 active', 'bg-blue-100 text-blue-700'],
                  ].map(([label, value, tone]) => (
                    <div key={label} className="flex items-center justify-between rounded-xl bg-slate-50 p-2 text-xs font-medium text-slate-700">
                      <span className="truncate pr-2">{label}</span>
                      <span className={`shrink-0 rounded px-1.5 py-0.5 text-[10px] font-bold ${tone}`}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
