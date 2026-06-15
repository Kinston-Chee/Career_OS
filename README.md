# ![App Logo](src/assets/icon-compass.svg) CareerOS

CareerOS is an AI-assisted career intelligence operating system connecting student evidence, university readiness, and employer talent discovery.

CareerOS connects three workspaces through one shared intelligence system: students turn real activity into evidence, universities see readiness and programme-market gaps, and employers discover talent through explainable skill signals. The current repository is a hackathon frontend prototype that demonstrates the intended product experience with mock data and simulated AI-assisted workflows.

## Product Overview

### Student Workspace

Students can:

- Capture projects, internships, events, certifications, and activities in Career Memory.
- Build evidence-backed skill profiles.
- Understand readiness, skill gaps, and career direction.
- Receive page-specific guidance from the AI Career Companion.
- Discover relevant events, jobs, and saved opportunities.
- Track applications through a visual pipeline.

Current visible areas: Overview, Career Memory, Career Intelligence, Opportunities, Applications, Network & Mentors, Learning & Skills.

Network & Mentors and Learning & Skills are intentionally minimal placeholder areas in the current demo.

### University Workspace

Universities can:

- Monitor programme-market alignment.
- Identify emerging skill gaps.
- Analyse student readiness by programme and cohort.
- Review alumni outcome signals.
- Manage collaboration opportunities before events.
- Measure post-event impact, student outcomes, and collaboration value.

Current visible areas: Overview, Program-Market Alignment, Alumni Signals, Student Readiness, Collaboration Marketplace.

The demo university persona is Dr. Evelyn Chen, Dean of Computing & AI at Heriot-Watt University Malaysia, School of Mathematical & Computer Sciences.

### Employer Workspace

Employers can:

- Discover evidence-backed candidates.
- Review explainable fit and skill evidence.
- Save searches and shortlist talent.
- Create student engagement programmes.
- Respond to club or university engagement opportunities.
- Publish jobs and manage applicant workflows.

Current visible areas: Talent Discovery, Create Engagement, Job Marketplace, Saved Searches, Shortlists.

## Core Product Flow

```text
Student activity
-> Career Memory
-> Skill evidence
-> Career Intelligence
-> Opportunities and applications
-> University and employer outcomes
-> Better future guidance
```

```text
Student evidence
-> University intelligence
-> Employer action
-> Outcomes feed back into CareerOS
```

## Key Differentiators

- Evidence-first Career Memory instead of resume-only claims.
- Three connected workspaces for students, universities, and employers.
- Program-Market Alignment for curriculum and intervention decisions.
- Explainable talent discovery based on skill evidence.
- Collaboration and event impact intelligence.
- Embedded AI assistance that summarizes page-specific priorities.
- Action-oriented recommendations across readiness, opportunities, and engagement.

## Current Demo Status

The current version is a frontend prototype using mock data and simulated AI-assisted workflows to demonstrate the intended product experience.

This prototype uses:

- React + Vite
- React Router
- Tailwind CSS
- Lucide React icons
- Zustand local state where needed
- Mock data
- Simulated AI-assisted logic

It does not include:

- A production backend
- Production authentication
- A persistent production database
- Live institutional integrations
- Live employer integrations
- Real labour-market data feeds
- Real traction, customer, or partnership claims

## Demo Workspaces

| Workspace | Main areas |
| --- | --- |
| Student | Overview, Career Memory, Career Intelligence, Opportunities, Applications |
| University | Overview, Program-Market Alignment, Alumni Signals, Student Readiness, Collaboration Marketplace |
| Employer | Talent Discovery, Create Engagement, Job Marketplace, Saved Searches, Shortlists |

## Featured Demo Flows

### Student Flow

```text
Experience
-> Career Memory
-> Skill evidence
-> Career Intelligence
-> Opportunities
-> Applications
```

### University Flow

```text
Programme-market gap
-> Recommended intervention
-> Collaboration event
-> Post-event impact intelligence
```

### Employer Flow

```text
Candidate discovery
-> Evidence review
-> Explainable fit
-> Shortlist or engagement
```

## Getting Started

```bash
git clone <repository-url>
cd <repository-folder>
npm install
npm run dev
```

Then open:

```text
http://localhost:5173
```

On Windows PowerShell, if script execution blocks `npm`, use:

```powershell
npm.cmd install
npm.cmd run dev
```

## Available Scripts

These scripts are defined in `package.json`:

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Build the production bundle. |
| `npm run preview` | Preview the production build locally. |

There is currently no `lint` script in `package.json`.

## Project Structure

```text
src/
├── components/
├── data/
├── pages/
├── services/
├── store/
├── assets/
├── App.jsx
└── main.jsx

docs/
├── CAREEROS_PRODUCT_REFERENCE.md
├── MASTER_CONTEXT.md
└── PAGE_GUIDE.md

pitch-deck/
└── HANDOFF.md

AGENT.md
package.json
README.md
```

## Technology Stack

- React
- Vite
- JavaScript / JSX
- React Router
- Tailwind CSS
- Lucide React
- Zustand
- Mock data and local state

## Prototype Limitations

- Demo content is powered by mock data.
- AI recommendations, summaries, match scores, and assistant messages are simulated.
- Authentication is role-selection based and not backed by a production identity system.
- There is no persistent production database.
- There is no real labour-market data feed.
- There is no live university, employer, LMS, SIS, ATS, or HRIS integration.
- Metrics shown in the interface are illustrative demo values.
- Some legacy route aliases remain for stability but are not separate active product modules.

## Future Direction

Potential next steps include:

- Real AI extraction, retrieval, and recommendation services.
- Live market-demand and skill-demand data.
- Syllabus and course ingestion for programme skill coverage.
- QR or attendance-based event participation verification.
- Verified institutional and employer integrations.
- Longitudinal outcome intelligence.
- Institutional benchmarking across cohorts, programmes, and faculties.

## Submission Notes

This repository contains the CareerOS hackathon prototype and supporting presentation assets.

Product reference documents are available in `docs/`, especially `docs/CAREEROS_PRODUCT_REFERENCE.md` and `docs/MASTER_CONTEXT.md`.
