import { BrowserWindow, IpcMainInvokeEvent, dialog, ipcMain } from 'electron';
import { handleGetFilesAndFolders, handleCreateFolder } from '../utils/folder';
import path from 'node:path';
import fs from 'node:fs';
import { RecentTypeEnum } from '../../renderer/src/enums/common';

export default (win: BrowserWindow): void => {
  ipcMain.handle(
    'check:workspace:exist',
    (_event: IpcMainInvokeEvent, folderPath: string) => {
      if (!folderPath) {
        return false;
      }
      return fs.existsSync(folderPath);
    }
  );
  ipcMain.handle('choose:workspace', () => {
    const folderPath = dialog.showOpenDialogSync(win, {
      title: 'Select Workspace',
      properties: ['openDirectory', 'createDirectory']
    });
    if (!folderPath) {
      return undefined;
    }
    const name = path.basename(folderPath[0]);
    return {
      name: name,
      path: folderPath[0],
      type: RecentTypeEnum.WORKSPACE
    } as RecentModel;
  });
  ipcMain.handle('create:workspace', () => {
    const folderPath = dialog.showSaveDialogSync(win, {
      title: 'Create New Workspace',
      properties: ['createDirectory']
    });
    if (!folderPath) {
      return undefined;
    }
    try {
      handleCreateFolder(folderPath);
      const name = path.basename(folderPath);
      return {
        name: name,
        path: folderPath,
        type: RecentTypeEnum.WORKSPACE
      } as RecentModel;
    } catch (error) {
      console.log('create:workspace:error', error);
      return undefined;
    }
  });
  ipcMain.handle(
    'create:folder:no:dialog',
    (_event: IpcMainInvokeEvent, basePath: string, name: string) => {
      if (!basePath || !name) {
        return false;
      }
      try {
        const folderPath = path.resolve(basePath, name);
        handleCreateFolder(folderPath);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  );
  ipcMain.handle(
    'read:workspace',
    (_event: IpcMainInvokeEvent, folderPath: string) => {
      if (!folderPath) {
        return undefined;
      }
      try {
        return handleGetFilesAndFolders(folderPath) as WorkspaceModel;
      } catch (error) {
        console.log(error);
        return undefined;
      }
    }
  );
  ipcMain.handle(
    'delete:folder',
    (_event: IpcMainInvokeEvent, folderPath: string) => {
      if (!folderPath) {
        return false;
      }
      try {
        fs.rmSync(folderPath, { recursive: true });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  );
};
