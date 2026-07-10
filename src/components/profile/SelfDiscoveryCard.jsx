import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Bot,
  Brain,
  Building2,
  Check,
  ClipboardList,
  ChevronRight,
  Compass,
  DollarSign,
  Headphones,
  Heart,
  Lightbulb,
  Map,
  MessageCircle,
  Rocket,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Trophy,
  Users,
  X,
  Zap,
} from 'lucide-react'
import robotImage from '../../assets/career-os-robot.png'
import mountainBg from '../../assets/Paper mountain 1.png'
import { ANIMAL_CATEGORIES, ASSESSMENT_QUESTIONS } from '../../data/selfDiscoveryEngine'
import { useSelfDiscoveryStore } from '../../store/useSelfDiscoveryStore'

const ICONS = {
  Zap,
  Users,
  BarChart3,
  Lightbulb,
  Target,
  MessageCircle,
  ClipboardList,
  Rocket,
  Trophy,
  DollarSign,
  Headphones,
  Building2,
  Check,
  Star,
  Heart,
  ShieldCheck,
}

export default function SelfDiscoveryCard({ selfDiscovery: propSelfDiscovery }) {
  const navigate = useNavigate()
  const location = useLocation()
  const store = useSelfDiscoveryStore()
  const [showFlow, setShowFlow] = useState(false)

  useEffect(() => {
    if (location.state?.openAssessment) {
      store.retakeAssessment()
      setShowFlow(true)
      // Clear location state so it doesn't open on reload
      window.history.replaceState({}, document.title)
    }
  }, [location.state])

  // Use store data if completed, otherwise fallback to prop (for backwards compat) or empty state
  const isCompleted = store.hasCompleted()
  const activeData = isCompleted ? store : propSelfDiscovery

  if (!activeData || (!isCompleted && !propSelfDiscovery?.traits)) {
    // Uncompleted Empty State
    return (
      <section className="relative overflow-hidden rounded-xl bg-[#faf8ff] p-6 shadow-[0_8px_22px_rgba(44,76,142,0.07)] border border-blue-100/50">
        <img src={mountainBg} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#faf8ff]/95 via-[#faf8ff]/90 to-[#faf8ff]/80" />
        
        <div className="relative flex flex-col items-center text-center py-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-violet-100 text-violet-600 mb-4 shadow-[0_8px_20px_rgba(124,58,237,0.15)]">
            <Bot size={28} strokeWidth={2} />
          </div>
          <h2 className="text-xl font-bold text-[#11194a]">Discover Your Career Animal</h2>
          <p className="mt-2 max-w-md text-sm text-[#4d5c7d] leading-relaxed">
            Your Career Companion wants to get to know you. Take a brief, 5-minute situational assessment to reveal your work style archetype.
          </p>
          <button
            type="button"
            onClick={() => {
              store.retakeAssessment()
              setShowFlow(true)
            }}
            className="mt-5 flex items-center gap-2 rounded-full bg-blue-600 px-6 py-2.5 text-sm font-bold text-white shadow-[0_12px_30px_rgba(37,99,235,0.25)] transition hover:bg-blue-700 hover:scale-[1.02]"
          >
            Start Assessment <ArrowRight size={16} />
          </button>
        </div>
        {showFlow && <SelfDiscoveryFlow onClose={() => setShowFlow(false)} />}
      </section>
    )
  }

  // Loaded/Completed state
  const animalName = activeData.primaryAnimal?.name || 'Lion'
  const animalEmoji = activeData.primaryAnimal?.emoji || '🦁'
  const archetype = activeData.primaryAnimal?.archetype || 'The Commander'
  const categoryId = activeData.primaryAnimal?.category || 'leadership'
  const categoryInfo = ANIMAL_CATEGORIES[categoryId] || ANIMAL_CATEGORIES.leadership
  const confidence = activeData.confidence || 30
  
  // Format narrative paragraphs (might be a string or array)
  const paragraphs = Array.isArray(activeData.narrative) 
    ? activeData.narrative 
    : [activeData.narrative || '']

  // Category Colors mapping
  const categoryColors = {
    leadership: 'bg-amber-50 text-amber-700 border-amber-100',
    relational: 'bg-blue-50 text-blue-700 border-blue-100',
    execution: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  }

  return (
    <>
      <section className="relative overflow-hidden rounded-xl bg-[#faf8ff] p-5 shadow-[0_8px_22px_rgba(44,76,142,0.07)] border border-[#e2eaf8]">
        <img src={mountainBg} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#faf8ff]/97 via-[#faf8ff]/95 to-[#faf8ff]/90" />

        <div className="relative flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-600">
              <Bot size={15} strokeWidth={2.2} />
            </span>
            <h2 className="text-base font-bold text-[#11194a]">Career Animal Style</h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-[#9aa6c3]">{activeData.lastUpdated || 'Recently updated'}</span>
            <button
              type="button"
              onClick={() => {
                store.retakeAssessment()
                setShowFlow(true)
              }}
              className="flex items-center gap-1 rounded-full border border-[#dfe8f7] bg-white px-3 py-1.5 text-xs font-bold text-[#35507d] transition hover:border-blue-300 hover:bg-blue-50"
            >
              Retake <ArrowRight size={12} />
            </button>
          </div>
        </div>

        <div className="relative mt-4 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.8fr]">
          {/* Animal Card Display */}
          <div className="flex flex-col items-center justify-center rounded-2xl border border-white/80 bg-white/60 p-5 shadow-[0_8px_24px_rgba(37,99,235,0.04)] backdrop-blur-md text-center">
            <span className="text-6xl filter drop-shadow-md animate-[bounce_3s_ease-in-out_infinite]">{animalEmoji}</span>
            <h3 className="mt-3 text-lg font-extrabold text-[#11194a]">{animalName}</h3>
            <p className="text-xs font-semibold text-slate-500">{archetype}</p>
            <span className={`mt-2 rounded-full border px-2.5 py-0.5 text-[10px] font-bold tracking-wide uppercase ${categoryColors[categoryId]}`}>
              {categoryInfo.label}
            </span>
            
            {/* Confidence metric */}
            <div className="mt-5 w-full">
              <div className="flex items-center justify-between text-[11px] font-bold text-[#637094]">
                <span>Profile Confidence</span>
                <span className="text-blue-600">{confidence}%</span>
              </div>
              <div className="mt-1 h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                <div 
                  className="h-full bg-blue-600 rounded-full transition-all duration-1000 ease-out" 
                  style={{ width: `${confidence}%` }}
                />
              </div>
            </div>
          </div>

          {/* Text Summary Display */}
          <div className="flex flex-col justify-between rounded-2xl border border-white/60 bg-white/75 p-5 shadow-[0_8px_24px_rgba(37,99,235,0.03)] backdrop-blur-md">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-blue-600">AI Companion insights</p>
              <p className="mt-2 text-sm leading-relaxed text-[#3a4669] font-semibold">
                {paragraphs[0]}
              </p>
              {activeData.emergingAnimal && (
                <p className="mt-3 text-xs font-bold text-[#637094] flex items-center gap-1.5">
                  <span className="inline-block w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                  Recent activity suggests developing <strong className="text-[#11194a]">{activeData.emergingAnimal.emoji} {activeData.emergingAnimal.name}</strong> tendencies.
                </p>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <p className="text-[11px] font-semibold text-[#9aa6c3] italic">
                Evolves naturally with your projects & reflections.
              </p>
              <button
                type="button"
                onClick={() => navigate('/student/career-animal')}
                className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700"
              >
                View Full Profile <ChevronRight size={14} className="mt-0.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {showFlow && <SelfDiscoveryFlow onClose={() => setShowFlow(false)} />}
    </>
  )
}

const DEEPER_QUESTIONS = [
  // ─── 1. PLANNING VS IMPROVISING (7 Questions) ───
  {
    label: 'Working Style: Planning vs Improvising',
    question: 'When starting a new project, what is your approach?',
    options: [
      { title: 'Methodical Planner', text: 'I map out tasks, deadlines, and milestones before doing any work.', value: 'planning', icon: 'ClipboardList' },
      { title: 'Flexible Improviser', text: 'I jump in, experiment first, and plan as I go based on what I learn.', value: 'improvising', icon: 'Zap' },
    ]
  },
  {
    label: 'Working Style: Planning vs Improvising',
    question: 'How do you handle a weekend task?',
    options: [
      { title: 'Structured Planner', text: 'Write down a clean schedule and stick to it.', value: 'planning', icon: 'ClipboardList' },
      { title: 'Spontaneous Doer', text: 'Do it whenever inspiration strikes.', value: 'improvising', icon: 'Lightbulb' },
    ]
  },
  {
    label: 'Working Style: Planning vs Improvising',
    question: 'Your project deadlines are suddenly brought forward by two weeks. What is your reaction?',
    options: [
      { title: 'Methodical Planner', text: 'Refine the plan, adjust dependencies, and systematically coordinate.', value: 'planning', icon: 'Target' },
      { title: 'Adaptive Improviser', text: 'Work late, hustle, and wing the execution to make it happen.', value: 'improvising', icon: 'Zap' },
    ]
  },
  {
    label: 'Working Style: Planning vs Improvising',
    question: 'You are preparing for an important technical presentation. How do you prepare?',
    options: [
      { title: 'Polished Presenter', text: 'Write slides weeks early, script the speech, and practice extensively.', value: 'planning', icon: 'Trophy' },
      { title: 'Spontaneous Speaker', text: 'Draft high-level bullet points and deliver a dynamic, spontaneous talk.', value: 'improvising', icon: 'MessageCircle' },
    ]
  },
  {
    label: 'Working Style: Planning vs Improvising',
    question: 'How do you manage your daily tasks and backlog?',
    options: [
      { title: 'Checklist Optimizer', text: 'Update a strictly prioritized checklist every morning.', value: 'planning', icon: 'ClipboardList' },
      { title: 'Intuitive Builder', text: 'Scan the project landscape and work on what feels most critical right now.', value: 'improvising', icon: 'Zap' },
    ]
  },
  {
    label: 'Working Style: Planning vs Improvising',
    question: 'How do you approach coding a complex feature?',
    options: [
      { title: 'Software Architect', text: 'Draft data models and architectural flowcharts before opening the editor.', value: 'planning', icon: 'Building2' },
      { title: 'Iterative Prototyper', text: 'Start writing prototype code, refactoring and restructuring as I go.', value: 'improvising', icon: 'Rocket' },
    ]
  },
  {
    label: 'Working Style: Planning vs Improvising',
    question: 'You are given a highly ambiguous task with no specs. How do you start?',
    options: [
      { title: 'Requirements Analyst', text: 'Draft a clarification document listing all open questions for approval.', value: 'planning', icon: 'BarChart3' },
      { title: 'Rapid Prototyper', text: 'Build a quick throwaway mockup to show options and get feedback.', value: 'improvising', icon: 'Lightbulb' },
    ]
  },

  // ─── 2. INDEPENDENT VS COLLABORATIVE (7 Questions) ───
  {
    label: 'Working Style: Independent vs Collaborative',
    question: 'How do you prefer to tackle a difficult coding problem or bug?',
    options: [
      { title: 'Focused Soloist', text: 'Sit alone in a quiet room, dive deep into docs, and solve it myself.', value: 'independent', icon: 'Headphones' },
      { title: 'Synergistic Team player', text: 'Schedule a pair programming session and talk it out with a peer.', value: 'collaborative', icon: 'Users' },
    ]
  },
  {
    label: 'Working Style: Independent vs Collaborative',
    question: 'What type of project environment gives you the most energy?',
    options: [
      { title: 'Autonomous Owner', text: 'Owning a complex piece of architecture completely independently.', value: 'independent', icon: 'Star' },
      { title: 'Collaborative Driver', text: 'Lively brainstorming sessions with a multidisciplinary crew.', value: 'collaborative', icon: 'Users' },
    ]
  },
  {
    label: 'Working Style: Independent vs Collaborative',
    question: 'You find a critical bug in a shared code repository. What do you do?',
    options: [
      { title: 'Efficient Fixer', text: 'Fix the bug silently, submit a PR, and merge it immediately.', value: 'independent', icon: 'Zap' },
      { title: 'Team Communicator', text: 'Start a thread in the team channel to discuss the root cause first.', value: 'collaborative', icon: 'MessageCircle' },
    ]
  },
  {
    label: 'Working Style: Independent vs Collaborative',
    question: 'How do you prefer to learn a brand-new framework or language?',
    options: [
      { title: 'Self-Directed Learner', text: 'Read the official documentation front-to-back and build solo projects.', value: 'independent', icon: 'BarChart3' },
      { title: 'Cooperative Learner', text: 'Take an interactive workshop or follow along with a cohort-based study group.', value: 'collaborative', icon: 'Users' },
    ]
  },
  {
    label: 'Working Style: Independent vs Collaborative',
    question: 'What is your preferred format for code reviews and PR feedback?',
    options: [
      { title: 'Async Reviewer', text: 'Detailed, thread-based comments in GitHub to review on my own time.', value: 'independent', icon: 'ClipboardList' },
      { title: 'Sync Reviewer', text: 'A live screen-sharing session to walk through changes and explain design ideas.', value: 'collaborative', icon: 'MessageCircle' },
    ]
  },
  {
    label: 'Working Style: Independent vs Collaborative',
    question: 'How do you prefer to share status updates with your team?',
    options: [
      { title: 'Written Logger', text: 'Write a comprehensive text summary in Slack or a status portal.', value: 'independent', icon: 'ClipboardList' },
      { title: 'Verbal Communicator', text: 'Share updates verbally during a quick face-to-face check-in or huddle.', value: 'collaborative', icon: 'MessageCircle' },
    ]
  },
  {
    label: 'Working Style: Independent vs Collaborative',
    question: 'What is your ideal workspace layout?',
    options: [
      { title: 'Deep Focus Soloist', text: 'A quiet, private study where I can block out all visual/audio inputs.', value: 'independent', icon: 'Headphones' },
      { title: 'Connected Builder', text: 'A shared lab/studio where I can turn around and talk to peers instantly.', value: 'collaborative', icon: 'Users' },
    ]
  },

  // ─── 3. STRUCTURED VS FLEXIBLE (8 Questions) ───
  {
    label: 'Working Style: Structured vs Flexible',
    question: 'What is your preference for framework and tooling architecture?',
    options: [
      { title: 'Process Architect', text: 'Highly opinionated frameworks with standardized project layouts.', value: 'structured', icon: 'Building2' },
      { title: 'Agile Developer', text: 'Minimalist, unopinionated libraries that let me write code my own way.', value: 'flexible', icon: 'Zap' },
    ]
  },
  {
    label: 'Working Style: Structured vs Flexible',
    question: 'How strictly do you follow formatting, style guides, and conventions?',
    options: [
      { title: 'Conventions Purist', text: 'Adhere precisely to linters and strict formatting rules in all cases.', value: 'structured', icon: 'ClipboardList' },
      { title: 'Pragmatic Builder', text: 'Focus on shipping logic quickly; clean up formatting during refactors.', value: 'flexible', icon: 'Zap' },
    ]
  },
  {
    label: 'Working Style: Structured vs Flexible',
    question: 'How do you prefer to manage tasks within a sprints framework?',
    options: [
      { title: 'Scrum Process Driver', text: 'Follow structured Scrum rules, sprint sizing, and ticket allocations.', value: 'structured', icon: 'Building2' },
      { title: 'Kanban Adaptor', text: 'Work off a fluid Kanban queue, grabbing tasks dynamically as needed.', value: 'flexible', icon: 'Rocket' },
    ]
  },
  {
    label: 'Working Style: Structured vs Flexible',
    question: 'How do you approach documenting codebases and feature guides?',
    options: [
      { title: 'Documentation Lead', text: 'Maintain a comprehensive wiki mapping out architecture and guidelines.', value: 'structured', icon: 'ClipboardList' },
      { title: 'Self-Documenting Coder', text: 'Add helpful inline code comments and self-explanatory test files.', value: 'flexible', icon: 'Lightbulb' },
    ]
  },
  {
    label: 'Working Style: Structured vs Flexible',
    question: 'A client requests a feature change mid-sprint. How do you react?',
    options: [
      { title: 'Scrum Master', text: 'Route the request through a formal change request and update ticket scopes.', value: 'structured', icon: 'Building2' },
      { title: 'Agile Adaptor', text: 'Swap the tasks dynamically and address the changes immediately.', value: 'flexible', icon: 'Zap' },
    ]
  },
  {
    label: 'Working Style: Structured vs Flexible',
    question: 'How do you prefer to learn new technical fields or domains?',
    options: [
      { title: 'Systematic Student', text: 'Follow a complete, step-by-step syllabus from start to finish.', value: 'structured', icon: 'ClipboardList' },
      { title: 'Just-in-Time Learner', text: 'Look up specific concepts right when I need them for real problems.', value: 'flexible', icon: 'Lightbulb' },
    ]
  },
  {
    label: 'Working Style: Structured vs Flexible',
    question: 'What is your philosophy on unit testing and test coverage requirements?',
    options: [
      { title: 'Quality Assurance Lead', text: 'Enforce strict rules (e.g. 80%+ coverage) before merging PRs.', value: 'structured', icon: 'ShieldCheck' },
      { title: 'High-Impact Tester', text: 'Focus tests only on highly critical flows and complex edge cases.', value: 'flexible', icon: 'Rocket' },
    ]
  },
  {
    label: 'Working Style: Structured vs Flexible',
    question: 'What is your preferred workspace organization style?',
    options: [
      { title: 'Minimalist Organizer', text: 'A completely clean desk with absolute minimalism and order.', value: 'structured', icon: 'Building2' },
      { title: 'Fluid Tinkerer', text: 'A creative workspace with monitors, notes, and references scattered around.', value: 'flexible', icon: 'Zap' },
    ]
  },

  // ─── 4. FAST DECISIONS VS CAREFUL ANALYSIS (8 Questions) ───
  {
    label: 'Working Style: Fast Decisions vs Careful Analysis',
    question: 'When an unexpected bug occurs in production, what do you do first?',
    options: [
      { title: 'Action-First Responder', text: 'Deploy a quick hotfix to restore service immediately.', value: 'fast', icon: 'Zap' },
      { title: 'Analytical Debugger', text: 'Roll back and run detailed diagnostics to find the root cause.', value: 'careful', icon: 'ShieldCheck' },
    ]
  },
  {
    label: 'Working Style: Fast Decisions vs Careful Analysis',
    question: 'What is your decision-making motto?',
    options: [
      { title: 'Fast Decision Maker', text: '"Speed is key; we can iterate and fix mistakes later."', value: 'fast', icon: 'Zap' },
      { title: 'Careful Analyst', text: '"Measure twice, cut once; prevent errors before they happen."', value: 'careful', icon: 'ShieldCheck' },
    ]
  },
  {
    label: 'Working Style: Fast Decisions vs Careful Analysis',
    question: 'Your team is evaluating a new library or tool. How do you proceed?',
    options: [
      { title: 'Experimental Innovator', text: 'Integrate it into a quick test branch and run it live within hours.', value: 'fast', icon: 'Rocket' },
      { title: 'Risk Evaluator', text: 'Audit its open issues, maintainer history, and security logs first.', value: 'careful', icon: 'ShieldCheck' },
    ]
  },
  {
    label: 'Working Style: Fast Decisions vs Careful Analysis',
    question: 'How do you handle code reviews for standard pull requests?',
    options: [
      { text: 'Scan for logic flaws, check tests, and approve within minutes to unblock.', value: 'fast', title: 'Streamlined Approver', icon: 'Zap' },
      { text: 'Pull the branch locally, check all edge cases, and run index scans.', value: 'careful', title: 'Rigorous Auditor', icon: 'ShieldCheck' },
    ]
  },
  {
    label: 'Working Style: Fast Decisions vs Careful Analysis',
    question: 'How do you choose design patterns and architectural solutions?',
    options: [
      { title: 'Lean Engineer', text: 'Implement the simplest working code first and iterate if it scales.', value: 'fast', icon: 'Zap' },
      { title: 'Robust Planner', text: 'Model complex patterns early to prevent potential architectural refactors.', value: 'careful', icon: 'Building2' },
    ]
  },
  {
    label: 'Working Style: Fast Decisions vs Careful Analysis',
    question: 'A user reports an issue with an unclear root cause. What do you do?',
    options: [
      { title: 'Intuitive Solver', text: 'Propose a quick patch based on my strongest intuition.', value: 'fast', icon: 'Lightbulb' },
      { text: 'Wait to collect user metrics and error traces to prove the exact cause.', value: 'careful', title: 'Data-Backed Solver', icon: 'BarChart3' },
    ]
  },
  {
    label: 'Working Style: Fast Decisions vs Careful Analysis',
    question: 'How do you approach refactoring complex legacy features?',
    options: [
      { title: 'Agile Refactorer', text: 'Rebuild sections quickly and rely on integration tests to catch bugs.', value: 'fast', icon: 'Zap' },
      { title: 'Safe Refactorer', text: 'Run detailed impact analyses and dry-runs to map out all dependencies.', value: 'careful', icon: 'ShieldCheck' },
    ]
  },
  {
    label: 'Working Style: Fast Decisions vs Careful Analysis',
    question: 'How do you verify datastore modifications and database migrations?',
    options: [
      { title: 'Agile Operations Driver', text: 'Deploy the migration branch and closely monitor API metrics.', value: 'fast', icon: 'Rocket' },
      { title: 'Database Auditor', text: 'Run EXPLAIN ANALYZE on index queries and verify locks on test replicas first.', value: 'careful', icon: 'ShieldCheck' },
    ]
  }
]

export function SelfDiscoveryFlow({ onClose, initialPhase = 'intro' }) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState([])
  const [selected, setSelected] = useState(null)
  const [textAnswer, setTextAnswer] = useState('')
  const [phase, setPhase] = useState(initialPhase) // intro | questions | result | deeperQuestions

  // Deeper Onboarding State
  const [deeperStep, setDeeperStep] = useState(0)
  const [deeperAnswers, setDeeperAnswers] = useState([])

  const question = ASSESSMENT_QUESTIONS[step]
  const progress = phase === 'result' ? 100 : phase === 'deeperQuestions' ? ((deeperStep + 1) / DEEPER_QUESTIONS.length) * 100 : ((step + 1) / ASSESSMENT_QUESTIONS.length) * 100

  const handleNext = (answerVal) => {
    // Save current step answer
    const newAnswers = [...answers, { questionIndex: step, answer: answerVal }]
    setAnswers(newAnswers)
    setSelected(null)
    setTextAnswer('')

    if (step >= ASSESSMENT_QUESTIONS.length - 1) {
      // Complete!
      const store = useSelfDiscoveryStore.getState()
      store.completeAssessment(newAnswers)
      setPhase('result')
    } else {
      setStep((prev) => prev + 1)
    }
  }

  const chooseOption = (option) => {
    setSelected(option.id)
    setTimeout(() => {
      handleNext(option)
    }, 450)
  }

  const goBack = () => {
    if (phase === 'deeperQuestions') {
      if (deeperStep === 0) {
        setPhase('result')
      } else {
        setDeeperAnswers((prev) => prev.slice(0, -1))
        setDeeperStep((prev) => prev - 1)
      }
      return
    }
    if (phase === 'intro') {
      onClose()
      return
    }
    if (phase === 'result') {
      setPhase('questions')
      setStep(ASSESSMENT_QUESTIONS.length - 1)
      return
    }
    if (step === 0) {
      onClose()
      return
    }
    // Remove last answer
    setAnswers((prev) => prev.slice(0, -1))
    setStep((prev) => prev - 1)
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#f4f6fb] px-4 py-8 text-[#11194a] sm:px-6">
      <button 
        type="button" 
        onClick={goBack} 
        className="fixed left-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-white/75 text-[#506181] shadow-[0_12px_30px_rgba(37,99,235,0.10)] backdrop-blur-xl transition hover:text-blue-700"
      >
        <ArrowLeft size={18} />
      </button>
      <button 
        type="button" 
        onClick={onClose} 
        className="fixed right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-white/75 text-[#506181] shadow-[0_12px_30px_rgba(37,99,235,0.10)] backdrop-blur-xl transition hover:text-blue-700"
      >
        <X size={18} />
      </button>

      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-[980px] flex-col justify-center">
        {phase === 'intro' && (
          <div className="mx-auto w-full max-w-[760px] rounded-[28px] border border-white/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(239,246,255,0.70))] px-6 py-9 text-center shadow-[0_28px_90px_rgba(37,99,235,0.13),inset_0_1px_0_rgba(255,255,255,0.92)] ring-1 ring-blue-100/50 backdrop-blur-2xl sm:px-12">
            <img src={robotImage} alt="CareerOS companion" className="mx-auto h-24 w-24 object-contain drop-shadow-[0_14px_25px_rgba(37,99,235,0.18)]" />
            <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-blue-600">Self discovery</p>
            <h2 className="mt-2 text-2xl font-black tracking-[-0.01em] text-[#101846]">Before I recommend what fits you, I want to understand how you naturally work.</h2>
            <p className="mx-auto mt-4 max-w-[560px] text-sm font-semibold leading-7 text-[#4d5c7d]">
              This takes about 5 minutes. There are no right or wrong answers. I am building a starting point, and I will keep learning as you use CareerOS.
            </p>
            <button
              type="button"
              onClick={() => setPhase('questions')}
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-[0_14px_34px_rgba(37,99,235,0.26)] transition hover:bg-blue-700"
            >
              Begin <ArrowRight size={16} />
            </button>
          </div>
        )}

        {phase === 'questions' && (
          <>
            <div className="mb-7 max-w-[820px] mx-auto w-full">
              <div className="flex items-center justify-between gap-4">
                <p className="text-xs font-bold text-[#52627f] uppercase tracking-wider">
                  Companion Assessment · Round {question.round}
                </p>
                <p className="text-sm font-black text-blue-600">{step + 1} / {ASSESSMENT_QUESTIONS.length}</p>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/65 shadow-[inset_0_1px_2px_rgba(15,23,42,0.08)]">
                <div className="h-full rounded-full bg-blue-600 transition-all duration-300" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <div className="mx-auto w-full max-w-[820px] rounded-[30px] border border-white/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(239,246,255,0.70))] px-6 py-8 shadow-[0_28px_90px_rgba(37,99,235,0.13),inset_0_1px_0_rgba(255,255,255,0.92)] ring-1 ring-blue-100/50 backdrop-blur-2xl sm:px-12">
              <div className="flex items-start gap-4 pb-6 border-b border-slate-100">
                <img src={robotImage} alt="Companion" className="h-14 w-14 object-contain shrink-0" />
                <div className="rounded-2xl bg-white/70 border border-slate-100 p-4 shadow-sm">
                  <p className="text-sm font-bold text-[#11194a] leading-relaxed">
                    "{question.question}"
                  </p>
                </div>
              </div>

              <div className="mt-6">
                {question.kind === 'choice' && (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {question.options.map((option) => (
                      <AnswerCard 
                        key={option.id} 
                        option={option} 
                        selected={selected === option.id} 
                        onClick={() => chooseOption(option)} 
                      />
                    ))}
                  </div>
                )}

                {question.kind === 'text' && (
                  <div className="mx-auto max-w-[620px]">
                    <textarea
                      value={textAnswer}
                      onChange={(event) => setTextAnswer(event.target.value)}
                      placeholder={question.placeholder}
                      className="min-h-[130px] w-full resize-none rounded-3xl border border-white/80 bg-white/70 px-5 py-4 text-sm font-semibold leading-relaxed text-[#263556] shadow-[0_14px_36px_rgba(37,99,235,0.08),inset_0_1px_0_rgba(255,255,255,0.9)] outline-none backdrop-blur-xl transition placeholder:text-[#9aa6c3] focus:border-blue-300 focus:bg-white/85"
                    />
                    <div className="flex justify-end mt-3">
                      <button 
                        type="button" 
                        disabled={textAnswer.trim().length < 5}
                        onClick={() => handleNext(textAnswer.trim())} 
                        className="rounded-full bg-blue-600 px-6 py-2.5 text-sm font-bold text-white shadow-[0_14px_34px_rgba(37,99,235,0.26)] transition hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Continue <ArrowRight className="ml-1 inline" size={15} />
                      </button>
                    </div>
                  </div>
                )}

                {question.kind === 'tradeoff' && (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {question.options.map((option) => (
                      <TradeoffCard 
                        key={option.id} 
                        option={option} 
                        selected={selected === option.id} 
                        onClick={() => chooseOption(option)} 
                      />
                    ))}
                  </div>
                )}
              </div>

              <button 
                type="button" 
                onClick={() => handleNext(null)} 
                className="mx-auto mt-6 block text-sm font-semibold text-[#7e8aa6] underline decoration-dashed underline-offset-4 transition hover:text-blue-700"
              >
                Skip this question
              </button>
            </div>
          </>
        )}

        {phase === 'deeperQuestions' && (
          <>
            <div className="mb-7 max-w-[820px] mx-auto w-full">
              <div className="flex items-center justify-between gap-4">
                <p className="text-xs font-bold text-[#52627f] uppercase tracking-wider">
                  Companion Assessment · Level 2 Working Style
                </p>
                <p className="text-sm font-black text-[#6366f1]">{deeperStep + 1} / {DEEPER_QUESTIONS.length}</p>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/65 shadow-[inset_0_1px_2px_rgba(15,23,42,0.08)]">
                <div className="h-full bg-[#6366f1] rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <div className="mx-auto w-full max-w-[820px] rounded-[30px] border border-white/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(239,246,255,0.70))] px-6 py-8 shadow-[0_28px_90px_rgba(37,99,235,0.13),inset_0_1px_0_rgba(255,255,255,0.92)] ring-1 ring-blue-100/50 backdrop-blur-2xl sm:px-12">
              <div className="flex items-start gap-4 pb-6 border-b border-slate-100">
                <img src={robotImage} alt="Companion" className="h-14 w-14 object-contain shrink-0" />
                <div className="rounded-2xl bg-white/70 border border-slate-100 p-4 shadow-sm w-full">
                  <p className="text-xs font-extrabold text-[#6366f1] uppercase tracking-widest mb-1">
                    {DEEPER_QUESTIONS[deeperStep].label}
                  </p>
                  <p className="text-sm font-bold text-[#11194a] leading-relaxed">
                    "{DEEPER_QUESTIONS[deeperStep].question}"
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {DEEPER_QUESTIONS[deeperStep].options.map((opt, idx) => (
                  <AnswerCard
                    key={idx}
                    option={opt}
                    selected={selected === idx}
                    onClick={() => {
                      setSelected(idx)
                      setTimeout(() => {
                        const nextAnswers = [...deeperAnswers, opt.value]
                        setDeeperAnswers(nextAnswers)
                        setSelected(null)
                        if (deeperStep >= DEEPER_QUESTIONS.length - 1) {
                          const planningCount = nextAnswers.filter(a => a === 'planning').length
                          const improvisingCount = nextAnswers.filter(a => a === 'improvising').length
                          const collaborativeCount = nextAnswers.filter(a => a === 'collaborative').length
                          const independentCount = nextAnswers.filter(a => a === 'independent').length
                          const structuredCount = nextAnswers.filter(a => a === 'structured').length
                          const flexibleCount = nextAnswers.filter(a => a === 'flexible').length
                          const carefulCount = nextAnswers.filter(a => a === 'careful').length
                          const fastCount = nextAnswers.filter(a => a === 'fast').length

                          const totalPlanning = planningCount + improvisingCount || 1
                          const totalCollab = collaborativeCount + independentCount || 1
                          const totalStructure = structuredCount + flexibleCount || 1
                          const totalDecision = carefulCount + fastCount || 1

                          const spectrums = {
                            planningVsImprovising: Math.round((planningCount / totalPlanning) * 100),
                            independentVsCollaborative: Math.round((collaborativeCount / totalCollab) * 100),
                            structuredVsFlexible: Math.round((structuredCount / totalStructure) * 100),
                            fastDecisionsVsCarefulAnalysis: Math.round((carefulCount / totalDecision) * 100),
                          }
                          
                          const store = useSelfDiscoveryStore.getState()
                          store.completeDeeperAssessment(spectrums)
                          setPhase('result')
                        } else {
                          setDeeperStep(prev => prev + 1)
                        }
                      }, 450)
                    }}
                  />
                ))}
              </div>

              <button 
                type="button" 
                onClick={() => {
                  if (deeperStep >= DEEPER_QUESTIONS.length - 1) {
                    setPhase('result')
                  } else {
                    setDeeperStep(prev => prev + 1)
                  }
                }} 
                className="mx-auto mt-6 block text-sm font-semibold text-[#7e8aa6] underline decoration-dashed underline-offset-4 transition hover:text-blue-700"
              >
                Skip this question
              </button>
            </div>
          </>
        )}

        {phase === 'result' && (
          <AnimalRevealCard onClose={onClose} onStartDeeper={() => {
            setDeeperStep(0)
            setDeeperAnswers([])
            setPhase('deeperQuestions')
          }} />
        )}

        {phase === 'questions' && (
          <p className="mx-auto mt-7 flex items-center justify-center gap-2 text-center text-xs font-semibold text-[#687897]">
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-blue-100 bg-white/80 text-blue-600 shadow-sm">
              <ShieldCheck size={13} />
            </span>
            Your answers shape your work style. Nothing is set in stone.
          </p>
        )}
      </div>
    </div>
  )
}

function AnswerCard({ option, selected, onClick }) {
  const Icon = ICONS[option.icon] || Zap

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-h-[96px] items-center gap-4 rounded-2xl border p-4 text-left shadow-[0_8px_24px_rgba(37,99,235,0.04),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-xl transition duration-200 hover:border-blue-300 hover:bg-blue-50/50 ${
        selected ? 'scale-[1.02] border-blue-500 bg-blue-50/70' : 'border-white/80 bg-white/60'
      }`}
    >
      <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-white/70 bg-blue-50 text-blue-700 shadow-sm">
        <Icon size={20} strokeWidth={2.2} />
      </span>
      <span>
        <span className="block text-sm font-semibold text-[#121a3a]">{option.title}</span>
        <span className="mt-1 block text-xs font-semibold leading-relaxed text-[#596987]">{option.text}</span>
      </span>
    </button>
  )
}

function TradeoffCard({ option, selected, onClick }) {
  const Icon = ICONS[option.icon] || Zap

  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-h-[170px] rounded-2xl border p-5 text-center shadow-[0_12px_28px_rgba(37,99,235,0.05),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-xl transition duration-200 hover:border-blue-300 hover:bg-blue-50/50 ${
        selected ? 'scale-[1.02] border-blue-500 bg-blue-50/70' : 'border-white/80 bg-white/60'
      }`}
    >
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/70 bg-blue-50 text-blue-700 shadow-sm">
        <Icon size={22} strokeWidth={2.2} />
      </span>
      <span className="mt-4 block text-base font-semibold text-[#121a3a]">{option.title}</span>
      <span className="mt-1 block text-xs font-semibold leading-relaxed text-[#596987]">{option.text}</span>
    </button>
  )
}

function AnimalRevealCard({ onClose, onStartDeeper }) {
  const navigate = useNavigate()
  const store = useSelfDiscoveryStore()

  const animal = store.primaryAnimal
  const paragraphs = store.narrative || []
  const confidence = store.confidence || 30
  const reasons = store.strengthReasons || []

  const categoryColors = {
    leadership: 'bg-amber-50 text-amber-700 border-amber-100',
    relational: 'bg-blue-50 text-blue-700 border-blue-100',
    execution: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  }

  const categoryLabel = ANIMAL_CATEGORIES[animal.category]?.label || 'Leadership'

  return (
    <div className="mx-auto w-full max-w-[760px] rounded-[30px] border border-white/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(239,246,255,0.70))] px-6 py-8 shadow-[0_28px_90px_rgba(37,99,235,0.13),inset_0_1px_0_rgba(255,255,255,0.92)] ring-1 ring-blue-100/50 backdrop-blur-2xl sm:px-12">
      <img src={robotImage} alt="Companion" className="mx-auto h-24 w-24 object-contain drop-shadow-[0_12px_24px_rgba(37,99,235,0.15)]" />
      <h2 className="mt-2 text-center text-xl font-black text-[#101846]">Here's what I've noticed about you, Chris.</h2>
      
      {/* Narrative paragraphs */}
      <div className="mx-auto mt-6 max-w-[610px] space-y-3.5 text-left text-sm font-semibold leading-relaxed text-[#3a4669]">
        {paragraphs.map((p, index) => (
          <p key={index} className="animate-[slideUp_0.35s_ease-out_both]" style={{ animationDelay: `${index * 150}ms` }}>
            {p}
          </p>
        ))}
      </div>

      <div className="mt-7 text-center">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Based on what I know today, your current Career Animal is</p>
        
        {/* Large reveal */}
        <div className="mt-3 inline-flex flex-col items-center p-6 rounded-2xl bg-white/50 border border-white shadow-sm max-w-[340px] w-full animate-[animalReveal_0.6s_ease-out_both]">
          <span className="text-7xl filter drop-shadow-md">{animal.emoji}</span>
          <h3 className="mt-4 text-2xl font-black text-[#11194a]">{animal.name}</h3>
          <p className="text-xs font-extrabold text-slate-400 mt-0.5 uppercase tracking-wider">{animal.archetype}</p>
          <span className={`mt-2 rounded-full border px-2.5 py-0.5 text-[10px] font-bold tracking-wide uppercase ${categoryColors[animal.category]}`}>
            {categoryLabel}
          </span>
        </div>
      </div>

      {/* Why matched section */}
      {reasons.length > 0 && (
        <div className="mx-auto mt-6 max-w-[420px] rounded-xl border border-white/60 bg-white/30 p-4 shadow-sm text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Why I matched you</p>
          <div className="flex flex-wrap justify-center gap-3">
            {reasons.map((reason) => (
              <span key={reason} className="inline-flex items-center gap-1 text-xs font-bold text-slate-700 bg-white/70 px-2.5 py-1 rounded-full border border-slate-100 shadow-sm">
                <Check size={12} className="text-emerald-500" /> {reason}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Deeper Onboarding Invitation Card */}
      {!store.completedDeeperAt && (
        <div className="mx-auto mt-7 max-w-[700px] w-full rounded-2xl border border-[#e8ecf4] bg-[#fafbfe]/95 p-6 shadow-sm text-left">
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eeebff] text-[#5850ec] border border-[#e0dbfa] mt-0.5">
              <Sparkles size={18} className="stroke-[2.2] animate-pulse" />
            </span>
            <div>
              <h4 className="text-[#101846] text-[15px] font-bold leading-tight">Want a deeper, more personalized match?</h4>
              <p className="mt-1 text-[12px] font-medium text-[#5f6b85] leading-relaxed">
                Answer 30 more questions to help Career OS understand you on a deeper level — including your motivations, work style, values and ideal environments.
              </p>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f2f0ff] text-[#5c54ed] border border-[#e0dbfa]">
                    <Target size={18} className="stroke-[2.2]" />
                  </span>
                  <div>
                    <h5 className="text-[#101846] text-[11.5px] font-bold leading-snug">More accurate results</h5>
                    <p className="text-[#64748b] text-[10.5px] font-medium leading-normal mt-0.5">Get a more precise match with deeper insights.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f2f0ff] text-[#5c54ed] border border-[#e0dbfa]">
                    <Brain size={18} className="stroke-[2.2]" />
                  </span>
                  <div>
                    <h5 className="text-[#101846] text-[11.5px] font-bold leading-snug">Discover hidden strengths</h5>
                    <p className="text-[#64748b] text-[10.5px] font-medium leading-normal mt-0.5">Uncover your unique strengths and natural advantages.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f2f0ff] text-[#5c54ed] border border-[#e0dbfa]">
                    <Map size={18} className="stroke-[2.2]" />
                  </span>
                  <div>
                    <h5 className="text-[#101846] text-[11.5px] font-bold leading-snug">Better career recommendations</h5>
                    <p className="text-[#64748b] text-[10.5px] font-medium leading-normal mt-0.5">Receive more relevant career paths and action plans.</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-[#f1f3f7] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={onStartDeeper}
                  className="rounded-xl bg-[#5f30e2] hover:bg-[#4f20cf] text-white text-[12.5px] font-bold px-6 py-3 transition duration-150 flex items-center justify-center gap-1.5 shadow-[0_4px_12px_rgba(95,48,226,0.15)] shrink-0 cursor-pointer"
                >
                  <span>Continue for deeper insights (30 more questions)</span>
                  <ArrowRight size={13} className="stroke-[2.5]" />
                </button>
                
                <div className="flex items-center gap-4 w-full sm:w-auto justify-end sm:justify-start">
                  <div className="h-8 w-[1px] bg-slate-200 hidden sm:block" />
                  <div className="flex flex-col text-right sm:text-left">
                    <span className="text-[#5f6b85] text-[11px] font-medium">Estimated time to complete:</span>
                    <span className="text-[#101846] text-[12px] font-extrabold mt-0.5">10-15 minutes</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Profile confidence */}
      <div className="mx-auto mt-6 max-w-[500px] text-center">
        <div className="flex items-center justify-between text-xs font-bold text-[#637094]">
          <span>Profile Confidence</span>
          <span className="text-blue-600">{confidence}%</span>
        </div>
        <div className="mt-1.5 h-2 w-full rounded-full bg-slate-100 overflow-hidden shadow-inner">
          <div className="h-full bg-blue-600 rounded-full animate-[confidenceFill_1s_ease-out_both]" style={{ width: `${confidence}%` }} />
        </div>
        <p className="mt-2 text-xs text-slate-400 font-semibold leading-relaxed">
          "{store.confidenceMessage}"
        </p>
      </div>

      <p className="mt-6 text-center text-xs font-medium text-slate-400 italic">
        This profile isn't locked in. It grows and shifts as you continue adding experiences.
      </p>

      {/* Actions */}
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button 
          type="button" 
          onClick={() => {
            onClose()
            navigate('/student/opportunities')
          }} 
          className="rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-[0_14px_34px_rgba(37,99,235,0.26)] transition hover:bg-blue-700"
        >
          Explore Opportunities <ArrowRight className="ml-1 inline" size={15} />
        </button>
        <button 
          type="button" 
          onClick={() => {
            onClose()
            navigate('/student/career-animal')
          }} 
          className="rounded-full border border-blue-100 bg-white/75 px-5 py-3 text-sm font-bold text-blue-700 shadow-[0_10px_24px_rgba(37,99,235,0.08)] transition hover:bg-blue-50"
        >
          View Full Animal Profile
        </button>
      </div>
    </div>
  )
}
