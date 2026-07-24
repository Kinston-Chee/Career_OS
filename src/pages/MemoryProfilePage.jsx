import React, { useEffect, useRef, useState } from 'react'
import { Building2, Calendar, CheckCircle2, FileText, ListChecks, Paperclip, Pencil, Sparkles, Tag as TagIcon, X } from 'lucide-react'
import HomeTopNav from '../components/home/HomeTopNav'
import CompanionChatPanel from '../components/careerMemory/CompanionChatPanel'
import MemoryTimeline from '../components/careerMemory/MemoryTimeline'
import AISignalsPanel from '../components/careerMemory/AISignalsPanel'
import GapsPanel from '../components/careerMemory/GapsPanel'
import AddExperienceModal from '../components/careerMemory/AddExperienceModal'
import SkillGapAnalysis from '../components/careerMemory/SkillGapAnalysis'
import { fetchExperienceDraft } from '../services/careerMemoryApi'
import { chatWithCompanion } from '../services/companionChatApi'
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

const DETAIL_INPUT_CLASS =
  'w-full rounded-xl border border-white/70 bg-white/85 px-3.5 py-2.5 text-sm font-semibold text-[#2c3656] outline-none transition placeholder:text-[#9aa6c3] focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-100'

function ensureArray(value) {
  if (Array.isArray(value)) return value
  if (typeof value === 'string' && value.trim()) {
    return value.split(/[\n,]/).map((s) => s.trim()).filter(Boolean)
  }
  return []
}

function ChipInput({ items, draft, onDraftChange, onAdd, onRemove, placeholder }) {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault()
      onAdd(draft)
    } else if (event.key === 'Backspace' && !draft && items.length > 0) {
      onRemove(items[items.length - 1])
    }
  }
  return (
    <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-white/70 bg-white/85 px-3 py-2 transition focus-within:border-blue-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-100">
      {items.map((item) => (
        <span key={item} className="inline-flex items-center gap-1 rounded-full border border-blue-100 bg-blue-50/85 px-2.5 py-1 text-xs font-bold text-blue-700">
          {item}
          <button type="button" onClick={() => onRemove(item)} className="rounded-full p-0.5 text-blue-500 transition hover:bg-blue-100 hover:text-blue-700" aria-label={`Remove ${item}`}>
            <X size={11} strokeWidth={2.6} />
          </button>
        </span>
      ))}
      <input
        value={draft}
        onChange={(event) => {
          const value = event.target.value
          if (value.endsWith(',')) onAdd(value)
          else onDraftChange(value)
        }}
        onKeyDown={handleKeyDown}
        onBlur={() => draft.trim() && onAdd(draft)}
        placeholder={items.length === 0 ? placeholder : ''}
        className="flex-1 min-w-[8rem] bg-transparent text-sm font-semibold text-[#2c3656] outline-none placeholder:text-[#9aa6c3]"
      />
    </div>
  )
}

function CareerMemoryDetailModal({ memory, editing, onClose, onEdit, onCancelEdit, onSave }) {
  const [form, setForm] = useState(() => ({
    ...memory.details,
    skills: ensureArray(memory.details.skills),
    evidence: ensureArray(memory.details.evidence),
    actions: ensureArray(memory.details.actions),
  }))
  const [skillDraft, setSkillDraft] = useState('')
  const [evidenceDraft, setEvidenceDraft] = useState('')
  const [actionDraft, setActionDraft] = useState('')

  useEffect(() => {
    setForm({
      ...memory.details,
      skills: ensureArray(memory.details.skills),
      evidence: ensureArray(memory.details.evidence),
      actions: ensureArray(memory.details.actions),
    })
    setSkillDraft('')
    setEvidenceDraft('')
    setActionDraft('')
  }, [memory])

  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }))

  const addChip = (field, draftSetter) => (raw) => {
    const clean = raw.trim().replace(/,+$/, '')
    if (!clean) return
    setForm((current) => {
      const list = ensureArray(current[field])
      if (list.includes(clean)) return current
      return { ...current, [field]: [...list, clean] }
    })
    draftSetter('')
  }
  const removeChip = (field) => (item) => {
    setForm((current) => ({ ...current, [field]: ensureArray(current[field]).filter((s) => s !== item) }))
  }

  const handleSave = () => {
    const finalSkills = skillDraft.trim() ? [...ensureArray(form.skills), skillDraft.trim()] : ensureArray(form.skills)
    const finalEvidence = evidenceDraft.trim() ? [...ensureArray(form.evidence), evidenceDraft.trim()] : ensureArray(form.evidence)
    const finalActions = actionDraft.trim() ? [...ensureArray(form.actions), actionDraft.trim()] : ensureArray(form.actions)
    onSave({ ...form, skills: finalSkills, evidence: finalEvidence, actions: finalActions })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/15 px-4 py-6 backdrop-blur-sm">
      <section role="dialog" aria-modal="true" className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-[28px] border border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(239,246,255,0.74))] p-6 shadow-[0_28px_80px_rgba(15,23,42,0.18),inset_0_1px_0_rgba(255,255,255,0.9)] ring-1 ring-blue-100/50 backdrop-blur-2xl">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-[0_10px_24px_rgba(37,99,235,0.28)]">
              <Sparkles size={20} strokeWidth={2.2} />
            </span>
            <div className="min-w-0">
              <h2 className="text-lg font-black text-[#11194a] sm:text-xl">{form.title}</h2>
              <p className="mt-0.5 text-sm font-semibold text-[#637094]">{form.organisation}</p>
              <div className="mt-2 flex flex-wrap items-center gap-1.5">
                <span className="rounded-full border border-blue-100 bg-blue-50/80 px-2.5 py-1 text-[11px] font-bold text-blue-700">{form.type}</span>
                <span className="rounded-full border border-white/70 bg-white/65 px-2.5 py-1 text-[11px] font-bold text-[#637094]">{form.dateRange}</span>
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-100 bg-emerald-50/80 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
                  <CheckCircle2 size={11} /> {form.status}
                </span>
              </div>
            </div>
          </div>
          <button type="button" onClick={onClose} className="rounded-full p-2 text-[#7382a1] transition hover:bg-blue-50 hover:text-blue-700" aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {editing ? (
          <div className="mt-6 space-y-5">
            <div className="grid gap-3 sm:grid-cols-2">
              <DetailSection icon={Sparkles} title="Title / Role">
                <input value={form.title} onChange={(event) => update('title', event.target.value)} placeholder="Vice President" className={DETAIL_INPUT_CLASS} />
              </DetailSection>
              <DetailSection icon={Building2} title="Organisation">
                <input value={form.organisation} onChange={(event) => update('organisation', event.target.value)} placeholder="Company, university, or club" className={DETAIL_INPUT_CLASS} />
              </DetailSection>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <DetailSection icon={Calendar} title="Date range">
                <input value={form.dateRange} onChange={(event) => update('dateRange', event.target.value)} placeholder="Jun 2024 – Present" className={DETAIL_INPUT_CLASS} />
              </DetailSection>
              <DetailSection icon={CheckCircle2} title="Status">
                <input value={form.status} onChange={(event) => update('status', event.target.value)} placeholder="Self-reported" className={DETAIL_INPUT_CLASS} />
              </DetailSection>
            </div>

            <DetailSection icon={FileText} title="Overview" hint="A few lines is fine">
              <textarea
                value={form.description}
                onChange={(event) => update('description', event.target.value)}
                placeholder="What you did, what you delivered, and any measurable outcome…"
                rows={3}
                className={`${DETAIL_INPUT_CLASS} resize-none`}
              />
            </DetailSection>

            <DetailSection icon={TagIcon} title="Skills & signals" hint="Press Enter or comma to add">
              <ChipInput
                items={ensureArray(form.skills)}
                draft={skillDraft}
                onDraftChange={setSkillDraft}
                onAdd={addChip('skills', setSkillDraft)}
                onRemove={removeChip('skills')}
                placeholder="Leadership, Event Management…"
              />
            </DetailSection>

            <DetailSection icon={Paperclip} title="Evidence" hint="Press Enter or comma to add">
              <ChipInput
                items={ensureArray(form.evidence)}
                draft={evidenceDraft}
                onDraftChange={setEvidenceDraft}
                onAdd={addChip('evidence', setEvidenceDraft)}
                onRemove={removeChip('evidence')}
                placeholder="Society appointment proof, event posters…"
              />
            </DetailSection>

            <DetailSection icon={Sparkles} title="AI CareerOS insight" hint="Editable summary shown on the detail card">
              <textarea
                value={form.insight}
                onChange={(event) => update('insight', event.target.value)}
                placeholder="What signal this experience adds to your profile…"
                rows={3}
                className={`${DETAIL_INPUT_CLASS} resize-none`}
              />
            </DetailSection>

            <DetailSection icon={ListChecks} title="Suggested actions" hint="Press Enter or comma to add">
              <ChipInput
                items={ensureArray(form.actions)}
                draft={actionDraft}
                onDraftChange={setActionDraft}
                onAdd={addChip('actions', setActionDraft)}
                onRemove={removeChip('actions')}
                placeholder="Add impact numbers, attach photos…"
              />
            </DetailSection>
          </div>
        ) : (
          <div className="mt-6 space-y-5">
            <DetailSection icon={FileText} title="Overview">
              <p className="rounded-xl border border-white/70 bg-white/85 px-3.5 py-2.5 text-sm font-medium leading-6 text-[#2c3656]">{form.description}</p>
            </DetailSection>
            <DetailSection icon={TagIcon} title="Skills & signals">
              <PillList items={form.skills} />
            </DetailSection>
            <DetailSection icon={Paperclip} title="Evidence">
              <PillList items={form.evidence} muted />
            </DetailSection>
            <DetailSection icon={Sparkles} title="AI CareerOS insight" hint="Generated from your profile">
              <p className="rounded-xl border border-blue-100 bg-blue-50/60 px-3.5 py-2.5 text-sm font-medium leading-6 text-[#2c3656] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
                {form.insight}
              </p>
            </DetailSection>
            <DetailSection icon={ListChecks} title="Suggested actions">
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
                onClick={handleSave}
                className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-bold text-white shadow-[0_12px_30px_rgba(37,99,235,0.28)] transition hover:brightness-110"
              >
                <CheckCircle2 size={14} strokeWidth={2.4} /> Save changes
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

function DetailSection({ icon: Icon, title, hint, children }) {
  return (
    <div className="block">
      <span className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-[#637094]">
        {Icon ? <Icon size={13} className="text-blue-600" strokeWidth={2.4} /> : null}
        {title}
        {hint ? <span className="text-[10px] font-medium normal-case text-[#9aa6c3]">· {hint}</span> : null}
      </span>
      {children}
    </div>
  )
}

function PillList({ items, muted = false }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <span
          key={item}
          className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-bold ${
            muted
              ? 'border-white/70 bg-white/85 text-[#637094]'
              : 'border-blue-100 bg-blue-50/85 text-blue-700'
          }`}
        >
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
  const [isAddOpen, setIsAddOpen] = useState(false)
  // Prefill for the AddExperienceModal. Set by the AI-fill flow so the
  // modal opens with API-returned values already in place; null means an
  // empty form.
  const [addInitialValues, setAddInitialValues] = useState(null)
  const [isFetchingDraft, setIsFetchingDraft] = useState(false)
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

  const handleAddExperience = (newEntry) => {
    setTimeline((current) => [newEntry, ...current])
    showToast('Experience added to Career Memory')
  }

  // Open an empty AddExperienceModal.
  const openBlankAddModal = () => {
    setAddInitialValues(null)
    setIsAddOpen(true)
  }

  // Ask the FastAPI backend to draft an experience from a free-form
  // prompt (typed into the CompanionChatPanel composer), then pop the
  // AddExperienceModal open with the response already filled in. Falls
  // back to a mock draft when the API isn't reachable (see
  // `src/services/careerMemoryApi.js`). Returns true on success so the
  // chatbox can render an appropriate acknowledgement.
  const handleExtractExperience = async (prompt) => {
    if (isFetchingDraft) return false
    setIsFetchingDraft(true)
    showToast('Drafting from AI…')
    try {
      const { draft, source } = await fetchExperienceDraft(prompt ?? '')
      setAddInitialValues(draft)
      setIsAddOpen(true)
      showToast(source === 'api' ? 'AI draft ready — review and save' : 'Loaded demo draft — review and save')
      return true
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('[MemoryProfilePage] extract-experience failed:', error)
      showToast('Could not fetch AI draft. Try again.')
      return false
    } finally {
      setIsFetchingDraft(false)
    }
  }

  // Whenever the modal closes, drop the prefill so the next "Add
  // Experience" click starts fresh.
  const handleAddModalClose = () => {
    setIsAddOpen(false)
    setAddInitialValues(null)
  }

  // Generic LLM chat for the CompanionChatPanel's Send button. Receives
  // the user's prompt and the OpenAI-style history array the panel
  // built. Returns the assistant reply text; on failure returns an
  // empty string so the panel shows its fallback message.
  const handleGenericChat = async (prompt, history) => {
    try {
      const { reply, data_response } = await chatWithCompanion(prompt, history)
      console.log(data_response)
      if (data_response != null) {
      const extracted_info = data_response.experience_info_agent
      setIsAddOpen(false)
      setAddInitialValues({
        typeId:       extracted_info.category?.toLowerCase() ?? 'experience',
        title:        extracted_info.title ?? 'Default title',
        organisation: extracted_info.organisation ?? 'HWUM',
        startDate:    extracted_info.start_date ?? '',
        endDate:      extracted_info.end_date ?? '',
        description:  extracted_info.details ?? 'This is default details',
        skills:       extracted_info.skills_used ?? [],
        evidenceUrl:  extracted_info.evidence_link ?? '',
      })
      setIsAddOpen(true)
      console.log('experience saved!')
     }

      return reply
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('[MemoryProfilePage] chat failed:', error)
      return ''
    }
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
          {/* Grid placeholder — reserves the 300px column so the rest of the
              layout stays put. The actual chat panel is position: fixed inside
              so it never scrolls with the page. */}
          <div className="min-w-0">
            <div className="lg:fixed lg:top-20 lg:z-10 lg:h-[min(calc(100vh-6rem),36rem)] lg:w-[300px] lg:left-[max(2rem,calc((100vw-1480px)/2+2rem))]">
              <CompanionChatPanel
                companion={careerMemoryView.companion}
                onShowDraft={() => setDraftPhase('typing')}
                onConfirmDraft={() => setDraftPhase('confirming')}
                onExtractExperience={handleExtractExperience}
                onGenericChat={handleGenericChat}
              />
            </div>
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
              onAddExperience={openBlankAddModal}
            />

            {/* Skill-gap analysis sits below the experience timeline. Uses
                its own demo data + local state for target role / industry. */}
            <div className="mt-6">
              <SkillGapAnalysis />
            </div>
          </div>

          {/* Grid placeholder — reserves the 320px column so the layout
              stays put. The actual signals + gaps rail is position: fixed
              inside, so it never scrolls with the page. Uses the same
              max()-based right offset the left companion panel uses on
              the left so both rails align with the centered container on
              wide viewports. */}
          <div className="min-w-0">
            <div className="space-y-4 lg:fixed lg:top-20 lg:z-10 lg:w-[320px] lg:right-[max(2rem,calc((100vw-1480px)/2+2rem))]">
              <AISignalsPanel signals={careerMemoryView.aiSignals} leadershipBoost={leadershipBoost} />
              <GapsPanel gaps={careerMemoryView.gaps} />
            </div>
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
      <AddExperienceModal
        open={isAddOpen}
        initialValues={addInitialValues}
        onClose={handleAddModalClose}
        onSubmit={handleAddExperience}
      />
      <DemoToast message={toast} />
    </div>
  )
}
