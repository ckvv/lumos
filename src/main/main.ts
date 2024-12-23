import path from 'node:path';
import process from 'node:process';
import { app, BrowserWindow, ipcMain } from 'electron';
import { __dirname, RENDERER_DIST, VITE_DEV_SERVER_URL, VITE_PUBLIC } from './config';
import { setupIPCHandlers } from './ipc/handlers';
import { defaultModel, llamaSingleton } from './llama';

let win: BrowserWindow | null;

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
  });

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date()).toLocaleString());
    win?.webContents.send('default-model', defaultModel);
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, 'index.html'));
  }
  return win;
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
    win = null;
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(async () => {
  const win = createWindow();

  let controller: AbortController;
  ipcMain.handle('chat', async (event, prompt: string) => {
    event.sender.send('chat-start');

    if (controller) {
      controller.abort();
    }
    controller = new AbortController();
    const result = await llamaSingleton.prompt(prompt, {
      signal: controller.signal,
      stopOnAbortSignal: true,
      onTextChunk(text) {
        event.sender.send('chat-send', text);
      },
    });
    event.sender.send('chat-end');
    return result;
  });

  ipcMain.handle('chat-stop', async (event) => {
    controller.abort();
    event.sender.send('chat-end');
  });

  setupIPCHandlers({ win });
});
