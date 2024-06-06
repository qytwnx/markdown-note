import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface RecentStateProps {
  currentNote: RecentModel | undefined;
  recentNote: Array<RecentModel>;
  setCurrentNote: (data: RecentModel | undefined) => RecentModel | undefined;
  setRecentNote: (data: Array<RecentModel>) => Array<RecentModel>;
}

export default create<RecentStateProps>()(
  persist(
    (set) => ({
      currentNote: undefined,
      recentNote: [],
      setCurrentNote: (data) => {
        set({ currentNote: data });
        return data;
      },
      setRecentNote: (data) => {
        set({ recentNote: data });
        return data;
      }
    }),
    {
      name: 'recent-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
);
