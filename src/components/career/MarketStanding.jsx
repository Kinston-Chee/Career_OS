import React from 'react';
import { useMarketIntelligenceStore } from '../../store/useMarketIntelligenceStore';
import InteractiveDropdown from './InteractiveDropdown';
import MarketPositionDashboard from './MarketPositionDashboard';
import SalaryBenchmarkCard from './SalaryBenchmarkCard';
import ShareReportButton from './ShareReportButton';
import MarketSkeletonLoader from './MarketSkeletonLoader';
import UpskillingRecommendations from './UpskillingRecommendations';

export default function MarketStanding() {
  const {
    selectedCountry,
    selectedTimeframe,
    isLoading,
    marketData,
    setCountry,
    setTimeframe,
  } = useMarketIntelligenceStore();

  const countryOptions = [
    'Malaysia',
    'Singapore',
    'Indonesia',
    'Thailand',
    'Vietnam',
    'Philippines',
    'Australia',
    'United Kingdom',
    'United States',
    'Canada',
  ];

  const timeframeOptions = [
    'Past 3 Months',
    'Past 6 Months',
    'Past 12 Months',
    'Past 24 Months',
    'Past 5 Years',
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <InteractiveDropdown
          label="Country"
          options={countryOptions}
          selectedOption={selectedCountry}
          onSelect={setCountry}
        />
        <InteractiveDropdown
          label="Timeframe"
          options={timeframeOptions}
          selectedOption={selectedTimeframe}
          onSelect={setTimeframe}
        />
        <ShareReportButton />
      </div>

      <MarketSkeletonLoader isLoading={isLoading}>
        <div className="space-y-5">
          {/* Market Position Dashboard — replaces MarketTrendChart + InDemandSkillsTable + AIInsightCard */}
          <MarketPositionDashboard
            score={marketData.marketPositionScore}
            country={selectedCountry}
            strongAreas={marketData.strongAreas}
            improvementAreas={marketData.improvementAreas}
          />

          {/* Salary Benchmark — kept & full-width */}
          <SalaryBenchmarkCard benchmark={marketData.salaryBenchmark} />

          {/* Upskilling Recommendations — new, links to Opportunities */}
          <UpskillingRecommendations />
        </div>
      </MarketSkeletonLoader>
    </div>
  );
}
