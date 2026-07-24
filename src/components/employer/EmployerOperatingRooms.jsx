import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BarChart3,
  Building2,
  Calendar,
  ChevronRight,
  Search,
  School,
  Users,
} from 'lucide-react'

const ROOMS = [
  {
    id: 'talent-discovery',
    name: 'Talent Discovery',
    icon: Search,
    time: '8:32 AM',
    to: '/employer/talent-discovery',
    bullets: [
      { text: '42 high-fit candidates surfaced today.', alert: false },
      { text: '2 availability windows close within 2 weeks.', alert: true },
    ],
  },
  {
    id: 'candidates',
    name: 'Candidate Ops',
    icon: Users,
    time: '8:30 AM',
    to: '/employer/candidates',
    bullets: [
      { text: '5 top matches waiting for next step.', alert: true },
      { text: '3 shortlists likely to accept if contacted today.', alert: false },
    ],
    isCenter: true,
  },
  {
    id: 'engagement',
    name: 'Engagement Studio',
    icon: Calendar,
    time: '8:26 AM',
    to: '/employer/posting',
    bullets: [
      { text: '4 events completed this month, ▲ 18%.', alert: false },
      { text: 'AI & Data Challenge sign-ups high, conversion low.', alert: true },
    ],
  },
  {
    id: 'campus',
    name: 'Campus Pipeline',
    icon: School,
    time: '8:22 AM',
    to: '/employer/campus-pipeline',
    bullets: [
      { text: '12.8k invited → 26 hires in current funnel.', alert: false },
      { text: '12 strong candidates ripe for re-engagement.', alert: false },
    ],
  },
  {
    id: 'analytics',
    name: 'Hiring Analytics',
    icon: BarChart3,
    time: '8:20 AM',
    to: '/employer/analytics',
    bullets: [
      { text: 'Time-to-fill down 12% to 28 days.', alert: false },
      { text: 'Quality of hire predicted at 87%.', alert: false },
    ],
  },
  {
    id: 'command-center',
    name: 'Command Center',
    icon: Building2,
    time: '8:18 AM',
    to: '/employer/home',
    bullets: [
      { text: '2 roles at risk need Dean-level review.', alert: true },
      { text: '2 hiring decisions await approval.', alert: true },
    ],
  },
]

function RoomCard({ room, onClick }) {
  const Icon = room.icon
  return (
    <button
      type="button"
      onClick={() => onClick(room)}
      className={`group flex flex-col rounded-2xl border bg-white p-4 text-left shadow-[0_4px_18px_rgba(21,94,232,0.08)] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(21,94,232,0.18)] ${
        room.isCenter ? 'border-[#155EE8]/40 ring-2 ring-[#155EE8]/20' : 'border-[#E8EEF8]'
      }`}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EEF2FB] text-[#155EE8]">
            <Icon className="h-4 w-4" />
          </span>
          <p className="text-sm font-bold text-[#1B2545]">{room.name}</p>
        </div>
        <span className="shrink-0 text-[10px] font-medium text-[#B0BADA]">{room.time}</span>
      </div>

      <div className="mt-1 space-y-1.5">
        {room.bullets.map((b, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className={`mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full ${b.alert ? 'bg-orange-400' : 'bg-emerald-400'}`} />
            <p className="text-[11px] font-medium leading-[1.5] text-[#50607E]">{b.text}</p>
          </div>
        ))}
      </div>

      <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-[#185FA5] group-hover:underline">
        Open room <ChevronRight className="h-3 w-3" />
      </span>
    </button>
  )
}

export default function EmployerOperatingRooms() {
  const navigate = useNavigate()

  return (
    <div className="rounded-2xl border border-white/70 bg-white/75 p-5 shadow-[0_10px_30px_rgba(24,95,165,0.08)] backdrop-blur-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-bold text-gray-900">Talent Operating Rooms</h2>
        <span className="text-xs font-medium text-slate-400">Click a room to open its AI officer</span>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {ROOMS.map((room) => (
          <RoomCard key={room.id} room={room} onClick={(r) => navigate(r.to)} />
        ))}
      </div>
    </div>
  )
}
