import React, { useMemo, useState } from 'react'
import ClubRequestCard from '../components/employer/engagement/ClubRequestCard'
import CTASection from '../components/employer/engagement/CTASection'
import EngagementFilterChips from '../components/employer/engagement/EngagementFilterChips'
import ExpressInterestPanel from '../components/employer/engagement/ExpressInterestPanel'
import InternalTabNav from '../components/employer/engagement/InternalTabNav'
import { employerEngagement, employerEngagementBuilder, employerTalentWorkspace } from '../data/mockData'
import { useEmployerSearchStore } from '../store/useEmployerSearchStore'

const tabs = [
  { id: 'create-engagement', label: 'Create Engagement' },
  { id: 'club-collaboration', label: 'Club Collaboration' },
]

const creationSteps = [
  { id: 1, title: 'Choose Type', helper: 'Define engagement type' },
  { id: 2, title: 'Program Details', helper: 'Set goals and objectives' },
  { id: 3, title: 'Audience & Skills', helper: 'Target the right talent' },
  { id: 4, title: 'Timeline & Resources', helper: 'Plan and deliver' },
  { id: 5, title: 'Review & Launch', helper: 'Preview and publish' },
]

const engagementTypeOptions = [
  {
    title: 'Micro-Project',
    icon: 'doc',
    description: 'Short-term, real-world project with tangible deliverables.',
    bullets: ['2 - 4 weeks', 'Portfolio-ready work', 'High talent engagement'],
  },
  {
    title: 'Workshop',
    icon: 'board',
    description: 'Skill-building session or hands-on training.',
    bullets: ['Half-day to 2 days', 'Build practical skills', 'Brand visibility'],
  },
  {
    title: 'Case Competition',
    icon: 'trophy',
    description: 'Challenge students to solve real business problems.',
    bullets: ['1 - 4 weeks', 'Team-based', 'Innovative solutions'],
  },
  {
    title: 'Mentorship Pod',
    icon: 'users',
    description: 'Longer-term mentorship and guidance program.',
    bullets: ['4 - 12 weeks', '1:1 or group mentoring', 'Career development'],
  },
  {
    title: 'Hackathon Sprint',
    icon: 'bolt',
    description: 'Intensive build sprint to create impactful solutions.',
    bullets: ['24 - 72 hours', 'Fast-paced innovation', 'High energy and reach'],
  },
]

const stepIntelligence = {
  1: {
    score: 82,
    label: 'Strong',
    explanation: 'This engagement is likely to attract high-quality student talent.',
    scores: [
      ['Student Attractiveness', 85],
      ['Portfolio Value', 78],
      ['Industry Relevance', 88],
      ['Employer Branding', 80],
      ['Completion Likelihood', 77],
    ],
    outcomes: [
      ['~120', 'Applications'],
      ['~35', 'Shortlisted'],
      ['~18', 'High-Fit Profiles'],
      ['~62%', 'Completion Rate'],
    ],
  },
  2: {
    score: 76,
    label: 'Good',
    explanation: 'Great start. Complete the remaining details to improve your score.',
    scores: [
      ['Student Attractiveness', 74],
      ['Portfolio Value', 72],
      ['Industry Relevance', 83],
      ['Employer Branding', 74],
      ['Completion Likelihood', 64],
    ],
    outcomes: [
      ['~110', 'Applications'],
      ['~28', 'Shortlisted'],
      ['~14', 'High-Fit Profiles'],
      ['~58%', 'Completion Rate'],
    ],
  },
  3: {
    score: 82,
    label: 'Strong',
    explanation: 'Great audience and skills alignment.',
    scores: [
      ['Student Attractiveness', 76],
      ['Portfolio Value', 79],
      ['Industry Relevance', 84],
      ['Employer Branding', 81],
      ['Completion Likelihood', 74],
    ],
    outcomes: [
      ['~120', 'Applications'],
      ['~32', 'Shortlisted'],
      ['~16', 'High-Fit Profiles'],
      ['~60%', 'Completion Rate'],
    ],
  },
  4: {
    score: 86,
    label: 'Very Strong',
    explanation: 'Excellent planning. You are ready for launch review.',
    scores: [
      ['Student Attractiveness', 84],
      ['Portfolio Value', 84],
      ['Industry Relevance', 86],
      ['Employer Branding', 83],
      ['Completion Likelihood', 82],
    ],
    outcomes: [
      ['~132', 'Applications'],
      ['~38', 'Shortlisted'],
      ['~19', 'High-Fit Profiles'],
      ['~63%', 'Completion Rate'],
    ],
  },
  5: {
    score: 88,
    label: 'Excellent',
    explanation: 'This engagement is highly likely to attract top student talent.',
    scores: [
      ['Student Attractiveness', 90],
      ['Portfolio Value', 86],
      ['Industry Relevance', 90],
      ['Employer Branding', 82],
      ['Completion Likelihood', 84],
    ],
    outcomes: [
      ['~140', 'Applications'],
      ['~42', 'Shortlisted'],
      ['~21', 'High-Fit Profiles'],
      ['~64%', 'Completion Rate'],
    ],
  },
}

const writingSuggestions = [
  'Add specific tools to increase clarity, such as Power BI, SQL, and Excel.',
  'Highlight real-world impact to attract high-quality students.',
  'Mention deliverables so students understand expectations.',
]

const audienceRecommendations = [
  'Students in 2nd - 4th year',
  'Strong interest in analytics',
  'Basic Excel or SQL knowledge',
  'Active in data or tech clubs',
]

const resourceRecommendations = [
  '1 mentor per 20 students',
  '1 judge per 30 students',
  'Budget range is in the optimal tier',
]

function mergeUnique(current, additions) {
  return Array.from(new Set([...(current ?? []), ...additions]))
}

const launchChecklist = [
  'Engagement type selected',
  'Program details added',
  'Target audience defined',
  'Skills and roles selected',
  'Timeline configured',
  'Resources and deliverables added',
  'Budget range set',
  'All required fields completed',
]

function EngagementIcon({ name, tone = 'blue' }) {
  const toneClasses = {
    blue: 'bg-blue-50 text-blue-700 ring-blue-100',
    violet: 'bg-violet-50 text-violet-700 ring-violet-100',
    green: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
    amber: 'bg-amber-50 text-amber-700 ring-amber-100',
    pink: 'bg-pink-50 text-pink-700 ring-pink-100',
    slate: 'bg-slate-50 text-slate-600 ring-slate-100',
  }
  const paths = {
    doc: <><path d="M8 4h6l4 4v12H8z" /><path d="M14 4v4h4" /><path d="M11 13h4" /><path d="M11 16h3" /></>,
    board: <><path d="M6 5h12v10H6z" /><path d="M9 19h6" /><path d="M12 15v4" /><path d="M9 9h6" /><path d="M9 12h4" /></>,
    trophy: <><path d="M8 5h8v4a4 4 0 0 1-8 0z" /><path d="M8 7H5a3 3 0 0 0 3 3" /><path d="M16 7h3a3 3 0 0 1-3 3" /><path d="M12 13v4" /><path d="M9 19h6" /></>,
    users: <><circle cx="9" cy="9" r="3" /><circle cx="16" cy="10" r="2.5" /><path d="M4 18a5 5 0 0 1 10 0" /><path d="M13 17a4 4 0 0 1 7 0" /></>,
    bolt: <path d="m13 3-7 11h6l-1 7 7-11h-6z" />,
    ai: <><path d="M12 4v3" /><path d="M12 17v3" /><path d="M4 12h3" /><path d="M17 12h3" /><circle cx="12" cy="12" r="4" /></>,
    trend: <><path d="M4 16 9 11l4 4 7-8" /><path d="M15 7h5v5" /></>,
    star: <path d="m12 4 2.4 4.8 5.3.8-3.8 3.7.9 5.2-4.8-2.5-4.8 2.5.9-5.2-3.8-3.7 5.3-.8z" />,
    check: <path d="m5 12 4 4 10-10" />,
    calendar: <><path d="M7 4v3" /><path d="M17 4v3" /><path d="M5 8h14" /><path d="M6 6h12a1 1 0 0 1 1 1v13H5V7a1 1 0 0 1 1-1z" /></>,
    lock: <><path d="M8 11V8a4 4 0 0 1 8 0v3" /><path d="M6 11h12v9H6z" /></>,
  }

  return (
    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] ring-1 ${toneClasses[tone]}`}>
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {paths[name]}
      </svg>
    </span>
  )
}

function ProgressTracker({ currentStep, setCurrentStep }) {
  return (
    <div className="overflow-hidden rounded-[8px] border border-slate-200 bg-white px-4 py-4">
      <div className="grid gap-4 md:grid-cols-5">
        {creationSteps.map((step, index) => (
          <button
            key={step.id}
            type="button"
            onClick={() => setCurrentStep(step.id)}
            className="relative flex items-center gap-3 text-left w-full hover:bg-slate-50/50 p-1.5 rounded-lg transition focus:outline-none"
          >
            {index < creationSteps.length - 1 && <span className={`absolute left-8 top-1/2 -translate-y-1/2 z-0 hidden h-px w-[calc(100%+1rem)] md:block ${step.id < currentStep ? 'bg-blue-300' : 'bg-slate-200'}`} />}
            <span className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
              step.id === currentStep ? 'bg-blue-600 text-white shadow-sm shadow-blue-200' : step.id < currentStep ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-100' : 'bg-slate-100 text-slate-600'
            }`}>
              {step.id}
            </span>
            <div className="min-w-0">
              <p className={`text-sm font-semibold leading-none pb-1.5 ${step.id === currentStep ? 'text-slate-950' : 'text-slate-600'}`}>{step.title}</p>
              <p className="pt-1.5 text-xs leading-none text-slate-500">{step.helper}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

function EngagementTypeSelectionCard({ option, selected, onClick }) {
  const tones = {
    'Micro-Project': 'blue',
    Workshop: 'violet',
    'Case Competition': 'green',
    'Mentorship Pod': 'amber',
    'Hackathon Sprint': 'pink',
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-full min-h-[220px] flex-col rounded-[8px] border bg-white p-4 text-left transition-all duration-200 ${
        selected ? 'border-blue-500 shadow-[0_0_0_1px_rgba(37,99,235,0.18)]' : 'border-slate-200 hover:border-blue-200 hover:bg-slate-50/50'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <EngagementIcon name={option.icon} tone={tones[option.title]} />
        <span className={`flex h-5 w-5 items-center justify-center rounded-full border ${selected ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300 bg-white'}`}>
          {selected ? (
            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m5 12 4 4 10-10" />
            </svg>
          ) : null}
        </span>
      </div>
      <h3 className="mt-4 text-base font-semibold text-slate-950">{option.title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{option.description}</p>
      <ul className="mt-4 space-y-2 text-sm leading-5 text-slate-600">
        {option.bullets.map((bullet) => (
          <li key={bullet} className="flex gap-2">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-400" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </button>
  )
}

function AIRecommendationBanner({ onClick }) {
  return (
    <section className="flex flex-col gap-4 rounded-[8px] border border-blue-100 bg-blue-50/55 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-center gap-4">
        <EngagementIcon name="ai" tone="blue" />
        <div>
          <h3 className="text-sm font-semibold text-blue-900">Not sure which to choose?</h3>
          <p className="mt-1 text-sm leading-6 text-blue-800">Answer a few quick questions and CareerOS AI will recommend the best engagement type for your goals.</p>
        </div>
      </div>
      <button onClick={onClick} className="h-10 shrink-0 rounded-[8px] border border-blue-200 bg-white px-4 text-sm font-semibold text-blue-700 hover:bg-blue-50 focus:outline-none" type="button">
        Get AI Recommendation
      </button>
    </section>
  )
}

function AIStrategistCard({ onRefine }) {
  const recommendations = [
    {
      icon: 'trend',
      tone: 'green',
      insight: 'Micro-Projects in Data Analytics have 62% higher completion rates.',
      detail: 'Students value real datasets and portfolio-ready outcomes.',
    },
    {
      icon: 'users',
      tone: 'violet',
      insight: 'Add Power BI or SQL to attract more qualified applicants.',
      detail: 'These skills are in high demand this month.',
    },
    {
      icon: 'star',
      tone: 'amber',
      insight: 'Include a final presentation to increase brand visibility.',
      detail: 'Employers with presentations get 40% more engagement.',
    },
  ]

  return (
    <section className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="text-base font-semibold text-slate-950">AI Engagement Strategist</h3>
        <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-100">Powered by CareerOS AI</span>
      </div>
      <div className="mt-4 space-y-3">
        {recommendations.map((item) => (
          <div key={item.insight} className="flex gap-3 rounded-[8px] border border-slate-100 bg-slate-50/55 p-4">
            <EngagementIcon name={item.icon} tone={item.tone} />
            <div>
              <p className="text-sm font-semibold text-slate-950">{item.insight}</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">{item.detail}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-end">
        <button onClick={onRefine} className="h-10 rounded-[8px] border border-blue-200 bg-white px-4 text-sm font-semibold text-blue-700 hover:bg-blue-50 focus:outline-none" type="button">
          Refine with AI
        </button>
      </div>
    </section>
  )
}

function FieldDisplay({ label, value, required = false, multiline = false, count, onChange, type = 'text' }) {
  const inputClass = `mt-2 block w-full rounded-[8px] border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-700 outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-100 ${multiline ? 'min-h-[104px]' : 'min-h-[48px]'}`

  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-800">
        {label}
        {required ? <span className="text-red-500"> *</span> : null}
      </span>
      {onChange ? (
        multiline ? (
          <textarea
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className={inputClass}
          />
        ) : (
          <input
            type={type}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className={inputClass}
          />
        )
      ) : (
        <span className={`mt-2 block rounded-[8px] border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-700 ${multiline ? 'min-h-[104px]' : 'min-h-[48px]'}`}>
          {value}
        </span>
      )}
      {count ? <span className="mt-1 block text-right text-xs text-slate-400">{count}</span> : null}
    </label>
  )
}

function SelectDisplay({ label, value, required = false, options = [], onChange }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-800">
        {label}
        {required ? <span className="text-red-500"> *</span> : null}
      </span>
      {onChange ? (
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="mt-2 min-h-[48px] w-full rounded-[8px] border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
        >
          {options.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      ) : (
        <span className="mt-2 flex min-h-[48px] items-center justify-between rounded-[8px] border border-slate-200 bg-white px-4 text-sm text-slate-700">
          {value}
          <span className="text-slate-400">v</span>
        </span>
      )}
    </label>
  )
}

function Chip({ children, removable = true, onRemove }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 ring-1 ring-blue-100">
      {children}
      {removable ? (
        <button
          type="button"
          onClick={onRemove}
          className="text-blue-500 hover:text-blue-700 font-bold ml-1 focus:outline-none"
        >
          ✕
        </button>
      ) : null}
    </span>
  )
}

function ChipGroup({ label, items, addLabel, onAdd, onRemove }) {
  const [adding, setAdding] = useState(false)
  const [draft, setDraft] = useState('')

  const submitDraft = () => {
    const next = draft.trim()
    if (!next) return
    onAdd?.(next)
    setDraft('')
    setAdding(false)
  }

  return (
    <section>
      <h4 className="text-sm font-semibold text-slate-800">{label}</h4>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => <Chip key={item} onRemove={onRemove ? () => onRemove(item) : undefined}>{item}</Chip>)}
        {addLabel && !adding ? (
          <button onClick={() => setAdding(true)} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300" type="button">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-50 text-blue-600">+</span>
            {addLabel}
          </button>
        ) : null}
        {addLabel && adding ? (
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-2 py-1 shadow-sm">
            <input
              autoFocus
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') submitDraft()
                if (event.key === 'Escape') {
                  setDraft('')
                  setAdding(false)
                }
              }}
              placeholder={addLabel}
              className="w-36 bg-transparent px-1 text-sm text-slate-700 outline-none placeholder:text-slate-400"
            />
            <button type="button" onClick={submitDraft} className="rounded-full bg-blue-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-blue-700">
              Add
            </button>
            <button type="button" onClick={() => { setDraft(''); setAdding(false) }} className="rounded-full px-2 py-1 text-xs font-semibold text-slate-400 hover:bg-slate-50 hover:text-slate-600">
              Cancel
            </button>
          </span>
        ) : null}
      </div>
    </section>
  )
}

function AssistantPanel({ title, subtitle, items, ctaLabel = 'Apply Suggestions', onClick }) {
  return (
    <aside className="rounded-[8px] border border-blue-100 bg-blue-50/45 p-5">
      <div className="flex items-start gap-3">
        <EngagementIcon name="ai" tone="violet" />
        <div>
          <h3 className="text-sm font-semibold text-slate-950">{title}</h3>
          <p className="mt-1 text-sm leading-6 text-slate-600">{subtitle}</p>
        </div>
      </div>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <p key={item} className="flex gap-2 text-sm leading-6 text-slate-700">
            <span className="mt-1 text-blue-600">✓</span>
            <span>{item}</span>
          </p>
        ))}
      </div>
      <button onClick={onClick} className="mt-5 h-10 w-full rounded-[8px] border border-blue-200 bg-white px-4 text-sm font-semibold text-blue-700 hover:bg-blue-50 focus:outline-none" type="button">
        {ctaLabel}
      </button>
    </aside>
  )
}

function StepShell({ title, subtitle, children }) {
  return (
    <section className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
      <div>
        <h3 className="text-lg font-semibold text-slate-950">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-slate-500">{subtitle}</p>
      </div>
      <div className="mt-6">{children}</div>
    </section>
  )
}

function ChooseTypeStep({ selectedType, setSelectedType, onGetAIRecommendation, onRefineWithAI }) {
  return (
    <>
      <StepShell title="Choose Engagement Type" subtitle="Select the program format that best fits your talent goals.">
        <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-5">
          {engagementTypeOptions.map((option) => (
            <EngagementTypeSelectionCard
              key={option.title}
              option={option}
              selected={selectedType === option.title}
              onClick={() => setSelectedType(option.title)}
            />
          ))}
        </div>
      </StepShell>

      <AIRecommendationBanner onClick={onGetAIRecommendation} />
      <AIStrategistCard onRefine={onRefineWithAI} />
    </>
  )
}

function ProgramDetailsStep({ form, setForm, onApplyAISuggestions }) {
  const handleAddOutcome = (outcome) => {
    setForm((prev) => ({
      ...prev,
      outcomes: mergeUnique(prev.outcomes, [outcome]),
    }))
  }

  const handleRemoveOutcome = (item) => {
    setForm((prev) => ({
      ...prev,
      outcomes: prev.outcomes.filter((x) => x !== item),
    }))
  }

  return (
    <StepShell title="Program Details" subtitle="Tell students what they will build, learn, and prove.">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="space-y-5">
          <FieldDisplay label="Engagement Title" value={form.title} required count={`${form.title.length}/100`} />
          <FieldDisplay label="Goal / Objective" value={form.goal} required count={`${form.goal.length}/100`} />
          <FieldDisplay label="Description" value={form.description} required multiline count={`${form.description.length}/700`} />
          <ChipGroup
            label="Student Outcomes (What students will gain)"
            items={form.outcomes}
            addLabel="Add more"
            onAdd={handleAddOutcome}
            onRemove={handleRemoveOutcome}
          />
        </div>
        <AssistantPanel
          title="AI Writing Assistant"
          subtitle="Here are suggestions to strengthen your program brief."
          items={writingSuggestions}
          onClick={onApplyAISuggestions}
        />
      </div>
    </StepShell>
  )
}

function TargetAudienceCard({ activeChips }) {
  const allCandidates = employerTalentWorkspace.candidates;

  // Calculate estimated reach based on candidate matching
  const matchingCandidates = React.useMemo(() => {
    if (activeChips.length === 0) return allCandidates;
    return allCandidates.filter(c => {
      const candidateChips = activeChips.filter(ch => ch.type === 'candidate');
      const skillChips = activeChips.filter(ch => ch.type === 'skill');
      const roleChips = activeChips.filter(ch => ch.type === 'role');

      if (candidateChips.length > 0) {
        if (!candidateChips.some(ch => c.name.toLowerCase() === ch.value.toLowerCase())) return false;
      }
      if (skillChips.length > 0) {
        if (!skillChips.every(ch =>
          c.topSkills.some(s => s.toLowerCase() === ch.value.toLowerCase()) ||
          c.evidenceTrace.some(e => e.skill.toLowerCase() === ch.value.toLowerCase())
        )) return false;
      }
      if (roleChips.length > 0) {
        if (!roleChips.some(ch => c.targetRole.toLowerCase() === ch.value.toLowerCase())) return false;
      }
      return true;
    });
  }, [allCandidates, activeChips]);

  const roleChips = activeChips.filter(ch => ch.type === 'role');
  const skillChips = activeChips.filter(ch => ch.type === 'skill');
  const candidateChips = activeChips.filter(ch => ch.type === 'candidate');

  const estimatedReach = activeChips.length > 0
    ? matchingCandidates.length * 15 + 7
    : 184;

  return (
    <div className="rounded-[8px] border border-blue-200 bg-blue-50/50 p-5 shadow-sm">
      <div className="flex items-center justify-between border-b border-blue-100 pb-3">
        <h4 className="text-sm font-semibold text-blue-900 flex items-center gap-1.5">
          <span>🎯</span> Target Audience
        </h4>
        <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-bold text-blue-800">
          Reach: {estimatedReach} candidates
        </span>
      </div>
      <div className="mt-4 space-y-3 text-xs leading-normal">
        <div>
          <span className="font-bold text-slate-500 block uppercase tracking-wider text-[10px]">Selected Roles</span>
          {roleChips.length > 0 ? (
            <div className="mt-1 flex flex-wrap gap-1.5">
              {roleChips.map(ch => (
                <span key={ch.id} className="rounded bg-white border border-blue-100 px-2 py-1 font-semibold text-blue-700">
                  {ch.value}
                </span>
              ))}
            </div>
          ) : (
            <span className="text-slate-400 italic">None selected. Add a role via global search.</span>
          )}
        </div>
        <div>
          <span className="font-bold text-slate-500 block uppercase tracking-wider text-[10px]">Selected Skills</span>
          {skillChips.length > 0 ? (
            <div className="mt-1 flex flex-wrap gap-1.5">
              {skillChips.map(ch => (
                <span key={ch.id} className="rounded bg-white border border-blue-100 px-2 py-1 font-semibold text-blue-700">
                  {ch.value}
                </span>
              ))}
            </div>
          ) : (
            <span className="text-slate-400 italic">None selected. Add a skill via global search.</span>
          )}
        </div>
        {candidateChips.length > 0 && (
          <div>
            <span className="font-bold text-slate-500 block uppercase tracking-wider text-[10px]">Selected Candidates</span>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {candidateChips.map(ch => (
                <span key={ch.id} className="rounded bg-white border border-blue-100 px-2 py-1 font-semibold text-blue-700">
                  {ch.value}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function AudienceSkillsStep({ form, setForm, onApplyAudienceRecommendations }) {
  const { chipsByPage } = useEmployerSearchStore();
  const activeChips = chipsByPage.engagement;

  const handleAdd = (field, val) => {
    setForm((prev) => ({
      ...prev,
      [field]: mergeUnique(prev[field], [val]),
    }))
  }

  const handleRemove = (field, item) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].filter((x) => x !== item),
    }))
  }

  return (
    <StepShell title="Audience & Skills" subtitle="Define who you want to engage and the key skills to develop.">
      <div className="space-y-6">
        <TargetAudienceCard activeChips={activeChips} />

        <ChipGroup
          label="Target Roles (Students' Interest)"
          items={form.targetRoles}
          addLabel="Add role"
          onAdd={(value) => handleAdd('targetRoles', value)}
          onRemove={(item) => handleRemove('targetRoles', item)}
        />
        <ChipGroup
          label="Preferred Universities"
          items={form.universities}
          addLabel="Add university"
          onAdd={(value) => handleAdd('universities', value)}
          onRemove={(item) => handleRemove('universities', item)}
        />
        <ChipGroup
          label="Skill Focus"
          items={form.skillFocus}
          addLabel="Add skill"
          onAdd={(value) => handleAdd('skillFocus', value)}
          onRemove={(item) => handleRemove('skillFocus', item)}
        />
        <ChipGroup
          label="Experience Level"
          items={form.experienceLevels}
          addLabel="Add level"
          onAdd={(value) => handleAdd('experienceLevels', value)}
          onRemove={(item) => handleRemove('experienceLevels', item)}
        />

        <section className="rounded-[8px] border border-blue-100 bg-blue-50/55 p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-3">
              <EngagementIcon name="ai" tone="violet" />
              <div>
              <h3 className="text-sm font-semibold text-slate-950">AI Recommended Audience</h3>
              <p className="mt-1 text-sm leading-6 text-slate-600">Based on similar successful engagements.</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onApplyAudienceRecommendations}
              className="h-10 shrink-0 rounded-[8px] border border-blue-200 bg-white px-4 text-sm font-semibold text-blue-700 transition hover:bg-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
            >
              Apply Audience
            </button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {audienceRecommendations.map((item) => <Chip key={item} removable={false}>{item}</Chip>)}
          </div>
        </section>
      </div>
    </StepShell>
  );
}

function TimelineResourcesStep({ form, setForm, onApplyResourceRecommendations }) {
  const [newDeliverable, setNewDeliverable] = useState('')

  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const addDeliverable = () => {
    const deliverable = newDeliverable.trim()
    if (!deliverable) return
    setForm((prev) => ({
      ...prev,
      deliverables: mergeUnique(prev.deliverables, [deliverable]),
    }))
    setNewDeliverable('')
  }

  return (
    <StepShell title="Timeline & Resources" subtitle="Plan the program schedule and required support.">
      <div className="space-y-6">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <FieldDisplay label="Start Date" value={form.startDate} required type="date" onChange={(value) => updateField('startDate', value)} />
          <SelectDisplay label="Duration" value={form.duration} required options={['1 week', '2 weeks', '3 weeks', '4 weeks', '6 weeks', '8 weeks']} onChange={(value) => updateField('duration', value)} />
          <SelectDisplay label="Mode" value={form.mode} required options={['Online', 'Hybrid', 'On-site']} onChange={(value) => updateField('mode', value)} />
          <FieldDisplay label="Capacity" value={form.capacity} required onChange={(value) => updateField('capacity', value)} />
          <FieldDisplay label="Application Deadline" value={form.applicationDeadline} required type="date" onChange={(value) => updateField('applicationDeadline', value)} />
          <SelectDisplay label="Need Mentors" value={form.mentorsNeeded} required options={['No', 'Yes', 'Yes - 1 mentor per 20 students', 'Yes - 1 mentor per 15 students']} onChange={(value) => updateField('mentorsNeeded', value)} />
          <SelectDisplay label="Need Judges" value={form.judgesNeeded} required options={['No', 'Yes', 'Yes - 1 judge per 30 students', 'Yes - 1 judge per 20 students']} onChange={(value) => updateField('judgesNeeded', value)} />
          <SelectDisplay label="Budget Range" value={form.budgetRange} required options={['No budget required', 'RM 1,000 - RM 3,000', 'RM 3,000 - RM 5,000', 'RM 5,000 - RM 10,000']} onChange={(value) => updateField('budgetRange', value)} />
        </div>

        <section>
          <h4 className="text-sm font-semibold text-slate-800">Expected Deliverables</h4>
          <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {form.deliverables.map((deliverable) => (
              <div key={deliverable} className="relative group rounded-[8px] border border-slate-200 bg-white p-4">
                <button
                  type="button"
                  onClick={() => {
                    setForm((prev) => ({
                      ...prev,
                      deliverables: prev.deliverables.filter((x) => x !== deliverable),
                    }))
                  }}
                  className="absolute top-2 right-2 text-slate-400 hover:text-rose-500 font-bold opacity-0 group-hover:opacity-100 transition"
                >
                  ✕
                </button>
                <p className="text-sm font-semibold text-slate-950">{deliverable}</p>
                <p className="mt-2 text-sm leading-5 text-slate-500">
                  {deliverable.toLowerCase().includes('dashboard')
                    ? 'Interactive dashboard'
                    : deliverable.toLowerCase().includes('report')
                      ? 'Analysis and findings'
                      : 'Final insights and story'}
                </p>
              </div>
            ))}
            <div className="flex min-h-[120px] w-full flex-col justify-center rounded-[8px] border border-dashed border-blue-200 bg-blue-50/30 p-3">
              <label className="text-sm font-semibold text-blue-800" htmlFor="new-deliverable">Add Deliverable</label>
              <input
                id="new-deliverable"
                value={newDeliverable}
                onChange={(event) => setNewDeliverable(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') addDeliverable()
                }}
                placeholder="e.g. Final dashboard"
                className="mt-2 h-10 rounded-[8px] border border-blue-100 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
              />
              <button
                onClick={addDeliverable}
                className="mt-2 h-9 rounded-[8px] bg-blue-600 px-3 text-sm font-semibold text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
                type="button"
              >
                Add
              </button>
            </div>
          </div>
        </section>

        <section className="rounded-[8px] border border-blue-100 bg-blue-50/45 p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-3">
              <EngagementIcon name="ai" tone="violet" />
              <div>
                <h3 className="text-sm font-semibold text-slate-950">AI Resource Assistant</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">Based on similar programs, we recommend:</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onApplyResourceRecommendations}
              className="h-10 shrink-0 rounded-[8px] border border-blue-200 bg-white px-4 text-sm font-semibold text-blue-700 transition hover:bg-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
            >
              Apply Resources
            </button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {resourceRecommendations.map((item) => <Chip key={item} removable={false}>{item}</Chip>)}
          </div>
        </section>
      </div>
    </StepShell>
  )
}

function SummaryRow({ icon, label, value }) {
  return (
    <div className="grid grid-cols-[32px_120px_minmax(0,1fr)] items-start gap-3">
      <EngagementIcon name={icon} tone="blue" />
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="text-sm leading-6 text-slate-800">{Array.isArray(value) ? value.join(', ') : value}</p>
    </div>
  )
}

function ReviewLaunchStep({ form, selectedType, onEdit }) {
  const intelligence = stepIntelligence[5]

  // Responsive grid: stacked at smaller widths, two columns at lg (Summary spans
  // the full row on top), then three columns at xl+ now that the page-level
  // preview rail is hidden on this step and the whole main area is available.
  return (
    <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(240px,300px)]">
      <section className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)] lg:col-span-2 xl:col-span-1">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-base font-semibold text-slate-950">Engagement Summary</h3>
          <button
            onClick={onEdit}
            className="h-9 rounded-[8px] border border-blue-100 bg-blue-50 px-3 text-sm font-semibold text-blue-700 hover:bg-blue-100 transition focus:outline-none"
            type="button"
          >
            Edit
          </button>
        </div>
        <div className="mt-5 space-y-4">
          <SummaryRow icon="doc" label="Type" value={selectedType} />
          <SummaryRow icon="lock" label="Title" value={form.title} />
          <SummaryRow icon="trend" label="Goal" value={form.goal} />
          <SummaryRow icon="calendar" label="Duration" value={`${form.startDate} - 29 Jun 2025 (${form.duration})`} />
          <SummaryRow icon="board" label="Mode" value={form.mode} />
          <SummaryRow icon="users" label="Capacity" value={form.capacity} />
          <SummaryRow icon="star" label="Target Roles" value={form.targetRoles} />
          <SummaryRow icon="check" label="Key Skills" value={form.skillFocus} />
          <SummaryRow icon="board" label="Universities" value={form.universities} />
          <SummaryRow icon="doc" label="Deliverables" value={form.deliverables} />
        </div>
      </section>

      <section className="space-y-5">
        <div className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
          <h3 className="text-base font-semibold text-slate-950">Engagement Strength Score</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-[96px_minmax(0,1fr)]">
            <div className="flex h-24 w-24 items-center justify-center rounded-full border-[8px] border-emerald-400 bg-white">
              <div className="text-center">
                <p className="text-2xl font-semibold text-slate-950">{intelligence.score}</p>
                <p className="text-xs text-slate-500">/100</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-emerald-700">{intelligence.label}</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">{intelligence.explanation}</p>
            </div>
          </div>
          <div className="mt-4 space-y-3">
            {intelligence.scores.map(([label, value]) => <ScoreBar key={label} label={label} value={value} />)}
          </div>
        </div>
        <div className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
          <ProjectedOutcomes outcomes={intelligence.outcomes} />
        </div>
        <div className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
          <h3 className="text-base font-semibold text-slate-950">Candidate Attraction Reasons</h3>
          <div className="mt-4 space-y-3">
            {employerEngagementBuilder.preview.attractionReasons.map((reason) => (
              <p key={reason} className="flex gap-3 text-sm leading-6 text-slate-700">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">✓</span>
                <span>{reason}</span>
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
        <h3 className="text-base font-semibold text-slate-950">Pre-Launch Checklist</h3>
        <div className="mt-5 space-y-4">
          {launchChecklist.map((item) => (
            <p key={item} className="flex gap-3 text-sm leading-6 text-slate-700">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">✓</span>
              <span>{item}</span>
            </p>
          ))}
        </div>
      </section>
    </div>
  )
}

function ScoreBar({ label, value }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between gap-3 text-xs">
        <span className="font-medium text-slate-600">{label}</span>
        <span className="text-slate-700">{value}/100</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-blue-500" style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}

function EngagementStrengthPanel({ intelligence }) {
  const ringColor = intelligence.score >= 86 ? 'border-emerald-400' : intelligence.score >= 80 ? 'border-teal-400' : 'border-blue-300'

  return (
    <section className="border-t border-slate-100 px-5 py-5">
      <h3 className="text-sm font-semibold text-slate-950">Engagement Strength Score</h3>
      <div className="mt-4 grid gap-4 sm:grid-cols-[96px_minmax(0,1fr)]">
        <div className={`flex h-24 w-24 items-center justify-center rounded-full border-[8px] ${ringColor} bg-white`}>
          <div className="text-center">
            <p className="text-2xl font-semibold text-slate-950">{intelligence.score}</p>
            <p className="text-xs text-slate-500">/100</p>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-emerald-700">{intelligence.label}</p>
          <p className="mt-1 text-sm leading-6 text-slate-600">{intelligence.explanation}</p>
        </div>
      </div>
      <div className="mt-4 space-y-3">
        {intelligence.scores.map(([label, value]) => <ScoreBar key={label} label={label} value={value} />)}
      </div>
    </section>
  )
}

function ProjectedOutcomes({ outcomes }) {
  return (
    <section className="border-t border-slate-100 px-5 py-5">
      <h3 className="text-sm font-semibold text-slate-950">Projected Outcomes</h3>
      <div className="mt-3 grid grid-cols-2 gap-3">
        {outcomes.map(([value, label]) => (
          <div key={label} className="rounded-[8px] border border-slate-200 bg-white px-3 py-3 text-center">
            <p className="text-lg font-semibold text-blue-700">{value}</p>
            <p className="mt-1 text-xs leading-4 text-slate-500">{label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function MarketInsights() {
  return (
    <section className="border-t border-slate-100 px-5 py-5">
      <h3 className="text-sm font-semibold text-slate-950">Market Insights</h3>
      <p className="mt-1 text-sm text-slate-500">High demand skills this month</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {['Power BI +18%', 'SQL +12%', 'GenAI +22%'].map((item) => (
          <span key={item} className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-100">{item}</span>
        ))}
      </div>
      <div className="mt-4 rounded-[8px] bg-slate-50 px-3 py-3">
        <p className="text-sm font-medium text-slate-950">Students interested in analytics</p>
        <p className="mt-1 text-sm text-slate-600">2,340 active students</p>
      </div>
    </section>
  )
}

function BuilderPreviewPanel({ selectedType, currentStep, form }) {
  const preview = employerEngagementBuilder.preview
  const intelligence = stepIntelligence[currentStep]

  return (
    <aside className="overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-[0_10px_28px_rgba(15,23,42,0.06)] xl:sticky xl:top-28 xl:self-start">
      <section className="px-5 py-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-base font-semibold text-slate-950">Engagement Preview</h2>
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-100">Live preview</span>
        </div>
        <div className="mt-5 flex gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-700 ring-1 ring-blue-100">B</div>
          <div className="min-w-0">
            <h3 className="text-sm font-semibold leading-5 text-slate-950">{form.title}</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-100">{selectedType}</span>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">{preview.status}</span>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600">{form.description}</p>
          </div>
        </div>
      </section>

      <EngagementStrengthPanel intelligence={intelligence} />
      <ProjectedOutcomes outcomes={intelligence.outcomes} />
      <MarketInsights />

      <section className="border-t border-slate-100 px-5 py-5">
        <h3 className="text-sm font-semibold text-slate-950">Why this will attract candidates</h3>
        <ul className="mt-3 space-y-3">
          {preview.attractionReasons.map((reason) => (
            <li key={reason} className="flex gap-2 text-sm leading-6 text-slate-600">
              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m5 12 4 4 10-10" />
                </svg>
              </span>
              <span>{reason}</span>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  )
}

function matchesFilter(request, filter) {
  if (filter === 'All') return true
  const needMap = {
    'Needs Speakers': 'Speaker',
    'Needs Judges': 'Judges',
    'Needs Sponsors': 'Sponsor',
    'Needs Mentors': 'Mentor',
    'Needs Technical Partners': 'Technical Partner',
  }
  return request.needs.includes(needMap[filter])
}

export default function EmployerCreateEngagementPage() {
  const [activeTab, setActiveTab] = useState('create-engagement')
  const [selectedType, setSelectedType] = useState(employerEngagementBuilder.selectedType)
  const [currentStep, setCurrentStep] = useState(1)
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedRequestId, setSelectedRequestId] = useState(null)
  const [panelTab, setPanelTab] = useState('overview')
  const [sentIds, setSentIds] = useState(() => new Set(employerEngagement.clubRequests.filter((request) => request.status === 'Interest Sent').map((request) => request.id)))
  const [toast, setToast] = useState('')
  const [form, setForm] = useState(employerEngagementBuilder.form)

  const selectedRequest = employerEngagement.clubRequests.find((request) => request.id === selectedRequestId)
  const filteredRequests = useMemo(
    () =>
      employerEngagement.clubRequests
        .filter((request) => matchesFilter(request, activeFilter))
        .map((request) => ({ ...request, status: sentIds.has(request.id) ? 'Interest Sent' : request.status })),
    [activeFilter, sentIds],
  )

  function triggerToast(msg) {
    setToast(msg)
    window.setTimeout(() => setToast(''), 2000)
  }

  function sendInterest(requestId) {
    setSentIds((current) => new Set([...current, requestId]))
    triggerToast('Interest sent successfully.')
  }

  function goNext() {
    setCurrentStep((step) => Math.min(step + 1, creationSteps.length))
  }

  function goBack() {
    setCurrentStep((step) => Math.max(step - 1, 1))
  }

  function publishEngagement() {
    triggerToast('Engagement published successfully!')
  }

  function saveDraft() {
    triggerToast('Draft saved successfully.')
  }

  const handleGetAIRecommendation = () => {
    setSelectedType('Micro-Project')
    setForm((prev) => ({
      ...prev,
      skillFocus: mergeUnique(prev.skillFocus, ['SQL', 'Power BI']),
      deliverables: mergeUnique(prev.deliverables, ['Executive dashboard']),
    }))
    triggerToast('AI recommended Micro-Project and added matching skills.')
  }

  const handleRefineWithAI = () => {
    setSelectedType('Micro-Project')
    setForm((prev) => ({
      ...prev,
      goal: 'Help students build portfolio-ready analytics evidence using real business data.',
      outcomes: mergeUnique(prev.outcomes, ['Portfolio-ready analytics case study', 'Executive presentation practice']),
      skillFocus: mergeUnique(prev.skillFocus, ['SQL', 'Power BI', 'Data Storytelling']),
      deliverables: mergeUnique(prev.deliverables, ['Executive dashboard', 'Insight memo']),
    }))
    triggerToast('AI strategist refined the program goal, skills, and deliverables.')
  }

  const handleApplyAISuggestions = () => {
    setForm((prev) => ({
      ...prev,
      title: 'Advanced Retail Analytics & Customer Segmentation Challenge',
      description: 'Leverage Python, SQL, and Power BI on real-world retail transaction datasets. Uncover customer cohorts, perform market basket analysis, and design a dynamic executive dashboard to present actionable strategic recommendations.',
      outcomes: mergeUnique(prev.outcomes, ['Customer segmentation analysis', 'Market basket insight presentation']),
    }))
    triggerToast('AI writing suggestions applied!')
  }

  const handleApplyAudienceRecommendations = () => {
    setForm((prev) => ({
      ...prev,
      targetRoles: mergeUnique(prev.targetRoles, ['Data Analyst', 'Business Intelligence Analyst']),
      skillFocus: mergeUnique(prev.skillFocus, ['Excel', 'SQL', 'Analytics']),
      experienceLevels: mergeUnique(prev.experienceLevels, ['Year 2', 'Year 3']),
    }))
    triggerToast('Recommended audience and skills applied.')
  }

  const handleApplyResourceRecommendations = () => {
    setForm((prev) => ({
      ...prev,
      mentorsNeeded: 'Yes - 1 mentor per 20 students',
      judgesNeeded: 'Yes - 1 judge per 30 students',
      budgetRange: 'RM 3,000 - RM 5,000',
      deliverables: mergeUnique(prev.deliverables, ['Final presentation deck', 'Scored judging rubric']),
    }))
    triggerToast('Recommended resources and deliverables applied.')
  }

  const activeStep = creationSteps.find((step) => step.id === currentStep) || creationSteps[0]
  const nextStep = creationSteps.find((step) => step.id === currentStep + 1)

  let stepContent
  if (currentStep === 1) {
    stepContent = (
      <ChooseTypeStep
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        onGetAIRecommendation={handleGetAIRecommendation}
        onRefineWithAI={handleRefineWithAI}
      />
    )
  } else if (currentStep === 2) {
    stepContent = (
      <ProgramDetailsStep
        form={form}
        setForm={setForm}
        onApplyAISuggestions={handleApplyAISuggestions}
      />
    )
  } else if (currentStep === 3) {
    stepContent = <AudienceSkillsStep form={form} setForm={setForm} onApplyAudienceRecommendations={handleApplyAudienceRecommendations} />
  } else if (currentStep === 4) {
    stepContent = <TimelineResourcesStep form={form} setForm={setForm} onApplyResourceRecommendations={handleApplyResourceRecommendations} />
  } else {
    stepContent = <ReviewLaunchStep form={form} selectedType={selectedType} onEdit={() => setCurrentStep(2)} />
  }

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Create Engagement</h2>
        <p className="mt-2 text-sm text-slate-500">
          {activeTab === 'create-engagement' ? `${activeStep.title}: ${activeStep.helper}.` : 'Build relationships with student talent through collaboration and early experiences.'}
        </p>
      </header>

      <InternalTabNav tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'create-engagement' ? (
        <div
          className={`grid gap-6 ${
            currentStep === 5
              ? ''
              : 'xl:grid-cols-[minmax(0,1fr)_360px] 2xl:grid-cols-[minmax(0,1fr)_390px]'
          }`}
        >
          <main className="min-w-0 space-y-5">
            <ProgressTracker currentStep={currentStep} setCurrentStep={setCurrentStep} />
            {stepContent}

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              {currentStep === 1 ? (
                <button
                  onClick={() => {
                    setCurrentStep(1)
                    setActiveTab('club-collaboration')
                  }}
                  className="h-12 rounded-[8px] border border-slate-200 bg-white px-8 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                  type="button"
                >
                  Cancel
                </button>
              ) : (
                <button onClick={goBack} className="h-12 rounded-[8px] border border-slate-200 bg-white px-8 text-sm font-semibold text-slate-600 hover:bg-slate-50" type="button">
                  ← Back
                </button>
              )}

              {currentStep < 5 ? (
                <button onClick={goNext} className="h-12 rounded-[8px] bg-blue-600 px-8 text-sm font-semibold text-white shadow-sm shadow-blue-200 hover:bg-blue-700" type="button">
                  {nextStep.title} →
                </button>
              ) : (
                <div className="flex flex-col gap-3 sm:flex-row">
                  <button onClick={saveDraft} className="h-12 rounded-[8px] border border-blue-200 bg-white px-8 text-sm font-semibold text-blue-700 hover:bg-blue-50" type="button">
                    Save Draft
                  </button>
                  <button onClick={publishEngagement} className="h-12 rounded-[8px] bg-blue-600 px-8 text-sm font-semibold text-white shadow-sm shadow-blue-200 hover:bg-blue-700" type="button">
                    Publish Engagement
                  </button>
                </div>
              )}
            </div>
          </main>

          {currentStep !== 5 && (
            <BuilderPreviewPanel selectedType={selectedType} currentStep={currentStep} form={form} />
          )}
        </div>
      ) : (
        <div className="space-y-6">
          <main className="min-w-0 space-y-6">
            <EngagementFilterChips activeFilter={activeFilter} onFilterChange={setActiveFilter} />
            <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {filteredRequests.map((request) => (
                <ClubRequestCard
                  key={request.id}
                  request={request}
                  onViewDetails={(req) => {
                    setSelectedRequestId(req.id)
                    setPanelTab('overview')
                  }}
                  onExpressInterest={(req) => {
                    setSelectedRequestId(req.id)
                    setPanelTab('express')
                  }}
                />
              ))}
            </section>
            <CTASection onClick={() => setActiveTab('create-engagement')} />
          </main>

          {selectedRequestId && (
            <div 
              onClick={() => setSelectedRequestId(null)}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm cursor-pointer"
            >
              <div 
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-lg cursor-default"
              >
                <ExpressInterestPanel
                  request={selectedRequest ? { ...selectedRequest, status: sentIds.has(selectedRequest.id) ? 'Interest Sent' : selectedRequest.status } : null}
                  proposalDraft={employerEngagement.proposalDraft}
                  onClose={() => setSelectedRequestId(null)}
                  onSend={sendInterest}
                  activeTab={panelTab}
                  setActiveTab={setPanelTab}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-xl">
          {toast}
        </div>
      )}
    </div>
  )
}
