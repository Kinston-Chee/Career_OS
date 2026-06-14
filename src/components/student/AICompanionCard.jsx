import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import companionBot from '../../assets/career-os-robot.png'
import { useTypewriter } from '../ui/TypewriterText'

import { useCareerStore } from '../../store/useCareerStore'
import { candidateOverview } from '../../data/mockData'

export default function AICompanionCard() {
  const location = useLocation()
  const [isExpanded, setIsExpanded] = useState(true)
  const [scrollState, setScrollState] = useState({ canScrollUp: false, canScrollDown: false })
  const messageScrollerRef = useRef(null)

  const experiences = useCareerStore((state) => state.experiences || [])
  const myEvents = useCareerStore((state) => state.myEvents || [])
  const applications = useCareerStore((state) => state.applications || [])

  const totalSkills = useMemo(() => {
    const uniqSkills = new Set()
    experiences.forEach((exp) => {
      (exp.extractedSkills || []).forEach((s) => uniqSkills.add(s.name))
    })
    return uniqSkills.size || 26
  }, [experiences])

  const avgStrength = useMemo(() => {
    const uniqSkills = {}
    experiences.forEach((exp) => {
      (exp.extractedSkills || []).forEach((s) => {
        if (!uniqSkills[s.name] || s.credibility > uniqSkills[s.name]) {
          uniqSkills[s.name] = s.credibility
        }
      })
    })
    const values = Object.values(uniqSkills)
    if (values.length === 0) return 84
    return Math.round(values.reduce((sum, val) => sum + val, 0) / values.length)
  }, [experiences])

  const message = useMemo(() => {
    const pathname = location.pathname
    if (pathname === '/student' || pathname === '/student/overview') {
      const readiness = candidateOverview?.careerSnapshot?.readiness || 68
      return `Your career readiness is at ${readiness}%. Complete your Advanced SQL practice to unlock more high-match opportunities.`
    }
    if (pathname.includes('/student/profile') || pathname.includes('/student/memory-profile')) {
      return `You have ${experiences.length} career memories saved. Verify your pending experiences to showcase more credible skills to potential employers.`
    }
    if (pathname.includes('/student/intelligence') || pathname.includes('/student/career-intelligence')) {
      return `You have ${totalSkills} skills tracked with an average strength of ${avgStrength}%. Build model serving or deployment projects to address MLOps gaps.`
    }
    if (pathname.includes('/student/opportunities')) {
      return 'You have 4 recommended opportunities. McKinsey Forward Case Challenge closes in 2 days and aligns strongly with your Data Scientist pathway.'
    }
    if (pathname.includes('/student/applications')) {
      const totalApps = applications.length
      const interviewApp = applications.find((a) => a.stage === 'Interview')
      if (interviewApp) {
        return `You have ${totalApps} applications. Your ${interviewApp.company} interview is active. Practice mock interviews to prepare for it.`
      }
      return `You have ${totalApps} active applications. Keep updating your status history to get relevant timeline insights.`
    }
    if (pathname.includes('/student/ai-assistant')) {
      return 'Ask me anything about your career path, skill gaps, or how to prepare for upcoming applications and interviews.'
    }
    if (pathname.includes('/student/settings')) {
      return 'Update your target roles and preferences. Keep this aligned so your skill gaps and opportunity matching stay accurate.'
    }
    if (pathname.includes('/student/help')) {
      return 'Need assistance? Review our guides on verified experiences, career memory imports, and how matching scores are calculated.'
    }
    return 'Hi Chris! Need help with your next career step?'
  }, [location.pathname, experiences, myEvents, applications, totalSkills, avgStrength])

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
