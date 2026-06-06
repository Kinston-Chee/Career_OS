import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useEmployerSearchStore } from '../../store/useEmployerSearchStore';
import SearchDropdown from './SearchDropdown';

export default function GlobalEmployerSearch() {
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    searchQuery,
    setSearchQuery,
    recentSearches,
    addRecentSearch,
    clearRecentSearches,
    addChip,
  } = useEmployerSearchStore();

  const [isOpen, setIsOpen] = useState(false);

  // Determine active view page based on route URL path
  const getActivePage = (): 'talent' | 'insights' | 'engagement' => {
    const path = location.pathname;
    if (path.includes('/insights')) return 'insights';
    if (path.includes('/posting')) return 'engagement';
    return 'talent';
  };

  const activePage = getActivePage();

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Context-aware candidate selection action
  const handleSelectCandidate = (candidateId: string, name: string) => {
    addChip(activePage, { type: 'candidate', value: name });
    addRecentSearch(name);
    setSearchQuery('');
    setIsOpen(false);

    // Broadcast a custom event so the Talent Discovery page can focus the candidate
    const selectEvent = new CustomEvent('employer-search-select-candidate', { detail: { candidateId } });
    window.dispatchEvent(selectEvent);
  };

  const handleSelectSkill = (skill: string) => {
    addChip(activePage, { type: 'skill', value: skill });
    addRecentSearch(skill);
    setSearchQuery('');
    setIsOpen(false);
  };

  const handleSelectRole = (role: string) => {
    addChip(activePage, { type: 'role', value: role });
    addRecentSearch(role);
    setSearchQuery('');
    setIsOpen(false);
  };

  const handleSelectRecentSearch = (search: string) => {
    setSearchQuery(search);
  };

  const handleClear = () => {
    setSearchQuery('');
  };

  return (
    <div ref={dropdownRef} className="relative hidden flex-1 lg:block">
      <div className="relative">
        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="5" />
            <path d="m15 15 4 4" />
          </svg>
        </span>
        <input
          ref={inputRef}
          type="text"
          className="h-12 w-full rounded-[8px] border border-slate-200 bg-white pl-12 pr-14 text-sm font-normal outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-300 focus:ring-4 focus:ring-blue-50"
          placeholder="Search candidates, skills, roles..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
        />
        
        {searchQuery && (
          <button
            onClick={handleClear}
            className="absolute right-14 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
            type="button"
            aria-label="Clear search query"
          >
            ✕
          </button>
        )}

        <button className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-[8px] text-blue-700 ring-1 ring-slate-200 bg-white hover:bg-slate-50 transition" type="button">
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 6h16l-6 7v5l-4 2v-7z" />
          </svg>
        </button>
      </div>

      {isOpen && (
        <SearchDropdown
          query={searchQuery}
          recentSearches={recentSearches}
          onSelectCandidate={handleSelectCandidate}
          onSelectSkill={handleSelectSkill}
          onSelectRole={handleSelectRole}
          onSelectRecentSearch={handleSelectRecentSearch}
          onClearRecentSearches={clearRecentSearches}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
