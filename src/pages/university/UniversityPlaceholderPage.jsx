import React from 'react'
import UniversityNav from '../../components/university/UniversityNav'

export default function UniversityPlaceholderPage({ title }) {
  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-[#F4F6FB]">
      <UniversityNav />
      <main className="flex min-w-0 flex-1 items-center justify-center overflow-y-auto">
        <div className="rounded-2xl border border-gray-100 bg-white px-10 py-12 text-center shadow-sm">
          <h1 className="text-xl font-bold text-gray-900">{title}</h1>
          <p className="mt-2 text-sm text-gray-500">This page is coming soon.</p>
        </div>
      </main>
    </div>
  )
}
