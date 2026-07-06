import React from 'react'
import { Compass, GraduationCap, Sparkles, Trophy } from 'lucide-react'
import { whatsWorking } from '../../../data/analyticsData'

const ICONS = { trophy: Trophy, graduation: GraduationCap, compass: Compass }

const BORDER_TONES = { green: 'border-t-green-500', blue: 'border-t-[#185FA5]', purple: 'border-t-purple-500' }
const ICON_TONES = { green: 'text-green-600', blue: 'text-[#185FA5]', purple: 'text-purple-600' }

function HighlightCard({ highlight }) {
  const Icon = ICONS[highlight.icon] || Trophy
  return (
    <div className={`employer-glass-subcard border-t-[3px] p-4 ${BORDER_TONES[highlight.tone]}`}>
      <Icon className={`h-4 w-4 ${ICON_TONES[highlight.tone]}`} />
      <p className="mt-2 text-xs text-gray-400">{highlight.label}</p>
      <p className="text-[15px] font-bold text-gray-900">{highlight.title}</p>
      <p className="mt-1 text-xs text-gray-500">{highlight.detail}</p>
    </div>
  )
}

export default function WhatsWorking() {
  return (
    <section
      className="employer-glass-card p-5"
    >
      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-[#534AB7]" />
        <h2 className="text-sm font-bold text-[#534AB7]">What&rsquo;s Actually Working</h2>
        <span className="rounded-full bg-purple-100 px-2.5 py-0.5 text-[11px] font-medium text-purple-700">AI-generated insight</span>
      </div>

      <p className="mt-3 text-sm leading-[1.7] text-gray-700">{whatsWorking.body}</p>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {whatsWorking.highlights.map((highlight) => (
          <HighlightCard key={highlight.id} highlight={highlight} />
        ))}
      </div>
    </section>
  )
}
