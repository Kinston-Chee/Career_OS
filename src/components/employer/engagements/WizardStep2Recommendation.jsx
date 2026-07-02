import React from 'react'
import {
  BarChart3,
  Bot,
  Building2,
  Megaphone,
  Search,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react'
import {
  aiRecommendation,
  alternativeEngagementTypes,
  campusIntelligence,
} from '../../../data/engagementsData'

const REASON_ICONS = { people: Users, trend: TrendingUp, sparkle: Sparkles, target: Target }
const ALT_ICONS = { search: Search, megaphone: Megaphone, zap: Zap }

const UNI_TONES = {
  red: 'bg-red-500',
  green: 'bg-green-500',
  blue: 'bg-[#185FA5]',
}

const GAP_TONES = {
  red: 'bg-red-500',
  orange: 'bg-orange-500',
  amber: 'bg-amber-400',
}

function GoalSummaryPill({ goal, onEdit }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-green-200 bg-green-50 px-4 py-3">
      <p className="flex items-center gap-2 text-sm font-medium text-green-800">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-white">✓</span>
        Goal: {goal}
      </p>
      <button type="button" onClick={onEdit} className="text-sm font-semibold text-[#185FA5] hover:underline">
        Edit
      </button>
    </div>
  )
}

function RecommendationCard({ onAccept, onShowOther }) {
  return (
    <div className="employer-glass-card p-5">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-50 text-[#534AB7]">
          <Bot className="h-5 w-5" />
        </span>
        <div>
          <p className="text-[15px] font-bold text-gray-900">Here&rsquo;s what I recommend</p>
          <p className="text-xs text-gray-500">Based on your hiring goals and real-time campus talent data</p>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50/50 p-4">
        <div className="flex items-start justify-between gap-2">
          <p className="text-[15px] font-bold text-gray-900">{aiRecommendation.title}</p>
          <span className="shrink-0 rounded-full bg-orange-50 px-2.5 py-0.5 text-[11px] font-medium text-orange-700">{aiRecommendation.badge}</span>
        </div>
        <p className="mt-1 text-xs text-gray-500">{aiRecommendation.meta}</p>

        <div className="mt-3 space-y-2">
          {aiRecommendation.reasons.map((reason) => {
            const Icon = REASON_ICONS[reason.icon] || Sparkles
            return (
              <div key={reason.text} className="flex items-start gap-2">
                <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#185FA5]" />
                <p className="text-sm text-gray-700">{reason.text}</p>
              </div>
            )
          })}
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3">
          {aiRecommendation.metrics.map((metric) => (
            <div key={metric.label} className="rounded-lg border border-blue-100 bg-white px-3 py-3 text-center">
              <p className="text-xl font-bold text-[#185FA5]">{metric.value}</p>
              <p className="mt-0.5 text-[11px] text-gray-500">{metric.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button type="button" onClick={onAccept} className="rounded-full bg-[#185FA5] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#134c87]">
            Yes, create this →
          </button>
          <button type="button" onClick={onShowOther} className="rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50">
            Show me other options
          </button>
        </div>
      </div>
    </div>
  )
}

function AlternativeTypes() {
  return (
    <div>
      <p className="mb-3 text-center text-xs font-medium text-gray-400">Other engagement types</p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {alternativeEngagementTypes.map((alt) => {
          const Icon = ALT_ICONS[alt.icon] || Search
          return (
            <div key={alt.id} className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
              <Icon className="h-4 w-4 text-[#185FA5]" />
              <p className="mt-2 text-xs font-medium text-gray-400">{alt.title}</p>
              <p className="text-sm font-bold text-gray-900">{alt.subtitle}</p>
              <p className="mt-1 text-xs text-gray-500">{alt.description}</p>
              <button type="button" className="mt-2 text-xs font-semibold text-[#185FA5] hover:underline">
                Select →
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function CampusIntelligencePanel() {
  return (
    <aside className="employer-glass-card p-5">
      <div className="flex items-center gap-2">
        <BarChart3 className="h-4 w-4 text-[#185FA5]" />
        <h3 className="text-sm font-bold text-gray-900">Campus Intelligence</h3>
      </div>
      <p className="mt-1 text-xs text-gray-400">Real-time talent availability in your target region</p>

      <p className="mt-4 text-xs font-semibold text-gray-700">Best universities to target</p>
      <div className="mt-2 space-y-2.5">
        {campusIntelligence.universities.map((uni) => (
          <div key={uni.id} className="flex items-center gap-2.5">
            <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white ${UNI_TONES[uni.tone]}`}>
              {uni.initial}
            </span>
            <span className="min-w-0 flex-1 truncate text-xs text-gray-700">{uni.name}</span>
            <span className="shrink-0 text-xs font-semibold text-gray-500">{uni.candidates} candidates</span>
            <span className="flex shrink-0 gap-0.5">
              {Array.from({ length: 4 }).map((_, i) => (
                <span key={i} className={`h-3 w-1 rounded-sm ${i < uni.bars ? 'bg-[#185FA5]' : 'bg-gray-100'}`} />
              ))}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[11px] italic text-gray-400">AI match your SWE + NLP criteria</p>

      <p className="mt-4 text-xs font-semibold text-gray-700">Talent availability window</p>
      <div className="mt-2 flex gap-1">
        {campusIntelligence.availabilityMonths.map((month) => (
          <span
            key={month}
            className={`flex h-7 flex-1 items-center justify-center rounded text-[10px] font-medium ${
              campusIntelligence.peakMonths.includes(month) ? 'bg-[#185FA5] text-white' : 'bg-gray-100 text-gray-500'
            }`}
          >
            {month}
          </span>
        ))}
      </div>
      <p className="mt-2 text-xs font-semibold text-[#185FA5]">{campusIntelligence.peakLabel}</p>
      <p className="text-[11px] text-gray-400">{campusIntelligence.peakDetail}</p>

      <p className="mt-4 text-xs font-semibold text-gray-700">Skill gaps you can fill</p>
      <p className="text-[11px] text-gray-400">Your current hiring gaps</p>
      <div className="mt-2 space-y-2.5">
        {campusIntelligence.skillGaps.map((gap) => (
          <div key={gap.label}>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-700">{gap.label}</span>
              <span className="font-semibold text-gray-500">{gap.value}%</span>
            </div>
            <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
              <div className={`h-full rounded-full ${GAP_TONES[gap.tone]}`} style={{ width: `${gap.value}%` }} />
            </div>
            <p className="mt-0.5 text-[11px] text-gray-400">{gap.detail}</p>
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs font-semibold text-gray-700">Similar companies did this</p>
      <div className="mt-2 space-y-2">
        {campusIntelligence.similarCompanies.map((company) => (
          <div key={company.id} className="flex items-start gap-2">
            <Building2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gray-400" />
            <div className="min-w-0">
              <p className="text-xs font-medium text-gray-700">{company.name} · {company.detail}</p>
              <p className="text-[11px] text-gray-400">{company.result}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-4 border-t border-gray-100 pt-3 text-[11px] italic text-gray-400">{campusIntelligence.benchmark}</p>
    </aside>
  )
}

export default function WizardStep2Recommendation({ selectedGoal, onEditGoal, onAccept, onShowOther }) {
  return (
    <div className="mx-auto max-w-[1200px] space-y-4">
      <GoalSummaryPill goal={selectedGoal} onEdit={onEditGoal} />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-4">
          <RecommendationCard onAccept={onAccept} onShowOther={onShowOther} />
          <AlternativeTypes />
        </div>
        <CampusIntelligencePanel />
      </div>
    </div>
  )
}
