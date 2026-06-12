import React from 'react'
import ApplicationTrackerCard from '../components/student/overview/ApplicationTrackerCard'
import BottomAIInputBar from '../components/student/overview/BottomAIInputBar'
import CareerActionList from '../components/student/overview/CareerActionList'
import CareerReadinessCard from '../components/student/overview/CareerReadinessCard'
import RecommendedForYouCard from '../components/student/overview/RecommendedForYouCard'
import ResearchInterestsCard from '../components/student/overview/ResearchInterestsCard'
import SkillGapAnalysisCard from '../components/student/overview/SkillGapAnalysisCard'
import TopCareerPathsCard from '../components/student/overview/TopCareerPathsCard'
import { candidateOverview } from '../data/mockData'

export default function CandidateOverviewPage() {
  const data = candidateOverview

  return (
    <div className="min-h-full pb-2 text-[#11104a]">
      <div className="grid gap-6 2xl:grid-cols-[minmax(0,1fr)_300px]">
        <main className="min-w-0 space-y-6">
          <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Good morning, Chris! &#128075;</h1>
              <p className="mt-2 text-sm font-medium text-slate-500">Here's your Career OS summary for this month.</p>
            </div>
            <button type="button" className="h-12 w-fit rounded-2xl bg-violet-600 px-6 text-sm font-bold text-white shadow-lg shadow-violet-200 transition-all duration-200 hover:bg-violet-700 hover:shadow-violet-300">
              Ask Career OS
            </button>
          </header>

          {/* Career Readiness — merged card (replaces 4 snapshot cards) */}
          <CareerReadinessCard data={data} />

          {/* Monthly Career Actions — full-width (Career Signal Timeline removed) */}
          <CareerActionList actions={data.todayActions} />

          {/* Career Paths + Skill Gaps + Application Tracker */}
          <section className="grid gap-5 xl:grid-cols-3">
            <TopCareerPathsCard paths={data.topCareerPaths} />
            <SkillGapAnalysisCard gaps={data.skillGaps} />
            <ApplicationTrackerCard tracker={data.applicationTracker} />
          </section>

          <BottomAIInputBar />
        </main>

        {/* Sidebar — AI Insight removed, keep Research + Recommended */}
        <aside className="grid gap-5 md:grid-cols-2 2xl:sticky 2xl:top-6 2xl:block 2xl:self-start 2xl:space-y-5">
          <ResearchInterestsCard interests={data.researchInterests} />
          <RecommendedForYouCard recommendations={data.recommendations} />
        </aside>
      </div>
    </div>
  )
}
