import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // ¡Esta es la línea clave que soluciona el problema!
  // Reemplaza 'Proyecto-Ciclismo' con el nombre exacto de tu repositorio en GitHub.
  base: '/Proyecto-Ciclismo/', 
})