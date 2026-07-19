// Data for the Skill Development page. Ported from the reference HTML.
// Kept as plain objects so the page can render whichever cards / stats /
// sub-skills the user filters and sorts to.

export const SKILLS = [
  {
    id: 'sys-design', name: 'System design', cat: 'technical', catLabel: 'Technical',
    icon: 'network', pct: 22, required: 80,
    status: 'gap', priority: 'gap', eta: '~6 weeks',
    sub: 'Architecture, scalability, distributed systems',
    subskills: [
      { n: 'Scalability patterns', p: 15 },
      { n: 'Database design', p: 30 },
      { n: 'API architecture', p: 28 },
      { n: 'Caching strategies', p: 12 },
    ],
    milestones: [
      { t: 'Complete system design course', done: false, xp: '+12' },
      { t: 'Design a URL shortener system', done: false, xp: '+8' },
      { t: 'Implement a rate limiter', done: false, xp: '+10' },
      { t: 'System design mock interview', done: false, xp: '+15' },
    ],
    activity: [
      { t: 'Watched "Intro to CAP Theorem"', meta: '2 days ago · 45 min' },
      { t: 'Saved system design checklist', meta: '5 days ago' },
    ],
    resources: [
      { icon: 'video', t: 'Grokking System Design', meta: 'Course · 8 hrs · Free trial', xp: '+12 pts' },
      { icon: 'book', t: 'Designing Data-Intensive Apps', meta: 'Book · ~20 hrs', xp: '+20 pts' },
      { icon: 'laptop', t: 'Mock design interview', meta: 'Practice · 60 min', xp: '+15 pts' },
    ],
  },
  {
    id: 'sql', name: 'Data / SQL', cat: 'technical', catLabel: 'Technical',
    icon: 'database', pct: 30, required: 65,
    status: 'gap', priority: 'gap', eta: '~3 weeks',
    sub: 'Queries, schema design, performance',
    subskills: [
      { n: 'SELECT & JOINs', p: 55 },
      { n: 'Schema design', p: 25 },
      { n: 'Indexing & perf', p: 18 },
      { n: 'Transactions', p: 22 },
    ],
    milestones: [
      { t: 'Complete SQL fundamentals module', done: true, xp: '+6' },
      { t: 'Write 10 complex JOIN queries', done: false, xp: '+8' },
      { t: 'Design a normalised schema', done: false, xp: '+10' },
    ],
    activity: [
      { t: 'Completed "SQL basics" quiz', meta: '1 week ago · 90% score' },
      { t: 'Logged SQL project in Career Memory', meta: '2 weeks ago' },
    ],
    resources: [
      { icon: 'school', t: 'Mode Analytics SQL Tutorial', meta: 'Free · 3 hrs', xp: '+8 pts' },
      { icon: 'laptop', t: 'SQLZoo practice problems', meta: 'Interactive · self-paced', xp: '+6 pts' },
    ],
  },
  {
    id: 'backend', name: 'Backend APIs', cat: 'technical', catLabel: 'Technical',
    icon: 'server', pct: 45, required: 75,
    status: 'gap', priority: 'gap', eta: '~4 weeks',
    sub: 'REST, auth, deployment, testing',
    subskills: [
      { n: 'REST design', p: 60 },
      { n: 'Auth / JWT', p: 40 },
      { n: 'Testing APIs', p: 35 },
      { n: 'Deployment', p: 30 },
    ],
    milestones: [
      { t: 'Build a REST API from scratch', done: true, xp: '+10' },
      { t: 'Implement JWT authentication', done: false, xp: '+8' },
      { t: 'Write integration tests', done: false, xp: '+10' },
      { t: 'Deploy to cloud (Cloud Run)', done: false, xp: '+12' },
    ],
    activity: [
      { t: 'Built CareerOS FastAPI backend', meta: '3 weeks ago · logged in Career Memory' },
      { t: 'Completed "API security" module', meta: '1 month ago' },
    ],
    resources: [
      { icon: 'code', t: 'FastAPI full course', meta: 'YouTube · 4 hrs · Free', xp: '+10 pts' },
      { icon: 'laptop', t: 'Build REST API project', meta: 'Log evidence for +15 pts', xp: '+15 pts' },
    ],
  },
  {
    id: 'react', name: 'React / Frontend', cat: 'technical', catLabel: 'Technical',
    icon: 'atom', pct: 70, required: 70,
    status: 'done', priority: 'strong', eta: 'Maintained',
    sub: 'Components, state, hooks, Vite',
    subskills: [
      { n: 'Components & JSX', p: 85 },
      { n: 'State management', p: 70 },
      { n: 'Hooks', p: 72 },
      { n: 'Performance', p: 52 },
    ],
    milestones: [
      { t: 'Build a multi-page React app', done: true, xp: '+10' },
      { t: 'Implement Zustand state store', done: true, xp: '+8' },
      { t: 'Use React Query for data fetching', done: false, xp: '+8' },
    ],
    activity: [
      { t: 'Shipped CareerOS candidate UI', meta: '1 month ago · Vercel' },
      { t: 'Added Zustand to CareerOS', meta: '6 weeks ago' },
    ],
    resources: [
      { icon: 'atom', t: 'React advanced patterns', meta: 'Course · 5 hrs', xp: '+10 pts' },
    ],
  },
  {
    id: 'python', name: 'Python', cat: 'technical', catLabel: 'Technical',
    icon: 'code', pct: 65, required: 60,
    status: 'done', priority: 'strong', eta: 'Maintained',
    sub: 'Core language, async, scripting',
    subskills: [
      { n: 'Core syntax', p: 80 },
      { n: 'Async / await', p: 60 },
      { n: 'Data structures', p: 70 },
      { n: 'Testing', p: 45 },
    ],
    milestones: [
      { t: 'Complete async Python module', done: true, xp: '+8' },
      { t: 'Write 100% test coverage project', done: false, xp: '+12' },
    ],
    activity: [
      { t: 'Resolved asyncio event loop bug', meta: '2 weeks ago · CareerOS backend' },
    ],
    resources: [
      { icon: 'book', t: 'Fluent Python', meta: 'Book · advanced', xp: '+15 pts' },
    ],
  },
  {
    id: 'docker', name: 'Docker & Cloud', cat: 'technical', catLabel: 'Technical',
    icon: 'container', pct: 50, required: 60,
    status: 'progress', priority: 'building', eta: '~2 weeks',
    sub: 'Docker, Cloud Run, GCS, deployment',
    subskills: [
      { n: 'Docker Compose', p: 65 },
      { n: 'Cloud Run deploy', p: 45 },
      { n: 'GCS storage', p: 40 },
      { n: 'Secrets mgmt', p: 35 },
    ],
    milestones: [
      { t: 'Deploy app to Cloud Run', done: true, xp: '+12' },
      { t: 'Configure GCS file storage', done: false, xp: '+8' },
      { t: 'Set up CI/CD pipeline', done: false, xp: '+15' },
    ],
    activity: [
      { t: 'Fixed Docker platform mismatch', meta: '1 week ago · WSL2 setup' },
      { t: 'Deployed CareerOS to Cloud Run', meta: '3 weeks ago' },
    ],
    resources: [
      { icon: 'globe', t: 'Google Cloud Run docs', meta: 'Official · free', xp: '+10 pts' },
    ],
  },
  {
    id: 'leadership', name: 'Leadership', cat: 'soft', catLabel: 'Soft skills',
    icon: 'users', pct: 88, required: 60,
    status: 'done', priority: 'strong', eta: 'Strength',
    sub: 'Team leadership, stakeholder management',
    subskills: [
      { n: 'Team coordination', p: 90 },
      { n: 'Stakeholder comms', p: 85 },
      { n: 'Decision making', p: 82 },
      { n: 'Conflict resolution', p: 78 },
    ],
    milestones: [
      { t: 'Lead a cross-functional project', done: true, xp: '+15' },
      { t: 'Mentor a junior member', done: true, xp: '+10' },
    ],
    activity: [
      { t: "VP role at Taylor's Computing Society", meta: '2023–2024 · logged' },
      { t: 'Led Hackathon team to Top 3', meta: 'Oct 2023' },
    ],
    resources: [
      { icon: 'book', t: "The Manager's Path", meta: 'Book · leadership growth', xp: '+12 pts' },
    ],
  },
  {
    id: 'communication', name: 'Communication', cat: 'soft', catLabel: 'Soft skills',
    icon: 'message', pct: 80, required: 65,
    status: 'done', priority: 'strong', eta: 'Maintained',
    sub: 'Written, verbal, presentation',
    subskills: [
      { n: 'Written comms', p: 85 },
      { n: 'Presentations', p: 78 },
      { n: 'Technical docs', p: 72 },
      { n: 'Active listening', p: 80 },
    ],
    milestones: [
      { t: 'Give a technical talk', done: true, xp: '+10' },
      { t: 'Write public blog post', done: false, xp: '+8' },
    ],
    activity: [
      { t: 'Presented at TCS annual event', meta: '2024 · 80+ attendees' },
    ],
    resources: [
      { icon: 'mic', t: 'Toastmasters online', meta: 'Practice · recurring', xp: '+8 pts' },
    ],
  },
  {
    id: 'problemsolving', name: 'Problem solving', cat: 'soft', catLabel: 'Soft skills',
    icon: 'puzzle', pct: 75, required: 70,
    status: 'done', priority: 'strong', eta: 'Maintained',
    sub: 'Analytical thinking, debugging, creativity',
    subskills: [
      { n: 'Analytical thinking', p: 80 },
      { n: 'Debugging', p: 72 },
      { n: 'Creative solutions', p: 70 },
      { n: 'Root cause analysis', p: 68 },
    ],
    milestones: [
      { t: 'Top 3 at hackathon', done: true, xp: '+15' },
      { t: 'Solve 50 LeetCode problems', done: false, xp: '+12' },
    ],
    activity: [{ t: 'Top 3 at Hackathon', meta: 'Oct 2023' }],
    resources: [
      { icon: 'code', t: 'LeetCode 75 plan', meta: 'Practice · ~50 hrs', xp: '+12 pts' },
    ],
  },
  {
    id: 'agile', name: 'Agile & collaboration', cat: 'soft', catLabel: 'Soft skills',
    icon: 'refresh', pct: 68, required: 60,
    status: 'progress', priority: 'building', eta: 'On track',
    sub: 'Scrum, Kanban, cross-team working',
    subskills: [
      { n: 'Scrum ceremonies', p: 70 },
      { n: 'Kanban boards', p: 65 },
      { n: 'Sprint planning', p: 60 },
      { n: 'Retrospectives', p: 72 },
    ],
    milestones: [
      { t: 'Complete Agile certification', done: false, xp: '+12' },
      { t: 'Run a sprint retrospective', done: true, xp: '+8' },
    ],
    activity: [{ t: 'Used Agile at Grab internship', meta: 'Jun–Aug 2024' }],
    resources: [
      { icon: 'certificate', t: 'PMI-ACP prep', meta: 'Certification · 14 hrs', xp: '+20 pts' },
    ],
  },
  {
    id: 'saas', name: 'SaaS / product thinking', cat: 'domain', catLabel: 'Domain knowledge',
    icon: 'building', pct: 42, required: 55,
    status: 'gap', priority: 'gap', eta: '~5 weeks',
    sub: 'Product lifecycle, metrics, user research',
    subskills: [
      { n: 'Product metrics', p: 38 },
      { n: 'User research', p: 45 },
      { n: 'Go-to-market', p: 35 },
      { n: 'Pricing models', p: 48 },
    ],
    milestones: [
      { t: 'Shadow a product manager', done: false, xp: '+10' },
      { t: 'Write a product requirements doc', done: false, xp: '+8' },
      { t: 'Analyse a SaaS pricing model', done: false, xp: '+6' },
    ],
    activity: [{ t: 'Built CareerOS — end-to-end product', meta: 'Hackathon · 2024' }],
    resources: [
      { icon: 'book', t: 'Inspired by Marty Cagan', meta: 'Book · product strategy', xp: '+15 pts' },
      { icon: 'school', t: 'Product Management basics', meta: 'Coursera · 6 hrs', xp: '+10 pts' },
    ],
  },
  {
    id: 'ai', name: 'AI / ML fundamentals', cat: 'domain', catLabel: 'Domain knowledge',
    icon: 'brain', pct: 58, required: 55,
    status: 'done', priority: 'strong', eta: 'Maintained',
    sub: 'LLMs, ML concepts, prompt engineering',
    subskills: [
      { n: 'LLM concepts', p: 70 },
      { n: 'Prompt engineering', p: 65 },
      { n: 'ML fundamentals', p: 50 },
      { n: 'AI agents (ADK)', p: 55 },
    ],
    milestones: [
      { t: 'Build an LLM-powered feature', done: true, xp: '+15' },
      { t: 'Complete ML fundamentals course', done: false, xp: '+12' },
    ],
    activity: [
      { t: 'Built CareerOS multi-agent ADK system', meta: '2024 · 4-agent architecture' },
      { t: 'Integrated Google Gemini', meta: '2024' },
    ],
    resources: [
      { icon: 'school', t: 'Fast.ai practical ML', meta: 'Free · 30 hrs', xp: '+20 pts' },
    ],
  },
  {
    id: 'aws-cert', name: 'Google Cloud cert.', cat: 'cert', catLabel: 'Certifications',
    icon: 'certificate', pct: 35, required: 100,
    status: 'progress', priority: 'building', eta: '~10 weeks',
    sub: 'Associate Cloud Engineer — GCP',
    subskills: [
      { n: 'Compute & storage', p: 45 },
      { n: 'Networking', p: 25 },
      { n: 'IAM & security', p: 38 },
      { n: 'Data & ML services', p: 30 },
    ],
    milestones: [
      { t: 'Complete GCP fundamentals', done: true, xp: '+10' },
      { t: 'Pass practice exam 1', done: false, xp: '+8' },
      { t: 'Pass practice exam 2', done: false, xp: '+8' },
      { t: 'Schedule official exam', done: false, xp: '+50' },
    ],
    activity: [{ t: 'Started GCP fundamentals path', meta: '2 weeks ago' }],
    resources: [
      { icon: 'globe', t: 'Google Cloud Skills Boost', meta: 'Official · free tier', xp: '+50 pts' },
      { icon: 'laptop', t: 'Whizlabs GCP practice exams', meta: 'Paid · 200+ questions', xp: '+8 pts' },
    ],
  },
  {
    id: 'react-cert', name: 'Meta React cert.', cat: 'cert', catLabel: 'Certifications',
    icon: 'certificate', pct: 72, required: 100,
    status: 'progress', priority: 'building', eta: '~3 weeks',
    sub: 'Meta Front-End Developer Certificate',
    subskills: [
      { n: 'Advanced React', p: 75 },
      { n: 'Testing', p: 65 },
      { n: 'Accessibility', p: 70 },
      { n: 'Performance', p: 78 },
    ],
    milestones: [
      { t: 'Complete advanced React module', done: true, xp: '+10' },
      { t: 'Complete testing module', done: true, xp: '+8' },
      { t: 'Final capstone project', done: false, xp: '+15' },
      { t: 'Submit for certificate', done: false, xp: '+30' },
    ],
    activity: [
      { t: 'Completed testing module', meta: '1 week ago' },
      { t: 'Completed advanced React module', meta: '3 weeks ago' },
    ],
    resources: [
      { icon: 'school', t: 'Coursera Meta certificate', meta: 'Coursera · in progress', xp: '+30 pts' },
    ],
  },
]

export const CAT_META = {
  technical: {
    id: 'technical', label: 'Technical skills', color: '#5B6CF9',
    desc: 'Core engineering skills for a Full-Stack Engineer role.',
    pct: 52, skills: 6, gaps: 3,
  },
  soft: {
    id: 'soft', label: 'Soft skills', color: '#1D9E75',
    desc: 'Interpersonal and workplace competencies.',
    pct: 78, skills: 4, gaps: 0,
  },
  domain: {
    id: 'domain', label: 'Domain knowledge', color: '#d97706',
    desc: 'Industry and product context for tech roles.',
    pct: 50, skills: 2, gaps: 1,
  },
  cert: {
    id: 'cert', label: 'Certifications', color: '#7c3aed',
    desc: 'Formal credentials that boost your job readiness score.',
    pct: 54, skills: 2, gaps: 2,
  },
}

// Palette per category. Kept as flat lookup so components can read
// hex values directly (rather than juggling Tailwind class names).
export const CAT_PALETTE = {
  technical: { bar: '#5B6CF9', tintBg: '#e0e3ff', iconColor: '#5B6CF9' },
  soft:      { bar: '#1D9E75', tintBg: '#e1f5ee', iconColor: '#0F6E56' },
  domain:    { bar: '#d97706', tintBg: '#fef9c3', iconColor: '#854F0B' },
  cert:      { bar: '#7c3aed', tintBg: '#ede9fe', iconColor: '#534AB7' },
}
