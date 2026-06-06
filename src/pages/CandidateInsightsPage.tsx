import React, { useState } from 'react';
// @ts-ignore
import DonutChartMock from '../components/employer/DonutChartMock';
// @ts-ignore
import EmployerAIInsightCard from '../components/employer/EmployerAIInsightCard';
// @ts-ignore
import HorizontalBarChartMock from '../components/employer/HorizontalBarChartMock';
// @ts-ignore
import OnboardingTrackerCard from '../components/employer/OnboardingTrackerCard';
// @ts-ignore
import PipelineColumn from '../components/employer/PipelineColumn';
// @ts-ignore
import StatCard from '../components/employer/StatCard';
// @ts-ignore
import ValidationRequestsTable from '../components/employer/ValidationRequestsTable';
import Card from '../components/ui/Card';
import { employerCandidateInsights, employerTalentWorkspace } from '../data/mockData';
import { useEmployerSearchStore } from '../store/useEmployerSearchStore';



export default function CandidateInsightsPage() {
  const [selectedCandidateId, setSelectedCandidateId] = useState('#1024');
  const allCandidates = employerTalentWorkspace.candidates as any[];

  // Subscribe to search store
  const { searchQuery, chipsByPage } = useEmployerSearchStore();
  const activeChips = chipsByPage.insights;

  // Filter candidates dynamically based on active search parameters
  const matchingCandidates = React.useMemo(() => {
    return allCandidates.filter((c) => {
      // 1. Search Query
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesSearch =
          c.name.toLowerCase().includes(q) ||
          c.targetRole.toLowerCase().includes(q) ||
          c.university.toLowerCase().includes(q) ||
          c.topSkills.some((s: string) => s.toLowerCase().includes(q));
        if (!matchesSearch) return false;
      }
      
      // 2. Active Search Chips Filter
      if (activeChips.length > 0) {
        const candidateChips = activeChips.filter(ch => ch.type === 'candidate');
        const skillChips = activeChips.filter(ch => ch.type === 'skill');
        const roleChips = activeChips.filter(ch => ch.type === 'role');

        if (candidateChips.length > 0) {
          const matchesCand = candidateChips.some(ch => c.name.toLowerCase() === ch.value.toLowerCase());
          if (!matchesCand) return false;
        }

        if (skillChips.length > 0) {
          const hasAllSkills = skillChips.every(ch =>
            c.topSkills.some((s: string) => s.toLowerCase() === ch.value.toLowerCase()) ||
            c.evidenceTrace.some((e: any) => e.skill.toLowerCase() === ch.value.toLowerCase())
          );
          if (!hasAllSkills) return false;
        }

        if (roleChips.length > 0) {
          const matchesRole = roleChips.some(ch => c.targetRole.toLowerCase() === ch.value.toLowerCase());
          if (!matchesRole) return false;
        }
      }
      return true;
    });
  }, [allCandidates, searchQuery, activeChips]);

  // Compute dynamic saved candidates pipeline
  const pipelineColumns = React.useMemo(() => {
    const orig = employerCandidateInsights.savedCandidatesPipeline;
    // Map stage data dynamically
    return Object.values(orig).map((stage: any) => {
      const matchingIds = new Set(matchingCandidates.map(c => c.id));
      const filteredCands = stage.candidates.filter((cand: any) => {
        // If candidate chips match or list contains candidate ID
        if (matchingCandidates.length === allCandidates.length) return true;
        return matchingIds.has(cand.id) || matchingCandidates.some(c => c.name.includes(cand.id));
      });
      return {
        ...stage,
        count: filteredCands.length,
        candidates: filteredCands,
        more: Math.max(0, filteredCands.length - 2)
      };
    });
  }, [matchingCandidates, allCandidates]);

  // Compute dynamic stats
  const stats = React.useMemo(() => {
    const totalCount = matchingCandidates.length;
    const avgScore = totalCount > 0
      ? Math.round(matchingCandidates.reduce((acc, c) => acc + c.match, 0) / totalCount)
      : 78;

    return [
      { label: 'Saved Candidates', value: (totalCount * 28).toString(), delta: '+12% vs last 30 days', positive: true },
      { label: 'Avg. Readiness Score', value: avgScore.toString(), delta: '+6 pts vs last 30 days', positive: true },
      { label: 'Pending Validations', value: (totalCount * 2).toString(), delta: '-5 vs last 30 days', positive: false },
      { label: 'Hired This Month', value: Math.round(totalCount * 1.5).toString(), delta: '+3 vs last 30 days', positive: true },
    ];
  }, [matchingCandidates]);

  // Dynamic Donut Chart data
  const candidatesBySource = React.useMemo(() => {
    const base = [
      { label: 'Universities', value: 42 },
      { label: 'Campus Events', value: 24 },
      { label: 'Referrals', value: 18 },
      { label: 'Job Boards', value: 10 },
      { label: 'Others', value: 6 },
    ];
    if (matchingCandidates.length === allCandidates.length) return base;

    const uniCounts: Record<string, number> = {};
    matchingCandidates.forEach(c => {
      uniCounts[c.university] = (uniCounts[c.university] || 0) + 1;
    });
    const total = Object.values(uniCounts).reduce((a, b) => a + b, 0) || 1;
    const mainUniPercent = Math.min(Math.round(((uniCounts[matchingCandidates[0]?.university] || 1) / total) * 100), 90);

    return [
      { label: 'Universities', value: mainUniPercent },
      { label: 'Campus Events', value: Math.round((100 - mainUniPercent) * 0.4) },
      { label: 'Referrals', value: Math.round((100 - mainUniPercent) * 0.3) },
      { label: 'Job Boards', value: Math.round((100 - mainUniPercent) * 0.2) },
      { label: 'Others', value: Math.round((100 - mainUniPercent) * 0.1) },
    ];
  }, [matchingCandidates, allCandidates]);

  // Dynamic Skills bar data
  const skillsFoundVsMissing = React.useMemo(() => {
    const base = [
      { skill: 'SQL', found: 92, missing: 8 },
      { skill: 'Excel', found: 86, missing: 14 },
      { skill: 'Python', found: 81, missing: 19 },
      { skill: 'Tableau', found: 63, missing: 37 },
      { skill: 'Communication', found: 54, missing: 46 },
    ];
    if (matchingCandidates.length === allCandidates.length) return base;

    const freq: Record<string, number> = {};
    matchingCandidates.forEach(c => {
      c.topSkills.forEach((s: string) => {
        freq[s] = (freq[s] || 0) + 1;
      });
    });
    
    const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]);
    const top5 = sorted.slice(0, 5);
    if (top5.length === 0) return base;

    return top5.map(([skill, count]) => {
      const found = Math.min(65 + count * 8, 97);
      return {
        skill,
        found,
        missing: 100 - found
      };
    });
  }, [matchingCandidates, allCandidates]);

  // Average Readiness Stage metrics
  const readinessByStage = React.useMemo(() => {
    const baseVal = matchingCandidates.length > 0
      ? Math.round(matchingCandidates.reduce((acc, c) => acc + c.match, 0) / matchingCandidates.length)
      : 78;

    return [
      { label: 'Shortlisted', value: Math.max(baseVal - 6, 60) },
      { label: 'Interviewing', value: Math.max(baseVal - 2, 65) },
      { label: 'Offer', value: Math.min(baseVal + 4, 95) },
      { label: 'Hired', value: Math.min(baseVal + 8, 98) },
    ];
  }, [matchingCandidates]);

  // Average Readiness by Role bar data
  const readinessByRole = React.useMemo(() => {
    const base = [
      { label: 'Data Analyst', value: 81 },
      { label: 'Frontend Engineer', value: 86 },
      { label: 'Growth Ops', value: 81 },
      { label: 'Product Analyst', value: 78 },
    ];
    if (matchingCandidates.length === allCandidates.length) return base;

    const roles = Array.from(new Set(matchingCandidates.map(c => c.targetRole)));
    return roles.map(role => {
      const roleCands = matchingCandidates.filter(c => c.targetRole === role);
      const avg = Math.round(roleCands.reduce((acc, c) => acc + c.match, 0) / roleCands.length);
      return {
        label: role,
        value: avg
      };
    });
  }, [matchingCandidates, allCandidates]);

  const activeFiltersLabel = activeChips.map(c => c.value).join(' & ');

  return (
    <div className="space-y-5">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Candidate Insights</h2>
          <p className="mt-1 text-sm text-slate-500">Track your talent pipeline, validation progress, and onboarding readiness.</p>
        </div>
        <button type="button" className="w-fit rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm">
          May 12 - Jun 11, 2025
        </button>
      </header>

      {/* Dynamic viewing filter banner */}
      {activeChips.length > 0 && (
        <div className="flex items-center gap-2 rounded-xl border border-blue-100 bg-blue-50/60 px-4 py-3 text-xs font-semibold text-blue-700 shadow-sm animate-[dropdownSlide_0.15s_ease-out]">
          <span className="text-sm">ℹ️</span>
          <span>
            Viewing insights for <strong className="font-extrabold text-blue-900">{activeFiltersLabel}</strong> candidates.
          </span>
        </div>
      )}

      <section className="grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
        <Card className="rounded-2xl border-slate-200/80 bg-white/95 p-5 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-950">Saved Candidates</h2>
            <button type="button" className="text-xs font-semibold text-indigo-600">View Full Pipeline</button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-1">
            {pipelineColumns.map((column: any) => (
              <PipelineColumn
                key={column.label}
                column={column}
                selectedCandidateId={selectedCandidateId}
                onSelectCandidate={setSelectedCandidateId}
              />
            ))}
          </div>
        </Card>

        <ValidationRequestsTable requests={employerCandidateInsights.validationRequests} />
      </section>

      <Card className="rounded-2xl border-slate-200/80 bg-white/95 p-5 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-950">
            Onboarding Tracker <span className="font-normal text-slate-400">(Hired Candidates Only)</span>
          </h2>
        </div>
        <div className="grid gap-4 xl:grid-cols-[1fr_1fr_1fr_0.9fr]">
          {employerCandidateInsights.onboardingTracker.map((item: any) => (
            <OnboardingTrackerCard key={item.candidate} item={item} />
          ))}
          <div className="rounded-2xl bg-indigo-50/70 p-5">
            <h3 className="text-sm font-semibold text-slate-950">Recommended Pre-joining Learning Plan</h3>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              Curated learning paths to help new hires get productive from day one.
            </p>
            <button type="button" className="mt-4 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-indigo-700 ring-1 ring-indigo-100">
              View Learning Plans
            </button>
          </div>
        </div>
      </Card>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-950">Pipeline Analytics</h2>
          <button type="button" className="text-xs font-semibold text-indigo-600">Export Report</button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <DonutChartMock data={candidatesBySource} />
          <HorizontalBarChartMock title="Skills Found vs Skills Missing" data={skillsFoundVsMissing} dual />
          <Card className="rounded-2xl border-slate-200/80 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
            <h3 className="text-sm font-semibold text-slate-950">Average Readiness Scores</h3>
            <p className="mt-5 text-3xl font-semibold text-slate-950">
              {stats[1]?.value} <span className="text-sm text-slate-400">/100</span>
            </p>
            <p className="mt-1 text-xs text-emerald-600">+6 pts vs last 30 days</p>
            <div className="mt-4 space-y-3">
              {readinessByStage.map((item) => (
                <div key={item.label}>
                  <div className="mb-1 flex justify-between text-xs text-slate-500"><span>{item.label}</span><span>{item.value}</span></div>
                  <div className="h-2 rounded-full bg-slate-100"><div className="h-2 rounded-full bg-indigo-500" style={{ width: `${item.value}%` }} /></div>
                </div>
              ))}
            </div>
          </Card>
          <HorizontalBarChartMock title="Average Readiness by Role" data={readinessByRole} />
        </div>
      </section>

      <EmployerAIInsightCard insight={employerCandidateInsights.aiInsight} />
    </div>
  );
}
