import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useEmployerSearchStore } from '../../store/useEmployerSearchStore';
import SearchDropdown from './SearchDropdown';

export default function GlobalEmployerSearch() {
  const location = useLocation();
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

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
  const getActivePage = () => {
    const path = location.pathname;
    if (path.includes('/insights')) return 'insights';
    if (path.includes('/posting')) return 'engagement';
    return 'talent';
  };

  const activePage = getActivePage();

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        if (inputRef.current) inputRef.current.blur();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Context-aware candidate selection action
  const handleSelectCandidate = (candidateId, name) => {
    addChip(activePage, { type: 'candidate', value: name });
    addRecentSearch(name);
    setSearchQuery('');
    setIsOpen(false);

    // Broadcast a custom event so the Talent Discovery page can focus the candidate
    const selectEvent = new CustomEvent('employer-search-select-candidate', { detail: { candidateId } });
    window.dispatchEvent(selectEvent);
  };

  const handleSelectSkill = (skill) => {
    addChip(activePage, { type: 'skill', value: skill });
    addRecentSearch(skill);
    setSearchQuery('');
    setIsOpen(false);
  };

  const handleSelectRole = (role) => {
    addChip(activePage, { type: 'role', value: role });
    addRecentSearch(role);
    setSearchQuery('');
    setIsOpen(false);
  };

  const handleSelectRecentSearch = (search) => {
    setSearchQuery(search);
  };

  const handleClear = () => {
    setSearchQuery('');
  };

  return (
    <div ref={dropdownRef} className="relative hidden max-w-4xl flex-1 lg:block">
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
        </span>
        <input
          ref={inputRef}
          type="text"
          className="h-12 w-full rounded-[8px] border border-slate-200 bg-white pl-11 pr-20 text-sm font-medium outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-300 focus:ring-4 focus:ring-blue-50"
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
            className="absolute right-20 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
            type="button"
            aria-label="Clear search query"
          >
            ✕
          </button>
        )}

        <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded-[6px] border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-semibold text-slate-400">
          Ctrl K
        </span>
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
