<script setup lang="ts">
import Markdownit from 'markdown-it';
import { computed } from 'vue';
import { highlight, markdownItKatexGpt } from '../utils/markdown.ts';

const props = defineProps<{
  value: string;
}>();

const md = new Markdownit({ highlight });
md.use(markdownItKatexGpt);

const result = computed(() => {
  return md.render(props.value);
});
</script>

<template>
  <div class="markdown-container bg-inherit!" v-html="result" />
</template>

<style lang="scss">
.markdown-container {
  .katex {
    display: inline-block;
  }
}
</style>
