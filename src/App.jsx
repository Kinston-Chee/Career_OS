import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import CandidateInsightsPage from './pages/CandidateInsightsPage'
import CandidateOverviewPage from './pages/CandidateOverviewPage'
import CareerIntelligencePage from './pages/CareerIntelligencePage'
import CurriculumMarketAlignmentPage from './pages/CurriculumMarketAlignmentPage'
import EmployerCreateEngagementPage from './pages/EmployerCreateEngagementPage'
import EmployerWorkspacePage from './pages/EmployerWorkspacePage'
import LandingPage from './pages/LandingPage'
import MemoryProfilePage from './pages/MemoryProfilePage'
import OpportunitiesPage from './pages/OpportunitiesPage'
import PlaceholderPage from './pages/PlaceholderPage'
import ProtectedRoute from './components/session/ProtectedRoute'
import SocietyCorporateMarketplacePage from './pages/SocietyCorporateMarketplacePage'
import StudentReadinessOverviewPage from './pages/StudentReadinessOverviewPage'
import WorkspacePlaceholderPage from './pages/WorkspacePlaceholderPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      {/* Each workspace is protected by the role selected on the landing page. */}
      <Route element={<ProtectedRoute role="student" />}>
        <Route element={<AppLayout workspace="student" />}>
          <Route path="/student" element={<Navigate to="/student/overview" replace />} />
          <Route path="/student/overview" element={<CandidateOverviewPage />} />
          <Route path="/student/profile" element={<MemoryProfilePage />} />
          <Route path="/student/memory-profile" element={<MemoryProfilePage />} />
          <Route path="/student/intelligence" element={<CareerIntelligencePage />} />
          <Route path="/student/career-intelligence" element={<CareerIntelligencePage />} />
          <Route path="/student/opportunities" element={<OpportunitiesPage />} />
          <Route path="/student/applications" element={<PlaceholderPage title="Applications" />} />
          <Route path="/student/network" element={<PlaceholderPage title="Network & Mentors" />} />
          <Route path="/student/learning" element={<PlaceholderPage title="Learning & Skills" />} />
          <Route path="/student/ai-assistant" element={<PlaceholderPage title="AI Assistant" />} />
          <Route path="/student/settings" element={<PlaceholderPage title="Settings" />} />
          <Route path="/student/help" element={<PlaceholderPage title="Help" />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute role="employer" />}>
        <Route element={<AppLayout workspace="employer" />}>
          <Route path="/employer" element={<EmployerWorkspacePage />} />
          <Route path="/employer/talent" element={<EmployerWorkspacePage />} />
          <Route path="/employer/talent-discovery" element={<EmployerWorkspacePage />} />
          <Route path="/employer/insights" element={<CandidateInsightsPage />} />
          <Route path="/employer/posting" element={<EmployerCreateEngagementPage />} />
          <Route path="/employer/settings" element={<PlaceholderPage title="Settings" />} />
          <Route path="/employer/help" element={<PlaceholderPage title="Help" />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute role="university" />}>
        <Route element={<AppLayout workspace="university" />}>
          <Route path="/university" element={<CurriculumMarketAlignmentPage />} />
          <Route path="/university/readiness" element={<StudentReadinessOverviewPage />} />
          <Route path="/university/student-readiness" element={<StudentReadinessOverviewPage />} />
          <Route path="/university/curriculum" element={<CurriculumMarketAlignmentPage />} />
          <Route path="/university/curriculum-market-alignment" element={<CurriculumMarketAlignmentPage />} />
          <Route
            path="/university/signals"
            element={
              <WorkspacePlaceholderPage
                title="Industry Signals"
                description="A future space for demand trends, emerging skills, and market movement."
              />
            }
          />
          <Route
            path="/university/collaboration"
            element={<SocietyCorporateMarketplacePage />}
          />
          <Route
            path="/university/society-corporate-marketplace"
            element={<SocietyCorporateMarketplacePage />}
          />
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
      <Route path="/employer-view" element={<Navigate to="/employer/talent" replace />} />
      <Route path="/university-hub" element={<Navigate to="/university/readiness" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
