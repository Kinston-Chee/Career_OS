import React from 'react'
import SignOutButton from '../session/SignOutButton'

function TopBarIcon({ name }) {
  const paths = {
    search: <><circle cx="11" cy="11" r="5" /><path d="m15 15 4 4" /></>,
    filter: <path d="M4 6h16l-6 7v5l-4 2v-7z" />,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>,
  }

  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  )
}

export default function EmployerTopBar() {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200/80 bg-white">
      <div className="flex w-full items-center justify-between gap-5 px-4 py-4 sm:px-6 lg:px-8">
        <label className="relative hidden flex-1 lg:block">
          <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"><TopBarIcon name="search" /></span>
          <input
            className="h-12 w-full rounded-[8px] border border-slate-200 bg-white pl-12 pr-14 text-sm font-normal outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-300 focus:ring-4 focus:ring-blue-50"
            placeholder="Search candidates, skills, roles..."
          />
          <button className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-[8px] text-blue-700 ring-1 ring-slate-200" type="button">
            <TopBarIcon name="filter" />
          </button>
        </label>
        <button className="flex h-11 w-11 items-center justify-center rounded-[8px] border border-slate-200 bg-white text-blue-700 shadow-sm" type="button">
          <TopBarIcon name="bell" />
        </button>
        <div className="flex items-center gap-3 bg-white px-2 py-1">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-blue-600 text-sm font-semibold text-white shadow-lg shadow-blue-100">
            AC
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium leading-5 text-slate-950">Alex Chan</p>
            <p className="text-xs font-normal leading-4 text-slate-500">Acme Corp</p>
          </div>
          <span className="text-slate-400">v</span>
        </div>
        <SignOutButton tone="indigo" compact />
      </div>
    </header>
  )
}
