import React, { useEffect, useRef, useState } from 'react'
import { Send, Sparkles } from 'lucide-react'
import { careerMemoryDemo } from '../../data/mockData'
import TypewriterText from '../ui/TypewriterText'

let nextId = 1
const makeId = () => `msg-${nextId++}`

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

function RobotBubble({ text, active, onComplete }) {
  return (
    <div className="chat-fade-in flex items-start gap-2.5">
      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-violet-100">
        <span className="text-[10px] font-bold tracking-widest text-violet-600">n_n</span>
      </span>
      <div
        className="max-w-[88%] whitespace-pre-line bg-white p-3.5 text-sm leading-relaxed text-[#2c3656] shadow-sm"
        style={{ borderRadius: '4px 12px 12px 12px', border: '0.5px solid #e2eaf8' }}
      >
        <TypewriterText text={text} active={active} speed={18} onComplete={onComplete} />
      </div>
    </div>
  )
}

function UserBubble({ text }) {
  return (
    <div className="chat-fade-in ml-auto max-w-[88%]">
      <div
        className="bg-[#185FA5] p-3.5 text-sm leading-relaxed text-white shadow-sm"
        style={{ borderRadius: '12px 4px 12px 12px' }}
      >
        {text}
      </div>
    </div>
  )
}

// Props:
//   onGenericChat        — async (prompt, history) => string
//                          Called when the user hits "Send". Return the
//                          LLM's reply text; it gets appended as a robot
//                          bubble in the chat.
//   onExtractExperience  — async (prompt) => boolean
//                          Called when the user clicks the sparkles button
//                          (or falls back to composer submit if
//                          onGenericChat isn't provided). Should return
//                          true if the extract-experience API succeeded
//                          and the Add Experience modal opened.
export default function CompanionChatPanel({ companion, onShowDraft, onConfirmDraft, onExtractExperience, onGenericChat }) {
  const [history, setHistory] = useState([{ id: makeId(), role: 'robot', text: companion.greeting }])
  const [chips, setChips] = useState(companion.chips)
  const [isTyping, setIsTyping] = useState(false)
  const [typingRobotId, setTypingRobotId] = useState(null)
  const [stage, setStage] = useState('idle')
  const [ended, setEnded] = useState(false)
  const [draft, setDraft] = useState('')

  const scrollRef = useRef(null)
  const timerRef = useRef(null)

  useEffect(() => {
    if (!scrollRef.current) return
    scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [history, isTyping, chips])

  useEffect(() => () => clearTimeout(timerRef.current), [])

  const appendMessage = (role, text) => {
    const id = makeId()
    setHistory((prev) => [...prev, { id, role, text }])
    if (role === 'robot') setTypingRobotId(id)
    return id
  }

  useEffect(() => {
    if (history[0]?.role === 'robot') setTypingRobotId(history[0].id)
  }, [])

  const startTyping = (callback, delay) => {
    setIsTyping(true)
    timerRef.current = setTimeout(() => {
      setIsTyping(false)
      callback()
    }, delay)
  }

  const handleChipClick = (chip) => {
    setChips(null)

    if (stage === 'idle') {
      if (chip === companion.chips[0]) {
        startTyping(() => {
          appendMessage('robot', careerMemoryDemo.step1.message)
          setChips([careerMemoryDemo.step1.chip])
          setStage('awaiting-first-input')
        }, 1200)
      } else {
        startTyping(() => {
          appendMessage('robot', 'Let’s focus on the demo flow for now — click ✨ Add demo experience to see it in action.')
          setChips(companion.chips)
        }, 800)
      }
      return
    }

    if (stage === 'awaiting-first-input') {
      appendMessage('user', chip)
      startTyping(() => {
        appendMessage('robot', careerMemoryDemo.step2.message)
        setChips(careerMemoryDemo.step2.chips)
        setStage('awaiting-confirm')
        if (typeof onShowDraft === 'function') onShowDraft()
      }, 1500)
      return
    }

    if (stage === 'awaiting-confirm') {
      if (chip === 'Yes, save it') {
        if (typeof onConfirmDraft === 'function') onConfirmDraft()
        startTyping(() => {
          appendMessage('robot', careerMemoryDemo.confirmed.message)
          setChips(careerMemoryDemo.confirmed.chips)
          setStage('confirmed')
        }, 800)
      } else {
        startTyping(() => {
          appendMessage('robot', "No problem — for this demo, let's keep going with what we have.")
          setChips(careerMemoryDemo.step2.chips)
        }, 800)
      }
      return
    }

    if (stage === 'confirmed') {
      if (chip === 'Log another experience') {
        startTyping(() => {
          appendMessage('robot', careerMemoryDemo.step4.message)
          setChips([careerMemoryDemo.step4.chip])
          setStage('awaiting-second-input')
        }, 1000)
      } else {
        startTyping(() => {
          appendMessage('robot', careerMemoryDemo.addLinkAck)
          setChips(careerMemoryDemo.confirmed.chips)
        }, 800)
      }
      return
    }

    if (stage === 'awaiting-second-input') {
      appendMessage('user', chip)
      startTyping(() => {
        appendMessage('robot', careerMemoryDemo.step5.message)
        setChips(null)
        setStage('ended')
        setEnded(true)
      }, 1200)
    }
  }

  return (
    <aside className="flex h-full flex-col rounded-xl border border-[#e2eaf8] bg-white shadow-[0_8px_22px_rgba(44,76,142,0.07)]">
      <div className="flex items-center justify-between border-b border-[#e2eaf8] px-4 py-3.5">
        <span className="flex items-center gap-2 text-sm font-bold text-[#11194a]">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Career Companion
        </span>
        <span className="text-xs font-medium text-[#7382a1]">Online</span>
      </div>

      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-white p-4">
        {history.map((msg) => (
          msg.role === 'robot' ? (
            <RobotBubble
              key={msg.id}
              text={msg.text}
              active={typingRobotId === msg.id}
              onComplete={() => setTypingRobotId((current) => (current === msg.id ? null : current))}
            />
          ) : (
            <UserBubble key={msg.id} text={msg.text} />
          )
        ))}

        {isTyping && <TypingIndicator />}

        {chips && !isTyping && !typingRobotId && (
          <div className="chat-fade-in flex flex-wrap gap-1.5 pl-[42px]">
            {chips.map((chip, index) => {
              const isDemoTrigger = stage === 'idle' && index === 0
              return (
                <button
                  key={chip}
                  type="button"
                  onClick={() => handleChipClick(chip)}
                  className={
                    isDemoTrigger
                      ? 'rounded-full bg-blue-600 px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-blue-700'
                      : 'rounded-full border border-[#dfe8f7] bg-white px-3 py-1.5 text-xs font-medium text-[#35507d] transition-colors hover:border-blue-300 hover:bg-blue-50'
                  }
                >
                  {chip}
                </button>
              )
            })}
          </div>
        )}

        {ended && !isTyping && (
          <p className="pt-1 text-center text-xs font-medium text-[#9aa6c3]">
            ✨ End of demo · Thanks for exploring
          </p>
        )}
      </div>

      {/* Composer — Send routes free-form text to the generic-chat API
          (onGenericChat); the sparkles button routes the same draft to
          the extract-experience API (onExtractExperience) and pops the
          Add Experience modal pre-filled. Chip clicks continue to
          advance the local demo state machine. */}
      <form
        onSubmit={async (event) => {
          event.preventDefault()
          const clean = draft.trim()
          if (!clean || isTyping) return
          setDraft('')

          if (typeof onGenericChat === 'function') {
            // ── GENERIC CHAT PATH ─────────────────────────────
            // Snapshot the visible history BEFORE we mutate it so the
            // parent's API call sees only the prior turns, not the
            // user's brand-new bubble.
            const historyForApi = history
              .filter((m) => typeof m.text === 'string' && m.text.trim().length > 0)
              .map((m) => ({
                role: m.role === 'robot' ? 'assistant' : 'user',
                content: m.text,
              }))

            appendMessage('user', clean)
            setChips(null)
            setIsTyping(true)
            let reply = ''
            try {
              const result = await onGenericChat(clean, historyForApi)
              reply = typeof result === 'string' ? result : (result?.reply ?? '')
            } catch (error) {
              reply = ''
            }
            setIsTyping(false)
            appendMessage(
              'robot',
              reply.trim().length > 0
                ? reply
                : "Sorry — I couldn't reach my brain just now. Try again in a moment.",
            )
            return
          }

          if (typeof onExtractExperience === 'function') {
            // ── EXTRACT-EXPERIENCE FALLBACK (when no chat API wired) ──
            appendMessage('user', clean)
            setChips(null)
            setIsTyping(true)
            let success = false
            try {
              const result = await onExtractExperience(clean)
              success = result !== false
            } catch (error) {
              success = false
            }
            setIsTyping(false)
            appendMessage(
              'robot',
              success
                ? "Got it — I've drafted that. Check the pop-up to review and save."
                : "Hmm, I couldn't quite catch that. Try describing it in a bit more detail.",
            )
            return
          }

          // Fallback for pages that wire neither API: pass through to
          // the demo state machine.
          handleChipClick(clean)
        }}
        className="flex items-center gap-2 border-t border-[#e2eaf8] p-3"
      >
        <div className="flex flex-1 items-center gap-1 rounded-full border border-[#dfe8f7] bg-white pl-3 pr-1 py-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-100">
          <input
            type="text"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Chat with me, or log an experience…"
            className="flex-1 bg-transparent text-sm text-[#2c3656] placeholder:text-[#9aa6c3] focus:outline-none"
          />
          {/* Sparkles = "log the current draft as an experience". Sits
              beside Send so both API paths are one click away. Only shown
              when the page has actually wired onExtractExperience. */}
          {typeof onExtractExperience === 'function' && (
            <button
              type="button"
              aria-label="Log as experience"
              title="Log as experience"
              disabled={!draft.trim() || isTyping}
              onClick={async () => {
                const clean = draft.trim()
                if (!clean || isTyping) return
                setDraft('')
                appendMessage('user', clean)
                setChips(null)
                setIsTyping(true)
                let success = false
                try {
                  const result = await onExtractExperience(clean)
                  success = result !== false
                } catch (error) {
                  success = false
                }
                setIsTyping(false)
                appendMessage(
                  'robot',
                  success
                    ? "Got it — I've drafted that. Check the pop-up to review and save."
                    : "Hmm, I couldn't quite catch that. Try describing it in a bit more detail.",
                )
              }}
              className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-blue-100 bg-white text-blue-600 transition hover:border-blue-300 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Sparkles size={14} strokeWidth={2.4} />
            </button>
          )}
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
