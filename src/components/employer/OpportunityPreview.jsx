import React from 'react';

export default function OpportunityPreview({ formData, mockMatchScore = 91 }) {
  const {
    title = 'Job Title',
    company = 'Google',
    type = 'Internship',
    location = 'Hybrid',
    city = 'Kuala Lumpur',
    country = 'Malaysia',
    openings = '1',
    summary = 'Role summary description...',
    responsibilities = 'Key responsibilities list...',
    requirements = 'Core requirements details...',
    preferredQualifications = 'Preferred credentials...',
    benefits = 'Fringe benefits list...',
    requiredSkills = ['SQL', 'Python'],
    preferredSkills = ['React', 'Communication'],
    experienceLevel = 'Undergraduate',
    education = 'Bachelor\'s Degree in Computer Science or related fields',
    deadline = 'Jun 30, 2026',
    startDate = 'Aug 1, 2026',
    applicationMethod = 'Apply Through CareerOS',
    screeningQuestions = [],
  } = formData;

  const fullLocation = city && country ? `${city}, ${country} (${location})` : `${location}`;

  return (
    <div className="rounded-[8px] border border-slate-200 bg-white/70 shadow-sm max-h-[500px] overflow-y-auto p-5 space-y-6 text-left">
      {/* Top Banner mock */}
      <div className="rounded-[8px] bg-gradient-to-r from-blue-600 to-indigo-600 p-5 text-white flex flex-col justify-between h-32 relative overflow-hidden">
        <div className="absolute right-4 top-4 bg-white/10 px-3 py-1 rounded-[4px] text-xs font-semibold backdrop-blur">
          {type}
        </div>
        <div className="z-10 mt-auto">
          <h2 className="text-lg font-bold">{title}</h2>
          <p className="text-xs text-blue-100 font-semibold">{company} · {fullLocation}</p>
        </div>
      </div>

      {/* Match Gauge Mock */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-[8px] border border-emerald-100 bg-emerald-50/50 p-4">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] bg-emerald-500 text-lg font-bold text-white">
            {mockMatchScore}%
          </span>
          <div>
            <h4 className="text-sm font-semibold text-emerald-950">Your Match Score</h4>
            <p className="text-[11px] text-slate-500 font-medium">Based on your skills, project experience, and verified memory trace.</p>
          </div>
        </div>
        <span className="rounded-[4px] bg-white px-3 py-1 text-xs font-semibold text-emerald-700 border border-emerald-100 shadow-sm shrink-0">
          Very High Fit
        </span>
      </div>

      {/* Details Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 border-b border-slate-100 pb-5 text-xs text-slate-500 font-semibold">
        <div>
          <p className="text-[10px] uppercase text-slate-400">Openings</p>
          <p className="mt-1 text-slate-800">{openings} Position(s)</p>
        </div>
        <div>
          <p className="text-[10px] uppercase text-slate-400">Experience Level</p>
          <p className="mt-1 text-slate-800">{experienceLevel}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase text-slate-400">Start Date</p>
          <p className="mt-1 text-slate-800">{startDate}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase text-slate-400">Deadline</p>
          <p className="mt-1 text-rose-500">{deadline}</p>
        </div>
      </div>

      {/* Skills */}
      <div className="space-y-4">
        <div>
          <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">Required Skills</h4>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {requiredSkills.map(s => (
              <span key={s} className="rounded-[4px] bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 border border-blue-100/30">
                {s}
              </span>
            ))}
          </div>
        </div>
        
        {preferredSkills.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">Preferred Skills</h4>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {preferredSkills.map(s => (
                <span key={s} className="rounded-[4px] bg-violet-50 px-2.5 py-1 text-xs font-semibold text-violet-700 border border-violet-100/30">
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Core Description Text */}
      <div className="space-y-4 text-xs leading-relaxed text-slate-600 font-medium">
        <div>
          <h4 className="text-xs font-semibold text-slate-950 uppercase tracking-wider">Role Summary</h4>
          <p className="mt-2 whitespace-pre-line font-normal text-slate-600">{summary}</p>
        </div>
        
        {responsibilities && (
          <div>
            <h4 className="text-xs font-semibold text-slate-950 uppercase tracking-wider">Responsibilities</h4>
            <p className="mt-2 whitespace-pre-line font-normal text-slate-600">{responsibilities}</p>
          </div>
        )}

        {requirements && (
          <div>
            <h4 className="text-xs font-semibold text-slate-950 uppercase tracking-wider">Requirements</h4>
            <p className="mt-2 whitespace-pre-line font-normal text-slate-600">{requirements}</p>
          </div>
        )}

        {preferredQualifications && (
          <div>
            <h4 className="text-xs font-semibold text-slate-950 uppercase tracking-wider">Preferred Qualifications</h4>
            <p className="mt-2 whitespace-pre-line font-normal text-slate-600">{preferredQualifications}</p>
          </div>
        )}

        {benefits && (
          <div>
            <h4 className="text-xs font-semibold text-slate-950 uppercase tracking-wider">Benefits</h4>
            <p className="mt-2 whitespace-pre-line font-normal text-slate-600">{benefits}</p>
          </div>
        )}
      </div>

      {/* Application Process info */}
      <div className="rounded-[8px] border border-slate-100 bg-slate-50/50 p-4 space-y-3">
        <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">Application Process</h4>
        <p className="text-xs text-slate-500 font-semibold leading-normal">
          Method: <strong className="text-slate-700 font-semibold">{applicationMethod}</strong>
        </p>
        {screeningQuestions.length > 0 && (
          <div>
            <p className="text-[10px] font-semibold uppercase text-slate-400">Screening Questions (Required):</p>
            <ul className="mt-1.5 space-y-1 list-disc pl-4 text-xs text-slate-600 font-normal">
              {screeningQuestions.map((q, idx) => (
                <li key={idx}>{q}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
