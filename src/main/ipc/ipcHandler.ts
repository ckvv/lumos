import { ipcMain } from 'electron';
import { handlers } from './handlers';

export const MESSAGE_TYPES = [];

export function setupIPCHandlers() {
  ipcMain.handle('message', (event, type: string, payload: any) => {
    if (handlers[type]) {
      return handlers[type](payload);
    }
  });
}
