import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Command, Sparkles } from 'lucide-react'
import UniversityNav from '../../components/university/UniversityNav'
import KpiRow from '../../components/university/KpiRow'
import AILeadershipInbox from '../../components/university/AILeadershipInbox'
import SummaryCardsRow from '../../components/university/SummaryCardsRow'
import { universityUser } from '../../data/universityMockData'

function PageHeader() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
          <span aria-hidden="true">☀️</span>
          {universityUser.greeting}
        </h1>
        <p className="mt-1 text-sm text-gray-500">Here&rsquo;s your academic leadership briefing for {universityUser.briefingDate}</p>
      </div>

      <div className="relative w-full max-w-xl">
        <Sparkles className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#185FA5]" />
        <input
          type="text"
          placeholder="Show me which programs are losing market relevance…"
          className="h-11 w-full rounded-full border border-gray-200 bg-white pl-11 pr-16 text-sm text-gray-700 shadow-sm outline-none placeholder:text-gray-400 focus:border-blue-300"
        />
        <span className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-0.5 rounded-md bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium text-gray-400">
          <Command className="h-3 w-3" /> K
        </span>
      </div>
    </div>
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

export default function Overview() {
  const navigate = useNavigate()
  const [toast, setToast] = useState('')
  const toastRef = useRef(null)

  const showToast = (message) => {
    window.clearTimeout(toastRef.current)
    setToast(message)
    toastRef.current = window.setTimeout(() => setToast(''), 2400)
  }

  const handleInboxClick = (item) => showToast(`Opening: ${item.link}`)
  const handleNavigate = (to) => navigate(to)

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-[#F4F6FB]">
      <UniversityNav />
      <main className="min-w-0 flex-1 overflow-y-auto">
        <div className="mx-auto max-w-[1480px] space-y-5 px-6 py-6">
          <PageHeader />
          <KpiRow />
          <AILeadershipInbox onItemClick={handleInboxClick} />
          <SummaryCardsRow onNavigate={handleNavigate} />
        </div>
      </main>
      <DemoToast message={toast} />
    </div>
  )
}
