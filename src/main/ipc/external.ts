import { IpcMainInvokeEvent, ipcMain, shell } from 'electron';

export default (): void => {
  ipcMain.on('open:external', (_event: IpcMainInvokeEvent, url: string) => {
    shell.openExternal(url);
  });
};
