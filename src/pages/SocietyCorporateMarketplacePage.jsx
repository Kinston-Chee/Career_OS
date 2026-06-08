import React, { useMemo, useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import AICollaborationOutreachPage from './AICollaborationOutreachPage'
import AICreateEventPage from './AICreateEventPage'
import AIPostEventCompletionPage from './AIPostEventCompletionPage'
import EventImpactReportPage from './EventImpactReportPage'
import EventImpactHistoryPage from './EventImpactHistoryPage'
import StudentSpotlightsPage from './StudentSpotlightsPage'



const filters = [

  'All Events',

  'Open for Partners',

  'Needs Judge',

  'Needs Sponsor',

  'Needs Mentor',

  'Needs Technical Partner',

]



const detailTabs = ['Overview', 'Current Collaborators', 'Interested', 'Event Details']

const externalDetailTabs = ['Event Details', 'Support Opportunity']



const defaultTargetSkills = ['AI/ML', 'Data Analysis', 'Communication', 'Problem Solving']

const defaultCollaborators = [

  {

    name: 'Grab Malaysia',

    logo: 'Gr',

    role: 'Mentorship Partner',

    committedDate: '10 Jun 2026',

    status: 'Confirmed',

    email: 'partnerships.my@grab.com',

    phone: '+60 12-345 6789',

    tags: ['Mentorship', 'Analytics Workshop', 'Industry Sharing Session'],

    details: ['Deliver 1 analytics workshop', 'Provide mentors for 2 sessions', 'Aug - Sep 2026'],

    benefits: ['Access to AI & analytics talent', 'Brand visibility on event materials', 'Early recruitment access'],

    contact: { initials: 'JL', name: 'Jason Lim', title: 'Partnerships Lead' },

  },

  {

    name: 'Maybank',

    logo: 'Mb',

    role: 'Cash Prize Sponsor',

    committedDate: '8 Jun 2026',

    status: 'Confirmed',

    email: 'partnerships@maybank.com',

    phone: '+60 3-2078 8888',

    tags: ['Cash Prize Sponsorship', 'Judging Panel', 'Certificates'],

    details: ['RM10,000 cash prize', 'Provide judges for final round', '15 - 17 Sep 2026'],

    benefits: ['Brand presence at national-level event', 'Engage high-potential finance talent', 'Opportunity to recruit top performers'],

    contact: { initials: 'SM', name: 'Sarah Malik', title: 'Head, Talent Acquisition' },

  },

]

const defaultInterestedCompanies = [

  {

    name: 'Deloitte Malaysia',

    logo: 'De',

    tags: ['Case Study Provider', 'Certificates'],

    message: 'Looking to support case study development and provide digital certificates for participants.',

    submittedDate: '10 Jun 2026',

    contact: 'Adrian Lee',

    email: 'adrian.lee@deloitte.com',

    score: 88,

    status: 'New',

  },

  {

    name: 'PwC Malaysia',

    logo: 'Pw',

    tags: ['Judging', 'Workshop'],

    message: 'Interested in judging the final round and conducting a financial analysis workshop.',

    submittedDate: '9 Jun 2026',

    contact: 'Nurul Afiqah',

    email: 'nurul.afiqah@pwc.com',

    score: 84,

    status: 'Reviewing',

  },

  {

    name: 'EY Malaysia',

    logo: 'EY',

    tags: ['Mentorship', 'Career Talk'],

    message: 'Would like to mentor teams and share insights on finance careers in AI era.',

    submittedDate: '9 Jun 2026',

    contact: 'Sarah Tan',

    email: 'sarah.tan@ey.com',

    score: 78,

    status: 'Shortlisted',

  },

  {

    name: 'Shopee Malaysia',

    logo: 'Sh',

    tags: ['Sponsor', 'Career Booth'],

    message: 'Exploring sponsorship opportunities and participation in career engagement.',

    submittedDate: '8 Jun 2026',

    contact: 'Kevin Wong',

    email: 'kevin.wong@shopee.com',

    score: 72,

    status: 'Pending Discussion',

  },

  {

    name: 'Microsoft Malaysia',

    logo: 'Ms',

    tags: ['Technical Workshop', 'Mentorship'],

    message: 'Interested in a technical workshop on AI tools and student mentorship.',

    submittedDate: '7 Jun 2026',

    contact: 'Lim Wei Chen',

    email: 'wei.chen@microsoft.com',

    score: 70,

    status: 'Reviewing',

  },

]

const defaultExpressedInterest = [

  { name: 'Shopee', logo: 'Sh', tags: ['Sponsor', 'Career Booth'] },

  { name: 'Microsoft Malaysia', logo: 'Ms', tags: ['Technical Workshop', 'Mentorship'] },

  { name: 'TikTok Malaysia', logo: 'Tk', tags: ['Brand Partner', 'Judging'] },

]



const events = [

  {

    id: 'ai-finance-case',

    title: 'AI in Finance Case Competition',

    club: 'FinTech Society',

    date: '15 July 2026',

    participants: '120+ students',

    level: 'National Level',

    location: 'On Campus',

    status: 'Open for Partners',
    hostedByUs: true,

    initials: 'FS',

    accent: 'from-blue-600 via-indigo-600 to-violet-600',

    lookingFor: ['Judge', 'Sponsor', 'Mentor'],

    benefits: ['Talent Pipeline', 'Brand Visibility', 'Campus Exposure', 'Recruitment Access'],

    interestedCount: 3,

    companies: ['G', 'D', 'M'],

    targetSkills: ['AI/ML', 'Finance', 'Data Analysis', 'Problem Solving', 'Presentation', 'Strategy'],

    readiness: '65%',

    categoriesNeeded: 3,

    collaborators: defaultCollaborators,

    interestedCompanies: defaultInterestedCompanies,

    expressedInterest: defaultExpressedInterest,

    summary:

      'A national-level case competition where student teams solve real-world AI in finance challenges and present strategic solutions to an industry panel.',

  },

  {

    id: 'data-storytelling',

    title: 'Data Storytelling Workshop',

    club: 'Analytics Club',

    date: '22 July 2026',

    participants: '80 students',

    level: 'Workshop',

    location: 'On Campus',

    status: 'Needs Speaker',
    hostedByUs: false,

    initials: 'AC',

    accent: 'from-slate-800 via-blue-700 to-indigo-700',

    lookingFor: ['Speaker', 'Mentor'],

    benefits: ['Thought Leadership', 'Student Engagement', 'Brand Visibility'],

    interestedCount: 5,

    companies: ['A', 'S', 'P'],

    targetSkills: ['Data Storytelling', 'Power BI', 'Presentation', 'Insight Writing'],

    readiness: '58%',

    categoriesNeeded: 2,

    collaborators: defaultCollaborators.slice(0, 1),

    interestedCompanies: defaultInterestedCompanies,

    expressedInterest: defaultExpressedInterest.slice(0, 2),

    summary:

      'A hands-on workshop helping students turn analysis into executive narratives, dashboards, and insight-led presentations.',

  },

  {

    id: 'product-sprint',

    title: 'Campus Product Sprint',

    club: 'Innovation Hub',

    date: '5 August 2026',

    participants: '80-120 students',

    level: 'Sprint',

    location: 'On Campus',

    status: 'Needs Technical Partner',
    hostedByUs: false,

    initials: 'IH',

    accent: 'from-violet-700 via-blue-700 to-cyan-500',

    lookingFor: ['Technical Partner'],

    benefits: ['Product Exposure', 'Talent Discovery', 'Innovation Showcase'],

    interestedCount: 4,

    companies: ['G', 'M', 'T'],

    targetSkills: ['Product Thinking', 'Prototyping', 'User Research', 'Pitching'],

    readiness: '61%',

    categoriesNeeded: 2,

    collaborators: defaultCollaborators,

    interestedCompanies: defaultInterestedCompanies.slice(0, 2),

    expressedInterest: defaultExpressedInterest,

    summary:

      'A product sprint where students prototype campus and industry solutions with support from product and engineering mentors.',

  },

  {

    id: 'marketing-conclave',

    title: 'Marketing Conclave 2026',

    club: 'Marketing Club',

    date: '18 August 2026',

    participants: '100+ students',

    level: 'National Level',

    location: 'Hybrid',

    status: 'Open for Partners',
    hostedByUs: true,

    initials: 'MC',

    accent: 'from-emerald-600 via-teal-600 to-cyan-500',

    lookingFor: ['Speaker', 'Sponsor', 'Prizes'],

    benefits: ['Brand Visibility', 'Networking', 'Recruitment Access'],

    interestedCount: 2,

    companies: ['C', 'M'],

    targetSkills: ['Marketing Analytics', 'Brand Strategy', 'Communication', 'Research'],

    readiness: '69%',

    categoriesNeeded: 3,

    collaborators: defaultCollaborators.slice(0, 1),

    interestedCompanies: defaultInterestedCompanies,

    expressedInterest: defaultExpressedInterest.slice(0, 2),

    summary:

      'A student-led marketing conference with talks, mini challenges, and networking sessions around brand, growth, and analytics.',

  },

  {

    id: 'ml-hackathon',

    title: 'Machine Learning Hackathon',

    club: 'AI Club',

    date: '29 August 2026',

    participants: '120-180 students',

    level: 'Hackathon',

    location: 'On Campus',

    status: 'Needs Technical Partner',
    hostedByUs: true,

    initials: 'AI',

    accent: 'from-blue-800 via-indigo-700 to-sky-500',

    lookingFor: ['Technical Partner', 'Prizes'],

    benefits: ['Talent Pipeline', 'Tech Engagement', 'Brand Visibility'],

    interestedCount: 6,

    companies: ['G', 'C', 'A'],

    targetSkills: ['Machine Learning', 'Cloud Deployment', 'MLOps', 'Team Delivery'],

    readiness: '54%',

    categoriesNeeded: 2,

    collaborators: defaultCollaborators,

    interestedCompanies: defaultInterestedCompanies,

    expressedInterest: defaultExpressedInterest,

    summary:

      'A weekend build event focused on applied machine learning, deployment basics, and industry-backed problem statements.',

  },

  {

    id: 'women-tech-mentorship',

    title: 'Women in Tech Mentorship Series',

    club: 'Women Technicians Club',

    date: '12 September 2026',

    participants: '50-80 students',

    level: 'Mentorship',

    location: 'Online',

    status: 'Needs Mentor',
    hostedByUs: false,

    initials: 'WT',

    accent: 'from-rose-500 via-orange-400 to-amber-300',

    lookingFor: ['Mentor'],

    benefits: ['CSR Impact', 'Talent Development', 'Community Building'],

    interestedCount: 3,

    companies: ['D', 'N', 'I'],

    targetSkills: ['Career Confidence', 'Technical Interviewing', 'Communication', 'Leadership'],

    readiness: '72%',

    categoriesNeeded: 1,

    collaborators: defaultCollaborators.slice(0, 1),

    interestedCompanies: defaultInterestedCompanies.slice(0, 2),

    expressedInterest: defaultExpressedInterest,

    summary:

      'A mentorship series connecting students with industry practitioners for confidence, career paths, and technical growth.',

  },

]



const statusStyles = {

  'Open for Partners': 'border-emerald-200 bg-emerald-50 text-emerald-700',

  'Needs Speaker': 'border-orange-200 bg-orange-50 text-orange-700',

  'Needs Technical Partner': 'border-violet-200 bg-violet-50 text-violet-700',

  'Needs Mentor': 'border-rose-200 bg-rose-50 text-rose-700',

}



const tagStyles = {

  Judge: 'bg-blue-50 text-blue-700',

  Sponsor: 'bg-emerald-50 text-emerald-700',

  Mentor: 'bg-violet-50 text-violet-700',

  Speaker: 'bg-indigo-50 text-indigo-700',

  'Technical Partner': 'bg-purple-50 text-purple-700',

  Prizes: 'bg-amber-50 text-amber-700',

}



function EventStatusBadge({ status }) {

  return (

    <span className={`rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide ${statusStyles[status]}`}>

      {status}

    </span>

  )

}



function PartnerBenefitTag({ children }) {

  return (

    <span className="inline-flex items-center gap-1 rounded-lg bg-slate-50 px-2 py-1 text-[11px] font-semibold text-slate-600">

      <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />

      {children}

    </span>

  )

}



function CompanyAvatarStack({ companies }) {

  return (

    <div className="flex items-center">

      {companies.map((company, index) => (

        <span

          key={`${company}-${index}`}

          className="-ml-1.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-blue-50 to-violet-100 text-[10px] font-medium text-blue-700 first:ml-0"

        >

          {company}

        </span>

      ))}

      <span className="-ml-1.5 flex h-6 min-w-6 items-center justify-center rounded-full border-2 border-white bg-slate-100 px-1.5 text-[10px] font-medium text-slate-500">

        +2

      </span>

    </div>

  )

}



function FilterChips({ activeFilter, onChange }) {

  return (

    <div className="flex min-w-0 flex-wrap items-center gap-2">

      {filters.map((filter) => {

        const active = activeFilter === filter

        return (

          <button

            key={filter}

            type="button"

            onClick={() => onChange(filter)}

            className={`rounded-lg border px-3.5 py-2 text-xs font-medium transition ${

              active

                ? 'border-blue-600 bg-blue-600 text-white shadow-[0_10px_24px_rgba(37,99,235,0.18)]'

                : 'border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:text-blue-700'

            }`}

          >

            {filter}

          </button>

        )

      })}

    </div>

  )

}



function EventBanner({ event }) {

  return (

    <div className={`relative h-32 overflow-hidden rounded-t-2xl bg-gradient-to-br ${event.accent} p-4 text-white`}>

      <div className="absolute -right-8 -top-10 h-28 w-28 rounded-full bg-white/15" />

      <div className="absolute bottom-4 right-5 h-14 w-20 rounded-2xl border border-white/20 bg-white/10" />

      <div className="absolute bottom-8 right-9 h-16 w-1.5 rounded-full bg-white/40" />

      <div className="absolute bottom-8 right-14 h-10 w-1.5 rounded-full bg-white/30" />

      <div className="absolute bottom-8 right-20 h-7 w-1.5 rounded-full bg-white/25" />

      <EventStatusBadge status={event.status} />

      <p className="mt-6 max-w-[13rem] text-xl font-semibold uppercase leading-6 tracking-wide">{event.title}</p>

    </div>

  )

}



function EventCard({ event, onViewDetails }) {
  const isOwnedEvent = event.hostedByUs

  return (

    <article className="group flex h-full min-h-[470px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md">

      <div className="relative">

        <EventBanner event={event} />

        <button

          type="button"

          aria-label={`Bookmark ${event.title}`}

          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg border border-white/25 bg-white/10 text-sm font-medium text-white backdrop-blur transition hover:bg-white/20"

        >

          <span className="h-4 w-3 rounded-sm border-2 border-white border-b-white/40" />

        </button>

      </div>



      <div className="flex flex-1 flex-col space-y-4 p-4">

        <div className="flex items-start gap-3">

          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-violet-600 text-xs font-semibold text-white shadow-sm">

            {event.initials}

          </span>

          <div className="min-w-0 flex-1">

            <div className="flex min-w-0 flex-wrap items-center gap-2">

              <h3 className="min-w-0 truncate text-base font-semibold text-slate-900">{event.title}</h3>

              <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${
                isOwnedEvent ? 'bg-blue-50 text-blue-700' : 'bg-violet-50 text-violet-700'
              }`}>

                {isOwnedEvent ? 'Hosted by us' : 'External university'}

              </span>

            </div>

            <p className="mt-1 text-xs font-medium text-slate-500">{event.club}</p>

          </div>

        </div>



        <div className="grid grid-cols-2 gap-2 text-[11px] font-medium text-slate-500">

          <span>{event.date}</span>

          <span>{event.participants}</span>

          <span>{event.level}</span>

          <span>{event.location}</span>

        </div>



        <div>

          <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">Looking For</p>

          <div className="mt-2 flex flex-wrap gap-1.5">

            {event.lookingFor.map((need) => (

              <span key={need} className={`rounded-lg px-2 py-1 text-[10px] font-medium ${tagStyles[need] || 'bg-slate-50 text-slate-600'}`}>

                {need}

              </span>

            ))}

          </div>

        </div>



        <div>

          <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">Partner Benefits</p>

          <div className="mt-2 flex max-h-[58px] flex-wrap gap-1.5 overflow-hidden">

            {event.benefits.slice(0, 4).map((benefit) => (

              <PartnerBenefitTag key={benefit}>{benefit}</PartnerBenefitTag>

            ))}

          </div>

        </div>



        <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-100 pt-3">

          <div>

            <p className="text-[11px] font-medium text-slate-700">{event.interestedCount} companies interested</p>

            <div className="mt-1">

              <CompanyAvatarStack companies={event.companies} />

            </div>

          </div>

          <button

            type="button"

            onClick={() => onViewDetails(event)}

            className={`shrink-0 rounded-lg border px-3 py-2 text-xs font-medium transition ${
              isOwnedEvent
                ? 'border-blue-200 bg-blue-50 text-blue-700 hover:border-blue-300 hover:bg-blue-100'
                : 'border-violet-200 bg-violet-600 text-white hover:bg-violet-700'
            }`}

          >

            {isOwnedEvent ? 'Manage Interest' : 'Express Interest'}

          </button>

        </div>

      </div>

    </article>

  )

}



function DetailHeroArt({ event }) {

  return (

    <div className={`relative h-40 w-full overflow-hidden rounded-xl bg-gradient-to-br ${event.accent} p-5 text-white shadow-sm`}>

      <div className="absolute right-4 top-4 flex h-8 w-7 items-center justify-center rounded-lg bg-white/20">

        <span className="h-4 w-3 rounded-sm border-2 border-white border-b-white/40" />

      </div>

      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/15" />

      <div className="absolute bottom-8 left-8 h-20 w-3 rounded-t-lg bg-white/80" />

      <div className="absolute bottom-8 left-16 h-28 w-3 rounded-t-lg bg-white/70" />

      <div className="absolute bottom-8 left-24 h-16 w-3 rounded-t-lg bg-white/60" />

      <div className="absolute bottom-8 left-32 h-24 w-3 rounded-t-lg bg-white/75" />

      <div className="absolute bottom-8 left-8 h-0.5 w-40 bg-white/70" />

      <div className="absolute bottom-16 left-8 h-10 w-36 rounded-t-full border-l-4 border-t-4 border-white/70" />

    </div>

  )

}



function DetailMetric({ label, value, icon }) {

  return (

    <div className="flex min-w-0 items-center gap-3 border-slate-200 py-2 md:border-r md:last:border-r-0">

      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-sm font-semibold text-blue-700">{icon}</span>

      <div>

        <p className="text-xl font-semibold leading-none text-slate-950">{value}</p>

        <p className="mt-1 text-xs font-semibold text-slate-500">{label}</p>

      </div>

    </div>

  )

}



function SoftTag({ children, tone = 'blue' }) {

  const tones = {

    blue: 'bg-blue-50 text-blue-700',

    green: 'bg-emerald-50 text-emerald-700',

    purple: 'bg-violet-50 text-violet-700',

    slate: 'bg-slate-100 text-slate-600',

  }

  return <span className={`rounded-lg px-2.5 py-1 text-[11px] font-medium ${tones[tone] || tones.blue}`}>{children}</span>

}



function ValueCard({ icon, title, body, tone }) {

  const tones = {

    purple: 'bg-violet-50 text-violet-700',

    green: 'bg-emerald-50 text-emerald-700',

    orange: 'bg-orange-50 text-orange-700',

    blue: 'bg-blue-50 text-blue-700',

  }

  return (

    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">

      <span className={`flex h-10 w-10 items-center justify-center rounded-xl text-base font-semibold ${tones[tone]}`}>

        {icon}

      </span>

      <h4 className="mt-4 text-sm font-semibold text-slate-950">{title}</h4>

      <p className="mt-2 text-xs font-semibold leading-5 text-slate-600">{body}</p>

    </article>

  )

}



function OrganizationRow({ item, caption = 'Interested in:' }) {

  return (

    <div className="flex min-w-0 items-center gap-3 border-b border-slate-100 py-3 last:border-b-0">

      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-slate-950 to-blue-700 text-[11px] font-semibold text-white">

        {item.logo}

      </span>

      <div className="min-w-0 flex-1">

        <p className="truncate text-sm font-semibold text-slate-950">{item.name}</p>

      </div>

      <div className="hidden min-w-0 flex-1 items-center gap-2 sm:flex">

        <span className="text-[10px] font-medium text-slate-400">{caption}</span>

        <div className="flex flex-wrap gap-1.5">

          {item.tags.map((tag) => (

            <SoftTag key={tag} tone="purple">{tag}</SoftTag>

          ))}

        </div>

      </div>

    </div>

  )

}



function SideListCard({ title, count, children }) {

  return (

    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">

      <div className="mb-2 flex items-center justify-between gap-3">

        <h3 className="text-base font-semibold text-slate-950">{title} ({count})</h3>

        <button type="button" className="text-xs font-semibold text-blue-700">View All</button>

      </div>

      {children}

    </section>

  )

}



function IconButton({ label, children }) {

  return (

    <button

      type="button"

      aria-label={label}

      className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"

    >

      {children}

    </button>

  )

}



function CollaboratorCard({ collaborator }) {

  return (

    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      <header className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex min-w-0 items-center gap-4">

          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-blue-600 text-sm font-semibold text-white shadow-sm">

            {collaborator.logo}

          </span>

          <div className="min-w-0">

            <div className="flex flex-wrap items-center gap-2">

              <h3 className="text-base font-semibold text-slate-800">{collaborator.name}</h3>

              <SoftTag tone={collaborator.role.includes('Sponsor') ? 'slate' : 'green'}>{collaborator.role}</SoftTag>

            </div>

            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium text-slate-500">

              <span>Committed on {collaborator.committedDate}</span>

              <span className="hidden h-3 w-px bg-slate-200 sm:inline-block" />

              <span>{collaborator.email}</span>

              <span className="hidden h-3 w-px bg-slate-200 sm:inline-block" />

              <span>{collaborator.phone}</span>

            </div>

          </div>

        </div>



        <div className="flex shrink-0 items-center gap-2">

          <span className="inline-flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">

            <span className="h-2 w-2 rounded-full bg-emerald-500" />

            {collaborator.status}

          </span>

          <button type="button" aria-label={`More actions for ${collaborator.name}`} className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-lg font-medium leading-none text-slate-500">

            ...

          </button>

        </div>

      </header>



      <div className="grid gap-0 px-5 py-4 md:grid-cols-2 xl:grid-cols-4">

        <section className="min-w-0 border-slate-100 py-2 pr-4 xl:border-r">

          <h4 className="text-sm font-medium text-slate-700">Agreed Contributions</h4>

          <div className="mt-3 flex max-h-16 flex-wrap gap-2 overflow-hidden">

            {collaborator.tags.map((tag) => (

              <SoftTag key={tag} tone="purple">{tag}</SoftTag>

            ))}

          </div>



        </section>



        <section className="min-w-0 border-t border-slate-100 py-2 pr-4 md:border-t-0 xl:border-r xl:pl-5">

          <h4 className="text-sm font-medium text-slate-700">Commitment Details</h4>

          <ul className="mt-3 space-y-2">

            {collaborator.details.map((detail) => (

              <li key={detail} className="flex items-start gap-2 text-xs font-medium leading-5 text-slate-600">

                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />

                {detail}

              </li>

            ))}

          </ul>

        </section>



        <section className="min-w-0 border-t border-slate-100 py-2 pr-4 md:mt-4 xl:mt-0 xl:border-r xl:border-t-0 xl:pl-5">

          <h4 className="text-sm font-medium text-slate-700">Benefits for {collaborator.name}</h4>

          <div className="mt-3 space-y-2.5">

            {collaborator.benefits.map((benefit) => (

              <div key={benefit} className="flex items-start gap-2 text-xs font-medium leading-5 text-slate-600">

                <span className="mt-0.5 text-sm font-semibold text-emerald-600">✓</span>

                {benefit}

              </div>

            ))}

          </div>

        </section>



        <section className="min-w-0 border-t border-slate-100 py-2 md:mt-4 md:pl-5 xl:mt-0 xl:border-t-0">

          <h4 className="text-sm font-medium text-slate-700">Contact Persons</h4>

          <div className="mt-3 flex items-center justify-between gap-3">

            <div className="flex min-w-0 items-center gap-3">

              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs font-semibold text-violet-700">

                {collaborator.contact.initials}

              </span>

              <div className="min-w-0">

                <p className="truncate text-sm font-semibold text-slate-800">{collaborator.contact.name}</p>

                <p className="truncate text-xs font-medium text-slate-500">{collaborator.contact.title}</p>

              </div>

            </div>

            <div className="flex shrink-0 items-center gap-2">

              <IconButton label={`Email ${collaborator.contact.name}`}>E</IconButton>

              <IconButton label={`Call ${collaborator.contact.name}`}>P</IconButton>

            </div>

          </div>

        </section>

      </div>

    </article>

  )

}



function SummaryMetric({ icon, value, label }) {

  return (

    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">

      <div className="flex items-center gap-3">

        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-sm font-semibold text-blue-700">{icon}</span>

        <div>

          <p className="text-xl font-semibold leading-none text-slate-950">{value}</p>

          <p className="mt-1 text-xs font-semibold text-slate-500">{label}</p>

        </div>

      </div>

    </div>

  )

}



function CurrentCollaboratorsWorkspace({ event }) {

  return (

    <section className="space-y-5">

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

        <div>

          <h2 className="text-2xl font-semibold text-slate-950">Current Collaborators ({event.collaborators.length})</h2>

          <p className="mt-1 text-sm font-semibold text-slate-500">Organizations confirmed as partners for this event.</p>

        </div>

        <button type="button" className="w-fit rounded-xl border border-violet-200 bg-white px-4 py-2.5 text-sm font-semibold text-violet-700 shadow-sm">

          Manage Collaborators

        </button>

      </div>



      <div className="space-y-4">

        {event.collaborators.map((collaborator) => (

          <CollaboratorCard key={collaborator.name} collaborator={collaborator} />

        ))}

      </div>



      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">

        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <h3 className="text-base font-semibold text-slate-950">Overall Collaboration Summary</h3>

            <p className="mt-1 text-xs font-semibold text-slate-500">Confirmed partner commitments and next coordination step.</p>

          </div>

          <button type="button" className="w-fit rounded-xl border border-violet-200 bg-white px-4 py-2.5 text-sm font-semibold text-violet-700">

            View Timeline

          </button>

        </div>



        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">

          <SummaryMetric icon="P" value={event.collaborators.length} label="Confirmed Partners" />

          <SummaryMetric icon="V" value="RM10,000" label="Total Sponsored Value" />

          <SummaryMetric icon="A" value="5+" label="Activities Committed" />

          <SummaryMetric icon="S" value="120+" label="Students Impacted" />

          <div className="rounded-xl border border-violet-100 bg-violet-50/60 p-4">

            <p className="text-xs font-semibold text-slate-950">Next Milestone</p>

            <p className="mt-2 text-sm font-semibold leading-5 text-slate-700">Finalize event run sheet with all partners</p>

            <span className="mt-3 inline-flex rounded-lg bg-white px-2.5 py-1 text-[11px] font-semibold text-violet-700">By 1 Aug 2026</span>

          </div>

        </div>

      </section>

    </section>

  )

}



const interestedStatusClasses = {

  New: 'bg-blue-50 text-blue-700 ring-blue-100',

  Reviewing: 'bg-violet-50 text-violet-700 ring-violet-100',

  Shortlisted: 'bg-emerald-50 text-emerald-700 ring-emerald-100',

  'Pending Discussion': 'bg-amber-50 text-amber-700 ring-amber-100',

}



function FitScore({ score }) {

  const tone = score >= 80 ? 'bg-emerald-500' : score >= 70 ? 'bg-blue-500' : 'bg-amber-500'

  return (

    <div className="min-w-[120px]">

      <div className="flex items-baseline justify-between gap-2">

        <span className="text-lg font-semibold text-slate-800">{score}%</span>

        <span className="text-xs font-medium text-slate-500">Fit Score</span>

      </div>

      <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-slate-100">

        <span className={`block h-full rounded-full ${tone}`} style={{ width: `${score}%` }} />

      </span>

    </div>

  )

}



function InterestedOrganizationRow({ company }) {

  return (

    <article className="grid gap-4 border-b border-slate-100 px-4 py-4 last:border-b-0 lg:grid-cols-[minmax(0,1fr)_140px_150px] lg:items-center">

      <div className="flex min-w-0 gap-4">

        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-slate-900 to-blue-700 text-xs font-semibold text-white shadow-sm">

          {company.logo}

        </span>

        <div className="min-w-0">

          <div className="flex flex-wrap items-center gap-2">

            <h3 className="text-base font-semibold text-slate-800">{company.name}</h3>

            <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ring-1 ${interestedStatusClasses[company.status]}`}>

              {company.status}

            </span>

          </div>

          <div className="mt-2 flex flex-wrap items-center gap-2">

            <span className="text-xs font-medium text-slate-400">Interested in:</span>

            {company.tags.map((tag) => (

              <SoftTag key={tag} tone="purple">{tag}</SoftTag>

            ))}

          </div>

          <p className="mt-2 text-sm font-medium leading-5 text-slate-600">{company.message}</p>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium text-slate-500">

            <span>Submitted on {company.submittedDate}</span>

            <span>Contact: {company.contact}</span>

            <span>{company.email}</span>

          </div>

        </div>

      </div>



      <FitScore score={company.score} />



      <div className="flex items-center justify-start gap-2 lg:justify-end">

        <button type="button" className="rounded-xl border border-violet-200 bg-white px-4 py-2.5 text-sm font-semibold text-violet-700 transition hover:bg-violet-50">

          View Details

        </button>

        <button type="button" aria-label={`More actions for ${company.name}`} className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-lg font-medium leading-none text-slate-500">

          ...

        </button>

      </div>

    </article>

  )

}



function InterestSummaryCard({ label, value, sublabel, tone = 'blue' }) {

  const tones = {

    blue: 'bg-blue-50 text-blue-700',

    green: 'bg-emerald-50 text-emerald-700',

    amber: 'bg-amber-50 text-amber-700',

    violet: 'bg-violet-50 text-violet-700',

  }

  return (

    <div className="flex items-center gap-3 rounded-xl bg-white p-3 ring-1 ring-slate-100">

      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-semibold ${tones[tone]}`}>{value}</span>

      <div>

        <p className="text-sm font-medium text-slate-700">{label}</p>

        <p className="mt-0.5 text-xs font-medium text-slate-500">{sublabel}</p>

      </div>

    </div>

  )

}



function InterestedWorkspace({ event }) {

  const interested = event.interestedCompanies

  const highMatch = interested.filter((company) => company.score >= 80).length

  const mediumMatch = interested.filter((company) => company.score >= 60 && company.score < 80).length

  const averageScore = Math.round(interested.reduce((total, company) => total + company.score, 0) / interested.length)



  return (

    <section className="grid gap-5 lg:grid-cols-12">

      <main className="min-w-0 space-y-4 lg:col-span-8">

        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

          <div>

            <h2 className="text-2xl font-semibold text-slate-900">Interested Organizations ({interested.length})</h2>

            <p className="mt-1 text-sm font-medium text-slate-500">Organizations that have shown interest in collaborating with your event.</p>

          </div>

          <div className="flex flex-wrap gap-2">

            <button type="button" className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm">Filter</button>

            <button type="button" className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm">Sort: Most Relevant</button>

          </div>

        </div>



        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {interested.map((company) => (

            <InterestedOrganizationRow key={company.name} company={company} />

          ))}

        </section>

        <p className="text-sm font-medium text-slate-500">Showing 1-{interested.length} of {interested.length} organizations</p>

      </main>



      <aside className="min-w-0 space-y-4 lg:col-span-4">

        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

          <h3 className="text-base font-medium text-slate-800">Interest Summary</h3>

          <div className="mt-4 space-y-3">

            <InterestSummaryCard label="Total Interested" value={interested.length} sublabel="Organizations" tone="blue" />

            <InterestSummaryCard label="High Match (80%+)" value={highMatch} sublabel="Organizations" tone="green" />

            <InterestSummaryCard label="Medium Match (60-79%)" value={mediumMatch} sublabel="Organizations" tone="amber" />

            <InterestSummaryCard label="Avg. Match Score" value={`${averageScore}%`} sublabel="Across interested partners" tone="violet" />

          </div>

        </section>



        <section className="rounded-2xl border border-violet-100 bg-violet-50/50 p-4 shadow-sm">

          <h3 className="text-base font-medium text-slate-800">What happens next?</h3>

          <div className="mt-4 space-y-4">

            {[

              ['Review organization details', 'Check their proposed contributions and fit for your event.'],

              ['Start conversation', 'Message or schedule a call to discuss collaboration.'],

              ['Move to Expressed Interest / Confirmed Collaborator', 'Once both sides agree, move them into the right partner stage.'],

            ].map(([title, body]) => (

              <div key={title} className="flex gap-3">

                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-xs font-semibold text-violet-700 ring-1 ring-violet-100">✓</span>

                <div>

                  <p className="text-sm font-medium text-slate-800">{title}</p>

                  <p className="mt-1 text-xs font-medium leading-5 text-slate-600">{body}</p>

                </div>

              </div>

            ))}

          </div>

        </section>



        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

          <h3 className="text-base font-medium text-slate-800">AI Match Assistant</h3>

          <p className="mt-2 text-sm font-medium leading-6 text-slate-600">

            Let AI rank interested organizations based on event needs, contribution fit, and expected student impact.

          </p>

          <button type="button" className="mt-4 w-full rounded-xl border border-violet-200 bg-violet-50 px-4 py-3 text-sm font-semibold text-violet-700 transition hover:bg-violet-100">

            Get AI Recommendations

          </button>

        </section>

      </aside>

    </section>

  )

}



// SVGs for Event Details Workspace

function FileTextIcon() {

  return (

    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">

      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />

    </svg>

  )

}



function BuildingIcon() {

  return (

    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">

      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />

    </svg>

  )

}



function ClipboardIcon() {

  return (

    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">

      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />

    </svg>

  )

}



function FlagIcon() {

  return (

    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">

      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />

    </svg>

  )

}



function GlobeIcon() {

  return (

    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">

      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9h18" />

    </svg>

  )

}



function MapPinIcon() {

  return (

    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">

      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />

      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />

    </svg>

  )

}



function CalendarIcon() {

  return (

    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">

      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />

    </svg>

  )

}



function ClockIcon() {

  return (

    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">

      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />

    </svg>

  )

}



function UsersIcon() {

  return (

    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">

      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />

    </svg>

  )

}



function MailIcon() {

  return (

    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">

      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />

    </svg>

  )

}



function PhoneIcon() {

  return (

    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">

      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />

    </svg>

  )

}



function EventDetailsWorkspace({ event, shownSkills }) {

  const eventFields = [

    { label: 'Event Name', value: event.title, important: true, icon: <FileTextIcon /> },

    { label: 'Organized By', value: `${event.club}, Sunway University`, important: true, icon: <BuildingIcon /> },

    { label: 'Event Type', value: event.level === 'Workshop' ? 'Workshop' : event.level === 'Hackathon' ? 'Hackathon' : 'Case Competition', important: true, icon: <ClipboardIcon /> },

    { label: 'Level', value: event.level, important: false, icon: <FlagIcon /> },

    { label: 'Format', value: event.location === 'Online' ? 'Online' : 'Offline (On Campus)', important: false, icon: <GlobeIcon /> },

    { label: 'Venue', value: event.location === 'Online' ? 'Zoom / Microsoft Teams' : 'Sunway University Campus', important: true, icon: <MapPinIcon /> },

    { label: 'Date', value: `${event.date} (Preliminary - Grand Final)`, important: true, icon: <CalendarIcon /> },

    { label: 'Registration Deadline', value: event.date.includes('July') ? '30 June 2026' : event.date.includes('August') ? '15 July 2026' : '1 August 2026', important: true, icon: <ClockIcon /> },

    { label: 'Organizing Team', value: `${event.club} Committee`, important: false, icon: <UsersIcon /> },

    { label: 'Contact Email', value: `${event.club.toLowerCase().replace(/\s+/g, '')}@sunway.edu.my`, important: false, icon: <MailIcon /> },

    { label: 'Contact Phone', value: '+60 12-345 6789', important: false, icon: <PhoneIcon /> },

  ]



  const milestones = event.id === 'ai-finance-case' ? [

    { title: 'Registration Opens', date: '15 May 2026', status: 'completed' },

    { title: 'Registration Deadline', date: '30 June 2026', status: 'completed' },

    { title: 'Preliminary Round', date: '15 - 20 July 2026', status: 'upcoming' },

    { title: 'Semi-Final', date: '10 August 2026', status: 'scheduled' },

    { title: 'Final Round & Award Ceremony', date: '28 September 2026', status: 'scheduled' }

  ] : [

    { title: 'Registration Opens', date: '1 June 2026', status: 'completed' },

    { title: 'Registration Deadline', date: '30 June 2026', status: 'upcoming' },

    { title: 'Event Kickoff', date: event.date, status: 'scheduled' },

    { title: 'Evaluation Phase', date: '5 Days After Kickoff', status: 'scheduled' },

    { title: 'Winner Announcement', date: '10 Days After Kickoff', status: 'scheduled' }

  ]



  const expectations = [

    'Industry professionals to judge & evaluate teams',

    'Sponsors to support prizes, certificates & event execution',

    'Mentors to provide feedback and career guidance',

    'Technical partners to provide tools or platforms'

  ]



  const metrics = [

    { value: event.participants.replace(' students', ''), label: 'Expected Participants', icon: '👥', color: 'bg-indigo-50/60 text-indigo-600' },

    { value: event.id === 'ai-finance-case' ? '20+' : '10+', label: 'Universities', icon: '🏢', color: 'bg-emerald-50/60 text-emerald-600' },

    { value: event.id === 'ai-finance-case' ? '48+' : '30+', label: 'Skills Developed', icon: '⚡', color: 'bg-amber-50/60 text-amber-600' },

    { value: 'High', label: 'Industry Relevance', icon: '📈', color: 'bg-rose-50/60 text-rose-600' }

  ]



  const categoryDetails = {

    Judge: { desc: 'Expert evaluation for final round', icon: '⚖️', color: 'bg-blue-50 text-blue-700 font-medium' },

    Sponsor: { desc: 'Cash prizes / funding support', icon: '💰', color: 'bg-emerald-50 text-emerald-700 font-medium' },

    Mentor: { desc: 'Mentorship & industry guidance', icon: '🤝', color: 'bg-violet-50 text-violet-700 font-medium' },

    Speaker: { desc: 'Industry expert talks & sharing', icon: '🎙️', color: 'bg-indigo-50 text-indigo-700 font-medium' },

    'Technical Partner': { desc: 'Cloud credits & workshop tools', icon: '💻', color: 'bg-purple-50 text-purple-700 font-medium' },

    Prizes: { desc: 'Merchandise or cash support', icon: '🎁', color: 'bg-amber-50 text-amber-700 font-medium' }

  }



  const categories = event.lookingFor.map(need => ({

    name: need,

    desc: categoryDetails[need]?.desc || 'Support and collaboration',

    icon: categoryDetails[need]?.icon || '👥',

    color: categoryDetails[need]?.color || 'bg-slate-50 text-slate-700'

  }))



  const documents = [

    { name: 'Event Brief', type: 'PDF', size: '1.2 MB', color: 'text-red-650 bg-red-50/50 border-red-100/50 font-medium' },

    { name: 'Sponsorship Deck', type: 'PPTX', size: '2.5 MB', color: 'text-amber-650 bg-amber-50/50 border-amber-100/50 font-medium' },

    { name: 'Judging Criteria', type: 'PDF', size: '850 KB', color: 'text-red-655 bg-red-50/50 border-red-100/50 font-medium' },

    { name: 'Marketing Kit', type: 'ZIP', size: '3.1 MB', color: 'text-violet-650 bg-violet-50/50 border-violet-100/50 font-medium' }

  ]



  return (

    <div className="grid gap-6 grid-cols-1 lg:grid-cols-3 xl:grid-cols-12 items-start">

      {/* Column 1: Left */}

      <div className="space-y-6 lg:col-span-1 xl:col-span-5 min-w-0">

        {/* About the Event */}

        <section className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.015)] space-y-4">

          <h3 className="text-sm font-semibold tracking-tight text-slate-900">About the Event</h3>

          <div className="space-y-3.5">

            {eventFields.map((field) => (

              <div key={field.label} className="flex items-center gap-3.5 text-xs py-0.5">

                <span className="flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-lg bg-slate-50/80 text-slate-400">

                  {field.icon}

                </span>

                <div className="min-w-0 flex-1 grid grid-cols-[140px_1fr] items-center gap-2">

                  <span className="font-medium text-slate-400 truncate">{field.label}</span>

                  <span className={`truncate text-slate-700 ${field.important ? 'font-medium text-slate-800' : 'font-normal'}`}>

                    {field.value}

                  </span>

                </div>

              </div>

            ))}

          </div>

        </section>



        {/* Event Description */}

        <section className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.015)] space-y-3.5">

          <h3 className="text-sm font-semibold tracking-tight text-slate-900">Event Description</h3>

          <p className="text-xs font-normal text-slate-500 leading-relaxed max-w-prose">

            {event.summary}

          </p>

          <p className="text-xs font-normal text-slate-500 leading-relaxed max-w-prose">

            This event aims to nurture analytical thinking, teamwork, and innovation while connecting students with industry leaders. Participants will analyze case scenarios, build practical solutions, and present their recommendations to a panel of industry experts.

          </p>

        </section>



        {/* Event Documents */}

        <section className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.015)] space-y-4">

          <h3 className="text-sm font-semibold tracking-tight text-slate-900">Event Documents & Resources</h3>

          <div className="grid gap-3 sm:grid-cols-2">

            {documents.map((doc) => (

              <div key={doc.name} className="group flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50/20 p-3 transition hover:border-blue-200 hover:bg-white hover:shadow-sm">

                <div className="flex items-center gap-3 min-w-0">

                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border text-[10px] uppercase tracking-wider ${doc.color}`}>

                    {doc.type === 'ZIP' ? 'zip' : doc.type === 'PPTX' ? 'ppt' : 'pdf'}

                  </div>

                  <div className="min-w-0">

                    <h4 className="truncate text-xs font-medium text-slate-700 group-hover:text-blue-600 transition">{doc.name}</h4>

                    <p className="text-[10px] text-slate-400 mt-0.5">{doc.type} • {doc.size}</p>

                  </div>

                </div>

                <button type="button" aria-label={`Download ${doc.name}`} className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 shadow-sm transition hover:border-blue-300 hover:text-blue-600">

                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">

                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />

                  </svg>

                </button>

              </div>

            ))}

          </div>

        </section>

      </div>



      {/* Column 2: Middle */}

      <div className="space-y-6 lg:col-span-1 xl:col-span-4 min-w-0">

        {/* Event Timeline */}

        <section className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.015)] space-y-5">

          <h3 className="text-sm font-semibold tracking-tight text-slate-900">Event Timeline</h3>

          <div className="relative pl-6 space-y-6">

            <div className="absolute left-2.5 top-1.5 bottom-1.5 w-0.5 bg-slate-100" />

            

            {milestones.map((milestone) => {

              const isCompleted = milestone.status === 'completed'

              const isUpcoming = milestone.status === 'upcoming'

              return (

                <div key={milestone.title} className="relative flex items-center justify-between gap-4 text-xs">

                  <div className="absolute -left-[25px] top-1/2 -translate-y-1/2">

                    {isCompleted ? (

                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 border border-emerald-200 text-[10px] text-emerald-600 font-bold">

                        ✓

                      </div>

                    ) : isUpcoming ? (

                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-50 border border-blue-400 text-[10px] text-blue-600 ring-4 ring-blue-50 font-bold">

                        ●

                      </div>

                    ) : (

                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white border border-slate-200 text-[10px] text-slate-300 font-bold">

                        ○

                      </div>

                    )}

                  </div>

                  <div className="min-w-0 flex-1">

                    <p className={`font-medium ${isUpcoming ? 'text-blue-700 font-semibold' : isCompleted ? 'text-slate-600' : 'text-slate-500'}`}>

                      {milestone.title}

                    </p>

                  </div>

                  <span className={`shrink-0 text-[11px] font-medium ${isUpcoming ? 'text-blue-600' : 'text-slate-400'}`}>

                    {milestone.date}

                  </span>

                </div>

              )

            })}

          </div>

        </section>



        {/* What We Are Looking For */}

        <section className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.015)] space-y-4">

          <h3 className="text-sm font-semibold tracking-tight text-slate-900">What We Are Looking For</h3>

          <ul className="space-y-3">

            {expectations.map((item) => (

              <li key={item} className="flex items-start gap-3 text-xs leading-relaxed text-slate-600">

                <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-md bg-blue-50/50 text-[10px] font-bold text-blue-600 border border-blue-100/50">

                  ✓

                </span>

                <span>{item}</span>

              </li>

            ))}

          </ul>

        </section>

      </div>



      {/* Column 3: Right */}

      <div className="space-y-6 lg:col-span-1 xl:col-span-3 min-w-0">

        {/* Participants & Impact */}

        <section className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.015)] space-y-4">

          <h3 className="text-sm font-semibold tracking-tight text-slate-900">Participants & Impact</h3>

          <div className="grid gap-3 grid-cols-2">

            {metrics.map((metric) => (

              <div key={metric.label} className="flex flex-col gap-2 rounded-xl border border-slate-100 bg-slate-50/10 p-3">

                <span className={`flex h-7 w-7 items-center justify-center rounded-lg text-xs font-semibold ${metric.color}`}>

                  {metric.icon}

                </span>

                <div>

                  <p className="text-base font-semibold leading-none text-slate-800">{metric.value}</p>

                  <p className="mt-1 text-[9px] font-medium leading-normal text-slate-400">{metric.label}</p>

                </div>

              </div>

            ))}

          </div>

        </section>



        {/* Categories Needed */}

        <section className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.015)] space-y-4">

          <h3 className="text-sm font-semibold tracking-tight text-slate-900">Categories Needed</h3>

          <div className="space-y-2">

            {categories.map((cat) => (

              <div key={cat.name} className="flex items-center gap-3 rounded-xl border border-slate-200/30 bg-slate-50/10 p-2.5 hover:bg-slate-50/30 transition">

                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm ${cat.color}`}>

                  {cat.icon}

                </span>

                <div className="min-w-0">

                  <h4 className="text-xs font-medium text-slate-800 leading-none">{cat.name}</h4>

                  <p className="text-[10px] text-slate-400 mt-1.5 truncate">{cat.desc}</p>

                </div>

              </div>

            ))}

          </div>

        </section>



        {/* Target Skills */}

        <section className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.015)] space-y-4">

          <h3 className="text-sm font-semibold tracking-tight text-slate-900">Target Skills</h3>

          <div className="flex flex-wrap gap-1.5">

            {shownSkills.map((skill) => (

              <span key={skill} className="inline-flex items-center rounded-lg bg-blue-50/40 px-2.5 py-1 text-[10px] font-medium text-blue-700 transition hover:bg-blue-100/60 cursor-default">

                {skill}

              </span>

            ))}

          </div>

        </section>



        {/* Contact Organizer */}

        <div className="rounded-2xl border border-slate-200/60 bg-slate-50/30 p-5 shadow-[0_8px_30px_rgba(0,0,0,0.01)] space-y-3">

          <h4 className="text-xs font-semibold text-slate-800">Need More Information?</h4>

          <p className="text-[11px] font-medium text-slate-400 leading-normal">

            Have questions about this event or collaboration opportunities?

          </p>

          <button type="button" className="w-full flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-600">

            <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">

              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />

            </svg>

            Contact Organizer

          </button>

        </div>

      </div>

    </div>

  )

}

function SupportOpportunityWorkspace({ event, shownSkills, onOutreach }) {
  const supportTracks = [
    {
      title: 'Knowledge Partner',
      detail: 'Share speakers, judges, or mentors who can support the event theme.',
      fit: 'Strong fit when your university has related faculty, alumni, or club expertise.'
    },
    {
      title: 'Student Delegation',
      detail: 'Nominate students or teams to participate in the external event.',
      fit: 'Best when the event closes readiness gaps in your own program.'
    },
    {
      title: 'Resource Support',
      detail: 'Offer venue support, playbooks, student ambassadors, or promotion channels.',
      fit: 'Useful for building a reciprocal university collaboration pipeline.'
    }
  ]

  return (
    <div className="grid gap-5 lg:grid-cols-12">
      <main className="min-w-0 space-y-5 lg:col-span-7">
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 className="text-base font-medium text-slate-900">Support Opportunity</h3>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-600">
                Review how Sunway University can support this external university event without using organizer-only controls.
              </p>
            </div>
            <span className="w-fit rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700">
              External event
            </span>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {supportTracks.map((track, index) => (
              <article
                key={track.title}
                className={`rounded-xl border p-4 ${
                  index === 0 ? 'border-blue-200 bg-blue-50/40' : 'border-slate-200 bg-white'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-medium text-slate-900">{track.title}</h4>
                  {index === 0 ? (
                    <span className="rounded-full bg-blue-600 px-2 py-0.5 text-[10px] font-medium text-white">Selected</span>
                  ) : null}
                </div>
                <p className="mt-3 text-xs leading-5 text-slate-600">{track.detail}</p>
                <p className="mt-3 rounded-lg bg-white/80 px-3 py-2 text-[11px] leading-5 text-slate-600">{track.fit}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-base font-medium text-slate-900">AI Fit Explanation</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            This event aligns with {shownSkills.slice(0, 3).join(', ')} and could help students build evidence through inter-university collaboration.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {[
              ['Student relevance', 'High'],
              ['Effort required', 'Medium'],
              ['Expected evidence value', event.readiness],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl border border-slate-100 bg-slate-50/60 p-3">
                <p className="text-xs font-medium text-slate-500">{label}</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">{value}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <aside className="min-w-0 space-y-5 lg:col-span-5">
        <section className="rounded-xl border border-violet-200 bg-violet-50/50 p-5 shadow-sm">
          <h3 className="text-base font-medium text-slate-900">Support Plan Summary</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-700">
            <li className="flex gap-2"><span className="text-violet-600">•</span><span>Offer knowledge partner support for judging and mentoring.</span></li>
            <li className="flex gap-2"><span className="text-violet-600">•</span><span>Nominate students from related program cohorts.</span></li>
            <li className="flex gap-2"><span className="text-violet-600">•</span><span>Use the collaboration to generate verified student readiness signals.</span></li>
          </ul>
          <button
            type="button"
            onClick={onOutreach}
            className="mt-5 w-full rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-violet-700 focus:outline-none focus:ring-4 focus:ring-violet-100"
          >
            Express Interest
          </button>
        </section>
      </aside>
    </div>
  )
}



function ExpressedInterestWorkspace({ event }) {

  return (

    <section className="space-y-5">

      <div>

        <h2 className="text-xl font-semibold text-slate-900">Expressed Interest ({event.expressedInterest.length})</h2>

        <p className="mt-1 text-xs text-slate-500">Organizations that have expressed initial interest in this event.</p>

      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

        {event.expressedInterest.map((item) => (

          <div key={item.name} className="rounded-xl border border-slate-200/60 bg-white p-4 shadow-sm flex items-center gap-3">

            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-slate-900 to-blue-700 text-xs font-semibold text-white">

              {item.logo}

            </span>

            <div className="min-w-0 flex-1">

              <h3 className="truncate text-xs font-semibold text-slate-800">{item.name}</h3>

              <div className="mt-1 flex flex-wrap gap-1">

                {item.tags.map((tag) => (

                  <span key={tag} className="inline-flex items-center rounded-lg bg-violet-50 px-1.5 py-0.5 text-[9px] font-medium text-violet-700">

                    {tag}

                  </span>

                ))}

              </div>

            </div>

          </div>

        ))}

      </div>

    </section>

  )

}



function EventDetailPage({ event, activeTab, onTabChange, onBack, onOutreach, invitedList = [] }) {

  const shownSkills = event.targetSkills || defaultTargetSkills

  const isOwnedEvent = event.hostedByUs

  const visibleDetailTabs = isOwnedEvent ? detailTabs : externalDetailTabs

  const tabContentTitle = activeTab === 'Overview' ? 'Why Collaborate With Us?' : activeTab



  return (

    <div className="mx-auto min-w-0 w-full max-w-[1400px] space-y-4 px-6 pb-8">

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

        <button

          type="button"

          onClick={onBack}

          className="inline-flex w-fit items-center gap-2 rounded-lg px-1 py-2 text-sm font-semibold text-slate-700 hover:text-blue-700"

        >

          <span className="text-lg leading-none">&lt;</span>

          Back to Marketplace

        </button>

        <div className="flex items-center gap-4">

          <button type="button" aria-label="Notifications" className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700">

            !

          </button>

          <div className="flex items-center gap-3">

            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 text-xs font-semibold text-violet-700">UA</span>

            <div className="hidden sm:block">

              <p className="text-sm font-semibold text-slate-900">University Admin</p>

              <p className="text-xs font-medium text-slate-500">Sunway University</p>

            </div>

          </div>

        </div>

      </div>



      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

        <div className="grid gap-5 lg:grid-cols-12 lg:items-start">

          <div className="lg:col-span-2">

            <DetailHeroArt event={event} />

          </div>



          <div className="min-w-0 py-1 lg:col-span-5">

            <EventStatusBadge status={event.status} />

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{event.title}</h2>
              <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                isOwnedEvent ? 'bg-blue-50 text-blue-700' : 'bg-violet-50 text-violet-700'
              }`}>
                {isOwnedEvent ? 'Hosted by Sunway University' : 'Hosted by another university'}
              </span>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium text-slate-600">

              <span>{event.club}</span>

              <span>{event.date}</span>

              <span>{event.level}</span>

            </div>

            <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-700">{event.summary}</p>

          </div>



          <aside className="min-w-0 border-slate-200 lg:col-span-5 lg:border-l lg:pl-7">

            <div className="flex flex-wrap justify-start gap-3 lg:justify-end">

              <button type="button" className="rounded-xl border border-violet-200 bg-white px-4 py-2.5 text-sm font-medium text-violet-700">

                Share Event

              </button>

              <button

                type="button"

                onClick={() => (isOwnedEvent ? onTabChange('Interested') : onOutreach())}

                className="rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-violet-700 transition focus:outline-none focus:ring-4 focus:ring-violet-100"

              >

                {isOwnedEvent ? 'Manage Interest' : 'Express Interest'}

              </button>

            </div>



            <div className="mt-5">

              <p className="text-xs font-medium text-slate-900">Looking For</p>

              <div className="mt-3 flex flex-wrap gap-2">

                {event.lookingFor.map((need, index) => (

                  <SoftTag key={need} tone={index === 1 ? 'green' : 'purple'}>{need}</SoftTag>

                ))}

              </div>

            </div>



            <div className="mt-5">

              <p className="text-xs font-medium text-slate-900">Target Skills</p>

              <div className="mt-3 flex flex-wrap gap-2">

                {shownSkills.slice(0, 5).map((skill) => (

                  <SoftTag key={skill}>{skill}</SoftTag>

                ))}

                {shownSkills.length > 5 ? <SoftTag tone="slate">+{shownSkills.length - 5} more</SoftTag> : null}

              </div>

            </div>

          </aside>

        </div>



        <div className="mt-4 grid gap-4 border-t border-slate-100 pt-4 md:grid-cols-3">

          <DetailMetric icon="P" value={event.participants} label="Expected Participants" />

          <DetailMetric icon="C" value={event.categoriesNeeded} label="Categories Needed" />

          <div className="flex min-w-0 items-center gap-3 py-3">

            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-sm font-semibold text-blue-700">R</span>

            <div className="min-w-0 flex-1">

              <p className="text-xl font-semibold leading-none text-slate-950">{event.readiness}</p>

              <p className="mt-1 text-xs font-semibold text-slate-500">Collaboration Readiness</p>

            </div>

            <span className="h-2 w-28 overflow-hidden rounded-full bg-slate-100">

              <span className="block h-full rounded-full bg-emerald-500" style={{ width: event.readiness }} />

            </span>

          </div>

        </div>

      </section>



      <nav className="flex flex-wrap gap-5 border-b border-slate-200 bg-transparent">

        {visibleDetailTabs.map((tab) => (

          <button

            key={tab}

            type="button"

            onClick={() => onTabChange(tab)}

            className={`border-b-2 px-1 pb-3 text-sm font-medium ${

              activeTab === tab ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500'

            }`}

          >

            {tab === 'Current Collaborators'

              ? `Current Collaborators (${event.collaborators.length})`

              : tab === 'Interested'

              ? `Interested (${event.interestedCompanies.length})`

              : tab === 'Expressed Interest'

              ? `Expressed Interest (${event.expressedInterest.length})`

              : tab}

          </button>

        ))}

      </nav>



      {activeTab === 'Current Collaborators' ? (

        <CurrentCollaboratorsWorkspace event={event} />

      ) : activeTab === 'Interested' ? (

        <InterestedWorkspace event={event} />

      ) : activeTab === 'Event Details' ? (

        <EventDetailsWorkspace event={event} shownSkills={shownSkills} />

      ) : activeTab === 'Support Opportunity' ? (

        <SupportOpportunityWorkspace event={event} shownSkills={shownSkills} onOutreach={onOutreach} />

      ) : activeTab === 'Expressed Interest' ? (

        <ExpressedInterestWorkspace event={event} />

      ) : (

      <div className="grid gap-5 lg:grid-cols-12">

        <main className="min-w-0 space-y-5 lg:col-span-7">

          <section className="rounded-xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-100 p-4">

              <h3 className="text-base font-semibold text-slate-950">{tabContentTitle}</h3>

              {activeTab !== 'Overview' ? (

                <p className="mt-2 text-sm font-semibold text-slate-600">This tab is ready for detailed partner workflow content when the backend is connected.</p>

              ) : null}

            </div>



            <div className="grid gap-3 p-4 sm:grid-cols-2 xl:grid-cols-4">

              <ValueCard icon="T" title="Access Top Talent" tone="purple" body="Engage with high-potential students in AI, finance, and analytics." />

              <ValueCard icon="B" title="Brand Visibility" tone="green" body="Showcase your brand to students, faculty, and industry leaders." />

              <ValueCard icon="C" title="Impact & CSR" tone="orange" body="Support student development and contribute to community impact." />

              <ValueCard icon="R" title="Recruitment Pipeline" tone="blue" body="Discover future hires and build early connections." />

            </div>



            <div className="border-t border-slate-100 p-4">

              <h3 className="text-base font-semibold text-slate-950">About the Event</h3>

              <dl className="mt-4 grid gap-3 text-sm md:grid-cols-[160px_minmax(0,1fr)]">

                {[

                  ['Format', 'Case analysis and presentation'],

                  ['Round', 'Preliminary, Semi-Final, Grand Final'],

                  ['Team Size', '3-5 students'],

                  ['Timeline', '15 Jul - 28 Sep 2026'],

                  ['Venue', 'Sunway University Campus'],

                  ['Organized By', `${event.club}, Sunway University`],

                ].map(([label, value]) => (

                  <React.Fragment key={label}>

                    <dt className="font-medium text-slate-500">{label}</dt>

                    <dd className="font-semibold text-slate-700">{value}</dd>

                  </React.Fragment>

                ))}

              </dl>

            </div>

          </section>



          <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">

            <h3 className="text-base font-semibold text-slate-950">Expected Student Impact</h3>

            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

              {[

                ['120+', 'Students Engaged'],

                ['48+', 'Skill Signals Generated'],

                ['12+', 'Leadership Evidence'],

                ['8+', 'Recruiter Interactions'],

              ].map(([value, label]) => (

                <div key={label} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">

                  <p className="text-2xl font-semibold text-slate-950">{value}</p>

                  <p className="mt-1 text-xs font-medium text-slate-500">{label}</p>

                </div>

              ))}

            </div>

          </section>

        </main>



        <aside className="min-w-0 space-y-5 lg:col-span-5">

          <SideListCard title="Current Collaborators" count={event.collaborators.length}>

            {event.collaborators.map((item) => (

              <OrganizationRow key={item.name} item={item} caption="Partner:" />

            ))}

          </SideListCard>



          <SideListCard title="Interested Companies" count={event.interestedCompanies.length + 2}>

            {event.interestedCompanies.map((item) => (

              <OrganizationRow key={item.name} item={item} />

            ))}

            <button type="button" className="mt-1 text-xs font-semibold text-blue-700">+2 more companies</button>

          </SideListCard>



          <SideListCard title="Expressed Interest" count={event.expressedInterest.length}>

            {event.expressedInterest.map((item) => (

              <OrganizationRow key={item.name} item={item} caption="Requested:" />

            ))}

            <button type="button" className="mt-1 text-xs font-semibold text-blue-700">View all expressed interest</button>

          </SideListCard>



          <section className="rounded-xl border border-violet-200 bg-violet-50/40 p-4 shadow-sm">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <h3 className="text-base font-semibold text-slate-950">Ready to collaborate?</h3>

                <p className="mt-1 text-sm font-semibold text-slate-600">Express your interest to start a conversation with the organizer.</p>

              </div>

              <button

                type="button"

                onClick={onOutreach}

                className="shrink-0 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_8px_16px_rgba(124,58,237,0.18)] hover:bg-violet-700 transition"

              >

                Express Interest

              </button>

            </div>

          </section>

        </aside>

      </div>

      )}

    </div>

  )

}



function matchesFilter(event, activeFilter) {

  if (activeFilter === 'All Events') return true

  if (activeFilter === 'Open for Partners') return event.status === 'Open for Partners'

  return event.lookingFor.includes(activeFilter.replace('Needs ', ''))

}



export default function CollaborationMarketplace() {
  const navigate = useNavigate()
  const location = useLocation()

  const [activeLifecycleTab, setActiveLifecycleTab] = useState(
    location.state?.tab === 'Post-Event' ? 'Post-Event' : 'Pre-Event'
  )

  useEffect(() => {
    if (location.state?.tab) {
      setActiveLifecycleTab(location.state.tab)
    }
  }, [location.state])

  const [eventList, setEventList] = useState(events)

  const [activeBoardTab, setActiveBoardTab] = useState('Explore Events')

  const [activeFilter, setActiveFilter] = useState('All Events')

  const [searchTerm, setSearchTerm] = useState('')

  const [selectedEvent, setSelectedEvent] = useState(null)

  const [activeDetailTab, setActiveDetailTab] = useState('Overview')

  const [showOutreach, setShowOutreach] = useState(false)

  const [toast, setToast] = useState('')



  function showToast(msg) {

    setToast(msg)

    window.setTimeout(() => setToast(''), 2000)

  }



  const visibleEvents = useMemo(() => {

    const query = searchTerm.trim().toLowerCase()

    const boardEvents = activeBoardTab === 'My Events'
      ? eventList.filter((event) => event.hostedByUs)
      : eventList

    return boardEvents.filter((event) => {

      const searchable = [

        event.title,

        event.club,

        event.status,

        event.location,

        event.level,

        ...event.lookingFor,

        ...event.benefits,

      ]

        .join(' ')

        .toLowerCase()



      return matchesFilter(event, activeFilter) && (!query || searchable.includes(query))

    })

  }, [activeBoardTab, activeFilter, eventList, searchTerm])



  function openDetails(event) {

    setSelectedEvent(event)

    setActiveDetailTab(event.hostedByUs ? 'Overview' : 'Event Details')

    setShowOutreach(false)

  }

  function renderMainView() {
    if (activeLifecycleTab === 'Post-Event') {
      return (
        <div className="relative">
          <AIPostEventCompletionPage
            onBack={() => setActiveLifecycleTab('Pre-Event')}
            onToast={showToast}
            onViewImpactReport={(row) => {
              navigate(`/university/collaboration/post-event/report/${row.id}`)
            }}
          />
          {toast && (
            <div className="fixed bottom-5 right-5 z-50 rounded-full bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white shadow-lg transition">
              {toast}
            </div>
          )}
        </div>
      )
    }

    if (selectedEvent) {
      if (showOutreach) {
        return (
          <div className="relative">
            <AICollaborationOutreachPage
              event={selectedEvent}
              onBack={() => setShowOutreach(false)}
              onToast={showToast}
            />
            {toast && (
              <div className="fixed bottom-5 right-5 z-50 rounded-full bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white shadow-lg transition">
                {toast}
              </div>
            )}
          </div>
        )
      }

      return (
        <div className="relative">
          <EventDetailPage
            event={selectedEvent}
            activeTab={activeDetailTab}
            onTabChange={setActiveDetailTab}
            onBack={() => setSelectedEvent(null)}
            onOutreach={() => setShowOutreach(true)}
          />
          {toast && (
            <div className="fixed bottom-5 right-5 z-50 rounded-full bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white shadow-lg transition">
              {toast}
            </div>
          )}
        </div>
      )
    }

    if (activeBoardTab === 'Create Event') {
      return (
        <div className="relative">
          <AICreateEventPage
            onBack={() => setActiveBoardTab('Explore Events')}
            onToast={showToast}
            onPublish={(newEvent) => {
              setEventList(prev => [newEvent, ...prev])
              setActiveBoardTab('My Events')
              showToast('Event published successfully!')
            }}
          />
          {toast && (
            <div className="fixed bottom-5 right-5 z-50 rounded-full bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white shadow-lg transition">
              {toast}
            </div>
          )}
        </div>
      )
    }

    return (
      <div className="min-w-0 space-y-5 pb-10">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <label className="relative block w-full max-w-3xl">
            <span className="absolute left-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full border-2 border-slate-400">
              <span className="absolute -bottom-1 -right-1 h-2 w-0.5 rotate-[-45deg] rounded-full bg-slate-400" />
            </span>
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search events, skills, clubs, or companies..."
              className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm font-semibold text-slate-700 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
            />
          </label>
          <button
            type="button"
            onClick={() => setActiveBoardTab('Create Event')}
            className="h-12 w-fit rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(37,99,235,0.22)]"
          >
            + Create Event
          </button>
        </div>

        <header className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950">Collaboration Marketplace</h2>
            <p className="mt-2 max-w-2xl text-sm font-medium text-slate-500">
              Post club events and find the right collaborators from industry and organizations.
            </p>
          </div>
        </header>

        {/* Main Lifecycle Navigation */}
        <nav className="border-b border-slate-200">
          <div className="flex gap-6">
            <button
              type="button"
              className="pb-3 text-sm font-semibold border-b-2 transition border-blue-600 text-blue-700"
            >
              Pre-Event
            </button>
            <button
              type="button"
              onClick={() => setActiveLifecycleTab('Post-Event')}
              className="pb-3 text-sm font-semibold border-b-2 transition border-transparent text-slate-500 hover:text-slate-700"
            >
              Post-Event
            </button>
          </div>
        </nav>

        {/* Pre-Event Sub tabs */}
        <div className="border-b border-slate-200">
          <div className="flex flex-wrap gap-6">
            {['Explore Events', 'My Events'].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveBoardTab(tab)}
                className={`border-b-2 px-1 pb-3 text-sm font-semibold ${
                  activeBoardTab === tab ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <FilterChips activeFilter={activeFilter} onChange={setActiveFilter} />
          <div className="flex shrink-0 items-center gap-2">
            <button type="button" className="rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-650 shadow-sm">
              Filter
            </button>
            <button type="button" className="rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-650 shadow-sm">
              Sort: Newest
            </button>
          </div>
        </div>

        {activeBoardTab === 'My Events' ? (
          <section className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-950">Your posted events</p>
                <p className="mt-1 text-sm text-slate-600">Review open collaboration requests and follow up with interested partners.</p>
              </div>
              <span className="w-fit rounded-full bg-white px-3 py-1 text-xs font-medium text-blue-700">
                {eventList.filter((event) => event.hostedByUs).length} owned events
              </span>
            </div>
          </section>
        ) : null}

        <section className="grid min-w-0 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visibleEvents.map((event) => (
            <EventCard key={event.id} event={event} onViewDetails={openDetails} />
          ))}
        </section>

        {visibleEvents.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center">
            <p className="font-semibold text-slate-950">No matching collaboration events.</p>
            <p className="mt-2 text-sm text-slate-500">Try a different search or partner filter.</p>
          </div>
        ) : null}

        <footer className="flex flex-col gap-3 border-t border-slate-100 pt-4 text-sm font-semibold text-slate-550 sm:flex-row sm:items-center sm:justify-between">
          <span>Showing 1-6 of 18 events</span>
          <div className="flex items-center gap-2">
            {['<', '1', '2', '3', '>'].map((item) => (
              <button
                key={item}
                type="button"
                className={`flex h-8 w-8 items-center justify-center rounded-lg border text-xs font-semibold ${
                  item === '1' ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-200 bg-white text-slate-500'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </footer>
      </div>
    )
  }

  return (
    <Routes>
      <Route path="/" element={renderMainView()} />
      <Route path="/post-event/report/:eventId" element={<EventImpactReportPage onBack={() => navigate('/university/collaboration', { state: { tab: 'Post-Event' } })} onToast={showToast} />} />
      <Route path="/post-event/history" element={<EventImpactHistoryPage onToast={showToast} />} />
      <Route path="/post-event/:eventId/student-spotlights" element={<StudentSpotlightsPage onToast={showToast} />} />
    </Routes>
  )
}



