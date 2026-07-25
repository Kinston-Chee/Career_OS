import React, { useState } from 'react'
import {
  Calendar,
  ChevronDown,
  ChevronRight,
  Clock,
  Download,
  Filter,
  LayoutGrid,
  MapPin,
  Plus,
  Search,
  SortAsc,
  TrendingDown,
  TrendingUp,
} from 'lucide-react'

// ── Platform tokens ─────────────────────────────────────────────────────────
const PLATFORM_COLORS = {
  jobstreet: '#E8001C',
  indeed: '#2557A7',
  linkedin: '#0A66C2',
  glassdoor: '#0CAA41',
  internal: '#5B6CF9',
}

const PLATFORM_PILL_BG = {
  jobstreet: 'bg-[#FEE2E2] text-[#E8001C]',
  indeed: 'bg-[#DBEAFE] text-[#2557A7]',
  linkedin: 'bg-[#DBEAFE] text-[#0A66C2]',
  glassdoor: 'bg-[#DCFCE7] text-[#0CAA41]',
  internal: 'bg-[#E0E4FF] text-[#5B6CF9]',
}

const PLATFORM_FILTERS = [
  { id: 'all', label: 'All Platforms', Icon: LayoutGrid },
  { id: 'jobstreet', label: 'JobStreet' },
  { id: 'indeed', label: 'Indeed' },
  { id: 'linkedin', label: 'LinkedIn' },
  { id: 'glassdoor', label: 'Glassdoor' },
  { id: 'internal', label: 'Internal' },
]

const KPI = [
  { key: 'apps', label: 'Total Applications', value: '2,847', tone: 'brand', delta: '+18%', trend: 'up', period: 'vs last month' },
  { key: 'hired', label: 'Hired This Month', value: '34', tone: 'green', delta: '+6', trend: 'up', period: 'vs last month' },
  { key: 'time', label: 'Avg. Time to Hire', value: '18d', tone: 'amber', delta: '−3d', trend: 'up', period: 'faster than Q1' },
  { key: 'conv', label: 'Overall Conv. Rate', value: '1.2%', tone: 'purple', delta: '−0.3%', trend: 'down', period: 'vs last month' },
  { key: 'active', label: 'Active Job Postings', value: '12', tone: 'cyan', delta: '+2', trend: 'up', period: 'new this week' },
]

const TONE_STRIPE = { brand: '#5B6CF9', green: '#10B981', amber: '#F59E0B', purple: '#8B5CF6', cyan: '#06B6D4' }

const PLATFORMS = [
  { name: 'JobStreet', key: 'jobstreet', apps: 1024, screened: 312, interviewed: 88, hired: 14, conv: 1.4, trend: 'up' },
  { name: 'Indeed',    key: 'indeed',    apps: 876,  screened: 241, interviewed: 62, hired: 9,  conv: 1.0, trend: 'flat' },
  { name: 'LinkedIn',  key: 'linkedin',  apps: 643,  screened: 198, interviewed: 54, hired: 8,  conv: 1.2, trend: 'up' },
  { name: 'Glassdoor', key: 'glassdoor', apps: 187,  screened: 48,  interviewed: 11, hired: 2,  conv: 1.1, trend: 'down' },
  { name: 'Internal',  key: 'internal',  apps: 117,  screened: 89,  interviewed: 41, hired: 11, conv: 9.4, trend: 'up' },
]

const FUNNEL = [
  { name: 'Applications', count: 2847, pct: 100,  bg: '#5B6CF9', textLight: true },
  { name: 'Screened',     count: 888,  pct: 31,   bg: '#7B8FFA', textLight: true, drop: '↓ 69% dropped off at this stage' },
  { name: 'Interviewed',  count: 256,  pct: 9,    bg: '#8B5CF6', textLight: true, drop: '↓ 71% dropped off at this stage' },
  { name: 'Assessment',   count: 78,   pct: 3,    bg: '#F59E0B', textLight: false, drop: '↓ 70% dropped off at this stage' },
  { name: 'Offer Extended', count: 41, pct: 1.4,  bg: '#10B981', textLight: false },
  { name: 'Hired',        count: 34,   pct: 1.2,  bg: '#10B981', textLight: false, drop: '✓ Offer acceptance rate: 83%', dropTone: 'good' },
]

const TREND_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
const TREND_SERIES = [
  { name: 'JobStreet', color: '#E8001C', points: [90, 80, 70, 60, 50, 35] },
  { name: 'Indeed',    color: '#2557A7', points: [100, 95, 88, 82, 75, 68] },
  { name: 'LinkedIn',  color: '#0A66C2', points: [112, 108, 100, 92, 88, 82] },
]

const CPH = [
  { name: 'JobStreet', key: 'jobstreet', width: 80,  value: 'RM 2,400' },
  { name: 'Indeed',    key: 'indeed',    width: 72,  value: 'RM 2,160' },
  { name: 'LinkedIn',  key: 'linkedin',  width: 100, value: 'RM 3,100' },
  { name: 'Glassdoor', key: 'glassdoor', width: 55,  value: 'RM 1,650' },
  { name: 'Internal',  key: 'internal',  width: 20,  value: 'RM 580' },
]

const PIPELINE_COLS = [
  {
    key: 'applied', name: 'Applied', count: 42,
    items: [
      { name: 'Ahmad Zikri', job: 'Frontend Developer', source: 'jobstreet', when: '2d ago', score: 91, tier: 'high' },
      { name: 'Priya Nair', job: 'Data Analyst', source: 'linkedin', when: '1d ago', score: 87, tier: 'high' },
      { name: 'Tan Wei Lun', job: 'Product Manager', source: 'indeed', when: '3d ago', score: 74, tier: 'mid' },
    ],
    more: 39,
  },
  {
    key: 'screening', name: 'Screening', count: 18,
    items: [
      { name: 'Siti Aisyah', job: 'UX Designer', source: 'jobstreet', when: '4d ago', score: 89, tier: 'high' },
      { name: 'Kevin Ong', job: 'Backend Engineer', source: 'internal', when: '5d ago', score: 72, tier: 'mid' },
    ],
    more: 16,
  },
  {
    key: 'interview', name: 'Interview', count: 9,
    items: [
      { name: 'Lee Jun Kiat', job: 'Data Engineer', source: 'linkedin', when: 'Interview: Today 2pm', score: 94, tier: 'high' },
      { name: 'Nurul Hana', job: 'HR Specialist', source: 'indeed', when: 'Interview: Tomorrow', score: 78, tier: 'mid' },
    ],
    more: 7,
  },
  {
    key: 'assessment', name: 'Assessment', count: 5,
    items: [
      { name: 'Rajan Pillai', job: 'DevOps Engineer', source: 'glassdoor', when: 'Pending 2d', score: 88, tier: 'high' },
    ],
    more: 4,
  },
  {
    key: 'offer', name: 'Offer', count: 3,
    items: [
      { name: 'Marcus Yee', job: 'Senior FE Dev', source: 'internal', when: 'Awaiting reply', score: 96, tier: 'high', highlight: 'amber' },
    ],
    more: 2,
  },
  {
    key: 'hired', name: 'Hired', count: 34,
    items: [
      { name: 'Aishah Rozali', job: 'Marketing Exec', source: 'jobstreet', when: 'Starts Jul 1', score: 90, tier: 'high', highlight: 'green' },
      { name: 'Daniel Foo', job: 'Full Stack Dev', source: 'linkedin', when: 'Starts Jul 7', score: 93, tier: 'high', highlight: 'green' },
    ],
    more: 32,
  },
]

const TOP_JOBS = [
  { rank: 1, title: 'Senior Software Engineer (Backend)', location: 'Kuala Lumpur', type: 'Full-time', posted: '12d ago', apps: 487, platforms: ['jobstreet', 'indeed'] },
  { rank: 2, title: 'Product Manager – Growth',           location: 'Penang',       type: 'Full-time', posted: '8d ago',  apps: 312, platforms: ['linkedin'] },
  { rank: 3, title: 'UX/UI Designer',                     location: 'Remote',       type: 'Contract',  posted: '15d ago', apps: 276, platforms: ['jobstreet', 'glassdoor'] },
  { rank: 4, title: 'Data Analyst – Business Intelligence', location: 'Kuala Lumpur', type: 'Full-time', posted: '20d ago', apps: 218, platforms: ['indeed', 'internal'] },
  { rank: 5, title: 'Marketing Executive – Digital',      location: 'Johor Bahru',  type: 'Full-time', posted: '6d ago',  apps: 194, platforms: ['jobstreet'] },
]

// ── Sub-components ──────────────────────────────────────────────────────────
function Card({ title, subtitle, action, children, bodyClass = 'p-5' }) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#E2E5F0] bg-white shadow-[0_1px_3px_rgba(0,0,0,.06),0_4px_16px_rgba(91,108,249,.06)]">
      {title || action ? (
        <div className="flex items-center justify-between border-b border-[#E2E5F0] px-5 py-4">
          <div>
            {title ? <p className="text-[14px] font-bold tracking-tight text-[#1A1D2E]">{title}</p> : null}
            {subtitle ? <p className="mt-0.5 text-[11.5px] text-[#9CA3AF]">{subtitle}</p> : null}
          </div>
          {action}
        </div>
      ) : null}
      <div className={bodyClass}>{children}</div>
    </div>
  )
}

function KpiCard({ item }) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-[#E2E5F0] bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,.06),0_4px_16px_rgba(91,108,249,.06)]">
      <span className="absolute inset-x-0 top-0 h-[3px] rounded-t-xl" style={{ background: TONE_STRIPE[item.tone] }} />
      <p className="text-[11.5px] font-semibold uppercase tracking-wider text-[#9CA3AF]">{item.label}</p>
      <p className="mt-2 text-[28px] font-extrabold leading-none tracking-tight text-[#1A1D2E]">{item.value}</p>
      <div className="mt-2 flex items-center gap-1.5">
        <span className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[11.5px] font-semibold ${
          item.trend === 'up' ? 'bg-[#ECFDF5] text-[#10B981]' : 'bg-[#FEF2F2] text-[#EF4444]'
        }`}>
          {item.trend === 'up' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
          {item.delta}
        </span>
        <span className="text-[11px] text-[#9CA3AF]">{item.period}</span>
      </div>
    </div>
  )
}

function PlatformTable() {
  return (
    <Card
      title="Platform Performance"
      subtitle="Applications, screening, and conversion across all job boards"
      action={<a className="flex items-center gap-0.5 text-[12px] font-semibold text-[#5B6CF9] hover:underline" href="#">Details <ChevronRight className="h-3 w-3" /></a>}
      bodyClass="px-5 pb-2"
    >
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {['Platform', 'Applications', 'Screened', 'Interviewed', 'Hired', 'Conversion', 'Trend'].map((h, i) => (
              <th key={h} className={`px-2 pb-2.5 pt-2 text-[11px] font-semibold uppercase tracking-wide text-[#9CA3AF] ${i === 0 ? 'text-left' : 'text-right'}`}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {PLATFORMS.map((p) => {
            const convWidth = Math.min(90, Math.round((p.conv / 9.4) * 90))
            const badgeCls = p.trend === 'up' ? 'bg-[#ECFDF5] text-[#10B981]' : p.trend === 'down' ? 'bg-[#FEF2F2] text-[#EF4444]' : 'bg-[#FFFBEB] text-[#F59E0B]'
            const arrow = p.trend === 'up' ? '↑' : p.trend === 'down' ? '↓' : '→'
            return (
              <tr key={p.key} className="border-t border-[#E2E5F0] hover:bg-[#F7F8FF]">
                <td className="px-2 py-3 text-left text-[13px]">
                  <span className="inline-flex items-center gap-2 font-semibold text-[#1A1D2E]">
                    <span className="h-2 w-2 rounded-full" style={{ background: PLATFORM_COLORS[p.key] }} />
                    {p.name}
                  </span>
                </td>
                <td className="px-2 py-3 text-right font-semibold text-[#1A1D2E]">{p.apps.toLocaleString()}</td>
                <td className="px-2 py-3 text-right font-semibold text-[#1A1D2E]">{p.screened}</td>
                <td className="px-2 py-3 text-right font-semibold text-[#1A1D2E]">{p.interviewed}</td>
                <td className="px-2 py-3 text-right font-semibold text-[#1A1D2E]">{p.hired}</td>
                <td className="px-2 py-3 text-right">
                  <div className="ml-auto flex items-center gap-2">
                    <div className="h-1.5 min-w-[50px] flex-1 overflow-hidden rounded-full bg-[#E0E4FF]">
                      <div className="h-full rounded-full" style={{ width: `${convWidth}%`, background: p.conv >= 5 ? '#10B981' : '#5B6CF9' }} />
                    </div>
                    <span className={`text-[12px] font-semibold ${p.conv >= 5 ? 'text-[#10B981]' : p.conv >= 1 ? 'text-[#10B981]' : 'text-[#F59E0B]'}`}>{p.conv}%</span>
                  </div>
                </td>
                <td className="px-2 py-3 text-right">
                  <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${badgeCls}`}>{arrow}</span>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </Card>
  )
}

function HiringFunnel() {
  return (
    <Card title="Hiring Funnel" subtitle="All platforms combined">
      <div className="flex flex-col gap-2.5 py-1">
        {FUNNEL.map((s) => (
          <div key={s.name} className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="text-[12.5px] font-semibold text-[#1A1D2E]">{s.name}</span>
              <span className="text-[12px] font-bold text-[#1A1D2E]">{s.count.toLocaleString()}</span>
            </div>
            <div className="relative h-7 overflow-hidden rounded-md bg-[#E0E4FF]">
              <div className="flex h-full items-center rounded-md pl-2.5" style={{ width: `${Math.max(2, s.pct)}%`, background: s.bg }}>
                <span className={`text-[11px] font-bold ${s.textLight ? 'text-white [text-shadow:0_1px_2px_rgba(0,0,0,.2)]' : 'text-[#1A1D2E]'}`}>{s.pct}%</span>
              </div>
            </div>
            {s.drop ? (
              <p className={`text-right text-[10.5px] ${s.dropTone === 'good' ? 'text-[#10B981]' : 'text-[#9CA3AF]'}`}>{s.drop}</p>
            ) : null}
          </div>
        ))}
      </div>
    </Card>
  )
}

function TrendChart() {
  const w = 520, h = 160, top = 10, bottom = 140
  // Points already in mock use a similar viewBox y-scale
  const scaleY = (v) => v // pre-scaled in mock
  return (
    <Card
      title="Application Volume Trend"
      subtitle="Last 6 months by platform"
      action={
        <div className="flex gap-1.5">
          <button type="button" className="rounded-md border border-[#E2E5F0] px-2.5 py-1 text-[11.5px] font-medium text-[#6B7280] hover:bg-[#F7F8FF]">Monthly</button>
          <button type="button" className="rounded-md border border-[#E2E5F0] px-2.5 py-1 text-[11.5px] font-medium text-[#6B7280] hover:bg-[#F7F8FF]">Weekly</button>
        </div>
      }
    >
      <div className="w-full">
        <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="h-[180px] w-full">
          {[20, 60, 100, 140].map((y) => (
            <line key={y} x1="0" y1={y} x2={w} y2={y} stroke="#E2E5F0" />
          ))}
          {[[18, '1200'], [58, '900'], [98, '600'], [138, '300']].map(([y, label]) => (
            <text key={label} x="0" y={y} fontSize="9" fill="#9CA3AF">{label}</text>
          ))}
          {TREND_MONTHS.map((m, i) => (
            <text key={m} x={44 + i * 84} y={158} fontSize="9" fill="#9CA3AF" textAnchor="middle">{m}</text>
          ))}
          {TREND_SERIES.map((s, si) => {
            const xs = s.points.map((_, i) => 44 + i * 84)
            const linePoints = s.points.map((y, i) => `${xs[i]},${scaleY(y)}`).join(' ')
            const areaPoints = `${linePoints} ${xs[xs.length - 1]},${bottom} ${xs[0]},${bottom}`
            const gid = `pv-grad-${si}`
            return (
              <g key={s.name}>
                <defs>
                  <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={s.color} stopOpacity="0.15" />
                    <stop offset="100%" stopColor={s.color} stopOpacity="0" />
                  </linearGradient>
                </defs>
                <polygon points={areaPoints} fill={`url(#${gid})`} />
                <polyline points={linePoints} fill="none" stroke={s.color} strokeWidth="2" strokeLinejoin="round" />
                {s.points.map((y, i) => (
                  <circle key={i} cx={xs[i]} cy={scaleY(y)} r={si === 0 ? 3.5 : 3} fill={s.color} />
                ))}
              </g>
            )
          })}
        </svg>
        <div className="mt-3 flex flex-wrap gap-4">
          {Object.entries(PLATFORM_COLORS).map(([k, c]) => (
            <span key={k} className="inline-flex items-center gap-1.5 text-[11.5px] font-medium text-[#6B7280]">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: c }} />
              {k.charAt(0).toUpperCase() + k.slice(1)}
            </span>
          ))}
        </div>
      </div>
    </Card>
  )
}

function CostPerHire() {
  return (
    <Card
      title="Cost per Hire"
      subtitle="Budget efficiency by platform"
      action={<span className="rounded-full bg-[#F0F2FF] px-2 py-0.5 text-[11px] font-semibold text-[#5B6CF9]">MYR</span>}
    >
      <div className="flex flex-col gap-3">
        {CPH.map((c) => (
          <div key={c.key} className="flex items-center gap-3">
            <div className="flex w-[100px] shrink-0 items-center gap-2">
              <span className="h-2 w-2 rounded-full" style={{ background: PLATFORM_COLORS[c.key] }} />
              <span className="text-[12.5px] font-semibold text-[#1A1D2E]">{c.name}</span>
            </div>
            <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-[#E0E4FF]">
              <div className="h-full rounded-full" style={{ width: `${c.width}%`, background: PLATFORM_COLORS[c.key] }} />
            </div>
            <span className="w-[70px] shrink-0 text-right text-[12.5px] font-bold text-[#1A1D2E]">{c.value}</span>
          </div>
        ))}
      </div>
      <div className="mt-5 border-t border-[#E2E5F0] pt-4">
        <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#9CA3AF]">Insight</p>
        <p className="text-[12.5px] leading-relaxed text-[#6B7280]">
          Internal referrals cost <strong className="text-[#10B981]">76% less</strong> per hire than LinkedIn. Consider allocating a referral bonus program to shift volume from paid boards.
        </p>
      </div>
    </Card>
  )
}

function PipelineBoard() {
  return (
    <div>
      <div className="mb-3.5 flex items-center justify-between">
        <div>
          <p className="text-[15px] font-bold tracking-tight text-[#1A1D2E]">Live Candidate Pipeline</p>
          <p className="mt-0.5 text-[12px] text-[#9CA3AF]">Drag candidates between stages · Click for full profile</p>
        </div>
        <div className="flex gap-2">
          <button type="button" className="inline-flex items-center gap-1 rounded-lg border border-[#E2E5F0] bg-white px-3 py-1.5 text-[13px] font-medium text-[#6B7280] hover:bg-[#F7F8FF]">
            <Filter className="h-3.5 w-3.5" /> Filter
          </button>
          <button type="button" className="inline-flex items-center gap-1 rounded-lg border border-[#E2E5F0] bg-white px-3 py-1.5 text-[13px] font-medium text-[#6B7280] hover:bg-[#F7F8FF]">
            <SortAsc className="h-3.5 w-3.5" /> Sort
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {PIPELINE_COLS.map((col) => (
          <div key={col.key} className="flex flex-col">
            <div className="mb-2.5 flex items-center justify-between">
              <span className="text-[12px] font-bold uppercase tracking-wider text-[#6B7280]">{col.name}</span>
              <span className="rounded-full bg-[#E0E4FF] px-2 py-0.5 text-[12px] font-bold text-[#5B6CF9]">{col.count}</span>
            </div>
            {col.items.map((c, i) => {
              const border = c.highlight === 'amber' ? 'border-[#F59E0B] bg-[#FFFBEB]' : c.highlight === 'green' ? 'border-[#10B981] bg-[#ECFDF5]' : 'border-[#E2E5F0] bg-white'
              const scoreCls = c.tier === 'high' ? 'bg-[#ECFDF5] text-[#10B981]' : c.tier === 'mid' ? 'bg-[#FFFBEB] text-[#F59E0B]' : 'bg-[#FEF2F2] text-[#EF4444]'
              const whenCls = c.highlight === 'amber' ? 'text-[#F59E0B]' : c.highlight === 'green' ? 'text-[#10B981]' : 'text-[#9CA3AF]'
              return (
                <div key={i} className={`mb-2 cursor-pointer rounded-lg border p-3 shadow-[0_1px_3px_rgba(0,0,0,.06)] transition hover:-translate-y-px hover:border-[#5B6CF9] hover:shadow-[0_0_0_3px_rgba(91,108,249,.2)] ${border}`}>
                  <p className="text-[12.5px] font-semibold text-[#1A1D2E]">{c.name}</p>
                  <p className="mt-0.5 truncate text-[11px] text-[#9CA3AF]">{c.job}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: PLATFORM_COLORS[c.source] }} />
                      <span className={`text-[10.5px] ${whenCls}`}>{c.when}</span>
                    </span>
                    <span className={`rounded-full px-1.5 py-0.5 text-[10.5px] font-bold ${scoreCls}`}>{c.score}</span>
                  </div>
                </div>
              )
            })}
            <div className="cursor-pointer py-1 text-center text-[11px] font-semibold text-[#5B6CF9] hover:underline">+{col.more} more →</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function TopJobs() {
  return (
    <Card
      title="Top Job Postings by Applications"
      subtitle="Active roles ranked by inbound volume this period"
      action={<a className="flex items-center gap-0.5 text-[12px] font-semibold text-[#5B6CF9] hover:underline" href="#">View all <ChevronRight className="h-3 w-3" /></a>}
      bodyClass="p-0"
    >
      {TOP_JOBS.map((j) => (
        <div key={j.rank} className="flex cursor-pointer items-center gap-3 border-b border-[#E2E5F0] px-5 py-3 last:border-b-0 hover:bg-[#F7F8FF]">
          <span className="w-5 text-center text-[13px] font-bold text-[#9CA3AF]">{j.rank}</span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-semibold text-[#1A1D2E]">{j.title}</p>
            <div className="mt-0.5 flex flex-wrap gap-2 text-[11px] text-[#9CA3AF]">
              <span className="inline-flex items-center gap-0.5"><MapPin className="h-3 w-3" /> {j.location}</span>
              <span className="inline-flex items-center gap-0.5"><Clock className="h-3 w-3" /> {j.type}</span>
              <span className="inline-flex items-center gap-0.5"><Calendar className="h-3 w-3" /> Posted {j.posted}</span>
            </div>
          </div>
          <div className="flex shrink-0 gap-1.5">
            {j.platforms.map((p) => (
              <span key={p} className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${PLATFORM_PILL_BG[p]}`}>
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </span>
            ))}
          </div>
          <div className="shrink-0 text-right">
            <p className="text-[15px] font-extrabold text-[#1A1D2E]">{j.apps}</p>
            <p className="text-[10.5px] font-medium text-[#9CA3AF]">applications</p>
          </div>
        </div>
      ))}
    </Card>
  )
}

// ── Main export ─────────────────────────────────────────────────────────────
export default function PlatformPipelineView() {
  const [platform, setPlatform] = useState('all')
  const [search, setSearch] = useState('')

  return (
    <div className="space-y-5">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#E2E5F0] bg-white px-5 py-3">
        <div>
          <p className="text-[10.5px] font-semibold uppercase tracking-wider text-[#5B6CF9]">Employer Dashboard</p>
          <p className="text-[13px] font-semibold text-[#1A1D2E]">Talent pipeline across every posting board</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-lg border border-[#E2E5F0] bg-[#F7F8FF] px-3 py-1.5 text-[12.5px] font-medium text-[#1A1D2E]">
            <Calendar className="h-3.5 w-3.5 text-[#9CA3AF]" />
            Jun 1 – Jun 30, 2025
            <ChevronDown className="h-3.5 w-3.5 text-[#9CA3AF]" />
          </div>
          <button type="button" className="inline-flex items-center gap-1 rounded-lg border border-[#E2E5F0] bg-white px-3 py-1.5 text-[13px] font-medium text-[#6B7280] hover:bg-[#F7F8FF]">
            <Download className="h-3.5 w-3.5" /> Export
          </button>
          <button type="button" className="inline-flex items-center gap-1 rounded-lg bg-[#5B6CF9] px-3 py-1.5 text-[13px] font-medium text-white hover:bg-[#4455E8]">
            <Plus className="h-3.5 w-3.5" /> New Posting
          </button>
        </div>
      </div>

      {/* Filter row */}
      <div className="flex flex-wrap items-center gap-2.5">
        {PLATFORM_FILTERS.map((p) => {
          const active = platform === p.id
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setPlatform(p.id)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12px] font-medium transition ${
                active ? 'border-[#5B6CF9] bg-[#5B6CF9] text-white' : 'border-[#E2E5F0] bg-white text-[#6B7280] hover:border-[#5B6CF9] hover:text-[#5B6CF9]'
              }`}
            >
              {p.Icon ? <p.Icon className="h-3.5 w-3.5" /> : <span className="h-2 w-2 rounded-full" style={{ background: PLATFORM_COLORS[p.id] }} />}
              {p.label}
            </button>
          )
        })}
        <span className="h-5 w-px bg-[#E2E5F0]" />
        <button type="button" className="inline-flex items-center gap-1 rounded-full border border-[#E2E5F0] bg-white px-3 py-1.5 text-[12px] font-medium text-[#6B7280] hover:border-[#5B6CF9] hover:text-[#5B6CF9]">
          <Filter className="h-3.5 w-3.5" /> Department
        </button>
        <button type="button" className="inline-flex items-center gap-1 rounded-full border border-[#E2E5F0] bg-white px-3 py-1.5 text-[12px] font-medium text-[#6B7280] hover:border-[#5B6CF9] hover:text-[#5B6CF9]">
          <MapPin className="h-3.5 w-3.5" /> Location
        </button>
        <div className="ml-auto flex items-center gap-2 rounded-lg border border-[#E2E5F0] bg-white px-3 py-1.5">
          <Search className="h-4 w-4 text-[#9CA3AF]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search jobs or candidates…"
            className="w-44 border-none bg-transparent text-[13px] text-[#1A1D2E] outline-none placeholder:text-[#9CA3AF]"
          />
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-1 gap-3.5 md:grid-cols-3 xl:grid-cols-5">
        {KPI.map((k) => <KpiCard key={k.key} item={k} />)}
      </div>

      {/* Table + funnel */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
        <PlatformTable />
        <HiringFunnel />
      </div>

      {/* Trend + CPH */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
        <TrendChart />
        <CostPerHire />
      </div>

      {/* Pipeline board */}
      <PipelineBoard />

      {/* Top jobs */}
      <TopJobs />
    </div>
  )
}
