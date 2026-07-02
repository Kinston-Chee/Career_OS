// Hardcoded NLP command matching for the University Workspace demo.
// Each entry matches on keywords found in the free-text query and returns
// a navigation target + toast message. No real NLP/LLM call — mock only.

export const NLP_DEMO_QUERIES = [
  {
    id: 'programs-losing-relevance',
    label: 'Show me which programs are losing market relevance',
    keywords: ['losing', 'market relevance', 'programs'],
    to: '/university/curriculum-alignment',
    toast: 'Highlighting Curriculum-Market Alignment — 2 critical gaps detected: Cloud Computing and Generative AI / LLMs',
  },
  {
    id: 'students-need-intervention',
    label: 'Which students need intervention now?',
    keywords: ['intervention', 'students need', 'at risk'],
    to: '/university/student-readiness',
    toast: '34 students show hidden employability risk — opening the at-risk cohort',
  },
  {
    id: 'qs-readiness',
    label: 'How ready are we for QS submission?',
    keywords: ['qs submission', 'qs ', 'ready for qs', 'accreditation ready'],
    to: '/university/accreditation',
    toast: 'QS World Rankings: 82% ready — 41 of 50 evidence points complete, due in 6 weeks',
  },
  {
    id: 'alumni-curriculum-feedback',
    label: 'What did alumni say about our curriculum?',
    keywords: ['alumni say', 'alumni feedback', 'curriculum feedback'],
    to: '/university/alumni-signals',
    toast: '68% of alumni cite Cloud Deployment as a gap discovered on the job — opening Alumni Signal Intelligence',
  },
];

// Returns the best-matching demo query for free text, or null if nothing matches
// closely enough. Matching is a simple keyword-overlap heuristic — good enough
// for a hardcoded demo, not a real intent classifier.
export function matchNlpQuery(rawText) {
  const text = (rawText || '').toLowerCase().trim();
  if (!text) return null;

  let best = null;
  let bestScore = 0;
  for (const query of NLP_DEMO_QUERIES) {
    const score = query.keywords.reduce((acc, kw) => (text.includes(kw) ? acc + 1 : acc), 0);
    if (score > bestScore) {
      bestScore = score;
      best = query;
    }
  }
  return bestScore > 0 ? best : null;
}
