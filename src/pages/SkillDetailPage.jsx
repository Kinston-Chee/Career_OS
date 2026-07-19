import React, { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  Award,
  BookOpen,
  Check,
  ChevronDown,
  Code2,
  Database,
  ExternalLink,
  FileText,
  Flame,
  GraduationCap,
  Laptop,
  LayoutGrid,
  Library,
  ListChecks,
  Lock,
  Merge,
  Network,
  Pencil,
  Plus,
  Route,
  Search,
  Sparkles,
  Table2,
  Target,
  TrendingUp,
  UserCheck,
  Video,
  Wrench,
  Zap,
} from 'lucide-react'
import HomeTopNav from '../components/home/HomeTopNav'
import { candidateOverview, mockUser } from '../data/mockData'
import { CAT_PALETTE } from '../data/skillDevelopmentData'
import { getSkillDetail } from '../data/skillDetailData'

// ─── Icon maps ────────────────────────────────────────────────────────
const MILESTONE_TYPE_ICON = {
  video: Video,
  laptop: Laptop,
  layout: LayoutGrid,
  zap: Zap,
  'user-check': UserCheck,
  target: Target,
}

const GROUP_ICON = {
  table: Table2,
  file: FileText,
  merge: Merge,
  code: Code2,
  network: Network,
  wrench: Wrench,
  search: Search,
  database: Database,
  checklist: ListChecks,
}

const RESOURCE_ICON = {
  book: BookOpen,
  youtube: Video,
  video: Video,
  school: GraduationCap,
  laptop: Laptop,
  article: FileText,
  certificate: Award,
  code: Code2,
  atom: Code2,
  globe: Award,
  mic: FileText,
}

const RESOURCE_TINT = {
  amber: { bg: '#fef9c3', color: '#854F0B' },
  emerald: { bg: '#e1f5ee', color: '#0F6E56' },
  rose: { bg: '#fee2e2', color: '#b91c1c' },
  indigo: { bg: '#e0e3ff', color: '#5B6CF9' },
  purple: { bg: '#ede9fe', color: '#534AB7' },
}

const CHIP_TONES = {
  paid: 'bg-[#f8f9ff] text-[#6b7280]',
  free: 'bg-emerald-50 text-emerald-700',
  hrs: 'bg-[#f0f2ff] text-[#5B6CF9]',
  cert: 'bg-[#ede9fe] text-[#534AB7]',
  min: 'bg-[#f0f2ff] text-[#5B6CF9]',
  practice: 'bg-[#e1f5ee] text-[#0F6E56]',
  read: 'bg-[#fef9c3] text-[#854F0B]',
}

// ─── Donut / pie helpers ────────────────────────────────────────────
function severityColor(pct, target) {
  if (pct >= target) return '#22c55e'
  if (pct >= target * 0.7) return '#f59e0b'
  return '#ef4444'
}

function DonutChart({ segments, size = 170, outerR = 72, innerR = 48, highlightIdx, onHover }) {
  const cx = size / 2
  const cy = size / 2
  const total = segments.reduce((sum, s) => sum + s.pct, 0)
  const paths = []
  let startAngle = -Math.PI / 2

  segments.forEach((seg, index) => {
    const slice = (seg.pct / (total || 1)) * 2 * Math.PI
    const endAngle = startAngle + slice
    const x1 = cx + outerR * Math.cos(startAngle)
    const y1 = cy + outerR * Math.sin(startAngle)
    const x2 = cx + outerR * Math.cos(endAngle)
    const y2 = cy + outerR * Math.sin(endAngle)
    const ix1 = cx + innerR * Math.cos(endAngle)
    const iy1 = cy + innerR * Math.sin(endAngle)
    const ix2 = cx + innerR * Math.cos(startAngle)
    const iy2 = cy + innerR * Math.sin(startAngle)
    const large = slice > Math.PI ? 1 : 0
    const color = severityColor(seg.pct, seg.target)
    const d = `M ${x1} ${y1} A ${outerR} ${outerR} 0 ${large} 1 ${x2} ${y2} L ${ix1} ${iy1} A ${innerR} ${innerR} 0 ${large} 0 ${ix2} ${iy2} Z`
    paths.push({ d, color, index })
    startAngle = endAngle
  })

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="block">
      {paths.map((p) => (
        <path
          key={p.index}
          d={p.d}
          fill={p.color}
          stroke="#fff"
          strokeWidth={3}
          style={{
            opacity: highlightIdx == null || highlightIdx === p.index ? 1 : 0.35,
            transition: 'opacity .15s',
            cursor: 'pointer',
          }}
          onMouseEnter={() => onHover?.(p.index)}
          onMouseLeave={() => onHover?.(null)}
        />
      ))}
    </svg>
  )
}

// ─── Small reusable bits ────────────────────────────────────────────
function StatCell({ label, value, sub, valueColor }) {
  return (
    <div className="flex-1 border-r border-[#f0f2ff] bg-[#fafbff] px-4 py-3.5 last:border-r-0">
      <p className="mb-1 text-[11px] text-[#9ca3af]">{label}</p>
      <p className="text-lg font-semibold leading-none" style={valueColor ? { color: valueColor } : { color: '#111827' }}>
        {value}
      </p>
      {sub && <p className="mt-1 text-[11px] text-[#9ca3af]">{sub}</p>}
    </div>
  )
}

function ResourceChip({ label, tone }) {
  return (
    <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-medium ${CHIP_TONES[tone] ?? CHIP_TONES.min}`}>
      {label}
    </span>
  )
}

function TaskChip({ label, tone }) {
  return (
    <span className={`rounded-md px-1.5 py-0.5 text-[10.5px] font-medium ${CHIP_TONES[tone] ?? CHIP_TONES.min}`}>
      {label}
    </span>
  )
}

function bold(text) {
  // Convert simple **bold** markers into span nodes.
  const parts = text.split(/\*\*(.+?)\*\*/g)
  return parts.map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : <React.Fragment key={i}>{part}</React.Fragment>))
}

// ─── Milestone drawer ───────────────────────────────────────────────
function MilestoneRow({ milestone, index, isLast, isOpen, onToggle, onSetStatus, onToggleTask }) {
  const TypeIcon = MILESTONE_TYPE_ICON[milestone.typeIcon] ?? Target
  const doneCount = milestone.groups.reduce((s, g) => s + g.tasks.filter((t) => t.done).length, 0)
  const totalCount = milestone.groups.reduce((s, g) => s + g.tasks.length, 0)

  const CircleContent = milestone.status === 'done' ? Check : milestone.status === 'active' ? Pencil : Lock
  const circleClass = milestone.status === 'done'
    ? 'bg-emerald-500 border-emerald-500 text-white'
    : milestone.status === 'active'
      ? 'bg-white border-[#5B6CF9] text-[#5B6CF9] shadow-[0_0_0_4px_#e0e3ff]'
      : 'bg-[#f8f9ff] border-[#e2e5f0] text-[#d1d5db]'

  const lineClass = milestone.status === 'done' ? 'bg-emerald-500' : 'bg-[#e2e5f0]'
  const titleClass = milestone.status === 'done'
    ? 'text-[#9ca3af] line-through'
    : milestone.status === 'locked'
      ? 'text-[#9ca3af]'
      : 'text-[#111827]'

  return (
    <div className="border-b border-[#f8f9ff] last:border-b-0">
      {/* Header */}
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-stretch gap-0 px-6 py-4 text-left transition hover:bg-[#fafbff]"
      >
        <div className="mr-3.5 flex w-10 flex-shrink-0 flex-col items-center self-stretch">
          <div className={`relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 ${circleClass}`}>
            <CircleContent size={13} strokeWidth={2.4} />
          </div>
          {!isLast && <div className={`mt-1 min-h-2 w-[2px] flex-1 ${lineClass}`} />}
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center justify-between gap-2">
            <p className={`text-sm font-medium ${titleClass}`}>{milestone.title}</p>
            <ChevronDown
              size={16}
              strokeWidth={2}
              className={`flex-shrink-0 text-[#9ca3af] transition-transform ${isOpen ? 'rotate-180' : ''}`}
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-[#e0e3ff] px-1.5 py-0.5 text-[11px] font-semibold text-[#5B6CF9]">{milestone.xp}</span>
            <span className="flex items-center gap-1 text-[11.5px] text-[#9ca3af]">
              <TypeIcon size={12} /> {milestone.type}
            </span>
            <span className="text-[11.5px] text-[#9ca3af]">{doneCount}/{totalCount} tasks</span>
            {/* Status toggle */}
            <div
              className="ml-auto flex overflow-hidden rounded-full border border-[#e2e5f0] text-[11.5px]"
              onClick={(event) => event.stopPropagation()}
              role="group"
              aria-label="Milestone status"
            >
              <button
                type="button"
                onClick={() => onSetStatus('done')}
                className={`flex items-center gap-1 px-2.5 py-1 font-medium transition ${
                  milestone.status === 'done' ? 'bg-emerald-500 text-white' : 'bg-white text-[#9ca3af] hover:bg-[#f0f2ff]'
                }`}
              >
                <Check size={11} strokeWidth={2.6} /> Done
              </button>
              <button
                type="button"
                onClick={() => onSetStatus('active')}
                className={`flex items-center gap-1 px-2.5 py-1 font-medium transition ${
                  milestone.status === 'active' ? 'bg-[#5B6CF9] text-white' : 'bg-white text-[#9ca3af] hover:bg-[#f0f2ff]'
                }`}
              >
                <Flame size={11} strokeWidth={2.4} /> In progress
              </button>
            </div>
          </div>
        </div>
      </button>

      {/* Drawer */}
      <div
        className="overflow-hidden border-t border-[#f0f2ff] bg-[#f8f9ff] transition-[max-height] duration-300"
        style={{ maxHeight: isOpen ? 900 : 0 }}
      >
        <div className="px-6 py-4 pl-[78px]">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-[#9ca3af]">
            {milestone.desc}
          </p>
          {milestone.groups.map((group, gi) => {
            const GroupIcon = GROUP_ICON[group.icon] ?? ListChecks
            return (
              <div key={group.title} className="mb-4 last:mb-0">
                <p className="mb-2 flex items-center gap-1.5 text-[12.5px] font-semibold text-[#374151]">
                  <GroupIcon size={14} className="text-[#5B6CF9]" strokeWidth={2.2} />
                  {group.title}
                </p>
                {group.tasks.map((task, ti) => (
                  <button
                    key={task.title}
                    type="button"
                    onClick={() => onToggleTask(gi, ti)}
                    className={`mb-1 flex w-full items-start gap-2.5 rounded-lg border border-transparent px-3 py-2 text-left transition hover:border-[#e2e5f0] hover:bg-white ${
                      task.done ? 'opacity-60' : ''
                    }`}
                  >
                    <span
                      className={`mt-0.5 flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded border-[1.5px] transition ${
                        task.done ? 'border-emerald-500 bg-emerald-500' : 'border-[#d1d5db] bg-white'
                      }`}
                    >
                      {task.done && <Check size={10} strokeWidth={3} className="text-white" />}
                    </span>
                    <div className="flex-1">
                      <p className={`text-[13px] font-medium leading-snug ${task.done ? 'text-[#9ca3af] line-through' : 'text-[#111827]'}`}>
                        {task.title}
                      </p>
                      <div className="mt-1 flex flex-wrap gap-1">
                        <TaskChip label={`${task.mins} min`} tone="min" />
                        <TaskChip
                          label={task.chip === 'practice' ? 'Practice' : task.chip === 'read' ? 'Read' : 'Task'}
                          tone={task.chip === 'practice' ? 'practice' : task.chip === 'read' ? 'read' : 'min'}
                        />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )
          })}
          <div className="mt-3 flex gap-2">
            {milestone.status !== 'locked' && (
              <button
                type="button"
                className="flex items-center gap-1.5 rounded-lg bg-[#5B6CF9] px-4 py-2 text-[13px] font-medium text-white transition hover:bg-[#4a5be0]"
              >
                <ExternalLink size={13} /> Open practice environment
              </button>
            )}
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-lg border border-[#c7cef7] bg-white px-4 py-2 text-[13px] font-medium text-[#5B6CF9] transition hover:bg-[#f0f2ff]"
            >
              <Plus size={13} /> Log activity
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Resource card panel ────────────────────────────────────────────
function ResourcePanel({ items }) {
  if (!items || items.length === 0) {
    return <p className="text-[12.5px] text-[#9ca3af]">No resources in this category yet.</p>
  }
  return (
    <div className="flex flex-col gap-2.5">
      {items.map((r) => {
        const Icon = RESOURCE_ICON[r.icon] ?? BookOpen
        const tint = RESOURCE_TINT[r.tint] ?? RESOURCE_TINT.indigo
        return (
          <div
            key={r.title}
            className="flex cursor-pointer items-start gap-2.5 rounded-xl border border-[#f0f2ff] bg-[#fafbff] p-3 transition hover:border-[#c7cef7] hover:bg-[#f8f9ff]"
          >
            <span
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg"
              style={{ background: tint.bg, color: tint.color }}
            >
              <Icon size={15} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[12.5px] font-medium leading-snug text-[#111827]">{r.title}</p>
              <p className="mt-0.5 text-[11px] leading-snug text-[#9ca3af]">{r.meta}</p>
              {r.chips?.length > 0 && (
                <div className="mt-1 flex flex-wrap gap-1">
                  {r.chips.map((c) => (
                    <ResourceChip key={c.label} label={c.label} tone={c.tone} />
                  ))}
                </div>
              )}
            </div>
            <span className="flex-shrink-0 whitespace-nowrap pt-0.5 text-[12px] font-semibold text-[#5B6CF9]">{r.xp}</span>
          </div>
        )
      })}
    </div>
  )
}

// ─── Page ───────────────────────────────────────────────────────────
export default function SkillDetailPage() {
  const { skillId } = useParams()
  const navigate = useNavigate()
  const readiness = candidateOverview.careerSnapshot.readiness

  const bundle = useMemo(() => getSkillDetail(skillId), [skillId])

  // Milestone drawer + status + tasks are local state so the page is
  // interactive without needing a backend yet. Seeded from the detail
  // data, then user actions mutate this copy.
  const [milestones, setMilestones] = useState(() => bundle?.detail?.milestones ?? [])
  const [openMilestoneId, setOpenMilestoneId] = useState(null)
  const [hoverSegment, setHoverSegment] = useState(null)
  const [resourceTab, setResourceTab] = useState('books')

  if (!bundle) {
    return (
      <div className="min-h-screen bg-[#F0F2FF]">
        <HomeTopNav user={mockUser} readiness={readiness} />
        <div className="mx-auto max-w-3xl p-10 text-center">
          <p className="text-lg font-semibold text-[#11194a]">Skill not found</p>
          <button
            type="button"
            onClick={() => navigate('/student/skill-development')}
            className="mt-4 rounded-full bg-[#5B6CF9] px-4 py-2 text-sm font-medium text-white"
          >
            Back to Skill Development
          </button>
        </div>
      </div>
    )
  }

  const { skill, detail, categoryMeta } = bundle
  const palette = CAT_PALETTE[skill.cat] ?? CAT_PALETTE.technical

  const setStatus = (id, status) => {
    setMilestones((current) => current.map((m) => (m.id === id ? { ...m, status } : m)))
  }
  const toggleTask = (id, gi, ti) => {
    setMilestones((current) => current.map((m) => {
      if (m.id !== id) return m
      const groups = m.groups.map((g, index) => {
        if (index !== gi) return g
        return {
          ...g,
          tasks: g.tasks.map((task, i) => (i === ti ? { ...task, done: !task.done } : task)),
        }
      })
      return { ...m, groups }
    }))
    setOpenMilestoneId(id)
  }

  const doneMilestoneCount = milestones.filter((m) => m.status === 'done').length

  const resourceCategories = [
    { id: 'books', label: 'Books', icon: BookOpen },
    { id: 'videos', label: 'Videos', icon: Video },
    { id: 'courses', label: 'Courses', icon: GraduationCap },
    { id: 'articles', label: 'Articles', icon: FileText },
    { id: 'certs', label: 'Certs', icon: Award },
  ]

  const availableCategories = resourceCategories.filter((c) => (detail.resources?.[c.id]?.length ?? 0) > 0)
  const activeTab = availableCategories.find((c) => c.id === resourceTab) ? resourceTab : (availableCategories[0]?.id ?? 'books')

  return (
    <div className="min-h-screen bg-[#F0F2FF]" style={{ fontFamily: 'Inter, sans-serif' }}>
      <HomeTopNav user={mockUser} readiness={readiness} />

      {/* Breadcrumb */}
      <div className="sticky top-14 z-40 flex h-10 items-center gap-1.5 border-b border-[#e2e5f0] bg-white px-6 text-[12.5px] text-[#9ca3af] sm:px-8">
        <button
          type="button"
          onClick={() => navigate('/student/skill-development')}
          className="mr-2 flex items-center gap-1 text-[13px] font-medium text-[#5B6CF9] transition hover:opacity-75"
        >
          <ArrowLeft size={13} strokeWidth={2.4} /> Back
        </button>
        <span className="text-[#d1d5db]">/</span>
        <button
          type="button"
          onClick={() => navigate('/student/skill-development')}
          className="text-[#6b7280] hover:text-[#5B6CF9]"
        >
          Skill Development
        </button>
        <span className="text-[#d1d5db]">/</span>
        <span className="text-[#6b7280]">{detail.breadcrumbCategory}</span>
        <span className="text-[#d1d5db]">/</span>
        <span className="font-medium text-[#111827]">{skill.name}</span>
      </div>

      {/* Page grid */}
      <div className="mx-auto grid max-w-[1100px] grid-cols-1 items-start gap-6 px-6 pb-20 pt-7 sm:px-8 lg:grid-cols-[minmax(0,1fr)_320px]">

        {/* ═══ LEFT COLUMN ═══ */}
        <div className="flex min-w-0 flex-col gap-4">

          {/* Hero card */}
          <section className="overflow-hidden rounded-2xl border border-[#e2e5f0] bg-white">
            <div className="h-1" style={{ background: palette.bar }} />
            <div className="px-7 py-6">
              <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-start gap-3.5">
                  <span
                    className="flex h-[46px] w-[46px] flex-shrink-0 items-center justify-center rounded-xl"
                    style={{ background: palette.tintBg, color: palette.iconColor }}
                  >
                    <Database size={22} strokeWidth={2} />
                  </span>
                  <div>
                    <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-[#5B6CF9]">
                      {detail.hero?.eyebrow}
                    </p>
                    <h1 className="mb-1 text-[22px] font-semibold text-[#111827]">{skill.name}</h1>
                    <p className="max-w-[520px] text-[13px] leading-relaxed text-[#6b7280]">
                      {detail.hero?.sub}
                    </p>
                  </div>
                </div>

                <div className="flex flex-shrink-0 flex-col items-end gap-2">
                  <div className="rounded-xl border border-rose-300 bg-rose-50 px-3 py-2 text-right">
                    <p className="text-[10.5px] text-[#9ca3af]">Gap to close</p>
                    <p className="text-[19px] font-semibold leading-none text-rose-600">
                      {detail.stats.gapToClose > 0 ? '+' : ''}
                      {detail.stats.gapToClose} pts
                    </p>
                  </div>
                  <div className={`flex items-center gap-1.5 rounded-lg border px-3 py-1 text-[12px] font-medium ${
                    detail.stats.gapToClose < 0
                      ? 'border-rose-300 bg-rose-50 text-rose-600'
                      : 'border-emerald-300 bg-emerald-50 text-emerald-700'
                  }`}>
                    <span className={`h-[7px] w-[7px] rounded-full ${detail.stats.gapToClose < 0 ? 'bg-rose-500' : 'bg-emerald-500'}`} />
                    {detail.stats.gapToClose < 0 ? 'Below threshold' : 'Meeting threshold'}
                  </div>
                </div>
              </div>

              {/* Pie + legend */}
              <div className="flex flex-wrap items-center gap-7">
                <div className="relative h-[170px] w-[170px] flex-shrink-0">
                  <DonutChart
                    segments={detail.subskillsWithTargets}
                    highlightIdx={hoverSegment}
                    onHover={setHoverSegment}
                  />
                  <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-[26px] font-semibold leading-none text-[#5B6CF9]">{detail.stats.yourMastery}%</p>
                    <p className="mt-1 text-[11px] text-[#9ca3af]">mastery</p>
                  </div>
                </div>
                <div className="flex min-w-[220px] flex-1 flex-col gap-1">
                  {detail.subskillsWithTargets.map((ss, index) => {
                    const color = severityColor(ss.pct, ss.target)
                    const gap = ss.pct - ss.target
                    return (
                      <button
                        key={ss.name}
                        type="button"
                        onMouseEnter={() => setHoverSegment(index)}
                        onMouseLeave={() => setHoverSegment(null)}
                        className={`flex items-center gap-2.5 rounded-lg border px-2.5 py-2 text-left transition ${
                          hoverSegment === index
                            ? 'border-[#c7cef7] bg-[#f0f2ff]'
                            : 'border-transparent hover:border-[#e2e5f0] hover:bg-[#f8f9ff]'
                        }`}
                      >
                        <span className="h-3 w-3 flex-shrink-0 rounded" style={{ background: color }} />
                        <span className="flex-1 text-[13px] text-[#374151]">{ss.name}</span>
                        <span
                          className="rounded-md px-2 py-0.5 text-[12px] font-semibold"
                          style={{ background: `${color}18`, color }}
                        >
                          {ss.pct}%
                        </span>
                        <span className="w-14 text-right text-[11px] text-[#9ca3af]">
                          <span className={gap >= 0 ? 'font-semibold text-emerald-600' : 'font-semibold text-rose-600'}>
                            {gap >= 0 ? `+${gap}` : gap}
                          </span> pts
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Stats strip */}
            <div className="flex flex-wrap border-t border-[#f0f2ff]">
              <StatCell label="Your mastery" value={`${detail.stats.yourMastery}%`} sub="Overall average" valueColor="#5B6CF9" />
              <StatCell label="Required level" value={`${detail.stats.requiredLevel}%`} sub={`For ${categoryMeta?.label ?? 'target role'}`} />
              <StatCell
                label="Gap to close"
                value={`${detail.stats.gapToClose > 0 ? '+' : ''}${detail.stats.gapToClose} pts`}
                sub={detail.stats.largestNote}
                valueColor={detail.stats.gapToClose < 0 ? '#dc2626' : '#16a34a'}
              />
              <StatCell label="Est. to close" value={detail.stats.etaLabel} sub={detail.stats.etaSub} valueColor="#d97706" />
              <StatCell label="Readiness gain" value={`+${detail.stats.readinessGain}%`} sub="If gap is closed" valueColor="#16a34a" />
            </div>
          </section>

          {/* Roadmap card */}
          <section className="overflow-hidden rounded-2xl border border-[#e2e5f0] bg-white">
            <header className="flex items-center justify-between border-b border-[#f0f2ff] px-6 pb-4 pt-5">
              <h2 className="flex items-center gap-2 text-[15px] font-medium text-[#111827]">
                <Route size={17} className="text-[#5B6CF9]" />
                Learning roadmap
              </h2>
              <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-[12px] font-medium text-emerald-700">
                <Check size={12} strokeWidth={2.4} />
                {doneMilestoneCount} of {milestones.length} milestones complete
              </div>
            </header>

            <div className="py-2">
              {milestones.map((m, index) => (
                <MilestoneRow
                  key={m.id}
                  milestone={m}
                  index={index}
                  isLast={index === milestones.length - 1}
                  isOpen={openMilestoneId === m.id}
                  onToggle={() => setOpenMilestoneId((current) => (current === m.id ? null : m.id))}
                  onSetStatus={(status) => setStatus(m.id, status)}
                  onToggleTask={(gi, ti) => toggleTask(m.id, gi, ti)}
                />
              ))}
            </div>
          </section>
        </div>

        {/* ═══ RIGHT COLUMN (sticky sidebar) ═══ */}
        <aside className="flex flex-col gap-4 lg:sticky lg:top-[100px]">
          {/* AI insight */}
          <div className="rounded-2xl bg-[#5B6CF9] p-5 text-white">
            <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest opacity-75">
              <Sparkles size={12} /> AI insight
            </p>
            <p className="mb-2 text-[15px] font-semibold leading-snug">{detail.aiInsight?.title}</p>
            <p className="mb-4 text-[12.5px] leading-relaxed opacity-90">{detail.aiInsight?.body}</p>
            <div className="flex gap-2">
              <button
                type="button"
                className="flex-1 rounded-lg bg-white py-2 text-[12.5px] font-medium text-[#5B6CF9] transition hover:bg-[#f0f2ff]"
              >
                {detail.aiInsight?.primaryCta}
              </button>
              <button
                type="button"
                onClick={() => navigate('/student/ai-companion')}
                className="flex-1 rounded-lg bg-white/15 py-2 text-[12.5px] font-medium text-white transition hover:bg-white/25"
              >
                {detail.aiInsight?.ghostCta}
              </button>
            </div>
          </div>

          {/* Resources */}
          <div className="overflow-hidden rounded-2xl border border-[#e2e5f0] bg-white">
            <div className="px-5 pt-4">
              <h3 className="mb-3 flex items-center gap-2 text-[13.5px] font-medium text-[#111827]">
                <Library size={15} className="text-[#5B6CF9]" />
                Learning resources
              </h3>
            </div>
            <div className="flex overflow-x-auto border-b border-[#e2e5f0]" style={{ scrollbarWidth: 'none' }}>
              {availableCategories.map((cat) => {
                const Icon = cat.icon
                const isActive = cat.id === activeTab
                const count = detail.resources[cat.id]?.length ?? 0
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setResourceTab(cat.id)}
                    className={`flex items-center gap-1.5 border-b-2 px-3.5 py-2.5 text-[12.5px] font-medium transition ${
                      isActive
                        ? 'border-[#5B6CF9] text-[#5B6CF9]'
                        : 'border-transparent text-[#9ca3af] hover:text-[#374151]'
                    }`}
                  >
                    <Icon size={13} /> {cat.label}
                    <span className={`rounded-md px-1.5 py-[1px] text-[10px] font-semibold ${
                      isActive ? 'bg-[#5B6CF9] text-white' : 'bg-[#f0f2ff] text-[#5B6CF9]'
                    }`}>
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>
            <div className="px-4 py-4">
              <ResourcePanel items={detail.resources[activeTab]} />
            </div>
          </div>

          {/* Readiness nudge */}
          <div className="rounded-2xl border border-[#c7cef7] bg-[#f8f9ff] p-4">
            <p className="mb-1.5 flex items-center gap-1.5 text-[12.5px] font-medium text-[#5B6CF9]">
              <TrendingUp size={14} strokeWidth={2.2} />
              Readiness if closed
            </p>
            <p className="mb-2.5 text-[12.5px] leading-relaxed text-[#374151]">
              {bold(detail.readinessNudge?.body ?? '')}
            </p>
            <div className="mb-1 h-[6px] overflow-hidden rounded-full bg-[#e0e3ff]">
              <div className="h-full rounded-full bg-[#5B6CF9]" style={{ width: `${detail.readinessNudge?.current ?? 0}%` }} />
            </div>
            <div className="flex justify-between text-[11px] text-[#9ca3af]">
              <span>Now: {detail.readinessNudge?.current}%</span>
              <span>After: {detail.readinessNudge?.after}%</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
