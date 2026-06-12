import React, { useState } from 'react';
import { BarChart3, BriefcaseBusiness, LineChart } from 'lucide-react';
import CareerPathComparison from '../components/career/CareerPathComparison';
import CareerPathDetail from '../components/career/CareerPathDetail';
import CareerPathNetworkGraph from '../components/career/network/CareerPathNetworkGraph';
import MarketStanding from '../components/career/MarketStanding';
import RecommendedActions from '../components/career/RecommendedActions';
import SkillSummaryTab from '../components/career/SkillSummaryTab';
import TabNav from '../components/career/TabNav';
import { careerPathNetwork, careerPaths } from '../data/mockData';

const tabs = [
  { id: 'skill-summary', label: 'Skills', icon: BarChart3 },
  { id: 'career-paths', label: 'Career Path', icon: BriefcaseBusiness },
  { id: 'market-standing', label: 'Market Insights', icon: LineChart },
];

function CareerPathsTab() {
  const [selectedPathId, setSelectedPathId] = useState(careerPaths[0].id);
  const selectedPath = careerPaths.find((path) => path.id === selectedPathId) ?? careerPaths[0];
  const fallbackSteps = careerPaths[0].roadmapSteps;

  return (
    <div className="space-y-6">
      {/* Career Network — keep, it's excellent */}
      <CareerPathNetworkGraph
        network={careerPathNetwork}
        selectedPathId={selectedPath.id}
        onSelectPath={setSelectedPathId}
      />

      {/* Career Path Comparison — new, replaces sidebar cards */}
      <CareerPathComparison
        paths={careerPaths}
        selectedPathId={selectedPath.id}
        onSelectPath={setSelectedPathId}
      />

      {/* Selected Path Detail — simplified inline */}
      <CareerPathDetail path={selectedPath} fallbackSteps={fallbackSteps} />

      {/* Recommended Actions — replaces NextActionCard + filler */}
      <RecommendedActions />
    </div>
  );
}

export default function CareerIntelligencePage() {
  const [activeTab, setActiveTab] = useState('skill-summary');

  return (
    <div className="w-full">
      <header className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Career Intelligence</h2>
          <p className="mt-1 text-sm text-slate-500">AI-powered insights for your career growth.</p>
        </div>
      </header>

      <section className="rounded-3xl border border-slate-200/80 bg-white/70 p-4 shadow-[0_18px_50px_rgba(15,23,42,0.04)] backdrop-blur-xl sm:p-5">
        <TabNav tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="mt-5">
          {activeTab === 'skill-summary' && <SkillSummaryTab />}
          {activeTab === 'career-paths' && <CareerPathsTab />}
          {activeTab === 'market-standing' && <MarketStanding />}
        </div>
      </section>
    </div>
  );
}
