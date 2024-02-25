import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    proxy: {
      '/swagger/': {
        target: 'http://localhost:5111',
        secure: false,
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/swagger/, '')
      }
    }
  }
})
