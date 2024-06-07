import {
  BrowserWindow,
  IpcMainInvokeEvent,
  ipcMain,
  nativeTheme
} from 'electron';

export default (win: BrowserWindow): void => {
  ipcMain.handle(
    'theme:dark:toggle',
    (_event: IpcMainInvokeEvent, mode: 'light' | 'dark') => {
      nativeTheme.themeSource = mode;
      win?.setTitleBarOverlay({
        color: mode === 'dark' ? '#000000' : '#F0F0F0',
        symbolColor: mode === 'dark' ? '#FFFFFF' : '#000000',
        height: 38
      });
      return nativeTheme.shouldUseDarkColors;
    }
  );
  ipcMain.handle('theme:dark:status', () => {
    const status = nativeTheme.shouldUseDarkColors;
    win?.setTitleBarOverlay({
      color: status ? '#000000' : '#F0F0F0',
      symbolColor: status ? '#FFFFFF' : '#000000',
      height: 38
    });
    return status;
  });
};
