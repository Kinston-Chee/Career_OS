import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const COMPLETED_EVENTS_DETAILS = {
  'ai-finance-case': {
    title: 'AI in Finance Case Competition',
    organizer: 'FinTech Society',
    date: '18 Apr 2025',
    partners: [
      { logo: 'Gr', name: 'Grab', color: 'from-emerald-600 to-green-500' },
      { logo: 'Mb', name: 'Maybank', color: 'from-yellow-500 to-amber-500' },
      { logo: 'Pw', name: 'PwC', color: 'from-red-600 to-rose-500' }
    ],
    skills: [
      { name: 'Python', level: 'Skill', before: 54, after: 68, change: '+14%' },
      { name: 'Financial Analysis', level: 'High', before: 48, after: 72, change: '+24%' },
      { name: 'Presentation', level: 'Medium', before: 52, after: 76, change: '+24%' },
      { name: 'Team Leadership', level: 'Medium', before: 56, after: 66, change: '+10%' }
    ],
    uplift: '+14%',
    gapsClosed: '3 of 4',
    pipeline: '14',
    companiesCount: '3',
    studentsCount: '120+',
    companyOutcomes: [
      { name: 'Grab', logo: 'Gr', role: 'Logistics', color: 'from-emerald-600 to-green-500', engaged: 48, pipeline: 6, followups: 2, insight: 'Strong participation in judging and feedback. 6 students shortlisted for internship.' },
      { name: 'Maybank', logo: 'Mb', role: 'Sponsor & Mentorship', color: 'from-yellow-500 to-amber-500', engaged: 52, pipeline: 5, followups: 3, insight: 'Provided mentorship cohort and financing case briefs. 5 students shortlisted for mentorship program.' },
      { name: 'PwC', logo: 'Pw', role: 'Judges', color: 'from-red-600 to-rose-500', engaged: 42, pipeline: 5, followups: 2, insight: 'Case judging and detailed session completed. 5 students invited for further assessment.' }
    ]
  },
  'data-storytelling': {
    title: 'Data Storytelling Workshop',
    organizer: 'Analytics Club',
    date: '6 Mar 2025',
    partners: [
      { logo: 'Pw', name: 'PwC', color: 'from-red-600 to-rose-500' },
      { logo: 'JP', name: 'JP Morgan', color: 'from-blue-800 to-sky-600' }
    ],
    skills: [
      { name: 'Data Visualization', level: 'High', before: 50, after: 72, change: '+22%' },
      { name: 'Storytelling', level: 'Medium', before: 45, after: 68, change: '+23%' },
      { name: 'Communication', level: 'Medium', before: 55, after: 64, change: '+9%' }
    ],
    uplift: '+9%',
    gapsClosed: '2 of 3',
    pipeline: '8',
    companiesCount: '2',
    studentsCount: '86',
    companyOutcomes: [
      { name: 'PwC', logo: 'Pw', role: 'Workshop Sponsor', color: 'from-red-600 to-rose-500', engaged: 36, pipeline: 4, followups: 1, insight: 'Conducted a dedicated workshop on consulting insights.' },
      { name: 'JP Morgan', logo: 'JP', role: 'Case Evaluators', color: 'from-blue-800 to-sky-600', engaged: 50, pipeline: 4, followups: 2, insight: 'Shortlisted candidates for corporate research desks.' }
    ]
  },
  'sustainability-challenge': {
    title: 'Sustainability Finance Challenge',
    organizer: 'Sustainability Society',
    date: '27 Nov 2024',
    partners: [
      { logo: 'Gr', name: 'Grab', color: 'from-emerald-600 to-green-500' },
      { logo: 'Ci', name: 'Citi', color: 'from-blue-700 to-indigo-500' }
    ],
    skills: [
      { name: 'Sustainability Strategy', level: 'High', before: 40, after: 65, change: '+25%' },
      { name: 'Financial Modelling', level: 'High', before: 52, after: 68, change: '+16%' },
      { name: 'Policy Writing', level: 'Medium', before: 48, after: 58, change: '+10%' }
    ],
    uplift: '+10%',
    gapsClosed: '2 of 4',
    pipeline: '7',
    companiesCount: '2',
    studentsCount: '65',
    companyOutcomes: [
      { name: 'Grab', logo: 'Gr', role: 'Sponsor', color: 'from-emerald-600 to-green-500', engaged: 35, pipeline: 3, followups: 1, insight: 'Expressed interest in funding top solutions.' },
      { name: 'Citi', logo: 'Ci', role: 'Judges', color: 'from-blue-700 to-indigo-500', engaged: 30, pipeline: 4, followups: 1, insight: 'Provided feedback on ESG risk modeling cases.' }
    ]
  },
  'ml-hackathon': {
    title: 'Machine Learning Hackathon',
    organizer: 'Computer Science Society',
    date: '12 Oct 2024',
    partners: [
      { logo: 'Ms', name: 'Microsoft', color: 'from-blue-600 to-indigo-600' },
      { logo: 'Aw', name: 'AWS', color: 'from-orange-500 to-amber-500' }
    ],
    skills: [
      { name: 'Machine Learning', level: 'High', before: 44, after: 72, change: '+28%' },
      { name: 'Python', level: 'Skill', before: 60, after: 76, change: '+16%' },
      { name: 'Problem Solving', level: 'Medium', before: 50, after: 68, change: '+18%' }
    ],
    uplift: '+16%',
    gapsClosed: '3 of 3',
    pipeline: '18',
    companiesCount: '2',
    studentsCount: '110+',
    companyOutcomes: [
      { name: 'Microsoft', logo: 'Ms', role: 'Mentors', color: 'from-blue-600 to-indigo-600', engaged: 60, pipeline: 10, followups: 4, insight: 'Identified three exceptional ML engineer candidates.' },
      { name: 'AWS', logo: 'Aw', role: 'Cloud Sponsor', color: 'from-orange-500 to-amber-500', engaged: 50, pipeline: 8, followups: 2, insight: 'Provided $5k cloud credits and shortlisted cloud engineering profiles.' }
    ]
  }
}

export default function EventImpactReportPage({ event, onBack, onToast }) {
  const navigate = useNavigate()
  const { eventId } = useParams()
  const activeEventId = eventId || event?.id || 'ai-finance-case'

  // Map any variations like fintech-case-23 to normalized key names
  const sanitizedId = activeEventId === 'fintech-case-23' ? 'ai-finance-case'
                    : activeEventId === 'data-storytelling-15' ? 'data-storytelling'
                    : activeEventId === 'sustainability-case' ? 'sustainability-challenge'
                    : activeEventId

  const details = COMPLETED_EVENTS_DETAILS[sanitizedId] || COMPLETED_EVENTS_DETAILS['ai-finance-case']

  const [showEvidenceDetails, setShowEvidenceDetails] = useState(true)
  const [showTooltip, setShowTooltip] = useState(false)

  const eventName = details.title
  const organizerClub = details.organizer
  const completionDate = details.date
  const skillGaps = details.skills
  const companyOutcomes = details.companyOutcomes

  const benchmarks = [
    { name: 'AI in Finance Case Competition (This Event)', date: '18 Apr 2025', uplift: '+14%', companies: 3, gaps: '3/4', students: '120+', isCurrent: sanitizedId === 'ai-finance-case' },
    { name: 'Data Storytelling Workshop', date: '6 Mar 2025', uplift: '+9%', companies: 2, gaps: '2/4', students: '86', isCurrent: sanitizedId === 'data-storytelling' },
    { name: 'Sustainable Finance Challenge', date: '27 Nov 2024', uplift: '+10%', companies: 3, gaps: '2/4', students: '65', isCurrent: sanitizedId === 'sustainability-challenge' },
    { name: 'Machine Learning Hackathon', date: '12 Oct 2024', uplift: '+16%', companies: 2, gaps: '3/3', students: '110+', isCurrent: sanitizedId === 'ml-hackathon' }
  ]

  return (
    <div className="mx-auto min-w-0 w-full max-w-[1400px] space-y-6 px-6 pb-12">
      
      {/* ================= BREADCRUMBS & TOP HEADER ================= */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-slate-450 pt-2">
        <button type="button" onClick={onBack} className="hover:text-blue-600 transition">Collaboration Marketplace</button>
        <span>/</span>
        <button type="button" onClick={onBack} className="hover:text-blue-600 transition">Post-Event</button>
        <span>/</span>
        <span className="text-slate-800">Event Impact Report</span>
      </nav>

      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Event Impact Report</h1>
        </div>
        
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => onToast('Downloading PDF Report...')}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-650 hover:bg-slate-50 transition inline-flex items-center gap-1.5 shadow-sm"
          >
            📥 Download Report
          </button>
          <button
            type="button"
            onClick={() => onToast('Copied share link to clipboard.')}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-650 hover:bg-slate-50 transition inline-flex items-center gap-1.5 shadow-sm"
          >
            🔗 Share Report
          </button>
        </div>
      </header>

      {/* ================= EVENT SUMMARY STRIP ================= */}
      <section className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_8px_30px_rgba(0,0,0,0.01)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 min-w-0">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-lg shadow-sm">
            🏆
          </span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-sm font-semibold text-slate-900 truncate">{eventName}</h2>
              <span className="rounded bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-100/50">
                Completed
              </span>
            </div>
            <p className="text-xs font-medium text-slate-450 mt-0.5">
              Organized by <strong className="text-slate-700 font-semibold">{organizerClub}</strong> • Completion date: {completionDate}
            </p>
          </div>
        </div>

        {/* Partners Badges */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="text-slate-400 font-semibold text-xs uppercase tracking-wider">Partners:</span>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-150 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700">
              <span className="flex h-4 w-4 items-center justify-center rounded bg-gradient-to-br from-emerald-600 to-green-500 text-xs text-white font-bold">Gr</span>
              Grab
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-150 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700">
              <span className="flex h-4 w-4 items-center justify-center rounded bg-gradient-to-br from-yellow-500 to-amber-500 text-xs text-slate-800 font-bold">Mb</span>
              Maybank
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-150 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700">
              <span className="flex h-4 w-4 items-center justify-center rounded bg-gradient-to-br from-red-600 to-rose-500 text-xs text-white font-bold">Pw</span>
              PwC
            </span>
          </div>
        </div>
      </section>

      {/* ================= MAIN TWO-COLUMN LAYOUT ================= */}
      <div className="grid gap-6 lg:grid-cols-12 items-start">
        {/* LEFT COLUMN: Strategic outcomes metrics and gap tables (col-span-8) */}
        <main className="lg:col-span-8 space-y-6 min-w-0">
          
          {/* 1. EXECUTIVE IMPACT SUMMARY */}
          <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-medium text-slate-900">1. Executive Impact Summary</h3>
                
                {/* Tooltip trigger */}
                <div className="relative flex items-center">
                  <button
                    type="button"
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                    onClick={() => setShowTooltip(!showTooltip)}
                    className="text-slate-400 hover:text-blue-600 text-xs font-bold h-4 w-4 flex items-center justify-center rounded-full border border-slate-200"
                    aria-label="Info about Estimated Readiness Uplift"
                  >
                    ℹ️
                  </button>
                  {showTooltip && (
                    <div className="absolute left-6 bottom-0 z-30 w-64 rounded-xl border border-slate-100 bg-slate-900 p-3 text-xs text-slate-200 shadow-xl leading-relaxed animate-fade-in font-medium">
                      Readiness change is estimated from pre-event baselines, verified participation, submitted work, role evidence, and evaluator feedback.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Metrics cards grid */}
            <div className="grid gap-3 grid-cols-2 md:grid-cols-5">
              <div className="rounded-xl border border-slate-100 bg-slate-50/20 p-3.5 space-y-2 flex flex-col justify-between">
                <span className="text-lg">📈</span>
                <div>
                  <p className="text-sm font-semibold text-slate-400 leading-none">Estimated Readiness Uplift</p>
                  <p className="text-xl font-bold text-emerald-600 mt-2 leading-none">+14%</p>
                  <p className="text-xs text-slate-450 font-semibold mt-1">Avg uplift across participating students</p>
                </div>
              </div>
              
              <div className="rounded-xl border border-slate-100 bg-slate-50/20 p-3.5 space-y-2 flex flex-col justify-between">
                <span className="text-lg">🎯</span>
                <div>
                  <p className="text-sm font-semibold text-slate-400 leading-none">Priority Skill Gaps Improved</p>
                  <p className="text-xl font-bold text-slate-800 mt-2 leading-none">3 of 4</p>
                  <p className="text-xs text-slate-450 font-semibold mt-1">Program-Market Alignment priority gaps closed</p>
                </div>
              </div>

              <div className="rounded-xl border border-slate-100 bg-slate-50/20 p-3.5 space-y-2 flex flex-col justify-between">
                <span className="text-lg">👤</span>
                <div>
                  <p className="text-sm font-semibold text-slate-400 leading-none">Students in Employer Pipeline</p>
                  <p className="text-xl font-bold text-slate-800 mt-2 leading-none">14</p>
                  <p className="text-xs text-slate-450 font-semibold mt-1">Students added to pipeline post-event</p>
                </div>
              </div>

              <div className="rounded-xl border border-slate-100 bg-slate-50/20 p-3.5 space-y-2 flex flex-col justify-between">
                <span className="text-lg">🏢</span>
                <div>
                  <p className="text-sm font-semibold text-slate-400 leading-none">Companies Engaged</p>
                  <p className="text-xl font-bold text-slate-800 mt-2 leading-none">3</p>
                  <p className="text-xs text-slate-450 font-semibold mt-1">Employers actively involved in the event</p>
                </div>
              </div>

              <div className="rounded-xl border border-slate-100 bg-slate-50/20 p-3.5 space-y-2 flex flex-col justify-between">
                <span className="text-lg">👥</span>
                <div>
                  <p className="text-sm font-semibold text-slate-400 leading-none">Students Impacted</p>
                  <p className="text-xl font-bold text-slate-800 mt-2 leading-none">120+</p>
                  <p className="text-xs text-slate-450 font-semibold mt-1">Students in evaluation and considered</p>
                </div>
              </div>
            </div>
          </section>

          {/* 2. SKILL GAP CLOSURE ANALYSIS */}
          <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm space-y-4">
            <div>
              <h3 className="text-sm font-medium text-slate-900">2. Skill Gap Closure Analysis</h3>
              <p className="text-xs font-medium text-slate-450 mt-0.5">Readiness levels before vs after the event. Gaps aligned to Program-Market Alignment priority skills.</p>
            </div>

            {/* Gap analysis table */}
            <div className="overflow-x-auto min-w-0 rounded-xl border border-slate-100">
              <table className="w-full min-w-[720px] text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50 text-slate-400 font-semibold uppercase tracking-wider text-xs">
                    <th className="py-2.5 px-4 w-40">Skill Priority</th>
                    <th className="py-2.5 px-4">Before Event</th>
                    <th className="py-2.5 px-4">After Event</th>
                    <th className="py-2.5 px-4 text-center">Gap Closed</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                  {skillGaps.map(skill => (
                    <tr key={skill.name} className="hover:bg-slate-50/20">
                      <td className="py-3 px-4">
                        <div className="min-w-0">
                          <p className="text-xs text-slate-805 leading-none">{skill.name}</p>
                          <span className="inline-block mt-1.5 rounded bg-slate-100 px-1.5 py-0.5 text-xs font-semibold text-slate-500 leading-none">
                            {skill.level}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 w-48">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="w-8 shrink-0 text-slate-500 text-xs text-right">{skill.before}%</span>
                          <span className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden block">
                            <span className="block h-full bg-slate-400 rounded-full" style={{ width: `${skill.before}%` }} />
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 w-48">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="w-8 shrink-0 text-blue-600 text-xs text-right">{skill.after}%</span>
                          <span className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden block">
                            <span className="block h-full bg-blue-600 rounded-full" style={{ width: `${skill.after}%` }} />
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center text-emerald-600 text-xs font-bold whitespace-nowrap">
                        {skill.change} <span className="text-xs">↑</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="rounded-lg bg-blue-50/30 border border-blue-100/40 p-3 text-xs text-slate-500 font-medium">
              ℹ️ Skill gaps are prioritized based on Program-Market Alignment insights and employer demand.
            </div>
          </section>

          {/* 3. COMPANY ENGAGEMENT OUTCOMES */}
          <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm space-y-4">
            <div>
              <h3 className="text-sm font-medium text-slate-900">3. Company Engagement Outcomes</h3>
            </div>

            {/* Grid of company cards */}
            <div className="grid gap-4 md:grid-cols-3">
              {companyOutcomes.map(company => (
                <article
                  key={company.name}
                  className="rounded-xl border border-slate-200/60 p-4 shadow-[0_4px_12px_rgba(0,0,0,0.01)] space-y-3.5 bg-white hover:border-slate-350 transition flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <header className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${company.color} text-xs font-bold text-white shadow-sm`}>
                          {company.logo}
                        </span>
                        <div className="min-w-0">
                          <h4 className="text-xs font-semibold text-slate-800 truncate">{company.name}</h4>
                          <p className="text-xs text-slate-400 font-semibold truncate leading-none mt-0.5">{company.role}</p>
                        </div>
                      </div>
                    </header>

                    {/* Metrics grid */}
                    <div className="grid grid-cols-3 gap-1 border-t border-slate-50 pt-2 text-xs text-center">
                      <div>
                        <span className="text-xs text-slate-400 font-semibold block uppercase tracking-wider">Engaged</span>
                        <p className="font-bold text-slate-800 mt-1">{company.engaged}</p>
                      </div>
                      <div>
                        <span className="text-xs text-slate-400 font-semibold block uppercase tracking-wider">Pipeline</span>
                        <p className="font-bold text-slate-800 mt-1">{company.pipeline}</p>
                      </div>
                      <div>
                        <span className="text-xs text-slate-400 font-semibold block uppercase tracking-wider">Follow-ups</span>
                        <p className="font-bold text-slate-800 mt-1">{company.followups}</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-slate-50 pt-3 text-xs font-medium text-slate-500 leading-relaxed italic">
                    "{company.insight}"
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* 4. COMPARATIVE EVENT BENCHMARKING */}
          <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm space-y-4">
            <div>
              <h3 className="text-sm font-medium text-slate-900">4. Comparative Event Benchmarking</h3>
              <p className="text-xs font-medium text-slate-450 mt-0.5">Comparison with similar events at universities.</p>
            </div>

            {/* Benchmark Table */}
            <div className="overflow-x-auto min-w-0 rounded-xl border border-slate-100">
              <table className="w-full min-w-[860px] text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50 text-slate-400 font-semibold uppercase tracking-wider text-xs">
                    <th className="py-2.5 px-4">Event</th>
                    <th className="py-2.5 px-4">Date</th>
                    <th className="py-2.5 px-4 text-center">Readiness Lift (Avg)</th>
                    <th className="py-2.5 px-4 text-center">Companies Engaged</th>
                    <th className="py-2.5 px-4 text-center">Priority Gaps Closed</th>
                    <th className="py-2.5 px-4 text-center">Students Impacted</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-semibold text-slate-650">
                  {benchmarks.map(row => (
                    <tr
                      key={row.name}
                      className={`hover:bg-slate-50/20 transition ${
                        row.isCurrent ? 'bg-blue-50/20' : ''
                      }`}
                    >
                      <td className="py-3 px-4 text-slate-800">
                        <div className="flex items-center gap-2">
                          <span className="text-xs">{row.isCurrent ? '⭐' : '📄'}</span>
                          <span className="truncate">{row.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-slate-400 font-semibold">{row.date}</td>
                      <td className="py-3 px-4 text-center text-blue-600 font-bold">{row.uplift}</td>
                      <td className="py-3 px-4 text-center">{row.companies}</td>
                      <td className="py-3 px-4 text-center text-slate-500 font-bold">{row.gaps}</td>
                      <td className="py-3 px-4 text-center">{row.students}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end pt-1">
              <button
                type="button"
                onClick={() => navigate('/university/collaboration/post-event/history', { state: { fromReportEventId: activeEventId } })}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
              >
                View all past events
              </button>
            </div>
          </section>

        </main>

        {/* RIGHT COLUMN: Takeaways, AI recommendation, spot-lights, signals (col-span-4) */}
        <aside className="lg:col-span-4 space-y-6">
          
          {/* 1. STRATEGIC TAKEAWAYS */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-50 pb-2">
              <span className="text-violet-600 font-bold">✨</span>
              <h4 className="text-xs font-semibold text-slate-800">Strategic Takeaways</h4>
            </div>

            <ul className="space-y-3 text-xs text-slate-600 font-medium leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold mt-0.5">✓</span>
                <span>Strongest uplift in Financial Analysis and Presentation.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold mt-0.5">✓</span>
                <span>Lower-readiness students improved meaningfully.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold mt-0.5">✓</span>
                <span>Partner-led judging increased employer pipeline visibility.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold mt-0.5">✓</span>
                <span>This event format is a strong candidate to repeat next semester.</span>
              </li>
            </ul>
          </div>

          {/* 2. AI RECOMMENDATION */}
          <div className="rounded-2xl border border-violet-100 bg-violet-50/35 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-semibold text-slate-855 uppercase tracking-wider">AI Recommendation</h4>
              <span className="rounded bg-violet-100 px-2 py-0.5 text-xs font-semibold text-violet-700 uppercase tracking-wider">
                High Confidence
              </span>
            </div>

            <div className="space-y-1.5">
              <p className="text-xs font-bold text-slate-855">Repeat and expand to Year 2 students</p>
              <p className="text-xs font-medium text-slate-500">This event delivered high impact and strong employer engagement.</p>
            </div>

            <div className="grid gap-2 grid-cols-1 sm:grid-cols-3 pt-2">
              <button
                type="button"
                onClick={() => onToast('Initiated event replication workflow for next semester.')}
                className="rounded-lg bg-white border border-slate-200/80 px-2.5 py-2 text-xs font-semibold text-slate-700 hover:border-violet-300 hover:text-violet-600 transition text-center"
              >
                Repeat Next Semester
              </button>
              <button
                type="button"
                onClick={() => onToast('Adding expansion parameters (Year 2 cohort target) to template...')}
                className="rounded-lg bg-white border border-slate-200/80 px-2.5 py-2 text-xs font-semibold text-slate-700 hover:border-violet-300 hover:text-violet-600 transition text-center"
              >
                Expand to Year 2
              </button>
              <button
                type="button"
                onClick={() => onToast('Sharing collaboration outreach to corporate partner registry...')}
                className="rounded-lg bg-white border border-slate-200/80 px-2.5 py-2 text-xs font-semibold text-slate-700 hover:border-violet-300 hover:text-violet-600 transition text-center"
              >
                Open to More Partners
              </button>
            </div>
          </div>

          {/* 3. STUDENT OUTCOME DISTRIBUTION */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm space-y-4">
            <h4 className="text-xs font-semibold text-slate-800">Student Outcome Distribution</h4>

            <div className="grid grid-cols-2 gap-2 text-center text-xs">
              <div className="rounded-xl border border-slate-100 bg-slate-50/10 p-3 flex flex-col justify-between items-center">
                <span className="h-1.5 w-6 rounded bg-emerald-500 mb-1" />
                <p className="text-xs font-bold text-slate-855">38 students</p>
                <p className="text-xs text-emerald-700 font-bold mt-1">32% High Growth</p>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50/10 p-3 flex flex-col justify-between items-center">
                <span className="h-1.5 w-6 rounded bg-blue-500 mb-1" />
                <p className="text-xs font-bold text-slate-855">52 students</p>
                <p className="text-xs text-blue-700 font-bold mt-1">43% Moderate Growth</p>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50/10 p-3 flex flex-col justify-between items-center">
                <span className="h-1.5 w-6 rounded bg-amber-500 mb-1" />
                <p className="text-xs font-bold text-slate-855">18 students</p>
                <p className="text-xs text-amber-700 font-bold mt-1">15% No Change</p>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50/10 p-3 flex flex-col justify-between items-center">
                <span className="h-1.5 w-6 rounded bg-red-500 mb-1" />
                <p className="text-xs font-bold text-slate-855">12 students</p>
                <p className="text-xs text-red-700 font-bold mt-1">10% Needs Support</p>
              </div>
            </div>
          </div>

          {/* 4. STUDENT SPOTLIGHTS */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-50 pb-2">
              <h4 className="text-xs font-semibold text-slate-800">Student Spotlights</h4>
              <button
                type="button"
                onClick={() => navigate(`/university/collaboration/post-event/${activeEventId}/student-spotlights`)}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition"
              >
                View all
              </button>
            </div>

            {/* Student spotlight cards */}
            <div className="space-y-3">
              <div className="rounded-xl border border-slate-150 p-3 flex items-start gap-3 bg-white hover:border-slate-255 transition">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-700 font-bold text-xs shadow-sm">
                  AT
                </span>
                <div className="min-w-0 space-y-1.5 flex-1">
                  <div className="min-w-0">
                    <h5 className="text-xs font-semibold text-slate-800 leading-none truncate">Aisha Tan</h5>
                    <p className="text-xs text-slate-400 font-semibold leading-none mt-1">BSc Finance</p>
                  </div>
                  <div className="flex items-baseline gap-2 text-xs font-semibold">
                    <span className="text-slate-455 text-xs">Readiness:</span>
                    <span className="text-slate-800">58% → 78%</span>
                    <span className="text-emerald-600 text-xs">(+20%)</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-normal font-medium">
                    Top skills improved: <strong className="text-slate-700 font-semibold">Financial Analysis, Presentation</strong>
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-slate-150 p-3 flex items-start gap-3 bg-white hover:border-slate-255 transition">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-bold text-xs shadow-sm">
                  JL
                </span>
                <div className="min-w-0 space-y-1.5 flex-1">
                  <div className="min-w-0">
                    <h5 className="text-xs font-semibold text-slate-800 leading-none truncate">Jason Lim</h5>
                    <p className="text-xs text-slate-400 font-semibold leading-none mt-1">BSc Data Science</p>
                  </div>
                  <div className="flex items-baseline gap-2 text-xs font-semibold">
                    <span className="text-slate-455 text-xs">Readiness:</span>
                    <span className="text-slate-800">55% → 75%</span>
                    <span className="text-emerald-600 text-xs">(+20%)</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-normal font-medium">
                    Top skills improved: <strong className="text-slate-700 font-semibold">Python, Team Leadership</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 5. EVIDENCE PROCESSING DETAILS */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm space-y-3.5">
            <header
              onClick={() => setShowEvidenceDetails(!showEvidenceDetails)}
              className="flex items-center justify-between cursor-pointer select-none"
            >
              <h4 className="text-xs font-semibold text-slate-400 hover:text-slate-655 transition uppercase tracking-wider">
                Evidence Processing Details
              </h4>
              <span className="text-slate-400 text-xs font-bold">
                {showEvidenceDetails ? '▲' : '▼'}
              </span>
            </header>

            {showEvidenceDetails && (
              <div className="space-y-4 animate-fade-in pt-1">
                <div className="grid grid-cols-2 gap-2 text-center text-xs">
                  <div className="rounded-xl border border-slate-100 bg-slate-50/10 p-2 flex items-center gap-2">
                    <span className="text-sm shrink-0">👥</span>
                    <div className="text-left leading-normal min-w-0">
                      <p className="font-bold text-slate-800 text-xs">124</p>
                      <p className="text-xs text-slate-400 font-semibold truncate leading-none mt-0.5">Attendance verified</p>
                    </div>
                  </div>
                  
                  <div className="rounded-xl border border-slate-100 bg-slate-50/10 p-2 flex items-center gap-2">
                    <span className="text-sm shrink-0">📄</span>
                    <div className="text-left leading-normal min-w-0">
                      <p className="font-bold text-slate-800 text-xs">96</p>
                      <p className="text-xs text-slate-400 font-semibold truncate leading-none mt-0.5">Contributions confirmed</p>
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-100 bg-slate-50/10 p-2 flex items-center gap-2">
                    <span className="text-sm shrink-0">📡</span>
                    <div className="text-left leading-normal min-w-0">
                      <p className="font-bold text-slate-800 text-xs">312</p>
                      <p className="text-xs text-slate-400 font-semibold truncate leading-none mt-0.5">Memory signals created</p>
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-100 bg-rose-50/20 p-2 flex items-center gap-2 border-rose-100/30">
                    <span className="text-sm shrink-0">⚠️</span>
                    <div className="text-left leading-normal min-w-0">
                      <p className="font-bold text-rose-600 text-xs">8</p>
                      <p className="text-xs text-rose-500 font-semibold truncate leading-none mt-0.5">Exceptions pending</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="button"
                    onClick={() => onToast('Opening verification exceptions panel...')}
                    className="text-xs font-semibold text-rose-500 hover:text-rose-600 hover:underline flex items-center gap-0.5"
                  >
                    Review Exceptions →
                  </button>
                </div>
              </div>
            )}
          </div>

        </aside>
      </div>

    </div>
  )
}
