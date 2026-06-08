import React from 'react';

export default function ApplicantCard({ candidate, onSelect, onMoveStage }) {
  const {
    id,
    name,
    university,
    match,
    evidenceCount,
    trustScore,
    lastSignal,
    topSkills = [],
    availability
  } = candidate;

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', id);
    e.dataTransfer.effectAllowed = 'move';
  };

  // Get color for match score bubble
  const getMatchColor = (score) => {
    if (score >= 90) return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (score >= 80) return 'bg-blue-50 text-blue-700 border-blue-200';
    if (score >= 70) return 'bg-amber-50 text-amber-700 border-amber-200';
    return 'bg-slate-50 text-slate-600 border-slate-200';
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onClick={() => onSelect && onSelect(candidate)}
      className="group relative cursor-grab active:cursor-grabbing rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md hover:border-blue-300 transition duration-200 space-y-3 flex flex-col justify-between"
    >
      <div className="space-y-2">
        {/* Top row: Match Score and Trust rating */}
        <div className="flex items-center justify-between">
          <span className={`rounded-full border px-2 py-0.5 text-[10px] font-extrabold tracking-wide ${getMatchColor(match)}`}>
            {match}% Match
          </span>
          <span className="text-[10px] font-bold text-slate-400">
            Trust: <span className="text-slate-700 font-extrabold">{trustScore}%</span>
          </span>
        </div>

        {/* Candidate Name & University */}
        <div>
          <h4 className="text-sm font-extrabold text-slate-900 group-hover:text-blue-700 transition leading-snug truncate">
            {name}
          </h4>
          <p className="text-[11px] font-semibold text-slate-400 truncate">{university}</p>
        </div>

        {/* Top Skills */}
        <div className="flex flex-wrap gap-1">
          {topSkills.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="rounded bg-slate-50 px-1.5 py-0.5 text-[9px] font-semibold text-slate-600 border border-slate-100"
            >
              {skill}
            </span>
          ))}
          {topSkills.length > 3 && (
            <span className="rounded bg-slate-50 px-1.5 py-0.5 text-[9px] font-semibold text-slate-400 border border-slate-100">
              +{topSkills.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Footer Metrics */}
      <div className="border-t border-slate-100 pt-2.5 flex items-center justify-between gap-2 text-[10px] font-semibold text-slate-500">
        <div className="flex items-center gap-1">
          <span>📁</span>
          <span>{evidenceCount} Evidence Traces</span>
        </div>
        {availability && (
          <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[9px] font-bold text-slate-600">
            {availability}
          </span>
        )}
      </div>

      {/* Quick Move dropdown for accessibility / non-drag users */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/95 rounded shadow-sm border border-slate-200 p-0.5">
        <select
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => {
            e.stopPropagation();
            if (e.target.value) {
              onMoveStage && onMoveStage(id, e.target.value);
              e.target.value = ''; // reset
            }
          }}
          className="text-[9px] font-extrabold text-slate-600 bg-transparent border-none outline-none focus:ring-0 cursor-pointer"
        >
          <option value="">Move...</option>
          <option value="Applied">Applied</option>
          <option value="Shortlisted">Shortlisted</option>
          <option value="Interviewing">Interviewing</option>
          <option value="Offer">Offer</option>
          <option value="Hired">Hired</option>
        </select>
      </div>
    </div>
  );
}
