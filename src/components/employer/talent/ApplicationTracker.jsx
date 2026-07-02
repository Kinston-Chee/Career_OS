import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle2, ListChecks, Mail, XCircle } from 'lucide-react'
import { useEmployerWorkspaceStore } from '../../../store/useEmployerWorkspaceStore'
import { candidates as allCandidates } from '../../../data/talentDiscoveryData'

// Small cross-page tracker: reflects shortlist/pass/contact decisions made
// anywhere in the Employer Workspace (Talent Discovery, Candidate detail,
// Campus Pipeline drawer) since they all write to the same Zustand store.
export default function ApplicationTracker() {
  const navigate = useNavigate()
  const shortlistedIds = useEmployerWorkspaceStore((s) => s.shortlistedIds)
  const passedIds = useEmployerWorkspaceStore((s) => s.passedIds)
  const contactedIds = useEmployerWorkspaceStore((s) => s.contactedIds)

  const shortlistedNames = [...shortlistedIds]
    .map((id) => allCandidates.find((c) => c.id === id)?.name || id)
    .slice(-3)
    .reverse()

  return (
    <section className="employer-glass-card p-4">
      <div className="flex items-center gap-2">
        <ListChecks className="h-4 w-4 text-[#185FA5]" />
        <h3 className="text-sm font-bold text-gray-900">Application Tracker</h3>
      </div>
      <p className="mt-0.5 text-xs text-gray-400">Live across Talent Discovery, Candidates &amp; Campus Pipeline</p>

      <div className="mt-3 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-xl bg-green-50 py-2">
          <p className="text-lg font-bold text-green-700">{shortlistedIds.size}</p>
          <p className="text-[10px] font-medium text-green-600">Shortlisted</p>
        </div>
        <div className="rounded-xl bg-blue-50 py-2">
          <p className="text-lg font-bold text-[#185FA5]">{contactedIds.size}</p>
          <p className="text-[10px] font-medium text-[#185FA5]">Contacted</p>
        </div>
        <div className="rounded-xl bg-gray-100 py-2">
          <p className="text-lg font-bold text-gray-600">{passedIds.size}</p>
          <p className="text-[10px] font-medium text-gray-500">Passed</p>
        </div>
      </div>

      {shortlistedNames.length ? (
        <div className="mt-3 space-y-1.5">
          {shortlistedNames.map((name) => (
            <p key={name} className="flex items-center gap-1.5 text-xs text-gray-600">
              <CheckCircle2 className="h-3 w-3 shrink-0 text-green-600" />
              {name}
            </p>
          ))}
        </div>
      ) : (
        <p className="mt-3 text-xs text-gray-400">No candidates shortlisted yet.</p>
      )}

      <button
        type="button"
        onClick={() => navigate('/employer/candidates?stage=Shortlisted')}
        className="mt-3 w-full text-center text-xs font-semibold text-[#185FA5] hover:text-[#134c87]"
      >
        View in Candidates →
      </button>
    </section>
  )
}
