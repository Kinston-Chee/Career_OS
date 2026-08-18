import { BarChart3, Briefcase, Cpu } from 'lucide-react'

// ── Mock session history ─────────────────────────────────────────────────────
// Shared by the Interview Practice dashboard and the session review page.
export const SESSIONS = [
  {
    id: 1,
    role: 'Software Engineer',
    company: 'Google',
    date: '18 Jul 2026',
    score: 91,
    pass: true,
    duration: '12 min',
    tone: 'Formal',
    persona: 'Tech Lead',
    lang: 'English',
    diff: 'Advanced',
    Icon: Briefcase,
    iconBg: 'rgba(91,108,249,.2)',
    iconColor: '#818CF8',
    stripe: '#5B6CF9',
    skills: { confidence: 88, intro: 84, vocab: 76, story: 72 },
    feedback: {
      strengths:
        'Clear problem decomposition and confident delivery on system design questions. Strong technical vocabulary throughout the session.',
      improvements:
        'Struggled when requirements were ambiguous. Practice narrowing scope and confirming assumptions before diving into solutions.',
      grammar:
        'Strong throughout. Minor tense inconsistency when describing past projects — watch for mixing past and present tense in the same answer.',
    },
  },
  {
    id: 2,
    role: 'ML Engineer',
    company: 'ByteDance',
    date: '15 Jul 2026',
    score: 74,
    pass: true,
    duration: '9 min',
    tone: 'Stress test',
    persona: 'Hiring Manager',
    lang: 'English',
    diff: 'Intermediate',
    Icon: Cpu,
    iconBg: 'rgba(168,85,247,.2)',
    iconColor: '#C084FC',
    stripe: '#A855F7',
    skills: { confidence: 70, intro: 65, vocab: 80, story: 55 },
    feedback: {
      strengths:
        'Good technical vocabulary and stayed calm under pressure. Showed self-awareness when acknowledging knowledge gaps.',
      improvements:
        'Answers were too long. Aim for the STAR format to keep responses under 2 minutes. Practice trimming filler before the key point.',
      grammar:
        "A few filler words ('um', 'like'). Overall fluent and coherent — the structure breaks down slightly under time pressure.",
    },
  },
  {
    id: 3,
    role: 'Data Analyst',
    company: 'Grab',
    date: '10 Jul 2026',
    score: 58,
    pass: false,
    duration: '8 min',
    tone: 'Challenging',
    persona: 'C-suite exec',
    lang: 'English',
    diff: 'Advanced',
    Icon: BarChart3,
    iconBg: 'rgba(245,158,11,.2)',
    iconColor: '#FCD34D',
    stripe: '#F59E0B',
    skills: { confidence: 52, intro: 60, vocab: 48, story: 38 },
    feedback: {
      strengths:
        'Honest about knowledge gaps — a positive professional trait. Willing to admit uncertainty rather than bluff through an answer.',
      improvements:
        "Needed far more specific examples. Quantify your impact: 'reduced churn by 12%' lands better than 'helped with retention'.",
      grammar:
        "Sentence structure breaks down under pressure. Slow down, finish your thoughts, and avoid starting sentences without knowing how they'll end.",
    },
  },
]

// ── Reviewed transcripts ─────────────────────────────────────────────────────
// The full conversation from each mock interview. Every candidate answer
// carries the feedback shown underneath it in the review view:
//   verdict  'highlight' | 'mixed' | 'mistake'
//   points   what worked (+) and what cost marks (−)
//   rewrite  a stronger way to say the same thing
export const SESSION_TRANSCRIPTS = {
  1: {
    interviewer: 'Alex (Tech Lead, Google)',
    summary: 'Four exchanges. Two standout answers, one that drifted when the question turned ambiguous.',
    messages: [
      { role: 'ai', ts: '14:02', text: "Good afternoon, Chris. I'm Alex, a Tech Lead at Google. Before we dive in, could you introduce yourself and walk me through your background?" },
      {
        role: 'user',
        ts: '14:02',
        text: "Of course. I'm Chris Lee, a final-year Computer Science student. I've been building full-stack applications for the past two years, most recently a career intelligence platform with FastAPI and React, integrating AI pipelines using Google's agent toolkit.",
        feedback: {
          verdict: 'highlight',
          score: '9.0 / 10',
          headline: 'Tight, specific opener that named real technology.',
          points: [
            { type: 'plus', text: 'Answered in under 30 seconds — the right length for an opener.' },
            { type: 'plus', text: 'Named concrete stack (FastAPI, React, agent toolkit) instead of "various technologies".' },
            { type: 'minus', text: 'No outcome attached. One number would have made it land harder.' },
          ],
          rewrite: '…a career intelligence platform with FastAPI and React that now handles 400+ candidate profiles.',
        },
      },
      { role: 'ai', ts: '14:04', text: 'Interesting. You mentioned AI pipelines — describe a specific technical challenge you faced integrating the multi-agent architecture, and how you resolved it.' },
      {
        role: 'user',
        ts: '14:05',
        text: "Sure. The main challenge was managing session state across multiple agents. The runner doesn't persist context between calls by default, so I implemented a DatabaseSessionService with PostgreSQL and pgvector to anchor agent memory across turns.",
        feedback: {
          verdict: 'highlight',
          score: '9.5 / 10',
          headline: 'Textbook problem → constraint → solution structure.',
          points: [
            { type: 'plus', text: 'Stated the constraint before the fix, so the decision made sense.' },
            { type: 'plus', text: 'Precise vocabulary — the interviewer could follow without asking for clarification.' },
            { type: 'plus', text: 'Owned the work in first person ("I implemented") without overclaiming the team\'s work.' },
          ],
          rewrite: null,
        },
      },
      { role: 'ai', ts: '14:07', text: 'How did you handle concurrency when multiple users triggered agents simultaneously? And what was your approach to rate limiting on the LLM side?' },
      {
        role: 'user',
        ts: '14:08',
        text: "We put each user's session behind an asyncio semaphore so simultaneous turns queue rather than trample state, and used a token-bucket limiter per API key to stay under the provider's rate ceiling — with exponential backoff on 429s.",
        feedback: {
          verdict: 'highlight',
          score: '9.0 / 10',
          headline: 'Answered both halves of a two-part question — most candidates drop one.',
          points: [
            { type: 'plus', text: 'Covered concurrency and rate limiting explicitly, in that order.' },
            { type: 'minus', text: 'Switched from "I" to "we" here. Be clear which part you built yourself.' },
          ],
          rewrite: 'I put each session behind an asyncio semaphore, and I added a token-bucket limiter per API key…',
        },
      },
      { role: 'ai', ts: '14:10', text: 'Last one — walk me through a time you made a technical decision under real ambiguity. What was the tradeoff, and how did you defend it?' },
      {
        role: 'user',
        ts: '14:11',
        text: "Hmm, that's a good question. I guess there were a few times... we weren't sure whether to use a vector database or just keep everything in Postgres, and we kind of tried both and went with whatever worked at the time.",
        feedback: {
          verdict: 'mistake',
          score: '4.5 / 10',
          headline: 'The one answer that cost you marks — no decision, no tradeoff, no defence.',
          points: [
            { type: 'minus', text: '"I guess", "kind of", "whatever worked" signalled you had no reasoning to offer.' },
            { type: 'minus', text: 'The question asked for a tradeoff. You never named what you gave up.' },
            { type: 'minus', text: 'Filler opening ("that\'s a good question") bought time but read as stalling.' },
          ],
          rewrite: 'We had to choose between pgvector and a dedicated vector DB before we knew our query volume. I chose pgvector to keep one datastore and avoid operational overhead, accepting slower ANN search above ~1M vectors — with a documented migration path if we crossed that line.',
        },
      },
      { role: 'ai', ts: '14:12', text: "That's all I had. Thanks for your time, Chris — we'll follow up with next steps." },
    ],
  },
  2: {
    interviewer: 'Priya (Hiring Manager, ByteDance)',
    summary: 'Strong vocabulary under stress. Length was the recurring problem — three answers ran past two minutes.',
    messages: [
      { role: 'ai', ts: '10:15', text: "Hi Chris, I'm Priya, Hiring Manager for the recommendation team. Let's move quickly today. Tell me about a model you've shipped end to end." },
      {
        role: 'user',
        ts: '10:16',
        text: "So, um, I built a resume parser using a fine-tuned transformer, and it started as a class project, and then I extended it, and there was a lot of data cleaning involved because the PDFs were messy, and I also had to handle different layouts, and eventually I deployed it with FastAPI, and it worked reasonably well I think.",
        feedback: {
          verdict: 'mistake',
          score: '5.0 / 10',
          headline: 'One long chain of "and" — the result got buried at the end.',
          points: [
            { type: 'minus', text: 'Six clauses joined by "and". The interviewer lost the thread before the outcome.' },
            { type: 'minus', text: '"Worked reasonably well I think" undersold a real result. Give the metric.' },
            { type: 'plus', text: 'Did name a real, shipped project rather than a hypothetical.' },
          ],
          rewrite: 'I shipped a resume parser built on a fine-tuned transformer. The hard part was layout variance across PDFs — I normalised them first, which took extraction accuracy from 71% to 89%. It runs behind FastAPI today.',
        },
      },
      { role: 'ai', ts: '10:18', text: 'How did you evaluate it? Be specific about the metric and why you picked it.' },
      {
        role: 'user',
        ts: '10:19',
        text: 'I used F1 on a held-out set of 200 manually labelled resumes. Accuracy alone was misleading because the field classes were imbalanced — most tokens are not entities, so a model predicting "none" everywhere would still score high.',
        feedback: {
          verdict: 'highlight',
          score: '9.0 / 10',
          headline: 'Best answer of the session — picked a metric and justified it.',
          points: [
            { type: 'plus', text: 'Explained why F1 over accuracy, which is exactly what the question tested.' },
            { type: 'plus', text: 'Gave the eval set size, showing you actually ran the evaluation.' },
          ],
          rewrite: null,
        },
      },
      { role: 'ai', ts: '10:21', text: "Suppose the model performs well offline but degrades in production. What's your first move?" },
      {
        role: 'user',
        ts: '10:22',
        text: "I'd, like, check the data first. Probably there's drift, or maybe the preprocessing is different in production, or it could be a version mismatch. I'd look at all of those and see which one it is. Honestly I haven't hit this in production before, so I'd be learning as I go.",
        feedback: {
          verdict: 'mixed',
          score: '6.5 / 10',
          headline: 'Right instincts, but listed possibilities instead of committing to an order.',
          points: [
            { type: 'plus', text: 'Naming train/serve skew and drift shows you know the failure modes.' },
            { type: 'plus', text: 'Admitting the gap honestly is better than bluffing — the interviewer noted it positively.' },
            { type: 'minus', text: 'No prioritisation. "I\'d look at all of those" reads as no plan.' },
            { type: 'minus', text: 'Fillers ("like", "honestly") weakened an otherwise reasonable answer.' },
          ],
          rewrite: "First I'd compare the production feature distribution against training — train/serve skew explains most sudden drops. If they match, I'd check preprocessing parity, then model version. I haven't debugged this in production yet, but that's the order I'd work in.",
        },
      },
      { role: 'ai', ts: '10:24', text: "Thanks Chris. That's time — we'll be in touch." },
    ],
  },
  3: {
    interviewer: 'Daniel (C-suite exec, Grab)',
    summary: 'Answers stayed abstract. Every question wanted a number, and none of them got one.',
    messages: [
      { role: 'ai', ts: '16:30', text: "Chris, good to meet you. I'll be direct — I care about impact. Tell me about an analysis you ran that changed a decision." },
      {
        role: 'user',
        ts: '16:31',
        text: 'I worked on a dashboard for a retail dataset that helped the team understand customer retention better, and I think it was useful for them when they were planning campaigns.',
        feedback: {
          verdict: 'mistake',
          score: '3.5 / 10',
          headline: 'No decision named, no impact quantified — the exact thing the question asked for.',
          points: [
            { type: 'minus', text: '"Helped them understand better" is unmeasurable. What changed as a result?' },
            { type: 'minus', text: '"I think it was useful" hands your own credibility away.' },
            { type: 'minus', text: 'No numbers anywhere — with a C-suite interviewer, numbers are the language.' },
          ],
          rewrite: 'I segmented customers by repeat-purchase interval and found 60% of churn happened within 30 days of first purchase. The team moved their win-back campaign from day 45 to day 21, and repeat rate rose 12% the following quarter.',
        },
      },
      { role: 'ai', ts: '16:33', text: 'What was the size of the effect? Give me a number.' },
      {
        role: 'user',
        ts: '16:34',
        text: "I don't have the exact figure with me, sorry. It was a noticeable improvement though — the team seemed happy with it.",
        feedback: {
          verdict: 'mistake',
          score: '3.0 / 10',
          headline: 'A direct request for a number went unanswered.',
          points: [
            { type: 'minus', text: 'Rehearse the two or three numbers from every project you list on your CV.' },
            { type: 'minus', text: '"The team seemed happy" substitutes sentiment for evidence.' },
            { type: 'plus', text: 'You did not invent a figure — bluffing would have been worse.' },
          ],
          rewrite: "Repeat purchase rate moved from 18% to 20% over the quarter. I can't attribute all of that to the dashboard, but it was the input the campaign change was built on.",
        },
      },
      { role: 'ai', ts: '16:36', text: 'How do you decide which metric matters when the business asks for everything?' },
      {
        role: 'user',
        ts: '16:37',
        text: 'I would ask stakeholders what they need and then try to prioritise based on, um, what seems most important to the business at that time, and then build from there I suppose.',
        feedback: {
          verdict: 'mixed',
          score: '5.0 / 10',
          headline: 'Correct instinct — ask the stakeholder — but the sentence fell apart halfway.',
          points: [
            { type: 'plus', text: 'Starting from the stakeholder rather than the data is the right instinct.' },
            { type: 'minus', text: 'Sentence lost structure mid-way; slow down and finish the thought.' },
            { type: 'minus', text: 'No framework named. One would have carried the answer.' },
          ],
          rewrite: "I'd tie every request back to one primary metric the team is accountable for, then treat the rest as diagnostics that explain movement in it. If two requests both claim to be primary, that's a conversation to have before any analysis starts.",
        },
      },
      { role: 'ai', ts: '16:39', text: "Understood. Thanks for coming in, Chris — we'll let you know." },
    ],
  },
}

export function getSessionReview(sessionId) {
  const id = Number(sessionId)
  const session = SESSIONS.find((s) => s.id === id)
  if (!session) return null
  return { session, transcript: SESSION_TRANSCRIPTS[id] ?? null }
}
