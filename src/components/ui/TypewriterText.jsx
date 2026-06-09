import React, { useEffect, useRef, useState } from 'react'

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return undefined

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches)

    updatePreference()
    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', updatePreference)
    } else {
      mediaQuery.addListener?.(updatePreference)
    }

    return () => {
      if (typeof mediaQuery.removeEventListener === 'function') {
        mediaQuery.removeEventListener('change', updatePreference)
      } else {
        mediaQuery.removeListener?.(updatePreference)
      }
    }
  }, [])

  return prefersReducedMotion
}

function getCharacterDelay(character, speed) {
  if (/[.!?]/.test(character)) return speed + 180
  if (/[,;:]/.test(character)) return speed + 90
  return speed
}

export function useTypewriter({ text, speed = 28, active = true, onComplete }) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const [displayedText, setDisplayedText] = useState(prefersReducedMotion ? text : '')
  const [isTyping, setIsTyping] = useState(false)
  const timerRef = useRef(null)
  const onCompleteRef = useRef(onComplete)

  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  useEffect(() => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }

    if (!active) {
      setIsTyping(false)
      return undefined
    }

    if (prefersReducedMotion || !text) {
      setDisplayedText(text)
      setIsTyping(false)
      onCompleteRef.current?.()
      return undefined
    }

    let index = 0
    setDisplayedText('')
    setIsTyping(true)

    const typeNextCharacter = () => {
      index += 1
      setDisplayedText(text.slice(0, index))

      if (index >= text.length) {
        setIsTyping(false)
        timerRef.current = null
        onCompleteRef.current?.()
        return
      }

      timerRef.current = window.setTimeout(
        typeNextCharacter,
        getCharacterDelay(text[index - 1], speed),
      )
    }

    timerRef.current = window.setTimeout(typeNextCharacter, 120)

    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current)
        timerRef.current = null
      }
      setIsTyping(false)
    }
  }, [active, prefersReducedMotion, speed, text])

  return { displayedText, isTyping, prefersReducedMotion }
}

export default function TypewriterText({ text, speed = 28, active = true, onComplete, className = '' }) {
  const { displayedText, isTyping } = useTypewriter({ text, speed, active, onComplete })

  return (
    <span className={className} aria-live="polite">
      {isTyping && displayedText.length === 0 ? (
        <span className="mr-1 inline-flex items-center gap-0.5 align-middle" aria-hidden="true">
          <span className="h-1 w-1 animate-pulse rounded-full bg-slate-400" />
          <span className="h-1 w-1 animate-pulse rounded-full bg-slate-400 [animation-delay:120ms]" />
          <span className="h-1 w-1 animate-pulse rounded-full bg-slate-400 [animation-delay:240ms]" />
        </span>
      ) : null}
      <span>{displayedText}</span>
      {isTyping ? (
        <>
          <span className="sr-only">CareerOS Assistant is typing</span>
          <span aria-hidden="true" className="ml-0.5 inline-block animate-pulse text-blue-600">
            |
          </span>
        </>
      ) : null}
    </span>
  )
}
