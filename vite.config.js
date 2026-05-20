import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/hydromotor.bg/',
  build: { outDir: 'dist', sourcemap: false },
  appType: 'spa'
});
