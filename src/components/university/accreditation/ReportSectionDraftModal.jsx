import React, { useState } from 'react'
import { Download, Copy, AlertTriangle, CheckCircle2, ChevronDown } from 'lucide-react'
import EmployerModal from '../../employer/EmployerModal'

const SECTION_DRAFT = {
  title: 'Section 3: Programme Design and Delivery',
  completeness: 72,
  missingCount: 3,
  subsections: [
    {
      id: '3.1',
      heading: '3.1 Programme Educational Objectives',
      complete: true,
      content: `The BSc (Hons) Computer Science programme at Heriot-Watt University Malaysia is designed to produce graduates who are technically proficient, ethically grounded, and immediately productive in computing and digital technology roles. The programme's educational objectives are aligned to MQF Level 6 competencies and have been validated through two consecutive industry advisory panel consultations in Academic Years 2022/23 and 2023/24.

Graduates are expected to demonstrate: (1) systematic understanding of fundamental computer science principles including algorithms, data structures, systems programming, and software engineering; (2) ability to design, implement, and evaluate software solutions for real-world problems; and (3) professional competencies including communication, teamwork, and ethical decision-making in technology contexts. These objectives are reviewed annually through the Programme Outcomes Assessment (POA) process and benchmarked against graduate employment outcomes.`,
      evidence: [
        'Programme Specification Document v4.2 (2024)',
        'Industry Advisory Panel — Meeting Minutes, April 2024',
        'MQF Level 6 Competency Mapping Matrix (attached)',
      ],
    },
    {
      id: '3.2',
      heading: '3.2 Curriculum Structure and Content',
      complete: true,
      content: `The programme is structured across six semesters totalling 120 credit hours, delivered over three academic years. The curriculum is organised into four disciplinary pillars: Foundations of Computing (30 credits), Software Engineering and Systems (30 credits), Data and Intelligent Systems (24 credits), and Professional and Elective Studies (36 credits including a 6-credit final year project).

Curriculum content is reviewed annually by the Programme Curriculum Committee against three external benchmarks: (1) ACM/IEEE Computing Curricula Guidelines, (2) industry skill demand signals collected through the CareerOS Curriculum-Market Alignment module, and (3) employer advisory feedback. The most recent curriculum review in January 2025 resulted in the introduction of two new elective modules — Generative AI Systems and Cloud-Native Development — in response to identified market demand gaps. All curriculum changes are approved through the Faculty Academic Board before implementation.`,
      evidence: [
        'Curriculum Map 2024/25 (attached)',
        'Curriculum Review Report, January 2025',
        'ACM/IEEE Computing Curricula Mapping Table',
        'CareerOS Market Demand Analysis — Computing, July 2025',
      ],
    },
    {
      id: '3.3',
      heading: '3.3 Assessment and Student Attainment',
      complete: false,
      placeholder: true,
      content: `The programme employs a diverse assessment strategy designed to evaluate student attainment of all Programme Learning Outcomes (PLOs). Assessment types include: individual coursework assignments, group projects, laboratory practicals, presentations, and end-of-semester examinations.

[PLACEHOLDER — External Examiner Reports for 2023/24 required to complete this section. Contact Ms. Kavitha Subramaniam to obtain the reports.]

Assessment standards are maintained through: (1) moderation of examination papers and coursework briefs by qualified internal moderators, (2) double-marking of final year projects, and (3) external examination by an appointed External Examiner.

[PLACEHOLDER — Student assessment outcome data for 2024/25 cohort required. Current data covers 2022/23 and 2023/24 only.]

Industry Advisory Panel feedback on graduate preparedness and employer satisfaction scores are incorporated into the annual programme review, with the most recent review completed in [PLACEHOLDER — date required after assessment outcome data is received].`,
      evidence: [
        'Assessment Strategy Document v2.1',
        'External Examiner Report 2022/23 ✓',
        '⚠ External Examiner Report 2023/24 — MISSING',
        '⚠ Student Outcome Summary 2024/25 — MISSING',
      ],
    },
  ],
}

function SubsectionBlock({ sub, index, expanded, onToggle, onChange }) {
  return (
    <div className={`rounded-xl border ${sub.placeholder ? 'border-amber-200 bg-amber-50/30' : 'border-[#E4EAF5] bg-white'} overflow-hidden`}>
      <button
        type="button"
        onClick={() => onToggle(sub.id)}
        className="flex w-full items-center gap-3 px-5 py-4 text-left"
      >
        <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${sub.complete ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
          {sub.id}
        </span>
        <span className="min-w-0 flex-1 text-sm font-bold text-[#182243]">{sub.heading}</span>
        {sub.placeholder ? (
          <span className="flex items-center gap-1 rounded-md border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700">
            <AlertTriangle className="h-3 w-3" />
            2 items missing
          </span>
        ) : (
          <span className="flex items-center gap-1 rounded-md border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
            <CheckCircle2 className="h-3 w-3" />
            Complete
          </span>
        )}
        <ChevronDown className={`h-4 w-4 shrink-0 text-[#73809E] transition-transform ${expanded ? 'rotate-180' : ''}`} />
      </button>

      {expanded && (
        <div className="border-t border-[#E4EAF5] px-5 pb-5 pt-4">
          <textarea
            className={`h-48 w-full resize-none rounded-lg border p-3 text-sm leading-6 text-[#1B2545] focus:outline-none focus:ring-2 focus:ring-[#155EE8]/25 ${
              sub.placeholder
                ? 'border-amber-200 bg-amber-50/20 font-mono'
                : 'border-[#D8E0F0] bg-white/80 font-normal'
            }`}
            defaultValue={sub.content}
            onChange={(e) => onChange(sub.id, e.target.value)}
          />
          {sub.placeholder && (
            <p className="mt-1.5 text-xs font-semibold text-amber-700">
              Items in [PLACEHOLDER — …] must be replaced with real content before submission.
            </p>
          )}
          <div className="mt-4">
            <p className="mb-2 text-xs font-bold text-[#415174]">Evidence referenced in this section:</p>
            <ul className="space-y-1">
              {sub.evidence.map((e) => (
                <li key={e} className={`flex items-start gap-2 text-xs font-medium ${e.startsWith('⚠') ? 'text-amber-700' : 'text-[#50607E]'}`}>
                  {e.startsWith('⚠') ? (
                    <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500" />
                  ) : (
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                  )}
                  {e.replace(/^[⚠✓] /, '')}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default function ReportSectionDraftModal({ frameworkTitle, onClose, onToast }) {
  const [expandedId, setExpandedId] = useState('3.1')
  const handleToggle = (id) => setExpandedId((p) => (p === id ? null : id))

  const handleDownload = () => {
    onToast('Preparing download… (mock — .docx download would be triggered here)')
  }

  const handleCopy = () => {
    const text = SECTION_DRAFT.subsections.map((s) => `${s.heading}\n\n${s.content}`).join('\n\n---\n\n')
    navigator.clipboard.writeText(text).then(
      () => onToast('Draft copied to clipboard'),
      () => onToast('Copy failed — please select and copy manually'),
    )
  }

  const displayTitle = frameworkTitle ?? 'MQA Report Draft — BSc Computer Science'

  return (
    <EmployerModal
      title={displayTitle}
      subtitle="Section generated from your evidence library · Review and edit before submission"
      maxWidth="max-w-4xl"
      onClose={onClose}
      footer={
        <div className="flex w-full items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-48 overflow-hidden rounded-full bg-[#E4EAF5]">
              <div className="h-full rounded-full bg-[#155EE8]" style={{ width: `${SECTION_DRAFT.completeness}%` }} />
            </div>
            <span className="text-sm font-bold text-[#26304D]">{SECTION_DRAFT.completeness}%</span>
            <span className="text-sm font-medium text-[#73809E]">
              of this section can be generated now ·{' '}
              <span className="font-semibold text-amber-700">{SECTION_DRAFT.missingCount} items need to be collected first</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-2 rounded-lg border border-[#CBD7EA] bg-white px-5 py-2 text-sm font-semibold text-[#26304D] hover:bg-gray-50"
            >
              <Copy className="h-4 w-4" />
              Copy to clipboard
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className="flex items-center gap-2 rounded-lg bg-[#155EE8] px-5 py-2 text-sm font-bold text-white shadow-sm hover:bg-[#124FC4]"
            >
              <Download className="h-4 w-4" />
              Download draft (.docx)
            </button>
          </div>
        </div>
      }
    >
      <div className="p-6">
        {/* Document header */}
        <div className="mb-5 rounded-xl border border-[#DCE5F4] bg-[#F4F6FB] px-6 py-4">
          <p className="text-xs font-bold uppercase tracking-widest text-[#8A96B3]">MQA Self-Review Report</p>
          <h3 className="mt-1 text-lg font-bold text-[#111B3F]">{SECTION_DRAFT.title}</h3>
          <p className="mt-0.5 text-sm font-medium text-[#73809E]">BSc (Hons) Computer Science · Heriot-Watt University Malaysia · Academic Year 2024/25</p>
        </div>

        {/* Subsection accordions */}
        <div className="space-y-3">
          {SECTION_DRAFT.subsections.map((sub) => (
            <SubsectionBlock
              key={sub.id}
              sub={sub}
              expanded={expandedId === sub.id}
              onToggle={handleToggle}
              onChange={() => {}}
            />
          ))}
        </div>

        <p className="mt-5 text-[11px] font-medium text-[#8A96B3]">
          This draft was generated by CareerOS AI from your linked evidence library. Review all content before including in your official MQA submission.
          Content in [PLACEHOLDER] blocks must be replaced with verified data.
        </p>
      </div>
    </EmployerModal>
  )
}
