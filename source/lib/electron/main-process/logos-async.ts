import { ipcMain } from 'electron';
import fs from 'node:fs';
import path from 'node:path';

ipcMain.handle(
  'logos',
  function() {
    const logos = fs.readdirSync(path.resolve(__dirname, '..', '..', '..', 'asset', 'image', 'logo'));    
    return logos;
  }
);