import React, { useMemo, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import compassIcon from '../assets/icon-compass.svg'
import { useCareerStore } from '../store/useCareerStore'

// ─── role → workspace route map ─────────────────────────────────────────
// Each signup/login role maps to a protected route in App.jsx. The store's
// `selectRole(...)` call is what passes the ProtectedRoute guard.
const ROLES = [
  { id: 'student', label: 'Candidate', initial: 'C', gradient: 'from-indigo-500 to-indigo-400', path: '/student/overview' },
  { id: 'employer', label: 'Employer', initial: 'E', gradient: 'from-purple-600 to-purple-400', path: '/employer' },
  { id: 'university', label: 'University', initial: 'U', gradient: 'from-sky-600 to-cyan-400', path: '/university' },
]

const ROLE_BY_ID = Object.fromEntries(ROLES.map((r) => [r.id, r]))

// ─── constellation data (skill graph illustration on the left panel) ───
// Hardcoded layout points for the demo — could be swapped for AI-extracted
// skills from the user's evidence profile.
const STARS = [
  { x: 200, y: 58, r: 9, label: 'Career Goal', bright: true },
  { x: 120, y: 120, r: 6.5, label: 'Communication' },
  { x: 278, y: 118, r: 6.5, label: 'Data Analysis' },
  { x: 68, y: 195, r: 5, label: 'Leadership' },
  { x: 158, y: 185, r: 7, label: 'Problem Solving', bright: true },
  { x: 310, y: 188, r: 5, label: 'Python' },
  { x: 94, y: 268, r: 5.5, label: 'Teamwork' },
  { x: 218, y: 272, r: 6, label: 'AI / ML' },
  { x: 338, y: 262, r: 5, label: 'Research' },
  { x: 162, y: 330, r: 5, label: 'SQL' },
  { x: 296, y: 330, r: 5, label: 'Design' },
  { x: 44, y: 330, r: 4.5, label: 'Strategy' },
]
const EDGES = [
  [0, 1], [0, 2], [1, 3], [1, 4], [2, 4], [2, 5],
  [3, 6], [4, 6], [4, 7], [5, 8], [6, 9], [7, 9],
  [7, 10], [8, 10], [6, 11], [9, 11],
]

// ─── small icons used inline ───────────────────────────────────────────
function GoogleIcon() {
  return (
    <svg viewBox="0 0 18 18" className="h-[18px] w-[18px] shrink-0" aria-hidden="true">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4" />
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853" />
      <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05" />
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 18 18" className="h-[18px] w-[18px] shrink-0" aria-hidden="true">
      <rect width="18" height="18" rx="3" fill="white" fillOpacity="0.15" />
      <path d="M4.5 7H6.5V14H4.5V7Z" fill="white" />
      <circle cx="5.5" cy="4.5" r="1.2" fill="white" />
      <path d="M8 7H10V8C10.4 7.3 11.3 6.8 12.2 6.8C14 6.8 14.5 7.9 14.5 9.5V14H12.5V10C12.5 9.2 12.5 8.2 11.4 8.2C10.3 8.2 10 9 10 9.9V14H8V7Z" fill="white" />
    </svg>
  )
}

function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function ArrowRight() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

// ─── constellation illustration ────────────────────────────────────────
function Constellation() {
  const [hovered, setHovered] = useState(null)
  return (
    <svg viewBox="0 0 400 360" className="h-auto w-full max-w-[380px] cursor-crosshair">
      <g stroke="rgba(129,140,248,0.25)" strokeWidth="1" fill="none">
        {EDGES.map(([a, b], i) => (
          <line key={i} x1={STARS[a].x} y1={STARS[a].y} x2={STARS[b].x} y2={STARS[b].y} className="constellation-edge" style={{ animationDelay: `${i * 60}ms` }} />
        ))}
      </g>
      <g>
        {STARS.map((s, i) => {
          const isHover = hovered === i
          const radius = isHover ? s.r * 1.4 : s.r
          const fill = isHover
            ? '#7C8DFA'
            : s.bright
              ? '#5B6CF9'
              : 'rgba(129,140,248,0.55)'
          const labelAnchor = s.x > 200 ? 'start' : s.x === 200 ? 'middle' : 'end'
          const lx = s.x > 200 ? s.x + s.r + 6 : s.x === 200 ? s.x : s.x - s.r - 6
          return (
            <g key={s.label}>
              {isHover && (
                <circle cx={s.x} cy={s.y} r={s.r + 5} fill="rgba(91,108,249,0.08)" stroke="rgba(91,108,249,0.3)" strokeWidth="1" />
              )}
              <circle
                cx={s.x}
                cy={s.y}
                r={radius}
                fill={fill}
                stroke={s.bright ? 'rgba(129,140,248,0.5)' : 'rgba(129,140,248,0.2)'}
                strokeWidth="1.5"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className={s.bright ? 'constellation-pulse' : ''}
                style={{ cursor: 'pointer', transition: 'r 0.2s, fill 0.2s' }}
              />
              {s.bright && <circle cx={s.x} cy={s.y} r={radius * 0.38} fill="rgba(255,255,255,0.9)" pointerEvents="none" />}
              <text
                x={lx}
                y={s.y + 4}
                textAnchor={labelAnchor}
                fontSize="10.5"
                fontFamily="Inter, sans-serif"
                fontWeight={s.bright || isHover ? '600' : '400'}
                fill={s.bright || isHover ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)'}
                pointerEvents="none"
              >
                {s.label}
              </text>
            </g>
          )
        })}
      </g>
    </svg>
  )
}

// ─── left panel: brand + constellation + tagline + stakeholder chips ───
function LeftPanel() {
  return (
    <div
      className="relative hidden h-screen flex-col overflow-hidden p-10 lg:flex"
      style={{ background: 'linear-gradient(145deg, #0d1124 0%, #161d3f 40%, #0d1a38 100%)' }}
    >
      <div className="pointer-events-none absolute -left-20 -top-32 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(91,108,249,0.18),transparent_65%)]" />
      <div className="pointer-events-none absolute -bottom-24 -right-16 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(41,182,246,0.10),transparent_65%)]" />

      <Link to="/" className="relative z-10 flex items-center gap-2.5">
        <img src={compassIcon} alt="" className="h-9 w-9 rounded-xl" />
        <span className="text-lg font-extrabold tracking-tight text-white">CareerOS</span>
      </Link>

      <div className="relative z-[5] flex flex-1 items-center justify-center">
        <Constellation />
      </div>

      <div className="relative z-10">
        <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-white">
          Your career,
          <br />
          <span className="text-indigo-300">intelligently</span> mapped.
        </h2>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/45">
          Join the platform that turns experience into verified evidence and connects talent across
          the ecosystem.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-400/30 bg-indigo-400/10 px-3.5 py-1.5 text-xs font-semibold text-indigo-200">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-300" /> Candidates
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-400/30 bg-purple-400/10 px-3.5 py-1.5 text-xs font-semibold text-purple-200">
            <span className="h-1.5 w-1.5 rounded-full bg-purple-300" /> Employers
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-400/25 bg-sky-400/10 px-3.5 py-1.5 text-xs font-semibold text-sky-200">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-300" /> Universities
          </span>
        </div>
      </div>
    </div>
  )
}

// ─── tab switcher (sign in / create account) ───────────────────────────
function AuthTabs({ tab, onChange }) {
  return (
    <div className="flex w-full max-w-[400px] gap-0 rounded-xl bg-slate-100 p-1">
      {[
        { id: 'login', label: 'Sign in' },
        { id: 'signup', label: 'Create account' },
      ].map((t) => {
        const active = t.id === tab
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => onChange(t.id)}
            className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
              active
                ? 'bg-white text-slate-900 shadow-[0_1px_4px_rgba(17,24,39,0.08)] ring-1 ring-slate-200/60'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {t.label}
          </button>
        )
      })}
    </div>
  )
}

// ─── shared field components ───────────────────────────────────────────
function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-slate-700">{label}</label>
      {children}
    </div>
  )
}

function TextInput({ id, type = 'text', placeholder, autoComplete, value, onChange }) {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      autoComplete={autoComplete}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className="w-full appearance-none rounded-lg border-[1.5px] border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:shadow-[0_0_0_3px_rgba(91,108,249,0.12)]"
    />
  )
}

function PasswordInput({ id, placeholder, autoComplete, value, onChange }) {
  const [visible, setVisible] = useState(false)
  return (
    <div className="relative">
      <input
        id={id}
        type={visible ? 'text' : 'password'}
        placeholder={placeholder}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full appearance-none rounded-lg border-[1.5px] border-slate-200 bg-white px-3.5 py-2.5 pr-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:shadow-[0_0_0_3px_rgba(91,108,249,0.12)]"
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? 'Hide password' : 'Show password'}
        className={`absolute right-3 top-1/2 -translate-y-1/2 transition ${visible ? 'text-indigo-600' : 'text-slate-400 hover:text-indigo-600'}`}
      >
        <EyeIcon />
      </button>
    </div>
  )
}

function SocialButtons({ mode }) {
  // Demo only — real OAuth would go through the backend. Each click is a no-op.
  return (
    <div className="flex flex-col gap-2.5">
      <button
        type="button"
        className="flex items-center justify-center gap-2.5 rounded-lg border-[1.5px] border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-[0_1px_3px_rgba(60,64,67,0.08)] transition hover:-translate-y-px hover:border-slate-300 hover:bg-slate-50 hover:shadow-[0_2px_8px_rgba(60,64,67,0.12)]"
      >
        <GoogleIcon /> {mode === 'login' ? 'Continue with Google' : 'Sign up with Google'}
      </button>
      <button
        type="button"
        className="flex items-center justify-center gap-2.5 rounded-lg border-[1.5px] border-[#0A66C2] bg-[#0A66C2] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-px hover:bg-[#004182] hover:shadow-[0_4px_14px_rgba(10,102,194,0.3)]"
      >
        <LinkedInIcon /> {mode === 'login' ? 'Continue with LinkedIn' : 'Sign up with LinkedIn'}
      </button>
    </div>
  )
}

function Divider({ children }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-px flex-1 bg-slate-200" />
      <span className="whitespace-nowrap text-xs font-medium text-slate-400">{children}</span>
      <div className="h-px flex-1 bg-slate-200" />
    </div>
  )
}

// ─── login form ────────────────────────────────────────────────────────
function LoginForm({ onSwitchTab, onSubmit }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email.trim() || !password.trim()) {
      window.alert('Please fill in all fields.')
      return
    }
    onSubmit({ email, password })
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-[400px] flex-col">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Welcome back</h1>
      <p className="mt-1.5 text-sm text-slate-500">Sign in to your CareerOS workspace.</p>

      <div className="mt-7">
        <SocialButtons mode="login" />
      </div>

      <div className="mt-6">
        <Divider>or sign in with email</Divider>
      </div>

      <div className="mt-6 flex flex-col gap-4">
        <Field label="Email address">
          <TextInput id="login-email" type="email" placeholder="you@example.com" autoComplete="email" value={email} onChange={setEmail} />
        </Field>
        <Field label="Password">
          <PasswordInput id="login-pw" placeholder="Enter your password" autoComplete="current-password" value={password} onChange={setPassword} />
        </Field>
      </div>

      <div className="mt-2 flex justify-end">
        <a href="#" className="text-xs font-semibold text-indigo-600 transition hover:text-indigo-800">
          Forgot password?
        </a>
      </div>

      <button
        type="submit"
        className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3.5 text-sm font-bold text-white transition hover:-translate-y-px hover:bg-indigo-600 hover:shadow-[0_6px_20px_rgba(91,108,249,0.28)]"
      >
        Sign in to CareerOS <ArrowRight />
      </button>

      <p className="mt-5 text-center text-sm text-slate-500">
        Don't have an account?{' '}
        <button type="button" onClick={onSwitchTab} className="font-semibold text-indigo-600 transition hover:text-indigo-800">
          Create one free
        </button>
      </p>
    </form>
  )
}

// ─── password strength helper ──────────────────────────────────────────
function scorePassword(value) {
  if (!value) return { score: 0, label: '', color: 'transparent' }
  let score = 0
  if (value.length >= 8) score++
  if (/[A-Z]/.test(value)) score++
  if (/[0-9]/.test(value)) score++
  if (/[^A-Za-z0-9]/.test(value)) score++
  const labels = ['', 'Weak — try adding numbers or symbols', 'Fair — add uppercase or special characters', 'Good — almost there!', 'Strong password']
  const colors = ['', '#EF4444', '#F59E0B', '#F59E0B', '#10B981']
  return { score, label: labels[score], color: colors[score] }
}

function StrengthMeter({ password }) {
  const { score, label, color } = useMemo(() => scorePassword(password), [password])
  return (
    <>
      <div className="mt-1.5 flex gap-1">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-[3px] flex-1 rounded transition-colors"
            style={{ backgroundColor: i < score ? color : '#E5E7EB' }}
          />
        ))}
      </div>
      <p className="mt-1 h-3.5 text-[11px] font-medium" style={{ color: label ? color : 'transparent' }}>
        {label || ' '}
      </p>
    </>
  )
}

// ─── signup form ───────────────────────────────────────────────────────
function SignupForm({ onSwitchTab, onSubmit }) {
  const [roleId, setRoleId] = useState('student')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const role = ROLE_BY_ID[roleId]
  const isOrg = roleId === 'employer' || roleId === 'university'

  // Org-email hint copy switches based on the chosen role.
  const orgHint = useMemo(() => {
    if (roleId === 'employer') {
      return {
        label: 'Organisation email address',
        placeholder: 'you@company.com',
        body: (
          <>
            Please use your <strong className="font-bold">company email</strong> (e.g. name@company.com). Personal addresses like Gmail or Yahoo are not accepted.
          </>
        ),
      }
    }
    if (roleId === 'university') {
      return {
        label: 'Organisation email address',
        placeholder: 'you@university.edu',
        body: (
          <>
            Please use your <strong className="font-bold">university or institution email</strong> (e.g. name@university.edu). Personal email addresses are not accepted.
          </>
        ),
      }
    }
    return { label: 'Email address', placeholder: 'you@example.com', body: null }
  }, [roleId])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Demo: skip field validation so judges can jump straight into the
    // selected workspace by clicking "Create my account".
    onSubmit({ role: roleId, firstName, lastName, email, password })
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-[400px] flex-col">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Create your account</h1>
      <p className="mt-1.5 text-sm text-slate-500">Join CareerOS — it's free to get started.</p>

      <div className="mt-7">
        <SocialButtons mode="signup" />
      </div>

      <div className="mt-6">
        <Divider>or sign up with email</Divider>
      </div>

      <div className="mt-6 flex flex-col gap-1.5">
        <span className="text-xs font-semibold text-slate-700">I am joining as a</span>
        <div className="grid grid-cols-3 gap-2">
          {ROLES.map((r) => {
            const selected = r.id === roleId
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => setRoleId(r.id)}
                className={`flex flex-col items-center gap-1.5 rounded-xl border-[1.5px] p-3 transition ${
                  selected
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-slate-200 bg-slate-50 hover:border-indigo-300 hover:bg-indigo-50/50'
                }`}
              >
                <span className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br text-sm font-extrabold text-white ${r.gradient}`}>
                  {r.initial}
                </span>
                <span className={`text-xs font-semibold ${selected ? 'text-indigo-800' : 'text-slate-700'}`}>{r.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          <Field label="First name">
            <TextInput id="su-fname" placeholder="Jane" autoComplete="given-name" value={firstName} onChange={setFirstName} />
          </Field>
          <Field label="Last name">
            <TextInput id="su-lname" placeholder="Doe" autoComplete="family-name" value={lastName} onChange={setLastName} />
          </Field>
        </div>

        <Field label={orgHint.label}>
          <TextInput
            id="su-email"
            type="email"
            placeholder={orgHint.placeholder}
            autoComplete="email"
            value={email}
            onChange={setEmail}
          />
          {isOrg && (
            <div className="mt-2 flex items-start gap-2 rounded-lg border border-indigo-200/60 bg-indigo-50 p-3">
              <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span className="text-xs leading-snug font-medium text-indigo-700">{orgHint.body}</span>
            </div>
          )}
        </Field>

        <Field label="Password">
          <PasswordInput id="su-pw" placeholder="Create a password" autoComplete="new-password" value={password} onChange={setPassword} />
          <StrengthMeter password={password} />
        </Field>
      </div>

      <p className="mt-5 text-center text-xs leading-relaxed text-slate-500">
        By creating an account you agree to our{' '}
        <a href="#" className="font-semibold text-indigo-600">Terms of Service</a> and{' '}
        <a href="#" className="font-semibold text-indigo-600">Privacy Policy</a>.
      </p>

      <button
        type="submit"
        className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3.5 text-sm font-bold text-white transition hover:-translate-y-px hover:bg-indigo-600 hover:shadow-[0_6px_20px_rgba(91,108,249,0.28)]"
      >
        Create my account <ArrowRight />
      </button>

      <p className="mt-5 text-center text-sm text-slate-500">
        Already have an account?{' '}
        <button type="button" onClick={onSwitchTab} className="font-semibold text-indigo-600 transition hover:text-indigo-800">
          Sign in
        </button>
      </p>

      {role && (
        <p className="mt-3 text-center text-[11px] text-slate-400">
          You'll land in the {role.label} workspace after sign-up.
        </p>
      )}
    </form>
  )
}

// ─── main page ─────────────────────────────────────────────────────────
export default function AuthPage() {
  const [searchParams] = useSearchParams()
  const initialTab = searchParams.get('mode') === 'signup' ? 'signup' : 'login'
  const [tab, setTab] = useState(initialTab)
  const navigate = useNavigate()
  const selectRole = useCareerStore((s) => s.selectRole)

  const enterWorkspace = (roleId = 'student') => {
    const role = ROLE_BY_ID[roleId] ?? ROLE_BY_ID.student
    selectRole(role.id)
    navigate(role.path, { replace: true })
  }

  return (
    <main className="grid h-screen overflow-hidden font-sans lg:grid-cols-[52%_48%]">
      <LeftPanel />

      <div className="flex h-screen flex-col overflow-y-auto bg-white">
        {/* sticky header — back-to-home + tab switcher */}
        <header className="sticky top-0 z-30 flex flex-col items-center gap-3 border-b border-slate-100 bg-white px-8 py-5 sm:px-16">
          <Link
            to="/"
            className="flex items-center gap-1.5 self-end text-sm font-medium text-slate-500 transition hover:text-indigo-600"
          >
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M10 3L5 8L10 13" />
            </svg>
            Back to home
          </Link>
          <AuthTabs tab={tab} onChange={setTab} />
        </header>

        {/* scrollable form area */}
        <div className="flex flex-1 flex-col items-center px-8 py-9 sm:px-16">
          {tab === 'login' ? (
            <LoginForm onSwitchTab={() => setTab('signup')} onSubmit={() => enterWorkspace('student')} />
          ) : (
            <SignupForm onSwitchTab={() => setTab('login')} onSubmit={({ role }) => enterWorkspace(role)} />
          )}
        </div>
      </div>
    </main>
  )
}
