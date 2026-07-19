import React from 'react'
import { ChevronRight, Handshake, ShieldAlert, ShieldCheck, Sparkles, Users } from 'lucide-react'
import { leadershipInbox } from '../../data/universityMockData'

const ICONS = { warning: ShieldAlert, people: Users, handshake: Handshake, shield: ShieldCheck }

const ICON_TONES = {
  red: 'bg-red-50 text-red-600',
  orange: 'bg-orange-50 text-orange-600',
  green: 'bg-green-50 text-green-600',
  purple: 'bg-purple-50 text-purple-600',
}

const PILL_TONES = {
  red: 'bg-red-50 text-red-700',
  orange: 'bg-orange-50 text-orange-700',
  green: 'bg-green-50 text-green-700',
  purple: 'bg-purple-50 text-purple-700',
}

const ALIGNED_COPY = {
  'cloud-gap': {
    text: '2 programs are losing market relevance, with GenAI and cloud coverage driving the curriculum gap',
    source: 'Source: Curriculum-Market Alignment - syllabus mapping + market demand signals',
  },
  'dsa-readiness': {
    text: '34 students are at employability risk and need intervention before the next readiness review',
    source: 'Source: Student Readiness - academic scores + Career Memory completeness',
  },
  'grab-partnership': {
    text: '13 active partnerships are live, with 4 high-value partners including TalentBank',
    source: 'Source: Collaboration Marketplace - partnership hiring conversion records',
  },
  'mqa-deadline': {
    text: 'Accreditation readiness is 82%, with evidence packs ready for review',
    source: 'Source: Accreditation Hub - evidence pack completeness tracker',
  },
}

export default function AILeadershipInbox({ onItemClick }) {
  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-purple-600" />
          <h2 className="text-sm font-bold text-gray-900">AI Leadership Inbox</h2>
          <span className="text-xs text-gray-400">Updated 8:30 AM</span>
        </div>
        <span className="rounded-full bg-purple-50 px-2.5 py-0.5 text-[11px] font-medium text-purple-700">4 priorities this week</span>
      </div>

      <div className="mt-3 divide-y divide-gray-50">
        {leadershipInbox.map((item) => {
          const displayItem = { ...item, ...ALIGNED_COPY[item.id] }
          const Icon = ICONS[item.icon] || ShieldAlert
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onItemClick(displayItem)}
              className="flex w-full items-start gap-3 py-3.5 text-left transition hover:bg-gray-50/70"
            >
              <span className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${ICON_TONES[item.tone]}`}>
                <Icon className="h-4.5 w-4.5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm leading-5 text-gray-800">{displayItem.text}</p>
                <span className="mt-1 inline-block text-xs font-semibold text-[#185FA5] hover:underline">{item.link} →</span>
                {displayItem.source ? <p className="mt-0.5 text-[11px] italic text-gray-400">{displayItem.source}</p> : null}
              </div>
              <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-medium ${PILL_TONES[item.pillTone]}`}>{item.pill}</span>
              <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-gray-300" />
            </button>
          )
        })}
      </div>
    </section>
  )
}
