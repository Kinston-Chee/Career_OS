import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import companionBot from '../../assets/career-os-robot.png'
import { useTypewriter } from '../ui/TypewriterText'

const assistantMessages = [
  {
    match: (pathname) => pathname === '/student' || pathname === '/student/overview',
    text: "Hi Chris! Your career readiness is improving. Check today's priorities to see your next best action.",
  },
  {
    match: (pathname) => pathname.includes('/student/profile') || pathname.includes('/student/memory-profile'),
    text: 'Your Career Memory keeps verified projects, skills, and experiences together for future applications.',
  },
  {
    match: (pathname) => pathname.includes('/student/intelligence') || pathname.includes('/student/career-intelligence'),
    text: 'I found skill gaps between your profile and target role. Start with the highest-impact one.',
  },
  {
    match: (pathname) => pathname.includes('/student/opportunities'),
    text: 'These opportunities match your skills and goals. Focus on the ones that close important gaps.',
  },
  {
    match: (pathname) => pathname.includes('/student/applications'),
    text: 'Keep your applications updated so I can help identify the next action for each role.',
  },
  {
    match: (pathname) => pathname.includes('/student/network'),
    text: 'The right mentor can validate your direction and help strengthen weaker skill areas.',
  },
  {
    match: (pathname) => pathname.includes('/student/learning'),
    text: 'Your learning plan should focus on skills that appear often in target-role requirements.',
  },
  {
    match: (pathname) => pathname.includes('/student/ai-assistant'),
    text: 'Ask me about your career path, skill gaps, opportunities, or evidence in your profile.',
  },
  {
    match: (pathname) => pathname.includes('/student/settings'),
    text: 'Update your career preferences here so future recommendations stay relevant.',
  },
  {
    match: (pathname) => pathname.includes('/student/help'),
    text: 'Need a hand? I can explain each workspace area and suggest where to go next.',
  },
]

export default function AICompanionCard() {
  const location = useLocation()
  const [isExpanded, setIsExpanded] = useState(true)
  const [scrollState, setScrollState] = useState({ canScrollUp: false, canScrollDown: false })
  const messageScrollerRef = useRef(null)

  const message = useMemo(() => {
    return (
      assistantMessages.find((item) => item.match(location.pathname))?.text ??
      'Hi Chris! Need help with your next career step?'
    )
  }, [location.pathname])

  const { displayedText, isTyping } = useTypewriter({
    text: message,
    speed: 28,
    active: isExpanded,
  })

  useEffect(() => {
    if (!isExpanded || !messageScrollerRef.current) return
    const scroller = messageScrollerRef.current
    scroller.scrollTop = scroller.scrollHeight
    setScrollState({
      canScrollUp: scroller.scrollTop > 0,
      canScrollDown: scroller.scrollTop + scroller.clientHeight < scroller.scrollHeight - 1,
    })
  }, [displayedText, isExpanded])

  const updateScrollState = () => {
    const scroller = messageScrollerRef.current
    if (!scroller) return
    setScrollState({
      canScrollUp: scroller.scrollTop > 0,
      canScrollDown: scroller.scrollTop + scroller.clientHeight < scroller.scrollHeight - 1,
    })
  }

  if (!isExpanded) {
    return (
      <button
        type="button"
        aria-label="Open CareerOS Assistant"
        onClick={() => setIsExpanded(true)}
        className="mt-3 flex h-[74px] w-full items-center gap-3 rounded-xl border border-violet-100 bg-white/90 px-3 text-left shadow-[0_14px_34px_rgba(88,63,188,0.1)] transition hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-[0_18px_40px_rgba(88,63,188,0.14)] focus:outline-none focus:ring-2 focus:ring-violet-200"
      >
        <img
          src={companionBot}
          alt=""
          className="h-[58px] w-[58px] shrink-0 object-contain drop-shadow-[0_10px_14px_rgba(15,23,42,0.14)]"
        />
        <span className="min-w-0">
          <span className="block text-sm font-bold text-slate-950">Ask CareerOS</span>
          <span className="block truncate text-xs font-medium text-slate-500">Career helper ready</span>
        </span>
      </button>
    )
  }

  return (
    <section className="mt-3 h-[286px] rounded-xl border border-slate-200 bg-white p-3 shadow-[0_16px_38px_rgba(15,23,42,0.1)]">
      <div className="flex h-7 items-center justify-between">
        <h2 className="text-sm font-bold text-slate-950">AI Career Companion</h2>
        <button
          type="button"
          aria-label="Minimize CareerOS Assistant"
          onClick={() => setIsExpanded(false)}
          className="flex h-6 w-6 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-200"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <div className="mt-2 flex h-[227px] min-h-0 flex-col items-center">
        <div className="relative h-[116px] w-full min-w-0 rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-[13px] font-normal leading-[19px] text-slate-700 shadow-[0_12px_28px_rgba(15,23,42,0.08)]">
          <div
            ref={messageScrollerRef}
            tabIndex={0}
            onScroll={updateScrollState}
            className="h-full overflow-y-auto break-words pr-1 [scrollbar-width:none] [-ms-overflow-style:none] focus:outline-none focus:ring-0 [&::-webkit-scrollbar]:hidden"
            aria-live="polite"
          >
            {isTyping && displayedText.length === 0 ? (
              <span className="mr-1 inline-flex items-center gap-0.5 align-middle" aria-hidden="true">
                <span className="h-1 w-1 animate-pulse rounded-full bg-slate-400" />
                <span className="h-1 w-1 animate-pulse rounded-full bg-slate-400 [animation-delay:120ms]" />
                <span className="h-1 w-1 animate-pulse rounded-full bg-slate-400 [animation-delay:240ms]" />
              </span>
            ) : null}
            <span>{displayedText}</span>
            {isTyping ? (
              <>
                <span className="sr-only">CareerOS Assistant is typing</span>
                <span aria-hidden="true" className="ml-0.5 inline-block animate-pulse text-violet-600">
                  |
                </span>
              </>
            ) : null}
          </div>
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute inset-x-3 top-2 h-4 rounded-t-xl bg-gradient-to-b from-white to-transparent transition-opacity ${
              scrollState.canScrollUp ? 'opacity-100' : 'opacity-0'
            }`}
          />
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute inset-x-3 bottom-2 h-4 rounded-b-xl bg-gradient-to-t from-white to-transparent transition-opacity ${
              scrollState.canScrollDown ? 'opacity-100' : 'opacity-0'
            }`}
          />
          <span className="absolute -bottom-2 left-[72px] h-4 w-4 rotate-45 border-b border-r border-slate-200 bg-white" />
        </div>

        <img
          src={companionBot}
          alt="CareerOS robot assistant"
          className="ml-5 mt-3 h-[108px] w-[108px] self-start object-contain drop-shadow-[0_14px_18px_rgba(15,23,42,0.16)] max-[900px]:h-[98px] max-[900px]:w-[98px]"
        />
      </div>
    </section>
  )
}
