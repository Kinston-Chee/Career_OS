# Communities Page

## Completed

- Added a new candidate Communities page at `/student/communities`.
- Added AI-personalised community recommendations and join states.
- Added working search, industry, career path, and popularity controls.
- Added responsive featured community cards with Malaysian mock data.
- Added dedicated community forum views with category-filtered discussions.
- Added discussion details and reply feedback.
- Added discussion creation with automatic similar-discussion suggestions.
- Added Communities to candidate navigation and redirected the legacy Network route.
- Restricted forum access to joined communities and added a locked pre-join state.
- Hid the Open action entirely until a user joins the community.
- Aligned the recommendation hero with Opportunities using the companion robot, typewriter response, and delayed card reveal.
- Added dedicated Cybersecurity, Product Management, and UI/UX Design discussions instead of reusing fallback posts.
- Added a Women in Tech community with technology-focused discussions.
- Redesigned every featured community card to match the visual treatment of Home's Explore Opportunities cards.
- Added a relevant CareerOS visual, tailored colour wash, layered cover treatment, and clearer information hierarchy for each community.
- Preserved the existing Join and joined-only Open interactions in the new card layout.
- Refined the cards to the supplied compact reference with dark full-bleed visuals, concise member information, and a single contextual Join or Open action.
- Replaced the five specified community approximations with exact responsive crops from the supplied reference artwork while retaining functional Join and Open controls.
- Kept only the clean supplied artworks, restored the original CareerOS community data, and returned every card to the shared artwork-top and information/action-bottom layout.
- Added a network-themed hero background and glassmorphism treatment for the AI-recommended community carousel.
- Replaced the generated hero layers with the supplied Kuala Lumpur skyline and flowing-wave background.
- Replaced the skyline variant with the cleaner supplied abstract wave background.
- Fitted the abstract background to the full hero bounds so the artwork fills the entire panel.
- Overscanned the supplied background inside the clipped hero to remove its baked-in white perimeter.

## Validation

- Ran `npm.cmd run build` successfully.
- Visually compared the rendered card grid against the supplied reference at a 1440 x 1000 browser viewport.
- Verified Join-to-Open behavior, community opening, and a clean browser console.
- Verified the refreshed hero at 1440 x 900, including recommendation-card legibility, carousel layout, and Join interaction.
