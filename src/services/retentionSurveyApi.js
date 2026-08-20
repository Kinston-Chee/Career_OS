// ─── AI survey generation for the Employee Retention page ─────────────────
//
// Uses Groq (llama3-8b-8192), the only LLM provider this project allows. When
// VITE_GROQ_API_KEY is absent or the call fails, a deterministic generator
// produces questions from the same brief so the demo always works offline.
//
// Returns: { questions: [{ text, type }], source: 'groq' | 'offline' }

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'

const SYSTEM_PROMPT = `You are an HR research assistant writing employee retention surveys.
Rules:
- Write neutral, non-leading questions an employee can answer honestly.
- Never ask for information that identifies a colleague by name.
- Mix "scale" (1-5 agreement) questions with one or two "open" questions.
- Return ONLY a JSON array, no prose, in this exact shape:
[{"text": "...", "type": "scale" | "open" | "choice"}]`

function buildUserPrompt({ topic, audience, count, tone }) {
  return `Write ${count} employee survey questions.
Topic / retention concern: ${topic}
Audience: ${audience}
Tone: ${tone}
Return the JSON array only.`
}

// Pull the first JSON array out of a model response, tolerating stray prose.
function parseQuestions(raw) {
  if (!raw) return null
  const match = raw.match(/\[[\s\S]*\]/)
  if (!match) return null
  try {
    const parsed = JSON.parse(match[0])
    if (!Array.isArray(parsed)) return null
    const cleaned = parsed
      .map((q) => ({
        text: String(q.text || '').trim(),
        type: ['scale', 'open', 'choice'].includes(q.type) ? q.type : 'scale',
      }))
      .filter((q) => q.text.length > 0)
    return cleaned.length ? cleaned : null
  } catch {
    return null
  }
}

// ─── Offline generator ────────────────────────────────────────────────────
// Keyed off the retention concern in the brief, so the output still reflects
// what the HR user asked for rather than a fixed list.
const OFFLINE_BANK = [
  { match: /pay|salary|compensation|compa|raise|bonus/i, questions: [
    { text: 'I believe my pay is fair for the work I do.', type: 'scale' },
    { text: 'I understand how pay decisions are made in this company.', type: 'scale' },
    { text: 'I know what I would need to achieve to move to the next pay band.', type: 'scale' },
    { text: 'Compared with similar roles elsewhere, my total package feels competitive.', type: 'scale' },
    { text: 'What would make our pay and progression process feel fairer to you?', type: 'open' },
  ] },
  { match: /promot|career|progress|growth|stale|develop/i, questions: [
    { text: 'I can see a realistic path to my next role here.', type: 'scale' },
    { text: 'I have had a meaningful career conversation in the last six months.', type: 'scale' },
    { text: 'The criteria for promotion in my team are clear to me.', type: 'scale' },
    { text: 'I am learning skills here that keep me employable.', type: 'scale' },
    { text: 'What is the single biggest barrier to your progression right now?', type: 'open' },
  ] },
  { match: /burnout|workload|overtime|hours|stress|capacity/i, questions: [
    { text: 'My workload over the past month has been sustainable.', type: 'scale' },
    { text: 'I can switch off from work outside my contracted hours.', type: 'scale' },
    { text: 'My team has enough people to cover the work we are asked to deliver.', type: 'scale' },
    { text: 'How many hours beyond your contracted week did you work last week?', type: 'choice' },
    { text: 'What is driving the extra hours for you at the moment?', type: 'open' },
  ] },
  { match: /manager|1-on-1|one.on.one|leader|supervis|feedback/i, questions: [
    { text: 'My 1-on-1s happen consistently and are a good use of my time.', type: 'scale' },
    { text: 'My manager recognises good work when it happens.', type: 'scale' },
    { text: 'I can raise a concern with my manager without worrying about the consequences.', type: 'scale' },
    { text: 'My manager gives me feedback I can act on.', type: 'scale' },
    { text: 'What should your manager start, stop, or continue doing?', type: 'open' },
  ] },
  { match: /belong|culture|recognition|isolat|team|inclusion/i, questions: [
    { text: 'I feel like I belong on my team.', type: 'scale' },
    { text: 'My contributions are noticed by the people around me.', type: 'scale' },
    { text: 'I have someone at work I can talk to when something goes wrong.', type: 'scale' },
    { text: 'When did you last feel genuinely recognised for your work, and what happened?', type: 'open' },
  ] },
]

const GENERIC_QUESTIONS = [
  { text: 'How likely are you to still be working here in twelve months?', type: 'scale' },
  { text: 'I would recommend this company as a place to work.', type: 'scale' },
  { text: 'My day-to-day work matches what I was told when I joined.', type: 'scale' },
  { text: 'I have what I need to do my job well.', type: 'scale' },
  { text: 'What is the one change that would most improve your experience here?', type: 'open' },
]

function offlineQuestions({ topic, count }) {
  const bank = OFFLINE_BANK.find((entry) => entry.match.test(topic))?.questions ?? GENERIC_QUESTIONS
  const pool = [...bank, ...GENERIC_QUESTIONS.filter((q) => !bank.includes(q))]
  return pool.slice(0, Math.max(3, Math.min(count, pool.length)))
}

export async function generateSurveyQuestions({ topic, audience = 'All employees', count = 5, tone = 'Direct and neutral' }) {
  const brief = { topic: topic?.trim() || 'general retention risk', audience, count, tone }
  const key = import.meta.env.VITE_GROQ_API_KEY

  if (key) {
    try {
      const response = await fetch(GROQ_URL, {
        method: 'POST',
        headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'llama3-8b-8192',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: buildUserPrompt(brief) },
          ],
          max_tokens: 500,
        }),
      })
      const data = await response.json()
      const questions = parseQuestions(data.choices?.[0]?.message?.content)
      if (questions) return { questions: questions.slice(0, count), source: 'groq' }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('[retentionSurveyApi] Groq call failed, using offline bank:', error)
    }
  }

  return { questions: offlineQuestions(brief), source: 'offline' }
}
