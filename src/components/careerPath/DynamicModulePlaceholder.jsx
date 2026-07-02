import React from 'react'

function EmptyState() {
  return (
    <div className="flex min-h-[140px] items-center justify-center rounded-xl border border-dashed border-slate-300 bg-gray-50/60 p-8 text-center">
      <p className="text-sm font-medium italic text-[#9aa6c3]">
        Select a role above to see your fit score, roadmap, and market demand
      </p>
    </div>
  )
}

function FitModule() {
  return (
    <article className="animate-[slideUp_300ms_ease-out_both] rounded-2xl border border-[#e2eaf8] border-l-[3px] border-l-[#185FA5] bg-white p-6 shadow-[0_8px_22px_rgba(44,76,142,0.07)]">
      <h3 className="text-base font-bold text-[#11194a]">Fit Score · Software Engineer</h3>
      <div className="mt-5 grid gap-6 md:grid-cols-[0.8fr_1.25fr_0.95fr]">
        <div>
          <p className="text-5xl font-bold text-[#185FA5]">78%</p>
          <p className="mt-1 text-sm font-medium text-[#7382a1]">match score</p>
        </div>
        <div className="space-y-4 border-y border-[#e2eaf8] py-4 md:border-x md:border-y-0 md:px-6 md:py-0">
          <div>
            <p className="text-sm font-bold text-[#11194a]">Strong signals</p>
            <p className="mt-2 text-sm font-medium text-[#3a4669]"><span className="text-emerald-500">●</span> Python · Leadership · NLP · Agile</p>
          </div>
          <div>
            <p className="text-sm font-bold text-[#11194a]">Gaps detected</p>
            <p className="mt-2 text-sm font-medium text-[#3a4669]"><span className="text-orange-500">●</span> System Design · DSA · Cloud Infrastructure</p>
          </div>
        </div>
        <div>
          <div className="flex h-28 items-end justify-center gap-8">
            <div className="text-center">
              <p className="mb-2 text-sm font-bold text-[#11194a]">78%</p>
              <div className="h-20 w-14 rounded-t-md bg-blue-600" />
              <p className="mt-2 text-xs font-medium text-[#7382a1]">Chris</p>
            </div>
            <div className="text-center">
              <p className="mb-2 text-sm font-bold text-[#11194a]">65%</p>
              <div className="h-16 w-14 rounded-t-md bg-slate-200" />
              <p className="mt-2 text-xs font-medium text-[#7382a1]">Avg. SWE</p>
            </div>
          </div>
          <p className="mt-3 text-center text-xs font-medium text-[#7382a1]">You vs. average SWE candidate</p>
        </div>
      </div>
      <button type="button" className="mt-5 text-sm font-bold text-blue-600 hover:text-blue-700">How do I close these gaps? →</button>
    </article>
  )
}

function Bar({ value, tone = 'emerald' }) {
  return (
    <div className="mt-2 h-2 rounded-full bg-slate-100">
      <div className={`h-full rounded-full ${tone === 'orange' ? 'bg-orange-400' : 'bg-emerald-500'}`} style={{ width: `${value}%` }} />
    </div>
  )
}

function SkillsModule() {
  const have = [['Python', 'Expert', 85], ['Leadership', 'Strong', 80], ['NLP', 'Strong', 75], ['Agile', 'Familiar', 55]]
  const gaps = [['System Design', 'High demand · Critical gap', 20], ['DSA', 'Required for interviews', 30], ['Cloud (AWS/GCP)', 'Growing requirement', 10]]
  return (
    <article className="animate-[slideUp_300ms_ease-out_both] rounded-2xl border border-[#e2eaf8] bg-white p-6 shadow-[0_8px_22px_rgba(44,76,142,0.07)]">
      <h3 className="text-base font-bold text-[#11194a]">Skills Required · Software Engineer</h3>
      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <div>
          <p className="mb-3 text-sm font-bold text-emerald-600">You have these ✓</p>
          {have.map(([skill, level, value]) => (
            <div key={skill} className="mb-4">
              <p className="text-sm font-semibold text-[#3a4669]">✓ {skill} · {level}</p>
              <Bar value={value} />
            </div>
          ))}
        </div>
        <div>
          <p className="mb-3 text-sm font-bold text-orange-600">Build these next</p>
          {gaps.map(([skill, note, value]) => (
            <div key={skill} className="mb-4">
              <p className="text-sm font-semibold text-[#3a4669]">● {skill}</p>
              <p className="text-xs font-medium text-[#7382a1]">{note}</p>
              <Bar value={value} tone="orange" />
            </div>
          ))}
        </div>
      </div>
    </article>
  )
}

function RoadmapModule() {
  const stages = [
    ['Foundation', 'CS Fundamentals + DSA', 'Complete', 'emerald'],
    ['Build', 'Full-Stack Projects', 'In progress · 60%', 'blue'],
    ['Specialise', 'Choose: Frontend or Backend track', 'Up next', 'slate'],
    ['Apply', 'Target 3 internships · 1 hackathon', '~4 months away', 'slate'],
  ]
  return (
    <article className="animate-[slideUp_300ms_ease-out_both] rounded-2xl border border-[#e2eaf8] bg-white p-6 shadow-[0_8px_22px_rgba(44,76,142,0.07)]">
      <h3 className="text-base font-bold text-[#11194a]">Your Roadmap · Software Engineer</h3>
      <div className="mt-6 grid gap-4 md:grid-cols-4">
        {stages.map(([title, body, status, tone], index) => (
          <div key={title} className="relative rounded-xl border border-[#e2eaf8] bg-[#f8fbff] p-4">
            {index < stages.length - 1 && <span className="absolute left-[calc(100%-4px)] top-8 hidden h-[2px] w-4 bg-blue-200 md:block" />}
            <span className={`mb-3 flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white ${tone === 'emerald' ? 'bg-emerald-500' : tone === 'blue' ? 'bg-blue-600 ring-4 ring-blue-100' : 'bg-slate-300'}`}>
              {tone === 'emerald' ? '✓' : index + 1}
            </span>
            <p className="font-bold text-[#11194a]">{title}</p>
            <p className="mt-1 text-sm font-medium text-[#3a4669]">{body}</p>
            <p className="mt-3 text-xs font-bold text-[#7382a1]">{status}</p>
          </div>
        ))}
      </div>
    </article>
  )
}

function DemandModule() {
  const companies = [['Grab', 85], ['Shopee', 72], ['TalentBank', 68], ['CIMB', 55], ['Axiata', 48]]
  return (
    <article className="animate-[slideUp_300ms_ease-out_both] rounded-2xl border border-[#e2eaf8] bg-white p-6 shadow-[0_8px_22px_rgba(44,76,142,0.07)]">
      <h3 className="text-base font-bold text-[#11194a]">Market Demand · Software Engineer</h3>
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {[
          ['Open roles in Malaysia', '2,847', '↑ 23% this year'],
          ['Avg. starting salary', 'RM 4,200/mo', 'Entry level'],
          ['Your edge', 'NLP skills', '↑ +34% demand'],
        ].map(([label, value, note]) => (
          <div key={label} className="rounded-xl border border-[#e2eaf8] bg-[#f8fbff] p-4">
            <p className="text-xs font-semibold text-[#7382a1]">{label}</p>
            <p className="mt-1 text-xl font-bold text-[#11194a]">{value}</p>
            <p className={`mt-1 text-xs font-bold ${note.includes('Entry') ? 'text-blue-600' : 'text-emerald-600'}`}>{note}</p>
          </div>
        ))}
      </div>
      <div className="mt-5">
        <p className="mb-3 text-sm font-bold text-[#11194a]">Top hiring companies in Malaysia</p>
        {companies.map(([name, value]) => (
          <div key={name} className="mb-3 grid grid-cols-[90px_minmax(0,1fr)] items-center gap-3">
            <p className="text-sm font-semibold text-[#3a4669]">{name}</p>
            <Bar value={value} />
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs font-medium text-[#9aa6c3]">Based on LinkedIn + JobStreet data · Updated this week</p>
    </article>
  )
}

export default function DynamicModulePlaceholder({ activeModule }) {
  if (activeModule === 'fit') return <FitModule />
  if (activeModule === 'skills') return <SkillsModule />
  if (activeModule === 'roadmap') return <RoadmapModule />
  if (activeModule === 'demand') return <DemandModule />
  return <EmptyState />
}
