import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { federation } from '@module-federation/vite';
import { federationExposes } from './federation-exposes';

const PORT = 5100;

export default defineConfig({
  server: {
    port: PORT,
    strictPort: true,
    origin: `http://localhost:${PORT}`,
    host: '127.0.0.1',
    cors: true,
  },
  preview: { port: PORT, strictPort: true, cors: true },
  build: { target: 'chrome89' },
  plugins: [
    federation({
      name: 'shared_components',
      filename: 'remoteEntry.js',
      exposes: federationExposes,
      dev: {
        remoteHmr: true,
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
      },
    }),
    react(),
    tailwindcss(),
  ],
});
