\# CareerOS — Claude Code Context



\## Project Overview



CareerOS is an AI-powered Career Operating System 

for a hackathon (Round 2). It connects three 

stakeholders: Candidates (students), Employers, 

and Universities.



This is a React + Vite + Tailwind frontend prototype.

No backend API. Mock data stored in Zustand stores.

Icon system: lucide-react.



\## Current State (Round 1)



The existing codebase is a dashboard-first prototype.

Users navigate between modules to find information.

AI Companion exists as a small sidebar widget — 

it is NOT the primary interface yet.



\## What We Are Building (Round 2)



We are evolving CareerOS from dashboard-first 

to AI-first Operating System.



Core principle: 

"Most career platforms organise information. 

CareerOS organises action."



New flow:

User → AI Companion → Recommended Action → Dashboard (optional)



\## Design Philosophy



\- AI Companion is the PRIMARY interface

\- Every insight must have a direct action

\- Progressive disclosure — headline first, detail on demand

\- Zero Query — system surfaces what matters before user asks

\- NLP control — users navigate by typing natural language



\## Visual Design System



\### Candidate Workspace

\- 3D white robot mascot (already exists in codebase)

\- Left: Robot + speech bubble

\- Right: Content cards or large conversation bubble

\- Background: soft lavender-white gradient

\- Colors: purple/violet primary, green positive, orange urgency

\- Quick reply chips below robot (NOT a chat input)



\### Employer Workspace

\- No large robot mascot

\- Glassmorphism aesthetic, light blue-white gradient

\- Top: Slim robot briefing row

\- Left 25%: NLP Chat panel

\- Right 75%: Dynamic content area

\- Two AI roles:

&#x20; Top robot = interpretation and context

&#x20; Left chat = NLP execution and RPA



\## Tech Stack



\- React + Vite

\- Tailwind CSS

\- Zustand (state management)

\- lucide-react (icons)

\- React Router (routing)

\- LLM: Groq API (Llama 3) — NOT OpenAI or Anthropic

&#x20; Endpoint: https://api.groq.com/openai/v1/chat/completions

&#x20; Model: llama3-8b-8192

&#x20; Free tier, fast, no local installation needed



\## Priority Tasks for Round 2



\### Priority 1 — NLP Navigation Layer

Create an AI Companion input that:

1\. Accepts natural language from user

2\. Sends to Groq API with intent classification prompt

3\. Returns structured JSON: { intent, destination, action, prefill }

4\. Frontend reads JSON and executes accordingly



\### Priority 2 — Candidate Overview Redesign

Replace dashboard-first landing with:

\- Robot briefing at top (what changed, what matters, what to do next)

\- Large conversation bubble with 3 signal cards inside

\- Footprint follow-up section (what user left unfinished)

\- Quick reply chips



\### Priority 3 — Career Memory Add Experience

Replace the existing form with a conversational flow:

\- Step 1: Choose experience type (4 choice cards, no text input)

\- Step 2: Robot asks questions, user answers

\- Step 3: LLM extracts skills from user's text

\- Step 4: Confirmation card with "Skills detected by AI"

&#x20; This step MUST use real Groq LLM inference, not hardcoded



\### Priority 4 — Employer Overview

New glassmorphism layout:

\- Slim robot briefing row at top

\- Left NLP chat panel (empty default, waiting for commands)

\- Right: 4 intelligence cards (Pipeline, Actions, Engagement, Market)



\## Important Rules



\- Do NOT use OpenAI or Anthropic APIs

\- Do NOT install local LLM models

\- Groq API is the only LLM provider allowed

\- Keep mock data in Zustand — no backend needed for demo

\- Do not break existing Round 1 routes

\- Add Round 2 as new routes/components, not replacements

&#x20; (so we can demo both if needed)



\## File Structure Notes



Before making changes, always:

1\. Read the existing routing structure

2\. Understand the current Zustand store structure

3\. Check existing component patterns

4\. Propose a plan before writing code



\## Groq API Integration



```javascript

const response = await fetch(

&#x20; "https://api.groq.com/openai/v1/chat/completions",

&#x20; {

&#x20;   method: "POST",

&#x20;   headers: {

&#x20;     "Authorization": `Bearer ${import.meta.env.VITE\_GROQ\_API\_KEY}`,

&#x20;     "Content-Type": "application/json"

&#x20;   },

&#x20;   body: JSON.stringify({

&#x20;     model: "llama3-8b-8192",

&#x20;     messages: \[

&#x20;       { role: "system", content: "Your system prompt here" },

&#x20;       { role: "user", content: userMessage }

&#x20;     ],

&#x20;     max\_tokens: 500

&#x20;   })

&#x20; }

);

const data = await response.json();

const reply = data.choices\[0].message.content;

```



Store Groq API key in .env file as:

VITE\_GROQ\_API\_KEY=your\_key\_here



\## Demo Personas



\- Candidate: Chris Lee, Y3 Data Science, Taylor's University

\- Employer: Edwin Khoo, HR Manager @ Google

\- University: Dr. Evelyn Chen, Dean of Computing \& AI, 

&#x20; Heriot-Watt University Malaysia


Read CareerOS_Round2_Project_Knowledge.md 
for full Round 2 design context before 
doing anything.
