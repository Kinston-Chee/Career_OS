import React, { useState } from 'react'
import AIInsightCard from '../components/career/AIInsightCard'
import CareerPathDetail from '../components/career/CareerPathDetail'
import CareerPathNetworkGraph from '../components/career/network/CareerPathNetworkGraph'
import MarketDemandCard from '../components/career/MarketDemandCard'
import MarketStanding from '../components/career/MarketStanding'
import MissingSkillItem from '../components/career/MissingSkillItem'
import PathOverviewCard from '../components/career/PathOverviewCard'
import RadarChartMock from '../components/career/RadarChartMock'
import ReadinessGauge from '../components/career/ReadinessGauge'
import SalaryBenchmarkCard from '../components/career/SalaryBenchmarkCard'
import SkillProgressBar from '../components/career/SkillProgressBar'
import TabNav from '../components/career/TabNav'
import NextActionCard from '../components/career/NextActionCard'
import Card from '../components/ui/Card'
import { careerIntelligence, careerPathNetwork, careerPaths, marketStanding } from '../data/mockData'

const tabs = [
  { id: 'skill-summary', label: 'Skill Summary', icon: 'S' },
  { id: 'career-paths', label: 'Career Path', icon: 'P' },
  { id: 'market-standing', label: 'Market Standing', icon: 'M' },
]

function PlaceholderTab({ children }) {
  return (
    <Card className="bg-white/90 p-10 text-center shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
      <p className="text-base font-semibold text-slate-700">{children}</p>
    </Card>
  )
}

function SkillSummaryTab() {
  return (
    <div className="space-y-5">
      <section className="grid gap-5 xl:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)]">
        <Card className="rounded-2xl border-slate-200/80 bg-white/95 p-5 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
          <h3 className="text-base font-semibold text-slate-950">Skill Readiness by Category</h3>
          <RadarChartMock data={careerIntelligence.skillCategories} />
        </Card>

        <Card className="rounded-2xl border-slate-200/80 bg-white/95 p-5 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
          <h3 className="text-base font-semibold text-slate-950">Overall Readiness</h3>
          <ReadinessGauge
            value={careerIntelligence.readinessScore}
            label={careerIntelligence.readinessLabel}
            text={careerIntelligence.readinessText}
          />
        </Card>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <Card className="rounded-2xl border-slate-200/80 bg-white/95 p-5 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
          <h3 className="text-base font-semibold text-slate-950">Strong Skills</h3>
          <div className="mt-6 space-y-5">
            {careerIntelligence.strongSkills.map((skill) => (
              <SkillProgressBar key={skill.label} label={skill.label} value={skill.value} />
            ))}
          </div>
          <button type="button" className="mt-5 text-sm font-semibold text-blue-600 hover:text-blue-700">
            View all -&gt;
          </button>
        </Card>

        <Card className="rounded-2xl border-slate-200/80 bg-white/95 p-5 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
          <h3 className="text-base font-semibold text-slate-950">Missing Skills for Data Analyst</h3>
          <div className="mt-3">
            {careerIntelligence.missingSkills.map((skill) => (
              <MissingSkillItem key={skill.label} skill={skill} />
            ))}
          </div>
          <button type="button" className="mt-4 flex w-full justify-end text-sm font-semibold text-blue-600 hover:text-blue-700">
            View market evidence -&gt;
          </button>
        </Card>
      </section>

      <AIInsightCard insight={careerIntelligence.aiInsight} />
    </div>
  )
}

function CareerPathsTab() {
  const [selectedPathId, setSelectedPathId] = useState(careerPaths[0].id)
  const selectedPath = careerPaths.find((path) => path.id === selectedPathId) ?? careerPaths[0]
  const fallbackSteps = careerPaths[0].roadmapSteps

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
      <main className="min-w-0 space-y-5">
        <CareerPathNetworkGraph
          network={careerPathNetwork}
          selectedPathId={selectedPath.id}
          onSelectPath={setSelectedPathId}
        />

        <CareerPathDetail path={selectedPath} fallbackSteps={fallbackSteps} />
      </main>

      <aside className="space-y-5 xl:sticky xl:top-28 xl:self-start">
        <PathOverviewCard path={selectedPath} />
        <MarketDemandCard />
        <SalaryBenchmarkCard />
        <NextActionCard />
        <AIInsightCard
          title="AI Career Coach Tip"
          insight={{
            text: 'Focus on building 2-3 portfolio projects. Employers love to see real-world impact.',
          }}
        />
      </aside>
    </div>
  )
}

export default function CareerIntelligencePage() {
  const [activeTab, setActiveTab] = useState('market-standing')

  return (
    <div className="w-full">
      <header className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Career Intelligence</h2>
          <p className="mt-1 text-sm text-slate-500">AI-powered insights for your career growth.</p>
        </div>
        <div className="flex items-center gap-3">
          <label className="relative hidden sm:block">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">Search</span>
            <input
              className="h-11 w-72 rounded-full border border-slate-200 bg-white/90 pl-20 pr-4 text-sm outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-300 focus:ring-4 focus:ring-blue-50"
              placeholder="anything..."
            />
          </label>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-500 shadow-sm transition-all duration-200 hover:text-blue-700"
            aria-label="Notifications"
          >
            !
          </button>
        </div>
      </header>

      <section className="rounded-3xl border border-slate-200/80 bg-white/70 p-4 shadow-[0_18px_50px_rgba(15,23,42,0.04)] backdrop-blur-xl sm:p-5">
        <TabNav tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="mt-5">
          {activeTab === 'skill-summary' && <SkillSummaryTab />}
          {activeTab === 'career-paths' && <CareerPathsTab />}
          {activeTab === 'market-standing' && <MarketStanding data={marketStanding} />}
        </div>
      </section>
    </div>
  )
}
