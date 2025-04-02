import presetWind3 from '@unocss/preset-wind3';
import { defineConfig } from 'unocss';
import presetIcons from 'unocss/preset-icons';

export default defineConfig({
  shortcuts: {
    'l-xy-center': 'flex justify-center items-center',
  },
  presets: [
    presetWind3(),
    presetIcons(),
  ],
});
