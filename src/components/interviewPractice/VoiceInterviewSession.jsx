import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowRight,
  Briefcase,
  Building2,
  CheckCircle2,
  Clock,
  FileText,
  Flame,
  Mic,
  MicOff,
  Pause,
  Play,
  RefreshCw,
  Settings,
  Square,
  User,
  X,
} from 'lucide-react'

// ── State machine ───────────────────────────────────────────────────────────
const STATES = {
  IDLE: 'idle',
  AI_SPEAKING: 'ai-speaking',
  GAP: 'gap',
  USER_SPEAKING: 'user-speaking',
  PAUSED: 'paused',
  ENDED: 'ended',
}

// ── Scripted conversation (role-aware) ──────────────────────────────────────
function buildScript({ role, company, persona }) {
  const r = role || 'Software Engineer'
  const c = company || 'Google'
  const p = persona || 'Tech Lead'
  return [
    { role: 'ai', text: `Good afternoon, Chris. I'm Alex, a ${p} at ${c}. Thank you for taking the time today. Before we dive in, could you take a moment to introduce yourself and walk me through your background?` },
    { role: 'user', text: `Of course. I'm Chris Lee, a final-year Computer Science student. I've been building full-stack applications for the past two years, most recently a career intelligence platform with FastAPI and React, integrating AI pipelines using ${c}'s agent toolkit.` },
    { role: 'ai', text: `Interesting background. You mentioned AI pipelines — can you describe a specific technical challenge you faced when integrating the multi-agent architecture, and how you resolved it?` },
    { role: 'user', text: `Sure. The main challenge was managing session state across multiple agents in Library Mode. The runner doesn't persist context between calls by default, so I had to implement a DatabaseSessionService with PostgreSQL and pgvector to anchor agent memory across turns.` },
    { role: 'ai', text: `Good. How did you handle concurrency when multiple users triggered agents simultaneously? And what was your approach to rate limiting on the LLM side?` },
    { role: 'user', text: `We put each user's session behind an asyncio semaphore so simultaneous turns queue rather than trample state, and used a token-bucket limiter per API key to stay under the provider's rate ceiling — with exponential backoff on 429s.` },
    { role: 'ai', text: `Solid. Last question for now — walk me through a time you had to make a technical decision under real ambiguity. What was the tradeoff, and how did you defend it?` },
  ]
}

// ── Waveform bars (CSS-driven) ──────────────────────────────────────────────
function Waveform({ tone = 'indigo', paused }) {
  const color = tone === 'green' ? '#10B981' : '#5B6CF9'
  const heights = [6, 14, 10, 18, 8, 16, 6, 12]
  return (
    <div className="flex items-center gap-[3px]" style={{ height: 20, padding: '0 2px', color }}>
      {heights.map((h, i) => (
        <span
          key={i}
          className={`wave-bar ${paused ? 'is-paused' : ''}`}
          style={{
            width: 3,
            borderRadius: 2,
            background: 'currentColor',
            height: h,
            animation: paused ? 'none' : `waveDance .7s ease-in-out ${i * 0.08}s infinite alternate`,
            opacity: paused ? 0.4 : 1,
            transform: paused ? 'scaleY(.2)' : undefined,
          }}
        />
      ))}
    </div>
  )
}

// ── Typing indicator ────────────────────────────────────────────────────────
function TypingBubble() {
  return (
    <div className="msg-row ai flex flex-col items-start gap-1.5" style={{ animation: 'msgIn .3s ease forwards' }}>
      <div className="flex items-center gap-2 px-1">
        <div className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full border border-[#5B6CF9] bg-[#5B6CF9]/15 text-[12px] text-[#5B6CF9]">🤖</div>
        <span className="text-[11px] font-semibold uppercase tracking-[.05em] text-[#5A6080]">Alex (AI Interviewer)</span>
      </div>
      <div className="flex w-fit items-center gap-1 rounded-[14px] rounded-tl-[4px] border border-[#2A2E4A] bg-[#1E2235] px-4 py-3">
        <span className="typing-dot" />
        <span className="typing-dot" style={{ animationDelay: '.2s' }} />
        <span className="typing-dot" style={{ animationDelay: '.4s' }} />
      </div>
    </div>
  )
}

// ── Message bubble ──────────────────────────────────────────────────────────
function MessageBubble({ msg, isSpeakingAI }) {
  const isAI = msg.role === 'ai'
  return (
    <div
      className={`msg-row flex flex-col gap-1.5 ${isAI ? 'items-start' : 'items-end'}`}
      style={{ animation: 'msgIn .3s ease forwards' }}
    >
      <div className={`flex items-center gap-2 px-1 ${isAI ? '' : 'flex-row-reverse'}`}>
        <div className={`flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full border text-[12px] ${
          isAI ? 'border-[#5B6CF9] bg-[#5B6CF9]/15 text-[#5B6CF9]' : 'border-[#10B981] bg-[#10B981]/15 text-[#10B981]'
        }`}>
          {isAI ? '🤖' : '👤'}
        </div>
        <span className="text-[11px] font-semibold uppercase tracking-[.05em] text-[#5A6080]">{isAI ? 'Alex (AI Interviewer)' : 'Chris Lee'}</span>
        <span className="text-[11px] text-[#5A6080]">{msg.ts}</span>
        <Waveform tone={isAI ? 'indigo' : 'green'} paused={msg.wavePaused} />
      </div>
      <div
        className={`max-w-[80%] rounded-[14px] px-4 py-3.5 text-[14px] leading-[1.65] ${
          isAI
            ? `border border-[#2A2E4A] bg-[#1E2235] text-[#EAECF5] rounded-tl-[4px] ${isSpeakingAI ? 'border-[#5B6CF9] ring-2 ring-[#5B6CF9]/15' : ''}`
            : 'border border-[#10B981]/30 bg-[#10B981]/15 text-[#EAECF5] rounded-tr-[4px]'
        }`}
      >
        {msg.text}
      </div>
    </div>
  )
}

// ── System note ─────────────────────────────────────────────────────────────
function SystemNote({ text }) {
  return <div className="py-1 text-center text-[11px] text-[#5A6080]">{text}</div>
}

// ── Idle screen ─────────────────────────────────────────────────────────────
function IdleScreen({ role, company, difficulty, persona, tone, sessionMin, gapSeconds, onStart }) {
  const tags = [
    { icon: Briefcase, label: role || 'Software Engineer' },
    { icon: Building2, label: company || 'Any company' },
    { icon: Flame, label: difficulty || 'Advanced' },
    { icon: User, label: `${persona || 'Tech Lead'} · ${tone || 'Formal'}` },
    { icon: Clock, label: `${sessionMin} min · ${gapSeconds}s gap` },
  ]
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-10">
      <div className="mb-5 flex h-[72px] w-[72px] items-center justify-center rounded-full border border-[#5B6CF9] bg-[#5B6CF9]/15 text-[30px]" style={{ boxShadow: '0 0 32px rgba(91,108,249,.35)' }}>
        🤖
      </div>
      <div className="mb-2 text-[20px] font-semibold text-[#EAECF5]">Ready when you are, Chris</div>
      <div className="mb-7 max-w-[400px] text-center text-[14px] leading-relaxed text-[#A0A8C8]">
        Your AI interviewer is standing by. Hit Start to begin the session — questions will appear here as they're asked.
      </div>
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {tags.map((t) => (
          <span key={t.label} className="flex items-center gap-1 rounded-full border border-[#363B5E] bg-[#1E2235] px-3 py-1.5 text-[12px] font-medium text-[#A0A8C8]">
            <t.icon className="h-3 w-3" />
            {t.label}
          </span>
        ))}
      </div>
      <button
        type="button"
        onClick={onStart}
        className="flex items-center gap-2.5 rounded-full bg-[#5B6CF9] px-8 py-3.5 text-[15px] font-semibold text-white transition hover:-translate-y-[1px] active:scale-[.97]"
        style={{ boxShadow: '0 4px 24px rgba(91,108,249,.35)' }}
      >
        <Play className="h-4 w-4" />
        Start interview
      </button>
    </div>
  )
}

// ── Gap timer ───────────────────────────────────────────────────────────────
function GapTimer({ visible, secsRemaining, totalSecs, urgent, speaking, onMicClick }) {
  const dash = 301.6
  const pct = Math.max(0, secsRemaining) / totalSecs
  const offset = dash - pct * dash
  const ringColor = speaking ? '#10B981' : urgent ? '#EF4444' : '#F59E0B'
  const micBase = speaking
    ? 'border-[#10B981] bg-[#10B981]/15 text-[#10B981]'
    : urgent
      ? 'border-[#EF4444] bg-[#EF4444]/15 text-[#EF4444]'
      : 'border-[#F59E0B] bg-[#F59E0B]/18 text-[#F59E0B]'

  return (
    <div className="relative flex shrink-0 items-center justify-center px-6 py-3" aria-hidden={!visible}>
      <div
        className={`flex flex-col items-center justify-center transition-all duration-300 ${urgent && !speaking ? 'urgent-glow' : ''}`}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'scale(1)' : 'scale(.85)',
          pointerEvents: visible ? 'auto' : 'none',
        }}
      >
        <div className="relative">
          <svg width="110" height="110" viewBox="0 0 110 110">
            <circle cx="55" cy="55" r="48" fill="none" stroke="#363B5E" strokeWidth="5" />
            <circle
              cx="55"
              cy="55"
              r="48"
              fill="none"
              stroke={ringColor}
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={dash}
              strokeDashoffset={offset}
              style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%', transition: 'stroke-dashoffset .9s linear, stroke .3s' }}
            />
          </svg>
          <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
            <button
              type="button"
              onClick={onMicClick}
              className={`flex h-14 w-14 items-center justify-center rounded-full border transition ${micBase}`}
              title={speaking ? 'Tap to stop' : 'Tap to speak'}
            >
              <Mic className="h-5 w-5" />
            </button>
            {!speaking ? (
              <div className={`mt-1 text-[10px] font-semibold tabular-nums ${urgent ? 'text-[#EF4444]' : 'text-[#F59E0B]'}`}>
                {secsRemaining}s
              </div>
            ) : null}
          </div>
        </div>
        <div className="mt-2.5 text-center text-[12px] font-medium text-[#A0A8C8]">
          {speaking ? (
            <span>Speaking — <span className="font-semibold text-[#10B981]">tap mic to finish</span></span>
          ) : (
            <span>Your turn — <span className={`font-semibold ${urgent ? 'text-[#EF4444]' : 'text-[#F59E0B]'}`}>{secsRemaining}s</span> to respond</span>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Dock state ──────────────────────────────────────────────────────────────
function DockStateIndicator({ state }) {
  const cfg = {
    [STATES.IDLE]:          { icon: Clock,           label: 'Waiting to start',        tone: 'idle',   hint: 'Press Start to begin your session' },
    [STATES.AI_SPEAKING]:   { icon: Mic,             label: 'AI interviewer speaking', tone: 'ai',     hint: 'Listen carefully — your gap timer starts when they finish' },
    [STATES.GAP]:           { icon: Clock,           label: 'Your turn to respond',    tone: 'gap',    hint: 'Tap the mic or the ring timer to start speaking' },
    [STATES.USER_SPEAKING]: { icon: Mic,             label: 'You are speaking',        tone: 'user',   hint: 'Tap the mic again when you\'re done' },
    [STATES.PAUSED]:        { icon: Pause,           label: 'Session paused',          tone: 'paused', hint: 'Press play to resume' },
    [STATES.ENDED]:         { icon: CheckCircle2,    label: 'Session ended',           tone: 'idle',   hint: '' },
  }[state]
  const TONE = {
    ai:     'bg-[#5B6CF9]/15 text-[#5B6CF9] border-[#5B6CF9]/30',
    user:   'bg-[#10B981]/15 text-[#10B981] border-[#10B981]/30',
    gap:    'bg-[#F59E0B]/18 text-[#F59E0B] border-[#F59E0B]/30',
    paused: 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/30',
    idle:   'bg-[#1E2235] text-[#5A6080] border-[#2A2E4A]',
  }[cfg.tone]
  const Icon = cfg.icon
  return (
    <div className="flex flex-1 items-center gap-2.5">
      <div className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-[12px] font-medium ${TONE}`}>
        <Icon className="h-3.5 w-3.5" />
        {cfg.label}
      </div>
      {cfg.hint ? <span className="text-[12px] text-[#5A6080]">{cfg.hint}</span> : null}
    </div>
  )
}

// ── Ended overlay ───────────────────────────────────────────────────────────
function EndedOverlay({ visible, stats, onRestart, onViewFeedback }) {
  return (
    <div
      className="absolute inset-0 z-10 flex items-center justify-center transition-opacity duration-300"
      style={{
        background: 'rgba(15,17,32,.92)',
        backdropFilter: 'blur(6px)',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <div className="w-full max-w-[420px] rounded-[20px] border border-[#363B5E] bg-[#181B2E] p-10 text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-[#10B981] bg-[#10B981]/15 text-[28px]">✅</div>
        <div className="mb-2 text-[20px] font-bold text-[#EAECF5]">Session complete!</div>
        <div className="mb-7 text-[14px] leading-relaxed text-[#A0A8C8]">
          Great work, Chris. Your feedback report is being generated — it'll be ready in your session history.
        </div>
        <div className="mb-7 flex justify-center gap-8">
          <Stat val={stats.duration} label="Duration" />
          <Stat val={stats.exchanges} label="Exchanges" />
          <Stat val={`${stats.avgGap}s`} label="Avg gap used" />
        </div>
        <div className="flex gap-2.5">
          <button
            type="button"
            onClick={onRestart}
            className="flex h-[42px] flex-1 items-center justify-center gap-1.5 rounded-[10px] border border-[#363B5E] bg-transparent text-[13px] font-medium text-[#A0A8C8] transition hover:bg-[#1E2235] hover:text-[#EAECF5]"
          >
            <RefreshCw className="h-3.5 w-3.5" /> Restart
          </button>
          <button
            type="button"
            onClick={onViewFeedback}
            className="flex h-[42px] flex-1 items-center justify-center gap-1.5 rounded-[10px] bg-[#5B6CF9] text-[13px] font-medium text-white transition hover:opacity-90"
          >
            <FileText className="h-3.5 w-3.5" /> View feedback
          </button>
        </div>
      </div>
    </div>
  )
}

function Stat({ val, label }) {
  return (
    <div>
      <div className="text-[22px] font-bold text-[#EAECF5]">{val}</div>
      <div className="mt-0.5 text-[11px] text-[#5A6080]">{label}</div>
    </div>
  )
}

// ── Icon topbar button ──────────────────────────────────────────────────────
function TopIconBtn({ onClick, title, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#363B5E] bg-transparent text-[#A0A8C8] transition hover:border-[#363B5E] hover:bg-[#252942] hover:text-[#EAECF5]"
    >
      {children}
    </button>
  )
}

// ── Main component ──────────────────────────────────────────────────────────
export default function VoiceInterviewSession({ mode, role, company, onExit }) {
  const sessionSeconds = 720 // 12 min demo
  const gapSeconds = 10

  // Derive display metadata from mode/role/company
  const meta = useMemo(() => ({
    role: role || (mode?.name === 'Mock Interview' ? 'Software Engineer' : mode?.name || 'Practice'),
    company: company || 'Google',
    persona: mode?.name === 'Company Specific' ? 'Hiring Manager' : 'Tech Lead',
    difficulty: mode?.tagLabel?.replace('Level ', 'Level ') || 'Advanced',
    tone: 'Formal',
  }), [mode, role, company])

  const script = useMemo(() => buildScript({ role: meta.role, company: meta.company, persona: meta.persona }), [meta])

  const [state, setState] = useState(STATES.IDLE)
  const prevStateRef = useRef(STATES.IDLE)
  const [sessionRemaining, setSessionRemaining] = useState(sessionSeconds)
  const [gapRemaining, setGapRemaining] = useState(gapSeconds)
  const [showGap, setShowGap] = useState(false)
  const [messages, setMessages] = useState([])
  const [typing, setTyping] = useState(false)
  const [scriptIdx, setScriptIdx] = useState(0)
  const [exchangeCount, setExchangeCount] = useState(0)
  const [gapHistory, setGapHistory] = useState([])
  const [ended, setEnded] = useState(false)

  const sessionTimerRef = useRef(null)
  const gapTimerRef = useRef(null)
  const aiTimeoutRef = useRef(null)
  const userSpeakTimeoutRef = useRef(null)
  const transcriptRef = useRef(null)

  const now = () => {
    const d = new Date()
    return `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`
  }

  const pushMessage = (role, text) => {
    setMessages((prev) => [...prev, { role, text, ts: now(), wavePaused: false }])
    // Pause the waveform after the "spoken" duration
    const speakMs = text.length * 60 + 1000
    window.setTimeout(() => {
      setMessages((prev) => {
        const copy = [...prev]
        const last = copy[copy.length - 1]
        if (last && !last.wavePaused) copy[copy.length - 1] = { ...last, wavePaused: true }
        return copy
      })
    }, speakMs)
  }

  // Auto scroll to bottom on new messages
  useEffect(() => {
    if (transcriptRef.current) transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight
  }, [messages, typing])

  // Session timer
  useEffect(() => {
    if (state === STATES.IDLE || state === STATES.PAUSED || state === STATES.ENDED) return
    sessionTimerRef.current = window.setInterval(() => {
      setSessionRemaining((r) => {
        if (r <= 1) {
          window.clearInterval(sessionTimerRef.current)
          endSessionInternal()
          return 0
        }
        return r - 1
      })
    }, 1000)
    return () => window.clearInterval(sessionTimerRef.current)
  }, [state])

  // Gap timer
  useEffect(() => {
    if (state !== STATES.GAP) return
    gapTimerRef.current = window.setInterval(() => {
      setGapRemaining((r) => {
        if (r <= 1) {
          window.clearInterval(gapTimerRef.current)
          onGapTimeout()
          return 0
        }
        return r - 1
      })
    }, 1000)
    return () => window.clearInterval(gapTimerRef.current)
  }, [state])

  // Cleanup on unmount
  useEffect(() => () => {
    window.clearInterval(sessionTimerRef.current)
    window.clearInterval(gapTimerRef.current)
    window.clearTimeout(aiTimeoutRef.current)
    window.clearTimeout(userSpeakTimeoutRef.current)
  }, [])

  const aiSpeak = () => {
    setScriptIdx((idx) => {
      if (idx >= script.length) {
        endSessionInternal()
        return idx
      }
      const entry = script[idx]
      if (entry.role !== 'ai') {
        // Should not happen after user speak; safeguard
        return idx
      }
      setState(STATES.AI_SPEAKING)
      setTyping(true)
      const delay = 900 + entry.text.length * 12
      aiTimeoutRef.current = window.setTimeout(() => {
        setTyping(false)
        pushMessage('ai', entry.text)
        setExchangeCount((c) => c + 1)
        // Advance script index past this AI entry
        setScriptIdx((cur) => cur + 1)
        // Move to user's gap
        window.setTimeout(() => {
          setState(STATES.GAP)
          setShowGap(true)
          setGapRemaining(gapSeconds)
        }, 600)
      }, delay)
      return idx
    })
  }

  const startSession = () => {
    setSessionRemaining(sessionSeconds)
    setScriptIdx(0)
    setExchangeCount(0)
    setGapHistory([])
    setMessages([])
    setEnded(false)
    setShowGap(false)
    setGapRemaining(gapSeconds)
    // Kick off AI first turn
    window.setTimeout(() => aiSpeak(), 100)
  }

  const onGapTimeout = () => {
    setGapHistory((prev) => [...prev, gapSeconds])
    setShowGap(false)
    setMessages((prev) => [...prev, { role: 'system', text: '⏱ Gap elapsed — AI interviewer is moving on', ts: now() }])
    window.setTimeout(() => {
      if (state !== STATES.PAUSED && state !== STATES.ENDED) aiSpeak()
    }, 800)
  }

  const startUserSpeak = () => {
    if (state !== STATES.GAP && state !== STATES.USER_SPEAKING) return
    if (state === STATES.USER_SPEAKING) { stopUserSpeak(); return }
    window.clearInterval(gapTimerRef.current)
    const used = gapSeconds - gapRemaining
    setGapHistory((prev) => [...prev, used])
    setState(STATES.USER_SPEAKING)
    // Simulate user speaking then auto-stop
    const speakDur = 2200 + Math.random() * 3000
    userSpeakTimeoutRef.current = window.setTimeout(() => stopUserSpeak(), speakDur)
  }

  const stopUserSpeak = () => {
    window.clearTimeout(userSpeakTimeoutRef.current)
    setShowGap(false)
    // Push next user script line if any
    setScriptIdx((idx) => {
      if (idx < script.length && script[idx].role === 'user') {
        pushMessage('user', script[idx].text)
        setExchangeCount((c) => c + 1)
        window.setTimeout(() => aiSpeak(), 800)
        return idx + 1
      }
      window.setTimeout(() => aiSpeak(), 800)
      return idx
    })
    setState(STATES.AI_SPEAKING)
  }

  const togglePause = () => {
    if (state === STATES.IDLE || state === STATES.ENDED) return
    if (state === STATES.PAUSED) {
      setState(prevStateRef.current)
    } else {
      prevStateRef.current = state
      window.clearInterval(sessionTimerRef.current)
      window.clearInterval(gapTimerRef.current)
      window.clearTimeout(aiTimeoutRef.current)
      window.clearTimeout(userSpeakTimeoutRef.current)
      setState(STATES.PAUSED)
    }
  }

  const confirmRestart = () => {
    if (typeof window !== 'undefined' && !window.confirm('Restart this session from the beginning?')) return
    resetSession()
    startSession()
  }

  const resetSession = () => {
    window.clearInterval(sessionTimerRef.current)
    window.clearInterval(gapTimerRef.current)
    window.clearTimeout(aiTimeoutRef.current)
    window.clearTimeout(userSpeakTimeoutRef.current)
    setState(STATES.IDLE)
    setSessionRemaining(sessionSeconds)
    setGapRemaining(gapSeconds)
    setShowGap(false)
    setMessages([])
    setTyping(false)
    setScriptIdx(0)
    setExchangeCount(0)
    setGapHistory([])
    setEnded(false)
  }

  const endSessionInternal = () => {
    window.clearInterval(sessionTimerRef.current)
    window.clearInterval(gapTimerRef.current)
    window.clearTimeout(aiTimeoutRef.current)
    window.clearTimeout(userSpeakTimeoutRef.current)
    setShowGap(false)
    setState(STATES.ENDED)
    setEnded(true)
  }

  const sessionMinDisplay = Math.floor(sessionSeconds / 60)
  const timerM = Math.floor(sessionRemaining / 60)
  const timerS = sessionRemaining % 60
  const timerWarn = sessionRemaining <= 60

  const liveTone =
    state === STATES.IDLE || state === STATES.ENDED
      ? { dot: 'bg-[#5A6080]', label: state === STATES.ENDED ? 'Ended' : 'Ready' }
      : state === STATES.PAUSED
        ? { dot: 'bg-[#F59E0B]', label: 'Paused' }
        : { dot: 'bg-[#10B981] animate-pulse', label: state === STATES.AI_SPEAKING ? 'AI speaking' : state === STATES.USER_SPEAKING ? 'Listening' : state === STATES.GAP ? 'Your turn' : 'Live' }

  const urgentGap = gapRemaining <= 3
  const speakingNow = state === STATES.USER_SPEAKING

  const avgGap = gapHistory.length ? Math.round(gapHistory.reduce((a, b) => a + b, 0) / gapHistory.length) : 0
  const usedSeconds = sessionSeconds - sessionRemaining
  const durationStr = `${Math.floor(usedSeconds / 60)}:${String(usedSeconds % 60).padStart(2, '0')}`

  // Dock mic state
  const micDisabled = state === STATES.IDLE || state === STATES.AI_SPEAKING || state === STATES.ENDED || state === STATES.PAUSED
  const micListening = state === STATES.USER_SPEAKING

  return (
    <div className="fixed inset-0 z-[500] flex flex-col overflow-hidden bg-[#0F1120] text-[#EAECF5]" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes waveDance { from { transform: scaleY(.3); opacity: .5; } to { transform: scaleY(1); opacity: 1; } }
        @keyframes msgIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes typingBounce { 0%, 80%, 100% { transform: scale(1); opacity: .4; } 40% { transform: scale(1.4); opacity: 1; background: #5B6CF9; } }
        .typing-dot { width: 6px; height: 6px; border-radius: 50%; background: #5A6080; animation: typingBounce 1.2s ease-in-out infinite; display: inline-block; margin: 0 2px; }
        @keyframes urgentPulse { from { box-shadow: 0 0 8px rgba(239,68,68,.3); } to { box-shadow: 0 0 24px rgba(239,68,68,.7); } }
        @keyframes micRipple { 0% { box-shadow: 0 0 0 0 rgba(16,185,129,.5); } 70% { box-shadow: 0 0 0 14px rgba(16,185,129,0); } 100% { box-shadow: 0 0 0 0 rgba(16,185,129,0); } }
        @keyframes glowPulse { from { transform: scale(1); } to { transform: scale(1.2); } }
        .urgent-glow::before { content: ''; position: absolute; width: 140px; height: 140px; border-radius: 50%; background: radial-gradient(circle, rgba(239,68,68,.18) 0%, transparent 70%); animation: glowPulse .6s ease-in-out infinite alternate; z-index: -1; }
        .mic-ripple { animation: micRipple 1.4s ease-in-out infinite; }
      `}} />

      {/* Topbar */}
      <div className="flex h-[52px] shrink-0 items-center justify-between border-b border-[#2A2E4A] bg-[#181B2E] px-6">
        <div className="flex items-center gap-3.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#5B6CF9] text-[14px] font-bold text-white">C</div>
          <span className="text-[14px] font-semibold text-[#EAECF5]">AI Interview</span>
          <span className="h-[18px] w-[.5px] bg-[#363B5E]" />
          <span className="text-[12px] text-[#A0A8C8]">{meta.role} · {meta.company} · {meta.difficulty}</span>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 rounded-full border border-[#363B5E] px-3 py-1 text-[12px] font-medium text-[#A0A8C8]">
            <span className={`h-[7px] w-[7px] rounded-full ${liveTone.dot}`} />
            {liveTone.label}
          </div>
          <span className="h-[18px] w-[.5px] bg-[#363B5E]" />
          <span className={`tabular-nums text-[13px] font-semibold ${timerWarn ? 'text-[#F59E0B]' : 'text-[#EAECF5]'}`}>{timerM}:{String(timerS).padStart(2, '0')}</span>
          <span className="h-[18px] w-[.5px] bg-[#363B5E]" />
          <TopIconBtn title="Settings"><Settings className="h-4 w-4" /></TopIconBtn>
          <TopIconBtn title="Close" onClick={onExit}><X className="h-4 w-4" /></TopIconBtn>
        </div>
      </div>

      {/* Main */}
      <div className="relative flex flex-1 flex-col overflow-hidden">
        {/* Transcript / idle */}
        <div ref={transcriptRef} className="flex flex-1 flex-col overflow-y-auto py-6">
          {state === STATES.IDLE && messages.length === 0 ? (
            <IdleScreen
              role={meta.role}
              company={meta.company}
              difficulty={meta.difficulty}
              persona={meta.persona}
              tone={meta.tone}
              sessionMin={sessionMinDisplay}
              gapSeconds={gapSeconds}
              onStart={() => { setState(STATES.AI_SPEAKING); startSession() }}
            />
          ) : (
            <div className="mx-auto flex w-full max-w-[760px] flex-col gap-5 px-6">
              {messages.map((m, i) => (
                m.role === 'system'
                  ? <SystemNote key={i} text={m.text} />
                  : <MessageBubble key={i} msg={m} isSpeakingAI={state === STATES.AI_SPEAKING && i === messages.length - 1 && m.role === 'ai'} />
              ))}
              {typing ? <TypingBubble /> : null}
            </div>
          )}
        </div>

        {/* Gap timer */}
        <GapTimer
          visible={showGap && (state === STATES.GAP || state === STATES.USER_SPEAKING)}
          secsRemaining={gapRemaining}
          totalSecs={gapSeconds}
          urgent={urgentGap}
          speaking={speakingNow}
          onMicClick={startUserSpeak}
        />

        {/* Ended overlay */}
        <EndedOverlay
          visible={ended}
          stats={{ duration: durationStr, exchanges: exchangeCount, avgGap }}
          onRestart={() => { resetSession(); startSession() }}
          onViewFeedback={() => { resetSession(); onExit && onExit() }}
        />
      </div>

      {/* Control dock */}
      <div className="shrink-0 border-t border-[#2A2E4A] bg-[#181B2E] px-6 py-4">
        <div className="mx-auto flex max-w-[760px] items-center justify-between gap-4">
          <DockStateIndicator state={state} />

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={confirmRestart}
              title="Restart session"
              className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-[#363B5E] bg-[#1E2235] text-[#A0A8C8] transition hover:bg-[#252942] hover:text-[#EAECF5]"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={togglePause}
              title={state === STATES.PAUSED ? 'Resume' : 'Pause'}
              className={`flex h-[42px] w-[42px] items-center justify-center rounded-full border transition ${
                state === STATES.PAUSED
                  ? 'border-[#F59E0B]/40 bg-[#F59E0B]/18 text-[#F59E0B]'
                  : 'border-[#363B5E] bg-[#1E2235] text-[#A0A8C8] hover:bg-[#252942] hover:text-[#EAECF5]'
              }`}
            >
              {state === STATES.PAUSED ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
            </button>
            <button
              type="button"
              onClick={startUserSpeak}
              disabled={micDisabled}
              title={micListening ? 'Tap to stop' : 'Tap to speak'}
              className={`flex h-[52px] w-[52px] items-center justify-center rounded-full transition ${
                micListening
                  ? 'bg-[#10B981] text-white mic-ripple'
                  : micDisabled
                    ? 'cursor-not-allowed border border-[#2A2E4A] bg-[#1E2235] text-[#5A6080]'
                    : 'border border-[#363B5E] bg-[#252942] text-[#A0A8C8]'
              }`}
            >
              {micListening ? <Mic className="h-5 w-5" /> : micDisabled ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </button>
            <button
              type="button"
              onClick={endSessionInternal}
              className="flex items-center gap-1.5 rounded-full border border-[#EF4444]/35 bg-[#EF4444]/10 px-4 py-2 text-[13px] font-medium text-[#FCA5A5] transition hover:border-[#EF4444]/50 hover:bg-[#EF4444]/20"
            >
              <Square className="h-3.5 w-3.5" /> End
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
