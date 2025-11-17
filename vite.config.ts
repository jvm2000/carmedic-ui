import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [vue()],
  base: command === 'build' ? '/carmedicdirectory/' : '/',
  server: {
    port: 3000,
    open: true,
  },
}))
