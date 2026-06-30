import React, { useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import UniversityNav from '../../components/university/UniversityNav'
import GapQuadrant from '../../components/university/curriculum/GapQuadrant'
import EvidenceChain from '../../components/university/curriculum/EvidenceChain'
import CurriculumRoadmap from '../../components/university/curriculum/CurriculumRoadmap'
import { quadrantNodes, summaryBanner } from '../../data/curriculumAlignmentData'

function PageHeader() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Curriculum-Market Alignment</h1>
      <p className="mt-1 text-sm text-gray-500">Map what we teach against what the market needs — with evidence you can defend</p>
    </div>
  )
}

function SummaryBanner({ onGenerate }) {
  return (
    <section
      className="flex flex-wrap items-center gap-4 rounded-2xl p-4"
      style={{ backgroundColor: 'rgba(240,238,255,0.5)', border: '1px solid rgba(200,190,255,0.4)' }}
    >
      <Sparkles className="h-5 w-5 shrink-0 text-purple-600" />
      <p className="min-w-0 flex-1 text-sm text-gray-700">{summaryBanner.text}</p>
      <button type="button" onClick={onGenerate} className="flex shrink-0 items-center gap-1.5 rounded-full bg-[#185FA5] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#134c87]">
        Generate evidence pack
        <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </section>
  )
}

function DemoToast({ message }) {
  if (!message) return null
  return (
    <div className="fixed bottom-5 right-5 z-50 rounded-xl border border-gray-100 bg-white px-4 py-3 text-sm font-semibold text-gray-800 shadow-lg">
      {message}
    </div>
  )
}

export default function CurriculumMarketAlignment() {
  const [searchParams] = useSearchParams()
  const initialGapId = searchParams.get('gap')
  const [selectedGapId, setSelectedGapId] = useState(
    initialGapId && quadrantNodes.some((n) => n.id === initialGapId) ? initialGapId : 'cloud-computing'
  )
  const [addedToPack, setAddedToPack] = useState({})
  const [toast, setToast] = useState('')
  const toastRef = useRef(null)

  const showToast = (message) => {
    window.clearTimeout(toastRef.current)
    setToast(message)
    toastRef.current = window.setTimeout(() => setToast(''), 2400)
  }

  const selectedNode = quadrantNodes.find((n) => n.id === selectedGapId) || null
  const selectedGapName = selectedNode ? selectedNode.label : null

  const handleSelectGap = (id) => setSelectedGapId(id)
  const handleClose = () => setSelectedGapId(null)

  const handleAddToPack = () => {
    if (!selectedGapName) return
    setAddedToPack((prev) => ({ ...prev, [selectedGapName]: true }))
    showToast(`${selectedGapName} evidence added to pack`)
  }

  const handleGenerate = () => {
    showToast('Generating evidence pack…')
    window.setTimeout(() => showToast('Evidence pack ready — 4 sources included'), 1000)
  }

  const handleExportRoadmap = () => {
    showToast('Generating evidence pack…')
    window.setTimeout(() => showToast('Evidence pack ready — 4 sources included'), 1000)
  }

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-[#F4F6FB]">
      <UniversityNav />
      <main className="min-w-0 flex-1 overflow-y-auto">
        <div className="mx-auto max-w-[1480px] space-y-5 px-6 py-6">
          <PageHeader />
          <SummaryBanner onGenerate={handleGenerate} />

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.2fr_1fr]">
            <GapQuadrant selectedGapId={selectedGapId} onSelectGap={handleSelectGap} />
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
    </div>
  )
}
