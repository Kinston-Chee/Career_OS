import React, { useState } from 'react'
import { ArrowRight, Eye, Send, Sparkles, Zap } from 'lucide-react'
import robotImg from '../../assets/career-os-robot.png'

const CHIP_ICONS = [Sparkles, Eye, Zap]

// Compact "Your Career Coach" chat card on the Candidate Home page.
// Every submit (chip or input) hands the prompt off to the AI Companion page
// via onSubmit — the parent navigates to /student/ai-companion and passes the
// prompt through router state so the companion auto-continues the conversation.
export default function HeroCard({ briefing, onSubmit, onOpenCompanion }) {
  const [draft, setDraft] = useState('')

  const submit = (prompt) => {
    const clean = prompt?.trim()
    if (!clean) return
    onSubmit?.(clean)
    setDraft('')
  }

  const messageParts = Array.isArray(briefing.message)
    ? briefing.message
    : [{ text: briefing.message }]

  return (
    <section className="rounded-2xl border border-[#dfe8fb] bg-[linear-gradient(135deg,#f4f2ff_0%,#eaeefc_55%,#f3f5ff_100%)] p-5 shadow-[0_10px_28px_rgba(38,72,140,0.08)]">
      {/* Header row: robot badge + title, "Full companion" button */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-violet-100 to-indigo-100 shadow-[0_8px_18px_rgba(99,102,241,0.3)]">
              <img src={robotImg} alt="" aria-hidden="true" className="h-14 w-14 object-contain object-bottom" />
            </div>
            <span
              className="absolute -bottom-0.5 -left-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-500 shadow-sm"
              aria-hidden="true"
            />
            <span className="sr-only">Career Coach online</span>
          </div>
          <div>
            <h2 className="text-base font-bold leading-tight text-[#11194a]">
              {briefing.title ?? 'Your Career Coach'}
            </h2>
            <p className="mt-0.5 text-xs font-semibold text-[#7382a1]">
              {briefing.subtitle ?? 'Quick chat · always on'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onOpenCompanion?.()}
          className="inline-flex items-center gap-1 rounded-full border border-indigo-100 bg-white/85 px-3.5 py-2 text-xs font-bold text-indigo-700 shadow-[0_4px_10px_rgba(46,82,154,0.08)] transition hover:-translate-y-0.5 hover:border-indigo-300 hover:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100"
        >
          Full companion <ArrowRight size={13} strokeWidth={2.4} />
        </button>
      </div>

      {/* Companion message bubble */}
      <div className="mt-4 rounded-xl border border-white/70 bg-white px-4 py-3 shadow-[0_4px_12px_rgba(45,78,145,0.06)]">
        <p className="text-sm font-medium leading-6 text-[#10183f]">
          {messageParts.map((part, index) => (
            part.bold
              ? <strong key={index} className="font-bold text-[#11194a]">{part.text}</strong>
              : <span key={index}>{part.text}</span>
          ))}
        </p>
      </div>

      {/* Quick-reply chips — each redirects to the AI Companion with its prompt */}
      <div className="mt-3 flex flex-wrap gap-2">
        {briefing.chips.map((chip, index) => {
          const Icon = CHIP_ICONS[index] ?? Sparkles
          const label = typeof chip === 'string' ? chip : chip.label
          const prompt = typeof chip === 'string' ? chip : (chip.prompt ?? chip.label)
          return (
            <button
              key={label}
              type="button"
              onClick={() => submit(prompt)}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#d9e5f8] bg-white/92 px-3.5 py-2 text-xs font-semibold text-[#35507d] shadow-[0_4px_10px_rgba(46,82,154,0.08)] transition hover:-translate-y-0.5 hover:border-indigo-300 hover:text-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-100"
            >
              <Icon size={13} className="text-indigo-600" strokeWidth={2.3} aria-hidden="true" />
              {label}
            </button>
          )
        })}
      </div>

      {/* Composer — submits to AI Companion via the parent */}
      <form
        onSubmit={(event) => {
          event.preventDefault()
          submit(draft)
        }}
        className="mt-3 flex items-center gap-2 rounded-full border border-white/80 bg-white px-4 py-2 shadow-[0_4px_12px_rgba(45,78,145,0.08)]"
      >
        <Sparkles size={16} className="text-indigo-500" strokeWidth={2.2} aria-hidden="true" />
        <label htmlFor="career-coach-input" className="sr-only">Message your Career Coach</label>
        <input
          id="career-coach-input"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder={briefing.placeholder ?? 'Ask your Career Coach…'}
          className="flex-1 bg-transparent text-sm font-medium text-[#2c3656] placeholder:text-[#9aa6c3] focus:outline-none"
        />
        <button
          type="submit"
          disabled={!draft.trim()}
          aria-label="Send to AI Companion"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-45"
        >
          <Send size={15} strokeWidth={2.4} />
        </button>
      </form>
    </section>
  )
}
