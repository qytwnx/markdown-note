import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AppStateProps {
  isDark: boolean | undefined;
  onTop: boolean | undefined;
  setIsDark: (data: boolean) => boolean;
  setOnTop: (data: boolean) => boolean;
}

export default create<AppStateProps>()(
  persist(
    (set) => ({
      isDark: undefined,
      onTop: undefined,
      setIsDark: (data) => {
        set({ isDark: data });
        return data;
      },
      setOnTop: (data) => {
        set({ onTop: data });
        return data;
      }
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
);
