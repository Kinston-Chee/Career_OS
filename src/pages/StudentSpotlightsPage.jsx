import React, { useState, useMemo } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'

// Mock programs, growth bands, pipeline status, and skills
const PROGRAMS = ['BSc Finance', 'BSc Data Science', 'BSc Business Analytics', 'BSc Marketing', 'BSc Computer Science']
const GROWTH_BANDS = ['All Growth Bands', 'High Growth (>=15%)', 'Moderate Growth (<15%)']
const PIPELINE_STATUSES = ['All Pipeline Statuses', 'In Partner Pipeline', 'No Pipeline']
const SKILLS = ['Financial Analysis', 'Presentation', 'Python', 'Team Leadership', 'Data Storytelling', 'SQL', 'Communication', 'Problem Solving', 'Machine Learning', 'Teamwork']

// Mock students database for AI in Finance Case Competition
const MOCK_STUDENTS = [
  {
    id: 'aisha-tan',
    name: 'Aisha Tan',
    initials: 'AT',
    program: 'BSc Finance',
    role: 'Presenter',
    before: 58,
    after: 78,
    uplift: 20,
    skills: ['Financial Analysis', 'Presentation'],
    pipeline: 'Grab',
    pipelineLogo: 'Gr',
    pipelineColor: 'bg-emerald-600',
    reason: 'Strong judging performance and leadership'
  },
  {
    id: 'jason-lim',
    name: 'Jason Lim',
    initials: 'JL',
    program: 'BSc Data Science',
    role: 'Lead Developer',
    before: 55,
    after: 75,
    uplift: 20,
    skills: ['Python', 'Team Leadership'],
    pipeline: 'Maybank',
    pipelineLogo: 'Mb',
    pipelineColor: 'bg-amber-500',
    reason: 'Largest improvement among technical participants'
  },
  {
    id: 'nurul-afiqah',
    name: 'Nurul Afiqah',
    initials: 'NA',
    program: 'BSc Business Analytics',
    role: 'Analyst',
    before: 49,
    after: 70,
    uplift: 21,
    skills: ['Data Storytelling', 'SQL'],
    pipeline: 'PwC',
    pipelineLogo: 'Pw',
    pipelineColor: 'bg-red-600',
    reason: 'Strong storytelling and case-presentation growth'
  },
  {
    id: 'chloe-lim',
    name: 'Chloe Lim',
    initials: 'CL',
    program: 'BSc Marketing',
    role: 'Presenter',
    before: 60,
    after: 74,
    uplift: 14,
    skills: ['Communication', 'Presentation'],
    pipeline: 'No pipeline',
    pipelineLogo: '',
    pipelineColor: 'bg-slate-300',
    reason: 'High collaboration and presentation quality'
  },
  {
    id: 'brian-ooi',
    name: 'Brian Ooi',
    initials: 'BO',
    program: 'BSc Computer Science',
    role: 'Developer',
    before: 52,
    after: 69,
    uplift: 17,
    skills: ['Python', 'Problem Solving'],
    pipeline: 'Grab',
    pipelineLogo: 'Gr',
    pipelineColor: 'bg-emerald-600',
    reason: 'Strong technical growth and team contribution'
  },
  {
    id: 'mei-wong',
    name: 'Mei Wong',
    initials: 'MW',
    program: 'BSc Finance',
    role: 'Researcher',
    before: 57,
    after: 71,
    uplift: 14,
    skills: ['Financial Analysis', 'Teamwork'],
    pipeline: 'EY',
    pipelineLogo: 'EY',
    pipelineColor: 'bg-yellow-600',
    reason: 'Consistent performance across all rounds'
  },
  {
    id: 'daniel-lee',
    name: 'Daniel Lee',
    initials: 'DL',
    program: 'BSc Data Science',
    role: 'AI Engineer',
    before: 63,
    after: 81,
    uplift: 18,
    skills: ['Machine Learning', 'Communication'],
    pipeline: 'Microsoft',
    pipelineLogo: 'Ms',
    pipelineColor: 'bg-blue-600',
    reason: 'High readiness and strong employer interest'
  }
]

export default function StudentSpotlightsPage({ onToast }) {
  const navigate = useNavigate()
  const { eventId } = useParams()
  const location = useLocation()

  // Fallback active event ID if not in path
  const activeEventId = eventId || 'ai-finance-case'

  // --- FILTERS STATE ---
  const [searchQuery, setSearchQuery] = useState('')
  const [programFilter, setProgramFilter] = useState('All Programs')
  const [growthFilter, setGrowthFilter] = useState('All Growth Bands')
  const [pipelineFilter, setPipelineFilter] = useState('All Pipeline Statuses')
  const [skillFilter, setSkillFilter] = useState('All Skill Areas')

  // --- PAGINATION STATE ---
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  // --- FILTER LOGIC ---
  const filteredStudents = useMemo(() => {
    return MOCK_STUDENTS.filter(student => {
      const search = searchQuery.toLowerCase().trim()
      const matchesSearch = !search ||
        student.name.toLowerCase().includes(search) ||
        student.program.toLowerCase().includes(search) ||
        student.skills.some(s => s.toLowerCase().includes(search))

      const matchesProgram = programFilter === 'All Programs' || student.program === programFilter
      
      const matchesGrowth = growthFilter === 'All Growth Bands' ||
        (growthFilter === 'High Growth (>=15%)' && student.uplift >= 15) ||
        (growthFilter === 'Moderate Growth (<15%)' && student.uplift < 15)

      const matchesPipeline = pipelineFilter === 'All Pipeline Statuses' ||
        (pipelineFilter === 'In Partner Pipeline' && student.pipeline !== 'No pipeline') ||
        (pipelineFilter === 'No Pipeline' && student.pipeline === 'No pipeline')

      const matchesSkill = skillFilter === 'All Skill Areas' || student.skills.includes(skillFilter)

      return matchesSearch && matchesProgram && matchesGrowth && matchesPipeline && matchesSkill
    })
  }, [searchQuery, programFilter, growthFilter, pipelineFilter, skillFilter])

  const paginatedStudents = useMemo(() => {
    const startIdx = (currentPage - 1) * rowsPerPage
    return filteredStudents.slice(startIdx, startIdx + rowsPerPage)
  }, [filteredStudents, currentPage, rowsPerPage])

  const totalPages = Math.ceil(filteredStudents.length / rowsPerPage) || 1

  const handleClearFilters = () => {
    setSearchQuery('')
    setProgramFilter('All Programs')
    setGrowthFilter('All Growth Bands')
    setPipelineFilter('All Pipeline Statuses')
    setSkillFilter('All Skill Areas')
    setCurrentPage(1)
    onToast('Cleared all spotlight filters')
  }

  // Get color tone based on student name initials
  const getAvatarBg = (initials) => {
    const charCode = initials.charCodeAt(0) + initials.charCodeAt(1)
    if (charCode % 4 === 0) return 'bg-violet-100 text-violet-700'
    if (charCode % 4 === 1) return 'bg-blue-100 text-blue-700'
    if (charCode % 4 === 2) return 'bg-pink-100 text-pink-700'
    return 'bg-emerald-100 text-emerald-700'
  }

  return (
    <div className="mx-auto min-w-0 w-full max-w-[1400px] space-y-6 px-6 pb-12">
      
      {/* ================= BREADCRUMBS ================= */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-slate-450 pt-2">
        <span className="hover:text-blue-600 transition cursor-pointer" onClick={() => navigate('/university/collaboration')}>Collaboration Marketplace</span>
        <span>/</span>
        <span className="hover:text-blue-600 transition cursor-pointer" onClick={() => navigate('/university/collaboration', { state: { tab: 'Post-Event' } })}>Post-Event</span>
        <span>/</span>
        <span className="hover:text-blue-600 transition cursor-pointer" onClick={() => navigate(`/university/collaboration/post-event/report/${activeEventId}`)}>Event Impact Report</span>
        <span>/</span>
        <span className="text-slate-800">Student Spotlights</span>
      </nav>

      {/* ================= HEADER ================= */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Student Spotlights</h1>
          <p className="text-xs text-slate-500 font-medium mt-1">Students demonstrating the strongest readiness growth and verified outcomes from this event.</p>
        </div>
        
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => onToast('Exporting student spotlights list as CSV...')}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-650 hover:bg-slate-50 transition inline-flex items-center gap-1.5 shadow-sm"
          >
            📥 Export List
          </button>
          <button
            type="button"
            onClick={() => navigate(`/university/collaboration/post-event/report/${activeEventId}`)}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-650 hover:bg-slate-50 transition inline-flex items-center gap-1.5 shadow-sm"
          >
            ← Back to Report
          </button>
        </div>
      </header>

      {/* ================= FILTER BAR ================= */}
      <section className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          
          {/* Search bar */}
          <div className="flex items-center gap-2 w-full lg:w-96 shrink-0 relative">
            <span className="absolute left-3.5 text-slate-400 text-xs font-semibold">🔍</span>
            <input
              type="text"
              placeholder="Search students, skills, or programs..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-4 py-2 text-xs outline-none placeholder:text-slate-400 focus:border-blue-300 transition"
            />
          </div>

          {/* Select filter dropdowns */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Program Dropdown */}
            <div className="flex items-center gap-1">
              <select
                value={programFilter}
                onChange={(e) => { setProgramFilter(e.target.value); setCurrentPage(1); }}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[10px] font-semibold text-slate-650 outline-none cursor-pointer hover:bg-slate-50"
              >
                <option value="All Programs">All Programs</option>
                {PROGRAMS.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>

            {/* Growth Band Dropdown */}
            <div className="flex items-center gap-1">
              <select
                value={growthFilter}
                onChange={(e) => { setGrowthFilter(e.target.value); setCurrentPage(1); }}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[10px] font-semibold text-slate-650 outline-none cursor-pointer hover:bg-slate-50"
              >
                <option value="All Growth Bands">All Growth Bands</option>
                <option value="High Growth (>=15%)">High Growth (&gt;=15%)</option>
                <option value="Moderate Growth (<15%)">Moderate Growth (&lt;15%)</option>
              </select>
            </div>

            {/* Pipeline Status Dropdown */}
            <div className="flex items-center gap-1">
              <select
                value={pipelineFilter}
                onChange={(e) => { setPipelineFilter(e.target.value); setCurrentPage(1); }}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[10px] font-semibold text-slate-650 outline-none cursor-pointer hover:bg-slate-50"
              >
                <option value="All Pipeline Statuses">All Pipeline Statuses</option>
                <option value="In Partner Pipeline">In Partner Pipeline</option>
                <option value="No Pipeline">No Pipeline</option>
              </select>
            </div>

            {/* Skill Area Dropdown */}
            <div className="flex items-center gap-1">
              <select
                value={skillFilter}
                onChange={(e) => { setSkillFilter(e.target.value); setCurrentPage(1); }}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[10px] font-semibold text-slate-650 outline-none cursor-pointer hover:bg-slate-50"
              >
                <option value="All Skill Areas">All Skill Areas</option>
                {SKILLS.map(sk => <option key={sk} value={sk}>{sk}</option>)}
              </select>
            </div>

            {/* Clear Filters */}
            <button
              type="button"
              onClick={handleClearFilters}
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-[10px] font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition"
            >
              🔄 Clear Filters
            </button>
          </div>
        </div>
      </section>

      {/* ================= STUDENT SUMMARY METRICS ================= */}
      <section className="grid gap-3 grid-cols-2 md:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm flex items-center gap-3.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-sm">👥</span>
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider leading-none">Highlighted Students</h3>
            <p className="text-xl font-bold text-slate-800 mt-2 leading-none">24</p>
            <p className="text-[9px] font-medium text-slate-450 mt-1">Top outcomes from this event</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm flex items-center gap-3.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-sm">📈</span>
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider leading-none">Average Growth</h3>
            <p className="text-xl font-bold text-emerald-600 mt-2 leading-none">+18%</p>
            <p className="text-[9px] font-medium text-slate-450 mt-1">Evidence-based readiness uplift</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm flex items-center gap-3.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-sm">🤝</span>
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider leading-none">Students in Pipeline</h3>
            <p className="text-xl font-bold text-slate-800 mt-2 leading-none">14</p>
            <p className="text-[9px] font-medium text-slate-450 mt-1">Connected with employer partners</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm flex items-center gap-3.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-sm">⚡</span>
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider leading-none">High-Growth Students</h3>
            <p className="text-xl font-bold text-slate-800 mt-2 leading-none">9</p>
            <p className="text-[9px] font-medium text-slate-450 mt-1">Above +15% readiness uplift</p>
          </div>
        </div>
      </section>

      {/* ================= MAIN CONTENT LAYOUT ================= */}
      <div className="grid gap-6 lg:grid-cols-12 items-start">
        {/* Left: Students Table */}
        <main className="lg:col-span-8 rounded-2xl border border-slate-200/80 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.015)] overflow-hidden min-w-0">
          
          {/* Table view with internal horizontal scroll wrapper */}
          <div className="overflow-x-auto min-w-0">
            <table className="w-full text-left text-xs border-collapse min-w-[1180px]">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/75 text-slate-500 font-medium uppercase tracking-wider text-[9.5px] select-none">
                  <th className="py-3 px-4 w-[150px] min-w-[150px]">Student</th>
                  <th className="py-3 px-4 w-[150px] min-w-[150px]">Program</th>
                  <th className="py-3 px-4 w-[180px] min-w-[180px]">
                    <div className="flex items-center gap-1">
                      <span>Readiness Change</span>
                      <span className="text-[10px] text-slate-400 font-bold cursor-pointer" title="Estimated readiness growth based on verified evidence">ⓘ</span>
                    </div>
                  </th>
                  <th className="py-3 px-4 w-[190px] min-w-[190px]">Top Skills Improved</th>
                  <th className="py-3 px-4 w-[150px] min-w-[150px]">Employer Pipeline</th>
                  <th className="py-3 px-4 w-[220px] min-w-[220px]">Spotlight Reason</th>
                  <th className="sticky right-0 z-10 bg-slate-50/95 py-3 px-4 w-[120px] min-w-[120px] text-right shadow-[-8px_0_16px_rgba(15,23,42,0.04)]">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-150 text-slate-650">
                {paginatedStudents.map(student => (
                  <tr key={student.id} className="hover:bg-slate-50/40 transition">
                    
                    {/* Student Avatar + Name + Role */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold shadow-sm ${getAvatarBg(student.initials)}`}>
                          {student.initials}
                        </span>
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-slate-900 leading-none whitespace-nowrap">{student.name}</p>
                          <p className="text-[9.5px] text-slate-400 mt-1 leading-none whitespace-nowrap">{student.role}</p>
                        </div>
                      </div>
                    </td>

                    {/* Program */}
                    <td className="py-3 px-4 text-xs font-normal text-slate-600 whitespace-nowrap">
                      {student.program}
                    </td>

                    {/* Readiness Change */}
                    <td className="py-3 px-4">
                      <div className="space-y-1.5 max-w-[160px]">
                        <div className="flex items-center justify-between text-[10.5px] font-medium">
                          <div className="flex items-center gap-1 text-slate-500">
                            <span className="font-medium text-slate-600">{student.before}%</span>
                            <span>→</span>
                            <span className="text-slate-800 font-semibold">{student.after}%</span>
                          </div>
                          <span className="text-[10px] font-medium text-emerald-700">
                            (+{student.uplift}%)
                          </span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 flex" title={`${student.name}: ${student.before}% baseline, +${student.uplift}% improvement, ${100 - student.after}% remaining headroom`}>
                          <span className="h-full bg-emerald-700" style={{ width: `${student.before}%` }} />
                          <span className="h-full bg-emerald-200" style={{ width: `${student.uplift}%` }} />
                          <span className="h-full flex-1 bg-slate-100" />
                        </div>
                      </div>
                    </td>

                    {/* Top Skills Improved */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5">
                        {student.skills.slice(0, 2).map(skill => (
                          <span key={skill} className="rounded bg-blue-50/60 border border-blue-100/30 px-2.5 py-0.5 text-[9.5px] font-medium text-blue-700 whitespace-nowrap">
                            {skill}
                          </span>
                        ))}
                        {student.skills.length > 2 && (
                          <span className="rounded bg-slate-50 border border-slate-200/40 px-1.5 py-0.5 text-[9px] font-bold text-slate-500 whitespace-nowrap">
                            +{student.skills.length - 2}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Employer Pipeline */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      {student.pipeline === 'No pipeline' ? (
                        <span className="text-[10px] font-normal text-slate-400">
                          No pipeline
                        </span>
                      ) : (
                        <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-150 bg-white px-2 py-0.5 text-[10px] text-slate-700 font-medium shadow-sm">
                          <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[8.5px] text-white font-bold ${student.pipelineColor}`}>
                            {student.pipelineLogo}
                          </span>
                          <span className="text-slate-800 font-medium">{student.pipeline}</span>
                        </div>
                      )}
                    </td>

                    {/* Spotlight Reason */}
                    <td className="py-3 px-4">
                      <p className="text-xs font-normal text-slate-500 leading-relaxed line-clamp-2 whitespace-normal">
                        {student.reason}
                      </p>
                    </td>

                    <td className="sticky right-0 bg-white py-3 px-4 text-right shadow-[-8px_0_16px_rgba(15,23,42,0.04)]">
                      <button
                        type="button"
                        className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-medium text-blue-700 transition hover:border-blue-200 hover:bg-blue-50 focus:outline-none focus:ring-4 focus:ring-blue-100"
                      >
                        View Profile
                      </button>
                    </td>

                  </tr>
                ))}

                {paginatedStudents.length === 0 && (
                  <tr>
                    <td colSpan="7" className="py-8 text-center text-xs text-slate-400 italic">
                      No students found matching the selected filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <footer className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between p-4 text-[11px] font-normal text-slate-500 border-t border-slate-150 select-none bg-white">
            <div>
              Showing <span className="font-medium text-slate-700">{(currentPage - 1) * rowsPerPage + 1}</span>–
              <span className="font-medium text-slate-700">{Math.min(currentPage * rowsPerPage, filteredStudents.length)}</span> of{" "}
              <span className="font-medium text-slate-700">{filteredStudents.length}</span> students
            </div>
            
            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className="flex h-6 w-6 items-center justify-center rounded border border-slate-200 bg-white text-[10px] font-bold text-slate-550 hover:bg-slate-50 transition disabled:opacity-50"
              >
                &lt;
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`flex h-6 w-6 items-center justify-center rounded border text-[10px] font-semibold transition ${
                    currentPage === page
                      ? 'border-blue-600 bg-blue-50 text-blue-600 font-bold'
                      : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-55'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                className="flex h-6 w-6 items-center justify-center rounded border border-slate-200 bg-white text-[10px] font-bold text-slate-550 hover:bg-slate-50 transition disabled:opacity-50"
              >
                &gt;
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span>Rows per page</span>
              <select
                value={rowsPerPage}
                onChange={(e) => { setRowsPerPage(parseInt(e.target.value)); setCurrentPage(1); }}
                className="rounded border border-slate-200 bg-white px-1.5 py-1 text-[11px] font-medium text-slate-655 cursor-pointer outline-none hover:bg-slate-50"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>
          </footer>
        </main>

        {/* Right Columns: Sidebars */}
        <aside className="lg:col-span-4 space-y-6">
          
          {/* AI Spotlight Insights */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm space-y-4">
            <header className="flex items-center gap-2 border-b border-slate-50 pb-2">
              <span className="text-violet-600 font-bold text-sm">✨</span>
              <h4 className="text-xs font-semibold text-slate-800 uppercase tracking-wider">AI Spotlight Insights</h4>
            </header>

            <ul className="space-y-3.5 text-xs text-slate-600 font-medium leading-relaxed">
              <li className="flex items-start gap-2.5">
                <span className="text-violet-500 font-bold mt-0.5">•</span>
                <span>Finance and analytics students showed the strongest average uplift.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-violet-500 font-bold mt-0.5">•</span>
                <span>Students with presentation roles had higher visibility with employer partners.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-violet-500 font-bold mt-0.5">•</span>
                <span>Leadership and communication signals correlated with pipeline conversion.</span>
              </li>
            </ul>

            <button
              type="button"
              onClick={() => onToast('Generating full outcome analysis report...')}
              className="w-full flex items-center justify-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-[10px] font-semibold text-blue-600 shadow-sm transition hover:border-blue-200 hover:bg-blue-50/20"
            >
              View Full Outcome Analysis ↗
            </button>
          </div>

          {/* Top Skill Themes */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm space-y-3">
            <h4 className="text-xs font-semibold text-slate-800 uppercase tracking-wider">Top Skill Themes</h4>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {['Financial Analysis', 'Presentation', 'Python', 'Team Leadership', 'Data Storytelling'].map(theme => (
                <span key={theme} className="rounded-full bg-blue-50/70 border border-blue-100/50 px-3 py-1 text-[10px] font-semibold text-blue-700 leading-none">
                  {theme}
                </span>
              ))}
            </div>
          </div>

          {/* Spotlight Selection Criteria */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm space-y-3">
            <h4 className="text-xs font-semibold text-slate-800 uppercase tracking-wider">Spotlight Selection Criteria</h4>
            
            <ul className="space-y-2.5 text-xs text-slate-500 font-medium leading-relaxed pt-1">
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>Verified participation</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>Readiness uplift above cohort baseline</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>Strong employer or evaluator signal</span>
              </li>
            </ul>

            <div className="rounded-lg bg-slate-50 p-3 text-[9.5px] leading-relaxed text-slate-400 font-medium border border-slate-100 mt-2">
              These factors filter students into this view, helping verify outcomes and increase institutional trust.
            </div>
          </div>

        </aside>

      </div>

    </div>
  )
}
