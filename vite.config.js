import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Activa la minificación con Terser, que es más potente que esbuild
    minify: 'terser',
    terserOptions: {
      compress: {
        // Elimina los console.log en producción
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Estrategia de code splitting manual para librerías grandes
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Crea un chunk separado para las librerías del node_modules
          if (id.includes('node_modules')) {
            // Separa las librerías más grandes en sus propios chunks
            if (id.includes('recharts')) {
              return 'vendor_recharts';
            }
            if (id.includes('react-bootstrap')) {
              return 'vendor_react-bootstrap';
            }
            // Agrupa el resto en un chunk 'vendor'
            return 'vendor';
          }
        }
      }
    }
  }
})