import React, { useEffect, useRef, useState } from 'react'
import { Loader2 } from 'lucide-react'

const TAG_GRAY = 'bg-slate-100 text-slate-500'
const TAG_CONFIRMED_TONES = {
  blue: 'bg-blue-50 text-blue-700',
  violet: 'bg-violet-50 text-violet-700',
  emerald: 'bg-emerald-50 text-emerald-700',
}

export default function DraftTimelineCard({ entry, phase, onSignalBoost }) {
  // Typing-sequence reveal flags
  const [logoVisible, setLogoVisible] = useState(false)
  const [titleChars, setTitleChars] = useState(0)
  const [titleDone, setTitleDone] = useState(false)
  const [dateVisible, setDateVisible] = useState(false)
  const [tagsRevealed, setTagsRevealed] = useState(0)
  const [confirmBtnVisible, setConfirmBtnVisible] = useState(false)
  const [dotState, setDotState] = useState('outline') // outline | pulsing | filled

  // Confirm-sequence flags
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [borderState, setBorderState] = useState('dashed') // dashed | solid | none
  const [bgState, setBgState] = useState('blue') // blue | green | white
  const [extractingVisible, setExtractingVisible] = useState(true)
  const [tagsColored, setTagsColored] = useState(0)
  const [savedBadge, setSavedBadge] = useState(false)
  const [signalBlocks, setSignalBlocks] = useState(0)

  const timersRef = useRef([])
  const schedule = (fn, delay) => {
    const id = setTimeout(fn, delay)
    timersRef.current.push(id)
    return id
  }

  // ── Typing sequence ──────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== 'typing') return undefined
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []

    schedule(() => setLogoVisible(true), 300)

    const title = entry.title
    schedule(() => {
      const intervalId = setInterval(() => {
        setTitleChars((prev) => {
          const next = prev + 1
          if (next >= title.length) {
            clearInterval(intervalId)
            setTitleDone(true)
            schedule(() => setDateVisible(true), 200)
            schedule(() => {
              entry.tags.forEach((_, idx) => {
                schedule(() => setTagsRevealed((c) => Math.max(c, idx + 1)), idx * 150)
              })
            }, 400)
            const tagsTotalDelay = 400 + entry.tags.length * 150
            schedule(() => setConfirmBtnVisible(true), tagsTotalDelay + 200)
            schedule(() => setDotState('pulsing'), tagsTotalDelay + 400)
            schedule(() => setDotState('outline'), tagsTotalDelay + 700)
          }
          return next
        })
      }, 40)
      timersRef.current.push(intervalId)
    }, 500)

    return () => {
      timersRef.current.forEach(clearTimeout)
      timersRef.current = []
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  // ── Confirm sequence ─────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== 'confirming') return undefined
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []

    setConfirmLoading(true)
    schedule(() => {
      setConfirmLoading(false)
      setBorderState('solid')
    }, 300)
    schedule(() => setBgState('green'), 500)
    schedule(() => setExtractingVisible(false), 700)
    schedule(() => {
      entry.tags.forEach((_, idx) => {
        schedule(() => setTagsColored((c) => Math.max(c, idx + 1)), idx * 150)
      })
    }, 800)
    schedule(() => setSavedBadge(true), 1200)
    schedule(() => setDotState('filled'), 1400)
    schedule(() => {
      setBorderState('none')
      setBgState('white')
    }, 1600)
    schedule(() => {
      setSignalBlocks(1)
      if (typeof onSignalBoost === 'function') onSignalBoost()
    }, 2000)
    schedule(() => setSignalBlocks(2), 2150)
    schedule(() => setSignalBlocks(3), 2300)

    return () => {
      timersRef.current.forEach(clearTimeout)
      timersRef.current = []
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  const borderClass =
    borderState === 'dashed'
      ? 'border-2 border-dashed border-[#60A5FA]'
      : borderState === 'solid'
        ? 'border-2 border-solid border-[#3B6D11]'
        : 'border border-transparent'

  const bgStyle =
    bgState === 'blue'
      ? { background: 'rgba(240, 246, 255, 0.8)' }
      : bgState === 'green'
        ? { background: 'rgba(240, 255, 244, 0.8)' }
        : { background: '#ffffff' }

  return (
    <div className="draft-slide-down relative pb-7">
      {extractingVisible && (
        <p className="draft-blink mb-2 ml-[88px] text-xs font-semibold italic text-blue-600">
          Being extracted from your conversation...
        </p>
      )}

      <div className="relative flex gap-4">
        <span
          className={`relative z-10 mt-3 h-2 w-2 flex-shrink-0 rounded-full transition-all duration-300 ${
            dotState === 'filled' ? 'draft-dot-pulse bg-blue-600' : dotState === 'pulsing' ? 'draft-dot-pulse bg-transparent ring-2 ring-slate-300' : 'bg-white ring-2 ring-slate-300'
          }`}
        />
        <span className="w-16 flex-shrink-0 whitespace-pre-line pt-1.5 text-xs font-bold text-blue-700">{'Jun–Aug\n2024'}</span>

        <div
          className={`flex flex-1 items-center gap-4 rounded-2xl p-4 transition-colors duration-400 ${borderClass}`}
          style={bgStyle}
        >
          <span
            className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-emerald-50 text-sm font-bold text-emerald-700 transition-opacity duration-300 ${
              logoVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {entry.logo}
          </span>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-[#11194a]">
              {entry.title.slice(0, titleChars)}
              {!titleDone && titleChars > 0 && <span className="typing-cursor" />}
            </p>
            <p className={`mt-0.5 text-xs font-medium text-[#7382a1] transition-opacity duration-300 ${dateVisible ? 'opacity-100' : 'opacity-0'}`}>
              {entry.date}
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {entry.tags.map((tag, idx) => {
                if (idx >= tagsRevealed) return null
                const isColored = idx < tagsColored
                const toneClass = isColored ? TAG_CONFIRMED_TONES[tag.confirmedTone] ?? TAG_GRAY : TAG_GRAY
                return (
                  <span
                    key={tag.label}
                    className={`draft-tag-pop rounded-full px-2.5 py-0.5 text-[11px] font-medium ${toneClass} ${
                      isColored ? 'draft-tag-bounce' : ''
                    }`}
                  >
                    {tag.label}
                  </span>
                )
              })}
            </div>
          </div>

          <div className="flex flex-shrink-0 flex-col items-end gap-2">
            {!savedBadge && confirmBtnVisible && (
              <button
                type="button"
                disabled={confirmLoading || phase === 'confirming'}
                className="draft-fade-in-scale inline-flex items-center gap-1.5 rounded-lg border border-blue-200 px-3 py-1.5 text-xs font-bold text-blue-700 transition hover:bg-blue-50"
              >
                {confirmLoading && <Loader2 size={12} className="draft-spin" />}
                Confirm entry
              </button>
            )}
            {savedBadge && (
              <span className="draft-fade-in-scale inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-700">
                ✓ Saved
              </span>
            )}

            {phase === 'confirming' && signalBlocks > 0 && (
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4].map((i) => (
                  <span
                    key={i}
                    className={`h-2.5 w-2.5 rounded-sm transition-colors duration-150 ${i <= signalBlocks ? 'bg-blue-600' : 'bg-slate-200'}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
