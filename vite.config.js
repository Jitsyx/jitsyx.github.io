import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Sitio principal en https://jitsyx.github.io -> base '/'
export default defineConfig({
  plugins: [react()],
  base: '/',
})
