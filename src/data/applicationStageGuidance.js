// Per-stage coaching shown in the application detail modal. One entry per
// pipeline column: what CareerOS reads into the stage, and the actions it
// suggests next. Stages that need the candidate to act on something external
// (interview call, assessment, offer letter) also declare a `task` block, used
// to build a link + deadline when the application itself has none.

export const STAGE_GUIDANCE = {
  Applied: {
    read: 'Your application is in the queue. Nothing is blocked — this is preparation time.',
    actions: [
      'Complete at least 3 rounds of AI Interview Practice',
      'Attach project evidence to your Career Memory so recruiters see proof, not claims',
      'Follow up with the recruiter if there is no response after 10 working days',
    ],
    cta: { label: 'Start AI Interview Practice', route: '/student/ai-companion', state: { activeMode: 'practice' } },
  },
  'Under Review': {
    read: 'A human is reading your profile now. Anything you strengthen today can still be seen.',
    actions: [
      'Refresh your Career Memory headline so it matches this role',
      'Close your biggest skill gap for this role — it is what reviewers screen on',
      'Prepare a 90-second answer for "walk me through this project"',
    ],
    cta: { label: 'Review skill gaps', route: '/student/skill-development' },
  },
  Interview: {
    read: 'You are being evaluated on delivery, not just credentials. Rehearsal is the highest-leverage move.',
    actions: [
      'Run 3 mock interviews with the AI Companion, focused on this role',
      'Prepare two STAR stories from your Career Memory entries',
      'Research the team and prepare two questions of your own',
    ],
    cta: { label: 'Practise for this interview', route: '/student/ai-companion', state: { activeMode: 'practice' } },
    task: { kind: 'Interview', label: 'Join the interview room', defaultDays: 5, meta: 'Interview session' },
  },
  Assessment: {
    read: 'This is a timed, scored round. Most candidates lose points on speed, not knowledge.',
    actions: [
      'Do one timed practice set before you open the real assessment',
      'Revise SQL joins and aggregation — the most common failure point',
      'Book a quiet 90-minute block; most assessments allow a single attempt',
    ],
    cta: { label: 'Practise the tested skills', route: '/student/skill-development', state: { category: 'technical' } },
    task: { kind: 'Assessment', label: 'Open the assessment', defaultDays: 3, meta: 'Timed assessment · single attempt' },
  },
  Offer: {
    read: 'You have leverage here. Read the terms carefully before you sign anything.',
    actions: [
      'Check the salary against the market band for this role before responding',
      'Confirm start date, probation terms, and any bond or clawback clause',
      'Reply with a decision or a negotiation ask before the deadline lapses',
    ],
    cta: { label: 'Compare with market data', route: '/student/intelligence' },
    task: { kind: 'Offer', label: 'Review and sign the offer letter', defaultDays: 7, meta: 'Digital signature required' },
  },
}

// Applications dragged into a stage have no stageTask of their own, so build a
// demo one from the stage template and the date the card entered the stage.
export function resolveStageTask(app, stage) {
  const guidance = STAGE_GUIDANCE[stage]
  if (!guidance?.task) return null
  if (app.stageTask && app.stage === stage) return { kind: guidance.task.kind, ...app.stageTask }

  const entered = [...(app.statusHistory ?? [])].reverse().find((item) => item.stage === stage)
  const base = entered ? new Date(entered.date) : new Date()
  const deadline = new Date(base)
  deadline.setDate(deadline.getDate() + guidance.task.defaultDays)

  const slug = `${app.company} ${app.jobTitle}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  return {
    kind: guidance.task.kind,
    label: guidance.task.label,
    meta: guidance.task.meta,
    url: `https://careeros.dev/${guidance.task.kind.toLowerCase()}/${slug}`,
    deadline: deadline.toISOString(),
  }
}

// "Fri, 21 Aug 2026, 10:00" plus a relative hint the modal can colour.
export function formatDeadline(value) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return { label: '—', relative: '', overdue: false, urgent: false }

  const label = date.toLocaleString('en-GB', {
    weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  })
  const days = Math.ceil((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
  const relative = days < 0
    ? `${Math.abs(days)} day${Math.abs(days) === 1 ? '' : 's'} overdue`
    : days === 0
      ? 'Due today'
      : `in ${days} day${days === 1 ? '' : 's'}`

  return { label, relative, overdue: days < 0, urgent: days >= 0 && days <= 3 }
}
