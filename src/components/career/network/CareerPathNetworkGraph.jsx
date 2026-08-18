import React, { useEffect, useMemo, useRef, useState } from 'react'
import ForceGraph2D from 'react-force-graph-2d'
import { Search, Sparkles, X } from 'lucide-react'
import nodeGraphBg from '../../../assets/Node graph bg.png'

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
    <label
      className="flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold text-violet-700"
      style={{
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        border: '1px solid rgba(200, 210, 255, 0.5)',
      }}
    >
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
 * NodeSearch
 *
 * Finds a node by name and hands it to the graph to select + focus. Submitting
 * a term that matches nothing leaves the graph untouched.
 */
function NodeSearch({ value, onChange, onSubmit, onClear, notFound, suggestions }) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit(value)
      }}
      className="flex flex-col items-end gap-1"
    >
      <div
        className="flex items-center gap-2 rounded-full px-3 py-1.5"
        style={{
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          border: `1px solid ${notFound ? 'rgba(251, 146, 60, 0.6)' : 'rgba(200, 210, 255, 0.5)'}`,
        }}
      >
        <Search size={13} className="flex-shrink-0 text-violet-500" strokeWidth={2.4} />
        <input
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search a role or skill…"
          aria-label="Search the career network"
          list="career-network-nodes"
          className="w-[168px] bg-transparent text-xs font-semibold text-violet-700 placeholder:font-medium placeholder:text-slate-400 focus:outline-none"
        />
        <datalist id="career-network-nodes">
          {suggestions.map((name) => (
            <option key={name} value={name} />
          ))}
        </datalist>
        {value ? (
          <button
            type="button"
            onClick={onClear}
            aria-label="Clear search"
            className="rounded-full p-0.5 text-slate-400 transition hover:bg-violet-50 hover:text-violet-600"
          >
            <X size={12} strokeWidth={2.6} />
          </button>
        ) : null}
      </div>
      {notFound ? (
        <span className="pr-1 text-[10.5px] font-semibold text-orange-500">No node matches that search</span>
      ) : null}
    </form>
  )
}

/**
 * GraphLegend
 *
 * Floating overlay explaining what the dot colors and edge styles mean.
 */
function GraphLegend({ industries }) {
  return (
    <div
      className="pointer-events-none absolute bottom-3 left-3 z-10 max-w-[220px] p-3 text-[11px]"
      style={{
        background: 'rgba(255, 255, 255, 0.75)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        border: '1px solid rgba(255, 255, 255, 0.5)',
        borderRadius: '0.75rem',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
      }}
    >
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

export default function CareerPathNetworkGraph({ network, selectedPathId, onSelectPath, onDeselect, focusRequest }) {
  const containerRef = useRef(null)
  const fgRef = useRef(null)
  const [size, setSize] = useState({ width: 600, height: 520 })
  const [activeIndustry, setActiveIndustry] = useState('all')
  const [query, setQuery] = useState('')
  const [notFound, setNotFound] = useState(false)
  const [focusedNodeId, setFocusedNodeId] = useState(null)
  // Set when a search lands. The camera can only move once the simulation has
  // given the node coordinates, so the move happens in an effect.
  const [pendingFocusId, setPendingFocusId] = useState(null)

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

  // Focus asked for from outside the graph (e.g. a recommended-path card).
  // The nonce lets the same node be re-focused after the user pans away.
  useEffect(() => {
    if (!focusRequest?.id) return
    const node = graphData.nodes.find((item) => item.id === focusRequest.id)
    if (!node) return
    if (node.dimmed) setActiveIndustry('all')
    setFocusedNodeId(focusRequest.id)
    setPendingFocusId(focusRequest.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusRequest?.id, focusRequest?.nonce])

  // Move the camera onto a searched node once the force sim has placed it.
  useEffect(() => {
    if (!pendingFocusId) return undefined
    let timer = null
    let tries = 0
    const settle = () => {
      const fg = fgRef.current
      const node = graphData.nodes.find((item) => item.id === pendingFocusId)
      if (fg && node && Number.isFinite(node.x) && Number.isFinite(node.y)) {
        fg.centerAt(node.x, node.y, 700)
        fg.zoom(3.2, 700)
        setPendingFocusId(null)
        return
      }
      if (tries < 25) {
        tries += 1
        timer = window.setTimeout(settle, 120)
      }
    }
    timer = window.setTimeout(settle, 60)
    return () => window.clearTimeout(timer)
  }, [pendingFocusId, graphData])

  // Role names first — a search for "data analyst" should land on the role,
  // not a skill that happens to contain the word.
  const searchableNames = useMemo(
    () => [
      ...network.roles.map((role) => role.label),
      ...network.skills.map((skill) => skill.label),
    ],
    [network],
  )

  const handleSearch = (raw) => {
    const term = raw.trim().toLowerCase()
    if (!term) {
      setNotFound(false)
      return
    }

    const roles = graphData.nodes.filter((node) => node.type === 'role')
    const skills = graphData.nodes.filter((node) => node.type === 'skill')
    const findIn = (list) =>
      list.find((node) => node.name.toLowerCase() === term)
      ?? list.find((node) => node.name.toLowerCase().startsWith(term))
      ?? list.find((node) => node.name.toLowerCase().includes(term))

    const match = findIn(roles) ?? findIn(skills)

    // Nothing in the graph matches — leave the graph exactly as it is.
    if (!match) {
      setNotFound(true)
      return
    }

    setNotFound(false)
    // A match hidden by the industry filter would be invisible once focused,
    // so widen the filter back to all industries first.
    if (match.dimmed) setActiveIndustry('all')
    setFocusedNodeId(match.id)
    setPendingFocusId(match.id)
    // Clicking a selected role toggles it off, but searching for one should
    // always leave it selected — so skip the call when it already is.
    if (match.type === 'role' && match.id !== selectedPathId && typeof onSelectPath === 'function') {
      onSelectPath(match.id)
    }
  }

  const clearSearch = () => {
    setQuery('')
    setNotFound(false)
    setFocusedNodeId(null)
  }

  const handleNodeClick = (node) => {
    setFocusedNodeId(node.id)
    if (node.type === 'role' && typeof onSelectPath === 'function') {
      onSelectPath(node.id)
    }
  }

  // Clicking empty canvas clears the current selection — both the selected
  // role path and any node highlighted by a search.
  const handleBackgroundClick = () => {
    setFocusedNodeId(null)
    setNotFound(false)
    if (typeof onDeselect === 'function') onDeselect()
  }

  const paintNode = (node, ctx, globalScale) => {
    const isRole = node.type === 'role'
    const radius = isRole ? 9 : 3.4
    const baseColor = isRole ? industryColorById[node.industry] ?? '#6366f1' : SKILL_COLOR
    const fillColor = node.dimmed ? DIMMED_NODE : baseColor

    // Search focus ring — works for skills too, which have no "selected path".
    if (focusedNodeId === node.id) {
      ctx.beginPath()
      ctx.arc(node.x, node.y, radius + 7, 0, 2 * Math.PI)
      ctx.strokeStyle = hexToRgba('#8b5cf6', 0.75)
      ctx.lineWidth = 2 / globalScale
      ctx.setLineDash([3 / globalScale, 2 / globalScale])
      ctx.stroke()
      ctx.setLineDash([])
    }

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
    <section
      className="relative overflow-hidden p-5"
      style={{ borderRadius: '1.5rem', boxShadow: '0 8px 32px rgba(100, 130, 200, 0.1)' }}
    >
      <div
        className="absolute inset-0 -z-20"
        style={{ backgroundImage: `url(${nodeGraphBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      />
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: 'rgba(255, 255, 255, 0.45)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.6)',
          borderRadius: '1.5rem',
        }}
      />

      <header className="relative mb-4 flex flex-wrap items-start justify-between gap-3">
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
        <div className="flex flex-wrap items-start gap-2">
          <IndustryFilter
            industries={network.industries}
            activeIndustry={activeIndustry}
            onChange={setActiveIndustry}
          />
          <NodeSearch
            value={query}
            onChange={(next) => { setQuery(next); setNotFound(false) }}
            onSubmit={handleSearch}
            onClear={clearSearch}
            notFound={notFound}
            suggestions={searchableNames}
          />
        </div>
      </header>

      <div
        ref={containerRef}
        className="relative h-[560px] w-full overflow-hidden rounded-3xl border border-violet-100/70"
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
          onBackgroundClick={handleBackgroundClick}
          cooldownTicks={120}
          d3AlphaDecay={0.025}
          d3VelocityDecay={0.32}
          enableNodeDrag
        />

        <GraphLegend industries={network.industries} />

        <div
          className="absolute bottom-3 right-3 z-10 flex max-w-[280px] items-center gap-2 px-3 py-2 text-xs"
          style={{
            background: 'rgba(255, 255, 255, 0.75)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            borderRadius: '0.75rem',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
          }}
        >
          <Sparkles size={13} className="flex-shrink-0 text-violet-500" strokeWidth={2.2} />
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
