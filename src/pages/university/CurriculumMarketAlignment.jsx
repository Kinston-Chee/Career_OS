import React, { useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import UniversityNav from '../../components/university/UniversityNav'
import GapQuadrant from '../../components/university/curriculum/GapQuadrant'
import EvidenceChain from '../../components/university/curriculum/EvidenceChain'
import CurriculumRoadmap from '../../components/university/curriculum/CurriculumRoadmap'
import EvidencePackModal from '../../components/university/curriculum/EvidencePackModal'
import RoadmapExportModal from '../../components/university/curriculum/RoadmapExportModal'
import { quadrantNodesByProgram, roadmaps, summaryBanner } from '../../data/curriculumAlignmentData'
import { useUniversityWorkspaceStore } from '../../store/useUniversityWorkspaceStore'

function PageHeader() {
  return (
    <div className="employer-home-header">
      <h1 className="text-2xl font-semibold text-slate-950">Curriculum-Market Alignment</h1>
      <p className="mt-1 text-sm text-gray-500">Map what we teach against what the market needs — with evidence you can defend</p>
    </div>
  )
}

function SummaryBanner({ onGenerate, packCount }) {
  return (
    <section
      className="employer-glass-card flex flex-wrap items-center gap-4 p-4"
    >
      <Sparkles className="h-5 w-5 shrink-0 text-purple-600" />
      <p className="min-w-0 flex-1 text-sm text-gray-700">{summaryBanner.text}</p>
      {packCount > 0 ? (
        <span className="shrink-0 rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700">
          {packCount} gap{packCount === 1 ? '' : 's'} in pack
        </span>
      ) : null}
      <button type="button" onClick={onGenerate} disabled={packCount === 0} className="employer-primary-button flex shrink-0 items-center gap-1.5 px-5 py-2.5 text-sm disabled:opacity-50">
        Generate evidence pack
        <ArrowRight className="h-3.5 w-3.5" />
      </button>
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

export default function CurriculumMarketAlignment() {
  const [searchParams] = useSearchParams()
  const initialGapId = searchParams.get('gap')
  const [program, setProgram] = useState('BSc Data Science')
  const quadrantNodes = quadrantNodesByProgram[program]

  const [selectedGapId, setSelectedGapId] = useState(
    initialGapId && quadrantNodes.some((n) => n.id === initialGapId) ? initialGapId : 'cloud-computing'
  )
  const [addedToPack, setAddedToPack] = useState({})
  const [showPackModal, setShowPackModal] = useState(false)
  const [showRoadmapModal, setShowRoadmapModal] = useState(false)
  const [toast, setToast] = useState('')
  const toastRef = useRef(null)

  const addGapToPack = useUniversityWorkspaceStore((s) => s.addGapToPack)

  const showToast = (message) => {
    window.clearTimeout(toastRef.current)
    setToast(message)
    toastRef.current = window.setTimeout(() => setToast(''), 2400)
  }

  const selectedNode = quadrantNodes.find((n) => n.id === selectedGapId) || null
  const selectedGapName = selectedNode ? selectedNode.label : null
  const packGapNames = Object.keys(addedToPack)

  const handleProgramChange = (nextProgram) => {
    setProgram(nextProgram)
    const nodes = quadrantNodesByProgram[nextProgram]
    setSelectedGapId(nodes[0]?.id || null)
  }

  const handleSelectGap = (id) => setSelectedGapId(id)
  const handleClose = () => setSelectedGapId(null)

  const handleAddToPack = () => {
    if (!selectedGapName) return
    setAddedToPack((prev) => ({ ...prev, [selectedGapName]: true }))
    addGapToPack(selectedGapName)
    showToast(`${selectedGapName} evidence added to pack`)
  }

  const handleGenerate = () => {
    if (packGapNames.length === 0) return
    showToast('Generating evidence pack…')
    window.setTimeout(() => setShowPackModal(true), 800)
  }

  const handleExportRoadmap = () => {
    showToast('Generating roadmap document…')
    window.setTimeout(() => setShowRoadmapModal(true), 800)
  }

  const activeRoadmap = roadmaps[selectedGapName] || roadmaps['Cloud Computing']

  return (
    <div className="university-workspace-page flex h-screen w-screen flex-col overflow-hidden">
      <UniversityNav />
      <main className="min-w-0 flex-1 overflow-y-auto">
        <div className="relative z-10 mx-auto max-w-[1480px] space-y-5 px-6 py-6">
          <PageHeader />
          <SummaryBanner onGenerate={handleGenerate} packCount={packGapNames.length} />

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.2fr_1fr]">
            <GapQuadrant
              selectedGapId={selectedGapId}
              onSelectGap={handleSelectGap}
              program={program}
              onProgramChange={handleProgramChange}
              quadrantNodes={quadrantNodes}
            />
            <EvidenceChain
              selectedGapName={selectedGapName}
              onClose={handleClose}
              addedToPack={selectedGapName ? !!addedToPack[selectedGapName] : false}
              onAddToPack={handleAddToPack}
            />
          </div>

          <CurriculumRoadmap selectedGapName={selectedGapName || 'Cloud Computing'} onExport={handleExportRoadmap} />
        </div>
      </main>
      <DemoToast message={toast} />

      {showPackModal ? (
        <EvidencePackModal gapNames={packGapNames} onClose={() => setShowPackModal(false)} onToast={showToast} />
      ) : null}

      {showRoadmapModal ? (
        <RoadmapExportModal
          gapName={selectedGapName || 'Cloud Computing'}
          roadmap={activeRoadmap}
          onClose={() => setShowRoadmapModal(false)}
          onToast={showToast}
        />
      ) : null}
    </div>
  )
}
