import React from 'react'
import { ArrowRight, Handshake, ShieldCheck, Target, TrendingUp, Users } from 'lucide-react'
import {
  accreditationProgress,
  alumniSalaryTrend,
  curriculumQuadrant,
  partnerships,
  readinessHeatmap,
} from '../../data/universityMockData'

function CardShell({ icon: Icon, title, value, note, children, to, onNavigate }) {
  return (
    <div className="flex flex-col rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-[#185FA5]" />
        <h3 className="text-sm font-bold text-gray-900">{title}</h3>
      </div>
      <p className="mt-2 text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-xs text-gray-400">{note}</p>
      <div className="mt-3 flex-1">{children}</div>
      <button
        type="button"
        onClick={() => onNavigate(to)}
        className="mt-3 flex items-center gap-1 text-xs font-semibold text-[#185FA5] hover:underline"
      >
        View details
        <ArrowRight className="h-3 w-3" />
      </button>
    </div>
  )
}

const HEAT_COLORS = ['bg-green-200', 'bg-yellow-200', 'bg-orange-300', 'bg-red-400']

function ReadinessHeatmap() {
  return (
    <div className="space-y-1">
      {readinessHeatmap.rows.map((row, rowIndex) => (
        <div key={row} className="flex items-center gap-1.5">
          <span className="w-10 shrink-0 text-[10px] text-gray-400">{row}</span>
          <div className="flex flex-1 gap-1">
            {readinessHeatmap.columns.map((col, colIndex) => (
              <span
                key={col}
                className={`h-3 flex-1 rounded-sm ${colIndex === readinessHeatmap.values[rowIndex] - 1 ? HEAT_COLORS[colIndex] : 'bg-gray-100'}`}
              />
            ))}
          </div>
        </div>
      ))}
      <div className="flex justify-between pl-12 pt-0.5 text-[9px] text-gray-300">
        {readinessHeatmap.columns.map((col) => (
          <span key={col}>{col}</span>
        ))}
      </div>
    </div>
  )
}

const ZONE_COLORS = { red: '#ef4444', green: '#22c55e', gray: '#9ca3af', blue: '#185FA5' }

function CurriculumQuadrantMini() {
  return (
    <div className="relative h-[88px] w-full">
      <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 overflow-hidden rounded-md border border-gray-100">
        <div className="border-b border-r border-gray-100 bg-red-50" />
        <div className="border-b border-gray-100 bg-green-50" />
        <div className="border-r border-gray-100 bg-gray-50" />
        <div className="bg-blue-50" />
      </div>
      {curriculumQuadrant.points.map((point, i) => (
        <span
          key={i}
          className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ left: `${point.x}%`, top: `${100 - point.y}%`, backgroundColor: ZONE_COLORS[point.zone] }}
        />
      ))}
      <span className="absolute -left-1 top-0 -rotate-90 text-[8px] text-gray-300">{curriculumQuadrant.axisY}</span>
      <span className="absolute bottom-[-12px] right-0 text-[8px] text-gray-300">{curriculumQuadrant.axisX}</span>
    </div>
  )
}

function AlumniLineChart() {
  const max = Math.max(...alumniSalaryTrend.points)
  const min = Math.min(...alumniSalaryTrend.points)
  const w = 100
  const h = 60
  const coords = alumniSalaryTrend.points.map((v, i) => {
    const x = (i / (alumniSalaryTrend.points.length - 1)) * w
    const y = h - ((v - min) / (max - min || 1)) * h
    return [x, y]
  })
  const linePath = coords.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x},${y}`).join(' ')
  const areaPath = `${linePath} L${w},${h} L0,${h} Z`

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-[70px] w-full" preserveAspectRatio="none">
      <path d={areaPath} fill="#185FA5" fillOpacity="0.12" />
      <path d={linePath} fill="none" stroke="#185FA5" strokeWidth="2" />
      {coords.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.8" fill="#185FA5" />
      ))}
    </svg>
  )
}

function PartnerLogos() {
  return (
    <div className="flex items-center gap-1.5">
      {partnerships.logos.map((logo) => (
        <span key={logo.id} className={`flex h-7 w-7 items-center justify-center rounded-full text-[9px] font-bold text-white ${logo.tone}`}>
          {logo.label}
        </span>
      ))}
      <span className="rounded-full bg-gray-100 px-2 py-1 text-[10px] font-medium text-gray-500">+{partnerships.moreCount} more</span>
    </div>
  )
}

function AccreditationRing() {
  const radius = 24
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - accreditationProgress.value / 100)

  return (
    <div className="flex items-center gap-3">
      <svg viewBox="0 0 60 60" className="h-16 w-16 shrink-0 -rotate-90">
        <circle cx="30" cy="30" r={radius} fill="none" stroke="#f3e8ff" strokeWidth="6" />
        <circle
          cx="30"
          cy="30"
          r={radius}
          fill="none"
          stroke="#9333ea"
          strokeWidth="6"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="space-y-1 text-[10px] text-gray-500">
        {accreditationProgress.legend.map((item) => (
          <p key={item.id} className="flex items-center gap-1.5">
            <span className={`h-1.5 w-1.5 rounded-full ${item.tone}`} />
            {item.label} {item.value}
          </p>
        ))}
      </div>
    </div>
  )
}

export default function SummaryCardsRow({ onNavigate }) {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      <CardShell icon={Users} title="Student Readiness" value="34" note="students at risk" to="/university/student-readiness" onNavigate={onNavigate}>
        <ReadinessHeatmap />
      </CardShell>
      <CardShell icon={Target} title="Curriculum-Market Alignment" value="2" note="critical gaps detected" to="/university/curriculum-alignment" onNavigate={onNavigate}>
        <CurriculumQuadrantMini />
      </CardShell>
      <CardShell icon={TrendingUp} title="Alumni Signal Intelligence" value={alumniSalaryTrend.value} note={alumniSalaryTrend.label} to="/university/alumni-signals" onNavigate={onNavigate}>
        <AlumniLineChart />
      </CardShell>
      <CardShell icon={Handshake} title="Collaboration Marketplace" value={partnerships.value} note={partnerships.label} to="/university/collaboration" onNavigate={onNavigate}>
        <PartnerLogos />
      </CardShell>
      <CardShell icon={ShieldCheck} title="Accreditation Hub" value={`${accreditationProgress.value}%`} note={accreditationProgress.label} to="/university/accreditation" onNavigate={onNavigate}>
        <AccreditationRing />
      </CardShell>
    </section>
  )
}
