import React from 'react'
import SkillTag from '../../memory/SkillTag'
import NeedTag from './NeedTag'

const alignmentReasons = {
  'ai-finance-case-competition': 'Strong alignment with your AI and data initiatives focused on real-world financial problem solving.',
  'data-storytelling-workshop': 'Great fit to showcase your analytics expertise and mentorship for aspiring data storytellers.',
  'campus-product-sprint': 'High relevance to your product innovation goals and user-centric development focus.',
  'cybersecurity-ctf': 'Strong fit to identify cybersecurity talent and sponsor ethical hacking champions.',
}

export default function ClubRequestCard({ request, onViewDetails, onExpressInterest }) {
  const interestSent = request.status === 'Interest Sent'
  const alignmentText = alignmentReasons[request.id] || request.matchReason

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.04)] hover:shadow-[0_18px_54px_rgba(15,23,42,0.06)] hover:border-slate-350 transition duration-200 flex flex-col justify-between h-full">
      <div className="space-y-4">
        {/* Top Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-900 to-indigo-650 text-sm font-semibold text-white shadow-sm">
              {request.title.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h3 className="text-base font-semibold leading-tight text-slate-950">{request.title}</h3>
              <p className="mt-1 text-xs font-medium text-slate-500">
                {request.clubName}, {request.university}
              </p>
            </div>
          </div>
          
          {/* Match Score Badge (Horizontal style matching target design) */}
          <div className="rounded-lg border border-slate-100 bg-slate-50/50 p-2 min-w-[96px] shrink-0 text-right">
            <div className="flex items-center justify-between gap-2.5">
              <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-wider">Strong Match</span>
              <span className="text-xs font-bold text-slate-900">{request.matchScore}%</span>
            </div>
            <div className="mt-1 h-1 w-full rounded-full bg-slate-100 overflow-hidden">
              <div className="h-full rounded-full bg-emerald-500" style={{ width: `${request.matchScore}%` }} />
            </div>
          </div>
        </div>

        {/* Date and Needs Row with Icons */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-medium text-slate-500">
          <div className="flex items-center gap-1.5">
            {/* Calendar icon */}
            <svg className="h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>{request.date}</span>
          </div>
          
          <span className="text-slate-350" aria-hidden="true">|</span>
          
          <div className="flex items-center gap-1.5">
            {/* People icon */}
            <svg className="h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <div className="flex flex-wrap gap-1.5">
              {request.needs.map((need) => (
                <NeedTag key={need}>{need}</NeedTag>
              ))}
            </div>
          </div>
        </div>

        {/* Star Alignment Banner Row */}
        <div className="flex items-center gap-3 rounded-xl border border-blue-100 bg-blue-50/20 p-3">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-blue-200 bg-white text-blue-600 shadow-sm shadow-blue-50">
            {/* Star icon */}
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>
          <p className="text-xs leading-normal font-medium text-slate-700">
            {alignmentText}
          </p>
        </div>

        {/* Target Skills Section */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Target Skills</h4>
          <div className="flex flex-wrap gap-1.5">
            {request.skills.map((skill) => (
              <SkillTag key={skill}>{skill}</SkillTag>
            ))}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed text-slate-600">{request.description}</p>
      </div>

      {/* Action CTA Buttons */}
      <div className="mt-6 flex gap-3">
        {interestSent ? (
          <>
            <span className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-emerald-50 py-2.5 text-sm font-semibold text-emerald-700 ring-1 ring-emerald-100">
              <svg className="h-4 w-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Interest Sent
            </span>
            <button
              type="button"
              onClick={() => onViewDetails(request)}
              className="flex-1 rounded-xl border border-slate-200 bg-white py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all duration-150"
            >
              View Details
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={() => onViewDetails(request)}
              className="flex-1 rounded-xl border border-blue-600 bg-white py-2.5 text-sm font-semibold text-blue-600 hover:bg-blue-50/50 transition-all duration-150"
            >
              View Details
            </button>
            <button
              type="button"
              onClick={() => onExpressInterest(request)}
              className="flex-1 rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-all duration-150"
            >
              Express Interest
            </button>
          </>
        )}
      </div>
    </article>
  )
}
