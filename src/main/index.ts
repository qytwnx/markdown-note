import { app, BrowserWindow, net, protocol } from 'electron';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import { createWindow } from './config';
import { MainWindowOptions } from './constants';
import {
  registerExternalOperate,
  registerThemeOperate,
  registerNoteOperate,
  registerWorkspaceOperate,
  registerFileOperate,
  registerWindowOperate
} from './ipc';
import url from 'node:url';
import path from 'node:path';

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.qytwnx');

  protocol.handle('atom', (request) => {
    const filePath = request.url.slice('atom:///'.length);
    return net.fetch(
      url.pathToFileURL(path.resolve(decodeURI(filePath))).toString()
    );
  });

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });
  process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
  const mainWindow = createWindow(MainWindowOptions);
  registerExternalOperate();
  registerThemeOperate(mainWindow);
  registerNoteOperate(mainWindow);
  registerWorkspaceOperate(mainWindow);
  registerFileOperate();
  registerWindowOperate(mainWindow);
  if (is.dev) {
    mainWindow.webContents.openDevTools();
  }

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow(MainWindowOptions);
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
