# Architecture

This document explains how the CareerGraph codebase is organized.

## App Routing Flow

Routing is defined in:

```text
src/App.jsx
```

The app uses `react-router-dom`.

High-level route groups:

- `/` shows the role selection page.
- Student routes are wrapped with `ProtectedRoute role="student"`.
- Employer routes are wrapped with `ProtectedRoute role="employer"`.
- University routes are wrapped with `ProtectedRoute role="university"`.

Each workspace route group renders:

```jsx
<AppLayout workspace="..." />
```

Nested pages render inside the layout through React Router's `<Outlet />`.

## Role Selection Flow

The landing page is:

```text
src/pages/LandingPage.jsx
```

When a user selects a role:

1. `selectRole(role.id)` is called from the Zustand store.
2. The selected role is saved to local storage.
3. The app navigates to the matching workspace route.
4. `ProtectedRoute` checks whether the selected role matches the route group.

State is stored in:

```text
src/store/useCareerStore.js
```

## Student Workspace Structure

Student routes:

- `/student/overview`
- `/student/profile`
- `/student/intelligence`
- `/student/opportunities`
- `/student/applications`
- `/student/network`
- `/student/learning`
- `/student/ai-assistant`

Main files:

- `src/pages/CandidateOverviewPage.jsx`
- `src/pages/MemoryProfilePage.jsx`
- `src/pages/CareerIntelligencePage.jsx`
- `src/pages/OpportunitiesPage.jsx`

Related component folders:

- `src/components/student/`
- `src/components/student/overview/`
- `src/components/memory/`
- `src/components/career/`
- `src/components/career/network/`
- `src/components/opportunities/`

The Candidate Overview page is the default candidate landing page. `/student` redirects to `/student/overview`.

The Career Intelligence page has three tabs. The Career Path tab uses a custom SVG/CSS network graph in `src/components/career/network/`. It does not use a graph library.

## Employer Workspace Structure

Employer routes:

- `/employer/talent`
- `/employer/insights`
- `/employer/posting`

Main files:

- `src/pages/EmployerWorkspacePage.jsx`
- `src/pages/CandidateInsightsPage.jsx`
- `src/pages/EmployerCreateEngagementPage.jsx`

Related component folders:

- `src/components/employer/`
- `src/components/employer/engagement/`

## University Workspace Structure

University routes:

- `/university/curriculum`
- `/university/readiness`
- `/university/collaboration`

Main files:

- `src/pages/CurriculumMarketAlignmentPage.jsx`
- `src/pages/StudentReadinessOverviewPage.jsx`
- `src/pages/SocietyCorporateMarketplacePage.jsx`

Related component folders:

- `src/components/university/`
- `src/components/university/readiness/`
- `src/components/university/marketplace/`

## Layout System

The main layout is:

```text
src/components/layout/AppLayout.jsx
```

It controls:

- Full-screen workspace shell
- Left sidebar
- Topbar
- Mobile workspace navigation
- Main content scroll area
- Page outlet area

The sidebar is static on the left for desktop. Main content uses the remaining width and scrolls independently.

The candidate sidebar has a custom CareerOS visual treatment and an AI Career Companion card. Employer and university sidebars keep their own simpler workspace designs.

## Sidebar System

There are two sidebar layers:

1. Shared navigation config in `AppLayout.jsx`
2. Desktop sidebar components for each role

Desktop sidebar files:

- `src/components/student/StudentSidebar.jsx`
- `src/components/employer/EmployerSidebar.jsx`
- `src/components/university/UniversitySidebar.jsx`

The shared `workspaceConfigs` object in `AppLayout.jsx` is used for active labels, mobile nav, and route aliases.

## Topbar System

Student topbar is built directly inside `AppLayout.jsx`.

Employer and university have separate topbar files:

- `src/components/employer/EmployerTopBar.jsx`
- `src/components/university/UniversityTopBar.jsx`

These topbars provide search/profile controls and sign out.

## Shared Components

Basic reusable UI components are in:

```text
src/components/ui/
```

Current shared UI components include:

- `Card`
- `Button`
- `Tag`
- `ProgressBar`

Feature-specific reusable components live inside the matching feature folder. For example, career cards are in `src/components/career/`.

## State Management

State is managed with Zustand in:

```text
src/store/useCareerStore.js
```

The store currently manages:

- Current mock user
- Selected role
- Authentication flag
- Current workspace
- Candidate experiences
- Adding a new experience
- Signing out

Session state is saved in local storage under:

```text
careeros-session
```

## Mock AI Functions

Mock AI behavior is in:

```text
src/data/mockAi.js
```

The current mock AI function is:

- `extractSkillsFromText(text)`

It waits briefly, then returns a generated experience summary and extracted skills. This simulates an AI extraction flow without calling a real API.

## Mock Data Structure

Most page data is stored in:

```text
src/data/mockData.js
```

Major exports include:

- `mockUser`
- `candidateOverview`
- `initialExperiences`
- `skillInventory`
- `careerPaths`
- `careerPathNetwork`
- `careerIntelligence`
- `marketStanding`
- `opportunities`
- `employerCandidates`
- `employerCandidateInsights`
- `employerEngagement`
- `employerEngagementBuilder`
- `universityCurriculumAlignment`
- `universityStudentReadiness`
- `universitySocietyMarketplace`
- `universityPostEventCompletion`
