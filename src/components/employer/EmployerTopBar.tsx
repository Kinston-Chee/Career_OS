import { useLocation } from 'react-router-dom';
import SignOutButton from '../session/SignOutButton';
import GlobalEmployerSearch from './GlobalEmployerSearch';
import SearchChip from './SearchChip';
import { useEmployerSearchStore } from '../../store/useEmployerSearchStore';

export default function EmployerTopBar() {
  const location = useLocation();
  const { chipsByPage, removeChip, clearChips } = useEmployerSearchStore();

  const getActivePage = (): 'talent' | 'insights' | 'engagement' => {
    const path = location.pathname;
    if (path.includes('/insights')) return 'insights';
    if (path.includes('/posting')) return 'engagement';
    return 'talent';
  };

  const activePage = getActivePage();
  const activeChips = chipsByPage[activePage];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white">
      <div className="flex w-full items-center justify-between gap-5 px-4 py-4 sm:px-6 lg:px-8">
        {/* Global search coordination bar */}
        <GlobalEmployerSearch />

        <button className="flex h-11 w-11 items-center justify-center rounded-[8px] border border-slate-200 bg-white text-blue-700 shadow-sm hover:bg-slate-50 transition" type="button">
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
            <path d="M10 21h4" />
          </svg>
        </button>
        <div className="flex items-center gap-3 bg-white px-2 py-1">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-blue-600 text-sm font-semibold text-white shadow-lg shadow-blue-100">
            AC
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium leading-5 text-slate-950">Alex Chan</p>
            <p className="text-xs font-normal leading-4 text-slate-500">Acme Corp</p>
          </div>
          <span className="text-slate-400" aria-hidden="true">▼</span>
        </div>
        <SignOutButton tone="indigo" compact />
      </div>

      {/* Persistent Active Search Chips Sub-header bar */}
      {activeChips.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 bg-slate-50/50 px-4 py-2.5 sm:px-6 lg:px-8">
          <span className="text-[10px] font-extrabold tracking-wider text-slate-400 uppercase mr-1">Active Filters:</span>
          {activeChips.map((chip) => (
            <SearchChip
              key={chip.id}
              chip={chip}
              onRemove={(id) => removeChip(activePage, id)}
            />
          ))}
          <button
            onClick={() => clearChips(activePage)}
            className="text-[10px] font-extrabold text-blue-600 hover:text-blue-700 ml-1.5 transition uppercase"
            type="button"
          >
            Clear All
          </button>
        </div>
      )}
    </header>
  );
}
