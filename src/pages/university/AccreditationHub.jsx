import React, { useRef, useState } from 'react'
import { ArrowRight, Sparkles } from 'lucide-react'
import UniversityNav from '../../components/university/UniversityNav'
import AccreditationKpis from '../../components/university/accreditation/AccreditationKpis'
import EvidenceBuilder from '../../components/university/accreditation/EvidenceBuilder'
import RequirementsChecklist from '../../components/university/accreditation/RequirementsChecklist'
import SubmissionTimeline from '../../components/university/accreditation/SubmissionTimeline'
import GenerateDraftModal from '../../components/university/accreditation/GenerateDraftModal'
import RequestDataModal from '../../components/university/accreditation/RequestDataModal'
import OverrideConfirmModal from '../../components/university/accreditation/OverrideConfirmModal'
import AacsbTimelineModal from '../../components/university/accreditation/AacsbTimelineModal'
import {
  accreditationSummary,
  evidenceByRequirement,
  requirementGroups,
  timelineSubmissions,
} from '../../components/university/accreditation/accreditationData'
import { useUniversityWorkspaceStore } from '../../store/useUniversityWorkspaceStore'

function findRequirement(id) {
  for (const group of requirementGroups) {
    const match = group.items.find((item) => item.id === id)
    if (match) return match
  }
  return requirementGroups[0].items[0]
}

// The Curriculum-Market Alignment evidence pack count is fed live from the
// shared store — this is the "close the loop" cross-page connection: adding
// gap evidence there updates this requirement's completeness here.
function curriculumEvidenceEntry(packSize) {
  const gapNames = ['Cloud Computing', 'Generative AI / LLMs', 'MLOps', 'Data Visualization']
  const completeness = Math.min(100, packSize * 25)
  const status = packSize === 0 ? 'missing' : packSize < 3 ? 'in-progress' : 'ready'
  return {
    status,
    requiredBy: 'MQA Self-Review',
    completeness,
    readySources: packSize,
    totalSources: 4,
    sources:
      packSize === 0
        ? [
            {
              id: 'curriculum-evidence-empty',
              label: 'Missing: Curriculum-Market Alignment evidence pack',
              sourcePage: '/university/curriculum-alignment',
              title: 'No skill gaps have been added to the evidence pack yet',
              updated: 'Last updated: N/A',
              status: 'missing',
              action: 'View source',
              icon: 'warning',
            },
          ]
        : gapNames.slice(0, packSize).map((name, i) => ({
            id: `curriculum-evidence-${i}`,
            label: 'From: Curriculum-Market Alignment',
            sourcePage: '/university/curriculum-alignment',
            title: `${name} evidence pack — curriculum, market demand, alumni feedback, employer language`,
            updated: 'Last updated: just now',
            status: 'ready',
            action: 'View source',
            icon: 'trend',
          })),
  }
}

function DemoToast({ message }) {
  if (!message) return null
  return (
    <div className="fixed bottom-5 right-5 z-50 rounded-xl border border-white/80 bg-white/90 px-4 py-3 text-sm font-semibold text-[#1B2545] shadow-[0_18px_50px_rgba(24,95,165,0.18)] backdrop-blur-xl">
      {message}
    </div>
  )
}

export default function AccreditationHub() {
  const [expandedGroup, setExpandedGroup] = useState('graduate-employability')
  const [selectedRequirement, setSelectedRequirement] = useState('graduate-destination')
  const [selectedFramework, setSelectedFramework] = useState('QS World Rankings 2025')
  const [overrides, setOverrides] = useState({})
  const [toast, setToast] = useState('')
  const toastRef = useRef(null)

  const [activeModal, setActiveModal] = useState(null) // null | 'generate' | 'request' | 'override' | 'aacsb'
  const [requestSource, setRequestSource] = useState(null)
  const [draftTitle, setDraftTitle] = useState('QS World Rankings 2025')

  const evidencePackGaps = useUniversityWorkspaceStore((s) => s.evidencePackGaps)
  const markRequirementOverride = useUniversityWorkspaceStore((s) => s.markRequirementOverride)

  const showToast = (message) => {
    window.clearTimeout(toastRef.current)
    setToast(message)
    toastRef.current = window.setTimeout(() => setToast(''), 2800)
  }

  const requirement = findRequirement(selectedRequirement)
  const evidence =
    selectedRequirement === 'curriculum-evidence-packs'
      ? curriculumEvidenceEntry(evidencePackGaps.size)
      : evidenceByRequirement[selectedRequirement]

  const handleGenerateDraft = () => {
    setDraftTitle('QS World Rankings 2025')
    showToast('Generating evidence pack...')
    window.setTimeout(() => setActiveModal('generate'), 900)
  }

  const handleTimelineAction = (submissionId) => {
    if (submissionId === 'qs') {
      handleGenerateDraft()
    } else if (submissionId === 'mqa') {
      setSelectedFramework('MQA Self-Review 2025')
      setExpandedGroup('industry-alignment')
      setSelectedRequirement('curriculum-evidence-packs')
      showToast('Highlighting MQA Self-Review 2025 requirements')
      document.getElementById('requirements-checklist')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else if (submissionId === 'aacsb') {
      setActiveModal('aacsb')
    }
  }

  const handleRequestData = (source) => {
    setRequestSource(source)
    setActiveModal('request')
  }

  const handleOverride = () => setActiveModal('override')

  const confirmOverride = () => {
    setOverrides((prev) => ({ ...prev, [selectedRequirement]: true }))
    markRequirementOverride(selectedRequirement)
    setActiveModal(null)
    showToast(`${requirement.name} marked as ready (override) — logged`)
  }

  return (
    <div className="university-workspace-page flex h-screen w-screen flex-col overflow-hidden text-[#111B3F]">
      <UniversityNav />
      <main className="relative min-w-0 flex-1 overflow-y-auto">
        <div className="relative mx-auto max-w-[1540px] space-y-4 px-6 py-5">
          <header className="employer-home-header">
            <h1 className="text-2xl font-semibold leading-tight tracking-normal text-slate-950">Accreditation Hub</h1>
            <p className="mt-1 text-sm font-medium text-slate-500">
              Evidence, automatically assembled &mdash; no more last-minute scrambling
            </p>
          </header>

          <section className="employer-glass-card flex items-center gap-5 px-6 py-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/72 text-[#6D45F5] shadow-sm">
              <Sparkles className="h-7 w-7" />
            </span>
            <p className="min-w-0 flex-1 text-sm font-semibold leading-6 text-[#252A85]">{accreditationSummary.banner}</p>
            <button
              type="button"
              onClick={handleGenerateDraft}
              className="employer-primary-button flex shrink-0 items-center gap-2 px-6 py-3 text-sm"
            >
              Generate draft pack
              <ArrowRight className="h-4 w-4" />
            </button>
          </section>

          <AccreditationKpis kpis={accreditationSummary.kpis} />

          <div id="requirements-checklist" className="grid grid-cols-[0.95fr_1.05fr] gap-4">
            <RequirementsChecklist
              groups={requirementGroups}
              expandedGroup={expandedGroup}
              selectedRequirement={selectedRequirement}
              selectedFramework={selectedFramework}
              overrides={overrides}
              onToggleGroup={(groupId) => setExpandedGroup((current) => (current === groupId ? '' : groupId))}
              onSelectRequirement={setSelectedRequirement}
              onSelectFramework={setSelectedFramework}
            />
            <EvidenceBuilder
              requirement={requirement}
              evidence={evidence}
              overridden={!!overrides[selectedRequirement]}
              onRequestData={handleRequestData}
              onOverride={handleOverride}
            />
          </div>

          <SubmissionTimeline submissions={timelineSubmissions} onAction={handleTimelineAction} />
        </div>
      </main>
      <DemoToast message={toast} />

      {activeModal === 'generate' ? (
        <GenerateDraftModal submissionTitle={draftTitle} onClose={() => setActiveModal(null)} onToast={showToast} />
      ) : null}

      {activeModal === 'request' && requestSource ? (
        <RequestDataModal
          requirementName={requirement.name}
          sourceLabel={requestSource.label}
          onClose={() => setActiveModal(null)}
          onSend={(recipient) => {
            setActiveModal(null)
            showToast(`Request sent to ${recipient}`)
          }}
        />
      ) : null}

      {activeModal === 'override' ? (
        <OverrideConfirmModal requirementName={requirement.name} onClose={() => setActiveModal(null)} onConfirm={confirmOverride} />
      ) : null}

      {activeModal === 'aacsb' ? (
        <AacsbTimelineModal onClose={() => setActiveModal(null)} onToast={showToast} />
      ) : null}
    </div>
  )
}
