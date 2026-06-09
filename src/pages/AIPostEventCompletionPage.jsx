import React, { useState, useMemo, useRef, useCallback } from 'react'

// ── Drag-to-scroll hook ────────────────────────────────────────────────────
function useDragScroll() {
  const ref = useRef(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  const onMouseDown = useCallback((e) => {
    isDragging.current = true
    startX.current = e.pageX - ref.current.offsetLeft
    scrollLeft.current = ref.current.scrollLeft
    ref.current.style.cursor = 'grabbing'
    ref.current.style.userSelect = 'none'
  }, [])

  const onMouseLeave = useCallback(() => {
    isDragging.current = false
    if (ref.current) {
      ref.current.style.cursor = 'grab'
      ref.current.style.userSelect = ''
    }
  }, [])

  const onMouseUp = useCallback(() => {
    isDragging.current = false
    if (ref.current) {
      ref.current.style.cursor = 'grab'
      ref.current.style.userSelect = ''
    }
  }, [])

  const onMouseMove = useCallback((e) => {
    if (!isDragging.current) return
    e.preventDefault()
    const x = e.pageX - ref.current.offsetLeft
    const walk = (x - startX.current) * 1.2
    ref.current.scrollLeft = scrollLeft.current - walk
  }, [])

  return { ref, onMouseDown, onMouseLeave, onMouseUp, onMouseMove }
}

const getOutcomesCardStyle = (id) => {
  switch (id) {
    case 'fintech-case-23':
      return {
        iconBg: 'bg-violet-50 border border-violet-100/50 shadow-sm',
        icon: (
          <svg className="h-5 w-5 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2" />
          </svg>
        )
      }
    case 'data-storytelling-15':
      return {
        iconBg: 'bg-blue-50 border border-blue-100/50 shadow-sm',
        icon: (
          <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21h8M12 17V21M5 3h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
          </svg>
        )
      }
    case 'product-sprint-23':
    default:
      return {
        iconBg: 'bg-orange-50 border border-orange-100/50 shadow-sm',
        icon: (
          <svg className="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l5.104-.813m-4.291-4.283L3 12l4.283-3.291m12.441-2.984a9.123 9.123 0 00-3.266 3.266l-6.527 6.527 3.266 3.266 6.527-6.527a9.123 9.123 0 003.266-3.266z" />
          </svg>
        )
      }
  }
}

// ── OutcomesScrollRail ─────────────────────────────────────────────────────
// Horizontal scroll container with mouse-drag UX.
// Each card has a fixed width (280 px) so many cards tile naturally.
function OutcomesScrollRail({ items, onViewImpactReport }) {
  const { ref, onMouseDown, onMouseLeave, onMouseUp, onMouseMove } = useDragScroll()

  return (
    <div
      ref={ref}
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseLeave}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      className="flex gap-4 overflow-x-auto pb-2 select-none"
      style={{ cursor: 'grab', scrollbarWidth: 'thin', scrollbarColor: '#cbd5e1 transparent' }}
    >
      {items.map(item => {
        const style = getOutcomesCardStyle(item.id)
        return (
          <article
            key={item.id}
            className="flex-none w-[280px] rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition hover:border-blue-200 hover:shadow-md flex flex-col justify-between gap-3"
            style={{ pointerEvents: 'auto' }}
            onMouseDown={e => e.stopPropagation()} // let clicks through to buttons
          >
            <div className="space-y-3">
              {/* ── Card header: icon + title/organizer side-by-side + Completed badge ── */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2.5 min-w-0">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${style.iconBg}`}>
                    {style.icon}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs font-bold text-slate-900 leading-snug">{item.title}</h3>
                    <p className="text-[10px] text-slate-500 font-medium mt-0.5 leading-snug line-clamp-2">{item.organizer}</p>
                  </div>
                </div>
                {/* Completed badge: stacked "Completed / X days ago" */}
                <div className="shrink-0 text-center rounded-lg bg-emerald-50 border border-emerald-100 px-2 py-0.5 leading-tight">
                  <span className="block text-[8.5px] font-bold text-emerald-700 uppercase tracking-wide">Completed</span>
                  <span className="block text-[8px] font-semibold text-emerald-600 whitespace-nowrap">{item.daysAgo}</span>
                </div>
              </div>

              {/* ── Stats: 4-column grid, icon → number → label ── */}
              <div className="grid grid-cols-4 border-t border-slate-100 pt-3">
                {/* Readiness Uplift */}
                <div className="flex flex-col items-center gap-0.5 border-r border-slate-100 px-1 text-center">
                  <svg className="h-3.5 w-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span className="text-[11px] font-bold text-emerald-600 leading-none">{item.uplift}</span>
                  <span className="text-[7.5px] text-slate-500 font-semibold uppercase leading-tight mt-0.5">Readiness<br/>Uplift</span>
                </div>
                {/* Priority Gaps */}
                <div className="flex flex-col items-center gap-0.5 border-r border-slate-100 px-1 text-center">
                  <svg className="h-3.5 w-3.5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                  <span className="text-[11px] font-bold text-slate-900 leading-none">{item.gaps}</span>
                  <span className="text-[7.5px] text-slate-500 font-semibold uppercase leading-tight mt-0.5">Priority<br/>Gaps</span>
                </div>
                {/* Students in Pipeline */}
                <div className="flex flex-col items-center gap-0.5 border-r border-slate-100 px-1 text-center">
                  <svg className="h-3.5 w-3.5 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-[11px] font-bold text-slate-900 leading-none">{item.students}</span>
                  <span className="text-[7.5px] text-slate-500 font-semibold uppercase leading-tight mt-0.5">Students<br/>Pipeline</span>
                </div>
                {/* Companies Engaged */}
                <div className="flex flex-col items-center gap-0.5 px-1 text-center">
                  <svg className="h-3.5 w-3.5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span className="text-[11px] font-bold text-slate-900 leading-none">{item.companies}</span>
                  <span className="text-[7.5px] text-slate-500 font-semibold uppercase leading-tight mt-0.5">Companies<br/>Engaged</span>
                </div>
              </div>

              {/* ── AI insight statement ── */}
              <div className="flex items-start gap-2 pt-1 border-t border-slate-100">
                <svg className="h-3.5 w-3.5 text-blue-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                <p className="text-xs font-medium text-slate-700 leading-relaxed">{item.aiStatement}</p>
              </div>
            </div>

            {/* ── View Impact Report button ── */}
            <button
              type="button"
              onClick={() => onViewImpactReport && onViewImpactReport(item)}
              className="w-full flex items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-blue-600 shadow-sm transition hover:border-blue-300 hover:bg-blue-50/20 mt-1"
            >
              View Impact Report
            </button>
          </article>
        )
      })}
    </div>
  )
}

export default function AIPostEventCompletionPage({ onBack, onToast, onViewImpactReport }) {
  const [selectedDate, setSelectedDate] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [semesterFilter, setSemesterFilter] = useState('All')
  const [programFilter, setProgramFilter] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All')
  const [simulateExpired, setSimulateExpired] = useState(false)
  const [calendarMonth, setCalendarMonth] = useState('May 2025')
  const [currentPage, setCurrentPage] = useState(1)

  const normalizeDate = (date) => date.replace(/^0/, '')

  // ── DATA ──────────────────────────────────────────────────────────────────
  const COMPLETED_EVENTS = [
    { id: 'fintech-case-23',        title: 'AI in Finance Case Competition',   organizer: 'FinTech Society x Grab, Maybank, PwC',  date: '23 May 2025', skills: ['Financial Modeling', 'Presentation', 'Data Analytics'],      uplift: 14, companies: 14, students: 64,  reportReady: true, category: 'Case Competition', semester: 'Semester 1', program: 'Computing' },
    { id: 'product-sprint-23',      title: 'Campus Product Sprint',             organizer: 'Innovation Hub x Industry.io',           date: '23 May 2025', skills: ['Product Design', 'Rapid Prototyping', 'Collaboration'],        uplift: 11, companies: 13, students: 88,  reportReady: true, category: 'Sprint',           semester: 'Semester 1', program: 'Business'  },
    { id: 'data-storytelling-15',   title: 'Data Storytelling Workshop',        organizer: 'Analytics Club x Deloitte',             date: '15 May 2025', skills: ['Data Visualization', 'Communication'],                        uplift:  9, companies:  9, students: 80,  reportReady: true, category: 'Workshop',         semester: 'Semester 1', program: 'Computing' },
    { id: 'ai-ethics-15',           title: 'AI Ethics Seminar',                 organizer: 'Philosophy Club x Microsoft',           date: '15 May 2025', skills: ['AI Ethics', 'Critical Thinking'],                             uplift:  5, companies:  1, students: 110, reportReady: true, category: 'Seminar',          semester: 'Semester 1', program: 'Humanities'},
    { id: 'cloud-summit-9',         title: 'Cloud Technology Summit',           organizer: 'Cloud Society x AWS',                   date: '09 May 2025', skills: ['Cloud Computing', 'AWS Systems'],                             uplift: 15, companies:  8, students: 150, reportReady: true, category: 'Seminar',          semester: 'Semester 1', program: 'Computing' },
    { id: 'cybersecurity-9',        title: 'Cybersecurity Capture the Flag',    organizer: 'InfoSec Society x Cisco',               date: '09 May 2025', skills: ['Network Security', 'Penetration Testing'],                    uplift: 13, companies:  4, students: 95,  reportReady: true, category: 'Hackathon',        semester: 'Semester 1', program: 'Computing' },
    
    // New mock events for dates with colored dots
    { id: 'campus-hack-1',          title: 'Campus Orientation Hackathon',      organizer: 'Computing Society x AWS',                date: '01 May 2025', skills: ['Teamwork', 'Rapid Prototyping', 'Public Speaking'],          uplift: 12, companies:  5, students: 120, reportReady: true, category: 'Hackathon',        semester: 'Semester 1', program: 'Computing' },
    { id: 'design-sprint-2',        title: 'Design Thinking Sprint',            organizer: 'Business Club x McKinsey',               date: '02 May 2025', skills: ['User Research', 'Ideation', 'Strategic Planning'],            uplift: 10, companies:  6, students: 75,  reportReady: true, category: 'Sprint',           semester: 'Semester 1', program: 'Business'  },
    { id: 'tech-panel-7',           title: 'Tech Industry Panel',               organizer: 'CS Society x Google & Meta',            date: '07 May 2025', skills: ['Industry Insights', 'Networking', 'Career Strategy'],       uplift:  8, companies: 12, students: 200, reportReady: true, category: 'Seminar',          semester: 'Semester 1', program: 'Computing' },
    { id: 'finance-bootcamp-13',    title: 'Finance x AI Bootcamp',             organizer: 'FinTech Society x HSBC',                date: '13 May 2025', skills: ['Python', 'Machine Learning', 'Financial Tech'],               uplift: 14, companies:  4, students: 60,  reportReady: true, category: 'Bootcamp',         semester: 'Semester 1', program: 'Computing' },
    { id: 'ux-workshop-16',         title: 'UX Research Workshop',              organizer: 'Design Collective x Shopee',             date: '16 May 2025', skills: ['User Testing', 'Wireframing', 'UI Design'],                   uplift:  9, companies:  3, students: 85,  reportReady: true, category: 'Workshop',         semester: 'Semester 1', program: 'Business'  },
    { id: 'open-innovation-20',     title: 'Open Innovation Challenge',         organizer: 'Innovation Hub x SG Innovate',           date: '20 May 2025', skills: ['Business Model Canvas', 'Pitching', 'Problem Solving'],       uplift: 15, companies: 18, students: 110, reportReady: true, category: 'Case Competition', semester: 'Semester 1', program: 'Business'  },
    { id: 'agile-workshop-30',      title: 'Agile & Scrum Workshop',            organizer: 'Product Management Club',                date: '30 May 2025', skills: ['Agile Methodologies', 'Scrum', 'Project Management'],         uplift: 11, companies:  2, students: 90,  reportReady: true, category: 'Workshop',         semester: 'Semester 1', program: 'Business'  },

    { id: 'brand-strategy',         title: 'Brand Strategy Workshop',           organizer: 'Marketing Club x Ogilvy',               date: '18 Apr 2025', skills: ['Market Research', 'Brand Positioning'],                       uplift:  9, companies:  2, students: 64,  reportReady: true, category: 'Workshop',         semester: 'Semester 1', program: 'Business'  },
    { id: 'ml-hackathon',           title: 'Machine Learning Hackathon',        organizer: 'CS Society x Google',                   date: '19 Apr 2025', skills: ['Python', 'ML Models', 'Problem Solving'],                     uplift: 16, companies:  3, students: 120, reportReady: true, category: 'Hackathon',        semester: 'Semester 1', program: 'Computing' },
    { id: 'women-tech',             title: 'Women in Tech Mentorship Series',   organizer: 'WomenTech x Grab',                      date: '02 Apr 2025', skills: ['Career Planning', 'Communication'],                           uplift:  7, companies:  2, students: 75,  reportReady: true, category: 'Mentorship',       semester: 'Semester 1', program: 'Business'  },
    { id: 'sustainability-case',    title: 'Sustainability Case Challenge',      organizer: 'Sustainability Club x ESG',             date: '27 Mar 2025', skills: ['Sustainability Strategy', 'Systems Thinking'],               uplift: 10, companies:  3, students: 58,  reportReady: true, category: 'Case Competition', semester: 'Semester 2', program: 'Science'   },
    { id: 'data-analytics-bootcamp',title: 'Data Analytics Bootcamp',           organizer: 'Analytics Club x Deloitte',             date: '27 Mar 2025', skills: ['SQL', 'Data Visualization', 'Storytelling'],                  uplift: 12, companies:  2, students: 54,  reportReady: true, category: 'Bootcamp',         semester: 'Semester 2', program: 'Computing' },
  ]

  const calendarDays = [
    { day: 28, isCurrentMonth: false }, { day: 29, isCurrentMonth: false }, { day: 30, isCurrentMonth: false },
    { day: 1,  isCurrentMonth: true, dots: ['bg-red-500'] },
    { day: 2,  isCurrentMonth: true, dots: ['bg-blue-500'] },
    { day: 3,  isCurrentMonth: true }, { day: 4, isCurrentMonth: true }, { day: 5, isCurrentMonth: true }, { day: 6, isCurrentMonth: true },
    { day: 7,  isCurrentMonth: true, dots: ['bg-emerald-500'] },
    { day: 8,  isCurrentMonth: true },
    { day: 9,  isCurrentMonth: true, dots: ['bg-emerald-500', 'bg-blue-500'] },
    { day: 10, isCurrentMonth: true }, { day: 11, isCurrentMonth: true }, { day: 12, isCurrentMonth: true },
    { day: 13, isCurrentMonth: true, dots: ['bg-blue-500'] },
    { day: 14, isCurrentMonth: true },
    { day: 15, isCurrentMonth: true, dots: ['bg-blue-500', 'bg-emerald-500'] },
    { day: 16, isCurrentMonth: true, dots: ['bg-blue-500'] },
    { day: 17, isCurrentMonth: true }, { day: 18, isCurrentMonth: true }, { day: 19, isCurrentMonth: true },
    { day: 20, isCurrentMonth: true, dots: ['bg-blue-500'] },
    { day: 21, isCurrentMonth: true }, { day: 22, isCurrentMonth: true },
    { day: 23, isCurrentMonth: true, dots: ['bg-blue-500', 'bg-emerald-500'] },
    { day: 24, isCurrentMonth: true }, { day: 25, isCurrentMonth: true }, { day: 26, isCurrentMonth: true },
    { day: 27, isCurrentMonth: true }, { day: 28, isCurrentMonth: true }, { day: 29, isCurrentMonth: true },
    { day: 30, isCurrentMonth: true, dots: ['bg-blue-500'] },
    { day: 31, isCurrentMonth: true },
    { day: 1,  isCurrentMonth: false },
  ]

  const recentOutcomes = [
    { id: 'fintech-case-23',      title: 'AI in Finance Case Competition', organizer: 'FinTech Society x Grab, Maybank, PwC', daysAgo: '2 days ago', uplift: '+14%', gaps: '8', students: '64', companies: '14', aiStatement: 'Strong growth in financial modeling readiness and presentation skills.', icon: '📈', color: 'from-blue-500 to-indigo-600' },
    { id: 'data-storytelling-15', title: 'Data Storytelling Workshop',     organizer: 'Analytics Club x Deloitte',            daysAgo: '4 days ago', uplift: '+9%',  gaps: '6', students: '80', companies: '9',  aiStatement: 'Improved data visualization and insight communication.',               icon: '🖥️', color: 'from-violet-500 to-purple-600' },
    { id: 'product-sprint-23',    title: 'Campus Product Sprint',          organizer: 'Innovation Hub x Industry.io',          daysAgo: '5 days ago', uplift: '+11%', gaps: '7', students: '88', companies: '13', aiStatement: 'High collaboration and rapid prototyping demonstrated.',               icon: '🚀', color: 'from-orange-500 to-red-500' },
  ]

  // ── HANDLERS ──────────────────────────────────────────────────────────────
  const handleDateClick = (day) => {
    if (!day.isCurrentMonth) return
    const sanitizedDate = normalizeDate(`${day.day.toString().padStart(2, '0')} May 2025`)
    setSelectedDate(sanitizedDate)
    setCurrentPage(1)
    onToast(`Filtered history to ${sanitizedDate}`)
  }

  const handleClearDateFilter = () => { setSelectedDate(null); onToast('Cleared date filter') }

  // ── DERIVED DATA ──────────────────────────────────────────────────────────
  const filteredHistory = useMemo(() => {
    return COMPLETED_EVENTS.filter(event => {
      const q = searchQuery.toLowerCase().trim()
      return (
        (!q || event.title.toLowerCase().includes(q) || event.organizer.toLowerCase().includes(q) || event.skills.some(s => s.toLowerCase().includes(q))) &&
        (!selectedDate || normalizeDate(event.date) === selectedDate) &&
        (semesterFilter === 'All' || event.semester === semesterFilter) &&
        (programFilter === 'All' || event.program === programFilter) &&
        (typeFilter === 'All' || event.category === typeFilter)
      )
    })
  }, [searchQuery, selectedDate, semesterFilter, programFilter, typeFilter])

  const itemsPerPage = 5
  const paginatedHistory = useMemo(() => filteredHistory.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage), [filteredHistory, currentPage])
  const totalPages = Math.ceil(filteredHistory.length / itemsPerPage) || 1

  const eventCountByDate = useMemo(() => COMPLETED_EVENTS.reduce((acc, e) => {
    const d = normalizeDate(e.date); acc[d] = (acc[d] || 0) + 1; return acc
  }, {}), [])

  // ── RENDER ────────────────────────────────────────────────────────────────
  return (
    <div className="min-w-0 w-full space-y-6 pb-12">

      {/* ── TOP 2-COLUMN LAYOUT ───────────────────────────────────────────── */}
      <div className="grid gap-6 lg:grid-cols-12 items-start">

        {/* LEFT: LATEST EVENT OUTCOMES */}
        <section className="lg:col-span-7 space-y-4 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-slate-900">Latest Event Outcomes</h2>
                <span className="text-slate-400 text-sm cursor-pointer" title="Events completed within the last 5 working days">ⓘ</span>
              </div>
              <p className="mt-1 text-xs font-medium text-slate-500">Events completed within the last 5 working days</p>
            </div>
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-500 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 hover:bg-slate-100 transition shadow-sm shrink-0">
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
            <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 p-12 text-center flex flex-col items-center gap-3">
              <span className="text-4xl">📁</span>
              <h3 className="text-sm font-semibold text-slate-700">No outcomes in the last 5 working days</h3>
              <p className="text-sm text-slate-500 max-w-sm">All completed outcomes have elapsed the 5-working-day threshold and are archived in the Event Impact History registry.</p>
            </div>
          ) : (
            <OutcomesScrollRail items={recentOutcomes} onViewImpactReport={onViewImpactReport} />
          )}

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => { setSelectedDate(null); document.getElementById('impact-history')?.scrollIntoView({ behavior: 'smooth' }); onToast('Viewing all impact records') }}
              className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline"
            >
              View all outcomes →
            </button>
          </div>
        </section>

        {/* RIGHT: IMPACT CALENDAR */}
        <section className="lg:col-span-5 rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm space-y-4 min-w-0">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-base font-semibold text-slate-900">Impact Calendar</h2>
              <p className="text-xs font-medium text-slate-400 mt-0.5">Click a date to filter impact history.</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50 p-0.5">
                <button type="button" onClick={() => onToast('Previous month')} className="flex h-7 w-7 items-center justify-center rounded text-sm text-slate-500 hover:bg-white transition">&lt;</button>
                <span className="text-xs font-semibold px-2 text-slate-700">{calendarMonth}</span>
                <button type="button" onClick={() => onToast('Next month')} className="flex h-7 w-7 items-center justify-center rounded text-sm text-slate-500 hover:bg-white transition">&gt;</button>
              </div>
              <button
                type="button"
                onClick={() => { setCalendarMonth('May 2025'); setSelectedDate(null); onToast('Returned to current month') }}
                className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition"
              >
                Today
              </button>
            </div>
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1 text-center text-xs">
            {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(wd => (
              <span key={wd} className="font-semibold text-slate-400 py-1">{wd}</span>
            ))}
            {calendarDays.map((cell, idx) => {
              const cellDate = cell.isCurrentMonth ? normalizeDate(`${cell.day.toString().padStart(2, '0')} May 2025`) : ''
              const isSelected = selectedDate && selectedDate === cellDate
              const count = cellDate ? eventCountByDate[cellDate] || 0 : 0
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => cell.isCurrentMonth && handleDateClick(cell)}
                  disabled={!cell.isCurrentMonth}
                  className={`relative flex flex-col justify-between items-center h-11 py-1 rounded-lg transition select-none ${
                    !cell.isCurrentMonth ? 'text-slate-200'
                    : isSelected ? 'ring-2 ring-blue-600 bg-blue-50 font-semibold text-blue-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <span className="text-xs font-semibold">{cell.day}</span>
                  <div className="flex items-center gap-0.5 justify-center min-h-[14px] w-full">
                    {cell.dots && cell.dots.map((dot, dIdx) => (
                      <span key={dIdx} className={`h-1.5 w-1.5 rounded-full ${dot}`} />
                    ))}
                    {count > 0 && (
                      <span className="inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-blue-100 px-1 text-xs font-semibold text-blue-700" title={`${count} event${count > 1 ? 's' : ''}`}>
                        {count}
                      </span>
                    )}
                  </div>
                </button>
              )
            })}
          </div>

          <p className="text-xs text-slate-400 font-medium pb-2 border-b border-slate-100">
            Multiple markers = multiple events on that date. Click to filter.
          </p>

          {/* Monthly summary */}
          <div className="grid grid-cols-3 gap-3 pt-1">
            {[
              { icon: '📅', value: '12', label: 'Completed', bg: 'bg-blue-50',   color: 'text-blue-600' },
              { icon: '⏰', value: '4',  label: 'Follow-ups', bg: 'bg-amber-50',  color: 'text-amber-600' },
              { icon: '🏢', value: '28', label: 'Companies',  bg: 'bg-violet-50', color: 'text-violet-600' },
            ].map(stat => (
              <div key={stat.label} className="rounded-xl border border-slate-100 bg-slate-50/30 p-3 flex items-center gap-3">
                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${stat.bg} ${stat.color} text-base`}>{stat.icon}</span>
                <div>
                  <p className="text-sm font-bold text-slate-800">{stat.value}</p>
                  <p className="text-xs text-slate-400 font-semibold uppercase mt-0.5">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ── AI STRATEGIC INSIGHT ──────────────────────────────────────────── */}
      <section className="rounded-2xl border border-violet-100 bg-violet-50/40 p-5 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex gap-4 items-start md:items-center">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-600 text-white shadow-sm text-lg">✨</span>
          <div>
            <h3 className="text-xs font-semibold text-violet-700 uppercase mb-1">AI Strategic Insight</h3>
            <p className="text-sm font-semibold text-slate-800 leading-relaxed max-w-3xl">
              Events involving mentors and practical submissions generated{' '}
              <strong className="text-violet-700">2.3× more demonstrated skill evidence</strong>{' '}
              than speaker-only events.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 shrink-0">
          {[
            { label: 'Repeat analytics competitions', query: 'Hackathon' },
            { label: 'Reconnect with Grab and Deloitte', query: 'Grab' },
            { label: 'Target lower-readiness cohorts', query: 'Bootcamp' },
          ].map(chip => (
            <button
              key={chip.label}
              type="button"
              onClick={() => { setSearchQuery(chip.query); onToast(`AI Strategy: searching "${chip.query}"`) }}
              className="rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-slate-600 border border-slate-200 hover:border-violet-300 hover:text-violet-600 transition shadow-sm"
            >
              {chip.label}
            </button>
          ))}
        </div>
      </section>

      {/* ── EVENT IMPACT HISTORY ──────────────────────────────────────────── */}
      <section id="impact-history" className="rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm space-y-5">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Event Impact History</h2>
          <p className="text-sm font-medium text-slate-400 mt-1">Long-term record of completed events and their strategic impact.</p>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between border-b border-slate-100 pb-4">
          <div className="relative w-full lg:w-80 shrink-0">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
            <input
              type="text"
              placeholder="Search events, partners, or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-4 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-blue-300 focus:ring-4 focus:ring-blue-50 transition"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {[
              { label: 'Semester', value: semesterFilter, setter: setSemesterFilter, options: ['All', 'Semester 1', 'Semester 2'] },
              { label: 'Program',  value: programFilter,  setter: setProgramFilter,  options: ['All', 'Computing', 'Business', 'Science', 'Humanities'] },
              { label: 'Type',     value: typeFilter,      setter: setTypeFilter,     options: ['All', 'Case Competition', 'Workshop', 'Sprint', 'Seminar', 'Hackathon', 'Mentorship', 'Bootcamp'] },
            ].map(f => (
              <div key={f.label} className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-slate-500">{f.label}:</span>
                <select
                  value={f.value}
                  onChange={(e) => { f.setter(e.target.value); setCurrentPage(1) }}
                  className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-600 outline-none cursor-pointer hover:bg-slate-50 transition"
                >
                  {f.options.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            ))}
            <button
              type="button"
              onClick={() => onToast('Advanced filters toggled.')}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition inline-flex items-center gap-1.5"
            >
              <span>⚙️</span> Filters
            </button>
          </div>
        </div>

        {selectedDate && (
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-lg bg-blue-50 border border-blue-100 px-3 py-1.5 text-sm font-semibold text-blue-700">
              Showing events from {selectedDate}
              <button type="button" onClick={handleClearDateFilter} className="hover:text-red-500 font-bold">×</button>
            </span>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-100">
          <table className="w-full min-w-[900px] text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60 text-xs font-semibold uppercase text-slate-400">
                <th className="py-3 px-4">Event</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Skill Gaps Closed</th>
                <th className="py-3 px-4 text-center">Readiness Uplift</th>
                <th className="py-3 px-4 text-center">Companies</th>
                <th className="py-3 px-4 text-center">Students</th>
                <th className="py-3 px-4 text-center">Report</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedHistory.map(row => (
                <tr key={row.id} className="hover:bg-slate-50/40 transition">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-base">
                        {row.category === 'Case Competition' ? '🏆' : row.category === 'Hackathon' ? '💻' : row.category === 'Mentorship' ? '🤝' : '📄'}
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-800 truncate">{row.title}</p>
                        <p className="text-xs text-slate-400 font-medium truncate mt-0.5">{row.organizer}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-sm font-medium text-slate-500 whitespace-nowrap">{row.date}</td>
                  <td className="py-3.5 px-4">
                    <div className="flex flex-wrap gap-1">
                      {row.skills.map(skill => (
                        <span key={skill} className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">{skill}</span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-center text-sm font-bold text-emerald-600">+{row.uplift}%</td>
                  <td className="py-3.5 px-4 text-center text-sm font-semibold text-slate-700">{row.companies}</td>
                  <td className="py-3.5 px-4 text-center text-sm font-semibold text-slate-700">{row.students}</td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">✓ Ready</span>
                  </td>
                  <td className="py-3.5 px-4 text-center whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => onViewImpactReport && onViewImpactReport(row)}
                        className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 hover:border-blue-300 hover:text-blue-600 transition"
                      >
                        View Report
                      </button>
                      <button type="button" onClick={() => onToast('Action menu opened.')} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition text-sm font-semibold">⋮</button>
                    </div>
                  </td>
                </tr>
              ))}
              {paginatedHistory.length === 0 && (
                <tr>
                  <td colSpan="8" className="py-10 text-center text-sm text-slate-400">No completed events found matching the active filters.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between pt-1 text-sm font-medium text-slate-500">
          <span>Showing {filteredHistory.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}–{Math.min(currentPage * itemsPerPage, filteredHistory.length)} of {filteredHistory.length} events</span>
          <div className="flex items-center gap-1.5">
            <button type="button" disabled={currentPage === 1} onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-sm font-semibold text-slate-500 hover:bg-slate-50 transition disabled:opacity-40">&lt;</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button key={page} type="button" onClick={() => setCurrentPage(page)} className={`flex h-8 w-8 items-center justify-center rounded-lg border text-sm font-semibold transition ${currentPage === page ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50'}`}>{page}</button>
            ))}
            <button type="button" disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-sm font-semibold text-slate-500 hover:bg-slate-50 transition disabled:opacity-40">&gt;</button>
          </div>
        </div>
      </section>
    </div>
  )
}
