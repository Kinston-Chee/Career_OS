import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDown, Sparkles } from 'lucide-react'
import UniversityNav from '../../components/university/UniversityNav'
import KpiRow from '../../components/university/alumni/KpiRow'
import SalaryTrendChart from '../../components/university/alumni/SalaryTrendChart'
import RolePathwaySankey from '../../components/university/alumni/RolePathwaySankey'
import EmployerConcentration from '../../components/university/alumni/EmployerConcentration'
import FeedbackCurriculumLoop from '../../components/university/alumni/FeedbackCurriculumLoop'
import { kpisByRange, salaryTrendByRange, summaryBanner, timeRangeOptions } from '../../data/alumniSignalsData'

function TimeRangeDropdown({ selected, onSelect }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="employer-secondary-button flex items-center gap-1.5 px-4 py-2 text-sm"
      >
        {selected}
        <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
      </button>
      {open ? (
        <div className="absolute right-0 z-20 mt-1.5 w-40 overflow-hidden rounded-xl border border-gray-100 bg-white py-1 shadow-lg">
          {timeRangeOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                onSelect(option)
                setOpen(false)
              }}
              className={`flex w-full items-center px-4 py-2 text-left text-xs ${option === selected ? 'font-semibold text-[#185FA5]' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              {option}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}

function PageHeader({ selectedRange, onSelectRange }) {
  return (
    <div className="employer-home-header flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold text-slate-950">Alumni Signal Intelligence</h1>
        <p className="mt-1 text-sm text-gray-500">Proof that what we teach translates into career outcomes — not just where alumni work</p>
      </div>
      <TimeRangeDropdown selected={selectedRange} onSelect={onSelectRange} />
    </div>
  )
}

function SummaryBanner() {
  return (
    <section
      className="employer-glass-card flex items-start gap-3 p-4"
    >
      <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-purple-600" />
      <p className="text-sm leading-6 text-gray-700">{summaryBanner.text}</p>
    </section>
  )
}

function DemoToast({ message }) {
  if (!message) return null
  return (
    <div className="employer-glass-card fixed bottom-5 right-5 z-50 px-4 py-3 text-sm font-semibold text-slate-800">
      {message}
    </div>
  )
}

export default function AlumniSignalIntelligence() {
  const navigate = useNavigate()
  const [selectedRange, setSelectedRange] = useState('Last 3 Years')
  const [toast, setToast] = useState('')
  const toastRef = useRef(null)

  const showToast = (message) => {
    window.clearTimeout(toastRef.current)
    setToast(message)
    toastRef.current = window.setTimeout(() => setToast(''), 2400)
  }

  const handleSelectRange = (range) => {
    setSelectedRange(range)
    showToast(`Showing ${range.toLowerCase()} data`)
  }

  const handleViewGap = (gapId) => navigate(`/university/curriculum-alignment?gap=${gapId}`)
  const handleViewPartnerships = () => navigate('/university/collaboration')

  return (
    <div className="university-workspace-page flex h-screen w-screen flex-col overflow-hidden">
      <UniversityNav />
      <main className="min-w-0 flex-1 overflow-y-auto">
        <div className="relative z-10 mx-auto max-w-[1480px] space-y-5 px-6 py-6">
          <PageHeader selectedRange={selectedRange} onSelectRange={handleSelectRange} />
          <SummaryBanner />
          <KpiRow kpis={kpisByRange[selectedRange]} />

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <SalaryTrendChart salaryTrend={salaryTrendByRange[selectedRange]} />
            <RolePathwaySankey />
          </div>

          <EmployerConcentration onViewPartnerships={handleViewPartnerships} />
          <FeedbackCurriculumLoop onViewGap={handleViewGap} />
        </div>
      </main>
      <DemoToast message={toast} />
    </div>
  )
}
