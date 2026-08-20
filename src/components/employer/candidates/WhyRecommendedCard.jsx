import React from 'react'
import { AlertTriangle, BadgeCheck, Briefcase, Layers, Sparkles, Target } from 'lucide-react'

const TONES = {
  blue:   { wrap: 'border-blue-100 bg-blue-50/50',      icon: 'bg-blue-100 text-[#185FA5]' },
  green:  { wrap: 'border-emerald-100 bg-emerald-50/50', icon: 'bg-emerald-100 text-emerald-700' },
  purple: { wrap: 'border-purple-100 bg-purple-50/50',  icon: 'bg-purple-100 text-purple-700' },
  amber:  { wrap: 'border-amber-100 bg-amber-50/50',    icon: 'bg-amber-100 text-amber-700' },
}

const ICONS = {
  match: Target,
  evidence: BadgeCheck,
  skills: Layers,
  coverage: Briefcase,
  validate: AlertTriangle,
}

/**
 * WhyRecommendedCard
 *
 * Explains to the HR user why CareerOS surfaced this candidate — what the
 * match score is built from, and what still needs checking.
 */
export default function WhyRecommendedCard({ candidate, reasons }) {
  if (!reasons?.length) return null
  const first = candidate.name.split(' ')[0]

  return (
    <section className="employer-glass-card border-l-4 border-l-[#185FA5] p-5">
      <div className="flex flex-wrap items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-[#185FA5]">
          <Sparkles className="h-4 w-4" />
        </span>
        <h2 className="text-sm font-bold text-gray-900">Why {first} is recommended</h2>
        <span className="text-xs text-gray-400">CareerOS match reasoning</span>
      </div>

      <p className="mt-2.5 text-sm leading-6 text-gray-700">
        {first} was surfaced for <span className="font-semibold text-[#185FA5]">{candidate.targetRole}</span> because
        the evidence in their Career Memory maps onto what this role screens for. Here is what drove the score:
      </p>

      <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {reasons.map((reason) => {
          const tone = TONES[reason.tone] || TONES.blue
          const Icon = ICONS[reason.id] || Sparkles
          return (
            <div key={reason.id} className={`flex items-start gap-2.5 rounded-xl border p-3 ${tone.wrap}`}>
              <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${tone.icon}`}>
                <Icon className="h-3.5 w-3.5" />
              </span>
              <div className="min-w-0">
                <p className="text-[13px] font-semibold leading-5 text-gray-900">{reason.title}</p>
                <p className="mt-0.5 text-[12px] leading-5 text-gray-600">{reason.detail}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
