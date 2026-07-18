// ─── FastAPI backend integration for Career Memory ──────────────────
//
// ┌──────────────────────────────────────────────────────────────────┐
// │ WHERE TO PUT THINGS                                              │
// ├──────────────────────────────────────────────────────────────────┤
// │ 1. Base URL of your FastAPI server:                              │
// │      Create a `.env` file at the project root with              │
// │        VITE_COMPANION_API_BASE_URL=http://localhost:8000        │
// │                                                                  │
// │ 2. Route path on your FastAPI server:                            │
// │      Edit `EXTRACT_EXPERIENCE_PATH` below if your route          │
// │      differs.                                                    │
// │                                                                  │
// │ 3. What your FastAPI must accept + return:                       │
// │      See REQUEST + RESPONSE shape documented in the block below. │
// │                                                                  │
// │ 4. When VITE_COMPANION_API_BASE_URL is NOT set (dev mode), we    │
// │    return a hard-coded mock draft so the UI still works.         │
// └──────────────────────────────────────────────────────────────────┘
//
// ─── Contract with your FastAPI ─────────────────────────────────────
//
// REQUEST (what the frontend POSTs):
//   {
//     "prompt": "I did an internship at Grab last summer…"
//   }
//
// RESPONSE (what FastAPI must return, HTTP 200, JSON):
//   {
//     "typeId":       "experience" | "education" | "project"
//                     | "competition" | "volunteering" | "certification",
//     "title":        "Data Engineering Intern",
//     "organisation": "Grab",
//     "startDate":    "2024-06-01",  // ISO YYYY-MM-DD
//     "endDate":      "2024-08-31",  // ISO YYYY-MM-DD, or null/"" for Present
//     "description":  "…",
//     "skills":       ["Python", "SQL", "Airflow"],
//     "evidenceUrl":  ""             // optional
//   }
//
// Any missing / non-string field is coerced to an empty default so the
// form never crashes on a partial payload.

const COMPANION_API_BASE_URL = import.meta.env.VITE_COMPANION_API_BASE_URL ?? ''
const EXTRACT_EXPERIENCE_PATH = '/api/companion/extract-experience'
const EXTRACT_TIMEOUT_MS = 15000

// Demo draft returned when there's no API key (offline / dev mode).
const MOCK_DRAFT = {
  typeId: 'experience',
  title: 'Data Engineering Intern',
  organisation: 'Grab',
  startDate: '2024-06-01',
  endDate: '2024-08-31',
  description:
    "Worked on Grab's data pipeline: built ingestion jobs, monitored data quality, and onboarded two new interns.",
  skills: ['Python', 'SQL', 'Airflow', 'Data Pipeline'],
  evidenceUrl: '',
}

const VALID_TYPE_IDS = new Set([
  'experience',
  'education',
  'project',
  'competition',
  'volunteering',
  'certification',
])

// Coerces a raw API payload into the shape the AddExperienceModal expects.
// Any missing / wrong-type field becomes a safe empty default.
function normaliseDraft(raw) {
  const safe = raw && typeof raw === 'object' ? raw : {}
  const typeId = typeof safe.typeId === 'string' && VALID_TYPE_IDS.has(safe.typeId)
    ? safe.typeId
    : 'experience'
  return {
    typeId,
    title: typeof safe.title === 'string' ? safe.title : '',
    organisation: typeof safe.organisation === 'string' ? safe.organisation : '',
    startDate: typeof safe.startDate === 'string' ? safe.startDate : '',
    endDate: typeof safe.endDate === 'string' ? safe.endDate : '',
    description: typeof safe.description === 'string' ? safe.description : '',
    skills: Array.isArray(safe.skills)
      ? safe.skills.filter((s) => typeof s === 'string' && s.trim().length > 0)
      : [],
    evidenceUrl: typeof safe.evidenceUrl === 'string' ? safe.evidenceUrl : '',
  }
}

export function isBackendConfigured() {
  return Boolean(COMPANION_API_BASE_URL)
}

// Calls your FastAPI to turn a free-form prompt into a structured
// experience draft. Returns the normalised draft on success; falls back
// to MOCK_DRAFT on any failure so the modal always has something to
// display.
export async function fetchExperienceDraft(prompt) {
  if (!isBackendConfigured()) {
    return { draft: MOCK_DRAFT, source: 'mock' }
  }

  const controller = new AbortController()
  const timeoutId = window.setTimeout(() => controller.abort(), EXTRACT_TIMEOUT_MS)

  try {
    const response = await fetch(`${COMPANION_API_BASE_URL}${EXTRACT_EXPERIENCE_PATH}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
      signal: controller.signal,
    })
    if (!response.ok) throw new Error(`Extract-experience API failed: ${response.status}`)
    const payload = await response.json()
    return { draft: normaliseDraft(payload), source: 'api' }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn('[careerMemoryApi] extract-experience failed, using mock:', error)
    return { draft: MOCK_DRAFT, source: 'mock-fallback' }
  } finally {
    window.clearTimeout(timeoutId)
  }
}
