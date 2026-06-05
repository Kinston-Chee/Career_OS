import React, { useState, useMemo } from 'react'

export default function AIPostEventCompletionPage({ onBack, onToast }) {
  // --- WORKFLOW STEPS ---
  const [activeStep, setActiveStep] = useState(1)
  const steps = [
    { stepNum: 1, title: 'Validate Participation' },
    { stepNum: 2, title: 'Capture Learnings' },
    { stepNum: 3, title: 'Review & Verify' },
    { stepNum: 4, title: 'Update Student Profiles' },
    { stepNum: 5, title: 'Completion Summary' }
  ]

  // --- MOCK STUDENTS DATA ---
  const initialStudents = [
    {
      id: 'jason-raj',
      name: 'Jason Raj',
      team: 'Team Alpha',
      initials: 'JR',
      avatarBg: 'bg-indigo-100 text-indigo-700',
      role: 'Team Leader',
      verificationMethod: 'QR Check-in',
      verificationDetails: '15 Sep 2026, 09:15 AM',
      status: 'Verified',
      activities: [
        'Led team strategy and task delegation',
        'Presented solution in final round',
        'Mentored junior team members',
        'Submitted final case report'
      ],
      skills: ['Leadership', 'Strategic Thinking', 'Problem Solving', 'Teamwork', 'Communication'],
      evidence: ['Final Presentation.pdf', 'Team Report.pdf', 'Judge Feedback.pdf']
    },
    {
      id: 'nurul-afiqah',
      name: 'Nurul Afiqah',
      team: 'Team Alpha',
      initials: 'NL',
      avatarBg: 'bg-emerald-100 text-emerald-700',
      role: 'Presenter',
      verificationMethod: 'QR Check-in',
      verificationDetails: '15 Sep 2026, 09:15 AM',
      status: 'Verified',
      activities: [
        'Delivered final pitch deck presentation',
        'Fielded Q&A questions from industry judges',
        'Coordinated presentation design flow'
      ],
      skills: ['Communication', 'Presentation', 'Strategic Thinking', 'Teamwork'],
      evidence: ['Final Presentation.pdf', 'Pitch Video.mp4']
    },
    {
      id: 'wei-chen',
      name: 'Wei Chen',
      team: 'Team Beta',
      initials: 'WC',
      avatarBg: 'bg-blue-100 text-blue-700',
      role: 'Data Analyst',
      verificationMethod: 'Manual Upload',
      verificationDetails: 'Certificate.pdf',
      status: 'Pending',
      activities: [
        'Conducted data cleaning and modeling',
        'Created Power BI dashboards for presentation',
        'Analyzed financial predictive features'
      ],
      skills: ['Data Analysis', 'Problem Solving', 'Technical Skills', 'Power BI'],
      evidence: ['Certificate.pdf', 'Data Model Notebook.ipynb']
    },
    {
      id: 'sarah-tan',
      name: 'Sarah Tan',
      team: 'Team Gamma',
      initials: 'ST',
      avatarBg: 'bg-violet-100 text-violet-700',
      role: 'Research Lead',
      verificationMethod: 'QR Check-in',
      verificationDetails: '15 Sep 2026, 09:15 AM',
      status: 'Verified',
      activities: [
        'Led user market research interviews',
        'Compiled competitive landscaping analysis',
        'Authored executive summary report'
      ],
      skills: ['Research', 'Communication', 'Teamwork', 'Problem Solving'],
      evidence: ['Research Summary.docx', 'Team Report.pdf']
    },
    {
      id: 'arjun-kumar',
      name: 'Arjun Kumar',
      team: 'Team Gamma',
      initials: 'AK',
      avatarBg: 'bg-rose-100 text-rose-700',
      role: 'Developer',
      verificationMethod: 'QR Check-in',
      verificationDetails: '15 Sep 2026, 09:15 AM',
      status: 'Verified',
      activities: [
        'Developed full stack prototype',
        'Integrated API models into UI',
        'Deployed application on cloud platform'
      ],
      skills: ['Software Engineering', 'Technical Skills', 'Problem Solving', 'Cloud Deployment'],
      evidence: ['GitHub Repo Link', 'System Design.pdf']
    }
  ]

  const [students, setStudents] = useState(initialStudents)
  const [selectedStudents, setSelectedStudents] = useState({
    'jason-raj': true,
    'nurul-afiqah': true,
    'wei-chen': false,
    'sarah-tan': false,
    'arjun-kumar': false
  })

  // --- ACTIVE REVIEW TARGET ---
  const [focusedStudentId, setFocusedStudentId] = useState('jason-raj')
  const focusedStudent = useMemo(() => {
    return students.find(s => s.id === focusedStudentId) || students[0]
  }, [students, focusedStudentId])

  // --- FILTERS & SEARCH ---
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  // Filter students based on search and status tabs
  const filteredStudents = useMemo(() => {
    return students.filter(s => {
      const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            s.team.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            s.role.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === 'All' ? true : s.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [students, searchQuery, statusFilter])

  // --- EDITABLE SKILLS STATE ---
  const [skillsMap, setSkillsMap] = useState(
    initialStudents.reduce((acc, curr) => {
      acc[curr.id] = curr.skills
      return acc;
    }, {})
  )
  const [newSkillInput, setNewSkillInput] = useState('')

  // --- REVIEW STATS (E.G. APPROVAL SELECTS) ---
  const [reviewStates, setReviewStates] = useState(
    initialStudents.reduce((acc, curr) => {
      acc[curr.id] = 'Approve All'
      return acc;
    }, {})
  )

  // --- FOLDERS DATA ---
  const initialFolders = [
    { name: 'Certificates', count: 102, icon: '📜' },
    { name: 'Presentations', count: 48, icon: '📊' },
    { name: 'Reports', count: 36, icon: '📁' },
    { name: 'Photos', count: 120, icon: '🖼️' },
    { name: 'Videos', count: 18, icon: '🎥' }
  ]
  const [folders, setFolders] = useState(initialFolders)

  // Handlers
  const handleSelectAll = (e) => {
    const checked = e.target.checked
    const updated = {}
    filteredStudents.forEach(s => {
      updated[s.id] = checked
    })
    setSelectedStudents(prev => ({ ...prev, ...updated }))
  }

  const handleSelectRow = (id) => {
    setSelectedStudents(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const handleUpdateStatus = (id, newStatus) => {
    setStudents(prev => prev.map(s => {
      if (s.id === id) {
        return { ...s, status: newStatus }
      }
      return s
    }))
    onToast(`Status for ${students.find(s => s.id === id).name} updated to ${newStatus}`)
  }

  const handleAddSkill = (e) => {
    e.preventDefault()
    const text = newSkillInput.trim()
    if (text) {
      const activeSkills = skillsMap[focusedStudentId] || []
      if (!activeSkills.includes(text)) {
        setSkillsMap(prev => ({
          ...prev,
          [focusedStudentId]: [...activeSkills, text]
        }))
        setNewSkillInput('')
        onToast(`Added skill "${text}" to ${focusedStudent.name}`)
      }
    }
  }

  const handleRemoveSkill = (skillToRemove) => {
    const activeSkills = skillsMap[focusedStudentId] || []
    setSkillsMap(prev => ({
      ...prev,
      [focusedStudentId]: activeSkills.filter(s => s !== skillToRemove)
    }))
  }

  const handleReviewActionChange = (action) => {
    setReviewStates(prev => ({ ...prev, [focusedStudentId]: action }))
  }

  const handleApproveDetails = () => {
    const action = reviewStates[focusedStudentId]
    if (action === 'Approve All') {
      handleUpdateStatus(focusedStudentId, 'Verified')
    } else if (action === 'Reject All') {
      handleUpdateStatus(focusedStudentId, 'Review Needed')
    } else {
      onToast(`Edited skills saved for ${focusedStudent.name}`)
    }
  }

  const handleExportReport = () => {
    onToast('Preparing impact report export for AI in Finance Case Competition...')
    // Mock file download trigger
    setTimeout(() => {
      onToast('Download started: sunway-fintech-ai-finance-impact-report.pdf')
    }, 1000)
  }

  return (
    <div className="mx-auto w-full max-w-[1400px] space-y-6 px-6 pb-12">
      
      {/* ================= TOP HEADER ================= */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-4">
        <div className="space-y-1.5">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex w-fit items-center gap-1 text-xs font-semibold text-slate-500 hover:text-blue-600 transition"
          >
            &lt; Back to Marketplace
          </button>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Post-Event Completion</h1>
            <span className="rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-semibold text-blue-700 border border-blue-100/50">Beta</span>
          </div>
          <p className="text-xs font-medium text-slate-450">Validate participation, capture learnings, and turn experiences into career evidence.</p>
        </div>
        <div>
          <button
            type="button"
            onClick={handleExportReport}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-650 hover:bg-slate-50 hover:text-slate-800 transition inline-flex items-center gap-1.5"
          >
            📥 Export Impact Report
          </button>
        </div>
      </header>

      {/* ================= MULTI-STEP PROGRESS BAR ================= */}
      <section className="rounded-2xl border border-slate-100 bg-white p-3 shadow-[0_4px_20px_rgba(0,0,0,0.01)] animate-fade-in">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-around px-4">
          {steps.map(s => {
            const isActive = activeStep === s.stepNum
            return (
              <button
                key={s.stepNum}
                type="button"
                onClick={() => {
                  setActiveStep(s.stepNum)
                  onToast(`Switched workspace views to step: ${s.title}`)
                }}
                className="flex items-center gap-2.5 py-2 text-left group"
              >
                <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm ring-4 ring-blue-50'
                    : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                }`}>
                  {s.stepNum}
                </span>
                <span className={`text-xs font-medium transition-colors ${
                  isActive ? 'text-slate-900 font-semibold' : 'text-slate-450 group-hover:text-slate-600'
                }`}>
                  {s.title}
                </span>
              </button>
            )
          })}
        </div>
      </section>

      {/* ================= EVENT HERO SUMMARY CARD ================= */}
      <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.015)]">
        <div className="grid gap-6 lg:grid-cols-12 items-center">
          
          {/* Left Thumbnail Info */}
          <div className="flex gap-4 lg:col-span-5 min-w-0">
            <div className="h-16 w-20 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-2 text-white flex flex-col justify-between shadow-sm">
              <span className="text-lg">🏆</span>
              <span className="text-[9px] font-bold tracking-wider uppercase">Fintech</span>
            </div>
            <div className="min-w-0 space-y-1">
              <h2 className="text-base font-semibold text-slate-900 truncate">AI in Finance Case Competition</h2>
              <div className="flex flex-wrap items-center gap-2 text-[10px] text-slate-450 font-medium">
                <span className="rounded bg-slate-550/10 px-1.5 py-0.5 text-slate-600 font-semibold">Case Competition</span>
                <span>•</span>
                <span>15 Jul - 28 Sep 2026</span>
                <span>•</span>
                <span className="truncate">Organized by FinTech Society</span>
              </div>
            </div>
          </div>

          {/* Center Stats Grid */}
          <div className="grid grid-cols-4 gap-2 lg:col-span-5 border-slate-100 lg:border-x lg:px-6">
            <div className="text-center">
              <p className="text-base font-bold text-slate-800">120+</p>
              <p className="text-[9px] text-slate-400 font-medium mt-0.5">Participants</p>
            </div>
            <div className="text-center">
              <p className="text-base font-bold text-slate-800">20+</p>
              <p className="text-[9px] text-slate-400 font-medium mt-0.5">Teams</p>
            </div>
            <div className="text-center">
              <p className="text-base font-bold text-slate-800">48+</p>
              <p className="text-[9px] text-slate-400 font-medium mt-0.5">Skills Identified</p>
            </div>
            <div className="text-center">
              <p className="text-base font-bold text-slate-800">5</p>
              <p className="text-[9px] text-slate-400 font-medium mt-0.5">Partners</p>
            </div>
          </div>

          {/* Right Status */}
          <div className="lg:col-span-2 text-right">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-100/50 px-3 py-1 text-xs font-semibold text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Completion Active
            </span>
            <p className="text-[9px] text-slate-400 font-medium mt-1">Verified: 82 / 120</p>
          </div>
        </div>
      </section>

      {/* ================= 3-COLUMN WORKSPACE ================= */}
      <div className="grid gap-6 lg:grid-cols-12 items-start">
        
        {/* LEFT + CENTER (8 columns): Main verification sections */}
        <main className="space-y-6 lg:col-span-8 min-w-0">
          
          {/* SECTION A — VALIDATE PARTICIPATION */}
          <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.015)] space-y-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-50 pb-3">
              <div className="space-y-0.5">
                <h3 className="text-sm font-semibold text-slate-850">A. Validate Participation</h3>
                <p className="text-[10px] font-medium text-slate-450">Confirm attendance and roles for students who took part in the event.</p>
              </div>

              {/* Toolbar Actions */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => onToast('Bulk Import: XLS list template parsed successfully.')}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-semibold text-slate-600 hover:bg-slate-50 transition"
                >
                  Bulk Import
                </button>
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="rounded-lg border border-slate-200 bg-white pl-2 pr-6 py-1.5 text-[10px] font-semibold text-slate-650 outline-none cursor-pointer"
                  >
                    <option value="All">Filter: All Statuses</option>
                    <option value="Verified">Verified</option>
                    <option value="Pending">Pending</option>
                    <option value="Review Needed">Review Needed</option>
                  </select>
                </div>
                <input
                  type="text"
                  placeholder="Search student or team..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[10px] outline-none w-44 placeholder:text-slate-400 focus:border-blue-300 transition"
                />
              </div>
            </div>

            {/* Table layout */}
            <div className="overflow-x-auto min-w-0">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider text-[9px]">
                    <th className="py-2.5 px-2 w-8">
                      <input
                        type="checkbox"
                        onChange={handleSelectAll}
                        checked={filteredStudents.length > 0 && filteredStudents.every(s => selectedStudents[s.id])}
                        className="rounded cursor-pointer"
                      />
                    </th>
                    <th className="py-2.5 px-3">Student / Team</th>
                    <th className="py-2.5 px-3">Role in Event</th>
                    <th className="py-2.5 px-3">Verification Method</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredStudents.map(student => {
                    const isRowSelected = !!selectedStudents[student.id]
                    const isFocused = student.id === focusedStudentId
                    return (
                      <tr
                        key={student.id}
                        onClick={() => setFocusedStudentId(student.id)}
                        className={`hover:bg-slate-50/50 cursor-pointer transition ${
                          isFocused ? 'bg-blue-50/20' : ''
                        }`}
                      >
                        <td className="py-3 px-2" onClick={(e) => e.stopPropagation()}>
                          <input
                            type="checkbox"
                            checked={isRowSelected}
                            onChange={() => handleSelectRow(student.id)}
                            className="rounded cursor-pointer text-blue-600 focus:ring-blue-100"
                          />
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2.5">
                            <span className={`flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold shrink-0 ${student.avatarBg}`}>
                              {student.initials}
                            </span>
                            <div className="min-w-0">
                              <p className="font-semibold text-slate-800 line-clamp-1 text-xs">{student.name}</p>
                              <p className="text-[9px] text-slate-400 font-semibold">{student.team}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <span className="text-[10px] font-semibold text-slate-650">{student.role}</span>
                        </td>
                        <td className="py-3 px-3">
                          <div className="space-y-0.5">
                            <span className="text-[10px] text-slate-600 font-medium inline-flex items-center gap-1">
                              {student.verificationMethod === 'QR Check-in' ? '📱' : '📄'} {student.verificationMethod}
                            </span>
                            <p className="text-[8px] text-slate-400 font-semibold leading-none">{student.verificationDetails}</p>
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[9px] font-semibold ${
                            student.status === 'Verified'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-100/50'
                              : student.status === 'Pending'
                              ? 'bg-amber-50 text-amber-700 border border-amber-100/50'
                              : 'bg-rose-50 text-rose-700 border border-rose-100/50'
                          }`}>
                            {student.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-center" onClick={(e) => e.stopPropagation()}>
                          <button
                            type="button"
                            onClick={() => {
                              setFocusedStudentId(student.id)
                              // Scroll into Section B
                              document.getElementById('ai-extraction')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                            }}
                            className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-600 hover:border-slate-350 hover:bg-slate-50 transition"
                          >
                            {student.status === 'Verified' ? 'View' : 'Review'}
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                  {filteredStudents.length === 0 && (
                    <tr>
                      <td colSpan="6" className="py-6 text-center text-xs text-slate-400 italic">
                        No students found matching filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination / Footer */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between pt-2 border-t border-slate-50 text-[10px] font-semibold text-slate-450">
              <span>Showing 1-{filteredStudents.length} of 124 participants</span>
              <div className="flex items-center gap-1">
                {['<', '1', '2', '3', '...', '25', '>'].map((pg, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onToast(`Navigate to page ${pg}`)}
                    className={`flex h-5 w-5 items-center justify-center rounded-md border text-[9px] font-bold ${
                      pg === '1' ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    {pg}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION B — AI SKILL EXTRACTION */}
          <section
            id="ai-extraction"
            className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.015)] space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-50 pb-3">
              <div className="space-y-0.5">
                <h3 className="text-sm font-semibold text-slate-850">B. AI Skill Extraction (Preview)</h3>
                <p className="text-[10px] font-medium text-slate-450">Review AI-suggested skills for each participant based on their role and event activities.</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="rounded bg-emerald-50 px-2 py-0.5 text-[9px] font-semibold text-emerald-700 border border-emerald-100/50">
                  AI Confidence: High
                </span>
                <button
                  type="button"
                  onClick={() => onToast('Customize Skills: Standard taxonomy settings loaded.')}
                  className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-600 hover:bg-slate-50 transition inline-flex items-center gap-1"
                >
                  ⚙️ Customize Skills
                </button>
              </div>
            </div>

            {/* AI Review Card */}
            <div className="grid gap-6 lg:grid-cols-12 items-start bg-slate-50/15 rounded-xl border border-slate-100/50 p-5">
              
              {/* Left block: student details & detected activities */}
              <div className="lg:col-span-4 space-y-4 min-w-0">
                <div className="flex items-center gap-2.5">
                  <span className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold shrink-0 ${focusedStudent.avatarBg}`}>
                    {focusedStudent.initials}
                  </span>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-slate-850 truncate text-xs">{focusedStudent.name}</h4>
                    <p className="text-[9px] text-slate-400 font-semibold leading-none">{focusedStudent.team} • {focusedStudent.role}</p>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100/60">
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Activities Detected:</span>
                  <ul className="space-y-2 text-[10px] text-slate-600 font-medium">
                    {focusedStudent.activities.map((act, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-emerald-500 font-bold">✓</span>
                        <span className="leading-relaxed">{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Center block: Suggested skills & evidence */}
              <div className="lg:col-span-5 space-y-4 border-slate-100/60 lg:border-x lg:px-5">
                <div className="space-y-2">
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">AI Suggested Skills:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {(skillsMap[focusedStudentId] || []).map(skill => (
                      <span
                        key={skill}
                        className="rounded bg-violet-50 px-2 py-0.5 text-[9px] font-semibold text-violet-650 border border-violet-100/40 inline-flex items-center gap-1 group"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(skill)}
                          className="hover:text-red-500 text-[10px] font-bold"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>

                  {/* Add skill input */}
                  <form onSubmit={handleAddSkill} className="flex gap-2 pt-1.5">
                    <input
                      type="text"
                      placeholder="Add custom skill..."
                      value={newSkillInput}
                      onChange={(e) => setNewSkillInput(e.target.value)}
                      className="rounded-lg border border-slate-200 px-2 py-1 text-[9px] outline-none flex-1"
                    />
                    <button
                      type="submit"
                      className="rounded-lg bg-blue-600 px-3 py-1 text-[9px] font-semibold text-white hover:bg-blue-700 transition"
                    >
                      Add
                    </button>
                  </form>
                </div>

                <div className="space-y-2 border-t border-slate-100/60 pt-3">
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Evidence Sources:</span>
                  <div className="space-y-1.5">
                    {focusedStudent.evidence.map(file => (
                      <button
                        key={file}
                        type="button"
                        onClick={() => onToast(`Opening document: ${file}`)}
                        className="w-full text-left rounded-lg bg-white border border-slate-200 hover:border-slate-350 p-2 text-[9px] text-slate-600 font-semibold transition truncate flex items-center gap-2"
                      >
                        <span>📄</span>
                        <span className="truncate">{file}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right block: Review actions */}
              <div className="lg:col-span-3 space-y-4">
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Your Review:</span>
                
                <div className="space-y-2">
                  {['Approve All', 'Edit Skills', 'Reject All'].map(act => (
                    <label key={act} className="flex items-center gap-2 text-[10px] font-medium text-slate-650 cursor-pointer">
                      <input
                        type="radio"
                        name="reviewAction"
                        checked={reviewStates[focusedStudentId] === act}
                        onChange={() => handleReviewActionChange(act)}
                        className="text-blue-600 focus:ring-blue-100"
                      />
                      <span>{act}</span>
                    </label>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleApproveDetails}
                  className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-2 px-3 text-[10px] shadow-sm hover:opacity-95 transition"
                >
                  Review Details
                </button>
              </div>

            </div>
          </section>

          {/* SECTION C — EVIDENCE & SUBMISSIONS */}
          <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.015)] space-y-4">
            <div className="flex items-center justify-between border-b border-slate-50 pb-3">
              <div className="space-y-0.5">
                <h3 className="text-sm font-semibold text-slate-850">C. Evidence & Submissions</h3>
                <p className="text-[10px] font-medium text-slate-450">Collect and manage supporting documents for verification and future reference.</p>
              </div>
              <button
                type="button"
                onClick={() => onToast('Open Upload Evidence portal...')}
                className="rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-[10px] font-semibold text-slate-650 hover:bg-slate-50 transition inline-flex items-center gap-1.5"
              >
                📤 Upload Evidence
              </button>
            </div>

            {/* Folders grid */}
            <div className="grid gap-3 grid-cols-2 sm:grid-cols-5">
              {folders.map(folder => (
                <div
                  key={folder.name}
                  onClick={() => onToast(`Selected category folder: ${folder.name}`)}
                  className="group cursor-pointer rounded-xl border border-slate-200 hover:border-slate-350 p-4 bg-white hover:bg-slate-50/20 text-center transition flex flex-col justify-between items-center"
                >
                  <span className="text-xl mb-2">{folder.icon}</span>
                  <h4 className="text-xs font-semibold text-slate-800 line-clamp-1">{folder.name}</h4>
                  <p className="text-[9px] text-slate-400 font-semibold mt-1">{folder.count} Uploaded</p>
                </div>
              ))}
            </div>
          </section>

        </main>

        {/* RIGHT INSIGHT SIDEBAR (4 columns): Sticky layout metrics and donut breakdown */}
        <aside className="lg:col-span-4 space-y-6 sticky top-6">
          
          {/* CARD 1: EVENT IMPACT PREVIEW */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.015)] space-y-4">
            <div className="flex items-center justify-between border-b border-slate-50 pb-2">
              <h4 className="text-xs font-semibold text-slate-850">Event Impact Preview</h4>
              <span className="rounded bg-blue-50 px-1 py-0.5 text-[8px] font-semibold text-blue-700">Beta</span>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center">
              {[
                { label: 'Participants', val: '120+', icon: '👥' },
                { label: 'Skills Identified', val: '48+', icon: '🎯' },
                { label: 'Teams', val: '16+', icon: '🏫' },
                { label: 'Partners', val: '5', icon: '🤝' },
              ].map(stat => (
                <div key={stat.label} className="rounded-xl bg-slate-50 border border-slate-100 p-2.5 flex flex-col justify-between items-center">
                  <span className="text-sm mb-1">{stat.icon}</span>
                  <p className="text-xs font-bold text-slate-800">{stat.val}</p>
                  <p className="text-[7px] text-slate-400 uppercase font-semibold leading-normal mt-0.5">{stat.label.split(' ')[0]}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CARD 2: AI SKILL EXTRACTION SUMMARY (SVG DONUT CHART) */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.015)] space-y-4">
            <div>
              <h4 className="text-xs font-semibold text-slate-800">AI Skill Extraction Summary</h4>
              <p className="text-[9px] text-slate-400 font-medium mt-0.5">AI analyzed event activities, roles, and submissions to suggest skills.</p>
            </div>

            {/* SVG Donut Ring Chart */}
            <div className="flex items-center gap-5">
              <div className="relative shrink-0 flex items-center justify-center h-28 w-28">
                <svg width="100%" height="100%" viewBox="0 0 36 36" className="drop-shadow-sm">
                  {/* Base grey background circle */}
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f1f5f9" strokeWidth="2.5" />
                  
                  {/* Leadership: value 18 (37.5%), color violet-400 */}
                  <circle
                    cx="18"
                    cy="18"
                    r="15.915"
                    fill="none"
                    stroke="#a78bfa"
                    strokeWidth="2.8"
                    strokeDasharray="37.5 62.5"
                    strokeDashoffset="100"
                    className="transition-all hover:stroke-violet-500 cursor-pointer"
                  />
                  {/* Problem Solving: value 15 (31.25%), color blue-400 */}
                  <circle
                    cx="18"
                    cy="18"
                    r="15.915"
                    fill="none"
                    stroke="#60a5fa"
                    strokeWidth="2.8"
                    strokeDasharray="31.25 68.75"
                    strokeDashoffset="62.5"
                    className="transition-all hover:stroke-blue-500 cursor-pointer"
                  />
                  {/* Technical: value 10 (20.8%), color emerald-400 */}
                  <circle
                    cx="18"
                    cy="18"
                    r="15.915"
                    fill="none"
                    stroke="#34d399"
                    strokeWidth="2.8"
                    strokeDasharray="20.8 79.2"
                    strokeDashoffset="31.25"
                    className="transition-all hover:stroke-emerald-500 cursor-pointer"
                  />
                  {/* Communication: value 5 (10.45%), color amber-400 */}
                  <circle
                    cx="18"
                    cy="18"
                    r="15.915"
                    fill="none"
                    stroke="#fbbf24"
                    strokeWidth="2.8"
                    strokeDasharray="10.45 89.55"
                    strokeDashoffset="10.45"
                    className="transition-all hover:stroke-amber-500 cursor-pointer"
                  />

                  {/* Center Text inside ring */}
                  <g className="translate-y-[0.5px]">
                    <text x="18" y="16.5" className="text-[6.5px] font-bold text-slate-800" textAnchor="middle">48</text>
                    <text x="18" y="21.5" className="text-[2.2px] font-semibold text-slate-400 uppercase tracking-wide" textAnchor="middle">Skills Identified</text>
                  </g>
                </svg>
              </div>

              {/* Legend with breakdowns */}
              <div className="space-y-1.5 flex-1 min-w-0 text-[10px] font-medium text-slate-600">
                <div className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-1.5 truncate">
                    <span className="h-2.5 w-2.5 rounded bg-violet-400 shrink-0" />
                    <span className="truncate">Leadership</span>
                  </span>
                  <span className="font-bold text-slate-700 shrink-0">18</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-1.5 truncate">
                    <span className="h-2.5 w-2.5 rounded bg-blue-400 shrink-0" />
                    <span className="truncate">Problem Solving</span>
                  </span>
                  <span className="font-bold text-slate-700 shrink-0">15</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-1.5 truncate">
                    <span className="h-2.5 w-2.5 rounded bg-emerald-400 shrink-0" />
                    <span className="truncate">Technical</span>
                  </span>
                  <span className="font-bold text-slate-700 shrink-0">10</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-1.5 truncate">
                    <span className="h-2.5 w-2.5 rounded bg-amber-400 shrink-0" />
                    <span className="truncate">Communication</span>
                  </span>
                  <span className="font-bold text-slate-700 shrink-0">5</span>
                </div>
              </div>
            </div>
          </div>

          {/* CARD 3: COMPLETION PROGRESS */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.015)] space-y-4">
            <div className="flex items-center justify-between border-b border-slate-50 pb-2">
              <h4 className="text-xs font-semibold text-slate-850">Completion Progress</h4>
              <span className="text-[10px] font-bold text-blue-600">68%</span>
            </div>

            {/* Progress bar */}
            <div className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden flex">
              <div className="bg-blue-650 h-full transition-all" style={{ width: '68%' }} />
            </div>

            {/* Metrics detail breakdown */}
            <div className="grid grid-cols-2 gap-3 text-[10px] font-medium text-slate-600">
              <div className="flex items-center justify-between border-r border-slate-50 pr-2">
                <span>Verified:</span>
                <span className="font-bold text-slate-850">82</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Pending Review:</span>
                <span className="font-bold text-slate-850">24</span>
              </div>
              <div className="flex items-center justify-between border-r border-slate-50 pr-2 pt-1">
                <span>Not Submitted:</span>
                <span className="font-bold text-slate-850">10</span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span>Requires Action:</span>
                <span className="font-bold text-slate-850">8</span>
              </div>
            </div>
          </div>

          {/* CARD 4: NEXT STEP */}
          <div className="rounded-2xl border border-slate-250 bg-gradient-to-br from-slate-900 to-indigo-950 p-5 shadow-md text-white space-y-4">
            <div className="space-y-1">
              <h4 className="text-xs font-semibold">Next Step</h4>
              <p className="text-[10px] leading-relaxed text-slate-350">Review and verify all participants before updating student profiles.</p>
            </div>

            <button
              type="button"
              onClick={() => {
                setActiveStep(3)
                onToast('Proceeding to Step 3: Review & Verify')
              }}
              className="w-full rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md hover:opacity-95 transition text-center"
            >
              Continue to Review →
            </button>
          </div>

        </aside>

      </div>

    </div>
  )
}
