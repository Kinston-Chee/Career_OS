import React, { useState, useMemo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

// Mock database for semesters, programs, types, companies
const SEMESTERS = ['Spring 2025', 'Fall 2024', 'Summer 2024', 'Spring 2024']
const PROGRAMS = ['Computing', 'Business', 'Science', 'Humanities']
const EVENT_TYPES = ['Competition', 'Workshop', 'Hackathon', 'Mentorship']
const COMPANIES = [
  'Maybank', 'PwC', 'Grab', 'JP Morgan', 'Citi', 'Microsoft', 
  'AWS', 'Atlassian', 'SAP', 'Notion', 'Figma', 'Ogilvy', 'TBWA'
]

// Mock Completed Events list
const MOCK_EVENTS = [
  {
    id: 'ai-finance-case',
    title: 'AI in Finance Case Competition',
    type: 'Competition',
    date: '18 Apr 2025',
    dateObj: new Date('2025-04-18'),
    semester: 'Spring 2025',
    organizer: 'FinTech Society',
    organizerInitials: 'FS',
    skills: ['Financial Analysis', 'Presentation', 'Python'],
    uplift: 14,
    companies: ['Maybank', 'PwC', 'Grab'],
    students: '120+',
    followUp: 'Repeat Recommended'
  },
  {
    id: 'data-storytelling',
    title: 'Data Storytelling Workshop',
    type: 'Workshop',
    date: '06 Mar 2025',
    dateObj: new Date('2025-03-06'),
    semester: 'Spring 2025',
    organizer: 'Analytics Club',
    organizerInitials: 'AC',
    skills: ['Data Visualization', 'Storytelling'],
    uplift: 9,
    companies: ['PwC', 'JP Morgan'],
    students: '86',
    followUp: 'Scaled'
  },
  {
    id: 'sustainability-challenge',
    title: 'Sustainability Finance Challenge',
    type: 'Competition',
    date: '27 Nov 2024',
    dateObj: new Date('2024-11-27'),
    semester: 'Fall 2024',
    organizer: 'Sustainability Society',
    organizerInitials: 'SS',
    skills: ['Sustainability', 'Financial Modelling', 'Policy Analysis'],
    uplift: 10,
    companies: ['Grab', 'Citi'],
    students: '65',
    followUp: 'Repeat Recommended'
  },
  {
    id: 'ml-hackathon',
    title: 'Machine Learning Hackathon',
    type: 'Hackathon',
    date: '12 Oct 2024',
    dateObj: new Date('2024-10-12'),
    semester: 'Fall 2024',
    organizer: 'Computer Science Society',
    organizerInitials: 'CS',
    skills: ['Machine Learning', 'Python', 'MLOps'],
    uplift: 16,
    companies: ['Microsoft', 'AWS'],
    students: '110+',
    followUp: 'Repeat Recommended'
  },
  {
    id: 'women-tech',
    title: 'Women in Tech Mentorship Series',
    type: 'Mentorship',
    date: '22 Aug 2024',
    dateObj: new Date('2024-08-22'),
    semester: 'Summer 2024',
    organizer: 'Women in Tech Society',
    organizerInitials: 'WT',
    skills: ['Leadership', 'Communication'],
    uplift: 8,
    companies: ['Atlassian', 'SAP'],
    students: '95',
    followUp: 'Targeted Follow-up'
  },
  {
    id: 'product-sprint',
    title: 'Campus Product Sprint',
    type: 'Hackathon',
    date: '15 May 2024',
    dateObj: new Date('2024-05-15'),
    semester: 'Spring 2024',
    organizer: 'Innovation Hub',
    organizerInitials: 'IH',
    skills: ['Product Design', 'Problem Solving'],
    uplift: 11,
    companies: ['Notion', 'Figma'],
    students: '78',
    followUp: 'Scaled'
  },
  {
    id: 'brand-strategy',
    title: 'Brand Strategy Workshop',
    type: 'Workshop',
    date: '21 Feb 2024',
    dateObj: new Date('2024-02-21'),
    semester: 'Spring 2024',
    organizer: 'Marketing Club',
    organizerInitials: 'MC',
    skills: ['Brand Strategy', 'Marketing', 'Consumer Insights'],
    uplift: 7,
    companies: ['Ogilvy', 'TBWA'],
    students: '62',
    followUp: 'Historical Insight'
  }
]

export default function EventImpactHistoryPage({ onToast }) {
  const navigate = useNavigate()
  const location = useLocation()

  // Find where we came from, to return back to report
  const fromReportEventId = location.state?.fromReportEventId || 'ai-finance-case'

  // --- FILTERS STATE ---
  const [searchQuery, setSearchQuery] = useState('')
  const [semesterFilter, setSemesterFilter] = useState('All Semesters')
  const [programFilter, setProgramFilter] = useState('All Programs')
  const [typeFilter, setTypeFilter] = useState('All Types')
  const [companyFilter, setCompanyFilter] = useState('All Companies')

  // --- SORTING STATE ---
  const [sortField, setSortField] = useState('date') // 'date' or 'uplift'
  const [sortDirection, setSortDirection] = useState('desc') // 'asc' or 'desc'

  // --- PAGINATION STATE ---
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  // --- FILTER & SORT LOGIC ---
  const filteredEvents = useMemo(() => {
    return MOCK_EVENTS.filter(event => {
      const search = searchQuery.toLowerCase().trim()
      const matchesSearch = !search ||
        event.title.toLowerCase().includes(search) ||
        event.organizer.toLowerCase().includes(search) ||
        event.skills.some(s => s.toLowerCase().includes(search))

      const matchesSemester = semesterFilter === 'All Semesters' || event.semester === semesterFilter
      
      // Simulating program matches locally
      const matchesProgram = programFilter === 'All Programs' || 
        (programFilter === 'Computing' && ['CS', 'AC', 'FS'].includes(event.organizerInitials)) ||
        (programFilter === 'Business' && ['MC', 'IH'].includes(event.organizerInitials)) ||
        (programFilter === 'Science' && ['SS'].includes(event.organizerInitials)) ||
        (programFilter === 'Humanities' && ['WT'].includes(event.organizerInitials))

      const matchesType = typeFilter === 'All Types' || event.type === typeFilter
      const matchesCompany = companyFilter === 'All Companies' || event.companies.includes(companyFilter)

      return matchesSearch && matchesSemester && matchesProgram && matchesType && matchesCompany
    })
  }, [searchQuery, semesterFilter, programFilter, typeFilter, companyFilter])

  const sortedEvents = useMemo(() => {
    const sorted = [...filteredEvents]
    sorted.sort((a, b) => {
      let valA = a[sortField]
      let valB = b[sortField]

      if (sortField === 'date') {
        valA = a.dateObj.getTime()
        valB = b.dateObj.getTime()
      }

      if (valA < valB) return sortDirection === 'asc' ? -1 : 1
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1
      return 0
    })
    return sorted
  }, [filteredEvents, sortField, sortDirection])

  const paginatedEvents = useMemo(() => {
    const startIdx = (currentPage - 1) * rowsPerPage
    return sortedEvents.slice(startIdx, startIdx + rowsPerPage)
  }, [sortedEvents, currentPage, rowsPerPage])

  const totalPages = Math.ceil(sortedEvents.length / rowsPerPage) || 1

  // Handle pagination reset on filter change
  const handleClearFilters = () => {
    setSearchQuery('')
    setSemesterFilter('All Semesters')
    setProgramFilter('All Programs')
    setTypeFilter('All Types')
    setCompanyFilter('All Companies')
    setCurrentPage(1)
    onToast('Cleared all history filters')
  }

  const toggleSort = (field) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('desc')
    }
    setCurrentPage(1)
  }

  // Helper colors for Event Type tags
  const getTypeBadgeClass = (type) => {
    switch (type) {
      case 'Competition': return 'bg-purple-50 text-purple-705 border-purple-100/50'
      case 'Workshop': return 'bg-indigo-50 text-indigo-705 border-indigo-100/50'
      case 'Hackathon': return 'bg-blue-50 text-blue-705 border-blue-100/50'
      case 'Mentorship': return 'bg-rose-50 text-rose-705 border-rose-100/50'
      default: return 'bg-slate-50 text-slate-700 border-slate-100/50'
    }
  }

  // Helper colors for Follow-up outcome badges
  const getFollowUpBadge = (status) => {
    switch (status) {
      case 'Repeat Recommended':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 border border-emerald-100/55">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Repeat Recommended
          </span>
        )
      case 'Scaled':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 border border-blue-100/55">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            Scaled
          </span>
        )
      case 'Targeted Follow-up':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 border border-amber-100/55">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            Targeted Follow-up
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-500 border border-slate-200/50">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
            Archived Insight
          </span>
        )
    }
  }

  return (
    <div className="mx-auto min-w-0 w-full max-w-[1400px] space-y-6 px-6 pb-12">
      
      {/* ================= BREADCRUMBS ================= */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-slate-450 pt-2">
        <span className="hover:text-blue-600 transition cursor-pointer" onClick={() => navigate('/university/collaboration')}>Collaboration Marketplace</span>
        <span>/</span>
        <span className="hover:text-blue-600 transition cursor-pointer" onClick={() => navigate('/university/collaboration', { state: { tab: 'Post-Event' } })}>Post-Event</span>
        <span>/</span>
        <span className="hover:text-blue-600 transition cursor-pointer" onClick={() => navigate(`/university/collaboration/post-event/report/${fromReportEventId}`)}>Event Impact Report</span>
        <span>/</span>
        <span className="text-slate-800">Event Impact History</span>
      </nav>

      {/* ================= HEADER ================= */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Event Impact History</h1>
          <p className="text-xs text-slate-500 font-medium mt-1">Search and compare completed events across past semesters.</p>
        </div>
        
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => onToast('Exporting history details as CSV...')}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-655 hover:bg-slate-50 transition inline-flex items-center gap-1.5 shadow-sm"
          >
            📥 Export History
          </button>
          <button
            type="button"
            onClick={() => navigate(`/university/collaboration/post-event/report/${fromReportEventId}`)}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-655 hover:bg-slate-50 transition inline-flex items-center gap-1.5 shadow-sm"
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
              placeholder="Search events, partners, or skills..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-4 py-2 text-xs outline-none placeholder:text-slate-400 focus:border-blue-300 transition"
            />
          </div>

          {/* Select filter dropdowns */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Semester Dropdown */}
            <div className="flex items-center gap-1">
              <select
                value={semesterFilter}
                onChange={(e) => { setSemesterFilter(e.target.value); setCurrentPage(1); }}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 outline-none cursor-pointer hover:bg-slate-50"
              >
                <option value="All Semesters">All Semesters</option>
                {SEMESTERS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            {/* Program Dropdown */}
            <div className="flex items-center gap-1">
              <select
                value={programFilter}
                onChange={(e) => { setProgramFilter(e.target.value); setCurrentPage(1); }}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 outline-none cursor-pointer hover:bg-slate-50"
              >
                <option value="All Programs">All Programs</option>
                {PROGRAMS.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>

            {/* Event Type Dropdown */}
            <div className="flex items-center gap-1">
              <select
                value={typeFilter}
                onChange={(e) => { setTypeFilter(e.target.value); setCurrentPage(1); }}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 outline-none cursor-pointer hover:bg-slate-50"
              >
                <option value="All Types">All Types</option>
                {EVENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            {/* Company Dropdown */}
            <div className="flex items-center gap-1">
              <select
                value={companyFilter}
                onChange={(e) => { setCompanyFilter(e.target.value); setCurrentPage(1); }}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 outline-none cursor-pointer hover:bg-slate-50"
              >
                <option value="All Companies">All Companies</option>
                {COMPANIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Clear button */}
            <button
              type="button"
              onClick={handleClearFilters}
              className="rounded-lg border border-slate-200/80 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition flex items-center gap-1"
            >
              🔄 Clear Filters
            </button>
          </div>
        </div>
      </section>

      {/* ================= SUMMARY METRICS ================= */}
      <section className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm flex items-center gap-3.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-sm">📅</span>
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider leading-none">Completed Events</h3>
            <p className="text-xl font-bold text-slate-800 mt-2 leading-none">28</p>
            <p className="text-xs font-medium text-slate-450 mt-1">Across all semesters</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm flex items-center gap-3.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-sm">📈</span>
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider leading-none">Average Readiness Uplift</h3>
            <p className="text-xl font-bold text-emerald-600 mt-2 leading-none">+10%</p>
            <p className="text-xs font-medium text-slate-450 mt-1">Across all events</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm flex items-center gap-3.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-sm">🏢</span>
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider leading-none">Companies Engaged</h3>
            <p className="text-xl font-bold text-slate-800 mt-2 leading-none">42</p>
            <p className="text-xs font-medium text-slate-450 mt-1">Unique companies</p>
          </div>
        </div>
      </section>

      {/* ================= MAIN CONTENT LAYOUT ================= */}
      <div className="grid gap-6 lg:grid-cols-12 items-start">
        
        {/* Left: Events table */}
        <main className="lg:col-span-9 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm space-y-4 min-w-0">
          <div className="overflow-x-auto min-w-0 rounded-xl border border-slate-100">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50 text-slate-455 font-semibold uppercase tracking-wider text-xs select-none">
                  <th className="py-2.5 px-4 w-64">Event</th>
                  
                  {/* Sorting Header for Date */}
                  <th className="py-2.5 px-4 cursor-pointer hover:bg-slate-100/50 transition w-32" onClick={() => toggleSort('date')}>
                    <div className="flex items-center gap-1">
                      <span>Date</span>
                      <span className="text-xs text-slate-400 font-bold">{sortField === 'date' ? (sortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                    </div>
                  </th>

                  <th className="py-2.5 px-4">Organizer</th>
                  <th className="py-2.5 px-4">Skill Gaps Closed</th>

                  {/* Sorting Header for Uplift */}
                  <th className="py-2.5 px-4 cursor-pointer hover:bg-slate-100/50 transition text-center w-28" onClick={() => toggleSort('uplift')}>
                    <div className="flex items-center justify-center gap-1">
                      <span>Readiness Uplift</span>
                      <span className="text-xs text-slate-400 font-bold">{sortField === 'uplift' ? (sortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                    </div>
                  </th>

                  <th className="py-2.5 px-4 text-center">Companies Engaged</th>
                  <th className="py-2.5 px-4 text-center">Students Impacted</th>
                  <th className="py-2.5 px-4 text-center">Follow-up Outcome</th>
                  <th className="py-2.5 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold text-slate-650">
                {paginatedEvents.map(event => (
                  <tr key={event.id} className="hover:bg-slate-50/20 transition">
                    
                    {/* Event Name + Type */}
                    <td className="py-3 px-4">
                      <div className="min-w-0 space-y-1">
                        <div className="flex items-center gap-2">
                          {event.id === fromReportEventId && <span className="text-xs text-amber-500 shrink-0">⭐</span>}
                          <p className="text-xs font-semibold text-slate-855 truncate leading-none">{event.title}</p>
                        </div>
                        <span className={`inline-block rounded border px-1.5 py-0.5 text-xs font-semibold uppercase tracking-wide leading-none ${getTypeBadgeClass(event.type)}`}>
                          {event.type}
                        </span>
                      </div>
                    </td>

                    {/* Date + Semester */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <p className="text-xs text-slate-700 leading-none">{event.date}</p>
                      <p className="text-xs text-slate-400 font-semibold leading-none mt-1">{event.semester}</p>
                    </td>

                    {/* Organizer */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="flex h-6.5 w-6.5 shrink-0 items-center justify-center rounded bg-gradient-to-br from-blue-50 to-indigo-100 text-xs text-blue-700 font-bold border border-slate-100">
                          {event.organizerInitials}
                        </span>
                        <span className="text-xs text-slate-700 font-medium">{event.organizer}</span>
                      </div>
                    </td>

                    {/* Skill Gaps Closed */}
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {event.skills.slice(0, 2).map(skill => (
                          <span key={skill} className="rounded bg-slate-100 px-1.5 py-0.5 text-xs font-medium text-slate-600 border border-slate-200/10 leading-none">
                            {skill}
                          </span>
                        ))}
                        {event.skills.length > 2 && (
                          <span className="rounded bg-blue-50 px-1 py-0.5 text-xs font-bold text-blue-600 leading-none">
                            +{event.skills.length - 2}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Readiness Uplift */}
                    <td className="py-3 px-4 text-center text-emerald-600 font-bold text-xs whitespace-nowrap">
                      +{event.uplift}%
                    </td>

                    {/* Companies stack */}
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center -space-x-1.5">
                        {event.companies.map((company, index) => (
                          <span
                            key={`${company}-${index}`}
                            className="flex h-5 w-5 items-center justify-center rounded-full border border-white bg-gradient-to-br from-slate-900 to-blue-700 text-xs font-bold text-white shadow-sm shrink-0"
                            title={company}
                          >
                            {company.slice(0, 2)}
                          </span>
                        ))}
                        <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white bg-slate-100 text-xs font-bold text-slate-500 shrink-0">
                          +1
                        </span>
                      </div>
                    </td>

                    {/* Students impacted */}
                    <td className="py-3 px-4 text-center font-medium text-slate-700 whitespace-nowrap">
                      {event.students}
                    </td>

                    {/* Follow-up outcome */}
                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      {getFollowUpBadge(event.followUp)}
                    </td>

                    {/* Action buttons */}
                    <td className="py-3 px-4 text-center whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => navigate(`/university/collaboration/post-event/report/${event.id}`)}
                          className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-blue-600 hover:border-blue-300 hover:bg-blue-50/20 transition flex items-center gap-1"
                        >
                          👁️ View Report
                        </button>
                        <button
                          type="button"
                          onClick={() => onToast('Kebab options toggled.')}
                          className="p-1 rounded text-slate-400 hover:text-slate-750 transition text-xs font-semibold leading-none"
                        >
                          ⋮
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}

                {paginatedEvents.length === 0 && (
                  <tr>
                    <td colSpan="9" className="py-8 text-center text-xs text-slate-400 italic">
                      No past events found matching the selected filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination bar */}
          <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between pt-2 text-xs font-semibold text-slate-450 border-t border-slate-50 select-none">
            <span>Showing {sortedEvents.length > 0 ? (currentPage - 1) * rowsPerPage + 1 : 0}-{Math.min(currentPage * rowsPerPage, sortedEvents.length)} of {sortedEvents.length} events</span>
            
            <div className="flex items-center gap-4">
              {/* Rows per page selector */}
              <div className="flex items-center gap-1">
                <span>Rows per page:</span>
                <select
                  value={rowsPerPage}
                  onChange={(e) => { setRowsPerPage(parseInt(e.target.value)); setCurrentPage(1); }}
                  className="rounded border border-slate-200 bg-white p-0.5 text-xs font-semibold text-slate-650 cursor-pointer"
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>

              {/* Prev / Next Page controls */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  className="flex h-5.5 w-5.5 items-center justify-center rounded border border-slate-200 bg-white text-xs font-bold text-slate-500 hover:bg-slate-50 transition disabled:opacity-50 disabled:hover:bg-white"
                >
                  &lt;
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`flex h-5.5 w-5.5 items-center justify-center rounded border text-xs font-semibold transition ${
                      currentPage === page
                        ? 'border-blue-600 bg-blue-600 text-white font-bold'
                        : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  className="flex h-5.5 w-5.5 items-center justify-center rounded border border-slate-200 bg-white text-xs font-bold text-slate-500 hover:bg-slate-50 transition disabled:opacity-50 disabled:hover:bg-white"
                >
                  &gt;
                </button>
              </div>
            </div>

          </div>
        </main>

        {/* Right: AI Pattern Summary */}
        <aside className="lg:col-span-3 space-y-6">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm space-y-4">
            
            <header className="flex items-center gap-2 border-b border-slate-50 pb-2">
              <span className="text-violet-600 font-bold text-sm">✨</span>
              <h4 className="text-xs font-semibold text-slate-800 uppercase tracking-wider">AI Pattern Summary</h4>
            </header>

            <div className="space-y-4 text-xs font-medium text-slate-600 leading-relaxed">
              
              <div className="flex gap-2.5 items-start">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-violet-50 text-violet-750 text-xs font-bold">1</span>
                <div>
                  <h5 className="font-bold text-slate-800 leading-tight">Competitions & Hackathons drive highest uplift</h5>
                  <p className="text-xs text-slate-450 mt-1">These formats show the strongest readiness uplift, averaging +13%.</p>
                </div>
              </div>

              <div className="flex gap-2.5 items-start border-t border-slate-50 pt-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-blue-50 text-blue-750 text-xs font-bold">2</span>
                <div>
                  <h5 className="font-bold text-slate-800 leading-tight">Maybank, PwC & Microsoft recur most</h5>
                  <p className="text-xs text-slate-450 mt-1">These partners have engaged in two or more events and show high follow-up conversion.</p>
                </div>
              </div>

              <div className="flex gap-2.5 items-start border-t border-slate-50 pt-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-amber-50 text-amber-750 text-xs font-bold">3</span>
                <div>
                  <h5 className="font-bold text-slate-800 leading-tight">Skill gaps remain in Leadership & Sustainability</h5>
                  <p className="text-xs text-slate-450 mt-1">These areas show lower closure rates and need more targeted interventions.</p>
                </div>
              </div>

            </div>

            <button
              type="button"
              onClick={() => onToast('Redirecting to full Strategic Insights dashboard...')}
              className="w-full flex items-center justify-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-blue-600 shadow-sm transition hover:border-blue-200 hover:bg-blue-50/20"
            >
              View Insights Dashboard ↗
            </button>

          </div>
        </aside>

      </div>

    </div>
  )
}
