import React from 'react'
import {
  BookOpen,
  Briefcase,
  Building2,
  Code2,
  GraduationCap,
  Handshake,
  Lightbulb,
  Network,
  Search,
  Target,
  Trophy,
  Users,
  Zap,
} from 'lucide-react'
import EvidenceLink from './EvidenceLink'
import SkillTag from './SkillTag'

const typeStyles = {
  Project: 'border-violet-100 bg-violet-50 text-violet-700',
  Club: 'border-emerald-100 bg-emerald-50 text-emerald-700',
  Internship: 'border-amber-100 bg-amber-50 text-amber-700',
  Hackathon: 'border-indigo-100 bg-indigo-50 text-indigo-700',
  Work: 'border-blue-100 bg-blue-50 text-blue-700',
  Course: 'border-teal-100 bg-teal-50 text-teal-700',
  Certificate: 'border-sky-100 bg-sky-50 text-sky-700',
  Certification: 'border-sky-100 bg-sky-50 text-sky-700',
  Workshop: 'border-teal-100 bg-teal-50 text-teal-700',
  Competition: 'border-orange-100 bg-orange-50 text-orange-700',
  Leadership: 'border-emerald-100 bg-emerald-50 text-emerald-700',
  Volunteering: 'border-rose-100 bg-rose-50 text-rose-700',
  Research: 'border-cyan-100 bg-cyan-50 text-cyan-700',
  'Networking Event': 'border-fuchsia-100 bg-fuchsia-50 text-fuchsia-700',
  Other: 'border-slate-200 bg-slate-50 text-slate-700',
}

const typeIcons = {
  Project: Code2,
  Hackathon: Zap,
  Workshop: Building2,
  Competition: Trophy,
  Internship: Briefcase,
  Leadership: Users,
  Volunteering: Handshake,
  Certification: GraduationCap,
  Certificate: GraduationCap,
  Research: Search,
  'Networking Event': Network,
  Club: Target,
  Work: Briefcase,
  Course: BookOpen,
  Other: Lightbulb,
}

export default function ExperienceCard({ experience }) {
  const iconClass = typeStyles[experience.type] ?? typeStyles.Project
  const Icon = typeIcons[experience.type] ?? Lightbulb

  return (
    <article className="rounded-3xl border border-violet-100/80 bg-white/95 p-5 shadow-[0_14px_34px_rgba(88,63,188,0.07)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_22px_54px_rgba(88,63,188,0.12)]">
      <div className="grid gap-4 sm:grid-cols-[56px_minmax(0,1fr)_auto]">
        <div className={`flex h-14 w-14 items-center justify-center rounded-2xl border ${iconClass} shadow-sm`}>
          <Icon size={22} strokeWidth={2} />
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="text-base font-semibold text-[#11104a]">{experience.title}</h4>
            <span className="rounded-lg bg-violet-50 px-2.5 py-1 text-[11px] font-bold text-violet-700">{experience.type}</span>
          </div>
          <p className="mt-1 text-xs font-semibold text-slate-500">
            {experience.role ?? experience.type}
            {experience.organization ? ` - ${experience.organization}` : ` - ${experience.type}`}
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-600">{experience.summary}</p>

          {experience.achievement && (
            <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                <Trophy size={12} strokeWidth={2} />
              </span>
              {experience.achievement}
            </p>
          )}

          {experience.technologies && experience.technologies.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {experience.technologies.map((tech) => (
                <span key={tech} className="rounded-md bg-slate-50 px-2 py-0.5 text-[10px] font-semibold text-slate-600 ring-1 ring-slate-100">
                  {tech}
                </span>
              ))}
            </div>
          )}

          <div className="mt-3 flex flex-wrap gap-2">
            {experience.extractedSkills.map((skill) => (
              <SkillTag key={skill.name}>{skill.name}</SkillTag>
            ))}
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">Evidence:</span>
            {experience.evidenceLinks.map((link) => (
              <EvidenceLink key={link}>{link}</EvidenceLink>
            ))}
          </div>

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
