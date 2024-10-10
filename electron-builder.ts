import type { Configuration } from 'electron-builder';
/* eslint-disable no-template-curly-in-string */
import path from 'node:path';
import { $ } from 'zx';

const appId = 'com.electron.lumos';
const productName = 'Lumos';
const executableName = 'Lumos';

/**
 * @see - https://www.electron.build/configuration/configuration
 */

/**
 * @type { HTMLAllCollection }
 */
export default {
  appId,
  asar: true,
  productName,
  executableName,
  directories: {
    output: 'release',
  },
  // remove this once you set up your own code signing for macOS
  async afterPack(context) {
    if (context.electronPlatformName === 'darwin') {
      // check whether the app was already signed
      const appPath = path.join(context.appOutDir, `${context.packager.appInfo.productFilename}.app`);

      // this is needed for the app to not appear as "damaged" on Apple Silicon Macs
      // https://github.com/electron-userland/electron-builder/issues/5850#issuecomment-1821648559
      await $`codesign --force --deep --sign - ${appPath}`;
    }
  },
  files: [
    'dist',
    'dist-electron',
    'models',
    '!node_modules/node-llama-cpp/bins/**/*',
    'node_modules/node-llama-cpp/bins/${os}-${arch}*/**/*',
    '!node_modules/@node-llama-cpp/*/bins/**/*',
    'node_modules/@node-llama-cpp/${os}-${arch}*/bins/**/*',
    '!node_modules/node-llama-cpp/llama/localBuilds/**/*',
    'node_modules/node-llama-cpp/llama/localBuilds/${os}-${arch}*/**/*',
  ],
  asarUnpack: [
    // https://github.com/electron/asar/issues/319
    'models',
    'node_modules/node-llama-cpp/bins',
    'node_modules/node-llama-cpp/llama/localBuilds',
    'node_modules/@node-llama-cpp/*',
  ],
  mac: {
    icon: 'public/lumos.icns',
  },
  win: {
    icon: 'public/lumos.png',
  },
  extraResources: ['public'],
} as Configuration;
