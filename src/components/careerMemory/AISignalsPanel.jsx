import React, { useEffect, useState } from 'react'
import { BarChart3, Code2, Info, Sparkles, Users } from 'lucide-react'

const ICONS = { Users, Code2, BarChart3 }

const ICON_TONES = {
  blue: 'bg-blue-50 text-blue-600',
  violet: 'bg-violet-50 text-violet-600',
  emerald: 'bg-emerald-50 text-emerald-600',
}

const BAR_TONES = {
  blue: 'bg-blue-600',
  violet: 'bg-violet-600',
  emerald: 'bg-emerald-600',
}

const LEVEL_TONES = {
  blue: 'text-blue-600',
  violet: 'text-violet-600',
  emerald: 'text-emerald-600',
}

export default function AISignalsPanel({ signals, leadershipBoost }) {
  const [showFlash, setShowFlash] = useState(false)

  useEffect(() => {
    if (!leadershipBoost) return undefined
    setShowFlash(true)
    const timer = setTimeout(() => setShowFlash(false), 1500)
    return () => clearTimeout(timer)
  }, [leadershipBoost])

  return (
    <section className="rounded-xl border border-[#e2eaf8] bg-white p-5 shadow-[0_8px_22px_rgba(44,76,142,0.07)]">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-bold text-[#11194a]">AI Signals Detected</h2>
        <Sparkles size={16} className="text-violet-500" />
      </div>

      <div className="space-y-4">
        {signals.map((signal) => {
          const Icon = ICONS[signal.icon] ?? Users
          const isLeadership = signal.label === 'Leadership'
          const value = isLeadership && leadershipBoost && signal.boostedValue ? signal.boostedValue : signal.value
          return (
            <div key={signal.id}>
              <div className="flex items-center gap-2.5">
                <span className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${ICON_TONES[signal.tone] ?? ICON_TONES.blue}`}>
                  <Icon size={15} strokeWidth={2.2} />
                </span>
                <span className="flex-1 text-sm font-bold text-[#11194a]">{signal.label}</span>
                {isLeadership && showFlash && (
                  <span className="chat-fade-in text-xs font-bold text-emerald-600">+1 entry</span>
                )}
                <span className={`text-xs font-bold ${LEVEL_TONES[signal.tone] ?? LEVEL_TONES.blue}`}>{signal.level}</span>
              </div>
              <div className="mt-2 h-2 w-full rounded-full bg-slate-100">
                <div
                  className={`h-2 rounded-full transition-[width] duration-[600ms] ease-out ${BAR_TONES[signal.tone] ?? BAR_TONES.blue}`}
                  style={{ width: `${value}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-4 flex items-start gap-2 rounded-lg bg-gray-50 p-3">
        <Info size={14} className="mt-0.5 flex-shrink-0 text-[#7382a1]" />
        <p className="text-xs font-medium leading-relaxed text-[#7382a1]">
          These signals are extracted from your experiences and will grow as you add more.
        </p>
      </div>
    </section>
  )
}
