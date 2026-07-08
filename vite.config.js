import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  // Resolución de paths para imports más limpios
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  // Configuración para desarrollo
  server: {
    port: 5173,
    open: true,
  },

  // Configuración para build
  build: {
    target: 'esnext',
    sourcemap: true,
  },

  // Optimización de dependencias
  optimizeDeps: {
    include: ['svelte'],
  },
});
