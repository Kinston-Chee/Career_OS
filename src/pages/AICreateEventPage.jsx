import React, { useState, useMemo } from 'react'

export default function AICreateEventPage({ onBack, onToast, onPublish }) {
  // --- FORM STATES ---
  const [eventName, setEventName] = useState('AI in Finance Case Competition')
  const [eventType, setEventType] = useState('Case Competition')
  const [mode, setMode] = useState('On Campus')
  const [organizingClub, setOrganizingClub] = useState('FinTech Society')
  const [description, setDescription] = useState(
    'A national-level case competition where student teams solve real-world AI in finance challenges and present strategic solutions to an industry panel.'
  )
  const [dateRange, setDateRange] = useState('15 Jul 2026 - 28 Sep 2026')
  const [venue, setVenue] = useState('Sunway University Campus')
  
  // Co-organizers state
  const [coOrganizers, setCoOrganizers] = useState([])
  const [showCoOrganizerDropdown, setShowCoOrganizerDropdown] = useState(false)
  const availableCoOrganizers = ['Sunway Analytics Club', 'Google Developer Student Club', 'Sunway Business Society', 'IEEE Sunway Student Branch']

  // --- COLLABORATION NEEDS ---
  const [needs, setNeeds] = useState({
    Sponsor: true,
    Judge: true,
    Mentor: true,
    TechnicalPartner: false,
    MediaPartner: false,
  })

  // --- CUSTOM ROLES ---
  const [customRoles, setCustomRoles] = useState(['Workshop Facilitator'])
  const [newRoleInput, setNewRoleInput] = useState('')
  const [showAddRoleInput, setShowAddRoleInput] = useState(false)

  // --- COLLABORATOR DATA ---
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [matchOffsets, setMatchOffsets] = useState({ Grab: 0, Deloitte: 0, Maybank: 0, Microsoft: 0, TikTok: 0 })

  // --- OUTREACH PREVIEW GENERATOR ---
  const [isGeneratingOutreach, setIsGeneratingOutreach] = useState(false)
  const [outreachDrafts, setOutreachDrafts] = useState(null)
  const [activeDraftTab, setActiveDraftTab] = useState('')

  // Toggle role checked state
  const handleToggleNeed = (key) => {
    setNeeds(prev => ({ ...prev, [key]: !prev[key] }))
  }

  // Add custom role
  const handleAddCustomRole = (e) => {
    e.preventDefault()
    if (newRoleInput.trim() && !customRoles.includes(newRoleInput.trim())) {
      setCustomRoles(prev => [...prev, newRoleInput.trim()])
      setNewRoleInput('')
      setShowAddRoleInput(false)
      onToast(`Custom role "${newRoleInput.trim()}" added to your target roles.`)
    }
  }

  // Remove custom role
  const handleRemoveCustomRole = (role) => {
    setCustomRoles(prev => prev.filter(r => r !== role))
  }

  // Add co-organizer
  const handleAddCoOrganizer = (club) => {
    if (!coOrganizers.includes(club)) {
      setCoOrganizers(prev => [...prev, club])
      setShowCoOrganizerDropdown(false)
      onToast(`Added ${club} as a co-organizer.`)
    }
  }

  // Remove co-organizer
  const handleRemoveCoOrganizer = (club) => {
    setCoOrganizers(prev => prev.filter(c => c !== club))
  }

  // Refresh suggestions animation
  const handleRefreshSuggestions = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
      // Slightly randomize scores to show "re-calculation"
      setMatchOffsets({
        Grab: Math.floor(Math.random() * 5) - 2,
        Deloitte: Math.floor(Math.random() * 5) - 2,
        Maybank: Math.floor(Math.random() * 5) - 2,
        Microsoft: Math.floor(Math.random() * 5) - 2,
        TikTok: Math.floor(Math.random() * 5) - 2,
      })
      onToast('AI matching suggestions refreshed with latest organization signals!')
    }, 600)
  }

  // Generate outreach drafts
  const handleGenerateOutreach = () => {
    setIsGeneratingOutreach(true)
    setTimeout(() => {
      setIsGeneratingOutreach(false)
      const selectedNeeds = Object.keys(needs).filter(k => needs[k])
      if (selectedNeeds.length === 0) {
        onToast('Please select at least one collaboration need to generate tailored outreach.')
        return
      }

      setOutreachDrafts({
        Grab: `Hi Grab Malaysia Partnerships Team,\n\nWe are hosting the "${eventName}" and noticed Grab's strong focus on analytics. We would love to collaborate under your mentorship programs to support student developers at Sunway University.\n\nBest,\n${organizingClub}`,
        Deloitte: `Dear Deloitte Malaysia Campus Recruiting Team,\n\nIn planning the upcoming "${eventName}", we would value Deloitte's renowned consulting expertise. We are looking for an Industry Judge to evaluate student business models and case pitches.\n\nBest regards,\n${organizingClub}`,
        Maybank: `Dear Maybank Youth Development Team,\n\nWe are organizing "${eventName}". As a leader in corporate financial technology, Maybank would be an outstanding Event Sponsor. We would love to highlight your brand to 120+ top-tier finance students.\n\nSincerely,\n${organizingClub}`
      })
      setActiveDraftTab('Grab')
      onToast('AI Outreach Messages generated successfully!')
      
      // Scroll to outreach section
      const outreachSec = document.getElementById('outreach')
      if (outreachSec) {
        outreachSec.scrollIntoView({ behavior: 'smooth' })
      }
    }, 850)
  }

  // DYNAMIC SIDEBAR METRICS CALCULATIONS
  const expectedParticipants = useMemo(() => {
    if (eventType === 'Hackathon') return '150-200'
    if (eventType === 'Case Competition') return '120+'
    if (eventType === 'Workshop') return '60-85'
    if (eventType === 'Seminar') return '100+'
    return '50+'
  }, [eventType])

  const expectedUniversities = useMemo(() => {
    if (mode === 'Online') return '15+'
    if (mode === 'Hybrid') return '10+'
    return '8+'
  }, [mode])

  const skillsGeneratedCount = useMemo(() => {
    let base = 24
    if (eventName.toLowerCase().includes('ai') || eventName.toLowerCase().includes('machine')) base += 12
    if (eventName.toLowerCase().includes('finance') || eventName.toLowerCase().includes('business')) base += 8
    if (description.length > 100) base += 4
    return `${base}+`
  }, [eventName, description])

  const employabilityImpact = useMemo(() => {
    if (eventType === 'Hackathon' || eventType === 'Case Competition') return 'High'
    return 'Medium'
  }, [eventType])

  // DYNAMIC PRE-BUILT SUGGESTED COLLABORATORS
  const collaborators = [
    {
      id: 'Grab',
      name: 'Grab Malaysia',
      baseMatch: 92,
      whyFits: ['Strong analytics & AI focus', 'Active campus engagement', 'Mentorship programs available'],
      roles: ['Mentor', 'TechnicalPartner'],
      contributions: ['Mentorship', 'Analytics Workshop'],
      logoColor: 'bg-emerald-600',
      logoTxt: 'Gr'
    },
    {
      id: 'Deloitte',
      name: 'Deloitte Malaysia',
      baseMatch: 90,
      whyFits: ['Case study & consulting expertise', 'Judging & evaluation experience', 'Strong university partnerships'],
      roles: ['Judge', 'Sponsor'],
      contributions: ['Case Study', 'Judging'],
      logoColor: 'bg-slate-900',
      logoTxt: 'De'
    },
    {
      id: 'Maybank',
      name: 'Maybank',
      baseMatch: 87,
      whyFits: ['Fintech innovation leader', 'Supports student development', 'Hackathon & case competition sponsor'],
      roles: ['Sponsor', 'Judge'],
      contributions: ['Cash Prize', 'Mentorship'],
      logoColor: 'bg-amber-400 text-slate-900',
      logoTxt: 'Mb'
    },
    {
      id: 'Microsoft',
      name: 'Microsoft Malaysia',
      baseMatch: 85,
      whyFits: ['AI/Cloud technology leader', 'Developer community support', 'Training & workshop programs'],
      roles: ['TechnicalPartner', 'Mentor'],
      contributions: ['Technical Workshop', 'Cloud Credits'],
      logoColor: 'bg-blue-600',
      logoTxt: 'Ms'
    },
    {
      id: 'TikTok',
      name: 'TikTok Malaysia',
      baseMatch: 82,
      whyFits: ['Young talent engagement', 'Creative & digital innovation', 'Brand visibility opportunities'],
      roles: ['MediaPartner', 'Sponsor'],
      contributions: ['Media Partner', 'Mentorship'],
      logoColor: 'bg-rose-500',
      logoTxt: 'Tk'
    }
  ]

  // Filter or prioritize based on selected needs
  const computedCollaborators = useMemo(() => {
    return collaborators.map(c => {
      const matchNeedsCount = c.roles.filter(r => needs[r]).length
      const scoreBonus = matchNeedsCount * 2
      const rawScore = c.baseMatch + scoreBonus + (matchOffsets[c.id] || 0)
      const matchScore = Math.min(99, Math.max(70, rawScore))
      return { ...c, matchScore }
    }).sort((a, b) => b.matchScore - a.matchScore)
  }, [needs, matchOffsets])

  // --- SCROLL TO ANCHOR ---
  const [activeStep, setActiveStep] = useState(1)
  const handleStepClick = (step, anchorId) => {
    setActiveStep(step)
    const element = document.getElementById(anchorId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  // --- PUBLISH TRIGGER ---
  const handlePublish = () => {
    if (!eventName.trim()) {
      onToast('Please enter an event name.')
      return
    }
    if (!description.trim()) {
      onToast('Please provide a short description.')
      return
    }

    const selectedNeedsList = Object.keys(needs).filter(n => needs[n]).map(n => {
      if (n === 'TechnicalPartner') return 'Technical Partner'
      if (n === 'MediaPartner') return 'Media Partner'
      return n
    })

    const constructedEvent = {
      id: 'custom-' + Date.now(),
      title: eventName,
      club: organizingClub,
      date: dateRange.split(' - ')[0] || 'TBD',
      participants: `${expectedParticipants} students`,
      level: eventType,
      location: mode,
      status: 'Open for Partners',
      initials: organizingClub.split(' ').map(w => w[0]).join(''),
      accent: 'from-violet-600 to-indigo-600',
      lookingFor: selectedNeedsList,
      benefits: ['Talent Pipeline', 'Brand Visibility', 'Campus Exposure'],
      interestedCount: 0,
      companies: computedCollaborators.slice(0, 3).map(c => c.logoTxt),
      targetSkills: ['AI/ML', 'Problem Solving', 'Data Analysis', 'Presentation'],
      readiness: '85%',
      categoriesNeeded: selectedNeedsList.length,
      collaborators: [],
      interestedCompanies: [],
      expressedInterest: [],
      summary: description
    }

    onPublish(constructedEvent)
  }

  return (
    <div className="mx-auto w-full max-w-[1400px] space-y-6 px-6 pb-12">
      
      {/* ================= HEADER ================= */}
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
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Create Event</h1>
            <span className="rounded bg-violet-50 px-1.5 py-0.5 text-[10px] font-semibold text-violet-700 border border-violet-100/50">AI Copilot</span>
          </div>
          <p className="text-xs font-medium text-slate-400">Set up your event and let AI help you find the right collaborators.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onToast('Event draft saved locally.')}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition animate-fade-in"
          >
            Save as Draft
          </button>
          <button
            type="button"
            onClick={handlePublish}
            className="rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 px-5 py-2.5 text-xs font-semibold text-white shadow-md hover:opacity-95 transition"
          >
            Preview & Continue ✨
          </button>
        </div>
      </header>

      {/* ================= STEP PROGRESS TRACKER ================= */}
      <section className="rounded-2xl border border-slate-100 bg-white p-3 shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-around px-4">
          {[
            { stepNum: 1, title: 'Event Details', anchor: 'basics' },
            { stepNum: 2, title: 'Collaboration Needs', anchor: 'needs' },
            { stepNum: 3, title: 'AI Recommendations', anchor: 'suggested' },
            { stepNum: 4, title: 'Outreach & Publish', anchor: 'outreach' },
          ].map(s => {
            const isActive = activeStep === s.stepNum
            return (
              <button
                key={s.stepNum}
                type="button"
                onClick={() => handleStepClick(s.stepNum, s.anchor)}
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
                  isActive ? 'text-slate-900 font-semibold' : 'text-slate-400 group-hover:text-slate-600'
                }`}>
                  {s.title}
                </span>
              </button>
            )
          })}
        </div>
      </section>

      {/* ================= 3-COLUMN LAYOUT ================= */}
      <div className="grid gap-6 lg:grid-cols-12 items-start">
        
        {/* LEFT + CENTER (8 columns): progressive creation steps */}
        <main className="space-y-6 lg:col-span-8 min-w-0">
          
          {/* SECTION A: EVENT BASICS */}
          <section
            id="basics"
            className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.015)] space-y-5"
          >
            <div className="flex items-center justify-between border-b border-slate-50 pb-3">
              <h3 className="text-sm font-semibold text-slate-800">A. Event Basics</h3>
              <span className="text-[10px] text-slate-400 font-medium">Step 1 of 4</span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block space-y-1">
                <span className="text-[11px] font-medium text-slate-500">Event Name *</span>
                <input
                  type="text"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  placeholder="e.g. AI Hackathon"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs text-slate-700 outline-none transition focus:border-blue-350 focus:ring-4 focus:ring-blue-100/50"
                />
              </label>

              <label className="block space-y-1">
                <span className="text-[11px] font-medium text-slate-500">Event Type *</span>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs text-slate-700 outline-none transition focus:border-blue-350 focus:ring-4 focus:ring-blue-100/50"
                >
                  <option value="Case Competition">Case Competition</option>
                  <option value="Hackathon">Hackathon</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Seminar">Seminar</option>
                  <option value="Networking Event">Networking Event</option>
                </select>
              </label>

              <label className="block space-y-1">
                <span className="text-[11px] font-medium text-slate-500">Mode *</span>
                <select
                  value={mode}
                  onChange={(e) => setMode(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs text-slate-700 outline-none transition focus:border-blue-350 focus:ring-4 focus:ring-blue-100/50"
                >
                  <option value="On Campus">On Campus</option>
                  <option value="Online">Online</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </label>

              <label className="block space-y-1">
                <span className="text-[11px] font-medium text-slate-500">Organizing Team / Club *</span>
                <select
                  value={organizingClub}
                  onChange={(e) => setOrganizingClub(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs text-slate-700 outline-none transition focus:border-blue-350 focus:ring-4 focus:ring-blue-100/50"
                >
                  <option value="FinTech Society">FinTech Society</option>
                  <option value="Analytics Club">Analytics Club</option>
                  <option value="Developer Student Clubs">Developer Student Clubs</option>
                  <option value="Business Society">Business Society</option>
                </select>
              </label>

              <label className="block sm:col-span-2 space-y-1">
                <div className="flex justify-between items-center text-[11px] font-medium text-slate-500">
                  <span>Short Description *</span>
                  <span className={`${description.length > 250 ? 'text-red-500' : 'text-slate-400'}`}>
                    {description.length}/250
                  </span>
                </div>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value.slice(0, 300))}
                  placeholder="Summarize what students will do and gain..."
                  className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs leading-relaxed text-slate-700 outline-none transition focus:border-blue-350 focus:ring-4 focus:ring-blue-100/50"
                />
              </label>

              <label className="block space-y-1">
                <span className="text-[11px] font-medium text-slate-500">Date *</span>
                <input
                  type="text"
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  placeholder="e.g. 15 Jul 2026 - 28 Sep 2026"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs text-slate-700 outline-none transition focus:border-blue-350 focus:ring-4 focus:ring-blue-100/50"
                />
              </label>

              <label className="block space-y-1">
                <span className="text-[11px] font-medium text-slate-500">Venue *</span>
                <input
                  type="text"
                  value={venue}
                  disabled={mode === 'Online'}
                  onChange={(e) => setVenue(e.target.value)}
                  placeholder={mode === 'Online' ? 'Hosted Online' : 'e.g. Sunway Hall'}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs text-slate-700 outline-none transition focus:border-blue-350 focus:ring-4 focus:ring-blue-100/50 disabled:bg-slate-50 disabled:text-slate-400"
                />
              </label>
            </div>

            {/* Co-organizer Section */}
            <div className="pt-2">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowCoOrganizerDropdown(!showCoOrganizerDropdown)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition"
                >
                  <span className="text-sm">+</span> Add Co-organizer
                </button>
                {coOrganizers.map(c => (
                  <span
                    key={c}
                    className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-600 border border-slate-200"
                  >
                    {c}
                    <button
                      type="button"
                      onClick={() => handleRemoveCoOrganizer(c)}
                      className="text-slate-450 hover:text-red-500 transition font-bold"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>

              {showCoOrganizerDropdown && (
                <div className="absolute z-20 mt-2 w-64 rounded-xl border border-slate-100 bg-white p-2 shadow-lg animate-fade-in">
                  <p className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">Select Co-Organizer</p>
                  <div className="space-y-0.5">
                    {availableCoOrganizers
                      .filter(club => !coOrganizers.includes(club))
                      .map(club => (
                        <button
                          key={club}
                          type="button"
                          onClick={() => handleAddCoOrganizer(club)}
                          className="w-full rounded-lg px-2.5 py-1.5 text-left text-xs text-slate-650 hover:bg-slate-50 transition"
                        >
                          {club}
                        </button>
                      ))}
                    {availableCoOrganizers.filter(club => !coOrganizers.includes(club)).length === 0 && (
                      <p className="px-2 py-2 text-xs text-slate-400 italic">All clubs added.</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* SECTION B: COLLABORATION NEED BUILDER */}
          <section
            id="needs"
            className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.015)] space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-50 pb-3">
              <div className="space-y-0.5">
                <h3 className="text-sm font-semibold text-slate-800">B. Collaboration Need Builder</h3>
                <p className="text-[10px] font-medium text-slate-450">Select the types of collaborators you're looking for. AI will help match the best-fit organizations.</p>
              </div>
              <button
                type="button"
                onClick={() => onToast('Customize Needs clicked: Additional role parameters can be set when active.')}
                className="text-[10px] font-semibold text-slate-500 hover:text-blue-600 transition"
              >
                Customize Needs
              </button>
            </div>

            {/* Role cards display */}
            <div className="grid gap-3 sm:grid-cols-5">
              {[
                { key: 'Sponsor', label: 'Sponsor', desc: 'Financial support, prizes, branding.', icon: '💰' },
                { key: 'Judge', label: 'Judge', desc: 'Industry experts to evaluate.', icon: '⚖️' },
                { key: 'Mentor', label: 'Mentor', desc: 'Guidance and team support.', icon: '🎓' },
                { key: 'TechnicalPartner', label: 'Technical Partner', desc: 'Tools, cloud or technical support.', icon: '💻' },
                { key: 'MediaPartner', label: 'Media Partner', desc: 'Promotion and outreach.', icon: '📣' },
              ].map(role => {
                const isSelected = needs[role.key]
                return (
                  <div
                    key={role.key}
                    onClick={() => handleToggleNeed(role.key)}
                    className={`group cursor-pointer rounded-xl border p-3.5 transition text-center relative flex flex-col justify-between items-center ${
                      isSelected
                        ? 'border-violet-500 bg-violet-50/40 shadow-sm ring-1 ring-violet-50'
                        : 'border-slate-200/80 hover:border-slate-350 bg-white'
                    }`}
                  >
                    {/* Small checkbox */}
                    <div className="absolute right-2.5 top-2.5 flex h-3.5 w-3.5 items-center justify-center rounded border border-slate-300 transition bg-white group-hover:border-violet-400">
                      {isSelected && <span className="h-1.5 w-1.5 rounded-sm bg-violet-600" />}
                    </div>

                    <span className="text-xl mb-2 mt-1">{role.icon}</span>
                    <h4 className="text-xs font-semibold text-slate-800">{role.label}</h4>
                    <p className="text-[9px] text-slate-450 leading-relaxed mt-1 font-medium">{role.desc}</p>
                  </div>
                )
              })}
            </div>
          </section>

          {/* SECTION C: AI SUGGESTED COLLABORATORS */}
          <section
            id="suggested"
            className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.015)] space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-50 pb-3">
              <div className="space-y-0.5">
                <h3 className="text-sm font-semibold text-slate-800">C. AI Suggested Collaborators</h3>
                <p className="text-[10px] font-medium text-slate-450">Based on your event details and needs</p>
              </div>
              <button
                type="button"
                onClick={handleRefreshSuggestions}
                className="inline-flex items-center gap-1 text-[10px] font-semibold text-blue-600 hover:text-blue-700 transition"
              >
                {isRefreshing ? (
                  <span className="h-2.5 w-2.5 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
                ) : (
                  <span>🔄</span>
                )}
                Refresh Suggestions
              </button>
            </div>

            {/* Horizontal scroll grid */}
            <div className={`flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-100 ${isRefreshing ? 'opacity-50 transition-opacity' : ''}`}>
              {computedCollaborators.map(c => {
                const countMatchedNeeds = c.roles.filter(r => needs[r]).length
                const highlight = countMatchedNeeds > 0
                return (
                  <div
                    key={c.id}
                    className={`min-w-[210px] max-w-[210px] rounded-xl border p-4 bg-white transition space-y-3 shrink-0 flex flex-col justify-between ${
                      highlight ? 'border-blue-150 shadow-sm' : 'border-slate-200/60'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${c.logoColor} text-white font-bold text-xs shadow-sm`}>
                          {c.logoTxt}
                        </span>
                        <span className="rounded-full bg-emerald-50 px-1.5 py-0.5 text-[9px] font-bold text-emerald-700 border border-emerald-100/50">
                          {c.matchScore}% Match
                        </span>
                      </div>

                      <div>
                        <h4 className="text-xs font-semibold text-slate-800 truncate">{c.name}</h4>
                        <span className="text-[8px] text-slate-400 font-semibold uppercase tracking-wider">Why fits?</span>
                        <ul className="text-[9px] text-slate-550 leading-relaxed font-medium space-y-0.5 mt-0.5">
                          {c.whyFits.slice(0, 2).map((fit, idx) => (
                            <li key={idx} className="flex items-start gap-1">
                              <span className="text-emerald-500 font-bold">✓</span>
                              <span className="line-clamp-1">{fit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="border-t border-slate-50 pt-2 space-y-1">
                      <span className="text-[8px] text-slate-400 font-semibold uppercase tracking-wider block">Likely Contribution:</span>
                      <div className="flex flex-wrap gap-1">
                        {c.contributions.map(t => (
                          <span key={t} className="rounded bg-slate-50 px-1 py-0.5 text-[8px] font-semibold text-slate-600 border border-slate-100">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* SECTION D: AI OUTREACH GENERATOR PREVIEW */}
          <section
            id="outreach"
            className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.015)] space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="space-y-0.5">
                <h3 className="text-sm font-semibold text-slate-800">D. AI Outreach Generator (Preview)</h3>
                <p className="text-[10px] font-medium text-slate-450">Let AI craft the perfect outreach message for your selected collaborators.</p>
              </div>

              <button
                type="button"
                onClick={handleGenerateOutreach}
                disabled={isGeneratingOutreach}
                className="rounded-xl border border-slate-200 hover:border-slate-350 bg-white hover:bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-600 inline-flex items-center gap-1.5 transition disabled:opacity-50"
              >
                {isGeneratingOutreach ? (
                  <span className="h-3 w-3 animate-spin rounded-full border-2 border-slate-600 border-t-transparent" />
                ) : (
                  <span>✨</span>
                )}
                Generate Outreach
              </button>
            </div>

            {/* Generated drafts accordion display */}
            {outreachDrafts && (
              <div className="rounded-xl border border-slate-100/80 bg-slate-50/20 p-4 space-y-3.5 animate-fade-in">
                {/* Tabs inside outreach */}
                <div className="flex border-b border-slate-100 gap-4">
                  {Object.keys(outreachDrafts).map(company => (
                    <button
                      key={company}
                      type="button"
                      onClick={() => setActiveDraftTab(company)}
                      className={`pb-2 text-xs font-semibold border-b-2 transition ${
                        activeDraftTab === company
                          ? 'border-blue-600 text-blue-700'
                          : 'border-transparent text-slate-450 hover:text-slate-700'
                      }`}
                    >
                      {company}
                    </button>
                  ))}
                </div>

                {/* Editable draft textarea */}
                <div className="space-y-2">
                  <textarea
                    rows={5}
                    value={outreachDrafts[activeDraftTab]}
                    onChange={(e) => {
                      const updated = { ...outreachDrafts, [activeDraftTab]: e.target.value }
                      setOutreachDrafts(updated)
                    }}
                    className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs leading-relaxed text-slate-750 outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => onToast(`Draft saved for ${activeDraftTab}.`)}
                      className="rounded-lg bg-blue-50 hover:bg-blue-100/85 px-3 py-1.5 text-[10px] font-semibold text-blue-700 transition"
                    >
                      Save Draft Modification
                    </button>
                  </div>
                </div>
              </div>
            )}
          </section>

        </main>

        {/* RIGHT SIDEBAR (4 columns): dynamic preview and publishing stats */}
        <aside className="lg:col-span-4 space-y-6 sticky top-6">
          
          {/* CARD 1: AI EVENT IMPACT PREVIEW */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.015)] space-y-4">
            <div className="flex items-center gap-1.5">
              <h4 className="text-xs font-semibold text-slate-800">AI Event Impact Preview</h4>
              <span className="rounded bg-blue-50 px-1 py-0.5 text-[8px] font-semibold text-blue-700">Beta</span>
            </div>

            {/* Metrics grid */}
            <div className="grid grid-cols-4 gap-2">
              {[
                { title: 'Expected Participants', val: expectedParticipants, icon: '👤' },
                { title: 'Universities Expected', val: expectedUniversities, icon: '🏫' },
                { title: 'Skills Generated', val: skillsGeneratedCount, icon: '🎯' },
                { title: 'Employability Impact', val: employabilityImpact, icon: '📈' },
              ].map(metric => (
                <div key={metric.title} className="text-center rounded-xl bg-slate-50/60 border border-slate-100/40 p-2.5 flex flex-col justify-between">
                  <span className="text-sm mb-1">{metric.icon}</span>
                  <p className="text-xs font-bold text-slate-800">{metric.val}</p>
                  <p className="text-[7.5px] text-slate-400 font-semibold mt-1 leading-normal leading-none uppercase tracking-wide">{metric.title.split(' ')[0]}</p>
                </div>
              ))}
            </div>

            {/* Skills & Insights */}
            <div className="space-y-2 pt-2 border-t border-slate-50">
              <span className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider block">Top Skills Likely to be Developed:</span>
              <div className="flex flex-wrap gap-1">
                {['AI/ML', 'Data Analysis', 'Problem Solving', 'Critical Thinking', 'Presentation'].map(s => (
                  <span key={s} className="rounded bg-blue-50/50 px-1.5 py-0.5 text-[9px] font-medium text-blue-600 border border-blue-100/30">
                    {s}
                  </span>
                ))}
                <span className="text-[9px] text-slate-450 font-medium self-center ml-0.5">+3 more</span>
              </div>
            </div>

            {/* AI Insight banner */}
            <div className="rounded-xl bg-violet-50/40 border border-violet-100/30 p-3 text-[10px] text-violet-750 font-medium leading-relaxed">
              💡 <span className="font-semibold text-violet-800">AI Insight:</span> Events like this have 3x higher industry engagement compared to general workshops.
            </div>
          </div>

          {/* CARD 2: TARGET ROLES */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.015)] space-y-3.5">
            <h4 className="text-xs font-semibold text-slate-800">Target Roles You’re Looking For</h4>
            
            <div className="flex flex-wrap gap-1.5">
              {/* Show default roles selected from Section B */}
              {needs.Sponsor && <span className="rounded bg-violet-50 px-2 py-0.5 text-[9px] font-semibold text-violet-700">Event Sponsor</span>}
              {needs.Judge && <span className="rounded bg-violet-50 px-2 py-0.5 text-[9px] font-semibold text-violet-700">Industry Judge</span>}
              {needs.Mentor && <span className="rounded bg-violet-50 px-2 py-0.5 text-[9px] font-semibold text-violet-700">Mentor</span>}
              {needs.TechnicalPartner && <span className="rounded bg-violet-50 px-2 py-0.5 text-[9px] font-semibold text-violet-700">Technical Partner</span>}
              {needs.MediaPartner && <span className="rounded bg-violet-50 px-2 py-0.5 text-[9px] font-semibold text-violet-700">Media Partner</span>}

              {/* Show custom added roles */}
              {customRoles.map(cr => (
                <span
                  key={cr}
                  className="rounded bg-blue-50 px-2 py-0.5 text-[9px] font-semibold text-blue-700 inline-flex items-center gap-1"
                >
                  {cr}
                  <button
                    type="button"
                    onClick={() => handleRemoveCustomRole(cr)}
                    className="hover:text-red-500 font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}

              {customRoles.length === 0 && !needs.Sponsor && !needs.Judge && !needs.Mentor && !needs.TechnicalPartner && !needs.MediaPartner && (
                <span className="text-[10px] text-slate-400 italic">No roles selected. Choose roles in Section B.</span>
              )}
            </div>

            {/* Inline add custom role form */}
            <div>
              {showAddRoleInput ? (
                <form onSubmit={handleAddCustomRole} className="flex gap-2">
                  <input
                    type="text"
                    value={newRoleInput}
                    onChange={(e) => setNewRoleInput(e.target.value)}
                    placeholder="Enter custom role..."
                    className="flex-1 rounded-lg border border-slate-200 px-2 py-1 text-[10px] outline-none"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="rounded-lg bg-blue-600 px-2.5 py-1 text-[10px] text-white font-semibold"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddRoleInput(false)}
                    className="text-[10px] text-slate-400 hover:text-slate-655"
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowAddRoleInput(true)}
                  className="inline-flex items-center gap-1 text-[10px] font-semibold text-blue-600 hover:text-blue-700 transition"
                >
                  + Add Custom Role
                </button>
              )}
            </div>
          </div>

          {/* CARD 3: AI TIPS */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.015)] space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-semibold text-slate-800">AI Tips to Improve Your Event</h4>
              <span className="rounded bg-amber-50 px-1 py-0.5 text-[8px] font-semibold text-amber-700">Beta</span>
            </div>

            <ul className="space-y-3.5">
              {[
                'Add workshop component to increase participation.',
                'Offer mentorship opportunities to boost student engagement.',
                'Consider a theme focus like "AI for Finance Innovation".'
              ].map((tip, idx) => (
                <li key={idx} className="flex gap-2.5 items-start">
                  <span className="text-indigo-500 text-xs">✨</span>
                  <p className="text-[10px] leading-relaxed text-slate-600 font-medium">{tip}</p>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => onToast('Loading all 12 tips...')}
              className="text-[10px] font-semibold text-blue-600 hover:text-blue-700 transition block pt-1"
            >
              View All Tips →
            </button>
          </div>

          {/* CARD 4: PUBLISH CTA CARD */}
          <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950 p-5 shadow-lg text-white space-y-4">
            <div className="space-y-1">
              <h4 className="text-xs font-semibold">Ready to publish?</h4>
              <p className="text-[10px] leading-relaxed text-slate-350">Once you’ve reviewed all details, publish your event to start attracting collaborators.</p>
            </div>

            <button
              type="button"
              onClick={handlePublish}
              className="w-full rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md hover:opacity-95 transition text-center"
            >
              Preview & Continue →
            </button>
          </div>

        </aside>

      </div>

    </div>
  )
}
