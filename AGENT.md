# CareerOS Operating Manual

This file is the canonical repository instruction file. Do not rename it to `AGENTS.md` unless the product owner explicitly approves that change.

CareerOS is the official platform name. CareerGraph is the intelligence layer that connects skills, evidence, opportunities, employers, and university outcomes across the product.

---

## 1. Product Identity

CareerOS is a multi-sided AI-powered Career Operating System with three connected workspaces:

- Student Workspace
- Employer Workspace
- University Workspace

CareerGraph powers the intelligence behind those workspaces. It should help the product connect what students did, what skills they demonstrated, what opportunities fit them, what employers need, and what universities should improve.

CareerOS should prove one core idea:

> Show what a person actually did, not only what they claim.

CareerOS is not a resume builder, generic job board, LinkedIn clone, LMS, or university admin dashboard.

Do not use CareerSync as a separate primary product name.

---

## 2. Technology and Prototype Constraints

This project is a frontend-first hackathon prototype.

Use:

- React
- Vite
- JavaScript / JSX
- React Router
- Zustand where already used
- Tailwind CSS
- mock data
- mock AI behavior

Do not add:

- backend infrastructure
- production authentication
- real AI pipelines
- real syllabus parsing
- payment systems
- heavy UI libraries
- heavy graph or analytics libraries
- CSS-in-JS

Frontend clarity, believable workflows, and visual polish matter more than production completeness.

---

## 3. Workspace Architecture

CareerOS currently has three role-based workspace areas.

### Student Workspace

Purpose: help students understand readiness, build evidence, discover career paths, and find relevant opportunities.

Current user-facing areas include:

- Overview
- Career Memory / Memory Profile
- Career Intelligence
- Opportunities
- Applications
- Network & Mentors
- Learning & Skills
- AI Assistant
- Settings / Help

### Employer Workspace

Purpose: help employers discover evidence-backed candidates and collaborate with student ecosystems.

Current user-facing areas include:

- Talent Discovery
- Candidate Insights
- Create Engagement
- Job Marketplace
- Settings / Help

### University Workspace

Purpose: help universities understand program-market alignment, student readiness, alumni outcomes, and event collaboration impact.

Current user-facing areas include:

- Overview
- Program-Market Alignment
- Alumni Signals
- Student Readiness
- Collaboration Marketplace
- Settings / Help

The canonical mock University identity is:

- Dr. Evelyn Chen
- Dean of Computing & AI
- Heriot-Watt University Malaysia
- School of Mathematical & Computer Sciences (MACS)
- evelyn.chen@hw.edu.my

The Reports route may remain as a hidden placeholder for technical stability, but it is not part of the current visible University sidebar or main product story.

---

## 4. Current User-Facing Navigation

Treat the currently rendered navigation as the behavioral source of truth.

Some files may contain duplicate, stale, or partial navigation configuration, especially:

- `src/components/layout/AppLayout.jsx`
- `src/components/university/UniversitySidebar.jsx`

Do not infer the current product structure from an unused or stale navigation array. Inspect the rendered route, active sidebar, and current page code before making structural changes.

---

## 5. University Workspace Direction

The University Workspace should feel like an AI-powered university career intelligence hub, not an LMS admin screen or Power BI dashboard.

It should help university users quickly understand:

- where programs align with market demand
- where skill gaps are emerging
- how students are progressing toward readiness
- where alumni outcomes point to curriculum improvements
- which collaborations can improve student outcomes
- how completed events affected readiness, evidence, and employer engagement

University pages should use strategic, decision-oriented language. Evidence processing can support the experience, but the visible product should emphasize program intelligence, interventions, collaboration, and impact.

---

## 6. Collaboration Marketplace Lifecycle

The official University Collaboration Marketplace lifecycle is:

- Pre-Event
- Post-Event

### Pre-Event

Pre-Event supports:

- Explore Events
- My Events
- Create Event action
- ownership-aware event experiences
- AI-assisted collaboration outreach

For events hosted by our university, users should be able to:

- view and manage interested collaborators
- accept or decline interest
- request more information
- view confirmed collaborators
- manage event and collaboration details

For events hosted by another university, users should see:

- Event Details
- Support Opportunity
- Express Interest

They should not see organizer-only controls.

### Post-Event

Post-Event focuses on strategic impact intelligence:

- Latest Event Outcomes
- Impact Calendar
- AI Strategic Insight
- Event Impact History
- Event Impact Report
- Student Spotlights

Post-event evidence processing exists underneath this experience but should not dominate it.

Evidence-related details may appear in a de-emphasized section such as Evidence Processing Details, including:

- verified attendance
- confirmed contributions
- Memory Profile signals generated
- exceptions requiring review

---

## 7. Ownership and Permission Logic

Marketplace interactions must be ownership-aware.

Own university event:

- show organizer controls
- allow collaborator review actions
- allow confirmed collaborator management
- allow event and collaboration detail management

Other university event:

- show event details
- show support opportunity
- allow express interest
- hide accept, decline, request-info, and organizer management controls

Do not add organizer-only actions to external events unless the product owner confirms a role or permission change.

---

## 8. Design System

CareerOS should feel like a calm, premium AI SaaS product.

Use:

- light neutral backgrounds
- clean white surfaces
- soft blue and purple accents
- rounded cards
- subtle borders
- soft shadows
- clear hierarchy
- professional institutional terminology
- restrained visual density

Typography:

- use `font-medium` for most section headings
- use `font-semibold` for major page titles, important names, and key metrics
- avoid excessive `font-bold`
- prefer softer text colors such as slate-700 and slate-600 for supporting UI text

Avoid:

- heavy dashboard styling
- Power BI-like visual density
- excessive nested cards
- excessive bold text
- giant empty areas
- clipped or compressed content
- decorative clutter
- large-monitor-only compositions

Every page should answer:

1. What is this page for?
2. Why does it matter?
3. What should the user do next?

---

## 9. Responsive Requirements

Design laptop-first and validate across:

- 1366px
- 1440px
- 1920px
- tablet
- mobile

Rules:

- no page-level horizontal overflow
- no clipped buttons
- cards must reflow appropriately
- right panels should stack when space is limited
- wide tables may scroll inside their own containers
- use `min-w-0`, `w-full`, flexible grids, and responsive breakpoints
- avoid fixed widths that break standard laptops
- do not optimize only for large desktop monitors

Before marking UI work complete, check standard laptop behavior first, then large desktop, tablet, and mobile.

---

## 10. Data and Mocking Rules

This is a mock-data prototype.

Rules:

- shared cross-page entities should preferably use central mock data
- page-specific prototype data may remain local
- do not require immediate mock-data centralization
- mock AI behavior is acceptable
- no backend integration is required
- no real AI parsing is required

When adding new mock data, keep it believable, internally consistent, and shaped like a future API response where practical.

---

## 11. Engineering and Team-Safety Rules

Multiple teammates may be working in the repository.

Agents must:

- inspect current code before making structural changes
- preserve working routes and interactions
- avoid unrelated rewrites
- avoid replacing newer teammate work based on outdated documentation
- flag ambiguous product conflicts before resolving them
- make targeted changes
- report affected files
- keep legacy aliases until migration is explicitly approved
- avoid removing routes without product-owner confirmation
- avoid editing application code when the task is documentation-only

If the requested change conflicts with current code or another documented product direction, report the conflict and ask for confirmation before making a broad change.

---

## 12. Validation Checklist

For application UI changes, validate:

- role routing still works
- sidebar and top navigation still reflect the intended workspace
- key buttons remain visible and clickable
- no page-level horizontal overflow appears
- tables scroll within their own containers when needed
- cards reflow on standard laptop, tablet, and mobile
- typography remains calm and not overly bold
- interactions still work after layout changes
- mock data still supports the user story

For documentation-only tasks, confirm that no application code was edited.

---

## 13. Known Legacy Aliases

Some implementation names intentionally remain for stability even when user-facing labels have changed.

Keep these aliases until migration is explicitly approved:

- `CurriculumMarketAlignmentPage` may render the user-facing Program-Market Alignment page.
- `SocietyCorporateMarketplacePage` may render the user-facing Collaboration Marketplace page.
- Older route aliases may continue to redirect or render current pages.

Do not rename components, files, routes, or imports unless the product owner explicitly asks for a migration.

---

## 14. Deprecated Product Directions

Agents should not restore these older structures:

- Society-Corporate Marketplace as the current user-facing name
- Find Collaborators / My Posted Events / Create Event / Post-Event Completion as four equal top-level marketplace tabs
- badge approval as the primary Post-Event experience
- CareerSync as a separate primary product name
- large-monitor-only UI layouts

If older code or docs reference these directions, treat them as legacy context, not current product direction.
