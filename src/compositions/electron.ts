import type { IpcRenderer, IpcRendererEvent } from 'electron';
import { onScopeDispose } from 'vue';

export type IpcRendererListener = (event: IpcRendererEvent, ...args: any[]) => void;

export function useIpcRendererOn(channel: string, listener: IpcRendererListener) {
  onScopeDispose(() => {
    window.ipcRenderer.removeListener(channel, listener);
  }, false);
  return window.ipcRenderer.on(channel, listener);
}

export function useIpcRenderer() {
  const ipcRenderer = window.ipcRenderer;

  return {
    on: (channel: string, listener: IpcRendererListener) => useIpcRendererOn(channel, listener),
    once: ipcRenderer.once.bind(ipcRenderer),
    removeListener: ipcRenderer.removeListener.bind(ipcRenderer),
    removeAllListeners: ipcRenderer.removeAllListeners.bind(ipcRenderer),
    send: ipcRenderer.send,
    invoke: ipcRenderer.invoke.bind(ipcRenderer),
    postMessage: ipcRenderer.postMessage,
  };
}
