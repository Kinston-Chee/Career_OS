import React, { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowRight, CheckCircle2, Send, Sparkles } from 'lucide-react'
import HomeTopNav from '../components/home/HomeTopNav'
import TypewriterText from '../components/ui/TypewriterText'
import { candidateOverview, mockUser } from '../data/mockData'

const STARTER_MESSAGE =
  "Hi Chris - I'm your CareerOS companion. I can help you decide what to do next, improve your profile, prepare for interviews, and find better opportunities."

const PROMPTS = [
  'What should I focus on today?',
  'Why is TalentBank AI Challenge a good match for me?',
  'Find me the best opportunities this week.',
  'Which of my experiences are helping my profile the most?',
  'Help me build a plan to become a stronger AI intern candidate.',
]

const RESPONSE_LIBRARY = {
  focus: {
    type: 'text',
    text: 'Today, I would focus on three things:\n\n1. Apply to the TalentBank AI Challenge first. It has a 92% match and the deadline is in 2 days.\n2. Add evidence to your NLP project in Career Memory, because employers are already responding to your NLP signal.\n3. Spend 10 minutes practising interview answers for your Grab Data Analyst interview.\n\nIf you only do one thing, start with TalentBank.',
  },
  talentbank: {
    type: 'text',
    text: 'TalentBank AI Challenge matches you because it connects directly to your strongest current signals: NLP, Python, problem-solving, and initiative.\n\nYour Career Memory shows that you have technical depth from your NLP work and execution speed from your hackathon experience. That makes this challenge a strong chance to turn your profile into visible proof.\n\nThe main gap is evidence. Before applying, I recommend adding a GitHub link, short project summary, or screenshot to your NLP project.',
  },
  opportunities: {
    type: 'opportunity_recommendations',
    text: 'I found 3 opportunities that are worth your attention this week. I ranked them based on match score, urgency, and how much they strengthen your career signal.',
    data: [
      ['TalentBank AI Challenge', 'TalentBank', '92%', '2 days', 'Strengthens your NLP + AI project signal.', 'Apply today after adding project evidence.', 'Apply now'],
      ['ByteDance SWE Intern', 'ByteDance', '91%', '3 days', 'Good fit for software engineering direction.', 'Prepare one React/project story.', 'View details'],
      ['Shopee Product Intern', 'Shopee', '86%', '5 days', 'Good bridge between analytics and product thinking.', 'Use your hackathon finalist story.', 'Save opportunity'],
    ],
  },
  signals: {
    type: 'career_signal_map',
    text: 'Your strongest profile signal currently comes from three experiences. They work together to position you as an initiative-driven candidate with growing technical depth.',
    data: [
      {
        title: 'Software Engineering Intern - Grab',
        strength: 88,
        signals: ['Real workplace exposure', 'React experience', 'Agile collaboration', 'Software engineering direction'],
        insight: 'This is your strongest credibility proof for software engineering roles.',
        bars: [['Technical Depth', 90], ['Leadership', 65], ['Problem Solving', 78], ['Employer Relevance', 92]],
      },
      {
        title: 'Hackathon - Top 3 Finalist',
        strength: 82,
        signals: ['Problem solving', 'Fast execution', 'Presentation', 'Product thinking'],
        insight: 'This supports startup-style roles, AI challenges, and product-oriented internships.',
        bars: [['Technical Depth', 72], ['Leadership', 70], ['Problem Solving', 94], ['Employer Relevance', 80]],
      },
      {
        title: "Vice President - Taylor's Computing Society",
        strength: 76,
        signals: ['Leadership', 'Initiative', 'Event coordination', 'Community building'],
        insight: 'This explains your initiative-driven self-discovery profile.',
        bars: [['Technical Depth', 45], ['Leadership', 95], ['Problem Solving', 70], ['Employer Relevance', 74]],
      },
    ],
  },
  roadmap: {
    type: 'ai_intern_roadmap',
    text: 'Here is a 6-week plan to strengthen your AI internship profile. I designed it around your current profile: NLP is already strong, but you need stronger evidence, interview readiness, and application momentum.',
    data: [
      ['Week 1', 'Strengthen evidence', 'Add GitHub link, screenshots, and project summary to your NLP project.', 'Your Career Memory becomes more credible to employers.'],
      ['Week 2', 'Apply to high-match opportunities', 'Apply to TalentBank AI Challenge and ByteDance SWE Intern.', 'Turn profile signals into real applications.'],
      ['Week 3', 'Interview foundation', 'Practise Python, ML basics, and project explanation.', 'Become ready for AI/software intern screening.'],
      ['Week 4', 'Build one mini AI proof', 'Create a small NLP demo or chatbot classifier.', 'Add a second AI project signal.'],
      ['Week 5', 'Employer narrative', 'Refine your Career Narrative and connect leadership + technical proof.', 'Employers understand your direction faster.'],
      ['Week 6', 'Review and repeat', 'Check application tracker, improve weak points, and apply to 3 more roles.', 'Better conversion from viewed profile to interview.'],
    ],
  },
  default: {
    type: 'text',
    text: 'I can help with opportunities, applications, Career Memory, interview preparation, and profile improvement. Try asking me to find opportunities, review your experiences, or build a plan.',
  },
}

const THINKING_STEPS = {
  opportunity_recommendations: [
    'Checking your Career Memory signals...',
    'Comparing opportunities against your NLP, Python, and software signals...',
    'Sorting by match score, urgency, and deadline...',
    'Building your top opportunity shortlist...',
  ],
  career_signal_map: [
    'Reading your Career Memory timeline...',
    'Extracting skills, evidence, and employer relevance from each experience...',
    'Scoring technical depth, leadership, problem solving, and employer relevance...',
    'Creating your Career Signal Map...',
  ],
  ai_intern_roadmap: [
    'Reviewing your current strengths and gaps...',
    'Checking your strongest signals: NLP, Python, leadership, and hackathon experience...',
    'Mapping actions across evidence, applications, interviews, and portfolio building...',
    'Generating a 6-week AI internship readiness roadmap...',
  ],
}

function withConfig(response) {
  const isVisual = response.type !== 'text'
  return {
    responseType: response.type,
    text: response.text,
    data: response.data,
    isVisual,
    thinkingSteps: isVisual ? THINKING_STEPS[response.type] : ['Sure - let me think through the best next step for you...'],
  }
}

function getResponseForPrompt(text) {
  const q = text.toLowerCase().trim()
  if (
    q.includes('focus on today') ||
    q.includes('focus today') ||
    q.includes('what should i focus') ||
    q.includes('what should i do today') ||
    q.includes('what should i do first') ||
    q.includes('next step') ||
    q === 'today'
  ) return withConfig(RESPONSE_LIBRARY.focus)
  if (q.includes('talentbank') && (q.includes('match') || q.includes('good') || q.includes('why'))) return withConfig(RESPONSE_LIBRARY.talentbank)
  if (
    q.includes('best opportunities') ||
    q.includes('find me the best opportunities') ||
    q.includes('find matching opportunities') ||
    q.includes('opportunities this week')
  ) return withConfig(RESPONSE_LIBRARY.opportunities)
  if (q.includes('experiences') && (q.includes('helping') || q.includes('profile') || q.includes('strongest'))) return withConfig(RESPONSE_LIBRARY.signals)
  if (
    q.includes('ai intern') ||
    q.includes('stronger ai') ||
    q.includes('build a plan') ||
    q.includes('roadmap') ||
    q.includes('6-week')
  ) return withConfig(RESPONSE_LIBRARY.roadmap)
  return withConfig(RESPONSE_LIBRARY.default)
}

function ThinkingBubble({ text }) {
  return (
    <div className="message-enter flex justify-start">
      <div className="max-w-[78%] rounded-2xl border border-white/70 bg-white/72 px-4 py-3 text-sm font-semibold leading-6 text-[#637094] shadow-sm backdrop-blur-xl">
        <span>{text}</span>
        <span className="ml-2 inline-flex translate-y-0.5 gap-1">
          <span className="typing-dot" />
          <span className="typing-dot" style={{ animationDelay: '160ms' }} />
          <span className="typing-dot" style={{ animationDelay: '320ms' }} />
        </span>
      </div>
    </div>
  )
}

function MessageBubble({ message, isLatestRobot, onToast }) {
  if (message.type === 'thinking') return <ThinkingBubble text={message.text} />
  const isUser = message.role === 'user'
  const isVisualOnly = message.visualOnly
  return (
    <div className={`message-enter flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[86%] rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm ${
        isUser
          ? 'bg-blue-600 text-white'
          : 'border border-white/70 bg-white/72 text-[#2c3656] backdrop-blur-xl'
      }`}>
        {!isVisualOnly && (
          <div className="whitespace-pre-line">
            {isLatestRobot ? <TypewriterText text={message.text} speed={18} /> : message.text}
          </div>
        )}
        {!isUser && <VisualReply message={message} onToast={onToast} />}
      </div>
    </div>
  )
}

function VisualReply({ message, onToast }) {
  if (message.type === 'opportunity_recommendations') return <OpportunityRecommendationReply items={message.data} onToast={onToast} />
  if (message.type === 'career_signal_map') return <CareerSignalMapReply items={message.data} />
  if (message.type === 'ai_intern_roadmap') return <AIInternRoadmapReply steps={message.data} onToast={onToast} />
  return null
}

function OpportunityRecommendationReply({ items, onToast }) {
  return (
    <div className="mt-4 grid gap-3 md:grid-cols-3">
      {items.map(([title, company, match, deadline, why, action, cta]) => (
        <article key={title} className="rounded-2xl border border-white/70 bg-white/58 p-3 shadow-[0_12px_28px_rgba(37,99,235,0.08),inset_0_1px_0_rgba(255,255,255,0.85)]">
          <div className="flex items-center justify-between gap-2">
            <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-bold text-blue-700">{match}</span>
            <span className="rounded-full bg-orange-50 px-2 py-0.5 text-[11px] font-bold text-orange-700">{deadline}</span>
          </div>
          <h3 className="mt-3 text-sm font-black text-[#11194a]">{title}</h3>
          <p className="text-xs font-semibold text-[#7382a1]">{company}</p>
          <p className="mt-3 text-xs font-semibold leading-5 text-[#3a4669]">{why}</p>
          <p className="mt-2 text-xs font-medium leading-5 text-[#637094]">{action}</p>
          <button type="button" onClick={() => onToast(`${cta} opened`)} className="mt-3 inline-flex items-center gap-1 rounded-full border border-blue-100 bg-white/75 px-3 py-1.5 text-xs font-bold text-blue-700 transition hover:bg-blue-50">
            {cta} <ArrowRight size={12} />
          </button>
        </article>
      ))}
    </div>
  )
}

function CareerSignalMapReply({ items }) {
  return (
    <div className="mt-4 space-y-3">
      {items.map((item) => (
        <article key={item.title} className="rounded-2xl border border-white/70 bg-white/58 p-4 shadow-[0_12px_28px_rgba(37,99,235,0.08),inset_0_1px_0_rgba(255,255,255,0.85)]">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="text-sm font-black text-[#11194a]">{item.title}</h3>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {item.signals.map((signal) => <span key={signal} className="rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-bold text-blue-700">{signal}</span>)}
              </div>
            </div>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">{item.strength}</span>
          </div>
          <p className="mt-3 text-xs font-semibold leading-5 text-[#3a4669]">{item.insight}</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {item.bars.map(([label, value]) => (
              <div key={label}>
                <div className="flex justify-between text-[11px] font-bold text-[#637094]"><span>{label}</span><span>{value}</span></div>
                <div className="mt-1 h-2 rounded-full bg-blue-50"><div className="h-full rounded-full bg-blue-600" style={{ width: `${value}%` }} /></div>
              </div>
            ))}
          </div>
        </article>
      ))}
    </div>
  )
}

function AIInternRoadmapReply({ steps, onToast }) {
  return (
    <div className="mt-4 rounded-2xl border border-white/70 bg-white/58 p-4 shadow-[0_12px_28px_rgba(37,99,235,0.08),inset_0_1px_0_rgba(255,255,255,0.85)]">
      <div className="grid grid-cols-3 gap-2 md:grid-cols-6">
        {steps.map((step, index) => (
          <div key={step[0]} className="text-center">
            <span className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-black text-white">{index + 1}</span>
            <p className="mt-2 text-[11px] font-bold text-[#11194a]">{step[0]}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {steps.map(([week, title, action, outcome]) => (
          <article key={week} className="rounded-xl border border-white/70 bg-white/70 p-3">
            <p className="text-[11px] font-bold text-blue-600">{week}</p>
            <h3 className="mt-1 text-sm font-black text-[#11194a]">{title}</h3>
            <p className="mt-2 text-xs font-semibold leading-5 text-[#3a4669]">{action}</p>
            <p className="mt-2 text-xs font-medium leading-5 text-[#637094]">{outcome}</p>
          </article>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" onClick={() => onToast('Plan saved')} className="rounded-full bg-blue-600 px-3 py-1.5 text-xs font-bold text-white">Save as plan</button>
        <button type="button" onClick={() => onToast('Milestones added to calendar')} className="rounded-full border border-blue-100 bg-white/75 px-3 py-1.5 text-xs font-bold text-blue-700">Add milestones to calendar</button>
        <button type="button" onClick={() => onToast('Week 1 started')} className="rounded-full border border-blue-100 bg-white/75 px-3 py-1.5 text-xs font-bold text-blue-700">Start Week 1</button>
      </div>
    </div>
  )
}

function InsightCard({ title, body, onClick }) {
  return (
    <button type="button" onClick={onClick} className="w-full rounded-2xl border border-white/70 bg-white/62 p-4 text-left shadow-[0_14px_36px_rgba(37,99,235,0.08)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-white/80">
      <p className="text-xs font-bold uppercase tracking-wide text-blue-600">{title}</p>
      <p className="mt-2 text-sm font-semibold leading-5 text-[#2f3b61]">{body}</p>
    </button>
  )
}

function DemoToast({ message }) {
  if (!message) return null
  return (
    <div className="fixed bottom-5 right-5 z-50 rounded-2xl border border-white/70 bg-white/85 px-4 py-3 text-sm font-bold text-blue-700 shadow-[0_18px_44px_rgba(37,99,235,0.14)] backdrop-blur-xl">
      {message}
    </div>
  )
}

export default function AICompanionPage() {
  const readiness = candidateOverview.careerSnapshot.readiness
  const [messages, setMessages] = useState([{ id: 'start', role: 'robot', type: 'text', text: STARTER_MESSAGE }])
  const [draft, setDraft] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [toast, setToast] = useState('')
  const scrollRef = useRef(null)
  const timersRef = useRef([])
  const toastRef = useRef(null)

  useEffect(() => {
    if (!scrollRef.current) return
    scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, isGenerating])

  useEffect(() => () => {
    timersRef.current.forEach(window.clearTimeout)
    window.clearTimeout(toastRef.current)
  }, [])

  const schedule = (fn, delay) => {
    const id = window.setTimeout(fn, delay)
    timersRef.current.push(id)
    return id
  }

  const showToast = (message) => {
    window.clearTimeout(toastRef.current)
    setToast(message)
    toastRef.current = window.setTimeout(() => setToast(''), 1800)
  }

  const sendMessage = (text) => {
    const clean = text.trim()
    if (!clean || isGenerating) return
    const response = getResponseForPrompt(clean)
    const thinkingId = `thinking-${Date.now()}`
    setDraft('')
    setIsGenerating(true)
    setMessages((prev) => [
      ...prev,
      { id: `user-${Date.now()}`, role: 'user', type: 'text', text: clean },
      { id: thinkingId, role: 'robot', type: 'thinking', text: response.thinkingSteps[0] },
    ])

    const finishResponse = () => {
      setMessages((prev) => [
        ...prev.filter((message) => message.id !== thinkingId),
        { id: `robot-text-${Date.now()}`, role: 'robot', type: 'text', text: response.text },
      ])
      if (!response.isVisual) {
        setIsGenerating(false)
        return
      }
      schedule(() => {
        setMessages((prev) => [
          ...prev,
          { id: `robot-visual-${Date.now()}`, role: 'robot', type: response.responseType, text: '', data: response.data, visualOnly: true },
        ])
        setIsGenerating(false)
      }, 400)
    }

    if (!response.isVisual) {
      schedule(finishResponse, 1200)
      return
    }

    response.thinkingSteps.slice(1).forEach((step, index) => {
      schedule(() => {
        setMessages((prev) => prev.map((message) => (
          message.id === thinkingId ? { ...message, text: step } : message
        )))
      }, (index + 1) * 800)
    })
    schedule(finishResponse, response.thinkingSteps.length * 800 + 350)
  }

  const insights = useMemo(() => [
    ['Today\'s focus', 'TalentBank AI Challenge deadline in 2 days', 'Why is TalentBank AI Challenge a good match for me?'],
    ['Profile signal', 'NLP is your strongest skill this week', 'Which of my experiences are helping my profile the most?'],
    ['Recommended action', 'Add evidence to your NLP project before applying', 'What should I focus on today?'],
  ], [])

  return (
    <div className="min-h-screen bg-[#f6f9ff] text-[#121a3a]">
      <HomeTopNav user={mockUser} readiness={readiness} />

      <main className="mx-auto max-w-[1480px] px-4 py-5 sm:px-6 lg:px-8">
        <header className="mb-5">
          <h1 className="text-2xl font-bold tracking-[-0.01em] text-[#11194a] sm:text-3xl">AI Companion</h1>
          <p className="mt-1 text-sm font-medium text-[#637094]">
            Ask CareerOS anything about your profile, applications, skills, or opportunities.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          <section className="flex h-[calc(100vh-180px)] min-h-[620px] max-h-[720px] flex-col overflow-hidden rounded-2xl border border-white/70 bg-white/58 shadow-[0_20px_60px_rgba(37,99,235,0.10)] backdrop-blur-2xl">
            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-5">
              {messages.map((message, index) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  isLatestRobot={message.role === 'robot' && message.type === 'text' && index === messages.length - 1}
                  onToast={showToast}
                />
              ))}

            </div>

            <div className="border-t border-white/70 bg-white/42 p-4">
              <div className="mb-3 flex flex-wrap gap-2">
                {PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    disabled={isGenerating}
                    onClick={() => sendMessage(prompt)}
                    className="rounded-full border border-blue-100 bg-white/70 px-3.5 py-2 text-xs font-bold text-[#35507d] transition hover:border-blue-300 hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              <form
                onSubmit={(event) => {
                  event.preventDefault()
                  sendMessage(draft)
                }}
                className="flex items-center gap-2 rounded-full border border-white/70 bg-white/76 px-4 py-2 shadow-[0_14px_34px_rgba(37,99,235,0.10)] backdrop-blur-xl"
              >
                <Sparkles size={16} className="text-blue-600" />
                <input
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  placeholder="Ask your CareerOS companion..."
                  className="flex-1 bg-transparent text-sm font-medium text-[#2c3656] placeholder:text-[#9aa6c3] focus:outline-none"
                />
                <button type="submit" disabled={isGenerating} className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50">
                  <Send size={15} strokeWidth={2.4} />
                </button>
              </form>
            </div>
          </section>

          <aside className="space-y-4">
            {insights.map(([title, body, prompt]) => (
              <InsightCard key={title} title={title} body={body} onClick={() => sendMessage(prompt)} />
            ))}
            <article className="rounded-2xl border border-blue-100 bg-blue-50/70 p-4 text-sm font-semibold leading-6 text-blue-800">
              <CheckCircle2 className="mb-2" size={18} />
              Visual replies now turn Career Memory, opportunities, and plans into mini dashboards inside chat.
            </article>
          </aside>
        </div>
      </main>
      <DemoToast message={toast} />
    </div>
  )
}
