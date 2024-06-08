import { BrowserWindow, IpcMainInvokeEvent, dialog, ipcMain } from 'electron';
import fs from 'node:fs';
import path from 'node:path';
import { RecentTypeEnum } from '../../renderer/src/enums/common';

export default (win: BrowserWindow): void => {
  ipcMain.handle(
    'check:note:exist',
    (_event: IpcMainInvokeEvent, filePath: string) => {
      if (!filePath) {
        return false;
      }
      return fs.existsSync(filePath);
    }
  );
  ipcMain.handle('choose:note', () => {
    const filePath = dialog.showOpenDialogSync(win, {
      title: 'Select Markdown File',
      properties: ['openFile'],
      filters: [{ name: 'Markdown', extensions: ['md'] }]
    });
    if (!filePath) return undefined;
    const name = path.basename(filePath[0], '.md');
    return {
      name: name,
      path: filePath[0],
      type: RecentTypeEnum.NOTE
    } as RecentModel;
  });
  ipcMain.handle(
    'create:note',
    (_event: IpcMainInvokeEvent, fileName: string) => {
      const filePath = dialog.showSaveDialogSync(win, {
        title: 'Create New Markdown File',
        defaultPath: fileName,
        filters: [{ name: 'Markdown', extensions: ['md'] }]
      });
      if (!filePath) {
        return undefined;
      }
      if (fs.existsSync(filePath)) {
        const name = path.basename(filePath, '.md');
        return {
          name: name,
          path: filePath,
          type: RecentTypeEnum.NOTE
        } as RecentModel;
      }
      fs.writeFileSync(filePath, '');
      const name = path.basename(filePath, '.md');
      return {
        name: name,
        path: filePath,
        type: RecentTypeEnum.NOTE
      } as RecentModel;
    }
  );
  ipcMain.handle(
    'create:note:no:dialog',
    (_event: IpcMainInvokeEvent, basePath: string, name: string) => {
      if (!basePath || !name) {
        return false;
      }
      const filePath = path.resolve(basePath, `${name}.md`);
      if (fs.existsSync(filePath)) {
        return true;
      }
      fs.writeFileSync(filePath, '');
      return true;
    }
  );
  ipcMain.handle(
    'read:note',
    (_event: IpcMainInvokeEvent, filePath: string) => {
      if (!fs.existsSync(filePath)) {
        return undefined;
      }
      const content = fs.readFileSync(filePath, 'utf-8');
      const name = path.basename(filePath, '.md');
      return { name: name, content: content, path: filePath } as NoteModel;
    }
  );
  ipcMain.handle(
    'write:note',
    (_event: IpcMainInvokeEvent, fileInfo: NoteModel) => {
      const filePath = fileInfo.path;
      const fileContent = fileInfo.content;
      fs.writeFileSync(filePath, fileContent);
      const content = fs.readFileSync(filePath, 'utf-8');
      const name = path.basename(filePath, '.md');
      return { name: name, content: content, path: filePath } as NoteModel;
    }
  );
  ipcMain.handle(
    'rename:note',
    (_event: IpcMainInvokeEvent, filePath: string, fileName: string) => {
      if (!filePath || !fileName) {
        return false;
      }
      try {
        const newFilePath = path.resolve(
          path.dirname(filePath),
          `${fileName}.md`
        );
        fs.renameSync(filePath, newFilePath);
        return true;
      } catch (error) {
        console.log('rename:note:error:', error);
        return false;
      }
    }
  );
  ipcMain.handle(
    'delete:note',
    (_event: IpcMainInvokeEvent, filePath: string) => {
      if (!filePath) {
        return false;
      }
      try {
        fs.unlinkSync(filePath);
        return true;
      } catch (error) {
        console.log('delete:note:error:', error);
        return false;
      }
    }
  );
};
