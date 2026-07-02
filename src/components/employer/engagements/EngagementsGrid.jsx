import React from 'react'
import { Award, Code2, Laptop, MoreHorizontal, Star, TrendingUp, Trophy } from 'lucide-react'
import { engagements as defaultEngagements } from '../../../data/engagementsData'

const ICONS = { code: Code2, chart: TrendingUp, trophy: Trophy, laptop: Laptop, star: Star, award: Award }

const ICON_TONES = {
  blue: 'bg-blue-50 text-[#185FA5]',
  purple: 'bg-purple-50 text-purple-600',
  orange: 'bg-orange-50 text-orange-600',
  teal: 'bg-teal-50 text-teal-700',
}

const BADGE_TONES = {
  blue: 'bg-blue-50 text-[#185FA5]',
  purple: 'bg-purple-50 text-purple-700',
  orange: 'bg-orange-50 text-orange-700',
  teal: 'bg-teal-50 text-teal-700',
}

const STATUS_TONES = {
  green: { dot: 'bg-green-500', text: 'text-gray-700' },
  orange: { dot: 'bg-orange-500', text: 'text-gray-700' },
  gray: { dot: 'bg-gray-400', text: 'text-gray-500' },
}

function EngagementCard({ engagement, isNew, onViewApplicants }) {
  const Icon = ICONS[engagement.icon] || Code2
  const StatIcon = engagement.stat2Icon === 'award' ? Award : Star
  const statusTone = STATUS_TONES[engagement.statusDot] || STATUS_TONES.gray

  return (
    <article
      className={`employer-glass-card p-5 transition-all duration-200 ${isNew ? 'engagement-card-glow' : ''}`}
    >
      <div className="flex items-start justify-between gap-3">
        <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${ICON_TONES[engagement.iconTone]}`}>
          <Icon className="h-5 w-5" />
        </span>
        <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${BADGE_TONES[engagement.badgeTone]}`}>{engagement.badge}</span>
      </div>

      <p className="mt-3 text-[15px] font-bold text-gray-900">{engagement.title}</p>
      <p className="mt-1 text-xs text-gray-500">{engagement.company} · {engagement.location}</p>
      <p className="text-xs text-gray-400">Posted: {engagement.posted} · {engagement.deadlineLabel}</p>

      <div className="my-3 border-t border-gray-100" />

      <div className="flex items-center justify-between text-sm">
        <span className="flex items-center gap-1.5 text-gray-500">{engagement.stat1Value} {engagement.stat1Label}</span>
        {engagement.stat2Value !== undefined ? (
          <span className="flex items-center gap-1.5 font-semibold text-[#185FA5]">
            <StatIcon className="h-3.5 w-3.5" />
            {engagement.stat2Value} {engagement.stat2Label}
          </span>
        ) : null}
      </div>

      {engagement.stat3Value ? (
        <div className="mt-1.5 flex items-center justify-between text-sm">
          <span className="text-gray-500">{engagement.stat3Label}</span>
          <span className="font-semibold text-green-600">{engagement.stat3Value}</span>
        </div>
      ) : null}
      {engagement.stat4Value ? (
        <div className="mt-1.5 flex items-center justify-between text-sm">
          <span className="text-gray-500">{engagement.stat4Label}</span>
          <span className="font-semibold text-green-600">{engagement.stat4Value}</span>
        </div>
      ) : null}

      <div className="mt-3 flex items-center gap-1.5 text-sm">
        <span className={`h-1.5 w-1.5 rounded-full ${statusTone.dot}`} />
        <span className={statusTone.text}>{engagement.statusText}</span>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <button type="button" onClick={onViewApplicants} className="flex items-center gap-1 text-sm font-semibold text-[#185FA5] hover:text-[#134c87]">
          {engagement.actionLabel}
          <span aria-hidden="true">→</span>
        </button>
        <button type="button" className="text-gray-300 hover:text-gray-500">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>
    </article>
  )
}

export default function EngagementsGrid({ engagementsList = defaultEngagements, filterTab, newEngagementId, onViewApplicants }) {
  const filtered = filterTab === 'All' ? engagementsList : engagementsList.filter((e) => e.filterStatus === filterTab)

  return (
    <section className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      {filtered.map((engagement) => (
        <EngagementCard
          key={engagement.id}
          engagement={engagement}
          isNew={engagement.id === newEngagementId}
          onViewApplicants={() => onViewApplicants(engagement)}
        />
      ))}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes engagementGlow {
          0% { box-shadow: 0 0 0 4px rgba(24,95,165,0.15); }
          100% { box-shadow: 0 0 0 4px rgba(24,95,165,0); }
        }
        @keyframes engagementSlideIn {
          from { opacity: 0; transform: translateY(-12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .engagement-card-glow {
          animation: engagementSlideIn 400ms ease, engagementGlow 1500ms ease forwards;
        }
      `}} />
    </section>
  )
}
