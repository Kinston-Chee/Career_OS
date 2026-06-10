import React, { useEffect, useMemo, useState } from 'react'
import NeedTag from './NeedTag'

const contributionOptions = ['Judges', 'Sponsor', 'Mentor', 'Technical Partner']

function OverviewTab({ request }) {
  return (
    <div className="space-y-6">
      {/* About Section */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">About the Event</h4>
        <p className="mt-2 text-sm leading-relaxed text-slate-650">{request.description}</p>
      </div>

      {/* Target Audience & Reach */}
      <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Expected Engagement</h4>
        <div className="mt-3 grid grid-cols-2 gap-4">
          <div>
            <p className="text-lg font-bold text-blue-600">~{request.estimatedAttendees || '100 - 150'}</p>
            <p className="text-[11px] font-medium text-slate-500 mt-0.5">Estimated Attendees</p>
          </div>
          <div>
            <p className="text-lg font-bold text-blue-600 truncate" title={request.targetUniversities || request.university}>
              {request.university.split(' ')[0]} & Friends
            </p>
            <p className="text-[11px] font-medium text-slate-500 mt-0.5">Target Universities</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800">{request.date}</p>
            <p className="text-[11px] font-medium text-slate-500 mt-0.5">Event Date</p>
          </div>
          <div>
            <a 
              href={`mailto:${request.eventLeadEmail || 'contact@university.edu'}`}
              className="text-sm font-semibold text-blue-600 hover:underline block truncate"
              title={request.eventLeadEmail}
            >
              {request.eventLeadEmail || 'contact@university.edu'}
            </a>
            <p className="text-[11px] font-medium text-slate-500 mt-0.5">Event Lead Contact</p>
          </div>
        </div>
      </div>

      {/* Student Profile Target */}
      <div className="space-y-4">
        {request.targetMajors && (
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Target Student Majors</h4>
            <div className="flex flex-wrap gap-1.5 pt-1.5">
              {request.targetMajors.map((major) => (
                <span key={major} className="inline-flex rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-800 ring-1 ring-blue-100">
                  {major}
                </span>
              ))}
            </div>
          </div>
        )}

        {request.yearsOfStudy && (
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Years of Study</h4>
            <div className="flex flex-wrap gap-1.5 pt-1.5">
              {request.yearsOfStudy.map((year) => (
                <span key={year} className="inline-flex rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800 ring-1 ring-emerald-100">
                  {year}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Skills & Focus */}
        <div className="space-y-1.5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Target Student Skills</h4>
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {request.skills.map((skill) => (
              <span key={skill} className="inline-flex rounded-lg bg-violet-50 px-2.5 py-1 text-xs font-semibold text-violet-850 ring-1 ring-violet-100">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Key Activities */}
      {request.keyActivities && (
        <div className="border-t border-slate-100 pt-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Event Activities</h4>
          <ul className="mt-2 space-y-2 text-xs text-slate-600">
            {request.keyActivities.map((activity, idx) => (
              <li key={idx} className="flex items-start gap-2 leading-relaxed">
                <span className="text-blue-500 font-bold mt-0.5">•</span>
                <span>{activity}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Deliverables for Employers */}
      {request.deliverables && (
        <div className="border-t border-slate-100 pt-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Student Deliverables (Recruiter Access)</h4>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {request.deliverables.map((deliv, idx) => (
              <div key={idx} className="flex items-center gap-2 rounded-lg bg-slate-50 border border-slate-200/60 p-2.5">
                <span className="text-base shrink-0">📄</span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-800 truncate" title={deliv}>{deliv}</p>
                  <p className="text-[10px] text-slate-400">Recruiter Deliverable</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Engagement Highlights */}
      <div className="border-t border-slate-100 pt-4 pb-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Collaboration Benefits</h4>
        <ul className="mt-2 space-y-2 text-xs text-slate-600">
          <li className="flex items-start gap-2 leading-relaxed">
            <span className="text-emerald-500 font-bold mt-0.5">✓</span>
            <span>Premium brand placement in all club pre-event marketing mailers.</span>
          </li>
          <li className="flex items-start gap-2 leading-relaxed">
            <span className="text-emerald-500 font-bold mt-0.5">✓</span>
            <span>Keynote address or dedicated workshop hosting slot.</span>
          </li>
          <li className="flex items-start gap-2 leading-relaxed">
            <span className="text-emerald-500 font-bold mt-0.5">✓</span>
            <span>Direct access to applicant portfolio profiles and evidence traces.</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default function ExpressInterestPanel({ request, proposalDraft, onClose, onSend, activeTab, setActiveTab }) {
  const defaults = useMemo(() => new Set(request?.needs ?? []), [request])
  const [selected, setSelected] = useState(defaults)
  const [proposal, setProposal] = useState(proposalDraft)
  const [generating, setGenerating] = useState(false)

  useEffect(() => {
    setSelected(defaults)
    setProposal(proposalDraft)
  }, [defaults, proposalDraft])

  if (!request) return null

  const interestSent = request.status === 'Interest Sent'

  function toggle(option) {
    if (interestSent) return; // Read-only once interest is sent
    const next = new Set(selected)
    if (next.has(option)) next.delete(option)
    else next.add(option)
    setSelected(next)
  }

  function generateProposal() {
    setGenerating(true)
    window.setTimeout(() => {
      setProposal(
        `We would be excited to support ${request.title} through ${Array.from(selected).join(' and ').toLowerCase()}. Our team can share practical industry context, mentor student teams, and help create stronger evidence for emerging talent.`,
      )
      setGenerating(false)
    }, 700)
  }

  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3">
        <h2 className="text-lg font-semibold text-slate-950">
          {interestSent ? 'Interest Sent' : 'Express Interest'}
        </h2>
        <button type="button" onClick={onClose} className="text-xl text-slate-400 hover:text-slate-650 transition" aria-label="Close panel">
          ✕
        </button>
      </div>

      {/* Request Header Summary */}
      <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-900 to-indigo-650 text-sm font-semibold text-white shadow-sm">
          {request.title.slice(0, 2).toUpperCase()}
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-950 leading-snug">{request.title}</h3>
          <p className="mt-1 text-xs text-slate-500 font-medium">{request.clubName} • {request.university}</p>
        </div>
      </div>

      {/* Tabs Nav bar */}
      <div className="flex border-b border-slate-100 mt-4 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex-1 pb-3 text-center border-b-2 transition duration-150 ${
            activeTab === 'overview' ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
          type="button"
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('express')}
          className={`flex-1 pb-3 text-center border-b-2 transition duration-150 ${
            activeTab === 'express' ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
          type="button"
        >
          {interestSent ? 'Your Proposal' : 'Proposal Form'}
        </button>
      </div>

      {/* Scrollable Content Container */}
      <div className="mt-4 max-h-[60vh] overflow-y-auto pr-1">
        {activeTab === 'overview' ? (
          <OverviewTab request={request} />
        ) : (
          <div className="space-y-6">
            {/* Status Badge */}
            {interestSent && (
              <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-3 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                <svg className="h-4 w-4 text-emerald-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Interest sent! Club reps will respond soon.</span>
              </div>
            )}

            {/* Contributions Checklist */}
            <section>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">How would you like to contribute?</h4>
              <div className="mt-3 space-y-2.5">
                {contributionOptions.map((option) => (
                  <label key={option} className={`flex items-center gap-3 text-xs font-semibold text-slate-700 ${interestSent ? 'opacity-80 cursor-default' : 'cursor-pointer hover:text-slate-950'}`}>
                    <input
                      type="checkbox"
                      checked={selected.has(option)}
                      disabled={interestSent}
                      onChange={() => toggle(option)}
                      className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-50/40"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </section>

            {/* Proposal draft */}
            <section className="border-t border-slate-100 pt-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Collaboration Proposal</h4>
              <textarea
                className="mt-2 min-h-32 w-full rounded-xl border border-slate-200 bg-white p-3 text-xs leading-relaxed text-slate-700 outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-50/50 disabled:bg-slate-50/70 disabled:text-slate-500"
                value={proposal}
                disabled={interestSent}
                onChange={(event) => setProposal(event.target.value)}
                placeholder="Detail how you would like to help..."
              />
            </section>

            {/* Action Button Section */}
            {!interestSent ? (
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={generateProposal}
                  disabled={generating}
                  className="w-full rounded-xl bg-white px-4 py-2.5 text-xs font-semibold text-indigo-700 ring-1 ring-indigo-200 hover:bg-indigo-50 disabled:opacity-60 transition"
                >
                  {generating ? 'Generating...' : '✨ Auto-Generate Proposal'}
                </button>
                <button
                  type="button"
                  onClick={() => onSend(request.id)}
                  className="w-full rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 transition"
                >
                  Send Proposal Interest
                </button>
              </div>
            ) : (
              <div className="pt-2 border-t border-slate-100">
                <button
                  type="button"
                  disabled
                  className="w-full rounded-xl bg-slate-100 px-4 py-2.5 text-xs font-semibold text-slate-400 cursor-not-allowed"
                >
                  Interest Registered
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  )
}
