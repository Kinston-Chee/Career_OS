import React, { useRef, useState } from 'react'
import { Sparkles } from 'lucide-react'
import UniversityNav from '../../components/university/UniversityNav'
import KpiRow from '../../components/university/collaboration/KpiRow'
import PartnershipPortfolio from '../../components/university/collaboration/PartnershipPortfolio'
import RecommendedPartners from '../../components/university/collaboration/RecommendedPartners'
import ActiveEvents from '../../components/university/collaboration/ActiveEvents'
import { summaryBanner } from '../../data/collaborationData'

function PageHeader() {
  return (
    <div className="employer-home-header">
      <h1 className="text-2xl font-semibold text-slate-950">Collaboration Marketplace</h1>
      <p className="mt-1 text-sm text-gray-500">Manage corporate partnerships as a portfolio — not one-off events</p>
    </div>
  )
}

function SummaryBanner() {
  return (
    <section
      className="employer-glass-card flex items-start gap-3 p-4"
    >
      <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-purple-600" />
      <p className="text-sm leading-6 text-gray-700">{summaryBanner.text}</p>
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

export default function CollaborationMarketplace() {
  const [outreachStatus, setOutreachStatus] = useState({})
  const [eventTab, setEventTab] = useState('All')
  const [toast, setToast] = useState('')
  const toastRef = useRef(null)

  const showToast = (message) => {
    window.clearTimeout(toastRef.current)
    setToast(message)
    toastRef.current = window.setTimeout(() => setToast(''), 2400)
  }

  const handleViewPartnership = (partner) => showToast(`Opening ${partner.name} partnership details…`)
  const handleViewAll = () => showToast('Opening all 12 partnerships…')

  const handleStartOutreach = (partner) => {
    if (outreachStatus[partner.id]) return
    setOutreachStatus((prev) => ({ ...prev, [partner.id]: 'loading' }))
    window.setTimeout(() => {
      setOutreachStatus((prev) => ({ ...prev, [partner.id]: 'sent' }))
      showToast(`Outreach email drafted and sent to ${partner.name}`)
    }, 600)
  }

  const handleCreate = () => showToast('Create New Collaboration form would open here')

  return (
    <div className="university-workspace-page flex h-screen w-screen flex-col overflow-hidden">
      <UniversityNav />
      <main className="min-w-0 flex-1 overflow-y-auto">
        <div className="relative z-10 mx-auto max-w-[1480px] space-y-5 px-6 py-6">
          <PageHeader />
          <SummaryBanner />
          <KpiRow />

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.5fr_1fr]">
            <PartnershipPortfolio onViewPartnership={handleViewPartnership} onViewAll={handleViewAll} />
            <RecommendedPartners outreachStatus={outreachStatus} onStartOutreach={handleStartOutreach} />
          </div>

          <ActiveEvents activeTab={eventTab} onTabChange={setEventTab} onCreate={handleCreate} />
        </div>
      </main>
      <DemoToast message={toast} />
    </div>
  )
}
