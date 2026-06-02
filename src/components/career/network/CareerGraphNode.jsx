import React from 'react'

const roleSize = {
  high: 'h-24 w-24',
  good: 'h-20 w-20',
}

function getMatchLevel(matchScore) {
  if (matchScore >= 80) return 'high'
  return 'good'
}

export default function CareerGraphNode({ node, type, selected, dimmed, onClick, onHover, onLeave }) {
  const isCenter = type === 'center'
  const isRole = type === 'role'
  const level = isRole ? getMatchLevel(node.matchScore) : null
  const nodeSize = isCenter ? 'h-32 w-32' : isRole ? roleSize[level] : 'h-16 w-16'
  const nodeColor = isCenter
    ? 'bg-gradient-to-br from-violet-500 via-indigo-500 to-blue-500 text-white shadow-[0_0_42px_rgba(109,93,252,0.55)]'
    : isRole
      ? selected
        ? 'bg-gradient-to-br from-violet-600 to-blue-500 text-white shadow-[0_0_34px_rgba(109,93,252,0.5)] ring-4 ring-violet-100'
        : 'bg-gradient-to-br from-indigo-500 to-blue-500 text-white shadow-[0_16px_36px_rgba(59,86,230,0.32)]'
      : 'bg-gradient-to-br from-emerald-50 to-teal-100 text-[#113f45] shadow-[0_12px_26px_rgba(20,184,166,0.16)] ring-1 ring-emerald-200/80'

  return (
    <button
      type="button"
      onClick={isRole ? onClick : undefined}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={`absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full text-center transition-all duration-200 hover:z-20 hover:scale-105 ${nodeSize} ${nodeColor} ${
        dimmed ? 'opacity-25 grayscale' : 'opacity-100'
      } ${isRole ? 'cursor-pointer' : 'cursor-default'}`}
      style={{ left: `${node.position.x}%`, top: `${node.position.y}%` }}
      aria-label={isRole ? `${node.label}, ${node.matchScore}% match` : node.label}
    >
      <span className={`${isCenter ? 'text-2xl' : isRole ? 'text-[11px]' : 'text-[10px]'} font-bold leading-tight`}>
        {isCenter ? node.label : node.label}
      </span>
      <span className={`${isCenter ? 'mt-2 text-sm' : 'mt-1 text-[10px]'} font-semibold leading-tight opacity-90`}>
        {isCenter ? node.currentRole : isRole ? `${node.matchScore}%` : node.level}
      </span>
      {isCenter ? <span className="mt-1 text-sm font-bold">{node.matchScore}% Match</span> : null}
    </button>
  )
}

