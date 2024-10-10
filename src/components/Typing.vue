<script lang="ts" setup>
import { onWatcherCleanup, ref, toValue, watch } from 'vue';

const props = defineProps<{
  value: string;
}>();

const _value = ref('');

watch(() => props.value, (newValue, _oldValue) => {
  let index = 0;
  const timer = setInterval(() => {
    if (index < newValue.length) {
      _value.value += toValue(newValue?.[index]);
      index++;
    } else {
      clearInterval(timer);
    }
  }, 50);
  onWatcherCleanup(() => {
    clearInterval(timer);
  });
}, {
  immediate: true,
});
</script>

<template>
  <div>{{ _value }}</div>
</template>
