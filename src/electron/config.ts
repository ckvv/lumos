import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { app } from 'electron';

export const __dirname = path.dirname(fileURLToPath(import.meta.url));

process.env.APP_ROOT = app.getAppPath();
// path.join(__dirname, '..');

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL;
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron');
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist');
export const VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST;
export const MODEL_PATH = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'models') : path.join(process.env.APP_ROOT, '../', 'app.asar.unpacked', 'models');
