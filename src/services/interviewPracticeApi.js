// ─── Interview Practice — session-launch integration ────────────────
//
// ┌───────────────────────────────────────────────────────────────────┐
// │ WHERE TO PUT THINGS                                               │
// ├───────────────────────────────────────────────────────────────────┤
// │ 1. Base URL of your FastAPI server:                               │
// │      Add to `.env` at the project root:                          │
// │        VITE_COMPANION_API_BASE_URL=http://localhost:8000         │
// │      (same env var reused by companionChatApi + careerMemoryApi) │
// │                                                                   │
// │ 2. Route path on your FastAPI server:                             │
// │      Change `START_PATH` below if your endpoint differs.         │
// │                                                                   │
// │ 3. Request + response shape:                                      │
// │      See REQUEST + RESPONSE block below.                         │
// │                                                                   │
// │ 4. When the env var is NOT set (or the call fails), the launcher  │
// │    returns a mock payload so the UI still works offline.         │
// └───────────────────────────────────────────────────────────────────┘
//
// ─── Contract with your FastAPI ─────────────────────────────────────
//
// REQUEST (POST body, JSON) — everything the user picked on the setup form:
//   {
//     "difficulty":  "Beginner" | "Intermediate" | "Advanced" | "Expert",
//     "language":    "English"  | "Mandarin" | ...,
//     "tone":        "Easy" | "Normal" | "Moderate" | "Hard" | "Challenging",
//     "persona":     "Friendly" | "Formal" | "Strict" | ...,
//     "gender":      "Male" | "Female" | "Neutral",
//     "session_length_seconds": 600,
//     "conversation_gap_seconds": 10,
//     "job_role":     "Software Engineer",
//     "job_industry": "Fintech",   // optional, may be ""
//     "job_url":      "https://…"  // optional, may be ""
//   }
//
// RESPONSE (HTTP 200 JSON):
//   {
//     "session_id":      "sess_abc123",
//     "greeting":        "Good afternoon, Chris…",   // optional
//     "first_question":  "Tell me about yourself…"   // optional
//   }
//
// Missing fields are treated as empty strings so a partial payload
// never crashes the UI.
//
// ─── FastAPI stub ───────────────────────────────────────────────────
// @app.post("/api/interview-practice/start")
// async def start(payload: InterviewSetup) -> StartResponse:
//     # persist the config, call your LLM with the persona/tone/etc.,
//     # generate the opener, return the session id.
//     return {"session_id": "…", "greeting": "…", "first_question": "…"}

const COMPANION_API_BASE_URL =
  import.meta.env.VITE_COMPANION_API_BASE_URL ?? 'http://127.0.0.1:8001'
const START_PATH = '/api/candidates/create_interview'
const START_TIMEOUT_MS = 60000

export function isInterviewBackendConfigured() {
  return Boolean(COMPANION_API_BASE_URL)
}

// Turn the SetupView's local state into the JSON body the backend expects.
// Kept in one place so both the launcher and any tests use the same shape.
export function buildInterviewSetupPayload(state) {
  return {
    difficulty: state.diff ?? '',
    language: state.lang ?? '',
    tone: state.tone ?? '',
    persona: state.persona ?? '',
    interviewer_gender: state.gender ?? '',
    time_limit: Number(state.sessionLen) || 0,
    conversation_gap: Number(state.gap) || 0,
    target_role: (state.jobRole ?? '').trim(),
    target_indsutry: (state.jobIndustry ?? '').trim(),
    target_job_posting: (state.jobUrl ?? '').trim(),
  }
}

// POST the setup form to the backend and return the session bootstrap
// payload. Falls back to a mock so the UI always has something to work
// with — the returned `source` field tells the caller which path won.
export async function startInterviewSession(state) {
  const payload = buildInterviewSetupPayload(state)

  if (!isInterviewBackendConfigured()) {
    return {
      session_id: `mock_${Date.now()}`,
      greeting: '',
      first_question: '',
      source: 'mock',
      payload,
    }
  }

  const controller = new AbortController()
  const timeoutId = window.setTimeout(() => controller.abort(), START_TIMEOUT_MS)
  
  try {
    console.log(payload)
    const response = await fetch(`${COMPANION_API_BASE_URL}${START_PATH}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })
    if (!response.ok) {
      let detail = ''
      try {
        const errBody = await response.json()
        detail = typeof errBody?.detail === 'string' ? errBody.detail : ''
      } catch (_) { /* body not JSON — ignore */ }
      return {
        source: 'error',
        error: detail || `Interview start failed (${response.status})`,
        status: response.status,
        payload,
      }
    }
    const data = await response.json()
    return {
      session_id: typeof data?.session_id === 'string' ? data.session_id : `sess_${Date.now()}`,
      greeting: typeof data?.greeting === 'string' ? data.greeting : '',
      first_question: typeof data?.first_question === 'string' ? data.first_question : '',
      source: 'api',
      payload,
    }
  } catch (error) {
    // Network failure, timeout (AbortController), CORS, etc. Do NOT silently
    // fall back to a mock — the caller must know the backend rejected the
    // request so it can keep the user on the setup form.
    // eslint-disable-next-line no-console
    console.warn('[interviewPracticeApi] start failed:', error)
    const aborted = error?.name === 'AbortError'
    return {
      source: 'error',
      error: aborted
        ? 'Interviewer service timed out. Please try again.'
        : error?.message || 'Could not reach the interviewer service.',
      payload,
    }
  } finally {
    window.clearTimeout(timeoutId)
  }
}
