export function sendMessage(type: string, payload: any) {
  console.log(type, payload);
  return window.ipcRenderer.invoke('message', type, payload);
};

export const API = {
  chat: (params: any) => sendMessage('chat', params),
};
