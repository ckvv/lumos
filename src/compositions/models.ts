import type { IpcRenderer } from 'electron';
import { ref } from 'vue';

export function defaultModels(ipcRenderer: IpcRenderer) {
  const models = ref([]);

  ipcRenderer.invoke('get-default-models').then((v) => {
    models.value = v;
  });
}
