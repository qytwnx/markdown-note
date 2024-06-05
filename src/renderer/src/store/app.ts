import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AppStateProps {
  isDark: boolean | undefined;
  setIsDark: (data: boolean) => boolean;
}

export default create<AppStateProps>()(
  persist(
    (set) => ({
      isDark: undefined,
      setIsDark: (data) => {
        set({ isDark: data });
        return data;
      }
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
);
