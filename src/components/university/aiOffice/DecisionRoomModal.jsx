import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowRight, Clock, FileText, MessageSquarePlus, Sparkles, Users, X } from 'lucide-react'
import { AGENTS } from './agentConfig'
import imgDecisionRoom from '../../../assets/University/Central Decision room.png'

// ─── Scripted meeting scripts (剧本) ─────────────────────────────────────────
const AGENT_MAP = Object.fromEntries(AGENTS.map((a) => [a.id, a]))

const SCRIPTS = [
  {
    id: 'genai-curriculum',
    title: 'Plan a curriculum update for GenAI skills',
    desc: 'Cleo, Nova, Rex & Sage will surface the gap, constraints, and a co-design path.',
    agentIds: ['curriculum', 'alumni', 'accreditation', 'partnership'],
    acts: [
      {
        speeches: [
          { agentId: 'curriculum', text: "Let me open with the numbers. Our GenAI coverage sits at 13% against a market demand of 44% — a 31-point gap. I've tracked this for two cycles and it is widening. Google and Grab now list LLM proficiency as a baseline requirement for graduate roles, not an optional bonus." },
          { agentId: 'alumni', text: "I can confirm that from our end. This week's Q2 alumni survey: 34% flagged GenAI tools as their single biggest skill gap after entering the workforce. That is the highest complaint in three years of tracking. I also have direct written feedback from Grab's hiring team making the same point." },
        ],
        prompts: [
          "How quickly can we add a new module?",
          "What's the risk if we don't act this semester?",
          "Can we patch existing modules as a quick fix first?",
        ],
      },
      {
        speeches: [
          { agentId: 'curriculum', text: "A dedicated GenAI Systems elective can be module-spec ready in 6 weeks if I start today. It slots into Semester 5. Content is well-defined — the bottleneck is approval, not development." },
          { agentId: 'accreditation', text: "I need to flag a compliance point. Any new module, even an elective, requires a formal Programme Amendment submitted to MQA before our December self-review. Faculty Academic Board must sign off by July at the latest. We have roughly 8 weeks — tight, but achievable if we move now." },
          { agentId: 'curriculum', text: "Noted, Rex. So the critical path is: I finish the spec by end of June, FAB signs off in July, Rex files the amendment in August. That's workable. The risk is FAB calendar congestion — if their July session fills up, we lose the window." },
        ],
        prompts: [
          "Can Sage get industry partners to co-design the module?",
          "What evidence does Rex need for the MQA amendment?",
          "Should we update CS401 as a bridge while waiting for FAB?",
        ],
      },
      {
        speeches: [
          { agentId: 'partnership', text: "This is exactly where I can help. The TalentBank proposal on my desk — RM 180,000 joint research programme on AI-driven graduate readiness — includes an offer to co-design the module curriculum with us. That gives Cleo industry-validated content and accelerates the spec." },
          { agentId: 'alumni', text: "Building on that — Google and Grab have both offered written feedback on graduate AI readiness this quarter. Those employer letters can serve as advisory input for the module design and are available immediately." },
          { agentId: 'accreditation', text: "And from an MQA standpoint, industry co-design is explicitly valued in the accreditation criteria. TalentBank's formal involvement in module development would significantly strengthen our evidence pack. It turns a compliance burden into a strength." },
        ],
        prompts: [
          "I want to approve the TalentBank proposal — what are the next steps?",
          "How do we ensure the module is ready for the Semester 5 intake?",
          "Should we approve the Grab internship proposal at the same time?",
        ],
      },
      {
        speeches: [
          { agentId: 'curriculum', text: "If the Dean approves TalentBank today, I start the co-design workshop next week. Module spec finalised by end of June, submitted to FAB in the first July session. Student registration opens August — Semester 5 intake is fully covered." },
          { agentId: 'partnership', text: "I'll activate the TalentBank agreement this week and schedule the first co-design session. I also recommend approving the Grab proposal simultaneously — their 10 internship slots become a live practicum for students who complete the new module in Semester 5, then do the placement in Semester 6." },
          { agentId: 'accreditation', text: "Good. I'll prepare the Programme Amendment template and send it to Cleo and Sage by Friday. Once FAB signs off, I can file with MQA within 48 hours. We'll be well ahead of the December deadline. This is the strongest position we've been in for this self-review." },
        ],
        isFinal: true,
        synthesis: "Action Plan — GenAI Curriculum Update\n\n1. Dean approves TalentBank Joint Research Proposal (RM 180,000) — Sage to activate agreement this week.\n2. Cleo and TalentBank co-design GenAI Systems module spec — deadline: end of June.\n3. Rex sends MQA Programme Amendment template to Cleo and Sage by Friday.\n4. Cleo submits module to Faculty Academic Board — first July session.\n5. Dean also approves Grab proposal — 10 internship slots to serve as Semester 6 practicum.\n\nNext step for Dean: Approve both the TalentBank and Grab proposals to unblock all downstream actions.",
      },
    ],
  },

  {
    id: 'student-risk',
    title: 'What are our biggest student risks this semester?',
    desc: 'Aria, Cleo & Rex map the at-risk signals, root causes, and intervention plan.',
    agentIds: ['student-success', 'curriculum', 'accreditation'],
    acts: [
      {
        speeches: [
          { agentId: 'student-success', text: "I'm tracking 12 at-risk students this week — 7 for GPA drops, 3 for attendance below 70%, and 2 for mental health signals raised by lecturers. Three of those 12 need urgent follow-up: two missed their academic consultations and one was referred directly by their tutor. The highest-risk cohort is Year 2 BSc CS, particularly our international students." },
          { agentId: 'curriculum', text: "That pattern isn't random. Week 8 has 4 assessments and 1 exam colliding — that's a scheduling issue I've been flagging for two cycles. The Year 2 CS cohort has the highest assessment density in the faculty right now. I can raise this with the timetabling committee today." },
        ],
        prompts: [
          "Who exactly are the 3 urgent cases and what do they need?",
          "Is the Week 8 collision a recurring timetabling failure?",
          "What interventions have actually worked for international students?",
        ],
      },
      {
        speeches: [
          { agentId: 'student-success', text: "The three urgent cases: one Y2 CS student whose GPA dropped to 2.1 after missing two academic consultations — I'll contact their personal tutor directly today. One Y2 DS student with 58% attendance, referred by their lecturer. And one Y3 CS student with a mental health signal — I'm coordinating with the counselling team now." },
          { agentId: 'curriculum', text: "For context on the timetabling — yes, this is the third consecutive cycle where Week 8 spikes. I raised it with the previous programme chair but nothing changed. I'll draft a formal timetabling change request today. If we can move one assessment to Week 9, the collision drops significantly." },
          { agentId: 'accreditation', text: "I need to raise a documentation point. Student outcome and intervention records are required for MQA section 3.2 — Graduate and Student Support. Aria, can you ensure every intervention we initiate this week is formally logged? It's not just good practice — it's evidence we need." },
        ],
        prompts: [
          "What's the immediate action plan for the 3 urgent students?",
          "How do we get the timetabling change approved quickly?",
          "What does Cleo need from Aria for the timetabling case?",
        ],
      },
      {
        speeches: [
          { agentId: 'student-success', text: "Immediate plan: I'll contact the 3 urgent students within 24 hours. Personal tutor outreach for the GPA case, attendance meeting with the DS student's lecturer, and counselling referral confirmation for the third. I'll also assign peer tutors to the broader at-risk cohort from the support pool." },
          { agentId: 'curriculum', text: "For the timetabling case — Aria, I need the attendance and performance data for the last 3 cycles showing the Week 8 spike. That's the evidence the timetabling committee needs. Can you pull that from the student system today? I'll have the change request drafted by tomorrow." },
          { agentId: 'student-success', text: "I can pull that data today. I'll send you a breakdown by cohort and week. And yes Rex — every intervention will be logged in the student support system with timestamps, tutor notes, and outcomes. I'll ensure the format matches MQA's documentation requirements." },
        ],
        prompts: [
          "How do we prevent this pattern from repeating next semester?",
          "Should we flag the international student risk to the International Office?",
          "What early-warning system can we set up for next cycle?",
        ],
      },
      {
        speeches: [
          { agentId: 'curriculum', text: "Going forward — I'll propose a faculty-wide assessment calendar review for next semester. Each module coordinator must register assessment weeks by Week 2 to allow clash detection. I'll build this into the programme committee agenda for August." },
          { agentId: 'accreditation', text: "Document this incident formally — the Week 8 issue and our response. It can serve as evidence for QS Student Experience reporting and demonstrates continuous quality improvement for MQA. A problem identified and systematically resolved is actually a strong accreditation story." },
          { agentId: 'student-success', text: "Agreed. I'll also set an automated early-warning flag in the student tracking system — triggered at Week 5 when GPA or attendance drops below threshold. That gives us 3 weeks to intervene before Week 8 instead of reacting after the damage is done." },
        ],
        isFinal: true,
        synthesis: "Action Plan — Student Risk Response\n\n1. Aria contacts 3 urgent students within 24 hours — personal tutor outreach, attendance meeting, counselling confirmation.\n2. Aria sends 3-cycle attendance/performance data to Cleo by end of today.\n3. Cleo drafts timetabling change request (move one Week 8 assessment to Week 9) — submit to timetabling committee tomorrow.\n4. Rex documents this intervention cycle for MQA 3.2 — Aria to log all actions in MQA-compliant format.\n5. Cleo proposes faculty-wide assessment calendar for next semester at August programme committee.\n6. Aria implements Week 5 early-warning trigger in student tracking system.\n\nNext step for Dean: Endorse the timetabling change request so Cleo can escalate with Faculty authority.",
      },
    ],
  },

  {
    id: 'mqa-prep',
    title: 'Prepare for the MQA submission deadline',
    desc: 'Rex leads, with Nova, Cleo & Sage filling the evidence gaps.',
    agentIds: ['accreditation', 'alumni', 'curriculum', 'partnership'],
    acts: [
      {
        speeches: [
          { agentId: 'accreditation', text: "Current status: MQA BSc CS self-review is 62% ready, with 5 months to submission. Three evidence items are still missing: the External Examiner Report 2023/24, Student Outcome Summary 2024/25, and Industry Advisory Panel minutes from April. I sent a data request to Dr. Ahmad Razif 5 days ago. No response. This is becoming a timeline risk." },
          { agentId: 'alumni', text: "On the student outcomes side — I can close that gap immediately. My Q2 2026 alumni employment data was published this week: 84% employed within 6 months, RM 4,200 average starting salary, up 3% year on year. That covers MQA section 3.1 in full. I can have the formatted submission document to Rex today." },
        ],
        prompts: [
          "What's the fastest path to unblock the remaining 2 missing items?",
          "What happens if Dr. Ahmad doesn't respond this week?",
          "Which missing item is the highest risk to our overall score?",
        ],
      },
      {
        speeches: [
          { agentId: 'accreditation', text: "The highest-risk item is the External Examiner Report — that's a mandatory section with no substitute. If Dr. Ahmad doesn't respond by end of this week, I recommend escalating to the Dean for a direct instruction. The IAP minutes and Student Outcome Summary are recoverable. The Examiner Report is not." },
          { agentId: 'curriculum', text: "On the IAP minutes — I was at the April Industry Advisory Panel meeting. I took notes. I can draft a formal summary document from those notes today and get it reviewed by the other attendees this week. It won't be the official minutes, but a properly structured summary with signatures should satisfy MQA's requirement." },
          { agentId: 'accreditation', text: "Cleo, that works. MQA accepts documented meeting summaries when official minutes haven't been circulated, provided they're signed by at least two attendees. I'll send you the required format now. That unblocks one of the three items immediately." },
        ],
        prompts: [
          "Can Sage's industry partners substitute for IAP input on the third item?",
          "Should we request a deadline extension from MQA?",
          "Escalate Dr. Ahmad to the Dean this week?",
        ],
      },
      {
        speeches: [
          { agentId: 'partnership', text: "I can help on the industry advisory angle. Google, Grab, and TalentBank have all offered written employer feedback on graduate quality this quarter. That documented employer input could serve as supplementary Industry Advisory evidence — especially since we facilitated those conversations through formal partnership channels." },
          { agentId: 'accreditation', text: "Sage, MQA does accept documented employer feedback as supplementary IAP evidence, provided it's formatted correctly. I'll send you a template — the letters need to reference specific graduate competencies and programme outcomes. If you can get two letters in that format, combined with Cleo's meeting summary, we have a strong IAP section." },
          { agentId: 'alumni', text: "I can add weight to that. Our alumni survey includes specific employer quotes about graduate readiness — from Google and Grab hiring managers. Rex, I can extract those into the correct format today. That gives you employer voices from three companies, not two." },
        ],
        prompts: [
          "Confirm this approach — IAP summary from Cleo + employer letters from Sage + quotes from Nova?",
          "What's the exact timeline to get all this to Rex for filing?",
          "What does the Dean need to sign off on before submission?",
        ],
      },
      {
        speeches: [
          { agentId: 'accreditation', text: "Confirmed. Here is the timeline: Nova sends alumni employment data and employer quotes today. Cleo sends IAP summary draft by Wednesday, I'll get attendee signatures by Friday. Sage delivers employer feedback letters — formatted to my template — by next Monday. I file the complete submission package by end of next week. We have 4.5 months remaining. We will make this." },
          { agentId: 'curriculum', text: "Noted. IAP summary will be on your desk by Wednesday, Rex. I'll also flag to the timetabling committee that any curriculum changes going into the submission must be documented through you — so nothing slips through as an undeclared amendment." },
          { agentId: 'partnership', text: "Employer letters will be in Rex's format by Monday. I'll reach out to Google, Grab, and TalentBank contacts today. And if Dr. Ahmad still hasn't responded — I recommend the Dean sends a direct message. A 5-day delay on a mandatory MQA item is not acceptable." },
        ],
        isFinal: true,
        synthesis: "Action Plan — MQA Submission\n\n1. Nova sends alumni employment data (MQA 3.1) and employer quotes to Rex — today.\n2. Cleo drafts IAP meeting summary from April notes — deliver to Rex by Wednesday.\n3. Sage requests formatted employer feedback letters from Google, Grab, TalentBank — deliver to Rex by Monday.\n4. Dean sends direct instruction to Dr. Ahmad Razif for External Examiner Report — this week.\n5. Rex compiles complete evidence package and files by end of next week.\n6. All curriculum changes flagged through Rex before submission window closes.\n\nNext step for Dean: Send direct instruction to Dr. Ahmad and confirm sign-off authority for the final submission package.",
      },
    ],
  },

  {
    id: 'partnership-opportunities',
    title: 'Find partnership opportunities for new modules',
    desc: 'Sage, Cleo, Nova & Rex explore co-design, internships, and MQA value.',
    agentIds: ['partnership', 'curriculum', 'alumni', 'accreditation'],
    acts: [
      {
        speeches: [
          { agentId: 'partnership', text: "Here's where we stand. Two proposals have been on the Dean's desk for 2 weeks awaiting sign-off: TalentBank's RM 180,000 joint AI research programme and Grab's offer of 10 paid internship slots per semester plus Advisory Panel membership. Beyond that, 3 of our active partners offered curriculum advisory input — and we haven't scheduled a single session in 6 weeks." },
          { agentId: 'curriculum', text: "Those 3 advisory sessions — I've been trying to schedule them myself. Every time there's a diary conflict or no clear owner. We're leaving expert input on the table that would directly improve module relevance. I need someone to coordinate this, not just send calendar invites." },
        ],
        prompts: [
          "Which proposal should we prioritise — TalentBank or Grab?",
          "What do our industry partners actually want from co-design?",
          "Who should own the advisory session coordination going forward?",
        ],
      },
      {
        speeches: [
          { agentId: 'partnership', text: "TalentBank is the higher strategic value. Their proposal specifically covers AI-driven graduate readiness — that's not a coincidence, they've been following our curriculum gap discussions. RM 180,000 funds a dedicated joint research programme, and they want to co-design curriculum, not just observe. This is a genuine partnership, not a sponsorship." },
          { agentId: 'curriculum', text: "That maps directly to our most critical gap. Co-designing the GenAI module with TalentBank gives me industry-validated content, faster development, and a named industry partner on the module descriptor. Students will trust content that Google and TalentBank helped design far more than content we developed in isolation." },
          { agentId: 'accreditation', text: "And I'll add the accreditation angle — industry co-design is explicitly mentioned as quality evidence in MQA criteria. If TalentBank is formally listed as a co-developer of the GenAI module, that's a significant strength in our self-review. It turns a curriculum update into an accreditation asset." },
        ],
        prompts: [
          "Approve TalentBank proposal now — what needs to happen?",
          "What exactly does TalentBank get from this arrangement?",
          "How do we structure the co-design process so it doesn't delay Cleo's timeline?",
        ],
      },
      {
        speeches: [
          { agentId: 'partnership', text: "The Grab proposal is equally strategic but different in nature. Ten paid internship slots per semester in Grab's AI and data teams — our best-performing placement channel. Last quarter's Grab cohort had a 25% conversion to full-time offers. No other partner comes close to that number." },
          { agentId: 'alumni', text: "I track that conversion data closely. The 25% full-time hire rate from Grab is our highest of any partner, and it's been consistent for 3 quarters. Students who did Grab placements also report the highest skill satisfaction in our follow-up surveys. The internship is actively closing the GenAI gap for those who get it." },
          { agentId: 'curriculum', text: "Here's the alignment opportunity: if we approve both proposals together, we can sequence them. Students take the new GenAI Systems module in Semester 5. Those who complete it with distinction get priority consideration for the Grab AI internship in Semester 6. The module becomes a pipeline, not just a course." },
        ],
        prompts: [
          "Approve both proposals at the same time?",
          "How do we handle students who don't get a Grab slot fairly?",
          "Which other partners should we activate in the next quarter?",
        ],
      },
      {
        speeches: [
          { agentId: 'partnership', text: "If the Dean approves both today, I can activate TalentBank's agreement and schedule the first co-design workshop this week. Grab's internship slots can be confirmed for next semester's intake. And I'll also take ownership of the 3 pending advisory sessions — I'll have them scheduled within 2 weeks." },
          { agentId: 'accreditation', text: "I'll need documentation for both partnerships — formal MOU or signed agreement for TalentBank, and written confirmation from Grab. Both can be referenced in the MQA evidence pack under industry engagement. Sage, can you ensure the TalentBank agreement references curriculum co-design explicitly? That's the language MQA looks for." },
          { agentId: 'alumni', text: "Once the partnerships are active, I'll set up a tracking mechanism for graduate outcomes from both — placement rates, offer conversion, salary, and skill feedback. That data feeds directly back into the next module review cycle and strengthens the case for expanding the partnership portfolio." },
        ],
        isFinal: true,
        synthesis: "Action Plan — Partnership Activation\n\n1. Dean approves TalentBank Joint Research Proposal (RM 180,000) — Sage activates agreement and schedules co-design workshop this week.\n2. Dean approves Grab Advisory Panel + Internship Proposal (10 slots/semester) — Sage confirms intake for next semester.\n3. TalentBank agreement must reference curriculum co-design explicitly for MQA compliance — Rex to review wording.\n4. Sage schedules 3 pending advisory sessions within 2 weeks and takes ownership of partner calendar.\n5. Cleo aligns GenAI Systems module timeline with TalentBank co-design — Semester 5 delivery target.\n6. Nova sets up outcome tracking for Grab and TalentBank placements from Day 1.\n\nNext step for Dean: Sign off on both proposals today to unblock the co-design timeline and secure Semester 6 internship slots.",
      },
    ],
  },
]

// ─── Typewriter hook ──────────────────────────────────────────────────────────
function useTypewriter(text, active, speedMs = 16) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  useEffect(() => {
    if (!active || !text) return
    setDisplayed('')
    setDone(false)
    let i = 0
    const id = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) { clearInterval(id); setDone(true) }
    }, speedMs)
    return () => clearInterval(id)
  }, [text, active, speedMs])
  return { displayed, done }
}

// ─── Agent speech bubble ──────────────────────────────────────────────────────
function AgentBubble({ agentId, text, active, onDone }) {
  const agent = AGENT_MAP[agentId]
  const { displayed, done } = useTypewriter(text, active)
  useEffect(() => { if (done) onDone?.() }, [done])
  return (
    <div className={`flex gap-3 transition-opacity duration-300 ${active || done ? 'opacity-100' : 'opacity-0'}`}>
      <div className="mt-1 h-9 w-9 shrink-0 overflow-hidden rounded-full border-2 border-white bg-[#EEF2FB] shadow-md">
        <img src={agent?.image} alt="" className="h-full w-full object-contain" />
      </div>
      <div className="flex-1">
        <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-[#8A96B3]">
          {agent?.agentName?.split('—')[0].trim()}
          <span className="ml-1.5 font-medium normal-case text-[#415174]">· {agent?.name}</span>
        </p>
        <div className="rounded-2xl rounded-tl-sm bg-white/90 px-4 py-3 text-sm font-medium leading-relaxed text-[#1B2545] shadow-sm">
          {displayed}
          {active && !done && <span className="ml-0.5 inline-block h-3.5 w-0.5 animate-pulse bg-[#155EE8]" />}
        </div>
      </div>
    </div>
  )
}

// ─── User message bubble ──────────────────────────────────────────────────────
function UserBubble({ text }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[75%] rounded-2xl rounded-tr-sm bg-[#155EE8] px-4 py-3 text-sm font-medium leading-relaxed text-white shadow-sm">
        {text}
      </div>
    </div>
  )
}

// ─── System banner ────────────────────────────────────────────────────────────
function SystemBanner({ text }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-center">
      <p className="text-xs font-semibold text-[#8A96B3]">{text}</p>
    </div>
  )
}

// ─── Synthesis card ───────────────────────────────────────────────────────────
function SynthesisCard({ text, active, onDone }) {
  const { displayed, done } = useTypewriter(text, active, 12)
  useEffect(() => { if (done) onDone?.() }, [done])
  return (
    <div className={`rounded-2xl border border-[#155EE8]/30 bg-gradient-to-br from-blue-50 to-indigo-50 p-5 shadow-md transition-opacity duration-500 ${active || done ? 'opacity-100' : 'opacity-0'}`}>
      <div className="mb-3 flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-[#155EE8]" />
        <p className="text-xs font-bold uppercase tracking-widest text-[#155EE8]">Decision Room — Action Plan</p>
      </div>
      <p className="whitespace-pre-wrap text-sm font-medium leading-relaxed text-[#1B2545]">
        {displayed}
        {active && !done && <span className="ml-0.5 inline-block h-3.5 w-0.5 animate-pulse bg-[#155EE8]" />}
      </p>
    </div>
  )
}

// ─── Topic selector card ──────────────────────────────────────────────────────
function TopicCard({ script, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(script)}
      className="group w-full rounded-2xl border border-white/10 bg-white/5 p-5 text-left transition hover:border-[#155EE8]/40 hover:bg-white/10"
    >
      <p className="text-sm font-bold text-white group-hover:text-[#93B4FF]">{script.title}</p>
      <p className="mt-1.5 text-xs font-medium text-[#50607E]">{script.desc}</p>
      <div className="mt-3 flex items-center gap-2">
        <Users className="h-3 w-3 text-[#415174]" />
        <div className="flex gap-1.5">
          {script.agentIds.map((id) => (
            <div key={id} className="h-5 w-5 overflow-hidden rounded-full border border-white/20 bg-[#1B2A50]">
              <img src={AGENT_MAP[id]?.image} alt="" className="h-full w-full object-contain" />
            </div>
          ))}
        </div>
      </div>
    </button>
  )
}

// ─── Modal ────────────────────────────────────────────────────────────────────
export default function DecisionRoomModal({ onClose }) {
  const [phase, setPhase] = useState('select') // select | meeting | done
  const [script, setScript] = useState(null)
  const [actIdx, setActIdx] = useState(0)
  const [log, setLog] = useState([])          // {id, type, agentId?, text}
  const [activeId, setActiveId] = useState(null)
  const [showPrompts, setShowPrompts] = useState(false)
  const [synthesis, setSynthesis] = useState('')
  const [synthActive, setSynthActive] = useState(false)
  const [synthDone, setSynthDone] = useState(false)
  const [meetingHistory, setMeetingHistory] = useState([])
  const [viewingMinutes, setViewingMinutes] = useState(null) // null | historyItem

  const pendingQueue = useRef([])
  const isFinalRef = useRef(false)
  const bottomRef = useRef(null)

  const buildMinutes = (sc, meetingLog, synthText) => {
    const contributions = meetingLog
      .filter((m) => m.type === 'agent')
      .reduce((acc, m) => {
        if (!acc[m.agentId]) acc[m.agentId] = []
        acc[m.agentId].push(m.text)
        return acc
      }, {})
    return {
      id: `meeting-${Date.now()}`,
      title: sc.title,
      agentIds: sc.agentIds,
      timestamp: new Date().toLocaleString('en-MY', { dateStyle: 'medium', timeStyle: 'short' }),
      contributions, // { agentId: [text, ...] }
      actionPlan: synthText,
      fullLog: meetingLog,
    }
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [log, showPrompts, synthActive])

  const showNextPending = useCallback(() => {
    const next = pendingQueue.current.shift()
    if (!next) return
    const id = `speech-${Date.now()}-${Math.random()}`
    setLog((prev) => [...prev, { id, type: 'agent', agentId: next.agentId, text: next.text }])
    setActiveId(id)
  }, [])

  const handleSpeechDone = useCallback(() => {
    setActiveId(null)
    if (pendingQueue.current.length > 0) {
      setTimeout(showNextPending, 700)
    } else if (isFinalRef.current) {
      setTimeout(() => setSynthActive(true), 800)
    } else {
      setShowPrompts(true)
    }
  }, [showNextPending])

  const startAct = useCallback((act) => {
    isFinalRef.current = !!act.isFinal
    pendingQueue.current = [...act.speeches]
    setTimeout(showNextPending, 500)
  }, [showNextPending])

  const selectTopic = (sc) => {
    setScript(sc)
    setActIdx(0)
    setLog([{ id: 'sys-0', type: 'system', text: `Meeting opened: "${sc.title}" · ${sc.agentIds.length} department heads invited` }])
    setPhase('meeting')
    isFinalRef.current = false
    pendingQueue.current = [...sc.acts[0].speeches]
    setTimeout(showNextPending, 600)
  }

  const handleUserPick = (prompt) => {
    setShowPrompts(false)
    setLog((prev) => [...prev, { id: `user-${Date.now()}`, type: 'user', text: prompt }])
    const nextIdx = actIdx + 1
    setActIdx(nextIdx)
    const nextAct = script.acts[nextIdx]
    if (nextAct) startAct(nextAct)
  }

  const handleSynthDone = () => {
    setSynthDone(true)
    setPhase('done')
    // Save to history
    const synthText = script?.acts[script.acts.length - 1].synthesis ?? ''
    const record = buildMinutes(script, log, synthText)
    setMeetingHistory((prev) => [record, ...prev])
  }

  const reset = () => {
    setPhase('select')
    setScript(null)
    setActIdx(0)
    setLog([])
    setActiveId(null)
    setShowPrompts(false)
    setSynthActive(false)
    setSynthDone(false)
    setViewingMinutes(null)
    pendingQueue.current = []
    isFinalRef.current = false
  }

  // Get current speaker for roster status
  const getSpeakerStatus = (agentId) => {
    if (!script) return 'waiting'
    const activeMsg = log.find((m) => m.id === activeId)
    if (activeMsg?.agentId === agentId) return 'speaking'
    if (log.some((m) => m.type === 'agent' && m.agentId === agentId && m.id !== activeId)) return 'done'
    return 'waiting'
  }

  return (
    <div className="fixed inset-0 z-50 flex items-stretch bg-[#0d1524]/80 backdrop-blur-sm">
      <div className="relative flex w-full flex-col overflow-hidden" style={{ animation: 'fadeUp 0.25s cubic-bezier(0.22,1,0.36,1)' }}>

        {/* Top bar */}
        <div className="flex shrink-0 items-center gap-4 border-b border-white/10 bg-[#111B3F] px-8 py-4">
          <div className="h-10 w-10 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-[#1B2A50]">
            <img src={imgDecisionRoom} alt="" className="h-full w-full object-contain" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-sm font-bold text-white">Central Decision Room</h2>
            <p className="text-xs font-medium text-[#8A96B3]">
              {phase === 'select' ? 'Choose a topic to open the meeting.' : script?.title}
            </p>
          </div>
          <button type="button" onClick={onClose} className="rounded-full p-2 text-white/50 transition hover:bg-white/10 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex min-h-0 flex-1 overflow-hidden">

          {/* Left — history rail + live participants */}
          <div className="flex w-72 shrink-0 flex-col border-r border-white/10 bg-[#0F1830]">

            {/* New meeting button */}
            <div className="shrink-0 border-b border-white/10 p-4">
              <button type="button" onClick={reset}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#155EE8]/20 px-4 py-2.5 text-xs font-bold text-[#93B4FF] transition hover:bg-[#155EE8]/30">
                <MessageSquarePlus className="h-3.5 w-3.5" /> New meeting
              </button>
            </div>

            {/* Live participants — only during active meeting */}
            {(phase === 'meeting' || (phase === 'done' && !synthDone)) && (
              <div className="shrink-0 border-b border-white/10 px-4 py-4">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[#8A96B3]">Live Participants</p>
                <div className="space-y-1.5">
                  {AGENTS.map((agent) => {
                    const isActive = script?.agentIds.includes(agent.id)
                    const status = isActive ? getSpeakerStatus(agent.id) : 'observing'
                    return (
                      <div key={agent.id} className={`flex items-center gap-2.5 rounded-xl px-3 py-2 ${isActive ? 'bg-white/5' : 'bg-white/[0.02] opacity-60'}`}>
                        <div className="h-7 w-7 shrink-0 overflow-hidden rounded-full border border-white/10 bg-[#1B2A50]">
                          <img src={agent?.image} alt="" className="h-full w-full object-contain" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[11px] font-semibold text-white/80">{agent?.agentName?.split('—')[0].trim()}</p>
                          <p className="truncate text-[9px] font-medium text-[#415174]">{isActive ? agent?.name : 'Observing'}</p>
                        </div>
                        <span className={`text-[9px] font-bold ${status === 'speaking' ? 'text-emerald-400' : status === 'done' ? 'text-blue-400' : status === 'observing' ? 'text-[#2A3A5E]' : 'text-[#415174]'}`}>
                          {status === 'speaking' ? '●' : status === 'done' ? '✓' : '○'}
                        </span>
                      </div>
                    )
                  })}
                  <div className="flex items-center gap-2.5 rounded-xl bg-[#155EE8]/10 px-3 py-2">
                    <div className="h-7 w-7 shrink-0 overflow-hidden rounded-full border border-[#155EE8]/30 bg-[#1B2A50]">
                      <img src={imgDecisionRoom} alt="" className="h-full w-full object-contain" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[11px] font-semibold text-white/80">Decision Room</p>
                      <p className="text-[9px] font-medium text-[#415174]">Moderating</p>
                    </div>
                    <span className={`text-[9px] font-bold ${synthActive && !synthDone ? 'text-emerald-400' : 'text-[#415174]'}`}>
                      {synthActive && !synthDone ? '●' : '○'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Meeting history */}
            <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 py-4">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[#8A96B3]">Meeting History</p>
              {meetingHistory.length === 0 ? (
                <p className="text-[11px] font-medium text-[#415174]">No past meetings yet. Complete a meeting to see it here.</p>
              ) : (
                <div className="space-y-1.5">
                  {meetingHistory.map((m) => (
                    <button key={m.id} type="button"
                      onClick={() => setViewingMinutes(m)}
                      className={`w-full rounded-xl px-3 py-2.5 text-left transition ${viewingMinutes?.id === m.id ? 'bg-[#155EE8]/20 ring-1 ring-[#155EE8]/40' : 'bg-white/5 hover:bg-white/10'}`}>
                      <p className="truncate text-[11px] font-bold text-white/80">{m.title}</p>
                      <div className="mt-1 flex items-center gap-1.5">
                        <Clock className="h-2.5 w-2.5 text-[#415174]" />
                        <p className="text-[9px] font-medium text-[#415174]">{m.timestamp}</p>
                      </div>
                      <div className="mt-1.5 flex gap-1">
                        {m.agentIds.map((id) => (
                          <div key={id} className="h-4 w-4 overflow-hidden rounded-full border border-white/10 bg-[#1B2A50]">
                            <img src={AGENT_MAP[id]?.image} alt="" className="h-full w-full object-contain" />
                          </div>
                        ))}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right — topic select or transcript */}
          <div className="flex min-w-0 flex-1 flex-col bg-[#0d1524]">

            {/* Meeting minutes view */}
            {viewingMinutes && phase === 'select' && (
              <div className="flex flex-1 flex-col overflow-hidden">
                <div className="flex-1 overflow-y-auto px-10 py-8 space-y-6">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <FileText className="h-4 w-4 text-[#155EE8]" />
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#415174]">Meeting Minutes</p>
                      </div>
                      <h3 className="text-base font-bold text-white">{viewingMinutes.title}</h3>
                      <p className="mt-1 text-xs text-[#415174]">{viewingMinutes.timestamp}</p>
                    </div>
                    <button type="button" onClick={() => setViewingMinutes(null)}
                      className="shrink-0 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/60 hover:bg-white/10">
                      ← Back to topics
                    </button>
                  </div>

                  {/* Attendees */}
                  <div className="rounded-xl border border-white/10 bg-white/5 px-5 py-4">
                    <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-[#8A96B3]">Attendees</p>
                    <div className="flex flex-wrap gap-3">
                      {viewingMinutes.agentIds.map((id) => {
                        const a = AGENT_MAP[id]
                        return (
                          <div key={id} className="flex items-center gap-2">
                            <div className="h-7 w-7 overflow-hidden rounded-full border border-white/10 bg-[#1B2A50]">
                              <img src={a?.image} alt="" className="h-full w-full object-contain" />
                            </div>
                            <div>
                              <p className="text-[11px] font-bold text-white/80">{a?.agentName?.split('—')[0].trim()}</p>
                              <p className="text-[9px] text-[#415174]">{a?.name}</p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Discussion summary per agent */}
                  <div>
                    <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-[#8A96B3]">Discussion Summary</p>
                    <div className="space-y-4">
                      {viewingMinutes.agentIds.map((id) => {
                        const a = AGENT_MAP[id]
                        const points = viewingMinutes.contributions[id] ?? []
                        if (!points.length) return null
                        return (
                          <div key={id} className="rounded-xl border border-white/10 bg-white/5 px-5 py-4">
                            <div className="mb-3 flex items-center gap-2">
                              <div className="h-6 w-6 overflow-hidden rounded-full border border-white/10 bg-[#1B2A50]">
                                <img src={a?.image} alt="" className="h-full w-full object-contain" />
                              </div>
                              <p className="text-[11px] font-bold text-white/80">
                                {a?.agentName?.split('—')[0].trim()}
                                <span className="ml-1.5 font-medium text-[#415174]">· {a?.name}</span>
                              </p>
                            </div>
                            <ul className="space-y-2">
                              {points.map((pt, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="mt-[5px] h-1 w-1 shrink-0 rounded-full bg-[#415174]" />
                                  <p className="text-[11px] font-medium leading-relaxed text-[#8A96B3]">
                                    {pt.length > 180 ? pt.slice(0, 180) + '…' : pt}
                                  </p>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Action plan */}
                  <div className="rounded-xl border border-[#155EE8]/30 bg-[#155EE8]/10 px-5 py-4">
                    <div className="mb-3 flex items-center gap-2">
                      <Sparkles className="h-3.5 w-3.5 text-[#155EE8]" />
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[#155EE8]">Action Plan</p>
                    </div>
                    <p className="whitespace-pre-wrap text-[11px] font-medium leading-relaxed text-[#8A96B3]">{viewingMinutes.actionPlan}</p>
                  </div>
                </div>

                {/* Footer */}
                <div className="shrink-0 flex items-center justify-end gap-3 border-t border-white/10 bg-[#0F1830] px-8 py-4">
                  <button type="button"
                    onClick={() => navigator.clipboard.writeText(
                      `Meeting Minutes: ${viewingMinutes.title}\n${viewingMinutes.timestamp}\n\nAttendees: ${viewingMinutes.agentIds.map(id => AGENT_MAP[id]?.agentName?.split('—')[0].trim()).join(', ')}\n\nDiscussion:\n${viewingMinutes.agentIds.flatMap(id => (viewingMinutes.contributions[id] ?? []).map(t => `${AGENT_MAP[id]?.agentName?.split('—')[0].trim()}: ${t}`)).join('\n\n')}\n\nAction Plan:\n${viewingMinutes.actionPlan}`
                    )}
                    className="flex items-center gap-2 rounded-xl bg-[#155EE8] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#124FC4]">
                    Copy minutes <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Topic selection */}
            {phase === 'select' && !viewingMinutes && (
              <div className="flex flex-1 flex-col justify-center gap-4 px-10 py-8">
                <div className="mb-2">
                  <h3 className="text-lg font-bold text-white">What would you like to discuss today?</h3>
                  <p className="mt-1 text-sm font-medium text-[#50607E]">
                    Each topic runs a live department discussion. Agents will surface real data, challenge each other, and ask for your input before reaching a plan.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {SCRIPTS.map((sc) => <TopicCard key={sc.id} script={sc} onSelect={selectTopic} />)}
                </div>
              </div>
            )}

            {/* Meeting transcript */}
            {(phase === 'meeting' || phase === 'done') && (
              <div className="flex flex-1 flex-col overflow-hidden">
                <div className="flex-1 space-y-5 overflow-y-auto px-8 py-6">
                  {log.map((entry) => {
                    if (entry.type === 'system') return <SystemBanner key={entry.id} text={entry.text} />
                    if (entry.type === 'user') return <UserBubble key={entry.id} text={entry.text} />
                    return (
                      <AgentBubble
                        key={entry.id}
                        agentId={entry.agentId}
                        text={entry.text}
                        active={entry.id === activeId}
                        onDone={entry.id === activeId ? handleSpeechDone : undefined}
                      />
                    )
                  })}

                  {/* Synthesis */}
                  {(synthActive || synthDone) && (
                    <SynthesisCard
                      text={script?.acts[script.acts.length - 1].synthesis}
                      active={synthActive && !synthDone}
                      onDone={handleSynthDone}
                    />
                  )}

                  <div ref={bottomRef} />
                </div>

                {/* User prompt chips — shown between acts */}
                {showPrompts && !synthActive && (
                  <div className="shrink-0 border-t border-white/10 bg-[#0F1830] px-8 py-5">
                    <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-[#8A96B3]">
                      Your move — steer the discussion
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {script?.acts[actIdx]?.prompts.map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => handleUserPick(p)}
                          className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-left text-xs font-semibold text-white/80 transition hover:border-[#155EE8]/50 hover:bg-[#155EE8]/15 hover:text-white"
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Done state — copy + new */}
                {phase === 'done' && (
                  <div className="shrink-0 flex items-center justify-end gap-3 border-t border-white/10 bg-[#0F1830] px-8 py-4">
                    <button type="button" onClick={reset}
                      className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/70 transition hover:bg-white/10">
                      New topic
                    </button>
                    <button type="button"
                      onClick={() => navigator.clipboard.writeText(
                        log.filter(m => m.type !== 'system').map(m =>
                          m.type === 'user' ? `Dean: ${m.text}` : `${AGENT_MAP[m.agentId]?.agentName?.split('—')[0].trim()}: ${m.text}`
                        ).join('\n\n') + '\n\nAction Plan:\n' + script?.acts[script.acts.length - 1].synthesis
                      )}
                      className="flex items-center gap-2 rounded-xl bg-[#155EE8] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#124FC4]">
                      Copy action plan <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
