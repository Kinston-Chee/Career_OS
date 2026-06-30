import React, { useRef, useState } from 'react'
import { ArrowRight, Sparkles } from 'lucide-react'
import UniversityNav from '../../components/university/UniversityNav'
import AccreditationKpis from '../../components/university/accreditation/AccreditationKpis'
import EvidenceBuilder from '../../components/university/accreditation/EvidenceBuilder'
import RequirementsChecklist from '../../components/university/accreditation/RequirementsChecklist'
import SubmissionTimeline from '../../components/university/accreditation/SubmissionTimeline'
import {
  accreditationSummary,
  evidenceByRequirement,
  requirementGroups,
  timelineSubmissions,
} from '../../components/university/accreditation/accreditationData'

function findRequirement(id) {
  for (const group of requirementGroups) {
    const match = group.items.find((item) => item.id === id)
    if (match) return match
  }
  return requirementGroups[0].items[0]
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
  const [toast, setToast] = useState('')
  const toastRef = useRef(null)

  const showToast = (message) => {
    window.clearTimeout(toastRef.current)
    setToast(message)
    toastRef.current = window.setTimeout(() => setToast(''), 2400)
  }

  const handleGenerate = () => {
    showToast('Generating evidence pack...')
    window.setTimeout(() => showToast('Draft pack ready - 41 evidence points included'), 1000)
  }

  const requirement = findRequirement(selectedRequirement)
  const evidence = evidenceByRequirement[selectedRequirement]

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-[#F4F6FB] text-[#111B3F]">
      <UniversityNav />
      <main className="relative min-w-0 flex-1 overflow-y-auto">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-[-10%] top-[-18%] h-[420px] w-[520px] rounded-full bg-blue-200/28 blur-3xl" />
          <div className="absolute right-[6%] top-[12%] h-[260px] w-[360px] rounded-full bg-indigo-200/18 blur-3xl" />
          <div className="absolute bottom-[-18%] left-[26%] h-[360px] w-[520px] rounded-full bg-cyan-100/26 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-[1540px] space-y-4 px-6 py-5">
          <header>
            <h1 className="text-[32px] font-bold leading-tight tracking-normal text-[#101A3D]">Accreditation Hub</h1>
            <p className="mt-1 text-sm font-medium text-[#687492]">
              Evidence, automatically assembled &mdash; no more last-minute scrambling
            </p>
          </header>

          <section className="flex items-center gap-5 rounded-2xl border border-[#C7D4F8] bg-white/62 px-6 py-4 shadow-[0_18px_55px_rgba(24,95,165,0.10)] backdrop-blur-xl">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/72 text-[#6D45F5] shadow-sm">
              <Sparkles className="h-7 w-7" />
            </span>
            <p className="min-w-0 flex-1 text-sm font-semibold leading-6 text-[#252A85]">{accreditationSummary.banner}</p>
            <button
              type="button"
              onClick={handleGenerate}
              className="flex shrink-0 items-center gap-2 rounded-lg bg-[#155EE8] px-6 py-3 text-sm font-bold text-white shadow-[0_14px_30px_rgba(21,94,232,0.28)] transition hover:bg-[#124FC4]"
            >
              Generate draft pack
              <ArrowRight className="h-4 w-4" />
            </button>
          </section>

          <AccreditationKpis kpis={accreditationSummary.kpis} />

          <div className="grid grid-cols-[0.95fr_1.05fr] gap-4">
            <RequirementsChecklist
              groups={requirementGroups}
              expandedGroup={expandedGroup}
              selectedRequirement={selectedRequirement}
              onToggleGroup={(groupId) => setExpandedGroup((current) => (current === groupId ? '' : groupId))}
              onSelectRequirement={setSelectedRequirement}
            />
            <EvidenceBuilder
              requirement={requirement}
              evidence={evidence}
              onSourceAction={showToast}
              onOverride={() => showToast('Marked as ready - override logged')}
            />
          </div>

          <SubmissionTimeline submissions={timelineSubmissions} onAction={handleGenerate} />
        </div>
      </main>
      <DemoToast message={toast} />
    </div>
  )
}
