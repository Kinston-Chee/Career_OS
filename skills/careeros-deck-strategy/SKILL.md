---
name: careeros-deck-strategy
description: Plan the source-grounded narrative, slide architecture, feature depth, and truthful Talentbank positioning for the CareerOS asynchronous submission deck. Use when deciding what the CareerOS deck should say, how many slides it needs, or how student, employer, and university value should connect before slide production.
---

# CareerOS Deck Strategy

## Purpose

Create a persuasive self-reading deck plan that explains what CareerOS built, why it exists, how it works, and what impact it is designed to create. Treat the deck as an asynchronous decision document, not a live script or demo-video substitute.

## Required inputs

- `docs/CAREEROS_STRATEGIC_PRODUCT_SUMMARY_2026-07-22.md`
- `docs/pitch/CAREEROS_DEEP_VALUE_DISCOVERY.md`
- `src/App.jsx`, relevant current pages/components, visible copy, mock data, and repository documentation
- Submission rules, audience, and approved brand or slide constraints
- Screenshot manifest from `$careeros-screenshot-curation`, when available

Do not treat the existing `pitch-deck/` implementation or handoff as product truth. Verify every material statement against current sources. Keep the student persona a Data Science student; never substitute actuarial science.

## Workflow

1. Build an evidence ledger with each proposed claim, source, workspace, feature status, and allowed wording.
2. Classify every capability as **Demonstrated** (implemented and inspectable), **Simulated** (prototype behaviour, mock data, or unproven integration), or **Future** (not currently demonstrated).
3. Map each strong stakeholder tension as `real pain -> current failure -> CareerOS feature -> mechanism -> designed impact`.
4. Find one governing narrative connecting all three workspaces. Prefer the shared evidence-and-action loop over three disconnected mini-pitches.
5. Rank features by narrative necessity, proof strength, differentiation, and stakeholder consequence. Give hero features mechanism-level depth; group supporting features; omit low-value inventory.
6. Draft slide jobs, not slide titles. Make each slide answer one reader question and advance the argument.
7. Cover each workspace with its pain, decision, implemented proof, mechanism, and designed impact.
8. Frame Talentbank value as strategic fit across career discovery, talent engagement, employability intelligence, and ecosystem coordination. Use conditional language for unbuilt commercial or platform effects.
9. Set slide count only after assigning essential content. Add a slide when a distinct reader question cannot be answered legibly elsewhere; merge or delete repeated jobs.
10. Run a catalogue test: if the outline can be reordered without weakening the story, rebuild it around causality, decisions, or feedback loops.
11. Write standalone slide briefs with headline, takeaway, evidence, visual proof, status labels, and source references. Never use speaker notes to carry essential logic.

## Feature-depth rule

Use deep treatment when a feature is central, demonstrable, differentiated, or necessary to understand the three-sided loop. Group features sharing one job. Mention or omit breadth that adds no new proof. Complete coverage means covering essential decisions and mechanisms, not listing every route.

## Required outputs

- Evidence and claim ledger
- Narrative thesis and audience-specific value framing
- Pain-to-mechanism map across all three workspaces
- Feature-depth matrix: hero, supporting, mention, omit
- Slide architecture with one reader question and takeaway per slide
- Coverage map and demonstrated/simulated/future labels
- Open questions or evidence gaps

## Failure modes

- Feature-catalogue or workspace-menu ordering
- Sparse stage visuals, presentation-script copy, or reliance on the demo video
- Invented adoption, customers, partnerships, outcomes, ROI, AI accuracy, or integrations
- Mock metrics presented as observed impact
- Talentbank synergies presented as commitments
- Superficial workspace coverage or a preset slide target
- An actuarial science persona

## Final quality checklist

- [ ] One causal narrative connects all three workspaces.
- [ ] Every major feature has pain, mechanism, proof, and designed impact.
- [ ] Every claim has a source and capability status.
- [ ] Demonstrated, simulated, and future content is visibly separable.
- [ ] Talentbank value is persuasive and conditional where evidence is absent.
- [ ] The deck stands alone without narration or video.
- [ ] Slide count follows content and readability.
- [ ] No prohibited invented claims appear.
- [ ] The student persona is a Data Science student.
