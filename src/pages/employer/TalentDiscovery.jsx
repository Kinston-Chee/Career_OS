import React, { useMemo, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Command, Sparkles } from 'lucide-react'
import EmployerNav from '../../components/employer/EmployerNav'
import PostingsRow from '../../components/employer/talent/PostingsRow'
import AIBriefingStrip from '../../components/employer/talent/AIBriefingStrip'
import AIShortlistedList from '../../components/employer/talent/AIShortlistedList'
import AllApplicantsPanel from '../../components/employer/talent/AllApplicantsPanel'
import ApplicationTracker from '../../components/employer/talent/ApplicationTracker'
import { candidates, postings } from '../../data/talentDiscoveryData'
import { useEmployerWorkspaceStore } from '../../store/useEmployerWorkspaceStore'
import { matchNlpQuery } from '../../utils/employerNlpQueries'

function PageHeader({ query, onQueryChange, onSubmit }) {
  return (
    <div className="employer-page-header flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="employer-page-title">Talent Discovery</h1>
        <p className="employer-page-subtitle">AI-ranked applicants across your active postings</p>
      </div>

      <div className="relative w-full max-w-xl">
        <Sparkles className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#185FA5]" />
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onSubmit(query)
          }}
          placeholder="Show me top applicants for the Software Engineer internship available in June…"
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

export default function TalentDiscovery() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const initialPostingId = searchParams.get('postingId')

  const [selectedPostingId, setSelectedPostingId] = useState(
    postings.some((p) => p.id === initialPostingId) ? initialPostingId : postings[0].id
  )
  const [statuses, setStatuses] = useState({})
  const [contactStatus, setContactStatus] = useState('idle') // idle | confirm | sending | done
  const [nlpQuery, setNlpQuery] = useState('')
  const [toast, setToast] = useState('')
  const toastRef = useRef(null)

  const shortlistCandidate = useEmployerWorkspaceStore((s) => s.shortlistCandidate)
  const passCandidate = useEmployerWorkspaceStore((s) => s.passCandidate)
  const markContacted = useEmployerWorkspaceStore((s) => s.markContacted)

  const selectedPosting = postings.find((p) => p.id === selectedPostingId) || postings[0]

  const sweCandidates = useMemo(() => candidates.filter((c) => c.postingId === 'swe-intern'), [])

  const showToast = (message) => {
    window.clearTimeout(toastRef.current)
    setToast(message)
    toastRef.current = window.setTimeout(() => setToast(''), 2200)
  }

  const handleShortlist = (candidate) => {
    setStatuses((prev) => ({ ...prev, [candidate.id]: 'Shortlisted' }))
    shortlistCandidate(candidate.id)
    showToast(`${candidate.name} added to shortlist`)
  }

  const handlePass = (candidate) => {
    setStatuses((prev) => ({ ...prev, [candidate.id]: 'Passed' }))
    passCandidate(candidate.id)
    showToast('Candidate passed')
  }

  const handleContactTop3 = () => setContactStatus('confirm')
  const handleCancelContact = () => setContactStatus('idle')
  const handleConfirmContact = () => {
    setContactStatus('sending')
    window.setTimeout(() => {
      setContactStatus('done')
      markContacted(['ivan-lim', 'nur-alya', 'marcus-tan'])
      showToast('Contacting Ivan Lim, Nur Alya Binti, and Marcus Tan — messages sent.')
    }, 700)
  }

  const handleViewAll = () => {
    showToast('Showing all 8 shortlisted candidates')
  }

  const handleView = (candidate) => {
    navigate(`/employer/candidates?candidateId=${candidate.id}&from=${encodeURIComponent('Talent Discovery')}`)
  }

  const handleNlpSubmit = (text) => {
    const matched = matchNlpQuery(text)
    if (matched && matched.id === 'top-applicants-swe') {
      setSelectedPostingId('swe-intern')
      showToast(matched.toast)
    } else if (matched) {
      showToast(matched.toast)
      navigate(matched.to)
    } else if (text.trim()) {
      showToast(`Showing best matches for "${text}"`)
    }
  }

  return (
    <div className="employer-workspace-page flex h-screen w-screen flex-col overflow-hidden">
      <EmployerNav variant="glass" />
      <main className="min-w-0 flex-1 overflow-y-auto">
        <div className="relative z-10 mx-auto max-w-[1480px] space-y-5 px-6 py-6">
          <PageHeader query={nlpQuery} onQueryChange={setNlpQuery} onSubmit={handleNlpSubmit} />

          <PostingsRow selectedPostingId={selectedPostingId} onSelectPosting={setSelectedPostingId} />

          <AIBriefingStrip
            posting={selectedPosting}
            hasFullData={selectedPosting.hasFullData}
            contactStatus={contactStatus}
            onContactTop3={handleContactTop3}
            onConfirmContact={handleConfirmContact}
            onCancelContact={handleCancelContact}
            onSeeAllShortlisted={handleViewAll}
          />

          {selectedPosting.hasFullData ? (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.85fr_1fr]">
              <AIShortlistedList
                candidates={sweCandidates.slice(0, 3)}
                statuses={statuses}
                onShortlist={handleShortlist}
                onPass={handlePass}
                onViewAll={handleViewAll}
              />
              <div className="space-y-4">
                <ApplicationTracker />
                <AllApplicantsPanel candidates={sweCandidates} statuses={statuses} onView={handleView} />
              </div>
            </div>
          ) : (
            <div className="employer-glass-card flex h-[300px] flex-col items-center justify-center text-center">
              <p className="text-sm font-medium text-slate-500">Loading applicants for {selectedPosting.title}…</p>
            </div>
          )}
        </div>
      </main>
      <DemoToast message={toast} />
    </div>
  )
}
