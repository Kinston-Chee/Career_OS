import React, { useEffect, useRef, useState } from 'react'
import { CheckCircle2, Pencil, X } from 'lucide-react'
import HomeTopNav from '../components/home/HomeTopNav'
import CompanionChatPanel from '../components/careerMemory/CompanionChatPanel'
import MemoryTimeline from '../components/careerMemory/MemoryTimeline'
import AISignalsPanel from '../components/careerMemory/AISignalsPanel'
import GapsPanel from '../components/careerMemory/GapsPanel'
import { candidateOverview, careerMemoryDemo, careerMemoryView, mockUser } from '../data/mockData'

const MEMORY_DETAILS = {
  'mem-1': {
    type: 'Internship',
    title: 'Software Engineering Intern',
    organisation: 'Grab',
    dateRange: 'Jun-Aug 2024',
    status: 'Verified',
    description: 'Completed a software engineering internship at Grab, contributing to frontend feature development and agile product workflows.',
    skills: ['React', 'Agile', 'Leadership', 'Frontend Development', 'Collaboration'],
    evidence: ['Internship confirmation', 'Project screenshot', 'Supervisor feedback'],
    insight: "This experience strengthens Chris's software engineering signal. It shows real workplace exposure, product collaboration, and applied React experience.",
    actions: ['Add project outcome', 'Attach GitHub or screenshot evidence', 'Use in software intern applications'],
  },
  'mem-2': {
    type: 'Leadership / Society',
    title: 'Vice President',
    organisation: "Taylor's Computing Society",
    dateRange: '2023-2024',
    status: 'Self-reported',
    description: "Served as Vice President of Taylor's Computing Society, helping coordinate student initiatives, events, and community activities.",
    skills: ['Leadership', 'Event Management', 'Communication', 'Team Coordination', 'Stakeholder Management'],
    evidence: ['Society appointment proof', 'Event posters', 'Photos or certificates'],
    insight: "This experience supports Chris's initiative-driven profile. It signals leadership, ownership, and ability to organise people around technical communities.",
    actions: ['Add event impact numbers', 'Add photos or event proof', 'Connect this to leadership narrative'],
  },
  'mem-3': {
    type: 'Hackathon / Competition',
    title: 'Hackathon - Top 3 Finalist',
    organisation: 'Hackathon',
    dateRange: 'Oct 2023',
    status: 'Self-reported',
    description: 'Reached Top 3 finalist position in a hackathon by developing and presenting a solution under time constraints.',
    skills: ['Problem Solving', 'Product Thinking', 'Presentation', 'Teamwork', 'Rapid Prototyping'],
    evidence: ['Certificate', 'Pitch deck', 'Demo screenshot', 'GitHub repository'],
    insight: 'This experience is a strong proof point for problem-solving, fast execution, and communication under pressure. It can be used as evidence for startup, product, and AI-related roles.',
    actions: ['Add problem statement', 'Add solution summary', 'Attach pitch deck or demo'],
  },
  'mem-4': {
    type: 'Academic Achievement',
    title: "Dean's List - Semester 4",
    organisation: "Taylor's University",
    dateRange: '2023',
    status: 'Self-reported',
    description: "Received Dean's List recognition for strong academic performance in Semester 4.",
    skills: ['Academic Excellence', 'Discipline', 'Analytical Thinking'],
    evidence: ['Transcript', 'Award letter'],
    insight: "This strengthens Chris's academic reliability signal. It is useful supporting evidence for competitive internships and graduate programmes.",
    actions: ['Attach transcript proof', 'Connect this to scholarship or graduate programme applications'],
  },
}

const DRAFT_MEMORY_ID = 'draft-grab-data-engineering'
const DRAFT_MEMORY_DETAILS = {
  type: 'Internship',
  title: 'Data Engineering Intern',
  organisation: 'Grab',
  dateRange: 'Jun-Aug 2024',
  status: 'Self-reported',
  description: 'Worked on Grab data pipeline tasks and helped onboard 2 new interns during a summer internship.',
  skills: ['Data Pipeline', 'Leadership', 'Mentoring'],
  evidence: ['Onboarding notes', 'Pipeline task summary', 'Internship confirmation'],
  insight: "This generated entry adds data engineering and mentoring evidence to Chris's Career Memory. Adding a project link or outcome metric would make the signal stronger.",
  actions: ['Add a project link', 'Add pipeline outcome metrics', 'Attach manager or peer feedback'],
}

const splitList = (value) => value.split(/[\n,]/).map((item) => item.trim()).filter(Boolean)

function DemoToast({ message }) {
  if (!message) return null
  return (
    <div className="fixed bottom-5 right-5 z-50 rounded-2xl border border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.9),rgba(239,246,255,0.7))] px-4 py-3 text-sm font-bold text-[#185FA5] shadow-[0_18px_44px_rgba(37,99,235,0.14),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-xl ring-1 ring-blue-100/50">
      {message}
    </div>
  )
}

function CareerMemoryDetailModal({ memory, editing, onClose, onEdit, onCancelEdit, onSave }) {
  const [form, setForm] = useState(memory.details)

  useEffect(() => setForm(memory.details), [memory])

  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }))
  const inputClass = 'w-full rounded-2xl border border-white/70 bg-white/65 px-3 py-2 text-sm font-semibold text-[#263556] outline-none transition focus:border-blue-300 focus:bg-white/85'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/10 px-4 py-6 backdrop-blur-sm">
      <section role="dialog" aria-modal="true" className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[28px] border border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.88),rgba(239,246,255,0.68))] p-6 shadow-[0_24px_80px_rgba(15,23,42,0.14),inset_0_1px_0_rgba(255,255,255,0.9)] ring-1 ring-blue-100/50 backdrop-blur-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-blue-100 bg-blue-50/80 px-2.5 py-1 text-xs font-bold text-blue-700">{form.type}</span>
              <span className="rounded-full border border-white/70 bg-white/65 px-2.5 py-1 text-xs font-bold text-[#637094]">{form.dateRange}</span>
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-100 bg-emerald-50/80 px-2.5 py-1 text-xs font-bold text-emerald-700">
                <CheckCircle2 size={12} /> {form.status}
              </span>
            </div>
            <h2 className="mt-3 text-xl font-black text-[#11194a]">{form.title}</h2>
            <p className="mt-1 text-sm font-semibold text-[#637094]">{form.organisation}</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-full p-2 text-[#7382a1] transition hover:bg-blue-50 hover:text-blue-700">
            <X size={18} />
          </button>
        </div>

        {editing ? (
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <label className="text-xs font-bold text-[#637094]">Title<input className={`${inputClass} mt-1`} value={form.title} onChange={(event) => update('title', event.target.value)} /></label>
            <label className="text-xs font-bold text-[#637094]">Organisation<input className={`${inputClass} mt-1`} value={form.organisation} onChange={(event) => update('organisation', event.target.value)} /></label>
            <label className="text-xs font-bold text-[#637094]">Date range<input className={`${inputClass} mt-1`} value={form.dateRange} onChange={(event) => update('dateRange', event.target.value)} /></label>
            <label className="text-xs font-bold text-[#637094]">Status<input className={`${inputClass} mt-1`} value={form.status} onChange={(event) => update('status', event.target.value)} /></label>
            <label className="sm:col-span-2 text-xs font-bold text-[#637094]">Description<textarea className={`${inputClass} mt-1 min-h-24 resize-none`} value={form.description} onChange={(event) => update('description', event.target.value)} /></label>
            <label className="text-xs font-bold text-[#637094]">Skills<textarea className={`${inputClass} mt-1 min-h-24 resize-none`} value={Array.isArray(form.skills) ? form.skills.join(', ') : form.skills} onChange={(event) => update('skills', event.target.value)} /></label>
            <label className="text-xs font-bold text-[#637094]">Evidence<textarea className={`${inputClass} mt-1 min-h-24 resize-none`} value={Array.isArray(form.evidence) ? form.evidence.join(', ') : form.evidence} onChange={(event) => update('evidence', event.target.value)} /></label>
          </div>
        ) : (
          <div className="mt-5 grid gap-3">
            <DetailSection title="Overview">{form.description}</DetailSection>
            <DetailSection title="Skills & signals">
              <PillList items={form.skills} />
            </DetailSection>
            <DetailSection title="Evidence">
              <PillList items={form.evidence} muted />
            </DetailSection>
            <DetailSection title="AI CareerOS insight">{form.insight}</DetailSection>
            <DetailSection title="Suggested actions">
              <PillList items={form.actions} muted />
            </DetailSection>
          </div>
        )}

        <div className="mt-5 flex flex-wrap justify-end gap-2">
          {editing ? (
            <>
              <button type="button" onClick={onCancelEdit} className="rounded-full border border-blue-100 bg-white/70 px-4 py-2 text-sm font-bold text-blue-700 transition hover:bg-blue-50">Cancel</button>
              <button
                type="button"
                onClick={() => onSave({ ...form, skills: splitList(String(form.skills)), evidence: splitList(String(form.evidence)) })}
                className="rounded-full bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-[0_12px_30px_rgba(37,99,235,0.25)] transition hover:bg-blue-700"
              >
                Save changes
              </button>
            </>
          ) : (
            <button type="button" onClick={onEdit} className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-[0_12px_30px_rgba(37,99,235,0.25)] transition hover:bg-blue-700">
              <Pencil size={14} /> Edit
            </button>
          )}
        </div>
      </section>
    </div>
  )
}

function DetailSection({ title, children }) {
  return (
    <section className="rounded-2xl border border-white/70 bg-white/55 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.75),0_8px_24px_rgba(37,99,235,0.06)]">
      <h3 className="text-xs font-bold uppercase tracking-wide text-blue-600">{title}</h3>
      <div className="mt-2 text-sm font-medium leading-6 text-[#3a4669]">{children}</div>
    </section>
  )
}

function PillList({ items, muted = false }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span key={item} className={`rounded-full border px-2.5 py-1 text-xs font-bold ${muted ? 'border-slate-100 bg-white/70 text-[#637094]' : 'border-blue-100 bg-blue-50/80 text-blue-700'}`}>
          {item}
        </span>
      ))}
    </div>
  )
}

export default function MemoryProfilePage() {
  const readiness = candidateOverview.careerSnapshot.readiness
  const [timeline, setTimeline] = useState(() => careerMemoryView.timeline.map((entry) => ({ ...entry, details: MEMORY_DETAILS[entry.id] })))
  const [draftDetails, setDraftDetails] = useState(DRAFT_MEMORY_DETAILS)
  const [draftPhase, setDraftPhase] = useState('hidden')
  const [leadershipBoost, setLeadershipBoost] = useState(false)
  const [activeMemory, setActiveMemory] = useState(null)
  const [editing, setEditing] = useState(false)
  const [toast, setToast] = useState('')
  const toastRef = useRef(null)

  useEffect(() => () => window.clearTimeout(toastRef.current), [])

  const showToast = (message) => {
    window.clearTimeout(toastRef.current)
    setToast(message)
    toastRef.current = window.setTimeout(() => setToast(''), 1800)
  }

  const openMemory = (entry, edit = false) => {
    setActiveMemory(entry)
    setEditing(edit)
  }

  const saveMemory = (details) => {
    const nextTitle = `${details.title} - ${details.organisation}`
    if (activeMemory.id === DRAFT_MEMORY_ID) {
      setDraftDetails(details)
      setActiveMemory((current) => ({ ...current, title: nextTitle, period: details.dateRange, tags: details.skills.slice(0, 3), verified: details.status.toLowerCase().includes('verified'), details }))
      setEditing(false)
      showToast('Career Memory updated')
      return
    }
    setTimeline((current) => current.map((entry) => (
      entry.id === activeMemory.id
        ? { ...entry, title: nextTitle, period: details.dateRange, tags: details.skills.slice(0, 3), verified: details.status.toLowerCase().includes('verified'), details }
        : entry
    )))
    setActiveMemory((current) => ({ ...current, title: nextTitle, period: details.dateRange, tags: details.skills.slice(0, 3), verified: details.status.toLowerCase().includes('verified'), details }))
    setEditing(false)
    showToast('Career Memory updated')
  }

  const draftTimelineEntry = {
    ...careerMemoryDemo.draftEntry,
    title: `${draftDetails.organisation} - ${draftDetails.title}`,
    date: draftDetails.dateRange,
    tags: draftDetails.skills.slice(0, 3).map((label, index) => ({ label, confirmedTone: ['blue', 'violet', 'emerald'][index] ?? 'blue' })),
  }

  const draftMemory = {
    id: DRAFT_MEMORY_ID,
    title: `${draftDetails.title} - ${draftDetails.organisation}`,
    period: draftDetails.dateRange,
    tags: draftDetails.skills.slice(0, 3),
    verified: draftDetails.status.toLowerCase().includes('verified'),
    details: draftDetails,
  }

  return (
    <div className="min-h-screen bg-[#f6f9ff] text-[#121a3a]">
      <HomeTopNav user={mockUser} readiness={readiness} />

      <div className="mx-auto max-w-[1480px] px-4 py-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[300px_minmax(0,1fr)_320px]">
          <div className="min-w-0 lg:h-[calc(100vh-7rem)]">
            <CompanionChatPanel
              companion={careerMemoryView.companion}
              onShowDraft={() => setDraftPhase('typing')}
              onConfirmDraft={() => setDraftPhase('confirming')}
            />
          </div>

          <div className="min-w-0">
            <MemoryTimeline
              timeline={timeline}
              draftEntry={draftTimelineEntry}
              draftPhase={draftPhase}
              onSignalBoost={() => setLeadershipBoost(true)}
              onOpenMemory={(entry) => openMemory(entry)}
              onEditMemory={(entry) => openMemory(entry, true)}
              onEditDraft={() => openMemory(draftMemory, true)}
            />
          </div>

          <div className="min-w-0 space-y-4">
            <AISignalsPanel signals={careerMemoryView.aiSignals} leadershipBoost={leadershipBoost} />
            <GapsPanel gaps={careerMemoryView.gaps} />
          </div>
        </div>
      </div>

      {activeMemory && (
        <CareerMemoryDetailModal
          memory={activeMemory}
          editing={editing}
          onClose={() => setActiveMemory(null)}
          onEdit={() => setEditing(true)}
          onCancelEdit={() => setEditing(false)}
          onSave={saveMemory}
        />
      )}
      <DemoToast message={toast} />
    </div>
  )
}
