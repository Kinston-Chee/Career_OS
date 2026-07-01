import React, { useRef, useState } from 'react'
import { Sparkles } from 'lucide-react'
import UniversityNav from '../../components/university/UniversityNav'
import KpiRow from '../../components/university/readiness/KpiRow'
import SkillReadinessHeatmap from '../../components/university/readiness/SkillReadinessHeatmap'
import HiddenEmployabilityRisk from '../../components/university/readiness/HiddenEmployabilityRisk'
import InterventionQueue from '../../components/university/readiness/InterventionQueue'
import { heatmap, summaryBanner } from '../../data/studentReadinessData'

function PageHeader() {
  return (
    <div className="employer-home-header">
      <h1 className="text-2xl font-semibold text-slate-950">Student Readiness</h1>
      <p className="mt-1 text-sm text-gray-500">Academic performance alone doesn&rsquo;t predict employability — here&rsquo;s who actually needs support</p>
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

export default function StudentReadiness() {
  const [selectedColumn, setSelectedColumn] = useState(heatmap.defaultColumn)
  const [detailText, setDetailText] = useState(heatmap.defaultDetail)
  const [toast, setToast] = useState('')
  const toastRef = useRef(null)

  const showToast = (message) => {
    window.clearTimeout(toastRef.current)
    setToast(message)
    toastRef.current = window.setTimeout(() => setToast(''), 2400)
  }

  const handleSelectColumn = (col) => {
    setSelectedColumn(col)
    const key = `${heatmap.rows[1]}-${col}`
    setDetailText(heatmap.cellDetails[key] || `${col}: select a skill cell below for more detail.`)
  }

  const handleSelectCell = (row, col) => {
    setSelectedColumn(col)
    const key = `${row}-${col}`
    setDetailText(heatmap.cellDetails[key] || `${row} · ${col}: detailed readiness breakdown not yet available for this cell.`)
  }

  const handleViewProfile = (student) => showToast(`Opening ${student.label.split(' · ')[0]}'s profile…`)
  const handleViewAll = () => showToast('Opening all 34 at-risk students…')
  const handleAssign = () => showToast('Intervention assignment form would open here')

  return (
    <div className="university-workspace-page flex h-screen w-screen flex-col overflow-hidden">
      <UniversityNav />
      <main className="min-w-0 flex-1 overflow-y-auto">
        <div className="relative z-10 mx-auto max-w-[1480px] space-y-5 px-6 py-6">
          <PageHeader />
          <SummaryBanner />
          <KpiRow />

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <SkillReadinessHeatmap
              selectedColumn={selectedColumn}
              onSelectColumn={handleSelectColumn}
              onSelectCell={handleSelectCell}
              detailText={detailText}
            />
            <HiddenEmployabilityRisk onViewProfile={handleViewProfile} onViewAll={handleViewAll} />
          </div>

          <InterventionQueue onAssign={handleAssign} />
        </div>
      </main>
      <DemoToast message={toast} />
    </div>
  )
}
