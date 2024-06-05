import { ElectronAPI } from '@electron-toolkit/preload';

declare global {
  interface Window {
    electron: ElectronAPI;
    api: {
      openExternal: (url: string) => void;
      themeDarkToggle: (mode: 'light' | 'dark') => Promise<boolean>;
      themeDarkStatus: () => Promise<boolean>;
    };
  }
}
