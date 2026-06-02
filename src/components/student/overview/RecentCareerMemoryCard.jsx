import React from 'react'

const toneStyles = {
  amber: 'from-amber-50 to-white text-amber-600 bg-amber-50',
  orange: 'from-orange-50 to-white text-orange-600 bg-orange-50',
  blue: 'from-blue-50 to-white text-blue-600 bg-blue-50',
  indigo: 'from-indigo-50 to-white text-indigo-600 bg-indigo-50',
}

export default function RecentCareerMemoryCard({ memory }) {
  const tone = toneStyles[memory.tone] ?? toneStyles.blue
  const [gradient, textColor, badgeBg] = tone.split(' ')

  return (
    <article className={`rounded-3xl border border-violet-100/80 bg-gradient-to-br ${gradient} ${tone.split(' ')[1]} p-5 shadow-[0_18px_44px_rgba(88,63,188,0.08)]`}>
      <div className="flex items-start gap-4">
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${badgeBg} ${textColor} text-lg font-bold`}>
          C
        </div>
        <div className="min-w-0">
          <span className="rounded-lg bg-violet-50 px-2 py-1 text-[11px] font-bold text-violet-700">{memory.type}</span>
          <h3 className="mt-3 text-sm font-bold text-[#11104a]">{memory.title}</h3>
          <p className="mt-1 text-sm leading-5 text-slate-600">{memory.description}</p>
          <p className="mt-3 text-xs font-medium text-slate-500">{memory.date}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {memory.tags.map((tag) => (
          <span key={tag} className="rounded-lg bg-violet-50 px-2.5 py-1 text-[11px] font-bold text-violet-700">
            {tag}
          </span>
        ))}
      </div>
    </article>
  )
}

