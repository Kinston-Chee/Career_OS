import React from 'react';

export default function OpportunityCard({ opportunity, onViewApplicants }) {
  const {
    title,
    type,
    location,
    city,
    country,
    applicantsCount,
    averageMatch,
    deadline,
    status,
  } = opportunity;

  const typeBadges = {
    Internship: 'bg-blue-50 text-blue-700 border-blue-100',
    'Graduate Program': 'bg-purple-50 text-purple-700 border-purple-100',
    'Part-Time': 'bg-amber-50 text-amber-700 border-amber-100',
    'Full-Time': 'bg-emerald-50 text-emerald-700 border-emerald-100',
    Contract: 'bg-pink-50 text-pink-700 border-pink-100',
  };

  const statusBadges = {
    Active: 'bg-emerald-500 text-white',
    Draft: 'bg-slate-400 text-white',
    Closed: 'bg-red-500 text-white',
    Archived: 'bg-slate-700 text-white',
  };

  const fullLocation = city && country ? `${city}, ${country}` : location || 'Kuala Lumpur, Malaysia';

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.03)] transition duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[0_18px_40px_rgba(37,99,235,0.08)] flex flex-col justify-between h-full">
      <div className="space-y-4">
        {/* Top Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-base font-extrabold text-slate-950 truncate leading-snug group-hover:text-blue-700 transition">
              {title}
            </h3>
            <p className="mt-1 text-xs font-semibold text-slate-400">Acme Corp</p>
          </div>
          <span className={`shrink-0 rounded-full px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wide border ${typeBadges[type] || 'bg-slate-50 text-slate-600 border-slate-100'}`}>
            {type}
          </span>
        </div>

        {/* Location & Details */}
        <div className="space-y-2 text-[11px] font-semibold text-slate-500">
          <div className="flex items-center gap-1.5 truncate">
            <span aria-hidden="true">📍</span>
            <span className="truncate">{fullLocation}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span aria-hidden="true">⏱</span>
            <span>Deadline: {deadline}</span>
          </div>
        </div>

        {/* Applicants and Match Rate metrics */}
        <div className="grid grid-cols-2 gap-3.5 border-t border-slate-100 pt-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Applicants</p>
            <p className="mt-1 text-sm font-extrabold text-slate-950">{applicantsCount} Students</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Average Match</p>
            <p className="mt-1 text-sm font-extrabold text-emerald-600">{averageMatch}% Match</p>
          </div>
        </div>
      </div>

      {/* Footer view action */}
      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 gap-3">
        <span className={`rounded px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wide leading-none ${statusBadges[status] || 'bg-slate-500 text-white'}`}>
          {status}
        </span>
        <button
          type="button"
          onClick={onViewApplicants}
          className="rounded-xl border border-blue-200 bg-blue-50 px-3.5 py-2 text-xs font-bold text-blue-700 transition hover:border-blue-300 hover:bg-blue-100"
        >
          View Applicants
        </button>
      </div>
    </article>
  );
}
