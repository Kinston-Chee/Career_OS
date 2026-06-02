import React from 'react'

export default function CareerGraphTooltip({ node }) {
  if (!node) return null

  return (
    <div
      className="pointer-events-none absolute z-30 w-56 -translate-x-1/2 rounded-2xl border border-violet-100 bg-white/95 p-4 text-xs shadow-[0_18px_44px_rgba(88,63,188,0.18)] backdrop-blur-xl"
      style={{ left: `${node.position.x}%`, top: `calc(${node.position.y}% - 6rem)` }}
    >
      <p className="text-sm font-bold text-[#17124d]">{node.label}</p>
      {'matchScore' in node ? <p className="mt-1 font-semibold text-violet-700">{node.matchScore}% match</p> : <p className="mt-1 font-semibold text-emerald-700">{node.level} demand</p>}
      {'salaryRange' in node ? <p className="mt-2 text-slate-500">{node.salaryRange}</p> : null}
      {node.skills?.length ? <p className="mt-2 leading-5 text-slate-500">Top skills: {node.skills.join(', ')}</p> : null}
    </div>
  )
}

