# CareerOS Round 2 — Project Knowledge Base
*For Claude Project — Internal Team Reference*
*Last updated: June 2026*

---

## What is CareerOS

CareerOS is an AI-powered Career Operating System connecting three stakeholders:

- **Students (Candidates)** — build evidence-backed career profiles, discover opportunities, track readiness
- **Universities** — align curriculum with market demand, track student readiness, measure event impact
- **Employers** — discover verified talent, create engagement programmes, manage hiring pipelines

Demo personas:
- Student: Chris Lee, Y3 Data Science, Taylor's University
- University: Dr. Evelyn Chen, Dean of Computing & AI, Heriot-Watt University Malaysia
- Employer: Edwin Khoo, HR Manager @ Google

---

## The Big Strategic Shift (Round 1 → Round 2)

**Round 1 philosophy:** "CareerOS helps users manage career information."

**Round 2 philosophy:** "CareerOS tells every stakeholder what to do next — and helps them do it."

**Round 1 flow:** User → Find the right module → Read data → Decide → Act

**Round 2 flow:** System detects signal → AI Companion surfaces what matters → User confirms → System executes

The core insight: Nobody wakes up wanting to check a readiness dashboard. What everyone wants to know is: what changed, what matters most, and what should I do next.

Most career platforms organise information. **CareerOS organises action.**

---

## Design Principles (Non-negotiable)

1. **AI Companion is always the primary interface** — not dashboards
2. **Every insight must have a direct action** — no insight without a next step
3. **Progressive disclosure** — headline first, detail on demand
4. **Zero Query experience** — system surfaces what matters before user asks
5. **Footprint memory** — system remembers last visit and follows up
6. **NLP control layer** — users can navigate and execute by typing natural language

---

## Design Systems

### Candidate Workspace
- **Hero element:** 3D white robot mascot, teal n_n face display, soft purple ambient glow
- **Layout:** Left side = Robot + speech bubble / Right side = Content cards or large conversation bubble
- **Interaction:** Quick reply chips below robot (NOT a chat input box)
- **Background:** Soft lavender-white gradient
- **Colors:** Purple/violet primary, green for positive signals, orange for urgency
- **Consistency:** All pages follow the same left-right split — robot always on left

### Employer Workspace
- **No large robot mascot** — employers are power users, not students needing guidance
- **Visual reference:** 天籁 (Tencent Music) glassmorphism style
- **Background:** Light blue to white gradient, subtle decorative orbs
- **Cards:** Glassmorphism — white 70% opacity, backdrop blur, rounded corners
- **Layout:** Top slim robot briefing row + Left 25% NLP chat + Right 75% dynamic content
- **Two AI roles:**
  - Top robot briefing row = emotional value, interpretation, context
  - Left NLP chat = execution, NLP commands, RPA actions

### University Workspace
- Not yet designed — pending

---

## What We Have Discussed and Decided

### Product Architecture
- AI Companion is the nervous system; all existing features become signal sensors feeding it
- Existing features don't disappear — they get connected through the Companion
- NLP layer: user types natural language → Claude API classifies intent → returns structured JSON → frontend executes
- Tech: Groq API (Llama 3) for LLM — NOT OpenAI or Anthropic (organiser constraint)
- Two types of AI work: conditional logic for navigation, genuine LLM for skill detection and summary generation

### Self-Discovery Framework (replacing MBTI)
- MBTI excluded — 50% test-retest reliability, gives labels not directions
- Replacement: Three-layer hybrid framework
  - Layer 1: DISC (behavioural style, 15-25 min)
  - Layer 2: CliftonStrengths simplified (5 open-ended strength questions)
  - Layer 3: Values trade-off scenarios (8 forced choices)
- Total: 10 interactions, 5 minutes
- Output: Robot narrates a story about the user — not a label, not a score
- Evolves over time: Career Memory itself becomes the deepest self-discovery tool
- Research document saved: CareerOS_SelfDiscovery_Research.md

### Engagement Design Philosophy
Employers create engagement for four distinct purposes:
- **Attract Talent** → Workshop, Tech Talk (brand building, Y1-Y2)
- **Discover Talent** → Hackathon, Case Competition (talent identification, Y2-Y3)
- **Validate Talent** → Micro Project, Assessment (skill verification, final year)
- **Develop Talent** → Mentorship Program (relationship building, long-term)

Create Engagement flow: Goal selection → AI designs event → Employer reviews → Preview → Publish

### Inspiration References
- **HarmonyOS 7.0** — Intent as a Service, system prepares before you ask, Agent Framework with 2100+ skills
- **Apple Intelligence** — cross-context awareness, AI knows what you just did
- **Notion AI** — embedded AI, assistant lives inside the content
- **Google Now** — Zero Query, best interaction is one where you don't type anything
- **Perplexity** — actionable answers, every insight has a next step button
- **天籁 (Tencent Music)** — glassmorphism aesthetic, slim left AI panel, professional content density

---

## Completed Round 2 Designs

### Candidate Workspace ✅

| Page | State | Status |
|---|---|---|
| Overview | Home (robot + large bubble + footprint follow-up) | ✅ Done |
| Career Memory | Home (3 action choice cards) | ✅ Done |
| Career Memory | Add Experience Step 1 (type selection, 4 choice cards) | ✅ Done |
| Career Memory | Add Experience Step 2 (basics, hybrid input) | ✅ Done |
| Career Memory | Add Experience Step 3 (outcome + evidence) | ✅ Done |
| Career Memory | Add Experience Step 4 (AI confirmation summary) | ✅ Done |
| Career Memory | Show Full Timeline (robot narrator + AI pattern chips) | ✅ Done |
| Career Memory | Timeline with highlighted pattern (chip clicked) | ✅ Done |
| Career Intelligence | Home (robot + 3 insight action cards) | ✅ Done |
| Career Intelligence | Skills page (robot + edge/gap/market cards with mini visuals) | ✅ Done |
| Career Intelligence | Career Path home (node graph top + robot explainer bottom) | ✅ Done |
| Career Intelligence | Market Insights (large conversation bubble + mini visual cards) | ✅ Done |
| Opportunities | Home entry (robot + 3 priority cards) | ✅ Done |
| Opportunities | Browse all (slim robot row + event cards grid) | ✅ Done |
| Opportunities | Event clicked (robot changes, card highlighted, others dimmed) | ✅ Done |
| Opportunities | Event detail (robot + full detail + related signals) | ✅ Done |

### Employer Workspace ✅

| Page | State | Status |
|---|---|---|
| Overview | Home (glassmorphism + 4 intelligence cards + empty NLP chat) | ✅ Done |
| Talent Discovery | Candidate grid (robot row + 6 candidate cards + NLP chat active) | ✅ Done |
| Talent Discovery | Candidate profile (3D character + signal tags + AI verdict) | ✅ Done |
| Create Engagement | Goal selection (4 goal cards: Attract/Discover/Validate/Develop) | ✅ Done |
| Create Engagement | Event Proposal (AI pre-fill template, NLP chat fills form) | ✅ Done |
| Create Engagement | Preview Event Card (student view + AI prediction panel) | ✅ Done |
| Club Collaboration | Browse tab (AI recommended clubs + filter pills) | ✅ Done |
| Job Marketplace | Home (4 job cards with AI signals + metrics row) | ✅ Done |
| Job Marketplace | Pipeline Kanban (5 stages + AI recommendations + NLP execution) | ✅ Done |
| Job Marketplace | Post New Role (AI pre-fill form via NLP chat) | ✅ Done |

---

## Pending Designs

### Candidate Workspace (Priority: High — needed for demo)

**1. Empty State**
New user, no Career Memory data yet. Robot can't analyse anything.
Robot should say something warm and guide first action.
Suggested chips: [Add your first experience] [Set your target role] [Tell me about yourself]

**2. After Action State**
User just completed an action (e.g. applied to TalentBank challenge).
Robot should acknowledge, celebrate briefly, and give next recommended action.
Avoid making it feel like a notification — should feel like a colleague responding.

**3. Quick Reply Response State**
User clicked a chip (e.g. "Show my full readiness").
Robot responds with detail in the right panel.
Currently the chips are decorative — they need to actually do something.
Example: click "Show my full readiness" → robot gives a readiness breakdown with action.

**4. Notification / Return State**
User was away for several days and comes back.
Robot's opening changes — references time away, summarises what happened.
Different from the standard overview — more like "welcome back" briefing.

**5. Self-Discovery Onboarding Flow**
Brand new user, first time on platform.
3-round assessment: DISC + CliftonStrengths simplified + Values trade-offs
10 interactions total, 5 minutes
Robot narrates the result as a story, not a label
Research document saved separately

**6. Career Path Detail Page**
User clicks a node on the Career Path graph.
Currently the graph exists but clicking does nothing.
Should trigger: robot asks "Want me to map your path to [role]?" → user confirms → robot generates personalised roadmap below the graph.

### University Workspace (Priority: Medium — needed for full demo)
Nothing designed yet. Round 1 has:
- Overview with strategic quadrant
- Program-Market Alignment
- Student Readiness heatmap
- Alumni Signal Intelligence
- Collaboration Marketplace
- Event Impact Dashboard
- AI University Advisor

All of these need Round 2 AI-first treatment.
University persona: Dr. Evelyn Chen — institutional buyer, needs data credibility, not a mascot.
Design direction: Professional, data-rich, but still AI-first. Companion is an advisor, not a character.

---

## How the Three Workspaces Connect (The Ecosystem Loop)

This is the most important thing to show in the demo:

```
Student adds Career Memory entry
        ↓
AI extracts skills and updates readiness
        ↓
Employer's Talent Discovery gets new signal
        ↓
Employer creates engagement targeting that skill gap
        ↓
Student sees the engagement in Opportunities Hub
        ↓
Student participates → adds to Career Memory
        ↓
University sees aggregate skill signals in Student Readiness
        ↓
University updates curriculum or creates intervention
        ↓
Loop continues
```

The most powerful demo moment: show one action by a student that triggers a signal in the employer workspace and a signal in the university workspace — without the student doing anything extra.

---

## Tech Architecture Summary

**Frontend:** React + Tailwind (existing Round 1 codebase)

**LLM:** Groq API (Llama 3 8B) — free tier, fast, no local installation
- Organiser constraint: no cloud APIs during testing
- Groq is technically not OpenAI/Anthropic so it qualifies

**NLP Navigation Layer:**
```javascript
User types message
→ Send to Groq API with intent classification prompt
→ Groq returns JSON: { intent, destination, action, prefill }
→ Frontend reads JSON
→ Executes: navigate / open modal / prefill form / display answer
```

**Genuine LLM usage (not conditional logic):**
- Skill detection from Career Memory text
- Summary generation for career profile
- Add Experience conversation (robot asks → user answers → LLM extracts structured data)
- AI Verdict generation for employer candidate profiles

**Most impressive demo moment for LLM:**
User adds experience in natural language → LLM detects skills → Confirmation card shows "Skills detected by AI: [Product Strategy] [Leadership]" — this should be real, not hardcoded.

---

## What Evaluators Will Look For

Based on hackathon context, evaluators care about:

1. **Does the AI actually do something?** At least one flow must use real LLM, not just conditional logic
2. **Is the three-sided ecosystem visible?** Show how student action affects employer view
3. **Is the product differentiated?** Not another LinkedIn or Jobstreet
4. **Is the UX coherent?** Does it feel like one product, not 3 separate apps glued together
5. **Is the vision clear?** Can you explain in one sentence why this is the future of career platforms

**The pitch line:** "Most career platforms organise information. CareerOS organises action. It's the operating system for your career — not a tool you use, but a system that works for you."

---

## Immediate Next Steps (Priority Order)

1. **Implement NLP navigation** in existing React codebase (1-2 days)
2. **Connect Groq API** for skill detection in Add Experience flow (1 day)
3. **Design and build Empty State** (half day)
4. **Design and build Quick Reply Response State** (half day)
5. **Design and build After Action State** (half day)
6. **Design University Workspace Round 2** (2 days)
7. **Design Self-Discovery onboarding** (1 day)
8. **Polish demo flow** — one complete journey per stakeholder (1 day)

---

## Demo Script (Recommended)

**Act 1 — Student (Chris Lee)**
1. Open Overview → robot says "I found 3 things that matter today"
2. Explore TalentBank opportunity via Explore button
3. Add a new experience via Career Memory → show NLP + skill detection
4. Check Market Insights → robot explains market in conversational bubble

**Act 2 — Employer (Edwin Khoo)**
1. Open Overview → robot briefs pipeline status
2. Search "UX Designer fresh grad" via NLP chat → candidate grid appears
3. Click Alyssa's profile → 3D visualization + AI verdict
4. Robot recommends "Send assessment" → Edwin confirms

**Act 3 — University (Dr. Evelyn Chen)**
1. Open Overview → robot shows programme-market gap
2. View Student Readiness → see at-risk students
3. Create intervention → Collaboration Marketplace

**Closing moment:** Show that Alyssa's new experience (added in Act 1) appears as a signal in Edwin's Talent Discovery (Act 2) — the ecosystem loop is live.

---

## Files in This Project

- `MASTER_CONTEXT.md` — Full Round 1 product audit
- `CareerOS_Evolution_Summary.md` — Strategic evolution brief for team
- `CareerOS_SelfDiscovery_Research.md` — Psychology framework research
- `CareerOS_Round2_Project_Knowledge.md` — This file

*Round 2 design screenshots should also be uploaded as reference images.*
