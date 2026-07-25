# CareerOS Pitch Deck QA Report

**Final artifact:** `CareerOS_Complete_Pitch_Deck.pptx`  
**Format:** 16:9 widescreen, 24 slides, editable PowerPoint  
**QA date:** 2026-07-23  
**Final result:** PASS

## QA scope

- Applied all four CareerOS deck skills: strategy, slide design, screenshot curation, and deck QA.
- Checked the final narrative against the approved production blueprint.
- Captured 16 current product screens from the running CareerOS application.
- Rendered and visually inspected all slides twice.
- Reimported the revised PPTX and generated a fresh second render from the delivered file.
- Checked package integrity, slide count, layout bounds, claims, terminology, and implementation-status labels.

## Narrative and standalone-readability QA

**PASS**

- The reader journey moves from the shared evidence problem to the CareerOS operating model, then through student, employer, university, ecosystem, Talentbank value, implementation status, and validation.
- Each slide uses a conclusion-style headline and can be understood without narration.
- Product coverage is distributed across a coherent argument rather than presented as an unexplained feature catalogue.
- The student persona is Chris, a Year 3 Data Science student.
- The deck contains no actuarial-science persona or example.
- The closing translates the product thesis into role-specific value and a concrete validation decision.

## Product-truth and claim-verification QA

**PASS**

- Demonstrated prototype interactions are separated from simulated intelligence, mock data, illustrative analytics, optional AI behavior, future integrations, and future network effects.
- Slide 21 explicitly states that the prototype does not prove adoption, accuracy, or integration.
- No customers, partnerships, adoption, measured outcomes, ROI, or AI accuracy are claimed.
- Expected or designed impacts are framed as intended behavior changes, not measured results.
- Talentbank value is presented conditionally as a strategic extension opportunity, subject to data rights, distribution, buyer demand, consent, trust, integration cost, and operating ownership.
- The ecosystem slide distinguishes repository-demonstrated handoffs from the future permissioned evidence network.

## Screenshot QA

**PASS**

- Screenshots were captured from current implemented routes after entering the relevant Student, Employer, or University workspace.
- The final deck uses current screenshots for Career Memory, Career Intelligence, Opportunities, AI Companion, Community, Talent Discovery, candidate discovery, pipeline, re-engagement, Student Readiness, Curriculum–Market Alignment, Alumni Signal Intelligence, Institutional Reporting, and the AI Office.
- Screens were selected to prove product value and mechanism, not for decoration alone.
- Screenshots are placed at readable scale, cropped to emphasize the relevant product state, and paired with concise interpretive copy.
- No broken, loading, legacy, or visibly placeholder-only screen was used.

## Visual and technical QA

**PASS**

- Canvas: 1280 × 720, equivalent to 16:9 widescreen.
- Typography: consistent Aptos family with a stable title, body, label, and status hierarchy.
- Layout: consistent margins, cards, screenshot frames, annotations, footer treatment, and CareerOS blue-white-lavender palette.
- Automated layout scan found no object frame outside the 1280 × 720 slide bounds.
- Final PPTX package opens as a valid ZIP container and contains 24 slide XML files.
- All 24 final slides rendered successfully after reimporting the delivered PPTX.
- PDF export contains 24 rendered pages.

## Revisions made after first render

- Slide 10: raised and resized the employer-model conclusion to remove lower-edge clipping.
- Slides 1, 9, 15, 18, and 24: shortened status labels to prevent tight wrapping and improve scanability.
- Rerendered the revised PPTX and rechecked the full deck montage plus the corrected slide at full size.

## Known limitations

- Product screenshots show prototype workflows and demo or mock data; they are not evidence of live adoption or production outcomes.
- The PDF is a high-resolution raster export of the verified slide renders. The PPTX remains the editable source artifact.
- The bundled `slides_test.py` helper could not resolve its local runtime path in this Windows session. Equivalent checks were completed using PPTX reimport/rendering, per-slide layout JSON bounds inspection, ZIP/package inspection, full-slide visual review, and explicit claim review.

## Final checklist

- [x] Complete student, employer, and university coverage
- [x] Ecosystem and cross-workspace logic explained
- [x] Talentbank strategic framing is conditional and evidence-safe
- [x] Demonstrated, simulated, and future states are labelled
- [x] Data Science persona used
- [x] No invented measured evidence
- [x] No text overflow or clipping found in final render
- [x] Screenshots readable and visually balanced
- [x] Fonts, alignment, spacing, and status labels consistent
- [x] Editable PPTX, rendered slide images, PDF, and QA report saved
