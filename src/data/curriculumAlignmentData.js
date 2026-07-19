// Mock data for the University Curriculum-Market Alignment page
// (src/pages/university/CurriculumMarketAlignment.jsx). No backend — static demo content.

export const summaryBanner = {
  text:
    '2 critical gaps detected this quarter. Cloud Computing coverage fell further behind market demand, while GenAI emerged as a new high-priority gap.',
}

// Quadrant scatter nodes. x/y are 0-100 percentages within the plot (Curriculum Coverage / Market Demand).
// Keyed by program so the "BSc program" dropdown can swap the distribution.
export const quadrantNodesByProgram = {
  'BSc Data Science': [
    { id: 'cloud-computing', label: 'Cloud Computing', sublabel: '340 students', x: 18, y: 82, size: 'lg', tone: 'red', zone: 'top-left' },
    { id: 'genai-llms', label: 'Generative AI / LLMs', sublabel: '210 students', x: 24, y: 68, size: 'md', tone: 'red', zone: 'top-left' },
    { id: 'mlops', label: 'MLOps', sublabel: '95 students', x: 20, y: 52, size: 'sm', tone: 'orange', zone: 'top-left' },
    { id: 'python', label: 'Python', sublabel: '420 students', x: 78, y: 80, size: 'lg', tone: 'green', zone: 'top-right' },
    { id: 'sql', label: 'SQL', sublabel: '360 students', x: 72, y: 66, size: 'md', tone: 'green', zone: 'top-right' },
    { id: 'data-viz', label: 'Data Visualization', sublabel: '180 students', x: 76, y: 22, size: 'sm', tone: 'blue', zone: 'bottom-right' },
    { id: 'excel', label: 'Excel', sublabel: '140 students', x: 22, y: 18, size: 'sm', tone: 'gray', zone: 'bottom-left' },
  ],
  'BSc Computer Science': [
    { id: 'cloud-computing', label: 'Cloud Computing', sublabel: '280 students', x: 22, y: 78, size: 'lg', tone: 'red', zone: 'top-left' },
    { id: 'mlops', label: 'MLOps', sublabel: '60 students', x: 16, y: 46, size: 'sm', tone: 'orange', zone: 'top-left' },
    { id: 'genai-llms', label: 'Generative AI / LLMs', sublabel: '150 students', x: 30, y: 72, size: 'md', tone: 'red', zone: 'top-left' },
    { id: 'python', label: 'Python', sublabel: '390 students', x: 82, y: 84, size: 'lg', tone: 'green', zone: 'top-right' },
    { id: 'system-design', label: 'System Design', sublabel: '310 students', x: 74, y: 70, size: 'md', tone: 'green', zone: 'top-right' },
    { id: 'sql', label: 'SQL', sublabel: '250 students', x: 68, y: 58, size: 'sm', tone: 'green', zone: 'top-right' },
    { id: 'data-viz', label: 'Data Visualization', sublabel: '90 students', x: 70, y: 20, size: 'sm', tone: 'blue', zone: 'bottom-right' },
    { id: 'excel', label: 'Excel', sublabel: '60 students', x: 18, y: 14, size: 'sm', tone: 'gray', zone: 'bottom-left' },
  ],
  'BSc Data Analytics': [
    { id: 'cloud-computing', label: 'Cloud Computing', sublabel: '160 students', x: 26, y: 74, size: 'md', tone: 'red', zone: 'top-left' },
    { id: 'mlops', label: 'MLOps', sublabel: '40 students', x: 20, y: 44, size: 'sm', tone: 'orange', zone: 'top-left' },
    { id: 'data-viz', label: 'Data Visualization', sublabel: '310 students', x: 82, y: 78, size: 'lg', tone: 'green', zone: 'top-right' },
    { id: 'sql', label: 'SQL', sublabel: '340 students', x: 80, y: 68, size: 'lg', tone: 'green', zone: 'top-right' },
    { id: 'python', label: 'Python', sublabel: '260 students', x: 66, y: 60, size: 'md', tone: 'green', zone: 'top-right' },
    { id: 'genai-llms', label: 'Generative AI / LLMs', sublabel: '120 students', x: 28, y: 60, size: 'sm', tone: 'red', zone: 'top-left' },
    { id: 'excel', label: 'Excel', sublabel: '290 students', x: 72, y: 24, size: 'md', tone: 'blue', zone: 'bottom-right' },
  ],
}

export const programOptions = Object.keys(quadrantNodesByProgram)

export const quadrantNodes = quadrantNodesByProgram['BSc Data Science']

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
      coveragePct: 13,
      coveredIn: 'Covered in: CS410 (1 week, elective only)',
      missing: 'Missing: prompt engineering, RAG pipelines, LLM evaluation, agentic workflows',
    },
    marketDemand: {
      demandPct: 44,
      trend: [10, 16, 24, 31, 38, 44],
      trendStart: '6 months ago',
      trendEnd: 'Now',
      detail: 'of graduate-level roles in KL now require GenAI / LLM proficiency as a baseline requirement (Google and Grab confirmed in July 2026 intake feedback)',
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
  MLOps: {
    curriculum: {
      coveragePct: 9,
      coveredIn: 'Covered in: CS405 (guest lecture only, no assessed component)',
      missing: 'Missing: CI/CD for ML, model monitoring, versioning, orchestration tooling',
    },
    marketDemand: {
      demandPct: 54,
      trend: [18, 24, 33, 41, 47, 54],
      trendStart: '6 months ago',
      trendEnd: 'Now',
      detail: 'of Data Engineer / ML Engineer postings in KL now list MLOps tooling as required',
    },
    alumniFeedback: {
      quote: "My team assumed I'd shipped models to production before — I hadn't even seen a model registry until my first week.",
      attribution: '2024 graduate, now Data Engineer at a logistics scale-up',
      citePct: 41,
    },
    employerLanguage: {
      phrases: ['"experience with MLflow or similar"', '"model deployment pipeline experience"', '"familiarity with model monitoring"'],
      source: 'Source: 19 job postings analyzed, last 90 days',
    },
  },
  'Data Visualization': {
    curriculum: {
      coveragePct: 34,
      coveredIn: 'Covered in: CS220 (2 weeks), CS340 project component',
      missing: 'Missing: Power BI / Tableau depth, dashboard design for non-technical stakeholders',
    },
    marketDemand: {
      demandPct: 58,
      trend: [35, 39, 44, 49, 53, 58],
      trendStart: '6 months ago',
      trendEnd: 'Now',
      detail: 'of Data Analyst postings in KL require a named BI tool (Power BI, Tableau, or Looker)',
    },
    alumniFeedback: {
      quote: "We used matplotlib in class, but every employer interview asked about Power BI — I had to self-teach it before I felt ready.",
      attribution: '2023 graduate, now Data Analyst at a regional bank',
      citePct: 54,
    },
    employerLanguage: {
      phrases: ['"Power BI proficiency required"', '"experience building stakeholder-facing dashboards"', '"Tableau or equivalent BI tool"'],
      source: 'Source: 28 job postings analyzed, last 90 days',
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
    closingStatement: 'This roadmap would close the gap from 13% to an estimated 80% coverage within 3 semesters. TalentBank co-design partnership (approved July 2026) accelerates the foundation build.',
    stages: [
      { id: 1, tone: 'green', title: 'Quick Wins', timeframe: 'Jul–Aug 2026', action: 'Add prompt engineering primer to CS410 while CS5001 spec is finalized', lift: '+12%' },
      { id: 2, tone: 'blue', title: 'Foundation Build', timeframe: 'Semester 5, 2026', action: 'Launch CS5001 GenAI Systems elective — co-designed with TalentBank (RM 180K partnership)', lift: '+28%' },
      { id: 3, tone: 'purple', title: 'Capability Deepen', timeframe: '2 semesters', action: 'Semester 6 practicum: 10 students in Grab GenAI internship slots per intake', lift: '+28%' },
      { id: 4, tone: 'teal', title: 'Sustain & Scale', timeframe: 'Ongoing', action: 'Quarterly curriculum refresh; TalentBank advisory sessions each semester', lift: 'maintained' },
    ],
  },
  MLOps: {
    closingStatement: 'This roadmap would close the gap from 9% to an estimated 75% coverage within 3 semesters.',
    stages: [
      { id: 1, tone: 'green', title: 'Quick Wins', timeframe: '2–4 weeks', action: 'Add a graded MLOps module to CS405 (model registry, CI/CD basics)', lift: '+10%' },
      { id: 2, tone: 'blue', title: 'Foundation Build', timeframe: '1 semester', action: 'New elective: Production ML Systems', lift: '+26%' },
      { id: 3, tone: 'purple', title: 'Capability Deepen', timeframe: '2 semesters', action: 'Partner with a cloud provider for an applied MLOps capstone', lift: '+29%' },
      { id: 4, tone: 'teal', title: 'Sustain & Scale', timeframe: 'Ongoing', action: 'Annual tooling refresh aligned to industry MLOps stack shifts', lift: 'maintained' },
    ],
  },
  'Data Visualization': {
    closingStatement: 'This roadmap would close the gap from 34% to an estimated 82% coverage within 2 semesters.',
    stages: [
      { id: 1, tone: 'green', title: 'Quick Wins', timeframe: '2–4 weeks', action: 'Add a graded Power BI module to CS220', lift: '+18%' },
      { id: 2, tone: 'blue', title: 'Foundation Build', timeframe: '1 semester', action: 'Expand CS340 project component to require a stakeholder-facing dashboard', lift: '+20%' },
      { id: 3, tone: 'purple', title: 'Capability Deepen', timeframe: '1 semester', action: 'Offer a Tableau/Power BI certification pathway via vendor partnership', lift: '+10%' },
      { id: 4, tone: 'teal', title: 'Sustain & Scale', timeframe: 'Ongoing', action: 'Track BI tool demand annually and rotate the taught tool if needed', lift: 'maintained' },
    ],
  },
}
