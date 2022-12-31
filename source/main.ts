import { app, BrowserWindow } from 'electron';

function create_window() {
  const window = new BrowserWindow({
    width: 800,
    height: 600
  })

  window.loadFile('index.html');
}

app.whenReady().then(() => create_window());
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit() });