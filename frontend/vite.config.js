import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',  // The backend server address
        changeOrigin: true,               // Set to true to change the origin of the host header to the target URL
        // rewrite: (path) => path.replace(/^\/api/, ''),  // Rewrite the path to remove /api
      }
    }
  },
  build: {
   
    rollupOptions: {
      output: {
        entryFileNames: 'index.js', // Customizes the bundled JavaScript filename
        assetFileNames: 'index.css', // Customizes the bundled CSS filename
      },
    },
  },

});