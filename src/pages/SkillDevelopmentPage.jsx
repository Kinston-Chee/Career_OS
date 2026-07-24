import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  AlertCircle,
  Atom,
  Award,
  BookOpen,
  Brain,
  Building2,
  Check,
  ChevronRight,
  Code2,
  Container,
  Database,
  Flame,
  Globe,
  GraduationCap,
  Laptop,
  LayoutGrid,
  MessageCircle,
  Mic,
  Network,
  Plus,
  Puzzle,
  RefreshCw,
  Server,
  SlidersHorizontal,
  Users,
  Video,
  X,
} from 'lucide-react'
import HomeTopNav from '../components/home/HomeTopNav'
import { candidateOverview, mockUser } from '../data/mockData'
import { CAT_META, CAT_PALETTE, SKILLS } from '../data/skillDevelopmentData'

// ─── Icon maps ────────────────────────────────────────────────────────
const SKILL_ICON = {
  network: Network,
  database: Database,
  server: Server,
  atom: Atom,
  code: Code2,
  container: Container,
  users: Users,
  message: MessageCircle,
  puzzle: Puzzle,
  refresh: RefreshCw,
  building: Building2,
  brain: Brain,
  certificate: Award,
}

const RESOURCE_ICON = {
  video: Video,
  book: BookOpen,
  laptop: Laptop,
  code: Code2,
  school: GraduationCap,
  atom: Atom,
  certificate: Award,
  globe: Globe,
  mic: Mic,
}

const CAT_ICON = {
  technical: Code2,
  soft: Users,
  domain: Building2,
  cert: Award,
}

// ─── Progress ring ───────────────────────────────────────────────────
function ProgressRing({
  size = 64,
  strokeWidth = 7,
  pct = 0,
  color = '#5B6CF9',
  trackColor = '#e0e3ff',
  showText = true,
  fontSize,
  textColor,
}) {
  const radius = size / 2 - strokeWidth
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - Math.max(0, Math.min(100, pct)) / 100)
  const resolvedFontSize = fontSize ?? (size < 60 ? 12 : 14)
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="block">
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={trackColor} strokeWidth={strokeWidth} />
      <circle
        cx={size / 2} cy={size / 2} r={radius} fill="none"
        stroke={color} strokeWidth={strokeWidth}
        strokeDasharray={circumference.toFixed(1)}
        strokeDashoffset={offset.toFixed(1)}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      {showText && (
        <text
          x={size / 2} y={size / 2 + 5}
          textAnchor="middle"
          fontSize={resolvedFontSize}
          fontWeight={600}
          fill={textColor || color}
          fontFamily="Inter, sans-serif"
        >
          {Math.round(pct)}%
        </text>
      )}
    </svg>
  )
}

// ─── Small helpers ────────────────────────────────────────────────────
const STATUS_COLOR = { gap: '#dc2626', done: '#16a34a', progress: '#5B6CF9' }
const STATUS_LABEL = { gap: 'Gap', done: 'Met', progress: 'In progress' }

const BADGE_CLASS = {
  gap: 'bg-rose-50 text-rose-600',
  strong: 'bg-emerald-50 text-emerald-600',
  building: 'bg-indigo-50 text-[#5B6CF9]',
}

function filterByCategory(currentCat) {
  if (currentCat === 'all') return SKILLS
  if (currentCat === 'gap') return SKILLS.filter((s) => s.status === 'gap')
  if (currentCat === 'progress') return SKILLS.filter((s) => s.status === 'progress')
  return SKILLS.filter((s) => s.cat === currentCat)
}

// ─── Sidebar ─────────────────────────────────────────────────────────
function Sidebar({ currentCat, onSelectCategory, gapCount, progressCount, categoryCounts }) {
  const items = [
    { id: 'technical', name: 'Technical skills', sub: `${categoryCounts.technical.gaps} gaps · ${categoryCounts.technical.total} skills` },
    { id: 'soft',      name: 'Soft skills',      sub: `${categoryCounts.soft.gaps} gaps · ${categoryCounts.soft.total} skills` },
    { id: 'domain',    name: 'Domain knowledge', sub: `${categoryCounts.domain.gaps} gap · ${categoryCounts.domain.total} skills` },
    { id: 'cert',      name: 'Certifications',   sub: `${categoryCounts.cert.progress} in progress` },
  ]
  return (
    <aside className="flex h-full min-h-0 w-60 shrink-0 flex-col overflow-y-auto border-r border-[#e2e5f0] bg-white py-5">
      <SidebarLabel>Overview</SidebarLabel>
      <SidebarItem
        active={currentCat === 'all'}
        onClick={() => onSelectCategory('all')}
        icon={<LayoutGrid size={15} />}
        iconBg="bg-[#f0f2ff] text-[#5B6CF9]"
        name="All skills"
        sub="14 skills tracked"
        pill={{ label: '14', tone: 'technical' }}
      />

      <SidebarDivider />
      <SidebarLabel>Categories</SidebarLabel>
      {items.map((it) => {
        const Icon = CAT_ICON[it.id]
        return (
          <SidebarItem
            key={it.id}
            active={currentCat === it.id}
            onClick={() => onSelectCategory(it.id)}
            icon={<Icon size={15} />}
            iconBg={paletteBg(it.id)}
            name={it.name}
            sub={it.sub}
            pill={{ label: String(categoryCounts[it.id].total), tone: it.id }}
          />
        )
      })}

      <SidebarDivider />
      <SidebarLabel>Focus</SidebarLabel>
      <SidebarItem
        active={currentCat === 'gap'}
        onClick={() => onSelectCategory('gap')}
        icon={<AlertCircle size={15} />}
        iconBg="bg-rose-50 text-rose-600"
        name="Gaps only"
        sub="Skills below threshold"
        pill={{ label: String(gapCount), tone: 'rose' }}
      />
      <SidebarItem
        active={currentCat === 'progress'}
        onClick={() => onSelectCategory('progress')}
        icon={<Flame size={15} />}
        iconBg="bg-[#f0f2ff] text-[#5B6CF9]"
        name="In progress"
        sub="Active learning paths"
        pill={{ label: String(progressCount), tone: 'technical' }}
      />

      <div className="mt-auto border-t border-[#e2e5f0] px-4 pt-4">
        <div className="flex items-center gap-3">
          <ProgressRing size={52} strokeWidth={5} pct={68} color="#5B6CF9" fontSize={11} />
          <div className="min-w-0">
            <p className="text-xs text-[#6b7280]">Overall readiness</p>
            <p className="text-lg font-semibold text-[#5B6CF9]">68%</p>
            <p className="text-[11px] text-[#9ca3af]">Target: Full-Stack Eng.</p>
          </div>
        </div>
      </div>
    </aside>
  )
}

function SidebarLabel({ children }) {
  return (
    <p className="mb-2 mt-4 px-4 text-[10.5px] font-semibold uppercase tracking-widest text-[#9ca3af] first-of-type:mt-0">
      {children}
    </p>
  )
}

function SidebarDivider() {
  return <div className="mx-4 my-3 h-px bg-[#f0f2ff]" />
}

function SidebarItem({ active, onClick, icon, iconBg, name, sub, pill }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex items-center gap-2.5 px-4 py-2.5 text-left transition ${
        active ? 'bg-[#f0f2ff]' : 'hover:bg-[#f8f9ff]'
      }`}
    >
      {active && <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r bg-[#5B6CF9]" />}
      <span className={`flex h-7 w-7 items-center justify-center rounded-md ${iconBg}`}>
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <p className={`truncate text-[13px] font-medium ${active ? 'text-[#5B6CF9]' : 'text-[#374151]'}`}>{name}</p>
        <p className="text-[11px] text-[#9ca3af]">{sub}</p>
      </span>
      <PillBadge tone={pill.tone}>{pill.label}</PillBadge>
    </button>
  )
}

function PillBadge({ tone, children }) {
  const map = {
    technical: 'bg-[#e0e3ff] text-[#5B6CF9]',
    soft: 'bg-[#e1f5ee] text-[#0F6E56]',
    domain: 'bg-[#fef9c3] text-[#854F0B]',
    cert: 'bg-[#ede9fe] text-[#534AB7]',
    rose: 'bg-rose-50 text-rose-600',
  }
  return (
    <span className={`shrink-0 rounded-lg px-1.5 py-0.5 text-[10.5px] font-semibold ${map[tone] ?? map.technical}`}>
      {children}
    </span>
  )
}

function paletteBg(catId) {
  switch (catId) {
    case 'soft': return 'bg-[#e1f5ee] text-[#0F6E56]'
    case 'domain': return 'bg-[#fef9c3] text-[#854F0B]'
    case 'cert': return 'bg-[#ede9fe] text-[#534AB7]'
    default: return 'bg-[#e0e3ff] text-[#5B6CF9]'
  }
}

// ─── Skill card ──────────────────────────────────────────────────────
function SkillCard({ skill, onSelect, onOpenDetail }) {
  const Icon = SKILL_ICON[skill.icon] ?? Code2
  const palette = CAT_PALETTE[skill.cat] ?? CAT_PALETTE.technical
  const gapDelta = skill.pct - skill.required
  const borderColor = skill.status === 'gap' ? '#ef4444' : skill.status === 'done' ? '#22c55e' : palette.bar

  const badge = skill.status === 'gap'
    ? { label: `Gap: ${gapDelta} pts`, cls: BADGE_CLASS.gap }
    : skill.status === 'done'
      ? { label: 'Met', cls: BADGE_CLASS.strong }
      : { label: 'Building', cls: BADGE_CLASS.building }

  const topSubskills = skill.subskills.slice(0, 2)

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(skill.id)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onSelect(skill.id)
        }
      }}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-[#e2e5f0] bg-white p-4 text-left transition hover:-translate-y-0.5 hover:border-[#a5b4fc]"
      style={{ borderLeftWidth: 3, borderLeftColor: borderColor }}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <span
          className="flex h-10 w-10 items-center justify-center rounded-lg"
          style={{ background: palette.tintBg, color: palette.iconColor }}
        >
          <Icon size={18} strokeWidth={2} />
        </span>
        <div className="flex flex-col items-end gap-1">
          <span className={`rounded-md px-2 py-0.5 text-[10.5px] font-semibold ${badge.cls}`}>{badge.label}</span>
          <div className="flex items-center gap-1.5 text-[11px] text-[#9ca3af]">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: STATUS_COLOR[skill.status] }} />
            {STATUS_LABEL[skill.status]}
          </div>
        </div>
      </div>

      <p className="text-sm font-medium text-[#111827]">{skill.name}</p>
      <p className="mb-3 text-xs text-[#9ca3af]">{skill.sub}</p>

      <div className="mb-3 flex items-center gap-3">
        <ProgressRing size={64} strokeWidth={7} pct={skill.pct} color={palette.bar} />
        <div className="flex-1 space-y-2">
          {topSubskills.map((ss) => (
            <div key={ss.n}>
              <div className="mb-0.5 flex justify-between">
                <span className="text-[11px] text-[#374151]">{ss.n}</span>
                <span className="text-[11px] font-medium text-[#6b7280]">{ss.p}%</span>
              </div>
              <div className="h-[5px] overflow-hidden rounded bg-[#f1f5f9]">
                <div className="h-full rounded transition-all" style={{ width: `${ss.p}%`, background: palette.bar }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-[#f0f2ff] pt-3">
        <div className="min-w-0">
          <p className="text-[11px] text-[#9ca3af]">Next step</p>
          <p className="truncate text-[12px] font-medium text-[#374151]">
            {skill.milestones.find((m) => !m.done)?.t || 'Keep maintaining'}
          </p>
        </div>
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation()
            onOpenDetail?.(skill.id)
          }}
          className="flex shrink-0 items-center gap-0.5 whitespace-nowrap rounded-md px-2 py-1 text-[12px] font-medium text-[#5B6CF9] transition hover:bg-[#f0f2ff] hover:underline"
        >
          Details <ChevronRight size={12} />
        </button>
      </div>
    </div>
  )
}

// ─── Category banner ─────────────────────────────────────────────────
function CategoryBanner({ meta }) {
  const bg = meta.color
  return (
    <div className="mb-6 flex items-center gap-6 rounded-2xl px-6 py-5 text-white" style={{ background: bg }}>
      <ProgressRing size={72} strokeWidth={7} pct={meta.pct} color="#fff" trackColor="rgba(255,255,255,.3)" textColor="#fff" />
      <div className="min-w-0 flex-1">
        <p className="text-base font-semibold">{meta.label}</p>
        <p className="mb-3 text-[13px] opacity-80">{meta.desc}</p>
        <div className="mb-1 h-2 max-w-[320px] overflow-hidden rounded-full bg-white/30">
          <div className="h-full rounded-full bg-white transition-all" style={{ width: `${meta.pct}%` }} />
        </div>
        <div className="flex gap-5">
          <BannerStat value={`${meta.pct}%`} label="Avg. mastery" />
          <BannerStat value={String(meta.gaps)} label={meta.gaps === 1 ? 'Gap' : 'Gaps'} />
          <BannerStat value={String(meta.skills)} label="Skills" />
        </div>
      </div>
    </div>
  )
}

function BannerStat({ value, label }) {
  return (
    <div className="text-xs opacity-85">
      <strong className="block text-sm font-semibold opacity-100">{value}</strong>
      {label}
    </div>
  )
}

// ─── Detail panel ────────────────────────────────────────────────────
function DetailPanel({ skill, onClose }) {
  if (!skill) return null
  const palette = CAT_PALETTE[skill.cat] ?? CAT_PALETTE.technical
  const gap = skill.pct - skill.required
  return (
    <aside className="flex h-full min-h-0 w-80 shrink-0 flex-col gap-5 overflow-y-auto border-l border-[#e2e5f0] bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold text-[#111827]">{skill.name}</h3>
          <p className="text-[12.5px] leading-relaxed text-[#6b7280]">{skill.sub}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#f0f2ff] text-[#6b7280] transition hover:bg-[#e0e3ff] hover:text-[#5B6CF9]"
          aria-label="Close detail panel"
        >
          <X size={14} />
        </button>
      </div>

      <div className="flex items-center gap-4 rounded-xl bg-[#f8f9ff] p-4">
        <ProgressRing size={72} strokeWidth={7} pct={skill.pct} color={palette.bar} fontSize={14} />
        <div className="flex-1 space-y-2.5">
          <Stat label="Required level" value={`${skill.required}%`} />
          <Stat label="Gap to close" value={gap >= 0 ? `+${gap} pts` : `${gap} pts`} valueColor={gap >= 0 ? '#16a34a' : '#dc2626'} />
          <Stat label="Est. to close" value={skill.eta} />
        </div>
      </div>

      <Section title="Sub-skills">
        {skill.subskills.map((ss) => (
          <div key={ss.n} className="mb-2.5 flex items-center gap-2.5 last:mb-0">
            <span className="w-28 shrink-0 text-[13px] text-[#374151]">{ss.n}</span>
            <div className="flex-1">
              <div className="h-1.5 overflow-hidden rounded bg-[#f1f5f9]">
                <div className="h-full rounded transition-all" style={{ width: `${ss.p}%`, background: palette.bar }} />
              </div>
            </div>
            <span className="w-8 shrink-0 text-right text-[11.5px] font-medium text-[#6b7280]">{ss.p}%</span>
          </div>
        ))}
      </Section>

      <Section title="Milestones">
        {skill.milestones.map((m) => (
          <div key={m.t} className="flex items-center gap-2.5 border-b border-[#f0f2ff] py-2 last:border-0">
            <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
              m.done ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-[#e2e5f0]'
            }`}>
              {m.done && <Check size={10} strokeWidth={3} />}
            </span>
            <span className={`flex-1 text-[12.5px] ${m.done ? 'text-[#9ca3af] line-through' : 'text-[#374151]'}`}>{m.t}</span>
            <span className="text-[11px] font-semibold text-[#9ca3af]">{m.xp}</span>
          </div>
        ))}
      </Section>

      <Section title="Recent activity">
        {skill.activity.map((a, i) => (
          <div key={a.t} className="mb-3 flex items-start gap-2.5 last:mb-0">
            <div className="flex flex-col items-center pt-1">
              <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: palette.bar }} />
              {i < skill.activity.length - 1 && (
                <span className="mt-1 min-h-4 w-[1.5px] flex-1" style={{ background: palette.bar + '33' }} />
              )}
            </div>
            <div className="flex-1">
              <p className="text-[12.5px] font-medium text-[#111827]">{a.t}</p>
              <p className="mt-0.5 text-[11.5px] text-[#9ca3af]">{a.meta}</p>
            </div>
          </div>
        ))}
      </Section>

      <Section title="Recommended resources">
        {skill.resources.map((r) => {
          const RIcon = RESOURCE_ICON[r.icon] ?? BookOpen
          return (
            <div
              key={r.t}
              className="mb-2 flex cursor-pointer items-center gap-2.5 rounded-lg border border-transparent bg-[#f8f9ff] p-2.5 transition hover:border-[#c7cef7] last:mb-0"
            >
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                style={{ background: palette.tintBg, color: palette.iconColor }}
              >
                <RIcon size={14} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[12.5px] font-medium text-[#111827]">{r.t}</p>
                <p className="text-[11px] text-[#9ca3af]">{r.meta}</p>
              </div>
              <span className="shrink-0 whitespace-nowrap text-[11.5px] font-semibold text-[#5B6CF9]">{r.xp}</span>
            </div>
          )
        })}
      </Section>
    </aside>
  )
}

function Stat({ label, value, valueColor }) {
  return (
    <div>
      <p className="text-[11px] text-[#9ca3af]">{label}</p>
      <p className="text-[15px] font-semibold" style={valueColor ? { color: valueColor } : { color: '#111827' }}>
        {value}
      </p>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div>
      <p className="mb-2.5 text-[12px] font-semibold uppercase tracking-wider text-[#6b7280]">{title}</p>
      {children}
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────
export default function SkillDevelopmentPage() {
  const navigate = useNavigate()
  const readiness = candidateOverview.careerSnapshot.readiness
  const [currentCat, setCurrentCat] = useState('all')
  const [currentFilter, setCurrentFilter] = useState('all')
  const [sortBy, setSortBy] = useState('priority')
  const [selectedSkillId, setSelectedSkillId] = useState(null)
  const [detailOpen, setDetailOpen] = useState(false)

  const displayedSkills = useMemo(() => {
    let list = filterByCategory(currentCat)
    if (currentFilter === 'gap') list = list.filter((s) => s.status === 'gap')
    else if (currentFilter === 'progress') list = list.filter((s) => s.status === 'progress')
    else if (currentFilter === 'done') list = list.filter((s) => s.status === 'done')

    const sorted = [...list]
    const priorityOrder = { gap: 0, progress: 1, done: 2 }
    if (sortBy === 'alpha') sorted.sort((a, b) => a.name.localeCompare(b.name))
    else if (sortBy === 'gap') sorted.sort((a, b) => (a.pct - a.required) - (b.pct - b.required))
    else if (sortBy === 'progress') sorted.sort((a, b) => b.pct - a.pct)
    else sorted.sort((a, b) => priorityOrder[a.status] - priorityOrder[b.status])
    return sorted
  }, [currentCat, currentFilter, sortBy])

  const filterCounts = useMemo(() => {
    const base = filterByCategory(currentCat)
    return {
      all: base.length,
      gap: base.filter((s) => s.status === 'gap').length,
      progress: base.filter((s) => s.status === 'progress').length,
      done: base.filter((s) => s.status === 'done').length,
    }
  }, [currentCat])

  const categoryCounts = useMemo(() => {
    const buckets = { technical: 0, soft: 0, domain: 0, cert: 0 }
    const gapBuckets = { technical: 0, soft: 0, domain: 0, cert: 0 }
    const progressBuckets = { technical: 0, soft: 0, domain: 0, cert: 0 }
    SKILLS.forEach((s) => {
      buckets[s.cat] += 1
      if (s.status === 'gap') gapBuckets[s.cat] += 1
      if (s.status === 'progress') progressBuckets[s.cat] += 1
    })
    return {
      technical: { total: buckets.technical, gaps: gapBuckets.technical, progress: progressBuckets.technical },
      soft:      { total: buckets.soft,      gaps: gapBuckets.soft,      progress: progressBuckets.soft },
      domain:    { total: buckets.domain,    gaps: gapBuckets.domain,    progress: progressBuckets.domain },
      cert:      { total: buckets.cert,      gaps: gapBuckets.cert,      progress: progressBuckets.cert },
    }
  }, [])

  const totalGaps = SKILLS.filter((s) => s.status === 'gap').length
  const totalProgress = SKILLS.filter((s) => s.status === 'progress').length

  const selectedSkill = SKILLS.find((s) => s.id === selectedSkillId)
  const activeMeta = CAT_META[currentCat]
  const isRegularCategory = Boolean(activeMeta)

  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden bg-[#F0F2FF] text-[#111827]" style={{ fontFamily: 'Inter, sans-serif' }}>
      <HomeTopNav user={mockUser} readiness={readiness} />

      <div className="flex min-h-0 flex-1">
        <Sidebar
          currentCat={currentCat}
          onSelectCategory={(cat) => { setCurrentCat(cat); setCurrentFilter('all') }}
          gapCount={totalGaps}
          progressCount={totalProgress}
          categoryCounts={categoryCounts}
        />

        <div className="flex min-w-0 flex-1 overflow-hidden">
          <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto px-8 pb-12 pt-7">
              {/* Header */}
              <header className="mb-6 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="mb-1.5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-[#5B6CF9]">
                    <span
                      className="h-[3px] w-7 rounded"
                      style={{ background: isRegularCategory ? activeMeta.color : '#5B6CF9' }}
                    />
                    {isRegularCategory ? activeMeta.label : 'All categories'}
                  </p>
                  <h1 className="mb-1 text-2xl font-semibold text-[#111827]">
                    {isRegularCategory ? activeMeta.label : 'Skill Development'}
                  </h1>
                  <p className="text-[13.5px] text-[#6b7280]">
                    {isRegularCategory
                      ? `${activeMeta.desc} ${activeMeta.gaps} gap${activeMeta.gaps === 1 ? '' : 's'} · ${activeMeta.skills} skills tracked.`
                      : `Track your progress across ${SKILLS.length} skills. You have ${totalGaps} gaps to close before you qualify for your target role.`}
                  </p>
                </div>
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    className="flex items-center gap-1.5 rounded-full border border-[#e2e5f0] bg-white px-4 py-2 text-[13px] text-[#374151] transition hover:border-[#a5b4fc] hover:text-[#5B6CF9]"
                  >
                    <SlidersHorizontal size={14} /> Adjust targets
                  </button>
                  <button
                    type="button"
                    className="flex items-center gap-1.5 rounded-full bg-[#5B6CF9] px-4 py-2 text-[13px] font-medium text-white transition hover:bg-[#4a5be0]"
                  >
                    <Plus size={14} /> Log activity
                  </button>
                </div>
              </header>

              {isRegularCategory && <CategoryBanner meta={activeMeta} />}

              {/* Filters */}
              <div className="mb-5 flex flex-wrap items-center gap-2">
                <FilterChip active={currentFilter === 'all'} onClick={() => setCurrentFilter('all')} count={filterCounts.all}>All</FilterChip>
                <FilterChip active={currentFilter === 'gap'} onClick={() => setCurrentFilter('gap')} count={filterCounts.gap}>Gaps</FilterChip>
                <FilterChip active={currentFilter === 'progress'} onClick={() => setCurrentFilter('progress')} count={filterCounts.progress}>In progress</FilterChip>
                <FilterChip active={currentFilter === 'done'} onClick={() => setCurrentFilter('done')} count={filterCounts.done}>Completed</FilterChip>
                <div className="flex-1" />
                <select
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                  className="cursor-pointer rounded-lg border border-[#e2e5f0] bg-white px-3 py-1.5 text-[12.5px] text-[#374151] outline-none"
                >
                  <option value="priority">Sort: priority</option>
                  <option value="gap">Sort: biggest gap</option>
                  <option value="alpha">Sort: A–Z</option>
                  <option value="progress">Sort: most progress</option>
                </select>
              </div>

              {/* Skill grid */}
              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 xl:grid-cols-3">
                {displayedSkills.map((s) => (
                  <SkillCard
                    key={s.id}
                    skill={s}
                    onSelect={(id) => { setSelectedSkillId(id); setDetailOpen(true) }}
                    onOpenDetail={(id) => navigate(`/student/skill-development/${id}`)}
                  />
                ))}
              </div>

              {displayedSkills.length === 0 && (
                <div className="rounded-2xl border border-dashed border-[#c7cef7] bg-white/70 p-10 text-center text-sm text-[#6b7280]">
                  Nothing to show under this filter.
                </div>
              )}
            </div>
          </main>

          {detailOpen && (
            <DetailPanel skill={selectedSkill} onClose={() => setDetailOpen(false)} />
          )}
        </div>
      </div>
    </div>
  )
}

function FilterChip({ active, onClick, count, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[12.5px] transition ${
        active
          ? 'border-[#5B6CF9] bg-[#5B6CF9] text-white'
          : 'border-[#e2e5f0] bg-white text-[#6b7280] hover:border-[#a5b4fc] hover:text-[#5B6CF9]'
      }`}
    >
      {children}
      <span className={`rounded-md px-1.5 py-[1px] text-[10.5px] font-semibold ${active ? 'bg-white/25' : 'bg-black/[.08] text-[#374151]'}`}>
        {count}
      </span>
    </button>
  )
}
