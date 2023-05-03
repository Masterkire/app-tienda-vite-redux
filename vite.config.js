import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: 'https://masterkire.github.io/app-tienda-vite-redux/',
  plugins: [react()],
})
