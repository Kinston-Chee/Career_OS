import React, { useMemo, useState } from 'react'
import {
  Award,
  BookOpen,
  Briefcase,
  CheckCircle2,
  Clock,
  FileText,
  FolderKanban,
  GraduationCap,
  Handshake,
  LayoutGrid,
  Pencil,
  Plus,
  Trophy,
  Users,
} from 'lucide-react'
import TimelineCard from './TimelineCard'
import DraftTimelineCard from './DraftTimelineCard'

// ─── LinkedIn-style categories ────────────────────────────────────────
// Each Career Memory entry's `details.type` (from MEMORY_DETAILS in the
// parent page) is mapped into one of these display categories. When a
// type isn't listed, a keyword heuristic falls through to a sensible
// bucket so nothing is lost.
const CATEGORIES = [
  { id: 'experience', label: 'Experience', description: 'Internships, employment, and work exposure.', icon: Briefcase, tone: 'blue' },
  { id: 'education', label: 'Education', description: 'Academic milestones, degrees, and coursework.', icon: GraduationCap, tone: 'indigo' },
  { id: 'honors', label: 'Honors & Awards', description: 'Competitions, hackathons, and recognitions.', icon: Trophy, tone: 'amber' },
  { id: 'volunteering', label: 'Volunteering & Leadership', description: 'Societies, community work, and volunteer roles.', icon: Handshake, tone: 'emerald' },
  { id: 'projects', label: 'Projects', description: 'Personal and course-based project work.', icon: FolderKanban, tone: 'violet' },
  { id: 'certifications', label: 'Licenses & Certifications', description: 'Verified skill credentials.', icon: Award, tone: 'rose' },
  { id: 'publications', label: 'Publications & Research', description: 'Papers, articles, and research work.', icon: BookOpen, tone: 'sky' },
  { id: 'other', label: 'Other', description: 'Miscellaneous entries that don’t fit yet.', icon: FileText, tone: 'slate' },
]

const CATEGORY_BY_ID = Object.fromEntries(CATEGORIES.map((c) => [c.id, c]))

const CATEGORY_TONES = {
  blue: 'border-blue-100 bg-blue-50/70 text-blue-700',
  indigo: 'border-indigo-100 bg-indigo-50/70 text-indigo-700',
  amber: 'border-amber-100 bg-amber-50/70 text-amber-700',
  emerald: 'border-emerald-100 bg-emerald-50/70 text-emerald-700',
  violet: 'border-violet-100 bg-violet-50/70 text-violet-700',
  rose: 'border-rose-100 bg-rose-50/70 text-rose-700',
  sky: 'border-sky-100 bg-sky-50/70 text-sky-700',
  slate: 'border-slate-100 bg-slate-50/70 text-slate-700',
}

function categoriseEntry(entry) {
  const type = (entry.details?.type ?? '').toLowerCase()
  if (type.includes('intern') || type.includes('experience') || type.includes('job') || type.includes('work')) return 'experience'
  if (type.includes('academic') || type.includes('education') || type.includes('degree') || type.includes('coursework') || type.includes('scholarship')) return 'education'
  if (type.includes('hackathon') || type.includes('competition') || type.includes('award') || type.includes('honor') || type.includes('finalist')) return 'honors'
  if (type.includes('society') || type.includes('leadership') || type.includes('volunteer') || type.includes('community') || type.includes('club')) return 'volunteering'
  if (type.includes('project')) return 'projects'
  if (type.includes('certification') || type.includes('licence') || type.includes('license')) return 'certifications'
  if (type.includes('publication') || type.includes('research') || type.includes('paper')) return 'publications'
  return 'other'
}

// ─── View toggle ──────────────────────────────────────────────────────
function ViewToggle({ view, onChange }) {
  const options = [
    { id: 'timeline', label: 'Timeline', icon: Clock },
    { id: 'categories', label: 'Categories', icon: LayoutGrid },
  ]
  return (
    <div
      role="tablist"
      aria-label="Career Memory view"
      className="inline-flex items-center gap-1 rounded-full border border-[#dfe8fb] bg-white/85 p-1 shadow-[0_4px_10px_rgba(46,82,154,0.06)] backdrop-blur"
    >
      {options.map((opt) => {
        const Icon = opt.icon
        const active = view === opt.id
        return (
          <button
            key={opt.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(opt.id)}
            className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
              active
                ? 'bg-blue-600 text-white shadow-[0_6px_16px_rgba(37,99,235,0.28)]'
                : 'text-[#35507d] hover:bg-blue-50 hover:text-blue-700'
            }`}
          >
            <Icon size={13} strokeWidth={2.4} />
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}

// ─── Category card (used in categorised view) ─────────────────────────
const LOGO_TONES = {
  emerald: 'border-emerald-100 bg-emerald-100/55 text-emerald-700',
  rose: 'border-rose-100 bg-rose-100/55 text-rose-700',
  amber: 'border-amber-100 bg-amber-100/55 text-amber-700',
  blue: 'border-blue-100 bg-blue-100/55 text-blue-700',
}

const TAG_TONES = {
  default: 'border border-blue-100 bg-blue-50/75 text-blue-700',
  orange: 'border border-orange-100 bg-orange-50/75 text-orange-700',
}

const ENTRY_ICONS = { Trophy, GraduationCap }

function CategoryEntryRow({ entry, onOpen, onEdit }) {
  const Icon = entry.icon ? ENTRY_ICONS[entry.icon] : null
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onOpen?.(entry)}
      onKeyDown={(event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return
        event.preventDefault()
        onOpen?.(entry)
      }}
      className="flex w-full items-center gap-4 rounded-2xl border border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.85),rgba(239,246,255,0.5))] p-3.5 text-left shadow-[0_10px_24px_rgba(37,99,235,0.06),inset_0_1px_0_rgba(255,255,255,0.85)] ring-1 ring-blue-100/30 backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200/70 hover:bg-white/90 hover:shadow-[0_16px_36px_rgba(37,99,235,0.10)] focus:outline-none focus:ring-2 focus:ring-blue-200"
    >
      <span className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border text-sm font-bold ${LOGO_TONES[entry.logoTone] ?? LOGO_TONES.blue}`}>
        {Icon ? <Icon size={18} strokeWidth={2} /> : entry.logo}
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate text-sm font-bold text-[#11194a]">{entry.title}</p>
          {entry.verified && (
            <span className="inline-flex flex-shrink-0 items-center gap-1 rounded-full border border-emerald-100 bg-emerald-50/80 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
              <CheckCircle2 size={11} strokeWidth={2.4} /> Verified
            </span>
          )}
        </div>
        <p className="mt-0.5 text-xs font-medium text-[#7382a1]">{entry.period}</p>
        {entry.tags?.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {entry.tags.map((tag) => (
              <span
                key={tag}
                className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${TAG_TONES[entry.tagTone] ?? TAG_TONES.default}`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-shrink-0 flex-col items-end gap-2">
        <div className="flex items-center gap-1" aria-label={`Signal strength ${entry.signalStrength} of 4`}>
          {[1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className={`h-2 w-2 rounded-sm ${i <= (entry.signalStrength ?? 0) ? 'bg-blue-600' : 'bg-blue-100'}`}
            />
          ))}
        </div>
        <span
          role="button"
          tabIndex={0}
          onClick={(event) => {
            event.stopPropagation()
            onEdit?.(entry)
          }}
          onKeyDown={(event) => {
            if (event.key !== 'Enter' && event.key !== ' ') return
            event.preventDefault()
            event.stopPropagation()
            onEdit?.(entry)
          }}
          className="rounded-full p-1.5 text-[#9aa6c3] transition hover:bg-blue-50 hover:text-blue-600"
        >
          <Pencil size={14} />
        </span>
      </div>
    </div>
  )
}

function CategoriesView({ groups, onOpen, onEdit }) {
  const nonEmpty = groups.filter((g) => g.entries.length > 0)
  if (nonEmpty.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-blue-100 bg-white/60 p-8 text-center text-sm font-semibold text-[#7382a1]">
        No experiences to categorise yet. Add one to get started.
      </p>
    )
  }
  return (
    <div className="space-y-6">
      {nonEmpty.map((group) => {
        const Icon = group.icon
        return (
          <section key={group.id} className="rounded-[24px] border border-white/70 bg-white/60 p-5 shadow-[0_16px_40px_rgba(37,99,235,0.06),inset_0_1px_0_rgba(255,255,255,0.85)] ring-1 ring-blue-100/40 backdrop-blur">
            <header className="mb-4 flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className={`flex h-10 w-10 items-center justify-center rounded-full border ${CATEGORY_TONES[group.tone]}`}>
                  <Icon size={17} strokeWidth={2.2} />
                </span>
                <div>
                  <h2 className="text-base font-black text-[#11194a]">{group.label}</h2>
                  <p className="text-xs font-medium text-[#7382a1]">{group.description}</p>
                </div>
              </div>
              <span className="rounded-full border border-blue-100 bg-blue-50/70 px-2.5 py-1 text-[11px] font-bold text-blue-700">
                {group.entries.length} {group.entries.length === 1 ? 'entry' : 'entries'}
              </span>
            </header>

            <div className="space-y-3">
              {group.entries.map((entry) => (
                <CategoryEntryRow key={entry.id} entry={entry} onOpen={onOpen} onEdit={onEdit} />
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────
export default function MemoryTimeline({
  timeline,
  draftEntry,
  draftPhase,
  onSignalBoost,
  onOpenMemory,
  onEditMemory,
  onEditDraft,
}) {
  const [view, setView] = useState('timeline')

  const groups = useMemo(() => {
    const bucket = Object.fromEntries(CATEGORIES.map((c) => [c.id, []]))
    timeline.forEach((entry) => {
      const categoryId = categoriseEntry(entry)
      bucket[categoryId].push(entry)
    })
    return CATEGORIES.map((cat) => ({
      ...cat,
      entries: bucket[cat.id],
    }))
  }, [timeline])

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-[-0.01em] text-[#11194a] sm:text-3xl">Career Memory</h1>
          <p className="mt-1 text-sm font-medium text-[#637094]">Your career story, built over time.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <ViewToggle view={view} onChange={setView} />
          <button
            type="button"
            className="flex flex-shrink-0 items-center gap-1.5 rounded-full bg-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700"
          >
            <Plus size={16} strokeWidth={2.4} /> Add Experience
          </button>
        </div>
      </div>

      {view === 'timeline' ? (
        <div className="relative">
          <span className="absolute bottom-3 left-[3px] top-3 w-px bg-[#dde6f7]" />

          {draftPhase && draftPhase !== 'hidden' && (
            <DraftTimelineCard entry={draftEntry} phase={draftPhase} onSignalBoost={onSignalBoost} onEdit={onEditDraft} />
          )}
          {timeline.map((entry) => (
            <TimelineCard key={entry.id} entry={entry} onOpen={onOpenMemory} onEdit={onEditMemory} />
          ))}
        </div>
      ) : (
        <CategoriesView groups={groups} onOpen={onOpenMemory} onEdit={onEditMemory} />
      )}
    </div>
  )
}
