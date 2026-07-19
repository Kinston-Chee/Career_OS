import React, { useEffect, useRef, useState } from 'react'
import { Send } from 'lucide-react'
import TypewriterText from '../ui/TypewriterText'

function TypingIndicator() {
  return (
    <div className="flex items-start gap-2.5">
      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-violet-100">
        <span className="text-[10px] font-bold tracking-widest text-violet-600">n_n</span>
      </span>
      <div className="flex items-center gap-1.5 rounded-2xl bg-white px-4 py-3.5 shadow-sm">
        <span className="typing-dot" style={{ animationDelay: '0ms' }} />
        <span className="typing-dot" style={{ animationDelay: '200ms' }} />
        <span className="typing-dot" style={{ animationDelay: '400ms' }} />
      </div>
    </div>
  )
}

function RobotBubble({ id, text, typingId, onTypingComplete }) {
  const isTypingThisMessage = typingId === id

  return (
    <div className="chat-fade-in flex items-start gap-2.5">
      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-violet-100">
        <span className="text-[10px] font-bold tracking-widest text-violet-600">n_n</span>
      </span>
      <div className="max-w-[88%] whitespace-pre-line rounded-2xl bg-white p-3.5 text-sm leading-relaxed text-[#2c3656] shadow-sm">
        {isTypingThisMessage ? (
          <TypewriterText text={text} speed={18} onComplete={onTypingComplete} />
        ) : (
          text
        )}
      </div>
    </div>
  )
}

function UserBubble({ text }) {
  return (
    <div className="chat-fade-in ml-auto max-w-[88%]">
      <div className="rounded-2xl bg-[#185FA5] p-3.5 text-sm leading-relaxed text-white shadow-sm">
        {text}
      </div>
    </div>
  )
}

export default function CareerPathCompanionPanel({ message, messages, chips, isTyping, onChipClick }) {
  const chatMessages = messages ?? [{ id: 'intro', role: 'robot', text: message }]
  const scrollRef = useRef(null)
  const lastRobotIdRef = useRef(null)
  const [typingId, setTypingId] = useState(chatMessages.find((msg) => msg.role === 'robot')?.id ?? null)
  const [draft, setDraft] = useState('')

  useEffect(() => {
    const lastRobot = [...chatMessages].reverse().find((msg) => msg.role === 'robot')
    if (!lastRobot || lastRobot.id === lastRobotIdRef.current) return
    lastRobotIdRef.current = lastRobot.id
    setTypingId(lastRobot.id)
  }, [chatMessages])

  useEffect(() => {
    if (!scrollRef.current) return
    scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [chatMessages, chips, isTyping])

  return (
    <aside className="flex h-full flex-col rounded-xl border border-[#e2eaf8] bg-white shadow-[0_8px_22px_rgba(44,76,142,0.07)]">
      <div className="flex items-center justify-between border-b border-[#e2eaf8] px-4 py-3.5">
        <span className="flex items-center gap-2 text-sm font-bold text-[#11194a]">
          <span className="h-2 w-2 rounded-full bg-violet-500" />
          Career Companion
        </span>
        <span className="text-xs font-medium text-[#7382a1]">Online</span>
      </div>

      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-white p-4">
        {chatMessages.map((msg, index) => (
          msg.role === 'user'
            ? <UserBubble key={msg.id} text={msg.text} />
            : (
              <RobotBubble
                key={msg.id}
                id={msg.id}
                text={msg.text}
                typingId={typingId}
                onTypingComplete={() => setTypingId((current) => (current === msg.id ? null : current))}
              />
            )
        ))}

        {isTyping && <TypingIndicator />}

        {chips?.length > 0 && !isTyping && !typingId && (
          <div className="chat-fade-in flex flex-wrap gap-1.5 pl-[42px]">
            {chips.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => onChipClick?.(chip)}
                className="rounded-full border border-[#dfe8f7] bg-white px-3 py-1.5 text-xs font-medium text-[#35507d] transition-colors hover:border-blue-300 hover:bg-blue-50"
              >
                {chip}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Composer — free-form messages are routed through onChipClick so
          the parent page (CareerIntelligencePage) can respond to them
          using its existing fallback branch for unrecognised chips. */}
      <form
        onSubmit={(event) => {
          event.preventDefault()
          const clean = draft.trim()
          if (!clean || isTyping) return
          setDraft('')
          onChipClick?.(clean)
        }}
        className="flex items-center gap-2 border-t border-[#e2eaf8] p-3"
      >
        <div className="flex flex-1 items-center gap-2 rounded-full border border-[#dfe8f7] bg-white px-4 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-100">
          <input
            type="text"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Ask me about any role…"
            className="flex-1 bg-transparent text-sm text-[#2c3656] placeholder:text-[#9aa6c3] focus:outline-none"
          />
          <button
            type="submit"
            aria-label="Send message"
            disabled={!draft.trim() || isTyping}
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-white shadow-[0_6px_14px_rgba(37,99,235,0.28)] transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Send size={14} strokeWidth={2.4} />
          </button>
        </div>
      </form>
    </aside>
  )
}
