import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import AlumniSignalIntelligencePage from './pages/AlumniSignalIntelligencePage'
import AICompanionPage from './pages/AICompanionPage'
import ApplicationsPage from './pages/ApplicationsPage'
import AuthPage from './pages/AuthPage'
import CandidateHomePage from './pages/CandidateHomePage'
import CandidateInsightsPage from './pages/CandidateInsightsPage'
import CandidateOverviewPage from './pages/CandidateOverviewPage'
import CareerIntelligencePage from './pages/CareerIntelligencePage'
import CurriculumMarketAlignmentPage from './pages/CurriculumMarketAlignmentPage'
import EmployerCreateEngagementPage from './pages/EmployerCreateEngagementPage'
import Analytics from './pages/employer/Analytics'
import Candidates from './pages/employer/Candidates'
import CampusPipeline from './pages/employer/CampusPipeline'
import Engagements from './pages/employer/Engagements'
import EmployerHome from './pages/EmployerHome'
import EmployerWorkspacePage from './pages/EmployerWorkspacePage'
import TalentDiscovery from './pages/employer/TalentDiscovery'
import LandingPage from './pages/LandingPage'
import JobMarketplacePage from './pages/JobMarketplacePage'
import MemoryProfilePage from './pages/MemoryProfilePage'
import OpportunitiesPage from './pages/OpportunitiesPage'
import PlaceholderPage from './pages/PlaceholderPage'
import ProfilePage from './pages/ProfilePage'
import CareerAnimalPage from './pages/CareerAnimalPage'
import ProtectedRoute from './components/session/ProtectedRoute'
import SocietyCorporateMarketplacePage from './pages/SocietyCorporateMarketplacePage'
import StudentReadinessOverviewPage from './pages/StudentReadinessOverviewPage'
import UniversityOverview from './pages/university/Overview'
import CurriculumMarketAlignment from './pages/university/CurriculumMarketAlignment'
import StudentReadiness from './pages/university/StudentReadiness'
import AlumniSignalIntelligence from './pages/university/AlumniSignalIntelligence'
import CollaborationMarketplace from './pages/university/CollaborationMarketplace'
import AccreditationHub from './pages/university/AccreditationHub'
import WorkspacePlaceholderPage from './pages/WorkspacePlaceholderPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/login" element={<Navigate to="/auth" replace />} />
      <Route path="/signup" element={<Navigate to="/auth?mode=signup" replace />} />

      {/* Each workspace is protected by the role selected on the landing page. */}
      <Route element={<ProtectedRoute role="student" />}>
        {/* Round 2 AI-first pages — own top-nav layout, kept outside AppLayout's sidebar shell. */}
        <Route path="/student/home" element={<CandidateHomePage />} />
        <Route path="/student/profile" element={<MemoryProfilePage />} />
        <Route path="/student/memory-profile" element={<MemoryProfilePage />} />
        <Route path="/student/intelligence" element={<CareerIntelligencePage />} />
        <Route path="/student/career-intelligence" element={<CareerIntelligencePage />} />
        <Route path="/student/opportunities" element={<OpportunitiesPage />} />
        <Route path="/student/ai-companion" element={<AICompanionPage />} />
        <Route path="/student/ai-assistant" element={<Navigate to="/student/ai-companion" replace />} />
        <Route path="/student/account" element={<ProfilePage />} />
        <Route path="/student/career-animal" element={<CareerAnimalPage />} />

        <Route element={<AppLayout workspace="student" />}>
          <Route path="/student" element={<Navigate to="/student/overview" replace />} />
          <Route path="/student/overview" element={<CandidateOverviewPage />} />
          <Route path="/student/applications" element={<ApplicationsPage />} />
          <Route
            path="/student/network"
            element={<PlaceholderPage title="Network & Mentors" />}
          />
          <Route
            path="/student/learning"
            element={<PlaceholderPage title="Learning & Skills" />}
          />
          <Route
            path="/student/settings"
            element={<PlaceholderPage title="Settings" />}
          />
          <Route path="/student/help" element={<PlaceholderPage title="Help" />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute role="employer" />}>
        {/* Round 2 AI-first pages — own top-nav layout, kept outside AppLayout's sidebar shell. */}
        <Route path="/employer/home" element={<EmployerHome />} />
        <Route path="/employer/talent" element={<EmployerWorkspacePage />} />
        <Route path="/employer/talent-discovery" element={<TalentDiscovery />} />
        <Route path="/employer/posting" element={<Engagements />} />
        <Route path="/employer/campus-pipeline" element={<CampusPipeline />} />
        <Route path="/employer/analytics" element={<Analytics />} />
        <Route path="/employer/candidates" element={<Candidates />} />

        <Route element={<AppLayout workspace="employer" />}>
          <Route path="/employer" element={<Navigate to="/employer/home" replace />} />
          <Route path="/employer/insights" element={<CandidateInsightsPage />} />
          <Route path="/employer/posting-legacy" element={<EmployerCreateEngagementPage />} />
          <Route path="/employer/marketplace" element={<JobMarketplacePage />} />
          <Route path="/employer/settings" element={<PlaceholderPage title="Settings" />} />
          <Route path="/employer/help" element={<PlaceholderPage title="Help" />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute role="university" />}>
        {/* Round 2 AI-first pages — own top-nav layout, kept outside AppLayout's sidebar shell. */}
        <Route path="/university" element={<Navigate to="/university/overview" replace />} />
        <Route path="/university/overview" element={<UniversityOverview />} />
        <Route path="/university/student-readiness" element={<StudentReadiness />} />
        <Route path="/university/curriculum-alignment" element={<CurriculumMarketAlignment />} />
        <Route path="/university/alumni-signals" element={<AlumniSignalIntelligence />} />
        <Route path="/university/collaboration" element={<CollaborationMarketplace />} />
        <Route path="/university/accreditation" element={<AccreditationHub />} />

        <Route element={<AppLayout workspace="university" />}>
          <Route path="/university/readiness" element={<StudentReadinessOverviewPage />} />
          <Route path="/university/curriculum" element={<CurriculumMarketAlignmentPage />} />
          <Route path="/university/curriculum-market-alignment" element={<CurriculumMarketAlignmentPage />} />
          <Route path="/university/signals" element={<AlumniSignalIntelligencePage />} />
          <Route
            path="/university/collaboration/*"
            element={<SocietyCorporateMarketplacePage />}
          />
          <Route
            path="/university/society-corporate-marketplace/*"
            element={<SocietyCorporateMarketplacePage />}
          />
          <Route path="/university/reports" element={<PlaceholderPage title="Reports" />} />
          <Route path="/university/settings" element={<PlaceholderPage title="Settings" />} />
          <Route path="/university/help" element={<PlaceholderPage title="Help" />} />
        </Route>
      </Route>

      {/* Older demo URLs redirect to the current workspace routes. */}
      <Route path="/dashboard" element={<Navigate to="/student/profile" replace />} />
      <Route path="/profile" element={<Navigate to="/student/profile" replace />} />
      <Route path="/memory-profile" element={<Navigate to="/student/profile" replace />} />
      <Route path="/intelligence" element={<Navigate to="/student/intelligence" replace />} />
      <Route path="/career-intelligence" element={<Navigate to="/student/intelligence" replace />} />
      <Route path="/opportunities" element={<Navigate to="/student/opportunities" replace />} />
      <Route path="/employer-view" element={<Navigate to="/employer/home" replace />} />
      <Route path="/university-hub" element={<Navigate to="/university/readiness" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
