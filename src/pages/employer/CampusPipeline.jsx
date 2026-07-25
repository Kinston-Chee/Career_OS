import React, { useState } from 'react'
import { GraduationCap, Layers } from 'lucide-react'
import EmployerNav from '../../components/employer/EmployerNav'
import CampusPipelineView from '../../components/employer/pipeline/CampusPipelineView'
import PlatformPipelineView from '../../components/employer/pipeline/PlatformPipelineView'

const VIEWS = [
  { id: 'campus', label: 'Campus Pipeline', Icon: GraduationCap },
  { id: 'platform', label: 'Platform Pipeline', Icon: Layers },
]

function PageHeader({ view, onChangeView }) {
  return (
    <div className="employer-page-header flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="employer-page-title">Pipeline</h1>
        <p className="employer-page-subtitle">
          {view === 'campus'
            ? 'Campus-driven talent relationships — from first discovery to hire.'
            : 'Platform-wide hiring performance across every job board.'}
        </p>
      </div>
      <div className="inline-flex items-center gap-0.5 rounded-full border border-[#E2E5F0] bg-white p-[3px]">
        {VIEWS.map((v) => {
          const active = view === v.id
          return (
            <button
              key={v.id}
              type="button"
              onClick={() => onChangeView(v.id)}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[13px] font-medium transition ${
                active ? 'bg-[#5B6CF9] text-white shadow-[0_1px_3px_rgba(91,108,249,.25)]' : 'text-[#6B7280] hover:text-[#1A1D2E]'
              }`}
            >
              <v.Icon className="h-3.5 w-3.5" />
              {v.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function CampusPipeline() {
  const [view, setView] = useState('campus')

  return (
    <div className="employer-workspace-page flex h-screen w-screen flex-col overflow-hidden">
      <EmployerNav variant="glass" />
      <main className="min-w-0 flex-1 overflow-y-auto">
        <div className="relative z-10 mx-auto max-w-[1480px] space-y-5 px-6 py-6">
          <PageHeader view={view} onChangeView={setView} />
          {view === 'campus' ? <CampusPipelineView /> : <PlatformPipelineView />}
        </div>
      </main>
    </div>
  )
}
