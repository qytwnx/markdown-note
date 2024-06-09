import { ElectronAPI } from '@electron-toolkit/preload';

declare global {
  interface Window {
    electron: ElectronAPI;
    api: {
      openExternal: (url: string) => void;
      themeDarkToggle: (mode: 'light' | 'dark') => Promise<boolean>;
      themeDarkStatus: () => Promise<boolean>;
      checkNoteExist: (filePath: string) => Promise<boolean>;
      chooseNote: () => Promise<RecentModel | undefined>;
      createNote: (fileName: string) => Promise<RecentModel | undefined>;
      createNoteNoDialog: (basePath: string, name: string) => Promise<boolean>;
      readNote: (filePath: string) => Promise<NoteModel | undefined>;
      writeNote: (fileInfo: NoteModel) => Promise<NoteModel>;
      renameNote: (filePath: string, fileName: string) => Promise<boolean>;
      deleteNote: (filePath: string) => Promise<boolean>;
      checkWorkspaceExist: (folderPath: string) => Promise<boolean>;
      chooseWorkspace: () => Promise<RecentModel | undefined>;
      createWorkspace: () => Promise<RecentModel | undefined>;
      createFolderNoDialog: (
        basePath: string,
        name: string
      ) => Promise<boolean>;
      readWorkspace: (
        folderPath: string
      ) => Promise<WorkspaceModel | undefined>;
      deleteFolder: (folderPath: string) => Promise<boolean>;
      uploadImage: (file: {
        name: string;
        data: ArrayBuffer;
      }) => Promise<UploadImageModel>;
    };
  }
}
