import { create } from 'zustand'
import { candidateOverview, initialExperiences, mockUser } from '../data/mockData'

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
      statusHistory: [
        { stage: 'Applied', date: '2026-05-25' },
        { stage: 'Under Review', date: '2026-06-01' },
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
}))
