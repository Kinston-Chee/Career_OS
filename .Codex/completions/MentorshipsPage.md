# Mentorships Page

## Completed

- Added a new candidate workspace Mentorships page at `/student/mentorships`.
- Built a CareerOS-styled hero with AI companion recommendation context and horizontal recommended mentorship carousel.
- Added search, filter controls, category carousel, premium mentorship program cards, and a useful right sidebar.
- Populated the page with realistic Malaysian company and mentor mock data.
- Wired the page into the candidate top navigation.
- Redirected the legacy `/student/network` route to the new Mentorships page.
- Removed the "Human guidance, curated by CareerOS" hero label.
- Moved the Mentorship title and description outside the recommendation panel to match the Opportunities page hierarchy.
- Aligned the hero companion treatment with Opportunities, including the shared typewriter response and delayed recommendation reveal.
- Simplified the companion response to reference the current goal without displaying the goal text.
- Replaced the Mentorship page's purple accents, gradients, interactions, and shadows with the CareerOS blue palette.
- Added working search, type, industry, duration, match, rating, category, and sorting controls.
- Limited the category preview to six cards with an all-categories modal.
- Limited programs to four initially with functional incremental loading.
- Added program details, applications, group-session joining, and mentorship-request flows with confirmation feedback.
- Removed Mentorships from the candidate top navigation.
- Added a persistent bottom-right Mentorship launcher that opens the Home page's standard centered modal with context and an exploration CTA.

## Validation

- Ran `npm.cmd run build` successfully.
## Home Widget Update

- Replaced the circular icon-only mentorship launcher with a persistent bottom-right widget.
- Added a concise mentorship description and a clear Explore mentorships CTA while preserving the existing modal flow.
- Reshaped the launcher into a taller 196-218px-wide widget with a compact vertical hierarchy and dedicated CTA bar to reduce content obstruction while scrolling.
- Added a custom transparent mentorship wallpaper showing a supportive one-to-one conversation, blended subtly behind the widget content.
