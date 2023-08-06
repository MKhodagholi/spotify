import { defineConfig } from 'vite'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      images: path.resolve(__dirname, './src/assets/images/'),
      icons: path.resolve(__dirname, './src/assets/icons/'),
    },
  },
})
