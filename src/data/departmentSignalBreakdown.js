// ─── Per-department signal breakdown + AI recommendations ─────────────────
//
// The Signal Matrix opens on department retention. Drilling into a department
// shows only the signals firing inside it, plus the actions CareerOS suggests
// for that specific pattern.
//
// severity: share of the department's headcount the signal is firing on, used
// to rank the breakdown and colour the bar.

export const DEPARTMENT_SIGNAL_BREAKDOWN = {
  eng: {
    headline: 'Two team leads left within 90 days and pay bands have drifted — this is a structural problem, not a morale one.',
    signals: [
      { id: 'manager-departure', flagged: 12, delta: 12, note: 'Both departures were on the platform squad; 12 reports affected.' },
      { id: 'compa-ratio', flagged: 6, delta: 2, note: '6 engineers sit below 0.85 against the SE-3 band.' },
      { id: 'promotion-staleness', flagged: 5, delta: 1, note: 'Average 27 months in role for the affected group.' },
      { id: 'output-velocity', flagged: 5, delta: 3, note: 'Commit velocity down 45% across the squad in 30 days.' },
      { id: 'sentiment-drift', flagged: 4, delta: 3, note: 'Sentiment fell 21 points since the first lead resigned.' },
      { id: 'overtime', flagged: 4, delta: 1, note: 'Backfill gap is pushing 14h+ weeks on four engineers.' },
      { id: 'cancelled-1on1', flagged: 3, delta: 2, note: '1-on-1 completion at 42% while the lead roles are vacant.' },
    ],
    actions: [
      {
        id: 'eng-pay',
        priority: 'Do this week',
        tone: 'critical',
        title: 'Run an off-cycle pay review for the 6 engineers below 0.85 compa-ratio',
        why: 'Compa-ratio is the strongest predictor in this department and the cheapest to fix before a resignation lands. Replacing one senior engineer costs roughly 6–9 months of salary.',
        owner: 'HR Business Partner + Finance',
        impact: 'Projected +4.1 pts department retention',
      },
      {
        id: 'eng-backfill',
        priority: 'Do this week',
        tone: 'critical',
        title: 'Name an interim lead for the platform squad',
        why: 'Turnover contagion follows manager departure. Twelve reports currently have no clear advocate, and 1-on-1 completion has already dropped to 42%.',
        owner: 'Engineering Director',
        impact: 'Stops the contagion pattern that drove 3 of the last 5 exits',
      },
      {
        id: 'eng-workload',
        priority: 'Next 30 days',
        tone: 'high',
        title: 'Rebalance the on-call rota while the backfill is open',
        why: 'Four engineers have exceeded 14h overtime for 3+ consecutive weeks — the threshold where burnout signals turn into resignations.',
        owner: 'Priya Nair',
        impact: 'Removes the burnout driver stacked on top of pay risk',
      },
      {
        id: 'eng-survey',
        priority: 'Next 30 days',
        tone: 'medium',
        title: 'Send a pay fairness + workload pulse to the squad',
        why: 'Behavioural signals tell you something is wrong but not why. A short survey confirms whether pay or leadership vacancy is the dominant concern before you spend budget.',
        owner: 'HR Business Partner',
        impact: 'Validates where to spend the retention budget',
        survey: { topic: 'pay fairness and workload after a manager departure', audience: 'Engineering · platform squad' },
      },
    ],
  },
  prod: {
    headline: 'Nobody has been promoted in 18 months. The pipeline is stalled, and sentiment is following it down.',
    signals: [
      { id: 'promotion-staleness', flagged: 8, delta: 3, note: '4 PMs at the same band for 18+ months.' },
      { id: 'sentiment-drift', flagged: 5, delta: 4, note: 'eNPS fell 18 points across Q2.' },
      { id: 'pronoun-shift', flagged: 3, delta: 2, note: 'Detached pronoun use up sharply in two squads.' },
      { id: 'compa-ratio', flagged: 3, delta: 1, note: 'Band drift of ~16% versus market for senior PMs.' },
      { id: 'cancelled-1on1', flagged: 3, delta: 1, note: 'Career conversations postponed twice in a row.' },
    ],
    actions: [
      {
        id: 'prod-banding',
        priority: 'Do this week',
        tone: 'critical',
        title: 'Publish a promotion calendar with banding criteria for the PM track',
        why: 'Four PMs have sat at the same band for 18+ months with no stated criteria. Stagnation without a visible path is the top exit reason in product roles.',
        owner: 'Head of Product + HR',
        impact: 'Projected +3.4 pts department retention',
      },
      {
        id: 'prod-1on1',
        priority: 'Next 30 days',
        tone: 'high',
        title: 'Reinstate career conversations in every PM 1-on-1',
        why: 'Career 1-on-1s have been postponed twice consecutively, which reads to employees as a decision already made against them.',
        owner: 'Adrian Tan',
        impact: 'Addresses the disengagement signal before it becomes flight behaviour',
      },
      {
        id: 'prod-survey',
        priority: 'Next 30 days',
        tone: 'medium',
        title: 'Survey the product team on progression clarity',
        why: 'Pronoun shift and sentiment decay both point to detachment, but only a direct question tells you whether it is pay, progression, or leadership.',
        owner: 'HR Business Partner',
        impact: 'Confirms the driver before the next promotion cycle',
        survey: { topic: 'promotion staleness and progression clarity in Product', audience: 'Product team' },
      },
    ],
  },
  ops: {
    headline: 'Overtime, not pay, is the driver here. Six people are carrying the rota.',
    signals: [
      { id: 'overtime', flagged: 6, delta: 2, note: '6 staff averaging 14+ hours a week beyond contract.' },
      { id: 'pto-spikes', flagged: 4, delta: 3, note: 'Single-day leave clustering mid-week.' },
      { id: 'cancelled-1on1', flagged: 3, delta: 1, note: '1-on-1s dropped during the peak shift period.' },
      { id: 'sentiment-drift', flagged: 2, delta: 1, note: 'Pulse score 5.2/10, down from 6.4.' },
    ],
    actions: [
      {
        id: 'ops-rota',
        priority: 'Do this week',
        tone: 'high',
        title: 'Cap overtime at 8h/week and hire two contract staff for peak shifts',
        why: 'Six people have sustained 14h+ weeks. Overtime beyond three consecutive weeks is the leading operational burnout indicator in the matrix.',
        owner: 'Chong Wei + HR',
        impact: 'Projected +2.6 pts department retention',
      },
      {
        id: 'ops-pto',
        priority: 'Do this week',
        tone: 'high',
        title: 'Check the four staff showing mid-week single-day leave patterns',
        why: 'Clustered single-day PTO correlates with off-site interviews. A stay conversation now is worth more than an exit interview later.',
        owner: 'Chong Wei',
        impact: 'Early intervention on 4 flight-risk employees',
      },
      {
        id: 'ops-recovery',
        priority: 'Next 30 days',
        tone: 'medium',
        title: 'Mandate a recovery day after each peak cycle',
        why: 'Recovery time is the cheapest intervention available and prevents the burnout pattern from repeating next quarter.',
        owner: 'Operations Lead',
        impact: 'Prevents recurrence rather than treating symptoms',
      },
    ],
  },
  sales: {
    headline: 'Commission sits below market, but the trend has stabilised since Q1 — this is fixable with a banding correction.',
    signals: [
      { id: 'compa-ratio', flagged: 5, delta: 1, note: 'On-target earnings ~18% below market for AEs.' },
      { id: 'interaction-decay', flagged: 3, delta: 2, note: 'Channel participation down in two reps.' },
      { id: 'promotion-staleness', flagged: 2, delta: 0, note: 'Two AEs never promoted after 18 months.' },
    ],
    actions: [
      {
        id: 'sales-comp',
        priority: 'Next 30 days',
        tone: 'high',
        title: 'Correct the OTE band before the next commission cycle',
        why: 'Pay position is the only strong signal here, and sales candidates are the most recruiter-responsive group in the company.',
        owner: 'Lydia Goh + Finance',
        impact: 'Projected +2.0 pts department retention',
      },
      {
        id: 'sales-career',
        priority: 'Next quarter',
        tone: 'medium',
        title: 'Define a senior AE step so 18-month reps have somewhere to go',
        why: 'Two reps have hit 18 months with no defined next step, which turns a pay conversation into an exit conversation.',
        owner: 'Head of Sales',
        impact: 'Removes the secondary staleness driver',
      },
    ],
  },
  mkt: {
    headline: 'Broadly healthy. One manager shows declining collaboration signals — worth a conversation, not a programme.',
    signals: [
      { id: 'promotion-staleness', flagged: 3, delta: 1, note: 'Three specialists past 22 months in role.' },
      { id: 'recognition-drop', flagged: 2, delta: 1, note: 'Kudos received down 60% over 60 days.' },
      { id: 'cancelled-1on1', flagged: 1, delta: 1, note: 'One manager cancelling repeatedly.' },
    ],
    actions: [
      {
        id: 'mkt-recognition',
        priority: 'Next 30 days',
        tone: 'medium',
        title: 'Give visible credit for the Q3 campaign in the next all-hands',
        why: 'Recognition dried up while output held steady — the cheapest possible fix, and the signal most likely to reverse quickly.',
        owner: 'Nadia Yusof',
        impact: 'Projected +1.2 pts department retention',
      },
      {
        id: 'mkt-manager',
        priority: 'Next 30 days',
        tone: 'medium',
        title: 'Coach the manager cancelling 1-on-1s',
        why: 'A single manager accounts for the entire collaboration decline in this department. Fix the manager, fix the signal.',
        owner: 'HR Business Partner',
        impact: 'Isolated fix, no department-wide programme needed',
      },
    ],
  },
  fin: {
    headline: 'Low risk. One analyst is approaching the 12-month tenure milestone where first exits cluster.',
    signals: [
      { id: 'promotion-staleness', flagged: 2, delta: 0, note: 'Two analysts approaching 18 months.' },
      { id: 'recognition-drop', flagged: 1, delta: 0, note: 'Minor dip, within normal variance.' },
    ],
    actions: [
      {
        id: 'fin-checkin',
        priority: 'Next quarter',
        tone: 'low',
        title: 'Proactive check-in with the analyst nearing 12 months',
        why: 'First-year exits cluster around the 12-month mark. A scheduled conversation costs nothing and pre-empts the pattern.',
        owner: 'Finance Manager',
        impact: 'Preventive — no active risk detected',
      },
    ],
  },
  hr: {
    headline: 'Strongest sentiment scores in the company. The new onboarding programme is working.',
    signals: [
      { id: 'promotion-staleness', flagged: 1, delta: 0, note: 'One coordinator past 24 months.' },
    ],
    actions: [
      {
        id: 'hr-share',
        priority: 'Next quarter',
        tone: 'low',
        title: 'Document what the onboarding programme changed and roll it to Engineering',
        why: 'HR has the highest sentiment scores org-wide. The practices behind that are transferable to the departments that are struggling.',
        owner: 'Head of HR',
        impact: 'Spreads a working pattern rather than fixing a broken one',
      },
    ],
  },
  ds: {
    headline: 'Highest retention in the company — comp, collaboration, and ownership are all working.',
    signals: [
      { id: 'output-velocity', flagged: 1, delta: 0, note: 'One-off dip during a model migration.' },
    ],
    actions: [
      {
        id: 'ds-protect',
        priority: 'Next quarter',
        tone: 'low',
        title: 'Protect the conditions: keep compa-ratio above 1.0 at the next review',
        why: 'This department is the control group that proves the model. The main risk is eroding the conditions that made it work.',
        owner: 'Kevin Loh + Finance',
        impact: 'Maintains 95.2% retention',
      },
    ],
  },
}

export const ACTION_TONES = {
  critical: { pill: 'border-red-200 bg-red-50 text-red-600', bar: 'bg-red-500' },
  high: { pill: 'border-orange-200 bg-orange-50 text-orange-600', bar: 'bg-orange-500' },
  medium: { pill: 'border-amber-200 bg-amber-50 text-amber-700', bar: 'bg-amber-400' },
  low: { pill: 'border-emerald-200 bg-emerald-50 text-emerald-600', bar: 'bg-emerald-500' },
}

export function getDepartmentBreakdown(deptId) {
  return DEPARTMENT_SIGNAL_BREAKDOWN[deptId] ?? { headline: '', signals: [], actions: [] }
}
