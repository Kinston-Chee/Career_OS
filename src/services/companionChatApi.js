// ─── Career-Memory Companion — generic LLM chat integration ────────
//
// ┌───────────────────────────────────────────────────────────────────┐
// │ WHERE TO PUT THINGS                                               │
// ├───────────────────────────────────────────────────────────────────┤
// │ 1. Base URL of your FastAPI server:                               │
// │      Add to `.env` at the project root:                          │
// │        VITE_COMPANION_API_BASE_URL=http://localhost:8000         │
// │      (same env var is reused by careerMemoryApi.js — one         │
// │      backend URL for both endpoints.)                            │
// │                                                                   │
// │ 2. Route path on your FastAPI server:                             │
// │      Change `CHAT_PATH` below if your endpoint differs.          │
// │                                                                   │
// │ 3. Request + response shape:                                      │
// │      See REQUEST + RESPONSE block below.                         │
// │                                                                   │
// │ 4. When the env var is NOT set, `chatWithCompanion()` returns    │
// │    a mock reply so the chatbox still works offline.              │
// └───────────────────────────────────────────────────────────────────┘
//
// ─── Contract with your FastAPI ─────────────────────────────────────
//
// REQUEST (POST body, JSON):
//   {
//     "prompt":  "What should I focus on this week?",
//     "history": [
//       { "role": "user",      "content": "…" },
//       { "role": "assistant", "content": "…" }
//     ]
//   }
//
// RESPONSE (HTTP 200 JSON):
//   {
//     "reply": "<the LLM's reply, as plain text>"
//   }
//
// Anything else is coerced into a plain text reply so a malformed
// payload never crashes the UI.
//
// ─── FastAPI stub ───────────────────────────────────────────────────
// @app.post("/api/companion/chat")
// async def chat(payload: ChatRequest) -> ChatResponse:
//     # Call your LLM with payload.prompt + payload.history.
//     return {"reply": "…"}

// const COMPANION_API_BASE_URL = import.meta.env.VITE_COMPANION_API_BASE_URL ?? 'http://127.0.0.1:8001'
const COMPANION_API_BASE_URL = 'http://127.0.0.1:8001'
const CHAT_PATH = '/api/candidates/chat'
const CHAT_TIMEOUT_MS = 120000

const MOCK_REPLY_PREFIX =
  "I'm here to help you build your Career Memory. (Mock reply — the backend isn't wired yet.) You said:"

export function isChatBackendConfigured() {
  return Boolean(COMPANION_API_BASE_URL)
}

// Calls the generic-chat endpoint on your FastAPI and returns the reply
// text. Falls back to a mock string on any failure so the UI always has
// something to render.
export async function chatWithCompanion(prompt, history = []) {
  if (!isChatBackendConfigured()) {
    return { reply: `${MOCK_REPLY_PREFIX} “${prompt}”`, source: 'mock' }
  }

  const controller = new AbortController()
  const timeoutId = window.setTimeout(() => controller.abort(), CHAT_TIMEOUT_MS)

  try {
    const response = await fetch(`${COMPANION_API_BASE_URL}${CHAT_PATH}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, history }),
      signal: controller.signal,
    })
    if (!response.ok) throw new Error(`Chat API failed: ${response.status}`)
    const payload = await response.json()
    // const [text, data] = payload
    const reply = typeof payload?.reply === 'string' && payload.reply.trim().length > 0
      ? payload.reply
      : `${MOCK_REPLY_PREFIX} “${prompt}”`
    const data_response = payload.data
    return { reply, data_response, source: 'api' }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn('[companionChatApi] chat failed, using mock reply:', error)
    return { reply: `${MOCK_REPLY_PREFIX} “${prompt}”`, source: 'mock-fallback' }
  } finally {
    window.clearTimeout(timeoutId)
  }
}
