// Cross-page mock state for the University Workspace demo.
// Closes the loop between Curriculum-Market Alignment, Accreditation Hub,
// Student Readiness, and Overview — no backend, everything lives in memory.
import { create } from 'zustand';

export const useUniversityWorkspaceStore = create((set) => ({
  // Gap names (e.g. "Cloud Computing") added to the evidence pack in
  // Curriculum-Market Alignment. Accreditation Hub reads this to update
  // the "Curriculum-market evidence packs" requirement's completeness.
  evidencePackGaps: new Set(),

  // Student Readiness intervention queue — decremented when a row reaches "Completed".
  interventionsInProgress: 15,

  // Collaboration Marketplace — incremented when a new collaboration is created.
  activePartnershipsCount: 13,

  // Accreditation Hub requirement overrides: { [requirementId]: true }
  accreditationOverrides: {},

  addGapToPack: (gapName) => set((state) => {
    const next = new Set(state.evidencePackGaps);
    next.add(gapName);
    return { evidencePackGaps: next };
  }),

  completeIntervention: () => set((state) => ({
    interventionsInProgress: Math.max(0, state.interventionsInProgress - 1),
  })),

  incrementPartnerships: () => set((state) => ({
    activePartnershipsCount: state.activePartnershipsCount + 1,
  })),

  markRequirementOverride: (requirementId) => set((state) => ({
    accreditationOverrides: { ...state.accreditationOverrides, [requirementId]: true },
  })),
}));
