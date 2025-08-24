import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
  // Consult https://svelte.dev/docs#compile-time-svelte-preprocess
  // for more information about preprocessors
  preprocess: vitePreprocess(),
  compilerOptions: {
    // Mejores mensajes de error en desarrollo
    dev: process.env.NODE_ENV === 'development',
  },

  // Configuración para el plugin de Vite
  vitePlugin: {
    // Inspeccionar el bundle de Svelte (útil para debugging)
    inspector: {
      toggleKeyCombo: 'meta-shift',
      holdMode: true,
      showToggleButton: 'always',
      toggleButtonPos: 'bottom-right',
    },
  },
};
