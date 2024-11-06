<script setup lang="ts">
import markdownit from 'markdown-it';
import { computed } from 'vue';

const props = defineProps<{
  value: string;
}>();

const md = markdownit();

const result = computed(() => {
  return md.render(props.value);
});
</script>

<template>
  <div class="markdown-container" v-html="result" />
</template>

<style lang="scss">
.markdown-container {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: #2c3e50;
    margin-top: 20px;
    margin-bottom: 10px;
    font-weight: bold;
  }

  h1 {
    font-size: 2.5em;
    border-bottom: 2px solid #e74c3c;
    padding-bottom: 10px;
  }

  h2 {
    font-size: 2em;
    border-bottom: 2px solid #3498db;
    padding-bottom: 8px;
  }

  h3 {
    font-size: 1.75em;
  }

  h4 {
    font-size: 1.5em;
  }

  h5 {
    font-size: 1.25em;
  }

  h6 {
    font-size: 1em;
    color: #7f8c8d;
  }

  /* 段落与文本样式 */
  p {
    margin-bottom: 1em;
    color: #34495e;
    line-height: 1.7;
    font-size: 1.1em;

    &:last-child {
      margin-bottom: 0;
    }
  }

  /* 链接样式 */
  a {
    color: #3498db;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
    color: #2980b9;
  }

  /* 引用块样式 */
  blockquote {
    margin: 20px 0;
    padding: 15px 20px;
    background-color: #ecf0f1;
    border-left: 5px solid #95a5a6;
    color: #7f8c8d;
    font-style: italic;
  }

  blockquote p {
    margin: 0;
  }

  /* 代码块样式 */
  pre,
  code {
    background-color: #f1f1f1;
    border-radius: 5px;
    padding: 10px;
    font-family: 'Courier New', Courier, monospace;
    font-size: 0.95em;
  }

  pre {
    overflow-x: auto;
    margin: 20px 0;
  }

  code {
    background-color: #e8e8e8;
    padding: 2px 6px;
  }

  /* 列表样式 */
  ul,
  ol {
    margin: 1em 0;
    padding-left: 40px;
  }

  li {
    margin: 0.5em 0;
  }

  ul li::before {
    content: "•";
    color: #e74c3c;
    margin-right: 10px;
  }

  /* 表格样式 */
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
  }

  th,
  td {
    padding: 10px;
    text-align: left;
    border: 1px solid #ddd;
  }

  th {
    background-color: #3498db;
    color: #fff;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  /* 图片样式 */
  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
  }
}
</style>
