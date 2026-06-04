import React from 'react'

// Color palettes used by the radar — `indigo` matches the existing look,
// `emerald` is reserved for the technical-skill detail radar so the user can
// visually distinguish the drill-down from the main chart.
const ACCENT_PALETTES = {
  indigo: {
    stroke: '#6366f1',
    dot: '#4f46e5',
    fill: 'rgba(99,102,241,0.18)',
    highlightRing: '#4f46e5',
  },
  emerald: {
    stroke: '#10b981',
    dot: '#059669',
    fill: 'rgba(16,185,129,0.18)',
    highlightRing: '#047857',
  },
}

function polarPoint(index, total, value, radius = 96, center = 120) {
  const angle = -90 + (360 / total) * index
  const radians = (Math.PI / 180) * angle
  const scaledRadius = radius * (value / 100)
  return {
    x: center + scaledRadius * Math.cos(radians),
    y: center + scaledRadius * Math.sin(radians),
  }
}

/**
 * RadarChartMock
 *
 * Props:
 * - data: Array<{ label: string, value: number, isTechnical?: boolean, breakdown?: Array }>
 * - onCategoryClick?: (item) => void — when provided, items with `isTechnical: true`
 *   become clickable (used to drive the drill-down detail radar).
 * - highlightedLabel?: string — visually highlights the dot of the currently
 *   selected category.
 * - accent?: 'indigo' | 'emerald' — color palette.
 */
export default function RadarChartMock({
  data,
  onCategoryClick,
  highlightedLabel,
  accent = 'indigo',
}) {
  const center = 120
  const rings = [0.33, 0.66, 1]
  const palette = ACCENT_PALETTES[accent] ?? ACCENT_PALETTES.indigo
  const polygonPoints = data.map((item, index) => polarPoint(index, data.length, item.value, 92, center))
  const polygon = polygonPoints.map((point) => `${point.x},${point.y}`).join(' ')

  return (
    <div className="mx-auto max-w-sm">
      <svg viewBox="0 0 240 240" className="h-72 w-full">
        {rings.map((ring) => {
          const points = data.map((_, index) => polarPoint(index, data.length, ring * 100, 92, center))
          return (
            <polygon
              key={ring}
              points={points.map((point) => `${point.x},${point.y}`).join(' ')}
              fill="none"
              stroke="#e0e7ff"
              strokeWidth="1"
            />
          )
        })}
        {data.map((_, index) => {
          const end = polarPoint(index, data.length, 100, 92, center)
          return <line key={index} x1={center} y1={center} x2={end.x} y2={end.y} stroke="#e0e7ff" strokeWidth="1" />
        })}
        <polygon points={polygon} fill={palette.fill} stroke={palette.stroke} strokeWidth="2" />

        {polygonPoints.map((point, index) => {
          const item = data[index]
          const clickable = Boolean(onCategoryClick && item.isTechnical)
          const isHighlighted = highlightedLabel === item.label
          return (
            <g key={`dot-${item.label}`}>
              {isHighlighted && (
                <circle
                  cx={point.x}
                  cy={point.y}
                  r="8"
                  fill="none"
                  stroke={palette.highlightRing}
                  strokeWidth="1.5"
                  opacity="0.45"
                />
              )}
              <circle
                cx={point.x}
                cy={point.y}
                r={isHighlighted ? 4.5 : 3.5}
                fill={palette.dot}
              />
              {clickable && (
                // invisible hit-target overlay so the dot is easier to click
                <circle
                  cx={point.x}
                  cy={point.y}
                  r="14"
                  fill="transparent"
                  className="cursor-pointer"
                  onClick={() => onCategoryClick(item)}
                />
              )}
            </g>
          )
        })}

        {data.map((item, index) => {
          const labelPoint = polarPoint(index, data.length, 116, 92, center)
          const clickable = Boolean(onCategoryClick && item.isTechnical)
          const isHighlighted = highlightedLabel === item.label
          const labelClass = clickable
            ? `cursor-pointer text-[9px] font-semibold ${
                isHighlighted ? 'fill-indigo-700' : 'fill-blue-600 hover:fill-blue-800'
              }`
            : `text-[9px] font-semibold ${isHighlighted ? 'fill-indigo-700' : 'fill-slate-600'}`
          return (
            <text
              key={`label-${item.label}`}
              x={labelPoint.x}
              y={labelPoint.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className={labelClass}
              onClick={clickable ? () => onCategoryClick(item) : undefined}
            >
              {item.label}
            </text>
          )
        })}
      </svg>
    </div>
  )
}
