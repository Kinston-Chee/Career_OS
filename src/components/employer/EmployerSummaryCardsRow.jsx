import React from 'react'
import { ArrowRight, Filter, Hourglass, Radar, TrendingUp, Users } from 'lucide-react'
import {
  campusFunnel,
  leadershipSnapshot,
  opportunityRadar,
  topCandidates,
} from '../../data/employerMockData'

function CardShell({ icon: Icon, title, value, note, children, to, onNavigate }) {
  return (
    <div className="flex flex-col rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-[#185FA5]" />
        <h3 className="text-sm font-bold text-gray-900">{title}</h3>
      </div>
      <p className="mt-2 text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-xs text-gray-400">{note}</p>
      <div className="mt-3 flex-1">{children}</div>
      <button
        type="button"
        onClick={() => onNavigate(to)}
        className="mt-3 flex items-center gap-1 text-xs font-semibold text-[#185FA5] hover:underline"
      >
        View details
        <ArrowRight className="h-3 w-3" />
      </button>
    </div>
  )
}

function CandidateAvatars() {
  return (
    <div className="space-y-1.5">
      {topCandidates.map((c) => {
        const initials = c.name.split(' ').map((p) => p[0]).join('').slice(0, 2)
        return (
          <div key={c.id} className="flex items-center gap-2">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-slate-500 to-blue-500 text-[9px] font-semibold text-white">
              {initials}
            </span>
            <span className="min-w-0 flex-1 truncate text-[11px] text-gray-600">{c.name}</span>
            <span className={`text-[11px] font-semibold ${c.matchTone === 'green' ? 'text-green-600' : 'text-[#185FA5]'}`}>{c.match}%</span>
          </div>
        )
      })}
    </div>
  )
}

function FunnelMini() {
  const top = campusFunnel[0].value
  const stages = [campusFunnel[0], campusFunnel[3], campusFunnel[5], campusFunnel[7]]
  return (
    <div className="space-y-1">
      {stages.map((s) => {
        const pct = Math.max(6, (s.value / top) * 100)
        return (
          <div key={s.label} className="flex items-center gap-2">
            <span className="w-14 shrink-0 text-[10px] text-gray-400">{s.label}</span>
            <div className="relative flex-1 rounded-sm bg-gray-100">
              <div
                className="h-2.5 rounded-sm bg-gradient-to-r from-[#185FA5] to-blue-400"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="w-10 shrink-0 text-right text-[10px] font-semibold text-gray-600">
              {s.value >= 1000 ? `${(s.value / 1000).toFixed(1)}k` : s.value}
            </span>
          </div>
        )
      })}
    </div>
  )
}

function OpportunityRows() {
  return (
    <ul className="space-y-1.5 text-[11px] text-gray-600">
      {opportunityRadar.rows.slice(0, 3).map((row) => (
        <li key={row.label} className="flex items-start gap-1.5">
          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#185FA5]" />
          <span className="min-w-0 flex-1">
            <span className="font-semibold text-gray-700">{row.label}:</span> {row.value}
          </span>
        </li>
      ))}
    </ul>
  )
}

function HiringSnapshotMini() {
  const pct = leadershipSnapshot.progress
  return (
    <div className="space-y-2">
      {leadershipSnapshot.rows.map((row) => (
        <div key={row.label} className="flex items-center justify-between text-[11px]">
          <span className="text-gray-500">{row.label}</span>
          <span className="flex items-center gap-1 font-semibold text-gray-700">
            {row.value}
            <span className={`text-[10px] ${row.deltaTone === 'green' ? 'text-green-600' : 'text-red-500'}`}>{row.delta}</span>
          </span>
        </div>
      ))}
      <div>
        <div className="mb-0.5 flex items-center justify-between text-[10px] text-gray-400">
          <span>{leadershipSnapshot.progressLabel}</span>
          <span className="font-semibold text-gray-600">{pct}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-gray-100">
          <div className="h-1.5 rounded-full bg-[#185FA5]" style={{ width: `${pct}%` }} />
        </div>
      </div>
    </div>
  )
}

function BottleneckMini() {
  const items = [
    { label: 'Feedback pending', value: 2, tone: 'bg-orange-400' },
    { label: 'Interviews unscheduled', value: 1, tone: 'bg-red-400' },
    { label: 'Offers awaiting sign', value: 1, tone: 'bg-yellow-400' },
  ]
  return (
    <div className="space-y-1.5">
      {items.map((i) => (
        <div key={i.label} className="flex items-center justify-between text-[11px]">
          <span className="flex items-center gap-1.5 text-gray-600">
            <span className={`h-1.5 w-1.5 rounded-full ${i.tone}`} />
            {i.label}
          </span>
          <span className="font-semibold text-gray-700">{i.value}</span>
        </div>
      ))}
    </div>
  )
}

export default function EmployerSummaryCardsRow({ onNavigate }) {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      <CardShell icon={Users} title="Top Candidates" value={topCandidates.length} note="high-fit matches this week" to="/employer/candidates" onNavigate={onNavigate}>
        <CandidateAvatars />
      </CardShell>
      <CardShell icon={Filter} title="Campus Pipeline" value={campusFunnel[campusFunnel.length - 1].value} note="hires from 12.8k invited" to="/employer/campus-pipeline" onNavigate={onNavigate}>
        <FunnelMini />
      </CardShell>
      <CardShell icon={Radar} title="Opportunity Radar" value={opportunityRadar.rows.length} note="engagement moves detected" to="/employer/talent-discovery" onNavigate={onNavigate}>
        <OpportunityRows />
      </CardShell>
      <CardShell icon={TrendingUp} title="Hiring Snapshot" value={`${leadershipSnapshot.progress}%`} note="hiring progress · quarter-to-date" to="/employer/analytics" onNavigate={onNavigate}>
        <HiringSnapshotMini />
      </CardShell>
      <CardShell icon={Hourglass} title="Bottlenecks" value="2" note="stages slowing time-to-hire" to="/employer/candidates?stage=In%20Process" onNavigate={onNavigate}>
        <BottleneckMini />
      </CardShell>
    </section>
  )
}
