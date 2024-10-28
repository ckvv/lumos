/// <reference types="vite/client" />
import type { ZH } from './locales/zh';

export {};

declare module 'vue-i18n' {
  export interface DefineLocaleMessage extends ZH {};
}
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $t: typeof import('vue-i18n').useI18n;
  }
}
