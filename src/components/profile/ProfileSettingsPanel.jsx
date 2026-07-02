import React, { useEffect, useRef, useState } from 'react'
import { Bell, BookOpen, ChevronRight, Download, Info, Link2, Shield } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const ICONS = { BookOpen, Shield, Bell, Download, Link2, Info }
const PROFILE_URL = 'https://careeros.demo/profile/chris-lee'

function Toast({ message }) {
  if (!message) return null
  return (
    <div className="fixed bottom-5 right-5 z-50 rounded-full border border-white/70 bg-slate-950/90 px-4 py-2 text-xs font-semibold text-white shadow-[0_16px_40px_rgba(15,23,42,0.22)] backdrop-blur-xl">
      {message}
    </div>
  )
}

function Toggle({ label, enabled, onChange }) {
  return (
    <button type="button" onClick={() => onChange(!enabled)} className="flex w-full items-center justify-between gap-4 rounded-xl border border-white/70 bg-white/55 px-4 py-3 text-left backdrop-blur-md transition hover:bg-white/70">
      <span className="text-sm font-semibold text-[#2f3b61]">{label}</span>
      <span className={`relative h-6 w-11 rounded-full transition ${enabled ? 'bg-blue-600' : 'bg-slate-300'}`}>
        <span className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${enabled ? 'left-6' : 'left-1'}`} />
      </span>
    </button>
  )
}

function SettingsModal({ type, onClose, onSave }) {
  const [visibility, setVisibility] = useState('Employers only')
  const [privacy, setPrivacy] = useState({
    employerActivity: true,
    narrativeSharing: true,
  })
  const [notifications, setNotifications] = useState({
    employerViews: true,
    applications: true,
    opportunities: true,
    weeklySummary: false,
  })

  if (!type) return null

  const isPrivacy = type === 'privacy'
  const title = isPrivacy ? 'Privacy Settings' : 'Notification Preferences'

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/35 px-4 py-6 backdrop-blur-sm">
      <section role="dialog" aria-modal="true" aria-labelledby="profile-settings-modal-title" className="w-full max-w-lg overflow-hidden rounded-2xl border border-white/70 bg-white/72 shadow-[0_24px_80px_rgba(28,48,96,0.22)] backdrop-blur-2xl">
        <div className="border-b border-white/70 bg-white/45 px-5 py-4">
          <h3 id="profile-settings-modal-title" className="text-base font-bold text-[#11194a]">{title}</h3>
        </div>

        <div className="space-y-3 p-5">
          {isPrivacy ? (
            <>
              <div className="rounded-xl border border-white/70 bg-white/55 p-4 backdrop-blur-md">
                <p className="mb-3 text-sm font-semibold text-[#2f3b61]">Profile visibility</p>
                <div className="grid grid-cols-3 gap-2">
                  {['Public', 'Employers only', 'Private'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setVisibility(option)}
                      className={`rounded-lg px-3 py-2 text-xs font-bold transition ${
                        visibility === option ? 'bg-blue-600 text-white shadow-sm' : 'bg-white/70 text-[#637094] hover:bg-white'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              <Toggle label="Show when employers view my profile" enabled={privacy.employerActivity} onChange={(value) => setPrivacy((prev) => ({ ...prev, employerActivity: value }))} />
              <Toggle label="Allow CareerOS to include this in employer view" enabled={privacy.narrativeSharing} onChange={(value) => setPrivacy((prev) => ({ ...prev, narrativeSharing: value }))} />
            </>
          ) : (
            <>
              <Toggle label="Employer profile views" enabled={notifications.employerViews} onChange={(value) => setNotifications((prev) => ({ ...prev, employerViews: value }))} />
              <Toggle label="Application updates" enabled={notifications.applications} onChange={(value) => setNotifications((prev) => ({ ...prev, applications: value }))} />
              <Toggle label="New matched opportunities" enabled={notifications.opportunities} onChange={(value) => setNotifications((prev) => ({ ...prev, opportunities: value }))} />
              <Toggle label="Weekly career readiness summary" enabled={notifications.weeklySummary} onChange={(value) => setNotifications((prev) => ({ ...prev, weeklySummary: value }))} />
            </>
          )}
        </div>

        <div className="flex justify-end gap-2 border-t border-white/70 bg-white/45 px-5 py-4">
          <button type="button" onClick={onClose} className="rounded-full border border-[#dfe8f7] bg-white/70 px-4 py-2 text-sm font-bold text-[#637094] transition hover:bg-white">
            Cancel
          </button>
          <button type="button" onClick={() => onSave(isPrivacy ? 'Privacy preferences updated' : 'Notification preferences updated')} className="rounded-full bg-blue-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-700">
            Save preferences
          </button>
        </div>
      </section>
    </div>
  )
}

function AboutModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/35 px-4 py-6 backdrop-blur-sm">
      <section role="dialog" aria-modal="true" aria-labelledby="about-careeros-title" className="w-full max-w-md rounded-2xl border border-white/70 bg-white/76 p-5 shadow-[0_24px_80px_rgba(28,48,96,0.22)] backdrop-blur-2xl">
        <h3 id="about-careeros-title" className="text-base font-bold text-[#11194a]">About CareerOS</h3>
        <p className="mt-3 text-sm leading-6 text-[#3a4669]">
          CareerOS is an AI-assisted career intelligence workspace that helps candidates turn experiences into career signals, readiness insights, and opportunity matches.
        </p>
        <div className="mt-4 space-y-2 rounded-xl border border-white/70 bg-white/55 p-4 text-sm font-semibold text-[#3a4669]">
          <p>Version: <span className="text-[#11194a]">v1.2.0</span></p>
          <p>Workspace: <span className="text-[#11194a]">Candidate</span></p>
          <p>Demo mode: <span className="text-emerald-600">Enabled</span></p>
        </div>
        <div className="mt-5 flex justify-end">
          <button type="button" onClick={onClose} className="rounded-full bg-blue-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-700">
            Close
          </button>
        </div>
      </section>
    </div>
  )
}

function ShareFallbackModal({ onClose, onCopy }) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/35 px-4 py-6 backdrop-blur-sm">
      <section role="dialog" aria-modal="true" aria-labelledby="share-profile-title" className="w-full max-w-md rounded-2xl border border-white/70 bg-white/76 p-5 shadow-[0_24px_80px_rgba(28,48,96,0.22)] backdrop-blur-2xl">
        <h3 id="share-profile-title" className="text-base font-bold text-[#11194a]">Share Profile Link</h3>
        <p className="mt-3 rounded-xl border border-[#dfe8f7] bg-white/70 px-4 py-3 text-sm font-semibold text-[#35507d]">{PROFILE_URL}</p>
        <div className="mt-5 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="rounded-full border border-[#dfe8f7] bg-white/70 px-4 py-2 text-sm font-bold text-[#637094] transition hover:bg-white">
            Close
          </button>
          <button type="button" onClick={onCopy} className="rounded-full bg-blue-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-700">
            Copy link
          </button>
        </div>
      </section>
    </div>
  )
}

export default function ProfileSettingsPanel({ settings }) {
  const navigate = useNavigate()
  const [modal, setModal] = useState(null)
  const [toast, setToast] = useState('')
  const [showShareFallback, setShowShareFallback] = useState(false)
  const toastTimerRef = useRef(null)

  useEffect(() => () => window.clearTimeout(toastTimerRef.current), [])

  const showToast = (message, delay = 1800) => {
    window.clearTimeout(toastTimerRef.current)
    setToast(message)
    toastTimerRef.current = window.setTimeout(() => setToast(''), delay)
  }

  const saveModal = (message) => {
    setModal(null)
    showToast(message)
  }

  const copyProfileLink = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE_URL)
      setShowShareFallback(false)
      showToast('Profile link copied')
    } catch {
      setShowShareFallback(true)
    }
  }

  const handleClick = (item) => {
    if (item.label === 'Edit Career Memory') {
      navigate('/student/profile')
      return
    }
    if (item.label === 'Privacy Settings') {
      setModal('privacy')
      return
    }
    if (item.label === 'Notification Preferences') {
      setModal('notifications')
      return
    }
    if (item.label === 'Download My CV') {
      showToast('Preparing your CareerOS CV...', 900)
      window.setTimeout(() => showToast('CV download started'), 950)
      return
    }
    if (item.label === 'Share Profile Link') {
      copyProfileLink()
      return
    }
    if (item.label === 'About CareerOS') setModal('about')
  }

  return (
    <section className="rounded-xl border border-[#e2eaf8] bg-white p-5 shadow-[0_8px_22px_rgba(44,76,142,0.07)]">
      <h2 className="mb-3 text-base font-bold text-[#11194a]">Profile Settings</h2>

      <div className="divide-y divide-[#edf3fd]">
        {settings.map((item) => {
          const Icon = ICONS[item.icon] ?? Info
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleClick(item)}
              className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-2 py-3 text-left transition duration-200 hover:-translate-y-0.5 hover:bg-blue-50/45"
            >
              <Icon size={16} className="flex-shrink-0 text-[#7382a1]" />
              <span className="flex-1 text-sm font-medium text-[#3a4669]">{item.label}</span>
              {item.trailing && <span className="text-xs font-medium text-[#9aa6c3]">{item.trailing}</span>}
              <ChevronRight size={15} className="flex-shrink-0 text-[#9aa6c3]" />
            </button>
          )
        })}
      </div>

      <SettingsModal type={modal === 'privacy' || modal === 'notifications' ? modal : null} onClose={() => setModal(null)} onSave={saveModal} />
      {modal === 'about' && <AboutModal onClose={() => setModal(null)} />}
      {showShareFallback && <ShareFallbackModal onClose={() => setShowShareFallback(false)} onCopy={copyProfileLink} />}
      <Toast message={toast} />
    </section>
  )
}
