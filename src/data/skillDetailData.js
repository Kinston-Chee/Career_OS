// Rich detail data for individual skill pages. SQL has fully-authored
// content ported from the reference HTML; every other skill falls back
// to the `deriveDetailFrom(baseSkill)` helper so the page always renders.

import { CAT_META, SKILLS } from './skillDevelopmentData'

// ─── Category → breadcrumb + resource-icon defaults ─────────────────
const CAT_BREADCRUMB = {
  technical: 'Technical skills',
  soft: 'Soft skills',
  domain: 'Domain knowledge',
  cert: 'Certifications',
}

// ─── Rich detail per-skill (add more as you author them) ────────────
export const SKILL_DETAILS = {
  sql: {
    breadcrumbCategory: 'Technical skills',
    hero: {
      eyebrow: 'Technical skills · Data & databases',
      sub: 'Queries, schema design, performance optimisation, and transactions. Required for backend and full-stack engineering roles.',
    },
    // Pie-chart segments — each carries its own target, so the page can
    // colour the slice by severity vs. that target.
    subskillsWithTargets: [
      { name: 'SELECT & JOINs',         pct: 55, target: 65 },
      { name: 'Schema design',          pct: 25, target: 65 },
      { name: 'Indexing & performance', pct: 12, target: 60 },
      { name: 'Transactions & ACID',    pct: 22, target: 55 },
    ],
    stats: {
      yourMastery: 30,
      requiredLevel: 65,
      gapToClose: -35,
      etaLabel: '~3 weeks',
      etaSub: 'At current pace',
      readinessGain: 9,
      largestNote: 'Largest in Technical',
    },
    aiInsight: {
      title: 'Start with Schema Design — it appears in 73% of backend interviews',
      body: "You're furthest behind on schema design (25%). One focused session completing Milestone 3 would close 40% of your total gap and unlock the performance module.",
      primaryCta: 'Jump to Milestone 3',
      ghostCta: 'Ask AI companion',
    },
    milestones: [
      {
        id: 0,
        title: 'SQL fundamentals',
        xp: '+6 pts',
        type: 'Course',
        typeIcon: 'video',
        status: 'done',
        desc: 'Master the core DML commands: SELECT, INSERT, UPDATE, DELETE. Build the foundation every other milestone depends on.',
        groups: [
          {
            title: 'Data Definition Language (DDL)',
            icon: 'table',
            tasks: [
              { title: 'Learn CREATE TABLE — columns, types, constraints', done: true, mins: 20, chip: 'read' },
              { title: 'Practice ALTER TABLE — adding and modifying columns', done: true, mins: 15, chip: 'practice' },
              { title: 'Understand DROP vs TRUNCATE vs DELETE', done: true, mins: 10, chip: 'read' },
            ],
          },
          {
            title: 'Data Manipulation Language (DML)',
            icon: 'file',
            tasks: [
              { title: 'Use SELECT with WHERE, ORDER BY, LIMIT', done: true, mins: 25, chip: 'practice' },
              { title: 'Write INSERT statements — single and bulk', done: true, mins: 15, chip: 'practice' },
              { title: 'Use UPDATE with WHERE clauses safely', done: true, mins: 15, chip: 'practice' },
              { title: 'Use DELETE with conditions to avoid full-table wipe', done: true, mins: 10, chip: 'practice' },
            ],
          },
        ],
      },
      {
        id: 1,
        title: 'Write 10 complex JOIN queries',
        xp: '+8 pts',
        type: 'Practice',
        typeIcon: 'laptop',
        status: 'active',
        desc: 'Move beyond single-table queries. Master every JOIN type and use them on real datasets.',
        groups: [
          {
            title: 'JOIN types',
            icon: 'merge',
            tasks: [
              { title: 'Write an INNER JOIN across two tables', done: true, mins: 15, chip: 'practice' },
              { title: 'Write a LEFT JOIN and explain the NULL rows', done: true, mins: 15, chip: 'practice' },
              { title: 'Write a RIGHT JOIN query', done: false, mins: 10, chip: 'practice' },
              { title: 'Write a FULL OUTER JOIN and interpret results', done: false, mins: 15, chip: 'practice' },
              { title: 'Write a SELF JOIN on an employees table', done: false, mins: 20, chip: 'practice' },
            ],
          },
          {
            title: 'Advanced querying',
            icon: 'code',
            tasks: [
              { title: 'Use GROUP BY with HAVING to filter aggregates', done: false, mins: 20, chip: 'practice' },
              { title: 'Write a correlated subquery', done: false, mins: 25, chip: 'practice' },
              { title: 'Use window functions: ROW_NUMBER, RANK, LAG', done: false, mins: 30, chip: 'read' },
            ],
          },
        ],
      },
      {
        id: 2,
        title: 'Design a normalised database schema',
        xp: '+10 pts',
        type: 'Project',
        typeIcon: 'layout',
        status: 'locked',
        desc: 'Model a real-world domain from scratch. Apply normalisation and document all relationships with an ER diagram.',
        groups: [
          {
            title: 'Normalisation',
            icon: 'network',
            tasks: [
              { title: 'Understand 1NF — eliminate repeating groups', done: false, mins: 20, chip: 'read' },
              { title: 'Apply 2NF — remove partial dependencies', done: false, mins: 20, chip: 'read' },
              { title: 'Apply 3NF — remove transitive dependencies', done: false, mins: 20, chip: 'read' },
            ],
          },
          {
            title: 'Schema project',
            icon: 'wrench',
            tasks: [
              { title: 'Draw an ER diagram for an e-commerce system', done: false, mins: 40, chip: 'practice' },
              { title: 'Implement the schema in PostgreSQL', done: false, mins: 30, chip: 'practice' },
              { title: 'Add FK constraints and test referential integrity', done: false, mins: 20, chip: 'practice' },
              { title: 'Log your schema as a project in Career Memory', done: false, mins: 5, chip: 'practice' },
            ],
          },
        ],
      },
      {
        id: 3,
        title: 'Optimise a slow query using EXPLAIN',
        xp: '+12 pts',
        type: 'Project',
        typeIcon: 'zap',
        status: 'locked',
        desc: 'Take a full-table-scan query, identify the bottleneck, add appropriate indexes, and reduce execution cost by 80%.',
        groups: [
          {
            title: 'Understanding query plans',
            icon: 'search',
            tasks: [
              { title: 'Run EXPLAIN on a slow query and read the output', done: false, mins: 20, chip: 'practice' },
              { title: 'Identify Seq Scan vs Index Scan in the plan', done: false, mins: 15, chip: 'read' },
              { title: 'Understand cost estimates and row counts', done: false, mins: 15, chip: 'read' },
            ],
          },
          {
            title: 'Indexing in practice',
            icon: 'database',
            tasks: [
              { title: 'Create a B-tree index on a high-cardinality column', done: false, mins: 20, chip: 'practice' },
              { title: 'Create a composite index and verify it is used', done: false, mins: 20, chip: 'practice' },
              { title: 'Measure before/after execution time with EXPLAIN ANALYZE', done: false, mins: 15, chip: 'practice' },
            ],
          },
        ],
      },
      {
        id: 4,
        title: 'SQL technical interview simulation',
        xp: '+15 pts',
        type: 'Assessment',
        typeIcon: 'user-check',
        status: 'locked',
        desc: 'A 60-minute timed mock interview with live SQL questions. Graded by AI against a FAANG-level rubric.',
        groups: [
          {
            title: 'Preparation checklist',
            icon: 'checklist',
            tasks: [
              { title: 'Revise all JOIN types and practice under 2-min time limit', done: false, mins: 30, chip: 'practice' },
              { title: 'Practice explaining your schema design decisions aloud', done: false, mins: 20, chip: 'practice' },
              { title: 'Do one timed LeetCode SQL problem set (Hard difficulty)', done: false, mins: 60, chip: 'practice' },
              { title: 'Book the AI mock interview session', done: false, mins: 5, chip: 'practice' },
            ],
          },
        ],
      },
    ],
    resources: {
      books: [
        { icon: 'book', tint: 'amber', title: 'Learning SQL — Alan Beaulieu', meta: 'Comprehensive SQL from basics to advanced. Covers all major DB systems.', chips: [{ label: '~RM 90', tone: 'paid' }, { label: '~10 hrs', tone: 'hrs' }], xp: '+12 pts' },
        { icon: 'book', tint: 'emerald', title: 'Use The Index, Luke', meta: 'Free online guide dedicated entirely to SQL indexing and query performance.', chips: [{ label: 'Free', tone: 'free' }, { label: '~4 hrs', tone: 'hrs' }], xp: '+10 pts' },
      ],
      videos: [
        { icon: 'youtube', tint: 'rose', title: 'SQL Tutorial — freeCodeCamp', meta: '4-hour full SQL course on YouTube covering SELECT through advanced JOINs.', chips: [{ label: 'Free', tone: 'free' }, { label: '4 hrs', tone: 'hrs' }], xp: '+8 pts' },
        { icon: 'youtube', tint: 'rose', title: 'Database Design Course — freeCodeCamp', meta: '8-hour deep dive into schema design, ER diagrams, and normalisation.', chips: [{ label: 'Free', tone: 'free' }, { label: '8 hrs', tone: 'hrs' }], xp: '+14 pts' },
      ],
      courses: [
        { icon: 'school', tint: 'amber', title: 'Mode Analytics SQL Tutorial', meta: 'Interactive, browser-based SQL from beginner to window functions.', chips: [{ label: 'Free', tone: 'free' }, { label: '~3 hrs', tone: 'hrs' }], xp: '+8 pts' },
        { icon: 'laptop', tint: 'indigo', title: 'SQLZoo Practice Problems', meta: 'Graded interactive problems across all SQL topics. Great for milestone 2.', chips: [{ label: 'Free', tone: 'free' }, { label: 'Self-paced', tone: 'hrs' }], xp: '+6 pts' },
        { icon: 'school', tint: 'purple', title: 'Stanford DB5: SQL (edX)', meta: 'University-level SQL with graded assignments. Auditable for free.', chips: [{ label: 'Free audit', tone: 'free' }, { label: '~8 hrs', tone: 'hrs' }, { label: 'Certificate', tone: 'cert' }], xp: '+20 pts' },
      ],
      articles: [
        { icon: 'article', tint: 'indigo', title: 'SQL Indexing Best Practices', meta: 'Practical Developers · Covers B-tree, hash, and partial indexes with examples.', chips: [{ label: 'Free', tone: 'free' }, { label: '~20 min', tone: 'hrs' }], xp: '+3 pts' },
        { icon: 'article', tint: 'indigo', title: 'A Visual Explanation of SQL JOINs', meta: 'Coding Horror · The classic visual reference for JOIN types.', chips: [{ label: 'Free', tone: 'free' }, { label: '~10 min', tone: 'hrs' }], xp: '+2 pts' },
      ],
      certs: [
        { icon: 'certificate', tint: 'purple', title: 'Oracle Database SQL Certified Associate', meta: 'Industry-recognised SQL certification. Exam: 1Z0-071. ~120 USD.', chips: [{ label: '~RM 560', tone: 'paid' }, { label: '~20 hrs prep', tone: 'hrs' }, { label: 'Official cert', tone: 'cert' }], xp: '+40 pts' },
      ],
    },
    readinessNudge: {
      current: 68,
      after: 77,
      body: 'Closing this gap moves you from **68%** to **77%** ready — unlocking mid-level backend roles on the Opportunities page.',
    },
  },
}

// ─── Fallback derivation for skills without hand-authored detail ────
export function deriveDetailFromSkill(skill) {
  if (!skill) return null

  // Break subskills into targets. When we don't have per-subskill targets
  // we anchor each one to the skill's overall required level so severity
  // still colours realistically.
  const subskillsWithTargets = skill.subskills.map((ss) => ({
    name: ss.n,
    pct: ss.p,
    target: Math.round(skill.required * 0.95),
  }))

  const gap = skill.pct - skill.required

  // Milestones → wrap each existing milestone as its own single-task group.
  const milestones = skill.milestones.map((m, index) => {
    let status = 'locked'
    if (m.done) status = 'done'
    else if (index === skill.milestones.findIndex((x) => !x.done)) status = 'active'
    return {
      id: index,
      title: m.t,
      xp: (m.xp?.startsWith('+') ? m.xp : `+${m.xp ?? '0'}`) + ' pts',
      type: 'Milestone',
      typeIcon: 'target',
      status,
      desc: m.t,
      groups: [
        {
          title: 'Complete this milestone',
          icon: 'checklist',
          tasks: [{ title: m.t, done: m.done, mins: 30, chip: 'practice' }],
        },
      ],
    }
  })

  // Resources — bucket the base skill's resources by their icon.
  const RESOURCE_BUCKET = {
    book: 'books',
    video: 'videos',
    laptop: 'courses',
    school: 'courses',
    code: 'courses',
    atom: 'courses',
    certificate: 'certs',
    globe: 'courses',
    mic: 'articles',
  }
  const buckets = { books: [], videos: [], courses: [], articles: [], certs: [] }
  skill.resources.forEach((r) => {
    const cat = RESOURCE_BUCKET[r.icon] ?? 'articles'
    buckets[cat].push({
      icon: r.icon,
      tint: 'indigo',
      title: r.t,
      meta: r.meta,
      chips: [{ label: 'Learn', tone: 'hrs' }],
      xp: r.xp,
    })
  })

  return {
    breadcrumbCategory: CAT_BREADCRUMB[skill.cat] ?? 'Skills',
    hero: {
      eyebrow: `${skill.catLabel} · ${skill.sub}`,
      sub: skill.sub,
    },
    subskillsWithTargets,
    stats: {
      yourMastery: skill.pct,
      requiredLevel: skill.required,
      gapToClose: gap,
      etaLabel: skill.eta,
      etaSub: skill.status === 'done' ? 'Keep it warm' : 'At current pace',
      readinessGain: Math.max(0, Math.round(Math.abs(gap) / 3.5)),
      largestNote: skill.status === 'gap' ? 'Below threshold' : skill.status === 'done' ? 'Above threshold' : 'On track',
    },
    aiInsight: {
      title: skill.status === 'gap'
        ? `Focus on ${skill.name} — biggest ${skill.catLabel.toLowerCase()} gap on your list`
        : `Keep ${skill.name} warm and share the story`,
      body: skill.status === 'gap'
        ? `Your current mastery is ${skill.pct}% against a target of ${skill.required}%. Close this gap by finishing the active milestone — it unlocks the next module.`
        : `You're already meeting the target here (${skill.pct}% vs ${skill.required}%). Log new evidence or mentor someone to keep the signal strong.`,
      primaryCta: 'Open next milestone',
      ghostCta: 'Ask AI companion',
    },
    milestones,
    resources: buckets,
    readinessNudge: {
      current: 68,
      after: gap < 0 ? Math.min(100, 68 + Math.round(Math.abs(gap) / 4)) : 72,
      body: gap < 0
        ? `Closing this gap moves you from **68%** to **${Math.min(100, 68 + Math.round(Math.abs(gap) / 4))}%** ready.`
        : `Deepening this strength maintains your **68%** readiness and unlocks stretch roles.`,
    },
  }
}

// Primary lookup — returns rich detail if we've written it, otherwise
// falls back to the derived shape so every skill has a working page.
export function getSkillDetail(skillId) {
  const skill = SKILLS.find((s) => s.id === skillId)
  if (!skill) return null
  const authored = SKILL_DETAILS[skillId]
  const base = deriveDetailFromSkill(skill)
  return {
    skill,
    detail: authored ? { ...base, ...authored } : base,
    categoryMeta: CAT_META[skill.cat],
  }
}
