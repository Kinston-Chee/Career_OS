import React from 'react'
import { CheckCircle2 } from 'lucide-react'

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-gray-50 py-2.5 last:border-b-0">
      <span className="shrink-0 text-xs font-medium text-gray-400">{label}</span>
      <span className="text-right text-sm text-gray-800">{value}</span>
    </div>
  )
}

function SummaryCard({ formData, onEdit }) {
  return (
    <div className="employer-glass-card p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-900">Event summary</h3>
        <button type="button" onClick={onEdit} className="text-xs font-semibold text-[#185FA5] hover:underline">
          ← Edit details
        </button>
      </div>
      <div className="mt-2">
        <SummaryRow label="Event name" value={formData.eventName} />
        <SummaryRow label="Event type" value={formData.eventType} />
        <SummaryRow label="Duration" value={formData.duration} />
        <SummaryRow label="Format" value={formData.format} />
        <SummaryRow label="Target universities" value={formData.targetUniversities.join(', ')} />
        <SummaryRow label="Target year" value={formData.targetYear} />
        <SummaryRow label="Skills tested" value={formData.skillsTested.join(', ')} />
        <SummaryRow label="Max participants" value={formData.maxParticipants} />
        <SummaryRow label="Registration deadline" value={formData.registrationDeadline || 'Not set'} />
        <SummaryRow label="Prizes / incentives" value={formData.prizes} />
      </div>
      <div className="mt-3">
        <p className="text-xs font-medium text-gray-400">Challenge brief</p>
        <p className="mt-1 text-sm leading-6 text-gray-700">{formData.challengeBrief}</p>
      </div>
    </div>
  )
}

function CandidatePreview({ formData }) {
  return (
    <aside className="employer-glass-card p-6">
      <p className="text-xs font-medium text-gray-400">How this looks to candidates</p>
      <div className="mt-3 overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#0f172a,#1e40af_55%,#185FA5)] p-5 text-white">
        <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-[11px] font-medium">{formData.eventType}</span>
        <p className="mt-3 text-lg font-bold leading-tight">{formData.eventName}</p>
        <p className="mt-1 text-sm text-white/80">Acme Corporation · {formData.format}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="rounded-full bg-white/15 px-2.5 py-1 text-xs font-semibold">Match score: 90%+</span>
          <span className="rounded-full bg-white/15 px-2.5 py-1 text-xs font-medium">
            Closes {formData.registrationDeadline || 'soon'}
          </span>
        </div>
      </div>
    </aside>
  )
}

function PublishSuccess({ matchedCount }) {
  return (
    <div className="employer-glass-card flex flex-col items-center justify-center px-6 py-16 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600">
        <CheckCircle2 className="h-9 w-9" />
      </span>
      <p className="mt-4 text-xl font-bold text-gray-900">Engagement published!</p>
      <p className="mt-1.5 text-sm text-gray-500">AI & Backend Engineering Challenge 2025 is now visible to {matchedCount} matched candidates</p>
    </div>
  )
}

export default function WizardStep4Review({ formData, onEditDetails, onPublish, onSaveDraft, isPublished, matchedCount }) {
  if (isPublished) {
    return <PublishSuccess matchedCount={matchedCount} />
  }

  return (
    <div className="mx-auto max-w-[1100px]">
      <h2 className="text-2xl font-bold text-gray-900">Review before publishing</h2>

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[1.5fr_1fr]">
        <SummaryCard formData={formData} onEdit={onEditDetails} />
        <CandidatePreview formData={formData} />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button type="button" onClick={onPublish} className="rounded-full bg-[#185FA5] px-7 py-3 text-sm font-bold text-white shadow-md hover:bg-[#134c87]">
          Publish now
        </button>
        <button type="button" onClick={onSaveDraft} className="rounded-full border border-gray-200 px-7 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50">
          Save as draft
        </button>
      </div>
    </div>
  )
}
