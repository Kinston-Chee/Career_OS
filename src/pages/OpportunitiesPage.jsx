import React, { useMemo, useState } from 'react'
import HomeTopNav from '../components/home/HomeTopNav'
import OpportunitiesHeader from '../components/opportunitiesHub/OpportunitiesHeader'
import OpportunitiesHeroCard from '../components/opportunitiesHub/OpportunitiesHeroCard'
import OpportunityGridCard from '../components/opportunitiesHub/OpportunityGridCard'
import ApplicationTrackerPanel from '../components/opportunitiesHub/ApplicationTrackerPanel'
import WhyThese3Modal from '../components/opportunitiesHub/WhyThese3Modal'
import OpportunityDetailsPanel from '../components/opportunitiesHub/OpportunityDetailsPanel'
import { candidateOverview, mockUser, opportunitiesHub, opportunityDetails } from '../data/mockData'
import { useCareerStore } from '../store/useCareerStore'

const TAB_TYPE_MAP = {
  All: null,
  Internships: 'internship',
  Challenges: 'challenge',
  Jobs: 'job',
  Events: 'event',
}

export default function OpportunitiesPage() {
  const readiness = candidateOverview.careerSnapshot.readiness
  const [activeTab, setActiveTab] = useState('All')
  const [showWhyModal, setShowWhyModal] = useState(false)
  const [activeOpportunity, setActiveOpportunity] = useState(null)
  const [appliedIds, setAppliedIds] = useState([])

  const opportunityTracker = useCareerStore((state) => state.opportunityTracker)
  const addOpportunityTrackerEntry = useCareerStore((state) => state.addOpportunityTrackerEntry)

  const filteredCards = useMemo(() => {
    const type = TAB_TYPE_MAP[activeTab]
    if (!type) return opportunitiesHub.cards
    return opportunitiesHub.cards.filter((card) => card.type === type)
  }, [activeTab])

  const handleApplied = (opportunity) => {
    setAppliedIds((prev) => (prev.includes(opportunity.id) ? prev : [...prev, opportunity.id]))
    addOpportunityTrackerEntry({
      logo: opportunity.logo,
      logoTone: opportunity.logoTone,
      company: opportunity.org,
      role: opportunity.title,
      dateLabel: 'Applied just now',
      status: 'Applied',
      statusTone: 'emerald',
    })
  }

  const handleViewDetails = (id) => {
    const detail = opportunityDetails[id]
    if (detail) setActiveOpportunity(detail)
  }

  return (
    <div className="min-h-screen bg-[#f6f9ff] text-[#121a3a]">
      <HomeTopNav user={mockUser} readiness={readiness} />

      <div className="mx-auto max-w-[1480px] px-4 py-5 sm:px-6 lg:px-8">
        <div className="space-y-5">
          <OpportunitiesHeader tabs={opportunitiesHub.filterTabs} activeTab={activeTab} onTabChange={setActiveTab} />

          <OpportunitiesHeroCard
            headline={opportunitiesHub.heroHeadline}
            picks={opportunitiesHub.heroPicks}
            onWhyClick={() => setShowWhyModal(true)}
            onViewDetails={handleViewDetails}
          />

          <div className="flex items-end justify-between">
            <span className="text-xl font-semibold text-[#11194a]">All opportunities</span>
            <span className="text-xs font-medium text-[#7382a1]">{opportunitiesHub.resultsSummary}</span>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {filteredCards.length === 0 ? (
                <div className="col-span-full flex min-h-[160px] items-center justify-center rounded-xl border border-dashed border-slate-300 bg-gray-50/60 p-8 text-center transition-opacity duration-200">
                  <p className="text-sm font-medium text-[#9aa6c3]">No jobs found yet — check back soon</p>
                </div>
              ) : (
                filteredCards.map((card) => (
                  <div key={card.id} className="opacity-100 scale-100 transition-all duration-200">
                    <OpportunityGridCard
                      opportunity={card}
                      applied={appliedIds.includes(card.id)}
                      onViewDetails={() => handleViewDetails(card.id)}
                    />
                  </div>
                ))
              )}
            </div>

            <div className="min-w-0">
              <ApplicationTrackerPanel applications={opportunityTracker} />
            </div>
          </div>
        </div>
      </div>

      {showWhyModal && <WhyThese3Modal sections={opportunitiesHub.whyThese3} onClose={() => setShowWhyModal(false)} />}

      <OpportunityDetailsPanel opportunity={activeOpportunity} onClose={() => setActiveOpportunity(null)} onApplied={handleApplied} />
    </div>
  )
}
