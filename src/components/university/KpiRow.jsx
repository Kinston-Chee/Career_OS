import React from 'react'
import { GraduationCap, Handshake, ShieldAlert, ShieldCheck, Users } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { kpis } from '../../data/universityMockData'
import { useUniversityWorkspaceStore } from '../../store/useUniversityWorkspaceStore'

const ICONS = { warning: ShieldAlert, people: Users, handshake: Handshake, graduation: GraduationCap, shield: ShieldCheck }

const ICON_TONES = {
  red: 'bg-red-50 text-red-600',
  orange: 'bg-orange-50 text-orange-600',
  blue: 'bg-blue-50 text-[#185FA5]',
  green: 'bg-green-50 text-green-600',
  purple: 'bg-purple-50 text-purple-600',
}

const NOTE_TONES = { green: 'text-green-600', muted: 'text-gray-400' }

const KPI_ROUTES = {
  'programs-at-risk': '/university/curriculum-alignment',
  'students-at-risk': '/university/student-readiness',
  partnerships: '/university/collaboration',
  employability: '/university/alumni-signals',
  accreditation: '/university/accreditation',
}

export default function KpiRow() {
  const navigate = useNavigate()
  const activePartnershipsCount = useUniversityWorkspaceStore((s) => s.activePartnershipsCount)

  return (
    <section className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {kpis.map((kpi) => {
        const Icon = ICONS[kpi.icon] || Users
        const value = kpi.id === 'partnerships' ? String(activePartnershipsCount) : kpi.value
        return (
          <button
            key={kpi.id}
            type="button"
            onClick={() => navigate(KPI_ROUTES[kpi.id])}
            className="rounded-2xl border border-gray-100 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-blue-100 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#155EE8]/20"
          >
            <span className={`flex h-9 w-9 items-center justify-center rounded-full ${ICON_TONES[kpi.tone]}`}>
              <Icon className="h-4.5 w-4.5" />
            </span>
            <p className="mt-2.5 text-xs text-gray-500">{kpi.label}</p>
            <p key={value} className="mt-0.5 text-2xl font-bold text-gray-900 kpi-value-pulse">{value}</p>
            <p className={`mt-0.5 text-xs font-medium ${NOTE_TONES[kpi.noteTone]}`}>{kpi.note}</p>
          </button>
        )
      })}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes kpiValuePulse { 0% { opacity: 0.3; transform: translateY(-2px); } 100% { opacity: 1; transform: translateY(0); } }
        .kpi-value-pulse { animation: kpiValuePulse 200ms ease; }
      `}} />
    </section>
  )
}
