import React, { useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  Award,
  Bookmark,
  BookmarkCheck,
  Briefcase,
  Building2,
  CalendarClock,
  Check,
  ChevronRight,
  Clock,
  ExternalLink,
  Globe,
  MapPin,
  MessageSquare,
  Send,
  Sparkles,
  Star,
  Trophy,
  Users,
  Wifi,
} from 'lucide-react'
import HomeTopNav from '../components/home/HomeTopNav'
import { candidateOverview, mockUser } from '../data/mockData'
import {
  COMPANY_DIRECTORY,
  TIER_META,
  getCompanyById,
  getCompanyOpenings,
  getCompanyPeers,
} from '../data/companiesData'

// ── Reused mini-tokens ─────────────────────────────────────────────────────
const SIGNAL_META = {
  verified: { Icon: Check,          bg: '#FFEDD5', color: '#C2410C' },
  award:    { Icon: Trophy,         bg: '#F5F6FA', color: '#334155' },
  response: { Icon: CalendarClock,  bg: '#DCFCE7', color: '#0F6E56' },
  review:   { Icon: Star,           bg: '#FEF3C7', color: '#854F0B' },
}

function matchTone(pct) {
  if (pct >= 90) return { bg: '#E1F5EE', color: '#0F6E56' }
  if (pct >= 80) return { bg: '#E6F1FB', color: '#185FA5' }
  return { bg: '#F5F6FA', color: '#6B6F8A' }
}

function sdgTone(number) {
  if ([8, 9].includes(number)) return { bg: '#E1F5EE', color: '#0F6E56' }
  if ([4].includes(number)) return { bg: '#E6F1FB', color: '#185FA5' }
  return { bg: '#FAEEDA', color: '#854F0B' }
}

function deadlineTone(text) {
  const t = String(text || '')
  const days = parseInt(t.match(/(\d+)/)?.[1] || '99', 10)
  const unit = /week/i.test(t) ? days * 7 : /month/i.test(t) ? days * 30 : days
  if (unit <= 5) return { bg: '#FEE2E2', color: '#B91C1C' }
  if (unit <= 14) return { bg: '#FEF3C7', color: '#92400E' }
  return { bg: '#F5F6FA', color: '#6B6F8A' }
}

// ── Sections ───────────────────────────────────────────────────────────────
function HeroCard({ company, tier, mtone, following, onToggleFollow, onMessage }) {
  return (
    <section className="overflow-hidden rounded-2xl border shadow-[0_2px_10px_rgba(15,17,32,.04)]" style={{ borderColor: tier?.border || '#E8E9EF', background: tier?.cardBg || '#fff' }}>
      {tier ? (
        <div className="flex items-center justify-between px-6 py-1.5" style={{ background: tier.ribbon }}>
          <span className="inline-flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-[.08em]" style={{ color: tier.ribbonText }}>
            <Sparkles className="h-3 w-3" />
            Premier Partner{tier.label ? ` · ${tier.label}` : ''}
          </span>
          {company.partnerYears ? (
            <span className="text-[10.5px] font-semibold" style={{ color: tier.ribbonText }}>{company.partnerYears} years with CareerOS</span>
          ) : null}
        </div>
      ) : null}
      <div className="flex flex-wrap items-start justify-between gap-4 p-6">
        <div className="flex items-start gap-4">
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-[18px] font-bold text-white" style={{ background: company.logoColor }}>
            {company.initials}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-[22px] font-semibold text-[#1A1C2E]">{company.name}</h1>
              {company.verified ? (
                <span title="Verified employer" className="flex h-5 w-5 items-center justify-center rounded-full bg-[#FFEDD5] text-[#C2410C]">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
              ) : null}
              <span className="rounded-md px-2 py-0.5 text-[12px] font-semibold" style={{ background: mtone.bg, color: mtone.color }}>{company.matchPercent}% match</span>
            </div>
            <p className="mt-1 text-[13px] text-[#6B6F8A]">{company.industry}</p>
            <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12.5px] text-[#6B6F8A]">
              <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {company.location}</span>
              <span className="inline-flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {company.size}</span>
              {company.founded ? <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> Est. {company.founded}</span> : null}
              {company.website ? (
                <a href={`https://${company.website}`} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="inline-flex items-center gap-1 text-[#5B6CF9] hover:underline">
                  <Globe className="h-3.5 w-3.5" /> {company.website}
                </a>
              ) : null}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onToggleFollow}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#D0D2DC] bg-white px-3.5 py-1.5 text-[13px] font-medium text-[#1A1C2E] transition hover:bg-[#F5F6FA]"
          >
            {following ? <BookmarkCheck className="h-3.5 w-3.5 text-[#5B6CF9]" /> : <Bookmark className="h-3.5 w-3.5" />}
            {following ? 'Following' : 'Follow company'}
          </button>
          <button
            type="button"
            onClick={onMessage}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#5B6CF9] px-3.5 py-1.5 text-[13px] font-medium text-white transition hover:bg-[#4a5ce8]"
          >
            <MessageSquare className="h-3.5 w-3.5" /> Message recruiter
          </button>
        </div>
      </div>

      <p className="mx-6 mb-6 text-[13.5px] leading-6 text-[#374151]">{company.tagline}</p>
    </section>
  )
}

function StatsStrip({ company, peers, openings }) {
  const items = [
    { label: 'Open roles',        value: company.openings ?? openings.length, sub: 'This period',       color: '#5B6CF9' },
    { label: 'Followers',         value: company.followers || '—',            sub: 'CareerOS network',  color: '#334155' },
    { label: 'Peers here',        value: peers.total,                         sub: 'From CareerOS grads', color: '#0F766E' },
    { label: 'Same-uni peers',    value: peers.sameUniCount,                  sub: `${mockUser.university}`, color: '#C2410C' },
    { label: 'Rating',            value: typeof company.rating === 'number' ? company.rating.toFixed(1) : '—', sub: 'Employee reviews', color: '#B45309' },
  ]
  return (
    <div className="grid grid-cols-2 gap-3 rounded-2xl border border-[#E8E9EF] bg-white p-4 sm:grid-cols-3 md:grid-cols-5">
      {items.map((s) => (
        <div key={s.label} className="rounded-xl bg-[#F5F6FA] p-3">
          <p className="text-[10.5px] font-semibold uppercase tracking-wide text-[#8a94ab]">{s.label}</p>
          <p className="mt-0.5 text-[18px] font-bold leading-none" style={{ color: s.color }}>{s.value}</p>
          <p className="mt-0.5 text-[10.5px] text-[#9aa3b8]">{s.sub}</p>
        </div>
      ))}
    </div>
  )
}

function PeersSection({ peers, userUniversity, onMessagePeer }) {
  if (!peers.list.length) {
    return (
      <section className="rounded-2xl border border-[#E8E9EF] bg-white p-5">
        <p className="text-[13px] font-semibold text-[#1A1C2E]">Your network at this company</p>
        <p className="mt-2 text-[12.5px] text-[#6B6F8A]">
          None of your CareerOS connections work here yet. Follow the company to be notified when a peer joins.
        </p>
      </section>
    )
  }
  return (
    <section className="rounded-2xl border border-[#E8E9EF] bg-white p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-[13px] font-semibold text-[#1A1C2E]">
            Peers working here
            <span className="ml-2 rounded-full bg-[#F5F3FF] px-2 py-0.5 text-[11px] font-semibold text-[#5B6CF9]">
              {peers.sameUniCount} from {userUniversity}
            </span>
          </p>
          <p className="mt-0.5 text-[11.5px] text-[#6B6F8A]">Alumni + connections from your CareerOS network</p>
        </div>
        <button type="button" className="text-[12px] font-semibold text-[#5B6CF9] hover:underline">See all {peers.total} →</button>
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {peers.list.map((p) => {
          const sameUni = p.university === userUniversity
          return (
            <div key={p.name} className={`flex items-center gap-3 rounded-xl border p-3 ${sameUni ? 'border-[#C7CDFC] bg-[#F0F2FF]' : 'border-[#E8E9EF] bg-white'}`}>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[12px] font-bold text-white" style={{ background: p.color }}>
                {p.initials}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-semibold text-[#1A1C2E]">
                  {p.name}
                  {sameUni ? (
                    <span className="ml-1.5 rounded-full bg-white px-1.5 py-0.5 text-[9.5px] font-bold text-[#5B6CF9] ring-1 ring-[#C7CDFC]">Same uni</span>
                  ) : null}
                </p>
                <p className="truncate text-[11.5px] text-[#6B6F8A]">{p.role}</p>
                <p className="mt-0.5 truncate text-[11px] text-[#9aa3b8]">{p.university} · {p.tenure}</p>
              </div>
              <button
                type="button"
                onClick={() => onMessagePeer?.(p)}
                className="shrink-0 rounded-md border border-[#D0D2DC] bg-white p-1.5 text-[#6B6F8A] transition hover:bg-[#F5F6FA] hover:text-[#5B6CF9]"
                aria-label={`Message ${p.name}`}
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          )
        })}
      </div>
    </section>
  )
}

const TYPE_TONE = {
  Internship: 'bg-[#E6F1FB] text-[#185FA5]',
  'Full-time': 'bg-[#E1F5EE] text-[#0F6E56]',
  Challenge: 'bg-[#FEF3C7] text-[#92400E]',
  Event: 'bg-[#F5F3FF] text-[#6D28D9]',
}

function OpeningsSection({ openings, onApply }) {
  const [filter, setFilter] = useState('All')
  const types = ['All', ...Array.from(new Set(openings.map((o) => o.type)))]
  const filtered = filter === 'All' ? openings : openings.filter((o) => o.type === filter)

  return (
    <section id="openings" className="rounded-2xl border border-[#E8E9EF] bg-white p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <p className="text-[13px] font-semibold text-[#1A1C2E]">
          Open roles
          <span className="ml-2 rounded-full bg-[#EEF0FF] px-2 py-0.5 text-[11px] font-semibold text-[#5B6CF9]">{openings.length}</span>
        </p>
        <div className="inline-flex gap-[3px] rounded-full border border-[#E8E9EF] bg-[#F5F6FA] p-[3px]">
          {types.map((t) => {
            const active = filter === t
            return (
              <button
                key={t}
                type="button"
                onClick={() => setFilter(t)}
                className={`rounded-full px-3 py-0.5 text-[11.5px] font-medium transition ${
                  active ? 'bg-white text-[#1A1C2E] shadow-[0_1px_3px_rgba(0,0,0,.08)]' : 'text-[#6B6F8A] hover:text-[#1A1C2E]'
                }`}
              >
                {t}
              </button>
            )
          })}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-xl border border-dashed border-[#D0D2DC] bg-[#F5F6FA] p-6 text-center text-[12.5px] text-[#6B6F8A]">
          No {filter.toLowerCase()} roles open right now.
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          {filtered.map((o, i) => {
            const mt = matchTone(o.matchPercent)
            const dt = deadlineTone(o.deadline)
            return (
              <div key={i} className="flex flex-wrap items-center gap-3 rounded-xl border border-[#E8E9EF] bg-white p-3.5 transition hover:border-[#C7CDFC] hover:shadow-[0_2px_10px_rgba(91,108,249,.06)]">
                <span className={`shrink-0 rounded-md px-2 py-0.5 text-[10.5px] font-bold uppercase tracking-wide ${TYPE_TONE[o.type] || 'bg-[#F5F6FA] text-[#334155]'}`}>{o.type}</span>
                <div className="min-w-[220px] flex-1">
                  <p className="text-[13.5px] font-semibold text-[#1A1C2E]">{o.title}</p>
                  <p className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11.5px] text-[#6B6F8A]">
                    <span className="inline-flex items-center gap-1">
                      {/online|remote/i.test(o.mode || o.location) ? <Wifi className="h-3 w-3" /> : <MapPin className="h-3 w-3" />}
                      {o.location}{o.mode ? ` · ${o.mode}` : ''}
                    </span>
                    {o.stipend ? <span className="inline-flex items-center gap-1"><Briefcase className="h-3 w-3" /> {o.stipend}</span> : null}
                  </p>
                  {o.skills?.length ? (
                    <p className="mt-1 flex flex-wrap gap-1">
                      {o.skills.slice(0, 4).map((s) => (
                        <span key={s} className="rounded border border-[#E8E9EF] bg-[#F5F6FA] px-1.5 py-0.5 text-[10.5px] text-[#6B6F8A]">{s}</span>
                      ))}
                    </p>
                  ) : null}
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-md px-2 py-0.5 text-[11.5px] font-semibold" style={{ background: mt.bg, color: mt.color }}>{o.matchPercent}%</span>
                  <span className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-medium" style={{ background: dt.bg, color: dt.color }}>
                    <Clock className="h-3 w-3" /> {o.deadline}
                  </span>
                  <button
                    type="button"
                    onClick={() => onApply?.(o)}
                    className="inline-flex items-center gap-1 rounded-md bg-[#5B6CF9] px-3 py-1 text-[12px] font-medium text-white transition hover:bg-[#4a5ce8]"
                  >
                    View details
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}

function SidebarPanels({ company }) {
  return (
    <aside className="flex flex-col gap-3.5">
      {/* Verified signals */}
      {company.verifiedSignals?.length || company.tier ? (
        <div className="rounded-2xl border border-[#E8E9EF] bg-white p-5">
          <p className="mb-3 text-[13px] font-semibold text-[#1A1C2E]">Verified signals</p>
          <div className="flex flex-wrap gap-1.5">
            {company.verifiedSignals?.map((sig) => {
              const m = SIGNAL_META[sig.kind] || SIGNAL_META.award
              const Icon = m.Icon
              return (
                <span key={sig.label} className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold" style={{ background: m.bg, color: m.color }}>
                  <Icon className="h-3 w-3" />
                  {sig.label}
                </span>
              )
            })}
            {company.tier ? (
              <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold" style={{ background: TIER_META[company.tier].badgeBg, color: TIER_META[company.tier].badgeText }}>
                <Sparkles className="h-3 w-3" />
                {TIER_META[company.tier].badgeLabel}{company.partnerYears ? ` · ${company.partnerYears}y` : ''}
              </span>
            ) : null}
          </div>
        </div>
      ) : null}

      {/* Culture */}
      {company.culture?.length ? (
        <div className="rounded-2xl border border-[#E8E9EF] bg-white p-5">
          <p className="mb-3 text-[13px] font-semibold text-[#1A1C2E]">Culture &amp; values</p>
          <ul className="space-y-1.5 text-[12.5px] text-[#374151]">
            {company.culture.map((c) => (
              <li key={c} className="flex items-start gap-2">
                <Check className="mt-[3px] h-3 w-3 shrink-0 text-[#0F6E56]" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {/* SDG alignment */}
      {company.sdgs?.length ? (
        <div className="rounded-2xl border border-[#E8E9EF] bg-white p-5">
          <p className="mb-3 text-[13px] font-semibold text-[#1A1C2E]">SDG focus</p>
          <div className="flex flex-wrap gap-1.5">
            {company.sdgs.map((s) => {
              const t = sdgTone(s.number)
              return (
                <span key={s.number} className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-semibold" style={{ background: t.bg, color: t.color }}>
                  <Award className="h-3 w-3" />
                  SDG {s.number} · {s.title}
                </span>
              )
            })}
          </div>
        </div>
      ) : null}

      {/* Employee quote */}
      {company.positiveReview ? (
        <div className="rounded-2xl border border-[#FDE68A] bg-[#FEF9E7] p-5">
          <p className="mb-2 flex items-center gap-1.5 text-[12px] font-semibold text-[#7A4E0B]">
            <Star className="h-3.5 w-3.5 fill-[#F59E0B] text-[#F59E0B]" />
            Employee review
          </p>
          <p className="text-[12.5px] italic leading-5 text-[#7A4E0B]">{company.positiveReview}</p>
        </div>
      ) : null}

      {/* AI highlight */}
      {company.highlight ? (
        <div className="rounded-2xl border border-[#C7CDFC] bg-[#F0F2FF] p-5">
          <p className="mb-1.5 flex items-center gap-1.5 text-[12px] font-semibold text-[#5B6CF9]">
            <Sparkles className="h-3.5 w-3.5" />
            AI insight for you
          </p>
          <p className="text-[12.5px] leading-5 text-[#4C1D95]">{company.highlight}</p>
        </div>
      ) : null}
    </aside>
  )
}

function RelatedCompanies({ current, onOpen }) {
  const related = COMPANY_DIRECTORY.filter((c) => c.id !== current.id && c.industry.split('·')[0].trim() === current.industry.split('·')[0].trim()).slice(0, 4)
  if (related.length === 0) return null
  return (
    <section className="rounded-2xl border border-[#E8E9EF] bg-white p-5">
      <p className="mb-3 text-[13px] font-semibold text-[#1A1C2E]">Similar companies</p>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
        {related.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => onOpen(c)}
            className="flex items-center gap-2.5 rounded-xl border border-[#E8E9EF] bg-white p-3 text-left transition hover:-translate-y-0.5 hover:border-[#C7CDFC]"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold text-white" style={{ background: c.logoColor }}>{c.initials}</span>
            <div className="min-w-0">
              <p className="truncate text-[12.5px] font-semibold text-[#1A1C2E]">{c.name}</p>
              <p className="truncate text-[10.5px] text-[#6B6F8A]">{c.industry}</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function CompanyProfilePage() {
  const { companyId } = useParams()
  const navigate = useNavigate()
  const readiness = candidateOverview.careerSnapshot.readiness

  const company = getCompanyById(companyId)
  const [following, setFollowing] = useState(false)
  const [toast, setToast] = useState('')

  const showToast = (msg) => {
    setToast(msg)
    window.clearTimeout(showToast._t)
    showToast._t = window.setTimeout(() => setToast(''), 2200)
  }

  const openings = useMemo(() => (company ? getCompanyOpenings(company.id) : []), [company])
  const peers = useMemo(() => (company ? getCompanyPeers(company.id, mockUser.university) : { list: [], total: 0, sameUniCount: 0 }), [company])

  if (!company) return <Navigate to="/student/opportunities" replace />

  const tier = TIER_META[company.tier]
  const mtone = matchTone(company.matchPercent)

  return (
    <div className="min-h-screen bg-[#F5F6FA] text-[#1A1C2E]" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <HomeTopNav user={mockUser} readiness={readiness} />

      <div className="mx-auto max-w-[1280px] px-6 pb-16 pt-6 lg:px-8">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-4 inline-flex items-center gap-1 rounded-lg border border-[#D0D2DC] bg-white px-2.5 py-1 text-[12.5px] font-medium text-[#374151] transition hover:bg-[#F5F6FA]"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Companies
        </button>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="flex flex-col gap-5">
            <HeroCard
              company={company}
              tier={tier}
              mtone={mtone}
              following={following}
              onToggleFollow={() => {
                setFollowing((v) => !v)
                showToast(following ? `Unfollowed ${company.name}` : `Following ${company.name}`)
              }}
              onMessage={() => showToast(`Message recruiter — draft opened for ${company.name}`)}
            />
            <StatsStrip company={company} peers={peers} openings={openings} />
            <PeersSection
              peers={peers}
              userUniversity={mockUser.university}
              onMessagePeer={(p) => showToast(`Message drafted to ${p.name}`)}
            />
            <OpeningsSection
              openings={openings}
              onApply={(o) => showToast(`Opening: ${o.title}`)}
            />
            <RelatedCompanies current={company} onOpen={(c) => navigate(`/student/companies/${c.id}`)} />
          </div>
          <SidebarPanels company={company} />
        </div>
      </div>

      {toast ? (
        <div className="fixed bottom-5 right-5 z-50 rounded-xl border border-[#E8E9EF] bg-white px-4 py-2.5 text-sm font-medium text-[#1A1C2E] shadow-[0_10px_30px_rgba(15,17,32,.08)]">
          {toast}
        </div>
      ) : null}
    </div>
  )
}
