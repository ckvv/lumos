<script setup lang="ts">
import { useQuasar } from 'quasar';
import { nextTick, ref, toRaw, watch } from 'vue';

const quasar = useQuasar();

const loading = ref(false);
const models = ref<{ modelName: string; modelPath: string }[]>([]);

nextTick(() => {
  window.ipcRenderer.on('default-model', (event, model: any) => {
    console.log('model', model);
  });
});

const model = ref(models.value[0]);

async function handlerClick() {
  try {
    const loadModel = await window.ipcRenderer.invoke('chat-open-load-model');
    if (!loadModel) {
      return;
    };
    const _model = models.value.find(v => v.modelPath === loadModel.modelPath);
    if (!_model) {
      models.value.push(loadModel);
      model.value = loadModel;
    } else {
      model.value = _model;
    }
  // eslint-disable-next-line unused-imports/no-unused-vars
  } catch (_error) {
    quasar.notify({
      type: 'negative',
      message: `该模型不支持, 目前仅支持 GGUF 模型文件`,
      position: 'top-right',
      timeout: 2000,
    });
  }
}

watch(model, async (newValue) => {
  loading.value = true;
  await window.ipcRenderer.invoke('chat-load-model', toRaw(newValue));
  loading.value = false;
  quasar.notify({
    type: 'positive',
    message: `已切换到模型:${newValue.modelName}`,
    position: 'top-right',
    timeout: 2000,
  });
});

defineExpose({
  loading,
  model,
});
</script>

<template>
  <div class="chat-menu">
    <q-btn v-if="!models.length" @click="handlerClick">
      选择本地 GGUF 格式模型文件
    </q-btn>
    <q-select v-else v-model="model" borderless :options="models" :loading="loading" option-value="modelPath" option-label="modelName">
      <template #after-options>
        <q-item class="w-full">
          <q-item-section>
            <q-item-label class="">
              <div class="w-full cursor-pointer flex justify-between" @click="handlerClick">
                选择本地 GGUF 格式模型文件
              </div>
            </q-item-label>
          </q-item-section>
        </q-item>
      </template>
    </q-select>
  </div>
</template>

<style lang="scss">
.chat-menu {
  .q-field {
    font-size: 1.2rem !important;
    font-weight: bolder;
  }
}
</style>
