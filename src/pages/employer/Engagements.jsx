import React, { useRef, useState } from 'react'
import EmployerNav from '../../components/employer/EmployerNav'
import EngagementMetrics from '../../components/employer/engagements/EngagementMetrics'
import EngagementFilterTabs from '../../components/employer/engagements/EngagementFilterTabs'
import EngagementsGrid from '../../components/employer/engagements/EngagementsGrid'
import WizardStepIndicator from '../../components/employer/engagements/WizardStepIndicator'
import WizardStep1Goal from '../../components/employer/engagements/WizardStep1Goal'
import WizardStep2Recommendation from '../../components/employer/engagements/WizardStep2Recommendation'
import WizardStep3Details from '../../components/employer/engagements/WizardStep3Details'
import WizardStep4Review from '../../components/employer/engagements/WizardStep4Review'
import WizardBottomNav from '../../components/employer/engagements/WizardBottomNav'
import { engagements as initialEngagements, eventDetailsDefault } from '../../data/engagementsData'

function defaultDeadline() {
  const d = new Date()
  d.setDate(d.getDate() + 21)
  return d.toISOString().slice(0, 10)
}

function DemoToast({ message }) {
  if (!message) return null
  return (
    <div className="employer-glass-card fixed bottom-5 right-5 z-50 px-4 py-3 text-sm font-semibold text-slate-800">
      {message}
    </div>
  )
}

export default function Engagements() {
  const [viewMode, setViewMode] = useState('list')
  const [wizardStep, setWizardStep] = useState(1)
  const [selectedGoal, setSelectedGoal] = useState(null)
  const [filterTab, setFilterTab] = useState('All')
  const [formData, setFormData] = useState({ ...eventDetailsDefault, registrationDeadline: defaultDeadline() })
  const [engagementsList, setEngagementsList] = useState(initialEngagements)
  const [newEngagementId, setNewEngagementId] = useState(null)
  const [isPublished, setIsPublished] = useState(false)
  const [toast, setToast] = useState('')
  const toastRef = useRef(null)

  const showToast = (message) => {
    window.clearTimeout(toastRef.current)
    setToast(message)
    toastRef.current = window.setTimeout(() => setToast(''), 2400)
  }

  const startWizard = () => {
    setViewMode('wizard')
    setWizardStep(1)
    setSelectedGoal(null)
    setIsPublished(false)
  }

  const cancelWizard = () => {
    setViewMode('list')
  }

  const handleSelectGoal = (goalTitle) => {
    setSelectedGoal(goalTitle)
    window.setTimeout(() => setWizardStep(2), 400)
  }

  const handleBack = () => {
    if (wizardStep === 1) {
      cancelWizard()
      return
    }
    setWizardStep((s) => s - 1)
  }

  const handleContinue = () => {
    if (wizardStep === 2) setWizardStep(3)
    else if (wizardStep === 3) setWizardStep(4)
    else if (wizardStep === 4) handlePublish()
  }

  const handlePublish = () => {
    setIsPublished(true)
    window.setTimeout(() => {
      const newEngagement = {
        id: `published-${Date.now()}`,
        icon: 'trophy',
        iconTone: 'orange',
        badge: 'Challenge',
        badgeTone: 'orange',
        title: formData.eventName,
        company: 'Acme Corporation',
        location: formData.format,
        posted: 'Today',
        deadlineLabel: `Deadline: ${formData.registrationDeadline || 'TBD'}`,
        stat1Label: 'registrants',
        stat1Value: 0,
        stat2Label: 'qualified',
        stat2Value: 0,
        stat2Icon: 'award',
        stat3Label: 'Completion rate',
        stat3Value: '0%',
        statusDot: 'green',
        statusText: 'Active · Just published',
        filterStatus: 'Active',
        actionLabel: 'View applicants',
      }
      setEngagementsList((prev) => [newEngagement, ...prev])
      setNewEngagementId(newEngagement.id)
      setViewMode('list')
      setFilterTab('All')
      showToast('Engagement published — visible to 42 matched candidates now')
      window.setTimeout(() => setNewEngagementId(null), 1500)
    }, 1500)
  }

  const handleViewApplicants = (engagement) => {
    showToast(`Opening applicants for ${engagement.title}`)
  }

  return (
    <div className="employer-workspace-page flex h-screen w-screen flex-col overflow-hidden">
      <EmployerNav variant="glass" />

      {viewMode === 'list' ? (
        <main className="min-w-0 flex-1 overflow-y-auto engagements-fade">
          <div className="relative z-10 mx-auto max-w-[1480px] space-y-5 px-6 py-6">
            <div className="employer-page-header flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="employer-page-title">Engagements</h1>
                <p className="employer-page-subtitle">Manage your campus challenges, workshops, and hiring events</p>
              </div>
              <button
                type="button"
                onClick={startWizard}
                className="employer-primary-button px-6 py-3 text-sm"
              >
                + Create New Engagement
              </button>
            </div>

            <EngagementMetrics />
            <EngagementFilterTabs activeTab={filterTab} onChange={setFilterTab} />
            <EngagementsGrid
              engagementsList={engagementsList}
              filterTab={filterTab}
              newEngagementId={newEngagementId}
              onViewApplicants={handleViewApplicants}
            />
          </div>
        </main>
      ) : (
        <>
          <main className="min-w-0 flex-1 overflow-y-auto engagements-fade">
            <div className="relative z-10 mx-auto max-w-[1480px] space-y-6 px-6 py-6">
              <div className="employer-page-header flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="employer-page-title">Create Engagement</h1>
                  <p className="employer-page-subtitle">Let AI design the right campus strategy for your hiring goals</p>
                </div>
                {!isPublished ? (
                  <button type="button" onClick={cancelWizard} className="text-sm font-medium text-gray-400 hover:text-gray-600">
                    ← Cancel
                  </button>
                ) : null}
              </div>

              {!isPublished ? <WizardStepIndicator currentStep={wizardStep} /> : null}

              <div key={wizardStep} className="wizard-step-fade">
                {wizardStep === 1 ? <WizardStep1Goal selectedGoal={selectedGoal} onSelectGoal={handleSelectGoal} /> : null}
                {wizardStep === 2 ? (
                  <WizardStep2Recommendation
                    selectedGoal={selectedGoal}
                    onEditGoal={() => setWizardStep(1)}
                    onAccept={() => setWizardStep(3)}
                    onShowOther={() => showToast('More engagement types coming soon')}
                  />
                ) : null}
                {wizardStep === 3 ? (
                  <WizardStep3Details formData={formData} onChange={setFormData} onContinue={() => setWizardStep(4)} />
                ) : null}
                {wizardStep === 4 ? (
                  <WizardStep4Review
                    formData={formData}
                    onEditDetails={() => setWizardStep(3)}
                    onPublish={handlePublish}
                    onSaveDraft={() => showToast('Saved as draft')}
                    isPublished={isPublished}
                    matchedCount={42}
                  />
                ) : null}
              </div>
            </div>
          </main>

          {!isPublished ? (
            <WizardBottomNav step={wizardStep} onBack={handleBack} onContinue={wizardStep > 1 ? handleContinue : null} />
          ) : null}
        </>
      )}

      <DemoToast message={toast} />

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes engagementsFadeIn { from { opacity: 0; } to { opacity: 1; } }
        .engagements-fade { animation: engagementsFadeIn 200ms ease; }
        @keyframes wizardStepFade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .wizard-step-fade { animation: wizardStepFade 250ms ease; }
      `}} />
    </div>
  )
}
