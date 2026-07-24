import React from 'react'
import { SDG_CATALOG } from '../../../data/engagementsData'

const CATALOG_BY_NUMBER = SDG_CATALOG.reduce((acc, g) => {
  acc[g.number] = g
  return acc
}, {})

function resolve(goal) {
  if (typeof goal === 'number') return CATALOG_BY_NUMBER[goal]
  if (goal && typeof goal === 'object' && typeof goal.number === 'number') {
    return { ...CATALOG_BY_NUMBER[goal.number], ...goal }
  }
  return null
}

// Compact SDG chip: colored square with the SDG number + short title.
export default function SdgBadge({ goal, size = 'md', selected = true, onClick }) {
  const g = resolve(goal)
  if (!g) return null

  const sizes = {
    sm: { pad: 'py-0.5 pl-0.5 pr-2', box: 'h-5 w-5 text-[10px]', text: 'text-[10px]' },
    md: { pad: 'py-1 pl-1 pr-2.5', box: 'h-6 w-6 text-[11px]', text: 'text-[11px]' },
    lg: { pad: 'py-1.5 pl-1.5 pr-3', box: 'h-7 w-7 text-[12px]', text: 'text-[12px]' },
  }[size] || { pad: 'py-1 pl-1 pr-2.5', box: 'h-6 w-6 text-[11px]', text: 'text-[11px]' }

  const clickable = typeof onClick === 'function'
  const Tag = clickable ? 'button' : 'span'

  return (
    <Tag
      type={clickable ? 'button' : undefined}
      onClick={clickable ? () => onClick(g.number) : undefined}
      title={`SDG ${g.number}: ${g.title}`}
      className={`inline-flex items-center gap-1.5 rounded-full ${sizes.pad} font-medium transition ${
        selected
          ? 'border border-transparent text-white shadow-sm'
          : 'border border-gray-200 bg-white text-gray-500 hover:border-gray-300'
      } ${clickable ? 'cursor-pointer' : ''}`}
      style={selected ? { backgroundColor: g.color } : undefined}
    >
      <span
        className={`flex ${sizes.box} shrink-0 items-center justify-center rounded-full font-bold`}
        style={selected ? { backgroundColor: 'rgba(255,255,255,0.22)', color: '#fff' } : { backgroundColor: g.color, color: '#fff' }}
      >
        {g.number}
      </span>
      <span className={`${sizes.text} font-semibold ${selected ? 'text-white' : ''}`}>{g.title}</span>
    </Tag>
  )
}

export function SdgBadgeGroup({ goals, size = 'md', className = '' }) {
  if (!goals || goals.length === 0) return null
  return (
    <div className={`flex flex-wrap gap-1.5 ${className}`}>
      {goals.map((goal, i) => {
        const g = resolve(goal)
        return g ? <SdgBadge key={g.number || i} goal={g} size={size} /> : null
      })}
    </div>
  )
}
