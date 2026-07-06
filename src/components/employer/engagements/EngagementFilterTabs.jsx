import React from 'react'
import { engagementFilterTabs } from '../../../data/engagementsData'

export default function EngagementFilterTabs({ activeTab, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {engagementFilterTabs.map((tab) => (
        <button
          key={tab}
          type="button"
          onClick={() => onChange(tab)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
            activeTab === tab ? 'employer-filter-chip-active' : 'employer-filter-chip'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}
