# CareerOS Strategic Product Summary

Date: 22 July 2026

## Inspection scope and verification

Inspected `src/App.jsx`; student, employer, and university pages under `src/pages/`; shared and workspace components under `src/components/`; mock datasets under `src/data/`; Zustand state under `src/store/`; frontend services under `src/services/`; FastAPI code under `backend/`; and `README.md`, `PRODUCT.md`, `docs/CAREEROS_PRODUCT_REFERENCE.md`, `docs/MASTER_CONTEXT.md`, and `docs/PAGE_GUIDE.md`.

Routes reviewed include the landing/auth flow; student home, overview, Career Memory, Career Intelligence, opportunities, applications, AI Companion, communities, mentorships, and skills; employer home, talent discovery, candidates, posting/engagements, campus pipeline, analytics, marketplace, and insights; university overview, Student Readiness, Curriculum-Market Alignment, Alumni Signals, Collaboration Marketplace, Accreditation Hub, and University AI Office.

`npm.cmd run build` passed on 22 July 2026. The Vite development server started successfully. Automated browser inspection could not be completed because the Playwright CLI was unavailable locally, so this assessment relies on the successfully compiled source, rendered component structure, interactions, state, data, and documentation. The mandated `.Codex/COMMON_MISTAKES.md`, `.Codex/QUICK_START.md`, and `.Codex/ARCHITECTURE_MAP.md` files referenced by `AGENTS.md` were not present.

Verification rule used throughout:

- **Implemented experience**: visible, compiled UI and local interaction.
- **Simulated**: implemented UI whose intelligence, metrics, messages, sending, export, or persistence uses mock data, timers, local state, deterministic logic, or fallback responses.
- **Conceptual**: described direction or implied ecosystem behavior without an end-to-end implementation.

## 1. Executive Product Summary

CareerOS addresses a structural failure in the transition from education to employment: students, employers, and universities make related decisions from different fragments of evidence, at different times, in disconnected systems. A student knows what they have done but struggles to translate it into credible employability signals. An employer sees a resume and application but not the fuller evidence behind readiness. A university sees curriculum, attendance, and outcome reports, often after the moment for intervention has passed. The result is delayed feedback and late action: students discover gaps near graduation, recruiters screen noisy claims manually, and institutions update programmes using incomplete market and outcome signals.

The prototype shows a credible alternative. For students, Career Memory turns projects, internships, leadership, events, and achievements into an evidence-oriented profile. Career Intelligence interprets those signals as readiness, gaps, possible career paths, and next actions. Opportunities and applications then convert guidance into behaviour, while the AI Companion provides a conversational route through the same information. The student experience is therefore more than opportunity browsing: its intended job is to help a student build stronger proof and act on the next employability gap.

For employers, CareerOS presents talent discovery, candidate evidence, explainable fit, shortlisting, engagement design, campus-pipeline reactivation, and applicant management as one workflow. Its strongest idea is not another candidate database; it is reducing the distance between a candidate signal and a recruiter decision. The current implementation demonstrates this through local data and state rather than a live ATS, verified evidence network, or production matching service.

For universities, CareerOS links cohort readiness, curriculum-market gaps, alumni outcomes, employer collaboration, interventions, and accreditation evidence. The newer University AI Office adds a more memorable operating metaphor: specialised AI roles surface issues, prepare work, and escalate decisions to a central room. This makes institutional intelligence feel action-oriented rather than like a collection of reports. However, agent collaboration, approvals, evidence assembly, and outbound actions are presently scripted UI simulations.

The most accurate operating model is **Signal → Evidence → Decision → Action → Outcome → Learning**. “Evidence” deserves its own step because it is CareerOS’s clearest product principle: decisions should trace back to activity, skill proof, market demand, alumni outcomes, or institutional records. The strategic promise is a shared learning loop across three stakeholders. The current product convincingly demonstrates each side and several cross-page handoffs, but not yet a live shared intelligence layer across organisations.

## 2. One-Sentence Definition

1. CareerOS connects student evidence, employer demand, and university action so employability gaps are detected and addressed earlier.
2. CareerOS is a career operating system that turns student activity into trusted evidence, better hiring decisions, and faster institutional action.
3. CareerOS gives students, employers, and universities a shared evidence layer for deciding what to learn, whom to hire, and what to improve.
4. CareerOS converts fragmented career signals into coordinated actions across education and employment.
5. CareerOS helps students prove readiness, employers find evidence-backed talent, and universities keep programmes aligned with outcomes and demand.

**Recommended:** Option 2. It is concrete, outcome-led, understandable without product jargon, and puts the defensible “activity to evidence” mechanism before the broader ecosystem claim.

## 3. The Core Problem

The surface problems are different. Students lack clarity and proof; employers face noisy screening and fragmented engagement; universities receive slow, incomplete feedback on readiness, curriculum relevance, outcomes, and accreditation evidence.

The deeper systemic problem is **fragmented evidence combined with delayed feedback loops**. “Stakeholder silos” explains the organisational symptom, but evidence and timing explain why the silos cause harm. Each stakeholder sees a different snapshot of the same education-to-employment journey. Most current tools record a transaction—course completion, job application, event attendance, candidate stage—but do not preserve an evidence chain and return outcomes to the people who can act on them.

Recommended problem framing:

> Education and employment operate on delayed, disconnected evidence. By the time a student, employer, or university sees the gap, the best moment to act has often passed.

This framing supports the product without overclaiming that every institution already shares data through the prototype.

## 4. The CareerOS Solution

CareerOS proposes one operating loop: **Signal → Evidence → Decision → Action → Outcome → Learning**.

- **Signal:** student experiences, skills, applications, employer demand, cohort readiness, alumni destinations, collaborations, and institutional records.
- **Evidence:** Career Memory traces, candidate proof, market-demand comparisons, evidence chains, intervention records, and accreditation sources.
- **Decision:** prioritise a student action, shortlist a candidate, select an intervention, update a curriculum roadmap, approve a proposal, or request missing evidence.
- **Action:** apply, practise, add proof, message, shortlist, schedule, intervene, create a collaboration, generate a pack, or approve institutional work.
- **Outcome:** application progression, candidate movement, readiness change, event impact, alumni progression, curriculum change, or evidence readiness.
- **Learning:** use outcomes to improve future student guidance, talent discovery, programme decisions, and partnerships.

The UI implements many individual steps and some cross-page continuity through Zustand stores and route parameters. The complete multi-organisation loop remains strategic direction: there is no production identity, shared database, live labour-market feed, SIS/LMS/ATS integration, or longitudinal outcome pipeline.

## 5. Stakeholder Value

### Students

- **User:** students preparing for internships, graduate roles, and early-career decisions.
- **Pain:** uncertainty about readiness, weak proof, generic opportunities, and scattered applications.
- **Solution:** Career Memory organises experience and evidence; intelligence views interpret gaps and paths; opportunities and applications turn advice into action; the AI Companion makes the system intent-driven.
- **Highest-value workflows:** add or edit an experience and its evidence; identify the most important gap; compare paths; act on a high-match opportunity; track an application; practise an interview.
- **AI behaviour:** extract an experience draft, explain profile signals, rank actions and opportunities, propose a roadmap, and coach interview preparation. Backend chat and experience routes exist, but the frontend is designed to fall back to mock output and most scores remain illustrative.
- **Expected outcome:** earlier gap closure, stronger proof, clearer priorities, and better application preparedness.
- **Hero moment:** the Companion explains why an opportunity fits, points to the missing evidence, and directs the student to strengthen Career Memory before applying.
- **Ecosystem contribution:** student activity supplies the evidence from which aggregate readiness and employer-facing signals could be derived.

### Employers

- **User:** recruiters, hiring managers, early-talent teams, and university-relations teams.
- **Pain:** resume noise, manual screening, weak explanations for fit, fragmented campus engagement, and neglected prior candidates.
- **Solution:** evidence-backed talent discovery, candidate detail, shortlisting, applicant pipelines, natural-language-style discovery, rewarming suggestions, engagement creation, and analytics.
- **Highest-value workflows:** search for a need; inspect why a candidate matches; shortlist or move the candidate; design an engagement; reactivate a warm talent pool.
- **AI behaviour:** interpret search intent, score or explain fit, prepare recruiter briefings, recommend re-engagement, and suggest engagement design. These behaviours are primarily data-driven UI simulations and deterministic local logic.
- **Expected outcome:** faster shortlisting, clearer decisions, higher reuse of existing talent pools, and more targeted campus activity.
- **Hero moment:** a recruiter moves from hiring intent to a candidate profile whose match is explained through specific evidence rather than keywords alone.
- **Ecosystem contribution:** employer demand and engagement outcomes could sharpen student guidance and curriculum priorities.

### Universities

- **User:** deans, programme leaders, career services, accreditation teams, partnership teams, and senior management.
- **Pain:** late risk detection, weak curriculum-demand feedback, fragmented alumni and partnership evidence, and manual institutional reporting.
- **Solution:** readiness drilldowns and interventions; curriculum-demand gaps with evidence chains and roadmaps; alumni feedback loops; collaboration portfolio management; accreditation evidence tracking; and the University AI Office.
- **Highest-value workflows:** find an at-risk cohort or student and assign an intervention; select a high-priority curriculum gap and build an evidence pack; trace alumni outcomes back to curriculum; initiate a partner collaboration; inspect missing accreditation evidence; escalate an institutional decision.
- **AI behaviour:** role-specific briefings from Student Success, Curriculum Intelligence, Alumni Outcomes, Partnerships, and Accreditation; a Decision Room for approvals; generated summaries, outreach, roadmaps, and drafts. These are implemented as polished, scripted interactions, not autonomous persistent agents.
- **Expected outcome:** earlier intervention, faster programme response, stronger employer collaboration, better outcome visibility, and reduced evidence-preparation effort.
- **Hero moment:** a curriculum gap is traced from employer demand and alumni feedback into a proposed roadmap and reusable accreditation evidence.
- **Ecosystem contribution:** the university aggregates student evidence, turns demand into programme action, and creates collaborations that generate new student outcomes.

The University AI Office is a strong UX repositioning: it makes institutional work feel like routed responsibilities and approvals. It succeeds as a demonstration metaphor. It does not yet replace the underlying dashboards or prove live agent collaboration; most “work” is pre-authored content and modal state.

## 6. Product Capability Map

| Capability | Problem addressed | Enabled outcome | Status |
|---|---|---|---|
| Career Memory and evidence timeline | Student claims are fragmented and weakly substantiated | Stronger, reusable career proof | Implemented UI; extraction/API fallback and verification are partial/simulated |
| Career Intelligence, paths, gaps, and market standing | Students lack direction and prioritisation | Clear next actions and readiness plan | Implemented, illustrative data and generated logic |
| AI Companion and interview practice | Navigation and advice are generic | Intent-led guidance and preparation | Implemented UI; backend attempt plus mock fallback |
| Matched opportunities and applications | Discovery and follow-up are disconnected | Action and pipeline visibility | Implemented local workflow; no live marketplace |
| Employer talent discovery and candidate detail | CV screening hides evidence and fit | Explainable shortlist decisions | Implemented simulation with mock candidates |
| Campus pipeline and rewarming | Previous relationships decay | Re-engagement of known talent | Implemented local interaction; sending is simulated |
| Engagement/posting workflows | Campus activity is manually designed | Faster targeted engagement | Implemented wizard/local state; recommendations are simulated |
| Student Readiness and interventions | Employability risk is noticed late | Earlier targeted support | Implemented local workflow with mock cohort data |
| Curriculum-Market Alignment and evidence chain | Curriculum review lacks current demand context | Prioritised roadmap and traceable rationale | Implemented cross-page demo; demand data is mock |
| Alumni Signal Intelligence | Institutions lack outcome feedback | Curriculum and partnership learning | Implemented visual analytics with mock data |
| Collaboration Marketplace | Partnerships are treated as isolated events | Portfolio planning and outcome tracking | Implemented local workflow; outreach and impact are simulated |
| Accreditation Hub | Evidence is manually assembled across teams | Readiness tracking, requests, reuse, and draft preparation | Implemented simulation; uploads, sending, and exports are mock |
| University AI Office and Decision Room | Leaders must navigate fragmented functions | Role-based briefing and human approval | Implemented UX concept; agent coordination is scripted |
| FastAPI candidate chat/add-experience and employer posting routes | Need for production services | Initial technical path toward persistence/AI | Partial backend prototype; not evidence of an end-to-end production system |

## 7. Ecosystem and Feedback Loops

Supported or strongly represented loops:

1. **Student experience → Career Memory → skill evidence → guidance → opportunity/application.** This is the clearest implemented product story.
2. **Market demand → curriculum gap → evidence chain → roadmap/intervention.** Represented across university alignment views and cross-page state.
3. **Readiness risk → assigned intervention → tracked status.** Implemented as local university workflow.
4. **Alumni outcome → curriculum gap or partnership action.** Explicit navigation and content connect alumni signals to alignment and collaboration.
5. **Curriculum evidence pack → Accreditation Hub.** A gap added in Curriculum-Market Alignment changes accreditation evidence readiness through shared local store state.
6. **Employer intent → candidate evidence → shortlist/pipeline action.** Implemented across employer pages with local state.

Strategic-potential loops, not proven end to end:

- Employer hiring outcomes automatically improving student recommendations.
- Verified student evidence being shared live with employers and aggregated for universities under permission controls.
- Collaboration attendance and outcomes automatically updating Career Memory and institutional impact.
- Persistent university AI employees monitoring systems, collaborating, and executing work autonomously.
- Longitudinal alumni outcomes continuously measuring whether curriculum interventions worked.

## 8. Strongest Product Differentiators

1. **Evidence-first career memory across the student journey — strongest product differentiation.** It changes the unit of value from a profile claim to an evolving record of activity, proof, and inferred skill. Defensibility depends on trusted ingestion, verification, permissions, and longitudinal use, which are not yet production-ready.
2. **Three-sided decision loop — strongest future strategic moat.** Few point tools connect preparation, institutional response, hiring, and outcome learning. The prototype demonstrates the model but not a live network effect.
3. **Curriculum-to-market evidence chains — strong product and UX differentiation.** The UI does more than display a gap: it links demand, curriculum coverage, alumni feedback, action, and accreditation reuse.
4. **AI roles plus human Decision Room — strongest UX differentiation.** Persistent job-shaped assistants are more understandable to institutional users than a generic chatbot. Presently conceptual in intelligence and execution.
5. **Explainable early-talent discovery beyond CV keywords — strong product differentiation.** Candidate profiles show why a match exists and what evidence supports it. Current match data and scores are simulated.
6. **Operational accreditation reuse — promising adjacent differentiation.** Reusing curriculum, readiness, alumni, and intervention evidence could lower reporting burden. Current generation and requests are mock.
7. **Intent-driven guidance across workspaces — UX differentiation.** Companions, briefings, and suggested actions reduce navigation burden, but generic AI assistants could copy the surface; the moat must come from proprietary, permissioned evidence and outcomes.

Do not claim autonomous agents, verified cross-institution data, real-time market intelligence, proven matching accuracy, or automatic accreditation assembly as current differentiation.

## 9. Real-World Impact

| Stakeholder impact | Product mechanism | Metrics to validate |
|---|---|---|
| Students see gaps earlier | Readiness, missing-skill, and evidence views surface specific next actions | Time from gap detection to action; action completion; readiness movement |
| Students build stronger proof | Career Memory requests evidence and links experience to skills | Share of experiences with evidence; verification rate; employer profile-to-interview conversion |
| Students reduce uncertainty | Companion ranks priorities and explains opportunity fit | Guidance-to-action conversion; return usage; self-reported decision confidence |
| Employers shortlist faster | Search, fit explanations, evidence traces, and shortlist actions reduce manual review | Time to first shortlist; profiles reviewed per shortlist; screening hours |
| Employers improve shortlist quality | Evidence and gaps accompany scores | Interview acceptance; interview-to-offer conversion; hiring-manager agreement; false-positive review |
| Employers reuse talent pools | Campus pipeline rewarming identifies candidates for renewed contact | Re-engagement rate; response rate; recovered candidates; time saved versus new sourcing |
| Universities intervene earlier | Cohort and student risk views connect to intervention assignment | Detection lead time; intervention completion; readiness change; persistence/outcome by cohort |
| Universities align curricula faster | Demand gaps, evidence chains, and roadmaps make priorities explicit | Time from signal to curriculum decision; high-priority gaps closed; approval cycle time |
| Universities improve partnership value | Portfolio, recommendation, event, and impact views connect activity to outcomes | Active partners; repeat partnerships; student participation; skill uplift; opportunity conversion |
| Universities reduce evidence burden | Accreditation requirements reuse evidence from other modules | Evidence collection time; missing-item closure; draft preparation time; readiness by deadline |

No current UI percentage, match score, uplift, market-demand statistic, or ROI figure should be presented as measured impact. Use them only as demo data unless a real pilot dataset is supplied.

## 10. Strategic Value for Talentbank

CareerOS could extend Talentbank from episodic job and event interactions into a longer career-and-talent lifecycle. This is strategic inference, not an implemented business result.

- **Deeper student relationship:** Career Memory, guidance, learning actions, and application tracking create reasons to engage before and between job searches.
- **Richer employer value:** evidence-led discovery, re-engagement, and campus programme design could complement listings with talent intelligence and workflow.
- **Greater university relevance:** readiness, curriculum alignment, partnerships, outcome evidence, and accreditation support create an institutional product surface.
- **Potential network effects:** more student evidence could improve talent discovery; more employer demand and outcomes could improve guidance; more university adoption could create structured cohorts and interventions.
- **New product lines:** possible university SaaS, employer intelligence, engagement programmes, and outcome-reporting services.
- **Better matching foundation:** Talentbank’s position in an employment ecosystem could make CareerOS more credible than a standalone assistant, but the repository does not prove unique data access, partnerships, adoption, or rights to combine these datasets.

The pitch should say “CareerOS could compound Talentbank’s existing ecosystem relationships” rather than claim existing proprietary advantage. Leadership will need evidence about data availability, consent, integration cost, commercial ownership, and an initial buyer.

## 11. Strongest Demo Moments

1. **University — curriculum gap to evidence and action.** Before: leaders see an abstract employability concern. Trigger: select Cloud Computing or another priority gap. System: displays demand, curriculum, alumni, and employer-language evidence; adds the gap to a pack. Human: chooses the roadmap or evidence action. Outcome: the Accreditation Hub reflects the new pack. Persuasive because it shows a cross-page operating loop. **Implemented UI with simulated data.**
2. **Student — evidence-aware opportunity guidance.** Before: a student sees many options and weak proof. Trigger: ask the Companion what to prioritise or why an opportunity fits. System: links fit to NLP/Python/activity signals and flags missing evidence. Human: strengthens Career Memory and applies. Outcome: clearer, evidence-led action. **Implemented UI; AI/backend may fall back to scripted response.**
3. **Employer — intent to evidence-backed shortlist.** Before: recruiter faces resume noise. Trigger: search or choose a talent need. System: ranks candidates and explains evidence, fit, gaps, and next action. Human: shortlists or opens the candidate workflow. Outcome: faster defensible screening. **Implemented simulation.**
4. **University — risk detection to intervention.** Before: aggregate readiness hides vulnerable students. Trigger: inspect a cohort/student risk row. System: reveals the gap and intervention options. Human: assigns and advances an intervention. Outcome: intervention queue/status changes. **Implemented local-state simulation.**
5. **University — AI Office to Decision Room.** Before: signals are scattered across departments. Trigger: enter the office or open an urgent brief. System: role-specific AI employees surface work and escalate approvals. Human: reviews a decision in one place. Outcome: visible institutional coordination. Persuasive as the product reveal, not as proof of autonomous agents. **Implemented UX concept; scripted intelligence.**
6. **Employer — warm-pipeline reactivation.** Before: previous candidates go cold. Trigger: accept a rewarming suggestion. System: explains why now and prepares outreach. Human: confirms contact. Outcome: candidate returns to an active pipeline state. **Implemented simulated workflow.**
7. **University — accreditation missing evidence to draft.** Before: requirements are fragmented. Trigger: select a missing item, request evidence, or generate a summary. System: shows ownership, sources, reuse, completeness, and a draft. Human: reviews or overrides. Outcome: visible readiness progression. **Implemented simulation; upload/send/export are mock.**
8. **Student — Career Memory to Career Intelligence.** Before: experiences are isolated resume lines. Trigger: inspect or add an experience. System: extracts skills/evidence and connects them to readiness and career paths. Human: improves proof or chooses a roadmap. Outcome: an activity becomes decision support. **Partially backend-connected with fallback; broader intelligence is simulated.**

## 12. Recommended Pitch Narrative

### Primary narrative: “The same gap, seen too late by three people”

- **Opening tension:** A student discovers near graduation that they lack deployable cloud evidence. An employer cannot distinguish real capability from resume keywords. A university learns from an annual review that market demand moved months earlier.
- **Central insight:** These are not three separate failures. They are one delayed feedback loop caused by fragmented evidence.
- **Product reveal:** CareerOS turns activity and outcomes into a shared evidence-led operating loop for students, employers, and universities.
- **Demonstration sequence:** student Career Memory and Companion → employer evidence-backed shortlist → university gap evidence chain and intervention → AI Office Decision Room.
- **Proof of impact:** show the mechanisms and name the pilot metrics—time to action, time to shortlist, intervention completion, gap closure, and evidence-preparation time—not fabricated results.
- **Strategic vision:** outcomes from each stakeholder improve the next decision across the ecosystem.
- **Closing message:** CareerOS helps the whole system act before employability gaps become graduate outcomes.

Alternative 1: **“From dashboard to operating system.”** Begin with institutions already having data but lacking routed actions, then reveal AI roles and human approvals. Strong for university and leadership audiences; weaker as the universal opening.

Alternative 2: **“One student, one evidence trail, three better decisions.”** Follow a single student’s activity into guidance, employer discovery, and curriculum learning. Emotionally accessible, but care is needed not to imply live cross-workspace propagation that is not implemented.

## 13. Audience Messaging

### Hackathon judges

- **Care about:** originality, coherent problem-solution fit, technical credibility, demo quality, and scope discipline.
- **Lead with:** the three-sided delayed-feedback problem and one cross-page evidence loop.
- **Likely objection:** “This is many dashboards with mock AI.”
- **Answer with:** a clear architecture of evidence, decisions, actions, and human approval; explicitly label the prototype boundary and show the working cross-page state.

### Talentbank leadership

- **Care about:** strategic fit, buyer, adoption path, use of existing ecosystem relationships, monetisation, and delivery risk.
- **Lead with:** extension from listings/events into continuous student, employer, and university workflows.
- **Likely objection:** breadth, integration burden, data permissions, and unclear first commercial wedge.
- **Answer with:** propose one pilot—such as one computing faculty plus a small employer cohort—and define success metrics and required data.

### Investors

- **Care about:** wedge, market urgency, repeatable distribution, retention, defensibility, economics, and proof of demand.
- **Lead with:** evidence graph and three-sided feedback loop, but position them as the scaling thesis.
- **Likely objection:** platform scope before product-market fit; generic AI surface; unproven network effects.
- **Answer with:** name the initial buyer and high-frequency job, show why data compounds, and present a staged integration and validation plan. Do not use prototype breadth as traction.

For universities, emphasise earlier intervention, traceable curriculum decisions, accreditation reuse, and human governance. For employers, emphasise evidence-backed shortlisting and warm-pool reuse. For students, emphasise clearer actions and stronger proof, not institutional surveillance.

## 14. Product Risks and Credibility Gaps

| Risk or weakness | Recommendation |
|---|---|
| The product is very broad and can look like a feature catalogue | Reposition around one evidence loop; move secondary modules out of the main story |
| Cross-workspace data sharing is mostly implied | Clarify in the pitch; demonstrate only the curriculum-pack/accreditation local-state handoff as implemented |
| Most AI behaviour, scores, and metrics are scripted or deterministic | Label as simulated; explain the intended inputs, output, and human decision |
| University AI employees may be mistaken for autonomous agents | Demonstrate as an interaction model and future orchestration layer, not deployed automation |
| Mixed generations of routes and layouts create duplication | Fix before a high-stakes live demo or restrict the demo path to current routes |
| Documentation sometimes describes the backend as future while some backend code exists | Say “partial backend prototype; no production end-to-end integration” |
| Candidate chat is hard-coded to localhost and falls back silently | Fix or control the demo environment; never imply a successful AI call without an explicit source indicator |
| Accreditation requests, uploads, exports, outreach, and approvals are mock | Show the evidence structure and human review; avoid performing “send” actions as if external systems changed |
| Illustrative statistics can be mistaken for results | Add a visible demo-data label and omit numeric impact claims from the pitch |
| Evidence verification is not production-grade | Make provenance/verification a roadmap and pilot requirement |
| Privacy, consent, access control, fairness, and appeal mechanisms are not developed | Address explicitly before pilots; define stakeholder permissions and candidate control |
| Match/readiness scoring lacks validated models and bias evaluation | Present scores as interface demonstrations; prioritise explainability and outcome validation |
| Large frontend bundle and no lint/test scripts reduce technical confidence | Not a pitch headline; address before external pilots, but the current production build passes |
| Placeholder and legacy areas dilute perceived completion | Leave them out of the main demo and remove dead-end navigation where practical |

## 15. Evidence Table

| Claim | Supporting page/component/file | Status | Confidence |
|---|---|---|---|
| CareerOS contains protected student, employer, and university workspaces | `src/App.jsx`, `src/components/session/ProtectedRoute.jsx` | Implemented | High |
| Students can organise experiences and evidence in Career Memory | `src/pages/MemoryProfilePage.jsx`, `src/components/memory/` | Implemented UI; extraction/verification partial | High |
| Students receive readiness, gap, market, and path guidance | `src/pages/CareerIntelligencePage.jsx`, `src/components/career/`, `src/services/MarketDataService.js` | Simulated/illustrative | High |
| The AI Companion supports intent-led advice, opportunity, signal, roadmap, and interview flows | `src/pages/AICompanionPage.jsx`, `src/components/interviewPractice/` | Implemented UI; API attempt and mock fallback | High |
| Students can save/apply to opportunities and track applications | `src/pages/OpportunitiesPage.jsx`, `src/pages/ApplicationsPage.jsx`, `src/store/useCareerStore.js` | Local-state implementation | High |
| Employers can search and inspect evidence-backed candidates | `src/pages/employer/TalentDiscovery.jsx`, `src/pages/employer/Candidates.jsx`, `src/data/talentDiscoveryData.js` | Simulated | High |
| Employers can shortlist, manage pipeline actions, and rewarm candidates | `src/store/useEmployerSearchStore.js`, `src/pages/employer/CampusPipeline.jsx`, `src/components/employer/pipeline/` | Local-state simulation | High |
| Employers can create engagements/postings | `src/pages/employer/Engagements.jsx`, `src/pages/EmployerCreateEngagementPage.jsx`, `backend/routers/employer.py` | UI implemented; backend partial | Medium-high |
| Universities can identify readiness risk and assign interventions | `src/pages/university/StudentReadiness.jsx`, `src/components/university/readiness/`, `src/store/useUniversityWorkspaceStore.js` | Local-state simulation | High |
| Universities can connect market gaps to evidence and roadmaps | `src/pages/university/CurriculumMarketAlignment.jsx`, `src/components/university/curriculum/` | Simulated data, implemented workflow | High |
| Alumni signals route users toward curriculum and partnership action | `src/pages/university/AlumniSignalIntelligence.jsx`, `src/components/university/alumni/FeedbackCurriculumLoop.jsx` | Implemented navigation; mock data | High |
| Curriculum evidence can affect accreditation readiness in the demo | `src/store/useUniversityWorkspaceStore.js`, `src/pages/university/AccreditationHub.jsx` | Implemented cross-page local state | High |
| Accreditation evidence requests, reuse, summaries, and overrides are represented | `src/pages/university/AccreditationHub.jsx`, `src/components/university/accreditation/` | Simulated | High |
| University AI Office has five specialised roles and a central Decision Room | `src/pages/university/UniversityAIOffice.jsx`, `src/components/university/aiOffice/agentConfig.js`, `DecisionRoomModal.jsx` | Implemented UX concept | High |
| University AI employees autonomously collaborate and execute institutional work | No end-to-end orchestration found | Conceptual | High |
| A FastAPI backend contains candidate chat/add-experience and employer posting routes | `backend/app/app.py`, `backend/routers/candidates.py`, `backend/routers/employer.py` | Partial prototype | High |
| CareerOS currently has a production database, identity, or live institutional integrations | Repository explicitly says otherwise; frontend relies heavily on mock/local state | Not implemented | High |
| The three-sided ecosystem could create a compounding data advantage | Product architecture and docs support the thesis; no live network is present | Strategic potential | Medium |

## 16. Final Product Positioning

**Headline:** Turn career evidence into action—before the gap becomes an outcome.

**Subheadline:** CareerOS helps students build and act on proof, employers find explainable early talent, and universities respond to readiness and market signals sooner.

**30-second explanation:** CareerOS addresses one broken feedback loop across education and employment. Students turn real experiences into evidence and receive clear next actions. Employers use that evidence to find and assess early talent beyond resume keywords. Universities see readiness, curriculum, alumni, and employer signals early enough to intervene. The current prototype demonstrates these connected workflows with simulated data; the long-term value is a shared evidence layer that improves each decision over time.

**90-second explanation:** Students, employers, and universities are trying to solve the same transition from education to employment, but each sees only part of the evidence. Students often learn too late what proof or skills they lack. Employers screen resumes without enough context. Universities receive market and outcome feedback after curriculum and intervention decisions have already been made. CareerOS changes the operating model. A student’s projects, internships, events, and achievements become an evidence-oriented Career Memory. That evidence informs readiness, gaps, career paths, opportunities, and interview preparation. Employers discover candidates through explainable signals, then shortlist, engage, or reactivate talent. Universities aggregate readiness, compare curriculum with demand, connect alumni outcomes back to programmes, coordinate employer collaborations, and reuse evidence for accreditation. Specialised university AI roles surface work and route decisions to human leaders. Today’s repository is a broad, working frontend prototype with local interactions, mock datasets, and a partial backend—not a deployed shared-data network. Its strategic promise is the closed loop: better evidence produces earlier action, outcomes return as learning, and every stakeholder makes the next decision with more context.

Closing alternatives:

1. Career readiness should not be discovered at graduation.
2. One evidence trail. Three better decisions. A stronger path from education to employment.
3. CareerOS turns late reports into earlier action.

## 17. Questions We Must Answer Before Building the Deck

1. Who is the first paying buyer: university leadership, a faculty, career services, or employers?
2. What is the narrow pilot workflow and which modules are genuinely in its first release?
3. Which demo data is real, anonymised, synthetic, or illustrative?
4. Can any existing Talentbank relationships, distribution, or datasets be publicly referenced, and with what evidence?
5. Which AI calls will work reliably in the live demo, and how will simulated responses be labelled?
6. What exact evidence can be verified, by whom, and how can students correct or revoke it?
7. What permissions govern student-to-employer and student-to-university visibility?
8. What readiness and match methodologies are intended, and how will fairness and accuracy be evaluated?
9. Which systems must integrate first—SIS, LMS, ATS, event attendance, job feeds, or identity?
10. What outcome metric will define a successful pilot for each stakeholder?
11. Do we have any measured baseline for screening time, intervention delay, evidence preparation, or curriculum review?
12. Is the University AI Office the primary product entry point or a future interaction layer over existing modules?
13. Which three demo flows are stable enough for a high-stakes live presentation?
14. Which legacy/placeholder routes should be hidden before the demo?
15. What is the approved product name for the intelligence layer: CareerOS, CareerGraph, Career Memory, or a defined hierarchy?
16. What claims about market size, business model, pricing, adoption, or partnerships can be supported externally?
17. What is the credible 6–12 month roadmap from this prototype to a secure pilot?

## Bottom-line recommendation

Pitch CareerOS as an **evidence-to-action loop**, not a bundle of AI dashboards. Lead with the student evidence journey, prove the idea through one employer decision and one university cross-page action, and use the AI Office as the memorable interface for the strategic vision. Be explicit that the current build is a polished prototype with partial backend work and simulated intelligence. Its credibility will come from precise boundaries, a narrow pilot, and measurable next-stage outcomes—not from presenting illustrative metrics as results.
