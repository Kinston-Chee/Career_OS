import React from 'react'

export default function OpportunitiesHeader({ tabs, activeTab, onTabChange }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-[-0.01em] text-[#11194a] sm:text-3xl">Opportunities</h1>
        <p className="mt-1 text-sm font-medium text-[#637094]">
          Your Career Companion reviews new postings daily and surfaces what matters to you.
        </p>
      </div>

      <div className="flex flex-shrink-0 flex-wrap gap-1.5 rounded-xl border border-[#e2eaf8] bg-white/82 p-1.5 shadow-sm backdrop-blur-md">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => onTabChange(tab)}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-4 focus:ring-blue-100 ${
              tab === activeTab
                ? 'bg-blue-600 text-white shadow-sm'
                : 'border border-[#e2eaf8] bg-white text-[#35507d] hover:bg-blue-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  )
}
