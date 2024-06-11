import { BrowserWindow, IpcMainInvokeEvent, ipcMain } from 'electron';

export default (win: BrowserWindow): void => {
  ipcMain.handle(
    'window:on:top:toggle',
    (_event: IpcMainInvokeEvent, status: boolean) => {
      win?.setAlwaysOnTop(status);
      return status;
    }
  );
  ipcMain.handle('window:on:top:status', () => {
    return win?.isAlwaysOnTop();
  });
};
