import path from 'node:path';
import process from 'node:process';
import { app, BrowserWindow, dialog, ipcMain } from 'electron';
import { __dirname, RENDERER_DIST, VITE_DEV_SERVER_URL, VITE_PUBLIC } from './config';
import { defaultModel, llamaSingleton, type Model, readGgufFileInfo } from './llama';
import { store } from './store';

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

  ipcMain.handle('get-default-models', async (_event) => {
    return updateModels();
  });

  ipcMain.handle('chat-open-load-model', async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog(win, { securityScopedBookmarks: true });
    if (!canceled) {
      const modelPath = filePaths[0];
      await readGgufFileInfo(modelPath);
      const model = {
        modelName: path.basename(modelPath, path.extname(modelPath)),
        modelPath,
      };
      updateModels((models) => {
        if (!models.find(m => m.modelPath === model.modelPath)) {
          models.push(model);
        }
        return models;
      });
      return model;
    }
  });

  ipcMain.handle('chat-load-model', async (event, model: Model) => {
    if (model) {
      await llamaSingleton.setModel({
        modelPath: model.modelPath || defaultModel.modelPath,
      });
      return model;
    }
  });
});

function updateModels(handler?: (model: Model[]) => Model[]) {
  const key = 'models';
  let models: Model[] = [];
  try {
    models = store.get(key) as Model[] || [];
  // eslint-disable-next-line unused-imports/no-unused-vars
  } catch (error) {
    models = [];
  }
  models = handler ? handler(models) : models;

  store.set(key, models);

  console.log('models:', models, '|', store.get(key));
  return models;
}
