import React from 'react'
import { AlertTriangle, GraduationCap, TrendingUp, Users } from 'lucide-react'
import { kpis } from '../../../data/studentReadinessData'
import { useUniversityWorkspaceStore } from '../../../store/useUniversityWorkspaceStore'

const ICONS = { trend: TrendingUp, graduation: GraduationCap, warning: AlertTriangle, people: Users }

const ICON_TONES = {
  blue: 'bg-blue-50 text-[#185FA5]',
  orange: 'bg-orange-50 text-orange-600',
  red: 'bg-red-50 text-red-600',
}

const VALUE_TONES = { blue: 'text-[#185FA5]', orange: 'text-orange-600', red: 'text-red-600' }

export default function KpiRow() {
  const interventionsInProgress = useUniversityWorkspaceStore((s) => s.interventionsInProgress)

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {kpis.map((kpi) => {
        const Icon = ICONS[kpi.icon] || Users
        const value = kpi.id === 'interventions' ? String(interventionsInProgress) : kpi.value
        return (
          <div
            key={kpi.id}
            className={`rounded-2xl p-4 shadow-sm ${
              kpi.highlight ? 'border-2 border-red-400 bg-red-50/60' : 'border border-gray-100 bg-white'
            }`}
          >
            <span className={`flex h-10 w-10 items-center justify-center rounded-full ${ICON_TONES[kpi.tone]}`}>
              <Icon className="h-4.5 w-4.5" />
            </span>
            <p className="mt-2.5 text-xs text-gray-500">{kpi.label}</p>
            <p key={value} className={`mt-0.5 text-2xl font-bold kpi-value-pulse ${VALUE_TONES[kpi.valueTone] || 'text-gray-900'}`}>{value}</p>
            <p className="mt-0.5 text-xs text-gray-400">{kpi.note}</p>
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
