import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useEmployerSearchStore } from '../../store/useEmployerSearchStore';

const navItems = [
  { label: 'Talent Discovery', path: '/employer/talent', aliases: ['/employer'] },
  { label: 'Create Engagement', path: '/employer/posting', aliases: [] },
  { label: 'Job Marketplace', path: '/employer/marketplace', aliases: [] },
  { label: 'Saved Searches', path: '/employer/talent?tab=saved', aliases: [] },
  { label: 'Shortlists', path: '/employer/talent?tab=shortlisted', aliases: [] },
];

export default function EmployerSidebar() {
  const location = useLocation();
  const shortlistedIds = useEmployerSearchStore((state) => state.shortlistedIds);
  const savedIds = useEmployerSearchStore((state) => state.savedIds);

  const isItemActive = (item) => {
    const currentPath = location.pathname;
    const currentSearch = location.search;

    if (item.path.includes('?tab=')) {
      const tabParam = item.path.split('?tab=')[1];
      return currentPath === '/employer/talent' && currentSearch.includes(`tab=${tabParam}`);
    }

    if (item.path === '/employer/talent') {
      return (currentPath === '/employer/talent' || item.aliases.includes(currentPath)) &&
             (!currentSearch.includes('tab=saved') && !currentSearch.includes('tab=shortlisted'));
    }

    return currentPath === item.path || item.aliases.includes(currentPath);
  };

  return (
    <aside className="hidden h-screen w-72 shrink-0 border-r border-white/70 bg-white/85 px-5 py-6 shadow-[8px_0_30px_rgba(15,23,42,0.03)] backdrop-blur-xl lg:flex lg:flex-col">
      <div className="mb-9 flex items-center gap-3">
        <Link to="/" className="flex h-11 w-11 items-center justify-center rounded-[8px] bg-gradient-to-br from-blue-500 to-violet-500 text-xl font-semibold text-white shadow-lg shadow-blue-100">
          C
        </Link>
        <div>
          <Link to="/" className="text-xl font-semibold text-slate-950">CareerOS</Link>
          <p className="mt-1 text-sm text-blue-600">Employer Workspace</p>
        </div>
      </div>
      
      {/* Flat list of all Navigation Items without sectioning */}
      <nav className="space-y-2">
        {navItems.map((item) => {
          const active = isItemActive(item);
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                active
                  ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-100'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
              }`}
            >
              <span>{item.label}</span>
              {item.label === 'Shortlists' && shortlistedIds.size > 0 && (
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${active ? 'bg-blue-100 text-blue-800' : 'bg-blue-50 text-blue-700'}`}>
                  {shortlistedIds.size}
                </span>
              )}
              {item.label === 'Saved Searches' && savedIds.size > 0 && (
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${active ? 'bg-emerald-100 text-emerald-800' : 'bg-emerald-50 text-emerald-700'}`}>
                  {savedIds.size}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}

