import { ElectronAPI } from '@electron-toolkit/preload';

declare global {
  interface Window {
    electron: ElectronAPI;
    api: {
      openExternal: (url: string) => void;
      themeDarkToggle: (mode: 'light' | 'dark') => Promise<boolean>;
      themeDarkStatus: () => Promise<boolean>;
      chooseFileMdContent: () => Promise<NoteModel | undefined>;
      readFileMdContent: (filePath: string) => Promise<NoteModel | undefined>;
      createFileMd: (fileName: string) => Promise<NoteModel | undefined>;
      writeFileMdContent: (fileInfo: NoteModel) => Promise<NoteModel>;
    };
  }
}
