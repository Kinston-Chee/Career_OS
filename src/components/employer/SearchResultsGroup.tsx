import React from 'react';

interface SearchResultsGroupProps {
  title: string;
  query: string;
  footerLabel: string;
  onFooterClick: () => void;
  children: React.ReactNode;
}

export default function SearchResultsGroup({
  title,
  query,
  footerLabel,
  onFooterClick,
  children,
}: SearchResultsGroupProps) {
  return (
    <div className="border-b border-slate-100 last:border-b-0 py-3">
      <div className="px-4">
        <h4 className="text-[10px] font-extrabold tracking-wider text-slate-400 uppercase">{title}</h4>
      </div>
      <div className="mt-2.5 space-y-0.5">
        {children}
      </div>
      <div className="mt-2 px-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFooterClick();
          }}
          className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition"
          type="button"
        >
          <span>{footerLabel} "{query}"</span>
          <span>&gt;</span>
        </button>
      </div>
    </div>
  );
}
