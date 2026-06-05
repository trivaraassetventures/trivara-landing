import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // Served from https://trivaraassetventures.github.io/trivara-landing/
  // (cambiar a '/' cuando se publique en el dominio propio).
  base: '/trivara-landing/',
  plugins: [react()],
  server: { port: 5173, open: true },
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          r3f: ['@react-three/fiber', '@react-three/drei', '@react-three/postprocessing'],
        },
      },
    },
  },
})
