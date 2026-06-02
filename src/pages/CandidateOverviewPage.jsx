import React from 'react'
import AICareerInsightCard from '../components/student/overview/AICareerInsightCard'
import ApplicationTrackerCard from '../components/student/overview/ApplicationTrackerCard'
import BottomAIInputBar from '../components/student/overview/BottomAIInputBar'
import CareerActionList from '../components/student/overview/CareerActionList'
import CareerSignalTimeline from '../components/student/overview/CareerSignalTimeline'
import CareerSnapshotCard, { SnapshotChip } from '../components/student/overview/CareerSnapshotCard'
import RecentCareerMemoryCard from '../components/student/overview/RecentCareerMemoryCard'
import RecommendedForYouCard from '../components/student/overview/RecommendedForYouCard'
import ResearchInterestsCard from '../components/student/overview/ResearchInterestsCard'
import SkillGapAnalysisCard from '../components/student/overview/SkillGapAnalysisCard'
import TopCareerPathsCard from '../components/student/overview/TopCareerPathsCard'
import { candidateOverview } from '../data/mockData'

export default function CandidateOverviewPage() {
  const data = candidateOverview

  return (
    <div className="min-h-full bg-[radial-gradient(circle_at_top_right,#f2ecff,transparent_26%),linear-gradient(135deg,#ffffff_0%,#fbfaff_46%,#f7f4ff_100%)] pb-2 text-[#11104a]">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
        <main className="min-w-0 space-y-6">
          <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Good morning, Shirley! &#128075;</h1>
              <p className="mt-2 text-sm font-medium text-slate-500">Here's your Career OS summary for today.</p>
            </div>
            <button type="button" className="h-12 w-fit rounded-2xl bg-violet-600 px-6 text-sm font-bold text-white shadow-lg shadow-violet-200">
              Ask Career OS
            </button>
          </header>

          <section className="grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
            <CareerSnapshotCard title="Career Readiness" footer="View details -&gt;">
              <div className="flex items-center gap-4">
                <div className="grid h-24 w-24 place-items-center rounded-full border-[10px] border-violet-200 border-t-violet-600 text-2xl font-bold">
                  {data.careerSnapshot.readiness}%
                </div>
                <div>
                  <p className="text-3xl font-bold">{data.careerSnapshot.readiness}%</p>
                  <p className="mt-1 text-xs font-medium text-slate-500">Good progress</p>
                </div>
              </div>
            </CareerSnapshotCard>

            <CareerSnapshotCard title="Key Strengths" footer="View all -&gt;" accent="emerald">
              <div className="flex flex-wrap gap-2">
                {data.careerSnapshot.keyStrengths.map((skill) => <SnapshotChip key={skill}>{skill}</SnapshotChip>)}
              </div>
            </CareerSnapshotCard>

            <CareerSnapshotCard title="Skills in Demand" footer="View all -&gt;" accent="blue">
              <div className="flex flex-wrap gap-2">
                {data.careerSnapshot.skillsInDemand.map((skill) => <SnapshotChip key={skill}>{skill}</SnapshotChip>)}
              </div>
            </CareerSnapshotCard>

            <CareerSnapshotCard title="Career Evidence" footer="View evidence -&gt;" accent="purple">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-4xl font-bold">{data.careerSnapshot.careerEvidence.total}</p>
                  <p className="mt-2 text-xs font-medium text-slate-500">{data.careerSnapshot.careerEvidence.label}</p>
                </div>
                <span className="rounded-xl bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                  {data.careerSnapshot.careerEvidence.change}
                </span>
              </div>
            </CareerSnapshotCard>
          </section>

          <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(360px,0.9fr)]">
            <CareerActionList actions={data.todayActions} />
            <CareerSignalTimeline signals={data.careerSignalTimeline} />
          </section>

          <section className="grid gap-5 xl:grid-cols-3">
            <TopCareerPathsCard paths={data.topCareerPaths} />
            <SkillGapAnalysisCard gaps={data.skillGaps} />
            <ApplicationTrackerCard tracker={data.applicationTracker} />
          </section>

          <section className="rounded-3xl border border-violet-100/80 bg-white/90 p-5 shadow-[0_18px_44px_rgba(88,63,188,0.08)]">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold">Recent Career Memories</h2>
              <button type="button" className="text-sm font-semibold text-violet-700">View all memories -&gt;</button>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
              {data.recentCareerMemories.map((memory) => (
                <RecentCareerMemoryCard key={memory.title} memory={memory} />
              ))}
            </div>
          </section>

          <BottomAIInputBar />
        </main>

        <aside className="space-y-5 xl:sticky xl:top-6 xl:self-start">
          <ResearchInterestsCard interests={data.researchInterests} />
          <RecommendedForYouCard recommendations={data.recommendations} />
          <AICareerInsightCard insight={data.aiCareerInsight} />
        </aside>
      </div>
    </div>
  )
}
