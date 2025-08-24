import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  // Resolución de paths para imports más limpios
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      $lib: resolve(__dirname, 'src/lib'),
      $components: resolve(__dirname, 'src/lib/components'),
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
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['svelte'],
        },
      },
    },
  },

  // Optimización de dependencias
  optimizeDeps: {
    include: ['svelte'],
  },
});
