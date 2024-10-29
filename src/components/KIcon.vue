<script setup lang="ts">
import { type IconName, icons } from '../assets/icons';

defineProps<{
  name: IconName;
}>();
</script>

<template>
  <i class="k-icon flex p-x-2" v-bind="$attrs" v-html="icons[name]" />
</template>

<style lang="scss">
.k-icon {
  svg {
    width: 1em;
    height: 1em;
    fill: currentcolor;
  }
}
</style>
