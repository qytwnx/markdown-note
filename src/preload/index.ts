import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';

// Custom APIs for renderer
const api = {
  openExternal: (url: string): void => {
    ipcRenderer.send('open:external', url);
  },
  themeDarkToggle: (mode: 'light' | 'dark'): Promise<boolean> => {
    return ipcRenderer.invoke('theme:dark:toggle', mode);
  },
  themeDarkStatus: (): Promise<boolean> => {
    return ipcRenderer.invoke('theme:dark:status');
  },
  checkNoteExist: (filePath: string): Promise<boolean> => {
    return ipcRenderer.invoke('check:note:exist', filePath);
  },
  chooseNote: (): Promise<RecentModel | undefined> => {
    return ipcRenderer.invoke('choose:note');
  },
  createNote: (fileName: string): Promise<RecentModel | undefined> => {
    return ipcRenderer.invoke('create:note', fileName);
  },
  createNoteNoDialog: (basePath: string, name: string): Promise<boolean> => {
    return ipcRenderer.invoke('create:note:no:dialog', basePath, name);
  },
  readNote: (filePath: string): Promise<NoteModel | undefined> => {
    return ipcRenderer.invoke('read:note', filePath);
  },
  writeNote: (fileInfo: NoteModel): Promise<NoteModel> => {
    return ipcRenderer.invoke('write:note', fileInfo);
  },
  renameNote: (filePath: string, fileName: string): Promise<boolean> => {
    return ipcRenderer.invoke('rename:note', filePath, fileName);
  },
  deleteNote: (filePath: string): Promise<boolean> => {
    return ipcRenderer.invoke('delete:note', filePath);
  },
  checkWorkspaceExist: (folderPath: string): Promise<boolean> => {
    return ipcRenderer.invoke('check:workspace:exist', folderPath);
  },
  chooseWorkspace: (): Promise<RecentModel | undefined> => {
    return ipcRenderer.invoke('choose:workspace');
  },
  createWorkspace: (): Promise<RecentModel | undefined> => {
    return ipcRenderer.invoke('create:workspace');
  },
  createFolderNoDialog: (basePath: string, name: string): Promise<boolean> => {
    return ipcRenderer.invoke('create:folder:no:dialog', basePath, name);
  },
  readWorkspace: (folderPath: string): Promise<WorkspaceModel | undefined> => {
    return ipcRenderer.invoke('read:workspace', folderPath);
  },
  deleteFolder: (folderPath: string): Promise<boolean> => {
    return ipcRenderer.invoke('delete:folder', folderPath);
  }
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('api', api);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.api = api;
}
