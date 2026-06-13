# CareerOS Master Context

## 1. Product Overview

### Product Name

CareerOS

### One-Sentence Description

CareerOS is an AI-powered career intelligence platform that connects student skill evidence, university curriculum readiness, and employer talent discovery into one shared operating system.

### Mission

CareerOS exists to help students prove readiness with evidence, help universities align programmes with market demand, and help employers discover early talent through verified skills rather than keyword resumes.

### Problem Statement

#### Students

Students struggle to understand which skills matter, how their projects translate into employability, where their gaps are, and which opportunities are most relevant. Traditional profiles and resumes are static, generic, and weak at proving actual capability.

#### Universities

Universities need faster visibility into whether programmes are producing market-ready graduates. Curriculum review cycles are slow, programme teams often lack real-time employer demand data, and student readiness is hard to measure across cohorts.

#### Industry Partners

Employers need better ways to find, evaluate, and engage early talent. Existing platforms rely heavily on resumes, manual screening, and broad search filters. They do not surface enough evidence, project context, or university collaboration opportunities.

### Core Value Proposition

CareerOS is different because it connects three sides of the career ecosystem:

- Student evidence becomes a living career memory.
- Career intelligence turns evidence into skill gaps, market position, and next actions.
- University analytics aggregate student and programme signals into curriculum-market alignment.
- Employer tools use evidence and AI matching to discover candidates and create engagements.

Compared with LinkedIn, CareerOS is less about public networking and more about verified readiness, evidence traces, and skill intelligence.

Compared with Jobstreet, CareerOS is less about job listings and more about preparation, matching, student development, and outcomes.

Compared with Handshake, CareerOS is broader than campus recruiting because it includes programme analytics, curriculum alignment, student memory, and employer engagement creation.

Compared with university career centers, CareerOS is data-rich, AI-assisted, and continuously updated from student actions, applications, events, and employer demand.

Compared with generic LMS systems, CareerOS focuses on employability outcomes, market alignment, and evidence-backed readiness rather than course delivery alone.

## 2. User Types

### Student Workspace

#### Who They Are

Students building career readiness, tracking evidence, finding opportunities, and applying for roles. The demo persona is Chris Lee, a Year 3 Data Science student at Taylor's University.

#### Goals

- Understand career readiness.
- Build a verified memory profile.
- Identify skill gaps.
- Discover relevant events, jobs, and learning opportunities.
- Track applications.
- Prepare for target roles.

#### Pain Points

- Unclear connection between coursework and job requirements.
- Difficult to prove skills beyond a resume.
- Too many generic opportunities.
- Limited guidance on which skill gap to close first.
- Applications are scattered across platforms.

#### Access

- Overview
- Career Memory
- Career Intelligence
- Opportunities
- Applications
- Network & Mentors placeholder
- Learning & Skills placeholder
- AI Assistant placeholder
- Settings and Help placeholders

#### Actions

- Add career experiences.
- View extracted skills and evidence.
- Explore career paths and market insights.
- Save jobs and events.
- View event and job details.
- Add opportunities to calendar.
- Apply to jobs through the app flow.
- Drag applications between pipeline stages.

### University Workspace

#### Who They Are

University leaders, deans, programme directors, career teams, and curriculum committees. The demo persona is Dr. Evelyn Chen, Dean of Computing & AI, Heriot-Watt University Malaysia, School of Mathematical & Computer Sciences (MACS), evelyn.chen@hw.edu.my.

#### Goals

- Measure programme-market alignment.
- Detect emerging skill gaps.
- Track student readiness by programme and cohort.
- Use alumni and employer signals to guide curriculum decisions.
- Manage society and corporate collaboration.
- Understand event impact after completion.

#### Pain Points

- Curriculum updates lag behind market demand.
- Programme teams lack connected student evidence.
- Student risk is difficult to see early.
- Employer feedback is fragmented.
- Event impact is rarely measured after completion.

#### Access

- University Overview
- Program-Market Alignment
- Student Readiness
- Alumni Signals
- Collaboration Marketplace
- Post-event impact reports
- Event Impact History
- Student Spotlights
- Settings and Help placeholders
- Reports route exists as a placeholder, but the sidebar option has been removed.

#### Actions

- Filter by programme, year, and semester.
- Compare market demand with programme coverage.
- Review emerging skill gaps.
- Inspect strategic quadrant visualizations.
- Review AI university advisor insights.
- Explore recommended interventions.
- View readiness heatmaps and skill drilldowns.
- Browse and manage collaboration marketplace events.
- View post-event impact reports.
- Review student spotlights and event history.

### Industry / Partner Workspace

#### Who They Are

Employers, recruiters, industry partners, corporate university relations teams, and organizations seeking to engage student talent. The demo employer workspace uses Edwin as the top-bar persona in the copilot copy.

#### Goals

- Discover high-fit candidates.
- Understand candidate evidence and skill confidence.
- Shortlist and save talent.
- Create engagement programmes with universities.
- Manage job opportunities and applicant pipelines.
- Use AI recommendations to reduce screening work.

#### Pain Points

- Resume screening is noisy and time-consuming.
- Early talent lacks conventional work experience.
- Project evidence is hard to validate manually.
- Campus engagement planning is fragmented.
- Job pipelines are often disconnected from candidate evidence.

#### Access

- Talent Discovery
- Candidate Insights
- Create Engagement
- Job Marketplace
- Employer Settings and Help placeholders

#### Actions

- Search candidates by name, role, and skill.
- Add search chips and recent searches.
- View candidate fit, skills, experience, projects, evidence, and activity.
- Save and shortlist candidates.
- Remove candidates from the workspace.
- Create engagement campaigns.
- Express interest in student club requests.
- Create job opportunities.
- View applicants.
- Drag candidates across application stages.
- Invite suggested candidates.
- Configure candidate match weights.

## 3. Student Workspace Audit

### Overview

#### Purpose

Provides a student-first command center summarizing career readiness, memory updates, career paths, research interests, recommendations, applications, and next actions.

#### Key Features

- Personalized greeting for Chris.
- Career snapshot cards.
- Career readiness card.
- Skill gap analysis.
- Top career paths.
- Recent career memory.
- Recommended actions.
- Application tracker.
- Research interests.
- Candidate companion bot in the sidebar.

#### Inputs

- Student profile data.
- Career memory experiences.
- Application data.
- Career path recommendations.

#### Outputs

- Readiness summary.
- Skill gap priorities.
- Recommended next actions.
- Application status overview.

#### AI Components

- AI career insight card.
- Sidebar AI Career Companion with contextual typewriter messages.
- Recommended next-action logic.

#### Business Value

Creates daily engagement by telling students what to do next instead of only storing profile data.

#### UX Notes

The page is dashboard-like, student-friendly, and uses soft cards, pastel icon containers, and a compact assistant widget.

### Career Memory

#### Purpose

Turns student experiences into a structured, evidence-backed career profile.

#### Key Features

- Profile summary.
- Career profile bar.
- Top skills.
- Experience timeline.
- Experience input.
- Resume card.
- Evidence links.
- Credibility badges.
- Evidence integrity card.
- AI insight card.

#### Inputs

- Experience title, type, role, date, summary, organization, technologies, achievements, and evidence links.

#### Outputs

- Extracted skills.
- Credibility labels.
- Career evidence timeline.
- Updated skill profile.

#### AI Components

- Simulated AI extraction of skills from experience data.
- AI memory insight highlighting profile strengths and gaps.

#### Business Value

Builds the evidence layer that powers career recommendations, employer matching, and university readiness analytics.

#### UX Notes

Experience cards combine evidence, extracted skills, and credibility so the student profile feels more trustworthy than a static resume.

### Career Intelligence

#### Purpose

Helps students understand their current skill profile, career paths, and market position.

#### Key Features

- Tabs: Skills, Career Path, Market Insights.
- Skill summary.
- Career path cards and comparison.
- Learning roadmap.
- Recommended actions.
- Salary benchmark.
- Market demand and in-demand skills table.
- Market position dashboard.
- Upskilling recommendations.

#### Inputs

- Career memory skills.
- Target roles.
- Country and timeframe market parameters.
- Market data service outputs.

#### Outputs

- Skill strengths.
- Missing skills.
- Career path recommendations.
- Market position score.
- Salary benchmarks.
- Learning roadmap.

#### AI Components

- Career Intelligence recommendations.
- Market standing insight.
- Learning path suggestions.

#### Business Value

Converts student data into targeted upskilling and career planning guidance.

#### UX Notes

The page uses tabbed product language, enterprise-style Lucide icons, progress bars, charts, and compact recommendation panels.

### Opportunities

#### Purpose

Connects students to events and jobs matched to their goals and skill gaps.

#### Key Features

- Sections: Event Hub, Job Market, Saved.
- Event cards with category banners, match score, tags, date, organizer, location, and save/view actions.
- Event detail page with overview, agenda, prizes, people, venue, registration card, countdown, and match score.
- Job market with most relevant and latest listings.
- Closing soon jobs.
- Saved hub for saved jobs and events.
- Calendar integration through the career store.

#### Inputs

- Search filters.
- Saved job and event state.
- Event and job datasets.
- User actions such as save, view details, register, and apply.

#### Outputs

- Filtered events and jobs.
- Saved item lists.
- Opportunity detail views.
- Added applications.
- Added calendar events.

#### AI Components

- Match scores.
- Recommended event/job ordering.
- Skill gap badges.

#### Business Value

Turns readiness insights into concrete opportunities students can act on.

#### UX Notes

The Event Hub has been visually aligned to the university collaboration marketplace style with premium cards and gradient banners.

### Applications

#### Purpose

Tracks student job applications across stages and shows application health.

#### Key Features

- Application insights.
- Application pipeline.
- Drag-and-drop stages: Applied, Under Review, Interview, Assessment, Offer.
- Application cards with company, role, match percent, and applied date.
- Application timeline.

#### Inputs

- Applications from the career store.
- Drag-and-drop stage updates.
- Jobs applied through the opportunity flow.

#### Outputs

- Updated application stage.
- Status history.
- Pipeline counts and insights.

#### AI Components

- Application insights summarize total activity, active interviews, average match, and next action patterns.

#### Business Value

Keeps students organized and turns application tracking into a readiness feedback loop.

#### UX Notes

The pipeline is deliberately direct manipulation focused: users drag cards instead of pressing move buttons.

### Network & Mentors

#### Purpose

Placeholder for future mentoring and networking features.

#### Current Text

This area is intentionally minimal for the student-first MVP. The main experience is focused on Memory Profile, Career Intelligence, Opportunities and application.

### Learning & Skills

#### Purpose

Placeholder for future learning and skill development modules.

#### Current Text

This area is intentionally minimal for the student-first MVP. The main experience is focused on Memory Profile, Career Intelligence, Opportunities and application.

### AI Assistant

#### Purpose

Placeholder route for a future full AI assistant page. Current assistant behavior is delivered through the sidebar companion.

### Settings

#### Purpose

Placeholder for student settings.

#### Current Text

This area is intentionally minimal for the student-first MVP. The main experience is focused on Memory Profile, Career Intelligence, Opportunities and application.

## 4. University Workspace Audit

### University Overview

#### Purpose

Provides Dr. Evelyn Chen with a programme-level intelligence hub for curriculum, readiness, and priority actions.

#### Features

- Programme selector for BSc Computer Science, BSc Data Science, and BSc Data Analytics.
- Cohort and semester filters.
- KPI metrics.
- Programme skills table.
- AI University Advisor key insight.
- Strategic quadrant visualization: Program Strengths vs Emerging Weaknesses.
- Key insights panel.
- Top priority actions.
- Sticky analytics layout.

#### Analytics

- Market alignment score.
- Graduate readiness score.
- Top emerging gap.
- Students at risk.
- Data confidence.
- Programme performance vs market impact.
- Strengths, priority gaps, focus score, and potential impact.

#### Actions

- Change programme/cohort/semester.
- Inspect quadrant clusters and skill nodes.
- Open skill setup modal.
- Navigate to interventions and collaboration context.

#### KPIs

- Market Alignment Score.
- Graduate Readiness Score.
- Top Emerging Gap.
- Students at Risk.
- Data Confidence.
- Focus Score.
- Potential Impact.

#### AI Components

- AI University Advisor.
- Dynamic key insights based on selected programme skills.
- Intervention recommendation text per skill.

#### Stakeholder Value

Lets deans and programme leaders understand which skills to protect, which gaps to prioritize, and what interventions can improve graduate readiness.

### Program-Market Alignment

#### Purpose

Compares programme coverage against market demand to reveal strengths, emerging gaps, and recommended actions.

#### Features

- Programme dropdown.
- Tabs: Skills Alignment, Emerging Gaps, Recommended Actions.
- Skills alignment table.
- Emerging skills gaps table.
- Gap overview.
- Gap spotlight panel.
- Skills on the rise.
- Recommended actions by impact and effort.
- Program skills setup modal.
- Share/report style actions.

#### Analytics

- Market demand.
- Programme coverage.
- Gap percentage.
- Impact level.
- Trend lines.
- Gap counts by impact.

#### Actions

- Switch programme.
- Switch tab.
- Open programme skill management placeholder.
- Share report toast.
- View all emerging gaps.
- Review intervention actions.

#### KPIs

- Demand percentage.
- Coverage percentage.
- Gap.
- Impact.
- Students affected.
- Potential readiness improvement.

#### AI Components

- AI-curated recommended actions.
- Key insights that interpret alignment and gaps.
- Gap spotlight explanation.

#### Stakeholder Value

Supports curriculum review and targeted interventions based on demand/coverage mismatch.

### Student Readiness

#### Purpose

Tracks student readiness by programme and cohort and highlights skill gaps requiring intervention.

#### Features

- Programme and cohort filters.
- KPI cards.
- Skill gap heatmap.
- Key insights panel.
- Skill deep-dive panel.
- Gap actions table.
- Cohort comparisons and readiness badges.

#### Analytics

- Readiness by skill.
- Missing percentage.
- Target coverage.
- Demand level.
- Cohort progression by year.
- Action recommendations.

#### Actions

- Select programme and cohort.
- Click skills in the heatmap.
- Review role relevance and recommended actions.

#### KPIs

- Readiness score.
- Critical gaps.
- At-risk students.
- High-demand skill gaps.

#### AI Components

- Key insight summaries.
- Skill-level intervention recommendations.

#### Stakeholder Value

Helps programme teams detect risk early, prioritize interventions, and track readiness by year.

### Alumni Signals

#### Purpose

Uses alumni outcomes to identify whether graduates are entering relevant roles, earning competitive salaries, and reporting gaps.

#### Features

- Programme selector.
- Year range selector.
- KPI metrics.
- Salary trend chart.
- Employer/company rows.
- Role distribution.
- Alumni-reported missing skills.
- AI insight sidebar.

#### Analytics

- Employment rate.
- Average salary.
- Top employers.
- Role distribution.
- Missing skills.
- Salary growth over time.

#### Actions

- Change programme.
- Change year range.
- Review alumni-to-market insight.
- Use findings to update programme recommendations.

#### KPIs

- Employment rate.
- Average salary.
- Alumni count.
- Top role shares.
- Salary trend.

#### AI Components

- Alumni-to-market insight.
- Focus recommendations tied to alumni outcomes.

#### Stakeholder Value

Connects graduate outcomes back to curriculum planning and employer demand.

### Collaboration Marketplace

#### Purpose

Helps universities manage pre-event and post-event collaboration with industry partners and student societies.

#### Features

- Pre-Event and Post-Event lifecycle tabs.
- Pre-event marketplace cards.
- Filters by event needs.
- Event detail pages with overview, collaborators, interested partners, and event details.
- AI collaboration outreach.
- AI create event flow.
- Expressed interest workspace.
- Support opportunity workspace for external events.
- Post-event completion dashboard.
- Impact calendar.
- Event Impact History.
- Event Impact Report.
- Student Spotlights.

#### Analytics

- Expected participants.
- Universities involved.
- Skills developed.
- Industry relevance.
- Collaborator fit scores.
- Event readiness uplift.
- Skill gaps closed.
- Students in pipeline.
- Companies engaged.
- Students impacted.

#### Actions

- Browse events.
- Filter events.
- View event details.
- Review interested companies.
- Request AI recommendations.
- Generate outreach.
- Create event.
- View impact report.
- Review event history.
- View student spotlights.

#### KPIs

- Owned events.
- Participants.
- Partners.
- Match fit.
- Readiness uplift.
- Gaps closed.
- Pipeline students.
- Companies engaged.

#### AI Components

- AI Match Assistant for interested organizations.
- AI Fit Explanation.
- AI Collaboration Outreach.
- AI Create Event.
- AI Strategic Insight in post-event.
- Event impact summaries.

#### Stakeholder Value

Turns student society activity and employer collaboration into measurable readiness and talent outcomes.

### Event Impact Report

#### Purpose

Shows the measured impact of a completed event.

#### Features

- Event summary strip.
- Executive impact summary.
- Skill gap closure analysis.
- Company engagement outcomes.
- Benchmarks against past events.
- Strategic takeaways.
- Student spotlight link.
- Evidence processing details.

#### KPIs

- Estimated readiness uplift.
- Priority skill gaps improved.
- Students in employer pipeline.
- Companies engaged.
- Students impacted.

### Event Impact History

#### Purpose

Provides a searchable registry of completed events and historical outcomes.

#### Features

- Search.
- Semester/program/type/company filters.
- Summary metrics.
- Event table.
- View report actions.
- AI Pattern Summary.

### Student Spotlights

#### Purpose

Identifies individual students with strong readiness growth and verified post-event outcomes.

#### Features

- Search and filters.
- Student summary metrics.
- Student table.
- AI spotlight insights.
- Pagination.

### Reports

The route exists as `/university/reports`, but the sidebar option has been removed. It currently functions as a placeholder only.

## 5. Industry / Partner Workspace Audit

### Talent Discovery

#### Purpose

Allows employers to discover, evaluate, save, and shortlist candidates using evidence-backed fit rather than resumes alone.

#### Features

- Candidate stream with All, Saved, and Shortlisted tabs.
- Search by candidates and skills.
- Global employer search chips.
- Sort options including best match, strongest evidence, recently active, and newest graduates.
- Candidate detail workspace.
- Tabs: Profile Fit, Skills, Experience, Projects, Evidence, Activity.
- Recruiter decision strip.
- Fit visualization.
- Match advisor panel.
- Evidence trace.
- Candidate actions: save, shortlist, remove.

#### Data Shown

- Match percentage.
- Target role.
- University.
- Location and availability.
- Top skills.
- Last signal.
- Evidence count.
- Trust score.
- Projects and experience.
- Activity signals.

#### Actions Available

- Search and filter candidates.
- Add/remove search chips.
- Save candidate.
- Shortlist candidate.
- Remove candidate.
- Review details by tab.

#### KPIs

- Match percent.
- Confidence value.
- Evidence count.
- Trust score.
- Skill confidence.

#### AI Recommendations

- Match advisor panel explains fit reasons, risk, and next step.
- Recruiter decision strip suggests immediate hiring action.
- Sort explanation panel explains why a sort is useful.

#### Business Benefits

Reduces screening time and increases trust in early talent evaluation.

### Candidate Insights

#### Purpose

Provides employer-level analytics on candidate pools and validation requests.

#### Features

- Dynamic filters based on employer search chips.
- Validation requests table.
- Onboarding tracker.
- Pipeline columns.
- Candidate source donut chart.
- Skill and score charts.
- Employer AI insight card.

#### Data Shown

- Candidate stats.
- Average match.
- Source distribution.
- Skills.
- Validation requests.
- Onboarding status.

#### Actions Available

- View insights filtered by active search chips.
- Review validation requests.
- Inspect pipeline and onboarding status.

#### KPIs

- Candidate count.
- Average match score.
- Validation request counts.
- Source distribution.

#### AI Recommendations

- Employer AI insight summarizes hiring signals and recommended focus.

#### Business Benefits

Helps employers manage talent pools strategically instead of candidate-by-candidate only.

### Create Engagement

#### Purpose

Lets employers design structured student engagement programmes and respond to university/student club requests.

#### Features

- Tabs: Create Engagement, Club Requests, Sent Interest.
- Multi-step builder:
  - Choose Type
  - Program Details
  - Audience & Skills
  - Timeline & Resources
  - Review & Launch
- Engagement type cards.
- AI recommendation banner.
- AI engagement strategist.
- Editable programme fields.
- Chip groups for skills, deliverables, audiences, resources.
- Timeline/resource editing.
- Launch checklist.
- Preview panel.
- Club request cards.
- Express interest panel.

#### Data Shown

- Engagement type options.
- Recommended skills and audiences.
- Projected outcomes.
- Market insights.
- Club request details.
- Candidate reach estimates.

#### Actions Available

- Choose engagement type.
- Edit programme details.
- Add/remove skills, deliverables, audiences, and resources.
- Apply AI suggestions.
- Save draft.
- Publish engagement.
- Express interest in club requests.

#### KPIs

- Engagement strength.
- Estimated reach.
- Candidate attraction score.
- Projected outcomes.

#### AI Recommendations

- AI recommends engagement type.
- AI writing assistant fills programme copy.
- AI recommended audience.
- AI resource assistant.
- AI strategist refines programme goals.

#### Business Benefits

Makes employer-university engagement repeatable, measurable, and tied to student skill development.

### Job Marketplace

#### Purpose

Allows employers to create job listings, manage opportunities, view analytics, and run applicant pipelines.

#### Features

- Dashboard cards for active positions, applicants, interviews, filled positions, and average match rate.
- Tabs: Active, Drafts, Closed, Archived, Analytics.
- Search and filters.
- Opportunity cards.
- Create Opportunity Wizard.
- Opportunity analytics.
- Applicant pipeline.
- Candidate drag-and-drop stages.
- Invite suggested candidates.
- Candidate match weight configuration.

#### Data Shown

- Job title, type, location, deadline, applicants, average match, status.
- Applicant cards with match, evidence count, trust, availability.
- Funnel analytics.
- Skill coverage analytics.
- AI recommendations.

#### Actions Available

- Create opportunity.
- Save as draft or publish.
- Filter opportunities.
- View applicants.
- Drag applicants between stages.
- Invite suggested candidates.
- Hire candidate.
- Update match weights.

#### KPIs

- Active positions.
- Total applicants.
- Interviews running.
- Positions filled.
- Average match rate.
- Skill coverage.
- Funnel conversion.

#### AI Recommendations

- Candidate match engine.
- Suggested candidates.
- AI recommendations in analytics.
- AI candidate match weights.

#### Business Benefits

Combines job posting, applicant tracking, and evidence-based matching inside one employer workflow.

## 6. AI Features Inventory

### CareerOS Copilot / Companion Bot

- Purpose: Gives contextual summaries and guidance per workspace page.
- Trigger: Page change, opening the assistant, or message update.
- Input: Current route and workspace context.
- Output: Typewritten page-specific assistant message.
- User benefit: Reduces cognitive load and explains what matters on each page.

### Typewriter Message System

- Purpose: Makes assistant messages feel conversational without heavy animation libraries.
- Trigger: Text changes, page switches, assistant open state.
- Input: Message text, speed, active state.
- Output: Progressive text reveal with reduced-motion support.
- User benefit: Calmer AI interaction and better perceived responsiveness.

### Career Memory Skill Extraction

- Purpose: Converts experiences into skills, credibility, and evidence traces.
- Trigger: Adding experiences or reviewing profile.
- Input: Experience data, evidence links, technologies, achievements.
- Output: Extracted skills and credibility signals.
- User benefit: Students can prove capabilities beyond resumes.

### Career Intelligence

- Purpose: Recommends skills, paths, market position, and learning actions.
- Trigger: Student opens Career Intelligence.
- Input: Student skill profile, career paths, market data service parameters.
- Output: Skill summaries, roadmaps, salary benchmarks, market insights.
- User benefit: Clear career planning and upskilling priorities.

### Opportunity Matching

- Purpose: Ranks events and jobs by relevance to student goals and skills.
- Trigger: Opportunity browsing.
- Input: Student profile, event/job metadata, saved state.
- Output: Match scores, relevant listings, gap badges.
- User benefit: Less noise and more actionable opportunities.

### Application Insights

- Purpose: Summarizes application pipeline health.
- Trigger: Applications page.
- Input: Application stages, match scores, status history.
- Output: Total applications, interviews, average match, stage insights.
- User benefit: Better application management.

### Program Alignment Engine

- Purpose: Compares market demand against programme coverage.
- Trigger: University alignment pages.
- Input: Programme coverage, market demand, selected programme.
- Output: skill gaps, trends, impact levels, recommended actions.
- User benefit: Faster curriculum prioritization.

### Student Readiness Prediction

- Purpose: Shows cohort readiness gaps and at-risk areas.
- Trigger: University readiness page.
- Input: Programme, cohort, skill readiness values, targets.
- Output: Heatmap, KPIs, skill deep dives, action recommendations.
- User benefit: Early intervention planning.

### Alumni-to-Market Insight

- Purpose: Uses alumni outcomes to inform curriculum and market relevance.
- Trigger: Alumni Signals page.
- Input: Employment outcomes, salary, roles, missing skills, year range.
- Output: Alumni insights and focus recommendations.
- User benefit: Evidence-backed programme review.

### AI University Advisor

- Purpose: Summarizes programme-level risks and opportunities for Dr. Evelyn.
- Trigger: University Overview.
- Input: Selected programme, skills, gaps, metrics.
- Output: Key insight, priority actions, impact estimates.
- User benefit: Executive-level decision support.

### Collaboration AI Match Assistant

- Purpose: Ranks and explains partner fit for collaboration events.
- Trigger: Interested organizations view.
- Input: Event needs, interested organizations, student impact expectations.
- Output: AI recommendations and fit rationale.
- User benefit: Better partner selection.

### AI Collaboration Outreach

- Purpose: Helps generate outreach for collaboration partners.
- Trigger: Collaboration marketplace outreach flow.
- Input: Event and target partner context.
- Output: Suggested outreach content and next steps.
- User benefit: Faster partner activation.

### AI Create Event

- Purpose: Helps universities create collaboration event concepts.
- Trigger: Create event flow.
- Input: Event goals, audience, skills, logistics.
- Output: Event structure and recommendations.
- User benefit: Faster event planning.

### Event Impact Intelligence

- Purpose: Measures completed event outcomes.
- Trigger: Post-event tab, impact report, history, and spotlights.
- Input: Event completion data, skill changes, student outcomes, company engagement.
- Output: Readiness uplift, gaps closed, pipeline students, spotlights.
- User benefit: Proves event ROI.

### Candidate Match Engine

- Purpose: Scores candidates for employer opportunities.
- Trigger: Job marketplace pipeline and suggested candidates.
- Input: Candidate profile plus weights for skills, projects, soft skills, leadership, academics, and interests.
- Output: Match score between 60 and 98.
- User benefit: More transparent early-talent screening.

### Employer Match Advisor

- Purpose: Explains candidate fit and recruiter next steps.
- Trigger: Talent Discovery candidate detail.
- Input: Candidate match score, evidence, gaps, and next steps.
- Output: Fit reasons, risks, next action.
- User benefit: Faster, more confident hiring decisions.

### AI Engagement Strategist

- Purpose: Helps employers create stronger student engagement programmes.
- Trigger: Create Engagement builder.
- Input: Employer goals, engagement type, skills, resources.
- Output: Recommended type, copy suggestions, audience, resources, outcomes.
- User benefit: Better-designed campus engagement with less manual planning.

## 7. Data Flow

### Student Data Flow

Student profile and experiences
-> Career Memory
-> Extracted skills and evidence traces
-> Skill profile and credibility
-> Career Intelligence
-> Readiness, market gaps, recommended paths
-> Opportunities and learning actions
-> Applications
-> Application stage outcomes
-> Updated career signals

### University Data Flow

Student memory signals and cohort data
-> Programme readiness metrics
-> Skill coverage by programme and year
-> Market demand comparison
-> Programme gaps and strengths
-> Recommended interventions
-> Collaboration events
-> Post-event impact reports
-> Student spotlights and outcome history
-> Curriculum planning feedback loop

### Employer Data Flow

Candidate evidence profiles
-> Search and candidate discovery
-> Match score and fit explanation
-> Save/shortlist decisions
-> Job opportunity match weights
-> Applicant pipeline
-> Hiring stage updates
-> Candidate insights and validation requests
-> Engagement planning

### Cross-Side Flywheel

Students create evidence.
Universities aggregate evidence into readiness and programme insight.
Employers use evidence to discover talent and create opportunities.
Employer and event outcomes feed back into student profiles and university analytics.

## 8. CareerOS Design System

### Visual Identity

#### Colors

CareerOS uses a clean SaaS palette built around white surfaces, slate text, blue and violet accents, and pastel state colors.

- Primary: blue and indigo.
- Secondary: violet and purple.
- Success: emerald and green.
- Warning: amber and orange.
- Risk: rose and red.
- Neutral: slate.

#### Gradients

Gradients are used for major card banners, brand marks, and premium marketplace cards. Common patterns include blue-to-indigo, violet-to-purple, emerald-to-green, and orange-to-red.

#### Typography

The interface uses modern sans-serif styling with strong hierarchy:

- Large page titles for workspace-level pages.
- Tight section headers for cards.
- Small uppercase labels for metrics.
- Medium-weight body text for analytical summaries.

#### Spacing

Spacing is compact but breathable. Dashboards use 4 to 6 unit gaps, dense tables, and card sections with consistent internal padding.

#### Card Styles

Cards are white, rounded, softly bordered, and lightly shadowed. Most cards use `rounded-xl` or `rounded-2xl`; repeated item cards often use tighter 8px radius.

#### Border Radius

The product generally uses restrained rounded corners. Cards and panels are soft, but not playful.

#### Shadows

Shadows are subtle and used to separate dashboard panels without making the UI feel heavy.

#### Icons

Lucide React is the primary icon system. Icons appear in consistent sizes and often sit inside pastel containers with subtle borders.

#### Badges

Badges communicate status, impact, type, match, priority, and readiness. They use soft backgrounds and clear color semantics.

#### Status Colors

- Blue: active, primary, alignment.
- Emerald: success, strength, ready.
- Amber/orange: medium priority, warning, monitor.
- Rose/red: high-risk, high-priority gap.
- Violet: AI, focus, insight.

#### Charts

The platform uses lightweight visualizations:

- Progress bars.
- Mini trend lines.
- Donut charts.
- Radar chart mock.
- Heatmap tables.
- Funnel-style bars.
- Quadrant visualization.
- Kanban pipelines.

#### Tables

Tables are compact, clean, and analytics-first. They use small text, soft dividers, and status badges.

#### Empty States

Empty states use simple centered cards, muted text, and Lucide icons. They explain what happened and usually provide a next action.

### Design Principles

- Clean enterprise SaaS.
- Analytics-first.
- Action-oriented.
- AI-assisted, not AI-chaotic.
- Evidence over claims.
- Professional but approachable.
- Soft pastel palette with clear status meaning.
- Dense enough for repeated operational use.
- Dashboards should help users make decisions quickly.
- Assistants should explain context, not dominate the UI.

### Component Library

Major reusable component patterns include:

- Workspace shells.
- Top bars.
- Sidebars.
- AI companion cards.
- Typewriter text.
- Metric cards.
- Insight panels.
- Progress bars.
- Skill pills.
- Badges.
- Filter chips.
- Search bars and search dropdowns.
- Opportunity cards.
- Event cards.
- Candidate cards.
- Profile cards.
- Evidence trace cards.
- Recommendation cards.
- Kanban boards.
- Timelines.
- Roadmaps.
- Quadrant charts.
- Heatmaps.
- Donut and bar chart mocks.
- Modal setup flows.
- Wizard/progress steppers.
- Toast feedback.

## 9. UX Patterns

### Sticky Panels

Used for analytical side panels and quadrant layouts so important recommendations remain visible while the user scrolls.

### Recommendation Systems

Recommendations appear as AI advisor cards, next-best-action lists, skill interventions, event suggestions, and candidate suggestions.

### AI Insight Cards

AI cards are visually marked with violet/blue accents and explain the "why" behind scores, gaps, and recommendations.

### Action Cards

Important workflows are presented as cards with clear CTAs: view report, apply suggestions, publish position, view applicants, explore interventions.

### Progress Tracking

Progress appears in readiness bars, skill coverage bars, stage boards, checklist items, and wizard steppers.

### Next-Best-Action Workflows

Each workspace attempts to answer "what should I do next?":

- Student: close skill gaps, apply, save, register.
- University: prioritize gaps, run interventions, view impact.
- Employer: shortlist, validate, invite, publish, hire.

### Opportunity Matching

Events and jobs are ranked and displayed with match percentages, tags, and detailed views.

### Program Alignment Visualizations

Programme insights are shown through gap tables, trend lines, quadrant charts, and skill spotlight panels.

### Career Progression Visualizations

Students see roadmaps, readiness gauges, career path networks, skill summaries, and application pipelines.

### Evidence-First Evaluation

CareerOS repeatedly links decisions back to evidence: projects, experiences, skill traces, event participation, and validated outcomes.

## 10. Landing Page Inputs

### What Should Appear On The Landing Page

- Clear headline: CareerOS as the AI career intelligence platform for students, universities, and employers.
- Three-sided ecosystem explanation.
- Student career memory and readiness.
- University programme-market alignment.
- Employer evidence-based talent discovery.
- AI companion and intelligence layer.
- Outcome flywheel.
- Demo workspace entry points.

### Key Differentiators

- Connects students, universities, and employers in one system.
- Uses evidence-backed career memory, not static profiles.
- Converts market demand into curriculum and student recommendations.
- Measures event and engagement impact.
- Provides employer matching based on verified signals.

### Key Screenshots

- Student Overview with AI Career Companion.
- Career Memory evidence timeline.
- Career Intelligence Market Insights.
- Opportunities Event Hub.
- Applications drag-and-drop pipeline.
- University Overview strategic quadrant.
- Program-Market Alignment Emerging Gaps.
- Student Readiness heatmap.
- Collaboration Marketplace card grid.
- Event Impact Report.
- Employer Talent Discovery candidate profile.
- Job Marketplace applicant pipeline.
- Create Engagement wizard.

### Most Impressive Workflows

- Student adds evidence -> sees skills and career recommendations.
- University sees programme gaps -> creates interventions and collaboration events.
- Post-event report proves readiness uplift and student pipeline outcomes.
- Employer searches candidates -> reviews evidence -> shortlists -> moves applicant through pipeline.
- Employer creates engagement using AI recommendations.

### Best Demo Path

1. Start with Student Overview as Chris.
2. Open Career Memory to show evidence-backed profile.
3. Open Career Intelligence to show market gaps and roadmap.
4. Open Opportunities and apply/save an item.
5. Open Applications and drag an application stage.
6. Switch to University Overview as Dr. Evelyn Chen.
7. Show strategic quadrant and AI University Advisor.
8. Open Program-Market Alignment Emerging Gaps.
9. Open Collaboration Marketplace Post-Event and View Impact Report.
10. Switch to Employer Talent Discovery.
11. Search/shortlist a candidate and inspect evidence.
12. Open Job Marketplace pipeline and show match-driven applicant movement.

### Investor-Friendly Features

- Three-sided network effects.
- AI readiness engine.
- Evidence graph foundation.
- University analytics as institutional SaaS.
- Employer matching and recruiting workflows.
- Outcome measurement for events and engagements.

### University-Friendly Features

- Programme-market alignment.
- Student readiness heatmaps.
- Alumni outcome insights.
- Event impact measurement.
- Curriculum intervention recommendations.
- Executive AI advisor.

### Student-Friendly Features

- Career memory.
- AI career companion.
- Skill gap guidance.
- Career path and market insights.
- Matched opportunities.
- Application pipeline.

### Partner-Friendly Features

- Evidence-based talent discovery.
- Candidate match explanations.
- Shortlist and save workflows.
- Engagement creation.
- Job marketplace.
- Applicant pipeline.

## 11. Pitch Deck Inputs

### Problem

Students cannot prove readiness, universities cannot easily measure programme-market fit, and employers cannot efficiently evaluate early talent.

### Solution

CareerOS is an AI career intelligence platform that connects student evidence, university analytics, and employer talent workflows.

### Market

CareerOS sits at the intersection of higher education, employability analytics, campus recruiting, early talent hiring, and AI career guidance.

### Product

Three connected workspaces:

- Student Workspace: career memory, intelligence, opportunities, applications.
- University Workspace: readiness, alignment, alumni signals, collaboration impact.
- Employer Workspace: talent discovery, engagement creation, job marketplace.

### AI Engine

The AI layer extracts skills, matches opportunities, identifies gaps, recommends interventions, explains candidate fit, and measures event impact.

### User Journey

Student builds evidence -> CareerOS recommends next steps -> University sees aggregate gaps -> Employers discover verified talent -> Outcomes feed back into the system.

### Business Model

Potential models:

- University SaaS subscription by institution/programme.
- Employer subscription for talent discovery and engagement tools.
- Premium analytics modules.
- Event/collaboration marketplace fees.
- Outcome reporting packages.

### Competitive Advantage

- Evidence-first career memory.
- Three-sided ecosystem.
- Programme-level analytics.
- Post-event impact measurement.
- Employer matching with explainability.
- AI assistance embedded across workflows.

### Traction Opportunities

- Pilot with a university faculty.
- Start with computing/data programmes.
- Use student society events as initial data flywheel.
- Partner with employers for targeted engagement campaigns.
- Demonstrate reduced screening time and improved graduate readiness.

### Future Vision

CareerOS becomes the operating system for career readiness, replacing fragmented career portals, static resumes, manual curriculum review, and disconnected campus recruiting workflows.

### Recommended Screenshots For Each Slide

- Problem: split-screen of student gaps, university gaps, employer screening.
- Solution: ecosystem diagram or workspace overview.
- Product: three workspace screenshots.
- AI Engine: Career Intelligence, AI University Advisor, Employer Match Advisor.
- User Journey: Student Overview -> University Quadrant -> Employer Candidate Profile.
- Business Model: workspace pricing matrix.
- Competitive Advantage: evidence trace and event impact report.
- Future Vision: flywheel diagram connecting students, universities, and employers.

## Implementation Notes For Future Builders

- The app is a React/Vite prototype with route-protected role workspaces.
- Demo session role is stored in local storage through `useCareerStore`.
- The product currently relies on mock data and Zustand stores.
- `lucide-react` is the icon system.
- Typewriter assistant behavior is implemented locally with React state and timers.
- No backend API is connected yet.
- Some placeholder routes intentionally exist for future modules.
- Avoid changing product claims without checking the current UI and mock datasets.
