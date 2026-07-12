import React, { useEffect, useRef, useState } from 'react'
import { ArrowLeft, Mic, MicOff, Send, X } from 'lucide-react'
import robotImg from '../../assets/career-os-robot.png'

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'
const GROQ_MODEL = 'llama3-8b-8192'

function getSystemPrompt(modeName, role, company) {
  if (modeName === 'Ice Breaker') {
    return 'You are a friendly English conversation partner helping a Malaysian university student named Chris build confidence speaking English. Keep responses short (2-3 sentences max). Ask simple, warm questions about their daily life. Never correct grammar directly — instead naturally model the correct version in your response. Be encouraging and warm. Start by warmly greeting Chris and asking one simple question about their day.'
  }
  if (modeName === 'Daily English') {
    return "You are an English vocabulary coach for a Malaysian university student named Chris. After each user message, respond naturally, then offer ONE vocabulary upgrade — show a better professional word for something they said. Format: respond naturally first, then say '✨ Upgrade: try [better word] instead of [their word] — it sounds more professional.' Keep it to one upgrade per message. Be encouraging. Start by asking Chris to describe what they did today."
  }
  if (modeName === 'Story Builder') {
    return "You are an interview coach helping a Malaysian university student named Chris structure their experiences into compelling stories — but never mention STAR directly. Ask guiding questions that naturally draw out situation, task, action, and result. When they've shared a complete story, reflect it back in a polished, interview-ready format. Be warm but professional. Start by asking Chris to share an experience they're proud of."
  }
  if (modeName === 'Mock Interview') {
    return `You are a professional interviewer conducting a ${role || 'Software Engineer'} interview with Chris. Ask one behavioral interview question at a time. After the user answers, give specific feedback: what was strong, what was missing, and one concrete improvement. Then ask the next question. Be professional but encouraging. Focus on content structure and professional language. Start with your first interview question.`
  }
  if (modeName === 'Company Specific') {
    const c = company || 'Google'
    return `You are a ${c} interviewer interviewing Chris for an internship role. You know ${c}'s values, culture, and what they look for in candidates. Ask questions that reflect ${c}'s actual interview style. Give feedback after each answer referencing ${c}'s specific values. Be formal and professional. Start with a brief introduction as a ${c} interviewer, then ask your first question.`
  }
  return 'You are a friendly career coach helping a Malaysian university student named Chris build interview confidence. Be warm and encouraging.'
}

function getRobotOpener(modeName, role) {
  const openers = {
    'Ice Breaker': "Hi Chris! I'm really glad you're here. Let's just have a relaxed conversation — no pressure at all. What did you get up to today?",
    'Daily English': "Hey Chris! Let's talk about your day in English. Don't worry about being perfect — just describe what you did. What happened today?",
    'Story Builder': "Hi Chris! I want to hear about something you've worked on that made you proud. Tell me about a project or experience — we'll shape it into a great story together.",
    'Mock Interview': `Great to meet you, Chris! I'll be asking you some ${role || 'Software Engineer'} interview questions today. Let's start: Can you walk me through a project you've worked on that you're most proud of?`,
    'Company Specific': "Good afternoon, Chris. Thank you for joining us today. I'm from our talent team. Before we begin, could you give me a brief introduction about yourself and why you're interested in joining us?",
  }
  return openers[modeName] || "Hi Chris! Let's get started. How are you feeling today?"
}

function XpPopup({ xp, visible }) {
  if (!visible) return null
  return (
    <div className="pointer-events-none absolute right-6 top-20 z-10 animate-xp-float rounded-full bg-yellow-400 px-3 py-1 text-sm font-bold text-yellow-900 shadow-lg">
      +{xp} XP ⭐
    </div>
  )
}

function VocabUpgradePopup({ text, visible }) {
  if (!visible) return null
  return (
    <div className="pointer-events-none absolute left-1/2 top-[38%] z-10 -translate-x-1/2 animate-vocab-float rounded-full bg-purple-600 px-4 py-2 text-xs font-semibold text-white shadow-lg">
      {text}
    </div>
  )
}

function RobotVisual({ state }) {
  const animClass =
    state === 'listening'
      ? 'scale-105 drop-shadow-[0_0_24px_rgba(34,197,94,0.5)]'
      : state === 'speaking'
        ? 'animate-robot-speak'
        : 'animate-robot-idle'

  const dotColor =
    state === 'listening' ? 'bg-green-400' : state === 'speaking' ? 'bg-blue-400' : state === 'thinking' ? 'bg-orange-400' : 'bg-gray-400'

  const statusText =
    state === 'listening' ? 'Listening...' : state === 'speaking' ? 'Speaking...' : state === 'thinking' ? 'Thinking...' : 'Ready'

  return (
    <div className="flex flex-col items-center gap-3">
      <div className={`transition-all duration-300 ${animClass}`}>
        <img src={robotImg} alt="CareerOS robot" className="h-40 w-40 object-contain" />
      </div>
      <div className="flex items-center gap-2">
        <span className={`h-2.5 w-2.5 rounded-full ${dotColor} animate-pulse`} />
        <span className="text-sm font-semibold text-white/80">{statusText}</span>
      </div>
    </div>
  )
}

function TranscriptBubble({ msg }) {
  const isUser = msg.role === 'user'
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-6 ${
          isUser
            ? 'bg-blue-600 text-white'
            : 'bg-white/12 text-white/90 border border-white/10'
        }`}
      >
        {msg.text}
      </div>
    </div>
  )
}

function SessionSummary({ xp, vocabUpgrades, onPracticeAgain, onBack }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
        <div className="text-center">
          <div className="text-5xl">🎉</div>
          <h2 className="mt-3 text-xl font-bold text-gray-900">Session complete!</h2>
          <p className="mt-1 text-sm text-gray-500">Great work, Chris. Every session builds your confidence.</p>
        </div>

        <div className="mt-6 rounded-2xl bg-yellow-50 py-4 text-center">
          <p className="text-3xl font-black text-yellow-600">+{xp} XP</p>
          <p className="mt-0.5 text-xs font-semibold text-yellow-700">Earned this session</p>
        </div>

        {vocabUpgrades.length > 0 && (
          <div className="mt-4">
            <p className="text-xs font-bold uppercase tracking-wide text-gray-400">Vocabulary upgrades this session</p>
            <ul className="mt-2 space-y-1">
              {vocabUpgrades.map((v, i) => (
                <li key={i} className="flex items-center gap-2 text-xs text-gray-700">
                  <span className="text-purple-500">✨</span> {v}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onPracticeAgain}
            className="flex-1 rounded-full bg-blue-600 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700"
          >
            Practice again
          </button>
          <button
            type="button"
            onClick={onBack}
            className="flex-1 rounded-full border border-gray-200 py-2.5 text-sm font-bold text-gray-700 transition hover:bg-gray-50"
          >
            Back to dashboard
          </button>
        </div>
      </div>
    </div>
  )
}

export default function VoiceInterviewSession({ mode, role, company, onExit }) {
  const modeName = mode?.name || 'Ice Breaker'

  const [transcript, setTranscript] = useState([
    { role: 'robot', text: getRobotOpener(modeName, role) },
  ])
  const [robotState, setRobotState] = useState('idle')
  const [isRecording, setIsRecording] = useState(false)
  const [showTextInput, setShowTextInput] = useState(false)
  const [textDraft, setTextDraft] = useState('')
  const [seconds, setSeconds] = useState(0)
  const [xp, setXp] = useState(0)
  const [showXpPopup, setShowXpPopup] = useState(false)
  const [vocabUpgrades, setVocabUpgrades] = useState([])
  const [vocabPopupText, setVocabPopupText] = useState('')
  const [showVocabPopup, setShowVocabPopup] = useState(false)
  const [showSummary, setShowSummary] = useState(false)

  const scrollRef = useRef(null)
  const recognitionRef = useRef(null)
  const messagesRef = useRef(transcript)
  const timerRef = useRef(null)

  // Keep messages ref in sync for API calls
  useEffect(() => { messagesRef.current = transcript }, [transcript])

  // Session timer
  useEffect(() => {
    timerRef.current = window.setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => window.clearInterval(timerRef.current)
  }, [])

  // Auto-scroll transcript
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
    }
  }, [transcript])

  // Speak opening message on mount
  useEffect(() => {
    window.setTimeout(() => {
      speakText(getRobotOpener(modeName, role))
    }, 600)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const formatTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

  const speakText = (text) => {
    if (!window.speechSynthesis) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.92
    utterance.pitch = 1.05
    utterance.lang = 'en-US'
    utterance.onstart = () => setRobotState('speaking')
    utterance.onend = () => setRobotState('idle')
    window.speechSynthesis.speak(utterance)
  }

  const callGroq = async (userText) => {
    const apiKey = import.meta.env.VITE_GROQ_API_KEY
    if (!apiKey) {
      // Fallback response when no API key
      return "That's great, Chris! Keep going — you're doing really well. Tell me more about that."
    }

    const history = messagesRef.current.map((m) => ({
      role: m.role === 'robot' ? 'assistant' : 'user',
      content: m.text,
    }))

    try {
      const res = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: GROQ_MODEL,
          messages: [
            { role: 'system', content: getSystemPrompt(modeName, role, company) },
            ...history,
            { role: 'user', content: userText },
          ],
          max_tokens: 250,
        }),
      })
      const data = await res.json()
      return data.choices?.[0]?.message?.content || "That's wonderful, Chris! Keep going."
    } catch {
      return "That's great, Chris! Keep going — you're doing really well."
    }
  }

  const handleUserInput = async (text) => {
    if (!text.trim()) return

    const userMsg = { role: 'user', text: text.trim() }
    setTranscript((prev) => [...prev, userMsg])
    setRobotState('thinking')

    const robotReply = await callGroq(text.trim())

    // Check for vocab upgrade marker
    const upgradeMatch = robotReply.match(/✨ Upgrade: (.+?)(?:\.|$)/)
    if (upgradeMatch) {
      const upgradeText = upgradeMatch[1]
      setVocabUpgrades((prev) => [...prev, upgradeText])
      setVocabPopupText(`✨ ${upgradeText}`)
      setShowVocabPopup(true)
      window.setTimeout(() => setShowVocabPopup(false), 3000)
    }

    // Award XP for each turn
    const earnedXp = 10
    setXp((prev) => prev + earnedXp)
    setShowXpPopup(true)
    window.setTimeout(() => setShowXpPopup(false), 1500)

    setTranscript((prev) => [...prev, { role: 'robot', text: robotReply }])
    speakText(robotReply)
  }

  const startRecording = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      setShowTextInput(true)
      return
    }

    window.speechSynthesis.cancel()
    setRobotState('idle')

    const recognition = new SpeechRecognition()
    recognition.lang = 'en-US'
    recognition.continuous = false
    recognition.interimResults = false

    recognition.onstart = () => {
      setIsRecording(true)
      setRobotState('listening')
    }

    recognition.onresult = (event) => {
      const spoken = event.results[0][0].transcript
      setIsRecording(false)
      recognition.stop()
      handleUserInput(spoken)
    }

    recognition.onerror = () => {
      setIsRecording(false)
      setRobotState('idle')
    }

    recognition.onend = () => {
      setIsRecording(false)
      if (robotState === 'listening') setRobotState('idle')
    }

    recognitionRef.current = recognition
    recognition.start()
  }

  const stopRecording = () => {
    recognitionRef.current?.stop()
    setIsRecording(false)
    setRobotState('idle')
  }

  const handleExit = () => {
    window.speechSynthesis.cancel()
    recognitionRef.current?.stop()
    setShowSummary(true)
  }

  if (showSummary) {
    return (
      <SessionSummary
        xp={xp}
        vocabUpgrades={vocabUpgrades}
        onPracticeAgain={() => {
          setShowSummary(false)
          setTranscript([{ role: 'robot', text: getRobotOpener(modeName, role) }])
          setSeconds(0)
          setXp(0)
          setVocabUpgrades([])
        }}
        onBack={onExit}
      />
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col overflow-hidden" style={{ background: '#0d1b2a' }}>
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
        <button
          type="button"
          onClick={handleExit}
          className="flex items-center gap-1.5 text-sm font-semibold text-white/70 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Exit session
        </button>

        <p className="text-sm font-bold text-white">{modeName}{role ? ` · ${role}` : ''}</p>

        <div className="flex items-center gap-4">
          <span className="text-sm font-mono text-white/70">{formatTime(seconds)}</span>
          <span className="text-sm font-semibold text-yellow-400">⭐ {xp} XP</span>
        </div>
      </div>

      {/* Warning for non-Chrome (subtle) */}
      {!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) && (
        <div className="bg-amber-500/20 px-4 py-1.5 text-center text-xs font-medium text-amber-300">
          Best experienced in Chrome — microphone input may not work in this browser
        </div>
      )}

      {/* Main content */}
      <div className="relative flex flex-1 flex-col items-center overflow-hidden px-4 py-6">
        <XpPopup xp={10} visible={showXpPopup} />
        <VocabUpgradePopup text={vocabPopupText} visible={showVocabPopup} />

        {/* Robot */}
        <RobotVisual state={robotState} />

        {/* Transcript */}
        <div
          ref={scrollRef}
          className="mt-6 w-full max-w-2xl flex-1 space-y-3 overflow-y-auto pb-2"
        >
          {transcript.map((msg, i) => (
            <TranscriptBubble key={i} msg={msg} />
          ))}
        </div>
      </div>

      {/* Input area */}
      <div className="border-t border-white/10 px-4 py-5">
        {showTextInput ? (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (!textDraft.trim()) return
              handleUserInput(textDraft)
              setTextDraft('')
            }}
            className="flex items-center gap-3"
          >
            <input
              value={textDraft}
              onChange={(e) => setTextDraft(e.target.value)}
              placeholder="Type your response..."
              className="flex-1 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-blue-400"
              autoFocus
            />
            <button
              type="submit"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white transition hover:bg-blue-700"
            >
              <Send className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => setShowTextInput(false)}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white/60 transition hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </form>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <button
              type="button"
              onClick={isRecording ? stopRecording : startRecording}
              className={`flex h-16 w-16 items-center justify-center rounded-full text-white shadow-lg transition-all duration-200 ${
                isRecording
                  ? 'animate-mic-pulse bg-red-500 shadow-red-500/40'
                  : 'bg-gradient-to-br from-blue-500 to-blue-700 shadow-blue-500/30 hover:scale-105'
              }`}
            >
              {isRecording ? <MicOff className="h-7 w-7" /> : <Mic className="h-7 w-7" />}
            </button>
            <p className="text-xs font-medium text-white/40">
              {isRecording ? 'Tap to stop' : 'Press to speak'}
            </p>
            <button
              type="button"
              onClick={() => setShowTextInput(true)}
              className="text-xs font-semibold text-white/40 transition hover:text-white/70 underline"
            >
              Type instead
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes robotIdle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @keyframes robotSpeak {
          0%, 100% { transform: translateY(0px) scale(1); }
          25% { transform: translateY(-3px) scale(1.02); }
          75% { transform: translateY(2px) scale(0.99); }
        }
        @keyframes xpFloat {
          0% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-40px); }
        }
        @keyframes vocabFloat {
          0% { opacity: 0; transform: translateX(-50%) translateY(10px); }
          15% { opacity: 1; transform: translateX(-50%) translateY(0); }
          75% { opacity: 1; transform: translateX(-50%) translateY(0); }
          100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
        }
        @keyframes micPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(239,68,68,0.4); }
          50% { box-shadow: 0 0 0 14px rgba(239,68,68,0); }
        }
        .animate-robot-idle { animation: robotIdle 3s ease-in-out infinite; }
        .animate-robot-speak { animation: robotSpeak 0.6s ease-in-out infinite; }
        .animate-xp-float { animation: xpFloat 1.5s ease-out forwards; }
        .animate-vocab-float { animation: vocabFloat 3s ease-out forwards; }
        .animate-mic-pulse { animation: micPulse 1.2s ease-in-out infinite; }
      `}</style>
    </div>
  )
}
