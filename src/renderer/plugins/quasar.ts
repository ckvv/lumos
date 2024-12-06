import type { Plugin } from 'vue';
import { Notify, Quasar } from 'quasar';
import quasarLang from 'quasar/lang/zh-CN';

export const quasar: Plugin = (app) => {
  app.use(Quasar, {
    plugins: {
      Notify,
    },
    lang: quasarLang,
  });
};
