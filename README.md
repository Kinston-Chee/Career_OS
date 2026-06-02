# CareerGraph

CareerGraph is a frontend demo for a career operating system. It shows how candidates, employers, and universities can use shared career evidence to make better decisions.

The app is currently a React prototype with mock data. It does not have a backend yet.

## Project Overview

CareerGraph has three main workspaces:

- Candidate workspace: helps students build a memory profile, understand career readiness, and discover matched opportunities.
- Employer workspace: helps employers find evidence-backed candidates, review talent pipeline insights, and create student engagement opportunities.
- University workspace: helps universities compare curriculum with market demand, monitor student readiness, and manage society-company collaboration.

## Tech Stack

- React
- Vite
- React Router
- Zustand
- Tailwind CSS
- Mock data and mock AI helpers

## How To Install

From the project folder:

```powershell
cd "C:\Users\kinst\OneDrive\文档\TalentBank Hackathon"
npm install
```

If PowerShell blocks `npm`, use:

```powershell
npm.cmd install
```

## How To Run Locally

```powershell
npm run dev
```

If PowerShell blocks `npm`, use:

```powershell
npm.cmd run dev
```

Then open:

```text
http://localhost:5173
```

## Main Routes

- `/` - role selection page
- `/student/overview` - candidate overview dashboard
- `/student/profile` - candidate memory profile
- `/student/intelligence` - candidate career intelligence
- `/student/opportunities` - candidate opportunity marketplace
- `/employer/talent` - employer talent discovery
- `/employer/insights` - employer candidate insights
- `/employer/posting` - employer engagement builder
- `/university/curriculum` - curriculum-market alignment
- `/university/readiness` - student readiness overview
- `/university/collaboration` - society-corporate marketplace

Some older route names redirect to the current routes. See `src/App.jsx`.

## User Roles

- Candidate: uses the student workspace routes.
- Employer: uses the employer workspace routes.
- University: uses the university workspace routes.

The landing page stores the selected role in local storage. Protected routes use that selected role to decide which workspace can be opened.

## Folder Structure

```text
src/
  App.jsx                    App routes and redirects
  main.jsx                   React app entry point
  styles.css                 Global Tailwind styles
  components/                Reusable UI and workspace components
  data/                      Mock data and mock AI functions
  pages/                     Route-level pages
  store/                     Zustand app state
```

## Where Mock Data Is Stored

Most mock data is in:

```text
src/data/mockData.js
```

Mock AI behavior is in:

```text
src/data/mockAi.js
```

## Where Reusable Components Are Stored

Shared components are in:

```text
src/components/
```

Important component folders:

- `src/components/ui/` - shared cards, buttons, tags, and progress bars
- `src/components/layout/` - global workspace layout
- `src/components/session/` - role cards, protected routes, sign out
- `src/components/memory/` - candidate memory profile components
- `src/components/career/` - career intelligence components
- `src/components/career/network/` - career path network graph components
- `src/components/student/overview/` - candidate overview dashboard components
- `src/components/opportunities/` - opportunity marketplace components
- `src/components/employer/` - employer workspace components
- `src/components/university/` - university workspace components

## How To Add A New Page

1. Create a new page file in `src/pages/`.
2. Import it in `src/App.jsx`.
3. Add a new `<Route>` inside the correct workspace route group.
4. Add a matching sidebar item in `src/components/layout/AppLayout.jsx` or in the matching sidebar component.
5. Add any mock data needed in `src/data/mockData.js`.

## How To Modify Sidebar Items

Start with:

```text
src/components/layout/AppLayout.jsx
```

The `workspaceConfigs` object controls the mobile nav labels, active page title, paths, and route aliases.

The desktop sidebars are here:

- `src/components/student/StudentSidebar.jsx`
- `src/components/employer/EmployerSidebar.jsx`
- `src/components/university/UniversitySidebar.jsx`

Update both the shared config and the matching desktop sidebar when adding or renaming workspace navigation.

## How To Change Mock Data

Edit:

```text
src/data/mockData.js
```

Find the exported object or array for the page you want to change. For example:

- `initialExperiences` controls candidate memory profile examples.
- `candidateOverview` controls the Candidate Overview dashboard.
- `careerPaths` controls career path recommendations.
- `careerPathNetwork` controls the Career Path tab network graph.
- `opportunities` controls the candidate opportunity marketplace.
- `employerCandidateInsights` controls employer analytics.
- `universityCurriculumAlignment` controls curriculum alignment.
- `universityStudentReadiness` controls student readiness.
- `universitySocietyMarketplace` controls university event marketplace.

## How To Test The Demo Flow

1. Run the app with `npm.cmd run dev`.
2. Open `http://localhost:5173`.
3. Select Candidate, Employer, or University.
4. Use the sidebar to move through the workspace.
5. Try a few demo interactions:
   - Candidate: review the Overview dashboard at `/student/overview`.
   - Candidate: add an experience in Memory Profile.
   - Candidate: switch to Career Intelligence, open Career Path, click graph role nodes, and try graph filters.
   - Candidate: filter/search opportunities.
   - Employer: search talent and switch Create Engagement tabs.
   - Employer: send interest to a club request.
   - University: switch Society-Corporate Marketplace tabs.
   - University: confirm or reject skill suggestions after an event.

Most actions are mock interactions. They update local UI state or show toast messages.
