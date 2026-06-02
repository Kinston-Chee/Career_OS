# Page Guide

Use this guide when you want to understand or modify a specific page.

## Role Selection

- Purpose: lets the user choose Candidate, Employer, or University.
- Route: `/`
- Main file: `src/pages/LandingPage.jsx`
- Related components: `src/components/session/RoleCard.jsx`
- Mock data used: role cards are defined inside `LandingPage.jsx`
- To change UI/content: edit `LandingPage.jsx` and `RoleCard.jsx`

## Student: Candidate Overview

- Purpose: gives candidates a warm CareerOS home screen with readiness, actions, signals, recommendations, and recent memories.
- Route: `/student/overview`
- Main file: `src/pages/CandidateOverviewPage.jsx`
- Related components: `src/components/student/overview/`, `src/components/student/AICompanionCard.jsx`
- Mock data used: `candidateOverview`
- To change UI/content: edit `CandidateOverviewPage.jsx`, overview components, or `candidateOverview` in `mockData.js`

## Student: Memory Profile

- Purpose: shows candidate experiences, evidence, credibility, and extracted skills.
- Route: `/student/profile`
- Main file: `src/pages/MemoryProfilePage.jsx`
- Related components: `src/components/memory/`
- Mock data used: `initialExperiences`, `mockUser`
- To change UI/content: edit `MemoryProfilePage.jsx`, memory components, or `initialExperiences` in `mockData.js`

## Student: Career Intelligence

- Purpose: shows readiness, a career path network graph, missing skills, salary benchmarks, and market standing.
- Route: `/student/intelligence`
- Main file: `src/pages/CareerIntelligencePage.jsx`
- Related components: `src/components/career/`, `src/components/career/network/`
- Mock data used: `careerIntelligence`, `careerPaths`, `careerPathNetwork`, `marketStanding`
- To change UI/content: edit `CareerIntelligencePage.jsx`, career components, network graph components, or the related exports in `mockData.js`

Career Intelligence tabs:

- Skill Summary: summary charts and missing skill cards.
- Career Path: custom network graph plus selected path detail section.
- Market Standing: market demand, salary, and trend views.

Career Path graph files:

- `CareerPathNetworkGraph.jsx` controls the graph card.
- `GraphConnection.jsx` controls curved SVG lines, glow, and active line animation.
- `CareerGraphNode.jsx` controls role/skill/center nodes.
- `CareerGraphFilter.jsx`, `CareerGraphLegend.jsx`, `CareerGraphControls.jsx`, and `CareerGraphTooltip.jsx` control supporting graph UI.

## Student: Opportunities

- Purpose: shows matched opportunities such as internships, courses, events, competitions, and hackathons.
- Route: `/student/opportunities`
- Main file: `src/pages/OpportunitiesPage.jsx`
- Related components: `src/components/opportunities/`
- Mock data used: `opportunities`
- To change UI/content: edit opportunity components or the `opportunities` array in `mockData.js`

## Employer: Talent Discovery

- Purpose: lets employers search candidate cards by role or skill.
- Route: `/employer/talent`
- Main file: `src/pages/EmployerWorkspacePage.jsx`
- Related components: `src/components/ui/Card.jsx`, `src/components/ui/Tag.jsx`
- Mock data used: `employerCandidates`
- To change UI/content: edit `EmployerWorkspacePage.jsx` or `employerCandidates` in `mockData.js`

## Employer: Candidate Insights

- Purpose: shows candidate pipeline, validation requests, onboarding progress, and analytics.
- Route: `/employer/insights`
- Main file: `src/pages/CandidateInsightsPage.jsx`
- Related components: `src/components/employer/`
- Mock data used: `employerCandidateInsights`
- To change UI/content: edit `CandidateInsightsPage.jsx`, employer components, or `employerCandidateInsights` in `mockData.js`

## Employer: Create Engagement

- Purpose: lets employers browse club requests, express interest, and build engagement drafts.
- Route: `/employer/posting`
- Main file: `src/pages/EmployerCreateEngagementPage.jsx`
- Related components: `src/components/employer/engagement/`
- Mock data used: `employerEngagement`, `employerEngagementBuilder`
- To change UI/content: edit `EmployerCreateEngagementPage.jsx`, engagement components, or the related exports in `mockData.js`

## University: Curriculum-Market Alignment

- Purpose: compares a course syllabus against demanded market skills and suggests improvements.
- Route: `/university/curriculum`
- Main file: `src/pages/CurriculumMarketAlignmentPage.jsx`
- Related components: `src/components/university/`
- Mock data used: `universityCurriculumAlignment`
- To change UI/content: edit `CurriculumMarketAlignmentPage.jsx`, university components, or `universityCurriculumAlignment` in `mockData.js`

## University: Student Readiness

- Purpose: shows cohort readiness, skill gaps, interventions, and at-risk student drilldowns.
- Route: `/university/readiness`
- Main file: `src/pages/StudentReadinessOverviewPage.jsx`
- Related components: `src/components/university/readiness/`
- Mock data used: `universityStudentReadiness`
- To change UI/content: edit `StudentReadinessOverviewPage.jsx`, readiness components, or `universityStudentReadiness` in `mockData.js`

## University: Society-Corporate Marketplace

- Purpose: manages club event partnerships and post-event skill evidence completion.
- Route: `/university/collaboration`
- Main file: `src/pages/SocietyCorporateMarketplacePage.jsx`
- Related components: `src/components/university/marketplace/`
- Mock data used: `universitySocietyMarketplace`, `universityPostEventCompletion`
- To change UI/content: edit `SocietyCorporateMarketplacePage.jsx`, marketplace components, or the related exports in `mockData.js`
