import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Optimizaciones de build
    target: 'esnext',
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          // Separar vendor chunks para mejor caching
          vendor: ['react', 'react-dom'],
          animations: ['framer-motion'],
        },
      },
    },
    // Configuración de assets
    assetsInlineLimit: 4096, // Inline assets menores a 4KB
    chunkSizeWarningLimit: 1000,
  },
  // Optimizaciones de desarrollo
  server: {
    hmr: {
      overlay: false,
    },
  },
  // Optimizaciones de dependencias
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion'],
  },
})
