import { ipcMain } from 'electron';
import fs from 'node:fs';
import path from 'node:path';

ipcMain.handle('logos', () => {
    const logos = fs.readdirSync(path.join(__dirname, '../../public/image/logo'));    
    return logos;
  }
);