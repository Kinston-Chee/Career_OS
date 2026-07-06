// Cross-page mock state for the Employer Workspace demo.
// Keeps shortlist/pass decisions, interview prep questions, and published
// engagements in sync across Talent Discovery, Candidates, Campus Pipeline,
// Engagements, and Home — no backend, everything lives in memory.
import { create } from 'zustand';

export const useEmployerWorkspaceStore = create((set) => ({
  shortlistedIds: new Set(),
  passedIds: new Set(),
  contactedIds: new Set(),
  interviewPrepQuestions: [],
  publishedEngagements: [],

  shortlistCandidate: (id) => set((state) => {
    const nextShort = new Set(state.shortlistedIds);
    const nextPassed = new Set(state.passedIds);
    nextShort.add(id);
    nextPassed.delete(id);
    return { shortlistedIds: nextShort, passedIds: nextPassed };
  }),

  passCandidate: (id) => set((state) => {
    const nextShort = new Set(state.shortlistedIds);
    const nextPassed = new Set(state.passedIds);
    nextPassed.add(id);
    nextShort.delete(id);
    return { shortlistedIds: nextShort, passedIds: nextPassed };
  }),

  markContacted: (ids) => set((state) => {
    const next = new Set(state.contactedIds);
    ids.forEach((id) => next.add(id));
    return { contactedIds: next };
  }),

  addInterviewPrepQuestion: (question) => set((state) => {
    const exists = state.interviewPrepQuestions.some(
      (q) => q.text === question.text && q.candidateId === question.candidateId
    );
    if (exists) return {};
    return {
      interviewPrepQuestions: [
        { id: `prep-${Date.now()}`, ...question },
        ...state.interviewPrepQuestions,
      ],
    };
  }),

  recordPublishedEngagement: (title) => set((state) => ({
    publishedEngagements: [
      { id: `pub-${Date.now()}`, title, publishedAt: Date.now() },
      ...state.publishedEngagements,
    ],
  })),
}));
