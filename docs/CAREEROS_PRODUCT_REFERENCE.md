# CareerOS Product Reference

> This document describes both the current CareerOS demo and the approved product direction. Every feature is labelled by status. AI tools must not present planned or in-progress features as already deployed unless explicitly asked.

## Feature Status System

### Current Demo

Visible, usable, and suitable to demonstrate to judges or stakeholders now.

### Prototype in Progress

Implemented or partially implemented, but still being refined. Do not claim these as finished production capabilities.

### Planned Direction

Approved product ideas that represent the intended roadmap but are not yet fully implemented.

### Legacy / Reference Only

Older code, naming, screens, or concepts retained for technical stability or design reference, but not part of the current product story.

## 1. Product Summary

### Product Name

CareerOS

### One-Sentence Description

CareerOS is an AI-assisted career operating system that connects student evidence, university programme intelligence, and employer talent workflows through a shared intelligence layer called CareerGraph.

### Mission

CareerOS helps people and institutions make better career-readiness decisions by showing what students actually did, what skills they demonstrated, what opportunities fit them, what employers need, and what universities should improve.

### Core Problem

Students struggle to prove readiness, universities struggle to see whether programmes match market demand, and employers struggle to evaluate early talent beyond resumes and keywords.

### Core Value Proposition

CareerOS turns fragmented career activity into connected intelligence:

- Students build evidence-backed Career Memory.
- Universities see Student Readiness, Program-Market Alignment, and collaboration impact.
- Employers discover, engage, and hire candidates using verified signals.

### CareerGraph

CareerGraph is the product's intelligence layer. It connects skills, evidence, opportunities, employers, university outcomes, and recommendations across the platform.

### Three-Sided Ecosystem

- Student: builds evidence, understands readiness, finds opportunities, and tracks applications.
- University: monitors readiness, market alignment, alumni outcomes, and event impact.
- Employer / Industry Partner: discovers verified talent, creates engagements, and manages applicant pipelines.

## 2. Product Positioning

CareerOS is a career intelligence platform for higher education and early talent ecosystems.

It is not:

- A resume builder.
- A generic job board.
- A LinkedIn clone.
- A generic LMS.
- A university admin dashboard.
- A production AI backend in its current prototype form.

How it differs:

- LinkedIn focuses on public networking; CareerOS focuses on verified readiness and evidence.
- JobStreet focuses on listings; CareerOS connects preparation, evidence, matching, and outcomes.
- Handshake focuses on campus recruiting; CareerOS adds student memory, programme intelligence, and post-event impact.
- LMS platforms focus on course delivery; CareerOS focuses on employability outcomes.
- Traditional career centres offer advising and events; CareerOS turns activity into continuous intelligence.

The product story is evidence-first, continuously updated, and ecosystem-connected.

## 3. User Types

### Student Workspace

Status: Current Demo

Representative demo persona: Chris Lee, Data Science student, Taylor's University.

Who they are: students preparing for internships, graduate roles, and early career decisions.

Primary goals:

- Understand readiness.
- Build a Career Memory.
- Identify skill gaps.
- Find relevant events and jobs.
- Track applications.

Pain points:

- Hard to prove skills beyond resumes.
- Too many generic opportunities.
- Unclear next steps.
- Applications are scattered.

Key decisions:

- Which skill gap should I close first?
- Which opportunity is most relevant?
- Which career path fits my evidence?
- Which application needs follow-up?

### University Workspace

Status: Current Demo

Representative demo persona in visible UI: Dr. Evelyn Chen, Dean of Computing & AI, Heriot-Watt University Malaysia, School of Mathematical & Computer Sciences (MACS), evelyn.chen@hw.edu.my.

Who they are: deans, programme directors, career teams, curriculum committees, and university leaders.

Primary goals:

- Understand programme-market fit.
- Detect student readiness risks.
- Prioritize skill interventions.
- Use alumni and event outcomes in curriculum decisions.
- Prove collaboration impact.

Pain points:

- Curriculum cycles are slow.
- Market data and student evidence are fragmented.
- Event impact is rarely measured.
- Readiness gaps are difficult to see by cohort.

Key decisions:

- Which programme gaps are urgent?
- Which cohorts need support?
- Which collaboration events should be repeated or improved?
- Which interventions will improve graduate readiness?

### Employer Workspace

Status: Current Demo

Representative demo persona in visible UI: Edwin Khoo, HR Manager @ Google, khoo@google.com.my.

Who they are: recruiters, HR managers, university relations teams, and industry partners.

Primary goals:

- Find evidence-backed early talent.
- Understand candidate fit quickly.
- Shortlist and save candidates.
- Create student engagements.
- Manage job opportunities and applicant pipelines.

Pain points:

- Resume screening is noisy.
- Early talent is hard to evaluate.
- Campus engagement is fragmented.
- Applicant pipelines do not usually connect to skill evidence.

Key decisions:

- Which candidates should be shortlisted?
- What evidence supports the match?
- Which engagement should we launch?
- Which applicants should move forward?

## 4. Core Product Workflows

### Student Evidence Flow

Status: Current Demo

Experience -> Career Memory -> Skill evidence -> Career Intelligence -> Opportunities -> Applications

This flow shows how student activity becomes evidence, how evidence becomes guidance, and how guidance turns into opportunity action.

### University Intelligence Flow

Status: Current Demo with Prototype in Progress elements

Student evidence -> Readiness signals -> Program-Market Alignment -> Intervention -> Collaboration event -> Post-event impact intelligence

This flow shows how student-level evidence becomes programme-level insight and then loops into interventions and collaboration outcomes.

### Employer Talent Flow

Status: Current Demo

Candidate evidence -> Discovery -> Fit explanation -> Shortlist -> Job or engagement -> Pipeline outcome

This flow shows how employer users move from search to evidence review to action.

### Cross-Side Flywheel

Status: Planned Direction, partially represented in the Current Demo

Student evidence -> University intelligence -> Employer action -> Outcomes feed back into the system

This is the strategic product flywheel. The current demo shows the story with mock data and simulated intelligence; production data sync is planned.

## 5. Current Demo Features

Only features below should be described as demo-ready.

### Student Workspace

#### Overview

Status: Current Demo

Purpose: daily student command center.

Main user value: helps Chris see readiness, gaps, recommended actions, recent memory, applications, and next steps.

Key interactions: inspect cards, use sidebar navigation, view companion guidance.

AI role: AI Career Companion and recommendation-style insight cards summarize priorities.

#### Career Memory

Status: Current Demo

Purpose: evidence-backed student profile.

Main user value: turns experiences into skills, evidence, credibility, and profile strength.

Key interactions: add experience, review timeline, inspect extracted skills and evidence.

AI role: simulated skill extraction and memory insight.

#### Career Intelligence

Status: Current Demo

Purpose: career path, skill, and market guidance.

Main user value: shows where the student stands and what to improve.

Key interactions: switch tabs, review skill summary, career path, market insights, roadmap, and recommendations.

AI role: AI-assisted career recommendations and market-position interpretation using mock logic.

#### Opportunities

Status: Current Demo

Purpose: event and job discovery.

Main user value: connects skill gaps and career interests to actionable events/jobs.

Key interactions: switch between Event Hub, Job Market, and Saved; save events/jobs; view details; apply; add to calendar.

AI role: match percentages, recommended ordering, and gap badges are simulated.

#### Applications

Status: Current Demo

Purpose: application pipeline tracking.

Main user value: keeps job applications organized and visible.

Key interactions: drag applications between Applied, Under Review, Interview, Assessment, and Offer.

AI role: application insight cards summarize activity and match quality.

#### AI Career Companion

Status: Current Demo

Purpose: lightweight sidebar helper.

Main user value: explains important page context without becoming a full chatbot panel.

Key interactions: open/minimize assistant; view contextual typewriter message.

AI role: simulated page-aware companion copy with typewriter animation.

#### Hidden or Placeholder Student Routes

Status: Prototype in Progress

Network & Mentors, Learning & Skills, AI Assistant, Settings, and Help are currently minimal placeholder routes. Do not claim full mentor matching, learning platform, or settings functionality as complete.

### University Workspace

#### Overview

Status: Current Demo

Purpose: strategic university intelligence hub.

Main user value: helps Dr. Evelyn see programme health, readiness risks, strategic gaps, and priority actions.

Key interactions: select programme, cohort, and semester; inspect KPI cards; use strategic quadrant; review AI University Advisor.

AI role: advisor insight and recommended interventions are simulated from mock programme data.

#### Program-Market Alignment

Status: Current Demo

Purpose: compare programme coverage with market demand.

Main user value: identifies strengths, emerging gaps, and recommended actions.

Key interactions: switch programme and tabs; review alignment table, emerging gaps, spotlight, and recommended actions.

AI role: AI-curated recommended actions and gap interpretation are simulated.

#### Student Readiness

Status: Current Demo

Purpose: monitor cohort readiness and skill gaps.

Main user value: helps identify at-risk cohorts and intervention priorities.

Key interactions: filter by programme/cohort; select skill heatmap rows; review deep-dive panel and gap actions.

AI role: insight panel and recommended actions summarize readiness signals.

#### Alumni Signals

Status: Current Demo

Purpose: connect graduate outcomes and alumni feedback to programme improvement.

Main user value: shows employment, salary, role, employer, and missing skill patterns.

Key interactions: select programme and year range; review alumni-to-market insight.

AI role: simulated alumni insight summarizes missing skills and curriculum focus.

#### Collaboration Marketplace

Status: Current Demo

Purpose: manage university-industry collaboration before and after student events.

Main user value: turns student society and collaboration activity into strategic readiness outcomes.

Key interactions: switch Pre-Event/Post-Event; browse events; view details; inspect owned vs external event flows; view impact reports.

AI role: AI collaboration recommendations, fit explanation, outreach support, and post-event strategic insight are simulated.

#### Event Impact Report

Status: Current Demo

Purpose: show measured impact after an event.

Main user value: demonstrates readiness uplift, skill gaps closed, employer pipeline, and company engagement.

Key interactions: view report metrics, benchmark table, strategic takeaways, evidence processing details, and student spotlights.

AI role: event impact intelligence and strategic takeaways are simulated.

#### Event Impact History

Status: Current Demo

Purpose: searchable registry of completed event outcomes.

Main user value: compares historical events and tracks impact over time.

Key interactions: search, filter, and open reports.

AI role: AI pattern summary uses mock recommendations.

#### Student Spotlights

Status: Current Demo

Purpose: highlight students with strong post-event readiness growth.

Main user value: connects event outcomes to individual talent signals.

Key interactions: search/filter students, review highlighted outcomes, export list demo action.

AI role: AI spotlight insights summarize visible patterns.

#### Reports Route

Status: Legacy / Reference Only

The route still exists for technical stability, but the Reports option has been removed from the visible university sidebar. Do not include Reports in the main current product story.

### Employer Workspace

#### Talent Discovery

Status: Current Demo

Purpose: evidence-based candidate discovery.

Main user value: helps Edwin find, save, shortlist, and evaluate candidates using match and evidence signals.

Key interactions: search, apply chips, sort, save, shortlist, remove, and inspect candidate detail tabs.

AI role: match advisor panel, recruiter decision strip, and sort explanations are simulated.

#### Candidate Insights

Status: Current Demo, but secondary in the main demo story

Purpose: employer-level analytics on candidate pools.

Main user value: helps understand candidate sources, validation requests, onboarding, and aggregate pool quality.

Key interactions: review validation requests, candidate pool charts, pipeline columns, and AI insight.

AI role: simulated employer AI insight.

#### Create Engagement

Status: Current Demo

Purpose: help employers create student engagement programmes and respond to club requests.

Main user value: makes employer-university engagement easier to plan and launch.

Key interactions: complete multi-step builder, apply AI suggestions, edit details, save draft, publish, review club requests, express interest.

AI role: AI recommendation, strategist, writing assistant, audience recommendation, and resource assistant are simulated.

#### Job Marketplace

Status: Current Demo

Purpose: create roles, manage opportunities, and move applicants through a pipeline.

Main user value: connects job posting with evidence-backed candidate matching.

Key interactions: filter roles, create opportunities, view applicants, drag candidates across stages, invite suggested candidates, configure match weights.

AI role: candidate match engine, suggested candidates, match weights, and analytics recommendations are simulated.

#### Saved Searches and Shortlists

Status: Current Demo

Purpose: sidebar shortcuts into Talent Discovery saved and shortlisted tabs.

Main user value: lets employers return quickly to selected candidate pools.

AI role: none directly; powered by the same evidence-backed discovery context.

## 6. Prototype in Progress

### Placeholder Student Routes

Status: Prototype in Progress

What exists today: minimal pages for Network & Mentors, Learning & Skills, AI Assistant, Settings, and Help.

What is incomplete: full mentor matching, learning plans, assistant workspace, settings controls, and support documentation.

Do not claim: a complete mentor marketplace, full learning platform, or production assistant.

### Simulated AI Workflows

Status: Prototype in Progress

What exists today: AI-like recommendations, summaries, match scores, and typewriter assistant messages.

What is incomplete: real LLM backend, production inference, audit logs, human review workflows, and persistent AI outputs.

Do not claim: real AI integrations are deployed.

### Real Data Integrations

Status: Prototype in Progress

What exists today: believable mock data and local stores.

What is incomplete: live market feeds, real employer systems, real university SIS/LMS integration, and verified event attendance ingestion.

Do not claim: real institutional or employer data is connected.

### Candidate Insights

Status: Prototype in Progress / Current Demo secondary page

What exists today: visible route with analytics and charts.

What is incomplete: production analytics methodology and real validation request workflow.

Do not claim: it is a fully operational employer analytics suite.

### Event Evidence Processing

Status: Prototype in Progress

What exists today: de-emphasized evidence processing detail inside Event Impact Report.

What is incomplete: real QR attendance, contribution verification, and memory-profile signal generation.

Do not claim: event evidence is truly verified in the prototype.

## 7. Planned Direction

### Real AI Backend

Status: Planned Direction

Future direction: connect CareerGraph to real AI services for extraction, summarization, recommendations, and matching.

### Real Market Data Integration

Status: Planned Direction

Future direction: connect to job market, salary, skill demand, and employer trend data sources.

### Verified QR Event Participation

Status: Planned Direction

Future direction: use check-ins, QR validation, submissions, and evaluator feedback to verify event participation.

### Real Programme Skill Ingestion

Status: Planned Direction

Future direction: ingest syllabus/course outlines and map them into programme skill coverage.

### Mentor and Network Features

Status: Planned Direction

Future direction: richer mentor matching, network graph, mentor sessions, and advisory workflows.

### Institutional Benchmarking

Status: Planned Direction

Future direction: compare readiness and market alignment across faculties, programmes, cohorts, and institutions.

### Advanced Collaboration Measurement

Status: Planned Direction

Future direction: measure longitudinal outcomes from student events, employer engagements, and repeat collaborations.

### Production Authentication and Backend

Status: Planned Direction

Future direction: real role management, permissions, API persistence, backend integrations, and data security model.

## 8. Legacy / Reference Only

### Society-Corporate Marketplace Naming

Status: Legacy / Reference Only

Use "Collaboration Marketplace" in product storytelling. `SocietyCorporateMarketplacePage` remains an implementation alias.

### Old Four-Tab Marketplace Structure

Status: Legacy / Reference Only

Do not restore or present Find Collaborators / My Posted Events / Create Event / Post-Event Completion as four equal top-level marketplace tabs. The current lifecycle is Pre-Event and Post-Event.

### Badge Approval as Primary Post-Event Experience

Status: Legacy / Reference Only

Post-Event is now strategic impact intelligence. Evidence/badge processing can appear underneath but should not dominate the product story.

### CareerSync

Status: Legacy / Reference Only

Do not use CareerSync as a separate primary product name.

### Hidden Route Aliases

Status: Legacy / Reference Only

Older aliases may remain for stability. Do not treat hidden aliases as separate product modules.

## 9. AI Capabilities

### Career Memory Skill Extraction

Status: Prototype in Progress

Purpose: infer skills and evidence from student experiences.

Input: student experiences, evidence links, technologies, organizations, achievements.

Output: extracted skills, confidence, credibility, and evidence traces.

User benefit: students can prove readiness with evidence.

Note: simulated for prototype.

### Career Intelligence

Status: Current Demo, simulated AI

Purpose: guide career path, skill, and market decisions.

Input: student skills, target roles, career path mock data, market service mock data.

Output: path recommendations, skill gaps, market position, salary benchmarks, and roadmap.

User benefit: students know what to improve next.

### Opportunity Matching

Status: Current Demo, simulated AI

Purpose: rank jobs and events by relevance.

Input: student profile, opportunity metadata, tags, match scores, saved state.

Output: recommended opportunities and match badges.

User benefit: students spend less time filtering noise.

### Program Alignment Engine

Status: Current Demo, simulated AI

Purpose: compare programme coverage with market demand.

Input: programme skills, market demand values, gap data.

Output: alignment tables, gap spotlight, key insights, recommended actions.

User benefit: universities can prioritize curriculum interventions.

### AI University Advisor

Status: Current Demo, simulated AI

Purpose: summarize programme-level risks and priorities.

Input: selected programme, cohort, readiness metrics, gap data.

Output: executive insight and priority actions.

User benefit: faster decision-making for university leaders.

### Collaboration Match Assistant

Status: Current Demo, simulated AI

Purpose: explain which partners fit an event.

Input: event needs, interested companies, expected contribution, student impact.

Output: partner recommendations and fit explanation.

User benefit: better collaboration decisions.

### AI Collaboration Outreach

Status: Current Demo, simulated AI

Purpose: help users generate outreach for collaboration events.

Input: event and partner context.

Output: suggested outreach messages or next steps.

User benefit: faster partner activation.

### Event Impact Intelligence

Status: Current Demo, simulated AI

Purpose: summarize post-event outcomes.

Input: event completion data, skill changes, student outcomes, partner engagement.

Output: estimated readiness uplift, skill gaps closed, student spotlights, strategic takeaways.

User benefit: universities can prove event value.

### Candidate Match Advisor

Status: Current Demo, simulated AI

Purpose: explain candidate fit for employers.

Input: candidate profile, evidence, match score, skills, gaps.

Output: fit reasons, risks, and next recommended action.

User benefit: faster and more transparent screening.

### AI Engagement Strategist

Status: Current Demo, simulated AI

Purpose: help employers design student engagement programmes.

Input: engagement type, goals, skills, audience, resources.

Output: recommended type, writing suggestions, audience suggestions, resources, and projected outcomes.

User benefit: faster programme creation and stronger engagement quality.

### CareerOS Companion Bot

Status: Current Demo, simulated AI

Purpose: explain page context through a lightweight assistant.

Input: current route and workspace.

Output: contextual typewriter message.

User benefit: users understand what matters on each page without reading documentation.

## 10. Design and Brand Direction

Status: Current Demo with ongoing refinements

CareerOS should feel like a calm, premium AI SaaS product.

Principles:

- Clean enterprise SaaS.
- Evidence-first.
- Action-oriented.
- Professional but approachable.
- Employer Workspace is the visual consistency reference.
- Shared card, button, table, sidebar, and typography conventions.
- Restrained blue/indigo primary system.
- Emerald for success.
- Amber and rose for warnings and risk.
- Lucide icons only for UI icons.
- Compact but readable layouts.
- Standard-laptop-first responsiveness.

Assistant rules:

- Assistants explain context but do not dominate the page.
- Messages can type progressively, but animation should stay calm.

Layout rules:

- Avoid excessive bold typography.
- Avoid giant empty spaces.
- Avoid page-level horizontal overflow.
- Avoid clipped buttons and compressed content.
- Use dense but readable dashboards for repeated work.

## 11. Terminology Guide

### CareerOS

The product name.

### CareerGraph

The intelligence layer connecting skills, evidence, opportunities, employers, and university outcomes.

### Career Memory

The student evidence profile built from experiences, skills, and verification signals.

Implementation aliases: Memory Profile, `MemoryProfilePage`.

### Career Intelligence

Student-facing guidance for skills, career paths, market insights, and roadmaps.

### Program-Market Alignment

University-facing analysis comparing programme skill coverage with market demand.

Implementation alias: `CurriculumMarketAlignmentPage`.

### Student Readiness

University-facing view of cohort skill readiness and intervention needs.

### Collaboration Marketplace

University-facing marketplace for pre-event collaboration and post-event impact intelligence.

Implementation alias: `SocietyCorporateMarketplacePage`.

### Pre-Event

Lifecycle stage for discovering, creating, and managing collaboration opportunities before an event.

### Post-Event

Lifecycle stage for impact intelligence after an event.

### Event Impact Report

Post-event report showing estimated readiness uplift, gaps closed, employer pipeline, and partner outcomes.

### Student Spotlights

Post-event view highlighting students with strong readiness growth and outcomes.

### Talent Discovery

Employer-facing candidate search and evaluation workspace.

### Create Engagement

Employer-facing workflow for creating student engagement programmes and responding to club requests.

### Job Marketplace

Employer-facing job opportunity and applicant pipeline workspace.

## 12. Best Demo Story

Recommended narrative:

1. Student Overview
2. Career Memory
3. Career Intelligence
4. Opportunities
5. Applications
6. University Overview
7. Program-Market Alignment
8. Collaboration Marketplace Post-Event
9. Event Impact Report
10. Employer Talent Discovery
11. Employer Job Marketplace or Create Engagement

Why this order works:

- It starts with the student and shows the raw evidence layer.
- It turns that evidence into guidance and opportunity action.
- It zooms out to the university and shows aggregate programme intelligence.
- It proves interventions and events can generate measurable outcomes.
- It ends with employers using evidence to discover talent and manage hiring/engagement.

## 13. Pitch Deck Inputs

### Problem

Students cannot prove readiness clearly, universities cannot see programme-market gaps fast enough, and employers cannot evaluate early talent efficiently.

### Solution

CareerOS connects student evidence, university intelligence, and employer action through CareerGraph.

### Three-Sided Ecosystem

Student Career Memory, University Intelligence, and Employer Talent workflows reinforce each other.

### AI Layer

AI-assisted, simulated in the prototype: extraction, matching, recommendations, fit explanation, and impact intelligence.

### Core Differentiation

Evidence-first readiness, continuous intelligence, and cross-side outcome feedback.

### Network Effect / Flywheel

More student evidence improves university insight and employer matching. More employer and event outcomes improve student guidance and university decisions.

### Demo Highlights

- Student Career Memory.
- Career Intelligence.
- University strategic quadrant.
- Program-Market Alignment.
- Post-event impact report.
- Employer Talent Discovery.
- Job Marketplace pipeline.
- Create Engagement builder.

### Business Model Possibilities

- University SaaS subscription.
- Employer subscription.
- Premium analytics.
- Collaboration/event impact reporting.
- Employer engagement marketplace packages.

### Future Vision

CareerOS becomes the career readiness operating system for universities, students, and early talent employers.

### Recommended Screenshots

- Student Overview with companion.
- Career Memory evidence timeline.
- Career Intelligence Market Insights.
- Opportunities Event Hub.
- Applications pipeline.
- University Overview strategic quadrant.
- Program-Market Alignment Emerging Gaps.
- Collaboration Marketplace Post-Event.
- Event Impact Report.
- Employer Talent Discovery profile.
- Job Marketplace applicant pipeline.
- Create Engagement wizard.

## 14. Landing Page Inputs

### Headline Direction

CareerOS: the AI career intelligence platform connecting student evidence, university readiness, and employer talent discovery.

### Supporting Copy

CareerOS helps students prove what they can do, helps universities see where programmes match the market, and helps employers discover early talent through verified evidence.

### Three-Workspace Explanation

- Student Workspace: build Career Memory, understand readiness, find opportunities, and track applications.
- University Workspace: monitor readiness, align programmes to market demand, and measure event impact.
- Employer Workspace: discover evidence-backed candidates, create engagements, and manage applicant pipelines.

### Key Differentiators

- Evidence-first profiles.
- CareerGraph intelligence layer.
- Three-sided ecosystem.
- Programme-market alignment.
- Post-event impact measurement.
- Employer match explainability.

### Strongest Product Screenshots

Use the same screenshot list from Pitch Deck Inputs. Prioritize one screenshot per workspace above the fold.

### Suggested Call To Action

- Explore Demo
- Enter Student Workspace
- Enter University Workspace
- Enter Employer Workspace

### Tone and Visual Direction

Professional, optimistic, credible, and clear. Use clean white surfaces, blue/indigo accents, subtle gradients, soft shadows, and real product screenshots.

## 15. Claims and Accuracy Rules

Rules for teammates and AI tools:

- Do not present mock data as real traction.
- Do not present planned features as already deployed.
- Distinguish simulated AI from real integrations.
- Avoid unsupported causation claims.
- Use "estimated readiness uplift" where appropriate.
- Only use metrics explicitly present in the demo or mock data.
- Do not invent partnerships, customers, or results.
- Do not claim production authentication, backend persistence, or real AI services are connected.
- Do not describe hidden routes as active product modules unless they are visible in navigation or part of the approved demo story.
- If a feature status is ambiguous, label it ambiguous and ask the product owner.

## 16. Implementation Notes

Status: Prototype implementation

- React + Vite frontend prototype.
- React Router for role-based routes.
- Tailwind CSS for styling.
- Zustand for local state/store where used.
- Lucide icons as the UI icon system.
- Mock data powers the demo.
- No production backend.
- No real AI service connected yet.
- No real syllabus parsing or production market feed.
- Some hidden or legacy routes remain for stability.
- `MASTER_CONTEXT.md` remains a broader audit reference, while this file is the concise product/story reference for teammates and AI tools.
