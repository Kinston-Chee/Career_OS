// Hardcoded NLP command matching for the Employer Workspace demo.
// Each entry matches on keywords found in the free-text query and returns
// a navigation target + toast message. No real NLP/LLM call — mock only.

export const NLP_DEMO_QUERIES = [
  {
    id: 'swe-taylors-apu',
    label: "Find me software engineering interns from Taylor's or APU available after June",
    keywords: ['taylor', 'apu', 'june'],
    to: '/employer/candidates?q=taylor%27s,apu',
    toast: "Found 4 candidates from Taylor's and APU available after June",
  },
  {
    id: 'react-sql-june',
    label: 'Show me candidates with React and SQL available in June',
    keywords: ['react', 'sql'],
    to: '/employer/candidates?q=react,sql',
    toast: 'Found candidates with verified React and SQL evidence',
  },
  {
    id: 'best-channels',
    label: 'Which campus engagement activities produced the highest-quality applicants?',
    keywords: ['engagement', 'quality', 'channel', 'campus activities', 'best'],
    to: '/employer/analytics',
    toast: 'AI & Data Challenge and Referral Program show the highest 90-day retention',
  },
  {
    id: 'keep-warm',
    label: 'Show me candidates we should keep warm for September intake',
    keywords: ['warm', 'september', 'future intake', 'keep warm'],
    to: '/employer/campus-pipeline',
    toast: '68 candidates in Future Pool are warm for your next intake',
  },
  {
    id: 'top-applicants-swe',
    label: 'Show me top applicants for the Software Engineer internship',
    keywords: ['top applicants', 'software engineer'],
    to: '/employer/talent-discovery',
    toast: 'Showing top applicants for Software Engineering Intern — ranked by evidence strength',
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
