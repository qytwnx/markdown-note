import { BrowserWindowConstructorOptions } from 'electron';
import icon from '../../../resources/icon.png?asset';
import { join } from 'node:path';

export const MainWindowOptions: BrowserWindowConstructorOptions & {
  routerPath?: string;
} = {
  width: 800,
  height: 580,
  minWidth: 600,
  minHeight: 450,
  show: false,
  autoHideMenuBar: true,
  icon,
  titleBarStyle: 'hidden',
  titleBarOverlay: {
    height: 38
  },
  webPreferences: {
    preload: join(__dirname, '../preload/index.js'),
    sandbox: false
  }
};
