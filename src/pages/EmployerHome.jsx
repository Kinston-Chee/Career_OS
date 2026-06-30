import React from 'react'
import { Command, Sparkles } from 'lucide-react'
import EmployerNav from '../components/employer/EmployerNav'
import AIBriefingCard from '../components/employer/AIBriefingCard'
import AIActionQueue from '../components/employer/AIActionQueue'
import MetricsPillRow from '../components/employer/MetricsPillRow'
import TopCandidatesCard from '../components/employer/TopCandidatesCard'
import CampusPipelineFunnel from '../components/employer/CampusPipelineFunnel'
import AIOpportunityRadar from '../components/employer/AIOpportunityRadar'
import { employerUser } from '../data/employerMockData'

function PageHeader() {
  return (
    <div className="employer-home-header flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="flex items-center gap-2 text-2xl font-semibold text-slate-950">
          <span className="employer-home-header-icon" aria-hidden="true">
            <Sparkles className="h-4 w-4" />
          </span>
          {employerUser.greeting}
        </h1>
        <p className="mt-1 text-sm text-slate-500">Here&rsquo;s your AI briefing for {employerUser.briefingDate}</p>
      </div>

      <div className="relative w-full max-w-xl">
        <Sparkles className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#185FA5]" />
        <input
          type="text"
          placeholder="Find me software engineering interns from Taylor's or APU available after June..."
          className="employer-home-command h-11 w-full pl-11 pr-16 text-sm text-slate-700 outline-none placeholder:text-slate-400"
        />
        <span className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-0.5 rounded-md bg-white/70 px-1.5 py-0.5 text-[10px] font-medium text-slate-400 ring-1 ring-slate-200/70">
          <Command className="h-3 w-3" /> K
        </span>
      </div>
    </div>
  )
}

export default function EmployerHome() {
  return (
    <div className="employer-home-page flex h-screen w-screen flex-col overflow-hidden">
      <EmployerNav variant="glass" />
      <main className="min-w-0 flex-1 overflow-y-auto">
        <div className="relative z-10 mx-auto max-w-[1480px] space-y-5 px-6 py-6">
          <PageHeader />

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_320px]">
            <AIBriefingCard />
            <AIActionQueue />
          </div>

          <MetricsPillRow />

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[2fr_1.6fr_1.3fr]">
            <TopCandidatesCard />
            <CampusPipelineFunnel />
            <AIOpportunityRadar />
          </div>
        </div>
      </main>
    </div>
  )
}
