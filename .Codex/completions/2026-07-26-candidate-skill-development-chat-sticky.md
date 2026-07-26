# Candidate skill development and sticky chat polish

Updated Candidate Skill Development to better match the current candidate workspace shell and made the Career Memory and Career Intelligence chat rails fill the viewport height.

Files changed:
- `src/pages/SkillDevelopmentPage.jsx`
- `src/pages/MemoryProfilePage.jsx`
- `src/pages/CareerIntelligencePage.jsx`

Verification:
- `npm.cmd run build` passed.
- Static checks confirmed both chat rails use `calc(100vh-6rem)` and the chat panels already use full-height flex layouts with scrollable message bodies.
