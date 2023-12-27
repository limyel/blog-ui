import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// @ts-ignore
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve('src'),
      '@img': resolve('src/assets/img'),
      '@css': resolve('src/assets/css'),
      '@libs': resolve('src/libs'),
      '@plugins': resolve('src/plugins'),
      '@cp': resolve('src/components'),
      '@views': resolve('src/views'),
    }
  }
})
