import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Bot,
  Building2,
  ClipboardList,
  Compass,
  DollarSign,
  Headphones,
  Heart,
  Lightbulb,
  MessageCircle,
  Rocket,
  ShieldCheck,
  Star,
  Target,
  Trophy,
  Users,
  X,
  Zap,
} from 'lucide-react'
import robotImage from '../../assets/career-os-robot.png'
import { getRandomMountainBg } from './mountainBackgrounds'

const ICONS = { Zap, Compass, Target }

const DISC_OPTIONS = [
  [
    { icon: Zap, title: 'Take charge', text: "I'd step in and make the call to keep things moving.", tone: 'blue' },
    { icon: Users, title: 'Find consensus', text: "I'd facilitate until everyone feels heard.", tone: 'blue' },
    { icon: BarChart3, title: 'Gather data', text: "I'd research before making any decision.", tone: 'blue' },
    { icon: Lightbulb, title: 'Propose a creative alternative', text: "I'd reframe the problem entirely.", tone: 'violet' },
  ],
  [
    { icon: Target, title: 'Define the goal', text: 'I need to know what success looks like before I start.', tone: 'blue' },
    { icon: MessageCircle, title: 'Talk to people', text: "I'd gather input from everyone involved.", tone: 'blue' },
    { icon: ClipboardList, title: 'Make a plan', text: "I'd map out every step before touching anything.", tone: 'blue' },
    { icon: Rocket, title: 'Just start', text: 'I learn best by doing, not planning.', tone: 'violet' },
  ],
  [
    { icon: Trophy, title: 'Results-based', text: 'Tell me the impact my work had.', tone: 'blue' },
    { icon: Users, title: 'Relationship-based', text: 'Tell me how I helped the team.', tone: 'blue' },
    { icon: BarChart3, title: 'Progress-based', text: "Show me how I've improved.", tone: 'blue' },
    { icon: Lightbulb, title: 'Creative-based', text: 'Tell me what was original about my approach.', tone: 'violet' },
  ],
]

const QUESTIONS = [
  {
    round: 1,
    label: 'Work Style',
    kind: 'choice',
    question: "When your team disagrees on the direction of a project, what's your instinct?",
    options: DISC_OPTIONS[0],
  },
  {
    round: 1,
    label: 'Work Style',
    kind: 'choice',
    question: "You're given a new project with no instructions. What do you do first?",
    options: DISC_OPTIONS[1],
  },
  {
    round: 1,
    label: 'Work Style',
    kind: 'choice',
    question: 'What kind of feedback energises you most?',
    options: DISC_OPTIONS[2],
  },
  {
    round: 2,
    label: 'Your Strengths',
    kind: 'text',
    question: 'When does time pass the fastest for you - what were you doing?',
    placeholder: "e.g. When I'm debugging a tricky problem and suddenly everything clicks...",
  },
  {
    round: 2,
    label: 'Your Strengths',
    kind: 'text',
    question: 'What do you find yourself doing without anyone asking you to?',
    placeholder: "e.g. I always end up being the one who organises the group, even when it's not my job...",
  },
  {
    round: 2,
    label: 'Your Strengths',
    kind: 'text',
    question: 'What achievement are you most proud of, and what made it meaningful?',
    placeholder: 'e.g. Leading my team to win the hackathon because I believed in the idea when nobody else did...',
  },
  {
    round: 3,
    label: 'What Matters to You',
    kind: 'tradeoff',
    question: 'If you had to choose one:',
    options: [
      { icon: DollarSign, title: 'High salary, repetitive work', text: 'Financial security, predictable days' },
      { icon: Lightbulb, title: 'Lower salary, creative freedom', text: 'Do what excites you, every day different' },
    ],
  },
  {
    round: 3,
    label: 'What Matters to You',
    kind: 'tradeoff',
    question: 'Which work environment fits you?',
    options: [
      { icon: Headphones, title: 'Work alone, deep focus', text: 'Quiet, independent, go deep on problems' },
      { icon: Zap, title: 'Work with a team, high energy', text: 'Collaborative, fast-moving, always something happening' },
    ],
  },
  {
    round: 3,
    label: 'What Matters to You',
    kind: 'tradeoff',
    question: 'Which opportunity would you take?',
    options: [
      { icon: Building2, title: 'Stable large company', text: 'Structure, prestige, clear career ladder' },
      { icon: Rocket, title: 'Fast-moving startup', text: 'Ambiguity, ownership, build from scratch' },
    ],
  },
  {
    round: 3,
    label: 'What Matters to You',
    kind: 'tradeoff',
    question: 'At the end of the day, what matters?',
    options: [
      { icon: Star, title: "Work you're great at", text: 'Master your craft, be the best' },
      { icon: Heart, title: "Work you're passionate about", text: 'Love what you do, even on hard days' },
    ],
  },
]

const TRAIT_STYLES = {
  blue: {
    cardStyle: {
      background: 'linear-gradient(135deg, rgba(255,255,255,0.74), rgba(219,234,254,0.36))',
      backdropFilter: 'blur(18px)',
      WebkitBackdropFilter: 'blur(18px)',
      border: '1px solid rgba(147, 197, 253, 0.58)',
      borderRadius: '14px',
      padding: '14px 16px',
      boxShadow: '0 18px 42px rgba(37, 99, 235, 0.08), inset 0 1px 0 rgba(255,255,255,0.82), inset 0 -18px 34px rgba(255,255,255,0.22)',
    },
    iconBg: 'border border-white/70 bg-blue-100/45 text-blue-700 shadow-[0_10px_22px_rgba(37,99,235,0.12),inset_0_1px_0_rgba(255,255,255,0.85)] backdrop-blur-md',
    textColor: 'text-blue-700',
  },
  violet: {
    cardStyle: {
      background: 'linear-gradient(135deg, rgba(255,255,255,0.74), rgba(237,233,254,0.42))',
      backdropFilter: 'blur(18px)',
      WebkitBackdropFilter: 'blur(18px)',
      border: '1px solid rgba(196, 181, 253, 0.6)',
      borderRadius: '14px',
      padding: '14px 16px',
      boxShadow: '0 18px 42px rgba(124, 58, 237, 0.08), inset 0 1px 0 rgba(255,255,255,0.82), inset 0 -18px 34px rgba(255,255,255,0.22)',
    },
    iconBg: 'border border-white/70 bg-violet-100/45 text-violet-700 shadow-[0_10px_22px_rgba(124,58,237,0.12),inset_0_1px_0_rgba(255,255,255,0.85)] backdrop-blur-md',
    textColor: 'text-violet-700',
  },
  emerald: {
    cardStyle: {
      background: 'linear-gradient(135deg, rgba(255,255,255,0.74), rgba(209,250,229,0.4))',
      backdropFilter: 'blur(18px)',
      WebkitBackdropFilter: 'blur(18px)',
      border: '1px solid rgba(110, 231, 183, 0.58)',
      borderRadius: '14px',
      padding: '14px 16px',
      boxShadow: '0 18px 42px rgba(16, 185, 129, 0.08), inset 0 1px 0 rgba(255,255,255,0.82), inset 0 -18px 34px rgba(255,255,255,0.22)',
    },
    iconBg: 'border border-white/70 bg-emerald-100/45 text-emerald-700 shadow-[0_10px_22px_rgba(16,185,129,0.12),inset_0_1px_0_rgba(255,255,255,0.85)] backdrop-blur-md',
    textColor: 'text-emerald-700',
  },
}

export default function SelfDiscoveryCard({ selfDiscovery }) {
  const [bg] = useState(getRandomMountainBg)
  const [showFlow, setShowFlow] = useState(false)

  return (
    <>
      <section className="relative overflow-hidden rounded-xl bg-[#faf8ff] p-5 shadow-[0_8px_22px_rgba(44,76,142,0.07)]">
        <img src={bg} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#faf8ff]/97 via-[#faf8ff]/95 to-[#faf8ff]/90" />

      <div className="relative flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-600">
            <Bot size={15} strokeWidth={2.2} />
          </span>
          <h2 className="text-base font-bold text-[#11194a]">Self-Discovery</h2>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-[#9aa6c3]">{selfDiscovery.lastUpdated}</span>
          <button type="button" onClick={() => setShowFlow(true)} className="flex items-center gap-1 rounded-full border border-[#dfe8f7] bg-white px-3 py-1.5 text-xs font-bold text-[#35507d] transition hover:border-blue-300 hover:bg-blue-50">
            Retake <ArrowRight size={12} />
          </button>
        </div>
      </div>

      <div className="relative mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[2fr_3fr]">
        <div>
          <div className="space-y-2.5">
            {selfDiscovery.traits.map((trait) => {
              const Icon = ICONS[trait.icon] ?? Zap
              const style = TRAIT_STYLES[trait.tone] ?? TRAIT_STYLES.blue
              return (
                <div
                  key={trait.id}
                  style={style.cardStyle}
                  className="transition duration-200 hover:brightness-[1.03]"
                >
                  <p className={`flex items-center gap-2 text-sm font-bold ${style.textColor}`}>
                    <span className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full ${style.iconBg}`}>
                      <Icon size={14} strokeWidth={2.2} />
                    </span>
                    {trait.label}
                  </p>
                  <p className="mt-1.5 pl-9 text-xs font-medium text-[#4d5c7d]">{trait.sub}</p>
                </div>
              )
            })}
          </div>
          <p className="mt-3 text-xs font-medium text-[#9aa6c3]">{selfDiscovery.basis}</p>
        </div>

        <div
          style={{
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.8)',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
            padding: '20px',
          }}
        >
          <p className="text-xs font-bold uppercase tracking-wide text-blue-600">How your Career Companion sees you</p>
          <p className="mt-2 text-sm leading-relaxed text-[#3a4669]">{selfDiscovery.narrative}</p>
        </div>
      </div>

        <p className="relative mt-4 text-xs font-medium italic text-[#9aa6c3]">{selfDiscovery.footnote}</p>
      </section>

      {showFlow && <SelfDiscoveryFlow onClose={() => setShowFlow(false)} />}
    </>
  )
}

function SelfDiscoveryFlow({ onClose }) {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [, setAnswers] = useState([])
  const [selected, setSelected] = useState(null)
  const [textAnswer, setTextAnswer] = useState('')
  const [phase, setPhase] = useState('questions')
  const question = QUESTIONS[step]
  const progress = phase === 'result' ? 100 : ((step + 1) / QUESTIONS.length) * 100

  const advance = (answer = 'skipped') => {
    setAnswers((current) => [...current, { step: step + 1, answer }])
    setTextAnswer('')
    if (step >= QUESTIONS.length - 1) {
      setPhase('result')
      return
    }
    setStep((current) => current + 1)
  }

  const chooseOption = (option) => {
    setSelected(option.title)
    window.setTimeout(() => {
      setSelected(null)
      advance(option.title)
    }, 400)
  }

  const goBack = () => {
    if (phase === 'result') {
      setPhase('questions')
      setStep(QUESTIONS.length - 1)
      return
    }
    if (step === 0) {
      onClose()
      return
    }
    setAnswers((current) => current.slice(0, -1))
    setStep((current) => current - 1)
  }

  const finish = (path) => {
    onClose()
    if (path) navigate(path)
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#f4f6fb] px-4 py-8 text-[#11194a] sm:px-6">
      <button type="button" onClick={goBack} className="fixed left-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-white/75 text-[#506181] shadow-[0_12px_30px_rgba(37,99,235,0.10)] backdrop-blur-xl transition hover:text-blue-700">
        <ArrowLeft size={18} />
      </button>
      <button type="button" onClick={onClose} className="fixed right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-white/75 text-[#506181] shadow-[0_12px_30px_rgba(37,99,235,0.10)] backdrop-blur-xl transition hover:text-blue-700">
        <X size={18} />
      </button>

      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-[980px] flex-col justify-center">
        {phase === 'questions' ? (
          <>
            <div className="mb-7">
              <div className="flex items-center justify-between gap-4">
                <p key={`${question.round}-${question.label}`} className="text-sm font-semibold text-[#52627f]">
                  Self-Discovery - Round {question.round}: {question.label}
                </p>
                <p className="text-sm font-bold text-blue-600">{step + 1} / {QUESTIONS.length}</p>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/65 shadow-[inset_0_1px_2px_rgba(15,23,42,0.08)]">
                <div className="h-full rounded-full bg-blue-600 transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <div className="mx-auto w-full max-w-[820px] rounded-[28px] border border-white/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.90),rgba(239,246,255,0.68))] px-6 py-9 shadow-[0_28px_90px_rgba(37,99,235,0.13),inset_0_1px_0_rgba(255,255,255,0.92)] ring-1 ring-blue-100/50 backdrop-blur-2xl sm:px-10">
              <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-[radial-gradient(circle,rgba(219,234,254,0.85),rgba(255,255,255,0.18)_62%)]">
                <img src={robotImage} alt="CareerOS companion" className="h-24 w-24 object-contain drop-shadow-[0_14px_25px_rgba(37,99,235,0.18)]" />
              </div>

              <div className="mx-auto -mt-1 max-w-[520px] rounded-2xl border border-white/80 bg-white/78 px-6 py-4 text-center text-xl font-bold leading-snug text-[#101846] shadow-[0_16px_45px_rgba(37,99,235,0.10),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-xl">
                {question.question}
              </div>

              <div className="mt-7">
                {question.kind === 'choice' && (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {question.options.map((option) => (
                      <AnswerCard key={option.title} option={option} selected={selected === option.title} onClick={() => chooseOption(option)} />
                    ))}
                  </div>
                )}

                {question.kind === 'text' && (
                  <div className="mx-auto max-w-[620px]">
                    <textarea
                      value={textAnswer}
                      onChange={(event) => setTextAnswer(event.target.value)}
                      placeholder={question.placeholder}
                      className="min-h-[130px] w-full resize-none rounded-3xl border border-white/80 bg-white/70 px-5 py-4 text-sm font-medium leading-relaxed text-[#263556] shadow-[0_14px_36px_rgba(37,99,235,0.08),inset_0_1px_0_rgba(255,255,255,0.9)] outline-none backdrop-blur-xl transition placeholder:text-[#9aa6c3] focus:border-blue-300 focus:bg-white/85"
                    />
                    {textAnswer.trim().length > 10 && (
                      <button type="button" onClick={() => advance(textAnswer.trim())} className="mt-5 w-full rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-[0_14px_34px_rgba(37,99,235,0.26)] transition hover:bg-blue-700">
                        Continue <ArrowRight className="ml-1 inline" size={15} />
                      </button>
                    )}
                  </div>
                )}

                {question.kind === 'tradeoff' && (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {question.options.map((option) => (
                      <TradeoffCard key={option.title} option={option} selected={selected === option.title} onClick={() => chooseOption(option)} />
                    ))}
                  </div>
                )}
              </div>

              <button type="button" onClick={() => advance()} className="mx-auto mt-7 block text-sm font-semibold text-[#7e8aa6] underline decoration-dashed underline-offset-4 transition hover:text-blue-700">
                Skip this question
              </button>
            </div>
          </>
        ) : (
          <ResultCard onProfile={() => finish()} onOpportunities={() => finish('/student/opportunities')} />
        )}

        <p className="mx-auto mt-7 flex items-center justify-center gap-2 text-center text-sm font-medium text-[#687897]">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-blue-100 bg-white/80 text-blue-600 shadow-[0_8px_20px_rgba(37,99,235,0.10)]">
            <ShieldCheck size={16} />
          </span>
          Your answers shape your Career DNA - they're never locked in.
        </p>
      </div>
    </div>
  )
}

function AnswerCard({ option, selected, onClick }) {
  const Icon = option.icon
  const tone = option.tone === 'violet' ? 'text-violet-700 bg-violet-100/65' : 'text-blue-700 bg-blue-100/65'

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-h-[108px] items-center gap-4 rounded-2xl border p-4 text-left shadow-[0_12px_30px_rgba(37,99,235,0.07),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-xl transition duration-200 hover:border-blue-300 hover:bg-blue-50/75 ${selected ? 'scale-[1.02] border-blue-500 bg-blue-50' : 'border-white/80 bg-white/68'}`}
    >
      <span className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border border-white/75 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] ${tone}`}>
        <Icon size={25} strokeWidth={2.25} />
      </span>
      <span>
        <span className="block text-base font-bold text-[#121a3a]">{option.title}</span>
        <span className="mt-1 block text-sm font-medium leading-relaxed text-[#596987]">{option.text}</span>
      </span>
    </button>
  )
}

function TradeoffCard({ option, selected, onClick }) {
  const Icon = option.icon

  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-h-[190px] rounded-[24px] border p-6 text-center shadow-[0_14px_38px_rgba(37,99,235,0.08),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-xl transition duration-200 hover:border-blue-300 hover:bg-blue-50/75 ${selected ? 'scale-[1.02] border-blue-500 bg-blue-50' : 'border-white/80 bg-white/68'}`}
    >
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-white/75 bg-blue-100/65 text-blue-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
        <Icon size={28} strokeWidth={2.25} />
      </span>
      <span className="mt-5 block text-lg font-bold text-[#121a3a]">{option.title}</span>
      <span className="mt-2 block text-sm font-medium leading-relaxed text-[#596987]">{option.text}</span>
    </button>
  )
}

function ResultCard({ onProfile, onOpportunities }) {
  const paragraphs = [
    "You work best when you have a clear goal and the freedom to get there your own way. You're a natural executor - you prefer action over endless planning.",
    "Your energy comes from solving real, tangible problems. You get restless when work doesn't have visible impact.",
    "You value creative freedom over stability. You'd rather do meaningful work at a startup than comfortable work at a large company.",
    "This tells me you'd thrive in roles like:",
  ]
  const roles = [
    { label: 'Product Management', className: 'bg-blue-50 text-blue-700 border-blue-100' },
    { label: 'Data-driven Strategy', className: 'bg-violet-50 text-violet-700 border-violet-100' },
    { label: 'Tech Consulting', className: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
  ]

  return (
    <div className="mx-auto w-full max-w-[760px] rounded-[30px] border border-white/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(239,246,255,0.70))] px-7 py-9 shadow-[0_28px_90px_rgba(37,99,235,0.13),inset_0_1px_0_rgba(255,255,255,0.92)] ring-1 ring-blue-100/50 backdrop-blur-2xl sm:px-12">
      <img src={robotImage} alt="CareerOS companion" className="mx-auto h-32 w-32 object-contain drop-shadow-[0_16px_28px_rgba(37,99,235,0.18)]" />
      <h2 className="mt-2 text-center text-2xl font-black text-[#101846]">Here's what I see in you, Chris.</h2>
      <div className="mx-auto mt-6 max-w-[610px] space-y-4 text-left text-[15px] font-medium leading-8 text-[#3a4669]">
        {paragraphs.map((paragraph, index) => (
          <p key={paragraph} className="animate-[slideUp_0.35s_ease-out_both]" style={{ animationDelay: `${index * 80}ms` }}>
            {paragraph}
          </p>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap justify-center gap-3">
        {roles.map((role, index) => (
          <span key={role.label} className={`inline-flex items-center gap-1 rounded-full border px-4 py-2 text-sm font-bold shadow-[0_8px_22px_rgba(37,99,235,0.08)] animate-[fadeInScale_0.28s_ease-out_both] ${role.className}`} style={{ animationDelay: `${340 + index * 100}ms` }}>
            <ArrowRight size={14} /> {role.label}
          </span>
        ))}
      </div>
      <p className="mt-7 text-center text-sm font-semibold text-[#7a87a2]">Want me to find opportunities that match this?</p>
      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button type="button" onClick={onOpportunities} className="rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-[0_14px_34px_rgba(37,99,235,0.26)] transition hover:bg-blue-700">
          Yes, show me <ArrowRight className="ml-1 inline" size={15} />
        </button>
        <button type="button" onClick={onProfile} className="rounded-full border border-blue-100 bg-white/75 px-5 py-3 text-sm font-bold text-blue-700 shadow-[0_10px_24px_rgba(37,99,235,0.08)] transition hover:bg-blue-50">
          Save to my profile
        </button>
      </div>
    </div>
  )
}

