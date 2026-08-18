import React, { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { Check, RefreshCw, Sparkles, X } from 'lucide-react'
import { mockUser } from '../../data/mockData'

// Inline LinkedIn "in" glyph — the pinned lucide-react version has no `Linkedin` export.
export function LinkedInGlyph({ size = 14 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.024-3.037-1.852-3.037-1.853 0-2.136 1.446-2.136 2.94v5.666H9.351V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.114 20.452H3.558V9h3.556v11.452zM22.225 0H1.771C.792 0 0 .775 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .775 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

const TONES = [
  { id: 'professional', label: 'Professional' },
  { id: 'story', label: 'Story' },
  { id: 'concise', label: 'Concise' },
]

const toHashtag = (tag) =>
  `#${tag
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join('')}`

// Composes a demo LinkedIn draft from the Career Memory entry. Deterministic by
// design so the demo never depends on an API key being present.
export function buildDraft(entry, tone) {
  const title = entry?.title || 'a new career milestone'
  const period = entry?.period ? ` (${entry.period})` : ''
  const tags = entry?.tags ?? []
  const skills = tags.length ? tags.join(', ') : 'new skills'
  const hashtags = ['#CareerOS', ...tags.map(toHashtag)].join(' ')
  const verifiedLine = entry?.verified
    ? 'This experience is verified in my CareerOS Career Memory.'
    : 'Logged in my CareerOS Career Memory as evidence of what I can do.'

  if (tone === 'story') {
    return [
      `A year ago I would not have believed where ${title}${period} would take me.`,
      '',
      `What started as a challenge turned into real practice in ${skills} — and a much clearer view of the kind of work I want to keep doing.`,
      '',
      `Grateful to everyone who backed me along the way. ${verifiedLine}`,
      '',
      hashtags,
    ].join('\n')
  }

  if (tone === 'concise') {
    return [`${title}${period}. ✅`, '', `Skills applied: ${skills}.`, '', hashtags].join('\n')
  }

  return [
    `Excited to share a milestone from my career journey: ${title}${period}. 🚀`,
    '',
    `Along the way I strengthened ${skills}, and learned how much progress comes from consistent, hands-on work.`,
    '',
    verifiedLine,
    '',
    hashtags,
  ].join('\n')
}

export default function LinkedInPostDraft({ entry, onApprove, onClose }) {
  const [tone, setTone] = useState('professional')
  const [text, setText] = useState(() => buildDraft(entry, 'professional'))
  const [edited, setEdited] = useState(false)

  const initial = useMemo(() => buildDraft(entry, tone), [entry, tone])

  useEffect(() => {
    if (edited) return
    setText(initial)
  }, [initial, edited])

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') onClose?.()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const regenerate = () => {
    setEdited(false)
    setText(buildDraft(entry, tone))
  }

  const selectTone = (id) => {
    setEdited(false)
    setTone(id)
    setText(buildDraft(entry, id))
  }

  // Portalled to <body>: the timeline cards use backdrop-blur, which creates a
  // containing block that would otherwise trap this fixed overlay inside a card.
  return createPortal(
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/20 px-4 py-6 backdrop-blur-sm"
      // The button lives inside a clickable timeline card, so every event that
      // escapes this overlay would re-open that card. Stop them here.
      onClick={(event) => {
        event.stopPropagation()
        onClose?.()
      }}
      onKeyDown={(event) => event.stopPropagation()}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-label="Review LinkedIn post draft"
        onClick={(event) => event.stopPropagation()}
        className="flex max-h-full w-full max-w-xl flex-col overflow-hidden rounded-[28px] border border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.94),rgba(239,246,255,0.78))] shadow-[0_28px_80px_rgba(10,102,194,0.20),inset_0_1px_0_rgba(255,255,255,0.9)] ring-1 ring-[#0A66C2]/15 backdrop-blur-2xl"
      >
        <header className="flex items-start justify-between gap-4 border-b border-white/70 px-6 py-5">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0A66C2]/10 text-[#0A66C2]">
              <LinkedInGlyph size={17} />
            </span>
            <div className="min-w-0">
              <h2 className="text-base font-bold text-[#11194a]">Review your LinkedIn post</h2>
              <p className="mt-0.5 flex items-center gap-1.5 text-xs font-medium text-[#637094]">
                <Sparkles size={12} className="text-[#0A66C2]" />
                Drafted by CareerOS from &ldquo;{entry?.title || 'this experience'}&rdquo;
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close draft"
            className="rounded-full p-1 text-[#7382a1] transition hover:bg-blue-50 hover:text-blue-700"
          >
            <X size={18} />
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wide text-[#7382a1]">Tone</span>
            {TONES.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => selectTone(option.id)}
                aria-pressed={tone === option.id}
                className={`rounded-full px-3 py-1 text-xs font-bold transition ${
                  tone === option.id
                    ? 'bg-[#0A66C2] text-white shadow-[0_8px_20px_rgba(10,102,194,0.25)]'
                    : 'border border-blue-100 bg-white/70 text-blue-700 hover:bg-blue-50'
                }`}
              >
                {option.label}
              </button>
            ))}
            <button
              type="button"
              onClick={regenerate}
              className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-white/70 px-3 py-1 text-xs font-bold text-blue-700 transition hover:bg-blue-50"
            >
              <RefreshCw size={12} /> Regenerate
            </button>
          </div>

          {/* Post preview shell — mirrors a LinkedIn feed card */}
          <div className="mt-4 rounded-2xl border border-white/70 bg-white/85 p-4 shadow-[0_12px_30px_rgba(37,99,235,0.08),inset_0_1px_0_rgba(255,255,255,0.9)]">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0A66C2]/10 text-sm font-bold text-[#0A66C2]">
                {mockUser.avatarInitials}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-[#11194a]">{mockUser.name}</p>
                <p className="truncate text-xs font-medium text-[#7382a1]">
                  {mockUser.role} · {mockUser.university}
                </p>
              </div>
            </div>

            <label htmlFor="linkedin-draft" className="sr-only">LinkedIn post draft</label>
            <textarea
              id="linkedin-draft"
              value={text}
              onChange={(event) => {
                setEdited(true)
                setText(event.target.value)
              }}
              rows={12}
              className="mt-3 w-full resize-y rounded-xl border border-blue-100 bg-white/80 p-3 text-sm leading-6 text-[#3a4669] outline-none transition focus:border-[#0A66C2] focus:ring-4 focus:ring-[#0A66C2]/10"
            />
            <div className="mt-1.5 flex items-center justify-between text-[11px] font-semibold text-[#9aa6c3]">
              <span>{edited ? 'Edited by you' : 'AI draft — edit anything before approving'}</span>
              <span>{text.length} / 3000</span>
            </div>
          </div>
        </div>

        <footer className="flex flex-wrap items-center justify-end gap-2 border-t border-white/70 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-blue-100 bg-white/70 px-4 py-2 text-sm font-bold text-blue-700 transition hover:bg-blue-50"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!text.trim()}
            onClick={() => onApprove?.(text)}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#0A66C2] px-4 py-2 text-sm font-bold text-white shadow-[0_12px_30px_rgba(10,102,194,0.28)] transition hover:bg-[#08529b] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Check size={15} /> Approve &amp; post
          </button>
        </footer>
      </section>
    </div>,
    document.body,
  )
}
