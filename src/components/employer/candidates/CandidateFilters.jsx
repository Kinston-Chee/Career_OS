import React from 'react'
import { LayoutGrid, List, Search } from 'lucide-react'
import { PIPELINE_STAGES } from '../../../data/candidatesData'

export default function CandidateFilters({ query, onQueryChange, stageFilter, onStageChange, sortBy, onSortChange, view, onViewChange }) {
  return (
    <section className="employer-glass-card flex flex-wrap items-center gap-3 p-3">
      <div className="relative min-w-[220px] flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search by name, university, or skill…"
          className="employer-home-command h-9 w-full pl-9 pr-3 text-sm text-slate-700 outline-none"
        />
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        <button
          type="button"
          onClick={() => onStageChange('All')}
          className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
            stageFilter === 'All' ? 'employer-filter-chip-active' : 'employer-filter-chip'
          }`}
        >
          All stages
        </button>
        {PIPELINE_STAGES.map((stage) => (
          <button
            key={stage}
            type="button"
            onClick={() => onStageChange(stage)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
              stageFilter === stage ? 'employer-filter-chip-active' : 'employer-filter-chip'
            }`}
          >
            {stage}
          </button>
        ))}
      </div>

      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="employer-secondary-button h-9 px-3 text-xs outline-none"
      >
        <option value="matchDesc">Sort: Best match</option>
        <option value="nameAsc">Sort: Name (A–Z)</option>
        <option value="recentlyApplied">Sort: Recently applied</option>
      </select>

      <div className="flex items-center gap-1 rounded-full bg-white/60 p-1 ring-1 ring-slate-200/70">
        <button
          type="button"
          onClick={() => onViewChange('grid')}
          className={`flex h-7 w-7 items-center justify-center rounded-full transition ${view === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-gray-600'}`}
        >
          <LayoutGrid className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={() => onViewChange('list')}
          className={`flex h-7 w-7 items-center justify-center rounded-full transition ${view === 'list' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-gray-600'}`}
        >
          <List className="h-3.5 w-3.5" />
        </button>
      </div>
    </section>
  )
}
