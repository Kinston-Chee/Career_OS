import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDown, Sparkles } from 'lucide-react'
import UniversityNav from '../../components/university/UniversityNav'
import KpiRow from '../../components/university/alumni/KpiRow'
import SalaryTrendChart from '../../components/university/alumni/SalaryTrendChart'
import RolePathwaySankey from '../../components/university/alumni/RolePathwaySankey'
import EmployerConcentration from '../../components/university/alumni/EmployerConcentration'
import FeedbackCurriculumLoop from '../../components/university/alumni/FeedbackCurriculumLoop'
import { summaryBanner } from '../../data/alumniSignalsData'

function PageHeader() {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Alumni Signal Intelligence</h1>
        <p className="mt-1 text-sm text-gray-500">Proof that what we teach translates into career outcomes — not just where alumni work</p>
      </div>
      <button type="button" className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
        Last 3 Years
        <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
      </button>
    </div>
  )
}

function SummaryBanner() {
  return (
    <section
      className="flex items-start gap-3 rounded-2xl p-4"
      style={{ backgroundColor: 'rgba(240,238,255,0.5)', border: '1px solid rgba(200,190,255,0.4)' }}
    >
      <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-purple-600" />
      <p className="text-sm leading-6 text-gray-700">{summaryBanner.text}</p>
    </section>
  )
}

export default function AlumniSignalIntelligence() {
  const navigate = useNavigate()

  const handleViewGap = (gapId) => navigate(`/university/curriculum-alignment?gap=${gapId}`)
  const handleViewPartnerships = () => navigate('/university/collaboration')

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-[#F4F6FB]">
      <UniversityNav />
      <main className="min-w-0 flex-1 overflow-y-auto">
        <div className="mx-auto max-w-[1480px] space-y-5 px-6 py-6">
          <PageHeader />
          <SummaryBanner />
          <KpiRow />

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <SalaryTrendChart />
            <RolePathwaySankey />
          </div>

          <EmployerConcentration onViewPartnerships={handleViewPartnerships} />
          <FeedbackCurriculumLoop onViewGap={handleViewGap} />
        </div>
      </main>
    </div>
  )
}
