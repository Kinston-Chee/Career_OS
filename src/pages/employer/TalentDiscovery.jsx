import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  AlertCircle,
  ArrowRight,
  Bookmark,
  Bot,
  Check,
  ChevronLeft,
  ChevronRight,
  Circle,
  Mail,
  Plus,
  Send,
  ShieldAlert,
  Sparkles,
  UserPlus,
  Users,
  X,
} from 'lucide-react'
import EmployerNav from '../../components/employer/EmployerNav'
import AIInterviewerConfig from '../../components/employer/talent/AIInterviewerConfig'
import { candidates, postings, totalApplicantsForSwe } from '../../data/talentDiscoveryData'
import { useEmployerWorkspaceStore } from '../../store/useEmployerWorkspaceStore'

const AVATAR_TONES = [
  '#059669', '#2563eb', '#7c3aed', '#ea580c',
  '#0891b2', '#db2777', '#d97706', '#475569',
]

const POSTING_BADGE_TONE = {
  Internship: 'bg-[#EEF0FE] text-[#4F62F7]',
  Challenge: 'bg-[#FEF3C7] text-[#D97706]',
  Workshop: 'bg-[#E8F8F3] text-[#0E9F6E]',
}

const PIP_TONE = {
  green: { dot: 'bg-[#0E9F6E]', text: 'text-[#0E9F6E]' },
  orange: { dot: 'bg-[#D97706]', text: 'text-[#D97706]' },
  gray: { dot: 'bg-[#8892A0]', text: 'text-[#8892A0]' },
}

const SCORE_RING_COLOR = {
  green: '#4F62F7',
  blue: '#7c3aed',
  gray: '#0E9F6E',
}

const STATUS_PILL = {
  Shortlisted: 'bg-[#EEF0FE] text-[#4F62F7]',
  Reviewed: 'bg-[#F7F8FA] text-[#3D4A5C] border border-[#E4E7EC]',
  New: 'bg-[#dbeafe] text-[#1e40af]',
  Passed: 'bg-[#FEE2E2] text-[#DC2626]',
}

const SCORE_PILL = (score) => {
  if (score >= 90) return 'bg-[#dcfce7] text-[#166534]'
  if (score >= 80) return 'bg-[#dbeafe] text-[#1e40af]'
  return 'bg-[#F7F8FA] text-[#8892A0] border border-[#E4E7EC]'
}

const CHIP_ACCENT = ['#4F62F7', '#7c3aed', '#0E9F6E', '#D97706']

// ── Left rail: postings list ────────────────────────────────────────────────
function PostingsRail({ selectedId, onSelect, onCreate }) {
  const items = postings.map((p, i) => ({
    id: p.id,
    name: p.title,
    badge: p.badge,
    meta: `${p.company} · ${p.location}`,
    count: `${p.stat1Value} ${p.stat1Label}`,
    hi: `${p.stat2Value} ${p.stat2Label === 'AI shortlisted' ? 'shortlisted' : p.stat2Label}`,
    statusText: p.statusText.replace('Active · ', ''),
    statusTone: p.statusTone === 'orange' ? 'orange' : p.statusText.includes('Completed') ? 'gray' : 'green',
  }))

  return (
    <aside className="flex h-full flex-col overflow-y-auto border-r border-[#E4E7EC] bg-white py-4">
      <div className="px-4 pb-4">
        <p className="mb-2 px-1 text-[10px] font-bold uppercase tracking-[.08em] text-[#8892A0]">Postings</p>
        {items.map((p) => {
          const active = p.id === selectedId
          const tone = PIP_TONE[p.statusTone]
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => onSelect(p.id)}
              className={`mb-0.5 flex w-full flex-col gap-1 rounded-lg border px-3 py-2.5 text-left transition ${
                active
                  ? 'border-[#C5CBFC] bg-[#EEF0FE]'
                  : 'border-transparent hover:bg-[#F7F8FA]'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className={`text-[13px] font-medium leading-tight ${active ? 'text-[#4F62F7]' : 'text-[#0F1117]'}`}>{p.name}</span>
                <span className={`shrink-0 rounded-[3px] px-1.5 py-[2px] text-[9px] font-bold uppercase tracking-[.04em] ${POSTING_BADGE_TONE[p.badge] || 'bg-[#F7F8FA] text-[#3D4A5C]'}`}>
                  {p.badge}
                </span>
              </div>
              <div className="text-[11px] text-[#8892A0]">{p.meta}</div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-[#8892A0]">{p.count}</span>
                <span className="text-[11px] font-semibold text-[#4F62F7]">{p.hi}</span>
              </div>
              <div className="mt-0.5 flex items-center gap-1 text-[10px] font-medium">
                <span className={`h-[5px] w-[5px] rounded-full ${tone.dot}`} />
                <span className={tone.text}>{p.statusText}</span>
              </div>
            </button>
          )
        })}
      </div>
      <div className="mx-4 h-px bg-[#E4E7EC]" />
      <button
        type="button"
        onClick={onCreate}
        className="mt-2 flex w-full items-center gap-2 px-5 py-2.5 text-[13px] font-medium text-[#4F62F7] transition hover:bg-[#EEF0FE]"
      >
        <Plus className="h-4 w-4" /> New posting
      </button>
    </aside>
  )
}

// ── Score ring ───────────────────────────────────────────────────────────────
function ScoreRing({ score, colorKey }) {
  const color = SCORE_RING_COLOR[colorKey] || '#4F62F7'
  const dash = 131.9
  const offset = dash - (score / 100) * dash
  return (
    <div className="relative h-[52px] w-[52px]">
      <svg width="52" height="52" viewBox="0 0 52 52" className="-rotate-90">
        <circle cx="26" cy="26" r="21" fill="none" stroke="#E4E7EC" strokeWidth="4" />
        <circle cx="26" cy="26" r="21" fill="none" stroke={color} strokeWidth="4" strokeDasharray={dash} strokeDashoffset={offset} strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono text-[13px] font-medium leading-none" style={{ color }}>{score}</span>
        <span className="text-[8px] leading-none text-[#8892A0]">%</span>
      </div>
    </div>
  )
}

// ── Main metrics + tabs + shortlisted / all applicants ──────────────────────
function MainPanel({ posting, statuses, onShortlist, onPass, onView, onDraft, onNotify, tab, setTab, filter, setFilter, allFilter, setAllFilter, page, setPage }) {
  const [visibleCount, setVisibleCount] = useState(3)

  useEffect(() => { setVisibleCount(3); setPage(1) }, [posting.id, filter, setPage])

  const sweCandidates = useMemo(() => candidates.filter((c) => c.postingId === 'swe-intern'), [])
  const shortlisted = useMemo(() => sweCandidates.filter((c) => (statuses[c.id] || c.status) === 'Shortlisted' || c.matchScore >= 89), [statuses, sweCandidates])

  const filteredShortlist = useMemo(() => {
    if (filter === 'high') return shortlisted.filter((c) => c.matchTier === 'green' || c.matchScore >= 90)
    if (filter === 'risk') return shortlisted.filter((c) => (c.risk || '').toLowerCase().includes('act fast') || (c.risk || '').toLowerCase().includes('low commitment'))
    return shortlisted
  }, [filter, shortlisted])

  const pagedShortlist = filteredShortlist.slice(0, 3) // demo — always show top 3, pager cosmetic

  const filteredAll = useMemo(() => {
    if (allFilter === 'all') return sweCandidates
    if (allFilter === 'new') return sweCandidates.filter((c) => (statuses[c.id] || c.status) === 'New')
    if (allFilter === 'reviewed') return sweCandidates.filter((c) => (statuses[c.id] || c.status) === 'Reviewed')
    if (allFilter === 'shortlisted') return sweCandidates.filter((c) => (statuses[c.id] || c.status) === 'Shortlisted')
    if (allFilter === 'passed') return sweCandidates.filter((c) => (statuses[c.id] || c.status) === 'Passed')
    return sweCandidates
  }, [allFilter, sweCandidates, statuses])

  const visibleAll = filteredAll.slice(0, visibleCount)

  return (
    <main className="overflow-y-auto bg-[#F7F8FA] px-6 py-5">
      {/* Metrics strip */}
      <section className="mb-5 grid grid-cols-2 gap-3 md:grid-cols-4">
        <MetricCard label="Total applicants" value={posting.stat1Value} valueTone="hi" sub="Across active posting" />
        <MetricCard label="AI shortlisted" value={<span>{posting.stat2Value} <span className="text-[12px] font-normal text-[#8892A0]">of {posting.stat1Value}</span></span>} valueTone="hi" sub={`${posting.stat3Value} avg match score`} />
        <MetricCard label="Top match" value={posting.id === 'swe-intern' ? '96%' : posting.stat3Value} valueTone="ok" sub={posting.id === 'swe-intern' ? "Ivan Lim · Taylor's" : posting.stat4Value || '—'} />
        <MetricCard label="Deadline" value={<span>{posting.statusText.match(/\d+/)?.[0] || '—'} <span className="text-[12px] font-normal text-[#8892A0]">days</span></span>} valueTone="warn" sub={posting.deadlineLabel?.replace('Deadline: ', '') || '—'} />
      </section>

      {/* Tab bar */}
      <div className="mb-3.5 flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex items-center gap-0.5 rounded-[10px] border border-[#E4E7EC] bg-[#F7F8FA] p-[3px]">
          <TabButton active={tab === 'shortlisted'} onClick={() => setTab('shortlisted')} icon={Sparkles} count={posting.stat2Value}>AI Shortlisted</TabButton>
          <TabButton active={tab === 'all'} onClick={() => setTab('all')} icon={Users} count={posting.stat1Value} countTone="gray">All Applicants</TabButton>
          <TabButton active={tab === 'interviewer'} onClick={() => setTab('interviewer')} icon={Bot} count="AI">AI Interviewer</TabButton>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {tab === 'shortlisted' ? (
            <>
              <span className="text-[11px] text-[#8892A0]">Ranked by evidence strength</span>
              <FilterPill active={filter === 'all'} onClick={() => setFilter('all')}>All</FilterPill>
              <FilterPill active={filter === 'high'} onClick={() => setFilter('high')}>High match</FilterPill>
              <FilterPill active={filter === 'risk'} onClick={() => setFilter('risk')}>At risk</FilterPill>
            </>
          ) : tab === 'all' ? (
            <>
              <FilterPill active={allFilter === 'all'} onClick={() => setAllFilter('all')}>All</FilterPill>
              <FilterPill active={allFilter === 'new'} onClick={() => setAllFilter('new')}>New</FilterPill>
              <FilterPill active={allFilter === 'reviewed'} onClick={() => setAllFilter('reviewed')}>Reviewed</FilterPill>
              <FilterPill active={allFilter === 'shortlisted'} onClick={() => setAllFilter('shortlisted')}>Shortlisted</FilterPill>
              <FilterPill active={allFilter === 'passed'} onClick={() => setAllFilter('passed')}>Passed</FilterPill>
            </>
          ) : (
            <span className="text-[11px] text-[#8892A0]">Configure once — the AI runs first-round interviews for shortlisted candidates.</span>
          )}
        </div>
      </div>

      {/* Body */}
      {!posting.hasFullData ? (
        <div className="rounded-xl border border-[#E4E7EC] bg-white p-16 text-center text-sm text-[#8892A0]">
          Loading applicants for {posting.title}…
        </div>
      ) : tab === 'interviewer' ? (
        <AIInterviewerConfig posting={posting} onNotify={onNotify} />
      ) : tab === 'shortlisted' ? (
        <div>
          <div className="flex flex-col gap-2">
            {pagedShortlist.map((c, i) => (
              <ShortlistRow
                key={c.id}
                rank={i + 1}
                candidate={c}
                status={statuses[c.id] || c.status}
                accent={CHIP_ACCENT[i] || '#4F62F7'}
                onShortlist={onShortlist}
                onPass={onPass}
                onDraft={onDraft}
                onView={onView}
              />
            ))}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <span className="text-[12px] text-[#8892A0]">Showing {pagedShortlist.length} of {shortlisted.length} shortlisted · Page {page} of 3</span>
            <div className="flex items-center gap-1.5">
              <PagerNav onClick={() => setPage((p) => Math.max(1, p - 1))}><ChevronLeft className="h-3.5 w-3.5" /></PagerNav>
              {[1, 2, 3].map((p) => (
                <button key={p} type="button" onClick={() => setPage(p)} className={`h-[30px] w-[30px] rounded-lg border text-[12px] font-medium transition ${page === p ? 'border-[#4F62F7] bg-[#4F62F7] text-white' : 'border-[#E4E7EC] bg-white text-[#3D4A5C] hover:border-[#C8CDD6]'}`}>{p}</button>
              ))}
              <PagerNav onClick={() => setPage((p) => Math.min(3, p + 1))}><ChevronRight className="h-3.5 w-3.5" /></PagerNav>
            </div>
            <button type="button" className="text-[12px] font-medium text-[#4F62F7] hover:underline">View all {posting.stat2Value} →</button>
          </div>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-[#E4E7EC] bg-white">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-[#E4E7EC] bg-[#F7F8FA]">
                {['#', 'Candidate', 'University', 'Degree', 'Score', 'Status', 'Actions'].map((h, i) => (
                  <th key={h} className={`px-3 py-2 text-[10px] font-bold uppercase tracking-[.07em] text-[#8892A0] ${i === 6 ? 'text-right' : 'text-left'}`} style={i === 0 ? { width: 32 } : {}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visibleAll.map((c, i) => {
                const st = statuses[c.id] || c.status
                return (
                  <tr key={c.id} className="border-b border-[#E4E7EC] last:border-b-0 hover:bg-[#F7F8FA]">
                    <td className="px-3 py-2.5 font-mono text-[11px] text-[#8892A0]">{i + 1}</td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-2.5">
                        <Avatar initials={c.initials} tone={AVATAR_TONES[i % AVATAR_TONES.length]} size={30} fontSize={10} />
                        <div>
                          <div className="text-[13px] font-semibold text-[#0F1117]">{c.name}</div>
                          <div className="text-[11px] text-[#8892A0]">{c.year} · {c.course}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-2.5 text-[12px] text-[#3D4A5C]">{c.university}</td>
                    <td className="px-3 py-2.5 text-[12px] text-[#3D4A5C]">{c.course}</td>
                    <td className="px-3 py-2.5"><span className={`inline-block rounded-[5px] px-2 py-[3px] font-mono text-[11px] font-semibold ${SCORE_PILL(c.matchScore)}`}>{c.matchScore}%</span></td>
                    <td className="px-3 py-2.5"><span className={`inline-block rounded-[4px] px-1.5 py-[2px] text-[10px] font-semibold ${STATUS_PILL[st] || STATUS_PILL.Reviewed}`}>{st}</span></td>
                    <td className="px-3 py-2.5 text-right">
                      {st !== 'Passed' ? (
                        <button type="button" onClick={() => onPass(c)} className="text-[11px] text-[#8892A0] transition hover:text-[#DC2626]">Pass</button>
                      ) : null}
                      <button type="button" onClick={() => onView(c)} className="ml-2 text-[11px] font-semibold text-[#4F62F7] hover:underline">View →</button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <div className="flex items-center justify-between px-3 py-3 text-[12px] text-[#8892A0]">
            <span>Showing {visibleAll.length} of {totalApplicantsForSwe} applicants</span>
            {visibleAll.length < filteredAll.length ? (
              <button type="button" onClick={() => setVisibleCount((n) => n + 5)} className="text-[12px] font-medium text-[#4F62F7] hover:underline">Load more →</button>
            ) : null}
          </div>
        </div>
      )}

    </main>
  )
}

function MetricCard({ label, value, valueTone, sub }) {
  const colors = { hi: 'text-[#4F62F7]', ok: 'text-[#0E9F6E]', warn: 'text-[#D97706]' }
  return (
    <div className="rounded-xl border border-[#E4E7EC] bg-white px-4 py-3.5">
      <div className="mb-1.5 text-[10px] font-bold uppercase tracking-[.07em] text-[#8892A0]">{label}</div>
      <div className={`font-mono text-[22px] font-medium leading-none ${colors[valueTone] || 'text-[#0F1117]'}`}>{value}</div>
      <div className="mt-1 text-[11px] text-[#8892A0]">{sub}</div>
    </div>
  )
}

function TabButton({ active, onClick, icon: Icon, count, countTone = 'indigo', children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-[7px] px-3.5 py-1.5 text-[13px] font-medium transition ${
        active ? 'bg-white text-[#0F1117] shadow-[0_1px_3px_rgba(0,0,0,.08)]' : 'text-[#8892A0] hover:text-[#0F1117]'
      }`}
    >
      <Icon className={`h-3.5 w-3.5 ${active ? 'text-[#4F62F7]' : ''}`} />
      {children}
      <span className={`ml-0.5 rounded-full px-2 py-[1px] font-mono text-[10px] font-semibold ${countTone === 'gray' ? 'bg-[#F7F8FA] text-[#8892A0]' : 'bg-[#EEF0FE] text-[#4F62F7]'}`}>{count}</span>
    </button>
  )
}

function FilterPill({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-2.5 py-1 text-[11px] font-medium transition ${
        active ? 'border-[#0F1117] bg-[#0F1117] text-white' : 'border-[#E4E7EC] bg-white text-[#3D4A5C] hover:border-[#C8CDD6]'
      }`}
    >
      {children}
    </button>
  )
}

function PagerNav({ onClick, children }) {
  return (
    <button type="button" onClick={onClick} className="flex h-[30px] w-[30px] items-center justify-center rounded-lg border border-[#E4E7EC] bg-white text-[#3D4A5C] transition hover:border-[#C8CDD6]">{children}</button>
  )
}

function Avatar({ initials, tone, size = 36, fontSize = 12 }) {
  return (
    <span className="flex shrink-0 items-center justify-center rounded-full font-bold text-white" style={{ background: tone, width: size, height: size, fontSize }}>
      {initials}
    </span>
  )
}

// ── Candidate row (shortlisted card) ────────────────────────────────────────
function ShortlistRow({ rank, candidate, status, accent, onShortlist, onPass, onDraft, onView }) {
  const isShortlisted = status === 'Shortlisted'
  const isPassed = status === 'Passed'
  return (
    <div
      className="relative grid grid-cols-[28px_36px_1fr_auto] items-start gap-x-3 overflow-hidden rounded-xl border border-[#E4E7EC] bg-white px-4 py-3.5 transition hover:border-[#C8CDD6]"
    >
      <span className="absolute inset-y-0 left-0 w-[3px]" style={{ background: accent }} />
      <div className="pt-2.5 text-center font-mono text-[12px] text-[#8892A0]">{String(rank).padStart(2, '0')}</div>
      <Avatar initials={candidate.initials} tone={AVATAR_TONES[(rank - 1) % AVATAR_TONES.length]} />
      <div className="min-w-0">
        <div className="mb-1 flex flex-wrap items-center gap-2">
          <span className="text-[14px] font-semibold text-[#0F1117]">{candidate.name}</span>
          <span className="text-[12px] text-[#8892A0]">{candidate.university} · {candidate.year} · {candidate.course}</span>
        </div>
        <div className="mb-1.5 flex flex-wrap gap-1">
          {candidate.evidenceChips?.map((chip) => (
            <span key={chip} className="inline-flex items-center gap-1 rounded-[4px] border border-[#E4E7EC] bg-[#F7F8FA] px-1.5 py-[2px] text-[11px] text-[#3D4A5C]">
              <Check className="h-3 w-3 text-[#0E9F6E]" />
              {chip}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          {candidate.risk ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#DC2626]">
              <AlertCircle className="h-3 w-3" />
              {candidate.risk}
            </span>
          ) : null}
          {candidate.validateNext ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#D97706]">
              <ArrowRight className="h-3 w-3" />
              Validate: {candidate.validateNext}
            </span>
          ) : null}
        </div>
        <div className="col-start-3 mt-2 flex flex-wrap gap-1.5" style={{ gridColumn: '3 / span 2' }}>
          {isShortlisted ? (
            <button type="button" disabled className="inline-flex items-center gap-1 rounded-md border border-[#6ee7b7] bg-[#E8F8F3] px-3 py-1 text-[11px] font-medium text-[#0E9F6E]">
              <Check className="h-3 w-3" /> Shortlisted
            </button>
          ) : (
            <button type="button" onClick={() => onShortlist(candidate)} className="inline-flex items-center gap-1 rounded-md border border-[#E4E7EC] bg-[#F7F8FA] px-3 py-1 text-[11px] font-medium text-[#3D4A5C] transition hover:border-[#C8CDD6] hover:text-[#0F1117]">
              <Bookmark className="h-3 w-3" /> Shortlist
            </button>
          )}
          <button type="button" onClick={() => onDraft(candidate)} className="inline-flex items-center gap-1 rounded-md border border-[#4F62F7] bg-[#4F62F7] px-3 py-1 text-[11px] font-medium text-white transition hover:bg-[#3d50e8]">
            <Mail className="h-3 w-3" /> Draft outreach
          </button>
          {!isPassed ? (
            <button type="button" onClick={() => onPass(candidate)} className="inline-flex items-center gap-1 rounded-md border border-[#E4E7EC] bg-[#F7F8FA] px-3 py-1 text-[11px] font-medium text-[#3D4A5C] transition hover:border-[#C8CDD6] hover:text-[#0F1117]">
              Pass
            </button>
          ) : null}
          <button type="button" onClick={() => onView(candidate)} className="inline-flex items-center gap-1 text-[11px] font-medium text-[#4F62F7] hover:underline">
            <Sparkles className="h-3 w-3" /> Why this match?
          </button>
        </div>
      </div>
      <div className="flex flex-col items-end gap-1.5 pt-0.5">
        <ScoreRing score={candidate.matchScore} colorKey={candidate.matchTier} />
        <span className="rounded-[3px] bg-[#EEF0FE] px-1.5 py-[2px] text-[9px] font-bold uppercase tracking-[.04em] text-[#4F62F7]">
          {candidate.matchTier === 'green' ? 'High' : candidate.matchTier === 'blue' ? 'Strong' : 'Match'}
        </span>
      </div>
    </div>
  )
}

// ── Right rail: Talent AI chat + tracker + input ────────────────────────────
function TalentAIPanel({ tracker, messages, onSendMessage, onQuickAction }) {
  const [text, setText] = useState('')
  const threadRef = useRef(null)

  useEffect(() => {
    if (threadRef.current) threadRef.current.scrollTop = threadRef.current.scrollHeight
  }, [messages])

  const submit = () => {
    const v = text.trim()
    if (!v) return
    onSendMessage(v)
    setText('')
  }

  return (
    <aside className="flex h-full flex-col overflow-hidden border-l border-[#E4E7EC] bg-white">
      <div className="flex shrink-0 items-center justify-between border-b border-[#E4E7EC] px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#4F62F7]">
            <Sparkles className="h-3.5 w-3.5 text-white" />
          </span>
          <div>
            <div className="text-[13px] font-semibold text-[#0F1117]">Talent AI</div>
            <div className="text-[11px] text-[#8892A0]">Hiring co-pilot</div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-medium text-[#0E9F6E]">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#0E9F6E]" />
          Online
        </div>
      </div>

      <div ref={threadRef} className="flex flex-1 flex-col gap-2 overflow-y-auto p-3.5">
        {messages.map((m, i) => (
          <React.Fragment key={i}>
            <div
              className={`max-w-[90%] rounded-[10px] px-3 py-2 text-[12px] leading-relaxed whitespace-pre-wrap ${
                m.role === 'ai'
                  ? 'self-start rounded-bl-[3px] border border-[#E4E7EC] bg-[#F7F8FA] text-[#0F1117]'
                  : 'self-end rounded-br-[3px] bg-[#4F62F7] text-white'
              }`}
              dangerouslySetInnerHTML={{ __html: m.text }}
            />
            <span className={`text-[9px] text-[#8892A0] ${m.role === 'user' ? 'text-right' : ''}`}>{m.ts}</span>
          </React.Fragment>
        ))}
      </div>

      <div className="shrink-0 border-t border-[#E4E7EC] px-4 py-2.5">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-[.07em] text-[#8892A0]">Application Tracker</span>
          <button type="button" className="text-[11px] font-medium text-[#4F62F7] hover:underline">View all →</button>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          <TrackerCell num={tracker.shortlisted} label="Shortlisted" tone="indigo" />
          <TrackerCell num={tracker.contacted} label="Contacted" tone="blue" />
          <TrackerCell num={tracker.passed} label="Passed" tone="gray" />
        </div>
      </div>

      <div className="shrink-0 border-t border-[#E4E7EC] px-3.5 py-3">
        <div className="mb-2 flex flex-col gap-1">
          <QuickChip icon={Mail} onClick={() => onQuickAction('Draft outreach · Ivan Lim')}>Draft outreach · Ivan Lim</QuickChip>
          <QuickChip icon={ShieldAlert} onClick={() => onQuickAction('Summarise risk signals across all shortlisted')}>Summarise risk signals</QuickChip>
          <QuickChip icon={UserPlus} onClick={() => onQuickAction('Who are the newest applicants?')}>Who are the newest applicants?</QuickChip>
        </div>
        <div className="flex items-center gap-2 rounded-[10px] border border-[#C8CDD6] bg-[#F7F8FA] px-2.5 py-1.5 focus-within:border-[#4F62F7]">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') submit() }}
            placeholder="Ask about your candidates…"
            className="flex-1 border-none bg-transparent text-[12px] text-[#0F1117] outline-none placeholder:text-[#8892A0]"
          />
          <button type="button" onClick={submit} className="flex h-[26px] w-[26px] items-center justify-center rounded-md bg-[#4F62F7] transition hover:bg-[#3d50e8]">
            <Send className="h-3 w-3 text-white" />
          </button>
        </div>
      </div>
    </aside>
  )
}

function TrackerCell({ num, label, tone }) {
  const color = tone === 'indigo' ? 'text-[#4F62F7]' : tone === 'blue' ? 'text-[#2563eb]' : 'text-[#8892A0]'
  return (
    <div className="rounded-lg bg-[#F7F8FA] p-2 text-center">
      <div className={`font-mono text-[18px] font-medium leading-none ${color}`}>{num}</div>
      <div className="mt-0.5 text-[10px] text-[#8892A0]">{label}</div>
    </div>
  )
}

function QuickChip({ icon: Icon, onClick, children }) {
  return (
    <button type="button" onClick={onClick} className="flex items-center gap-1.5 rounded-md border border-[#E4E7EC] bg-[#F7F8FA] px-2.5 py-1.5 text-left text-[11px] text-[#3D4A5C] transition hover:border-[#4F62F7] hover:text-[#4F62F7]">
      <Icon className="h-3.5 w-3.5" />
      {children}
    </button>
  )
}

// ── Modal ────────────────────────────────────────────────────────────────────
function NewPostingModal({ open, onClose, onCreate }) {
  const [form, setForm] = useState({ type: 'Internship', title: '', company: '', description: '', deadline: '' })
  if (!open) return null
  const patch = (p) => setForm((prev) => ({ ...prev, ...p }))
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50" onClick={onClose}>
      <div className="w-[460px] max-w-[94vw] rounded-2xl border border-[#E4E7EC] bg-white p-7" onClick={(e) => e.stopPropagation()}>
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-[17px] font-semibold text-[#0F1117]">Create posting</h2>
          <button type="button" onClick={onClose} className="rounded-md p-1 text-[#8892A0] hover:bg-[#F7F8FA]"><X className="h-4 w-4" /></button>
        </div>
        <ModalField label="Posting type">
          <select value={form.type} onChange={(e) => patch({ type: e.target.value })} className="w-full rounded-lg border border-[#E4E7EC] bg-[#F7F8FA] px-3 py-2.5 text-[13px] outline-none focus:border-[#4F62F7]">
            {['Internship', 'Full-time', 'Challenge', 'Workshop'].map((o) => <option key={o}>{o}</option>)}
          </select>
        </ModalField>
        <ModalField label="Role title">
          <input value={form.title} onChange={(e) => patch({ title: e.target.value })} placeholder="e.g. Frontend Engineering Intern" className="w-full rounded-lg border border-[#E4E7EC] bg-[#F7F8FA] px-3 py-2.5 text-[13px] outline-none focus:border-[#4F62F7]" />
        </ModalField>
        <ModalField label="Company and location">
          <input value={form.company} onChange={(e) => patch({ company: e.target.value })} placeholder="e.g. Acme Corporation · Kuala Lumpur" className="w-full rounded-lg border border-[#E4E7EC] bg-[#F7F8FA] px-3 py-2.5 text-[13px] outline-none focus:border-[#4F62F7]" />
        </ModalField>
        <ModalField label="Description">
          <textarea value={form.description} onChange={(e) => patch({ description: e.target.value })} placeholder="Describe the role, responsibilities, and requirements…" className="min-h-[72px] w-full resize-y rounded-lg border border-[#E4E7EC] bg-[#F7F8FA] px-3 py-2.5 text-[13px] outline-none focus:border-[#4F62F7]" />
        </ModalField>
        <ModalField label="Application deadline">
          <input type="date" value={form.deadline} onChange={(e) => patch({ deadline: e.target.value })} className="w-full rounded-lg border border-[#E4E7EC] bg-[#F7F8FA] px-3 py-2.5 text-[13px] outline-none focus:border-[#4F62F7]" />
        </ModalField>
        <div className="mt-1 flex justify-end gap-2.5">
          <button type="button" onClick={onClose} className="rounded-lg border border-[#E4E7EC] bg-white px-3.5 py-1.5 text-[13px] font-medium text-[#0F1117] transition hover:bg-[#F7F8FA]">Cancel</button>
          <button type="button" onClick={() => { onCreate(form); onClose() }} className="inline-flex items-center gap-1.5 rounded-lg bg-[#4F62F7] px-3.5 py-1.5 text-[13px] font-medium text-white transition hover:bg-[#3d50e8]">
            <Plus className="h-3.5 w-3.5" /> Create posting
          </button>
        </div>
      </div>
    </div>
  )
}

function ModalField({ label, children }) {
  return (
    <div className="mb-3.5">
      <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[.06em] text-[#8892A0]">{label}</label>
      {children}
    </div>
  )
}

// ── Toast ────────────────────────────────────────────────────────────────────
function DemoToast({ message }) {
  if (!message) return null
  return (
    <div className="fixed bottom-5 right-5 z-[300] rounded-lg border border-[#E4E7EC] bg-white px-4 py-2.5 text-[13px] font-medium text-[#0F1117] shadow-[0_8px_24px_rgba(15,17,23,.12)]">
      {message}
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function TalentDiscovery() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const initialPostingId = searchParams.get('postingId')

  const [selectedPostingId, setSelectedPostingId] = useState(
    postings.some((p) => p.id === initialPostingId) ? initialPostingId : postings[0].id,
  )
  const [statuses, setStatuses] = useState({})
  const [tab, setTab] = useState('shortlisted')
  const [filter, setFilter] = useState('all')
  const [allFilter, setAllFilter] = useState('all')
  const [page, setPage] = useState(1)
  const [modalOpen, setModalOpen] = useState(false)
  const [toast, setToast] = useState('')
  const toastRef = useRef(null)

  const shortlistCandidate = useEmployerWorkspaceStore((s) => s.shortlistCandidate)
  const passCandidate = useEmployerWorkspaceStore((s) => s.passCandidate)

  const selectedPosting = postings.find((p) => p.id === selectedPostingId) || postings[0]

  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Hi Edwin! <strong>8 of 47</strong> applicants match your SE Intern criteria. Ivan Lim leads at 96% with verified full-stack work and workshop attendance — a strong intent signal. Want me to draft outreach?', ts: '9:02 AM' },
    { role: 'user', text: 'Who should I contact first?', ts: '9:03 AM' },
    { role: 'ai', text: "Ivan Lim first — he's actively interviewing elsewhere. Reach out today. Nur Alya next, but flag the low-commitment signal when you follow up.", ts: '9:03 AM' },
  ])

  const tracker = useMemo(() => {
    const list = Object.values(statuses)
    return {
      shortlisted: 2 + list.filter((s) => s === 'Shortlisted').length,
      contacted: 0,
      passed: 1 + list.filter((s) => s === 'Passed').length,
    }
  }, [statuses])

  const showToast = (message) => {
    window.clearTimeout(toastRef.current)
    setToast(message)
    toastRef.current = window.setTimeout(() => setToast(''), 2200)
  }

  const pushMsg = (role, text) => setMessages((prev) => [...prev, { role, text, ts: 'Just now' }])

  const handleShortlist = (c) => {
    setStatuses((prev) => ({ ...prev, [c.id]: 'Shortlisted' }))
    shortlistCandidate(c.id)
    showToast(`${c.name} added to shortlist`)
  }
  const handlePass = (c) => {
    setStatuses((prev) => ({ ...prev, [c.id]: 'Passed' }))
    passCandidate(c.id)
    showToast(`${c.name} passed`)
  }
  const handleView = (c) => navigate(`/employer/candidates?candidateId=${c.id}&from=${encodeURIComponent('Talent Discovery')}`)
  const handleDraft = (c) => {
    pushMsg('user', `Draft outreach for ${c.name}`)
    window.setTimeout(() => pushMsg('ai', `Draft ready for ${c.name.split(' ')[0]}. Personalised from CareerGraph profile — hit copy or edit before you send.`), 500)
    showToast(`Draft ready for ${c.name}`)
  }
  const handleChatSend = (text) => {
    pushMsg('user', text)
    window.setTimeout(() => pushMsg('ai', `Analysing "${text}" across CareerGraph data…`), 500)
  }
  const handleQuickAction = (label) => {
    pushMsg('user', label)
    window.setTimeout(() => {
      if (label.includes('outreach')) pushMsg('ai', 'Draft for Ivan: Subject: "SE Intern at Acme — let\'s talk, Ivan". Hi Ivan, your full-stack project caught our attention. Free for a 20-min call?')
      else if (label.includes('risk')) pushMsg('ai', 'Risk signals: Ivan Lim — competing offers (urgent). Nur Alya — low commitment (5 apps). Marcus Tan — large-brand preference. Others stable.')
      else pushMsg('ai', 'Newest applicants: Aisha Rahman (MMU), Chloe Tan (Monash). Both applied within the last 24h.')
    }, 500)
  }
  const handleCreatePosting = (form) => {
    if (form.title.trim()) showToast(`Posting draft "${form.title}" saved`)
  }

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-[#F7F8FA] text-[#0F1117]" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
      <EmployerNav variant="glass" />

      <div className="grid min-h-0 flex-1 grid-cols-[240px_minmax(0,1fr)_320px] overflow-hidden">
        <PostingsRail
          selectedId={selectedPostingId}
          onSelect={setSelectedPostingId}
          onCreate={() => setModalOpen(true)}
        />
        <MainPanel
          posting={selectedPosting}
          onNotify={showToast}
          statuses={statuses}
          onShortlist={handleShortlist}
          onPass={handlePass}
          onView={handleView}
          onDraft={handleDraft}
          tab={tab}
          setTab={setTab}
          filter={filter}
          setFilter={setFilter}
          allFilter={allFilter}
          setAllFilter={setAllFilter}
          page={page}
          setPage={setPage}
        />
        <TalentAIPanel
          tracker={tracker}
          messages={messages}
          onSendMessage={handleChatSend}
          onQuickAction={handleQuickAction}
        />
      </div>

      <NewPostingModal open={modalOpen} onClose={() => setModalOpen(false)} onCreate={handleCreatePosting} />
      <DemoToast message={toast} />
    </div>
  )
}
