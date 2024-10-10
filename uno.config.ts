import { defineConfig, presetUno } from 'unocss';
import presetIcons from 'unocss/preset-icons';

export default defineConfig({
  shortcuts: {
    'l-xy-center': 'flex justify-center items-center',
  },
  presets: [
    presetUno(),
    presetIcons(),
  ],
});
