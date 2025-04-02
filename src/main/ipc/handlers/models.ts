import type { Model } from '../../llama';
import path from 'node:path';
import { dialog } from 'electron';
// import { ggufs } from '../../db';
import { defaultModel, llamaSingleton, readGgufFileInfo } from '../../llama';

async function updateModels(handler?: (model: Model[]) => Model[]) {
  let models: Model[] = [];
  console.log('models');
  try {
    // models = await ggufs.getALl();
  // eslint-disable-next-line unused-imports/no-unused-vars
  } catch (error) {
    models = [];
  }
  models = handler ? handler(models) : models;

  if (models.length) {
    // await ggufs.setALl(models);
  }

  return models;
}

export async function getDefaultModels() {
  return updateModels();
}

export async function chatOpenLoadModel(_params: any, { win }: any) {
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
}

export async function chatLoadModel(model: Model) {
  if (model) {
    await llamaSingleton.setModel({
      modelPath: model.modelPath || defaultModel.modelPath,
    });
    return model;
  }
}
