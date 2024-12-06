import { createI18n, type I18nOptions } from 'vue-i18n';
import { en, zh } from '../locales/index';

const options: I18nOptions = {
  legacy: false,
  locale: 'zh',
  fallbackLocale: 'zh',
  messages: {
    zh,
    en,
  },
};

export const i18n = createI18n<false, typeof options>(options);
