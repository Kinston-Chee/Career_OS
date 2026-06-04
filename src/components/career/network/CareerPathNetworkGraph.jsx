import React, { useEffect, useMemo, useRef, useState } from 'react'
import ForceGraph2D from 'react-force-graph-2d'

const SKILL_COLOR = '#64748b' // slate-500 — neutral for all skills
const SKILL_TEXT = '#475569'
const ROLE_TEXT = '#0f172a'
const DIMMED_NODE = 'rgba(148, 163, 184, 0.25)'
const DIMMED_TEXT = 'rgba(148, 163, 184, 0.55)'

function hexToRgba(hex, alpha = 1) {
  const value = hex.replace('#', '')
  const r = parseInt(value.slice(0, 2), 16)
  const g = parseInt(value.slice(2, 4), 16)
  const b = parseInt(value.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

/**
 * IndustryFilter
 *
 * Dropdown that drives which industry is highlighted in the graph. Pass
 * `industries` (with an implicit "All Industries" appended).
 */
function IndustryFilter({ industries, activeIndustry, onChange }) {
  return (
    <label className="flex items-center gap-2 rounded-full border border-violet-200 bg-white/95 px-3 py-1.5 text-xs font-semibold text-violet-700 shadow-sm">
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
        <path
          d="M4 5h16l-6 8v6l-4-2v-4Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-[11px] uppercase tracking-wide text-slate-500">Industry</span>
      <select
        value={activeIndustry}
        onChange={(event) => onChange(event.target.value)}
        className="cursor-pointer bg-transparent text-xs font-semibold text-violet-700 focus:outline-none"
      >
        <option value="all">All industries</option>
        {industries.map((industry) => (
          <option key={industry.id} value={industry.id}>
            {industry.label}
          </option>
        ))}
      </select>
    </label>
  )
}

/**
 * GraphLegend
 *
 * Floating overlay explaining what the dot colors and edge styles mean.
 */
function GraphLegend({ industries }) {
  return (
    <div className="pointer-events-none absolute bottom-3 left-3 z-10 max-w-[220px] rounded-2xl border border-violet-100 bg-white/90 p-3 text-[11px] shadow-[0_10px_24px_rgba(88,63,188,0.12)] backdrop-blur-xl">
      <p className="mb-2 text-[10px] font-bold uppercase tracking-wide text-slate-500">Legend</p>

      <div className="mb-2 space-y-1.5">
        <div className="flex items-center gap-2 font-semibold text-slate-700">
          <span className="inline-block h-3 w-3 rounded-full bg-indigo-500 ring-2 ring-indigo-100" />
          <span>Role (big node)</span>
        </div>
        <div className="flex items-center gap-2 font-semibold text-slate-700">
          <span className="inline-block h-2 w-2 rounded-full bg-slate-500" />
          <span>Skill (small node)</span>
        </div>
      </div>

      <p className="mb-1 text-[10px] font-bold uppercase tracking-wide text-slate-500">Industries</p>
      <div className="grid grid-cols-2 gap-x-2 gap-y-1">
        {industries.map((industry) => (
          <div key={industry.id} className="flex items-center gap-1.5 text-[10.5px] text-slate-600">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: industry.color }}
            />
            <span className="truncate">{industry.label}</span>
          </div>
        ))}
      </div>

      <div className="mt-2 space-y-0.5 border-t border-slate-100 pt-1.5 text-[10.5px] text-slate-500">
        <div className="flex items-center gap-1.5">
          <span className="inline-block h-[2px] w-5 bg-violet-400" />
          <span>Role → Skill</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block h-[2px] w-5 bg-slate-300 [background-image:linear-gradient(to_right,#94a3b8_50%,transparent_50%)] [background-size:6px_2px]" />
          <span>Skill ↔ Skill (similar scope)</span>
        </div>
      </div>
    </div>
  )
}

export default function CareerPathNetworkGraph({ network, selectedPathId, onSelectPath }) {
  const containerRef = useRef(null)
  const fgRef = useRef(null)
  const [size, setSize] = useState({ width: 600, height: 520 })
  const [activeIndustry, setActiveIndustry] = useState('all')

  // Industry color lookup so node painting stays O(1).
  const industryColorById = useMemo(() => {
    const map = {}
    network.industries.forEach((industry) => {
      map[industry.id] = industry.color
    })
    return map
  }, [network.industries])

  // Track container size so the canvas re-fits on resize / sidebar toggle.
  useEffect(() => {
    if (!containerRef.current) return undefined
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (entry) {
        setSize({
          width: Math.max(entry.contentRect.width, 320),
          height: Math.max(entry.contentRect.height, 360),
        })
      }
    })
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  // Build the graph data + dim flags every time the filter changes.
  // useMemo so node objects are stable across renders (force sim mutates them).
  const graphData = useMemo(() => {
    const isAll = activeIndustry === 'all'
    const activeRoleIds = new Set(
      isAll
        ? network.roles.map((role) => role.id)
        : network.roles.filter((role) => role.industry === activeIndustry).map((role) => role.id),
    )
    const skillsInScope = new Set()
    network.roleSkillEdges.forEach((edge) => {
      if (activeRoleIds.has(edge.role)) skillsInScope.add(edge.skill)
    })

    const nodes = [
      ...network.roles.map((role) => ({
        id: role.id,
        name: role.label,
        type: 'role',
        industry: role.industry,
        matchScore: role.matchScore,
        dimmed: !isAll && role.industry !== activeIndustry,
      })),
      ...network.skills.map((skill) => ({
        id: skill.id,
        name: skill.label,
        type: 'skill',
        category: skill.category,
        dimmed: !isAll && !skillsInScope.has(skill.id),
      })),
    ]

    const links = [
      ...network.roleSkillEdges.map((edge) => ({
        source: edge.role,
        target: edge.skill,
        type: 'role-skill',
      })),
      ...network.skillEdges.map((edge) => ({
        source: edge.source,
        target: edge.target,
        type: 'skill-skill',
      })),
    ]

    return { nodes, links }
  }, [network, activeIndustry])

  // Slight extra repulsion so large clusters don't overlap.
  useEffect(() => {
    const fg = fgRef.current
    if (!fg) return
    if (typeof fg.d3Force === 'function') {
      const chargeForce = fg.d3Force('charge')
      if (chargeForce && typeof chargeForce.strength === 'function') {
        chargeForce.strength(-120)
      }
      const linkForce = fg.d3Force('link')
      if (linkForce && typeof linkForce.distance === 'function') {
        linkForce.distance((link) => (link.type === 'role-skill' ? 38 : 26))
      }
    }
  }, [graphData])

  const handleNodeClick = (node) => {
    if (node.type === 'role' && typeof onSelectPath === 'function') {
      onSelectPath(node.id)
    }
  }

  const paintNode = (node, ctx, globalScale) => {
    const isRole = node.type === 'role'
    const radius = isRole ? 9 : 3.4
    const baseColor = isRole ? industryColorById[node.industry] ?? '#6366f1' : SKILL_COLOR
    const fillColor = node.dimmed ? DIMMED_NODE : baseColor

    // Highlight ring when this role is the currently selected path.
    if (isRole && selectedPathId === node.id && !node.dimmed) {
      ctx.beginPath()
      ctx.arc(node.x, node.y, radius + 4, 0, 2 * Math.PI)
      ctx.fillStyle = hexToRgba(baseColor, 0.18)
      ctx.fill()
      ctx.strokeStyle = baseColor
      ctx.lineWidth = 1.5 / globalScale
      ctx.stroke()
    }

    ctx.beginPath()
    ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI)
    ctx.fillStyle = fillColor
    ctx.fill()
    if (isRole && !node.dimmed) {
      ctx.strokeStyle = '#ffffff'
      ctx.lineWidth = 1.6 / globalScale
      ctx.stroke()
    }

    // Labels. Role labels are bold and slightly larger.
    const fontSize = (isRole ? 4.2 : 3.2)
    ctx.font = `${isRole ? '600 ' : '500 '}${fontSize}px Inter, ui-sans-serif, system-ui`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'
    ctx.fillStyle = node.dimmed ? DIMMED_TEXT : isRole ? ROLE_TEXT : SKILL_TEXT
    ctx.fillText(node.name, node.x, node.y + radius + 1.5)
  }

  const paintLink = (link, ctx) => {
    const sourceDimmed = link.source?.dimmed
    const targetDimmed = link.target?.dimmed
    const dimmed = sourceDimmed || targetDimmed
    const isRoleSkill = link.type === 'role-skill'

    ctx.strokeStyle = dimmed
      ? 'rgba(148, 163, 184, 0.18)'
      : isRoleSkill
        ? 'rgba(139, 92, 246, 0.45)'
        : 'rgba(148, 163, 184, 0.55)'
    ctx.lineWidth = isRoleSkill ? 0.55 : 0.35
    if (!isRoleSkill) {
      ctx.setLineDash([1.2, 1.2])
    } else {
      ctx.setLineDash([])
    }
    ctx.beginPath()
    ctx.moveTo(link.source.x, link.source.y)
    ctx.lineTo(link.target.x, link.target.y)
    ctx.stroke()
    ctx.setLineDash([])
  }

  return (
    <section className="overflow-hidden rounded-3xl border border-violet-100/80 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.12),transparent_34%),linear-gradient(135deg,#ffffff_0%,#fbfaff_48%,#f5f2ff_100%)] p-5 shadow-[0_18px_50px_rgba(88,63,188,0.1)]">
      <header className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-[#17124d]">Your Career Path Network</h2>
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-violet-200 text-xs font-bold text-violet-500">
              i
            </span>
          </div>
          <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
            Explore how roles, skills and adjacent careers connect. Drag a node to reposition, scroll
            to zoom, and click a role to view its detailed path.
          </p>
        </div>
        <IndustryFilter
          industries={network.industries}
          activeIndustry={activeIndustry}
          onChange={setActiveIndustry}
        />
      </header>

      <div
        ref={containerRef}
        className="relative h-[560px] w-full overflow-hidden rounded-3xl border border-violet-100 bg-white/70"
      >
        <ForceGraph2D
          ref={fgRef}
          graphData={graphData}
          width={size.width}
          height={size.height}
          backgroundColor="rgba(0,0,0,0)"
          nodeRelSize={4}
          nodeVal={(node) => (node.type === 'role' ? 14 : 3)}
          nodeLabel={(node) =>
            node.type === 'role'
              ? `${node.name}${node.matchScore ? ` · Match ${node.matchScore}%` : ''}`
              : `Skill: ${node.name}`
          }
          nodeCanvasObject={paintNode}
          nodePointerAreaPaint={(node, color, ctx) => {
            const radius = node.type === 'role' ? 11 : 5
            ctx.fillStyle = color
            ctx.beginPath()
            ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI)
            ctx.fill()
          }}
          linkCanvasObjectMode={() => 'replace'}
          linkCanvasObject={paintLink}
          onNodeClick={handleNodeClick}
          cooldownTicks={120}
          d3AlphaDecay={0.025}
          d3VelocityDecay={0.32}
          enableNodeDrag
        />

        <GraphLegend industries={network.industries} />

        <div className="absolute bottom-3 right-3 z-10 flex items-center gap-2 rounded-2xl border border-violet-100 bg-white/92 px-3 py-2 text-xs shadow-[0_10px_24px_rgba(88,63,188,0.12)]">
          <span className="rounded-lg bg-violet-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-violet-700">
            AI Insight
          </span>
          <span className="text-[11px] font-semibold text-slate-600">
            Strengthen SQL & Data Visualization to unlock 2 adjacent paths.
          </span>
        </div>
      </div>
    </section>
  )
}
