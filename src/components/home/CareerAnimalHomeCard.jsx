import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useSelfDiscoveryStore } from '../../store/useSelfDiscoveryStore'

export default function CareerAnimalHomeCard({ onRetake }) {
  const navigate = useNavigate()
  const store = useSelfDiscoveryStore()

  const isCompleted = store.hasCompleted()

  if (!isCompleted) {
    // Invitation State
    return (
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#11194a] via-[#1a237e] to-[#283593] p-5 text-white shadow-[0_8px_24px_rgba(26,35,126,0.12)]">
        {/* Subtle background glows */}
        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-blue-400 rounded-full filter blur-2xl opacity-20 pointer-events-none" />
        <div className="absolute -left-8 -top-8 w-24 h-24 bg-violet-400 rounded-full filter blur-xl opacity-10 pointer-events-none" />

        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-lg">
            <div className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-amber-300">
              <Sparkles size={10} /> Career Animal · Self-Discovery
            </div>
            <h3 className="text-base font-black leading-snug">Discover your work style</h3>
            <p className="text-xs text-blue-100 font-semibold leading-relaxed">
              Take a brief 5-minute situational assessment and let your AI companion understand how you work best.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/student/account')}
            className="shrink-0 flex items-center justify-center gap-1.5 rounded-full border border-amber-300/40 bg-amber-400/10 px-4 py-2 text-xs font-bold text-amber-300 hover:bg-amber-400/20 transition hover:border-amber-300 hover:scale-[1.01]"
          >
            Take the Assessment <ArrowRight size={13} />
          </button>
        </div>
      </div>
    )
  }

  // Completed State
  const animal = store.primaryAnimal
  const confidence = store.confidence || 30

  // Category labels uppercase mapping
  const CATEGORY_LABELS = {
    leadership: 'LEADERSHIP',
    relational: 'RELATIONAL',
    execution: 'EXECUTION',
  }
  const categoryLabel = CATEGORY_LABELS[animal.category] || 'LEADERSHIP'

  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#11194a] via-[#1a237e] to-[#283593] p-5 text-white shadow-[0_8px_24px_rgba(26,35,126,0.12)]">
      {/* Subtle background glows */}
      <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-blue-400 rounded-full filter blur-2xl opacity-20 pointer-events-none" />
      
      <div className="relative flex items-start gap-4">
        {/* Large Animal Emoji Left */}
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-white/10 border border-white/10 text-4xl shadow-sm filter drop-shadow-md">
          {animal.emoji}
        </div>

        {/* Text details */}
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[9px] font-extrabold uppercase tracking-widest text-amber-300">
              {categoryLabel} · YOUR CAREER ANIMAL
            </span>
            <span className="text-[9px] font-bold text-blue-200 bg-white/10 px-2 py-0.5 rounded-full">
              {confidence}% Confidence
            </span>
          </div>
          <h3 className="text-base font-black">
            {animal.name} <span className="text-xs text-blue-100 font-semibold">— {animal.archetype}</span>
          </h3>
          <p className="text-xs text-blue-100 font-semibold leading-relaxed max-w-xl">
            {animal.shortSummary}
          </p>

          {/* Action CTAs */}
          <div className="flex items-center gap-4 pt-2">
            <button
              type="button"
              onClick={() => navigate('/student/career-animal')}
              className="flex items-center gap-1 text-xs font-bold text-amber-300 hover:text-amber-200 transition"
            >
              View Full Profile <ArrowRight size={13} className="mt-0.5" />
            </button>
            <button
              type="button"
              onClick={onRetake}
              className="text-xs font-bold text-blue-200 hover:text-blue-100 hover:underline transition"
            >
              Retake Assessment
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
