import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useCareerStore } from '../../store/useCareerStore'

function TopBarIconButton({ label, children, onClick, active = false }) {
  const className = 'flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-50'

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${className} ${active ? 'bg-blue-50 text-blue-700' : ''}`}
      aria-label={label}
      title={label}
      aria-pressed={active}
    >
      {children}
    </button>
  )
}

function SearchIcon() {
  return (
    <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
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

export default function UniversityTopBar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const signOut = useCareerStore((state) => state.signOut)
  const navigate = useNavigate()
  const location = useLocation()
  const isSettingsPage = location.pathname === '/university/settings'

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
      const fallbackPath = window.sessionStorage.getItem('universitySettingsReturnTo') || '/university/overview'
      navigate(location.state?.from || fallbackPath)
      return
    }

    const currentPath = `${location.pathname}${location.search}${location.hash}`
    window.sessionStorage.setItem('universitySettingsReturnTo', currentPath)
    navigate('/university/settings', { state: { from: currentPath } })
  }

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200/70 bg-white">
      <div className="flex w-full items-center justify-between gap-5 px-4 py-4 sm:px-6 lg:px-8">
        <label className="relative hidden max-w-4xl flex-1 lg:block">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            <SearchIcon />
          </span>
          <input
            className="h-12 w-full rounded-[8px] border border-slate-200 bg-white pl-11 pr-20 text-sm font-medium outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:ring-4 focus:ring-blue-50"
            placeholder="Search for courses, skills, reports, or insights..."
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded-[6px] border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-semibold text-slate-400">
            Ctrl K
          </span>
        </label>

        <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
          <TopBarIconButton
            label={isSettingsPage ? 'Return to previous university page' : 'Settings'}
            onClick={handleSettingsClick}
            active={isSettingsPage}
          >
            <SettingsIcon />
          </TopBarIconButton>
          <TopBarIconButton label="Sign out" onClick={handleSignOut}>
            <LogOutIcon />
          </TopBarIconButton>

          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="ml-1 flex items-center gap-3 rounded-[8px] px-2 py-1.5 text-left transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-blue-50"
            >
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gradient-to-tr from-indigo-500 to-violet-600 text-sm font-bold text-white ring-1 ring-slate-200">
                EC
              </div>
              <div className="hidden min-w-[132px] sm:block">
                <p className="text-sm font-bold leading-5 text-slate-950">Dr. Evelyn Chen</p>
                <p className="text-xs font-medium leading-4 text-slate-500">Dean of Computing & AI</p>
              </div>
              <svg className={`h-4 w-4 text-slate-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.4} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 z-20 mt-2.5 w-80 rounded-[8px] border border-slate-100 bg-white p-4 shadow-xl ring-1 ring-black/5">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 to-violet-600 text-base font-bold text-white shadow-sm">
                    EC
                  </div>
                  <div className="min-w-0">
                    <h4 className="truncate text-sm font-bold text-slate-900">Dr. Evelyn Chen</h4>
                    <p className="truncate text-xs font-medium text-slate-400">evelyn.chen@hw.edu.my</p>
                  </div>
                </div>

                <div className="space-y-1 border-b border-slate-100 py-3">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Affiliation</span>
                  <p className="text-xs font-semibold text-slate-800">Heriot-Watt University Malaysia</p>
                  <p className="text-xs font-medium text-slate-500">School of Mathematical & Computer Sciences (MACS)</p>
                </div>

                <div className="space-y-2 pt-3">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Active Programs Under Review</span>
                  {[
                    ['BSc Computer Science', 'bg-blue-100 text-blue-700'],
                    ['BSc Data Science', 'bg-violet-100 text-violet-700'],
                    ['BSc Data Analytics', 'bg-amber-100 text-amber-700'],
                  ].map(([program, tone]) => (
                    <div key={program} className="flex items-center justify-between rounded-[8px] bg-slate-50 p-2 text-xs font-medium text-slate-700">
                      <span>{program}</span>
                      <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${tone}`}>Years 1-3</span>
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
