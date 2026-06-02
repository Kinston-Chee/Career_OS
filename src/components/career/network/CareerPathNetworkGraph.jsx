import React, { useMemo, useState } from 'react'
import CareerGraphControls from './CareerGraphControls'
import CareerGraphFilter from './CareerGraphFilter'
import CareerGraphLegend from './CareerGraphLegend'
import CareerGraphNode from './CareerGraphNode'
import CareerGraphTooltip from './CareerGraphTooltip'
import GraphConnection from './GraphConnection'

function nodeKeyMap(network) {
  const map = new Map()
  map.set(network.center.id, network.center)
  network.roles.forEach((role) => map.set(role.id, role))
  network.skills.forEach((skill) => map.set(skill.id, skill))
  return map
}

function shouldDimRole(role, activeFilter) {
  return activeFilter !== 'All Paths' && role.category !== activeFilter
}

function shouldDimSkill(skill, network, activeFilter) {
  if (activeFilter === 'All Paths') return false
  const relatedRoleIds = network.edges
    .filter((edge) => edge.from === skill.id || edge.to === skill.id)
    .map((edge) => (edge.from === skill.id ? edge.to : edge.from))
  return !network.roles.some((role) => relatedRoleIds.includes(role.id) && role.category === activeFilter)
}

export default function CareerPathNetworkGraph({ network, selectedPathId, onSelectPath }) {
  const [activeFilter, setActiveFilter] = useState('All Paths')
  const [hoveredNode, setHoveredNode] = useState(null)
  const nodes = useMemo(() => nodeKeyMap(network), [network])

  return (
    <section className="overflow-hidden rounded-3xl border border-violet-100/80 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.12),transparent_34%),linear-gradient(135deg,#ffffff_0%,#fbfaff_48%,#f5f2ff_100%)] p-5 shadow-[0_18px_50px_rgba(88,63,188,0.1)]">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-[#17124d]">Your Career Path Network</h2>
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-violet-200 text-xs font-bold text-violet-500">i</span>
          </div>
          <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
            Explore career opportunities based on your skills, experience, and market demand.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto pb-2">
        <div className="relative h-[560px] min-w-[920px] overflow-hidden rounded-3xl border border-violet-100 bg-white/60">
          <CareerGraphLegend />
          <CareerGraphFilter activeFilter={activeFilter} onFilterChange={setActiveFilter} />
          <CareerGraphControls />

          <svg className="absolute inset-0 z-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <radialGradient id="careerGraphGlow" cx="50%" cy="50%" r="45%">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.18" />
                <stop offset="70%" stopColor="#8b5cf6" stopOpacity="0.04" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="careerStrongConnection" x1="0%" x2="100%" y1="0%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="45%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#38bdf8" />
              </linearGradient>
              <linearGradient id="careerGapConnection" x1="0%" x2="100%" y1="0%" y2="100%">
                <stop offset="0%" stopColor="#a78bfa" />
                <stop offset="55%" stopColor="#818cf8" />
                <stop offset="100%" stopColor="#5eead4" />
              </linearGradient>
              <linearGradient id="careerUnlockConnection" x1="0%" x2="100%" y1="0%" y2="100%">
                <stop offset="0%" stopColor="#c4b5fd" />
                <stop offset="50%" stopColor="#93c5fd" />
                <stop offset="100%" stopColor="#99f6e4" />
              </linearGradient>
              <filter id="careerStrongGlow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="1.1" result="blur" />
                <feColorMatrix in="blur" type="matrix" values="0.55 0 0 0 0.24 0 0.38 0 0 0.2 0 0 0.9 0 0.8 0 0 0 1 0" result="glow" />
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="careerGapGlow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="0.9" result="blur" />
                <feColorMatrix in="blur" type="matrix" values="0.48 0 0 0 0.28 0 0.48 0 0 0.32 0 0 0.9 0 0.76 0 0 0 0.9 0" result="glow" />
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="careerUnlockGlow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="0.7" result="blur" />
                <feColorMatrix in="blur" type="matrix" values="0.48 0 0 0 0.34 0 0.62 0 0 0.42 0 0 0.72 0 0.72 0 0 0 0.75 0" result="glow" />
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <ellipse cx="50" cy="50" rx="25" ry="25" fill="url(#careerGraphGlow)" />
            <ellipse cx="50" cy="50" rx="35" ry="35" fill="none" stroke="#a7b2ff" strokeDasharray="2 2" strokeOpacity="0.45" strokeWidth="0.4" />
            <ellipse cx="50" cy="50" rx="28" ry="20" fill="none" stroke="#7c3aed" strokeDasharray="4 3" strokeOpacity="0.3" strokeWidth="0.4" />
            {network.edges.map((edge) => {
              const from = nodes.get(edge.from)
              const to = nodes.get(edge.to)
              const fromRole = network.roles.find((role) => role.id === edge.from)
              const toRole = network.roles.find((role) => role.id === edge.to)
              const fromSkill = network.skills.find((skill) => skill.id === edge.from)
              const toSkill = network.skills.find((skill) => skill.id === edge.to)
              const dimmed =
                (fromRole && shouldDimRole(fromRole, activeFilter)) ||
                (toRole && shouldDimRole(toRole, activeFilter)) ||
                (fromSkill && shouldDimSkill(fromSkill, network, activeFilter)) ||
                (toSkill && shouldDimSkill(toSkill, network, activeFilter))

              const active = selectedPathId === edge.from || selectedPathId === edge.to || (edge.from === 'you' && edge.to === selectedPathId)

              return from && to ? <GraphConnection key={`${edge.from}-${edge.to}`} from={from} to={to} type={edge.type} active={active} dimmed={dimmed} /> : null
            })}
          </svg>

          <CareerGraphNode
            node={network.center}
            type="center"
            onHover={() => setHoveredNode(network.center)}
            onLeave={() => setHoveredNode(null)}
          />

          {network.roles.map((role) => (
            <CareerGraphNode
              key={role.id}
              node={role}
              type="role"
              selected={selectedPathId === role.id}
              dimmed={shouldDimRole(role, activeFilter)}
              onClick={() => onSelectPath(role.id)}
              onHover={() => setHoveredNode(role)}
              onLeave={() => setHoveredNode(null)}
            />
          ))}

          {network.skills.map((skill) => (
            <CareerGraphNode
              key={skill.id}
              node={skill}
              type="skill"
              dimmed={shouldDimSkill(skill, network, activeFilter)}
              onHover={() => setHoveredNode(skill)}
              onLeave={() => setHoveredNode(null)}
            />
          ))}

          <CareerGraphTooltip node={hoveredNode} />

          <div className="absolute bottom-5 left-1/2 z-20 flex w-[min(620px,calc(100%-2rem))] -translate-x-1/2 items-center gap-3 rounded-2xl border border-violet-100 bg-white/92 px-4 py-3 text-sm shadow-[0_18px_44px_rgba(88,63,188,0.12)]">
            <span className="rounded-xl bg-violet-100 px-3 py-1 text-xs font-bold text-violet-700">AI Insight</span>
            <span className="min-w-0 flex-1 truncate text-xs font-semibold text-slate-600">
              Strengthen SQL and Data Visualization to unlock 2 high-match paths.
            </span>
            <span className="text-violet-700">-&gt;</span>
          </div>
        </div>
      </div>
    </section>
  )
}
