import React from 'react'
import { Briefcase, Check, Clock, GraduationCap, Loader2, Target } from 'lucide-react'

const ICONS = { graduation: GraduationCap, target: Target, clock: Clock }

const ICON_TONES = {
  blue: 'bg-blue-50 text-[#185FA5]',
  purple: 'bg-purple-50 text-purple-600',
  orange: 'bg-orange-50 text-orange-600',
}

function SuggestionItem({ item, onPrimaryAction, onViewCandidates, onToggleWhy }) {
  const isLoading = item.status === 'loading'
  const isConfirmed = item.status === 'confirmed' || item.status === 'fading'
  const Icon = ICONS[item.icon] || Target

  return (
    <div className={`flex flex-col gap-3 px-1 py-4 transition-opacity duration-[2000ms] lg:px-5 lg:py-0 ${item.status === 'fading' ? 'opacity-0' : 'opacity-100'}`}>
      <span className={`flex h-8 w-8 items-center justify-center rounded-full ${ICON_TONES[item.tone]}`}>
        <Icon className="h-4 w-4" />
      </span>
      <div>
        <p className="text-sm leading-5 text-gray-700">{item.text}</p>
        <button type="button" onClick={() => onToggleWhy(item.id)} className="mt-1 text-xs font-medium text-gray-400 hover:text-[#185FA5]">
          ⓘ Why?
        </button>
        {item.whyOpen ? (
          <div className="mt-2 rounded-xl border border-blue-100 bg-blue-50/70 p-3 text-xs leading-5 text-gray-600">
            {item.why}
          </div>
        ) : null}
      </div>
      <div className="flex flex-col gap-2">
        <button
          type="button"
          disabled={isLoading || isConfirmed}
          onClick={() => onPrimaryAction(item)}
          className={`flex items-center justify-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
            isConfirmed ? 'bg-green-600 text-white' : 'bg-[#185FA5] text-white hover:bg-[#134c87]'
          } ${isLoading ? 'opacity-80' : ''}`}
        >
          {isLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
          {isConfirmed ? <Check className="h-3.5 w-3.5" /> : null}
          {isLoading ? item.primaryAction : isConfirmed ? `✓ ${item.confirmedLabel}` : item.primaryAction}
        </button>
        <button
          type="button"
          onClick={() => onViewCandidates(item)}
          className="employer-secondary-button px-4 py-1.5 text-xs"
        >
          {item.secondaryAction}
        </button>
      </div>
    </div>
  )
}

export default function AIRewarmingSuggestions({ suggestions, activeCount, onPrimaryAction, onViewCandidates, onToggleWhy }) {
  return (
    <section
      className="employer-glass-card p-5"
    >
      <div className="flex items-center gap-2">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#534AB7] text-white">
          <Briefcase className="h-5 w-5" />
        </span>
        <h2 className="text-sm font-bold text-gray-900">AI Re-warming Suggestions</h2>
        <span key={activeCount} className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-medium text-[#185FA5] stage-count-pulse">
          {activeCount} opportunit{activeCount === 1 ? 'y' : 'ies'}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-1 divide-y divide-gray-200/60 lg:grid-cols-3 lg:divide-x lg:divide-y-0">
        {suggestions.map((item) => (
          <SuggestionItem
            key={item.id}
            item={item}
            onPrimaryAction={onPrimaryAction}
            onViewCandidates={onViewCandidates}
            onToggleWhy={onToggleWhy}
          />
        ))}
      </div>
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes stageCountPulse {
          0% { box-shadow: 0 0 0 3px rgba(24,95,165,0.25); }
          100% { box-shadow: 0 0 0 3px rgba(24,95,165,0); }
        }
        .stage-count-pulse { animation: stageCountPulse 900ms ease; }
      `}} />
    </section>
  )
}
