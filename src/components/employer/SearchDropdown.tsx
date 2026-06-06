import React from 'react';
import { employerTalentWorkspace } from '../../data/mockData';
import SearchResultsGroup from './SearchResultsGroup';
import RecentSearchesSection from './RecentSearchesSection';
import PopularSearchesSection from './PopularSearchesSection';

interface SearchDropdownProps {
  query: string;
  recentSearches: string[];
  onSelectCandidate: (candidateId: string, name: string) => void;
  onSelectSkill: (skill: string) => void;
  onSelectRole: (role: string) => void;
  onSelectRecentSearch: (search: string) => void;
  onClearRecentSearches: () => void;
  onClose: () => void;
}

export default function SearchDropdown({
  query,
  recentSearches,
  onSelectCandidate,
  onSelectSkill,
  onSelectRole,
  onSelectRecentSearch,
  onClearRecentSearches,
  onClose,
}: SearchDropdownProps) {
  const candidates = employerTalentWorkspace.candidates;

  // Static list pools for robust autofill matching
  const skillsPool = [
    'SQL', 'Python', 'Tableau', 'React', 'Testing', 'CRM', 'Analytics',
    'Automation', 'Excel', 'Dashboarding', 'Data Analysis', 'Data Analytics',
    'Data Visualization', 'Statistical Analysis', 'User research', 'Accessibility',
    'Leadership', 'Product Thinking', 'UX Design', 'Agile'
  ];

  const rolesPool = [
    'Data Analyst', 'Product Analyst', 'Frontend Engineer', 'UX Designer',
    'Growth Operations Associate', 'Data Scientist', 'Business Analyst',
    'AI/ML Engineer', 'Junior Data Analyst', 'Business Data Analyst',
    'Data Insights Analyst', 'Marketing Data Analyst'
  ];

  const cleanQuery = query.trim().toLowerCase();

  // Filter candidates matching the query
  const filteredCandidates = React.useMemo(() => {
    if (!cleanQuery) return [];
    return (candidates as any[]).filter((c: any) =>
      c.name.toLowerCase().includes(cleanQuery) ||
      c.targetRole.toLowerCase().includes(cleanQuery) ||
      c.university.toLowerCase().includes(cleanQuery) ||
      c.topSkills.some((s: string) => s.toLowerCase().includes(cleanQuery))
    ).slice(0, 3);
  }, [candidates, cleanQuery]);

  // Filter skills matching the query
  const filteredSkills = React.useMemo(() => {
    if (!cleanQuery) return [];
    return skillsPool.filter(s => s.toLowerCase().includes(cleanQuery)).slice(0, 5);
  }, [cleanQuery]);

  // Filter roles matching the query
  const filteredRoles = React.useMemo(() => {
    if (!cleanQuery) return [];
    return rolesPool.filter(r => r.toLowerCase().includes(cleanQuery)).slice(0, 5);
  }, [cleanQuery]);

  const showSuggestions = !cleanQuery;

  return (
    <div className="absolute left-0 right-0 z-50 mt-1 max-h-[580px] overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.15)] animate-[dropdownSlide_0.15s_ease-out]">
      {showSuggestions ? (
        <>
          <RecentSearchesSection
            searches={recentSearches}
            onSelect={onSelectRecentSearch}
            onClear={onClearRecentSearches}
          />
          <PopularSearchesSection
            onSelectSkill={onSelectSkill}
            onSelectRole={onSelectRole}
            onSelectSearch={onSelectRecentSearch}
          />
        </>
      ) : (
        <>
          {/* Candidates Group */}
          {filteredCandidates.length > 0 && (
            <SearchResultsGroup
              title="Top Candidate Matches"
              query={query}
              footerLabel="View all candidates for"
              onFooterClick={() => {
                onSelectRole(query);
                onClose();
              }}
            >
              {filteredCandidates.map((c: any) => {
                const initials = c.name.split(' ').map((p: string) => p[0]).join('');
                return (
                  <button
                    key={c.id}
                    onClick={() => {
                      onSelectCandidate(c.id, c.name);
                      onClose();
                    }}
                    className="flex w-full items-center justify-between px-4 py-2.5 hover:bg-slate-50 transition text-left"
                    type="button"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-700">
                        {initials}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-900 truncate">{c.name}</p>
                        <p className="text-[10px] text-slate-500 truncate">{c.targetRole} at {c.university}</p>
                      </div>
                    </div>
                    <span className="shrink-0 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 ring-1 ring-emerald-100">
                      {c.match}% Match
                    </span>
                  </button>
                );
              })}
            </SearchResultsGroup>
          )}

          {/* Skills Group */}
          {filteredSkills.length > 0 && (
            <SearchResultsGroup
              title="Skills"
              query={query}
              footerLabel="View all skills for"
              onFooterClick={() => {
                onSelectSkill(query);
                onClose();
              }}
            >
              {filteredSkills.map(skill => (
                <button
                  key={skill}
                  onClick={() => {
                    onSelectSkill(skill);
                    onClose();
                  }}
                  className="flex w-full items-center gap-3 px-4 py-2.5 hover:bg-slate-50/70 transition text-left text-xs font-semibold text-slate-700"
                  type="button"
                >
                  <span className="text-slate-400" aria-hidden="true">📊</span>
                  <span>{skill}</span>
                </button>
              ))}
            </SearchResultsGroup>
          )}

          {/* Roles Group */}
          {filteredRoles.length > 0 && (
            <SearchResultsGroup
              title="Roles"
              query={query}
              footerLabel="View all roles for"
              onFooterClick={() => {
                onSelectRole(query);
                onClose();
              }}
            >
              {filteredRoles.map(role => (
                <button
                  key={role}
                  onClick={() => {
                    onSelectRole(role);
                    onClose();
                  }}
                  className="flex w-full items-center gap-3 px-4 py-2.5 hover:bg-slate-50/70 transition text-left text-xs font-semibold text-slate-700"
                  type="button"
                >
                  <span className="text-slate-400" aria-hidden="true">💼</span>
                  <span>{role}</span>
                </button>
              ))}
            </SearchResultsGroup>
          )}

          {filteredCandidates.length === 0 && filteredSkills.length === 0 && filteredRoles.length === 0 && (
            <div className="py-8 text-center text-xs font-semibold text-slate-500">
              No results found for "{query}"
            </div>
          )}
        </>
      )}
    </div>
  );
}
