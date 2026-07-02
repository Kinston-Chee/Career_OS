import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Command, Sparkles } from 'lucide-react'
import EmployerNav from '../components/employer/EmployerNav'
import AIBriefingCard from '../components/employer/AIBriefingCard'
import AIActionQueue from '../components/employer/AIActionQueue'
import MetricsPillRow from '../components/employer/MetricsPillRow'
import TopCandidatesCard from '../components/employer/TopCandidatesCard'
import CampusPipelineFunnel from '../components/employer/CampusPipelineFunnel'
import AIOpportunityRadar from '../components/employer/AIOpportunityRadar'
import { employerUser } from '../data/employerMockData'
import { NLP_DEMO_QUERIES, matchNlpQuery } from '../utils/employerNlpQueries'

function DemoToast({ message }) {
  if (!message) return null
  return (
    <div className="employer-glass-card fixed bottom-5 right-5 z-50 px-4 py-3 text-sm font-semibold text-slate-800">
      {message}
    </div>
  )
}

function PageHeader({ query, onQueryChange, onSubmit, showSuggestions, onFocus, onBlur, onPickSuggestion }) {
  return (
    <div className="employer-home-header relative z-40 flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="flex items-center gap-2 text-2xl font-semibold text-slate-950">
          <span className="employer-home-header-icon" aria-hidden="true">
            <Sparkles className="h-4 w-4" />
          </span>
          {employerUser.greeting}
        </h1>
        <p className="mt-1 text-sm text-slate-500">Here&rsquo;s your AI briefing for {employerUser.briefingDate}</p>
      </div>

      <div className="relative z-40 w-full max-w-xl">
        <Sparkles className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#185FA5]" />
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onSubmit(query)
          }}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder="Find me software engineering interns from Taylor's or APU available after June..."
          className="employer-home-command h-11 w-full pl-11 pr-16 text-sm text-slate-700 outline-none placeholder:text-slate-400"
        />
        <span className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-0.5 rounded-md bg-white/70 px-1.5 py-0.5 text-[10px] font-medium text-slate-400 ring-1 ring-slate-200/70">
          <Command className="h-3 w-3" /> K
        </span>

        {showSuggestions ? (
          <div className="employer-glass-card absolute left-0 right-0 top-full z-40 mt-1.5 overflow-hidden rounded-2xl border border-white/80 bg-white/95 py-1.5 shadow-2xl backdrop-blur-2xl">
            <p className="px-3.5 pb-1 pt-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400">Try asking</p>
            {NLP_DEMO_QUERIES.map((q) => (
              <button
                key={q.id}
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault()
                  onPickSuggestion(q)
                }}
                className="flex w-full items-start gap-2 px-3.5 py-2 text-left text-xs text-slate-600 hover:bg-blue-50/70 hover:text-[#185FA5]"
              >
                <Sparkles className="mt-0.5 h-3 w-3 shrink-0 text-[#185FA5]" />
                {q.label}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default function EmployerHome() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [toast, setToast] = useState('')
  const toastRef = useRef(null)

  const showToast = (message) => {
    window.clearTimeout(toastRef.current)
    setToast(message)
    toastRef.current = window.setTimeout(() => setToast(''), 3000)
  }

  const runQuery = (text) => {
    const matched = matchNlpQuery(text)
    if (matched) {
      showToast(matched.toast)
      navigate(matched.to)
    } else if (text.trim()) {
      showToast("Try one of the suggested searches — this demo recognizes a few example queries")
    }
    setShowSuggestions(false)
  }

  const pickSuggestion = (q) => {
    setQuery(q.label)
    showToast(q.toast)
    navigate(q.to)
    setShowSuggestions(false)
  }

  return (
    <div className="employer-home-page flex h-screen w-screen flex-col overflow-hidden">
      <EmployerNav variant="glass" />
      <main className="min-w-0 flex-1 overflow-y-auto">
        <div className="relative z-10 mx-auto max-w-[1480px] space-y-5 px-6 py-6">
          <PageHeader
            query={query}
            onQueryChange={setQuery}
            onSubmit={runQuery}
            showSuggestions={showSuggestions}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => window.setTimeout(() => setShowSuggestions(false), 120)}
            onPickSuggestion={pickSuggestion}
          />

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_320px]">
            <AIBriefingCard />
            <AIActionQueue />
          </div>

          <MetricsPillRow />

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[2fr_1.6fr_1.3fr]">
            <TopCandidatesCard />
            <CampusPipelineFunnel />
            <AIOpportunityRadar />
          </div>
        </div>
      </main>
      <DemoToast message={toast} />
    </div>
  )
}
