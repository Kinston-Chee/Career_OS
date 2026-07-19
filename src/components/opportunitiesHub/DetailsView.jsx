import React, { useState } from 'react'
import { Calendar, ChevronDown, ChevronUp, Earth, MapPin, Users, X } from 'lucide-react'

const LOGO_TONES = {
  indigo: 'bg-indigo-600 text-white',
  emerald: 'bg-emerald-600 text-white',
  rose: 'bg-rose-600 text-white',
  'white-google': 'bg-white text-[#4285F4] border border-[#e2eaf8]',
}

const VISIBLE_PEOPLE = {
  'opp-1': [
    ['AL', 'Aiman Lee', 'Computer Science, Year 3'],
    ['NS', 'Nur Syafiqah', 'Software Engineering, Year 2'],
    ['JW', 'Jason Wong', 'Computer Science, Year 3'],
    ['PM', 'Priya Menon', 'Information Technology, Year 2'],
  ],
  'opp-2': [
    ['DT', 'Daniel Tan', 'Computer Science, Year 2'],
    ['AH', 'Amirah Hassan', 'Data Science, Year 3'],
    ['KL', 'Kai Lim', 'Software Engineering, Year 3'],
    ['SR', 'Siti Rahman', 'Computer Science, Year 2'],
  ],
  'opp-3': [
    ['FN', 'Farah Nordin', 'Data Analytics, Year 3'],
    ['JL', 'Jia Li', 'Data Science, Year 2'],
    ['AK', 'Arvind Kumar', 'Business Analytics, Year 3'],
    ['NA', 'Nadia Aziz', 'Statistics, Year 2'],
  ],
  'opp-4': [
    ['CT', 'Chloe Tan', 'Business, Year 2'],
    ['IR', 'Irfan Razak', 'Computer Science, Year 3'],
    ['SM', 'Sarah Malik', 'Marketing, Year 2'],
    ['BH', 'Bryan Ho', 'Finance, Year 3'],
  ],
  'pick-1': [
    ['ME', 'Michelle Ee', 'Business Analytics, Year 3'],
    ['ZA', 'Zahir Ahmad', 'Economics, Year 2'],
    ['LY', 'Liyana Yusof', 'Finance, Year 3'],
    ['ET', 'Ethan Teo', 'Management, Year 2'],
  ],
  'pick-2': [
    ['RA', 'Rina Abdullah', 'Data Science, Year 3'],
    ['WK', 'Wei Kiat', 'Computer Science, Year 2'],
    ['HM', 'Hafiz Musa', 'AI Engineering, Year 3'],
    ['ST', 'Samantha Tay', 'Software Engineering, Year 2'],
  ],
  'pick-3': [
    ['YL', 'Yasmin Lee', 'Data Science, Year 2'],
    ['KR', 'Kavin Raj', 'Computer Science, Year 3'],
    ['AN', 'Alya Noor', 'AI Engineering, Year 2'],
    ['GC', 'Gabriel Chin', 'Software Engineering, Year 3'],
  ],
}

const FALLBACK_PEOPLE = [
  ['AT', 'Alicia Tan', 'Taylor\'s University'],
  ['HR', 'Hakim Rahman', 'Sunway University'],
  ['ML', 'Marcus Lim', 'Monash University Malaysia'],
  ['SN', 'Sofia Ng', 'Taylor\'s University'],
]

function getPeopleLabels(category) {
  if (category === 'event') return { title: 'Registered attendees', action: 'registered', total: 48 }
  if (category === 'challenge') return { title: 'Challenge participants', action: 'joined', total: 36 }
  return { title: 'Applicants', action: 'applied', total: 24 }
}

export default function DetailsView({ opportunity, onClose, onApplyNow }) {
  const [showPeople, setShowPeople] = useState(false)
  const people = VISIBLE_PEOPLE[opportunity.id] ?? FALLBACK_PEOPLE
  const peopleLabels = getPeopleLabels(opportunity.category)

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-start justify-between gap-3 border-b border-[#e2eaf8]/70 p-5">
        <div className="flex items-center gap-3">
          <span className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold ${LOGO_TONES[opportunity.logoTone] ?? LOGO_TONES.indigo}`}>
            {opportunity.logo}
          </span>
          <div>
            <p className="text-sm font-bold text-[#11194a]">{opportunity.title}</p>
            <p className="text-xs font-medium text-[#7382a1]">{opportunity.org}</p>
          </div>
        </div>
        <button type="button" onClick={onClose} className="flex-shrink-0 rounded-full p-1.5 text-[#9aa6c3] transition hover:bg-gray-100 hover:text-[#11194a]">
          <X size={16} />
        </button>
      </div>

      <div className="flex-1 space-y-5 overflow-y-auto p-5">
        <div className="flex flex-wrap items-center gap-2">
          {opportunity.matchPercent != null && (
            <span className="inline-flex w-fit rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
              {opportunity.matchPercent}% match
            </span>
          )}
          {opportunity.sdgs?.length > 0 && (
            <>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase text-[#7382a1]">
                <Earth size={11} className="text-blue-600" /> Supports
              </span>
              {opportunity.sdgs.slice(0, 2).map((sdg) => (
                <span key={sdg.number} title={`SDG ${sdg.number}: ${sdg.title}`} className="inline-flex items-center gap-1.5 rounded-md border border-[#e2eaf8] bg-white px-2 py-1 text-[10px] font-semibold text-[#405071] shadow-sm">
                  <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: sdg.color }} />
                  <strong className="font-bold">SDG {sdg.number}</strong>
                  <span>{sdg.title}</span>
                </span>
              ))}
            </>
          )}
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-wide text-[#9aa6c3]">About</h3>
          <p className="mt-2 text-sm leading-relaxed text-[#3a4669]">{opportunity.about}</p>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-wide text-[#9aa6c3]">Details</h3>
          <div className="mt-2 space-y-2 text-sm font-medium text-[#3a4669]">
            <p className="flex items-center gap-2">
              <Calendar size={14} className="text-[#7382a1]" /> {opportunity.dateRange}
            </p>
            <p className="flex items-center gap-2">
              <MapPin size={14} className="text-[#7382a1]" /> {opportunity.location}
            </p>
            <p className="flex items-center gap-2">
              <Users size={14} className="text-[#7382a1]" /> {opportunity.teamSize}
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-wide text-[#9aa6c3]">Why you match</h3>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {opportunity.matchSkills.map((skill) => (
              <span key={skill} className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-wide text-[#9aa6c3]">What they're looking for</h3>
          <div className="mt-2 space-y-1.5">
            {opportunity.requirements.map((req) => (
              <p key={req} className="flex items-start gap-2 text-sm text-[#3a4669]">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#9aa6c3]" /> {req}
              </p>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-wide text-[#9aa6c3]">Deadline</h3>
          <span className="mt-2 inline-flex w-fit rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-700">
            {opportunity.deadlineLabel}
          </span>
        </div>

        <div className="rounded-2xl border border-[#e2eaf8] bg-[#fbfcff] p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-[#11194a]">{peopleLabels.title}</h3>
              <p className="mt-1 text-xs font-medium text-[#7382a1]">{peopleLabels.total} people have {peopleLabels.action}</p>
            </div>
            <div className="flex -space-x-2" aria-hidden="true">
              {people.slice(0, 3).map(([initials, name]) => (
                <span key={name} className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-blue-100 text-[10px] font-bold text-blue-700">{initials}</span>
              ))}
              <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#edf2fb] text-[10px] font-bold text-[#637094]">+{peopleLabels.total - 3}</span>
            </div>
          </div>

          {showPeople && (
            <div className="mt-4 space-y-2 border-t border-[#e2eaf8] pt-3">
              {people.map(([initials, name, course]) => (
                <div key={name} className="flex items-center gap-3 rounded-xl bg-white p-2.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[11px] font-bold text-blue-700">{initials}</span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-[#26365c]">{name}</p>
                    <p className="truncate text-xs font-medium text-[#8a96af]">{course}</p>
                  </div>
                </div>
              ))}
              <p className="pt-1 text-[11px] font-medium leading-4 text-[#8a96af]">Only CareerOS members who share their registration visibility are shown.</p>
            </div>
          )}

          <button type="button" onClick={() => setShowPeople((visible) => !visible)} className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl border border-blue-100 bg-white py-2 text-xs font-bold text-blue-700 transition hover:bg-blue-50">
            {showPeople ? 'Hide people' : 'See who is here'}
            {showPeople ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>

      </div>

      <div className="border-t border-[#e2eaf8]/70 p-5">
        <button
          type="button"
          onClick={onApplyNow}
          className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700"
        >
          Apply now
        </button>
        <button
          type="button"
          className="mt-2 w-full rounded-lg border border-[#dfe8f7] py-2.5 text-sm font-bold text-[#35507d] transition hover:bg-blue-50"
        >
          Save
        </button>
      </div>
    </div>
  )
}
