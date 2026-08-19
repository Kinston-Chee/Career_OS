import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { BriefcaseBusiness, Clock3, MapPin, RefreshCw, Sparkles } from 'lucide-react'
import HomeTopNav from '../components/home/HomeTopNav'
import CareerPathCompanionPanel from '../components/careerPath/CareerPathCompanionPanel'
import DynamicModulePlaceholder from '../components/careerPath/DynamicModulePlaceholder'
import RecommendedCareerPaths from '../components/careerPath/RecommendedCareerPaths'
import CareerPathNetworkGraph from '../components/career/network/CareerPathNetworkGraph'
import OpportunityDetailsPanel from '../components/opportunitiesHub/OpportunityDetailsPanel'
import { candidateOverview, careerPathNetwork, mockUser } from '../data/mockData'
import { DATA_SCIENCE_GAPS, DATA_SCIENCE_READINESS, DATA_SCIENCE_STRENGTHS } from '../data/candidateSkillProfile'
import { useCareerStore } from '../store/useCareerStore'

const COMPANION_MESSAGE =
  "This is your career path. I've mapped out possible directions based on your Career Memory.\n\nTap any role to explore it - I'll tell you how well you fit and what it takes to get there."

const ROLE_MESSAGES = {
  'data-scientist':
    `Data Scientist is a potential direction with ${DATA_SCIENCE_READINESS}% skill readiness based on the same profile shown in Skills Development. Your strongest evidence is in ${DATA_SCIENCE_STRENGTHS.join(', ')}.\n\nWhat do you want to explore?`,
  'software-engineer':
    "Software Engineer - solid choice. Based on your Career Memory, you're a 78% fit here.\n\nWhat do you want to explore?",
  'data-analyst':
    "Data Analyst - actually your highest fit role. Based on your NLP and data pipeline work at Grab, you're an 84% match here.\n\nWhat do you want to explore?",
  'product-manager':
    "Product Manager - interesting choice. Your leadership signals are strong, but this role needs more business strategy experience. You're a 61% fit right now.\n\nWhat do you want to explore?",
}

const EXPLORE_CHIPS = ['How well do I fit?', 'What skills do I need?', 'Show active job postings', 'Show me the roadmap', 'Market demand']

const CHIP_FLOW = {
  'How well do I fit?': {
    module: 'fit',
    reply:
      'Your fit score is 78%. Your strongest signals are Python, Leadership, and NLP - all in demand for SWE roles. Your main gap is System Design experience.',
    chips: ['How do I close the gap?', 'Show me the roadmap'],
  },
  'What skills do I need?': {
    module: 'skills',
    reply:
      "For Software Engineer roles, the market prioritises these skills right now. You already have 4 of 7 - here's what to build.",
    chips: ['Where do I learn these?', 'Show me the roadmap'],
  },
  'Show me the roadmap': {
    module: 'roadmap',
    reply: "Here's a potential preparation plan for this role. It starts from your current skill evidence and suggests what to develop next; it does not mean you are already progressing through these steps.",
    chips: ['How well do I fit?', 'Market demand'],
  },
  'Market demand': {
    module: 'demand',
    reply:
      'Software Engineer is one of the highest demand roles in Malaysia right now. NLP and AI skills are giving candidates like you a significant edge.',
    chips: ['How well do I fit?', 'Show me the roadmap'],
  },
  'Show active job postings': {
    module: 'jobs',
    reply: 'I found active job postings related to this role. I ranked them by your fit, skill overlap, and closing date so you can apply directly from here.',
    chips: ['How well do I fit?', 'What skills do I need?', 'Show me the roadmap'],
  },
  'How do I close the gap?': {
    reply:
      "Focus on System Design first - it's the most common SWE interview topic and your biggest gap. I'd recommend starting with the Grokking System Design course.",
    chips: ['Show me learning resources', 'Show me the roadmap'],
  },
}

function getChipFlow(chip, roleId, roleName) {
  if (roleId !== 'data-scientist') {
    const flow = CHIP_FLOW[chip]
    if (!flow) return null
    return {
      ...flow,
      reply: flow.reply.replaceAll('Software Engineer', roleName).replaceAll('SWE', roleName),
    }
  }

  const dataScienceFlow = {
    'How well do I fit?': {
      module: 'fit',
      reply: `Your Data Science skill readiness is ${DATA_SCIENCE_READINESS}%. ${DATA_SCIENCE_STRENGTHS.join(', ')} are demonstrated strengths. ${DATA_SCIENCE_GAPS.join(', ')} are the clearest areas to develop next.`,
      chips: ['How do I close the gap?', 'Show me the roadmap'],
    },
    'What skills do I need?': {
      module: 'skills',
      reply: `Career Intelligence is using the same six skills as Skills Development: Python, SQL, Statistics, Data Analysis, Machine Learning, and Data Visualization. Your recommendations come directly from the weaker skills in that profile.`,
      chips: ['Where do I learn these?', 'Show me the roadmap'],
    },
    'Show me the roadmap': {
      module: 'roadmap',
      reply: `This is a potential preparation plan, not an active journey. It begins with your current Data Science profile and prioritises ${DATA_SCIENCE_GAPS.join(', ')} next.`,
      chips: ['How well do I fit?', 'Market demand'],
    },
    'How do I close the gap?': {
      reply: `Start with SQL and Statistics, then strengthen Machine Learning through a model comparison project. Evidence logged in Skills Development will raise the corresponding readiness assessment here.`,
      chips: ['Where do I learn these?', 'Show me the roadmap'],
    },
    'Where do I learn these?': {
      module: 'roadmap',
      reply: 'I have mapped learning suggestions to SQL, Statistics, and Machine Learning, the three current development priorities in your shared skill profile.',
      chips: ['What skills do I need?', 'Show me the roadmap'],
    },
  }

  return dataScienceFlow[chip] ?? CHIP_FLOW[chip] ?? null
}

function inferRoleId(opportunity) {
  const title = opportunity?.title?.toLowerCase() ?? ''
  if (title.includes('data') || title.includes('analyst') || title.includes('machine learning')) return 'data-analyst'
  if (title.includes('product')) return 'product-manager'
  return 'software-engineer'
}

function buildRoleJobs(roleId, roleName) {
  const templates = [
    { company: 'Grab', logo: 'GR', location: 'Kuala Lumpur', suffix: 'Intern', match: 94, deadline: 'Closes in 4 days', skills: ['Problem Solving', 'Communication'] },
    { company: 'Shopee', logo: 'S', location: 'Hybrid', suffix: 'Associate', match: 89, deadline: 'Closes in 8 days', skills: ['Collaboration', 'Analytics'] },
    { company: 'Maybank', logo: 'MY', location: 'Kuala Lumpur', suffix: 'Graduate Programme', match: 85, deadline: 'Closes in 12 days', skills: ['Stakeholder Management', 'Business Insight'] },
  ]

  const roleSkills = {
    'software-engineer': ['Python', 'JavaScript', 'Git'],
    'data-analyst': ['SQL', 'Excel', 'Power BI'],
    'product-manager': ['Product Thinking', 'User Research', 'A/B Testing'],
  }[roleId] ?? ['Communication', 'Problem Solving', 'Digital Skills']

  return templates.map((template, index) => ({
    id: `career-job-${roleId}-${index + 1}`,
    logo: template.logo,
    logoTone: index === 0 ? 'emerald' : 'indigo',
    title: `${roleName} ${template.suffix}`,
    org: template.company,
    company: template.company,
    location: template.location,
    matchPercent: template.match,
    category: 'job',
    about: `${template.company} is hiring an early-career ${roleName.toLowerCase()} to work with experienced teams on practical, high-impact projects.`,
    dateRange: 'Applications open now',
    teamSize: index === 0 ? 'Internship' : 'Full-time',
    matchSkills: [...roleSkills, ...template.skills].slice(0, 5),
    requirements: [`Interest in ${roleName}`, ...roleSkills.slice(0, 2), 'Strong learning mindset'],
    deadlineLabel: template.deadline,
  }))
}

function ActiveJobPostings({ roleId, roleName, jobs, onApply }) {
  return (
    <section className="rounded-2xl border border-[#dfe8fb] bg-white p-5 shadow-[0_10px_28px_rgba(38,72,140,0.08)]">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700"><Sparkles size={13} /> Companion picks</span>
          <h2 className="mt-3 text-xl font-bold text-[#11194a]">Active {roleName} jobs</h2>
          <p className="mt-1 text-sm font-medium text-[#637094]">Live postings connected to the role selected in your career path.</p>
        </div>
        <span className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">{jobs.length} accepting applications</span>
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-3">
        {jobs.map((job) => (
          <article key={job.id} className="flex min-h-[240px] flex-col rounded-2xl border border-[#e2eaf8] bg-[#fbfcff] p-4 transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[0_14px_30px_rgba(37,99,235,0.10)]">
            <div className="flex items-start justify-between gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-xs font-bold text-white">{job.logo}</span>
              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">{job.matchPercent}% Match</span>
            </div>
            <h3 className="mt-4 text-base font-bold text-[#11194a]">{job.title}</h3>
            <p className="mt-1 text-sm font-semibold text-[#52627f]">{job.org}</p>
            <div className="mt-3 space-y-1.5 text-xs font-medium text-[#7382a1]">
              <p className="flex items-center gap-1.5"><MapPin size={13} /> {job.location}</p>
              <p className="flex items-center gap-1.5"><Clock3 size={13} /> {job.deadlineLabel}</p>
              <p className="flex items-center gap-1.5"><BriefcaseBusiness size={13} /> {job.teamSize}</p>
            </div>
            <button type="button" onClick={() => onApply(job)} className="mt-auto h-10 rounded-xl bg-blue-600 text-sm font-bold text-white transition hover:bg-blue-700">Apply Now</button>
          </article>
        ))}
      </div>
    </section>
  )
}

export default function CareerIntelligencePage() {
  const location = useLocation()
  const incomingOpportunity = location.state?.applyOpportunity ?? null
  const incomingRoleId = incomingOpportunity ? inferRoleId(incomingOpportunity) : null
  const readiness = candidateOverview.careerSnapshot.readiness
  const [selectedPathId, setSelectedPathId] = useState(incomingRoleId)
  const [chatMessages, setChatMessages] = useState(incomingOpportunity
    ? [
        { id: 'intro', role: 'robot', text: COMPANION_MESSAGE },
        { id: 'incoming-application', role: 'robot', text: `I linked ${incomingOpportunity.title} to your career path and opened the application for you. You can also compare it with other active roles below.` },
      ]
    : [{ id: 'intro', role: 'robot', text: COMPANION_MESSAGE }])
  const [isTyping, setIsTyping] = useState(false)
  const [chips, setChips] = useState(incomingOpportunity ? EXPLORE_CHIPS : null)
  const [activeModule, setActiveModule] = useState(incomingOpportunity ? 'jobs' : null)
  const [activeOpportunity, setActiveOpportunity] = useState(incomingOpportunity)
  // Focus the graph on a node picked outside the canvas (recommended paths).
  const [focusRequest, setFocusRequest] = useState(null)
  const addApplication = useCareerStore((state) => state.addApplication)
  const addOpportunityTrackerEntry = useCareerStore((state) => state.addOpportunityTrackerEntry)
  const selectedRole = careerPathNetwork.roles.find((role) => role.id === selectedPathId)
  const selectedRoleName = selectedRole?.label ?? 'Career'
  const activeJobs = selectedPathId ? buildRoleJobs(selectedPathId, selectedRoleName) : []

  const addRobotReply = (text, nextChips, delay = 1000) => {
    setIsTyping(true)
    window.setTimeout(() => {
      setChatMessages((prev) => [...prev, { id: `robot-${Date.now()}`, role: 'robot', text }])
      setChips(nextChips)
      setIsTyping(false)
    }, delay)
  }

  const handleRoleSelect = (id) => {
    if (selectedPathId === id) {
      setSelectedPathId(null)
      setChips(null)
      setActiveModule(null)
      return
    }

    setSelectedPathId(id)
    setChips(null)
    setActiveModule(null)
    addRobotReply(
      ROLE_MESSAGES[id] ?? 'This role is part of your wider career map. Pick Software Engineer, Data Analyst, or Product Manager to explore the full demo flow.',
      EXPLORE_CHIPS,
    )
  }

  // Recommended-path card → select the role (which opens its AI Career Advisor
  // Report) and focus the matching node on the graph.
  const handleRecommendedSelect = (roleId) => {
    if (selectedPathId !== roleId) handleRoleSelect(roleId)
    setFocusRequest((prev) => ({ id: roleId, nonce: (prev?.nonce ?? 0) + 1 }))
  }

  const handleChipClick = (chip) => {
    const flow = getChipFlow(chip, selectedPathId, selectedRoleName)
    setChips(null)
    setChatMessages((prev) => [...prev, { id: `user-${Date.now()}`, role: 'user', text: chip }])

    if (!flow) {
      addRobotReply('Demo resources are coming next. For now, use the roadmap and fit score to continue the flow.', ['Show me the roadmap'], 800)
      return
    }

    if (flow.module) setActiveModule(null)
    setIsTyping(true)
    window.setTimeout(() => {
      setChatMessages((prev) => [...prev, { id: `robot-${Date.now()}`, role: 'robot', text: flow.reply }])
      if (flow.module) setActiveModule(flow.module)
      setChips(flow.chips)
      setIsTyping(false)
    }, 1200)
  }

  const resetPath = () => {
    setSelectedPathId(null)
    setActiveModule(null)
    setChips(null)
  }

  const handleApplied = (opportunity) => {
    addApplication({ ...opportunity, company: opportunity.org })
    addOpportunityTrackerEntry({
      logo: opportunity.logo,
      logoTone: opportunity.logoTone,
      company: opportunity.org,
      role: opportunity.title,
      dateLabel: 'Applied just now',
      status: 'Applied',
      statusTone: 'emerald',
    })
  }

  return (
    <div className="min-h-screen bg-[#f6f9ff] text-[#121a3a]">
      <HomeTopNav user={mockUser} readiness={readiness} />

      <div className="mx-auto max-w-[1480px] px-4 py-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
          {/* Grid placeholder — reserves the 320px column so the rest of the
              layout stays put. The actual chat panel is position: fixed inside
              so it never scrolls with the page. */}
          <div className="min-w-0">
            <div className="lg:fixed lg:top-20 lg:z-10 lg:h-[calc(100vh-6rem)] lg:w-[320px] lg:left-[max(2rem,calc((100vw-1480px)/2+2rem))]">
              <CareerPathCompanionPanel
                message={COMPANION_MESSAGE}
                messages={chatMessages}
                chips={chips}
                isTyping={isTyping}
                onChipClick={handleChipClick}
              />
            </div>
          </div>

          <div className="min-w-0 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold tracking-[-0.01em] text-[#11194a] sm:text-3xl">Career Path</h1>
                <p className="mt-1 text-sm font-medium text-[#637094]">Your AI-mapped directions based on who you are.</p>
              </div>
              <button
                type="button"
                onClick={resetPath}
                className="flex flex-shrink-0 items-center gap-1.5 rounded-full border border-[#dfe8f7] bg-white px-4 py-2.5 text-sm font-bold text-[#35507d] shadow-sm transition hover:border-blue-300 hover:bg-blue-50"
              >
                <RefreshCw size={15} strokeWidth={2.2} /> Regenerate path
              </button>
            </div>

            <CareerPathNetworkGraph
              network={careerPathNetwork}
              selectedPathId={selectedPathId}
              onSelectPath={handleRoleSelect}
              onDeselect={resetPath}
              focusRequest={focusRequest}
            />

            {/* Nothing selected → recommend paths. Otherwise show the module
                for the selected role (jobs list, or the advisor report). */}
            {!selectedPathId ? (
              <RecommendedCareerPaths onSelect={handleRecommendedSelect} />
            ) : activeModule === 'jobs' ? (
              <ActiveJobPostings
                roleId={selectedPathId}
                roleName={selectedRoleName}
                jobs={activeJobs}
                onApply={setActiveOpportunity}
              />
            ) : (
              <DynamicModulePlaceholder
                activeModule={activeModule}
                selectedRoleId={selectedPathId}
              />
            )}
          </div>
        </div>
      </div>

      <OpportunityDetailsPanel
        opportunity={activeOpportunity}
        initialView="applying"
        onClose={() => setActiveOpportunity(null)}
        onApplied={handleApplied}
      />
    </div>
  )
}
