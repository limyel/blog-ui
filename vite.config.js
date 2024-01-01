import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      // 设置 `@` 指向 `src` 目录
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    port: 5000,
    open: false,
    cors: true
  }
})
