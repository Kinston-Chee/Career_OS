import React, { useState } from 'react'
import { employerTalentWorkspace } from '../data/mockData'

const tabs = ['Profile Fit', 'Skills', 'Experience', 'Projects', 'Evidence', 'Activity']

const tabCounts = {
  'Profile Fit': '',
  Skills: '8',
  Experience: '3',
  Projects: '4',
  Evidence: '12',
  Activity: '',
}

function SkillPill({ children, tone = 'blue' }) {
  const tones = {
    blue: 'bg-blue-50 text-blue-700 ring-blue-100',
    green: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
    violet: 'bg-violet-50 text-violet-700 ring-violet-100',
    amber: 'bg-amber-50 text-amber-700 ring-amber-100',
    slate: 'bg-slate-50 text-slate-600 ring-slate-100',
  }

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium leading-none ring-1 ${tones[tone]}`}>
      {children}
    </span>
  )
}

function CandidateAvatar({ name, selected, large = false }) {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')

  return (
    <div className={`relative flex shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white shadow-sm ${
      large ? 'h-20 w-20' : 'h-14 w-14'
    } ${selected ? 'bg-gradient-to-br from-sky-400 to-blue-600' : 'bg-gradient-to-br from-slate-500 to-blue-400'}`}>
      {initials}
      <span className="absolute bottom-1 right-1 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
    </div>
  )
}

function CandidateStream({ candidates, selectedId, shortlistedIds, onSelect, onToggleShortlist }) {
  const shortlistedCount = candidates.filter((candidate) => shortlistedIds.has(candidate.id)).length

  return (
    <aside className="min-w-0 overflow-hidden rounded-[8px] border border-slate-200/80 bg-white shadow-[0_18px_54px_rgba(15,23,42,0.05)]">
      <div className="border-b border-slate-100">
        <div className="grid grid-cols-2">
          <button className="border-b-2 border-blue-600 px-4 py-4 text-sm font-semibold text-blue-700" type="button">
            All <span className="ml-2 rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-500">1.2K</span>
          </button>
          <button className="border-b-2 border-transparent px-4 py-4 text-sm font-medium text-slate-500" type="button">
            Shortlisted <span className="ml-2 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500">{shortlistedCount}</span>
          </button>
        </div>
        <div className="px-4 py-3">
          <button className="flex h-11 w-full items-center justify-between rounded-[8px] border border-slate-200 bg-white px-3 text-sm font-medium text-slate-600" type="button">
            <span>Sort by: Best Match</span>
            <span className="text-blue-500">v</span>
          </button>
        </div>
      </div>

      <div className="space-y-3 p-3">
        {candidates.map((candidate) => {
          const selected = candidate.id === selectedId
          const shortlisted = shortlistedIds.has(candidate.id)

          return (
            <article
              key={candidate.id}
              className={`rounded-[8px] border bg-white p-3.5 transition-all duration-200 ${
                selected
                  ? 'border-blue-500 shadow-[0_0_0_1px_rgba(37,99,235,0.22),0_18px_38px_rgba(37,99,235,0.11)]'
                  : 'border-slate-200 hover:border-blue-200 hover:shadow-[0_10px_30px_rgba(15,23,42,0.05)]'
              }`}
            >
              <button className="flex w-full items-start gap-3 text-left" type="button" onClick={() => onSelect(candidate.id)}>
                <CandidateAvatar name={candidate.name} selected={selected} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-semibold leading-5 text-slate-950">{candidate.name}</h3>
                      <p className="mt-0.5 truncate text-xs font-normal leading-5 text-slate-500">{candidate.targetRole}</p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-sm font-semibold leading-5 text-emerald-600">{candidate.match}%</p>
                      <p className="text-[11px] font-medium text-emerald-600">Match</p>
                    </div>
                  </div>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {candidate.topSkills.slice(0, 3).map((skill) => (
                      <SkillPill key={skill}>{skill}</SkillPill>
                    ))}
                  </div>
                </div>
              </button>
              <div className="mt-3 flex items-center justify-between gap-2 text-[11px] font-normal leading-5 text-slate-400">
                <span className="min-w-0 truncate">{candidate.lastSignal}</span>
                <button
                  className={`shrink-0 rounded-full px-2 py-1 font-medium ${
                    shortlisted ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'
                  }`}
                  type="button"
                  onClick={() => onToggleShortlist(candidate.id)}
                >
                  {shortlisted ? 'Saved' : 'Save'}
                </button>
              </div>
            </article>
          )
        })}

        <button className="flex h-11 w-full items-center justify-center rounded-[8px] bg-blue-50 text-sm font-semibold text-blue-700 ring-1 ring-blue-100" type="button">
          Load more <span className="ml-2">v</span>
        </button>
      </div>
    </aside>
  )
}

function CandidateHeader({ candidate, shortlisted, onToggleShortlist }) {
  return (
    <header className="border-b border-slate-100 px-6 py-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="flex min-w-0 items-center gap-5">
          <CandidateAvatar name={candidate.name} selected large />
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-semibold leading-tight text-slate-950">{candidate.name}</h1>
              <SkillPill tone="green">{candidate.match}% Match</SkillPill>
            </div>
            <p className="mt-2 text-sm font-normal leading-6 text-slate-600">{candidate.targetRole} at {candidate.university}</p>
            <p className="mt-1.5 text-xs font-normal leading-5 text-slate-500">{candidate.location} <span className="px-2 text-slate-300">.</span> {candidate.availability}</p>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-3 xl:justify-end">
          <button
            className={`inline-flex h-11 items-center rounded-[8px] px-4 text-sm font-semibold ring-1 transition-all duration-200 ${
              shortlisted
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 ring-blue-600'
                : 'bg-white text-blue-700 ring-blue-100 hover:bg-blue-50'
            }`}
            type="button"
            onClick={onToggleShortlist}
          >
            {shortlisted ? 'Shortlisted' : 'Add to shortlist'}
          </button>
          <button className="flex h-11 w-11 items-center justify-center rounded-[8px] bg-white text-lg font-medium text-slate-500 ring-1 ring-slate-200" type="button">
            :
          </button>
        </div>
      </div>
    </header>
  )
}

function TabNav({ activeTab, onChange }) {
  return (
    <div className="flex gap-8 overflow-x-auto border-b border-slate-100 px-6">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`shrink-0 border-b-2 py-4 text-sm font-medium leading-5 transition-all duration-200 ${
            activeTab === tab ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
          type="button"
          onClick={() => onChange(tab)}
        >
          {tab}
          {tabCounts[tab] ? <span className="ml-2 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-normal text-slate-500">{tabCounts[tab]}</span> : null}
        </button>
      ))}
    </div>
  )
}

function getRecruiterDecision(candidate) {
  if (candidate.match >= 90) {
    return {
      action: 'Invite to assessment',
      confidence: 'High',
      confidenceValue: candidate.match,
      risk: candidate.potentialGap,
      nextStep: candidate.nextSteps[0] || 'Review strongest evidence',
    }
  }

  if (candidate.match >= 82) {
    return {
      action: 'Request focused review',
      confidence: 'Moderate-high',
      confidenceValue: candidate.match,
      risk: candidate.potentialGap,
      nextStep: candidate.nextSteps[0] || 'Validate role-critical skill',
    }
  }

  return {
    action: 'Keep warm',
    confidence: 'Needs verification',
    confidenceValue: candidate.match,
    risk: candidate.potentialGap,
    nextStep: candidate.nextSteps[0] || 'Collect stronger evidence',
  }
}

function RecruiterDecisionStrip({ candidate }) {
  const decision = getRecruiterDecision(candidate)
  const items = [
    { label: 'Recommended action', value: decision.action },
    { label: 'Hiring confidence', value: `${decision.confidence} - ${decision.confidenceValue}%` },
    { label: 'Key risk to verify', value: decision.risk },
    { label: 'Suggested next step', value: decision.nextStep },
  ]

  return (
    <section className="border-b border-slate-100 bg-slate-50/55 px-5 py-4">
      <div className="grid gap-3 xl:grid-cols-[1fr_0.9fr_1.35fr_1.15fr]">
        {items.map((item, index) => (
          <div key={item.label} className="min-w-0 rounded-[8px] border border-slate-200 bg-white px-4 py-3">
            <div className="flex items-center gap-2">
              <span className={`h-2 w-2 shrink-0 rounded-full ${index === 0 ? 'bg-blue-500' : index === 1 ? 'bg-emerald-500' : index === 2 ? 'bg-amber-500' : 'bg-slate-400'}`} />
              <p className="text-xs font-medium text-slate-500">{item.label}</p>
            </div>
            <p className="mt-2 truncate text-sm font-semibold text-slate-950" title={item.value}>{item.value}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function FitScoreBadge({ score, className }) {
  return (
    <div className={`absolute rounded-[8px] border border-blue-100 bg-white px-3 py-2 text-center shadow-[0_12px_30px_rgba(37,99,235,0.08)] ${className}`}>
      <p className="text-[10px] font-medium leading-4 text-slate-500">{score.label}</p>
      <p className="mt-1 text-base font-semibold text-blue-700">{score.value}%</p>
    </div>
  )
}

function FitVisualization({ candidate }) {
  const scores = candidate.fitScores

  return (
    <section className="min-h-[520px] rounded-[8px] bg-white px-5 py-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-semibold text-slate-950">Profile Fit Overview</h3>
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-[10px] font-medium text-slate-400">i</span>
        </div>
        <button className="flex h-10 items-center gap-2 rounded-[8px] bg-blue-50 px-3 text-sm font-medium text-blue-700" type="button">
          <span className="flex h-5 w-5 items-center justify-center rounded bg-white ring-1 ring-blue-100">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
          </span>
          {candidate.targetRole}
          <span className="text-blue-400">v</span>
        </button>
      </div>

      <div className="relative mx-auto mt-10 h-[430px] max-w-[680px]">
        <div className="absolute left-1/2 top-[48%] h-64 w-64 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[8px] border border-blue-100 bg-blue-50/40" />
        <div className="absolute left-1/2 top-[48%] h-52 w-52 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[8px] border border-blue-100 bg-white/60" />
        <div className="absolute left-1/2 top-[51%] h-44 w-44 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[8px] bg-gradient-to-br from-blue-100 via-sky-100 to-blue-200 shadow-[0_28px_60px_rgba(37,99,235,0.16)]" />
        <div className="absolute left-1/2 top-[57%] h-36 w-36 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[8px] bg-gradient-to-br from-blue-600 to-sky-400 shadow-[0_24px_44px_rgba(37,99,235,0.25)]" />
        <div className="absolute left-1/2 top-[43%] h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-[8px] border border-blue-100/90 bg-gradient-to-b from-blue-100/20 to-blue-300/35 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]" />
        <div className="absolute left-1/2 top-[38%] h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70 blur-xl" />
        <div className="absolute left-1/2 top-[45%] flex h-28 w-16 -translate-x-1/2 -translate-y-1/2 flex-col items-center">
          <div className="h-8 w-8 rounded-full bg-slate-900" />
          <div className="mt-1 h-16 w-10 rounded-t-full bg-white shadow-sm" />
          <div className="mt-[-4px] h-10 w-8 rounded-b-full bg-blue-700" />
        </div>

        {scores[0] ? <FitScoreBadge score={scores[0]} className="left-1/2 top-0 -translate-x-1/2" /> : null}
        {scores[1] ? <FitScoreBadge score={scores[1]} className="right-2 top-24" /> : null}
        {scores[2] ? <FitScoreBadge score={scores[2]} className="left-2 top-28" /> : null}
        {scores[3] ? <FitScoreBadge score={scores[3]} className="right-8 bottom-24" /> : null}
        {scores[4] ? <FitScoreBadge score={scores[4]} className="left-20 bottom-8" /> : null}
        <FitScoreBadge score={{ label: 'Leadership', value: Math.max(candidate.match - 17, 70) }} className="right-24 bottom-6" />
      </div>
    </section>
  )
}

function MatchAdvisorPanel({ candidate }) {
  return (
    <aside className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-[0_18px_48px_rgba(15,23,42,0.05)]">
      <h3 className="text-base font-semibold text-slate-950">Why it's a strong match</h3>
      <div className="mt-5 space-y-4">
        {candidate.fitReasons.map((reason) => (
          <div key={reason} className="flex gap-3">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-emerald-200 text-[10px] font-medium text-emerald-600">
              +
            </span>
            <p className="text-sm font-normal leading-6 text-slate-600">{reason}</p>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <div className="flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-100 text-xs font-medium text-amber-600">-</span>
          <h4 className="text-sm font-semibold text-slate-950">Potential gap</h4>
        </div>
        <p className="mt-3 pl-8 text-sm font-normal leading-6 text-slate-600">{candidate.potentialGap}</p>
      </div>

      <div className="mt-6">
        <h4 className="text-sm font-semibold text-slate-950">Suggested next steps</h4>
        <div className="mt-3 space-y-3">
          {candidate.nextSteps.map((step, index) => (
            <button key={step} className="flex w-full items-center gap-3 rounded-[8px] bg-white px-2 py-1.5 text-left text-sm font-medium leading-6 text-slate-700 transition-all duration-200 hover:bg-blue-50 hover:text-blue-700" type="button">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-blue-50 text-[10px] font-medium text-blue-700 ring-1 ring-blue-100">{index + 1}</span>
              <span>{step}</span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
}

function ProfileStatsRail({ stats }) {
  return (
    <div className="grid overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.04)] sm:grid-cols-2 xl:grid-cols-5">
      {stats.map((stat) => (
        <div key={stat.label} className="flex min-w-0 items-center gap-3 border-b border-slate-100 px-5 py-4 last:border-b-0 sm:border-r sm:last:border-r-0 xl:border-b-0">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-blue-50 ring-1 ring-blue-100">
            <span className="h-2 w-2 rounded-full bg-blue-500" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-xs font-normal leading-5 text-slate-500">{stat.label}</p>
            <p className="mt-0.5 truncate text-sm font-semibold text-slate-950">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function EvidenceTrace({ evidence }) {
  return (
    <div className="space-y-3">
      {evidence.map((item) => (
        <div key={`${item.skill}-${item.source}`} className="rounded-[8px] border border-slate-200 bg-white p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <SkillPill tone="violet">{item.skill}</SkillPill>
                <p className="text-sm font-semibold text-slate-950">{item.source}</p>
              </div>
              <p className="mt-2 text-sm font-normal leading-6 text-slate-600">{item.detail}</p>
            </div>
            <div className="shrink-0 rounded-[8px] bg-emerald-50 px-3 py-2 text-center ring-1 ring-emerald-100">
              <p className="text-sm font-semibold text-emerald-700">{item.confidence}%</p>
              <p className="text-[11px] font-medium text-emerald-500">trusted</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function ProfileFitTab({ candidate }) {
  return (
    <div className="space-y-5">
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
        <FitVisualization candidate={candidate} />
        <MatchAdvisorPanel candidate={candidate} />
      </div>
      <ProfileStatsRail stats={candidate.profileStats} />
    </div>
  )
}

function TrustBadge({ label = 'Verified', tone = 'green' }) {
  const tones = {
    green: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
    blue: 'bg-blue-50 text-blue-700 ring-blue-100',
    violet: 'bg-violet-50 text-violet-700 ring-violet-100',
    slate: 'bg-slate-50 text-slate-600 ring-slate-100',
  }

  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${tones[tone]}`}>{label}</span>
}

function ProgressBar({ value, tone = 'blue' }) {
  const fills = {
    blue: 'from-blue-500 to-sky-400',
    green: 'from-emerald-500 to-teal-400',
    violet: 'from-violet-500 to-indigo-400',
  }

  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
      <div className={`h-full rounded-full bg-gradient-to-r ${fills[tone]}`} style={{ width: `${value}%` }} />
    </div>
  )
}

function IntelligenceHeader({ title, subtitle, action }) {
  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h3 className="text-base font-semibold text-slate-950">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-slate-500">{subtitle}</p>
      </div>
      {action}
    </div>
  )
}

function makeSkillGroups(candidate) {
  const evidenceSkills = candidate.evidenceTrace.map((item) => item.skill)
  const primary = candidate.topSkills[0] || evidenceSkills[0] || 'Role fundamentals'
  const secondary = candidate.topSkills[1] || evidenceSkills[1] || 'Analysis'
  const tertiary = candidate.topSkills[2] || evidenceSkills[2] || 'Communication'

  return [
    {
      group: 'Core Technical',
      tone: 'blue',
      skills: [
        { name: primary, note: 'Advanced execution in role-critical workflows', confidence: Math.min(candidate.match + 3, 96), verification: 'Verified', evidence: 3, lastUsed: '2 weeks ago', trace: `Connected to ${candidate.evidenceTrace[0]?.source || candidate.projects[0]?.title}. Review the source artifact before technical screen.` },
        { name: candidate.targetRole.includes('Frontend') ? 'TypeScript' : 'Python', note: 'Applied in project implementation and analysis notes', confidence: Math.max(candidate.match - 8, 76), verification: 'Assessed', evidence: 2, lastUsed: '1 month ago', trace: 'Assessment score and project comments show working fluency, not only keyword mention.' },
      ],
    },
    {
      group: 'Analytics & BI',
      tone: 'green',
      skills: [
        { name: secondary, note: 'Turns raw signals into decision-ready outputs', confidence: Math.max(candidate.match - 4, 78), verification: 'Verified', evidence: 3, lastUsed: '3 weeks ago', trace: `Backed by ${candidate.evidenceTrace[1]?.source || 'project evidence'} and recent activity.` },
        { name: 'Data Modelling', note: 'Can structure metrics, dimensions, and reporting logic', confidence: Math.max(candidate.match - 12, 72), verification: 'Inferred', evidence: 2, lastUsed: '2 months ago', trace: 'Inferred from project architecture, dashboard notes, and data cleaning workflow.' },
      ],
    },
    {
      group: 'Communication',
      tone: 'violet',
      skills: [
        { name: 'Stakeholder Reporting', note: 'Explains work in business language', confidence: Math.max(candidate.match - 18, 68), verification: 'Inferred', evidence: 2, lastUsed: '1 month ago', trace: 'Evidence exists, but live walkthrough would improve hiring confidence.' },
      ],
    },
    {
      group: 'Product / Business',
      tone: 'amber',
      skills: [
        { name: tertiary, note: 'Maps work to user or business outcomes', confidence: Math.max(candidate.match - 10, 74), verification: 'Verified', evidence: 2, lastUsed: '2 weeks ago', trace: `Supported by ${candidate.projects[0]?.title || 'portfolio project'} and fit reasoning.` },
      ],
    },
  ]
}

function verificationTone(verification) {
  if (verification === 'Verified') return 'green'
  if (verification === 'Assessed') return 'violet'
  return 'blue'
}

function TabCta({ title, description, action }) {
  return (
    <div className="mt-4 flex flex-col gap-3 rounded-[8px] border border-slate-200 bg-slate-50/60 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-semibold text-slate-950">{title}</p>
        <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
      </div>
      <button className="inline-flex h-10 shrink-0 items-center justify-center rounded-[8px] bg-blue-600 px-4 text-sm font-semibold text-white hover:bg-blue-700" type="button">
        {action}
      </button>
    </div>
  )
}

function SkillsTab({ candidate }) {
  const [selectedGroup, setSelectedGroup] = useState('Core Technical')
  const [expandedSkill, setExpandedSkill] = useState(null)
  const groups = makeSkillGroups(candidate)
  const activeGroup = groups.find((group) => group.group === selectedGroup) || groups[0]
  const [leadSkill, ...supportingSkills] = activeGroup.skills

  return (
    <div>
      <IntelligenceHeader
        title="Skill Intelligence"
        subtitle={`Role-critical skills are weighted by confidence, evidence depth, and recency for ${candidate.targetRole}.`}
        action={<div className="flex rounded-[8px] border border-slate-200 bg-white p-1 text-sm"><button className="rounded-md bg-blue-50 px-3 py-1.5 font-medium text-blue-700" type="button">Skill groups</button><button className="px-3 py-1.5 text-slate-500" type="button">All skills</button></div>}
      />
      <div className="grid gap-4 lg:grid-cols-[260px_minmax(0,1fr)]">
        <div className="overflow-hidden rounded-[8px] border border-slate-200 bg-white">
          {groups.map((group) => (
            <button
              key={group.group}
              className={`flex w-full items-center justify-between border-b border-slate-100 px-4 py-4 text-left text-sm last:border-b-0 ${group.group === activeGroup.group ? 'bg-blue-50/55 text-slate-950' : 'text-slate-600 hover:bg-slate-50'}`}
              type="button"
              onClick={() => setSelectedGroup(group.group)}
            >
              <span className="font-medium">{group.group}</span>
              <span className="rounded-full bg-white px-2 py-0.5 text-xs text-slate-500 ring-1 ring-slate-200">{group.skills.length}</span>
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {leadSkill ? (
            <article className="rounded-[8px] border border-blue-200 bg-blue-50/45 p-4">
              <div className="grid gap-4 lg:grid-cols-[minmax(180px,0.8fr)_minmax(0,1.2fr)_170px] lg:items-center">
                <div>
                  <p className="text-xs font-medium text-blue-700">Lead signal</p>
                  <h4 className="mt-1 text-base font-semibold text-slate-950">{leadSkill.name}</h4>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{leadSkill.note}</p>
                </div>
                <div>
                  <div className="mb-2 flex items-center justify-between text-xs text-slate-600">
                    <span>Role-critical confidence</span>
                    <span className="font-medium text-slate-800">{leadSkill.confidence}%</span>
                  </div>
                  <ProgressBar value={leadSkill.confidence} tone="blue" />
                  <p className="mt-2 text-xs leading-5 text-slate-600">{leadSkill.trace}</p>
                </div>
                <div className="rounded-[8px] border border-blue-100 bg-white p-3">
                  <TrustBadge label={leadSkill.verification} tone={verificationTone(leadSkill.verification)} />
                  <p className="mt-3 text-sm font-medium text-slate-950">{leadSkill.evidence} linked evidence</p>
                  <p className="mt-1 text-xs text-slate-500">Last used {leadSkill.lastUsed}</p>
                </div>
              </div>
            </article>
          ) : null}

          <div className="overflow-hidden rounded-[8px] border border-slate-200 bg-white">
            <div className="hidden grid-cols-[minmax(180px,0.85fr)_minmax(0,1.15fr)_170px] gap-4 border-b border-slate-100 bg-slate-50/70 px-4 py-3 text-xs font-medium text-slate-500 lg:grid">
              <span>Signal</span><span>Proof</span><span>Trust / action</span>
            </div>
          {supportingSkills.map((skill) => {
            const expanded = expandedSkill === skill.name
            return (
              <div key={skill.name} className="border-b border-slate-100 last:border-b-0">
                <button
                  className="grid w-full gap-3 px-4 py-4 text-left hover:bg-slate-50/70 lg:grid-cols-[minmax(180px,0.85fr)_minmax(0,1.15fr)_170px] lg:items-center"
                  type="button"
                  onClick={() => setExpandedSkill(expanded ? null : skill.name)}
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-950">{skill.name}</p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">{skill.note}</p>
                  </div>
                  <div className="min-w-0">
                    <div className="mb-1.5 flex items-center justify-between text-xs text-slate-500">
                      <span>{skill.evidence} evidence - last used {skill.lastUsed}</span>
                      <span className="font-medium text-slate-700">{skill.confidence}%</span>
                    </div>
                    <ProgressBar value={skill.confidence} tone={activeGroup.tone === 'green' ? 'green' : 'blue'} />
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <TrustBadge label={skill.verification} tone={verificationTone(skill.verification)} />
                    <span className="text-slate-400">{expanded ? '^' : 'v'}</span>
                  </div>
                </button>
                {expanded ? (
                  <div className="bg-slate-50/60 px-4 pb-4 text-sm leading-6 text-slate-600">
                    <div className="rounded-[8px] border border-slate-200 bg-white p-3">
                      <span className="font-medium text-slate-800">Evidence trace: </span>{skill.trace}
                    </div>
                  </div>
                ) : null}
              </div>
            )
          })}
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-3 rounded-[8px] border border-slate-200 bg-white px-4 py-3 text-xs leading-5 text-slate-500">
        <TrustBadge label="Verified" tone="green" /> Verified by projects, assessments, or reviewed work
        <TrustBadge label="Inferred" tone="blue" /> Inferred from related evidence
        <TrustBadge label="Assessed" tone="violet" /> Tested through assessment
      </div>
      <TabCta
        title="Ready to validate role-critical skills"
        description={`Send a short assessment focused on ${leadSkill?.name || candidate.topSkills[0]} and the current evidence gap.`}
        action="Send technical assessment"
      />
    </div>
  )
}

function makeExperienceSignals(candidate) {
  const fallback = {
    title: candidate.targetRole.includes('Frontend') ? 'Product UI Contributor' : 'Business Intelligence Assistant',
    org: candidate.university,
    period: 'May 2024 - Aug 2024',
    impact: candidate.targetRole.includes('Frontend') ? 'Built reusable UI patterns for a campus product prototype.' : 'Built KPI tracking system for campus engagement reporting.',
  }

  return [...candidate.experience, fallback].slice(0, 3).map((item, index) => ({
    ...item,
    duration: index === 0 ? '4 months' : index === 1 ? '8 months' : '4 months',
    proof: index === 0 ? candidate.topSkills : index === 1 ? ['Communication', 'Leadership', candidate.topSkills[1] || 'Reporting'] : ['Reporting', candidate.topSkills[2] || 'Execution'],
    evidence: Math.max(2, candidate.evidenceCount - index - 7),
    detail: `This experience supports hiring confidence because it connects ${item.impact.toLowerCase()} to observable work artifacts and skill signals.`,
  }))
}

function ExperienceTab({ candidate }) {
  const [expanded, setExpanded] = useState(null)
  const items = makeExperienceSignals(candidate)

  return (
    <div>
      <IntelligenceHeader title="Career Story Timeline" subtitle="Experience is interpreted as evidence of role readiness, not only resume history." />
      <div className="grid gap-4 lg:grid-cols-[180px_minmax(0,1fr)]">
        <div className="relative hidden lg:block">
          <div className="absolute left-5 top-4 h-[calc(100%-2rem)] w-px bg-blue-100" />
          {items.map((item) => (
            <div key={`${item.title}-${item.period}`} className="relative mb-24 pl-12">
              <span className="absolute left-[13px] top-1 flex h-4 w-4 rounded-full border-2 border-blue-500 bg-white" />
              <p className="text-sm font-medium text-slate-700">{item.period}</p>
              <p className="mt-1 text-xs text-slate-500">{item.duration}</p>
            </div>
          ))}
        </div>
        <div className="space-y-3">
          {items.map((item, index) => {
            const open = expanded === index
            return (
              <article key={`${item.title}-${item.period}`} className="rounded-[8px] border border-slate-200 bg-white p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-950">{item.title}</p>
                    <p className="mt-1 text-sm text-slate-500">{item.org}</p>
                    <p className="mt-3 inline-flex rounded-[8px] bg-slate-50 px-3 py-1.5 text-sm leading-5 text-slate-700">{item.impact}</p>
                  </div>
                  <TrustBadge label="Verified" tone="green" />
                </div>
                <div className="mt-4 grid gap-4 sm:grid-cols-[minmax(0,1fr)_150px] sm:items-end">
                  <div>
                    <p className="text-xs font-medium text-slate-500">What this experience proves</p>
                    <div className="mt-2 flex flex-wrap gap-2">{item.proof.map((skill) => <SkillPill key={skill}>{skill}</SkillPill>)}</div>
                  </div>
                  <button className="flex items-center justify-between rounded-[8px] border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50" type="button" onClick={() => setExpanded(open ? null : index)}>
                    <span>{item.evidence} evidence</span><span>{open ? '^' : 'v'}</span>
                  </button>
                </div>
                {open ? <p className="mt-3 border-t border-slate-100 pt-3 text-sm leading-6 text-slate-600">{item.detail}</p> : null}
              </article>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function makeProjectShowcase(candidate) {
  return candidate.projects.map((project, index) => ({
    ...project,
    description: project.outcome,
    skills: index === 0 ? candidate.topSkills : [candidate.topSkills[1] || 'Analysis', 'Experimentation', 'Product sense'],
    impact: index === 0 ? 'Improves confidence in practical delivery and dashboard judgment.' : 'Shows analytical framing and business recommendation quality.',
    links: index === 0 ? ['Live demo', 'Repo', 'Notes'] : ['Notebook', 'Insight memo', 'Review notes'],
    proves: index === 0 ? ['Technical execution', 'Business insight', 'Evidence maturity'] : ['Analytical thinking', 'Experimentation', 'Product sense'],
    trust: Math.max(candidate.trustScore - index * 4, 82),
  }))
}

function ProjectsTab({ candidate }) {
  const projects = makeProjectShowcase(candidate)
  const primaryProject = projects[0]

  return (
    <div>
      <IntelligenceHeader title="Evidence-backed Project Showcase" subtitle="Projects are scored by artifact quality, business relevance, and traceability to role skills." />
      <div className="space-y-4">
        {projects.map((project, index) => (
          <article key={project.title} className="grid gap-4 rounded-[8px] border border-slate-200 bg-white p-4 lg:grid-cols-[180px_minmax(0,1fr)_92px]">
            <div className="h-32 rounded-[8px] border border-slate-200 bg-[linear-gradient(135deg,#0f172a,#1e40af_55%,#e0f2fe)] p-3">
              <div className="h-full rounded border border-white/10 bg-white/10 p-2">
                <div className="h-3 w-20 rounded bg-white/25" />
                <div className="mt-8 grid grid-cols-5 items-end gap-1">{[32, 58, 44, 70, 52].map((height) => <span key={`${project.title}-${height}`} className="rounded-sm bg-sky-300/80" style={{ height }} />)}</div>
              </div>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-950">{project.title}</p>
              <p className="mt-1 text-sm font-medium text-blue-600">{project.proof}</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">{project.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">{project.skills.map((skill) => <SkillPill key={skill}>{skill}</SkillPill>)}</div>
              <div className="mt-4 grid gap-3 border-t border-slate-100 pt-4 md:grid-cols-2">
                <div><p className="text-xs font-medium text-slate-500">Business impact</p><p className="mt-1 text-sm leading-6 text-slate-600">{project.impact}</p></div>
                <div><p className="text-xs font-medium text-slate-500">What this project proves</p><div className="mt-2 flex flex-wrap gap-2">{project.proves.map((item) => <TrustBadge key={item} label={item} tone="green" />)}</div></div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">{project.links.map((link) => <button key={link} className="rounded-full bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600 ring-1 ring-slate-200" type="button">{link}</button>)}</div>
            </div>
            <div className="flex items-start justify-end">
              <div className="rounded-[8px] bg-emerald-50 px-4 py-3 text-center ring-1 ring-emerald-100">
                <p className="text-lg font-semibold text-emerald-700">{project.trust}%</p>
                <p className="text-xs text-emerald-600">Trusted</p>
              </div>
            </div>
          </article>
        ))}
      </div>
      <TabCta
        title="Best next check: project walkthrough"
        description={`Ask ${candidate.name.split(' ')[0]} to walk through ${primaryProject?.title || 'the strongest project'} and explain the business decisions behind the artifact.`}
        action="Request walkthrough"
      />
    </div>
  )
}

function EvidenceTab({ candidate }) {
  const [expanded, setExpanded] = useState(null)
  const items = candidate.evidenceTrace.map((item, index) => ({
    ...item,
    type: index === 0 ? 'Project' : index === 1 ? 'Walkthrough' : 'Assessment',
    linked: candidate.projects[index % candidate.projects.length]?.title || candidate.experience[0]?.title,
    verifiedBy: index === 0 ? 'Verified by GitHub' : index === 1 ? 'Verified by mentor review' : 'Verified by CareerOS',
    date: index === 0 ? 'Mar 15, 2026' : index === 1 ? 'Mar 10, 2026' : 'Mar 05, 2026',
  }))

  return (
    <div>
      <IntelligenceHeader
        title="Evidence Verification Feed"
        subtitle="Every skill signal is traceable to a source, artifact, project, or reviewed experience."
        action={<button className="rounded-[8px] border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600" type="button">Newest first</button>}
      />
      <div className="mb-4 flex gap-2 overflow-x-auto text-sm">
        {['All evidence', 'Verified', 'Projects', 'Assessments', 'Work'].map((filter, index) => <button key={filter} className={`shrink-0 rounded-full px-3 py-1.5 ${index === 0 ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-100' : 'bg-white text-slate-500 ring-1 ring-slate-200'}`} type="button">{filter}</button>)}
      </div>
      <div className="space-y-3">
        {items.map((item, index) => {
          const open = expanded === index
          return (
            <article key={`${item.source}-${item.skill}`} className="rounded-[8px] border border-slate-200 bg-white">
              <button className="grid w-full gap-4 p-4 text-left hover:bg-slate-50/70 md:grid-cols-[56px_minmax(0,1fr)_90px_180px_24px] md:items-center" type="button" onClick={() => setExpanded(open ? null : index)}>
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-700 ring-1 ring-blue-100">{item.skill.slice(0, 2)}</span>
                <div><p className="text-sm font-semibold text-slate-950">{item.source}</p><p className="mt-1 text-sm leading-6 text-slate-600">{item.type} - Linked to {item.skill}</p><p className="text-xs text-slate-500">{item.detail}</p></div>
                <div className="rounded-[8px] bg-emerald-50 px-3 py-2 text-center ring-1 ring-emerald-100"><p className="text-sm font-semibold text-emerald-700">{item.confidence}%</p><p className="text-xs text-emerald-600">trusted</p></div>
                <div><p className="text-sm text-slate-700">{item.verifiedBy}</p><p className="mt-1 text-xs text-slate-500">{item.date}</p></div>
                <span className="text-slate-400">{open ? '^' : '>'}</span>
              </button>
              {open ? <div className="border-t border-slate-100 px-4 py-3 text-sm leading-6 text-slate-600"><span className="font-medium text-slate-800">Traceability: </span>{item.linked} confirms {item.skill} through reviewed artifact evidence. Recommended next check: ask candidate to explain the artifact decisions live.</div> : null}
            </article>
          )
        })}
      </div>
      <TabCta
        title="Verify the strongest source before moving forward"
        description={`Start with ${items[0]?.source || 'the highest-trust evidence'} because it carries the clearest role-critical signal.`}
        action="Verify source"
      />
    </div>
  )
}

function ActivityTab({ candidate }) {
  const items = candidate.activity.map((activity, index) => ({
    action: activity,
    signal: index === 0 ? `Strengthened ${candidate.topSkills[0]} evidence` : index === 1 ? `${candidate.topSkills[1] || 'Skill'} confidence increased` : `Added ${candidate.topSkills[2] || 'role'} signal`,
    impact: `+${Math.max(4 - index, 1)}% ${candidate.targetRole} confidence`,
    recency: index === 0 ? '2 hours ago' : index === 1 ? '1 day ago' : '3 days ago',
  }))

  return (
    <div>
      <IntelligenceHeader title="Career Signal Timeline" subtitle="Recent updates show how candidate evidence changes hiring confidence over time." action={<button className="rounded-[8px] border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600" type="button">All types</button>} />
      <div className="relative space-y-0 rounded-[8px] border border-slate-200 bg-white p-4">
        <div className="absolute bottom-8 left-10 top-8 w-px bg-blue-100" />
        {items.map((item) => (
          <div key={item.action} className="relative grid gap-3 border-b border-slate-100 py-4 pl-16 last:border-b-0 md:grid-cols-[minmax(0,1fr)_140px_100px] md:items-center">
            <span className="absolute left-4 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 ring-1 ring-blue-100"><span className="h-2 w-2 rounded-full bg-blue-500" /></span>
            <div><p className="text-sm font-semibold text-slate-950">{item.action}</p><p className="mt-1 text-sm leading-6 text-slate-600">{item.signal}</p></div>
            <TrustBadge label={item.impact} tone="green" />
            <p className="text-sm text-slate-500 md:text-right">{item.recency}</p>
          </div>
        ))}
      </div>
      <TabCta
        title="Use the latest signal to update next steps"
        description={`${items[0]?.action || 'Latest activity'} changed match confidence. Review whether this candidate should move to assessment or remain in review.`}
        action="Review latest signal"
      />
    </div>
  )
}

function DetailList({ items, type }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {items.map((item) => (
        <article key={`${item.title}-${item.org || item.proof}`} className="rounded-[8px] border border-slate-200 bg-white p-5">
          <p className="text-sm font-semibold text-slate-950">{item.title}</p>
          <p className="mt-1 text-xs font-medium leading-5 text-blue-600">{type === 'experience' ? `${item.org} - ${item.period}` : item.proof}</p>
          <p className="mt-3 text-sm font-normal leading-6 text-slate-600">{type === 'experience' ? item.impact : item.outcome}</p>
        </article>
      ))}
    </div>
  )
}

function TabPanel({ candidate, activeTab }) {
  if (activeTab === 'Profile Fit') return <ProfileFitTab candidate={candidate} />
  if (activeTab === 'Skills') return <SkillsTab candidate={candidate} />
  if (activeTab === 'Experience') return <ExperienceTab candidate={candidate} />
  if (activeTab === 'Projects') return <ProjectsTab candidate={candidate} />
  if (activeTab === 'Evidence') return <EvidenceTab candidate={candidate} />
  if (activeTab === 'Activity') return <ActivityTab candidate={candidate} />
  return <DetailList items={candidate.experience} type="experience" />
}

function CandidateWorkspace({ candidate, activeTab, shortlisted, onChangeTab, onToggleShortlist }) {
  return (
    <section className="min-w-0 overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-[0_18px_54px_rgba(15,23,42,0.05)]">
      <CandidateHeader candidate={candidate} shortlisted={shortlisted} onToggleShortlist={onToggleShortlist} />
      <TabNav activeTab={activeTab} onChange={onChangeTab} />
      <RecruiterDecisionStrip candidate={candidate} />
      <div className="bg-white px-5 py-5">
        <TabPanel candidate={candidate} activeTab={activeTab} />
      </div>
    </section>
  )
}

export default function EmployerWorkspacePage() {
  const [selectedCandidateId, setSelectedCandidateId] = useState(employerTalentWorkspace.candidates[0].id)
  const [activeTab, setActiveTab] = useState('Profile Fit')
  const [shortlistedIds, setShortlistedIds] = useState(
    () => new Set(employerTalentWorkspace.candidates.filter((candidate) => candidate.shortlisted).map((candidate) => candidate.id)),
  )

  const filteredCandidates = employerTalentWorkspace.candidates
  const selectedCandidate = filteredCandidates.find((candidate) => candidate.id === selectedCandidateId) || filteredCandidates[0] || employerTalentWorkspace.candidates[0]

  const toggleShortlist = (candidateId) => {
    setShortlistedIds((current) => {
      const next = new Set(current)
      if (next.has(candidateId)) next.delete(candidateId)
      else next.add(candidateId)
      return next
    })
  }

  return (
    <div className="mx-auto min-w-0 max-w-[1540px]">
      <div className="grid min-w-0 gap-4 md:grid-cols-[315px_minmax(0,1fr)]">
        <CandidateStream
          candidates={filteredCandidates}
          selectedId={selectedCandidate.id}
          shortlistedIds={shortlistedIds}
          onSelect={(candidateId) => {
            setSelectedCandidateId(candidateId)
            setActiveTab('Profile Fit')
          }}
          onToggleShortlist={toggleShortlist}
        />
        <CandidateWorkspace
          candidate={selectedCandidate}
          activeTab={activeTab}
          shortlisted={shortlistedIds.has(selectedCandidate.id)}
          onChangeTab={setActiveTab}
          onToggleShortlist={() => toggleShortlist(selectedCandidate.id)}
        />
      </div>
    </div>
  )
}
