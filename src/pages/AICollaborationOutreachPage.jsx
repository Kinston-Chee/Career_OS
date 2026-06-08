import React, { useState, useRef } from 'react'

export default function AICollaborationOutreachPage({ event, onBack, onToast, outreachPartner, onSendOutreach }) {
  const isOwnedEvent = event.hostedByUs

  // Recommended partners list for owned events
  const ownedCollaborators = [
    {
      id: 'Google',
      name: 'Google',
      logo: 'G',
      logoColor: 'from-blue-600 to-indigo-600',
      matchScore: 98,
      desc: 'Best for analytics, tech workshops and cloud computing sponsorship.',
      contributions: ['Tech Sponsor', 'Tech Talks', 'Mentorship'],
      whyFits: [
        'Strong focus on Tech & AI',
        'Industry leader in Cloud/AI',
        'Strong youth engagement'
      ],
      impact: 'High Impact',
      impactColor: 'bg-emerald-50 text-emerald-700 border-emerald-100'
    },
    {
      id: 'Petronas',
      name: 'Petronas',
      logo: 'P',
      logoColor: 'from-teal-600 to-emerald-500',
      matchScore: 94,
      desc: 'Best for engineering talent sponsorship and sustainability programs.',
      contributions: ['Energy Sponsor', 'Engineering', 'Scholarships'],
      whyFits: [
        'Actively recruiting engineering/tech',
        'Strong sustainability alignment',
        'Excellent campus history'
      ],
      impact: 'High Impact',
      impactColor: 'bg-emerald-50 text-emerald-700 border-emerald-100'
    },
    {
      id: 'Intel',
      name: 'Intel',
      logo: 'I',
      logoColor: 'from-blue-700 to-cyan-500',
      matchScore: 91,
      desc: 'Best for AI mentoring, hardware workshops, and judging.',
      contributions: ['AI Mentors', 'Hardware Sponsor', 'Judges'],
      whyFits: [
        'AI & microprocessor expert',
        'Offers hardware lab support',
        'Provides judges/mentors'
      ],
      impact: 'High Impact',
      impactColor: 'bg-emerald-50 text-emerald-700 border-emerald-100'
    },
    {
      id: 'Maxis',
      name: 'Maxis',
      logo: 'M',
      logoColor: 'from-green-600 to-lime-500',
      matchScore: 88,
      desc: 'Best for business case study challenges and youth branding.',
      contributions: ['Case Study', 'Mentorship', 'Digital Sponsor'],
      whyFits: [
        'Telco & digital platform focus',
        'Excellent student brand reach',
        'Provides internship channels'
      ],
      impact: 'High Impact',
      impactColor: 'bg-emerald-50 text-emerald-700 border-emerald-100'
    },
    {
      id: 'Shopee',
      name: 'Shopee',
      logo: 'S',
      logoColor: 'from-orange-600 to-amber-500',
      matchScore: 85,
      desc: 'Best for product management workshops, design, and career mentoring.',
      contributions: ['Product Sponsor', 'UX/UI Design', 'Mentors'],
      whyFits: [
        'High student usage rate',
        'Strong tech/design team focus',
        'Aggressive intern placement'
      ],
      impact: 'Medium Impact',
      impactColor: 'bg-blue-50 text-blue-700 border-blue-100'
    }
  ]

  const defaultExternalCollaborators = [
    {
      id: 'Grab',
      name: 'Grab',
      logo: 'Gr',
      logoColor: 'from-emerald-500 to-green-600',
      matchScore: 92,
      desc: 'Best for analytics mentorship and data-driven problem solving.',
      contributions: ['Mentorship', 'Analytics Workshop'],
      whyFits: [
        'Strong focus on data & AI',
        'Active on campus programs',
        'Talent pipeline alignment'
      ],
      impact: 'High Impact',
      impactColor: 'bg-emerald-50 text-emerald-700 border-emerald-100'
    },
    {
      id: 'Maybank',
      name: 'Maybank',
      logo: 'Mb',
      logoColor: 'from-yellow-400 to-amber-500',
      matchScore: 88,
      desc: 'Best for finance judging and sponsorship support.',
      contributions: ['Cash Prize Sponsorship', 'Judging'],
      whyFits: [
        'Leaders in finance education',
        'Supports youth development',
        'Brand visibility opportunity'
      ],
      impact: 'High Impact',
      impactColor: 'bg-emerald-50 text-emerald-700 border-emerald-100'
    },
    {
      id: 'Deloitte',
      name: 'Deloitte',
      logo: 'De',
      logoColor: 'from-slate-800 to-slate-950',
      matchScore: 85,
      desc: 'Best for case study, judging and certificates.',
      contributions: ['Case Study', 'Judging', 'Certificates'],
      whyFits: [
        'Strong in consulting & analytics',
        'Case competition experience',
        'Professional development'
      ],
      impact: 'High Impact',
      impactColor: 'bg-emerald-50 text-emerald-700 border-emerald-100'
    },
    {
      id: 'AWS',
      name: 'AWS',
      logo: 'Aw',
      logoColor: 'from-orange-400 to-amber-600',
      matchScore: 82,
      desc: 'Best for cloud & AI tech workshop support.',
      contributions: ['Tech Workshop', 'Cloud Credits'],
      whyFits: [
        'Cloud & AI technology leader',
        'Supports developer community',
        'Hands-on technical training'
      ],
      impact: 'Medium Impact',
      impactColor: 'bg-blue-50 text-blue-700 border-blue-100'
    }
  ]

  const suggestedCollaborators = isOwnedEvent ? ownedCollaborators : defaultExternalCollaborators

  // 1. Manage state for selected collaborators
  const [selectedCollaborators, setSelectedCollaborators] = useState(() => {
    if (outreachPartner && outreachPartner.name) {
      return { [outreachPartner.name]: true }
    }
    if (isOwnedEvent) {
      return {
        Google: true,
        Petronas: true,
        Intel: true,
        Maxis: false,
        Shopee: false
      }
    }
    return {
      Grab: true,
      Maybank: true,
      Deloitte: true,
      AWS: false
    }
  })

  // 2. State for expanded email drafts
  const [expandedDraft, setExpandedDraft] = useState(() => {
    if (outreachPartner && outreachPartner.name) {
      return outreachPartner.name
    }
    return isOwnedEvent ? 'Google' : 'Grab'
  })

  // State for show more recommendations
  const [showMoreMatches, setShowMoreMatches] = useState(false)

  // 3. State for editable message drafts
  const [draftMessages, setDraftMessages] = useState({
    Grab: `Dear Grab Team,

We are organizing the AI in Finance Case Competition, a national-level event that brings together 120+ talented students to solve real-world AI in finance challenges.

We believe Grab's expertise in data analytics and mentorship can greatly enhance the learning experience. We would love to invite Grab to collaborate with us by conducting an analytics workshop and providing mentorship to participating teams.

We look forward to the opportunity to work together and create meaningful impact for students.

Best regards,
FinTech Society, Sunway University`,
    Maybank: `Dear Maybank Team,

We are organizing the AI in Finance Case Competition, a national-level event that brings together 120+ talented students to solve real-world AI in finance challenges.

Maybank's leadership in finance education makes you the ideal partner. We would love to invite Maybank to collaborate as a Cash Prize Sponsor and join our Judging Panel for the final round.

We look forward to collaborating to support student development and early recruitment.

Best regards,
FinTech Society, Sunway University`,
    Deloitte: `Dear Deloitte Team,

We are organizing the AI in Finance Case Competition, a national-level event that brings together 120+ talented students to solve real-world AI in finance challenges.

We would love to invite Deloitte to collaborate as a Case Study Provider and support student learning by providing certificates of achievement.

We look forward to a successful collaboration.

Best regards,
FinTech Society, Sunway University`,
    AWS: `Dear AWS Team,

We are organizing the AI in Finance Case Competition, a national-level event that brings together 120+ talented students to solve real-world AI challenges.

We would love to invite AWS to support us as a technical partner, providing cloud credits and technical workshop support for students.

Best regards,
FinTech Society, Sunway University`,
    Google: `Dear Google Team,

We are organizing the ${event.title}, a premier campus event driving student innovation.

Given Google's pioneering work in AI and technology, we would love to invite Google to collaborate as a Tech Sponsor and provide technical workshop support for participating students.

We believe this collaboration will offer Google direct access to top technical talent and excellent visibility on campus.

Best regards,
${event.club || 'FinTech Society'}, Sunway University`,
    Petronas: `Dear Petronas Team,

We are organizing the ${event.title}, bringing together outstanding students to drive campus innovation.

We would love to invite Petronas to support this event as our Energy & Leadership Sponsor, helping us nurture student capabilities in sustainable technology.

We look forward to a successful partnership.

Best regards,
${event.club || 'FinTech Society'}, Sunway University`,
    Intel: `Dear Intel Team,

We are organizing the ${event.title}, focused on advanced technical development and AI.

We would love to invite Intel to collaborate by providing technical mentors and joining our Judging Panel for the final presentations.

Best regards,
${event.club || 'FinTech Society'}, Sunway University`,
    Maxis: `Dear Maxis Team,

We are organizing the ${event.title}, a major initiative connecting youth with business-case challenges.

We would love to invite Maxis to support us as a digital partner and sponsor, providing active student mentorship and early recruitment visibility.

Best regards,
${event.club || 'FinTech Society'}, Sunway University`,
    Shopee: `Dear Shopee Team,

We are organizing the ${event.title}, focusing on product engineering and user experience.

We would love to invite Shopee to collaborate by providing PM/UX mentors to guide students during their development phase.

Best regards,
${event.club || 'FinTech Society'}, Sunway University`
  })

  const strategyCards = [
    {
      title: 'Who to Invite',
      icon: '👥',
      color: 'text-indigo-600 bg-indigo-50 border-indigo-100',
      desc: `${Object.values(selectedCollaborators).filter(Boolean).length} organizations selected`,
      sub: 'High match score and strong relevance to your needs.'
    },
    {
      title: 'What to Ask For',
      icon: '💬',
      color: 'text-blue-600 bg-blue-50 border-blue-100',
      desc: 'Focus on contributions that create the highest student and event impact.',
      sub: 'Align requirements with partner core competencies.'
    },
    {
      title: 'What to Highlight',
      icon: '✨',
      color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
      desc: 'Emphasize talent access, brand visibility, and community impact.',
      sub: 'Highlight Sunway campus reach and quality pool.'
    },
    {
      title: 'Expected Impact',
      icon: '📈',
      color: 'text-amber-600 bg-amber-50 border-amber-100',
      desc: '120+ Students impacted',
      sub: '48+ Skills verified. Stronger industry-university tie.'
    }
  ]

  const handleToggleCollaborator = (id) => {
    setSelectedCollaborators(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const scrollContainerRef = useRef(null)
  const [isMouseDown, setIsMouseDown] = useState(false)
  const [dragged, setDragged] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeftState, setScrollLeftState] = useState(0)

  const handleMouseDown = (e) => {
    if (showMoreMatches) return
    setIsMouseDown(true)
    setDragged(false)
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft)
    setScrollLeftState(scrollContainerRef.current.scrollLeft)
  }

  const handleMouseLeave = () => {
    setIsMouseDown(false)
  }

  const handleMouseUp = () => {
    setIsMouseDown(false)
  }

  const handleMouseMove = (e) => {
    if (!isMouseDown || showMoreMatches) return
    e.preventDefault()
    const x = e.pageX - scrollContainerRef.current.offsetLeft
    const walk = (x - startX) * 1.5
    if (Math.abs(walk) > 5) {
      setDragged(true)
    }
    scrollContainerRef.current.scrollLeft = scrollLeftState - walk
  }

  const handleCardClick = (colId) => {
    if (dragged) return
    handleToggleCollaborator(colId)
  }

  const handleMessageChange = (id, text) => {
    setDraftMessages(prev => ({
      ...prev,
      [id]: text
    }))
  }

  const handleSendRequests = () => {
    const selectedList = Object.keys(selectedCollaborators).filter(k => selectedCollaborators[k])
    if (selectedList.length === 0) {
      onToast('Please select at least one collaborator to outreach.')
      return
    }
    onToast(`Successfully sent collaboration invitations to: ${selectedList.join(', ')}!`)
    if (onSendOutreach) {
      onSendOutreach(event.id, selectedList)
    }
    onBack()
  }

  return (
    <div className="mx-auto min-w-0 w-full max-w-[1400px] space-y-6 px-6 pb-12">
      {/* 1. HEADER */}
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
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">AI Collaboration Outreach</h1>
            <span className="rounded bg-violet-50 px-1.5 py-0.5 text-[10px] font-semibold text-violet-700 border border-violet-100/50">Beta</span>
          </div>
          <p className="text-xs font-medium text-slate-400">Let AI help you find the right collaborators and craft the perfect request.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onToast('Outreach draft saved successfully.')}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition"
          >
            Save as Draft
          </button>
          <button
            type="button"
            onClick={handleSendRequests}
            className="rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:opacity-95 transition"
          >
            AI Generate Outreach
          </button>
        </div>
      </header>

      {/* 2. EVENT SUMMARY HERO */}
      <section className="rounded-2xl border border-slate-200/60 bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.015)]">
        <div className="grid gap-5 lg:grid-cols-12 items-center">
          {/* Left Block */}
          <div className="flex gap-4 lg:col-span-4 min-w-0">
            <div className="h-16 w-20 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 p-2 text-white flex items-center justify-center font-bold text-xs uppercase leading-none tracking-wide shadow-sm">
              AI Finance
            </div>
            <div className="min-w-0">
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-semibold text-emerald-700 border border-emerald-100/50 uppercase tracking-wide">
                {event.status}
              </span>
              <h2 className="text-sm font-semibold text-slate-800 truncate mt-1">{event.title}</h2>
              <div className="mt-1 flex items-center gap-2 text-[10px] text-slate-400 font-medium">
                <span>{event.club}</span>
                <span>•</span>
                <span>{event.date}</span>
              </div>
            </div>
          </div>

          {/* Center Metrics Block */}
          <div className="grid grid-cols-3 gap-2 border-slate-100 lg:col-span-4 lg:border-x lg:px-4">
            <div className="text-center">
              <p className="text-sm font-semibold text-slate-800">{event.participants}</p>
              <p className="text-[9px] text-slate-400 font-medium mt-0.5">Expected Participants</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-slate-800">{event.categoriesNeeded}</p>
              <p className="text-[9px] text-slate-400 font-medium mt-0.5">Categories Needed</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-slate-800">{event.readiness}</p>
              <p className="text-[9px] text-slate-400 font-medium mt-0.5">Collaboration Readiness</p>
            </div>
          </div>

          {/* Right Tags Block */}
          <div className="space-y-2 lg:col-span-4 lg:pl-4">
            <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
              <span className="text-slate-400 font-medium shrink-0">Looking For:</span>
              {event.lookingFor.map(need => (
                <span key={need} className="rounded bg-blue-50 px-1.5 py-0.5 font-medium text-blue-600">
                  {need}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
              <span className="text-slate-400 font-medium shrink-0">Target Skills:</span>
              {event.targetSkills.slice(0, 4).map(skill => (
                <span key={skill} className="rounded bg-slate-50 px-1.5 py-0.5 font-medium text-slate-500">
                  {skill}
                </span>
              ))}
              {event.targetSkills.length > 4 && (
                <span className="text-[9px] text-slate-400 font-medium">+{event.targetSkills.length - 4} more</span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. AI SUGGESTED COLLABORATORS */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="text-sm font-semibold text-slate-900">AI Suggested Collaborators</h3>
            <p className="text-[11px] text-slate-450 font-medium">AI analyzed your event and found the best-fit organizations.</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-blue-600 transition"
              onClick={() => onToast('How match scores are calculated: Analyzes historical engagement, skill tags, and campus program interest.')}
            >
              ℹ️ How match works
            </button>
            <button
              type="button"
              onClick={() => onToast('Refreshed suggestions with latest matching signals.')}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-semibold text-slate-600 hover:bg-slate-50 transition"
            >
              Refresh Matches
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Snap or Grid Layout */}
        <div
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={showMoreMatches
            ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            : `flex gap-4 overflow-x-auto pb-4 scrollbar-thin -mx-6 px-6 lg:mx-0 lg:px-0 select-none ${
                isMouseDown ? 'cursor-grabbing' : 'cursor-grab'
              }`
          }
        >
          {suggestedCollaborators.map(col => {
            const isSelected = selectedCollaborators[col.id]
            return (
              <div
                key={col.id}
                onClick={() => handleCardClick(col.id)}
                className={`group cursor-pointer rounded-2xl border bg-white p-5 transition space-y-4 relative ${
                  showMoreMatches ? "" : "w-[290px] shrink-0 snap-start"
                } ${
                  isSelected
                    ? 'border-blue-500 shadow-sm ring-1 ring-blue-50'
                    : 'border-slate-200/80 hover:border-slate-300'
                }`}
              >
                {/* Select Indicator */}
                <div className="absolute right-4 top-4 flex h-4.5 w-4.5 items-center justify-center rounded border border-slate-350 transition bg-white group-hover:border-blue-500">
                  {isSelected && (
                    <span className="h-2 w-2 rounded bg-blue-500" />
                  )}
                </div>

                <div className="flex items-center gap-3 min-w-0 pr-6">
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${col.logoColor} text-xs font-semibold text-white`}>
                    {col.logo}
                  </span>
                  <div className="min-w-0">
                    <h4 className="truncate text-xs font-semibold text-slate-800">{col.name}</h4>
                    <span className="inline-block mt-0.5 rounded-full bg-blue-50/50 px-2 py-0.5 text-[9px] font-semibold text-blue-600 border border-blue-100/30">
                      {col.matchScore}% Match
                    </span>
                  </div>
                </div>

                <p className="text-[10px] text-slate-500 font-medium leading-relaxed">{col.desc}</p>

                <div className="space-y-1">
                  <span className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider block">Suggested Contribution:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {col.contributions.map(c => (
                      <span key={c} className="rounded bg-violet-50/50 px-1.5 py-0.5 text-[9px] font-medium text-violet-600 border border-violet-100/30">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-3 space-y-1.5">
                  <span className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider block">Why IT fits:</span>
                  <ul className="space-y-1 text-[10px] text-slate-500 font-medium">
                    {col.whyFits.map((fit, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <span className="text-emerald-500 font-bold">✓</span>
                        <span className="truncate">{fit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between border-t border-slate-50 pt-3">
                  <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[9px] font-medium ${col.impactColor}`}>
                    {col.impact}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={() => setShowMoreMatches(!showMoreMatches)}
            className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 transition"
          >
            {showMoreMatches ? 'Collapse Recommendations' : '+ View all recommended organizations'}
          </button>
        </div>
      </section>

      {/* 4. OUTREACH STRATEGY (AI PLAN) */}
      <section className="space-y-4">
        <div className="space-y-0.5">
          <h3 className="text-sm font-semibold text-slate-900">Outreach Strategy (AI Plan)</h3>
          <p className="text-[11px] text-slate-450 font-medium">Here’s the recommended approach to maximize collaboration success.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {strategyCards.map(strat => (
            <div key={strat.title} className="rounded-2xl border border-slate-200/60 bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.01)] flex gap-4">
              <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-base ${strat.color}`}>
                {strat.icon}
              </span>
              <div className="min-w-0">
                <h4 className="text-xs font-semibold text-slate-800">{strat.title}</h4>
                <p className="text-[10px] font-semibold text-slate-500 mt-1.5 leading-normal">{strat.desc}</p>
                <p className="text-[9px] font-normal text-slate-400 mt-0.5 leading-normal">{strat.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. AI-DRAFTED COLLABORATION REQUESTS */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="text-sm font-semibold text-slate-900">AI-Drafted Collaboration Requests</h3>
            <p className="text-[11px] text-slate-450 font-medium">AI has crafted personalized messages for each selected organization.</p>
          </div>
          <button
            type="button"
            onClick={() => onToast('Regenerated message drafts with adjusted priorities.')}
            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-semibold text-slate-650 hover:bg-slate-50 transition"
          >
            Regenerate All
          </button>
        </div>

        {/* Selected Organizations Message Cards */}
        <div className="space-y-4">
          {suggestedCollaborators
            .filter(col => selectedCollaborators[col.id])
            .map(col => {
              const isExpanded = expandedDraft === col.id
              return (
                <div key={col.id} className="rounded-2xl border border-slate-200/60 bg-white shadow-sm overflow-hidden">
                  {/* Card Header (Clickable for toggle) */}
                  <header
                    onClick={() => setExpandedDraft(isExpanded ? null : col.id)}
                    className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between px-5 py-4 cursor-pointer hover:bg-slate-50/50 transition border-b border-slate-50"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${col.logoColor} text-xs font-semibold text-white`}>
                        {col.logo}
                      </span>
                      <div className="min-w-0 flex items-center gap-2">
                        <h4 className="text-xs font-semibold text-slate-800">{col.name}</h4>
                        <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[9px] font-semibold text-blue-600">
                          {col.matchScore}% Match
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-[10px]">
                      <div className="flex items-center gap-1">
                        <span className="text-slate-400 font-medium">Requested:</span>
                        <div className="flex flex-wrap gap-1">
                          {col.contributions.map(c => (
                            <span key={c} className="rounded bg-violet-50 px-1.5 py-0.5 text-[9px] font-medium text-violet-600 border border-violet-100/30">
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 font-medium text-slate-500">
                        <span>👥 120+ students</span>
                      </div>
                      <span className="text-slate-400 font-bold transition text-xs">
                        {isExpanded ? '▲' : '▼'}
                      </span>
                    </div>
                  </header>

                  {/* Card Body */}
                  {isExpanded && (
                    <div className="grid gap-6 p-5 lg:grid-cols-12 items-start bg-slate-50/10">
                      {/* Left: Message Editor */}
                      <div className="lg:col-span-8 space-y-3.5 min-w-0">
                        <label className="block space-y-1.5">
                          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">AI-Drafted Message (Editable)</span>
                          <textarea
                            value={draftMessages[col.id]}
                            onChange={(e) => handleMessageChange(col.id, e.target.value)}
                            rows={10}
                            className="w-full rounded-xl border border-slate-200 bg-white p-4 text-xs leading-relaxed text-slate-700 outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
                          />
                        </label>
                        <div className="flex items-center justify-between">
                          <button
                            type="button"
                            onClick={() => onToast(`Restored default template for ${col.name}.`)}
                            className="text-[10px] font-semibold text-slate-450 hover:text-slate-650 transition"
                          >
                            Reset to Default
                          </button>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => onToast(`Draft message saved for ${col.name}.`)}
                              className="rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-[10px] font-semibold text-slate-600 hover:bg-slate-50 transition"
                            >
                              Save Draft
                            </button>
                            <button
                              type="button"
                              onClick={() => onToast(`Regenerated draft for ${col.name}.`)}
                              className="rounded-lg border border-blue-200 bg-blue-50 px-3.5 py-2 text-[10px] font-semibold text-blue-700 hover:bg-blue-100/50 transition"
                            >
                              Regenerate
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Right: AI Insights / Tips */}
                      <aside className="lg:col-span-4 rounded-xl border border-slate-100 bg-slate-50/50 p-4 space-y-4">
                        <div className="space-y-2">
                          <h5 className="text-[10px] font-semibold text-slate-700 uppercase tracking-wider">Why this message?</h5>
                          <ul className="space-y-1.5 text-xs text-slate-600 font-medium">
                            <li className="flex items-start gap-2">
                              <span className="text-emerald-500 font-bold">✓</span>
                              <span>Highlights talent pipeline</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-emerald-500 font-bold">✓</span>
                              <span>Shows mutual value</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-emerald-500 font-bold">✓</span>
                              <span>Aligned with {col.name}'s CSR focus</span>
                            </li>
                          </ul>
                        </div>

                        <div className="border-t border-slate-100 pt-3 space-y-1.5">
                          <h5 className="text-[10px] font-semibold text-slate-700 uppercase tracking-wider">Tips to improve</h5>
                          <p className="text-[10px] leading-relaxed text-slate-400 font-medium">
                            Add specific workshop topic or mentorship hours to increase response rate from the {col.name} partnerships team.
                          </p>
                        </div>
                      </aside>
                    </div>
                  )}
                </div>
              )
            })}
        </div>
      </section>

      {/* 6. REVIEW & SEND */}
      <section className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.015)] space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">Review & Send</h3>
          <p className="text-[11px] text-slate-450 font-medium">Ready to send collaboration requests to {Object.values(selectedCollaborators).filter(Boolean).length} organizations.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-12 items-center">
          {/* Summary */}
          <div className="lg:col-span-3 space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 font-bold text-xs">📬</span>
              <div>
                <p className="text-xs font-semibold text-slate-800">{Object.values(selectedCollaborators).filter(Boolean).length} organizations</p>
                <p className="text-[9px] text-slate-450 font-medium">Requests to be sent</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 font-bold text-xs">👥</span>
              <div>
                <p className="text-xs font-semibold text-slate-800">120+ students</p>
                <p className="text-[9px] text-slate-450 font-medium">Total expected student impact</p>
              </div>
            </div>
          </div>

          {/* Timeline steps */}
          <div className="lg:col-span-6 grid grid-cols-4 gap-2 text-center text-[10px] border-slate-100 lg:border-x lg:px-6">
            {[
              { num: '1', title: 'Request Sent', sub: 'Organizations receive requests.' },
              { num: '2', title: 'Review & Respond', sub: 'Partners review & reply within 5-7 days.' },
              { num: '3', title: 'Discussion', sub: 'Chat and finalize details.' },
              { num: '4', title: 'Confirmed', sub: 'Collaboration begins!' }
            ].map(step => (
              <div key={step.num} className="space-y-1 min-w-0">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-[10px] font-semibold text-slate-650">
                  {step.num}
                </span>
                <p className="font-semibold text-slate-700 truncate">{step.title}</p>
                <p className="text-[8px] text-slate-400 leading-normal hidden sm:block">{step.sub}</p>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="lg:col-span-3 flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 justify-end items-center">
            <button
              type="button"
              onClick={onBack}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition text-center"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => onToast('Outreach draft saved successfully.')}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition text-center"
            >
              Save Draft
            </button>
            <button
              type="button"
              onClick={handleSendRequests}
              className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-4 py-2.5 text-xs font-semibold text-white shadow-[0_8px_16px_rgba(37,99,235,0.18)] hover:opacity-95 transition text-center whitespace-nowrap"
            >
              Send Collaboration Requests ({Object.values(selectedCollaborators).filter(Boolean).length})
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
