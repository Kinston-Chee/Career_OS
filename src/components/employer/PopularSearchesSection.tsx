

interface PopularSearchesSectionProps {
  onSelectSkill: (skill: string) => void;
  onSelectRole: (role: string) => void;
  onSelectSearch: (search: string) => void;
}

export default function PopularSearchesSection({
  onSelectSkill,
  onSelectRole,
  onSelectSearch,
}: PopularSearchesSectionProps) {
  const popularSkills = ['SQL', 'Python', 'Tableau', 'React', 'Leadership'];
  const popularRoles = ['Data Analyst', 'Product Analyst', 'Frontend Engineer', 'UX Designer'];
  const recommendedSearches = [
    'Top Data Analysts',
    'Students with Leadership Experience',
    'Candidates interested in FinTech',
  ];

  return (
    <div className="space-y-4 py-3">
      {/* Popular Skills */}
      <div className="px-4">
        <h4 className="text-[10px] font-extrabold tracking-wider text-slate-400 uppercase">Popular Skills</h4>
        <div className="mt-2 flex flex-wrap gap-2">
          {popularSkills.map((skill) => (
            <button
              key={skill}
              onClick={() => onSelectSkill(skill)}
              className="flex items-center gap-1.5 rounded-[8px] bg-blue-50/70 border border-blue-100/40 px-2.5 py-1.5 text-xs font-semibold text-blue-700 hover:bg-blue-100/50 transition"
              type="button"
            >
              <span aria-hidden="true">📊</span>
              <span>{skill}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Popular Roles */}
      <div className="px-4">
        <h4 className="text-[10px] font-extrabold tracking-wider text-slate-400 uppercase">Popular Roles</h4>
        <div className="mt-2 flex flex-wrap gap-2">
          {popularRoles.map((role) => (
            <button
              key={role}
              onClick={() => onSelectRole(role)}
              className="flex items-center gap-1.5 rounded-[8px] bg-violet-50/70 border border-violet-100/40 px-2.5 py-1.5 text-xs font-semibold text-violet-700 hover:bg-violet-100/50 transition"
              type="button"
            >
              <span aria-hidden="true">💼</span>
              <span>{role}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recommended Searches */}
      <div className="px-4">
        <h4 className="text-[10px] font-extrabold tracking-wider text-slate-400 uppercase">Recommended Searches</h4>
        <div className="mt-2.5 space-y-1">
          {recommendedSearches.map((rec) => (
            <button
              key={rec}
              onClick={() => onSelectSearch(rec)}
              className="flex w-full items-center gap-2 rounded-[8px] px-2.5 py-2.5 text-left text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
              type="button"
            >
              <span className="text-blue-500" aria-hidden="true">✨</span>
              <span>{rec}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
