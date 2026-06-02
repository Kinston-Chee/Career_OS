import React from 'react'

const connectionStyles = {
  strong: {
    gradient: 'careerStrongConnection',
    glow: 'careerStrongGlow',
    baseWidth: 0.72,
    lineWidth: 0.34,
    flowWidth: 0.38,
    dash: '',
    flowDash: '1.8 3.4',
    opacity: 0.72,
  },
  gap: {
    gradient: 'careerGapConnection',
    glow: 'careerGapGlow',
    baseWidth: 0.58,
    lineWidth: 0.26,
    flowWidth: 0.3,
    dash: '1.5 2.4',
    flowDash: '1.2 3.2',
    opacity: 0.56,
  },
  unlock: {
    gradient: 'careerUnlockConnection',
    glow: 'careerUnlockGlow',
    baseWidth: 0.48,
    lineWidth: 0.22,
    flowWidth: 0.26,
    dash: '0.5 2.8',
    flowDash: '0.8 3.8',
    opacity: 0.48,
  },
}

function curvePath(from, to) {
  const dx = to.x - from.x
  const dy = to.y - from.y
  const distance = Math.hypot(dx, dy)
  const curve = Math.min(Math.max(distance * 0.32, 7), 18)
  const sweep = dx * dy >= 0 ? 1 : -1
  const normalX = (-dy / Math.max(distance, 1)) * curve * sweep
  const normalY = (dx / Math.max(distance, 1)) * curve * sweep

  const c1x = from.x + dx * 0.28 + normalX
  const c1y = from.y + dy * 0.28 + normalY
  const c2x = from.x + dx * 0.72 - normalX * 0.55
  const c2y = from.y + dy * 0.72 - normalY * 0.55

  return `M ${from.x} ${from.y} C ${c1x} ${c1y} ${c2x} ${c2y} ${to.x} ${to.y}`
}

export default function GraphConnection({ from, to, type = 'gap', active = false, dimmed = false }) {
  const style = connectionStyles[type] ?? connectionStyles.gap
  const path = curvePath(from.position, to.position)
  const opacity = dimmed ? 0.1 : active ? Math.min(style.opacity + 0.24, 0.95) : style.opacity
  const glowOpacity = dimmed ? 0.04 : active ? 0.58 : 0.24

  return (
    <g className="career-graph-connection">
      <path
        d={path}
        fill="none"
        stroke={`url(#${style.gradient})`}
        strokeLinecap="round"
        strokeWidth={style.baseWidth}
        opacity={glowOpacity}
        filter={`url(#${style.glow})`}
      />
      <path
        d={path}
        fill="none"
        stroke={`url(#${style.gradient})`}
        strokeDasharray={style.dash}
        strokeLinecap="round"
        strokeWidth={active ? style.lineWidth + 0.08 : style.lineWidth}
        opacity={opacity}
      />
      {active ? (
        <path
          className="career-graph-flow"
          d={path}
          fill="none"
          stroke="rgba(255,255,255,0.9)"
          strokeDasharray={style.flowDash}
          strokeLinecap="round"
          strokeWidth={style.flowWidth}
          opacity={dimmed ? 0 : 0.82}
        />
      ) : null}
    </g>
  )
}

