import React, { useState, useMemo } from 'react'

export default function AIPostEventCompletionPage({ onBack, onToast, onViewImpactReport }) {
  // --- STATE FOR FILTERS AND SELECTIONS ---
  const [selectedDate, setSelectedDate] = useState(null) // Date filtered from calendar, e.g. "23 May 2025"
  const [searchQuery, setSearchQuery] = useState('')
  const [semesterFilter, setSemesterFilter] = useState('All')
  const [programFilter, setProgramFilter] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All')
  
  // 5-working-days simulation toggle state
  const [simulateExpired, setSimulateExpired] = useState(false)

  // Current calendar month view state
  const [calendarMonth, setCalendarMonth] = useState('May 2025')

  // Pagination page state
  const [currentPage, setCurrentPage] = useState(1)

  // --- MOCK COMPLETED EVENTS DATABASE ---
  const COMPLETED_EVENTS = [
    {
      id: 'fintech-case-23',
      title: 'AI in Finance Case Competition',
      organizer: 'FinTech Society x Grab, Maybank, Pwc',
      date: '23 May 2025',
      skills: ['Financial Modeling', 'Presentation', 'Data Analytics'],
      uplift: 14,
      companies: 14,
      students: 64,
      reportReady: true,
      category: 'Case Competition',
      semester: 'Semester 1',
      program: 'Computing'
    },
    {
      id: 'product-sprint-23',
      title: 'Campus Product Sprint',
      organizer: 'Innovation Hub x Industry.io',
      date: '23 May 2025',
      skills: ['Product Design', 'Rapid Prototyping', 'Collaboration'],
      uplift: 11,
      companies: 13,
      students: 88,
      reportReady: true,
      category: 'Sprint',
      semester: 'Semester 1',
      program: 'Business'
    },
    {
      id: 'data-storytelling-15',
      title: 'Data Storytelling Workshop',
      organizer: 'Analytics Club x Deloitte',
      date: '15 May 2025',
      skills: ['Data Visualization', 'Communication'],
      uplift: 9,
      companies: 9,
      students: 80,
      reportReady: true,
      category: 'Workshop',
      semester: 'Semester 1',
      program: 'Computing'
    },
    {
      id: 'ai-ethics-15',
      title: 'AI Ethics Seminar',
      organizer: 'Philosophy Club x Microsoft',
      date: '15 May 2025',
      skills: ['AI Ethics', 'Critical Thinking'],
      uplift: 5,
      companies: 1,
      students: 110,
      reportReady: true,
      category: 'Seminar',
      semester: 'Semester 1',
      program: 'Humanities'
    },
    {
      id: 'cloud-summit-9',
      title: 'Cloud Technology Summit',
      organizer: 'Cloud Society x AWS',
      date: '09 May 2025',
      skills: ['Cloud Computing', 'AWS Systems'],
      uplift: 15,
      companies: 8,
      students: 150,
      reportReady: true,
      category: 'Seminar',
      semester: 'Semester 1',
      program: 'Computing'
    },
    {
      id: 'cybersecurity-9',
      title: 'Cybersecurity Capture the Flag',
      organizer: 'InfoSec Society x Cisco',
      date: '09 May 2025',
      skills: ['Network Security', 'Penetration Testing'],
      uplift: 13,
      companies: 4,
      students: 95,
      reportReady: true,
      category: 'Hackathon',
      semester: 'Semester 1',
      program: 'Computing'
    },
    {
      id: 'brand-strategy',
      title: 'Brand Strategy Workshop',
      organizer: 'Marketing Club x Ogilvy',
      date: '18 Apr 2025',
      skills: ['Market Research', 'Brand Positioning'],
      uplift: 9,
      companies: 2,
      students: 64,
      reportReady: true,
      category: 'Workshop',
      semester: 'Semester 1',
      program: 'Business'
    },
    {
      id: 'ml-hackathon',
      title: 'Machine Learning Hackathon',
      organizer: 'CS Society x Google',
      date: '19 Apr 2025',
      skills: ['Python', 'ML Models', 'Problem Solving'],
      uplift: 16,
      companies: 3,
      students: 120,
      reportReady: true,
      category: 'Hackathon',
      semester: 'Semester 1',
      program: 'Computing'
    },
    {
      id: 'women-tech',
      title: 'Women in Tech Mentorship Series',
      organizer: 'WomenTech x Grab',
      date: '02 Apr 2025',
      skills: ['Career Planning', 'Communication'],
      uplift: 7,
      companies: 2,
      students: 75,
      reportReady: true,
      category: 'Mentorship',
      semester: 'Semester 1',
      program: 'Business'
    },
    {
      id: 'sustainability-case',
      title: 'Sustainability Case Challenge',
      organizer: 'Sustainability Club x ESG',
      date: '27 Mar 2025',
      skills: ['Sustainability Strategy', 'Systems Thinking'],
      uplift: 10,
      companies: 3,
      students: 58,
      reportReady: true,
      category: 'Case Competition',
      semester: 'Semester 2',
      program: 'Science'
    },
    {
      id: 'data-analytics-bootcamp',
      title: 'Data Analytics Bootcamp',
      organizer: 'Analytics Club x Deloitte',
      date: '27 Mar 2025',
      skills: ['SQL', 'Data Visualization', 'Storytelling'],
      uplift: 12,
      companies: 2,
      students: 54,
      reportReady: true,
      category: 'Bootcamp',
      semester: 'Semester 2',
      program: 'Computing'
    }
  ]

  // --- CALENDAR GRID DATA (FOR MAY 2025) ---
  const calendarDays = [
    { day: 28, isCurrentMonth: false },
    { day: 29, isCurrentMonth: false },
    { day: 30, isCurrentMonth: false },
    { day: 1, isCurrentMonth: true, dots: ['bg-red-500'] },
    { day: 2, isCurrentMonth: true, dots: ['bg-blue-500'] },
    { day: 3, isCurrentMonth: true },
    { day: 4, isCurrentMonth: true },
    { day: 5, isCurrentMonth: true },
    { day: 6, isCurrentMonth: true },
    { day: 7, isCurrentMonth: true, dots: ['bg-emerald-500'] },
    { day: 8, isCurrentMonth: true },
    { day: 9, isCurrentMonth: true, dots: ['bg-emerald-500', 'bg-blue-500'], badge: '+2' },
    { day: 10, isCurrentMonth: true },
    { day: 11, isCurrentMonth: true },
    { day: 12, isCurrentMonth: true },
    { day: 13, isCurrentMonth: true, dots: ['bg-blue-500'], badge: '2' },
    { day: 14, isCurrentMonth: true },
    { day: 15, isCurrentMonth: true, dots: ['bg-blue-500', 'bg-emerald-500'], badge: '+3' },
    { day: 16, isCurrentMonth: true, dots: ['bg-blue-500'], badge: '+2' },
    { day: 17, isCurrentMonth: true },
    { day: 18, isCurrentMonth: true },
    { day: 19, isCurrentMonth: true },
    { day: 20, isCurrentMonth: true, dots: ['bg-blue-500'], badge: '+4' },
    { day: 21, isCurrentMonth: true },
    { day: 22, isCurrentMonth: true },
    { day: 23, isCurrentMonth: true, dots: ['bg-blue-500', 'bg-emerald-500'], badge: '+3' },
    { day: 24, isCurrentMonth: true },
    { day: 25, isCurrentMonth: true },
    { day: 26, isCurrentMonth: true },
    { day: 27, isCurrentMonth: true },
    { day: 28, isCurrentMonth: true },
    { day: 29, isCurrentMonth: true },
    { day: 30, isCurrentMonth: true, dots: ['bg-blue-500'], badge: '2' },
    { day: 31, isCurrentMonth: true },
    { day: 1, isCurrentMonth: false }
  ]

  // --- RECENT COMPLETED EVENTS (Visibility limit: 5 working days) ---
  const recentOutcomes = [
    {
      id: 'fintech-case-23',
      title: 'AI in Finance Case Competition',
      organizer: 'FinTech Society x Grab, Maybank, Pwc',
      daysAgo: '2 days ago',
      uplift: '+14%',
      gaps: '8',
      students: '64',
      companies: '14',
      aiStatement: 'Strong growth in financial modeling readiness and presentation skills.',
      icon: '📈',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'data-storytelling-15',
      title: 'Data Storytelling Workshop',
      organizer: 'Analytics Club Club x Deloitte',
      daysAgo: '4 days ago',
      uplift: '+9%',
      gaps: '6',
      students: '80',
      companies: '9',
      aiStatement: 'Improved data visualization and insight communication.',
      icon: '🖥️',
      color: 'from-violet-500 to-purple-600'
    },
    {
      id: 'product-sprint-23',
      title: 'Campus Product Sprint',
      organizer: 'Innovation Hub x Industry.io',
      daysAgo: '5 days ago',
      uplift: '+11%',
      gaps: '7',
      students: '88',
      companies: '13',
      aiStatement: 'High collaboration and rapid prototyping demonstrated.',
      icon: '🚀',
      color: 'from-orange-500 to-red-500'
    }
  ]

  // --- CALENDAR SELECTION FILTER HANDLERS ---
  const handleDateClick = (day) => {
    if (!day.isCurrentMonth) return
    const formattedDate = `${day.day.toString().padStart(2, '0')} May 2025`
    // Convert 09 May 2025 -> 9 May 2025 to align with database
    const sanitizedDate = formattedDate.replace(/^0/, '')
    setSelectedDate(sanitizedDate)
    setCurrentPage(1)
    onToast(`Filtered history to ${sanitizedDate}`)
  }

  const handleClearDateFilter = () => {
    setSelectedDate(null)
    onToast('Cleared date filter')
  }

  // --- FILTERED HISTORICAL RECORDS ---
  const filteredHistory = useMemo(() => {
    return COMPLETED_EVENTS.filter(event => {
      const query = searchQuery.toLowerCase().trim()
      const matchesSearch = !query || 
        event.title.toLowerCase().includes(query) ||
        event.organizer.toLowerCase().includes(query) ||
        event.skills.some(s => s.toLowerCase().includes(query))

      const matchesDate = !selectedDate || event.date === selectedDate
      const matchesSemester = semesterFilter === 'All' || event.semester === semesterFilter
      const matchesProgram = programFilter === 'All' || event.program === programFilter
      const matchesType = typeFilter === 'All' || event.category === typeFilter

      return matchesSearch && matchesDate && matchesSemester && matchesProgram && matchesType
    })
  }, [searchQuery, selectedDate, semesterFilter, programFilter, typeFilter])

  // Paginated elements
  const itemsPerPage = 5
  const paginatedHistory = useMemo(() => {
    const startIdx = (currentPage - 1) * itemsPerPage
    return filteredHistory.slice(startIdx, startIdx + itemsPerPage)
  }, [filteredHistory, currentPage])

  const totalPages = Math.ceil(filteredHistory.length / itemsPerPage) || 1

  const eventCountByDate = useMemo(() => {
    return COMPLETED_EVENTS.reduce((acc, event) => {
      acc[event.date] = (acc[event.date] || 0) + 1
      return acc
    }, {})
  }, [])

  return (
    <div className="mx-auto min-w-0 w-full max-w-[1400px] space-y-6 px-6 pb-12">
      
      {/* ================= HEADER AND MAIN TABS ================= */}
      <header className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 border-b border-slate-100 pb-5">
        <div className="space-y-1.5">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950">Collaboration Marketplace</h1>
          <p className="text-sm text-slate-500 max-w-2xl font-medium leading-relaxed">
            Connect university clubs with external collaborators and convert event participation into trusted career evidence.
          </p>
        </div>
      </header>

      {/* Main Lifecycle Navigation */}
      <nav className="border-b border-slate-200">
        <div className="flex gap-6">
          <button
            type="button"
            onClick={onBack}
            className="pb-3 text-sm font-semibold border-b-2 transition border-transparent text-slate-500 hover:text-slate-700"
          >
            Pre-Event
          </button>
          <button
            type="button"
            className="pb-3 text-sm font-semibold border-b-2 transition border-blue-600 text-blue-700"
          >
            Post-Event
          </button>
        </div>
      </nav>

      {/* ================= TOP 2-COLUMN LAYOUT ================= */}
      <div className="grid gap-6 lg:grid-cols-12 items-start">
        
        {/* LEFT COLUMN: LATEST EVENT OUTCOMES (col-span-7) */}
        <section className="lg:col-span-7 space-y-4 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-semibold text-slate-900">Latest Event Outcomes</h2>
                <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 border border-emerald-100/50">
                  Live Insights
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500">Events completed within the last 5 working days.</p>
            </div>
            
            {/* Simulation controls */}
            <label className="flex items-center gap-2 cursor-pointer text-[10px] font-semibold text-slate-500 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 hover:bg-slate-100 transition shadow-sm shrink-0">
              <input
                type="checkbox"
                checked={simulateExpired}
                onChange={(e) => {
                  setSimulateExpired(e.target.checked)
                  onToast(e.target.checked ? 'Simulated outcomes older than 5 working days (archived)' : 'Simulated outcomes active')
                }}
                className="rounded text-blue-600 focus:ring-blue-100 cursor-pointer"
              />
              <span>Simulate &gt; 5 days ago (Archive)</span>
            </label>
          </div>

          {simulateExpired ? (
            <div className="rounded-2xl border border-slate-200 border-dashed bg-slate-50/50 p-12 text-center flex flex-col justify-center items-center shadow-[inset_0_4px_12px_rgba(0,0,0,0.01)]">
              <span className="text-3xl mb-3">📁</span>
              <h3 className="text-xs font-semibold text-slate-700">No outcomes in the last 5 working days</h3>
              <p className="text-[10px] font-medium text-slate-400 mt-1 max-w-sm">
                All completed outcomes have elapsed the 5-working-day threshold and are securely archived in the Event Impact History registry.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-3">
              {recentOutcomes.map(item => (
                <article
                  key={item.id}
                  className="rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm transition hover:border-blue-200 hover:shadow-[0_8px_24px_rgba(0,0,0,0.02)] flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <header className="flex items-start justify-between gap-2">
                      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${item.color} text-sm text-white shadow-sm`}>
                        {item.icon}
                      </span>
                      <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[8px] font-semibold text-emerald-700 border border-emerald-100/50">
                        {item.daysAgo}
                      </span>
                    </header>

                    <div>
                      <h3 className="text-xs font-semibold text-slate-800 line-clamp-2 leading-snug">{item.title}</h3>
                      <p className="text-[9px] text-slate-400 font-semibold truncate mt-0.5">{item.organizer}</p>
                    </div>

                    {/* Compact stats grid */}
                    <div className="grid grid-cols-2 gap-2 border-t border-slate-50 pt-2 text-[10px]">
                      <div>
                        <span className="text-[9px] text-slate-400 font-semibold block uppercase tracking-wider">Readiness</span>
                        <p className="font-bold text-slate-800 flex items-center gap-0.5 text-[10px] mt-0.5">
                          <span className="text-emerald-500">↑</span> {item.uplift}
                        </p>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-400 font-semibold block uppercase tracking-wider">Priority Gaps</span>
                        <p className="font-bold text-slate-800 text-[10px] mt-0.5">🎯 {item.gaps} improved</p>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-400 font-semibold block uppercase tracking-wider">In Pipeline</span>
                        <p className="font-bold text-slate-800 text-[10px] mt-0.5">👥 {item.students} students</p>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-400 font-semibold block uppercase tracking-wider">Partners</span>
                        <p className="font-bold text-slate-800 text-[10px] mt-0.5">🏢 {item.companies} engaged</p>
                      </div>
                    </div>

                    <div className="border-t border-slate-50 pt-2">
                      <p className="text-[10px] font-medium leading-relaxed text-slate-500 italic">
                        "{item.aiStatement}"
                      </p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={() => onViewImpactReport && onViewImpactReport(item)}
                      className="w-full flex items-center justify-center rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-semibold text-blue-600 shadow-sm transition hover:border-blue-200 hover:bg-blue-50/20"
                    >
                      View Impact Report
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}

          <div className="flex justify-end pt-1">
            <button
              type="button"
              onClick={() => {
                setSelectedDate(null)
                document.getElementById('impact-history')?.scrollIntoView({ behavior: 'smooth' })
                onToast('Viewing all impact records')
              }}
              className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-0.5"
            >
              View all outcomes →
            </button>
          </div>
        </section>

        {/* RIGHT COLUMN: IMPACT CALENDAR (col-span-5) */}
        <section className="lg:col-span-5 rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm space-y-4 min-w-0">
          <header className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Impact Calendar</h2>
              <p className="text-[10px] font-medium text-slate-400 mt-0.5">Click a date to filter impact history.</p>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center rounded-lg border border-slate-200 p-0.5 bg-slate-50">
                <button
                  type="button"
                  onClick={() => onToast('Previous month')}
                  className="flex h-6 w-6 items-center justify-center rounded text-xs text-slate-500 hover:bg-white transition"
                >
                  &lt;
                </button>
                <span className="text-[10px] font-semibold px-2 text-slate-700">{calendarMonth}</span>
                <button
                  type="button"
                  onClick={() => onToast('Next month')}
                  className="flex h-6 w-6 items-center justify-center rounded text-xs text-slate-500 hover:bg-white transition"
                >
                  &gt;
                </button>
              </div>
              
              <button
                type="button"
                onClick={() => {
                  setCalendarMonth('May 2025')
                  setSelectedDate(null)
                  onToast('Returned to current month')
                }}
                className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-600 hover:bg-slate-50 transition"
              >
                Today
              </button>
            </div>
          </header>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 text-center text-[10px]">
            {/* Weekdays */}
            {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(wd => (
              <span key={wd} className="font-semibold text-slate-400 py-1">{wd}</span>
            ))}
            
            {/* Days mapping */}
            {calendarDays.map((cell, idx) => {
              const formattedCellDate = cell.isCurrentMonth ? `${cell.day.toString().padStart(2, '0')} May 2025`.replace(/^0/, '') : ''
              const isSelected = selectedDate && selectedDate === formattedCellDate
              const eventCount = formattedCellDate ? eventCountByDate[formattedCellDate] || 0 : 0
              
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => cell.isCurrentMonth && handleDateClick(cell)}
                  disabled={!cell.isCurrentMonth}
                  className={`relative flex flex-col justify-between items-center h-11 py-1 rounded-lg transition select-none ${
                    !cell.isCurrentMonth
                      ? 'text-slate-200 bg-transparent'
                      : isSelected
                      ? 'ring-2 ring-blue-600 bg-blue-50/30 font-medium text-blue-700'
                      : 'text-slate-650 hover:bg-slate-50/70 hover:text-slate-900'
                  }`}
                >
                  <span className="text-[10px] font-semibold">{cell.day}</span>

                  {/* Render Dots and Count indicators */}
                  <div className="flex items-center gap-0.5 justify-center min-h-[12px] w-full">
                    {cell.dots && cell.dots.map((dot, dIdx) => (
                      <span key={dIdx} className={`h-1 w-1 rounded-full ${dot}`} />
                    ))}
                    {eventCount > 1 && (
                      <span className="rounded bg-blue-50 px-1 text-[7.5px] font-medium text-blue-700">
                        {eventCount} events
                      </span>
                    )}
                  </div>
                </button>
              )
            })}
          </div>

          <div className="flex items-center gap-1.5 justify-start text-[9px] text-slate-400 font-medium pb-2 border-b border-slate-100">
            <span className="flex gap-0.5">
              <span className="h-1 w-1 bg-red-500 rounded-full" />
              <span className="h-1 w-1 bg-blue-500 rounded-full" />
              <span className="h-1 w-1 bg-emerald-500 rounded-full" />
            </span>
            <span>Multiple markers indicate multiple completed events. Click a date to filter impact history.</span>
          </div>

          {/* Monthly Summary Statistics Grid */}
          <div className="grid grid-cols-3 gap-2 pt-2">
            <div className="rounded-xl border border-slate-100 bg-slate-50/20 p-2.5 flex items-center gap-2.5">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 font-bold text-xs">📅</span>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-800 leading-none">12</p>
                <p className="text-[8px] text-slate-400 font-semibold mt-1 leading-none uppercase">Completed</p>
              </div>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50/20 p-2.5 flex items-center gap-2.5">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600 font-bold text-xs">⏰</span>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-800 leading-none">4</p>
                <p className="text-[8px] text-slate-400 font-semibold mt-1 leading-none uppercase">Follow-ups</p>
              </div>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50/20 p-2.5 flex items-center gap-2.5">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-600 font-bold text-xs">🏢</span>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-800 leading-none">28</p>
                <p className="text-[8px] text-slate-400 font-semibold mt-1 leading-none uppercase">Companies</p>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* ================= SECTION 3: AI STRATEGIC INSIGHT ================= */}
      <section className="rounded-2xl border border-violet-100 bg-violet-50/45 p-5 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex gap-3.5 items-start md:items-center">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-600 text-white shadow-sm text-sm font-semibold">
            ✨
          </span>
          <div className="space-y-0.5">
            <h3 className="text-xs font-semibold text-violet-800 uppercase tracking-wider leading-none">AI Strategic Insight</h3>
            <p className="text-[11px] font-semibold text-slate-800 leading-relaxed max-w-3xl">
              Events involving mentors and practical submissions generated <strong className="text-violet-700 font-bold">2.3× more demonstrated skill evidence</strong> than speaker-only events.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 shrink-0">
          {[
            { label: 'Repeat analytics competitions', query: 'Hackathon' },
            { label: 'Reconnect with Grab and Deloitte', query: 'Grab' },
            { label: 'Target lower-readiness cohorts', query: 'Bootcamp' }
          ].map(chip => (
            <button
              key={chip.label}
              type="button"
              onClick={() => {
                setSearchQuery(chip.query)
                onToast(`AI Strategy applied: searching "${chip.query}"`)
              }}
              className="rounded-full bg-white px-3.5 py-1.5 text-[10px] font-semibold text-slate-600 border border-slate-200 hover:border-violet-300 hover:text-violet-600 transition shadow-sm"
            >
              {chip.label}
            </button>
          ))}
        </div>
      </section>

      {/* ================= SECTION 4: EVENT IMPACT HISTORY ================= */}
      <section id="impact-history" className="rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm space-y-4">
        <div>
          <h2 className="text-base font-semibold text-slate-900">Event Impact History</h2>
          <p className="text-[11px] font-medium text-slate-400">Long-term record of completed events and their strategic impact.</p>
        </div>

        {/* Filters and Search toolbar */}
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between border-b border-slate-50 pb-3">
          <div className="flex items-center gap-2 w-full lg:w-96 shrink-0 relative">
            <span className="absolute left-3 text-slate-400 text-xs font-semibold">🔍</span>
            <input
              type="text"
              placeholder="Search events, partners, or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-4 py-2 text-xs outline-none placeholder:text-slate-400 focus:border-blue-300 transition"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Semester Filter */}
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-semibold text-slate-400">Semester:</span>
              <select
                value={semesterFilter}
                onChange={(e) => { setSemesterFilter(e.target.value); setCurrentPage(1); }}
                className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-[10px] font-semibold text-slate-600 outline-none cursor-pointer hover:bg-slate-50"
              >
                <option value="All">All</option>
                <option value="Semester 1">Semester 1</option>
                <option value="Semester 2">Semester 2</option>
              </select>
            </div>

            {/* Program Filter */}
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-semibold text-slate-400">Program:</span>
              <select
                value={programFilter}
                onChange={(e) => { setProgramFilter(e.target.value); setCurrentPage(1); }}
                className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-[10px] font-semibold text-slate-600 outline-none cursor-pointer hover:bg-slate-50"
              >
                <option value="All">All</option>
                <option value="Computing">Computing</option>
                <option value="Business">Business</option>
                <option value="Science">Science</option>
                <option value="Humanities">Humanities</option>
              </select>
            </div>

            {/* Event Type Filter */}
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-semibold text-slate-400">Event Type:</span>
              <select
                value={typeFilter}
                onChange={(e) => { setTypeFilter(e.target.value); setCurrentPage(1); }}
                className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-[10px] font-semibold text-slate-600 outline-none cursor-pointer hover:bg-slate-50"
              >
                <option value="All">All</option>
                <option value="Case Competition">Case Competition</option>
                <option value="Workshop">Workshop</option>
                <option value="Sprint">Sprint</option>
                <option value="Seminar">Seminar</option>
                <option value="Hackathon">Hackathon</option>
                <option value="Mentorship">Mentorship</option>
                <option value="Bootcamp">Bootcamp</option>
              </select>
            </div>

            <button
              type="button"
              onClick={() => onToast('Advanced filters toggled.')}
              className="rounded-lg border border-slate-250 bg-white px-3 py-1.5 text-[10px] font-semibold text-slate-600 hover:bg-slate-50 transition inline-flex items-center gap-1"
            >
              <span>⚙️</span> Filters
            </button>
          </div>
        </div>

        {/* Date Filter Removable Badge */}
        {selectedDate && (
          <div className="flex items-center gap-2 pt-1">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 border border-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
              Showing events from {selectedDate}
              <button
                type="button"
                onClick={handleClearDateFilter}
                className="hover:text-red-500 text-xs font-bold leading-none"
              >
                ×
              </button>
            </span>
          </div>
        )}

        {/* Compact Table */}
        <div className="overflow-x-auto min-w-0 rounded-xl border border-slate-100">
          <table className="w-full min-w-[980px] text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 text-slate-400 font-semibold uppercase tracking-wider text-[9px]">
                <th className="py-3 px-4">Event</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Skill Gaps Closed</th>
                <th className="py-3 px-4 text-center">Readiness Uplift</th>
                <th className="py-3 px-4 text-center">Companies Engaged</th>
                <th className="py-3 px-4 text-center">Students Impacted</th>
                <th className="py-3 px-4 text-center">Report Ready</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedHistory.map(row => (
                <tr key={row.id} className="hover:bg-slate-50/40 transition">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-6.5 w-6.5 shrink-0 items-center justify-center rounded bg-slate-50 text-[11px]">
                        {row.category === 'Case Competition' ? '🏆' : row.category === 'Hackathon' ? '💻' : row.category === 'Mentorship' ? '🤝' : '📄'}
                      </span>
                      <div className="min-w-0">
                        <p className="font-semibold text-slate-800 line-clamp-1 text-xs">{row.title}</p>
                        <p className="text-[9px] text-slate-450 font-semibold truncate mt-0.5">{row.organizer}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-500 whitespace-nowrap">{row.date}</td>
                  <td className="py-3.5 px-4">
                    <div className="flex flex-wrap gap-1">
                      {row.skills.map(skill => (
                        <span key={skill} className="rounded bg-slate-100/70 px-1.5 py-0.5 text-[9.5px] font-medium text-slate-600 border border-slate-200/20">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-center font-bold text-emerald-600 text-xs">+{row.uplift}%</td>
                  <td className="py-3.5 px-4 text-center font-semibold text-slate-700">{row.companies} companies</td>
                  <td className="py-3.5 px-4 text-center font-semibold text-slate-700">{row.students} students</td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-flex items-center gap-1 rounded bg-emerald-50 px-2 py-0.5 text-[9px] font-semibold text-emerald-700 border border-emerald-100/30">
                      ✓ Yes
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => onViewImpactReport && onViewImpactReport(row)}
                        className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-semibold text-slate-600 hover:border-blue-300 hover:text-blue-600 transition"
                      >
                        View Full Impact Report
                      </button>
                      <button
                        type="button"
                        onClick={() => onToast('Action menu opened.')}
                        className="p-1 rounded text-slate-400 hover:text-slate-750 transition text-xs font-semibold"
                      >
                        ⋮
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {paginatedHistory.length === 0 && (
                <tr>
                  <td colSpan="8" className="py-8 text-center text-xs text-slate-400 italic">
                    No completed events found matching the active filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between pt-2 text-[10px] font-semibold text-slate-450">
          <span>Showing {filteredHistory.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}-{Math.min(currentPage * itemsPerPage, filteredHistory.length)} of {filteredHistory.length} events</span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              className="flex h-5.5 w-5.5 items-center justify-center rounded-md border border-slate-200 bg-white text-[9px] font-bold text-slate-500 hover:bg-slate-50 transition disabled:opacity-50 disabled:hover:bg-white"
            >
              &lt;
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`flex h-5.5 w-5.5 items-center justify-center rounded-md border text-[9px] font-bold transition ${
                  currentPage === page
                    ? 'border-blue-600 bg-blue-600 text-white'
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
              className="flex h-5.5 w-5.5 items-center justify-center rounded-md border border-slate-200 bg-white text-[9px] font-bold text-slate-500 hover:bg-slate-50 transition disabled:opacity-50 disabled:hover:bg-white"
            >
              &gt;
            </button>
          </div>
        </div>
      </section>

    </div>
  )
}
