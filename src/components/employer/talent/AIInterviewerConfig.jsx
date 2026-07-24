import React, { useMemo, useState } from 'react'
import {
  Bell,
  Bot,
  Check,
  ChevronDown,
  Eye,
  FileText,
  GripVertical,
  Info,
  Languages,
  Lightbulb,
  ListChecks,
  Mail,
  MessageSquare,
  Plus,
  RefreshCw,
  Save,
  Sparkles,
  Tag as TagIcon,
  Target,
  Timer,
  Users,
  X,
} from 'lucide-react'

// ── Persona presets ─────────────────────────────────────────────────────────
const PERSONAS = [
  {
    id: 'structured',
    emoji: '🎯',
    title: 'Structured',
    desc: 'Methodical, consistent questions. Best for evaluating technical fit.',
  },
  {
    id: 'conversational',
    emoji: '🤝',
    title: 'Conversational',
    desc: 'Warm and exploratory. Surfaces motivation and culture fit.',
  },
  {
    id: 'challenger',
    emoji: '⚡',
    title: 'Challenger',
    desc: 'Probes thinking with follow-ups. Tests reasoning under pressure.',
  },
]

const STEPS = ['Persona', 'Questions', 'Scoring', 'Schedule', 'Notifications']

const DURATIONS = ['15 minutes', '20 minutes', '30 minutes', '45 minutes']
const LANGUAGES = ['English', 'Mandarin', 'Malay', 'Japanese', 'Korean']

const DEFAULT_QUESTIONS = [
  'Tell me about a project where you had to learn a new technology quickly. What was your approach?',
  "Walk me through how you'd design a REST API endpoint for a user authentication system.",
  'Describe a time you disagreed with a teammate. How did you resolve it?',
  'What interests you about this role at Acme Corporation specifically?',
]

const DEFAULT_SKILLS = ['React', 'Node.js', 'Problem solving', 'REST APIs']

const DEFAULT_SCORING = { technical: 40, problem: 35, culture: 25 }

const NOTIFICATIONS = [
  { id: 'complete', title: 'Candidate completes interview', desc: 'Receive a summary with score and transcript link', default: true },
  { id: 'pass', title: 'Candidate scores above pass threshold', desc: 'Get an immediate alert to fast-track shortlisting', default: true },
  { id: 'noresponse', title: "Candidate doesn't respond within 48 hrs", desc: 'Send a follow-up nudge or alert HR', default: false },
]

// Build a defaults object from a posting so switching postings feels tailored.
function defaultsForPosting(posting) {
  const roleName = posting?.title || 'the role'
  const company = posting?.company || 'Acme Corporation'
  return {
    enabled: false,
    persona: 'structured',
    duration: '20 minutes',
    language: 'English',
    skills: [...DEFAULT_SKILLS],
    roleContext:
      "We're looking for a full-stack intern who can contribute to our consumer-facing React app and FastAPI backend from day one. Strong fundamentals matter more than framework experience.",
    questions: [...DEFAULT_QUESTIONS],
    scoring: { ...DEFAULT_SCORING },
    minPass: 68,
    inviteTiming: 'Auto — when shortlisted',
    windowOpens: '2025-05-20',
    deadline: '2025-05-27',
    emailSubject: `Your first-round interview for ${roleName} @ ${company}`,
    notifications: Object.fromEntries(NOTIFICATIONS.map((n) => [n.id, n.default])),
  }
}

// ── Small UI helpers ────────────────────────────────────────────────────────
function SectionHeader({ Icon, title, right }) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-[#4F62F7]" />
        <h3 className="text-[14px] font-semibold text-[#0F1117]">{title}</h3>
      </div>
      {right}
    </div>
  )
}

function FieldLabel({ Icon, children }) {
  return (
    <div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[.06em] text-[#8892A0]">
      <Icon className="h-3.5 w-3.5" />
      {children}
    </div>
  )
}

const INPUT_CLASS =
  'w-full appearance-none rounded-lg border border-[#E4E7EC] bg-[#F7F8FA] px-3 py-2 text-[13px] text-[#0F1117] outline-none transition focus:border-[#4F62F7] focus:bg-white focus:ring-4 focus:ring-[#4F62F7]/10'

// ── Toggle switch ──────────────────────────────────────────────────────────
function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition ${
        checked ? 'bg-[#4F62F7]' : 'bg-[#D9DEE7]'
      }`}
    >
      <span className={`inline-block h-5 w-5 rounded-full bg-white shadow-sm transition ${checked ? 'translate-x-[22px]' : 'translate-x-0.5'}`} />
    </button>
  )
}

// ── Chip input ─────────────────────────────────────────────────────────────
function ChipInput({ items, onAdd, onRemove, placeholder }) {
  const [draft, setDraft] = useState('')
  const handleKey = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      const clean = draft.trim().replace(/,+$/, '')
      if (clean && !items.includes(clean)) onAdd(clean)
      setDraft('')
    } else if (e.key === 'Backspace' && !draft && items.length) {
      onRemove(items[items.length - 1])
    }
  }
  return (
    <div className="flex flex-wrap items-center gap-1.5 rounded-lg border border-[#E4E7EC] bg-[#F7F8FA] px-2 py-1.5 focus-within:border-[#4F62F7] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#4F62F7]/10">
      {items.map((item) => (
        <span key={item} className="inline-flex items-center gap-1 rounded-full border border-[#D0D5FE] bg-[#EEF0FE] px-2 py-0.5 text-[12px] font-medium text-[#4F62F7]">
          {item}
          <button type="button" onClick={() => onRemove(item)} className="rounded-full p-0.5 text-[#4F62F7]/70 transition hover:bg-[#D0D5FE] hover:text-[#4F62F7]" aria-label={`Remove ${item}`}>
            <X className="h-3 w-3" />
          </button>
        </span>
      ))}
      <input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={handleKey}
        placeholder={items.length ? '' : placeholder}
        className="min-w-[8rem] flex-1 bg-transparent text-[13px] text-[#0F1117] outline-none placeholder:text-[#8892A0]"
      />
    </div>
  )
}

// ── Progress stepper ───────────────────────────────────────────────────────
function ProgressStepper({ statuses }) {
  const completed = statuses.filter((s) => s === 'done').length
  return (
    <div className="mb-5 flex items-center gap-3">
      <div className="flex flex-1 items-center gap-2">
        {STEPS.map((label, i) => {
          const s = statuses[i]
          const dot = s === 'done' ? 'bg-[#0E9F6E]' : s === 'active' ? 'bg-[#D97706]' : 'bg-[#D9DEE7]'
          const text = s === 'done' ? 'text-[#0E9F6E]' : s === 'active' ? 'text-[#D97706]' : 'text-[#8892A0]'
          return (
            <React.Fragment key={label}>
              <div className="flex items-center gap-1.5">
                <span className={`h-2 w-2 rounded-full ${dot}`} />
                <span className={`text-[12px] font-medium ${text}`}>{label}</span>
              </div>
              {i < STEPS.length - 1 ? <span className="h-px flex-1 bg-[#E4E7EC]" /> : null}
            </React.Fragment>
          )
        })}
      </div>
      <span className="shrink-0 rounded-full bg-[#FEF3C7] px-2.5 py-0.5 text-[11px] font-semibold text-[#92400E]">
        {completed} of {STEPS.length} configured
      </span>
    </div>
  )
}

// ── Persona cards ──────────────────────────────────────────────────────────
function PersonaCards({ value, onChange }) {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
      {PERSONAS.map((p) => {
        const active = value === p.id
        return (
          <button
            key={p.id}
            type="button"
            onClick={() => onChange(p.id)}
            className={`relative flex flex-col rounded-xl border p-4 text-left transition ${
              active ? 'border-[#4F62F7] bg-[#EEF0FE]/50 ring-2 ring-[#4F62F7]/20' : 'border-[#E4E7EC] bg-white hover:border-[#C8CDD6]'
            }`}
          >
            <span className="text-[26px]">{p.emoji}</span>
            <p className="mt-2 text-[14px] font-semibold text-[#0F1117]">{p.title}</p>
            <p className="mt-1 text-[12px] leading-5 text-[#6B6F8A]">{p.desc}</p>
            {active ? (
              <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-[#4F62F7] text-white">
                <Check className="h-3 w-3" />
              </span>
            ) : null}
          </button>
        )
      })}
    </div>
  )
}

// ── Questions list ─────────────────────────────────────────────────────────
function QuestionsList({ questions, setQuestions, onGenerate }) {
  const update = (i, val) => {
    setQuestions((prev) => prev.map((q, idx) => (idx === i ? val : q)))
  }
  const remove = (i) => setQuestions((prev) => prev.filter((_, idx) => idx !== i))
  const add = () => setQuestions((prev) => [...prev, ''])

  return (
    <div>
      <SectionHeader
        Icon={ListChecks}
        title="Interview questions"
        right={
          <button type="button" onClick={onGenerate} className="inline-flex items-center gap-1 text-[12px] font-medium text-[#4F62F7] hover:underline">
            Generate with AI <Sparkles className="h-3 w-3" />
          </button>
        }
      />
      <div className="flex flex-col gap-1.5">
        {questions.map((q, i) => (
          <div key={i} className="flex items-center gap-2 rounded-lg border border-[#EEF0FE] bg-[#F7F8FF] px-3 py-2">
            <GripVertical className="h-3.5 w-3.5 shrink-0 text-[#C8CDD6]" />
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#EEF0FE] text-[11px] font-semibold text-[#4F62F7]">
              {i + 1}
            </span>
            <input
              value={q}
              onChange={(e) => update(i, e.target.value)}
              placeholder="Type your question…"
              className="flex-1 bg-transparent text-[13px] text-[#0F1117] outline-none placeholder:text-[#8892A0]"
            />
            <button type="button" onClick={() => remove(i)} className="rounded-full p-1 text-[#8892A0] transition hover:bg-white hover:text-[#DC2626]" aria-label="Remove question">
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={add}
        className="mt-2 flex w-full items-center justify-center gap-1 rounded-lg border border-dashed border-[#C8CDD6] bg-transparent px-3 py-2 text-[13px] font-medium text-[#4F62F7] transition hover:bg-[#F7F8FA]"
      >
        <Plus className="h-3.5 w-3.5" /> Add question
      </button>
      <div className="mt-3 flex items-start gap-2 rounded-lg bg-[#EEF0FE] px-3 py-2 text-[12px] text-[#4F62F7]">
        <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        The AI will ask these as a baseline and generate 1–2 follow-up probes per answer based on what the candidate says. Questions are not shown to candidates in advance.
      </div>
    </div>
  )
}

// ── Scoring sliders ────────────────────────────────────────────────────────
const SCORING_META = {
  technical: { title: 'Technical depth', desc: 'React, APIs, system design', Icon: FileText },
  problem: { title: 'Problem solving', desc: 'Reasoning & adaptability', Icon: Target },
  culture: { title: 'Culture fit', desc: 'Communication & values', Icon: Users },
}

function ScoringPanel({ scoring, setScoring, minPass, setMinPass, onReset }) {
  const setPct = (key, val) => {
    const clamped = Math.max(0, Math.min(100, val))
    setScoring((prev) => ({ ...prev, [key]: clamped }))
  }
  return (
    <div>
      <SectionHeader
        Icon={FileText}
        title="Evaluation scoring"
        right={
          <button type="button" onClick={onReset} className="text-[12px] font-medium text-[#4F62F7] hover:underline">
            Reset to default
          </button>
        }
      />
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {Object.entries(SCORING_META).map(([key, meta]) => (
          <div key={key} className="rounded-xl border border-[#E4E7EC] bg-[#F7F8FF] p-3">
            <div className="flex items-center gap-1.5 text-[12px] font-semibold text-[#0F1117]">
              <meta.Icon className="h-3.5 w-3.5 text-[#4F62F7]" />
              {meta.title}
            </div>
            <input
              type="range"
              min={0}
              max={100}
              step={5}
              value={scoring[key]}
              onChange={(e) => setPct(key, parseInt(e.target.value, 10))}
              className="ai-slider mt-3 h-1 w-full cursor-pointer appearance-none rounded-[2px] bg-[#D9DEE7] outline-none"
            />
            <p className="mt-2 text-[20px] font-bold text-[#4F62F7]">{scoring[key]}%</p>
            <p className="text-[11px] text-[#8892A0]">{meta.desc}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-3">
        <FieldLabel Icon={Sparkles}>Minimum pass score</FieldLabel>
        <div className="flex flex-1 items-center gap-2">
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={minPass}
            onChange={(e) => setMinPass(parseInt(e.target.value, 10))}
            className="ai-slider h-1 flex-1 cursor-pointer appearance-none rounded-[2px] bg-[#D9DEE7] outline-none"
          />
          <span className="w-10 text-right text-[13px] font-bold text-[#4F62F7]">{minPass}%</span>
        </div>
      </div>
    </div>
  )
}

// ── Notifications list ─────────────────────────────────────────────────────
function NotificationsList({ values, setValues }) {
  return (
    <div>
      <SectionHeader Icon={Bell} title="HR notifications" />
      <div className="flex flex-col gap-2">
        {NOTIFICATIONS.map((n) => (
          <div key={n.id} className="flex items-center justify-between gap-3 rounded-lg border border-[#EEF0FE] bg-[#F7F8FF] px-4 py-3">
            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-[#0F1117]">{n.title}</p>
              <p className="mt-0.5 text-[12px] text-[#6B6F8A]">{n.desc}</p>
            </div>
            <Toggle checked={!!values[n.id]} onChange={(v) => setValues((prev) => ({ ...prev, [n.id]: v }))} label={n.title} />
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Main config component ──────────────────────────────────────────────────
export default function AIInterviewerConfig({ posting, onNotify }) {
  const initial = useMemo(() => defaultsForPosting(posting), [posting?.id])
  // Per-posting local config store, keyed by posting id so switching postings preserves state.
  const [store, setStore] = useState({ [posting.id]: initial })

  const config = store[posting.id] || initial
  const update = (patch) => setStore((prev) => ({ ...prev, [posting.id]: { ...(prev[posting.id] || initial), ...patch } }))

  // Step statuses derived from what's filled in.
  const statuses = useMemo(() => {
    return [
      config.persona ? 'done' : 'active',
      config.questions.filter(Boolean).length >= 3 ? 'done' : 'active',
      config.scoring.technical + config.scoring.problem + config.scoring.culture === 100 ? 'done' : 'active',
      config.windowOpens && config.deadline ? 'done' : 'active',
      Object.values(config.notifications).some(Boolean) ? 'done' : 'active',
    ]
  }, [config])

  const setQuestions = (updater) => update({ questions: typeof updater === 'function' ? updater(config.questions) : updater })
  const setScoring = (updater) => update({ scoring: typeof updater === 'function' ? updater(config.scoring) : updater })
  const setNotifications = (updater) => update({ notifications: typeof updater === 'function' ? updater(config.notifications) : updater })
  const setMinPass = (v) => update({ minPass: v })

  const addSkill = (s) => update({ skills: [...config.skills, s] })
  const removeSkill = (s) => update({ skills: config.skills.filter((x) => x !== s) })

  const generateQuestions = () => {
    update({
      questions: [
        `Walk me through a ${config.skills[0] || 'React'} project you built end-to-end.`,
        'Describe a bug that took you the longest to find. How did you debug it?',
        'Given a slow API endpoint, how would you diagnose and fix it?',
        `What excites you about working on ${posting?.title || 'this role'}?`,
      ],
    })
    onNotify?.('AI drafted 4 new questions')
  }

  const resetScoring = () => update({ scoring: { ...DEFAULT_SCORING }, minPass: 68 })

  const resetAll = () => {
    const fresh = defaultsForPosting(posting)
    update(fresh)
    onNotify?.('AI Interviewer config reset to defaults')
  }

  const save = () => onNotify?.(`AI Interviewer configuration saved for ${posting.title}`)
  const preview = () => onNotify?.('Opening interview preview…')

  return (
    <section className="overflow-hidden rounded-2xl border border-[#E4E7EC] bg-white">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 border-b border-[#E4E7EC] bg-gradient-to-r from-[#EEF0FE] to-white px-5 py-4">
        <div className="flex items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#4F62F7]">
            <Bot className="h-5 w-5 text-white" />
          </span>
          <div>
            <p className="text-[15px] font-bold text-[#0F1117]">AI Interviewer</p>
            <p className="mt-0.5 text-[12px] text-[#6B6F8A]">Conducts a structured first-round interview with shortlisted candidates</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-[12px] font-medium ${config.enabled ? 'text-[#0E9F6E]' : 'text-[#8892A0]'}`}>
            {config.enabled ? 'Enabled' : 'Disabled'}
          </span>
          <Toggle checked={config.enabled} onChange={(v) => { update({ enabled: v }); onNotify?.(v ? 'AI Interviewer enabled' : 'AI Interviewer disabled') }} label="Enable AI Interviewer" />
        </div>
      </div>

      <div className="px-5 py-5">
        <ProgressStepper statuses={statuses} />

        {/* Persona */}
        <div className="mb-5">
          <SectionHeader
            Icon={MessageSquare}
            title="Interviewer persona"
            right={
              <button type="button" className="text-[12px] font-medium text-[#4F62F7] hover:underline">Customise voice</button>
            }
          />
          <PersonaCards value={config.persona} onChange={(v) => update({ persona: v })} />
        </div>

        {/* Scope & criteria */}
        <div className="mb-5 border-t border-[#E4E7EC] pt-5">
          <SectionHeader Icon={Target} title="Scope & criteria" />
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div>
              <FieldLabel Icon={Timer}>Interview duration</FieldLabel>
              <div className="relative">
                <select value={config.duration} onChange={(e) => update({ duration: e.target.value })} className={`${INPUT_CLASS} pr-9`}>
                  {DURATIONS.map((d) => <option key={d}>{d}</option>)}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#8892A0]" />
              </div>
            </div>
            <div>
              <FieldLabel Icon={Languages}>Language</FieldLabel>
              <div className="relative">
                <select value={config.language} onChange={(e) => update({ language: e.target.value })} className={`${INPUT_CLASS} pr-9`}>
                  {LANGUAGES.map((l) => <option key={l}>{l}</option>)}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#8892A0]" />
              </div>
            </div>
          </div>

          <div className="mt-3">
            <FieldLabel Icon={TagIcon}>Focus skills &amp; competencies</FieldLabel>
            <ChipInput items={config.skills} onAdd={addSkill} onRemove={removeSkill} placeholder="Add a skill…" />
          </div>

          <div className="mt-3">
            <FieldLabel Icon={FileText}>Role context for AI</FieldLabel>
            <textarea
              value={config.roleContext}
              onChange={(e) => update({ roleContext: e.target.value })}
              rows={3}
              className={`${INPUT_CLASS} resize-y`}
            />
          </div>
        </div>

        {/* Questions */}
        <div className="mb-5 border-t border-[#E4E7EC] pt-5">
          <QuestionsList questions={config.questions} setQuestions={setQuestions} onGenerate={generateQuestions} />
        </div>

        {/* Scoring */}
        <div className="mb-5 border-t border-[#E4E7EC] pt-5">
          <ScoringPanel
            scoring={config.scoring}
            setScoring={setScoring}
            minPass={config.minPass}
            setMinPass={setMinPass}
            onReset={resetScoring}
          />
        </div>

        {/* Schedule */}
        <div className="mb-5 border-t border-[#E4E7EC] pt-5">
          <SectionHeader Icon={Timer} title="Schedule & invites" />
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <div>
              <FieldLabel Icon={Sparkles}>Invite shortlisted candidates</FieldLabel>
              <div className="relative">
                <select value={config.inviteTiming} onChange={(e) => update({ inviteTiming: e.target.value })} className={`${INPUT_CLASS} pr-9`}>
                  <option>Auto — when shortlisted</option>
                  <option>Manual — I'll send invites</option>
                  <option>Daily batch at 9am</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#8892A0]" />
              </div>
            </div>
            <div>
              <FieldLabel Icon={Timer}>Interview window opens</FieldLabel>
              <input type="date" value={config.windowOpens} onChange={(e) => update({ windowOpens: e.target.value })} className={INPUT_CLASS} />
            </div>
            <div>
              <FieldLabel Icon={Timer}>Deadline for candidates</FieldLabel>
              <input type="date" value={config.deadline} onChange={(e) => update({ deadline: e.target.value })} className={INPUT_CLASS} />
            </div>
          </div>
          <div className="mt-3">
            <FieldLabel Icon={Mail}>Invite email subject</FieldLabel>
            <input value={config.emailSubject} onChange={(e) => update({ emailSubject: e.target.value })} className={INPUT_CLASS} />
          </div>
        </div>

        {/* Notifications */}
        <div className="mb-5 border-t border-[#E4E7EC] pt-5">
          <NotificationsList values={config.notifications} setValues={setNotifications} />
        </div>

        {/* Footer actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#E4E7EC] pt-4">
          <p className="inline-flex items-center gap-1.5 text-[12px] text-[#6B6F8A]">
            <Info className="h-3.5 w-3.5 text-[#4F62F7]" />
            {config.enabled ? 'AI Interviewer is active for this posting.' : 'Configuration saved as draft. Enable the toggle to activate.'}
          </p>
          <div className="flex items-center gap-2">
            <button type="button" onClick={resetAll} className="inline-flex items-center gap-1 rounded-lg border border-[#DC2626]/40 bg-white px-3.5 py-1.5 text-[13px] font-medium text-[#DC2626] transition hover:bg-[#DC2626]/5">
              <RefreshCw className="h-3.5 w-3.5" /> Reset
            </button>
            <button type="button" onClick={preview} className="inline-flex items-center gap-1 rounded-lg border border-[#E4E7EC] bg-white px-3.5 py-1.5 text-[13px] font-medium text-[#0F1117] transition hover:bg-[#F7F8FA]">
              <Eye className="h-3.5 w-3.5" /> Preview interview
            </button>
            <button type="button" onClick={save} className="inline-flex items-center gap-1 rounded-lg bg-[#4F62F7] px-3.5 py-1.5 text-[13px] font-semibold text-white transition hover:bg-[#3d50e8]">
              <Save className="h-3.5 w-3.5" /> Save configuration
            </button>
          </div>
        </div>
      </div>

      {/* Slider thumb styling */}
      <style dangerouslySetInnerHTML={{ __html: `
        .ai-slider::-webkit-slider-thumb {
          -webkit-appearance: none; appearance: none;
          width: 16px; height: 16px; border-radius: 50%;
          background: #4F62F7; border: 2px solid #fff;
          box-shadow: 0 1px 4px rgba(79,98,247,.4); cursor: pointer;
        }
        .ai-slider::-moz-range-thumb {
          width: 16px; height: 16px; border-radius: 50%;
          background: #4F62F7; border: 2px solid #fff; cursor: pointer;
        }
      `}} />
    </section>
  )
}
