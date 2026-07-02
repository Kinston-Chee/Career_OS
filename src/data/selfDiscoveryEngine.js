/**
 * CareerOS Self-Discovery Behavioural Engine
 *
 * Architecture:
 * - 11 hidden behavioural dimensions scored 0–100
 * - 12 Career Animals across 3 categories, mapped from dimension combinations
 * - Assessment scores dimensions → engine selects primary + emerging animal
 * - Career Memory integration stubs for future evolution
 *
 * Philosophy: The animal is a friendly visualization of the AI's CURRENT
 * understanding. It is never a permanent label.
 */

// ---------------------------------------------------------------------------
// Behavioural Dimensions
// ---------------------------------------------------------------------------

export const DIMENSIONS = [
  'ownership',
  'leadership',
  'analyticalThinking',
  'communication',
  'execution',
  'creativity',
  'adaptability',
  'learningAgility',
  'curiosity',
  'collaboration',
  'decisionMaking',
]

export function createEmptyDimensions() {
  const d = {}
  DIMENSIONS.forEach((dim) => { d[dim] = 0 })
  return d
}

// ---------------------------------------------------------------------------
// Career Animals — 12 animals × 3 categories
// ---------------------------------------------------------------------------

export const ANIMAL_CATEGORIES = {
  leadership: { label: 'Leadership', color: 'amber', description: 'How you guide and influence' },
  relational: { label: 'Relational', color: 'blue', description: 'How you connect and communicate' },
  execution:  { label: 'Execution', color: 'emerald', description: 'How you build and deliver' },
}

export const ANIMALS = [
  // ── Leadership ──────────────────────────────────────────────────────────
  {
    id: 'lion',
    name: 'Lion',
    emoji: '🦁',
    archetype: 'The Commander',
    category: 'leadership',
    coreDimensions: ['ownership', 'decisionMaking', 'leadership'],
    personality: 'Takes charge instinctively. Comfortable with authority and decisive under pressure. Moves the team forward when nobody else will.',
    strengths: ['Natural authority', 'Decisive under pressure', 'Drives results through ownership'],
    growthAreas: ['Listening before deciding', 'Delegating instead of controlling', 'Patience with slower processes'],
    preferredEnvironment: 'High-stakes environments where someone needs to step up and make the call. Startups, leadership roles, crisis management.',
    suggestedRoles: ['Product Manager', 'Startup Founder', 'Project Lead', 'Operations Manager'],
    shortSummary: 'You naturally take charge and make decisive calls when the team needs direction.',
  },
  {
    id: 'eagle',
    name: 'Eagle',
    emoji: '🦅',
    archetype: 'The Visionary',
    category: 'leadership',
    coreDimensions: ['creativity', 'curiosity', 'leadership'],
    personality: 'Sees the big picture when others are stuck in details. Thinks three steps ahead. Inspires through a compelling sense of where things should go.',
    strengths: ['Big-picture thinking', 'Strategic foresight', 'Inspiring vision'],
    growthAreas: ['Following through on details', 'Grounding ideas in practical constraints', 'Being patient with incremental progress'],
    preferredEnvironment: 'Innovation-driven teams where long-term thinking is valued. Strategy roles, R&D, product vision.',
    suggestedRoles: ['Strategy Consultant', 'UX Researcher', 'Product Strategist', 'Innovation Lead'],
    shortSummary: 'You see the big picture and inspire others with a compelling sense of where things should go.',
  },
  {
    id: 'wolf',
    name: 'Wolf',
    emoji: '🐺',
    archetype: 'The Pack Leader',
    category: 'leadership',
    coreDimensions: ['collaboration', 'leadership', 'communication'],
    personality: 'Leads by earning trust, not demanding it. Protective of the team. Balances group needs with forward momentum.',
    strengths: ['Building trust', 'Team cohesion', 'Leading through influence'],
    growthAreas: ['Making tough calls that disappoint team members', 'Prioritising speed over consensus', 'Comfortable with individual spotlight'],
    preferredEnvironment: 'Team-centric cultures where leadership means serving others. Cross-functional teams, community projects, collaborative startups.',
    suggestedRoles: ['Team Lead', 'Scrum Master', 'Community Manager', 'People Operations'],
    shortSummary: 'You lead by earning trust and bringing the pack together toward a shared goal.',
  },
  {
    id: 'owl',
    name: 'Owl',
    emoji: '🦉',
    archetype: 'The Scholar',
    category: 'leadership',
    coreDimensions: ['analyticalThinking', 'learningAgility', 'curiosity'],
    personality: 'Thinks deeply before acting. Values precision and evidence. The person everyone turns to when the problem requires real understanding.',
    strengths: ['Deep analysis', 'Knowledge synthesis', 'Thoughtful decision-making'],
    growthAreas: ['Acting before having complete information', 'Communicating insights in simple terms', 'Balancing depth with speed'],
    preferredEnvironment: 'Research-heavy or data-driven environments where thoroughness is rewarded. Analytics, academia, technical architecture.',
    suggestedRoles: ['Data Scientist', 'Research Analyst', 'Technical Architect', 'Policy Analyst'],
    shortSummary: 'You think deeply and methodically, becoming the person everyone turns to for real understanding.',
  },

  // ── Relational ──────────────────────────────────────────────────────────
  {
    id: 'dolphin',
    name: 'Dolphin',
    emoji: '🐬',
    archetype: 'The Connector',
    category: 'relational',
    coreDimensions: ['communication', 'collaboration', 'adaptability'],
    personality: 'Natural bridge-builder. Reads social dynamics effortlessly. Brings the right people together at the right time.',
    strengths: ['Networking naturally', 'Reading social dynamics', 'Building bridges across teams'],
    growthAreas: ['Setting personal boundaries', 'Working independently for extended periods', 'Saying no to social requests'],
    preferredEnvironment: 'Collaborative, people-rich environments with frequent interaction. Client-facing roles, partnerships, business development.',
    suggestedRoles: ['Business Development', 'Client Relations', 'Partnership Manager', 'Event Coordinator'],
    shortSummary: 'You naturally bring people together and read social dynamics with ease.',
  },
  {
    id: 'peacock',
    name: 'Peacock',
    emoji: '🦚',
    archetype: 'The Performer',
    category: 'relational',
    coreDimensions: ['communication', 'creativity', 'adaptability'],
    personality: 'Thrives when presenting, pitching, and persuading. Expressive and confident. Makes complex ideas accessible and exciting.',
    strengths: ['Persuasive communication', 'Public speaking', 'Making ideas come alive'],
    growthAreas: ['Deep technical work in isolation', 'Listening as much as presenting', 'Comfort with behind-the-scenes roles'],
    preferredEnvironment: 'Presentation-heavy, client-facing, or marketing environments. Roles where communication is the product.',
    suggestedRoles: ['Marketing Strategist', 'Sales Executive', 'Content Creator', 'Public Relations'],
    shortSummary: 'You thrive in the spotlight, making complex ideas accessible and exciting for any audience.',
  },
  {
    id: 'elephant',
    name: 'Elephant',
    emoji: '🐘',
    archetype: 'The Mentor',
    category: 'relational',
    coreDimensions: ['collaboration', 'communication', 'learningAgility'],
    personality: 'Patient, thoughtful, nurturing. Remembers what people need and follows through. The person juniors seek out when they feel lost.',
    strengths: ['Patience and empathy', 'Developing others', 'Building lasting relationships'],
    growthAreas: ['Prioritising own growth alongside others', 'Being direct with critical feedback', 'Moving faster in competitive environments'],
    preferredEnvironment: 'Organisations that value coaching, mentorship, and long-term development. Education, HR, team development.',
    suggestedRoles: ['HR Specialist', 'Training & Development', 'Teaching Assistant', 'Customer Success'],
    shortSummary: 'You nurture others with patience and thoughtfulness, becoming the person everyone seeks for guidance.',
  },
  {
    id: 'horse',
    name: 'Horse',
    emoji: '🐴',
    archetype: 'The Loyalist',
    category: 'relational',
    coreDimensions: ['execution', 'collaboration', 'ownership'],
    personality: "Steady, reliable, deeply committed. Not the loudest voice, but the backbone of every team. Shows up, delivers, and never lets people down.",
    strengths: ['Reliability', 'Consistent delivery', 'Quiet dedication'],
    growthAreas: ['Speaking up more in group settings', 'Advocating for own contributions', 'Taking more visible leadership roles'],
    preferredEnvironment: 'Stable, trust-based teams where consistency is valued. Long-term projects, operational roles, quality assurance.',
    suggestedRoles: ['Quality Assurance', 'Operations Analyst', 'Project Coordinator', 'Reliability Engineer'],
    shortSummary: 'You show up, deliver, and never let people down — the quiet backbone of every team.',
  },

  // ── Execution ───────────────────────────────────────────────────────────
  {
    id: 'ant',
    name: 'Ant',
    emoji: '🐜',
    archetype: 'The Architect',
    category: 'execution',
    coreDimensions: ['analyticalThinking', 'execution', 'ownership'],
    personality: 'Systematic and methodical. Plans carefully, builds precisely. Creates order from chaos and takes pride in the structure.',
    strengths: ['Systematic planning', 'Attention to detail', 'Creating reliable systems'],
    growthAreas: ['Embracing ambiguity', 'Moving forward without a complete plan', 'Flexibility when plans change'],
    preferredEnvironment: 'Structured environments where precision matters. Engineering, architecture, systems design, infrastructure.',
    suggestedRoles: ['Software Engineer', 'Systems Architect', 'Data Engineer', 'Infrastructure Specialist'],
    shortSummary: 'You plan carefully and build precisely, creating order from chaos with pride in every detail.',
  },
  {
    id: 'cheetah',
    name: 'Cheetah',
    emoji: '🐆',
    archetype: 'The Sprinter',
    category: 'execution',
    coreDimensions: ['execution', 'decisionMaking', 'adaptability'],
    personality: "Moves fast, iterates faster. Thrives under tight deadlines. Would rather ship something imperfect today than something perfect next month.",
    strengths: ['Speed of execution', 'Thriving under pressure', 'Rapid iteration'],
    growthAreas: ['Slowing down for quality when needed', 'Long-term strategic thinking', 'Patience with slow-moving processes'],
    preferredEnvironment: 'Fast-paced environments with tight deadlines. Hackathons, sprints, startup MVPs, rapid prototyping.',
    suggestedRoles: ['Growth Engineer', 'Startup Developer', 'Sprint Lead', 'Rapid Prototyper'],
    shortSummary: 'You move fast and iterate faster, thriving under pressure when deadlines are tight.',
  },
  {
    id: 'fox',
    name: 'Fox',
    emoji: '🦊',
    archetype: 'The Strategist',
    category: 'execution',
    coreDimensions: ['analyticalThinking', 'creativity', 'decisionMaking'],
    personality: "Quietly clever. Finds the angle nobody else sees. Resourceful and unconventional — solves hard problems with elegant shortcuts.",
    strengths: ['Creative problem-solving', 'Resourcefulness', 'Finding unconventional solutions'],
    growthAreas: ['Sharing thought process with others', 'Working within established frameworks', 'Trusting straightforward approaches'],
    preferredEnvironment: "Complex problem spaces where the obvious approach won't work. Consulting, competitive strategy, debugging, optimisation.",
    suggestedRoles: ['Management Consultant', 'Solution Architect', 'Product Analyst', 'Competitive Intelligence'],
    shortSummary: 'You find the angle nobody else sees and solve hard problems with elegant, unconventional shortcuts.',
  },
  {
    id: 'octopus',
    name: 'Octopus',
    emoji: '🐙',
    archetype: 'The Maker',
    category: 'execution',
    coreDimensions: ['creativity', 'execution', 'adaptability'],
    personality: "Multi-talented builder who juggles many things at once. Hands-on, versatile, always prototyping. Thrives in environments where the job description doesn't exist yet.",
    strengths: ['Versatility', 'Hands-on building', 'Juggling multiple projects'],
    growthAreas: ['Focusing deeply on one thing', 'Finishing before starting something new', 'Specialising in a single domain'],
    preferredEnvironment: "Maker-friendly environments with creative freedom. Early-stage startups, design studios, hackathons, interdisciplinary teams.",
    suggestedRoles: ['Full-Stack Developer', 'Creative Technologist', 'Design Engineer', 'Indie Maker'],
    shortSummary: 'You build, prototype, and juggle many things at once — thriving where the job description hasn\'t been written yet.',
  },
]

// ---------------------------------------------------------------------------
// Assessment Questions — 10 interactions across 3 rounds
// ---------------------------------------------------------------------------

/**
 * Each answer option has a `dimensionBoosts` object mapping dimension keys
 * to score increases. The engine sums these across all answers.
 */
export const ASSESSMENT_QUESTIONS = [
  {
    round: 1,
    label: 'How You Start',
    kind: 'choice',
    question: 'Your group project is stuck because everyone has a different idea. What do you usually do first?',
    options: [
      { id: 'q1a', title: 'Get aligned', text: 'I help everyone agree on what matters most.', icon: 'Users', dimensionBoosts: { collaboration: 15, communication: 15, leadership: 5 } },
      { id: 'q1b', title: 'Check the facts', text: 'I look for more information before deciding.', icon: 'BarChart3', dimensionBoosts: { analyticalThinking: 15, curiosity: 10, learningAgility: 10 } },
      { id: 'q1c', title: 'Pick a next step', text: 'I suggest something practical so we can move.', icon: 'Zap', dimensionBoosts: { ownership: 15, leadership: 15, decisionMaking: 10 } },
      { id: 'q1d', title: 'Try another angle', text: 'I suggest a different approach we have not considered.', icon: 'Lightbulb', dimensionBoosts: { creativity: 15, curiosity: 10, adaptability: 10 } },
    ],
  },
  {
    round: 1,
    label: 'Energy',
    kind: 'choice',
    question: 'You finish a long day feeling surprisingly energised. What were you doing?',
    options: [
      { id: 'q2a', title: 'Solving a hard problem', text: 'I was figuring out something tricky.', icon: 'BarChart3', dimensionBoosts: { analyticalThinking: 15, curiosity: 10, execution: 5 } },
      { id: 'q2b', title: 'Sharing ideas', text: 'I was presenting, pitching, or explaining.', icon: 'MessageCircle', dimensionBoosts: { communication: 15, creativity: 10, adaptability: 5 } },
      { id: 'q2c', title: 'Helping the team', text: 'I was supporting people and keeping things moving.', icon: 'Users', dimensionBoosts: { collaboration: 15, communication: 10, leadership: 5 } },
      { id: 'q2d', title: 'Building something', text: 'I was making, testing, or improving something.', icon: 'Rocket', dimensionBoosts: { execution: 15, creativity: 10, ownership: 10 } },
    ],
  },
  {
    round: 1,
    label: 'Ambiguity',
    kind: 'choice',
    question: 'You start a new internship and your manager says, "Figure out the best way to solve this." How do you feel?',
    options: [
      { id: 'q3a', title: 'Excited', text: 'I like having ownership from the start.', icon: 'Rocket', dimensionBoosts: { ownership: 15, adaptability: 10, decisionMaking: 10 } },
      { id: 'q3b', title: 'Curious', text: 'I want to explore before choosing a path.', icon: 'Lightbulb', dimensionBoosts: { curiosity: 15, learningAgility: 10, analyticalThinking: 5 } },
      { id: 'q3c', title: 'A bit unsure', text: 'I can do it, but I would need a moment.', icon: 'ShieldCheck', dimensionBoosts: { adaptability: 10, learningAgility: 10, analyticalThinking: 5 } },
      { id: 'q3d', title: 'Need structure', text: 'I prefer clearer expectations before starting.', icon: 'ClipboardList', dimensionBoosts: { execution: 10, analyticalThinking: 10, decisionMaking: 5 } },
    ],
  },
  {
    round: 2,
    label: 'Response Style',
    kind: 'choice',
    question: 'Your idea gets rejected during a meeting. What do you usually do next?',
    options: [
      { id: 'q4a', title: 'Improve it', text: 'I revise the idea and try again.', icon: 'Rocket', dimensionBoosts: { learningAgility: 15, ownership: 10, execution: 5 } },
      { id: 'q4b', title: 'Ask why', text: 'I want to understand the reasoning.', icon: 'MessageCircle', dimensionBoosts: { communication: 10, curiosity: 10, analyticalThinking: 10 } },
      { id: 'q4c', title: 'Try a new idea', text: 'I move quickly to another option.', icon: 'Lightbulb', dimensionBoosts: { creativity: 15, adaptability: 10, decisionMaking: 5 } },
      { id: 'q4d', title: 'Back the team', text: 'I support the chosen direction.', icon: 'Users', dimensionBoosts: { collaboration: 15, communication: 5, adaptability: 10 } },
    ],
  },
  {
    round: 2,
    label: 'Pride',
    kind: 'choice',
    question: 'At the end of a project, what would make you feel best?',
    options: [
      { id: 'q5a', title: 'The team trusted me', text: 'I helped guide the work.', icon: 'Target', dimensionBoosts: { leadership: 15, ownership: 10, communication: 5 } },
      { id: 'q5b', title: 'We solved it', text: 'The problem was hard, and we cracked it.', icon: 'BarChart3', dimensionBoosts: { analyticalThinking: 15, execution: 10, curiosity: 5 } },
      { id: 'q5c', title: 'Someone grew', text: 'I helped another person do better.', icon: 'Heart', dimensionBoosts: { collaboration: 15, communication: 10, learningAgility: 5 } },
      { id: 'q5d', title: 'We made something new', text: 'The final result felt original.', icon: 'Star', dimensionBoosts: { creativity: 15, execution: 5, ownership: 5 } },
    ],
  },
  {
    round: 2,
    label: 'Environment',
    kind: 'tradeoff',
    question: 'Which internship feels more like you right now?',
    options: [
      { id: 'q6a', title: 'Clear and guided', text: 'Clear tasks, predictable schedule, strong guidance.', icon: 'Building2', dimensionBoosts: { execution: 15, analyticalThinking: 10, learningAgility: 5 } },
      { id: 'q6b', title: 'Open and fast-moving', text: 'More freedom, new problems each week, less certainty.', icon: 'Rocket', dimensionBoosts: { ownership: 15, adaptability: 15, creativity: 10 } },
    ],
  },
  {
    round: 3,
    label: 'Team Role',
    kind: 'choice',
    question: 'During group projects, which role do you naturally end up taking?',
    options: [
      { id: 'q7a', title: 'Organiser', text: 'I coordinate people and decisions.', icon: 'ClipboardList', dimensionBoosts: { leadership: 10, ownership: 10, execution: 10 } },
      { id: 'q7b', title: 'Problem solver', text: 'I take on the hardest part.', icon: 'BarChart3', dimensionBoosts: { analyticalThinking: 15, execution: 10, ownership: 5 } },
      { id: 'q7c', title: 'Encourager', text: 'I keep the team confident and involved.', icon: 'Heart', dimensionBoosts: { collaboration: 15, communication: 10, leadership: 5 } },
      { id: 'q7d', title: 'Finisher', text: 'I make sure the work gets submitted well.', icon: 'Check', dimensionBoosts: { execution: 15, ownership: 10, decisionMaking: 5 } },
    ],
  },
  {
    round: 3,
    label: 'Learning',
    kind: 'choice',
    question: 'If you had a free week to learn anything useful, what would you probably choose?',
    options: [
      { id: 'q8a', title: 'Practical skill', text: 'Something I can use immediately.', icon: 'Zap', dimensionBoosts: { execution: 15, learningAgility: 10, ownership: 5 } },
      { id: 'q8b', title: 'Technical tool', text: 'A framework, language, or system.', icon: 'BarChart3', dimensionBoosts: { analyticalThinking: 15, curiosity: 10, learningAgility: 10 } },
      { id: 'q8c', title: 'Creative topic', text: 'Design, content, product, or making.', icon: 'Lightbulb', dimensionBoosts: { creativity: 15, curiosity: 10, adaptability: 5 } },
      { id: 'q8d', title: 'People skill', text: 'Communication, leadership, or teamwork.', icon: 'Users', dimensionBoosts: { communication: 15, collaboration: 10, leadership: 10 } },
    ],
  },
  {
    round: 3,
    label: 'Coaching',
    kind: 'choice',
    question: 'Someone gives you feedback on your work. What helps you most?',
    options: [
      { id: 'q9a', title: 'Clear examples', text: 'Show me exactly what to improve.', icon: 'ClipboardList', dimensionBoosts: { analyticalThinking: 10, execution: 10, learningAgility: 10 } },
      { id: 'q9b', title: 'Quick conversation', text: 'Let me ask questions and understand it.', icon: 'MessageCircle', dimensionBoosts: { communication: 15, learningAgility: 10, collaboration: 5 } },
      { id: 'q9c', title: 'Time to process', text: 'I prefer to think first, then respond.', icon: 'Headphones', dimensionBoosts: { analyticalThinking: 10, adaptability: 5, decisionMaking: 5 } },
      { id: 'q9d', title: 'Next action', text: 'Give me one thing to do differently.', icon: 'Target', dimensionBoosts: { execution: 15, ownership: 10, learningAgility: 5 } },
    ],
  },
  {
    round: 3,
    label: 'Trade-off',
    kind: 'tradeoff',
    question: 'Two internships are available. Which one fits you better today?',
    options: [
      { id: 'q10a', title: 'Predictable path', text: 'Clear responsibilities, stable work, strong guidance.', icon: 'ShieldCheck', dimensionBoosts: { execution: 15, analyticalThinking: 10, learningAgility: 5 } },
      { id: 'q10b', title: 'Interesting stretch', text: 'More uncertainty, but the work feels more exciting.', icon: 'Lightbulb', dimensionBoosts: { creativity: 15, curiosity: 10, adaptability: 10, ownership: 5 } },
    ],
  },
]
// ---------------------------------------------------------------------------
// AI Companion Transition Messages
// ---------------------------------------------------------------------------

export const COMPANION_TRANSITIONS = [
  "Interesting… that tells me something about how you approach challenges.",
  "Got it. I'm starting to see a pattern here.",
  "That's helpful — I can already tell you're not the type to sit still.",
  "I see. Let me ask you something different now.",
  "Good to know. Let's go a little deeper.",
  "I'm getting a clearer picture now. Just a few more.",
  "I like that answer. It says more than you might think.",
  "Almost there. These last ones matter the most.",
  "Okay, I think I'm starting to understand how you work.",
  "One more thing I want to understand about you.",
]

// ---------------------------------------------------------------------------
// Scoring Engine
// ---------------------------------------------------------------------------

/**
 * Score all 11 dimensions from a set of assessment answers.
 *
 * @param {Array} answers — Array of { questionIndex, answer } objects.
 *   For choice/tradeoff: answer is the selected option object (with dimensionBoosts).
 *   For text: answer is the text string (we use the question's default boosts).
 *   For skipped: answer is null.
 * @returns {Object} dimensions — { ownership: number, leadership: number, ... }
 */
export function scoreAnswers(answers) {
  const dimensions = createEmptyDimensions()

  answers.forEach(({ questionIndex, answer }) => {
    if (!answer) return // skipped

    const question = ASSESSMENT_QUESTIONS[questionIndex]
    if (!question) return

    let boosts = null

    if (question.kind === 'text') {
      // Text answers use the question-level default boosts
      if (typeof answer === 'string' && answer.trim().length > 0) {
        boosts = question.dimensionBoosts
      }
    } else {
      // Choice / tradeoff — answer is the selected option object
      boosts = answer.dimensionBoosts
    }

    if (boosts) {
      Object.entries(boosts).forEach(([dim, value]) => {
        if (dimensions[dim] !== undefined) {
          dimensions[dim] += value
        }
      })
    }
  })

  // Normalise to 0–100 scale
  const maxPossible = 45 // rough max a single dimension could reach
  DIMENSIONS.forEach((dim) => {
    dimensions[dim] = Math.min(100, Math.round((dimensions[dim] / maxPossible) * 100))
  })

  return dimensions
}

// ---------------------------------------------------------------------------
// Animal Matching
// ---------------------------------------------------------------------------

/**
 * Compute primary and emerging career animals from dimension scores.
 *
 * @param {Object} dimensions — { ownership: number, ... }
 * @returns {{ primary: Object, emerging: Object|null }}
 */
export function computeAnimals(dimensions) {
  // Score each animal by summing its 3 core dimension scores
  const scored = ANIMALS.map((animal) => {
    const score = animal.coreDimensions.reduce((sum, dim) => sum + (dimensions[dim] || 0), 0)
    return { ...animal, matchScore: score }
  })

  // Sort descending by match score
  scored.sort((a, b) => b.matchScore - a.matchScore)

  const primary = scored[0]

  // Emerging animal = highest-scored from a DIFFERENT category
  const emerging = scored.find((a) => a.category !== primary.category) || null

  return { primary, emerging }
}

// ---------------------------------------------------------------------------
// Narrative Generation
// ---------------------------------------------------------------------------

/**
 * Generate the AI narrative for the result and profile pages.
 *
 * @param {Object} dimensions — dimension scores
 * @param {Object} primary — primary animal object
 * @returns {{ paragraphs: string[], strengthReasons: string[] }}
 */
export function generateNarrative(dimensions, primary) {
  // Find top 3 dimensions
  const sorted = DIMENSIONS
    .map((dim) => ({ dim, score: dimensions[dim] || 0 }))
    .sort((a, b) => b.score - a.score)

  const top3 = sorted.slice(0, 3)

  const dimensionLabels = {
    ownership: 'taking ownership',
    leadership: 'leading and guiding others',
    analyticalThinking: 'analysing complex problems',
    communication: 'communicating and connecting',
    execution: 'executing and delivering results',
    creativity: 'thinking creatively',
    adaptability: 'adapting to new situations',
    learningAgility: 'learning quickly',
    curiosity: 'exploring and asking questions',
    collaboration: 'working with others',
    decisionMaking: 'making decisions',
  }

  const dimensionVerbPhrases = {
    ownership: 'taking initiative and owning outcomes',
    leadership: 'stepping up to lead when the team needs direction',
    analyticalThinking: 'breaking down complex problems methodically',
    communication: 'expressing ideas clearly and connecting with people',
    execution: 'getting things done and delivering tangible results',
    creativity: 'finding novel approaches to challenges',
    adaptability: 'staying flexible when plans change',
    learningAgility: 'picking up new skills and knowledge quickly',
    curiosity: 'diving deep into topics that fascinate you',
    collaboration: 'building strong team dynamics',
    decisionMaking: 'making confident calls, even with incomplete information',
  }

  const paragraphs = [
    `You naturally enjoy ${dimensionLabels[top3[0].dim]} and ${dimensionLabels[top3[1].dim]}. This combination suggests you're at your best when you can ${dimensionVerbPhrases[top3[0].dim]}.`,
    primary.personality,
    `You seem energised by environments that reward ${dimensionLabels[top3[0].dim]} and ${dimensionLabels[top3[2].dim]}. ${primary.preferredEnvironment.split('.')[0]}.`,
  ]

  const strengthReasons = top3.map((entry) => {
    const label = dimensionLabels[entry.dim]
    return label.charAt(0).toUpperCase() + label.slice(1)
  })

  return { paragraphs, strengthReasons }
}

// ---------------------------------------------------------------------------
// Profile Confidence
// ---------------------------------------------------------------------------

/**
 * Compute profile confidence based on assessment completion and experience count.
 * Starts at ~30% after assessment, grows toward 90%+ with Career Memory entries.
 *
 * @param {boolean} hasAssessment — whether assessment has been completed
 * @param {number} experienceCount — number of Career Memory entries (future)
 * @returns {number} confidence 0–100
 */
export function computeConfidence(hasAssessment, experienceCount = 0) {
  if (!hasAssessment) return 0
  // Base confidence from assessment
  const base = 30
  // Each experience adds diminishing confidence (log scale)
  const experienceBonus = Math.min(60, experienceCount * 8)
  return Math.min(95, base + experienceBonus)
}

/**
 * Returns a human-readable confidence message.
 */
export function getConfidenceMessage(confidence) {
  if (confidence <= 0) return "I haven't learned anything about you yet. Take the assessment to get started."
  if (confidence <= 35) return "I've only just met you. As you continue adding projects, internships and experiences, I'll become much more confident in understanding how you work best."
  if (confidence <= 55) return "I'm starting to understand your work style. More Career Memory entries will sharpen my understanding."
  if (confidence <= 75) return "I have a solid read on how you work. Your Career Memory is helping me refine my understanding."
  return "I know you well. Your Career Memory paints a detailed picture of how you work best."
}

// ---------------------------------------------------------------------------
// Career Memory Integration (placeholder)
// ---------------------------------------------------------------------------

/**
 * PLACEHOLDER — In the future, this function will adjust behavioural dimensions
 * based on a new Career Memory experience entry (project, internship, competition, etc.).
 *
 * @param {Object} currentDimensions — current dimension scores
 * @param {Object} experience — the new Career Memory entry
 * @returns {Object} updatedDimensions
 */
export function updateDimensionsFromExperience(currentDimensions, experience) {
  // Stub: return dimensions unchanged for now.
  // Future implementation will use NLP/Groq to detect behavioural signals
  // from experience descriptions and adjust dimensions accordingly.
  return { ...currentDimensions }
}

/**
 * PLACEHOLDER — Generate a growth notification message when animal evolves.
 *
 * @param {string} dimension — the dimension that grew
 * @param {Object} newAnimal — the new emerging/primary animal
 * @returns {string} notification message
 */
export function generateGrowthNotification(dimension, newAnimal) {
  const dimensionLabels = {
    ownership: 'taking ownership of projects',
    leadership: 'leading teams',
    analyticalThinking: 'analysing complex problems',
    communication: 'communicating ideas',
    execution: 'delivering results',
    creativity: 'thinking creatively',
    adaptability: 'adapting to change',
    learningAgility: 'learning new skills',
    curiosity: 'exploring new topics',
    collaboration: 'collaborating with others',
    decisionMaking: 'making decisions',
  }

  return `I've noticed something interesting. Over the past month you've consistently enjoyed ${dimensionLabels[dimension] || dimension}. This has strengthened your ${newAnimal.name} characteristics.`
}
