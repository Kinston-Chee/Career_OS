import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AlertTriangle, TrendingDown, TrendingUp, Users } from 'lucide-react'
import {
  OVERALL_RETENTION,
  RETENTION_DEPARTMENTS,
  RISK_BADGE,
  RISK_COLOR,
  TOTAL_AT_RISK,
  TOTAL_HEADCOUNT,
} from '../../data/retentionData'

const START_ANGLE = -Math.PI / 2

// Retention bands behind each colour, so the legend explains the mapping.
const RISK_RANGE = {
  critical: 'below 82%',
  high: '82–86%',
  medium: '86–90%',
  good: '90–94%',
  great: '94%+',
}
// Space kept outside the slices so small departments can be labelled with a
// leader line instead of being left unnamed.
const LABEL_RIM = 46
// Slices at or above this share of headcount are labelled inside the slice.
const INSIDE_LABEL_MIN = 0.075

// Slice size comes from headcount; the inner arc within each slice shows that
// department's retention rate.
const FRACTIONS = RETENTION_DEPARTMENTS.map((dept) => dept.headcount / TOTAL_HEADCOUNT)

function TrendPill({ trend }) {
  const up = trend >= 0
  const Icon = up ? TrendingUp : TrendingDown
  return (
    <span className={`inline-flex items-center gap-0.5 text-[10.5px] font-semibold ${up ? 'text-emerald-600' : 'text-red-500'}`}>
      <Icon className="h-3 w-3" />
      {up ? '+' : ''}{trend.toFixed(1)}%
    </span>
  )
}

export default function EmployerRetentionTracker() {
  const canvasRef = useRef(null)
  const stageRef = useRef(null)
  const [mode, setMode] = useState('donut') // 'donut' | 'pie'
  const [selectedId, setSelectedId] = useState(null)
  const [hoveredId, setHoveredId] = useState(null)
  const [tip, setTip] = useState(null)
  const [size, setSize] = useState(340)

  const selected = RETENTION_DEPARTMENTS.find((dept) => dept.id === selectedId) || null

  // ── Draw ────────────────────────────────────────────────────────────────
  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = window.devicePixelRatio || 1
    canvas.width = size * dpr
    canvas.height = size * dpr
    canvas.style.width = `${size}px`
    canvas.style.height = `${size}px`

    const ctx = canvas.getContext('2d')
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, size, size)

    const cx = size / 2
    const cy = size / 2
    const outerR = size / 2 - LABEL_RIM
    const donut = mode === 'donut'
    const innerR = donut ? outerR * 0.46 : 0
    const arcR = donut ? outerR * 0.62 : outerR * 0.6

    let angle = START_ANGLE
    FRACTIONS.forEach((frac, i) => {
      const dept = RETENTION_DEPARTMENTS[i]
      const sweep = frac * Math.PI * 2
      const end = angle + sweep
      const mid = angle + sweep / 2
      const active = hoveredId === dept.id || selectedId === dept.id
      const col = RISK_COLOR[dept.riskLevel]

      const explode = active ? 8 : 0
      const ox = Math.cos(mid) * explode
      const oy = Math.sin(mid) * explode

      ctx.save()
      ctx.translate(ox, oy)

      if (active) {
        ctx.shadowColor = `${col.fill}88`
        ctx.shadowBlur = 16
      }

      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.arc(cx, cy, outerR, angle, end)
      ctx.closePath()

      const grad = ctx.createLinearGradient(
        cx + Math.cos(mid) * innerR, cy + Math.sin(mid) * innerR,
        cx + Math.cos(mid) * outerR, cy + Math.sin(mid) * outerR,
      )
      grad.addColorStop(0, col.light)
      grad.addColorStop(1, col.fill)
      ctx.fillStyle = grad
      ctx.fill()
      ctx.shadowBlur = 0

      ctx.strokeStyle = '#ffffff'
      ctx.lineWidth = active ? 2.5 : 1.5
      ctx.stroke()

      // Inner arc = retention rate for this department.
      if (donut) {
        const arcW = outerR * 0.1
        ctx.beginPath()
        ctx.arc(cx, cy, arcR, angle, end)
        ctx.strokeStyle = 'rgba(255,255,255,0.18)'
        ctx.lineWidth = arcW
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(cx, cy, arcR, angle, angle + sweep * (dept.retention / 100))
        ctx.strokeStyle = '#ffffff'
        ctx.globalAlpha = 0.55 + (dept.retention / 100) * 0.4
        ctx.lineWidth = arcW
        ctx.stroke()
        ctx.globalAlpha = 1
      }

      ctx.restore()

      // Every department is labelled: inside the slice when it is wide enough,
      // otherwise just outside it with a short leader line.
      if (frac >= INSIDE_LABEL_MIN) {
        const labelR = outerR * (donut ? 0.8 : 0.7)
        ctx.save()
        ctx.translate(cx + ox + Math.cos(mid) * labelR, cy + oy + Math.sin(mid) * labelR)
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillStyle = '#ffffff'
        ctx.shadowColor = 'rgba(0,0,0,.45)'
        ctx.shadowBlur = 4
        ctx.font = `${active ? '700' : '600'} 11px "DM Sans", system-ui, sans-serif`
        ctx.fillText(dept.name, 0, -6)
        ctx.font = '700 11px ui-monospace, monospace'
        ctx.fillText(`${dept.retention.toFixed(1)}%`, 0, 7)
        ctx.shadowBlur = 0
        ctx.restore()
      } else {
        const right = Math.cos(mid) >= 0
        const x1 = cx + ox + Math.cos(mid) * (outerR + 2)
        const y1 = cy + oy + Math.sin(mid) * (outerR + 2)
        const x2 = cx + ox + Math.cos(mid) * (outerR + 13)
        const y2 = cy + oy + Math.sin(mid) * (outerR + 13)

        ctx.save()
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.lineTo(x2 + (right ? 6 : -6), y2)
        ctx.strokeStyle = col.fill
        ctx.lineWidth = 1.2
        ctx.stroke()

        ctx.textAlign = right ? 'left' : 'right'
        ctx.textBaseline = 'middle'
        ctx.fillStyle = '#1B2545'
        ctx.font = `${active ? '700' : '600'} 10.5px "DM Sans", system-ui, sans-serif`
        ctx.fillText(dept.name, x2 + (right ? 9 : -9), y2 - 5)
        ctx.fillStyle = col.fill
        ctx.font = '700 10.5px ui-monospace, monospace'
        ctx.fillText(`${dept.retention.toFixed(1)}%`, x2 + (right ? 9 : -9), y2 + 6)
        ctx.restore()
      }

      angle = end
    })

    // In pie mode there is no hole, so lay a soft plate under the hub text to
    // keep the company retention rate readable over the slices.
    if (!donut) {
      ctx.beginPath()
      ctx.arc(cx, cy, outerR * 0.36, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(255,255,255,0.92)'
      ctx.fill()
    }

    if (donut) {
      // Punch the hole for the company-wide readout.
      ctx.beginPath()
      ctx.arc(cx, cy, innerR, 0, Math.PI * 2)
      ctx.fillStyle = '#ffffff'
      ctx.fill()
      ctx.strokeStyle = 'rgba(0,0,0,.06)'
      ctx.lineWidth = 1
      ctx.stroke()

      // Dashed ring around the hub = company-wide retention.
      ctx.beginPath()
      ctx.arc(cx, cy, innerR + 5, START_ANGLE, START_ANGLE + Math.PI * 2 * (OVERALL_RETENTION / 100))
      ctx.strokeStyle = '#5B6CF9'
      ctx.setLineDash([4, 3])
      ctx.globalAlpha = 0.35
      ctx.lineWidth = 2
      ctx.stroke()
      ctx.setLineDash([])
      ctx.globalAlpha = 1
    }
  }, [size, mode, hoveredId, selectedId])

  useEffect(() => { draw() }, [draw])

  // Keep the canvas square and sized to its column.
  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return undefined
    const observer = new ResizeObserver((entries) => {
      const rect = entries[0]?.contentRect
      if (!rect) return
      setSize(Math.max(280, Math.min(rect.width - 16, 420)))
    })
    observer.observe(stage)
    return () => observer.disconnect()
  }, [])

  // ── Hit testing ─────────────────────────────────────────────────────────
  const deptAt = (event) => {
    const canvas = canvasRef.current
    if (!canvas) return null
    const rect = canvas.getBoundingClientRect()
    const dx = event.clientX - rect.left - rect.width / 2
    const dy = event.clientY - rect.top - rect.height / 2
    const dist = Math.hypot(dx, dy)
    const outerR = rect.width / 2 - LABEL_RIM
    const innerR = mode === 'donut' ? outerR * 0.46 : 0
    if (dist < innerR || dist > outerR + 8) return null

    let a = Math.atan2(dy, dx) - START_ANGLE
    if (a < 0) a += Math.PI * 2

    let cursor = 0
    for (let i = 0; i < RETENTION_DEPARTMENTS.length; i += 1) {
      const sweep = FRACTIONS[i] * Math.PI * 2
      if (a >= cursor && a < cursor + sweep) return RETENTION_DEPARTMENTS[i]
      cursor += sweep
    }
    return null
  }

  const handleMove = (event) => {
    const dept = deptAt(event)
    setHoveredId(dept?.id ?? null)
    setTip(dept ? { x: event.clientX, y: event.clientY, dept } : null)
  }

  const handleLeave = () => {
    setHoveredId(null)
    setTip(null)
  }

  const toggle = (id) => setSelectedId((prev) => (prev === id ? null : id))

  // ── Centre hub: company retention unless a department is selected ───────
  const hubRate = selected ? selected.retention : OVERALL_RETENTION
  const hubColor = selected ? RISK_COLOR[selected.riskLevel].fill : '#5B6CF9'
  const hubLabel = selected ? selected.name : 'Company retention'
  const hubSub = selected
    ? `${selected.headcount} staff · ${selected.atRisk} at risk`
    : `${TOTAL_HEADCOUNT} employees · ${TOTAL_AT_RISK} at risk`

  return (
    <section className="flex flex-col overflow-hidden rounded-2xl border border-white/70 bg-white/85 shadow-[0_10px_30px_rgba(24,95,165,0.08)] backdrop-blur-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E8EEF8] px-5 py-3.5">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
          <p className="text-sm font-bold text-[#1B2545]">Talent Retention Tracker</p>
          <span className="text-[11px] font-medium text-[#8A96B3]">Retention rate by department</span>
        </div>
        <Link
          to="/employer/retention"
          className="ml-auto mr-1 text-[11px] font-bold text-[#155EE8] hover:underline"
        >
          Open retention monitor
        </Link>
        <div className="flex items-center gap-0.5 rounded-lg border border-[#D8E0F0] bg-[#F4F7FD] p-[2px]">
          {['donut', 'pie'].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setMode(option)}
              className={`rounded-md px-2.5 py-1 text-[11px] font-semibold capitalize transition ${
                mode === option ? 'bg-white text-[#1B2545] shadow-sm' : 'text-[#8A96B3] hover:text-[#415174]'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Legend — what each colour means, and what the inner arc shows */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-[#E8EEF8] bg-[#FBFCFF] px-5 py-2.5">
        {Object.entries(RISK_COLOR).map(([key, col]) => (
          <span key={key} className="flex items-center gap-1.5 text-[11px] font-medium text-[#50607E]">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: col.fill }} />
            {col.label}
            <span className="text-[10px] text-[#8A96B3]">{RISK_RANGE[key]}</span>
          </span>
        ))}
        <span className="ml-auto flex items-center gap-2 border-l border-[#E8EEF8] pl-4 text-[11px] font-medium text-[#50607E]">
          <span className="relative inline-flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-[#C8CDD6]">
            <span className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#5B6CF9] border-r-[#5B6CF9]" />
          </span>
          Inner white arc = that department&rsquo;s retention rate
        </span>
      </div>

      <div className="grid flex-1 grid-cols-1 md:grid-cols-[minmax(0,1fr)_236px]">
        <div ref={stageRef} className="relative flex min-h-[380px] items-center justify-center p-3">
          <canvas
            ref={canvasRef}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            onClick={(event) => {
              const dept = deptAt(event)
              setSelectedId((prev) => (dept ? (prev === dept.id ? null : dept.id) : null))
            }}
            className="block cursor-pointer"
          />
          <div className="pointer-events-none absolute flex flex-col items-center text-center">
            <span className="font-mono text-[26px] font-bold leading-none" style={{ color: hubColor }}>
              {hubRate.toFixed(1)}%
            </span>
            <span className="mt-1 text-[11px] font-semibold text-[#1B2545]">{hubLabel}</span>
            <span className="mt-0.5 text-[10px] font-medium text-[#8A96B3]">{hubSub}</span>
          </div>
        </div>

        <div className="no-scrollbar overflow-y-auto border-t border-[#E8EEF8] p-3 md:border-l md:border-t-0">
          {RETENTION_DEPARTMENTS.map((dept) => {
            const col = RISK_COLOR[dept.riskLevel]
            const active = selectedId === dept.id
            return (
              <button
                key={dept.id}
                type="button"
                onClick={() => toggle(dept.id)}
                onMouseEnter={() => setHoveredId(dept.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`mb-1 flex w-full items-center gap-2.5 rounded-lg border px-2.5 py-2 text-left transition ${
                  active ? 'border-[#D0D4F5] bg-[#EEF0FF]' : 'border-transparent hover:border-[#E8EEF8] hover:bg-[#F7F8FF]'
                }`}
              >
                <span className="h-3 w-3 shrink-0 rounded-[3px]" style={{ background: col.fill }} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[12px] font-semibold text-[#1B2545]">{dept.name}</span>
                  <span className="flex items-center gap-1.5 text-[10.5px] text-[#8A96B3]">
                    {dept.headcount} staff <TrendPill trend={dept.trend} />
                  </span>
                </span>
                <span className="shrink-0 text-right">
                  <span className="block font-mono text-[12px] font-bold" style={{ color: col.fill }}>
                    {dept.retention.toFixed(1)}%
                  </span>
                  <span className={`mt-0.5 inline-block rounded border px-1 py-[1px] text-[9px] font-bold uppercase tracking-wide ${RISK_BADGE[dept.riskLevel]}`}>
                    {col.label}
                  </span>
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex items-center gap-3 border-t border-[#E8EEF8] bg-[#F7F8FF] px-5 py-2.5">
        <span className="flex items-center gap-1.5 whitespace-nowrap text-[10.5px] font-bold uppercase tracking-wide text-[#8A96B3]">
          <Users className="h-3.5 w-3.5" /> Company average
        </span>
        <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#E4E7FF]">
          <span
            className="block h-full rounded-full bg-gradient-to-r from-[#5B6CF9] to-[#8B96FB] transition-[width] duration-1000"
            style={{ width: `${OVERALL_RETENTION}%` }}
          />
        </span>
        <span className="font-mono text-[13px] font-bold text-[#5B6CF9]">{OVERALL_RETENTION.toFixed(1)}%</span>
        <span className="flex items-center gap-1 whitespace-nowrap text-[10.5px] font-semibold text-orange-500">
          <AlertTriangle className="h-3 w-3" /> {TOTAL_AT_RISK} at risk
        </span>
      </div>

      {tip ? (
        <div
          className="pointer-events-none fixed z-[999] min-w-[164px] rounded-lg bg-[#1A1D3A] px-3 py-2 text-white shadow-[0_8px_24px_rgba(0,0,0,.2)]"
          style={{ left: tip.x + 14, top: tip.y - 10 }}
        >
          <p className="mb-1 text-[11.5px] font-bold" style={{ color: RISK_COLOR[tip.dept.riskLevel].light }}>
            {tip.dept.name}
          </p>
          {[
            ['Retention', `${tip.dept.retention.toFixed(1)}%`],
            ['Headcount', `${tip.dept.headcount} (${((tip.dept.headcount / TOTAL_HEADCOUNT) * 100).toFixed(0)}%)`],
            ['At risk', `${tip.dept.atRisk} staff`],
            ['30d trend', `${tip.dept.trend >= 0 ? '+' : ''}${tip.dept.trend.toFixed(1)}%`],
          ].map(([label, value]) => (
            <p key={label} className="flex justify-between gap-4 text-[10.5px] opacity-85">
              <span>{label}</span><span>{value}</span>
            </p>
          ))}
        </div>
      ) : null}
    </section>
  )
}
