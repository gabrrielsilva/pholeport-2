import { app, BrowserWindow } from 'electron';
import path from 'node:path';
import url from 'url';

// if (import('electron-squirrel-startup')) app.quit();

function create_window() {
  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '../../index.html'),
    protocol: 'file:',
    slashes: true
  })

  const window = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    },
  });

  window.removeMenu();
  window.loadURL(startUrl);
}

app.whenReady().then(async () => {
  await import('./main-process/pholeport-async');
  await import('./main-process/logos-async');
  create_window();
});

app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit() });
