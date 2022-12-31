import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'node:path';
import { handle_pholeport, Input } from './handle-pholeport';

function create_window() {
  const window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: { preload: path.join(__dirname, 'preload.js') },
  });

  window.loadFile('index.html');
}

app.whenReady().then(() => {
  ipcMain.on(
    'pholeport',
    async (_, { id, titulo, seguimento, localidade, site_abordagem, versao, input_file_path }: Input) => {
      await handle_pholeport({ id, titulo, seguimento, localidade, site_abordagem, versao, input_file_path });
    }
  );

  create_window();
});

app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit() });