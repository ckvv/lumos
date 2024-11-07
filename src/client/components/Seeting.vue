<script setup lang="ts">
import type { IconName } from '../assets/icons';
import { ref } from 'vue';

const icon = ref(false);

const tabs = [{
  icon: 'setting',
  label: '通用',
}, {
  icon: 'palette',
  label: '外观',
}, {
  icon: 'models',
  label: '模型',
}, {
  icon: 'info',
  label: '关于',
}] as {
  icon: IconName;
  label: string;
}[];

const tab = ref(tabs[0].label);
</script>

<template>
  <div class="seeting pos-fixed top-4 right-4">
    <div class="i-material-symbols:settings text-2em cursor-pointer color-gray-4" @click="icon = true" />
    <q-dialog v-model="icon" persistent>
      <q-card class="w-70vw!">
        <q-card-section class="row items-center">
          <div class="text-h6">
            设置
          </div>
          <q-space />
          <q-btn icon="close" flat round dense @click="icon = false" />
        </q-card-section>
        <q-card-section horizontal class="min-h-50vh p-4">
          <q-card-actions vertical class="w-36">
            <q-btn v-for="t in tabs" :key="t.icon" :color="tab === t.label ? 'primary' : ''" class="w-full" align="left" rounded :flat="tab !== t.label" @click="tab = t.label">
              <KIcon :name="t.icon" />
              {{ t.label }}
            </q-btn>
          </q-card-actions>
          <div class="flex-grow p-4">
            {{ tab }}
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<style>
.seeting {
}
</style>
