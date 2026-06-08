import React, { useState } from 'react';
import DonutChartMock from './DonutChartMock';
import HorizontalBarChartMock from './HorizontalBarChartMock';

export default function OpportunityAnalytics({ opportunities = [], allCandidates = [] }) {
  const [selectedJobId, setSelectedJobId] = useState('all');

  const funnelData = [
    { stage: 'Total Applicants', count: 483, pct: 100, color: 'bg-indigo-600' },
    { stage: 'Shortlisted', count: 182, pct: 37, color: 'bg-blue-600' },
    { stage: 'Interviewing', count: 67, pct: 13, color: 'bg-amber-500' },
    { stage: 'Offers Extended', count: 12, pct: 2.4, color: 'bg-rose-500' },
    { stage: 'Positions Filled', count: 8, pct: 1.6, color: 'bg-emerald-500' }
  ];

  const sourceData = [
    { label: 'Direct Platform', value: 45 },
    { label: 'University Partner', value: 30 },
    { label: 'AI Match Engine', value: 15 },
    { label: 'Student Outreach', value: 10 }
  ];

  const universityData = [
    { label: 'Taylor University', value: 42 },
    { label: 'Asia Pacific University', value: 24 },
    { label: 'Universiti Malaya', value: 18 },
    { label: 'Monash University Malaysia', value: 16 }
  ];

  const skillGaps = [
    { skill: 'Tableau / Power BI', value: 65, missing: 35, found: 65 },
    { skill: 'Advanced Python (Pandas/ML)', value: 50, missing: 50, found: 50 },
    { skill: 'Cloud Infrastructure (AWS/GCP)', value: 30, missing: 70, found: 30 },
    { skill: 'SQL Optimization (CTEs/Window)', value: 75, missing: 25, found: 75 },
  ];

  return (
    <div className="space-y-6">
      {/* Header and Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-5 gap-3">
        <div>
          <h2 className="text-lg font-extrabold text-slate-950">Hiring Insights & Analytics</h2>
          <p className="text-xs text-slate-500 font-semibold mt-0.5">Real-time candidate pipelines, source channels, and skill distributions</p>
        </div>

        <select
          value={selectedJobId}
          onChange={(e) => setSelectedJobId(e.target.value)}
          className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="all">All Posted Opportunities</option>
          {opportunities.map(job => (
            <option key={job.id} value={job.id}>{job.title}</option>
          ))}
        </select>
      </div>

      {/* Grid: Donut + Horizontal Bars */}
      <div className="grid gap-6 md:grid-cols-2">
        <DonutChartMock data={sourceData} />
        <HorizontalBarChartMock title="Top Applicant Universities" data={universityData} />
      </div>

      {/* Grid: Conversion Funnel + Skill Gaps */}
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        
        {/* Conversion Funnel */}
        <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.04)] space-y-4">
          <div>
            <h3 className="text-sm font-extrabold text-slate-950">Applicant Conversion Funnel</h3>
            <p className="text-[10px] text-slate-400 font-bold mt-0.5">Aggregated metrics across the entire application flow</p>
          </div>

          <div className="space-y-3.5 pt-2">
            {funnelData.map((item) => (
              <div key={item.stage} className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-extrabold text-slate-700">{item.stage}</span>
                  <div className="space-x-2">
                    <span className="font-extrabold text-slate-900">{item.count} Candidates</span>
                    <span className="font-bold text-slate-400">({item.pct}%)</span>
                  </div>
                </div>
                <div className="h-4 w-full bg-slate-100 rounded-lg overflow-hidden flex">
                  <div className={`h-full ${item.color} rounded-lg transition-all duration-500`} style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skill Gap Analysis */}
        <div className="space-y-6">
          <HorizontalBarChartMock title="Skill Coverage in Applicant Pool" data={skillGaps} dual={true} />
          
          <div className="rounded-2xl border border-blue-50 bg-gradient-to-r from-blue-50/50 to-indigo-50/20 p-5 shadow-xs">
            <h4 className="text-xs font-extrabold text-blue-900 uppercase tracking-wide">AI Recommendations</h4>
            <ul className="mt-2.5 space-y-2 text-xs text-slate-600 font-medium">
              <li className="flex items-start gap-2">
                <span>⚡</span>
                <span>Taylor University candidates show 95% match rate on SQL. Invite them for fast-track screens.</span>
              </li>
              <li className="flex items-start gap-2">
                <span>💡</span>
                <span>35% of applicants lack required Tableau/Power BI skills. Consider updating the description or using our screening questions to filter.</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
