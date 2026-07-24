import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BarChart3, CheckCircle2, Clock, Star, Users } from 'lucide-react'
import { metricsPills } from '../../data/employerMockData'

const ICONS = { clock: Clock, star: Star, check: CheckCircle2, people: Users, chart: BarChart3 }

const ICON_TONES = {
  green: 'bg-green-50 text-green-600',
  red: 'bg-red-50 text-red-600',
  blue: 'bg-blue-50 text-[#185FA5]',
  orange: 'bg-orange-50 text-orange-600',
}

const KPI_ROUTES = {
  'time-to-fill': '/employer/analytics',
  'quality-of-hire': '/employer/analytics',
  'offer-acceptance': '/employer/analytics',
  'shortlisted': '/employer/candidates?stage=Shortlisted',
  'event-roi': '/employer/posting',
}

const ICON_TONE_BY_ID = {
  'time-to-fill': 'blue',
  'quality-of-hire': 'green',
  'offer-acceptance': 'green',
  'shortlisted': 'blue',
  'event-roi': 'green',
}

export default function EmployerKpiRow() {
  const navigate = useNavigate()

  return (
    <section className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {metricsPills.map((kpi) => {
        const Icon = ICONS[kpi.icon] || Users
        return (
          <button
            key={kpi.id}
            type="button"
            onClick={() => navigate(KPI_ROUTES[kpi.id] || '/employer/analytics')}
            className="rounded-2xl border border-gray-100 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-blue-100 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#155EE8]/20"
          >
            <span className={`flex h-9 w-9 items-center justify-center rounded-full ${ICON_TONES[ICON_TONE_BY_ID[kpi.id] || 'blue']}`}>
              <Icon className="h-4.5 w-4.5" />
            </span>
            <p className="mt-2.5 text-xs text-gray-500">{kpi.label}</p>
            <p key={kpi.value} className="mt-0.5 text-2xl font-bold text-gray-900 kpi-value-pulse">{kpi.value}</p>
            <p className={`mt-0.5 text-xs font-medium ${kpi.deltaTone === 'green' ? 'text-green-600' : 'text-gray-400'}`}>{kpi.delta}</p>
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
