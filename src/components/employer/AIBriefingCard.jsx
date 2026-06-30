import React from 'react'
import { ArrowRight, Calendar, Hourglass, ShieldAlert, Sparkles, TrendingUp, User } from 'lucide-react'
import { briefingBoxes, leadershipSnapshot } from '../../data/employerMockData'

const ICONS = { shield: ShieldAlert, user: User, calendar: Calendar, hourglass: Hourglass }

const TONES = {
  red: 'bg-red-50/90 text-red-600 ring-red-100',
  orange: 'bg-orange-50/90 text-orange-600 ring-orange-100',
  blue: 'bg-blue-50/90 text-blue-600 ring-blue-100',
  purple: 'bg-violet-50/90 text-violet-600 ring-violet-100',
}

function BriefingBox({ box }) {
  const Icon = ICONS[box.icon] || ShieldAlert
  return (
    <div className="employer-glass-subcard p-4">
      <span className={`flex h-8 w-8 items-center justify-center rounded-lg ring-1 ${TONES[box.tone]}`}>
        <Icon className="h-4 w-4" />
      </span>
      <p className="mt-2.5 text-xs font-medium text-slate-500">{box.label}</p>
      <p className="mt-1 text-2xl font-semibold text-slate-950">{box.value}</p>
      <p className="mt-1.5 text-xs leading-5 text-slate-500">{box.detail}</p>
      {box.footer ? (
        <p className={`mt-1 text-xs font-medium ${box.footerTone === 'green' ? 'text-green-600' : 'text-gray-400'}`}>{box.footer}</p>
      ) : null}
      {box.link ? (
        <button type="button" className="mt-1.5 flex items-center gap-1 text-xs font-semibold text-[#185FA5] hover:text-[#134c87]">
          {box.link}
          <ArrowRight className="h-3 w-3" />
        </button>
      ) : null}
    </div>
  )
}

function LeadershipSnapshotBox() {
  return (
    <div className="flex h-full flex-col rounded-xl bg-gradient-to-br from-blue-50/85 to-white/70 p-4 ring-1 ring-blue-100/80">
      <div className="flex items-center gap-1.5">
        <TrendingUp className="h-4 w-4 text-[#185FA5]" />
        <p className="text-sm font-semibold text-slate-900">{leadershipSnapshot.label}</p>
      </div>
      <div className="mt-3 flex-1 space-y-2.5">
        {leadershipSnapshot.rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between text-xs">
            <span className="text-slate-500">{row.label}</span>
            <span className="flex items-center gap-1.5 font-semibold text-slate-800">
              {row.value}
              <span className={row.deltaTone === 'green' ? 'text-green-600' : 'text-red-500'}>{row.delta}</span>
            </span>
          </div>
        ))}
        <div>
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>{leadershipSnapshot.progressLabel}</span>
          </div>
          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white">
            <div className="h-full rounded-full bg-gradient-to-r from-[#185FA5] to-[#69b5ff]" style={{ width: `${leadershipSnapshot.progress}%` }} />
          </div>
        </div>
      </div>
      <button type="button" className="mt-3 flex items-center gap-1 text-xs font-semibold text-[#185FA5] hover:text-[#134c87]">
        {leadershipSnapshot.link}
        <ArrowRight className="h-3 w-3" />
      </button>
    </div>
  )
}

export default function AIBriefingCard() {
  return (
    <section className="employer-glass-card p-5">
      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-[#185FA5]" />
        <h2 className="text-sm font-semibold text-slate-950">AI Briefing</h2>
        <span className="text-xs font-medium text-green-600">· Updated 8:30 AM</span>
      </div>
      <p className="mt-1 text-xs text-slate-500">Key insights and priorities based on your hiring data</p>

      <div className="mt-4 grid gap-3 md:grid-cols-[2fr_1fr]">
        <div className="grid grid-cols-2 gap-3">
          {briefingBoxes.map((box) => (
            <BriefingBox key={box.id} box={box} />
          ))}
        </div>
        <LeadershipSnapshotBox />
      </div>
    </section>
  )
}
