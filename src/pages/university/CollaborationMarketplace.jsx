import React, { useRef, useState } from 'react'
import { Sparkles } from 'lucide-react'
import UniversityNav from '../../components/university/UniversityNav'
import KpiRow from '../../components/university/collaboration/KpiRow'
import PartnershipPortfolio from '../../components/university/collaboration/PartnershipPortfolio'
import RecommendedPartners from '../../components/university/collaboration/RecommendedPartners'
import ActiveEvents from '../../components/university/collaboration/ActiveEvents'
import OutreachEmailModal from '../../components/university/collaboration/OutreachEmailModal'
import PartnerDetailModal from '../../components/university/collaboration/PartnerDetailModal'
import CreateCollaborationModal from '../../components/university/collaboration/CreateCollaborationModal'
import EventDetailModal from '../../components/university/collaboration/EventDetailModal'
import { events as initialEvents, summaryBanner } from '../../data/collaborationData'
import { useUniversityWorkspaceStore } from '../../store/useUniversityWorkspaceStore'

const TYPE_ICON = { Challenge: 'trophy', Workshop: 'cloud', Talk: 'mic' }
const TYPE_TONE = { Challenge: 'orange', Workshop: 'teal', Talk: 'purple' }

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
  const [eventsList, setEventsList] = useState(initialEvents)
  const [toast, setToast] = useState('')
  const toastRef = useRef(null)

  const [outreachPartner, setOutreachPartner] = useState(null)
  const [detailPartner, setDetailPartner] = useState(null)
  const [detailEvent, setDetailEvent] = useState(null)
  const [showCreateModal, setShowCreateModal] = useState(false)

  const incrementPartnerships = useUniversityWorkspaceStore((s) => s.incrementPartnerships)

  const showToast = (message) => {
    window.clearTimeout(toastRef.current)
    setToast(message)
    toastRef.current = window.setTimeout(() => setToast(''), 2400)
  }

  const handleViewPartnership = (partner) => setDetailPartner(partner)
  const handleViewAll = () => showToast('Opening all 12 partnerships…')

  const handleStartOutreach = (partner) => {
    if (outreachStatus[partner.id]) return
    setOutreachStatus((prev) => ({ ...prev, [partner.id]: 'loading' }))
    window.setTimeout(() => {
      setOutreachPartner(partner)
    }, 800)
  }

  const handleSendOutreach = () => {
    const partner = outreachPartner
    setOutreachPartner(null)
    setOutreachStatus((prev) => ({ ...prev, [partner.id]: 'sent' }))
    showToast(`Outreach email sent to ${partner.name} contact`)
  }

  const handleCreate = () => setShowCreateModal(true)

  const handleSaveCollaboration = (form) => {
    const newEvent = {
      id: `draft-${Date.now()}`,
      icon: TYPE_ICON[form.type] || 'trophy',
      iconTone: TYPE_TONE[form.type] || 'orange',
      title: form.eventName,
      with: form.partner,
      badge: form.type,
      badgeTone: TYPE_TONE[form.type] || 'orange',
      stat: form.targetSkills ? `Target skills: ${form.targetSkills}` : 'Details pending',
      statusDot: 'gray',
      statusText: 'Draft',
      filterGroup: 'Draft',
      detail: { participants: 'Not yet scheduled', partnerFeedback: 'Awaiting partner confirmation', skillUplift: 'Not yet measurable' },
    }
    setEventsList((prev) => [newEvent, ...prev])
    setShowCreateModal(false)
    setEventTab('Draft')
    incrementPartnerships()
    showToast(`${form.eventName} added as a new draft collaboration`)
  }

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

          <ActiveEvents
            activeTab={eventTab}
            onTabChange={setEventTab}
            onCreate={handleCreate}
            onSelectEvent={setDetailEvent}
            events={eventsList}
          />
        </div>
      </main>
      <DemoToast message={toast} />

      {outreachPartner ? (
        <OutreachEmailModal partner={outreachPartner} onClose={() => setOutreachPartner(null)} onSend={handleSendOutreach} />
      ) : null}

      {detailPartner ? <PartnerDetailModal partner={detailPartner} onClose={() => setDetailPartner(null)} /> : null}

      {showCreateModal ? (
        <CreateCollaborationModal onClose={() => setShowCreateModal(false)} onSave={handleSaveCollaboration} />
      ) : null}

      {detailEvent ? <EventDetailModal event={detailEvent} onClose={() => setDetailEvent(null)} /> : null}
    </div>
  )
}
