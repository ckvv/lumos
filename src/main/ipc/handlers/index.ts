import { ipcMain } from 'electron';
import { chat } from './chat';
import * as models from './models';

export const handlers = {
  ...models,
  chat,
} as const;

export type HANDLER_TYPES = keyof typeof handlers;

export function setupIPCHandlers(options: any = {}) {
  ipcMain.handle('message', (event, type: HANDLER_TYPES, payload: any) => {
    if (handlers[type]) {
      return handlers[type](payload, { event, ...options });
    }
  });
}
