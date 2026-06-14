import React, { useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import TypewriterText from '../ui/TypewriterText'

const pageMessages = [
  {
    match: (pathname) => pathname === '/student' || pathname === '/student/overview',
    text: "Hi Chris! Here's what I'd focus on today: your SQL gap is the fastest win for Data Analyst readiness. Try a 30-min practice session.",
  },
  {
    match: (pathname) => pathname.includes('/student/profile') || pathname.includes('/student/memory-profile'),
    text: 'Your career memory has 14 entries — strong evidence base. Adding 1-2 more real-world projects would strengthen your portfolio for Data Analyst applications.',
  },
  {
    match: (pathname) => pathname.includes('/student/intelligence') || pathname.includes('/student/career-intelligence'),
    text: 'Your market position is strong in Python and analysis. Focus on Power BI and advanced SQL to close the biggest skill gaps for Data Analyst roles.',
  },
  {
    match: (pathname) => pathname.includes('/student/opportunities'),
    text: 'I found 3 events this week matching your Data Analyst goals. The Google Cloud Workshop has a 93% skill match — worth registering.',
  },
  {
    match: (pathname) => pathname.includes('/student/applications'),
    text: 'You have 7 active applications. Your Google Data Analyst interview is coming up — prepare by reviewing SQL joins and data storytelling.',
  },
  {
    match: (pathname) => pathname.includes('/student/settings'),
    text: 'Settings keeps your target role, location, and industry preferences current so CareerOS can tune recommendations across the workspace.',
  },
]

const suggestedPrompts = [
  'How do I become a Data Analyst?',
  'Which skills am I missing?',
  'Review my resume',
  'Suggest events this week',
  'Compare career paths',
]

export default function CandidateCompanionBot() {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(true)
  const [showPrompts, setShowPrompts] = useState(false)

  const message = useMemo(() => {
    return (
      pageMessages.find((item) => item.match(location.pathname))?.text ??
      "I'm your personal career coach. Ask me anything about your career goals, skills, or next steps."
    )
  }, [location.pathname])

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-40 hidden w-72 lg:block">
      {/* Chat bubble */}
      {isOpen && (
        <div className="pointer-events-auto absolute bottom-[76px] right-0 w-72 rounded-2xl border border-violet-200/80 bg-white px-4 py-3.5 text-sm leading-6 text-slate-700 shadow-[0_18px_45px_rgba(88,63,188,0.16)]">
          <button
            type="button"
            className="absolute right-3 top-2.5 flex h-5 w-5 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Hide companion message"
            onClick={() => setIsOpen(false)}
          >
            <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M2 2l8 8M10 2l-8 8" />
            </svg>
          </button>
          <div className="flex items-center gap-2 pr-5">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-500">
              <svg className="h-3.5 w-3.5 text-white" viewBox="0 0 18 18" fill="currentColor">
                <path d="M9 1l1.76 5.24L16 8l-5.24 1.76L9 15l-1.76-5.24L2 8l5.24-1.76L9 1z" />
              </svg>
            </div>
            <p className="font-bold text-[#11104a]">Career Coach</p>
            <span className="ml-auto flex items-center gap-1 text-[10px] font-medium text-emerald-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Online
            </span>
          </div>
          <p className="mt-2 text-[13px] leading-5">
            <TypewriterText text={message} active={isOpen} speed={22} />
          </p>

          {/* Suggested prompts */}
          <button
            type="button"
            onClick={() => setShowPrompts((v) => !v)}
            className="mt-3 flex w-full items-center gap-1.5 text-[11px] font-semibold text-violet-600 transition hover:text-violet-700"
          >
            <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <circle cx="6" cy="6" r="5" />
              <path d="M6 4v4M4 6h4" />
            </svg>
            {showPrompts ? 'Hide suggestions' : 'Try asking me...'}
          </button>

          {showPrompts && (
            <div className="mt-2 space-y-1.5">
              {suggestedPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  className="w-full rounded-lg border border-violet-100 bg-violet-50/50 px-3 py-1.5 text-left text-[11px] font-medium text-violet-700 transition hover:border-violet-200 hover:bg-violet-50"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Chat tail */}
          <span className="absolute -bottom-2 right-8 h-4 w-4 rotate-45 border-b border-r border-violet-200/80 bg-white" />
        </div>
      )}

      {/* Toggle button */}
      <button
        type="button"
        aria-label={isOpen ? 'Hide Career Coach' : 'Show Career Coach'}
        className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-[0_8px_24px_rgba(88,63,188,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(88,63,188,0.45)] focus:outline-none focus:ring-4 focus:ring-violet-200"
        onClick={() => setIsOpen((v) => !v)}
      >
        {isOpen ? (
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-6 w-6" viewBox="0 0 18 18" fill="currentColor">
            <path d="M9 1l1.76 5.24L16 8l-5.24 1.76L9 15l-1.76-5.24L2 8l5.24-1.76L9 1z" />
          </svg>
        )}
      </button>
    </div>
  )
}
