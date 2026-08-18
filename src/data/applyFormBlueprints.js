// Registration blueprints for the Opportunities apply flow.
//
// What the candidate is asked for depends on what they are signing up to: a job
// or internship posting collects personal and professional details, a challenge
// collects team and submission details, and an event collects attendance
// details. The opportunity's title then tunes a few fields further (an ML role
// asks for an ML portfolio, a case challenge asks for a case track).

const CANDIDATE = {
  name: 'Chris Lee',
  university: "Taylor's University",
  year: 'Year 3',
  course: 'Data Science',
  studentId: '0329847',
  email: 'chris.lee@taylors.edu.my',
  phone: '+60 12-345 6789',
  linkedin: 'linkedin.com/in/chrislee',
}

// ─── Title-derived focus ──────────────────────────────────────────────
// Keeps the form specific to the posting rather than generically "a job".
function focusFor(title = '', org = '') {
  const text = `${title} ${org}`.toLowerCase()
  if (/\b(ml|machine learning|ai|nlp)\b/.test(text)) {
    return { label: 'ML / AI', portfolio: 'GitHub or ML project link', portfolioValue: 'github.com/chrislee/nlp-resume-parser' }
  }
  if (/data|analytic|analyst/.test(text)) {
    return { label: 'Data', portfolio: 'Data portfolio (GitHub / Tableau)', portfolioValue: 'github.com/chrislee/retail-forecast-dashboard' }
  }
  if (/software|engineer|developer|backend|frontend/.test(text)) {
    return { label: 'Software engineering', portfolio: 'GitHub or portfolio link', portfolioValue: 'github.com/chrislee' }
  }
  if (/product|business|consult|case|strategy/.test(text)) {
    return { label: 'Product / business', portfolio: 'Case or project portfolio link', portfolioValue: 'notion.so/chrislee/case-portfolio' }
  }
  return { label: 'General', portfolio: 'Portfolio or CV link', portfolioValue: 'chrislee.dev' }
}

// Normalises the several category spellings used across the mock data.
function kindOf(opportunity) {
  const raw = (opportunity.category ?? opportunity.type ?? '').toLowerCase()
  if (raw.includes('event') || raw.includes('workshop') || raw.includes('talk') || raw.includes('fair')) return 'event'
  if (raw.includes('challenge') || raw.includes('hackathon') || raw.includes('competition')) return 'challenge'
  if (raw.includes('intern')) return 'internship'
  return 'job'
}

export function buildApplyBlueprint(opportunity) {
  const kind = kindOf(opportunity)
  const focus = focusFor(opportunity.title, opportunity.org)
  const title = opportunity.title ?? 'this opportunity'
  const org = opportunity.org ?? 'the organiser'
  const when = opportunity.dateRange ?? ''

  const identity = {
    title: 'Personal details',
    fields: [
      { label: 'Full name', value: CANDIDATE.name },
      { label: 'Email', value: CANDIDATE.email },
      { label: 'Mobile number', value: CANDIDATE.phone },
      { label: 'University', value: CANDIDATE.university },
      { label: 'Year of study', value: CANDIDATE.year },
      { label: 'Course', value: CANDIDATE.course },
    ],
  }

  if (kind === 'event') {
    return {
      kind,
      kindLabel: 'Event registration',
      intro: `Hi Chris! Registering you for ${title}${when ? ` on ${when}` : ''}, hosted by ${org}.`,
      choice: {
        prompt: 'How are you attending?',
        options: [
          { id: 'individual', label: 'As an individual student' },
          { id: 'group', label: 'With coursemates' },
        ],
      },
      followUp: {
        key: 'studentId',
        prompt: `${org} checks student ID at the door. What's yours?`,
        placeholder: 'e.g. 0329847',
        fallback: CANDIDATE.studentId,
      },
      sections: [
        identity,
        {
          title: 'Attendance details',
          fields: [
            { label: 'Student ID (for check-in)', valueFrom: 'studentId', value: CANDIDATE.studentId },
            { label: 'Session', value: when || 'Main session' },
            { label: 'Attending as', valueFrom: 'choice', value: 'Individual student' },
            { label: 'Dietary requirement', value: 'None' },
            { label: 'Topic you most want covered', value: `${focus.label} careers` },
          ],
        },
      ],
      choiceExtras: {
        group: [{ label: 'Group size', value: '4 students' }],
      },
      submitLabel: 'Yes, register me',
      confirmPrompt: `You're all set. Confirm your registration for ${title}?`,
      successTitle: 'Registration confirmed!',
      successNote: 'A QR check-in pass has been emailed to you.',
    }
  }

  if (kind === 'challenge') {
    const isCase = /case|consult|business|strategy/i.test(`${title} ${org}`)
    return {
      kind,
      kindLabel: 'Challenge registration',
      intro: `Hi Chris! I'll register you for ${title} by ${org}.`,
      choice: {
        prompt: 'Are you entering solo or with a team?',
        options: [
          { id: 'solo', label: 'Solo' },
          { id: 'team', label: 'With a team' },
        ],
      },
      followUp: {
        key: 'studentId',
        prompt: "Organisers verify eligibility by student ID. What's yours?",
        placeholder: 'e.g. 0329847',
        fallback: CANDIDATE.studentId,
      },
      sections: [
        identity,
        {
          title: 'Entry details',
          fields: [
            { label: 'Student ID', valueFrom: 'studentId', value: CANDIDATE.studentId },
            { label: 'Entry type', valueFrom: 'choice', value: 'Solo' },
            {
              label: isCase ? 'Case track' : 'Challenge track',
              value: isCase ? 'Business strategy' : `${focus.label} track`,
            },
            { label: focus.portfolio, value: focus.portfolioValue },
            { label: 'Tools you plan to use', value: isCase ? 'Excel, PowerPoint' : 'Python, scikit-learn' },
          ],
        },
      ],
      choiceExtras: {
        team: [
          { label: 'Team name', value: 'NeuralNomads' },
          { label: 'Team size', value: '3 members' },
          { label: 'Teammate emails', value: 'wei.tan@taylors.edu.my, amira.z@taylors.edu.my' },
        ],
      },
      submitLabel: 'Yes, register',
      confirmPrompt: `Ready to submit your entry for ${title}?`,
      successTitle: 'Entry registered!',
      successNote: 'Briefing pack and submission link arrive by email.',
    }
  }

  // Job and internship postings — personal and professional details.
  const isInternship = kind === 'internship'
  return {
    kind,
    kindLabel: isInternship ? 'Internship application' : 'Job application',
    intro: `Hi Chris! I'll help you apply for ${title} at ${org}.`,
    choice: {
      prompt: isInternship
        ? 'Which intake are you applying for?'
        : 'When could you start if you got an offer?',
      options: isInternship
        ? [
          { id: 'mid', label: when || 'The listed intake' },
          { id: 'flexible', label: 'Flexible' },
        ]
        : [
          { id: 'immediate', label: 'Immediately' },
          { id: 'notice', label: 'After 1 month notice' },
        ],
    },
    followUp: {
      key: 'studentId',
      prompt: `${org} matches applications to your university record. What's your student ID?`,
      placeholder: 'e.g. 0329847',
      fallback: CANDIDATE.studentId,
    },
    sections: [
      identity,
      {
        title: 'Professional details',
        fields: [
          { label: 'Student ID', valueFrom: 'studentId', value: CANDIDATE.studentId },
          { label: 'LinkedIn', value: CANDIDATE.linkedin },
          { label: focus.portfolio, value: focus.portfolioValue },
          { label: 'CV', value: 'Chris_Lee_CV_2026.pdf (from Career Memory)' },
          { label: 'Key skills for this role', value: (opportunity.matchSkills ?? []).join(', ') || focus.label },
        ],
      },
      {
        title: isInternship ? 'Placement details' : 'Employment details',
        fields: [
          {
            label: isInternship ? 'Availability' : 'Earliest start date',
            valueFrom: 'choice',
            value: when || 'Jun – Aug 2026',
          },
          { label: 'Preferred location', value: opportunity.location ?? 'Kuala Lumpur' },
          {
            label: isInternship ? 'Expected allowance' : 'Expected salary',
            value: isInternship ? 'RM 1,500 – 2,000 / month' : 'RM 4,500 – 5,500 / month',
          },
          { label: 'Work authorisation', value: 'Malaysian citizen' },
          { label: 'Why this role', value: `Strong overlap with my ${focus.label.toLowerCase()} evidence in Career Memory.` },
        ],
      },
    ],
    choiceExtras: {},
    submitLabel: 'Yes, submit',
    confirmPrompt: `Everything looks good. Ready to submit your application for ${title}?`,
    successTitle: 'Application submitted!',
    successNote: "You'll hear back within 3–5 days.",
  }
}
