<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core';
import { ref, useTemplateRef } from 'vue';
import Markdown from './Markdown.vue';

const chatListRef = useTemplateRef('chatListRef');
const menuRef = useTemplateRef<{ model: string; loading: boolean }>('menuRef');

const input = ref<string>();
const chats = ref<{ text: string; role: 'user' | 'chat' }[]>([]);
const status = ref<'start' | 'sending' | 'stop'>('stop');

const scrollToEnd = useDebounceFn(() => {
  if (chatListRef.value) {
    (chatListRef.value as any).setScrollPercentage('vertical', 1, 200);
  }
}, 200, { maxWait: 1000 });

window.ipcRenderer.on('chat-start', () => {
  if (!input.value?.trim()) {
    return;
  }
  scrollToEnd();
  input.value = '';
  chats.value.push({
    role: 'chat',
    text: '',
  });
});
window.ipcRenderer.on('chat-end', () => {
  status.value = 'stop';
  scrollToEnd();
});
window.ipcRenderer.on('chat-send', (event, text: string) => {
  status.value = 'sending';
  chats.value[chats.value.length - 1].text += text;
  scrollToEnd();
});

async function startChat(text?: string) {
  if (!text) {
    return;
  }
  status.value = 'start';
  chats.value.push({
    role: 'user',
    text,
  });

  try {
    await window.ipcRenderer.invoke('chat', text);
  } catch (error) {
    chats.value.push({
      role: 'chat',
      text: `${error}`,
    });
  }
}

function stopChat() {
  if (status.value === 'stop') {
    return;
  }
  status.value = 'stop';
  window.ipcRenderer.invoke('chat-stop');
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    startChat(input.value);
  }
}
</script>

<template>
  <Menu ref="menuRef" class="align-end" />
  <div v-if="menuRef?.model" class="chat-room w-full h-full flex flex-col justify-center items-center flex-nowrap! gap-4">
    <q-scroll-area v-if="chats.length" ref="chatListRef" class="chat-list w-full h-full flex-grow flex-shrink-1">
      <div v-for="(chat, index) in chats" :key="index" class="chat-list-item m-4 flex" :class="[`chat-list-item-${chat.role}`]">
        <span class="chat-list-item-content p-x-4 p-y-2 inline-block rounded float-right max-w-80%" :class="[chat.role === 'user' ? 'bg-green-2' : 'bg-white']">
          <Markdown v-if="chat.text" :value="chat.text" />
          <div v-else class="flex justify-center items-center">思考中 <div class="m-l i-material-symbols:progress-activity spin" /></div>
        </span>
      </div>
    </q-scroll-area>
    <Typing v-else class="text-6 font-bold" value="有什么可以帮忙的 ？" />
    <q-input
      v-model="input"
      :disable="!menuRef?.model || menuRef?.loading" class="w-full" :placeholder="menuRef?.model ? '给`AI模型`发送信息' : '请先选择本地 GGUF 格式模型文件'" rounded outlined autogrow autofocus
      @keydown="handleKeydown"
    >
      <template #append>
        <div v-if="['sending', 'start'].includes(status)" class="i-material-symbols:stop-circle text-1.2em cursor-pointer color-gray-6" @click="stopChat()" />
        <div v-else class="i-material-symbols:arrow-circle-up text-1.2em cursor-pointer color-gray-4" :class="{ 'color-gray-6': !!input }" @click="startChat(input)" />
      </template>
    </q-input>
  </div>
</template>

<style lang="scss">
.chat-room {
  .chat-list {
    .chat-list-item-user {
      justify-content: flex-end;
    }
  }
}
</style>
