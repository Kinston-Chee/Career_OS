// Mock data for the University Curriculum-Market Alignment page
// (src/pages/university/CurriculumMarketAlignment.jsx). No backend — static demo content.

export const summaryBanner = {
  text:
    '2 critical gaps detected this quarter. Cloud Computing coverage fell further behind market demand, while GenAI emerged as a new high-priority gap.',
}

// Quadrant scatter nodes. x/y are 0-100 percentages within the plot (Curriculum Coverage / Market Demand).
export const quadrantNodes = [
  { id: 'cloud-computing', label: 'Cloud Computing', sublabel: '340 students', x: 18, y: 82, size: 'lg', tone: 'red', zone: 'top-left' },
  { id: 'genai-llms', label: 'Generative AI / LLMs', sublabel: '210 students', x: 24, y: 68, size: 'md', tone: 'red', zone: 'top-left' },
  { id: 'mlops', label: 'MLOps', sublabel: '95 students', x: 20, y: 52, size: 'sm', tone: 'orange', zone: 'top-left' },
  { id: 'python', label: 'Python', sublabel: '420 students', x: 78, y: 80, size: 'lg', tone: 'green', zone: 'top-right' },
  { id: 'sql', label: 'SQL', sublabel: '360 students', x: 72, y: 66, size: 'md', tone: 'green', zone: 'top-right' },
  { id: 'data-viz', label: 'Data Visualization', sublabel: '180 students', x: 76, y: 22, size: 'sm', tone: 'blue', zone: 'bottom-right' },
  { id: 'excel', label: 'Excel', sublabel: '140 students', x: 22, y: 18, size: 'sm', tone: 'gray', zone: 'bottom-left' },
]

export const gapEvidence = {
  'Cloud Computing': {
    curriculum: {
      coveragePct: 23,
      coveredIn: 'Covered in: CS301 (2 weeks), CS405 (1 week)',
      missing: 'Missing: AWS/Azure deployment, container orchestration, IaC',
    },
    marketDemand: {
      demandPct: 68,
      trend: [40, 48, 54, 58, 62, 68],
      trendStart: '6 months ago',
      trendEnd: 'Now',
      detail: 'of Software/Data roles in KL now require cloud platform experience',
    },
    alumniFeedback: {
      quote: 'I had to learn AWS entirely on the job — nothing in my degree prepared me for deployment work.',
      attribution: '2023 graduate, now Cloud Engineer at Grab',
      citePct: 68,
    },
    employerLanguage: {
      phrases: ['"AWS Certified preferred"', '"experience with containerized deployments"', '"familiarity with CI/CD pipelines"'],
      source: 'Source: 47 job postings analyzed, last 90 days',
    },
  },
  'Generative AI / LLMs': {
    curriculum: {
      coveragePct: 12,
      coveredIn: 'Covered in: CS410 (1 week, elective only)',
      missing: 'Missing: prompt engineering, RAG pipelines, LLM evaluation',
    },
    marketDemand: {
      demandPct: 71,
      trend: [22, 31, 42, 53, 63, 71],
      trendStart: '6 months ago',
      trendEnd: 'Now',
      detail: 'of Software/Data postings in KL now mention LLM or GenAI tooling',
    },
    alumniFeedback: {
      quote: 'Every team I interviewed with asked about LLM integration — I had to learn it all from YouTube.',
      attribution: '2024 graduate, now AI Engineer at a Series B startup',
      citePct: 74,
    },
    employerLanguage: {
      phrases: ['"prompt engineering experience"', '"LLM integration"', '"experience fine-tuning foundation models"'],
      source: 'Source: 33 job postings analyzed, last 90 days',
    },
  },
}

export const roadmaps = {
  'Cloud Computing': {
    closingStatement: 'This roadmap would close the gap from 23% to an estimated 85% coverage within 3 semesters.',
    stages: [
      { id: 1, tone: 'green', title: 'Quick Wins', timeframe: '2–4 weeks', action: 'Add AWS fundamentals module to CS301', lift: '+15%' },
      { id: 2, tone: 'blue', title: 'Foundation Build', timeframe: '1 semester', action: 'New elective: Cloud Infrastructure Basics', lift: '+30%' },
      { id: 3, tone: 'purple', title: 'Capability Deepen', timeframe: '2 semesters', action: 'Partner with AWS Academy for certification pathway', lift: '+25%' },
      { id: 4, tone: 'teal', title: 'Sustain & Scale', timeframe: 'Ongoing', action: 'Annual curriculum refresh tied to job market data', lift: 'maintained' },
    ],
  },
  'Generative AI / LLMs': {
    closingStatement: 'This roadmap would close the gap from 12% to an estimated 80% coverage within 3 semesters.',
    stages: [
      { id: 1, tone: 'green', title: 'Quick Wins', timeframe: '2–4 weeks', action: 'Add prompt engineering primer to CS410', lift: '+12%' },
      { id: 2, tone: 'blue', title: 'Foundation Build', timeframe: '1 semester', action: 'New elective: Applied LLM Systems', lift: '+28%' },
      { id: 3, tone: 'purple', title: 'Capability Deepen', timeframe: '2 semesters', action: 'Partner with an AI lab for a capstone RAG project', lift: '+28%' },
      { id: 4, tone: 'teal', title: 'Sustain & Scale', timeframe: 'Ongoing', action: 'Quarterly curriculum refresh tracking model releases', lift: 'maintained' },
    ],
  },
}
