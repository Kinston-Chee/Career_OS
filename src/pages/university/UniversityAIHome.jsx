import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Bot, Command, Sparkles } from 'lucide-react'
import UniversityNav from '../../components/university/UniversityNav'
import UniversityHomeSwitcher from '../../components/university/UniversityHomeSwitcher'
import KpiRow from '../../components/university/KpiRow'
import AILeadershipInbox from '../../components/university/AILeadershipInbox'
import SummaryCardsRow from '../../components/university/SummaryCardsRow'
import AgentChatDrawer from '../../components/university/aiOffice/AgentChatDrawer'
import DecisionRoomModal from '../../components/university/aiOffice/DecisionRoomModal'
import { NLP_DEMO_QUERIES, matchNlpQuery } from '../../utils/universityNlpQueries'
import {
  ALL_ROOMS,
  PendingActionsPanel,
  QUICK_ACTIONS,
  RoomCard,
} from './UniversityAIOffice'
import robotImg from '../../assets/career-os-robot.png'

function DemoToast({ message }) {
  if (!message) return null
  return (
    <div className="employer-glass-card fixed bottom-5 right-5 z-50 px-4 py-3 text-sm font-semibold text-slate-800">
      {message}
    </div>
  )
}

export default function UniversityAIHome() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [activeAgent, setActiveAgent] = useState(null)
  const [decisionRoomOpen, setDecisionRoomOpen] = useState(false)
  const [toast, setToast] = useState('')
  const toastRef = useRef(null)

  const showToast = (message) => {
    window.clearTimeout(toastRef.current)
    setToast(message)
    toastRef.current = window.setTimeout(() => setToast(''), 3000)
  }

  const runQuery = () => {
    const matched = matchNlpQuery(query)
    if (matched) {
      showToast(matched.toast)
      navigate(matched.to)
    } else if (query.trim()) {
      showToast('Try: which programs are losing market relevance?')
    }
  }

  const handleQuickAction = (action) => {
    if (action.action === 'decision-room') {
      setDecisionRoomOpen(true)
      return
    }
    if (action.route) navigate(action.route)
  }

  return (
    <div
      className="university-workspace-page flex h-screen w-screen flex-col overflow-hidden text-[#111B3F]"
      style={{ background: 'linear-gradient(160deg, #F6F9FF 0%, #EEF4FF 48%, #F8FBFF 100%)' }}
    >
      <UniversityNav />
      <main className="min-w-0 flex-1 overflow-y-auto">
        <div className="mx-auto max-w-[1480px] space-y-5 px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="flex items-center gap-2 text-2xl font-semibold text-slate-950">
                <span className="employer-home-header-icon" aria-hidden="true">
                  <Bot className="h-4 w-4" />
                </span>
                University AI Office Home
              </h1>
              <p className="mt-1 text-sm font-medium text-slate-500">
                Morning briefing, operating rooms, and approvals in one workspace.
              </p>
            </div>
            <UniversityHomeSwitcher current="combined" />
          </div>

          <section className="grid grid-cols-[1.15fr_0.85fr] gap-4">
            <div className="rounded-2xl border border-white/70 bg-white/85 p-5 shadow-[0_10px_30px_rgba(24,95,165,0.08)] backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#EEF2FB]">
                  <img src={robotImg} alt="" className="h-12 w-12 object-contain" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-[#1B2545]">Good morning, Dr. Evelyn Chen.</p>
                  <p className="mt-1 text-xs font-medium leading-5 text-[#50607E]">
                    34 students need intervention, GenAI demand is rising, 2 decisions await approval, and MQA evidence needs follow-up.
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <div className="relative min-w-0 flex-1">
                  <Sparkles className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#185FA5]" />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') runQuery()
                    }}
                    placeholder={NLP_DEMO_QUERIES[0].label}
                    className="employer-home-command h-11 w-full pl-11 pr-20 text-sm text-slate-700 outline-none placeholder:text-slate-400"
                  />
                  <span className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1 rounded-md bg-white/70 px-1.5 py-0.5 text-[10px] font-medium text-slate-400 ring-1 ring-slate-200/70">
                    <Command className="h-3 w-3" /> Enter
                  </span>
                </div>
                <button type="button" onClick={runQuery} className="employer-primary-button flex items-center gap-2 px-5 py-3 text-sm">
                  Ask AI
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-white/70 bg-white/80 p-5 shadow-[0_10px_30px_rgba(24,95,165,0.08)] backdrop-blur-sm">
              <p className="text-sm font-bold text-[#1B2545]">Quick actions</p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {QUICK_ACTIONS.map((action) => {
                  const Icon = action.icon
                  return (
                    <button
                      key={action.label}
                      type="button"
                      onClick={() => handleQuickAction(action)}
                      className="flex items-center gap-2 rounded-xl border border-[#D8E0F0] bg-white/80 px-3 py-3 text-left text-xs font-bold text-[#26304D] transition hover:border-blue-300 hover:bg-blue-50 hover:text-[#155EE8]"
                    >
                      <Icon className="h-3.5 w-3.5 shrink-0" />
                      {action.label}
                    </button>
                  )
                })}
              </div>
            </div>
          </section>

          <KpiRow />

          <section className="grid grid-cols-[1.25fr_0.75fr] gap-4">
            <div className="rounded-2xl border border-white/70 bg-white/75 p-5 shadow-[0_10px_30px_rgba(24,95,165,0.08)] backdrop-blur-sm">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-bold text-gray-900">Operating rooms</h2>
                <span className="text-xs font-medium text-slate-400">Click a room to chat with its AI officer</span>
              </div>
              <div className="grid grid-cols-3 gap-x-5 gap-y-7" style={{ gridAutoRows: '285px' }}>
                {ALL_ROOMS.map((room) => (
                  <RoomCard
                    key={room.id}
                    dept={room}
                    compact
                    onChat={setActiveAgent}
                    onDecisionRoom={() => setDecisionRoomOpen(true)}
                  />
                ))}
              </div>
            </div>

            <AILeadershipInbox
              onItemClick={(item) => {
                showToast(`Opening: ${item.link}`)
                navigate(item.to)
              }}
            />
          </section>

          <PendingActionsPanel />
          <SummaryCardsRow onNavigate={(to) => navigate(to)} />
        </div>
      </main>

      <DemoToast message={toast} />
      {activeAgent ? <AgentChatDrawer agent={activeAgent} onClose={() => setActiveAgent(null)} /> : null}
      {decisionRoomOpen ? <DecisionRoomModal onClose={() => setDecisionRoomOpen(false)} /> : null}
    </div>
  )
}
