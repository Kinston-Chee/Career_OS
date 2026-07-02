import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  AlertCircle,
  Bookmark,
  Briefcase,
  Calendar,
  CheckCircle,
  GraduationCap,
  MoreVertical,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  Trash2,
} from 'lucide-react';
import { employerTalentWorkspace } from '../data/mockData';
import { useEmployerSearchStore } from '../store/useEmployerSearchStore';
import EmployerWorkspaceTopNav from '../components/employer/EmployerWorkspaceTopNav';

const tabs = ['Profile Fit', 'Skills', 'Experience', 'Projects', 'Evidence', 'Activity'];

// Frosted-glass colour system — every card gets a semantic tint instead of a plain
// white surface + coloured left border.
const CARD_TONES = {
  blue: { card: 'bg-blue-100/40 hover:bg-blue-100/60 border-blue-200/50', title: 'text-blue-700', body: 'text-blue-500', badge: 'bg-white/50 text-blue-700 border-blue-200/60', dot: 'bg-blue-500' },
  green: { card: 'bg-green-100/40 hover:bg-green-100/60 border-green-200/50', title: 'text-green-700', body: 'text-green-600', badge: 'bg-white/50 text-green-700 border-green-200/60', dot: 'bg-green-500' },
  amber: { card: 'bg-amber-100/40 hover:bg-amber-100/60 border-amber-200/50', title: 'text-amber-700', body: 'text-amber-600', badge: 'bg-white/50 text-amber-700 border-amber-200/60', dot: 'bg-amber-500' },
  red: { card: 'bg-red-100/40 hover:bg-red-100/60 border-red-200/50', title: 'text-red-700', body: 'text-red-600', badge: 'bg-white/50 text-red-700 border-red-200/60', dot: 'bg-red-500' },
  purple: { card: 'bg-purple-100/40 hover:bg-purple-100/60 border-purple-200/50', title: 'text-purple-700', body: 'text-purple-600', badge: 'bg-white/50 text-purple-700 border-purple-200/60', dot: 'bg-purple-500' },
  teal: { card: 'bg-teal-100/40 hover:bg-teal-100/60 border-teal-200/50', title: 'text-teal-700', body: 'text-teal-600', badge: 'bg-white/50 text-teal-700 border-teal-200/60', dot: 'bg-teal-500' },
};

function cardTone(name) {
  return CARD_TONES[name] || CARD_TONES.blue;
}

function glassCard(toneName, extra = '') {
  return `${cardTone(toneName).card} backdrop-blur-md border transition-all duration-200 ${extra}`;
}

// Match-confidence tone for candidate cards (Candidates page convention: 92%+ green, 75-89% amber, else blue).
function matchCardTone(match) {
  if (match >= 92) return 'green';
  if (match >= 75) return 'amber';
  return 'blue';
}

// Role-specific Fit Overview dimensions — swapped in when a role card is selected.
const ROLE_DIMENSIONS = {
  'Backend Intern': [
    { label: 'API design', value: 88 },
    { label: 'Data structures', value: 92 },
    { label: 'Debugging', value: 85 },
    { label: 'System thinking', value: 79 },
    { label: 'Testing discipline', value: 83 },
    { label: 'Communication clarity', value: 76 },
  ],
  'Frontend Intern': [
    { label: 'React craft', value: 92 },
    { label: 'Testing', value: 88 },
    { label: 'Accessibility', value: 84 },
    { label: 'Team fit', value: 86 },
    { label: 'Product sense', value: 79 },
    { label: 'Leadership', value: 70 },
  ],
  'Product Manager': [
    { label: 'Strategic thinking', value: 90 },
    { label: 'Stakeholder mgmt', value: 85 },
    { label: 'Data fluency', value: 88 },
    { label: 'Communication', value: 92 },
    { label: 'Execution', value: 82 },
    { label: 'Product vision', value: 87 },
  ],
};

// Posted-role cards shown in the left sidebar. `reviewed`/`total` drive the progress bar.
const ROLE_CARDS = [
  { role: 'Backend Intern', type: 'Intern', applicants: 12, deadline: 'Jul 15', reviewed: 4, total: 12, cardTone: 'blue' },
  { role: 'Frontend Intern', type: 'Intern', applicants: 8, deadline: 'Jul 20', reviewed: 1, total: 8, cardTone: 'blue' },
  { role: 'Product Manager', type: 'Permanent', applicants: 23, deadline: 'Aug 1', reviewed: 0, total: 23, cardTone: 'purple' },
];

// Active campus/company events shown below the role cards.
const EVENT_CARDS = [
  { name: 'AI Coding Challenge', registered: 342, status: 'Low conversion', cardTone: 'amber' },
  { name: 'Product Design Workshop', registered: 89, status: 'On track', cardTone: 'teal' },
];

// Maps mock candidates to the posted role they applied for (demo data has no native role/job
// link, and all 4 mock candidates are written up as the Backend Intern applicant pool).
const CANDIDATE_ROLE_MAP = {
  'mei-wong': 'Backend Intern',
  'hakim-ridwan': 'Backend Intern',
  'alyssa-tan': 'Backend Intern',
  'daniel-lim': 'Backend Intern',
};

function RoleSidebarCard({ card, isSelected, onSelect }) {
  const Icon = card.type === 'Intern' ? GraduationCap : Briefcase;
  const progress = card.total > 0 ? Math.round((card.reviewed / card.total) * 100) : 0;
  const t = cardTone(card.cardTone);
  const strongTint = card.cardTone === 'purple' ? 'bg-purple-200/50' : 'bg-blue-200/50';

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`mb-3 w-full cursor-pointer rounded-2xl border p-4 text-left backdrop-blur-md transition-all duration-200 ${
        isSelected ? `${strongTint} ${t.card.split(' ')[2]}` : t.card
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border backdrop-blur-sm ${t.badge}`}>
          <Icon className="h-4 w-4" />
        </span>
        <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium backdrop-blur-sm ${t.badge}`}>
          {card.type}
        </span>
      </div>
      <p className={`mt-2 text-sm font-semibold ${t.title}`}>{card.role}</p>
      <p className={`mt-0.5 text-xs ${t.body}`}>{card.applicants} applicants</p>
      <p className={`text-xs ${t.body}`}>Closes {card.deadline}</p>
      <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/50">
        <div className={`h-full rounded-full ${t.dot}`} style={{ width: `${progress}%` }} />
      </div>
      <p className={`mt-1 text-xs ${t.body}`}>{card.reviewed}/{card.total} reviewed</p>
    </button>
  );
}

function EventCard({ event }) {
  const t = cardTone(event.cardTone);
  return (
    <div className={`mb-3 rounded-2xl p-4 ${glassCard(event.cardTone)}`}>
      <div className="flex items-center justify-between gap-2">
        <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border backdrop-blur-sm ${t.badge}`}>
          <Calendar className="h-4 w-4" />
        </span>
        <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium backdrop-blur-sm ${t.badge}`}>{event.status}</span>
      </div>
      <p className={`mt-2 text-sm font-semibold ${t.title}`}>{event.name}</p>
      <p className={`mt-0.5 text-xs ${t.body}`}>{event.registered} registered</p>
    </div>
  );
}

function CandidateSidebar({ selectedRole, onSelectRole }) {
  return (
    <aside className="flex w-[260px] shrink-0 flex-col overflow-y-auto">
      <h2 className="mb-3 text-sm font-semibold text-gray-700">Open Roles</h2>
      {ROLE_CARDS.map((card) => (
        <RoleSidebarCard
          key={card.role}
          card={card}
          isSelected={card.role === selectedRole}
          onSelect={() => onSelectRole(card.role)}
        />
      ))}

      <div className="my-2 border-t border-white/60" />

      <h2 className="mb-3 mt-4 text-sm font-semibold text-gray-700">Active Events</h2>
      {EVENT_CARDS.map((event) => (
        <EventCard key={event.name} event={event} />
      ))}
    </aside>
  );
}

function AskCopilotBar() {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-white/50 bg-white/60 px-4 py-2 backdrop-blur-sm">
      <Sparkles className="h-4 w-4 shrink-0 text-blue-600" />
      <input
        type="text"
        placeholder="Ask about these candidates…"
        className="flex-1 bg-transparent text-[13px] text-gray-700 outline-none placeholder:text-gray-400"
      />
      <button type="button" className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
        <Send className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

function SkillPill({ children, tone = 'blue' }) {
  const tones = {
    blue: 'bg-blue-50 text-blue-700 ring-blue-100',
    green: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
    violet: 'bg-violet-50 text-violet-700 ring-violet-100',
    amber: 'bg-amber-50 text-amber-700 ring-amber-100',
    slate: 'bg-slate-50 text-slate-600 ring-slate-100',
  };

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium leading-none ring-1 ${tones[tone] || tones.blue}`}>
      {children}
    </span>
  );
}

function CandidateAvatar({ name, selected, large = false, small = false }) {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('');

  const sizeClass = small ? 'h-10 w-10 text-xs' : large ? 'h-20 w-20' : 'h-14 w-14';

  return (
    <div className={`relative flex shrink-0 items-center justify-center rounded-full font-semibold text-white shadow-sm ${sizeClass} ${
      selected ? 'bg-gradient-to-br from-sky-400 to-blue-600' : 'bg-gradient-to-br from-slate-500 to-blue-400'
    }`}>
      {initials}
      <span className={`absolute bottom-0 right-0 rounded-full border-2 border-white bg-emerald-500 ${small ? 'h-2.5 w-2.5' : 'h-3 w-3'}`} />
    </div>
  );
}

function CandidateMiniCard({ candidate, selected, onSelect }) {
  const toneName = matchCardTone(candidate.match);
  const t = cardTone(toneName);
  const strongTint = toneName === 'green' ? 'bg-green-200/50' : toneName === 'amber' ? 'bg-amber-200/50' : 'bg-blue-200/50';

  return (
    <button
      type="button"
      onClick={() => onSelect(candidate.id)}
      className={`w-[200px] shrink-0 rounded-2xl border p-4 text-left backdrop-blur-md transition-all duration-200 ${
        selected ? `${strongTint} ${t.card.split(' ')[2]}` : t.card
      }`}
    >
      <div className="flex items-center gap-2">
        <CandidateAvatar name={candidate.name} selected={selected} small />
        <div className="min-w-0">
          <p className={`truncate text-sm font-semibold ${t.title}`}>{candidate.name}</p>
          <p className={`text-xs font-semibold ${t.title}`}>{candidate.match}% match</p>
        </div>
      </div>
      <p className={`mt-2 truncate text-xs ${t.body}`}>{candidate.targetRole} · {candidate.university}</p>
      <div className="mt-2 flex flex-wrap gap-1">
        {candidate.topSkills.slice(0, 2).map((skill) => (
          <span key={skill} className={`rounded border px-1.5 py-0.5 text-xs backdrop-blur-sm ${t.badge}`}>{skill}</span>
        ))}
      </div>
      <p className={`mt-2 truncate text-xs ${t.body}`}>{candidate.lastSignal}</p>
    </button>
  );
}

function CandidateRow({
  candidates,
  selectedId,
  shortlistedIds,
  savedIds,
  selectedTab,
  selectedSort,
  searchQuery,
  isSortDropdownOpen,
  roleName,
  onSelect,
  onTabChange,
  onSortChange,
  onSearchChange,
  onToggleSortDropdown,
  onCloseSortDropdown,
}) {
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onCloseSortDropdown();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onCloseSortDropdown]);

  // Keyboard accessibility: Escape to close sort dropdown
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onCloseSortDropdown();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onCloseSortDropdown]);

  const totalAllCount = candidates.length;
  const totalSavedCount = candidates.filter((c) => savedIds.has(c.id)).length;
  const totalShortlistedCount = candidates.filter((c) => shortlistedIds.has(c.id)).length;

  const { chipsByPage } = useEmployerSearchStore();
  const activeChips = chipsByPage.talent;

  const filteredList = useMemo(() => {
    return candidates.filter((c) => {
      // 1. Search Query
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesSearch =
          c.name.toLowerCase().includes(q) ||
          c.targetRole.toLowerCase().includes(q) ||
          c.university.toLowerCase().includes(q) ||
          c.topSkills.some((s) => s.toLowerCase().includes(q));
        if (!matchesSearch) return false;
      }

      // 2. Active Search Chips Filter
      if (activeChips.length > 0) {
        const candidateChips = activeChips.filter((ch) => ch.type === 'candidate');
        const skillChips = activeChips.filter((ch) => ch.type === 'skill');
        const roleChips = activeChips.filter((ch) => ch.type === 'role');

        if (candidateChips.length > 0) {
          const matchesCand = candidateChips.some((ch) => c.name.toLowerCase() === ch.value.toLowerCase());
          if (!matchesCand) return false;
        }

        if (skillChips.length > 0) {
          const hasAllSkills = skillChips.every(
            (ch) =>
              c.topSkills.some((s) => s.toLowerCase() === ch.value.toLowerCase()) ||
              c.evidenceTrace.some((e) => e.skill.toLowerCase() === ch.value.toLowerCase())
          );
          if (!hasAllSkills) return false;
        }

        if (roleChips.length > 0) {
          const matchesRole = roleChips.some((ch) => c.targetRole.toLowerCase() === ch.value.toLowerCase());
          if (!matchesRole) return false;
        }
      }

      // 3. Tab Filter
      if (selectedTab === 'shortlisted') {
        return shortlistedIds.has(c.id);
      }
      if (selectedTab === 'saved') {
        return savedIds.has(c.id);
      }

      return true;
    }).sort((a, b) => {
      // 4. Sort options
      if (selectedSort === 'bestMatch') {
        return b.match - a.match;
      }
      if (selectedSort === 'highestHiringPotential') {
        return b.trustScore - a.trustScore;
      }
      if (selectedSort === 'highestSkillGrowth') {
        return b.evidenceCount - a.evidenceCount;
      }
      if (selectedSort === 'recentlyActive') {
        const recencyRank = { 'alyssa-tan': 4, 'daniel-lim': 3, 'mei-wong': 2, 'hakim-ridwan': 1 };
        return (recencyRank[b.id] || 0) - (recencyRank[a.id] || 0);
      }
      if (selectedSort === 'mostExperienced') {
        const getExpYears = (c) => parseFloat(c.profileStats[0]?.value.replace(/[^\d.]/g, '') || '0');
        return getExpYears(b) - getExpYears(a);
      }
      if (selectedSort === 'newestGraduates') {
        const getExpYears = (c) => parseFloat(c.profileStats[0]?.value.replace(/[^\d.]/g, '') || '0');
        return getExpYears(a) - getExpYears(b);
      }
      if (selectedSort === 'leadership') {
        const aLeader = a.fitScores.find((f) => f.label.toLowerCase().includes('lead'))?.value || (a.match - 17);
        const bLeader = b.fitScores.find((f) => f.label.toLowerCase().includes('lead'))?.value || (b.match - 17);
        return bLeader - aLeader;
      }
      return 0;
    });
  }, [candidates, searchQuery, activeChips, selectedTab, shortlistedIds, selectedSort]);

  const sortOptions = [
    { value: 'bestMatch', label: 'Best Match' },
    { value: 'highestHiringPotential', label: 'Highest Hiring Potential' },
    { value: 'highestSkillGrowth', label: 'Highest Skill Growth' },
    { value: 'recentlyActive', label: 'Recently Active' },
    { value: 'mostExperienced', label: 'Most Experienced' },
    { value: 'newestGraduates', label: 'Newest Graduates' },
    { value: 'leadership', label: 'Most Leadership Experience' },
  ];

  const sortLabels = {
    bestMatch: 'Best Match',
    highestHiringPotential: 'Highest Hiring Potential',
    highestSkillGrowth: 'Highest Skill Growth',
    recentlyActive: 'Recently Active',
    mostExperienced: 'Most Experienced',
    newestGraduates: 'Newest Graduates',
    leadership: 'Most Leadership Experience',
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold text-gray-700">Candidates for {roleName}</p>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 rounded-full border border-white/50 bg-white/70 p-1 backdrop-blur-sm">
            <button
              type="button"
              onClick={() => onTabChange('all')}
              className={`rounded-full px-2.5 py-1 text-xs font-medium transition ${
                selectedTab === 'all' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              All {totalAllCount}
            </button>
            <button
              type="button"
              onClick={() => onTabChange('saved')}
              className={`rounded-full px-2.5 py-1 text-xs font-medium transition ${
                selectedTab === 'saved' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Saved {totalSavedCount}
            </button>
            <button
              type="button"
              onClick={() => onTabChange('shortlisted')}
              className={`rounded-full px-2.5 py-1 text-xs font-medium transition ${
                selectedTab === 'shortlisted' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Shortlisted {totalShortlistedCount}
            </button>
          </div>

          <div className="relative">
            <Search aria-hidden className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              placeholder="Search candidates, skills..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="h-8 w-48 rounded-full border border-white/50 bg-white/70 pl-8 pr-3 text-xs text-gray-700 outline-none backdrop-blur-sm placeholder:text-gray-400 focus:border-blue-300"
            />
          </div>

          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              onClick={onToggleSortDropdown}
              aria-haspopup="listbox"
              aria-expanded={isSortDropdownOpen}
              className="flex h-8 items-center gap-1 rounded-full border border-white/50 bg-white/70 px-3 text-xs font-medium text-gray-600 backdrop-blur-sm hover:bg-white/90"
            >
              Sort: {sortLabels[selectedSort]}
              <span className="text-blue-500">▼</span>
            </button>

            {isSortDropdownOpen && (
              <div
                role="listbox"
                className="absolute right-0 z-30 mt-1.5 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-[0_12px_30px_rgba(15,23,42,0.12)] animate-[dropdownSlide_0.15s_ease-out]"
              >
                {sortOptions.map((opt) => {
                  const isSelected = selectedSort === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        onSortChange(opt.value);
                        onToggleSortDropdown();
                      }}
                      className={`flex w-full items-center justify-between px-4 py-2 text-left text-xs transition hover:bg-slate-50 ${
                        isSelected ? 'font-bold bg-blue-50/50 text-blue-700' : 'text-slate-700'
                      }`}
                    >
                      <span>{opt.label}</span>
                      {isSelected && <span className="text-blue-600">✓</span>}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden">
        {filteredList.length > 0 ? (
          filteredList.map((candidate) => (
            <CandidateMiniCard key={candidate.id} candidate={candidate} selected={candidate.id === selectedId} onSelect={onSelect} />
          ))
        ) : (
          <div className="flex w-full flex-col items-center justify-center rounded-2xl border border-white/50 bg-white/60 py-8 text-center backdrop-blur-sm">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-amber-100 bg-amber-50 text-amber-500">
              <Star className="h-5 w-5" />
            </span>
            <h4 className="mt-3 text-xs font-bold text-slate-800">
              {selectedTab === 'shortlisted' ? 'Your shortlist is empty.' : 'No candidates match your filters.'}
            </h4>
          </div>
        )}
      </div>

      <AskCopilotBar />
    </div>
  );
}

function CandidateHeader({ candidate, shortlisted, saved, onToggleShortlist, onToggleSave, onRemove }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="rounded-2xl border border-white/50 bg-white/60 px-6 py-4 backdrop-blur-md">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="flex min-w-0 items-center gap-5">
          <CandidateAvatar name={candidate.name} selected large />
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-semibold leading-tight text-slate-950">{candidate.name}</h1>
              <SkillPill tone="green">{candidate.match}% Match</SkillPill>
            </div>
            <p className="mt-2 text-sm font-normal leading-6 text-slate-600">{candidate.targetRole} at {candidate.university}</p>
            <p className="mt-1.5 text-xs font-normal leading-5 text-slate-500">{candidate.location} <span className="px-2 text-slate-300">.</span> {candidate.availability}</p>
          </div>
        </div>

        {/* Shortlist actions */}
        <div className="flex shrink-0 flex-wrap items-center gap-3 xl:justify-end">
          {/* Bookmark Toggle in Header */}
          <button
            onClick={onToggleSave}
            type="button"
            title={saved ? 'Saved' : 'Save'}
            className={`flex h-11 w-11 items-center justify-center rounded-[8px] ring-1 transition-all duration-200 ${
              saved
                ? 'bg-blue-50 text-blue-600 ring-blue-200'
                : 'bg-white text-slate-500 ring-slate-200 hover:bg-slate-50'
            }`}
          >
            <Bookmark className={`h-5 w-5 ${saved ? 'fill-current' : ''}`} />
          </button>

          {/* Shortlist Action Button */}
          <button
            className={`inline-flex h-11 items-center rounded-[8px] px-4 text-sm font-semibold ring-1 transition-all duration-200 ${
              shortlisted
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 ring-blue-600'
                : 'bg-white text-blue-700 ring-blue-100 hover:bg-blue-50'
            }`}
            type="button"
            onClick={onToggleShortlist}
          >
            {shortlisted ? 'Shortlisted' : 'Add to shortlist'}
          </button>

          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="flex h-11 w-11 items-center justify-center rounded-[8px] bg-white text-lg font-bold text-slate-500 ring-1 ring-slate-200 hover:bg-slate-50 hover:text-slate-800 transition"
              type="button"
              aria-label="Actions"
            >
              <MoreVertical className="h-4 w-4" />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-2 z-30 w-44 rounded-xl border border-slate-200 bg-white py-1.5 shadow-[0_12px_30px_rgba(15,23,42,0.12)] animate-[dropdownSlide_0.15s_ease-out]">
                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    onRemove(candidate.id);
                  }}
                  className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-xs font-semibold text-rose-600 hover:bg-rose-50/50 transition"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>Remove Candidate</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

function TabNav({ activeTab, candidate, onChange }) {
  // Compute dynamic counts based on the active candidate's actual items
  const skillsCount = makeSkillGroups(candidate).reduce((acc, g) => acc + g.skills.length, 0);
  const experienceCount = makeExperienceSignals(candidate).length;
  const projectsCount = candidate.projects.length;
  const evidenceCount = candidate.evidenceTrace.length;

  const dynamicCounts = {
    'Profile Fit': '',
    Skills: skillsCount,
    Experience: experienceCount,
    Projects: projectsCount,
    Evidence: evidenceCount,
    Activity: '',
  };

  return (
    <div className="flex gap-2 overflow-x-auto rounded-xl border border-white/40 bg-white/50 px-2 backdrop-blur-sm">
      {tabs.map((tab) => {
        const count = dynamicCounts[tab];
        return (
          <button
            key={tab}
            className={`shrink-0 border-b-2 px-4 py-2.5 text-sm transition-all duration-200 ${
              activeTab === tab ? 'border-blue-500 font-medium text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            type="button"
            onClick={() => onChange(tab)}
          >
            {tab}
            {count !== '' && count !== 0 ? (
              <span className="ml-2 rounded-full bg-blue-100/80 px-1.5 py-0.5 text-xs text-blue-700">
                {count}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

function getRecruiterDecision(candidate) {
  if (candidate.match >= 90) {
    return {
      action: 'Invite to assessment',
      confidence: 'High',
      confidenceValue: candidate.match,
      risk: candidate.potentialGap,
      nextStep: candidate.nextSteps[0] || 'Review strongest evidence',
    };
  }

  if (candidate.match >= 82) {
    return {
      action: 'Request focused review',
      confidence: 'Moderate-high',
      confidenceValue: candidate.match,
      risk: candidate.potentialGap,
      nextStep: candidate.nextSteps[0] || 'Validate role-critical skill',
    };
  }

  return {
    action: 'Keep warm',
    confidence: 'Needs verification',
    confidenceValue: candidate.match,
    risk: candidate.potentialGap,
    nextStep: candidate.nextSteps[0] || 'Collect stronger evidence',
  };
}

function RecruiterDecisionStrip({ candidate }) {
  const decision = getRecruiterDecision(candidate);
  const isHighConfidence = decision.confidence === 'High';
  const items = [
    { label: 'Recommended action', value: decision.action, tone: 'blue' },
    { label: 'Hiring confidence', value: `${decision.confidence} - ${decision.confidenceValue}%`, tone: isHighConfidence ? 'green' : 'amber' },
    { label: 'Key risk to verify', value: decision.risk, tone: 'amber' },
    { label: 'Suggested next step', value: decision.nextStep, tone: 'blue' },
  ];

  return (
    <div className="grid gap-3 xl:grid-cols-[1fr_0.9fr_1.35fr_1.15fr]">
      {items.map((item) => {
        const t = cardTone(item.tone);
        return (
          <div key={item.label} className={`min-w-0 rounded-xl p-4 ${glassCard(item.tone)}`}>
            <div className="flex items-center gap-2">
              <span className={`h-2 w-2 shrink-0 rounded-full ${t.dot}`} />
              <p className={`mb-1 text-xs ${t.body}`}>{item.label}</p>
            </div>
            <p className={`mt-2 truncate text-sm font-semibold ${t.title}`} title={item.value}>{item.value}</p>
          </div>
        );
      })}
    </div>
  );
}

function FitScoreBadge({ score, className }) {
  return (
    <div className={`absolute rounded-xl border border-white/60 bg-white/80 px-3 py-2 text-center shadow-sm backdrop-blur-md ${className}`}>
      <p className="text-xs text-gray-500">{score.label}</p>
      <p className="mt-1 text-lg font-semibold text-blue-600">{score.value}%</p>
    </div>
  );
}

function FitVisualization({ candidate, roleName }) {
  const dimensions = ROLE_DIMENSIONS[roleName] || ROLE_DIMENSIONS['Backend Intern'];
  // Scale each role dimension's baseline value by how this specific candidate's overall
  // match compares to a neutral 85 baseline, so the radar reflects the selected candidate.
  const matchOffset = (candidate.match - 85) * 0.4;
  const scores = dimensions.map((dim) => ({
    label: dim.label,
    value: Math.min(98, Math.max(60, Math.round(dim.value + matchOffset))),
  }));

  return (
    <section className="min-h-[520px] rounded-2xl border border-blue-200/50 bg-blue-100/20 p-5 backdrop-blur-md transition-all duration-200 hover:bg-blue-100/30">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-semibold text-blue-700">Profile Fit Overview</h3>
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/50 text-[10px] font-medium text-blue-500">i</span>
        </div>
        <button className="flex h-10 items-center gap-2 rounded-[8px] bg-blue-50 px-3 text-sm font-medium text-blue-700" type="button">
          <span className="flex h-5 w-5 items-center justify-center rounded bg-white ring-1 ring-blue-100">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
          </span>
          {roleName}
          <span className="text-blue-400">v</span>
        </button>
      </div>

      <div className="relative mx-auto mt-10 h-[430px] max-w-[680px]">
        <div className="absolute left-1/2 top-[48%] h-64 w-64 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[8px] border border-blue-100 bg-blue-50/40" />
        <div className="absolute left-1/2 top-[48%] h-52 w-52 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[8px] border border-blue-100 bg-white/60" />
        <div className="absolute left-1/2 top-[51%] h-44 w-44 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[8px] bg-gradient-to-br from-blue-100 via-sky-100 to-blue-200 shadow-[0_28px_60px_rgba(37,99,235,0.16)]" />
        <div className="absolute left-1/2 top-[57%] h-36 w-36 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[8px] bg-gradient-to-br from-blue-600 to-sky-400 shadow-[0_24px_44px_rgba(37,99,235,0.25)]" />
        <div className="absolute left-1/2 top-[43%] h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-[8px] border border-blue-100/90 bg-gradient-to-b from-blue-100/20 to-blue-300/35 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]" />
        <div className="absolute left-1/2 top-[38%] h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70 blur-xl" />
        <div className="absolute left-1/2 top-[45%] flex h-28 w-16 -translate-x-1/2 -translate-y-1/2 flex-col items-center">
          <div className="h-8 w-8 rounded-full bg-slate-900" />
          <div className="mt-1 h-16 w-10 rounded-t-full bg-white shadow-sm" />
          <div className="mt-[-4px] h-10 w-8 rounded-b-full bg-blue-700" />
        </div>

        {scores[0] ? <FitScoreBadge score={scores[0]} className="left-1/2 top-0 -translate-x-1/2" /> : null}
        {scores[1] ? <FitScoreBadge score={scores[1]} className="right-2 top-24" /> : null}
        {scores[2] ? <FitScoreBadge score={scores[2]} className="left-2 top-28" /> : null}
        {scores[3] ? <FitScoreBadge score={scores[3]} className="right-8 bottom-24" /> : null}
        {scores[4] ? <FitScoreBadge score={scores[4]} className="left-20 bottom-8" /> : null}
        {scores[5] ? <FitScoreBadge score={scores[5]} className="right-24 bottom-6" /> : null}
      </div>

      <p className="mt-3 text-center text-xs italic text-blue-500">Fit dimensions are role-specific for {roleName}</p>
    </section>
  );
}

function MatchAdvisorPanel({ candidate }) {
  return (
    <aside className={`rounded-2xl p-5 ${glassCard('blue')}`}>
      <p className="flex items-center gap-1 text-xs font-medium text-blue-500">
        <ShieldCheck className="h-3.5 w-3.5" />
        Evidence-backed fit
      </p>
      <h3 className="mb-3 mt-2 text-sm font-semibold text-blue-700">Why it's a strong match</h3>
      <div className="space-y-0">
        {candidate.fitReasons.map((reason) => (
          <div key={reason} className="mb-2 flex items-start gap-2">
            <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
            <p className="text-sm text-blue-600">{reason}</p>
          </div>
        ))}
      </div>

      <h4 className="mb-2 mt-4 text-sm font-semibold text-blue-700">Potential gap</h4>
      <div className="flex items-start gap-2">
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 rounded-full text-amber-600" />
        <p className="text-sm text-blue-600">{candidate.potentialGap}</p>
      </div>

      <h4 className="mb-2 mt-4 text-sm font-semibold text-blue-700">Suggested next steps</h4>
      <div className="space-y-3">
        {candidate.nextSteps.map((step, index) => (
          <button key={step} className="flex w-full items-center gap-3 rounded-xl px-2 py-1.5 text-left text-sm text-blue-600 transition-all duration-200 hover:bg-white/50" type="button">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-blue-200/60 bg-white/50 text-xs text-blue-700">{index + 1}</span>
            <span>{step}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}

function ProfileStatsRail({ stats }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
      {stats.map((stat) => (
        <div key={stat.label} className={`flex min-w-0 items-center rounded-xl px-4 py-2 ${glassCard('blue')}`}>
          <span className="mr-2 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
          <div className="min-w-0">
            <p className="truncate text-xs text-blue-500">{stat.label}</p>
            <p className="mt-0.5 truncate text-sm font-medium text-blue-700">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function ProfileFitTab({ candidate, roleName }) {
  return (
    <div className="space-y-5">
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
        <FitVisualization candidate={candidate} roleName={roleName} />
        <MatchAdvisorPanel candidate={candidate} />
      </div>
      <ProfileStatsRail stats={candidate.profileStats} />
    </div>
  );
}

function TrustBadge({ label = 'Verified', tone = 'green' }) {
  const tones = {
    green: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
    blue: 'bg-blue-50 text-blue-700 ring-blue-100',
    violet: 'bg-violet-50 text-violet-700 ring-violet-100',
    slate: 'bg-slate-50 text-slate-600 ring-slate-100',
  };

  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${tones[tone] || tones.green}`}>{label}</span>;
}

function ProgressBar({ value, tone = 'blue' }) {
  const fills = {
    blue: 'from-blue-50 to-sky-400',
    green: 'from-emerald-500 to-teal-400',
    violet: 'from-violet-500 to-indigo-400',
  };

  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
      <div className={`h-full rounded-full bg-gradient-to-r ${fills[tone] || fills.blue}`} style={{ width: `${value}%` }} />
    </div>
  );
}

function IntelligenceHeader({ title, subtitle, action }) {
  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h3 className="text-base font-semibold text-slate-950">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-slate-500">{subtitle}</p>
      </div>
      {action}
    </div>
  );
}

function makeSkillGroups(candidate) {
  const evidenceSkills = candidate.evidenceTrace.map((item) => item.skill);
  const primary = candidate.topSkills[0] || evidenceSkills[0] || 'Role fundamentals';
  const secondary = candidate.topSkills[1] || evidenceSkills[1] || 'Analysis';
  const tertiary = candidate.topSkills[2] || evidenceSkills[2] || 'Communication';

  return [
    {
      group: 'Core Technical',
      tone: 'blue',
      skills: [
        { name: primary, note: 'Advanced execution in role-critical workflows', confidence: Math.min(candidate.match + 3, 96), verification: 'Verified', evidence: 3, lastUsed: '2 weeks ago', trace: `Connected to ${candidate.evidenceTrace[0]?.source || candidate.projects[0]?.title}. Review the source artifact before technical screen.` },
        { name: candidate.targetRole.includes('Frontend') ? 'TypeScript' : 'Python', note: 'Applied in project implementation and analysis notes', confidence: Math.max(candidate.match - 8, 76), verification: 'Assessed', evidence: 2, lastUsed: '1 month ago', trace: 'Assessment score and project comments show working fluency, not only keyword mention.' },
      ],
    },
    {
      group: 'Analytics & BI',
      tone: 'green',
      skills: [
        { name: secondary, note: 'Turns raw signals into decision-ready outcomes', confidence: Math.max(candidate.match - 4, 78), verification: 'Verified', evidence: 3, lastUsed: '3 weeks ago', trace: `Backed by ${candidate.evidenceTrace[1]?.source || 'project evidence'} and recent activity.` },
        { name: 'Data Modelling', note: 'Can structure metrics, dimensions, and reporting logic', confidence: Math.max(candidate.match - 12, 72), verification: 'Inferred', evidence: 2, lastUsed: '2 months ago', trace: 'Inferred from project architecture, dashboard notes, and data cleaning workflow.' },
      ],
    },
    {
      group: 'Communication',
      tone: 'violet',
      skills: [
        { name: 'Stakeholder Reporting', note: 'Explains work in business language', confidence: Math.max(candidate.match - 18, 68), verification: 'Inferred', evidence: 2, lastUsed: '1 month ago', trace: 'Evidence exists, but live walkthrough would improve hiring confidence.' },
      ],
    },
    {
      group: 'Product / Business',
      tone: 'amber',
      skills: [
        { name: tertiary, note: 'Maps work to user or business outcomes', confidence: Math.max(candidate.match - 10, 74), verification: 'Verified', evidence: 2, lastUsed: '2 weeks ago', trace: `Supported by ${candidate.projects[0]?.title || 'portfolio project'} and fit reasoning.` },
      ],
    },
  ];
}

function verificationTone(verification) {
  if (verification === 'Verified') return 'green';
  if (verification === 'Assessed') return 'violet';
  return 'blue';
}

// Keep a dynamic implementation for Experience tab details
function makeExperienceSignals(candidate) {
  const fallback = {
    title: candidate.targetRole.includes('Frontend') ? 'Product UI Contributor' : 'Business Intelligence Assistant',
    org: candidate.university,
    period: 'May 2024 - Aug 2024',
    impact: candidate.targetRole.includes('Frontend') ? 'Built reusable UI patterns for a campus product prototype.' : 'Built KPI tracking system for campus engagement reporting.',
  };

  return [...candidate.experience, fallback].slice(0, 3).map((item, index) => ({
    ...item,
    duration: index === 0 ? '4 months' : index === 1 ? '8 months' : '4 months',
    proof: index === 0 ? candidate.topSkills : index === 1 ? ['Communication', 'Leadership', candidate.topSkills[1] || 'Reporting'] : ['Reporting', candidate.topSkills[2] || 'Execution'],
    evidence: Math.max(2, candidate.evidenceCount - index - 7),
    detail: `This experience supports hiring confidence because it connects ${item.impact.toLowerCase()} to observable work artifacts and skill signals.`,
  }));
}

function TabCta({ title, description, action }) {
  return (
    <div className="mt-4 flex flex-col gap-3 rounded-[8px] border border-slate-200 bg-slate-50/60 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-semibold text-slate-950">{title}</p>
        <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
      </div>
      <button className="inline-flex h-10 shrink-0 items-center justify-center rounded-[8px] bg-blue-600 px-4 text-sm font-semibold text-white hover:bg-blue-700" type="button">
        {action}
      </button>
    </div>
  );
}

function SkillsTab({ candidate }) {
  const [selectedGroup, setSelectedGroup] = useState('Core Technical');
  const [expandedSkill, setExpandedSkill] = useState(null);
  const groups = makeSkillGroups(candidate);
  const activeGroup = groups.find((group) => group.group === selectedGroup) || groups[0];
  const [leadSkill, ...supportingSkills] = activeGroup.skills;

  return (
    <div>
      <IntelligenceHeader
        title="Skill Intelligence"
        subtitle={`Role-critical skills are weighted by confidence, evidence depth, and recency for ${candidate.targetRole}.`}
        action={<div className="flex rounded-[8px] border border-slate-200 bg-white p-1 text-sm"><button className="rounded-md bg-blue-50 px-3 py-1.5 font-medium text-blue-700" type="button">Skill groups</button><button className="px-3 py-1.5 text-slate-500" type="button">All skills</button></div>}
      />
      <div className="grid gap-4 lg:grid-cols-[260px_minmax(0,1fr)]">
        <div className="overflow-hidden rounded-[8px] border border-slate-200 bg-white">
          {groups.map((group) => (
            <button
              key={group.group}
              className={`flex w-full items-center justify-between border-b border-slate-100 px-4 py-4 text-left text-sm last:border-b-0 ${group.group === activeGroup.group ? 'bg-blue-50/55 text-slate-950' : 'text-slate-650 hover:bg-slate-50'}`}
              type="button"
              onClick={() => setSelectedGroup(group.group)}
            >
              <span className="font-medium">{group.group}</span>
              <span className="rounded-full bg-white px-2 py-0.5 text-xs text-slate-505 ring-1 ring-slate-200">{group.skills.length}</span>
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {leadSkill ? (
            <article className="rounded-[8px] border border-blue-200 bg-blue-50/45 p-4">
              <div className="grid gap-4 lg:grid-cols-[minmax(180px,0.8fr)_minmax(0,1.2fr)_170px] lg:items-center">
                <div>
                  <p className="text-xs font-medium text-blue-700">Lead signal</p>
                  <h4 className="mt-1 text-base font-semibold text-slate-950">{leadSkill.name}</h4>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{leadSkill.note}</p>
                </div>
                <div>
                  <div className="mb-2 flex items-center justify-between text-xs text-slate-600">
                    <span>Role-critical confidence</span>
                    <span className="font-medium text-slate-800">{leadSkill.confidence}%</span>
                  </div>
                  <ProgressBar value={leadSkill.confidence} tone="blue" />
                  <p className="mt-2 text-xs leading-5 text-slate-600">{leadSkill.trace}</p>
                </div>
                <div className="rounded-[8px] border border-blue-100 bg-white p-3">
                  <TrustBadge label={leadSkill.verification} tone={verificationTone(leadSkill.verification)} />
                  <p className="mt-3 text-sm font-medium text-slate-950">{leadSkill.evidence} linked evidence</p>
                  <p className="mt-1 text-xs text-slate-505">Last used {leadSkill.lastUsed}</p>
                </div>
              </div>
            </article>
          ) : null}

          <div className="overflow-hidden rounded-[8px] border border-slate-200 bg-white">
            <div className="hidden grid-cols-[minmax(180px,0.85fr)_minmax(0,1.15fr)_170px] gap-4 border-b border-slate-100 bg-slate-50/70 px-4 py-3 text-xs font-medium text-slate-500 lg:grid">
              <span>Signal</span><span>Proof</span><span>Trust / action</span>
            </div>
            {supportingSkills.map((skill) => {
              const expanded = expandedSkill === skill.name;
              return (
                <div key={skill.name} className="border-b border-slate-100 last:border-b-0">
                  <button
                    className="grid w-full gap-3 px-4 py-4 text-left hover:bg-slate-50/70 lg:grid-cols-[minmax(180px,0.85fr)_minmax(0,1.15fr)_170px] lg:items-center"
                    type="button"
                    onClick={() => setExpandedSkill(expanded ? null : skill.name)}
                  >
                    <div>
                      <p className="text-sm font-semibold text-slate-950">{skill.name}</p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">{skill.note}</p>
                    </div>
                    <div className="min-w-0">
                      <div className="mb-1.5 flex items-center justify-between text-xs text-slate-500">
                        <span>{skill.evidence} evidence - last used {skill.lastUsed}</span>
                        <span className="font-medium text-slate-700">{skill.confidence}%</span>
                      </div>
                      <ProgressBar value={skill.confidence} tone={activeGroup.tone === 'green' ? 'green' : 'blue'} />
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <TrustBadge label={skill.verification} tone={verificationTone(skill.verification)} />
                      <span className="text-slate-400">{expanded ? '^' : 'v'}</span>
                    </div>
                  </button>
                  {expanded ? (
                    <div className="bg-slate-50/60 px-4 pb-4 text-sm leading-6 text-slate-600">
                      <div className="rounded-[8px] border border-slate-200 bg-white p-3">
                        <span className="font-medium text-slate-800">Evidence trace: </span>{skill.trace}
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-3 rounded-[8px] border border-slate-200 bg-white px-4 py-3 text-xs leading-5 text-slate-500">
        <TrustBadge label="Verified" tone="green" /> Verified by projects, assessments, or reviewed work
        <TrustBadge label="Inferred" tone="blue" /> Inferred from related evidence
        <TrustBadge label="Assessed" tone="violet" /> Tested through assessment
      </div>
      <TabCta
        title="Ready to validate role-critical skills"
        description={`Send a short assessment focused on ${leadSkill?.name || candidate.topSkills[0]} and the current evidence gap.`}
        action="Send technical assessment"
      />
    </div>
  );
}

function ExperienceTab({ candidate }) {
  const [expanded, setExpanded] = useState(null);
  const items = makeExperienceSignals(candidate);

  return (
    <div>
      <IntelligenceHeader title="Career Story Timeline" subtitle="Experience is interpreted as evidence of role readiness, not only resume history." />
      <div className="grid gap-4 lg:grid-cols-[180px_minmax(0,1fr)]">
        <div className="relative hidden lg:block">
          <div className="absolute left-5 top-4 h-[calc(100%-2rem)] w-px bg-blue-100" />
          {items.map((item) => (
            <div key={`${item.title}-${item.period}`} className="relative mb-24 pl-12">
              <span className="absolute left-[13px] top-1 flex h-4 w-4 rounded-full border-2 border-blue-500 bg-white" />
              <p className="text-sm font-medium text-slate-700">{item.period}</p>
              <p className="mt-1 text-xs text-slate-505">{item.duration}</p>
            </div>
          ))}
        </div>
        <div className="space-y-3">
          {items.map((item, index) => {
            const open = expanded === index;
            return (
              <article key={`${item.title}-${item.period}`} className="rounded-[8px] border border-slate-200 bg-white p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-950">{item.title}</p>
                    <p className="mt-1 text-sm text-slate-500">{item.org}</p>
                    <p className="mt-3 inline-flex rounded-[8px] bg-slate-50 px-3 py-1.5 text-sm leading-5 text-slate-700">{item.impact}</p>
                  </div>
                  <TrustBadge label="Verified" tone="green" />
                </div>
                <div className="mt-4 grid gap-4 sm:grid-cols-[minmax(0,1fr)_150px] sm:items-end">
                  <div>
                    <p className="text-xs font-medium text-slate-500">What this experience proves</p>
                    <div className="mt-2 flex flex-wrap gap-2">{item.proof.map((skill) => <SkillPill key={skill}>{skill}</SkillPill>)}</div>
                  </div>
                  <button className="flex items-center justify-between rounded-[8px] border border-slate-200 px-3 py-2 text-sm font-medium text-slate-650 hover:bg-slate-50" type="button" onClick={() => setExpanded(open ? null : index)}>
                    <span>{item.evidence} evidence</span><span>{open ? '^' : 'v'}</span>
                  </button>
                </div>
                {open ? <p className="mt-3 border-t border-slate-100 pt-3 text-sm leading-6 text-slate-600">{item.detail}</p> : null}
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function makeProjectShowcase(candidate) {
  return candidate.projects.map((project, index) => ({
    ...project,
    description: project.outcome,
    skills: index === 0 ? candidate.topSkills : [candidate.topSkills[1] || 'Analysis', 'Experimentation', 'Product sense'],
    impact: index === 0 ? 'Improves confidence in practical delivery and dashboard judgment.' : 'Shows analytical framing and business recommendation quality.',
    links: index === 0 ? ['Live demo', 'Repo', 'Notes'] : ['Notebook', 'Insight memo', 'Review notes'],
    proves: index === 0 ? ['Technical execution', 'Business insight', 'Evidence maturity'] : ['Analytical thinking', 'Experimentation', 'Product sense'],
    trust: Math.max(candidate.trustScore - index * 4, 82),
  }));
}

function ProjectsTab({ candidate }) {
  const projects = makeProjectShowcase(candidate);
  const primaryProject = projects[0];

  return (
    <div>
      <IntelligenceHeader title="Evidence-backed Project Showcase" subtitle="Projects are scored by artifact quality, business relevance, and traceability to role skills." />
      <div className="space-y-4">
        {projects.map((project, index) => (
          <article key={project.title} className="grid gap-4 rounded-[8px] border border-slate-200 bg-white p-4 lg:grid-cols-[180px_minmax(0,1fr)_92px]">
            <div className="h-32 rounded-[8px] border border-slate-200 bg-[linear-gradient(135deg,#0f172a,#1e40af_55%,#e0f2fe)] p-3">
              <div className="h-full rounded border border-white/10 bg-white/10 p-2">
                <div className="h-3 w-20 rounded bg-white/25" />
                <div className="mt-8 grid grid-cols-5 items-end gap-1">{[32, 58, 44, 70, 52].map((height) => <span key={`${project.title}-${height}`} className="rounded-sm bg-sky-300/80" style={{ height }} />)}</div>
              </div>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-950">{project.title}</p>
              <p className="mt-1 text-sm font-medium text-blue-600">{project.proof}</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">{project.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">{project.skills.map((skill) => <SkillPill key={skill}>{skill}</SkillPill>)}</div>
              <div className="mt-4 grid gap-3 border-t border-slate-100 pt-4 md:grid-cols-2">
                <div><p className="text-xs font-medium text-slate-500">Business impact</p><p className="mt-1 text-sm leading-6 text-slate-600">{project.impact}</p></div>
                <div><p className="text-xs font-medium text-slate-500">What this project proves</p><div className="mt-2 flex flex-wrap gap-2">{project.proves.map((item) => <TrustBadge key={item} label={item} tone="green" />)}</div></div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">{project.links.map((link) => <button key={link} className="rounded-full bg-slate-50 px-3 py-1 text-xs font-medium text-slate-650 ring-1 ring-slate-200" type="button">{link}</button>)}</div>
            </div>
            <div className="flex items-start justify-end">
              <div className="rounded-[8px] bg-emerald-50 px-4 py-3 text-center ring-1 ring-emerald-100">
                <p className="text-lg font-semibold text-emerald-700">{project.trust}%</p>
                <p className="text-xs text-emerald-600">Trusted</p>
              </div>
            </div>
          </article>
        ))}
      </div>
      <TabCta
        title="Best next check: project walkthrough"
        description={`Ask ${candidate.name.split(' ')[0]} to walk through ${primaryProject?.title || 'the strongest project'} and explain the business decisions behind the artifact.`}
        action="Request walkthrough"
      />
    </div>
  );
}

function EvidenceTab({ candidate }) {
  const [expanded, setExpanded] = useState(null);
  const items = candidate.evidenceTrace.map((item, index) => ({
    ...item,
    type: index === 0 ? 'Project' : index === 1 ? 'Walkthrough' : 'Assessment',
    linked: candidate.projects[index % candidate.projects.length]?.title || candidate.experience[0]?.title,
    verifiedBy: index === 0 ? 'Verified by GitHub' : index === 1 ? 'Verified by mentor review' : 'Verified by CareerOS',
    date: index === 0 ? 'Mar 15, 2026' : index === 1 ? 'Mar 10, 2026' : 'Mar 05, 2026',
  }));

  return (
    <div>
      <IntelligenceHeader
        title="Evidence Verification Feed"
        subtitle="Every skill signal is traceable to a source, artifact, project, or reviewed experience."
        action={<button className="rounded-[8px] border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600" type="button">Newest first</button>}
      />
      <div className="mb-4 flex gap-2 overflow-x-auto text-sm">
        {['All evidence', 'Verified', 'Projects', 'Assessments', 'Work'].map((filter, index) => <button key={filter} className={`shrink-0 rounded-full px-3 py-1.5 ${index === 0 ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-100' : 'bg-white text-slate-500 ring-1 ring-slate-200'}`} type="button">{filter}</button>)}
      </div>
      <div className="space-y-3">
        {items.map((item, index) => {
          const open = expanded === index;
          return (
            <article key={`${item.source}-${item.skill}`} className="rounded-[8px] border border-slate-200 bg-white">
              <button className="grid w-full gap-4 p-4 text-left hover:bg-slate-50/70 md:grid-cols-[56px_minmax(0,1fr)_90px_180px_24px] md:items-center" type="button" onClick={() => setExpanded(open ? null : index)}>
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-700 ring-1 ring-blue-100">{item.skill.slice(0, 2)}</span>
                <div><p className="text-sm font-semibold text-slate-950">{item.source}</p><p className="mt-1 text-sm leading-6 text-slate-600">{item.type} - Linked to {item.skill}</p><p className="text-xs text-slate-550">{item.detail}</p></div>
                <div className="rounded-[8px] bg-emerald-50 px-3 py-2 text-center ring-1 ring-emerald-100"><p className="text-sm font-semibold text-emerald-700">{item.confidence}%</p><p className="text-xs text-emerald-600">trusted</p></div>
                <div><p className="text-sm text-slate-700">{item.verifiedBy}</p><p className="mt-1 text-xs text-slate-500">{item.date}</p></div>
                <span className="text-slate-400">{open ? '^' : '>'}</span>
              </button>
              {open ? <div className="border-t border-slate-100 px-4 py-3 text-sm leading-6 text-slate-600"><span className="font-medium text-slate-800">Traceability: </span>{item.linked} confirms {item.skill} through reviewed artifact evidence. Recommended next check: ask candidate to explain the artifact decisions live.</div> : null}
            </article>
          );
        })}
      </div>
      <TabCta
        title="Verify the strongest source before moving forward"
        description={`Start with ${items[0]?.source || 'the highest-trust evidence'} because it carries the clearest role-critical signal.`}
        action="Verify source"
      />
    </div>
  );
}

function ActivityTab({ candidate }) {
  const items = candidate.activity.map((activity, index) => ({
    action: activity,
    signal: index === 0 ? `Strengthened ${candidate.topSkills[0]} evidence` : index === 1 ? `${candidate.topSkills[1] || 'Skill'} confidence increased` : `Added ${candidate.topSkills[2] || 'role'} signal`,
    impact: `+${Math.max(4 - index, 1)}% ${candidate.targetRole} confidence`,
    recency: index === 0 ? '2 hours ago' : index === 1 ? '1 day ago' : '3 days ago',
  }));

  return (
    <div>
      <IntelligenceHeader title="Career Signal Timeline" subtitle="Recent updates show how candidate evidence changes hiring confidence over time." action={<button className="rounded-[8px] border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600" type="button">All types</button>} />
      <div className="relative space-y-0 rounded-[8px] border border-slate-200 bg-white p-4">
        <div className="absolute bottom-8 left-10 top-8 w-px bg-blue-100" />
        {items.map((item) => (
          <div key={item.action} className="relative grid gap-3 border-b border-slate-100 py-4 pl-16 last:border-b-0 md:grid-cols-[minmax(0,1fr)_140px_100px] md:items-center">
            <span className="absolute left-4 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 ring-1 ring-blue-100"><span className="h-2 w-2 rounded-full bg-blue-500" /></span>
            <div><p className="text-sm font-semibold text-slate-950">{item.action}</p><p className="mt-1 text-sm leading-6 text-slate-600">{item.signal}</p></div>
            <TrustBadge label={item.impact} tone="green" />
            <p className="text-sm text-slate-500 md:text-right">{item.recency}</p>
          </div>
        ))}
      </div>
      <TabCta
        title="Use the latest signal to update next steps"
        description={`${items[0]?.action || 'Latest activity'} changed match confidence. Review whether this candidate should move to assessment or remain in review.`}
        action="Review latest signal"
      />
    </div>
  );
}

function DetailList({ items, type }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {items.map((item) => (
        <article key={`${item.title}-${item.org || item.proof}`} className="rounded-[8px] border border-slate-200 bg-white p-5">
          <p className="text-sm font-semibold text-slate-950">{item.title}</p>
          <p className="mt-1 text-xs font-medium leading-5 text-blue-600">{type === 'experience' ? `${item.org} - ${item.period}` : item.proof}</p>
          <p className="mt-3 text-sm font-normal leading-6 text-slate-600">{type === 'experience' ? item.impact : item.outcome}</p>
        </article>
      ))}
    </div>
  );
}

function TabPanel({ candidate, activeTab, roleName }) {
  if (activeTab === 'Profile Fit') return <ProfileFitTab candidate={candidate} roleName={roleName} />;
  if (activeTab === 'Skills') return <SkillsTab candidate={candidate} />;
  if (activeTab === 'Experience') return <ExperienceTab candidate={candidate} />;
  if (activeTab === 'Projects') return <ProjectsTab candidate={candidate} />;
  if (activeTab === 'Evidence') return <EvidenceTab candidate={candidate} />;
  if (activeTab === 'Activity') return <ActivityTab candidate={candidate} />;
  return <DetailList items={candidate.experience} type="experience" />;
}

export default function EmployerWorkspacePage() {
  const [candidates, setCandidates] = useState(employerTalentWorkspace.candidates);

  // Set up state variables
  const [selectedCandidateId, setSelectedCandidateId] = useState(candidates[0]?.id || null);
  const [activeTab, setActiveTab] = useState('Profile Fit');
  const [selectedRole, setSelectedRole] = useState('Backend Intern');
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedTab = searchParams.get('tab') || 'all';
  const setSelectedTab = (newTab) => {
    setSearchParams({ tab: newTab });
  };
  const [selectedSort, setSelectedSort] = useState('bestMatch');
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

  // Read global search store states
  const { searchQuery: globalQuery, chipsByPage } = useEmployerSearchStore();
  const activeChips = chipsByPage.talent;

  // Listen for search selections
  useEffect(() => {
    const handleSearchSelectCandidate = (e) => {
      const detail = e.detail;
      if (detail && detail.candidateId) {
        setSelectedCandidateId(detail.candidateId);
        setActiveTab('Profile Fit');
      }
    };
    window.addEventListener('employer-search-select-candidate', handleSearchSelectCandidate);
    return () => window.removeEventListener('employer-search-select-candidate', handleSearchSelectCandidate);
  }, []);

  // Read shortlist and saved Sets from Zustand store
  const shortlistedIds = useEmployerSearchStore((state) => state.shortlistedIds);
  const savedIds = useEmployerSearchStore((state) => state.savedIds);
  const toggleShortlist = useEmployerSearchStore((state) => state.toggleShortlist);
  const toggleSave = useEmployerSearchStore((state) => state.toggleSave);

  // Remove candidate action
  const handleRemoveCandidate = (candidateId) => {
    const candidateToRemove = candidates.find((c) => c.id === candidateId);
    if (!candidateToRemove) return;

    const confirmRemove = window.confirm(`Are you sure you want to remove ${candidateToRemove.name} from your workspace?`);
    if (confirmRemove) {
      // Find the next candidate to select from the CURRENT filtered list
      const currentIndex = currentFilteredList.findIndex((c) => c.id === candidateId);
      let nextSelectedId = null;
      if (currentIndex !== -1 && currentFilteredList.length > 1) {
        const nextCand = currentFilteredList[currentIndex + 1] || currentFilteredList[currentIndex - 1];
        if (nextCand) {
          nextSelectedId = nextCand.id;
        }
      }

      setCandidates((prev) => prev.filter((c) => c.id !== candidateId));

      if (selectedCandidateId === candidateId) {
        setSelectedCandidateId(nextSelectedId);
      }
    }
  };

  // Candidates who applied to the currently selected role card
  const roleCandidates = useMemo(
    () => candidates.filter((c) => CANDIDATE_ROLE_MAP[c.id] === selectedRole),
    [candidates, selectedRole]
  );

  // Reset the selected candidate whenever the role filter changes
  useEffect(() => {
    setSelectedCandidateId(roleCandidates[0]?.id || null);
    setActiveTab('Profile Fit');
  }, [selectedRole]);

  // Filtered list computed for current view
  const currentFilteredList = useMemo(() => {
    return roleCandidates.filter((c) => {
      // 1. Search Query
      if (globalQuery) {
        const q = globalQuery.toLowerCase();
        const matchesSearch =
          c.name.toLowerCase().includes(q) ||
          c.targetRole.toLowerCase().includes(q) ||
          c.university.toLowerCase().includes(q) ||
          c.topSkills.some((s) => s.toLowerCase().includes(q));
        if (!matchesSearch) return false;
      }

      // 2. Active Search Chips Filter
      if (activeChips.length > 0) {
        const candidateChips = activeChips.filter(ch => ch.type === 'candidate');
        const skillChips = activeChips.filter(ch => ch.type === 'skill');
        const roleChips = activeChips.filter(ch => ch.type === 'role');

        if (candidateChips.length > 0) {
          const matchesCand = candidateChips.some(ch => c.name.toLowerCase() === ch.value.toLowerCase());
          if (!matchesCand) return false;
        }

        if (skillChips.length > 0) {
          const hasAllSkills = skillChips.every(ch =>
            c.topSkills.some(s => s.toLowerCase() === ch.value.toLowerCase()) ||
            c.evidenceTrace.some(e => e.skill.toLowerCase() === ch.value.toLowerCase())
          );
          if (!hasAllSkills) return false;
        }

        if (roleChips.length > 0) {
          const matchesRole = roleChips.some(ch => c.targetRole.toLowerCase() === ch.value.toLowerCase());
          if (!matchesRole) return false;
        }
      }

      // 3. Tab Filter
      if (selectedTab === 'shortlisted') {
        return shortlistedIds.has(c.id);
      }
      if (selectedTab === 'saved') {
        return savedIds.has(c.id);
      }
      return true;
    });
  }, [roleCandidates, globalQuery, activeChips, selectedTab, shortlistedIds, savedIds]);

  // Selected candidate pointer
  const selectedCandidate = useMemo(() => {
    let cand = currentFilteredList.find((c) => c.id === selectedCandidateId);
    if (!cand && currentFilteredList.length > 0) {
      cand = currentFilteredList[0];
    }
    return cand || null;
  }, [currentFilteredList, selectedCandidateId]);

  return (
    <div className="employer-workspace-page flex h-screen w-screen flex-col overflow-hidden">
      <EmployerWorkspaceTopNav active="Candidates" />

      <div className="relative z-10 flex flex-1 gap-5 overflow-hidden px-8 py-6">
        <CandidateSidebar selectedRole={selectedRole} onSelectRole={setSelectedRole} />

        {/* Right main area */}
        <div className="flex flex-1 flex-col gap-4 overflow-hidden">
          {/* Section A: candidate cards row */}
          <CandidateRow
            candidates={roleCandidates}
            selectedId={selectedCandidate ? selectedCandidate.id : null}
            shortlistedIds={shortlistedIds}
            savedIds={savedIds}
            selectedTab={selectedTab}
            selectedSort={selectedSort}
            searchQuery={globalQuery}
            isSortDropdownOpen={isSortDropdownOpen}
            roleName={selectedRole}
            onSelect={(candidateId) => {
              setSelectedCandidateId(candidateId);
              setActiveTab('Profile Fit');
            }}
            onTabChange={setSelectedTab}
            onSortChange={setSelectedSort}
            onSearchChange={useEmployerSearchStore.getState().setSearchQuery}
            onToggleSortDropdown={() => setIsSortDropdownOpen((prev) => !prev)}
            onCloseSortDropdown={() => setIsSortDropdownOpen(false)}
          />

          {/* Section B: candidate detail, fills remaining height */}
          <div className="flex-1 overflow-y-auto">
            {currentFilteredList.length > 0 && selectedCandidate ? (
              <div className="space-y-4 pb-2">
                <CandidateHeader
                  candidate={selectedCandidate}
                  shortlisted={shortlistedIds.has(selectedCandidate.id)}
                  saved={savedIds.has(selectedCandidate.id)}
                  onToggleShortlist={() => toggleShortlist(selectedCandidate.id)}
                  onToggleSave={() => toggleSave(selectedCandidate.id)}
                  onRemove={handleRemoveCandidate}
                />
                <TabNav activeTab={activeTab} candidate={selectedCandidate} onChange={setActiveTab} />
                <RecruiterDecisionStrip candidate={selectedCandidate} />
                <TabPanel candidate={selectedCandidate} activeTab={activeTab} roleName={selectedRole} />
              </div>
            ) : (
              /* Empty Workspace Panel when tab yields nothing */
              <div className="flex h-[400px] flex-col items-center justify-center rounded-2xl border border-white/50 bg-white/60 p-6 text-center backdrop-blur-md shadow-[0_18px_54px_rgba(15,23,42,0.05)]">
                <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-blue-600">
                  <Search className="h-7 w-7" />
                </span>
                <h3 className="text-lg font-bold text-slate-800">No Candidates Selected</h3>
                <p className="mt-1 text-sm text-slate-500 max-w-sm">
                  {selectedTab === 'shortlisted'
                    ? 'Your shortlist is currently empty. Add candidates to your shortlist from the All Candidates tab.'
                    : selectedTab === 'saved'
                    ? 'You have no saved candidates. Save candidates to view them here.'
                    : 'No candidates matched your search keywords.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes dropdownSlide {
          from { opacity: 0; transform: scale(0.95) translateY(-5px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}} />
    </div>
  );
}
