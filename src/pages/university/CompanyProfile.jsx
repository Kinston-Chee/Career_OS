import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Bookmark, Building2, Mail, MapPin, Sparkles, X } from 'lucide-react'
import UniversityNav from '../../components/university/UniversityNav'
import { ALIGNMENT_LEVELS, AVAILABILITY, getCompany } from '../../data/companyDirectory'

const TABS = [
  { id: 'gaps', label: 'Gap Alignment' },
  { id: 'contacts', label: 'Contacts' },
  { id: 'collabs', label: 'Collaboration Types' },
  { id: 'history', label: 'Past Collaborations' },
]

function DemoToast({ message }) {
  if (!message) return null
  return (
    <div className="employer-glass-card fixed bottom-5 right-5 z-50 px-4 py-3 text-sm font-semibold text-slate-800">
      {message}
    </div>
  )
}

function SectionTitle({ children }) {
  return (
    <p className="mb-3.5 flex items-center gap-1.5 text-[13px] font-bold uppercase tracking-wide text-gray-400">
      <span className="h-1.5 w-1.5 rounded-full bg-[#5B6CF9]" />
      {children}
    </p>
  )
}

function OutreachModal({ company, onClose, onSend }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 py-6" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Draft outreach to ${company.name}`}
        onClick={(event) => event.stopPropagation()}
        className="relative w-full max-w-[560px] rounded-2xl bg-white p-7 shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 rounded-full p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
        >
          <X className="h-4 w-4" />
        </button>
        <h3 className="text-[17px] font-bold text-gray-900">Draft outreach to {company.name}</h3>
        <p className="mt-1 text-[12.5px] text-gray-500">AI-generated draft — edit before sending</p>

        <div className="mt-4 max-h-[46vh] overflow-y-auto rounded-xl border border-gray-200 bg-[#F0F2FF] p-4 text-[13px] leading-7 text-gray-800">
          <p><strong>To:</strong> {company.outreachLead}, {company.name}</p>
          <p><strong>Subject:</strong> Partnership Proposal — Heriot-Watt Malaysia × {company.name}</p>
          <p className="mt-3">Dear {company.outreachLead.split(' ')[0]},</p>
          <p className="mt-3">
            I&apos;m Dr. Evelyn Chen, Dean of Computing &amp; AI at Heriot-Watt University Malaysia. Our curriculum
            intelligence platform has identified {company.name} as a priority collaboration partner for the upcoming
            semester — specifically to close identified gaps in {company.alignment.slice(0, 2).map((a) => a.name).join(' and ')} in
            our BSc Computing programme.
          </p>
          <p className="mt-3">
            We are reaching out because of {company.outreachHook}. A formal collaboration — starting with technical
            workshops and guest lectures from your team — could meaningfully accelerate this pipeline.
          </p>
          <p className="mt-3">Would you be open to a 30-minute call in the next two weeks?</p>
          <p className="mt-3">Warm regards,<br />Dr. Evelyn Chen</p>
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-[13px] font-semibold text-gray-600 transition hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSend}
            className="rounded-lg bg-[#5B6CF9] px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-[#4A5BE8]"
          >
            Send via email ↗
          </button>
        </div>
      </div>
    </div>
  )
}

export default function CompanyProfile() {
  const { companyId } = useParams()
  const navigate = useNavigate()
  const company = getCompany(companyId)

  const [tab, setTab] = useState('gaps')
  const [saved, setSaved] = useState(false)
  const [showOutreach, setShowOutreach] = useState(false)
  const [toast, setToast] = useState('')
  const toastRef = useRef(null)

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 })
    setTab('gaps')
  }, [companyId])

  useEffect(() => () => window.clearTimeout(toastRef.current), [])

  const showToast = (message) => {
    window.clearTimeout(toastRef.current)
    setToast(message)
    toastRef.current = window.setTimeout(() => setToast(''), 2400)
  }

  const back = () => navigate('/university/collaboration')

  if (!company) {
    return (
      <div className="university-workspace-page flex h-screen w-screen flex-col overflow-hidden">
        <UniversityNav />
        <main className="flex flex-1 flex-col items-center justify-center gap-3">
          <p className="text-sm font-semibold text-gray-500">That company is not in the directory.</p>
          <button type="button" onClick={back} className="rounded-lg bg-[#5B6CF9] px-4 py-2 text-sm font-semibold text-white">
            Back to Collaboration Marketplace
          </button>
        </main>
      </div>
    )
  }

  const kpis = [
    { value: `${company.fitPct}%`, label: 'Gap-fit score' },
    { value: company.alignment.filter((a) => a.pct >= 65).length, label: 'Gaps addressed' },
    { value: company.contacts.filter((c) => c.availability === 'available').length, label: 'Available contacts' },
    { value: company.partnerSince ? `Since ${company.partnerSince}` : 'None', label: 'Current partnership' },
  ]

  return (
    <div className="university-workspace-page flex h-screen w-screen flex-col overflow-hidden">
      <UniversityNav />

      <main className="min-w-0 flex-1 overflow-y-auto">
        <div className="relative z-10 mx-auto max-w-[1200px] space-y-4 px-6 py-6">
          <button
            type="button"
            onClick={back}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#5B6CF9] hover:underline"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Collaboration Marketplace
          </button>

          {/* AI match banner */}
          <div className="flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-[12.5px] leading-6 text-amber-900">
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
            <p><strong>CareerGraph match:</strong> {company.aiNote}</p>
          </div>

          {/* Profile header */}
          <section className="rounded-2xl border border-gray-100 bg-white p-6">
            <div className="flex flex-wrap items-start gap-4">
              <span
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-[22px] font-extrabold text-white"
                style={{ background: company.color }}
              >
                {company.initial}
              </span>
              <div className="min-w-0 flex-1">
                <h1 className="text-[22px] font-bold text-gray-900">{company.name}</h1>
                <p className="mt-1 text-[13px] text-gray-500">
                  {company.industry} · Est. {company.founded} · {company.employees} employees
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {company.recommended ? (
                    <span className="rounded-full bg-[#EEF0FF] px-2.5 py-1 text-[11.5px] font-medium text-[#5B6CF9]">
                      ⭐ Recommended partner
                    </span>
                  ) : null}
                  {company.partnerSince ? (
                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11.5px] font-medium text-emerald-700">
                      Partner since {company.partnerSince}
                    </span>
                  ) : null}
                  <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-[11.5px] font-medium text-gray-600">
                    <Building2 className="h-3 w-3" /> {company.size}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-[11.5px] font-medium text-gray-600">
                    <MapPin className="h-3 w-3" /> {company.location}
                  </span>
                </div>
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSaved((prev) => {
                      const next = !prev
                      showToast(next ? `${company.name} saved to your shortlist` : `${company.name} removed from your shortlist`)
                      return next
                    })
                  }}
                  className={`inline-flex h-9 items-center gap-1.5 rounded-lg border px-4 text-[13px] font-semibold transition ${
                    saved ? 'border-[#5B6CF9] bg-[#EEF0FF] text-[#5B6CF9]' : 'border-gray-200 bg-white text-gray-600 hover:border-[#5B6CF9] hover:text-[#5B6CF9]'
                  }`}
                >
                  <Bookmark className={`h-3.5 w-3.5 ${saved ? 'fill-[#5B6CF9]' : ''}`} />
                  {saved ? 'Saved' : 'Save'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowOutreach(true)}
                  className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-[#5B6CF9] px-4 text-[13px] font-semibold text-white transition hover:bg-[#4A5BE8]"
                >
                  <Mail className="h-3.5 w-3.5" /> Start outreach
                </button>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-gray-200 sm:grid-cols-4">
              {kpis.map((kpi) => (
                <div key={kpi.label} className="bg-[#F0F2FF] px-4 py-3.5 text-center">
                  <span className="block font-mono text-[20px] font-semibold text-gray-900">{kpi.value}</span>
                  <span className="mt-0.5 block text-[11px] text-gray-500">{kpi.label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Tabbed detail */}
          <section className="rounded-2xl border border-gray-100 bg-white px-5">
            <div className="flex flex-wrap gap-0 border-b border-gray-100">
              {TABS.map((item) => {
                const active = tab === item.id
                const count = item.id === 'contacts' ? ` (${company.contacts.length})` : ''
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTab(item.id)}
                    className={`-mb-px border-b-2 px-4 py-2.5 text-[13px] font-medium transition ${
                      active ? 'border-[#5B6CF9] text-[#5B6CF9]' : 'border-transparent text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    {item.label}{count}
                  </button>
                )
              })}
            </div>

            {/* Gap alignment */}
            {tab === 'gaps' ? (
              <div className="py-5">
                <SectionTitle>How {company.name} addresses your syllabus gaps</SectionTitle>
                <div className="flex flex-col gap-2.5">
                  {company.alignment.map((row) => {
                    const level = ALIGNMENT_LEVELS[row.level]
                    return (
                      <div key={row.name} className="flex items-center gap-2.5">
                        <span className="w-40 shrink-0 text-[13px] font-medium text-gray-900">{row.name}</span>
                        <span className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
                          <span
                            className="block h-full rounded-full transition-[width] duration-700"
                            style={{ width: `${row.pct}%`, background: level.bar }}
                          />
                        </span>
                        <span className="w-9 shrink-0 text-right font-mono text-[11px] font-medium text-gray-500">{row.pct}%</span>
                        <span className={`w-[68px] shrink-0 rounded-full px-2 py-0.5 text-center text-[10.5px] font-medium ${level.chip}`}>
                          {level.label}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            ) : null}

            {/* Contacts */}
            {tab === 'contacts' ? (
              <div className="py-5">
                <SectionTitle>People at {company.name} who can collaborate</SectionTitle>
                <div className="flex flex-col gap-2.5">
                  {company.contacts.map((contact) => {
                    const avail = AVAILABILITY[contact.availability] ?? AVAILABILITY.available
                    return (
                      <div key={contact.name} className="flex flex-wrap items-center gap-3 rounded-xl border border-gray-100 p-3 transition hover:border-[#5B6CF9]/50 hover:bg-[#EEF0FF]/40">
                        <span
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold text-white"
                          style={{ background: contact.color }}
                        >
                          {contact.initials}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-[13.5px] font-semibold text-gray-900">{contact.name}</p>
                          <p className="mt-0.5 text-[11.5px] text-gray-500">{contact.role}</p>
                          <div className="mt-1.5 flex flex-wrap gap-1">
                            {contact.tags.map((tag) => (
                              <span key={tag} className="rounded-full bg-[#EEF0FF] px-2 py-0.5 text-[10px] font-medium text-[#5B6CF9]">{tag}</span>
                            ))}
                          </div>
                        </div>
                        <div className="flex shrink-0 flex-col items-end gap-1.5">
                          <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[10.5px] font-medium ${avail.chip}`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${avail.dot}`} />
                            {avail.label}
                          </span>
                          <div className="flex gap-1.5">
                            <button
                              type="button"
                              onClick={() => showToast(`Email drafted to ${contact.name}`)}
                              aria-label={`Email ${contact.name}`}
                              className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition hover:border-[#5B6CF9] hover:text-[#5B6CF9]"
                            >
                              <Mail className="h-3.5 w-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => showToast(`Opening LinkedIn profile for ${contact.name}`)}
                              aria-label={`LinkedIn profile for ${contact.name}`}
                              className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-[11px] font-bold text-gray-500 transition hover:border-[#5B6CF9] hover:text-[#5B6CF9]"
                            >
                              in
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ) : null}

            {/* Collaboration types */}
            {tab === 'collabs' ? (
              <div className="py-5">
                <SectionTitle>What {company.name} can offer your students</SectionTitle>
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                  {company.collabTypes.map((type) => (
                    <button
                      key={type.name}
                      type="button"
                      disabled={type.disabled}
                      onClick={() => showToast(`${type.name} added to your collaboration plan`)}
                      className={`rounded-xl border p-3 text-left transition ${
                        type.disabled
                          ? 'cursor-not-allowed border-gray-100 opacity-50'
                          : 'border-gray-200 hover:border-[#5B6CF9]/60 hover:bg-[#EEF0FF]/60'
                      }`}
                    >
                      <span className="block text-[20px]">{type.icon}</span>
                      <span className="mt-1.5 block text-[13px] font-semibold text-gray-900">{type.name}</span>
                      <span className="mt-0.5 block text-[11.5px] leading-5 text-gray-500">{type.desc}</span>
                      <span className={`mt-2 block text-[10.5px] font-semibold ${type.disabled ? 'text-gray-400' : 'text-emerald-600'}`}>
                        {type.disabled ? type.avail : `✓ ${type.avail}`}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {/* History */}
            {tab === 'history' ? (
              <div className="py-5">
                <SectionTitle>
                  {company.partnerSince ? `Collaboration history since ${company.partnerSince}` : 'No formal collaboration yet — CareerGraph signals below'}
                </SectionTitle>
                <div className="flex flex-col">
                  {company.history.map((event, index) => (
                    <div key={event.title} className="relative flex gap-3.5 pb-4">
                      {index < company.history.length - 1 ? (
                        <span className="absolute bottom-0 left-[15px] top-8 w-px bg-gray-200" />
                      ) : null}
                      <span className="relative z-10 flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full border-2 border-[#5B6CF9] bg-[#EEF0FF] text-[11px] font-semibold text-[#5B6CF9]">
                        {event.icon}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-[13.5px] font-semibold text-gray-900">{event.title}</p>
                        <p className="mt-0.5 text-[11.5px] text-gray-500">{event.meta}</p>
                        {event.outcome ? (
                          <span className="mt-1.5 inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2 py-0.5 text-[11.5px] font-medium text-emerald-700">
                            ✓ {event.outcome}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </section>

          {/* Outreach CTA */}
          <button
            type="button"
            onClick={() => setShowOutreach(true)}
            className="flex w-full flex-wrap items-center gap-4 rounded-2xl bg-gradient-to-r from-[#5B6CF9] to-[#7C3AED] px-6 py-5 text-left transition hover:opacity-95"
          >
            <span className="text-[28px]">✨</span>
            <span className="min-w-0 flex-1">
              <span className="block text-base font-bold text-white">Ready to reach out to {company.name}?</span>
              <span className="mt-0.5 block text-[13px] text-white/75">
                CareerOS will draft a personalised outreach email to {company.outreachLead}, referencing {company.outreachHook}.
              </span>
            </span>
            <span className="shrink-0 rounded-lg bg-white px-5 py-2.5 text-[13px] font-bold text-[#5B6CF9]">
              Draft outreach →
            </span>
          </button>
        </div>
      </main>

      {showOutreach ? (
        <OutreachModal
          company={company}
          onClose={() => setShowOutreach(false)}
          onSend={() => {
            setShowOutreach(false)
            showToast(`Outreach email sent to ${company.outreachLead}`)
          }}
        />
      ) : null}

      <DemoToast message={toast} />
    </div>
  )
}
