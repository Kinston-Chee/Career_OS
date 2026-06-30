import React from 'react'
import { BookOpen, Briefcase, CheckCircle2, GraduationCap, TrendingUp, X } from 'lucide-react'
import { gapEvidence } from '../../../data/curriculumAlignmentData'

function MiniTrendLine({ points }) {
  const max = Math.max(...points)
  const min = Math.min(...points)
  const w = 100
  const h = 36
  const coords = points.map((v, i) => {
    const x = (i / (points.length - 1)) * w
    const y = h - ((v - min) / (max - min || 1)) * h
    return [x, y]
  })
  const path = coords.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x},${y}`).join(' ')

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-9 w-full" preserveAspectRatio="none">
      <path d={path} fill="none" stroke="#22c55e" strokeWidth="2" />
      {coords.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.6" fill="#22c55e" />
      ))}
    </svg>
  )
}

export default function EvidenceChain({ selectedGapName, onClose, addedToPack, onAddToPack }) {
  if (!selectedGapName) {
    return (
      <section className="flex h-full min-h-[400px] items-center justify-center rounded-2xl border-l-[3px] border-l-[#185FA5] bg-white p-5 text-center shadow-sm">
        <p className="text-sm text-gray-400">Select a skill node on the left to see its evidence chain</p>
      </section>
    )
  }

  const evidence = gapEvidence[selectedGapName]

  if (!evidence) {
    return (
      <section className="flex h-full min-h-[400px] flex-col items-center justify-center rounded-2xl border-l-[3px] border-l-[#185FA5] bg-white p-5 text-center shadow-sm">
        <div className="flex w-full items-center justify-between">
          <h2 className="text-sm font-bold text-gray-900">Evidence: {selectedGapName}</h2>
          <button type="button" onClick={onClose} className="rounded-full p-1 text-gray-400 hover:bg-gray-50 hover:text-gray-600">
            <X className="h-4 w-4" />
          </button>
        </div>
        <p className="mt-6 text-sm text-gray-400">No evidence chain has been built for this skill yet — try Cloud Computing or Generative AI / LLMs.</p>
      </section>
    )
  }

  return (
    <section className="rounded-2xl border-l-[3px] border-l-[#185FA5] bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-sm font-bold text-gray-900">Evidence: {selectedGapName}</h2>
        <button type="button" onClick={onClose} className="rounded-full p-1 text-gray-400 hover:bg-gray-50 hover:text-gray-600">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-4 space-y-4">
        {/* 1. Curriculum */}
        <div className="flex gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
            <BookOpen className="h-4.5 w-4.5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold text-red-500">1. Curriculum</p>
            <p className="text-sm font-bold text-gray-900">Syllabus coverage: {evidence.curriculum.coveragePct}%</p>
            <div className="mt-1.5 flex items-center gap-2">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-100">
                <div className="h-full rounded-full bg-red-500" style={{ width: `${evidence.curriculum.coveragePct}%` }} />
              </div>
              <span className="text-xs font-semibold text-gray-600">{evidence.curriculum.coveragePct}%</span>
            </div>
            <p className="mt-1 text-xs text-gray-400">{evidence.curriculum.coveredIn}</p>
            <p className="text-xs text-gray-400">{evidence.curriculum.missing}</p>
          </div>
        </div>

        {/* 2. Market Demand */}
        <div className="flex gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-600">
            <TrendingUp className="h-4.5 w-4.5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold text-green-600">2. Market Demand</p>
            <p className="text-sm font-bold text-gray-900">Job posting demand: {evidence.marketDemand.demandPct}%</p>
            <div className="mt-1 flex items-center gap-2">
              <div className="flex-1">
                <div className="flex justify-between text-[10px] text-gray-300">
                  <span>80%</span>
                  <span>40%</span>
                </div>
                <MiniTrendLine points={evidence.marketDemand.trend} />
                <div className="flex justify-between text-[10px] text-gray-400">
                  <span>{evidence.marketDemand.trendStart}</span>
                  <span>{evidence.marketDemand.trendEnd}</span>
                </div>
              </div>
              <span className="text-xl font-bold text-green-600">{evidence.marketDemand.demandPct}%</span>
            </div>
            <p className="mt-1 text-xs text-gray-400">{evidence.marketDemand.detail}</p>
          </div>
        </div>

        {/* 3. Alumni Feedback */}
        <div className="flex gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-50 text-purple-600">
            <GraduationCap className="h-4.5 w-4.5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold text-purple-600">3. Alumni Feedback</p>
            <div className="mt-1 rounded-lg bg-purple-50/70 p-3">
              <p className="text-sm italic leading-5 text-purple-900">&ldquo;{evidence.alumniFeedback.quote}&rdquo;</p>
              <p className="mt-1.5 text-xs text-gray-500">— {evidence.alumniFeedback.attribution}</p>
            </div>
            <p className="mt-1 text-right text-xs font-medium text-purple-600">{evidence.alumniFeedback.citePct}% of surveyed alumni cite this gap</p>
          </div>
        </div>

        {/* 4. Employer Language */}
        <div className="flex gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-600">
            <Briefcase className="h-4.5 w-4.5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold text-orange-600">4. Employer Language</p>
            <p className="text-xs text-gray-400">Common phrases in job postings:</p>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {evidence.employerLanguage.phrases.map((phrase) => (
                <span key={phrase} className="rounded-full bg-orange-50 px-2.5 py-1 text-[11px] text-orange-700">{phrase}</span>
              ))}
            </div>
            <p className="mt-1.5 text-xs text-gray-400">{evidence.employerLanguage.source}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-gray-50 pt-3">
        <p className="text-xs text-gray-400">Confidence: High · Based on 4 independent sources</p>
        <button
          type="button"
          onClick={onAddToPack}
          disabled={addedToPack}
          className={`flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors ${
            addedToPack ? 'border-green-200 bg-green-50 text-green-700' : 'border-[#185FA5] text-[#185FA5] hover:bg-blue-50'
          }`}
        >
          {addedToPack ? <CheckCircle2 className="h-3.5 w-3.5" /> : null}
          {addedToPack ? '✓ Added' : 'Add to evidence pack ✓'}
        </button>
      </div>
    </section>
  )
}
