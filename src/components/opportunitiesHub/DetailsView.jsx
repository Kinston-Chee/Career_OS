import React from 'react'
import { Calendar, MapPin, Users, X } from 'lucide-react'

const LOGO_TONES = {
  indigo: 'bg-indigo-600 text-white',
  emerald: 'bg-emerald-600 text-white',
  rose: 'bg-rose-600 text-white',
  'white-google': 'bg-white text-[#4285F4] border border-[#e2eaf8]',
}

export default function DetailsView({ opportunity, onClose, onApplyNow }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-start justify-between gap-3 border-b border-[#e2eaf8]/70 p-5">
        <div className="flex items-center gap-3">
          <span className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold ${LOGO_TONES[opportunity.logoTone] ?? LOGO_TONES.indigo}`}>
            {opportunity.logo}
          </span>
          <div>
            <p className="text-sm font-bold text-[#11194a]">{opportunity.title}</p>
            <p className="text-xs font-medium text-[#7382a1]">{opportunity.org}</p>
          </div>
        </div>
        <button type="button" onClick={onClose} className="flex-shrink-0 rounded-full p-1.5 text-[#9aa6c3] transition hover:bg-gray-100 hover:text-[#11194a]">
          <X size={16} />
        </button>
      </div>

      <div className="flex-1 space-y-5 overflow-y-auto p-5">
        {opportunity.matchPercent != null && (
          <span className="inline-flex w-fit rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
            {opportunity.matchPercent}% match
          </span>
        )}

        <div>
          <h3 className="text-xs font-bold uppercase tracking-wide text-[#9aa6c3]">About</h3>
          <p className="mt-2 text-sm leading-relaxed text-[#3a4669]">{opportunity.about}</p>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-wide text-[#9aa6c3]">Details</h3>
          <div className="mt-2 space-y-2 text-sm font-medium text-[#3a4669]">
            <p className="flex items-center gap-2">
              <Calendar size={14} className="text-[#7382a1]" /> {opportunity.dateRange}
            </p>
            <p className="flex items-center gap-2">
              <MapPin size={14} className="text-[#7382a1]" /> {opportunity.location}
            </p>
            <p className="flex items-center gap-2">
              <Users size={14} className="text-[#7382a1]" /> {opportunity.teamSize}
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-wide text-[#9aa6c3]">Why you match</h3>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {opportunity.matchSkills.map((skill) => (
              <span key={skill} className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-wide text-[#9aa6c3]">What they're looking for</h3>
          <div className="mt-2 space-y-1.5">
            {opportunity.requirements.map((req) => (
              <p key={req} className="flex items-start gap-2 text-sm text-[#3a4669]">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#9aa6c3]" /> {req}
              </p>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-wide text-[#9aa6c3]">Deadline</h3>
          <span className="mt-2 inline-flex w-fit rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-700">
            {opportunity.deadlineLabel}
          </span>
        </div>
      </div>

      <div className="border-t border-[#e2eaf8]/70 p-5">
        <button
          type="button"
          onClick={onApplyNow}
          className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700"
        >
          Apply now
        </button>
        <button
          type="button"
          className="mt-2 w-full rounded-lg border border-[#dfe8f7] py-2.5 text-sm font-bold text-[#35507d] transition hover:bg-blue-50"
        >
          Save
        </button>
      </div>
    </div>
  )
}
