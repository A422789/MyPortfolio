import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import { getPages } from './scripts/route-data.mjs';

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), tailwindcss(), {
    name: 'page-metadata',
    resolveId(id) { if (id === 'virtual:page-metadata') return '\0virtual:page-metadata'; },
    load(id) { if (id === '\0virtual:page-metadata') return `export default ${JSON.stringify(getPages())}`; },
  }],
  build: {
    manifest: !isSsrBuild,
    rollupOptions: {
      output: {
        manualChunks: isSsrBuild ? undefined : {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-motion': ['framer-motion'],
          'vendor-form': ['react-hook-form'],
          'vendor-validation': ['zod', '@hookform/resolvers'],
        },
      },
    },
  },
}));
