import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import RoleCard from '../components/session/RoleCard'
import { useCareerStore } from '../store/useCareerStore'

const roles = [
  {
    id: 'student',
    icon: 'C',
    title: 'Candidate',
    description: 'Build your Memory Profile, discover career paths, and grow your opportunities.',
    cta: 'Enter Candidate Workspace',
    path: '/student/overview',
    gradient: 'from-blue-600 to-indigo-500',
  },
  {
    id: 'employer',
    icon: 'E',
    title: 'Employer',
    description: 'Discover verified talent, create engagement opportunities, and track hiring readiness.',
    cta: 'Enter Employer Workspace',
    path: '/employer',
    gradient: 'from-indigo-600 to-violet-500',
  },
  {
    id: 'university',
    icon: 'U',
    title: 'University',
    description: 'Monitor curriculum alignment, student readiness, and industry collaboration.',
    cta: 'Enter University Workspace',
    path: '/university',
    gradient: 'from-sky-500 to-blue-600',
  },
]

export default function LandingPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const selectRole = useCareerStore((state) => state.selectRole)
  const signedOut = location.state?.signedOut

  function enterWorkspace(role) {
    selectRole(role.id)
    navigate(role.path, { replace: true })
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,#dbeafe,transparent_32%),radial-gradient(circle_at_bottom_right,#ede9fe,transparent_34%),linear-gradient(135deg,#ffffff_0%,#f8fafc_48%,#eef4ff_100%)] px-4 py-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col justify-center">
        {signedOut ? (
          <div className="mx-auto mb-6 w-fit rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
            Signed out successfully.
          </div>
        ) : null}

        <section className="mx-auto max-w-4xl text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 to-violet-600 text-2xl font-semibold text-white shadow-[0_18px_42px_rgba(79,70,229,0.25)]">
            C
          </div>
          <h1 className="mt-7 text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">CareerOS</h1>
          <p className="mx-auto mt-5 max-w-3xl text-xl leading-8 text-slate-600">
            AI-powered career intelligence ecosystem for students, employers, and universities.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-500">
            Transform experiences into trusted career evidence and connect talent across the ecosystem.
          </p>
        </section>

        <section className="relative mt-12">
          <div className="absolute inset-x-10 top-1/2 hidden h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent lg:block" />
          <div className="relative grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {roles.map((role) => (
              <RoleCard key={role.id} role={role} onSelect={() => enterWorkspace(role)} />
            ))}
          </div>
        </section>

        <section className="mx-auto mt-10 grid max-w-4xl gap-3 rounded-3xl border border-white/70 bg-white/60 p-5 text-center text-sm leading-6 text-slate-500 shadow-[0_18px_48px_rgba(15,23,42,0.05)] backdrop-blur-xl sm:grid-cols-3">
          <p>Evidence memory</p>
          <p>Talent signal graph</p>
          <p>University-market alignment</p>
        </section>
      </div>
    </main>
  )
}
