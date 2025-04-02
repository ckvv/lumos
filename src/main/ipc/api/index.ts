export async function sendMessage(type: string, payload?: any) {
  const result = await window.ipcRenderer.invoke('message', type, payload);
  console.log({
    type,
    payload,
    result,
  });
  return result;
};

export const API = {
  chat: (params: any) => sendMessage('chat', params),
  getDefaultModels: () => sendMessage('getDefaultModels'),
  chatOpenLoadModel: () => sendMessage('chatOpenLoadModel'),
  chatLoadModel: (params: any) => sendMessage('chatLoadModel', params),
};
