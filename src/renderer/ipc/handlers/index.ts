import { chat } from './chat';

export const handlers = {
  chat,
} as const;

export type HANDLER_TYPES = keyof typeof handlers;

export function setupIPCHandlers(options: any) {
  window.ipcRenderer.on('message', (event, type: HANDLER_TYPES, payload: any) => {
    if (handlers[type]) {
      return handlers[type](payload, { event, ...options });
    }
  });
}
