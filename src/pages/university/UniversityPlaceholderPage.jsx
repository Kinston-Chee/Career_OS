import React from 'react'
import UniversityNav from '../../components/university/UniversityNav'

export default function UniversityPlaceholderPage({ title }) {
  return (
    <div className="university-workspace-page flex h-screen w-screen flex-col overflow-hidden">
      <UniversityNav />
      <main className="flex min-w-0 flex-1 items-center justify-center overflow-y-auto">
        <div className="employer-glass-card px-10 py-12 text-center">
          <h1 className="text-xl font-semibold text-slate-950">{title}</h1>
          <p className="mt-2 text-sm text-slate-500">This page is coming soon.</p>
        </div>
      </main>
    </div>
  )
}
