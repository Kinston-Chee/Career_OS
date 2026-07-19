import React, { useRef, useState } from 'react'
import { ArrowRight, Sparkles } from 'lucide-react'
import UniversityNav from '../../components/university/UniversityNav'
import AccreditationKpis from '../../components/university/accreditation/AccreditationKpis'
import EvidenceBuilder from '../../components/university/accreditation/EvidenceBuilder'
import RequirementsChecklist from '../../components/university/accreditation/RequirementsChecklist'
import SubmissionTimeline from '../../components/university/accreditation/SubmissionTimeline'
import GenerateDraftModal from '../../components/university/accreditation/GenerateDraftModal'
import RequestDataModal from '../../components/university/accreditation/RequestDataModal'
import MissingItemRequestModal from '../../components/university/accreditation/MissingItemRequestModal'
import ReportSectionDraftModal from '../../components/university/accreditation/ReportSectionDraftModal'
import OverrideConfirmModal from '../../components/university/accreditation/OverrideConfirmModal'
import {
  DEFAULT_FRAMEWORK,
  evidenceByRequirement,
  findRequirement,
  frameworkProfiles,
  getDisplayStatus,
  getFrameworkBanner,
  getFrameworkKpis,
  getFrameworkProfile,
  getFrameworkStats,
  getPreferredRequirement,
  getTimelineSubmissions,
  missingItemContext,
} from '../../components/university/accreditation/accreditationData'
import { useUniversityWorkspaceStore } from '../../store/useUniversityWorkspaceStore'

function curriculumEvidenceEntry(packSize) {
  const gapNames = ['Cloud Computing', 'Generative AI / LLMs', 'MLOps', 'Data Visualization']
  const completeness = Math.min(100, packSize * 25)
  const status = packSize === 0 ? 'missing' : packSize < 3 ? 'in-progress' : 'ready'
  return {
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
              status,
              action: 'View source',
              icon: 'warning',
            },
          ]
        : gapNames.slice(0, packSize).map((name, i) => ({
            id: `curriculum-evidence-${i}`,
            label: 'From: Curriculum-Market Alignment',
            sourcePage: '/university/curriculum-alignment',
            title: `${name} evidence pack - curriculum, market demand, alumni feedback, employer language`,
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
  const defaultProfile = getFrameworkProfile(DEFAULT_FRAMEWORK)
  const defaultRequirement = getPreferredRequirement(defaultProfile.groups)

  const [selectedFramework, setSelectedFramework] = useState(DEFAULT_FRAMEWORK)
  const [expandedGroup, setExpandedGroup] = useState(defaultRequirement.groupId)
  const [selectedRequirement, setSelectedRequirement] = useState(defaultRequirement.id)
  const [overrides, setOverrides] = useState({})
  const [toast, setToast] = useState('')
  const toastRef = useRef(null)

  const [requestedItems, setRequestedItems] = useState({})
  const [pendingRequests, setPendingRequests] = useState([])
  const [missingItemModal, setMissingItemModal] = useState(null)
  const [expandedMissingId, setExpandedMissingId] = useState(null)

  const [showReportDraftModal, setShowReportDraftModal] = useState(false)
  const [activeModal, setActiveModal] = useState(null)
  const [requestSource, setRequestSource] = useState(null)
  const [draftFramework, setDraftFramework] = useState(DEFAULT_FRAMEWORK)

  const evidencePackGaps = useUniversityWorkspaceStore((s) => s.evidencePackGaps)
  const markRequirementOverride = useUniversityWorkspaceStore((s) => s.markRequirementOverride)

  const frameworkProfile = getFrameworkProfile(selectedFramework)
  const activeGroups = frameworkProfile.groups
  const frameworks = Object.values(frameworkProfiles)
  const frameworkStats = Object.fromEntries(
    frameworks.map((profile) => [profile.label, getFrameworkStats(profile, requestedItems, overrides)]),
  )
  const activeStats = frameworkStats[selectedFramework]
  const timelineSubmissions = getTimelineSubmissions(requestedItems, overrides)
  const requirement = findRequirement(selectedRequirement, activeGroups)
  const displayStatus = getDisplayStatus(requirement, requestedItems, overrides)
  const requestInfo = requestedItems[selectedRequirement]
  const requirementContext = missingItemContext[selectedRequirement]
  const evidence =
    selectedRequirement === 'curriculum-evidence-packs'
      ? curriculumEvidenceEntry(evidencePackGaps.size)
      : evidenceByRequirement[selectedRequirement]
  const canGenerateReportSection =
    frameworkProfile.supportsReportSectionDraft &&
    frameworkProfile.reportSectionGroupIds?.includes(requirement.groupId)

  const showToast = (message) => {
    window.clearTimeout(toastRef.current)
    setToast(message)
    toastRef.current = window.setTimeout(() => setToast(''), 2800)
  }

  const selectFramework = (framework) => {
    const profile = getFrameworkProfile(framework)
    const preferred = getPreferredRequirement(profile.groups, requestedItems, overrides)
    setSelectedFramework(profile.label)
    setExpandedGroup(preferred.groupId)
    setSelectedRequirement(preferred.id)
    setExpandedMissingId(null)
  }

  const openEvidenceSummary = (framework = selectedFramework) => {
    setDraftFramework(framework)
    showToast('Generating evidence summary...')
    window.setTimeout(() => setActiveModal('generate'), 900)
  }

  const handleTimelineAction = (submissionId) => {
    const submission = timelineSubmissions.find((item) => item.id === submissionId)
    if (!submission) return
    selectFramework(submission.framework)
    if (submissionId === 'qs') {
      openEvidenceSummary(submission.framework)
    } else {
      showToast(`Highlighting ${submission.title} requirements`)
    }
    document.getElementById('requirements-checklist')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleRequestData = (source) => {
    setRequestSource(source)
    setActiveModal('request')
  }

  const confirmOverride = () => {
    setOverrides((prev) => ({ ...prev, [selectedRequirement]: true }))
    markRequirementOverride(selectedRequirement)
    setActiveModal(null)
    showToast(`${requirement.name} marked as ready (override) - logged`)
  }

  const handleRequestItem = (item, ctx) => {
    setMissingItemModal({ item, context: ctx })
  }

  const handleSendItemRequest = (recipient, itemId) => {
    const item = findRequirement(itemId, activeGroups)
    const sentAt = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
    const dueDate = '1 Aug 2026'
    setRequestedItems((prev) => ({ ...prev, [itemId]: { responsible: recipient, sentAt, dueDate } }))
    setPendingRequests((prev) => [
      ...prev,
      { itemId, itemName: item?.name ?? itemId, responsible: recipient, sentAt, dueDate },
    ])
    setMissingItemModal(null)
    showToast(`Request sent to ${recipient.split('-')[0].trim()}`)
  }

  const handleExpandMissing = (itemId) => {
    setExpandedMissingId((prev) => (prev === itemId ? null : itemId))
  }

  const handleUploadItem = (item) => {
    showToast(`Upload document for: ${item.name} (mock file picker would open here)`)
  }

  const handleMarkNAItem = (item) => {
    showToast(`"${item.name}" marked as not applicable - logged for audit trail`)
    setExpandedMissingId(null)
  }

  const draftProfile = getFrameworkProfile(draftFramework)

  return (
    <div className="university-workspace-page flex h-screen w-screen flex-col overflow-hidden text-[#111B3F]">
      <UniversityNav />
      <main className="relative min-w-0 flex-1 overflow-y-auto">
        <div className="relative mx-auto max-w-[1540px] space-y-4 px-6 py-5">
          <header className="employer-home-header">
            <h1 className="text-2xl font-semibold leading-tight tracking-normal text-slate-950">Institutional Reporting Hub</h1>
            <p className="mt-1 text-sm font-medium text-slate-500">
              Every report, prepared continuously, not when the deadline arrives.
            </p>
          </header>

          <section className="employer-glass-card flex items-center gap-5 px-6 py-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/72 text-[#6D45F5] shadow-sm">
              <Sparkles className="h-7 w-7" />
            </span>
            <p className="min-w-0 flex-1 text-sm font-semibold leading-6 text-[#252A85]">
              {getFrameworkBanner(frameworkProfile, activeStats)}
            </p>
            <button
              type="button"
              onClick={() => openEvidenceSummary(selectedFramework)}
              className="employer-primary-button flex shrink-0 items-center gap-2 px-6 py-3 text-sm"
            >
              {frameworkProfile.draftAction}
              <ArrowRight className="h-4 w-4" />
            </button>
          </section>

          <AccreditationKpis kpis={getFrameworkKpis(frameworkProfile, activeStats)} />

          <div id="requirements-checklist" className="grid grid-cols-[0.95fr_1.05fr] gap-4">
            <RequirementsChecklist
              groups={activeGroups}
              expandedGroup={expandedGroup}
              selectedRequirement={selectedRequirement}
              selectedFramework={selectedFramework}
              overrides={overrides}
              requestedItems={requestedItems}
              expandedMissingId={expandedMissingId}
              pendingRequests={pendingRequests}
              missingItemContext={missingItemContext}
              frameworkProfile={frameworkProfile}
              frameworks={frameworks}
              frameworkStats={frameworkStats}
              onToggleGroup={(groupId) => setExpandedGroup((current) => (current === groupId ? '' : groupId))}
              onSelectRequirement={setSelectedRequirement}
              onSelectFramework={selectFramework}
              onRequestItem={handleRequestItem}
              onExpandMissing={handleExpandMissing}
              onUploadItem={handleUploadItem}
              onMarkNAItem={handleMarkNAItem}
            />
            <EvidenceBuilder
              requirement={requirement}
              evidence={evidence}
              frameworkProfile={frameworkProfile}
              displayStatus={displayStatus}
              requestInfo={requestInfo}
              context={requirementContext}
              overridden={!!overrides[selectedRequirement]}
              canGenerateReportSection={canGenerateReportSection}
              reportSectionReason="MQA report section drafting is available only for BSc Computer Science programme-design requirements in this prototype."
              onRequestData={handleRequestData}
              onOverride={() => setActiveModal('override')}
              onGenerateDraft={() => {
                if (canGenerateReportSection) setShowReportDraftModal(true)
              }}
            />
          </div>

          <SubmissionTimeline submissions={timelineSubmissions} onAction={handleTimelineAction} />
        </div>
      </main>
      <DemoToast message={toast} />

      {activeModal === 'generate' ? (
        <GenerateDraftModal
          frameworkProfile={draftProfile}
          groups={draftProfile.groups}
          stats={frameworkStats[draftFramework]}
          requestedItems={requestedItems}
          overrides={overrides}
          evidenceByRequirement={evidenceByRequirement}
          onClose={() => setActiveModal(null)}
          onToast={showToast}
        />
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

      {missingItemModal ? (
        <MissingItemRequestModal
          itemId={missingItemModal.item.id}
          itemName={missingItemModal.item.name}
          context={missingItemModal.context}
          onClose={() => setMissingItemModal(null)}
          onSend={handleSendItemRequest}
        />
      ) : null}

      {showReportDraftModal ? (
        <ReportSectionDraftModal
          frameworkTitle="MQA Report Draft - BSc Computer Science"
          onClose={() => setShowReportDraftModal(false)}
          onToast={showToast}
        />
      ) : null}
    </div>
  )
}
