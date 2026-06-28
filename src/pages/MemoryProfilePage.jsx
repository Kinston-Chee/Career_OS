import React, { useState } from 'react'
import HomeTopNav from '../components/home/HomeTopNav'
import CompanionChatPanel from '../components/careerMemory/CompanionChatPanel'
import MemoryTimeline from '../components/careerMemory/MemoryTimeline'
import AISignalsPanel from '../components/careerMemory/AISignalsPanel'
import GapsPanel from '../components/careerMemory/GapsPanel'
import { candidateOverview, careerMemoryDemo, careerMemoryView, mockUser } from '../data/mockData'

export default function MemoryProfilePage() {
  const readiness = candidateOverview.careerSnapshot.readiness
  const [draftPhase, setDraftPhase] = useState('hidden')
  const [leadershipBoost, setLeadershipBoost] = useState(false)

  return (
    <div className="min-h-screen bg-[#f6f9ff] text-[#121a3a]">
      <HomeTopNav user={mockUser} readiness={readiness} />

      <div className="mx-auto max-w-[1480px] px-4 py-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[300px_minmax(0,1fr)_320px]">
          <div className="min-w-0 lg:h-[calc(100vh-7rem)]">
            <CompanionChatPanel
              companion={careerMemoryView.companion}
              onShowDraft={() => setDraftPhase('typing')}
              onConfirmDraft={() => setDraftPhase('confirming')}
            />
          </div>

          <div className="min-w-0">
            <MemoryTimeline
              timeline={careerMemoryView.timeline}
              draftEntry={careerMemoryDemo.draftEntry}
              draftPhase={draftPhase}
              onSignalBoost={() => setLeadershipBoost(true)}
            />
          </div>

          <div className="min-w-0 space-y-4">
            <AISignalsPanel signals={careerMemoryView.aiSignals} leadershipBoost={leadershipBoost} />
            <GapsPanel gaps={careerMemoryView.gaps} />
          </div>
        </div>
      </div>
    </div>
  )
}
