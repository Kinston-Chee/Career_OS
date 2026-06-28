import React from 'react'
import { ArrowRight } from 'lucide-react'

const TAG_TONES = {
  emerald: 'bg-emerald-50 text-emerald-700',
  blue: 'bg-blue-50 text-blue-700',
  violet: 'bg-violet-50 text-violet-700',
}

export default function TopSkillsPanel({ skills }) {
  return (
    <section className="rounded-xl border border-[#e2eaf8] bg-white p-5 shadow-[0_8px_22px_rgba(44,76,142,0.07)]">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-bold text-[#11194a]">Top Skills</h2>
        <button type="button" className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700">
          View all <ArrowRight size={12} />
        </button>
      </div>

      <div className="space-y-3">
        {skills.map((skill) => (
          <div key={skill.id} className="flex items-center justify-between">
            <span className="text-sm font-bold text-[#11194a]">{skill.label}</span>
            <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${TAG_TONES[skill.tone] ?? TAG_TONES.blue}`}>{skill.tag}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
