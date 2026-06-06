import { create } from 'zustand';

export interface SearchChip {
  id: string;
  type: 'candidate' | 'skill' | 'role';
  value: string;
}

interface EmployerSearchState {
  searchQuery: string;
  recentSearches: string[];
  chipsByPage: Record<'talent' | 'insights' | 'engagement', SearchChip[]>;
  setSearchQuery: (query: string) => void;
  addChip: (page: 'talent' | 'insights' | 'engagement', chip: Omit<SearchChip, 'id'>) => void;
  removeChip: (page: 'talent' | 'insights' | 'engagement', id: string) => void;
  clearChips: (page: 'talent' | 'insights' | 'engagement') => void;
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
}

export const useEmployerSearchStore = create<EmployerSearchState>((set) => ({
  searchQuery: '',
  recentSearches: ['SQL', 'Python', 'Product Analyst'],
  chipsByPage: {
    talent: [],
    insights: [],
    engagement: [],
  },
  setSearchQuery: (query) => set({ searchQuery: query }),
  addChip: (page, chip) => set((state) => {
    const pageChips = state.chipsByPage[page];
    // Avoid duplicates of same type and value
    const exists = pageChips.some(c => c.type === chip.type && c.value.toLowerCase() === chip.value.toLowerCase());
    if (exists) return {};
    
    const newChip = { ...chip, id: `${chip.type}-${Date.now()}` };
    return {
      chipsByPage: {
        ...state.chipsByPage,
        [page]: [...pageChips, newChip]
      }
    };
  }),
  removeChip: (page, id) => set((state) => ({
    chipsByPage: {
      ...state.chipsByPage,
      [page]: state.chipsByPage[page].filter(c => c.id !== id)
    }
  })),
  clearChips: (page) => set((state) => ({
    chipsByPage: {
      ...state.chipsByPage,
      [page]: []
    }
  })),
  addRecentSearch: (query) => set((state) => {
    if (!query.trim()) return {};
    const filtered = state.recentSearches.filter(q => q.toLowerCase() !== query.toLowerCase());
    return {
      recentSearches: [query, ...filtered].slice(0, 5)
    };
  }),
  clearRecentSearches: () => set({ recentSearches: [] }),
}));
