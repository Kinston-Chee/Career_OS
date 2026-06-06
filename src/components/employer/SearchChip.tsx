
import { SearchChip as SearchChipType } from '../../store/useEmployerSearchStore';

interface SearchChipProps {
  chip: SearchChipType;
  onRemove: (id: string) => void;
}

export default function SearchChip({ chip, onRemove }: SearchChipProps) {
  const bgClasses = {
    candidate: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
    skill: 'bg-blue-50 text-blue-700 ring-blue-100',
    role: 'bg-violet-50 text-violet-700 ring-violet-100',
  };

  const iconLabels = {
    candidate: '👤',
    skill: '📊',
    role: '💼',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-inset ${bgClasses[chip.type]}`}>
      <span aria-hidden="true" className="mr-0.5">{iconLabels[chip.type]}</span>
      <span>{chip.value}</span>
      <button
        onClick={() => onRemove(chip.id)}
        className="ml-1 flex h-4 w-4 items-center justify-center rounded-full text-slate-400 hover:bg-slate-200/60 hover:text-slate-600 transition font-bold"
        type="button"
        aria-label={`Remove ${chip.value}`}
      >
        ✕
      </button>
    </span>
  );
}
