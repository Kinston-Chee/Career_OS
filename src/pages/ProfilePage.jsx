import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Sparkles, X } from 'lucide-react'
import HomeTopNav from '../components/home/HomeTopNav'
import ProfileHeroCard from '../components/profile/ProfileHeroCard'
import CareerNarrativeCard from '../components/profile/CareerNarrativeCard'
import SelfDiscoveryCard from '../components/profile/SelfDiscoveryCard'
import EmployersWatchingPanel from '../components/profile/EmployersWatchingPanel'
import TopSkillsPanel from '../components/profile/TopSkillsPanel'
import ProfileSettingsPanel from '../components/profile/ProfileSettingsPanel'
import { candidateOverview, mockUser, profileOverview } from '../data/mockData'

const GENERATED_NARRATIVE =
  "Chris is a Y3 Data Science student at Taylor's University with a growing technical focus in NLP, Python, and software engineering. His Career Memory shows a strong mix of hands-on internship experience, hackathon problem-solving, and student leadership. His strongest signal is initiative: he builds quickly, takes ownership, and connects technical work with real opportunities. He is currently preparing for software engineering and AI-related internships where he can apply his technical skills in practical product environments."

const SKILL_SIGNALS = [
  ['NLP', '+34% this week', 'High', 92, ['NLP project in Career Memory', 'TalentBank AI Challenge match'], 'Add GitHub link and project screenshot'],
  ['Python', 'Stable demand', 'Strong', 86, ['AI/data projects', 'Hackathon experience'], 'Practise technical explanation and code walkthrough'],
  ['Leadership', 'Always valued', 'Strong', 84, ["Vice President - Taylor's Computing Society"], 'Add impact numbers from events'],
  ['React', 'Growing signal', 'Medium', 68, ['Software Engineering Intern - Grab'], 'Add frontend project proof'],
  ['Problem Solving', 'Strong signal', 'High', 88, ['Hackathon - Top 3 Finalist'], 'Use this in interview stories'],
]

function Toast({ message }) {
  if (!message) return null
  return (
    <div className="fixed bottom-5 right-5 z-50 rounded-2xl border border-white/70 bg-white/85 px-4 py-3 text-sm font-bold text-blue-700 shadow-[0_18px_44px_rgba(37,99,235,0.14)] backdrop-blur-xl">
      {message}
    </div>
  )
}

function ModalShell({ title, subtitle, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/10 px-4 py-6 backdrop-blur-sm">
      <section role="dialog" aria-modal="true" className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[28px] border border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.90),rgba(239,246,255,0.72))] p-6 shadow-[0_24px_80px_rgba(15,23,42,0.14),inset_0_1px_0_rgba(255,255,255,0.9)] ring-1 ring-blue-100/50 backdrop-blur-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-black text-[#11194a]">{title}</h2>
            {subtitle && <p className="mt-1 text-sm font-semibold text-[#637094]">{subtitle}</p>}
          </div>
          <button type="button" onClick={onClose} className="rounded-full p-1.5 text-[#7382a1] transition hover:bg-blue-50 hover:text-blue-700">
            <X size={18} />
          </button>
        </div>
        {children}
      </section>
    </div>
  )
}

function ProfileEditModal({ profile, onClose, onSave }) {
  const [form, setForm] = useState(profile)
  const set = (key, value) => setForm((current) => ({ ...current, [key]: value }))
  const inputClass = 'mt-1 w-full rounded-2xl border border-blue-100 bg-white/70 px-3 py-2 text-sm font-semibold text-[#263556] outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-100'

  return (
    <ModalShell title="Edit Profile" subtitle="Update how your profile appears to employers and your CareerOS workspace." onClose={onClose}>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {[
          ['name', 'Full name'],
          ['university', 'University'],
          ['year', 'Year'],
          ['programme', 'Programme'],
          ['careerGoal', 'Career goal'],
          ['availability', 'Availability'],
          ['locationPreference', 'Location preference'],
          ['targetRoles', 'Target roles'],
        ].map(([key, label]) => (
          <label key={key} className={key === 'targetRoles' ? 'sm:col-span-2 text-xs font-bold text-[#637094]' : 'text-xs font-bold text-[#637094]'}>
            {label}
            <input className={inputClass} value={form[key]} onChange={(event) => set(key, event.target.value)} />
          </label>
        ))}
      </div>
      <div className="mt-5 flex justify-end gap-2">
        <button type="button" onClick={onClose} className="rounded-full border border-blue-100 bg-white/70 px-4 py-2 text-sm font-bold text-blue-700 hover:bg-blue-50">Cancel</button>
        <button type="button" onClick={() => onSave(form)} className="rounded-full bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-[0_12px_30px_rgba(37,99,235,0.25)] hover:bg-blue-700">Save changes</button>
      </div>
    </ModalShell>
  )
}

function NarrativeModal({ value, onClose, onSave }) {
  const [draft, setDraft] = useState(value)
  const [step, setStep] = useState('')
  const [generating, setGenerating] = useState(false)
  const timersRef = useRef([])

  useEffect(() => () => timersRef.current.forEach(window.clearTimeout), [])
  const schedule = (fn, delay) => {
    const id = window.setTimeout(fn, delay)
    timersRef.current.push(id)
  }

  const generate = () => {
    setGenerating(true)
    setDraft('')
    ;['Reading Career Memory...', 'Checking strongest skills...', 'Rewriting employer-facing narrative...'].forEach((text, index) => {
      schedule(() => setStep(text), index * 600)
    })
    schedule(() => {
      setStep('Typing new narrative...')
      let index = 0
      const tick = () => {
        index += 1
        setDraft(GENERATED_NARRATIVE.slice(0, index))
        if (index < GENERATED_NARRATIVE.length) schedule(tick, 14)
        else {
          setGenerating(false)
          setStep('')
        }
      }
      tick()
    }, 1800)
  }

  return (
    <ModalShell title="Edit Career Narrative" subtitle="This is how your Career Companion describes you to employers." onClose={onClose}>
      <div className="mt-5">
        <textarea
          value={draft}
          disabled={generating}
          onChange={(event) => setDraft(event.target.value)}
          className="min-h-[220px] w-full resize-none rounded-2xl border border-blue-100 bg-white/70 p-4 text-sm font-semibold leading-7 text-[#263556] outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-100 disabled:opacity-80"
        />
        {step && <p className="mt-2 text-xs font-bold text-blue-600">{step}</p>}
        <button type="button" disabled={generating} onClick={generate} className="mt-4 inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-[0_12px_30px_rgba(37,99,235,0.25)] transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">
          <Sparkles size={15} /> {generating ? 'Generating narrative...' : 'Generate with CareerOS AI'}
        </button>
        <p className="mt-2 text-xs font-medium text-[#7a87a2]">Uses Career Memory, skills, and employer signals.</p>
      </div>
      <div className="mt-5 flex justify-end gap-2">
        <button type="button" onClick={onClose} className="rounded-full border border-blue-100 bg-white/70 px-4 py-2 text-sm font-bold text-blue-700 hover:bg-blue-50">Cancel</button>
        <button type="button" onClick={() => onSave(draft)} disabled={generating} className="rounded-full bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-[0_12px_30px_rgba(37,99,235,0.25)] hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">Save</button>
      </div>
    </ModalShell>
  )
}

function SkillSignalsDrawer({ onClose, onToast }) {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/10 backdrop-blur-sm">
      <aside className="ml-auto flex h-full w-full max-w-md flex-col border-l border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.9),rgba(239,246,255,0.72))] p-6 shadow-[-24px_0_70px_rgba(15,23,42,0.12)] backdrop-blur-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-black text-[#11194a]">Skill Signals</h2>
            <p className="mt-1 text-sm font-semibold text-[#637094]">Evidence behind your strongest profile skills.</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-full p-1.5 text-[#7382a1] hover:bg-blue-50 hover:text-blue-700"><X size={18} /></button>
        </div>
        <div className="mt-5 flex-1 space-y-3 overflow-y-auto">
          {SKILL_SIGNALS.map(([skill, status, strength, value, evidence, action]) => (
            <article key={skill} className="rounded-2xl border border-white/70 bg-white/58 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.75),0_8px_24px_rgba(37,99,235,0.06)]">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-black text-[#11194a]">{skill}</h3>
                <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-blue-700">{status}</span>
              </div>
              <p className="mt-1 text-xs font-bold text-[#637094]">Strength: {strength}</p>
              <div className="mt-2 h-2 rounded-full bg-blue-50"><div className="h-full rounded-full bg-blue-600" style={{ width: `${value}%` }} /></div>
              <div className="mt-3 flex flex-wrap gap-1.5">{evidence.map((item) => <span key={item} className="rounded-full bg-white/80 px-2 py-0.5 text-[11px] font-bold text-[#637094]">{item}</span>)}</div>
              <p className="mt-3 text-xs font-semibold leading-5 text-[#3a4669]">{action}</p>
            </article>
          ))}
          <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-4 text-sm font-semibold leading-6 text-blue-800">
            Your profile is strongest when NLP, Python, and initiative are shown together. Add evidence to your NLP project before applying to AI-related roles.
          </div>
        </div>
        <div className="mt-5 flex justify-end gap-2">
          <button type="button" onClick={() => onToast('Opening Career Memory evidence suggestions...')} className="rounded-full bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-[0_12px_30px_rgba(37,99,235,0.25)] hover:bg-blue-700">Add evidence</button>
          <button type="button" onClick={onClose} className="rounded-full border border-blue-100 bg-white/70 px-4 py-2 text-sm font-bold text-blue-700 hover:bg-blue-50">Close</button>
        </div>
      </aside>
    </div>
  )
}

export default function ProfilePage() {
  const readiness = candidateOverview.careerSnapshot.readiness
  const [profile, setProfile] = useState({
    name: 'Chris Lee',
    university: "Taylor's University",
    year: 'Y3',
    programme: 'Data Science',
    careerGoal: 'Aspiring Software Engineer',
    availability: 'Open to internships',
    locationPreference: 'KL / Remote',
    targetRoles: 'Software Engineer Intern, AI Intern, Data Analyst Intern',
  })
  const [narrative, setNarrative] = useState(profileOverview.careerNarrative.body)
  const [modal, setModal] = useState(null)
  const [toast, setToast] = useState('')
  const toastRef = useRef(null)

  useEffect(() => () => window.clearTimeout(toastRef.current), [])
  const showToast = (message) => {
    window.clearTimeout(toastRef.current)
    setToast(message)
    toastRef.current = window.setTimeout(() => setToast(''), 1800)
  }

  const headline = useMemo(() => ({
    name: profile.name,
    school: `${profile.university} - ${profile.year} - ${profile.programme}`,
    tagline: `${profile.careerGoal} - ${profile.availability}`,
  }), [profile])
  const initials = profile.name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase()

  return (
    <div className="min-h-screen bg-[#f6f9ff] text-[#121a3a]">
      <HomeTopNav user={mockUser} readiness={readiness} />

      <div className="mx-auto max-w-[1480px] px-4 py-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0 space-y-4">
            <ProfileHeroCard headline={headline} stats={profileOverview.stats} initials={initials} onEditProfile={() => setModal('profile')} />
            <CareerNarrativeCard narrative={{ ...profileOverview.careerNarrative, body: narrative }} onEditNarrative={() => setModal('narrative')} />
            <SelfDiscoveryCard selfDiscovery={profileOverview.selfDiscovery} />
          </div>

          <div className="min-w-0 space-y-4">
            <EmployersWatchingPanel employers={profileOverview.employersWatching} />
            <TopSkillsPanel skills={profileOverview.topSkills} onViewAll={() => setModal('skills')} />
            <ProfileSettingsPanel settings={profileOverview.settings} />
          </div>
        </div>
      </div>

      {modal === 'profile' && (
        <ProfileEditModal
          profile={profile}
          onClose={() => setModal(null)}
          onSave={(next) => {
            setProfile(next)
            setModal(null)
            showToast('Profile updated')
          }}
        />
      )}
      {modal === 'narrative' && (
        <NarrativeModal
          value={narrative}
          onClose={() => setModal(null)}
          onSave={(next) => {
            setNarrative(next)
            setModal(null)
            showToast('Career narrative updated')
          }}
        />
      )}
      {modal === 'skills' && <SkillSignalsDrawer onClose={() => setModal(null)} onToast={showToast} />}
      <Toast message={toast} />
    </div>
  )
}
