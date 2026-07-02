import React from 'react'
import { AlertTriangle, CalendarDays, Handshake, TrendingUp } from 'lucide-react'
import { kpis } from '../../../data/collaborationData'
import { useUniversityWorkspaceStore } from '../../../store/useUniversityWorkspaceStore'

const ICONS = { handshake: Handshake, trend: TrendingUp, calendar: CalendarDays, warning: AlertTriangle }

const ICON_TONES = {
  blue: 'bg-blue-50 text-[#185FA5]',
  green: 'bg-green-50 text-green-600',
  orange: 'bg-orange-50 text-orange-600',
}

const NOTE_TONES = { green: 'text-green-600', muted: 'text-gray-400' }
const VALUE_TONES = { orange: 'text-orange-600' }

export default function KpiRow() {
  const activePartnershipsCount = useUniversityWorkspaceStore((s) => s.activePartnershipsCount)

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {kpis.map((kpi) => {
        const Icon = ICONS[kpi.icon] || Handshake
        const value = kpi.id === 'active-partnerships' ? String(activePartnershipsCount) : kpi.value
        return (
          <div key={kpi.id} className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
            <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${ICON_TONES[kpi.tone]}`}>
              <Icon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm text-gray-500">{kpi.label}</p>
              <p key={value} className={`mt-0.5 text-2xl font-bold kpi-value-pulse ${VALUE_TONES[kpi.valueTone] || 'text-gray-900'}`}>{value}</p>
              <p className={`mt-0.5 text-xs font-medium ${NOTE_TONES[kpi.noteTone]}`}>{kpi.note}</p>
            </div>
          </div>
        )
      })}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes kpiValuePulse { 0% { opacity: 0.3; } 100% { opacity: 1; } }
        .kpi-value-pulse { animation: kpiValuePulse 200ms ease; }
      `}} />
    </section>
  )
}
