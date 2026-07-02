import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, BarChart3, Bot, Clock, Flag, HelpCircle, Users, Zap } from 'lucide-react'
import { actionQueue } from '../../data/employerMockData'

const ICONS = { clock: Clock, zap: Zap, flag: Flag, chart: BarChart3, people: Users }

const ICON_TONES = {
  orange: 'bg-orange-50/90 text-orange-600 ring-orange-100',
  yellow: 'bg-yellow-50/90 text-yellow-600 ring-yellow-100',
  red: 'bg-red-50/90 text-red-600 ring-red-100',
  blue: 'bg-blue-50/90 text-blue-600 ring-blue-100',
  green: 'bg-green-50/90 text-green-600 ring-green-100',
}

const PILL_TONES = {
  green: 'bg-green-50 text-green-700',
  orange: 'bg-orange-50 text-orange-700',
  red: 'bg-red-50 text-red-700',
  blue: 'bg-blue-50 text-blue-700',
}

export default function AIActionQueue() {
  const navigate = useNavigate()
  const [openWhyId, setOpenWhyId] = useState(null)

  return (
    <section className="employer-glass-card flex h-full flex-col p-5">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Bot className="h-4 w-4 text-[#185FA5]" />
          <h2 className="text-sm font-semibold text-slate-950">AI Action Queue</h2>
        </div>
        <span className="rounded-full bg-red-50/90 px-2.5 py-0.5 text-[11px] font-semibold text-red-600 ring-1 ring-red-100">5 urgent</span>
      </div>
      <p className="mt-1 text-xs text-slate-500">Recommended actions to move hiring forward — click to review</p>

      <div className="mt-4 flex-1 space-y-1">
        {actionQueue.map((action) => {
          const Icon = ICONS[action.icon] || Clock
          const whyOpen = openWhyId === action.id
          return (
            <div key={action.id} className="rounded-xl transition hover:bg-white/60">
              <button
                type="button"
                onClick={() => navigate(action.to || '/employer/candidates')}
                className="flex w-full items-start gap-3 px-2 py-2.5 text-left"
              >
                <span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ring-1 ${ICON_TONES[action.tone]}`}>
                  <Icon className="h-4 w-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[13px] font-semibold leading-5 text-slate-800">{action.text}</span>
                  <span className="mt-1.5 flex items-center gap-2">
                    <span className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium ${PILL_TONES[action.pillTone]}`}>
                      {action.pill}
                    </span>
                    <span
                      role="button"
                      tabIndex={0}
                      onClick={(e) => {
                        e.stopPropagation()
                        setOpenWhyId(whyOpen ? null : action.id)
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.stopPropagation()
                          e.preventDefault()
                          setOpenWhyId(whyOpen ? null : action.id)
                        }
                      }}
                      className="inline-flex items-center gap-0.5 text-[11px] font-medium text-gray-400 hover:text-[#185FA5]"
                    >
                      <HelpCircle className="h-3 w-3" /> Why?
                    </span>
                  </span>
                </span>
                <ArrowRight className="mt-1 h-3.5 w-3.5 shrink-0 text-gray-300" />
              </button>
              {whyOpen ? (
                <div className="mx-2 mb-2 rounded-xl border border-blue-100 bg-blue-50/70 p-3 text-xs leading-5 text-gray-600">
                  {action.why}
                </div>
              ) : null}
            </div>
          )
        })}
      </div>

      <button
        type="button"
        onClick={() => navigate('/employer/candidates')}
        className="mt-3 flex items-center gap-1 text-xs font-semibold text-[#185FA5] hover:text-[#134c87]"
      >
        View all actions (12)
        <ArrowRight className="h-3 w-3" />
      </button>
    </section>
  )
}
