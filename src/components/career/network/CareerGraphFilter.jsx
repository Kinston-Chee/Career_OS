import React from 'react'

const filters = ['All Paths', 'Tech & Data', 'Business', 'Product', 'Finance']

export default function CareerGraphFilter({ activeFilter, onFilterChange }) {
  return (
    <section className="absolute bottom-28 left-5 z-20 hidden w-48 rounded-2xl border border-violet-100 bg-white/90 p-4 shadow-[0_14px_34px_rgba(88,63,188,0.12)] backdrop-blur-xl md:block">
      <p className="text-xs font-bold text-slate-500">Filter by Domain</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => onFilterChange(filter)}
            className={`rounded-xl px-3 py-2 text-xs font-bold transition-all ${
              activeFilter === filter ? 'bg-violet-600 text-white shadow-lg shadow-violet-100' : 'bg-violet-50 text-violet-600 hover:bg-violet-100'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
    </section>
  )
}

