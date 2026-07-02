import React, { useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Command, Sparkles } from 'lucide-react'
import EmployerNav from '../../components/employer/EmployerNav'
import CandidateFilters from '../../components/employer/candidates/CandidateFilters'
import CandidateGridCard from '../../components/employer/candidates/CandidateGridCard'
import CandidateRow from '../../components/employer/candidates/CandidateRow'
import CandidateDetailView from '../../components/employer/candidates/CandidateDetailView'
import { PIPELINE_STAGES, candidates } from '../../data/candidatesData'

function PageHeader({ query, onQueryChange }) {
  return (
    <div className="employer-page-header flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="employer-page-title">Candidates</h1>
        <p className="employer-page-subtitle">Your full talent pool — searchable and filterable across every posting and stage</p>
      </div>
      <div className="relative w-full max-w-xl">
        <Sparkles className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#185FA5]" />
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Find candidates with React and SQL available in June…"
          className="employer-home-command h-11 w-full pl-11 pr-16 text-sm text-slate-700 outline-none placeholder:text-slate-400"
        />
        <span className="employer-command-kbd absolute right-3 top-1/2 -translate-y-1/2">
          <Command className="h-3 w-3" /> K
        </span>
      </div>
    </div>
  )
}

function DemoToast({ message }) {
  if (!message) return null
  return (
    <div className="employer-glass-card fixed bottom-5 right-5 z-50 px-4 py-3 text-sm font-semibold text-slate-800">
      {message}
    </div>
  )
}

export default function Candidates() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialCandidateId = searchParams.get('candidateId')
  const initialFrom = searchParams.get('from') || 'Candidates'
  const initialQuery = searchParams.get('q') || ''
  const initialStage = searchParams.get('stage') || 'All'

  const [view, setView] = useState(initialCandidateId ? 'detail' : 'list')
  const [selectedCandidateId, setSelectedCandidateId] = useState(initialCandidateId)
  const [backLabel, setBackLabel] = useState(initialFrom)

  const [candidateList, setCandidateList] = useState(() => candidates.map((c) => ({ ...c })))
  const [query, setQuery] = useState(initialQuery)
  const [stageFilter, setStageFilter] = useState(initialStage)
  const [sortBy, setSortBy] = useState('matchDesc')
  const [listView, setListView] = useState('grid')

  const [toast, setToast] = useState('')
  const toastRef = useRef(null)

  const showToast = (message) => {
    window.clearTimeout(toastRef.current)
    setToast(message)
    toastRef.current = window.setTimeout(() => setToast(''), 2400)
  }

  const filteredCandidates = useMemo(() => {
    // Supports comma-separated terms as an OR match, so AI-generated queries
    // like "taylor's, apu" (from Home NLP search / Action Queue) work without
    // a real NLP backend.
    const terms = query.split(',').map((t) => t.trim().toLowerCase()).filter(Boolean)

    let list = candidateList.filter((c) => {
      if (stageFilter !== 'All' && c.pipelineStage !== stageFilter) return false
      if (terms.length) {
        const haystack = `${c.name} ${c.university} ${c.course} ${c.skills.join(' ')}`.toLowerCase()
        if (!terms.some((term) => haystack.includes(term))) return false
      }
      return true
    })

    if (sortBy === 'matchDesc') list = [...list].sort((a, b) => b.matchScore - a.matchScore)
    else if (sortBy === 'nameAsc') list = [...list].sort((a, b) => a.name.localeCompare(b.name))
    else if (sortBy === 'recentlyApplied') list = [...list].slice().reverse()

    return list
  }, [candidateList, query, stageFilter, sortBy])

  const selectedCandidate = candidateList.find((c) => c.id === selectedCandidateId) || null

  const openCandidate = (candidate, from = 'Candidates') => {
    setSelectedCandidateId(candidate.id)
    setBackLabel(from)
    setView('detail')
    setSearchParams({ candidateId: candidate.id, from })
  }

  const goBack = () => {
    setView('list')
    setSearchParams({})
  }

  const handleMoveStage = (candidate) => {
    const currentIndex = PIPELINE_STAGES.indexOf(candidate.pipelineStage)
    const next = PIPELINE_STAGES[currentIndex + 1]
    if (!next) {
      showToast(`${candidate.name} is already at the final stage`)
      return
    }
    setCandidateList((prev) => prev.map((c) => (c.id === candidate.id ? { ...c, pipelineStage: next } : c)))
    showToast(`${candidate.name} moved to ${next}`)
  }

  return (
    <div className="employer-workspace-page flex h-screen w-screen flex-col overflow-hidden">
      <EmployerNav variant="glass" />
      <main className="min-w-0 flex-1 overflow-y-auto">
        {view === 'detail' && selectedCandidate ? (
          <CandidateDetailView
            candidate={selectedCandidate}
            backLabel={backLabel}
            onBack={goBack}
            onToast={showToast}
            onMoveStage={handleMoveStage}
          />
        ) : (
          <div className="relative z-10 mx-auto max-w-[1480px] space-y-5 px-6 py-6">
            <PageHeader query={query} onQueryChange={setQuery} />
            <CandidateFilters
              query={query}
              onQueryChange={setQuery}
              stageFilter={stageFilter}
              onStageChange={setStageFilter}
              sortBy={sortBy}
              onSortChange={setSortBy}
              view={listView}
              onViewChange={setListView}
            />

            <p className="text-xs text-slate-500">{filteredCandidates.length} candidate{filteredCandidates.length === 1 ? '' : 's'}</p>

            {listView === 'grid' ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredCandidates.map((candidate) => (
                  <CandidateGridCard key={candidate.id} candidate={candidate} onSelect={(c) => openCandidate(c, 'Candidates')} />
                ))}
              </div>
            ) : (
              <div className="employer-glass-card p-2">
                {filteredCandidates.map((candidate) => (
                  <CandidateRow key={candidate.id} candidate={candidate} onSelect={(c) => openCandidate(c, 'Candidates')} />
                ))}
              </div>
            )}

            {filteredCandidates.length === 0 ? (
              <div className="employer-glass-card flex flex-col items-center justify-center py-12 text-center">
                <p className="text-sm font-medium text-slate-500">No candidates match your filters.</p>
              </div>
            ) : null}
          </div>
        )}
      </main>
      <DemoToast message={toast} />
    </div>
  )
}
