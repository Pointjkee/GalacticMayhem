import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ command, mode }) => ({
  build: {
    brotli: false,
    manifest: false,
    minify: mode === 'development' ? false : 'terser',
    outDir: './docs/samples',
    emptyOutDir: false,
    assetsDir: 'assets',
    sourcemap: command === 'serve' ? 'inline' : false,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'galacticMayhem',
      formats: ['es'],
      fileName: 'galactic',
    },
  },
  server: {
    open: true,
  }
}));