import React from 'react'
import EvidenceLink from './EvidenceLink'
import SkillTag from './SkillTag'

const typeStyles = {
  Project: 'bg-violet-50 text-violet-700',
  Club: 'bg-emerald-50 text-emerald-700',
  Internship: 'bg-amber-50 text-amber-700',
  Hackathon: 'bg-indigo-50 text-indigo-700',
  Work: 'bg-blue-50 text-blue-700',
  Course: 'bg-teal-50 text-teal-700',
  Certificate: 'bg-sky-50 text-sky-700',
  Certification: 'bg-sky-50 text-sky-700',
  Workshop: 'bg-teal-50 text-teal-700',
  Competition: 'bg-orange-50 text-orange-700',
  Leadership: 'bg-emerald-50 text-emerald-700',
  Volunteering: 'bg-rose-50 text-rose-700',
  Research: 'bg-cyan-50 text-cyan-700',
  'Networking Event': 'bg-fuchsia-50 text-fuchsia-700',
  Other: 'bg-slate-50 text-slate-700',
}

const typeIcons = {
  Project: '🔬',
  Hackathon: '⚡',
  Workshop: '🎓',
  Competition: '🏆',
  Internship: '💼',
  Leadership: '👥',
  Volunteering: '🤝',
  Certification: '📜',
  Certificate: '📜',
  Research: '🔍',
  'Networking Event': '🌐',
  Club: '🎯',
  Work: '💻',
  Course: '📚',
  Other: '📌',
}

export default function ExperienceCard({ experience }) {
  const iconClass = typeStyles[experience.type] ?? typeStyles.Project
  const emoji = typeIcons[experience.type] ?? '📌'

  return (
    <article className="rounded-3xl border border-violet-100/80 bg-white/95 p-5 shadow-[0_14px_34px_rgba(88,63,188,0.07)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_22px_54px_rgba(88,63,188,0.12)]">
      <div className="grid gap-4 sm:grid-cols-[56px_minmax(0,1fr)_auto]">
        <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${iconClass} text-lg shadow-sm`}>
          {emoji}
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="text-base font-semibold text-[#11104a]">{experience.title}</h4>
            <span className="rounded-lg bg-violet-50 px-2.5 py-1 text-[11px] font-bold text-violet-700">{experience.type}</span>
          </div>
          <p className="mt-1 text-xs font-semibold text-slate-500">
            {experience.role ?? experience.type}
            {experience.organization ? ` · ${experience.organization}` : ` — ${experience.type}`}
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-600">{experience.summary}</p>

          {/* Achievement */}
          {experience.achievement && (
            <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-[10px]">🏅</span>
              {experience.achievement}
            </p>
          )}

          {/* Technologies */}
          {experience.technologies && experience.technologies.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {experience.technologies.map((tech) => (
                <span key={tech} className="rounded-md bg-slate-50 px-2 py-0.5 text-[10px] font-semibold text-slate-600 ring-1 ring-slate-100">
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Extracted Skills */}
          <div className="mt-3 flex flex-wrap gap-2">
            {experience.extractedSkills.map((skill) => (
              <SkillTag key={skill.name}>{skill.name}</SkillTag>
            ))}
          </div>

          {/* Evidence Links */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">Evidence:</span>
            {experience.evidenceLinks.map((link) => (
              <EvidenceLink key={link}>{link}</EvidenceLink>
            ))}
          </div>

          {/* Additional meta row */}
          {(experience.teamSize || experience.duration) && (
            <div className="mt-2 flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
              {experience.teamSize && <span>Team of {experience.teamSize}</span>}
              {experience.duration && <span>Duration: {experience.duration}</span>}
            </div>
          )}
        </div>
        <div className="flex items-start">
          <button type="button" className="rounded-full p-1 text-slate-400 transition-all hover:bg-violet-50 hover:text-violet-700" aria-label="More options">
            ...
          </button>
        </div>
      </div>
    </article>
  )
}
