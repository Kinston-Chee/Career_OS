

interface RecentSearchesSectionProps {
  searches: string[];
  onSelect: (search: string) => void;
  onClear: () => void;
}

export default function RecentSearchesSection({ searches, onSelect, onClear }: RecentSearchesSectionProps) {
  if (searches.length === 0) return null;

  return (
    <div className="px-4 py-3 border-b border-slate-100 last:border-b-0">
      <div className="flex items-center justify-between">
        <h4 className="text-[10px] font-extrabold tracking-wider text-slate-400 uppercase">Recent Searches</h4>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClear();
          }}
          className="text-[10px] font-semibold text-slate-400 hover:text-slate-600 transition"
          type="button"
        >
          Clear
        </button>
      </div>
      <div className="mt-2.5 flex flex-wrap gap-2">
        {searches.map((search) => (
          <button
            key={search}
            onClick={() => onSelect(search)}
            className="flex items-center gap-1.5 rounded-[8px] border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:border-slate-300 hover:bg-slate-50 transition"
            type="button"
          >
            <span aria-hidden="true">🕒</span>
            <span>{search}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
