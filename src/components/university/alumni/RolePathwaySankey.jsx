import React, { useState } from 'react'
import { rolePathway } from '../../../data/alumniSignalsData'

const W = 560
const H = 240
const NODE_W = 12
const LEFT_X = 110
const RIGHT_X = W - 110

function layout(items) {
  const total = items.reduce((sum, item) => sum + item.pct, 0)
  let cursor = 10
  return items.map((item) => {
    const height = (item.pct / total) * (H - 20)
    const node = { ...item, y0: cursor, y1: cursor + height }
    cursor += height
    return node
  })
}

export default function RolePathwaySankey() {
  const [hovered, setHovered] = useState(null) // { i, track, role, weight, x, y }
  const trackNodes = layout(rolePathway.tracks)
  const roleNodes = layout(rolePathway.roles)

  // Track running offsets so multiple flows from/to the same node stack instead of overlapping.
  const trackOffsets = trackNodes.map(() => 0)
  const roleOffsets = roleNodes.map(() => 0)

  const ribbons = rolePathway.flows.map(([trackIdx, roleIdx, weight], i) => {
    const track = trackNodes[trackIdx]
    const role = roleNodes[roleIdx]
    const trackHeight = (track.y1 - track.y0) * weight
    const roleHeight = (role.y1 - role.y0) * (weight * 0.9)

    const sy0 = track.y0 + trackOffsets[trackIdx]
    const sy1 = sy0 + trackHeight
    trackOffsets[trackIdx] += trackHeight

    const ty0 = role.y0 + roleOffsets[roleIdx]
    const ty1 = ty0 + roleHeight
    roleOffsets[roleIdx] += roleHeight

    const x0 = LEFT_X + NODE_W
    const x1 = RIGHT_X
    const cx = (x0 + x1) / 2

    const path = `M${x0},${sy0} C${cx},${sy0} ${cx},${ty0} ${x1},${ty0} L${x1},${ty1} C${cx},${ty1} ${cx},${sy1} ${x0},${sy1} Z`
    const isHovered = hovered?.i === i
    const midY = (sy0 + ty0) / 2

    return (
      <path
        key={i}
        d={path}
        fill={track.tone}
        fillOpacity={isHovered ? 0.55 : hovered ? 0.08 : 0.18}
        stroke={isHovered ? track.tone : 'none'}
        strokeWidth={isHovered ? 1 : 0}
        className="cursor-pointer transition-all duration-200"
        onMouseEnter={() => setHovered({ i, track: track.label, role: role.label, weight, x: cx, y: midY })}
        onMouseLeave={() => setHovered((prev) => (prev?.i === i ? null : prev))}
      />
    )
  })

  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <h2 className="text-sm font-bold text-gray-900">Graduate Role Pathway</h2>
      <p className="text-xs text-gray-400">{rolePathway.subtitle} — hover a flow for the exact share</p>

      <div className="relative mt-3">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
          {ribbons}
          {trackNodes.map((node) => (
            <rect key={node.id} x={LEFT_X} y={node.y0} width={NODE_W} height={node.y1 - node.y0} rx="3" fill={node.tone} />
          ))}
          {roleNodes.map((node) => (
            <rect key={node.id} x={RIGHT_X} y={node.y0} width={NODE_W} height={node.y1 - node.y0} rx="3" fill="#cbd5e1" />
          ))}
        </svg>

        <div className="pointer-events-none absolute inset-0">
          {trackNodes.map((node) => (
            <div
              key={node.id}
              className="absolute -translate-y-1/2 text-right"
              style={{ left: 0, width: `${((LEFT_X - 8) / W) * 100}%`, top: `${((node.y0 + node.y1) / 2 / H) * 100}%` }}
            >
              <p className="text-xs font-semibold text-gray-800">{node.label}</p>
              <p className="text-xs font-bold" style={{ color: node.tone }}>{node.pct}%</p>
            </div>
          ))}
          {roleNodes.map((node) => (
            <div
              key={node.id}
              className="absolute -translate-y-1/2"
              style={{ left: `${((RIGHT_X + NODE_W + 8) / W) * 100}%`, top: `${((node.y0 + node.y1) / 2 / H) * 100}%` }}
            >
              <p className="flex items-baseline gap-2 text-xs font-semibold text-gray-800">
                {node.label}
                <span className="text-xs font-bold text-gray-500">{node.pct}%</span>
              </p>
            </div>
          ))}
        </div>

        {hovered ? (
          <div
            className="pointer-events-none absolute -translate-x-1/2 -translate-y-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-center shadow-lg"
            style={{ left: `${(hovered.x / W) * 100}%`, top: `${(hovered.y / H) * 100}%`, marginTop: -8 }}
          >
            <p className="whitespace-nowrap text-xs font-semibold text-gray-800">{hovered.track} → {hovered.role}</p>
            <p className="text-xs font-bold text-[#185FA5]">{Math.round(hovered.weight * 100)}% of track graduates</p>
          </div>
        ) : null}
      </div>

      <p className="mt-2 text-xs italic text-gray-400">{rolePathway.footnote}</p>
    </section>
  )
}
