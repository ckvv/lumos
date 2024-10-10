import path from 'node:path';
import process from 'node:process';
// import { quasar, transformAssetUrls } from '@quasar/vite-plugin';
import vue from '@vitejs/plugin-vue';
import UnoCSS from 'unocss/vite';
import { QuasarResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import electron from 'vite-plugin-electron/simple';

const electronExternalModules = ['node-llama-cpp', 'lifecycle-utils'];

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    exclude: electronExternalModules,
    esbuildOptions: {
      target: 'esnext',
    },
  },
  plugins: [
    Components({
      resolvers: [QuasarResolver()],
    }),
    UnoCSS(),
    vue(),
    // quasar(),
    electron({
      main: {
        // Shortcut of `build.lib.entry`.
        entry: 'electron/main.ts',
        vite: {
          build: {
            target: 'esnext',
            outDir: path.join(__dirname, 'dist-electron'),
            rollupOptions: {
              external: electronExternalModules,
            },
          },
        },
      },
      preload: {
        // Shortcut of `build.rollupOptions.input`.
        // Preload scripts may contain Web assets, so use the `build.rollupOptions.input` instead `build.lib.entry`.
        input: path.join(__dirname, 'electron/preload.ts'),
      },
      // Ployfill the Electron and Node.js API for Renderer process.
      // If you want use Node.js in Renderer process, the `nodeIntegration` needs to be enabled in the Main process.
      // See 👉 https://github.com/electron-vite/vite-plugin-electron-renderer
      renderer: process.env.NODE_ENV === 'test'
        // https://github.com/electron-vite/vite-plugin-electron-renderer/issues/78#issuecomment-2053600808
        ? undefined
        : {},
    }),
  ],
});
