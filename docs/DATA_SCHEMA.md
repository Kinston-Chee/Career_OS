# Data Schema

Most demo data lives in `src/data/mockData.js`. These schemas describe the current mock objects. They are not database models yet.

## Student Profile Data

| Field | Type | Purpose |
| --- | --- | --- |
| `name` | string | Candidate display name |
| `role` | string | Candidate role or profile description |
| `university` | string | Candidate university |
| `avatarInitials` | string | Initials shown in UI |
| `email` | string | Candidate email |

Example:

```js
{
  name: 'Kinston Lee',
  role: 'Computer Science Student',
  university: 'Taylor University',
  avatarInitials: 'KL',
  email: 'kinston@email.com',
}
```

## Experience Data

| Field | Type | Purpose |
| --- | --- | --- |
| `id` | string | Unique experience ID |
| `title` | string | Experience title |
| `type` | string | Experience category |
| `role` | string | Candidate role in the experience |
| `date` | string | Display date |
| `summary` | string | Short evidence summary |
| `evidenceLinks` | string[] | Mock proof links |
| `credibility` | string | Verification status |
| `extractedSkills` | object[] | Skills connected to the experience |

Example:

```js
{
  id: 'exp-001',
  title: 'AI Chatbot for Mental Health Hackathon',
  type: 'Hackathon',
  role: 'Project Lead',
  date: 'Mar 20 2025',
  summary: 'Built an AI chatbot that provided mental health support and resources.',
  evidenceLinks: ['Demo Video', 'Presentation'],
  credibility: 'Verified',
  extractedSkills: [
    { name: 'Python', level: 'Advanced', credibility: 92 },
  ],
}
```

## Candidate Overview Data

| Field | Type | Purpose |
| --- | --- | --- |
| `profile` | object | Candidate identity shown in overview/sidebar |
| `careerSnapshot` | object | Readiness, strengths, in-demand skills, and evidence count |
| `todayActions` | object[] | Career action checklist |
| `careerSignalTimeline` | object[] | Timeline events for today |
| `topCareerPaths` | object[] | Summary career matches |
| `skillGaps` | object[] | Gaps for the target role |
| `applicationTracker` | object | Application status counts |
| `recentCareerMemories` | object[] | Recent evidence/memory cards |
| `researchInterests` | string[] | Right panel interest chips |
| `recommendations` | object[] | Recommended papers, courses, and events |
| `aiCareerInsight` | string | AI insight message |

Example:

```js
{
  profile: {
    name: 'Shirley Tan',
    identity: 'Computer Science Student',
    university: 'Taylor University',
    careerFocus: 'Data Analyst',
    targetRole: 'Data Analyst',
  },
  todayActions: [
    { title: 'Upload new project: Sales Dashboard', badge: 'Recommended', tone: 'purple' },
  ],
}
```

## Career Path Data

| Field | Type | Purpose |
| --- | --- | --- |
| `id` | string | Unique career path ID |
| `roleName` | string | Career role name |
| `title` | string | Display title |
| `matchScore` | number | Candidate-role fit score |
| `readiness` | number | Readiness percentage |
| `demandLevel` | string | Market demand label |
| `salaryRange` | string | Salary range display |
| `description` | string | Short card description |
| `fitReason` | string | Why the role fits |
| `whyFits` | string | Longer explanation |
| `matchingSkills` | string[] | Skills already matching |
| `missingSkills` | string[] | Skills to improve |
| `readinessScore` | number | Detailed readiness score |
| `roadmap` | string[] | Short roadmap labels |
| `roadmapSteps` | object[] | Detailed roadmap steps |

Example:

```js
{
  id: 'data-analyst',
  roleName: 'Data Analyst',
  matchScore: 92,
  demandLevel: 'High Demand',
  salaryRange: 'RM 4K-7K',
  matchingSkills: ['SQL basics', 'Excel'],
  missingSkills: ['Advanced SQL', 'Power BI'],
  roadmapSteps: [
    { title: 'Strengthen SQL Foundation', status: 'Completed', time: '2-3 weeks' },
  ],
}
```

## Career Path Network Data

| Field | Type | Purpose |
| --- | --- | --- |
| `center` | object | The main YOU node |
| `roles` | object[] | Career role nodes |
| `skills` | object[] | Smaller skill/unlock nodes |
| `edges` | object[] | SVG graph connections |

Role node fields:

| Field | Type | Purpose |
| --- | --- | --- |
| `id` | string | Must match a `careerPaths` item when clickable |
| `label` | string | Node label |
| `matchScore` | number | Displayed match score |
| `category` | string | Used by graph filters |
| `salaryRange` | string | Tooltip detail |
| `position` | object | Fixed `{ x, y }` percentage position |
| `skills` | string[] | Tooltip/top-skill detail |

Edge fields:

| Field | Type | Purpose |
| --- | --- | --- |
| `from` | string | Source node ID |
| `to` | string | Target node ID |
| `type` | string | `strong`, `gap`, or `unlock` |

Example:

```js
{
  center: {
    id: 'you',
    label: 'YOU',
    currentRole: 'Data Analyst',
    matchScore: 92,
    position: { x: 50, y: 50 },
  },
  roles: [
    {
      id: 'data-analyst',
      label: 'Data Analyst',
      matchScore: 92,
      category: 'Tech & Data',
      position: { x: 50, y: 27 },
      skills: ['SQL', 'Excel', 'Data Visualization'],
    },
  ],
  edges: [
    { from: 'you', to: 'data-analyst', type: 'strong' },
  ],
}
```

## Opportunity Data

| Field | Type | Purpose |
| --- | --- | --- |
| `id` | string | Unique opportunity ID |
| `title` | string | Opportunity name |
| `type` | string | Course, Internship, Event, Competition, or Hackathon |
| `matchScore` | number | Candidate-opportunity fit score |
| `description` | string | Short card description |
| `fullDescription` | string | Detail panel description |
| `skills` | string[] | Main skills |
| `requiredSkills` | string[] | Skills needed |
| `existingSkills` | string[] | Candidate strengths |
| `missingSkillsClosed` | string[] | Gaps this opportunity helps close |
| `gapClosed` | string | Main gap category |
| `deadline` / `date` / `duration` | string | Time information |
| `aiExplanation` | string | Mock AI recommendation explanation |
| `expectedEvidence` | string[] | Evidence gained from completing it |
| `ctaLabel` | string | Button label |

Example:

```js
{
  id: 'sql-for-data-analysts',
  title: 'SQL for Data Analysts',
  type: 'Course',
  matchScore: 90,
  skills: ['SQL', 'Database'],
  gapClosed: 'SQL foundation',
  duration: '4 weeks',
  ctaLabel: 'Add to Roadmap',
}
```

## Employer Candidate Data

| Field | Type | Purpose |
| --- | --- | --- |
| `id` | string | Unique candidate ID |
| `name` | string | Candidate name |
| `targetRole` | string | Candidate target role |
| `match` | number | Employer match score |
| `verifiedEvidence` | number | Count of evidence items |
| `topSkills` | string[] | Candidate top skills |

Example:

```js
{
  id: 'cand-001',
  name: 'Alyssa Tan',
  targetRole: 'Product Analyst',
  match: 91,
  verifiedEvidence: 8,
  topSkills: ['Analytics', 'React', 'Data Visualization'],
}
```

## Candidate Insights Data

| Field | Type | Purpose |
| --- | --- | --- |
| `savedCandidatesPipeline` | object | Pipeline columns and candidate cards |
| `validationRequests` | object[] | Skill validation requests |
| `onboardingTracker` | object[] | Hired candidate onboarding progress |
| `pipelineAnalytics` | object | Analytics cards and charts |
| `aiInsight` | object | Mock employer insight and recommendations |

Example:

```js
{
  savedCandidatesPipeline: {
    shortlisted: {
      label: 'Shortlisted',
      count: 18,
      candidates: [{ id: '#1024', match: 92, skills: ['Python', 'SQL'] }],
    },
  },
  validationRequests: [
    { candidate: '#1031', skill: 'SQL', source: 'HackerRank', status: 'Pending' },
  ],
}
```

## Employer Engagement Data

| Field | Type | Purpose |
| --- | --- | --- |
| `selectedRequestId` | string | Default selected club request |
| `proposalDraft` | string | Default proposal copy |
| `clubRequests` | object[] | Club requests employers can respond to |

Example:

```js
{
  selectedRequestId: 'ai-finance-case-competition',
  proposalDraft: "We'd love to support as judges and sponsor the competition.",
  clubRequests: [
    {
      id: 'ai-finance-case-competition',
      title: 'AI in Finance Case Competition',
      needs: ['Judges', 'Sponsor'],
      matchScore: 94,
      status: 'Open',
    },
  ],
}
```

The engagement builder uses a separate object with:

| Field | Type | Purpose |
| --- | --- | --- |
| `selectedType` | string | Default engagement type |
| `engagementTypes` | string[] | Available engagement types |
| `form` | object | Mock form values |
| `preview` | object | Preview card data |

## University Curriculum Data

| Field | Type | Purpose |
| --- | --- | --- |
| `course` | string | Course being analyzed |
| `analysedJobPostings` | number | Mock number of job postings |
| `healthScore` | number | Curriculum alignment score |
| `alignmentStatus` | string | Status label |
| `summary` | string | Short summary |
| `skillsTaught` | string[] | Skills covered in course |
| `skillsDemanded` | string[] | Skills demanded by market |
| `gapHighlights` | object[] | Skill gaps and evidence |
| `aiSuggestions` | object[] | Suggested curriculum changes |
| `alumniOutcomes` | object | Companies and reported gaps |

Example:

```js
{
  course: 'Data Analytics Fundamentals',
  analysedJobPostings: 500,
  healthScore: 78,
  alignmentStatus: 'Moderate Alignment',
  skillsTaught: ['Excel', 'Statistics', 'SQL Basics'],
  skillsDemanded: ['SQL', 'Power BI', 'Python'],
}
```

## University Readiness Data

| Field | Type | Purpose |
| --- | --- | --- |
| `analysedProfiles` | number | Mock number of student profiles |
| `summary` | object[] | Top metric cards |
| `skillGaps` | object[] | Skills missing across students |
| `cohortComparison` | object[] | Readiness by cohort |
| `cohortInsight` | string | Short insight |
| `interventions` | object[] | Recommended actions |
| `drilldown` | object | At-risk student details |
| `keyInsight` | string | Highlighted insight |

Example:

```js
{
  analysedProfiles: 500,
  summary: [
    { id: 'average-readiness', label: 'Average Readiness Score', value: '78' },
  ],
  skillGaps: [
    { skill: 'Cloud Computing', missingPercent: 62, marketDemand: 'High' },
  ],
}
```

## University Marketplace Data

| Field | Type | Purpose |
| --- | --- | --- |
| `filters` | string[] | Event filter chips |
| `selectedEventId` | string | Default selected event |
| `events` | object[] | Club events needing company partners |

Example:

```js
{
  filters: ['All', 'Speaker', 'Judge', 'Sponsor'],
  selectedEventId: 'event_001',
  events: [
    {
      id: 'event_001',
      title: 'AI in Finance Case Competition',
      clubName: 'FinTech Society',
      needs: ['Judges', 'Sponsor'],
      status: 'Open for Partners',
      targetSkills: ['Financial Modeling', 'Python'],
    },
  ],
}
```

Post-event completion uses:

| Field | Type | Purpose |
| --- | --- | --- |
| `completedEvents` | object[] | Events ready for evidence processing |
| `uploadedFile` | object | Mock participant upload preview |
| `skillSuggestionReview` | object[] | AI-suggested skills for review |
| `updateSummary` | object | Processing stats |
| `workflowProgress` | object[] | Completion steps |
| `recentProfileUpdates` | object[] | Recent memory profile updates |
