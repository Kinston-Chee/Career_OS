import React, { useEffect, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  Clock,
  Lightbulb,
  Minus,
  Plus,
  RefreshCw,
  Sparkles,
  ThumbsUp,
  TriangleAlert,
  X,
} from 'lucide-react'
import { getSessionReview } from '../data/interviewSessions'

// Verdict styling — matches the tones used in the live session view.
const VERDICT = {
  highlight: {
    label: 'Highlight',
    Icon: ThumbsUp,
    chip: 'border-[#10B981]/40 bg-[#10B981]/15 text-[#6EE7B7]',
    card: 'border-[#10B981]/30 bg-[#10B981]/[0.07]',
    accent: 'text-[#6EE7B7]',
  },
  mixed: {
    label: 'Room to sharpen',
    Icon: Sparkles,
    chip: 'border-[#F59E0B]/40 bg-[#F59E0B]/15 text-[#FCD34D]',
    card: 'border-[#F59E0B]/30 bg-[#F59E0B]/[0.07]',
    accent: 'text-[#FCD34D]',
  },
  mistake: {
    label: 'Mistake',
    Icon: TriangleAlert,
    chip: 'border-[#EF4444]/40 bg-[#EF4444]/15 text-[#FCA5A5]',
    card: 'border-[#EF4444]/30 bg-[#EF4444]/[0.07]',
    accent: 'text-[#FCA5A5]',
  },
}

function MessageBubble({ msg, interviewer }) {
  const isAI = msg.role === 'ai'
  return (
    <div className={`flex flex-col gap-1.5 ${isAI ? 'items-start' : 'items-end'}`}>
      <div className={`flex items-center gap-2 px-1 ${isAI ? '' : 'flex-row-reverse'}`}>
        <div className={`flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full border text-[12px] ${
          isAI ? 'border-[#5B6CF9] bg-[#5B6CF9]/15 text-[#5B6CF9]' : 'border-[#10B981] bg-[#10B981]/15 text-[#10B981]'
        }`}>
          {isAI ? '🤖' : '👤'}
        </div>
        <span className="text-[11px] font-semibold uppercase tracking-[.05em] text-[#5A6080]">
          {isAI ? interviewer : 'Chris Lee'}
        </span>
        <span className="text-[11px] text-[#5A6080]">{msg.ts}</span>
      </div>
      <div
        className={`max-w-[80%] rounded-[14px] px-4 py-3.5 text-[14px] leading-[1.65] ${
          isAI
            ? 'rounded-tl-[4px] border border-[#2A2E4A] bg-[#1E2235] text-[#EAECF5]'
            : 'rounded-tr-[4px] border border-[#10B981]/30 bg-[#10B981]/15 text-[#EAECF5]'
        }`}
      >
        {msg.text}
      </div>
    </div>
  )
}

// Feedback card rendered directly beneath a candidate answer.
function AnswerFeedback({ feedback }) {
  const tone = VERDICT[feedback.verdict] ?? VERDICT.mixed
  const Icon = tone.Icon
  return (
    <div className={`ml-auto w-full max-w-[80%] rounded-[14px] border px-4 py-3.5 ${tone.card}`}>
      <div className="flex flex-wrap items-center gap-2">
        <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-[3px] text-[11px] font-semibold ${tone.chip}`}>
          <Icon className="h-3 w-3" />
          {tone.label}
        </span>
        {feedback.score ? (
          <span className="rounded-full border border-[#2A2E4A] bg-[#1A1D2E] px-2.5 py-[3px] text-[11px] font-medium text-[#A0A8C8]">
            {feedback.score}
          </span>
        ) : null}
        <span className="text-[11px] font-medium uppercase tracking-[.05em] text-[#5A6080]">AI feedback on this answer</span>
      </div>

      <p className={`mt-2.5 text-[13px] font-semibold leading-relaxed ${tone.accent}`}>{feedback.headline}</p>

      <ul className="mt-2.5 space-y-1.5">
        {feedback.points.map((point) => (
          <li key={point.text} className="flex items-start gap-2">
            <span className={`mt-[3px] flex h-[15px] w-[15px] shrink-0 items-center justify-center rounded-full ${
              point.type === 'plus' ? 'bg-[#10B981]/20 text-[#6EE7B7]' : 'bg-[#EF4444]/20 text-[#FCA5A5]'
            }`}>
              {point.type === 'plus' ? <Plus className="h-2.5 w-2.5" /> : <Minus className="h-2.5 w-2.5" />}
            </span>
            <span className="text-[12.5px] leading-relaxed text-[#A0A8C8]">{point.text}</span>
          </li>
        ))}
      </ul>

      {feedback.rewrite ? (
        <div className="mt-3 rounded-[10px] border border-[#2A2E4A] bg-[#1A1D2E] px-3 py-2.5">
          <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[.07em] text-[#8B91AE]">
            <Lightbulb className="h-3 w-3 text-[#FCD34D]" />
            Stronger version
          </div>
          <p className="mt-1.5 text-[12.5px] italic leading-relaxed text-[#C6CCE4]">“{feedback.rewrite}”</p>
        </div>
      ) : null}
    </div>
  )
}

export default function InterviewReviewPage() {
  const { sessionId } = useParams()
  const navigate = useNavigate()
  const review = useMemo(() => getSessionReview(sessionId), [sessionId])

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 })
  }, [sessionId])

  const backToPractice = () => navigate('/student/ai-companion', {
    state: { activeMode: 'practice', practiceView: 'history' },
  })

  if (!review?.transcript) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#0F1120] text-[#EAECF5]">
        <p className="text-[15px] font-semibold">No review available for this session.</p>
        <button
          type="button"
          onClick={backToPractice}
          className="mt-4 flex items-center gap-2 rounded-full bg-[#5B6CF9] px-5 py-2.5 text-[13px] font-medium text-white transition hover:opacity-90"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Interview Practice
        </button>
      </div>
    )
  }

  const { session, transcript } = review
  const answers = transcript.messages.filter((m) => m.role === 'user' && m.feedback)
  const counts = answers.reduce((acc, m) => {
    acc[m.feedback.verdict] = (acc[m.feedback.verdict] ?? 0) + 1
    return acc
  }, {})

  return (
    <div className="flex min-h-screen flex-col bg-[#0F1120]">
      {/* Topbar — mirrors the live AI Interview session */}
      <div className="sticky top-0 z-10 flex h-[52px] shrink-0 items-center justify-between border-b border-[#2A2E4A] bg-[#181B2E] px-6">
        <div className="flex items-center gap-3.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#5B6CF9] text-[14px] font-bold text-white">C</div>
          <span className="text-[14px] font-semibold text-[#EAECF5]">Session review</span>
          <span className="h-[18px] w-[.5px] bg-[#363B5E]" />
          <span className="text-[12px] text-[#A0A8C8]">{session.role} · {session.company} · {session.diff}</span>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 rounded-full border border-[#363B5E] px-3 py-1 text-[12px] font-medium text-[#A0A8C8]">
            <Clock className="h-3 w-3" /> {session.duration}
          </div>
          <span className="h-[18px] w-[.5px] bg-[#363B5E]" />
          <button
            type="button"
            onClick={backToPractice}
            title="Close review"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#363B5E] bg-[#1E2235] text-[#A0A8C8] transition hover:bg-[#252942] hover:text-[#EAECF5]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Summary strip */}
      <div className="border-b border-[#2A2E4A] bg-[#131629] px-6 py-5">
        <div className="mx-auto flex w-full max-w-[860px] flex-wrap items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="text-[18px] font-bold text-[#EAECF5]">
              {session.role} interview · {session.date}
            </div>
            <p className="mt-1 max-w-[520px] text-[13px] leading-relaxed text-[#8B91AE]">{transcript.summary}</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className="text-[22px] font-bold leading-none text-[#EAECF5]">{session.score}</div>
              <div className="mt-1 text-[11px] text-[#8B91AE]">Score</div>
            </div>
            <div className="text-right">
              <div className="text-[22px] font-bold leading-none text-[#6EE7B7]">{counts.highlight ?? 0}</div>
              <div className="mt-1 text-[11px] text-[#8B91AE]">Highlights</div>
            </div>
            <div className="text-right">
              <div className="text-[22px] font-bold leading-none text-[#FCA5A5]">{counts.mistake ?? 0}</div>
              <div className="mt-1 text-[11px] text-[#8B91AE]">Mistakes</div>
            </div>
          </div>
        </div>
      </div>

      {/* Transcript */}
      <div className="flex-1 py-6">
        <div className="mx-auto flex w-full max-w-[860px] flex-col gap-5 px-6">
          {transcript.messages.map((msg, index) => (
            <React.Fragment key={`${msg.role}-${index}`}>
              <MessageBubble msg={msg} interviewer={transcript.interviewer} />
              {msg.role === 'user' && msg.feedback ? <AnswerFeedback feedback={msg.feedback} /> : null}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Footer dock — mirrors the session control dock */}
      <div className="sticky bottom-0 shrink-0 border-t border-[#2A2E4A] bg-[#181B2E] px-6 py-4">
        <div className="mx-auto flex max-w-[860px] flex-wrap items-center justify-between gap-3">
          <span className="text-[12px] text-[#5A6080]">
            {answers.length} answers reviewed · feedback is generated from this session's transcript
          </span>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={backToPractice}
              className="flex h-[42px] items-center justify-center gap-1.5 rounded-[10px] border border-[#363B5E] bg-transparent px-4 text-[13px] font-medium text-[#A0A8C8] transition hover:bg-[#1E2235] hover:text-[#EAECF5]"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to history
            </button>
            <button
              type="button"
              onClick={() => navigate('/student/ai-companion', { state: { activeMode: 'practice', restartSessionId: session.id } })}
              className="flex h-[42px] items-center justify-center gap-1.5 rounded-[10px] bg-[#5B6CF9] px-4 text-[13px] font-medium text-white transition hover:opacity-90"
            >
              <RefreshCw className="h-3.5 w-3.5" /> Practise this again
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
