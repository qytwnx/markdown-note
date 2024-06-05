import { BrowserWindow, dialog, ipcMain } from 'electron';
import fs from 'node:fs';

export default (win: BrowserWindow): void => {
  ipcMain.handle('choose:file:md:content', () => {
    const filePath = dialog.showOpenDialogSync(win, {
      title: '选择Markdown文件',
      properties: ['openFile'],
      filters: [{ name: 'Markdown', extensions: ['md'] }]
    });
    if (!filePath) return '';
    const content = fs.readFileSync(filePath[0], 'utf-8');
    return content;
  });
};
