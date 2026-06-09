import React, { useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import TypewriterText from '../ui/TypewriterText'
import companionBot from '../../assets/career-os-robot.png'

const pageMessages = [
  {
    match: (pathname) => pathname === '/university' || pathname === '/university/overview',
    text: 'Hi Dr. Evelyn. I found 3 priority actions today: Year 3 cloud gaps, readiness support, and partner interventions.',
  },
  {
    match: (pathname) => pathname.includes('/university/curriculum'),
    text: 'The story here is market demand outrunning coverage. Cloud Deployment and MLOps need the fastest curriculum response.',
  },
  {
    match: (pathname) => pathname.includes('/university/readiness'),
    text: 'Readiness shows who needs support now. Focus Year 1 to Year 3 cohorts before the gap becomes a graduation risk.',
  },
  {
    match: (pathname) => pathname.includes('/university/signals'),
    text: 'Alumni signals back up the market data: employers value foundations but want stronger cloud, deployment, and BI evidence.',
  },
  {
    match: (pathname) => pathname.includes('/university/collaboration') || pathname.includes('/university/society-corporate-marketplace'),
    text: 'This is where gaps become action. Match partners to workshops, mentors, judges, and outcome evidence.',
  },
  {
    match: (pathname) => pathname.includes('/university/reports'),
    text: 'Package the evidence for MACS review: gaps, affected students, interventions, and partner impact in one story.',
  },
  {
    match: (pathname) => pathname.includes('/university/settings'),
    text: 'Settings is open. Click the gear again to return to the university page you came from.',
  },
  {
    match: (pathname) => pathname === '/employer' || pathname.includes('/employer/talent'),
    text: "Hi Edwin. I've highlighted student candidates matching your criteria. You can search, filter, and review verified projects or portfolios directly.",
  },
  {
    match: (pathname) => pathname.includes('/employer/posting'),
    text: 'Ready to engage? Post a new challenge, micro-project, or workshop to collaborate directly with Heriot-Watt Malaysia students.',
  },
  {
    match: (pathname) => pathname.includes('/employer/marketplace'),
    text: 'Explore campus-hosted initiatives, guest lecture opportunities, and academic events open for corporate collaboration.',
  },
  {
    match: (pathname) => pathname.includes('/employer/settings'),
    text: 'Settings is open. Click the gear again to return to the employer page you came from.',
  },
]

export default function UniversityCompanionBot() {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(true)

  const message = useMemo(() => {
    return pageMessages.find((item) => item.match(location.pathname))?.text
      ?? (location.pathname.startsWith('/employer')
          ? 'I will summarise the important signal on each employer page for the demo.'
          : 'I will summarise the important signal on each university page for the demo.')
  }, [location.pathname])

  return (
    <div className="pointer-events-none fixed bottom-7 left-7 z-40 hidden w-56 lg:block">
      {isOpen ? (
        <div className="pointer-events-auto absolute bottom-[132px] left-0 w-56 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-700 shadow-[0_18px_45px_rgba(15,23,42,0.16)]">
          <button
            type="button"
            className="absolute right-3 top-2 text-base leading-none text-slate-400 transition hover:text-slate-700"
            aria-label="Hide companion message"
            onClick={() => setIsOpen(false)}
          >
            x
          </button>
          <p className="pr-3 font-semibold text-slate-950">CareerOS Copilot</p>
          <p className="mt-1">
            <TypewriterText text={message} active={isOpen} speed={28} />
          </p>
          <span className="absolute -bottom-2 left-[58px] h-4 w-4 rotate-45 border-b border-r border-slate-200 bg-white" />
        </div>
      ) : null}

      <button
        type="button"
        aria-label={isOpen ? 'Hide CareerOS Copilot summary' : 'Show CareerOS Copilot summary'}
        className="pointer-events-auto block h-[128px] w-[116px] bg-transparent drop-shadow-[0_18px_24px_rgba(15,23,42,0.18)] transition hover:-translate-y-1 hover:drop-shadow-[0_22px_28px_rgba(37,99,235,0.22)] focus:outline-none focus:ring-4 focus:ring-blue-100"
        onClick={() => setIsOpen((value) => !value)}
      >
        <img
          src={companionBot}
          alt="CareerOS companion bot"
          className="h-full w-full object-contain"
        />
      </button>
    </div>
  )
}
