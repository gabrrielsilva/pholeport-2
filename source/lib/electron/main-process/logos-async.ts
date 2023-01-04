import { ipcMain } from 'electron';
import fs from 'node:fs';

ipcMain.handle(
  'logos',
  function() {
    const logos = fs.readdirSync('public/image/logo');    
    return logos;
  }
);