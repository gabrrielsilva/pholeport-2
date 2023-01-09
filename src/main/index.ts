import { app, BrowserWindow } from 'electron';
import path from 'node:path';

function create_window() {
  const start_url = process.env.ELECTRON_RENDERER_URL || `file:\\\\${path.join(__dirname, '../renderer/index.html')}`;

  const window = new BrowserWindow({
    width: 800,
    height: 800,
    autoHideMenuBar: true,
    webPreferences: { preload: path.join(__dirname, '../preload/index.js'), nodeIntegration: true },
  });

  window.loadURL(start_url);
}

app.on('ready', async () => {
  await import('./pholeport-async');
  await import('./logos-async');
  create_window();
});

app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit() });