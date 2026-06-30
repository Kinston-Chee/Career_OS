import React, { useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import EmployerNav from '../../components/employer/EmployerNav'
import QuarterSummary from '../../components/employer/analytics/QuarterSummary'
import WhatsWorking from '../../components/employer/analytics/WhatsWorking'
import SourceROIComparison from '../../components/employer/analytics/SourceROIComparison'
import SignalCorrelation from '../../components/employer/analytics/SignalCorrelation'
import RetentionRiskForecast from '../../components/employer/analytics/RetentionRiskForecast'
import { quarterOptions } from '../../data/analyticsData'

function QuarterDropdown() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(quarterOptions[0])
  const ref = useRef(null)

  React.useEffect(() => {
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
        <div className="employer-glass-card absolute right-0 z-20 mt-1.5 w-40 overflow-hidden py-1">
          {quarterOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                setSelected(option)
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

function DemoToast({ message }) {
  if (!message) return null
  return (
    <div className="employer-glass-card fixed bottom-5 right-5 z-50 px-4 py-3 text-sm font-semibold text-slate-800">
      {message}
    </div>
  )
}

export default function Analytics() {
  const [toast, setToast] = useState('')
  const toastRef = useRef(null)

  const showToast = (message) => {
    window.clearTimeout(toastRef.current)
    setToast(message)
    toastRef.current = window.setTimeout(() => setToast(''), 2400)
  }

  const handleExport = () => {
    showToast('Generating leadership summary…')
    window.setTimeout(() => showToast('Summary ready — check your downloads'), 1000)
  }

  return (
    <div className="employer-workspace-page flex h-screen w-screen flex-col overflow-hidden">
      <EmployerNav variant="glass" />
      <main className="min-w-0 flex-1 overflow-y-auto">
        <div className="relative z-10 mx-auto max-w-[1480px] space-y-5 px-6 py-6">
          <div className="employer-page-header flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="employer-page-title">Analytics</h1>
              <p className="employer-page-subtitle">What&rsquo;s working, what&rsquo;s not, and what to do next</p>
            </div>
            <QuarterDropdown />
          </div>

          <QuarterSummary onExport={handleExport} />
          <WhatsWorking />

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.5fr_1fr]">
            <SourceROIComparison />
            <SignalCorrelation />
          </div>

          <RetentionRiskForecast />
        </div>
      </main>
      <DemoToast message={toast} />
    </div>
  )
}
