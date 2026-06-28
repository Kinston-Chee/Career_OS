import React, { useEffect, useRef, useState } from 'react'
import { Send, Sparkles } from 'lucide-react'
import HomeTopNav from '../components/home/HomeTopNav'
import TypewriterText from '../components/ui/TypewriterText'
import { candidateOverview, mockUser } from '../data/mockData'

const PROMPTS = [
  'What should I do today?',
  'Improve my profile',
  'Prepare me for interviews',
  'Find matching opportunities',
]

const RESPONSES = {
  'What should I do today?':
    'Start with the TalentBank AI Challenge. You have a 92% match, the deadline is in 2 days, and it strengthens your NLP signal. After that, add evidence to your NLP project in Career Memory.',
  'Improve my profile':
    'Your profile is strong in NLP and initiative, but your Career Narrative would be stronger if you add proof for your NLP project. I recommend uploading a GitHub link, short project summary, and outcome evidence.',
  'Prepare me for interviews':
    "Let's practise a 10-minute software intern interview. I'll focus on your NLP project, Python fundamentals, and how you explain problem-solving.",
  'Find matching opportunities':
    'I found three good matches: TalentBank AI Challenge, ByteDance SWE Intern, and Shopee Product Intern. TalentBank is the strongest because it directly matches your NLP profile.',
}

const STARTER_MESSAGE =
  "Hi Chris - I'm your CareerOS companion. I can help you decide what to do next, improve your profile, prepare for interviews, and find better opportunities."

function MessageBubble({ message, isLatestRobot }) {
  const isUser = message.role === 'user'
  return (
    <div className={`chat-fade-in flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm ${
        isUser
          ? 'bg-blue-600 text-white'
          : 'border border-white/70 bg-white/72 text-[#2c3656] backdrop-blur-xl'
      }`}>
        {isLatestRobot ? <TypewriterText text={message.text} speed={18} /> : message.text}
      </div>
    </div>
  )
}

function InsightCard({ title, body }) {
  return (
    <article className="rounded-2xl border border-white/70 bg-white/62 p-4 shadow-[0_14px_36px_rgba(37,99,235,0.08)] backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-wide text-blue-600">{title}</p>
      <p className="mt-2 text-sm font-semibold leading-5 text-[#2f3b61]">{body}</p>
    </article>
  )
}

export default function AICompanionPage() {
  const readiness = candidateOverview.careerSnapshot.readiness
  const [messages, setMessages] = useState([{ id: 'start', role: 'robot', text: STARTER_MESSAGE }])
  const [draft, setDraft] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    if (!scrollRef.current) return
    scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, isTyping])

  const sendMessage = (text) => {
    const clean = text.trim()
    if (!clean) return
    setDraft('')
    setMessages((prev) => [...prev, { id: `user-${Date.now()}`, role: 'user', text: clean }])
    setIsTyping(true)
    window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `robot-${Date.now()}`,
          role: 'robot',
          text: RESPONSES[clean] ?? "I can help with that. For this demo, I'd start by checking your strongest Career Memory evidence, then matching it to open opportunities and interview prep.",
        },
      ])
      setIsTyping(false)
    }, 900)
  }

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
          <section className="flex min-h-[640px] flex-col overflow-hidden rounded-2xl border border-white/70 bg-white/58 shadow-[0_20px_60px_rgba(37,99,235,0.10)] backdrop-blur-2xl">
            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-5">
              {messages.map((message, index) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  isLatestRobot={!isTyping && message.role === 'robot' && index === messages.length - 1}
                />
              ))}

              {isTyping && (
                <div className="flex items-center gap-1.5 rounded-2xl border border-white/70 bg-white/70 px-4 py-3 shadow-sm backdrop-blur-xl">
                  <span className="typing-dot" />
                  <span className="typing-dot" style={{ animationDelay: '160ms' }} />
                  <span className="typing-dot" style={{ animationDelay: '320ms' }} />
                </div>
              )}
            </div>

            <div className="border-t border-white/70 bg-white/42 p-4">
              <div className="mb-3 flex flex-wrap gap-2">
                {PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => sendMessage(prompt)}
                    className="rounded-full border border-blue-100 bg-white/70 px-3.5 py-2 text-xs font-bold text-[#35507d] transition hover:border-blue-300 hover:bg-white"
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
                <button type="submit" className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white transition hover:bg-blue-700">
                  <Send size={15} strokeWidth={2.4} />
                </button>
              </form>
            </div>
          </section>

          <aside className="space-y-4">
            <InsightCard title="Today's focus" body="TalentBank AI Challenge deadline in 2 days" />
            <InsightCard title="Profile signal" body="NLP is your strongest skill this week" />
            <InsightCard title="Recommended action" body="Add evidence to your NLP project before applying" />
          </aside>
        </div>
      </main>
    </div>
  )
}
