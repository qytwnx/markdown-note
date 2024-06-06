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
  chooseFileMdContent: (): Promise<NoteModel | undefined> => {
    return ipcRenderer.invoke('choose:file:md:content');
  },
  readFileMdContent: (filePath: string): Promise<NoteModel | undefined> => {
    return ipcRenderer.invoke('read:file:md:content', filePath);
  },
  createFileMd: (fileName: string): Promise<NoteModel | undefined> => {
    return ipcRenderer.invoke('create:file:md', fileName);
  },
  writeFileMdContent: (fileInfo: NoteModel): Promise<NoteModel> => {
    return ipcRenderer.invoke('write:file:md:content', fileInfo);
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
