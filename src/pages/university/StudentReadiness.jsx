import React, { useRef, useState } from 'react'
import { Sparkles } from 'lucide-react'
import UniversityNav from '../../components/university/UniversityNav'
import KpiRow from '../../components/university/readiness/KpiRow'
import SkillReadinessHeatmap from '../../components/university/readiness/SkillReadinessHeatmap'
import HiddenEmployabilityRisk from '../../components/university/readiness/HiddenEmployabilityRisk'
import InterventionQueue from '../../components/university/readiness/InterventionQueue'
import AssignInterventionModal from '../../components/university/readiness/AssignInterventionModal'
import StudentProfileModal from '../../components/university/readiness/StudentProfileModal'
import { heatmap, interventionQueue as initialInterventionQueue } from '../../data/studentReadinessData'
import { useUniversityWorkspaceStore } from '../../store/useUniversityWorkspaceStore'

function PageHeader() {
  return (
    <div className="employer-home-header">
      <h1 className="text-2xl font-semibold text-slate-950">Student Readiness</h1>
      <p className="mt-1 text-sm text-gray-500">Academic performance alone doesn&rsquo;t predict employability — here&rsquo;s who actually needs support</p>
    </div>
  )
}

function SummaryBanner({ text }) {
  return (
    <section
      className="employer-glass-card flex items-start gap-3 p-4"
    >
      <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-purple-600" />
      <p className="text-sm leading-6 text-gray-700">{text}</p>
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

const SUMMARY_TEXT =
  '34 students show strong academic performance but weak employability signals — incomplete Career Memory, no internship experience, and low platform engagement. These students are often missed by traditional academic risk tracking.'

export default function StudentReadiness() {
  const [selectedColumn, setSelectedColumn] = useState(heatmap.defaultColumn)
  const [detailText, setDetailText] = useState(heatmap.defaultDetail)
  const [rows, setRows] = useState(initialInterventionQueue.rows)
  const [expandedRisk, setExpandedRisk] = useState(false)
  const [profileStudent, setProfileStudent] = useState(null)
  const [showAssignModal, setShowAssignModal] = useState(false)
  const [toast, setToast] = useState('')
  const toastRef = useRef(null)

  const completeIntervention = useUniversityWorkspaceStore((s) => s.completeIntervention)

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

  const handleViewProfile = (student) => setProfileStudent(student)
  const handleViewAll = () => setExpandedRisk((prev) => !prev)
  const handleAssign = () => setShowAssignModal(true)

  const handleSaveIntervention = (form) => {
    const newRow = {
      id: `row-${Date.now()}`,
      student: form.studentCohort,
      riskType: form.riskType,
      riskTone: form.riskType === 'Employability risk' ? 'red' : 'orange',
      recommendation: form.recommendation,
      owner: form.owner,
      deadline: form.deadline,
      status: 'Not started',
      statusTone: 'gray',
    }
    setRows((prev) => [newRow, ...prev])
    setShowAssignModal(false)
    showToast(`Intervention assigned for ${form.studentCohort}`)
  }

  const handleChangeStatus = (rowId, nextStatus) => {
    // Side effects (the shared-store decrement) must stay out of the setState
    // updater — React 18 StrictMode double-invokes updater functions in dev,
    // which would double-decrement the KPI if the call lived inside setRows.
    const row = rows.find((r) => r.id === rowId)
    if (row && row.status !== 'Completed' && nextStatus === 'Completed') {
      completeIntervention()
    }
    setRows((prev) => prev.map((r) => (r.id === rowId ? { ...r, status: nextStatus } : r)))
    showToast(`Status updated to "${nextStatus}"`)
  }

  const activeCount = rows.filter((r) => r.status === 'In progress' || r.status === 'Scheduled').length
  const pendingCount = rows.filter((r) => r.status === 'Not started').length

  return (
    <div className="university-workspace-page flex h-screen w-screen flex-col overflow-hidden">
      <UniversityNav />
      <main className="min-w-0 flex-1 overflow-y-auto">
        <div className="relative z-10 mx-auto max-w-[1480px] space-y-5 px-6 py-6">
          <PageHeader />
          <SummaryBanner text={SUMMARY_TEXT} />
          <KpiRow />

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <SkillReadinessHeatmap
              selectedColumn={selectedColumn}
              onSelectColumn={handleSelectColumn}
              onSelectCell={handleSelectCell}
              detailText={detailText}
            />
            <HiddenEmployabilityRisk onViewProfile={handleViewProfile} onViewAll={handleViewAll} expanded={expandedRisk} />
          </div>

          <InterventionQueue
            rows={rows}
            activeCount={activeCount}
            pendingCount={pendingCount}
            onAssign={handleAssign}
            onChangeStatus={handleChangeStatus}
          />
        </div>
      </main>
      <DemoToast message={toast} />

      {showAssignModal ? (
        <AssignInterventionModal onClose={() => setShowAssignModal(false)} onSave={handleSaveIntervention} />
      ) : null}

      {profileStudent ? (
        <StudentProfileModal student={profileStudent} onClose={() => setProfileStudent(null)} />
      ) : null}
    </div>
  )
}
