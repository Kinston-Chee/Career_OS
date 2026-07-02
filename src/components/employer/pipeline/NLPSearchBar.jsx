import React, { useState } from 'react'
import { Command, Loader2, Sparkles } from 'lucide-react'
import { searchSuggestionResults } from '../../../data/campusPipelineData'

export default function NLPSearchBar() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | results

  const runSearch = () => {
    if (status === 'loading') return
    setStatus('loading')
    window.setTimeout(() => setStatus('results'), 800)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') runSearch()
  }

  return (
    <div className="w-full max-w-xl">
      <div className="relative">
        {status === 'loading' ? (
          <Loader2 className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-[#185FA5]" />
        ) : (
          <Sparkles className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#185FA5]" />
        )}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (!query) setQuery('Show me candidates ready for our next intake')
          }}
          placeholder="Show me candidates ready for our next intake…"
          disabled={status === 'loading'}
          className="employer-home-command h-11 w-full pl-11 pr-16 text-sm text-slate-700 outline-none placeholder:text-slate-400 disabled:opacity-70"
        />
        <span className="employer-command-kbd absolute right-3 top-1/2 -translate-y-1/2">
          <Command className="h-3 w-3" /> K
        </span>
      </div>

      {status === 'results' ? (
        <div className="employer-glass-card mt-3 p-4">
          <p className="text-sm text-gray-700">{searchSuggestionResults.summary}</p>
          <div className="mt-3 flex gap-3 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden">
            {searchSuggestionResults.candidates.map((candidate) => {
              const initials = candidate.name.split(' ').map((p) => p[0]).join('')
              return (
                <div key={candidate.id} className="flex w-[180px] shrink-0 items-center gap-2.5 rounded-xl bg-gray-50 p-2.5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-slate-500 to-blue-500 text-xs font-semibold text-white">
                    {initials}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-gray-900">{candidate.name}</p>
                    <p className="truncate text-[11px] text-gray-400">{candidate.university}</p>
                    <span className="mt-0.5 inline-block rounded-full bg-blue-50 px-1.5 py-0.5 text-[10px] font-medium text-[#185FA5]">{candidate.tag}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ) : null}
    </div>
  )
}
