import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { federation } from '@module-federation/vite';

const PORT = 4300;
const ORIGIN = `http://127.0.0.1:${PORT}`;

export default defineConfig({
  server: {
    port: PORT,
    strictPort: true,
    host: '127.0.0.1',
    origin: ORIGIN,
  },
  preview: { port: PORT, strictPort: true },
  build: { target: 'chrome89' },
  plugins: [
    federation({
      name: 'vue_sample',
      shared: {
        vue: { singleton: true },
        react: { singleton: true },
        'react-dom': { singleton: true },
      },
    }),
    react(),
    vue(),
    tailwindcss(),
  ],
});
