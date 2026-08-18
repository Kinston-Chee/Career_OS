import { create } from 'zustand'
import { candidateOverview, initialExperiences, mockUser, opportunitiesHub } from '../data/mockData'

const sessionStorageKey = 'careeros-session'

// Role selection is persisted so refreshing the demo keeps the current workspace.
function readSavedSession() {
  if (typeof window === 'undefined') {
    return { selectedRole: null, isAuthenticated: false, currentWorkspace: null }
  }

  try {
    const saved = window.localStorage.getItem(sessionStorageKey)
    return saved ? JSON.parse(saved) : { selectedRole: null, isAuthenticated: false, currentWorkspace: null }
  } catch {
    return { selectedRole: null, isAuthenticated: false, currentWorkspace: null }
  }
}

function saveSession(session) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(sessionStorageKey, JSON.stringify(session))
}

function clearSession() {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(sessionStorageKey)
}

const savedSession = readSavedSession()

export const useCareerStore = create((set) => ({
  // This store holds lightweight demo state only: session role and experiences.
  currentUser: mockUser,
  selectedRole: savedSession.selectedRole,
  isAuthenticated: savedSession.isAuthenticated,
  currentWorkspace: savedSession.currentWorkspace,
  selectRole: (role) => {
    const session = {
      selectedRole: role,
      isAuthenticated: true,
      currentWorkspace: role,
    }
    saveSession(session)
    set(session)
  },
  signOut: () => {
    clearSession()
    set({
      selectedRole: null,
      isAuthenticated: false,
      currentWorkspace: null,
    })
  },
  experiences: initialExperiences,
  addExperience: (experience) =>
    set((state) => ({
      experiences: [{ id: `exp-${Date.now()}`, ...experience }, ...state.experiences],
    })),

  // Editable profile fields surfaced on Career Memory, sidebar, and account dropdown.
  careerFocus: candidateOverview.profile.careerFocus,
  targetRole: candidateOverview.profile.targetRole,
  setCareerFocus: (value) => set({ careerFocus: value }),
  setTargetRole: (value) => set({ targetRole: value }),

  // Calendar State & Actions
  myEvents: [
    {
      id: 'evt-up-1',
      title: 'Build with AI Community Day',
      status: 'Registered',
      date: '2025-05-17',
      matchPercent: 93,
      time: '9:00 AM - 5:00 PM',
      location: 'Online',
      org: 'Google Developer Student Clubs',
      skills: ['AI & Data', 'Web Dev', 'Cloud', 'Machine Learning'],
      deadline: '2025-05-15',
      category: 'hackathons'
    },
    {
      id: 'evt-up-2',
      title: 'McKinsey Forward Case Challenge',
      status: 'Registered',
      date: '2025-05-20',
      matchPercent: 98,
      time: '8:30 AM - 6:00 PM',
      location: 'Kuala Lumpur',
      org: 'McKinsey & Company',
      skills: ['Consulting', 'Strategy', 'Problem Solving', 'Leadership'],
      deadline: '2025-05-20',
      category: 'case-competitions'
    },
    {
      id: 'evt-up-3',
      title: 'Design Thinking Workshop',
      status: 'Saved',
      date: '2025-05-21',
      matchPercent: 87,
      time: '10:00 AM - 1:00 PM',
      location: 'Offline · Bangsar South',
      org: 'Design School',
      skills: ['UX', 'Design Thinking', 'Problem Solving', 'Data Analysis'],
      deadline: '2025-05-21',
      category: 'workshops'
    },
    {
      id: 'evt-up-4',
      title: 'Startup Pitch Night',
      status: 'Waitlisted',
      date: '2025-05-23',
      matchPercent: 76,
      time: '7:00 PM - 10:00 PM',
      location: 'Offline · Petaling Jaya',
      org: 'Entrepreneur Society',
      skills: ['Pitch & Presentation', 'Business', 'Public Speaking'],
      deadline: '2025-05-22',
      category: 'talks'
    },
    {
      id: 'evt-up-5',
      title: 'Cybersecurity Capture The Flag',
      status: 'Saved',
      date: '2025-05-24',
      matchPercent: 79,
      time: '12:00 PM - 6:00 PM',
      location: 'Online',
      org: 'CyberSec Club',
      skills: ['Cybersecurity', 'Network Security', 'Problem Solving'],
      deadline: '2025-05-23',
      category: 'hackathons'
    }
  ],
  addEventToCalendar: (event, status = 'Saved') => set((state) => {
    const exists = state.myEvents.some((e) => e.id === event.id);
    if (exists) {
      return {
        myEvents: state.myEvents.map((e) => e.id === event.id ? { ...e, status } : e)
      };
    }
    let formattedDate = event.date;
    if (formattedDate && !formattedDate.includes('-')) {
      const parts = formattedDate.split(' ');
      if (parts.length >= 2) {
        const day = parts[0].replace(/\D/g, '').padStart(2, '0');
        const monthMap = { jan: '01', feb: '02', mar: '03', apr: '04', may: '05', jun: '06', jul: '07', aug: '08', sep: '09', oct: '10', nov: '11', dec: '12' };
        const monthStr = parts[1].toLowerCase().substring(0, 3);
        const month = monthMap[monthStr] || '05';
        const year = parts[2] || '2025';
        formattedDate = `${year}-${month}-${day}`;
      }
    }
    const newEvent = {
      id: event.id || `evt-${Date.now()}`,
      title: event.title || 'Untitled Event',
      status: status,
      date: formattedDate || '2025-05-17',
      matchPercent: event.matchPercent || event.matchScore || 80,
      time: event.time || '9:00 AM - 5:00 PM',
      location: event.location || 'Online',
      org: event.org || 'Google Developer Student Clubs',
      skills: event.skills || ['AI & Data', 'Problem Solving'],
      deadline: event.deadline || formattedDate || '2025-05-15',
      category: event.category || 'workshops'
    };
    return { myEvents: [...state.myEvents, newEvent] };
  }),
  updateEventStatus: (eventId, newStatus) => set((state) => ({
    myEvents: state.myEvents.map((e) => e.id === eventId ? { ...e, status: newStatus } : e)
  })),
  removeEventFromCalendar: (eventId) => set((state) => ({
    myEvents: state.myEvents.filter((e) => e.id !== eventId)
  })),

  // ─── Saved Items (Opportunities Page) ───────────────────────────────
  savedJobs: [],
  savedEvents: [],
  toggleSaveJob: (job) => set((state) => {
    const exists = state.savedJobs.some((j) => j.id === job.id)
    return {
      savedJobs: exists
        ? state.savedJobs.filter((j) => j.id !== job.id)
        : [...state.savedJobs, { ...job, savedAt: new Date().toISOString() }],
    }
  }),
  toggleSaveEvent: (event) => set((state) => {
    const exists = state.savedEvents.some((e) => e.id === event.id)
    return {
      savedEvents: exists
        ? state.savedEvents.filter((e) => e.id !== event.id)
        : [...state.savedEvents, { ...event, savedAt: new Date().toISOString() }],
    }
  }),
  isJobSaved: (jobId) => { /* selector — use inline: useCareerStore(s => s.savedJobs.some(...)) */ },
  isEventSaved: (eventId) => { /* selector — use inline */ },

  // ─── Application Pipeline ───────────────────────────────────────────
  applications: [
    {
      id: 'app-001',
      jobTitle: 'Data Analyst Intern',
      company: 'Google Malaysia',
      matchPercent: 92,
      stage: 'Interview',
      dateApplied: '2026-05-28',
      logoEmoji: '🔵',
      logoBg: 'bg-blue-100',
      location: 'Kuala Lumpur (Hybrid)',
      workType: 'Internship · 6 months',
      salary: 'RM 3,500 / month',
      description: 'Support the Ads analytics team with dashboards, experiment readouts, and weekly performance reporting.',
      skills: ['SQL', 'Python', 'Dashboards', 'Experimentation'],
      // Stage-specific task the candidate has to act on. Rendered in the
      // application detail modal for Interview / Assessment / Offer.
      stageTask: {
        label: 'Join the interview room',
        url: 'https://meet.google.com/careeros-demo-interview',
        deadline: '2026-08-21T10:00:00',
        meta: 'Panel interview · 45 min · Google Meet',
      },
      statusHistory: [
        { stage: 'Applied', date: '2026-05-28' },
        { stage: 'Under Review', date: '2026-06-02' },
        { stage: 'Interview', date: '2026-06-08' },
      ],
    },
    {
      id: 'app-002',
      jobTitle: 'Data Analytics Associate',
      company: 'Petronas Digital',
      matchPercent: 88,
      stage: 'Under Review',
      dateApplied: '2026-06-01',
      logoEmoji: '🟢',
      logoBg: 'bg-emerald-100',
      location: 'Kuala Lumpur (On-site)',
      workType: 'Full-time · Graduate',
      salary: 'RM 4,200 – 5,000 / month',
      description: 'Join the digital analytics chapter building reporting for upstream and downstream operations.',
      skills: ['SQL', 'Power BI', 'Stakeholder management'],
      statusHistory: [
        { stage: 'Applied', date: '2026-06-01' },
        { stage: 'Under Review', date: '2026-06-05' },
      ],
    },
    {
      id: 'app-003',
      jobTitle: 'Junior Data Scientist',
      company: 'Grab',
      matchPercent: 78,
      stage: 'Applied',
      dateApplied: '2026-06-05',
      logoEmoji: '🟩',
      logoBg: 'bg-green-100',
      location: 'Petaling Jaya (Hybrid)',
      workType: 'Full-time · Junior',
      salary: 'RM 5,000 – 6,500 / month',
      description: 'Work with the marketplace science team on demand forecasting and pricing experiments.',
      skills: ['Python', 'Machine learning', 'Statistics'],
      statusHistory: [
        { stage: 'Applied', date: '2026-06-05' },
      ],
    },
    {
      id: 'app-004',
      jobTitle: 'Business Intelligence Analyst',
      company: 'Shopee',
      matchPercent: 85,
      stage: 'Under Review',
      dateApplied: '2026-05-30',
      logoEmoji: '🟠',
      logoBg: 'bg-orange-100',
      location: 'Kuala Lumpur (Hybrid)',
      workType: 'Full-time · Analyst',
      salary: 'RM 4,800 – 6,000 / month',
      description: 'Own reporting for regional seller operations and translate findings into category actions.',
      skills: ['SQL', 'Tableau', 'Business analysis'],
      statusHistory: [
        { stage: 'Applied', date: '2026-05-30' },
        { stage: 'Under Review', date: '2026-06-04' },
      ],
    },
    {
      id: 'app-005',
      jobTitle: 'Data Engineer Intern',
      company: 'CIMB Bank',
      matchPercent: 74,
      stage: 'Applied',
      dateApplied: '2026-06-07',
      logoEmoji: '🔴',
      logoBg: 'bg-red-100',
      location: 'Kuala Lumpur (On-site)',
      workType: 'Internship · 3 months',
      salary: 'RM 2,800 / month',
      description: 'Help maintain data pipelines feeding the retail banking reporting layer.',
      skills: ['Python', 'ETL', 'SQL'],
      statusHistory: [
        { stage: 'Applied', date: '2026-06-07' },
      ],
    },
    {
      id: 'app-006',
      jobTitle: 'Product Analyst',
      company: 'AirAsia Digital',
      matchPercent: 81,
      stage: 'Applied',
      dateApplied: '2026-06-09',
      logoEmoji: '✈️',
      logoBg: 'bg-rose-100',
      location: 'Sepang (Hybrid)',
      workType: 'Full-time · Associate',
      salary: 'RM 4,500 – 5,500 / month',
      description: 'Partner with product managers on funnel analytics for the super-app booking flow.',
      skills: ['Product analytics', 'SQL', 'A/B testing'],
      statusHistory: [
        { stage: 'Applied', date: '2026-06-09' },
      ],
    },
    {
      id: 'app-007',
      jobTitle: 'Data Analyst',
      company: 'Accenture Malaysia',
      matchPercent: 86,
      stage: 'Under Review',
      dateApplied: '2026-05-25',
      logoEmoji: '🟣',
      logoBg: 'bg-violet-100',
      location: 'Kuala Lumpur (Hybrid)',
      workType: 'Full-time · Consulting',
      salary: 'RM 5,200 – 6,800 / month',
      description: 'Deliver analytics engagements for banking and telco clients across the region.',
      skills: ['SQL', 'Client communication', 'Data storytelling'],
      statusHistory: [
        { stage: 'Applied', date: '2026-05-25' },
        { stage: 'Under Review', date: '2026-06-01' },
      ],
    },
    {
      id: 'app-008',
      jobTitle: 'Analytics Graduate Programme',
      company: 'Maybank',
      matchPercent: 83,
      stage: 'Assessment',
      dateApplied: '2026-05-20',
      logoEmoji: '🟡',
      logoBg: 'bg-amber-100',
      location: 'Kuala Lumpur (On-site)',
      workType: 'Graduate programme · 2 years',
      salary: 'RM 4,000 – 4,800 / month',
      description: 'Two-year rotation across risk, customer, and operations analytics teams.',
      skills: ['SQL', 'Excel modelling', 'Risk analytics'],
      stageTask: {
        label: 'Open the online assessment',
        url: 'https://assessments.careeros.dev/maybank-analytics-2026',
        deadline: '2026-08-24T23:59:00',
        meta: 'Numerical + situational judgement · 90 min · one attempt',
      },
      statusHistory: [
        { stage: 'Applied', date: '2026-05-20' },
        { stage: 'Under Review', date: '2026-05-27' },
        { stage: 'Assessment', date: '2026-06-06' },
      ],
    },
    {
      id: 'app-009',
      jobTitle: 'Junior Data Analyst',
      company: 'TalentBank',
      matchPercent: 90,
      stage: 'Offer',
      dateApplied: '2026-05-12',
      logoEmoji: '🟦',
      logoBg: 'bg-sky-100',
      location: 'Kuala Lumpur (Hybrid)',
      workType: 'Full-time · Junior',
      salary: 'RM 4,600 / month',
      description: 'Build the talent-intelligence reporting that powers employer dashboards.',
      skills: ['SQL', 'Python', 'Data visualisation'],
      stageTask: {
        label: 'Review and sign the offer letter',
        url: 'https://sign.careeros.dev/talentbank-offer-chris-lee',
        deadline: '2026-08-28T17:00:00',
        meta: 'Digital signature · offer lapses if unsigned',
      },
      statusHistory: [
        { stage: 'Applied', date: '2026-05-12' },
        { stage: 'Under Review', date: '2026-05-18' },
        { stage: 'Interview', date: '2026-05-26' },
        { stage: 'Assessment', date: '2026-06-02' },
        { stage: 'Offer', date: '2026-06-10' },
      ],
    },
  ],
  moveApplicationStage: (appId, newStage) => set((state) => ({
    applications: state.applications.map((app) =>
      app.id === appId
        ? {
            ...app,
            stage: newStage,
            statusHistory: [
              ...app.statusHistory,
              { stage: newStage, date: new Date().toISOString().split('T')[0] },
            ],
          }
        : app
    ),
  })),
  addApplication: (job) => set((state) => ({
    applications: [
      {
        id: `app-${Date.now()}`,
        jobTitle: job.title || job.jobTitle,
        company: job.company,
        matchPercent: job.matchPercent || job.matchScore || 75,
        stage: 'Applied',
        dateApplied: new Date().toISOString().split('T')[0],
        logoEmoji: '📋',
        logoBg: 'bg-slate-100',
        statusHistory: [
          { stage: 'Applied', date: new Date().toISOString().split('T')[0] },
        ],
      },
      ...state.applications,
    ],
  })),

  // ─── Opportunities Hub — Application Tracker sidebar (Round 2) ─────
  opportunityTracker: opportunitiesHub.applicationTracker,
  addOpportunityTrackerEntry: (entry) =>
    set((state) => ({
      opportunityTracker: [
        {
          id: `track-${Date.now()}`,
          ...entry,
        },
        ...state.opportunityTracker,
      ],
    })),
}))
