import { app, BrowserWindow } from 'electron';
import path from 'node:path';

function create_window() {
  const window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: { 
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    },
  });

  window.removeMenu();
  window.loadURL('http://localhost:5173');
  window.webContents.openDevTools();
}

app.whenReady().then(async () => {
  await import('./main-process/pholeport-async');
  create_window();
});

app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit() });
