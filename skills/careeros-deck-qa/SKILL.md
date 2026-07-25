---
name: careeros-deck-qa
description: Audit a CareerOS asynchronous pitch deck for narrative coherence, product truth, claim evidence, feature coverage, screenshot readability, standalone comprehension, capability labelling, language quality, and final PPTX rendering defects. Use on draft and final CareerOS decks before submission.
---

# CareerOS Deck QA

## Purpose

Prevent the CareerOS deck from becoming misleading, incomplete, unreadable, or technically broken by validating source truth and the rendered PPTX.

## Required inputs

- Draft/final PPTX and source
- Outputs from the other three CareerOS deck skills
- Both July 22 analysis files and current routes/components/copy/data
- PPTX renderer, montage tool, overflow checker, and full-size slide images

## Workflow

1. Render the PPTX, run overflow checks, and inspect every slide at full size; use a montage only for sequence and consistency.
2. Confirm one coherent argument, one job per slide, forward movement, and no catalogue ordering, repetition, or unsupported leaps.
3. Read only visible content and flag reliance on notes, narration, or video.
4. Trace every feature statement and screenshot to current product evidence; verify the Data Science persona.
5. Classify claims as sourced fact, demonstrated behaviour, simulated behaviour, future intent, or designed impact; qualify or remove unsupported claims.
6. Search for invented adoption, customers, partnerships, deployments, measured outcomes, ROI, revenue, conversion, retention, AI accuracy, real-time integrations, and guarantees.
7. Confirm mechanism-level depth for all three workspaces and the shared loop.
8. Inspect screenshot sharpness, crop, scale, state, annotation, and capability label.
9. Check alignment, spacing, hierarchy, wrapping, clipping, overlap, overflow, distortion, contrast, masters, numbering, and footers.
10. Check spelling, grammar, punctuation, terminology, persona consistency, headlines, and leaked production/script notes.
11. Correct defects, regenerate, and repeat until no blockers remain.
12. Issue a pass/fail report with limitations and evidence locations.

## Severity

- **Blocker:** unsupported claim, corrupt PPTX, unreadable slide, missing workspace, unlabeled simulation/future capability, clipping, or unintended overlap.
- **Major:** weak standalone logic, tiny screenshot, inconsistent status language, misleading annotation, repeated slide job, or material language error.
- **Minor:** visual inconsistency that does not change meaning.

## Required outputs

- Narrative/readability findings, claim ledger, coverage matrix, screenshot/visual findings
- Overflow results, language findings, rendered slides, montage, and final pass/fail report

## Failure modes

- Reviewing only source or a montage
- Trusting an older deck, treating mock metrics as outcomes, or treating “AI-powered” as production proof
- Ignoring tiny screenshots, overflow warnings, notes/video dependence, or shallow workspace coverage

## Final quality checklist

- [ ] Narrative is causal, standalone, and not a catalogue.
- [ ] Every claim is verified, qualified, or removed; no prohibited invented claims appear.
- [ ] Demonstrated, simulated, and future labels are consistent.
- [ ] All three workspaces have depth and the Data Science persona is consistent.
- [ ] Screenshots are current, readable, and traceable.
- [ ] No overlap, overflow, clipping, wrapping, or distortion remains.
- [ ] Visual system and language are consistent.
- [ ] The final PPTX opens, renders, and has been inspected slide by slide.
