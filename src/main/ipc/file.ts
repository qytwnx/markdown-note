import { BrowserWindow, IpcMainInvokeEvent, dialog, ipcMain } from 'electron';
import fs from 'node:fs';

import path from 'node:path';

export default (win: BrowserWindow): void => {
  ipcMain.handle('choose:file:md:content', () => {
    const filePath = dialog.showOpenDialogSync(win, {
      title: '选择Markdown文件',
      properties: ['openFile'],
      filters: [{ name: 'Markdown', extensions: ['md'] }]
    });
    if (!filePath) return undefined;
    const content = fs.readFileSync(filePath[0], 'utf-8');
    const name = path.basename(filePath[0], '.md');
    return { name: name, content: content, path: filePath[0] } as NoteModel;
  });
  ipcMain.handle(
    'read:file:md:content',
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
    'create:file:md',
    (_event: IpcMainInvokeEvent, fileName: string) => {
      const filePath = dialog.showSaveDialogSync(win, {
        title: '选择保存路径',
        defaultPath: fileName,
        filters: [{ name: 'Markdown', extensions: ['md'] }]
      });
      if (!filePath) {
        return undefined;
      }
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf-8');
        const name = path.basename(filePath, '.md');
        return { name: name, content: content, path: filePath } as NoteModel;
      }
      fs.writeFileSync(filePath, '');
      const name = path.basename(filePath, '.md');
      return { name: name, content: '', path: filePath } as NoteModel;
    }
  );
  ipcMain.handle(
    'write:file:md:content',
    (_event: IpcMainInvokeEvent, fileInfo: NoteModel) => {
      const filePath = fileInfo.path;
      const fileContent = fileInfo.content;
      // 覆盖文件中的内容
      fs.writeFileSync(filePath, fileContent);
      const content = fs.readFileSync(filePath, 'utf-8');
      const name = path.basename(filePath, '.md');
      return { name: name, content: content, path: filePath } as NoteModel;
    }
  );
};
