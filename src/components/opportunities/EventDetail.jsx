import React, { useState } from 'react'
import { eventDetailDefault } from '../../data/mockData'

// All "body" content (tags, agenda, prizes, etc.) is read from `detail`.
// Hero content (title, type, org, date, going, matchPercent) is read from the
// clicked event itself. When the AI backend is wired up, pass a per-event
// `detail` prop — otherwise the shared placeholder is used.

const TAG_TONE = {
  violet: 'bg-violet-100 text-violet-700',
  teal: 'bg-teal-100 text-teal-700',
  emerald: 'bg-emerald-100 text-emerald-700',
  amber: 'bg-amber-100 text-amber-700',
  pink: 'bg-pink-100 text-pink-700',
  neutral: 'bg-slate-100 text-slate-600',
}

const TINT_BG = {
  violet: 'bg-violet-50 text-violet-600',
  teal: 'bg-teal-50 text-teal-600',
  emerald: 'bg-emerald-50 text-emerald-600',
  amber: 'bg-amber-50 text-amber-600',
}

const PRIZE_TONE = {
  gold: 'from-amber-50 to-yellow-100 border-amber-200',
  silver: 'from-slate-50 to-slate-100 border-slate-200',
  bronze: 'from-orange-50 to-amber-100 border-orange-200',
}

const TABS = [
  { id: 'about', label: 'Overview' },
  { id: 'agenda', label: 'Agenda' },
  { id: 'prizes', label: 'Prizes' },
  { id: 'people', label: 'Speakers / Judges' },
  { id: 'venue', label: 'Venue' },
]

// ─── small reusable card shell ──────────────────────────────────────────
function ContentCard({ title, icon, children, className = '' }) {
  return (
    <section className={`rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_4px_16px_rgba(108,99,255,0.06)] ${className}`}>
      {title && (
        <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-900">
          {icon && <span aria-hidden>{icon}</span>}
          {title}
        </h3>
      )}
      {children}
    </section>
  )
}

// ─── hero ──────────────────────────────────────────────────────────────
function Hero({ event, onBack }) {
  const heroGradient = event.heroGradient ?? event.thumbGradient ?? 'from-violet-900 via-indigo-800 to-violet-500'
  return (
    <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br p-7 text-white shadow-[0_20px_60px_rgba(108,99,255,0.25)] ${heroGradient}`}>
      {/* decorative grid + glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.15),transparent_40%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:32px_32px]" />

      <button
        type="button"
        onClick={onBack}
        className="relative z-10 mb-4 inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur transition hover:bg-white/20"
      >
        <span aria-hidden>←</span> Back to Event Hub
      </button>

      <div className="relative z-10 max-w-3xl">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur">
            <span aria-hidden>🏷</span> {event.type ?? 'Event'}
          </span>
          {event.org && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
              <span aria-hidden>🏢</span> {event.org}
            </span>
          )}
          {event.isHot && (
            <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/90 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide">
              🔥 Trending
            </span>
          )}
          {event.matchPercent != null && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/90 px-2.5 py-1 text-[11px] font-bold text-white">
              {event.matchPercent}% Match
            </span>
          )}
        </div>

        <h1 className="mt-3 text-3xl font-extrabold leading-tight">{event.title ?? 'Event'}</h1>

        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/90">
          {event.date && (
            <span className="flex items-center gap-1.5">
              <span aria-hidden className="text-white/60">📅</span> {event.date}
            </span>
          )}
          {event.time && (
            <span className="flex items-center gap-1.5">
              <span aria-hidden className="text-white/60">🕘</span> {event.time}
            </span>
          )}
          {event.location && (
            <span className="flex items-center gap-1.5">
              <span aria-hidden className="text-white/60">{event.location.toLowerCase().includes('online') ? '🌐' : '📍'}</span> {event.location}
            </span>
          )}
          {event.goingCount != null && (
            <span className="flex items-center gap-1.5">
              <span aria-hidden className="text-white/60">👥</span> {event.goingCount} {event.goingLabel ?? 'going'}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── tab bar ───────────────────────────────────────────────────────────
function TabBar({ activeTab, onTabChange }) {
  return (
    <div className="overflow-x-auto rounded-full border border-slate-200 bg-white p-1">
      <div className="flex min-w-max gap-1">
        {TABS.map((tab) => {
          const isActive = tab.id === activeTab
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                isActive ? 'bg-violet-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ─── overview tab ──────────────────────────────────────────────────────
function OverviewTab({ detail }) {
  const [checklist, setChecklist] = useState(detail.checklist)
  const toggle = (id) =>
    setChecklist((prev) => prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item)))

  return (
    <div className="space-y-4">
      <ContentCard title="Tags & Topics" icon="🏷">
        <div className="flex flex-wrap gap-2">
          {detail.tags.map((tag) => (
            <span
              key={tag.label}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${TAG_TONE[tag.tone] ?? TAG_TONE.neutral}`}
            >
              {tag.emoji && <span aria-hidden>{tag.emoji}</span>}
              {tag.label}
            </span>
          ))}
        </div>
      </ContentCard>

      <ContentCard title="About this Event" icon="ℹ️">
        <div className="space-y-3 text-sm leading-relaxed text-slate-600">
          {detail.description.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </ContentCard>

      <ContentCard title="What You'll Need" icon="✅">
        <div className="space-y-2.5">
          {detail.requirements.map((req, i) => (
            <div key={i} className="flex items-start gap-3">
              <span aria-hidden className="text-lg">{req.emoji}</span>
              <p className="text-sm text-slate-600">
                <strong className="text-slate-900">{req.strong}</strong> · {req.text}
              </p>
            </div>
          ))}
        </div>
      </ContentCard>

      <ContentCard title="Pre-event Checklist" icon="📋">
        <div className="space-y-2">
          {checklist.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => toggle(item.id)}
              className="flex w-full items-center gap-3 rounded-lg p-2 text-left transition hover:bg-slate-50"
            >
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-md border text-xs ${
                  item.done ? 'border-violet-600 bg-violet-600 text-white' : 'border-slate-300 text-transparent'
                }`}
              >
                ✓
              </span>
              <span className={`text-sm ${item.done ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </ContentCard>

      <ContentCard title="Skills You'll Build" icon="📊">
        <div className="space-y-3">
          {detail.skillsToBuild.map((skill) => (
            <div key={skill.name}>
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700">{skill.name}</span>
                <span className="text-slate-400">{skill.impact}</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                <div className={`h-full rounded-full ${skill.color}`} style={{ width: `${skill.percent}%` }} />
              </div>
            </div>
          ))}
        </div>
      </ContentCard>

      <ContentCard title="Organiser" icon="🏢">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-2xl">
            <span aria-hidden>{detail.organiser.emoji}</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-slate-900">{detail.organiser.name}</p>
            <div className="mt-0.5 flex gap-3 text-xs text-slate-500">
              <span>📅 {detail.organiser.pastEvents} past events</span>
              <span>👥 {detail.organiser.followers} followers</span>
            </div>
          </div>
          <button
            type="button"
            className="rounded-full border border-violet-200 px-3 py-1.5 text-xs font-semibold text-violet-600 transition hover:bg-violet-50"
          >
            + Follow
          </button>
        </div>
      </ContentCard>
    </div>
  )
}

// ─── agenda tab ────────────────────────────────────────────────────────
function AgendaTab({ detail }) {
  return (
    <div className="space-y-4">
      {detail.agenda.map((day) => (
        <ContentCard key={day.day} title={day.day} icon="🗓">
          <div className="space-y-3">
            {day.items.map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <span
                    className={`mt-1 h-2.5 w-2.5 rounded-full ${
                      item.state === 'past'
                        ? 'bg-slate-300'
                        : item.state === 'highlight'
                          ? 'bg-violet-500 ring-4 ring-violet-100'
                          : 'border border-slate-300 bg-white'
                    }`}
                  />
                  {i < day.items.length - 1 && <span className="mt-1 h-full w-px flex-1 bg-slate-100" />}
                </div>
                <div className="flex-1 pb-1">
                  <p className="text-xs font-semibold text-slate-500">{item.time}</p>
                  <p className="mt-0.5 flex flex-wrap items-center gap-2 text-sm font-bold text-slate-900">
                    {item.name}
                    {item.badge && (
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                          item.badgeTone === 'rose'
                            ? 'bg-rose-100 text-rose-700'
                            : 'bg-violet-100 text-violet-700'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </p>
                  {item.detail && <p className="mt-0.5 text-xs text-slate-500">{item.detail}</p>}
                </div>
              </div>
            ))}
          </div>
        </ContentCard>
      ))}
    </div>
  )
}

// ─── prizes tab ────────────────────────────────────────────────────────
function PrizesTab({ detail }) {
  return (
    <ContentCard title={detail.prizes.title} icon="🏆">
      <div className="grid gap-3 sm:grid-cols-3">
        {detail.prizes.top.map((prize) => (
          <div
            key={prize.rank}
            className={`rounded-xl border bg-gradient-to-br p-4 text-center ${PRIZE_TONE[prize.tone] ?? PRIZE_TONE.gold}`}
          >
            <div className="text-3xl">{prize.medal}</div>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500">{prize.rank}</p>
            <p className="mt-1 text-lg font-extrabold text-slate-900">{prize.amount}</p>
            <p className="mt-1 text-[11px] text-slate-500">{prize.extra}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50 p-4">
        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">Special Category Awards</p>
        <div className="divide-y divide-slate-200">
          {detail.prizes.special.map((s) => (
            <div key={s.label} className="flex items-center justify-between py-2 text-sm">
              <span className="text-slate-600">{s.label}</span>
              <span className="font-bold text-slate-900">{s.value}</span>
            </div>
          ))}
        </div>
      </div>
    </ContentCard>
  )
}

// ─── people tab ────────────────────────────────────────────────────────
function PersonCard({ person }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-3 text-center">
      <div
        className={`mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br text-sm font-bold text-white ${person.gradient}`}
      >
        {person.initials}
      </div>
      <p className="text-sm font-bold text-slate-900">{person.name}</p>
      <p className="text-xs text-slate-500">{person.role}</p>
      <p className="text-[11px] text-slate-400">{person.company}</p>
    </div>
  )
}

function PeopleTab({ detail }) {
  return (
    <div className="space-y-4">
      <ContentCard title="Keynote Speaker" icon="🎤">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {detail.people.speakers.map((p) => (
            <PersonCard key={p.name} person={p} />
          ))}
        </div>
      </ContentCard>
      <ContentCard title="Judges" icon="⚖️">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {detail.people.judges.map((p) => (
            <PersonCard key={p.name} person={p} />
          ))}
        </div>
      </ContentCard>
      <ContentCard title="Mentors" icon="👥">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {detail.people.mentors.map((p) => (
            <PersonCard key={p.name} person={p} />
          ))}
        </div>
      </ContentCard>
    </div>
  )
}

// ─── venue tab ─────────────────────────────────────────────────────────
function VenueTab({ detail }) {
  const { formatCards, chips, inPerson } = detail.venue
  return (
    <div className="space-y-4">
      <ContentCard title="Event Format" icon="🌐">
        <div className="grid gap-3 sm:grid-cols-2">
          {formatCards.map((card) => (
            <div
              key={card.title}
              className={`rounded-xl border p-4 ${
                card.highlight ? 'border-violet-200 bg-violet-50' : 'border-slate-100 bg-slate-50'
              }`}
            >
              <div className="text-2xl">{card.emoji}</div>
              <p className={`mt-2 text-sm font-bold ${card.highlight ? 'text-violet-700' : 'text-slate-900'}`}>
                {card.title}
              </p>
              <p className="mt-0.5 text-xs text-slate-600">{card.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {chips.map((chip) => (
            <span
              key={chip.label}
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600"
            >
              <span aria-hidden>{chip.emoji}</span> {chip.label}
            </span>
          ))}
        </div>
      </ContentCard>

      <ContentCard title={inPerson.title} icon="📍">
        <div className="relative flex h-44 items-center justify-center overflow-hidden rounded-xl border border-slate-100 bg-[linear-gradient(135deg,#ede9fe,#fce7f3)]">
          <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(rgba(108,99,255,0.5)_1px,transparent_1px)] [background-size:18px_18px]" />
          <div className="relative flex flex-col items-center gap-2 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-600 text-2xl text-white shadow-lg">
              📍
            </span>
            <button
              type="button"
              className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-violet-600 shadow-sm hover:bg-slate-50"
            >
              ↗ Open in Maps
            </button>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {inPerson.chips.map((chip) => (
            <span
              key={chip.label}
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600"
            >
              <span aria-hidden>{chip.emoji}</span> {chip.label}
            </span>
          ))}
        </div>
        <p className="mt-3 text-xs text-slate-500">{inPerson.note}</p>
      </ContentCard>
    </div>
  )
}

// ─── right sidebar: register card ──────────────────────────────────────
function RegisterCard({ event, detail }) {
  const [registered, setRegistered] = useState(false)
  const [saved, setSaved] = useState(event.isSaved ?? false)
  const reg = detail.registerCard
  const seatsPercent = ((reg.seatsMax - reg.seatsLeft) / reg.seatsMax) * 100

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_10px_30px_rgba(108,99,255,0.08)]">
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-extrabold text-emerald-600">{reg.price}</span>
        <span className="text-xs text-slate-500">{reg.priceLabel}</span>
      </div>
      <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
        <span aria-hidden>🕘</span> Registration closes <strong className="ml-1 text-rose-500">{reg.registrationDeadline}</strong>
      </p>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-pink-500" style={{ width: `${seatsPercent}%` }} />
      </div>
      <div className="mt-1.5 flex justify-between text-xs">
        <span className="text-slate-700"><strong>{reg.seatsLeft}</strong> spots left</span>
        <span className="text-slate-400">{reg.seatsMax} max</span>
      </div>

      <div className="my-4 border-t border-slate-100" />

      <div className="space-y-3">
        {reg.details.map((d) => (
          <div key={d.label} className="flex items-start gap-3">
            <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-lg ${TINT_BG[d.tint] ?? TINT_BG.violet}`}>
              <span aria-hidden>{d.icon}</span>
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">{d.label}</p>
              <p className="text-sm font-semibold text-slate-900">{d.value}</p>
              <p className="text-xs text-slate-500">{d.sub}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="my-4 border-t border-slate-100" />

      <div className="rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-700">
        <span aria-hidden>⏰</span> {reg.deadlineNote}
      </div>
      <button
        type="button"
        onClick={() => setRegistered((v) => !v)}
        className={`mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl px-4 py-3 text-sm font-bold transition ${
          registered
            ? 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200'
            : 'bg-gradient-to-r from-violet-600 to-pink-500 text-white shadow-md hover:shadow-lg'
        }`}
      >
        <span aria-hidden>{registered ? '✓' : '⚡'}</span>
        {registered ? 'Registered!' : 'Register Now'}
      </button>
      <div className="mt-2 flex gap-2">
        <button
          type="button"
          onClick={() => setSaved((v) => !v)}
          className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl border px-3 py-2 text-sm font-semibold transition ${
            saved ? 'border-violet-300 bg-violet-50 text-violet-700' : 'border-slate-200 text-slate-600 hover:border-slate-300'
          }`}
        >
          <span aria-hidden>{saved ? '🔖' : '🏷'}</span> {saved ? 'Saved' : 'Save'}
        </button>
        <button
          type="button"
          className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-300"
        >
          <span aria-hidden>↗</span>
        </button>
      </div>

      <div className="mt-4 flex items-center gap-3 border-t border-slate-100 pt-3">
        <div className="flex">
          {reg.attendees.map((a, i) => (
            <div
              key={a.initials}
              className={`flex h-7 w-7 items-center justify-center rounded-full border-2 border-white text-[10px] font-bold text-white ${a.color} ${i > 0 ? '-ml-2' : ''}`}
            >
              {a.initials}
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-500">
          <strong className="text-slate-900">{event.goingCount ?? 842}</strong> people going · {' '}
          <span className="text-violet-600">{reg.connectionsCount} of your connections</span>
        </p>
      </div>
    </div>
  )
}

// ─── countdown widget ──────────────────────────────────────────────────
function Countdown({ countdown }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 text-center shadow-[0_4px_16px_rgba(108,99,255,0.06)]">
      <p className="mb-3 text-[10px] font-bold uppercase tracking-wide text-slate-400">Event starts in</p>
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: 'days', value: countdown.days },
          { label: 'hours', value: countdown.hours },
          { label: 'mins', value: countdown.minutes },
          { label: 'secs', value: countdown.seconds },
        ].map((unit) => (
          <div key={unit.label} className="rounded-lg border border-slate-100 bg-violet-50/50 p-2">
            <div className="text-xl font-extrabold text-violet-600">{unit.value}</div>
            <div className="text-[10px] text-slate-400">{unit.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── match score widget ───────────────────────────────────────────────
function MatchScore({ matchPercent, score }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_4px_16px_rgba(108,99,255,0.06)]">
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-lg">🎯</div>
        <div>
          <p className="text-sm font-bold text-slate-900">{matchPercent ?? score.percent}% Match for you</p>
          <p className="text-xs text-slate-400">{score.sub}</p>
        </div>
      </div>
      <div className="space-y-1.5">
        {score.reasons.map((r, i) => (
          <p
            key={i}
            className={`flex items-center gap-2 text-xs ${r.positive ? 'text-emerald-600' : 'text-slate-400'}`}
          >
            <span aria-hidden>{r.positive ? '✓' : '–'}</span> {r.text}
          </p>
        ))}
      </div>
    </div>
  )
}

// ─── related events ───────────────────────────────────────────────────
function RelatedEvents({ items }) {
  return (
    <ContentCard title="You might also like" icon="✨">
      <div className="grid gap-3 sm:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-100 bg-white p-2.5 transition hover:-translate-y-0.5 hover:shadow-sm"
          >
            <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br text-xl ${item.gradient}`}>
              {item.emoji}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-slate-900">{item.title}</p>
              <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-slate-500">
                <span aria-hidden>📅</span> {item.date}
                {item.matchPercent != null && (
                  <span className="ml-auto rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-600">
                    {item.matchPercent}%
                  </span>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </ContentCard>
  )
}

// ─── main ────────────────────────────────────────────────────────────
export default function EventDetail({ event, detail = eventDetailDefault, onBack }) {
  const [activeTab, setActiveTab] = useState('about')

  return (
    <div className="space-y-5">
      <Hero event={event} onBack={onBack} />

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-4">
          <TabBar activeTab={activeTab} onTabChange={setActiveTab} />

          {activeTab === 'about' && <OverviewTab detail={detail} />}
          {activeTab === 'agenda' && <AgendaTab detail={detail} />}
          {activeTab === 'prizes' && <PrizesTab detail={detail} />}
          {activeTab === 'people' && <PeopleTab detail={detail} />}
          {activeTab === 'venue' && <VenueTab detail={detail} />}

          <RelatedEvents items={detail.related} />
        </div>

        <aside className="space-y-3">
          <RegisterCard event={event} detail={detail} />
          <Countdown countdown={detail.countdown} />
          <MatchScore matchPercent={event.matchPercent} score={detail.matchScore} />
        </aside>
      </div>
    </div>
  )
}
