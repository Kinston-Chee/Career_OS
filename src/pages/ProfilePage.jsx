import React from 'react'
import HomeTopNav from '../components/home/HomeTopNav'
import ProfileHeroCard from '../components/profile/ProfileHeroCard'
import CareerNarrativeCard from '../components/profile/CareerNarrativeCard'
import SelfDiscoveryCard from '../components/profile/SelfDiscoveryCard'
import EmployersWatchingPanel from '../components/profile/EmployersWatchingPanel'
import TopSkillsPanel from '../components/profile/TopSkillsPanel'
import ProfileSettingsPanel from '../components/profile/ProfileSettingsPanel'
import { candidateOverview, mockUser, profileOverview } from '../data/mockData'

export default function ProfilePage() {
  const readiness = candidateOverview.careerSnapshot.readiness

  return (
    <div className="min-h-screen bg-[#f6f9ff] text-[#121a3a]">
      <HomeTopNav user={mockUser} readiness={readiness} />

      <div className="mx-auto max-w-[1480px] px-4 py-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0 space-y-4">
            <ProfileHeroCard headline={profileOverview.headline} stats={profileOverview.stats} initials={mockUser.avatarInitials} />
            <CareerNarrativeCard narrative={profileOverview.careerNarrative} />
            <SelfDiscoveryCard selfDiscovery={profileOverview.selfDiscovery} />
          </div>

          <div className="min-w-0 space-y-4">
            <EmployersWatchingPanel employers={profileOverview.employersWatching} />
            <TopSkillsPanel skills={profileOverview.topSkills} />
            <ProfileSettingsPanel settings={profileOverview.settings} />
          </div>
        </div>
      </div>
    </div>
  )
}
