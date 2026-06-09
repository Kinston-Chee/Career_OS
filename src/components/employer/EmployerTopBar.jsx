import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEmployerSearchStore } from '../../store/useEmployerSearchStore';
import { useCareerStore } from '../../store/useCareerStore';
import GlobalEmployerSearch from './GlobalEmployerSearch';
import SearchChip from './SearchChip';
import SignOutButton from '../session/SignOutButton';

function TopBarIconButton({ label, children, onClick, active = false }) {
  const className = 'flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-50';

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
  );
}

function SettingsIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.05.05a2 2 0 1 1-2.83 2.83l-.05-.05a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.55V21a2 2 0 1 1-4 0v-.08a1.7 1.7 0 0 0-1-1.55 1.7 1.7 0 0 0-1.87.34l-.05.05a2 2 0 1 1-2.83-2.83l.05-.05A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.55-1H3a2 2 0 1 1 0-4h.08a1.7 1.7 0 0 0 1.55-1 1.7 1.7 0 0 0-.34-1.87l-.05-.05a2 2 0 1 1 2.83-2.83l.05.05A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.55V3a2 2 0 1 1 4 0v.08a1.7 1.7 0 0 0 1 1.55 1.7 1.7 0 0 0 1.87-.34l.05-.05a2 2 0 1 1 2.83 2.83l-.05.05A1.7 1.7 0 0 0 19.4 9c.2.62.78 1 1.55 1H21a2 2 0 1 1 0 4h-.08a1.7 1.7 0 0 0-1.52 1Z" />
    </svg>
  );
}

function LogOutIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="m16 17 5-5-5-5" />
      <path d="M21 12H9" />
    </svg>
  );
}

export default function EmployerTopBar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const signOut = useCareerStore((state) => state.signOut);
  const navigate = useNavigate();
  const location = useLocation();
  
  const isSettingsPage = location.pathname === '/employer/settings';

  const { chipsByPage, removeChip, clearChips } = useEmployerSearchStore();

  const getActivePage = () => {
    const path = location.pathname;
    if (path.includes('/insights')) return 'insights';
    if (path.includes('/posting')) return 'engagement';
    if (path.includes('/marketplace')) return 'talent'; // default to talent filters for marketplace
    return 'talent';
  };

  const activePage = getActivePage();
  const activeChips = chipsByPage[activePage] || [];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleSignOut() {
    signOut();
    navigate('/', { replace: true, state: { signedOut: true } });
  }

  function handleSettingsClick() {
    if (isSettingsPage) {
      const fallbackPath = window.sessionStorage.getItem('employerSettingsReturnTo') || '/employer/talent';
      navigate(location.state?.from || fallbackPath);
      return;
    }

    const currentPath = `${location.pathname}${location.search}${location.hash}`;
    window.sessionStorage.setItem('employerSettingsReturnTo', currentPath);
    navigate('/employer/settings', { state: { from: currentPath } });
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white">
      <div className="flex w-full items-center justify-between gap-5 px-4 py-4 sm:px-6 lg:px-8">
        
        {/* Global search coordination bar */}
        <GlobalEmployerSearch />

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
              className="ml-1 flex items-center gap-3 rounded-[8px] px-2 py-1.5 text-left transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-blue-50"
            >
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-sky-400 to-blue-600 text-sm font-bold text-white ring-1 ring-slate-200 shadow-sm shadow-blue-100">
                EK
              </div>
              <div className="hidden min-w-[132px] sm:block">
                <p className="text-sm font-bold leading-5 text-slate-950">Edwin Khoo</p>
                <p className="text-xs font-medium leading-4 text-slate-500">HR Manager @ Google</p>
              </div>
              <svg className={`h-4 w-4 text-slate-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.4} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 z-20 mt-2.5 w-80 rounded-[8px] border border-slate-100 bg-white p-4 shadow-xl ring-1 ring-black/5">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-blue-600 text-base font-bold text-white shadow-md shadow-blue-100">
                    EK
                  </div>
                  <div className="min-w-0">
                    <h4 className="truncate text-sm font-bold text-slate-900">Edwin Khoo</h4>
                    <p className="truncate text-xs font-medium text-slate-400 font-normal">khoo@google.com.my</p>
                  </div>
                </div>

                <div className="space-y-1 border-b border-slate-100 py-3">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Affiliation</span>
                  <p className="text-xs font-semibold text-slate-800">Google</p>
                  <p className="text-xs font-medium text-slate-500">HR Manager</p>
                </div>

                <div className="space-y-2 pt-3">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Active Postings Under Review</span>
                  {[
                    ['Data Analyst Intern', 'bg-blue-100 text-blue-700', 'Internship'],
                    ['Frontend Engineer Associate', 'bg-emerald-100 text-emerald-700', 'Full-Time'],
                    ['AI/ML Engineer Intern', 'bg-blue-100 text-blue-700', 'Internship'],
                  ].map(([posting, tone, typeLabel]) => (
                    <div key={posting} className="flex items-center justify-between rounded-[8px] bg-slate-50 p-2 text-xs font-medium text-slate-700">
                      <span className="truncate pr-2">{posting}</span>
                      <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold shrink-0 ${tone}`}>{typeLabel}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Persistent Active Search Chips Sub-header bar */}
      {activeChips.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 bg-slate-50/50 px-4 py-2.5 sm:px-6 lg:px-8">
          <span className="text-[10px] font-extrabold tracking-wider text-slate-400 uppercase mr-1">Active Filters:</span>
          {activeChips.map((chip) => (
            <SearchChip
              key={chip.id}
              chip={chip}
              onRemove={(id) => removeChip(activePage, id)}
            />
          ))}
          <button
            onClick={() => clearChips(activePage)}
            className="text-[10px] font-extrabold text-blue-600 hover:text-blue-700 ml-1.5 transition uppercase"
            type="button"
          >
            Clear All
          </button>
        </div>
      )}
    </header>
  );
}
