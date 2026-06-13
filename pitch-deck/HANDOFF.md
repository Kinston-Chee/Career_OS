# CareerOS Pitch Deck Handoff

## 1. Current Objective

Prepare the next coding agent to continue the CareerOS pitch-deck work safely.

The latest instruction for this handoff records an approved product direction that the pitch deck should remain a three-slide prototype for now. Do not begin another major redesign from this handoff alone.

Important current-state note: `pitch-deck/index.html` currently contains 14 slides from the previous deck-extension task. The next agent should reconcile this before doing more work: either confirm the 14-slide deck is still wanted, or reduce the editable master back to the approved three-slide prototype.

## 2. Product And Visual Source-Of-Truth Files

- `CAREEROS_PRODUCT_REFERENCE.md`
  - Product source of truth.
  - Feature status labels must be respected.
  - Current Demo features can be described as demo-ready.
  - Simulated AI must be framed as AI-assisted or simulated in the prototype.
- `MASTER_CONTEXT.md`
  - Broader product context and audit reference.
  - Use only as supporting context, not as the pitch source of truth.
- `pitch-deck/index.html`
  - Current editable HTML deck master.
- `pitch-deck/style.css`
  - Current visual system and layout styles for the deck.
- `pitch-deck/README.md`
  - Preview, controls, export, and screenshot notes.

## 3. Pitch-Deck Skill And Template Being Used

- Skill: `$html-ppt`
- Skill path: `.agents/skills/html-ppt/SKILL.md`
- Structural base: `pitch-deck` full-deck template from the html-ppt skill.
- Theme/base style: `corporate-clean`.
- Runtime: `pitch-deck/assets/runtime.js`.
- Animation file: `pitch-deck/assets/animations/animations.css`.

## 4. Files Created Or Modified

Pitch-deck files currently present:

- `pitch-deck/index.html`
- `pitch-deck/style.css`
- `pitch-deck/README.md`
- `pitch-deck/HANDOFF.md`
- `pitch-deck/assets/base.css`
- `pitch-deck/assets/fonts.css`
- `pitch-deck/assets/runtime.js`
- `pitch-deck/assets/themes/corporate-clean.css`
- `pitch-deck/assets/animations/animations.css`
- `pitch-deck/assets/screenshots/*.png`

Important: the main CareerOS application source under `src/` was not intentionally modified for the pitch deck.

## 5. Current Slide Structure

Current implementation in `pitch-deck/index.html` has 14 slides:

1. CareerOS opening
2. Three-sided problem
3. CareerOS ecosystem solution
4. Student evidence becomes career intelligence
5. The student experience
6. Universities see what the market requires
7. From identified gap to measurable intervention
8. Collaboration becomes measurable
9. Employers discover evidence-backed talent
10. One connected intelligence loop
11. Why CareerOS is different
12. Business model and go-to-market
13. Roadmap
14. Closing vision

Latest approved decision recorded in this handoff: only the first three prototype slides should exist for now. Treat slides 4-14 as a state to confirm or roll back, not as automatically approved.

## 6. Design Decisions Already Approved

- HTML deck remains the editable master.
- Fixed 16:9 layout.
- `corporate-clean` structural base.
- Premium white AI-tech keynote visual language.
- Blue, indigo, and restrained violet palette.
- Subtle glass surfaces and blurred gradient depth.
- No dark sci-fi visual language.
- No decorative robot imagery in the pitch deck.
- Speaker notes are required.
- Only three prototype slides should exist for now.
- Do not modify the main CareerOS application.

## 7. Problems Already Identified

- Current deck file contains 14 slides, but the latest handoff decision says only three prototype slides should exist for now.
- `git status` shows unrelated or not-yet-reviewed workspace changes:
  - `D docs/CAREEROS_PRODUCT_REFERENCE.md`
  - `?? .agents/`
  - `?? CAREEROS_PRODUCT_REFERENCE.md`
  - `?? pitch-deck/`
  - `?? skills-lock.json`
- Because of those changes, a broad commit is not safe without user confirmation.
- The deck uses captured product screenshots under `pitch-deck/assets/screenshots/`; if the deck is reduced back to three slides, these screenshots may become unnecessary.
- Product screenshot captures depend on the local Vite app being able to run at `http://127.0.0.1:5173/`.

## 8. Work Completed

- Created the `pitch-deck/` deck folder.
- Added static html-ppt runtime/theme assets.
- Built and refined the first three prototype slides.
- Extended the deck to 14 slides in a previous step.
- Captured real screenshots from the local CareerOS app into `pitch-deck/assets/screenshots/`.
- Added speaker notes to all current slides.
- Added recording-mode toggle support with `?recording=1` and `V`.
- Verified the current `pitch-deck/index.html` contains 14 slides and 14 notes blocks.
- Re-verified slides 1-3 by rendering them with headless Chrome at 1280x720.

## 9. Work Still Pending

- Resolve whether the deck should remain 14 slides or be reduced to the approved three-slide prototype.
- If reducing to three slides:
  - Remove slides 4-14 from `pitch-deck/index.html`.
  - Remove unused screenshot assets if no longer needed.
  - Recheck slide counters and notes.
  - Re-run 1280x720 and 1920x1080 visual validation.
- If keeping 14 slides:
  - Get explicit user approval because it conflicts with the latest handoff decision.
  - Do a full visual pass on all slides again.
  - Confirm the business/roadmap language is acceptable.
- Decide whether `CAREEROS_PRODUCT_REFERENCE.md` should live at repo root or under `docs/`.
- Clean or confirm unrelated `.agents/` and `skills-lock.json` changes.

## 10. Exact Next Recommended Task

Ask the product owner to confirm the intended deck scope:

> Should I reduce `pitch-deck/index.html` back to the approved three-slide prototype, or keep the current 14-slide full deck?

If the answer is "three slides", perform a targeted rollback of slides 4-14 only. Do not redesign slides 1-3.

## 11. Preview Command And Local URL

Open the static deck directly:

```powershell
Start-Process .\pitch-deck\index.html
```

File URL:

```text
file:///C:/Users/kinst/OneDrive/%E6%96%87%E6%A1%A3/TalentBank%20Hackathon/pitch-deck/index.html
```

The local CareerOS app was running at:

```text
http://127.0.0.1:5173/
```

If the app is not running:

```powershell
npm run dev -- --host 127.0.0.1 --port 5173
```

## 12. Keyboard, Presenter, And Recording Controls

Deck controls from html-ppt runtime:

- `Right Arrow` / `Space`: next slide
- `Left Arrow`: previous slide
- `F`: fullscreen
- `S`: presenter mode with speaker notes
- `N`: notes drawer
- `O`: slide overview
- `V`: toggle recording mode

Recording mode URL:

```text
pitch-deck/index.html?recording=1
```

## 13. PDF / Export Instructions

Use browser print:

1. Open `pitch-deck/index.html`.
2. Press `Ctrl + P`.
3. Choose `Save as PDF`.
4. Set layout to landscape.
5. Enable background graphics.
6. Save.

Chrome headless print-to-PDF was smoke-tested previously.

## 14. Validation Already Performed

- Static slide count check:
  - Current `pitch-deck/index.html`: 14 slides.
  - Current notes blocks: 14.
- Latest handoff verification:
  - Slides 1-3 rendered successfully with headless Chrome at 1280x720.
  - No Chrome render errors were reported for slides 1-3.
- Previous validation:
  - 14-slide deck was rendered at 1280x720 and 1920x1080.
  - Dense slides were visually adjusted after clipping/crowding was observed.
  - Recording-mode screenshot smoke test succeeded.
  - PDF export smoke test succeeded.
- Local app endpoint returned HTTP 200 during this handoff session.

## 15. Known Limitations Or Fragile Areas

- Scope conflict: current implementation has 14 slides, but the latest approved decision says only three prototype slides should exist for now.
- The deck is static HTML, not PowerPoint. It is suitable for browser viewing and PDF export; PPTX conversion would be a separate task.
- Screenshot crops are real local UI captures, but they may become stale if the app UI changes.
- Some screenshot assets include full workspace chrome/top bars because they were captured from active routes rather than manually edited mockups.
- Do not claim real customers, real institutional deployments, real employer partnerships, real traction, production AI integrations, or real market-data feeds.
- Do not present mock UI metrics as real-world outcomes.
- Avoid committing broad workspace changes until the deleted `docs/CAREEROS_PRODUCT_REFERENCE.md`, root `CAREEROS_PRODUCT_REFERENCE.md`, `.agents/`, and `skills-lock.json` changes are reviewed.
